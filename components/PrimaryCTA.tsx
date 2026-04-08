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
  label: string;
  subtext?: string;
  vertical: 'trek' | 'retreat';
  category: string;
  sourcePath: string;
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
    <aside style={{
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      background: '#ffffff',
      borderTop: '1px solid #e5e7eb',
      borderBottom: '1px solid #e5e7eb',
      padding: '3.5rem 2rem',
      margin: 'var(--space-xl) calc(-50vw + 50%)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Subtle top accent line */}
      <span aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '80px', height: '2px',
        background: 'var(--color-primary)',
        opacity: 0.6,
      }} />

      <div style={{ maxWidth: '32rem', margin: '0 auto', position: 'relative' }}>

        {/* Eyebrow */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '0.75rem',
          marginBottom: '1rem',
        }}>
          <span style={{
            width: '20px', height: '1px',
            background: 'var(--color-primary)',
            opacity: 0.4, display: 'inline-block',
          }} />
          <span style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.75rem', letterSpacing: '0.28em',
            textTransform: 'uppercase' as const,
            color: '#374151', fontWeight: 500,
          }}>Ready to Trek?</span>
          <span style={{
            width: '20px', height: '1px',
            background: 'var(--color-primary)',
            opacity: 0.4, display: 'inline-block',
          }} />
        </div>

        {subtext && (
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            color: '#555555',
            lineHeight: 1.8,
            marginBottom: '1.75rem',
            letterSpacing: '0.01em',
          }}>
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

      </div>
    </aside>
  );
}