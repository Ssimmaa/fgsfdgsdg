from datetime import timedelta

from django.contrib.auth.models import User
from django.db.models import Prefetch
from django.urls import reverse
from django.utils import timezone

from ..models import Task, TaskTemplate, TaskTemplateSubTask
from .audit_service import _log_task_audit
from .task_service import _sync_task_assignment_statuses


def _task_templates_queryset():
    return TaskTemplate.objects.select_related('assigned_to', 'created_by').prefetch_related(
        'assigned_users',
        Prefetch('subtasks', queryset=TaskTemplateSubTask.objects.order_by('sort_order', 'id')),
    )


def _template_deadline(template, base_datetime=None):
    base_datetime = base_datetime or timezone.now()
    return base_datetime + timedelta(days=template.deadline_offset_days or 0)


def _template_period_date(template, today=None):
    today = today or timezone.localdate()
    if template.recurrence == TaskTemplate.RECURRENCE_DAILY:
        return today
    if template.recurrence == TaskTemplate.RECURRENCE_WEEKLY:
        return today - timedelta(days=today.weekday())
    if template.recurrence == TaskTemplate.RECURRENCE_MONTHLY:
        return today.replace(day=1)
    return None


def _create_task_from_template(template, *, actor=None, generated_for_date=None):
    deadline = _template_deadline(template)
    task = Task.objects.create(
        title=template.title,
        description=template.description,
        priority=template.priority,
        deadline=deadline,
        assigned_to=template.assigned_to,
        source_template=template,
        generated_for_date=generated_for_date,
    )
    participant_ids = list(template.assigned_users.values_list('id', flat=True))
    if template.assigned_to_id and template.assigned_to_id not in participant_ids:
        participant_ids.insert(0, template.assigned_to_id)
    if participant_ids:
        task.assigned_users.set(User.objects.filter(id__in=participant_ids))

    for index, subtask in enumerate(template.subtasks.all()):
        task.subtasks.create(title=subtask.title)

    _sync_task_assignment_statuses(task)
    _log_task_audit(
        task,
        actor,
        'template_applied' if generated_for_date is None else 'recurring_generated',
        f"Opgaven blev oprettet fra skabelonen '{template.name}'.",
        {'template_id': template.id, 'template_name': template.name},
    )
    return task


def _materialize_due_recurring_tasks(actor=None):
    today = timezone.localdate()
    created_tasks = []
    templates = _task_templates_queryset().filter(is_active=True).exclude(recurrence=TaskTemplate.RECURRENCE_NONE)
    for template in templates:
        period_date = _template_period_date(template, today=today)
        if not period_date:
            continue
        if template.last_generated_for == period_date:
            continue
        if Task.objects.filter(source_template=template, generated_for_date=period_date).exists():
            template.last_generated_for = period_date
            template.save(update_fields=['last_generated_for', 'updated_at'])
            continue

        created_tasks.append(_create_task_from_template(template, actor=actor, generated_for_date=period_date))
        template.last_generated_for = period_date
        template.save(update_fields=['last_generated_for', 'updated_at'])
    return created_tasks


def _serialize_task_template(template):
    return {
        'id': template.id,
        'name': template.name,
        'title': template.title,
        'description': template.description,
        'priority': template.priority,
        'priority_label': dict(Task.PRIORITY_CHOICES).get(template.priority, template.priority),
        'recurrence': template.recurrence,
        'recurrence_label': dict(TaskTemplate.RECURRENCE_CHOICES).get(template.recurrence, template.recurrence),
        'deadline_offset_days': template.deadline_offset_days,
        'assigned_to_id': template.assigned_to_id or '',
        'assigned_to_name': template.assigned_to.first_name or template.assigned_to.username if template.assigned_to else '',
        'assigned_user_ids': list(template.assigned_users.values_list('id', flat=True)),
        'subtasks': [subtask.title for subtask in template.subtasks.all()],
        'subtask_count': template.subtasks.count(),
        'is_active': template.is_active,
        'use_url': f"{reverse('create_task')}?template={template.id}",
        'delete_url': reverse('delete_task_template', args=[template.id]),
    }


def _template_initial_payload(template):
    return {
        'title': template.title,
        'description': template.description,
        'priority': template.priority,
        'deadline': _template_deadline(template).strftime('%Y-%m-%dT%H:%M'),
        'assigned_to': template.assigned_to_id or '',
        'assigned_users': list(template.assigned_users.values_list('id', flat=True)),
        'subtasks': [subtask.title for subtask in template.subtasks.all()],
    }


def _save_task_template_from_task(task, *, actor, name, recurrence, deadline_offset_days, is_active=True):
    template, _created = TaskTemplate.objects.update_or_create(
        name=name.strip(),
        defaults={
            'title': task.title,
            'description': task.description or '',
            'priority': task.priority,
            'deadline_offset_days': max(0, int(deadline_offset_days or 0)),
            'assigned_to': task.assigned_to,
            'recurrence': recurrence or TaskTemplate.RECURRENCE_NONE,
            'is_active': is_active,
            'created_by': actor,
        },
    )
    participant_ids = list(task.assigned_users.values_list('id', flat=True))
    if task.assigned_to_id and task.assigned_to_id not in participant_ids:
        participant_ids.insert(0, task.assigned_to_id)
    template.assigned_users.set(User.objects.filter(id__in=participant_ids))
    template.subtasks.all().delete()
    TaskTemplateSubTask.objects.bulk_create(
        [
            TaskTemplateSubTask(template=template, title=subtask.title, sort_order=index)
            for index, subtask in enumerate(task.subtasks.order_by('id'))
        ]
    )
    return template
