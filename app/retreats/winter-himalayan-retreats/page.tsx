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

const PATH = '/retreats/winter-himalayan-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Winter Himalayan Retreats in India — December to February',
    description:
      'Winter Himalayan retreats across Sankri, Chakrata, Munsiyari, and Rishikesh. Snow silence, forest calm, alpine stillness, and December–February programs.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Winter Himalayan Retreats in India — December to February',
      description:
        'Snow silence, crisp air, fewer tourists, slower rhythm. Winter retreat programs across four Himalayan locations.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Winter Himalayan Retreats in India — December to February'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Is it too cold for a winter Himalayan retreat?',
    answer:
      'Temperatures vary by location and altitude. Rishikesh remains mild (8–20°C). Chakrata is cool but manageable (2–15°C). Sankri and Munsiyari can drop below freezing at night, but retreat accommodations provide warm bedding, heaters, and hot meals. Most participants find the cold invigorating rather than uncomfortable — it sharpens attention and deepens sleep. Packing appropriate layers is recommended.',
  },
  {
    question: 'Will there be snow during a winter retreat?',
    answer:
      'Sankri typically receives snowfall from mid-December through February, often creating a snow-covered landscape. Munsiyari sees snow at higher elevations and occasionally in the town itself. Chakrata receives light snow in some years, particularly in January. Rishikesh does not receive snow. Snow conditions vary by year — retreat programs adapt schedules accordingly.',
  },
  {
    question: 'Are mountain roads accessible in winter?',
    answer:
      'Chakrata and Rishikesh remain accessible by road throughout winter. Sankri roads may be affected by snowfall — retreat operators monitor conditions and provide updated travel guidance before departure. Munsiyari access can be more challenging in heavy snow years, and some programs operate on a weather-dependent basis. Participants receive detailed travel advisories before booking confirmation.',
  },
  {
    question: 'What should I pack for a winter Himalayan retreat?',
    answer:
      'Layered thermal clothing is essential — base layers, fleece mid-layers, and a warm outer jacket. Warm socks, gloves, and a hat are recommended for higher-altitude locations. Comfortable indoor clothing for practice sessions, a reusable water bottle, personal medications, and a headlamp or torch for early mornings are also useful. Detailed packing lists are provided after booking.',
  },
  {
    question: 'Are winter retreats suitable for first-time participants?',
    answer:
      'Yes. Winter retreats often have smaller group sizes, which creates a more intimate and supportive container. The slower seasonal rhythm naturally suits first-time participants who benefit from reduced stimulation. However, those uncomfortable with cold temperatures may prefer spring or autumn programs, or the milder climate of Rishikesh.',
  },
  {
    question: 'How do winter retreats differ from other seasons?',
    answer:
      'Winter retreats are characterised by smaller groups, quieter environments, and more introspective programming. Snow cover and colder air reduce the impulse toward outdoor activity, naturally deepening indoor practices like meditation, breathwork, and journaling. Early sunsets create longer evenings for reflection. The overall pace is slower and more contained than warmer-season programs.',
  },
];

export default function WinterHimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Himalayan Retreats', url: buildCanonicalUrl('/retreats/himalayan-retreats') },
    { name: 'Winter Retreats', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Winter Himalayan Retreats in India"
        description="Winter retreat experiences across the Indian Himalayas. Snow silence in Sankri, forest calm in Chakrata, alpine stillness in Munsiyari, and mild spiritual immersion in Rishikesh."
        path={PATH}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Himalayan Retreats', href: '/retreats/himalayan-retreats' },
          { name: 'Winter Retreats' },
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

        .med-duration-badge { display: inline-flex; align-items: center; justify-content: center; min-width: 64px; height: 40px; padding: 0 0.9rem; border-radius: 10px; background: #0f766e; color: #fff; font-family: var(--font-fraunces), Georgia, serif; font-size: 1rem; font-weight: 600; margin-bottom: 1rem; }

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
          <img className="med-hero-bg" src="/Images/location/munsiyari.webp" alt="Winter Himalayan retreat in India" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Winter Retreats &middot; Dec–Feb</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Winter Himalayan Retreats <span style={{ color: '#5eead4' }}>in India.</span>
          </h1>
          <p style={{ maxWidth: '40rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Winter in the Himalayas strips everything to essentials. Snow absorbs sound. Cold air sharpens attention. Tourist traffic drops to near zero. The mountains become quieter, starker, and more honest.
          </p>
          <p style={{ maxWidth: '40rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            From December through February, days are shorter, mornings are crisp and still, and evenings arrive early — creating long hours for reflection, reading, and fireside quiet.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['Snow silence', 'Cold air', 'Smaller groups', 'Long evenings'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '999px', padding: '0.45rem 0.9rem', background: 'rgba(15,118,110,0.35)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/919760446101?text=${encodeURIComponent("Hi, I'm interested in a winter Himalayan retreat. Can you tell me more?")}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Plan My Winter Retreat</a>
            <a href="#winter-locations" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Compare Winter Locations</a>
          </div>
        </div>
      </section>

      {/* ── WHY WINTER ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Why Winter</span>
          </div>
          <h2 className="med-h2">Why winter changes <span>the retreat experience.</span></h2>
          <p className="med-body">
            Retreat environments are shaped by season as much as by facilitation. In winter, the Himalayas create conditions that are qualitatively different from spring or autumn programs — not better or worse, but distinct in what they offer the nervous system.
          </p>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card" style={{ padding: '1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(15,118,110,0.3)', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#0f766e', marginBottom: '1.3rem' }}>01</div>
              <h3 className="med-h3">Reduced stimulation.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>Snow cover dampens ambient sound. Fewer travellers mean quieter roads, emptier trails, and smaller groups. The external world becomes simpler — and that simplicity transfers inward.</p>
            </div>

            <div className="med-card" style={{ padding: '1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(15,118,110,0.3)', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#0f766e', marginBottom: '1.3rem' }}>02</div>
              <h3 className="med-h3">Snow acoustics.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>Fresh snow absorbs high-frequency sound, creating a muted acoustic environment that is measurably different from other seasons. For meditation, breathwork, and journaling, the container is held by the physical environment itself.</p>
            </div>

            <div className="med-card" style={{ padding: '1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(15,118,110,0.3)', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#0f766e', marginBottom: '1.3rem' }}>03</div>
              <h3 className="med-h3">Early sunsets.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>When darkness arrives by 5:30 PM, the evening expands. Fireside conversation, quiet reading, early sleep — winter naturally creates the spacious evenings that retreat designers try to build artificially in other seasons.</p>
            </div>

            <div className="med-card" style={{ padding: '1.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(15,118,110,0.3)', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#0f766e', marginBottom: '1.3rem' }}>04</div>
              <h3 className="med-h3">Small group intimacy.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>Winter programs draw fewer participants, which means smaller circles, more facilitator attention, and deeper relational dynamics. Groups of 6–10 create a different kind of trust than groups of 20.</p>
            </div>

            <div className="med-card" style={{ padding: '1.6rem', gridColumn: '1 / -1' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(15,118,110,0.3)', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#0f766e', marginBottom: '1.3rem' }}>05</div>
              <h3 className="med-h3">Contrast therapy.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>Cold mornings and warm interiors create a natural rhythm of contraction and expansion. Stepping into sharp mountain air at dawn, then returning to hot chai and a warm practice space, makes discomfort brief and purposeful.</p>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.8rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <strong>Winter's real advantage:</strong> silence feels less like discipline and more like a continuation of what the landscape is already doing.
            </p>
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ── */}
      <section id="winter-locations" className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Four Locations</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ textAlign: 'center' }}>Choose your <span>winter intensity.</span></h2>
          <p className="med-body" style={{ textAlign: 'center', maxWidth: '46rem', margin: '0 auto 2.2rem' }}>
            Each of our four Himalayan locations responds differently to winter. Choosing the right one depends on how much cold you welcome, what kind of stillness you seek, and whether you want snow or simply quiet.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* Sankri */}
            <div className="med-location-row">
              <div className="med-location-media">
                <img src="/Images/location/sankri.webp" alt="Sankri — snow-covered valley and pine forests in winter, Garhwal" />
              </div>
              <div className="med-location-body">
                <span className="med-season-tag">Deep snow</span>
                <h3><Link href="/retreats/sankri">Sankri — Snow and high-altitude stillness</Link></h3>
                <p>Sankri in winter is a snow-covered valley at the edge of the treeline. Pine forests hold snow on their branches, creating corridors of white silence.</p>
                <div className="med-location-facts">
                  <div className="med-location-fact">
                    <strong>Winter type</strong>
                    <span>Real snow and freezing nights</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Best for</strong>
                    <span>People who want winter as the retreat</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Feel</strong>
                    <span>Wood fires, layers, deep quiet</span>
                  </div>
                </div>
                <p>Retreats here operate in genuine mountain winter. For seasonal planning, see our guide on <Link href="/blog/best-time-for-retreat-in-sankri">the best time for a retreat in Sankri</Link>.</p>
                <div className="med-location-actions">
                  <Link href="/retreats/sankri" className="med-location-btn">View Sankri retreats</Link>
                </div>
              </div>
            </div>

            {/* Chakrata - image right */}
            <div className="med-location-row med-location-row-alt">
              <div className="med-location-body">
                <span className="med-season-tag">Forest cold</span>
                <h3><Link href="/retreats/chakrata">Chakrata — Quiet forest winter</Link></h3>
                <p>Chakrata sits lower than Sankri, along a forested ridge that sees winter as cold calm rather than deep snow. The deodar and oak forests thin in winter, opening longer views across valleys.</p>
                <div className="med-location-facts">
                  <div className="med-location-fact">
                    <strong>Winter type</strong>
                    <span>Cold calm, frost, occasional snow</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Best for</strong>
                    <span>Seasonal stillness without extreme cold</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Access</strong>
                    <span>Practical even in January</span>
                  </div>
                </div>
                <p>This is the right winter location for people who want stillness without the intensity of high-altitude winter.</p>
                <div className="med-location-actions">
                  <Link href="/retreats/chakrata" className="med-location-btn">View Chakrata retreats</Link>
                </div>
              </div>
              <div className="med-location-media">
                <img src="/Images/location/chakrata.webp" alt="Chakrata — deodar forest in winter calm near Dehradun" />
              </div>
            </div>

            {/* Munsiyari */}
            <div className="med-location-row">
              <div className="med-location-media">
                <img src="/Images/location/munsiyari.webp" alt="Munsiyari — Panchachuli range under winter snow, Kumaon Himalaya" />
              </div>
              <div className="med-location-body">
                <span className="med-season-tag">Raw alpine</span>
                <h3><Link href="/retreats/munsiyari">Munsiyari — Alpine silence, weather dependent</Link></h3>
                <p>Munsiyari in winter faces the Panchachuli range under full snow. The village becomes very quiet — few visitors, reduced services, and a pace set entirely by weather.</p>
                <div className="med-location-facts">
                  <div className="med-location-fact">
                    <strong>Winter type</strong>
                    <span>Raw, remote, weather-led</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Best for</strong>
                    <span>Comfort with uncertainty</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Access</strong>
                    <span>Programs depend on conditions</span>
                  </div>
                </div>
                <p>When conditions allow, this is perhaps the most unmediated winter retreat setting we offer.</p>
                <div className="med-location-actions">
                  <Link href="/retreats/munsiyari" className="med-location-btn">View Munsiyari retreats</Link>
                </div>
              </div>
            </div>

            {/* Rishikesh - image right */}
            <div className="med-location-row med-location-row-alt">
              <div className="med-location-body">
                <span className="med-season-tag">Mild practice</span>
                <h3><Link href="/retreats/rishikesh">Rishikesh — Mild winter on the Ganges</Link></h3>
                <p>Rishikesh does not experience mountain winter. Days are cool and comfortable, nights are brisk but not cold, and the Ganges runs clearer in winter.</p>
                <div className="med-location-facts">
                  <div className="med-location-fact">
                    <strong>Winter type</strong>
                    <span>Cool, accessible, no snow</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Best for</strong>
                    <span>Yoga, tradition, community</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Feel</strong>
                    <span>Ashram rhythm and smaller cohorts</span>
                  </div>
                </div>
                <p>For participants who want a winter retreat without cold-weather intensity, Rishikesh offers structured practice in a mild, accessible climate.</p>
                <div className="med-location-actions">
                  <Link href="/retreats/rishikesh" className="med-location-btn">View Rishikesh retreats</Link>
                </div>
              </div>
              <div className="med-location-media">
                <img src="/Images/location/rishikesh.webp" alt="Rishikesh — Ganges riverside in mild winter, ashram and yoga programs" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEST MONTHS ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">When To Come</span>
          </div>
          <h2 className="med-h2">December to February, <span>three different winters.</span></h2>
          <p className="med-body">
            Winter is not one uniform season. December, January, and February each create a different retreat container — from first stillness to deep cold to the first signs of seasonal return.
          </p>

          <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '72px', height: '72px', borderRadius: '24px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Dec</div>
              <span className="med-season-tag">First stillness</span>
              <h3 className="med-h3">The transition month.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Snow begins arriving at higher elevations like Sankri and Munsiyari. Chakrata turns cold and clear. Rishikesh enters peak pilgrimage season. December retreats offer the first taste of winter stillness without the deepest cold.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '72px', height: '72px', borderRadius: '24px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Jan</div>
              <span className="med-season-tag">Deep winter</span>
              <h3 className="med-h3">The coldest, quietest month.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                January is the coldest month across all Himalayan locations. Sankri is fully snow-covered. Munsiyari may become intermittently inaccessible. Chakrata sees its lowest temperatures.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '72px', height: '72px', borderRadius: '24px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Feb</div>
              <span className="med-season-tag">Softening light</span>
              <h3 className="med-h3">Late winter, slightly easier.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Days begin lengthening. Snow persists at altitude but becomes softer. Chakrata warms slightly. Rishikesh starts the transition toward spring energy.
              </p>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.5rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <strong>Simple month rule:</strong> choose December for accessibility, January for the deepest winter container, and February for winter depth with softer light.
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
          <h2 className="med-h2">Winter is for people who want <span>less input.</span></h2>
          <p className="med-body">
            Winter retreats attract a specific kind of participant — people who recognise that the discomfort of cold and the scarcity of daylight are not obstacles but tools.
          </p>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Nervous system reset</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>01</span>
              </div>
              <h3 className="med-h3">Burnout recovery.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                The reduced stimulation of a winter Himalayan setting is neurologically ideal for overstimulated systems. Cold air, early sleep, and limited screen access create conditions the nervous system cannot resist resting in.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Threshold season</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>02</span>
              </div>
              <h3 className="med-h3">Deep reflection and transition.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Year-end and new-year retreats serve people processing career changes, relationship shifts, or creative blocks. Winter creates the psychological container for honest self-assessment.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Screen silence</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>03</span>
              </div>
              <h3 className="med-h3">Digital detox.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Shorter days and cold evenings eliminate the usual triggers for compulsive screen use. Winter removes the competition — there is nothing more stimulating outside the retreat to pull your attention.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Cold-weather seekers</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>04</span>
              </div>
              <h3 className="med-h3">People who come alive in cold.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                For them, the sharp air, snow light, and physical aliveness of a Himalayan winter are not tolerated but desired. These participants often find winter retreats more transformative than any other season.
              </p>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.8rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <strong>Not everyone wants this.</strong> Winter retreats are not built for entertainment or busy itineraries. They are best for people seeking something deeper than relaxation.
            </p>
          </div>
        </div>
      </section>

      {/* ── BEST FIT ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Best Fit</span>
          </div>
          <h2 className="med-h2">Best winter <span>program matches.</span></h2>
          <p className="med-body">
            Not every retreat format suits winter equally. The season amplifies certain styles and makes others impractical. Three formats align particularly well with cold, quiet, and early darkness.
          </p>

          <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Strongest match</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>01</span>
              </div>
              <h3 className="med-h3">Burnout Recovery</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Winter reduces input to the minimum. The cold, quiet, and darkness support nervous system recovery naturally, making this the strongest seasonal match for burnout programs.
              </p>
              <Link href="/retreats/journeys/burnout-recovery" className="med-cta-btn" style={{ padding: '0.78rem 1.05rem', fontSize: '0.72rem', marginTop: '1.25rem' }}>View Burnout Recovery</Link>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Silence-led</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>02</span>
              </div>
              <h3 className="med-h3">Meditation &amp; Silence</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Snow acoustics and fewer people create ambient silence that supports formal practice without artificial enforcement. Winter silence feels organic.
              </p>
              <Link href="/retreats/journeys/meditation-and-silence" className="med-cta-btn" style={{ padding: '0.78rem 1.05rem', fontSize: '0.72rem', marginTop: '1.25rem' }}>View Meditation &amp; Silence</Link>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Rest-led</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>03</span>
              </div>
              <h3 className="med-h3">Rest &amp; Reset</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Short days and long evenings naturally encourage extra sleep, slower meals, and unhurried integration. Winter does the work of rest without requiring discipline.
              </p>
              <Link href="/retreats/journeys/rest-and-reset" className="med-cta-btn" style={{ padding: '0.78rem 1.05rem', fontSize: '0.72rem', marginTop: '1.25rem' }}>View Rest &amp; Reset</Link>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.8rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>
              For a broader view of how all retreat formats are structured, see our complete guide to <Link href="/retreats/himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>Himalayan Retreats in India</Link>.
            </p>
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
          <h2 className="med-h2">Practical questions before <span>you choose winter.</span></h2>
          <p className="med-body">
            These answers cover cold, snow, road access, packing, first-time suitability, and how winter retreats differ from warmer-season programs.
          </p>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '48vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/location/munsiyari.webp" alt="Winter Himalayan retreat setting" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.86)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '42rem', padding: '4rem 1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.5rem, 2.9vw, 2.1rem)', fontWeight: 500, color: '#F6F2E7' }}>Ready for a winter reset?</h2>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: 'rgba(246,242,231,0.78)' }}>Talk with us about dates, location, and the right winter program for you.</p>
          <a href={`https://wa.me/919760446101?text=${encodeURIComponent("Hi, I'm interested in a winter Himalayan retreat. Can we discuss dates and options?")}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Plan My Winter Retreat</a>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <nav className="med-shell" style={{ background: '#ffffff' }}>
        <div className="med-inner" style={{ borderTop: '1px solid rgba(15,118,110,0.1)', padding: '2rem 1.5rem 3.5rem' }}>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <Link href="/retreats" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>← All Retreats</Link>
            <Link href="/retreats/himalayan-retreats" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Himalayan Retreats</Link>
            <Link href="/retreats/summer-himalayan-retreats" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Summer Retreats</Link>
            <Link href="/retreats/weekend-himalayan-retreats" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Weekend Retreats</Link>
          </div>
        </div>
      </nav>
    </TrackedPage>
  );
}
