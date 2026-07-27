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

const PATH = '/how-long-should-a-meditation-retreat-be';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'How Long Should a Meditation Retreat Be? | Retreats And Treks',
    description:
      'Compare 3-day, 5-day, 7-day, and 10-day meditation retreats by depth, schedule, experience level, goals, and who each duration serves.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'How Long Should a Meditation Retreat Be?',
      description: '3 days vs 5 vs 7 vs 10 — which retreat duration is right for you.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('How Long Should a Meditation Retreat Be?'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Is a 3-day meditation retreat long enough to be effective?',
    answer:
      'Yes. A 3-day retreat provides a genuine shift in awareness and a meaningful break from routine. You will experience the core elements — sitting practice, silence, simplified living — and most participants report noticeable calm and clarity by day three. It is not as deep as a 7 or 10-day retreat, but it is far more effective than no retreat at all. It is the ideal starting point for beginners.',
  },
  {
    question: 'What is the difference between a 7-day and 10-day retreat?',
    answer:
      'The main difference is resolution depth. Both retreats hit the same difficult middle section (days 2–4), but a 10-day retreat gives you 3 extra days on the other side of that difficulty. These final days are where deeper insight tends to emerge. A 7-day retreat still provides significant depth and is more accessible for people with work or family commitments.',
  },
  {
    question: 'Should beginners start with a weekend retreat or a 3-day retreat?',
    answer:
      'A 3-day retreat if possible. Weekend retreats (2 days) are sometimes too short to move through the adjustment period — you arrive on Saturday, settle on Sunday, and leave before the retreat truly begins. Three days gives you one full day of actual practice between the transition days.',
  },
  {
    question: 'How many days off work do I need for a 7-day retreat?',
    answer:
      'Plan for 9 days total — 7 retreat days plus one travel day on each end. Arriving rushed and leaving immediately diminishes the experience. If possible, add one quiet day at home after the retreat before returning to work. The transition back to normal life is part of the practice.',
  },
  {
    question: 'Can I do multiple short retreats instead of one long one?',
    answer:
      'Yes, and many experienced practitioners prefer this approach. Three 3-day retreats per year can be more sustainable and equally transformative as one 10-day retreat. The benefit of longer retreats is depth — the benefit of repeated shorter retreats is consistency. Both paths work.',
  },
];

const comparisonRows = [
  ['Duration', '3 days', '5 days', '7 days', '10 days'],
  ['Best for', 'Beginners, busy schedules', 'Intermediate, specific focus', 'Deep practice, experienced + beginners', 'Advanced, serious practitioners'],
  ['Difficulty peak', 'Day 2 (may not resolve)', 'Days 2–3 (partial resolve)', 'Days 2–4 (full resolution by day 5)', 'Days 2–4 (extended resolution)'],
  ['Depth of experience', 'Introduction — taste of silence', 'Moderate — beginning of inner shift', 'Significant — sustained clarity', 'Profound — lasting behavioural change'],
  ['Time off required', '4–5 days total', '6–7 days total', '9 days total', '12 days total'],
  ['Post-retreat effect', '1–2 weeks', '2–3 weeks', '3–6 weeks', '1–3 months'],
];

export default function HowLongShouldARetreatBePage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'How Long Should a Retreat Be?', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Long Should a Meditation Retreat Be?',
    description: 'Comparing 3, 5, 7, and 10-day meditation retreats.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "How Long Should a Meditation Retreat Be?".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="How Long Should a Meditation Retreat Be?"
        description="Compare 3-day, 5-day, 7-day, and 10-day meditation retreats by depth, schedule, experience level, goals, and who each duration serves."
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

        .med-duration-table-wrap { overflow-x: auto; border-radius: 18px; border: 1px solid rgba(15,118,110,0.12); margin-top: 1.8rem; }
        .med-duration-table { width: 100%; border-collapse: collapse; font-family: var(--font-inter), sans-serif; font-size: 0.88rem; }
        .med-duration-table th { text-align: left; padding: 0.85rem 1rem; background: #f7f9f7; border-bottom: 2px solid #0f766e; font-weight: 600; color: #2B2A26; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; }
        .med-duration-table td { padding: 0.85rem 1rem; border-bottom: 1px solid rgba(15,118,110,0.08); color: #4b5259; }
        .med-duration-table tr:last-child td { border-bottom: none; }
        .med-duration-table tr:hover td { background: #f7f9f7; }
        .med-duration-table .med-highlight { color: #0f766e; font-weight: 600; }

        .med-duration-card { padding: 1.5rem; margin-bottom: 1.25rem; }
        .med-duration-card:last-child { margin-bottom: 0; }
        .med-duration-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-duration-card .med-h3 a { color: #0f766e; text-decoration: none; }
        .med-duration-card .med-h3 a:hover { text-decoration: underline; }
        .med-duration-card .med-body { font-size: 0.92rem; margin-bottom: 0.3rem; }
        .med-duration-card .med-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.2rem 0.6rem; border-radius: 999px; margin-bottom: 0.5rem; }

        .med-duration-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; margin-top: 1.8rem; }
        @media (max-width: 720px) { .med-duration-grid { grid-template-columns: 1fr; } }

        .med-duration-decision { margin-top: 1.5rem; }
        .med-duration-decision .med-list { margin-top: 0.5rem; }
        .med-duration-decision .med-list li a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-duration-decision .med-list li a:hover { text-decoration: underline; }

        .med-duration-footer-nav { display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; padding-top: 1.5rem; margin-top: 2rem; border-top: 1px solid rgba(15,118,110,0.08); }
        .med-duration-footer-nav a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
        .med-duration-footer-nav a:hover { text-decoration: underline; }
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
              { name: 'How Long Should a Retreat Be?' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Retreat Duration Guide</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              The right retreat length depends on three things: your experience level, your goals, and how much time you can genuinely give. Here is a clear breakdown of what each duration offers and who each serves best.
            </p>
            <div className="med-hero-tags">
              <span>3 Days</span>
              <span>5 Days</span>
              <span>7 Days</span>
              <span>10 Days</span>
            </div>
            <div className="med-hero-actions">
              <Link href="#plan" className="med-cta-btn">Find My Duration</Link>
              <a href="#comparison" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Compare All</a>
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section id="comparison" className="med-shell med-section-white" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">At a Glance</span>
            </div>
            <h2 className="med-h2">Duration <span>Comparison</span></h2>
            <p className="med-body">A clear overview of what each retreat length offers, who it serves best, and what to expect.</p>

            <div className="med-duration-table-wrap">
              <table className="med-duration-table">
                <thead>
                  <tr>
                    {comparisonRows[0].map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.slice(1).map(([dim, ...cols]) => (
                    <tr key={dim}>
                      <td style={{ fontWeight: 600, color: '#2B2A26' }}>{dim}</td>
                      {cols.map((val, i) => (
                        <td key={i}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── DETAILED BREAKDOWN ── */}
        <section className="med-shell med-section-alt" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Detailed Breakdown</span>
            </div>
            <h2 className="med-h2">What Each Duration <span>Offers</span></h2>

            <div className="med-duration-grid">
              {/* 3-Day */}
              <div className="med-card med-duration-card">
                <span className="med-tag">Gateway</span>
                <h3 className="med-h3"><Link href="/3-day-meditation-retreat">3-Day Retreat — The Gateway</Link></h3>
                <p className="med-body">A <Link href="/3-day-meditation-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>3-day meditation retreat</Link> is the minimum effective dose. You get one day of transition, one full day of practice, and one day of integration. It teaches you whether retreat practice works for you without requiring a major time commitment.</p>
                <p className="med-body"><strong>Choose 3 days if:</strong> you have never done a retreat, you cannot take a full week off, or you want to test whether you can handle silence before committing to something longer.</p>
                <p className="med-body" style={{ fontSize: '0.85rem', color: '#6b7280' }}><strong>Know this:</strong> you may hit the hard part (day 2) without experiencing the resolution that comes on days 4–5 of longer retreats.</p>
              </div>

              {/* 5-Day */}
              <div className="med-card med-duration-card">
                <span className="med-tag">Practical Middle</span>
                <h3 className="med-h3"><Link href="/5-day-yoga-retreat">5-Day Retreat — The Practical Middle</Link></h3>
                <p className="med-body">Five days gives you time to move through the difficult middle and begin to experience what is on the other side. You get one transition day, two or three hard days, and one or two days of settling.</p>
                <p className="med-body"><strong>Choose 5 days if:</strong> you have done a 3-day retreat before and want more depth, or the programme combines meditation with yoga, nature, or facilitated workshops that benefit from the extra days.</p>
              </div>

              {/* 7-Day */}
              <div className="med-card med-duration-card">
                <span className="med-tag">Sweet Spot</span>
                <h3 className="med-h3"><Link href="/7-day-meditation-retreat">7-Day Retreat — The Sweet Spot</Link></h3>
                <p className="med-body">Seven days is what most experienced teachers recommend. The <Link href="/7-day-meditation-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>7-day meditation retreat</Link> gives you time to arrive (day 1), struggle (days 2–4), settle (day 5), and experience genuine clarity (days 6–7). The arc is complete.</p>
                <p className="med-body"><strong>Choose 7 days if:</strong> you want depth without the significant time commitment of 10 days. Suitable for both beginners and experienced practitioners.</p>
              </div>

              {/* 10-Day */}
              <div className="med-card med-duration-card">
                <span className="med-tag">Deep Dive</span>
                <h3 className="med-h3"><Link href="/10-day-silent-retreat">10-Day Retreat — The Deep Dive</Link></h3>
                <p className="med-body">A <Link href="/10-day-silent-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>10-day silent retreat</Link> is the traditional format. The extra three days beyond the 7-day structure allow for deeper integration, more sustained silence, and insights that only emerge after extended practice.</p>
                <p className="med-body"><strong>Choose 10 days if:</strong> you have completed at least one shorter retreat, your practice is established, and you can commit the time without creating stress in your life.</p>
                <p className="med-body" style={{ fontSize: '0.85rem', color: '#6b7280' }}>Read about the <Link href="/how-hard-is-a-silent-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>real difficulty of silent retreats</Link> to calibrate your expectations.</p>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          id="plan"
          label="Find the Right Duration for You"
          subtext="Take our short quiz to match your experience and goals with the ideal retreat length."
          vertical="retreat"
          category="duration-guide"
          sourcePath={PATH}
        />

        {/* ── DECISION FRAMEWORK ── */}
        <section className="med-shell med-section-white" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Decision Guide</span>
            </div>
            <h2 className="med-h2">Simple <span>Decision Framework</span></h2>

            <div className="med-duration-decision">
              <ul className="med-list">
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>Never done a retreat?</strong> Start with <Link href="/3-day-meditation-retreat">3 days</Link></span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>Done one retreat and want more?</strong> Try <Link href="/7-day-meditation-retreat">7 days</Link></span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>Regular practitioner seeking depth?</strong> Go for <Link href="/10-day-silent-retreat">10 days</Link></span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>Limited time but experienced?</strong> A focused 3–5 day retreat can be remarkably effective for people who already have a sitting practice</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>Unsure?</strong> Use our <Link href="/find-your-retreat">retreat finder</Link> for a personalised recommendation</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <FeaturedRetreat
          title="Choose Your Duration"
          description="We run 3, 5, 7, and 10-day retreats across two Himalayan locations. All programmes include facilitation, meals, and accommodation."
          links={[
            { label: '3-day retreat', href: '/3-day-meditation-retreat' },
            { label: '7-day retreat', href: '/7-day-meditation-retreat' },
            { label: '10-day retreat', href: '/10-day-silent-retreat' },
            { label: 'All dates', href: '/retreat-calendar' },
          ]}
        />

        {/* ── FAQ ── */}
        <section className="med-shell med-section-alt" style={{ padding: '4rem 0' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Common Questions</span>
            </div>
            <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
            <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
          </div>
        </section>

        <RelatedReads
          links={[
            { label: 'How Hard Is a Silent Retreat?', href: '/how-hard-is-a-silent-retreat' },
            { label: 'First Day of a Meditation Retreat', href: '/first-day-of-a-meditation-retreat' },
            { label: 'Is a Meditation Retreat Worth It?', href: '/is-a-meditation-retreat-worth-it' },
            { label: 'What to Expect at a Meditation Retreat', href: '/what-to-expect-at-a-meditation-retreat' },
          ]}
        />

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/meditation-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Meditation Retreats</span>
              </Link>
              <Link href="/what-to-expect-at-a-meditation-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>What to Expect</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/is-a-meditation-retreat-worth-it" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Is It Worth It?</span>
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