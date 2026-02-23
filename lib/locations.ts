/**
 * LOCATIONS DATA ACCESS LAYER
 * Provides clean API for accessing location data across the app.
 * Source: config/locations.ts
 */

import {
  LOCATIONS,
  LocationId,
  getLocation,
  getActiveLocations,
  getRetreatsLocations,
  getTraksLocations,
} from '@/config/locations';

/**
 * Get all locations (active only)
 */
export function getAllLocations() {
  return getActiveLocations();
}

/**
 * Get a specific location by ID
 * Returns undefined if not found or inactive
 */
export function getLocationById(id: string) {
  return getLocation(id);
}

/**
 * Get all locations that support retreats
 */
export function getLocationsWithRetreats() {
  return getRetreatsLocations();
}

/**
 * Get all locations that support treks
 */
export function getLocationsWithTreks() {
  return getTraksLocations();
}

/**
 * Check if a location is active
 */
export function isLocationActive(id: string): boolean {
  return !!getLocation(id);
}
