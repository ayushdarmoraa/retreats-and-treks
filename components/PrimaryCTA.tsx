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
  position: 'relative',
  background: '#f7f9f7',
  border: '1px solid rgba(15,118,110,0.15)',
  borderLeft: '3px solid var(--color-primary)',
  borderRadius: '2px',
  padding: 'var(--space-lg)',
  textAlign: 'center',
  margin: 'var(--space-xl) 0',
  overflow: 'hidden',
}}

    >
      <span aria-hidden="true" style={{
  position: 'absolute', inset: 0,
  background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(15,118,110,0.04) 0%, transparent 70%)',
  pointerEvents: 'none',
}} />
      {subtext && (
        <p
          style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
fontSize: '0.88rem', fontWeight: 300, color: '#666666', lineHeight: 1.7
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
