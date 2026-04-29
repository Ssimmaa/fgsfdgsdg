from pathlib import Path

from django.db.models import Q
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.utils import timezone
from django.utils.dateparse import parse_datetime

from ..forms import TaskMessageForm
from ..models import EmployeeActivity, SubTask, Task, TaskAssignmentStatus, TaskAttachment, TaskDismissal, TaskMessage
from .audit_service import _log_task_audit
from .shared import (
    _employee_profile,
    _format_local_datetime,
    _task_display_is_completed,
    _task_priority_label,
    _task_display_status,
    _task_is_due_soon,
    _task_is_overdue,
    _task_message_kind_translation_key,
    _priority_translation_key,
    _status_translation_key,
    _task_status_label,
    _user_avatar_data,
    _user_display_name,
)


def _task_queryset():
    return Task.objects.select_related('assigned_to', 'source_template').prefetch_related(
        'subtasks',
        'assigned_users',
        'assignee_statuses__user',
        'dismissals',
        'attachments',
    )


def _task_participants(task):
    usernames = list(task.assigned_users.values_list('username', flat=True))
    if task.assigned_to and task.assigned_to.username not in usernames:
        usernames.insert(0, task.assigned_to.username)
    return usernames


def _additional_task_participants(task):
    usernames = _task_participants(task)
    if task.assigned_to:
        return [username for username in usernames if username != task.assigned_to.username]
    return usernames


def _task_participant_users(task):
    participants = list(task.assigned_users.all())
    if task.assigned_to and all(user.id != task.assigned_to_id for user in participants):
        participants.insert(0, task.assigned_to)

    ordered_participants = []
    seen_ids = set()
    for participant in participants:
        if participant.id in seen_ids:
            continue
        seen_ids.add(participant.id)
        ordered_participants.append(participant)
    return ordered_participants


def _task_status_entries(task):
    return list(task.assignee_statuses.all())


def _task_status_map(task):
    return {entry.user_id: entry for entry in _task_status_entries(task)}


def _set_assignment_status(entry, status):
    entry.status = status
    entry.completed_at = timezone.now() if status == TaskAssignmentStatus.STATUS_COMPLETED else None
    if status != TaskAssignmentStatus.STATUS_COMPLETED:
        TaskDismissal.objects.filter(task=entry.task, user=entry.user).delete()


def _recalculate_task_rollup(task):
    status_entries = _task_status_entries(task)
    if not status_entries:
        status = Task.STATUS_NOT_STARTED
        is_completed = False
        completed_at = None
    else:
        statuses = [entry.status for entry in status_entries]
        completed_entries = [entry.completed_at for entry in status_entries if entry.completed_at]
        if all(value == TaskAssignmentStatus.STATUS_COMPLETED for value in statuses):
            status = Task.STATUS_COMPLETED
            is_completed = True
            completed_at = max(completed_entries) if completed_entries else timezone.now()
        elif any(value == TaskAssignmentStatus.STATUS_IN_PROGRESS for value in statuses):
            status = Task.STATUS_IN_PROGRESS
            is_completed = False
            completed_at = None
        elif any(value == TaskAssignmentStatus.STATUS_PAUSED for value in statuses):
            status = Task.STATUS_PAUSED
            is_completed = False
            completed_at = None
        elif any(value == TaskAssignmentStatus.STATUS_COMPLETED for value in statuses):
            status = Task.STATUS_IN_PROGRESS
            is_completed = False
            completed_at = None
        else:
            status = Task.STATUS_NOT_STARTED
            is_completed = False
            completed_at = None

    if task.status != status or task.is_completed != is_completed or task.completed_at != completed_at:
        task.status = status
        task.is_completed = is_completed
        task.completed_at = completed_at
        task.save(update_fields=['status', 'is_completed', 'completed_at'])
    return task


def _sync_task_assignment_statuses(task):
    participants = _task_participant_users(task)
    participant_ids = {participant.id for participant in participants}
    existing_map = _task_status_map(task)
    has_changes = False

    for participant in participants:
        if participant.id not in existing_map:
            existing_map[participant.id] = TaskAssignmentStatus.objects.create(task=task, user=participant)
            has_changes = True

    stale_ids = set(existing_map) - participant_ids
    if stale_ids:
        TaskAssignmentStatus.objects.filter(task=task, user_id__in=stale_ids).delete()
        has_changes = True

    if has_changes and hasattr(task, '_prefetched_objects_cache'):
        task._prefetched_objects_cache.pop('assignee_statuses', None)

    return _recalculate_task_rollup(task)


def _task_status_counts(task):
    counts = {status: 0 for status, _ in TaskAssignmentStatus.STATUS_CHOICES}
    for entry in _task_status_entries(task):
        counts[entry.status] = counts.get(entry.status, 0) + 1
    return counts


def _serialize_task_status_counts(task):
    counts = getattr(task, 'status_counts', _task_status_counts(task))
    return [
        {
            'status': status,
            'label': _task_status_label(status),
            'count': counts.get(status, 0),
        }
        for status, _label in TaskAssignmentStatus.STATUS_CHOICES
        if counts.get(status, 0)
    ]


def _serialize_participant_statuses(task):
    status_map = _task_status_map(task)
    payload = []
    for participant in _task_participant_users(task):
        entry = status_map.get(participant.id)
        if not entry:
            continue
        payload.append(
            {
                'user_id': participant.id,
                'name': participant.first_name or participant.username,
                'username': participant.username,
                'status': entry.status,
                'status_label': _task_status_label(entry.status),
                'completed_at': entry.completed_at,
                'completed_at_text': _format_local_datetime(entry.completed_at),
                'is_assignee': participant.id == task.assigned_to_id,
            }
        )
    return payload


def _attach_viewer_task_state(task, user, status_entry=None):
    _sync_task_assignment_statuses(task)
    if user.is_superuser:
        task.current_status = task.status
        task.current_is_completed = task.is_completed
        task.current_completed_at = task.completed_at
    else:
        if status_entry is None:
            status_entry = TaskAssignmentStatus.objects.get(task=task, user=user)
        task.current_status_entry = status_entry
        task.current_status = status_entry.status
        task.current_is_completed = status_entry.status == TaskAssignmentStatus.STATUS_COMPLETED
        task.current_completed_at = status_entry.completed_at

    task.current_status_label = _task_status_label(task.current_status)
    task.can_update_status = not user.is_superuser
    task.can_dismiss_completed = not user.is_superuser and task.current_is_completed
    task.dismiss_url = reverse('dismiss_completed_task', args=[task.id]) if task.can_dismiss_completed else ''
    task.participant_statuses_data = _serialize_participant_statuses(task)
    task.status_counts = _task_status_counts(task)
    task.status_counts_data = _serialize_task_status_counts(task)
    return task


def _decorate_board_tasks(tasks):
    for task in tasks:
        task.additional_participants = _additional_task_participants(task)
        task.subtask_total = task.subtasks.count()
        task.subtask_completed = sum(1 for subtask in task.subtasks.all() if subtask.is_completed)
    return tasks


def _progress_payload(tasks):
    total = len(tasks)
    completed = sum(1 for task in tasks if _task_display_is_completed(task))
    return {
        'total': total,
        'completed': completed,
        'active': total - completed,
        'upcoming': sum(1 for task in tasks if not _task_display_is_completed(task) and task.deadline),
        'completion_percent': round((completed / total) * 100) if total else 0,
    }


def _task_wall_metrics(tasks):
    now = timezone.now()
    due_soon = 0
    overdue = 0
    paused = 0
    shared = 0

    for task in tasks:
        if _task_display_status(task) == TaskAssignmentStatus.STATUS_PAUSED:
            paused += 1

        if len(_task_participants(task)) > 1:
            shared += 1

        if task.deadline and not _task_display_is_completed(task):
            if _task_is_overdue(task, now):
                overdue += 1
            elif _task_is_due_soon(task, now):
                due_soon += 1

    return {
        'due_soon': due_soon,
        'overdue': overdue,
        'paused': paused,
        'shared': shared,
    }


def _task_request_feed(limit=6):
    requests = (
        TaskMessage.objects.select_related('task', 'author', 'author__employee_profile')
        .filter(author__is_superuser=False)
        .order_by('-created_at')[:limit]
    )
    return [
        {
            'id': message.id,
            'task_id': message.task_id,
            'task_title': message.task.title,
            'detail_url': reverse('task_detail', args=[message.task_id]),
            'author_name': _user_display_name(message.author),
            **_user_avatar_data(message.author, getattr(message.author, 'employee_profile', None)),
            'kind': message.kind,
            'kind_label': dict(TaskMessage.KIND_CHOICES).get(message.kind, message.kind.replace('_', ' ').title()),
            'kind_label_key': _task_message_kind_translation_key(message.kind),
            'body_preview': message.body[:160],
            'created_at_text': _format_local_datetime(message.created_at),
        }
        for message in requests
    ]


def _visible_tasks_for_user(user, include_dismissed=False):
    queryset = _task_queryset()
    if user.is_superuser:
        return queryset

    queryset = queryset.filter(Q(assigned_to=user) | Q(assigned_users=user)).distinct()
    if include_dismissed:
        return queryset
    return queryset.exclude(dismissals__user=user)


def _get_visible_task_or_404(user, task_id):
    return get_object_or_404(_visible_tasks_for_user(user), id=task_id)


def _serialize_subtask(subtask):
    return {
        'id': subtask.id,
        'title': subtask.title,
        'is_completed': subtask.is_completed,
        'deadline_text': _format_local_datetime(subtask.deadline),
    }


def _can_manage_task_message(user, message):
    return user.is_superuser or user.id == message.author_id


def _can_manage_task_attachment(user, attachment):
    if user.is_superuser:
        return True
    if attachment.uploaded_by_id == user.id:
        return True
    if attachment.message_id and attachment.message.author_id == user.id:
        return True
    return False


def _format_file_size(size_bytes):
    if size_bytes >= 1024 * 1024:
        return f'{size_bytes / (1024 * 1024):.1f} MB'
    if size_bytes >= 1024:
        return f'{size_bytes / 1024:.0f} KB'
    return f'{size_bytes} B'


def _serialize_attachment(attachment, viewer=None):
    delete_url = ''
    if viewer and _can_manage_task_attachment(viewer, attachment):
        delete_url = reverse('delete_task_attachment', args=[attachment.id])

    try:
        file_url = attachment.file.url
    except ValueError:
        file_url = ''

    extension = Path(attachment.original_name or '').suffix.lower().lstrip('.')
    return {
        'id': attachment.id,
        'name': attachment.original_name,
        'url': file_url,
        'size': attachment.file_size,
        'size_text': _format_file_size(attachment.file_size),
        'content_type': attachment.content_type,
        'extension': extension,
        'uploaded_at_text': _format_local_datetime(attachment.created_at),
        'delete_url': delete_url,
        'can_delete': bool(delete_url),
        'uploaded_by_name': _user_display_name(attachment.uploaded_by) if attachment.uploaded_by else '',
    }


def _serialize_task_message(message, viewer=None):
    can_manage = bool(viewer and _can_manage_task_message(viewer, message))
    attachments = [
        _serialize_attachment(attachment, viewer)
        for attachment in getattr(message, '_prefetched_attachments', list(message.attachments.all()))
    ]
    return {
        'id': message.id,
        'author_name': message.author.first_name or message.author.username,
        'author_username': message.author.username,
        'author_avatar_url': _user_avatar_data(message.author, getattr(message.author, 'employee_profile', None))['avatar_url'],
        'author_avatar_initials': _user_avatar_data(message.author, getattr(message.author, 'employee_profile', None))['avatar_initials'],
        'is_admin': message.author.is_superuser,
        'author_role_key': 'role.admin' if message.author.is_superuser else 'role.employee',
        'kind': message.kind,
        'kind_label': dict(TaskMessage.KIND_CHOICES).get(message.kind, message.kind.replace('_', ' ').title()),
        'kind_label_key': _task_message_kind_translation_key(message.kind),
        'body': message.body,
        'attachments': attachments,
        'created_at_text': _format_local_datetime(message.created_at),
        'can_manage': can_manage,
        'edit_url': reverse('update_task_message', args=[message.task_id, message.id]) if can_manage else '',
        'delete_url': reverse('delete_task_message', args=[message.task_id, message.id]) if can_manage else '',
    }


def _serialize_task(task, user):
    participants = _task_participants(task)
    subtasks = list(task.subtasks.all())
    participant_statuses = getattr(task, 'participant_statuses_data', _serialize_participant_statuses(task))
    can_dismiss_completed = getattr(task, 'can_dismiss_completed', False)
    completed_at = getattr(task, 'current_completed_at', None)
    deadline = task.deadline
    attachment_count = sum(1 for attachment in task.attachments.all() if not attachment.message_id)

    return {
        'id': task.id,
        'title': task.title,
        'description': task.description or '',
        'description_short': (task.description or '')[:140],
        'status': _task_display_status(task),
        'status_label': _task_status_label(_task_display_status(task)),
        'priority': task.priority,
        'priority_label': _task_priority_label(task.priority),
        'priority_key': _priority_translation_key(task.priority),
        'is_completed': _task_display_is_completed(task),
        'assigned_to': task.assigned_to.username if task.assigned_to else '',
        'assigned_users': participants,
        'participant_statuses': participant_statuses,
        'status_counts': _serialize_task_status_counts(task),
        'deadline_text': _format_local_datetime(deadline),
        'deadline_iso': timezone.localtime(deadline).isoformat() if deadline else '',
        'has_deadline': bool(deadline),
        'created_at_text': timezone.localtime(task.created_at).strftime('%d.%m.%Y'),
        'completed_at_text': _format_local_datetime(completed_at),
        'completed_at_iso': timezone.localtime(completed_at).isoformat() if completed_at else '',
        'attachment_count': attachment_count,
        'source_template_id': task.source_template_id or '',
        'source_template_name': task.source_template.name if task.source_template_id else '',
        'generated_for_date': task.generated_for_date.isoformat() if task.generated_for_date else '',
        'subtasks': [_serialize_subtask(subtask) for subtask in subtasks],
        'subtask_total': len(subtasks),
        'subtask_completed': sum(1 for subtask in subtasks if subtask.is_completed),
        'detail_url': reverse('task_detail', args=[task.id]),
        'edit_url': reverse('edit_task', args=[task.id]),
        'delete_url': reverse('delete_task', args=[task.id]),
        'dismiss_url': getattr(task, 'dismiss_url', ''),
        'toggle_url': reverse('toggle_task', args=[task.id]),
        'status_url': reverse('update_task_status', args=[task.id]),
        'can_edit': user.is_superuser,
        'can_update_status': not user.is_superuser,
        'can_dismiss_completed': can_dismiss_completed,
    }


def _parse_optional_datetime(value):
    if not value:
        return None

    parsed_value = parse_datetime(value)
    if parsed_value and timezone.is_naive(parsed_value):
        return timezone.make_aware(parsed_value, timezone.get_current_timezone())
    return parsed_value


def _save_subtasks(task, post_data, actor=None):
    added_count = 0
    updated_count = 0
    removed_count = 0

    for subtask in task.subtasks.all():
        title = post_data.get(f'subtask_title_{subtask.id}')
        deadline = post_data.get(f'subtask_deadline_{subtask.id}')
        if title is None:
            continue

        cleaned_title = title.strip()
        parsed_deadline = _parse_optional_datetime(deadline)
        if cleaned_title:
            if subtask.title != cleaned_title or subtask.deadline != parsed_deadline:
                subtask.title = cleaned_title
                subtask.deadline = parsed_deadline
                subtask.save(update_fields=['title', 'deadline'])
                updated_count += 1
        else:
            subtask.delete()
            removed_count += 1

    new_titles = post_data.getlist('new_subtask_title')
    new_deadlines = post_data.getlist('new_subtask_deadline')
    for title, deadline in zip(new_titles, new_deadlines):
        cleaned_title = title.strip()
        if cleaned_title:
            SubTask.objects.create(task=task, title=cleaned_title, deadline=_parse_optional_datetime(deadline))
            added_count += 1

    if actor and any((added_count, updated_count, removed_count)):
        change_parts = []
        if added_count:
            change_parts.append(f'{added_count} added')
        if updated_count:
            change_parts.append(f'{updated_count} updated')
        if removed_count:
            change_parts.append(f'{removed_count} removed')
        _log_task_audit(
            task,
            actor,
            'subtasks_updated',
            f'Updated the checklist ({", ".join(change_parts)}).',
            {
                'added': added_count,
                'updated': updated_count,
                'removed': removed_count,
            },
        )


def _log_task_activity(task, actor, previous_status, new_status):
    if previous_status == new_status:
        return

    if new_status == Task.STATUS_COMPLETED:
        description = f'task_completed::{task.title}'
        audit_action = 'task_completed'
        audit_message = 'Marked the task as completed.'
    elif previous_status == Task.STATUS_COMPLETED:
        description = f'task_reopened::{task.title}'
        audit_action = 'task_reopened'
        audit_message = 'Reopened the task.'
    else:
        description = f'task_status_changed::{task.title}::{new_status}'
        audit_action = 'task_status_changed'
        audit_message = f'Changed status to {_task_status_label(new_status)}.'

    if not actor.is_superuser:
        EmployeeActivity.objects.create(
            profile=_employee_profile(actor),
            actor=actor,
            description=description,
        )

    _log_task_audit(
        task,
        actor,
        audit_action,
        audit_message,
        {
            'previous_status': previous_status,
            'new_status': new_status,
        },
    )


def _employee_status_entry(task, user):
    _sync_task_assignment_statuses(task)
    return TaskAssignmentStatus.objects.get(task=task, user=user)


def _task_messages(task):
    messages = list(task.messages.select_related('author', 'author__employee_profile').prefetch_related('attachments').order_by('created_at'))
    for message in messages:
        message._prefetched_attachments = list(message.attachments.all())
    return messages


def _task_level_attachments(task):
    return list(
        task.attachments.filter(message__isnull=True)
        .select_related('uploaded_by', 'uploaded_by__employee_profile')
        .order_by('created_at')
    )


def _quoted_message_value(message):
    for quote in ('"', "'"):
        if quote in message:
            parts = message.split(quote)
            if len(parts) >= 3:
                return parts[1]
    return ''


def _audit_message_payload(entry):
    metadata = entry.metadata or {}
    action = entry.action
    message_vars = {}
    message_var_keys = {}
    message_key = {
        'task_created': 'audit.taskCreated',
        'task_updated': 'audit.taskUpdated',
        'message_posted': 'audit.messagePosted',
        'message_updated': 'audit.messageUpdated',
        'message_deleted': 'audit.messageDeleted',
        'subtasks_updated': 'audit.checklistUpdated',
        'task_completed': 'audit.taskCompleted',
        'task_reopened': 'audit.taskReopened',
    }.get(action, '')

    if action == 'attachment_deleted':
        message_key = 'audit.attachmentDeleted'
        message_vars['name'] = metadata.get('attachment_name') or _quoted_message_value(entry.message)
    elif action == 'task_status_changed':
        message_key = 'audit.taskStatusChanged'
        status_key = _status_translation_key(metadata.get('new_status'))
        if status_key:
            message_var_keys['status'] = status_key
        else:
            message_vars['status'] = _quoted_message_value(entry.message) or entry.message.rsplit(' ', 1)[-1].rstrip('.')
    elif action == 'subtask_toggled':
        message_key = 'audit.subtaskCompleted' if metadata.get('is_completed') else 'audit.subtaskReopened'
        message_vars['title'] = metadata.get('subtask_title') or _quoted_message_value(entry.message)
    elif action == 'template_applied':
        message_key = 'audit.templateApplied'
        message_vars['name'] = metadata.get('template_name') or _quoted_message_value(entry.message)
    elif action == 'recurring_generated':
        message_key = 'audit.recurringGenerated'
        message_vars['name'] = metadata.get('template_name') or _quoted_message_value(entry.message)

    return message_key, message_vars, message_var_keys


def _serialize_task_audit_entry(entry):
    actor = entry.actor
    avatar_data = _user_avatar_data(actor, getattr(actor, 'employee_profile', None)) if actor else {'avatar_url': '', 'avatar_initials': 'SY'}
    message_key, message_vars, message_var_keys = _audit_message_payload(entry)
    return {
        'id': entry.id,
        'action': entry.action,
        'message': entry.message,
        'message_key': message_key,
        'message_vars': message_vars,
        'message_var_keys': message_var_keys,
        'message_name': message_vars.get('name', ''),
        'message_title': message_vars.get('title', ''),
        'message_status_key': message_var_keys.get('status', ''),
        'created_at_text': _format_local_datetime(entry.created_at),
        'actor_name': _user_display_name(actor) if actor else 'System',
        'actor_name_key': '' if actor else 'siteLog.systemActor',
        'actor_avatar_url': avatar_data['avatar_url'],
        'actor_avatar_initials': avatar_data['avatar_initials'],
    }


def _task_audit_entries(task, limit=20):
    return list(
        task.audit_logs.select_related('actor', 'actor__employee_profile')
        .order_by('-created_at')[:limit]
    )


def _get_manageable_task_message_or_404(user, task_id, message_id):
    task = _get_visible_task_or_404(user, task_id)
    message = get_object_or_404(
        TaskMessage.objects.select_related('task', 'author'),
        id=message_id,
        task=task,
    )
    if not _can_manage_task_message(user, message):
        raise Http404
    return task, message


def _get_manageable_task_attachment_or_404(user, attachment_id):
    attachment = get_object_or_404(
        TaskAttachment.objects.select_related(
            'task',
            'message',
            'message__task',
            'message__author',
            'uploaded_by',
        ),
        id=attachment_id,
    )
    task = attachment.message.task if attachment.message_id else attachment.task
    if not task:
        raise Http404
    _get_visible_task_or_404(user, task.id)
    if not _can_manage_task_attachment(user, attachment):
        raise Http404
    return attachment


def _task_detail_context(task, request_user, message_form=None, editing_message=None, editing_message_form=None):
    _attach_viewer_task_state(task, request_user)
    subtasks = list(task.subtasks.all())
    completed_subtasks = sum(1 for subtask in subtasks if subtask.is_completed)
    return {
        'task': task,
        'additional_participants': _additional_task_participants(task),
        'participant_statuses': getattr(task, 'participant_statuses_data', []),
        'status_counts': _serialize_task_status_counts(task),
        'subtask_total': len(subtasks),
        'subtask_completed': completed_subtasks,
        'task_messages': [_serialize_task_message(message, request_user) for message in _task_messages(task)],
        'task_attachments': [_serialize_attachment(attachment, request_user) for attachment in _task_level_attachments(task)],
        'task_audit_entries': [_serialize_task_audit_entry(entry) for entry in _task_audit_entries(task)],
        'message_form': message_form or TaskMessageForm(),
        'editing_message_id': editing_message.id if editing_message else None,
        'editing_message_form': editing_message_form,
    }


def _task_form_context(form, task, request_user, page_mode):
    return {
        'form': form,
        'task': task,
        'page_mode': page_mode,
        'show_assignment_fields': request_user.is_superuser,
    }


def _form_error_list(form):
    return [error for field_errors in form.errors.values() for error in field_errors]
