import { validateCanonical } from '@/utils/validateCanonical';

export function buildCanonicalUrl(path: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'http://localhost:3000';
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${baseUrl}${normalizedPath}`;
  validateCanonical(url);
  return url;
}
