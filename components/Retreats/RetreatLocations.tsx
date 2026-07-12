// components/retreats/RetreatLocations.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { LocationId } from '@/config/locations';

interface Location {
  id: LocationId;
  name: string;
  tagline: string;
  supportsRetreats: boolean;
  supportsTreks: boolean;
  active: boolean;
  priority: number;
}

interface RetreatLocationsProps {
  locations?: Location[];
}

// ── FALLBACK LOCATIONS - ORIGINAL 6 ──
const fallbackLocations: Location[] = [
  {
    id: 'chakrata',
    name: 'Chakrata',
    tagline: 'A quiet Himalayan hill town, easily accessible from Dehradun.',
    supportsRetreats: true,
    supportsTreks: true,
    active: true,
    priority: 1,
  },
  {
    id: 'sankri',
    name: 'Sankri',
    tagline: 'Remote Himalayan basecamp for classic multi-day treks.',
    supportsRetreats: true,
    supportsTreks: true,
    active: true,
    priority: 2,
  },
  {
    id: 'mussoorie',
    name: 'Mussoorie',
    tagline: 'A soft, accessible Himalayan retreat—romance and quiet in the clouds.',
    supportsRetreats: true,
    supportsTreks: true,
    active: true,
    priority: 3,
  },
  {
    id: 'munsiyari',
    name: 'Munsiyari',
    tagline: 'High-altitude alpine meadows for transformation and embodied presence.',
    supportsRetreats: true,
    supportsTreks: true,
    active: true,
    priority: 4,
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    tagline: 'Yoga capital and spiritual gateway—traditions alive on the Ganges.',
    supportsRetreats: true,
    supportsTreks: false,
    active: true,
    priority: 5,
  },
  {
    id: 'zanskar',
    name: 'Zanskar',
    tagline: 'A high-altitude river valley in Ladakh — raw remoteness, ancient monasteries, and transformative silence.',
    supportsRetreats: true,
    supportsTreks: true,
    active: true,
    priority: 6,
  },
];

export default function RetreatLocations({ locations = [] }: RetreatLocationsProps) {
  const displayLocations = locations && locations.length > 0 ? locations : fallbackLocations;

  const locationImages: Record<string, { src: string; alt: string }> = {
    'chakrata': { src: '/Images/location/chakrata.webp', alt: 'Chakrata — deodar forest ridge in Uttarakhand' },
    'sankri': { src: '/Images/location/sankri.webp', alt: 'Sankri — pine valley at the edge of Govind Wildlife Sanctuary' },
    'mussoorie': { src: '/Images/location/mussoorie.webp', alt: 'Mussoorie — Queen of Hills in the Garhwal foothills' },
    'munsiyari': { src: '/Images/location/munsiyari.webp', alt: 'Munsiyari — Panchachuli massif views from Kumaon Himalaya' },
    'rishikesh': { src: '/Images/location/rishikesh.webp', alt: 'Rishikesh — Ganges riverside yoga and retreat destination' },
    'zanskar': { src: '/Images/location/zanskar.webp', alt: 'Zanskar — remote high-altitude valley in Ladakh' },
  };

  return (
    <section className="locations-section" style={{
      paddingTop: '7rem',
      paddingBottom: '7rem',
      background: '#ffffff',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
    }}>
      <style>{`
        .locations-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
        }

        .locations-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .locations-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }
        .locations-badge-line {
          width: 36px;
          height: 1px;
          background: #0f766e;
          opacity: 0.3;
        }
        .locations-badge-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #6b7280;
          font-weight: 500;
        }

        .locations-headline {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #1a1814;
          margin: 0;
          line-height: 1.1;
        }
        .locations-headline .accent {
          color: #0f766e;
          font-weight: 200;
        }

        .locations-sub {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          color: #6b7280;
          font-weight: 300;
          max-width: 46rem;
          margin: 0.75rem auto 0;
          line-height: 1.8;
        }

        .locations-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .loc-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          border-radius: 24px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.04);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          height: 100%;
        }

        .loc-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 25px;
          padding: 1.5px;
          background: linear-gradient(135deg, 
            rgba(15, 118, 110, 0.12), 
            rgba(15, 118, 110, 0.02) 40%, 
            rgba(15, 118, 110, 0.02) 60%, 
            rgba(139, 115, 85, 0.05)
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }
        .loc-card:hover::before { opacity: 1; }

        .loc-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06), 0 24px 80px -20px rgba(15, 118, 110, 0.06);
          border-color: rgba(15, 118, 110, 0.06);
        }

        .loc-img-wrap {
          position: relative;
          overflow: hidden;
          height: 200px;
          background: #f5f3ef;
          flex-shrink: 0;
        }

        .loc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .loc-card:hover .loc-img { transform: scale(1.05); }

        .loc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(26, 24, 20, 0.5), transparent 60%);
          opacity: 0.6;
          transition: opacity 0.5s ease;
        }
        .loc-card:hover .loc-overlay { opacity: 0.3; }

        .loc-img-name {
          position: absolute;
          bottom: 1.2rem;
          left: 1.2rem;
          right: 1.2rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.1rem;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
        }

        .loc-body {
          padding: 1.5rem 1.8rem 1.8rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .loc-line {
          width: 28px;
          height: 2px;
          background: #0f766e;
          opacity: 0.06;
          margin-bottom: 0.8rem;
          border-radius: 4px;
          transition: all 0.5s ease;
          flex-shrink: 0;
        }
        .loc-card:hover .loc-line {
          opacity: 0.15;
          width: 42px;
        }

        .loc-name {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: #1a1814;
          margin: 0 0 0.3rem;
          transition: color 0.4s ease;
          flex-shrink: 0;
        }
        .loc-card:hover .loc-name { color: #0f766e; }

        .loc-tagline {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.85rem;
          color: #6b7280;
          margin: 0 0 1rem;
          line-height: 1.7;
          font-weight: 300;
          flex: 1;
        }

        .loc-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0f766e;
          transition: all 0.3s ease;
          border-bottom: 2px solid rgba(15, 118, 110, 0.08);
          padding-bottom: 0.2rem;
          width: fit-content;
          flex-shrink: 0;
          margin-top: auto;
        }
        .loc-card:hover .loc-cta {
          gap: 0.8rem;
          border-bottom-color: rgba(15, 118, 110, 0.25);
        }
        .loc-arrow {
          transition: transform 0.3s ease;
          display: inline-block;
        }
        .loc-card:hover .loc-arrow {
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .locations-container { padding: 0 3rem; }
          .locations-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
          .loc-img-wrap { height: 180px; }
        }

        @media (max-width: 900px) {
          .locations-container { padding: 0 2rem; }
          .locations-headline { font-size: clamp(2.2rem, 7vw, 3.2rem); }
        }

        @media (max-width: 640px) {
          .locations-section { padding: 5rem 0; }
          .locations-container { padding: 0 1.5rem; }
          .locations-grid { grid-template-columns: 1fr; gap: 1.2rem; }
          .loc-img-wrap { height: 200px; }
          .loc-body { padding: 1.2rem 1.5rem 1.5rem; }
          .loc-name { font-size: 0.95rem; }
          .loc-tagline { font-size: 0.82rem; }
          .locations-headline { font-size: clamp(2rem, 8vw, 2.8rem); }
          .locations-badge-text { font-size: 0.6rem; }
        }

        @media (max-width: 480px) {
          .locations-container { padding: 0 1.2rem; }
          .loc-img-wrap { height: 180px; }
          .loc-body { padding: 1rem 1.2rem 1.2rem; }
          .loc-name { font-size: 0.9rem; }
          .loc-tagline { font-size: 0.78rem; }
          .locations-headline { font-size: clamp(1.8rem, 7vw, 2.5rem); }
          .loc-img-name { font-size: 1rem; }
          .loc-cta { font-size: 0.6rem; }
        }
      `}</style>

      <div className="locations-container">
        {/* Header */}
        <div className="locations-header">
          <div className="locations-badge">
            <span className="locations-badge-line" />
            <span className="locations-badge-text">Mountain settings</span>
            <span className="locations-badge-line" />
          </div>
          <h2 className="locations-headline">
            Quiet Himalayan Places{' '}
            <span className="accent">for Deep Retreat Work</span>
          </h2>
          <p className="locations-sub">
            Each location offers a different kind of stillness — forest ridges, river valleys, alpine meadows, or remote high-altitude silence.
          </p>
        </div>

        {/* Grid */}
        <div className="locations-grid">
          {displayLocations.map((location) => {
            const imgData = locationImages[location.id] ?? {
              src: '/Images/location/chakrata.webp',
              alt: location.name,
            };

            return (
              <Link
                key={location.id}
                href={`/retreats/${location.id}`}
                className="loc-card"
              >
                <div className="loc-img-wrap">
                  <Image
                    src={imgData.src}
                    alt={imgData.alt}
                    className="loc-img"
                    width={400}
                    height={210}
                    quality={75}
                  />
                  <div className="loc-overlay" />
                  <span className="loc-img-name">{location.name}</span>
                </div>
                <div className="loc-body">
                  <div className="loc-line" />
                  <h3 className="loc-name">{location.name}</h3>
                  <p className="loc-tagline">{location.tagline}</p>
                  <div className="loc-cta">
                    Explore <span className="loc-arrow">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}