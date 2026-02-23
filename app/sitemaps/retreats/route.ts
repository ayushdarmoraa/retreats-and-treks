import { NextResponse } from 'next/server';
import { getAllRetreatServices } from '@/content/retreats/services';
import { getAllLocations } from '@/lib/locations';
import { buildCanonicalUrl } from '@/components/seo/Metadata';

function urlEntry(url: string, lastmod?: string) {
  return `<url><loc>${url}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
}

export async function GET() {
  const services = getAllRetreatServices();
  const locations = getAllLocations().filter((l) => l.supportsRetreats);
  const urls: string[] = [];

  // Pillar + location hubs
  urls.push(urlEntry(buildCanonicalUrl('/retreats/himalayan-retreats')));
  for (const loc of locations) {
    urls.push(urlEntry(buildCanonicalUrl(`/retreats/${loc.id}`)));
  }

  // Journey pages
  for (const s of services) {
    urls.push(urlEntry(buildCanonicalUrl(`/retreats/journeys/${s.slug}`)));
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
    '\n',
  )}\n</urlset>`;
  return new NextResponse(body, { headers: { 'Content-Type': 'application/xml' } });
}

