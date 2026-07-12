// components/ui/NumberBadge.tsx
'use client';

interface NumberBadgeProps {
  value: number | string;
  serif?: boolean; // true for Playfair (philosophy), false for Geist (trek)
  className?: string;
}

export default function NumberBadge({ value, serif = false, className = '' }: NumberBadgeProps) {
  return (
    <span className={`ui-number-badge ${serif ? 'ui-number-badge--serif' : ''} ${className}`}>
      <style>{`
        .ui-number-badge {
          font-family: var(--font-geist-sans), sans-serif;
          font-weight: 200;
          font-size: 3rem;
          color: #0f766e;
          opacity: 0.15;
          display: block;
          line-height: 0.8;
          letter-spacing: -0.06em;
          margin-bottom: 0.8rem;
          transition: opacity 0.5s ease;
        }
        .ui-number-badge--serif {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 4.5rem;
        }
        .ui-card:hover .ui-number-badge {
          opacity: 0.06;
        }
      `}</style>
      {typeof value === 'number' ? String(value).padStart(2, '0') : value}
    </span>
  );
}