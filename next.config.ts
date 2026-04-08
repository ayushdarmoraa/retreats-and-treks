import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect flat /treks/{slug} → /treks/location/{location}/{slug}
      // Deterministic slug→location mapping for SEO safety
      { source: '/treks/kedarkantha-trek', destination: '/treks/location/sankri/kedarkantha-trek', permanent: true },
      { source: '/treks/har-ki-dun-trek', destination: '/treks/location/sankri/har-ki-dun-trek', permanent: true },
      { source: '/treks/budher-caves-trek', destination: '/treks/location/chakrata/budher-caves-trek', permanent: true },
      { source: '/treks/tiger-fall-trek', destination: '/treks/location/chakrata/tiger-fall-trek', permanent: true },
      { source: '/treks/weekend-trek', destination: '/treks/location/chakrata/weekend-trek', permanent: true },
      { source: '/treks/guided-treks', destination: '/treks/location/chakrata/guided-treks', permanent: true },
      // Legacy /treks/{location} → hierarchical location hub
      { source: '/treks/sankri', destination: '/treks/location/sankri', permanent: true },
      { source: '/treks/chakrata', destination: '/treks/location/chakrata', permanent: true },
      { source: '/treks/munsiyari', destination: '/treks/location/munsiyari', permanent: true },
      // Legacy /treks/{location}/{slug} → new hierarchical path
      { source: '/treks/:location(chakrata|sankri|munsiyari)/:slug', destination: '/treks/location/:location/:slug', permanent: true },
      // Consolidate singular → plural best-treks authority page (prevent cannibalization)
      { source: '/treks/best-trek-in-uttarakhand', destination: '/treks/best-treks-in-uttarakhand', permanent: true },
      {
        source: '/locations/:location',
        destination: '/retreats/:location',
        permanent: true,
      },
      // Consolidate singular → plural (prevent keyword cannibalization)
      { source: '/retreats/retreat-near-delhi', destination: '/retreats/retreats-near-delhi', permanent: true },
    ];
  },
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
};

export default nextConfig;
