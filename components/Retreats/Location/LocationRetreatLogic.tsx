'use client';

import { locationRetreatLogicContent } from '@/content/retreats/location/retreatLogic';

interface Factor {
  title: string;
  description: string;
}

interface LocationRetreatLogicProps {
  title: string;
  factors: readonly Factor[];
}

export default function LocationRetreatLogic({ title, factors }: LocationRetreatLogicProps) {
  const content = locationRetreatLogicContent;

  return (
    <section style={{
      width: '100%',
      padding: '5rem 0',
      background: '#f7f9f7',
      borderBottom: '1px solid rgba(0,0,0,0.04)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative glow - subtle */}
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
        .logic-inner {
          max-width: 52rem;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .logic-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .logic-eyebrow-line {
          width: 30px;
          height: 2px;
          background: #0f766e;
          flex-shrink: 0;
          border-radius: 2px;
        }
        .logic-eyebrow-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8B877C;
          font-weight: 500;
        }

        .logic-heading {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #2B2A26;
          line-height: 1.15;
          margin: 0 0 2.5rem;
        }
        .logic-heading .accent {
          color: #0f766e;
        }

        .logic-factors {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .logic-factor {
          background: #ffffff;
          padding: 2rem 2rem 2rem 2.5rem;
          display: grid;
          grid-template-columns: 2.5rem 1fr;
          gap: 1.5rem;
          align-items: start;
          transition: background 0.3s ease;
          position: relative;
        }
        .logic-factor:hover {
          background: #FAFAF8;
        }

        .logic-factor::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #0f766e;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 0 2px 2px 0;
        }
        .logic-factor:hover::before {
          transform: scaleY(1);
        }

        .logic-idx {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #0f766e;
          letter-spacing: -0.02em;
          padding-top: 0.1rem;
          opacity: 0.3;
          transition: opacity 0.3s ease;
        }
        .logic-factor:hover .logic-idx {
          opacity: 0.8;
        }

        .logic-factor-title {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #2B2A26;
          margin: 0 0 0.5rem;
          letter-spacing: -0.01em;
          line-height: 1.3;
          transition: color 0.3s ease;
        }
        .logic-factor:hover .logic-factor-title {
          color: #0f766e;
        }

        .logic-factor-desc {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          line-height: 1.8;
          color: rgba(43,42,38,0.55);
          margin: 0;
          font-weight: 300;
        }

        .logic-factor-desc strong {
          color: rgba(43,42,38,0.8);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .logic-inner { padding: 0 1.5rem; }
          .logic-factor { 
            padding: 1.5rem 1.5rem 1.5rem 1.8rem; 
            grid-template-columns: 2rem 1fr;
            gap: 1rem;
          }
          .logic-idx { font-size: 0.95rem; }
          .logic-factor-title { font-size: 0.9rem; }
          .logic-factor-desc { font-size: 0.82rem; }
          .logic-heading { font-size: 1.4rem; }
        }

        @media (max-width: 480px) {
          .logic-inner { padding: 0 1.2rem; }
          .logic-factor { 
            padding: 1.2rem 1.2rem 1.2rem 1.5rem;
            grid-template-columns: 1.5rem 1fr;
            gap: 0.75rem;
          }
          .logic-idx { font-size: 0.85rem; }
          .logic-factor-title { font-size: 0.85rem; }
          .logic-factor-desc { font-size: 0.78rem; }
          .logic-heading { font-size: 1.2rem; }
        }
      `}</style>

      <div className="logic-inner">
        {/* Eyebrow */}
        <div className="logic-eyebrow">
          <span className="logic-eyebrow-line" />
          <span className="logic-eyebrow-text">{content.eyebrow}</span>
        </div>

        {/* Heading */}
        <h2 className="logic-heading">
          Retreats: <span className="accent">{title}</span>
        </h2>

        {/* Factors */}
        <div className="logic-factors">
          {factors.map((factor, idx) => (
            <div key={idx} className="logic-factor">
              <span className="logic-idx">{String(idx + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="logic-factor-title">{factor.title}</h3>
                <p className="logic-factor-desc">{factor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}