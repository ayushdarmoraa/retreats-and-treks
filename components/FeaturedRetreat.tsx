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
    <div className="med-card" style={{ padding: '1.5rem', margin: 'var(--space-xl) auto', textAlign: 'center', maxWidth: '58rem' }}>
      <span className="med-season-tag" style={{ marginBottom: '0.5rem' }}>Featured Himalayan Retreat</span>
      <h3 className="med-h3" style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>{title}</h3>
      <p className="med-body" style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>{description}</p>
      <nav style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="med-cta-outline"
            style={{
              padding: '0.4rem 0.8rem',
              fontSize: '0.7rem',
            }}
          >
            → {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
