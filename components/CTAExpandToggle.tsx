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
import { buildAttributionSnapshot, readConversionSessionId, resolveConversionContext } from '@/lib/conversion-foundation';
import { useTrackedCtaView } from './useTrackedCtaView';

interface CTAExpandToggleProps {
  label: string;
  vertical: 'trek' | 'retreat';
  category: string;
  sourcePath: string;
  pageType?: string;
  location?: string;
  yogaInterest?: string;
  duration?: string;
  yogaExperience?: string;
  preferredMonth?: string;
  productId?: string;
  departureId?: string;
  productName?: string;
  experience?: string;
  departureDate?: string;
  ctaId?: string;
  ctaPosition?: string;
  buttonClassName?: string;
  buttonStyle?: React.CSSProperties;
  planningHorizon?: string;
  productOption?: string;
}

export default function CTAExpandToggle({
  label,
  vertical,
  category,
  sourcePath,
  pageType,
  location,
  yogaInterest,
  duration,
  yogaExperience,
  preferredMonth,
  productId,
  departureId,
  productName,
  experience,
  departureDate,
  ctaId,
  ctaPosition,
  buttonClassName,
  buttonStyle,
  planningHorizon,
  productOption,
}: CTAExpandToggleProps) {
  const [expanded, setExpanded] = useState(false);
  const [conversionSessionId] = useState(() => readConversionSessionId());
  const isYogaCta = category.toLowerCase().includes('yoga') || sourcePath.toLowerCase().includes('yoga');
  const isArtCta = category.toLowerCase().includes('art') || sourcePath.toLowerCase().includes('art');
  const resolvedCtaPosition = ctaPosition || (category === 'yoga-finder' ? 'finder_result' : 'primary');
  const resolvedContext = resolveConversionContext({
    pagePath: sourcePath,
    pageType,
    vertical,
    category,
    locationName: location,
    duration,
    productId,
    productName,
    departureId,
    departureDate,
    conversionSessionId,
    ctaId,
    ctaLabel: label,
    ctaPosition: resolvedCtaPosition,
  });
  const resolvedCtaId = resolvedContext.cta.id;
  const buttonRef = useTrackedCtaView({
    from: sourcePath,
    conversionSessionId,
    pageType: resolvedContext.page.type,
    vertical: resolvedContext.page.vertical,
    category: resolvedContext.page.category,
    ctaId: resolvedCtaId,
    ctaPosition: resolvedContext.cta.position,
    ctaLabel: resolvedContext.cta.label,
    ctaVariant: resolvedContext.cta.variant,
  });

  return (
    <>
      {!expanded && (
        <button
          ref={buttonRef}
          type="button"
          onClick={() => {
            const searchParams = new URLSearchParams(window.location.search);
            captureAttribution(searchParams);
            const sourceUtm = buildAttributionQuery(searchParams);
            const conversionContext = resolveConversionContext({
              pagePath: sourcePath,
              pageType,
              vertical,
              category,
              locationName: location,
              duration,
              productId,
              productName,
              departureId,
              departureDate,
              conversionSessionId,
              ctaId: resolvedCtaId,
              ctaLabel: label,
              ctaPosition: resolvedCtaPosition,
              attribution: buildAttributionSnapshot(searchParams),
            });
            const context = {
              page: conversionContext.page.path,
              page_type: conversionContext.page.type,
              label,
              vertical: conversionContext.page.vertical || vertical,
              category: conversionContext.page.category || category,
              location: conversionContext.location.name || '',
              duration: conversionContext.duration || '',
              cta_id: conversionContext.cta.id,
              cta_label: conversionContext.cta.label,
              cta_position: conversionContext.cta.position,
              cta_variant: conversionContext.cta.variant,
              conversion_session_id: conversionContext.attribution.conversionSessionId,
              yoga_interest: yogaInterest || '',
              yoga_experience: yogaExperience || '',
              ...(productOption ? { product: productOption } : {}),
              ...(productName ? { product_name: productName } : {}),
              ...(productId ? { product_id: productId } : {}),
              ...(departureId ? { departure_id: departureId } : {}),
              ...(departureDate ? { departure_date: departureDate } : {}),
              source: sourcePath,
              source_utm: sourceUtm,
            };
            track({
              event: 'cta_click',
              from: sourcePath,
              meta: context,
            });
            if (isYogaCta) {
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
            ...buttonStyle,
          }}
          className={buttonClassName}
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
                preferredMonth={preferredMonth}
                productId={productId}
                departureId={departureId}
                productName={productName}
                experience={experience}
                departureDate={departureDate}
                pageType={isArtCta ? 'art_product' : pageType}
                planningHorizon={planningHorizon}
                productOption={productOption}
                ctaId={resolvedCtaId}
                ctaPosition={resolvedCtaPosition}
                ctaLabel={label}
              />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
}
