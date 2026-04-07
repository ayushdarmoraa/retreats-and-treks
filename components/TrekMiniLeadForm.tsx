'use client';

import { useState, useRef } from 'react';
import { track } from '@/utils/telemetry';

interface TrekMiniLeadFormProps {
  trekTitle: string;
  trekSlug: string;
  locationId: string;
  sourcePath: string;
  bestSeason: string[];
}

export default function TrekMiniLeadForm({
  trekTitle,
  trekSlug,
  locationId,
  sourcePath,
  bestSeason,
}: TrekMiniLeadFormProps) {
  const loadedAt = useRef(Date.now());
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [month, setMonth] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone, trek: trekSlug, interestedIn: 'trek',
          location: locationId, month, groupSize,
          source: sourcePath, vertical: 'trek', category: trekSlug,
          website, _t: loadedAt.current,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Something went wrong.');
        return;
      }
      track({ event: 'availability_form_submit', from: sourcePath, meta: { trek: trekSlug, source: sourcePath, form: 'mini' } });
      setSubmitted(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div style={{
        padding: '2rem',
        background: 'rgba(15,118,110,0.04)',
        border: '1px solid rgba(15,118,110,0.2)',
        borderLeft: '3px solid var(--color-primary)',
        borderRadius: '8px',
        marginBottom: '2rem',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontWeight: 500, color: 'var(--color-primary)', marginBottom: '0.35rem', fontSize: '0.95rem' }}>
          Inquiry received!
        </p>
        <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 300, color: '#555555', margin: 0 }}>
          Our trek coordinator will contact you within 2 hours.
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.65rem 0.85rem',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-geist-sans), sans-serif',
    fontWeight: 300,
    lineHeight: 1.4,
    backgroundColor: '#ffffff',
    color: '#333333',
    outline: 'none',
    boxSizing: 'border-box' as const,
  };

  const seasonMonths = bestSeason.length > 0 ? bestSeason : [];
  const allMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const sortedMonths = [...seasonMonths, ...allMonths.filter(m => !seasonMonths.includes(m))];

  return (
    <aside style={{
      padding: '2rem',
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderTop: '2px solid var(--color-primary)',
      borderRadius: '8px',
      marginBottom: '2rem',
    }}>
      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>
          Check Availability
        </span>
      </div>

      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', fontWeight: 400, color: '#111111', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        {trekSlug === 'roopkund-trek' ? 'Plan Your Roopkund Trek → Get Dates & Cost' : trekSlug === 'brahmatal-trek' ? 'Plan Your Brahmatal Trek → Get Dates & Cost' : trekSlug === 'har-ki-dun-trek' ? 'Plan Your Har Ki Dun Trek → Get Dates & Cost' : trekSlug === 'dayara-bugyal-trek' ? 'Plan Your Dayara Bugyal Trek → Get Dates & Cost' : `Interested in ${trekTitle}? Get availability & pricing`}
      </p>

      <form onSubmit={handleSubmit}>
        {/* Honeypot */}
        <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '0.65rem' }}>
          <input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
          <input type="tel" placeholder="Phone / WhatsApp" required value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <select value={month} onChange={(e) => setMonth(e.target.value)} style={inputStyle}>
            <option value="">Preferred month</option>
            {sortedMonths.map((m) => (
              <option key={m} value={m}>{m}{seasonMonths.includes(m) ? ' ✓' : ''}</option>
            ))}
          </select>
          <select value={groupSize} onChange={(e) => setGroupSize(e.target.value)} style={inputStyle}>
            <option value="">Group size</option>
            <option value="1">Solo</option>
            <option value="2">2 people</option>
            <option value="3–4">3–4 people</option>
            <option value="5–8">5–8 people</option>
            <option value="9+">9+</option>
          </select>
        </div>

        {error && (
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', color: '#d32f2f', fontSize: '0.8rem', fontWeight: 300, marginBottom: '0.75rem' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: submitting ? 'rgba(15,118,110,0.6)' : 'var(--color-primary)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase' as const,
            cursor: submitting ? 'wait' : 'pointer',
            transition: 'opacity 0.2s',
          }}
        >
          {submitting ? 'Sending…' : 'Check Availability'}
        </button>
      </form>
    </aside>
  );
}