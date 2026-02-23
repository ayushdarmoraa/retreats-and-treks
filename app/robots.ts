import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://retreatsandtreks.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/internal/',
          '/discover-verification',
          '/api/',
        ],
      },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemaps/blogs`,
      `${SITE_URL}/sitemaps/compare`,
      `${SITE_URL}/sitemaps/retreats`,
    ],
  };
}
