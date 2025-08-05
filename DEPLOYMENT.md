# Production Deployment Guide for bhandari-prashant.com.np

## Pre-deployment Checklist

### 1. Environment Configuration
- ✅ EmailJS service configured with production credentials
- ✅ Domain set to https://bhandari-prashant.com.np
- ✅ All environment variables configured
- ✅ SSL certificate ready for custom domain

### 2. SEO & Performance
- ✅ Meta tags optimized for search engines
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card meta tags
- ✅ Structured data (JSON-LD) implemented
- ✅ Sitemap.xml generated
- ✅ Robots.txt configured
- ✅ PWA manifest.json configured
- ✅ Favicon and icon set complete
- ✅ Image optimization enabled
- ✅ Compression enabled

### 3. Security Headers
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ X-XSS-Protection
- ✅ Referrer-Policy
- ✅ Permissions-Policy
- ✅ Content Security Policy

### 4. Performance Optimizations
- ✅ Next.js image optimization
- ✅ CSS/JS minification
- ✅ Gzip compression
- ✅ Font optimization
- ✅ Code splitting

## Deployment Steps

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Configure custom domain in Vercel dashboard:
# 1. Go to Project Settings > Domains
# 2. Add bhandari-prashant.com.np
# 3. Configure DNS records as instructed
```

### Option 2: Netlify
```bash
# Build the project
npm run build

# Upload dist folder to Netlify
# Configure custom domain in Netlify dashboard
```

### Option 3: Traditional Hosting
```bash
# Build static export
npm run build
npm run export

# Upload out/ folder to your hosting provider
```

## DNS Configuration

### Required DNS Records:
```
Type    Name    Value
A       @       [Your hosting IP]
CNAME   www     bhandari-prashant.com.np
```

### For Vercel:
```
Type    Name    Value
CNAME   @       cname.vercel-dns.com
CNAME   www     cname.vercel-dns.com
```

## Environment Variables for Production

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_vqzpcsn
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_pmdilpp
NEXT_PUBLIC_EMAILJS_USER_ID=90R1DZh0HH_ycIDrs
NEXT_PUBLIC_CONTACT_EMAIL=info@bhandari-prashant.com.np
NEXT_PUBLIC_SITE_URL=https://bhandari-prashant.com.np
```

## Post-Deployment Verification

### 1. SEO Testing
- [ ] Test in Google Search Console
- [ ] Verify structured data with Google Rich Results Test
- [ ] Check Open Graph with Facebook Debugger
- [ ] Test Twitter Cards with Twitter Card Validator

### 2. Performance Testing
- [ ] Google PageSpeed Insights
- [ ] GTmetrix analysis
- [ ] WebPageTest.org
- [ ] Lighthouse audit

### 3. Functionality Testing
- [ ] Contact form submission
- [ ] Mobile navigation
- [ ] All links working
- [ ] Images loading properly
- [ ] PWA installation

### 4. Cross-browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

## Monitoring and Analytics

### Recommended Tools:
1. Google Analytics 4
2. Google Search Console
3. Hotjar for user behavior
4. Uptime monitoring service

### Performance Monitoring:
1. Core Web Vitals
2. Page load times
3. Error tracking
4. Conversion tracking

## Maintenance

### Regular Tasks:
1. Update dependencies monthly
2. Monitor Core Web Vitals
3. Check for broken links
4. Update content regularly
5. Backup website files
6. Monitor SSL certificate expiry

## Security Considerations

1. Regular security updates
2. Strong passwords for hosting accounts
3. Two-factor authentication enabled
4. Regular backups
5. SSL certificate monitoring
6. Security headers validation

## Contact Information

For technical support or questions:
- Email: info@bhandari-prashant.com.np
- LinkedIn: https://www.linkedin.com/in/prashantbdri
- GitHub: https://github.com/prashantbhandary
