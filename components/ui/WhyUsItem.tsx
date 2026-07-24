'use client';

interface WhyUsItemProps {
  number: number;
  text: string;
  className?: string;
}

export default function WhyUsItem({ number, text, className = '' }: WhyUsItemProps) {
  return (
    <li className={`ui-whyus-item ${className}`}>
      <style>{`
        .ui-whyus-item {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 20px;
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          list-style: none;
        }
        .ui-whyus-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: #0f766e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 20px 20px 0 0;
        }
        .ui-whyus-item:hover::before { transform: scaleX(1); }
        .ui-whyus-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
          border-color: rgba(15, 118, 110, 0.04);
        }
        .ui-whyus-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ui-whyus-num {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 2.8rem;
          font-weight: 200;
          color: #374151;
          opacity: 0.15;
          line-height: 1;
          letter-spacing: -0.06em;
          transition: opacity 0.4s ease;
          user-select: none;
        }
        .ui-whyus-item:hover .ui-whyus-num { opacity: 1; }
        .ui-whyus-check {
          width: 34px; height: 34px;
          border-radius: 50%;
          border: 1.5px solid rgba(15, 118, 110, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #374151;
          font-size: 0.75rem;
          font-weight: 600;
          transition: all 0.4s ease;
          flex-shrink: 0;
          opacity: 0.3;
        }
        .ui-whyus-item:hover .ui-whyus-check {
          background: #0f766e;
          color: #ffffff;
          border-color: #0f766e;
          opacity: 1;
        }
        .ui-whyus-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.92rem;
          line-height: 1.8;
          color: #6b7280;
          font-weight: 300;
          transition: color 0.3s ease;
          margin: 0;
        }
        .ui-whyus-item:hover .ui-whyus-text { color: #4b5563; }
        @media (max-width: 640px) {
          .ui-whyus-item { padding: 1.8rem 1.5rem; }
          .ui-whyus-num { font-size: 2.2rem; opacity: 0.15; }
          .ui-whyus-text { font-size: 0.88rem; }
        }
        @media (max-width: 480px) {
          .ui-whyus-item { padding: 1.5rem 1.2rem; }
          .ui-whyus-num { font-size: 1.8rem; opacity: 0.15; }
          .ui-whyus-text { font-size: 0.85rem; }
          .ui-whyus-check { width: 28px; height: 28px; font-size: 0.65rem; }
        }
      `}</style>
      <div className="ui-whyus-top">
        <span className="ui-whyus-num">{String(number).padStart(2, '0')}</span>
        <div className="ui-whyus-check">✓</div>
      </div>
      <p className="ui-whyus-text">{text}</p>
    </li>
  );
}