// components/retreats/RetreatFormats.tsx
'use client';

import Image from 'next/image';
import type { RetreatContent } from '@/types/content';

interface RetreatFormatsProps {
  retreatFormats?: RetreatContent[];
}

// ── FALLBACK DATA ──
const fallbackFormats: RetreatContent[] = [
  {
    slug: 'weekend-retreat',
    title: 'Weekend Retreat',
    description: 'A compressed reset for those who need mountain time but have limited availability.',
  },
  {
    slug: 'meditation-retreat',
    title: 'Meditation Retreat',
    description: 'Guided meditation practices in the heart of the Himalayas.',
  },
  {
    slug: 'yoga-retreat',
    title: 'Yoga Retreat',
    description: 'Daily yoga practice combined with Himalayan mountain walks.',
  },
];

export default function RetreatFormats({ retreatFormats }: RetreatFormatsProps) {
  const formats = retreatFormats && retreatFormats.length > 0 ? retreatFormats : fallbackFormats;

  const formatImages: Record<string, { src: string; tag: string }> = {
    'weekend-retreat':   { src: '/Images/Journeys/weekend.webp',    tag: 'Weekend' },
    'meditation-retreat':{ src: '/Images/Journeys/meditation.webp', tag: 'Meditation' },
    'yoga-retreat':      { src: '/Images/Journeys/yoga.webp',       tag: 'Yoga' },
  };

  return (
    <section className="formats-section" style={{
      paddingTop: '7rem',
      paddingBottom: '7rem',
      background: '#f7f9f7',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
    }}>
      <style>{`
        .formats-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
        }

        .formats-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .formats-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }
        .formats-badge-line {
          width: 36px;
          height: 1px;
          background: #0f766e;
          opacity: 0.3;
        }
        .formats-badge-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #6b7280;
          font-weight: 500;
        }

        .formats-headline {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #1a1814;
          margin: 0;
          line-height: 1.1;
        }
        .formats-headline .accent {
          color: #0f766e;
          font-weight: 200;
        }

        .formats-sub {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          color: #6b7280;
          font-weight: 300;
          max-width: 44rem;
          margin: 0.75rem auto 0;
          line-height: 1.8;
        }

        .formats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .format-card {
          display: flex;
          flex-direction: column;
          border-radius: 24px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.04);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          height: 100%;
        }

        .format-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 25px;
          padding: 1.5px;
          background: linear-gradient(135deg, 
            rgba(15, 118, 110, 0.12), 
            rgba(15, 118, 110, 0.02) 40%, 
            rgba(15, 118, 110, 0.02) 60%, 
            rgba(139, 115, 85, 0.05)
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }
        .format-card:hover::before { opacity: 1; }

        .format-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06), 0 24px 80px -20px rgba(15, 118, 110, 0.06);
          border-color: rgba(15, 118, 110, 0.06);
        }

        .format-img-wrap {
          position: relative;
          overflow: hidden;
          height: 220px;
          background: #f5f3ef;
          flex-shrink: 0;
        }

        .format-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .format-card:hover .format-img { transform: scale(1.05); }

        .format-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(26, 24, 20, 0.5), transparent 60%);
          opacity: 0.6;
          transition: opacity 0.5s ease;
        }
        .format-card:hover .format-overlay { opacity: 0.3; }

        .format-tag {
          position: absolute;
          top: 1.2rem;
          left: 1.2rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          background: rgba(15, 118, 110, 0.85);
          backdrop-filter: blur(8px);
          padding: 0.3rem 0.8rem;
          border-radius: 100px;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .format-img-title {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.15rem;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
        }

        .format-body {
          padding: 1.8rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .format-line {
          width: 32px;
          height: 2px;
          background: #0f766e;
          opacity: 0.06;
          margin-bottom: 1rem;
          border-radius: 4px;
          transition: all 0.5s ease;
          flex-shrink: 0;
        }
        .format-card:hover .format-line {
          opacity: 0.15;
          width: 48px;
        }

        .format-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.1rem;
          font-weight: 500;
          color: #1a1814;
          margin: 0 0 0.4rem;
          transition: color 0.4s ease;
          flex-shrink: 0;
        }
        .format-card:hover .format-title { color: #0f766e; }

        .format-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem;
          color: #6b7280;
          margin: 0;
          line-height: 1.8;
          font-weight: 300;
          flex: 1;
        }

        @media (max-width: 1024px) {
          .formats-container { padding: 0 3rem; }
          .formats-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
          .format-img-wrap { height: 200px; }
        }

        @media (max-width: 900px) {
          .formats-container { padding: 0 2rem; }
          .formats-headline { font-size: clamp(2.2rem, 7vw, 3.2rem); }
        }

        @media (max-width: 640px) {
          .formats-section { padding: 5rem 0; }
          .formats-container { padding: 0 1.5rem; }
          .formats-grid { grid-template-columns: 1fr; gap: 1.2rem; }
          .format-img-wrap { height: 200px; }
          .format-body { padding: 1.5rem 1.5rem 1.8rem; }
          .format-title { font-size: 1rem; }
          .format-desc { font-size: 0.85rem; }
          .formats-headline { font-size: clamp(2rem, 8vw, 2.8rem); }
          .formats-badge-text { font-size: 0.6rem; }
        }

        @media (max-width: 480px) {
          .formats-container { padding: 0 1.2rem; }
          .format-img-wrap { height: 180px; }
          .format-body { padding: 1.2rem 1.2rem 1.5rem; }
          .format-title { font-size: 0.95rem; }
          .format-desc { font-size: 0.82rem; }
          .formats-headline { font-size: clamp(1.8rem, 7vw, 2.5rem); }
          .format-img-title { font-size: 1rem; }
        }
      `}</style>

      <div className="formats-container">
        <div className="formats-header">
          <div className="formats-badge">
            <span className="formats-badge-line" />
            <span className="formats-badge-text">Retreat formats</span>
            <span className="formats-badge-line" />
          </div>
          <h2 className="formats-headline">
            Choose Your <span className="accent">Pace</span>
          </h2>
          <p className="formats-sub">
            Short weekend reset, deeper meditation, or movement-led retreat — each format can be adapted around your intention, dates, and availability.
          </p>
        </div>

        <div className="formats-grid">
          {formats.map((format) => {
            const meta = formatImages[format.slug] ?? {
              src: '/Images/Journeys/weekend.webp',
              tag: 'Retreat',
            };

            return (
              <div key={format.slug} className="format-card">
                <div className="format-img-wrap">
                  <Image
                    src={meta.src}
                    alt={format.title}
                    className="format-img"
                    width={400}
                    height={210}
                    quality={75}
                  />
                  <div className="format-overlay" />
                  <span className="format-tag">{meta.tag}</span>
                  <span className="format-img-title">{format.title}</span>
                </div>
                <div className="format-body">
                  <div className="format-line" />
                  <h3 className="format-title">{format.title}</h3>
                  <p className="format-desc">{format.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}