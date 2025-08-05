# Cloudflare Pages Configuration

## Build Settings for Cloudflare Pages

### Build Configuration:
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Node.js version:** `18.x` or `20.x`

### Environment Variables:
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Build Process:
1. `npm install` - Install dependencies
2. `npm run build` - Build the Next.js application with static export
3. Output will be in the `out` directory

### Features Included:
- ✅ Static export for Cloudflare Pages
- ✅ SEO optimization with meta tags
- ✅ Progressive Web App (PWA) support
- ✅ Image optimization (unoptimized for static export)
- ✅ CSS optimization and minification
- ✅ JavaScript minification
- ✅ Responsive design
- ✅ All original functionality preserved

### Troubleshooting:
If build fails, check:
1. Node.js version compatibility
2. All dependencies are properly installed
3. No server-side rendering dependencies
