/**
 * DurationRetreatSuggestions
 * Server component — renders retreat journey links grouped by duration.
 *
 * Duration assignments live here as a presentation-layer config.
 * When a `durationDays` field is added to retreat service files,
 * replace DURATION_GROUP with a filter on service.durationDays.
 */

import Link from 'next/link';
import { getAllRetreatServices } from '@/content/retreats/services';
import { RETREAT_DURATION_GROUP } from '@/config/retreatDurations';

export default function DurationRetreatSuggestions() {
  const allServices = getAllRetreatServices();

  const threeDayRetreats = allServices.filter(
    (s) => RETREAT_DURATION_GROUP[s.slug] === '3-day'
  );
  const fiveDayRetreats = allServices.filter(
    (s) => RETREAT_DURATION_GROUP[s.slug] === '5-day'
  );

  return (
    <section
      style={{
        marginTop: 'var(--space-xl)',
        paddingTop: 'var(--space-lg)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>
        Explore Retreat Options by Duration
      </h2>

      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>3-Day Retreats</h3>
      <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1.5rem' }}>
        {threeDayRetreats.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/retreats/journeys/${service.slug}`}
              style={{ color: 'var(--color-primary)' }}
            >
              {service.title}
            </Link>
            {service.oneLineEssence && (
              <span style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                {' '}— {service.oneLineEssence}
              </span>
            )}
          </li>
        ))}
      </ul>

      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>5-Day Retreats</h3>
      <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '0' }}>
        {fiveDayRetreats.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/retreats/journeys/${service.slug}`}
              style={{ color: 'var(--color-primary)' }}
            >
              {service.title}
            </Link>
            {service.oneLineEssence && (
              <span style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                {' '}— {service.oneLineEssence}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
