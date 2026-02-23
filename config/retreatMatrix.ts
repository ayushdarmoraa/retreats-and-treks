/**
 * Retreat Program Matrix Config
 *
 * Provides structured metadata for the /retreat-programs matrix table.
 * Fields here are presentation-layer only — they do not alter service data.
 *
 * intensity:  low | medium | high
 * format:     rest | yoga | meditation | creative | sound | hybrid | custom
 * bestFor:    Short label for "Best For" column (max 6 words)
 */

export type IntensityLevel = 'low' | 'medium' | 'high';
export type RetreatFormat = 'rest' | 'yoga' | 'meditation' | 'creative' | 'sound healing' | 'hybrid' | 'custom';

export interface MatrixMeta {
  intensity: IntensityLevel;
  format: RetreatFormat;
  bestFor: string;
}

export const RETREAT_MATRIX_META: Record<string, MatrixMeta> = {
  'rest-and-reset': {
    intensity: 'low',
    format: 'rest',
    bestFor: 'Nervous system reset, overworked professionals',
  },
  'burnout-recovery': {
    intensity: 'low',
    format: 'hybrid',
    bestFor: 'Deep recovery, sustained exhaustion',
  },
  'yoga-and-movement': {
    intensity: 'medium',
    format: 'yoga',
    bestFor: 'Embodied practice, physical recalibration',
  },
  'meditation-and-silence': {
    intensity: 'low',
    format: 'meditation',
    bestFor: 'Inner clarity, extended silence practice',
  },
  'art-and-creative': {
    intensity: 'medium',
    format: 'creative',
    bestFor: 'Creative unblocking, expressive reset',
  },
  'sound-healing': {
    intensity: 'low',
    format: 'sound healing',
    bestFor: 'Somatic release, first-time participants',
  },
  'weekend-retreat': {
    intensity: 'low',
    format: 'hybrid',
    bestFor: 'Time-constrained, first-time retreat',
  },
  'private-and-custom': {
    intensity: 'medium',
    format: 'custom',
    bestFor: 'Fully tailored, group or solo design',
  },
};
