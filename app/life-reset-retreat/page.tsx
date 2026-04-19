import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/life-reset-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Life Reset Retreat — Start Again from Silence | Retreats And Treks',
    description:
      'Life reset retreat in the Indian Himalayas. For when daily life needs a complete recalibration — not optimisation, not adjustment, but a genuine restart from stillness. Chakrata, Zanskar.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Life Reset Retreat in the Himalayas',
      description: 'Not optimisation. Not adjustment. A genuine restart from stillness.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Life Reset Retreat in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What does "life reset" mean in a retreat context?',
    answer:
      'A life reset is not about making a dramatic decision during the retreat. It is about creating enough distance from your existing patterns that you can see them clearly — and from that clarity, choose which ones to keep and which to release.',
  },
  {
    question: 'Is a life reset retreat different from a regular meditation retreat?',
    answer:
      'The techniques overlap — meditation, silence, journalling, nature immersion. The difference is intention. A meditation retreat focuses on deepening practice. A life reset retreat focuses on creating the conditions for a fundamental reorientation.',
  },
  {
    question: 'How long do the effects of a life reset retreat last?',
    answer:
      'The clarity achieved on retreat begins to fade within weeks if not maintained. But the decisions made from that clarity persist. The retreat does not change your life. It gives you the perspective to change it yourself.',
  },
  {
    question: 'Should I make major life decisions during the retreat?',
    answer:
      'We recommend against making final decisions during the retreat itself. Use the retreat to see clearly. Write down what you see. Then give yourself 2–4 weeks back in daily life before committing to major changes.',
  },
];

const LOCATIONS = [
  {
    name: 'Zanskar',
    id: 'meditation-retreat-zanskar',
    tagline: 'Radical Separation',
    description: 'Radical separation for deep recalibration. 3,500m monastery silence.',
    image: '/Images/location/zanskar.webp',
  },
  {
    name: 'Chakrata',
    id: 'meditation-retreat-chakrata',
    tagline: 'Gentle Decompression',
    description: 'Gentle forest environment for an accessible physiological reset.',
    image: '/Images/location/chakrata.webp',
  },
];

export default function LifeResetRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Life Reset Retreat', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Life Reset Retreat' }]} />

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
        .pg-loc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem; }
        .pg-loc-card { position: relative; border-radius: 12px; overflow: hidden; height: 320px; display: flex; align-items: flex-end; text-decoration: none; transition: transform 0.3s; }
        .pg-loc-card:hover { transform: translateY(-5px); }
        .pg-loc-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%); z-index: 1; }
        .pg-loc-content { position: relative; z-index: 2; padding: 1.5rem; width: 100%; color: #fff; }
      `}</style>

      {/* ── CINEMATIC HERO ── */}
      <section className="pg-hero">
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src="/Images/experience-hubs/meditation-group.png"
            alt="Life Reset Retreats in the Himalayas"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
          />
          <div className="pg-hero-overlay" />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '56rem', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0 auto 1.25rem', justifyContent: 'center' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Re-evaluate Everything</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.4)' }} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 200,
            letterSpacing: '-0.035em', color: '#ffffff', margin: '0 0 1.25rem',
            lineHeight: 1.1, textShadow: '0 4px 24px rgba(0,0,0,0.5)',
          }}>
            Life Reset Retreat
          </h1>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)',
            fontWeight: 300, lineHeight: 1.8, maxWidth: '42rem', margin: '0 auto 2.5rem',
          }}>
            You have reached a point where optimisation is not enough. You need distance. Genuine, sensory distance from everything familiar to see your life clearly enough to choose which parts to keep.
          </p>
          <PrimaryCTA
            label="Design Your Reset"
            subtext=""
            vertical="retreat"
            category="life-reset"
            sourcePath={PATH}
          />
        </div>
      </section>

      {/* ── THE PROBLEM (Intro) ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '5rem 0' }}>
        <div className="pg-inner" style={{ textAlign: 'center' }}>
          <div className="pg-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="pg-eyebrow-line" style={{ background: '#d1d5db' }} />
            <span className="pg-eyebrow-text">The Intervention</span>
            <span className="pg-eyebrow-line" style={{ background: '#d1d5db' }} />
          </div>
          <h2 className="pg-section-title">Distance is <strong>Clarity</strong></h2>
          <p className="pg-body-text" style={{ fontSize: '1.1rem' }}>
            The system is running as designed — career, relationships, routines — but the design no longer fits. Something fundamental needs to shift, and you <strong>cannot see what it is from inside the pattern</strong>.
          </p>
          <p className="pg-body-text" style={{ fontSize: '1.1rem' }}>
            A life reset retreat creates distance. Not to escape your life, but to perceive it accurately. The Himalayas enforce this organically: there are no signals, routines, or familiar triggers to latch onto.
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
          <h2 className="pg-section-title">Who seeks a <strong>Life Reset</strong></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            {[
              'Professionals in their 30s–50s who have succeeding at something that no longer matters',
              'People in the aftermath of major change — divorce, loss, career disruption',
              'Founders and leaders whose identity has fused entirely with their role',
              'Anyone who wakes at 3 AM with the sense that something needs to change but cannot name what',
              'People who have tried coaching, therapy, and holidays without finding the reset they need'
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
          <h2 className="pg-section-title">The stages of a <strong>Reset</strong></h2>
          <p className="pg-body-text">
            A reset cannot be forced. It must be allowed. The structure of a Himalayan Life Reset Retreat respects the physiological timeline of down-regulation.
          </p>

          <div className="pg-timeline">
            {[
              { title: 'Days 1–2: Withdrawal', desc: 'The familiar inputs stop. Phone, email, social media, news, conversation, tasks — all of it. The mind protests. Restlessness, anxiety, boredom. This is normal. It is the system de-patterning.' },
              { title: 'Days 3–5: Settling', desc: 'The mind quiets. The noise that was hiding beneath the busyness becomes audible — unprocessed emotions, suppressed questions, values that got lost in the rush. This phase can be uncomfortable but is where the real work begins.' },
              { title: 'Days 5–7+: Clarity', desc: 'From the settled place, seeing becomes possible. You can observe your life patterns without being inside them. Insights arrive without force. The reset is not a decision — it is a shift in perspective from which better decisions become obvious.' }
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
          <h2 className="pg-section-title" style={{ textAlign: 'center', color: '#fff' }}>Environments for <strong>Recalibration</strong></h2>
          <p className="pg-body-text" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', maxWidth: '36rem', margin: '0 auto 3rem' }}>
            Radical separation from the familiar requires an environment strong enough to hold what surfaces.
          </p>

          <div className="pg-loc-grid">
            {LOCATIONS.map((loc) => (
              <Link key={loc.id} href={`/${loc.id}`} className="pg-loc-card">
                <Image src={loc.image} alt={loc.name} fill sizes="(max-width: 640px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
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
              We strongly recommend longer formats for a Life Reset.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            <Link href="/7-day-meditation-retreat" style={{ textDecoration: 'none', background: '#f9fafb', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.2s' }}>
              <h3 style={{ color: '#111', fontSize: '1.1rem', margin: '0 0 0.5rem', fontWeight: 500 }}>7-Day Retreat</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>The absolute minimum requested time for a genuine physiological and mental reset.</p>
            </Link>
            <Link href="/10-day-silent-retreat" style={{ textDecoration: 'none', background: '#f9fafb', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.2s' }}>
              <h3 style={{ color: '#111', fontSize: '1.1rem', margin: '0 0 0.5rem', fontWeight: 500 }}>10-Day Silent Retreat</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>A deeper recalibration for those seeking radical transformation and extended silence.</p>
            </Link>
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '3rem 2rem', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#166534', margin: '0 0 1rem', fontWeight: 400 }}>Ready to step out of the pattern?</h3>
            <p style={{ color: '#15803d', fontSize: '0.95rem', margin: '0 auto 2rem', maxWidth: '32rem', lineHeight: 1.6 }}>
              Contact us. Describe your current state and let us recommend the safest and most effective container for your life reset.
            </p>
            <PrimaryCTA
              label="Talk to Us"
              subtext="No obligations, just an honest conversation."
              vertical="retreat"
              category="life-reset"
              sourcePath={PATH}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <div className="pg-inner" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/personal-growth-retreat" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Explore Personal Growth Retreats →</Link>
          <span style={{ color: '#d1d5db' }}>|</span>
          <Link href="/self-discovery-retreat" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Explore Self-Discovery Retreats →</Link>
          <span style={{ color: '#d1d5db' }}>|</span>
          <Link href="/burnout-recovery-retreats" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Explore Burnout Recovery →</Link>
        </div>
      </div>
    </TrackedPage>
  );
}
