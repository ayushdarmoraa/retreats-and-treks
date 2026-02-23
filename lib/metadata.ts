/**
 * METADATA HELPERS — SINGLE SEO BRAIN
 * Centralizes all location-based metadata generation
 * Ensures consistency, eliminates duplication, scales automatically
 */

import { Metadata } from 'next';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { getLocationById } from './locations';
import type { LocationId } from '@/config/locations';

/**
 * Get metadata for a location hub
 * Used by: /locations/[location], /treks/[location], /retreats/[location]
 *
 * This is the SINGLE SOURCE for location-specific metadata.
 * No page-level copy duplication.
 */
export function getLocationMetadata(locationId: LocationId, context?: 'treks' | 'retreats'): Metadata {
  const location = getLocationById(locationId);

  if (!location) {
    return {
      title: 'Location Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Context-specific metadata
  let title: string = location.name;
  let description: string = location.tagline;
  let path: string = '';

  if (context === 'treks') {
    title = `Treks Around ${location.name} | Beginner-Friendly Mountain Trails`;
    description = `Explore weekend treks and forest trails around ${location.name}. Beginner-friendly mountain experiences in the Himalayas.`;
    path = `/treks/${locationId}`;
  } else if (context === 'retreats') {
    title = `Retreats in ${location.name} | Guided Wellness Experiences`;
    description = `Discover weekend, meditation, and yoga retreats in ${location.name}. Small-group, guided experiences in a quiet Himalayan setting.`;
    path = `/retreats/${locationId}`;
  } else {
    // Generic location metadata
    title = `${location.name} | Himalayan Retreats & Treks`;
    description = location.tagline;
    path = `/locations/${locationId}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: buildCanonicalUrl(path),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Get metadata specifically for trek hub pages
 * Used by: /treks/[location]/page.tsx
 */
export function getTrekHubMetadata(locationId: LocationId): Metadata {
  return getLocationMetadata(locationId, 'treks');
}

/**
 * Get metadata specifically for retreat hub pages
 * Used by: /retreats/[location]/page.tsx
 */
export function getRetreatHubMetadata(locationId: LocationId): Metadata {
  return getLocationMetadata(locationId, 'retreats');
}
