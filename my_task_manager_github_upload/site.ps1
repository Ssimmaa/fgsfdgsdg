param(
    [ValidateSet('start', 'stop', 'restart', 'status', 'install-autostart', 'install-startup', 'uninstall-autostart')]
    [string]$Action = 'status'
)

$projectRoot = $PSScriptRoot
$runtimeRoot = Join-Path $projectRoot '.taskmaster'
$pidPath = Join-Path $runtimeRoot 'runserver.pid'
$lastLogPath = Join-Path $runtimeRoot 'last-log-files.txt'
$taskName = 'TaskMasterServer'
$startupScriptPath = Join-Path ([Environment]::GetFolderPath('Startup')) 'TaskMasterServer.vbs'
$startupShortcutPath = Join-Path ([Environment]::GetFolderPath('Startup')) 'TaskMasterServer.lnk'
$startupCmdPath = Join-Path ([Environment]::GetFolderPath('Startup')) 'TaskMasterServer.cmd'
$pythonPath = (Resolve-Path (Join-Path $projectRoot 'venv\Scripts\python.exe')).Path
$serverUrl = 'http://127.0.0.1:8000'

function Test-TaskMasterResponse {
    try {
        $response = Invoke-WebRequest -UseBasicParsing "$serverUrl/login/" -TimeoutSec 2
        return ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500)
    } catch {
        return $false
    }
}

function Show-TaskMasterStatus {
    $listenerProcessIds = @(Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue |
        Select-Object -ExpandProperty OwningProcess -Unique)
    $savedPid = ''

    if (Test-Path $pidPath) {
        $savedPidLine = Get-Content $pidPath -ErrorAction SilentlyContinue | Select-Object -First 1
        $savedPid = if ($null -ne $savedPidLine) { $savedPidLine.ToString().Trim() } else { '' }
    }

    $scheduledTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

    if ($scheduledTask) {
        Write-Host "Autostart: Task Scheduler installed ($($scheduledTask.State))"
    } elseif (Test-Path $startupCmdPath) {
        Write-Host "Autostart: Startup command installed ($startupCmdPath)"
    } elseif (Test-Path $startupShortcutPath) {
        Write-Host "Autostart: Startup shortcut installed ($startupShortcutPath)"
    } elseif (Test-Path $startupScriptPath) {
        Write-Host "Autostart: Startup folder installed ($startupScriptPath)"
    } else {
        Write-Host 'Autostart: not installed'
    }

    if (Test-Path $lastLogPath) {
        Get-Content $lastLogPath -ErrorAction SilentlyContinue | ForEach-Object {
            Write-Host $_
        }
    }

    if (Test-TaskMasterResponse) {
        $projectPythonProcesses = @(Get-Process -Name python -ErrorAction SilentlyContinue | Where-Object {
            try {
                $_.Path -and [string]::Equals($_.Path, $pythonPath, [System.StringComparison]::OrdinalIgnoreCase)
            } catch {
                $false
            }
        })
        $processText = if ($projectPythonProcesses) {
            ($projectPythonProcesses | Select-Object -ExpandProperty Id) -join ', '
        } elseif ($listenerProcessIds) {
            ($listenerProcessIds | Select-Object -First 1)
        } else {
            'unknown'
        }
        Write-Host "TaskMaster is running: $serverUrl"
        Write-Host "PID: $processText"
        return
    }

    if ($listenerProcessIds) {
        Write-Host 'Port 8000 is occupied, but TaskMaster is not responding.'
        Write-Host "Process id(s): $($listenerProcessIds -join ', ')"
        return
    }

    if ($savedPid) {
        Write-Host "TaskMaster is not running. Stale PID file: $savedPid"
        return
    }

    Write-Host 'TaskMaster is not running.'
}

function Start-TaskMaster {
    $scheduledTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
    if ($scheduledTask) {
        Start-ScheduledTask -TaskName $taskName
        for ($attempt = 1; $attempt -le 15; $attempt++) {
            Start-Sleep -Seconds 1
            if (Test-TaskMasterResponse) {
                Write-Host "TaskMaster server started on $serverUrl via Task Scheduler."
                return
            }
        }

        Write-Host "Task Scheduler started '$taskName', but the site did not respond yet."
        Write-Host "Run '.\site.ps1 status' and check .taskmaster logs."
        return
    }

    if (Test-Path $startupCmdPath) {
        Start-Process `
            -FilePath cmd.exe `
            -ArgumentList @('/k', "`"$startupCmdPath`"") `
            -WorkingDirectory $projectRoot `
            -WindowStyle Minimized | Out-Null

        for ($attempt = 1; $attempt -le 15; $attempt++) {
            Start-Sleep -Seconds 1
            if (Test-TaskMasterResponse) {
                Write-Host "TaskMaster server started on $serverUrl."
                return
            }
        }

        Write-Host 'Startup command launched, but the site did not respond yet.'
        Write-Host "Run '.\site.ps1 status' and check .taskmaster logs."
        return
    }

    if (Test-Path $startupShortcutPath) {
        Start-Process -FilePath $startupShortcutPath | Out-Null
        for ($attempt = 1; $attempt -le 15; $attempt++) {
            Start-Sleep -Seconds 1
            if (Test-TaskMasterResponse) {
                Write-Host "TaskMaster server started on $serverUrl."
                return
            }
        }

        Write-Host 'Startup shortcut launched, but the site did not respond yet.'
        Write-Host "Run '.\site.ps1 status' and check .taskmaster logs."
        return
    }

    if (Test-Path $startupScriptPath) {
        $runnerPath = Join-Path $projectRoot 'scripts\run_server_task.cmd'
        Start-Process `
            -FilePath cmd.exe `
            -ArgumentList @('/c', "`"$runnerPath`"") `
            -WorkingDirectory $projectRoot `
            -WindowStyle Hidden | Out-Null

        for ($attempt = 1; $attempt -le 15; $attempt++) {
            Start-Sleep -Seconds 1
            if (Test-TaskMasterResponse) {
                Write-Host "TaskMaster server started on $serverUrl."
                return
            }
        }

        Write-Host 'Server runner launched, but the site did not respond yet.'
        Write-Host "Run '.\site.ps1 status' and check .taskmaster logs."
        return
    }

    & (Join-Path $projectRoot 'scripts\start_server.ps1')
}

function Stop-TaskMaster {
    $scheduledTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
    if ($scheduledTask) {
        Stop-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
    }

    & (Join-Path $projectRoot 'scripts\stop_server.ps1')
}

switch ($Action) {
    'start' {
        Start-TaskMaster
    }
    'stop' {
        Stop-TaskMaster
    }
    'restart' {
        Stop-TaskMaster
        Start-TaskMaster
    }
    'status' {
        Show-TaskMasterStatus
    }
    'install-autostart' {
        & (Join-Path $projectRoot 'scripts\install_autostart.ps1') -Mode Logon
    }
    'install-startup' {
        & (Join-Path $projectRoot 'scripts\install_autostart.ps1') -Mode Startup
    }
    'uninstall-autostart' {
        Stop-TaskMaster
        & (Join-Path $projectRoot 'scripts\uninstall_autostart.ps1')
    }
}
