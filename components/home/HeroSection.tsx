// components/home/HeroSection.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { images } from '@/lib/images';

interface HeroSectionProps {}

export default function HeroSection({}: HeroSectionProps) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <section
        style={{
          position: 'relative',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a08',
          overflow: 'hidden',
        }}
      >
        <style>{`
          .hero-gajab {
            position: relative;
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          /* Background Image */
          .hero-bg {
            position: absolute;
            inset: 0;
            z-index: 0;
          }

          .hero-bg-image {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 50% 40%;
            filter: brightness(0.8) saturate(1.05) contrast(1.02);
          }

          /* ── LIGHT OVERLAY - Text uth ke dikhe ── */
          .hero-overlay {
            position: absolute;
            inset: 0;
            z-index: 1;
            background: 
              linear-gradient(180deg, 
                rgba(0, 0, 0, 0.10) 0%,
                rgba(0, 0, 0, 0.20) 30%,
                rgba(0, 0, 0, 0.35) 50%,
                rgba(0, 0, 0, 0.50) 70%,
                rgba(0, 0, 0, 0.70) 100%
              );
          }

          /* Decorative Orbs - More visible */
          .hero-orb {
            position: absolute;
            top: -10%;
            right: -5%;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(15, 118, 110, 0.08), transparent 70%);
            filter: blur(120px);
            pointer-events: none;
            z-index: 1;
          }

          .hero-orb-2 {
            position: absolute;
            bottom: -10%;
            left: -5%;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(139, 115, 85, 0.05), transparent 70%);
            filter: blur(120px);
            pointer-events: none;
            z-index: 1;
          }

          /* ── CONTENT ── */
          .hero-content {
            position: relative;
            z-index: 4;
            width: 100%;
            max-width: 84rem;
            margin: 0 auto;
            padding: 0 clamp(2rem, 5vw, 5rem);
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            text-align: left;
            height: 100vh;
          }

          @media (max-width: 968px) {
            .hero-content {
              align-items: center;
              text-align: center;
              padding: 0 clamp(1.5rem, 4vw, 2.5rem);
            }
          }

          /* ── BRAND - Premium ── */
          .hero-brand {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 0.7rem;
            letter-spacing: 0.4em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.35);
            font-weight: 500;
            margin-bottom: 2.5rem;
            display: flex;
            align-items: center;
            gap: 0.8rem;
          }

          .hero-brand-line {
            width: 44px;
            height: 1.5px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
          }

          .hero-brand span {
            color: rgba(15, 118, 110, 0.4);
          }

          /* ── HEADLINE ── */
          .hero-headline {
            font-family: 'Cormorant Garamond', serif;
            font-weight: 400;
            font-size: clamp(3.5rem, 8vw, 7.5rem);
            color: #ffffff;
            letter-spacing: 0.02em;
            line-height: 0.9;
            margin: 0 0 1.2rem;
          }

          .hero-headline-line {
            display: block;
          }

          .hero-headline-line:first-child {
            color: rgba(255, 255, 255, 0.85);
          }

          .hero-headline-line:last-child {
            color: #ffffff;
            position: relative;
            display: inline-block;
          }

          .hero-headline-line:last-child::after {
            content: '';
            position: absolute;
            bottom: 6px;
            left: 0;
            right: 0;
            height: 4px;
            background: rgba(15, 118, 110, 0.12);
            border-radius: 4px;
            width: 100%;
          }

          @media (max-width: 968px) {
            .hero-headline {
              font-size: clamp(2.8rem, 7vw, 4.8rem);
            }
            .hero-headline-line:last-child::after {
              bottom: 3px;
              height: 3px;
            }
          }

          /* ── SUB TEXT ── */
          .hero-sub {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 1.05rem;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.6);
            line-height: 1.9;
            max-width: 480px;
            margin: 0 0 2.5rem;
            letter-spacing: 0.01em;
          }

          .hero-sub strong {
            color: rgba(255, 255, 255, 0.85);
            font-weight: 400;
          }

          @media (max-width: 968px) {
            .hero-sub {
              max-width: 100%;
              font-size: 0.95rem;
              text-align: center;
              margin-bottom: 2rem;
            }
          }

          /* ── STATS ── */
          .hero-stats {
            display: flex;
            gap: 3rem;
            flex-wrap: wrap;
            margin-bottom: 2.8rem;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            padding-top: 2rem;
          }

          .hero-stat {
            display: flex;
            flex-direction: column;
          }

          .hero-stat-number {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 1.4rem;
            font-weight: 300;
            color: #ffffff;
            letter-spacing: -0.02em;
          }

          .hero-stat-number span {
            color: #0f766e;
          }

          .hero-stat-label {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 0.55rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.2);
            font-weight: 400;
            margin-top: 0.1rem;
          }

          @media (max-width: 968px) {
            .hero-stats {
              justify-content: center;
              gap: 2rem;
              padding-top: 1.5rem;
            }
            .hero-stat-number {
              font-size: 1.2rem;
            }
          }

          /* ── CTAS ── */
          .hero-ctas {
            display: flex;
            align-items: center;
            gap: 1.2rem;
            flex-wrap: wrap;
          }

          @media (max-width: 968px) {
            .hero-ctas {
              justify-content: center;
            }
          }

          @media (max-width: 640px) {
            .hero-ctas {
              flex-direction: column;
              width: 100%;
              gap: 0.8rem;
            }
            .hero-cta-primary,
            .hero-cta-ghost {
              width: 100%;
              justify-content: center;
            }
          }

          /* Primary Button */
          .hero-cta-primary {
            display: inline-flex;
            align-items: center;
            gap: 0.8rem;
            padding: 1rem 2.8rem;
            background: #0f766e;
            color: #ffffff;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            text-decoration: none;
            border-radius: 100px;
            transition: all 0.3s ease;
            border: 1px solid #0f766e;
          }

          .hero-cta-primary:hover {
            background: #0d5f58;
            border-color: #0d5f58;
            box-shadow: 0 8px 32px rgba(15, 118, 110, 0.25);
            gap: 1rem;
          }

          .hero-cta-arrow {
            font-size: 1rem;
            transition: transform 0.3s ease;
          }

          .hero-cta-primary:hover .hero-cta-arrow {
            transform: translateX(4px);
          }

          /* Ghost Button */
          .hero-cta-ghost {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            padding: 1rem 2.2rem;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 0.7rem;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #ffffff;
            text-decoration: none;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 100px;
            transition: all 0.3s ease;
            background: transparent;
          }

          .hero-cta-ghost:hover {
            background: rgba(15, 118, 110, 0.12);
            border-color: #0f766e;
            transform: scale(1.04);
            box-shadow: 0 8px 24px rgba(15, 118, 110, 0.1);
            gap: 0.9rem;
          }

          .hero-cta-ghost-icon {
            font-size: 0.8rem;
            opacity: 0.4;
            transition: opacity 0.3s ease;
          }

          .hero-cta-ghost:hover .hero-cta-ghost-icon {
            opacity: 1;
          }

          /* ── BOTTOM BAR ── */
          .hero-bottom {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 4;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: clamp(1rem, 2vw, 1.5rem) clamp(2rem, 5vw, 5rem);
            border-top: 1px solid rgba(255, 255, 255, 0.03);
            background: rgba(10, 10, 8, 0.05);
          }

          .hero-scroll {
            display: flex;
            align-items: center;
            gap: 0.8rem;
          }

          .hero-scroll-track {
            position: relative;
            width: 1px;
            height: 32px;
            background: rgba(255, 255, 255, 0.06);
            overflow: hidden;
          }

          .hero-scroll-drop {
            position: absolute;
            left: 0;
            top: -30%;
            width: 1px;
            height: 30%;
            background: #0f766e;
            animation: scrollDrop 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          }

          @keyframes scrollDrop {
            0% { top: -30%; }
            60% { top: 100%; }
            100% { top: 100%; }
          }

          .hero-scroll-text {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 0.5rem;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.08);
            font-weight: 300;
          }

          .hero-coords {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 0.5rem;
            letter-spacing: 0.1em;
            color: rgba(255, 255, 255, 0.06);
            font-weight: 300;
          }

          @media (max-width: 968px) {
            .hero-coords { display: none; }
            .hero-bottom {
              padding: 0.8rem 1.5rem;
            }
            .hero-orb {
              display: none;
            }
            .hero-orb-2 {
              display: none;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-scroll-drop {
              animation: none !important;
            }
          }
        `}</style>

        <div className="hero-gajab">
          {/* ── BACKGROUND ── */}
          <div className="hero-bg">
            <Image
              src={images.heroes.heroimage.src}
              alt="Himalayan mountain landscape"
              width={1920}
              height={1080}
              priority
              fetchPriority="high"
              sizes="100vw"
              quality={95}
              loading="eager"
              decoding="async"
              className="hero-bg-image"
            />
          </div>
          
          {/* ── LIGHT OVERLAY ── */}
          <div className="hero-overlay" />
          
          {/* Decorative Orbs */}
          <div className="hero-orb" />
          <div className="hero-orb-2" />

          {/* ── CONTENT ── */}
          <div className="hero-content">
            {/* BRAND - WAPAS LAAYA */}
            <div className="hero-brand">
              <span className="hero-brand-line" />
              Himalayan <span>·</span> Retreats
            </div>

            <h1 className="hero-headline">
              <span className="hero-headline-line">Journeys into</span>
              <span className="hero-headline-line">the Himalayas</span>
            </h1>

            <p className="hero-sub">
              Not a package. Not a template. <strong>A journey designed around you.</strong>
            </p>

            {/* Stats */}
            <div className="hero-stats">
              {[
                { number: '8+', label: 'Locations' },
                { number: '100%', label: 'Custom' },
                { number: '1:1', label: 'Consult' },
              ].map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <div className="hero-stat-number">
                    {stat.number} <span>·</span>
                  </div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-ctas">
              <Link href="/retreats" className="hero-cta-primary">
                Plan My Retreat
                <span className="hero-cta-arrow">→</span>
              </Link>
              <a
                href="https://wa.me/919760446101?text=Hi%2C%20I%20want%20to%20plan%20a%20custom%20retreat."
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-ghost"
              >
                <span>WhatsApp Now</span>
                <span className="hero-cta-ghost-icon">↗</span>
              </a>
            </div>
          </div>

          {/* ── BOTTOM ── */}
          <div className="hero-bottom">
            <div className="hero-scroll">
              <div className="hero-scroll-track">
                <span className="hero-scroll-drop" />
              </div>
              <span className="hero-scroll-text">Scroll</span>
            </div>
            <span className="hero-coords">30.0668° N · 79.0193° E</span>
          </div>
        </div>
      </section>
    </>
  );
}
