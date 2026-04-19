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

const PATH = '/spiritual-awakening-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Spiritual Awakening Retreat — Beyond the Self You Know | Retreats And Treks',
    description:
      'Spiritual awakening retreat in the Indian Himalayas. Sustained meditation, silence, and contemplative practice in environments where awakening has been happening for millennia. Zanskar, Rishikesh, Chakrata.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Spiritual Awakening Retreat in the Himalayas',
      description: 'Sustained practice in environments where awakening has been happening for millennia.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Spiritual Awakening Retreat in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Can a retreat cause spiritual awakening?',
    answer:
      'A retreat cannot guarantee awakening any more than watering a plant guarantees flowering. But it can create the conditions — sustained silence, removed distractions, supported practice, and an environment that has held this work for centuries. Awakening, if it comes, arrives on its own schedule. The retreat simply makes you available for it.',
  },
  {
    question: 'Do I need to follow a specific spiritual tradition?',
    answer:
      'No. Our retreats draw from contemplative practices across traditions — Buddhist insight meditation, Hindu yogic practices, and non-denominational mindfulness — without requiring adherence to any tradition. The inner territory is universal. The techniques are tools, not dogma.',
  },
  {
    question: 'What is the difference between a spiritual retreat and an awakening retreat?',
    answer:
      'A spiritual retreat supports existing practice and provides depth. A spiritual awakening retreat is specifically oriented toward the dissolution of habitual identity structures — the fixed sense of "I". This requires longer duration, deeper silence, and greater willingness to sit with discomfort.',
  },
  {
    question: 'How long should a spiritual awakening retreat be?',
    answer:
      'Seven days minimum. Ten days is more realistic. The first 3–5 days are typically spent dismantling the noise layer. The deeper work happens after that — and it requires sustained, uninterrupted practice.',
  },
];

const LOCATIONS = [
  {
    name: 'Zanskar',
    id: 'meditation-retreat-zanskar',
    tagline: 'Living Lineage',
    description: 'Monastery culture stretching back over a thousand years. Deep high-altitude silence.',
    image: '/Images/location/zanskar.webp',
  },
  {
    name: 'Rishikesh',
    id: 'spiritual-retreat-rishikesh',
    tagline: 'The Sacred Ganges',
    description: 'The accumulated spiritual weight of India\'s contemplative capital. Tradition and lineage.',
    image: '/Images/location/rishikesh.webp',
  },
  {
    name: 'Chakrata',
    id: 'silent-retreat-chakrata',
    tagline: 'Nature as Teacher',
    description: 'For those who encounter the sacred through nature rather than tradition. Dense forest isolation.',
    image: '/Images/location/chakrata.webp',
  },
];

export default function SpiritualAwakeningRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Spiritual Awakening Retreat', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Spiritual Awakening Retreat' }]} />

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
            src="/Images/experience-hubs/monastery.png"
            alt="Spiritual Awakening Retreat in the Himalayas"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div className="pg-hero-overlay" />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '56rem', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0 auto 1.25rem', justifyContent: 'center' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Beyond the Known Self</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.4)' }} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 200,
            letterSpacing: '-0.035em', color: '#ffffff', margin: '0 0 1.25rem',
            lineHeight: 1.1, textShadow: '0 4px 24px rgba(0,0,0,0.5)',
          }}>
            Spiritual Awakening Retreat
          </h1>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)',
            fontWeight: 300, lineHeight: 1.8, maxWidth: '42rem', margin: '0 auto 2.5rem',
          }}>
            Spiritual awakening is not what the market sells. It is the profound recognition that the person you take yourself to be — with all their stories, fears, and ambitions — is merely a construction.
          </p>
          <PrimaryCTA
            label="Inquire About an Awakening Retreat"
            subtext=""
            vertical="retreat"
            category="spiritual-awakening"
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
          <h2 className="pg-section-title">Beyond <strong>Self-Improvement</strong></h2>
          <p className="pg-body-text" style={{ fontSize: '1.1rem' }}>
            Awakening is not bliss on demand. It is not cosmic visions on schedule. And it is certainly not enlightenment as a credential. Beneath the constructed self, something else has always been present.
          </p>
          <p className="pg-body-text" style={{ fontSize: '1.1rem' }}>
            The Himalayas have been the geography of this recognition for millennia because the sheer scale, ruggedness, and silence of these mountains teach impermanence in ways that no discourse or book can.
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
          <h2 className="pg-section-title">Who seeks <strong>Awakening</strong></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            {[
              'Experienced meditators seeking to deepen beyond technique into direct seeing',
              'People who have had glimpses of something beyond the personal self and want sustained access',
              'Those at a point where questions of identity, purpose, and meaning have become deeply urgent',
              'Practitioners from any tradition who want an intensive silent container for practice',
              'Anyone who has reached the limits of self-improvement and suspects something else is possible'
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
          <h2 className="pg-section-title">Cultivating <strong>Awareness</strong></h2>
          <p className="pg-body-text">
            Awakening cannot be engineered, but the conditions for it can be cultivated. Our retreats focus entirely on creating an unbreakable container of practice, intention, and silence.
          </p>

          <div className="pg-timeline">
            {[
              { title: 'Dismanting the Narrative', desc: 'The first days are focused entirely on observing the habitual stories of the ego. This phase requires confronting deep discomfort.' },
              { title: 'Sustained Vigilance', desc: 'Extended practice hours. You will sit, walk, and breathe with unbroken attention, leaning into the emptiness.' },
              { title: 'Direct Transmission & Inquiry', desc: 'Working with guides who understand the territory. Dharma talks and direct self-inquiry (Vichara) to cut through illusion.' },
              { title: 'Surrender', desc: 'The point where effort exhausts itself and genuine awakening sometimes arrives. You stop trying to attain, and simply remain.' }
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
          <h2 className="pg-section-title" style={{ textAlign: 'center', color: '#fff' }}>Environments that hold <strong>Truth</strong></h2>
          <p className="pg-body-text" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', maxWidth: '36rem', margin: '0 auto 3rem' }}>
            Intensive spiritual inquiry requires an unshakable container. These locations have been holding seekers for centuries.
          </p>

          <div className="pg-loc-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {LOCATIONS.map((loc) => (
              <Link key={loc.id} href={`/${loc.id}`} className="pg-loc-card">
                <Image src={loc.image} alt={loc.name} fill sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
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
              Awakening work requires sustained, unbroken duration. The mind needs days, not hours, to settle past its habitual patterns.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            <Link href="/7-day-meditation-retreat" style={{ textDecoration: 'none', background: '#f9fafb', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.2s' }}>
              <h3 style={{ color: '#111', fontSize: '1.1rem', margin: '0 0 0.5rem', fontWeight: 500 }}>7-Day Retreat</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>The absolute minimum requested time for genuine spiritual immersion and systemic unbinding.</p>
            </Link>
            <Link href="/10-day-silent-retreat" style={{ textDecoration: 'none', background: '#f9fafb', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', transition: 'all 0.2s' }}>
              <h3 style={{ color: '#111', fontSize: '1.1rem', margin: '0 0 0.5rem', fontWeight: 500 }}>10-Day Silent Retreat</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>The traditional, rigorous container required for intensive spiritual practice and paradigm collapse.</p>
            </Link>
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '3rem 2rem', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#166534', margin: '0 0 1rem', fontWeight: 400 }}>Are you ready for this path?</h3>
            <p style={{ color: '#15803d', fontSize: '0.95rem', margin: '0 auto 2rem', maxWidth: '32rem', lineHeight: 1.6 }}>
              This retreat demands readiness. Describe where you are, and we will tell you honestly if this is the right next step.
            </p>
            <PrimaryCTA
              label="Talk to Us"
              subtext="Clear, honest guidance on retreat readiness and program fit."
              vertical="retreat"
              category="spiritual-awakening"
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
          <Link href="/self-discovery-retreat" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Explore Self-Discovery Retreats →</Link>
          <span style={{ color: '#d1d5db' }}>|</span>
          <Link href="/silent-retreats" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Explore Silent Retreats →</Link>
        </div>
      </div>
    </TrackedPage>
  );
}
