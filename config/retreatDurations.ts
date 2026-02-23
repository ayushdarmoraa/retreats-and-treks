/**
 * Retreat Duration Config
 * Single source of truth for retreat duration groupings.
 * Used by DurationRetreatSuggestions and RelatedRetreats for deterministic ordering.
 * When a durationDays field is added to retreat service files, replace this map.
 */

export type DurationGroup = '3-day' | '5-day' | 'flexible';

export const RETREAT_DURATION_GROUP: Record<string, DurationGroup> = {
  'weekend-retreat': '3-day',
  'sound-healing': '3-day',
  'rest-and-reset': '5-day',
  'burnout-recovery': '5-day',
  'yoga-and-movement': '5-day',
  'meditation-and-silence': '5-day',
  'art-and-creative': '5-day',
  'private-and-custom': 'flexible',
};
