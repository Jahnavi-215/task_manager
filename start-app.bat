@echo off
echo Starting Task Management System...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd server && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd client && set NODE_OPTIONS=--openssl-legacy-provider && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3001
echo.
echo Press any key to exit...
pause > nul