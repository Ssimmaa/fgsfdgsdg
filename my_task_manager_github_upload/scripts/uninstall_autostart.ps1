$taskName = 'TaskMasterServer'
$startupScriptPath = Join-Path ([Environment]::GetFolderPath('Startup')) 'TaskMasterServer.vbs'
$startupShortcutPath = Join-Path ([Environment]::GetFolderPath('Startup')) 'TaskMasterServer.lnk'
$startupCmdPath = Join-Path ([Environment]::GetFolderPath('Startup')) 'TaskMasterServer.cmd'

$task = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($task) {
    Stop-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
    Write-Host "Task Scheduler entry '$taskName' removed."
}

if (Test-Path $startupScriptPath) {
    Remove-Item $startupScriptPath -Force
    Write-Host "Startup entry removed: $startupScriptPath"
}

if (Test-Path $startupShortcutPath) {
    Remove-Item $startupShortcutPath -Force
    Write-Host "Startup shortcut removed: $startupShortcutPath"
}

if (Test-Path $startupCmdPath) {
    Remove-Item $startupCmdPath -Force
    Write-Host "Startup command removed: $startupCmdPath"
}

if (-not $task -and -not (Test-Path $startupScriptPath) -and -not (Test-Path $startupShortcutPath) -and -not (Test-Path $startupCmdPath)) {
    Write-Host "TaskMaster autostart is not installed."
}
