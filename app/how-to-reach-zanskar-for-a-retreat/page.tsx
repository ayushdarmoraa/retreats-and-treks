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
import { images } from '@/lib/images';

const PATH = '/how-to-reach-zanskar-for-a-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'How to Reach Zanskar for a Retreat | Retreats And Treks',
    description:
      'How to reach Zanskar for a retreat: flights, road routes, acclimatisation, travel logistics, and routes from major Indian cities.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'How to Reach Zanskar for a Meditation Retreat',
      description: 'Routes, transport, acclimatisation, and travel logistics for Zanskar.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('How to Reach Zanskar for a Meditation Retreat'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How long does it take to reach Zanskar from Delhi?',
    answer:
      'The fastest route takes approximately 2–3 days: fly Delhi to Leh (1.5 hours), rest in Leh for acclimatisation (1 day minimum), then drive Leh to Kargil to Zanskar (2 days, or 1 long day if conditions are good). We recommend allowing 3 days for travel each way to account for acclimatisation and road conditions.',
  },
  {
    question: 'Can I drive to Zanskar from Manali or Srinagar?',
    answer:
      'From Srinagar: Drive via Kargil (2 days) then Kargil to Padum (1 day). This route is scenic and avoids the altitude shock of flying directly to Leh. From Manali: The Manali–Leh highway is open June–September. Drive to Leh (2 days) then continue to Zanskar. Both routes are long but the gradual altitude gain is easier on the body than flying.',
  },
  {
    question: 'Do I need a permit to visit Zanskar?',
    answer:
      'Indian citizens do not need a special permit. Foreign nationals need an Inner Line Permit (ILP) for Ladakh, which can be obtained online or at the Leh airport/DC office. The process is straightforward — you need a passport copy and basic travel details. Our retreat team handles the permit process for international participants.',
  },
  {
    question: 'Is the road to Zanskar dangerous?',
    answer:
      'The road is challenging, not dangerous, when driven by experienced local drivers. It is a mountain road with some unpaved sections, river crossings, and narrow passes. Our retreats use experienced local drivers who know the route intimately. The road is not suitable for self-driving unless you have extensive mountain driving experience.',
  },
  {
    question: 'What happens if the road is blocked?',
    answer:
      'Landslides and road blockages are rare but possible, especially during the monsoon months (July–August). Blockages are usually cleared within 4–12 hours by the Border Roads Organisation. Our itineraries include buffer days specifically for this. In our operating history, no retreat has been cancelled due to road blockage — only delayed by hours.',
  },
];

export default function HowToReachZanskarPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Locations', url: buildCanonicalUrl('/locations') },
    { name: 'Zanskar', url: buildCanonicalUrl('/locations/zanskar') },
    { name: 'How to Reach Zanskar', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Reach Zanskar for a Meditation Retreat',
    description: 'Complete travel guide to reaching Zanskar for a retreat.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "How to Reach Zanskar for a Meditation Retreat".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.locations.zanskar;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="How to Reach Zanskar for a Meditation Retreat"
        description="Routes, transport, acclimatisation, and travel logistics for Zanskar."
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

        .med-hero-section {
          position: relative;
          overflow: hidden;
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(15,118,110,0.12);
        }
        .med-hero-section .med-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%);
        }
        .med-hero-section .med-hero-content {
          position: relative;
          z-index: 2;
          max-width: 58rem;
          width: 100%;
          padding: 5rem 1.5rem 4.5rem;
          text-align: center;
        }
        .med-hero-section .med-hero-content .med-h1 {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(2.3rem, 4.6vw, 3.4rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 1.1rem;
          line-height: 1.08;
          text-shadow: 0 3px 24px rgba(0,0,0,0.5);
        }
        .med-hero-section .med-hero-content .med-h1 span {
          color: #5eead4;
        }
        .med-hero-section .med-hero-content .med-body {
          max-width: 46rem;
          margin: 0 auto 1.5rem;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.85);
          text-shadow: 0 2px 14px rgba(0,0,0,0.45);
        }
        .med-hero-section .med-hero-content .med-hero-tags {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .med-hero-section .med-hero-content .med-hero-tags span {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 999px;
          padding: 0.35rem 0.9rem;
          background: rgba(15,118,110,0.25);
        }
        .med-hero-section .med-hero-content .med-hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .med-section-padding { padding: 4rem 0; }

        .med-route-card { padding: 1.5rem; }
        .med-route-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-route-card .med-body { font-size: 0.92rem; margin-bottom: 0.3rem; }

        .med-acclimatisation-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; margin-top: 1.8rem; }
        @media (max-width: 720px) { .med-acclimatisation-grid { grid-template-columns: 1fr; } }

        .med-international-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; margin-top: 1.8rem; }
        @media (max-width: 720px) { .med-international-grid { grid-template-columns: 1fr; } }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Locations', href: '/locations' },
              { name: 'Zanskar', href: '/locations/zanskar' },
              { name: 'How to Reach Zanskar' },
            ]}
          />
        </div>
      </div>

      <article>

        {/* ── HERO ── */}
        <section className="med-shell med-hero-section">
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              className="med-hero-bg"
              src={heroImage.src}
              alt={heroImage.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div className="med-hero-overlay" />
          </div>
          <div className="med-hero-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Travel Guide</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Getting to Zanskar is itself part of the retreat. The journey strips away convenience, forces patience, and delivers you to a place where the ordinary world feels genuinely far away. Here is the practical guide — routes, transport, timing, and what to prepare for.
            </p>
            <div className="med-hero-tags">
              <span>Delhi to Zanskar</span>
              <span>Srinagar Route</span>
              <span>Manali Route</span>
              <span>Acclimatisation</span>
            </div>
            <div className="med-hero-actions">
              <Link href="#routes" className="med-cta-btn">View Routes</Link>
              <a href="#acclimatisation" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Acclimatisation Guide</a>
            </div>
          </div>
        </section>

        {/* ── ROUTES ── */}
        <section id="routes" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Three Routes</span>
            </div>
            <h2 className="med-h2">How to Reach <span>Zanskar</span></h2>
            <p className="med-body">Three routes, three different experiences. Choose based on your time, comfort with altitude, and appetite for mountain roads.</p>

            <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
              {/* Route 1: Delhi via Leh */}
              <div className="med-card med-route-card">
                <span className="med-season-tag">Fastest</span>
                <h3 className="med-h3">Delhi → Leh → Zanskar</h3>
                <p className="med-body"><strong>Duration:</strong> 2–3 days including acclimatisation</p>
                <ul className="med-list" style={{ marginTop: '0.5rem' }}>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text"><strong>Day 1:</strong> Fly Delhi to Leh (1.5 hrs). Rest — acclimatisation day</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text"><strong>Day 2:</strong> Optional second acclimatisation day in Leh</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text"><strong>Day 3:</strong> Drive Leh → Kargil (4–5 hrs)</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text"><strong>Day 4:</strong> Drive Kargil → Padum/Zanskar (7–9 hrs)</span>
                  </li>
                </ul>
                <p className="med-body" style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  <strong>Note:</strong> Flying to Leh means rapid altitude gain. Acclimatisation is not optional. Do not skip the rest day.
                </p>
              </div>

              {/* Route 2: Srinagar */}
              <div className="med-card med-route-card">
                <span className="med-season-tag">Scenic</span>
                <h3 className="med-h3">Srinagar → Kargil → Zanskar</h3>
                <p className="med-body"><strong>Duration:</strong> 3 days from Srinagar</p>
                <ul className="med-list" style={{ marginTop: '0.5rem' }}>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text"><strong>Day 1:</strong> Drive Srinagar → Kargil (7–8 hrs via NH1). Crosses Zoji La (3,528m)</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text"><strong>Day 2:</strong> Rest in Kargil or continue to Rangdum</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text"><strong>Day 3:</strong> Drive to Padum/Zanskar (5–7 hrs from Rangdum)</span>
                  </li>
                </ul>
                <p className="med-body" style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  <strong>Advantage:</strong> Gradual altitude gain from 1,600m (Srinagar) over two days — easier on the body than flying.
                </p>
              </div>

              {/* Route 3: Manali */}
              <div className="med-card med-route-card" style={{ gridColumn: '1 / -1' }}>
                <span className="med-season-tag">Adventurous</span>
                <h3 className="med-h3">Manali → Leh → Zanskar</h3>
                <p className="med-body"><strong>Duration:</strong> 4–5 days from Manali</p>
                <ul className="med-list" style={{ marginTop: '0.5rem' }}>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text"><strong>Days 1–2:</strong> Drive Manali → Leh via Manali–Leh Highway (2 days, overnight in Sarchu or Keylong)</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text"><strong>Day 3:</strong> Rest in Leh</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text"><strong>Days 4–5:</strong> Drive Leh → Kargil → Zanskar</span>
                  </li>
                </ul>
                <p className="med-body" style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  <strong>Note:</strong> The Manali–Leh Highway crosses five passes above 4,000m. Extraordinary but physically demanding.
                </p>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="We Handle the Logistics"
          subtext="All transport, acclimatisation stops, and route planning included in our Zanskar retreats."
          vertical="retreat"
          category="zanskar-travel"
          sourcePath={PATH}
        />

        {/* ── ACCLIMATISATION ── */}
        <section id="acclimatisation" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Altitude Guide</span>
            </div>
            <h2 className="med-h2">Acclimatisation: The <span>Non-Negotiable Step</span></h2>
            <p className="med-body">
              Zanskar sits at 3,500–4,000 metres. At this altitude, your blood absorbs less oxygen. The effects are predictable: headache, fatigue, mild nausea, disrupted sleep. These are normal and resolve within 24–48 hours for most people.
            </p>

            <div className="med-acclimatisation-grid">
              <div className="med-card" style={{ padding: '1.5rem' }}>
                <h3 className="med-h3" style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Do's</h3>
                <ul className="med-list" style={{ marginTop: '0.5rem' }}>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Minimum 1 day of rest at altitude before the retreat begins</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Drink 3–4 litres of water per day during acclimatisation</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Walk gently — do not hike, run, or exert yourself on arrival day</span>
                  </li>
                </ul>
              </div>

              <div className="med-card" style={{ padding: '1.5rem' }}>
                <h3 className="med-h3" style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Don'ts</h3>
                <ul className="med-list" style={{ marginTop: '0.5rem' }}>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">No alcohol for 48 hours before and after altitude gain</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Do not skip meals — eat lightly but regularly</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Do not ignore symptoms — communicate with your guide</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="med-body" style={{ marginTop: '1.5rem' }}>
              <strong>Medication:</strong> Consult your doctor about Diamox (acetazolamide) if you are prone to altitude sickness. Our Zanskar retreat itineraries build acclimatisation into the schedule — you will not begin intensive meditation practice until your body has adjusted.
            </p>
          </div>
        </section>

        {/* ── INTERNATIONAL TRAVELLERS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">International</span>
            </div>
            <h2 className="med-h2">For <span>International</span> Participants</h2>

            <div className="med-international-grid">
              <div className="med-card" style={{ padding: '1.5rem' }}>
                <h3 className="med-h3" style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Visa & Permits</h3>
                <ul className="med-list" style={{ marginTop: '0.5rem' }}>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Indian tourist visa (e-visa available for most nationalities)</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Inner Line Permit (ILP) required for Ladakh — we process this for you</span>
                  </li>
                </ul>
              </div>

              <div className="med-card" style={{ padding: '1.5rem' }}>
                <h3 className="med-h3" style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Logistics</h3>
                <ul className="med-list" style={{ marginTop: '0.5rem' }}>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Fly international to Delhi, then domestic to Leh</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Insurance covering high-altitude (some policies exclude above 3,000m)</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Bring cash (INR) — no ATMs in Zanskar. Leh ATMs can run dry in peak season</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE JOURNEY AS PRACTICE ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Perspective</span>
            </div>
            <h2 className="med-h2">The Journey Is the <span>First Practice</span></h2>
            <p className="med-body">
              Getting to Zanskar takes effort. The roads are long, the landscape is immense, and the pace is controlled by the mountain, not by you. This is not a flaw in the travel logistics — it is a feature. By the time you arrive at the monastery, you have already begun slowing down. The world you left behind feels far away because it is.
            </p>
            <p className="med-body">
              Read about <Link href="/why-zanskar-is-perfect-for-retreats" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>what makes Zanskar exceptional for retreats</Link> and <Link href="/best-time-for-a-retreat-in-zanskar" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>the best time to visit</Link>.
            </p>
          </div>
        </section>

        <FeaturedRetreat
          title="Zanskar Meditation Retreat — All Logistics Included"
          description="Airport pickup, acclimatisation planning, local transport, monastery accommodation, all meals, and facilitation."
          links={[
            { label: 'Zanskar location details', href: '/locations/zanskar' },
            { label: 'See retreat dates', href: '/retreat-calendar' },
            { label: 'Find your retreat', href: '/find-your-retreat' },
          ]}
        />

        {/* ── FAQ ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
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
            { label: 'Best Time for a Retreat in Zanskar', href: '/best-time-for-a-retreat-in-zanskar' },
            { label: 'My 7-Day Retreat in Zanskar', href: '/my-7-day-meditation-retreat-in-zanskar' },
          ]}
        />

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/locations/zanskar" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Zanskar Location</span>
              </Link>
              <Link href="/best-time-for-a-retreat-in-zanskar" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Best Time to Visit</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/why-zanskar-is-perfect-for-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Why Zanskar?</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/locations" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>All Locations</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
            </div>
          </div>
        </nav>

      </article>
    </TrackedPage>
  );
}
