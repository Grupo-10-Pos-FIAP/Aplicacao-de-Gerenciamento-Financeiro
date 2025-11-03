import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  transpilePackages: ['@grupo10-pos-fiap/design-system'],
};

export default nextConfig;
