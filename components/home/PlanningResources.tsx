'use client';

import Link from 'next/link';
import { Section } from '@/components/ui';
import type { PlanningResourceLink } from '@/content/home/PlanningResources.content';

interface PlanningResourcesProps {
  headline: string;
  accentWords: number;
  links: PlanningResourceLink[];
  className?: string;
}

export default function PlanningResources({
  headline,
  accentWords,
  links,
  className = '',
}: PlanningResourcesProps) {
  const words = headline.trim().split(' ');
  const accent = words.slice(words.length - accentWords).join(' ');
  const lead = words.slice(0, words.length - accentWords).join(' ');

  return (
    <Section
      className={className}
      style={{
        padding: '7rem 0',
        background: '#f7f9f7',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
      }}
    >
      <style>{`
        .pr-container {
          max-width: 56rem;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .pr-header {
          text-align: center;
          margin-bottom: 3rem;
          animation: fadeUp 0.8s ease 0.1s both;
        }

        .pr-headline {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(2rem, 3vw, 2.8rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #1a1814;
          margin: 0;
          line-height: 1.1;
        }
        .pr-headline .accent {
          color: #0f766e;
          font-weight: 200;
        }

        .pr-divider {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, #0f766e, rgba(15, 118, 110, 0.03));
          margin: 1.2rem auto 0;
          border-radius: 4px;
          opacity: 0.2;
        }

        .pr-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          animation: fadeUp 0.9s ease 0.2s both;
        }

        .pr-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.2rem 2rem;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 16px;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          font-weight: 400;
          color: #1a1814;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
          position: relative;
        }

        .pr-link::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 17px;
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
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .pr-link:hover::before {
          opacity: 1;
        }

        .pr-link:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06), 0 16px 48px -16px rgba(15, 118, 110, 0.04);
          border-color: rgba(15, 118, 110, 0.06);
        }

        .pr-link-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          font-weight: 400;
          color: #1a1814;
          transition: color 0.3s ease;
        }
        .pr-link:hover .pr-link-text {
          color: #0f766e;
        }

        .pr-link-arrow {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.2rem;
          color: #6b7280;
          transition: all 0.3s ease;
          opacity: 0.3;
        }
        .pr-link:hover .pr-link-arrow {
          transform: translateX(4px);
          opacity: 0.8;
          color: #0f766e;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .pr-container {
            padding: 0 1.5rem;
          }
          .pr-headline {
            font-size: clamp(1.8rem, 6vw, 2.4rem);
          }
          .pr-link {
            padding: 1rem 1.5rem;
            border-radius: 14px;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .pr-link-text {
            font-size: 0.92rem;
          }
          .pr-link-arrow {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .pr-container {
            padding: 0 1.2rem;
          }
          .pr-headline {
            font-size: clamp(1.6rem, 5vw, 2.2rem);
          }
          .pr-link {
            padding: 0.8rem 1.2rem;
            border-radius: 12px;
          }
          .pr-link-text {
            font-size: 0.85rem;
          }
          .pr-divider {
            width: 40px;
          }
        }
      `}</style>

      <div className="pr-container">
        <div className="pr-header">
          <h2 className="pr-headline">
            {lead} <span className="accent">{accent}</span>
          </h2>
          <div className="pr-divider" />
        </div>

        <div className="pr-grid">
          {links.map((link, i) => (
            <Link key={i} href={link.href} className="pr-link">
              <span className="pr-link-text">{link.text}</span>
              <span className="pr-link-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
