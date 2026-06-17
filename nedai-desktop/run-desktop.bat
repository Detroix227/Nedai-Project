@echo off
cd /d "c:\Users\Calvin\OneDrive\Documents 1\400 level\Nedia-project\nedai-desktop"
echo Started at %date% %time% > run_log.txt
npm run start:prod >> run_log.txt 2>&1
echo Exited at %date% %time% with code %errorlevel% >> run_log.txt
