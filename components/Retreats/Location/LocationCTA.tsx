'use client';

import Link from 'next/link';
import { locationCtaContent } from '@/content/retreats/location/cta';
import { logWhatsAppOpen } from '@/lib/analytics';

interface LocationCTAProps {
  locationId: string;
  networkContext: string;
  ctaText: string;
  whatsappLink: string;
}

export default function LocationCTA({
  locationId,
  networkContext,
  ctaText,
  whatsappLink,
}: LocationCTAProps) {
  const content = locationCtaContent;

  return (
    <section style={{
      width: '100%',
      position: 'relative',
      background: '#ffffff',
      overflow: 'hidden',
      borderTop: '1px solid rgba(0,0,0,0.04)',
    }}>
      <style>{`
        .cta-glow {
          position: absolute;
          top: -100px;
          left: -80px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(15,118,110,0.04) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-glow-r {
          position: absolute;
          bottom: -120px;
          right: -60px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(15,118,110,0.03) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-rule {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(15,118,110,0.15) 30%, rgba(15,118,110,0.15) 70%, transparent);
        }
        .cta-inner {
          max-width: 52rem;
          margin: 0 auto;
          padding: 6rem 2rem;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 5rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .cta-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .cta-eyebrow-line {
          width: 30px;
          height: 2px;
          background: #0f766e;
          flex-shrink: 0;
          border-radius: 2px;
        }
        .cta-eyebrow-text {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8B877C;
          font-weight: 500;
        }
        .cta-network {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          line-height: 1.9;
          color: rgba(43,42,38,0.55);
          font-weight: 300;
          margin: 0 0 1.5rem;
        }
        .cta-ctatext {
          font-family: var(--font-inter), sans-serif;
          font-size: 1rem;
          line-height: 1.85;
          color: #2B2A26;
          font-weight: 300;
          margin: 0;
        }
        .cta-card {
          background: #FAF8F4;
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: 16px;
          padding: 2.5rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          position: relative;
          overflow: hidden;
        }
        .cta-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #0f766e;
          opacity: 0.3;
        }
        .cta-card-title {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 1rem;
          font-weight: 600;
          color: #2B2A26;
          margin: 0 0 0.4rem;
          letter-spacing: -0.01em;
        }
        .cta-card-sub {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.82rem;
          color: rgba(43,42,38,0.45);
          font-weight: 300;
          line-height: 1.7;
          margin: 0 0 2rem;
        }
        .cta-btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 14px 28px;
          background: #2B2A26;
          color: #ffffff;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          margin-bottom: 0.85rem;
          position: relative;
          overflow: hidden;
        }
        .cta-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%);
          pointer-events: none;
        }
        .cta-btn-primary:hover {
          background: #0f766e;
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(15,118,110,0.25);
        }
        .cta-btn-ghost {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 13px 28px;
          background: transparent;
          color: #2B2A26;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.62rem;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .cta-btn-ghost:hover {
          border-color: #0f766e;
          color: #0f766e;
          transform: translateY(-2px);
        }
        @media (max-width: 800px) {
          .cta-inner {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 4rem 1.5rem;
          }
        }
        @media (max-width: 480px) {
          .cta-inner { padding: 3rem 1.2rem; }
          .cta-card { padding: 1.5rem; }
          .cta-network { font-size: 0.88rem; }
          .cta-ctatext { font-size: 0.92rem; }
        }
      `}</style>

      <div className="cta-glow" />
      <div className="cta-glow-r" />
      <div className="cta-rule" />

      <div className="cta-inner">
        <div>
          <div className="cta-eyebrow">
            <span className="cta-eyebrow-line" />
            <span className="cta-eyebrow-text">{content.eyebrow}</span>
          </div>
          <p className="cta-network">{networkContext}</p>
          <p className="cta-ctatext">{ctaText}</p>
        </div>

        <div className="cta-card">
          <h3 className="cta-card-title">{content.cardTitle}</h3>
          <p className="cta-card-sub">{content.cardSub}</p>

          <Link
            href={whatsappLink}
            onClick={() => logWhatsAppOpen(locationId, 'location-hub')}
            className="cta-btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.buttonText}
          </Link>

          <Link href="/retreats" className="cta-btn-ghost">
            {content.secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
