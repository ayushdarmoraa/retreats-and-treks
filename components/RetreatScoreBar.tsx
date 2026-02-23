/**
 * RetreatScoreBar
 *
 * Server component. Renders a labeled score bar (1–10) using pure CSS.
 * No JavaScript required. Zero client component overhead.
 *
 * Variants:
 *   full   — label + bar + numeric value (journey pages, comparison engine)
 *   compact — bar only with tooltip (matrix table)
 */

import type { RetreatScores } from '@/config/retreatScores';
import { SCORE_LABELS } from '@/config/retreatScores';

interface ScoreBarProps {
  dimension: keyof RetreatScores;
  value: number;
  variant?: 'full' | 'compact';
}

export function ScoreBar({ dimension, value, variant = 'full' }: ScoreBarProps) {
  const pct = Math.round((value / 10) * 100);
  const label = SCORE_LABELS[dimension];

  const barColor =
    value <= 3 ? 'var(--color-success, #4caf50)'
    : value <= 6 ? 'var(--color-primary, #2d6a4f)'
    : 'var(--color-warning, #e07b39)';

  if (variant === 'compact') {
    return (
      <div
        title={`${label}: ${value}/10`}
        style={{ height: '6px', background: 'var(--color-border, #e5e5e5)', borderRadius: '3px', overflow: 'hidden', width: '100%' }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: barColor,
            borderRadius: '3px',
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '0.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.85rem' }}>
        <span style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
        <span style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--color-text)' }}>{value}/10</span>
      </div>
      <div
        style={{
          height: '8px',
          background: 'var(--color-border, #e5e5e5)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: barColor,
            borderRadius: '4px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}

interface RetreatScorePanelProps {
  scores: RetreatScores;
  variant?: 'full' | 'compact';
}

/** Renders all 4 dimensions for a retreat */
export default function RetreatScorePanel({ scores, variant = 'full' }: RetreatScorePanelProps) {
  const dimensions = Object.keys(scores) as (keyof RetreatScores)[];

  if (variant === 'compact') {
    return (
      <div style={{ display: 'grid', gap: '3px' }}>
        {dimensions.map((dim) => (
          <ScoreBar key={dim} dimension={dim} value={scores[dim]} variant="compact" />
        ))}
      </div>
    );
  }

  return (
    <div>
      {dimensions.map((dim) => (
        <ScoreBar key={dim} dimension={dim} value={scores[dim]} />
      ))}
    </div>
  );
}
