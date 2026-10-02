'use client';

/**
 * ScrollTracker
 *
 * Invisible component. Fires scroll_depth telemetry events at
 * 25%, 50%, 75%, and 90% scroll depth milestones.
 *
 * Uses IntersectionObserver on sentinel <div> elements positioned
 * at each milestone — no scroll listener polling, minimal performance cost.
 *
 * Usage (server page):
 *   import ScrollTracker from '@/components/ScrollTracker';
 *   <ScrollTracker page="/retreats/himalayan-retreats" />
 */

import { useEffect, useRef } from 'react';
import { track } from '@/utils/telemetry';
import { recordDeepView } from '@/utils/sessionPreferences';
import { buildAttributionQuery, captureAttribution } from '@/utils/attribution';

const MILESTONES = [25, 50, 75, 90] as const;
type Depth = (typeof MILESTONES)[number];

interface ScrollTrackerProps {
  page: string;
}

export default function ScrollTracker({ page }: ScrollTrackerProps) {
  const fired = useRef<Set<Depth>>(new Set());

  useEffect(() => {
    const isYogaPage = page.toLowerCase().includes('yoga');
    const onScroll = () => {
      const documentHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      if (documentHeight <= 0) return;
      const progress = ((window.scrollY + window.innerHeight) / documentHeight) * 100;
      for (const depth of MILESTONES) {
        if (progress < depth || fired.current.has(depth)) continue;
        fired.current.add(depth);
        const searchParams = isYogaPage ? new URLSearchParams(window.location.search) : undefined;
        if (searchParams) captureAttribution(searchParams);
        track({
          event: 'scroll_depth',
          from: page,
          meta: {
            depth,
            ...(isYogaPage ? {
              page,
              vertical: 'retreat',
              category: 'yoga',
              source_utm: buildAttributionQuery(searchParams!),
            } : {}),
          },
        });
        if (depth >= 75 && page.startsWith('/retreats/journeys/')) {
          const slug = page.replace('/retreats/journeys/', '');
          recordDeepView(slug);
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, [page]);

  return null;
}
