'use client';

import { locationPracticalContent } from '@/content/retreats/location/practical';

interface PracticalData {
  title: string;
  bestSeasons: string;
  accessibility: string;
  crowdProfile: string;
  notFor: string;
}

interface LocationPracticalProps {
  data: PracticalData;
}

export default function LocationPractical({ data }: LocationPracticalProps) {
  const content = locationPracticalContent;

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

      <style>{`
        .practical-inner {
          max-width: 52rem;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .practical-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .practical-eyebrow-line {
          width: 30px;
          height: 2px;
          background: #0f766e;
          flex-shrink: 0;
          border-radius: 2px;
        }
        .practical-eyebrow-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8B877C;
          font-weight: 500;
        }

        .practical-heading {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #2B2A26;
          line-height: 1.15;
          margin: 0 0 2.5rem;
        }
        .practical-heading .accent {
          color: #0f766e;
        }

        .practical-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .practical-cell {
          background: #ffffff;
          padding: 2rem 2rem 2rem 2.25rem;
          position: relative;
          transition: background 0.3s ease;
        }
        .practical-cell:hover {
          background: #FAFAF8;
        }

        .practical-cell::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #0f766e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .practical-cell:hover::before {
          transform: scaleX(1);
        }

        .practical-label {
          display: inline-block;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #0f766e;
          background: rgba(15,118,110,0.06);
          padding: 0.15rem 0.6rem;
          border-radius: 100px;
          margin-bottom: 0.75rem;
        }

        .practical-cell-title {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #2B2A26;
          margin: 0 0 0.5rem;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }

        .practical-cell-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          line-height: 1.8;
          color: rgba(43,42,38,0.55);
          margin: 0;
          font-weight: 300;
        }

        @media (max-width: 600px) {
          .practical-grid {
            grid-template-columns: 1fr;
          }
          .practical-inner { padding: 0 1.5rem; }
          .practical-cell { padding: 1.5rem; }
        }

        @media (max-width: 480px) {
          .practical-inner { padding: 0 1.2rem; }
          .practical-cell { padding: 1.2rem; }
          .practical-cell-title { font-size: 0.9rem; }
          .practical-cell-text { font-size: 0.82rem; }
        }
      `}</style>

      <div className="practical-inner">
        {/* Eyebrow */}
        <div className="practical-eyebrow">
          <span className="practical-eyebrow-line" />
          <span className="practical-eyebrow-text">{content.eyebrow}</span>
        </div>

        {/* Heading */}
        <h2 className="practical-heading">
          {data.title}
        </h2>

        {/* Grid */}
        <div className="practical-grid">
          <div className="practical-cell">
            <span className="practical-label">Seasons</span>
            <h3 className="practical-cell-title">Best Seasons</h3>
            <p className="practical-cell-text">{data.bestSeasons}</p>
          </div>

          <div className="practical-cell">
            <span className="practical-label">Access</span>
            <h3 className="practical-cell-title">Accessibility</h3>
            <p className="practical-cell-text">{data.accessibility}</p>
          </div>

          <div className="practical-cell">
            <span className="practical-label">Crowd</span>
            <h3 className="practical-cell-title">Crowd Profile</h3>
            <p className="practical-cell-text">{data.crowdProfile}</p>
          </div>

          <div className="practical-cell">
            <span className="practical-label">Not For</span>
            <h3 className="practical-cell-title">Not Ideal For</h3>
            <p className="practical-cell-text">{data.notFor}</p>
          </div>
        </div>
      </div>
    </section>
  );
}