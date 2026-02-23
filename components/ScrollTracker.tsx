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

const MILESTONES = [25, 50, 75, 90] as const;
type Depth = (typeof MILESTONES)[number];

interface ScrollTrackerProps {
  page: string;
}

export default function ScrollTracker({ page }: ScrollTrackerProps) {
  const fired = useRef<Set<Depth>>(new Set());
  const sentinelRefs = useRef<Map<Depth, HTMLDivElement | null>>(new Map());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const depth of MILESTONES) {
      const el = sentinelRefs.current.get(depth);
      if (!el) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !fired.current.has(depth)) {
              fired.current.add(depth);
              track({ event: 'scroll_depth', from: page, meta: { depth } });
              // Deep scroll on a journey page = strong interest signal
              if (depth >= 75 && page.startsWith('/retreats/journeys/')) {
                const slug = page.replace('/retreats/journeys/', '');
                recordDeepView(slug);
              }
            }
          }
        },
        { threshold: 0.1 },
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, [page]);

  return (
    <>
      {MILESTONES.map((depth) => (
        <div
          key={depth}
          ref={(el) => { sentinelRefs.current.set(depth, el); }}
          style={{
            position: 'absolute',
            top: `${depth}%`,
            left: 0,
            width: 1,
            height: 1,
            pointerEvents: 'none',
            visibility: 'hidden',
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
