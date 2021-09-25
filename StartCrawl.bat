@echo off
set /p site_id="Enter Site ID: "
set /p cat_id="Enter Category ID: "
set /p cat_name="Enter Category Name: "

powershell -c node index.js --site-id "%site_id%" --cat-id "%cat_id%" --cat-name "%cat_name%"

pause
cls



