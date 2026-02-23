import Link from 'next/link';

interface TrekCardProps {
  name: string;
  duration: string;
  difficulty: string;
  description: string;
  href: string;
}

export default function TrekCard({ name, duration, difficulty, description, href }: TrekCardProps) {
  return (
    <div
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 600 }}>{name}</h3>
      
      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
        <span>{duration}</span>
        <span>·</span>
        <span>{difficulty}</span>
      </div>

      <p style={{ margin: '0.5rem 0', fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--color-text)' }}>
        {description}
      </p>

      <Link
        href={href}
        style={{
          marginTop: '0.5rem',
          color: 'var(--color-primary)',
          textDecoration: 'none',
          fontWeight: 500,
          fontSize: '0.95rem',
        }}
      >
        View trek →
      </Link>
    </div>
  );
}
