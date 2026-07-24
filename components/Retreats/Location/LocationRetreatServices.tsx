'use client';

import Link from 'next/link';
import { locationRetreatServicesContent } from '@/content/retreats/location/retreatServices';
import { logWhatsAppOpen } from '@/lib/analytics';

interface RetreatService {
  slug: string;
  title: string;
  oneLineEssence: string;
}

interface LocationRetreatServicesProps {
  locationName: string;
  services: RetreatService[];
  locationId: string;
}

export default function LocationRetreatServices({
  locationName,
  services,
  locationId,
}: LocationRetreatServicesProps) {
  const content = locationRetreatServicesContent;

  if (services.length === 0) return null;

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
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15,118,110,0.04), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <style>{`
        .services-inner {
          max-width: 52rem;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .services-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .services-eyebrow-line {
          width: 30px;
          height: 2px;
          background: #0f766e;
          flex-shrink: 0;
          border-radius: 2px;
        }
        .services-eyebrow-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8B877C;
          font-weight: 500;
        }

        .services-heading {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #2B2A26;
          line-height: 1.15;
          margin: 0 0 0.75rem;
        }
        .services-heading .accent {
          color: #0f766e;
        }

        .services-sub {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          color: rgba(43,42,38,0.5);
          font-weight: 300;
          line-height: 1.7;
          margin: 0 0 2.5rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        .services-card {
          display: block;
          text-decoration: none;
          color: #2B2A26;
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
        .services-card::before {
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
        .services-card:hover::before { transform: scaleX(1); }
        .services-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.06);
          border-color: rgba(15,118,110,0.12);
        }

        .services-card-idx {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #0f766e;
          margin-bottom: 0.85rem;
          opacity: 0.2;
          transition: opacity 0.3s ease;
        }
        .services-card:hover .services-card-idx {
          opacity: 0.6;
        }

        .services-card-title {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 1rem;
          font-weight: 600;
          color: #2B2A26;
          margin: 0 0 0.45rem;
          letter-spacing: -0.01em;
          line-height: 1.25;
          transition: color 0.3s ease;
        }
        .services-card-title a {
          color: inherit;
          text-decoration: none;
        }
        .services-card:hover .services-card-title {
          color: #0f766e;
        }

        .services-card-essence {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          color: rgba(43,42,38,0.55);
          margin: 0 0 1.1rem;
          line-height: 1.7;
          font-weight: 300;
          flex: 1;
        }

        .services-card-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .services-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          color: #2B2A26;
          transition: gap 0.3s ease, color 0.3s ease;
          text-decoration: none;
        }
        .services-card:hover .services-cta { 
          gap: 0.6rem; 
          color: #0f766e;
        }

        .services-cta-arrow {
          transition: transform 0.3s ease;
          display: inline-block;
        }
        .services-card:hover .services-cta-arrow {
          transform: translateX(4px);
        }

        .services-cta-ghost {
          background: transparent;
          color: #2B2A26;
          padding: 0.4rem 1rem;
          border: 1px solid rgba(15,118,110,0.15);
          border-radius: 6px;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .services-cta-ghost:hover {
          background: #0f766e;
          color: #ffffff;
          border-color: #0f766e;
        }

        @media (max-width: 768px) {
          .services-inner { padding: 0 1.5rem; }
          .services-card { padding: 1.5rem; }
          .services-card-title { font-size: 0.95rem; }
        }

        @media (max-width: 480px) {
          .services-inner { padding: 0 1.2rem; }
          .services-card { padding: 1.2rem; }
          .services-card-title { font-size: 0.9rem; }
          .services-card-essence { font-size: 0.8rem; }
          .services-card-actions { flex-direction: column; align-items: stretch; }
          .services-cta-ghost { text-align: center; }
        }
      `}</style>

      <div className="services-inner">
        {/* Eyebrow */}
        <div className="services-eyebrow">
          <span className="services-eyebrow-line" />
          <span className="services-eyebrow-text">{content.eyebrow}</span>
        </div>

        {/* Heading */}
        <h2 className="services-heading">
          {content.heading} <span className="accent">Services</span>
        </h2>

        {/* Sub */}
        <p className="services-sub">
          {content.sub.replace('{location}', locationName)}
        </p>

        {/* Grid */}
        <div className="services-grid">
          {services.map((service, i) => {
            const whatsappLink = `https://wa.me/919760446101?text=${encodeURIComponent(
              `Hi, I'm interested in the ${service.title} in ${locationName}. Can you share dates and pricing?`
            )}`;

            return (
              <div key={service.slug} className="services-card">
                <div className="services-card-idx">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="services-card-title">
                  <Link href={`/retreats/journeys/${service.slug}`}>
                    {service.title}
                  </Link>
                </h3>
                <p className="services-card-essence">{service.oneLineEssence}</p>
                <div className="services-card-actions">
                  <Link href={`/retreats/journeys/${service.slug}`} className="services-cta">
                    Learn more <span className="services-cta-arrow">→</span>
                  </Link>
                  <a
                    href={whatsappLink}
                    onClick={() => logWhatsAppOpen(locationId, `service-enquire-${service.slug}`)}
                    className="services-cta-ghost"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enquire
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}