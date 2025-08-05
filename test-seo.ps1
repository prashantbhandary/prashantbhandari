# SEO Testing and Validation Script
# This script validates all SEO elements for bhandari-prashant.com.np

Write-Host "🔍 SEO Validation for bhandari-prashant.com.np" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

$siteUrl = "https://bhandari-prashant.com.np"
$localhost = "http://localhost:3000"

# Check if local development server is running
Write-Host "`n📡 Checking local development server..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $localhost -Method Head -TimeoutSec 5
    $testUrl = $localhost
    Write-Host "✅ Testing against local server: $localhost" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Local server not running, would test against production: $siteUrl" -ForegroundColor Yellow
    $testUrl = $siteUrl
}

Write-Host "`n📋 SEO Checklist Validation:" -ForegroundColor Cyan

# Check robots.txt
Write-Host "`n🤖 Checking robots.txt..." -ForegroundColor Yellow
if (Test-Path "public/robots.txt") {
    Write-Host "✅ robots.txt exists" -ForegroundColor Green
    Get-Content "public/robots.txt" | Select-Object -First 5 | ForEach-Object { Write-Host "   $_" -ForegroundColor Gray }
} else {
    Write-Host "❌ robots.txt missing" -ForegroundColor Red
}

# Check sitemap.xml
Write-Host "`n🗺️ Checking sitemap.xml..." -ForegroundColor Yellow
if (Test-Path "public/sitemap.xml") {
    Write-Host "✅ sitemap.xml exists" -ForegroundColor Green
    $sitemapContent = Get-Content "public/sitemap.xml" -Raw
    $urlCount = ([regex]::Matches($sitemapContent, "<url>")).Count
    Write-Host "   📊 URLs in sitemap: $urlCount" -ForegroundColor Gray
} else {
    Write-Host "❌ sitemap.xml missing" -ForegroundColor Red
}

# Check manifest.json
Write-Host "`n📱 Checking PWA manifest..." -ForegroundColor Yellow
if (Test-Path "public/manifest.json") {
    Write-Host "✅ manifest.json exists" -ForegroundColor Green
    $manifest = Get-Content "public/manifest.json" | ConvertFrom-Json
    Write-Host "   📱 App name: $($manifest.name)" -ForegroundColor Gray
    Write-Host "   🎨 Theme color: $($manifest.theme_color)" -ForegroundColor Gray
    Write-Host "   🖼️ Icons: $($manifest.icons.Count)" -ForegroundColor Gray
} else {
    Write-Host "❌ manifest.json missing" -ForegroundColor Red
}

# Check favicon files
Write-Host "`n🖼️ Checking favicon files..." -ForegroundColor Yellow
$faviconFiles = @("favicon.ico", "favicon.svg", "favicon-96x96.png", "apple-touch-icon.png", "web-app-manifest-192x192.png", "web-app-manifest-512x512.png")
foreach ($file in $faviconFiles) {
    if (Test-Path "public/$file") {
        Write-Host "✅ $file exists" -ForegroundColor Green
    } else {
        Write-Host "❌ $file missing" -ForegroundColor Red
    }
}

# Check environment variables
Write-Host "`n🔧 Checking environment variables..." -ForegroundColor Yellow
if (Test-Path ".env.local") {
    Write-Host "✅ .env.local exists" -ForegroundColor Green
    $envContent = Get-Content ".env.local"
    foreach ($line in $envContent) {
        if ($line -match "^NEXT_PUBLIC_") {
            $varName = ($line -split "=")[0]
            Write-Host "   ✅ $varName configured" -ForegroundColor Gray
        }
    }
} else {
    Write-Host "❌ .env.local missing" -ForegroundColor Red
}

# Check Next.js configuration
Write-Host "`n⚙️ Checking Next.js configuration..." -ForegroundColor Yellow
if (Test-Path "next.config.ts") {
    Write-Host "✅ next.config.ts exists" -ForegroundColor Green
    $configContent = Get-Content "next.config.ts" -Raw
    
    if ($configContent -match "compress.*true") {
        Write-Host "   ✅ Compression enabled" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️ Compression not configured" -ForegroundColor Yellow
    }
    
    if ($configContent -match "poweredByHeader.*false") {
        Write-Host "   ✅ X-Powered-By header disabled" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️ X-Powered-By header not disabled" -ForegroundColor Yellow
    }
    
    if ($configContent -match "async headers") {
        Write-Host "   ✅ Security headers configured" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️ Security headers not configured" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ next.config.ts missing" -ForegroundColor Red
}

# Check package.json scripts
Write-Host "`n📦 Checking build scripts..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    $package = Get-Content "package.json" | ConvertFrom-Json
    if ($package.scripts.build) {
        Write-Host "✅ Build script configured" -ForegroundColor Green
    }
    if ($package.scripts.start) {
        Write-Host "✅ Start script configured" -ForegroundColor Green
    }
    if ($package.scripts.lint) {
        Write-Host "✅ Lint script configured" -ForegroundColor Green
    }
}

Write-Host "`n🌐 SEO Testing URLs:" -ForegroundColor Cyan
Write-Host "====================`n" -ForegroundColor Cyan

Write-Host "📊 Test your website with these tools:" -ForegroundColor Green
Write-Host "1. Google PageSpeed Insights: https://pagespeed.web.dev/" -ForegroundColor White
Write-Host "2. Google Rich Results Test: https://search.google.com/test/rich-results" -ForegroundColor White
Write-Host "3. Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/" -ForegroundColor White
Write-Host "4. Twitter Card Validator: https://cards-dev.twitter.com/validator" -ForegroundColor White
Write-Host "5. W3C Markup Validator: https://validator.w3.org/" -ForegroundColor White
Write-Host "6. Google Mobile-Friendly Test: https://search.google.com/test/mobile-friendly" -ForegroundColor White

Write-Host "`n🚀 Ready for deployment to bhandari-prashant.com.np!" -ForegroundColor Green
