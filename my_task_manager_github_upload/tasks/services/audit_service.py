from ..models import TaskAuditLog


def _log_task_audit(task, actor, action, message, metadata=None):
    return TaskAuditLog.objects.create(
        task=task,
        actor=actor if getattr(actor, 'is_authenticated', False) else None,
        action=action,
        message=message,
        metadata=metadata or {},
    )
