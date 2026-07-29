'use client';

import { CardImage } from '@/components/images';
import { images } from '@/lib/images';
import { SectionHeading, Section, Card, CardDivider, ArrowLink } from '@/components/ui';
import { defaultLocations, type Location } from '@/content/home/featuredLocations';

// ── Type Definitions ──
interface FeaturedLocationsProps {
  locations?: Location[];
}

interface LocationImage {
  src: string;
  alt: string;
}

const FeaturedLocations = ({ locations }: FeaturedLocationsProps) => {
  const locImages: Record<string, LocationImage> = {
    'chakrata': images.locations.chakrata,
    'sankri': images.locations.sankri,
    'munsiyari': images.locations.munsiyari,
    'mussoorie': images.locations.mussoorie,
    'rishikesh': images.locations.rishikesh,
    'zanskar': images.locations.zanskar,
    'joshimath': images.locations.joshimath,
    'lohajung': images.locations.lohajung,
  };

  // Use locations if available, else use default
  const data = locations && locations.length > 0 ? locations : defaultLocations;
  const displayLocations: Location[] = data.slice(0, 6);

  return (
    <Section className="featured-locations" style={{ background: '#ffffff', padding: '7rem 0' }}>
      <style>{`
        .featured-locations::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 20% 80%, rgba(15, 118, 110, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(139, 115, 85, 0.02) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .featured-locations-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
          position: relative;
          z-index: 1;
        }

        /* Premium Grid */
        .featured-locations-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          animation: fadeUp 0.9s ease 0.3s both;
        }

        /* Image */
        .loc-card-img-wrap {
          position: relative;
          overflow: hidden;
          height: 240px;
          background: #f5f3ef;
        }

        .loc-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ui-card:hover .loc-card-img {
          transform: scale(1.04);
        }

        .loc-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(26, 24, 20, 0.6) 0%,
            rgba(26, 24, 20, 0.1) 45%,
            transparent 100%
          );
          opacity: 0.8;
          transition: opacity 0.5s ease;
        }
        .ui-card:hover .loc-card-overlay {
          opacity: 0.5;
        }

        .loc-card-img-name {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.3rem;
          font-weight: 500;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.2;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        }

        .loc-card-img-name small {
          display: block;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.2rem;
          text-shadow: none;
        }

        /* ── BODY - PADDING KAM ── */
        .loc-card-body {
          padding: 1.2rem 1.5rem 1.5rem;
          position: relative;
        }

        .loc-card-name {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: #1a1814;
          margin: 0 0 0.2rem;
          letter-spacing: -0.02em;
          line-height: 1.25;
          transition: color 0.4s ease;
        }
        .ui-card:hover .loc-card-name {
          color: #0f766e;
        }

        .loc-card-tagline {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.8rem;
          line-height: 1.6;
          color: #6b7280;
          margin: 0 0 0.8rem;
          font-weight: 300;
          letter-spacing: 0.005em;
          transition: color 0.4s ease;
        }
        .ui-card:hover .loc-card-tagline {
          color: #4b5563;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .featured-locations-grid {
            gap: 1.5rem;
          }
        }

        @media (max-width: 1024px) {
          .featured-locations-container {
            padding: 0 3rem;
          }
          .featured-locations-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
          .loc-card-img-wrap {
            height: 200px;
          }
          .loc-card-img-name {
            font-size: 1.1rem;
            bottom: 1.2rem;
            left: 1.2rem;
            right: 1.2rem;
          }
          .loc-card-body {
            padding: 1rem 1.2rem 1.2rem;
          }
        }

        @media (max-width: 900px) {
          .featured-locations {
            padding: 5rem 0 !important;
          }
          .featured-locations-container {
            padding: 0 2rem;
          }
          .featured-locations-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          .loc-card-img-wrap {
            height: 200px;
          }
          .loc-card-img-name {
            font-size: 1rem;
          }
          .loc-card-body {
            padding: 0.8rem 1rem 1.2rem;
          }
        }

        @media (max-width: 600px) {
          .featured-locations {
            padding: 4rem 0 !important;
          }
          .featured-locations-container {
            padding: 0 1.5rem;
          }
          .featured-locations-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
          .loc-card-img-wrap {
            height: 160px;
          }
          .loc-card-img-name {
            font-size: 0.9rem;
            bottom: 0.8rem;
            left: 0.8rem;
            right: 0.8rem;
          }
          .loc-card-img-name small {
            font-size: 0.55rem;
          }
          .loc-card-body {
            padding: 0.6rem 0.8rem 1rem;
          }
          .loc-card-name {
            font-size: 0.9rem;
          }
          .loc-card-tagline {
            font-size: 0.72rem;
            line-height: 1.5;
            margin-bottom: 0.6rem;
          }
        }

        @media (max-width: 480px) {
          .featured-locations-container {
            padding: 0 1.2rem;
          }
          .featured-locations-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .loc-card-img-wrap {
            height: 200px;
          }
          .loc-card-img-name {
            font-size: 1.1rem;
            bottom: 1rem;
            left: 1rem;
            right: 1rem;
          }
          .loc-card-body {
            padding: 0.8rem 1rem 1.2rem;
          }
          .loc-card-name {
            font-size: 1rem;
          }
          .loc-card-tagline {
            font-size: 0.8rem;
          }
        }
      `}</style>

      <div className="featured-locations-container">
        <SectionHeading
          eyebrow="Our Locations"
          title="The Landscapes We Work With"
        />

        <div className="featured-locations-grid">
          {displayLocations.map((location) => {
            const imgData = locImages[location.id] ?? { 
              src: '/Images/location/chakrata.webp', 
              alt: location.name 
            };
            
            return (
              <Card key={location.id} href={`/retreats/${location.id}`}>
                <div className="loc-card-img-wrap">
                  <CardImage image={imgData} className="loc-card-img" />
                  <div className="loc-card-overlay" />
                  <div className="loc-card-img-name">
                    {location.name}
                    <small>Explore →</small>
                  </div>
                </div>
                <div className="loc-card-body">
                  <CardDivider />
                  <h3 className="loc-card-name">{location.name}</h3>
                  <p className="loc-card-tagline">{location.tagline}</p>
                  <ArrowLink>Discover</ArrowLink>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default FeaturedLocations;
