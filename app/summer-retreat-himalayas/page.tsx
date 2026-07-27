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

const PATH = '/summer-retreat-himalayas';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Summer Retreat in the Himalayas | Retreats And Treks',
    description:
      'Summer retreats in the Himalayas with meditation, yoga, healing, and cool mountain settings in Chakrata, Munsiyari, and Zanskar.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Summer Retreat in the Himalayas',
      description: 'When the plains burn, the mountains hold space. Summer retreats in cool Himalayan locations.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Summer Retreat in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the weather like during a summer Himalayan retreat?',
    answer:
      'At altitude (2,000–3,500 m), summer temperatures range from 15–25°C during the day and 5–15°C at night. This is dramatically cooler than the plains, where temperatures reach 40–45°C from April–June. The contrast makes the mountains feel like a different climate zone — because they are. Pre-monsoon (April–June) is optimally clear. Monsoon (July–August) brings rain but also lush greenery.',
  },
  {
    question: 'Is monsoon season suitable for retreats?',
    answer:
      'Yes, with the right location. Monsoon (July–August) brings rain, but locations like Zanskar sit in the rain shadow and remain dry. Chakrata receives moderate rainfall that makes the forest spectacularly lush without flooding. Rishikesh is best avoided during peak monsoon due to heat and humidity. The monsoon rhythm — rain, clearing, rain — can be deeply meditative.',
  },
  {
    question: 'Which summer location is best for a first retreat?',
    answer:
      'Chakrata in May–June is the ideal first summer retreat. Cool temperatures, lush forest, easy access from Dehradun, and genuinely quiet. Munsiyari offers more dramatic landscapes but requires a longer journey. Zanskar is best for experienced retreatants comfortable with altitude and remoteness.',
  },
  {
    question: 'Can I combine a summer retreat with trekking?',
    answer:
      'Absolutely. Summer is peak trekking season. Sankri, Munsiyari, and Zanskar all support combined retreat+trek itineraries. A common pattern: 3–5 day retreat followed by a 3–5 day trek, or vice versa. The combination of stillness and movement creates a particularly powerful experience.',
  },
];

export default function SummerRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Summer Retreat in the Himalayas', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = generateBlogPostingSchema({
    title: 'Summer Retreat in the Himalayas — Escape the Heat, Find Altitude',
    description:
      'Summer retreats in the Himalayas with meditation, yoga, healing, and cool mountain settings in Chakrata, Munsiyari, and Zanskar.',
    publishedAt: '2026-03-06',
    lastUpdated: '2026-05-09',
    url: canonicalUrl,
  });

  // Split heading for green last word
  const h1Words = "Summer Retreat in the Himalayas".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Summer Retreat in the Himalayas — Escape the Heat, Find Altitude"
        description="Summer retreats in the Himalayas with meditation, yoga, healing, and cool mountain settings in Chakrata, Munsiyari, and Zanskar."
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
        .med-summer-card { padding: 1.25rem; position: relative; border-left: 4px solid #0f766e; }
        .med-summer-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-summer-card .med-h3 a { color: #0f766e; font-weight: 600; text-decoration: none; transition: color 0.3s; }
        .med-summer-card .med-h3 a:hover { color: #0d6b64; }
        .med-summer-card .med-body { font-size: 0.92rem; margin-bottom: 0; }
        .med-summer-card .med-badge {
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

        .med-summer-grid { display: grid; gap: 1.25rem; margin-top: 1.5rem; }

        .med-summer-list { padding-left: 1.25rem; line-height: 2.2; margin-bottom: 1rem; list-style: none; }
        .med-summer-list li { position: relative; padding-left: 1.5rem; }
        .med-summer-list li::before { content: '✦'; position: absolute; left: 0; color: #0f766e; font-size: 0.8rem; }
        .med-summer-list li strong { color: #2B2A26; font-weight: 600; }
        .med-summer-list li a { color: #0f766e; font-weight: 500; text-decoration: none; transition: color 0.3s; }
        .med-summer-list li a:hover { color: #0d6b64; text-decoration: underline; }

        .med-summer-footer { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; justify-content: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(15,118,110,0.08); }
        .med-summer-footer a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; transition: color 0.3s; }
        .med-summer-footer a:hover { color: #0d6b64; text-decoration: underline; }

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

        .med-summer-popular-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1.5rem; }
        @media (max-width: 720px) { .med-summer-popular-grid { grid-template-columns: 1fr; } }
        .med-summer-popular-item {
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
        .med-summer-popular-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(15,118,110,0.08);
          border-color: rgba(15,118,110,0.2);
          background: #fff;
        }
        .med-summer-popular-item .med-icon {
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
        .med-summer-popular-item .med-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
        }
        .med-summer-popular-item .med-arrow {
          margin-left: auto;
          color: #0f766e;
          font-size: 0.7rem;
          opacity: 0.4;
          transition: opacity 0.3s;
        }
        .med-summer-popular-item:hover .med-arrow { opacity: 1; }
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
              { name: 'Summer Retreat Himalayas' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Escape the Heat</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              When the Indian plains become uninhabitable — 40°C, dust, the weight of compressed heat — the Himalayas offer altitude, cool air, and the kind of environmental relief that makes retreat work not just possible but natural. Summer in the mountains is green, vivid, and alive. Snow melts. Streams run. Flowers appear in meadows. And the cool mornings make 6 AM meditation feel like a gift rather than a discipline.
            </p>
            <div className="med-hero-tags">
              <span>15–25°C</span>
              <span>Lush Forests</span>
              <span>Zanskar Open</span>
              <span>Clear Views</span>
            </div>
            <div className="med-hero-actions">
              <a href="#locations" className="med-cta-btn">Explore Summer Retreats</a>
              <a href="#why" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Why Summer?</a>
            </div>
          </div>
        </section>

        {/* ── WHY SUMMER ── */}
        <section id="why" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Why Summer</span>
            </div>
            <h2 className="med-h2">Why <span>Summer</span> for a Himalayan Retreat</h2>

            <ul className="med-summer-list">
              <li><strong>Temperature relief:</strong> 15–25°C vs 40°C+ on the plains. The body settles instantly.</li>
              <li><strong>Longest days:</strong> More natural light for practice, walking, and outdoor meditation.</li>
              <li><strong>Full accessibility:</strong> All six retreat locations are accessible from April–September.</li>
              <li><strong>Zanskar opens:</strong> June–September is the only window for Zanskar retreats — the deepest option.</li>
              <li><strong>Lush landscape:</strong> Forests green, wildflowers bloom, waterfalls peak.</li>
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
            <h2 className="med-h2">Summer Retreat <span>Locations</span></h2>

            <div className="med-summer-grid">
              <div className="med-card med-summer-card">
                <span className="med-badge">Cool Forest</span>
                <h3 className="med-h3"><Link href="/locations/chakrata">Chakrata</Link></h3>
                <p className="med-body">May–June in Chakrata is perfect — 15–22°C, the deodar forest at its most lush, and negligible tourist presence. The pre-monsoon air is exceptionally clear. Best for: meditation, silent retreat, stress relief.</p>
              </div>

              <div className="med-card med-summer-card">
                <span className="med-badge">Trans-Himalayan</span>
                <h3 className="med-h3"><Link href="/locations/zanskar">Zanskar</Link></h3>
                <p className="med-body">June–September only. At 3,500 m in the rain shadow, Zanskar has dry, clear summers. Monastery culture is at its most active. The most immersive option anywhere in India.</p>
              </div>

              <div className="med-card med-summer-card">
                <span className="med-badge">Alpine Meadows</span>
                <h3 className="med-h3"><Link href="/locations/munsiyari">Munsiyari</Link></h3>
                <p className="med-body">May–June before the monsoon, or September after. Alpine wildflowers, Panchachuli views, and the Khaliya Top meadows at their most striking. Dramatic landscape alongside inner work.</p>
              </div>

              <div className="med-card med-summer-card">
                <span className="med-badge">Trek-Retreat Gateway</span>
                <h3 className="med-h3"><Link href="/locations/sankri">Sankri</Link></h3>
                <p className="med-body">Summer opens all high-altitude treks from Sankri. Combine burnout recovery or stress-relief retreat with Har Ki Dun or village walks. Physical engagement in the landscape alongside contemplative practice.</p>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan a Summer Retreat"
          subtext="Tell us your month and what you're seeking. We'll match you to the right elevation."
          vertical="retreat"
          category="summer-retreat"
          sourcePath={PATH}
        />

        {/* ── POPULAR SUMMER RETREATS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Popular</span>
            </div>
            <h2 className="med-h2">Popular <span>Summer Retreats</span></h2>

            <div className="med-summer-popular-grid">
              <Link href="/meditation-retreat-zanskar" className="med-summer-popular-item">
                <span className="med-label">Meditation Retreat — Zanskar</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/yoga-retreat-rishikesh" className="med-summer-popular-item">
                <span className="med-label">Yoga Retreat — Rishikesh</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/silent-retreat-munsiyari" className="med-summer-popular-item">
                <span className="med-label">Silent Retreat — Munsiyari</span>
                <span className="med-arrow">→</span>
              </Link>
              <Link href="/burnout-recovery-retreat-sankri" className="med-summer-popular-item">
                <span className="med-label">Burnout Recovery — Sankri</span>
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
        <div className="med-summer-footer">
          <Link href="/spring-retreat-himalayas">Spring Retreats</Link>
          <Link href="/autumn-retreat-himalayas">Autumn Retreats</Link>
          <Link href="/winter-retreat-himalayas">Winter Retreats</Link>
        </div>

      </article>
    </TrackedPage>
  );
}