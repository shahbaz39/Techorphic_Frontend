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
        port: '1500',
      },
      {
        protocol: 'http',
        hostname: '165.22.3.104', // production Strapi droplet (local-provider uploads)
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // ✅ Add this
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
