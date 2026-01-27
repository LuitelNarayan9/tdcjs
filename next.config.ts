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
};

export default nextConfig;
