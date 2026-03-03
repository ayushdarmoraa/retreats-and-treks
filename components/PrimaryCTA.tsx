/**
 * PrimaryCTA — Universal conversion callout component
 *
 * Server component. No hydration for the container/subtext.
 * Button is a client component (CTAExpandToggle) that expands
 * an inline inquiry form on click — NO redirect to /contact.
 *
 * Variants per page intent:
 *   "Plan My Trek" / "Plan My Retreat" / "Design My Private Retreat"
 *   "Help Me Choose My First Trek" / "Plan My Winter Trek" etc.
 */

import CTAExpandToggle from './CTAExpandToggle';

interface PrimaryCTAProps {
  /** Button label — e.g. "Plan My Trek" */
  label: string;
  /** Supporting line above the button */
  subtext?: string;
  /** trek | retreat */
  vertical: 'trek' | 'retreat';
  /** apex, seasonal, luxury, beginner, weekend, near-delhi, packages, homepage */
  category: string;
  /** Current page path for source tracking — e.g. /treks/best-trek-in-uttarakhand */
  sourcePath: string;
  /** Auto-prefill location */
  location?: string;
}

export default function PrimaryCTA({
  label,
  subtext,
  vertical,
  category,
  sourcePath,
  location,
}: PrimaryCTAProps) {
  return (
    <aside
      style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
        border: '1px solid #bbf7d0',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-lg)',
        textAlign: 'center',
        margin: 'var(--space-xl) 0',
      }}
    >
      {subtext && (
        <p
          style={{
            fontSize: '0.95rem',
            color: 'var(--color-text)',
            marginBottom: '0.75rem',
            lineHeight: 1.6,
          }}
        >
          {subtext}
        </p>
      )}
      <CTAExpandToggle
        label={label}
        vertical={vertical}
        category={category}
        sourcePath={sourcePath}
        location={location}
      />
    </aside>
  );
}
