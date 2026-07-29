import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import FeaturedRetreat from '@/components/FeaturedRetreat';
import RelatedReads from '@/components/RelatedReads';
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/best-meditation-retreats-in-india';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Meditation Retreats in India',
    description:
      'Compare the best meditation retreats in India by depth, remoteness, tradition, setting, and practice across Zanskar, Chakrata, and Rishikesh.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Best Meditation Retreats in India (2026) — Himalayan Silence & Depth',
      description:
        'Compare the best meditation retreats in India — from monastery immersion in Zanskar to forest silence in Chakrata and Ganges-side practice in Rishikesh.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Best Meditation Retreats in India (2026) — Himalayan Silence & Depth'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the best meditation retreat in India for beginners?',
    answer:
      'Chakrata is the best starting point for beginners. At 2,000 metres in a dense Himalayan forest, it provides natural silence without extreme conditions. Sessions are guided, groups are small (maximum 12), and the location is accessible from Dehradun — no flights or difficult mountain roads required. Rishikesh is also excellent for beginners who prefer a more structured, ashram-style environment.',
  },
  {
    question: 'Which is deeper — Zanskar or Rishikesh for meditation?',
    answer:
      'Zanskar offers deeper immersion for experienced practitioners. At 3,500 metres with century-old monasteries and no phone signal, the environment itself strips away distraction. Rishikesh offers depth through lineage — living ashram traditions, experienced teachers, and the energy of the Ganges. Choose Zanskar for radical separation from the world. Choose Rishikesh for spiritual tradition with more infrastructure.',
  },
  {
    question: 'How long should a meditation retreat be?',
    answer:
      'Three days is a meaningful reset — enough to taste genuine silence. Five to seven days allows your mind to settle beneath habitual patterns and experience real depth. Ten days or more is standard for Vipassana-style silent retreats. For Zanskar, we recommend a minimum of seven days because two days are spent in transit — the remoteness is the medicine, but it requires commitment.',
  },
  {
    question: 'Do I need meditation experience before attending?',
    answer:
      'No prior experience is required for our Chakrata and Rishikesh retreats. Guided instruction covers foundational techniques. For Zanskar retreats, some prior meditation experience is recommended — the altitude and remoteness amplify everything, and having a basic practice helps you meet those conditions skillfully.',
  },
  {
    question: 'What makes Himalayan meditation retreats different from Goa or Kerala?',
    answer:
      'The Himalayas offer altitude, silence, and remoteness that coastal retreat centres cannot replicate. At elevation, reduced oxygen naturally slows the thinking mind. Mountain forests and valleys absorb sonic distraction. The distance from civilisation removes habitual cues. Goa and Kerala are warm, comfortable, and more accessible — but they are also busier, flatter, and closer to tourism infrastructure. If your meditation needs environmental support, the Himalayas are categorically more effective.',
  },
  {
    question: 'Can I combine a meditation retreat with trekking?',
    answer:
      'Yes — and this combination is particularly effective. Walking in mountains becomes a form of moving meditation. In Zanskar, treks pass through river gorges and ancient monasteries. In Chakrata, forest walks are part of the program. In Sankri, multi-day treks can be combined with base-camp meditation sessions. The body and the mind work together when the land demands it.',
  },
];

export default function BestMeditationRetreatsInIndiaPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'Best Meditation Retreats in India', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Meditation Retreats in India',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: 5,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Monastery Meditation in Zanskar',
        url: buildCanonicalUrl('/locations/zanskar'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Forest Silence Meditation in Chakrata',
        url: buildCanonicalUrl('/locations/chakrata'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Ganges-Side Meditation in Rishikesh',
        url: buildCanonicalUrl('/locations/rishikesh'),
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Alpine Meditation in Munsiyari',
        url: buildCanonicalUrl('/locations/munsiyari'),
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Silent Meditation Retreat in Sankri',
        url: buildCanonicalUrl('/locations/sankri'),
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Best Meditation Retreats in India (2026 Guide)',
    description:
      'Compare the best meditation retreats in India — ranked by depth, environment, and suitability.',
    url: canonicalUrl,
    isPartOf: { '@id': schemaIds.website },
    about: { '@type': 'Thing', name: 'Meditation retreats in India' },
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Best Meditation Retreats in India (2026) — Himalayan Silence & Depth"
        description="Compare the best meditation retreats in India — from monastery immersion in Zanskar to forest silence in Chakrata and Ganges-side practice in Rishikesh."
        path={PATH}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, itemListSchema, webPageSchema]) }}
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
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } }

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

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-card-link { text-decoration: none; display: block; height: 100%; }
        .med-card-link .med-card { height: 100%; display: flex; flex-direction: column; }

        .med-table-wrap { overflow-x: auto; border-radius: 18px; border: 1px solid rgba(15,118,110,0.12); }
        .med-table { width: 100%; border-collapse: collapse; font-family: var(--font-inter), sans-serif; font-size: 0.88rem; }
        .med-table th { text-align: left; padding: 0.85rem 1rem; background: #f7f9f7; border-bottom: 2px solid #0f766e; font-weight: 600; color: #2B2A26; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; }
        .med-table td { padding: 0.85rem 1rem; border-bottom: 1px solid rgba(15,118,110,0.08); color: #4b5259; }
        .med-table tr:last-child td { border-bottom: none; }
        .med-table tr:hover td { background: #f7f9f7; }

        .med-location-item { padding: 1.25rem; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; background: #fff; }
        .med-location-item .med-h3 { font-size: 1.05rem; margin-bottom: 0.35rem; }
        .med-location-item .med-h3 a { color: #0f766e; text-decoration: none; }
        .med-location-item .med-h3 a:hover { text-decoration: underline; }
        .med-location-item .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-location-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-location-grid { grid-template-columns: 1fr; } }

        .med-cta-small { padding: 0.7rem 1.2rem; font-size: 0.7rem; }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-retreat-item { margin-bottom: 2rem; }
        .med-retreat-item:last-child { margin-bottom: 0; }
        .med-retreat-item .med-h3 { font-size: 1.1rem; margin-bottom: 0.5rem; }
        .med-retreat-item .med-body { margin-bottom: 0.5rem; }
        .med-retreat-item .med-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem; }
        .med-retreat-item .med-tags .med-season-tag { margin-bottom: 0; }
        .med-retreat-item .med-links { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; }
        .med-retreat-item .med-links a { color: #0f766e; font-weight: 500; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.88rem; }
        .med-retreat-item .med-links a:hover { text-decoration: underline; }

        .med-comparison-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-comparison-grid { grid-template-columns: 1fr; } }

        .med-comparison-card { padding: 1.5rem; }
        .med-comparison-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-comparison-card .med-body { font-size: 0.9rem; margin-bottom: 0; }

        .med-accent-card { border-left: 3px solid #0f766e; }
      `}</style>

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Meditation Retreats', href: '/meditation-retreats' },
          { name: 'Best Meditation Retreats in India' },
        ]}
      />

      <article>
        {/* ── HERO ── */}
        <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <img className="med-hero-bg" src="/Images/experience-hubs/meditation-hero.webp" alt="Best meditation retreats in India" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
          </div>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Meditation Guide &middot; 2026</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
              Best Meditation Retreats in India: <span style={{ color: '#5eead4' }}>Himalayan Silence &amp; Depth</span>
            </h1>
            <p style={{ maxWidth: '40rem', margin: '0 auto 1.5rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
              India offers more meditation retreat options than any country on earth — but most are in warm, accessible coastal locations designed for comfort over depth. The Himalayas offer something fundamentally different: altitude that quiets the thinking mind, forests and valleys that absorb distraction, and a contemplative tradition predating written history.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/meditation-retreats" className="med-cta-btn">Explore meditation retreats</Link>
              <a href="#comparison-table" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Compare locations</a>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Meditation Retreat"
          subtext="Not sure which setting suits your practice? We can help you choose."
          vertical="retreat"
          category="best-meditation"
          sourcePath={PATH}
        />

        {/* ── COMPARISON TABLE ── */}
        <section id="comparison-table" className="med-shell med-section-white" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Quick Comparison</span>
            </div>
            <h2 className="med-h2">Best Meditation Retreats <span>by Setting</span></h2>

            <div className="med-table-wrap">
              <table className="med-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Location</th>
                    <th>Style</th>
                    <th>Altitude</th>
                    <th>Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rank: 1, name: 'Zanskar', id: 'zanskar', style: 'Monastery immersion', alt: '3,500m', best: 'Deep practitioners, radical disconnection' },
                    { rank: 2, name: 'Chakrata', id: 'chakrata', style: 'Forest silence', alt: '2,000m', best: 'Beginners, accessible depth' },
                    { rank: 3, name: 'Rishikesh', id: 'rishikesh', style: 'Ashram tradition', alt: '372m', best: 'Spiritual lineage, teacher access' },
                    { rank: 4, name: 'Munsiyari', id: 'munsiyari', style: 'Alpine contemplation', alt: '2,200m', best: 'Peak views, spacious silence' },
                    { rank: 5, name: 'Sankri', id: 'sankri', style: 'Trek + meditation', alt: '1,920m', best: 'Movement integration, forest depth' },
                  ].map((row) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 600 }}>{row.rank}</td>
                      <td><Link href={`/locations/${row.id}`} style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>{row.name}</Link></td>
                      <td>{row.style}</td>
                      <td>{row.alt}</td>
                      <td>{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── RETREAT DETAILS ── */}
        <section className="med-shell med-section-alt" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Retreat Details</span>
            </div>
            <h2 className="med-h2">Top Meditation Retreats <span>in India</span></h2>

            {/* 1. Zanskar */}
            <div className="med-retreat-item">
              <h3 className="med-h3">1. Zanskar — Monastery Meditation at 3,500 Metres</h3>
              <p className="med-body">Zanskar is the deepest meditation environment we offer. A high-altitude river valley in Ladakh, sealed by mountains, 230 km from Leh. The monasteries — Phugtal clinging to a cliff face, Karsha overlooking the valley, Stongde on its ridge — carry over a thousand years of Buddhist contemplative practice.</p>
              <p className="med-body">At 3,500 metres, the reduced oxygen naturally slows the thinking mind. The isolation strips away every familiar cue. Phone signal is intermittent to absent. The land itself becomes the meditation teacher — ancient rock, deep silence, vast sky.</p>
              <div className="med-tags">
                <span className="med-season-tag">Best for: experienced meditators</span>
                <span className="med-season-tag">Season: Jun–Sep</span>
                <span className="med-season-tag">Duration: 7+ days</span>
                <span className="med-season-tag">Group: max 12</span>
              </div>
              <div className="med-links">
                <Link href="/locations/zanskar">Explore Zanskar →</Link>
                <Link href="/retreats/zanskar">Zanskar retreats →</Link>
              </div>
            </div>

            {/* 2. Chakrata */}
            <div className="med-retreat-item">
              <h3 className="med-h3">2. Chakrata — Forest Silence at 2,000 Metres</h3>
              <p className="med-body">Chakrata is the most accessible deep-silence location in the Indian Himalayas. Dense deodar and oak forest creates a natural acoustic enclosure — no tourist noise, no traffic, no temple bells. Just birdsong, wind, and the occasional sound of a village going about its life.</p>
              <p className="med-body">Two thousand metres of altitude gently reduces mental pace without causing altitude discomfort. The town is 60 km from Dehradun — reachable by car in 2.5 hours. This accessibility makes Chakrata ideal for first-time meditation retreatants who want genuine silence without extreme logistics.</p>
              <div className="med-tags">
                <span className="med-season-tag">Best for: beginners, weekend retreats</span>
                <span className="med-season-tag">Season: Year-round</span>
                <span className="med-season-tag">Duration: 3–7 days</span>
                <span className="med-season-tag">Group: max 12</span>
              </div>
              <div className="med-links">
                <Link href="/locations/chakrata">Explore Chakrata →</Link>
                <Link href="/retreats/chakrata">Chakrata retreats →</Link>
              </div>
            </div>

            <PrimaryCTA
              label="Help Me Choose a Location"
              subtext="Tell us your experience level and intention — we'll recommend the right setting."
              vertical="retreat"
              category="best-meditation"
              sourcePath={PATH}
            />

            {/* 3. Rishikesh */}
            <div className="med-retreat-item">
              <h3 className="med-h3">3. Rishikesh — Ganges Tradition</h3>
              <p className="med-body">Rishikesh is India's yoga and spiritual capital — a place where meditation is not an imported wellness concept but a lived, daily practice. Morning aarti on the Ganges, ashram bells, the hum of practice in every direction. The spiritual weight of this place is accumulated over centuries.</p>
              <p className="med-body">The meditation experience here is different from mountain locations — less isolated, more embedded in tradition. You meditate alongside a river that carries spiritual significance for a billion people. The teachers have lineage, not just certification.</p>
              <div className="med-tags">
                <span className="med-season-tag">Best for: tradition, teacher access</span>
                <span className="med-season-tag">Season: Oct–Mar</span>
                <span className="med-season-tag">Duration: 5–14 days</span>
                <span className="med-season-tag">Group: max 12</span>
              </div>
              <div className="med-links">
                <Link href="/locations/rishikesh">Explore Rishikesh →</Link>
                <Link href="/retreats/rishikesh">Rishikesh retreats →</Link>
              </div>
            </div>

            {/* 4. Munsiyari */}
            <div className="med-retreat-item">
              <h3 className="med-h3">4. Munsiyari — Alpine Contemplation</h3>
              <p className="med-body">Munsiyari sits at 2,200 metres facing the Panchachuli peaks — five summits rising above 6,000 metres. The meditation experience here is defined by spaciousness: open sky, vast mountain views, and the kind of silence that comes from being far above the treeline with very few other humans in sight.</p>
              <div className="med-tags">
                <span className="med-season-tag">Best for: perspective, spacious stillness</span>
                <span className="med-season-tag">Season: Apr–Jun, Sep–Nov</span>
                <span className="med-season-tag">Duration: 5–7 days</span>
                <span className="med-season-tag">Group: max 12</span>
              </div>
              <div className="med-links">
                <Link href="/locations/munsiyari">Explore Munsiyari →</Link>
                <Link href="/retreats/munsiyari">Munsiyari retreats →</Link>
              </div>
            </div>

            {/* 5. Sankri */}
            <div className="med-retreat-item" style={{ marginBottom: 0 }}>
              <h3 className="med-h3">5. Sankri — Trek &amp; Meditation Integration</h3>
              <p className="med-body">Sankri is a remote Himalayan basecamp — the launching point for Kedarkantha, Har Ki Dun, and other classic treks. Meditation here is not separate from movement; it is integrated with it. Walk through forests of oak and rhododendron, sit at camp, and let the body's exertion become the preparation for stillness.</p>
              <div className="med-tags">
                <span className="med-season-tag">Best for: trek + meditation</span>
                <span className="med-season-tag">Season: Mar–Jun, Sep–Nov</span>
                <span className="med-season-tag">Duration: 5–10 days</span>
                <span className="med-season-tag">Group: max 12</span>
              </div>
              <div className="med-links">
                <Link href="/locations/sankri">Explore Sankri →</Link>
                <Link href="/retreats/sankri">Sankri retreats →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── MOUNTAIN VS COAST VS ASHRAM ── */}
        <section className="med-shell med-section-white" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Environment Comparison</span>
            </div>
            <h2 className="med-h2">Himalayan Retreats vs. Coastal <span>&amp; Ashram Settings</span></h2>

            <div className="med-comparison-grid" style={{ marginTop: '1.8rem' }}>
              <div className="med-card med-comparison-card med-accent-card">
                <h3 className="med-h3">Himalayan Mountain</h3>
                <p className="med-body">Use altitude, remoteness, and natural silence as active elements. At 2,000–3,500 metres, reduced oxygen gently quiets mental chatter. Dense forests absorb ambient sound. The absence of phone signal removes habitual triggers. The land does half the work.</p>
              </div>
              <div className="med-card med-comparison-card">
                <h3 className="med-h3">Coastal Retreats</h3>
                <p className="med-body">Goa, Kerala, parts of Karnataka — offer warmth, comfort, and accessibility. However, they are at sea level (no altitude benefit), near tourist infrastructure (more noise), and in tropical heat (can make long sitting uncomfortable). Better for yoga breaks than deep silence.</p>
              </div>
              <div className="med-card med-comparison-card">
                <h3 className="med-h3">Ashram Retreats</h3>
                <p className="med-body">Rishikesh, Varanasi, South India — offer spiritual lineage and community. Embedded in living traditions: daily rituals, chanting, teacher-student relationships extending back centuries. For philosophical grounding alongside technique, ashrams offer something mountains alone cannot.</p>
              </div>
            </div>

            <p className="med-body" style={{ marginTop: '1.5rem', marginBottom: 0 }}>
              Our network includes both Himalayan mountain settings (Zanskar, Chakrata, Munsiyari, Sankri) and ashram-influenced practice (Rishikesh), giving you access to both paradigms. See our <Link href="/how-to-choose-a-meditation-retreat" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>guide to choosing a meditation retreat</Link> for a structured decision framework.
            </p>
          </div>
        </section>

        {/* ── MEDITATION STYLES ── */}
        <section className="med-shell med-section-alt" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Practice Styles</span>
            </div>
            <h2 className="med-h2">Meditation Styles at <span>Indian Retreats</span></h2>

            <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
              <div className="med-card" style={{ padding: '1.5rem' }}>
                <h3 className="med-h3">Vipassana</h3>
                <p className="med-body" style={{ fontSize: '0.9rem' }}>Insight meditation using systematic body scanning. Sessions are long (one hour or more), in complete silence, with minimal teacher interaction. Demands discipline and rewards persistence. Available across India, but Himalayan environment — particularly Zanskar — amplifies its effect.</p>
              </div>
              <div className="med-card" style={{ padding: '1.5rem' }}>
                <h3 className="med-h3">Guided Mindfulness</h3>
                <p className="med-body" style={{ fontSize: '0.9rem' }}>Uses verbal instruction to direct attention — to the breath, body sensations, sounds, or thoughts. Most accessible for beginners. Forms the foundation of our <Link href="/3-day-meditation-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>3-day retreats</Link>. Reduces the anxiety of "not knowing what to do."</p>
              </div>
              <div className="med-card" style={{ padding: '1.5rem' }}>
                <h3 className="med-h3">Yogic Meditation (Dhyana)</h3>
                <p className="med-body" style={{ fontSize: '0.9rem' }}>Follows the Patanjali tradition, integrated with physical yoga practice. Pranayama (breathwork) and asana prepare the body; meditation follows as the natural extension. Particularly strong in Rishikesh, where the <Link href="/yoga-retreats" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>yoga tradition</Link> provides both technique and philosophical framework.</p>
              </div>
              <div className="med-card" style={{ padding: '1.5rem' }}>
                <h3 className="med-h3">Walking &amp; Movement</h3>
                <p className="med-body" style={{ fontSize: '0.9rem' }}>Integrates awareness practice with physical movement — forest walks, mountain traverses, or structured kinhin. Central to our <Link href="/meditation-retreat-and-trek" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>trek-and-meditate programmes</Link>. Ideal for people who find extended sitting uncomfortable.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── RETREAT LENGTH GUIDE ── */}
        <section className="med-shell med-section-white" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Duration Guide</span>
            </div>
            <h2 className="med-h2">How Long Should a <span>Meditation Retreat</span> Be?</h2>

            <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
              <div className="med-card" style={{ padding: '1.5rem' }}>
                <span className="med-season-tag">Weekend</span>
                <h3 className="med-h3">3 Days</h3>
                <p className="med-body" style={{ fontSize: '0.88rem' }}>Enough to break the rhythm of daily life and experience a genuine shift in mental pace. First day is decompression; second day is where silence begins to work; third day consolidates. Ideal for first-timers, busy professionals, or testing whether extended practice is right for you.</p>
                <Link href="/3-day-meditation-retreat" className="med-cta-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.65rem', marginTop: '1rem', display: 'inline-flex' }}>Explore 3-day retreat →</Link>
              </div>
              <div className="med-card" style={{ padding: '1.5rem' }}>
                <span className="med-season-tag">Sweet Spot</span>
                <h3 className="med-h3">5–7 Days</h3>
                <p className="med-body" style={{ fontSize: '0.88rem' }}>The minimum duration for real depth. By day three or four, the habitual mind runs out of familiar narratives and begins to settle. Five to seven days allows time for the nervous system to downregulate, for sleep to deepen, and for insight to arise naturally.</p>
                <Link href="/7-day-meditation-retreat" className="med-cta-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.65rem', marginTop: '1rem', display: 'inline-flex' }}>Explore 7-day retreat →</Link>
              </div>
              <div className="med-card" style={{ padding: '1.5rem' }}>
                <span className="med-season-tag">Deep Immersion</span>
                <h3 className="med-h3">10+ Days</h3>
                <p className="med-body" style={{ fontSize: '0.88rem' }}>Traditional duration for Vipassana and deep silent retreats. Provides enough time for practice to work through layers of resistance, distraction, and emotional processing. Most participants describe a qualitative shift around day six or seven.</p>
                <Link href="/10-day-silent-retreat" className="med-cta-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.65rem', marginTop: '1rem', display: 'inline-flex' }}>Explore 10-day retreat →</Link>
              </div>
            </div>

            <div className="med-card med-accent-card" style={{ padding: '1.25rem 1.5rem', marginTop: '1.4rem' }}>
              <p className="med-body" style={{ marginBottom: 0 }}><strong>If you are unsure about duration, start shorter.</strong> A powerful 3-day experience in Chakrata often leads to a 7-day return visit — and eventually to Zanskar. The journey builds on itself.</p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Find the Right Duration for Me"
          subtext="Not sure about length or location? We'll match your schedule and intention to the right programme."
          vertical="retreat"
          category="best-meditation"
          sourcePath={PATH}
        />

        {/* ── HOW TO CHOOSE ── */}
        <section className="med-shell med-section-alt" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Decision Guide</span>
            </div>
            <h2 className="med-h2">How to Choose the Right <span>Meditation Retreat</span></h2>
            <p className="med-body">The "best" meditation retreat depends on three factors:</p>
            <ul className="med-list" style={{ marginBottom: '1rem' }}>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Experience level:</strong> beginners start at Chakrata or Rishikesh; experienced practitioners choose Zanskar or Munsiyari.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Desired depth:</strong> for a reset, 3 days in Chakrata. For transformation, 7+ days in Zanskar.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Relationship with movement:</strong> if you need body and mind together, Sankri integrates trekking with meditation.</span>
              </li>
            </ul>
            <p className="med-body">
              See our <Link href="/meditation-retreats" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>meditation retreats overview</Link> for detailed descriptions of each format, or explore all <Link href="/locations" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>Himalayan locations</Link> in our network.
            </p>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Meditation Retreat"
          subtext="Describe what you're seeking — a mountain planner will recommend the right location."
          vertical="retreat"
          category="best-meditation"
          sourcePath={PATH}
        />

        {/* ── FEATURED RETREAT ── */}
        <FeaturedRetreat
          title="7-Day Meditation Retreat in Zanskar Valley"
          description="Monastery immersion at 3,500 metres. The deepest silent retreat in India — for those ready for radical separation from the ordinary."
          links={[
            { label: 'Explore Zanskar', href: '/locations/zanskar' },
            { label: 'View all programmes', href: '/retreat-programs' },
            { label: 'See upcoming dates', href: '/retreat-calendar' },
          ]}
        />

        {/* ── FAQ ── */}
        <section className="med-shell med-section-white" style={{ padding: '4.5rem 0' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Common Questions</span>
            </div>
            <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
            <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
          </div>
        </section>

        <RelatedReads
          links={[
            { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
            { label: 'Is a Meditation Retreat Worth It?', href: '/is-a-meditation-retreat-worth-it' },
            { label: 'Why People Go to Meditation Retreats', href: '/why-people-go-to-meditation-retreats' },
            { label: 'My 7-Day Meditation Retreat in Zanskar', href: '/my-7-day-meditation-retreat-in-zanskar' },
          ]}
        />

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-alt" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/meditation-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Meditation Retreats</span>
              </Link>
              <Link href="/retreats/himalayan-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Himalayan Retreats Guide</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/retreats/retreat-cost-india" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreat Costs</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/find-your-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Find Your Retreat</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
            </div>
          </div>
        </nav>
      </article>
    </TrackedPage>
  );
}
