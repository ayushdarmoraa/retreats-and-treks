import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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

const PATH = '/retreats/weekend-himalayan-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Weekend Himalayan Retreats | Retreats And Treks',
    description:
      'Plan a 2–3 day weekend Himalayan retreat near Delhi with yoga, meditation, nature immersion, and Friday-to-Sunday programs in Chakrata and Rishikesh.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Weekend Himalayan Retreats Near Delhi — 2–3 Day Mountain Escapes',
      description:
        'Friday–Sunday Himalayan retreat programs near Delhi. 2–3 day reset in Chakrata, Rishikesh and Sankri with yoga, meditation and structured restoration.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Weekend Himalayan Retreats Near Delhi — 2–3 Day Mountain Escapes'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Can I do a Himalayan retreat in just 2 days?',
    answer:
      'Yes. A well-structured 2-night retreat delivers measurable benefit. Programs are designed for compressed timelines — Friday evening arrival with a grounding session, full Saturday immersion across yoga, breathwork, meditation and nature, and Sunday morning closing with early departure. Participants consistently report noticeable mental reset within 48 hours when the environment and structure are right. The key is not duration but design.',
  },
  {
    question: 'Which is closer to Delhi — Chakrata or Rishikesh?',
    answer:
      'Rishikesh is slightly closer at 5–6 hours by road from Delhi. Chakrata takes 6–7 hours via Dehradun. Both are comfortably reachable on a Friday evening or early Saturday morning. Rishikesh is faster if you are coming from south or central Delhi. Chakrata is more direct from north Delhi via the Yamuna Expressway corridor. Both qualify as genuine weekend destinations.',
  },
  {
    question: 'Is Sankri feasible for a weekend retreat?',
    answer:
      'Sankri requires 8–9 hours from Delhi, which makes a standard Friday–Sunday weekend tight. It works well for extended weekends or 3-day holidays where you have Friday off or can depart Thursday evening. For a regular 2-night weekend, Chakrata and Rishikesh are more practical. If Sankri is your priority, a 3-night format is recommended.',
  },
  {
    question: 'What is included in a 2-night weekend retreat?',
    answer:
      'A typical 2-night weekend retreat includes accommodation, all meals from Friday dinner through Sunday breakfast, two full yoga and meditation sessions per day, one guided nature walk or forest immersion, breathwork or sound healing workshops, and integration time. Digital detox support, journaling prompts, and personalised intention-setting are included in most formats. Specific inclusions vary by location and program.',
  },
  {
    question: 'Do I need prior yoga or meditation experience?',
    answer:
      'No. Weekend retreats are designed to be accessible for first-time participants. Sessions are guided and adapted to mixed experience levels. Facilitators provide modifications for beginners and deeper variations for experienced practitioners within the same session. Many weekend participants are professionals with no formal practice — the structured environment makes entry natural rather than intimidating.',
  },
  {
    question: 'When is the best time of year for a weekend Himalayan retreat?',
    answer:
      'Weekend Himalayan retreats operate year-round, with each season offering a different quality. October–November and February–March are the most popular windows — pleasant weather, clear skies, and comfortable temperatures. Summer weekends (May–June) offer heat escape from Delhi. Winter weekends (December–January) suit those drawn to quiet introspection and smaller groups. Road conditions at higher-altitude locations like Sankri may affect winter access.',
  },
];

export default function WeekendHimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Himalayan Retreats', url: buildCanonicalUrl('/retreats/himalayan-retreats') },
    { name: 'Weekend Retreats', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Weekend Himalayan Retreats Near Delhi"
        description="Plan a 2–3 day weekend Himalayan retreat near Delhi. Friday–Sunday corporate reset programs in Chakrata and Rishikesh with yoga, meditation and nature immersion."
        path={PATH}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Himalayan Retreats', href: '/retreats/himalayan-retreats' },
          { name: 'Weekend Retreats' },
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

        .med-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem 2.3rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; box-shadow: 0 10px 26px rgba(15,118,110,0.25); transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid #0f766e; }
        .med-cta-btn:hover { background: #0d6b64; transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,118,110,0.32); }
        .med-cta-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.85rem 1.8rem; border: 1px solid rgba(15,118,110,0.25); color: #0f766e; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .med-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: translateY(-2px); }

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 960px) { .med-grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } .med-grid-4 { grid-template-columns: 1fr; } }

        @keyframes med-hero-zoom { from { transform: scale(1.06); } to { transform: scale(1); } }
        .med-hero-bg { animation: med-hero-zoom 24s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .med-hero-bg { animation: none; } }

        .med-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .med-list-item { display: grid; grid-template-columns: 1.9rem 1fr; gap: 0.9rem; }
        .med-list-dot { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid rgba(15,118,110,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .med-list-dot-inner { width: 7px; height: 7px; border-radius: 50%; background: #0f766e; }
        .med-list-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.85; color: #4b5259; font-weight: 400; }
        .med-list-text strong { color: #2B2A26; font-weight: 600; }

        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }

        .med-location-row { display: grid; grid-template-columns: 0.42fr 0.58fr; min-height: 300px; border-radius: 18px; overflow: hidden; border: 1px solid rgba(15,118,110,0.12); background: #fff; box-shadow: 0 10px 30px rgba(15,31,28,0.05); }
        .med-location-row-alt { grid-template-columns: 0.58fr 0.42fr; }
        .med-location-media { position: relative; min-height: 300px; overflow: hidden; background: #f7f9f7; }
        .med-location-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .med-location-body { padding: 2rem; display: flex; flex-direction: column; justify-content: center; }
        .med-location-body h3 { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.3rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.5rem; letter-spacing: -0.01em; }
        .med-location-body h3 a { color: inherit; text-decoration: none; }
        .med-location-body p { font-family: var(--font-inter), sans-serif; font-size: 0.92rem; line-height: 1.8; color: #4b5259; margin: 0 0 0.85rem; }
        .med-location-body a { color: #0f766e; font-weight: 600; text-decoration: none; }
        .med-location-body a:hover { text-decoration: underline; }

        .med-location-facts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.65rem; margin: 0.5rem 0 1rem; }
        .med-location-fact { border-radius: 12px; background: #f7f9f7; border: 1px solid rgba(17,24,39,0.06); padding: 0.7rem 0.82rem; }
        .med-location-fact strong { display: block; font-family: var(--font-inter), sans-serif; font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase; color: #0f766e; margin-bottom: 0.25rem; font-weight: 700; }
        .med-location-fact span { display: block; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; line-height: 1.4; color: #4b5563; }

        .med-location-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 0.35rem; }
        .med-location-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 0.7rem 1.5rem; border-radius: 999px; background: #0f766e; color: #fff !important; font-family: var(--font-inter), sans-serif; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none !important; border: 1px solid #0f766e; transition: all 0.3s ease; }
        .med-location-btn:hover { background: #0d6b64; transform: translateY(-2px); text-decoration: none !important; box-shadow: 0 10px 26px rgba(15,118,110,0.25); }

        @media (max-width: 900px) {
          .med-location-row, .med-location-row-alt { grid-template-columns: 1fr; }
          .med-location-media { min-height: 200px; }
          .med-location-row-alt .med-location-media { order: 0; }
          .med-location-row-alt .med-location-body { order: 1; }
        }
        @media (max-width: 640px) {
          .med-location-body { padding: 1.35rem; }
          .med-location-facts { grid-template-columns: 1fr; }
          .med-location-btn { width: 100%; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/location/chakrata.webp" alt="Weekend Himalayan retreat near Delhi" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Weekend Retreats &middot; Delhi NCR</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Leave Friday. <span style={{ color: '#5eead4' }}>Reset Saturday.</span> Return Sunday.
          </h1>
          <p style={{ maxWidth: '40rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Most professionals in Delhi and NCR know they need a break. The problem is not awareness — it is logistics. A weekend retreat removes the planning barrier entirely.
          </p>
          <p style={{ maxWidth: '40rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Two nights in the Himalayas — Friday evening to Sunday afternoon — is enough to reset sleep, break the screen cycle, and return to work with a clarity that no amount of weekend sleeping-in can deliver.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['No flights', 'No annual leave', '5–7 hours from Delhi', '2-night reset'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '999px', padding: '0.45rem 0.9rem', background: 'rgba(15,118,110,0.35)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/919760446101?text=${encodeURIComponent("Hi, I'm interested in a weekend Himalayan retreat. Can you tell me more?")}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Plan My Weekend Retreat</a>
            <a href="#weekend-locations" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>See Weekend Locations</a>
          </div>
        </div>
      </section>

      {/* ── WHY IT WORKS ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Why It Works</span>
          </div>
          <h2 className="med-h2">Why <span>48 hours</span> can work.</h2>
          <p className="med-body">
            The assumption that meaningful retreat requires a week is wrong. Environment change — not duration — is the primary driver of cognitive reset. Moving from an urban, screen-dominated context into a structured mountain environment triggers neurological downshift within hours.
          </p>

          <div className="med-grid-4" style={{ marginTop: '1.8rem' }}>
            <div className="med-card" style={{ padding: '1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(15,118,110,0.3)', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#0f766e', marginBottom: '1.3rem' }}>01</div>
              <h3 className="med-h3">No leave required.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>A Friday evening departure and Sunday evening return uses zero annual leave. For mid-career professionals and founders who guard their leave days, this is the critical advantage.</p>
            </div>

            <div className="med-card" style={{ padding: '1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(15,118,110,0.3)', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#0f766e', marginBottom: '1.3rem' }}>02</div>
              <h3 className="med-h3">Minimal travel fatigue.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>Five to seven hours by road from Delhi is shorter than most domestic flights once you factor in airport time. You arrive tired from travel, which often helps the first night's sleep.</p>
            </div>

            <div className="med-card" style={{ padding: '1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(15,118,110,0.3)', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#0f766e', marginBottom: '1.3rem' }}>03</div>
              <h3 className="med-h3">Structured intensity.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>Weekend retreats are compressed by design — early morning sessions, full-day immersion, evening integration. A focused 48-hour <Link href="/retreats/journeys/burnout-recovery" style={{ color: '#0f766e', fontWeight: 600 }}>burnout recovery</Link> retreat can deliver more reset than an unstructured holiday.</p>
            </div>

            <div className="med-card" style={{ padding: '1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(15,118,110,0.3)', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#0f766e', marginBottom: '1.3rem' }}>04</div>
              <h3 className="med-h3">Repeatable rhythm.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>A single week-long retreat per year is meaningful. A <Link href="/retreats/journeys/weekend-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>weekend retreat</Link> every quarter is transformational. The proximity of the Himalayas to Delhi makes quarterly reset practical.</p>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.8rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <strong>Simple rule:</strong> two full days in the right container is enough to complete the loop — arrive, downshift, immerse, integrate, return.
            </p>
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ── */}
      <section id="weekend-locations" className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Three Locations</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ textAlign: 'center' }}>Choose by <span>weekend window.</span></h2>
          <p className="med-body" style={{ textAlign: 'center', maxWidth: '46rem', margin: '0 auto 2.2rem' }}>
            Not every mountain destination works for a weekend. The travel time must leave enough hours for genuine programming without the journey consuming the experience.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* Chakrata */}
            <div className="med-location-row">
              <div className="med-location-media">
                <img src="/Images/location/chakrata.webp" alt="Chakrata — deodar forest ridge retreat near Dehradun, 6–7 hours from Delhi" />
              </div>
              <div className="med-location-body">
                <span className="med-season-tag">Best 2-night forest reset</span>
                <h3><Link href="/retreats/chakrata">Chakrata — 6–7 hours from Delhi</Link></h3>
                <p>Chakrata is arguably the strongest weekend retreat destination from Delhi. At approximately 2,200 metres on a quiet cantonment ridge, it offers genuine mountain environment without extreme altitude or tourist congestion.</p>
                <div className="med-location-facts">
                  <div className="med-location-fact">
                    <strong>Leave</strong>
                    <span>Friday by 5 PM</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Arrive</strong>
                    <span>Forest-edge retreat by night</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Best for</strong>
                    <span>Quiet, forest, altitude reset</span>
                  </div>
                </div>
                <p>Weekend retreat programs in <Link href="/retreats/chakrata">Chakrata</Link> typically include morning yoga on forest platforms, guided meditation walks, breathwork sessions, and campfire integration.</p>
                <div className="med-location-actions">
                  <Link href="/retreats/chakrata" className="med-location-btn">View Chakrata retreats</Link>
                </div>
              </div>
            </div>

            {/* Rishikesh - image right */}
            <div className="med-location-row med-location-row-alt">
              <div className="med-location-body">
                <span className="med-season-tag">Fastest yoga weekend</span>
                <h3><Link href="/retreats/rishikesh">Rishikesh — 5–6 hours</Link></h3>
                <p>Rishikesh is the fastest Himalayan destination from Delhi and the most established centre for <Link href="/retreats/journeys/yoga-and-movement">yoga and movement</Link> practice in India.</p>
                <div className="med-location-facts">
                  <div className="med-location-fact">
                    <strong>Setting</strong>
                    <span>Ganges riverside</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Strength</strong>
                    <span>Experienced teachers</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Best for</strong>
                    <span>Guided yoga and meditation</span>
                  </div>
                </div>
                <p>Weekend formats in <Link href="/retreats/rishikesh">Rishikesh</Link> suit participants who want structured practice rather than open-ended nature immersion.</p>
                <div className="med-location-actions">
                  <Link href="/retreats/rishikesh" className="med-location-btn">View Rishikesh retreats</Link>
                </div>
              </div>
              <div className="med-location-media">
                <img src="/Images/location/rishikesh.webp" alt="Rishikesh — Ganges riverside yoga and meditation, 5–6 hours from Delhi" />
              </div>
            </div>

            {/* Sankri */}
            <div className="med-location-row">
              <div className="med-location-media">
                <img src="/Images/location/sankri.webp" alt="Sankri — remote Himalayan valley near Govind Wildlife Sanctuary, extended weekend" />
              </div>
              <div className="med-location-body">
                <span className="med-season-tag">Extended weekend wilderness</span>
                <h3><Link href="/retreats/sankri">Sankri — 8–9 hours</Link></h3>
                <p>Sankri sits deeper in the Himalayas, so a standard Friday–Sunday weekend is tight. It works well for extended weekends and three-day holidays.</p>
                <div className="med-location-facts">
                  <div className="med-location-fact">
                    <strong>Works when</strong>
                    <span>You have Friday off</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Setting</strong>
                    <span>Remote valley</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Best for</strong>
                    <span>Digital silence</span>
                  </div>
                </div>
                <p>For a longer comparison of retreat formats by duration, see our guide to <Link href="/blog/3-day-vs-5-day-himalayan-retreat">choosing the right retreat length</Link>.</p>
                <div className="med-location-actions">
                  <Link href="/retreats/sankri" className="med-location-btn">View Sankri retreats</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IT LOOKS LIKE ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">A Typical Weekend</span>
          </div>
          <h2 className="med-h2">The full reset arc, <span>Friday to Sunday.</span></h2>
          <p className="med-body">
            Weekend retreats follow a compressed but complete arc — arrival, immersion, and integration within 48 hours.
          </p>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '72px', height: '72px', borderRadius: '24px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Fri</div>
              <span className="med-season-tag">Arrival and settling</span>
              <h3 className="med-h3">Arrive late. Do less.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Most participants arrive between 10 PM and midnight after the drive from Delhi. A light welcome — herbal tea, room orientation, and a brief grounding exercise — marks the transition from travel mode to retreat mode.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '72px', height: '72px', borderRadius: '24px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Sat</div>
              <span className="med-season-tag">Full immersion day</span>
              <h3 className="med-h3">The day that does the work.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Saturday is the core of the retreat. Pre-dawn meditation or gentle yoga, a full morning practice session with breathwork, guided nature walk or forest immersion after lunch, an afternoon workshop, and an evening integration circle.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem', gridColumn: '1 / -1' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '72px', height: '72px', borderRadius: '24px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Sun</div>
              <span className="med-season-tag">Closing and departure</span>
              <h3 className="med-h3">Return before Monday arrives.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Sunday begins with a final morning practice — often the most powerful session, because the body and mind have already shifted from the previous day's immersion. A closing circle anchors the experience before departure.
              </p>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.5rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <strong>Why this format works:</strong> Friday removes you from the city, Saturday creates the immersion, and Sunday converts the retreat into something you can carry back into work.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHO IS IT FOR ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Is This For You</span>
          </div>
          <h2 className="med-h2">Built for people who <span>cannot disappear for a week.</span></h2>
          <p className="med-body">
            Weekend Himalayan retreats are specifically for people whose constraints make longer programs impractical. That includes most of urban professional India.
          </p>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Primary audience</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>01</span>
              </div>
              <h3 className="med-h3">Corporate professionals</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                People carrying decision fatigue, screen overload, and accumulated stress who cannot take a week off but urgently need restoration.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Always-on mode</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>02</span>
              </div>
              <h3 className="med-h3">Startup founders and entrepreneurs</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Operating with no boundary between work and rest. A structured 48-hour container creates the separation that willpower alone cannot.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Perspective shift</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>03</span>
              </div>
              <h3 className="med-h3">Creatives and freelancers</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Seeking environmental shift to unblock stalled work or reset perspective. Mountain air and digital silence deliver what no café can.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Shared reset</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>04</span>
              </div>
              <h3 className="med-h3">Couples needing a reset</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                A shared retreat experience without tourist distractions creates conversation and connection that a resort weekend does not.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem', gridColumn: '1 / -1' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Low commitment</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>05</span>
              </div>
              <h3 className="med-h3">First-time retreat participants</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                A weekend is the lowest commitment entry point. Two nights is enough to experience the retreat container without the intimidation of a full week.
              </p>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.8rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>
              If burnout is already present, not approaching, see our dedicated <Link href="/retreats/journeys/burnout-recovery" style={{ color: '#0f766e', fontWeight: 600 }}>Burnout Recovery</Link> program — available in weekend and extended formats at all locations.
            </p>
          </div>
        </div>
      </section>

      {/* ── PLANNING ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Before You Book</span>
          </div>
          <h2 className="med-h2">Weekend logistics, <span>made simple.</span></h2>
          <p className="med-body">
            A Friday–Sunday Himalayan retreat works best when the basics are clear before you leave: transport, packing, booking window, season, and road access.
          </p>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.15rem' }}>
                <span className="med-season-tag">Travel</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>01</span>
              </div>
              <h3 className="med-h3">Leave Delhi with the weekend in mind.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Self-drive is the most flexible option — it allows departure timing that matches your Friday schedule. Shared cabs from Delhi to Dehradun for Chakrata or Haridwar for Rishikesh are available through retreat coordination.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.15rem' }}>
                <span className="med-season-tag">Packing</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>02</span>
              </div>
              <h3 className="med-h3">Pack light. Shift faster.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Comfortable clothing for yoga and walking, a warm layer for mountain evenings, and minimal luggage. The less you carry, the faster the mental shift begins.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.15rem' }}>
                <span className="med-season-tag">Booking window</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>03</span>
              </div>
              <h3 className="med-h3">Book before the best weekends fill.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Weekend programs run year-round but fill quickly for long weekends, festival holidays, and popular windows. Booking two to three weeks ahead is advisable. For peak weekends, four weeks is safer.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.15rem' }}>
                <span className="med-season-tag">Best months</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>04</span>
              </div>
              <h3 className="med-h3">Each season changes the reset.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                October and November bring crisp clear skies. February and March offer warming days with snow-capped views. May–June is ideal for <Link href="/retreats/summer-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>summer Himalayan retreats</Link> — escaping Delhi heat for mountain air.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem', gridColumn: '1 / -1' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.15rem' }}>
                <span className="med-season-tag">Weather / access</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>05</span>
              </div>
              <h3 className="med-h3">Choose the route your weekend can handle.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Chakrata and Rishikesh are accessible by road in all seasons. Sankri roads may be affected by snow in January–February or landslides during monsoon. December–January suits <Link href="/retreats/winter-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>winter Himalayan retreats</Link> for cold-weather contemplation.
              </p>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.5rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <strong>Simple planning rule:</strong> if you only have a regular Friday–Sunday weekend, choose Chakrata or Rishikesh. If you have Friday off or can depart Thursday evening, Sankri becomes realistic.
            </p>
          </div>
        </div>
      </section>

      {/* ── LONGER PROGRAMS ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-card" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <span className="med-season-tag">Longer Programs</span>
                <h2 className="med-h2" style={{ margin: '0.5rem 0 1rem' }}>
                  Need more than a <span>weekend?</span>
                </h2>
                <p className="med-body" style={{ margin: 0, maxWidth: '48rem' }}>
                  Looking for longer immersion? <Link href="/retreats/himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>Himalayan Retreats in India</Link> covers five-day, seven-day, and custom-length formats across all four locations.
                </p>
              </div>
              <Link href="/retreats/himalayan-retreats" className="med-cta-btn" style={{ whiteSpace: 'nowrap' }}>Explore Longer Retreats</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Common Questions</span>
          </div>
          <h2 className="med-h2">Final questions before <span>you leave Friday.</span></h2>
          <p className="med-body">
            These answers cover the practical decision points: whether two days is enough, which destination is closer, when Sankri makes sense, what is included, beginner suitability, and the best season.
          </p>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '48vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/location/chakrata.webp" alt="Weekend Himalayan retreat setting" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.86)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '42rem', padding: '4rem 1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.5rem, 2.9vw, 2.1rem)', fontWeight: 500, color: '#F6F2E7' }}>Ready for a weekend reset?</h2>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: 'rgba(246,242,231,0.78)' }}>Talk with us about dates, location, and the right program for you.</p>
          <a href={`https://wa.me/919760446101?text=${encodeURIComponent("Hi, I'm interested in a weekend Himalayan retreat. Can we discuss dates and options?")}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Plan My Weekend Retreat</a>
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
