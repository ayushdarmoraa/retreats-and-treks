import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema, generateBlogPostingSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/personal-growth-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Personal Growth Retreat | Retreats And Treks',
    description:
      'Personal growth retreat in the Himalayas with meditation, reflection, nature immersion, inner development, and quiet settings in Chakrata or Zanskar.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Personal Growth Retreat in the Himalayas',
      description: 'Not a seminar. An experience designed for genuine inner development in Himalayan environments.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Personal Growth Retreat in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How is this different from a personal development seminar?',
    answer:
      'Seminars operate through information: frameworks, models, techniques. A personal growth retreat operates through experience: silence, nature, stillness, and encounter with your own inner life. The growth happens not because you learn something new, but because the familiar structures dissolve enough to reveal what was already there.',
  },
  {
    question: 'Do I need meditation experience?',
    answer:
      'No. Personal growth retreats include guided meditation but do not require prior experience. The meditation is a tool, not the goal. Walking meditation, journalling, nature immersion, and structured reflection are equally important.',
  },
  {
    question: 'What kind of "growth" should I expect?',
    answer:
      'Not the motivational-poster kind. Genuine growth on retreat often looks like: seeing a pattern you did not know you had, understanding why a relationship dynamic keeps repeating, recognizing a value you have been ignoring. It is subtle, honest, and sometimes uncomfortable. But it is real.',
  },
  {
    question: 'Is a 3-day or 7-day retreat better for personal growth?',
    answer:
      'Three days is enough for meaningful insight. Seven days allows those insights to settle and deepen. If personal growth is your primary intention and you have the time, 7 days is significantly more powerful. The first 3 days clear the noise; the remaining 4 are where the genuine development happens.',
  },
];

const LOCATIONS = [
  {
    name: 'Chakrata',
    id: 'meditation-retreat-chakrata',
    tagline: 'Gentle Forest Depth',
    description: 'Forest environment ideal for gentle, sustained inner work.',
    image: '/Images/location/chakrata.webp',
  },
  {
    name: 'Rishikesh',
    id: 'yoga-retreat-rishikesh',
    tagline: 'Tradition-Supported',
    description: 'Tradition-supported growth through yoga and meditation.',
    image: '/Images/location/rishikesh.webp',
  },
  {
    name: 'Zanskar',
    id: 'silent-retreat-zanskar',
    tagline: 'Radical Immersions',
    description: 'Radical depth for those ready to go all the way into silence.',
    image: '/Images/location/zanskar.webp',
  },
  {
    name: 'Munsiyari',
    id: 'healing-retreat-munsiyari',
    tagline: 'Alpine Perspective',
    description: 'Growth through landscape, vast skies, and profound perspective.',
    image: '/Images/location/munsiyari.webp',
  },
];

export default function PersonalGrowthRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Personal Growth Retreat', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = generateBlogPostingSchema({
    title: 'Personal Growth Retreat in the Himalayas',
    description:
      'Personal growth retreat in the Himalayas with meditation, reflection, nature immersion, inner development, and quiet settings in Chakrata or Zanskar.',
    publishedAt: '2026-03-06',
    lastUpdated: '2026-05-09',
    url: buildCanonicalUrl(PATH),
  });

  return (
    <TrackedPage page={PATH}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Personal Growth Retreat' }]} />

      <style>{`
        .pg-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }
        .pg-wide { max-width: 72rem; margin: 0 auto; padding: 0 2rem; }
        .pg-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
        .pg-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); }
        .pg-eyebrow-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase; color: #374151; font-weight: 500; }
        .pg-section-title { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1.75rem, 3vw, 2.2rem); font-weight: 200; letter-spacing: -0.035em; color: #111111; line-height: 1.15; margin: 0 0 1.5rem; }
        .pg-body-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.95rem; line-height: 1.85; color: #4b5563; font-weight: 300; margin: 0 0 1.5rem; }
        
        /* Hero */
        .pg-hero { width: 100vw; margin-left: calc(-50vw + 50%); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; min-height: 75vh; padding-top: 60px; }
        .pg-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.85) 100%); }

        /* Structure Timeline */
        .pg-timeline { position: relative; padding-left: 2rem; margin: 3rem 0; }
        .pg-timeline::before { content: ''; position: absolute; top: 0; bottom: 0; left: 8px; width: 1px; background: rgba(15,118,110,0.2); }
        .pg-timeline-item { position: relative; margin-bottom: 2.5rem; }
        .pg-timeline-item::before { content: ''; position: absolute; top: 8px; left: -2rem; width: 16px; height: 16px; background: #fff; border: 2px solid var(--color-primary); border-radius: 50%; transform: translateX(-8px); }

        /* Location Grid */
        .pg-loc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; }
        .pg-loc-card { position: relative; border-radius: 12px; overflow: hidden; height: 320px; display: flex; align-items: flex-end; text-decoration: none; transition: transform 0.3s; }
        .pg-loc-card:hover { transform: translateY(-5px); }
        .pg-loc-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%); z-index: 1; }
        .pg-loc-content { position: relative; z-index: 2; padding: 1.5rem; width: 100%; color: #fff; }
      `}</style>

      {/* ── CINEMATIC HERO ── */}
      <section className="pg-hero">
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src="/Images/experience-hubs/silent-hero.png"
            alt="Personal Growth Retreat in the Himalayas"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          />
          <div className="pg-hero-overlay" />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '56rem', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Deep Immersion</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.4)' }} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 200,
            letterSpacing: '-0.035em', color: '#ffffff', margin: '0 0 1.25rem',
            lineHeight: 1.1, textShadow: '0 4px 24px rgba(0,0,0,0.5)',
          }}>
            Personal Growth Retreat
          </h1>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)',
            fontWeight: 300, lineHeight: 1.8, maxWidth: '42rem', margin: '0 auto 2.5rem',
          }}>
            Growth does not happen by adding more information. It happens when you subtract the noise, stop performing, and let the parts of you waiting beneath the surface finally emerge.
          </p>
          <PrimaryCTA
            label="Explore Personal Growth Packages"
            subtext=""
            vertical="retreat"
            category="personal-growth"
            sourcePath={PATH}
          />
        </div>
      </section>

      {/* ── THE PROBLEM (Intro) ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '5rem 0' }}>
        <div className="pg-inner" style={{ textAlign: 'center' }}>
          <div className="pg-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="pg-eyebrow-line" style={{ background: '#d1d5db' }} />
            <span className="pg-eyebrow-text">The Philosophy</span>
            <span className="pg-eyebrow-line" style={{ background: '#d1d5db' }} />
          </div>
          <h2 className="pg-section-title">Growth through <strong>subtraction</strong></h2>
          <p className="pg-body-text" style={{ fontSize: '1.1rem' }}>
            Most personal growth happens despite our efforts, not because of them. The podcast episodes, the journalling prompts, the coaching calls — they add knowledge. But real growth requires something different: an <strong>interruption in the pattern</strong>. 
          </p>
          <p className="pg-body-text" style={{ fontSize: '1.1rem' }}>
            A Himalayan retreat provides that interruption through environment, silence, and time. When you are no longer optimising or producing, your nervous system resets and genuine insight arrives without force.
          </p>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '5rem 0' }}>
        <div className="pg-inner">
          <div className="pg-eyebrow">
            <span className="pg-eyebrow-line" />
            <span className="pg-eyebrow-text">Is This For You</span>
          </div>
          <h2 className="pg-section-title">Who seeks a <strong>Growth Retreat</strong></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            {[
              'People who have done the courses and read the books but haven\'t felt the shift',
              'Professionals seeking to develop emotional intelligence, clarity, and presence',
              'Those in transition who want direction from within rather than from advice',
              'Creative people whose creative capacity has been buried under demands',
              'Anyone drawn to the idea that growth happens through subtraction, not addition'
            ].map((item, idx) => (
              <div key={idx} style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', display: 'flex', gap: '1rem', alignItems: 'flex-start', border: '1px solid #e5e7eb' }}>
                <span style={{ color: 'var(--color-primary)', fontSize: '1.25rem', lineHeight: 1 }}>✦</span>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', color: '#374151', lineHeight: 1.6, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE STRUCTURE ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '5rem 0' }}>
        <div className="pg-inner">
          <div className="pg-eyebrow">
            <span className="pg-eyebrow-line" />
            <span className="pg-eyebrow-text">The Process</span>
          </div>
          <h2 className="pg-section-title">How the retreat is <strong>structured</strong></h2>
          <p className="pg-body-text">
            Not a lecture series. Not a workshop with handouts. A personal growth retreat is structured entirely around <strong>experience</strong>. When the external world steps back, the internal world reveals itself.
          </p>

          <div className="pg-timeline">
            {[
              { title: 'Morning Meditation', desc: 'Clear the surface noise. We begin each day in silence to set a baseline of presence before words interfere.' },
              { title: 'Guided Reflection', desc: 'Working with questions that open rather than close. Inquiry designed to bypass standard narratives.' },
              { title: 'Nature Immersion', desc: 'Walking, sitting, and observing without agenda. The Himalayan environment itself is an active catalyst for shifting perspective.' },
              { title: 'Journalling', desc: 'Making visible what the silence reveals. Capturing insights before the critical mind can filter them.' },
              { title: 'Evening Integration', desc: 'Weaving the day\'s insights into understanding in a safe, held environment.' },
              { title: 'Genuine Rest', desc: 'Rest understood as a vital growth practice, not a symptom of laziness or failure to produce.' }
            ].map((step, idx) => (
              <div key={idx} className="pg-timeline-item">
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.05rem', fontWeight: 500, color: '#111', margin: '0 0 0.4rem' }}>{step.title}</h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHERE TO GROW (Locations) ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#111827', padding: '5rem 0' }}>
        <div className="pg-wide">
          <div className="pg-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="pg-eyebrow-line" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <span className="pg-eyebrow-text" style={{ color: 'rgba(255,255,255,0.6)' }}>Himalayan Settings</span>
            <span className="pg-eyebrow-line" style={{ background: 'rgba(255,255,255,0.3)' }} />
          </div>
          <h2 className="pg-section-title" style={{ textAlign: 'center', color: '#fff' }}>Environments for <strong>Insight</strong></h2>
          <p className="pg-body-text" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', maxWidth: '36rem', margin: '0 auto 3rem' }}>
            The location dictates the energy. Choose the environment that matches what you are ready to explore.
          </p>

          <div className="pg-loc-grid">
            {LOCATIONS.map((loc) => (
              <Link key={loc.id} href={`/${loc.id}`} className="pg-loc-card">
                <Image src={loc.image} alt={loc.name} fill sizes="(max-width: 640px) 100vw, 25vw" style={{ objectFit: 'cover' }} />
                <div className="pg-loc-content">
                  <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>{loc.tagline}</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 400, margin: '0 0 0.5rem', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{loc.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: 0 }}>{loc.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DURATIONS & FUNNEL ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '5rem 0' }}>
        <div className="pg-inner">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="pg-section-title">Durations & <strong>Commitment</strong></h2>
            <p className="pg-body-text" style={{ maxWidth: '38rem', margin: '0 auto' }}>
              We recommend specific durations based on how deep you are ready to go.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            <Link href="/3-day-meditation-retreat" style={{ textDecoration: 'none', background: '#f9fafb', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.2s' }}>
              <h3 style={{ color: '#111', fontSize: '1.1rem', margin: '0 0 0.5rem', fontWeight: 500 }}>3-Day Retreat</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>Enough time to interrupt the pattern and yield meaningful preliminary insight.</p>
            </Link>
            <Link href="/5-day-yoga-retreat" style={{ textDecoration: 'none', background: '#f9fafb', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.2s' }}>
              <h3 style={{ color: '#111', fontSize: '1.1rem', margin: '0 0 0.5rem', fontWeight: 500 }}>5-Day Retreat</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>The perfect balance. Allows the body to fully settle and the mind to clear.</p>
            </Link>
            <Link href="/7-day-meditation-retreat" style={{ textDecoration: 'none', background: '#f9fafb', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.2s' }}>
              <h3 style={{ color: '#111', fontSize: '1.1rem', margin: '0 0 0.5rem', fontWeight: 500 }}>7-Day Retreat</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>The depth where genuine, sustained growth and fundamental paradigm shifts live.</p>
            </Link>
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '3rem 2rem', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#166534', margin: '0 0 1rem', fontWeight: 400 }}>Ready to choose your path?</h3>
            <p style={{ color: '#15803d', fontSize: '0.95rem', margin: '0 auto 2rem', maxWidth: '32rem', lineHeight: 1.6 }}>
              The growth you need is already inside you. The retreat just removes what's in the way.
            </p>
            <PrimaryCTA
              label="Talk to a Retreat Planner"
              subtext="Free consultation to find the right container for your growth."
              vertical="retreat"
              category="personal-growth"
              sourcePath={PATH}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <div className="pg-inner" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/self-discovery-retreat" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Explore Self-Discovery Retreats →</Link>
          <span style={{ color: '#d1d5db' }}>|</span>
          <Link href="/life-reset-retreat" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Explore Life Reset Retreats →</Link>
          <span style={{ color: '#d1d5db' }}>|</span>
          <Link href="/spiritual-awakening-retreat" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Explore Spiritual Awakening →</Link>
        </div>
      </div>
    </TrackedPage>
  );
}
