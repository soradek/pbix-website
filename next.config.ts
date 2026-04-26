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
      // Security headers for everything EXCEPT social-share images.
      // Negative lookahead excludes /og.jpg so Facebook/Messenger embed iframes
      // are not blocked by X-Frame-Options/CSP. Next.js cannot "remove" a header
      // from a catch-all rule — only override the value — so we exclude the path
      // from the rule entirely via path-to-regexp regex.
      {
        source: '/:path((?!og\\.jpg).*)',
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
      // OG image: long immutable cache + open CORS, NO frame-blocking, NO CSP.
      // Messenger embeds the thumbnail in a cross-origin iframe; SAMEORIGIN
      // breaks that. Long cache stabilises Last-Modified so the FB CDN treats
      // the asset as steady and pre-renders previews in chat threads.
      {
        source: '/og.jpg',
        headers: [
          { key: 'Cache-Control',              value: 'public, max-age=31536000, immutable' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'X-Content-Type-Options',     value: 'nosniff' },
        ],
      },
    ];
  },
};

export default nextConfig;
