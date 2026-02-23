/**
 * CHAKRATA TREKS REGISTRY
 * All trek experiences available in Chakrata
 */

import { TrekContent } from '@/types/content';

import tigerFallTrek from './tiger-fall-trek';
import weekendTrek from './weekend-trek';
import budherCavesTrek from './budher-caves-trek';
import guidedTreks from './guided-treks';

/**
 * ALL CHAKRATA TREKS
 * Ordered by popularity/recommendation
 */
export const CHAKRATA_TREKS: ReadonlyArray<TrekContent> = [
  weekendTrek,
  tigerFallTrek,
  budherCavesTrek,
  guidedTreks,
] as const;

/**
 * Get a specific trek by slug
 */
export function getTrekBySlug(slug: string): TrekContent | undefined {
  return CHAKRATA_TREKS.find((trek) => trek.slug === slug);
}

/**
 * Get all treks in Chakrata
 */
export function getAllChakrataTreks(): TrekContent[] {
  return [...CHAKRATA_TREKS];
}
