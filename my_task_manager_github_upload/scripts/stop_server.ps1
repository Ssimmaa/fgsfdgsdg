$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$runtimeRoot = Join-Path $projectRoot '.taskmaster'
$pythonPath = (Resolve-Path (Join-Path $projectRoot 'venv\Scripts\python.exe')).Path
$pidPath = Join-Path $runtimeRoot 'runserver.pid'
$stoppedAny = $false
$serverUrl = 'http://127.0.0.1:8000'
$wasResponding = $false
try {
    $response = Invoke-WebRequest -UseBasicParsing "$serverUrl/login/" -TimeoutSec 2
    $wasResponding = ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500)
} catch {
    $wasResponding = $false
}
$hadProjectPython = @(Get-Process -Name python -ErrorAction SilentlyContinue | Where-Object {
    try {
        $_.Path -and [string]::Equals($_.Path, $pythonPath, [System.StringComparison]::OrdinalIgnoreCase)
    } catch {
        $false
    }
}).Count -gt 0

function Stop-IfProjectPythonProcess {
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

    if (
        $process.ProcessName -eq 'python' -and
        $processPath -and
        [string]::Equals($processPath, $pythonPath, [System.StringComparison]::OrdinalIgnoreCase)
    ) {
        Stop-Process -Id $ProcessId -Force -ErrorAction SilentlyContinue
        return $true
    }

    return $false
}

function Stop-SavedPythonProcess {
    param([int]$ProcessId)

    $process = Get-Process -Id $ProcessId -ErrorAction SilentlyContinue
    if ($process -and $process.ProcessName -in @('python', 'pythonw', 'powershell')) {
        Stop-Process -Id $ProcessId -Force -ErrorAction SilentlyContinue
        return $true
    }

    return $false
}

if (Test-Path $pidPath) {
    $savedPidLine = Get-Content $pidPath -ErrorAction SilentlyContinue | Select-Object -First 1
    $savedPid = if ($null -ne $savedPidLine) { $savedPidLine.ToString().Trim() } else { '' }
    if ($savedPid) {
        if (Stop-SavedPythonProcess -ProcessId ([int]$savedPid)) {
            $stoppedAny = $true
        }
    }
    Remove-Item $pidPath -ErrorAction SilentlyContinue
}

$runserverProcessIds = @()
try {
    $runserverProcessIds = Get-CimInstance Win32_Process -ErrorAction Stop |
        Where-Object {
            $_.Name -in @('python.exe', 'pythonw.exe') -and
            $_.CommandLine -and
            $_.CommandLine.Contains($projectRoot) -and
            $_.CommandLine.Contains('runserver')
        } |
        Select-Object -ExpandProperty ProcessId -Unique
} catch {
    $runserverProcessIds = @()
}

if ($runserverProcessIds) {
    $runserverProcessIds | ForEach-Object {
        if (Stop-IfProjectPythonProcess -ProcessId ([int]$_)) {
            $script:stoppedAny = $true
        }
    }
    Remove-Item $pidPath -ErrorAction SilentlyContinue
}

$listenerProcessIds = Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty OwningProcess -Unique

if ($listenerProcessIds) {
    $listenerProcessIds | ForEach-Object {
        if (Stop-IfProjectPythonProcess -ProcessId ([int]$_)) {
            $script:stoppedAny = $true
        }
    }
}

$projectPythonProcesses = @(Get-Process -Name python -ErrorAction SilentlyContinue | Where-Object {
    try {
        $_.Path -and [string]::Equals($_.Path, $pythonPath, [System.StringComparison]::OrdinalIgnoreCase)
    } catch {
        $false
    }
})

if ($projectPythonProcesses) {
    $projectPythonProcesses | ForEach-Object {
        Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
        $script:stoppedAny = $true
    }
}

Remove-Item $pidPath -ErrorAction SilentlyContinue

if ($stoppedAny -or $hadProjectPython -or $wasResponding) {
    Write-Host 'TaskMaster server stopped.'
    exit 0
}

Write-Host 'TaskMaster server is not running.'
