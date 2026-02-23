/**
 * TREKS DATA ACCESS LAYER
 * Provides clean API for accessing trek data across the app.
 * Source: content/treks/index.ts + locations context
 */

import { TrekContent } from '@/types/content';
import { LocationId } from '@/config/locations';

import {
  getAllTreks as contentGetAllTreks,
  getTreksByLocation as contentGetTreksByLocation,
  getTrekBySlug as contentGetTrekBySlug,
} from '@/content/treks';

import { getLocationById } from './locations';

/**
 * Get all treks across all locations
 */
export function getAllTreks(): TrekContent[] {
  return contentGetAllTreks();
}

/**
 * Get all treks in a specific location
 * Validates that location exists and is active
 */
export function getTreksByLocation(locationId: LocationId): TrekContent[] {
  // Ensure location is active
  if (!getLocationById(locationId as string)) {
    return [];
  }
  return contentGetTreksByLocation(locationId);
}

/**
 * Get a specific trek by slug (searches across all locations)
 */
export function getTrekBySlug(slug: string): TrekContent | undefined {
  return contentGetTrekBySlug(slug);
}

/**
 * Get all treks grouped by location
 * Useful for hub/discovery pages that show treks organized by location
 */
export function getTreksGroupedByLocation(): Record<string, TrekContent[]> {
  const grouped: Record<string, TrekContent[]> = {};
  const allTreks = contentGetAllTreks();

  allTreks.forEach((trek) => {
    if (!grouped[trek.locationId]) {
      grouped[trek.locationId] = [];
    }
    grouped[trek.locationId].push(trek);
  });

  return grouped;
}
