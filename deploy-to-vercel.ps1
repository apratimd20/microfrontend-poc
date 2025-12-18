# Quick Vercel Deployment Script
# This script helps you deploy all three apps to Vercel in the correct order

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Micro-Frontend Vercel Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI not found!" -ForegroundColor Red
    Write-Host "Install it with: npm install -g vercel" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Vercel CLI found" -ForegroundColor Green
Write-Host ""

# Step 1: Deploy Chat App
Write-Host "📦 Step 1/3: Deploying Chat App..." -ForegroundColor Yellow
Set-Location chat-app
vercel --prod
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Chat App deployment failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Chat App deployed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANT: Copy the Chat App URL from above" -ForegroundColor Yellow
$CHAT_URL = Read-Host "Enter the Chat App URL (e.g., https://chat-app-xxx.vercel.app)"
Set-Location ..

# Step 2: Deploy Email App
Write-Host ""
Write-Host "📦 Step 2/3: Deploying Email App..." -ForegroundColor Yellow
Set-Location email-app
vercel --prod
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Email App deployment failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Email App deployed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANT: Copy the Email App URL from above" -ForegroundColor Yellow
$EMAIL_URL = Read-Host "Enter the Email App URL (e.g., https://email-app-xxx.vercel.app)"
Set-Location ..

# Step 3: Deploy Host App with environment variables
Write-Host ""
Write-Host "📦 Step 3/3: Deploying Host App..." -ForegroundColor Yellow
Write-Host "Setting environment variables..." -ForegroundColor Cyan
Set-Location host-app

# Set environment variables
Write-Host "Setting CHAT_APP_URL=$CHAT_URL" -ForegroundColor Cyan
vercel env add CHAT_APP_URL production
Write-Host $CHAT_URL

Write-Host "Setting EMAIL_APP_URL=$EMAIL_URL" -ForegroundColor Cyan
vercel env add EMAIL_APP_URL production
Write-Host $EMAIL_URL

# Deploy
vercel --prod
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Host App deployment failed!" -ForegroundColor Red
    exit 1
}
Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ All apps deployed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Summary:" -ForegroundColor Cyan
Write-Host "  Chat App: $CHAT_URL" -ForegroundColor White
Write-Host "  Email App: $EMAIL_URL" -ForegroundColor White
Write-Host "  Host App: Check the output above for the URL" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Your micro-frontend is now live!" -ForegroundColor Green
