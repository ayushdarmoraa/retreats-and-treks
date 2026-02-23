/**
 * LOCATION PREMIUM CONTENT REGISTRY
 * Editorial, intention-based narrative for location pages
 * Single source of truth for location-specific messaging
 */

import type { LocationId } from '@/config/locations';
import { chakrataLocation } from './chakrata';
import { sankriLocation } from './sankri';
import { mussoorieLocation } from './mussoorie';
import { munsiyariLocation } from './munsiyari';
import { rishikeshLocation } from './rishikesh';

export type LocationPremiumContent = {
  readonly id: LocationId;
  readonly name: string;
  readonly landTone: {
    readonly opening: string;
  };
  readonly bridgingInnerWorkMovement: {
    readonly title: string;
    readonly description: string;
  };
  readonly retreatLogic: {
    readonly title: string;
    readonly factors: ReadonlyArray<{
      readonly title: string;
      readonly description: string;
    }>;
  };
  readonly intentionsFit: {
    readonly title: string;
    readonly description: string;
    readonly intentions: ReadonlyArray<{
      readonly title: string;
      readonly description: string;
    }>;
  };
  readonly seasonalCharacter: {
    readonly title: string;
    readonly seasons: ReadonlyArray<{
      readonly month: string;
      readonly mood: string;
      readonly description: string;
    }>;
  };
  readonly practicalContext: {
    readonly title: string;
    readonly bestSeasons: string;
    readonly accessibility: string;
    readonly crowdProfile: string;
    readonly notFor: string;
  };
  readonly networkContext: string;
  readonly ctaText: string;
  /** Data associations for this location */
  readonly retreatSlugs: ReadonlyArray<string>;
  readonly trekSlugs: ReadonlyArray<string>;
  readonly relatedBlogSlugs: ReadonlyArray<string>;
  /** Places & Landscapes: sights, villages, nature, cultural spots */
  readonly placesAndLandscapes: ReadonlyArray<{
    readonly name: string;
    readonly type: 'waterfall' | 'meadow' | 'forest' | 'village' | 'viewpoint' | 'cave' | 'cultural' | 'natural';
    readonly description: string;
    readonly season?: string; // e.g. "year-round" or "April-October"
  }>;
  /** Soft Experiences: walks, cultural immersion, seasonal phenomena (not products) */
  readonly softExperiences: ReadonlyArray<{
    readonly name: string;
    readonly type: 'walk' | 'cultural' | 'seasonal' | 'exploration';
    readonly description: string;
  }>;
};

const LOCATION_CONTENT: Record<LocationId, LocationPremiumContent> = {
  chakrata: chakrataLocation,
  sankri: sankriLocation,
  mussoorie: mussoorieLocation,
  munsiyari: munsiyariLocation,
  rishikesh: rishikeshLocation,
};

/**
 * Get premium content for a location
 * Returns undefined if location not found
 */
export function getLocationPremiumContent(locationId: LocationId): LocationPremiumContent | undefined {
  return LOCATION_CONTENT[locationId];
}

/**
 * Get all location premium content
 */
export function getAllLocationContent(): LocationPremiumContent[] {
  return Object.values(LOCATION_CONTENT);
}
