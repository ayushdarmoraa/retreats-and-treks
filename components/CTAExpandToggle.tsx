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
import { track } from '@/utils/telemetry';
import { buildAttributionQuery, captureAttribution } from '@/utils/attribution';

interface CTAExpandToggleProps {
  label: string;
  vertical: 'trek' | 'retreat';
  category: string;
  sourcePath: string;
  location?: string;
  yogaInterest?: string;
  duration?: string;
  yogaExperience?: string;
  productId?: string;
  departureId?: string;
  planningHorizon?: string;
  productOption?: string;
}

export default function CTAExpandToggle({
  label,
  vertical,
  category,
  sourcePath,
  location,
  yogaInterest,
  duration,
  yogaExperience,
  productId,
  departureId,
  planningHorizon,
  productOption,
}: CTAExpandToggleProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {!expanded && (
        <button
          type="button"
          onClick={() => {
            const searchParams = new URLSearchParams(window.location.search);
            captureAttribution(searchParams);
            const sourceUtm = buildAttributionQuery(searchParams);
            if (category.toLowerCase().includes('yoga') || sourcePath.toLowerCase().includes('yoga')) {
              const context = {
                page: sourcePath,
                label,
                vertical,
                category,
                location: location || '',
                duration: duration || '',
                yoga_interest: yogaInterest || '',
                yoga_experience: yogaExperience || '',
                ...(productOption ? { product: productOption } : {}),
                ...(productId ? { product_id: productId } : {}),
                ...(departureId ? { departure_id: departureId } : {}),
                source: sourcePath,
                source_utm: sourceUtm,
              };
              track({
                event: 'cta_click',
                from: sourcePath,
                meta: { ...context, cta_position: 'inline-form-trigger' },
              });
              track({
                event: 'yoga_form_open',
                from: sourcePath,
                meta: context,
              });
            }
            setExpanded(true);
          }}
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
                yogaInterest={yogaInterest}
                duration={duration}
                yogaExperience={yogaExperience}
                productId={productId}
                departureId={departureId}
                planningHorizon={planningHorizon}
                productOption={productOption}
              />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
}
