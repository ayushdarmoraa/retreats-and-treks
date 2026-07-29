'use client';

import Link from 'next/link';
import { Section } from '@/components/ui';
import type { DirectoryColumn } from '@/content/home/DirectoryLinks.content';

interface DirectoryLinksProps {
  eyebrow: string;
  headline: string;
  accentWords: number;
  subtext: string;
  columns: DirectoryColumn[];
  className?: string;
}

export default function DirectoryLinks({
  eyebrow,
  headline,
  accentWords,
  subtext,
  columns,
  className = '',
}: DirectoryLinksProps) {
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
        .dir-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 4rem;
          position: relative;
          z-index: 1;
        }

        .dir-header {
          text-align: center;
          margin-bottom: 4.5rem;
          animation: fadeUp 0.8s ease 0.1s both;
        }

        .dir-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }
        .dir-badge-line {
          width: 36px;
          height: 1px;
          background: #0f766e;
          opacity: 0.25;
        }
        .dir-badge-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #6b7280;
          font-weight: 500;
        }

        .dir-headline {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #1a1814;
          margin: 0;
          line-height: 1.1;
        }
        .dir-headline .accent {
          color: #0f766e;
          font-weight: 200;
        }

        .dir-sub {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          color: #6b7280;
          font-weight: 300;
          margin: 0.75rem 0 0;
          letter-spacing: 0.01em;
        }

        .dir-divider {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #0f766e, rgba(15, 118, 110, 0.03));
          margin: 1.5rem auto 0;
          border-radius: 4px;
          opacity: 0.15;
        }

        .dir-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem;
          animation: fadeUp 0.9s ease 0.2s both;
        }

        .dir-col {
          display: flex;
          flex-direction: column;
        }

        .dir-col-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #1a1814;
          margin: 0 0 1.2rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
          position: relative;
        }
        .dir-col-title::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 28px;
          height: 2px;
          background: #0f766e;
          border-radius: 2px;
        }

        .dir-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .dir-link {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem;
          font-weight: 400;
          color: #6b7280;
          text-decoration: none;
          transition: all 0.3s ease;
          display: block;
          padding: 4px 0;
        }
        .dir-link:hover {
          color: #0f766e;
          transform: translateX(4px);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .dir-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
          .dir-container {
            padding: 0 3rem;
          }
        }

        @media (max-width: 900px) {
          .dir-container {
            padding: 0 2rem;
          }
          .dir-headline {
            font-size: clamp(2.2rem, 7vw, 3.2rem);
          }
        }

        @media (max-width: 640px) {
          .dir-container {
            padding: 0 1.5rem;
          }
          .dir-grid {
            grid-template-columns: 1fr;
            gap: 1.8rem;
          }
          .dir-col-title {
            font-size: 0.7rem;
          }
          .dir-link {
            font-size: 0.85rem;
          }
          .dir-headline {
            font-size: clamp(2rem, 8vw, 2.8rem);
          }
          .dir-badge-text {
            font-size: 0.6rem;
          }
          .dir-sub {
            font-size: 0.9rem;
          }
          .dir-divider {
            width: 48px;
          }
        }

        @media (max-width: 480px) {
          .dir-container {
            padding: 0 1.2rem;
          }
          .dir-headline {
            font-size: clamp(1.8rem, 7vw, 2.5rem);
          }
          .dir-link {
            font-size: 0.82rem;
          }
        }
      `}</style>

      <div className="dir-container">
        <div className="dir-header">
          <div className="dir-badge">
            <span className="dir-badge-line" />
            <span className="dir-badge-text">{eyebrow}</span>
            <span className="dir-badge-line" />
          </div>
          <h2 className="dir-headline">
            {lead} <span className="accent">{accent}</span>
          </h2>
          <p className="dir-sub">{subtext}</p>
          <div className="dir-divider" />
        </div>

        <div className="dir-grid">
          {columns.map((col, idx) => (
            <div key={idx} className="dir-col">
              <h3 className="dir-col-title">{col.title}</h3>
              <ul className="dir-list">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="dir-link">
                      {l.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
