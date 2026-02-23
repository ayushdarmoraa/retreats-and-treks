/**
 * Canonical Enforcement Guard
 *
 * Call validateCanonical(url) anywhere a canonical URL is constructed.
 * - In development: logs a warning to console.
 * - In production (NODE_ENV === 'production'): throws an error, failing the build.
 *
 * Usage: import and call in buildCanonicalUrl or any schema generator.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export function validateCanonical(url: string): void {
  const isProduction = process.env.NODE_ENV === 'production';

  if (url.includes('localhost')) {
    const message = `[Canonical Guard] Canonical URL contains "localhost": ${url}. Set NEXT_PUBLIC_SITE_URL in your environment.`;
    if (isProduction) {
      throw new Error(message);
    } else {
      console.warn(message);
    }
  }

  if (SITE_URL && !url.startsWith(SITE_URL.replace(/\/+$/, ''))) {
    const message = `[Canonical Guard] Canonical URL "${url}" does not start with NEXT_PUBLIC_SITE_URL "${SITE_URL}".`;
    if (isProduction) {
      throw new Error(message);
    } else {
      console.warn(message);
    }
  }
}
