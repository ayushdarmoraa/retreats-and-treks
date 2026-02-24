import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';

export function generateMetadata(): Metadata {
  return {
    title: 'Weekend Retreat in Sankri | Custom Himalayan Experience',
    description:
      'Experience a weekend retreat in Sankri basecamp. Available on request for small groups seeking mountain rest and clarity.',
    alternates: {
      canonical: buildCanonicalUrl('/retreats/sankri/weekend-retreat'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function SankriWeekendRetreatPage() {
  return (
    <main style={{ maxWidth: '72rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      {/* SECTION 1: HERO */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h1>Weekend Retreat in Sankri</h1>
        <p style={{ fontSize: '1rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
          A mountain retreat in Sankri basecamp. Available on request for small groups.
        </p>
      </section>

      {/* SECTION 2: WHAT TO EXPECT */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2>What to Expect</h2>
        <p>
          A quiet weekend in the remote Himalayas. Unplug from noise and routine. Rest in mountain silence and clarity.
        </p>
      </section>

      {/* SECTION 3: IDEAL FOR */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Ideal For</h2>
        <ul>
          <li>People seeking deep mountain silence</li>
          <li>Small groups looking for shared retreat experiences</li>
          <li>Those comfortable with remote settings</li>
        </ul>
      </section>

      {/* SECTION 4: HOW TO BOOK */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Available on Request</h2>
        <p>
          This retreat is organized based on group interest and timing. Reach out to discuss your preferred dates and group size.
        </p>
      </section>

      {/* SECTION 5: SOFT CTA */}
      <section style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
        <p style={{ marginBottom: '1rem', color: 'var(--color-muted)' }}>Ready to discuss dates and details?</p>
        <a
          href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20a%20weekend%20retreat%20in%20Sankri."
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.25rem',
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff',
            borderRadius: 'var(--radius-sm)',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '0.95rem',
          }}
        >
          Chat on WhatsApp
        </a>
      </section>

      <section style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
        <Link href="/retreats/sankri" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
          ← Browse Sankri retreats
        </Link>
      </section>
    </main>
  );
}
