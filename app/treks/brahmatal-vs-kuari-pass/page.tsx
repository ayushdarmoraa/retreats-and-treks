import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/treks/brahmatal-vs-kuari-pass';

export function generateMetadata(): Metadata {
  return {
    title: 'Brahmatal vs Kuari Pass (3,850m vs 3,876m) — Which Moderate Garhwal Trek? | Retreats And Treks',
    description:
      'Brahmatal (3,850m, 4 days, winter) vs Kuari Pass (3,876m, 5 days, spring). Side-by-side comparison of altitude, difficulty, views, season & cost for these two moderate Garhwal Himalaya treks.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Brahmatal vs Kuari Pass — Moderate Garhwal Trek Comparison',
      description:
        'Frozen lake vs panoramic ridge. Compare altitude, season, difficulty & views for the two best moderate treks in the Garhwal Himalayas.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is easier — Brahmatal or Kuari Pass?',
    answer:
      'Both are rated moderate difficulty. Brahmatal reaches 3,850 m over 4 days (22 km), while Kuari Pass reaches 3,876 m over 5 days (30 km). The altitude and difficulty are nearly identical. The main difference is duration — Kuari Pass covers more ground over an extra day, spreading the effort more evenly. Neither requires technical skills.',
  },
  {
    question: 'Can I do Brahmatal and Kuari Pass in one trip?',
    answer:
      'Not easily. Brahmatal is a winter trek (December–March) from Lohajung, while Kuari Pass is best in spring (March–May) or autumn (October–November) from Joshimath. The only overlap is March, when both are theoretically possible but the logistics (different base towns, 6+ hours apart by road) make back-to-back trips impractical. Most trekkers do them in separate trips.',
  },
  {
    question: 'Which trek has better views?',
    answer:
      'Kuari Pass is widely considered the better panoramic trek — the ridge walk offers near-continuous views of Nanda Devi, Dronagiri, Chaukhamba, and Kamet across multiple days. Brahmatal&apos;s views are concentrated around the summit ridge and lake campsite, with Trishul and Nanda Ghunti as the signature peaks. Kuari Pass wins on breadth of views; Brahmatal wins on the unique frozen lake experience.',
  },
  {
    question: 'Which is better for a first Garhwal trek?',
    answer:
      'Either works well as a first Garhwal experience. If you want a winter snow trek and enjoy camping by a frozen lake, choose Brahmatal. If you want the widest possible Himalayan panorama in comfortable spring or autumn weather, choose Kuari Pass. Both are well-supported by guided operators and suitable for first-time high-altitude trekkers with basic fitness.',
  },
  {
    question: 'How do I reach the starting points?',
    answer:
      'Brahmatal starts from Lohajung (10 hours from Rishikesh via Karnaprayag). Kuari Pass starts from Joshimath (9–10 hours from Rishikesh via Rudraprayag). Both are accessed by road from Rishikesh or Haridwar. Joshimath has better road infrastructure and more frequent bus services due to its position on the Badrinath pilgrim route.',
  },
];

export default function BrahmatalVsKuariPassPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Garhwal Himalayas', url: buildCanonicalUrl('/treks/garhwal-himalayas') },
    { name: 'Brahmatal vs Kuari Pass', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Treks', href: '/treks' },
          { name: 'Garhwal Himalayas', href: '/treks/garhwal-himalayas' },
          { name: 'Brahmatal vs Kuari Pass' },
        ]}
      />

      {/* INTENT TRAIL — discovery cluster reinforcement */}
      <nav aria-label="Discovery trail" className="bvk-trail">
        <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
          Best Treks in Uttarakhand
        </Link>
        {' → '}
        <Link href="/treks/best-treks-in-uttarakhand/beginner" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
          Beginner Treks
        </Link>
        {' → '}
        <span>Brahmatal vs Kuari Pass</span>
      </nav>

      <style>{`
        /* ── BVK scoped styles — prefix: bvk- ── */
        .bvk-trail { font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 300; color: #888; line-height: 1.6; margin-bottom: 0.75rem; }
        .bvk-body { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555555; margin: 0; }
        .bvk-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .bvk-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; display: inline-block; }
        .bvk-eyebrow-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--color-primary); font-weight: 500; opacity: 0.7; }

        /* Quick-pick cards */
        .bvk-pick { background: #fff; border: 1px solid #eef0ee; border-left: 3px solid var(--color-primary); border-radius: 10px; padding: 1rem 1.25rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; line-height: 1.85; color: #555; transition: box-shadow 0.2s ease; }
        .bvk-pick:hover { box-shadow: 0 4px 16px rgba(15,118,110,0.08); }
        .bvk-pick-label { font-size: 0.55rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-primary); opacity: 0.7; margin-bottom: 0.35rem; }

        /* Table */
        .bvk-table-wrap { overflow-x: auto; border: 1px solid #e5e7eb; border-radius: 10px; background: #ffffff; }
        .bvk-table { width: 100%; border-collapse: collapse; }
        .bvk-table thead tr { border-bottom: 2px solid #e5e7eb; }
        .bvk-table th { font-family: var(--font-geist-sans), sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-primary); opacity: 0.7; padding: 0.75rem 1rem; text-align: left; }
        .bvk-table td { font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 300; color: #444; padding: 0.75rem 1rem; border-bottom: 1px solid #f0f0f0; }
        .bvk-table td:first-child { font-weight: 500; color: #111; width: 25%; }
        .bvk-table tbody tr:last-child td { border-bottom: none; }
        .bvk-table tbody tr { transition: background 0.15s ease; }
        .bvk-table tbody tr:hover td { background: #f7f9f7; }

        /* Split cards */
        .bvk-split { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.75rem; }
        .bvk-split-card { background: #ffffff; border: 1px solid #eef0ee; border-top: 2px solid var(--color-primary); border-radius: 10px; padding: 1.25rem; transition: box-shadow 0.2s ease, transform 0.2s ease; }
        .bvk-split-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(15,118,110,0.09); }
        .bvk-split-card h3 { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 500; color: #111; margin: 0 0 0.75rem; letter-spacing: -0.01em; }
        .bvk-split-card p { font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 300; line-height: 1.85; color: #555; margin: 0 0 0.75rem; }
        .bvk-split-card p:last-child { margin-bottom: 0; }

        /* Season cards */
        .bvk-season { background: #fff; border: 1px solid #eef0ee; border-radius: 10px; padding: 1.25rem 1.5rem; margin-bottom: 1rem; transition: box-shadow 0.2s ease; }
        .bvk-season:hover { box-shadow: 0 4px 16px rgba(15,118,110,0.07); }
        .bvk-season:last-of-type { margin-bottom: 0; }
        .bvk-season-label { font-family: var(--font-geist-sans), sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-primary); opacity: 0.7; margin-bottom: 0.5rem; }
        .bvk-season p { font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; margin: 0; }

        /* Inline callout */
        .bvk-callout { background: #f7f9f7; border: 1px solid #e5e7eb; border-left: 3px solid var(--color-primary); border-radius: 10px; padding: 1rem 1.25rem; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.85; color: #555; margin-bottom: 1rem; }
        .bvk-callout strong { font-weight: 500; color: #111; }

        /* Choose-if grid */
        .bvk-choose-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.75rem; }
        .bvk-choose-card { background: #ffffff; border: 1px solid #eef0ee; border-top: 2px solid var(--color-primary); border-radius: 10px; padding: 1.25rem; }
        .bvk-choose-card h3 { font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 600; color: #111; margin: 0 0 0.85rem; letter-spacing: -0.01em; }
        .bvk-choose-card ul { margin: 0; padding: 0; list-style: none; }
        .bvk-choose-card ul li { font-family: var(--font-geist-sans), sans-serif; font-size: 0.84rem; font-weight: 300; line-height: 1.85; color: #555; padding: 0.2rem 0 0.2rem 1.1rem; position: relative; border-bottom: 1px solid #f7f9f7; }
        .bvk-choose-card ul li:last-child { border-bottom: none; }
        .bvk-choose-card ul li::before { content: '→'; position: absolute; left: 0; color: var(--color-primary); opacity: 0.5; font-size: 0.75rem; }

        /* Nav */
        .bvk-nav-link { display: flex; align-items: center; justify-content: space-between; padding: 0.9rem 1.1rem; border-bottom: 1px solid #f0f0f0; font-family: var(--font-geist-sans), sans-serif; font-size: 0.88rem; font-weight: 300; color: #333; text-decoration: none; transition: background 0.15s ease, color 0.15s ease; }
        .bvk-nav-link:hover { background: #f7f9f7; color: var(--color-primary); }
        .bvk-nav-link::after { content: '→'; color: var(--color-primary); opacity: 0.5; }
        .bvk-nav-group { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
        .bvk-nav-group .bvk-nav-link:last-child { border-bottom: none; }

        @media (max-width: 700px) {
          .bvk-split { grid-template-columns: 1fr; }
          .bvk-choose-grid { grid-template-columns: 1fr; }
          .bvk-table th:nth-child(3), .bvk-table td:nth-child(3) { display: none; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="bvk-eyebrow"><span className="bvk-eyebrow-line" /><span className="bvk-eyebrow-text">Trek Comparison · Garhwal Himalayas</span></div>
          <h1 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', fontWeight: 200, letterSpacing: '-0.035em', color: '#111111', lineHeight: 1.1, margin: '0 0 1.75rem' }}>
            Brahmatal vs Kuari Pass: Which Garhwal Trek Should You Choose?
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div className="bvk-pick">
              <div className="bvk-pick-label">Frozen Lake · 4 days · 3,850 m · Dec–Mar</div>
              <span style={{ fontWeight: 500, color: '#111' }}><Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal Trek</Link></span>{' '}
              <span style={{ fontWeight: 300 }}>— Winter snow trek from Lohajung. Frozen alpine lake, Trishul views.</span>
            </div>
            <div className="bvk-pick">
              <div className="bvk-pick-label">Panoramic Ridge · 5 days · 3,876 m · Mar–May, Oct–Nov</div>
              <span style={{ fontWeight: 500, color: '#111' }}><Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kuari Pass Trek</Link></span>{' '}
              <span style={{ fontWeight: 300 }}>— Lord Curzon Trail from Joshimath. Nanda Devi panorama across multiple days.</span>
            </div>
          </div>
          <p className="bvk-body" style={{ marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal Trek</Link>{' '}
            and the{' '}
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Kuari Pass Trek</Link>{' '}
            are the two premier moderate-difficulty treks in the{' '}
            <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Garhwal Himalaya region</Link>. Both stay below 4,000 metres, both are accessible to first-time high-altitude trekkers, and both deliver exceptional Himalayan scenery. Yet they are fundamentally different experiences — different seasons, different base towns, different signature landscapes.
          </p>
          <p className="bvk-body">
            This comparison breaks down the real differences to help you choose the right Garhwal trek for your experience level, preferred season, and the kind of mountain encounter you are looking for. Both routes feature in our{' '}
            <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>best treks in Uttarakhand</Link>{' '}
            guide as top beginner-friendly options across the state.
          </p>
        </div>
      </section>

      {/* ── AT A GLANCE TABLE ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="bvk-eyebrow"><span className="bvk-eyebrow-line" /><span className="bvk-eyebrow-text">At a Glance</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            At a Glance
          </h2>
          <div className="bvk-table-wrap">
            <table className="bvk-table">
              <thead><tr><th></th><th>Brahmatal</th><th>Kuari Pass</th></tr></thead>
              <tbody>
                {[
                  { f: 'Base Town',    b: <><Link href="/treks/location/lohajung" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Lohajung</Link> (2,350 m)</>, k: <><Link href="/treks/location/joshimath" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Joshimath</Link> (1,875 m)</> },
                  { f: 'Max Altitude', b: '3,850 m',                k: '3,876 m' },
                  { f: 'Distance',     b: '22 km',                  k: '30 km' },
                  { f: 'Duration',     b: '4 days',                 k: '5 days' },
                  { f: 'Difficulty',   b: 'Moderate',               k: 'Moderate' },
                  { f: 'Best Season',  b: 'Dec–Mar (winter)',        k: 'Mar–May, Oct–Nov' },
                  { f: 'Signature',    b: 'Frozen alpine lake',      k: 'Continuous ridge panorama' },
                  { f: 'Key Peaks',    b: 'Trishul, Nanda Ghunti',  k: 'Nanda Devi, Dronagiri, Chaukhamba' },
                ].map((r, i) => (
                  <tr key={i}><td>{r.f}</td><td>{r.b}</td><td>{r.k}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA 1 ── */}
      <PrimaryCTA label="Help Me Choose" subtext="Not sure which trek fits you? Share your dates and experience — we will recommend the right route." vertical="trek" category="comparison" sourcePath="/treks/brahmatal-vs-kuari-pass" />

      {/* ── TERRAIN & EXPERIENCE ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="bvk-eyebrow"><span className="bvk-eyebrow-line" /><span className="bvk-eyebrow-text">What You Will Experience</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            The Experience: What Each Trek Feels Like
          </h2>
          <div className="bvk-split">
            <div className="bvk-split-card">
              <img src="https://images.unsplash.com/photo-1534637126672-b67a59f61580?w=600&q=80&fit=crop" alt="Brahmatal frozen alpine lake in winter" loading="lazy" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px', marginBottom: '1rem', display: 'block' }} />
              <h3>Brahmatal — The Frozen Lake Winter Trek</h3>
              <p>Brahmatal is a winter trek. You walk through snow-laden oak and rhododendron forest, camp on snow-covered clearings, and reach a frozen alpine lake at 3,850 metres. The landscape is white, silent, and dramatic. Night temperatures drop to −10°C at camp. The trail above 3,000 metres is consistently snow-covered from December through March.</p>
              <p>The signature moment is arriving at Brahmatal Lake — a frozen sheet of ice surrounded by snow ridges with the Trishul massif rising behind. It is a visual that exists only in winter and cannot be replicated in any other season, on any other route.</p>
            </div>
            <div className="bvk-split-card">
              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80&fit=crop" alt="Kuari Pass ridge walk with Nanda Devi panorama" loading="lazy" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px', marginBottom: '1rem', display: 'block' }} />
              <h3>Kuari Pass — The Panoramic Ridge Walk</h3>
              <p>Kuari Pass is a ridge trek. Instead of walking toward a single destination, you walk along a high ridge with the Himalayan range arrayed before you for days at a stretch. Nanda Devi (7,816 m), Dronagiri, Chaukhamba, Kamet — the entire Nanda Devi Sanctuary unfolds to your north.</p>
              <p>In spring, rhododendrons bloom below the treeline. In autumn, the forests turn gold and the peaks appear almost three-dimensional. The descent via Auli adds variety that Brahmatal&apos;s out-and-back structure does not offer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEASONAL COMPARISON ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="bvk-eyebrow"><span className="bvk-eyebrow-line" /><span className="bvk-eyebrow-text">When to Go</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>
            When to Go: The Season Question
          </h2>
          <p className="bvk-body" style={{ marginBottom: '1.75rem' }}>
            This is the most important differentiator. The two treks occupy almost entirely different seasonal windows:
          </p>

          <div className="bvk-season">
            <div className="bvk-season-label">Brahmatal · December to March</div>
            <p>This is exclusively a{' '}<Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>winter trek</Link>. The frozen lake and snow ridges that define the experience only exist in winter. Doing Brahmatal in summer misses the point entirely — the lake is just water, the ridges are just grass.</p>
          </div>
          <div className="bvk-season">
            <div className="bvk-season-label">Kuari Pass · March–May &amp; October–November</div>
            <p>March to May (spring) and October to November (autumn) are the prime windows. Kuari Pass can be done in winter with snow gear, but the ridge becomes more challenging and exposed. It is fundamentally a{' '}<Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>spring/summer and autumn trek</Link>.</p>
          </div>
          <div className="bvk-season" style={{ marginTop: '1rem' }}>
            <div className="bvk-season-label">Practical Implication</div>
            <p><strong style={{ fontWeight: 500, color: '#111' }}>March</strong> is the only month where both are theoretically viable — but even then the character differs. <strong style={{ fontWeight: 500, color: '#111' }}>Your travel dates will often make this decision for you.</strong> Planning December–February? Brahmatal. Planning April, May, October, or November? Kuari Pass. The season picks the trek.</p>
          </div>
        </div>
      </section>

      {/* ── DIFFICULTY ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="bvk-eyebrow"><span className="bvk-eyebrow-line" /><span className="bvk-eyebrow-text">Effort Required</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>
            Difficulty Comparison
          </h2>
          <p className="bvk-body" style={{ marginBottom: '1.75rem' }}>
            Both treks are rated moderate, and on paper they look almost identical — similar maximum altitude, similar daily walking distances. But the effort profile differs:
          </p>
          <div className="bvk-split">
            <div className="bvk-split-card">
              <h3>Brahmatal — Shorter but Colder</h3>
              <p><strong style={{ fontWeight: 500, color: '#111' }}>Brahmatal</strong> is shorter (4 days, 22 km) but involves walking through snow for most of the route. Snow increases energy expenditure by 30–50% compared to dry trail. Combined with cold temperatures that drain stamina, Brahmatal feels harder than its distance suggests.</p>
              <p>The cold is a genuine factor — if you are not comfortable in sustained sub-zero temperatures, Brahmatal will be more demanding psychologically.</p>
            </div>
            <div className="bvk-split-card">
              <h3>Kuari Pass — Longer but Warmer</h3>
              <p><strong style={{ fontWeight: 500, color: '#111' }}>Kuari Pass</strong> is longer (5 days, 30 km) but on mostly dry trail with established camping infrastructure. The altitude gain is spread across more days, making the daily effort more manageable.</p>
              <p>For first-timers, Kuari Pass is slightly more accessible due to the extra acclimatisation day and warmer conditions. If you have never slept in a tent at −8°C, Kuari Pass in spring is the gentler introduction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA 2 ── */}
      <PrimaryCTA label="Plan My Garhwal Trek" subtext="Tell us your preferred month and fitness level. We will recommend the right route." vertical="trek" category="comparison" sourcePath="/treks/brahmatal-vs-kuari-pass" />

      {/* ── VIEWS ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="bvk-eyebrow"><span className="bvk-eyebrow-line" /><span className="bvk-eyebrow-text">What You Will See</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Views &amp; Scenery
          </h2>
          <div className="bvk-split">
            <div className="bvk-split-card">
              <h3>Brahmatal — Concentrated Drama</h3>
              <p><strong style={{ fontWeight: 500, color: '#111' }}>Brahmatal</strong> delivers its visual payoff as concentrated moments — the frozen lake, the summit ridge, and the campsite panorama. The views of Trishul (7,120 m) and Nanda Ghunti (6,309 m) are striking, especially against winter&apos;s white foreground.</p>
              <p>But much of the trail is in forest — you don&apos;t see mountains for extended stretches until you clear the treeline.</p>
            </div>
            <div className="bvk-split-card">
              <h3>Kuari Pass — Sustained Panorama</h3>
              <p><strong style={{ fontWeight: 500, color: '#111' }}>Kuari Pass</strong> delivers views as a sustained experience. The ridge walk places you above the treeline for long sections, with the Nanda Devi range visible almost continuously from day two onward.</p>
              <p>The scale is larger: Nanda Devi (7,816 m), Dronagiri (7,066 m), Chaukhamba (7,138 m), Kamet (7,756 m). In autumn, visibility can extend beyond 200 km.</p>
            </div>
          </div>
          <div className="bvk-callout">
            <strong>Verdict:</strong> Kuari Pass for breadth and duration of mountain views. Brahmatal for the unique frozen lake visual and the drama of a snow-covered Himalayan landscape.
          </div>
        </div>
      </section>

      {/* ── LOGISTICS ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="bvk-eyebrow"><span className="bvk-eyebrow-line" /><span className="bvk-eyebrow-text">Getting There</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Getting There &amp; Logistics
          </h2>
          <div className="bvk-split">
            <div className="bvk-split-card">
              <h3>Brahmatal from <Link href="/treks/location/lohajung" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Lohajung</Link></h3>
              <p>10 hours from Rishikesh by road via Karnaprayag and Dewal. Lohajung is a small village with basic guesthouses and no ATMs. The road quality is acceptable but narrow in the final stretch. Less frequent bus services — most trekkers use guided transport.</p>
              <p><strong style={{ fontWeight: 500, color: '#111' }}>Total trip:</strong> 7–8 days from Delhi (2 travel days each way + 4 trek days).</p>
            </div>
            <div className="bvk-split-card">
              <h3>Kuari Pass from <Link href="/treks/location/joshimath" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Joshimath</Link></h3>
              <p>9–10 hours from Rishikesh via the Badrinath highway. Joshimath is a proper town with hotels, restaurants, ATMs, and shops. Better road infrastructure, more frequent buses, and more accommodation options. Logistically the easier staging point.</p>
              <p><strong style={{ fontWeight: 500, color: '#111' }}>Total trip:</strong> 8–9 days from Delhi (2 travel days each way + 5 trek days).</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD CHOOSE WHICH ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="bvk-eyebrow"><span className="bvk-eyebrow-line" /><span className="bvk-eyebrow-text">Decision Guide</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Who Should Choose Which
          </h2>
          <div className="bvk-choose-grid">
            <div className="bvk-choose-card">
              <h3>Choose Brahmatal if:</h3>
              <ul>
                <li>You want a winter snow trek (December–March)</li>
                <li>You are drawn to the frozen lake experience</li>
                <li>You are comfortable with cold-weather camping (−8 to −10°C at night)</li>
                <li>You have 4 trek days available</li>
                <li>You want an alternative to the crowded Kedarkantha circuit</li>
              </ul>
            </div>
            <div className="bvk-choose-card">
              <h3>Choose Kuari Pass if:</h3>
              <ul>
                <li>You want the widest possible Himalayan panorama</li>
                <li>You prefer spring or autumn trekking (milder weather)</li>
                <li>This is your first high-altitude Himalayan trek</li>
                <li>You value historic trails (Lord Curzon Trail)</li>
                <li>You want the option to extend to <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Pangarchulla summit</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── UPGRADE PATHS ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="bvk-eyebrow"><span className="bvk-eyebrow-line" /><span className="bvk-eyebrow-text">Progression</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Next Steps After Each Trek
          </h2>
          <div className="bvk-split">
            <div className="bvk-split-card">
              <h3>After Brahmatal</h3>
              <p>The natural progression is the{' '}
                <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund Trek</Link>{' '}
                — same base village (Lohajung), significantly higher altitude (4,800 m), and challenging difficulty. Brahmatal at 3,850 m gives you the altitude confidence to tackle Roopkund.
              </p>
            </div>
            <div className="bvk-split-card">
              <h3>After Kuari Pass</h3>
              <p>The natural extension is{' '}
                <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Pangarchulla Peak</Link>{' '}
                — the route shares the same approach trail before diverging for a summit push to 4,590 m. Some itineraries combine both, crossing Kuari Pass on day 3 and pushing to Pangarchulla from Khullara camp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA 3 ── */}
      <PrimaryCTA label="Plan My Trek" subtext="Share your preferred season and experience level — we will match you to the right trek." vertical="trek" category="comparison" sourcePath="/treks/brahmatal-vs-kuari-pass" />

      {/* ── FAQ ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="bvk-eyebrow"><span className="bvk-eyebrow-line" /><span className="bvk-eyebrow-text">FAQ</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ── EXPLORE MORE ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="bvk-eyebrow"><span className="bvk-eyebrow-line" /><span className="bvk-eyebrow-text">Explore More</span></div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
            Explore More
          </h2>
          <div className="bvk-nav-group">
            <Link href="/treks/best-treks-in-uttarakhand" className="bvk-nav-link">Best Treks in Uttarakhand — Complete Guide</Link>
            <Link href="/treks/best-treks-in-uttarakhand/beginner" className="bvk-nav-link">Beginner Treks in Uttarakhand</Link>
            <Link href="/treks/garhwal-himalayas" className="bvk-nav-link">Garhwal Himalayas Trekking Guide</Link>
            <Link href="/treks/garhwal-himalayas/fitness-guide" className="bvk-nav-link">8-Week Fitness Preparation Plan</Link>
            <Link href="/treks/garhwal-himalayas/packing-checklist" className="bvk-nav-link">Packing Checklist — Print-Ready Gear List</Link>
            <Link href="/treks/roopkund-vs-pangarchulla" className="bvk-nav-link">Challenging Garhwal Treks: Roopkund vs Pangarchulla</Link>
            <Link href="/treks/location/lohajung" className="bvk-nav-link">All treks from Lohajung</Link>
            <Link href="/treks/location/joshimath" className="bvk-nav-link">All treks from Joshimath</Link>
            <Link href="/treks/winter-treks-uttarakhand" className="bvk-nav-link">Winter Treks in Uttarakhand</Link>
            <Link href="/treks/summer-treks-uttarakhand" className="bvk-nav-link">Summer Treks in Uttarakhand</Link>
            <Link href="/treks/beginner-treks-uttarakhand" className="bvk-nav-link">Beginner Treks in Uttarakhand</Link>
          </div>
        </div>
      </section>

    </TrackedPage>
  );
}
