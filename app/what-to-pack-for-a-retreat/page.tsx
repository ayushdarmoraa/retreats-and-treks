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

const PATH = '/what-to-pack-for-a-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'What to Pack for a Retreat | Retreats And Treks',
    description:
      'Complete Himalayan meditation retreat packing list: clothing, practice essentials, altitude gear, what to bring, what to skip, and common mistakes.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'What to Pack for a Meditation Retreat — Complete Packing List',
      description: 'Everything you need (and don\'t need) for a Himalayan meditation retreat.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('What to Pack for a Meditation Retreat — Complete Packing List'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Do I need special meditation clothing?',
    answer:
      'No. Comfortable, loose-fitting clothing that allows you to sit cross-legged for extended periods is all you need. Avoid clothing with hard seams, tight waistbands, or complicated fastenings. Soft trousers, loose tops, and layers are ideal. You do not need specific meditation outfits or spiritual attire.',
  },
  {
    question: 'Should I bring my phone to a meditation retreat?',
    answer:
      'Bring it for emergency contact and travel logistics but expect to surrender it at the start of the retreat. Our retreats are device-free during the programme. If you need your phone for the journey to and from the retreat, bring it — it will be stored safely for the duration.',
  },
  {
    question: 'What should I NOT bring to a retreat?',
    answer:
      'Books, journals (unless the programme includes journaling), work materials, multiple devices, excessive clothing, and anything that maintains your connection to daily life. The point of a retreat is removal. Every object that connects you to your ordinary routine creates a subtle pull back toward it.',
  },
  {
    question: 'Do I need altitude sickness medication for Zanskar?',
    answer:
      'Zanskar retreats operate at 3,500 metres. We recommend consulting your doctor about Diamox (acetazolamide) before departure. Our itineraries include acclimatisation days. Bring altitude sickness medication as a precaution, but the gradual ascent and acclimatisation schedule prevent most issues. Stay hydrated and avoid alcohol for 48 hours before arrival.',
  },
  {
    question: 'Is bedding provided at the retreat?',
    answer:
      'Yes. All our retreat locations provide bedding, pillows, and blankets. For Zanskar monastery stays, we provide sleeping bags rated for mountain temperatures. You do not need to bring your own bedding. A silk sleeping bag liner is optional for personal comfort.',
  },
];

export default function WhatToPackPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'What to Pack for a Retreat', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What to Pack for a Meditation Retreat — Complete Packing List',
    description: 'The complete packing list for a Himalayan meditation retreat.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "What to Pack for a Meditation Retreat: The Complete List".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="What to Pack for a Meditation Retreat — Complete Packing List"
        description="Everything you need (and don't need) for a Himalayan meditation retreat."
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

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; padding-bottom: 0.5rem; }
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
        .med-section-padding-sm { padding: 3rem 0; }

        /* ── Page specific styles ── */
        .med-pack-card { padding: 1.5rem; }
        .med-pack-card .med-badge {
          display: inline-block;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #0f766e;
          background: rgba(15,118,110,0.08);
          padding: 0.2rem 0.7rem;
          border-radius: 999px;
          margin-bottom: 0.5rem;
        }
        .med-pack-card .med-h2 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .med-pack-card .med-body { font-size: 0.92rem; margin-bottom: 0.5rem; }
        .med-pack-card .med-body:last-child { margin-bottom: 0; }

        .med-pack-alt { padding: 1.5rem; background: #f7f9f7; border-radius: 12px; border: 1px solid rgba(15,118,110,0.06); margin-top: 1.5rem; }
        .med-pack-alt .med-h3 { font-size: 1rem; margin-bottom: 0.3rem; }
        .med-pack-alt .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-pack-footer { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; justify-content: center; padding: 2rem 0 4rem; border-top: 1px solid rgba(15,118,110,0.08); margin-top: 2rem; }
        .med-pack-footer a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
        .med-pack-footer a:hover { color: #0d6b64; text-decoration: underline; }

        /* ── FAQ Accordion ── */
        .med-faq-accordion {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
        .med-faq-details {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.1);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .med-faq-details:hover { border-color: rgba(15,118,110,0.25); box-shadow: 0 4px 16px rgba(15,118,110,0.04); }
        .med-faq-details[open] { border-color: rgba(15,118,110,0.3); }
        .med-faq-summary {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.25rem 1.5rem; cursor: pointer; list-style: none;
          font-family: var(--font-inter), sans-serif; font-size: 0.95rem; font-weight: 500;
          color: #2B2A26; transition: background 0.2s ease; user-select: none; gap: 1rem;
        }
        .med-faq-summary::-webkit-details-marker { display: none; }
        .med-faq-summary:hover { background: rgba(15,118,110,0.02); }
        .med-faq-details[open] .med-faq-summary { background: rgba(15,118,110,0.03); border-bottom: 1px solid rgba(15,118,110,0.06); }
        .med-faq-question { flex: 1; }
        .med-faq-icon {
          flex-shrink: 0; width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          color: #0f766e; transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .med-faq-details[open] .med-faq-icon { transform: rotate(45deg); }
        .med-faq-icon svg { width: 20px; height: 20px; stroke-width: 2; transition: stroke-width 0.2s ease; }
        .med-faq-summary:hover .med-faq-icon svg { stroke-width: 2.5; }
        .med-faq-answer {
          padding: 0 1.5rem 1.5rem;
          animation: med-faq-slide 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes med-faq-slide {
          0% { opacity: 0; transform: translateY(-12px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .med-faq-answer .med-body { margin: 0; font-size: 0.92rem; color: #4b5259; }
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
              { name: 'Meditation Retreats', href: '/meditation-retreats' },
              { name: 'What to Pack' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Packing Guide</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              The principle is simple: bring less than you think you need. A retreat is an exercise in removal, and your packing should reflect that. Here is everything you actually need — and the common mistakes that create unnecessary distraction.
            </p>
            <div className="med-hero-tags">
              <span>Clothing</span>
              <span>Practice Essentials</span>
              <span>Altitude Gear</span>
              <span>One-Bag</span>
            </div>
            <div className="med-hero-actions">
              <a href="#clothing" className="med-cta-btn">What to Pack</a>
              <a href="#dont-bring" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>What NOT to Bring</a>
            </div>
          </div>
        </section>

        {/* ── CLOTHING ── */}
        <section id="clothing" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-pack-card">
              <span className="med-badge">Clothing</span>
              <h2 className="med-h2">Clothing — <span>Comfort Over Everything</span></h2>
              <ul style={{ paddingLeft: '1.25rem', lineHeight: '2.2', marginBottom: '0.5rem' }}>
                <li><strong>3–4 sets of loose, comfortable clothing</strong> — soft trousers or loose pants that allow cross-legged sitting without restriction</li>
                <li><strong>Warm layers</strong> — fleece, light down jacket, or shawl. Mountain mornings and evenings are cold even in summer</li>
                <li><strong>Warm socks</strong> — 3–4 pairs. You may be barefoot in practice rooms but will want warmth in between</li>
                <li><strong>A shawl or large scarf</strong> — doubles as a meditation wrap, blanket, and warmth layer during sitting</li>
                <li><strong>Comfortable walking shoes</strong> — for walking meditation and nature paths</li>
                <li><strong>Sandals or slip-on shoes</strong> — for moving between rooms easily</li>
                <li><strong>Rain jacket</strong> — Himalayan weather is unpredictable, especially June–September</li>
              </ul>
              <p className="med-body" style={{ marginTop: '0.5rem' }}>
                <strong>Skip:</strong> formal clothes, multiple outfit changes per day, jeans (too restrictive for sitting), anything that requires ironing. You are not performing for anyone. Dress for comfort.
              </p>
            </div>
          </div>
        </section>

        {/* ── PRACTICE ESSENTIALS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-pack-card">
              <span className="med-badge">Essentials</span>
              <h2 className="med-h2">Practice <span>Essentials</span></h2>
              <ul style={{ paddingLeft: '1.25rem', lineHeight: '2.2', marginBottom: 0 }}>
                <li><strong>Meditation cushion (optional)</strong> — we provide cushions and mats, but if you have a favourite zafu, bring it</li>
                <li><strong>Eye mask</strong> — for sleep and optional use during resting meditation</li>
                <li><strong>Earplugs</strong> — useful if you are a light sleeper in shared accommodation</li>
                <li><strong>Water bottle</strong> — refillable, 1 litre minimum. Hydration is critical, especially at altitude</li>
                <li><strong>Small torch/headlamp</strong> — for early morning walks before dawn, especially in Zanskar where paths are unlit</li>
              </ul>
            </div>
          </div>
        </section>

        <PrimaryCTA
          
          label="Plan My Retreat"
          subtext="We'll send you a location-specific packing list when you book."
          vertical="retreat"
          category="packing-guide"
          sourcePath={PATH}
        />

        {/* ── ALTITUDE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-pack-card">
              <span className="med-badge">Altitude</span>
              <h2 className="med-h2">For Himalayan Altitude <span>(Zanskar — 3,500m)</span></h2>
              <p className="med-body">
                If your retreat is in <Link href="/locations/zanskar">Zanskar</Link>, add these to your list:
              </p>
              <ul style={{ paddingLeft: '1.25rem', lineHeight: '2.2', marginBottom: '0.5rem' }}>
                <li><strong>Sun protection</strong> — SPF 50+ sunscreen, lip balm with SPF, UV-blocking sunglasses. UV intensity at 3,500m is significantly higher</li>
                <li><strong>Warm hat and gloves</strong> — for early mornings and cold evenings</li>
                <li><strong>Altitude medication</strong> — Diamox (consult your doctor), plus electrolyte sachets</li>
                <li><strong>Extra warm layer</strong> — down jacket or heavy fleece for monastery courtyards</li>
                <li><strong>Moisturiser</strong> — dry mountain air dehydrates skin quickly</li>
              </ul>
              <p className="med-body">
                For forest retreats in <Link href="/locations/chakrata">Chakrata</Link> (2,000m), altitude gear is not necessary, but warm layers and rain protection are still essential.
              </p>
            </div>
          </div>
        </section>

        {/* ── TOILETRIES ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-pack-card">
              <span className="med-badge">Personal</span>
              <h2 className="med-h2">Toiletries &amp; <span>Personal Items</span></h2>
              <ul style={{ paddingLeft: '1.25rem', lineHeight: '2.2', marginBottom: 0 }}>
                <li>Toothbrush and toothpaste</li>
                <li>Any prescription medications (bring enough for the full duration plus 2 extra days)</li>
                <li>Basic first aid: plasters, painkillers, anti-diarrheal tablets</li>
                <li>Insect repellent (forest retreats in Chakrata)</li>
                <li>Moisturiser and lip balm</li>
                <li>Small towel (full towels provided, but a quick-dry travel towel is useful)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── WHAT NOT TO BRING ── */}
        <section id="dont-bring" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-pack-card">
              <span className="med-badge">Leave Behind</span>
              <h2 className="med-h2">What <span>NOT</span> to Bring</h2>
              <p className="med-body">
                This list matters more than the packing list. Every object that connects you to your ordinary routine creates a subtle pull away from the retreat experience.
              </p>
              <ul style={{ paddingLeft: '1.25rem', lineHeight: '2.2', marginBottom: 0 }}>
                <li><strong>Books and reading material</strong> — resisting the urge to read is part of the practice</li>
                <li><strong>Journals</strong> — unless the programme specifically includes journaling. Writing during silence can become a substitute for sitting with experience directly</li>
                <li><strong>Work materials</strong> — laptop, notebooks with to-do lists, anything from the office</li>
                <li><strong>Extra devices</strong> — tablet, e-reader, camera. One phone (surrendered on arrival) is enough</li>
                <li><strong>Excessive clothing</strong> — you do not need variety. You need comfort. 3–4 outfits is plenty for a 7-day retreat</li>
                <li><strong>Expectations</strong> — this is the hardest thing to leave behind and the most important</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── ONE BAG ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-pack-alt">
              <h3 className="med-h3">The <span style={{ color: '#0f766e' }}>One-Bag</span> Principle</h3>
              <p className="med-body">
                If your packing does not fit in a single bag (40–50 litres), you are bringing too much. This is true for 3-day retreats and 10-day retreats alike. The physical simplicity of arriving with one bag sets the tone for the simplicity of the experience. Read <Link href="/how-to-prepare-for-a-retreat">how to prepare for a retreat</Link> for the full mental and practical preparation guide.
              </p>
            </div>
          </div>
        </section>

        <FeaturedRetreat
          title="7-Day Meditation Retreat in the Himalayas"
          description="Forest or monastery. All meals, accommodation, and facilitation included. Just bring yourself and one bag."
          links={[
            { label: 'View programme', href: '/7-day-meditation-retreat' },
            { label: 'See all dates', href: '/retreat-calendar' },
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
            <h2 className="med-h2">Frequently asked <span>questions</span></h2>

            <div className="med-faq-accordion">
              {FAQ_ITEMS.map((faq, i) => (
                <details key={i} className="med-faq-details">
                  <summary className="med-faq-summary">
                    <span className="med-faq-question">{faq.question}</span>
                    <span className="med-faq-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </summary>
                  <div className="med-faq-answer">
                    <p className="med-body">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <RelatedReads
          links={[
            { label: 'How to Prepare for a Retreat', href: '/how-to-prepare-for-a-retreat' },
            { label: 'What to Expect at a Meditation Retreat', href: '/what-to-expect-at-a-meditation-retreat' },
            { label: 'First Meditation Retreat Tips', href: '/first-meditation-retreat-tips' },
            { label: 'Is a Meditation Retreat Worth It?', href: '/is-a-meditation-retreat-worth-it' },
          ]}
        />

        {/* ── FOOTER ── */}
        <div className="med-pack-footer">
          <Link href="/meditation-retreats">← Meditation Retreats</Link>
          <Link href="/how-to-prepare-for-a-retreat">How to Prepare</Link>
          <Link href="/retreat-calendar">Retreat Calendar</Link>
        </div>

      </article>
    </TrackedPage>
  );
}
