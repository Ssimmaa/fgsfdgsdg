param(
    [ValidateSet('Logon', 'Startup')]
    [string]$Mode = 'Logon'
)

$ErrorActionPreference = 'Stop'

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$runnerPath = Join-Path $projectRoot 'scripts\run_server_task.ps1'
$cmdRunnerPath = Join-Path $projectRoot 'scripts\run_server_task.cmd'
$taskName = 'TaskMasterServer'
$taskDescription = 'Starts the local TaskMaster Django server.'
$startupFolder = [Environment]::GetFolderPath('Startup')
$startupScriptPath = Join-Path $startupFolder 'TaskMasterServer.vbs'
$startupShortcutPath = Join-Path $startupFolder 'TaskMasterServer.lnk'
$startupCmdPath = Join-Path $startupFolder 'TaskMasterServer.cmd'

if (-not (Test-Path $cmdRunnerPath)) {
    throw "Runner script not found: $cmdRunnerPath"
}

$action = New-ScheduledTaskAction `
    -Execute 'powershell.exe' `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$runnerPath`"" `
    -WorkingDirectory $projectRoot

if ($Mode -eq 'Startup') {
    $trigger = New-ScheduledTaskTrigger -AtStartup
    $principal = New-ScheduledTaskPrincipal -UserId 'SYSTEM' -RunLevel Highest
} else {
    $trigger = New-ScheduledTaskTrigger -AtLogOn
    $principal = New-ScheduledTaskPrincipal `
        -UserId "$env:USERDOMAIN\$env:USERNAME" `
        -LogonType Interactive `
        -RunLevel Limited
}

$settings = New-ScheduledTaskSettingsSet `
    -MultipleInstances IgnoreNew `
    -RestartCount 3 `
    -RestartInterval (New-TimeSpan -Minutes 1) `
    -StartWhenAvailable `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -ExecutionTimeLimit (New-TimeSpan -Days 0)

$scheduledTaskInstalled = $false
$scheduledTaskError = $null

try {
    $existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
    if ($existingTask) {
        Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction Stop
    }

    Register-ScheduledTask `
        -TaskName $taskName `
        -Action $action `
        -Trigger $trigger `
        -Settings $settings `
        -Principal $principal `
        -Description $taskDescription `
        -ErrorAction Stop | Out-Null

    $scheduledTaskInstalled = $true
    Remove-Item $startupScriptPath -ErrorAction SilentlyContinue
    Write-Host "Task Scheduler entry '$taskName' installed in $Mode mode."
} catch {
    $scheduledTaskError = $_.Exception.Message

    if ($Mode -eq 'Logon') {
        $taskRun = "`"$cmdRunnerPath`""
        $oldErrorActionPreference = $ErrorActionPreference
        $ErrorActionPreference = 'Continue'
        $schtasksOutput = & schtasks.exe /Create /TN $taskName /SC ONLOGON /TR $taskRun /F 2>&1
        $ErrorActionPreference = $oldErrorActionPreference
        if ($LASTEXITCODE -eq 0) {
            $scheduledTaskInstalled = $true
            Remove-Item $startupScriptPath -ErrorAction SilentlyContinue
            Write-Host "Task Scheduler entry '$taskName' installed through schtasks.exe."
        } else {
            $scheduledTaskError = ($schtasksOutput | Out-String).Trim()
        }
    } elseif ($Mode -eq 'Startup') {
        $taskRun = "`"$cmdRunnerPath`""
        $oldErrorActionPreference = $ErrorActionPreference
        $ErrorActionPreference = 'Continue'
        $schtasksOutput = & schtasks.exe /Create /TN $taskName /SC ONSTART /TR $taskRun /F /RL HIGHEST 2>&1
        $ErrorActionPreference = $oldErrorActionPreference
        if ($LASTEXITCODE -eq 0) {
            $scheduledTaskInstalled = $true
            Remove-Item $startupScriptPath -ErrorAction SilentlyContinue
            Write-Host "Task Scheduler entry '$taskName' installed for system startup through schtasks.exe."
        } else {
            throw "Task Scheduler install failed: $(($schtasksOutput | Out-String).Trim())"
        }
    }
}

if (-not $scheduledTaskInstalled) {
    Remove-Item $startupScriptPath -ErrorAction SilentlyContinue
    Remove-Item $startupShortcutPath -ErrorAction SilentlyContinue
    $startupCmd = @"
@echo off
cd /d "$projectRoot"
call "$cmdRunnerPath"
"@
    Set-Content -Path $startupCmdPath -Value $startupCmd -Encoding ASCII
    Write-Host "Task Scheduler was not available: $scheduledTaskError"
    Write-Host "Installed fallback Startup command: $startupCmdPath"
}

if ($scheduledTaskInstalled) {
    Write-Host "Use '.\site.ps1 start' to start it now, or reboot/log in to test auto-start."
} else {
    Write-Host "The server will start automatically after Windows login through the Startup folder."
    Write-Host "Use '.\site.ps1 start' to start it now."
}
