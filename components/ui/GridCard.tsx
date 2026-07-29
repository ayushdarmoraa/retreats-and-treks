'use client';

import Link from 'next/link';
import Image from 'next/image';

interface GridCardProps {
  href: string;
  image: string;
  imageAlt: string;
  tag: string;
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export default function GridCard({
  href,
  image,
  imageAlt,
  tag,
  title,
  subtitle,
  description,
  className = '',
}: GridCardProps) {
  return (
    <Link href={href} className={`ui-grid-card ${className}`}>
      <style>{`
        .ui-grid-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          border-radius: 24px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.04);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          height: 100%;
        }
        .ui-grid-card::before {
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
        .ui-grid-card:hover::before { opacity: 1; }
        .ui-grid-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06), 0 24px 80px -20px rgba(15, 118, 110, 0.06);
          border-color: rgba(15, 118, 110, 0.06);
        }
        .ui-grid-card-img-wrap {
          position: relative;
          overflow: hidden;
          height: 200px;
          background: #f5f3ef;
          flex-shrink: 0;
        }
        .ui-grid-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .ui-grid-card:hover .ui-grid-card-img { transform: scale(1.05); }
        .ui-grid-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(26, 24, 20, 0.5), transparent 60%);
          opacity: 0.6;
          transition: opacity 0.5s ease;
        }
        .ui-grid-card:hover .ui-grid-card-overlay { opacity: 0.3; }
        .ui-grid-card-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.5rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          background: rgba(15, 118, 110, 0.85);
          backdrop-filter: blur(8px);
          padding: 0.25rem 0.7rem;
          border-radius: 100px;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .ui-grid-card-img-title {
          position: absolute;
          bottom: 1.2rem;
          left: 1.2rem;
          right: 1.2rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1.05rem;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
        }
        .ui-grid-card-body {
          padding: 1.5rem 1.8rem 1.8rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .ui-grid-card-line {
          width: 28px;
          height: 2px;
          background: #0f766e;
          opacity: 0.06;
          margin-bottom: 0.8rem;
          border-radius: 4px;
          transition: all 0.5s ease;
          flex-shrink: 0;
        }
        .ui-grid-card:hover .ui-grid-card-line {
          opacity: 0.15;
          width: 42px;
        }
        .ui-grid-card-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: #1a1814;
          margin: 0 0 0.4rem;
          transition: color 0.4s ease;
          flex-shrink: 0;
        }
        .ui-grid-card:hover .ui-grid-card-title { color: #0f766e; }
        .ui-grid-card-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.85rem;
          color: #6b7280;
          margin: 0 0 1rem;
          line-height: 1.7;
          font-weight: 300;
          flex: 1;
        }
        .ui-grid-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0f766e;
          transition: all 0.3s ease;
          border-bottom: 2px solid rgba(15, 118, 110, 0.08);
          padding-bottom: 0.2rem;
          width: fit-content;
          flex-shrink: 0;
          margin-top: auto;
        }
        .ui-grid-card:hover .ui-grid-card-cta {
          gap: 0.8rem;
          border-bottom-color: rgba(15, 118, 110, 0.25);
        }
        .ui-grid-card-arrow {
          transition: transform 0.3s ease;
          display: inline-block;
        }
        .ui-grid-card:hover .ui-grid-card-arrow {
          transform: translateX(4px);
        }
        @media (max-width: 640px) {
          .ui-grid-card-body { padding: 1.2rem 1.5rem 1.5rem; }
          .ui-grid-card-title { font-size: 0.95rem; }
          .ui-grid-card-desc { font-size: 0.82rem; }
          .ui-grid-card-img-wrap { height: 180px; }
        }
        @media (max-width: 480px) {
          .ui-grid-card-body { padding: 1rem 1.2rem 1.2rem; }
          .ui-grid-card-title { font-size: 0.9rem; }
          .ui-grid-card-desc { font-size: 0.78rem; }
          .ui-grid-card-img-wrap { height: 160px; }
          .ui-grid-card-img-title { font-size: 0.95rem; }
          .ui-grid-card-cta { font-size: 0.6rem; }
        }
      `}</style>
      
      <div className="ui-grid-card-img-wrap">
        <Image src={image} alt={imageAlt} className="ui-grid-card-img" width={400} height={210} quality={75} />
        <div className="ui-grid-card-overlay" />
        <span className="ui-grid-card-tag">{tag}</span>
        <span className="ui-grid-card-img-title">{title}</span>
      </div>
      
      <div className="ui-grid-card-body">
        <div className="ui-grid-card-line" />
        <h3 className="ui-grid-card-title">{title}</h3>
        {subtitle && <p className="ui-grid-card-desc" style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.3rem' }}>{subtitle}</p>}
        {description && <p className="ui-grid-card-desc">{description}</p>}
        <div className="ui-grid-card-cta">
          Explore <span className="ui-grid-card-arrow">→</span>
        </div>
      </div>
    </Link>
  );
}
