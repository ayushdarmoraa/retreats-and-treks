/**
 * AllRetreatPrograms
 * Server component — renders all retreat journey programs with links.
 * Used on the /retreats/himalayan-retreats pillar page.
 */

import Link from 'next/link';
import { getAllRetreatServices } from '@/content/retreats/services';

export default function AllRetreatPrograms() {
  const services = getAllRetreatServices();

  return (
    <section
      style={{
        marginTop: 'var(--space-xl)',
        paddingTop: 'var(--space-lg)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>
        Explore Current Retreat Programs
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {services.map((service) => (
          <li
            key={service.slug}
            style={{
              marginBottom: '1.25rem',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <Link
              href={`/retreats/journeys/${service.slug}`}
              style={{
                color: 'var(--color-primary)',
                fontWeight: '500',
                fontSize: '1rem',
              }}
            >
              {service.title}
            </Link>
            {service.oneLineEssence && (
              <p
                style={{
                  margin: '0.25rem 0 0',
                  color: 'var(--color-muted)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                }}
              >
                {service.oneLineEssence}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
