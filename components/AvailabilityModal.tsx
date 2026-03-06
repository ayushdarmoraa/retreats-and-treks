'use client';

/**
 * AvailabilityModal — Micro-qualification form for trek inquiry.
 *
 * Lightweight modal overlay. Fields:
 *   - Preferred Month (dropdown from trek's bestSeason)
 *   - Group Size (1–10+)
 *   - Experience Level (Beginner / Intermediate / Advanced)
 *   - Phone or Email
 *
 * On submit → POST /api/inquire (existing endpoint)
 * Success message: "Our trek coordinator will contact you within 2 hours."
 *
 * Tracks: availability_form_submit event.
 * Anti-spam: honeypot + timestamp delta (same pattern as InlineInquiryForm).
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { track } from '@/utils/telemetry';

interface AvailabilityModalProps {
  trekTitle: string;
  trekSlug: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  bestSeason: string[];
  locationId: string;
  locationName: string;
  sourcePath: string;
  onClose: () => void;
}

const ALL_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const GROUP_SIZES = ['1', '2', '3–4', '5–8', '9–10', '10+'];
const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export default function AvailabilityModal({
  trekTitle,
  trekSlug,
  difficulty,
  bestSeason,
  locationId,
  locationName,
  sourcePath,
  onClose,
}: AvailabilityModalProps) {
  const loadedAt = useRef(Date.now());
  const overlayRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [month, setMonth] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [experience, setExperience] = useState('');
  const [contact, setContact] = useState('');
  const [name, setName] = useState('');

  // Honeypot
  const [website, setWebsite] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // Close on overlay click (not form click)
  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  // Determine month options: bestSeason first (recommended), then others
  const recommendedMonths = bestSeason;
  const otherMonths = ALL_MONTHS.filter((m) => !bestSeason.includes(m));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    // Determine if contact is email or phone
    const isEmail = contact.includes('@');

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: isEmail ? contact : '',
          phone: !isEmail ? contact : '',
          interestedIn: 'trek',
          location: locationId,
          month,
          groupSize,
          experience,
          budget: '',
          source: sourcePath,
          vertical: 'trek',
          category: `availability-${trekSlug}`,
          trekTitle,
          difficulty,
          website, // honeypot
          _t: loadedAt.current,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      track({
        event: 'availability_form_submit',
        from: sourcePath,
        meta: { trek: trekSlug, difficulty, month, groupSize, experience },
      });

      setSubmitted(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.6rem 0.75rem',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.9rem',
    lineHeight: 1.5,
    backgroundColor: 'white',
    color: 'var(--color-text)',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 600,
    marginBottom: '0.25rem',
    color: 'var(--color-text)',
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Check availability for ${trekTitle}`}
        style={{
          backgroundColor: 'white',
          borderRadius: 'var(--radius-md)',
          maxWidth: '28rem',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '1.5rem',
          position: 'relative',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            color: 'var(--color-text-secondary, #6b7280)',
            padding: '0.25rem',
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {submitted ? (
          /* ── Success state ── */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <p style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              Request received!
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.7, marginBottom: '1rem' }}>
              Our trek coordinator will contact you within <strong>2 hours</strong> with
              available dates and group details for the {trekTitle}.
            </p>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.5rem 1.5rem',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.25rem', paddingRight: '2rem' }}>
              {trekTitle}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary, #6b7280)', marginBottom: '1rem' }}>
              {difficulty} · {locationName} · Best: {bestSeason.slice(0, 3).join(', ')}
            </p>

            <form ref={formRef} onSubmit={handleSubmit}>
              {/* Honeypot */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', height: 0, overflow: 'hidden' }}>
                <label htmlFor="avail-website">Website</label>
                <input
                  id="avail-website"
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <label htmlFor="avail-name" style={labelStyle}>Name *</label>
                <input
                  id="avail-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength={2}
                  placeholder="Your name"
                  style={inputStyle}
                  autoFocus
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <label htmlFor="avail-month" style={labelStyle}>Preferred month *</label>
                  <select
                    id="avail-month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    required
                    style={inputStyle}
                  >
                    <option value="">Select month…</option>
                    <optgroup label="Recommended">
                      {recommendedMonths.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </optgroup>
                    {otherMonths.length > 0 && (
                      <optgroup label="Other months">
                        {otherMonths.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </optgroup>
                    )}
                  </select>
                </div>
                <div>
                  <label htmlFor="avail-group" style={labelStyle}>Group size *</label>
                  <select
                    id="avail-group"
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                    required
                    style={inputStyle}
                  >
                    <option value="">Select…</option>
                    {GROUP_SIZES.map((s) => (
                      <option key={s} value={s}>{s === '1' ? 'Solo' : `${s} people`}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <label htmlFor="avail-experience" style={labelStyle}>Experience level *</label>
                <select
                  id="avail-experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                  style={inputStyle}
                >
                  <option value="">Select…</option>
                  {EXPERIENCE_LEVELS.map((l) => (
                    <option key={l} value={l}>{l}{l === 'Beginner' ? ' — no prior treks' : l === 'Intermediate' ? ' — 1–3 treks done' : ' — 4+ treks, high altitude'}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <label htmlFor="avail-contact" style={labelStyle}>Phone or Email *</label>
                <input
                  id="avail-contact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  placeholder="WhatsApp number or email"
                  style={inputStyle}
                />
              </div>

              {error && (
                <p style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '0.7rem 1.5rem',
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
                {submitting ? 'Sending…' : 'Check Availability'}
              </button>

              <p style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary, #6b7280)', textAlign: 'center', marginTop: '0.5rem', lineHeight: 1.5 }}>
                Our trek coordinator will respond within 2 hours.
                <br />No spam. No payment required.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
