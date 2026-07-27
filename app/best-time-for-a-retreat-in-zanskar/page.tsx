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

const PATH = '/best-time-for-a-retreat-in-zanskar';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Time for a Zanskar Retreat | Retreats And Treks',
    description:
      'Best time for a Zanskar retreat: months, weather, road access, seasonal changes, and how conditions affect meditation practice.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Best Time for a Meditation Retreat in Zanskar',
      description: 'Month-by-month weather, access, and retreat planning for Zanskar.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Best Time for a Meditation Retreat in Zanskar'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the best month for a retreat in Zanskar?',
    answer:
      'July and August are the most reliable months — stable weather, all roads open, longest daylight hours, and warmest temperatures (daytime highs of 20–25°C). June is good but roads may still be opening after winter. September offers beautiful autumn light but temperatures drop quickly and road closures can begin.',
  },
  {
    question: 'Can I visit Zanskar in winter?',
    answer:
      'Winter access to Zanskar is extremely limited. The road from Kargil closes from October/November until May/June. The famous Chadar trek (frozen river walk) provides winter access but is an expedition-grade trek, not a retreat journey. We do not operate winter retreats in Zanskar.',
  },
  {
    question: 'How cold does Zanskar get in summer?',
    answer:
      'Summer daytime temperatures range from 18–28°C, which is very comfortable. However, mornings and evenings drop to 5–10°C, and nights can approach freezing even in July. The temperature swing between day and night is dramatic — 15–20°C — so layered clothing is essential.',
  },
  {
    question: 'Does the monsoon affect Zanskar?',
    answer:
      'Zanskar sits in a rain shadow and receives very little direct monsoon rainfall. However, the monsoon causes landslides on access roads (particularly the Kargil–Padum road), which can cause temporary road closures. Our retreat logistics account for this with buffer days in the itinerary.',
  },
  {
    question: 'When do retreats in Zanskar run?',
    answer:
      'Our Zanskar retreat programmes run from mid-June to mid-September. The exact dates vary each year depending on road conditions and monastery availability. Check our retreat calendar for current season dates. We announce Zanskar dates 4–6 months in advance to allow for travel planning.',
  },
];

export default function BestTimeForZanskarPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Locations', url: buildCanonicalUrl('/locations') },
    { name: 'Zanskar', url: buildCanonicalUrl('/locations/zanskar') },
    { name: 'Best Time to Visit', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Time for a Meditation Retreat in Zanskar',
    description: 'Month-by-month guide to planning a Zanskar retreat.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Best Time for a Meditation Retreat in Zanskar"
        description="Month-by-month weather, access, and retreat planning for Zanskar."
        path={PATH}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
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

        .med-accent-card { border-left: 3px solid #0f766e; }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-month-item { margin-bottom: 1.5rem; }
        .med-month-item:last-child { margin-bottom: 0; }
        .med-month-item .med-h3 { font-size: 1.1rem; margin-bottom: 0.3rem; }
        .med-month-item .med-body { margin-bottom: 0.3rem; }
        .med-month-item .med-tag-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
        .med-month-item .med-tag-row .med-season-tag { margin-bottom: 0; }
        .med-month-item .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-month-item .med-body a:hover { text-decoration: underline; }

        .med-cta-small { padding: 0.7rem 1.2rem; font-size: 0.7rem; }
      `}</style>

      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Locations', href: '/locations' }, { name: 'Zanskar', href: '/locations/zanskar' }, { name: 'Best Time' }]} />

      <article>
        {/* ── HERO ── */}
        <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <img className="med-hero-bg" src="/Images/location/zanskar.webp" alt="Best time for Zanskar retreat" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
          </div>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Seasonal Guide &middot; Zanskar</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
              Best Time for a Meditation Retreat <span style={{ color: '#5eead4' }}>in Zanskar</span>
            </h1>
            <p style={{ maxWidth: '40rem', margin: '0 auto', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
              Zanskar is accessible for only four months of the year. The rest of the time, it is sealed by snow. Choosing the right month for your retreat affects everything — weather, road access, monastery schedules, and the quality of your experience.
            </p>
          </div>
        </section>

        {/* ── THE SHORT ANSWER ── */}
        <section className="med-shell med-section-white" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Quick Answer</span>
            </div>
            <h2 className="med-h2">The Short <span>Answer</span></h2>

            <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
              <div className="med-card med-accent-card" style={{ padding: '1.5rem' }}>
                <h3 className="med-h3">Best</h3>
                <p className="med-body" style={{ fontSize: '1rem', marginBottom: 0 }}><strong>July and August</strong></p>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0, color: '#6b7280' }}>Stable weather, open roads, warm days, clear skies.</p>
              </div>
              <div className="med-card" style={{ padding: '1.5rem' }}>
                <h3 className="med-h3">Good</h3>
                <p className="med-body" style={{ fontSize: '1rem', marginBottom: 0 }}><strong>Mid-June &amp; September</strong></p>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0, color: '#6b7280' }}>Beautiful but with more risk — roads opening/closing.</p>
              </div>
              <div className="med-card" style={{ padding: '1.5rem' }}>
                <h3 className="med-h3">Not Possible</h3>
                <p className="med-body" style={{ fontSize: '1rem', marginBottom: 0 }}><strong>October–May</strong></p>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0, color: '#6b7280' }}>Roads closed, extreme cold, no retreat operations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── MONTH BY MONTH ── */}
        <section className="med-shell med-section-alt" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Month by Month</span>
            </div>
            <h2 className="med-h2">Month-by-Month <span>Breakdown</span></h2>

            {/* June */}
            <div className="med-month-item">
              <h3 className="med-h3">June (Mid-Month Onward)</h3>
              <p className="med-body">The road from Kargil to Padum typically opens in early to mid-June, though this varies by year. Mid-June onwards is generally reliable. Temperatures are pleasant — 15–22°C during the day — and the valley is especially green. Snowmelt fills the rivers, and the landscape has a freshness that does not last into later summer.</p>
              <p className="med-body">For retreats: June works well but book with flexibility. Road delays are common. Our June programmes include buffer days for exactly this reason. See our <Link href="/summer-retreat-himalayas">summer retreat guide</Link>.</p>
              <div className="med-tag-row">
                <span className="med-season-tag">Temp: 15–22°C</span>
                <span className="med-season-tag">Roads: Opening</span>
                <span className="med-season-tag">Best for: Early season</span>
              </div>
            </div>

            {/* July */}
            <div className="med-month-item">
              <h3 className="med-h3">July</h3>
              <p className="med-body">Peak accessibility. All roads open, weather warm and stable (20–28°C daytime), and the days are long. This is the most popular month for Zanskar travel, which means you may encounter other visitors on the road — but once at the monastery, the isolation is total.</p>
              <p className="med-body">For retreats: Ideal. The warm days make outdoor walking meditation and courtyard practice comfortable. Mornings are cool (5–10°C) which actually supports early sitting — the crisp air sharpens attention.</p>
              <div className="med-tag-row">
                <span className="med-season-tag">Temp: 20–28°C</span>
                <span className="med-season-tag">Roads: Open</span>
                <span className="med-season-tag">Best for: Peak season</span>
              </div>
            </div>

            {/* August */}
            <div className="med-month-item">
              <h3 className="med-h3">August</h3>
              <p className="med-body">Slightly warmer than July, with occasional afternoon clouds. The monsoon, while it does not rain in Zanskar directly, can cause landslides on the approach roads from the Kargil side. Travel delays of 2–6 hours are possible but rarely longer.</p>
              <p className="med-body">For retreats: Excellent. Many of our best Zanskar retreats run in August. The valley is quiet as the initial wave of summer tourists has passed. Monastery schedules are settled and monks are available for interaction.</p>
              <div className="med-tag-row">
                <span className="med-season-tag">Temp: 20–25°C</span>
                <span className="med-season-tag">Roads: Open</span>
                <span className="med-season-tag">Best for: Quiet season</span>
              </div>
            </div>

            {/* September */}
            <div className="med-month-item" style={{ marginBottom: 0 }}>
              <h3 className="med-h3">September</h3>
              <p className="med-body">Early September is beautiful — golden light, quiet valleys, and the beginning of autumn colour. Temperatures drop noticeably: 12–20°C during the day, near freezing at night. By late September, road closures become a real possibility.</p>
              <p className="med-body">For retreats: Early September only. Our last Zanskar retreat each year typically ends by mid-September. The autumn atmosphere adds something — the approaching closure of the valley creates a sense of finality that deepens the retreat experience.</p>
              <div className="med-tag-row">
                <span className="med-season-tag">Temp: 12–20°C</span>
                <span className="med-season-tag">Roads: Closing</span>
                <span className="med-season-tag">Best for: Autumn light</span>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="See Current Zanskar Dates"
          subtext="We announce Zanskar retreat dates 4–6 months in advance."
          vertical="retreat"
          category="zanskar-timing"
          sourcePath={PATH}
        />

        {/* ── HOW SEASON AFFECTS PRACTICE ── */}
        <section className="med-shell med-section-white" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Practice Impact</span>
            </div>
            <h2 className="med-h2">How the Season Affects <span>Your Practice</span></h2>
            <p className="med-body" style={{ marginBottom: '0.5rem' }}>Zanskar's summer is not just a weather window — the season changes the quality of your retreat in specific ways:</p>

            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Long daylight</strong> — 14–15 hours of light in June/July means early morning practice at 5am is in natural light, not darkness</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Temperature range</strong> — cold mornings ground you. Warm afternoons allow outdoor practice. This natural rhythm mirrors traditional monastic schedules</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Clear skies</strong> — the high-altitude sky creates a visual spaciousness that supports open awareness practices</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Festival season</strong> — late July/August sometimes coincides with monastery festivals, adding cultural depth to the experience</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ── PLANNING YOUR VISIT ── */}
        <section className="med-shell med-section-alt" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Practical Planning</span>
            </div>
            <h2 className="med-h2">Planning <span>Your Visit</span></h2>

            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Book 3–6 months in advance — Zanskar retreats have limited capacity</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Allow 2 travel days each way (Delhi → Leh → Zanskar)</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Include 1–2 acclimatisation days in Leh before heading to Zanskar</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Pack for a 20°C temperature range — see our <Link href="/what-to-pack-for-a-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>packing list</Link></span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Read <Link href="/how-to-reach-zanskar-for-a-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>how to reach Zanskar</Link> for the complete travel guide</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">View the <Link href="/meditation-retreat-zanskar" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>full Zanskar meditation retreat</Link> page for programme details</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">See the <Link href="/zanskar-meditation-retreat-june-2026" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>June 2026 departure</Link> for dates and availability</span>
              </li>
            </ul>
          </div>
        </section>

        <FeaturedRetreat
          title="Zanskar Summer Retreat"
          description="Monastery-based meditation at 3,500m. June–September availability. All logistics handled."
          links={[
            { label: 'Zanskar location details', href: '/locations/zanskar' },
            { label: 'See retreat dates', href: '/retreat-calendar' },
            { label: 'Find your retreat', href: '/find-your-retreat' },
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
            { label: 'Meditation Retreat in Zanskar', href: '/meditation-retreat-zanskar' },
            { label: '7-Day Zanskar Itinerary', href: '/7-day-zanskar-meditation-retreat-itinerary' },
            { label: 'Why Zanskar Is Perfect for Retreats', href: '/why-zanskar-is-perfect-for-retreats' },
            { label: 'How to Reach Zanskar', href: '/how-to-reach-zanskar-for-a-retreat' },
            { label: 'My 7-Day Retreat in Zanskar', href: '/my-7-day-meditation-retreat-in-zanskar' },
          ]}
        />

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-alt" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/locations/zanskar" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Zanskar</span>
              </Link>
              <Link href="/retreat-calendar" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreat Calendar</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/why-zanskar-is-perfect-for-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Why Zanskar?</span>
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