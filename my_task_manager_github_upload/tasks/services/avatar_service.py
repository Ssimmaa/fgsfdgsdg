from pathlib import PurePosixPath
from uuid import uuid4

from django.core.exceptions import ValidationError
from django.core.files.storage import default_storage

AVATAR_MAX_BYTES = 4 * 1024 * 1024
AVATAR_ALLOWED_TYPES = {
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
}


def _avatar_size_limit_mb():
    return AVATAR_MAX_BYTES // (1024 * 1024)


def _avatar_extension_from_name(file_name):
    lowered_name = (file_name or '').lower()
    if lowered_name.endswith(('.jpg', '.jpeg')):
        return 'jpg'
    if lowered_name.endswith('.png'):
        return 'png'
    if lowered_name.endswith('.webp'):
        return 'webp'
    return ''


def _sniff_avatar_extension(uploaded_file):
    current_position = uploaded_file.tell() if hasattr(uploaded_file, 'tell') else None
    header = uploaded_file.read(32)
    if current_position is not None and hasattr(uploaded_file, 'seek'):
        uploaded_file.seek(current_position)

    if header.startswith(b'\xff\xd8\xff'):
        return 'jpg'
    if header.startswith(b'\x89PNG\r\n\x1a\n'):
        return 'png'
    if header[:4] == b'RIFF' and header[8:12] == b'WEBP':
        return 'webp'
    return ''


def _validate_avatar_upload(uploaded_file):
    if not uploaded_file:
        raise ValidationError('Vaelg et billede at uploade.')

    if uploaded_file.size > AVATAR_MAX_BYTES:
        raise ValidationError(f'Profilbilledet ma maksimalt fylde {_avatar_size_limit_mb()} MB.')

    detected_extension = _sniff_avatar_extension(uploaded_file)
    if not detected_extension:
        raise ValidationError('Profilbilledet skal vaere en JPG, PNG eller WEBP fil.')

    provided_extension = _avatar_extension_from_name(uploaded_file.name)
    if provided_extension and provided_extension != detected_extension:
        raise ValidationError('Filtypen matcher ikke billedets indhold.')

    return {
        'extension': detected_extension,
        'content_type': AVATAR_ALLOWED_TYPES[detected_extension],
    }


def _avatar_storage_name(profile, extension):
    return str(PurePosixPath(f'user_{profile.user_id}') / f'{uuid4().hex}.{extension}')


def _delete_avatar_file(file_name):
    if file_name and default_storage.exists(file_name):
        default_storage.delete(file_name)


def _save_profile_avatar(profile, uploaded_file):
    validated_file = _validate_avatar_upload(uploaded_file)
    previous_name = profile.avatar.name if profile.avatar else ''
    storage_name = _avatar_storage_name(profile, validated_file['extension'])

    profile.avatar.save(storage_name, uploaded_file, save=False)
    profile.save(update_fields=['avatar', 'updated_at'])

    if previous_name and previous_name != profile.avatar.name:
        _delete_avatar_file(previous_name)

    return profile


def _remove_profile_avatar(profile):
    if not profile.avatar:
        return False

    previous_name = profile.avatar.name
    profile.avatar = ''
    profile.save(update_fields=['avatar', 'updated_at'])
    _delete_avatar_file(previous_name)
    return True
