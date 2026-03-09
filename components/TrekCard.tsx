import Link from 'next/link';

interface TrekCardProps {
  name: string;
  duration: string;
  difficulty: string;
  description: string;
  href: string;
}

const difficultyColor = (difficulty: string) => {
  const d = difficulty.toLowerCase();
  if (d.includes('easy')) return { bg: 'rgba(15,118,110,0.07)', color: 'var(--color-primary)' };
  if (d.includes('challenging') || d.includes('hard')) return { bg: 'rgba(180,60,40,0.07)', color: '#b43c28' };
  return { bg: 'rgba(100,80,20,0.07)', color: '#7a6010' };
};

export default function TrekCard({ name, duration, difficulty, description, href }: TrekCardProps) {
  const diffStyle = difficultyColor(difficulty);

  return (
    <div
      className="trek-card"
      style={{
        background: '#ffffff',
        border: '1px solid rgba(15,118,110,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
      }}
    >
      <style>{`
        .trek-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--color-primary);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .trek-card:hover::before { transform: scaleX(1); }
        .trek-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.08);
          border-color: rgba(15,118,110,0.25);
        }
        .trek-card-arrow { transition: gap 0.2s; }
        .trek-card:hover .trek-card-arrow { gap: 0.65rem !important; }
      `}</style>

      {/* Card body */}
      <div style={{ padding: '1.5rem 1.5rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.68rem', fontWeight: 400,
            color: '#888888', letterSpacing: '0.02em',
          }}>
            {duration}
          </span>
          <span style={{ color: 'rgba(15,118,110,0.2)', fontSize: '0.6rem' }}>·</span>
          <span style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.68rem', fontWeight: 500,
            padding: '2px 8px', borderRadius: '100px',
            background: diffStyle.bg, color: diffStyle.color,
            letterSpacing: '0.03em',
          }}>
            {difficulty}
          </span>
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '1rem', fontWeight: 400,
          letterSpacing: '-0.01em', color: '#111111',
          margin: 0, lineHeight: 1.3,
        }}>
          {name}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.82rem', fontWeight: 300,
          lineHeight: 1.8, color: '#666666',
          margin: 0,
        }}>
          {description}
        </p>

      </div>

      {/* Footer link */}
      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(15,118,110,0.07)' }}>
        <Link
          href={href}
          className="trek-card-arrow"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.75rem', fontWeight: 400,
            color: 'var(--color-primary)', textDecoration: 'none',
            letterSpacing: '0.02em',
          }}
        >
          View {name} details →
        </Link>
      </div>

    </div>
  );
}