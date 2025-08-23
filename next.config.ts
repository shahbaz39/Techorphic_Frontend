import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      // Add your production Strapi hostname when you deploy
    ],
  },
  experimental: {
    optimizePackageImports: ['@strapi/strapi'],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignore ESLint errors
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Ignore TypeScript errors
  },
};

export default nextConfig;
