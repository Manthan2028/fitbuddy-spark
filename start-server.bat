@echo off
title FitBuddy Local Server
echo ===============================
echo    FitBuddy Local Server
echo ===============================
echo.
echo Starting local web server...
echo Your teammates can access the app at:
echo.

REM Get local IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
    set "ip=%%a"
    goto :found
)
:found

REM Remove leading spaces
set "ip=%ip: =%"

echo Local Network: http://%ip%:8000
echo Localhost:     http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Try different server options
where python >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Python server...
    python -m http.server 8000
    goto :end
)

where node >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Node.js server...
    npx http-server -p 8000
    goto :end
)

where php >nul 2>&1
if %errorlevel% equ 0 (
    echo Using PHP server...
    php -S 0.0.0.0:8000
    goto :end
)

echo.
echo No web server found. Please install one of:
echo - Python: python.org/downloads
echo - Node.js: nodejs.org
echo - PHP: php.net/downloads
echo.
echo Or use the GitHub Pages deployment instead!
pause

:end