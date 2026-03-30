import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
        protocol: 'https',
        pathname: '/**',
      }
    ],
  }
};

export default nextConfig;
