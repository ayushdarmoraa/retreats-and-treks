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
      <p style={{ fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 'var(--space-md)', color: 'var(--color-text)' }}>
        Before exploring specific locations, you may find it helpful to read our complete guide to{' '}
        <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
          Himalayan Retreats in India
        </Link>
        . The guide explains retreat formats, seasonal considerations, and how to choose the right
        structure based on your intention and experience level.
      </p>
      <p style={{ fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 'var(--space-lg)', color: 'var(--color-text)' }}>
        To compare all programs side by side by duration, intensity, and format, see the{' '}
        <Link href="/retreat-programs" style={{ color: 'var(--color-primary)' }}>
          full program comparison matrix
        </Link>
        .
      </p>
      <RetreatsClient
        intentions={intentOptions}
        processSteps={processSteps}
        whyUsPoints={whyUsPoints}
        retreatFormats={retreatFormats}
        locations={locationsWithRetreats}
      />
    </main>
  );
}
