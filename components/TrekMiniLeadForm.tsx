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
  const [website, setWebsite] = useState(''); // honeypot
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
          name,
          phone,
          trek: trekSlug,
          interestedIn: 'trek',
          location: locationId,
          month,
          groupSize,
          source: sourcePath,
          vertical: 'trek',
          category: trekSlug,
          website,
          _t: loadedAt.current,
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
      <div style={{ padding: '1rem 1.25rem', backgroundColor: '#f0fdf4', borderRadius: 'var(--radius-sm, 6px)', marginBottom: '1.5rem', textAlign: 'center' }}>
        <p style={{ fontWeight: 600, color: '#166534', marginBottom: '0.2rem' }}>Inquiry received!</p>
        <p style={{ fontSize: '0.85rem', color: '#166534' }}>Our trek coordinator will contact you within 2 hours.</p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem 0.65rem',
    border: '1px solid var(--color-border, #d1d5db)',
    borderRadius: 'var(--radius-sm, 4px)',
    fontSize: '0.85rem',
    lineHeight: 1.4,
    backgroundColor: 'white',
    color: 'var(--color-text)',
  };

  // Sort season months to suggest first
  const seasonMonths = bestSeason.length > 0 ? bestSeason : [];
  const allMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const sortedMonths = [...seasonMonths, ...allMonths.filter(m => !seasonMonths.includes(m))];

  return (
    <aside
      style={{
        padding: '1rem 1.25rem',
        backgroundColor: 'var(--color-surface, #f9f9f9)',
        borderRadius: 'var(--radius-sm, 6px)',
        border: '1px solid var(--color-border, #e5e7eb)',
        marginBottom: '1.5rem',
      }}
    >
      <p style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem' }}>
        Interested in {trekTitle}? Get availability &amp; pricing
      </p>
      <form onSubmit={handleSubmit}>
        {/* Honeypot */}
        <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="tel"
            placeholder="Phone / WhatsApp"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={inputStyle}
          >
            <option value="">Preferred month</option>
            {sortedMonths.map((m) => (
              <option key={m} value={m}>{m}{seasonMonths.includes(m) ? ' ✓' : ''}</option>
            ))}
          </select>
          <select
            value={groupSize}
            onChange={(e) => setGroupSize(e.target.value)}
            style={inputStyle}
          >
            <option value="">Group size</option>
            <option value="1">Solo</option>
            <option value="2">2 people</option>
            <option value="3–4">3–4 people</option>
            <option value="5–8">5–8 people</option>
            <option value="9+">9+</option>
          </select>
        </div>
        {error && <p style={{ color: '#d32f2f', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '0.55rem',
            backgroundColor: 'var(--color-primary, #1976d2)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-sm, 4px)',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: submitting ? 'wait' : 'pointer',
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? 'Sending…' : 'Check Availability'}
        </button>
      </form>
    </aside>
  );
}
