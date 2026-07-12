'use client';

interface CardDividerProps {
  className?: string;
}

export default function CardDivider({ className = '' }: CardDividerProps) {
  return (
    <>
      <style>{`
        .ui-card-divider {
          width: 28px;
          height: 2px;
          background: #0f766e;
          opacity: 0.06;
          margin-bottom: 0.8rem;
          border-radius: 4px;
          transition: all 0.5s ease;
        }
        .ui-card:hover .ui-card-divider {
          opacity: 0.15;
          width: 42px;
        }
      `}</style>
      <div className={`ui-card-divider ${className}`} />
    </>
  );
}