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

const MONTHS = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const GROUP_SIZES = ['', '1', '2', '3–4', '5–8', '9+'];

const BUDGETS = ['', '₹15–30k', '₹30–60k', '₹60k+', 'Not sure yet'];

interface InlineInquiryFormProps {
  vertical: 'trek' | 'retreat';
  category: string;
  sourcePath: string;
  location?: string;
}

export default function InlineInquiryForm({
  vertical,
  category,
  sourcePath,
  location: prefillLocation,
}: InlineInquiryFormProps) {
  // Anti-spam: timestamp when form rendered
  const loadedAt = useRef(Date.now());

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interestedIn, setInterestedIn] = useState<'trek' | 'retreat' | ''>(vertical || '');
  const [location, setLocation] = useState(prefillLocation || '');
  const [month, setMonth] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [budget, setBudget] = useState('');

  // Honeypot — invisible to humans, bots fill it
  const [website, setWebsite] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          interestedIn,
          location,
          month,
          groupSize,
          budget,
          source: sourcePath,
          vertical,
          category,
          website, // honeypot
          _t: loadedAt.current, // timestamp delta
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Something went wrong. Please try again.');
        return;
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
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.55rem 0.7rem',
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
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

      <div style={{ marginBottom: '0.75rem' }}>
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
      </div>

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
