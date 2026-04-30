@echo off
cd /d "%~dp0"
echo Starting TaskMaster at http://127.0.0.1:8000
echo Keep this window open while you use the site.
echo Press Ctrl+C in this window to stop the server.
call ".\scripts\run_server_task.cmd"
