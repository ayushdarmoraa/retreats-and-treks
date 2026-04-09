import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateWebsiteSchema, generateOrganizationSchema } from '@/components/seo/Schema';
import { getLocationsWithRetreats } from '@/lib/locations';
import HomeClient from './HomeClient';
import PrimaryCTA from '@/components/PrimaryCTA';
import { getAllRetreatServices } from '@/content/retreats/services';
import { getAggregateRating, RETREAT_REVIEWS } from '@/content/reviews';
import DeferredReviewerSection from '@/components/client/DeferredReviewerSection';

export function generateMetadata(): Metadata {
  return {
    title: 'Himalayan Retreats & Treks – Designed Around Your Intention',
    description:
      'Curated retreats and treks across carefully chosen Himalayan locations. Designed around your intention, not fixed schedules. Small groups, request-based journeys.',
    alternates: {
      canonical: buildCanonicalUrl('/'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function HomePage() {
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();
  const locationsWithRetreats = getLocationsWithRetreats();
  const allRetreats = getAllRetreatServices();
  const finderRatings = Object.fromEntries(
    allRetreats.flatMap((s) => {
      const r = getAggregateRating(s.slug);
      return r ? [[s.slug, { value: r.ratingValue, count: r.reviewCount }]] : [];
    }),
  );

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <HomeClient locations={locationsWithRetreats} />

      <style>{`
  .home-seo {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #ffffff;
    padding: 4rem 0 3rem;
  }
  .home-seo-inner {
    max-width: 64rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
`}</style>

<div className="home-seo">
  <div className="home-seo-inner">

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
    <span style={{ width: 24, height: 1, background: 'rgba(15, 118, 110, 0.5)', flexShrink: 0, display: 'inline-block' }} />
    <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151' }}>
        Himalayan Journeys
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
      Himalayan Retreats and Guided Treks in India
    </h1>

    <p style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.88rem',
      fontWeight: 300,
      lineHeight: 1.85,
      color: '#555555',
      margin: 0,
      maxWidth: '52rem',
    }}>
      We design Himalayan retreats in Uttarakhand across thoughtfully chosen locations such as Chakrata, Sankri, and Rishikesh. Our offerings include wellness retreats in India focused on burnout recovery, restorative yoga, and guided reflection, alongside guided Himalayan treks for participants seeking embodied movement and scenic immersion. Chakrata retreats emphasize forested silence and accessible weekend formats; Sankri retreats provide remote bases for multi-day immersion and trek access; Rishikesh retreats connect you to established yoga communities and riverfront practice. Programs prioritize facilitator expertise, environmental fit, and clear travel guidance from nearby hubs like Dehradun so you can plan with confidence.
    </p>

  </div>
</div>
      

      <PrimaryCTA
        label="Speak With a Mountain Planner"
        subtext="Not sure where to start? Tell us what you are looking for and we will guide you."
        vertical="retreat"
        category="homepage"
        sourcePath="/"
      />

      {/* ── FEATURED RETREATS & TREKS (server-rendered links for crawl depth) ── */}
<style>{`
  .home-featured {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #f7f9f7;
    padding: 5rem 0;
  }
  .home-featured-inner {
    max-width: 56rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
  .home-featured-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1px;
    background: rgba(15,118,110,0.08);
    border: 1px solid rgba(15,118,110,0.08);
    margin-top: 2rem;
  }
  .home-featured-col {
    background: #f7f9f7;
    padding: 1.75rem;
  }
  .home-featured-col h3 {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #374151;
    margin: 0 0 1rem 0;
  }
  .home-featured-col ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .home-featured-col li {
    margin: 0 0 0.5rem 0;
  }
  .home-featured-col a {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.88rem;
    font-weight: 400;
    line-height: 1.7;
    color: #1f2937;
    text-decoration: none;
  }
  .home-featured-col a:hover {
    color: #374151;
    text-decoration: underline;
  }
`}</style>

<section className="home-featured">
  <div className="home-featured-inner">

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: 24, height: 1, background: 'rgba(15, 118, 110, 0.5)', flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151' }}>
        Featured Retreats &amp; Treks
      </span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      marginBottom: '0.5rem',
      lineHeight: 1.15,
    }}>
      Featured Retreats &amp; Treks
    </h2>

    <p style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.88rem',
      fontWeight: 300,
      lineHeight: 1.85,
      color: '#555555',
      margin: 0,
    }}>
      Quick access to our core hubs, high-intent retreat programs, and priority locations.
    </p>

    <div className="home-featured-grid">
      <div className="home-featured-col">
        <h3>Core Hubs</h3>
        <ul>
          <li><Link href="/retreats">Himalayan retreats — all locations &amp; programs</Link></li>
          <li><Link href="/retreats/best-retreat-in-uttarakhand">Best retreats in Uttarakhand — ranked by purpose &amp; season</Link></li>
          <li><Link href="/treks">Himalayan treks — weekend &amp; multi-day routes</Link></li>
          <li><Link href="/treks/best-treks-in-uttarakhand">Best treks in Uttarakhand — beginner to high-altitude guide</Link></li>
          <li><Link href="/retreat-programs">Program comparison matrix — filter by duration &amp; intensity</Link></li>
          <li><Link href="/blog">Retreat &amp; trek blog — guides and comparisons</Link></li>
        </ul>
      </div>

      <div className="home-featured-col">
        <h3>High-Intent Programs</h3>
        <ul>
          <li><Link href="/retreats/journeys/burnout-recovery">Burnout Recovery retreat — deep restorative program</Link></li>
          <li><Link href="/retreats/journeys/rest-and-reset">Rest &amp; Reset retreat — nervous system recalibration</Link></li>
          <li><Link href="/retreats/journeys/yoga-and-movement">Yoga &amp; Movement retreat — embodied practice</Link></li>
          <li><Link href="/creative-retreat">Creative Healing Retreat — emotional healing through art, yoga, and nature</Link></li>
        </ul>
      </div>

      <div className="home-featured-col">
        <h3>Priority Locations</h3>
        <ul>
          <li><Link href="/retreats/chakrata">Chakrata retreat hub — forest retreats &amp; weekend escapes</Link></li>
          <li><Link href="/retreats/sankri">Sankri retreat hub — remote mountain retreats &amp; trek access</Link></li>
          <li><Link href="/retreats/rishikesh">Rishikesh retreat hub — yoga infrastructure &amp; riverfront retreats</Link></li>
        </ul>
      </div>

      <div className="home-featured-col">
        <h3>Popular Treks</h3>
        <ul>
          <li><Link href="/treks/location/lohajung/roopkund-trek">Roopkund Trek — 4,800m mystery lake expedition</Link></li>
          <li><Link href="/treks/location/lohajung/brahmatal-trek">Brahmatal Trek — frozen lake winter snow trek</Link></li>
          <li><Link href="/treks/location/sankri/har-ki-dun-trek">Har Ki Dun Trek — sacred valley trek</Link></li>
          <li><Link href="/treks/location/barsu/dayara-bugyal-trek">Dayara Bugyal Trek — alpine meadow beginner trek</Link></li>
        </ul>
      </div>
    </div>
  </div>
  </section>

      <DeferredReviewerSection finderRatings={finderRatings} />

 


      <section className="rpr-wrap">
  <style>{`
    .rpr-wrap {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #f7f9f7; 
      padding: 5rem 0;
      position: relative;
    }

    .rpr-inner {
      max-width: 56rem;
      margin: 0 auto;
      padding: 0 var(--space-md);
    }

    .rpr-h2 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1.4rem, 2.5vw, 1.85rem);
      font-weight: 200;
      letter-spacing: -0.03em;
      color: #111111;
      line-height: 1.15;
      margin: 0 0 1.75rem 0;
      padding-top: 0;
    }
    .rpr-h2-accent {
      color: #374151;
      font-weight: 200;
    }

    .rpr-list {
      padding: 0;
      margin: 0;
      list-style: none;
    }
    .rpr-list li {
      position: relative;
      border-bottom: 1px solid rgba(15,118,110,0.07);
    }
    .rpr-list li:first-child {
      border-top: 1px solid rgba(15,118,110,0.07);
    }
    .rpr-list li::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 3px;
      background: var(--color-primary);
      transform: scaleY(0);
      transform-origin: bottom;
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
    }
    .rpr-list li:hover::before {
      transform: scaleY(1);
    }
    .rpr-list li a {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.88rem;
      font-weight: 300;
      color: #2563eb;
      text-decoration: none;
      display: block;
      padding: 0.9rem 0 0.9rem 1rem;
      line-height: 1.5;
      transition: color 0.2s, padding-left 0.25s cubic-bezier(0.16,1,0.3,1);
    }
    .rpr-list li:hover a {
      color: #374151;
      padding-left: 1.4rem;
    }
  `}</style>

  <div className="rpr-inner">

    <h2 className="rpr-h2">
      Retreat Planning{' '}
      <span className="rpr-h2-accent">Resources</span>
    </h2>

    <ul className="rpr-list">
      <li>
        <Link href="/retreat-programs">
          Compare all retreat programs
        </Link>
      </li>
      <li>
        <Link href="/topics/retreat-decision">
          How to Choose the Right Retreat
        </Link>
      </li>
      <li>
        <Link href="/topics/location-authority">
          Explore Retreat Locations
        </Link>
      </li>
    </ul>

  </div>
</section>
    </main>
  );
}
