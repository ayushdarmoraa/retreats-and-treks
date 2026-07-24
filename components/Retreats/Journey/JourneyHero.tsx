'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { journeyHeroContent } from '@/content/retreats/Journey/hero';

interface JourneyHeroProps {
  title: string;
  oneLineEssence: string;
  keyHighlights?: readonly string[];
  heroImage?: string;
  heroAlt?: string;
  isYogaJourney?: boolean;
}

/** Point on a cubic bezier at parameter t, used to place waypoint dots on the trail. */
function bezierPoint(
  t: number,
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number]
): [number, number] {
  const mt = 1 - t;
  const x =
    mt * mt * mt * p0[0] +
    3 * mt * mt * t * p1[0] +
    3 * mt * t * t * p2[0] +
    t * t * t * p3[0];
  const y =
    mt * mt * mt * p0[1] +
    3 * mt * mt * t * p1[1] +
    3 * mt * t * t * p2[1] +
    t * t * t * p3[1];
  return [x, y];
}

const TRAIL_P0: [number, number] = [64, 24];
const TRAIL_P1: [number, number] = [248, 190];
const TRAIL_P2: [number, number] = [8, 470];
const TRAIL_P3: [number, number] = [168, 700];
const TRAIL_D = `M ${TRAIL_P0[0]} ${TRAIL_P0[1]} C ${TRAIL_P1[0]} ${TRAIL_P1[1]}, ${TRAIL_P2[0]} ${TRAIL_P2[1]}, ${TRAIL_P3[0]} ${TRAIL_P3[1]}`;

export default function JourneyHero({
  title,
  oneLineEssence,
  keyHighlights,
  heroImage,
  heroAlt,
  isYogaJourney = false,
}: JourneyHeroProps) {
  const content = journeyHeroContent;
  const highlights = keyHighlights && keyHighlights.length > 0 ? keyHighlights.slice(0, 5) : [];

  // Full-bleed regardless of any ancestor container: measure this element's
  // actual offset from the viewport edge and correct for it directly, instead
  // of relying on CSS tricks that assume a centered parent.
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

  // Evenly-spaced waypoints along the trail, one per highlight.
  const waypoints = highlights.map((label, i) => {
    const t = highlights.length === 1 ? 0.5 : 0.1 + (i / (highlights.length - 1)) * 0.8;
    const [x, y] = bezierPoint(t, TRAIL_P0, TRAIL_P1, TRAIL_P2, TRAIL_P3);
    return { label, x, y, t };
  });

  const titleParts = title.includes('Retreat')
    ? { lead: title.replace(' Retreat', ''), accent: 'Retreat' }
    : { lead: title, accent: null as string | null };

  return (
    <section
      ref={sectionRef}
      className={`jh-hero ${isYogaJourney ? 'jh-hero--pine' : ''}`}
      style={{ width: bleed.width, marginLeft: bleed.marginLeft, marginRight: 0 }}
    >
      <style>{`
        .jh-hero {
          --text: #F6F2E7;
          --text-soft: rgba(246,242,231,0.78);
          --text-faint: rgba(246,242,231,0.5);
          --brand: #0f766e;
          --brand-hover: #0d6b64;
          --trail: #0f766e;
          --gold: #0f766e;
          --line: rgba(246,242,231,0.22);
          --overlay-a: rgba(6,20,18,0.86);
          --overlay-b: rgba(6,20,18,0.62);
          --overlay-c: rgba(6,20,18,0.4);
          --fallback-bg: linear-gradient(135deg, #123832, #061412);

          position: relative;
          width: 100%;
          min-height: clamp(600px, 82vh, 820px);
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--fallback-bg);
        }
        .jh-hero--pine {
          --trail: #0d5c56;
          --gold: #0d5c56;
          --overlay-a: rgba(4,15,13,0.88);
          --overlay-b: rgba(4,15,13,0.66);
          --overlay-c: rgba(4,15,13,0.42);
          --fallback-bg: linear-gradient(135deg, #0B2622, #04100E);
        }

        .jh-hero-media {
          position: absolute;
          inset: -2%;
          z-index: 0;
          animation: jh-kenburns 26s ease-out forwards;
          will-change: transform;
        }
        .jh-hero-media img {
          object-fit: cover;
          filter: saturate(0.8) contrast(0.96) brightness(0.92) blur(0.5px);
        }
        @keyframes jh-kenburns {
          from { transform: scale(1.03); }
          to { transform: scale(1); }
        }

        /* Legibility scrim: darkens the whole photo evenly so it reads as an
           atmospheric backdrop rather than the focal point, slightly deeper
           under the text column */
        .jh-hero-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(100deg, var(--overlay-a) 0%, var(--overlay-b) 45%, var(--overlay-c) 100%);
          pointer-events: none;
        }
        .jh-hero-grain {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.5;
          mix-blend-mode: overlay;
          pointer-events: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/></svg>");
        }
        .jh-hero-scrim::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(4,10,9,0.35) 0%, transparent 26%, transparent 66%, rgba(4,10,9,0.5) 100%),
            linear-gradient(135deg, rgba(15,118,110,0.14), transparent 55%);
        }
        @media (prefers-reduced-motion: reduce) {
          .jh-hero-media { animation: none; }
        }

        .jh-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 100rem;
          margin: 0 auto;
          padding: 4.5rem clamp(2rem, 6vw, 6rem);
          width: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: center;
        }

        /* ---------- Text column ---------- */
        .jh-eyebrow {
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
        .jh-eyebrow-ring {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1.5px solid var(--trail);
          background: rgba(246,242,231,0.55);
          box-shadow: 0 0 6px rgba(246,242,231,0.35);
          position: relative;
          flex-shrink: 0;
        }
        .jh-eyebrow-ring::after {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          width: 4px; height: 4px;
          background: var(--trail);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .jh-eyebrow-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--text-soft);
          font-weight: 500;
        }

        .jh-title {
          font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 500;
          font-size: clamp(2.6rem, 4.2vw, 4.1rem);
          letter-spacing: -0.02em;
          line-height: 1.12;
          color: var(--text);
          margin: 0 0 1.6rem;
          max-width: 660px;
          text-wrap: balance;
          text-shadow: 0 2px 30px rgba(0,0,0,0.35);
        }
        .jh-title .jh-accent {
          position: relative;
          display: inline-block;
        }
        .jh-title .jh-accent svg {
          position: absolute;
          left: -2%;
          bottom: -0.16em;
          width: 104%;
          height: 0.3em;
          overflow: visible;
        }
        .jh-title .jh-accent path {
          fill: none;
          stroke: var(--gold);
          stroke-width: 3;
          stroke-linecap: round;
          filter: drop-shadow(0 0 3px rgba(246,242,231,0.55));
        }

        .jh-essence {
          font-family: var(--font-inter), sans-serif;
          font-weight: 300;
          font-size: 1.08rem;
          line-height: 1.75;
          color: var(--text-soft);
          max-width: 480px;
          margin: 0 0 2.4rem;
        }
        .jh-essence em {
          font-family: var(--font-fraunces), Georgia, serif;
          font-style: italic;
          color: var(--text);
        }
        .jh-essence strong {
          color: var(--text);
          font-weight: 500;
        }

        /* Mobile-only compact waypoint list, hidden on desktop */
        .jh-waylist {
          display: none;
        }

        .jh-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.9rem;
        }
        .jh-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 1rem 2.2rem;
          background: var(--brand);
          color: #ffffff;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 100px;
          border: 1px solid var(--brand);
          box-shadow: 0 10px 30px rgba(0,0,0,0.28);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .jh-cta-primary:hover {
          background: var(--brand-hover);
          border-color: var(--brand-hover);
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(0,0,0,0.34);
        }

        .jh-cta-secondary {
          display: inline-flex;
          align-items: center;
          padding: 1rem 1.9rem;
          background: rgba(20,15,10,0.22);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          color: var(--text);
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 100px;
          border: 1px solid var(--line);
          transition: border-color 0.35s ease, color 0.35s ease, transform 0.35s ease, background 0.35s ease;
        }
        .jh-cta-secondary:hover {
          border-color: var(--trail);
          color: var(--trail);
          background: rgba(20,15,10,0.34);
          transform: translateY(-2px);
        }

        /* ---------- Trail column (signature element) ---------- */
        .jh-trail-col {
          position: relative;
          height: 480px;
        }
        .jh-trail-svg { width: 100%; height: 100%; overflow: visible; }
        .jh-trail-path {
          fill: none;
          stroke: var(--text-faint);
          stroke-width: 1.6;
          stroke-dasharray: 6 7;
          opacity: 0.7;
        }
        .jh-trail-path--draw {
          stroke: var(--trail);
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          pathLength: 1;
          animation: jh-draw 2.4s cubic-bezier(0.65,0,0.35,1) 0.2s forwards;
          opacity: 0.95;
          stroke-width: 2;
          filter: drop-shadow(0 0 2.5px rgba(246,242,231,0.5));
        }
        @keyframes jh-draw {
          to { stroke-dashoffset: 0; }
        }
        .jh-waypoint {
          opacity: 0;
          animation: jh-pop 0.5s ease forwards;
        }
        @keyframes jh-pop {
          from { opacity: 0; transform: scale(0.4); }
          to { opacity: 1; transform: scale(1); }
        }
        .jh-waypoint-dot {
          fill: rgba(246,242,231,0.85);
          stroke: var(--gold);
          stroke-width: 2.5;
        }
        .jh-waypoint-core {
          fill: var(--gold);
        }
        .jh-waypoint-label {
          position: absolute;
          transform: translate(14px, -50%);
          font-family: var(--font-inter), sans-serif;
          font-size: 0.66rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--text);
          padding: 0.3rem 0.6rem;
          background: rgba(15,11,7,0.4);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border-radius: 6px;
          white-space: normal;
          max-width: 150px;
          line-height: 1.3;
        }
        .jh-trail-end {
          fill: var(--text-faint);
        }

        @media (prefers-reduced-motion: reduce) {
          .jh-trail-path--draw { animation: none; stroke-dashoffset: 0; opacity: 0.9; }
          .jh-waypoint { animation: none; opacity: 1; }
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 980px) {
          .jh-hero-inner {
            grid-template-columns: 1fr;
            padding: 5rem 2.4rem;
          }
          .jh-trail-col { display: none; }
          .jh-waylist {
            display: flex;
            flex-direction: column;
            gap: 0.7rem;
            margin: 0 0 2.4rem;
            padding-left: 1rem;
            border-left: 1.5px dashed var(--line);
          }
          .jh-waylist-item {
            display: flex;
            align-items: center;
            gap: 0.7rem;
          }
          .jh-waylist-dot {
            width: 7px; height: 7px;
            border-radius: 50%;
            background: var(--gold);
            flex-shrink: 0;
          }
          .jh-waylist-text {
            font-family: var(--font-inter), sans-serif;
            font-size: 0.7rem;
            font-weight: 500;
            letter-spacing: 0.03em;
            color: var(--text-soft);
          }
        }
        @media (max-width: 560px) {
          .jh-hero-inner { padding: 4rem 1.3rem; }
          .jh-title { font-size: clamp(2.1rem, 7vw, 2.7rem); }
          .jh-essence { font-size: 0.95rem; }
          .jh-ctas { flex-direction: column; align-items: stretch; }
          .jh-cta-primary, .jh-cta-secondary { justify-content: center; }
        }
      `}</style>

      {heroImage && (
        <div className="jh-hero-media">
          <Image
            src={heroImage}
            alt={heroAlt || title}
            fill
            priority
            quality={92}
            sizes="100vw"
          />
        </div>
      )}
      <div className="jh-hero-scrim" />
      <div className="jh-hero-grain" />

      <div className="jh-hero-inner">
        <div>
          <div className="jh-eyebrow">
            <span className="jh-eyebrow-ring" />
            <span className="jh-eyebrow-text">{content.eyebrow}</span>
          </div>

          <h1 className="jh-title">
            {titleParts.lead}
            {titleParts.accent && (
              <>
                {' '}
                <span className="jh-accent">
                  {titleParts.accent}
                  <svg viewBox="0 0 200 20" preserveAspectRatio="none">
                    <path d="M2 12 C 50 4, 150 18, 198 8" />
                  </svg>
                </span>
              </>
            )}
          </h1>

          <p className="jh-essence">{oneLineEssence}</p>

          {highlights.length > 0 && (
            <div className="jh-waylist">
              {highlights.map((h, i) => (
                <div className="jh-waylist-item" key={i}>
                  <span className="jh-waylist-dot" />
                  <span className="jh-waylist-text">{h}</span>
                </div>
              ))}
            </div>
          )}

          <div className="jh-ctas">
            <a
              href={`https://wa.me/919760446101?text=${encodeURIComponent(
                `Hi, I'm interested in the ${title} retreat. Can you tell me more?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="jh-cta-primary"
            >
              {content.ctaPrimary}
            </a>
            <a href="#about-this-retreat" className="jh-cta-secondary">
              {content.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Signature element: the journey trail, waypoints = key highlights */}
        <div className="jh-trail-col" aria-hidden="true">
          <svg className="jh-trail-svg" viewBox="0 0 260 730">
            <path className="jh-trail-path" d={TRAIL_D} />
            <path className="jh-trail-path jh-trail-path--draw" d={TRAIL_D} pathLength={1} />
            <circle className="jh-trail-end" cx={TRAIL_P3[0]} cy={TRAIL_P3[1]} r="3" />
            {waypoints.map((w, i) => (
              <g
                key={i}
                className="jh-waypoint"
                style={{ animationDelay: `${0.6 + i * 0.22}s` }}
              >
                <circle className="jh-waypoint-dot" cx={w.x} cy={w.y} r="7" />
                <circle className="jh-waypoint-core" cx={w.x} cy={w.y} r="2.4" />
              </g>
            ))}
          </svg>
          {waypoints.map((w, i) => (
            <span
              key={i}
              className="jh-waypoint-label"
              style={{
                left: `${(w.x / 260) * 100}%`,
                top: `${(w.y / 730) * 100}%`,
              }}
            >
              {w.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}