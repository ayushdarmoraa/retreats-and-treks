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

const PATH = '/vipassana-vs-meditation-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Vipassana vs Meditation Retreat | Retreats And Treks',
    description:
      'Vipassana vs meditation retreat: compare structure, silence, technique, difficulty, benefits, and who each retreat format serves best.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Vipassana vs Meditation Retreat — Which Is Right for You?',
      description:
        'Vipassana or general meditation retreat? A clear comparison of structure, technique, and who each format serves best.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Vipassana vs Meditation Retreat — Which Is Right for You?'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Is Vipassana harder than a regular meditation retreat?',
    answer:
      'Generally yes. Vipassana retreats follow a strict schedule (often 4:30am–9pm), require complete silence, prohibit reading, writing, and eye contact, and use a single technique for the entire duration. General meditation retreats vary widely — some are equally intensive, others include movement, discussion, and gentler scheduling. The difficulty depends on the specific programme, not just the label.',
  },
  {
    question: 'Can I do Vipassana as my first retreat?',
    answer:
      'You can, and many people do. Goenka-tradition Vipassana courses are specifically designed for beginners with no prior meditation experience. However, 10 days of strict silence and 10+ hours of daily sitting is demanding. If you are uncertain, a 3-day guided retreat provides a gentler introduction to silent practice and helps you assess your readiness for longer formats.',
  },
  {
    question: 'What technique does Vipassana use?',
    answer:
      'Vipassana means "seeing things as they really are." The technique involves systematic scanning of bodily sensations with equanimity — observing each sensation without reacting. In the Goenka tradition, the first three days focus on breath awareness (anapana) before introducing body scanning. General meditation retreats may include multiple techniques: focused attention, open monitoring, loving-kindness, body scanning, walking meditation, and breathwork.',
  },
  {
    question: 'Are Vipassana retreats free?',
    answer:
      'Goenka-tradition Vipassana courses operate on a donation basis — there is no fixed fee. This makes them accessible but also means the experience is standardised. General meditation retreats charge fees that fund smaller groups, varied programming, specific locations, and individual facilitation. The cost difference reflects a difference in format, not quality.',
  },
  {
    question: 'Which type of retreat is better for burnout recovery?',
    answer:
      'For burnout recovery, a general meditation retreat with flexible structure is usually more appropriate. Vipassana\'s rigid schedule and intensive sitting can add stress to an already depleted nervous system. A retreat with movement, nature immersion, and gentler pacing allows the system to downregulate without pushing through additional endurance. See our burnout recovery retreats for programmes designed specifically for nervous system recovery.',
  },
];

export default function VipassanaVsMeditationRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'Vipassana vs Meditation Retreat', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Vipassana vs Meditation Retreat — Which Is Right for You?',
    description: 'A clear comparison of Vipassana and general meditation retreats.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Vipassana vs Meditation Retreat: A Clear Comparison".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Vipassana vs Meditation Retreat — Which Is Right for You?"
        description="Vipassana or general meditation retreat? A clear comparison of structure, technique, and who each format serves best."
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
        .med-vipassana-list { padding-left: 1.25rem; line-height: 2.2; margin-bottom: 1rem; list-style: none; }
        .med-vipassana-list li { position: relative; padding-left: 1.5rem; }
        .med-vipassana-list li::before { content: '✦'; position: absolute; left: 0; color: #0f766e; font-size: 0.8rem; }
        .med-vipassana-list li strong { color: #2B2A26; font-weight: 600; }
        .med-vipassana-list li a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-vipassana-list li a:hover { color: #0d6b64; text-decoration: underline; }

        .med-vipassana-table-wrap { overflow-x: auto; border-radius: 18px; border: 1px solid rgba(15,118,110,0.12); margin-top: 1.5rem; }
        .med-vipassana-table { width: 100%; border-collapse: collapse; font-family: var(--font-inter), sans-serif; font-size: 0.88rem; }
        .med-vipassana-table th { text-align: left; padding: 0.85rem 1rem; background: #f7f9f7; border-bottom: 2px solid #0f766e; font-weight: 600; color: #2B2A26; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; }
        .med-vipassana-table td { padding: 0.85rem 1rem; border-bottom: 1px solid rgba(15,118,110,0.08); color: #4b5259; }
        .med-vipassana-table tr:last-child td { border-bottom: none; }
        .med-vipassana-table tr:hover td { background: #f7f9f7; }

        .med-vipassana-choice { padding: 1.5rem; }
        .med-vipassana-choice .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-vipassana-choice .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-vipassana-footer { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; justify-content: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(15,118,110,0.08); }
        .med-vipassana-footer a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
        .med-vipassana-footer a:hover { color: #0d6b64; text-decoration: underline; }

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
              { name: 'Vipassana vs Meditation Retreat' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Compare & Choose</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              "Should I do a Vipassana course or a meditation retreat?" This is one of the most common questions people ask before their first extended practice experience. The answer depends on what you are looking for, where you are in your practice, and how much structure you want. This guide covers the real differences.
            </p>
            <div className="med-hero-tags">
              <span>Vipassana</span>
              <span>Meditation Retreat</span>
              <span>Compare</span>
              <span>Choose</span>
            </div>
            <div className="med-hero-actions">
              <a href="#comparison" className="med-cta-btn">View Comparison</a>
              <a href="#plan" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Help Me Choose</a>
            </div>
          </div>
        </section>

        {/* ── WHAT VIPASSANA IS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Format 1</span>
            </div>
            <h2 className="med-h2">What <span>Vipassana</span> Actually Is</h2>
            <p className="med-body">
              Vipassana is a specific meditation technique — not a retreat format. The word means "insight" or "seeing things as they really are" in Pali. However, in common usage, "Vipassana retreat" almost always refers to the 10-day silent courses taught in the S.N. Goenka tradition, which have become the most widely known meditation retreat format globally.
            </p>
            <p className="med-body">
              These courses follow a standardised format: 10 days of noble silence (no speaking, no eye contact, no gestures), approximately 10.5 hours of sitting meditation daily, a fixed schedule from 4:00am to 9:30pm, no reading or writing materials, and a single technique progression from breath awareness to body scanning. The courses are offered on a donation basis at centres worldwide.
            </p>
            <p className="med-body">
              The strengths of this format are rigour, accessibility (no cost barrier), and depth. The limitations are inflexibility (one technique, one schedule, no individual adaptation) and intensity that may not suit all nervous systems.
            </p>
          </div>
        </section>

        {/* ── GENERAL MEDITATION RETREAT ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Format 2</span>
            </div>
            <h2 className="med-h2">What a General <span>Meditation Retreat</span> Offers</h2>
            <p className="med-body">
              "Meditation retreat" is a broad category that includes everything from weekend mindfulness workshops to month-long silent intensives. The key differences from Vipassana are flexibility and variety:
            </p>
            <ul className="med-vipassana-list">
              <li><strong>Multiple techniques:</strong> focused attention, open monitoring, loving-kindness, walking meditation, breathwork, body-based practices</li>
              <li><strong>Adaptable structure:</strong> schedules can be adjusted for individual capacity; facilitators can modify practices if someone is struggling</li>
              <li><strong>Varied duration:</strong> <Link href="/3-day-meditation-retreat">3 days</Link>, <Link href="/7-day-meditation-retreat">7 days</Link>, or <Link href="/10-day-silent-retreat">10 days</Link></li>
              <li><strong>Environmental diversity:</strong> forest retreats, mountain monasteries, riverside settings — each producing different effects on the nervous system</li>
              <li><strong>Group size:</strong> often capped at 8–15, compared to Vipassana centres accommodating 50–200+</li>
            </ul>
            <p className="med-body">
              Our Himalayan retreats in <Link href="/locations/chakrata">Chakrata</Link> and <Link href="/locations/zanskar">Zanskar</Link> use the environment as an active component of the practice — altitude, forest acoustics, and isolation create conditions that complement meditation in ways that indoor centre environments cannot.
            </p>
          </div>
        </section>

        <PrimaryCTA
          id="plan"
          label="Help Me Choose"
          subtext="Not sure which format suits you? Tell us about your experience and what you're seeking."
          vertical="retreat"
          category="vipassana-comparison"
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

            <div className="med-vipassana-table-wrap">
              <table className="med-vipassana-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Vipassana (Goenka)</th>
                    <th>General Meditation Retreat</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Duration', '10 days (fixed)', '3–10+ days (flexible)'],
                    ['Silence', 'Noble silence (no communication)', 'Varies — often silent, some with discussion periods'],
                    ['Technique', 'Body scanning only', 'Multiple techniques offered'],
                    ['Schedule', '4:00am–9:30pm, fixed', 'Structured but adaptable'],
                    ['Facilitation', 'Audio/video teachings, limited 1:1', 'Direct, responsive facilitation'],
                    ['Group size', '50–200+', '6–15 typically'],
                    ['Cost', 'Donation-based', 'Fixed fee (includes accommodation, meals)'],
                    ['Location', 'Dedicated centres, often suburban', 'Varied — forest, mountain, monastery'],
                    ['Movement', 'Minimal — primarily sitting', 'Often includes walking, yoga, nature immersion'],
                    ['Best for', 'Disciplined practitioners, first deep experience', 'Varied needs, burnout recovery, beginners wanting support'],
                  ].map(([dim, vip, gen]) => (
                    <tr key={dim}>
                      <td style={{ fontWeight: 600, color: '#2B2A26' }}>{dim}</td>
                      <td>{vip}</td>
                      <td>{gen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── WHEN VIPASSANA IS BETTER ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Decision Guide</span>
            </div>
            <h2 className="med-h2">When <span>Vipassana</span> Is the Better Choice</h2>
            <p className="med-body">
              Choose Vipassana if you want maximum rigour with minimum cost. The 10-day Goenka course is the gold standard for a reason: it strips away all variables and forces you to sit with your own mind under conditions of complete simplicity. If you are disciplined, physically able to sit for extended periods, and seeking a structured introduction to insight meditation, it is an excellent format.
            </p>
            <p className="med-body">
              Vipassana is also the right choice if you specifically want to learn the body-scanning technique deeply. Ten days of sustained practice in one method produces a level of skill that multi-technique retreats cannot match. For practitioners who already have a daily Vipassana practice, the 10-day course provides the depth needed to break through plateaus.
            </p>
          </div>
        </section>

        {/* ── WHEN GENERAL RETREAT IS BETTER ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Decision Guide</span>
            </div>
            <h2 className="med-h2">When a General <span>Meditation Retreat</span> Is the Better Choice</h2>
            <p className="med-body">
              Choose a meditation retreat if you need any of the following: adaptability, nature immersion, a small group, direct facilitation, or a shorter initial commitment.
            </p>
            <p className="med-body">
              <strong>For burnout recovery:</strong> Vipassana's intensive schedule can add stress to an already depleted system. A retreat with flexible pacing, movement, and nature immersion allows the nervous system to downregulate without pushing through endurance. See <Link href="/burnout-recovery-retreats">burnout recovery retreats</Link>.
            </p>
            <p className="med-body">
              <strong>For first-timers who want support:</strong> If the idea of 10 days of silence with 200 strangers feels overwhelming, a <Link href="/3-day-meditation-retreat">3-day retreat with 8–12 participants</Link> provides a supported entry point. Read <Link href="/first-meditation-retreat-tips">first retreat tips</Link> for practical preparation.
            </p>
            <p className="med-body">
              <strong>For people seeking environmental depth:</strong> The physical setting of a retreat is not decorative — it is neurologically active. Forest environments reduce cortisol. Altitude shifts awareness. Natural silence is qualitatively different from artificial silence. Read <Link href="/what-happens-to-your-mind-in-silence">the psychology of silence</Link> for the neuroscience.
            </p>
          </div>
        </section>

        {/* ── CAN YOU DO BOTH ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Progression</span>
            </div>
            <h2 className="med-h2">Can You Do <span>Both?</span></h2>
            <p className="med-body">
              Yes, and many serious practitioners do. A common progression: start with a shorter general meditation retreat to build comfort with extended practice, then attend a 10-day Vipassana once you know you can handle sustained silence. Some practitioners alternate between the two formats — Vipassana for technique depth, general retreats for environmental variety and restoration.
            </p>
            <p className="med-body">
              If you are unsure where to start, <Link href="/is-a-meditation-retreat-worth-it">this honest assessment</Link> will help you decide whether any retreat is right for you right now. And <Link href="/why-people-go-to-meditation-retreats">why people actually go to retreats</Link> explores the real motivations behind the decision.
            </p>
          </div>
        </section>

        <FeaturedRetreat
          title="3-Day Meditation Retreat — Your Supported Entry"
          description="Small group, guided sessions, Himalayan forest. Enough to know if retreat practice is for you — without a 10-day commitment."
          links={[
            { label: 'View programme', href: '/3-day-meditation-retreat' },
            { label: 'See all dates', href: '/retreat-calendar' },
            { label: 'Take the quiz', href: '/find-your-retreat' },
          ]}
        />

        <PrimaryCTA
          label="Help Me Choose My Format"
          subtext="Tell us about your experience level and what you're seeking — we'll recommend the right format and duration."
          vertical="retreat"
          category="vipassana-comparison"
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

        <RelatedReads
          links={[
            { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
            { label: 'Is a Meditation Retreat Worth It?', href: '/is-a-meditation-retreat-worth-it' },
            { label: 'Silent Retreats', href: '/silent-retreats' },
            { label: 'Best Meditation Retreats in India', href: '/best-meditation-retreats-in-india' },
          ]}
        />

        {/* ── FOOTER ── */}
        <div className="med-vipassana-footer">
          <Link href="/meditation-retreats">← Meditation Retreats</Link>
          <Link href="/silent-retreats">Silent Retreats</Link>
          <Link href="/how-to-choose-a-meditation-retreat">How to Choose</Link>
        </div>

      </article>
    </TrackedPage>
  );
}