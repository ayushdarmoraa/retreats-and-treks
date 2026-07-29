import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const PATH = '/treks/summer-treks-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Summer Treks in Uttarakhand | Retreats And Treks',
    description:
      'Find the best summer treks in Uttarakhand for May and June, including Har Ki Dun, Kedarkantha, Tiger Fall, green valleys, and alpine meadows.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Best Summer Treks in Uttarakhand — May–June Guide',
      description:
        'Summer treks in Uttarakhand from May to June. Valley walks, alpine meadows and snow-free summit routes across Sankri and Chakrata.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Best Summer Treks in Uttarakhand — May–June Guide'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is the best trek in Uttarakhand in May?',
    answer:
      'Har Ki Dun is the best trek in Uttarakhand in May. The valley is fully accessible after snow melt, alpine meadows are green and blooming, river crossings are manageable, and temperatures are comfortable at camp. The five-to-six-day route from Sankri through the Tons Valley offers the most complete summer trekking experience in the region — forest, village, meadow, and glacial valley in a single itinerary. Kedarkantha is also possible in early May with residual snow near the summit, offering a hybrid snow-and-green experience.',
  },
  {
    question: 'Are summer treks suitable for beginners?',
    answer:
      'Yes. Summer is the most beginner-friendly season for Himalayan trekking. Trails are dry, snow-free below 3,500 metres, and well-defined. Temperatures are comfortable — 10 to 20°C during the day at most elevations. Daylight hours are long, giving more time on the trail. Tiger Fall in Chakrata is the easiest summer option. Har Ki Dun requires moderate fitness but no technical skills. Kedarkantha in early summer is slightly more demanding due to residual snow but remains accessible to prepared first-timers.',
  },
  {
    question: 'Is Har Ki Dun better in summer or winter?',
    answer:
      'For most trekkers, summer is the better season for Har Ki Dun. The valley is green, wildflowers are blooming, rivers are flowing, and the trail is fully accessible without snow gear. Winter Har Ki Dun is spectacular but more demanding — colder temperatures, snow-covered trails, fewer operating groups, and potential road access issues. Summer gives you the full valley experience with maximum comfort and accessibility. Winter gives you isolation and snow drama but requires prior trekking experience.',
  },
  {
    question: 'Does Kedarkantha have snow in summer?',
    answer:
      'In early May, Kedarkantha typically retains snow above 3,200 metres — patchy on the trail and more substantial near the summit. By late May, snow has largely melted except on north-facing slopes near the peak. June is generally snow-free. The early-May window offers a unique hybrid experience: green forest at lower elevations transitioning to snow near the summit. This is the last opportunity for a snow summit before the trail becomes entirely green for the rest of summer.',
  },
  {
    question: 'What temperature does it reach on summer treks in Uttarakhand?',
    answer:
      'Daytime temperatures on summer treks range from 12 to 22°C depending on altitude. At Sankri base (1,920 metres), expect 18 to 22°C during the day and 8 to 12°C at night. At higher camps on Har Ki Dun or Kedarkantha (3,000 to 3,600 metres), daytime is 10 to 15°C and nighttime drops to 2 to 5°C. Summit mornings can be 0 to 5°C. Light layering is sufficient — thermal base layer for mornings and evenings, t-shirt during daytime walking, and a fleece or light jacket for camp.',
  },
];

export default function SummerTreksUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Summer Treks in Uttarakhand', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Summer Treks in Uttarakhand — May–June Guide',
    description:
      'Summer treks in Uttarakhand from May to June. Valley walks, alpine meadows and snow-free summit routes across Sankri and Chakrata.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Best Summer Treks in Uttarakhand".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Best Summer Treks in Uttarakhand — May–June Guide"
        description="Summer treks in Uttarakhand from May to June. Valley walks, alpine meadows and snow-free summit routes across Sankri and Chakrata."
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

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; }
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

        /* ── Summer Card Styles ── */
        .med-summer-card {
          padding: 1.5rem;
          border-top: 3px solid #0f766e;
          transition: all 0.35s ease;
          margin-bottom: 1.5rem;
        }
        .med-summer-card:last-child { margin-bottom: 0; }
        .med-summer-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(15,118,110,0.08);
        }
        .med-summer-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-summer-card .med-h3 a { color: #0f766e; font-weight: 600; text-decoration: none; transition: color 0.3s; }
        .med-summer-card .med-h3 a:hover { color: #0d6b64; text-decoration: underline; }
        .med-summer-card .med-body { font-size: 0.92rem; margin-bottom: 0.5rem; }
        .med-summer-card .med-body:last-child { margin-bottom: 0; }
        .med-summer-card .med-tag {
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

        .med-summer-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          color: #0f766e;
          text-decoration: none;
          margin-top: 0.5rem;
          transition: color 0.3s;
        }
        .med-summer-link:hover { color: #0d6b64; text-decoration: underline; }

        .med-why-item {
          border-left: 3px solid #0f766e;
          padding-left: 1.25rem;
          margin-bottom: 1.25rem;
          transition: border-color 0.3s;
        }
        .med-why-item:last-child { margin-bottom: 0; }
        .med-why-item:hover { border-color: #0d6b64; }
        .med-why-item .med-h3 { font-size: 0.85rem; font-weight: 600; color: #2B2A26; margin-bottom: 0.2rem; }
        .med-why-item .med-body { font-size: 0.88rem; margin-bottom: 0; }

        .med-who-item {
          display: flex;
          gap: 0.75rem;
          padding: 0.9rem 1rem;
          border-bottom: 1px solid rgba(15,118,110,0.06);
          transition: background 0.2s;
        }
        .med-who-item:last-child { border-bottom: none; }
        .med-who-item:hover { background: #f7f9f7; }
        .med-who-item .med-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #0f766e;
          flex-shrink: 0;
          margin-top: 0.65rem;
        }
        .med-who-item .med-body { font-size: 0.88rem; margin: 0; }
        .med-who-item .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-who-item .med-body a:hover { text-decoration: underline; }

        .med-expect-item {
          border-left: 3px solid #0f766e;
          padding-left: 1.25rem;
          margin-bottom: 1.25rem;
          transition: border-color 0.3s;
        }
        .med-expect-item:last-child { margin-bottom: 0; }
        .med-expect-item:hover { border-color: #0d6b64; }
        .med-expect-item .med-h3 { font-size: 0.85rem; font-weight: 600; color: #2B2A26; margin-bottom: 0.2rem; }
        .med-expect-item .med-body { font-size: 0.88rem; margin-bottom: 0; }

        .med-callout {
          padding: 1.25rem 1.5rem;
          background: #fff;
          border: 1px solid rgba(15,118,110,0.08);
          border-left: 4px solid #0f766e;
          border-radius: 12px;
          transition: all 0.3s;
        }
        .med-callout:hover {
          border-color: rgba(15,118,110,0.2);
          box-shadow: 0 4px 16px rgba(15,118,110,0.04);
        }
        .med-callout .med-body { margin: 0; }
        .med-callout .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-callout .med-body a:hover { text-decoration: underline; }

        .med-footer {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1.5rem;
          justify-content: center;
          padding: 2rem 0 4rem;
          border-top: 1px solid rgba(15,118,110,0.08);
          margin-top: 2rem;
        }
        .med-footer a {
          color: #0f766e;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.3s;
        }
        .med-footer a:hover { color: #0d6b64; text-decoration: underline; }

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
        .med-faq-summary::-webkit-details-marker { display: none; }
        .med-faq-summary:hover { background: rgba(15,118,110,0.02); }
        .med-faq-details[open] .med-faq-summary {
          background: rgba(15,118,110,0.03);
          border-bottom: 1px solid rgba(15,118,110,0.06);
        }
        .med-faq-question { flex: 1; }
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
              { name: 'Treks', href: '/treks' },
              { name: 'Summer Treks in Uttarakhand' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Summer Treks · Uttarakhand · May–June</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              While the plains bake above 40°C, the Himalayan trails of Uttarakhand sit between 10 and 20 degrees — green, clear, and open. May and June are the peak summer trekking months: snow has melted from the valleys, alpine meadows are blooming, rivers are full, and visibility across the high ranges is sharp. These are the months when the mountains are at their most accessible and their most alive.
            </p>
            <div className="med-hero-tags">
              <span>Har Ki Dun</span>
              <span>Kedarkantha</span>
              <span>Tiger Fall</span>
              <span>May–June</span>
            </div>
            <div className="med-hero-actions">
              <a href="#treks" className="med-cta-btn">View Treks</a>
              <a href="#why-summer" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Why Summer?</a>
            </div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="med-shell med-section-white med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <p className="med-body" style={{ marginBottom: 0 }}>
              Summer trekking is the opposite of <Link href="/treks/best-treks-in-uttarakhand/snow">winter treks in Uttarakhand</Link>. No snow gear. No sub-zero camps. No short daylight windows. Instead: long warm days, wildflower meadows, flowing streams, and trails that are dry, defined, and forgiving. If winter is about drama and challenge, summer is about depth and comfort — the landscape opens up, and you walk through it at a pace that allows you to actually see it.
            </p>
          </div>
        </section>

        <PrimaryCTA
          
          label="Plan My Summer Trek"
          subtext="Exploring summer treks? Let us help you find the right fit."
          vertical="trek"
          category="seasonal"
          sourcePath={PATH}
        />

        {/* ── WHY SUMMER ── */}
        <section id="why-summer" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Why Summer</span>
            </div>
            <h2 className="med-h2">Why Summer Is Ideal for <span>Treks in Uttarakhand</span></h2>
            <p className="med-body">
              Summer is the widest window for Himalayan trekking — not just because the weather is comfortable, but because the terrain itself becomes more navigable. Unlike winter treks, summer routes are largely snow-free below 3,500 metres — trails that are buried under snow from December to February are now clear. Valleys that are sealed by frozen rivers are open and walkable. The mountains do not change, but your access to them does.
            </p>

            <div className="med-why-item">
              <h3 className="med-h3">Snow-melt access</h3>
              <p className="med-body">By May, snow has cleared below 3,000 metres on most trails. This opens the full range of valley treks — including Har Ki Dun — that are inaccessible or snow-dependent in winter. Stream crossings are manageable in May and early June before monsoon swells them.</p>
            </div>
            <div className="med-why-item">
              <h3 className="med-h3">Clear mountain views</h3>
              <p className="med-body">Pre-monsoon air is often the clearest of the year. Morning visibility from ridges and high camps can extend beyond 200 kilometres — across the Swargarohini, Bandarpoonch, and Gangotri groups. The combination of clear air and long daylight makes summer the best season for mountain photography after post-monsoon autumn.</p>
            </div>
            <div className="med-why-item">
              <h3 className="med-h3">Comfortable temperatures</h3>
              <p className="med-body">Daytime temperatures at trekking altitude (2,000 to 3,500 metres) range from 10 to 22°C. Nights are cool but not cold — 2 to 10°C at camp. No thermal base layers needed during the day. A light fleece for mornings and evenings is sufficient. The physical comfort allows longer trail hours and more relaxed pacing.</p>
            </div>
            <div className="med-why-item" style={{ marginBottom: 0 }}>
              <h3 className="med-h3">Valley greenery</h3>
              <p className="med-body">This is the season when the Himalayas are most visually lush. Rhododendron blooms at lower elevations give way to alpine wildflowers above the tree line. The forest canopy is full and shading. Rivers run clear and blue before the monsoon muddies them. The landscape feels abundant in a way that no other season matches.</p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Summer Trek"
          subtext="Share your dates and preferences. We will recommend the best summer route."
          vertical="trek"
          category="seasonal"
          sourcePath={PATH}
        />

        {/* ── BEST SUMMER TREKS ── */}
        <section id="treks" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Treks</span>
            </div>
            <h2 className="med-h2">Best Summer Treks <span>in Uttarakhand</span></h2>
            <p className="med-body">Three treks define the summer season — each suited to a different duration, fitness level, and type of landscape experience.</p>

            {/* Har Ki Dun */}
            <div className="med-card med-summer-card">
              <span className="med-tag">Valley</span>
              <h3 className="med-h3"><Link href="/treks/location/sankri/har-ki-dun-trek">Har Ki Dun Trek — The Classic Summer Valley</Link></h3>
              <p className="med-body">
                The <Link href="/treks/location/sankri/har-ki-dun-trek">Har Ki Dun Trek</Link> is the definitive summer trek in Uttarakhand. Five to six days through the ancient Tons Valley — from the <Link href="/treks/location/sankri">Sankri trek base</Link> through traditional Himalayan villages, across wooden bridges over glacial streams, through dense forest and open meadow, and into the vast Har Ki Dun valley itself — a natural amphitheatre surrounded by 5,000-metre peaks.
              </p>
              <p className="med-body">
                In summer, the valley is green and flowering. The river runs clear. The meadows that are snow fields in winter become carpets of wildflowers in May and June. The trail is dry, well-defined, and comfortable to walk. This is Har Ki Dun at its most accessible and its most beautiful. The altitude stays below 3,600 metres throughout, and the gradient is gentle enough for <Link href="/treks/best-treks-in-uttarakhand/beginner">easy Himalayan treks</Link>. No technical sections. No snow gear. Just sustained walking through progressively more spectacular terrain.
              </p>
            </div>

            {/* Kedarkantha */}
            <div className="med-card med-summer-card">
              <span className="med-tag">Summit</span>
              <h3 className="med-h3"><Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha Trek — Early Summer Summit</Link></h3>
              <p className="med-body">
                The <Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha Trek</Link> is primarily a winter route, but early May offers a unique hybrid window. The lower trail (1,920 to 2,800 metres) is green — oak and pine forest in full canopy, rhododendrons blooming, birdsong filling the clearings. Above 3,200 metres, patchy snow remains on north-facing slopes and thickens near the 3,800-metre summit — giving you a snow summit experience without the full winter commitment.
              </p>
              <p className="med-body">
                By late May, the snow has largely melted and the trail becomes a green ridge walk with panoramic views. June is snow-free. The early-May window is the narrow sweet spot: warm enough for comfortable camping, cold enough for a snow summit, and clear enough for the full Himalayan panorama from the peak. Four days from <Link href="/treks/location/sankri">Sankri summer treks</Link>. Same guided format as winter, lighter gear requirements.
              </p>
            </div>

            {/* Tiger Fall */}
            <div className="med-card med-summer-card">
              <span className="med-tag">Weekend</span>
              <h3 className="med-h3"><Link href="/treks/location/chakrata/tiger-fall-trek">Tiger Fall Trek — Short Summer Escape</Link></h3>
              <p className="med-body">
                The <Link href="/treks/location/chakrata/tiger-fall-trek">Tiger Fall Trek in Chakrata</Link> is the lowest-commitment summer trek in the region. Twelve kilometres through dense deodar and oak forest to one of the area's highest direct waterfalls. The forest canopy keeps the trail shaded and cool even when May temperatures rise — the experience of walking through a natural air-conditioned corridor while plains cities swelter outside.
              </p>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Completable in a single day or a comfortable overnight format. Based in <Link href="/treks/location/chakrata">Chakrata</Link>, six to seven hours from Delhi. The waterfall volume builds through May and peaks in monsoon — late May and early June offer the best combination of trail conditions and waterfall flow. For <Link href="/treks/trek-near-delhi">weekend treks near Delhi</Link>, this is the most practical summer option.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHO SHOULD CHOOSE ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Who It's For</span>
            </div>
            <h2 className="med-h2">Who Should Choose <span>a Summer Trek?</span></h2>

            <div style={{ border: '1px solid rgba(15,118,110,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
              <div className="med-who-item">
                <span className="med-dot" />
                <p className="med-body"><strong>First-timers.</strong> Summer is the most forgiving season for a first Himalayan trek. Comfortable temperatures, dry trails, long daylight, and no snow gear requirements. The learning curve is gentler — you focus on walking, not on managing cold. If you have never trekked before, May or June is the time to start.</p>
              </div>
              <div className="med-who-item">
                <span className="med-dot" />
                <p className="med-body"><strong>Students.</strong> Summer vacation aligns perfectly with the trekking window. May and June are school and university holidays — the most practical months for student groups. Kedarkantha or Har Ki Dun in a guided group is affordable, social, and delivers an experience that no beach holiday or city break can match.</p>
              </div>
              <div className="med-who-item">
                <span className="med-dot" />
                <p className="med-body"><strong>Corporate groups.</strong> A summer trek is the most logistically simple team-building format. No cold-weather gear procurement, no layering complexity, no summit-day risk management. Chakrata works for weekend formats. Har Ki Dun works for immersive five-day programmes. The operational burden on organisers is lower in summer than any other season.</p>
              </div>
              <div className="med-who-item" style={{ borderBottom: 'none' }}>
                <span className="med-dot" />
                <p className="med-body"><strong>Couples.</strong> Long daylight, warm evenings, wildflower meadows, and mountain views without the austerity of winter. Summer treks are the most romantic format — campfire dinners under clear skies, sunrise from ridge camps, and the shared rhythm of walking through beautiful terrain without urgency.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT TO EXPECT ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">What to Expect</span>
            </div>
            <h2 className="med-h2">What to Expect <span>on a Summer Trek</span></h2>
            <p className="med-body">Summer trekking in the Himalayas is physically more comfortable than winter but has its own character. Knowing what to expect helps you prepare accurately.</p>

            <div className="med-expect-item">
              <h3 className="med-h3">Stream crossings</h3>
              <p className="med-body">Snow melt feeds the rivers and streams along the trail. In May, most crossings are manageable — ankle to knee depth on stepping stones or wooden bridges. By mid-June, water levels rise as monsoon approaches. Waterproof boots or sandals for crossings are recommended. Guided groups assess crossing conditions daily and adjust routes if needed.</p>
            </div>
            <div className="med-expect-item">
              <h3 className="med-h3">Warmer nights</h3>
              <p className="med-body">Summer camps are substantially more comfortable than winter. Temperatures at 3,000 metres hover around 3 to 8°C overnight — a light sleeping bag and fleece layer are sufficient. No need for down jackets or heavy insulation at camp. The evenings are pleasant enough for extended campfire time without retreating to tents.</p>
            </div>
            <div className="med-expect-item">
              <h3 className="med-h3">Longer daylight</h3>
              <p className="med-body">Approximately 13 hours of usable light in May and June. This means later starts (7:30 to 8 AM), longer trail breaks, and more time at viewpoints and water stops. Summit attempts do not require pre-dawn departures. The pace is inherently more relaxed than winter trekking.</p>
            </div>
            <div className="med-expect-item" style={{ marginBottom: 0 }}>
              <h3 className="med-h3">Alpine meadows</h3>
              <p className="med-body">Above the tree line (2,800 to 3,200 metres), the terrain opens into vast alpine meadows — known locally as bugiyals. In summer, these are carpeted with wildflowers: primula, potentilla, anemone, and dozens of species specific to the western Himalayas. The meadows are the visual highlight of summer trekking and unique to this season.</p>
            </div>
          </div>
        </section>

        {/* ── COMMERCIAL NAV ── */}
        <section className="med-shell med-section-alt med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-callout">
              <p className="med-body">
                Exploring all seasons, difficulty levels, and routes? See the full <Link href="/treks">Himalayan treks directory</Link> for guided itineraries across Uttarakhand.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">FAQ</span>
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
        <div className="med-footer">
          <Link href="/treks">← All Treks</Link>
          <Link href="/treks/best-treks-in-uttarakhand">Best Treks in Uttarakhand</Link>
          <Link href="/treks/best-treks-in-uttarakhand/snow">Winter Treks</Link>
          <Link href="/treks/location/sankri">Sankri Treks</Link>
          <Link href="/treks/location/chakrata">Chakrata Treks</Link>
        </div>

      </article>
    </TrackedPage>
  );
}
