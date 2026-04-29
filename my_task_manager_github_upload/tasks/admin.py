from django.contrib import admin

from .models import EmployeeActivity, EmployeeProfile, SubTask, Task, TaskAssignmentStatus, TaskDismissal, TaskMessage


class SubTaskInline(admin.TabularInline):
    model = SubTask
    extra = 1


class TaskAssignmentStatusInline(admin.TabularInline):
    model = TaskAssignmentStatus
    extra = 0
    readonly_fields = ('user', 'completed_at', 'updated_at')


class TaskMessageInline(admin.TabularInline):
    model = TaskMessage
    extra = 0
    readonly_fields = ('author', 'kind', 'body', 'created_at')
    can_delete = False


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'assigned_to', 'display_assigned_users', 'status', 'deadline', 'is_completed', 'completed_at')
    list_filter = ('status', 'is_completed', 'assigned_to', 'assigned_users')
    inlines = [SubTaskInline, TaskAssignmentStatusInline, TaskMessageInline]

    def display_assigned_users(self, obj):
        return ', '.join(obj.assigned_users.values_list('username', flat=True)) or '-'

    display_assigned_users.short_description = 'Shared with'


class EmployeeActivityInline(admin.TabularInline):
    model = EmployeeActivity
    extra = 0
    readonly_fields = ('description', 'actor', 'created_at')
    can_delete = False


@admin.register(EmployeeProfile)
class EmployeeProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'status', 'current_stage', 'started_at', 'completed_at', 'updated_at')
    list_filter = ('status',)
    search_fields = ('user__username', 'user__first_name', 'current_stage')
    inlines = [EmployeeActivityInline]


@admin.register(EmployeeActivity)
class EmployeeActivityAdmin(admin.ModelAdmin):
    list_display = ('profile', 'actor', 'description', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('profile__user__username', 'description')


@admin.register(TaskAssignmentStatus)
class TaskAssignmentStatusAdmin(admin.ModelAdmin):
    list_display = ('task', 'user', 'status', 'completed_at', 'updated_at')
    list_filter = ('status', 'updated_at')
    search_fields = ('task__title', 'user__username', 'user__first_name')


@admin.register(TaskDismissal)
class TaskDismissalAdmin(admin.ModelAdmin):
    list_display = ('task', 'user', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('task__title', 'user__username', 'user__first_name')


@admin.register(TaskMessage)
class TaskMessageAdmin(admin.ModelAdmin):
    list_display = ('task', 'author', 'kind', 'created_at')
    list_filter = ('kind', 'created_at')
    search_fields = ('task__title', 'author__username', 'body')
