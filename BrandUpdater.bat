@echo off
set /p bu="Should Update: "

powershell -c node index.js --brand-updater "%bu%"

pause
cls



