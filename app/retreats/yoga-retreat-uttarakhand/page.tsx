import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';

const PATH = '/retreats/yoga-retreat-uttarakhand';

export function generateMetadata(): Metadata {
  return {
    title: 'Yoga Retreats in Uttarakhand | Retreats And Treks',
    description:
      'Find yoga retreats in Uttarakhand across Rishikesh, Chakrata, and Sankri with asana, pranayama, meditation, and Himalayan settings.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Yoga Retreats in Uttarakhand — Mountain Practice in the Himalayas',
      description:
        'Immersive yoga retreat programs in Uttarakhand. Rishikesh, Chakrata and Sankri — asana, breathwork and meditation in genuine Himalayan environments.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Yoga Retreats in Uttarakhand — Mountain Practice in the Himalayas'),
    },
  };
}

const PLACES = [
  {
    id: 'rishikesh',
    href: '/retreats/yoga-retreat-rishikesh',
    name: 'Rishikesh',
    tag: 'Primary Yoga destination',
    image: '/Images/location/rishikesh.webp',
    context: 'The primary recurring Yoga destination in the current product plan. Dates, venue, programme and availability are displayed only when published.',
  },
  {
    id: 'chakrata',
    href: '/retreats/chakrata/yoga-retreat',
    name: 'Chakrata',
    tag: 'On-request Yoga enquiry',
    image: '/Images/location/chakrata.webp',
    context: 'A demand-led Yoga location. Dates, venue and programme details are confirmed individually; no recurring departure is implied.',
  },
  {
    id: 'sankri',
    href: '/retreats/sankri/yoga-retreat',
    name: 'Sankri',
    tag: 'On-request Yoga enquiry',
    image: '/Images/location/sankri.webp',
    context: 'A demand-led Yoga location. Ask the team to confirm suitability, access, season and programme details for your request.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Is Rishikesh the best place for a yoga retreat in Uttarakhand?',
    answer:
      'Rishikesh is the primary recurring Yoga destination in the current product plan. Chakrata and Sankri are presented as on-request locations. Which setting is suitable depends on the actual programme, travel needs and dates confirmed for your enquiry.',
  },
  {
    question: 'Are yoga retreats in Uttarakhand suitable for beginners?',
    answer:
      'Beginner suitability and session adaptations depend on the proposed programme and facilitator. Share your experience level and ask the team to confirm suitability before committing.',
  },
  {
    question: 'How long should a yoga retreat in Uttarakhand be?',
    answer:
      'The product plan supports Weekend, 5-day, 7-day, and 10-day Yoga formats. The right choice depends on your available time and the programme details confirmed for a published departure; current dates and pricing appear in the calendar only when available.',
  },
  {
    question: 'Are yoga retreats in Uttarakhand open year-round?',
    answer:
      'No year-round Yoga operating schedule is published. Season, access and availability should be confirmed for the selected destination and dates before travel.',
  },
  {
    question: 'What is typically included in a yoga retreat in Uttarakhand?',
    answer:
      'Inclusions vary by departure. Meals, accommodation, sessions, equipment, transport and exclusions are not currently attached to future Yoga departures in the event registry. Ask for written details before booking.',
  },
  {
    question: 'Do I need to be physically fit for a yoga retreat?',
    answer:
      'Physical requirements and available adaptations are not published for a future departure. Share any relevant needs and ask the team to confirm the proposed programme before making plans.',
  },
];

export default function YogaRetreatUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Yoga Retreats in Uttarakhand', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Yoga Retreats in Uttarakhand"
        description="Find yoga retreats in Uttarakhand across Rishikesh, Chakrata and Sankri. Structured asana, pranayama and meditation programs in Himalayan mountain settings."
        path={PATH}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Yoga Retreats in Uttarakhand' },
        ]}
      />

      <style>{`
        .med-shell { width: 100vw; margin-left: calc(-50vw + 50%); }
        .med-outer { max-width: 76rem; margin: 0 auto; padding: 0 1.5rem; }
        .med-inner { max-width: 58rem; margin: 0 auto; padding: 0 1.5rem; }

        .med-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.1rem; }
        .med-eyebrow-line { width: 30px; height: 1px; background: rgba(15,118,110,0.35); flex-shrink: 0; }
        .med-eyebrow-text { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6b7280; font-weight: 600; }

        .med-h2 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.12; margin: 0 0 1.1rem; }
        .med-h2 span { color: #0f766e; }
        .med-h3 { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.15rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.7rem; letter-spacing: -0.01em; }
        .med-body { font-family: var(--font-inter), sans-serif; font-size: 0.98rem; line-height: 1.9; color: #4b5259; font-weight: 400; margin: 0 0 1rem; }
        .med-body:last-child { margin-bottom: 0; }
        .med-body strong { color: #2B2A26; font-weight: 600; }

        .med-card {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(15,31,28,0.05);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .med-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: #0f766e; transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index: 2;
        }
        .med-card:hover { transform: translateY(-6px); border-color: rgba(15,118,110,0.28); box-shadow: 0 22px 48px rgba(15,31,28,0.12); }
        .med-card:hover::before { transform: scaleX(1); }

        .med-thumb-img { transition: transform 0.7s cubic-bezier(0.22,1,0.36,1) !important; }
        .med-loc-card:hover .med-thumb-img { transform: scale(1.06); }
        .med-loc-card { position: relative; overflow: hidden; transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease; }
        .med-loc-card:hover { transform: translateY(-5px); box-shadow: 0 20px 44px rgba(10,31,28,0.28); }

        .med-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem 2.3rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; box-shadow: 0 10px 26px rgba(15,118,110,0.25); transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid #0f766e; }
        .med-cta-btn:hover { background: #0d6b64; transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,118,110,0.32); }
        .med-cta-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.85rem 1.8rem; border: 1px solid rgba(15,118,110,0.25); color: #0f766e; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .med-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: translateY(-2px); }

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 960px) { .med-grid-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } .med-grid-3 { grid-template-columns: 1fr; } }

        @keyframes med-hero-zoom { from { transform: scale(1.06); } to { transform: scale(1); } }
        .med-hero-bg { animation: med-hero-zoom 24s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .med-hero-bg { animation: none; } }

        .med-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .med-list-item { display: grid; grid-template-columns: 1.9rem 1fr; gap: 0.9rem; }
        .med-list-dot { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid rgba(15,118,110,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .med-list-dot-inner { width: 7px; height: 7px; border-radius: 50%; background: #0f766e; }
        .med-list-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.85; color: #4b5259; font-weight: 400; }
        .med-list-text strong { color: #2B2A26; font-weight: 600; }

        .med-check-list { padding-left: 0; margin: 0 0 1rem; list-style: none; display: flex; flex-direction: column; gap: 0.7rem; }
        .med-check-item { display: flex; align-items: flex-start; gap: 0.75rem; }
        .med-check-badge { width: 20px; height: 20px; border-radius: 50%; background: #0f766e; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 0.15rem; font-size: 0.62rem; color: #fff; font-weight: 700; }
        .med-check-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.8; color: #4b5259; font-weight: 400; }

        .med-season-card { padding: 1.6rem; }
        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }
      `}</style>

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/himalayanretreats/yoga.webp" alt="Yoga retreats in Uttarakhand" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Asana &middot; Pranayama &middot; Meditation</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Yoga Retreats in Uttarakhand
          </h1>
          <p style={{ maxWidth: '42rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Structured practice across Rishikesh, Chakrata, and Sankri — where studio yoga
            gives way to mountain ridges, river valleys, and genuine Himalayan silence.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['Rishikesh primary', 'Chakrata and Sankri on request', 'Dates only when published'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '999px', padding: '0.45rem 0.9rem', background: 'rgba(15,118,110,0.35)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <TrackedWhatsAppLink
              href={`https://wa.me/919760446101?text=${encodeURIComponent("Hi, I'm interested in a yoga retreat in Uttarakhand. Can you tell me more?")}`}
              sourcePath={PATH}
              location="Uttarakhand"
              intent="Yoga retreat enquiry"
              className="med-cta-btn"
            >
              Check Dates &amp; Programs
            </TrackedWhatsAppLink>
            <a href="#places" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Compare Locations</a>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">From Studio Floors to Mountain Ridges</span>
          </div>
          <h2 className="med-h2">Where practice meets <span>altitude</span></h2>
          <p className="med-body">
            This regional page connects the current Rishikesh Yoga product pathway with
            demand-led enquiries for other Uttarakhand locations. The location cards below
            lead to the relevant page; a link does not mean a fixed retreat date or a confirmed
            programme is available there.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            Asana, pranayama, meditation, and other programme details depend on the selected
            departure or custom enquiry. Dates, venue, access, season, stay, meals, facilitator,
            and inclusions are shown only when verified for that request.
          </p>
        </div>
      </section>

      {/* ── WHY UTTARAKHAND ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Why Here</span>
          </div>
          <h2 className="med-h2">Why Uttarakhand Is the Heart of <span>Yoga in the Himalayas</span></h2>
          <p className="med-body">
            Rishikesh is the primary recurring Yoga destination in this product plan. Chakrata
            and Sankri are demand-led locations. This page helps visitors compare those enquiry
            pathways without implying that all locations have scheduled programmes.
          </p>
          <p className="med-body">
            Location-specific terrain, altitude, access, weather and practice arrangements
            should be checked for the dates being considered. This page does not substitute
            regional descriptions for departure-specific suitability information.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            Ask for the programme details tied to a published date or proposed custom
            itinerary. No fixed date, venue or included activity is implied by a location page.
          </p>
        </div>
      </section>

      {/* ── BEST PLACES ── */}
      <section id="places" className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-outer">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Choose Your Setting</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ textAlign: 'center' }}>Best Places for a <span>Yoga Retreat</span> in Uttarakhand</h2>
          <p className="med-body" style={{ textAlign: 'center', maxWidth: '46rem', margin: '0 auto 2.2rem' }}>
            Rishikesh is the primary recurring Yoga product location. Other locations are
            enquiry-led; whether a programme is feasible depends on the requested dates and
            details confirmed by the team.
          </p>

          <div className="med-grid-3" style={{ marginBottom: '2.2rem' }}>
            {PLACES.map((place) => (
              <Link key={place.id} href={place.href} className="med-loc-card" style={{ position: 'relative', height: '260px', borderRadius: '18px', textDecoration: 'none', color: 'white', display: 'block' }}>
                <img className="med-thumb-img" src={place.image} alt={`${place.name} yoga retreat`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,31,28,0.85), rgba(10,31,28,0.25) 55%, transparent 100%)' }} />
                <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(15,118,110,0.9)', color: 'white', padding: '0.3rem 0.6rem', borderRadius: '999px', fontSize: '0.56rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{place.tag}</span>
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <h3 style={{ margin: '0 0 0.4rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.2rem', fontWeight: 500 }}>{place.name}</h3>
                  <p style={{ margin: 0, fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>{place.context}</p>
                </div>
              </Link>
            ))}
          </div>
            <p className="med-body" style={{ textAlign: 'center' }}>
              Zanskar is outside Uttarakhand and has a separate{' '}
              <Link href="/yoga-retreat-zanskar" style={{ color: '#0f766e', fontWeight: 600 }}>demand-led Yoga enquiry</Link>.
            </p>

          <div className="med-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#0f766e' }}>
              <Link href="/retreats/yoga-retreat-rishikesh" style={{ color: 'inherit', textDecoration: 'none' }}>
                Rishikesh — Riverside Yoga Capital
              </Link>
            </h3>
            <p className="med-body">
              Rishikesh is the primary recurring Yoga destination in the current product plan.
              The exact retreat venue, departure schedule, teacher assignment, stay, meals, and
              availability are not published unless attached to a confirmed departure.
            </p>
            <p className="med-body">
              What distinguishes{' '}
              <Link href="/retreats/yoga-retreat-rishikesh" style={{ color: '#0f766e', fontWeight: 600 }}>
                Rishikesh Yoga retreats
              </Link>{' '}
              from a generic location page is the product path: Weekend, 5-day, 7-day and
              10-day formats are defined, while dated departures and their verified details
              appear in the calendar only when published. Ask about the teaching approach and
              beginner suitability for the selected departure.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              Check travel and access details for the specific dates and venue being
              considered. Current transport arrangements are not published in the departure
              registry.
            </p>
          </div>

          <div className="med-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#0f766e' }}>
              <Link href="/retreats/chakrata/yoga-retreat" style={{ color: 'inherit', textDecoration: 'none' }}>
                Chakrata — Quiet Forest Yoga Immersion
              </Link>
            </h3>
            <p className="med-body">
              Chakrata is an on-request Yoga location. No recurring departure, confirmed venue,
              schedule or included activity is currently published for this page.
            </p>
            <p className="med-body">
              The{' '}
              <Link href="/retreats/chakrata/yoga-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>
                Chakrata retreat environment
              </Link>{' '}
              is an enquiry path for people considering a custom Yoga programme. Venue,
              schedule, season, access, stay, meals, facilitator, and inclusions must be
              confirmed for the proposed dates.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              No fixed Chakrata Yoga dates are published. Use the location page to send an
              enquiry and request verified travel and programme information.
            </p>
          </div>

          <div className="med-card" style={{ padding: '2rem' }}>
            <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '1.3rem', fontWeight: 600, color: '#0f766e' }}>
              <Link href="/retreats/sankri/yoga-retreat" style={{ color: 'inherit', textDecoration: 'none' }}>
                Sankri — High-Altitude Yoga and Nature
              </Link>
            </h3>
            <p className="med-body">
              Sankri is a demand-led Yoga enquiry. No recurring departure or location-specific
              Yoga itinerary is currently published.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              The travel time, access route, season, and programme for{' '}
              <Link href="/retreats/sankri/yoga-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>
                Sankri
              </Link>{' '}
              must be confirmed for the requested dates. Ask the team to assess whether a
              custom programme is feasible before making travel plans.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Daily Rhythm</span>
          </div>
          <h2 className="med-h2">What to Expect in a <span>Yoga Retreat</span> in Uttarakhand</h2>
          <p className="med-body">
            There is no single daily schedule across all Uttarakhand locations. A programme is
            described only when confirmed for a departure or custom enquiry. The Yoga service
            may include asana, pranayama, meditation, and restorative practice; timing and
            inclusion vary by programme.
          </p>

          <div className="med-card" style={{ padding: '2rem' }}>
            <p className="med-body">Current dates, daily schedule, teaching style, meal plan, accommodation, device policy, and inclusions are not published for future Yoga departures. Ask for these details for the specific programme before booking.</p>
            <p className="med-body" style={{ marginBottom: 0 }}>The <Link href="/retreats/yoga-retreat-rishikesh" style={{ color: '#0f766e', fontWeight: 600 }}>Rishikesh Yoga product page</Link> links to real product departures when present. Chakrata and Sankri are on-request; Zanskar information is handled through an enquiry.</p>
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD CHOOSE ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Who It&apos;s For</span>
          </div>
          <h2 className="med-h2">Who Should Choose a <span>Yoga Retreat</span> in Uttarakhand</h2>
          <p className="med-body">
            Use the product and location pages to compare formats, then share your experience
            and requirements. Eligibility and programme suitability are confirmed for the actual
            departure or on-request proposal.
          </p>

          <div className="med-card" style={{ padding: '2rem' }}>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>People exploring Yoga practice.</strong> Share your experience level and ask how the confirmed programme adapts its sessions before booking.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>People comparing settings.</strong> Rishikesh is the primary product path; Chakrata and Sankri are on-request enquiries.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>People planning together.</strong> Share group size and requested dates so the team can confirm whether an appropriate programme can be arranged.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Visitors needing travel details.</strong> Venue, transfer, language, visa, and arrival information are not attached to unpublished departures; request confirmed details before travel.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>People choosing a duration.</strong> Compare Weekend, 5-day, 7-day and 10-day formats; no schedule or departure is implied by the duration page.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── BEST TIME ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Timing It Right</span>
          </div>
          <h2 className="med-h2">Best Time for a <span>Yoga Retreat</span> in Uttarakhand</h2>
          <p className="med-body">
            No year-round Yoga operating calendar is published across these locations. Seasonal
            suitability, access, and weather depend on destination and requested dates and
            must be confirmed before travel.
          </p>
          <p className="med-body" style={{ marginTop: '1rem', marginBottom: 0 }}>
            Ask the team to verify conditions for the actual dates and location. No season shown
            here should be treated as confirmation that a Yoga departure is operating.
          </p>
        </div>
      </section>

      {/* ── COMMERCIAL NAVIGATION ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '0 0 3rem' }}>
        <div className="med-inner">
          <div className="med-card" style={{ padding: '1.6rem 1.8rem' }}>
            <p className="med-body" style={{ fontSize: '0.95rem' }}>
              Exploring all retreat options? See{' '}
              <Link href="/retreats/himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                Himalayan wellness retreats
              </Link>{' '}
              for every destination, duration, and program type.
            </p>
            <p className="med-body" style={{ margin: 0, fontSize: '0.95rem' }}>
              For location-specific planning across the state, see{' '}
              <Link href="/retreats/uttarakhand-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                Uttarakhand retreats
              </Link>.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
              <Link href="/yoga-retreats" className="med-cta-outline">Yoga retreats hub</Link>
              <Link href="/5-day-yoga-retreat" className="med-cta-outline">5-day Yoga</Link>
              <Link href="/7-day-yoga-retreat" className="med-cta-outline">7-day Yoga</Link>
              <Link href="/10-day-yoga-retreat" className="med-cta-outline">10-day Yoga</Link>
              <Link href="/yoga-teacher-training" className="med-cta-outline">Yoga Teacher Training</Link>
              <Link href="/find-your-retreat?type=yoga" className="med-cta-outline">Help Me Choose</Link>
              <Link href="/retreat-calendar" className="med-cta-outline">Retreat dates</Link>
              <Link href="/compare/chakrata-yoga-retreat-vs-rishikesh-yoga-retreat" className="med-cta-outline">Rishikesh vs Chakrata</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Common Questions</span>
          </div>
          <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '48vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/location/chakrata.webp" alt="Yoga retreat setting in Uttarakhand" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.86)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '42rem', padding: '4rem 1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.5rem, 2.9vw, 2.1rem)', fontWeight: 500, color: '#F6F2E7' }}>Ready to find your practice in the mountains?</h2>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: 'rgba(246,242,231,0.78)' }}>Talk with us about dates, location, and the right format for your practice.</p>
          <a href={`https://wa.me/919760446101?text=${encodeURIComponent('Hi, I want to plan a yoga retreat in Uttarakhand. Can we discuss dates and options?')}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Check Dates &amp; Programs</a>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <nav className="med-shell" style={{ background: '#ffffff' }}>
        <div className="med-inner" style={{ borderTop: '1px solid rgba(15,118,110,0.1)', padding: '2rem 1.5rem 3.5rem' }}>
          <Link href="/retreats" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
            ← All Retreats
          </Link>
        </div>
      </nav>
    </TrackedPage>
  );
}
