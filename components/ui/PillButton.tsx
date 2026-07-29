'use client';

import Link from 'next/link';

interface PillButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export default function PillButton({ children, href, className = '' }: PillButtonProps) {
  return (
    <Link href={href} className={`ui-pill-btn ${className}`}>
      <style>{`
        .ui-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.9rem 2.8rem;
          background: rgba(15, 118, 110, 0.04);
          border: 1px solid rgba(15, 118, 110, 0.12);
          color: #1a1814;
          border-radius: 100px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .ui-pill-btn:hover {
          background: #0f766e;
          color: #ffffff;
          border-color: #0f766e;
          box-shadow: 0 8px 24px -8px rgba(15, 118, 110, 0.15);
        }
        .ui-pill-btn-arrow {
          transition: transform 0.3s ease;
          font-size: 1.1rem;
        }
        .ui-pill-btn:hover .ui-pill-btn-arrow {
          transform: translateX(4px);
        }
      `}</style>
      {children} <span className="ui-pill-btn-arrow">→</span>
    </Link>
  );
}
