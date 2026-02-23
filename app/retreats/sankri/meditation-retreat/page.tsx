import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';

export function generateMetadata(): Metadata {
  return {
    title: 'Meditation Retreat in Sankri | High Altitude Practice',
    description:
      'Meditation retreat in Sankri basecamp at high altitude. Available on request for small groups seeking deep practice in silence.',
    alternates: {
      canonical: buildCanonicalUrl('/retreats/sankri/meditation-retreat'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function SankriMeditationRetreatPage() {
  return (
    <main style={{ maxWidth: '72rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      {/* SECTION 1: HERO */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h1>Meditation Retreat in Sankri</h1>
        <p style={{ fontSize: '1rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
          Deep meditation practice in the high Himalayas. Available on request for small groups.
        </p>
      </section>

      {/* SECTION 2: WHAT TO EXPECT */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2>What to Expect</h2>
        <p>
          Structured daily meditation sessions in complete silence. You'll practice in alpine meadows and at basecamp, with the Himalayas as your backdrop.
        </p>
      </section>

      {/* SECTION 3: IDEAL FOR */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Ideal For</h2>
        <ul>
          <li>Experienced and beginning meditators</li>
          <li>Those seeking extended silent practice</li>
          <li>Small groups committed to group practice</li>
        </ul>
      </section>

      {/* SECTION 4: HOW TO BOOK */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Available on Request</h2>
        <p>
          We organize meditation retreats based on group needs and timing. Contact us to discuss duration, group size, and meditation style.
        </p>
      </section>

      {/* SECTION 5: SOFT CTA */}
      <section style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
        <p style={{ marginBottom: '1rem', color: 'var(--color-muted)' }}>Interested in deep practice at altitude?</p>
        <a
          href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20a%20meditation%20retreat%20in%20Sankri."
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
          ← View all Sankri retreats
        </Link>
      </section>
    </main>
  );
}
