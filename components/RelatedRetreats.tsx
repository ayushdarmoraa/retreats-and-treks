/**
 * RelatedRetreats — Server component
 *
 * Computes deterministic base ordering (same-duration → same-location → other),
 * then passes serializable data to RelatedRetreatsClient which adapts the order
 * using session preferences stored in localStorage.
 */

import { getAllRetreatServices, getRetreatServiceBySlug } from '@/content/retreats/services';
import { RETREAT_DURATION_GROUP } from '@/config/retreatDurations';
import { RETREAT_MATRIX_META } from '@/config/retreatMatrix';
import { getAggregateRating } from '@/content/reviews';
import RelatedRetreatsClient, { type RelatedRetreatItem } from './RelatedRetreatsClient';

interface RelatedRetreatsProps {
  currentSlug: string;
}

export default function RelatedRetreats({ currentSlug }: RelatedRetreatsProps) {
  const current = getRetreatServiceBySlug(currentSlug);
  const allOthers = getAllRetreatServices().filter((s) => s.slug !== currentSlug);

  const currentDuration = RETREAT_DURATION_GROUP[currentSlug];
  const currentLocation = current?.whereItWorksBest?.primary;

  // Deterministic base tiers
  const sameDuration = allOthers.filter(
    (s) => currentDuration && RETREAT_DURATION_GROUP[s.slug] === currentDuration,
  );
  const tier1Slugs = new Set(sameDuration.map((s) => s.slug));

  const sameLocation = allOthers.filter(
    (s) =>
      !tier1Slugs.has(s.slug) &&
      currentLocation &&
      s.whereItWorksBest?.primary === currentLocation,
  );
  const tier2Slugs = new Set(sameLocation.map((s) => s.slug));

  const others = allOthers.filter(
    (s) => !tier1Slugs.has(s.slug) && !tier2Slugs.has(s.slug),
  );

  const baseOrdered = [...sameDuration, ...sameLocation, ...others].slice(0, 4);

  if (baseOrdered.length === 0) return null;

  // Build serializable items (no non-serializable fields)
  const items: RelatedRetreatItem[] = baseOrdered.map((s) => {
    const agg = getAggregateRating(s.slug);
    return {
      slug: s.slug,
      title: s.title,
      essence: s.oneLineEssence,
      intensity: RETREAT_MATRIX_META[s.slug]?.intensity ?? 'medium',
      duration: RETREAT_DURATION_GROUP[s.slug] ?? 'flexible',
      rating: agg ? { value: agg.ratingValue, count: agg.reviewCount } : undefined,
    };
  });

  // Maps passed to client for preference ranking
  const intensityMap: Record<string, string> = {};
  const durationMap: Record<string, string> = {};
  for (const item of items) {
    intensityMap[item.slug] = item.intensity;
    durationMap[item.slug] = item.duration;
  }

  return (
    <RelatedRetreatsClient
      items={items}
      intensityMap={intensityMap}
      durationMap={durationMap}
    />
  );
}
