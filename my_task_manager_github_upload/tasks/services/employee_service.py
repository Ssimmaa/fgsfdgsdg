from datetime import timedelta
from django.contrib.auth.models import User
from django.db.models import Q
from django.http import Http404
from django.urls import reverse
from django.utils import timezone

from ..models import EmployeeActivity, EmployeeProfile, Task, TaskAssignmentStatus, TaskMessage
from .shared import (
    _employee_profile,
    _format_local_datetime,
    _serialize_task_brief,
    _task_deadline_value,
    _task_display_is_completed,
    _task_display_status,
    _task_is_due_soon,
    _task_is_overdue,
    _task_status_label,
    _user_avatar_data,
    _user_display_name,
)
from .task_service import _attach_viewer_task_state, _sync_task_assignment_statuses, _task_queryset, _visible_tasks_for_user


def _site_owner_profile():
    owner_profile = EmployeeProfile.objects.select_related('user').filter(is_site_owner=True).first()
    if owner_profile:
        return owner_profile

    owner_user = User.objects.filter(is_superuser=True).order_by('id').first()
    if not owner_user:
        return None

    owner_profile, _ = EmployeeProfile.objects.get_or_create(user=owner_user)
    if not owner_profile.is_site_owner:
        owner_profile.is_site_owner = True
        owner_profile.save(update_fields=['is_site_owner'])
    return owner_profile


def _is_site_owner(user):
    if not getattr(user, 'is_authenticated', False) or not user.is_superuser:
        return False
    owner_profile = _site_owner_profile()
    return bool(owner_profile and owner_profile.user_id == user.id)


def _admin_account_summaries():
    owner_profile = _site_owner_profile()
    owner_user_id = owner_profile.user_id if owner_profile else None
    return [
        {
            'user': user,
            'is_site_owner': user.id == owner_user_id,
            **_user_avatar_data(user, getattr(user, 'employee_profile', None)),
        }
        for user in User.objects.filter(is_superuser=True).select_related('employee_profile').order_by('first_name', 'username')
    ]


def _employee_users():
    return User.objects.filter(is_superuser=False).select_related('employee_profile').order_by('first_name', 'username')


def _tasks_for_employee(user, include_dismissed=False):
    tasks = list(
        _visible_tasks_for_user(user, include_dismissed=include_dismissed)
        .order_by('deadline', '-created_at')
        .distinct()
    )
    for task in tasks:
        _attach_viewer_task_state(task, user)
    return tasks


def _board_tasks_for_user(user):
    if user.is_superuser:
        tasks = list(_visible_tasks_for_user(user).order_by('is_completed', 'deadline', '-created_at'))
        for task in tasks:
            _attach_viewer_task_state(task, user)
        return tasks
    return _tasks_for_employee(user)


def _resolved_employee_status(tasks):
    if not tasks:
        return EmployeeProfile.STATUS_NOT_STARTED

    task_statuses = [_task_display_status(task) for task in tasks]
    if all(status == TaskAssignmentStatus.STATUS_COMPLETED for status in task_statuses):
        return EmployeeProfile.STATUS_COMPLETED

    # Any assigned work that is still open should surface as active work for the
    # employee, even if an individual assignment has not been started yet.
    if any(
        status in {TaskAssignmentStatus.STATUS_NOT_STARTED, TaskAssignmentStatus.STATUS_IN_PROGRESS}
        for status in task_statuses
    ):
        return EmployeeProfile.STATUS_IN_PROGRESS

    if any(status == TaskAssignmentStatus.STATUS_PAUSED for status in task_statuses):
        return EmployeeProfile.STATUS_PAUSED

    return EmployeeProfile.STATUS_NOT_STARTED


def _employee_last_update_at(profile, tasks):
    candidates = []
    latest_event = profile.activities.first()
    if latest_event:
        candidates.append(latest_event.created_at)
    candidates.extend(
        task.current_completed_at
        for task in tasks
        if getattr(task, 'current_completed_at', None)
    )
    return max(candidates) if candidates else None


def _employee_status_breakdown(summary):
    return [
        {
            'status': TaskAssignmentStatus.STATUS_NOT_STARTED,
            'count': summary['not_started_count'],
            'label': _task_status_label(TaskAssignmentStatus.STATUS_NOT_STARTED),
        },
        {
            'status': TaskAssignmentStatus.STATUS_IN_PROGRESS,
            'count': summary['in_progress_count'],
            'label': _task_status_label(TaskAssignmentStatus.STATUS_IN_PROGRESS),
        },
        {
            'status': TaskAssignmentStatus.STATUS_PAUSED,
            'count': summary['paused_count'],
            'label': _task_status_label(TaskAssignmentStatus.STATUS_PAUSED),
        },
        {
            'status': TaskAssignmentStatus.STATUS_COMPLETED,
            'count': summary['completed_count'],
            'label': _task_status_label(TaskAssignmentStatus.STATUS_COMPLETED),
        },
    ]


def _task_priority_rank(task):
    return {
        Task.PRIORITY_HIGH: 0,
        Task.PRIORITY_MEDIUM: 1,
        Task.PRIORITY_LOW: 2,
    }.get(task.priority, 1)


def _employee_summary(user, include_dismissed=False):
    if user.is_superuser:
        profile = _employee_profile(user)
        return {
            'user': user,
            'profile': profile,
            'name': _user_display_name(user),
            **_user_avatar_data(user, profile),
            'status': EmployeeProfile.STATUS_COMPLETED,
            'status_label': 'Administrator',
            'current_stage': '',
            'current_stage_key': '',
            'progress_percent': 100,
            'task_total': 0,
            'completed_count': 0,
            'pending_count': 0,
            'not_started_count': 0,
            'in_progress_count': 0,
            'paused_count': 0,
            'completed_tasks': [],
            'pending_tasks': [],
            'overdue_count': 0,
            'due_soon_count': 0,
            'lagging': False,
            'needs_assignment': False,
            'has_attention': False,
            'started_at': None,
            'completed_at': None,
            'priority_tasks': [],
            'due_soon_tasks': [],
            'overdue_tasks': [],
            'last_update_at': None,
            'last_update_text': '',
            'status_breakdown': [],
        }

    profile = _employee_profile(user)
    tasks = _tasks_for_employee(user, include_dismissed=include_dismissed)
    completed_tasks = [task for task in tasks if _task_display_is_completed(task)]
    pending_tasks = [task for task in tasks if not _task_display_is_completed(task)]
    now = timezone.now()
    overdue_tasks = [task for task in pending_tasks if _task_is_overdue(task, now)]
    due_soon_tasks = [task for task in pending_tasks if _task_is_due_soon(task, now)]
    not_started_count = sum(1 for task in tasks if _task_display_status(task) == TaskAssignmentStatus.STATUS_NOT_STARTED)
    in_progress_count = sum(1 for task in tasks if _task_display_status(task) == TaskAssignmentStatus.STATUS_IN_PROGRESS)
    paused_count = sum(1 for task in tasks if _task_display_status(task) == TaskAssignmentStatus.STATUS_PAUSED)
    progress_percent = round((len(completed_tasks) / len(tasks)) * 100) if tasks else 0
    status = _resolved_employee_status(tasks)
    current_stage = profile.current_stage or (pending_tasks[0].title if pending_tasks else '')
    current_stage_key = '' if current_stage else 'employee.awaitingAssignment'
    last_update_at = _employee_last_update_at(profile, tasks)
    priority_tasks = sorted(
        pending_tasks,
        key=lambda task: (
            _task_priority_rank(task),
            0 if _task_is_overdue(task, now) else 1 if _task_display_status(task) == TaskAssignmentStatus.STATUS_PAUSED else 2 if _task_is_due_soon(task, now) else 3,
            _task_deadline_value(task) or (now + timedelta(days=3650)),
            task.title.lower(),
        ),
    )[:5]

    summary = {
        'user': user,
        'profile': profile,
        'name': _user_display_name(user),
        **_user_avatar_data(user, profile),
        'status': status,
        'status_label': dict(EmployeeProfile.STATUS_CHOICES)[status],
        'current_stage': current_stage,
        'current_stage_key': current_stage_key,
        'progress_percent': progress_percent,
        'task_total': len(tasks),
        'completed_count': len(completed_tasks),
        'pending_count': len(pending_tasks),
        'not_started_count': not_started_count,
        'in_progress_count': in_progress_count,
        'paused_count': paused_count,
        'completed_tasks': completed_tasks,
        'pending_tasks': pending_tasks,
        'overdue_count': len(overdue_tasks),
        'due_soon_count': len(due_soon_tasks),
        'lagging': bool(overdue_tasks),
        'needs_assignment': not tasks,
        'has_attention': bool(overdue_tasks or paused_count or due_soon_tasks or not tasks),
        'started_at': profile.started_at,
        'completed_at': profile.completed_at,
        'priority_tasks': [_serialize_task_brief(task) for task in priority_tasks],
        'due_soon_tasks': [_serialize_task_brief(task) for task in due_soon_tasks[:5]],
        'overdue_tasks': [_serialize_task_brief(task) for task in overdue_tasks[:5]],
        'last_update_at': last_update_at,
        'last_update_text': _format_local_datetime(last_update_at),
    }
    summary['status_breakdown'] = _employee_status_breakdown(summary)
    return summary


def _dashboard_metrics(summaries):
    total = len(summaries)
    in_progress = sum(1 for summary in summaries if summary['status'] == EmployeeProfile.STATUS_IN_PROGRESS)
    paused = sum(1 for summary in summaries if summary['status'] == EmployeeProfile.STATUS_PAUSED)
    completed = sum(1 for summary in summaries if summary['status'] == EmployeeProfile.STATUS_COMPLETED)
    not_started = sum(1 for summary in summaries if summary['status'] == EmployeeProfile.STATUS_NOT_STARTED)
    lagging = sum(1 for summary in summaries if summary['lagging'])
    overdue_tasks = sum(summary['overdue_count'] for summary in summaries)
    paused_assignments = sum(summary['paused_count'] for summary in summaries)
    without_tasks = sum(1 for summary in summaries if summary['task_total'] == 0)
    attention_required = sum(1 for summary in summaries if summary['has_attention'])
    overall_progress = round(sum(summary['progress_percent'] for summary in summaries) / total) if total else 0
    request_count = TaskMessage.objects.filter(author__is_superuser=False).count()

    distribution = [
        {
            'key': EmployeeProfile.STATUS_NOT_STARTED,
            'label': 'Not started',
            'label_key': 'status.not_started',
            'count': not_started,
            'percent': round((not_started / total) * 100) if total else 0,
        },
        {
            'key': EmployeeProfile.STATUS_IN_PROGRESS,
            'label': 'In progress',
            'label_key': 'status.in_progress',
            'count': in_progress,
            'percent': round((in_progress / total) * 100) if total else 0,
        },
        {
            'key': EmployeeProfile.STATUS_PAUSED,
            'label': 'On hold',
            'label_key': 'status.paused',
            'count': paused,
            'percent': round((paused / total) * 100) if total else 0,
        },
        {
            'key': EmployeeProfile.STATUS_COMPLETED,
            'label': 'Completed',
            'label_key': 'status.completed',
            'count': completed,
            'percent': round((completed / total) * 100) if total else 0,
        },
    ]

    return {
        'total_employees': total,
        'in_progress': in_progress,
        'paused': paused,
        'completed': completed,
        'not_started': not_started,
        'lagging': lagging,
        'overdue_tasks': overdue_tasks,
        'paused_assignments': paused_assignments,
        'without_tasks': without_tasks,
        'attention_required': attention_required,
        'overall_progress': overall_progress,
        'request_count': request_count,
        'distribution': distribution,
    }


def _employee_workload_item(summary):
    load_score = (
        summary['pending_count'] * 2
        + summary['overdue_count'] * 4
        + summary['paused_count'] * 2
        + summary['due_soon_count']
    )
    return {
        'user_id': summary['user'].id,
        'name': summary['name'],
        'avatar_url': summary['avatar_url'],
        'avatar_initials': summary['avatar_initials'],
        'detail_url': reverse('employee_detail', args=[summary['user'].id]),
        'account_url': reverse('employee_account', args=[summary['user'].id]),
        'load_score': load_score,
        'task_total': summary['task_total'],
        'pending_count': summary['pending_count'],
        'overdue_count': summary['overdue_count'],
        'due_soon_count': summary['due_soon_count'],
        'paused_count': summary['paused_count'],
        'progress_percent': summary['progress_percent'],
        'status': summary['status'],
        'status_label': summary['status_label'],
        'current_stage': summary['current_stage'],
        'current_stage_key': summary['current_stage_key'],
    }


def _workload_insights(summaries):
    items = [_employee_workload_item(summary) for summary in summaries]
    overloaded = sorted(
        (item for item in items if item['task_total']),
        key=lambda item: (-item['load_score'], -item['overdue_count'], item['name'].lower()),
    )[:5]
    available = sorted(
        (
            item for item in items
            if item['task_total'] == 0 or (item['task_total'] <= 2 and item['overdue_count'] == 0 and item['paused_count'] == 0)
        ),
        key=lambda item: (item['load_score'], item['name'].lower()),
    )[:5]
    focus = sorted(
        (task for summary in summaries for task in summary['priority_tasks']),
        key=lambda task: (
            0 if task['priority'] == Task.PRIORITY_HIGH else 1 if task['priority'] == Task.PRIORITY_MEDIUM else 2,
            0 if task['is_overdue'] else 1 if task['is_due_soon'] else 2,
            task['title'].lower(),
        ),
    )[:6]
    return {
        'overloaded': overloaded,
        'available': available,
        'focus': focus,
    }


def _admin_attention_items(summaries):
    now = timezone.now()
    lagging_employees = sorted(
        (summary for summary in summaries if summary['lagging']),
        key=lambda summary: (-summary['overdue_count'], -summary['paused_count'], summary['user'].username.lower()),
    )[:5]
    without_tasks_employees = sorted(
        (summary for summary in summaries if summary['needs_assignment']),
        key=lambda summary: (
            (summary['user'].first_name or summary['user'].username).lower(),
            summary['user'].username.lower(),
        ),
    )[:5]
    paused_assignments = list(
        TaskAssignmentStatus.objects.select_related('task', 'user', 'user__employee_profile')
        .filter(status=TaskAssignmentStatus.STATUS_PAUSED)
        .order_by('task__deadline', '-updated_at')[:5]
    )
    due_soon_tasks = list(
        _task_queryset()
        .filter(is_completed=False, deadline__isnull=False, deadline__gte=now, deadline__lte=now + timedelta(hours=72))
        .order_by('deadline')[:5]
    )
    return {
        'lagging_employees': lagging_employees,
        'without_tasks_employees': without_tasks_employees,
        'paused_assignments': paused_assignments,
        'due_soon_tasks': due_soon_tasks,
    }


def _serialize_employee_summary(summary):
    user_id = summary['user'].id
    return {
        'user_id': user_id,
        'name': summary['name'],
        'username': summary['user'].username,
        'avatar_url': summary['avatar_url'],
        'avatar_initials': summary['avatar_initials'],
        'status': summary['status'],
        'status_label': summary['status_label'],
        'current_stage': summary['current_stage'],
        'current_stage_key': summary['current_stage_key'],
        'progress_percent': summary['progress_percent'],
        'task_total': summary['task_total'],
        'completed_count': summary['completed_count'],
        'pending_count': summary['pending_count'],
        'paused_count': summary['paused_count'],
        'in_progress_count': summary['in_progress_count'],
        'not_started_count': summary['not_started_count'],
        'overdue_count': summary['overdue_count'],
        'due_soon_count': summary['due_soon_count'],
        'last_update_text': summary['last_update_text'],
        'has_attention': summary['has_attention'],
        'needs_assignment': summary['needs_assignment'],
        'priority_tasks': summary['priority_tasks'],
        'detail_url': reverse('employee_detail', args=[user_id]),
        'quick_assign_url': reverse('employee_assign_task', args=[user_id]),
    }


def _serialize_admin_attention(attention):
    return {
        'lagging_employees': [
            {
                'name': summary['name'],
                'avatar_url': summary['avatar_url'],
                'avatar_initials': summary['avatar_initials'],
                'detail_url': reverse('employee_detail', args=[summary['user'].id]),
                'quick_assign_url': reverse('employee_assign_task', args=[summary['user'].id]),
                'overdue_count': summary['overdue_count'],
            }
            for summary in attention['lagging_employees']
        ],
        'without_tasks_employees': [
            {
                'name': summary['name'],
                'avatar_url': summary['avatar_url'],
                'avatar_initials': summary['avatar_initials'],
                'detail_url': reverse('employee_detail', args=[summary['user'].id]),
                'quick_assign_url': reverse('employee_assign_task', args=[summary['user'].id]),
                'last_update_text': summary['last_update_text'],
            }
            for summary in attention['without_tasks_employees']
        ],
        'paused_assignments': [
            {
                'id': entry.id,
                'task_title': entry.task.title,
                'detail_url': reverse('task_detail', args=[entry.task.id]),
                'employee_name': _user_display_name(entry.user),
                **_user_avatar_data(entry.user, getattr(entry.user, 'employee_profile', None)),
            }
            for entry in attention['paused_assignments']
        ],
        'due_soon_tasks': [
            {
                'id': task.id,
                'title': task.title,
                'detail_url': reverse('task_detail', args=[task.id]),
                'deadline_text': _format_local_datetime(task.deadline),
            }
            for task in attention['due_soon_tasks']
        ],
    }


def _filtered_employee_summaries(request, summaries):
    status_filter = request.GET.get('status', 'all')
    sort_key = request.GET.get('sort', 'name')
    search_query = request.GET.get('q', '').strip().lower()

    if search_query:
        summaries = [
            summary
            for summary in summaries
            if search_query in (summary['user'].username or '').lower()
            or search_query in (summary['user'].first_name or '').lower()
            or search_query in (summary['current_stage'] or '').lower()
        ]

    if status_filter == 'lagging':
        summaries = [summary for summary in summaries if summary['lagging']]
    elif status_filter != 'all':
        summaries = [summary for summary in summaries if summary['status'] == status_filter]

    if sort_key == 'progress':
        summaries.sort(key=lambda summary: (-summary['progress_percent'], summary['user'].username.lower()))
    elif sort_key == 'overdue':
        summaries.sort(key=lambda summary: (-summary['overdue_count'], -summary['due_soon_count'], summary['user'].username.lower()))
    elif sort_key == 'completed':
        summaries.sort(key=lambda summary: (-summary['completed_count'], summary['user'].username.lower()))
    elif sort_key == 'pending':
        summaries.sort(key=lambda summary: (-summary['pending_count'], summary['user'].username.lower()))
    else:
        summaries.sort(key=lambda summary: (summary['user'].first_name or summary['user'].username).lower())

    return summaries, status_filter, sort_key, search_query


def _admin_required(user):
    if not user.is_superuser:
        raise Http404


def _managed_account_target(actor, user_id):
    _admin_required(actor)
    employee = User.objects.select_related('employee_profile').filter(id=user_id).first()
    if not employee:
        raise Http404

    target_is_site_owner = _is_site_owner(employee)
    can_manage_admin_roles = _is_site_owner(actor)
    if target_is_site_owner:
        raise Http404
    if employee.is_superuser and not can_manage_admin_roles:
        raise Http404

    return employee, target_is_site_owner, can_manage_admin_roles


def _can_self_delete_account(user):
    return bool(getattr(user, 'is_authenticated', False) and not _is_site_owner(user))


def _delete_account(user):
    task_ids = list(
        Task.objects.filter(
            Q(assigned_to=user)
            | Q(assigned_users=user)
            | Q(assignee_statuses__user=user)
        )
        .values_list('id', flat=True)
        .distinct()
    )
    user.delete()

    if not task_ids:
        return

    for task in _task_queryset().filter(id__in=task_ids).distinct():
        _sync_task_assignment_statuses(task)


def _normalize_employee_profile(profile):
    today = timezone.localdate()
    if profile.status in {EmployeeProfile.STATUS_IN_PROGRESS, EmployeeProfile.STATUS_COMPLETED} and not profile.started_at:
        profile.started_at = today
    if profile.status == EmployeeProfile.STATUS_COMPLETED:
        profile.completed_at = profile.completed_at or today
    else:
        profile.completed_at = None


def _record_profile_update_activities(profile, actor, old_values):
    if old_values['status'] != profile.status:
        EmployeeActivity.objects.create(
            profile=profile,
            actor=actor,
            description=f'status_changed::{profile.status}',
        )
    if old_values['current_stage'] != profile.current_stage:
        EmployeeActivity.objects.create(
            profile=profile,
            actor=actor,
            description=f'stage_updated::{profile.current_stage}',
        )
    if old_values['started_at'] != profile.started_at:
        EmployeeActivity.objects.create(
            profile=profile,
            actor=actor,
            description='started_at_updated',
        )
    if old_values['completed_at'] != profile.completed_at:
        EmployeeActivity.objects.create(
            profile=profile,
            actor=actor,
            description='completed_at_updated',
        )


def _record_account_update_activities(profile, actor, original_values, updated_employee, password_was_changed):
    if any(original_values[key] != getattr(updated_employee, key) for key in original_values):
        EmployeeActivity.objects.create(
            profile=profile,
            actor=actor,
            description='account_updated',
        )
    if password_was_changed:
        EmployeeActivity.objects.create(
            profile=profile,
            actor=actor,
            description='password_reset',
        )


def _employee_board_visit_state(request):
    session_key = f'taskmaster-board-visits-{request.user.id}'
    visit_count = request.session.get(session_key, 0) + 1
    request.session[session_key] = visit_count
    return {
        'visit_count': visit_count,
        'show_intro': visit_count < 3,
    }


def _log_task_assignment(profile, actor, task_title):
    EmployeeActivity.objects.create(
        profile=profile,
        actor=actor,
        description=f'task_assigned::{task_title}',
    )
