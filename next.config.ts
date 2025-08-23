/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;