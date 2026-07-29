'use client';

import { locationLandToneContent } from '@/content/retreats/location/landTone';

interface LocationLandToneProps {
  name: string;
  opening: string;
}

export default function LocationLandTone({ name, opening }: LocationLandToneProps) {
  const content = locationLandToneContent;

  return (
    <section style={{
      width: '100%',
      padding: '5rem 0',
      background: '#f7f9f7',
      borderBottom: '1px solid #e5e7eb',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .landtone-inner {
          max-width: 52rem;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
          animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both;
        }
        .landtone-quote-mark {
          font-family: 'Georgia', serif;
          font-size: 8rem;
          line-height: 0.6;
          color: #374151;
          display: block;
          margin-bottom: 1.5rem;
          user-select: none;
          font-weight: 700;
          opacity: 0.06;
        }
        .landtone-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .landtone-eyebrow-line {
          width: 32px;
          height: 2px;
          background: #B8895A;
          flex-shrink: 0;
          border-radius: 2px;
        }
        .landtone-eyebrow-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8B877C;
          font-weight: 500;
        }
        .landtone-body {
          font-family: var(--font-inter), sans-serif;
          font-size: clamp(1.05rem, 2vw, 1.2rem);
          line-height: 1.95;
          color: #2a2a2a;
          font-weight: 300;
          letter-spacing: 0.01em;
          margin: 0;
          position: relative;
          padding-left: 2rem;
        }
        .landtone-body::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.3rem;
          bottom: 0.3rem;
          width: 3px;
          background: linear-gradient(to bottom, #B8895A, transparent);
          border-radius: 4px;
        }
        .landtone-footer {
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(0,0,0,0.06);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .landtone-location-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #B8895A;
          flex-shrink: 0;
        }
        .landtone-location-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8B877C;
          font-weight: 500;
        }
        .landtone-glow {
          position: absolute;
          top: -60px;
          right: -80px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(184,137,90,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .landtone-quote-mark { font-size: 5rem; }
          .landtone-body { font-size: 0.95rem; padding-left: 1.2rem; }
        }
        @media (max-width: 480px) {
          .landtone-inner { padding: 0 1.2rem; }
          .landtone-quote-mark { font-size: 4rem; }
          .landtone-body { font-size: 0.88rem; padding-left: 1rem; }
          .landtone-eyebrow-text { font-size: 0.55rem; }
        }
      `}</style>

      <div className="landtone-glow" />

      <div className="landtone-inner">
        <div className="landtone-eyebrow">
          <span className="landtone-eyebrow-line" />
          <span className="landtone-eyebrow-text">{content.eyebrow}</span>
        </div>

        <span className="landtone-quote-mark">"</span>

        <p className="landtone-body">{opening}</p>

        <div className="landtone-footer">
          <span className="landtone-location-dot" />
          <span className="landtone-location-text">{name} · Himalayan Journeys</span>
        </div>
      </div>
    </section>
  );
}
