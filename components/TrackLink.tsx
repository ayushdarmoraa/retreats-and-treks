'use client';

/**
 * TrackLink — Conversion Telemetry Link
 *
 * Drop-in replacement for Next.js <Link> on strategic conversion surfaces.
 * Fires a non-blocking POST to /api/track on click before following the link.
 *
 * Usage:
 *   <TrackLink
 *     href="/retreats/journeys/rest-and-reset"
 *     event="blog_to_journey"
 *     from="/blog/3-day-vs-5-day-himalayan-retreat"
 *   >
 *     Explore Rest & Reset
 *   </TrackLink>
 *
 * Event types:
 *   topic_to_pillar       — topic archive → pillar
 *   blog_to_journey       — blog post   → journey page
 *   comparison_to_journey — compare page → journey page
 *   pillar_to_journey     — pillar page  → journey page
 *   matrix_to_journey     — program matrix → journey page
 */

import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

type EventType =
  | 'topic_to_pillar'
  | 'blog_to_journey'
  | 'comparison_to_journey'
  | 'pillar_to_journey'
  | 'matrix_to_journey';

interface TrackLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  event: EventType;
  from: string;
}

export default function TrackLink({ event, from, href, onClick, children, ...rest }: TrackLinkProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // Fire-and-forget — never block navigation
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, from, to: href }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Silent fail — telemetry must never break UX
    }

    if (onClick) onClick(e);
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
