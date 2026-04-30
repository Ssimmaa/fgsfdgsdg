from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


def create_profiles(apps, schema_editor):
    User = apps.get_model(settings.AUTH_USER_MODEL.split('.')[0], settings.AUTH_USER_MODEL.split('.')[1])
    EmployeeProfile = apps.get_model('tasks', 'EmployeeProfile')
    for user in User.objects.filter(is_superuser=False):
        EmployeeProfile.objects.get_or_create(user=user)


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0003_task_assigned_users'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='completed_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name='EmployeeProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('not_started', 'Not started'), ('in_progress', 'In progress'), ('completed', 'Completed'), ('blocked', 'Blocked')], default='not_started', max_length=20)),
                ('current_stage', models.CharField(blank=True, max_length=200)),
                ('started_at', models.DateField(blank=True, null=True)),
                ('completed_at', models.DateField(blank=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='employee_profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EmployeeActivity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('actor', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='employee_activity_events', to=settings.AUTH_USER_MODEL)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='activities', to='tasks.employeeprofile')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.RunPython(create_profiles, migrations.RunPython.noop),
    ]
