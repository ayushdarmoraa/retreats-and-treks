/**
 * Retreat Fit Score Dimensions
 *
 * Each retreat is scored across 4 axes on a 1–10 scale.
 * These scores are editorial judgments based on program intent,
 * not marketing claims.
 *
 * Dimensions:
 *   intensity        — physical/mental effort required (1 = very gentle, 10 = demanding)
 *   reflectionDepth  — depth of inward or contemplative focus (1 = light, 10 = intensive)
 *   socialInteraction — amount of group engagement (1 = solo/silent, 10 = highly social)
 *   physicalDemand   — body movement and outdoor physical activity (1 = minimal, 10 = high)
 */

export interface RetreatScores {
  intensity: number;
  reflectionDepth: number;
  socialInteraction: number;
  physicalDemand: number;
}

export const RETREAT_SCORES: Record<string, RetreatScores> = {
  'rest-and-reset': {
    intensity: 2,
    reflectionDepth: 6,
    socialInteraction: 3,
    physicalDemand: 2,
  },
  'burnout-recovery': {
    intensity: 2,
    reflectionDepth: 8,
    socialInteraction: 4,
    physicalDemand: 2,
  },
  'yoga-and-movement': {
    intensity: 6,
    reflectionDepth: 5,
    socialInteraction: 6,
    physicalDemand: 7,
  },
  'meditation-and-silence': {
    intensity: 3,
    reflectionDepth: 9,
    socialInteraction: 2,
    physicalDemand: 1,
  },
  'art-and-creative': {
    intensity: 4,
    reflectionDepth: 7,
    socialInteraction: 6,
    physicalDemand: 2,
  },
  'sound-healing': {
    intensity: 2,
    reflectionDepth: 7,
    socialInteraction: 5,
    physicalDemand: 1,
  },
  'weekend-retreat': {
    intensity: 3,
    reflectionDepth: 5,
    socialInteraction: 5,
    physicalDemand: 3,
  },
  'private-and-custom': {
    intensity: 5,
    reflectionDepth: 6,
    socialInteraction: 3,
    physicalDemand: 4,
  },
};

export const SCORE_LABELS: Record<keyof RetreatScores, string> = {
  intensity: 'Intensity',
  reflectionDepth: 'Reflection Depth',
  socialInteraction: 'Social Interaction',
  physicalDemand: 'Physical Demand',
};
