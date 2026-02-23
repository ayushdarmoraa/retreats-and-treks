import { NextResponse } from 'next/server';
import { getBlogPostsForSitemap } from '@/content/blogs';
import { buildCanonicalUrl } from '@/components/seo/Metadata';

function urlEntry(url: string, lastmod?: string) {
  return `<url><loc>${url}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
}

export async function GET() {
  const posts = getBlogPostsForSitemap();
  const urls = posts.map((p) =>
    urlEntry(buildCanonicalUrl(`/blog/${p.slug}`), (p.lastUpdated ?? p.publishedAt)),
  );
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
    '\n',
  )}\n</urlset>`;
  return new NextResponse(body, { headers: { 'Content-Type': 'application/xml' } });
}

