import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateWebsiteSchema, generateOrganizationSchema } from '@/components/seo/Schema';
import { getLocationsWithRetreats } from '@/lib/locations';
import HomeClient from './HomeClient';
import PrimaryCTA from '@/components/PrimaryCTA';
import { getAllRetreatServices } from '@/content/retreats/services';
import { getAggregateRating } from '@/content/reviews';
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
    <main style={{ overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <HomeClient locations={locationsWithRetreats} />

      {/* ── CINEMATIC SEO MANIFESTO ── */}
      <section style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        padding: '8rem 2rem',
        background: '#111',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <Image
          src="/Images/whyhimalaya/nature.webp"
          alt="Deep Himalayan Forest"
          fill
          style={{ objectFit: 'cover', opacity: 0.3 }}
          sizes="100vw"
        />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '64rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ width: 24, height: 1, background: 'var(--color-primary)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#e5e7eb' }}>
              The Core Philosophy
            </span>
            <span style={{ width: 24, height: 1, background: 'var(--color-primary)', display: 'inline-block' }} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 200, letterSpacing: '-0.03em',
            margin: '0 0 2rem 0',
            lineHeight: 1.15,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}>
            Himalayan Retreats and Guided <span style={{ color: '#aaa', fontWeight: 200 }}>Treks in India</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            fontWeight: 300, lineHeight: 1.85,
            color: '#d1d5db',
            maxWidth: '52rem',
            margin: '0 auto',
            textShadow: '0 1px 5px rgba(0,0,0,0.5)'
          }}>
            We design Himalayan retreats in Uttarakhand across thoughtfully chosen locations such as Chakrata, Sankri, and Rishikesh. Our offerings include wellness retreats in India focused on burnout recovery, restorative yoga, and guided reflection, alongside guided Himalayan treks for participants seeking embodied movement and scenic immersion. Retreats are intentionally built around environmental fit, and clear travel guidance from nearby hubs like Dehradun so you can step into the wilderness with confidence.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: '52rem', margin: '0 auto', padding: '5rem 2rem 5rem' }}>
        <PrimaryCTA
          label="Speak With a Mountain Planner"
          subtext="Not sure where to start? Tell us what you are looking for and we will guide you."
          vertical="retreat"
          category="homepage"
          sourcePath="/"
        />
      </section>

      {/* ── FEATURED EXPERIENCES (High Visual Structure) ── */}
      <section style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        background: '#f7f9f7',
        padding: '6rem 2rem',
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '78rem', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ width: 24, height: 1, background: 'var(--color-primary)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151' }}>
              Directory
            </span>
          </div>
          
          <h2 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
            fontWeight: 200, letterSpacing: '-0.03em',
            color: '#111',
            margin: '0 0 0.5rem 0'
          }}>
            Featured <span style={{ color: '#555', fontWeight: 200 }}>Journeys &amp; Hubs</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1rem', color: '#666', fontWeight: 300, marginBottom: '3.5rem' }}>
            Quick access to our high-intent retreat programs and priority alpine locations.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem'
          }}>
            {[
              {
                title: 'Core Hubs',
                links: [
                  { text: 'Himalayan retreats — programs', href: '/retreats' },
                  { text: 'Best retreats in Uttarakhand', href: '/retreats/best-retreat-in-uttarakhand' },
                  { text: 'Himalayan treks — routes', href: '/treks' },
                  { text: 'Best treks in Uttarakhand', href: '/treks/best-treks-in-uttarakhand' },
                  { text: 'Program comparison matrix', href: '/retreat-programs' }
                ]
              },
              {
                title: 'High-Intent Programs',
                links: [
                  { text: 'Burnout Recovery retreat', href: '/retreats/journeys/burnout-recovery' },
                  { text: 'Rest & Reset retreat', href: '/retreats/journeys/rest-and-reset' },
                  { text: 'Yoga & Movement retreat', href: '/retreats/journeys/yoga-and-movement' },
                  { text: 'Creative Healing Retreat', href: '/creative-retreat' }
                ]
              },
              {
                title: 'Priority Locations',
                links: [
                  { text: 'Chakrata forest retreats', href: '/locations/chakrata' },
                  { text: 'Sankri basecamp escapes', href: '/locations/sankri' },
                  { text: 'Rishikesh yoga riverfront', href: '/locations/rishikesh' },
                  { text: 'Joshimath sanctuary', href: '/locations/joshimath' }
                ]
              },
              {
                title: 'Expedition Treks',
                links: [
                  { text: 'Brahmatal Winter Trek', href: '/treks/location/lohajung/brahmatal-trek' },
                  { text: 'Roopkund Lake', href: '/treks/location/lohajung/roopkund-trek' },
                  { text: 'Har Ki Dun Valley', href: '/treks/location/sankri/har-ki-dun-trek' },
                  { text: 'Dayara Bugyal Meadows', href: '/treks/location/barsu/dayara-bugyal-trek' }
                ]
              }
            ].map((col, idx) => (
              <div key={idx} style={{
                background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '2rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)', transition: 'box-shadow 0.2s',
              }} className="hover:shadow-lg">
                <h3 style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.05rem', fontWeight: 600, color: '#111', margin: '0 0 1.25rem'
                }}>
                  {col.title}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {col.links.map(l => (
                    <li key={l.href}>
                      <Link href={l.href} style={{
                        fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', color: '#555', textDecoration: 'none', transition: 'color 0.15s, padding-left 0.2s'
                      }} className="block hover:text-[var(--color-primary)] hover:pl-2">
                        {l.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DeferredReviewerSection finderRatings={finderRatings} />

      {/* ── PLANNING RESOURCES ── */}
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '6rem 2rem 8rem',
      }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.8rem, 2.5vw, 2.2rem)',
            fontWeight: 200, letterSpacing: '-0.03em', color: '#111', margin: '0 0 2.5rem', textAlign: 'center'
          }}>
            Retreat Planning <span style={{ color: '#555', fontWeight: 200 }}>Resources</span>
          </h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { text: 'Compare All Retreat Programs', href: '/retreat-programs' },
              { text: 'How to Choose the Right Retreat', href: '/topics/retreat-decision' },
              { text: 'Explore Basecamp Locations', href: '/locations' },
              { text: 'View Retreat Calendar', href: '/retreat-calendar' },
            ].map((link, i) => (
              <Link key={i} href={link.href} style={{
                display: 'block', padding: '1.25rem 2rem', background: '#f7f9f7',
                border: '1px solid #e5e7eb', borderRadius: '8px',
                fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.05rem', color: '#2563eb',
                textDecoration: 'none', fontWeight: 300, transition: 'background 0.2s, transform 0.2s',
              }} className="hover:bg-blue-50 hover:-translate-y-1">
                {link.text} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
