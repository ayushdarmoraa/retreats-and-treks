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
  productId?: string;
  departureId?: string;
  planningHorizon?: string;
  productOption?: string;
}

function LegacyInlineInquiryForm({
  vertical,
  category,
  sourcePath,
  location: prefillLocation,
  yogaInterest: prefillYogaInterest,
  duration: prefillDuration,
  yogaExperience: prefillYogaExperience,
}: InlineInquiryFormProps) {
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const attribution = buildAttributionQuery(searchParams);
      const sourceWithAttribution = attribution
        ? `${sourcePath}?${attribution}`
        : sourcePath;

      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
          website, // honeypot
          _t: loadedAt.current, // timestamp delta
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

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
          <label htmlFor="inline-email" style={labelStyle}>Email *</label>
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
  productId: prefillProductId,
  departureId: prefillDepartureId,
  planningHorizon: prefillPlanningHorizon,
  productOption: prefillProductOption,
}: InlineInquiryFormProps) {
  const searchParams = useSearchParams();
  const loadedAt = useRef(Date.now());
  const queryProductId = searchParams.get('productId') || prefillProductId || '';
  const queryDepartureId = searchParams.get('departureId') || prefillDepartureId || '';
  const selectedDeparture = queryDepartureId ? getRetreatProgramEvent(queryDepartureId) : undefined;
  const resolvedProductId = queryProductId || selectedDeparture?.productId || '';
  const initialProduct = (resolvedProductId ? YOGA_PRODUCT_OPTIONS.find((option) => option.productId === resolvedProductId) : undefined)
    ?? YOGA_PRODUCT_OPTIONS.find((option) => option.value === prefillProductOption)
    ?? (prefillYogaInterest === 'Yoga TTC' ? YOGA_PRODUCT_OPTIONS.find((option) => option.value === 'ttc') : undefined)
    ?? YOGA_PRODUCT_OPTIONS.find((option) => option.duration === prefillDuration);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const formStarted = useRef(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState(initialProduct?.value || '');
  const normalizedPrefillLocation = ({ rishikesh: 'Rishikesh', sankri: 'Sankri', chakrata: 'Chakrata', zanskar: 'Zanskar', other: 'Other' } as Record<string, string>)[(prefillLocation || '').toLowerCase()] || prefillLocation || selectedDeparture?.locationName || '';
  const [location, setLocation] = useState(normalizedPrefillLocation);
  const [preferredDate, setPreferredDate] = useState(selectedDeparture?.startDate || '');
  const [preferredMonth, setPreferredMonth] = useState(selectedDeparture?.month || '');
  const [yogaExperience, setYogaExperience] = useState(prefillYogaExperience || '');
  const [groupSize, setGroupSize] = useState('');
  const [budget, setBudget] = useState('');
  const [bookingReadiness, setBookingReadiness] = useState('');
  const [planningHorizon, setPlanningHorizon] = useState(prefillPlanningHorizon || '');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const selectedOption = YOGA_PRODUCT_OPTIONS.find((option) => option.value === product);
  const yogaInterest = product === 'ttc' ? 'Yoga TTC' : product === 'not-sure' ? 'Not sure' : 'Yoga Retreat';
  const duration = selectedOption?.duration || prefillDuration || '';

  function goNext() {
    setError('');
    if (step === 1) {
      if (name.trim().length < 2) return setError('Please enter your name.');
      if (phone.replace(/\D/g, '').length < 7) return setError('Please enter a valid WhatsApp number.');
      if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Please enter a valid email address.');
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
    if (step < 3) setStep((current) => (current + 1) as 2 | 3);
  }

  async function submitInquiry(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      captureAttribution(searchParams);
      const attribution = buildAttributionQuery(searchParams);
      const source = attribution ? `${sourcePath}?${attribution}` : sourcePath;
      const funnelContext = {
        page: sourcePath,
        category,
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
      track({ event: 'yoga_form_completion', from: sourcePath, meta: funnelContext });
      const response = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
          vertical: 'retreat',
          category,
          _t: loadedAt.current,
          website: '',
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
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
      setSubmitting(false);
    }
  }

  if (submitted) {
    const whatsappContext = selectedOption?.label || 'Yoga retreat option';
    const whatsappText = selectedOption?.value === 'ttc'
      ? 'Hi, I\'m interested in the 28-Day Yoga Teacher Training in Rishikesh. Please share the upcoming batch details.'
      : `Hi, I have submitted an enquiry about ${whatsappContext}${location ? ` in ${location}` : ''}${preferredDate || preferredMonth ? ` for ${preferredDate || preferredMonth}` : ''}. Please share the next steps.`;
    return (
      <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
        <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.4rem' }}>Inquiry received.</p>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: 1.6, marginBottom: '1rem' }}>Your structured Yoga enquiry is ready for the next conversation.</p>
        <TrackedWhatsAppLink
          href={`https://wa.me/919760446101?text=${encodeURIComponent(whatsappText)}`}
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
          ctaPosition="post-submission"
          style={{ display: 'inline-flex', padding: '0.8rem 1rem', borderRadius: 6, background: 'var(--color-primary, #2d6a4f)', color: '#fff', fontWeight: 700, textDecoration: 'none' }}
        >
          Continue on WhatsApp
        </TrackedWhatsAppLink>
      </div>
    );
  }

  const fieldStyle: React.CSSProperties = { width: '100%', padding: '0.8rem 0.7rem', border: '1px solid var(--color-border)', borderRadius: 6, fontSize: '0.95rem', lineHeight: 1.5, background: '#fff', color: 'var(--color-text)' };
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.3rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text)' };
  const stepNames = ['Contact', 'Option', 'Preferences'];

  return (
    <form onSubmit={submitInquiry} style={{ textAlign: 'left', marginTop: '1rem' }}>
      <div aria-label="Form progress" style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
        {stepNames.map((nameLabel, index) => <div key={nameLabel} style={{ flex: 1, padding: '0.45rem 0.25rem', textAlign: 'center', fontSize: '0.72rem', fontWeight: 700, color: index + 1 <= step ? 'var(--color-primary)' : 'var(--color-text-secondary)', borderBottom: `3px solid ${index + 1 <= step ? 'var(--color-primary)' : 'var(--color-border)'}` }}>{index + 1}. {nameLabel}</div>)}
      </div>

      {step === 1 && <div style={{ display: 'grid', gap: '0.8rem' }}>
        <div><label htmlFor="yoga-progressive-name" style={labelStyle}>Name *</label><input id="yoga-progressive-name" value={name} onChange={(event) => setName(event.target.value)} style={fieldStyle} autoComplete="name" /></div>
        <div><label htmlFor="yoga-progressive-phone" style={labelStyle}>WhatsApp / phone *</label><input id="yoga-progressive-phone" value={phone} onChange={(event) => setPhone(event.target.value)} style={fieldStyle} autoComplete="tel" /></div>
        <div><label htmlFor="yoga-progressive-email" style={labelStyle}>Email *</label><input id="yoga-progressive-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} style={fieldStyle} autoComplete="email" /></div>
      </div>}

      {step === 2 && <div style={{ display: 'grid', gap: '0.6rem' }}>
        <p style={{ margin: '0 0 0.35rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Choose one option. You can refine location and timing next.</p>
        {YOGA_PRODUCT_OPTIONS.map((option) => <button key={option.value} type="button" onClick={() => setProduct(option.value)} style={{ ...fieldStyle, textAlign: 'left', cursor: 'pointer', border: product === option.value ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', background: product === option.value ? 'var(--color-primary-light, #e8f5e9)' : '#fff', fontWeight: product === option.value ? 700 : 400 }}>{option.label}</button>)}
      </div>}

      {step === 3 && <div style={{ display: 'grid', gap: '0.8rem' }}>
        <div><label htmlFor="yoga-progressive-location" style={labelStyle}>Preferred location</label><select id="yoga-progressive-location" value={location} onChange={(event) => setLocation(event.target.value)} style={fieldStyle}><option value="">No preference</option><option>Rishikesh</option><option>Sankri</option><option>Chakrata</option><option>Zanskar</option><option>Other</option></select></div>
        <div><label htmlFor="yoga-progressive-date" style={labelStyle}>Preferred date or month</label><input id="yoga-progressive-date" value={preferredDate} onChange={(event) => setPreferredDate(event.target.value)} placeholder="e.g. November 2026 or 12 November" style={fieldStyle} /></div>
        <div><label htmlFor="yoga-progressive-month" style={labelStyle}>Preferred month</label><input id="yoga-progressive-month" value={preferredMonth} onChange={(event) => setPreferredMonth(event.target.value)} placeholder="Optional" style={fieldStyle} /></div>
        <div><label htmlFor="yoga-progressive-experience" style={labelStyle}>Yoga experience</label><select id="yoga-progressive-experience" value={yogaExperience} onChange={(event) => setYogaExperience(event.target.value)} style={fieldStyle}><option value="">Not sure</option><option>Beginner</option><option>Some experience</option><option>Experienced</option><option>Teacher</option></select></div>
        <div><label htmlFor="yoga-progressive-group" style={labelStyle}>Group size</label><select id="yoga-progressive-group" value={groupSize} onChange={(event) => setGroupSize(event.target.value)} style={fieldStyle}><option value="">Not sure</option><option value="1–2">1–2 people</option><option value="3–5">3–5 people</option><option value="6+">6+ people</option></select></div>
        <div><label htmlFor="yoga-progressive-budget" style={labelStyle}>Budget</label><select id="yoga-progressive-budget" value={budget} onChange={(event) => setBudget(event.target.value)} style={fieldStyle}><option value="">Unknown</option><option>₹15–30k</option><option>₹30–60k</option><option>₹60k+</option><option>Not sure yet</option></select></div>
        <div><label htmlFor="yoga-progressive-readiness" style={labelStyle}>Booking readiness</label><select id="yoga-progressive-readiness" value={bookingReadiness} onChange={(event) => setBookingReadiness(event.target.value)} style={fieldStyle}><option value="">Unknown</option><option>Researching</option><option>Likely</option><option>Ready to book</option></select></div>
        <div><label htmlFor="yoga-progressive-horizon" style={labelStyle}>How soon are you planning?</label><select id="yoga-progressive-horizon" value={planningHorizon} onChange={(event) => setPlanningHorizon(event.target.value)} style={fieldStyle}><option value="">No timing information</option><option>0–30 days</option><option>31–90 days</option><option>91–180 days</option></select></div>
      </div>}

      {error && <p role="alert" style={{ color: '#b91c1c', fontSize: '0.85rem', margin: '0.8rem 0 0' }}>{error}</p>}
      <div style={{ display: 'flex', gap: '0.7rem', marginTop: '1rem' }}>
        {step > 1 && <button type="button" onClick={() => { setError(''); setStep((current) => (current - 1) as 1 | 2); }} style={{ ...fieldStyle, width: 'auto', cursor: 'pointer' }}>Back</button>}
        {step < 3 ? <button type="button" onClick={goNext} style={{ ...fieldStyle, flex: 1, cursor: 'pointer', background: 'var(--color-primary, #2d6a4f)', color: '#fff', fontWeight: 700 }}>Next</button> : <button type="submit" disabled={submitting} style={{ ...fieldStyle, flex: 1, cursor: submitting ? 'not-allowed' : 'pointer', background: submitting ? '#9ca3af' : 'var(--color-primary, #2d6a4f)', color: '#fff', fontWeight: 700 }}>{submitting ? 'Sending…' : 'Send enquiry'}</button>}
      </div>
    </form>
  );
}

export default function InlineInquiryForm(props: InlineInquiryFormProps) {
  const isYogaInquiry = props.vertical === 'retreat' && (props.category.toLowerCase().includes('yoga') || props.sourcePath.toLowerCase().includes('yoga'));
  return isYogaInquiry ? <YogaProgressiveInquiryForm {...props} /> : <LegacyInlineInquiryForm {...props} />;
}
