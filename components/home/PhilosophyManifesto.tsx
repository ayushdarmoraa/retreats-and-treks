'use client';

import { Section } from '@/components/ui';

interface PhilosophyManifestoProps {
  eyebrow: string;
  headline: string;
  accentWords: number; // last N words accent color mein
  body: string;
  className?: string;
}

export default function PhilosophyManifesto({
  eyebrow,
  headline,
  accentWords,
  body,
  className = '',
}: PhilosophyManifestoProps) {
  const words = headline.trim().split(' ');
  const accent = words.slice(words.length - accentWords).join(' ');
  const lead = words.slice(0, words.length - accentWords).join(' ');

  return (
    <Section
      className={className}
      style={{
        padding: '7rem 0',
        background: '#ffffff',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
      }}
    >
      <style>{`
        .manifesto-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
          position: relative;
          z-index: 1;
        }

        .manifesto-header {
          text-align: center;
          margin-bottom: 3rem;
          animation: fadeUp 0.8s ease 0.1s both;
        }

        .manifesto-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }
        .manifesto-badge-line {
          width: 36px;
          height: 1.5px;
          background: #0f766e;
          opacity: 0.25;
          border-radius: 2px;
        }
        .manifesto-badge-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #6b7280;
          font-weight: 500;
        }

        .manifesto-headline {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(2.8rem, 4.5vw, 4.2rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #1a1814;
          margin: 0;
          line-height: 1.05;
          max-width: 52rem;
          margin-left: auto;
          margin-right: auto;
        }
        .manifesto-headline .accent {
          color: #0f766e;
          font-weight: 200;
          position: relative;
          display: inline-block;
        }
        .manifesto-headline .accent::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          right: 0;
          height: 4px;
          background: rgba(15, 118, 110, 0.08);
          border-radius: 4px;
          width: 100%;
        }

        .manifesto-body {
          max-width: 54rem;
          margin: 0 auto;
          animation: fadeUp 0.8s ease 0.2s both;
        }

        .manifesto-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(1rem, 1.15vw, 1.1rem);
          font-weight: 300;
          line-height: 2;
          color: #4b5563;
          text-align: center;
          margin: 0;
          letter-spacing: 0.01em;
        }

        .manifesto-text strong {
          color: #1a1814;
          font-weight: 400;
        }

        .manifesto-divider {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #0f766e, rgba(15, 118, 110, 0.03));
          margin: 2.5rem auto 0;
          border-radius: 4px;
          opacity: 0.25;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .manifesto-container {
            padding: 0 2.5rem;
          }
          .manifesto-headline {
            font-size: clamp(2.2rem, 7vw, 3.2rem);
          }
        }

        @media (max-width: 640px) {
          .manifesto-container {
            padding: 0 1.5rem;
          }
          .manifesto-headline {
            font-size: clamp(2rem, 8vw, 2.8rem);
          }
          .manifesto-badge-text {
            font-size: 0.6rem;
          }
          .manifesto-text {
            font-size: 0.95rem;
            line-height: 1.9;
          }
          .manifesto-divider {
            margin-top: 2rem;
            width: 48px;
          }
        }

        @media (max-width: 480px) {
          .manifesto-container {
            padding: 0 1.2rem;
          }
          .manifesto-headline {
            font-size: clamp(1.8rem, 7vw, 2.5rem);
          }
          .manifesto-text {
            font-size: 0.88rem;
            line-height: 1.8;
          }
          .manifesto-divider {
            width: 40px;
            margin-top: 1.8rem;
          }
        }
      `}</style>

      <div className="manifesto-container">
        <div className="manifesto-header">
          <div className="manifesto-badge">
            <span className="manifesto-badge-line" />
            <span className="manifesto-badge-text">{eyebrow}</span>
            <span className="manifesto-badge-line" />
          </div>
          <h2 className="manifesto-headline">
            {lead} <span className="accent">{accent}</span>
          </h2>
        </div>

        <div className="manifesto-body">
          <p className="manifesto-text">{body}</p>
          <div className="manifesto-divider" />
        </div>
      </div>
    </Section>
  );
}