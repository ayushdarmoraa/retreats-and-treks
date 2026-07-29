// app/retreats/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
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
    openGraph: {
      title: 'Guided Himalayan Retreats | Retreats And Treks',
      description: 'Small-group and private retreats across quiet Himalayan locations — created around rest, clarity, and depth.',
      url: buildCanonicalUrl('/retreats'),
      type: 'website',
      siteName: 'Retreats And Treks',
      locale: 'en_IN',
      images: buildOgImages('Guided Himalayan Retreats | Retreats And Treks'),
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
    <>
      <main style={{ maxWidth: '84rem', margin: '0 auto', padding: '80px 4rem 0' }}>
        <RetreatsClient
          intentions={intentOptions}
          whyUsPoints={whyUsPoints}
          retreatFormats={retreatFormats}
          locations={locationsWithRetreats}
        />

        {/* ── RETREAT BY INTENTION ── */}
        <section className="retreat-overview">
          <style>{`
            .retreat-overview {
              width: 100vw;
              margin-left: calc(-50vw + 50%);
              background: linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
              padding: 5rem 0;
              border-top: 1px solid rgba(15, 118, 110, 0.08);
              border-bottom: 1px solid rgba(15, 118, 110, 0.08);
            }
            .retreat-overview-inner {
              max-width: 84rem;
              margin: 0 auto;
              padding: 0 4rem;
            }
            .retreat-overview-header {
              display: flex;
              align-items: end;
              justify-content: space-between;
              gap: 1.5rem;
              margin-bottom: 2rem;
            }
            .retreat-overview-eyebrow {
              display: inline-flex;
              align-items: center;
              gap: 0.7rem;
              margin-bottom: 0.9rem;
            }
            .retreat-overview-eyebrow-line {
              width: 32px;
              height: 1px;
              background: #0f766e;
              opacity: 0.35;
            }
            .retreat-overview-eyebrow-text {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.72rem;
              letter-spacing: 0.32em;
              text-transform: uppercase;
              color: #6b7280;
              font-weight: 600;
            }
            .retreat-overview-title {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(2rem, 3.5vw, 2.8rem);
              font-weight: 200;
              letter-spacing: -0.03em;
              color: #111;
              margin: 0;
              line-height: 1.1;
            }
            .retreat-overview-title span {
              color: #0f766e;
              font-weight: 200;
            }
            .retreat-overview-copy {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.95rem;
              line-height: 1.8;
              color: #5f6b72;
              font-weight: 300;
              margin: 0;
              max-width: 34rem;
            }
            .retreat-overview-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
              gap: 1rem;
            }
            .retreat-overview-card {
              display: block;
              padding: 1.25rem 1.3rem;
              background: #fff;
              border: 1px solid rgba(15, 118, 110, 0.12);
              border-radius: 16px;
              text-decoration: none;
              color: #111;
              box-shadow: 0 10px 30px rgba(15, 31, 28, 0.05);
              transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
            }
            .retreat-overview-card:hover {
              transform: translateY(-4px);
              border-color: rgba(15, 118, 110, 0.25);
              box-shadow: 0 16px 38px rgba(15, 31, 28, 0.10);
            }
            .retreat-overview-card strong {
              display: block;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 1rem;
              font-weight: 600;
              margin-bottom: 0.45rem;
            }
            .retreat-overview-card span {
              display: block;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.9rem;
              line-height: 1.6;
              color: #5f6b72;
              font-weight: 300;
            }
            @media (max-width: 900px) {
              .retreat-overview-inner { padding: 0 2rem; }
              .retreat-overview-header { flex-direction: column; align-items: start; }
            }
            @media (max-width: 640px) {
              .retreat-overview { padding: 4rem 0; }
              .retreat-overview-inner { padding: 0 1.5rem; }
            }
          `}</style>

          <div className="retreat-overview-inner">
            <div className="retreat-overview-header">
              <div>
                <div className="retreat-overview-eyebrow">
                  <span className="retreat-overview-eyebrow-line" />
                  <span className="retreat-overview-eyebrow-text">Retreat by intention</span>
                </div>
                <h2 className="retreat-overview-title">
                  Choose the kind of <span>reset</span> you actually need.
                </h2>
              </div>
              <p className="retreat-overview-copy">
                Whether you want silence, movement, creativity, or a short reset near Delhi, the experience is shaped by place and pacing.
              </p>
            </div>

            <div className="retreat-overview-grid">
              {[
                { title: 'Rest & reset', copy: 'Slow down in mountain stillness and let the day open up.', href: '/retreats/weekend-himalayan-retreats' },
                { title: 'Yoga & breath', copy: 'Choose structure, teachers, and riverside practice in the mountains.', href: '/retreats/yoga-retreat-rishikesh' },
                { title: 'Art & creativity', copy: 'Move into a more expressive, healing kind of retreat experience.', href: '/retreats/art' },
              ].map((item) => (
                <Link key={item.title} href={item.href} className="retreat-overview-card">
                  <strong>{item.title}</strong>
                  <span>{item.copy}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── RETREAT GUIDES ── */}
        <section className="retreat-guides">
          <style>{`
            .retreat-guides {
              width: 100vw;
              margin-left: calc(-50vw + 50%);
              background: #f7f9f7;
              padding: 6rem 0;
              border-top: 1px solid rgba(0, 0, 0, 0.04);
              border-bottom: 1px solid rgba(0, 0, 0, 0.04);
            }
            .retreat-guides-inner {
              max-width: 84rem;
              margin: 0 auto;
              padding: 0 4rem;
            }
            .retreat-guides-header {
              text-align: center;
              margin-bottom: 3.5rem;
            }
            .retreat-guides-badge {
              display: inline-flex;
              align-items: center;
              gap: 0.8rem;
              margin-bottom: 1.2rem;
            }
            .retreat-guides-badge-line {
              width: 36px;
              height: 1px;
              background: #0f766e;
              opacity: 0.3;
            }
            .retreat-guides-badge-text {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.7rem;
              letter-spacing: 0.35em;
              text-transform: uppercase;
              color: #6b7280;
              font-weight: 500;
            }
            .retreat-guides-headline {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(2.5rem, 4vw, 4rem);
              font-weight: 200;
              letter-spacing: -0.03em;
              color: #1a1814;
              margin: 0 0 0.75rem;
              line-height: 1.1;
            }
            .retreat-guides-headline .accent {
              color: #0f766e;
              font-weight: 200;
            }
            .retreat-guides-sub {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 1rem;
              color: #6b7280;
              font-weight: 300;
              max-width: 48rem;
              margin: 0 auto;
              line-height: 1.8;
            }
            .retreat-guides-divider {
              width: 60px;
              height: 2px;
              background: linear-gradient(90deg, #0f766e, rgba(15, 118, 110, 0.03));
              margin: 1.5rem auto 0;
              border-radius: 4px;
              opacity: 0.2;
            }
            .retreat-guides-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
              gap: 1rem;
              margin-top: 2.5rem;
            }
            .retreat-guide-card {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 1rem 1.5rem;
              background: #ffffff;
              border: 1px solid rgba(0, 0, 0, 0.04);
              border-radius: 12px;
              text-decoration: none;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.88rem;
              font-weight: 400;
              color: #1a1814;
              transition: all 0.3s ease;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
            }
            .retreat-guide-card:hover {
              border-color: rgba(15, 118, 110, 0.15);
              color: #0f766e;
              transform: translateY(-2px);
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
            }
            .retreat-guide-card::after {
              content: '→';
              color: #6b7280;
              flex-shrink: 0;
              margin-left: 0.75rem;
              transition: transform 0.3s ease;
            }
            .retreat-guide-card:hover::after {
              transform: translateX(4px);
              color: #0f766e;
            }

            @media (max-width: 900px) {
              .retreat-guides-inner {
                padding: 0 2rem;
              }
              .retreat-guides-headline {
                font-size: clamp(2rem, 6vw, 3rem);
              }
            }
            @media (max-width: 640px) {
              .retreat-guides {
                padding: 4rem 0;
              }
              .retreat-guides-inner {
                padding: 0 1.5rem;
              }
              .retreat-guides-grid {
                grid-template-columns: 1fr;
              }
              .retreat-guides-headline {
                font-size: clamp(1.8rem, 5vw, 2.5rem);
              }
              .retreat-guides-badge-text {
                font-size: 0.6rem;
              }
            }
          `}</style>

          <div className="retreat-guides-inner">
            <div className="retreat-guides-header">
              <div className="retreat-guides-badge">
                <span className="retreat-guides-badge-line" />
                <span className="retreat-guides-badge-text">Retreat Guides</span>
                <span className="retreat-guides-badge-line" />
              </div>
              <h2 className="retreat-guides-headline">
                Explore Our <span className="accent">Retreat Guides</span>
              </h2>
              <p className="retreat-guides-sub">
                In-depth guides to help you plan the right retreat — from weekend escapes near Delhi to longer Himalayan immersions.
              </p>
              <div className="retreat-guides-divider" />
            </div>

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
        </section>

        {/* ── SEO CONTENT ── */}
        <section className="retreats-seo">
          <style>{`
            .retreats-seo {
              width: 100vw;
              margin-left: calc(-50vw + 50%);
              background: #ffffff;
              padding: 6rem 0;
            }
            .retreats-seo-inner {
              max-width: 84rem;
              margin: 0 auto;
              padding: 0 4rem;
            }
            .retreats-seo-header {
              text-align: center;
              margin-bottom: 3rem;
            }
            .retreats-seo-badge {
              display: inline-flex;
              align-items: center;
              gap: 0.8rem;
              margin-bottom: 1.2rem;
            }
            .retreats-seo-badge-line {
              width: 36px;
              height: 1px;
              background: #0f766e;
              opacity: 0.3;
            }
            .retreats-seo-badge-text {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.7rem;
              letter-spacing: 0.35em;
              text-transform: uppercase;
              color: #6b7280;
              font-weight: 500;
            }
            .retreats-seo-headline {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(2.5rem, 4vw, 4rem);
              font-weight: 200;
              letter-spacing: -0.03em;
              color: #1a1814;
              margin: 0 0 0.5rem;
              line-height: 1.1;
            }
            .retreats-seo-headline .accent {
              color: #0f766e;
              font-weight: 200;
            }
            .retreats-seo-divider {
              width: 60px;
              height: 2px;
              background: linear-gradient(90deg, #0f766e, rgba(15, 118, 110, 0.03));
              margin: 1.5rem auto 0;
              border-radius: 4px;
              opacity: 0.2;
            }
            .retreats-seo-body {
              max-width: 52rem;
              margin: 0 auto;
            }
            .retreats-seo-text {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 1rem;
              font-weight: 300;
              line-height: 2;
              color: #6b7280;
              margin: 0 0 1.5rem;
              text-align: center;
            }
            .retreats-seo-text:last-child {
              margin-bottom: 0;
            }
            .retreats-seo-text a {
              color: #0f766e;
              text-decoration: none;
              border-bottom: 1px solid rgba(15, 118, 110, 0.15);
              transition: border-color 0.3s ease;
            }
            .retreats-seo-text a:hover {
              border-color: #0f766e;
            }

            @media (max-width: 900px) {
              .retreats-seo-inner {
                padding: 0 2rem;
              }
              .retreats-seo-headline {
                font-size: clamp(2rem, 6vw, 3rem);
              }
            }
            @media (max-width: 640px) {
              .retreats-seo {
                padding: 4rem 0;
              }
              .retreats-seo-inner {
                padding: 0 1.5rem;
              }
              .retreats-seo-headline {
                font-size: clamp(1.8rem, 5vw, 2.5rem);
              }
              .retreats-seo-text {
                font-size: 0.95rem;
                text-align: left;
              }
              .retreats-seo-badge-text {
                font-size: 0.6rem;
              }
            }
          `}</style>

          <div className="retreats-seo-inner">
            <div className="retreats-seo-header">
              <div className="retreats-seo-badge">
                <span className="retreats-seo-badge-line" />
                <span className="retreats-seo-badge-text">Himalayan Retreats</span>
                <span className="retreats-seo-badge-line" />
              </div>
              <h2 className="retreats-seo-headline">
                Guided Himalayan Retreats, <span className="accent">Designed With Intention</span>
              </h2>
              <div className="retreats-seo-divider" />
            </div>

            <div className="retreats-seo-body">
              <p className="retreats-seo-text">
                We design Himalayan retreats in India across carefully selected locations in Uttarakhand, offering wellness retreats and guided retreat programs built around small-group and private formats. From restorative yoga and burnout recovery retreats to silent meditation immersions and weekend resets, each experience is created for depth, clarity, and environmental harmony. Our <Link href="/creative-retreat">Creative Healing Retreat</Link> offers emotional healing through art, yoga, and nature. Our retreats operate in mountain settings such as Chakrata, Sankri, and Rishikesh, with clear travel guidance from nearby hubs like Dehradun. Whether you are seeking a short restorative break or a longer transformational retreat, our programs balance intentional facilitation with practical planning — so you can focus fully on the experience.
              </p>

              <p className="retreats-seo-text">
                To compare all programs side by side by duration, intensity, and format, see the{' '}
                <Link href="/retreat-programs">full program comparison matrix</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
