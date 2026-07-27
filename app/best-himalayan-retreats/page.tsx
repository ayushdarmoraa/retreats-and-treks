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
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/best-himalayan-retreats';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Himalayan Retreats | Retreats And Treks',
    description:
      'Compare the best Himalayan retreats by purpose, setting, depth, group size, and accessibility — yoga, silence, meditation, and burnout recovery options.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Best Himalayan Retreats (2026) — Yoga, Meditation, Wellness & Silent Retreat Picks',
      description:
        'The best Himalayan retreats compared by purpose — ranked for depth, environment, group size, and accessibility.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Best Himalayan Retreats (2026) — Yoga, Meditation, Wellness & Silent Retreat Picks'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the best Himalayan retreat for first-timers?',
    answer:
      'Chakrata is the best entry point for first-time retreatants. It is accessible from Dehradun (2.5 hours by car), offers natural Himalayan silence at 2,000 metres, and does not require prior yoga or meditation experience. Groups are small (maximum 12), programs are guided, and the forest environment is gentle rather than extreme. For those wanting a structured yoga experience, Rishikesh is also excellent for beginners.',
  },
  {
    question: 'Which Himalayan retreat is most remote?',
    answer:
      'Zanskar in Ladakh is the most remote location — 230 km from Leh through mountain passes, in a high-altitude valley at 3,500 metres. The road is open only from June to November. Phone signal is intermittent. This remoteness is the primary therapeutic intervention — when every familiar cue is stripped away, genuine recalibration begins. Only recommended for those prepared for basic accommodation and physical challenge.',
  },
  {
    question: 'Are Himalayan retreats safe for solo women travellers?',
    answer:
      'Yes. All our retreats operate with experienced guides, small groups (maximum 12), and known accommodation partners. Chakrata and Rishikesh are the most infrastructure-rich locations. For remote locations like Zanskar and Munsiyari, we provide full logistics — transport, accommodation, and guided programs. Solo women travellers make up a significant portion of our retreat participants.',
  },
  {
    question: 'What is the best time of year for a Himalayan retreat?',
    answer:
      'March to June and September to November are the best windows for most locations. Summers (April–June) are ideal for Munsiyari and Sankri where temperatures stay pleasant while the plains are hot. September–October offers the clearest skies across all locations. Winter (November–February) is best for Rishikesh and those seeking snow silence in Chakrata. Zanskar is accessible June–September only (unless you are doing the Chadar winter trek).',
  },
  {
    question: 'How much does a Himalayan retreat cost?',
    answer:
      'Our retreats range from weekend programs (2–3 days) to immersive journeys (7–14 days). Pricing depends on location, duration, and group size. Accessible locations like Chakrata are more affordable. Remote locations like Zanskar involve higher logistics costs. All retreats include accommodation, meals, guided programs, and local transport. Contact us for current pricing based on your preferred dates and format.',
  },
  {
    question: 'Can I combine a retreat with trekking?',
    answer:
      'Yes — and this is one of the most powerful combinations we offer. Sankri, Zanskar, Munsiyari, and Chakrata all support trek-retreat combinations where you walk in the mountains as part of the retreat pattern. Physical movement in nature prepares the body for stillness and creates a deeper overall experience. See our experience pages for meditation, yoga, and burnout recovery retreats that integrate trekking.',
  },
];

export default function BestHimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Best Himalayan Retreats', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Himalayan Retreats by Category',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: 6,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
      { '@type': 'ListItem', position: 2, name: 'Silent Retreats', url: buildCanonicalUrl('/silent-retreats') },
      { '@type': 'ListItem', position: 3, name: 'Yoga Retreats', url: buildCanonicalUrl('/yoga-retreats') },
      { '@type': 'ListItem', position: 4, name: 'Burnout Recovery Retreats', url: buildCanonicalUrl('/burnout-recovery-retreats') },
      { '@type': 'ListItem', position: 5, name: 'Spiritual Retreats', url: buildCanonicalUrl('/spiritual-retreats') },
      { '@type': 'ListItem', position: 6, name: 'All Locations', url: buildCanonicalUrl('/locations') },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Best Himalayan Retreats (2026)',
    description:
      'The best Himalayan retreats compared by purpose — yoga, meditation, silence, burnout recovery, and spiritual immersion.',
    url: canonicalUrl,
    isPartOf: { '@id': schemaIds.website },
    about: { '@type': 'Thing', name: 'Himalayan wellness retreats' },
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Best Himalayan Retreats (2026) — Yoga, Meditation, Wellness & Silent Retreat Picks"
        description="The best Himalayan retreats compared by purpose — ranked for depth, environment, group size, and accessibility."
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
        .med-table .med-highlight { color: #0f766e; font-weight: 600; }

        .med-location-item { padding: 1.25rem; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; background: #fff; }
        .med-location-item .med-h3 { font-size: 1.05rem; margin-bottom: 0.35rem; }
        .med-location-item .med-h3 a { color: #0f766e; text-decoration: none; }
        .med-location-item .med-h3 a:hover { text-decoration: underline; }
        .med-location-item .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-location-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-location-grid { grid-template-columns: 1fr; } }

        .med-cta-small { padding: 0.7rem 1.2rem; font-size: 0.7rem; }

        .med-accent-card { border-left: 3px solid #0f766e; }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-purpose-item { margin-bottom: 1.5rem; }
        .med-purpose-item .med-h3 { font-size: 1.1rem; margin-bottom: 0.5rem; }
        .med-purpose-item .med-body { margin-bottom: 0.5rem; }
        .med-purpose-item .med-links { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; }
        .med-purpose-item .med-links a { color: #0f766e; font-weight: 500; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.88rem; }
        .med-purpose-item .med-links a:hover { text-decoration: underline; }
      `}</style>

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Best Himalayan Retreats' },
        ]}
      />

      <article>
        {/* ── HERO ── */}
        <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <img className="med-hero-bg" src="/Images/hero/himalayan-sunrise.webp" alt="Best Himalayan retreats" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
          </div>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Retreat Guide &middot; 2026</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
              Best Himalayan Retreats: Mountain Wellness <span style={{ color: '#5eead4' }}>Ranked by Purpose</span>
            </h1>
            <p style={{ maxWidth: '40rem', margin: '0 auto 1.5rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
              The Himalayas are the original retreat landscape. For thousands of years, people have gone to these mountains to meditate, heal, and recalibrate. Not because it was trendy, but because altitude, silence, and remoteness do something to the human nervous system that no urban wellness centre can replicate.
            </p>
            <p style={{ maxWidth: '40rem', margin: '0 auto', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
              This guide compares the best Himalayan retreats by purpose — not by price or luxury, but by what each location and format actually does for the people who go there.
            </p>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Himalayan Retreat"
          subtext="Tell us what you're seeking and we'll recommend the right location and format."
          vertical="retreat"
          category="best-himalayan"
          sourcePath={PATH}
        />

        {/* ── COMPARISON TABLE ── */}
        <section className="med-shell med-section-white" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Quick Comparison</span>
            </div>
            <h2 className="med-h2">Best Retreats by <span>Category</span></h2>

            <div className="med-table-wrap">
              <table className="med-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Top Location</th>
                    <th>Why</th>
                    <th>Best Season</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { cat: 'Meditation', catLink: '/meditation-retreats', loc: 'Zanskar', locLink: '/locations/zanskar', why: 'Monastery silence, 3,500m altitude', season: 'Jun–Sep' },
                    { cat: 'Silent Retreat', catLink: '/silent-retreats', loc: 'Chakrata', locLink: '/locations/chakrata', why: 'Forest acoustic enclosure, accessible', season: 'Year-round' },
                    { cat: 'Yoga', catLink: '/yoga-retreats', loc: 'Rishikesh', locLink: '/locations/rishikesh', why: 'Living tradition, Ganges energy', season: 'Oct–Mar' },
                    { cat: 'Burnout Recovery', catLink: '/burnout-recovery-retreats', loc: 'Chakrata', locLink: '/locations/chakrata', why: 'Gentle altitude, genuine separation', season: 'Sep–Oct' },
                    { cat: 'Spiritual', catLink: '/spiritual-retreats', loc: 'Rishikesh', locLink: '/locations/rishikesh', why: 'Millennia of accumulated practice', season: 'Oct–Mar' },
                    { cat: 'Trek + Retreat', catLink: '/locations/sankri', loc: 'Sankri', locLink: '/locations/sankri', why: 'Mountain movement integration', season: 'Mar–Jun, Sep–Nov' },
                  ].map((row) => (
                    <tr key={row.cat}>
                      <td><Link href={row.catLink} style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>{row.cat}</Link></td>
                      <td><Link href={row.locLink} style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>{row.loc}</Link></td>
                      <td>{row.why}</td>
                      <td>{row.season}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── BY PURPOSE ── */}
        <section className="med-shell med-section-alt" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">By Purpose</span>
            </div>
            <h2 className="med-h2">Best Himalayan Retreats <span>by Purpose</span></h2>

            <div className="med-purpose-item">
              <h3 className="med-h3">Meditation &amp; Silence</h3>
              <p className="med-body">For pure meditation depth, Zanskar is unmatched — monastery lineage, extreme remoteness, and altitude that naturally quiets the mind. Chakrata offers the most accessible silence: dense forest with no tourist noise, 2.5 hours from Dehradun. Rishikesh provides meditation within a living spiritual tradition on the Ganges.</p>
              <div className="med-links">
                <Link href="/meditation-retreats">Meditation retreats →</Link>
                <Link href="/silent-retreats">Silent retreats →</Link>
                <Link href="/best-meditation-retreats-in-india">Best meditation retreats in India →</Link>
              </div>
            </div>

            <div className="med-purpose-item">
              <h3 className="med-h3">Yoga &amp; Movement</h3>
              <p className="med-body">Rishikesh is the natural home of yoga in India — ashram tradition, experienced teachers, and Ganges-side practice. For altitude yoga that demands conscious breathing, Zanskar at 3,500 metres transforms every pose. Sankri combines yoga with mountain trekking for those who want body and mind fully engaged.</p>
              <div className="med-links">
                <Link href="/yoga-retreats">Yoga retreats →</Link>
              </div>
            </div>

            <div className="med-purpose-item">
              <h3 className="med-h3">Burnout Recovery</h3>
              <p className="med-body">Burnout needs genuine stopping — not another optimisation. Chakrata offers accessible recovery in forest silence. Zanskar offers radical reset through extreme remoteness. Munsiyari provides perspective through alpine grandeur. Sankri adds physical release through gentle trekking.</p>
              <div className="med-links">
                <Link href="/burnout-recovery-retreats">Burnout recovery retreats →</Link>
              </div>
            </div>

            <div className="med-purpose-item" style={{ marginBottom: 0 }}>
              <h3 className="med-h3">Spiritual Immersion</h3>
              <p className="med-body">Rishikesh carries the weight of India's living spiritual tradition. Zanskar offers Buddhist monastic immersion dating to the 12th century. Chakrata provides nature-based spirituality — the forest itself as teacher. Each serves a different spiritual orientation.</p>
              <div className="med-links">
                <Link href="/spiritual-retreats">Spiritual retreats →</Link>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Help Me Choose"
          subtext="Describe what you need and we'll match you to the right retreat and location."
          vertical="retreat"
          category="best-himalayan"
          sourcePath={PATH}
        />

        {/* ── BY LOCATION ── */}
        <section className="med-shell med-section-white" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">By Location</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>Best Himalayan Retreat <span>Locations</span></h2>

            <div className="med-location-grid" style={{ marginTop: '1.8rem' }}>
              {[
                { id: 'zanskar', name: 'Zanskar, Ladakh', desc: 'The most remote and immersive. Monastery meditation, high-altitude silence, radical disconnection. 3,500m.' },
                { id: 'chakrata', name: 'Chakrata, Uttarakhand', desc: 'Accessible forest silence. Beginners and burnout recovery. Dense deodar forest at 2,000m, 2.5 hours from Dehradun.' },
                { id: 'rishikesh', name: 'Rishikesh, Uttarakhand', desc: 'India\'s yoga capital. Spiritual tradition, ashram culture, Ganges-side practice. Year-round.' },
                { id: 'munsiyari', name: 'Munsiyari, Uttarakhand', desc: 'Alpine grandeur facing Panchachuli peaks. Spacious silence and perspective. 2,200m.' },
                { id: 'sankri', name: 'Sankri, Uttarakhand', desc: 'Remote basecamp for trek-retreat combinations. Mountain movement and forest depth. 1,920m.' },
              ].map((loc) => (
                <div key={loc.id} className="med-card med-location-item">
                  <h3 className="med-h3"><Link href={`/locations/${loc.id}`}>{loc.name}</Link></h3>
                  <p className="med-body">{loc.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link href="/locations" className="med-cta-outline med-cta-small">View all locations →</Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="med-shell med-section-alt" style={{ padding: '4.5rem 0' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Common Questions</span>
            </div>
            <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
            <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
          </div>
        </section>

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Retreats</span>
              </Link>
              <Link href="/retreats/himalayan-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Himalayan Retreats Guide</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/locations" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Locations</span>
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