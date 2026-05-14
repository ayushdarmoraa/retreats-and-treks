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
      <section style={{ marginBottom: '2.5rem' }}>
        <h1>Weekend Retreat in Sankri</h1>
        <p style={{ fontSize: '1rem', color: 'var(--color-muted)', lineHeight: 1.7, maxWidth: '46rem' }}>
          A mountain retreat in Sankri basecamp for small groups who want altitude, forest silence,
          and genuine distance from daily routine. Available on request for extended weekends and
          custom group dates.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Why Sankri Works for a Weekend Retreat</h2>
        <p>
          Sankri is not a casual hill-station escape. It is a remote Himalayan basecamp in the upper
          Tons Valley, close to trekking routes such as Kedarkantha and Har Ki Dun. The landscape is
          sharper, quieter, and more physically present than a typical weekend getaway. That is why it
          suits people who want a short retreat that still feels like a real threshold crossing.
        </p>
        <p>
          The setting creates natural separation. Forest trails, glacial rivers, clear night skies,
          and basecamp rhythm all help the body slow down quickly. Even when the retreat is short,
          the remoteness makes the experience feel more spacious than a normal two-day break.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>What to Expect</h2>
        <p>
          The focus is simple: arrive, settle, breathe, walk, rest, and let the mountain pace replace
          the city pace. Depending on the group, the weekend can include forest walks, riverside
          sitting, gentle movement, quiet meals, bonfire time, and unstructured rest.
        </p>
        <p>
          This is not a packed sightseeing itinerary. Sankri works best when the schedule leaves
          space for silence, altitude adjustment, and slow attention. The retreat can be shaped around
          rest, nature immersion, meditation, yoga, journaling, or a light trek-retreat rhythm.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Best Season and Accessibility</h2>
        <p>
          Sankri is best suited for retreat work from May to June and September to October. September
          and October usually bring the clearest skies, stable weather, colder nights, and strong
          mountain visibility. May and June offer longer days, moderate temperatures, and access to
          higher trails before heavy monsoon conditions arrive.
        </p>
        <p>
          Travel time is part of the decision. Sankri requires a long mountain-road approach from
          Dehradun, so this page is best treated as an extended-weekend or custom small-group retreat,
          not a rushed Saturday-Sunday escape. If you need easier access, compare this with the
          broader <Link href="/retreats/weekend-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>weekend Himalayan retreats</Link> guide.
        </p>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Ideal For</h2>
        <ul style={{ lineHeight: 1.9 }}>
          <li>Small groups seeking a remote mountain reset rather than a resort-style weekend</li>
          <li>People who want forest walks, cold air, night skies, and real digital distance</li>
          <li>Participants comfortable with long travel and a simpler basecamp environment</li>
          <li>Groups interested in combining rest with light trekking or nature immersion</li>
          <li>Travellers who have already done easier retreats and want a stronger mountain setting</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Available on Request</h2>
        <p>
          This retreat is organised based on group interest, season, weather, and travel feasibility.
          Reach out with your preferred dates, group size, and retreat intention. We will help you
          decide whether Sankri is the right fit or whether Chakrata, Rishikesh, or another Himalayan
          location would serve the weekend better.
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
            <Link href="/retreats/sankri/meditation-retreat" style={{ color: 'var(--color-primary)' }}>
              Meditation retreat in Sankri
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
        <p style={{ marginBottom: '1rem', color: 'var(--color-muted)' }}>Ready to discuss dates and details?</p>
        <a
          href="https://wa.me/919760446101?text=Hi%2C%20I%27m%20interested%20in%20a%20weekend%20retreat%20in%20Sankri."
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
