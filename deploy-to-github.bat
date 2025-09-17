@echo off
echo ===============================
echo   FitBuddy GitHub Deployment
echo ===============================
echo.
echo This will help you deploy FitBuddy to GitHub Pages
echo so your teammates can access it via a web link.
echo.
echo Prerequisites:
echo 1. You need a GitHub account
echo 2. Git should be installed on your system
echo.
echo Steps to follow:
echo.
echo 1. Go to https://github.com and create a new repository
echo 2. Name it "fitbuddy-app" (or any name you prefer)
echo 3. Make it PUBLIC so others can access it
echo 4. Don't initialize with README since we have files
echo.
echo 5. Run these commands in order:
echo.
echo    git init
echo    git add .
echo    git commit -m "Initial commit: FitBuddy wellness app"
echo    git branch -M main
echo    git remote add origin https://github.com/YOUR_USERNAME/fitbuddy-app.git
echo    git push -u origin main
echo.
echo 6. Go to your repo Settings ^> Pages
echo 7. Select "Deploy from a branch" 
echo 8. Choose "main" branch and "/ (root)"
echo 9. Your app will be live at:
echo    https://YOUR_USERNAME.github.io/fitbuddy-app
echo.
echo Press any key when you're ready to start...
pause

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/
    echo.
    pause
    exit /b 1
)

echo.
echo Git found! Ready to initialize repository...
echo.
echo Would you like to initialize git repository now? (y/n)
set /p choice=
if /i "%choice%"=="y" (
    git init
    git add .
    git commit -m "Initial commit: FitBuddy wellness app"
    git branch -M main
    echo.
    echo Repository initialized! 
    echo Now create your GitHub repo and run:
    echo git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
    echo git push -u origin main
    echo.
)

echo.
echo Deployment guide complete!
pause