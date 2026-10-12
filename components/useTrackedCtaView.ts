'use client';

import { useCallback, useEffect, useRef } from 'react';
import { track } from '@/utils/telemetry';

interface TrackedCtaViewContext {
  from: string;
  conversionSessionId?: string;
  pageType?: string;
  vertical?: string;
  category?: string;
  ctaId?: string;
  ctaPosition?: string;
  ctaLabel?: string;
  ctaVariant?: string;
}

export function useTrackedCtaView(context: TrackedCtaViewContext) {
  const element = useRef<HTMLElement | null>(null);
  const setElement = useCallback((node: HTMLElement | null) => {
    element.current = node;
  }, []);

  useEffect(() => {
    const target = element.current;
    if (!target || !context.ctaId || typeof IntersectionObserver === 'undefined') return;

    let recorded = false;
    const observer = new IntersectionObserver((entries) => {
      if (recorded || !entries.some((entry) =>
        entry.target === target && entry.isIntersecting && entry.intersectionRatio >= 0.5,
      )) return;

      recorded = true;
      observer.disconnect();
      track({
        event: 'cta_view',
        from: context.from,
        meta: {
          conversion_session_id: context.conversionSessionId,
          page_type: context.pageType,
          vertical: context.vertical,
          category: context.category,
          cta_id: context.ctaId,
          cta_position: context.ctaPosition,
          cta_label: context.ctaLabel,
          cta_variant: context.ctaVariant,
        },
      });
    }, { threshold: [0.5] });

    observer.observe(target);
    return () => observer.disconnect();
  }, [
    context.from,
    context.conversionSessionId,
    context.pageType,
    context.vertical,
    context.category,
    context.ctaId,
    context.ctaPosition,
    context.ctaLabel,
    context.ctaVariant,
  ]);

  return setElement;
}
