from django.db import migrations, models


def populate_task_status(apps, schema_editor):
    Task = apps.get_model('tasks', 'Task')
    SubTask = apps.get_model('tasks', 'SubTask')

    completed_task_ids = set(Task.objects.filter(is_completed=True).values_list('id', flat=True))
    started_task_ids = set(SubTask.objects.filter(is_completed=True).values_list('task_id', flat=True))

    for task in Task.objects.all():
        if task.id in completed_task_ids:
            task.status = 'completed'
        elif task.id in started_task_ids:
            task.status = 'in_progress'
        else:
            task.status = 'not_started'
        task.save(update_fields=['status'])


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0004_employeeprofile_employeeactivity_task_completed_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='status',
            field=models.CharField(
                choices=[
                    ('not_started', 'Not started'),
                    ('in_progress', 'In progress'),
                    ('paused', 'Paused'),
                    ('completed', 'Completed'),
                ],
                default='not_started',
                max_length=20,
            ),
        ),
        migrations.RunPython(populate_task_status, migrations.RunPython.noop),
    ]
