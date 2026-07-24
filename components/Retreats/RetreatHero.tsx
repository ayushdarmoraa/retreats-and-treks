'use client';

import Link from 'next/link';
import Image from 'next/image';
import { heroData } from '@/content/retreats/hero';

export default function RetreatHero() {
  return (
    <section className="rc-hero-section" style={{
      position: 'relative',
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      overflow: 'hidden',
      marginBottom: '0',
      marginTop: '-4px',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      background: '#ffffff',
    }}>
      <style>{`
        .rc-hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4rem 3rem 4rem 5rem;
          position: relative;
          z-index: 2;
          background: #ffffff;
        }
        .rc-hero-left::after {
          content: '';
          position: absolute;
          right: 0; top: 15%; bottom: 15%;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(15,118,110,0.12), transparent);
        }
        .rc-hero-eyebrow {
          display: flex; align-items: center;
          gap: 0.8rem; margin-bottom: 1.5rem;
        }
        .rc-hero-eyebrow-line {
          width: 36px;
          height: 1.5px;
          background: #0f766e;
          opacity: 0.2;
          border-radius: 2px;
        }
        .rc-hero-eyebrow-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #6b7280;
          font-weight: 500;
        }
        .rc-hero-heading {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(3.5rem, 5vw, 5rem);
          font-weight: 200;
          line-height: 1.02;
          color: #1a1814;
          letter-spacing: -0.04em;
          margin-bottom: 1.2rem;
        }
        .rc-hero-heading em {
          font-style: normal;
          color: #0f766e;
          font-weight: 200;
        }
        .rc-hero-sub {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          color: #6b7280;
          font-weight: 300;
          line-height: 1.9;
          max-width: 420px;
          margin-bottom: 2rem;
          letter-spacing: 0.01em;
        }
        .rc-hero-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .rc-hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 2.5rem;
          background: #0f766e;
          color: #ffffff;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid #0f766e;
        }
        .rc-hero-btn:hover {
          background: #0d6b64;
          border-color: #0d6b64;
        }
        .rc-hero-trust {
          display: flex;
          gap: 2.5rem;
          flex-wrap: wrap;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(0, 0, 0, 0.04);
        }
        .rc-hero-trust-item {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .rc-hero-trust-num {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.5rem;
          font-weight: 300;
          color: #0f766e;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .rc-hero-trust-label {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #9ca3af;
          font-weight: 400;
        }
        .rc-hero-right {
          position: relative;
          overflow: hidden;
        }
        .rc-hero-img-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .rc-hero-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .rc-hero-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(5,15,8,0.35) 0%, rgba(5,15,8,0.05) 45%, rgba(5,15,8,0.25) 100%);
        }
        .rc-hero-tag {
          position: absolute;
          bottom: 2.5rem;
          left: 2.5rem;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 100px;
          padding: 0.5rem 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .rc-hero-tag-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #0f766e;
          opacity: 0.5;
        }
        .rc-hero-tag-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.7);
          font-weight: 400;
          letter-spacing: 0.05em;
        }
        .rc-hero-altitude {
          position: absolute;
          top: 3rem;
          right: 2.5rem;
          text-align: right;
          z-index: 3;
        }
        .rc-hero-altitude-num {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.8rem;
          font-weight: 200;
          color: rgba(255,255,255,0.9);
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .rc-hero-altitude-unit {
          font-size: 0.45em;
          margin-left: 0.08em;
        }
        .rc-hero-altitude-label {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .rc-hero-scroll {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          z-index: 3;
        }
        .rc-hero-scroll-line {
          width: 1px;
          height: 32px;
          background: linear-gradient(to bottom, rgba(15,118,110,0.3), transparent);
          animation: rcScrollDrop 1.8s ease infinite;
        }
        .rc-hero-scroll-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.4rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.1);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
        @keyframes rcScrollDrop {
          0% { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
        @media (max-width: 1024px) {
          .rc-hero-left { padding: 4rem 2.5rem; }
          .rc-hero-heading { font-size: clamp(3rem, 4.5vw, 4.2rem); }
        }
        @media (max-width: 900px) {
          .rc-hero-section { grid-template-columns: 1fr; height: auto; }
          .rc-hero-left { padding: 5rem 2.5rem 3.5rem; order: 2; }
          .rc-hero-left::after { display: none; }
          .rc-hero-right { order: 1; height: 45vh; min-height: 280px; }
          .rc-hero-heading { font-size: clamp(2.5rem, 6vw, 3.5rem); }
          .rc-hero-sub { max-width: 100%; }
          .rc-hero-scroll { display: none; }
          .rc-hero-altitude { top: 1.5rem; right: 1.5rem; }
          .rc-hero-altitude-num { font-size: 1.5rem; }
          .rc-hero-tag { bottom: 1.5rem; left: 1.5rem; padding: 0.4rem 1rem; }
          .rc-hero-tag-text { font-size: 0.6rem; }
        }
        @media (max-width: 640px) {
          .rc-hero-left { padding: 4rem 1.5rem 2.5rem; }
          .rc-hero-heading { font-size: clamp(2rem, 5vw, 2.8rem); }
          .rc-hero-sub { font-size: 0.9rem; }
          .rc-hero-actions { flex-direction: column; width: 100%; }
          .rc-hero-btn { width: 100%; justify-content: center; font-size: 0.6rem; padding: 0.8rem 1.5rem; }
          .rc-hero-trust { gap: 1.5rem; }
          .rc-hero-right { height: 35vh; min-height: 200px; }
          .rc-hero-altitude { top: 1rem; right: 1rem; }
          .rc-hero-altitude-num { font-size: 1.2rem; }
          .rc-hero-altitude-label { font-size: 0.5rem; }
          .rc-hero-tag { bottom: 0.8rem; left: 0.8rem; padding: 0.3rem 0.8rem; }
          .rc-hero-tag-text { font-size: 0.55rem; }
          .rc-hero-eyebrow-text { font-size: 0.6rem; }
          .rc-hero-eyebrow-line { width: 28px; }
        }
        @media (max-width: 480px) {
          .rc-hero-left { padding: 3.5rem 1.2rem 2rem; }
          .rc-hero-heading { font-size: clamp(1.8rem, 4vw, 2.4rem); }
          .rc-hero-sub { font-size: 0.85rem; line-height: 1.7; }
          .rc-hero-btn { font-size: 0.55rem; padding: 0.7rem 1.2rem; }
          .rc-hero-trust-num { font-size: 1.2rem; }
          .rc-hero-right { height: 30vh; min-height: 160px; }
          .rc-hero-altitude-num { font-size: 1rem; }
          .rc-hero-tag-text { font-size: 0.5rem; }
        }
      `}</style>

      {/* LEFT */}
      <div className="rc-hero-left">
        <div className="rc-hero-eyebrow">
          <span className="rc-hero-eyebrow-line" />
          <span className="rc-hero-eyebrow-text">{heroData.eyebrow}</span>
        </div>

        <h1 className="rc-hero-heading">
          {heroData.heading}<br />
          <em>{heroData.accent}</em>
        </h1>

        <p className="rc-hero-sub">{heroData.description}</p>

        <div className="rc-hero-actions">
          <Link href="#explore-intentions" className="rc-hero-btn">
            Explore Our Retreats →
          </Link>
        </div>

        <div className="rc-hero-trust">
          {heroData.stats.map((stat) => (
            <div key={stat.num} className="rc-hero-trust-item">
              <span className="rc-hero-trust-num">{stat.num}</span>
              <span className="rc-hero-trust-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="rc-hero-right">
        <div className="rc-hero-img-wrap">
          <Image
            src={heroData.image}
            alt="Himalayas"
            width={1200}
            height={675}
            sizes="50vw"
            quality={85}
            priority
          />
          <div className="rc-hero-img-overlay" />
        </div>

        <div className="rc-hero-tag">
          <span className="rc-hero-tag-dot" />
          <span className="rc-hero-tag-text">{heroData.locations}</span>
        </div>

        <div className="rc-hero-altitude">
          <div className="rc-hero-altitude-num">
            {heroData.altitude}<span className="rc-hero-altitude-unit">{heroData.altitudeUnit}</span>
          </div>
          <div className="rc-hero-altitude-label">{heroData.altitudeLabel}</div>
        </div>

        <div className="rc-hero-scroll">
          <span className="rc-hero-scroll-text">Scroll</span>
          <span className="rc-hero-scroll-line" />
        </div>
      </div>
    </section>
  );
}