'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { buildAttributionQuery, captureAttribution } from '@/utils/attribution';
import { acquirePendingSubmissionToken } from '@/lib/submission-token';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import {
  buildAttributionSnapshot,
  readConversionSessionId,
  resolveConversionContext,
} from '@/lib/conversion-foundation';
import { track } from '@/utils/telemetry';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';

const MONTHS = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const GROUP_SIZES = ['', '1', '2', '3–4', '5–8', '9+'];

const BUDGETS = ['', '₹15–30k', '₹30–60k', '₹60k+', 'Not sure yet'];

export interface InquiryFieldErrors {
  name?: string;
  phone?: string;
  email?: string;
}

/**
 * Client-side validation mirroring the inquiry contract in lib/schemas.ts:
 * name required, phone required (the channel the team replies on),
 * email optional but must be well-formed when provided.
 */
export function validateInquiryFields(values: {
  name: string;
  phone: string;
  email: string;
}): InquiryFieldErrors {
  const errors: InquiryFieldErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }
  const digits = values.phone.replace(/\D/g, '');
  if (!/^[+\d\s().-]+$/.test(values.phone.trim()) || digits.length < 7 || digits.length > 15) {
    errors.phone = 'Please enter a valid WhatsApp number.';
  }
  const trimmedEmail = values.email.trim();
  if (trimmedEmail && !/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address or leave it blank.';
  }
  return errors;
}

export default function InquiryForm() {
  const searchParams = useSearchParams();

  // Hidden fields from query params
  const vertical = searchParams.get('vertical') || '';
  const category = searchParams.get('category') || '';
  const source = searchParams.get('source') || '';
  const prefillLocation = searchParams.get('location') || '';
  const attribution = buildAttributionQuery(searchParams);
  const sourceWithAttribution = attribution
    ? `${source}?${attribution}`
    : source;

  // Anti-spam: timestamp when form rendered
  const loadedAt = useRef(Date.now());

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [conversionSessionId] = useState(() => readConversionSessionId());
  const [interestedIn, setInterestedIn] = useState<'trek' | 'retreat' | ''>(
    (vertical === 'trek' || vertical === 'retreat') ? vertical : ''
  );
  const [location, setLocation] = useState(prefillLocation);
  const [month, setMonth] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [budget, setBudget] = useState('');

  // Honeypot — invisible to humans, bots auto-fill
  const [website, setWebsite] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<InquiryFieldErrors>({});
  const [leadReference, setLeadReference] = useState('');

  // Synchronous in-flight guard: state alone can lag behind a rapid double click.
  const submitInFlight = useRef(false);
  const captureStarted = useRef(false);
  const savedRef = useRef(false);

  function startCapture() {
    if (captureStarted.current) return;
    captureStarted.current = true;
    track({
      event: 'lead_capture_open',
      from: source || '/contact',
      meta: {
        conversion_session_id: conversionSessionId,
        vertical,
        category,
        form: 'contact_inquiry',
      },
    });
  }

  useEffect(() => () => {
    if (!captureStarted.current || savedRef.current) return;
    track({
      event: 'lead_capture_abandon',
      from: source || '/contact',
      meta: {
        conversion_session_id: conversionSessionId,
        vertical,
        category,
        form: 'contact_inquiry',
      },
    });
  }, [category, conversionSessionId, source, vertical]);

  // Sync prefillLocation if params change
  useEffect(() => {
    if (prefillLocation) setLocation(prefillLocation);
  }, [prefillLocation]);

  useEffect(() => {
    if (vertical === 'trek' || vertical === 'retreat') setInterestedIn(vertical);
  }, [vertical]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitInFlight.current || submitting) return;
    setError('');

    const errors = validateInquiryFields({ name, phone, email });
    setFieldErrors(errors);
    if (errors.name || errors.phone || errors.email) return;

    submitInFlight.current = true;
    setSubmitting(true);

    try {
      captureAttribution(searchParams);
      const attributionSnapshot = buildAttributionSnapshot(searchParams);
      const inquiry = {
        name,
        email: email.trim(),
        phone,
        interestedIn,
        location,
        month,
        groupSize,
        budget,
        source: sourceWithAttribution,
        vertical,
        category,
        conversionSessionId,
        firstLandingPage: attributionSnapshot.firstLandingPage,
        lastLandingPage: attributionSnapshot.lastLandingPage,
        referrer: attributionSnapshot.referrer,
        firstUtm: attributionSnapshot.firstUtm,
        lastUtm: attributionSnapshot.lastUtm,
        firstTouchAt: attributionSnapshot.firstTouchAt,
        lastTouchAt: attributionSnapshot.lastTouchAt,
        website,
        _t: loadedAt.current,
      };
      // The same pending token is reused for retries of this logical inquiry;
      // it is only cleared once the API confirms success.
      const pendingToken = await acquirePendingSubmissionToken(
        `inquiry-page:${source}:${vertical}:${category}`,
        inquiry,
      );
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...inquiry, submissionToken: pendingToken.token }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success !== true) {
        setError(
          (typeof data.error === 'string' && data.error) ||
            'Something went wrong. Your details are still here — please try again.',
        );
        return;
      }

      pendingToken.clear();
      const reference = typeof data.leadReference === 'string' ? data.leadReference : '';
      setLeadReference(reference);
      savedRef.current = true;
      setSubmitted(true);
      // Telemetry fires only after the API confirmed persistence; track() is
      // fire-and-forget and never turns a saved inquiry into a reported failure.
      track({
        event: 'form_submission',
        from: source || '/contact',
        meta: {
          page: source || '/contact',
          vertical,
          category,
          location,
          group_size: groupSize,
          lead_reference: reference,
          conversion_session_id: conversionSessionId,
        },
      });
    } catch {
      setError('Network error. Your details are still here — please try again.');
    } finally {
      submitInFlight.current = false;
      setSubmitting(false);
    }
  }

  if (submitted) {
    const sourcePath = source || '/contact';
    const whatsappHref = buildWhatsAppUrl({
      context: resolveConversionContext({
        pagePath: sourcePath,
        vertical: vertical || undefined,
        category: category || undefined,
        conversionSessionId,
        locationName: location || undefined,
        ctaId: 'inquiry_form_whatsapp',
        ctaPosition: 'form_success',
        ctaLabel: 'Continue on WhatsApp',
        ctaVariant: 'default',
      }),
      leadReference: leadReference || undefined,
      groupSize: groupSize || undefined,
      timing: month || undefined,
      message:
        `Hi, I have submitted an enquiry${location ? ` for ${location}` : ''}` +
        `${month ? ` (${month})` : ''}. Please share the next steps.`,
    });

    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
          border: '1px solid #bbf7d0',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-lg)',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
          Inquiry received.
        </p>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.6 }}>
          A mountain planner will be in touch within 24 hours.
          {email.trim() ? ' Check your email for a confirmation.' : ''}
        </p>
        {leadReference && (
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary, #6b7280)', marginBottom: '0.5rem' }}>
            Reference: {leadReference}
          </p>
        )}
        <TrackedWhatsAppLink
          href={whatsappHref}
          sourcePath={sourcePath}
          location={location || undefined}
          vertical={vertical || undefined}
          category={category || undefined}
          ctaId="inquiry_form_whatsapp"
          ctaPosition="form_success"
          ctaLabel="Continue on WhatsApp"
          ctaVariant="default"
          conversionSessionId={conversionSessionId}
          leadReference={leadReference || undefined}
          style={{
            display: 'inline-block',
            marginTop: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#25D366',
            color: '#ffffff',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.95rem',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Continue on WhatsApp
        </TrackedWhatsAppLink>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.6rem 0.75rem',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.95rem',
    lineHeight: 1.5,
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 600,
    marginBottom: '0.25rem',
    color: 'var(--color-text)',
  };

  return (
    <form onSubmit={handleSubmit} onFocusCapture={startCapture} style={{ maxWidth: '480px' }}>
      {/* ── HONEYPOT — invisible to humans ── */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', height: 0, overflow: 'hidden' }}>
        <label htmlFor="inq-website">Website</label>
        <input
          id="inq-website"
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="inq-name" style={labelStyle}>Name *</label>
        <input
          id="inq-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={2}
          placeholder="Your name"
          autoComplete="name"
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? 'inq-name-error' : undefined}
          style={inputStyle}
        />
        {fieldErrors.name && (
          <p id="inq-name-error" role="alert" style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="inq-phone" style={labelStyle}>WhatsApp / phone *</label>
        <input
          id="inq-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="Your WhatsApp number"
          autoComplete="tel"
          aria-invalid={fieldErrors.phone ? true : undefined}
          aria-describedby={fieldErrors.phone ? 'inq-phone-error' : undefined}
          style={inputStyle}
        />
        {fieldErrors.phone && (
          <p id="inq-phone-error" role="alert" style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            {fieldErrors.phone}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="inq-email" style={labelStyle}>Email (optional)</label>
        <input
          id="inq-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={fieldErrors.email ? 'inq-email-error' : undefined}
          style={inputStyle}
        />
        {fieldErrors.email && (
          <p id="inq-email-error" role="alert" style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="inq-interest" style={labelStyle}>Interested in</label>
        <select
          id="inq-interest"
          value={interestedIn}
          onChange={(e) => setInterestedIn(e.target.value as 'trek' | 'retreat' | '')}
          style={inputStyle}
        >
          <option value="">Select...</option>
          <option value="trek">Trek</option>
          <option value="retreat">Retreat</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="inq-location" style={labelStyle}>Preferred location</label>
        <select
          id="inq-location"
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label htmlFor="inq-month" style={labelStyle}>Preferred month</label>
          <select
            id="inq-month"
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
          <label htmlFor="inq-group" style={labelStyle}>Group size</label>
          <select
            id="inq-group"
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

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="inq-budget" style={labelStyle}>Budget range (optional)</label>
        <select
          id="inq-budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          style={inputStyle}
        >
          {BUDGETS.map((b) => (
            <option key={b} value={b}>{b || 'Prefer not to say'}</option>
          ))}
        </select>
      </div>

      {error && (
        <p role="alert" style={{ color: '#dc2626', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          backgroundColor: submitting ? '#9ca3af' : 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: submitting ? 'not-allowed' : 'pointer',
          lineHeight: 1.4,
        }}
      >
        {submitting ? 'Sending...' : 'Send Inquiry'}
      </button>
    </form>
  );
}
