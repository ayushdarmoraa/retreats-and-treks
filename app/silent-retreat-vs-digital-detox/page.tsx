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

const PATH = '/silent-retreat-vs-digital-detox';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Silent Retreat vs Digital Detox | Retreats And Treks',
    description:
      'Silent retreat vs digital detox: compare structure, benefits, who each format serves, and how to choose the right reset for your situation.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Silent Retreat vs Digital Detox — Which Do You Need?',
      description: 'Silent retreat or digital detox? A clear comparison to help you choose the right format.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Silent Retreat vs Digital Detox — Which Do You Need?'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Is a digital detox the same as a silent retreat?',
    answer:
      'No. A digital detox removes devices and screens. A silent retreat removes speech, social interaction, and often reading and writing as well. Digital detox retreats may include conversation, group activities, and nature excursions. Silent retreats involve sustained meditation practice in periods of complete verbal silence. The digital detox addresses screen dependency. The silent retreat addresses the deeper layer — the mind\'s dependency on all forms of external stimulation.',
  },
  {
    question: 'Which is easier — a digital detox or a silent retreat?',
    answer:
      'A digital detox is generally easier because you retain social connection, conversation, and activity. The challenge is limited to device withdrawal, which typically resolves within 48 hours. A silent retreat removes more layers of stimulation, which can surface deeper psychological material. For a first experience, a digital detox retreat provides a gentler entry.',
  },
  {
    question: 'Can I do a digital detox and silent retreat at the same time?',
    answer:
      'All of our silent retreats are inherently digital detoxes — devices are surrendered at the beginning. But a digital detox retreat is not necessarily silent. If you want the full experience of both, a silent retreat provides it. If you want device-free time with the option to talk and socialise, a dedicated digital detox retreat is the better choice.',
  },
  {
    question: 'How long should a digital detox retreat be?',
    answer:
      'Three days is the minimum for meaningful neurological reset. Research shows that the dopamine system, sleep architecture, and attentional capacity begin to normalise after 48–72 hours without screens. A 7-day retreat produces deeper restoration. For severe screen dependency (8+ hours daily), longer formats provide more lasting results.',
  },
  {
    question: 'Will I get withdrawal symptoms without my phone?',
    answer:
      'Yes, for most people. Phantom vibrations, compulsive pocket-checking, anxiety about missing messages, and boredom are universal in the first 24–48 hours. These symptoms are real — they reflect neurological dependency on intermittent dopamine stimulation. They pass. By day three, most participants report a clarity and calm they did not know was available to them.',
  },
];

export default function SilentRetreatVsDigitalDetoxPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Silent Retreats', url: buildCanonicalUrl('/silent-retreats') },
    { name: 'Silent Retreat vs Digital Detox', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Silent Retreat vs Digital Detox — Which Do You Need?',
    description: 'A comparison of silent retreats and digital detox retreats to help you choose the right format.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Silent Retreat vs Digital Detox: Which Do You Actually Need?".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Silent Retreat vs Digital Detox — Which Do You Need?"
        description="Silent retreat or digital detox? A clear comparison to help you choose the right format."
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
        .med-section-dark { background: #0a1f1c; color: #fff; }

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

        .med-section-dark .med-eyebrow-text { color: rgba(255,255,255,0.6); }
        .med-section-dark .med-eyebrow-line { background: rgba(255,255,255,0.3); }
        .med-section-dark .med-h2 { color: #fff; }
        .med-section-dark .med-h2 span { color: #5eead4; }
        .med-section-dark .med-body { color: rgba(255,255,255,0.7); }

        /* ── Premium Comparison Table ── */
        .med-compare-wrap {
          border-radius: 18px;
          border: 1px solid rgba(15,118,110,0.12);
          overflow: hidden;
          margin-top: 1.5rem;
        }
        .med-compare-table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.9rem;
        }
        .med-compare-table th {
          text-align: left;
          padding: 1rem 1.25rem;
          background: #f7f9f7;
          border-bottom: 2px solid #0f766e;
          font-weight: 600;
          color: #2B2A26;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .med-compare-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(15,118,110,0.06);
          color: #4b5259;
          line-height: 1.6;
        }
        .med-compare-table tr:last-child td { border-bottom: none; }
        .med-compare-table tr:hover td { background: #f7f9f7; }
        .med-compare-table .med-dim { font-weight: 600; color: #2B2A26; }

        /* ── Premium Choice Cards ── */
        .med-choice-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        @media (max-width: 720px) { .med-choice-grid { grid-template-columns: 1fr; } }
        .med-choice-card {
          padding: 2rem;
          position: relative;
        }
        .med-choice-card .med-badge {
          display: inline-block;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0f766e;
          background: rgba(15,118,110,0.08);
          padding: 0.3rem 0.8rem;
          border-radius: 999px;
          margin-bottom: 0.75rem;
        }
        .med-choice-card .med-h3 { font-size: 1.1rem; margin-bottom: 0.5rem; }
        .med-choice-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-choice-list {
          list-style: none;
          padding: 0;
          margin: 0.75rem 0 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .med-choice-list li {
          display: flex;
          gap: 0.6rem;
          align-items: flex-start;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          line-height: 1.6;
          color: #4b5259;
        }
        .med-choice-list li::before {
          content: '✓';
          color: #0f766e;
          font-weight: 700;
          flex-shrink: 0;
        }
        .med-choice-list li a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-choice-list li a:hover { text-decoration: underline; }

        /* ── Premium Feature Section ── */
        .med-feature-box {
          background: #f7f9f7;
          border: 1px solid rgba(15,118,110,0.06);
          border-radius: 18px;
          padding: 2.5rem;
          margin-top: 1.5rem;
          position: relative;
          overflow: hidden;
        }
        .med-feature-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #0f766e;
        }
        .med-feature-box .med-h3 { font-size: 1.15rem; margin-bottom: 0.3rem; }
        .med-feature-box .med-body { font-size: 0.95rem; margin-bottom: 0; }

        /* ── Dark feature box ── */
        .med-feature-dark {
          background: #0a1f1c;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 2.5rem;
          margin-top: 1.5rem;
          position: relative;
          overflow: hidden;
          color: #fff;
        }
        .med-feature-dark::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #5eead4;
        }
        .med-feature-dark .med-h3 { color: #fff; font-size: 1.15rem; margin-bottom: 0.3rem; }
        .med-feature-dark .med-body { color: rgba(255,255,255,0.75); font-size: 0.95rem; margin-bottom: 0; }
        .med-feature-dark .med-body strong { color: #5eead4; }

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
          transition: border-color 0.3s ease;
        }
        .med-faq-details:hover { border-color: rgba(15,118,110,0.25); }
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
        .med-faq-summary:hover { background: rgba(15,118,110,0.03); }
        .med-faq-details[open] .med-faq-summary {
          background: rgba(15,118,110,0.04);
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
        .med-faq-icon svg {
          width: 20px;
          height: 20px;
          stroke-width: 2;
          transition: stroke-width 0.2s ease;
        }
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

        .med-vs-footer {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1.5rem;
          justify-content: center;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(15,118,110,0.08);
        }
        .med-vs-footer a {
          color: #0f766e;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
        }
        .med-vs-footer a:hover { text-decoration: underline; }
        .med-vs-footer .divider { color: #d1d5db; }

        .med-section-dark .med-card {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.08);
        }
        .med-section-dark .med-card .med-h3 { color: #fff; }
        .med-section-dark .med-card .med-body { color: rgba(255,255,255,0.7); }
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
              { name: 'Silent Retreats', href: '/silent-retreats' },
              { name: 'Silent Retreat vs Digital Detox' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Honest Comparison</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Both involve stepping away from the noise. Both promise a reset. But they work on different layers of the problem. A digital detox addresses your relationship with technology. A silent retreat addresses your relationship with your own mind. Here is how to know which one you need — or whether you need both.
            </p>
            <div className="med-hero-tags">
              <span>Digital Detox</span>
              <span>Silent Retreat</span>
              <span>Compare</span>
              <span>Choose Wisely</span>
            </div>
            <div className="med-hero-actions">
              <a href="#comparison" className="med-cta-btn">View Comparison</a>
              <a href="#choose" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Which One?</a>
            </div>
          </div>
        </section>

        {/* ── DIGITAL DETOX ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Format 01</span>
            </div>
            <h2 className="med-h2">What a Digital Detox <span>Retreat Provides</span></h2>
            <div className="med-feature-box">
              <p className="med-body">
                A digital detox retreat removes screens, devices, and digital connectivity. You surrender your phone at the beginning and get it back at the end. The goal is to break the cycle of compulsive screen use, restore attentional capacity, and reconnect with offline experience.
              </p>
              <p className="med-body" style={{ marginTop: '0.75rem' }}>
                During a digital detox, you typically retain the ability to speak, socialise, and participate in group activities. Programmes often include nature walks, journaling, group discussions, creative activities, and unstructured free time. The experience is social and active — you are disconnecting from devices, not from people.
              </p>
              <p className="med-body" style={{ marginTop: '0.75rem' }}>
                Read <Link href="/a-week-without-my-phone-digital-detox" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>one participant's account of a week-long digital detox</Link> for the raw experience. See <Link href="/digital-detox-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>digital detox retreat programmes</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* ── SILENT RETREAT ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Format 02</span>
            </div>
            <h2 className="med-h2">What a Silent <span>Retreat Provides</span></h2>
            <div className="med-feature-box">
              <p className="med-body">
                A silent retreat removes speech, social interaction, reading, writing, and all digital input. Noble silence means no talking, no eye contact, no gestures. You spend extended periods in seated meditation, walking practice, and stillness.
              </p>
              <p className="med-body" style={{ marginTop: '0.75rem' }}>
                The silence goes deeper than a digital detox because it removes the next layer of stimulation: language itself. Without the ability to narrate, explain, or communicate your experience, you encounter the mind in its raw state. This is where the profound psychological shifts occur — the ones described in <Link href="/what-happens-to-your-mind-in-silence" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>the neuroscience of silence</Link>.
              </p>
              <p className="med-body" style={{ marginTop: '0.75rem' }}>
                Read <Link href="/what-i-learned-from-a-silent-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>what one person learned during five days of silence</Link>. See <Link href="/silent-retreats" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>silent retreat programmes</Link>.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Help Me Choose"
          subtext="Not sure which format is right? Tell us what you're dealing with — we'll be honest about what will help."
          vertical="retreat"
          category="silence-vs-detox"
          sourcePath={PATH}
        />

        {/* ── COMPARISON TABLE ── */}
        <section id="comparison" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Comparison</span>
            </div>
            <h2 className="med-h2">Side-by-Side <span>Comparison</span></h2>

            <div className="med-compare-wrap">
              <table className="med-compare-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Digital Detox</th>
                    <th>Silent Retreat</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['What is removed', 'Screens and devices', 'Speech, devices, reading, social interaction'],
                    ['Social contact', 'Maintained — conversation and group activities', 'Removed — noble silence'],
                    ['Primary practice', 'Nature, journaling, unstructured time', 'Seated meditation, walking practice, stillness'],
                    ['Psychological depth', 'Moderate — addresses screen dependency', 'Deep — addresses mental habits and emotional patterns'],
                    ['Difficulty', 'Moderate — device withdrawal peaks at 48 hours', 'High — silence reveals deeper layers of discomfort'],
                    ['Best duration', '3–7 days', '3–10 days'],
                    ['Who it suits', 'Anyone with screen fatigue or attention fragmentation', 'Those seeking deep inner work and nervous system reset'],
                    ['Preparation needed', 'Minimal', 'Some — see preparation guide'],
                  ].map(([dim, detox, silent]) => (
                    <tr key={dim}>
                      <td className="med-dim">{dim}</td>
                      <td>{detox}</td>
                      <td>{silent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── CHOOSE DIGITAL DETOX ── */}
        <section id="choose" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Decision Guide</span>
            </div>
            <h2 className="med-h2">Choose a Digital Detox <span>When…</span></h2>

            <div className="med-choice-grid">
              <div className="med-card med-choice-card">
                <span className="med-badge">Digital Detox</span>
                <h3 className="med-h3">You Need Device Freedom</h3>
                <ul className="med-choice-list">
                  <li>Your primary issue is screen time, phone dependency, or attention fragmentation</li>
                  <li>You want to disconnect from devices but still socialise and talk</li>
                  <li>You are not interested in meditation but want a technology-free reset</li>
                  <li>You want a gentler first experience before attempting silence</li>
                  <li>You are a digital professional and need a structured break from constant connectivity</li>
                </ul>
              </div>

              <div className="med-card med-choice-card">
                <span className="med-badge">Silent Retreat</span>
                <h3 className="med-h3">You Need Mind Freedom</h3>
                <ul className="med-choice-list">
                  <li>You want to go deeper than device removal — you want to meet your own mind</li>
                  <li>You are carrying unprocessed stress, grief, or emotional weight that needs space</li>
                  <li>You have a meditation practice and want sustained depth</li>
                  <li>You are recovering from <Link href="/burnout-recovery-retreats">burnout</Link> and need a complete nervous system reset</li>
                  <li>You have done a digital detox before and are ready for the next level</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── BEST OF BOTH ── */}
        <section className="med-shell med-section-dark med-section-padding" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" style={{ background: 'rgba(255,255,255,0.3)' }} />
              <span className="med-eyebrow-text" style={{ color: 'rgba(255,255,255,0.6)' }}>The Best of Both</span>
              <span className="med-eyebrow-line" style={{ background: 'rgba(255,255,255,0.3)' }} />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>Silent Retreats <span>Include Digital Detox</span></h2>
            
            <div className="med-feature-dark">
              <p className="med-body">
                Every silent retreat we offer is inherently a digital detox — devices are surrendered at the start. You get the benefits of both: <strong>freedom from screens</strong> and the deeper <strong>freedom from speech and social performance</strong>. If you are drawn to both formats, the silent retreat gives you everything the digital detox provides plus the additional depth of verbal silence.
              </p>
              <p className="med-body" style={{ marginTop: '0.75rem' }}>
                The reverse is not true: a digital detox retreat does not include the psychological benefits of silence. If you are specifically seeking meditation depth and inner exploration, the silent format is the <strong>more complete choice</strong>.
              </p>
            </div>
          </div>
        </section>

        <FeaturedRetreat
          title="3-Day Silent Retreat — Digital Detox Included"
          description="Surrender your phone, enter silence, and discover what your mind does when left alone. Forest setting, small group, skilled facilitation."
          links={[
            { label: 'View programme', href: '/3-day-silent-retreat' },
            { label: 'Digital detox retreats', href: '/digital-detox-retreat' },
            { label: 'See all dates', href: '/retreat-calendar' },
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
            { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
            { label: 'A Week Without My Phone — Digital Detox Story', href: '/a-week-without-my-phone-digital-detox' },
            { label: 'What I Learned from a Silent Retreat', href: '/what-i-learned-from-a-silent-retreat' },
            { label: 'Is a Meditation Retreat Worth It?', href: '/is-a-meditation-retreat-worth-it' },
          ]}
        />

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/silent-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Silent Retreats</span>
              </Link>
              <Link href="/digital-detox-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Digital Detox</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/vipassana-vs-meditation-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Vipassana vs Meditation</span>
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