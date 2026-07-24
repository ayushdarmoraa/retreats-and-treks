'use client';

import Link from 'next/link';

interface CardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  padded?: boolean; // true for cards without image (like trek-card)
  onClick?: () => void;
}

export default function Card({ children, href, className = '', style, padded = false, onClick }: CardProps) {
  const content = (
    <>
      <style>{`
        .ui-card {
          display: block;
          text-decoration: none;
          border-radius: 24px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.04);
          box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.04),
            0 12px 40px rgba(0, 0, 0, 0.03);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
        }

        .ui-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 25px;
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
          transition: opacity 0.5s ease;
          pointer-events: none;
        }
        .ui-card:hover::before {
          opacity: 1;
        }

        .ui-card:hover {
          transform: translateY(-6px);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.06),
            0 24px 80px -20px rgba(15, 118, 110, 0.06);
          border-color: rgba(15, 118, 110, 0.06);
        }

        .ui-card--padded {
          padding: 2rem 1.8rem;
        }

        @media (max-width: 480px) {
          .ui-card {
            border-radius: 18px;
          }
          .ui-card::before {
            border-radius: 19px;
          }
        }
      `}</style>
      {children}
    </>
  );

  const cardClass = `ui-card ${padded ? 'ui-card--padded' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cardClass} style={style} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <div className={cardClass} style={style} onClick={onClick}>
      {content}
    </div>
  );
}