'use client';

import { locationSoftExperiencesContent } from '@/content/retreats/location/softExperiences';

interface SoftExperience {
  name: string;
  description: string;
}

interface LocationSoftExperiencesProps {
  experiences: readonly SoftExperience[];
}

export default function LocationSoftExperiences({ experiences }: LocationSoftExperiencesProps) {
  const content = locationSoftExperiencesContent;

  if (experiences.length === 0) return null;

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
        .soft-inner {
          max-width: 52rem;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .soft-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .soft-eyebrow-line {
          width: 30px;
          height: 2px;
          background: #0f766e;
          flex-shrink: 0;
          border-radius: 2px;
        }
        .soft-eyebrow-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8B877C;
          font-weight: 500;
        }

        .soft-heading {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #2B2A26;
          line-height: 1.15;
          margin: 0 0 0.75rem;
        }
        .soft-heading .accent {
          color: #0f766e;
        }

        .soft-sub {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          color: rgba(43,42,38,0.5);
          font-weight: 300;
          line-height: 1.7;
          margin: 0 0 2.5rem;
        }

        .soft-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .soft-card {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.04);
          border-left: 3px solid #0f766e;
          border-radius: 12px;
          padding: 1.5rem 1.5rem 1.5rem 1.25rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }
        .soft-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.06);
          border-color: rgba(15,118,110,0.1);
          border-left-color: #2B2A26;
        }

        .soft-card-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0f766e;
          display: inline-block;
          margin-bottom: 0.75rem;
          opacity: 0.4;
          transition: opacity 0.3s ease;
        }
        .soft-card:hover .soft-card-dot {
          opacity: 1;
        }

        .soft-card-name {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #2B2A26;
          margin: 0 0 0.5rem;
          letter-spacing: -0.01em;
          line-height: 1.3;
          transition: color 0.3s ease;
        }
        .soft-card:hover .soft-card-name {
          color: #0f766e;
        }

        .soft-card-desc {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          line-height: 1.7;
          color: rgba(43,42,38,0.55);
          margin: 0;
          font-weight: 300;
        }

        @media (max-width: 768px) {
          .soft-inner { padding: 0 1.5rem; }
          .soft-grid { grid-template-columns: 1fr; gap: 1rem; }
          .soft-card { padding: 1.2rem 1.2rem 1.2rem 1rem; }
        }

        @media (max-width: 480px) {
          .soft-inner { padding: 0 1.2rem; }
          .soft-card-name { font-size: 0.9rem; }
          .soft-card-desc { font-size: 0.82rem; }
        }
      `}</style>

      <div className="soft-inner">
        {/* Eyebrow */}
        <div className="soft-eyebrow">
          <span className="soft-eyebrow-line" />
          <span className="soft-eyebrow-text">{content.eyebrow}</span>
        </div>

        {/* Heading */}
        <h2 className="soft-heading">{content.heading}</h2>

        {/* Sub */}
        <p className="soft-sub">{content.sub}</p>

        {/* Grid - 2 columns */}
        <div className="soft-grid">
          {experiences.map((exp, idx) => (
            <div key={idx} className="soft-card">
              <span className="soft-card-dot" />
              <h3 className="soft-card-name">{exp.name}</h3>
              <p className="soft-card-desc">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
