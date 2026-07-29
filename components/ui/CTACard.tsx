'use client';

import Link from 'next/link';

interface CTACardProps {
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  stats: Array<{ num: string; label: string }>;
  priceLabel: string;
  buttonText: string;
  buttonLink: string;
  buttonOnClick?: () => void;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  tags: string[];
  className?: string;
}

export default function CTACard({
  eyebrow,
  headline,
  accent,
  description,
  stats,
  priceLabel,
  buttonText,
  buttonLink,
  buttonOnClick,
  secondaryButtonText,
  secondaryButtonLink,
  tags,
  className = '',
}: CTACardProps) {
  return (
    <section className={`ui-cta-section ${className}`}>
      <style>{`
        .ui-cta-section {
          position: relative;
          background: #ffffff;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          padding: 7rem 0;
          overflow: hidden;
          border-top: 1px solid rgba(0, 0, 0, 0.04);
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }
        .ui-cta-glow {
          position: absolute;
          top: -30%;
          right: -10%;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(15,118,110,0.04), transparent 70%);
          pointer-events: none;
        }
        .ui-cta-glow-2 {
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139,115,85,0.03), transparent 70%);
          pointer-events: none;
        }
        .ui-cta-inner {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
          position: relative;
          z-index: 1;
        }
        .ui-cta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .ui-cta-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }
        .ui-cta-eyebrow-line {
          width: 36px;
          height: 1px;
          background: #0f766e;
          opacity: 0.3;
        }
        .ui-cta-eyebrow-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #6b7280;
          font-weight: 500;
        }
        .ui-cta-headline {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(2.8rem, 4.5vw, 4rem);
          font-weight: 200;
          letter-spacing: -0.04em;
          color: #1a1814;
          line-height: 1.05;
          margin: 0 0 0.5rem;
        }
        .ui-cta-headline .accent {
          color: #0f766e;
          font-weight: 200;
          display: block;
          position: relative;
        }
        .ui-cta-divider {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, #0f766e, rgba(15, 118, 110, 0.05));
          margin: 1.5rem 0;
          border-radius: 4px;
        }
        .ui-cta-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.95rem;
          line-height: 2;
          color: #6b7280;
          font-weight: 300;
          max-width: 420px;
          margin: 0 0 2rem;
        }
        .ui-cta-points {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .ui-cta-point {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .ui-cta-point-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #0f766e;
          opacity: 0.2;
          flex-shrink: 0;
        }
        .ui-cta-point-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.85rem;
          color: #6b7280;
          font-weight: 300;
        }
        .ui-cta-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 24px;
          padding: 3rem 2.8rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04), 0 12px 40px rgba(0, 0, 0, 0.03);
        }
        .ui-cta-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 2rem;
        }
        .ui-cta-stat {
          text-align: center;
          padding: 1.2rem 0.5rem;
          background: #fafafa;
          border-right: 1px solid rgba(0, 0, 0, 0.04);
        }
        .ui-cta-stat:last-child { border-right: none; }
        .ui-cta-stat-num {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.5rem;
          font-weight: 200;
          color: #0f766e;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 0.2rem;
        }
        .ui-cta-stat-label {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.5rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #6b7280;
        }
        .ui-cta-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.3rem;
        }
        .ui-cta-price-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: #1a1814;
          letter-spacing: -0.01em;
          margin: 0;
        }
        .ui-cta-price-badge {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          color: #0f766e;
          background: rgba(15,118,110,0.06);
          padding: 0.3rem 0.8rem;
          border-radius: 100px;
          border: 1px solid rgba(15,118,110,0.04);
          letter-spacing: 0.02em;
        }
        .ui-cta-desc-small {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.85rem;
          color: #6b7280;
          font-weight: 300;
          line-height: 1.8;
          margin: 0 0 1.8rem;
        }
        .ui-cta-desc-small span {
          display: block;
          color: #9ca3af;
          margin-top: 0.2rem;
          font-size: 0.8rem;
        }
        .ui-cta-btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          width: 100%;
          padding: 0.9rem 2rem;
          background: #0f766e;
          color: #ffffff;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border: none;
          border-radius: 100px;
          cursor: pointer;
          margin-bottom: 0.75rem;
          text-decoration: none;
        }
        .ui-cta-btn-primary:hover { background: #0d6b64; }
        .ui-cta-btn-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.8rem 2rem;
          background: transparent;
          color: #6b7280;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.6rem;
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 100px;
          cursor: pointer;
          text-decoration: none;
        }
        .ui-cta-btn-secondary:hover {
          border-color: #0f766e;
          color: #0f766e;
        }
        .ui-cta-tags {
          margin-top: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.2rem;
          flex-wrap: wrap;
        }
        .ui-cta-tag {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.5rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #9ca3af;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .ui-cta-tag-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #0f766e;
          opacity: 0.2;
        }
        @media (max-width: 1024px) {
          .ui-cta-inner { padding: 0 3rem; }
        }
        @media (max-width: 900px) {
          .ui-cta-grid { grid-template-columns: 1fr; gap: 3rem; }
          .ui-cta-inner { padding: 0 2rem; }
          .ui-cta-headline { font-size: clamp(2.2rem, 7vw, 3.2rem); }
        }
        @media (max-width: 640px) {
          .ui-cta-section { padding: 5rem 0; }
          .ui-cta-inner { padding: 0 1.5rem; }
          .ui-cta-card { padding: 2rem 1.5rem; }
          .ui-cta-headline { font-size: clamp(2rem, 8vw, 2.8rem); }
          .ui-cta-desc { font-size: 0.9rem; }
          .ui-cta-point-text { font-size: 0.82rem; }
          .ui-cta-stat-num { font-size: 1.2rem; }
          .ui-cta-price-title { font-size: 0.9rem; }
          .ui-cta-btn-primary { font-size: 0.6rem; padding: 0.8rem 1.5rem; }
          .ui-cta-btn-secondary { font-size: 0.55rem; padding: 0.7rem 1.5rem; }
        }
        @media (max-width: 480px) {
          .ui-cta-inner { padding: 0 1.2rem; }
          .ui-cta-card { padding: 1.5rem 1.2rem; }
          .ui-cta-headline { font-size: clamp(1.8rem, 7vw, 2.5rem); }
          .ui-cta-stats { grid-template-columns: repeat(3, 1fr); }
          .ui-cta-stat { padding: 0.8rem 0.3rem; }
          .ui-cta-stat-num { font-size: 1rem; }
          .ui-cta-price-badge { font-size: 0.6rem; }
          .ui-cta-tags { gap: 0.8rem; }
          .ui-cta-tag { font-size: 0.45rem; }
        }
      `}</style>
      
      <div className="ui-cta-glow" />
      <div className="ui-cta-glow-2" />
      
      <div className="ui-cta-inner">
        <div className="ui-cta-grid">
          {/* Left */}
          <div>
            <div className="ui-cta-eyebrow">
              <span className="ui-cta-eyebrow-line" />
              <span className="ui-cta-eyebrow-text">{eyebrow}</span>
            </div>
            <h2 className="ui-cta-headline">
              {headline}
              <span className="accent">{accent}</span>
            </h2>
            <div className="ui-cta-divider" />
            <p className="ui-cta-desc">{description}</p>
            <div className="ui-cta-points">
              {tags.map((text) => (
                <div key={text} className="ui-cta-point">
                  <span className="ui-cta-point-dot" />
                  <span className="ui-cta-point-text">{text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Card */}
          <div className="ui-cta-card">
            <div className="ui-cta-stats">
              {stats.map((s) => (
                <div key={s.num} className="ui-cta-stat">
                  <div className="ui-cta-stat-num">{s.num}</div>
                  <div className="ui-cta-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            
            <div className="ui-cta-price-row">
              <h3 className="ui-cta-price-title">Start with a conversation</h3>
              <span className="ui-cta-price-badge">{priceLabel}</span>
            </div>
            
            <p className="ui-cta-desc-small">
              No forms, no checkout. Just tell us what you're looking for — we'll take it from there.
              <span>Custom pricing based on your plan.</span>
            </p>
            
            {buttonOnClick ? (
              <button onClick={buttonOnClick} className="ui-cta-btn-primary">
                {buttonText}
              </button>
            ) : (
              <Link href={buttonLink} className="ui-cta-btn-primary">
                {buttonText}
              </Link>
            )}
            
            {secondaryButtonText && secondaryButtonLink && (
              <Link href={secondaryButtonLink} className="ui-cta-btn-secondary">
                {secondaryButtonText}
              </Link>
            )}
            
            <div className="ui-cta-tags">
              {['Small groups', 'No fixed dates', 'Fully custom'].map((t, i) => (
                <span key={t} className="ui-cta-tag">
                  {i !== 0 && <span className="ui-cta-tag-dot" />}
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
