'use client';

import { locationSeasonalContent } from '@/content/retreats/location/seasonal';

interface Season {
  month: string;
  mood: string;
  description: string;
}

interface LocationSeasonalProps {
  title: string;
  seasons: readonly Season[];
}

export default function LocationSeasonal({ title, seasons }: LocationSeasonalProps) {
  const content = locationSeasonalContent;

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

      <style>{`
        .seasonal-inner {
          max-width: 52rem;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .seasonal-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .seasonal-eyebrow-line {
          width: 30px;
          height: 2px;
          background: #0f766e;
          flex-shrink: 0;
          border-radius: 2px;
        }
        .seasonal-eyebrow-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8B877C;
          font-weight: 500;
        }

        .seasonal-heading {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #2B2A26;
          line-height: 1.15;
          margin: 0 0 2.5rem;
        }

        .seasonal-timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
        }

        .seasonal-timeline::before {
          content: '';
          position: absolute;
          left: 0.65rem;
          top: 0.5rem;
          bottom: 0.5rem;
          width: 1px;
          background: linear-gradient(to bottom, #0f766e, rgba(15,118,110,0.05));
        }

        .seasonal-row {
          display: grid;
          grid-template-columns: 1.5rem 1fr;
          gap: 1.25rem;
          padding: 1.5rem 0;
          position: relative;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }
        .seasonal-row:last-child {
          border-bottom: none;
        }

        .seasonal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid #0f766e;
          background: #ffffff;
          margin-top: 0.2rem;
          flex-shrink: 0;
          transition: background 0.3s ease;
          position: relative;
          z-index: 1;
        }
        .seasonal-row:hover .seasonal-dot {
          background: #0f766e;
        }

        .seasonal-content {
          padding-bottom: 0.25rem;
        }

        .seasonal-month-row {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
          flex-wrap: wrap;
          margin-bottom: 0.4rem;
        }

        .seasonal-month {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #2B2A26;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .seasonal-mood {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
          color: #8B877C;
          font-style: italic;
        }

        .seasonal-desc {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          line-height: 1.8;
          color: rgba(43,42,38,0.55);
          margin: 0;
          font-weight: 300;
        }

        @media (max-width: 768px) {
          .seasonal-inner { padding: 0 1.5rem; }
          .seasonal-row { gap: 1rem; padding: 1.2rem 0; }
          .seasonal-month { font-size: 0.9rem; }
          .seasonal-desc { font-size: 0.82rem; }
        }

        @media (max-width: 480px) {
          .seasonal-inner { padding: 0 1.2rem; }
          .seasonal-row { gap: 0.75rem; padding: 1rem 0; }
          .seasonal-month { font-size: 0.85rem; }
          .seasonal-mood { font-size: 0.7rem; }
          .seasonal-desc { font-size: 0.78rem; }
          .seasonal-timeline::before { left: 0.5rem; }
          .seasonal-dot { width: 10px; height: 10px; }
        }
      `}</style>

      <div className="seasonal-inner">
        {/* Eyebrow */}
        <div className="seasonal-eyebrow">
          <span className="seasonal-eyebrow-line" />
          <span className="seasonal-eyebrow-text">{content.eyebrow}</span>
        </div>

        {/* Heading */}
        <h2 className="seasonal-heading">
          {title}
        </h2>

        {/* Timeline */}
        <div className="seasonal-timeline">
          {seasons.map((season, idx) => (
            <div key={idx} className="seasonal-row">
              <div className="seasonal-dot" />
              <div className="seasonal-content">
                <div className="seasonal-month-row">
                  <span className="seasonal-month">{season.month}</span>
                  <span className="seasonal-mood">— {season.mood}</span>
                </div>
                <p className="seasonal-desc">{season.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}