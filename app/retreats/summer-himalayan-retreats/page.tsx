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

const PATH = '/retreats/summer-himalayan-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Summer Himalayan Retreats in India — May & June Escape',
    description:
      'Escape summer with Himalayan retreats in Sankri, Munsiyari, Chakrata, and Rishikesh, with cool air, yoga, meditation, and May–June stays.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Summer Himalayan Retreats in India — May & June Escape',
      description:
        'Cool mountain air, open landscapes, and structured retreat programs across four Himalayan locations. May–June programs for heat escape and intentional pause.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Summer Himalayan Retreats in India — May & June Escape'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How cool are the Himalayas in May and June?',
    answer:
      'Temperatures vary by altitude. Sankri and Munsiyari typically range from 10–22°C, offering genuine relief from plains heat. Chakrata sits around 15–28°C — noticeably cooler than Delhi but not alpine cold. Rishikesh is warmer at 25–35°C but still more comfortable than the deep plains. For maximum temperature contrast, higher-altitude locations like Sankri and Munsiyari deliver the strongest summer cooling.',
  },
  {
    question: 'Is summer a good time for a first retreat?',
    answer:
      'Summer is arguably the best season for first-time retreat participants. The weather is comfortable, daylight hours are long, and outdoor programming is at its fullest. Trails are accessible, landscapes are green, and the extended evenings allow gentle transition into retreat rhythm without the intensity of winter cold or monsoon restrictions. Most beginners find May and June the most approachable window.',
  },
  {
    question: 'Will monsoon affect a May or June retreat?',
    answer:
      'Monsoon typically arrives in the Himalayan foothills by late June or early July. May and early-to-mid June programs generally operate before monsoon onset. Late June retreats at lower elevations such as Rishikesh may encounter pre-monsoon humidity and occasional rain. Higher-altitude locations like Sankri and Munsiyari see monsoon effects later and less intensely. Program dates are set with seasonal timing in mind.',
  },
  {
    question: 'What should I pack for a summer Himalayan retreat?',
    answer:
      'Light layers are essential — mornings and evenings can be cool even when days are warm. A light rain jacket for unexpected showers, comfortable walking shoes with grip, sunscreen, a hat, and a reusable water bottle are recommended. Loose, breathable clothing works well for yoga and movement sessions. Detailed packing guidance is provided after booking based on the specific location and altitude.',
  },
  {
    question: 'Can I combine a summer retreat with trekking?',
    answer:
      'Yes. Summer is peak trekking season in the higher Himalayas, and locations like Sankri and Munsiyari offer natural retreat-plus-trek combinations. Kedarkantha and Har Ki Dun from Sankri, or Khaliya Top and Milam Glacier approaches from Munsiyari, can be paired with retreat programs. These hybrid formats suit participants who want both physical challenge and reflective practice.',
  },
];

export default function SummerHimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Himalayan Retreats', url: buildCanonicalUrl('/retreats/himalayan-retreats') },
    { name: 'Summer Retreats', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Summer Himalayan Retreats in India"
        description="Escape the Indian summer with Himalayan retreats in Sankri, Munsiyari, Chakrata and Rishikesh. Cool mountain air, yoga, meditation and transformational stays from May to June."
        path={PATH}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Himalayan Retreats', href: '/retreats/himalayan-retreats' },
          { name: 'Summer Retreats' },
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
          <img className="med-hero-bg" src="/Images/location/munsiyari.webp" alt="Summer Himalayan retreat in India" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Summer Retreats &middot; May–June</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Summer Himalayan Retreats <span style={{ color: '#5eead4' }}>in India.</span>
          </h1>
          <p style={{ maxWidth: '40rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            When the Indian plains cross 40°C in May and June, the Himalayan foothills and valleys sit between 12 and 25 degrees. The air is clean. The views are open. The forests are fully green and alive.
          </p>
          <p style={{ maxWidth: '40rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Long daylight hours extend practice into early morning and late evening. Trails open for walking meditation and light trekking. Outdoor yoga happens in meadows rather than enclosed rooms.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['Heat escape', 'Long daylight', 'Green forests', 'Outdoor practice'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '999px', padding: '0.45rem 0.9rem', background: 'rgba(15,118,110,0.35)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/919760446101?text=${encodeURIComponent("Hi, I'm interested in a summer Himalayan retreat. Can you tell me more?")}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Plan My Summer Retreat</a>
            <a href="#summer-locations" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Compare Summer Locations</a>
          </div>
        </div>
      </section>

      {/* ── WHY SUMMER ── */}
<section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
  <div className="med-inner">
    <div className="med-eyebrow">
      <span className="med-eyebrow-line" />
      <span className="med-eyebrow-text">Why Summer</span>
    </div>
    <h2 className="med-h2">Why summer changes <span>the retreat outcome.</span></h2>
    <p className="med-body">
      The primary draw is climate contrast. When Delhi, Mumbai, and Bengaluru are at peak heat and humidity, the Himalayan mid-altitudes offer temperatures that feel like a different season. But the value is not merely thermal.
    </p>

    <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
      <div className="med-card" style={{ padding: '1.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(15,118,110,0.3)', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#0f766e', marginBottom: '1.3rem' }}>01</div>
        <h3 className="med-h3">Temperature and comfort.</h3>
        <p className="med-body" style={{ marginBottom: 0 }}>At 1,500–2,500 metres, daytime temperatures range from 18 to 25°C. Nights are cool enough for deep sleep without heating. This is the Goldilocks window — warm enough for outdoor practice, cool enough for the body to recover.</p>
      </div>

      <div className="med-card" style={{ padding: '1.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(15,118,110,0.3)', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#0f766e', marginBottom: '1.3rem' }}>02</div>
        <h3 className="med-h3">Extended daylight.</h3>
        <p className="med-body" style={{ marginBottom: 0 }}>Summer days in the Himalayas stretch past 7 PM. Morning light arrives before 5 AM. This creates programming flexibility — sunrise yoga, late-afternoon nature walks, and evening integration sessions in natural light.</p>
      </div>

      <div className="med-card" style={{ padding: '1.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(15,118,110,0.3)', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#0f766e', marginBottom: '1.3rem' }}>03</div>
        <h3 className="med-h3">Landscape at full capacity.</h3>
        <p className="med-body" style={{ marginBottom: 0 }}>Forests are dense and green. Wildflowers bloom across alpine meadows. Rivers run full from snowmelt. The landscape is generous in summer — visually rich, acoustically alive, and physically inviting.</p>
      </div>

      <div className="med-card" style={{ padding: '1.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(15,118,110,0.3)', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#0f766e', marginBottom: '1.3rem' }}>04</div>
        <h3 className="med-h3">Beginner-friendly conditions.</h3>
        <p className="med-body" style={{ marginBottom: 0 }}>Summer removes the barriers that discourage first-time participants in other seasons — cold temperatures, snow logistics, road uncertainty. May–June is the most natural entry point for exploring the retreat format.</p>
      </div>
    </div>

    <div className="med-card" style={{ padding: '1.8rem', marginTop: '1.4rem' }}>
      <p className="med-body" style={{ marginBottom: 0 }}>
        <strong>Summer's real advantage:</strong> the body relaxes faster when the climate is comfortable, the landscape is open, and practice can move outdoors.
      </p>
    </div>
  </div>
</section>

      {/* ── LOCATIONS ── */}
      <section id="summer-locations" className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Four Locations</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ textAlign: 'center' }}>Choose your <span>summer cooling level.</span></h2>
          <p className="med-body" style={{ textAlign: 'center', maxWidth: '46rem', margin: '0 auto 2.2rem' }}>
            Summer amplifies the strengths of higher-altitude locations while making lower elevations warmer. The choice depends on how much altitude you want, whether you plan to combine trekking with retreat, and how far you are willing to travel.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* Sankri */}
            <div className="med-location-row">
              <div className="med-location-media">
                <img src="/Images/location/sankri.webp" alt="Sankri — pine forest valley in Govind Wildlife Sanctuary, Garhwal" />
              </div>
              <div className="med-location-body">
                <span className="med-season-tag">Cool pine valley</span>
                <h3><Link href="/retreats/sankri">Sankri — Cool pine forest valleys</Link></h3>
                <p>Sankri sits at the upper edge of the treeline in the Govind Wildlife Sanctuary corridor, where summer temperatures rarely exceed 22°C. Pine and oak forests provide natural air conditioning and walking routes that stay cool even at midday.</p>
                <div className="med-location-facts">
                  <div className="med-location-fact">
                    <strong>Summer type</strong>
                    <span>Cool, green, trail-rich</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Best for</strong>
                    <span>Retreat plus trekking</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Feel</strong>
                    <span>Forest shade and snowmelt rivers</span>
                  </div>
                </div>
                <p>Kedarkantha and Har Ki Dun trails are fully accessible, making Sankri the strongest summer location for participants who want physical movement alongside reflective practice.</p>
                <div className="med-location-actions">
                  <Link href="/retreats/sankri" className="med-location-btn">View Sankri retreats</Link>
                </div>
              </div>
            </div>

            {/* Munsiyari - image right */}
            <div className="med-location-row med-location-row-alt">
              <div className="med-location-body">
                <span className="med-season-tag">Premium alpine cool</span>
                <h3><Link href="/retreats/munsiyari">Munsiyari — High altitude and Panchachuli views</Link></h3>
                <p>Munsiyari in summer is the premium alpine option. At over 2,200 metres, with the Panchachuli massif filling the northern horizon, this is mountain retreat at its most dramatic.</p>
                <div className="med-location-facts">
                  <div className="med-location-fact">
                    <strong>Summer type</strong>
                    <span>15–22°C, alpine, remote</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Best for</strong>
                    <span>Experienced retreat participants</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Feel</strong>
                    <span>Altitude, grandeur, separation</span>
                  </div>
                </div>
                <p>Khaliya Top meadows bloom with wildflowers. The longer journey creates natural psychological separation from routine.</p>
                <div className="med-location-actions">
                  <Link href="/retreats/munsiyari" className="med-location-btn">View Munsiyari retreats</Link>
                </div>
              </div>
              <div className="med-location-media">
                <img src="/Images/location/munsiyari.webp" alt="Munsiyari — Panchachuli massif views from high altitude Kumaon village" />
              </div>
            </div>

            {/* Chakrata */}
            <div className="med-location-row">
              <div className="med-location-media">
                <img src="/Images/location/chakrata.webp" alt="Chakrata — deodar forest trails on forested ridge near Dehradun" />
              </div>
              <div className="med-location-body">
                <span className="med-season-tag">Easy hill escape</span>
                <h3><Link href="/retreats/chakrata">Chakrata — Quiet hill escape</Link></h3>
                <p>Chakrata is the most accessible summer escape — reachable from Delhi within a day, sitting on a forested ridge at moderate altitude. Summer days are warm but comfortable, and the deodar forests provide shade and walking routes.</p>
                <div className="med-location-facts">
                  <div className="med-location-fact">
                    <strong>Summer type</strong>
                    <span>Warm, shaded, easy access</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Best for</strong>
                    <span>Long weekends and short retreats</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Access</strong>
                    <span>Simple logistics from Delhi</span>
                  </div>
                </div>
                <p>For professionals seeking a three-to-five-day retreat without complex logistics, Chakrata delivers genuine mountain environment with minimal travel friction.</p>
                <div className="med-location-actions">
                  <Link href="/retreats/chakrata" className="med-location-btn">View Chakrata retreats</Link>
                </div>
              </div>
            </div>

            {/* Rishikesh - image right */}
            <div className="med-location-row med-location-row-alt">
              <div className="med-location-body">
                <span className="med-season-tag">Spiritual heat window</span>
                <h3><Link href="/retreats/rishikesh">Rishikesh — Riverside retreats before monsoon</Link></h3>
                <p>Rishikesh in May–June is warmer than the mountain locations but remains cooler than the deep plains. Pre-monsoon energy creates intensity — the Ganges runs strong and serious yoga courses run their intensive summer cohorts.</p>
                <div className="med-location-facts">
                  <div className="med-location-fact">
                    <strong>Summer type</strong>
                    <span>Warm, spiritual, pre-monsoon</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Best for</strong>
                    <span>Yoga and teacher-led study</span>
                  </div>
                  <div className="med-location-fact">
                    <strong>Feel</strong>
                    <span>Riverside intensity, not cool escape</span>
                  </div>
                </div>
                <p>For those drawn to <Link href="/retreats/journeys/yoga-and-movement">yoga and movement</Link> or philosophical study, pre-monsoon Rishikesh has focused energy.</p>
                <div className="med-location-actions">
                  <Link href="/retreats/rishikesh" className="med-location-btn">View Rishikesh retreats</Link>
                </div>
              </div>
              <div className="med-location-media">
                <img src="/Images/location/rishikesh.webp" alt="Rishikesh — Ganges riverside yoga and retreat before monsoon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── A TYPICAL DAY ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">A Typical Day</span>
          </div>
          <h2 className="med-h2">A summer retreat moves with <span>the long daylight.</span></h2>
          <p className="med-body">
            Summer programming takes advantage of extended daylight and comfortable outdoor conditions. A typical day is more expansive than winter formats — more time outside, more movement, more landscape integration.
          </p>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">First light</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>05 AM</span>
              </div>
              <h3 className="med-h3">Morning yoga in open air.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Meadow or forest-edge sessions begin at first light, when mountain air is coolest and clearest. Breathwork and pranayama feel deeper in clean, oxygen-rich mountain air.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Midday shade</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>11 AM</span>
              </div>
              <h3 className="med-h3">Guided forest meditation.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Walking or seated practice moves under tree canopy, using natural sound as the meditation object. The shade creates a quieter middle of the day instead of a rushed schedule.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Afternoon trail</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>04 PM</span>
              </div>
              <h3 className="med-h3">Nature walks and light trekking.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Trail-based integration sessions use routes that are fully accessible in summer. Movement, landscape, and reflection become part of the retreat rather than separate activities.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Long evening</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>07 PM</span>
              </div>
              <h3 className="med-h3">Digital detox and integration.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Reduced connectivity at mountain locations makes disconnection natural rather than disciplined. Long twilight hours support journaling, conversation, or quiet time before natural sleep onset.
              </p>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.5rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>
              For a deeper comparison of retreat formats and how to choose between them, see our guide to <Link href="/blog/3-day-vs-5-day-himalayan-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>choosing the right retreat length</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHO SUMMER WORKS FOR ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Is This For You</span>
          </div>
          <h2 className="med-h2">Who summer retreats <span>work best for.</span></h2>
          <p className="med-body">
            Summer is the easiest Himalayan retreat season to enter: warm enough for outdoor practice, cool enough for recovery, and open enough for movement, conversation, and landscape-based integration.
          </p>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Work reset</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>01</span>
              </div>
              <h3 className="med-h3">Corporate professionals.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Needing structured pause during the May–June window before Q3 intensity begins.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Nervous system</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>02</span>
              </div>
              <h3 className="med-h3">Burnout recovery.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                The gentle climate and longer days create ideal conditions for nervous system recalibration without the intensity of winter cold. See our <Link href="/retreats/journeys/burnout-recovery" style={{ color: '#0f766e', fontWeight: 600 }}>Burnout Recovery</Link> program.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">First retreat</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>03</span>
              </div>
              <h3 className="med-h3">First-time retreat participants.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Summer removes barriers of cold, logistics complexity, and seasonal uncertainty, making it the most accessible entry point.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Shared pause</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>04</span>
              </div>
              <h3 className="med-h3">Couples.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Seeking shared reflective experience in comfortable, scenic conditions.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem', gridColumn: '1 / -1' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span className="med-season-tag">Soft community</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>05</span>
              </div>
              <h3 className="med-h3">Solo travellers.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Summer group sizes are moderate, creating community without being overwhelming.
              </p>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.8rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <strong>Best fit:</strong> summer works especially well for people who want retreat structure without harsh weather, snow logistics, or deep winter isolation.
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
          <h2 className="med-h2">Plan the retreat by <span>altitude, timing, and comfort.</span></h2>
          <p className="med-body">
            Summer is the most accessible Himalayan retreat season, but the best experience still depends on choosing the right altitude, booking window, packing style, and first-day pace.
          </p>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.15rem' }}>
                <span className="med-season-tag">Dates</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>01</span>
              </div>
              <h3 className="med-h3">Book early.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Summer is peak retreat season in the Himalayas. Popular locations and formats fill weeks in advance, particularly for May weekends and early June. Confirming your dates four to six weeks ahead is recommended.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.15rem' }}>
                <span className="med-season-tag">Location fit</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>02</span>
              </div>
              <h3 className="med-h3">Choose altitude by intent.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                If maximum cooling is the priority, choose Sankri or Munsiyari. If accessibility and weekend-friendly logistics matter more, Chakrata is optimal. If spiritual tradition matters more than climate, Rishikesh works even in summer warmth.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.15rem' }}>
                <span className="med-season-tag">Clothing</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>03</span>
              </div>
              <h3 className="med-h3">Pack in layers.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Mountain weather shifts through the day — mornings can be 12°C and afternoons 25°C in the same location. A light fleece, rain layer, comfortable walking shoes, and sun protection cover most situations.
              </p>
            </div>

            <div className="med-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.15rem' }}>
                <span className="med-season-tag">First day</span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '16px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 700 }}>04</span>
              </div>
              <h3 className="med-h3">Respect altitude gently.</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Locations above 2,000 metres — Sankri and Munsiyari — may cause mild breathlessness on arrival. Programs account for this with gradual first-day scheduling. Hydration and rest on the travel day are sufficient for most participants.
              </p>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.5rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <strong>Planning rule:</strong> choose Sankri or Munsiyari for maximum cooling, Chakrata for easy access, and Rishikesh for yoga tradition before monsoon.
            </p>
          </div>
        </div>
      </section>

      {/* ── SEASONAL NAV ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-card" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '2rem', alignItems: 'end', marginBottom: '2rem' }}>
              <div>
                <span className="med-season-tag">Other Seasons</span>
                <h2 className="med-h2" style={{ margin: '0.5rem 0 0' }}>Choose the season that matches your retreat need.</h2>
              </div>
              <p className="med-body" style={{ margin: 0 }}>
                Summer is for light, green landscapes, open-air practice, and comfortable movement. Winter changes the retreat completely — quieter, colder, smaller, and more introspective.
              </p>
            </div>

            <div className="med-grid-3">
              <div className="med-card" style={{ padding: '1.6rem' }}>
                <span className="med-season-tag">Current page</span>
                <h3 className="med-h3">Summer Himalayan Retreats.</h3>
                <p className="med-body" style={{ marginBottom: 0 }}>
                  May–June heat escape, long daylight, green forests, outdoor yoga, and accessible first-retreat conditions.
                </p>
              </div>

              <div className="med-card" style={{ padding: '1.6rem' }}>
                <span className="med-season-tag">Compare season</span>
                <h3 className="med-h3">Winter Himalayan Retreats.</h3>
                <p className="med-body" style={{ marginBottom: 0 }}>
                  December–February retreats offer snow silence, introspective depth, and small-group intimacy.
                </p>
                <Link href="/retreats/winter-himalayan-retreats" className="med-cta-btn" style={{ padding: '0.78rem 1.05rem', fontSize: '0.72rem', marginTop: '1.25rem' }}>Explore winter retreats</Link>
              </div>

              <div className="med-card" style={{ padding: '1.6rem' }}>
                <span className="med-season-tag">Complete guide</span>
                <h3 className="med-h3">Himalayan Retreats in India.</h3>
                <p className="med-body" style={{ marginBottom: 0 }}>
                  For a complete overview of all seasons, locations, formats, and retreat styles, start with the main Himalayan retreats guide.
                </p>
                <Link href="/retreats/himalayan-retreats" className="med-cta-btn" style={{ padding: '0.78rem 1.05rem', fontSize: '0.72rem', marginTop: '1.25rem' }}>View full guide</Link>
              </div>
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
          <h2 className="med-h2">Common questions before <span>a summer retreat.</span></h2>
          <p className="med-body">
            Use these answers to compare summer temperatures, monsoon timing, packing needs, first-retreat suitability, and trekking combinations before choosing your May–June Himalayan retreat.
          </p>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '48vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/location/munsiyari.webp" alt="Summer Himalayan retreat setting" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.86)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '42rem', padding: '4rem 1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.5rem, 2.9vw, 2.1rem)', fontWeight: 500, color: '#F6F2E7' }}>Ready for a summer escape?</h2>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: 'rgba(246,242,231,0.78)' }}>Talk with us about dates, location, and the right summer program for you.</p>
          <a href={`https://wa.me/919760446101?text=${encodeURIComponent("Hi, I'm interested in a summer Himalayan retreat. Can we discuss dates and options?")}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Plan My Summer Retreat</a>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <nav className="med-shell" style={{ background: '#ffffff' }}>
        <div className="med-inner" style={{ borderTop: '1px solid rgba(15,118,110,0.1)', padding: '2rem 1.5rem 3.5rem' }}>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <Link href="/retreats" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>← All Retreats</Link>
            <Link href="/retreats/himalayan-retreats" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Himalayan Retreats</Link>
            <Link href="/retreats/winter-himalayan-retreats" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Winter Retreats</Link>
            <Link href="/retreats/weekend-himalayan-retreats" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Weekend Retreats</Link>
          </div>
        </div>
      </nav>
    </TrackedPage>
  );
}
