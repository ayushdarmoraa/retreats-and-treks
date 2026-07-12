// components/retreats/RetreatIntentions.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getAllRetreatServices } from '@/content/retreats/services';
import { logIntentClick } from '@/lib/analytics';

export default function RetreatIntentions() {
  const serviceImages: Record<string, { src: string; alt: string }> = {
    'rest-reset': { src: '/Images/services/restreset.webp', alt: 'Rest & Reset' },
    'rest-and-reset': { src: '/Images/services/restreset.webp', alt: 'Rest & Reset' },
    'burnout-recovery': { src: '/Images/services/burnoutrec.webp', alt: 'Burnout Recovery' },
    'yoga-and-movement': { src: '/Images/services/yoga.webp', alt: 'Yoga & Movement' },
    'yoga-movement': { src: '/Images/services/yoga.webp', alt: 'Yoga & Movement' },
    'meditation-silence': { src: '/Images/Journeys/meditation.webp', alt: 'Meditation & Silence' },
    'meditation-and-silence': { src: '/Images/Journeys/meditation.webp', alt: 'Meditation & Silence' },
    'art-creative': { src: '/Images/services/artcreative.webp', alt: 'Art & Creativity' },
    'art-and-creative': { src: '/Images/services/artcreative.webp', alt: 'Art & Creativity' },
    'trek-and-paint': { src: '/Images/blog/painting-in-the-himalayas.webp', alt: 'Trek & Paint' },
    'weekend-art-retreat': { src: '/Images/art-retreat/art-supplies.webp', alt: 'Weekend Art Retreat' },
    'sound-healing': { src: '/Images/services/soundhealing.webp', alt: 'Sound Healing' },
    'weekend-retreat': { src: '/Images/services/weekendretreat.webp', alt: 'Weekend Retreat' },
    'private-custom': { src: '/Images/services/privatecustom.webp', alt: 'Private & Custom' },
    'private-and-custom': { src: '/Images/services/privatecustom.webp', alt: 'Private & Custom' },
  };

  const services = getAllRetreatServices().filter(
    (service) => (service.slug as string) !== 'art-and-creative'
  );

  return (
    <section className="intentions-section" style={{
      paddingTop: '7rem',
      paddingBottom: '7rem',
      background: '#f7f9f7',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
    }}>
      <style>{`
        .intentions-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
        }

        .intentions-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .intentions-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }
        .intentions-badge-line {
          width: 36px;
          height: 1px;
          background: #0f766e;
          opacity: 0.3;
        }
        .intentions-badge-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #6b7280;
          font-weight: 500;
        }

        .intentions-headline {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #1a1814;
          margin: 0;
          line-height: 1.1;
        }
        .intentions-headline .accent {
          color: #0f766e;
          font-weight: 200;
        }

        .intentions-sub {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          color: #6b7280;
          font-weight: 300;
          max-width: 44rem;
          margin: 0.75rem auto 0;
          line-height: 1.8;
        }

        .intentions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .intention-card {
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

        .intention-card::before {
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
        .intention-card:hover::before { opacity: 1; }

        .intention-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06), 0 24px 80px -20px rgba(15, 118, 110, 0.06);
          border-color: rgba(15, 118, 110, 0.06);
        }

        .intention-img-wrap {
          position: relative;
          overflow: hidden;
          height: 220px;
          background: #f5f3ef;
          flex-shrink: 0;
        }

        .intention-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .intention-card:hover .intention-img { transform: scale(1.05); }

        .intention-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(26, 24, 20, 0.5), transparent 60%);
          opacity: 0.6;
          transition: opacity 0.5s ease;
        }
        .intention-card:hover .intention-overlay { opacity: 0.3; }

        .intention-tag {
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

        .intention-img-title {
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

        .intention-body {
          padding: 1.8rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .intention-line {
          width: 32px;
          height: 2px;
          background: #0f766e;
          opacity: 0.06;
          margin-bottom: 1rem;
          border-radius: 4px;
          transition: all 0.5s ease;
          flex-shrink: 0;
        }
        .intention-card:hover .intention-line {
          opacity: 0.15;
          width: 48px;
        }

        .intention-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.1rem;
          font-weight: 500;
          color: #1a1814;
          margin: 0 0 0.4rem;
          transition: color 0.4s ease;
          flex-shrink: 0;
        }
        .intention-card:hover .intention-title { color: #0f766e; }

        .intention-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem;
          color: #6b7280;
          margin: 0 0 1.2rem;
          line-height: 1.8;
          font-weight: 300;
          flex: 1;
        }

        /* ── CTA - ALWAYS VISIBLE, SAME LINE ── */
        .intention-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0f766e;
          transition: all 0.3s ease;
          border-bottom: 2px solid rgba(15, 118, 110, 0.08);
          padding-bottom: 0.25rem;
          width: fit-content;
          flex-shrink: 0;
          margin-top: auto;
        }
        .intention-card:hover .intention-cta {
          gap: 0.8rem;
          border-bottom-color: rgba(15, 118, 110, 0.25);
        }
        .intention-arrow {
          transition: transform 0.3s ease;
          display: inline-block;
        }
        .intention-card:hover .intention-arrow {
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .intentions-container { padding: 0 3rem; }
          .intentions-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
          .intention-img-wrap { height: 200px; }
        }

        @media (max-width: 900px) {
          .intentions-container { padding: 0 2rem; }
          .intentions-headline { font-size: clamp(2.2rem, 7vw, 3.2rem); }
        }

        @media (max-width: 640px) {
          .intentions-section { padding: 5rem 0; }
          .intentions-container { padding: 0 1.5rem; }
          .intentions-grid { grid-template-columns: 1fr; gap: 1.2rem; }
          .intention-img-wrap { height: 200px; }
          .intention-body { padding: 1.5rem 1.5rem 1.8rem; }
          .intention-title { font-size: 1rem; }
          .intention-desc { font-size: 0.85rem; }
          .intentions-headline { font-size: clamp(2rem, 8vw, 2.8rem); }
          .intentions-badge-text { font-size: 0.6rem; }
        }

        @media (max-width: 480px) {
          .intentions-container { padding: 0 1.2rem; }
          .intention-img-wrap { height: 180px; }
          .intention-body { padding: 1.2rem 1.2rem 1.5rem; }
          .intention-title { font-size: 0.95rem; }
          .intention-desc { font-size: 0.82rem; }
          .intentions-headline { font-size: clamp(1.8rem, 7vw, 2.5rem); }
          .intention-img-title { font-size: 1rem; }
          .intention-cta { font-size: 0.6rem; }
        }
      `}</style>

      <div className="intentions-container">
        {/* Header */}
        <div className="intentions-header">
          <div className="intentions-badge">
            <span className="intentions-badge-line" />
            <span className="intentions-badge-text">Retreat pathways</span>
            <span className="intentions-badge-line" />
          </div>
          <h2 className="intentions-headline">
            Choose the Retreat That{' '}
            <span className="accent">Matches Your Intention</span>
          </h2>
          <p className="intentions-sub">
            Each pathway is designed around a different need — rest, movement, silence, creativity, sound healing, or a fully private retreat.
          </p>
        </div>

        {/* Grid */}
        <div className="intentions-grid">
          {services.map((service) => {
            const imgMeta = serviceImages[service.slug] ?? {
              src: '/Images/services/restreset.webp',
              alt: service.title,
            };
            return (
              <Link
                key={service.slug}
                href={`/retreats/journeys/${service.slug}`}
                onClick={() => logIntentClick(service.slug, undefined, '/retreats')}
                className="intention-card"
              >
                <div className="intention-img-wrap">
                  <Image
                    src={imgMeta.src}
                    alt={imgMeta.alt}
                    className="intention-img"
                    width={400}
                    height={210}
                    quality={75}
                  />
                  <div className="intention-overlay" />
                  <span className="intention-tag">Retreat</span>
                  <span className="intention-img-title">{service.title}</span>
                </div>
                <div className="intention-body">
                  <div className="intention-line" />
                  <h3 className="intention-title">{service.title}</h3>
                  <p className="intention-desc">{service.oneLineEssence}</p>
                  <div className="intention-cta">
                    Learn more <span className="intention-arrow">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}