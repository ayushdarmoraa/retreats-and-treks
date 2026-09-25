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

interface TrackedPageProps {
  page: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function TrackedPage({ page, children, style }: TrackedPageProps) {
  const pageViewSent = useRef(false);

  useEffect(() => {
    if (!pageViewSent.current && page.toLowerCase().includes('yoga')) {
      pageViewSent.current = true;
      track({ event: 'page_view', from: page, meta: { vertical: 'retreat', category: 'yoga' } });
    }
  }, [page]);

  return (
    <main style={{ position: 'relative', ...style }}>
      <ScrollTracker page={page} />
      {children}
    </main>
  );
}
