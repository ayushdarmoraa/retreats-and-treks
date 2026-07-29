'use client';

import { locationBridgeContent } from '@/content/retreats/location/bridge';

interface LocationBridgeProps {
  title: string;
  description: string;
}

export default function LocationBridge({ title, description }: LocationBridgeProps) {
  const content = locationBridgeContent;

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
        top: '-100px',
        right: '-80px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15,118,110,0.04), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '-80px',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15,118,110,0.03), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <style>{`
        .bridge-inner {
          max-width: 52rem;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          align-items: start;
          position: relative;
          z-index: 1;
        }
        .bridge-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .bridge-eyebrow-line {
          width: 30px;
          height: 2px;
          background: #0f766e;
          flex-shrink: 0;
          border-radius: 2px;
        }
        .bridge-eyebrow-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8B877C;
          font-weight: 500;
        }
        .bridge-title-wrap {
          position: relative;
        }
        .bridge-title-wrap::before {
          content: '';
          position: absolute;
          left: -1.5rem;
          top: 0.2rem;
          bottom: 0.2rem;
          width: 2px;
          background: linear-gradient(to bottom, #0f766e, transparent);
          border-radius: 2px;
        }
        .bridge-title {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #2B2A26;
          line-height: 1.15;
          margin: 0;
        }
        .bridge-title .accent {
          color: #0f766e;
          display: block;
          margin-top: 0.15rem;
        }
        .bridge-title-divider {
          width: 40px;
          height: 2px;
          background: #0f766e;
          margin-top: 0.75rem;
          border-radius: 2px;
          opacity: 0.3;
        }
        .bridge-desc {
          font-family: var(--font-inter), sans-serif;
          font-size: 1rem;
          line-height: 1.95;
          color: rgba(43,42,38,0.55);
          font-weight: 300;
          margin: 0;
          padding-top: 0.5rem;
          position: relative;
        }
        .bridge-desc strong {
          color: #2B2A26;
          font-weight: 500;
        }
        .bridge-desc em {
          font-family: var(--font-fraunces), Georgia, serif;
          font-style: italic;
          color: #0f766e;
        }
        .bridge-left {
          position: sticky;
          top: 6rem;
        }
        @media (max-width: 768px) {
          .bridge-inner {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .bridge-left {
            position: relative;
            top: 0;
          }
          .bridge-title-wrap::before {
            left: -1rem;
          }
          .bridge-desc {
            padding-top: 0;
          }
        }
        @media (max-width: 480px) {
          .bridge-inner { padding: 0 1.2rem; }
          .bridge-title { font-size: 1.2rem; }
          .bridge-desc { font-size: 0.9rem; }
          .bridge-title-wrap::before { display: none; }
        }
      `}</style>

      <div className="bridge-inner">
        {/* Left Column */}
        <div className="bridge-left">
          <div className="bridge-eyebrow">
            <span className="bridge-eyebrow-line" />
            <span className="bridge-eyebrow-text">{content.eyebrow}</span>
          </div>

          <div className="bridge-title-wrap">
            <h2 className="bridge-title">
              Retreats: <span className="accent">{title}</span>
            </h2>
            <div className="bridge-title-divider" />
          </div>
        </div>

        {/* Right Column */}
        <div>
          <p className="bridge-desc">{description}</p>
        </div>
      </div>
    </section>
  );
}
