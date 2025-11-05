import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  transpilePackages: ['@grupo10-pos-fiap/design-system'],
  // Configuração para redirecionar chamadas de API para o json-server em desenvolvimento
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
