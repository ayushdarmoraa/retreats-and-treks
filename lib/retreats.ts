/**
 * RETREATS DATA ACCESS LAYER
 * Provides clean API for accessing retreat data across the app.
 * Source: content/retreats/index.ts + locations context
 */

import { RetreatContent } from '@/types/content';
import { LocationId } from '@/config/locations';

import {
  ALL_RETREAT_FORMATS,
  getRetreatBySlug as contentGetRetreatBySlug,
  getRetreatsByLocation as contentGetRetreatsByLocation,
  getAllRetreats as contentGetAllRetreats,
} from '@/content/retreats';

import { getLocationById } from './locations';

/**
 * Get all retreat formats (global)
 */
export function getAllRetreatFormats(): RetreatContent[] {
  return contentGetAllRetreats();
}

/**
 * Get a specific retreat format by slug
 */
export function getRetreatBySlug(slug: string): RetreatContent | undefined {
  return contentGetRetreatBySlug(slug);
}

/**
 * Get all retreat formats available at a specific location
 * Validates that location exists and is active
 */
export function getRetreatsByLocation(locationId: LocationId): RetreatContent[] {
  // Ensure location is active
  if (!getLocationById(locationId as string)) {
    return [];
  }
  return contentGetRetreatsByLocation(locationId);
}

/**
 * Get all retreat formats with their supporting locations
 * Useful for discovery pages that show formats + where they run
 */
export function getAllRetreatFormatsWithLocations(): Array<
  RetreatContent & { availableLocations: Array<{ id: LocationId; name: string }> }
> {
  return getAllRetreatFormats().map((retreat) => ({
    ...retreat,
    availableLocations: [],
    // Future: extend to support multi-location retreats
  }));
}
