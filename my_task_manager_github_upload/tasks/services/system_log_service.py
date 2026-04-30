from itertools import chain

from django.urls import reverse

from ..models import EmployeeActivity, TaskAuditLog
from ..site_update_log import SITE_UPDATE_LOG
from .shared import _format_local_datetime, _status_translation_key, _user_avatar_data, _user_display_name
from .task_service import _serialize_task_audit_entry


def _system_actor_payload(actor):
    if actor:
        avatar_data = _user_avatar_data(actor, getattr(actor, 'employee_profile', None))
        return {
            'actor_name': _user_display_name(actor),
            'actor_name_key': '',
            'actor_avatar_url': avatar_data['avatar_url'],
            'actor_avatar_initials': avatar_data['avatar_initials'],
        }

    return {
        'actor_name': 'System',
        'actor_name_key': 'siteLog.systemActor',
        'actor_avatar_url': '',
        'actor_avatar_initials': 'SY',
    }


def _task_system_log_entries(limit=60):
    entries = []
    queryset = (
        TaskAuditLog.objects.select_related('task', 'actor', 'actor__employee_profile')
        .order_by('-created_at')[:limit]
    )
    for entry in queryset:
        serialized = _serialize_task_audit_entry(entry)
        entries.append(
            {
                **serialized,
                'created_at': entry.created_at,
                'scope_key': 'siteLog.scopeTask',
                'detail_label': entry.task.title,
                'detail_url': reverse('task_detail', args=[entry.task_id]),
                'message_employee': '',
                'message_task': '',
                'message_stage': '',
            }
        )
    return entries


def _employee_event_entry(activity):
    description = activity.description or ''
    subject_name = _user_display_name(activity.profile.user)
    message_key = ''
    message_vars = {
        'employee': subject_name,
        'task': '',
        'stage': '',
    }
    message_var_keys = {}

    if description.startswith('task_assigned::'):
        message_key = 'siteLog.employeeTaskAssigned'
        message_vars['task'] = description.split('::', 1)[1]
    elif description.startswith('status_changed::'):
        message_key = 'siteLog.employeeStatusChanged'
        raw_status = description.split('::', 1)[1]
        status_key = _status_translation_key(raw_status)
        if status_key:
            message_var_keys['status'] = status_key
    elif description.startswith('stage_updated::'):
        message_key = 'siteLog.employeeStageUpdated'
        stage_value = description.split('::', 1)[1]
        if stage_value:
            message_vars['stage'] = stage_value
        else:
            message_var_keys['stage'] = 'siteLog.employeeNoStage'
    elif description == 'started_at_updated':
        message_key = 'siteLog.employeeStartDateUpdated'
    elif description == 'completed_at_updated':
        message_key = 'siteLog.employeeCompletionDateUpdated'
    elif description == 'account_updated':
        message_key = 'siteLog.employeeAccountUpdated'
    elif description == 'password_reset':
        message_key = 'siteLog.employeePasswordReset'

    if not message_key:
        return None

    actor_payload = _system_actor_payload(activity.actor)
    return {
        **actor_payload,
        'id': f'employee-{activity.id}',
        'created_at': activity.created_at,
        'created_at_text': _format_local_datetime(activity.created_at),
        'scope_key': 'siteLog.scopeEmployee',
        'detail_label': subject_name,
        'detail_url': reverse('employee_detail', args=[activity.profile.user_id]),
        'message_key': message_key,
        'message': description,
        'message_title': '',
        'message_name': '',
        'message_status_key': message_var_keys.get('status', ''),
        'message_employee': message_vars['employee'],
        'message_task': message_vars['task'],
        'message_stage': message_vars['stage'],
        'message_stage_key': message_var_keys.get('stage', ''),
    }


def _employee_system_log_entries(limit=40):
    queryset = (
        EmployeeActivity.objects.select_related('profile__user', 'actor', 'actor__employee_profile')
        .order_by('-created_at')[:limit]
    )
    return [entry for entry in (_employee_event_entry(activity) for activity in queryset) if entry]


def _system_event_entries(limit=80):
    entries = chain(_task_system_log_entries(limit=limit), _employee_system_log_entries(limit=limit))
    return sorted(entries, key=lambda item: item['created_at'], reverse=True)[:limit]


def _site_update_entries():
    return sorted(SITE_UPDATE_LOG, key=lambda item: item['released_on'], reverse=True)
