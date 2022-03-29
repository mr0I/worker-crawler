@ECHO OFF


:choice
set /P c=Choose Your Operation(1:start crawler ,2:image uploader ,3:brand updater,4:webp converter,5:image redownloader) :
if /I "%c%" EQU "1" goto :start_crawler
if /I "%c%" EQU "2" goto :image_uploader
if /I "%c%" EQU "3" goto :brand_updater
if /I "%c%" EQU "4" goto :webp_converter
if /I "%c%" EQU "5" goto :image_redownloader
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
set /p iu="Upload images(Y/N): "
powershell -c node index.js --image-uploader "%iu%" --dev
echo "Upload Has Started..."
pause
cls

:brand_updater
set /p bu="Are You Sure (Y/N):"
powershell -c node index.js --brand-updater "%bu%" --dev
echo "Brand Updater Has Started..."
pause
cls
exit

:webp_converter
set /p wc="Are You Sure (Y/N):"
powershell -c node index.js --webp-converter "%wc%" --dev
echo "Webp Converter Has Started..."
pause
cls
exit

:image_redownloader
set /p ir="Are You Sure (Y/N):"
powershell -c node index.js --image-redownloader "%ir%" --dev
echo "Redownload Corrupted Images Has Started..."
pause
cls
exit
