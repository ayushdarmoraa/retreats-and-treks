/**
 * SANKRI TREKS REGISTRY
 * All trek experiences available in Sankri
 */

import { TrekContent } from '@/types/content';

import kedarkanthaTrek from './kedarkantha-trek';
import harKiDunTrek from './har-ki-dun-trek';

/**
 * ALL SANKRI TREKS
 * Ordered by popularity/season
 */
export const SANKRI_TREKS: ReadonlyArray<TrekContent> = [
  kedarkanthaTrek,
  harKiDunTrek,
] as const;

/**
 * Get a specific trek by slug
 */
export function getTrekBySlug(slug: string): TrekContent | undefined {
  return SANKRI_TREKS.find((trek) => trek.slug === slug);
}

/**
 * Get all treks in Sankri
 */
export function getAllSankriTreks(): TrekContent[] {
  return [...SANKRI_TREKS];
}
