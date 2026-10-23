'use client';

import type { ReactNode, CSSProperties } from 'react';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
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
    ...(captureSaved ? {
      name: captureName,
      phone: capturePhone,
      retreatContext: [
        context.product.name,
        context.location.name,
        context.duration,
        context.departure.date,
      ].filter(Boolean).join(' - ') || resolvedSourcePath,
      timing: captureTiming,
      groupSize: captureGroupSize,
      additionalNotes: captureMessage,
    } : {}),
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
      {captureOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="wa-capture-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeCapture();
          }}
        >
          <section
            id="whatsapp-lead-capture"
            className="wa-capture-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={captureSaved ? undefined : 'whatsapp-capture-title'}
            aria-label={captureSaved ? 'Continue to WhatsApp' : undefined}
          >
            <button
              type="button"
              className="wa-capture-close"
              aria-label="Close WhatsApp enquiry form"
              onClick={closeCapture}
              disabled={captureSubmitting}
            >
              Close
            </button>
            {captureSaved ? (
              <div className="wa-capture-success" role="status">
                <div className="wa-capture-success-heading">
                  <span className="wa-capture-success-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <circle cx="12" cy="12" r="9" />
                      <path d="m8 12 2.5 2.5L16 9" />
                    </svg>
                  </span>
                  <div>
                    <h2 className="wa-capture-success-title">Thank you!</h2>
                    <p className="wa-capture-success-subtitle">Thank you for your interest in Retreats &amp; Treks.</p>
                  </div>
                </div>
                <p className="wa-capture-success-message">
                  Your Himalayan journey could start here. Continue on WhatsApp to discuss your retreat preferences with our team.
                </p>
                <a
                  href={canonicalHref}
                  className="wa-capture-submit"
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
              <form className="wa-capture-form" onSubmit={submitCapture}>
                <h2 className="wa-capture-title" id="whatsapp-capture-title">Before you continue to WhatsApp</h2>
                <p className="wa-capture-description">Share your contact details so our team can follow up about this enquiry.</p>
                <div className="wa-capture-field">
                  <label htmlFor="whatsapp-capture-name">Name *</label>
                  <input
                    id="whatsapp-capture-name"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                    minLength={2}
                    value={captureName}
                    onChange={(event) => setCaptureName(event.target.value)}
                  />
                </div>
                <div className="wa-capture-field">
                  <label htmlFor="whatsapp-capture-phone">WhatsApp / phone *</label>
                  <input
                    id="whatsapp-capture-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Your WhatsApp number"
                    required
                    value={capturePhone}
                    onChange={(event) => setCapturePhone(event.target.value)}
                  />
                </div>
                <div className="wa-capture-field">
                  <label htmlFor="whatsapp-capture-email">Email (optional)</label>
                  <input
                    id="whatsapp-capture-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={captureEmail}
                    onChange={(event) => setCaptureEmail(event.target.value)}
                  />
                </div>
                <div className="wa-capture-row">
                  <div className="wa-capture-field">
                    <label htmlFor="whatsapp-capture-timing">Preferred dates or timing (optional)</label>
                    <input
                      id="whatsapp-capture-timing"
                      maxLength={100}
                      placeholder="e.g. June or October"
                      value={captureTiming}
                      onChange={(event) => setCaptureTiming(event.target.value)}
                    />
                  </div>
                  <div className="wa-capture-field">
                    <label htmlFor="whatsapp-capture-group-size">Group size (optional)</label>
                    <input
                      id="whatsapp-capture-group-size"
                      maxLength={20}
                      placeholder="e.g. 2"
                      value={captureGroupSize}
                      onChange={(event) => setCaptureGroupSize(event.target.value)}
                    />
                  </div>
                </div>
                <div className="wa-capture-field">
                  <label htmlFor="whatsapp-capture-message">Anything else we should know? (optional)</label>
                  <textarea
                    id="whatsapp-capture-message"
                    value={captureMessage}
                    onChange={(event) => setCaptureMessage(event.target.value)}
                    maxLength={3500}
                    rows={3}
                  />
                </div>
                <label className="wa-capture-consent">
                  <input
                    type="checkbox"
                    checked={captureConsent}
                    onChange={(event) => setCaptureConsent(event.target.checked)}
                  />
                  <span>I agree that Retreats and Treks may use these details to respond to this enquiry and contact me on WhatsApp.</span>
                </label>
                {captureError && <p className="wa-capture-error" role="alert">{captureError}</p>}
                <button className="wa-capture-submit" type="submit" disabled={captureSubmitting}>
                  {captureSubmitting ? 'Saving...' : 'Save and continue'}
                </button>
              </form>
            )}
          </section>
          <style>{`
            .wa-capture-overlay {
              position: fixed;
              inset: 76px 0 0;
              z-index: 10000;
              display: grid;
              place-items: center;
              padding: 1rem;
              background: rgba(15, 23, 42, 0.58);
            }

            .wa-capture-dialog {
              position: relative;
              width: min(100%, 35rem);
              max-height: calc(100dvh - 76px - 2rem);
              overflow-y: auto;
              padding: 2rem;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              background: #fff;
              color: #111827;
              box-shadow: 0 12px 40px rgba(0, 0, 0, 0.24);
            }

            .wa-capture-close {
              position: absolute;
              top: 0.9rem;
              right: 1rem;
              padding: 0.3rem 0;
              border: 0;
              background: transparent;
              color: #4b5563;
              font: inherit;
              cursor: pointer;
            }

            .wa-capture-title {
              margin: 0 4rem 0.5rem 0;
              color: #111827;
              font-size: 1.4rem;
              font-weight: 600;
              line-height: 1.3;
            }

            .wa-capture-description {
              margin: 0 0 1.4rem;
              color: #5b6472;
              font-size: 0.95rem;
              line-height: 1.5;
            }

            .wa-capture-form {
              display: grid;
              gap: 1rem;
              margin: 0;
            }

            .wa-capture-field {
              display: grid;
              min-width: 0;
              gap: 0.4rem;
            }

            .wa-capture-field label {
              color: #172033;
              font-size: 0.82rem;
              font-weight: 500;
              line-height: 1.35;
            }

            .wa-capture-field input,
            .wa-capture-field textarea {
              display: block;
              width: 100%;
              min-width: 0;
              box-sizing: border-box;
              margin: 0;
              padding: 0.7rem 0.8rem;
              border: 1px solid #d7dee8;
              border-radius: 6px;
              outline: none;
              background: #fff;
              color: #172033;
              font: inherit;
              font-size: 0.9rem;
              line-height: 1.4;
              box-shadow: none;
            }

            .wa-capture-field input {
              min-height: 2.65rem;
            }

            .wa-capture-field textarea {
              min-height: 5.5rem;
              resize: vertical;
            }

            .wa-capture-field input::placeholder {
              color: #8993a3;
              opacity: 1;
            }

            .wa-capture-field input:focus,
            .wa-capture-field textarea:focus {
              border-color: #0f766e;
              box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.12);
            }

            .wa-capture-row {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 0.9rem;
            }

            .wa-capture-consent {
              display: flex;
              align-items: flex-start;
              gap: 0.6rem;
              color: #374151;
              font-size: 0.82rem;
              line-height: 1.45;
            }

            .wa-capture-consent input {
              flex: 0 0 auto;
              width: 1rem;
              height: 1rem;
              margin: 0.12rem 0 0;
              accent-color: #0f766e;
            }

            .wa-capture-error {
              margin: 0;
              color: #b42318;
              font-size: 0.85rem;
              line-height: 1.4;
            }

            .wa-capture-submit {
              display: inline-flex;
              width: 100%;
              min-height: 2.8rem;
              align-items: center;
              justify-content: center;
              box-sizing: border-box;
              padding: 0.7rem 1rem;
              border: 1px solid #0f766e;
              border-radius: 6px;
              background: #0f766e;
              color: #fff;
              font: inherit;
              font-size: 0.92rem;
              font-weight: 600;
              text-align: center;
              text-decoration: none;
              cursor: pointer;
            }

            .wa-capture-submit:hover:not(:disabled) {
              border-color: #115e59;
              background: #115e59;
            }

            .wa-capture-submit:disabled {
              cursor: wait;
              opacity: 0.7;
            }

            .wa-capture-success {
              padding-top: 0.5rem;
            }

            .wa-capture-success-heading {
              display: flex;
              align-items: center;
              gap: 0.9rem;
              margin-bottom: 1.1rem;
            }

            .wa-capture-success-icon {
              display: grid;
              width: 3.5rem;
              height: 3.5rem;
              flex: 0 0 auto;
              place-items: center;
              border-radius: 50%;
              background: #dcf5eb;
              color: #0f766e;
            }

            .wa-capture-success-icon svg {
              width: 1.8rem;
              height: 1.8rem;
              fill: none;
              stroke: currentColor;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: 1.8;
            }

            .wa-capture-success-title {
              margin: 0 0 0.25rem;
              color: #123f3b;
              font-size: 1.35rem;
              font-weight: 700;
              line-height: 1.25;
            }

            .wa-capture-success-subtitle {
              margin: 0;
              color: #5b6d6a;
              font-size: 0.95rem;
              line-height: 1.45;
            }

            .wa-capture-success-message {
              margin: 0 0 1rem;
              color: #3f4b5f;
              font-size: 1.05rem;
              line-height: 1.55;
            }

            .wa-capture-success .wa-capture-submit {
              min-height: 3.5rem;
              border-radius: 12px;
              font-size: 1rem;
            }

            .wa-capture-reference {
              margin: 0 0 1rem;
              color: #5b6472;
              font-size: 0.88rem;
            }

            @media (max-width: 768px) {
              .wa-capture-overlay {
                inset-block-start: 68px;
              }

              .wa-capture-dialog {
                max-height: calc(100dvh - 68px - 2rem);
              }
            }

            @media (max-width: 520px) {
              .wa-capture-dialog {
                padding: 1.5rem 1.1rem;
              }

              .wa-capture-title {
                font-size: 1.2rem;
              }

              .wa-capture-row {
                grid-template-columns: 1fr;
              }
            }
          `}</style>
        </div>,
        document.body,
      )}
    </>
  );
}
