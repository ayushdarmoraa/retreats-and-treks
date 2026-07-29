'use client';

interface ArrowLinkProps {
  children: React.ReactNode;
  className?: string;
}

export default function ArrowLink({ children, className = '' }: ArrowLinkProps) {
  return (
    <span className={`ui-arrow-link ${className}`}>
      <style>{`
        .ui-arrow-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0f766e;
          padding: 0.2rem 0;
          border-bottom: 2px solid rgba(15, 118, 110, 0.12);
          transition: all 0.3s ease;
          opacity: 0.8;
        }
        .ui-card:hover .ui-arrow-link {
          opacity: 1;
          gap: 0.7rem;
          border-bottom-color: rgba(15, 118, 110, 0.3);
        }
        .ui-arrow-link-arrow {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        .ui-card:hover .ui-arrow-link-arrow {
          transform: translateX(4px);
        }
      `}</style>
      {children} <span className="ui-arrow-link-arrow">→</span>
    </span>
  );
}
