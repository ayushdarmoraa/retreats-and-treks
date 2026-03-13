import { validateCanonical } from '@/utils/validateCanonical';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'http://localhost:3000';

export function buildOgImages(title: string) {
  return [
    {
      url: `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`,
      width: 1200,
      height: 630,
    },
  ];
}

export function buildCanonicalUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${SITE_URL}${normalizedPath}`;
  validateCanonical(url);
  return url;
}
