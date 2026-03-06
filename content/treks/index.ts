/**
 * TREKS GLOBAL REGISTRY
 * Single access point for all trek experiences across all locations
 */

import { TrekContent } from '@/types/content';
import { LocationId } from '@/config/locations';

import { CHAKRATA_TREKS } from './chakrata';
import { JOSHIMATH_TREKS } from './joshimath';
import { LOHAJUNG_TREKS } from './lohajung';
import { MUNSIYARI_TREKS } from './munsiyari';
import { SANKRI_TREKS } from './sankri';

/**
 * ALL TREKS (GLOBAL)
 * Combined across all active locations
 */
export const ALL_TREKS: ReadonlyArray<TrekContent> = [
  ...CHAKRATA_TREKS,
  ...JOSHIMATH_TREKS,
  ...LOHAJUNG_TREKS,
  ...MUNSIYARI_TREKS,
  ...SANKRI_TREKS,
] as const;

/**
 * Get all treks
 */
export function getAllTreks(): TrekContent[] {
  return [...ALL_TREKS];
}

/**
 * Get all treks in a specific location
 */
export function getTreksByLocation(locationId: LocationId): TrekContent[] {
  switch (locationId) {
    case 'chakrata':
      return [...CHAKRATA_TREKS];
    case 'munsiyari':
      return [...MUNSIYARI_TREKS];
    case 'sankri':
      return [...SANKRI_TREKS];
    case 'lohajung':
      return [...LOHAJUNG_TREKS];
    case 'joshimath':
      return [...JOSHIMATH_TREKS];
    default:
      return [];
  }
}

/**
 * Get a specific trek by slug (searches across all locations)
 */
export function getTrekBySlug(slug: string): TrekContent | undefined {
  return ALL_TREKS.find((trek) => trek.slug === slug);
}

/**
 * Get a specific trek by slug and location (validated lookup)
 */
export function getTrekBySluqAndLocation(
  slug: string,
  locationId: LocationId
): TrekContent | undefined {
  return getTreksByLocation(locationId).find((trek) => trek.slug === slug);
}
