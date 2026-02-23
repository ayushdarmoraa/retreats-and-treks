/**
 * RETREAT FORMATS REGISTRY
 * Single source of truth for all retreat experience types.
 * Each format can run in multiple locations (location-agnostic core definition).
 */

import { RetreatContent } from '@/types/content';
import { LocationId } from '@/config/locations';

import weekendRetreat from './weekend';
import meditationRetreat from './meditation';
import yogaRetreat from './yoga';

/**
 * ALL RETREAT FORMATS
 * Ordered by priority/popularity
 */
export const ALL_RETREAT_FORMATS: ReadonlyArray<RetreatContent> = [
  weekendRetreat,
  meditationRetreat,
  yogaRetreat,
] as const;

/**
 * Get a specific retreat format by slug
 * Returns undefined if not found
 */
export function getRetreatBySlug(slug: string): RetreatContent | undefined {
  return ALL_RETREAT_FORMATS.find((retreat) => retreat.slug === slug);
}

/**
 * Get all retreat formats available at a specific location
 * Currently filters by locationId; future: support multi-location formats
 */
export function getRetreatsByLocation(locationId: LocationId): RetreatContent[] {
  return ALL_RETREAT_FORMATS.filter((retreat) => retreat.locationId === locationId);
}

/**
 * Get all retreat formats (global)
 */
export function getAllRetreats(): RetreatContent[] {
  return [...ALL_RETREAT_FORMATS];
}
