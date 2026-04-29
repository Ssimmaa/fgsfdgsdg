from pathlib import PurePosixPath
from uuid import uuid4

from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.files.storage import default_storage

from ..models import TaskAttachment

ATTACHMENT_ALLOWED_TYPES = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.csv': 'text/csv',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}


def _attachment_size_limit_mb():
    return getattr(settings, 'TASK_ATTACHMENT_MAX_MB', 12)


def _attachment_size_limit_bytes():
    return _attachment_size_limit_mb() * 1024 * 1024


def _attachment_extension(file_name):
    lowered_name = (file_name or '').lower()
    if '.' not in lowered_name:
        return ''
    return f".{lowered_name.rsplit('.', 1)[-1]}"


def _validate_task_attachment(uploaded_file):
    if not uploaded_file:
        raise ValidationError('Vaelg mindst en fil.')

    if uploaded_file.size > _attachment_size_limit_bytes():
        raise ValidationError(f'Filen ma maksimalt fylde {_attachment_size_limit_mb()} MB.')

    extension = _attachment_extension(uploaded_file.name)
    if extension not in ATTACHMENT_ALLOWED_TYPES:
        raise ValidationError('Filen skal vaere JPG, PNG, WEBP, PDF, TXT, CSV, DOC, DOCX, XLS eller XLSX.')

    return {
        'extension': extension,
        'content_type': ATTACHMENT_ALLOWED_TYPES[extension],
    }


def _attachment_storage_name(scope, uploaded_file):
    extension = _attachment_extension(uploaded_file.name)
    return str(PurePosixPath(scope) / f'{uuid4().hex}{extension}')


def _delete_attachment_file(file_name):
    if file_name and default_storage.exists(file_name):
        default_storage.delete(file_name)


def _save_task_attachments(task, files, actor):
    attachments = []
    for uploaded_file in files or []:
        validated = _validate_task_attachment(uploaded_file)
        attachment = TaskAttachment(
            task=task,
            uploaded_by=actor,
            original_name=uploaded_file.name,
            content_type=validated['content_type'],
            file_size=uploaded_file.size,
        )
        storage_name = _attachment_storage_name(f'task_{task.id}', uploaded_file)
        attachment.file.save(storage_name, uploaded_file, save=False)
        attachment.save()
        attachments.append(attachment)
    return attachments


def _save_message_attachments(message, files, actor):
    attachments = []
    for uploaded_file in files or []:
        validated = _validate_task_attachment(uploaded_file)
        attachment = TaskAttachment(
            task=message.task,
            message=message,
            uploaded_by=actor,
            original_name=uploaded_file.name,
            content_type=validated['content_type'],
            file_size=uploaded_file.size,
        )
        storage_name = _attachment_storage_name(f'message_{message.id}', uploaded_file)
        attachment.file.save(storage_name, uploaded_file, save=False)
        attachment.save()
        attachments.append(attachment)
    return attachments


def _remove_attachment(attachment):
    file_name = attachment.file.name if attachment.file else ''
    attachment.delete()
    _delete_attachment_file(file_name)
