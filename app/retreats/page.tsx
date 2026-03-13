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
    title: 'Art Retreats',
    description: 'Creative retreats combining art, nature, and healing.',
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

      {/* ── RETREAT GUIDES ── */}
      <style>{`
  .retreat-guides {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #f7f9f7;
    padding: 4rem 0 3.5rem;
    border-top: 1px solid #e5e7eb;
  }
  .retreat-guides-inner {
    max-width: 64rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
  .retreat-guides-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .retreat-guide-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.1rem 1.25rem;
    background: #ffffff;
    border: 1px solid #eef0ee;
    border-radius: 8px;
    text-decoration: none;
    color: #333;
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.88rem;
    font-weight: 300;
    transition: border-color 0.2s, color 0.2s;
  }
  .retreat-guide-card:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
  .retreat-guide-card::after {
    content: '→';
    color: var(--color-primary);
    opacity: 0.5;
    flex-shrink: 0;
    margin-left: 0.75rem;
  }
`}</style>

      <div className="retreat-guides">
        <div className="retreat-guides-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: 24, height: 1, background: 'var(--color-primary)', opacity: 0.5, flexShrink: 0, display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.7 }}>
              Retreat Guides
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.25rem, 2.2vw, 1.65rem)',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            color: '#111',
            lineHeight: 1.15,
            margin: '0 0 0.5rem',
          }}>
            Explore Our <span style={{ color: 'var(--color-primary)' }}>Retreat Guides</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.88rem',
            fontWeight: 300,
            lineHeight: 1.85,
            color: '#555',
            margin: 0,
            maxWidth: '48rem',
          }}>
            In-depth guides to help you plan the right retreat — from weekend escapes near Delhi to longer Himalayan immersions.
          </p>
          <div className="retreat-guides-grid">
            <Link href="/retreats/weekend-retreat-near-delhi" className="retreat-guide-card">
              Weekend Retreat Near Delhi
            </Link>
            <Link href="/retreats/retreats-near-delhi" className="retreat-guide-card">
              Retreats Near Delhi
            </Link>
            <Link href="/retreats/weekend-himalayan-retreats" className="retreat-guide-card">
              Weekend Himalayan Retreats
            </Link>
            <Link href="/retreats/best-retreat-in-uttarakhand" className="retreat-guide-card">
              Best Retreats in Uttarakhand
            </Link>
            <Link href="/retreats/retreat-cost-india" className="retreat-guide-card">
              Retreat Costs in India (2026)
            </Link>
          </div>
        </div>
      </div>

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
      We design Himalayan retreats in India across carefully selected locations in Uttarakhand, offering wellness retreats and guided retreat programs built around small-group and private formats. From restorative yoga and burnout recovery retreats to silent meditation immersions and weekend resets, each experience is created for depth, clarity, and environmental harmony. Our <Link href="/creative-retreat" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Creative Healing Retreat</Link> offers emotional healing through art, yoga, and nature. Our retreats operate in mountain settings such as Chakrata, Sankri, and Rishikesh, with clear travel guidance from nearby hubs like Dehradun. Whether you are seeking a short restorative break or a longer transformational retreat, our programs balance intentional facilitation with practical planning — so you can focus fully on the experience.
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
