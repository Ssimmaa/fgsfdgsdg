import shutil
from pathlib import Path

from datetime import timedelta

from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.test.utils import override_settings
from django.urls import reverse
from django.utils import timezone

from .models import (
    EmployeeActivity,
    EmployeeProfile,
    SubTask,
    Task,
    TaskAssignmentStatus,
    TaskAttachment,
    TaskDismissal,
    TaskMessage,
)
from .services.employee_service import _employee_summary


TEST_MEDIA_ROOT = Path(__file__).resolve().parent / '_test_media'
PNG_BYTES = (
    b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01'
    b'\x08\x04\x00\x00\x00\xb5\x1c\x0c\x02\x00\x00\x00\x0bIDATx\xdac\xfc\xff\x1f\x00'
    b'\x03\x03\x02\x00\xef\x9a\x17\xdb\x00\x00\x00\x00IEND\xaeB`\x82'
)


@override_settings(
    MEDIA_ROOT=TEST_MEDIA_ROOT,
    MEDIA_URL='/media/',
    PASSWORD_HASHERS=['django.contrib.auth.hashers.MD5PasswordHasher'],
)
class TaskViewsTests(TestCase):
    @classmethod
    def setUpClass(cls):
        TEST_MEDIA_ROOT.mkdir(parents=True, exist_ok=True)
        super().setUpClass()

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        shutil.rmtree(TEST_MEDIA_ROOT, ignore_errors=True)

    def setUp(self):
        self.user = User.objects.create_user(username='worker', password='secret123')
        self.other_user = User.objects.create_user(username='other_worker', password='secret123')
        self.shared_user = User.objects.create_user(username='shared_worker', password='secret123')
        self.idle_user = User.objects.create_user(username='idle_worker', password='secret123')
        self.admin = User.objects.create_superuser(
            username='admin',
            password='secret123',
            email='admin@example.com',
        )
        self.secondary_admin = User.objects.create_superuser(
            username='manager',
            password='secret123',
            email='manager@example.com',
        )
        self.task = Task.objects.create(title='Plan sprint', assigned_to=self.user)
        self.other_task = Task.objects.create(title='Private task', assigned_to=self.other_user)
        self.other_task.assigned_users.add(self.shared_user)
        self.subtask = SubTask.objects.create(task=self.task, title='Book meeting')
        self.other_subtask = SubTask.objects.create(task=self.other_task, title='Hidden item')

    def assignment_status(self, task, user):
        return TaskAssignmentStatus.objects.get(task=task, user=user)

    def make_avatar_upload(self, name='avatar.png', content=PNG_BYTES, content_type='image/png'):
        return SimpleUploadedFile(name, content, content_type=content_type)

    def test_home_requires_login(self):
        response = self.client.get(reverse('home'))
        self.assertRedirects(response, f"{reverse('login')}?next={reverse('home')}")

    def test_task_wall_requires_login(self):
        response = self.client.get(reverse('task_wall'))
        self.assertRedirects(response, f"{reverse('login')}?next={reverse('task_wall')}")

    def test_task_list_requires_login(self):
        response = self.client.get(reverse('task_list_page'))
        self.assertRedirects(response, f"{reverse('login')}?next={reverse('task_list_page')}")

    def test_authenticated_layout_contains_skip_link_and_main_landmark(self):
        self.client.login(username='worker', password='secret123')

        response = self.client.get(reverse('home'))

        self.assertContains(response, 'href="#main-content"')
        self.assertContains(response, 'id="main-content"')

    def test_authenticated_layout_contains_norwegian_and_ukrainian_language_options(self):
        self.client.login(username='worker', password='secret123')

        response = self.client.get(reverse('home'))

        self.assertContains(response, 'data-language-option="no"')
        self.assertContains(response, 'data-language-option="uk"')

    def test_security_headers_are_present_on_authenticated_pages(self):
        self.client.login(username='worker', password='secret123')

        response = self.client.get(reverse('home'))

        self.assertEqual(response.headers.get('Referrer-Policy'), 'same-origin')
        self.assertEqual(response.headers.get('X-Content-Type-Options'), 'nosniff')
        self.assertEqual(response.headers.get('Cross-Origin-Opener-Policy'), 'same-origin')

    def test_toggle_task_requires_login(self):
        response = self.client.post(reverse('toggle_task', args=[self.task.id]))
        self.assertEqual(response.status_code, 302)

    def test_authenticated_user_can_toggle_task(self):
        self.client.login(username='worker', password='secret123')
        response = self.client.post(reverse('toggle_task', args=[self.task.id]))
        self.assertEqual(response.status_code, 200)
        self.task.refresh_from_db()
        status_entry = self.assignment_status(self.task, self.user)
        self.assertEqual(status_entry.status, TaskAssignmentStatus.STATUS_COMPLETED)
        self.assertTrue(self.task.is_completed)
        self.assertEqual(self.task.status, Task.STATUS_COMPLETED)

    def test_user_can_update_task_status(self):
        self.client.login(username='worker', password='secret123')
        response = self.client.post(reverse('update_task_status', args=[self.task.id]), {'status': 'paused'})
        self.assertEqual(response.status_code, 200)
        self.task.refresh_from_db()
        status_entry = self.assignment_status(self.task, self.user)
        self.assertEqual(status_entry.status, TaskAssignmentStatus.STATUS_PAUSED)
        self.assertEqual(self.task.status, Task.STATUS_PAUSED)
        self.assertFalse(self.task.is_completed)

    def test_completed_status_marks_assignment_and_task_completed(self):
        self.client.login(username='worker', password='secret123')
        response = self.client.post(reverse('update_task_status', args=[self.task.id]), {'status': 'completed'})
        self.assertEqual(response.status_code, 200)
        self.task.refresh_from_db()
        status_entry = self.assignment_status(self.task, self.user)
        self.assertEqual(status_entry.status, TaskAssignmentStatus.STATUS_COMPLETED)
        self.assertIsNotNone(status_entry.completed_at)
        self.assertTrue(self.task.is_completed)
        self.assertIsNotNone(self.task.completed_at)

    def test_employee_can_dismiss_completed_task_from_their_board(self):
        self.client.login(username='worker', password='secret123')
        self.client.post(reverse('update_task_status', args=[self.task.id]), {'status': 'completed'})

        response = self.client.post(reverse('dismiss_completed_task', args=[self.task.id]), follow=True)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(TaskDismissal.objects.filter(task=self.task, user=self.user).exists())
        self.assertNotContains(self.client.get(reverse('home')), 'Plan sprint')
        self.assertEqual(self.client.get(reverse('task_detail', args=[self.task.id])).status_code, 404)
        self.assertTrue(Task.objects.filter(id=self.task.id).exists())

    def test_employee_cannot_dismiss_incomplete_task(self):
        self.client.login(username='worker', password='secret123')

        response = self.client.post(reverse('dismiss_completed_task', args=[self.task.id]), follow=True)

        self.assertEqual(response.status_code, 200)
        self.assertFalse(TaskDismissal.objects.filter(task=self.task, user=self.user).exists())
        self.assertContains(self.client.get(reverse('home')), 'Plan sprint')

    def test_user_only_sees_assigned_tasks_on_board(self):
        self.client.login(username='worker', password='secret123')
        response = self.client.get(reverse('home'))
        self.assertContains(response, 'Plan sprint')
        self.assertNotContains(response, 'Private task')

    def test_user_cannot_open_other_users_task_detail(self):
        self.client.login(username='worker', password='secret123')
        response = self.client.get(reverse('task_detail', args=[self.other_task.id]))
        self.assertEqual(response.status_code, 404)

    def test_user_cannot_toggle_other_users_task(self):
        self.client.login(username='worker', password='secret123')
        response = self.client.post(reverse('toggle_task', args=[self.other_task.id]))
        self.assertEqual(response.status_code, 404)

    def test_user_cannot_toggle_other_users_subtask(self):
        self.client.login(username='worker', password='secret123')
        response = self.client.post(reverse('toggle_subtask', args=[self.other_subtask.id]))
        self.assertEqual(response.status_code, 404)

    def test_subtask_toggle_does_not_complete_main_task_for_employee(self):
        self.client.login(username='worker', password='secret123')
        response = self.client.post(reverse('toggle_subtask', args=[self.subtask.id]))
        self.assertEqual(response.status_code, 200)
        self.task.refresh_from_db()
        status_entry = self.assignment_status(self.task, self.user)
        self.subtask.refresh_from_db()
        self.assertTrue(self.subtask.is_completed)
        self.assertEqual(status_entry.status, TaskAssignmentStatus.STATUS_NOT_STARTED)
        self.assertFalse(self.task.is_completed)
        self.assertEqual(self.task.status, Task.STATUS_NOT_STARTED)

    def test_subtask_toggle_does_not_complete_main_task_for_admin(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.post(reverse('toggle_subtask', args=[self.subtask.id]))
        self.assertEqual(response.status_code, 200)
        self.task.refresh_from_db()
        self.subtask.refresh_from_db()
        self.assertTrue(self.subtask.is_completed)
        self.assertFalse(self.task.is_completed)
        self.assertEqual(self.task.status, Task.STATUS_NOT_STARTED)

    def test_shared_user_can_see_task_on_board(self):
        self.client.login(username='shared_worker', password='secret123')
        response = self.client.get(reverse('home'))
        self.assertContains(response, 'Private task')

    def test_user_can_open_task_wall(self):
        self.client.login(username='worker', password='secret123')
        response = self.client.get(reverse('task_wall'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'data-task-wall-root')

    def test_user_can_open_task_list_page(self):
        self.client.login(username='worker', password='secret123')
        response = self.client.get(reverse('task_list_page'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'data-task-list-page-root')
        self.assertContains(response, 'data-toggle-task')

    def test_board_renders_separate_active_and_completed_sections(self):
        Task.objects.create(
            title='Completed follow-up',
            assigned_to=self.user,
            status=Task.STATUS_COMPLETED,
            is_completed=True,
            completed_at=timezone.now(),
        )
        self.client.login(username='worker', password='secret123')

        response = self.client.get(reverse('home'))

        self.assertContains(response, 'data-task-list-active')
        self.assertContains(response, 'data-task-list-completed')

    def test_task_list_page_shows_subtasks(self):
        self.client.login(username='worker', password='secret123')
        response = self.client.get(reverse('task_list_page'))
        self.assertContains(response, 'Book meeting')
        self.assertContains(response, 'Plan sprint')

    def test_admin_task_list_page_contains_bulk_delete_controls(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.get(reverse('task_list_page'))
        self.assertContains(response, 'data-bulk-delete-form')
        self.assertContains(response, 'data-select-task')

    def test_shared_user_can_open_shared_task_detail(self):
        self.client.login(username='shared_worker', password='secret123')
        response = self.client.get(reverse('task_detail', args=[self.other_task.id]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Private task')

    def test_shared_task_statuses_are_independent_per_user(self):
        self.client.login(username='shared_worker', password='secret123')
        self.client.post(reverse('update_task_status', args=[self.other_task.id]), {'status': 'paused'})
        self.client.logout()

        self.client.login(username='other_worker', password='secret123')
        self.client.post(reverse('update_task_status', args=[self.other_task.id]), {'status': 'completed'})

        self.other_task.refresh_from_db()
        shared_status = self.assignment_status(self.other_task, self.shared_user)
        owner_status = self.assignment_status(self.other_task, self.other_user)
        self.assertEqual(shared_status.status, TaskAssignmentStatus.STATUS_PAUSED)
        self.assertEqual(owner_status.status, TaskAssignmentStatus.STATUS_COMPLETED)
        self.assertEqual(self.other_task.status, Task.STATUS_PAUSED)
        self.assertFalse(self.other_task.is_completed)

    def test_task_snapshot_returns_viewer_specific_status(self):
        self.client.login(username='shared_worker', password='secret123')
        self.client.post(reverse('update_task_status', args=[self.other_task.id]), {'status': 'paused'})
        shared_snapshot = self.client.get(reverse('task_snapshot', args=[self.other_task.id])).json()
        self.assertEqual(shared_snapshot['task']['status'], TaskAssignmentStatus.STATUS_PAUSED)
        self.client.logout()

        self.client.login(username='other_worker', password='secret123')
        owner_snapshot = self.client.get(reverse('task_snapshot', args=[self.other_task.id])).json()
        self.assertEqual(owner_snapshot['task']['status'], TaskAssignmentStatus.STATUS_NOT_STARTED)

    def test_shared_user_can_complete_their_assignment_without_completing_for_others(self):
        self.client.login(username='shared_worker', password='secret123')
        response = self.client.post(reverse('toggle_task', args=[self.other_task.id]))
        self.assertEqual(response.status_code, 200)
        self.other_task.refresh_from_db()
        shared_status = self.assignment_status(self.other_task, self.shared_user)
        owner_status = self.assignment_status(self.other_task, self.other_user)
        self.assertEqual(shared_status.status, TaskAssignmentStatus.STATUS_COMPLETED)
        self.assertEqual(owner_status.status, TaskAssignmentStatus.STATUS_NOT_STARTED)
        self.assertFalse(self.other_task.is_completed)
        self.assertEqual(self.other_task.status, Task.STATUS_IN_PROGRESS)

    def test_shared_user_can_dismiss_completed_assignment_without_deleting_task(self):
        self.client.login(username='shared_worker', password='secret123')
        self.client.post(reverse('update_task_status', args=[self.other_task.id]), {'status': 'completed'})

        response = self.client.post(reverse('dismiss_completed_task', args=[self.other_task.id]), follow=True)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(TaskDismissal.objects.filter(task=self.other_task, user=self.shared_user).exists())
        self.assertEqual(self.client.get(reverse('task_detail', args=[self.other_task.id])).status_code, 404)
        self.client.logout()

        self.client.login(username='other_worker', password='secret123')
        self.assertEqual(self.client.get(reverse('task_detail', args=[self.other_task.id])).status_code, 200)
        self.assertTrue(Task.objects.filter(id=self.other_task.id).exists())

    def test_admin_can_create_task_with_subtask_and_assignment_statuses(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.post(
            reverse('create_task'),
            {
                'title': 'Ship release',
                'description': 'Prepare rollout',
                'deadline': '2026-03-21T10:00',
                'assigned_to': self.user.id,
                'assigned_users': [self.user.id, self.shared_user.id],
                'new_subtask_title': ['Write notes'],
                'new_subtask_deadline': ['2026-03-20T18:00'],
            },
            follow=True,
        )
        created_task = Task.objects.get(title='Ship release')
        self.assertRedirects(response, reverse('home'))
        self.assertContains(response, 'Opgaven blev oprettet.')
        self.assertEqual(created_task.subtasks.count(), 1)
        self.assertCountEqual(
            created_task.assigned_users.values_list('username', flat=True),
            ['worker', 'shared_worker'],
        )
        self.assertEqual(created_task.assignee_statuses.count(), 2)
        self.assertEqual(created_task.priority, Task.PRIORITY_MEDIUM)

    def test_admin_can_create_high_priority_task(self):
        self.client.login(username='admin', password='secret123')

        response = self.client.post(
            reverse('create_task'),
            {
                'title': 'Investigate blocker',
                'description': 'Check the failing integration',
                'priority': Task.PRIORITY_HIGH,
                'deadline': '',
                'assigned_to': self.user.id,
                'assigned_users': [self.user.id],
            },
            follow=True,
        )

        self.assertRedirects(response, reverse('home'))
        created_task = Task.objects.get(title='Investigate blocker')
        self.assertEqual(created_task.priority, Task.PRIORITY_HIGH)

    def test_employee_can_open_create_task_page(self):
        self.client.login(username='worker', password='secret123')
        response = self.client.get(reverse('create_task'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'tasks/task/form.html')
        self.assertContains(response, 'Personlig opgave')

    def test_employee_can_create_personal_task_only_for_self(self):
        self.client.login(username='worker', password='secret123')
        response = self.client.post(
            reverse('create_task'),
            {
                'title': 'My follow-up',
                'description': 'Personal task',
                'deadline': '2026-03-21T10:00',
                'assigned_to': self.other_user.id,
                'assigned_users': [self.other_user.id, self.shared_user.id],
                'new_subtask_title': ['Prepare notes'],
                'new_subtask_deadline': ['2026-03-20T18:00'],
            },
            follow=True,
        )

        created_task = Task.objects.get(title='My follow-up')
        self.assertRedirects(response, reverse('home'))
        self.assertContains(response, 'Opgaven blev oprettet.')
        self.assertEqual(created_task.assigned_to, self.user)
        self.assertCountEqual(created_task.assigned_users.values_list('username', flat=True), ['worker'])
        self.assertEqual(created_task.assignee_statuses.count(), 1)
        self.assertEqual(created_task.subtasks.count(), 1)

    def test_invalid_task_create_stays_on_form_with_errors(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.post(
            reverse('create_task'),
            {
                'title': '',
                'description': 'Prepare rollout',
            },
        )
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'tasks/task/form.html')
        self.assertContains(response, 'This field is required.')

    def test_admin_edit_task_redirects_home_with_success_message(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.post(
            reverse('edit_task', args=[self.task.id]),
            {
                'title': 'Plan sprint updated',
                'description': 'Updated description',
                'deadline': '',
                'assigned_to': self.user.id,
                'assigned_users': [self.user.id],
                'new_subtask_title': [],
                'new_subtask_deadline': [],
            },
            follow=True,
        )
        self.assertRedirects(response, reverse('home'))
        self.assertContains(response, 'Opgaven blev opdateret.')
        self.task.refresh_from_db()
        self.assertEqual(self.task.title, 'Plan sprint updated')

    def test_profile_form_rejects_duplicate_username(self):
        User.objects.create_user(username='taken', password='secret123')
        self.client.login(username='worker', password='secret123')
        response = self.client.post(
            reverse('edit_profile'),
            {'first_name': 'Worker', 'username': 'taken', 'email': 'worker@example.com'},
        )
        self.assertContains(response, 'Dette brugernavn er allerede i brug.')

    def test_profile_page_without_photo_shows_add_action_only(self):
        self.client.login(username='worker', password='secret123')

        response = self.client.get(reverse('profile'))

        self.assertContains(response, 'data-i18n="profile.addPhoto"')
        self.assertNotContains(response, 'data-i18n="profile.removePhoto"')

    def test_profile_page_with_photo_shows_change_and_remove_actions(self):
        profile = EmployeeProfile.objects.create(user=self.user)
        profile.avatar = 'avatars/user_1/existing.png'
        profile.save(update_fields=['avatar'])
        self.client.login(username='worker', password='secret123')

        response = self.client.get(reverse('profile'))

        self.assertContains(response, 'data-i18n="profile.changePhoto"')
        self.assertContains(response, 'data-i18n="profile.removePhoto"')

    def test_user_can_upload_replace_and_delete_own_profile_photo(self):
        self.client.login(username='worker', password='secret123')

        upload_response = self.client.post(
            reverse('update_profile_photo'),
            {'photo': self.make_avatar_upload()},
            follow=True,
        )

        self.assertRedirects(upload_response, reverse('profile'))
        self.assertContains(upload_response, 'Profilbilledet blev opdateret.')
        profile = EmployeeProfile.objects.get(user=self.user)
        first_avatar_name = profile.avatar.name
        self.assertTrue(first_avatar_name.startswith('avatars/user_'))
        self.assertTrue((TEST_MEDIA_ROOT / first_avatar_name).exists())

        replace_response = self.client.post(
            reverse('update_profile_photo'),
            {'photo': self.make_avatar_upload(name='avatar-second.png')},
            follow=True,
        )

        self.assertRedirects(replace_response, reverse('profile'))
        profile.refresh_from_db()
        self.assertNotEqual(profile.avatar.name, first_avatar_name)
        self.assertFalse((TEST_MEDIA_ROOT / first_avatar_name).exists())

        delete_response = self.client.post(reverse('delete_profile_photo'), follow=True)

        self.assertRedirects(delete_response, reverse('profile'))
        self.assertContains(delete_response, 'Profilbilledet blev fjernet.')
        profile.refresh_from_db()
        self.assertFalse(profile.avatar)

    def test_profile_photo_upload_rejects_invalid_file(self):
        self.client.login(username='worker', password='secret123')

        response = self.client.post(
            reverse('update_profile_photo'),
            {'photo': self.make_avatar_upload(name='notes.txt', content=b'not-an-image', content_type='text/plain')},
        )

        self.assertEqual(response.status_code, 400)
        self.assertTemplateUsed(response, 'tasks/account/profile.html')
        self.assertContains(response, 'Profilbilledet skal vaere en JPG, PNG eller WEBP fil.', status_code=400)
        self.assertFalse(EmployeeProfile.objects.get(user=self.user).avatar)

    def test_admin_can_manage_employee_profile_photo(self):
        self.client.login(username='admin', password='secret123')

        response = self.client.post(
            reverse('update_employee_profile_photo', args=[self.user.id]),
            {'photo': self.make_avatar_upload()},
            follow=True,
        )

        self.assertRedirects(response, reverse('employee_account', args=[self.user.id]))
        self.assertContains(response, 'Profilbilledet blev opdateret.')
        self.assertTrue(EmployeeProfile.objects.get(user=self.user).avatar)

        delete_response = self.client.post(
            reverse('delete_employee_profile_photo', args=[self.user.id]),
            follow=True,
        )

        self.assertRedirects(delete_response, reverse('employee_account', args=[self.user.id]))
        self.assertContains(delete_response, 'Profilbilledet blev fjernet.')
        self.assertFalse(EmployeeProfile.objects.get(user=self.user).avatar)

    def test_employee_account_page_with_photo_shows_change_and_remove_actions(self):
        profile = EmployeeProfile.objects.create(user=self.user)
        profile.avatar = 'avatars/user_1/existing-admin.png'
        profile.save(update_fields=['avatar'])
        self.client.login(username='admin', password='secret123')

        response = self.client.get(reverse('employee_account', args=[self.user.id]))

        self.assertContains(response, 'data-i18n="profile.changePhoto"')
        self.assertContains(response, 'data-i18n="profile.removePhoto"')

    def test_non_admin_cannot_manage_other_users_profile_photo(self):
        self.client.login(username='worker', password='secret123')

        response = self.client.post(
            reverse('update_employee_profile_photo', args=[self.other_user.id]),
            {'photo': self.make_avatar_upload()},
        )

        self.assertEqual(response.status_code, 404)
        profile = EmployeeProfile.objects.filter(user=self.other_user).first()
        self.assertFalse(profile and profile.avatar)

    def test_non_owner_admin_cannot_manage_other_admin_profile_photo(self):
        self.client.login(username='manager', password='secret123')

        response = self.client.post(
            reverse('update_employee_profile_photo', args=[self.admin.id]),
            {'photo': self.make_avatar_upload()},
        )

        self.assertEqual(response.status_code, 404)
        profile = EmployeeProfile.objects.filter(user=self.admin).first()
        self.assertFalse(profile and profile.avatar)

    def test_employee_can_delete_own_account(self):
        self.client.login(username='worker', password='secret123')

        response = self.client.post(
            reverse('delete_own_account'),
            {'delete_account-current_password': 'secret123'},
            follow=True,
        )

        self.assertRedirects(response, reverse('login'))
        self.assertContains(response, 'Din konto blev slettet.')
        self.assertFalse(User.objects.filter(username='worker').exists())
        self.task.refresh_from_db()
        self.assertIsNone(self.task.assigned_to)
        self.assertEqual(self.task.status, Task.STATUS_NOT_STARTED)
        self.assertFalse(self.task.is_completed)
        self.assertFalse(TaskAssignmentStatus.objects.filter(task=self.task).exists())

    def test_non_owner_admin_can_delete_own_account(self):
        self.client.login(username='manager', password='secret123')

        response = self.client.post(
            reverse('delete_own_account'),
            {'delete_account-current_password': 'secret123'},
            follow=True,
        )

        self.assertRedirects(response, reverse('login'))
        self.assertContains(response, 'Din konto blev slettet.')
        self.assertFalse(User.objects.filter(username='manager').exists())

    def test_site_owner_cannot_delete_own_account(self):
        self.client.login(username='admin', password='secret123')

        response = self.client.post(
            reverse('delete_own_account'),
            {'delete_account-current_password': 'secret123'},
            follow=True,
        )

        self.assertRedirects(response, reverse('profile'))
        self.assertContains(response, 'Ejeren af systemet kan ikke slette sin egen konto.')
        self.assertTrue(User.objects.filter(username='admin').exists())

    def test_admin_can_delete_employee_account(self):
        self.client.login(username='admin', password='secret123')

        response = self.client.post(
            reverse('delete_employee_account', args=[self.user.id]),
            {},
            follow=True,
        )

        self.assertRedirects(response, reverse('employee_directory'))
        self.assertContains(response, 'Kontoen blev slettet.')
        self.assertFalse(User.objects.filter(username='worker').exists())
        self.task.refresh_from_db()
        self.assertIsNone(self.task.assigned_to)
        self.assertEqual(self.task.status, Task.STATUS_NOT_STARTED)

    def test_site_owner_can_delete_other_admin_account(self):
        self.client.login(username='admin', password='secret123')

        response = self.client.post(
            reverse('delete_employee_account', args=[self.secondary_admin.id]),
            {},
            follow=True,
        )

        self.assertRedirects(response, reverse('employee_directory'))
        self.assertContains(response, 'Kontoen blev slettet.')
        self.assertFalse(User.objects.filter(username='manager').exists())

    def test_non_owner_admin_cannot_delete_other_admin_account(self):
        self.client.login(username='manager', password='secret123')

        response = self.client.post(
            reverse('delete_employee_account', args=[self.admin.id]),
            {},
        )

        self.assertEqual(response.status_code, 404)
        self.assertTrue(User.objects.filter(username='admin').exists())

    def test_employee_delete_account_panel_requires_password_field(self):
        self.client.login(username='worker', password='secret123')

        response = self.client.get(reverse('profile'))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'delete_account-current_password', html=False)
        self.assertContains(response, 'data-i18n="account.deletePasswordHelp"', html=False)

    def test_employee_own_account_delete_requires_valid_current_password(self):
        self.client.login(username='worker', password='secret123')

        response = self.client.post(
            reverse('delete_own_account'),
            {'delete_account-current_password': 'wrong-pass'},
        )

        self.assertEqual(response.status_code, 400)
        self.assertTemplateUsed(response, 'tasks/account/profile.html')
        self.assertContains(response, 'Din nuvaerende adgangskode blev indtastet forkert.', status_code=400)
        self.assertTrue(User.objects.filter(username='worker').exists())

    def test_non_owner_admin_own_account_delete_requires_valid_current_password(self):
        self.client.login(username='manager', password='secret123')

        response = self.client.post(
            reverse('delete_own_account'),
            {'delete_account-current_password': 'wrong-pass'},
        )

        self.assertEqual(response.status_code, 400)
        self.assertTemplateUsed(response, 'tasks/account/profile.html')
        self.assertContains(response, 'Din nuvaerende adgangskode blev indtastet forkert.', status_code=400)
        self.assertTrue(User.objects.filter(username='manager').exists())

    def test_admin_delete_employee_does_not_require_current_password(self):
        self.client.login(username='admin', password='secret123')

        response = self.client.post(
            reverse('delete_employee_account', args=[self.user.id]),
            {},
            follow=True,
        )

        self.assertRedirects(response, reverse('employee_directory'))
        self.assertContains(response, 'Kontoen blev slettet.')
        self.assertFalse(User.objects.filter(username='worker').exists())

    def test_admin_delete_account_panel_hides_password_field_for_managed_accounts(self):
        self.client.login(username='admin', password='secret123')

        response = self.client.get(reverse('employee_account', args=[self.user.id]))

        self.assertEqual(response.status_code, 200)
        self.assertNotContains(response, 'delete_account-current_password', html=False)
        self.assertContains(response, 'data-i18n="admin.deleteAccountNoPasswordHelp"', html=False)

    def test_user_can_register_and_is_logged_in(self):
        response = self.client.post(
            reverse('register'),
            {
                'first_name': 'New User',
                'username': 'new_user',
                'email': 'new_user@example.com',
                'password1': 'ComplexPass123',
                'password2': 'ComplexPass123',
            },
        )
        self.assertRedirects(response, reverse('home'))
        self.assertTrue(User.objects.filter(username='new_user').exists())
        self.assertTrue(EmployeeProfile.objects.filter(user__username='new_user').exists())
        home_response = self.client.get(reverse('home'))
        self.assertEqual(home_response.status_code, 200)

    def test_admin_can_open_employee_directory(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.get(reverse('employee_directory'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'worker')

    def test_admin_can_open_processes_dashboard(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.get(reverse('admin_processes'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'task-requests')

    def test_board_snapshot_includes_live_summary_blocks(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.get(reverse('board_snapshot'))
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIn('admin_metrics', payload)
        self.assertIn('admin_workload', payload)
        self.assertIn('employee_summaries', payload)
        self.assertIn('attention_required', payload['admin_metrics'])
        self.assertIn('overdue_tasks', payload['admin_metrics'])
        self.assertIn('without_tasks', payload['admin_metrics'])

    def test_board_snapshot_includes_task_priority_metadata(self):
        self.task.priority = Task.PRIORITY_HIGH
        self.task.save(update_fields=['priority'])
        self.client.login(username='admin', password='secret123')

        payload = self.client.get(reverse('board_snapshot')).json()
        task_payload = next(item for item in payload['tasks'] if item['id'] == self.task.id)

        self.assertEqual(task_payload['priority'], Task.PRIORITY_HIGH)
        self.assertEqual(task_payload['priority_key'], 'priority.high')
        self.assertEqual(task_payload['priority_label'], 'High')
        self.assertIn('overloaded', payload['admin_workload'])
        self.assertIn('available', payload['admin_workload'])
        self.assertIn('focus', payload['admin_workload'])

    def test_admin_snapshot_reflects_assignment_status_breakdown(self):
        self.client.login(username='shared_worker', password='secret123')
        self.client.post(reverse('update_task_status', args=[self.other_task.id]), {'status': 'paused'})
        self.client.logout()

        self.client.login(username='other_worker', password='secret123')
        self.client.post(reverse('update_task_status', args=[self.other_task.id]), {'status': 'completed'})
        self.client.logout()

        self.client.login(username='admin', password='secret123')
        payload = self.client.get(reverse('board_snapshot')).json()
        task_payload = next(item for item in payload['tasks'] if item['id'] == self.other_task.id)
        participant_statuses = {item['username']: item['status'] for item in task_payload['participant_statuses']}
        status_counts = {item['status']: item['count'] for item in task_payload['status_counts']}

        self.assertEqual(participant_statuses['other_worker'], TaskAssignmentStatus.STATUS_COMPLETED)
        self.assertEqual(participant_statuses['shared_worker'], TaskAssignmentStatus.STATUS_PAUSED)
        self.assertEqual(status_counts[TaskAssignmentStatus.STATUS_COMPLETED], 1)
        self.assertEqual(status_counts[TaskAssignmentStatus.STATUS_PAUSED], 1)
        self.assertEqual(payload['admin_metrics']['paused'], 1)
        self.assertTrue(any(item['employee_name'] == 'shared_worker' for item in payload['admin_attention']['paused_assignments']))

    def test_admin_snapshot_includes_due_soon_tasks_without_activity_feed(self):
        self.other_task.deadline = timezone.now() + timedelta(hours=24)
        self.other_task.save(update_fields=['deadline'])

        self.client.login(username='shared_worker', password='secret123')
        self.client.post(reverse('update_task_status', args=[self.other_task.id]), {'status': 'paused'})
        self.client.logout()

        self.client.login(username='admin', password='secret123')
        payload = self.client.get(reverse('board_snapshot')).json()
        self.assertTrue(any(item['title'] == 'Private task' for item in payload['admin_attention']['due_soon_tasks']))
        self.assertNotIn('recent_activity', payload['admin_attention'])

    def test_employee_directory_is_hidden_from_non_admins(self):
        self.client.login(username='worker', password='secret123')
        response = self.client.get(reverse('employee_directory'))
        self.assertEqual(response.status_code, 404)

    def test_employee_directory_uses_localized_search_fallback_text(self):
        self.client.login(username='admin', password='secret123')

        response = self.client.get(reverse('employee_directory'))

        self.assertContains(response, 'placeholder="Sog efter medarbejdere"')
        self.assertNotContains(response, 'placeholder="Search employees"')

    def test_admin_processes_contains_embedded_task_wall(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.get(reverse('admin_processes'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'data-task-wall-root')
        self.assertContains(response, 'data-operations-search')

    def test_admin_processes_uses_clear_on_hold_status_label(self):
        self.client.login(username='shared_worker', password='secret123')
        self.client.post(reverse('update_task_status', args=[self.other_task.id]), {'status': 'paused'})
        self.client.logout()

        self.client.login(username='admin', password='secret123')
        response = self.client.get(reverse('admin_processes'))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'On hold')
        self.assertNotContains(response, '>Paused<', html=False)

    def test_admin_processes_does_not_render_server_management_ui(self):
        self.client.login(username='admin', password='secret123')

        response = self.client.get(reverse('admin_processes'))

        self.assertEqual(response.status_code, 200)
        self.assertNotContains(response, 'server-control', html=False)
        self.assertNotContains(response, '/api/server-control/', html=False)

    def test_admin_processes_contains_activity_log(self):
        self.client.login(username='worker', password='secret123')
        self.client.post(reverse('update_task_status', args=[self.task.id]), {'status': 'paused'})
        self.client.logout()

        self.client.login(username='admin', password='secret123')
        response = self.client.get(reverse('admin_processes'))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'id="activity-log"', html=False)
        self.assertContains(response, 'data-i18n="siteLog.open"')
        self.assertContains(response, 'Plan sprint')

    def test_authenticated_user_can_open_site_updates_page(self):
        self.client.login(username='worker', password='secret123')

        response = self.client.get(reverse('site_updates_page'))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'data-i18n="updatesLog.headerTitle"')
        self.assertContains(response, '2026.03.10')
        self.assertContains(response, '2026.04.23')

    def test_site_updates_page_requires_login(self):
        response = self.client.get(reverse('site_updates_page'))
        self.assertRedirects(response, f"{reverse('login')}?next={reverse('site_updates_page')}")

    def test_activity_log_is_hidden_from_non_admins(self):
        self.client.login(username='worker', password='secret123')

        response = self.client.get(reverse('admin_processes'))

        self.assertEqual(response.status_code, 404)

    def test_admin_can_update_employee_progress(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.post(
            reverse('employee_detail', args=[self.user.id]),
            {
                'form_kind': 'progress',
                'progress-status': 'in_progress',
                'progress-current_stage': 'QA review',
                'progress-started_at': '2026-03-20',
                'progress-completed_at': '',
            },
        )
        self.assertRedirects(response, reverse('employee_detail', args=[self.user.id]))
        profile = EmployeeProfile.objects.get(user=self.user)
        self.assertEqual(profile.status, 'in_progress')
        self.assertEqual(profile.current_stage, 'QA review')

    def test_admin_can_update_employee_account_and_reset_password(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.post(
            reverse('employee_account', args=[self.user.id]),
            {
                'account-first_name': 'Worker Updated',
                'account-username': 'worker_updated',
                'account-email': 'worker_updated@example.com',
                'account-password1': 'BetterPass123!',
                'account-password2': 'BetterPass123!',
            },
            follow=True,
        )

        self.assertRedirects(response, reverse('employee_account', args=[self.user.id]))
        self.assertContains(response, 'Medarbejderkontoen blev opdateret.')
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, 'Worker Updated')
        self.assertEqual(self.user.username, 'worker_updated')
        self.assertEqual(self.user.email, 'worker_updated@example.com')
        self.assertTrue(
            EmployeeActivity.objects.filter(
                profile__user=self.user,
                actor=self.admin,
                description='account_updated',
            ).exists()
        )
        self.assertTrue(
            EmployeeActivity.objects.filter(
                profile__user=self.user,
                actor=self.admin,
                description='password_reset',
            ).exists()
        )

        self.client.logout()
        self.assertTrue(self.client.login(username='worker_updated', password='BetterPass123!'))

    def test_admin_can_grant_employee_administrator_access(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.post(
            reverse('employee_account', args=[self.user.id]),
            {
                'account-first_name': self.user.first_name,
                'account-username': self.user.username,
                'account-email': '',
                'account-is_admin': 'on',
                'account-password1': '',
                'account-password2': '',
            },
            follow=True,
        )

        self.assertRedirects(response, reverse('employee_directory'))
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_staff)
        self.assertTrue(self.user.is_superuser)
        self.assertContains(response, 'Medarbejderkontoen blev opdateret.')

    def test_site_owner_can_demote_administrator_back_to_employee(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.post(
            reverse('employee_account', args=[self.secondary_admin.id]),
            {
                'account-first_name': self.secondary_admin.first_name,
                'account-username': self.secondary_admin.username,
                'account-email': self.secondary_admin.email,
                'account-password1': '',
                'account-password2': '',
            },
            follow=True,
        )

        self.assertRedirects(response, reverse('employee_account', args=[self.secondary_admin.id]))
        self.secondary_admin.refresh_from_db()
        self.assertFalse(self.secondary_admin.is_superuser)
        self.assertFalse(self.secondary_admin.is_staff)

    def test_non_owner_admin_cannot_grant_administrator_access(self):
        self.client.login(username='manager', password='secret123')
        response = self.client.post(
            reverse('employee_account', args=[self.user.id]),
            {
                'account-first_name': self.user.first_name,
                'account-username': self.user.username,
                'account-email': self.user.email,
                'account-is_admin': 'on',
                'account-password1': '',
                'account-password2': '',
            },
            follow=True,
        )

        self.assertRedirects(response, reverse('employee_account', args=[self.user.id]))
        self.user.refresh_from_db()
        self.assertFalse(self.user.is_superuser)
        self.assertNotContains(response, 'Giv administratorrettigheder')

    def test_non_owner_admin_cannot_open_other_admin_account_management(self):
        self.client.login(username='manager', password='secret123')
        response = self.client.get(reverse('employee_account', args=[self.admin.id]))
        self.assertEqual(response.status_code, 404)

    def test_invalid_employee_account_update_stays_on_employee_account_page(self):
        User.objects.create_user(username='taken_employee', email='taken@example.com', password='secret123')
        self.client.login(username='admin', password='secret123')
        response = self.client.post(
            reverse('employee_account', args=[self.user.id]),
            {
                'account-first_name': 'Worker Updated',
                'account-username': 'taken_employee',
                'account-email': 'taken@example.com',
                'account-password1': '',
                'account-password2': '',
            },
        )

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'tasks/employees/account.html')
        self.assertContains(response, 'Dette brugernavn er allerede i brug.')

    def test_employee_can_post_task_message(self):
        self.client.login(username='worker', password='secret123')
        response = self.client.post(
            reverse('post_task_message', args=[self.task.id]),
            {
                'kind': 'change_request',
                'body': 'Please add more acceptance criteria.',
            },
            HTTP_X_REQUESTED_WITH='XMLHttpRequest',
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue(
            TaskMessage.objects.filter(
                task=self.task,
                author=self.user,
                kind='change_request',
                body='Please add more acceptance criteria.',
            ).exists()
        )

    def test_task_snapshot_includes_task_messages(self):
        TaskMessage.objects.create(task=self.task, author=self.user, kind='clarification', body='Need deadline details.')
        self.client.login(username='worker', password='secret123')

        payload = self.client.get(reverse('task_snapshot', args=[self.task.id])).json()

        self.assertEqual(payload['messages'][0]['kind'], 'clarification')
        self.assertEqual(payload['messages'][0]['body'], 'Need deadline details.')
        self.assertTrue(payload['messages'][0]['can_manage'])
        self.assertIn('/edit/', payload['messages'][0]['edit_url'])

    def test_employee_can_edit_own_task_message(self):
        message = TaskMessage.objects.create(task=self.task, author=self.user, kind='note', body='Need more details.')
        self.client.login(username='worker', password='secret123')

        response = self.client.post(
            reverse('update_task_message', args=[self.task.id, message.id]),
            {
                'kind': 'blocker',
                'body': 'Waiting for API access.',
            },
            HTTP_X_REQUESTED_WITH='XMLHttpRequest',
        )

        self.assertEqual(response.status_code, 200)
        message.refresh_from_db()
        self.assertEqual(message.kind, 'blocker')
        self.assertEqual(message.body, 'Waiting for API access.')

    def test_invalid_message_edit_stays_on_task_detail(self):
        message = TaskMessage.objects.create(task=self.task, author=self.user, kind='note', body='Need more details.')
        self.client.login(username='worker', password='secret123')

        response = self.client.post(
            reverse('update_task_message', args=[self.task.id, message.id]),
            {
                'kind': 'note',
                'body': '',
            },
        )

        self.assertEqual(response.status_code, 400)
        self.assertTemplateUsed(response, 'tasks/task/detail.html')
        self.assertContains(response, 'This field is required.', status_code=400)
        message.refresh_from_db()
        self.assertEqual(message.body, 'Need more details.')

    def test_employee_cannot_edit_other_users_message(self):
        message = TaskMessage.objects.create(task=self.task, author=self.admin, kind='note', body='Admin note.')
        self.client.login(username='worker', password='secret123')

        response = self.client.post(
            reverse('update_task_message', args=[self.task.id, message.id]),
            {
                'kind': 'note',
                'body': 'Trying to overwrite this.',
            },
            HTTP_X_REQUESTED_WITH='XMLHttpRequest',
        )

        self.assertEqual(response.status_code, 404)
        message.refresh_from_db()
        self.assertEqual(message.body, 'Admin note.')

    def test_admin_can_delete_employee_message(self):
        message = TaskMessage.objects.create(task=self.task, author=self.user, kind='blocker', body='Blocked by missing API access.')
        self.client.login(username='admin', password='secret123')

        response = self.client.post(
            reverse('delete_task_message', args=[self.task.id, message.id]),
            HTTP_X_REQUESTED_WITH='XMLHttpRequest',
        )

        self.assertEqual(response.status_code, 200)
        self.assertFalse(TaskMessage.objects.filter(id=message.id).exists())

    def test_admin_snapshot_includes_recent_task_requests(self):
        TaskMessage.objects.create(task=self.task, author=self.user, kind='blocker', body='Blocked by missing API access.')
        self.client.login(username='admin', password='secret123')

        payload = self.client.get(reverse('board_snapshot')).json()

        self.assertEqual(payload['admin_metrics']['request_count'], 1)
        self.assertTrue(any(item['task_title'] == 'Plan sprint' for item in payload['task_requests']))

    def test_employee_detail_does_not_show_quick_task_form(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.get(reverse('employee_detail', args=[self.user.id]))

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'tasks/employees/detail.html')
        self.assertNotContains(response, 'quick_task-title')
        self.assertContains(response, reverse('employee_assign_task', args=[self.user.id]))

    def test_admin_can_create_task_from_employee_assign_page(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.post(
            reverse('employee_assign_task', args=[self.user.id]),
            {
                'title': 'Prepare rollout',
                'description': 'Coordinate release checklist',
                'deadline': '2026-03-21T10:00',
                'assigned_users': [self.shared_user.id],
            },
            follow=True,
        )
        self.assertRedirects(response, reverse('employee_detail', args=[self.user.id]))
        self.assertContains(response, 'Opgaven blev tilfojet til medarbejderen.')
        created_task = Task.objects.get(title='Prepare rollout')
        self.assertEqual(created_task.assigned_to, self.user)
        self.assertCountEqual(
            created_task.assigned_users.values_list('username', flat=True),
            ['worker', 'shared_worker'],
        )
        self.assertEqual(created_task.assignee_statuses.count(), 2)
        self.assertEqual(created_task.priority, Task.PRIORITY_MEDIUM)
        self.assertTrue(
            EmployeeActivity.objects.filter(
                profile__user=self.user,
                actor=self.admin,
                description='task_assigned::Prepare rollout',
            ).exists()
        )

    def test_invalid_quick_task_create_stays_on_employee_assign_page(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.post(
            reverse('employee_assign_task', args=[self.user.id]),
            {
                'title': '',
                'description': 'Coordinate release checklist',
            },
        )
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'tasks/employees/assign_task.html')
        self.assertContains(response, 'This field is required.')

    def test_board_snapshot_includes_employees_without_tasks(self):
        self.client.login(username='admin', password='secret123')
        payload = self.client.get(reverse('board_snapshot')).json()
        without_tasks = {item['name'] for item in payload['admin_attention']['without_tasks_employees']}
        self.assertIn('idle_worker', without_tasks)

    def test_employee_summary_resets_completed_status_when_employee_has_no_tasks(self):
        EmployeeProfile.objects.create(user=self.idle_user, status=EmployeeProfile.STATUS_COMPLETED)

        summary = _employee_summary(self.idle_user, include_dismissed=True)

        self.assertEqual(summary['status'], EmployeeProfile.STATUS_NOT_STARTED)
        self.assertEqual(summary['task_total'], 0)
        self.assertTrue(summary['needs_assignment'])

    def test_employee_summary_returns_in_progress_for_new_assignment_after_completed_work(self):
        self.client.login(username='worker', password='secret123')
        self.client.post(reverse('update_task_status', args=[self.task.id]), {'status': 'completed'})
        Task.objects.create(title='Fresh assignment', assigned_to=self.user)

        summary = _employee_summary(self.user, include_dismissed=True)

        self.assertEqual(summary['status'], EmployeeProfile.STATUS_IN_PROGRESS)
        self.assertEqual(summary['completed_count'], 1)
        self.assertEqual(summary['pending_count'], 1)

    def test_employee_summary_resets_after_completed_task_is_deleted(self):
        self.client.login(username='worker', password='secret123')
        self.client.post(reverse('update_task_status', args=[self.task.id]), {'status': 'completed'})
        self.task.delete()

        summary = _employee_summary(self.user, include_dismissed=True)

        self.assertEqual(summary['status'], EmployeeProfile.STATUS_NOT_STARTED)
        self.assertTrue(summary['needs_assignment'])

    def test_employee_summary_ignores_tasks_after_assignment_is_removed(self):
        self.task.assigned_users.set([self.other_user])
        self.task.assigned_to = self.other_user
        self.task.save(update_fields=['assigned_to'])

        summary = _employee_summary(self.user, include_dismissed=True)

        self.assertEqual(summary['status'], EmployeeProfile.STATUS_NOT_STARTED)
        self.assertEqual(summary['task_total'], 0)
        self.assertTrue(summary['needs_assignment'])

    def test_employee_intro_hides_after_third_board_visit(self):
        self.client.login(username='worker', password='secret123')
        first_response = self.client.get(reverse('home'))
        self.assertContains(first_response, 'data-i18n="board.heroTitle"', html=False)

        self.client.get(reverse('home'))
        third_response = self.client.get(reverse('home'))
        self.assertNotContains(third_response, 'data-i18n="board.heroTitle"', html=False)

    def test_admin_cannot_update_employee_task_status_via_task_endpoint(self):
        self.client.login(username='admin', password='secret123')
        response = self.client.post(reverse('update_task_status', args=[self.task.id]), {'status': 'completed'})
        self.assertEqual(response.status_code, 403)

    def test_admin_can_bulk_delete_selected_tasks(self):
        extra_task = Task.objects.create(title='Delete me too', assigned_to=self.shared_user)
        keep_task = Task.objects.create(title='Keep me', assigned_to=self.idle_user)
        self.client.login(username='admin', password='secret123')

        response = self.client.post(
            reverse('bulk_delete_tasks'),
            {'task_ids': [self.task.id, extra_task.id]},
            follow=True,
        )

        self.assertRedirects(response, reverse('home'))
        self.assertContains(response, 'Valgte opgaver blev slettet.')
        self.assertFalse(Task.objects.filter(id=self.task.id).exists())
        self.assertFalse(Task.objects.filter(id=extra_task.id).exists())
        self.assertTrue(Task.objects.filter(id=keep_task.id).exists())

    def test_bulk_delete_requires_at_least_one_task(self):
        self.client.login(username='admin', password='secret123')

        response = self.client.post(reverse('bulk_delete_tasks'), {}, follow=True)

        self.assertRedirects(response, reverse('home'))
        self.assertContains(response, 'Vaelg mindst en opgave.')
        self.assertTrue(Task.objects.filter(id=self.task.id).exists())

    def test_non_admin_cannot_bulk_delete_tasks(self):
        extra_task = Task.objects.create(title='Protected task', assigned_to=self.shared_user)
        self.client.login(username='worker', password='secret123')

        response = self.client.post(reverse('bulk_delete_tasks'), {'task_ids': [extra_task.id]})

        self.assertRedirects(response, reverse('home'))
        self.assertTrue(Task.objects.filter(id=extra_task.id).exists())

    def test_admin_can_create_task_with_attachment(self):
        self.client.login(username='admin', password='secret123')
        attachment = SimpleUploadedFile('brief.txt', b'hello world', content_type='text/plain')

        response = self.client.post(
            reverse('create_task'),
            {
                'title': 'Attach docs',
                'description': 'Task with docs',
                'priority': Task.PRIORITY_HIGH,
                'attachments': attachment,
            },
            follow=True,
        )

        self.assertRedirects(response, reverse('home'))
        created_task = Task.objects.get(title='Attach docs')
        self.assertTrue(TaskAttachment.objects.filter(task=created_task, original_name='brief.txt').exists())
