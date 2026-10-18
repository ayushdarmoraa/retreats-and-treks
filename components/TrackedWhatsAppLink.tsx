'use client';

import type { ReactNode, CSSProperties } from 'react';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { track } from '@/utils/telemetry';
import { buildAttributionQuery, captureAttribution } from '@/utils/attribution';
import { buildCanonicalWhatsAppUrl } from '@/lib/whatsapp';
import { buildAttributionSnapshot, readConversionSessionId, resolveConversionContext } from '@/lib/conversion-foundation';
import { acquirePendingSubmissionToken } from '@/lib/submission-token';
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
  const [captureOpen, setCaptureOpen] = useState(false);
  const [captureName, setCaptureName] = useState('');
  const [capturePhone, setCapturePhone] = useState('');
  const [captureEmail, setCaptureEmail] = useState('');
  const [captureTiming, setCaptureTiming] = useState('');
  const [captureGroupSize, setCaptureGroupSize] = useState('');
  const [captureMessage, setCaptureMessage] = useState('');
  const [captureConsent, setCaptureConsent] = useState(false);
  const [captureSubmitting, setCaptureSubmitting] = useState(false);
  const [captureError, setCaptureError] = useState('');
  const [savedLeadReference, setSavedLeadReference] = useState('');
  const [captureSaved, setCaptureSaved] = useState(false);
  const captureStartedRef = useRef(false);
  const captureSavedRef = useRef(false);
  const captureOpenedAtRef = useRef(0);
  const resolvedSessionId = conversionSessionId || localSessionId;
  const requiresLeadCapture = !leadReference && ctaPosition !== 'form_success';
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
    leadReference: savedLeadReference || leadReference,
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

  function openCapture() {
    captureOpenedAtRef.current = Date.now();
    captureStartedRef.current = true;
    captureSavedRef.current = false;
    setCaptureError('');
    setCaptureOpen(true);
    track({
      event: 'lead_capture_open',
      from: resolvedSourcePath,
      meta: {
        conversion_session_id: resolvedSessionId,
        page_type: context.page.type,
        vertical: context.page.vertical,
        category: context.page.category,
        cta_id: context.cta.id,
        cta_position: context.cta.position,
        form: 'whatsapp_click_capture',
      },
    });
  }

  function closeCapture() {
    if (captureStartedRef.current && !captureSavedRef.current) {
      track({
        event: 'lead_capture_abandon',
        from: resolvedSourcePath,
        meta: {
          conversion_session_id: resolvedSessionId,
          page_type: context.page.type,
          vertical: context.page.vertical,
          category: context.page.category,
          cta_id: context.cta.id,
          cta_position: context.cta.position,
          form: 'whatsapp_click_capture',
          last_step: 'contact_details',
        },
      });
    }
    captureStartedRef.current = false;
    setCaptureOpen(false);
  }

  function trackHandoffClick() {
    const searchParams = new URLSearchParams(window.location.search);
    captureAttribution(searchParams);
    const sourceUtm = buildAttributionQuery(searchParams);
    const handoffContext = resolveConversionContext({
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
      page_type: handoffContext.page.type,
      conversion_session_id: handoffContext.attribution.conversionSessionId,
      cta_id: handoffContext.cta.id,
      cta_position: handoffContext.cta.position,
      cta_label: handoffContext.cta.label,
      cta_variant: handoffContext.cta.variant,
      vertical: handoffContext.page.vertical,
      category: handoffContext.page.category,
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
      ...((savedLeadReference || leadReference) ? { lead_reference: savedLeadReference || leadReference } : {}),
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
  }

  async function submitCapture(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (captureSubmitting) return;
    setCaptureError('');

    const phone = capturePhone.trim();
    const digits = phone.replace(/\D/g, '');
    if (captureName.trim().length < 2) {
      setCaptureError('Please enter your name.');
      return;
    }
    if (!/^[+\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
      setCaptureError('Please enter a valid WhatsApp number.');
      return;
    }
    if (!captureConsent) {
      setCaptureError('Please agree before saving your contact details.');
      return;
    }

    setCaptureSubmitting(true);
    try {
      const searchParams = new URLSearchParams(window.location.search);
      captureAttribution(searchParams);
      const attribution = buildAttributionSnapshot(searchParams);
      const inquiry = {
        name: captureName.trim(),
        phone,
        email: captureEmail.trim(),
        source: resolvedSourcePath,
        vertical: context.page.vertical || '',
        category: context.page.category || '',
        interestedIn: context.page.vertical === 'trek' || context.page.vertical === 'retreat'
          ? context.page.vertical
          : '',
        product: context.product?.name || '',
        productId: context.product?.id || '',
        departureId: context.departure?.id || '',
        departureDate: context.departure?.date || '',
        location: context.location?.name || '',
        duration: context.duration || '',
        preferredTiming: captureTiming.trim(),
        groupSize: captureGroupSize.trim(),
        conversionSessionId: resolvedSessionId,
        firstLandingPage: attribution.firstLandingPage,
        lastLandingPage: attribution.lastLandingPage,
        referrer: attribution.referrer,
        firstUtm: attribution.firstUtm,
        lastUtm: attribution.lastUtm,
        firstTouchAt: attribution.firstTouchAt,
        lastTouchAt: attribution.lastTouchAt,
        ctaId: context.cta.id,
        ctaLabel: context.cta.label,
        ctaPosition: context.cta.position,
        ctaVariant: context.cta.variant,
        additionalRequest: [
          captureMessage.trim(),
          'Contact consent provided for follow-up about this enquiry via WhatsApp.',
        ].filter(Boolean).join('\n\n'),
        website: '',
        _t: captureOpenedAtRef.current,
      };
      const pendingToken = await acquirePendingSubmissionToken(
        `whatsapp-click:${resolvedSourcePath}:${context.cta.id}`,
        inquiry,
      );
      const response = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...inquiry, submissionToken: pendingToken.token }),
      });
      const data: unknown = await response.json().catch(() => ({}));
      if (!response.ok || !data || typeof data !== 'object' || !('success' in data) || data.success !== true) {
        const errorMessage = data && typeof data === 'object' && 'error' in data && typeof data.error === 'string'
          ? data.error
          : 'Unable to save your enquiry. Please try again.';
        setCaptureError(errorMessage);
        return;
      }

      pendingToken.clear();
      const reference = 'leadReference' in data && typeof data.leadReference === 'string'
        ? data.leadReference
        : '';
      setSavedLeadReference(reference);
      setCaptureSaved(true);
      captureSavedRef.current = true;
    } catch {
      setCaptureError('Network error. Please try again.');
    } finally {
      setCaptureSubmitting(false);
    }
  }

  return (
    <>
      <a
        ref={ctaViewRef}
        href={requiresLeadCapture ? '#whatsapp-lead-capture' : canonicalHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={className}
        style={style}
        onClick={(event) => {
          if (requiresLeadCapture) {
            event.preventDefault();
            if (!captureOpen) openCapture();
            return;
          }
          trackHandoffClick();
        }}
      >
        {children}
      </a>
      {captureOpen && (
        <div
          onClick={(event) => {
            if (event.target === event.currentTarget) closeCapture();
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'grid',
            placeItems: 'center',
            padding: '1rem',
            background: 'rgba(15, 23, 42, 0.58)',
          }}
        >
          <section
            id="whatsapp-lead-capture"
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-capture-title"
            style={{
              position: 'relative',
              width: 'min(100%, 28rem)',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md, 12px)',
              background: 'var(--color-bg, #fff)',
              color: 'var(--color-text, #111827)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.24)',
            }}
          >
            <button
              type="button"
              aria-label="Close WhatsApp enquiry form"
              onClick={closeCapture}
              disabled={captureSubmitting}
              style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}
            >
              Close
            </button>
            {captureSaved ? (
              <div role="status">
                <h2 id="whatsapp-capture-title">Enquiry saved</h2>
                <p>Your details are saved. Continue to WhatsApp to send your message.</p>
                {savedLeadReference && <p>Reference: {savedLeadReference}</p>}
                <a
                  href={canonicalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackHandoffClick();
                    closeCapture();
                  }}
                >
                  Continue to WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={submitCapture}>
                <h2 id="whatsapp-capture-title">Before you continue to WhatsApp</h2>
                <p>Share your contact details so our team can follow up about this enquiry.</p>
                <label htmlFor="whatsapp-capture-name">Name *</label>
                <input
                  id="whatsapp-capture-name"
                  autoComplete="name"
                  required
                  minLength={2}
                  value={captureName}
                  onChange={(event) => setCaptureName(event.target.value)}
                />
                <label htmlFor="whatsapp-capture-phone">WhatsApp / phone *</label>
                <input
                  id="whatsapp-capture-phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={capturePhone}
                  onChange={(event) => setCapturePhone(event.target.value)}
                />
                <label htmlFor="whatsapp-capture-email">Email (optional)</label>
                <input
                  id="whatsapp-capture-email"
                  type="email"
                  autoComplete="email"
                  value={captureEmail}
                  onChange={(event) => setCaptureEmail(event.target.value)}
                />
                <label htmlFor="whatsapp-capture-timing">Preferred dates or timing (optional)</label>
                <input
                  id="whatsapp-capture-timing"
                  maxLength={100}
                  value={captureTiming}
                  onChange={(event) => setCaptureTiming(event.target.value)}
                />
                <label htmlFor="whatsapp-capture-group-size">Group size (optional)</label>
                <input
                  id="whatsapp-capture-group-size"
                  maxLength={20}
                  value={captureGroupSize}
                  onChange={(event) => setCaptureGroupSize(event.target.value)}
                />
                <label htmlFor="whatsapp-capture-message">Anything else we should know? (optional)</label>
                <textarea
                  id="whatsapp-capture-message"
                  value={captureMessage}
                  onChange={(event) => setCaptureMessage(event.target.value)}
                  maxLength={3500}
                  rows={3}
                />
                <label>
                  <input
                    type="checkbox"
                    checked={captureConsent}
                    onChange={(event) => setCaptureConsent(event.target.checked)}
                  />
                  I agree that Retreats and Treks may use these details to respond to this enquiry and contact me on WhatsApp.
                </label>
                {captureError && <p role="alert">{captureError}</p>}
                <button type="submit" disabled={captureSubmitting}>
                  {captureSubmitting ? 'Saving...' : 'Save and continue'}
                </button>
              </form>
            )}
          </section>
        </div>
      )}
    </>
  );
}
