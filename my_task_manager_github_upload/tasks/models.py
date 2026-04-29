from uuid import uuid4

from django.contrib.auth.models import User
from django.db import models


def _task_attachment_upload_to(instance, filename):
    extension = ''
    if '.' in (filename or ''):
        extension = f".{filename.rsplit('.', 1)[-1].lower()}"

    if instance.message_id:
        scope = f'message_{instance.message_id}'
    elif instance.task_id:
        scope = f'task_{instance.task_id}'
    else:
        scope = 'unbound'
    return f'task_attachments/{scope}/{uuid4().hex}{extension}'


class EmployeeProfile(models.Model):
    STATUS_NOT_STARTED = 'not_started'
    STATUS_IN_PROGRESS = 'in_progress'
    STATUS_COMPLETED = 'completed'
    STATUS_PAUSED = 'paused'
    STATUS_BLOCKED = STATUS_PAUSED

    STATUS_CHOICES = [
        (STATUS_NOT_STARTED, 'Not started'),
        (STATUS_IN_PROGRESS, 'In progress'),
        (STATUS_PAUSED, 'On hold'),
        (STATUS_COMPLETED, 'Completed'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employee_profile')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_NOT_STARTED)
    current_stage = models.CharField(max_length=200, blank=True)
    started_at = models.DateField(blank=True, null=True)
    completed_at = models.DateField(blank=True, null=True)
    is_site_owner = models.BooleanField(default=False)
    avatar = models.FileField(upload_to='avatars', blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['is_site_owner']),
        ]

    def __str__(self):
        return f'{self.user.username} profile'


class EmployeeActivity(models.Model):
    profile = models.ForeignKey(EmployeeProfile, on_delete=models.CASCADE, related_name='activities')
    actor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='employee_activity_events')
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['profile', '-created_at']),
        ]

    def __str__(self):
        return f'{self.profile.user.username}: {self.description}'


class Task(models.Model):
    STATUS_NOT_STARTED = 'not_started'
    STATUS_IN_PROGRESS = 'in_progress'
    STATUS_PAUSED = 'paused'
    STATUS_COMPLETED = 'completed'
    PRIORITY_LOW = 'low'
    PRIORITY_MEDIUM = 'medium'
    PRIORITY_HIGH = 'high'

    STATUS_CHOICES = [
        (STATUS_NOT_STARTED, 'Not started'),
        (STATUS_IN_PROGRESS, 'In progress'),
        (STATUS_PAUSED, 'On hold'),
        (STATUS_COMPLETED, 'Completed'),
    ]

    PRIORITY_CHOICES = [
        (PRIORITY_LOW, 'Low'),
        (PRIORITY_MEDIUM, 'Medium'),
        (PRIORITY_HIGH, 'High'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_NOT_STARTED)
    priority = models.CharField(max_length=12, choices=PRIORITY_CHOICES, default=PRIORITY_MEDIUM)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(blank=True, null=True)
    deadline = models.DateTimeField(blank=True, null=True)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    assigned_users = models.ManyToManyField(User, related_name='shared_tasks', blank=True)
    source_template = models.ForeignKey('TaskTemplate', null=True, blank=True, on_delete=models.SET_NULL, related_name='generated_tasks')
    generated_for_date = models.DateField(blank=True, null=True)

    class Meta:
        indexes = [
            models.Index(fields=['is_completed', 'deadline']),
            models.Index(fields=['deadline', '-created_at']),
            models.Index(fields=['source_template', 'generated_for_date']),
        ]

    def __str__(self):
        return self.title


class TaskAssignmentStatus(models.Model):
    STATUS_NOT_STARTED = Task.STATUS_NOT_STARTED
    STATUS_IN_PROGRESS = Task.STATUS_IN_PROGRESS
    STATUS_PAUSED = Task.STATUS_PAUSED
    STATUS_COMPLETED = Task.STATUS_COMPLETED

    STATUS_CHOICES = Task.STATUS_CHOICES

    task = models.ForeignKey(Task, related_name='assignee_statuses', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='task_assignment_statuses', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_NOT_STARTED)
    completed_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['user__username']
        constraints = [
            models.UniqueConstraint(fields=['task', 'user'], name='unique_task_assignment_status'),
        ]
        indexes = [
            models.Index(fields=['status', '-updated_at']),
        ]

    def __str__(self):
        return f'{self.user.username}: {self.task.title} ({self.status})'


class TaskDismissal(models.Model):
    task = models.ForeignKey(Task, related_name='dismissals', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='dismissed_tasks', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        constraints = [
            models.UniqueConstraint(fields=['task', 'user'], name='unique_task_dismissal'),
        ]

    def __str__(self):
        return f'{self.user.username}: dismissed {self.task.title}'


class TaskMessage(models.Model):
    KIND_NOTE = 'note'
    KIND_CLARIFICATION = 'clarification'
    KIND_CHANGE_REQUEST = 'change_request'
    KIND_BLOCKER = 'blocker'

    KIND_CHOICES = [
        (KIND_NOTE, 'Note'),
        (KIND_CLARIFICATION, 'Clarification'),
        (KIND_CHANGE_REQUEST, 'Change request'),
        (KIND_BLOCKER, 'Blocker'),
    ]

    task = models.ForeignKey(Task, related_name='messages', on_delete=models.CASCADE)
    author = models.ForeignKey(User, related_name='task_messages', on_delete=models.CASCADE)
    kind = models.CharField(max_length=20, choices=KIND_CHOICES, default=KIND_NOTE)
    body = models.TextField(max_length=1200)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']
        indexes = [
            models.Index(fields=['task', 'created_at']),
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return f'{self.task.title}: {self.author.username} ({self.kind})'


class TaskTemplate(models.Model):
    RECURRENCE_NONE = 'none'
    RECURRENCE_DAILY = 'daily'
    RECURRENCE_WEEKLY = 'weekly'
    RECURRENCE_MONTHLY = 'monthly'

    RECURRENCE_CHOICES = [
        (RECURRENCE_NONE, 'One-off'),
        (RECURRENCE_DAILY, 'Daily'),
        (RECURRENCE_WEEKLY, 'Weekly'),
        (RECURRENCE_MONTHLY, 'Monthly'),
    ]

    name = models.CharField(max_length=150)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    priority = models.CharField(max_length=12, choices=Task.PRIORITY_CHOICES, default=Task.PRIORITY_MEDIUM)
    deadline_offset_days = models.PositiveIntegerField(default=0)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='task_templates_as_owner')
    assigned_users = models.ManyToManyField(User, blank=True, related_name='task_templates_as_participant')
    recurrence = models.CharField(max_length=20, choices=RECURRENCE_CHOICES, default=RECURRENCE_NONE)
    is_active = models.BooleanField(default=True)
    last_generated_for = models.DateField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_task_templates')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name', '-updated_at']
        indexes = [
            models.Index(fields=['is_active', 'recurrence']),
            models.Index(fields=['-updated_at']),
        ]

    def __str__(self):
        return self.name


class TaskTemplateSubTask(models.Model):
    template = models.ForeignKey(TaskTemplate, related_name='subtasks', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return f'{self.template.name}: {self.title}'


class TaskAttachment(models.Model):
    task = models.ForeignKey(Task, related_name='attachments', on_delete=models.CASCADE, null=True, blank=True)
    message = models.ForeignKey(TaskMessage, related_name='attachments', on_delete=models.CASCADE, null=True, blank=True)
    uploaded_by = models.ForeignKey(User, related_name='task_attachments', on_delete=models.SET_NULL, null=True, blank=True)
    file = models.FileField(upload_to=_task_attachment_upload_to)
    original_name = models.CharField(max_length=255)
    content_type = models.CharField(max_length=120, blank=True)
    file_size = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']
        indexes = [
            models.Index(fields=['task', 'created_at']),
            models.Index(fields=['message', 'created_at']),
        ]

    def __str__(self):
        return self.original_name


class TaskAuditLog(models.Model):
    task = models.ForeignKey(Task, related_name='audit_logs', on_delete=models.CASCADE)
    actor = models.ForeignKey(User, related_name='task_audit_logs', on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=50)
    message = models.CharField(max_length=255)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['task', '-created_at']),
            models.Index(fields=['-created_at']),
        ]

    def __str__(self):
        return f'{self.task.title}: {self.action}'


class SubTask(models.Model):
    task = models.ForeignKey(Task, related_name='subtasks', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    is_completed = models.BooleanField(default=False)
    deadline = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.title} ({self.task.title})'

