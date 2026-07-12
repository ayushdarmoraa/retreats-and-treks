// components/ui/IconCircle.tsx
'use client';

interface IconCircleProps {
  children: React.ReactNode; // svg icon
  className?: string;
}

export default function IconCircle({ children, className = '' }: IconCircleProps) {
  return (
    <div className={`ui-icon-circle ${className}`}>
      <style>{`
        .ui-icon-circle {
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
          background: rgba(15, 118, 110, 0.04);
          border: 1px solid rgba(15, 118, 110, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f766e;
          opacity: 0.4;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
        }
        .ui-icon-circle:hover,
        .day-block:hover .ui-icon-circle {
          background: rgba(15, 118, 110, 0.08);
          border-color: rgba(15, 118, 110, 0.25);
          transform: scale(1.06);
          opacity: 0.8;
        }
        @media (max-width: 480px) {
          .ui-icon-circle {
            width: 3rem;
            height: 3rem;
          }
        }
      `}</style>
      {children}
    </div>
  );
}