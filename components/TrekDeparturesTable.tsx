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
  return 'inherit';
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

  const thStyle: React.CSSProperties = {
    padding: '0.5rem',
    borderBottom: '1px solid #e0e0e0',
    textAlign: 'left',
  };
  const tdStyle: React.CSSProperties = {
    padding: '0.5rem',
    borderBottom: '1px solid #f0f0f0',
  };

  function handleCheckAvailability(date: string) {
    track({ event: 'departure_table_click', from: sourcePath, meta: { trek: trekSlug, source: sourcePath, date } });
    setModalOpen(true);
  }

  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
        Upcoming {trekTitle} Departures
      </h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
        See upcoming{' '}
        <Link
          href={`/treks/${trekSlug}/departures`}
          style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}
        >
          {trekTitle.toLowerCase()} departures
        </Link>{' '}
        for all available dates.
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
          <thead>
            <tr style={{ background: 'var(--color-surface, #f7f7f7)' }}>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Duration</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Seats</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {DEPARTURES.map((row, i) => (
              <tr key={i}>
                <td style={tdStyle}>{row.date}</td>
                <td style={tdStyle}>{row.duration}</td>
                <td style={tdStyle}>{row.price}</td>
                <td style={{ ...tdStyle, color: seatColor(row.seats), fontWeight: row.seats <= 5 ? 600 : 400 }}>
                  {row.seats} left
                </td>
                <td style={tdStyle}>
                  <button
                    type="button"
                    style={{
                      padding: '0.4rem 1rem',
                      background: 'var(--color-primary, #1976d2)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontWeight: 500,
                    }}
                    onClick={() => handleCheckAvailability(row.date)}
                  >
                    Reserve Your Spot
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.75rem', lineHeight: 1.6 }}>
        Small group size (max 12 trekkers). Seats fill quickly during winter departures.
      </p>
      {nextDep && (
        <p style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          color: nextDep.daysAway <= 14 ? '#d32f2f' : 'var(--color-primary, #1976d2)',
          marginTop: '0.5rem',
        }}>
          Next departure: {nextDep.date} · {nextDep.seats} seats remaining
          {nextDep.daysAway <= 30 && ` · ${nextDep.daysAway} days away`}
        </p>
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
