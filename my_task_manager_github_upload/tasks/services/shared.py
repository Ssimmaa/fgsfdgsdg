from datetime import timedelta

from django.urls import reverse
from django.utils import timezone

from ..models import EmployeeProfile, Task, TaskAssignmentStatus, TaskMessage


def _user_display_name(user):
    return user.first_name or user.username


def _user_avatar_initials(user):
    source = (_user_display_name(user) or 'User').replace('_', ' ').replace('.', ' ').replace('-', ' ').strip()
    parts = [part for part in source.split() if part]
    if len(parts) >= 2:
        return f'{parts[0][0]}{parts[1][0]}'.upper()
    if parts:
        return parts[0][:2].upper()
    return 'U'


def _profile_avatar_url(profile):
    avatar = getattr(profile, 'avatar', None)
    if not avatar:
        return ''
    try:
        return avatar.url
    except ValueError:
        return ''


def _user_avatar_data(user, profile=None):
    profile = profile or _employee_profile(user)
    return {
        'avatar_url': _profile_avatar_url(profile),
        'avatar_initials': _user_avatar_initials(user),
    }


def _task_display_status(task):
    return getattr(task, 'current_status', task.status)


def _task_display_is_completed(task):
    return getattr(task, 'current_is_completed', task.is_completed)


def _task_status_label(status):
    return dict(Task.STATUS_CHOICES).get(status, status.replace('_', ' ').title())


def _task_priority_label(priority):
    return dict(Task.PRIORITY_CHOICES).get(priority, priority.replace('_', ' ').title())


def _status_translation_key(value):
    normalized = (value or '').strip().lower().replace(' ', '_')
    if normalized in {
        EmployeeProfile.STATUS_NOT_STARTED,
        EmployeeProfile.STATUS_IN_PROGRESS,
        EmployeeProfile.STATUS_COMPLETED,
        EmployeeProfile.STATUS_BLOCKED,
        Task.STATUS_NOT_STARTED,
        Task.STATUS_IN_PROGRESS,
        Task.STATUS_PAUSED,
        Task.STATUS_COMPLETED,
        'lagging',
    }:
        return f'status.{normalized}'
    return ''


def _priority_translation_key(value):
    normalized = (value or '').strip().lower().replace(' ', '_')
    if normalized in {
        Task.PRIORITY_LOW,
        Task.PRIORITY_MEDIUM,
        Task.PRIORITY_HIGH,
    }:
        return f'priority.{normalized}'
    return ''


def _format_local_datetime(value, fallback=''):
    if not value:
        return fallback
    return timezone.localtime(value).strftime('%d.%m.%Y %H:%M')


def _task_deadline_value(task):
    return timezone.localtime(task.deadline) if task.deadline else None


def _task_is_overdue(task, now=None):
    now = now or timezone.now()
    deadline = _task_deadline_value(task)
    return bool(deadline and deadline < now and not _task_display_is_completed(task))


def _task_is_due_soon(task, now=None):
    now = now or timezone.now()
    deadline = _task_deadline_value(task)
    return bool(deadline and now <= deadline <= now + timedelta(hours=72) and not _task_display_is_completed(task))


def _serialize_task_brief(task):
    assigned_users = []
    if task.assigned_to:
        assigned_users.append({
            'id': task.assigned_to.id,
            'name': task.assigned_to.get_full_name() or task.assigned_to.username,
            'username': task.assigned_to.username,
        })
    for user in task.assigned_users.all():
        if user != task.assigned_to:
            assigned_users.append({
                'id': user.id,
                'name': user.get_full_name() or user.username,
                'username': user.username,
            })
    
    return {
        'id': task.id,
        'title': task.title,
        'detail_url': reverse('task_detail', args=[task.id]),
        'status': _task_display_status(task),
        'status_label': _task_status_label(_task_display_status(task)),
        'priority': task.priority,
        'priority_label': _task_priority_label(task.priority),
        'priority_key': _priority_translation_key(task.priority),
        'assigned_users': assigned_users,
        'deadline_text': _format_local_datetime(task.deadline),
        'completed_at_text': _format_local_datetime(getattr(task, 'current_completed_at', None)),
        'is_overdue': _task_is_overdue(task),
        'is_due_soon': _task_is_due_soon(task),
    }


def _task_message_kind_translation_key(kind):
    if kind in {
        TaskMessage.KIND_NOTE,
        TaskMessage.KIND_CLARIFICATION,
        TaskMessage.KIND_CHANGE_REQUEST,
        TaskMessage.KIND_BLOCKER,
    }:
        return f'chat.kind.{kind}'
    return 'chat.kind.note'


def _employee_profile(user):
    try:
        return user.employee_profile
    except EmployeeProfile.DoesNotExist:
        profile, _ = EmployeeProfile.objects.get_or_create(user=user)
        return profile
