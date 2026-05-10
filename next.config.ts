import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
  },
  
  // Metadata
  env: {
    SITE_URL: 'https://bhandari-prashant.com.np',
    SITE_NAME: 'Prashant Bhandari - Electronics Engineer',
  },
  
  // Experimental features for better performance
  experimental: {
    scrollRestoration: true,
  },
  
  // Build optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Output configuration for static export (Cloudflare Pages compatible)
  output: 'export',
  trailingSlash: false,
  distDir: 'out',
}

export default nextConfig
