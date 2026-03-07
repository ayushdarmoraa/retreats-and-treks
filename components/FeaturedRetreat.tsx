import Link from 'next/link';

interface FeaturedRetreatProps {
  /** Headline — e.g. "7-Day Meditation Retreat in Zanskar" */
  title: string;
  /** One-line description */
  description: string;
  /** Links to show — typically itinerary + dates */
  links: readonly { label: string; href: string }[];
}

export default function FeaturedRetreat({ title, description, links }: FeaturedRetreatProps) {
  return (
    <aside
      style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)',
        border: '1px solid #bfdbfe',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-lg)',
        margin: 'var(--space-xl) 0',
      }}
    >
      <p
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.05em',
          color: '#3b82f6',
          marginBottom: '0.35rem',
        }}
      >
        Featured Himalayan Retreat
      </p>
      <p style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.35rem' }}>{title}</p>
      <p style={{ fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '0.75rem', color: '#374151' }}>
        {description}
      </p>
      <nav style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              color: 'var(--color-primary)',
              fontWeight: 500,
              fontSize: '0.95rem',
            }}
          >
            → {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
