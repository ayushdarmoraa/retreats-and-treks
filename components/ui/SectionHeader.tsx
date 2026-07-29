'use client';

interface SectionHeaderProps {
  badge: string;
  headline: string;
  accent?: string;
  description?: string;
  className?: string;
  align?: 'center' | 'left';
}

export default function SectionHeader({
  badge,
  headline,
  accent,
  description,
  className = '',
  align = 'center',
}: SectionHeaderProps) {
  return (
    <div className={`ui-section-header ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      <style>{`
        .ui-section-header { margin-bottom: 3.5rem; }
        .ui-section-header.text-center .ui-section-badge { justify-content: center; }
        .ui-section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }
        .ui-section-badge-line {
          width: 36px;
          height: 1px;
          background: #0f766e;
          opacity: 0.3;
        }
        .ui-section-badge-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #6b7280;
          font-weight: 500;
        }
        .ui-section-header-headline {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #1a1814;
          margin: 0;
          line-height: 1.1;
        }
        .ui-section-header-headline .accent {
          color: #0f766e;
          font-weight: 200;
        }
        .ui-section-header-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          color: #6b7280;
          font-weight: 300;
          max-width: 44rem;
          margin: 0.75rem auto 0;
          line-height: 1.8;
        }
        .ui-section-header.text-left .ui-section-header-desc {
          margin-left: 0;
        }
        @media (max-width: 900px) {
          .ui-section-header-headline { font-size: clamp(2.2rem, 7vw, 3.2rem); }
          .ui-section-header-desc { font-size: 0.95rem; }
        }
        @media (max-width: 640px) {
          .ui-section-header-headline { font-size: clamp(2rem, 8vw, 2.8rem); }
          .ui-section-badge-text { font-size: 0.6rem; }
          .ui-section-badge-line { width: 28px; }
        }
        @media (max-width: 480px) {
          .ui-section-header-headline { font-size: clamp(1.8rem, 7vw, 2.5rem); }
          .ui-section-header-desc { font-size: 0.9rem; }
        }
      `}</style>
      
      <div className="ui-section-badge">
        <span className="ui-section-badge-line" />
        <span className="ui-section-badge-text">{badge}</span>
        <span className="ui-section-badge-line" />
      </div>
      
      <h2 className="ui-section-header-headline">
        {headline} {accent && <span className="accent">{accent}</span>}
      </h2>
      
      {description && <p className="ui-section-header-desc">{description}</p>}
    </div>
  );
}
