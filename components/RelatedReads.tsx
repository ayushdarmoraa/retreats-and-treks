import Link from 'next/link';

interface RelatedReadsProps {
  /** List of related articles to display */
  links: readonly { label: string; href: string }[];
}

export default function RelatedReads({ links }: RelatedReadsProps) {
  return (
    <nav
      style={{
        borderTop: '1px solid #e5e7eb',
        paddingTop: 'var(--space-lg)',
        marginTop: 'var(--space-xl)',
        marginBottom: 'var(--space-md)',
      }}
    >
      <p
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.05em',
          color: '#6b7280',
          marginBottom: '0.75rem',
        }}
      >
        Related Reads
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} style={{ color: 'var(--color-primary)', fontSize: '0.95rem' }}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
