'use client';

// Small uppercase tag pill positioned top-left over an image.
// Matches .retreat-card-tag / .path-img-tag from the original files.

interface ImageBadgeProps {
  label?: string;
  className?: string;
}

export default function ImageBadge({ label, className = '' }: ImageBadgeProps) {
  if (!label) return null;

  return (
    <span className={`ui-image-badge ${className}`}>
      <style>{`
        .ui-image-badge {
          position: absolute;
          top: 1.2rem;
          left: 1.2rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          background: rgba(15, 118, 110, 0.8);
          backdrop-filter: blur(8px);
          padding: 0.3rem 0.8rem;
          border-radius: 100px;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 480px) {
          .ui-image-badge {
            font-size: 0.5rem;
            padding: 0.3rem 0.7rem;
            top: 0.8rem;
            left: 0.8rem;
          }
        }
      `}</style>
      {label}
    </span>
  );
}