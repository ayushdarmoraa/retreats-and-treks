import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema, generateBlogPostingSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/himalayan-retreat-with-trekking';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Himalayan Retreat with Trekking | Retreats And Treks',
    description:
      'Himalayan retreat with trekking, combining meditation, silence, guided mountain walking, and retreat journeys in Chakrata, Sankri, Munsiyari, and Zanskar.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Himalayan Retreat with Trekking',
      description: 'Inner work meets outer terrain. The rare platform that offers both retreat and mountain trekking.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Himalayan Retreat with Trekking'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Why is combining a retreat with trekking better than doing them separately?',
    answer:
      'When done sequentially, the retreat creates a quality of inner stillness that transforms the trekking experience — every step becomes present, every view is received without mental commentary. And the physical exertion of trekking grounds the sometimes ethereal retreat experience in the body. They complete each other. Done separately, months apart, this synergy is lost.',
  },
  {
    question: 'What difficulty level are the treks?',
    answer:
      'We offer treks from easy (Chakrata forest walks, 3–4 hours/day, minimal elevation gain) to moderate (Har Ki Dun from Sankri, 5–7 hours/day, up to 3,500 m) to challenging (Zanskar valley treks, high altitude, multiple days). We match the trek difficulty to your fitness and experience. No one is pushed beyond their capacity.',
  },
  {
    question: 'Can I customise the retreat-to-trek ratio?',
    answer:
      'Yes. Common formats: 3 days retreat + 3 days trek (6 days total), 5 days retreat + 3 days trek (8 days), or 3 days retreat + 5 days trek (8 days). The right ratio depends on whether you need more inner work or more physical engagement. We design the itinerary around your needs.',
  },
  {
    question: 'What is included in a combined retreat and trekking package?',
    answer:
      'Everything: accommodation, meals, guided meditation sessions, trek leadership, camping equipment (where needed), all internal transport, and pickup/drop coordination. You arrive with personal gear; we handle the rest. Groups are small (maximum 12) to maintain both the retreat quality and trekking safety.',
  },
];

export default function HimalayanRetreatWithTrekkingPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Himalayan Retreat with Trekking', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = generateBlogPostingSchema({
    title: 'Himalayan Retreat with Trekking — Inner Work Meets Outer Terrain',
    description:
      'Himalayan retreat with trekking, combining meditation, silence, guided mountain walking, and retreat journeys in Chakrata, Sankri, Munsiyari, and Zanskar.',
    publishedAt: '2026-03-06',
    lastUpdated: '2026-05-09',
    url: buildCanonicalUrl(PATH),
  });

  // Split heading for green last word
  const h1Words = "Himalayan Retreat with Trekking".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Himalayan Retreat with Trekking — Inner Work Meets Outer Terrain"
        description="Himalayan retreat with trekking, combining meditation, silence, guided mountain walking, and retreat journeys in Chakrata, Sankri, Munsiyari, and Zanskar."
        path={PATH}
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
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } }
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

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-trek-hero { padding: 4rem 0; text-align: center; border-bottom: 1px solid rgba(15,118,110,0.08); }
        .med-trek-hero .med-h1 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; letter-spacing: -0.03em; color: #2B2A26; margin: 0 0 0.5rem; }
        .med-trek-hero .med-h1 span { color: #0f766e; }
        .med-trek-hero .med-body { max-width: 520px; margin: 0 auto; }

        .med-trek-location { padding: 1.25rem; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; background: #fff; transition: all 0.3s ease; }
        .med-trek-location:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(15,31,28,0.1); border-color: rgba(15,118,110,0.28); }
        .med-trek-location .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-trek-location .med-h3 a { color: #0f766e; text-decoration: none; }
        .med-trek-location .med-h3 a:hover { text-decoration: underline; }
        .med-trek-location .med-body { font-size: 0.92rem; margin-bottom: 0; }
        .med-trek-location .med-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.2rem 0.6rem; border-radius: 999px; margin-bottom: 0.5rem; }

        .med-trek-grid { display: grid; gap: 1.4rem; margin-top: 1.8rem; }

        .med-trek-related { margin-top: 1.5rem; }
        .med-trek-related .med-list { margin-top: 0.5rem; }
        .med-trek-related .med-list li a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-trek-related .med-list li a:hover { text-decoration: underline; }

        .med-trek-footer-nav { display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; padding-top: 1.5rem; margin-top: 2rem; border-top: 1px solid rgba(15,118,110,0.08); }
        .med-trek-footer-nav a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
        .med-trek-footer-nav a:hover { text-decoration: underline; }

        .med-trek-cta { padding: 3rem 0; text-align: center; }
        .med-trek-cta .med-body { max-width: 42rem; margin: 0 auto 1.5rem; }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }} />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Retreat with Trekking' }]} />
        </div>
      </div>

      <article>

        {/* ── HERO ── */}
<section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
  <div style={{ position: 'absolute', inset: 0 }}>
    <img className="med-hero-bg" src="/Images/hero/himalayan-sunrise.webp" alt="Himalayan retreat with trekking" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
  </div>
  <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
      <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
      <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Retreat + Trekking</span>
      <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
    </div>
    <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
      {h1Rest} <span style={{ color: '#5eead4' }}>{h1LastWord}</span>
    </h1>
    <p style={{ maxWidth: '46rem', margin: '0 auto 1.5rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.85)', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
      Most retreat operators have never been on a mountain trail. Most trekking companies have never sat in sustained silence. We operate at the intersection — because the Himalayas are not a backdrop for either activity alone. They are an environment where inner stillness and physical engagement with terrain create something that neither practice achieves independently.
    </p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
      {['Retreat + Trek', '4 Locations', '3–10 Days', 'Small Groups'].map((tag) => (
        <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '999px', padding: '0.35rem 0.9rem', background: 'rgba(15,118,110,0.25)' }}>
          {tag}
        </span>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      <Link href="#design" className="med-cta-btn">Design My Retreat + Trek</Link>
      <a href="#locations" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>View Locations</a>
    </div>
  </div>
</section>

        {/* ── FOUR LOCATIONS ── */}
        <section className="med-shell med-section-alt" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Locations</span>
            </div>
            <h2 className="med-h2">Four Locations, <span>Four Levels</span></h2>

            <div className="med-trek-grid">
              <div className="med-trek-location">
                <span className="med-tag">Gentle Entry</span>
                <h3 className="med-h3"><Link href="/locations/chakrata">Chakrata — Gentle Entry</Link></h3>
                <p className="med-body">Forest walks among deodars, treks to Tiger Falls and Budher Caves. Easy terrain, 3–5 hours/day. Combined with forest meditation retreat. The most accessible option — no prior trekking experience needed.</p>
              </div>

              <div className="med-trek-location">
                <span className="med-tag">Classic Mountain</span>
                <h3 className="med-h3"><Link href="/locations/sankri">Sankri — Classic Mountain</Link></h3>
                <p className="med-body">Village retreat + Har Ki Dun or Kedarkantha trail. Moderate difficulty, 5–7 hours/day through forest, meadow, and river valley. The combination of pastoral village retreat and classic Uttarakhand trekking.</p>
              </div>

              <div className="med-trek-location">
                <span className="med-tag">Alpine Challenge</span>
                <h3 className="med-h3"><Link href="/locations/munsiyari">Munsiyari — Alpine Challenge</Link></h3>
                <p className="med-body">Alpine meadow retreat + Khaliya Top or glacier treks. High-altitude meadows with Panchachuli views. Moderate to challenging. For those who want landscape scale alongside contemplative depth.</p>
              </div>

              <div className="med-trek-location">
                <span className="med-tag">Full Immersion</span>
                <h3 className="med-h3"><Link href="/locations/zanskar">Zanskar — Full Immersion</Link></h3>
                <p className="med-body">Monastery meditation + Trans-Himalayan trekking at 3,500+ m. The deepest combination we offer. Multi-day treks to Phuktal Gompa or along the Zanskar River. For experienced practitioners and fit trekkers, June–September only.</p>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Design My Retreat + Trek"
          subtext="Tell us your dates, fitness level, and what draws you — we'll create the right combination."
          vertical="retreat"
          category="retreat-trekking"
          sourcePath={PATH}
        />

        {/* ── RELATED PAGES ── */}
        <section className="med-shell med-section-white" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Related</span>
            </div>
            <h2 className="med-h2">Related <span>Pages</span></h2>

            <div className="med-trek-related">
              <ul className="med-list">
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><Link href="/meditation-retreat-and-trek">Meditation Retreat + Trek</Link> — detailed format guide</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><Link href="/trek-and-meditate-himalayas">Trek &amp; Meditate</Link> — for the trekker who wants meditation</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><Link href="/treks/best-treks-in-uttarakhand">Best Treks in Uttarakhand</Link></span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><Link href="/retreat-programs">All Retreat Programs</Link></span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="med-shell med-section-alt" style={{ padding: '4rem 0' }}>
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
              <Link href="/meditation-retreat-and-trek" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Retreat + Trek</span>
              </Link>
              <Link href="/trek-and-meditate-himalayas" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Trek &amp; Meditate</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/treks" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>All Treks</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>All Retreats</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
            </div>
          </div>
        </nav>

      </article>
    </TrackedPage>
  );
}
