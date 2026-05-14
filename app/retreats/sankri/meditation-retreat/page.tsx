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
      <section style={{ marginBottom: '2.5rem' }}>
        <h1>Meditation Retreat in Sankri</h1>
        <p style={{ fontSize: '1rem', color: 'var(--color-muted)', lineHeight: 1.7, maxWidth: '46rem' }}>
          Deep meditation practice in the high Himalayas for small groups seeking silence,
          altitude, and real separation from daily noise. Available on request during suitable
          Sankri travel windows.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Why Sankri Works for Meditation</h2>
        <p>
          Sankri creates a different kind of meditation container from an accessible forest retreat
          or river-valley ashram setting. It is a remote basecamp in the upper Tons Valley, close to
          the Govind Pashu Vihar landscape and the routes toward Kedarkantha and Har Ki Dun. The
          journey itself asks for intention, and that seriousness helps the practice begin before the
          first formal sitting.
        </p>
        <p>
          The altitude, colder air, long travel, and mountain silence naturally slow the mind. Sankri
          is suited to people who want meditation to be supported by terrain, not comfort. The land is
          not soft or decorative here; it asks you to arrive fully and pay attention.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>What Practice Can Include</h2>
        <p>
          A Sankri meditation retreat can combine seated practice, walking meditation, riverside
          sitting, silent meals, journaling, and slow forest movement. The exact rhythm depends on the
          group, season, weather, and whether the retreat includes light trekking.
        </p>
        <p>
          Practice may happen at basecamp, along quiet forest transitions, beside the Tons River, or
          in open meadow settings when conditions allow. The aim is not to copy a fixed monastery
          schedule, but to use Sankri&apos;s remoteness and altitude as part of the meditation itself.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Best Season and Suitability</h2>
        <p>
          The strongest windows are May to June and September to October. September and October
          usually offer the clearest skies, stable weather, and a sharper quality of silence. May and
          June bring longer daylight and access to higher trails before heavier monsoon conditions.
        </p>
        <p>
          Sankri is not ideal for everyone. The approach from Dehradun is long, the setting is remote,
          and altitude requires basic fitness and patience. If you want easier access or a gentler
          introduction to silence, compare this with the broader{' '}
          <Link href="/retreats/journeys/meditation-and-silence" style={{ color: 'var(--color-primary)' }}>
            Meditation &amp; Silence
          </Link>{' '}
          retreat journey.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Ideal For</h2>
        <ul style={{ lineHeight: 1.9 }}>
          <li>Practitioners seeking silence in a remote Himalayan basecamp setting</li>
          <li>Small groups comfortable with altitude, simple conditions, and long travel</li>
          <li>People drawn to walking meditation, riverside sitting, and mountain stillness</li>
          <li>Participants who want retreat and trekking energy to support each other</li>
          <li>Those seeking clarity through terrain, distance, and reduced external noise</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Available on Request</h2>
        <p>
          We organise meditation retreats in Sankri based on season, group readiness, travel
          feasibility, and the level of silence required. Share your preferred dates, group size, and
          meditation experience, and we will help decide whether Sankri is the right container.
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
            <Link href="/retreats/sankri/yoga-retreat" style={{ color: 'var(--color-primary)' }}>
              Yoga retreat in Sankri
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
        <p style={{ marginBottom: '1rem', color: 'var(--color-muted)' }}>Interested in deep practice at altitude?</p>
        <a
          href="https://wa.me/919760446101?text=Hi%2C%20I%27m%20interested%20in%20a%20meditation%20retreat%20in%20Sankri."
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
