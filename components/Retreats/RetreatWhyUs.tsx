// components/retreats/RetreatWhyUs.tsx
'use client';

interface RetreatWhyUsProps {
  whyUsPoints?: string[];
}

// ── FALLBACK DATA ──
const fallbackPoints = [
  'Small-group or private only — never large commercial groups',
  'Quiet, non-commercial locations selected for depth',
  'Flexible schedules — we design around your life',
  'Nature-first environments — mountains, forests, silence',
  'Deep rest prioritized — never rushed itineraries',
  'Retreat and trek combinations — if you want variety',
];

export default function RetreatWhyUs({ whyUsPoints = [] }: RetreatWhyUsProps) {
  const points = whyUsPoints && whyUsPoints.length > 0 ? whyUsPoints : fallbackPoints;

  return (
    <section className="whyus-section" style={{
      paddingTop: '7rem',
      paddingBottom: '7rem',
      background: '#f7f9f7',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
    }}>
      <style>{`
        .whyus-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
        }

        .whyus-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .whyus-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }
        .whyus-badge-line {
          width: 36px;
          height: 1px;
          background: #0f766e;
          opacity: 0.3;
        }
        .whyus-badge-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #6b7280;
          font-weight: 500;
        }

        .whyus-headline {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #1a1814;
          margin: 0;
          line-height: 1.1;
        }
        .whyus-headline .accent {
          color: #0f766e;
          font-weight: 200;
        }

        .whyus-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .whyus-item {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 20px;
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }

        .whyus-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: #0f766e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 20px 20px 0 0;
        }
        .whyus-item:hover::before { transform: scaleX(1); }

        .whyus-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
          border-color: rgba(15, 118, 110, 0.04);
        }

        .whyus-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── NUMBER - Thoda visible normal, Full on hover ── */
        .whyus-num {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 2.8rem;
          font-weight: 200;
          color: #374151;
          opacity: 0.15;
          line-height: 1;
          letter-spacing: -0.06em;
          transition: opacity 0.4s ease;
          user-select: none;
        }
        .whyus-item:hover .whyus-num {
          opacity: 1;
        }

        /* ── CHECK - Thoda visible normal, Full on hover ── */
        .whyus-check {
          width: 34px; height: 34px;
          border-radius: 50%;
          border: 1.5px solid rgba(15, 118, 110, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #374151;
          font-size: 0.75rem;
          font-weight: 600;
          transition: all 0.4s ease;
          flex-shrink: 0;
          opacity: 0.3;
        }
        .whyus-item:hover .whyus-check {
          background: #0f766e;
          color: #ffffff;
          border-color: #0f766e;
          opacity: 1;
        }

        .whyus-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.92rem;
          line-height: 1.8;
          color: #6b7280;
          font-weight: 300;
          transition: color 0.3s ease;
          margin: 0;
        }
        .whyus-item:hover .whyus-text {
          color: #4b5563;
        }

        @media (max-width: 1024px) {
          .whyus-container { padding: 0 3rem; }
          .whyus-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        }

        @media (max-width: 900px) {
          .whyus-container { padding: 0 2rem; }
          .whyus-headline { font-size: clamp(2.2rem, 7vw, 3.2rem); }
        }

        @media (max-width: 640px) {
          .whyus-section { padding: 5rem 0; }
          .whyus-container { padding: 0 1.5rem; }
          .whyus-grid { grid-template-columns: 1fr; gap: 1.2rem; }
          .whyus-item { padding: 1.8rem 1.5rem; }
          .whyus-num { font-size: 2.2rem; opacity: 0.15; }
          .whyus-text { font-size: 0.88rem; }
          .whyus-headline { font-size: clamp(2rem, 8vw, 2.8rem); }
          .whyus-badge-text { font-size: 0.6rem; }
        }

        @media (max-width: 480px) {
          .whyus-container { padding: 0 1.2rem; }
          .whyus-item { padding: 1.5rem 1.2rem; }
          .whyus-num { font-size: 1.8rem; opacity: 0.15; }
          .whyus-text { font-size: 0.85rem; }
          .whyus-headline { font-size: clamp(1.8rem, 7vw, 2.5rem); }
          .whyus-check { width: 28px; height: 28px; font-size: 0.65rem; }
        }
      `}</style>

      <div className="whyus-container">
        {/* Header */}
        <div className="whyus-header">
          <div className="whyus-badge">
            <span className="whyus-badge-line" />
            <span className="whyus-badge-text">Why travel with us</span>
            <span className="whyus-badge-line" />
          </div>
          <h2 className="whyus-headline">
            Retreats Built for{' '}
            <span className="accent">Depth, Not Crowds</span>
          </h2>
        </div>

        {/* Grid */}
        <ul className="whyus-grid">
          {points.map((point, idx) => (
            <li key={idx} className="whyus-item">
              <div className="whyus-top-row">
                <span className="whyus-num">{String(idx + 1).padStart(2, '0')}</span>
                <div className="whyus-check">✓</div>
              </div>
              <p className="whyus-text">{point}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}