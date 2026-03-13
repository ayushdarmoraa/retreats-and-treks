'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { schemaIds } from '@/lib/schemaIds';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ||
  'https://www.retreatsandtreks.com';

const SEGMENT_LABELS: Record<string, string> = {
  retreats: 'Retreats',
  treks: 'Treks',
  journeys: 'Journeys',
  blog: 'Blog',
  compare: 'Compare',
  facilitators: 'Facilitators',
  location: 'Location',
  topics: 'Topics',
};

function segmentToLabel(segment: string): string {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Global breadcrumb JSON-LD injector.
 * Renders a BreadcrumbList schema on every page except the homepage.
 * Self-deduplicating: on hydration, clears itself when the page already
 * provides a curated BreadcrumbList via generateBreadcrumbSchema().
 *
 * @param disabled — explicit opt-out (renders nothing)
 */
export default function BreadcrumbSchema({ disabled = false }: { disabled?: boolean }) {
  const pathname = usePathname();
  const scriptRef = useRef<HTMLScriptElement>(null);

  useEffect(() => {
    if (!scriptRef.current) return;

    // Check if a page-level script already provides a BreadcrumbList.
    // Page-level schemas are rendered as <script type="application/ld+json">
    // WITHOUT the data-auto-breadcrumb marker that this component adds.
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]:not([data-auto-breadcrumb])',
    );
    for (const script of scripts) {
      try {
        const data = JSON.parse(script.textContent || '');
        const entries = Array.isArray(data) ? data : [data];
        if (entries.some((e: Record<string, unknown>) => e['@type'] === 'BreadcrumbList')) {
          // Page already provides curated breadcrumbs — clear the auto one.
          scriptRef.current.textContent = '';
          return;
        }
      } catch { /* ignore malformed JSON-LD */ }
    }
  }, [pathname]);

  if (disabled || !pathname || pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);

  const items: { '@type': string; position: number; name: string; item: string }[] = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
  ];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: segmentToLabel(segment),
      item: `${BASE_URL}${currentPath}`,
    });
  });

  return (
    <script
      ref={scriptRef}
      type="application/ld+json"
      data-auto-breadcrumb=""
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          '@id': schemaIds.breadcrumbs(pathname),
          itemListElement: items,
        }),
      }}
    />
  );
}
