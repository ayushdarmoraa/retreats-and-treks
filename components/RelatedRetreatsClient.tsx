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
    <section className="rrc-wrap">
  <style>{`
    .rrc-wrap {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #f7f9f7;
      padding: 5rem 0;
      margin-top: var(--space-xl);
    }

    .rrc-inner {
      max-width: 52rem;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .rrc-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2.5rem;
    }

    .rrc-eyebrow-wrap {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .rrc-eyebrow {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .rrc-eyebrow-line {
      width: 24px; height: 1px;
      background: var(--color-primary); opacity: 0.5;
      flex-shrink: 0;
    }

    .rrc-h2 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1.4rem, 2.5vw, 1.85rem);
      font-weight: 200;
      letter-spacing: -0.03em;
      color: #111111;
      line-height: 1.15;
      margin: 0;
    }
    .rrc-h2-accent {
      color: var(--color-primary);
      font-weight: 200;
    }

    .rrc-adapted-tag {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.58rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #aaaaaa;
      font-weight: 400;
      font-style: normal;
      flex-shrink: 0;
      padding-top: 0.25rem;
    }

    /* Cards */
    .rrc-list {
      list-style: none;
      padding: 0; margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .rrc-item {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1.25rem;
      padding: 1.35rem 1.5rem;
      background: #ffffff;
      border: 1px solid #eef0ee;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
      transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
      overflow: hidden;
    }
    .rrc-item::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: var(--color-primary);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
    }
    .rrc-item:hover {
      border-color: rgba(15,118,110,0.3);
      box-shadow: 0 12px 36px rgba(0,0,0,0.09);
      transform: translateY(-3px);
    }
    .rrc-item:hover::before {
      transform: scaleX(1);
    }

    .rrc-item-body { flex: 1; }

    .rrc-link {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.92rem;
      font-weight: 400;
      color: var(--color-primary);
      text-decoration: none;
      letter-spacing: -0.01em;
      display: block;
      margin-bottom: 0.3rem;
      transition: opacity 0.2s;
    }
    .rrc-item:hover .rrc-link { opacity: 0.8; }

    .rrc-essence {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.82rem;
      font-weight: 300;
      line-height: 1.7;
      color: #777777;
      margin: 0;
    }

    .rrc-rating { flex-shrink: 0; padding-top: 2px; }
  `}</style>

  <div className="rrc-inner">

    <div className="rrc-header">
      <div className="rrc-eyebrow-wrap">
        <div className="rrc-eyebrow">
          <span className="rrc-eyebrow-line" />
        </div>
        <h2 className="rrc-h2">
          You May Also{' '}
          <span className="rrc-h2-accent">Consider</span>
        </h2>
      </div>
      {adapted && (
        <span className="rrc-adapted-tag">Ordered by your preferences</span>
      )}
    </div>

    <ul className="rrc-list">
      {ranked.map((item) => (
        <li key={item.slug} className="rrc-item">
          <div className="rrc-item-body">
            <Link href={`/retreats/journeys/${item.slug}`} className="rrc-link">
              {item.title}
            </Link>
            <p className="rrc-essence">{item.essence}</p>
          </div>
          {item.rating && (
            <div className="rrc-rating">
              <RatingBadge rating={item.rating} variant="compact" />
            </div>
          )}
        </li>
      ))}
    </ul>

  </div>
</section>
  );
}
