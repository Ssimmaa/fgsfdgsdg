from django.db.models.signals import post_delete
from django.dispatch import receiver

from .models import EmployeeProfile, TaskAttachment
from .services.attachment_service import _delete_attachment_file
from .services.avatar_service import _delete_avatar_file


@receiver(post_delete, sender=EmployeeProfile)
def _cleanup_profile_avatar(sender, instance, **kwargs):
    if instance.avatar:
        _delete_avatar_file(instance.avatar.name)


@receiver(post_delete, sender=TaskAttachment)
def _cleanup_task_attachment_file(sender, instance, **kwargs):
    if instance.file:
        _delete_attachment_file(instance.file.name)
