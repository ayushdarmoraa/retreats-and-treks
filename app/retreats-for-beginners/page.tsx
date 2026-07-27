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

const PATH = '/retreats-for-beginners';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Meditation Retreats for Beginners | Retreats And Treks',
    description:
      'A beginner guide to meditation retreats: types, duration, what to expect, common fears, practical preparation, and how to choose wisely.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Meditation Retreats for Beginners — Where to Start',
      description: 'The complete beginner\'s guide to choosing and preparing for your first retreat.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Meditation Retreats for Beginners — Where to Start'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Do I need meditation experience before going on a retreat?',
    answer:
      'No. Many people attend their first retreat with zero meditation experience. Facilitated retreats include all instruction — you do not need to know how to meditate before arriving. In fact, arriving without established habits can be an advantage, because you have no technique to unlearn or expectations to manage.',
  },
  {
    question: 'What is the best type of retreat for a complete beginner?',
    answer:
      'A facilitated 3-day meditation retreat in a comfortable setting. Look for: a trained facilitator (not self-directed), meals included, private or semi-private accommodation, and a structured schedule. Avoid 10-day Vipassana as your first retreat — it is intense by design and better suited to people with some retreat experience.',
  },
  {
    question: 'How much does a beginner meditation retreat cost?',
    answer:
      'Retreat costs vary widely. Budget options (donation-based Vipassana centres) are free but austere. Mid-range retreats with facilitation, comfortable rooms, and meals typically cost ₹15,000–₹35,000 for 3 days in India. Premium retreats can go much higher. Our retreats include all meals, accommodation, and facilitation, with transparent pricing on each programme page.',
  },
  {
    question: 'What if I cannot sit still for long periods?',
    answer:
      'You do not need to. Beginner-friendly retreats intersperse sitting meditation with walking meditation, gentle movement, and rest. Sessions are shorter (20–30 minutes initially) and build gradually. Chairs and backrests are available. The practice is about attention, not endurance.',
  },
  {
    question: 'Should I do a silent retreat as my first retreat?',
    answer:
      'It depends on your temperament. Some beginners thrive in silence because it simplifies the experience — fewer social dynamics to navigate. Others find it too intense without the relief of conversation. A good middle ground is a retreat with noble silence (quiet hours) rather than total silence. Our 3-day retreat includes periods of both silence and facilitated sharing.',
  },
];

export default function RetreatsForBeginnersPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'Retreats for Beginners', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Meditation Retreats for Beginners — Where to Start',
    description: 'A first-timer\'s guide to choosing the right meditation retreat.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Meditation Retreats for Beginners: Where to Start".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Meditation Retreats for Beginners — Where to Start"
        description="A first-timer's guide to choosing the right meditation retreat."
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
        .med-beginner-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; margin-top: 1.5rem; }
        @media (max-width: 720px) { .med-beginner-grid { grid-template-columns: 1fr; } }

        .med-beginner-card { padding: 1.5rem; }
        .med-beginner-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-beginner-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-beginner-type { padding: 1.25rem; border-left: 3px solid #0f766e; margin-bottom: 1rem; background: #fff; border-radius: 0 12px 12px 0; }
        .med-beginner-type:last-child { margin-bottom: 0; }
        .med-beginner-type .med-h3 { font-size: 1.05rem; margin-bottom: 0.2rem; }
        .med-beginner-type .med-body { font-size: 0.92rem; margin-bottom: 0; }
        .med-beginner-type .med-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.2rem 0.6rem; border-radius: 999px; margin-bottom: 0.3rem; }

        .med-beginner-fears { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; }
        @media (max-width: 720px) { .med-beginner-fears { grid-template-columns: 1fr; } }
        .med-beginner-fear { padding: 1.25rem; background: #fff; border-radius: 12px; border: 1px solid rgba(15,118,110,0.06); }
        .med-beginner-fear .med-h3 { font-size: 0.95rem; margin-bottom: 0.2rem; }
        .med-beginner-fear .med-body { font-size: 0.88rem; margin-bottom: 0; }
        .med-beginner-fear .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-beginner-fear .med-body a:hover { text-decoration: underline; }

        .med-beginner-prep { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; margin-top: 1.5rem; }
        @media (max-width: 720px) { .med-beginner-prep { grid-template-columns: 1fr; } }
        .med-beginner-prep-item { display: flex; align-items: flex-start; gap: 0.8rem; padding: 1rem; background: #fff; border-radius: 12px; border: 1px solid rgba(15,118,110,0.06); }
        .med-beginner-prep-item .med-num { width: 32px; height: 32px; border-radius: 50%; background: rgba(15,118,110,0.08); color: #0f766e; display: flex; align-items: center; justify-content: center; font-family: var(--font-inter), sans-serif; font-size: 0.8rem; font-weight: 700; flex-shrink: 0; }
        .med-beginner-prep-item .med-body { font-size: 0.88rem; margin: 0; }
        .med-beginner-prep-item .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-beginner-prep-item .med-body a:hover { text-decoration: underline; }

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

        .med-faq-details:hover {
          border-color: rgba(15,118,110,0.25);
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
          background: rgba(15,118,110,0.03);
        }

        .med-faq-details[open] .med-faq-summary {
          background: rgba(15,118,110,0.04);
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

        .med-beginner-footer {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1.5rem;
          justify-content: center;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(15,118,110,0.08);
        }
        .med-beginner-footer a {
          color: #0f766e;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
        }
        .med-beginner-footer a:hover { text-decoration: underline; }
        .med-beginner-footer .divider { color: #d1d5db; }
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
              { name: 'Beginners' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Beginner's Guide</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              You do not need to be a meditator to go on a meditation retreat. You do not need to be spiritual, flexible, or calm. You need willingness to try something uncomfortable and a few days of free time. This guide covers everything else.
            </p>
            <div className="med-hero-tags">
              <span>No Experience Needed</span>
              <span>3-Day Retreats</span>
              <span>Guided Practice</span>
              <span>Chakrata</span>
            </div>
            <div className="med-hero-actions">
              <a href="#why-retreat" className="med-cta-btn">Why a Retreat?</a>
              <a href="#types" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Retreat Types</a>
            </div>
          </div>
        </section>

        {/* ── WHY START WITH A RETREAT ── */}
        <section id="why-retreat" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Why a Retreat</span>
            </div>
            <h2 className="med-h2">Why Start with a <span>Retreat</span> (Not an App)</h2>
            
            <div className="med-beginner-grid">
              <div className="med-card med-beginner-card">
                <h3 className="med-h3">The App Problem</h3>
                <p className="med-body">Most people try to learn meditation alone — through apps, videos, or books. This works for some. For many, it does not. The dropout rate for meditation apps is over 90% within the first month. The reason is simple: meditation is difficult, and doing difficult things alone, in the same environment where all your distractions live, is harder than it needs to be.</p>
              </div>
              <div className="med-card med-beginner-card">
                <h3 className="med-h3">The Retreat Solution</h3>
                <p className="med-body">A retreat removes the obstacles that home practice cannot. No decisions about when to sit. No negotiation with yourself about whether to skip today. No family, work, or notifications competing for your attention. The structure does the work that willpower cannot.</p>
                <p className="med-body" style={{ marginTop: '0.5rem' }}>This is why many experienced meditators started with a retreat, not the other way around. Read <Link href="/why-people-go-to-meditation-retreats" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>why people go to meditation retreats</Link> for a deeper look at motivations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHICH TYPE ── */}
        <section id="types" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Retreat Types</span>
            </div>
            <h2 className="med-h2">Which Type Is Best <span>for Beginners?</span></h2>

            <div className="med-beginner-type">
              <span className="med-tag">Recommended</span>
              <h3 className="med-h3">Facilitated Meditation Retreat</h3>
              <p className="med-body"><strong>Best for most beginners.</strong> A trained facilitator guides every session, provides instruction, and is available for questions. You do not need to know what you are doing — the facilitator provides the structure. Our <Link href="/3-day-meditation-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>3-day meditation retreat</Link> is designed specifically for this.</p>
            </div>

            <div className="med-beginner-type">
              <span className="med-tag">Gentle Entry</span>
              <h3 className="med-h3">Yoga Retreat with Meditation</h3>
              <p className="med-body">If sitting still feels intimidating, a <Link href="/5-day-yoga-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>yoga retreat</Link> that includes meditation sessions gives you a gentler entry. Physical movement breaks up the sitting, and yoga itself is preparation for stillness. This format suits people who learn through the body.</p>
            </div>

            <div className="med-beginner-type">
              <span className="med-tag">For Introverts</span>
              <h3 className="med-h3">Silent Retreat</h3>
              <p className="med-body">Not typically recommended for first-timers, but some beginners do very well with silence. If you are introverted, comfortable with solitude, and want the most immersive experience, a <Link href="/3-day-silent-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>3-day silent retreat</Link> is an option. Read about <Link href="/how-hard-is-a-silent-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>how hard silence actually is</Link> before deciding.</p>
            </div>

            <div className="med-beginner-type">
              <span className="med-tag">Intense</span>
              <h3 className="med-h3">Vipassana (10-Day)</h3>
              <p className="med-body">The traditional Goenka Vipassana format is free, widely available, and profoundly effective — but intense. Ten days of silence, 10 hours of sitting per day, strict schedule, no physical exercise. It is not designed for comfort. Some beginners thrive here. Many find it too harsh as a first experience. Read our <Link href="/vipassana-vs-meditation-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>comparison of Vipassana and general meditation retreats</Link>.</p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Find a Beginner-Friendly Retreat"
          subtext="Use our retreat finder to match your experience level with the right programme."
          vertical="retreat"
          category="beginners-guide"
          sourcePath={PATH}
        />

        {/* ── HOW LONG & WHERE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Planning</span>
            </div>
            <h2 className="med-h2">How Long &amp; <span>Where to Go</span></h2>

            <div className="med-beginner-grid">
              <div className="med-card med-beginner-card">
                <h3 className="med-h3">Duration: 3 Days</h3>
                <p className="med-body">Three days is the consensus among retreat facilitators and our own experience. Three days gives you enough time to settle, practice, and get a genuine taste of what retreats offer — without the intensity of a full week.</p>
                <p className="med-body" style={{ marginTop: '0.5rem' }}>If three days feels too short, consider <Link href="/how-long-should-a-meditation-retreat-be" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>our detailed duration guide</Link>.</p>
              </div>
              <div className="med-card med-beginner-card">
                <h3 className="med-h3">Location: Chakrata</h3>
                <p className="med-body">Location matters less than you think, but environment matters more. Our <Link href="/locations/chakrata" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Chakrata forest retreat</Link> is specifically designed for beginners — accessible from Delhi (6 hours), surrounded by deodar forest, comfortable rooms, and trained facilitators.</p>
                <p className="med-body" style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#6b7280' }}>For something more adventurous later, see <Link href="/locations/zanskar" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Zanskar</Link>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMMON FEARS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Fears</span>
            </div>
            <h2 className="med-h2">Common Fears <span>(and the Reality)</span></h2>

            <div className="med-beginner-fears">
              <div className="med-beginner-fear">
                <h3 className="med-h3">"I can't meditate"</h3>
                <p className="med-body">You do not need to know how. That is what the facilitator is for. Thinking you cannot meditate is the most common reason people attend a retreat.</p>
              </div>
              <div className="med-beginner-fear">
                <h3 className="med-h3">"I'll be bored"</h3>
                <p className="med-body">You will. And that is part of the experience. Read about <Link href="/first-day-of-a-meditation-retreat">what day one actually looks like</Link>.</p>
              </div>
              <div className="med-beginner-fear">
                <h3 className="med-h3">"It's too expensive"</h3>
                <p className="med-body">Read our <Link href="/is-a-meditation-retreat-worth-it">analysis of whether a retreat is worth the cost</Link>.</p>
              </div>
              <div className="med-beginner-fear">
                <h3 className="med-h3">"I'll feel out of place"</h3>
                <p className="med-body">Most retreat participants are first-timers. You will not be the only one who does not know what they are doing.</p>
              </div>
              <div className="med-beginner-fear" style={{ gridColumn: '1 / -1' }}>
                <h3 className="med-h3">"What if I want to leave?"</h3>
                <p className="med-body">You can. No retreat should prevent you from leaving. The desire to leave usually passes within hours.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PREPARATION ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Preparation</span>
            </div>
            <h2 className="med-h2">How to Prepare for Your <span>First Retreat</span></h2>

            <div className="med-beginner-prep">
              <div className="med-beginner-prep-item">
                <span className="med-num">01</span>
                <p className="med-body">Practice sitting still for 10–20 minutes a day for 1–2 weeks before you go.</p>
              </div>
              <div className="med-beginner-prep-item">
                <span className="med-num">02</span>
                <p className="med-body">Read our <Link href="/what-to-pack-for-a-retreat">packing list</Link> — bring less than you think.</p>
              </div>
              <div className="med-beginner-prep-item">
                <span className="med-num">03</span>
                <p className="med-body">Avoid dramatic dietary changes in the week before.</p>
              </div>
              <div className="med-beginner-prep-item">
                <span className="med-num">04</span>
                <p className="med-body">Tell friends and family you will be unreachable.</p>
              </div>
              <div className="med-beginner-prep-item" style={{ gridColumn: '1 / -1' }}>
                <span className="med-num">05</span>
                <p className="med-body">Lower your expectations to zero — arrival without agenda is the best preparation.</p>
              </div>
            </div>

            <p className="med-body" style={{ marginTop: '1rem' }}>
              Full preparation guide: <Link href="/how-to-prepare-for-a-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>How to Prepare for a Retreat</Link> and <Link href="/first-meditation-retreat-tips" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>First Meditation Retreat Tips</Link>.
            </p>
          </div>
        </section>

        <FeaturedRetreat
          title="3-Day Meditation Retreat — Designed for Beginners"
          description="No experience needed. Facilitated sessions, all meals, forest setting. The gentlest possible entry to retreat practice."
          links={[
            { label: 'View programme', href: '/3-day-meditation-retreat' },
            { label: 'See all dates', href: '/retreat-calendar' },
            { label: 'Find your retreat', href: '/find-your-retreat' },
          ]}
        />

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

        <RelatedReads
          links={[
            { label: 'First Day of a Meditation Retreat', href: '/first-day-of-a-meditation-retreat' },
            { label: 'How Long Should a Retreat Be?', href: '/how-long-should-a-meditation-retreat-be' },
            { label: 'How Hard Is a Silent Retreat?', href: '/how-hard-is-a-silent-retreat' },
            { label: 'What to Pack for a Retreat', href: '/what-to-pack-for-a-retreat' },
          ]}
        />

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/meditation-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Meditation Retreats</span>
              </Link>
              <Link href="/find-your-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Find Your Retreat</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/retreat-calendar" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreat Calendar</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/contact" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Contact Us</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
            </div>
          </div>
        </nav>

      </article>
    </TrackedPage>
  );
}