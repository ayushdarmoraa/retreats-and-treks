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

const PATH = '/what-to-expect-at-a-meditation-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'What to Expect at a Meditation Retreat | Retreats And Treks',
    description:
      'What to expect at a meditation retreat: daily schedule, sitting, walking, meals, emotions, discomfort, depth, and realistic guidance for first-timers.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'What to Expect at a Meditation Retreat',
      description: 'The real experience — schedule, emotions, the hard parts, and why people come back.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('What to Expect at a Meditation Retreat'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Will I be bored at a meditation retreat?',
    answer:
      'Almost certainly — for the first morning. Boredom is the mind\'s protest at losing its habitual stimulation. It passes. What replaces it is far more interesting than anything your phone has ever provided. By day two, most people report that the richness of unmediated sensory experience — light, sound, breath, texture — is more compelling than they expected.',
  },
  {
    question: 'What if I cannot sit for long periods?',
    answer:
      'Sitting meditation alternates with walking meditation, and sessions include breaks. Chairs and cushion supports are always available. You do not need to sit in lotus position. The goal is alertness, not endurance. If your body needs to move, walking meditation is equally valid practice.',
  },
  {
    question: 'Will I have free time during the retreat?',
    answer:
      'Yes. Most retreats include 2–4 hours of unstructured time daily — for personal practice, journalling, walking in nature, or simply resting. This free time is not filler. It is where much of the retreat\'s work happens, as insights from structured sessions settle and integrate.',
  },
  {
    question: 'What is the food like?',
    answer:
      'Vegetarian, simple, and nourishing. Meals are eaten in silence (on silent retreats) and are typically local and seasonal. The simplicity of the food is part of the practice — eating becomes a meditation itself when you actually taste each bite without conversation or distraction.',
  },
];

export default function WhatToExpectMeditationRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'What to Expect', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = generateBlogPostingSchema({
    title: 'What to Expect at a Meditation Retreat — Day by Day',
    description:
      'What to expect at a meditation retreat: daily schedule, sitting, walking, meals, emotions, discomfort, depth, and realistic guidance for first-timers.',
    publishedAt: '2026-03-06',
    lastUpdated: '2026-05-09',
    url: canonicalUrl,
  });

  // Split heading for green last word
  const h1Words = "What to Expect at a Meditation Retreat".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="What to Expect at a Meditation Retreat — Day by Day"
        description="What to expect at a meditation retreat: daily schedule, sitting, walking, meals, emotions, discomfort, depth, and realistic guidance for first-timers."
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
        .med-expect-card { padding: 1.5rem; }
        .med-expect-card .med-badge {
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
        .med-expect-card .med-h2 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .med-expect-card .med-body { font-size: 0.92rem; margin-bottom: 0.5rem; }
        .med-expect-card .med-body:last-child { margin-bottom: 0; }

        .med-expect-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; margin-top: 1.5rem; }
        @media (max-width: 720px) { .med-expect-grid { grid-template-columns: 1fr; } }

        .med-expect-physical { padding-left: 1.25rem; line-height: 2.2; margin-bottom: 1rem; list-style: none; }
        .med-expect-physical li { position: relative; padding-left: 1.5rem; }
        .med-expect-physical li::before { content: '✦'; position: absolute; left: 0; color: #0f766e; font-size: 0.8rem; }
        .med-expect-physical li strong { color: #2B2A26; font-weight: 600; }
        .med-expect-physical li a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-expect-physical li a:hover { text-decoration: underline; }

        .med-expect-footer { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; justify-content: center; padding: 2rem 0 4rem; border-top: 1px solid rgba(15,118,110,0.08); margin-top: 2rem; }
        .med-expect-footer a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
        .med-expect-footer a:hover { color: #0d6b64; text-decoration: underline; }

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
              { name: 'What to Expect' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>First-Timer Guide</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              The unknown is the hardest part. Not the sitting, not the silence, not the early mornings — the not knowing what comes next. This guide walks through exactly what happens at a meditation retreat, from arrival to departure, so the only surprise left is the depth.
            </p>
            <div className="med-hero-tags">
              <span>Before You Arrive</span>
              <span>Day 1: Orientation</span>
              <span>Days 2–3: Settling</span>
              <span>Days 4–7: Depth</span>
            </div>
            <div className="med-hero-actions">
              <a href="#before" className="med-cta-btn">What to Expect</a>
              <a href="#plan" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Find Your Retreat</a>
            </div>
          </div>
        </section>

        {/* ── BEFORE YOU ARRIVE ── */}
        <section id="before" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-expect-card">
              <span className="med-badge">Before You Arrive</span>
              <h2 className="med-h2">Before <span>You Arrive</span></h2>
              <p className="med-body">
                Most retreats send pre-arrival instructions: what to bring, what to leave behind, how to prepare your mind and body. Read our <Link href="/how-to-prepare-for-a-retreat">preparation guide</Link> for practical steps. The key insight: the retreat starts before you arrive. How you approach the days before directly affects how quickly you settle.
              </p>
            </div>
          </div>
        </section>

        {/* ── DAY 1 ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-expect-card">
              <span className="med-badge">Day 1</span>
              <h2 className="med-h2">Arrival and <span>Orientation</span></h2>
              <p className="med-body">
                You arrive, usually in the afternoon or evening. Room assignment, tour of the space, and a group orientation. You meet the teacher and the other participants. Phones are stored away (or signal disappears, in locations like <Link href="/locations/zanskar">Zanskar</Link>). The schedule is explained. After dinner, the first short sitting. Then sleep — earlier than you are used to, and with a mind that is louder than expected.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          
          label="Experience This Yourself"
          subtext="Curious about the journey? Tell us about yourself and we'll recommend the right fit."
          vertical="retreat"
          category="expect-meditation"
          sourcePath={PATH}
        />

        {/* ── DAYS 2–3 ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-expect-card">
              <span className="med-badge">Days 2–3</span>
              <h2 className="med-h2">Settling</h2>
              <p className="med-body">
                The first full day is often the hardest. Your mind protests — it wants input, stimulation, something to react to. Restlessness, boredom, and anxiety are common. The body may feel restless too. This is normal. The schedule holds you: sit, walk, eat, sit, walk, eat, sit, sleep. By day two, something begins to shift. The internal monologue slows. Awareness sharpens. You notice the quality of light, the taste of food, the feeling of your feet on the ground.
              </p>
            </div>
          </div>
        </section>

        {/* ── DAYS 4–7 ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-expect-card">
              <span className="med-badge">Days 4–7</span>
              <h2 className="med-h2">Depth</h2>
              <p className="med-body">
                For those on a <Link href="/7-day-meditation-retreat">7-day retreat</Link>, this is where the real work happens. The mind, having run out of its habitual loops, begins to access something quieter. Meditation sessions become easier — not in the sense of effort, but in the sense of naturalness. The silence stops being something you do and becomes something you are. Emotional material may surface. Insights arrive without thinking. The Himalayan environment amplifies everything — the altitude, the forest, the beauty.
              </p>
            </div>
          </div>
        </section>

        {/* ── PHYSICAL EXPERIENCE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-expect-card">
              <span className="med-badge">The Body</span>
              <h2 className="med-h2">The Physical <span>Experience</span></h2>
              <ul className="med-expect-physical">
                <li><strong>Sitting:</strong> sessions of 30–60 minutes, alternating with walking</li>
                <li><strong>Walking:</strong> slow intentional walking in natural settings</li>
                <li><strong>Meals:</strong> vegetarian, eaten in silence, simple and nourishing</li>
                <li><strong>Sleep:</strong> 8–9 hours (early to bed, early to rise)</li>
                <li><strong>Body:</strong> gentle stretching or yoga complements the sitting practice</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── EMOTIONAL JOURNEY ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-expect-card">
              <span className="med-badge">The Heart</span>
              <h2 className="med-h2">The Emotional <span>Journey</span></h2>
              <p className="med-body">
                Expect an arc: resistance → settling → depth → integration. The resistance phase (day 1) is where most people consider leaving. The settling phase (days 2–3) is where the commitment pays off. The depth phase (days 4+) is why people come back year after year. Allow the full arc before judging the experience. Read about the <Link href="/benefits-of-meditation-retreat">specific benefits</Link> people report.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Find My Retreat"
          subtext="Ready to try? We match you to the right environment, duration, and approach."
          vertical="retreat"
          category="expect-meditation"
          sourcePath={PATH}
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

        {/* ── FOOTER ── */}
        <div className="med-expect-footer">
          <Link href="/meditation-retreats">← Meditation Retreats</Link>
          <Link href="/is-a-meditation-retreat-worth-it">Is It Worth It?</Link>
          <Link href="/how-to-choose-a-meditation-retreat">How to Choose</Link>
        </div>

      </article>
    </TrackedPage>
  );
}
