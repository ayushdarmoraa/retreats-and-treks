import { NextResponse } from 'next/server';
import { getAllRetreatServices } from '@/content/retreats/services';
import { buildCanonicalUrl } from '@/components/seo/Metadata';

function urlEntry(url: string) {
  return `<url><loc>${url}</loc></url>`;
}

export async function GET() {
  const services = getAllRetreatServices();
  const slugs = services.map((s) => s.slug);
  const urls: string[] = [];
  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      const a = slugs[i] < slugs[j] ? slugs[i] : slugs[j];
      const b = slugs[i] < slugs[j] ? slugs[j] : slugs[i];
      urls.push(urlEntry(buildCanonicalUrl(`/compare/${a}-vs-${b}`)));
    }
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
    '\n',
  )}\n</urlset>`;
  return new NextResponse(body, { headers: { 'Content-Type': 'application/xml' } });
}

