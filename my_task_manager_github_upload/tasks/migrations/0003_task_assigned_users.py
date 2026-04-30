from django.conf import settings
from django.db import migrations, models


def copy_primary_assignees_to_shared_users(apps, schema_editor):
    Task = apps.get_model('tasks', 'Task')
    for task in Task.objects.exclude(assigned_to__isnull=True):
        task.assigned_users.add(task.assigned_to_id)


class Migration(migrations.Migration):
    dependencies = [
        ('tasks', '0002_subtask_deadline_alter_subtask_is_completed_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='assigned_users',
            field=models.ManyToManyField(blank=True, related_name='shared_tasks', to=settings.AUTH_USER_MODEL),
        ),
        migrations.RunPython(copy_primary_assignees_to_shared_users, migrations.RunPython.noop),
    ]
