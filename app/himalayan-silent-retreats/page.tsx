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

const PATH = '/himalayan-silent-retreats';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Himalayan Silent Retreats | Retreats And Treks',
    description:
      'Silent retreats in the Himalayas with guided noble silence, small groups, and locations compared by depth, accessibility, and environment.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Himalayan Silent Retreats (2026) — Deep Silence in Mountain Forests & Valleys',
      description:
        'Silent retreats in the Himalayas — compare by depth, accessibility, and environment.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Himalayan Silent Retreats (2026) — Deep Silence in Mountain Forests & Valleys'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What does a silent retreat actually involve?',
    answer:
      'Noble silence means no speaking, no devices, no reading, and minimal eye contact. Days are structured with meditation sessions, meals, walking periods, and rest. The silence is supported by the environment — you are not fighting noise to stay quiet. The mountain landscape absorbs distraction and makes silence the natural state rather than an effort.',
  },
  {
    question: 'Is a silent retreat suitable for beginners?',
    answer:
      'Yes — Chakrata is specifically designed as an accessible entry point for first-time silent retreatants. Three days of guided silence in a Himalayan forest, with instruction and support available. You do not need prior meditation experience. What you need is willingness to stop talking and see what emerges. The forest does the rest.',
  },
  {
    question: 'How long should a Himalayan silent retreat be?',
    answer:
      'Three days gives you a taste of genuine silence — enough that your nervous system begins to settle. Five to seven days is where real depth opens — the mind runs out of its habitual loops and something quieter emerges. Ten days or longer is for those seeking transformative encounter with their own inner landscape. Choose based on how deep you want to go and how much time you have.',
  },
  {
    question: 'What is the difference between silent retreat in Chakrata vs Zanskar?',
    answer:
      'Chakrata offers forest silence — enclosed, acoustic, gentle. You walk among deodar trees and hear only birdsong. The silence is comforting, nurturing, and accessible. Zanskar offers geological silence — a high-altitude valley sealed by mountains, 230 km from the nearest city. The silence there has weight — it is ancient, vast, and confrontational. Chakrata is a warm blanket. Zanskar is a mirror.',
  },
  {
    question: 'Can I break the silence if I need to?',
    answer:
      'Our retreats use noble silence rather than enforced silence. If you have a genuine need — a question for the guide, a safety concern, practical logistics — speaking is permitted. The intention is to remove habitual social conversation, not to create a punitive environment. Most participants find that after the first day, they no longer want to speak.',
  },
  {
    question: 'What if I find silence uncomfortable or anxiety-inducing?',
    answer:
      'That discomfort is normal and expected. The first day of silence often surfaces anxiety, restlessness, or racing thoughts. This is not failure — it is the beginning of the process. By day two, most people find that the discomfort transforms into something more spacious. Guides are available to support you through difficult moments. If extended silence feels too challenging, a three-day retreat in Chakrata is the gentlest possible introduction.',
  },
];

export default function HimalayanSilentRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Silent Retreats', url: buildCanonicalUrl('/silent-retreats') },
    { name: 'Himalayan Silent Retreats', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Himalayan Silent Retreats by Location',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: 3,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forest Silence in Chakrata', url: buildCanonicalUrl('/locations/chakrata') },
      { '@type': 'ListItem', position: 2, name: 'Geological Silence in Zanskar', url: buildCanonicalUrl('/locations/zanskar') },
      { '@type': 'ListItem', position: 3, name: 'Alpine Silence in Munsiyari', url: buildCanonicalUrl('/locations/munsiyari') },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Himalayan Silent Retreats (2026)',
    description: 'Silent retreats in the Himalayas — compare by depth, accessibility, and environment.',
    url: canonicalUrl,
    isPartOf: { '@id': schemaIds.website },
    about: { '@type': 'Thing', name: 'Silent retreats in the Himalayas' },
  };

  // Split heading for green last word
  const h1Words = "Himalayan Silent Retreats: Where the Mountains Hold the Quiet".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Himalayan Silent Retreats (2026) — Deep Silence in Mountain Forests & Valleys"
        description="Silent retreats in the Himalayas — compare by depth, accessibility, and environment."
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
          min-height: 75vh;
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
          borderRadius: 999px;
          padding: 0.35rem 0.9rem;
          background: rgba(15,118,110,0.25);
        }
        .med-hero-section .med-hero-content .med-hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .med-silent-table-wrap { overflow-x: auto; border-radius: 18px; border: 1px solid rgba(15,118,110,0.12); }
        .med-silent-table { width: 100%; border-collapse: collapse; font-family: var(--font-inter), sans-serif; font-size: 0.88rem; }
        .med-silent-table th { text-align: left; padding: 0.85rem 1rem; background: #f7f9f7; border-bottom: 2px solid #0f766e; font-weight: 600; color: #2B2A26; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; }
        .med-silent-table td { padding: 0.85rem 1rem; border-bottom: 1px solid rgba(15,118,110,0.08); color: #4b5259; }
        .med-silent-table tr:last-child td { border-bottom: none; }
        .med-silent-table tr:hover td { background: #f7f9f7; }
        .med-silent-table .med-highlight { color: #0f766e; font-weight: 600; }

        .med-silent-location { padding: 1.25rem; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; background: #fff; transition: all 0.3s ease; margin-bottom: 1.25rem; }
        .med-silent-location:last-child { margin-bottom: 0; }
        .med-silent-location:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(15,31,28,0.1); border-color: rgba(15,118,110,0.28); }
        .med-silent-location .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-silent-location .med-h3 a { color: #0f766e; text-decoration: none; }
        .med-silent-location .med-h3 a:hover { text-decoration: underline; }
        .med-silent-location .med-body { font-size: 0.92rem; margin-bottom: 0.3rem; }
        .med-silent-location .med-silent-meta { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
        .med-silent-location .med-silent-meta .med-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.2rem 0.6rem; border-radius: 999px; }
        .med-silent-location .med-silent-links { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; margin-top: 0.5rem; }
        .med-silent-location .med-silent-links a { color: #0f766e; font-weight: 500; text-decoration: none; font-size: 0.85rem; }
        .med-silent-location .med-silent-links a:hover { text-decoration: underline; }

        .med-silent-choose { margin-top: 1.5rem; }
        .med-silent-choose .med-list { margin-top: 0.5rem; }

        .med-silent-footer-nav { display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; padding-top: 1.5rem; margin-top: 2rem; border-top: 1px solid rgba(15,118,110,0.08); }
        .med-silent-footer-nav a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
        .med-silent-footer-nav a:hover { text-decoration: underline; }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, itemListSchema, webPageSchema]) }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Silent Retreats', href: '/silent-retreats' },
              { name: 'Himalayan Silent Retreats' },
            ]}
          />
        </div>
      </div>

      <article>

        {/* ── HERO ── */}
        <section className="med-shell med-hero-section">
          <div style={{ position: 'absolute', inset: 0 }}>
            <img className="med-hero-bg" src="/Images/hero/himalayan-sunrise.webp" alt="Himalayan silent retreats" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div className="med-hero-overlay" />
          </div>
          <div className="med-hero-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Silent Retreats</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Most silent retreats require you to create silence — to resist the urge to speak, to ignore ambient noise, to impose quiet onto an environment that is not naturally quiet. Himalayan silent retreats are different. The silence is already there. The forests absorb sound. The altitude slows the mind. The remoteness removes every habitual cue. You are not practising silence — you are entering it.
            </p>
            <div className="med-hero-tags">
              <span>Forest Silence</span>
              <span>Geological Silence</span>
              <span>Alpine Silence</span>
              <span>3–14 Days</span>
            </div>
            <div className="med-hero-actions">
              <Link href="#plan" className="med-cta-btn">Plan My Silent Retreat</Link>
              <a href="#locations" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Compare Locations</a>
            </div>
          </div>
        </section>

        <div id="plan">
          <PrimaryCTA
            label="Plan My Silent Retreat"
            subtext="Not sure which silence suits you? Tell us about yourself and we'll recommend."
            vertical="retreat"
            category="himalayan-silent"
            sourcePath={PATH}
          />
        </div>

        {/* ── THREE SILENCES TABLE ── */}
        <section className="med-shell med-section-white" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Three Silences</span>
            </div>
            <h2 className="med-h2">Three Types of <span>Himalayan Silence</span></h2>
            <p className="med-body">Not all silence is the same. In the Himalayas, the environment creates distinct qualities of quiet — each serving different intentions and temperaments.</p>

            <div className="med-silent-table-wrap" style={{ marginTop: '1.8rem' }}>
              <table className="med-silent-table">
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Type of Silence</th>
                    <th>Altitude</th>
                    <th>Accessibility</th>
                    <th>Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Link href="/locations/chakrata" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Chakrata</Link></td>
                    <td>Forest silence</td>
                    <td>2,000m</td>
                    <td>2.5 hrs from Dehradun</td>
                    <td>First-timers, weekends, gentle depth</td>
                  </tr>
                  <tr>
                    <td><Link href="/locations/zanskar" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Zanskar</Link></td>
                    <td>Geological silence</td>
                    <td>3,500m</td>
                    <td>8–10 hrs from Leh</td>
                    <td>Experienced, deep immersion</td>
                  </tr>
                  <tr>
                    <td><Link href="/locations/munsiyari" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Munsiyari</Link></td>
                    <td>Alpine silence</td>
                    <td>2,200m</td>
                    <td>9 hrs from Kathgodam</td>
                    <td>Spacious stillness, peak views</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── LOCATIONS DETAIL ── */}
        <section id="locations" className="med-shell med-section-alt" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Locations</span>
            </div>
            <h2 className="med-h2">Three Qualities of <span>Silence</span></h2>

            {/* Chakrata */}
            <div className="med-silent-location">
              <h3 className="med-h3"><Link href="/locations/chakrata">Chakrata — Forest Silence</Link></h3>
              <p className="med-body">The silence in Chakrata is enclosed. Dense deodar and oak forest creates an acoustic environment where human sound is absorbed by the trees, the earth, the canopy above. There is no traffic noise. No commercial activity. No tourist energy. When you walk through the forest, the only sounds are birdsong, wind in the canopy, and your own footsteps.</p>
              <p className="med-body">This quality of silence is nurturing rather than confrontational. It wraps around you. For first-time silent retreatants, this is the ideal environment — silence that supports rather than exposes.</p>
              <div className="med-silent-meta">
                <span className="med-tag">3–7 Days</span>
                <span className="med-tag">Year-round</span>
                <span className="med-tag">2.5 hrs from Dehradun</span>
                <span className="med-tag">Gentle</span>
              </div>
              <div className="med-silent-links">
                <Link href="/locations/chakrata">Explore Chakrata →</Link>
                <Link href="/retreats/chakrata">Chakrata retreats →</Link>
              </div>
            </div>

            {/* Zanskar */}
            <div className="med-silent-location">
              <h3 className="med-h3"><Link href="/locations/zanskar">Zanskar — Geological Silence</Link></h3>
              <p className="med-body">The silence in Zanskar is not enclosed — it is vast. A river valley carved through rock that is 500 million years old, sealed by peaks on every side, 230 km from the nearest city. The monasteries — Phugtal, Karsha, Stongde — have held this silence for a thousand years. When you sit in a gompa here, you feel the accumulated quiet of centuries of practice.</p>
              <p className="med-body">Zanskar's silence is confrontational in the best sense. With no phone signal, no comfortable distractions, and altitude that strips away mental autopilot, you meet yourself without buffers.</p>
              <div className="med-silent-meta">
                <span className="med-tag">7–14 Days</span>
                <span className="med-tag">Jun–Sep</span>
                <span className="med-tag">8–10 hrs from Leh</span>
                <span className="med-tag">High</span>
              </div>
              <div className="med-silent-links">
                <Link href="/locations/zanskar">Explore Zanskar →</Link>
                <Link href="/retreats/zanskar">Zanskar retreats →</Link>
              </div>
            </div>

            {/* Munsiyari */}
            <div className="med-silent-location">
              <h3 className="med-h3"><Link href="/locations/munsiyari">Munsiyari — Alpine Silence</Link></h3>
              <p className="med-body">Munsiyari's silence is spacious. High-altitude meadows facing the Panchachuli peaks — five summits above 6,000 metres. The sky is enormous. The views are endless. The silence here is not enclosed or weighted — it is expansive. You sit with open sky above and a vast Himalayan panorama ahead, and the silence enters through the eyes as much as the ears.</p>
              <p className="med-body">This environment is best for people who find enclosed silence claustrophobic, or whose silent practice benefits from physical spaciousness.</p>
              <div className="med-silent-meta">
                <span className="med-tag">5–7 Days</span>
                <span className="med-tag">Apr–Jun, Sep–Nov</span>
                <span className="med-tag">9 hrs from Kathgodam</span>
                <span className="med-tag">Moderate</span>
              </div>
              <div className="med-silent-links">
                <Link href="/locations/munsiyari">Explore Munsiyari →</Link>
                <Link href="/retreats/munsiyari">Munsiyari retreats →</Link>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Help Me Choose My Silence"
          subtext="Forest enclosure or mountain vastness? We'll help you find the right setting."
          vertical="retreat"
          category="himalayan-silent"
          sourcePath={PATH}
        />

        {/* ── HOW TO CHOOSE ── */}
        <section className="med-shell med-section-white" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Decision Guide</span>
            </div>
            <h2 className="med-h2">Choosing Your <span>Himalayan Silent Retreat</span></h2>

            <div className="med-silent-choose">
              <ul className="med-list">
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>First time with silence?</strong> Start with Chakrata — 3 days of forest quiet, guided and accessible.</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>Ready for depth?</strong> Zanskar — 7+ days of monastery silence at 3,500 metres.</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>Need spaciousness?</strong> Munsiyari — open alpine silence with peak views.</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>Want movement too?</strong> All three locations offer walking as part of the silent retreat pattern.</span>
                </li>
              </ul>
            </div>

            <p className="med-body" style={{ marginTop: '1rem' }}>
              For a broader view of our meditation offerings, see <Link href="/meditation-retreats" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>meditation retreats</Link> or <Link href="/best-meditation-retreats-in-india" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>best meditation retreats in India</Link>. For all locations in our network, see <Link href="/locations" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>locations</Link>.
            </p>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Silent Retreat"
          subtext="Tell us your experience level and how much time you have — we'll find the right silence."
          vertical="retreat"
          category="himalayan-silent"
          sourcePath={PATH}
        />

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
              <Link href="/silent-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Silent Retreats</span>
              </Link>
              <Link href="/best-himalayan-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Best Himalayan Retreats</span>
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