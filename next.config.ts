import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  // Next.js App Router needs unsafe-inline for hydration scripts and JSON-LD;
  // Vercel Analytics loads from va.vercel-scripts.com
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  // Inline styles are used extensively via style={} props throughout the app
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "media-src 'self'",
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',      value: 'nosniff' },
          { key: 'X-Frame-Options',              value: 'DENY' },
          { key: 'Referrer-Policy',              value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',           value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Strict-Transport-Security',    value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy',      value: csp },
          { key: 'X-DNS-Prefetch-Control',       value: 'on' },
        ],
      },
      // Static images must not have frame-blocking headers — breaks OG scrapers (Facebook, Messenger)
      {
        source: '/og-image.jpg',
        headers: [
          { key: 'X-Frame-Options',         value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: "default-src 'none'" },
        ],
      },
    ];
  },
};

export default nextConfig;
