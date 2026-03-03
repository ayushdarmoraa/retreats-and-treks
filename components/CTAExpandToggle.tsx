'use client';

/**
 * CTAExpandToggle — Client wrapper for PrimaryCTA inline form expansion.
 *
 * Renders the CTA button. On click, expands the inline inquiry form
 * directly below — no page navigation, no modal overlay.
 *
 * Uses CSS grid height transition to avoid CLS (Cumulative Layout Shift).
 * The form container is always in the DOM with grid-template-rows: 0fr → 1fr.
 * This is the only CLS-safe CSS-only height animation technique.
 */

import { useState, Suspense } from 'react';
import InlineInquiryForm from './InlineInquiryForm';

interface CTAExpandToggleProps {
  label: string;
  vertical: 'trek' | 'retreat';
  category: string;
  sourcePath: string;
  location?: string;
}

export default function CTAExpandToggle({
  label,
  vertical,
  category,
  sourcePath,
  location,
}: CTAExpandToggleProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.4,
            cursor: 'pointer',
          }}
        >
          {label}
        </button>
      )}

      {/* CLS-safe expansion: CSS grid row transition from 0fr → 1fr */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: expanded ? '1fr' : '0fr',
          transition: 'grid-template-rows 300ms ease-out',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          {expanded && (
            <Suspense fallback={<p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', padding: '1rem 0' }}>Loading form…</p>}>
              <InlineInquiryForm
                vertical={vertical}
                category={category}
                sourcePath={sourcePath}
                location={location}
              />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
}
