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
import { images } from '@/lib/images';

const PATH = '/spring-retreat-himalayas';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Spring Retreat in the Himalayas | Retreats And Treks',
    description:
      'Spring Himalayan retreats from March to May with blooming forests, warmer mornings, mountain views, meditation, yoga, and healing in quiet locations.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Spring Retreat in the Himalayas',
      description: 'The season of renewal. Spring Himalayan retreats in blooming forests and warming mountains.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Spring Retreat in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'When exactly is spring in the Himalayas?',
    answer:
      'March through May. At lower altitudes (Rishikesh, 370 m), spring arrives in March with warming days. At mid-altitude (Chakrata, Mussoorie at ~2,000 m), April–May is peak spring with rhododendron blooms and clear skies. At high altitude (Munsiyari, 2,300 m), spring comes in May. The retreats are timed to each location\'s optimal window.',
  },
  {
    question: 'Is spring the best season for a Himalayan retreat?',
    answer:
      'Spring and autumn are the two peak retreat seasons. Spring has an advantage: the psychological association with renewal, longer days, blooming forests, and warming-but-still-cool temperatures. Many retreatants report that the season itself supports the inner process of opening and emergence. If your retreat intention involves new beginnings or transition, spring amplifies that.',
  },
  {
    question: 'What makes spring different from autumn for retreats?',
    answer:
      'Spring is expansive — days lengthen, flowers bloom, energy rises. Autumn is contractive — days shorten, trees shed, energy settles. Both are excellent for retreat work but serve different emotional needs. Spring suits those seeking renewal, emergence, or forward momentum. Autumn suits those seeking release, integration, or rest. Choose the season that mirrors your inner state.',
  },
  {
    question: 'Can I see rhododendron blooms during a spring retreat?',
    answer:
      'Yes. Peak rhododendron season is April–May at altitudes above 2,000 m. Chakrata, Munsiyari, and the forests around Sankri are especially vivid. The forest canopy turns red and pink — one of the most visually striking natural events in the Himalayas. A spring retreat in these locations includes this as natural backdrop.',
  },
];

export default function SpringRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Spring Retreat in the Himalayas', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = generateBlogPostingSchema({
    title: 'Spring Retreat in the Himalayas — Renewal Season',
    description:
      'Spring Himalayan retreats from March to May with blooming forests, warmer mornings, mountain views, meditation, yoga, and healing in quiet locations.',
    publishedAt: '2026-03-06',
    lastUpdated: '2026-05-09',
    url: canonicalUrl,
  });

  // Split heading for green last word
  const h1Words = "Spring Retreat in the Himalayas".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Spring Retreat in the Himalayas — Renewal Season"
        description="Spring Himalayan retreats from March to May with blooming forests, warmer mornings, mountain views, meditation, yoga, and healing in quiet locations."
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
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(15,118,110,0.12);
        }
        .med-hero-section .med-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(4,12,10,0.88) 0%, rgba(4,12,10,0.5) 50%, rgba(4,12,10,0.82) 100%);
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
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 1.1rem;
          line-height: 1.05;
          text-shadow: 0 3px 24px rgba(0,0,0,0.5);
        }
        .med-hero-section .med-hero-content .med-h1 span {
          color: #5eead4;
        }
        .med-hero-section .med-hero-content .med-body {
          max-width: 46rem;
          margin: 0 auto 1.5rem;
          font-size: 1.1rem;
          color: rgba(255,255,255,0.88);
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
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          padding: 0.35rem 0.9rem;
          background: rgba(15,118,110,0.2);
          backdrop-filter: blur(8px);
        }
        .med-hero-section .med-hero-content .med-hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .med-section-padding { padding: 4rem 0; }
        .med-section-padding-sm { padding: 3rem 0; }

        /* ── Premium Location Cards ── */
        .med-spring-grid { display: grid; gap: 1.25rem; margin-top: 1.5rem; }

        .med-spring-card {
          padding: 1.5rem;
          position: relative;
          border-left: 4px solid #0f766e;
        }
        .med-spring-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-spring-card .med-h3 a { color: #0f766e; font-weight: 600; text-decoration: none; transition: color 0.3s; }
        .med-spring-card .med-h3 a:hover { color: #0d6b64; }
        .med-spring-card .med-body { font-size: 0.92rem; margin-bottom: 0; color: #4b5259; }
        .med-spring-card .med-badge {
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

        .med-spring-list {
          padding-left: 1.25rem;
          line-height: 2.2;
          margin-bottom: 1rem;
          list-style: none;
        }
        .med-spring-list li {
          position: relative;
          padding-left: 1.5rem;
        }
        .med-spring-list li::before {
          content: '✦';
          position: absolute;
          left: 0;
          color: #0f766e;
          font-size: 0.8rem;
        }
        .med-spring-list li strong { color: #2B2A26; font-weight: 600; }
        .med-spring-list li a { color: #0f766e; font-weight: 500; text-decoration: none; transition: color 0.3s; }
        .med-spring-list li a:hover { color: #0d6b64; text-decoration: underline; }

        /* ── Premium Popular Retreats ── */
        .med-spring-popular-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1.5rem; }
        @media (max-width: 720px) { .med-spring-popular-grid { grid-template-columns: 1fr; } }
        .med-spring-popular-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: #f7f9f7;
          border-radius: 12px;
          border: 1px solid rgba(15,118,110,0.06);
          transition: all 0.3s ease;
          text-decoration: none;
          color: #2B2A26;
        }
        .med-spring-popular-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(15,118,110,0.08);
          border-color: rgba(15,118,110,0.2);
          background: #fff;
        }
        .med-spring-popular-item .med-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(15,118,110,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f766e;
          font-size: 0.8rem;
          flex-shrink: 0;
        }
        .med-spring-popular-item .med-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
        }
        .med-spring-popular-item .med-arrow {
          margin-left: auto;
          color: #0f766e;
          font-size: 0.7rem;
          opacity: 0.4;
          transition: opacity 0.3s;
        }
        .med-spring-popular-item:hover .med-arrow { opacity: 1; }

        .med-spring-footer { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; justify-content: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(15,118,110,0.08); }
        .med-spring-footer a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; transition: color 0.3s; }
        .med-spring-footer a:hover { color: #0d6b64; text-decoration: underline; }

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

        .med-faq-details:hover {
          border-color: rgba(15,118,110,0.25);
          box-shadow: 0 4px 16px rgba(15,118,110,0.04);
        }

        .med-faq-details[open] {
          border-color: rgba(15,118,110,0.3);
        }

        .med-faq-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          cursor: pointer;
          list-style: none;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: #2B2A26;
          transition: background 0.2s ease;
          user-select: none;
          gap: 1rem;
        }

        .med-faq-summary::-webkit-details-marker {
          display: none;
        }

        .med-faq-summary:hover {
          background: rgba(15,118,110,0.02);
        }

        .med-faq-details[open] .med-faq-summary {
          background: rgba(15,118,110,0.03);
          border-bottom: 1px solid rgba(15,118,110,0.06);
        }

        .med-faq-question {
          flex: 1;
        }

        .med-faq-icon {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f766e;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .med-faq-details[open] .med-faq-icon {
          transform: rotate(45deg);
        }

        .med-faq-icon svg {
          width: 20px;
          height: 20px;
          stroke-width: 2;
          transition: stroke-width 0.2s ease;
        }

        .med-faq-summary:hover .med-faq-icon svg {
          stroke-width: 2.5;
        }

        .med-faq-answer {
          padding: 0 1.5rem 1.5rem;
          animation: med-faq-slide 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes med-faq-slide {
          0% {
            opacity: 0;
            transform: translateY(-12px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .med-faq-answer .med-body {
          margin: 0;
          font-size: 0.92rem;
          color: #4b5259;
        }

        .med-section-alt .med-spring-card {
          background: #fff;
        }

        /* ── Animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .med-fade-up {
          animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
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
              { name: 'Spring Retreat Himalayas' },
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
              <span style={{ width: 30, height: 1, background: 'rgba(255,255,255,0.4)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>Season of Renewal</span>
              <span style={{ width: 30, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              March through May. The mountains thaw. Rhododendrons ignite the forest canopy in red and pink. Streams swell with snowmelt. Mornings warm enough for outdoor meditation, nights cool enough for deep sleep. Spring in the Himalayas is not just a season — it is the landscape demonstrating renewal.
            </p>
            <div className="med-hero-tags">
              <span>🌿 March–May</span>
              <span>🌸 Rhododendron Blooms</span>
              <span>🌤 12–25°C</span>
              <span>✨ Renewal</span>
            </div>
            <div className="med-hero-actions">
              <a href="#locations" className="med-cta-btn">Explore Spring Retreats</a>
              <a href="#why" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Why Spring?</a>
            </div>
          </div>
        </section>

        {/* ── WHY SPRING ── */}
        <section id="why" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Why Spring</span>
            </div>
            <h2 className="med-h2">Why <span>Spring</span> for a Retreat</h2>

            <ul className="med-spring-list">
              <li><strong>Renewal energy:</strong> The season mirrors inner emergence. Everything is opening.</li>
              <li><strong>Optimal weather:</strong> 12–25°C at most locations. Neither too hot nor too cold.</li>
              <li><strong>Visual beauty:</strong> Rhododendron blooms, wildflowers, crystal-clear mountain views.</li>
              <li><strong>Full access:</strong> All six retreat locations are accessible from March onwards.</li>
              <li><strong>Pre-tourist window:</strong> April–May is before peak season. Quiet and uncrowded.</li>
            </ul>
          </div>
        </section>

        {/* ── LOCATIONS ── */}
        <section id="locations" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Locations</span>
            </div>
            <h2 className="med-h2">Spring Retreat <span>Locations</span></h2>

            <div className="med-spring-grid">
              <div className="med-card med-spring-card">
                <span className="med-badge">🌲 Forest Awakening</span>
                <h3 className="med-h3"><Link href="/locations/chakrata">Chakrata</Link></h3>
                <p className="med-body">April–May. The deodar and oak forests fill with birdsong. Rhododendrons bloom. Temperatures are perfect for both indoor practice and outdoor walking meditation. Ideal for meditation, silent retreat, and healing work.</p>
              </div>

              <div className="med-card med-spring-card">
                <span className="med-badge">🌊 Ganges Season</span>
                <h3 className="med-h3"><Link href="/locations/rishikesh">Rishikesh</Link></h3>
                <p className="med-body">March is Rishikesh's sweet spot — warm days (25–30°C), cool mornings, the Ganges running clear before monsoon sediment. The spiritual scene is active but not yet crowded. Ideal for yoga retreats.</p>
              </div>

              <div className="med-card med-spring-card">
                <span className="med-badge">🏔 Alpine Renewal</span>
                <h3 className="med-h3"><Link href="/locations/munsiyari">Munsiyari</Link></h3>
                <p className="med-body">May brings Munsiyari to life — snow recedes from the Panchachuli view, wildflowers carpet the Khaliya meadows, and the air is crystal clear. For retreatants drawn to dramatic landscape.</p>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan a Spring Retreat"
          subtext="March–May. Tell us your preferred month and intention — we'll match the right location."
          vertical="retreat"
          category="spring-retreat"
          sourcePath={PATH}
        />

        {/* ── POPULAR SPRING RETREATS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Popular</span>
            </div>
            <h2 className="med-h2">Popular <span>Spring Retreats</span></h2>

            <div className="med-spring-popular-grid">
              <Link href="/meditation-retreat-chakrata" className="med-spring-popular-item">
               
                <span className="med-label">Meditation Retreat — Chakrata</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/retreats/yoga-retreat-rishikesh" className="med-spring-popular-item">
             
                <span className="med-label">Yoga Retreat — Rishikesh</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/healing-retreat-munsiyari" className="med-spring-popular-item">
              
                <span className="med-label">Healing Retreat — Munsiyari</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/weekend-retreat-himalayas" className="med-spring-popular-item">
                <span className="med-label">Weekend Retreat — Quick Reset</span>
                <span className="med-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
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

        {/* ── FOOTER ── */}
        <div className="med-spring-footer">
          <Link href="/summer-retreat-himalayas">Summer Retreats</Link>
          <Link href="/autumn-retreat-himalayas">Autumn Retreats</Link>
          <Link href="/winter-retreat-himalayas">Winter Retreats</Link>
        </div>

      </article>
    </TrackedPage>
  );
}
