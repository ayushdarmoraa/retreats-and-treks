import Link from 'next/link';

interface RelatedReadsProps {
  /** List of related articles to display */
  links: readonly { label: string; href: string }[];
}

export default function RelatedReads({ links }: RelatedReadsProps) {
  return (
    <div className="med-card" style={{ padding: '1.5rem', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)', maxWidth: '58rem', marginLeft: 'auto', marginRight: 'auto' }}>
      <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
        <span className="med-eyebrow-line" />
        <span className="med-eyebrow-text">Related Reads</span>
        <span className="med-eyebrow-line" />
      </div>
      <ul className="med-list" style={{ marginTop: '0.5rem' }}>
        {links.map((link) => (
          <li key={link.href} className="med-list-item">
            <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
            <Link href={link.href} className="med-list-text" style={{ color: '#0f766e', textDecoration: 'none' }}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}