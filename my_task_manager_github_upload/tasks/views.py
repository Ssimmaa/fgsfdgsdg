from django.contrib import messages
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.views.decorators.cache import never_cache
from django.views.decorators.http import require_POST

from .constants import TEMPLATE_PATHS
from .forms import (
    AccountDeleteForm,
    AdminEmployeeAccountForm,
    EmployeeProgressForm,
    EmployeeTaskForm,
    ProfileForm,
    ProfilePhotoForm,
    RegistrationForm,
    TaskForm,
    TaskMessageForm,
)
from .models import SubTask, Task, TaskAssignmentStatus, TaskDismissal, TaskTemplate
from .services.audit_service import _log_task_audit
from .services.analytics_service import _admin_analytics_payload
from .services.attachment_service import _remove_attachment, _save_message_attachments, _save_task_attachments
from .services.employee_service import (
    _admin_account_summaries,
    _admin_attention_items,
    _admin_required,
    _board_tasks_for_user,
    _can_self_delete_account,
    _delete_account,
    _dashboard_metrics,
    _employee_board_visit_state,
    _employee_profile,
    _employee_summary,
    _employee_users,
    _filtered_employee_summaries,
    _is_site_owner,
    _log_task_assignment,
    _managed_account_target,
    _normalize_employee_profile,
    _record_account_update_activities,
    _record_profile_update_activities,
    _serialize_admin_attention,
    _serialize_employee_summary,
    _workload_insights,
)
from .services.system_log_service import _site_update_entries, _system_event_entries
from .services.avatar_service import _remove_profile_avatar, _save_profile_avatar
from .services.template_service import (
    _materialize_due_recurring_tasks,
    _save_task_template_from_task,
    _serialize_task_template,
    _task_templates_queryset,
    _template_initial_payload,
)
from .services.task_service import (
    _attach_viewer_task_state,
    _decorate_board_tasks,
    _employee_status_entry,
    _form_error_list,
    _get_manageable_task_attachment_or_404,
    _get_manageable_task_message_or_404,
    _get_visible_task_or_404,
    _log_task_activity,
    _progress_payload,
    _recalculate_task_rollup,
    _save_subtasks,
    _serialize_subtask,
    _serialize_task,
    _serialize_task_message,
    _set_assignment_status,
    _sync_task_assignment_statuses,
    _task_detail_context,
    _task_form_context,
    _task_messages,
    _task_queryset,
    _task_request_feed,
    _task_wall_metrics,
    _visible_tasks_for_user,
)


ALLOWED_BOARD_FILTERS = {
    'all',
    'active',
    'completed',
    'deadline',
    Task.STATUS_NOT_STARTED,
    Task.STATUS_IN_PROGRESS,
    Task.STATUS_PAUSED,
}

ALLOWED_PRIORITY_FILTERS = {
    'all',
    Task.PRIORITY_LOW,
    Task.PRIORITY_MEDIUM,
    Task.PRIORITY_HIGH,
}

ALLOWED_LIST_VIEWS = {'list', 'calendar'}


def _build_account_delete_form(actor, data=None, *, require_password=True):
    return AccountDeleteForm(data, actor=actor, prefix='delete_account', require_password=require_password)


def _materialize_recurring_tasks(user):
    actor = user if getattr(user, 'is_superuser', False) else None
    _materialize_due_recurring_tasks(actor=actor)


def _normalize_board_filter(value):
    normalized = (value or 'all').strip().lower()
    return normalized if normalized in ALLOWED_BOARD_FILTERS else 'all'


def _normalize_priority_filter(value):
    normalized = (value or 'all').strip().lower()
    return normalized if normalized in ALLOWED_PRIORITY_FILTERS else 'all'


def _normalize_view_mode(value, *, default='list'):
    normalized = (value or default).strip().lower()
    return normalized if normalized in ALLOWED_LIST_VIEWS else default


def _task_filter_context(request, *, default_view='list'):
    current_query = request.GET.get('q', '').strip()
    current_filter = _normalize_board_filter(request.GET.get('filter', 'all'))
    current_priority = _normalize_priority_filter(request.GET.get('priority', 'all'))
    current_view_mode = _normalize_view_mode(request.GET.get('view', default_view), default=default_view)

    return {
        'current_query': current_query,
        'current_filter': current_filter,
        'current_priority': current_priority,
        'current_view_mode': current_view_mode,
    }


def _profile_page_context(user, photo_form=None, delete_form=None):
    can_self_delete_account = _can_self_delete_account(user)
    delete_requires_password = bool(can_self_delete_account)
    return {
        'employee_summary': _employee_summary(user) if not user.is_superuser else None,
        'profile_photo_form': photo_form or ProfilePhotoForm(),
        'account_delete_form': delete_form or _build_account_delete_form(user, require_password=delete_requires_password),
        'delete_requires_password': delete_requires_password,
        'update_profile_photo_url': reverse('update_profile_photo'),
        'delete_profile_photo_url': reverse('delete_profile_photo'),
        'delete_account_url': reverse('delete_own_account'),
        'can_self_delete_account': can_self_delete_account,
        'self_delete_blocked_key': '' if can_self_delete_account else 'profile.deleteAccountLocked',
    }


def _build_employee_account_form(employee, *, can_manage_admin_roles, target_is_site_owner, data=None):
    return AdminEmployeeAccountForm(
        data,
        instance=employee,
        prefix='account',
        can_manage_admin_role=can_manage_admin_roles,
        target_is_site_owner=target_is_site_owner,
    )


def _employee_account_context(employee, can_manage_admin_roles, account_form, photo_form=None, delete_form=None, delete_actor=None):
    return {
        'employee_summary': _employee_summary(employee, include_dismissed=True),
        'employee_user': employee,
        'account_form': account_form,
        'profile_photo_form': photo_form or ProfilePhotoForm(),
        'account_delete_form': delete_form or _build_account_delete_form(delete_actor, require_password=False),
        'delete_requires_password': False,
        'delete_no_password_help_key': 'admin.deleteAccountNoPasswordHelp',
        'update_employee_profile_photo_url': reverse('update_employee_profile_photo', args=[employee.id]),
        'delete_employee_profile_photo_url': reverse('delete_employee_profile_photo', args=[employee.id]),
        'delete_employee_account_url': reverse('delete_employee_account', args=[employee.id]),
        'delete_account_help_key': (
            'admin.deleteAdminAccountHelp' if employee.is_superuser else 'admin.deleteEmployeeAccountHelp'
        ),
        'can_manage_admin_roles': can_manage_admin_roles,
        'target_is_admin': employee.is_superuser,
    }


@never_cache
def register_user(request):
    if request.user.is_authenticated:
        return redirect('home')

    form = RegistrationForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        user = form.save()
        _employee_profile(user)
        auth_login(request, user)
        messages.success(request, 'Din konto blev oprettet.')
        return redirect('home')

    return render(request, TEMPLATE_PATHS['auth_register'], {'form': form, 'auth_page': True})


@never_cache
@login_required(login_url='login')
def task_board(request):
    _materialize_recurring_tasks(request.user)
    tasks = _decorate_board_tasks(_board_tasks_for_user(request.user))
    context = {
        'tasks': tasks,
        'stats': _progress_payload(tasks),
        **_task_filter_context(request),
    }

    if request.user.is_superuser:
        summaries = [_employee_summary(user, include_dismissed=True) for user in _employee_users()]
        context.update(
            {
                'admin_metrics': _dashboard_metrics(summaries),
                'admin_attention': _admin_attention_items(summaries),
                'admin_workload': _workload_insights(summaries),
                'task_requests': _task_request_feed(4),
            }
        )
    else:
        context.update(
            {
                'employee_summary': _employee_summary(request.user),
                'show_employee_intro': _employee_board_visit_state(request)['show_intro'],
            }
        )

    return render(request, TEMPLATE_PATHS['dashboard'], context)


@never_cache
@login_required(login_url='login')
def task_wall(request):
    _materialize_recurring_tasks(request.user)
    tasks = _board_tasks_for_user(request.user)
    return render(
        request,
        TEMPLATE_PATHS['task_wall'],
        {
            'stats': _progress_payload(tasks),
            'wall_metrics': _task_wall_metrics(tasks),
            **_task_filter_context(request),
        },
    )


@never_cache
@login_required(login_url='login')
def task_list_page(request):
    _materialize_recurring_tasks(request.user)
    tasks = _decorate_board_tasks(_board_tasks_for_user(request.user))
    return render(
        request,
        TEMPLATE_PATHS['task_list'],
        {
            'tasks': tasks,
            'stats': _progress_payload(tasks),
            **_task_filter_context(request, default_view='list'),
        },
    )


@never_cache
@login_required(login_url='login')
def admin_processes(request):
    _admin_required(request.user)
    _materialize_recurring_tasks(request.user)
    tasks = _board_tasks_for_user(request.user)
    summaries = [_employee_summary(user, include_dismissed=True) for user in _employee_users()]
    return render(
        request,
        TEMPLATE_PATHS['admin_processes'],
        {
            'admin_metrics': _dashboard_metrics(summaries),
            'employee_summaries': summaries,
            'admin_attention': _admin_attention_items(summaries),
            'admin_workload': _workload_insights(summaries),
            'task_requests': _task_request_feed(10),
            'stats': _progress_payload(tasks),
            'wall_metrics': _task_wall_metrics(tasks),
            'admin_analytics': _admin_analytics_payload(),
            'task_templates': [_serialize_task_template(template) for template in _task_templates_queryset()[:12]],
            'system_event_entries': _system_event_entries(limit=8),
        },
    )


@never_cache
@login_required(login_url='login')
def site_updates_page(request):
    return render(
        request,
        TEMPLATE_PATHS['site_updates'],
        {
            'site_update_entries': _site_update_entries(),
        },
    )


@never_cache
@login_required(login_url='login')
def employee_directory(request):
    _admin_required(request.user)
    summaries = [_employee_summary(user, include_dismissed=True) for user in _employee_users()]
    filtered_summaries, status_filter, sort_key, search_query = _filtered_employee_summaries(request, summaries)
    can_manage_admin_roles = _is_site_owner(request.user)
    return render(
        request,
        TEMPLATE_PATHS['employee_directory'],
        {
            'employee_summaries': filtered_summaries,
            'admin_accounts': _admin_account_summaries() if can_manage_admin_roles else [],
            'admin_metrics': _dashboard_metrics(summaries),
            'can_manage_admin_roles': can_manage_admin_roles,
            'status_filter': status_filter,
            'sort_key': sort_key,
            'search_query': search_query,
        },
    )


@never_cache
@login_required(login_url='login')
def employee_detail(request, user_id):
    _admin_required(request.user)
    employee = get_object_or_404(User, id=user_id, is_superuser=False)
    profile = _employee_profile(employee)
    form = EmployeeProgressForm(instance=profile, prefix='progress')

    if request.method == 'POST':
        form_kind = request.POST.get('form_kind', 'progress')
        if form_kind == 'quick_task':
            return redirect('employee_assign_task', user_id=employee.id)

        if form_kind == 'progress':
            form = EmployeeProgressForm(request.POST, instance=profile, prefix='progress')
            if form.is_valid():
                old_values = {
                    'status': profile.status,
                    'current_stage': profile.current_stage,
                    'started_at': profile.started_at,
                    'completed_at': profile.completed_at,
                }
                updated_profile = form.save(commit=False)
                _normalize_employee_profile(updated_profile)
                updated_profile.save()
                _record_profile_update_activities(updated_profile, request.user, old_values)
                messages.success(request, 'Profilen blev opdateret.')
                return redirect('employee_detail', user_id=employee.id)

    return render(
        request,
        TEMPLATE_PATHS['employee_detail'],
        {
            'employee_summary': _employee_summary(employee, include_dismissed=True),
            'employee_user': employee,
            'form': form,
        },
    )


@never_cache
@login_required(login_url='login')
def employee_assign_task(request, user_id):
    _admin_required(request.user)
    employee = get_object_or_404(User, id=user_id, is_superuser=False)
    profile = _employee_profile(employee)
    form = EmployeeTaskForm(request.POST or None, request.FILES or None, employee=employee)

    if request.method == 'POST' and form.is_valid():
        task = form.save()
        _sync_task_assignment_statuses(task)
        attachments = _save_task_attachments(task, form.cleaned_data.get('attachments'), request.user)
        _log_task_audit(
            task,
            request.user,
            'task_created',
            'Created the task from employee assign page.',
            {'attachment_count': len(attachments)},
        )
        _log_task_assignment(profile, request.user, task.title)
        messages.success(request, 'Opgaven blev tilfojet til medarbejderen.')
        return redirect('employee_detail', user_id=employee.id)

    return render(
        request,
        TEMPLATE_PATHS['employee_assign_task'],
        {
            'employee_summary': _employee_summary(employee, include_dismissed=True),
            'employee_user': employee,
            'quick_task_form': form,
        },
    )


@never_cache
@login_required(login_url='login')
def employee_account(request, user_id):
    employee, target_is_site_owner, can_manage_admin_roles = _managed_account_target(request.user, user_id)

    profile = _employee_profile(employee)
    original_values = User.objects.filter(pk=employee.pk).values('first_name', 'username', 'email', 'is_superuser').get()
    account_form = _build_employee_account_form(
        employee,
        can_manage_admin_roles=can_manage_admin_roles,
        target_is_site_owner=target_is_site_owner,
        data=request.POST or None,
    )

    if request.method == 'POST' and account_form.is_valid():
        updated_employee = account_form.save()
        _record_account_update_activities(
            profile,
            request.user,
            original_values,
            updated_employee,
            account_form.password_was_changed,
        )
        messages.success(request, 'Medarbejderkontoen blev opdateret.')
        if updated_employee.is_superuser:
            return redirect('employee_directory')
        return redirect('employee_account', user_id=employee.id)

    return render(
        request,
        TEMPLATE_PATHS['employee_account'],
        _employee_account_context(employee, can_manage_admin_roles, account_form, delete_actor=request.user),
    )


@never_cache
@login_required(login_url='login')
def board_snapshot(request):
    _materialize_recurring_tasks(request.user)
    tasks = _board_tasks_for_user(request.user)
    payload = {
        'stats': _progress_payload(tasks),
        'tasks': [_serialize_task(task, request.user) for task in tasks],
    }
    if request.user.is_superuser:
        summaries = [_employee_summary(user, include_dismissed=True) for user in _employee_users()]
        payload['admin_metrics'] = _dashboard_metrics(summaries)
        payload['employee_summaries'] = [_serialize_employee_summary(summary) for summary in summaries[:6]]
        payload['admin_attention'] = _serialize_admin_attention(_admin_attention_items(summaries))
        payload['admin_workload'] = _workload_insights(summaries)
        payload['task_requests'] = _task_request_feed(4)
    else:
        payload['employee_summary'] = _serialize_employee_summary(_employee_summary(request.user))
    return JsonResponse(payload)


@never_cache
@login_required(login_url='login')
def task_detail(request, task_id):
    _materialize_recurring_tasks(request.user)
    task = _get_visible_task_or_404(request.user, task_id)
    return render(request, TEMPLATE_PATHS['task_detail'], _task_detail_context(task, request.user))


@never_cache
@login_required(login_url='login')
def task_snapshot(request, task_id):
    _materialize_recurring_tasks(request.user)
    task = _get_visible_task_or_404(request.user, task_id)
    _attach_viewer_task_state(task, request.user)
    subtasks = list(task.subtasks.all())
    completed_subtasks = sum(1 for subtask in subtasks if subtask.is_completed)
    detail_context = _task_detail_context(task, request.user)
    return JsonResponse(
        {
            'task': _serialize_task(task, request.user),
            'subtask_total': len(subtasks),
            'subtask_completed': completed_subtasks,
            'subtasks': [_serialize_subtask(subtask) for subtask in subtasks],
            'messages': [_serialize_task_message(message, request.user) for message in _task_messages(task)],
            'attachments': detail_context['task_attachments'],
            'audit_entries': detail_context['task_audit_entries'],
        }
    )


@login_required(login_url='login')
@require_POST
def delete_task_attachment(request, attachment_id):
    attachment = _get_manageable_task_attachment_or_404(request.user, attachment_id)
    task = attachment.message.task if attachment.message_id else attachment.task
    next_url = request.POST.get('next') or reverse('task_detail', args=[task.id])
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    attachment_name = attachment.original_name
    _remove_attachment(attachment)
    _log_task_audit(
        task,
        request.user,
        'attachment_deleted',
        f'Removed attachment "{attachment_name}".',
        {'attachment_name': attachment_name},
    )

    if is_ajax:
        return JsonResponse({'status': 'ok'})

    messages.success(request, 'Filen blev fjernet.')
    return redirect(next_url)


@login_required(login_url='login')
@require_POST
def delete_task_template(request, template_id):
    _admin_required(request.user)
    template = get_object_or_404(TaskTemplate, id=template_id)
    template_name = template.name
    template.delete()
    messages.success(request, f'Skabelonen "{template_name}" blev slettet.')
    return redirect(request.POST.get('next') or reverse('admin_processes'))


@login_required(login_url='login')
@require_POST
def post_task_message(request, task_id):
    task = _get_visible_task_or_404(request.user, task_id)
    form = TaskMessageForm(request.POST, request.FILES)
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if form.is_valid():
        message = form.save(commit=False)
        message.task = task
        message.author = request.user
        message.save()
        attachments = _save_message_attachments(message, form.cleaned_data.get('attachments'), request.user)
        _log_task_audit(
            task,
            request.user,
            'message_posted',
            'Added a message to the task.',
            {
                'kind': message.kind,
                'attachment_count': len(attachments),
            },
        )

        if is_ajax:
            return JsonResponse({'status': 'ok', 'message': _serialize_task_message(message, request.user)})

        messages.success(request, 'Beskeden blev sendt.')
        return redirect(f"{reverse('task_detail', args=[task.id])}#task-chat")

    if is_ajax:
        return JsonResponse({'status': 'error', 'errors': _form_error_list(form)}, status=400)

    return render(
        request,
        TEMPLATE_PATHS['task_detail'],
        _task_detail_context(task, request.user, message_form=form),
        status=400,
    )


@login_required(login_url='login')
@require_POST
def update_task_message(request, task_id, message_id):
    task, message = _get_manageable_task_message_or_404(request.user, task_id, message_id)
    form = TaskMessageForm(request.POST, request.FILES, instance=message)
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if form.is_valid():
        updated_message = form.save()
        attachments = _save_message_attachments(updated_message, form.cleaned_data.get('attachments'), request.user)
        _log_task_audit(
            task,
            request.user,
            'message_updated',
            'Updated a task message.',
            {
                'message_id': updated_message.id,
                'attachment_count': len(attachments),
            },
        )
        if is_ajax:
            return JsonResponse({'status': 'ok', 'message': _serialize_task_message(updated_message, request.user)})

        messages.success(request, 'Beskeden blev opdateret.')
        return redirect(f"{reverse('task_detail', args=[task.id])}#task-chat")

    if is_ajax:
        return JsonResponse({'status': 'error', 'errors': _form_error_list(form)}, status=400)

    return render(
        request,
        TEMPLATE_PATHS['task_detail'],
        _task_detail_context(
            task,
            request.user,
            editing_message=message,
            editing_message_form=form,
        ),
        status=400,
    )


@login_required(login_url='login')
@require_POST
def delete_task_message(request, task_id, message_id):
    task, message = _get_manageable_task_message_or_404(request.user, task_id, message_id)
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    _log_task_audit(
        task,
        request.user,
        'message_deleted',
        'Deleted a task message.',
        {'message_id': message.id},
    )
    message.delete()

    if is_ajax:
        return JsonResponse({'status': 'ok'})

    messages.success(request, 'Beskeden blev slettet.')
    return redirect(f"{reverse('task_detail', args=[task.id])}#task-chat")


@never_cache
@login_required(login_url='login')
def create_task(request):
    initial = None

    if request.user.is_superuser:
        template_id = (request.GET.get('template') or '').strip()
        if template_id.isdigit():
            source_template = get_object_or_404(TaskTemplate.objects.prefetch_related('subtasks', 'assigned_users'), id=template_id)
            initial = _template_initial_payload(source_template)
            initial['template_id'] = str(source_template.id)

    form = TaskForm(request.POST or None, request.FILES or None, user=request.user, initial=initial)
    if request.method == 'POST' and form.is_valid():
        task = form.save(commit=False)
        if request.user.is_superuser and form.cleaned_data.get('template_id'):
            task.source_template = TaskTemplate.objects.filter(pk=form.cleaned_data['template_id']).first()
        if not request.user.is_superuser:
            task.assigned_to = request.user
        task.save()
        if request.user.is_superuser:
            form.save_m2m()
        else:
            task.assigned_users.set(User.objects.filter(pk=request.user.pk))
        _sync_task_assignment_statuses(task)
        _save_subtasks(task, request.POST, actor=request.user)
        attachments = _save_task_attachments(task, form.cleaned_data.get('attachments'), request.user)
        _log_task_audit(
            task,
            request.user,
            'task_created',
            'Created the task.',
            {'attachment_count': len(attachments)},
        )
        if request.user.is_superuser and form.cleaned_data.get('save_as_template'):
            _save_task_template_from_task(
                task,
                actor=request.user,
                name=form.cleaned_data['template_name'],
                recurrence=form.cleaned_data.get('template_recurrence') or TaskTemplate.RECURRENCE_NONE,
                deadline_offset_days=form.cleaned_data.get('template_deadline_days') or 0,
            )
        messages.success(request, 'Opgaven blev oprettet.')
        return redirect('home')

    return render(request, TEMPLATE_PATHS['task_form'], _task_form_context(form, None, request.user, 'create'))


@never_cache
@login_required(login_url='login')
def edit_task(request, task_id):
    task = get_object_or_404(_task_queryset(), id=task_id)
    if not request.user.is_superuser:
        return redirect('home')

    form = TaskForm(request.POST or None, request.FILES or None, instance=task, user=request.user)
    if request.method == 'POST' and form.is_valid():
        previous_values = {
            'title': task.title,
            'description': task.description,
            'priority': task.priority,
            'deadline': task.deadline,
            'assigned_to_id': task.assigned_to_id,
        }
        task = form.save(commit=False)
        if form.cleaned_data.get('template_id'):
            task.source_template = TaskTemplate.objects.filter(pk=form.cleaned_data['template_id']).first()
        task.save()
        form.save_m2m()
        _sync_task_assignment_statuses(task)
        _save_subtasks(task, request.POST, actor=request.user)
        attachments = _save_task_attachments(task, form.cleaned_data.get('attachments'), request.user)
        changed_fields = [
            key for key, previous_value in previous_values.items()
            if previous_value != getattr(task, key)
        ]
        if changed_fields or attachments:
            _log_task_audit(
                task,
                request.user,
                'task_updated',
                'Updated task details.',
                {
                    'fields': changed_fields,
                    'attachment_count': len(attachments),
                },
            )
        if form.cleaned_data.get('save_as_template'):
            _save_task_template_from_task(
                task,
                actor=request.user,
                name=form.cleaned_data['template_name'],
                recurrence=form.cleaned_data.get('template_recurrence') or TaskTemplate.RECURRENCE_NONE,
                deadline_offset_days=form.cleaned_data.get('template_deadline_days') or 0,
            )
        messages.success(request, 'Opgaven blev opdateret.')
        return redirect('home')

    return render(request, TEMPLATE_PATHS['task_form'], _task_form_context(form, task, request.user, 'edit'))


@never_cache
@login_required(login_url='login')
@require_POST
def delete_task(request, task_id):
    if not request.user.is_superuser:
        return redirect('home')

    task = get_object_or_404(Task, id=task_id)
    task.delete()
    messages.success(request, 'Opgaven blev slettet.')
    return redirect('home')


@never_cache
@login_required(login_url='login')
@require_POST
def dismiss_completed_task(request, task_id):
    if request.user.is_superuser:
        return redirect('home')

    task = _get_visible_task_or_404(request.user, task_id)
    status_entry = _employee_status_entry(task, request.user)
    if status_entry.status != TaskAssignmentStatus.STATUS_COMPLETED:
        messages.error(request, 'Kun afsluttede opgaver kan fjernes.')
        return redirect('home')

    TaskDismissal.objects.get_or_create(task=task, user=request.user)
    messages.success(request, 'Opgaven blev fjernet fra din oversigt.')
    return redirect('home')


@never_cache
@login_required(login_url='login')
@require_POST
def bulk_delete_tasks(request):
    if not request.user.is_superuser:
        return redirect('home')

    task_ids = [int(value) for value in request.POST.getlist('task_ids') if value.isdigit()]
    if not task_ids:
        messages.error(request, 'Vaelg mindst en opgave.')
        return redirect('home')

    Task.objects.filter(id__in=task_ids).delete()
    messages.success(request, 'Valgte opgaver blev slettet.')
    return redirect('home')


@never_cache
@login_required(login_url='login')
def user_profile(request):
    return render(request, TEMPLATE_PATHS['profile'], _profile_page_context(request.user))


@never_cache
@login_required(login_url='login')
def edit_profile(request):
    form = ProfileForm(request.POST or None, instance=request.user)
    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, 'Profilen blev opdateret.')
        return redirect('profile')

    return render(request, TEMPLATE_PATHS['edit_profile'], {'form': form})


@never_cache
@login_required(login_url='login')
@require_POST
def update_profile_photo(request):
    form = ProfilePhotoForm(request.POST, request.FILES)
    if form.is_valid():
        _save_profile_avatar(_employee_profile(request.user), form.cleaned_data['photo'])
        messages.success(request, 'Profilbilledet blev opdateret.')
        return redirect('profile')

    return render(request, TEMPLATE_PATHS['profile'], _profile_page_context(request.user, photo_form=form), status=400)


@never_cache
@login_required(login_url='login')
@require_POST
def delete_profile_photo(request):
    if _remove_profile_avatar(_employee_profile(request.user)):
        messages.success(request, 'Profilbilledet blev fjernet.')
    else:
        messages.error(request, 'Der er ikke noget profilbillede at fjerne.')
    return redirect('profile')


@never_cache
@login_required(login_url='login')
@require_POST
def delete_own_account(request):
    if not _can_self_delete_account(request.user):
        messages.error(request, 'Ejeren af systemet kan ikke slette sin egen konto.')
        return redirect('profile')

    delete_form = _build_account_delete_form(request.user, request.POST, require_password=True)
    if not delete_form.is_valid():
        return render(
            request,
            TEMPLATE_PATHS['profile'],
            _profile_page_context(request.user, delete_form=delete_form),
            status=400,
        )

    user = request.user
    auth_logout(request)
    _delete_account(user)
    messages.success(request, 'Din konto blev slettet.')
    return redirect('login')


@never_cache
@login_required(login_url='login')
@require_POST
def update_employee_profile_photo(request, user_id):
    employee, target_is_site_owner, can_manage_admin_roles = _managed_account_target(request.user, user_id)
    photo_form = ProfilePhotoForm(request.POST, request.FILES)

    if photo_form.is_valid():
        _save_profile_avatar(_employee_profile(employee), photo_form.cleaned_data['photo'])
        messages.success(request, 'Profilbilledet blev opdateret.')
        return redirect('employee_account', user_id=employee.id)

    account_form = _build_employee_account_form(
        employee,
        can_manage_admin_roles=can_manage_admin_roles,
        target_is_site_owner=target_is_site_owner,
    )
    return render(
        request,
        TEMPLATE_PATHS['employee_account'],
        _employee_account_context(
            employee,
            can_manage_admin_roles,
            account_form,
            photo_form=photo_form,
            delete_actor=request.user,
        ),
        status=400,
    )


@never_cache
@login_required(login_url='login')
@require_POST
def delete_employee_profile_photo(request, user_id):
    employee, _target_is_site_owner, _can_manage_admin_roles = _managed_account_target(request.user, user_id)
    if _remove_profile_avatar(_employee_profile(employee)):
        messages.success(request, 'Profilbilledet blev fjernet.')
    else:
        messages.error(request, 'Der er ikke noget profilbillede at fjerne.')
    return redirect('employee_account', user_id=employee.id)


@never_cache
@login_required(login_url='login')
@require_POST
def delete_employee_account(request, user_id):
    employee, target_is_site_owner, can_manage_admin_roles = _managed_account_target(request.user, user_id)
    delete_form = _build_account_delete_form(request.user, request.POST, require_password=False)
    if not delete_form.is_valid():
        account_form = _build_employee_account_form(
            employee,
            can_manage_admin_roles=can_manage_admin_roles,
            target_is_site_owner=target_is_site_owner,
        )
        return render(
            request,
            TEMPLATE_PATHS['employee_account'],
            _employee_account_context(
                employee,
                can_manage_admin_roles,
                account_form,
                delete_form=delete_form,
                delete_actor=request.user,
            ),
            status=400,
        )

    _delete_account(employee)
    messages.success(request, 'Kontoen blev slettet.')
    return redirect('employee_directory')


@login_required(login_url='login')
@require_POST
def toggle_task(request, task_id):
    task = _get_visible_task_or_404(request.user, task_id)
    if request.user.is_superuser:
        return JsonResponse({'status': 'error'}, status=403)

    status_entry = _employee_status_entry(task, request.user)
    previous_status = status_entry.status
    next_status = (
        TaskAssignmentStatus.STATUS_IN_PROGRESS
        if status_entry.status == TaskAssignmentStatus.STATUS_COMPLETED
        else TaskAssignmentStatus.STATUS_COMPLETED
    )
    _set_assignment_status(status_entry, next_status)
    status_entry.save(update_fields=['status', 'completed_at', 'updated_at'])
    _recalculate_task_rollup(task)
    _attach_viewer_task_state(task, request.user, status_entry=status_entry)
    _log_task_activity(task, request.user, previous_status, status_entry.status)
    return JsonResponse(
        {
            'status': 'ok',
            'is_completed': task.current_is_completed,
            'task_status': task.current_status,
            'task_status_label': task.current_status_label,
        }
    )


@login_required(login_url='login')
@require_POST
def update_task_status(request, task_id):
    task = _get_visible_task_or_404(request.user, task_id)
    if request.user.is_superuser:
        return JsonResponse({'status': 'error'}, status=403)

    next_status = request.POST.get('status', '').strip()
    valid_statuses = {choice[0] for choice in TaskAssignmentStatus.STATUS_CHOICES}
    if next_status not in valid_statuses:
        return JsonResponse({'status': 'error'}, status=400)

    status_entry = _employee_status_entry(task, request.user)
    previous_status = status_entry.status
    _set_assignment_status(status_entry, next_status)
    status_entry.save(update_fields=['status', 'completed_at', 'updated_at'])
    _recalculate_task_rollup(task)
    _attach_viewer_task_state(task, request.user, status_entry=status_entry)
    _log_task_activity(task, request.user, previous_status, status_entry.status)
    return JsonResponse(
        {
            'status': 'ok',
            'task_status': task.current_status,
            'task_status_label': task.current_status_label,
            'is_completed': task.current_is_completed,
        }
    )


@login_required(login_url='login')
@require_POST
def toggle_subtask(request, subtask_id):
    subtask = get_object_or_404(
        SubTask.objects.select_related('task', 'task__assigned_to'),
        id=subtask_id,
        task__in=_visible_tasks_for_user(request.user),
    )
    subtask.is_completed = not subtask.is_completed
    subtask.save(update_fields=['is_completed'])
    task = subtask.task
    _sync_task_assignment_statuses(task)
    _attach_viewer_task_state(task, request.user)
    _log_task_audit(
        task,
        request.user,
        'subtask_toggled',
        f'{"Completed" if subtask.is_completed else "Reopened"} subtask "{subtask.title}".',
        {
            'subtask_id': subtask.id,
            'subtask_title': subtask.title,
            'is_completed': subtask.is_completed,
        },
    )
    return JsonResponse(
        {
            'status': 'ok',
            'is_completed': subtask.is_completed,
            'task_status': task.current_status,
            'task_status_label': task.current_status_label,
            'task_is_completed': task.current_is_completed,
        }
    )
