'use client';

/**
 * RetreatCalendarClient — interactive calendar with location/experience/month filters
 * Pure client-side filtering against the serialized events array.
 */

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { track } from '@/utils/telemetry';

export interface CalendarEvent {
  slug: string;
  label: string;
  locationId: string;
  locationName: string;
  experienceSlug: string;
  month: string;
  year: number;
  dateRange: string;
  durationDays: number;
  price: number;
  seatsLeft: number;
  groupSize: number;
  status: string;
}

interface Props {
  events: CalendarEvent[];
}

const statusColors: Record<string, string> = {
  open: '#2d6a4f',
  'filling-fast': '#e67700',
  'last-few': '#c92a2a',
  'sold-out': '#868e96',
};

const statusLabels: Record<string, string> = {
  open: 'Open',
  'filling-fast': 'Filling Fast',
  'last-few': 'Last Few',
  'sold-out': 'Sold Out',
};

const selectStyle: React.CSSProperties = {
  padding: '0.5rem 0.75rem',
  border: '1px solid var(--color-border, #e0e0e0)',
  borderRadius: '6px',
  background: 'var(--color-surface, #fafafa)',
  fontSize: '0.9rem',
  minWidth: '140px',
};

export default function RetreatCalendarClient({ events }: Props) {
  const [locationFilter, setLocationFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');

  const locations = useMemo(() => [...new Set(events.map((e) => e.locationId))].sort(), [events]);
  const locationNames = useMemo(() => {
    const map: Record<string, string> = {};
    events.forEach((e) => { map[e.locationId] = e.locationName; });
    return map;
  }, [events]);

  const experiences = useMemo(() => [...new Set(events.map((e) => e.experienceSlug))].sort(), [events]);
  const experienceLabels = useMemo(() => {
    const map: Record<string, string> = {};
    events.forEach((e) => { map[e.experienceSlug] = e.label + 's'; });
    return map;
  }, [events]);

  const months = useMemo(() => [...new Set(events.map((e) => e.month))], [events]);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (locationFilter !== 'all' && e.locationId !== locationFilter) return false;
      if (experienceFilter !== 'all' && e.experienceSlug !== experienceFilter) return false;
      if (monthFilter !== 'all' && e.month !== monthFilter) return false;
      return true;
    });
  }, [events, locationFilter, experienceFilter, monthFilter]);

  function handleFilter(type: string, value: string) {
    track({ event: 'calendar_filter', from: '/retreat-calendar', meta: { [type]: value } });
    if (type === 'location') setLocationFilter(value);
    if (type === 'experience') setExperienceFilter(value);
    if (type === 'month') setMonthFilter(value);
  }

  return (
    <div>
      {/* ── Filters ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: 'var(--space-lg)' }}>
        <select
          value={locationFilter}
          onChange={(e) => handleFilter('location', e.target.value)}
          style={selectStyle}
          aria-label="Filter by location"
        >
          <option value="all">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{locationNames[loc]}</option>
          ))}
        </select>

        <select
          value={experienceFilter}
          onChange={(e) => handleFilter('experience', e.target.value)}
          style={selectStyle}
          aria-label="Filter by experience"
        >
          <option value="all">All Experiences</option>
          {experiences.map((exp) => (
            <option key={exp} value={exp}>{experienceLabels[exp]}</option>
          ))}
        </select>

        <select
          value={monthFilter}
          onChange={(e) => handleFilter('month', e.target.value)}
          style={selectStyle}
          aria-label="Filter by month"
        >
          <option value="all">All Months</option>
          {months.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* ── Event Cards ─────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <p style={{ color: 'var(--color-text-secondary)', padding: '2rem 0' }}>
          No retreats match your filters. Try adjusting the criteria above, or{' '}
          <Link href="/find-your-retreat" style={{ color: 'var(--color-primary)' }}>
            use the Retreat Finder
          </Link>{' '}
          for a personalised recommendation.
        </p>
      ) : (
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {filtered.map((ev) => {
            const sColor = statusColors[ev.status] ?? statusColors.open;
            const sLabel = statusLabels[ev.status] ?? 'Open';
            return (
              <Link
                key={ev.slug}
                href={`/${ev.slug}`}
                style={{
                  display: 'block',
                  border: '1px solid var(--color-border, #e0e0e0)',
                  borderRadius: 'var(--radius-sm, 8px)',
                  padding: '1.25rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'border-color 0.15s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
                    {ev.label} in {ev.locationName}
                  </h3>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: sColor }}>
                    {sLabel}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                  <span>{ev.dateRange}</span>
                  <span>{ev.durationDays} days</span>
                  <span>₹{ev.price.toLocaleString('en-IN')}</span>
                  <span>{ev.seatsLeft}/{ev.groupSize} seats</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
