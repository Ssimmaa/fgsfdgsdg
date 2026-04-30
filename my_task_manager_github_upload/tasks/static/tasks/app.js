const APP_SETTINGS = {
    theme: { storageKey: 'taskmaster-theme', defaultValue: 'light' },
    motion: { storageKey: 'taskmaster-motion', defaultValue: 'full' },
    language: { storageKey: 'taskmaster-language', defaultValue: 'da' },
};

const POLL_INTERVALS = {
    board: 30000,
    task: 12000,
    taskWhileEditing: 45000,
};

const SUPPORTED_LANGUAGES = new Set(['da', 'en', 'ru', 'no', 'uk']);
const HTML_LANGUAGE_MAP = {
    da: 'da',
    en: 'en',
    ru: 'ru',
    no: 'no',
    uk: 'uk',
};

const translations = {
    da: {
        'nav.workflowHub': 'Workflow hub',
        'nav.homeAria': 'TaskMaster forside',
        'nav.primaryNavigation': 'Primaer navigation',
        'nav.tasks': 'Opgaver',
        'nav.newTask': 'Ny opgave',
        'nav.employees': 'Medarbejdere',
        'nav.profile': 'Profil',
        'nav.quickSettings': 'Quick settings',
        'nav.logout': 'Log ud',
        'nav.openMenu': 'Aben menu',
        'role.admin': 'Administrator',
        'role.employee': 'Medarbejder',
        'settings.eyebrow': 'Preferences',
        'settings.title': 'Indstillinger',
        'settings.openPanel': 'Aben indstillinger',
        'settings.theme': 'tilstand',
        'settings.themeHelp': 'Skift mellem lys og mork visning.',
        'settings.motion': 'Animationer',
        'settings.motionHelp': 'Sla mikrointeraktioner til eller fra.',
        'settings.language': 'Sprog',
        'settings.languageHelp': 'Skift sprog uden at genindlaese siden.',
        'settings.languagePicker': 'Vaelg sprog',
        'settings.themeDark': 'Mork tilstand',
        'settings.themeLight': 'Lys tilstand',
        'board.headerEyebrow': 'Overblik',
        'board.headerTitle': 'Dagens opgaver',
        'board.createTask': 'Opret ny opgave',
        'board.dashboard': 'Team dashboard',
        'board.heroTitle': 'Hold styr pa opgaver, ansvarlige og deadlines.',
        'board.heroText': 'Filtrer hurtigt mellem aktive og afsluttede opgaver, og ga direkte videre til detaljerne uden unodige klik.',
        'board.statusNow': 'Status lige nu',
        'board.total': 'Alle',
        'board.active': 'Aktive',
        'board.completed': 'Faerdige',
        'board.withDeadline': 'Med deadline',
        'board.overallProgress': 'Samlet fremdrift',
        'board.progressText': '{completed} af {total} opgaver er fuldfort.',
        'board.participantsBadge': 'Deltagere',
        'board.subtasksQuick': 'Hurtig checkliste',
        'board.searchPlaceholder': 'Sog efter titel, beskrivelse eller ansvarlig',
        'board.searchAria': 'Sog i opgaver',
        'board.filtersAria': 'Filtrer opgaver',
        'board.filterAll': 'Alle',
        'board.filterActive': 'Aktive',
        'board.filterCompleted': 'Faerdige',
        'board.filterDeadline': 'Har deadline',
        'board.listLabel': 'Task list',
        'board.listTitle': 'Alle opgaver',
        'board.activeListLabel': 'I fokus',
        'board.activeListTitle': 'Aktive opgaver',
        'board.activeEmptyTitle': 'Ingen aktive opgaver',
        'board.activeEmptyText': 'Alt aktuelt arbejde er faerdigt eller afventer nye opgaver.',
        'board.completedListLabel': 'Nyligt afsluttet',
        'board.completedListTitle': 'Faerdige opgaver',
        'board.completedEmptyTitle': 'Ingen afsluttede opgaver',
        'board.completedEmptyText': 'Faerdige opgaver samles her, sa hovedlisten holder fokus pa det aabne arbejde.',
        'board.visible': 'synlige',
        'board.bulkSelectionCount': '{count} valgt',
        'board.selectVisible': 'Vaelg synlige',
        'board.clearSelection': 'Ryd valg',
        'board.bulkDelete': 'Slet valgte',
        'board.bulkDeleteConfirm': 'Er du sikker pa, at du vil slette de valgte opgaver?',
        'board.selectTaskAria': 'Vaelg opgave',
        'board.doneBadge': 'Afsluttet',
        'board.emptyTitle': 'Ingen opgaver endnu',
        'board.emptyText': 'Opret den forste opgave for at komme i gang med teamets overblik.',
        'board.taskToggleAria': 'Marker opgave som fuldfort',
        'board.unassigned': 'Ingen ansvarlig',
        'detail.headerEyebrow': 'Opgavedetaljer',
        'detail.mainTask': 'Hovedopgave',
        'detail.description': 'Beskrivelse',
        'detail.checklist': 'Checkliste',
        'detail.subtasks': 'Underopgaver',
        'detail.noDeadline': 'Ingen deadline',
        'detail.createdPrefix': 'Oprettet',
        'detail.progressText': '{completed} af {total} underopgaver er fuldfort.',
        'detail.participants': 'Deltagere',
        'detail.noParticipants': 'Kun ansvarlig',
        'detail.noSubtasks': 'Der er ingen underopgaver endnu.',
        'detail.subtaskToggleAria': 'Marker underopgave som fuldfort',
        'common.back': 'Tilbage',
        'common.skipToContent': 'Hop til indhold',
        'common.cancel': 'Annuller',
        'common.close': 'Luk',
        'common.edit': 'Rediger',
        'common.delete': 'Slet',
        'common.confirmDelete': 'Er du sikker pa, at du vil slette denne opgave?',
        'common.remove': 'Fjern',
        'common.deadline': 'Deadline',
        'common.email': 'Email',
        'common.notSpecified': 'Ikke angivet',
        'common.save': 'Gem',
        'common.apply': 'Anvend',
        'form.taskTitle': 'Opgavetitel',
        'form.taskTitlePlaceholder': 'Fx Forbered sprint review',
        'form.description': 'Beskrivelse',
        'form.descriptionPlaceholder': 'Kort beskrivelse af mal, scope og forventninger',
        'form.assignee': 'Ansvarlig',
        'form.participants': 'Deltagere',
        'form.participantsHelp': 'Vaelg flere brugere, som ogsa skal kunne se og arbejde med opgaven.',
        'form.personalTaskOwner': 'Personlig opgave',
        'form.personalTaskHelp': 'Opgaven bliver automatisk oprettet pa din egen konto.',
        'form.addSubtask': 'Tilfoj underopgave',
        'form.newSubtaskPlaceholder': 'Ny underopgave',
        'employee.workspaceEyebrow': 'Arbejdszone',
        'employee.workspaceTitle': 'Fokus pa dine opgaver',
        'employee.currentStage': 'Aktuelt trin',
        'employee.completedTasks': 'Faerdige opgaver',
        'employee.pendingTasks': 'Tilbage',
        'employee.progress': 'Fremdrift',
        'employee.personalProgress': 'Din fremdrift',
        'employee.stagePlaceholder': 'Fx QA review',
        'employee.awaitingAssignment': 'Afventer tildeling',
        'employee.awaitingAssignmentHelp': 'Du har ingen aktive opgaver endnu. Nye opgaver vises her sa snart de bliver tildelt.',
        'employee.attentionEyebrow': 'Fokus nu',
        'employee.attentionTitle': 'Ting der kraever handling',
        'employee.noPriorityTasks': 'Intet kraever handling lige nu.',
        'admin.dashboardEyebrow': 'Administratorblik',
        'admin.dashboardTitle': 'Teamets fremdrift',
        'admin.boardOverviewEyebrow': 'Drift',
        'admin.boardOverviewTitle': 'Aktuel opgavestatus',
        'admin.manageEmployees': 'Administrer medarbejdere',
        'admin.assignTask': 'Tildel opgave',
        'admin.quickAssign': 'Tilfoj opgave',
        'admin.quickAssignEyebrow': 'Tildel arbejde',
        'admin.quickAssignTitle': 'Tilfoj opgave til medarbejder',
        'admin.quickAssignHelp': 'Medarbejderen bliver automatisk sat som ansvarlig. Tilfoj kun ekstra deltagere hvis flere skal arbejde pa opgaven.',
        'admin.assignTaskToEmployee': 'Tilfoj opgave',
        'admin.manageAccount': 'Administrer konto',
        'admin.accountAccessEyebrow': 'Kontoadgang',
        'admin.accountAccessTitle': 'Kontooplysninger og adgang',
        'admin.accountAccessHelp': 'Opdater navn, brugernavn, email eller nulstil medarbejderens adgangskode ved behov.',
        'admin.adminAccess': 'Administratoradgang',
        'admin.adminAccessHelp': 'Giv brugeren adgang til administratorpanel, medarbejderstyring og systemindstillinger.',
        'admin.adminAccessToggle': 'Giv administratorrettigheder',
        'admin.ownerOnlyAdminRoles': 'Kun ejeren af systemet kan tildele eller fjerne administratorrettigheder.',
        'admin.adminAccounts': 'Administratorer',
        'admin.adminAccountsTitle': 'Konti med administratoradgang',
        'admin.adminAccountsHelp': 'Kun ejeren af systemet kan tildele eller fjerne administratorrettigheder.',
        'admin.siteOwner': 'Ejer',
        'admin.noAdditionalAdmins': 'Der er ingen ekstra administratorer endnu.',
        'admin.passwordResetHelp': 'Lad felterne sta tomme for at beholde den nuvaerende adgangskode.',
        'admin.additionalParticipants': 'Ekstra deltagere',
        'admin.additionalParticipantsHelp': 'Vaelg kun ekstra personer hvis opgaven skal deles med andre.',
        'admin.totalEmployees': 'Medarbejdere',
        'admin.currentlyWorking': 'Arbejder nu',
        'admin.finished': 'Faerdige',
        'admin.lagging': 'Sakker bagud',
        'admin.systemProgress': 'Samlet systemfremdrift',
        'admin.statusDistribution': 'Statusfordeling',
        'admin.tasksDone': 'opgaver fuldfort',
        'admin.openEmployee': 'Aben profil',
        'admin.employeesTitle': 'Medarbejdere',
        'admin.teamProgress': 'Teamoversigt',
        'admin.noEmployees': 'Ingen medarbejdere fundet.',
        'admin.employeeProfile': 'Medarbejderprofil',
        'admin.updateProgress': 'Opdater progression',
        'admin.progressSettings': 'Status og trin',
        'admin.employeeStatus': 'Status',
        'admin.startDate': 'Startdato',
        'admin.completedDate': 'Slutdato',
        'admin.completedWork': 'Afsluttet arbejde',
        'admin.remainingWork': 'Resterende arbejde',
        'admin.noCompletedTasks': 'Ingen afsluttede opgaver endnu.',
        'admin.noPendingTasks': 'Ingen aabne opgaver.',
        'admin.filterAllStatuses': 'Alle statuser',
        'admin.sortName': 'Navn',
        'admin.sortProgress': 'Fremdrift',
        'admin.sortCompleted': 'Faerdige opgaver',
        'admin.sortPending': 'Aabne opgaver',
        'admin.sortOverdue': 'Forsinkede',
        'admin.searchEmployees': 'Sog efter medarbejdere',
        'admin.searchEmployeesAria': 'Sog efter medarbejdere',
        'admin.attentionEyebrow': 'Statusfokus',
        'admin.pausedTasks': 'Opgaver pa pause',
        'admin.noPausedTasks': 'Ingen opgaver er pa pause lige nu.',
        'admin.lateEmployees': 'Medarbejdere der kraever opmaerksomhed',
        'admin.noLaggingEmployees': 'Ingen medarbejdere er bagud lige nu.',
        'admin.overdueTasks': 'forsinkede opgaver',
        'admin.overdueSummary': 'Forsinkede opgaver',
        'admin.withoutTasks': 'Uden opgaver',
        'admin.attentionRequired': 'Kraever opmaerksomhed',
        'admin.dueSoon': 'Snart deadline',
        'admin.noDueSoonTasks': 'Ingen deadlines i naer fremtid.',
        'admin.priorityWork': 'Prioriteret arbejde',
        'admin.noPriorityWork': 'Intet kraever opmaerksomhed lige nu.',
        'admin.noEmployeesWithoutTasks': 'Alle medarbejdere har aktive opgaver.',
        'admin.attentionHelp': 'Brug denne sektion til hurtigt at tildele opfoelgende arbejde eller prioritere de vigtigste opgaver for medarbejderen.',
        'admin.managePhoto': 'Administrer profilbillede',
        'task.status': 'Status',
        'task.statusAria': 'Vaelg opgavestatus',
        'task.inProgressShort': 'i gang',
        'task.pausedShort': 'pa pause',
        'task.dismissCompleted': 'Fjern fra mine opgaver',
        'task.dismissCompletedConfirm': 'Er du sikker pa, at du vil fjerne den afsluttede opgave fra din oversigt?',
        'task.dismissCompletedOnlyCompleted': 'Kun afsluttede opgaver kan fjernes.',
        'status.not_started': 'Not started',
        'status.in_progress': 'In progress',
        'status.paused': 'Pa pause',
        'status.completed': 'Completed',
        'status.blocked': 'Pa pause',
        'status.lagging': 'Lagging',
        'create.headerEyebrow': 'Planlaegning',
        'create.headerTitle': 'Opret ny opgave',
        'create.newTask': 'Ny opgave',
        'create.basicInfo': 'Grundoplysninger',
        'create.submit': 'Opret opgave',
        'create.backToBoard': 'Tilbage til oversigt',
        'create.tip': 'Tip',
        'create.tipTitle': 'Skab tydelige opgaver',
        'create.tipText': 'Brug korte titler, en konkret deadline og 2-5 underopgaver, sa teamet hurtigt forstar hvad der skal ske.',
        'create.goodPractice': 'God praksis',
        'create.goodPracticeText': 'Tildel ansvarlig med det samme, sa opgaven ikke bliver staende uden ejer.',
        'edit.headerEyebrow': 'Vedligeholdelse',
        'edit.headerTitle': 'Rediger opgave',
        'edit.updating': 'Opdatering',
        'edit.save': 'Gem aendringer',
        'edit.quickOverview': 'Hurtigt overblik',
        'edit.helpText': 'Hold beskrivelser og delopgaver opdaterede, sa tasken er let at overtage for andre.',
        'profile.headerEyebrow': 'Konto',
        'profile.headerTitle': 'Min profil',
        'profile.editProfile': 'Rediger profil',
        'profile.changePassword': 'Skift adgangskode',
        'profile.userInfo': 'Brugeroplysninger',
        'profile.username': 'Brugernavn',
        'profile.role': 'Rolle',
        'profile.security': 'Konto sikkerhed',
        'profile.quickActions': 'Hurtige handlinger',
        'profile.updateInfo': 'Opdater oplysninger',
        'profile.changeCode': 'Skift kode',
        'profile.helpText': 'Hold dine oplysninger opdaterede, sa opgaver og ansvar altid viser korrekt ejer.',
        'profile.noEmailAdded': 'Ingen e-mail tilfojet',
        'profile.photoEyebrow': 'Profilbillede',
        'profile.photoTitle': 'Avatar og foto',
        'profile.photoHelp': 'Upload et JPG, PNG eller WEBP billede. Store billeder bliver optimeret i browseren inden upload.',
        'profile.uploadPhoto': 'Upload profilbillede',
        'profile.photoFormats': 'Understottede formater: JPG, PNG og WEBP. Maksimal filstorrelse 4 MB.',
        'profile.addPhoto': 'Tilfoj profilbillede',
        'profile.changePhoto': 'Skift profilbillede',
        'profile.deletePhoto': 'Slet profilbillede',
        'profile.removePhoto': 'Fjern profilbillede',
        'profile.fullName': 'Fulde navn',
        'profile.fullNamePlaceholder': 'Fx Emma Nielsen',
        'profile.emailPlaceholder': 'navn@firma.dk',
        'profile.saveProfile': 'Gem profil',
        'profile.guide': 'Profil guide',
        'profile.guideTitle': 'Gor kontoen let at genkende',
        'profile.guideText': 'Et tydeligt navn og en korrekt email giver et mere overskueligt taskboard for hele teamet.',
        'profile.updateCode': 'Opdater kode',
        'profile.securityTip': 'Sikkerhedstip',
        'profile.securityTitle': 'Vaelg en staerk adgangskode',
        'profile.securityText': 'Brug gerne en lang adgangskode eller en passphrase, som er let at huske men svaer at gaette.',
        'login.eyebrow': 'Task management',
        'login.title': 'Log ind pa din konto',
        'login.text': 'Fa adgang til dagens opgaver, deadlines og teamets overblik fra et mere fokuseret dashboard.',
        'login.error': 'Ugyldigt brugernavn eller adgangskode.',
        'login.password': 'Adgangskode',
        'login.submit': 'Log ind',
        'login.noAccount': 'Har du ikke en konto endnu?',
        'login.createAccount': 'Opret konto',
        'register.eyebrow': 'Ny konto',
        'register.title': 'Opret din konto',
        'register.text': 'Kom hurtigt i gang med dine opgaver, deadlines og teamets overblik.',
        'register.password': 'Adgangskode',
        'register.passwordConfirm': 'Bekraeft adgangskode',
        'register.submit': 'Opret konto',
        'register.hasAccount': 'Har du allerede en konto?',
        'register.backToLogin': 'Ga til login',
        'password.current': 'Nuvaerende adgangskode',
        'password.new': 'Ny adgangskode',
        'password.confirm': 'Bekraeft ny adgangskode',
        'password.help': 'Brug mindst 8 tegn og undga almindelige eller helt simple adgangskoder.',
        'messages.accountCreated': 'Din konto blev oprettet.',
        'messages.taskCreated': 'Opgaven blev oprettet.',
        'messages.taskAssigned': 'Opgaven blev tilfojet til medarbejderen.',
        'messages.taskUpdated': 'Opgaven blev opdateret.',
        'messages.taskDeleted': 'Opgaven blev slettet.',
        'messages.taskDismissed': 'Opgaven blev fjernet fra din oversigt.',
        'messages.bulkDeleted': 'Valgte opgaver blev slettet.',
        'messages.profileUpdated': 'Profilen blev opdateret.',
        'messages.profilePhotoUpdated': 'Profilbilledet blev opdateret.',
        'messages.profilePhotoDeleted': 'Profilbilledet blev fjernet.',
        'messages.employeeAccountUpdated': 'Medarbejderkontoen blev opdateret.',
        'errors.noTasksSelected': 'Vaelg mindst en opgave.',
        'errors.noProfilePhoto': 'Der er ikke noget profilbillede at fjerne.',
        'errors.usernameTaken': 'Dette brugernavn er allerede i brug.',
        'errors.emailTaken': 'Denne email er allerede i brug.',
        'errors.passwordMismatch': 'De to adgangskoder matcher ikke.',
        'errors.passwordShort': 'Adgangskoden er for kort. Den skal indeholde mindst 8 tegn.',
        'errors.passwordCommon': 'Adgangskoden er for almindelig.',
        'errors.passwordNumeric': 'Adgangskoden ma ikke kun besta af tal.',
        'errors.passwordSimilar': 'Adgangskoden minder for meget om dine personlige oplysninger.',
        'errors.currentPasswordInvalid': 'Din nuvaerende adgangskode blev indtastet forkert.',
        'errors.validEmail': 'Indtast en gyldig email-adresse.',
    },
    en: {
        'nav.workflowHub': 'Workflow hub',
        'nav.homeAria': 'TaskMaster home',
        'nav.primaryNavigation': 'Primary navigation',
        'nav.tasks': 'Tasks',
        'nav.newTask': 'New task',
        'nav.employees': 'Employees',
        'nav.profile': 'Profile',
        'nav.quickSettings': 'Quick settings',
        'nav.logout': 'Log out',
        'nav.openMenu': 'Open menu',
        'role.admin': 'Administrator',
        'role.employee': 'Employee',
        'settings.eyebrow': 'Preferences',
        'settings.title': 'Settings',
        'settings.openPanel': 'Open settings',
        'settings.theme': 'Theme',
        'settings.themeHelp': 'Switch between light and dark appearance.',
        'settings.motion': 'Animations',
        'settings.motionHelp': 'Turn micro-interactions on or off.',
        'settings.language': 'Language',
        'settings.languageHelp': 'Change language without reloading the page.',
        'settings.languagePicker': 'Choose language',
        'settings.themeDark': 'Dark mode',
        'settings.themeLight': 'Light mode',
        'board.headerEyebrow': 'Overview',
        'board.headerTitle': 'Today\'s tasks',
        'board.createTask': 'Create task',
        'board.dashboard': 'Team dashboard',
        'board.heroTitle': 'Stay on top of tasks, owners, and deadlines.',
        'board.heroText': 'Filter quickly between active and completed tasks and jump into details without unnecessary clicks.',
        'board.statusNow': 'Current status',
        'board.total': 'Total',
        'board.active': 'Active',
        'board.completed': 'Done',
        'board.withDeadline': 'With deadline',
        'board.overallProgress': 'Overall progress',
        'board.progressText': '{completed} of {total} tasks completed.',
        'board.participantsBadge': 'Participants',
        'board.subtasksQuick': 'Quick checklist',
        'board.searchPlaceholder': 'Search by title, description, or owner',
        'board.searchAria': 'Search tasks',
        'board.filtersAria': 'Filter tasks',
        'board.filterAll': 'All',
        'board.filterActive': 'Active',
        'board.filterCompleted': 'Completed',
        'board.filterDeadline': 'Has deadline',
        'board.listLabel': 'Task list',
        'board.listTitle': 'All tasks',
        'board.activeListLabel': 'In focus',
        'board.activeListTitle': 'Active tasks',
        'board.activeEmptyTitle': 'No active tasks',
        'board.activeEmptyText': 'Current work is finished or waiting for new assignments.',
        'board.completedListLabel': 'Recently completed',
        'board.completedListTitle': 'Completed tasks',
        'board.completedEmptyTitle': 'No completed tasks',
        'board.completedEmptyText': 'Finished work stays here so the main list can stay focused on what is still open.',
        'board.visible': 'visible',
        'board.bulkSelectionCount': '{count} selected',
        'board.selectVisible': 'Select visible',
        'board.clearSelection': 'Clear selection',
        'board.bulkDelete': 'Delete selected',
        'board.bulkDeleteConfirm': 'Are you sure you want to delete the selected tasks?',
        'board.selectTaskAria': 'Select task',
        'board.doneBadge': 'Completed',
        'board.emptyTitle': 'No tasks yet',
        'board.emptyText': 'Create the first task to start building your team overview.',
        'board.taskToggleAria': 'Mark task as complete',
        'board.unassigned': 'Unassigned',
        'detail.headerEyebrow': 'Task details',
        'detail.mainTask': 'Main task',
        'detail.description': 'Description',
        'detail.checklist': 'Checklist',
        'detail.subtasks': 'Subtasks',
        'detail.noDeadline': 'No deadline',
        'detail.createdPrefix': 'Created',
        'detail.progressText': '{completed} of {total} subtasks completed.',
        'detail.participants': 'Participants',
        'detail.noParticipants': 'Assignee only',
        'detail.noSubtasks': 'There are no subtasks yet.',
        'detail.subtaskToggleAria': 'Mark subtask as complete',
        'common.back': 'Back',
        'common.skipToContent': 'Skip to content',
        'common.cancel': 'Cancel',
        'common.close': 'Close',
        'common.edit': 'Edit',
        'common.delete': 'Delete',
        'common.confirmDelete': 'Are you sure you want to delete this task?',
        'common.remove': 'Remove',
        'common.deadline': 'Deadline',
        'common.email': 'Email',
        'common.notSpecified': 'Not specified',
        'common.save': 'Save',
        'common.apply': 'Apply',
        'form.taskTitle': 'Task title',
        'form.taskTitlePlaceholder': 'For example Prepare sprint review',
        'form.description': 'Description',
        'form.descriptionPlaceholder': 'Briefly describe the goal, scope, and expectations',
        'form.assignee': 'Assignee',
        'form.participants': 'Participants',
        'form.participantsHelp': 'Choose additional users who should also be able to see and work on this task.',
        'form.personalTaskOwner': 'Personal task',
        'form.personalTaskHelp': 'The task will automatically be created on your own account.',
        'form.addSubtask': 'Add subtask',
        'form.newSubtaskPlaceholder': 'New subtask',
        'employee.workspaceEyebrow': 'Workspace',
        'employee.workspaceTitle': 'Focus on your work',
        'employee.currentStage': 'Current stage',
        'employee.completedTasks': 'Completed tasks',
        'employee.pendingTasks': 'Remaining',
        'employee.progress': 'Progress',
        'employee.personalProgress': 'Your progress',
        'employee.stagePlaceholder': 'For example QA review',
        'employee.awaitingAssignment': 'Awaiting assignment',
        'employee.awaitingAssignmentHelp': 'You do not have any active tasks yet. New work will appear here as soon as it is assigned.',
        'employee.attentionEyebrow': 'Focus now',
        'employee.attentionTitle': 'Items that need action',
        'employee.noPriorityTasks': 'Nothing needs action right now.',
        'admin.dashboardEyebrow': 'Admin overview',
        'admin.dashboardTitle': 'Team progress',
        'admin.boardOverviewEyebrow': 'Operations',
        'admin.boardOverviewTitle': 'Current task status',
        'admin.manageEmployees': 'Manage employees',
        'admin.assignTask': 'Assign task',
        'admin.quickAssign': 'Add task',
        'admin.quickAssignEyebrow': 'Assign work',
        'admin.quickAssignTitle': 'Add task for employee',
        'admin.quickAssignHelp': 'The employee is automatically set as the main assignee. Add extra participants only when the work should be shared.',
        'admin.assignTaskToEmployee': 'Add task',
        'admin.manageAccount': 'Manage account',
        'admin.accountAccessEyebrow': 'Account access',
        'admin.accountAccessTitle': 'Account details and access',
        'admin.accountAccessHelp': 'Update name, username, email, or reset the employee password when needed.',
        'admin.adminAccess': 'Administrator access',
        'admin.adminAccessHelp': 'Give this user access to the admin dashboard, employee management, and system controls.',
        'admin.adminAccessToggle': 'Grant administrator access',
        'admin.ownerOnlyAdminRoles': 'Only the site owner can grant or remove administrator rights.',
        'admin.adminAccounts': 'Administrators',
        'admin.adminAccountsTitle': 'Accounts with administrator access',
        'admin.adminAccountsHelp': 'Only the site owner can grant or remove administrator rights.',
        'admin.siteOwner': 'Owner',
        'admin.noAdditionalAdmins': 'There are no additional administrators yet.',
        'admin.passwordResetHelp': 'Leave the password fields empty to keep the current password.',
        'admin.additionalParticipants': 'Extra participants',
        'admin.additionalParticipantsHelp': 'Choose extra people only if the task should be shared.',
        'admin.totalEmployees': 'Employees',
        'admin.currentlyWorking': 'Working now',
        'admin.finished': 'Finished',
        'admin.lagging': 'Lagging',
        'admin.systemProgress': 'Overall system progress',
        'admin.statusDistribution': 'Status distribution',
        'admin.tasksDone': 'tasks completed',
        'admin.openEmployee': 'Open profile',
        'admin.employeesTitle': 'Employees',
        'admin.teamProgress': 'Team overview',
        'admin.noEmployees': 'No employees found.',
        'admin.employeeProfile': 'Employee profile',
        'admin.updateProgress': 'Update progress',
        'admin.progressSettings': 'Status and stage',
        'admin.employeeStatus': 'Status',
        'admin.startDate': 'Start date',
        'admin.completedDate': 'Completion date',
        'admin.completedWork': 'Completed work',
        'admin.remainingWork': 'Remaining work',
        'admin.noCompletedTasks': 'No completed tasks yet.',
        'admin.noPendingTasks': 'No open tasks.',
        'admin.filterAllStatuses': 'All statuses',
        'admin.sortName': 'Name',
        'admin.sortProgress': 'Progress',
        'admin.sortCompleted': 'Completed tasks',
        'admin.sortPending': 'Pending tasks',
        'admin.sortOverdue': 'Overdue',
        'admin.searchEmployees': 'Search employees',
        'admin.searchEmployeesAria': 'Search employees',
        'admin.attentionEyebrow': 'Attention',
        'admin.pausedTasks': 'Tasks on hold',
        'admin.noPausedTasks': 'No tasks are on hold right now.',
        'admin.lateEmployees': 'Employees needing attention',
        'admin.noLaggingEmployees': 'No employees are falling behind right now.',
        'admin.overdueTasks': 'overdue tasks',
        'admin.overdueSummary': 'Overdue tasks',
        'admin.withoutTasks': 'Without tasks',
        'admin.attentionRequired': 'Need attention',
        'admin.dueSoon': 'Due soon',
        'admin.noDueSoonTasks': 'No upcoming deadlines right now.',
        'admin.priorityWork': 'Priority work',
        'admin.noPriorityWork': 'Nothing needs attention right now.',
        'admin.noEmployeesWithoutTasks': 'All employees have active tasks.',
        'admin.attentionHelp': 'Use this section to quickly assign follow-up work or prioritise the most important tasks for this employee.',
        'admin.managePhoto': 'Manage profile photo',
        'task.status': 'Status',
        'task.statusAria': 'Choose task status',
        'task.inProgressShort': 'active',
        'task.pausedShort': 'on hold',
        'task.dismissCompleted': 'Remove from my tasks',
        'task.dismissCompletedConfirm': 'Are you sure you want to remove this completed task from your list?',
        'task.dismissCompletedOnlyCompleted': 'Only completed tasks can be removed.',
        'status.not_started': 'Not started',
        'status.in_progress': 'In progress',
        'status.paused': 'On hold',
        'status.completed': 'Completed',
        'status.blocked': 'On hold',
        'status.lagging': 'Lagging',
        'create.headerEyebrow': 'Planning',
        'create.headerTitle': 'Create a new task',
        'create.newTask': 'New task',
        'create.basicInfo': 'Basic information',
        'create.submit': 'Create task',
        'create.backToBoard': 'Back to board',
        'create.tip': 'Tip',
        'create.tipTitle': 'Create clearer tasks',
        'create.tipText': 'Use short titles, a concrete deadline, and 2-5 subtasks so the team quickly understands what should happen.',
        'create.goodPractice': 'Best practice',
        'create.goodPracticeText': 'Assign an owner right away so the task does not remain without one.',
        'edit.headerEyebrow': 'Maintenance',
        'edit.headerTitle': 'Edit task',
        'edit.updating': 'Updating',
        'edit.save': 'Save changes',
        'edit.quickOverview': 'Quick overview',
        'edit.helpText': 'Keep descriptions and subtasks updated so the task is easy for others to take over.',
        'profile.headerEyebrow': 'Account',
        'profile.headerTitle': 'My profile',
        'profile.editProfile': 'Edit profile',
        'profile.changePassword': 'Change password',
        'profile.userInfo': 'User information',
        'profile.username': 'Username',
        'profile.role': 'Role',
        'profile.security': 'Account security',
        'profile.quickActions': 'Quick actions',
        'profile.updateInfo': 'Update information',
        'profile.changeCode': 'Change code',
        'profile.helpText': 'Keep your details current so tasks and ownership always show the right person.',
        'profile.noEmailAdded': 'No email added',
        'profile.photoEyebrow': 'Profile photo',
        'profile.photoTitle': 'Avatar and photo',
        'profile.photoHelp': 'Upload a JPG, PNG, or WEBP image. Large images are optimized in the browser before upload.',
        'profile.uploadPhoto': 'Upload profile photo',
        'profile.photoFormats': 'Supported formats: JPG, PNG, and WEBP. Maximum file size 4 MB.',
        'profile.addPhoto': 'Add profile photo',
        'profile.changePhoto': 'Change profile photo',
        'profile.deletePhoto': 'Delete profile photo',
        'profile.removePhoto': 'Remove photo',
        'profile.fullName': 'Full name',
        'profile.fullNamePlaceholder': 'For example Emma Nielsen',
        'profile.emailPlaceholder': 'name@company.com',
        'profile.saveProfile': 'Save profile',
        'profile.guide': 'Profile guide',
        'profile.guideTitle': 'Make the account easy to recognize',
        'profile.guideText': 'A clear name and correct email make the taskboard easier to scan for the whole team.',
        'profile.updateCode': 'Update password',
        'profile.securityTip': 'Security tip',
        'profile.securityTitle': 'Choose a strong password',
        'profile.securityText': 'Use a long password or passphrase that is easy to remember but hard to guess.',
        'login.eyebrow': 'Task management',
        'login.title': 'Sign in to your account',
        'login.text': 'Get access to today\'s tasks, deadlines, and the team overview from a more focused dashboard.',
        'login.error': 'Invalid username or password.',
        'login.password': 'Password',
        'login.submit': 'Sign in',
        'login.noAccount': 'Do not have an account yet?',
        'login.createAccount': 'Create account',
        'register.eyebrow': 'New account',
        'register.title': 'Create your account',
        'register.text': 'Get started quickly with your tasks, deadlines, and team overview.',
        'register.password': 'Password',
        'register.passwordConfirm': 'Confirm password',
        'register.submit': 'Create account',
        'register.hasAccount': 'Already have an account?',
        'register.backToLogin': 'Go to sign in',
        'password.current': 'Current password',
        'password.new': 'New password',
        'password.confirm': 'Confirm new password',
        'password.help': 'Use at least 8 characters and avoid common or overly simple passwords.',
        'messages.accountCreated': 'Your account has been created.',
        'messages.taskCreated': 'The task has been created.',
        'messages.taskAssigned': 'Task added to the employee.',
        'messages.taskUpdated': 'The task has been updated.',
        'messages.taskDeleted': 'The task has been deleted.',
        'messages.taskDismissed': 'The task has been removed from your list.',
        'messages.bulkDeleted': 'Selected tasks have been deleted.',
        'messages.profileUpdated': 'Your profile has been updated.',
        'messages.profilePhotoUpdated': 'Your profile photo has been updated.',
        'messages.profilePhotoDeleted': 'Your profile photo has been removed.',
        'messages.employeeAccountUpdated': 'The employee account has been updated.',
        'errors.noTasksSelected': 'Select at least one task.',
        'errors.noProfilePhoto': 'There is no profile photo to remove.',
        'errors.usernameTaken': 'This username is already in use.',
        'errors.emailTaken': 'This email is already in use.',
        'errors.passwordMismatch': 'The two passwords do not match.',
        'errors.passwordShort': 'The password is too short. It must contain at least 8 characters.',
        'errors.passwordCommon': 'The password is too common.',
        'errors.passwordNumeric': 'The password cannot be entirely numeric.',
        'errors.passwordSimilar': 'The password is too similar to your personal information.',
        'errors.currentPasswordInvalid': 'Your current password was entered incorrectly.',
        'errors.validEmail': 'Enter a valid email address.',
    },
    ru: {
        'nav.workflowHub': 'Центр процессов',
        'nav.homeAria': 'Главная TaskMaster',
        'nav.primaryNavigation': 'Основная навигация',
        'nav.tasks': 'Задачи',
        'nav.newTask': 'Новая задача',
        'nav.employees': 'Сотрудники',
        'nav.profile': 'Профиль',
        'nav.quickSettings': 'Быстрые настройки',
        'nav.logout': 'Выйти',
        'nav.openMenu': 'Открыть меню',
        'role.admin': 'Администратор',
        'role.employee': 'Сотрудник',
        'settings.eyebrow': 'Параметры',
        'settings.title': 'Настройки',
        'settings.openPanel': 'Открыть настройки',
        'settings.theme': 'Тема',
        'settings.themeHelp': 'Переключение между светлым и тёмным режимом.',
        'settings.motion': 'Анимации',
        'settings.motionHelp': 'Включайте или отключайте микро-взаимодействия.',
        'settings.language': 'Язык',
        'settings.languageHelp': 'Меняйте язык без перезагрузки страницы.',
        'settings.languagePicker': 'Выберите язык',
        'settings.themeDark': 'Тёмная тема',
        'settings.themeLight': 'Светлая тема',
        'board.headerEyebrow': 'Обзор',
        'board.headerTitle': 'Задачи на сегодня',
        'board.createTask': 'Создать задачу',
        'board.dashboard': 'Командная панель',
        'board.heroTitle': 'Держите под контролем задачи, ответственных и дедлайны.',
        'board.heroText': 'Быстро фильтруйте активные и завершённые задачи и переходите к деталям без лишних кликов.',
        'board.statusNow': 'Текущий статус',
        'board.total': 'Всего',
        'board.active': 'Активные',
        'board.completed': 'Готово',
        'board.withDeadline': 'С дедлайном',
        'board.overallProgress': 'Общий прогресс',
        'board.progressText': 'Выполнено {completed} из {total} задач.',
        'board.participantsBadge': 'Участники',
        'board.subtasksQuick': 'Быстрый чек-лист',
        'board.searchPlaceholder': 'Поиск по названию, описанию или ответственному',
        'board.searchAria': 'Поиск задач',
        'board.filtersAria': 'Фильтрация задач',
        'board.filterAll': 'Все',
        'board.filterActive': 'Активные',
        'board.filterCompleted': 'Завершённые',
        'board.filterDeadline': 'С дедлайном',
        'board.listLabel': 'Список задач',
        'board.listTitle': 'Все задачи',
        'board.activeListLabel': 'В фокусе',
        'board.activeListTitle': 'Активные задачи',
        'board.activeEmptyTitle': 'Нет активных задач',
        'board.activeEmptyText': 'Текущая работа завершена или ожидает новых назначений.',
        'board.completedListLabel': 'Недавно завершённые',
        'board.completedListTitle': 'Завершённые задачи',
        'board.completedEmptyTitle': 'Нет завершённых задач',
        'board.completedEmptyText': 'Готовые задачи собираются здесь, чтобы основной список оставался сфокусирован на текущей работе.',
        'board.visible': 'видимо',
        'board.doneBadge': 'Завершено',
        'board.emptyTitle': 'Пока нет задач',
        'board.emptyText': 'Создайте первую задачу, чтобы начать формировать обзор команды.',
        'board.taskToggleAria': 'Отметить задачу как выполненную',
        'board.unassigned': 'Не назначено',
        'detail.headerEyebrow': 'Детали задачи',
        'detail.mainTask': 'Основная задача',
        'detail.description': 'Описание',
        'detail.checklist': 'Чек-лист',
        'detail.subtasks': 'Подзадачи',
        'detail.noDeadline': 'Без дедлайна',
        'detail.createdPrefix': 'Создано',
        'detail.progressText': 'Выполнено {completed} из {total} подзадач.',
        'detail.participants': 'Участники',
        'detail.noParticipants': 'Только ответственный',
        'detail.noSubtasks': 'Подзадач пока нет.',
        'detail.subtaskToggleAria': 'Отметить подзадачу как выполненную',
        'common.back': 'Назад',
        'common.skipToContent': 'Перейти к содержимому',
        'common.cancel': 'Отмена',
        'common.close': 'Закрыть',
        'common.edit': 'Редактировать',
        'common.delete': 'Удалить',
        'common.confirmDelete': 'Вы уверены, что хотите удалить эту задачу?',
        'common.remove': 'Убрать',
        'common.deadline': 'Дедлайн',
        'common.email': 'Email',
        'common.notSpecified': 'Не указано',
        'common.save': 'Сохранить',
        'common.apply': 'Применить',
        'form.taskTitle': 'Название задачи',
        'form.taskTitlePlaceholder': 'Например, Подготовить обзор спринта',
        'form.description': 'Описание',
        'form.descriptionPlaceholder': 'Кратко опишите цель, объём и ожидания',
        'form.assignee': 'Ответственный',
        'form.participants': 'Участники',
        'form.participantsHelp': 'Выберите пользователей, которые тоже должны видеть и вести эту задачу.',
        'form.addSubtask': 'Добавить подзадачу',
        'form.newSubtaskPlaceholder': 'Новая подзадача',
        'employee.workspaceEyebrow': 'Рабочая зона',
        'employee.workspaceTitle': 'Фокус на ваших задачах',
        'employee.currentStage': 'Текущий этап',
        'employee.completedTasks': 'Завершённые задачи',
        'employee.pendingTasks': 'Осталось',
        'employee.progress': 'Прогресс',
        'employee.personalProgress': 'Ваш прогресс',
        'employee.stagePlaceholder': 'Например QA review',
        'employee.awaitingAssignment': 'Ожидает назначения',
        'admin.dashboardEyebrow': 'Панель администратора',
        'admin.dashboardTitle': 'Прогресс команды',
        'admin.manageEmployees': 'Управление сотрудниками',
        'admin.assignTask': 'Назначить задачу',
        'admin.totalEmployees': 'Сотрудники',
        'admin.currentlyWorking': 'Сейчас работают',
        'admin.finished': 'Завершили',
        'admin.lagging': 'Отстают',
        'admin.systemProgress': 'Общий прогресс системы',
        'admin.statusDistribution': 'Распределение статусов',
        'admin.tasksDone': 'задач завершено',
        'admin.openEmployee': 'Открыть профиль',
        'admin.employeesTitle': 'Сотрудники',
        'admin.teamProgress': 'Обзор команды',
        'admin.noEmployees': 'Сотрудники не найдены.',
        'admin.employeeProfile': 'Профиль сотрудника',
        'admin.updateProgress': 'Обновить прогресс',
        'admin.progressSettings': 'Статус и этап',
        'admin.employeeStatus': 'Статус',
        'admin.startDate': 'Дата начала',
        'admin.completedDate': 'Дата завершения',
        'admin.completedWork': 'Завершённая работа',
        'admin.remainingWork': 'Оставшаяся работа',
        'admin.noCompletedTasks': 'Пока нет завершённых задач.',
        'admin.noPendingTasks': 'Нет открытых задач.',
        'admin.filterAllStatuses': 'Все статусы',
        'admin.sortName': 'Имя',
        'admin.sortProgress': 'Прогресс',
        'admin.sortCompleted': 'Завершённые задачи',
        'admin.sortPending': 'Оставшиеся задачи',
        'admin.sortOverdue': 'Просроченные',
        'admin.searchEmployees': 'Поиск сотрудников',
        'admin.searchEmployeesAria': 'Поиск сотрудников',
        'admin.attentionEyebrow': 'Фокус',
        'admin.pausedTasks': 'Задачи на паузе',
        'admin.noPausedTasks': 'Сейчас нет задач на паузе.',
        'admin.lateEmployees': 'Сотрудники, требующие внимания',
        'admin.noLaggingEmployees': 'Сейчас никто не отстаёт.',
        'admin.overdueTasks': 'просроченных задач',
        'admin.overdueSummary': 'Просроченные задачи',
        'admin.withoutTasks': 'Без задач',
        'admin.attentionRequired': 'Требуют внимания',
        'admin.dueSoon': 'Скоро дедлайн',
        'admin.noDueSoonTasks': 'Ближайших дедлайнов пока нет.',
        'admin.priorityWork': 'Приоритетная работа',
        'admin.noPriorityWork': 'Сейчас ничего не требует внимания.',
        'task.status': 'Статус',
        'task.statusAria': 'Выбрать статус задачи',
        'task.inProgressShort': 'в работе',
        'task.pausedShort': 'на паузе',
        'status.not_started': 'Не начато',
        'status.in_progress': 'В процессе',
        'status.paused': 'На паузе',
        'status.completed': 'Завершено',
        'status.blocked': 'На паузе',
        'status.lagging': 'Отстаёт',
        'create.headerEyebrow': 'Планирование',
        'create.headerTitle': 'Создать новую задачу',
        'create.newTask': 'Новая задача',
        'create.basicInfo': 'Основная информация',
        'create.submit': 'Создать задачу',
        'create.backToBoard': 'Назад к доске',
        'create.tip': 'Совет',
        'create.tipTitle': 'Формулируйте задачи понятнее',
        'create.tipText': 'Используйте короткие названия, конкретный дедлайн и 2-5 подзадач, чтобы команда сразу понимала план.',
        'create.goodPractice': 'Хорошая практика',
        'create.goodPracticeText': 'Назначайте ответственного сразу, чтобы задача не оставалась без владельца.',
        'edit.headerEyebrow': 'Поддержка',
        'edit.headerTitle': 'Редактировать задачу',
        'edit.updating': 'Обновление',
        'edit.save': 'Сохранить изменения',
        'edit.quickOverview': 'Быстрый обзор',
        'edit.helpText': 'Поддерживайте описание и подзадачи в актуальном состоянии, чтобы задачу было легко передать другому.',
        'profile.headerEyebrow': 'Аккаунт',
        'profile.headerTitle': 'Мой профиль',
        'profile.editProfile': 'Редактировать профиль',
        'profile.changePassword': 'Сменить пароль',
        'profile.userInfo': 'Данные пользователя',
        'profile.username': 'Имя пользователя',
        'profile.role': 'Роль',
        'profile.security': 'Безопасность аккаунта',
        'profile.quickActions': 'Быстрые действия',
        'profile.updateInfo': 'Обновить данные',
        'profile.changeCode': 'Сменить код',
        'profile.helpText': 'Поддерживайте данные в актуальном состоянии, чтобы задачи и ответственность всегда были привязаны к нужному человеку.',
        'profile.noEmailAdded': 'E-mail ещё не добавлен',
        'profile.fullName': 'Полное имя',
        'profile.fullNamePlaceholder': 'Например, Emma Nielsen',
        'profile.emailPlaceholder': 'name@company.com',
        'profile.saveProfile': 'Сохранить профиль',
        'profile.guide': 'Подсказка по профилю',
        'profile.guideTitle': 'Сделайте аккаунт легко узнаваемым',
        'profile.guideText': 'Понятное имя и корректный email делают доску задач заметно удобнее для всей команды.',
        'profile.updateCode': 'Обновить пароль',
        'profile.securityTip': 'Совет по безопасности',
        'profile.securityTitle': 'Выберите надёжный пароль',
        'profile.securityText': 'Используйте длинный пароль или парольную фразу, которую легко запомнить, но трудно угадать.',
        'login.eyebrow': 'Управление задачами',
        'login.title': 'Войдите в свой аккаунт',
        'login.text': 'Получите доступ к задачам на сегодня, дедлайнам и обзору команды в более сфокусированном интерфейсе.',
        'login.error': 'Неверное имя пользователя или пароль.',
        'login.password': 'Пароль',
        'login.submit': 'Войти',
        'login.noAccount': 'Ещё нет аккаунта?',
        'login.createAccount': 'Создать аккаунт',
        'register.eyebrow': 'Новый аккаунт',
        'register.title': 'Создайте свой аккаунт',
        'register.text': 'Быстро начните работу с задачами, дедлайнами и обзором команды.',
        'register.password': 'Пароль',
        'register.passwordConfirm': 'Подтвердите пароль',
        'register.submit': 'Создать аккаунт',
        'register.hasAccount': 'Уже есть аккаунт?',
        'register.backToLogin': 'Перейти ко входу',
        'password.current': 'Текущий пароль',
        'password.new': 'Новый пароль',
        'password.confirm': 'Подтвердите новый пароль',
        'password.help': 'Используйте минимум 8 символов и избегайте слишком простых паролей.',
        'messages.accountCreated': 'Ваш аккаунт создан.',
        'messages.taskCreated': 'Задача создана.',
        'messages.taskUpdated': 'Задача обновлена.',
        'messages.taskDeleted': 'Задача удалена.',
        'messages.profileUpdated': 'Профиль обновлён.',
        'errors.usernameTaken': 'Это имя пользователя уже занято.',
        'errors.emailTaken': 'Этот email уже используется.',
        'errors.passwordMismatch': 'Пароли не совпадают.',
        'errors.passwordShort': 'Пароль слишком короткий. Минимум 8 символов.',
        'errors.passwordCommon': 'Пароль слишком простой.',
        'errors.passwordNumeric': 'Пароль не должен состоять только из цифр.',
        'errors.passwordSimilar': 'Пароль слишком похож на ваши личные данные.',
        'errors.currentPasswordInvalid': 'Текущий пароль введён неверно.',
        'errors.validEmail': 'Введите корректный email.',
        'operations.attentionHelp': 'Дедлайн или пропущенные задачи',
    'templates.saveTitle': 'Сохранить как шаблон',
    'templates.saveHelp': 'Сохраните эту задачу как шаблон, чтобы легко создавать похожие задачи в будущем или делать эту задачу повторяющейся.',
    'templates.saveToggle': 'Сохранить как шаблон',
    'templates.name': 'Название шаблона',
    'templates.recurrence': 'Повторение',
    'templates.deadlineOffset': 'Смещение дедлайна (дни)',
    'templates.libraryTitle': 'Библиотека шаблонов',
    'templates.libraryHelp': 'Создавайте повторно используемые шаблоны для онбординга, обзоров и повторяющихся операций.',
    'templates.daysAfterStart': 'дней после начала',
    'templates.useTemplate': 'Использовать шаблон',
    'templates.deleteConfirm': 'Удалить этот шаблон?',
    'templates.emptyTitle': 'Шаблоны отсутствуют',
    'templates.emptyText': 'Сохраните задачу как шаблон из формы задачи, чтобы использовать её позже или сделать её повторяющейся.',    
    },
};

Object.assign(translations.ru, {
    'form.personalTaskOwner': 'Личная задача',
    'form.personalTaskHelp': 'Задача будет автоматически создана на вашем аккаунте.',
    'task.dismissCompleted': 'Убрать из моих задач',
    'task.dismissCompletedConfirm': 'Убрать завершённую задачу из вашего списка?',
    'task.dismissCompletedOnlyCompleted': 'Убирать можно только завершённые задачи.',
    'messages.taskDismissed': 'Задача убрана из вашего списка.',
    'board.bulkSelectionCount': '{count} выбрано',
    'board.selectVisible': 'Выбрать видимые',
    'board.clearSelection': 'Очистить выбор',
    'board.bulkDelete': 'Удалить выбранные',
    'board.bulkDeleteConfirm': 'Вы уверены, что хотите удалить выбранные задачи?',
    'board.selectTaskAria': 'Выбрать задачу',
    'employee.awaitingAssignmentHelp': '\u0423 \u0432\u0430\u0441 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442 \u0430\u043a\u0442\u0438\u0432\u043d\u044b\u0445 \u0437\u0430\u0434\u0430\u0447. \u041d\u043e\u0432\u044b\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u043f\u043e\u044f\u0432\u044f\u0442\u0441\u044f \u0437\u0434\u0435\u0441\u044c \u0441\u0440\u0430\u0437\u0443 \u043f\u043e\u0441\u043b\u0435 \u043d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f.',
    'employee.attentionEyebrow': '\u0424\u043e\u043a\u0443\u0441 \u0441\u0435\u0439\u0447\u0430\u0441',
    'employee.attentionTitle': '\u0422\u043e, \u0447\u0442\u043e \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f',
    'employee.noPriorityTasks': '\u0421\u0435\u0439\u0447\u0430\u0441 \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439.',
    'admin.boardOverviewEyebrow': '\u041e\u043f\u0435\u0440\u0430\u0446\u0438\u0438',
    'admin.boardOverviewTitle': '\u0422\u0435\u043a\u0443\u0449\u0438\u0439 \u0441\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u0434\u0430\u0447',
    'admin.quickAssign': '\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0443',
    'admin.quickAssignEyebrow': '\u041d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0440\u0430\u0431\u043e\u0442\u044b',
    'admin.quickAssignTitle': '\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0443 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0443',
    'admin.quickAssignHelp': '\u0421\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438 \u043d\u0430\u0437\u043d\u0430\u0447\u0430\u0435\u0442\u0441\u044f \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u043c. \u0414\u043e\u0431\u0430\u0432\u043b\u044f\u0439\u0442\u0435 \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0445 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432 \u0442\u043e\u043b\u044c\u043a\u043e \u0435\u0441\u043b\u0438 \u0437\u0430\u0434\u0430\u0447\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u043e\u0431\u0449\u0430\u044f.',
    'admin.assignTaskToEmployee': '\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0443',
    'admin.additionalParticipants': '\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0438',
    'admin.additionalParticipantsHelp': '\u0412\u044b\u0431\u0438\u0440\u0430\u0439\u0442\u0435 \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0445 \u043b\u044e\u0434\u0435\u0439 \u0442\u043e\u043b\u044c\u043a\u043e \u0435\u0441\u043b\u0438 \u0437\u0430\u0434\u0430\u0447\u0430 \u0434\u043e\u043b\u0436\u043d\u0430 \u0432\u044b\u043f\u043e\u043b\u043d\u044f\u0442\u044c\u0441\u044f \u0432\u043c\u0435\u0441\u0442\u0435.',
    'admin.noEmployeesWithoutTasks': '\u0423 \u0432\u0441\u0435\u0445 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u043e\u0432 \u0435\u0441\u0442\u044c \u0430\u043a\u0442\u0438\u0432\u043d\u044b\u0435 \u0437\u0430\u0434\u0430\u0447\u0438.',
    'admin.attentionHelp': '\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u044d\u0442\u043e\u0442 \u0431\u043b\u043e\u043a, \u0447\u0442\u043e\u0431\u044b \u0431\u044b\u0441\u0442\u0440\u043e \u043d\u0430\u0437\u043d\u0430\u0447\u0438\u0442\u044c \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0443\u044e \u0437\u0430\u0434\u0430\u0447\u0443 \u0438\u043b\u0438 \u0441\u0444\u043e\u043a\u0443\u0441\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f \u043d\u0430 \u0441\u0430\u043c\u044b\u0445 \u0432\u0430\u0436\u043d\u044b\u0445 \u0437\u0430\u0434\u0430\u0447\u0430\u0445 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0430.',
    'messages.taskAssigned': '\u0417\u0430\u0434\u0430\u0447\u0430 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0430 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0443.',
    'messages.bulkDeleted': '\u0412\u044b\u0431\u0440\u0430\u043d\u043d\u044b\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0443\u0434\u0430\u043b\u0435\u043d\u044b.',
    'errors.noTasksSelected': '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0445\u043e\u0442\u044f \u0431\u044b \u043e\u0434\u043d\u0443 \u0437\u0430\u0434\u0430\u0447\u0443.',
});

Object.assign(translations.ru, {
    'admin.manageAccount': '\u0423\u043f\u0440\u0430\u0432\u043b\u044f\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u043e\u043c',
    'admin.accountAccessEyebrow': '\u0414\u043e\u0441\u0442\u0443\u043f \u043a \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0443',
    'admin.accountAccessTitle': '\u0414\u0430\u043d\u043d\u044b\u0435 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430 \u0438 \u0434\u043e\u0441\u0442\u0443\u043f',
    'admin.accountAccessHelp': '\u041e\u0431\u043d\u043e\u0432\u043b\u044f\u0439\u0442\u0435 \u0438\u043c\u044f, username, email \u0438\u043b\u0438 \u043f\u0440\u0438 \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e\u0441\u0442\u0438 \u0441\u0431\u0440\u0430\u0441\u044b\u0432\u0430\u0439\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0430.',
    'admin.adminAccess': '\u041f\u0440\u0430\u0432\u0430 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0430',
    'admin.adminAccessHelp': '\u0414\u0430\u0439\u0442\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044e \u0434\u043e\u0441\u0442\u0443\u043f \u043a \u0430\u0434\u043c\u0438\u043d-\u043f\u0430\u043d\u0435\u043b\u0438, \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044e \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0430\u043c\u0438 \u0438 \u043a\u043b\u044e\u0447\u0435\u0432\u044b\u043c \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430\u043c \u0441\u0438\u0441\u0442\u0435\u043c\u044b.',
    'admin.adminAccessToggle': '\u0412\u044b\u0434\u0430\u0442\u044c \u043f\u0440\u0430\u0432\u0430 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0430',
    'admin.ownerOnlyAdminRoles': '\u0422\u043e\u043b\u044c\u043a\u043e \u0432\u043b\u0430\u0434\u0435\u043b\u0435\u0446 \u0441\u0438\u0441\u0442\u0435\u043c\u044b \u043c\u043e\u0436\u0435\u0442 \u0432\u044b\u0434\u0430\u0432\u0430\u0442\u044c \u0438 \u0441\u043d\u0438\u043c\u0430\u0442\u044c \u043f\u0440\u0430\u0432\u0430 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0430.',
    'admin.adminAccounts': '\u0410\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u044b',
    'admin.adminAccountsTitle': '\u0410\u043a\u043a\u0430\u0443\u043d\u0442\u044b \u0441 \u043f\u0440\u0430\u0432\u0430\u043c\u0438 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0430',
    'admin.adminAccountsHelp': '\u0422\u043e\u043b\u044c\u043a\u043e \u0432\u043b\u0430\u0434\u0435\u043b\u0435\u0446 \u0441\u0438\u0441\u0442\u0435\u043c\u044b \u043c\u043e\u0436\u0435\u0442 \u0432\u044b\u0434\u0430\u0432\u0430\u0442\u044c \u0438 \u0441\u043d\u0438\u043c\u0430\u0442\u044c \u043f\u0440\u0430\u0432\u0430 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0430.',
    'admin.siteOwner': '\u0412\u043b\u0430\u0434\u0435\u043b\u0435\u0446',
    'admin.noAdditionalAdmins': '\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0445 \u0430\u0434\u043c\u0438\u043d\u043e\u0432 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442.',
    'admin.passwordResetHelp': '\u041e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u043f\u043e\u043b\u044f \u043f\u0430\u0440\u043e\u043b\u044f \u043f\u0443\u0441\u0442\u044b\u043c\u0438, \u0447\u0442\u043e\u0431\u044b \u0441\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0442\u0435\u043a\u0443\u0449\u0438\u0439 \u043f\u0430\u0440\u043e\u043b\u044c.',
    'messages.employeeAccountUpdated': '\u0410\u043a\u043a\u0430\u0443\u043d\u0442 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0430 \u043e\u0431\u043d\u043e\u0432\u043b\u0451\u043d.',
});

Object.assign(translations.da, {
    'nav.taskList': 'Opgaveliste',
    'nav.taskWall': 'Opgavevaeg',
    'nav.processes': 'Kontrolpanel',
    'admin.homeEyebrow': 'Administrators overblik',
    'admin.homeTitle': 'Det vigtigste lige nu',
    'admin.processesEyebrow': 'Kontrolpanel',
    'admin.processesTitle': 'Teamoverblik',
    'admin.processesLead': 'Fa et hurtigt overblik over kapacitet, flaskehalse og dialoger, sa du kan prioritere de naeste handlinger uden at hoppe mellem sider.',
    'admin.processesSummaryTitle': 'Systemoverblik',
    'admin.processesSummaryHelp': 'Brug oversigten til hurtigt at vurdere belastning, fremdrift og hvor teamet mister fart.',
    'admin.processesTeamTitle': 'Medarbejderoverblik',
    'admin.processesTeamHelp': 'Se nuvaerende trin, belastning og hurtige handlinger for hver medarbejder samlet i en kompakt oversigt.',
    'wall.headerEyebrow': 'Fuldskaerms overblik',
    'wall.headerTitle': 'Alle opgaver pa en vaeg',
    'wall.searchPlaceholder': 'Sog efter titel, ansvarlig, deltager eller status',
    'wall.searchAria': 'Sog i opgavevaeggen',
    'wall.filtersAria': 'Filtrer opgaver pa vaeggen',
    'wall.filterAll': 'Alle',
    'wall.filterActive': 'Aktive',
    'wall.filterPaused': 'Pa pause',
    'wall.filterDeadline': 'Har deadline',
    'wall.filterCompleted': 'Faerdige',
    'wall.metricDueSoon': 'Snart deadline',
    'wall.metricOverdue': 'Forsinkede',
    'wall.metricPaused': 'Pa pause',
    'wall.metricShared': 'Delte opgaver',
    'wall.columnFocus': 'Klar til start',
    'wall.columnFocusActive': 'I bevagelse',
    'wall.columnFocusPaused': 'Pa pause',
    'wall.columnFocusCompleted': 'Faerdiggjort',
    'wall.emptyColumn': 'Ingen opgaver i denne kolonne.',
    'wall.subtasksProgress': '{completed}/{total} underopgaver',
    'wall.openTask': 'Aben opgave',
    'admin.processesWallEyebrow': 'Live flow',
    'admin.processesWallTitle': 'Opgaver pa tvers af hele teamet',
    'admin.processesWallHelp': 'Hold oje med flaskehalse, deadlines og fordelingen mellem aktive, blokerede og afsluttede opgaver.',
    'list.headerEyebrow': 'Ren oversigt',
    'list.headerTitle': 'Alle opgaver i en liste',
    'list.subtasks': 'Underopgaver',
    'list.empty': 'Ingen opgaver at vise.',
    'admin.chatRequests': 'Foresporgsler fra medarbejdere',
    'admin.openEmployeeWorkspace': 'Aben arbejdsprofil',
    'admin.saveAccountChanges': 'Gem kontoaendringer',
    'admin.passwordSecurityEyebrow': 'Sikkerhed',
    'admin.passwordSecurityTitle': 'Adgang og sikkerhed',
    'admin.passwordSecurityHelp': 'Brug denne side, hvis du skal rette kontaktoplysninger eller udstede en ny adgangskode til medarbejderen.',
    'chat.eyebrow': 'Opgavedialog',
    'chat.title': 'Dialog om opgaven',
    'chat.help': 'Brug dialogen til at bede om flere detaljer, justeringer eller give besked om blokeringer.',
    'chat.requestsEyebrow': 'Opgavedialog',
    'chat.requestsTitle': 'Foresporgsler fra medarbejdere',
    'chat.noRequests': 'Ingen beskeder endnu.',
    'chat.empty': 'Ingen beskeder endnu.',
    'chat.sending': 'Sender...',
    'chat.kindLabel': 'Type',
    'chat.messageLabel': 'Besked',
    'chat.placeholder': 'Skriv en besked om opgaven, behov for rettelser eller ekstra detaljer',
    'chat.send': 'Send besked',
    'chat.saveEdit': 'Gem aendringer',
    'chat.deleteConfirm': 'Er du sikker pa, at du vil slette denne besked?',
    'chat.sendError': 'Beskeden kunne ikke sendes. Prov igen.',
    'chat.updateError': 'Beskeden kunne ikke opdateres. Prov igen.',
    'chat.deleteError': 'Beskeden kunne ikke slettes. Prov igen.',
    'chat.kind.note': 'Note',
    'chat.kind.clarification': 'Afklaring',
    'chat.kind.change_request': 'Aendringsonske',
    'chat.kind.blocker': 'Blokering',
    'messages.messageSent': 'Beskeden blev sendt.',
    'messages.messageUpdated': 'Beskeden blev opdateret.',
    'messages.messageDeleted': 'Beskeden blev slettet.',
});

Object.assign(translations.en, {
    'nav.taskList': 'Task List',
    'nav.taskWall': 'Task Wall',
    'nav.processes': 'Control panel',
    'admin.homeEyebrow': 'Admin essentials',
    'admin.homeTitle': 'What matters right now',
    'admin.processesEyebrow': 'Control panel',
    'admin.processesTitle': 'Team overview',
    'admin.processesLead': 'Get a quick view of capacity, bottlenecks, and conversations so you can prioritize the next actions without jumping between pages.',
    'admin.processesSummaryTitle': 'System snapshot',
    'admin.processesSummaryHelp': 'Use this overview to quickly assess workload, progress, and where the team is losing momentum.',
    'admin.processesTeamTitle': 'Employee workspaces',
    'admin.processesTeamHelp': 'Each card combines current stage, workload, and quick actions for faster follow-up.',
    'wall.headerEyebrow': 'Fullscreen view',
    'wall.headerTitle': 'All tasks on one wall',
    'wall.searchPlaceholder': 'Search by title, owner, participant, or status',
    'wall.searchAria': 'Search the task wall',
    'wall.filtersAria': 'Filter tasks on the wall',
    'wall.filterAll': 'All',
    'wall.filterActive': 'Active',
    'wall.filterPaused': 'On hold',
    'wall.filterDeadline': 'Has deadline',
    'wall.filterCompleted': 'Completed',
    'wall.metricDueSoon': 'Due soon',
    'wall.metricOverdue': 'Overdue',
    'wall.metricPaused': 'On hold',
    'wall.metricShared': 'Shared tasks',
    'wall.columnFocus': 'Ready to start',
    'wall.columnFocusActive': 'In motion',
    'wall.columnFocusPaused': 'On hold',
    'wall.columnFocusCompleted': 'Wrapped up',
    'wall.emptyColumn': 'No tasks in this column.',
    'wall.subtasksProgress': '{completed}/{total} subtasks',
    'wall.openTask': 'Open task',
    'admin.processesWallEyebrow': 'Live flow',
    'admin.processesWallTitle': 'Tasks across the whole team',
    'admin.processesWallHelp': 'Keep an eye on deadlines and the balance between active, on-hold, and completed work.',
    'list.headerEyebrow': 'Clean overview',
    'list.headerTitle': 'All tasks in one list',
    'list.subtasks': 'Subtasks',
    'list.empty': 'No tasks to show.',
    'admin.chatRequests': 'Requests from employees',
    'admin.openEmployeeWorkspace': 'Open work profile',
    'admin.saveAccountChanges': 'Save account changes',
    'admin.passwordSecurityEyebrow': 'Security',
    'admin.passwordSecurityTitle': 'Access and security',
    'admin.passwordSecurityHelp': 'Use this page when you need to update contact details or issue a new password for the employee.',
    'chat.eyebrow': 'Task chat',
    'chat.title': 'Task conversation',
    'chat.help': 'Use the conversation to request more details, corrections, or report blockers.',
    'chat.requestsEyebrow': 'Task chat',
    'chat.requestsTitle': 'Requests from employees',
    'chat.noRequests': 'No messages yet.',
    'chat.empty': 'No messages yet.',
    'chat.sending': 'Sending...',
    'chat.kindLabel': 'Type',
    'chat.messageLabel': 'Message',
    'chat.placeholder': 'Write a message about the task, requested changes, or missing details',
    'chat.send': 'Send message',
    'chat.saveEdit': 'Save changes',
    'chat.deleteConfirm': 'Are you sure you want to delete this message?',
    'chat.sendError': 'The message could not be sent. Please try again.',
    'chat.updateError': 'The message could not be updated. Please try again.',
    'chat.deleteError': 'The message could not be deleted. Please try again.',
    'chat.kind.note': 'Note',
    'chat.kind.clarification': 'Clarification',
    'chat.kind.change_request': 'Change request',
    'chat.kind.blocker': 'Blocker',
    'messages.messageSent': 'The message has been sent.',
    'messages.messageUpdated': 'The message has been updated.',
    'messages.messageDeleted': 'The message has been deleted.',
});

Object.assign(translations.ru, {
    'nav.taskList': '\u0421\u043f\u0438\u0441\u043e\u043a \u0437\u0430\u0434\u0430\u0447',
    'nav.taskWall': '\u0421\u0442\u0435\u043d\u0430 \u0437\u0430\u0434\u0430\u0447',
    'nav.processes': 'Панель управления',
    'admin.homeEyebrow': '\u041a\u043b\u044e\u0447\u0435\u0432\u043e\u0435 \u0434\u043b\u044f \u0430\u0434\u043c\u0438\u043d\u0430',
    'admin.homeTitle': '\u0421\u0430\u043c\u043e\u0435 \u0432\u0430\u0436\u043d\u043e\u0435 \u0441\u0435\u0439\u0447\u0430\u0441',
    'admin.processesEyebrow': 'Панель управления',
    'admin.processesTitle': 'Обзор команды',
    'admin.processesLead': '\u0411\u044b\u0441\u0442\u0440\u044b\u0439 \u043e\u0431\u0437\u043e\u0440 \u043d\u0430\u0433\u0440\u0443\u0437\u043a\u0438, \u0443\u0437\u043a\u0438\u0445 \u043c\u0435\u0441\u0442 \u0438 \u0434\u0438\u0430\u043b\u043e\u0433\u043e\u0432, \u0447\u0442\u043e\u0431\u044b \u043c\u043e\u0436\u043d\u043e \u0431\u044b\u043b\u043e \u0440\u0430\u0441\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f \u0431\u0435\u0437 \u043f\u0435\u0440\u0435\u0445\u043e\u0434\u043e\u0432 \u043c\u0435\u0436\u0434\u0443 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430\u043c\u0438.',
    'admin.processesSummaryTitle': '\u041e\u0431\u0449\u0430\u044f \u043a\u0430\u0440\u0442\u0438\u043d\u0430 \u043f\u043e \u0441\u0438\u0441\u0442\u0435\u043c\u0435',
    'admin.processesSummaryHelp': '\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439 \u044d\u0442\u043e\u0442 \u0431\u043b\u043e\u043a, \u0447\u0442\u043e\u0431\u044b \u0431\u044b\u0441\u0442\u0440\u043e \u043e\u0446\u0435\u043d\u0438\u0442\u044c \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0443, \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441 \u0438 \u043c\u0435\u0441\u0442\u0430, \u0433\u0434\u0435 \u043a\u043e\u043c\u0430\u043d\u0434\u0430 \u0442\u0435\u0440\u044f\u0435\u0442 \u0442\u0435\u043c\u043f.',
    'admin.processesTeamTitle': '\u0420\u0430\u0431\u043e\u0447\u0438\u0435 \u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0441\u0442\u0432\u0430 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u043e\u0432',
    'admin.processesTeamHelp': '\u0412 \u043a\u0430\u0436\u0434\u043e\u0439 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0435 \u0441\u043e\u0431\u0440\u0430\u043d\u044b \u0442\u0435\u043a\u0443\u0449\u0438\u0439 \u044d\u0442\u0430\u043f, \u043d\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0438 \u0431\u044b\u0441\u0442\u0440\u044b\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f \u0434\u043b\u044f \u0443\u0434\u043e\u0431\u043d\u043e\u0433\u043e \u0441\u043e\u043f\u0440\u043e\u0432\u043e\u0436\u0434\u0435\u043d\u0438\u044f.',
    'wall.headerEyebrow': '\u041f\u043e\u043b\u043d\u043e\u044d\u043a\u0440\u0430\u043d\u043d\u044b\u0439 \u043e\u0431\u0437\u043e\u0440',
    'wall.headerTitle': '\u0412\u0441\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u043d\u0430 \u043e\u0434\u043d\u043e\u043c \u044d\u043a\u0440\u0430\u043d\u0435',
    'wall.searchPlaceholder': '\u0418\u0449\u0438 \u043f\u043e \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u044e, \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u043c\u0443, \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0443 \u0438\u043b\u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u0443',
    'wall.searchAria': '\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u0441\u0442\u0435\u043d\u0435 \u0437\u0430\u0434\u0430\u0447',
    'wall.filtersAria': '\u0424\u0438\u043b\u044c\u0442\u0440\u044b \u0441\u0442\u0435\u043d\u044b \u0437\u0430\u0434\u0430\u0447',
    'wall.filterAll': '\u0412\u0441\u0435',
    'wall.filterActive': '\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0435',
    'wall.filterPaused': '\u041d\u0430 \u043f\u0430\u0443\u0437\u0435',
    'wall.filterDeadline': '\u0421 \u0434\u0435\u0434\u043b\u0430\u0439\u043d\u043e\u043c',
    'wall.filterCompleted': '\u0417\u0430\u0432\u0435\u0440\u0448\u0451\u043d\u043d\u044b\u0435',
    'wall.metricDueSoon': '\u0421\u043a\u043e\u0440\u043e \u0434\u0435\u0434\u043b\u0430\u0439\u043d',
    'wall.metricOverdue': '\u041f\u0440\u043e\u0441\u0440\u043e\u0447\u0435\u043d\u044b',
    'wall.metricPaused': '\u041d\u0430 \u043f\u0430\u0443\u0437\u0435',
    'wall.metricShared': '\u041e\u0431\u0449\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438',
    'wall.columnFocus': '\u0413\u043e\u0442\u043e\u0432\u044b \u043a \u0441\u0442\u0430\u0440\u0442\u0443',
    'wall.columnFocusActive': '\u0412 \u0440\u0430\u0431\u043e\u0442\u0435',
    'wall.columnFocusPaused': '\u041d\u0430 \u043f\u0430\u0443\u0437\u0435',
    'wall.columnFocusCompleted': '\u0417\u0430\u043a\u0440\u044b\u0442\u044b',
    'wall.emptyColumn': '\u0412 \u044d\u0442\u043e\u0439 \u043a\u043e\u043b\u043e\u043d\u043a\u0435 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442 \u0437\u0430\u0434\u0430\u0447.',
    'wall.subtasksProgress': '{completed}/{total} \u043f\u043e\u0434\u0437\u0430\u0434\u0430\u0447',
    'wall.openTask': '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0443',
    'admin.processesWallEyebrow': '\u0416\u0438\u0432\u043e\u0439 \u043f\u043e\u0442\u043e\u043a',
    'admin.processesWallTitle': '\u0417\u0430\u0434\u0430\u0447\u0438 \u043f\u043e \u0432\u0441\u0435\u0439 \u043a\u043e\u043c\u0430\u043d\u0434\u0435',
    'admin.processesWallHelp': '\u0421\u043b\u0435\u0434\u0438 \u0437\u0430 \u0434\u0435\u0434\u043b\u0430\u0439\u043d\u0430\u043c\u0438 \u0438 \u0431\u0430\u043b\u0430\u043d\u0441\u043e\u043c \u043c\u0435\u0436\u0434\u0443 \u0430\u043a\u0442\u0438\u0432\u043d\u044b\u043c\u0438, \u043f\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u043d\u044b\u043c\u0438 \u043d\u0430 \u043f\u0430\u0443\u0437\u0443 \u0438 \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043d\u043d\u044b\u043c\u0438 \u0437\u0430\u0434\u0430\u0447\u0430\u043c\u0438.',
    'list.headerEyebrow': '\u0427\u0438\u0441\u0442\u044b\u0439 \u043e\u0431\u0437\u043e\u0440',
    'list.headerTitle': '\u0412\u0441\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u043e\u0434\u043d\u0438\u043c \u0441\u043f\u0438\u0441\u043a\u043e\u043c',
    'list.subtasks': '\u041f\u043e\u0434\u0437\u0430\u0434\u0430\u0447\u0438',
    'list.empty': '\u041d\u0435\u0442 \u0437\u0430\u0434\u0430\u0447 \u0434\u043b\u044f \u043f\u043e\u043a\u0430\u0437\u0430.',
    'admin.chatRequests': '\u0417\u0430\u043f\u0440\u043e\u0441\u044b \u043e\u0442 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u043e\u0432',
    'admin.openEmployeeWorkspace': '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0440\u0430\u0431\u043e\u0447\u0438\u0439 \u043f\u0440\u043e\u0444\u0438\u043b\u044c',
    'admin.saveAccountChanges': '\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430',
    'admin.passwordSecurityEyebrow': '\u0411\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u044c',
    'admin.passwordSecurityTitle': '\u0414\u043e\u0441\u0442\u0443\u043f \u0438 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u044c',
    'admin.passwordSecurityHelp': '\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u044d\u0442\u0443 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443, \u0435\u0441\u043b\u0438 \u043d\u0443\u0436\u043d\u043e \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u0438\u043b\u0438 \u0432\u044b\u0434\u0430\u0442\u044c \u043d\u043e\u0432\u044b\u0439 \u043f\u0430\u0440\u043e\u043b\u044c.',
    'chat.eyebrow': '\u0427\u0430\u0442 \u043f\u043e \u0437\u0430\u0434\u0430\u0447\u0435',
    'chat.title': '\u041e\u0431\u0441\u0443\u0436\u0434\u0435\u043d\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438',
    'chat.help': '\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u0447\u0430\u0442, \u0447\u0442\u043e\u0431\u044b \u043f\u043e\u043f\u0440\u043e\u0441\u0438\u0442\u044c \u0434\u0435\u0442\u0430\u043b\u0438, \u043f\u0440\u0430\u0432\u043a\u0438 \u0438\u043b\u0438 \u0441\u043e\u043e\u0431\u0449\u0438\u0442\u044c \u043e \u0431\u043b\u043e\u043a\u0435\u0440\u0435.',
    'chat.requestsEyebrow': '\u0427\u0430\u0442 \u043f\u043e \u0437\u0430\u0434\u0430\u0447\u0430\u043c',
    'chat.requestsTitle': '\u0417\u0430\u043f\u0440\u043e\u0441\u044b \u043e\u0442 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u043e\u0432',
    'chat.noRequests': '\u041f\u043e\u043a\u0430 \u043d\u0435\u0442 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439.',
    'chat.empty': '\u041f\u043e\u043a\u0430 \u043d\u0435\u0442 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439.',
    'chat.sending': '\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430...',
    'chat.kindLabel': '\u0422\u0438\u043f',
    'chat.messageLabel': '\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435',
    'chat.placeholder': '\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043f\u043e \u0437\u0430\u0434\u0430\u0447\u0435: \u0447\u0442\u043e \u043d\u0443\u0436\u043d\u043e \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c, \u0438\u0441\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0438\u043b\u0438 \u0443\u0442\u043e\u0447\u043d\u0438\u0442\u044c',
    'chat.send': '\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c',
    'chat.saveEdit': '\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f',
    'chat.deleteConfirm': '\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u044d\u0442\u043e \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435?',
    'chat.sendError': '\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.',
    'chat.updateError': '\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.',
    'chat.deleteError': '\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.',
    'chat.kind.note': '\u0417\u0430\u043c\u0435\u0442\u043a\u0430',
    'chat.kind.clarification': '\u0423\u0442\u043e\u0447\u043d\u0435\u043d\u0438\u0435',
    'chat.kind.change_request': '\u0417\u0430\u043f\u0440\u043e\u0441 \u043d\u0430 \u043f\u0440\u0430\u0432\u043a\u0443',
    'chat.kind.blocker': '\u0411\u043b\u043e\u043a\u0435\u0440',
    'messages.messageSent': '\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e.',
    'messages.messageUpdated': '\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u043e.',
    'messages.messageDeleted': '\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0443\u0434\u0430\u043b\u0435\u043d\u043e.',
});

Object.assign(translations.ru, {
    'profile.photoEyebrow': '\u0424\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0438\u043b\u044f',
    'profile.photoTitle': '\u0410\u0432\u0430\u0442\u0430\u0440 \u0438 \u0444\u043e\u0442\u043e',
    'profile.photoHelp': '\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 JPG, PNG \u0438\u043b\u0438 WEBP. \u041a\u0440\u0443\u043f\u043d\u044b\u0435 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f \u043e\u043f\u0442\u0438\u043c\u0438\u0437\u0438\u0440\u0443\u044e\u0442\u0441\u044f \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435 \u043f\u0435\u0440\u0435\u0434 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u043e\u0439.',
    'profile.uploadPhoto': '\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0444\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0438\u043b\u044f',
    'profile.photoFormats': '\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044e\u0442\u0441\u044f JPG, PNG \u0438 WEBP. \u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0437\u043c\u0435\u0440 \u0444\u0430\u0439\u043b\u0430 4 \u041c\u0411.',
    'profile.addPhoto': '\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0444\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0438\u043b\u044f',
    'profile.changePhoto': '\u0421\u043c\u0435\u043d\u0438\u0442\u044c \u0444\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0438\u043b\u044f',
    'profile.deletePhoto': '\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0444\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0438\u043b\u044f',
    'profile.removePhoto': '\u0423\u0431\u0440\u0430\u0442\u044c \u0444\u043e\u0442\u043e',
    'admin.managePhoto': '\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0444\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0438\u043b\u044f',
    'messages.profilePhotoUpdated': '\u0424\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0438\u043b\u044f \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u043e.',
    'messages.profilePhotoDeleted': '\u0424\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0438\u043b\u044f \u0443\u0434\u0430\u043b\u0435\u043d\u043e.',
    'errors.noProfilePhoto': '\u041d\u0435\u0442 \u0444\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0438\u043b\u044f \u0434\u043b\u044f \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u044f.',
});

const appState = {
    boardFilter: 'all',
    boardQuery: '',
    priorityFilter: 'all',
    taskListView: 'list',
    calendarMonthOffset: 0,
    selectedTaskIds: new Set(),
    boardPollId: null,
    taskPollId: null,
    boardRequestController: null,
    taskRequestController: null,
    isBoardRefreshing: false,
    isTaskRefreshing: false,
    revealObserver: null,
    observedRevealNodes: new WeakSet(),
    lastBoardPayload: '',
    lastBoardData: null,
    lastTaskPayload: '',
    lastTaskData: null,
    taskMessages: [],
    serverTaskMessages: [],
    pendingTaskMessages: [],
    taskMessagesPinnedToBottom: true,
    activePanel: null,
    panelFocusReturn: null,
    toastCounter: 0,
    draftSaveTimers: new Map(),
    activeDraggedTaskId: '',
};

const animationController = {
    isEnabled() {
        return document.documentElement.dataset.motion !== 'off';
    },

    observeReveal(container = document) {
        const revealNodes = container.querySelectorAll('[data-reveal]');
        if (!revealNodes.length) {
            return;
        }

        if (!this.isEnabled()) {
            revealNodes.forEach((node) => node.classList.add('is-visible'));
            return;
        }

        if (!('IntersectionObserver' in window)) {
            revealNodes.forEach((node) => node.classList.add('is-visible'));
            return;
        }

        if (!appState.revealObserver) {
            appState.revealObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        appState.revealObserver?.unobserve(entry.target);
                        appState.observedRevealNodes.delete(entry.target);
                    }
                });
            }, { threshold: 0.15 });
        }

        revealNodes.forEach((node, index) => {
            node.style.setProperty('--reveal-delay', `${Math.min(index * 60, 260)}ms`);
            if (!node.classList.contains('is-visible') && !appState.observedRevealNodes.has(node)) {
                appState.observedRevealNodes.add(node);
                appState.revealObserver.observe(node);
            }
        });
    },

    animateRefresh(node) {
        if (!node || !this.isEnabled()) {
            return;
        }

        node.classList.remove('is-refreshing');
        window.requestAnimationFrame(() => {
            node.classList.add('is-refreshing');
            window.setTimeout(() => node.classList.remove('is-refreshing'), 420);
        });
    },

    animateInserted(container) {
        if (!container) {
            return;
        }

        const targets = container.querySelectorAll('.anim-enter');
        if (!targets.length) {
            return;
        }

        if (!this.isEnabled()) {
            targets.forEach((node) => {
                node.classList.remove('anim-enter');
                node.classList.add('is-ready');
            });
            return;
        }

        window.requestAnimationFrame(() => {
            targets.forEach((node, index) => {
                node.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
                node.classList.add('is-ready');
            });
        });
    },
};

function showToast(message, options = {}) {
    const { type = 'info', translate = true, duration = 3400 } = options;
    const viewport = document.querySelector('[data-toast-viewport]');
    if (!viewport || !message) {
        return;
    }

    const content = translate ? t(message) : String(message);
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.dataset.toastId = String(++appState.toastCounter);
    toast.innerHTML = `
        <div class="toast__body">${escapeHtml(content)}</div>
        <button type="button" class="toast__close" data-toast-close aria-label="${escapeHtml(t('common.close'))}">&times;</button>
    `;

    const removeToast = () => {
        toast.classList.add('is-leaving');
        window.setTimeout(() => toast.remove(), 220);
    };

    toast.querySelector('[data-toast-close]')?.addEventListener('click', removeToast);
    viewport.appendChild(toast);
    window.requestAnimationFrame(() => toast.classList.add('is-visible'));
    window.setTimeout(removeToast, duration);
}

function setupFlashToasts() {
    document.querySelectorAll('.flash-stack').forEach((stack) => {
        stack.querySelectorAll('.flash').forEach((flash) => {
            const text = flash.textContent?.trim();
            if (!text) {
                return;
            }
            const type = flash.className.includes('error') ? 'error' : flash.className.includes('success') ? 'success' : 'info';
            showToast(text, { translate: false, type, duration: 4200 });
        });
        stack.remove();
    });
}

function setLoadingState(nodes, isLoading) {
    (Array.isArray(nodes) ? nodes : [nodes]).forEach((node) => {
        if (!node) {
            return;
        }
        node.classList.toggle('is-loading', Boolean(isLoading));
        node.setAttribute('aria-busy', String(Boolean(isLoading)));
    });
}

function getDraftStorageKey(form) {
    const scope = form.dataset.draftScope || form.getAttribute('action') || window.location.pathname;
    return `taskmaster-draft:${scope}`;
}

function readDraftFormState(form) {
    const payload = {};
    Array.from(form.elements).forEach((field) => {
        if (!field.name || field.disabled || ['hidden', 'submit', 'button', 'file'].includes(field.type)) {
            return;
        }

        if (field instanceof HTMLSelectElement && field.multiple) {
            payload[field.name] = Array.from(field.selectedOptions).map((option) => option.value);
            return;
        }

        if (field.type === 'checkbox' || field.type === 'radio') {
            payload[field.name] = field.checked;
            return;
        }

        payload[field.name] = field.value;
    });
    return payload;
}

function applyDraftFormState(form, payload) {
    let restored = false;
    Array.from(form.elements).forEach((field) => {
        if (!field.name || !(field.name in payload)) {
            return;
        }

        const nextValue = payload[field.name];
        if (field instanceof HTMLSelectElement && field.multiple && Array.isArray(nextValue)) {
            Array.from(field.options).forEach((option) => {
                option.selected = nextValue.includes(option.value);
            });
            restored = true;
            return;
        }

        if (field.type === 'checkbox' || field.type === 'radio') {
            if (!field.checked && Boolean(nextValue)) {
                field.checked = true;
                restored = true;
            }
            return;
        }

        if (!field.value && typeof nextValue === 'string') {
            field.value = nextValue;
            restored = true;
        }
    });
    return restored;
}

function clearDraftForm(form) {
    try {
        localStorage.removeItem(getDraftStorageKey(form));
    } catch (error) {
        // Ignore unavailable storage.
    }
}

function queueDraftSave(form) {
    const key = getDraftStorageKey(form);
    window.clearTimeout(appState.draftSaveTimers.get(key));
    const timerId = window.setTimeout(() => {
        try {
            localStorage.setItem(key, JSON.stringify(readDraftFormState(form)));
        } catch (error) {
            // Ignore unavailable storage.
        }
    }, 180);
    appState.draftSaveTimers.set(key, timerId);
}

function setupDraftForms() {
    document.querySelectorAll('[data-draft-form]').forEach((form) => {
        if (form.dataset.draftBound === 'true') {
            return;
        }
        form.dataset.draftBound = 'true';
        const clearOnSubmit = form.dataset.draftSubmitMode !== 'manual';

        try {
            const storedValue = localStorage.getItem(getDraftStorageKey(form));
            if (storedValue) {
                const payload = JSON.parse(storedValue);
                if (payload && applyDraftFormState(form, payload)) {
                    showToast('messages.draftRestored', { type: 'info' });
                }
            }
        } catch (error) {
            // Ignore unavailable storage.
        }

        form.addEventListener('input', () => queueDraftSave(form));
        form.addEventListener('change', () => queueDraftSave(form));
        if (clearOnSubmit) {
            form.addEventListener('submit', () => clearDraftForm(form));
        }
    });
}

function getSetting(name) {
    const config = APP_SETTINGS[name];
    try {
        const value = localStorage.getItem(config.storageKey) || config.defaultValue;
        if (name === 'language') {
            return SUPPORTED_LANGUAGES.has(value) ? value : config.defaultValue;
        }
        return value;
    } catch (error) {
        return config.defaultValue;
    }
}

function setSetting(name, value) {
    const config = APP_SETTINGS[name];
    try {
        localStorage.setItem(config.storageKey, value);
    } catch (error) {
        // Ignore storage failures so the UI remains usable in private/restricted contexts.
    }
}

function t(key, vars = {}) {
    const language = document.documentElement.dataset.language || 'da';
    const dictionary = translations[language] || translations.da;
    const phrase = dictionary[key] || translations.en[key] || translations.da[key] || key;
    return phrase.replace(/\{(\w+)\}/g, (_, token) => vars[token] ?? `{${token}}`);
}

function dataSuffixToToken(value) {
    return value ? `${value.charAt(0).toLowerCase()}${value.slice(1)}` : '';
}

function collectI18nVars(node) {
    const vars = {};

    Object.entries(node?.dataset || {}).forEach(([key, value]) => {
        if (key.startsWith('i18nVarKey')) {
            const token = dataSuffixToToken(key.replace('i18nVarKey', ''));
            if (token && value) {
                vars[token] = t(value);
            }
        } else if (key.startsWith('i18nVar')) {
            const token = dataSuffixToToken(key.replace('i18nVar', ''));
            if (token) {
                vars[token] = value;
            }
        }
    });

    return vars;
}

function translateWithVars(key, vars = {}, varKeys = {}) {
    const resolvedVars = { ...vars };
    Object.entries(varKeys || {}).forEach(([name, valueKey]) => {
        if (valueKey) {
            resolvedVars[name] = t(valueKey);
        }
    });
    return t(key, resolvedVars);
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function renderAvatarMarkup(entity, options = {}) {
    const {
        sizeClass = 'avatar--small',
        label = entity?.name || entity?.author_name || entity?.employee_name || entity?.username || '',
        className = '',
    } = options;
    const extraClasses = [sizeClass, className].filter(Boolean).join(' ');

    if (entity?.avatar_url) {
        return `<img src="${escapeHtml(entity.avatar_url)}" alt="${escapeHtml(label)}" class="avatar ${extraClasses}" loading="lazy" decoding="async">`;
    }

    return `<span class="avatar avatar--fallback ${extraClasses}" role="img" aria-label="${escapeHtml(label)}">${escapeHtml(entity?.avatar_initials || '?')}</span>`;
}

function replaceFileExtension(fileName, nextExtension) {
    const safeName = (fileName || 'avatar').replace(/\.[^./\\]+$/, '');
    return `${safeName}${nextExtension}`;
}

function canvasToBlob(canvas, type, quality) {
    return new Promise((resolve) => {
        canvas.toBlob(resolve, type, quality);
    });
}

function loadImageElement(file) {
    const objectUrl = URL.createObjectURL(file);
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve({ image, objectUrl });
        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('image-load-failed'));
        };
        image.src = objectUrl;
    });
}

async function optimizeAvatarFile(file) {
    if (!(file instanceof File) || !file.type.startsWith('image/')) {
        return file;
    }

    const { image, objectUrl } = await loadImageElement(file);
    try {
        const maxDimension = Math.max(image.naturalWidth || 0, image.naturalHeight || 0);
        const shouldResize = maxDimension > 960;
        const shouldCompress = file.size > 1_250_000 || shouldResize || file.type !== 'image/webp';
        if (!shouldCompress) {
            return file;
        }

        const scale = shouldResize ? 960 / maxDimension : 1;
        const targetWidth = Math.max(1, Math.round((image.naturalWidth || 1) * scale));
        const targetHeight = Math.max(1, Math.round((image.naturalHeight || 1) * scale));
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const context = canvas.getContext('2d');
        if (!context) {
            return file;
        }

        context.drawImage(image, 0, 0, targetWidth, targetHeight);
        const optimizedBlob = await canvasToBlob(canvas, 'image/webp', 0.86);
        if (!optimizedBlob || optimizedBlob.size >= file.size) {
            return file;
        }

        return new File([optimizedBlob], replaceFileExtension(file.name, '.webp'), {
            type: 'image/webp',
            lastModified: Date.now(),
        });
    } finally {
        URL.revokeObjectURL(objectUrl);
    }
}

function animateProgressBar(element, targetPercent) {
    if (!element) {
        return;
    }

    const safeTarget = Math.max(0, Math.min(100, Number(targetPercent) || 0));
    const applyScale = (value) => {
        element.style.setProperty('--progress', String(value));
    };

    if (document.documentElement.dataset.motion === 'off') {
        applyScale(safeTarget);
        return;
    }

    const startPercent = parseFloat(element.style.getPropertyValue('--progress') || '0') || 0;
    const startTime = performance.now();
    const duration = 520;

    if (element._progressAnimationFrame) {
        cancelAnimationFrame(element._progressAnimationFrame);
    }

    const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);

    const step = (currentTime) => {
        const elapsed = Math.min((currentTime - startTime) / duration, 1);
        const progress = startPercent + (safeTarget - startPercent) * easeOutCubic(elapsed);
        applyScale(progress);

        if (elapsed < 1) {
            element._progressAnimationFrame = requestAnimationFrame(step);
        }
    };

    element._progressAnimationFrame = requestAnimationFrame(step);
}

Object.assign(translations.da, {
    'account.deleteEyebrow': 'Farezone',
    'profile.deleteAccountTitle': 'Slet din konto',
    'profile.deleteAccountHelp': 'Slet din egen konto og log ud af arbejdsomradet.',
    'profile.deleteAccountNote': 'Dine opgaver bliver i systemet, men kontoen og adgangen bliver fjernet permanent.',
    'profile.deleteAccountAction': 'Slet min konto',
    'profile.deleteAccountConfirm': 'Er du sikker pa, at du vil slette din konto?',
    'profile.deleteAccountLocked': 'Ejeren af systemet kan ikke slette sin egen konto.',
    'admin.deleteAccountTitle': 'Slet konto',
    'admin.deleteEmployeeAccountHelp': 'Fjern denne medarbejderkonto fra systemet. Opgaver bliver bevaret, men kontoen og adgangen slettes permanent.',
    'admin.deleteAdminAccountHelp': 'Fjern denne administrator fra systemet. Arbejdsdata bliver bevaret, men kontoen og administratoradgangen slettes permanent.',
    'admin.deleteAccountNote': 'Denne handling kan ikke fortrydes.',
    'admin.deleteAccountAction': 'Slet konto',
    'admin.deleteAccountConfirm': 'Er du sikker pa, at du vil slette denne konto?',
    'messages.accountDeleted': 'Din konto blev slettet.',
    'messages.employeeAccountDeleted': 'Kontoen blev slettet.',
    'errors.siteOwnerDeleteBlocked': 'Ejeren af systemet kan ikke slette sin egen konto.',
});

Object.assign(translations.en, {
    'account.deleteEyebrow': 'Danger zone',
    'profile.deleteAccountTitle': 'Delete your account',
    'profile.deleteAccountHelp': 'Delete your own account and sign out of the workspace.',
    'profile.deleteAccountNote': 'Your tasks stay in the system, but the account and access are removed permanently.',
    'profile.deleteAccountAction': 'Delete my account',
    'profile.deleteAccountConfirm': 'Are you sure you want to delete your account?',
    'profile.deleteAccountLocked': 'The site owner cannot delete their own account.',
    'admin.deleteAccountTitle': 'Delete account',
    'admin.deleteEmployeeAccountHelp': 'Remove this employee account from the system. Tasks stay available, but the account and access are deleted permanently.',
    'admin.deleteAdminAccountHelp': 'Remove this administrator from the system. Workspace data stays available, but the account and admin access are deleted permanently.',
    'admin.deleteAccountNote': 'This action cannot be undone.',
    'admin.deleteAccountAction': 'Delete account',
    'admin.deleteAccountConfirm': 'Are you sure you want to delete this account?',
    'messages.accountDeleted': 'Your account has been deleted.',
    'messages.employeeAccountDeleted': 'The account has been deleted.',
    'errors.siteOwnerDeleteBlocked': 'The site owner cannot delete their own account.',
});

Object.assign(translations.ru, {
    'account.deleteEyebrow': 'Опасная зона',
    'profile.deleteAccountTitle': 'Удалить аккаунт',
    'profile.deleteAccountHelp': 'Удалите свой аккаунт и выйдите из рабочего пространства.',
    'profile.deleteAccountNote': 'Задачи останутся в системе, но аккаунт и доступ будут удалены навсегда.',
    'profile.deleteAccountAction': 'Удалить мой аккаунт',
    'profile.deleteAccountConfirm': 'Вы уверены, что хотите удалить свой аккаунт?',
    'profile.deleteAccountLocked': 'Владелец системы не может удалить свой собственный аккаунт.',
    'admin.deleteAccountTitle': 'Удалить аккаунт',
    'admin.deleteEmployeeAccountHelp': 'Удалить аккаунт сотрудника из системы. Задачи сохранятся, но аккаунт и доступ будут удалены навсегда.',
    'admin.deleteAdminAccountHelp': 'Удалить этого администратора из системы. Рабочие данные сохранятся, но аккаунт и админ-доступ будут удалены навсегда.',
    'admin.deleteAccountNote': 'Это действие нельзя отменить.',
    'admin.deleteAccountAction': 'Удалить аккаунт',
    'admin.deleteAccountConfirm': 'Вы уверены, что хотите удалить этот аккаунт?',
    'messages.accountDeleted': 'Ваш аккаунт удалён.',
    'messages.employeeAccountDeleted': 'Аккаунт удалён.',
    'errors.siteOwnerDeleteBlocked': 'Владелец системы не может удалить свой собственный аккаунт.',
});

Object.assign(translations.da, {
    'account.deletePasswordHelp': 'Indtast din nuvaerende adgangskode for at bekraefte sletningen.',
    'admin.deleteAccountNoPasswordHelp': 'Som administrator kan du slette denne konto direkte uden at indtaste din adgangskode.',
});

Object.assign(translations.en, {
    'account.deletePasswordHelp': 'Enter your current password to confirm the deletion.',
    'admin.deleteAccountNoPasswordHelp': 'As an administrator, you can delete this account directly without entering your password.',
});

Object.assign(translations.ru, {
    'account.deletePasswordHelp': '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043a\u0443\u0449\u0438\u0439 \u043f\u0430\u0440\u043e\u043b\u044c, \u0447\u0442\u043e\u0431\u044b \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0435.',
    'admin.deleteAccountNoPasswordHelp': '\u041a\u0430\u043a \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440 \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u044d\u0442\u043e\u0442 \u0430\u043a\u043a\u0430\u0443\u043d\u0442 \u043d\u0430\u043f\u0440\u044f\u043c\u0443\u044e \u0431\u0435\u0437 \u0432\u0432\u043e\u0434\u0430 \u043f\u0430\u0440\u043e\u043b\u044f.',
});

Object.assign(translations.da, {
    'errors.requiredField': 'Dette felt er paakraevet.',
    'errors.photoRequired': 'Vaelg et billede at uploade.',
    'errors.photoTooLarge': 'Profilbilledet ma maksimalt fylde 4 MB.',
    'errors.photoInvalidType': 'Profilbilledet skal vaere en JPG, PNG eller WEBP fil.',
    'errors.photoMimeMismatch': 'Filtypen matcher ikke billedets indhold.',
    'form.subtaskTitleAria': 'Underopgavens titel',
    'form.subtaskDeadlineAria': 'Underopgavens deadline',
});

Object.assign(translations.en, {
    'errors.requiredField': 'This field is required.',
    'errors.photoRequired': 'Choose an image to upload.',
    'errors.photoTooLarge': 'The profile photo must be 4 MB or smaller.',
    'errors.photoInvalidType': 'The profile photo must be a JPG, PNG, or WEBP file.',
    'errors.photoMimeMismatch': 'The file type does not match the image content.',
    'form.subtaskTitleAria': 'Subtask title',
    'form.subtaskDeadlineAria': 'Subtask deadline',
});

Object.assign(translations.ru, {
    'errors.requiredField': '\u042d\u0442\u043e \u043f\u043e\u043b\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e.',
    'errors.photoRequired': '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u0434\u043b\u044f \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438.',
    'errors.photoTooLarge': '\u0424\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0438\u043b\u044f \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u043d\u0435 \u0431\u043e\u043b\u0435\u0435 4 MB.',
    'errors.photoInvalidType': '\u0424\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0438\u043b\u044f \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u0444\u0430\u0439\u043b\u043e\u043c JPG, PNG \u0438\u043b\u0438 WEBP.',
    'errors.photoMimeMismatch': '\u0422\u0438\u043f \u0444\u0430\u0439\u043b\u0430 \u043d\u0435 \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u0435\u0442 \u0441 \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u043c\u044b\u043c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f.',
    'form.subtaskTitleAria': '\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u043e\u0434\u0437\u0430\u0434\u0430\u0447\u0438',
    'form.subtaskDeadlineAria': '\u0414\u0435\u0434\u043b\u0430\u0439\u043d \u043f\u043e\u0434\u0437\u0430\u0434\u0430\u0447\u0438',
});

function repairMojibakeValue(value) {
    if (typeof value !== 'string' || !/[ÐÑ]/.test(value)) {
        return value;
    }

    try {
        const bytes = Uint8Array.from(Array.from(value, (character) => character.charCodeAt(0) & 0xff));
        return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    } catch (error) {
        return value;
    }
}

function repairMojibakeDictionary(dictionary) {
    Object.keys(dictionary).forEach((key) => {
        dictionary[key] = repairMojibakeValue(dictionary[key]);
    });
    return dictionary;
}

function applyPhraseReplacements(value, replacements) {
    return replacements.reduce((text, [needle, replacement]) => text.replaceAll(needle, replacement), value);
}

function buildDerivedTranslations(baseDictionary, replacements, overrides = {}) {
    const derivedDictionary = {};

    Object.entries(baseDictionary).forEach(([key, value]) => {
        derivedDictionary[key] = typeof value === 'string'
            ? applyPhraseReplacements(value, replacements)
            : value;
    });

    return {
        ...derivedDictionary,
        ...overrides,
    };
}

repairMojibakeDictionary(translations.ru);

// Keep derived locales in sync with the base dictionaries while still allowing targeted overrides.
const NORWEGIAN_REPLACEMENTS = [
    ['Workflow hub', 'Arbeidsflyt'],
    ['Quick settings', 'Hurtiginnstillinger'],
    ['Primaer navigation', 'Hovednavigasjon'],
    ['Indstillinger', 'Innstillinger'],
    ['Sprog', 'Sprak'],
    ['Vaelg', 'Velg'],
    ['Skift', 'Bytt'],
    ['Aben', 'Apne'],
    ['Opgaveliste', 'Oppgaveliste'],
    ['Opgavevaeg', 'Oppgavevegg'],
    ['Opgaver', 'Oppgaver'],
    ['opgaver', 'oppgaver'],
    ['Opgave', 'Oppgave'],
    ['opgave', 'oppgave'],
    ['Medarbejdere', 'Ansatte'],
    ['medarbejdere', 'ansatte'],
    ['Medarbejder', 'Ansatt'],
    ['medarbejder', 'ansatt'],
    ['adgangskode', 'passord'],
    ['Adgangskode', 'Passord'],
    ['brugernavn', 'brukernavn'],
    ['Brugernavn', 'Brukernavn'],
    ['Profilbillede', 'Profilbilde'],
    ['profilbillede', 'profilbilde'],
    ['Besked', 'Melding'],
    ['besked', 'melding'],
    ['Tilbage', 'Tilbake'],
    ['Annuller', 'Avbryt'],
    ['Luk', 'Lukk'],
    ['Faerdige', 'Ferdige'],
    ['faerdige', 'ferdige'],
    ['fuldfort', 'fullfort'],
];

const UKRAINIAN_REPLACEMENTS = [
    ['Главная', 'Головна'],
    ['Сотрудники', 'Співробітники'],
    ['сотрудники', 'співробітники'],
    ['Сотрудник', 'Співробітник'],
    ['сотрудник', 'співробітник'],
    ['Задачи', 'Завдання'],
    ['задачи', 'завдання'],
    ['Задача', 'Завдання'],
    ['задачу', 'завдання'],
    ['задач', 'завдань'],
    ['Профиль', 'Профіль'],
    ['профиль', 'профіль'],
    ['Аккаунт', 'Акаунт'],
    ['аккаунт', 'акаунт'],
    ['Удалить', 'Видалити'],
    ['удалить', 'видалити'],
    ['Создать', 'Створити'],
    ['создать', 'створити'],
    ['Обновить', 'Оновити'],
    ['обновить', 'оновити'],
    ['Открыть', 'Відкрити'],
    ['открыть', 'відкрити'],
    ['Сообщение', 'Повідомлення'],
    ['сообщение', 'повідомлення'],
    ['Настройки', 'Налаштування'],
    ['настройки', 'налаштування'],
];

translations.no = buildDerivedTranslations(translations.da, NORWEGIAN_REPLACEMENTS, {
    'settings.language': 'Sprak',
    'settings.languageHelp': 'Bytt sprak uten a laste siden pa nytt.',
    'settings.languagePicker': 'Velg sprak',
    'nav.openMenu': 'Apne meny',
    'nav.processes': 'Kontrollpanel',
    'board.headerTitle': 'Dagens oppgaver',
    'board.createTask': 'Opprett ny oppgave',
    'board.searchPlaceholder': 'Sok etter tittel, beskrivelse eller ansvarlig',
    'board.searchAria': 'Sok i oppgaver',
    'board.filtersAria': 'Filtrer oppgaver',
    'admin.searchEmployees': 'Sok etter ansatte',
    'admin.searchEmployeesAria': 'Sok etter ansatte',
    'admin.processesEyebrow': 'Kontrollpanel',
    'admin.processesTitle': 'Teamoversikt',
    'admin.openEmployeeWorkspace': 'Apne arbeidsprofil',
    'chat.requestsTitle': 'Foresporsler fra ansatte',
    'profile.photoEyebrow': 'Profilbilde',
    'profile.photoTitle': 'Avatar og bilde',
    'profile.uploadPhoto': 'Last opp profilbilde',
    'profile.addPhoto': 'Legg til profilbilde',
    'profile.changePhoto': 'Bytt profilbilde',
    'profile.deletePhoto': 'Slett profilbilde',
    'profile.removePhoto': 'Fjern bilde',
    'messages.accountDeleted': 'Kontoen din ble slettet.',
    'messages.employeeAccountDeleted': 'Kontoen ble slettet.',
    'messages.messageSent': 'Meldingen ble sendt.',
    'messages.messageUpdated': 'Meldingen ble oppdatert.',
    'messages.messageDeleted': 'Meldingen ble slettet.',
    'errors.requiredField': 'Dette feltet er obligatorisk.',
    'errors.currentPasswordInvalid': 'Det naavaerende passordet ble skrevet inn feil.',
    'errors.photoRequired': 'Velg et bilde a laste opp.',
    'errors.photoTooLarge': 'Profilbildet ma vaere pa maks 4 MB.',
    'errors.photoInvalidType': 'Profilbildet ma vaere en JPG-, PNG- eller WEBP-fil.',
    'errors.photoMimeMismatch': 'Filtypen stemmer ikke med bildeinnholdet.',
    'form.subtaskTitleAria': 'Tittel pa underoppgave',
    'form.subtaskDeadlineAria': 'Frist for underoppgave',
    'account.deleteEyebrow': 'Faresone',
    'account.deletePasswordHelp': 'Skriv inn ditt naavaerende passord for a bekrefte slettingen.',
    'admin.deleteAccountNoPasswordHelp': 'Som administrator kan du slette denne kontoen direkte uten a skrive inn passordet ditt.',
    'profile.deleteAccountTitle': 'Slett kontoen din',
    'profile.deleteAccountAction': 'Slett min konto',
    'admin.deleteAccountTitle': 'Slett konto',
    'admin.deleteAccountAction': 'Slett konto',
});

translations.uk = buildDerivedTranslations(translations.ru, UKRAINIAN_REPLACEMENTS, {
    'settings.language': '\u041c\u043e\u0432\u0430',
    'settings.languageHelp': '\u0417\u043c\u0456\u043d\u044e\u0439\u0442\u0435 \u043c\u043e\u0432\u0443 \u0431\u0435\u0437 \u043f\u0435\u0440\u0435\u0437\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0435\u043d\u043d\u044f \u0441\u0442\u043e\u0440\u0456\u043d\u043a\u0438.',
    'settings.languagePicker': '\u041e\u0431\u0435\u0440\u0456\u0442\u044c \u043c\u043e\u0432\u0443',
    'nav.processes': 'Панель керування',
    'board.headerTitle': '\u0417\u0430\u0432\u0434\u0430\u043d\u043d\u044f \u043d\u0430 \u0441\u044c\u043e\u0433\u043e\u0434\u043d\u0456',
    'board.searchPlaceholder': '\u041f\u043e\u0448\u0443\u043a \u0437\u0430 \u043d\u0430\u0437\u0432\u043e\u044e, \u043e\u043f\u0438\u0441\u043e\u043c \u0430\u0431\u043e \u0432\u0456\u0434\u043f\u043e\u0432\u0456\u0434\u0430\u043b\u044c\u043d\u0438\u043c',
    'board.searchAria': '\u041f\u043e\u0448\u0443\u043a \u0437\u0430\u0432\u0434\u0430\u043d\u044c',
    'board.filtersAria': '\u0424\u0456\u043b\u044c\u0442\u0440\u0430\u0446\u0456\u044f \u0437\u0430\u0432\u0434\u0430\u043d\u044c',
    'admin.searchEmployees': '\u041f\u043e\u0448\u0443\u043a \u0441\u043f\u0456\u0432\u0440\u043e\u0431\u0456\u0442\u043d\u0438\u043a\u0456\u0432',
    'admin.searchEmployeesAria': '\u041f\u043e\u0448\u0443\u043a \u0441\u043f\u0456\u0432\u0440\u043e\u0431\u0456\u0442\u043d\u0438\u043a\u0456\u0432',
    'admin.processesEyebrow': 'Панель керування',
    'admin.processesTitle': 'Огляд команди',
    'admin.openEmployeeWorkspace': '\u0412\u0456\u0434\u043a\u0440\u0438\u0442\u0438 \u0440\u043e\u0431\u043e\u0447\u0438\u0439 \u043f\u0440\u043e\u0444\u0456\u043b\u044c',
    'chat.requestsTitle': '\u0417\u0430\u043f\u0438\u0442\u0438 \u0432\u0456\u0434 \u0441\u043f\u0456\u0432\u0440\u043e\u0431\u0456\u0442\u043d\u0438\u043a\u0456\u0432',
    'profile.photoEyebrow': '\u0424\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0456\u043b\u044e',
    'profile.photoTitle': '\u0410\u0432\u0430\u0442\u0430\u0440 \u0456 \u0444\u043e\u0442\u043e',
    'profile.uploadPhoto': '\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0438\u0442\u0438 \u0444\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0456\u043b\u044e',
    'profile.addPhoto': '\u0414\u043e\u0434\u0430\u0442\u0438 \u0444\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0456\u043b\u044e',
    'profile.changePhoto': '\u0417\u043c\u0456\u043d\u0438\u0442\u0438 \u0444\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0456\u043b\u044e',
    'profile.deletePhoto': '\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u0444\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0456\u043b\u044e',
    'profile.removePhoto': '\u041f\u0440\u0438\u0431\u0440\u0430\u0442\u0438 \u0444\u043e\u0442\u043e',
    'messages.accountDeleted': '\u0412\u0430\u0448 \u0430\u043a\u0430\u0443\u043d\u0442 \u0432\u0438\u0434\u0430\u043b\u0435\u043d\u043e.',
    'messages.employeeAccountDeleted': '\u0410\u043a\u0430\u0443\u043d\u0442 \u0432\u0438\u0434\u0430\u043b\u0435\u043d\u043e.',
    'messages.messageSent': '\u041f\u043e\u0432\u0456\u0434\u043e\u043c\u043b\u0435\u043d\u043d\u044f \u043d\u0430\u0434\u0456\u0441\u043b\u0430\u043d\u043e.',
    'messages.messageUpdated': '\u041f\u043e\u0432\u0456\u0434\u043e\u043c\u043b\u0435\u043d\u043d\u044f \u043e\u043d\u043e\u0432\u043b\u0435\u043d\u043e.',
    'messages.messageDeleted': '\u041f\u043e\u0432\u0456\u0434\u043e\u043c\u043b\u0435\u043d\u043d\u044f \u0432\u0438\u0434\u0430\u043b\u0435\u043d\u043e.',
    'errors.requiredField': '\u0426\u0435 \u043f\u043e\u043b\u0435 \u043e\u0431\u043e\u0432\u2019\u044f\u0437\u043a\u043e\u0432\u0435.',
    'errors.currentPasswordInvalid': '\u041f\u043e\u0442\u043e\u0447\u043d\u0438\u0439 \u043f\u0430\u0440\u043e\u043b\u044c \u0432\u0432\u0435\u0434\u0435\u043d\u043e \u043d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e.',
    'errors.photoRequired': '\u041e\u0431\u0435\u0440\u0456\u0442\u044c \u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f \u0434\u043b\u044f \u0437\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0435\u043d\u043d\u044f.',
    'errors.photoTooLarge': '\u0424\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0456\u043b\u044e \u043c\u0430\u0454 \u0431\u0443\u0442\u0438 \u043d\u0435 \u0431\u0456\u043b\u044c\u0448\u0435 4 MB.',
    'errors.photoInvalidType': '\u0424\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0456\u043b\u044e \u043c\u0430\u0454 \u0431\u0443\u0442\u0438 \u0444\u0430\u0439\u043b\u043e\u043c JPG, PNG \u0430\u0431\u043e WEBP.',
    'errors.photoMimeMismatch': '\u0422\u0438\u043f \u0444\u0430\u0439\u043b\u0443 \u043d\u0435 \u0437\u0431\u0456\u0433\u0430\u0454\u0442\u044c\u0441\u044f \u0437 \u0432\u043c\u0456\u0441\u0442\u043e\u043c \u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u043d\u044f.',
    'form.subtaskTitleAria': '\u041d\u0430\u0437\u0432\u0430 \u043f\u0456\u0434\u0437\u0430\u0432\u0434\u0430\u043d\u043d\u044f',
    'form.subtaskDeadlineAria': '\u0414\u0435\u0434\u043b\u0430\u0439\u043d \u043f\u0456\u0434\u0437\u0430\u0432\u0434\u0430\u043d\u043d\u044f',
    'account.deleteEyebrow': '\u041d\u0435\u0431\u0435\u0437\u043f\u0435\u0447\u043d\u0430 \u0437\u043e\u043d\u0430',
    'account.deletePasswordHelp': '\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u0441\u0432\u0456\u0439 \u043f\u043e\u0442\u043e\u0447\u043d\u0438\u0439 \u043f\u0430\u0440\u043e\u043b\u044c, \u0449\u043e\u0431 \u043f\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438 \u0432\u0438\u0434\u0430\u043b\u0435\u043d\u043d\u044f.',
    'admin.deleteAccountNoPasswordHelp': '\u042f\u043a \u0430\u0434\u043c\u0456\u043d\u0456\u0441\u0442\u0440\u0430\u0442\u043e\u0440 \u0432\u0438 \u043c\u043e\u0436\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u0446\u0435\u0439 \u0430\u043a\u0430\u0443\u043d\u0442 \u043d\u0430\u043f\u0440\u044f\u043c\u0443 \u0431\u0435\u0437 \u0432\u0432\u0435\u0434\u0435\u043d\u043d\u044f \u043f\u0430\u0440\u043e\u043b\u044f.',
    'profile.deleteAccountTitle': '\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u0430\u043a\u0430\u0443\u043d\u0442',
    'profile.deleteAccountAction': '\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u043c\u0456\u0439 \u0430\u043a\u0430\u0443\u043d\u0442',
    'admin.deleteAccountTitle': '\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u0430\u043a\u0430\u0443\u043d\u0442',
    'admin.deleteAccountAction': '\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u0430\u043a\u0430\u0443\u043d\u0442',
});

Object.assign(translations.da, {
    'common.open': 'Aben',
    'common.dismiss': 'Luk',
    'form.priority': 'Prioritet',
    'priority.low': 'Lav',
    'priority.medium': 'Medium',
    'priority.high': 'Hoj',
    'task.startNow': 'Start nu',
    'task.pauseNow': 'Saet pa pause',
    'task.markDone': 'Marker faerdig',
    'command.eyebrow': 'Quick actions',
    'command.title': 'Find sider, opgaver og handlinger',
    'command.searchPlaceholder': 'Sog efter opgaver, sider eller personer',
    'command.searchAria': 'Sog efter opgaver, sider eller personer',
    'command.quickLinks': 'Hurtige links',
    'command.tasks': 'Opgaver',
    'command.noResults': 'Ingen resultater matcher din sogning.',
    'command.trigger': 'Sog og genveje',
    'calendar.eyebrow': 'Deadlines',
    'calendar.title': 'Opgavekalender',
    'calendar.previousMonth': 'Forrige',
    'calendar.nextMonth': 'Naeste',
    'calendar.noDeadlinesTitle': 'Ingen deadlines i denne periode',
    'calendar.noDeadlinesText': 'Tilfoj deadlines for at sprede arbejdet over maaneden.',
    'calendar.calendarMode': 'Kalender',
    'calendar.listMode': 'Liste',
    'calendar.modeAria': 'Visningsmode',
    'calendar.more': '+{count} flere',
    'onboarding.eyebrow': 'Quick start',
    'onboarding.title': 'En hurtigere maade at arbejde gennem dagen',
    'onboarding.stepTasks': 'Brug boardet til at holde aktivt arbejde i fokus.',
    'onboarding.stepStatus': 'Opdater opgavestatus direkte fra hvert kort.',
    'onboarding.stepList': 'Aben liste- eller vaegvisning, nar du har brug for mere kontekst.',
    'admin.workloadEyebrow': 'Belastning',
    'admin.workloadTitle': 'Kapacitet og opfolgning',
    'admin.workloadHelp': 'Se hvem der er presset, hvem der har luft, og hvilke opgaver der boer have din opmaerksomhed nu.',
    'admin.workloadOverloaded': 'Hoj belastning',
    'admin.workloadOverloadedTitle': 'Medarbejdere i risikozonen',
    'admin.workloadAvailable': 'Ledig kapacitet',
    'admin.workloadAvailableTitle': 'Kan tage mere arbejde',
    'admin.workloadFocus': 'Fokusopgaver',
    'admin.workloadFocusTitle': 'Prioriteret arbejde nu',
    'admin.workloadNoOverloaded': 'Ingen er overbelastede lige nu.',
    'admin.workloadNoAvailable': 'Alle er optaget lige nu.',
    'board.emptyCtaAdmin': 'Opret en opgave',
    'board.emptyCtaEmployee': 'Aben opgavelisten',
    'messages.taskStarted': 'Opgaven blev sat i gang.',
    'messages.taskPaused': 'Opgaven blev sat pa pause.',
    'messages.taskCompletedNow': 'Opgaven blev markeret som faerdig.',
    'messages.subtaskUpdated': 'Underopgaven blev opdateret.',
    'messages.draftRestored': 'Dit kladdeudkast blev gendannet.',
});

Object.assign(translations.en, {
    'common.open': 'Open',
    'common.dismiss': 'Dismiss',
    'form.priority': 'Priority',
    'priority.low': 'Low',
    'priority.medium': 'Medium',
    'priority.high': 'High',
    'task.startNow': 'Start now',
    'task.pauseNow': 'Put on hold',
    'task.markDone': 'Mark done',
    'command.eyebrow': 'Quick actions',
    'command.title': 'Find pages, tasks, and actions',
    'command.searchPlaceholder': 'Search for tasks, pages, or people',
    'command.searchAria': 'Search for tasks, pages, or people',
    'command.quickLinks': 'Quick links',
    'command.tasks': 'Tasks',
    'command.noResults': 'No matches found.',
    'command.trigger': 'Search & shortcuts',
    'calendar.eyebrow': 'Deadlines',
    'calendar.title': 'Task calendar',
    'calendar.previousMonth': 'Previous',
    'calendar.nextMonth': 'Next',
    'calendar.noDeadlinesTitle': 'No deadlines in this period',
    'calendar.noDeadlinesText': 'Add deadlines to spread work across the month.',
    'calendar.calendarMode': 'Calendar',
    'calendar.listMode': 'List',
    'calendar.modeAria': 'View mode',
    'calendar.more': '+{count} more',
    'onboarding.eyebrow': 'Quick start',
    'onboarding.title': 'A faster way to move through the day',
    'onboarding.stepTasks': 'Use the board to keep active work in focus.',
    'onboarding.stepStatus': 'Update task status directly from each card.',
    'onboarding.stepList': 'Open the list or wall view whenever you need more context.',
    'admin.workloadEyebrow': 'Workload',
    'admin.workloadTitle': 'Capacity and follow-up',
    'admin.workloadHelp': 'See who is overloaded, who has room, and which tasks need attention now.',
    'admin.workloadOverloaded': 'High load',
    'admin.workloadOverloadedTitle': 'Employees at risk',
    'admin.workloadAvailable': 'Available capacity',
    'admin.workloadAvailableTitle': 'Can take more work',
    'admin.workloadFocus': 'Focus tasks',
    'admin.workloadFocusTitle': 'Priority work now',
    'admin.workloadNoOverloaded': 'No one is overloaded right now.',
    'admin.workloadNoAvailable': 'Everyone is currently busy.',
    'board.emptyCtaAdmin': 'Create a task',
    'board.emptyCtaEmployee': 'Open task list',
    'messages.taskStarted': 'The task has started.',
    'messages.taskPaused': 'The task has been put on hold.',
    'messages.taskCompletedNow': 'The task has been marked as done.',
    'messages.subtaskUpdated': 'The subtask has been updated.',
    'messages.draftRestored': 'Your saved draft has been restored.',
});

Object.assign(translations.da, {
    'filters.priorityAll': 'Alle prioriteter',
    'operations.totalEmployeesHelp': 'Aktive brugere i teamet',
    'operations.inProgressHelp': 'Medarbejdere med igangvaerende arbejde',
    'operations.attentionHelp': 'Deadline, blokering eller manglende opgave',
    'operations.teamTitle': 'Team status',
    'operations.openWork': 'Aabent arbejde',
    'operations.attentionTitle': 'Naeste handlinger',
    'operations.searchPlaceholder': 'Sog efter medarbejder, opgave, status eller deadline',
    'operations.searchAria': 'Sog i driftscenteret',
    'operations.clearSearch': 'Ryd',
    'operations.searchSummary': '{employees} medarbejdere · {tasks} opgaver',
    'operations.noEmployeeMatches': 'Ingen medarbejdere matcher sogningen.',
    'attachments.eyebrow': 'Filer',
    'attachments.title': 'Vedhaeftninger',
    'attachments.add': 'Vedhaeft filer',
    'attachments.addToMessage': 'Tilfoj filer',
    'attachments.empty': 'Der er ingen vedhaeftninger pa opgaven endnu.',
    'attachments.deleteConfirm': 'Vil du fjerne denne fil?',
    'attachments.count': '{count} filer',
    'audit.eyebrow': 'Historik',
    'audit.title': 'Seneste aendringer',
    'audit.empty': 'Historikken bliver opbygget, nar opgaven oprettes og opdateres.',
    'templates.eyebrow': 'Skabeloner',
    'templates.appliedBadge': 'Skabelon aktiv',
    'templates.appliedHelp': 'Denne opgave blev forudfyldt fra en skabelon. Du kan stadig tilpasse alle felter, for du gemmer.',
    'templates.saveTitle': 'Gem som skabelon',
    'templates.saveHelp': 'Brug skabeloner til gentagne opgaver, onboarding-forlob og faste operationelle flows.',
    'templates.saveToggle': 'Gem denne opgave som skabelon',
    'templates.name': 'Skabelonnavn',
    'templates.recurrence': 'Gentagelse',
    'templates.deadlineOffset': 'Deadline forskydning (dage)',
    'templates.libraryTitle': 'Skabelonbibliotek',
    'templates.libraryHelp': 'Byg genbrugelige skabeloner til onboarding, reviews og faste driftsopgaver.',
    'templates.daysAfterStart': 'dage',
    'templates.useTemplate': 'Brug skabelon',
    'templates.deleteConfirm': 'Vil du slette denne skabelon?',
    'templates.emptyTitle': 'Ingen skabeloner endnu',
    'templates.emptyText': 'Gem en opgave som skabelon fra opgaveformularen for at genbruge den senere eller gore den tilbagevendende.',
    'analytics.eyebrow': 'Performance',
    'analytics.title': 'Task analytics',
    'analytics.help': 'Hold oje med deadlines, gennemlobstid og hvordan prioriteringerne fordeler sig.',
    'analytics.openTasks': 'Aabne opgaver',
    'analytics.completedTasks': 'Afsluttede opgaver',
    'analytics.overdueTasks': 'Forsinkede opgaver',
    'analytics.dueThisWeek': 'Denne uge',
    'analytics.highPriorityOpen': 'Hoj prioritet',
    'analytics.averageCompletion': 'Gns. lukketid',
    'analytics.daysShort': 'd',
    'analytics.prioritySplit': 'Prioriteter',
    'analytics.recentTrend': '7 dage',
    'analytics.createdShort': 'oprettet',
    'analytics.completedShort': 'lukket',
    'messages.taskUpdated': 'Opgaven blev opdateret.',
    'messages.taskUpdateError': 'Opgaven kunne ikke opdateres. Prov igen.',
});

Object.assign(translations.en, {
    'filters.priorityAll': 'All priorities',
    'operations.totalEmployeesHelp': 'Active users in the team',
    'operations.inProgressHelp': 'Employees with active work',
    'operations.attentionHelp': 'Deadline, blocker, or missing task',
    'operations.teamTitle': 'Team status',
    'operations.openWork': 'Open work',
    'operations.attentionTitle': 'Next actions',
    'operations.searchPlaceholder': 'Search employees, tasks, status, or deadline',
    'operations.searchAria': 'Search the operations center',
    'operations.clearSearch': 'Clear',
    'operations.searchSummary': '{employees} employees · {tasks} tasks',
    'operations.noEmployeeMatches': 'No employees match your search.',
    'attachments.eyebrow': 'Files',
    'attachments.title': 'Attachments',
    'attachments.add': 'Attach files',
    'attachments.addToMessage': 'Add files',
    'attachments.empty': 'There are no attachments on this task yet.',
    'attachments.deleteConfirm': 'Remove this file?',
    'attachments.count': '{count} files',
    'audit.eyebrow': 'History',
    'audit.title': 'Recent changes',
    'audit.empty': 'The history builds up as the task gets created and updated.',
    'templates.eyebrow': 'Templates',
    'templates.appliedBadge': 'Template applied',
    'templates.appliedHelp': 'This task was prefilled from a template. You can still adjust every field before saving.',
    'templates.saveTitle': 'Save as template',
    'templates.saveHelp': 'Use templates for recurring work, onboarding flows, and repeatable operations.',
    'templates.saveToggle': 'Save this task as a template',
    'templates.name': 'Template name',
    'templates.recurrence': 'Recurrence',
    'templates.deadlineOffset': 'Deadline offset (days)',
    'templates.libraryTitle': 'Template library',
    'templates.libraryHelp': 'Build reusable templates for onboarding, reviews, and recurring operations.',
    'templates.daysAfterStart': 'days',
    'templates.useTemplate': 'Use template',
    'templates.deleteConfirm': 'Delete this template?',
    'templates.emptyTitle': 'No templates yet',
    'templates.emptyText': 'Save a task as a template from the task form to reuse it later or make it recurring.',
    'analytics.eyebrow': 'Performance',
    'analytics.title': 'Task analytics',
    'analytics.help': 'Track deadlines, completion time, and how priorities are distributed across the system.',
    'analytics.openTasks': 'Open tasks',
    'analytics.completedTasks': 'Completed tasks',
    'analytics.overdueTasks': 'Overdue tasks',
    'analytics.dueThisWeek': 'Due this week',
    'analytics.highPriorityOpen': 'High priority',
    'analytics.averageCompletion': 'Avg. close time',
    'analytics.daysShort': 'd',
    'analytics.prioritySplit': 'Priorities',
    'analytics.recentTrend': 'Last 7 days',
    'analytics.createdShort': 'created',
    'analytics.completedShort': 'closed',
    'messages.taskUpdated': 'The task has been updated.',
    'messages.taskUpdateError': 'The task could not be updated. Please try again.',
});

Object.assign(translations.no, {
    'filters.priorityAll': 'Alle prioriteter',
    'status.paused': 'Pa pause',
    'task.pausedShort': 'pa pause',
    'task.pauseNow': 'Sett pa pause',
    'messages.taskPaused': 'Oppgaven er satt pa pause.',
    'operations.teamTitle': 'Teamstatus',
    'operations.openWork': 'Apent arbeid',
    'operations.attentionTitle': 'Neste handlinger',
    'operations.searchPlaceholder': 'Sok etter medarbeider, oppgave, status eller frist',
    'operations.searchAria': 'Sok i driftssenteret',
    'operations.clearSearch': 'Tøm',
    'operations.searchSummary': '{employees} medarbeidere · {tasks} oppgaver',
    'operations.noEmployeeMatches': 'Ingen medarbeidere matcher soket.',
    'wall.filterPaused': 'Pa pause',
    'wall.metricPaused': 'Pa pause',
    'wall.columnFocusPaused': 'Pa pause',
    'attachments.title': 'Vedlegg',
    'audit.title': 'Siste endringer',
    'templates.libraryTitle': 'Skabelonbibliotek',
    'analytics.title': 'Oppgaveanalyse',
});

Object.assign(translations.ru, {
    'filters.priorityAll': '\u0412\u0441\u0435 \u043f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442\u044b',
    'status.paused': '\u041d\u0430 \u043f\u0430\u0443\u0437\u0435',
    'task.pausedShort': '\u043d\u0430 \u043f\u0430\u0443\u0437\u0435',
    'operations.teamTitle': '\u0421\u0442\u0430\u0442\u0443\u0441 \u043a\u043e\u043c\u0430\u043d\u0434\u044b',
    'operations.openWork': '\u041e\u0442\u043a\u0440\u044b\u0442\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430',
    'operations.attentionTitle': '\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f',
    'operations.searchPlaceholder': '\u0418\u0449\u0438\u0442\u0435 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0430, \u0437\u0430\u0434\u0430\u0447\u0443, \u0441\u0442\u0430\u0442\u0443\u0441 \u0438\u043b\u0438 \u0434\u0435\u0434\u043b\u0430\u0439\u043d',
    'operations.searchAria': '\u041f\u043e\u0438\u0441\u043a \u0432 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u043e\u043d\u043d\u043e\u043c \u0446\u0435\u043d\u0442\u0440\u0435',
    'operations.clearSearch': '\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c',
    'operations.searchSummary': '{employees} \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u043e\u0432 · {tasks} \u0437\u0430\u0434\u0430\u0447',
    'operations.noEmployeeMatches': '\u041f\u043e \u043f\u043e\u0438\u0441\u043a\u0443 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0438 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u044b.',
    'wall.filterPaused': '\u041d\u0430 \u043f\u0430\u0443\u0437\u0435',
    'wall.metricPaused': '\u041d\u0430 \u043f\u0430\u0443\u0437\u0435',
    'wall.columnFocusPaused': '\u041d\u0430 \u043f\u0430\u0443\u0437\u0435',
    'attachments.title': '\u0412\u043b\u043e\u0436\u0435\u043d\u0438\u044f',
    'audit.title': '\u0418\u0441\u0442\u043e\u0440\u0438\u044f',
    'templates.libraryTitle': '\u0411\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0430 \u0448\u0430\u0431\u043b\u043e\u043d\u043e\u0432',
    'analytics.title': '\u0410\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0430 \u0437\u0430\u0434\u0430\u0447',
});

Object.assign(translations.uk, {
    'filters.priorityAll': '\u0423\u0441\u0456 \u043f\u0440\u0456\u043e\u0440\u0438\u0442\u0435\u0442\u0438',
    'status.paused': '\u041d\u0430 \u043f\u0430\u0443\u0437\u0456',
    'task.pausedShort': '\u043d\u0430 \u043f\u0430\u0443\u0437\u0456',
    'task.pauseNow': '\u041f\u043e\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u043d\u0430 \u043f\u0430\u0443\u0437\u0443',
    'messages.taskPaused': '\u0417\u0430\u0432\u0434\u0430\u043d\u043d\u044f \u043f\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u043e \u043d\u0430 \u043f\u0430\u0443\u0437\u0443.',
    'operations.teamTitle': '\u0421\u0442\u0430\u0442\u0443\u0441 \u043a\u043e\u043c\u0430\u043d\u0434\u0438',
    'operations.openWork': '\u0412\u0456\u0434\u043a\u0440\u0438\u0442\u0430 \u0440\u043e\u0431\u043e\u0442\u0430',
    'operations.attentionTitle': '\u041d\u0430\u0441\u0442\u0443\u043f\u043d\u0456 \u0434\u0456\u0457',
    'operations.searchPlaceholder': '\u0428\u0443\u043a\u0430\u0439\u0442\u0435 \u0441\u043f\u0456\u0432\u0440\u043e\u0431\u0456\u0442\u043d\u0438\u043a\u0430, \u0437\u0430\u0432\u0434\u0430\u043d\u043d\u044f, \u0441\u0442\u0430\u0442\u0443\u0441 \u0430\u0431\u043e \u0434\u0435\u0434\u043b\u0430\u0439\u043d',
    'operations.searchAria': '\u041f\u043e\u0448\u0443\u043a \u0443 \u0446\u0435\u043d\u0442\u0440\u0456 \u043e\u043f\u0435\u0440\u0430\u0446\u0456\u0439',
    'operations.clearSearch': '\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u0438',
    'operations.searchSummary': '{employees} \u0441\u043f\u0456\u0432\u0440\u043e\u0431\u0456\u0442\u043d\u0438\u043a\u0456\u0432 · {tasks} \u0437\u0430\u0432\u0434\u0430\u043d\u044c',
    'operations.noEmployeeMatches': '\u0417\u0430 \u043f\u043e\u0448\u0443\u043a\u043e\u043c \u0441\u043f\u0456\u0432\u0440\u043e\u0431\u0456\u0442\u043d\u0438\u043a\u0456\u0432 \u043d\u0435 \u0437\u043d\u0430\u0439\u0434\u0435\u043d\u043e.',
    'wall.filterPaused': '\u041d\u0430 \u043f\u0430\u0443\u0437\u0456',
    'wall.metricPaused': '\u041d\u0430 \u043f\u0430\u0443\u0437\u0456',
    'wall.columnFocusPaused': '\u041d\u0430 \u043f\u0430\u0443\u0437\u0456',
    'attachments.title': '\u0412\u043a\u043b\u0430\u0434\u0435\u043d\u043d\u044f',
    'audit.title': '\u0406\u0441\u0442\u043e\u0440\u0456\u044f',
    'templates.libraryTitle': '\u0411\u0456\u0431\u043b\u0456\u043e\u0442\u0435\u043a\u0430 \u0448\u0430\u0431\u043b\u043e\u043d\u0456\u0432',
    'analytics.title': '\u0410\u043d\u0430\u043b\u0456\u0442\u0438\u043a\u0430 \u0437\u0430\u0432\u0434\u0430\u043d\u044c',
});

Object.assign(translations.ru, {
    'common.open': '\u041e\u0442\u043a\u0440\u044b\u0442\u044c',
    'common.dismiss': '\u0421\u043a\u0440\u044b\u0442\u044c',
    'form.priority': '\u041f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442',
    'priority.low': '\u041d\u0438\u0437\u043a\u0438\u0439',
    'priority.medium': '\u0421\u0440\u0435\u0434\u043d\u0438\u0439',
    'priority.high': '\u0412\u044b\u0441\u043e\u043a\u0438\u0439',
    'task.startNow': '\u041d\u0430\u0447\u0430\u0442\u044c',
    'task.pauseNow': '\u041f\u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u043d\u0430 \u043f\u0430\u0443\u0437\u0443',
    'task.markDone': '\u041e\u0442\u043c\u0435\u0442\u0438\u0442\u044c \u0433\u043e\u0442\u043e\u0432\u043e',
    'command.eyebrow': '\u0411\u044b\u0441\u0442\u0440\u044b\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f',
    'command.title': '\u041d\u0430\u0439\u0442\u0438 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b, \u0437\u0430\u0434\u0430\u0447\u0438 \u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f',
    'command.searchPlaceholder': '\u041f\u043e\u0438\u0441\u043a \u0437\u0430\u0434\u0430\u0447, \u0441\u0442\u0440\u0430\u043d\u0438\u0446 \u0438\u043b\u0438 \u043b\u044e\u0434\u0435\u0439',
    'command.searchAria': '\u041f\u043e\u0438\u0441\u043a \u0437\u0430\u0434\u0430\u0447, \u0441\u0442\u0440\u0430\u043d\u0438\u0446 \u0438\u043b\u0438 \u043b\u044e\u0434\u0435\u0439',
    'command.quickLinks': '\u0411\u044b\u0441\u0442\u0440\u044b\u0435 \u0441\u0441\u044b\u043b\u043a\u0438',
    'command.tasks': '\u0417\u0430\u0434\u0430\u0447\u0438',
    'command.noResults': '\u041d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e.',
    'command.trigger': '\u041f\u043e\u0438\u0441\u043a \u0438 \u0448\u043e\u0440\u0442\u043a\u0430\u0442\u044b',
    'calendar.eyebrow': '\u0414\u0435\u0434\u043b\u0430\u0439\u043d\u044b',
    'calendar.title': '\u041a\u0430\u043b\u0435\u043d\u0434\u0430\u0440\u044c \u0437\u0430\u0434\u0430\u0447',
    'calendar.previousMonth': '\u041d\u0430\u0437\u0430\u0434',
    'calendar.nextMonth': '\u0414\u0430\u043b\u0435\u0435',
    'calendar.noDeadlinesTitle': '\u0412 \u044d\u0442\u043e\u043c \u043f\u0435\u0440\u0438\u043e\u0434\u0435 \u043d\u0435\u0442 \u0434\u0435\u0434\u043b\u0430\u0439\u043d\u043e\u0432',
    'calendar.noDeadlinesText': '\u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u0434\u0435\u0434\u043b\u0430\u0439\u043d\u044b, \u0447\u0442\u043e\u0431\u044b \u0440\u0430\u0441\u043f\u0440\u0435\u0434\u0435\u043b\u044f\u0442\u044c \u043d\u0430\u0433\u0440\u0443\u0437\u043a\u0443 \u043f\u043e \u043c\u0435\u0441\u044f\u0446\u0443.',
    'calendar.calendarMode': '\u041a\u0430\u043b\u0435\u043d\u0434\u0430\u0440\u044c',
    'calendar.listMode': '\u0421\u043f\u0438\u0441\u043e\u043a',
    'calendar.modeAria': '\u0420\u0435\u0436\u0438\u043c \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0430',
    'calendar.more': '+{count} \u0435\u0449\u0451',
    'onboarding.eyebrow': '\u0411\u044b\u0441\u0442\u0440\u044b\u0439 \u0441\u0442\u0430\u0440\u0442',
    'onboarding.title': '\u0411\u043e\u043b\u0435\u0435 \u0431\u044b\u0441\u0442\u0440\u044b\u0439 \u0440\u0438\u0442\u043c \u0440\u0430\u0431\u043e\u0442\u044b \u043d\u0430 \u0434\u0435\u043d\u044c',
    'onboarding.stepTasks': '\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u0434\u043e\u0441\u043a\u0443, \u0447\u0442\u043e\u0431\u044b \u0432 \u0444\u043e\u043a\u0443\u0441\u0435 \u043e\u0441\u0442\u0430\u0432\u0430\u043b\u0430\u0441\u044c \u0430\u043a\u0442\u0438\u0432\u043d\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430.',
    'onboarding.stepStatus': '\u041c\u0435\u043d\u044f\u0439\u0442\u0435 \u0441\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u0434\u0430\u0447\u0438 \u043f\u0440\u044f\u043c\u043e \u0438\u0437 \u043a\u0430\u0436\u0434\u043e\u0439 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438.',
    'onboarding.stepList': '\u041e\u0442\u043a\u0440\u044b\u0432\u0430\u0439\u0442\u0435 \u0441\u043f\u0438\u0441\u043e\u043a \u0438\u043b\u0438 \u0441\u0442\u0435\u043d\u0443, \u043a\u043e\u0433\u0434\u0430 \u043d\u0443\u0436\u043d\u043e \u0431\u043e\u043b\u044c\u0448\u0435 \u043a\u043e\u043d\u0442\u0435\u043a\u0441\u0442\u0430.',
    'admin.workloadEyebrow': '\u041d\u0430\u0433\u0440\u0443\u0437\u043a\u0430',
    'admin.workloadTitle': '\u0417\u0430\u043d\u044f\u0442\u043e\u0441\u0442\u044c \u0438 \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u044c',
    'admin.workloadHelp': '\u0421\u043c\u043e\u0442\u0440\u0438\u0442\u0435, \u043a\u0442\u043e \u043f\u0435\u0440\u0435\u0433\u0440\u0443\u0436\u0435\u043d, \u0443 \u043a\u043e\u0433\u043e \u0435\u0441\u0442\u044c \u0440\u0435\u0437\u0435\u0440\u0432 \u0438 \u043a\u0430\u043a\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0441\u0442\u043e\u0438\u0442 \u043f\u0440\u0438\u043e\u0440\u0438\u0442\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0441\u0435\u0439\u0447\u0430\u0441.',
    'admin.workloadOverloaded': '\u0412\u044b\u0441\u043e\u043a\u0430\u044f \u043d\u0430\u0433\u0440\u0443\u0437\u043a\u0430',
    'admin.workloadOverloadedTitle': '\u0421\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0438 \u0432 \u0437\u043e\u043d\u0435 \u0440\u0438\u0441\u043a\u0430',
    'admin.workloadAvailable': '\u0415\u0441\u0442\u044c \u0440\u0435\u0437\u0435\u0440\u0432',
    'admin.workloadAvailableTitle': '\u041c\u043e\u0433\u0443\u0442 \u0432\u0437\u044f\u0442\u044c \u0435\u0449\u0451 \u0440\u0430\u0431\u043e\u0442\u0443',
    'admin.workloadFocus': '\u0424\u043e\u043a\u0443\u0441-\u0437\u0430\u0434\u0430\u0447\u0438',
    'admin.workloadFocusTitle': '\u041f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442 \u043d\u0430 \u0441\u0435\u0439\u0447\u0430\u0441',
    'admin.workloadNoOverloaded': '\u0421\u0435\u0439\u0447\u0430\u0441 \u043d\u0438\u043a\u0442\u043e \u043d\u0435 \u043f\u0435\u0440\u0435\u0433\u0440\u0443\u0436\u0435\u043d.',
    'admin.workloadNoAvailable': '\u0421\u0435\u0439\u0447\u0430\u0441 \u0432\u0441\u0435 \u0437\u0430\u043d\u044f\u0442\u044b.',
    'board.emptyCtaAdmin': '\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0443',
    'board.emptyCtaEmployee': '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0441\u043f\u0438\u0441\u043e\u043a \u0437\u0430\u0434\u0430\u0447',
    'messages.taskStarted': '\u0417\u0430\u0434\u0430\u0447\u0430 \u043f\u0435\u0440\u0435\u0432\u0435\u0434\u0435\u043d\u0430 \u0432 \u0440\u0430\u0431\u043e\u0442\u0443.',
    'messages.taskPaused': '\u0417\u0430\u0434\u0430\u0447\u0430 \u043f\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u0430 \u043d\u0430 \u043f\u0430\u0443\u0437\u0443.',
    'messages.taskCompletedNow': '\u0417\u0430\u0434\u0430\u0447\u0430 \u043e\u0442\u043c\u0435\u0447\u0435\u043d\u0430 \u043a\u0430\u043a \u0433\u043e\u0442\u043e\u0432\u0430\u044f.',
    'messages.subtaskUpdated': '\u041f\u043e\u0434\u0437\u0430\u0434\u0430\u0447\u0430 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0430.',
    'messages.draftRestored': '\u0427\u0435\u0440\u043d\u043e\u0432\u0438\u043a \u0432\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d.',
});

Object.assign(translations.da, {
    'nav.workflowHub': 'Arbejdshub',
    'nav.quickSettings': 'Hurtige indstillinger',
    'settings.eyebrow': 'Praeferencer',
    'board.dashboard': 'Teamoverblik',
    'board.listLabel': 'Opgaveliste',
    'status.not_started': 'Ikke startet',
    'status.in_progress': 'I gang',
    'status.completed': 'Faerdig',
    'status.lagging': 'Bagud',
    'create.tip': 'Rad',
    'login.eyebrow': 'Opgavestyring',
    'admin.processesWallEyebrow': 'Live overblik',
    'priority.medium': 'Mellem',
    'command.eyebrow': 'Hurtige handlinger',
    'calendar.eyebrow': 'Frister',
    'onboarding.eyebrow': 'Hurtig start',
    'operations.teamTitle': 'Teamstatus',
    'operations.metricsAria': 'Driftsmaalinger',
    'analytics.eyebrow': 'Ydeevne',
    'analytics.title': 'Opgaveanalyse',
    'attachments.formHelp': 'Du kan vedhaefte filer op til {size} MB.',
    'messages.attachmentDeleted': 'Filen blev fjernet.',
    'messages.templateDeleted': 'Skabelonen "{name}" blev slettet.',
    'errors.templateNameRequired': 'Angiv et navn til skabelonen.',
    'errors.attachmentRequired': 'Vaelg mindst en fil.',
    'errors.attachmentTooLarge': 'Filen ma maksimalt fylde {size} MB.',
    'errors.attachmentInvalidType': 'Filen skal vaere JPG, PNG, WEBP, PDF, TXT, CSV, DOC, DOCX, XLS eller XLSX.',
    'errors.photoTooLargeDynamic': 'Profilbilledet ma maksimalt fylde {size} MB.',
    'templates.chooseTemplate': 'Vaelg skabelon',
    'templates.recurrence.none': 'Engangsopgave',
    'templates.recurrence.daily': 'Dagligt',
    'templates.recurrence.weekly': 'Ugentligt',
    'templates.recurrence.monthly': 'Manedligt',
    'audit.taskCreated': 'Opgaven blev oprettet.',
    'audit.taskUpdated': 'Opgaven blev opdateret.',
    'audit.attachmentDeleted': 'Filen "{name}" blev fjernet.',
    'audit.messagePosted': 'Der blev tilfojet en besked.',
    'audit.messageUpdated': 'Beskeden blev opdateret.',
    'audit.messageDeleted': 'Beskeden blev slettet.',
    'audit.checklistUpdated': 'Checklisten blev opdateret.',
    'audit.taskCompleted': 'Opgaven blev markeret som faerdig.',
    'audit.taskReopened': 'Opgaven blev genabnet.',
    'audit.taskStatusChanged': 'Status blev aendret til {status}.',
    'audit.subtaskCompleted': 'Underopgaven "{title}" blev markeret som faerdig.',
    'audit.subtaskReopened': 'Underopgaven "{title}" blev genabnet.',
    'audit.templateApplied': 'Opgaven blev oprettet fra skabelonen "{name}".',
    'audit.recurringGenerated': 'Tilbagevendende opgave oprettet fra skabelonen "{name}".',
});

Object.assign(translations.en, {
    'operations.metricsAria': 'Operations metrics',
    'attachments.formHelp': 'You can attach files up to {size} MB.',
    'messages.attachmentDeleted': 'The file has been removed.',
    'messages.templateDeleted': 'Template "{name}" has been deleted.',
    'errors.templateNameRequired': 'Enter a template name.',
    'errors.attachmentRequired': 'Choose at least one file.',
    'errors.attachmentTooLarge': 'The file must be {size} MB or smaller.',
    'errors.attachmentInvalidType': 'The file must be JPG, PNG, WEBP, PDF, TXT, CSV, DOC, DOCX, XLS, or XLSX.',
    'errors.photoTooLargeDynamic': 'The profile photo must be {size} MB or smaller.',
    'templates.chooseTemplate': 'Choose template',
    'templates.recurrence.none': 'One-off',
    'templates.recurrence.daily': 'Daily',
    'templates.recurrence.weekly': 'Weekly',
    'templates.recurrence.monthly': 'Monthly',
    'audit.taskCreated': 'The task was created.',
    'audit.taskUpdated': 'The task was updated.',
    'audit.attachmentDeleted': 'File "{name}" was removed.',
    'audit.messagePosted': 'A message was added.',
    'audit.messageUpdated': 'The message was updated.',
    'audit.messageDeleted': 'The message was deleted.',
    'audit.checklistUpdated': 'The checklist was updated.',
    'audit.taskCompleted': 'The task was marked as done.',
    'audit.taskReopened': 'The task was reopened.',
    'audit.taskStatusChanged': 'Status changed to {status}.',
    'audit.subtaskCompleted': 'Subtask "{title}" was marked as done.',
    'audit.subtaskReopened': 'Subtask "{title}" was reopened.',
    'audit.templateApplied': 'The task was created from template "{name}".',
    'audit.recurringGenerated': 'Recurring task created from template "{name}".',
});

Object.assign(translations.ru, {
    'analytics.averageCompletion': 'Среднее время закрытия',
    'analytics.completedShort': 'закрыто',
    'analytics.completedTasks': 'Завершённые задачи',
    'analytics.createdShort': 'создано',
    'analytics.daysShort': 'дн.',
    'analytics.dueThisWeek': 'На этой неделе',
    'analytics.eyebrow': 'Производительность',
    'analytics.help': 'Отслеживайте дедлайны, время выполнения и распределение приоритетов.',
    'analytics.highPriorityOpen': 'Высокий приоритет',
    'analytics.openTasks': 'Открытые задачи',
    'analytics.overdueTasks': 'Просроченные задачи',
    'analytics.prioritySplit': 'Приоритеты',
    'analytics.recentTrend': '7 дней',
    'attachments.add': 'Прикрепить файлы',
    'attachments.addToMessage': 'Добавить файлы',
    'attachments.count': '{count} файлов',
    'attachments.deleteConfirm': 'Удалить этот файл?',
    'attachments.empty': 'У этой задачи пока нет вложений.',
    'attachments.eyebrow': 'Файлы',
    'attachments.formHelp': 'Можно прикреплять файлы до {size} MB.',
    'audit.empty': 'История появится после создания и обновления задачи.',
    'audit.eyebrow': 'История',
    'audit.taskCreated': 'Задача создана.',
    'audit.taskUpdated': 'Задача обновлена.',
    'audit.attachmentDeleted': 'Файл "{name}" удалён.',
    'audit.messagePosted': 'Добавлено сообщение.',
    'audit.messageUpdated': 'Сообщение обновлено.',
    'audit.messageDeleted': 'Сообщение удалено.',
    'audit.checklistUpdated': 'Чек-лист обновлён.',
    'audit.taskCompleted': 'Задача отмечена как готовая.',
    'audit.taskReopened': 'Задача снова открыта.',
    'audit.taskStatusChanged': 'Статус изменён на {status}.',
    'audit.subtaskCompleted': 'Подзадача "{title}" отмечена как готовая.',
    'audit.subtaskReopened': 'Подзадача "{title}" снова открыта.',
    'audit.templateApplied': 'Задача создана из шаблона "{name}".',
    'audit.recurringGenerated': 'Повторяющаяся задача создана из шаблона "{name}".',
    'messages.attachmentDeleted': 'Файл удалён.',
    'messages.templateDeleted': 'Шаблон "{name}" удалён.',
    'messages.taskUpdateError': 'Не удалось обновить задачу. Попробуйте ещё раз.',
    'operations.inProgressHelp': 'Сотрудники с активной работой',
    'operations.metricsAria': 'Операционные метрики',
    'operations.totalEmployeesHelp': 'Активные пользователи команды',
    'templates.appliedBadge': 'Шаблон применён',
    'templates.appliedHelp': 'Эта задача заполнена из шаблона. Перед сохранением можно изменить любые поля.',
    'templates.chooseTemplate': 'Выберите шаблон',
    'templates.eyebrow': 'Шаблоны',
    'templates.recurrence.none': 'Разовая',
    'templates.recurrence.daily': 'Ежедневно',
    'templates.recurrence.weekly': 'Еженедельно',
    'templates.recurrence.monthly': 'Ежемесячно',
    'errors.templateNameRequired': 'Введите название шаблона.',
    'errors.attachmentRequired': 'Выберите хотя бы один файл.',
    'errors.attachmentTooLarge': 'Файл должен быть не больше {size} MB.',
    'errors.attachmentInvalidType': 'Файл должен быть JPG, PNG, WEBP, PDF, TXT, CSV, DOC, DOCX, XLS или XLSX.',
    'errors.photoTooLargeDynamic': 'Фото профиля должно быть не больше {size} MB.',
});

translations.no = {
    ...buildDerivedTranslations(translations.da, NORWEGIAN_REPLACEMENTS),
    ...translations.no,
};

translations.uk = {
    ...buildDerivedTranslations(translations.ru, UKRAINIAN_REPLACEMENTS),
    ...translations.uk,
};

Object.assign(translations.no, {
    'nav.workflowHub': 'Arbeidsflyt',
    'nav.quickSettings': 'Hurtiginnstillinger',
    'settings.eyebrow': 'Preferanser',
    'board.dashboard': 'Teamoversikt',
    'board.listLabel': 'Oppgaveliste',
    'status.not_started': 'Ikke startet',
    'status.in_progress': 'I gang',
    'status.completed': 'Ferdig',
    'status.lagging': 'Bak skjema',
    'create.tip': 'Rad',
    'login.eyebrow': 'Oppgavestyring',
    'admin.processesWallEyebrow': 'Live oversikt',
    'priority.medium': 'Middels',
    'operations.metricsAria': 'Driftsmalinger',
    'attachments.formHelp': 'Du kan legge ved filer opptil {size} MB.',
    'messages.attachmentDeleted': 'Filen ble fjernet.',
    'messages.templateDeleted': 'Malen "{name}" ble slettet.',
    'templates.chooseTemplate': 'Velg mal',
    'templates.recurrence.none': 'Engangsoppgave',
    'templates.recurrence.daily': 'Daglig',
    'templates.recurrence.weekly': 'Ukentlig',
    'templates.recurrence.monthly': 'Manedlig',
});

Object.assign(translations.uk, {
    'operations.metricsAria': 'Операційні метрики',
    'attachments.formHelp': 'Можна додавати файли до {size} MB.',
    'messages.attachmentDeleted': 'Файл видалено.',
    'messages.templateDeleted': 'Шаблон "{name}" видалено.',
    'templates.chooseTemplate': 'Оберіть шаблон',
    'templates.recurrence.none': 'Разове',
    'templates.recurrence.daily': 'Щодня',
    'templates.recurrence.weekly': 'Щотижня',
    'templates.recurrence.monthly': 'Щомісяця',
});

Object.assign(translations.da, {
    'detail.deadlineWithDate': 'Frist {date}',
    'detail.createdWithDate': 'Oprettet {date}',
});

Object.assign(translations.en, {
    'detail.deadlineWithDate': 'Deadline {date}',
    'detail.createdWithDate': 'Created {date}',
});

Object.assign(translations.ru, {
    'detail.deadlineWithDate': 'Дедлайн {date}',
    'detail.createdWithDate': 'Создано {date}',
});

Object.assign(translations.no, {
    'detail.deadlineWithDate': 'Frist {date}',
    'detail.createdWithDate': 'Opprettet {date}',
});

Object.assign(translations.uk, {
    'detail.deadlineWithDate': 'Дедлайн {date}',
    'detail.createdWithDate': 'Створено {date}',
});

Object.assign(translations.da, {
    'admin.lastUpdate': 'Seneste opdatering',
    'admin.noUpdate': 'Ingen opdateringer endnu.',
});

Object.assign(translations.en, {
    'admin.lastUpdate': 'Last update',
    'admin.noUpdate': 'No updates yet.',
});

Object.assign(translations.ru, {
    'admin.lastUpdate': 'Последнее обновление',
    'admin.noUpdate': 'Обновлений пока нет.',
});

Object.assign(translations.no, {
    'admin.lastUpdate': 'Siste oppdatering',
    'admin.noUpdate': 'Ingen oppdateringer enna.',
});

Object.assign(translations.uk, {
    'admin.lastUpdate': 'Останнє оновлення',
    'admin.noUpdate': 'Оновлень поки немає.',
});

Object.assign(translations.da, {
    'operations.tabsAria': 'Kontrolpanel sektioner',
    'operations.tabTeam': 'Team',
    'operations.tabTasks': 'Opgaver',
    'operations.tabLog': 'Journal',
    'activityLog.searchPlaceholder': 'Sog i journal',
    'activityLog.searchAria': 'Sog i journal',
    'activityLog.filtersAria': 'Filtrer journal',
    'activityLog.filterAll': 'Alle',
    'activityLog.filterTasks': 'Opgaver',
    'activityLog.filterEmployees': 'Medarbejdere',
    'activityLog.noMatches': 'Ingen handlinger matcher filtret.',
    'siteLog.open': 'Handlingslog',
    'siteLog.headerEyebrow': 'Admin logs',
    'siteLog.headerTitle': 'Systemhaendelser og site-opdateringer',
    'siteLog.heroTitle': 'Hold styr pa systemhaendelser og releases',
    'siteLog.heroText': 'Brug denne side til at folge op pa arbejdsflow, kontoaendringer og de seneste leverancer til produktet.',
    'siteLog.eventsCount': 'haendelser',
    'siteLog.updatesCount': 'updates',
    'siteLog.eventsEyebrow': 'Aktivitetsfeed',
    'siteLog.eventsTitle': 'Seneste handlinger',
    'siteLog.eventsHelp': 'Task-opdateringer og medarbejderhaendelser samles her i kronologisk orden.',
    'siteLog.eventsEmpty': 'Ingen systemhaendelser endnu.',
    'siteLog.updatesEyebrow': 'Release log',
    'siteLog.updatesTitle': 'Log over site-opdateringer',
    'siteLog.updatesHelp': 'Denne liste ligger i en separat fil, sa du nemt kan redigere eller fjerne den senere.',
    'siteLog.updatesEmpty': 'Ingen site-opdateringer registreret endnu.',
    'siteLog.systemActor': 'System',
    'siteLog.scopeTask': 'Task',
    'siteLog.scopeEmployee': 'Medarbejder',
    'siteLog.employeeNoStage': 'Intet aktivt trin',
    'siteLog.employeeTaskAssigned': '{employee} fik tildelt "{task}".',
    'siteLog.employeeStatusChanged': '{employee} skiftede status til {status}.',
    'siteLog.employeeStageUpdated': '{employee} opdaterede trin til {stage}.',
    'siteLog.employeeStartDateUpdated': '{employee} opdaterede startdatoen.',
    'siteLog.employeeCompletionDateUpdated': '{employee} opdaterede slutdatoen.',
    'siteLog.employeeAccountUpdated': '{employee} opdaterede konto-oplysninger.',
    'siteLog.employeePasswordReset': '{employee} nulstillede adgangskoden.',
    'siteLog.update.20260423.title': 'Release audit og slutpolish',
    'siteLog.update.20260423.item1': 'Fuldt projektpass med stabilitetsfix, statuslogik og bedre beskyttelse mod dobbeltklik.',
    'siteLog.update.20260423.item2': 'Kontrolpanelet blev ryddet op, fik bedre navigation og mindre stoej i admin-flows.',
    'siteLog.update.20260423.item3': 'Alle understottede sprog blev gennemgaet og manglende oversaettelser blev udfyldt.',
    'siteLog.update.20260423.item4': 'Separat systemlog og separat release-log blev tilfojet, sa admin kan folge haendelser og aendringer centralt.',
});

Object.assign(translations.en, {
    'operations.tabsAria': 'Control panel sections',
    'operations.tabTeam': 'Team',
    'operations.tabTasks': 'Tasks',
    'operations.tabLog': 'Log',
    'activityLog.searchPlaceholder': 'Search log',
    'activityLog.searchAria': 'Search log',
    'activityLog.filtersAria': 'Filter log',
    'activityLog.filterAll': 'All',
    'activityLog.filterTasks': 'Tasks',
    'activityLog.filterEmployees': 'Employees',
    'activityLog.noMatches': 'No actions match the filter.',
    'siteLog.open': 'Activity log',
    'siteLog.headerEyebrow': 'Admin logs',
    'siteLog.headerTitle': 'System events and site updates',
    'siteLog.heroTitle': 'Track system events and releases',
    'siteLog.heroText': 'Use this page to follow workflow changes, account updates, and the latest product deliveries.',
    'siteLog.eventsCount': 'events',
    'siteLog.updatesCount': 'updates',
    'siteLog.eventsEyebrow': 'Activity feed',
    'siteLog.eventsTitle': 'Recent actions',
    'siteLog.eventsHelp': 'Task changes and employee events are collected here in chronological order.',
    'siteLog.eventsEmpty': 'No system events yet.',
    'siteLog.updatesEyebrow': 'Release log',
    'siteLog.updatesTitle': 'Site update log',
    'siteLog.updatesHelp': 'This list lives in a separate file so you can edit or remove it later without touching the rest of the app.',
    'siteLog.updatesEmpty': 'No site updates have been recorded yet.',
    'siteLog.systemActor': 'System',
    'siteLog.scopeTask': 'Task',
    'siteLog.scopeEmployee': 'Employee',
    'siteLog.employeeNoStage': 'No active stage',
    'siteLog.employeeTaskAssigned': '{employee} was assigned "{task}".',
    'siteLog.employeeStatusChanged': '{employee} changed status to {status}.',
    'siteLog.employeeStageUpdated': '{employee} updated the stage to {stage}.',
    'siteLog.employeeStartDateUpdated': '{employee} updated the start date.',
    'siteLog.employeeCompletionDateUpdated': '{employee} updated the completion date.',
    'siteLog.employeeAccountUpdated': '{employee} updated account details.',
    'siteLog.employeePasswordReset': '{employee} reset the password.',
    'siteLog.update.20260423.title': 'Release audit and final polish',
    'siteLog.update.20260423.item1': 'Full project pass for stability fixes, status logic, and better duplicate-click protection.',
    'siteLog.update.20260423.item2': 'The control panel was cleaned up with clearer navigation and less admin noise.',
    'siteLog.update.20260423.item3': 'All supported languages were reviewed and missing translations were completed.',
    'siteLog.update.20260423.item4': 'A separate system log and a separate release log were added so admins can track events and product changes in one place.',
});

Object.assign(translations.ru, {
    'operations.tabsAria': 'Разделы панели управления',
    'operations.tabTeam': 'Команда',
    'operations.tabTasks': 'Задачи',
    'operations.tabLog': 'Журнал',
    'activityLog.searchPlaceholder': 'Поиск по журналу',
    'activityLog.searchAria': 'Поиск по журналу',
    'activityLog.filtersAria': 'Фильтр журнала',
    'activityLog.filterAll': 'Все',
    'activityLog.filterTasks': 'Задачи',
    'activityLog.filterEmployees': 'Сотрудники',
    'activityLog.noMatches': 'Нет действий по выбранному фильтру.',
    'siteLog.open': 'Журнал действий',
    'siteLog.headerEyebrow': 'Логи администратора',
    'siteLog.headerTitle': 'Системные события и обновления сайта',
    'siteLog.heroTitle': 'Следите за системными событиями и релизами',
    'siteLog.heroText': 'На этой странице собраны изменения по рабочим процессам, аккаунтам и последним поставкам в продукт.',
    'siteLog.eventsCount': 'событий',
    'siteLog.updatesCount': 'обновлений',
    'siteLog.eventsEyebrow': 'Системная лента',
    'siteLog.eventsTitle': 'Последние системные события',
    'siteLog.eventsHelp': 'Изменения по задачам и сотрудникам собраны здесь в хронологическом порядке.',
    'siteLog.eventsEmpty': 'Системных событий пока нет.',
    'siteLog.updatesEyebrow': 'Журнал релизов',
    'siteLog.updatesTitle': 'Лог обновлений сайта',
    'siteLog.updatesHelp': 'Этот список лежит в отдельном файле, поэтому его легко редактировать или удалить позже без изменений остального приложения.',
    'siteLog.updatesEmpty': 'Обновления сайта пока не зарегистрированы.',
    'siteLog.systemActor': 'Система',
    'siteLog.scopeTask': 'Задача',
    'siteLog.scopeEmployee': 'Сотрудник',
    'siteLog.employeeNoStage': 'Нет активного этапа',
    'siteLog.employeeTaskAssigned': '{employee} получил задачу "{task}".',
    'siteLog.employeeStatusChanged': '{employee} изменил статус на {status}.',
    'siteLog.employeeStageUpdated': '{employee} обновил этап: {stage}.',
    'siteLog.employeeStartDateUpdated': '{employee} обновил дату начала.',
    'siteLog.employeeCompletionDateUpdated': '{employee} обновил дату завершения.',
    'siteLog.employeeAccountUpdated': '{employee} обновил данные аккаунта.',
    'siteLog.employeePasswordReset': '{employee} сбросил пароль.',
    'siteLog.update.20260423.title': 'Финальный аудит и последний полиш',
    'siteLog.update.20260423.item1': 'Проведён полный проход по проекту: исправлены проблемы стабильности, логики статусов и защита от повторных кликов.',
    'siteLog.update.20260423.item2': 'Панель управления упрощена, навигация стала чище, а админские сценарии — спокойнее и понятнее.',
    'siteLog.update.20260423.item3': 'Проверены все поддерживаемые языки и закрыты пропущенные переводы.',
    'siteLog.update.20260423.item4': 'Добавлены отдельный системный журнал и отдельный журнал обновлений сайта для централизованного контроля изменений.',
});

Object.assign(translations.no, {
    'operations.tabsAria': 'Kontrollpanel seksjoner',
    'operations.tabTeam': 'Team',
    'operations.tabTasks': 'Oppgaver',
    'operations.tabLog': 'Logg',
    'activityLog.searchPlaceholder': 'Sok i logg',
    'activityLog.searchAria': 'Sok i logg',
    'activityLog.filtersAria': 'Filtrer logg',
    'activityLog.filterAll': 'Alle',
    'activityLog.filterTasks': 'Oppgaver',
    'activityLog.filterEmployees': 'Ansatte',
    'activityLog.noMatches': 'Ingen handlinger matcher filteret.',
    'siteLog.open': 'Aktivitetslogg',
    'siteLog.headerEyebrow': 'Adminlogger',
    'siteLog.headerTitle': 'Systemhendelser og nettstedsoppdateringer',
    'siteLog.heroTitle': 'Folg systemhendelser og leveranser',
    'siteLog.heroText': 'Bruk denne siden til a folge arbeidsflyt, kontoopdateringer og de siste leveransene i produktet.',
    'siteLog.eventsCount': 'hendelser',
    'siteLog.updatesCount': 'oppdateringer',
    'siteLog.eventsEyebrow': 'Systemflyt',
    'siteLog.eventsTitle': 'Siste systemhendelser',
    'siteLog.eventsHelp': 'Oppgaveendringer og ansatthendelser samles her i kronologisk rekkefolge.',
    'siteLog.eventsEmpty': 'Ingen systemhendelser enda.',
    'siteLog.updatesEyebrow': 'Release-logg',
    'siteLog.updatesTitle': 'Logg over nettstedsoppdateringer',
    'siteLog.updatesHelp': 'Denne listen ligger i en egen fil, sa du enkelt kan redigere eller fjerne den senere.',
    'siteLog.updatesEmpty': 'Ingen nettstedsoppdateringer er registrert enda.',
    'siteLog.systemActor': 'System',
    'siteLog.scopeTask': 'Oppgave',
    'siteLog.scopeEmployee': 'Ansatt',
    'siteLog.employeeNoStage': 'Ingen aktiv fase',
    'siteLog.employeeTaskAssigned': '{employee} fikk tildelt "{task}".',
    'siteLog.employeeStatusChanged': '{employee} endret status til {status}.',
    'siteLog.employeeStageUpdated': '{employee} oppdaterte fasen til {stage}.',
    'siteLog.employeeStartDateUpdated': '{employee} oppdaterte startdatoen.',
    'siteLog.employeeCompletionDateUpdated': '{employee} oppdaterte sluttdatoen.',
    'siteLog.employeeAccountUpdated': '{employee} oppdaterte kontoinformasjonen.',
    'siteLog.employeePasswordReset': '{employee} tilbakestilte passordet.',
    'siteLog.update.20260423.title': 'Sluttaudit og siste polering',
    'siteLog.update.20260423.item1': 'Hele prosjektet ble gjennomgatt med stabilitetsfikser, statuslogikk og bedre vern mot doble klikk.',
    'siteLog.update.20260423.item2': 'Kontrollpanelet ble ryddet opp med tydeligere navigasjon og mindre adminstoy.',
    'siteLog.update.20260423.item3': 'Alle stottede sprak ble gjennomgatt og manglende oversettelser ble fullfort.',
    'siteLog.update.20260423.item4': 'En egen systemlogg og en egen release-logg ble lagt til, slik at admin kan folge hendelser og produktendringer samlet.',
});

Object.assign(translations.uk, {
    'operations.tabsAria': 'Розділи панелі керування',
    'operations.tabTeam': 'Команда',
    'operations.tabTasks': 'Завдання',
    'operations.tabLog': 'Журнал',
    'activityLog.searchPlaceholder': 'Пошук у журналі',
    'activityLog.searchAria': 'Пошук у журналі',
    'activityLog.filtersAria': 'Фільтр журналу',
    'activityLog.filterAll': 'Усі',
    'activityLog.filterTasks': 'Завдання',
    'activityLog.filterEmployees': 'Співробітники',
    'activityLog.noMatches': 'Немає дій за вибраним фільтром.',
    'siteLog.open': 'Журнал дій',
    'siteLog.headerEyebrow': 'Логи адміністратора',
    'siteLog.headerTitle': 'Системні події та оновлення сайту',
    'siteLog.heroTitle': 'Стежте за системними подіями та релізами',
    'siteLog.heroText': 'На цій сторінці зібрані зміни робочих процесів, акаунтів і останні поставки в продукт.',
    'siteLog.eventsCount': 'подій',
    'siteLog.updatesCount': 'оновлень',
    'siteLog.eventsEyebrow': 'Системна стрічка',
    'siteLog.eventsTitle': 'Останні системні події',
    'siteLog.eventsHelp': 'Зміни по завданнях і співробітниках зібрані тут у хронологічному порядку.',
    'siteLog.eventsEmpty': 'Системних подій поки немає.',
    'siteLog.updatesEyebrow': 'Журнал релізів',
    'siteLog.updatesTitle': 'Лог оновлень сайту',
    'siteLog.updatesHelp': 'Цей список лежить в окремому файлі, тому його легко редагувати або видалити пізніше без змін решти застосунку.',
    'siteLog.updatesEmpty': 'Оновлення сайту поки не зареєстровані.',
    'siteLog.systemActor': 'Система',
    'siteLog.scopeTask': 'Завдання',
    'siteLog.scopeEmployee': 'Співробітник',
    'siteLog.employeeNoStage': 'Немає активного етапу',
    'siteLog.employeeTaskAssigned': '{employee} отримав завдання "{task}".',
    'siteLog.employeeStatusChanged': '{employee} змінив статус на {status}.',
    'siteLog.employeeStageUpdated': '{employee} оновив етап: {stage}.',
    'siteLog.employeeStartDateUpdated': '{employee} оновив дату початку.',
    'siteLog.employeeCompletionDateUpdated': '{employee} оновив дату завершення.',
    'siteLog.employeeAccountUpdated': '{employee} оновив дані акаунта.',
    'siteLog.employeePasswordReset': '{employee} скинув пароль.',
    'siteLog.update.20260423.title': 'Фінальний аудит і останній поліш',
    'siteLog.update.20260423.item1': 'Проведено повний прохід по проєкту: виправлено проблеми стабільності, логіки статусів і захист від повторних кліків.',
    'siteLog.update.20260423.item2': 'Панель керування спрощено, навігація стала чистішою, а адмінські сценарії — спокійнішими та зрозумілішими.',
    'siteLog.update.20260423.item3': 'Перевірено всі підтримувані мови та закрито пропущені переклади.',
    'siteLog.update.20260423.item4': 'Додано окремий системний журнал і окремий журнал оновлень сайту для централізованого контролю змін.',
});

Object.assign(translations.da, {
    'siteLog.headerEyebrow': 'Adminlog',
    'siteLog.updatesCount': 'opdateringer',
    'siteLog.scopeTask': 'Opgave',
});

Object.assign(translations.da, {
    'updatesLog.open': 'Aendringshistorik',
    'updatesLog.headerEyebrow': 'Aendringshistorik',
    'updatesLog.headerTitle': 'Aendringshistorik',
    'updatesLog.heroTitle': 'Seneste forbedringer',
    'updatesLog.timelineEyebrow': 'Aendringslog',
    'updatesLog.timelineTitle': 'Seneste forbedringer',
    'siteLog.update.20260310.title': 'Grundlag for en tydeligere arbejdsdag',
    'siteLog.update.20260310.item1': 'Vi indforte et mere roligt medarbejderoverblik med klarere visning af aktuelt trin.',
    'siteLog.update.20260310.item2': 'Boardets struktur, tomme tilstande og den forste soge-/filteroprydning blev forbedret.',
    'siteLog.update.20260310.item3': 'De vigtigste opgavekort blev lettere at scanne i hverdagen.',
    'siteLog.update.20260324.title': 'Bedre koordinering af delte opgaver',
    'siteLog.update.20260324.item1': 'Deltagerstatus blev mere stabil for delte og omfordelte opgaver.',
    'siteLog.update.20260324.item2': 'Task-detaljer og beskedflow blev gjort mere robuste til opfolgning.',
    'siteLog.update.20260324.item3': 'Deadline- og forsinkelsessignaler blev tydeligere pa tvaers af kernevisningerne.',
    'siteLog.update.20260408.title': 'Skabeloner og driftsoversigt',
    'siteLog.update.20260408.item1': 'Skabeloner og gentagne opgaver blev forbedret til faste arbejdsflows.',
    'siteLog.update.20260408.item2': 'Driftsoversigt, belastning og hurtig tildeling blev gjort skarpere.',
    'siteLog.update.20260408.item3': 'Liste-, kalender- og filtertilstande blev mere forudsigelige pa opgavesiderne.',
    'siteLog.update.20260423.title': 'Release-stabilisering og sidste finpudsning',
    'siteLog.update.20260423.item1': 'Et fuldt stabilitetspass gav bedre beskyttelse mod dobbeltklik og skaeve state-opdateringer.',
    'siteLog.update.20260423.item2': 'Oversaettelserne blev gjort faerdige pa alle understottede sprog.',
    'siteLog.update.20260423.item3': 'En separat admin-systemlog og en separat produktlog blev tilfojet.',
    'siteLog.update.20260423.item4': 'Gamle Activity-rester og unodig admin-stoj blev fjernet.',
});

Object.assign(translations.en, {
    'updatesLog.open': 'Change history',
    'updatesLog.headerEyebrow': 'Change history',
    'updatesLog.headerTitle': 'Change history',
    'updatesLog.heroTitle': 'Recent improvements',
    'updatesLog.timelineEyebrow': 'Change log',
    'updatesLog.timelineTitle': 'Recent improvements',
    'siteLog.update.20260310.title': 'Clearer daily workflow foundation',
    'siteLog.update.20260310.item1': 'Introduced a cleaner employee focus view with clearer current-stage tracking.',
    'siteLog.update.20260310.item2': 'Improved board structure, empty states, and the first round of search/filter cleanup.',
    'siteLog.update.20260310.item3': 'Tidied key task cards so daily work is easier to scan.',
    'siteLog.update.20260324.title': 'Shared task coordination improvements',
    'siteLog.update.20260324.item1': 'Participant statuses became more reliable for shared tasks and reassigned work.',
    'siteLog.update.20260324.item2': 'Task detail and task message flows were stabilized for follow-up work.',
    'siteLog.update.20260324.item3': 'Deadline and overdue signals were made easier to notice across core views.',
    'siteLog.update.20260408.title': 'Templates and operations overview',
    'siteLog.update.20260408.item1': 'Added better template and recurring-task support for repeatable workflows.',
    'siteLog.update.20260408.item2': 'Improved operational overview, workload visibility, and quick assignment flows.',
    'siteLog.update.20260408.item3': 'Made list, calendar, and filter states more predictable across task pages.',
    'siteLog.update.20260423.title': 'Release stabilization and final refinements',
    'siteLog.update.20260423.item1': 'Completed a full stability pass with stronger duplicate-click and state-update protection.',
    'siteLog.update.20260423.item2': 'Finished translation coverage across all supported languages.',
    'siteLog.update.20260423.item3': 'Added a separate admin system log and a separate product update log.',
    'siteLog.update.20260423.item4': 'Removed old Activity leftovers and cleaned noisy admin UI paths.',
});

Object.assign(translations.ru, {
    'updatesLog.open': 'История изменений',
    'updatesLog.headerEyebrow': 'История изменений',
    'updatesLog.headerTitle': 'История изменений',
    'updatesLog.heroTitle': 'Последние улучшения',
    'updatesLog.timelineEyebrow': 'Журнал изменений',
    'updatesLog.timelineTitle': 'Последние улучшения',
    'siteLog.update.20260310.title': 'Основа для более понятной ежедневной работы',
    'siteLog.update.20260310.item1': 'Появился более чистый employee workspace с понятным отображением текущего этапа.',
    'siteLog.update.20260310.item2': 'Улучшены структура доски, empty states и первый проход по поиску и фильтрам.',
    'siteLog.update.20260310.item3': 'Ключевые карточки задач стали легче для быстрого просмотра в течение дня.',
    'siteLog.update.20260324.title': 'Улучшения общей работы по задачам',
    'siteLog.update.20260324.item1': 'Статусы участников стали надёжнее для общих и переназначенных задач.',
    'siteLog.update.20260324.item2': 'Стабилизированы task detail и сценарии общения по задачам.',
    'siteLog.update.20260324.item3': 'Сигналы по дедлайнам и просрочкам стали заметнее в основных разделах.',
    'siteLog.update.20260408.title': 'Шаблоны и операционный обзор',
    'siteLog.update.20260408.item1': 'Улучшена работа с шаблонами и повторяющимися задачами для регулярных процессов.',
    'siteLog.update.20260408.item2': 'Доработаны обзор загрузки, operations center и быстрые сценарии назначения задач.',
    'siteLog.update.20260408.item3': 'Состояния списка, календаря и фильтров стали предсказуемее на task-страницах.',
    'siteLog.update.20260423.title': 'Релизная стабилизация и финальная доводка',
    'siteLog.update.20260423.item1': 'Завершён полный проход по стабильности с лучшей защитой от повторных кликов и неверных обновлений состояния.',
    'siteLog.update.20260423.item2': 'Добито покрытие переводов для всех поддерживаемых языков.',
    'siteLog.update.20260423.item3': 'Добавлены отдельный админский системный журнал и отдельный журнал обновлений продукта.',
    'siteLog.update.20260423.item4': 'Убраны старые хвосты Activity и лишний шум в админских сценариях.',
});

Object.assign(translations.no, {
    'updatesLog.open': 'Endringshistorikk',
    'updatesLog.headerEyebrow': 'Endringshistorikk',
    'updatesLog.headerTitle': 'Endringshistorikk',
    'updatesLog.heroTitle': 'Siste forbedringer',
    'updatesLog.timelineEyebrow': 'Endringslogg',
    'updatesLog.timelineTitle': 'Siste forbedringer',
    'siteLog.update.20260310.title': 'Grunnlag for en tydeligere arbeidsdag',
    'siteLog.update.20260310.item1': 'Vi la til en roligere ansattflate med klarere visning av aktiv fase.',
    'siteLog.update.20260310.item2': 'Tavlestruktur, tomtilstander og den forste runden med sok/filter-opprydding ble forbedret.',
    'siteLog.update.20260310.item3': 'De viktigste oppgavekortene ble lettere a skanne i hverdagen.',
    'siteLog.update.20260324.title': 'Bedre koordinering av delte oppgaver',
    'siteLog.update.20260324.item1': 'Deltakerstatus ble mer stabil for delte og omfordelte oppgaver.',
    'siteLog.update.20260324.item2': 'Oppgavedetaljer og meldingsflyt ble gjort mer robuste for oppfolging.',
    'siteLog.update.20260324.item3': 'Frist- og forsinkelsessignaler ble tydeligere pa tvers av kjernevisningene.',
    'siteLog.update.20260408.title': 'Maler og driftsoversikt',
    'siteLog.update.20260408.item1': 'Maler og gjentakende oppgaver ble forbedret for faste arbeidsflyter.',
    'siteLog.update.20260408.item2': 'Driftsoversikt, belastning og raske tildelinger ble gjort klarere.',
    'siteLog.update.20260408.item3': 'Liste-, kalender- og filtertilstander ble mer forutsigbare pa oppgavesidene.',
    'siteLog.update.20260423.title': 'Release-stabilisering og siste finpuss',
    'siteLog.update.20260423.item1': 'Et fullt stabilitetspass ga bedre vern mot dobbeltklikk og skeive state-oppdateringer.',
    'siteLog.update.20260423.item2': 'Oversettelsene ble fullfort pa alle stottede sprak.',
    'siteLog.update.20260423.item3': 'En separat admin-systemlogg og en separat produktlogg ble lagt til.',
    'siteLog.update.20260423.item4': 'Gamle Activity-rester og unodig adminstoy ble fjernet.',
});

Object.assign(translations.uk, {
    'updatesLog.open': 'Історія змін',
    'updatesLog.headerEyebrow': 'Історія змін',
    'updatesLog.headerTitle': 'Історія змін',
    'updatesLog.heroTitle': 'Останні покращення',
    'updatesLog.timelineEyebrow': 'Журнал змін',
    'updatesLog.timelineTitle': 'Останні покращення',
    'siteLog.update.20260310.title': 'Основа для зрозумілішої щоденної роботи',
    'siteLog.update.20260310.item1': 'З’явився чистіший employee workspace із зрозумілішим відображенням поточного етапу.',
    'siteLog.update.20260310.item2': 'Покращено структуру дошки, empty states і перший прохід по пошуку та фільтрах.',
    'siteLog.update.20260310.item3': 'Ключові картки завдань стало легше швидко переглядати протягом дня.',
    'siteLog.update.20260324.title': 'Покращення спільної роботи із завданнями',
    'siteLog.update.20260324.item1': 'Статуси учасників стали надійнішими для спільних і перепризначених завдань.',
    'siteLog.update.20260324.item2': 'Стабілізовано task detail і сценарії спілкування по завданнях.',
    'siteLog.update.20260324.item3': 'Сигнали дедлайнів і прострочень стали помітнішими в основних розділах.',
    'siteLog.update.20260408.title': 'Шаблони та операційний огляд',
    'siteLog.update.20260408.item1': 'Покращено роботу з шаблонами та повторюваними завданнями для регулярних процесів.',
    'siteLog.update.20260408.item2': 'Допрацьовано огляд навантаження, operations center і швидкі сценарії призначення завдань.',
    'siteLog.update.20260408.item3': 'Стани списку, календаря й фільтрів стали передбачуванішими на task-сторінках.',
    'siteLog.update.20260423.title': 'Релізна стабілізація та фінальна доводка',
    'siteLog.update.20260423.item1': 'Завершено повний прохід по стабільності з кращим захистом від повторних кліків і некоректних оновлень стану.',
    'siteLog.update.20260423.item2': 'Добито покриття перекладів для всіх підтримуваних мов.',
    'siteLog.update.20260423.item3': 'Додано окремий адмінський системний журнал і окремий журнал оновлень продукту.',
    'siteLog.update.20260423.item4': 'Прибрано старі хвости Activity і зайвий шум в адмінських сценаріях.',
});

Object.assign(translations.da, {
    'operations.searchAria': 'Sog i kontrolpanelet',
    'operations.metricsAria': 'Kontrolpanel malinger',
    'operations.priorityEyebrow': 'Fokus',
    'operations.priorityTitle': 'Hvad kraever opmaerksomhed nu',
    'operations.updatedAt': 'Opdateret',
    'operations.priorityOverdue': 'Forsinkede opgaver',
    'operations.priorityWithoutTasks': 'Medarbejdere uden opgaver',
    'operations.priorityPaused': 'Opgaver pa pause',
    'operations.priorityOverdueHelp': 'Kraever hurtig opfolgning',
    'operations.priorityWithoutTasksHelp': 'Klar til ny opgave',
    'operations.priorityPausedHelp': 'Tjek om noget blokerer',
    'operations.noOverdue': 'Ingen forsinkede opgaver',
    'operations.noWithoutTasks': 'Alle har tydeligt arbejde',
    'operations.noPaused': 'Ingen opgaver pa pause',
    'activityLog.showMore': 'Vis mere',
    'activityLog.showLess': 'Vis mindre',
});

Object.assign(translations.en, {
    'operations.searchAria': 'Search the control panel',
    'operations.metricsAria': 'Control panel metrics',
    'operations.priorityEyebrow': 'Focus',
    'operations.priorityTitle': 'What needs attention now',
    'operations.updatedAt': 'Updated',
    'operations.priorityOverdue': 'Overdue tasks',
    'operations.priorityWithoutTasks': 'Employees without tasks',
    'operations.priorityPaused': 'Paused tasks',
    'operations.priorityOverdueHelp': 'Needs quick follow-up',
    'operations.priorityWithoutTasksHelp': 'Ready for new work',
    'operations.priorityPausedHelp': 'Check what is blocking progress',
    'operations.noOverdue': 'No overdue tasks',
    'operations.noWithoutTasks': 'Everyone has clear work',
    'operations.noPaused': 'No paused tasks',
    'activityLog.showMore': 'Show more',
    'activityLog.showLess': 'Show less',
});

Object.assign(translations.ru, {
    'operations.searchAria': '\u041f\u043e\u0438\u0441\u043a \u0432 \u043f\u0430\u043d\u0435\u043b\u0438 \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f',
    'operations.metricsAria': '\u041c\u0435\u0442\u0440\u0438\u043a\u0438 \u043f\u0430\u043d\u0435\u043b\u0438 \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f',
    'operations.priorityEyebrow': '\u0424\u043e\u043a\u0443\u0441',
    'operations.priorityTitle': '\u0427\u0442\u043e \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u0432\u043d\u0438\u043c\u0430\u043d\u0438\u044f \u0441\u0435\u0439\u0447\u0430\u0441',
    'operations.updatedAt': '\u041e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u043e',
    'operations.priorityOverdue': '\u041f\u0440\u043e\u0441\u0440\u043e\u0447\u0435\u043d\u043d\u044b\u0435 \u0437\u0430\u0434\u0430\u0447\u0438',
    'operations.priorityWithoutTasks': '\u0421\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0438 \u0431\u0435\u0437 \u0437\u0430\u0434\u0430\u0447',
    'operations.priorityPaused': '\u0417\u0430\u0434\u0430\u0447\u0438 \u043d\u0430 \u043f\u0430\u0443\u0437\u0435',
    'operations.priorityOverdueHelp': '\u041d\u0443\u0436\u043d\u0430 \u0431\u044b\u0441\u0442\u0440\u0430\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430',
    'operations.priorityWithoutTasksHelp': '\u0413\u043e\u0442\u043e\u0432\u044b \u043a \u043d\u043e\u0432\u043e\u0439 \u0440\u0430\u0431\u043e\u0442\u0435',
    'operations.priorityPausedHelp': '\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435, \u0447\u0442\u043e \u043c\u0435\u0448\u0430\u0435\u0442 \u0434\u0432\u0438\u0436\u0435\u043d\u0438\u044e',
    'operations.noOverdue': '\u041d\u0435\u0442 \u043f\u0440\u043e\u0441\u0440\u043e\u0447\u0435\u043d\u043d\u044b\u0445 \u0437\u0430\u0434\u0430\u0447',
    'operations.noWithoutTasks': '\u0423 \u0432\u0441\u0435\u0445 \u0435\u0441\u0442\u044c \u043f\u043e\u043d\u044f\u0442\u043d\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430',
    'operations.noPaused': '\u041d\u0435\u0442 \u0437\u0430\u0434\u0430\u0447 \u043d\u0430 \u043f\u0430\u0443\u0437\u0435',
    'activityLog.showMore': '\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435',
    'activityLog.showLess': '\u0421\u0432\u0435\u0440\u043d\u0443\u0442\u044c',
});

Object.assign(translations.no, {
    'operations.searchAria': 'Sok i kontrollpanelet',
    'operations.metricsAria': 'Kontrollpanelmalinger',
    'operations.priorityEyebrow': 'Fokus',
    'operations.priorityTitle': 'Hva krever oppmerksomhet na',
    'operations.updatedAt': 'Oppdatert',
    'operations.priorityOverdue': 'Forsinkede oppgaver',
    'operations.priorityWithoutTasks': 'Ansatte uten oppgaver',
    'operations.priorityPaused': 'Oppgaver pa pause',
    'operations.priorityOverdueHelp': 'Krever rask oppfolging',
    'operations.priorityWithoutTasksHelp': 'Klar for nytt arbeid',
    'operations.priorityPausedHelp': 'Sjekk om noe blokkerer',
    'operations.noOverdue': 'Ingen forsinkede oppgaver',
    'operations.noWithoutTasks': 'Alle har tydelig arbeid',
    'operations.noPaused': 'Ingen oppgaver pa pause',
    'activityLog.showMore': 'Vis mer',
    'activityLog.showLess': 'Vis mindre',
});

Object.assign(translations.uk, {
    'operations.searchAria': '\u041f\u043e\u0448\u0443\u043a \u0443 \u043f\u0430\u043d\u0435\u043b\u0456 \u043a\u0435\u0440\u0443\u0432\u0430\u043d\u043d\u044f',
    'operations.metricsAria': '\u041c\u0435\u0442\u0440\u0438\u043a\u0438 \u043f\u0430\u043d\u0435\u043b\u0456 \u043a\u0435\u0440\u0443\u0432\u0430\u043d\u043d\u044f',
    'operations.priorityEyebrow': '\u0424\u043e\u043a\u0443\u0441',
    'operations.priorityTitle': '\u0429\u043e \u043f\u043e\u0442\u0440\u0435\u0431\u0443\u0454 \u0443\u0432\u0430\u0433\u0438 \u0437\u0430\u0440\u0430\u0437',
    'operations.updatedAt': '\u041e\u043d\u043e\u0432\u043b\u0435\u043d\u043e',
    'operations.priorityOverdue': '\u041f\u0440\u043e\u0441\u0442\u0440\u043e\u0447\u0435\u043d\u0456 \u0437\u0430\u0432\u0434\u0430\u043d\u043d\u044f',
    'operations.priorityWithoutTasks': '\u0421\u043f\u0456\u0432\u0440\u043e\u0431\u0456\u0442\u043d\u0438\u043a\u0438 \u0431\u0435\u0437 \u0437\u0430\u0432\u0434\u0430\u043d\u044c',
    'operations.priorityPaused': '\u0417\u0430\u0432\u0434\u0430\u043d\u043d\u044f \u043d\u0430 \u043f\u0430\u0443\u0437\u0456',
    'operations.priorityOverdueHelp': '\u041f\u043e\u0442\u0440\u0456\u0431\u043d\u0430 \u0448\u0432\u0438\u0434\u043a\u0430 \u043f\u0435\u0440\u0435\u0432\u0456\u0440\u043a\u0430',
    'operations.priorityWithoutTasksHelp': '\u0413\u043e\u0442\u043e\u0432\u0456 \u0434\u043e \u043d\u043e\u0432\u043e\u0457 \u0440\u043e\u0431\u043e\u0442\u0438',
    'operations.priorityPausedHelp': '\u041f\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435, \u0449\u043e \u0431\u043b\u043e\u043a\u0443\u0454 \u0440\u0443\u0445',
    'operations.noOverdue': '\u041d\u0435\u043c\u0430\u0454 \u043f\u0440\u043e\u0441\u0442\u0440\u043e\u0447\u0435\u043d\u0438\u0445 \u0437\u0430\u0432\u0434\u0430\u043d\u044c',
    'operations.noWithoutTasks': '\u0423 \u0432\u0441\u0456\u0445 \u0454 \u0437\u0440\u043e\u0437\u0443\u043c\u0456\u043b\u0430 \u0440\u043e\u0431\u043e\u0442\u0430',
    'operations.noPaused': '\u041d\u0435\u043c\u0430\u0454 \u0437\u0430\u0432\u0434\u0430\u043d\u044c \u043d\u0430 \u043f\u0430\u0443\u0437\u0456',
    'activityLog.showMore': '\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u0438 \u0431\u0456\u043b\u044c\u0448\u0435',
    'activityLog.showLess': '\u0417\u0433\u043e\u0440\u043d\u0443\u0442\u0438',
});

Object.assign(translations.da, {
    'employee.activeTasks': 'Aktive opgaver',
    'admin.quickActions': 'Hurtige handlinger',
});

Object.assign(translations.en, {
    'employee.activeTasks': 'Active tasks',
    'admin.quickActions': 'Quick actions',
});

Object.assign(translations.ru, {
    'employee.activeTasks': '\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0435 \u0437\u0430\u0434\u0430\u0447\u0438',
    'admin.quickActions': '\u0411\u044b\u0441\u0442\u0440\u044b\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f',
});

Object.assign(translations.no, {
    'employee.activeTasks': 'Aktive oppgaver',
    'admin.quickActions': 'Hurtige handlinger',
});

Object.assign(translations.uk, {
    'employee.activeTasks': '\u0410\u043a\u0442\u0438\u0432\u043d\u0456 \u0437\u0430\u0432\u0434\u0430\u043d\u043d\u044f',
    'admin.quickActions': '\u0428\u0432\u0438\u0434\u043a\u0456 \u0434\u0456\u0457',
});

Object.assign(translations.da, {
    'siteLog.update.20260427.title': 'Roligere kontrolpanel og handlingslog',
    'siteLog.update.20260427.item1': 'Kontrolpanelet fik et kompakt fokusfelt med forsinkede opgaver, medarbejdere uden opgaver og opgaver pa pause.',
    'siteLog.update.20260427.item2': 'Handlingsloggen viser nu de seneste tre haendelser forst og kan udvides efter behov.',
    'siteLog.update.20260427.item3': 'Medarbejdersiden fik en tydeligere statusoversigt, hurtige adminhandlinger og bedre tomme tilstande.',
});

Object.assign(translations.en, {
    'siteLog.update.20260427.title': 'Calmer control panel and activity log',
    'siteLog.update.20260427.item1': 'The control panel now has a compact focus block for overdue tasks, employees without tasks, and paused tasks.',
    'siteLog.update.20260427.item2': 'The activity log now shows the latest three events first and can be expanded when needed.',
    'siteLog.update.20260427.item3': 'The employee page now has a clearer status summary, quick admin actions, and better empty states.',
});

Object.assign(translations.ru, {
    'siteLog.update.20260427.title': '\u0411\u043e\u043b\u0435\u0435 \u0441\u043f\u043e\u043a\u043e\u0439\u043d\u0430\u044f \u043f\u0430\u043d\u0435\u043b\u044c \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u0438 \u0436\u0443\u0440\u043d\u0430\u043b',
    'siteLog.update.20260427.item1': '\u0412 \u043f\u0430\u043d\u0435\u043b\u044c \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d \u043a\u043e\u043c\u043f\u0430\u043a\u0442\u043d\u044b\u0439 \u0431\u043b\u043e\u043a \u0444\u043e\u043a\u0443\u0441\u0430: \u043f\u0440\u043e\u0441\u0440\u043e\u0447\u0435\u043d\u043d\u044b\u0435 \u0437\u0430\u0434\u0430\u0447\u0438, \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0438 \u0431\u0435\u0437 \u0437\u0430\u0434\u0430\u0447 \u0438 \u0437\u0430\u0434\u0430\u0447\u0438 \u043d\u0430 \u043f\u0430\u0443\u0437\u0435.',
    'siteLog.update.20260427.item2': '\u0416\u0443\u0440\u043d\u0430\u043b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439 \u0442\u0435\u043f\u0435\u0440\u044c \u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0435\u0442 \u043f\u0435\u0440\u0432\u044b\u0435 \u0442\u0440\u0438 \u0441\u043e\u0431\u044b\u0442\u0438\u044f \u0438 \u0440\u0430\u0441\u043a\u0440\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u043f\u043e \u043a\u043d\u043e\u043f\u043a\u0435.',
    'siteLog.update.20260427.item3': '\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0430 \u0441\u0442\u0430\u043b\u0430 \u043f\u043e\u043d\u044f\u0442\u043d\u0435\u0435: \u0441\u0432\u043e\u0434\u043a\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u0430, \u0431\u044b\u0441\u0442\u0440\u044b\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f \u0430\u0434\u043c\u0438\u043d\u0430 \u0438 \u0430\u043a\u043a\u0443\u0440\u0430\u0442\u043d\u044b\u0435 empty states.',
});

Object.assign(translations.no, {
    'siteLog.update.20260427.title': 'Roligere kontrollpanel og aktivitetslogg',
    'siteLog.update.20260427.item1': 'Kontrollpanelet fikk en kompakt fokusblokk for forsinkede oppgaver, ansatte uten oppgaver og oppgaver pa pause.',
    'siteLog.update.20260427.item2': 'Aktivitetsloggen viser na de tre siste hendelsene forst og kan utvides ved behov.',
    'siteLog.update.20260427.item3': 'Ansattsiden fikk tydeligere statussammendrag, raske adminhandlinger og bedre tomtilstander.',
});

Object.assign(translations.uk, {
    'siteLog.update.20260427.title': '\u0421\u043f\u043e\u043a\u0456\u0439\u043d\u0456\u0448\u0430 \u043f\u0430\u043d\u0435\u043b\u044c \u043a\u0435\u0440\u0443\u0432\u0430\u043d\u043d\u044f \u0442\u0430 \u0436\u0443\u0440\u043d\u0430\u043b',
    'siteLog.update.20260427.item1': '\u0423 \u043f\u0430\u043d\u0435\u043b\u044c \u043a\u0435\u0440\u0443\u0432\u0430\u043d\u043d\u044f \u0434\u043e\u0434\u0430\u043d\u043e \u043a\u043e\u043c\u043f\u0430\u043a\u0442\u043d\u0438\u0439 \u0431\u043b\u043e\u043a \u0444\u043e\u043a\u0443\u0441\u0443: \u043f\u0440\u043e\u0441\u0442\u0440\u043e\u0447\u0435\u043d\u0456 \u0437\u0430\u0432\u0434\u0430\u043d\u043d\u044f, \u0441\u043f\u0456\u0432\u0440\u043e\u0431\u0456\u0442\u043d\u0438\u043a\u0438 \u0431\u0435\u0437 \u0437\u0430\u0432\u0434\u0430\u043d\u044c \u0456 \u0437\u0430\u0432\u0434\u0430\u043d\u043d\u044f \u043d\u0430 \u043f\u0430\u0443\u0437\u0456.',
    'siteLog.update.20260427.item2': '\u0416\u0443\u0440\u043d\u0430\u043b \u0434\u0456\u0439 \u0442\u0435\u043f\u0435\u0440 \u043f\u043e\u043a\u0430\u0437\u0443\u0454 \u043f\u0435\u0440\u0448\u0456 \u0442\u0440\u0438 \u043f\u043e\u0434\u0456\u0457 \u0456 \u0440\u043e\u0437\u0433\u043e\u0440\u0442\u0430\u0454\u0442\u044c\u0441\u044f \u0437\u0430 \u043f\u043e\u0442\u0440\u0435\u0431\u0438.',
    'siteLog.update.20260427.item3': '\u0421\u0442\u043e\u0440\u0456\u043d\u043a\u0430 \u0441\u043f\u0456\u0432\u0440\u043e\u0431\u0456\u0442\u043d\u0438\u043a\u0430 \u0441\u0442\u0430\u043b\u0430 \u0437\u0440\u043e\u0437\u0443\u043c\u0456\u043b\u0456\u0448\u043e\u044e: \u0437\u0432\u0435\u0434\u0435\u043d\u043d\u044f \u0441\u0442\u0430\u0442\u0443\u0441\u0443, \u0448\u0432\u0438\u0434\u043a\u0456 \u0434\u0456\u0457 \u0430\u0434\u043c\u0456\u043d\u0430 \u0442\u0430 \u0430\u043a\u0443\u0440\u0430\u0442\u043d\u0456 empty states.',
});

Object.assign(translations.da, {
    'form.advancedOptions': 'Flere muligheder',
    'form.advancedOptionsHelp': 'Filer, deltagere, checkliste og skabelon',
});

Object.assign(translations.en, {
    'form.advancedOptions': 'Advanced options',
    'form.advancedOptionsHelp': 'Files, participants, checklist, and template',
});

Object.assign(translations.ru, {
    'form.advancedOptions': '\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u043e',
    'form.advancedOptionsHelp': '\u0424\u0430\u0439\u043b\u044b, \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0438, \u0447\u0435\u043a\u043b\u0438\u0441\u0442 \u0438 \u0448\u0430\u0431\u043b\u043e\u043d',
});

Object.assign(translations.no, {
    'form.advancedOptions': 'Flere valg',
    'form.advancedOptionsHelp': 'Filer, deltakere, sjekkliste og mal',
});

Object.assign(translations.uk, {
    'form.advancedOptions': '\u0414\u043e\u0434\u0430\u0442\u043a\u043e\u0432\u043e',
    'form.advancedOptionsHelp': '\u0424\u0430\u0439\u043b\u0438, \u0443\u0447\u0430\u0441\u043d\u0438\u043a\u0438, \u0447\u0435\u043a\u043b\u0456\u0441\u0442 \u0456 \u0448\u0430\u0431\u043b\u043e\u043d',
});

Object.values(translations).forEach(repairMojibakeDictionary);

const staticTextMap = {
    'Din konto blev oprettet.': 'messages.accountCreated',
    'Opgaven blev oprettet.': 'messages.taskCreated',
    'Opgaven blev tilfojet til medarbejderen.': 'messages.taskAssigned',
    'Opgaven blev opdateret.': 'messages.taskUpdated',
    'Opgaven blev slettet.': 'messages.taskDeleted',
    'Opgaven blev fjernet fra din oversigt.': 'messages.taskDismissed',
    'Valgte opgaver blev slettet.': 'messages.bulkDeleted',
    'Vaelg mindst en opgave.': 'errors.noTasksSelected',
    'Kun afsluttede opgaver kan fjernes.': 'task.dismissCompletedOnlyCompleted',
    'Filen blev fjernet.': 'messages.attachmentDeleted',
    'Angiv et navn til skabelonen.': 'errors.templateNameRequired',
    'Profilen blev opdateret.': 'messages.profileUpdated',
    'Profilbilledet blev opdateret.': 'messages.profilePhotoUpdated',
    'Profilbilledet blev fjernet.': 'messages.profilePhotoDeleted',
    'Din konto blev slettet.': 'messages.accountDeleted',
    'Kontoen blev slettet.': 'messages.employeeAccountDeleted',
    'Medarbejderkontoen blev opdateret.': 'messages.employeeAccountUpdated',
    'Beskeden blev sendt.': 'messages.messageSent',
    'Beskeden blev opdateret.': 'messages.messageUpdated',
    'Beskeden blev slettet.': 'messages.messageDeleted',
    'Der er ikke noget profilbillede at fjerne.': 'errors.noProfilePhoto',
    'Ejeren af systemet kan ikke slette sin egen konto.': 'errors.siteOwnerDeleteBlocked',
    'Din nuvaerende adgangskode blev indtastet forkert.': 'errors.currentPasswordInvalid',
    'Dette felt er paakraevet.': 'errors.requiredField',
    'This field is required.': 'errors.requiredField',
    'Dette brugernavn er allerede i brug.': 'errors.usernameTaken',
    'Denne email er allerede i brug.': 'errors.emailTaken',
    'Vaelg mindst en fil.': 'errors.attachmentRequired',
    'Filen skal vaere JPG, PNG, WEBP, PDF, TXT, CSV, DOC, DOCX, XLS eller XLSX.': 'errors.attachmentInvalidType',
    'Vaelg et billede at uploade.': 'errors.photoRequired',
    'Profilbilledet ma maksimalt fylde 4 MB.': 'errors.photoTooLarge',
    'Profilbilledet skal vaere en JPG, PNG eller WEBP fil.': 'errors.photoInvalidType',
    'Filtypen matcher ikke billedets indhold.': 'errors.photoMimeMismatch',
    'A user with that username already exists.': 'errors.usernameTaken',
    'The two password fields didn’t match.': 'errors.passwordMismatch',
    'The two password fields did not match.': 'errors.passwordMismatch',
    'This password is too short. It must contain at least 8 characters.': 'errors.passwordShort',
    'This password is too common.': 'errors.passwordCommon',
    'This password is entirely numeric.': 'errors.passwordNumeric',
    'This password is too similar to your other personal information.': 'errors.passwordSimilar',
    'Your old password was entered incorrectly. Please enter it again.': 'errors.currentPasswordInvalid',
    'Enter a valid email address.': 'errors.validEmail',
    'Old password': 'password.current',
    'Current password': 'password.current',
    'New password': 'password.new',
    'New password confirmation': 'password.confirm',
    'Brug mindst 8 tegn og undga almindelige eller helt simple adgangskoder.': 'password.help',
};

const staticTextPatterns = [
    {
        pattern: /^Skabelonen "(.+)" blev slettet\.$/,
        key: 'messages.templateDeleted',
        vars: ['name'],
    },
    {
        pattern: /^Filen ma maksimalt fylde ([\d.,]+) MB\.$/,
        key: 'errors.attachmentTooLarge',
        vars: ['size'],
    },
    {
        pattern: /^Profilbilledet ma maksimalt fylde ([\d.,]+) MB\.$/,
        key: 'errors.photoTooLargeDynamic',
        vars: ['size'],
    },
];

function translateKnownText(value) {
    const normalizedValue = String(value || '').trim();
    if (!normalizedValue) {
        return '';
    }

    const exactKey = staticTextMap[normalizedValue];
    if (exactKey) {
        return t(exactKey);
    }

    for (const item of staticTextPatterns) {
        const match = normalizedValue.match(item.pattern);
        if (!match) {
            continue;
        }

        const vars = {};
        (item.vars || []).forEach((name, index) => {
            vars[name] = match[index + 1] || '';
        });
        return t(item.key, vars);
    }

    return '';
}

function translateSelectOptions(root = document) {
    root.querySelectorAll('select').forEach((select) => {
        const fieldName = (select.name || '').split('-').pop();
        select.querySelectorAll('option').forEach((option) => {
            const value = option.value || '';
            let key = option.dataset.i18n || '';

            if (!key && fieldName === 'priority' && value) {
                key = `priority.${value}`;
            } else if (!key && fieldName === 'status' && value) {
                key = `status.${value}`;
            } else if (!key && fieldName === 'assigned_to' && !value) {
                key = 'board.unassigned';
            } else if (!key && fieldName === 'template_id' && !value) {
                key = 'templates.chooseTemplate';
            } else if (!key && fieldName === 'template_recurrence' && value) {
                key = `templates.recurrence.${value}`;
            }

            if (key) {
                option.textContent = t(key);
            }
        });
    });
}

function auditMessageAttributes(entry) {
    const attrs = ['data-audit-message'];
    if (entry.message_key) {
        attrs.push(`data-audit-key="${escapeHtml(entry.message_key)}"`);
    }
    Object.entries(entry.message_vars || {}).forEach(([name, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            attrs.push(`data-i18n-var-${escapeHtml(name)}="${escapeHtml(value)}"`);
        }
    });
    Object.entries(entry.message_var_keys || {}).forEach(([name, value]) => {
        if (value) {
            attrs.push(`data-i18n-var-key-${escapeHtml(name)}="${escapeHtml(value)}"`);
        }
    });
    return attrs.join(' ');
}

function formatAuditMessage(entry) {
    if (entry?.message_key) {
        return translateWithVars(entry.message_key, entry.message_vars || {}, entry.message_var_keys || {});
    }
    return translateKnownText(entry?.message || '') || (entry?.message || '');
}

function translateAuditMessages(root = document) {
    root.querySelectorAll('[data-audit-message]').forEach((node) => {
        const key = node.dataset.auditKey || '';
        if (key) {
            node.textContent = t(key, collectI18nVars(node));
            return;
        }
        const translated = translateKnownText(node.textContent);
        if (translated) {
            node.textContent = translated;
        }
    });
}

function syncDocumentTitle() {
    const titleNode = document.querySelector('.topbar h2, .auth-card h1');
    const pageTitle = titleNode?.textContent?.trim();
    document.title = pageTitle && pageTitle !== 'TaskMaster'
        ? `${pageTitle} | TaskMaster`
        : 'TaskMaster';
}

function translateStaticText(root = document) {
    root.querySelectorAll('.flash, .form-errors li, .error-note li, .password-form label, .password-form .form-help').forEach((node) => {
        const translated = translateKnownText(node.textContent);
        if (translated) {
            node.textContent = translated;
        }
    });

    root.querySelectorAll('[data-status-badge], [data-task-status-badge]').forEach((node) => {
        const statusKey = node.dataset.statusBadge || node.dataset.taskStatusBadge;
        node.textContent = t(`status.${statusKey}`);
    });

    root.querySelectorAll('[data-status-label]').forEach((node) => {
        node.textContent = t(node.dataset.statusLabel);
    });

    root.querySelectorAll('select[name="assigned_to"] option[value=""]').forEach((node) => {
        node.textContent = t('board.unassigned');
    });
}

function renderParticipantBadges(participants, emptyLabelKey = 'detail.noParticipants') {
    const names = Array.isArray(participants) ? participants.filter(Boolean) : [];
    if (!names.length) {
        return `<span class="badge">${escapeHtml(t(emptyLabelKey))}</span>`;
    }

    return names.map((name) => `<span class="badge">${escapeHtml(name)}</span>`).join('');
}

function renderTaskStatusOptions(selectedStatus) {
    const statuses = ['not_started', 'in_progress', 'paused', 'completed'];
    return statuses.map((status) => `
        <option value="${status}"${status === selectedStatus ? ' selected' : ''}>${escapeHtml(t(`status.${status}`))}</option>
    `).join('');
}

function renderTaskStatusCounts(statusCounts) {
    const items = Array.isArray(statusCounts) ? statusCounts.filter((item) => item.count) : [];
    if (!items.length) {
        return '';
    }

    return items.map((item) => `
        <span class="badge badge--status badge--status-${item.status}">
            ${item.count}
            <span data-status-badge="${item.status}">${escapeHtml(t(`status.${item.status}`))}</span>
        </span>
    `).join('');
}

function renderParticipantStatusList(participantStatuses, compact = false) {
    const items = Array.isArray(participantStatuses) ? participantStatuses.filter(Boolean) : [];
    if (!items.length) {
        return `<p class="muted" data-i18n="detail.noParticipants">${escapeHtml(t('detail.noParticipants'))}</p>`;
    }

    const listClass = compact ? 'participant-status-list participant-status-list--compact' : 'participant-status-list';
    return `
        <div class="${listClass}">
            ${items.map((item) => compact ? `
                <div class="participant-status-pill participant-status-pill--compact">
                    <span class="participant-status-pill__name">${escapeHtml(item.name)}</span>
                    <span class="badge badge--status badge--status-${item.status}" data-status-badge="${item.status}">${escapeHtml(t(`status.${item.status}`))}</span>
                </div>
            ` : `
                <div class="participant-status-pill">
                    <div class="participant-status-pill__meta">
                        <strong class="participant-status-pill__name">${escapeHtml(item.name)}</strong>
                        <span class="muted">@${escapeHtml(item.username)}</span>
                    </div>
                    <span class="badge badge--status badge--status-${item.status}" data-status-badge="${item.status}">${escapeHtml(t(`status.${item.status}`))}</span>
                    ${item.completed_at_text ? `<small class="muted">${escapeHtml(item.completed_at_text)}</small>` : ''}
                </div>
            `).join('')}
        </div>
    `;
}

function renderEditableTaskStatusControl(task, detail = false) {
    const detailClass = detail ? ' task-status-row--detail' : '';
    return `
        <div class="task-status-row${detailClass}">
            <span class="badge badge--status badge--status-${task.status}" data-task-status-badge="${task.status}">${escapeHtml(t(`status.${task.status}`))}</span>
            <label class="task-status-control">
                <span class="sr-only">${escapeHtml(t('task.statusAria'))}</span>
                <select class="select-input select-input--compact task-status-select" data-task-status data-status-url="${task.status_url}" aria-label="${escapeHtml(t('task.statusAria'))}">
                    ${renderTaskStatusOptions(task.status)}
                </select>
            </label>
        </div>
    `;
}

function renderCompletedTaskDismissAction(task) {
    if (!task.can_dismiss_completed || !task.dismiss_url) {
        return '';
    }

    return `
        <form method="post" action="${task.dismiss_url}" data-confirm-key="task.dismissCompletedConfirm">
            <input type="hidden" name="csrfmiddlewaretoken" value="${escapeHtml(getCsrfToken())}">
            <button type="submit" class="ghost-button danger-button">${escapeHtml(t('task.dismissCompleted'))}</button>
        </form>
    `;
}

function renderReadonlyTaskStatusSummary(task, detail = false) {
    const panelClass = detail ? 'task-status-panel task-status-panel--readonly' : 'task-status-row task-status-row--summary';
    return `
        <div class="${panelClass}">
            <span class="badge badge--status badge--status-${task.status}" data-task-status-badge="${task.status}">${escapeHtml(t(`status.${task.status}`))}</span>
            <div class="task-status-summary">${renderTaskStatusCounts(task.status_counts)}</div>
        </div>
    `;
}

function syncTaskStatusState(container, status, isCompleted) {
    if (!container) {
        return;
    }

    if (typeof isCompleted === 'boolean') {
        container.classList.toggle('is-complete', isCompleted);
        container.querySelector('[data-task-title]')?.classList.toggle('is-complete', isCompleted);
        container.querySelectorAll('[data-toggle-task]').forEach((node) => {
            node.checked = isCompleted;
        });
    }

    container.dataset.taskStatusValue = status;

    container.querySelectorAll('[data-task-status-badge]').forEach((badge) => {
        const currentStatus = badge.dataset.taskStatusBadge;
        if (currentStatus) {
            badge.classList.remove(`badge--status-${currentStatus}`);
        }
        badge.dataset.taskStatusBadge = status;
        badge.classList.add(`badge--status-${status}`);
        badge.textContent = t(`status.${status}`);
    });

    container.querySelectorAll('[data-task-status]').forEach((select) => {
        select.value = status;
    });
}

function renderAttentionLinks(items, emptyKey, formatter) {
    if (!Array.isArray(items) || !items.length) {
        return `<p class="muted" data-i18n="${emptyKey}">${escapeHtml(t(emptyKey))}</p>`;
    }
    return items.map(formatter).join('');
}

function renderFormErrors(errors) {
    if (!Array.isArray(errors) || !errors.length) {
        return '';
    }
    return `
        <ul class="form-errors">
            ${errors.map((error) => `<li>${escapeHtml(error)}</li>`).join('')}
        </ul>
    `;
}

function renderTaskRequestFeed(items) {
    return renderAttentionLinks(items, 'chat.noRequests', (item) => `
        <a href="${item.detail_url}#task-chat" class="attention-item attention-item--with-avatar">
            ${renderAvatarMarkup(item, { sizeClass: 'avatar--small', label: item.author_name })}
            <span class="attention-item__meta">
                <strong>${escapeHtml(item.author_name)} &middot; ${escapeHtml(item.task_title)}</strong>
                <div class="task-meta">
                    <span class="badge badge--status badge--status-paused" data-i18n="${item.kind_label_key}">${escapeHtml(t(item.kind_label_key))}</span>
                    <span class="badge">${escapeHtml(item.created_at_text)}</span>
                </div>
                <span class="muted">${escapeHtml(item.body_preview)}</span>
            </span>
        </a>
    `);
}

const TASK_MESSAGE_KINDS = ['note', 'clarification', 'change_request', 'blocker'];

function renderTaskMessageKindOptions(selectedKind) {
    return TASK_MESSAGE_KINDS.map((kind) => `
        <option value="${kind}"${kind === selectedKind ? ' selected' : ''} data-i18n="chat.kind.${kind}">${escapeHtml(t(`chat.kind.${kind}`))}</option>
    `).join('');
}

function getTaskDetailRoot() {
    return document.querySelector('[data-task-detail-root]');
}

function mergedTaskMessages(messages = appState.serverTaskMessages) {
    const serverMessages = Array.isArray(messages) ? messages : [];
    return [...serverMessages, ...appState.pendingTaskMessages];
}

function buildOptimisticTaskMessage(form) {
    const root = getTaskDetailRoot();
    const body = form.querySelector('[name="body"]')?.value.trim() || '';
    if (!body) {
        return null;
    }

    const kind = form.querySelector('[name="kind"]')?.value || 'note';
    return {
        id: `temp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        author_name: root?.dataset.currentUserName || '',
        author_username: '',
        is_admin: root?.dataset.currentUserIsAdmin === 'true',
        author_role_key: root?.dataset.currentUserRoleKey || 'role.employee',
        kind,
        kind_label_key: `chat.kind.${kind}`,
        body,
        created_at_text: t('chat.sending'),
        can_manage: false,
        edit_url: '',
        delete_url: '',
        is_pending: true,
        attachments: [],
    };
}

function renderAttachmentList(attachments, options = {}) {
    const { compact = false } = options;
    if (!Array.isArray(attachments) || !attachments.length) {
        return '';
    }

    const compactClass = compact ? ' attachment-list--message' : '';
    const chipClass = compact ? ' attachment-chip attachment-chip--compact' : 'attachment-chip';
    const deleteButtonClass = compact ? 'ghost-button ghost-button--compact' : 'ghost-button';

    return `
        <div class="attachment-list${compactClass}">
            ${attachments.map((attachment) => `
                <article class="${chipClass}">
                    <div class="attachment-chip__body">
                        <a href="${escapeHtml(attachment.url)}" target="_blank" rel="noopener">${escapeHtml(attachment.name)}</a>
                        <small class="muted">${escapeHtml(attachment.size_text || '')}</small>
                    </div>
                    <div class="inline-actions">
                        ${attachment.can_delete ? `
                            <form method="post" action="${attachment.delete_url}" data-confirm-key="attachments.deleteConfirm">
                                <input type="hidden" name="csrfmiddlewaretoken" value="${escapeHtml(getCsrfToken())}">
                                <button type="submit" class="${deleteButtonClass}" data-i18n="common.delete">${escapeHtml(t('common.delete'))}</button>
                            </form>
                        ` : ''}
                    </div>
                </article>
            `).join('')}
        </div>
    `;
}

function renderAuditLogList(entries) {
    if (!Array.isArray(entries) || !entries.length) {
        return `<p class="muted">${escapeHtml(t('audit.empty'))}</p>`;
    }

    return entries.map((entry) => `
        <article class="audit-log__item">
            ${renderAvatarMarkup({ avatar_url: entry.actor_avatar_url, avatar_initials: entry.actor_avatar_initials, name: entry.actor_name }, { sizeClass: 'avatar--small' })}
            <div class="audit-log__body">
                <div class="audit-log__meta">
                    <strong${entry.actor_name_key ? ` data-i18n="${escapeHtml(entry.actor_name_key)}"` : ''}>${escapeHtml(entry.actor_name_key ? t(entry.actor_name_key) : entry.actor_name)}</strong>
                    <span class="muted">${escapeHtml(entry.created_at_text)}</span>
                </div>
                <p ${auditMessageAttributes(entry)}>${escapeHtml(formatAuditMessage(entry))}</p>
            </div>
        </article>
    `).join('');
}

function renderTaskMessageCard(message) {
    const csrfToken = escapeHtml(getCsrfToken());
    return `
        <article class="task-message${message.is_admin ? ' task-message--admin' : ' task-message--employee'}${message.is_pending ? ' task-message--pending' : ''}" data-task-message-card data-task-message-id="${message.id}">
            <div class="task-message__meta-row">
                <div class="task-message__meta">
                    <strong>${escapeHtml(message.author_name)}</strong>
                    <span class="badge badge--status badge--status-${message.is_admin ? 'completed' : 'paused'}" data-i18n="${message.kind_label_key}">${escapeHtml(t(message.kind_label_key || `chat.kind.${message.kind}`))}</span>
                    <span class="badge" data-i18n="${message.author_role_key}">${escapeHtml(t(message.author_role_key))}</span>
                    <span class="muted">${escapeHtml(message.created_at_text)}</span>
                </div>
                ${message.can_manage ? `
                    <div class="task-message__controls">
                        <button type="button" class="ghost-button ghost-button--compact" data-task-message-edit-toggle data-i18n="common.edit">${escapeHtml(t('common.edit'))}</button>
                        <form method="post" action="${message.delete_url}" data-task-message-delete-form data-confirm-key="chat.deleteConfirm">
                            <input type="hidden" name="csrfmiddlewaretoken" value="${csrfToken}">
                            <button type="submit" class="ghost-button ghost-button--compact" data-i18n="common.delete">${escapeHtml(t('common.delete'))}</button>
                        </form>
                    </div>
                ` : ''}
            </div>
            <div data-task-message-display>
                <p>${escapeHtml(message.body).replaceAll('\n', '<br>')}</p>
                ${renderAttachmentList(message.attachments, { compact: true })}
            </div>
            ${message.can_manage ? `
                <form method="post" enctype="multipart/form-data" action="${message.edit_url}" class="task-message-editor" data-task-message-edit-form hidden>
                    <input type="hidden" name="csrfmiddlewaretoken" value="${csrfToken}">
                    <div class="form-field">
                        <label data-i18n="chat.kindLabel">${escapeHtml(t('chat.kindLabel'))}</label>
                        <select name="kind" class="select-input select-input--compact">
                            ${renderTaskMessageKindOptions(message.kind)}
                        </select>
                    </div>
                    <div class="form-field form-field--full">
                        <label data-i18n="chat.messageLabel">${escapeHtml(t('chat.messageLabel'))}</label>
                        <textarea name="body" class="textarea-input" rows="4" maxlength="1200" data-i18n-placeholder="chat.placeholder" placeholder="${escapeHtml(t('chat.placeholder'))}">${escapeHtml(message.body)}</textarea>
                    </div>
                    <div class="form-field form-field--full">
                        <label data-i18n="attachments.addToMessage">${escapeHtml(t('attachments.addToMessage'))}</label>
                        <input type="file" name="attachments" class="text-input" multiple accept=".jpg,.jpeg,.png,.webp,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx">
                    </div>
                    <div class="task-message__editor-actions">
                        <button type="submit" class="button button--compact" data-i18n="chat.saveEdit">${escapeHtml(t('chat.saveEdit'))}</button>
                        <button type="button" class="ghost-button ghost-button--compact" data-task-message-cancel data-i18n="common.cancel">${escapeHtml(t('common.cancel'))}</button>
                    </div>
                </form>
            ` : ''}
            <div data-task-message-feedback></div>
        </article>
    `;
}

function renderTaskMessageList(messages) {
    if (!Array.isArray(messages) || !messages.length) {
        return `
            <div class="empty-state empty-state--compact" data-task-message-empty>
                <p data-i18n="chat.empty">${escapeHtml(t('chat.empty'))}</p>
            </div>
        `;
    }

    return messages.map((message) => renderTaskMessageCard(message)).join('');
}

function isTaskMessageListNearBottom(list) {
    if (!list) {
        return true;
    }

    const distanceToBottom = list.scrollHeight - list.scrollTop - list.clientHeight;
    return distanceToBottom <= 96;
}

function scrollTaskMessageListToEnd(list = document.querySelector('[data-task-message-list]')) {
    if (!list) {
        return;
    }

    list.scrollTop = list.scrollHeight;
    appState.taskMessagesPinnedToBottom = true;
}

function syncTaskMessageScrollPreference(list = document.querySelector('[data-task-message-list]')) {
    appState.taskMessagesPinnedToBottom = isTaskMessageListNearBottom(list);
}

function setupTaskMessageList() {
    const list = document.querySelector('[data-task-message-list]');
    if (!list || list.dataset.scrollBound === 'true') {
        return;
    }

    list.dataset.scrollBound = 'true';
    list.addEventListener('scroll', () => {
        syncTaskMessageScrollPreference(list);
    }, { passive: true });

    requestAnimationFrame(() => {
        if (appState.taskMessagesPinnedToBottom) {
            scrollTaskMessageListToEnd(list);
        }
    });
}

function syncTaskMessages(messages, options = {}) {
    const { animate = true, scrollToEnd = false } = options;
    const previousMessages = Array.isArray(appState.taskMessages) ? [...appState.taskMessages] : [];
    appState.serverTaskMessages = Array.isArray(messages) ? [...messages] : [];
    appState.taskMessages = mergedTaskMessages(appState.serverTaskMessages);
    const list = document.querySelector('[data-task-message-list]');
    if (!list) {
        return;
    }
    const wasNearBottom = isTaskMessageListNearBottom(list);
    const previousLastMessageId = previousMessages.length ? String(previousMessages[previousMessages.length - 1].id) : '';
    const nextLastMessageId = appState.taskMessages.length ? String(appState.taskMessages[appState.taskMessages.length - 1].id) : '';
    const shouldStickToBottom =
        scrollToEnd ||
        appState.taskMessagesPinnedToBottom ||
        (wasNearBottom && previousLastMessageId !== nextLastMessageId);

    if (animate) {
        animationController.animateRefresh(list);
    }
    list.innerHTML = renderTaskMessageList(appState.taskMessages);
    if (animate) {
        animationController.animateInserted(list);
    }
    if (shouldStickToBottom) {
        scrollTaskMessageListToEnd(list);
    }
}

function appendPendingTaskMessage(message) {
    appState.pendingTaskMessages = [...appState.pendingTaskMessages, message];
    syncTaskMessages(appState.serverTaskMessages, { scrollToEnd: true });
}

function appendTaskMessage(message) {
    appState.serverTaskMessages = [...appState.serverTaskMessages, message];
    syncTaskMessages(appState.serverTaskMessages, { scrollToEnd: true });
}

function replaceTaskMessage(message, targetId = message.id) {
    const normalizedTargetId = String(targetId);
    const normalizedMessageId = String(message.id);
    let replaced = false;

    appState.pendingTaskMessages = appState.pendingTaskMessages.filter((item) => {
        const itemId = String(item.id);
        return itemId !== normalizedTargetId && itemId !== normalizedMessageId;
    });

    appState.serverTaskMessages = appState.serverTaskMessages.map((item) => {
        const itemId = String(item.id);
        if (itemId === normalizedTargetId || itemId === normalizedMessageId) {
            replaced = true;
            return message;
        }
        return item;
    });

    if (!replaced) {
        appState.serverTaskMessages = [...appState.serverTaskMessages, message];
    }

    syncTaskMessages(appState.serverTaskMessages);
}

function removeTaskMessage(messageId) {
    const normalizedMessageId = String(messageId);
    appState.pendingTaskMessages = appState.pendingTaskMessages.filter((message) => String(message.id) !== normalizedMessageId);
    appState.serverTaskMessages = appState.serverTaskMessages.filter((message) => String(message.id) !== normalizedMessageId);
    syncTaskMessages(appState.serverTaskMessages);
}

function clearTaskMessageFeedback(card) {
    const feedback = card?.querySelector('[data-task-message-feedback]');
    if (feedback) {
        feedback.innerHTML = '';
    }
}

function closeTaskMessageEditor(card, options = {}) {
    if (!card) {
        return;
    }

    const { reset = false } = options;
    const editor = card.querySelector('[data-task-message-edit-form]');
    const display = card.querySelector('[data-task-message-display]');
    if (!editor || editor.hidden) {
        return;
    }

    if (reset) {
        editor.reset();
    }

    editor.hidden = true;
    if (display) {
        display.hidden = false;
    }
    card.classList.remove('is-editing');
    clearTaskMessageFeedback(card);
    scheduleTaskPoll();
}

function openTaskMessageEditor(card) {
    if (!card) {
        return;
    }

    document.querySelectorAll('[data-task-message-card].is-editing').forEach((openCard) => {
        if (openCard !== card) {
            closeTaskMessageEditor(openCard, { reset: true });
        }
    });

    const editor = card.querySelector('[data-task-message-edit-form]');
    const display = card.querySelector('[data-task-message-display]');
    if (!editor) {
        return;
    }

    if (display) {
        display.hidden = true;
    }
    editor.hidden = false;
    card.classList.add('is-editing');
    clearTaskMessageFeedback(card);
    const textarea = editor.querySelector('textarea[name="body"]');
    if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
    scheduleTaskPoll(POLL_INTERVALS.taskWhileEditing);
}

function renderEmployeeAttentionList(summary) {
    if (Array.isArray(summary.priority_tasks) && summary.priority_tasks.length) {
        return summary.priority_tasks.map((task) => `
            <a href="${task.detail_url}" class="attention-item">
                <strong>${escapeHtml(task.title)}</strong>
                <div class="task-meta">
                    <span class="badge badge--status badge--status-${task.status}" data-status-badge="${task.status}">${escapeHtml(t(`status.${task.status}`))}</span>
                    ${task.is_overdue ? `<span class="badge badge--warning" data-i18n="admin.overdueSummary">${escapeHtml(t('admin.overdueSummary'))}</span>` : ''}
                    ${!task.is_overdue && task.is_due_soon ? `<span class="badge" data-i18n="admin.dueSoon">${escapeHtml(t('admin.dueSoon'))}</span>` : ''}
                </div>
                ${task.deadline_text ? `<span class="muted">${escapeHtml(task.deadline_text)}</span>` : ''}
            </a>
        `).join('');
    }

    if (summary.needs_assignment) {
        return `<p class="muted" data-i18n="employee.awaitingAssignmentHelp">${escapeHtml(t('employee.awaitingAssignmentHelp'))}</p>`;
    }

    return `<p class="muted" data-i18n="employee.noPriorityTasks">${escapeHtml(t('employee.noPriorityTasks'))}</p>`;
}

function syncBoardSummary(payload) {
    if (payload.admin_metrics) {
        Object.entries(payload.admin_metrics).forEach(([key, value]) => {
            if (key === 'distribution' || key === 'overall_progress') {
                return;
            }
            document.querySelectorAll(`[data-admin-stat="${key}"]`).forEach((node) => {
                node.textContent = value;
            });
        });

        document.querySelectorAll('[data-admin-progress-label]').forEach((node) => {
            node.textContent = `${payload.admin_metrics.overall_progress}%`;
        });
        document.querySelectorAll('[data-admin-progress]').forEach((node) => {
            animateProgressBar(node, payload.admin_metrics.overall_progress);
        });

        const homeAttentionList = document.querySelector('[data-home-attention-list]');
        if (homeAttentionList && payload.admin_attention) {
            homeAttentionList.innerHTML = renderAttentionLinks(payload.admin_attention.lagging_employees, 'admin.noLaggingEmployees', (employee) => `
                <a href="${employee.detail_url}" class="attention-item attention-item--with-avatar">
                    ${renderAvatarMarkup(employee, { sizeClass: 'avatar--small', label: employee.name })}
                    <span class="attention-item__meta">
                        <strong>${escapeHtml(employee.name)}</strong>
                        <span class="muted">${employee.overdue_count} ${escapeHtml(t('admin.overdueTasks'))}</span>
                    </span>
                </a>
            `);
        }

        document.querySelectorAll('[data-home-request-list], [data-task-request-list]').forEach((node) => {
            node.innerHTML = renderTaskRequestFeed(payload.task_requests || []);
        });
    }

    if (payload.employee_summary) {
        const summary = payload.employee_summary;
        const stage = document.querySelector('[data-employee-focus-stage]');
        if (stage) {
            if (summary.current_stage_key) {
                stage.dataset.i18n = summary.current_stage_key;
                stage.textContent = t(summary.current_stage_key);
            } else {
                delete stage.dataset.i18n;
                stage.textContent = summary.current_stage;
            }
        }
        document.querySelectorAll('[data-employee-focus-completed]').forEach((node) => {
            node.textContent = summary.completed_count;
        });
        document.querySelectorAll('[data-employee-focus-pending]').forEach((node) => {
            node.textContent = summary.pending_count;
        });
        document.querySelectorAll('[data-employee-focus-progress]').forEach((node) => {
            node.textContent = `${summary.progress_percent}%`;
        });
        document.querySelectorAll('[data-employee-focus-progress-label]').forEach((node) => {
            node.textContent = `${summary.progress_percent}%`;
        });
        document.querySelectorAll('[data-employee-focus-progress-bar]').forEach((node) => {
            animateProgressBar(node, summary.progress_percent);
        });
        document.querySelectorAll('[data-employee-focus-active]').forEach((node) => {
            node.textContent = summary.in_progress_count;
        });
        document.querySelectorAll('[data-employee-focus-paused]').forEach((node) => {
            node.textContent = summary.paused_count;
        });
        document.querySelectorAll('[data-employee-focus-paused-wrap]').forEach((node) => {
            node.classList.toggle('is-hidden', !summary.paused_count);
        });
        document.querySelectorAll('[data-employee-focus-status]').forEach((node) => {
            const currentStatus = node.dataset.employeeFocusStatus;
            if (currentStatus) {
                node.classList.remove(`badge--${currentStatus}`);
            }
            node.dataset.employeeFocusStatus = summary.status;
            node.dataset.statusBadge = summary.status;
            node.classList.add(`badge--${summary.status}`);
            node.textContent = t(`status.${summary.status}`);
        });

        const attentionWrap = document.querySelector('[data-employee-attention-wrap]');
        if (attentionWrap) {
            attentionWrap.classList.toggle('is-hidden', !summary.has_attention);
        }

        const attentionList = document.querySelector('[data-employee-attention-list]');
        if (attentionList) {
            attentionList.innerHTML = renderEmployeeAttentionList(summary);
        }
    }
}

function getCsrfToken() {
    const csrfCookie = document.cookie.split('; ').find((row) => row.startsWith('csrftoken='));
    return csrfCookie ? decodeURIComponent(csrfCookie.split('=')[1]) : '';
}

function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    setSetting('theme', theme);
}

function setMotion(motion) {
    document.documentElement.dataset.motion = motion;
    setSetting('motion', motion);
    animationController.observeReveal();
}

function setLanguage(language) {
    const nextLanguage = SUPPORTED_LANGUAGES.has(language) ? language : APP_SETTINGS.language.defaultValue;
    document.documentElement.dataset.language = nextLanguage;
    document.documentElement.lang = HTML_LANGUAGE_MAP[nextLanguage] || APP_SETTINGS.language.defaultValue;
    setSetting('language', nextLanguage);
    translateDom();
    rerenderDynamicViewsFromCache();
}

function translateDom(root = document) {
    root.querySelectorAll('[data-i18n]').forEach((node) => {
        node.textContent = t(node.dataset.i18n, collectI18nVars(node));
    });

    root.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
        node.setAttribute('placeholder', t(node.dataset.i18nPlaceholder));
    });

    root.querySelectorAll('[data-i18n-aria-label]').forEach((node) => {
        node.setAttribute('aria-label', t(node.dataset.i18nAriaLabel));
    });

    const themeLabel = document.querySelector('[data-theme-label]');
    if (themeLabel) {
        themeLabel.textContent = document.documentElement.dataset.theme === 'dark'
            ? t('settings.themeLight')
            : t('settings.themeDark');
    }

    translateStaticText(root);
    translateSelectOptions(root);
    translateAuditMessages(root);
    syncSettingsUI();
    syncDocumentTitle();
}

function syncSettingsUI() {
    const theme = getSetting('theme');
    const motion = getSetting('motion');
    const language = getSetting('language');

    document.querySelectorAll('[data-theme-toggle].switch').forEach((button) => {
        button.classList.toggle('is-on', theme === 'dark');
        button.setAttribute('aria-pressed', String(theme === 'dark'));
    });

    document.querySelectorAll('[data-motion-toggle]').forEach((button) => {
        button.classList.toggle('is-on', motion === 'full');
        button.setAttribute('aria-pressed', String(motion === 'full'));
    });

    document.querySelectorAll('[data-language-option]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.languageOption === language);
    });
}

function getOpenPanel() {
    if (appState.activePanel === 'sidebar') {
        return document.getElementById('sidebar');
    }
    if (appState.activePanel === 'settings') {
        return document.getElementById('settings-panel');
    }
    if (appState.activePanel === 'command') {
        return document.getElementById('command-palette');
    }
    return null;
}

function getFocusableElements(container) {
    if (!container) {
        return [];
    }

    return Array.from(
        container.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
    ).filter((element) => !element.hidden && element.offsetParent !== null);
}

function syncPanelToggleState() {
    const sidebarOpen = appState.activePanel === 'sidebar';
    const settingsOpen = appState.activePanel === 'settings';
    const commandOpen = appState.activePanel === 'command';

    document.querySelector('[data-sidebar-toggle]')?.setAttribute('aria-expanded', String(sidebarOpen));
    document.querySelectorAll('[data-settings-toggle]').forEach((button) => {
        button.setAttribute('aria-expanded', String(settingsOpen));
    });
    document.querySelectorAll('[data-command-palette-toggle]').forEach((button) => {
        button.setAttribute('aria-expanded', String(commandOpen));
    });
}

function closePanels(options = {}) {
    const { restoreFocus = true } = options;
    const sidebar = document.getElementById('sidebar');
    const settingsPanel = document.getElementById('settings-panel');
    const commandPalette = document.getElementById('command-palette');
    const overlay = document.querySelector('[data-shell-overlay]');
    if (sidebar) {
        sidebar.classList.remove('is-open');
        sidebar.setAttribute('aria-hidden', 'true');
    }
    if (settingsPanel) {
        settingsPanel.classList.remove('is-open');
        settingsPanel.setAttribute('aria-hidden', 'true');
    }
    if (commandPalette) {
        commandPalette.classList.remove('is-open');
        commandPalette.setAttribute('aria-hidden', 'true');
    }
    if (overlay) {
        overlay.hidden = true;
        overlay.classList.remove('is-visible');
    }
    document.body.classList.remove('is-shell-locked');
    appState.activePanel = null;
    syncPanelToggleState();

    if (restoreFocus && appState.panelFocusReturn instanceof HTMLElement) {
        appState.panelFocusReturn.focus();
    }
    appState.panelFocusReturn = null;
}

function openPanel(type, trigger = null) {
    const sidebar = document.getElementById('sidebar');
    const settingsPanel = document.getElementById('settings-panel');
    const commandPalette = document.getElementById('command-palette');
    const overlay = document.querySelector('[data-shell-overlay]');
    const focusReturn = trigger || document.activeElement;
    closePanels({ restoreFocus: false });
    appState.panelFocusReturn = focusReturn instanceof HTMLElement ? focusReturn : null;

    if (type === 'sidebar' && sidebar) {
        sidebar.classList.add('is-open');
        sidebar.setAttribute('aria-hidden', 'false');
        appState.activePanel = 'sidebar';
    }

    if (type === 'settings' && settingsPanel) {
        settingsPanel.classList.add('is-open');
        settingsPanel.setAttribute('aria-hidden', 'false');
        appState.activePanel = 'settings';
    }

    if (type === 'command' && commandPalette) {
        commandPalette.classList.add('is-open');
        commandPalette.setAttribute('aria-hidden', 'false');
        appState.activePanel = 'command';
    }

    if (overlay) {
        overlay.hidden = false;
        overlay.classList.add('is-visible');
    }

    document.body.classList.add('is-shell-locked');
    syncPanelToggleState();
    window.requestAnimationFrame(() => {
        const panel = getOpenPanel();
        const commandInput = type === 'command' ? document.querySelector('[data-command-palette-input]') : null;
        const focusTarget = commandInput || getFocusableElements(panel)[0] || panel;
        focusTarget?.focus();
        commandInput?.select?.();
        if (type === 'command') {
            refreshCommandPalette();
        }
    });
}

function trapOpenPanelFocus(event) {
    if (event.key !== 'Tab') {
        return;
    }

    const panel = getOpenPanel();
    const focusableElements = getFocusableElements(panel);
    if (!panel || !focusableElements.length) {
        return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
}

function setupPanels() {
    document.querySelector('[data-sidebar-toggle]')?.addEventListener('click', (event) => {
        const sidebar = document.getElementById('sidebar');
        const isOpen = sidebar?.classList.contains('is-open');
        if (isOpen) {
            closePanels();
        } else {
            openPanel('sidebar', event.currentTarget);
        }
    });

    document.querySelectorAll('[data-settings-toggle]').forEach((button) => {
        button.addEventListener('click', (event) => {
            const settingsPanel = document.getElementById('settings-panel');
            const isOpen = settingsPanel?.classList.contains('is-open');
            if (isOpen) {
                closePanels();
            } else {
                openPanel('settings', event.currentTarget);
            }
        });
    });

    document.querySelectorAll('[data-command-palette-toggle]').forEach((button) => {
        button.addEventListener('click', (event) => {
            const palette = document.getElementById('command-palette');
            const isOpen = palette?.classList.contains('is-open');
            if (isOpen) {
                closePanels();
            } else {
                openPanel('command', event.currentTarget);
            }
        });
    });

    document.querySelector('[data-settings-close]')?.addEventListener('click', closePanels);
    document.querySelector('[data-command-palette-close]')?.addEventListener('click', closePanels);
    document.querySelector('[data-shell-overlay]')?.addEventListener('click', closePanels);
    document.addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            if (appState.activePanel === 'command') {
                closePanels();
            } else {
                openPanel('command', document.querySelector('[data-command-palette-toggle]'));
            }
            return;
        }

        if (!getOpenPanel()) {
            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            closePanels();
            return;
        }

        trapOpenPanelFocus(event);
    });
    syncPanelToggleState();
}

function setupSettings() {
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
        button.addEventListener('click', () => {
            const nextTheme = getSetting('theme') === 'dark' ? 'light' : 'dark';
            setTheme(nextTheme);
            translateDom();
        });
    });

    document.querySelectorAll('[data-motion-toggle]').forEach((button) => {
        button.addEventListener('click', () => {
            const nextMotion = getSetting('motion') === 'full' ? 'off' : 'full';
            setMotion(nextMotion);
            translateDom();
        });
    });

    document.querySelectorAll('[data-language-option]').forEach((button) => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.languageOption);
        });
    });
}

function commandLinkCandidates() {
    return Array.from(
        document.querySelectorAll('.sidebar__nav a, .sidebar-quick-action, .profile-chip, .topbar__actions a')
    ).map((link) => ({
        href: link.getAttribute('href') || '',
        label: link.textContent?.trim() || '',
    })).filter((item) => item.href && item.label);
}

function commandTaskCandidates() {
    if (Array.isArray(appState.lastBoardData?.tasks) && appState.lastBoardData.tasks.length) {
        return appState.lastBoardData.tasks.map((task) => ({
            href: task.detail_url,
            label: task.title,
            meta: [task.assigned_to, task.deadline_text, task.priority_label].filter(Boolean).join(' | '),
        }));
    }

    return Array.from(document.querySelectorAll('[data-task-title] a')).map((link) => ({
        href: link.getAttribute('href') || '',
        label: link.textContent?.trim() || '',
        meta: '',
    })).filter((item) => item.href && item.label);
}

function dedupeCommandItems(items) {
    const seen = new Set();
    return items.filter((item) => {
        const signature = `${item.href}::${item.label}::${item.meta || ''}`;
        if (seen.has(signature)) {
            return false;
        }
        seen.add(signature);
        return true;
    });
}

function renderCommandPaletteList(container, items, emptyKey) {
    if (!container) {
        return;
    }

    if (!items.length) {
        container.innerHTML = `<div class="empty-state empty-state--compact"><p>${escapeHtml(t(emptyKey))}</p></div>`;
        return;
    }

    container.innerHTML = items.map((item) => `
        <a href="${escapeHtml(item.href)}" class="command-result" data-command-result>
            <strong>${escapeHtml(item.label)}</strong>
            ${item.meta ? `<span class="muted">${escapeHtml(item.meta)}</span>` : ''}
        </a>
    `).join('');
}

function refreshCommandPalette() {
    const query = (document.querySelector('[data-command-palette-input]')?.value || '').trim().toLowerCase();
    const match = (value) => !query || value.toLowerCase().includes(query);

    const links = dedupeCommandItems(commandLinkCandidates()).filter((item) => match(item.label)).slice(0, 8);
    const tasks = dedupeCommandItems(commandTaskCandidates()).filter((item) => match(`${item.label} ${item.meta}`)).slice(0, 8);

    renderCommandPaletteList(document.querySelector('[data-command-palette-links]'), links, 'command.noResults');
    renderCommandPaletteList(document.querySelector('[data-command-palette-tasks]'), tasks, 'command.noResults');
}

function setupCommandPalette() {
    const input = document.querySelector('[data-command-palette-input]');
    if (!input || input.dataset.bound === 'true') {
        return;
    }

    input.dataset.bound = 'true';
    input.addEventListener('input', refreshCommandPalette);
    document.addEventListener('click', (event) => {
        const result = event.target.closest('[data-command-result]');
        if (!result) {
            return;
        }
        closePanels({ restoreFocus: false });
    });
    refreshCommandPalette();
}

function setTaskListView(view) {
    appState.taskListView = view === 'calendar' ? 'calendar' : 'list';
    document.querySelectorAll('[data-list-view-option]').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.listViewOption === appState.taskListView);
    });
    document.querySelector('[data-task-calendar-card]')?.classList.toggle('is-hidden', appState.taskListView !== 'calendar');
    document.querySelector('[data-plain-task-list]')?.classList.toggle('is-hidden', appState.taskListView === 'calendar');
}

function calendarMonthAnchor() {
    const anchor = new Date();
    anchor.setDate(1);
    anchor.setHours(0, 0, 0, 0);
    anchor.setMonth(anchor.getMonth() + appState.calendarMonthOffset);
    return anchor;
}

function renderTaskCalendar(payload = appState.lastBoardData || { tasks: [] }) {
    const container = document.querySelector('[data-task-calendar]');
    const label = document.querySelector('[data-calendar-label]');
    if (!container || !label) {
        return;
    }

    const monthStart = calendarMonthAnchor();
    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
    const startDay = new Date(monthStart);
    startDay.setDate(monthStart.getDate() - ((monthStart.getDay() + 6) % 7));
    const tasks = Array.isArray(payload.tasks) ? payload.tasks.filter((task) => task.deadline_iso) : [];
    const locale = document.documentElement.lang || 'en';

    label.textContent = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(monthStart);

    if (!tasks.length) {
        container.innerHTML = `
            <div class="empty-state">
                <h4 class="section-title">${escapeHtml(t('calendar.noDeadlinesTitle'))}</h4>
                <p>${escapeHtml(t('calendar.noDeadlinesText'))}</p>
            </div>
        `;
        return;
    }

    const dayNames = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(2024, 0, 1 + index);
        return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date);
    });

    const cells = [];
    for (let offset = 0; offset < 42; offset += 1) {
        const current = new Date(startDay);
        current.setDate(startDay.getDate() + offset);
        const isoDate = current.toISOString().slice(0, 10);
        const isCurrentMonth = current >= monthStart && current <= monthEnd;
        const dayTasks = tasks
            .filter((task) => (task.deadline_iso || '').slice(0, 10) === isoDate)
            .sort((left, right) => Date.parse(left.deadline_iso) - Date.parse(right.deadline_iso));

        cells.push(`
            <article class="task-calendar__day${isCurrentMonth ? '' : ' is-muted'}">
                <div class="task-calendar__day-head">
                    <span>${current.getDate()}</span>
                    ${dayTasks.length ? `<span class="badge">${dayTasks.length}</span>` : ''}
                </div>
                <div class="task-calendar__events">
                    ${dayTasks.slice(0, 2).map((task) => `
                        <a href="${escapeHtml(task.detail_url)}" class="task-calendar__event">
                            <strong>${escapeHtml(task.title)}</strong>
                            <span class="muted">${escapeHtml(task.deadline_text || '')}</span>
                        </a>
                    `).join('')}
                    ${dayTasks.length > 2 ? `<span class="task-calendar__more">${escapeHtml(t('calendar.more', { count: dayTasks.length - 2 }))}</span>` : ''}
                </div>
            </article>
        `);
    }

    container.innerHTML = `
        <div class="task-calendar__weekdays">
            ${dayNames.map((name) => `<span>${escapeHtml(name)}</span>`).join('')}
        </div>
        <div class="task-calendar__grid">${cells.join('')}</div>
    `;
}

function setupTaskCalendarControls() {
    document.querySelectorAll('[data-list-view-option]').forEach((button) => {
        if (button.dataset.bound === 'true') {
            return;
        }
        button.dataset.bound = 'true';
        button.addEventListener('click', () => setTaskListView(button.dataset.listViewOption));
    });

    document.querySelectorAll('[data-calendar-nav]').forEach((button) => {
        if (button.dataset.bound === 'true') {
            return;
        }
        button.dataset.bound = 'true';
        button.addEventListener('click', () => {
            appState.calendarMonthOffset += Number(button.dataset.calendarNav || 0);
            renderTaskCalendar();
        });
    });
}

function setupOnboardingCards() {
    document.querySelectorAll('[data-onboarding-card]').forEach((card) => {
        const storageKey = `taskmaster-onboarding-dismissed:${card.dataset.onboardingKey || 'default'}`;
        try {
            if (localStorage.getItem(storageKey) === 'true') {
                card.remove();
                return;
            }
        } catch (error) {
            // Ignore unavailable storage.
        }

        card.querySelector('[data-onboarding-dismiss]')?.addEventListener('click', () => {
            try {
                localStorage.setItem(storageKey, 'true');
            } catch (error) {
                // Ignore unavailable storage.
            }
            card.remove();
        });
    });
}

async function postToggle(url, payload = null) {
    const options = {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCsrfToken(),
            'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'same-origin',
    };
    if (payload) {
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        options.body = new URLSearchParams(payload);
    }
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Toggle request failed');
    }
    return response.json();
}

function applyTaskState(checkbox, isCompleted) {
    const container = checkbox.closest('[data-task-row], [data-task-detail-root]');
    if (!container) {
        return;
    }
    container.classList.toggle('is-complete', isCompleted);
    container.querySelector('[data-task-title]')?.classList.toggle('is-complete', isCompleted);
}

function updateTaskStats() {
    const rows = Array.from(document.querySelectorAll('[data-task-row]'));
    if (!rows.length) {
        document.querySelectorAll('[data-stat-progress-label]').forEach((node) => {
            node.textContent = '0%';
        });
        document.querySelectorAll('[data-stat-progress-text]').forEach((node) => {
            node.textContent = t('board.progressText', { completed: 0, total: 0 });
        });
        document.querySelectorAll('[data-board-progress]').forEach((node) => {
            animateProgressBar(node, 0);
        });
        return;
    }
    const visibleRows = rows.filter((row) => !row.classList.contains('is-hidden'));
    const completed = rows.filter((row) => row.classList.contains('is-complete')).length;
    const active = rows.length - completed;
    const upcoming = rows.filter((row) => row.dataset.deadline === 'yes' && !row.classList.contains('is-complete')).length;
    const completionPercent = rows.length ? Math.round((completed / rows.length) * 100) : 0;

    const statMap = { total: rows.length, completed, active, upcoming, visible: visibleRows.length };
    Object.entries(statMap).forEach(([key, value]) => {
        document.querySelectorAll(`[data-stat="${key}"]`).forEach((node) => {
            node.textContent = value;
        });
    });

    document.querySelectorAll('[data-stat-progress-label]').forEach((node) => {
        node.textContent = `${completionPercent}%`;
    });
    document.querySelectorAll('[data-stat-progress-text]').forEach((node) => {
        node.textContent = t('board.progressText', { completed, total: rows.length });
    });
    document.querySelectorAll('[data-board-progress]').forEach((node) => {
        animateProgressBar(node, completionPercent);
    });
}

function boardFilterAllowsGroup(group) {
    if (appState.boardFilter === 'completed') {
        return group === 'completed';
    }

    if (['active', 'deadline'].includes(appState.boardFilter)) {
        return group === 'active';
    }

    return true;
}

function syncBoardSectionVisibility() {
    document.querySelectorAll('[data-board-group]').forEach((section) => {
        const group = section.dataset.boardGroup || 'active';
        const hasItems = section.dataset.hasItems === 'true';
        const rows = Array.from(section.querySelectorAll('[data-task-row]'));
        const visibleRows = rows.filter((row) => !row.classList.contains('is-hidden'));
        const shouldShow =
            visibleRows.length > 0 ||
            (!hasItems && group === 'active' && boardFilterAllowsGroup(group)) ||
            (!hasItems && group === 'completed' && appState.boardFilter === 'completed');

        section.classList.toggle('is-hidden', !shouldShow);
        section.querySelectorAll(`[data-board-group-count="${group}"]`).forEach((node) => {
            node.textContent = String(visibleRows.length);
        });
    });
}

function applyBoardFilters() {
    const queryCriteria = parseSmartTaskQuery(appState.boardQuery);
    const rows = document.querySelectorAll('[data-task-row]');
    rows.forEach((row) => {
        const matchesQuery = !appState.boardQuery || rowMatchesSmartTaskQuery(row, queryCriteria);
        const isComplete = row.classList.contains('is-complete');
        const matchesPriority = appState.priorityFilter === 'all' || row.dataset.priority === appState.priorityFilter;
        const matchesFilter =
            appState.boardFilter === 'all' ||
            (appState.boardFilter === 'active' && !isComplete) ||
            (appState.boardFilter === 'completed' && isComplete) ||
            (appState.boardFilter === 'deadline' && row.dataset.deadline === 'yes' && !isComplete) ||
            row.dataset.taskStatusValue === appState.boardFilter;
        row.classList.toggle('is-hidden', !(matchesQuery && matchesFilter && matchesPriority));
    });
    syncBoardSectionVisibility();
    updateTaskStats();
    syncBulkSelectionUI();
}

function pruneSelectedTaskIds(taskIds) {
    const validIds = new Set((taskIds || []).map((id) => String(id)));
    appState.selectedTaskIds.forEach((id) => {
        if (!validIds.has(id)) {
            appState.selectedTaskIds.delete(id);
        }
    });
}

function syncBulkSelectionUI() {
    const rows = Array.from(document.querySelectorAll('[data-task-row]'));
    const visibleRows = rows.filter((row) => !row.classList.contains('is-hidden') && row.querySelector('[data-select-task]'));
    const selectedIds = Array.from(appState.selectedTaskIds);

    rows.forEach((row) => {
        const taskId = String(row.dataset.taskId || '');
        const isSelected = appState.selectedTaskIds.has(taskId);
        row.classList.toggle('is-selected', isSelected);
        const checkbox = row.querySelector('[data-select-task]');
        if (checkbox) {
            checkbox.checked = isSelected;
        }
    });

    document.querySelectorAll('[data-bulk-selection-count]').forEach((node) => {
        node.textContent = String(selectedIds.length);
    });
    document.querySelectorAll('[data-bulk-selection-text]').forEach((node) => {
        node.textContent = t('board.bulkSelectionCount', { count: selectedIds.length });
    });

    const inputsContainer = document.querySelector('[data-bulk-selection-inputs]');
    if (inputsContainer) {
        inputsContainer.innerHTML = selectedIds
            .map((id) => `<input type="hidden" name="task_ids" value="${escapeHtml(id)}">`)
            .join('');
    }

    document.querySelectorAll('[data-bulk-delete-button]').forEach((button) => {
        button.disabled = !selectedIds.length;
    });
    document.querySelectorAll('[data-clear-selection]').forEach((button) => {
        button.disabled = !selectedIds.length;
    });
    document.querySelectorAll('[data-select-visible]').forEach((button) => {
        button.disabled = !visibleRows.length;
    });
}

function toggleTaskSelection(taskId, isSelected) {
    const normalizedId = String(taskId || '');
    if (!normalizedId) {
        return;
    }
    if (isSelected) {
        appState.selectedTaskIds.add(normalizedId);
    } else {
        appState.selectedTaskIds.delete(normalizedId);
    }
    syncBulkSelectionUI();
}

function selectVisibleTasks() {
    document.querySelectorAll('[data-task-row]').forEach((row) => {
        if (row.classList.contains('is-hidden')) {
            return;
        }
        const checkbox = row.querySelector('[data-select-task]');
        if (!checkbox) {
            return;
        }
        appState.selectedTaskIds.add(String(row.dataset.taskId));
    });
    syncBulkSelectionUI();
}

function clearTaskSelection() {
    appState.selectedTaskIds.clear();
    syncBulkSelectionUI();
}

function buildTaskSearchIndex(task) {
    const subtaskTitles = Array.isArray(task.subtasks)
        ? task.subtasks.map((subtask) => subtask.title || '').join(' ')
        : '';
    const statusText = [
        task.status,
        task.status_label,
        t(`status.${task.status}`),
        task.status === 'paused' ? 'on hold paused pause pa pause \u043d\u0430 \u043f\u0430\u0443\u0437\u0435 \u043d\u0430 \u043f\u0430\u0443\u0437\u0456' : '',
    ].filter(Boolean).join(' ');
    const priorityText = [task.priority, task.priority_label, t(`priority.${task.priority}`)].filter(Boolean).join(' ');

    return `${task.title} ${task.description} ${task.assigned_to} ${(task.assigned_users || []).join(' ')} ${statusText} ${priorityText} ${task.deadline_text || ''} ${subtaskTitles}`.toLowerCase();
}

function normalizeStatusQueryValue(value) {
    const normalized = String(value || '').trim().toLowerCase().replace(/\s+/g, '_').replaceAll('-', '_');
    const aliases = {
        paused: 'paused',
        pause: 'paused',
        hold: 'paused',
        on_hold: 'paused',
        onhold: 'paused',
        pa_pause: 'paused',
        'p\u00e5_pause': 'paused',
        '\u043d\u0430_\u043f\u0430\u0443\u0437\u0435': 'paused',
        '\u043d\u0430_\u043f\u0430\u0443\u0437\u0456': 'paused',
    };
    return aliases[normalized] || normalized;
}

function parseSmartTaskQuery(rawQuery) {
    const tokens = String(rawQuery || '').trim().toLowerCase().split(/\s+/).filter(Boolean);
    return tokens.reduce((criteria, token) => {
        if (token.startsWith('status:')) {
            const value = normalizeStatusQueryValue(token.slice(7));
            if (['not_started', 'in_progress', 'paused', 'completed'].includes(value)) {
                criteria.status = value;
                return criteria;
            }
        }

        if (token.startsWith('priority:')) {
            const value = token.slice(9);
            if (['low', 'medium', 'high'].includes(value)) {
                criteria.priority = value;
                return criteria;
            }
        }

        criteria.textTokens.push(token);
        return criteria;
    }, { textTokens: [], status: '', priority: '' });
}

function rowMatchesSmartTaskQuery(row, criteria) {
    const searchText = row.dataset.search || '';
    const rowStatus = row.dataset.taskStatusValue || '';
    const rowPriority = row.dataset.priority || '';

    if (criteria.status && rowStatus !== criteria.status) {
        return false;
    }

    if (criteria.priority && rowPriority !== criteria.priority) {
        return false;
    }

    return criteria.textTokens.every((token) => searchText.includes(token));
}

function taskMatchesSmartTaskQuery(task, criteria) {
    const searchText = buildTaskSearchIndex(task);

    if (criteria.status && task.status !== criteria.status) {
        return false;
    }

    if (criteria.priority && task.priority !== criteria.priority) {
        return false;
    }

    return criteria.textTokens.every((token) => searchText.includes(token));
}

function taskStatusToastKey(status) {
    if (status === 'completed') {
        return 'messages.taskCompletedNow';
    }
    if (status === 'paused') {
        return 'messages.taskPaused';
    }
    if (status === 'in_progress') {
        return 'messages.taskStarted';
    }
    return '';
}

function taskStatusToastType(status) {
    return status === 'completed' ? 'success' : 'info';
}

function renderTaskPriorityBadge(task) {
    const priorityKey = task.priority_key || `priority.${task.priority || 'medium'}`;
    return `<span class="badge badge--priority badge--priority-${escapeHtml(task.priority || 'medium')}" data-i18n="${escapeHtml(priorityKey)}">${escapeHtml(t(priorityKey))}</span>`;
}

function renderTaskQuickActions(task, canEdit, options = {}) {
    const { compact = false } = options;
    const compactClass = compact ? ' ghost-button--compact' : '';
    const actions = [`<a href="${task.detail_url}" class="ghost-button${compactClass}">${escapeHtml(t('common.open'))}</a>`];

    if (canEdit && task.can_edit) {
        actions.push(`<a href="${task.edit_url}" class="ghost-button${compactClass}">${escapeHtml(t('common.edit'))}</a>`);
        return actions;
    }

    if (task.can_update_status) {
        if (task.status !== 'in_progress') {
            actions.push(`<button type="button" class="ghost-button${compactClass}" data-quick-status="in_progress" data-status-url="${task.status_url}">${escapeHtml(t('task.startNow'))}</button>`);
        }
        if (task.status !== 'paused') {
            actions.push(`<button type="button" class="ghost-button${compactClass}" data-quick-status="paused" data-status-url="${task.status_url}">${escapeHtml(t('task.pauseNow'))}</button>`);
        }
        if (!task.is_completed) {
            actions.push(`<button type="button" class="button button--compact" data-quick-status="completed" data-status-url="${task.status_url}">${escapeHtml(t('task.markDone'))}</button>`);
        }
        return actions;
    }

    const dismissAction = renderCompletedTaskDismissAction(task);
    if (dismissAction) {
        actions.push(dismissAction);
    }
    return actions;
}

function renderBoardTask(task, canEdit) {
    const description = task.description_short ? `<p class="task-item__description">${escapeHtml(task.description_short)}</p>` : '';
    const additionalParticipants = Array.isArray(task.assigned_users)
        ? task.assigned_users.filter((name) => name && name !== task.assigned_to)
        : [];
    const statusControl = task.can_update_status
        ? renderEditableTaskStatusControl(task)
        : renderReadonlyTaskStatusSummary(task);
    const subtasksMarkup = Array.isArray(task.subtasks) && task.subtasks.length
        ? `
            <div class="board-subtasks">
                <div class="board-subtasks__header">
                    <span class="eyebrow">${escapeHtml(t('board.subtasksQuick'))}</span>
                    <span class="badge">${task.subtask_completed}/${task.subtask_total}</span>
                </div>
                <div class="board-subtasks__list">
                    ${task.subtasks.map((subtask) => `
                        <label class="board-subtask-item anim-enter" data-subtask-row data-subtask-id="${subtask.id}">
                            <input type="checkbox" class="checkbox-input" aria-label="${escapeHtml(t('detail.subtaskToggleAria'))}" data-toggle-subtask="/toggle_sub/${subtask.id}/" ${subtask.is_completed ? 'checked' : ''}>
                            <span class="subtask-text${subtask.is_completed ? ' is-complete' : ''}" data-subtask-text>${escapeHtml(subtask.title)}</span>
                            ${subtask.deadline_text ? `<small class="muted">${escapeHtml(subtask.deadline_text)}</small>` : ''}
                        </label>
                    `).join('')}
                </div>
            </div>
        `
        : '';
    const badges = [
        renderTaskPriorityBadge(task),
        `<span class="badge${task.assigned_to ? ' badge--primary' : ''}">${escapeHtml(task.assigned_to || t('board.unassigned'))}</span>`,
        additionalParticipants.length ? `<span class="badge">${escapeHtml(t('board.participantsBadge'))}</span>` : '',
        ...additionalParticipants.map((name) => `<span class="badge">${escapeHtml(name)}</span>`),
        task.has_deadline ? `<span class="badge badge--warning">${escapeHtml(task.deadline_text)}</span>` : '',
        task.attachment_count ? `<span class="badge">${escapeHtml(t('attachments.count', { count: task.attachment_count }))}</span>` : '',
        task.source_template_name ? `<span class="badge">${escapeHtml(task.source_template_name)}</span>` : '',
        task.is_completed ? `<span class="badge badge--success">${escapeHtml(t('board.doneBadge'))}</span>` : '',
    ].join('');
    const participantStatuses = !task.can_update_status ? renderParticipantStatusList(task.participant_statuses, true) : '';
    const searchIndex = buildTaskSearchIndex(task);
    const quickActions = renderTaskQuickActions(task, canEdit);
    const destructiveAction = canEdit && task.can_edit
        ? `
            <form method="post" action="${task.delete_url}" data-confirm-key="common.confirmDelete">
                <input type="hidden" name="csrfmiddlewaretoken" value="${escapeHtml(getCsrfToken())}">
                <button type="submit" class="ghost-button">${escapeHtml(t('common.delete'))}</button>
            </form>
        `
        : '';
    const actions = quickActions.length || destructiveAction
        ? `<div class="inline-actions">${quickActions.join('')}${destructiveAction}</div>`
        : '';
    const taskLeading = canEdit && task.can_edit
        ? `
            <div class="task-item__leading">
                <input
                    type="checkbox"
                    class="checkbox-input checkbox-input--select"
                    aria-label="${escapeHtml(t('board.selectTaskAria'))}"
                    data-select-task="${task.id}"
                >
                <span class="task-item__indicator task-item__indicator--${task.status}" aria-hidden="true"></span>
            </div>
        `
        : task.can_update_status
            ? `<input type="checkbox" class="checkbox-input" aria-label="${escapeHtml(t('board.taskToggleAria'))}" data-toggle-task="${task.toggle_url}" ${task.is_completed ? 'checked' : ''}>`
            : `<span class="task-item__indicator task-item__indicator--${task.status}" aria-hidden="true"></span>`;

    return `
        <article class="task-item anim-enter${task.is_completed ? ' is-complete' : ''}${task.can_update_status ? '' : ' task-item--readonly'}" data-task-row data-task-id="${task.id}" data-task-status-value="${task.status}" data-priority="${task.priority}" data-search="${escapeHtml(searchIndex)}" data-deadline="${task.has_deadline ? 'yes' : 'no'}" data-reveal>
            ${taskLeading}
            <div class="task-item__main">
                ${statusControl}
                <h4 class="task-item__title${task.is_completed ? ' is-complete' : ''}" data-task-title>
                    <a href="${task.detail_url}">${escapeHtml(task.title)}</a>
                </h4>
                ${description}
                <div class="task-meta">${badges}</div>
                ${participantStatuses}
                ${subtasksMarkup}
            </div>
            ${actions}
        </article>
    `;
}

function renderBoardTaskGroup(tasks, canEdit, group) {
    if (tasks.length) {
        return tasks.map((task) => renderBoardTask(task, canEdit)).join('');
    }

    const titleKey = group === 'completed' ? 'board.completedEmptyTitle' : 'board.activeEmptyTitle';
    const textKey = group === 'completed' ? 'board.completedEmptyText' : 'board.activeEmptyText';
    return `
        <div class="empty-state empty-state--compact" data-empty-state>
            <h3 class="section-title">${escapeHtml(t(titleKey))}</h3>
            <p>${escapeHtml(t(textKey))}</p>
            <div class="inline-actions">
                <a href="${canEdit ? '/create/' : '/tasks/list/'}" class="button button--secondary">${escapeHtml(t(canEdit ? 'board.emptyCtaAdmin' : 'board.emptyCtaEmployee'))}</a>
            </div>
        </div>
    `;
}

function taskMatchesCurrentFilters(task) {
    const criteria = parseSmartTaskQuery(appState.boardQuery);
    const matchesQuery = !appState.boardQuery || taskMatchesSmartTaskQuery(task, criteria);
    const matchesPriority = appState.priorityFilter === 'all' || task.priority === appState.priorityFilter;

    if (!matchesQuery || !matchesPriority) {
        return false;
    }

    if (['not_started', 'in_progress', 'paused', 'completed'].includes(appState.boardFilter)) {
        return task.status === appState.boardFilter;
    }

    if (appState.boardFilter === 'active') {
        return !task.is_completed;
    }

    if (appState.boardFilter === 'deadline') {
        return task.has_deadline && !task.is_completed;
    }

    return true;
}

function renderWallTaskCard(task, canEdit) {
    const additionalParticipants = Array.isArray(task.assigned_users)
        ? task.assigned_users.filter((name) => name && name !== task.assigned_to)
        : [];
    const description = task.description_short ? `<p class="task-item__description">${escapeHtml(task.description_short)}</p>` : '';
    const statusControl = task.can_update_status
        ? renderEditableTaskStatusControl(task)
        : renderReadonlyTaskStatusSummary(task);
    const progressPercent = task.subtask_total ? Math.round((task.subtask_completed / task.subtask_total) * 100) : (task.is_completed ? 100 : 0);
    const progressMarkup = task.subtask_total
        ? `
            <div class="task-wall-card__progress">
                <div class="progress-bar" aria-hidden="true">
                    <div class="progress-bar__value" style="--progress: ${progressPercent};"></div>
                </div>
                <small class="muted">${escapeHtml(t('wall.subtasksProgress', { completed: task.subtask_completed, total: task.subtask_total }))}</small>
            </div>
        `
        : '';
    const badges = [
        renderTaskPriorityBadge(task),
        `<span class="badge${task.assigned_to ? ' badge--primary' : ''}">${escapeHtml(task.assigned_to || t('board.unassigned'))}</span>`,
        additionalParticipants.length ? `<span class="badge">${escapeHtml(t('board.participantsBadge'))}</span>` : '',
        ...additionalParticipants.map((name) => `<span class="badge">${escapeHtml(name)}</span>`),
        task.has_deadline ? `<span class="badge badge--warning">${escapeHtml(task.deadline_text)}</span>` : '',
        task.attachment_count ? `<span class="badge">${escapeHtml(t('attachments.count', { count: task.attachment_count }))}</span>` : '',
    ].join('');
    const controls = task.can_update_status
        ? `<input type="checkbox" class="checkbox-input task-wall-card__toggle" aria-label="${escapeHtml(t('board.taskToggleAria'))}" data-toggle-task="${task.toggle_url}" ${task.is_completed ? 'checked' : ''}>`
        : `<span class="task-item__indicator task-item__indicator--${task.status}" aria-hidden="true"></span>`;
    const actionButtons = renderTaskQuickActions(task, canEdit);
    if (canEdit && task.can_edit) {
        actionButtons.push(`
            <form method="post" action="${task.delete_url}" data-confirm-key="common.confirmDelete">
                <input type="hidden" name="csrfmiddlewaretoken" value="${escapeHtml(getCsrfToken())}">
                <button type="submit" class="ghost-button">${escapeHtml(t('common.delete'))}</button>
            </form>
        `);
    }

    return `
        <article class="task-wall-card anim-enter${task.is_completed ? ' is-complete' : ''}" data-task-row data-task-id="${task.id}" data-task-status-value="${task.status}" data-priority="${task.priority}" data-status-url="${task.status_url}" data-can-drag="${task.can_update_status ? 'true' : 'false'}" draggable="${task.can_update_status ? 'true' : 'false'}" data-search="${escapeHtml(buildTaskSearchIndex(task))}" data-deadline="${task.has_deadline ? 'yes' : 'no'}">
            <div class="task-wall-card__toolbar">
                <div class="task-wall-card__signals">
                    ${controls}
                    ${task.is_completed ? `<span class="badge badge--success">${escapeHtml(t('board.doneBadge'))}</span>` : ''}
                </div>
                ${task.completed_at_text ? `<small class="muted">${escapeHtml(task.completed_at_text)}</small>` : ''}
            </div>
            ${statusControl}
            <div class="task-wall-card__body">
                <h4 class="task-item__title${task.is_completed ? ' is-complete' : ''}" data-task-title>
                    <a href="${task.detail_url}">${escapeHtml(task.title)}</a>
                </h4>
                ${description}
                <div class="task-meta">${badges}</div>
                ${progressMarkup}
            </div>
            <div class="task-wall-card__footer">
                <div class="task-wall-card__actions">
                    ${actionButtons.join('')}
                </div>
            </div>
        </article>
    `;
}

function renderPlainTaskList(payload) {
    const root = document.querySelector('[data-task-list-page-root]');
    const list = root?.querySelector('[data-plain-task-list]');
    if (!root || !list) {
        return;
    }

    const canEdit = root.dataset.userCanEdit === 'true';
    const tasks = (payload.tasks || []).filter((task) => taskMatchesCurrentFilters(task));
    animationController.animateRefresh(list);
    list.innerHTML = tasks.length
        ? tasks.map((task, index) => `
            <article class="task-list-row anim-enter${task.is_completed ? ' is-complete' : ''}" data-plain-task-row data-task-row data-task-id="${task.id}" data-task-status-value="${task.status}" data-priority="${task.priority}" data-search="${escapeHtml(buildTaskSearchIndex(task))}" data-deadline="${task.has_deadline ? 'yes' : 'no'}">
                ${canEdit ? `
                    <div class="task-list-row__leading">
                        <input
                            type="checkbox"
                            class="checkbox-input checkbox-input--select"
                            aria-label="${escapeHtml(t('board.selectTaskAria'))}"
                            data-select-task="${task.id}"
                        >
                        <div class="task-list-row__number">${index + 1}</div>
                    </div>
                ` : task.can_update_status ? `
                    <div class="task-list-row__leading">
                        <input
                            type="checkbox"
                            class="checkbox-input"
                            aria-label="${escapeHtml(t('board.taskToggleAria'))}"
                            data-toggle-task="${task.toggle_url}"
                            ${task.is_completed ? 'checked' : ''}
                        >
                        <div class="task-list-row__number">${index + 1}</div>
                    </div>
                ` : `<div class="task-list-row__number">${index + 1}</div>`}
                <div class="task-list-row__content">
                    <a href="${task.detail_url}" class="task-list-row__title${task.is_completed ? ' is-complete' : ''}" data-task-title>${escapeHtml(task.title)}</a>
                    <div class="task-list-row__meta">
                        ${renderTaskPriorityBadge(task)}
                        <span class="badge badge--status badge--status-${task.status}" data-task-status-badge="${task.status}">${escapeHtml(t(`status.${task.status}`))}</span>
                        ${task.assigned_to ? `<span class="muted">${escapeHtml(task.assigned_to)}</span>` : ''}
                        ${task.deadline_text ? `<span class="muted">${escapeHtml(task.deadline_text)}</span>` : ''}
                    </div>
                    ${Array.isArray(task.subtasks) && task.subtasks.length ? `
                        <div class="task-list-row__subtasks">
                            <div class="task-list-row__subtasks-head">
                                <span class="task-list-row__subtasks-label" data-i18n="list.subtasks">${escapeHtml(t('list.subtasks'))}</span>
                                <span class="badge">${task.subtask_completed}/${task.subtask_total}</span>
                            </div>
                            <div class="task-list-row__subtask-list">
                                ${task.subtasks.map((subtask) => `
                                    <span class="task-list-subtask${subtask.is_completed ? ' is-complete' : ''}">
                                        <span class="task-list-subtask__dot" aria-hidden="true"></span>
                                        <span>${escapeHtml(subtask.title)}</span>
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
                <div class="task-list-row__actions">
                    ${renderTaskQuickActions(task, canEdit, { compact: true }).join('')}
                    ${canEdit && task.can_edit ? `
                        <form method="post" action="${task.delete_url}" data-confirm-key="common.confirmDelete">
                            <input type="hidden" name="csrfmiddlewaretoken" value="${escapeHtml(getCsrfToken())}">
                            <button type="submit" class="ghost-button ghost-button--compact">${escapeHtml(t('common.delete'))}</button>
                        </form>
                    ` : ''}
                </div>
            </article>
        `).join('')
        : `
            <div class="empty-state">
                <p data-i18n="list.empty">${escapeHtml(t('list.empty'))}</p>
                <div class="inline-actions">
                    <a href="${canEdit ? '/create/' : '/'}" class="button button--secondary">${escapeHtml(t(canEdit ? 'board.emptyCtaAdmin' : 'common.back'))}</a>
                </div>
            </div>
        `;

    document.querySelectorAll('[data-stat="total"]').forEach((node) => {
        node.textContent = tasks.length;
    });
    syncBulkSelectionUI();
    animationController.animateInserted(list);
    renderTaskCalendar({ ...payload, tasks });
}

function syncTaskWallSummary(tasks) {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.is_completed).length;
    const active = total - completed;
    const upcoming = tasks.filter((task) => task.has_deadline && !task.is_completed).length;
    const completionPercent = total ? Math.round((completed / total) * 100) : 0;
    const now = Date.now();
    const soonThreshold = now + (72 * 60 * 60 * 1000);

    const metrics = tasks.reduce((summary, task) => {
        if (task.status === 'paused') {
            summary.paused += 1;
        }

        if ((task.assigned_users || []).filter(Boolean).length > 1) {
            summary.shared += 1;
        }

        if (task.deadline_iso && !task.is_completed) {
            const deadlineValue = Date.parse(task.deadline_iso);
            if (!Number.isNaN(deadlineValue)) {
                if (deadlineValue < now) {
                    summary.overdue += 1;
                } else if (deadlineValue <= soonThreshold) {
                    summary.due_soon += 1;
                }
            }
        }

        return summary;
    }, { due_soon: 0, overdue: 0, paused: 0, shared: 0 });

    const statMap = {
        total,
        active,
        completed,
        visible: total,
        upcoming,
    };

    Object.entries(statMap).forEach(([key, value]) => {
        document.querySelectorAll(`[data-stat="${key}"]`).forEach((node) => {
            node.textContent = value;
        });
    });

    Object.entries(metrics).forEach(([key, value]) => {
        document.querySelectorAll(`[data-wall-stat="${key}"]`).forEach((node) => {
            node.textContent = value;
        });
    });

    document.querySelectorAll('[data-stat-progress-label]').forEach((node) => {
        node.textContent = `${completionPercent}%`;
    });
    document.querySelectorAll('[data-stat-progress-text]').forEach((node) => {
        node.textContent = t('board.progressText', { completed, total });
    });
    document.querySelectorAll('[data-board-progress]').forEach((node) => {
        animateProgressBar(node, completionPercent);
    });

    syncOperationsSearchSummary({ taskCount: total });
}

function filterOperationsEmployees() {
    const rows = Array.from(document.querySelectorAll('[data-operations-employee-row]'));
    const emptyRow = document.querySelector('[data-operations-employee-empty]');
    const tokens = (appState.boardQuery || '').split(/\s+/).filter(Boolean);

    let visibleCount = 0;
    rows.forEach((row) => {
        const searchText = row.dataset.search || '';
        const isVisible = !tokens.length || tokens.every((token) => searchText.includes(token));
        row.hidden = !isVisible;
        if (isVisible) {
            visibleCount += 1;
        }
    });

    if (emptyRow) {
        emptyRow.hidden = !rows.length || visibleCount > 0;
    }

    syncOperationsSearchSummary({ employeeCount: visibleCount });
}

function syncOperationsSearchSummary(overrides = {}) {
    document.querySelectorAll('[data-operations-search-summary]').forEach((node) => {
        const employeeCount = overrides.employeeCount ?? Number(node.dataset.employeeVisible || node.dataset.employeeTotal || 0);
        const taskCount = overrides.taskCount ?? Number(node.dataset.taskVisible || node.dataset.taskTotal || 0);
        node.dataset.employeeVisible = String(employeeCount);
        node.dataset.taskVisible = String(taskCount);
        node.textContent = t('operations.searchSummary', { employees: employeeCount, tasks: taskCount });
    });
}

function clearOperationsSearch() {
    document.querySelectorAll('[data-operations-search], [data-wall-search], [data-task-search]').forEach((input) => {
        input.value = '';
    });
    appState.boardQuery = '';
    filterOperationsEmployees();
    reapplyTaskFilters();
}

function filterActivityLog() {
    const entries = Array.from(document.querySelectorAll('[data-activity-log-entry]'));
    if (!entries.length) {
        return;
    }

    const root = document.querySelector('[data-activity-log-root]');
    const isExpanded = root?.dataset.activityLogExpanded === 'true';
    const activeButton = document.querySelector('[data-activity-log-filter].is-active');
    const activeScope = activeButton?.dataset.activityLogFilter || 'all';
    const query = (document.querySelector('[data-activity-log-search]')?.value || '').trim().toLowerCase();
    const tokens = query.split(/\s+/).filter(Boolean);
    let matchingCount = 0;

    entries.forEach((entry) => {
        const scopeMatches = activeScope === 'all' || entry.dataset.activityLogScope === activeScope;
        const searchText = entry.dataset.search || '';
        const searchMatches = !tokens.length || tokens.every((token) => searchText.includes(token));
        const matches = scopeMatches && searchMatches;
        const isCollapsedExtra = entry.hasAttribute('data-activity-log-extra') && !isExpanded;
        entry.hidden = !matches || isCollapsedExtra;
        if (matches) {
            matchingCount += 1;
        }
    });

    const emptyState = document.querySelector('[data-activity-log-empty]');
    if (emptyState) {
        emptyState.hidden = matchingCount > 0;
    }

    document.querySelectorAll('[data-activity-log-toggle]').forEach((button) => {
        const hasExtraMatches = entries.some((entry) => {
            if (!entry.hasAttribute('data-activity-log-extra')) {
                return false;
            }
            const scopeMatches = activeScope === 'all' || entry.dataset.activityLogScope === activeScope;
            const searchText = entry.dataset.search || '';
            const searchMatches = !tokens.length || tokens.every((token) => searchText.includes(token));
            return scopeMatches && searchMatches;
        });
        button.hidden = !hasExtraMatches;
        button.textContent = t(isExpanded ? 'activityLog.showLess' : 'activityLog.showMore');
    });
}

function setupActivityLogToggle() {
    document.querySelectorAll('[data-activity-log-toggle]').forEach((button) => {
        if (button.dataset.activityLogToggleBound === 'true') {
            return;
        }
        button.dataset.activityLogToggleBound = 'true';
        button.addEventListener('click', () => {
            const root = document.querySelector('[data-activity-log-root]');
            if (root) {
                root.dataset.activityLogExpanded = root.dataset.activityLogExpanded === 'true' ? 'false' : 'true';
            }
            filterActivityLog();
        });
    });
}

function setupActivityLogFilters() {
    document.querySelectorAll('[data-activity-log-filter]').forEach((button) => {
        if (button.dataset.activityLogBound === 'true') {
            return;
        }
        button.dataset.activityLogBound = 'true';
        button.addEventListener('click', () => {
            document.querySelectorAll('[data-activity-log-filter]').forEach((item) => {
                item.classList.toggle('is-active', item === button);
            });
            filterActivityLog();
        });
    });

    document.querySelectorAll('[data-activity-log-search]').forEach((input) => {
        if (input.dataset.activityLogBound === 'true') {
            return;
        }
        input.dataset.activityLogBound = 'true';
        input.addEventListener('input', filterActivityLog);
    });

    setupActivityLogToggle();
}

function setupOperationsJumps() {
    document.querySelectorAll('[data-operations-jump]').forEach((link) => {
        if (link.dataset.operationsJumpBound === 'true') {
            return;
        }
        link.dataset.operationsJumpBound = 'true';
        link.addEventListener('click', () => {
            document.querySelectorAll('[data-operations-jump]').forEach((item) => {
                item.classList.toggle('is-active', item === link);
            });
        });
    });
}

function renderTaskWall(payload) {
    const root = document.querySelector('[data-task-wall-root]');
    if (!root) {
        return;
    }

    const canEdit = root.dataset.userCanEdit === 'true';
    const filteredTasks = (payload.tasks || []).filter((task) => taskMatchesCurrentFilters(task));
    const columns = {
        not_started: [],
        in_progress: [],
        paused: [],
        completed: [],
    };

    filteredTasks.forEach((task) => {
        const key = columns[task.status] ? task.status : 'not_started';
        columns[key].push(task);
    });

    Object.entries(columns).forEach(([status, items]) => {
        const countNode = root.querySelector(`[data-wall-count="${status}"]`);
        const listNode = root.querySelector(`[data-wall-list="${status}"]`);

        if (countNode) {
            countNode.textContent = items.length;
        }

        if (!listNode) {
            return;
        }

        animationController.animateRefresh(listNode);
        listNode.innerHTML = items.length
            ? items.map((task) => renderWallTaskCard(task, canEdit)).join('')
            : `<div class="empty-state empty-state--compact"><p data-i18n="wall.emptyColumn">${escapeHtml(t('wall.emptyColumn'))}</p></div>`;
        animationController.animateInserted(listNode);
    });

    syncTaskWallSummary(filteredTasks);
    setupWallDragAndDrop(root);
    animationController.observeReveal(root);
}

function setupWallDragAndDrop(root = document.querySelector('[data-task-wall-root]')) {
    if (!root) {
        return;
    }

    root.querySelectorAll('[data-wall-list]').forEach((column) => {
        if (column.dataset.dragBound === 'true') {
            return;
        }
        column.dataset.dragBound = 'true';

        column.addEventListener('dragover', (event) => {
            if (!appState.activeDraggedTaskId) {
                return;
            }
            event.preventDefault();
            column.classList.add('is-drop-target');
        });

        column.addEventListener('dragleave', () => {
            column.classList.remove('is-drop-target');
        });

        column.addEventListener('drop', async (event) => {
            if (!appState.activeDraggedTaskId) {
                return;
            }
            event.preventDefault();
            column.classList.remove('is-drop-target');

            const card = root.querySelector(`[data-task-id="${appState.activeDraggedTaskId}"]`);
            const statusUrl = card?.dataset.statusUrl || '';
            const nextStatus = column.dataset.wallList || '';
            const currentStatus = card?.dataset.taskStatusValue || '';
            if (!card || !statusUrl || !nextStatus || nextStatus === currentStatus) {
                return;
            }

            card.classList.add('is-drag-loading');
            try {
                const data = await postToggle(statusUrl, { status: nextStatus });
                showToast(taskStatusToastKey(data.task_status) || 'messages.taskUpdated', { type: taskStatusToastType(data.task_status) });
                await refreshBoardData();
                await refreshTaskDetailData();
            } catch (error) {
                showToast('messages.taskUpdateError', { type: 'error' });
            } finally {
                card.classList.remove('is-drag-loading');
                appState.activeDraggedTaskId = '';
            }
        });
    });

    root.querySelectorAll('[data-wall-list] [data-task-row]').forEach((card) => {
        if (card.dataset.dragCardBound === 'true') {
            return;
        }
        card.dataset.dragCardBound = 'true';

        card.addEventListener('dragstart', (event) => {
            if (card.dataset.canDrag !== 'true') {
                event.preventDefault();
                return;
            }
            appState.activeDraggedTaskId = card.dataset.taskId || '';
            card.classList.add('is-dragging');
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', appState.activeDraggedTaskId);
        });

        card.addEventListener('dragend', () => {
            appState.activeDraggedTaskId = '';
            card.classList.remove('is-dragging');
            root.querySelectorAll('[data-wall-list]').forEach((column) => column.classList.remove('is-drop-target'));
        });
    });
}

function getBoardDataRoot() {
    return document.querySelector('[data-board-root], [data-task-wall-root], [data-task-list-page-root]');
}

function renderBoardTasks(payload) {
    const boardRoot = document.querySelector('[data-board-root]');
    const activeList = boardRoot?.querySelector('[data-task-list-active]');
    const completedList = boardRoot?.querySelector('[data-task-list-completed]');
    if (!boardRoot || !activeList || !completedList) {
        return;
    }

    const canEdit = boardRoot.dataset.userCanEdit === 'true';
    const activeTasks = payload.tasks.filter((task) => !task.is_completed);
    const completedTasks = payload.tasks.filter((task) => task.is_completed);
    boardRoot.querySelectorAll('[data-board-group="active"]').forEach((section) => {
        section.dataset.hasItems = activeTasks.length ? 'true' : 'false';
    });
    boardRoot.querySelectorAll('[data-board-group="completed"]').forEach((section) => {
        section.dataset.hasItems = completedTasks.length ? 'true' : 'false';
    });
    pruneSelectedTaskIds(payload.tasks.map((task) => task.id));
    animationController.animateRefresh(activeList);
    animationController.animateRefresh(completedList);
    activeList.innerHTML = renderBoardTaskGroup(activeTasks, canEdit, 'active');
    completedList.innerHTML = renderBoardTaskGroup(completedTasks, canEdit, 'completed');

    Object.entries(payload.stats).forEach(([key, value]) => {
        document.querySelectorAll(`[data-stat="${key}"]`).forEach((node) => {
            node.textContent = value;
        });
    });
    document.querySelectorAll('[data-stat-progress-label]').forEach((node) => {
        node.textContent = `${payload.stats.completion_percent}%`;
    });
    document.querySelectorAll('[data-stat-progress-text]').forEach((node) => {
        node.textContent = t('board.progressText', {
            completed: payload.stats.completed,
            total: payload.stats.total,
        });
    });
    document.querySelectorAll('[data-board-progress]').forEach((node) => {
        animateProgressBar(node, payload.stats.completion_percent);
    });

    syncBoardSummary(payload);
    applyBoardFilters();
    animationController.animateInserted(activeList);
    animationController.animateInserted(completedList);
    animationController.observeReveal(document);
}

async function refreshBoardData() {
    const boardRoot = getBoardDataRoot();
    if (!boardRoot || appState.isBoardRefreshing) {
        return;
    }

    const controller = 'AbortController' in window ? new AbortController() : null;
    const requestOptions = {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
    };

    if (controller) {
        requestOptions.signal = controller.signal;
    }

    appState.isBoardRefreshing = true;
    appState.boardRequestController = controller;
    const loadingTargets = [
        document.querySelector('[data-board-root]'),
        document.querySelector('[data-task-wall-root]'),
        document.querySelector('[data-task-list-page-root]'),
    ].filter(Boolean);
    const showInitialLoading = !appState.lastBoardData;
    if (showInitialLoading) {
        setLoadingState(loadingTargets, true);
    }

    try {
        const response = await fetch(boardRoot.dataset.boardEndpoint, requestOptions);
        if (!response.ok) {
            return;
        }

        const payload = await response.json();
        const signature = JSON.stringify(payload);
        if (signature === appState.lastBoardPayload) {
            return;
        }

        appState.lastBoardPayload = signature;
        appState.lastBoardData = payload;
        const hasBoardRoot = Boolean(document.querySelector('[data-board-root]'));
        if (hasBoardRoot) {
            renderBoardTasks(payload);
        } else {
            syncBoardSummary(payload);
        }
        if (document.querySelector('[data-task-wall-root]')) {
            renderTaskWall(payload);
        }
        if (document.querySelector('[data-task-list-page-root]')) {
            renderPlainTaskList(payload);
        }
        refreshCommandPalette();
    } catch (error) {
        if (error?.name !== 'AbortError') {
            console.error('Failed to refresh board data.', error);
        }
    } finally {
        if (showInitialLoading) {
            setLoadingState(loadingTargets, false);
        }
        if (appState.boardRequestController === controller) {
            appState.boardRequestController = null;
        }
        appState.isBoardRefreshing = false;
    }
}

function renderTaskDetail(payload) {
    const root = getTaskDetailRoot();
    if (!root) {
        return;
    }

    appState.serverTaskMessages = Array.isArray(payload.messages) ? [...payload.messages] : [];
    appState.taskMessages = mergedTaskMessages(appState.serverTaskMessages);

    const task = payload.task;
    const statusPanel = root.querySelector('[data-task-status-panel]');
    if (statusPanel) {
        statusPanel.innerHTML = task.can_update_status
            ? `
                ${renderEditableTaskStatusControl(task, true)}
                <input type="checkbox" class="checkbox-input" aria-label="${escapeHtml(t('board.taskToggleAria'))}" data-toggle-task="${task.toggle_url}" ${task.is_completed ? 'checked' : ''}>
                ${renderCompletedTaskDismissAction(task)}
            `
            : renderReadonlyTaskStatusSummary(task, true);
    }
    root.querySelector('[data-task-title]')?.classList.toggle('is-complete', task.is_completed);
    const detailTitle = root.querySelector('[data-task-title]');
    if (detailTitle) {
        detailTitle.textContent = task.title;
    }
    syncTaskStatusState(root, task.status, task.is_completed);

    root.querySelector('[data-detail-assigned]')?.replaceChildren(document.createTextNode(task.assigned_to || t('board.unassigned')));
    const participantsNode = root.querySelector('[data-detail-participants]');
    if (participantsNode) {
        const additionalParticipants = Array.isArray(task.assigned_users)
            ? task.assigned_users.filter((name) => name && name !== task.assigned_to)
            : [];
        participantsNode.innerHTML = renderParticipantBadges(additionalParticipants);
    }
    root.querySelector('[data-detail-deadline]')?.replaceChildren(document.createTextNode(task.deadline_text ? t('detail.deadlineWithDate', { date: task.deadline_text }) : t('detail.noDeadline')));
    root.querySelector('[data-detail-created]')?.replaceChildren(document.createTextNode(t('detail.createdWithDate', { date: task.created_at_text })));
    const participantStatuses = root.querySelector('[data-detail-participant-statuses]');
    if (participantStatuses) {
        participantStatuses.innerHTML = renderParticipantStatusList(task.participant_statuses);
    }

    const descriptionWrap = root.querySelector('[data-detail-description-wrap]');
    const descriptionNode = root.querySelector('[data-detail-description]');
    if (descriptionWrap && descriptionNode) {
        if (task.description) {
            descriptionWrap.hidden = false;
            descriptionNode.innerHTML = escapeHtml(task.description).replaceAll('\n', '<br>');
        } else {
            descriptionWrap.hidden = true;
        }
    }

    const attachmentsNode = root.querySelector('[data-task-attachments]');
    if (attachmentsNode) {
        attachmentsNode.innerHTML = Array.isArray(payload.attachments) && payload.attachments.length
            ? renderAttachmentList(payload.attachments)
            : `<p class="muted">${escapeHtml(t('attachments.empty'))}</p>`;
    }

    const auditNode = root.querySelector('[data-task-audit-list]');
    if (auditNode) {
        auditNode.innerHTML = renderAuditLogList(payload.audit_entries || []);
    }

    const progressText = root.querySelector('[data-detail-progress-text]');
    const progressBar = root.querySelector('[data-detail-progress]');
    if (progressBar) {
        const progress = payload.subtask_total ? Math.round((payload.subtask_completed / payload.subtask_total) * 100) : 0;
        animateProgressBar(progressBar, progress);
    }
    if (progressText) {
        progressText.textContent = payload.subtask_total
            ? t('detail.progressText', { completed: payload.subtask_completed, total: payload.subtask_total })
            : t('detail.noSubtasks');
    }

    const list = root.querySelector('[data-subtask-list]');
    if (list) {
        animationController.animateRefresh(list);
        list.innerHTML = payload.subtasks.length
            ? payload.subtasks.map((subtask) => `
                <article class="subtask-item anim-enter" data-subtask-row data-subtask-id="${subtask.id}">
                    <input type="checkbox" class="checkbox-input" aria-label="${escapeHtml(t('detail.subtaskToggleAria'))}" data-toggle-subtask="/toggle_sub/${subtask.id}/" ${subtask.is_completed ? 'checked' : ''}>
                    <div>
                        <span class="subtask-text${subtask.is_completed ? ' is-complete' : ''}" data-subtask-text>${escapeHtml(subtask.title)}</span>
                        ${subtask.deadline_text ? `<small class="muted">${escapeHtml(subtask.deadline_text)}</small>` : ''}
                    </div>
                </article>
            `).join('')
            : `<div class="empty-state" data-subtask-empty-state><p>${escapeHtml(t('detail.noSubtasks'))}</p></div>`;
        animationController.animateInserted(list);
        animationController.observeReveal(document);
    }

    const messageList = root.querySelector('[data-task-message-list]');
    const hasOpenMessageEditor = root.querySelector('[data-task-message-edit-form]:not([hidden])');
    if (messageList) {
        setupTaskMessageList();
    }
    if (messageList && !hasOpenMessageEditor) {
        syncTaskMessages(payload.messages || []);
    }
}

async function refreshTaskDetailData() {
    const root = document.querySelector('[data-task-detail-root]');
    if (!root || appState.isTaskRefreshing) {
        return;
    }

    const controller = 'AbortController' in window ? new AbortController() : null;
    const requestOptions = {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
    };

    if (controller) {
        requestOptions.signal = controller.signal;
    }

    appState.isTaskRefreshing = true;
    appState.taskRequestController = controller;
    const showInitialLoading = !appState.lastTaskData;
    if (showInitialLoading) {
        setLoadingState(root, true);
    }

    try {
        const response = await fetch(root.dataset.taskEndpoint, requestOptions);
        if (!response.ok) {
            return;
        }

        const payload = await response.json();
        const signature = JSON.stringify(payload);
        if (signature === appState.lastTaskPayload) {
            return;
        }

        appState.lastTaskData = payload;
        if (taskDetailEditorIsOpen()) {
            return;
        }

        renderTaskDetail(payload);
        appState.lastTaskPayload = signature;
    } catch (error) {
        if (error?.name !== 'AbortError') {
            console.error('Failed to refresh task details.', error);
        }
    } finally {
        if (showInitialLoading) {
            setLoadingState(root, false);
        }
        if (appState.taskRequestController === controller) {
            appState.taskRequestController = null;
        }
        appState.isTaskRefreshing = false;
    }
}

function refreshDynamicViews() {
    if (getBoardDataRoot()) {
        refreshBoardData();
    }
    if (document.querySelector('[data-task-detail-root]')) {
        refreshTaskDetailData();
    }
}

function rerenderDynamicViewsFromCache() {
    if (appState.lastBoardData) {
        if (document.querySelector('[data-board-root]')) {
            renderBoardTasks(appState.lastBoardData);
        }
        if (document.querySelector('[data-task-wall-root]')) {
            renderTaskWall(appState.lastBoardData);
        }
        if (document.querySelector('[data-task-list-page-root]')) {
            renderPlainTaskList(appState.lastBoardData);
        }
    }

    if (appState.lastTaskData && document.querySelector('[data-task-detail-root]')) {
        renderTaskDetail(appState.lastTaskData);
    }

    refreshCommandPalette();
}

function reapplyTaskFilters() {
    if (document.querySelector('[data-board-root]')) {
        applyBoardFilters();
    }
    if (document.querySelector('[data-task-wall-root]') && appState.lastBoardData) {
        renderTaskWall(appState.lastBoardData);
    }
    if (document.querySelector('[data-task-list-page-root]') && appState.lastBoardData) {
        renderPlainTaskList(appState.lastBoardData);
    }
}

function initializeBoardStateFromDom() {
    const root = getBoardDataRoot();
    if (!root) {
        return;
    }

    appState.boardQuery = (root.dataset.initialQuery || '').trim().toLowerCase();
    appState.boardFilter = root.dataset.initialFilter || appState.boardFilter;
    appState.priorityFilter = root.dataset.initialPriority || appState.priorityFilter;
    appState.taskListView = root.dataset.initialView || appState.taskListView;

    document.querySelectorAll('[data-task-search], [data-wall-search], [data-operations-search]').forEach((input) => {
        input.value = root.dataset.initialQuery || '';
    });
    document.querySelectorAll('[data-priority-filter]').forEach((select) => {
        select.value = appState.priorityFilter;
    });
}

function setupBoardFilters() {
    document.querySelectorAll('[data-task-search], [data-wall-search], [data-operations-search]').forEach((searchInput) => {
        searchInput.addEventListener('input', () => {
            appState.boardQuery = searchInput.value.trim().toLowerCase();
            document.querySelectorAll('[data-task-search], [data-wall-search], [data-operations-search]').forEach((field) => {
                if (field !== searchInput) {
                    field.value = searchInput.value;
                }
            });
            filterOperationsEmployees();
            reapplyTaskFilters();
        });
    });

    document.querySelectorAll('[data-operations-search-clear]').forEach((button) => {
        button.addEventListener('click', clearOperationsSearch);
    });

    document.querySelectorAll('[data-filter], [data-wall-filter]').forEach((button) => {
        button.addEventListener('click', () => {
            const group = button.closest('[data-filter-group]') || button.parentElement;
            group?.querySelectorAll('[data-filter], [data-wall-filter]').forEach((item) => item.classList.remove('is-active'));
            button.classList.add('is-active');
            appState.boardFilter = button.dataset.filter || button.dataset.wallFilter || 'all';
            reapplyTaskFilters();
        });
    });

    document.querySelectorAll('[data-priority-filter]').forEach((select) => {
        select.addEventListener('change', () => {
            appState.priorityFilter = select.value || 'all';
            document.querySelectorAll('[data-priority-filter]').forEach((field) => {
                field.value = appState.priorityFilter;
            });
            reapplyTaskFilters();
        });
    });
}

function setupSubtaskBuilder() {
    const container = document.querySelector('[data-subtasks-container]');
    const addButton = document.querySelector('[data-add-subtask]');
    const template = document.getElementById('subtask-template');
    if (!container || !addButton || !template) {
        return;
    }

    addButton.addEventListener('click', () => {
        const fragment = template.content.cloneNode(true);
        translateDom(fragment);
        container.appendChild(fragment);
        animationController.animateInserted(container);
        animationController.observeReveal(container);
    });

    container.addEventListener('click', (event) => {
        const removeButton = event.target.closest('[data-remove-subtask]');
        if (!removeButton) {
            return;
        }
        const row = removeButton.closest('.subtask-row');
        const existingInput = row?.querySelector('[data-existing-subtask-title]');
        if (existingInput) {
            existingInput.value = '';
            row.hidden = true;
        } else {
            row?.remove();
        }
    });
}

function setupInteractions() {
    document.addEventListener('click', async (event) => {
        const editToggle = event.target.closest('[data-task-message-edit-toggle]');
        if (editToggle) {
            openTaskMessageEditor(editToggle.closest('[data-task-message-card]'));
            return;
        }

        const cancelEditButton = event.target.closest('[data-task-message-cancel]');
        if (cancelEditButton) {
            closeTaskMessageEditor(cancelEditButton.closest('[data-task-message-card]'), { reset: true });
            return;
        }

        const quickStatusButton = event.target.closest('[data-quick-status]');
        if (quickStatusButton) {
            event.preventDefault();
            if (quickStatusButton.disabled) {
                return;
            }

            const nextStatus = quickStatusButton.dataset.quickStatus || '';
            const statusUrl = quickStatusButton.dataset.statusUrl || '';
            const taskContainer = quickStatusButton.closest('[data-task-row], [data-task-detail-root]');
            if (!nextStatus || !statusUrl || !taskContainer) {
                return;
            }

            quickStatusButton.disabled = true;
            setLoadingState(taskContainer, true);

            try {
                const data = await postToggle(statusUrl, { status: nextStatus });
                syncTaskStatusState(taskContainer, data.task_status, data.is_completed);
                updateTaskStats();
                const toastKey = taskStatusToastKey(data.task_status || nextStatus);
                if (toastKey) {
                    showToast(toastKey, { type: taskStatusToastType(data.task_status || nextStatus) });
                }
                await refreshBoardData();
                await refreshTaskDetailData();
            } catch (error) {
                console.error('Failed to update task status from quick actions.', error);
                showToast('messages.taskUpdateError', { type: 'error' });
            } finally {
                setLoadingState(taskContainer, false);
                quickStatusButton.disabled = false;
            }
            return;
        }

        const selectVisibleButton = event.target.closest('[data-select-visible]');
        if (selectVisibleButton) {
            selectVisibleTasks();
            return;
        }

        const clearSelectionButton = event.target.closest('[data-clear-selection]');
        if (clearSelectionButton) {
            clearTaskSelection();
        }
    });

    document.addEventListener('keydown', (event) => {
        const isEditableTarget = Boolean(event.target.closest('input, textarea, select, [contenteditable="true"]'));
        const wantsSearchFocus = event.key === '/' || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k');
        if (wantsSearchFocus && !isEditableTarget) {
            const searchField = document.querySelector('[data-operations-search], [data-task-search], [data-wall-search]');
            if (searchField) {
                event.preventDefault();
                searchField.focus();
                searchField.select?.();
                return;
            }
        }

        const messageTextarea = event.target.closest('[data-task-message-form] textarea[name="body"]');
        if (!messageTextarea) {
            return;
        }

        if (
            event.key !== 'Enter' ||
            event.shiftKey ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey ||
            event.isComposing
        ) {
            return;
        }

        const form = messageTextarea.closest('[data-task-message-form]');
        const submitButton = form?.querySelector('[data-task-message-submit]');
        if (!form || submitButton?.disabled) {
            return;
        }

        event.preventDefault();
        if (typeof form.requestSubmit === 'function') {
            form.requestSubmit(submitButton || undefined);
            return;
        }

        submitButton?.click();
    });

    document.addEventListener('submit', async (event) => {
        const messageEditForm = event.target.closest('[data-task-message-edit-form]');
        if (messageEditForm) {
            event.preventDefault();
            const card = messageEditForm.closest('[data-task-message-card]');
            const feedback = card?.querySelector('[data-task-message-feedback]');
            const submitButton = messageEditForm.querySelector('button[type="submit"]');

            if (submitButton) {
                submitButton.disabled = true;
            }

            try {
                const response = await fetch(messageEditForm.action, {
                    method: 'POST',
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                    body: new FormData(messageEditForm),
                });

                let data = null;
                try {
                    data = await response.json();
                } catch (error) {
                    data = null;
                }

                if (!response.ok) {
                    if (feedback) {
                        feedback.innerHTML = renderFormErrors((data && data.errors) || [t('chat.updateError')]);
                    }
                    return;
                }

                closeTaskMessageEditor(card);
                replaceTaskMessage(data.message);
                refreshBoardData();
            } catch (error) {
                if (feedback) {
                    feedback.innerHTML = renderFormErrors([t('chat.updateError')]);
                }
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                }
            }
            return;
        }

        const messageDeleteForm = event.target.closest('[data-task-message-delete-form]');
        if (messageDeleteForm) {
            event.preventDefault();
            const confirmed = window.confirm(t(messageDeleteForm.dataset.confirmKey || 'chat.deleteConfirm'));
            if (!confirmed) {
                return;
            }

            const card = messageDeleteForm.closest('[data-task-message-card]');
            const feedback = card?.querySelector('[data-task-message-feedback]');
            const submitButton = messageDeleteForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
            }

            try {
                const response = await fetch(messageDeleteForm.action, {
                    method: 'POST',
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                    body: new URLSearchParams(new FormData(messageDeleteForm)),
                });

                let data = null;
                try {
                    data = await response.json();
                } catch (error) {
                    data = null;
                }

                if (!response.ok) {
                    if (feedback) {
                        feedback.innerHTML = renderFormErrors((data && data.errors) || [t('chat.deleteError')]);
                    }
                    return;
                }

                removeTaskMessage(card?.dataset.taskMessageId || '');
                refreshBoardData();
            } catch (error) {
                if (feedback) {
                    feedback.innerHTML = renderFormErrors([t('chat.deleteError')]);
                }
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                }
            }
            return;
        }

        const messageForm = event.target.closest('[data-task-message-form]');
        if (messageForm) {
            event.preventDefault();
            const submitButton = messageForm.querySelector('[data-task-message-submit]');
            const errorWrap = document.querySelector('[data-task-message-errors]');
            const optimisticMessage = buildOptimisticTaskMessage(messageForm);

            if (submitButton) {
                submitButton.disabled = true;
            }

            if (optimisticMessage) {
                appendPendingTaskMessage(optimisticMessage);
            }

            try {
                const response = await fetch(messageForm.action, {
                    method: 'POST',
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                    body: new FormData(messageForm),
                });
                const data = await response.json();

                if (!response.ok) {
                    if (optimisticMessage) {
                        removeTaskMessage(optimisticMessage.id);
                    }
                    if (errorWrap) {
                        errorWrap.innerHTML = renderFormErrors(data.errors || [t('chat.sendError')]);
                    }
                    return;
                }

                if (errorWrap) {
                    errorWrap.innerHTML = '';
                }
                messageForm.reset();
                clearDraftForm(messageForm);
                const kindField = messageForm.querySelector('[name="kind"]');
                if (kindField) {
                    kindField.value = 'note';
                }
                if (optimisticMessage) {
                    replaceTaskMessage(data.message, optimisticMessage.id);
                } else {
                    appendTaskMessage(data.message);
                }
                refreshBoardData();
            } catch (error) {
                if (optimisticMessage) {
                    removeTaskMessage(optimisticMessage.id);
                }
                if (errorWrap) {
                    errorWrap.innerHTML = renderFormErrors([t('chat.sendError')]);
                }
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                }
            }
            return;
        }

        const form = event.target.closest('form[data-confirm-key]');
        if (!form) {
            return;
        }

        const confirmed = window.confirm(t(form.dataset.confirmKey));
        if (!confirmed) {
            event.preventDefault();
            return;
        }

        if (form.dataset.submitPending === 'true') {
            event.preventDefault();
            return;
        }

        form.dataset.submitPending = 'true';
        form.querySelectorAll('button[type="submit"], input[type="submit"]').forEach((button) => {
            button.disabled = true;
        });
        if (event.submitter) {
            event.submitter.disabled = true;
        }
    });

    document.addEventListener('change', async (event) => {
        const selectionToggle = event.target.closest('[data-select-task]');
        if (selectionToggle) {
            toggleTaskSelection(selectionToggle.dataset.selectTask, selectionToggle.checked);
            return;
        }

        const taskStatusControl = event.target.closest('[data-task-status]');
        if (taskStatusControl) {
            if (taskStatusControl.dataset.pending === 'true') {
                return;
            }
            const taskContainer = taskStatusControl.closest('[data-task-row], [data-task-detail-root]');
            const previousStatus = taskContainer?.dataset.taskStatusValue || taskStatusControl.value;
            const nextStatus = taskStatusControl.value;
            taskStatusControl.dataset.pending = 'true';
            taskStatusControl.disabled = true;
            syncTaskStatusState(taskContainer, nextStatus, nextStatus === 'completed');
            updateTaskStats();
            try {
                const data = await postToggle(taskStatusControl.dataset.statusUrl, { status: nextStatus });
                syncTaskStatusState(taskContainer, data.task_status, data.is_completed);
                updateTaskStats();
                const toastKey = taskStatusToastKey(data.task_status);
                if (toastKey) {
                    showToast(toastKey, { type: taskStatusToastType(data.task_status) });
                }
                refreshBoardData();
                refreshTaskDetailData();
            } catch (error) {
                taskStatusControl.value = previousStatus;
                syncTaskStatusState(taskContainer, previousStatus, previousStatus === 'completed');
                updateTaskStats();
                showToast('messages.taskUpdateError', { type: 'error' });
            } finally {
                delete taskStatusControl.dataset.pending;
                taskStatusControl.disabled = false;
            }
            return;
        }

        const taskToggle = event.target.closest('[data-toggle-task]');
        if (taskToggle) {
            if (taskToggle.dataset.pending === 'true') {
                return;
            }
            const previous = !taskToggle.checked;
            const taskContainer = taskToggle.closest('[data-task-row], [data-task-detail-root]');
            const previousStatus = taskContainer?.dataset.taskStatusValue || (previous ? 'completed' : 'in_progress');
            taskToggle.dataset.pending = 'true';
            taskToggle.disabled = true;
            applyTaskState(taskToggle, taskToggle.checked);
            syncTaskStatusState(taskContainer, taskToggle.checked ? 'completed' : 'in_progress', taskToggle.checked);
            updateTaskStats();
            try {
                const data = await postToggle(taskToggle.dataset.toggleTask);
                taskToggle.checked = data.is_completed;
                applyTaskState(taskToggle, data.is_completed);
                syncTaskStatusState(taskContainer, data.task_status, data.is_completed);
                updateTaskStats();
                const toastKey = taskStatusToastKey(data.task_status);
                if (toastKey) {
                    showToast(toastKey, { type: taskStatusToastType(data.task_status) });
                }
                refreshBoardData();
                refreshTaskDetailData();
            } catch (error) {
                taskToggle.checked = previous;
                applyTaskState(taskToggle, previous);
                syncTaskStatusState(taskContainer, previousStatus, previous);
                updateTaskStats();
                showToast('messages.taskUpdateError', { type: 'error' });
            } finally {
                delete taskToggle.dataset.pending;
                taskToggle.disabled = false;
            }
            return;
        }

        const subtaskToggle = event.target.closest('[data-toggle-subtask]');
        if (subtaskToggle) {
            if (subtaskToggle.dataset.pending === 'true') {
                return;
            }
            const label = subtaskToggle.closest('[data-subtask-row]')?.querySelector('[data-subtask-text]');
            subtaskToggle.dataset.pending = 'true';
            subtaskToggle.disabled = true;
            if (label) {
                label.classList.toggle('is-complete', subtaskToggle.checked);
            }
            try {
                const data = await postToggle(subtaskToggle.dataset.toggleSubtask);
                subtaskToggle.checked = data.is_completed;
                if (label) {
                    label.classList.toggle('is-complete', data.is_completed);
                }
                const taskContainer = subtaskToggle.closest('[data-task-row], [data-task-detail-root]');
                if (data.task_status) {
                    syncTaskStatusState(taskContainer, data.task_status, data.task_is_completed);
                }
                showToast('messages.subtaskUpdated', { type: 'info', duration: 2400 });
                refreshBoardData();
                refreshTaskDetailData();
            } catch (error) {
                subtaskToggle.checked = !subtaskToggle.checked;
                if (label) {
                    label.classList.toggle('is-complete', subtaskToggle.checked);
                }
                showToast('messages.taskUpdateError', { type: 'error' });
            } finally {
                delete subtaskToggle.dataset.pending;
                subtaskToggle.disabled = false;
            }
        }
    });
}

function setupAvatarUploadForms() {
    document.querySelectorAll('[data-avatar-upload-form]').forEach((form) => {
        if (form.dataset.avatarBound === 'true') {
            return;
        }

        const fileInput = form.querySelector('[data-avatar-file-input]');
        const pickerTrigger = form.querySelector('[data-avatar-picker-trigger]');
        if (!fileInput || !pickerTrigger) {
            return;
        }

        form.dataset.avatarBound = 'true';

        pickerTrigger.addEventListener('click', () => {
            if (form.dataset.avatarOptimizing === 'true') {
                return;
            }
            fileInput.click();
        });

        fileInput.addEventListener('change', async () => {
            const selectedFile = fileInput.files?.[0];
            if (!selectedFile || form.dataset.avatarOptimizing === 'true') {
                return;
            }

            form.dataset.avatarOptimizing = 'true';
            pickerTrigger.disabled = true;

            try {
                const optimizedFile = await optimizeAvatarFile(selectedFile);
                if (optimizedFile !== selectedFile && typeof DataTransfer !== 'undefined') {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(optimizedFile);
                    fileInput.files = dataTransfer.files;
                }
            } catch (error) {
            } finally {
                delete form.dataset.avatarOptimizing;
                pickerTrigger.disabled = false;
            }

            form.requestSubmit();
        });
    });
}

function taskDetailEditorIsOpen() {
    return Boolean(
        document.querySelector('[data-task-message-edit-form]:not([hidden]), [data-task-message-form] textarea:focus, [data-task-message-edit-form] textarea:focus')
    );
}

function scheduleBoardPoll(delay = POLL_INTERVALS.board) {
    window.clearTimeout(appState.boardPollId);
    if (!getBoardDataRoot()) {
        return;
    }

    appState.boardPollId = window.setTimeout(async () => {
        if (!document.hidden) {
            await refreshBoardData();
        }
        scheduleBoardPoll();
    }, delay);
}

function scheduleTaskPoll(delay = null) {
    window.clearTimeout(appState.taskPollId);
    if (!document.querySelector('[data-task-detail-root]')) {
        return;
    }

    const nextDelay = delay ?? (taskDetailEditorIsOpen() ? POLL_INTERVALS.taskWhileEditing : POLL_INTERVALS.task);
    appState.taskPollId = window.setTimeout(async () => {
        if (!document.hidden) {
            await refreshTaskDetailData();
        }
        scheduleTaskPoll();
    }, nextDelay);
}

function setupPolling() {
    scheduleBoardPoll();
    scheduleTaskPoll();
}

document.addEventListener('DOMContentLoaded', () => {
    setTheme(getSetting('theme'));
    setMotion(getSetting('motion'));
    setLanguage(getSetting('language'));
    initializeBoardStateFromDom();
    setupPanels();
    setupSettings();
    setupCommandPalette();
    setupBoardFilters();
    setupOperationsJumps();
    setupActivityLogFilters();
    filterOperationsEmployees();
    filterActivityLog();
    setupSubtaskBuilder();
    setupInteractions();
    setupAvatarUploadForms();
    setupFlashToasts();
    setupDraftForms();
    setupTaskCalendarControls();
    setupOnboardingCards();
    setupPolling();
    setTaskListView(appState.taskListView);
    refreshCommandPalette();
    animationController.observeReveal();
    if (document.querySelector('[data-board-root]')) {
        applyBoardFilters();
    }
    if (document.querySelector('[data-task-wall-root], [data-task-list-page-root]')) {
        refreshBoardData();
    }
    if (document.querySelector('[data-task-detail-root]')) {
        setupTaskMessageList();
        refreshTaskDetailData();
    }
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        appState.boardRequestController?.abort();
        appState.taskRequestController?.abort();
        return;
    }

    refreshDynamicViews();
    setupPolling();
});
