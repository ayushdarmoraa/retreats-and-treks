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
    <section style={{ marginTop: 'var(--space-xl)' }}>
      <style>{`
        .arp-wrap {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          background: #ffffff;
          padding: 5rem 0;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
          position: relative;
          overflow: hidden;
        }
        .arp-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(15,118,110,0.05) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .arp-inner {
          max-width: 64rem;
          margin: 0 auto;
          padding: 0 var(--space-md, 1.5rem);
          position: relative;
          z-index: 1;
        }
        .arp-eyebrow {
          display: flex; align-items: center;
          gap: 0.75rem; margin-bottom: 1.25rem;
        }
        .arp-eyebrow-line {
          width: 24px; height: 1px;
          background: var(--color-primary); opacity: 0.5;
          flex-shrink: 0; display: inline-block;
        }
        .arp-eyebrow-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.56rem; font-weight: 500;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--color-primary); opacity: 0.7;
        }
        .arp-h2 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 200; letter-spacing: -0.03em;
          color: #111111; line-height: 1.15;
          margin: 0 0 2.5rem;
        }
        .arp-h2 span { color: var(--color-primary); }

        /* Grid */
        .arp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
          list-style: none;
          padding: 0; margin: 0;
        }

        .arp-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #ffffff;
          border: 1px solid #eef0ee;
          border-radius: 8px;
          padding: 1.5rem 1.75rem 1.6rem;
          text-decoration: none;
          color: inherit;
          position: relative;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
          transition: transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94),
                      box-shadow 0.3s, border-color 0.3s;
        }
        .arp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: var(--color-primary);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .arp-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.09);
          border-color: rgba(15,118,110,0.25);
        }
        .arp-card:hover::before { transform: scaleX(1); }

        .arp-card-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.95rem; font-weight: 500;
          color: #111111;
          margin: 0 0 0.5rem;
          letter-spacing: -0.01em; line-height: 1.35;
          transition: color 0.2s;
        }
        .arp-card:hover .arp-card-title { color: var(--color-primary); }

        .arp-card-essence {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.82rem; font-weight: 300;
          line-height: 1.7; color: #888888;
          margin: 0 0 1.25rem; flex: 1;
        }

        .arp-card-cta {
          display: inline-flex; align-items: center; gap: 0.35rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--color-primary);
          transition: gap 0.22s;
        }
        .arp-card:hover .arp-card-cta { gap: 0.6rem; }
      `}</style>

      <div className="arp-wrap">
        <div className="arp-inner">

          <div className="arp-eyebrow">
            <span className="arp-eyebrow-line" />
            <span className="arp-eyebrow-text">All Programs</span>
          </div>

          <h2 className="arp-h2">
            Explore Current Retreat Programs
          </h2>

          <ul className="arp-grid">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/retreats/journeys/${service.slug}`}
                  className="arp-card"
                >
                  <div>
                    <h3 className="arp-card-title">{service.title}</h3>
                    {service.oneLineEssence && (
                      <p className="arp-card-essence">{service.oneLineEssence}</p>
                    )}
                  </div>
                  <span className="arp-card-cta">Explore →</span>
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}