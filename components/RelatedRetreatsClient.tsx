'use client';

/**
 * RelatedRetreatsClient
 *
 * Receives pre-ranked retreat list from server.
 * On mount, reads session preferences from localStorage and re-ranks.
 * Falls back to server order if no preferences exist.
 *
 * Adaptive signals used:
 *   - preferredIntensity  → boosts intensity-matched retreats
 *   - preferredDuration   → boosts duration-matched retreats
 *   - deeplyViewedSlugs   → boosts recently explored retreats
 *   - finderMatch         → boosts finder-recommended retreat
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { rankByPreference } from '@/utils/sessionPreferences';
import type { RatingInfo } from './RatingBadge';
import RatingBadge from './RatingBadge';

export interface RelatedRetreatItem {
  slug: string;
  title: string;
  essence: string;
  intensity: string;
  duration: string;
  rating?: RatingInfo;
}

interface RelatedRetreatsClientProps {
  items: RelatedRetreatItem[];
  intensityMap: Record<string, string>;
  durationMap: Record<string, string>;
}

export default function RelatedRetreatsClient({
  items,
  intensityMap,
  durationMap,
}: RelatedRetreatsClientProps) {
  const [ranked, setRanked] = useState<RelatedRetreatItem[]>(items);
  const [adapted, setAdapted] = useState(false);

  useEffect(() => {
    const slugs = items.map((i) => i.slug);
    const reordered = rankByPreference(slugs, intensityMap, durationMap);

    // Only update if order actually changed
    const changed = reordered.some((s, i) => s !== slugs[i]);
    if (changed) {
      const itemMap = new Map(items.map((i) => [i.slug, i]));
      setRanked(reordered.map((s) => itemMap.get(s)!).filter(Boolean));
      setAdapted(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      style={{
        marginTop: 'var(--space-xl)',
        paddingTop: 'var(--space-lg)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>
          You May Also Consider
        </h2>
        {adapted && (
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
            Ordered by your preferences
          </span>
        )}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {ranked.map((item) => (
          <li
            key={item.slug}
            style={{
              marginBottom: '1rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem',
            }}
          >
            <div style={{ flex: 1 }}>
              <Link
                href={`/retreats/journeys/${item.slug}`}
                style={{ color: 'var(--color-primary)', fontWeight: 500 }}
              >
                {item.title}
              </Link>
              <p
                style={{
                  margin: '0.2rem 0 0',
                  color: 'var(--color-muted)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                }}
              >
                {item.essence}
              </p>
            </div>
            {item.rating && (
              <div style={{ flexShrink: 0, paddingTop: '2px' }}>
                <RatingBadge rating={item.rating} variant="compact" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
