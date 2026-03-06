/**
 * LOHAJUNG TREKS REGISTRY
 * All trek experiences available from Lohajung basecamp
 */

import { TrekContent } from '@/types/content';

import brahmatalTrek from './brahmatal-trek';
import roopkundTrek from './roopkund-trek';

/**
 * ALL LOHAJUNG TREKS
 * Ordered by popularity/accessibility
 */
export const LOHAJUNG_TREKS: ReadonlyArray<TrekContent> = [
  brahmatalTrek,
  roopkundTrek,
] as const;

/**
 * Get a specific trek by slug
 */
export function getTrekBySlug(slug: string): TrekContent | undefined {
  return LOHAJUNG_TREKS.find((trek) => trek.slug === slug);
}
