'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

const MONTHS = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const GROUP_SIZES = ['', '1', '2', '3–4', '5–8', '9+'];

const BUDGETS = ['', '₹15–30k', '₹30–60k', '₹60k+', 'Not sure yet'];

export default function InquiryForm() {
  const searchParams = useSearchParams();

  // Hidden fields from query params
  const vertical = searchParams.get('vertical') || '';
  const category = searchParams.get('category') || '';
  const source = searchParams.get('source') || '';
  const prefillLocation = searchParams.get('location') || '';

  // Anti-spam: timestamp when form rendered
  const loadedAt = useRef(Date.now());

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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

  // Sync prefillLocation if params change
  useEffect(() => {
    if (prefillLocation) setLocation(prefillLocation);
  }, [prefillLocation]);

  useEffect(() => {
    if (vertical === 'trek' || vertical === 'retreat') setInterestedIn(vertical);
  }, [vertical]);

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
          source,
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
      <div
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
          A mountain planner will be in touch within 24 hours. Check your email for a confirmation.
        </p>
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
    <form onSubmit={handleSubmit} style={{ maxWidth: '480px' }}>
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
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="inq-email" style={labelStyle}>Email *</label>
        <input
          id="inq-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          style={inputStyle}
        />
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
        <p style={{ color: '#dc2626', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
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
