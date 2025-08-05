#!/bin/bash

# Production Build Script for Prashant Bhandari Portfolio
# This script prepares the website for deployment to bhandari-prashant.com.np

echo "🚀 Starting production build for bhandari-prashant.com.np..."

# Check if Node.js and npm are installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Run linting
echo "🔍 Running ESLint..."
npm run lint

# Type checking
echo "🔧 Running TypeScript type checking..."
npx tsc --noEmit

# Build the project
echo "🏗️ Building the project..."
npm run build

# Verify build output
if [ -d ".next" ]; then
    echo "✅ Build completed successfully!"
    echo "📊 Build statistics:"
    du -sh .next
    
    echo "📋 Build contents:"
    ls -la .next/
    
    echo "🌐 Static files:"
    ls -la public/
    
    echo "✅ Production build ready for deployment!"
    echo "📝 Next steps:"
    echo "   1. Test the build locally: npm start"
    echo "   2. Deploy to bhandari-prashant.com.np"
    echo "   3. Configure DNS records"
    echo "   4. Set up SSL certificate"
    echo "   5. Verify all functionality"
    
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
