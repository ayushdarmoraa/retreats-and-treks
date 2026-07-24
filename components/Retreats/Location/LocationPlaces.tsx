'use client';

import Image from 'next/image';
import { locationPlacesContent } from '@/content/retreats/location/places';

interface Place {
  name: string;
  type: string;
  description: string;
  season?: string;
  img?: string;
}

interface LocationPlacesProps {
  locationName: string;
  places: readonly Place[];
}

export default function LocationPlaces({ locationName, places }: LocationPlacesProps) {
  const content = locationPlacesContent;

  if (places.length === 0) return null;

  return (
    <section style={{
      width: '100%',
      padding: '5rem 0',
      background: '#ffffff',
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
        .places-inner {
          max-width: 52rem;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .places-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .places-eyebrow-line {
          width: 30px;
          height: 2px;
          background: #0f766e;
          flex-shrink: 0;
          border-radius: 2px;
        }
        .places-eyebrow-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8B877C;
          font-weight: 500;
        }

        .places-heading {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #2B2A26;
          line-height: 1.15;
          margin: 0 0 0.75rem;
        }
        .places-heading .accent {
          color: #0f766e;
        }

        .places-sub {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          color: rgba(43,42,38,0.5);
          font-weight: 300;
          line-height: 1.7;
          margin: 0 0 2.5rem;
        }

        .places-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .places-card {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
        }
        .places-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.06);
          border-color: rgba(15,118,110,0.1);
        }

        .places-card-img {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: #f5f3ef;
        }
        .places-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .places-card:hover .places-card-img img {
          transform: scale(1.05);
        }
        .places-card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(26,24,20,0.3), transparent 50%);
        }

        .places-card-body {
          padding: 1.25rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .places-card-top {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }

        .places-card-name {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #2B2A26;
          margin: 0;
          letter-spacing: -0.01em;
          line-height: 1.25;
          transition: color 0.3s ease;
        }
        .places-card:hover .places-card-name {
          color: #0f766e;
        }

        .places-card-type {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.5rem;
          font-weight: 500;
          color: #0f766e;
          background: rgba(15,118,110,0.06);
          padding: 0.15rem 0.6rem;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .places-card-season {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.5rem;
          font-weight: 500;
          color: rgba(43,42,38,0.4);
          background: rgba(0,0,0,0.04);
          padding: 0.15rem 0.6rem;
          border-radius: 100px;
        }

        .places-card-desc {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.82rem;
          line-height: 1.7;
          color: rgba(43,42,38,0.55);
          margin: 0;
          font-weight: 300;
          flex: 1;
        }

        @media (max-width: 768px) {
          .places-inner { padding: 0 1.5rem; }
          .places-grid { grid-template-columns: 1fr; gap: 1rem; }
          .places-card-img { height: 180px; }
          .places-card-body { padding: 1rem 1.2rem 1.2rem; }
        }

        @media (max-width: 480px) {
          .places-inner { padding: 0 1.2rem; }
          .places-card-img { height: 160px; }
          .places-card-name { font-size: 0.9rem; }
          .places-card-desc { font-size: 0.78rem; }
        }
      `}</style>

      <div className="places-inner">
        {/* Eyebrow */}
        <div className="places-eyebrow">
          <span className="places-eyebrow-line" />
          <span className="places-eyebrow-text">{content.eyebrow}</span>
        </div>

        {/* Heading */}
        <h2 className="places-heading">
          {content.heading} <span className="accent">{locationName}</span>
        </h2>

        {/* Sub */}
        <p className="places-sub">
          {content.sub.replace('{location}', locationName)}
        </p>

        {/* Grid - 2 columns */}
        <div className="places-grid">
          {places.map((place, idx) => (
            <div key={idx} className="places-card">
              {place.img && (
                <div className="places-card-img">
                  <Image
                    src={place.img}
                    alt={place.name}
                    width={800}
                    height={600}
                    loading="lazy"
                    quality={60}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="places-card-img-overlay" />
                </div>
              )}
              <div className="places-card-body">
                <div className="places-card-top">
                  <h3 className="places-card-name">{place.name}</h3>
                  <span className="places-card-type">{place.type}</span>
                  {place.season && <span className="places-card-season">{place.season}</span>}
                </div>
                <p className="places-card-desc">{place.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}