import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase if you need larger uploads
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "res.cloudinary.com",
      }
    ],
    formats: ['image/avif', 'image/webp'],
  }
};

export default nextConfig;
