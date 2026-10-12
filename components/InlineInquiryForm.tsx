'use client';

/**
 * InlineInquiryForm — Lightweight inquiry form for inline CTA expansion.
 *
 * Client component. Renders inside PrimaryCTA when user clicks the action button.
 * Includes honeypot field and timestamp delta for anti-spam.
 *
 * Props are passed from PrimaryCTA for tracking context.
 */

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { track } from '@/utils/telemetry';
import { buildAttributionQuery, captureAttribution } from '@/utils/attribution';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';
import { getRetreatProgramEvent } from '@/config/retreatProgramEvents';
import { buildAttributionSnapshot, resolveConversionContext } from '@/lib/conversion-foundation';
import { acquirePendingSubmissionToken } from '@/lib/submission-token';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const MONTHS = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const GROUP_SIZES = ['', '1', '2', '3–4', '5–8', '9+'];

const BUDGETS = ['', '₹15–30k', '₹30–60k', '₹60k+', 'Not sure yet'];
const YOGA_DURATIONS = ['', 'Weekend', '5 days', '7 days', '10 days', 'Flexible'];
const YOGA_EXPERIENCE = ['', 'Beginner', 'Some experience', 'Experienced', 'Teacher'];
const BOOKING_READINESS = ['', 'Exploring', 'Planning', 'Ready to book'];

interface InlineInquiryFormProps {
  vertical: 'trek' | 'retreat';
  category: string;
  sourcePath: string;
  location?: string;
  yogaInterest?: string;
  duration?: string;
  yogaExperience?: string;
  preferredMonth?: string;
  productId?: string;
  departureId?: string;
  planningHorizon?: string;
  productOption?: string;
  productName?: string;
  experience?: string;
  departureDate?: string;
  pageType?: string;
  ctaId?: string;
  ctaPosition?: string;
  ctaLabel?: string;
  ctaVariant?: string;
}

export type ProgressiveCaptureStep = 'interest' | 'destination' | 'timing' | 'group' | 'contact';

export function getProgressiveCaptureSteps(context: {
  interestKnown: boolean;
  destinationKnown: boolean;
  timingKnown: boolean;
}): ProgressiveCaptureStep[] {
  return [
    ...(!context.interestKnown ? ['interest' as const] : []),
    ...(!context.destinationKnown ? ['destination' as const] : []),
    ...(!context.timingKnown ? ['timing' as const] : []),
    'group',
    'contact',
  ];
}

export function validateProgressiveCaptureStep(
  step: ProgressiveCaptureStep,
  values: { interest?: string; name?: string; phone?: string; email?: string },
): string | undefined {
  if (step === 'interest' && !values.interest?.trim()) return 'Please choose what you are interested in.';
  if (step !== 'contact') return undefined;
  if ((values.name ?? '').trim().length < 2) return 'Please enter your name.';
  const phoneDigits = (values.phone ?? '').replace(/\D/g, '');
  if (!/^[+\d\s().-]+$/.test((values.phone ?? '').trim()) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    return 'Please enter a valid WhatsApp number.';
  }
  if (values.email?.trim() && !/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    return 'Please enter a valid email address or leave it blank.';
  }
  return undefined;
}

function ProgressiveInlineCapture({
  vertical,
  category,
  sourcePath,
  location: prefillLocation,
  duration: prefillDuration,
  yogaExperience,
  productId,
  productName,
  experience,
  departureId,
  departureDate,
  pageType,
  planningHorizon,
  ctaId = 'generic_primary_inquiry',
  ctaPosition = 'primary',
  ctaLabel = 'Continue enquiry',
  ctaVariant,
}: InlineInquiryFormProps) {
  const searchParams = useSearchParams();
  const loadedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const captureStarted = useRef(false);
  const submissionStarted = useRef(false);
  const savedRef = useRef(false);
  const [interest, setInterest] = useState<'trek' | 'retreat' | ''>(vertical || '');
  const [destination, setDestination] = useState(prefillLocation || '');
  const [timing, setTiming] = useState(planningHorizon || '');
  const [groupSize, setGroupSize] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [website, setWebsite] = useState('');
  const [stepIndex, setStepIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [leadReference, setLeadReference] = useState('');
  const [error, setError] = useState('');

  const baseContext = resolveConversionContext({
    pagePath: sourcePath,
    pageType,
    vertical,
    category,
    ctaId,
    ctaPosition,
    ctaLabel,
    ctaVariant,
    productId,
    productName,
    experience: experience || yogaExperience,
    locationName: prefillLocation,
    duration: prefillDuration,
    departureId,
    departureDate,
    attribution: buildAttributionSnapshot(searchParams),
  });
  const productPageTypes = new Set(['trek_product', 'trek_departure', 'retreat_product', 'yoga_product', 'yoga_departure', 'art_product', 'journey']);
  const genericCategories = new Set(['', 'general', 'unknown', 'other', 'all']);
  const isArtContext = category.toLowerCase().includes('art') ||
    baseContext.page.type === 'art_hub' ||
    baseContext.page.type === 'art_product' ||
    baseContext.page.type === 'art_location';
  const knownDeparture = Boolean(departureId || departureDate) ||
    baseContext.page.type === 'trek_departure' || baseContext.page.type === 'yoga_departure';
  const steps = getProgressiveCaptureSteps({
    interestKnown: Boolean(productId) || !genericCategories.has(category.trim().toLowerCase()),
    destinationKnown: Boolean(prefillLocation) ||
      (Boolean(productId) && !isArtContext) ||
      (productPageTypes.has(baseContext.page.type) && !(isArtContext && baseContext.page.type === 'art_product')),
    timingKnown: knownDeparture,
  });
  const activeStep = steps[Math.min(stepIndex, steps.length - 1)];
  const stepNumber = Math.min(stepIndex + 1, steps.length);

  const context = resolveConversionContext({
    pagePath: sourcePath,
    pageType,
    vertical,
    category,
    ctaId,
    ctaPosition,
    ctaLabel,
    ctaVariant,
    productId,
    productName,
    experience: experience || yogaExperience,
    locationName: destination || prefillLocation,
    duration: prefillDuration,
    departureId,
    departureDate,
    conversionSessionId: baseContext.attribution.conversionSessionId,
    attribution: {
      ...baseContext.attribution,
      ...buildAttributionSnapshot(searchParams),
    },
  });

  function eventMeta(extra: Record<string, unknown> = {}) {
    return {
      conversion_session_id: context.attribution.conversionSessionId,
      page_type: context.page.type,
      cta_id: context.cta.id,
      cta_position: context.cta.position,
      cta_label: context.cta.label,
      cta_variant: context.cta.variant,
      vertical: context.page.vertical,
      category: context.page.category,
      product_id: context.product.id,
      product: context.product.name,
      experience: context.experience,
      destination: context.location.name,
      duration: context.duration,
      departure_id: context.departure.id,
      departure_date: context.departure.date,
      ...extra,
    };
  }

  useEffect(() => {
    captureStarted.current = true;
    track({ event: 'lead_capture_open', from: sourcePath, meta: eventMeta() });
    return () => {
      if (captureStarted.current && !savedRef.current) {
        track({ event: 'lead_capture_abandon', from: sourcePath, meta: eventMeta({ step: activeStep }) });
      }
    };
  }, []);

  useEffect(() => {
    if (activeStep) {
      headingRef.current?.focus();
      track({ event: 'lead_capture_step_view', from: sourcePath, meta: eventMeta({ step: activeStep, step_number: stepNumber }) });
    }
  }, [activeStep, stepNumber]);

  function continueStep() {
    if (!activeStep || submitting) return;
    setError('');
    const validationError = validateProgressiveCaptureStep(activeStep, { interest, name, phone, email });
    if (validationError) {
      setError(validationError);
      return;
    }
    track({ event: 'lead_capture_step_complete', from: sourcePath, meta: eventMeta({ step: activeStep, step_number: stepNumber }) });
    if (stepIndex < steps.length - 1) {
      setStepIndex((current) => current + 1);
    }
  }

  async function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || submissionStarted.current) return;
    if (activeStep !== 'contact') {
      continueStep();
      return;
    }
    const validationError = validateProgressiveCaptureStep('contact', { name, phone, email });
    if (validationError) {
      setError(validationError);
      return;
    }

    submissionStarted.current = true;
    setSubmitting(true);
    setError('');
    try {
      captureAttribution(searchParams);
      const submissionAttribution = buildAttributionSnapshot(searchParams);
      const submissionAttributionQuery = buildAttributionQuery(searchParams);
      const sourceWithAttribution = submissionAttributionQuery
        ? `${sourcePath}?${submissionAttributionQuery}`
        : sourcePath;
      const inquiry = {
        name: name.trim(),
        ...(phone.trim() ? { phone: phone.trim() } : {}),
        ...(email.trim() ? { email: email.trim() } : {}),
        ...(age ? { age: Number(age) } : {}),
        interest: interest || undefined,
        interestedIn: interest || undefined,
        ...(destination ? { destination, location: destination } : {}),
        ...(timing ? { preferredTiming: timing, planningHorizon: timing } : {}),
        ...(groupSize ? { groupSize } : {}),
        ...(productId ? { productId } : {}),
        ...(productName ? { product: productName } : {}),
        ...(departureId ? { departureId } : {}),
        ...(departureDate ? { departureDate, preferredDate: departureDate } : {}),
        ...(prefillDuration ? { duration: prefillDuration } : {}),
        ...((experience || yogaExperience) ? { experience: experience || yogaExperience } : {}),
        source: sourceWithAttribution,
        pageTitle: context.page.title,
        pageType: context.page.type,
        ctaId: context.cta.id,
        ctaPosition: context.cta.position,
        ctaLabel: context.cta.label,
        ctaVariant: context.cta.variant,
        vertical,
        category,
        conversionSessionId: context.attribution.conversionSessionId,
        firstLandingPage: submissionAttribution.firstLandingPage,
        lastLandingPage: submissionAttribution.lastLandingPage,
        referrer: submissionAttribution.referrer,
        firstUtm: submissionAttribution.firstUtm,
        lastUtm: submissionAttribution.lastUtm,
        firstTouchAt: submissionAttribution.firstTouchAt,
        lastTouchAt: submissionAttribution.lastTouchAt,
        website,
        _t: loadedAt.current,
      };
      const pendingToken = await acquirePendingSubmissionToken(
        `inline-progressive:${sourcePath}:${context.cta.id}`,
        inquiry,
      );
      const result = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...inquiry, submissionToken: pendingToken.token }),
      });
      const data = await result.json();
      if (!result.ok || !data.success) {
        submissionStarted.current = false;
        setError(data.error || 'We could not save your enquiry. Please try again.');
        return;
      }

      pendingToken.clear();
      savedRef.current = true;
      setLeadReference(typeof data.leadReference === 'string' ? data.leadReference : '');
    } catch {
      submissionStarted.current = false;
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (leadReference !== null && savedRef.current) {
    const handoffContext = resolveConversionContext({
      pagePath: sourcePath,
      pageType,
      vertical,
      category,
      ctaId: 'inline_inquiry_whatsapp',
      ctaPosition: 'form_success',
      ctaLabel: 'Continue on WhatsApp',
      productId,
      productName,
      experience: experience || yogaExperience,
      locationName: destination || prefillLocation,
      duration: prefillDuration,
      departureId,
      departureDate,
      conversionSessionId: context.attribution.conversionSessionId,
      attribution: context.attribution,
    });
    const whatsappHref = buildWhatsAppUrl({
      context: handoffContext,
      leadReference,
      groupSize: groupSize || undefined,
      timing: timing || undefined,
      message: 'Hi, I have saved an enquiry and would like to continue the conversation.',
    });
    return (
      <div role="status" aria-live="polite" style={{ textAlign: 'center', padding: '1.5rem 0' }}>
        <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Your details are saved.</p>
        {leadReference && <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '0 0 0.75rem' }}>Reference: {leadReference}</p>}
        <TrackedWhatsAppLink
          href={whatsappHref}
          sourcePath={sourcePath}
          location={destination || prefillLocation}
          product={productName}
          productId={productId}
          departureId={departureId}
          departureDate={departureDate}
          duration={prefillDuration}
          ctaId="inline_inquiry_whatsapp"
          ctaLabel="Continue on WhatsApp"
          ctaPosition="form_success"
          conversionSessionId={context.attribution.conversionSessionId}
          leadReference={leadReference}
          vertical={vertical}
          category={category}
          style={{ display: 'inline-flex', padding: '0.8rem 1rem', borderRadius: 6, background: 'var(--color-primary)', color: '#fff', fontWeight: 700, textDecoration: 'none' }}
        >
          Continue on WhatsApp
        </TrackedWhatsAppLink>
      </div>
    );
  }

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 0.7rem',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.95rem',
    lineHeight: 1.5,
    backgroundColor: 'white',
    color: 'var(--color-text)',
    boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 600,
    marginBottom: '0.25rem',
    color: 'var(--color-text)',
  };
  const stepLabels: Record<ProgressiveCaptureStep, string> = {
    interest: 'What are you interested in?',
    destination: 'Where would you like to go?',
    timing: 'When are you thinking of travelling?',
    group: 'How many people are travelling?',
    contact: 'How can we reach you?',
  };

  return (
    <form ref={formRef} onSubmit={submitInquiry} style={{ textAlign: 'left', marginTop: '1rem' }}>
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', height: 0, overflow: 'hidden' }}>
        <label htmlFor="inline-website">Website</label>
        <input id="inline-website" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" />
      </div>
      <p aria-label={`Step ${stepNumber} of ${steps.length}`} style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
        Step {stepNumber} of {steps.length}
      </p>
      <h3 ref={headingRef} tabIndex={-1} style={{ fontSize: '1.05rem', margin: '0 0 1rem', outlineOffset: '3px' }}>{stepLabels[activeStep]}</h3>

      {activeStep === 'interest' && (
        <div>
          <label htmlFor="inline-interest" style={labelStyle}>Interested in</label>
          <select id="inline-interest" value={interest} onChange={(event) => setInterest(event.target.value as 'trek' | 'retreat' | '')} style={fieldStyle}>
            <option value="">Choose an option</option>
            <option value="trek">A trek</option>
            <option value="retreat">A retreat</option>
          </select>
        </div>
      )}
      {activeStep === 'destination' && (
        <div>
          <label htmlFor="inline-destination" style={labelStyle}>Destination (optional)</label>
          <select id="inline-destination" value={destination} onChange={(event) => setDestination(event.target.value)} style={fieldStyle}>
            <option value="">No preference yet</option>
            <option value="chakrata">Chakrata</option>
            <option value="sankri">Sankri</option>
            <option value="rishikesh">Rishikesh</option>
            <option value="munsiyari">Munsiyari</option>
            <option value="mussoorie">Mussoorie</option>
          </select>
        </div>
      )}
      {activeStep === 'timing' && (
        <div>
          <label htmlFor="inline-timing" style={labelStyle}>Preferred timing (optional)</label>
          <select id="inline-timing" value={timing} onChange={(event) => setTiming(event.target.value)} style={fieldStyle}>
            <option value="">Not sure yet</option>
            <option value="This month">This month</option>
            <option value="Next month">Next month</option>
            <option value="2–3 months">2–3 months</option>
            <option value="4–6 months">4–6 months</option>
            <option value="Later">Later</option>
          </select>
        </div>
      )}
      {activeStep === 'group' && (
        <div>
          <label htmlFor="inline-group" style={labelStyle}>Group size (optional)</label>
          <select id="inline-group" value={groupSize} onChange={(event) => setGroupSize(event.target.value)} style={fieldStyle}>
            <option value="">Not sure yet</option>
            <option value="1">Just me</option>
            <option value="2">2 people</option>
            <option value="3–4">3–4 people</option>
            <option value="5–8">5–8 people</option>
            <option value="9–10">9–10 people</option>
            <option value="10+">10+ people</option>
          </select>
        </div>
      )}
      {activeStep === 'contact' && (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <div>
            <label htmlFor="inline-name" style={labelStyle}>Name *</label>
            <input id="inline-name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required minLength={2} style={fieldStyle} />
          </div>
          <div>
            <label htmlFor="inline-phone" style={labelStyle}>WhatsApp / phone *</label>
            <input id="inline-phone" type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required style={fieldStyle} />
          </div>
          <div>
            <label htmlFor="inline-email" style={labelStyle}>Email (optional)</label>
            <input id="inline-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} style={fieldStyle} />
          </div>
          <div>
            <label htmlFor="inline-age" style={labelStyle}>Age (optional)</label>
            <input id="inline-age" type="number" min="0" max="120" value={age} onChange={(event) => setAge(event.target.value)} style={fieldStyle} />
          </div>
        </div>
      )}

      {error && <p id="inline-capture-error" role="alert" style={{ color: '#b91c1c', fontSize: '0.85rem', margin: '0.8rem 0 0' }}>{error}</p>}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
        {stepIndex > 0 && (
          <button type="button" onClick={() => { setError(''); setStepIndex((current) => Math.max(0, current - 1)); }} style={{ ...fieldStyle, width: 'auto', cursor: 'pointer' }}>
            Back
          </button>
        )}
        {activeStep === 'contact' ? (
          <button type="submit" disabled={submitting} aria-describedby={error ? 'inline-capture-error' : undefined} style={{ ...fieldStyle, flex: 1, cursor: submitting ? 'wait' : 'pointer', background: submitting ? '#9ca3af' : 'var(--color-primary)', color: '#fff', fontWeight: 700 }}>
            {submitting ? 'Saving…' : 'Save my details'}
          </button>
        ) : (
          <button type="submit" aria-describedby={error ? 'inline-capture-error' : undefined} style={{ ...fieldStyle, flex: 1, cursor: 'pointer', background: 'var(--color-primary)', color: '#fff', fontWeight: 700 }}>
            Continue
          </button>
        )}
      </div>
    </form>
  );
}

function LegacyInlineInquiryForm(props: InlineInquiryFormProps) {
  const {
    vertical,
    category,
    sourcePath,
    location: prefillLocation,
    yogaInterest: prefillYogaInterest,
    duration: prefillDuration,
    yogaExperience: prefillYogaExperience,
  } = props;
  const searchParams = useSearchParams();
  const isYogaInquiry = vertical === 'retreat' && (
    category.toLowerCase().includes('yoga') || sourcePath.toLowerCase().includes('yoga')
  );
  // Anti-spam: timestamp when form rendered
  const loadedAt = useRef(Date.now());

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interestedIn, setInterestedIn] = useState<'trek' | 'retreat' | ''>(vertical || '');
  const [yogaInterest, setYogaInterest] = useState(prefillYogaInterest || 'Yoga Retreat');
  const [location, setLocation] = useState(prefillLocation || '');
  const [month, setMonth] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState(prefillDuration || '');
  const [yogaExperience, setYogaExperience] = useState(prefillYogaExperience || '');
  const [bookingReadiness, setBookingReadiness] = useState('');
  const yogaDurationOptions = yogaInterest === 'Yoga TTC'
    ? ['', 'Flexible']
    : YOGA_DURATIONS;

  // Honeypot — invisible to humans, bots fill it
  const [website, setWebsite] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [salesRoute, setSalesRoute] = useState('');
  const [error, setError] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Focus the name field when form appears
    const nameInput = formRef.current?.querySelector<HTMLInputElement>('#inline-name');
    nameInput?.focus();
  }, []);

  if (!isYogaInquiry) return <ProgressiveInlineCapture {...props} />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const attribution = buildAttributionQuery(searchParams);
      const sourceWithAttribution = attribution
        ? `${sourcePath}?${attribution}`
        : sourcePath;
      const inquiry = {
        name,
        phone,
        email,
        interestedIn,
        yogaInterest: isYogaInquiry ? yogaInterest : '',
        location,
        month,
        preferredDate: isYogaInquiry ? preferredDate : '',
        groupSize,
        budget,
        duration: isYogaInquiry ? duration : '',
        yogaExperience: isYogaInquiry ? yogaExperience : '',
        bookingReadiness: isYogaInquiry ? bookingReadiness : '',
        source: sourceWithAttribution,
        vertical,
        category,
        website,
        _t: loadedAt.current,
      };
      const pendingToken = await acquirePendingSubmissionToken(
        `inline-yoga:${sourcePath}:${category}`,
        inquiry,
      );

      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...inquiry, submissionToken: pendingToken.token }),
      });

      const data = await res.json();
      if (!res.ok || data.success !== true) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      pendingToken.clear();
      setSalesRoute(data.yogaSalesRoute || '');
      if (isYogaInquiry) {
        track({
          event: 'form_submission',
          from: sourcePath,
          meta: {
            category,
            yoga_interest: yogaInterest,
            location,
            duration,
            yoga_experience: yogaExperience,
            booking_readiness: bookingReadiness,
            yoga_classification: data.yogaClassification || '',
            sales_route: data.yogaSalesRoute || '',
            source_url: sourceWithAttribution,
          },
        });
      }
      setSubmitted(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
        <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
          Inquiry received.
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: 1.6 }}>
          A mountain planner will reach out within 24 hours.
        </p>
        {salesRoute === 'HELP_ME_CHOOSE' && (
          <p style={{ margin: '0.75rem 0 0' }}>
            <Link href="/find-your-retreat" style={{ color: 'var(--color-primary)' }}>Help me choose a retreat</Link>
          </p>
        )}
        {salesRoute === 'RISHIKESH_ALTERNATIVE' && (
          <p style={{ margin: '0.75rem 0 0' }}>
            <Link href="/retreats/yoga-retreat-rishikesh" style={{ color: 'var(--color-primary)' }}>Explore the Rishikesh option</Link>
          </p>
        )}
        {salesRoute === 'TTC_SALES' && (
          <p style={{ margin: '0.75rem 0 0', color: 'var(--color-text)' }}>Your request is marked for Yoga Teacher Training information.</p>
        )}
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 0.7rem',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.9rem',
    lineHeight: 1.5,
    backgroundColor: 'white',
    color: 'var(--color-text)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 600,
    marginBottom: '0.2rem',
    color: 'var(--color-text)',
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ textAlign: 'left', marginTop: '1rem' }}>
      {/* ── HONEYPOT — invisible to humans ── */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', height: 0, overflow: 'hidden' }}>
        <label htmlFor="inline-website">Website</label>
        <input
          id="inline-website"
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isYogaInquiry ? 'repeat(3, minmax(0, 1fr))' : '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div>
          <label htmlFor="inline-name" style={labelStyle}>Name *</label>
          <input
            id="inline-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            placeholder="Your name"
            style={inputStyle}
          />
        </div>
        {isYogaInquiry && (
          <div>
            <label htmlFor="inline-phone" style={labelStyle}>WhatsApp / Phone *</label>
            <input id="inline-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Your WhatsApp number" style={inputStyle} />
          </div>
        )}
        <div>
          <label htmlFor="inline-email" style={labelStyle}>Email (optional)</label>
          <input
            id="inline-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            style={inputStyle}
          />
        </div>
      </div>

      {isYogaInquiry ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div>
              <label htmlFor="inline-yoga-interest" style={labelStyle}>Interest</label>
              <select id="inline-yoga-interest" value={yogaInterest} onChange={(e) => setYogaInterest(e.target.value)} style={inputStyle}>
                <option>Yoga Retreat</option>
                <option>Yoga TTC</option>
                <option>Not sure</option>
              </select>
            </div>
            <div>
              <label htmlFor="inline-yoga-location" style={labelStyle}>Preferred location</label>
              <select id="inline-yoga-location" value={location} onChange={(e) => setLocation(e.target.value)} style={inputStyle}>
                <option value="">No preference</option>
                <option>Rishikesh</option>
                <option>Sankri</option>
                <option>Chakrata</option>
                <option>Zanskar</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <label htmlFor="inline-yoga-duration" style={labelStyle}>Duration</label>
                  <select id="inline-yoga-duration" value={duration} onChange={(e) => setDuration(e.target.value)} style={inputStyle}>
                    {yogaDurationOptions.map((value) => <option key={value} value={value}>{value || 'Flexible'}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="inline-yoga-experience" style={labelStyle}>Yoga experience</label>
                  <select id="inline-yoga-experience" value={yogaExperience} onChange={(e) => setYogaExperience(e.target.value)} style={inputStyle}>
                    {YOGA_EXPERIENCE.map((value) => <option key={value} value={value}>{value || 'Choose level'}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 11rem), 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <label htmlFor="inline-yoga-month" style={labelStyle}>Preferred month</label>
                  <select id="inline-yoga-month" value={month} onChange={(e) => setMonth(e.target.value)} style={inputStyle}>
                    {MONTHS.map((value) => <option key={value} value={value}>{value || 'Flexible'}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="inline-yoga-date" style={labelStyle}>Preferred date (optional)</label>
                  <input id="inline-yoga-date" type="text" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} placeholder="e.g. 12 October" style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="inline-yoga-readiness" style={labelStyle}>Booking readiness</label>
                  <select id="inline-yoga-readiness" value={bookingReadiness} onChange={(e) => setBookingReadiness(e.target.value)} style={inputStyle}>
                    {BOOKING_READINESS.map((value) => <option key={value} value={value}>{value || 'Choose stage'}</option>)}
                  </select>
                </div>
            </div>
          </>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div>
              <label htmlFor="inline-yoga-group" style={labelStyle}>Group size</label>
              <select id="inline-yoga-group" value={groupSize} onChange={(e) => setGroupSize(e.target.value)} style={inputStyle}>
                {GROUP_SIZES.map((size) => (
                  <option key={size} value={size}>{size || 'Choose group size'}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="inline-yoga-budget" style={labelStyle}>Budget range</label>
              <select id="inline-yoga-budget" value={budget} onChange={(e) => setBudget(e.target.value)} style={inputStyle}>
                {BUDGETS.map((value) => (
                  <option key={value} value={value}>{value || 'Prefer not to say'}</option>
                ))}
              </select>
            </div>
          </div>
        </>
      ) : (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div>
          <label htmlFor="inline-interest" style={labelStyle}>Interested in</label>
          <select
            id="inline-interest"
            value={interestedIn}
            onChange={(e) => setInterestedIn(e.target.value as 'trek' | 'retreat' | '')}
            style={inputStyle}
          >
            <option value="">Select…</option>
            <option value="trek">Trek</option>
            <option value="retreat">Retreat</option>
          </select>
        </div>
        <div>
          <label htmlFor="inline-location" style={labelStyle}>Location</label>
          <select
            id="inline-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={inputStyle}
          >
            <option value="">Not sure yet</option>
            <option value="chakrata">Chakrata</option>
            <option value="sankri">Sankri</option>
            <option value="rishikesh">Rishikesh</option>
            <option value="munsiyari">Munsiyari</option>
            <option value="mussoorie">Mussoorie</option>
          </select>
        </div>
      </div>
      )}

      {!isYogaInquiry && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div>
          <label htmlFor="inline-month" style={labelStyle}>Preferred month</label>
          <select
            id="inline-month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={inputStyle}
          >
            {MONTHS.map((m) => (
              <option key={m} value={m}>{m || 'Flexible'}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="inline-group" style={labelStyle}>Group size</label>
          <select
            id="inline-group"
            value={groupSize}
            onChange={(e) => setGroupSize(e.target.value)}
            style={inputStyle}
          >
            {GROUP_SIZES.map((s) => (
              <option key={s} value={s}>{s || 'Just me'}</option>
            ))}
          </select>
        </div>
      </div>
      }

      {!isYogaInquiry && <div style={{ marginBottom: '0.75rem' }}>
        <label htmlFor="inline-budget" style={labelStyle}>Budget range (optional)</label>
        <select
          id="inline-budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          style={inputStyle}
        >
          {BUDGETS.map((b) => (
            <option key={b} value={b}>{b || 'Prefer not to say'}</option>
          ))}
        </select>
      </div>}

      {error && (
        <p style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        style={{
          width: '100%',
          padding: '0.65rem 1.5rem',
          backgroundColor: submitting ? '#9ca3af' : 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: submitting ? 'not-allowed' : 'pointer',
          lineHeight: 1.4,
        }}
      >
        {submitting ? 'Sending…' : 'Send Inquiry'}
      </button>
    </form>
  );
}

const YOGA_PRODUCT_OPTIONS = [
  { value: 'weekend', label: 'Weekend Yoga Retreat', productId: 'yoga-rishikesh-weekend', duration: 'Weekend' },
  { value: '5-day', label: '5-Day Yoga Retreat', productId: 'yoga-rishikesh-5-day', duration: '5 days' },
  { value: '7-day', label: '7-Day Yoga Retreat', productId: 'yoga-rishikesh-7-day', duration: '7 days' },
  { value: '10-day', label: '10-Day Yoga Retreat', productId: 'yoga-rishikesh-10-day', duration: '10 days' },
  { value: 'other-location', label: 'Other location', productId: '', duration: '' },
  { value: 'ttc', label: 'Yoga Teacher Training', productId: 'yoga-ttc', duration: '28 days-TTC' },
  { value: 'not-sure', label: 'Not sure', productId: '', duration: '' },
] as const;

function YogaProgressiveInquiryForm({
  category,
  sourcePath,
  location: prefillLocation,
  yogaInterest: prefillYogaInterest,
  duration: prefillDuration,
  yogaExperience: prefillYogaExperience,
  preferredMonth: prefillPreferredMonth,
  productId: prefillProductId,
  departureId: prefillDepartureId,
  planningHorizon: prefillPlanningHorizon,
  productOption: prefillProductOption,
  ctaId: prefillCtaId,
  ctaPosition: prefillCtaPosition,
  ctaLabel: prefillCtaLabel,
}: InlineInquiryFormProps) {
  const searchParams = useSearchParams();
  const loadedAt = useRef(Date.now());
  const queryProductId = searchParams.get('productId') || prefillProductId || '';
  const queryDepartureId = searchParams.get('departureId') || prefillDepartureId || '';
  const selectedDeparture = queryDepartureId ? getRetreatProgramEvent(queryDepartureId) : undefined;
  const resolvedProductId = queryProductId || selectedDeparture?.productId || '';
  const initialProduct = (resolvedProductId ? YOGA_PRODUCT_OPTIONS.find((option) => option.productId === resolvedProductId) : undefined)
    ?? YOGA_PRODUCT_OPTIONS.find((option) => option.value === prefillProductOption)
    ?? (prefillYogaInterest === 'Yoga TTC' ? YOGA_PRODUCT_OPTIONS.find((option) => option.value === 'ttc') : undefined);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const formStarted = useRef(false);
  const submissionStarted = useRef(false);
  const completionTracked = useRef(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState(initialProduct?.value || '');
  const normalizedPrefillLocation = ({ rishikesh: 'Rishikesh', sankri: 'Sankri', chakrata: 'Chakrata', zanskar: 'Zanskar', other: 'Other' } as Record<string, string>)[(prefillLocation || '').toLowerCase()] || prefillLocation || selectedDeparture?.locationName || '';
  const [location, setLocation] = useState(normalizedPrefillLocation);
  const [preferredDate, setPreferredDate] = useState(selectedDeparture?.startDate || '');
  const [preferredMonth, setPreferredMonth] = useState(prefillPreferredMonth || selectedDeparture?.month || '');
  const [yogaExperience, setYogaExperience] = useState(prefillYogaExperience || '');
  const [groupSize, setGroupSize] = useState('');
  const [budget, setBudget] = useState('');
  const [bookingReadiness, setBookingReadiness] = useState('');
  const [planningHorizon, setPlanningHorizon] = useState(prefillPlanningHorizon || '');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadReference, setLeadReference] = useState('');
  const [error, setError] = useState('');

  const selectedOption = YOGA_PRODUCT_OPTIONS.find((option) => option.value === product);
  const yogaInterest = product === 'ttc' ? 'Yoga TTC' : product === 'not-sure' ? 'Not sure' : 'Yoga Retreat';
  const duration = selectedOption?.duration || prefillDuration || '';
  const ctaId = prefillCtaId || 'yoga_progressive_inquiry';
  const ctaPosition = prefillCtaPosition || 'primary';
  const ctaLabel = prefillCtaLabel || 'Send enquiry';
  const selectedLocationKnown = Boolean(normalizedPrefillLocation || selectedDeparture?.locationName);
  const selectedExperienceKnown = Boolean(prefillYogaExperience);
  const selectedPlanningHorizonKnown = Boolean(prefillPlanningHorizon);

  function goNext() {
    setError('');
    if (step === 1) {
      if (name.trim().length < 2) return setError('Please enter your name.');
      const phoneDigits = phone.replace(/\D/g, '');
      if (!/^[+\d\s().-]+$/.test(phone.trim()) || phoneDigits.length < 7 || phoneDigits.length > 15) {
        return setError('Please enter a valid WhatsApp number.');
      }
      if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
        return setError('Please enter a valid email address or leave it blank.');
      }
    }
    if (step === 2 && !product) return setError('Please choose the option you are enquiring about.');
    if (step === 1 && !formStarted.current) {
      formStarted.current = true;
      const sourceUtm = buildAttributionQuery(searchParams);
      track({
        event: 'form_start',
        from: sourcePath,
        meta: {
          page: sourcePath,
          category,
          product: selectedOption?.label || '',
          product_id: selectedOption?.productId || '',
          departure_id: queryDepartureId,
          location,
          duration,
          source: sourcePath,
          source_utm: sourceUtm,
        },
      });
    }
    if (step === 1) {
      setStep(initialProduct ? 3 : 2);
    } else if (step === 2) {
      setStep(3);
    }
  }

  async function submitInquiry(event: React.FormEvent) {
    event.preventDefault();
    if (submissionStarted.current || submitted) return;
    submissionStarted.current = true;
    setError('');
    setSubmitting(true);
    try {
      captureAttribution(searchParams);
      const attribution = buildAttributionQuery(searchParams);
      const source = attribution ? `${sourcePath}?${attribution}` : sourcePath;
      const attributionSnapshot = buildAttributionSnapshot(searchParams);
      const conversionContext = resolveConversionContext({
        pagePath: sourcePath,
        vertical: 'yoga',
        category,
        ctaId,
        ctaLabel,
        ctaPosition,
        productId: selectedOption?.productId || undefined,
        productName: selectedOption?.label,
        locationName: location || undefined,
        duration: duration || undefined,
        departureId: queryDepartureId || undefined,
        departureDate: selectedDeparture?.startDate || undefined,
        attribution: attributionSnapshot,
      });
      const funnelContext = {
        page: sourcePath,
        page_type: conversionContext.page.type,
        category,
        cta_id: conversionContext.cta.id,
        cta_position: conversionContext.cta.position,
        cta_label: conversionContext.cta.label,
        conversion_session_id: conversionContext.attribution.conversionSessionId,
        product: selectedOption?.label || 'Not sure',
        product_id: selectedOption?.productId || '',
        departure_id: queryDepartureId,
        location,
        duration,
        preferred_date: preferredDate || selectedDeparture?.startDate || '',
        preferred_month: preferredMonth,
        yoga_experience: yogaExperience,
        group_size: groupSize,
        budget,
        booking_readiness: bookingReadiness,
        planning_horizon: planningHorizon,
        source,
        source_utm: attribution,
      };
      const inquiry = {
        name,
        phone,
        email,
        product: selectedOption?.label || 'Not sure',
        productId: selectedOption?.productId || '',
        departureId: queryDepartureId,
        interestedIn: 'retreat',
        yogaInterest,
        location,
        duration,
        preferredDate,
        month: preferredMonth,
        yogaExperience,
        groupSize,
        budget,
        bookingReadiness,
        planningHorizon,
        source,
        vertical: 'yoga',
        category,
        conversionSessionId: conversionContext.attribution.conversionSessionId,
        firstLandingPage: conversionContext.attribution.firstLandingPage,
        lastLandingPage: conversionContext.attribution.lastLandingPage,
        referrer: conversionContext.attribution.referrer,
        firstUtm: conversionContext.attribution.firstUtm,
        lastUtm: conversionContext.attribution.lastUtm,
        firstTouchAt: conversionContext.attribution.firstTouchAt,
        lastTouchAt: conversionContext.attribution.lastTouchAt,
        ctaId: conversionContext.cta.id,
        ctaLabel: conversionContext.cta.label,
        ctaPosition: conversionContext.cta.position,
        ctaVariant: conversionContext.cta.variant,
        _t: loadedAt.current,
        website: '',
      };
      const pendingToken = await acquirePendingSubmissionToken(
        `yoga-progressive:${sourcePath}:${category}:${ctaId}`,
        inquiry,
      );
      const response = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...inquiry, submissionToken: pendingToken.token }),
      });
      const data = await response.json();
      if (!response.ok || data.success !== true) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      pendingToken.clear();
      setLeadReference(typeof data.leadReference === 'string' ? data.leadReference : '');
      if (!completionTracked.current) {
        track({ event: 'yoga_form_completion', from: sourcePath, meta: funnelContext });
        completionTracked.current = true;
      }
      track({
        event: 'form_submission',
        from: sourcePath,
        meta: {
          ...funnelContext,
          yoga_classification: data.yogaClassification || '',
          yoga_sales_route: data.yogaSalesRoute || '',
          lead_score: data.score,
          lead_tier: data.tier,
          recommended_product: data.recommendedProduct || '',
          recommended_alternative: data.recommendedAlternative || '',
        },
      });
      setSubmitted(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      submissionStarted.current = false;
      setSubmitting(false);
    }
  }

  if (submitted) {
    const whatsappContext = selectedOption?.label || 'Yoga retreat option';
    const whatsappText = selectedOption?.value === 'ttc'
      ? 'Hi, I\'m interested in the 28-Day Yoga Teacher Training in Rishikesh. Please share the upcoming batch details.'
      : `Hi, I have submitted an enquiry about ${whatsappContext}${location ? ` in ${location}` : ''}${preferredDate || preferredMonth ? ` for ${preferredDate || preferredMonth}` : ''}. Please share the next steps.`;
    const whatsappHref = buildWhatsAppUrl({
      context: resolveConversionContext({
        pagePath: sourcePath,
        vertical: 'yoga',
        category,
        ctaId: 'yoga_progressive_form_success_whatsapp',
        ctaPosition: 'form_success',
        ctaLabel: 'Continue on WhatsApp',
        productId: selectedOption?.productId || undefined,
        productName: selectedOption?.label,
        locationName: location || undefined,
        duration: duration || undefined,
        departureId: queryDepartureId || undefined,
        departureDate: selectedDeparture?.startDate || preferredDate || undefined,
      }),
      message: whatsappText,
      timing: preferredMonth || planningHorizon,
      groupSize,
      leadReference: leadReference || undefined,
    });
    return (
      <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
        <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.4rem' }}>Inquiry received.</p>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: 1.6, marginBottom: '1rem' }}>Your structured Yoga enquiry is ready for the next conversation.</p>
        {leadReference && <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '0 0 0.75rem' }}>Reference: {leadReference}</p>}
        <TrackedWhatsAppLink
          href={whatsappHref}
          sourcePath={sourcePath}
          location={location}
          intent="Continue Yoga enquiry on WhatsApp"
          analyticsEvent="yoga_whatsapp_click"
          product={selectedOption?.value === 'ttc' ? '28-Day Yoga Teacher Training in Rishikesh' : selectedOption?.label || 'Not sure'}
          productId={selectedOption?.productId || undefined}
          departureId={queryDepartureId || undefined}
          departureDate={selectedDeparture?.startDate || preferredDate || undefined}
          departureEndDate={selectedDeparture?.endDate || undefined}
          duration={duration || undefined}
          ctaPosition="form_success"
          ctaId="yoga_progressive_form_success_whatsapp"
          ctaLabel="Continue on WhatsApp"
          leadReference={leadReference || undefined}
          style={{ display: 'inline-flex', padding: '0.8rem 1rem', borderRadius: 6, background: 'var(--color-primary, #2d6a4f)', color: '#fff', fontWeight: 700, textDecoration: 'none' }}
        >
          Continue on WhatsApp
        </TrackedWhatsAppLink>
      </div>
    );
  }

  const fieldStyle: React.CSSProperties = { width: '100%', padding: '0.8rem 0.7rem', border: '1px solid var(--color-border)', borderRadius: 6, fontSize: '0.95rem', lineHeight: 1.5, background: '#fff', color: 'var(--color-text)' };
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.3rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text)' };
  const stepNames = initialProduct ? ['Contact', 'Preferences'] : ['Contact', 'Option', 'Preferences'];
  const visibleStep = initialProduct && step === 3 ? 2 : step;

  return (
    <form onSubmit={submitInquiry} style={{ textAlign: 'left', marginTop: '1rem' }}>
      <div aria-label="Form progress" style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
        {stepNames.map((nameLabel, index) => <div key={nameLabel} style={{ flex: 1, padding: '0.45rem 0.25rem', textAlign: 'center', fontSize: '0.72rem', fontWeight: 700, color: index + 1 <= visibleStep ? 'var(--color-primary)' : 'var(--color-text-secondary)', borderBottom: `3px solid ${index + 1 <= visibleStep ? 'var(--color-primary)' : 'var(--color-border)'}` }}>{index + 1}. {nameLabel}</div>)}
      </div>

      {step === 1 && <div style={{ display: 'grid', gap: '0.8rem' }}>
        <div><label htmlFor="yoga-progressive-name" style={labelStyle}>Name *</label><input id="yoga-progressive-name" value={name} onChange={(event) => setName(event.target.value)} style={fieldStyle} autoComplete="name" /></div>
        <div><label htmlFor="yoga-progressive-phone" style={labelStyle}>WhatsApp / phone *</label><input id="yoga-progressive-phone" value={phone} onChange={(event) => setPhone(event.target.value)} style={fieldStyle} autoComplete="tel" /></div>
        <div><label htmlFor="yoga-progressive-email" style={labelStyle}>Email (optional)</label><input id="yoga-progressive-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} style={fieldStyle} autoComplete="email" /></div>
      </div>}

      {step === 2 && !initialProduct && <div style={{ display: 'grid', gap: '0.6rem' }}>
        <p style={{ margin: '0 0 0.35rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Choose one option. You can refine location and timing next.</p>
        {YOGA_PRODUCT_OPTIONS.map((option) => <button key={option.value} type="button" onClick={() => setProduct(option.value)} style={{ ...fieldStyle, textAlign: 'left', cursor: 'pointer', border: product === option.value ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', background: product === option.value ? 'var(--color-primary-light, #e8f5e9)' : '#fff', fontWeight: product === option.value ? 700 : 400 }}>{option.label}</button>)}
      </div>}

      {step === 3 && <div style={{ display: 'grid', gap: '0.8rem' }}>
        {!selectedLocationKnown && <div><label htmlFor="yoga-progressive-location" style={labelStyle}>Preferred location</label><select id="yoga-progressive-location" value={location} onChange={(event) => setLocation(event.target.value)} style={fieldStyle}><option value="">No preference</option><option>Rishikesh</option><option>Sankri</option><option>Chakrata</option><option>Zanskar</option><option>Other</option></select></div>}
        {!selectedDeparture && <><div><label htmlFor="yoga-progressive-date" style={labelStyle}>Preferred date or month</label><input id="yoga-progressive-date" value={preferredDate} onChange={(event) => setPreferredDate(event.target.value)} placeholder="e.g. November 2026 or 12 November" style={fieldStyle} /></div>
        <div><label htmlFor="yoga-progressive-month" style={labelStyle}>Preferred month</label><input id="yoga-progressive-month" value={preferredMonth} onChange={(event) => setPreferredMonth(event.target.value)} placeholder="Optional" style={fieldStyle} /></div></>}
        {!selectedExperienceKnown && <div><label htmlFor="yoga-progressive-experience" style={labelStyle}>Yoga experience</label><select id="yoga-progressive-experience" value={yogaExperience} onChange={(event) => setYogaExperience(event.target.value)} style={fieldStyle}><option value="">Not sure</option><option>Beginner</option><option>Some experience</option><option>Experienced</option><option>Teacher</option></select></div>}
        <div><label htmlFor="yoga-progressive-group" style={labelStyle}>Group size</label><select id="yoga-progressive-group" value={groupSize} onChange={(event) => setGroupSize(event.target.value)} style={fieldStyle}><option value="">Not sure</option><option value="1–2">1–2 people</option><option value="3–5">3–5 people</option><option value="6+">6+ people</option></select></div>
        <div><label htmlFor="yoga-progressive-budget" style={labelStyle}>Budget</label><select id="yoga-progressive-budget" value={budget} onChange={(event) => setBudget(event.target.value)} style={fieldStyle}><option value="">Unknown</option><option>₹15–30k</option><option>₹30–60k</option><option>₹60k+</option><option>Not sure yet</option></select></div>
        <div><label htmlFor="yoga-progressive-readiness" style={labelStyle}>Booking readiness</label><select id="yoga-progressive-readiness" value={bookingReadiness} onChange={(event) => setBookingReadiness(event.target.value)} style={fieldStyle}><option value="">Unknown</option><option>Researching</option><option>Likely</option><option>Ready to book</option></select></div>
        {!selectedPlanningHorizonKnown && <div><label htmlFor="yoga-progressive-horizon" style={labelStyle}>How soon are you planning?</label><select id="yoga-progressive-horizon" value={planningHorizon} onChange={(event) => setPlanningHorizon(event.target.value)} style={fieldStyle}><option value="">No timing information</option><option>0–30 days</option><option>31–90 days</option><option>91–180 days</option></select></div>}
      </div>}

      {error && <p role="alert" style={{ color: '#b91c1c', fontSize: '0.85rem', margin: '0.8rem 0 0' }}>{error}</p>}
      <div style={{ display: 'flex', gap: '0.7rem', marginTop: '1rem' }}>
        {step > 1 && <button type="button" onClick={() => { setError(''); setStep(initialProduct && step === 3 ? 1 : (step - 1) as 1 | 2); }} style={{ ...fieldStyle, width: 'auto', cursor: 'pointer' }}>Back</button>}
        {step < 3 ? <button type="button" onClick={goNext} style={{ ...fieldStyle, flex: 1, cursor: 'pointer', background: 'var(--color-primary, #2d6a4f)', color: '#fff', fontWeight: 700 }}>Next</button> : <button type="submit" disabled={submitting} style={{ ...fieldStyle, flex: 1, cursor: submitting ? 'not-allowed' : 'pointer', background: submitting ? '#9ca3af' : 'var(--color-primary, #2d6a4f)', color: '#fff', fontWeight: 700 }}>{submitting ? 'Sending…' : 'Send enquiry'}</button>}
      </div>
    </form>
  );
}

export default function InlineInquiryForm(props: InlineInquiryFormProps) {
  const isYogaInquiry = props.vertical === 'retreat' && (props.category.toLowerCase().includes('yoga') || props.sourcePath.toLowerCase().includes('yoga'));
  return isYogaInquiry ? <YogaProgressiveInquiryForm {...props} /> : <LegacyInlineInquiryForm {...props} />;
}
