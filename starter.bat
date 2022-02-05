@ECHO OFF


:choice
set /P c=Choose Your Operation(1:start crawler ,2:image uploader ,3:brand updater) :
if /I "%c%" EQU "1" goto :start_crawler
if /I "%c%" EQU "2" goto :image_uploader
if /I "%c%" EQU "3" goto :brand_updater
goto :choice


:start_crawler
set /p site_id="Enter Site ID: "
set /p cat_id="Enter Category ID: "
set /p cat_name="Enter Category Name: "
powershell -c node index.js --site-id "%site_id%" --cat-id "%cat_id%" --cat-name "%cat_name%" --dev
echo "Crawling Has Started..."
pause
cls

:image_uploader
set /p iu="Upload images: "
powershell -c node index.js --image-uploader "%iu%" --dev
echo "Upload Has Started..."
pause
cls

:brand_updater
set /p bu="Should Update: "
powershell -c node index.js --brand-updater "%bu%" --dev
echo "Brand Updater Has Started..."
pause
cls
exit