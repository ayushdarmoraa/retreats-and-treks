'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { locationHeroContent } from '@/content/retreats/location/hero';

interface LocationHeroProps {
  name: string;
  opening?: string;
  heroImage?: string;
  heroImageAlt?: string;
  stats?: readonly string[];
  tags?: readonly string[];
}

export default function LocationHero({
  name,
  opening,
  heroImage,
  heroImageAlt,
  stats,
  tags = ['Himalayan Retreats', 'Quiet Places', 'Small Groups'],
}: LocationHeroProps) {
  const content = locationHeroContent;

  const sectionRef = useRef<HTMLElement>(null);
  const [bleed, setBleed] = useState<{ width: string; marginLeft: string }>({
    width: '100%',
    marginLeft: '0px',
  });

  useEffect(() => {
    const updateBleed = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      setBleed({
        width: `${viewportWidth}px`,
        marginLeft: `${-rect.left}px`,
      });
    };
    updateBleed();
    window.addEventListener('resize', updateBleed);
    return () => window.removeEventListener('resize', updateBleed);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="lh-hero"
      style={{ width: bleed.width, marginLeft: bleed.marginLeft, marginRight: 0 }}
    >
      <style>{`
        .lh-hero {
          --text: #F6F2E7;
          --text-soft: rgba(246,242,231,0.78);
          --text-faint: rgba(246,242,231,0.5);
          --brand: #0f766e;
          --brand-hover: #0d6b64;
          --gold: #0f766e;
          --line: rgba(246,242,231,0.22);
          --overlay-a: rgba(6,20,18,0.76);
          --overlay-b: rgba(6,20,18,0.52);
          --overlay-c: rgba(6,20,18,0.3);
          --fallback-bg: linear-gradient(135deg, #123832, #061412);

          position: relative;
          width: 100%;
          min-height: clamp(600px, 82vh, 820px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--fallback-bg);
        }

        .lh-hero-media {
          position: absolute;
          inset: -2%;
          z-index: 0;
          animation: lh-kenburns 26s ease-out forwards;
          will-change: transform;
        }
        .lh-hero-media img {
          object-fit: cover;
          filter: saturate(0.9) contrast(1.05) brightness(0.85);
        }
        @keyframes lh-kenburns {
          from { transform: scale(1.03); }
          to { transform: scale(1); }
        }

        .lh-hero-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(100deg, var(--overlay-a) 0%, var(--overlay-b) 45%, var(--overlay-c) 100%);
          pointer-events: none;
        }
        .lh-hero-scrim::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(4,10,9,0.35) 0%, transparent 26%, transparent 66%, rgba(4,10,9,0.5) 100%),
            linear-gradient(135deg, rgba(15,118,110,0.14), transparent 55%);
        }
        .lh-hero-grain {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.5;
          mix-blend-mode: overlay;
          pointer-events: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/></svg>");
        }
        @media (prefers-reduced-motion: reduce) {
          .lh-hero-media { animation: none; }
        }

        .lh-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 100rem;
          margin: 0 auto;
          padding: 4.5rem clamp(2rem, 6vw, 6rem);
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        /* ---------- Eyebrow ---------- */
        .lh-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 1.1rem 0.5rem 0.7rem;
          margin-bottom: 2rem;
          background: rgba(20,15,10,0.28);
          border: 1px solid var(--line);
          border-radius: 100px;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .lh-eyebrow-ring {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1.5px solid var(--gold);
          background: rgba(246,242,231,0.55);
          box-shadow: 0 0 6px rgba(246,242,231,0.35);
          position: relative;
          flex-shrink: 0;
        }
        .lh-eyebrow-ring::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          background: var(--gold);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .lh-eyebrow-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--text-soft);
          font-weight: 500;
        }

        /* ---------- Title ---------- */
        .lh-title {
          font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 500;
          font-size: clamp(3rem, 5vw, 4.5rem);
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: var(--text);
          margin: 0 0 1.5rem;
          max-width: 700px;
          text-wrap: balance;
          text-shadow: 0 2px 30px rgba(0,0,0,0.35);
        }
        .lh-title .lh-accent {
          position: relative;
          display: inline-block;
        }
        .lh-title .lh-accent svg {
          position: absolute;
          left: -2%;
          bottom: -0.16em;
          width: 104%;
          height: 0.3em;
          overflow: visible;
        }
        .lh-title .lh-accent path {
          fill: none;
          stroke: var(--gold);
          stroke-width: 3;
          stroke-linecap: round;
          filter: drop-shadow(0 0 3px rgba(246,242,231,0.55));
        }

        /* ---------- Tags ---------- */
        .lh-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 2rem;
          justify-content: center;
        }
        .lh-tag {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(20,15,10,0.22);
          border: 1px solid var(--line);
          color: var(--text-soft);
          border-radius: 100px;
          padding: 0.35rem 1rem;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        /* ---------- Stats ---------- */
        .lh-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 2.5rem;
          justify-content: center;
        }
        .lh-stat {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          background: rgba(20,15,10,0.22);
          border: 1px solid var(--line);
          border-radius: 100px;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .lh-stat-icon {
          font-size: 0.7rem;
          opacity: 0.7;
        }
        .lh-stat-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--text-soft);
        }

        /* ---------- CTAs ---------- */
        .lh-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.9rem;
          justify-content: center;
        }
        .lh-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 1rem 2.5rem;
          background: var(--brand);
          color: #ffffff;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 100px;
          border: 1px solid var(--brand);
          box-shadow: 0 10px 30px rgba(0,0,0,0.28);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .lh-cta-primary:hover {
          background: var(--brand-hover);
          border-color: var(--brand-hover);
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(0,0,0,0.34);
        }
        .lh-cta-primary .arrow {
          transition: transform 0.3s ease;
          display: inline-block;
        }
        .lh-cta-primary:hover .arrow {
          transform: translateX(4px);
        }

        .lh-cta-secondary {
          display: inline-flex;
          align-items: center;
          padding: 1rem 2rem;
          background: rgba(20,15,10,0.22);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          color: #ffffff;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 100px;
          border: 1px solid var(--line);
          transition: border-color 0.35s ease, color 0.35s ease, transform 0.35s ease, background 0.35s ease;
        }
        .lh-cta-secondary:hover {
          border-color: var(--gold);
          color: var(--gold);
          background: rgba(20,15,10,0.34);
          transform: translateY(-2px);
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 768px) {
          .lh-hero-inner {
            padding: 4rem 1.5rem;
          }
          .lh-title {
            font-size: clamp(2.4rem, 6vw, 3.2rem);
          }
          .lh-ctas {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
          }
          .lh-cta-primary,
          .lh-cta-secondary {
            justify-content: center;
            width: 100%;
          }
          .lh-stat {
            padding: 0.3rem 0.7rem;
          }
          .lh-stat-text {
            font-size: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .lh-hero-inner {
            padding: 3rem 1rem;
          }
          .lh-title {
            font-size: clamp(2rem, 5vw, 2.6rem);
          }
          .lh-eyebrow-text {
            font-size: 0.6rem;
          }
          .lh-tag {
            font-size: 0.5rem;
            padding: 0.25rem 0.7rem;
          }
          .lh-cta-primary,
          .lh-cta-secondary {
            font-size: 0.6rem;
            padding: 0.7rem 1.2rem;
          }
        }
      `}</style>

      {heroImage && (
        <div className="lh-hero-media">
          <Image
            src={heroImage}
            alt={heroImageAlt || name}
            fill
            priority
            quality={92}
            sizes="100vw"
          />
        </div>
      )}
      <div className="lh-hero-scrim" />
      <div className="lh-hero-grain" />

      <div className="lh-hero-inner">
        {/* Eyebrow */}
        <div className="lh-eyebrow">
          <span className="lh-eyebrow-ring" />
          <span className="lh-eyebrow-text">{content.eyebrow}</span>
        </div>

        {/* Title */}
        <h1 className="lh-title">
          {name}
          <span className="lh-accent">
            <svg viewBox="0 0 200 20" preserveAspectRatio="none">
              <path d="M2 12 C 50 4, 150 18, 198 8" />
            </svg>
          </span>
        </h1>

        {/* Tags */}
        <div className="lh-tags">
          {tags.map((tag, idx) => (
            <span key={idx} className="lh-tag">{tag}</span>
          ))}
        </div>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="lh-stats">
            {stats.map((stat, idx) => {
              const icons = ['🏔️', '🚗', '👥', '🌿', '⛰️', '🌲'];
              return (
                <span key={idx} className="lh-stat">
                  <span className="lh-stat-icon">{icons[idx % icons.length]}</span>
                  <span className="lh-stat-text">{stat}</span>
                </span>
              );
            })}
          </div>
        )}

        {/* CTAs */}
        <div className="lh-ctas">
          <a
            href={`https://wa.me/919760446101?text=${encodeURIComponent(
              `Hi, I'm interested in visiting ${name}. Can you tell me more?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="lh-cta-primary"
          >
            Plan Your Visit <span className="arrow">→</span>
          </a>
          <Link href="#treks" className="lh-cta-secondary">
            Explore Treks
          </Link>
        </div>
      </div>
    </section>
  );
}