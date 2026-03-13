import { buildCanonicalUrl } from '@/components/seo/Metadata';

/** Human-readable overrides for URL path segments. */
const SEGMENT_LABELS: Record<string, string> = {
  retreats: 'Retreats',
  treks: 'Treks',
  journeys: 'Journeys',
  blog: 'Blog',
  compare: 'Compare',
  facilitators: 'Facilitators',
  location: 'Location',
};

/** Convert a URL segment slug to a title-cased label. */
function segmentToLabel(segment: string): string {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Generate a BreadcrumbList JSON-LD schema from a URL path.
 *
 * @param path  — e.g. "/retreats/retreat-cost-india"
 * @param leafLabel — optional human-readable label for the last segment
 *                     (defaults to auto-generated from slug)
 */
export function generateBreadcrumbsFromPath(
  path: string,
  leafLabel?: string,
) {
  const segments = path.split('/').filter(Boolean);

  const items: { '@type': string; position: number; name: string; item: string }[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: buildCanonicalUrl('/'),
    },
  ];

  let currentPath = '';

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: isLast && leafLabel ? leafLabel : segmentToLabel(segment),
      item: buildCanonicalUrl(currentPath),
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}
