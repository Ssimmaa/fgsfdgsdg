$ErrorActionPreference = 'Continue'
if (Get-Variable -Name PSNativeCommandUseErrorActionPreference -Scope Global -ErrorAction SilentlyContinue) {
    $global:PSNativeCommandUseErrorActionPreference = $false
}

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$runtimeRoot = Join-Path $projectRoot '.taskmaster'
$pythonPath = (Resolve-Path (Join-Path $projectRoot 'venv\Scripts\python.exe')).Path
$pidPath = Join-Path $runtimeRoot 'runserver.pid'
$lastLogPath = Join-Path $runtimeRoot 'last-log-files.txt'
$serverUrl = 'http://127.0.0.1:8000'
$logStamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$stdoutPath = Join-Path $runtimeRoot "server-$logStamp.out.log"
$stderrPath = Join-Path $runtimeRoot "server-$logStamp.err.log"
$eventPath = Join-Path $runtimeRoot 'autostart-events.log'

if (-not (Test-Path $runtimeRoot)) {
    New-Item -ItemType Directory -Path $runtimeRoot | Out-Null
}

function Write-TaskMasterEvent {
    param([string]$Message)
    $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    Add-Content -Path $eventPath -Value "[$timestamp] $Message"
}

function Test-ServerResponse {
    try {
        $response = Invoke-WebRequest -UseBasicParsing "$serverUrl/login/" -TimeoutSec 2
        return ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500)
    } catch {
        return $false
    }
}

function Get-ServerListenerProcessIds {
    @(Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue |
        Select-Object -ExpandProperty OwningProcess -Unique)
}

if (Test-ServerResponse) {
    Write-TaskMasterEvent "Server already responds on $serverUrl. Runner exits."
    exit 0
}

$listenerProcessIds = Get-ServerListenerProcessIds
if ($listenerProcessIds) {
    Write-TaskMasterEvent "Port 8000 is occupied by PID(s): $($listenerProcessIds -join ', '). Server was not started."
    exit 1
}

Set-Content -Path $pidPath -Value $PID
Set-Content -Path $lastLogPath -Value @("Logs: $stdoutPath", "Errors: $stderrPath", "Runner PID: $PID")
Write-TaskMasterEvent "Starting TaskMaster server from $projectRoot."

Set-Location -LiteralPath $projectRoot
$env:PYTHONUNBUFFERED = '1'
& $pythonPath manage.py runserver 127.0.0.1:8000 --noreload 1>> $stdoutPath 2>> $stderrPath

$exitCode = if ($null -ne $LASTEXITCODE) { $LASTEXITCODE } else { 0 }
Write-TaskMasterEvent "Server process exited with code $exitCode."
Remove-Item $pidPath -ErrorAction SilentlyContinue
exit $exitCode
