import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  output: 'standalone',
  /* config options here */
  async rewrites() {
    return [
      {
          source: '/api/:path*',
          destination: 'http://192.168.108.200:8080/api/:path*',
      },
    ];
  }
};

export default nextConfig;

