'use client';

import { useState } from 'react';
import Link from 'next/link';
import AvailabilityModal from '@/components/AvailabilityModal';
import { track } from '@/utils/telemetry';

interface TrekDeparturesTableProps {
  trekTitle: string;
  trekSlug: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  bestSeason: string[];
  locationId: string;
  locationName: string;
  sourcePath: string;
}

const DEPARTURES = [
  { date: '15 Mar 2026', duration: '4D/3N', price: '₹9,500', seats: 6 },
  { date: '22 Mar 2026', duration: '4D/3N', price: '₹9,500', seats: 8 },
  { date: '05 Apr 2026', duration: '4D/3N', price: '₹10,200', seats: 10 },
];

function seatColor(seats: number): string {
  if (seats <= 2) return '#d32f2f';
  if (seats <= 5) return '#e65100';
  return '#555555';
}

function getNextDeparture(): { date: string; seats: number; daysAway: number } | null {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  for (const dep of DEPARTURES) {
    const parsed = new Date(dep.date);
    if (parsed >= now) {
      const diff = Math.ceil((parsed.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return { date: dep.date, seats: dep.seats, daysAway: diff };
    }
  }
  return null;
}

export default function TrekDeparturesTable({
  trekTitle,
  trekSlug,
  difficulty,
  bestSeason,
  locationId,
  locationName,
  sourcePath,
}: TrekDeparturesTableProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const nextDep = getNextDeparture();

  function handleCheckAvailability(date: string) {
    track({ event: 'departure_table_click', from: sourcePath, meta: { trek: trekSlug, source: sourcePath, date } });
    setModalOpen(true);
  }

  return (
    <section style={{ marginBottom: '2rem' }}>

      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)', opacity: 0.5, display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'var(--color-primary)', fontWeight: 500, opacity: 0.7 }}>
          Departures
        </span>
      </div>

      <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.6rem' }}>
        Upcoming {trekTitle} Departures
      </h2>

      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 300, color: '#888888', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        See upcoming{' '}
        <Link href={`/treks/${trekSlug}/departures`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
          {trekTitle.toLowerCase()} departures
        </Link>{' '}
        for all available dates.
      </p>

      {/* Table */}
      <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
          <thead>
            <tr style={{ background: '#f7f9f7', borderBottom: '1px solid #e5e7eb' }}>
              {['Date', 'Duration', 'Price', 'Seats', 'Action'].map((h) => (
                <th key={h} style={{
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.55rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--color-primary)',
                  opacity: 0.75,
                  whiteSpace: 'nowrap' as const,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEPARTURES.map((row, i) => (
              <tr key={i} style={{ borderBottom: i < DEPARTURES.length - 1 ? '1px solid #f0f0f0' : 'none', background: '#ffffff' }}>
                <td style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 400, color: '#111111' }}>
                  {row.date}
                </td>
                <td style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 300, color: '#555555' }}>
                  {row.duration}
                </td>
                <td style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 500, color: '#111111' }}>
                  {row.price}
                </td>
                <td style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: row.seats <= 5 ? 600 : 300, color: seatColor(row.seats) }}>
                  {row.seats} left
                </td>
                <td style={{ padding: '0.9rem 1rem' }}>
                  <button
                    type="button"
                    onClick={() => handleCheckAvailability(row.date)}
                    style={{
                      padding: '0.45rem 1rem',
                      background: 'transparent',
                      color: 'var(--color-primary)',
                      border: '1px solid rgba(15,118,110,0.35)',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '0.62rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase' as const,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap' as const,
                    }}
                  >
                    Reserve Your Spot
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.8rem', fontWeight: 300, color: '#999999', marginTop: '0.85rem', lineHeight: 1.6 }}>
        Small group size (max 12 trekkers). Seats fill quickly during winter departures.
      </p>

      {/* Next departure urgency bar */}
      {nextDep && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem 1rem',
          background: nextDep.daysAway <= 14 ? 'rgba(211,47,47,0.05)' : 'rgba(15,118,110,0.05)',
          border: `1px solid ${nextDep.daysAway <= 14 ? 'rgba(211,47,47,0.2)' : 'rgba(15,118,110,0.2)'}`,
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: nextDep.daysAway <= 14 ? '#d32f2f' : 'var(--color-primary)',
            flexShrink: 0,
            display: 'inline-block',
          }} />
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.82rem',
            fontWeight: 500,
            color: nextDep.daysAway <= 14 ? '#d32f2f' : 'var(--color-primary)',
            margin: 0,
          }}>
            Next departure: {nextDep.date} · {nextDep.seats} seats remaining
            {nextDep.daysAway <= 30 && ` · ${nextDep.daysAway} days away`}
          </p>
        </div>
      )}

      {modalOpen && (
        <AvailabilityModal
          trekTitle={trekTitle}
          trekSlug={trekSlug}
          difficulty={difficulty}
          bestSeason={bestSeason}
          locationId={locationId}
          locationName={locationName}
          sourcePath={sourcePath}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
}