'use client';

import type { ReactNode, CSSProperties } from 'react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { track } from '@/utils/telemetry';
import { buildAttributionQuery, captureAttribution } from '@/utils/attribution';
import { buildCanonicalWhatsAppUrl } from '@/lib/whatsapp';
import { buildAttributionSnapshot, readConversionSessionId, resolveConversionContext } from '@/lib/conversion-foundation';
import { useTrackedCtaView } from './useTrackedCtaView';

interface TrackedWhatsAppLinkProps {
  href?: string;
  sourcePath?: string;
  message?: string;
  ariaLabel?: string;
  location?: string;
  intent?: string;
  analyticsEvent?: 'whatsapp_click' | 'yoga_whatsapp_click';
  product?: string;
  productId?: string;
  departureId?: string;
  departureDate?: string;
  departureEndDate?: string;
  duration?: string;
  ctaPosition?: string;
  ctaId?: string;
  ctaLabel?: string;
  ctaVariant?: string;
  conversionSessionId?: string;
  leadReference?: string;
  vertical?: string;
  category?: string;
  recommendedAlternative?: string;
  trackDepartureSelection?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export default function TrackedWhatsAppLink({
  href,
  sourcePath,
  message,
  ariaLabel,
  location,
  intent,
  analyticsEvent = 'whatsapp_click',
  product,
  productId,
  departureId,
  departureDate,
  departureEndDate,
  duration,
  ctaPosition,
  ctaId,
  ctaLabel,
  ctaVariant,
  conversionSessionId,
  leadReference,
  vertical,
  category,
  recommendedAlternative,
  trackDepartureSelection = false,
  className,
  style,
  children,
}: TrackedWhatsAppLinkProps) {
  const pathname = usePathname();
  const resolvedSourcePath = sourcePath || pathname || '/';
  const [localSessionId] = useState(() => readConversionSessionId());
  const resolvedSessionId = conversionSessionId || localSessionId;
  const stableCtaId = ctaId || (
    ctaPosition === 'footer'
      ? 'footer_whatsapp'
      : ctaPosition === 'floating'
        ? 'global_floating_whatsapp'
        : ctaPosition === 'form_success'
          ? 'inline_inquiry_whatsapp'
          : undefined
  );
  const context = resolveConversionContext({
    pagePath: resolvedSourcePath,
    vertical,
    category,
    productName: product,
    productId,
    locationName: location,
    duration,
    departureId,
    departureDate: departureDate || departureEndDate,
    ctaId: stableCtaId,
    ctaLabel,
    ctaPosition,
    ctaVariant,
    conversionSessionId: resolvedSessionId,
  });
  const canonicalHref = buildCanonicalWhatsAppUrl(href, {
    message,
    context,
    leadReference,
  });
  const ctaViewRef = useTrackedCtaView({
    from: resolvedSourcePath,
    conversionSessionId: resolvedSessionId,
    pageType: context.page.type,
    vertical: context.page.vertical,
    category: context.page.category,
    ctaId: context.cta.id,
    ctaPosition: context.cta.position,
    ctaLabel: context.cta.label,
    ctaVariant: context.cta.variant,
  });

  return (
    <a
      ref={ctaViewRef}
      href={canonicalHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      style={style}
      onClick={() => {
        const searchParams = new URLSearchParams(window.location.search);
        captureAttribution(searchParams);
        const sourceUtm = buildAttributionQuery(searchParams);
        const context = resolveConversionContext({
          pagePath: resolvedSourcePath,
          vertical,
          category,
          ctaId: stableCtaId,
          ctaLabel,
          ctaPosition,
          ctaVariant,
          productName: product,
          productId,
          locationName: location,
          duration,
          departureId,
          departureDate: departureDate || departureEndDate,
          conversionSessionId: resolvedSessionId,
          attribution: buildAttributionSnapshot(searchParams),
        });
        const meta = {
          page: resolvedSourcePath,
          page_type: context.page.type,
          conversion_session_id: context.attribution.conversionSessionId,
          cta_id: context.cta.id,
          cta_position: context.cta.position,
          cta_label: context.cta.label,
          cta_variant: context.cta.variant,
          vertical: context.page.vertical,
          category: context.page.category,
          location: location || '',
          intent: intent || '',
          source: sourcePath,
          source_utm: sourceUtm,
          ...(product ? { product } : {}),
          ...(productId ? { product_id: productId } : {}),
          ...(departureId ? { departure_id: departureId } : {}),
          ...(departureDate ? { departure_date: departureDate } : {}),
          ...(departureEndDate ? { departure_end_date: departureEndDate } : {}),
          ...(duration ? { duration } : {}),
          ...(ctaPosition ? { cta_position: ctaPosition } : {}),
          ...(leadReference ? { lead_reference: leadReference } : {}),
          ...(recommendedAlternative ? { recommended_alternative: recommendedAlternative } : {}),
        };
        if (analyticsEvent === 'yoga_whatsapp_click' && trackDepartureSelection && departureId) {
          track({
            event: 'yoga_departure_selection',
            from: resolvedSourcePath,
            meta,
          });
        }
        track({
          event: analyticsEvent,
          from: resolvedSourcePath,
          meta,
        });
      }}
    >
      {children}
    </a>
  );
}
