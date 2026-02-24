import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';

export function generateMetadata(): Metadata {
  return {
    title: 'Yoga Retreat in Sankri | Mountain Practice at Altitude',
    description:
      'Yoga retreat in Sankri basecamp. Available on request for small groups practicing in alpine meadows and mountain air.',
    alternates: {
      canonical: buildCanonicalUrl('/retreats/sankri/yoga-retreat'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function SankriYogaRetreatPage() {
  return (
    <main style={{ maxWidth: '72rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      {/* SECTION 1: HERO */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h1>Yoga Retreat in Sankri</h1>
        <p style={{ fontSize: '1rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
          Yoga practice in the high Himalayas. Available on request for small groups.
        </p>
      </section>

      {/* SECTION 2: WHAT TO EXPECT */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2>What to Expect</h2>
        <p>
          Daily yoga sessions in alpine meadows and at basecamp. Practice in mountain air with expansive views. Classes focus on movement, breath, and presence.
        </p>
      </section>

      {/* SECTION 3: IDEAL FOR */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Ideal For</h2>
        <ul>
          <li>Yoga practitioners at all levels</li>
          <li>Those seeking outdoor mountain practice</li>
          <li>Small groups committed to daily sessions</li>
        </ul>
      </section>

      {/* SECTION 4: HOW TO BOOK */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Available on Request</h2>
        <p>
          We organize yoga retreats based on group interest and timing. Reach out to discuss duration, group size, and yoga style preferences.
        </p>
      </section>

      {/* SECTION 5: SOFT CTA */}
      <section style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
        <p style={{ marginBottom: '1rem', color: 'var(--color-muted)' }}>Ready to practice at altitude?</p>
        <a
          href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20a%20yoga%20retreat%20in%20Sankri."
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
