import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============================================
  // IMAGE OPTIMIZATION
  // ============================================
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cloudinary for image storage
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com", // AWS S3 for file storage
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google OAuth profile pictures
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub OAuth profile pictures
      },
    ],
  },

  // ============================================
  // NEXT.JS 16 EXPERIMENTAL FEATURES
  // ============================================
  experimental: {
    // Server Actions configuration
    serverActions: {
      bodySizeLimit: "2mb", // For file uploads in forms
    },

    // Optimized package imports for better tree-shaking
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "date-fns",
      "lodash",
    ],

  },

  // ============================================
  // LOGGING & DEBUGGING
  // ============================================
  logging: {
    fetches: {
      fullUrl: true, // Show full URLs in fetch logs for debugging
    },
  },

  // ============================================
  // BUILD CONFIGURATION
  // ============================================
  typescript: {
    // Ensure TypeScript errors fail the build
    ignoreBuildErrors: false,
  },

  // Powered by header (optional - can disable for security)
  poweredByHeader: false,

  // Strict mode for React
  reactStrictMode: true,

  // ============================================
  // SECURITY HEADERS (CSP, HSTS, etc.)
  // ============================================
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://clerk.tumin-dhanbari.org https://*.clerk.accounts.dev",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' blob: data: https://res.cloudinary.com https://*.amazonaws.com https://lh3.googleusercontent.com https://avatars.githubusercontent.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://clerk.tumin-dhanbari.org https://*.clerk.accounts.dev https://api.resend.com https://*.vercel-insights.com",
              "frame-src 'self' https://clerk.tumin-dhanbari.org https://*.clerk.accounts.dev",
              "media-src 'self' https://res.cloudinary.com https://*.amazonaws.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
      {
        // Specific headers for API routes (no CSP needed)
        source: "/api/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },

  // ============================================
  // REDIRECTS
  // ============================================
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/en/dashboard",
        permanent: false,
      },
    ];
  },

  // ============================================
  // REWRITES (if needed for API versioning)
  // ============================================
  async rewrites() {
    return [];
  },
};

export default nextConfig;
