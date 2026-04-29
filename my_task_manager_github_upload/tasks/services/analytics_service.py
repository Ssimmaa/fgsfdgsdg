from datetime import timedelta

from django.db.models import Count
from django.utils import timezone

from ..models import Task, TaskAuditLog


def _admin_analytics_payload():
    now = timezone.now()
    today = timezone.localdate()
    tasks = Task.objects.all()
    completed_tasks = tasks.filter(is_completed=True, completed_at__isnull=False)
    open_tasks = tasks.filter(is_completed=False)
    priority_counts = dict(
        tasks.values_list('priority').annotate(total=Count('id')).values_list('priority', 'total')
    )

    completion_durations = []
    for task in completed_tasks.only('created_at', 'completed_at'):
        if task.completed_at and task.created_at:
            completion_durations.append((task.completed_at - task.created_at).total_seconds() / 86400)
    average_completion_days = round(sum(completion_durations) / len(completion_durations), 1) if completion_durations else 0

    trend = []
    for offset in range(6, -1, -1):
        day = today - timedelta(days=offset)
        created_count = tasks.filter(created_at__date=day).count()
        completed_count = completed_tasks.filter(completed_at__date=day).count()
        trend.append(
            {
                'label': day.strftime('%d.%m'),
                'created': created_count,
                'completed': completed_count,
            }
        )

    audit_action_counts = dict(
        TaskAuditLog.objects.values_list('action').annotate(total=Count('id')).values_list('action', 'total')
    )

    return {
        'total_tasks': tasks.count(),
        'open_tasks': open_tasks.count(),
        'completed_tasks': completed_tasks.count(),
        'overdue_tasks': open_tasks.filter(deadline__lt=now, deadline__isnull=False).count(),
        'due_this_week': open_tasks.filter(deadline__date__gte=today, deadline__date__lte=today + timedelta(days=7)).count(),
        'high_priority_open': open_tasks.filter(priority=Task.PRIORITY_HIGH).count(),
        'average_completion_days': average_completion_days,
        'priority_counts': {
            'high': priority_counts.get(Task.PRIORITY_HIGH, 0),
            'medium': priority_counts.get(Task.PRIORITY_MEDIUM, 0),
            'low': priority_counts.get(Task.PRIORITY_LOW, 0),
        },
        'trend': trend,
        'audit_action_counts': audit_action_counts,
    }
