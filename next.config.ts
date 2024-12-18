import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'pricechef-prod-ap-northeast-1.s3.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
