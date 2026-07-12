// components/retreats/RetreatSignature.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

const signatureRetreats = [
  {
    slug: 'yoga-retreat-uttarakhand',
    title: 'Yoga Retreats',
    desc: 'Multi-day Himalayan yoga retreats focused on movement, breath, recovery and mindful living.',
    image: '/Images/services/yoga.webp',
    tag: 'Yoga',
  },
  {
    slug: 'meditation-retreat-uttarakhand',
    title: 'Meditation Retreats',
    desc: 'Guided meditation retreats designed for silence, clarity, emotional balance and deep rest.',
    image: '/Images/Journeys/meditation.webp',
    tag: 'Meditation',
  },
  {
    slug: 'weekend-himalayan-retreats',
    title: 'Weekend Retreats',
    desc: 'Short Himalayan escapes designed for busy professionals needing genuine rest.',
    image: '/Images/services/weekendretreat.webp',
    tag: 'Weekend',
  },
  {
    slug: 'creative-retreat',
    title: 'Creative Healing Retreat',
    desc: 'Art, journaling, nature and mindfulness combined into one immersive healing experience.',
    image: '/Images/services/artcreative.webp',
    tag: 'Creative',
  },
];

export default function RetreatSignature() {
  return (
    <section className="signature-section" style={{
      paddingTop: '4rem',
      paddingBottom: '7rem',
      background: '#ffffff',
      borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
    }}>
      <style>{`
        .signature-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
        }

        .signature-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .signature-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }
        .signature-badge-line {
          width: 36px;
          height: 1px;
          background: #0f766e;
          opacity: 0.3;
        }
        .signature-badge-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #6b7280;
          font-weight: 500;
        }

        .signature-headline {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #1a1814;
          margin: 0;
          line-height: 1.1;
        }
        .signature-headline .accent {
          color: #0f766e;
          font-weight: 200;
        }

        .signature-sub {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          color: #6b7280;
          font-weight: 300;
          max-width: 44rem;
          margin: 0.75rem auto 0;
          line-height: 1.8;
        }

        .signature-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .sig-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          border-radius: 24px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.04);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          height: 100%;
        }

        .sig-card::before {
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
        .sig-card:hover::before { opacity: 1; }

        .sig-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06), 0 24px 80px -20px rgba(15, 118, 110, 0.06);
          border-color: rgba(15, 118, 110, 0.06);
        }

        .sig-img-wrap {
          position: relative;
          overflow: hidden;
          height: 200px;
          background: #f5f3ef;
          flex-shrink: 0;
        }

        .sig-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .sig-card:hover .sig-img { transform: scale(1.05); }

        .sig-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(26, 24, 20, 0.5), transparent 60%);
          opacity: 0.6;
          transition: opacity 0.5s ease;
        }
        .sig-card:hover .sig-overlay { opacity: 0.3; }

        .sig-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.5rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          background: rgba(15, 118, 110, 0.85);
          backdrop-filter: blur(8px);
          padding: 0.25rem 0.7rem;
          border-radius: 100px;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .sig-img-title {
          position: absolute;
          bottom: 1.2rem;
          left: 1.2rem;
          right: 1.2rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.05rem;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
        }

        .sig-body {
          padding: 1.5rem 1.8rem 1.8rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .sig-line {
          width: 28px;
          height: 2px;
          background: #0f766e;
          opacity: 0.06;
          margin-bottom: 0.8rem;
          border-radius: 4px;
          transition: all 0.5s ease;
          flex-shrink: 0;
        }
        .sig-card:hover .sig-line {
          opacity: 0.15;
          width: 42px;
        }

        .sig-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: #1a1814;
          margin: 0 0 0.4rem;
          transition: color 0.4s ease;
          flex-shrink: 0;
        }
        .sig-card:hover .sig-title { color: #0f766e; }

        .sig-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.85rem;
          color: #6b7280;
          margin: 0 0 1rem;
          line-height: 1.7;
          font-weight: 300;
          flex: 1;
        }

        .sig-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0f766e;
          transition: all 0.3s ease;
          border-bottom: 2px solid rgba(15, 118, 110, 0.08);
          padding-bottom: 0.2rem;
          width: fit-content;
          flex-shrink: 0;
          margin-top: auto;
        }
        .sig-card:hover .sig-cta {
          gap: 0.8rem;
          border-bottom-color: rgba(15, 118, 110, 0.25);
        }
        .sig-arrow {
          transition: transform 0.3s ease;
          display: inline-block;
        }
        .sig-card:hover .sig-arrow {
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .signature-container { padding: 0 3rem; }
          .signature-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
          .sig-img-wrap { height: 180px; }
        }

        @media (max-width: 900px) {
          .signature-container { padding: 0 2rem; }
          .signature-headline { font-size: clamp(2.2rem, 7vw, 3.2rem); }
        }

        @media (max-width: 640px) {
          .signature-section { padding: 4rem 0; }
          .signature-container { padding: 0 1.5rem; }
          .signature-grid { grid-template-columns: 1fr; gap: 1.2rem; }
          .sig-img-wrap { height: 200px; }
          .sig-body { padding: 1.2rem 1.5rem 1.5rem; }
          .sig-title { font-size: 0.95rem; }
          .sig-desc { font-size: 0.82rem; }
          .signature-headline { font-size: clamp(2rem, 8vw, 2.8rem); }
          .signature-badge-text { font-size: 0.6rem; }
        }

        @media (max-width: 480px) {
          .signature-container { padding: 0 1.2rem; }
          .sig-img-wrap { height: 180px; }
          .sig-body { padding: 1rem 1.2rem 1.2rem; }
          .sig-title { font-size: 0.9rem; }
          .sig-desc { font-size: 0.78rem; }
          .signature-headline { font-size: clamp(1.8rem, 7vw, 2.5rem); }
          .sig-img-title { font-size: 0.95rem; }
          .sig-cta { font-size: 0.6rem; }
        }
      `}</style>

      <div className="signature-container">
        {/* Header */}
        <div className="signature-header">
          <div className="signature-badge">
            <span className="signature-badge-line" />
            <span className="signature-badge-text">Our Signature Retreats</span>
            <span className="signature-badge-line" />
          </div>
          <h2 className="signature-headline">
            Our <span className="accent">Signature Retreats</span>
          </h2>
          <p className="signature-sub">
            If you&apos;re unsure where to begin, these are the retreat experiences most guests choose first.
          </p>
        </div>

        {/* Grid */}
        <div className="signature-grid">
          {signatureRetreats.map((retreat) => (
            <Link
              key={retreat.slug}
              href={retreat.slug === 'creative-retreat' ? '/creative-retreat' : `/retreats/${retreat.slug}`}
              className="sig-card"
            >
              <div className="sig-img-wrap">
                <Image
                  src={retreat.image}
                  alt={retreat.title}
                  className="sig-img"
                  width={400}
                  height={210}
                  quality={75}
                />
                <div className="sig-overlay" />
                <span className="sig-tag">{retreat.tag}</span>
                <span className="sig-img-title">{retreat.title}</span>
              </div>
              <div className="sig-body">
                <div className="sig-line" />
                <h3 className="sig-title">{retreat.title}</h3>
                <p className="sig-desc">{retreat.desc}</p>
                <div className="sig-cta">
                  Explore <span className="sig-arrow">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}