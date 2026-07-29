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

const PATH = '/treks/trek-packages-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Trek Packages in Uttarakhand | Retreats And Treks',
    description:
      'Book Uttarakhand trek packages with guides, meals, permits, camping, and routes for beginners, groups, and solo trekkers across the Himalayas.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Himalayan Trek Packages in Uttarakhand',
      description:
        'All-inclusive Uttarakhand trek packages with certified guides, meals, permits, accommodation, and individual or group routes from Sankri and Chakrata.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Himalayan Trek Packages in Uttarakhand'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is included in a trekking package?',
    answer:
      'Our trek packages include a certified trek leader and support staff, all meals on the trail (breakfast, lunch, dinner, and snacks), accommodation (guesthouse, homestay, or camping depending on the route), forest permits and entry fees, basic safety gear (first-aid kit, emergency communication), and trekking equipment where required (tents, sleeping bags, cooking equipment). Porters or pack animals handle heavy gear. You carry only a daypack with personal essentials.',
  },
  {
    question: 'Are permits included in the package?',
    answer:
      'Yes. All forest permits, national park entry fees, and camping permissions are included in the package cost and arranged by the operator before departure. You do not need to apply for or carry any permits yourself. This includes the Govind National Park permit for Kedarkantha and Har Ki Dun, and the Chakrata forest range permissions for Tiger Fall and Budher Caves.',
  },
  {
    question: 'Do packages include transport from Delhi?',
    answer:
      'Transport from Delhi is available as an optional add-on for most packages. The standard package begins and ends at the trek base — Sankri or Chakrata. Delhi-to-base transport can be added as a shared vehicle (cost-effective for groups) or private vehicle (flexible scheduling). Some operators include transport in premium package tiers. Check availability when booking.',
  },
  {
    question: 'Is equipment provided?',
    answer:
      'Yes. Camping equipment — tents, sleeping bags, sleeping mats, and cooking gear — is provided as part of the package. For winter treks, gaiters, microspikes, and trekking poles are included. You need to bring personal clothing (layered for the season), trekking boots, a daypack, sunscreen, sunglasses, and a headlamp. A detailed gear checklist is provided after booking.',
  },
  {
    question: 'Can beginners book trek packages?',
    answer:
      'Yes. Most packages are designed for beginner-to-moderate fitness levels. Tiger Fall and Budher Caves in Chakrata require no prior trekking experience. Kedarkantha is the most popular first Himalayan trek in India — thousands of beginners complete it every season. The guided format means pace management, safety, navigation, and logistics are handled by the team. You focus on walking and enjoying the mountains.',
  },
  {
    question: 'What is the cancellation policy?',
    answer:
      'Cancellation policies vary by operator and season. Standard terms: full refund if cancelled 30 or more days before departure, 50 percent refund between 15 and 29 days, no refund within 14 days. Peak season bookings (December to January for Kedarkantha, May to June for Har Ki Dun) may have stricter terms due to high demand. Date changes are usually accommodated with advance notice. Trip insurance is recommended.',
  },
];

export default function TrekPackagesUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Trek Packages Uttarakhand', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Himalayan Trek Packages in Uttarakhand — All-Inclusive Guided Treks',
    description:
      'All-inclusive Uttarakhand trek packages with certified guides, meals, permits, accommodation, and individual or group routes from Sankri and Chakrata.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Himalayan Trek Packages in Uttarakhand".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Himalayan Trek Packages in Uttarakhand — All-Inclusive Guided Treks"
        description="All-inclusive Uttarakhand trek packages with certified guides, meals, permits, accommodation, and individual or group routes from Sankri and Chakrata."
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

        /* ── Package Card Styles ── */
        .med-package-card {
          padding: 1.5rem;
          border-top: 3px solid #0f766e;
          transition: all 0.35s ease;
          margin-bottom: 1.5rem;
        }
        .med-package-card:last-child { margin-bottom: 0; }
        .med-package-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(15,118,110,0.08);
        }
        .med-package-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-package-card .med-h3 a { color: #0f766e; font-weight: 600; text-decoration: none; transition: color 0.3s; }
        .med-package-card .med-h3 a:hover { color: #0d6b64; text-decoration: underline; }
        .med-package-card .med-body { font-size: 0.92rem; margin-bottom: 0.5rem; }
        .med-package-card .med-body:last-child { margin-bottom: 0; }
        .med-package-card .med-tag {
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

        .med-package-link {
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
        .med-package-link:hover { color: #0d6b64; text-decoration: underline; }

        /* ── Include Grid ── */
        .med-include-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          margin-top: 1.5rem;
        }
        @media (max-width: 720px) { .med-include-grid { grid-template-columns: 1fr; } }
        .med-include-card {
          padding: 1.25rem 1.5rem;
          border: 1px solid rgba(15,118,110,0.08);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        .med-include-card:hover {
          border-color: rgba(15,118,110,0.2);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(15,118,110,0.06);
        }
        .med-include-card .med-h3 { font-size: 0.9rem; margin-bottom: 0.3rem; }
        .med-include-card .med-body { font-size: 0.88rem; margin-bottom: 0; }

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
              { name: 'Trek Packages Uttarakhand' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>All-Inclusive · Guided · Uttarakhand</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              All-inclusive. Guided. Everything handled. Our Uttarakhand trekking packages cover the complete experience — certified trek leader, meals on trail, accommodation, forest permits, and safety equipment. You arrive at the base, walk, and the rest is managed.
            </p>
            <div className="med-hero-tags">
              <span>All-Inclusive</span>
              <span>Certified Guides</span>
              <span>Permits Included</span>
              <span>Beginners Welcome</span>
            </div>
            <div className="med-hero-actions">
              <a href="#packages" className="med-cta-btn">View Packages</a>
              <a href="#included" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>What's Included</a>
            </div>
          </div>
        </section>

        {/* ── INTRO ── */}
        <section className="med-shell med-section-white med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <p className="med-body" style={{ marginBottom: 0 }}>
              Packages range from single-day forest treks to multi-day summit routes. Duration, season, and group size determine the structure. Every package is designed to make Himalayan trekking accessible — regardless of prior experience.
            </p>
          </div>
        </section>

        <PrimaryCTA
          
          label="Plan My Trek Package"
          subtext="Looking for a guided package? Tell us what you need."
          vertical="trek"
          category="packages"
          sourcePath={PATH}
        />

        {/* ── WHAT IS INCLUDED ── */}
        <section id="included" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">What's Included</span>
            </div>
            <h2 className="med-h2">What Is Included in <span>Our Trek Packages?</span></h2>

            <div className="med-include-grid">
              <div className="med-card med-include-card">
                <h3 className="med-h3">Certified trek leader and support staff</h3>
                <p className="med-body">Every group is led by an experienced, locally certified guide with first-aid training and route expertise. Support staff handle camp setup, cooking, and porter coordination. The guide-to-trekker ratio stays below 1:8 for safety and pace management.</p>
              </div>
              <div className="med-card med-include-card">
                <h3 className="med-h3">Accommodation</h3>
                <p className="med-body">Guesthouse or homestay at base camp. High-quality alpine tents at trail camps. Sleeping bags and mats provided. The accommodation format depends on the route — Chakrata packages use homestays, Sankri packages combine guesthouses with trail camping.</p>
              </div>
              <div className="med-card med-include-card">
                <h3 className="med-h3">All meals</h3>
                <p className="med-body">Breakfast, lunch (packed or hot depending on trail logistics), dinner, and trail snacks. Meals are freshly prepared on trail by a dedicated cook. Vegetarian and non-vegetarian options available. Dietary requirements accommodated with advance notice.</p>
              </div>
              <div className="med-card med-include-card">
                <h3 className="med-h3">Permits and forest fees</h3>
                <p className="med-body">All necessary permits — Govind National Park entry, forest range permissions, camping permits — are pre-arranged and included. No paperwork or permit applications required from you.</p>
              </div>
              <div className="med-card med-include-card">
                <h3 className="med-h3">Basic safety gear</h3>
                <p className="med-body">First-aid kit, emergency communication equipment, and oxygen cylinder (for high-altitude routes). For winter treks: gaiters, microspikes, and trekking poles included.</p>
              </div>
              <div className="med-card med-include-card">
                <h3 className="med-h3">Transport (optional add-on)</h3>
                <p className="med-body">Delhi-to-base-camp transport is available as a shared or private vehicle add-on. The standard package begins and ends at the trek base. Self-drive and public transport options are also detailed in pre-departure information.</p>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Trek Package"
          subtext="Share your dates and group size. We will build the right package."
          vertical="trek"
          category="packages"
          sourcePath={PATH}
        />

        {/* ── POPULAR PACKAGES ── */}
        <section id="packages" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Popular Packages</span>
            </div>
            <h2 className="med-h2">Popular Trek Packages <span>in Uttarakhand</span></h2>

            <div className="med-card med-package-card">
              <span className="med-tag">Summit</span>
              <h3 className="med-h3"><Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha Trek Package</Link></h3>
              <p className="med-body">
                The <Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha summit trek</Link> is the most booked package in our portfolio. Standard format: 4 days, 3 nights from <Link href="/treks/location/sankri">Sankri trek base</Link>. Summit at 3,800 metres with 360-degree Himalayan panorama. Available in multiple itinerary options: the standard 4-day guided route with gradual acclimatisation, a 3-day compressed format for experienced trekkers, and a winter special (December to February) with enhanced cold-weather gear and snow support. Group packages available for corporate teams and student batches.
              </p>
            </div>

            <div className="med-card med-package-card">
              <span className="med-tag">Valley</span>
              <h3 className="med-h3"><Link href="/treks/location/sankri/har-ki-dun-trek">Har Ki Dun Trek Package</Link></h3>
              <p className="med-body">
                The <Link href="/treks/location/sankri/har-ki-dun-trek">Har Ki Dun valley trek</Link> is the premier valley trek package. 6 days, 5 nights through the Tons Valley to a glacial amphitheatre surrounded by 5,000-metre peaks. Best from April to June and September to November. The package includes village homestay stops, multiple camping locations with hot meals, and guided exploration of the valley floor. This is the immersive option — for trekkers who want sustained mountain time rather than a quick summit.
              </p>
            </div>

            <div className="med-card med-package-card">
              <span className="med-tag">Weekend</span>
              <h3 className="med-h3"><Link href="/treks/3-day-treks-uttarakhand">Tiger Fall &amp; Short Trek Packages</Link></h3>
              <p className="med-body">
                The <Link href="/treks/location/chakrata/tiger-fall-trek">Tiger Fall Trek in Chakrata</Link> and <Link href="/treks/location/chakrata/budher-caves-trek">Budher Caves Trek</Link> operate as <Link href="/treks/3-day-treks-uttarakhand">3-day treks in Uttarakhand</Link> from <Link href="/treks/location/chakrata">Chakrata trek base</Link>. The short-trek format — 2 nights, 3 days — includes homestay accommodation, guided forest trekking, and all meals. Ideal for first-time trekkers, corporate weekends, and couples. These are the lowest-commitment packages: no altitude concerns, no multi-day camping, and the shortest drive from Delhi. Available year-round with seasonal variations in trail conditions.
              </p>
            </div>
          </div>
        </section>

        {/* ── COST STRUCTURE ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Pricing</span>
            </div>
            <h2 className="med-h2">How Much Do Trek <span>Packages Cost?</span></h2>
            <p className="med-body">Package pricing depends on four factors, and understanding them helps you compare options accurately.</p>

            <div className="med-why-item">
              <h3 className="med-h3">Duration</h3>
              <p className="med-body">Longer treks cost more — additional days mean additional camping, meals, guide days, and permit costs. A 3-day Chakrata package costs significantly less than a 6-day Har Ki Dun package.</p>
            </div>
            <div className="med-why-item">
              <h3 className="med-h3">Group size</h3>
              <p className="med-body">Per-person cost decreases with larger groups. Shared guide fees, transport, and camp logistics make group bookings more cost-effective. Solo and couple bookings join scheduled group departures at standard per-person rates.</p>
            </div>
            <div className="med-why-item">
              <h3 className="med-h3">Season</h3>
              <p className="med-body">Peak-season packages — <Link href="/treks/best-treks-in-uttarakhand/snow">winter treks in Uttarakhand</Link> (December to January) and <Link href="/treks/summer-treks-uttarakhand">summer treks in Uttarakhand</Link> (May to June) — carry higher demand and may include premium pricing. Shoulder seasons (October to November, February to March) often offer the best value-to-experience ratio.</p>
            </div>
            <div className="med-why-item" style={{ marginBottom: 0 }}>
              <h3 className="med-h3">Transport inclusion</h3>
              <p className="med-body">Base-camp-only packages are the most affordable. Adding Delhi-to-base transport (shared vehicle) increases cost moderately. Private vehicle transport is the premium option. Self-drive trekkers can save by handling their own transport.</p>
            </div>

            <p className="med-body" style={{ marginTop: '1.5rem' }}>
              For current pricing on specific routes and dates, contact us directly with your preferred trek, dates, and group size. We provide transparent, itemised quotes with no hidden charges.
            </p>
          </div>
        </section>

        {/* ── WHO SHOULD BOOK ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Who It's For</span>
            </div>
            <h2 className="med-h2">Who Should Book <span>a Trek Package?</span></h2>

            <div style={{ border: '1px solid rgba(15,118,110,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
              <div className="med-who-item">
                <span className="med-dot" />
                <p className="med-body"><strong>Solo travellers.</strong> Join a scheduled group departure. You trek with a small group, share meals and camps, and have guided support throughout. No solo navigation, no solo logistics. Many trekkers meet lifelong friends on group departures.</p>
              </div>
              <div className="med-who-item">
                <span className="med-dot" />
                <p className="med-body"><strong>First-time trekkers.</strong> A guided package is the safest and most enjoyable way to start. Everything is handled — you focus on the experience. See our <Link href="/treks/best-treks-in-uttarakhand/beginner">beginner treks in Uttarakhand</Link> guide for route recommendations.</p>
              </div>
              <div className="med-who-item">
                <span className="med-dot" />
                <p className="med-body"><strong>Corporate groups.</strong> Custom packages for team-building treks — Chakrata for weekends, Kedarkantha for immersive programmes. Dedicated guides, group accommodation, and logistics coordination included. We handle the operational complexity so your team focuses on the experience.</p>
              </div>
              <div className="med-who-item" style={{ borderBottom: 'none' }}>
                <span className="med-dot" />
                <p className="med-body"><strong>Student groups.</strong> Budget-optimised packages for college and university groups. Group rates, shared transport, and structured itineraries that balance challenge with safety. Ideal during vacation windows (May to June, October).</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMMERCIAL NAV ── */}
        <section className="med-shell med-section-alt med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-callout">
              <p className="med-body">
                Exploring routes before booking? See the full <Link href="/treks">Himalayan treks directory</Link> for detailed itineraries across all seasons and difficulty levels.
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
          <Link href="/treks/garhwal-himalayas">Garhwal Himalayas</Link>
          <Link href="/treks/location/sankri">Sankri Treks</Link>
          <Link href="/treks/location/chakrata">Chakrata Treks</Link>
        </div>

      </article>
    </TrackedPage>
  );
}
