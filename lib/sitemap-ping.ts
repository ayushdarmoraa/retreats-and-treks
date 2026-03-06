/**
 * SITEMAP PING UTILITY
 *
 * Notifies Google and Bing that the sitemap has been updated.
 * Triggers faster recrawling of changed pages.
 *
 * Usage:
 *   - Automatically via /api/cron/sitemap-ping (Vercel cron, post-deploy)
 *   - Manually: curl -H "Authorization: Bearer <CRON_SECRET>" /api/cron/sitemap-ping
 */

import { buildCanonicalUrl } from '@/components/seo/Metadata';

const SITEMAP_URL = buildCanonicalUrl('/sitemap.xml');

const PING_ENDPOINTS = [
  {
    engine: 'Google',
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  },
  {
    engine: 'Bing (IndexNow)',
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  },
];

export interface PingResult {
  engine: string;
  status: number | null;
  ok: boolean;
  error?: string;
}

export async function pingSitemapToSearchEngines(): Promise<PingResult[]> {
  const results: PingResult[] = [];

  for (const { engine, url } of PING_ENDPOINTS) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        signal: AbortSignal.timeout(10_000),
      });
      results.push({ engine, status: res.status, ok: res.ok });
    } catch (err) {
      results.push({
        engine,
        status: null,
        ok: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }

  return results;
}
