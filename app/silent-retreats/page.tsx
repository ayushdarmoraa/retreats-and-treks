import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { getExperiencePage } from '@/config/experiencePages';
import { getReviewSchemasForPage } from '@/lib/reviewsSchema';
import { getReviewsForSlug } from '@/content/reviews';
import { getUpcomingEvents } from '@/config/retreatProgramEvents';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import ReviewCard from '@/components/reviews/ReviewCard';

const PAGE = getExperiencePage('silent-retreats')!;
const PATH = '/silent-retreats';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return {
    title: 'Silent Retreats in the Himalayas — Extended Silence & Deep Rest | Retreats And Treks',
    description:
      'Extended silent retreats in the Indian Himalayas — Chakrata, Zanskar, Munsiyari. No phones, no small talk, no tourist noise. Small groups (max 12), 3–10 day programs. Discover what happens when you stop talking.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Silent Retreats in the Himalayas — Extended Silence & Deep Rest',
      description:
        'Extended silent retreats where the landscape holds the silence, not just the rules. Small groups, deep rest, experienced guidance.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Silent Retreats in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What does "noble silence" mean?',
    answer:
      'Noble silence means no conversation, no eye contact intended to communicate, no devices, no reading (except personal journalling). The external world of language and social performance is suspended. This is not punishment — it is liberation.',
  },
  {
    question: 'What if I find the silence too difficult?',
    answer:
      'The first 12–24 hours are often uncomfortable. That is expected. By the second day, something begins to change. If genuine distress arises, facilitators are available for brief, supportive check-ins. You are never truly alone — just quiet.',
  },
  {
    question: 'Is this the same as a Vipassana retreat?',
    answer:
      'Not exactly. Vipassana follows a fixed 10-day format with a single technique. Our Himalayan silent retreats offer more flexibility — multiple techniques, smaller groups (max 12 vs 50–100), nature-integrated practice, and personalised guidance. Both are powerful approaches to silence.',
  },
  {
    question: 'Do I need meditation experience before a silent retreat?',
    answer:
      'For Chakrata, no prior experience is required — the environment is gentle and the guidance supportive. For Zanskar, some meditation experience is recommended due to the altitude and remoteness. First-timers often start with a 3-day silent retreat in Chakrata.',
  },
  {
    question: 'What does a day look like during a silent retreat?',
    answer:
      'Multiple daily meditation sittings, walking meditation in nature, simple meals in silence, rest periods, and gentle movement. The schedule provides structure so you do not need to make decisions. By day three, the body knows the rhythm without checking.',
  },
  {
    question: 'How do I prepare mentally for extended silence?',
    answer:
      'Reduce screen time 3–5 days before. Let go of expectations. Inform people you\'ll be unreachable. Bring a journal. Trust the structure — sit when others sit, eat when the bell rings. The container holds you so you don\'t need to hold yourself.',
  },
];

const SILENCE_TYPES = [
  {
    title: 'Nature-Based Silence',
    description: 'Integrates silent meditation with walking in natural environments. The landscape becomes part of the practice. Our primary format.',
    bestFor: 'Most participants, first-timers, nature lovers',
    icon: '🌿',
  },
  {
    title: 'Full Noble Silence',
    description: 'No talking, no eye contact, no devices, no reading. Complete withdrawal from linguistic communication. The deepest format.',
    bestFor: 'Experienced practitioners, deep seekers',
    icon: '🤫',
  },
  {
    title: 'Partial Silence',
    description: 'Quiet during practice and mornings, limited conversation during meals or sharing circles. A gentler entry point.',
    bestFor: 'First-time retreatants, those wary of complete silence',
    icon: '🕊️',
  },
];

const LOCATIONS = [
  {
    name: 'Chakrata',
    id: 'chakrata',
    tagline: 'Where Silence Lives Naturally',
    description: 'Dense Himalayan forest creates an acoustic environment where silence is not practised — it is the default. No tourist noise, no temple bells, no commerce. Just birdsong, wind, and breath.',
    bestFor: 'First silent retreats, accessible depth',
    altitude: '2,000m',
    image: '/Images/location/chakrata.webp',
  },
  {
    name: 'Zanskar',
    id: 'zanskar',
    tagline: 'Geological Silence',
    description: 'A valley sealed by mountains, 230 km from the nearest city, where the rock formations are 500 million years old. This is silence with weight — not just auditory, but geological.',
    bestFor: 'Deep practitioners, radical disconnection',
    altitude: '3,500m',
    image: '/Images/location/zanskar.webp',
  },
  {
    name: 'Munsiyari',
    id: 'munsiyari',
    tagline: 'Alpine Silence',
    description: 'High-altitude meadows facing the Panchachuli peaks. The silence here is expansive — open sky, vast views, thin air. Stillness with an element of spaciousness.',
    bestFor: 'Spacious stillness, physical openness',
    altitude: '2,200m',
    image: '/Images/location/munsiyari.webp',
  },
];

export default function SilentRetreatsPage() {
  const { reviewSchemas, aggregateSchema } = getReviewSchemasForPage(PAGE);
  const allReviews = PAGE.retreatServiceSlugs.flatMap((slug) => getReviewsForSlug(slug));
  const topReviews = allReviews.filter((r) => r.ratingValue >= 4).slice(0, 3);
  const upcomingEvents = getUpcomingEvents()
    .filter((e) => e.experienceSlug === PAGE.slug)
    .slice(0, 3);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Silent Retreats', url: buildCanonicalUrl(PATH) },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH}>
      <style>{`
        .sil-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }
        .sil-wide { max-width: 72rem; margin: 0 auto; padding: 0 2rem; }
        .sil-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .sil-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); flex-shrink: 0; }
        .sil-eyebrow-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase; color: #374151; font-weight: 500; }
        .sil-section-title { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200; letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2rem; }
        .sil-section-title span { color: #374151; }
        .sil-body-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.92rem; line-height: 1.85; color: #555; font-weight: 300; margin: 0; }

        .sil-hero { width: 100vw; margin-left: calc(-50vw + 50%); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; min-height: 82vh; text-align: center; padding-top: 68px; }
        .sil-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.88) 100%); }

        .sil-info-strip { display: flex; justify-content: center; gap: 2.5rem; flex-wrap: wrap; }
        .sil-info-item { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }

        .sil-loc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; }
        .sil-loc-card { position: relative; height: 340px; border-radius: 10px; overflow: hidden; text-decoration: none; color: #fff; display: flex; align-items: flex-end; transition: transform 0.3s, box-shadow 0.3s; }
        .sil-loc-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.15); }
        .sil-loc-card-content { position: relative; z-index: 2; padding: 1.75rem; width: 100%; }

        .sil-benefit-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; }
        .sil-benefit-card { background: #fff; border: 1px solid #eef0ee; border-radius: 8px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.03); transition: border-color 0.2s, box-shadow 0.2s; }
        .sil-benefit-card:hover { border-color: rgba(15,118,110,0.25); box-shadow: 0 4px 16px rgba(0,0,0,0.06); }

        .sil-type-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 768px) { .sil-type-grid { grid-template-columns: 1fr; } }
        .sil-type-card { background: #fff; border: 1px solid rgba(15,118,110,0.1); border-radius: 8px; padding: 2rem 1.75rem; display: flex; flex-direction: column; gap: 0.75rem; transition: border-color 0.25s, transform 0.3s; }
        .sil-type-card:hover { border-color: rgba(15,118,110,0.3); transform: translateY(-4px); }

        .sil-cta-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 2.25rem; background: var(--color-primary); color: #fff; text-decoration: none; font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.06em; border-radius: 100px; transition: background 0.2s, transform 0.2s; }
        .sil-cta-btn:hover { background: #0d9e95; transform: translateY(-2px); }
        .sil-cta-outline { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.7rem 1.8rem; border: 1px solid rgba(15,118,110,0.3); color: var(--color-primary); text-decoration: none; font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em; border-radius: 100px; transition: all 0.2s; }
        .sil-cta-outline:hover { border-color: var(--color-primary); background: rgba(15,118,110,0.04); }

        .sil-faq-item { border-bottom: 1px solid #eef0ee; padding: 1.5rem 0; }
        .sil-faq-item:last-child { border-bottom: none; }

        @media (max-width: 640px) { .sil-who-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }
      `}</style>

      {reviewSchemas.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, ...reviewSchemas, ...(aggregateSchema ? [aggregateSchema] : [])]) }} />
      )}
      {reviewSchemas.length === 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      )}

      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Retreats', href: '/retreats' }, { name: 'Silent Retreats' }]} />

      {/* ═══ HERO ═══ */}
      <section className="sil-hero">
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/experience-hubs/silent-hero.png" alt="Silent retreats in the Himalayas — a solitary figure walking through misty Himalayan forest" fetchPriority="high" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div className="sil-hero-overlay" />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '52rem', margin: '0 auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.5)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>Silence & Stillness</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.5)', display: 'inline-block' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 200, letterSpacing: '-0.035em', color: '#ffffff', margin: '0 0 1rem', lineHeight: 1.05, textShadow: '0 2px 32px rgba(0,0,0,0.7)' }}>
            Silent Retreats in the Himalayas
          </h1>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.82)', fontWeight: 300, lineHeight: 1.75, maxWidth: '38rem', margin: '0 0 2rem' }}>
            Not the uncomfortable quiet of a paused conversation. The thick, living silence of a Himalayan forest where the only sound is your own awareness. Silence as nourishment, not deprivation.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', marginBottom: '2rem' }}>
            {['Noble Silence', 'No Devices', '3–10 Days', 'Max 12 Participants'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)', borderRadius: '4px', padding: '0.4rem 0.85rem' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <Link href="/contact" className="sil-cta-btn" style={{ padding: '1rem 2.5rem', fontSize: '0.82rem' }}>Find Your Silent Retreat →</Link>
            <a href="#silence-types" className="sil-cta-outline" style={{ borderColor: 'rgba(255,255,255,0.35)', color: 'rgba(255,255,255,0.9)', padding: '0.9rem 2rem', fontSize: '0.78rem' }}>Explore Formats ↓</a>
          </div>
        </div>
      </section>

      {/* ═══ INFO STRIP ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#0a1f1c', padding: '2rem 0' }}>
        <div className="sil-wide">
          <div className="sil-info-strip">
            {[
              { label: 'Locations', value: '3 Himalayan Settings' },
              { label: 'Format', value: 'Noble Silence' },
              { label: 'Duration', value: '3 – 10 Days' },
              { label: 'Group Size', value: 'Max 12 People' },
            ].map((item) => (
              <div key={item.label} className="sil-info-item">
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', color: '#ffffff', fontWeight: 300 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT IS A SILENT RETREAT ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="sil-inner">
          <div className="sil-eyebrow"><span className="sil-eyebrow-line" /><span className="sil-eyebrow-text">Understanding Silent Retreats</span></div>
          <h2 className="sil-section-title">What happens during <span>a silent retreat</span>?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center' }} className="sil-who-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p className="sil-body-text">A silent retreat is not simply a meditation retreat with a rule against talking. It is a fundamentally different experience — one where the entire field of communication shifts.</p>
              <p className="sil-body-text">The first 12–24 hours are often uncomfortable. The mind, accustomed to constant verbal interaction, searches for stimulation and finds none. Restlessness, boredom, and sometimes anxiety arise. This is normal and expected.</p>
              <p className="sil-body-text">By the second day, something begins to change. Without the need to formulate responses, the mind slows. Sensory perception sharpens. By day three, a deeper layer of awareness — quieter, more spacious, less reactive — becomes accessible.</p>
              <p className="sil-body-text">This is what most people have never experienced. Not the silence of a quiet room, but the silence that lives beneath everything — thick, alive, and profoundly nourishing.</p>
            </div>
            <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '420px' }}>
              <Image src="/Images/experience-hubs/monastery.png" alt="Remote Himalayan monastery — the setting for deep silent retreats" fill loading="lazy" quality={55} sizes="(max-width: 640px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PSYCHOLOGICAL EFFECTS ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="sil-inner">
          <div className="sil-eyebrow"><span className="sil-eyebrow-line" /><span className="sil-eyebrow-text">The Science of Silence</span></div>
          <h2 className="sil-section-title">What silence does to <span>your mind and body</span></h2>
          <p className="sil-body-text" style={{ marginBottom: '2.5rem' }}>Extended silence produces measurable psychological and physiological changes, studied across multiple research traditions.</p>
          <div className="sil-benefit-grid">
            {[
              { title: 'Cortisol Reduction', text: 'Within 48–72 hours, cortisol levels drop measurably. The absence of social performance pressure allows the adrenal system to stand down.' },
              { title: 'Default Network Quieting', text: 'The brain\'s default mode network — responsible for mind-wandering and rumination — shows reduced activity. The neurological correlate of the thinking mind becoming quiet.' },
              { title: 'Enhanced Senses', text: 'Removing linguistic processing frees cognitive bandwidth. Colours appear more vivid, sounds more distinct, physical sensations more nuanced.' },
              { title: 'Emotional Processing', text: 'Without talking about emotions, the psyche processes them somatically rather than narratively. Emotions rise, are felt, and pass — without intellectual loops.' },
              { title: 'Time Distortion', text: 'Without conversation and schedule-checking, the experience of time changes. Days that feel interminable on day one begin to expand and slow beautifully.' },
              { title: 'Deep Sleep', text: 'The nervous system recalibration produces significantly deeper sleep. Most retreatants report the best sleep of their lives by day three.' },
            ].map((item) => (
              <div key={item.title} className="sil-benefit-card">
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 600, color: '#111', margin: '0 0 0.6rem' }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', lineHeight: 1.7, color: '#666', fontWeight: 300, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VISUAL BREAK ═══ */}
      <figure style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', height: '300px', overflow: 'hidden', margin: 0, padding: 0 }}>
        <img src="/Images/whyhimalaya/psycological.webp" alt="Forest path — the environment for silent retreats" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
        <figcaption style={{ position: 'absolute', bottom: '1.5rem', left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', fontWeight: 300, letterSpacing: '0.03em', fontStyle: 'italic' }}>Silence is not something you achieve — it is something you enter</figcaption>
      </figure>

      {/* ═══ TYPES OF SILENCE ═══ */}
      <section id="silence-types" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="sil-wide">
          <div className="sil-eyebrow" style={{ justifyContent: 'center' }}><span className="sil-eyebrow-line" /><span className="sil-eyebrow-text">Silence Formats</span><span className="sil-eyebrow-line" /></div>
          <h2 className="sil-section-title" style={{ textAlign: 'center' }}>Types of <span>silent retreats</span></h2>
          <p className="sil-body-text" style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 3rem' }}>Not all silence is the same. Choose the format that matches your readiness and intention.</p>
          <div className="sil-type-grid">
            {SILENCE_TYPES.map((type) => (
              <div key={type.title} className="sil-type-card">
                <span style={{ fontSize: '1.5rem' }}>{type.icon}</span>
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1rem', fontWeight: 500, color: '#111', margin: 0 }}>{type.title}</h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', color: '#666', fontWeight: 300, lineHeight: 1.7, margin: 0 }}>{type.description}</p>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.7rem', color: 'var(--color-primary)', fontWeight: 500, letterSpacing: '0.03em', marginTop: 'auto' }}>Best for: {type.bestFor}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHO THIS IS FOR ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="sil-inner">
          <div className="sil-eyebrow"><span className="sil-eyebrow-line" /><span className="sil-eyebrow-text">Is This For You</span></div>
          <h2 className="sil-section-title">Who silent retreats are <span>for</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="sil-who-grid">
            <div>
              <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', margin: '0 0 1.25rem' }}>✓ Perfect if you are</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {['Someone who has never experienced extended silence and feels drawn to it', 'In an overstimulated career or lifestyle seeking neurological reset', 'A meditation practitioner wanting to deepen through sustained quiet', 'Suspecting that what you need most is permission to stop talking', 'Recovering from burnout, grief, or emotional overwhelm', 'Ready to discover what your mind does when it has nothing to perform'].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', lineHeight: 1.6, color: '#444', fontWeight: 300, display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.15rem', fontSize: '0.5rem', color: '#fff', fontWeight: 700 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', margin: '0 0 1.25rem' }}>— Not the right fit if you want</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {['Social retreat with group activities and conversation', 'Spa-style relaxation with entertainment', 'Short workshop (less than 3 days)', 'Silent meditation without any guidance or structure'].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', lineHeight: 1.6, color: '#777', fontWeight: 300, display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.15rem', fontSize: '0.6rem', color: '#999' }}>—</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LOCATIONS ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="sil-wide">
          <div className="sil-eyebrow" style={{ justifyContent: 'center' }}><span className="sil-eyebrow-line" /><span className="sil-eyebrow-text">Where We Hold Silence</span><span className="sil-eyebrow-line" /></div>
          <h2 className="sil-section-title" style={{ textAlign: 'center' }}>Three Himalayan <span>silence containers</span></h2>
          <p className="sil-body-text" style={{ textAlign: 'center', maxWidth: '38rem', margin: '0 auto 3rem' }}>Each location holds silence differently. Forest silence. Geological silence. Alpine silence. Choose based on the quality of quiet your nervous system needs.</p>
          <div className="sil-loc-grid">
            {LOCATIONS.map((loc) => (
              <Link key={loc.id} href={`/retreats/${loc.id}`} className="sil-loc-card">
                <Image src={loc.image} alt={`${loc.name} — silent retreat location`} fill loading="lazy" quality={55} sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)' }} />
                <div className="sil-loc-card-content">
                  <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>{loc.altitude} altitude</span>
                  <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.15rem', fontWeight: 400, color: '#fff', margin: '0 0 0.5rem' }}>{loc.name} — {loc.tagline}</h3>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', fontWeight: 300, lineHeight: 1.6, margin: '0 0 0.75rem' }}>{loc.description}</p>
                  <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>Best for: {loc.bestFor}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MID CTA ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#0a1f1c', padding: '4rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '44rem', margin: '0 auto', padding: '0 2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 200, color: '#ffffff', margin: '0 0 0.75rem' }}>Ready to enter the silence?</h3>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300, margin: '0 0 2rem', lineHeight: 1.7 }}>Tell us where you are — your experience, your intention, your readiness. We&apos;ll recommend the right container.</p>
          <Link href="/contact" className="sil-cta-btn">Talk to a Retreat Planner →</Link>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '1rem' }}>Free consultation · No spam · Quick response</p>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      {topReviews.length > 0 && (
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
          <div className="sil-wide">
            <div className="sil-eyebrow" style={{ justifyContent: 'center' }}><span className="sil-eyebrow-line" /><span className="sil-eyebrow-text">What Participants Say</span><span className="sil-eyebrow-line" /></div>
            <h2 className="sil-section-title" style={{ textAlign: 'center' }}>Real <span>retreat experiences</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 24rem), 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              {topReviews.map((review) => (<ReviewCard key={`${review.participantName}-${review.datePublished}`} review={review} />))}
            </div>
            <div style={{ textAlign: 'center' }}><Link href="/reviews" style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 300, color: 'var(--color-primary)' }}>Read more experiences →</Link></div>
          </div>
        </section>
      )}

      {/* ═══ UPCOMING DEPARTURES ═══ */}
      {upcomingEvents.length > 0 && (
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
          <div className="sil-inner">
            <div className="sil-eyebrow"><span className="sil-eyebrow-line" /><span className="sil-eyebrow-text">Upcoming Departures</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              {upcomingEvents.map((ev, i, arr) => (
                <Link key={ev.slug} href={`/${ev.slug}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', padding: '1rem 1.25rem', borderBottom: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none', textDecoration: 'none', background: '#ffffff', color: 'inherit' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 400, color: 'var(--color-primary)', display: 'block' }}>{ev.label} in {ev.locationName}</span>
                    <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.8rem', fontWeight: 300, color: '#6b7280' }}>{ev.dateRange} · {ev.durationDays} days · ₹{ev.price.toLocaleString('en-IN')}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.8rem', fontWeight: 500, color: ev.seatsLeft <= 3 ? '#c92a2a' : '#6b7280' }}>{ev.seatsLeft} seats left →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ STORIES ═══ */}
      {PAGE.storyLinks && PAGE.storyLinks.length > 0 && (
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
          <div className="sil-inner">
            <div className="sil-eyebrow"><span className="sil-eyebrow-line" /><span className="sil-eyebrow-text">Retreat Stories</span></div>
            <p className="sil-body-text" style={{ marginBottom: '1.25rem' }}>First-person accounts from people who have entered the silence.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              {PAGE.storyLinks.map((story, i, arr) => (
                <Link key={story.href} href={story.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none', textDecoration: 'none', background: '#f7f9f7', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, color: '#333333' }}>
                  <span>{story.label}</span><span style={{ color: '#374151', fontSize: '0.8rem' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ INTERNAL LINKS ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="sil-inner">
          <div className="sil-eyebrow"><span className="sil-eyebrow-line" /><span className="sil-eyebrow-text">Explore Further</span></div>
          <h2 className="sil-section-title">Related <span>guides</span></h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/what-happens-at-a-silent-retreat" className="sil-cta-outline">What Happens at a Silent Retreat →</Link>
            <Link href="/how-hard-is-a-silent-retreat" className="sil-cta-outline">How Hard Is a Silent Retreat? →</Link>
            <Link href="/vipassana-vs-meditation-retreat" className="sil-cta-outline">Vipassana vs Meditation Retreat →</Link>
            <Link href="/meditation-retreats" className="sil-cta-outline">Meditation Retreats →</Link>
            <Link href="/himalayan-silent-retreats" className="sil-cta-outline">Himalayan Silent Retreats →</Link>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="sil-inner">
          <div className="sil-eyebrow"><span className="sil-eyebrow-line" /><span className="sil-eyebrow-text">Common Questions</span></div>
          <h2 className="sil-section-title">Frequently asked <span>questions</span></h2>
          <div>
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="sil-faq-item">
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.92rem', fontWeight: 500, color: '#111', margin: '0 0 0.6rem' }}>{faq.question}</h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', lineHeight: 1.8, color: '#666', fontWeight: 300, margin: 0 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', overflow: 'hidden', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/hero/mountain-snow.webp" alt="Snow-covered Himalayan peaks — silent retreat setting" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.88)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '44rem', padding: '4rem 2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 200, color: '#ffffff', margin: '0 0 1rem' }}>Enter the Silence</h2>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', fontWeight: 300, lineHeight: 1.75, margin: '0 0 2rem' }}>Silence is not something you achieve. It is something you enter. The right location makes entering easier. Tell us where you are and we&apos;ll help you find the right container.</p>
          <Link href="/contact" className="sil-cta-btn" style={{ fontSize: '0.85rem', padding: '1rem 2.5rem' }}>Plan My Silent Retreat →</Link>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {['Noble silence', 'Max 12 people', '3–10 day programs'].map((trust) => (
              <span key={trust} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400, letterSpacing: '0.05em' }}>{trust}</span>
            ))}
          </div>
        </div>
      </section>

    </TrackedPage>
  );
}
