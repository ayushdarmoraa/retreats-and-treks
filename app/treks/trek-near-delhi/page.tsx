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

const PATH = '/treks/trek-near-delhi';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Treks Near Delhi | Retreats And Treks',
    description:
      'Find the best treks near Delhi in Chakrata and Sankri, with weekend-friendly Himalayan trails, guided itineraries, and forest routes.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Best Treks Near Delhi for a Weekend Escape',
      description:
        'Weekend Himalayan treks within driving distance of Delhi. Chakrata and Sankri — forest trails, ridge walks and guided itineraries for 2–3 day trips.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Best Treks Near Delhi for a Weekend Escape'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is the closest Himalayan trek to Delhi?',
    answer:
      'Chakrata offers the closest Himalayan trekking from Delhi at six to seven hours by road via Dehradun. The Chakrata Weekend Trek is a two-night, three-day itinerary covering forest trails, meadows, and ridge campsites at 2,100 metres. It requires no prior trekking experience and is the most practical option for a standard Friday-to-Sunday window.',
  },
  {
    question: 'Can I complete a Himalayan trek in 2 days from Delhi?',
    answer:
      'Yes. A Friday evening departure from Delhi places you in Chakrata by midnight. Saturday is a full trekking day — forest trails, ridge walks, and campsite overnight. Sunday morning offers a short closing hike before the return drive. The two-day format works best with Chakrata because the travel time is manageable and the trail difficulty is beginner-friendly. Sankri requires a longer drive, making a two-day format tight without an extended weekend.',
  },
  {
    question: 'Are treks near Delhi beginner-friendly?',
    answer:
      'Chakrata treks are fully beginner-friendly. Trails stay between 1,800 and 2,400 metres — no altitude sickness concerns, no glacier crossings, no technical sections. The terrain is forested ridge walking on well-defined paths. Guided itineraries include safety briefings, pace management, and support. Sankri treks like Kedarkantha are moderate and suit fit beginners with some preparation. Neither requires prior Himalayan experience.',
  },
  {
    question: 'What is the best time for treks near Delhi?',
    answer:
      'October to November and February to April are the strongest windows. Clear skies, moderate temperatures, and dry trails. Spring brings wildflowers and birdsong. Autumn offers the sharpest Himalayan visibility. Summer (May to June) works for Chakrata — it stays cool while Delhi temperatures climb past 40°C. Sankri is best from April through November. Winter treks are possible in Chakrata with occasional snow, and Kedarkantha is a premier winter snow trek from December to March.',
  },
  {
    question: 'Is Sankri feasible for a weekend trek from Delhi?',
    answer:
      'Sankri is eight to nine hours from Delhi by road, which makes a standard Friday-to-Sunday weekend tight. It works well for extended weekends, three-day holidays, or if you can depart Thursday evening. The most popular Sankri trek — Kedarkantha — is a four-to-five-day itinerary, not a weekend format. For a true two-day weekend trek, Chakrata is the more practical choice. Save Sankri for when you have three or more days.',
  },
];

export default function TrekNearDelhiPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Treks Near Delhi', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Treks Near Delhi for a Weekend Escape',
    description:
      'Weekend Himalayan treks within driving distance of Delhi. Chakrata and Sankri — forest trails, ridge walks and guided itineraries for 2–3 day trips.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Best Treks Near Delhi for a Weekend Escape".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Best Treks Near Delhi for a Weekend Escape"
        description="Weekend Himalayan treks within driving distance of Delhi. Chakrata and Sankri — forest trails, ridge walks and guided itineraries for 2–3 day trips."
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

        /* ── Distance Cards ── */
        .med-distance-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-top: 1.5rem;
        }
        @media (max-width: 720px) { .med-distance-grid { grid-template-columns: 1fr; } }
        .med-distance-card {
          padding: 1.25rem 1.5rem;
          border: 1px solid rgba(15,118,110,0.08);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        .med-distance-card:hover {
          border-color: rgba(15,118,110,0.2);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(15,118,110,0.06);
        }
        .med-distance-card .med-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0f766e;
          display: block;
          margin-bottom: 0.25rem;
        }
        .med-distance-card .med-time {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: 1.1rem;
          font-weight: 500;
          color: #2B2A26;
          display: block;
          margin-bottom: 0.3rem;
        }
        .med-distance-card .med-body { font-size: 0.85rem; margin-bottom: 0; }

        /* ── Trek Cards ── */
        .med-trek-card {
          padding: 1.5rem;
          border-top: 3px solid #0f766e;
          transition: all 0.35s ease;
          margin-bottom: 1.5rem;
        }
        .med-trek-card:last-child { margin-bottom: 0; }
        .med-trek-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(15,118,110,0.08);
        }
        .med-trek-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-trek-card .med-h3 a { color: #0f766e; font-weight: 600; text-decoration: none; transition: color 0.3s; }
        .med-trek-card .med-h3 a:hover { color: #0d6b64; text-decoration: underline; }
        .med-trek-card .med-body { font-size: 0.92rem; margin-bottom: 0.5rem; }
        .med-trek-card .med-body:last-child { margin-bottom: 0; }
        .med-trek-card .med-tag {
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

        .med-trek-link {
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
        .med-trek-link:hover { color: #0d6b64; text-decoration: underline; }

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

        .med-season-card {
          padding: 1rem 1.25rem;
          border: 1px solid rgba(15,118,110,0.06);
          border-radius: 12px;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
        }
        .med-season-card:last-child { margin-bottom: 0; }
        .med-season-card:hover {
          border-color: rgba(15,118,110,0.2);
          transform: translateX(4px);
        }
        .med-season-card .med-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          color: #0f766e;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.2rem;
        }
        .med-season-card .med-body { font-size: 0.88rem; margin-bottom: 0; }

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
              { name: 'Treks Near Delhi' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Weekend Treks · Near Delhi · Uttarakhand</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Six to nine hours by road separates Delhi from genuine Himalayan trekking. That is a Friday evening departure, a Saturday on mountain trails, and a Sunday return — no annual leave, no flights, no multi-day logistics. The Uttarakhand foothills hold forest trails, ridge walks, waterfall approaches, and summit routes within a weekend driving radius that most Delhi professionals underestimate.
            </p>
            <div className="med-hero-tags">
              <span>6–7 hrs: Chakrata</span>
              <span>8–9 hrs: Sankri</span>
              <span>Weekend-Friendly</span>
              <span>No Experience Needed</span>
            </div>
            <div className="med-hero-actions">
              <a href="#treks" className="med-cta-btn">View Treks</a>
              <a href="#distance" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>How Far?</a>
            </div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="med-shell med-section-white med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <p className="med-body" style={{ marginBottom: 0 }}>
              The question is not whether a weekend trek from Delhi is feasible. It is which trail matches your fitness, your group, and the hours you have. Two destinations dominate this radius: Chakrata for accessible forest trekking and Sankri for deeper mountain immersion. Both deliver genuine Himalayan terrain without the overhead of a week-long expedition.
            </p>
          </div>
        </section>

        <PrimaryCTA
          
          label="Plan My Weekend Trek"
          subtext="Planning a weekend trek from Delhi? We can help."
          vertical="trek"
          category="near-delhi"
          sourcePath={PATH}
        />

        {/* ── DISTANCE ── */}
        <section id="distance" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Distance from Delhi</span>
            </div>
            <h2 className="med-h2">How Close Are These Treks <span>to Delhi?</span></h2>
            <p className="med-body">Realistic drive times from central Delhi on a Friday evening — not best-case estimates, but traffic-adjusted numbers.</p>

            <div className="med-distance-grid">
              <div className="med-card med-distance-card">
                <span className="med-label">Chakrata</span>
                <span className="med-time">6–7 hrs</span>
                <p className="med-body">Via Delhi–Dehradun highway. Arrive Friday night, trek all Saturday. The practical weekend default.</p>
              </div>
              <div className="med-card med-distance-card">
                <span className="med-label">Sankri</span>
                <span className="med-time">8–9 hrs</span>
                <p className="med-body">Via Dehradun and Purola. Tight for a standard weekend — best with Thursday evening departure.</p>
              </div>
              <div className="med-card med-distance-card">
                <span className="med-label">Munsiyari</span>
                <span className="med-time">10–12 hrs</span>
                <p className="med-body">Deep Kumaon. Not a weekend option — four-day minimum destination. Plan accordingly.</p>
              </div>
            </div>

            <p className="med-body" style={{ marginTop: '1rem' }}>
              All destinations are accessible by private car or shared cab. The Delhi–Dehradun Shatabdi train is a practical alternative for the first leg — four-and-a-half hours to Dehradun, then a taxi onward. No flights required.
            </p>
          </div>
        </section>

        {/* ── BEST WEEKEND TREKS ── */}
        <section id="treks" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Treks</span>
            </div>
            <h2 className="med-h2">Best Weekend Treks <span>Near Delhi</span></h2>
            <p className="med-body">Two locations account for the strongest weekend trekking from Delhi. Each serves a different fitness level, time budget, and mountain experience.</p>

            {/* Chakrata */}
            <div className="med-card med-trek-card">
              <span className="med-tag">Weekend Default</span>
              <h3 className="med-h3"><Link href="/treks/location/chakrata">Chakrata Treks (6–7 Hours from Delhi)</Link></h3>
              <p className="med-body">
                Chakrata sits at 2,200 metres on a deodar-covered ridge in Dehradun district. The trekking here is forest-based: mid-altitude trails between 1,800 and 2,400 metres through dense canopy, limestone formations, and open meadows. No glacier crossings, no snow-line scrambles, no altitude acclimatisation needed. This is Himalayan trekking at walking pace — accessible to anyone with basic fitness.
              </p>
              <p className="med-body">
                The <Link href="/treks/location/chakrata/weekend-trek">Chakrata Weekend Trek</Link> is the flagship route — a two-night, three-day itinerary covering 8 km of forest trails, grassland meadows, and ridge campsites. No prior trekking experience required. Pickup from Dehradun makes it logistically effortless. This is the single best option for a first Himalayan trek from Delhi.
              </p>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Beyond the weekend route, the <Link href="/treks/location/chakrata/tiger-fall-trek">Tiger Fall Trek</Link> leads to one of the region's highest direct waterfalls — 12 km through dense forest to a natural pool. Best in monsoon and post-monsoon months when water volume peaks. The <Link href="/treks/location/chakrata/budher-caves-trek">Budher Caves Trek</Link> offers a rare combination of forest walking and underground exploration through ancient limestone cave systems. Both are day-trek or overnight formats that fit a weekend window.
              </p>
            </div>

            {/* Sankri */}
            <div className="med-card med-trek-card">
              <span className="med-tag">Extended Weekend</span>
              <h3 className="med-h3"><Link href="/treks/location/sankri">Sankri Treks (8–9 Hours from Delhi)</Link></h3>
              <p className="med-body">
                Sankri sits in the upper Tons Valley near the Govind Wildlife Sanctuary — deeper into the mountains, at the edge of the treeline. The trekking here is more demanding: higher altitude, longer trails, and terrain that shifts from pine forest to alpine meadow to snow above the treeline.
              </p>
              <p className="med-body">
                The <Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha Trek</Link> is the headline route — a four-to-five-day summit trek reaching 3,800 metres with panoramic views of the Swargarohini, Bandarpoonch, and Black Peak ranges. It is one of India's most popular winter treks (December to March) when the trail is snow-covered. Not a weekend format, but the defining reason to plan an extended trip from Delhi to Sankri.
              </p>
              <p className="med-body" style={{ marginBottom: 0 }}>
                The <Link href="/treks/location/sankri/har-ki-dun-trek">Har Ki Dun Trek</Link> follows the ancient Tons Valley into a glacial cradle — five to six days through some of the most pristine forest and meadow terrain in Uttarakhand. Both <Link href="/treks/location/sankri">Sankri treks</Link> require more time than a standard weekend but reward the investment with mountain experiences that shorter routes cannot match.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHAT MAKES WEEKEND FRIENDLY ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Format</span>
            </div>
            <h2 className="med-h2">What Makes a Trek <span>"Weekend Friendly"?</span></h2>
            <p className="med-body">Not every Himalayan trek fits a Friday-to-Sunday window. Four factors determine weekend feasibility.</p>

            <div className="med-why-item">
              <h3 className="med-h3">Drive time under 8 hours</h3>
              <p className="med-body">Beyond that, you lose too much of Saturday to travel. Chakrata's six-to-seven-hour range is the sweet spot — arrive Friday night, trek all Saturday, depart Sunday.</p>
            </div>
            <div className="med-why-item">
              <h3 className="med-h3">Trail length under 15 km total</h3>
              <p className="med-body">A weekend trek needs to be completable in one full trekking day plus a short morning session. Eight to twelve kilometres across two days is the practical range. Longer routes require three or more trekking days.</p>
            </div>
            <div className="med-why-item">
              <h3 className="med-h3">Elevation below 3,000 metres</h3>
              <p className="med-body">Higher-altitude treks require acclimatisation days that a weekend does not allow. Staying below 2,500 metres — as Chakrata treks do — eliminates altitude sickness risk entirely.</p>
            </div>
            <div className="med-why-item" style={{ marginBottom: 0 }}>
              <h3 className="med-h3">Logistical simplicity</h3>
              <p className="med-body">Pickup from a transport hub (Dehradun station or airport), pre-arranged camping or lodge accommodation, and a guided itinerary that handles navigation. The less planning you need to do, the more repeatable the weekend format becomes.</p>
            </div>
          </div>
        </section>

        {/* ── WHO SHOULD CHOOSE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Who It's For</span>
            </div>
            <h2 className="med-h2">Who Should Choose <span>a Trek Near Delhi</span></h2>

            <div style={{ border: '1px solid rgba(15,118,110,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
              <div className="med-who-item">
                <span className="med-dot" />
                <p className="med-body"><strong>First-time trekkers.</strong> Chakrata is the ideal entry point — no experience required, no extreme fitness demands, and professional guides who manage pace and safety. A weekend trek here builds the confidence and conditioning for longer expeditions later.</p>
              </div>
              <div className="med-who-item">
                <span className="med-dot" />
                <p className="med-body"><strong>Corporate groups.</strong> Team offsites in the mountains deliver more bonding than another conference room. A guided weekend trek — shared physical challenge, campfire meals, ridge-top views — creates team cohesion that structured workshops rarely achieve.</p>
              </div>
              <div className="med-who-item">
                <span className="med-dot" />
                <p className="med-body"><strong>Couples.</strong> A shared mountain weekend without tourist crowds or resort distractions. Trekking together in forest silence, camping under stars, cooking over fire — this is a different quality of shared experience.</p>
              </div>
              <div className="med-who-item" style={{ borderBottom: 'none' }}>
                <span className="med-dot" />
                <p className="med-body"><strong>Solo travellers.</strong> Joining a guided group trek is the easiest way for solo travellers to access the Himalayas safely. You get the mountain experience without the logistics of planning a solo expedition.</p>
              </div>
            </div>

            <p className="med-body" style={{ marginTop: '1.5rem' }}>
              Looking for restoration rather than trail time? Our <Link href="/retreats/retreats-near-delhi">Himalayan retreats near Delhi</Link> guide covers yoga, meditation, and wellness programmes within the same driving radius.
            </p>
          </div>
        </section>

        {/* ── BEST SEASON ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Best Season</span>
            </div>
            <h2 className="med-h2">Best Season for <span>Treks Near Delhi</span></h2>

            <div className="med-season-card">
              <span className="med-label">October – November</span>
              <p className="med-body">Peak trekking window. Post-monsoon air is crystal clear, temperatures are comfortable (10–22°C depending on altitude), and trails are dry with firm footing. Himalayan visibility is at its best — ridge walks in Chakrata offer sightlines to Bandarpoonch and the greater ranges. Strongest recommendation for first-time trekkers.</p>
            </div>
            <div className="med-season-card">
              <span className="med-label">February – April</span>
              <p className="med-body">Spring brings wildflowers, birdsong, and warming temperatures. Rhododendrons bloom at higher elevations in March and April. Trails are well-defined and the forest canopy is alive.</p>
            </div>
            <div className="med-season-card">
              <span className="med-label">May – June</span>
              <p className="med-body">Summer trekking season. Chakrata stays cool (15–25°C) while Delhi temperatures climb past 40°C. The altitude provides natural heat escape. Trails are dry but the forest shade keeps the walking comfortable.</p>
            </div>
            <div className="med-season-card">
              <span className="med-label">July – September</span>
              <p className="med-body">Monsoon. Tiger Fall in Chakrata is at its most spectacular — thundering cascade and lush forest. But trails are slippery, leeches are present, and river crossings can be unpredictable. Experienced trekkers only.</p>
            </div>
            <div className="med-season-card" style={{ marginBottom: 0 }}>
              <span className="med-label">December – March</span>
              <p className="med-body">Winter. Chakrata receives occasional snowfall — beautiful but requires cold-weather preparedness. Kedarkantha in Sankri becomes a premier snow trek in this window, drawing trekkers specifically for the snow-covered summit experience.</p>
            </div>
          </div>
        </section>

        {/* ── COMMERCIAL NAV ── */}
        <section className="med-shell med-section-white med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-callout">
              <p className="med-body">
                Exploring all trekking options? See the full <Link href="/treks">Himalayan treks directory</Link> for guided itineraries across all locations, difficulty levels, and durations.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
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
          <Link href="/treks/location/chakrata">Chakrata Treks</Link>
          <Link href="/treks/location/sankri">Sankri Treks</Link>
          <Link href="/treks/trek-near-delhi">Weekend Treks Near Delhi</Link>
        </div>

      </article>
    </TrackedPage>
  );
}
