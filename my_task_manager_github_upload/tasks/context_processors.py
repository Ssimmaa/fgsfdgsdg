from django.conf import settings

from .services.attachment_service import _attachment_size_limit_mb
from .services.shared import _employee_profile, _profile_avatar_url, _user_avatar_initials


def current_profile(request):
    context = {
        'app_static_version': getattr(settings, 'APP_STATIC_VERSION', '1'),
        'attachment_size_limit_mb': _attachment_size_limit_mb(),
    }
    user = getattr(request, 'user', None)
    if not getattr(user, 'is_authenticated', False):
        return context
    profile = _employee_profile(user)
    context.update({
        'current_profile': profile,
        'current_user_avatar_url': _profile_avatar_url(profile),
        'current_user_avatar_initials': _user_avatar_initials(user),
    })
    return context
