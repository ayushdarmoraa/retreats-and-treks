'use client';

import Link from 'next/link';
import { locationReadingContent } from '@/content/retreats/location/reading';

interface LocationReadingProps {
  locationName: string;
  slugs: readonly string[];
}

export default function LocationReading({ locationName, slugs }: LocationReadingProps) {
  const content = locationReadingContent;

  if (slugs.length === 0) return null;

  const titles: Record<string, string> = {
    'chakrata-vs-sankri': 'Chakrata vs Sankri: Two Mountains, Two Medicines',
    'chakrata-vs-mussoorie-weekend-trip': 'Chakrata vs Mussoorie: Forest vs Romance for Weekend Retreat',
    'trek-vs-retreat': 'Trek vs Retreat: What Are You Really Seeking?',
  };

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
        .reading-inner {
          max-width: 52rem;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .reading-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .reading-eyebrow-line {
          width: 30px;
          height: 2px;
          background: #0f766e;
          flex-shrink: 0;
          border-radius: 2px;
        }
        .reading-eyebrow-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8B877C;
          font-weight: 500;
        }

        .reading-heading {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #2B2A26;
          line-height: 1.15;
          margin: 0 0 0.75rem;
        }
        .reading-heading .accent {
          color: #0f766e;
        }

        .reading-sub {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          color: rgba(43,42,38,0.5);
          font-weight: 300;
          line-height: 1.7;
          margin: 0 0 2.5rem;
        }

        .reading-list {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .reading-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          background: #ffffff;
          padding: 1.25rem 1.75rem;
          text-decoration: none;
          transition: background 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .reading-card:hover {
          background: #FAFAF8;
        }

        .reading-card::before {
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
        }
        .reading-card:hover::before {
          transform: scaleY(1);
        }

        .reading-card-left {
          flex: 1;
          min-width: 0;
        }

        .reading-card-title {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #2B2A26;
          margin: 0 0 0.2rem;
          letter-spacing: -0.01em;
          line-height: 1.3;
          transition: color 0.3s ease;
        }
        .reading-card:hover .reading-card-title {
          color: #0f766e;
        }

        .reading-card-meta {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.72rem;
          color: #8B877C;
          font-weight: 300;
          margin: 0;
        }

        .reading-arrow {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2B2A26;
          font-size: 0.8rem;
          transition: all 0.3s ease;
        }
        .reading-card:hover .reading-arrow {
          background: #0f766e;
          border-color: #0f766e;
          color: #ffffff;
          transform: translateX(3px);
        }

        @media (max-width: 768px) {
          .reading-inner { padding: 0 1.5rem; }
          .reading-card { padding: 1.2rem 1.5rem; gap: 1rem; }
          .reading-card-title { font-size: 0.9rem; }
        }

        @media (max-width: 480px) {
          .reading-inner { padding: 0 1.2rem; }
          .reading-card { 
            padding: 1rem 1.2rem; 
            flex-direction: column; 
            align-items: flex-start; 
            gap: 0.75rem;
          }
          .reading-card-title { font-size: 0.85rem; }
          .reading-arrow { width: 32px; height: 32px; font-size: 0.7rem; }
        }
      `}</style>

      <div className="reading-inner">
        {/* Eyebrow */}
        <div className="reading-eyebrow">
          <span className="reading-eyebrow-line" />
          <span className="reading-eyebrow-text">{content.eyebrow}</span>
        </div>

        {/* Heading */}
        <h2 className="reading-heading">
          {content.heading} <span className="accent">{locationName}</span>
        </h2>

        {/* Sub */}
        <p className="reading-sub">
          {content.sub.replace('{location}', locationName)}
        </p>

        {/* List */}
        <div className="reading-list">
          {slugs.map((slug, idx) => {
            const title = titles[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            return (
              <Link key={idx} href={`/blog/${slug}`} className="reading-card">
                <div className="reading-card-left">
                  <h3 className="reading-card-title">{title}</h3>
                  <p className="reading-card-meta">Read in /blog →</p>
                </div>
                <div className="reading-arrow">→</div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
