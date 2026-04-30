from django import forms
from django.contrib.auth import password_validation
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from .models import EmployeeProfile, Task, TaskMessage, TaskTemplate
from .services.attachment_service import _attachment_size_limit_mb, _validate_task_attachment
from .services.avatar_service import _avatar_size_limit_mb, _validate_avatar_upload


def _apply_widget_attrs(field, **attrs):
    cleaned_attrs = {key: value for key, value in attrs.items() if value not in {None, ''}}
    field.widget.attrs.update(cleaned_attrs)


def _normalize_input(value):
    return (value or '').strip()


def _username_exists(username, *, exclude_pk=None):
    queryset = User.objects.all()
    if exclude_pk is not None:
        queryset = queryset.exclude(pk=exclude_pk)
    return queryset.filter(username__iexact=username).exists()


def _email_exists(email, *, exclude_pk=None):
    queryset = User.objects.all()
    if exclude_pk is not None:
        queryset = queryset.exclude(pk=exclude_pk)
    return queryset.filter(email__iexact=email).exists()


def _configure_task_fields(form, *, title_placeholder):
    _apply_widget_attrs(
        form.fields['title'],
        maxlength=200,
        **{'class': 'text-input'},
        placeholder=title_placeholder,
        **{'data-i18n-placeholder': 'form.taskTitlePlaceholder'},
    )
    _apply_widget_attrs(
        form.fields['description'],
        **{'class': 'textarea-input'},
        placeholder='Kort beskrivelse af mal, scope og forventninger',
        **{'data-i18n-placeholder': 'form.descriptionPlaceholder'},
    )
    form.fields['description'].required = False

    if 'priority' in form.fields:
        _apply_widget_attrs(form.fields['priority'], **{'class': 'select-input'})
        form.fields['priority'].required = False

    if 'assigned_to' in form.fields:
        _apply_widget_attrs(form.fields['assigned_to'], **{'class': 'select-input'})
        form.fields['assigned_to'].required = False

    if 'assigned_users' in form.fields:
        _apply_widget_attrs(form.fields['assigned_users'], **{'class': 'select-input select-input--multiple'}, size=5)
        form.fields['assigned_users'].required = False

    if 'attachments' in form.fields:
        _apply_widget_attrs(
            form.fields['attachments'],
            **{'class': 'text-input'},
            accept='.jpg,.jpeg,.png,.webp,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx',
        )


class MultiFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True


class MultipleFileField(forms.FileField):
    widget = MultiFileInput

    def clean(self, data, initial=None):
        if not data:
            return []
        if isinstance(data, (list, tuple)):
            return [super().clean(item, initial) for item in data]
        return [super().clean(data, initial)]


def _configure_user_identity_fields(form):
    _apply_widget_attrs(
        form.fields['first_name'],
        **{'class': 'text-input'},
        placeholder='Fx Emma Nielsen',
        **{'data-i18n-placeholder': 'profile.fullNamePlaceholder'},
    )
    _apply_widget_attrs(form.fields['username'], **{'class': 'text-input'}, autocomplete='username')
    _apply_widget_attrs(
        form.fields['email'],
        **{'class': 'text-input'},
        placeholder='navn@firma.dk',
        autocomplete='email',
        **{'data-i18n-placeholder': 'profile.emailPlaceholder'},
    )


class TaskForm(forms.ModelForm):
    attachments = MultipleFileField(required=False)
    template_id = forms.ChoiceField(required=False)
    save_as_template = forms.BooleanField(required=False)
    template_name = forms.CharField(required=False, max_length=150)
    template_recurrence = forms.ChoiceField(required=False, choices=TaskTemplate.RECURRENCE_CHOICES)
    template_deadline_days = forms.IntegerField(required=False, min_value=0)
    deadline = forms.DateTimeField(
        required=False,
        widget=forms.DateTimeInput(
            attrs={'type': 'datetime-local', 'class': 'text-input'},
            format='%Y-%m-%dT%H:%M',
        ),
        input_formats=['%Y-%m-%dT%H:%M'],
    )

    class Meta:
        model = Task
        fields = ['title', 'description', 'priority', 'deadline', 'assigned_to', 'assigned_users']

    def __init__(self, *args, user=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = user
        self.can_assign_others = bool(user and user.is_superuser)
        _configure_task_fields(self, title_placeholder='Fx Forbered sprint review')
        self.fields['priority'].initial = Task.PRIORITY_MEDIUM
        self.fields['attachments'].help_text = f'Du kan vedhaefte filer op til {_attachment_size_limit_mb()} MB.'
        self.fields['assigned_to'].queryset = User.objects.order_by('username')
        self.fields['assigned_users'].queryset = User.objects.order_by('username')
        self.fields['assigned_to'].empty_label = 'Ingen ansvarlig'
        _apply_widget_attrs(self.fields['template_id'], **{'class': 'select-input'})
        _apply_widget_attrs(self.fields['save_as_template'], **{'class': 'checkbox-input'})
        _apply_widget_attrs(self.fields['template_name'], **{'class': 'text-input'})
        _apply_widget_attrs(self.fields['template_recurrence'], **{'class': 'select-input'})
        _apply_widget_attrs(self.fields['template_deadline_days'], **{'class': 'text-input'})
        self.fields['template_id'].choices = [('', 'Vaelg skabelon')] + [
            (template.id, template.name)
            for template in TaskTemplate.objects.order_by('name')
        ]
        if not self.can_assign_others:
            self.fields.pop('assigned_to')
            self.fields.pop('assigned_users')
            self.fields.pop('template_id')
            self.fields.pop('save_as_template')
            self.fields.pop('template_name')
            self.fields.pop('template_recurrence')
            self.fields.pop('template_deadline_days')

    def clean(self):
        cleaned_data = super().clean()
        if not self.can_assign_others:
            return cleaned_data

        assigned_to = cleaned_data.get('assigned_to')
        assigned_users = cleaned_data.get('assigned_users')

        if assigned_to and assigned_users is not None and assigned_to not in assigned_users:
            cleaned_data['assigned_users'] = assigned_users | User.objects.filter(pk=assigned_to.pk)

        if cleaned_data.get('save_as_template') and not _normalize_input(cleaned_data.get('template_name')):
            self.add_error('template_name', 'Angiv et navn til skabelonen.')

        return cleaned_data

    def clean_priority(self):
        return self.cleaned_data.get('priority') or Task.PRIORITY_MEDIUM

    def clean_attachments(self):
        attachments = self.files.getlist('attachments')
        for attachment in attachments:
            _validate_task_attachment(attachment)
        return attachments


class EmployeeTaskForm(forms.ModelForm):
    attachments = MultipleFileField(required=False)
    deadline = forms.DateTimeField(
        required=False,
        widget=forms.DateTimeInput(
            attrs={'type': 'datetime-local', 'class': 'text-input'},
            format='%Y-%m-%dT%H:%M',
        ),
        input_formats=['%Y-%m-%dT%H:%M'],
    )

    class Meta:
        model = Task
        fields = ['title', 'description', 'priority', 'deadline', 'assigned_users']

    def __init__(self, *args, employee=None, **kwargs):
        if employee is None:
            raise ValueError('EmployeeTaskForm requires an employee instance.')
        self.employee = employee
        super().__init__(*args, **kwargs)
        _configure_task_fields(self, title_placeholder='Fx Follow up med kunde')
        self.fields['priority'].initial = Task.PRIORITY_MEDIUM
        self.fields['attachments'].help_text = f'Du kan vedhaefte filer op til {_attachment_size_limit_mb()} MB.'
        self.fields['assigned_users'].queryset = User.objects.filter(is_superuser=False).exclude(pk=employee.pk).order_by('username')

    def save(self, commit=True):
        task = super().save(commit=False)
        task.assigned_to = self.employee
        if commit:
            task.save()
            participants = self.cleaned_data.get('assigned_users')
            participant_ids = [self.employee.pk]
            if participants is not None:
                participant_ids.extend(participants.values_list('pk', flat=True))
            task.assigned_users.set(User.objects.filter(pk__in=participant_ids))
        return task

    def clean_priority(self):
        return self.cleaned_data.get('priority') or Task.PRIORITY_MEDIUM

    def clean_attachments(self):
        attachments = self.files.getlist('attachments')
        for attachment in attachments:
            _validate_task_attachment(attachment)
        return attachments


class ProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'username', 'email']

    def clean_username(self):
        username = _normalize_input(self.cleaned_data.get('username'))
        if _username_exists(username, exclude_pk=self.instance.pk):
            raise forms.ValidationError('Dette brugernavn er allerede i brug.')
        return username

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        _configure_user_identity_fields(self)


class ProfilePhotoForm(forms.Form):
    photo = forms.FileField(
        required=True,
        widget=forms.FileInput(),
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        _apply_widget_attrs(
            self.fields['photo'],
            **{'class': 'sr-only'},
            accept='image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp',
            **{'data-avatar-file-input': 'true'},
        )
        self.max_size_mb = _avatar_size_limit_mb()

    def clean_photo(self):
        photo = self.cleaned_data.get('photo')
        _validate_avatar_upload(photo)
        return photo


class AccountDeleteForm(forms.Form):
    current_password = forms.CharField(
        required=True,
        strip=False,
        widget=forms.PasswordInput(),
    )

    def __init__(self, *args, actor=None, require_password=True, **kwargs):
        if actor is None:
            raise ValueError('AccountDeleteForm requires the acting user.')
        self.actor = actor
        self.require_password = bool(require_password)
        super().__init__(*args, **kwargs)
        if not self.require_password:
            self.fields.pop('current_password')
        else:
            _apply_widget_attrs(
                self.fields['current_password'],
                **{'class': 'text-input'},
                autocomplete='current-password',
            )

    def clean_current_password(self):
        password = self.cleaned_data.get('current_password', '')
        if not self.actor.check_password(password):
            raise forms.ValidationError('Din nuvaerende adgangskode blev indtastet forkert.')
        return password


class AdminEmployeeAccountForm(forms.ModelForm):
    is_admin = forms.BooleanField(required=False)
    password1 = forms.CharField(required=False, widget=forms.PasswordInput())
    password2 = forms.CharField(required=False, widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ['first_name', 'username', 'email']

    def __init__(self, *args, can_manage_admin_role=False, target_is_site_owner=False, **kwargs):
        super().__init__(*args, **kwargs)
        self.password_was_changed = False
        self.can_manage_admin_role = bool(can_manage_admin_role and not target_is_site_owner)
        self.target_is_site_owner = target_is_site_owner
        self.fields['first_name'].required = False
        self.fields['email'].required = False
        if self.can_manage_admin_role:
            self.fields['is_admin'].initial = self.instance.is_superuser
            _apply_widget_attrs(self.fields['is_admin'], **{'class': 'checkbox-input'})
        else:
            self.fields.pop('is_admin')
        _configure_user_identity_fields(self)
        _apply_widget_attrs(self.fields['password1'], **{'class': 'text-input'}, autocomplete='new-password')
        _apply_widget_attrs(self.fields['password2'], **{'class': 'text-input'}, autocomplete='new-password')

    def clean_username(self):
        username = _normalize_input(self.cleaned_data.get('username'))
        if _username_exists(username, exclude_pk=self.instance.pk):
            raise forms.ValidationError('Dette brugernavn er allerede i brug.')
        return username

    def clean_email(self):
        email = _normalize_input(self.cleaned_data.get('email'))
        if email and _email_exists(email, exclude_pk=self.instance.pk):
            raise forms.ValidationError('Denne email er allerede i brug.')
        return email

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get('password1', '')
        password2 = cleaned_data.get('password2', '')

        if password1 or password2:
            if password1 != password2:
                self.add_error('password2', 'The two password fields did not match.')
            else:
                try:
                    password_validation.validate_password(password1, self.instance)
                except forms.ValidationError as error:
                    self.add_error('password1', error)

        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        password = self.cleaned_data.get('password1')
        self.password_was_changed = bool(password)
        if self.can_manage_admin_role:
            is_admin = self.cleaned_data.get('is_admin', False)
            user.is_staff = is_admin
            user.is_superuser = is_admin
        if password:
            user.set_password(password)
        if commit:
            user.save()
        return user


class RegistrationForm(UserCreationForm):
    first_name = forms.CharField(required=False)
    email = forms.EmailField(required=False)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ['first_name', 'username', 'email', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        _configure_user_identity_fields(self)
        _apply_widget_attrs(self.fields['password1'], **{'class': 'text-input'}, autocomplete='new-password')
        _apply_widget_attrs(self.fields['password2'], **{'class': 'text-input'}, autocomplete='new-password')

    def clean_email(self):
        email = _normalize_input(self.cleaned_data.get('email'))
        if email and _email_exists(email):
            raise forms.ValidationError('Denne email er allerede i brug.')
        return email


class EmployeeProgressForm(forms.ModelForm):
    started_at = forms.DateField(
        required=False,
        widget=forms.DateInput(attrs={'type': 'date', 'class': 'text-input'}),
    )
    completed_at = forms.DateField(
        required=False,
        widget=forms.DateInput(attrs={'type': 'date', 'class': 'text-input'}),
    )

    class Meta:
        model = EmployeeProfile
        fields = ['status', 'current_stage', 'started_at', 'completed_at']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        _apply_widget_attrs(self.fields['status'], **{'class': 'select-input'})
        _apply_widget_attrs(
            self.fields['current_stage'],
            **{'class': 'text-input'},
            placeholder='Fx QA review',
            **{'data-i18n-placeholder': 'employee.stagePlaceholder'},
        )


class TaskMessageForm(forms.ModelForm):
    attachments = MultipleFileField(required=False)

    class Meta:
        model = TaskMessage
        fields = ['kind', 'body']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        _apply_widget_attrs(self.fields['kind'], **{'class': 'select-input select-input--compact'})
        _apply_widget_attrs(
            self.fields['body'],
            **{'class': 'textarea-input'},
            rows=4,
            maxlength=1200,
            placeholder='Skriv en besked om opgaven, behov for rettelser eller ekstra detaljer',
            **{'data-i18n-placeholder': 'chat.placeholder'},
        )
        _apply_widget_attrs(
            self.fields['attachments'],
            **{'class': 'text-input'},
            accept='.jpg,.jpeg,.png,.webp,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx',
        )

    def clean_attachments(self):
        attachments = self.files.getlist('attachments')
        for attachment in attachments:
            _validate_task_attachment(attachment)
        return attachments
