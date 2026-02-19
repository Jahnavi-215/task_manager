# PowerShell script to start both servers
Write-Host "Starting Task Management System..." -ForegroundColor Green
Write-Host ""

# Start backend server
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm run dev" -WindowStyle Normal

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend server
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
$env:NODE_OPTIONS = "--openssl-legacy-provider"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; `$env:NODE_OPTIONS='--openssl-legacy-provider'; npm start" -WindowStyle Normal

Write-Host ""
Write-Host "Both servers are starting..." -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")