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
    <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
      <div className="med-outer">
        <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
          <span className="med-eyebrow-line" />
          <span className="med-eyebrow-text">All Programs</span>
          <span className="med-eyebrow-line" />
        </div>
        <h2 className="med-h2" style={{ textAlign: 'center' }}>
          Explore Current <span>Retreat Programs</span>
        </h2>

        <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/retreats/journeys/${service.slug}`}
              className="med-card-link"
            >
              <div className="med-card" style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span className="med-season-tag">Retreat</span>
                  <h3 className="med-h3" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{service.title}</h3>
                  {service.oneLineEssence && (
                    <p className="med-body" style={{ fontSize: '0.85rem', marginBottom: 0 }}>{service.oneLineEssence}</p>
                  )}
                </div>
                <span style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 600, marginTop: '1rem' }}>Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
