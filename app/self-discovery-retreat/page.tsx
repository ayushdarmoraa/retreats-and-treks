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

const PATH = '/self-discovery-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Self-Discovery Retreat | Retreats And Treks',
    description:
      'Self-discovery retreat in the Himalayas with small groups, silence, reflection, and immersive settings in Chakrata, Zanskar, and Rishikesh.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Self-Discovery Retreat in the Himalayas',
      description: 'Who you are without the noise. Himalayan retreats for genuine self-encounter.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Self-Discovery Retreat in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What does a self-discovery retreat actually involve?',
    answer:
      'Meditation, silence, journalling, guided inquiry, and extended time in nature — but the real intervention is removal. We remove the familiar: screens, schedules, social roles, productivity pressure, and the default narratives you tell yourself. What remains in that space is what the retreat is about.',
  },
  {
    question: 'Do I need to know what I am looking for?',
    answer:
      'No. In fact, not knowing is a better starting position than a fixed agenda. A self-discovery retreat works by creating the conditions for insight to arise naturally — not by pursuing a specific answer. Come with curiosity rather than a checklist.',
  },
  {
    question: 'Is this a therapy retreat?',
    answer:
      'No. Self-discovery retreats are not therapeutic interventions. They are contemplative environments where you have sustained access to your own inner life. If therapeutic material surfaces, we hold it — but we are not therapists. If you are seeking depth and self-knowledge, this is the right space.',
  },
  {
    question: 'How long should a self-discovery retreat be?',
    answer:
      'Three days provides a genuine opening. Seven days allows depth. Ten days can be transformative. If you have the time, 7 days is the sweet spot — enough depth for real discovery without the endurance challenge of 10.',
  },
];

const LOCATIONS = [
  {
    name: 'Chakrata',
    id: 'silent-retreat-chakrata',
    tagline: 'Gentle Unveiling',
    description: 'Gentle forest silence for first encounters with the self.',
    image: '/Images/location/chakrata.webp',
  },
  {
    name: 'Zanskar',
    id: 'meditation-retreat-zanskar',
    tagline: 'Radical Depth',
    description: 'Radical separation for deep self-inquiry at 3,500m.',
    image: '/Images/location/zanskar.webp',
  },
  {
    name: 'Rishikesh',
    id: 'spiritual-retreat-rishikesh',
    tagline: 'Tradition-Supported',
    description: 'Tradition-supported self-inquiry guided by centuries of practice.',
    image: '/Images/location/rishikesh.webp',
  },
  {
    name: 'Munsiyari',
    id: 'healing-retreat-munsiyari',
    tagline: 'Expansive Perspective',
    description: 'Self-discovery through the vast perspective of the Panchachuli range.',
    image: '/Images/location/munsiyari.webp',
  },
];

export default function SelfDiscoveryRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Self-Discovery Retreat', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = generateBlogPostingSchema({
    title: 'Self-Discovery Retreat in the Himalayas — Who You Are Without the Noise',
    description:
      'Self-discovery retreat in the Himalayas with small groups, silence, reflection, and immersive settings in Chakrata, Zanskar, and Rishikesh.',
    publishedAt: '2026-03-06',
    lastUpdated: '2026-05-09',
    url: buildCanonicalUrl(PATH),
  });

  return (
    <TrackedPage page={PATH}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Self-Discovery Retreat' }]} />

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
        .pg-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.85) 100%); }

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
            src="/Images/experience-hubs/meditation-hero.webp"
            alt="Self-Discovery Retreat in the Himalayas"
            width={1920}
            height={1080}
            priority
            sizes="100vw"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }}
          />
          <div className="pg-hero-overlay" />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '56rem', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0 auto 1.25rem', justifyContent: 'center' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Find Who You Really Are</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.4)' }} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 200,
            letterSpacing: '-0.035em', color: '#ffffff', margin: '0 0 1.25rem',
            lineHeight: 1.1, textShadow: '0 4px 24px rgba(0,0,0,0.5)',
          }}>
            Self-Discovery Retreat
          </h1>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)',
            fontWeight: 300, lineHeight: 1.8, maxWidth: '42rem', margin: '0 auto 2.5rem',
          }}>
            You are not lost. You are buried under roles, expectations, habits, devices, obligations, and the noise of a life that has been designed by everyone except you.
          </p>
          <PrimaryCTA
            label="Start the Conversation"
            subtext="No obligation. We'll tell you honestly whether a retreat is the right next step."
            vertical="retreat"
            category="self-discovery"
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
          <h2 className="pg-section-title">Encountering the <strong>Self</strong></h2>
          <p className="pg-body-text" style={{ fontSize: '1.1rem' }}>
            A self-discovery retreat does not add anything. It subtracts. It removes the familiar structures and leaves you alone with the question that has been waiting beneath everything: <strong>who are you when there is nothing to perform, nothing to produce, and nowhere to be?</strong>
          </p>
          <p className="pg-body-text" style={{ fontSize: '1.1rem' }}>
            The Himalayas have been holding that question for people for thousands of years. We provide the environment, the silence, and the container for that discovery.
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
          <h2 className="pg-section-title">Who seeks <strong>Self-Discovery</strong></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            {[
              'People at a crossroads — career change, relationship shift, midlife reckoning',
              'Those who have achieved what they set out to achieve and found it was not enough',
              'Anyone whose daily life feels functional but hollow',
              'People seeking to reconnect with values, creativity, or purpose they have lost touch with',
              'Those drawn to inner work but not to religious frameworks'
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
          <h2 className="pg-section-title">How it <strong>works</strong></h2>
          <p className="pg-body-text">
            A self-discovery retreat is not a workshop with modules and outcomes. It is an environment designed for encounter. No goals. No performance metrics. No breakthroughs required.
          </p>

          <div className="pg-timeline">
            {[
              { title: 'Meditation & Stillness', desc: 'Sustained periods of silence to listen to the narratives running beneath your conscious thoughts.' },
              { title: 'Walking Inquiry', desc: 'Moving through the landscape. Physical movement helps to untangle deep-seated emotional knots.' },
              { title: 'Journalling & Surfacing', desc: 'Writing without censorship. You will be surprised by what your own pen tells you when no one is watching.' },
              { title: 'Resting the System', desc: 'Sometimes discovery simply looks like sleeping for 12 hours. We honor the body\'s need for profound, unapologetic rest.' }
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
          <h2 className="pg-section-title" style={{ textAlign: 'center', color: '#fff' }}>Environments for <strong>Discovery</strong></h2>
          <p className="pg-body-text" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', maxWidth: '36rem', margin: '0 auto 3rem' }}>
            The container matters. Pick an environment that safely holds the exploration you are undertaking.
          </p>

          <div className="pg-loc-grid">
            {LOCATIONS.map((loc) => (
              <Link key={loc.id} href={`/${loc.id}`} className="pg-loc-card">
                <Image src={loc.image} alt={loc.name} width={800} height={462} sizes="(max-width: 640px) 100vw, 25vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
              Select a duration based on your comfort with silence and capacity to disconnect.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            <Link href="/3-day-meditation-retreat" style={{ textDecoration: 'none', background: '#f9fafb', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.2s' }}>
              <h3 style={{ color: '#111', fontSize: '1.1rem', margin: '0 0 0.5rem', fontWeight: 500 }}>3-Day Retreat</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>Enough time to open the door and introduce your mind to the concept of true silence.</p>
            </Link>
            <Link href="/7-day-meditation-retreat" style={{ textDecoration: 'none', background: '#f9fafb', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.2s' }}>
              <h3 style={{ color: '#111', fontSize: '1.1rem', margin: '0 0 0.5rem', fontWeight: 500 }}>7-Day Retreat</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>The sweet spot. Enough depth for genuine discovery without the endurance challenge of a 10-day.</p>
            </Link>
            <Link href="/10-day-silent-retreat" style={{ textDecoration: 'none', background: '#f9fafb', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.2s' }}>
              <h3 style={{ color: '#111', fontSize: '1.1rem', margin: '0 0 0.5rem', fontWeight: 500 }}>10-Day Silent Retreat</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>Sustained immersion for those ready to confront the deepest layers of self.</p>
            </Link>
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '3rem 2rem', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#166534', margin: '0 0 1rem', fontWeight: 400 }}>Choose Your Path</h3>
            <p style={{ color: '#15803d', fontSize: '0.95rem', margin: '0 auto 2rem', maxWidth: '32rem', lineHeight: 1.6 }}>
              Not sure which format, location, or duration will serve you best right now? Let us help you navigate.
            </p>
            <PrimaryCTA
              label="Talk to Us"
              subtext="Clear, honest recommendations based on your needs."
              vertical="retreat"
              category="self-discovery"
              sourcePath={PATH}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <div className="pg-inner" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/spiritual-retreats" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Explore Spiritual Retreats →</Link>
          <span style={{ color: '#d1d5db' }}>|</span>
          <Link href="/life-reset-retreat" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Explore Life Reset Retreats →</Link>
          <span style={{ color: '#d1d5db' }}>|</span>
          <Link href="/personal-growth-retreat" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Explore Personal Growth Retreat →</Link>
        </div>
      </div>
    </TrackedPage>
  );
}
