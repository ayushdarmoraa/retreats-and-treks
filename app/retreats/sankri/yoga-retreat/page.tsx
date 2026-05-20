import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';

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
    openGraph: {
      title: 'Yoga Retreat in Sankri | Mountain Practice at Altitude',
      description: 'Yoga retreat in Sankri basecamp. Available on request for small groups practicing in alpine meadows and mountain air.',
      url: buildCanonicalUrl('/retreats/sankri/yoga-retreat'),
      type: 'website',
      siteName: 'Retreats And Treks',
      locale: 'en_IN',
      images: buildOgImages('Yoga Retreat in Sankri | Mountain Practice at Altitude'),
    },
  };
}

export default function SankriYogaRetreatPage() {
  return (
    <main style={{ maxWidth: '72rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <section style={{ marginBottom: '2.5rem' }}>
        <h1>Yoga Retreat in Sankri</h1>
        <p style={{ fontSize: '1rem', color: 'var(--color-muted)', lineHeight: 1.7, maxWidth: '46rem' }}>
          Yoga practice in the high Himalayas for small groups seeking breath, movement,
          altitude, and mountain presence. Available on request during suitable Sankri travel windows.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Why Sankri Works for Yoga</h2>
        <p>
          Sankri brings yoga into a sharper mountain environment. Unlike a studio, resort, or
          easy-access river valley, this is a remote Himalayan basecamp where breath, movement, and
          attention are shaped by altitude and terrain. The mountain setting naturally slows the pace
          and asks the body to move with care.
        </p>
        <p>
          The practice here is not about performance. Sankri supports yoga as embodied presence:
          feeling the breath in cold air, moving gently after long travel, walking through forest
          transitions, and letting the body become alert without strain.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>What Practice Can Include</h2>
        <p>
          A Sankri yoga retreat can include morning asana, pranayama, gentle mobility, walking
          meditation, outdoor practice, slow forest walks, and evening restoration. The structure is
          adapted to the group, weather, altitude, and available practice spaces.
        </p>
        <p>
          Sessions may be lighter than a conventional yoga retreat because Sankri itself is part of
          the practice. Travel fatigue, elevation, mountain weather, and trail access all matter. The
          aim is to support breath awareness, steadiness, and connection with the landscape.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Best Season and Suitability</h2>
        <p>
          The strongest retreat windows are May to June and September to October. May and June offer
          longer days, moderate temperatures, and access to trails before heavy monsoon conditions.
          September and October bring clear skies, cold nights, and the strongest mountain visibility.
        </p>
        <p>
          Sankri is best for groups comfortable with long travel, simple conditions, and altitude.
          If you want a more traditional yoga setting with established teacher infrastructure,
          compare this page with the broader{' '}
          <Link href="/retreats/journeys/yoga-and-movement" style={{ color: 'var(--color-primary)' }}>
            Yoga &amp; Movement
          </Link>{' '}
          retreat journey.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Ideal For</h2>
        <ul style={{ lineHeight: 1.9 }}>
          <li>Small groups wanting yoga in a remote Himalayan basecamp setting</li>
          <li>Practitioners interested in breath awareness, gentle movement, and altitude presence</li>
          <li>People comfortable with simple stays, long travel, and mountain-road logistics</li>
          <li>Groups who want to combine yoga with forest walks or light trekking</li>
          <li>Travellers seeking a quieter alternative to busier yoga destinations</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Available on Request</h2>
        <p>
          We organise yoga retreats in Sankri based on season, group readiness, teacher availability,
          weather, and travel feasibility. Share your preferred dates, group size, and practice level,
          and we will help decide whether Sankri is the right mountain container.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Explore Related Sankri Retreats and Treks</h2>
        <ul style={{ lineHeight: 1.9 }}>
          <li>
            <Link href="/retreats/sankri" style={{ color: 'var(--color-primary)' }}>
              Sankri retreat hub
            </Link>
          </li>
          <li>
            <Link href="/retreats/sankri/weekend-retreat" style={{ color: 'var(--color-primary)' }}>
              Weekend retreat in Sankri
            </Link>
          </li>
          <li>
            <Link href="/retreats/sankri/meditation-retreat" style={{ color: 'var(--color-primary)' }}>
              Meditation retreat in Sankri
            </Link>
          </li>
          <li>
            <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>
              Kedarkantha trek from Sankri
            </Link>
          </li>
          <li>
            <Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: 'var(--color-primary)' }}>
              Har Ki Dun trek from Sankri
            </Link>
          </li>
        </ul>
      </section>

      <section style={{ textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
        <p style={{ marginBottom: '1rem', color: 'var(--color-muted)' }}>Ready to practice at altitude?</p>
        <a
          href="https://wa.me/919760446101?text=Hi%2C%20I%27m%20interested%20in%20a%20yoga%20retreat%20in%20Sankri."
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
    </main>
  );
}
