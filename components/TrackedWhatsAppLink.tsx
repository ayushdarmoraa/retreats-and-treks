'use client';

import type { ReactNode, CSSProperties } from 'react';
import { track } from '@/utils/telemetry';
import { buildAttributionQuery, captureAttribution } from '@/utils/attribution';

interface TrackedWhatsAppLinkProps {
  href: string;
  sourcePath: string;
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
  recommendedAlternative?: string;
  trackDepartureSelection?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export default function TrackedWhatsAppLink({
  href,
  sourcePath,
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
  recommendedAlternative,
  trackDepartureSelection = false,
  className,
  style,
  children,
}: TrackedWhatsAppLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={() => {
        const searchParams = new URLSearchParams(window.location.search);
        captureAttribution(searchParams);
        const sourceUtm = buildAttributionQuery(searchParams);
        const meta = {
          page: sourcePath,
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
          ...(recommendedAlternative ? { recommended_alternative: recommendedAlternative } : {}),
        };
        if (analyticsEvent === 'yoga_whatsapp_click' && trackDepartureSelection && departureId) {
          track({
            event: 'yoga_departure_selection',
            from: sourcePath,
            meta,
          });
        }
        track({
          event: analyticsEvent,
          from: sourcePath,
          meta,
        });
      }}
    >
      {children}
    </a>
  );
}
