$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$runtimeRoot = Join-Path $projectRoot '.taskmaster'
$pythonPath = (Resolve-Path (Join-Path $projectRoot 'venv\Scripts\python.exe')).Path
$pidPath = Join-Path $runtimeRoot 'runserver.pid'
$logStamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$stdoutPath = Join-Path $runtimeRoot "server-$logStamp.out.log"
$stderrPath = Join-Path $runtimeRoot "server-$logStamp.err.log"
$lastLogPath = Join-Path $runtimeRoot 'last-log-files.txt'
$serverUrl = 'http://127.0.0.1:8000'

if (-not (Test-Path $runtimeRoot)) {
    New-Item -ItemType Directory -Path $runtimeRoot | Out-Null
}

function Get-ServerListenerProcessIds {
    @(Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue |
        Select-Object -ExpandProperty OwningProcess -Unique)
}

function Test-ServerResponse {
    try {
        $response = Invoke-WebRequest -UseBasicParsing "$serverUrl/login/" -TimeoutSec 2
        return ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500)
    } catch {
        return $false
    }
}

function Test-IsProjectPythonProcess {
    param([int]$ProcessId)

    $process = Get-Process -Id $ProcessId -ErrorAction SilentlyContinue
    if (-not $process) {
        return $false
    }

    $processPath = ''
    try {
        $processPath = $process.Path
    } catch {
        $processPath = ''
    }

    return (
        $process.ProcessName -eq 'python' -and
        $processPath -and
        [string]::Equals($processPath, $pythonPath, [System.StringComparison]::OrdinalIgnoreCase)
    )
}

function Stop-SavedPythonProcess {
    param([int]$ProcessId)

    $process = Get-Process -Id $ProcessId -ErrorAction SilentlyContinue
    if ($process -and $process.ProcessName -in @('python', 'pythonw', 'powershell')) {
        Stop-Process -Id $ProcessId -Force -ErrorAction SilentlyContinue
    }
}

function ConvertTo-SingleQuotedPowerShellString {
    param([string]$Value)
    return "'" + ($Value -replace "'", "''") + "'"
}

$listenerProcessIds = Get-ServerListenerProcessIds

if ($listenerProcessIds) {
    if (Test-ServerResponse) {
        Set-Content -Path $pidPath -Value ($listenerProcessIds | Select-Object -First 1)
        Write-Host "TaskMaster server is already running on $serverUrl."
        exit 0
    }

    $ownerList = ($listenerProcessIds -join ', ')
    Write-Host "Port 8000 is already occupied, but TaskMaster did not respond."
    Write-Host "Process id(s): $ownerList"
    Write-Host "Stop that process or run .\site.ps1 stop, then try again."
    exit 1
}

if (Test-Path $pidPath) {
    $existingPidLine = Get-Content $pidPath -ErrorAction SilentlyContinue | Select-Object -First 1
    $existingPid = if ($null -ne $existingPidLine) { $existingPidLine.ToString().Trim() } else { '' }
    if ($existingPid) {
        $existingProcess = Get-Process -Id $existingPid -ErrorAction SilentlyContinue
        if ($existingProcess) {
            if ((Get-ServerListenerProcessIds) -contains [int]$existingPid -and (Test-ServerResponse)) {
                Write-Host "TaskMaster server is already running on $serverUrl (PID $existingPid)."
                exit 0
            }

            Stop-SavedPythonProcess -ProcessId ([int]$existingPid)
        }
    }
    Remove-Item $pidPath -ErrorAction SilentlyContinue
}

$quotedProjectRoot = ConvertTo-SingleQuotedPowerShellString -Value $projectRoot
$quotedPythonPath = ConvertTo-SingleQuotedPowerShellString -Value $pythonPath
$serverCommand = "Set-Location -LiteralPath $quotedProjectRoot; & $quotedPythonPath manage.py runserver 127.0.0.1:8000 --noreload"

$process = Start-Process `
    -FilePath powershell.exe `
    -ArgumentList @('-NoExit', '-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', $serverCommand) `
    -WorkingDirectory $projectRoot `
    -WindowStyle Minimized `
    -PassThru

Set-Content -Path $pidPath -Value $process.Id
Set-Content -Path $lastLogPath -Value @(
    "Server window PID: $($process.Id)",
    "Django logs are visible in the TaskMaster server PowerShell window."
)

$serverStarted = $false
for ($attempt = 1; $attempt -le 12; $attempt++) {
    Start-Sleep -Milliseconds 500

    $startedProcess = Get-Process -Id $process.Id -ErrorAction SilentlyContinue
    if (-not $startedProcess) {
        Remove-Item $pidPath -ErrorAction SilentlyContinue
        Write-Host 'TaskMaster server stopped during startup.'
        exit 1
    }

    try {
        $response = Invoke-WebRequest -UseBasicParsing "$serverUrl/login/" -TimeoutSec 2
        if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
            $serverStarted = $true
            break
        }
    } catch {
        $serverStarted = $false
    }
}

if (-not $serverStarted) {
    Remove-Item $pidPath -ErrorAction SilentlyContinue
    Stop-SavedPythonProcess -ProcessId $process.Id
    Write-Host "TaskMaster server process started, but $serverUrl did not respond yet (PID $($process.Id))."
    Write-Host 'Check the TaskMaster server PowerShell window for the error.'
    exit 1
}

Write-Host "TaskMaster server started on $serverUrl (PID $($process.Id))."
Write-Host 'A minimized TaskMaster server window is running. Use .\site.ps1 stop to turn it off.'
