/**
 * MUNSIYARI TREKS REGISTRY
 * All trek experiences available in Munsiyari
 */

import { TrekContent } from '@/types/content';

import milamGlacierTrek from './milam-glacier-trek';
import khaliyaTopTrek from './khaliya-top-trek';

/**
 * ALL MUNSIYARI TREKS
 * Ordered by popularity/recommendation
 */
export const MUNSIYARI_TREKS: ReadonlyArray<TrekContent> = [
  khaliyaTopTrek,
  milamGlacierTrek,
] as const;

/**
 * Get a specific trek by slug
 */
export function getTrekBySlug(slug: string): TrekContent | undefined {
  return MUNSIYARI_TREKS.find((trek) => trek.slug === slug);
}

/**
 * Get all treks in Munsiyari
 */
export function getAllMunsiyariTreks(): TrekContent[] {
  return [...MUNSIYARI_TREKS];
}
