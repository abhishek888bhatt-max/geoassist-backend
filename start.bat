@echo off
echo ================================
echo GeoAssist - Quick Start Script
echo ================================
echo.

REM Check if .env exists
if not exist "server\.env" (
    echo [ERROR] .env file not found!
    echo [INFO] Creating .env from .env.example...
    copy server\.env.example server\.env
    echo [WARNING] Please update server\.env with your actual values
    pause
    exit /b 1
)

REM Install dependencies
echo [INFO] Installing dependencies...
cd server
call npm install

echo.
echo [SUCCESS] Setup complete!
echo.
echo [INFO] Starting server...
call npm start
