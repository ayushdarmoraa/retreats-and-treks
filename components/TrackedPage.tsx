'use client';

/**
 * TrackedPage
 *
 * Wraps a page section in a positioned container so ScrollTracker's
 * absolute sentinels calculate depth correctly relative to content height.
 *
 * Usage (server page — wrap main content area):
 *   import TrackedPage from '@/components/TrackedPage';
 *   <TrackedPage page="/retreats/himalayan-retreats">
 *     {children}
 *   </TrackedPage>
 *
 * Renders as a plain <div> with position:relative — zero visual impact.
 */

import { useEffect, useRef } from 'react';
import ScrollTracker from './ScrollTracker';
import { track } from '@/utils/telemetry';
import { buildAttributionQuery, captureAttribution } from '@/utils/attribution';

interface TrackedPageProps {
  page: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function TrackedPage({ page, children, style }: TrackedPageProps) {
  const pageViewSent = useRef(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    captureAttribution(searchParams);
    if (!pageViewSent.current && page.toLowerCase().includes('yoga')) {
      pageViewSent.current = true;
      const normalizedPage = page.toLowerCase();
      const duration = normalizedPage.includes('10-day') ? '10 days'
        : normalizedPage.includes('7-day') ? '7 days'
        : normalizedPage.includes('5-day') ? '5 days'
        : normalizedPage.includes('weekend') ? 'Weekend'
        : '';
      const location = normalizedPage.includes('rishikesh') ? 'Rishikesh'
        : normalizedPage.includes('sankri') ? 'Sankri'
        : normalizedPage.includes('chakrata') ? 'Chakrata'
        : normalizedPage.includes('zanskar') ? 'Zanskar'
        : normalizedPage.includes('uttarakhand') ? 'Uttarakhand'
        : '';
      const yogaInterest = normalizedPage.includes('teacher-training') ? 'Yoga TTC' : 'Yoga Retreat';
      track({
        event: 'page_view',
        from: page,
        meta: {
          vertical: 'retreat',
          category: 'yoga',
          yoga_interest: yogaInterest,
          location,
          duration,
          ttc: yogaInterest === 'Yoga TTC',
          source_utm: buildAttributionQuery(searchParams),
        },
      });
    }
  }, [page]);

  return (
    <main style={{ position: 'relative', ...style }}>
      <ScrollTracker page={page} />
      {children}
    </main>
  );
}
