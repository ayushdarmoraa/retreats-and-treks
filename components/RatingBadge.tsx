/**
 * RatingBadge — Server component
 *
 * Renders a star rating badge only when real review data exists.
 * Three display variants:
 *
 *   compact  — ★ 4.8 · 12  (matrix, related retreats)
 *   standard — ★★★★★ 4.8 · 12 reviews  (journey pages)
 *   inline   — Rated 4.8/5 by 12 participants  (finder results)
 *
 * Renders nothing if rating is null or undefined.
 * Zero fake stars. Zero placeholder content.
 */

export interface RatingInfo {
  value: number;    // e.g. 4.8
  count: number;    // e.g. 12
}

interface RatingBadgeProps {
  rating: RatingInfo | null | undefined;
  variant?: 'compact' | 'standard' | 'inline';
}

function starFill(value: number, position: 1 | 2 | 3 | 4 | 5): 'full' | 'half' | 'empty' {
  if (value >= position) return 'full';
  if (value >= position - 0.5) return 'half';
  return 'empty';
}

const STAR_COLORS = { full: '#f59e0b', half: '#f59e0b', empty: '#d1d5db' };

function StarIcon({ fill }: { fill: 'full' | 'half' | 'empty' }) {
  return (
    <span
      aria-hidden="true"
      style={{
        color: STAR_COLORS[fill],
        fontSize: 'inherit',
        lineHeight: 1,
        display: 'inline-block',
      }}
    >
      {fill === 'empty' ? '☆' : '★'}
    </span>
  );
}

export default function RatingBadge({ rating, variant = 'compact' }: RatingBadgeProps) {
  if (!rating || rating.count < 2) return null;

  const { value, count } = rating;
  const displayValue = value.toFixed(1);

  if (variant === 'compact') {
    return (
      <span
        title={`Rated ${displayValue}/5 by ${count} participants`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
          fontSize: '0.8rem',
          color: 'var(--color-text-secondary)',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: '#f59e0b' }}>★</span>
        <span style={{ fontWeight: 600 }}>{displayValue}</span>
        <span style={{ opacity: 0.6 }}>· {count}</span>
      </span>
    );
  }

  if (variant === 'standard') {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.9rem',
        }}
        aria-label={`Rated ${displayValue} out of 5 by ${count} participants`}
      >
        <span style={{ fontSize: '1rem', letterSpacing: '1px' }}>
          {([1, 2, 3, 4, 5] as const).map((pos) => (
            <StarIcon key={pos} fill={starFill(value, pos)} />
          ))}
        </span>
        <span style={{ fontWeight: 700 }}>{displayValue}</span>
        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
          · {count} review{count !== 1 ? 's' : ''}
        </span>
      </div>
    );
  }

  // inline
  return (
    <span
      style={{
        fontSize: '0.85rem',
        color: 'var(--color-text-secondary)',
      }}
    >
      <span style={{ color: '#f59e0b' }}>★</span>{' '}
      Rated <strong>{displayValue}/5</strong> by {count} participant{count !== 1 ? 's' : ''}
    </span>
  );
}
