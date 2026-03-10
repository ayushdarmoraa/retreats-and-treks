import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { getAllRetreatFormats } from '@/lib/retreats';
import { getLocationsWithRetreats } from '@/lib/locations';
import RetreatsClient from './RetreatsClient';

export function generateMetadata(): Metadata {
  return {
    title: 'Guided Himalayan Retreats | Retreats And Treks',
    description:
      'Small-group and private retreats across quiet Himalayan locations — created around rest, clarity, and depth.',
    alternates: {
      canonical: buildCanonicalUrl('/retreats'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const intentOptions = [
  {
    title: 'Rest & Reset',
    description: 'Step back from the pace. Find calm.',
  },
  {
    title: 'Meditation & Silence',
    description: 'Explore inner quiet through guided practice.',
  },
  {
    title: 'Yoga & Movement',
    description: 'Connect body, breath, and place.',
  },
  {
    title: 'Creative Retreats',
    description: 'Rediscover focus and creative flow.',
  },
  {
    title: 'Burnout Recovery',
    description: 'Deep rest designed for overwhelm.',
  },
  {
    title: 'Private & Custom',
    description: 'Design a retreat exactly for you.',
  },
];

const processSteps = [
  {
    step: '1',
    title: 'You share your intention',
    description: 'Tell us what you\'re seeking — rest, clarity, healing, or something else.',
  },
  {
    step: '2',
    title: 'We suggest locations & formats',
    description: 'Based on your needs, we recommend which locations and retreat styles suit you best.',
  },
  {
    step: '3',
    title: 'Retreat is designed & confirmed',
    description: 'We customize dates, length, and focus. Everything is flexible.',
  },
  {
    step: '4',
    title: 'You arrive — we handle the rest',
    description: 'From meals to logistics to the experience itself — it\'s designed and guided.',
  },
];

const whyUsPoints = [
  'Small-group or private only — never large commercial groups',
  'Quiet, non-commercial locations selected for depth',
  'Flexible schedules — we design around your life',
  'Nature-first environments — mountains, forests, silence',
  'Deep rest prioritized — never rushed itineraries',
  'Retreat and trek combinations — if you want variety',
];

export default function RetreatsPage() {
  const retreatFormats = getAllRetreatFormats();
  const locationsWithRetreats = getLocationsWithRetreats();

  return (
    <main style={{ maxWidth: '72rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <RetreatsClient
        intentions={intentOptions}
        processSteps={processSteps}
        whyUsPoints={whyUsPoints}
        retreatFormats={retreatFormats}
        locations={locationsWithRetreats}
      />
     <style>{`
  .retreats-seo {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #ffffff;
    padding: 4rem 0 3rem;
  }
  .retreats-seo-inner {
    max-width: 64rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
`}</style>

<div className="retreats-seo">
  <div className="retreats-seo-inner">

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: 24, height: 1, background: 'var(--color-primary)', opacity: 0.5, flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.7 }}>
        Himalayan Retreats
      </span>
    </div>

    <h1 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      lineHeight: 1.15,
      margin: '0 0 1.25rem 0',
      maxWidth: '44rem',
    }}>
      Guided Himalayan Retreats, Designed With Intention
    </h1>

    <p style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.88rem',
      fontWeight: 300,
      lineHeight: 1.85,
      color: '#555555',
      margin: '0 0 1.25rem 0',
      maxWidth: '52rem',
    }}>
      We design Himalayan retreats in India across carefully selected locations in Uttarakhand, offering wellness retreats and guided retreat programs built around small-group and private formats. From restorative yoga and burnout recovery retreats to silent meditation immersions and weekend resets, each experience is created for depth, clarity, and environmental harmony. Our retreats operate in mountain settings such as Chakrata, Sankri, and Rishikesh, with clear travel guidance from nearby hubs like Dehradun. Whether you are seeking a short restorative break or a longer transformational retreat, our programs balance intentional facilitation with practical planning — so you can focus fully on the experience.
    </p>

    <p style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.88rem',
      fontWeight: 300,
      lineHeight: 1.85,
      color: '#555555',
      margin: 0,
      maxWidth: '52rem',
    }}>
      To compare all programs side by side by duration, intensity, and format, see the{' '}
      <Link href="/retreat-programs" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
        full program comparison matrix
      </Link>
      .
    </p>

  </div>
</div>
      
    </main>
  );
}
