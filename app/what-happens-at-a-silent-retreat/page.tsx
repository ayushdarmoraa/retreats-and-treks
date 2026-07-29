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
import { images } from '@/lib/images';

const PATH = '/what-happens-at-a-silent-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'What Happens at a Silent Retreat? | Retreats And Treks',
    description:
      'What happens at a silent retreat: day-by-day structure, noble silence rules, emotions, meals, walking, discomfort, and depth.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'What Happens at a Silent Retreat? A Complete Guide',
      description: 'The honest truth about silent retreats — from arrival anxiety to the silence that changes you.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('What Happens at a Silent Retreat? A Complete Guide'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Do I have to be completely silent the entire time?',
    answer:
      'Noble silence means no casual conversation, no social media, no phone calls. However, you can speak with retreat guides when needed — for practical questions, emotional support, or safety concerns. The intention is to remove habitual talking, not to create a punitive environment. Most people find that after the first day, they no longer want to speak.',
  },
  {
    question: 'What if I cannot handle the silence?',
    answer:
      'The first hours are the hardest. Your mind, accustomed to constant input, panics at the absence. This is normal and expected. By the second day, most people settle. If you genuinely need to leave, you can — retreats are voluntary. But the discomfort of the first day is almost always temporary, and what lies beyond it is why people come back.',
  },
  {
    question: 'Can I read books during a silent retreat?',
    answer:
      'Most traditional silent retreats ask you to refrain from reading. The purpose is to remove all external input — spoken, written, digital — so the mind has nothing new to process and begins to settle into its own depths. Some retreats allow journalling. If reading is important to you, ask before booking.',
  },
  {
    question: 'What do you do all day if you are not talking?',
    answer:
      'Days are structured: morning meditation (60–90 minutes), breakfast, walking practice, midday session, lunch, rest period, afternoon meditation, gentle movement or yoga, evening session, sleep. The structure holds you — you are never wondering what to do next. Between sessions, you walk, rest, or sit with whatever is arising.',
  },
  {
    question: 'Is a silent retreat religious?',
    answer:
      'Not necessarily. Some silent retreats are rooted in Buddhist tradition (Vipassana), some in Hindu contemplative practice, and some are entirely secular. Our Himalayan silent retreats draw on contemplative wisdom without requiring religious belief. The silence itself is the practice — not a prayer to any deity.',
  },
  {
    question: 'Will I feel lonely during a silent retreat?',
    answer:
      'Surprisingly, no. There is a paradox in silent retreats: you are surrounded by people who are all going through the same experience, and the shared silence creates a quality of connection that conversation rarely achieves. Many retreatants describe feeling less lonely during silence than they do in their normal social lives.',
  },
];

export default function WhatHappensAtASilentRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Silent Retreats', url: buildCanonicalUrl('/silent-retreats') },
    { name: 'What Happens at a Silent Retreat', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Happens at a Silent Retreat? A Complete Guide',
    description: 'The honest truth about silent retreats — from arrival anxiety to the silence that changes you.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "What Happens at a Silent Retreat?".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="What Happens at a Silent Retreat? A Complete Guide"
        description="The honest truth about silent retreats — from arrival anxiety to the silence that changes you."
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
        .med-silent-card { padding: 1.5rem; }
        .med-silent-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-silent-card .med-body { font-size: 0.92rem; margin-bottom: 0; }
        .med-silent-card .med-badge {
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

        .med-silent-day-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; margin-top: 1.5rem; }
        @media (max-width: 720px) { .med-silent-day-grid { grid-template-columns: 1fr; } }

        .med-silent-day-card { padding: 1.5rem; border-left: 4px solid #0f766e; }
        .med-silent-day-card .med-h3 { font-size: 1rem; margin-bottom: 0.2rem; }
        .med-silent-day-card .med-body { font-size: 0.88rem; margin-bottom: 0; }

        .med-silent-table-wrap { overflow-x: auto; border-radius: 18px; border: 1px solid rgba(15,118,110,0.12); margin-top: 1.5rem; }
        .med-silent-table { width: 100%; border-collapse: collapse; font-family: var(--font-inter), sans-serif; font-size: 0.88rem; }
        .med-silent-table td { padding: 0.6rem 1rem; border-bottom: 1px solid rgba(15,118,110,0.06); color: #4b5259; }
        .med-silent-table tr:last-child td { border-bottom: none; }
        .med-silent-table tr:hover td { background: #f7f9f7; }
        .med-silent-table .med-time { font-weight: 600; color: #2B2A26; white-space: nowrap; }

        .med-silent-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
        .med-silent-list li { display: grid; grid-template-columns: 1.5rem 1fr; gap: 0.5rem; align-items: flex-start; }
        .med-silent-list li::before { content: '✦'; color: #0f766e; font-size: 0.7rem; margin-top: 2px; }
        .med-silent-list li a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-silent-list li a:hover { text-decoration: underline; }

        .med-silent-location-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-top: 1.5rem; }
        @media (max-width: 820px) { .med-silent-location-grid { grid-template-columns: 1fr; } }
        .med-silent-location { padding: 1rem 1.25rem; background: #f7f9f7; border-radius: 12px; border: 1px solid rgba(15,118,110,0.06); transition: all 0.3s; }
        .med-silent-location:hover { background: #fff; border-color: rgba(15,118,110,0.2); transform: translateY(-2px); }
        .med-silent-location .med-h3 { font-size: 1rem; margin-bottom: 0.2rem; }
        .med-silent-location .med-h3 a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-silent-location .med-h3 a:hover { text-decoration: underline; }
        .med-silent-location .med-body { font-size: 0.82rem; margin-bottom: 0; color: #6b7280; }

        .med-silent-emotion { padding: 1.5rem; background: #f7f9f7; border-radius: 12px; border: 1px solid rgba(15,118,110,0.06); margin-top: 1.5rem; }
        .med-silent-emotion .med-h3 { font-size: 1rem; margin-bottom: 0.2rem; }
        .med-silent-emotion .med-body { font-size: 0.88rem; margin-bottom: 0; }

        .med-silent-footer { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; justify-content: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(15,118,110,0.08); }
        .med-silent-footer a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
        .med-silent-footer a:hover { color: #0d6b64; text-decoration: underline; }

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
              { name: 'Silent Retreats', href: '/silent-retreats' },
              { name: 'What Happens at a Silent Retreat' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Silence Guide</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              You arrive. You hand over your phone. And then — nothing. No conversation. No notifications. No news. No small talk. Just you, the schedule, and whatever emerges from the quiet. This is what most people imagine when they think of a silent retreat. The reality is both simpler and more profound than the imagination.
            </p>
            <div className="med-hero-tags">
              <span>Arrival Anxiety</span>
              <span>Noble Silence</span>
              <span>Day by Day</span>
              <span>Emotional Journey</span>
            </div>
            <div className="med-hero-actions">
              <a href="#arrival" className="med-cta-btn">What Happens</a>
              <a href="#schedule" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Daily Schedule</a>
            </div>
          </div>
        </section>

        {/* ── THE ARRIVAL ── */}
        <section id="arrival" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Beginning</span>
            </div>
            <div className="med-card med-silent-card">
              <span className="med-badge">Before Silence</span>
              <h2 className="med-h2" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>The Arrival: <span>Before Silence Begins</span></h2>
              <p className="med-body">
                Most silent retreats begin with an evening gathering. Introductions happen now — you see the faces of the people you will share silence with, learn the schedule, ask practical questions. Phones are collected or stored. The guide explains noble silence: no speaking, no eye contact meant to communicate, no written notes to others. Then the silence begins, usually after dinner.
              </p>
              <p className="med-body">
                The first night is strange. You eat in silence. You walk to your room in silence. You lie awake aware of how loud your own thoughts are. This is normal. This is the beginning.
              </p>
            </div>
          </div>
        </section>

        {/* ── DAY BY DAY ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Day by Day</span>
            </div>
            <h2 className="med-h2">What Actually <span>Happens</span></h2>

            <div className="med-silent-day-grid">
              <div className="med-card med-silent-day-card">
                <h3 className="med-h3">Day 1 — The Noise</h3>
                <p className="med-body">Your mind has not received the memo. It talks to itself constantly — rehearsing conversations, replaying memories, planning your return. The silence around you makes the internal noise louder. This is not failure. This is the mind adjusting to the absence of external input. Restlessness, impatience, and even anxiety are common. The structure of the day — meditation, meals, walking — holds you through it.</p>
              </div>
              <div className="med-card med-silent-day-card">
                <h3 className="med-h3">Day 2 — The Settling</h3>
                <p className="med-body">Something shifts. The internal monologue begins to slow. You notice things you missed yesterday — the quality of light, the taste of food, the texture of the air. Meditation sessions become easier. Not peaceful necessarily, but less frantic. The body begins to relax. You may feel unexpectedly emotional — this is the nervous system releasing what it has been holding.</p>
              </div>
              <div className="med-card med-silent-day-card">
                <h3 className="med-h3">Day 3 — The Opening</h3>
                <p className="med-body">By day three, most people report a qualitative change. The silence is no longer something imposed — it feels natural, even wanted. Awareness sharpens. Walking in nature becomes intensely vivid. The mind, having exhausted its habitual loops, begins to access something quieter. This is where the retreat begins to do its real work.</p>
              </div>
              <div className="med-card med-silent-day-card">
                <h3 className="med-h3">Days 4–7 — Depth</h3>
                <p className="med-body">For those on longer retreats, the later days are where the deepest work happens. The mind is genuinely quiet. Insights arise not through thinking but through a kind of knowing that silence makes possible. Many people describe these days as some of the most important experiences of their lives. The Himalayan environment amplifies this — the altitude, the beauty, the absence of distraction.</p>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Experience Silence Yourself"
          subtext="Curious? Tell us about yourself and we'll recommend the right silent retreat for you."
          vertical="retreat"
          category="guide-silent-retreat"
          sourcePath={PATH}
        />

        {/* ── TYPICAL DAILY SCHEDULE ── */}
        <section id="schedule" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Structure</span>
            </div>
            <h2 className="med-h2">A <span>Typical Day</span></h2>

            <div className="med-silent-table-wrap">
              <table className="med-silent-table">
                <tbody>
                  {[
                    ['6:00 AM', 'Wake. Tea or warm water.'],
                    ['6:30 – 8:00', 'Morning meditation session (guided and silent periods)'],
                    ['8:00 – 9:00', 'Breakfast in silence'],
                    ['9:00 – 11:00', 'Walking meditation / free practice / nature immersion'],
                    ['11:00 – 12:30', 'Midday meditation or teaching session'],
                    ['12:30 – 2:00', 'Lunch and rest'],
                    ['2:00 – 3:30', 'Personal practice, journalling, or rest'],
                    ['3:30 – 5:00', 'Afternoon meditation or gentle yoga'],
                    ['5:00 – 6:30', 'Free time, walking, evening light'],
                    ['6:30 – 7:30', 'Dinner in silence'],
                    ['7:30 – 8:30', 'Evening session — meditation, chanting, or guided sitting'],
                    ['9:00 PM', 'Lights out'],
                  ].map(([time, activity]) => (
                    <tr key={time}>
                      <td className="med-time">{time}</td>
                      <td>{activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── EMOTIONAL JOURNEY ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Journey</span>
            </div>
            <div className="med-card med-silent-emotion">
              <h3 className="med-h3">The Emotional Arc Nobody Warns You About</h3>
              <p className="med-body">
                Silent retreat marketing often focuses on the peaceful outcome. The honest truth is that the journey includes discomfort. Many retreatants experience waves of sadness, irritation, grief, or anxiety — especially on days one and two. This is not a sign that something is wrong. It is a sign that the silence is working. When external stimulation is removed, the emotions you have been carrying (and suppressing) surface.
              </p>
              <p className="med-body" style={{ marginTop: '0.5rem' }}>
                The guide is there for these moments. The structure holds you. And the natural environment — especially in the Himalayas, where the beauty is constant and the air is clean — acts as a container for whatever arises.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHERE TO DO IT ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Locations</span>
            </div>
            <h2 className="med-h2">Where to Do a Silent Retreat <span>in the Himalayas</span></h2>

            <div className="med-silent-location-grid">
              <div className="med-silent-location">
                <h3 className="med-h3"><Link href="/locations/chakrata">Chakrata</Link></h3>
                <p className="med-body">Forest silence, gentle and accessible. Best for first-timers. 3–7 days.</p>
              </div>
              <div className="med-silent-location">
                <h3 className="med-h3"><Link href="/locations/zanskar">Zanskar</Link></h3>
                <p className="med-body">Geological silence, radical remoteness. Best for experienced retreatants. 7–14 days.</p>
              </div>
              <div className="med-silent-location">
                <h3 className="med-h3"><Link href="/locations/munsiyari">Munsiyari</Link></h3>
                <p className="med-body">Alpine silence, spacious and expansive. Best for those who need openness. 5–7 days.</p>
              </div>
            </div>

            <p className="med-body" style={{ marginTop: '1rem' }}>
              See our full guide: <Link href="/himalayan-silent-retreats" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Himalayan silent retreats</Link>.
            </p>
          </div>
        </section>

        <PrimaryCTA
          label="Find My Silent Retreat"
          subtext="First timer or experienced? We'll match you to the right silence."
          vertical="retreat"
          category="guide-silent-retreat"
          sourcePath={PATH}
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

               {/* ── FOOTER ── */}
        <div className="med-silent-footer" style={{ 
          padding: '2rem 0 4rem',
          marginBottom: 0,
          borderTop: '1px solid rgba(15,118,110,0.08)'
        }}>
          <div className="med-inner">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '0.75rem',
              marginBottom: 0
            }}>
              <Link href="/silent-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Silent Retreats</span>
              </Link>
              <Link href="/how-to-choose-a-meditation-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>How to Choose</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/how-to-prepare-for-a-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>How to Prepare</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/find-your-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Find Your Retreat</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
            </div>
          </div>
        </div>

      </article>
    </TrackedPage>
  );
}
