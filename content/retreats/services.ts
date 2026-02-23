/**
 * RETREAT SERVICES REGISTRY (FIRST-CLASS SERVICES)
 * Location-agnostic retreat identities
 * These are designed inner journeys, not location sub-products
 */

import type { LocationId } from '@/config/locations';
import { restAndResetRetreat } from './rest-and-reset';
import { burnoutRecoveryRetreat } from './burnout-recovery';
import { yogaAndMovementRetreat } from './yoga-and-movement';
import { meditationAndSilenceRetreat } from './meditation-and-silence';
import { artAndCreativeRetreat } from './art-and-creative';
import { soundHealingRetreat } from './sound-healing';
import { weekendRetreat } from './weekend-retreat';
import { privateAndCustomRetreat } from './private-and-custom';

export type RetreatService = typeof restAndResetRetreat;

/**
 * All retreat services (first-class)
 * These are not tied to locations—locations are contexts
 */
export const RETREAT_SERVICES = [
  restAndResetRetreat,
  burnoutRecoveryRetreat,
  yogaAndMovementRetreat,
  meditationAndSilenceRetreat,
  artAndCreativeRetreat,
  soundHealingRetreat,
  weekendRetreat,
  privateAndCustomRetreat,
] as const;

/**
 * Get a single retreat service by slug
 */
export function getRetreatServiceBySlug(slug: string): RetreatService | undefined {
  return RETREAT_SERVICES.find((retreat) => retreat.slug === slug) as RetreatService | undefined;
}

/**
 * Get all retreat services
 */
export function getAllRetreatServices(): RetreatService[] {
  return [...RETREAT_SERVICES] as RetreatService[];
}

/**
 * Get retreat services most relevant to a location
 * Useful for /retreats/[location] to suggest compatible retreats
 */
export function getRetreatsForLocation(locationId: LocationId): RetreatService[] {
  // Map locations to retreat affinity
  const affinityMap: Record<LocationId, string[]> = {
    chakrata: ['rest-and-reset', 'meditation-and-silence'],
    sankri: ['burnout-recovery', 'threshold-work', 'yoga-and-movement'],
    mussoorie: ['creative-retreat', 'rest-and-reset', 'couples-retreat'],
    munsiyari: ['burnout-recovery', 'threshold-work', 'embodied-presence'],
    rishikesh: ['spiritual-grounding', 'yoga-and-movement', 'meditation-and-silence'],
  };

  const relevantSlugs = affinityMap[locationId] || [];
  return RETREAT_SERVICES.filter((r) => relevantSlugs.includes(r.slug)) as RetreatService[];
}
