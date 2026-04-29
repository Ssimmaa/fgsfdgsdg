@echo off
setlocal
cd /d "%~dp0\.."

if not exist ".taskmaster" mkdir ".taskmaster"

set "OUT_LOG=.taskmaster\server-background.out.log"
set "ERR_LOG=.taskmaster\server-background.err.log"
set "EVENT_LOG=.taskmaster\autostart-events.log"
set "PID_FILE=.taskmaster\runserver.pid"
set "LAST_LOG=.taskmaster\last-log-files.txt"

> "%LAST_LOG%" echo Logs: %CD%\%OUT_LOG%
>> "%LAST_LOG%" echo Errors: %CD%\%ERR_LOG%
>> "%EVENT_LOG%" echo [%DATE% %TIME%] Starting TaskMaster background server from %CD%.

"%CD%\venv\Scripts\python.exe" manage.py runserver 127.0.0.1:8000 --noreload >> "%OUT_LOG%" 2>> "%ERR_LOG%"

>> "%EVENT_LOG%" echo [%DATE% %TIME%] TaskMaster background server stopped with exit code %ERRORLEVEL%.
if exist "%PID_FILE%" del "%PID_FILE%"
exit /b %ERRORLEVEL%
