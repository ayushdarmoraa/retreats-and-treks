'use client';

import Link from 'next/link';
import { locationBeyondRetreatContent } from '@/content/retreats/location/beyondRetreat';

interface Experience {
  name: string;
  duration: string;
  description: string;
  bestTime?: string;
  difficulty?: string;
  distance?: string;
}

interface LocationBeyondRetreatProps {
  locationName: string;
  experiences: readonly Experience[];
  type?: 'experiences' | 'treks';
}

export default function LocationBeyondRetreat({
  locationName,
  experiences,
  type = 'experiences',
}: LocationBeyondRetreatProps) {
  const content = locationBeyondRetreatContent;

  if (!experiences || experiences.length === 0) return null;

  const isTreks = type === 'treks';

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
        .beyond-inner {
          max-width: 52rem;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .beyond-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .beyond-eyebrow-line {
          width: 30px;
          height: 2px;
          background: #0f766e;
          flex-shrink: 0;
          border-radius: 2px;
        }
        .beyond-eyebrow-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8B877C;
          font-weight: 500;
        }

        .beyond-heading {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #2B2A26;
          line-height: 1.15;
          margin: 0 0 0.75rem;
        }
        .beyond-heading .accent {
          color: #0f766e;
        }

        .beyond-sub {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          color: rgba(43,42,38,0.5);
          font-weight: 300;
          line-height: 1.7;
          margin: 0 0 2.5rem;
        }

        .beyond-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .beyond-card {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: 16px;
          padding: 1.75rem 1.5rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
        }
        .beyond-card::before {
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
        .beyond-card:hover::before {
          transform: scaleX(1);
        }
        .beyond-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.06);
          border-color: rgba(15,118,110,0.1);
        }

        .beyond-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .beyond-card-name {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 1rem;
          font-weight: 600;
          color: #2B2A26;
          margin: 0;
          letter-spacing: -0.01em;
          line-height: 1.25;
          transition: color 0.3s ease;
        }
        .beyond-card:hover .beyond-card-name {
          color: #0f766e;
        }

        .beyond-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.55rem;
          font-weight: 500;
          color: #0f766e;
          background: rgba(15,118,110,0.06);
          padding: 0.15rem 0.6rem;
          border-radius: 100px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .beyond-card-desc {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          line-height: 1.7;
          color: rgba(43,42,38,0.55);
          margin: 0 0 1rem;
          font-weight: 300;
          flex: 1;
        }

        .beyond-card-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(0,0,0,0.04);
        }

        .beyond-card-meta-item {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.6rem;
          color: rgba(43,42,38,0.4);
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(15,118,110,0.04);
          padding: 0.15rem 0.5rem;
          border-radius: 100px;
        }
        .beyond-card-meta-item span {
          opacity: 0.5;
        }

        .beyond-card-season {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.6rem;
          color: rgba(43,42,38,0.4);
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .beyond-card-season strong {
          color: #2B2A26;
          font-weight: 500;
        }

        .beyond-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          margin-top: 0.75rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          color: #2B2A26;
          text-decoration: none;
          transition: gap 0.3s ease, color 0.3s ease;
        }
        .beyond-card:hover .beyond-card-cta {
          gap: 0.6rem;
          color: #0f766e;
        }
        .beyond-card-cta-arrow {
          transition: transform 0.3s ease;
          display: inline-block;
        }
        .beyond-card:hover .beyond-card-cta-arrow {
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .beyond-inner { padding: 0 1.5rem; }
          .beyond-grid { grid-template-columns: 1fr; gap: 1rem; }
          .beyond-card { padding: 1.5rem; }
          .beyond-card-name { font-size: 0.95rem; }
        }

        @media (max-width: 480px) {
          .beyond-inner { padding: 0 1.2rem; }
          .beyond-card { padding: 1.2rem; }
          .beyond-card-name { font-size: 0.9rem; }
          .beyond-card-desc { font-size: 0.82rem; }
        }
      `}</style>

      <div className="beyond-inner">
        {/* Eyebrow */}
        <div className="beyond-eyebrow">
          <span className="beyond-eyebrow-line" />
          <span className="beyond-eyebrow-text">
            {isTreks ? 'Trekking Routes' : content.eyebrow}
          </span>
        </div>

        {/* Heading */}
        <h2 className="beyond-heading">
          {isTreks ? 'Treks from' : 'Experiences'} <span className="accent">{locationName}</span>
        </h2>

        {/* Sub */}
        <p className="beyond-sub">
          {isTreks
            ? 'Summit routes and mountain journeys. Choose by difficulty, duration, and season:'
            : content.sub.replace('{location}', locationName)
          }
        </p>

        {/* Grid */}
        <div className="beyond-grid">
          {experiences.map((exp, idx) => (
            <div key={idx} className="beyond-card">
              <div className="beyond-card-top">
                <h3 className="beyond-card-name">{exp.name}</h3>
                <span className="beyond-card-badge">{exp.duration}</span>
              </div>

              <p className="beyond-card-desc">{exp.description}</p>

              <div className="beyond-card-meta">
                {exp.difficulty && (
                  <span className="beyond-card-meta-item">
                    <span>⚡</span> {exp.difficulty}
                  </span>
                )}
                {exp.distance && (
                  <span className="beyond-card-meta-item">
                    <span>📏</span> {exp.distance}
                  </span>
                )}
              </div>

              {exp.bestTime && (
                <div className="beyond-card-season">
                  <strong>Best season:</strong> {exp.bestTime}
                </div>
              )}

              {isTreks && (
                <div className="beyond-card-cta">
                  View {exp.name} details <span className="beyond-card-cta-arrow">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}