# Production Build Script for Prashant Bhandari Portfolio
# This script prepares the website for deployment to bhandari-prashant.com.np

Write-Host "🚀 Starting production build for bhandari-prashant.com.np..." -ForegroundColor Green

# Check if Node.js and npm are installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm ci --production=false

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Run linting
Write-Host "🔍 Running ESLint..." -ForegroundColor Yellow
npm run lint

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Linting warnings detected, but continuing..." -ForegroundColor Yellow
}

# Build the project
Write-Host "🏗️ Building the project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please check the errors above." -ForegroundColor Red
    exit 1
}

# Verify build output
if (Test-Path ".next") {
    Write-Host "✅ Build completed successfully!" -ForegroundColor Green
    
    $buildSize = (Get-ChildItem .next -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "📊 Build size: $([math]::Round($buildSize, 2)) MB" -ForegroundColor Cyan
    
    Write-Host "📋 Build contents:" -ForegroundColor Cyan
    Get-ChildItem .next | Format-Table Name, Length, LastWriteTime
    
    Write-Host "🌐 Static files:" -ForegroundColor Cyan
    Get-ChildItem public | Format-Table Name, Length, LastWriteTime
    
    Write-Host "✅ Production build ready for deployment!" -ForegroundColor Green
    Write-Host "📝 Next steps:" -ForegroundColor Yellow
    Write-Host "   1. Test the build locally: npm start" -ForegroundColor White
    Write-Host "   2. Deploy to bhandari-prashant.com.np" -ForegroundColor White
    Write-Host "   3. Configure DNS records" -ForegroundColor White
    Write-Host "   4. Set up SSL certificate" -ForegroundColor White
    Write-Host "   5. Verify all functionality" -ForegroundColor White
    
    # Additional deployment information
    Write-Host "`n🔧 Environment Variables for Production:" -ForegroundColor Cyan
    Write-Host "NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_vqzpcsn" -ForegroundColor Gray
    Write-Host "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_pmdilpp" -ForegroundColor Gray
    Write-Host "NEXT_PUBLIC_EMAILJS_USER_ID=90R1DZh0HH_ycIDrs" -ForegroundColor Gray
    Write-Host "NEXT_PUBLIC_CONTACT_EMAIL=info@bhandari-prashant.com.np" -ForegroundColor Gray
    Write-Host "NEXT_PUBLIC_SITE_URL=https://bhandari-prashant.com.np" -ForegroundColor Gray
    
} else {
    Write-Host "❌ Build failed! .next directory not found." -ForegroundColor Red
    exit 1
}
