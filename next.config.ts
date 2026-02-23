import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/treks/:location/:slug',
        destination: '/treks/:slug',
        permanent: true,
      },
      {
        source: '/locations/:location',
        destination: '/retreats/:location',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
