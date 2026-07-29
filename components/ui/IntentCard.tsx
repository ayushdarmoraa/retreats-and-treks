'use client';

interface IntentCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export default function IntentCard({ icon, title, description, className = '' }: IntentCardProps) {
  return (
    <div className={`ui-intent-card ${className}`}>
      <style>{`
        .ui-intent-card {
          padding: 2rem 1.8rem;
          text-align: center;
          background: #fafafa;
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 16px;
          transition: all 0.4s ease;
          cursor: default;
        }
        .ui-intent-card:hover {
          transform: translateY(-4px);
          border-color: rgba(15, 118, 110, 0.15);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
          background: #ffffff;
        }
        .ui-intent-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          display: block;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }
        .ui-intent-card:hover .ui-intent-icon { opacity: 1; }
        .ui-intent-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: #1a1814;
          margin: 0 0 0.5rem;
          transition: color 0.3s ease;
        }
        .ui-intent-card:hover .ui-intent-title { color: #0f766e; }
        .ui-intent-desc {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.85rem;
          line-height: 1.6;
          color: #6b7280;
          font-weight: 300;
          margin: 0;
        }
        @media (max-width: 640px) {
          .ui-intent-card { padding: 1.5rem; }
        }
        @media (max-width: 480px) {
          .ui-intent-card { padding: 1.2rem; }
          .ui-intent-title { font-size: 0.9rem; }
          .ui-intent-desc { font-size: 0.8rem; }
        }
      `}</style>
      <span className="ui-intent-icon">{icon}</span>
      <h3 className="ui-intent-title">{title}</h3>
      <p className="ui-intent-desc">{description}</p>
    </div>
  );
}
