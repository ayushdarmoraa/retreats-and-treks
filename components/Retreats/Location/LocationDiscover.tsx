'use client';

import Link from 'next/link';
import { locationDiscoverContent } from '@/content/retreats/location/discover';

interface LocationData {
  id: string;
  name: string;
  opening: string;
}

interface LocationDiscoverProps {
  currentLocationId: string;
  locations: LocationData[];
}

export default function LocationDiscover({
  currentLocationId,
  locations,
}: LocationDiscoverProps) {
  const content = locationDiscoverContent;

  const otherLocations = locations.filter(loc => loc.id !== currentLocationId);

  if (otherLocations.length === 0) return null;

  return (
    <section style={{
      width: '100%',
      padding: '5rem 0',
      background: '#f7f9f7',
      borderBottom: '1px solid rgba(0,0,0,0.04)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative glow */}
      <div style={{
        position: 'absolute',
        top: '-80px',
        right: '-60px',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15,118,110,0.04), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-60px',
        left: '-40px',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15,118,110,0.03), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <style>{`
        .discover-inner {
          max-width: 52rem;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .discover-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .discover-eyebrow-line {
          width: 30px;
          height: 2px;
          background: #0f766e;
          flex-shrink: 0;
          border-radius: 2px;
        }
        .discover-eyebrow-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8B877C;
          font-weight: 500;
        }

        .discover-heading {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #2B2A26;
          line-height: 1.15;
          margin: 0 0 0.75rem;
        }
        .discover-heading .accent {
          color: #0f766e;
        }

        .discover-sub {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          color: rgba(43,42,38,0.5);
          font-weight: 300;
          line-height: 1.7;
          margin: 0 0 2.5rem;
        }

        .discover-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .discover-card {
          display: block;
          text-decoration: none;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: 16px;
          padding: 1.75rem 1.6rem 1.6rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .discover-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #0f766e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .discover-card:hover::before {
          transform: scaleX(1);
        }
        .discover-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.06);
          border-color: rgba(15,118,110,0.1);
        }

        .discover-card-name {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 1rem;
          font-weight: 600;
          color: #2B2A26;
          margin: 0 0 0.6rem;
          letter-spacing: -0.01em;
          line-height: 1.25;
          transition: color 0.3s ease;
        }
        .discover-card:hover .discover-card-name {
          color: #0f766e;
        }

        .discover-card-opening {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          line-height: 1.7;
          color: rgba(43,42,38,0.55);
          margin: 0 0 1.1rem;
          font-weight: 300;
          flex: 1;
        }

        .discover-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          color: #2B2A26;
          transition: gap 0.3s ease, color 0.3s ease;
        }
        .discover-card:hover .discover-cta {
          gap: 0.6rem;
          color: #0f766e;
        }
        .discover-cta-arrow {
          transition: transform 0.3s ease;
          display: inline-block;
        }
        .discover-card:hover .discover-cta-arrow {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .discover-inner { padding: 0 1.5rem; }
          .discover-grid { grid-template-columns: 1fr; gap: 1rem; }
          .discover-card { padding: 1.5rem; }
          .discover-card-name { font-size: 0.95rem; }
        }

        @media (max-width: 480px) {
          .discover-inner { padding: 0 1.2rem; }
          .discover-card { padding: 1.2rem; }
          .discover-card-name { font-size: 0.9rem; }
          .discover-card-opening { font-size: 0.82rem; }
        }
      `}</style>

      <div className="discover-inner">
        {/* Eyebrow */}
        <div className="discover-eyebrow">
          <span className="discover-eyebrow-line" />
          <span className="discover-eyebrow-text">{content.eyebrow}</span>
        </div>

        {/* Heading */}
        <h2 className="discover-heading">
          {content.heading}
        </h2>

        {/* Sub */}
        <p className="discover-sub">{content.sub}</p>

        {/* Grid */}
        <div className="discover-grid">
          {otherLocations.map((loc) => (
            <Link key={loc.id} href={`/retreats/${loc.id}`} className="discover-card">
              <h3 className="discover-card-name">{loc.name}</h3>
              <p className="discover-card-opening">{loc.opening}</p>
              <div className="discover-cta">
                Discover {loc.name} <span className="discover-cta-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
