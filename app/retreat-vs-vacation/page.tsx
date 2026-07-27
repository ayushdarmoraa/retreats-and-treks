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

const PATH = '/retreat-vs-vacation';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Retreat vs Vacation | Retreats And Treks',
    description:
      'Retreat vs vacation: why rest does not always mean recovery, what retreats offer beyond holidays, and how to choose what you need now.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Retreat vs Vacation — What Is the Difference?',
      description: 'Why holidays don\'t fix burnout. What a retreat does that a vacation cannot.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Retreat vs Vacation — What Is the Difference?'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Can a vacation be restorative like a retreat?',
    answer:
      'A vacation can provide rest and pleasure, but it rarely provides the conditions for deep restoration. Vacations maintain your connection to your identity — you are still you, just in a nicer location. Retreats disrupt that connection by removing the inputs that sustain your habitual self (devices, conversations, decisions, entertainment). If what you need is pleasure and novelty, take a vacation. If what you need is genuine recalibration, choose a retreat.',
  },
  {
    question: 'Is a retreat harder than a vacation?',
    answer:
      'In some ways, yes. A retreat asks you to give up comfort, distraction, and habitual stimulation. The first day can be uncomfortable — especially on a silent retreat. But the kind of rest a retreat provides is qualitatively different from the relaxation of a holiday. A vacation relaxes the surface. A retreat reaches the depth.',
  },
  {
    question: 'Do I need to meditate on a retreat?',
    answer:
      'Not all retreats are meditation-focused. Some emphasise yoga, nature immersion, somatic work, or creative expression. What all genuine retreats share is structure, intention, and separation from daily life. If sitting meditation feels daunting, there are retreats that use walking, movement, or nature as the primary practice.',
  },
  {
    question: 'Can I bring my partner on a retreat?',
    answer:
      'Some retreats welcome couples, though the experience is often individual — especially on silent retreats where you will not be speaking to each other. Attending a retreat with a partner can be meaningful if both people are genuinely seeking the experience. It can be counterproductive if one person is attending to please the other. Discuss intentions honestly before booking together.',
  },
  {
    question: 'How long should a retreat be compared to a vacation?',
    answer:
      'A vacation can be any length — a weekend getaway works because pleasure is immediate. A retreat needs at least three days for genuine depth. The first day is transition, the second is settling, and the third is where the real work begins. For deeper transformation, five to seven days is optimal. This is why retreats feel like a bigger commitment — because they are.',
  },
  {
    question: 'What if I need both — rest and depth?',
    answer:
      'Consider a retreat that includes periods of unstructured time in a beautiful environment. Many Himalayan retreats combine practice with free time in nature — you get the depth of meditation and the pleasure of mountain beauty. Chakrata is particularly good for this balance: structured practice plus forest walks, clean air, and genuine rest.',
  },
];

export default function RetreatVsVacationPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreat vs Vacation', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Retreat vs Vacation — What Is the Difference?',
    description: 'Understanding the real difference between a retreat and a vacation.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Retreat vs Vacation: What Is the Difference?".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Retreat vs Vacation — What Is the Difference?"
        description="Understanding the real difference between a retreat and a vacation."
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

        .med-section-padding { padding: 4rem 0; }
        .med-section-padding-sm { padding: 3rem 0; }

        /* ── Page specific styles ── */
        .med-compare-table-wrap { overflow-x: auto; border-radius: 18px; border: 1px solid rgba(15,118,110,0.12); margin-top: 1.5rem; }
        .med-compare-table { width: 100%; border-collapse: collapse; font-family: var(--font-inter), sans-serif; font-size: 0.88rem; }
        .med-compare-table th { text-align: left; padding: 0.85rem 1rem; background: #f7f9f7; border-bottom: 2px solid #0f766e; font-weight: 600; color: #2B2A26; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; }
        .med-compare-table td { padding: 0.85rem 1rem; border-bottom: 1px solid rgba(15,118,110,0.08); color: #4b5259; }
        .med-compare-table tr:last-child td { border-bottom: none; }
        .med-compare-table tr:hover td { background: #f7f9f7; }
        .med-compare-table .med-highlight { color: #0f766e; font-weight: 600; }

        .med-choice-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; margin-top: 1.5rem; }
        @media (max-width: 720px) { .med-choice-grid { grid-template-columns: 1fr; } }
        .med-choice-card { padding: 1.5rem; }
        .med-choice-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-choice-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-choice-list { padding-left: 1.25rem; line-height: 2; margin-bottom: 0.75rem; }
        .med-choice-list li strong { color: #2B2A26; font-weight: 600; }
        .med-choice-list li a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-choice-list li a:hover { text-decoration: underline; }

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

        .med-vs-footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1.5rem;
          justify-content: center;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(15,118,110,0.08);
        }
        .med-vs-footer-links a {
          color: #0f766e;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
        }
        .med-vs-footer-links a:hover { text-decoration: underline; }
        .med-vs-footer-links .divider { color: #d1d5db; }
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
              { name: 'Retreat vs Vacation' },
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
              Most people conflate retreats and vacations. Both involve leaving home. Both promise rest. But they work on fundamentally different levels. A vacation changes your scenery. A retreat changes your state. Understanding this difference might be the most important thing you read before booking either one.
            </p>
            <div className="med-hero-tags">
              <span>Vacation Adds</span>
              <span>Retreat Subtracts</span>
              <span>Pleasure vs Depth</span>
              <span>Burnout Recovery</span>
            </div>
            <div className="med-hero-actions">
              <a href="#comparison" className="med-cta-btn">View Comparison</a>
              <a href="#when-to-choose" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>When to Choose</a>
            </div>
          </div>
        </section>

        {/* ── CORE DIFFERENCE ── */}
        <section id="comparison" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Difference</span>
            </div>
            <h2 className="med-h2">The Core <span>Difference</span></h2>
            <p className="med-body">
              A vacation adds — new experiences, new sights, new pleasures, new meals, new entertainment. A retreat subtracts — removes noise, removes decisions, removes stimulation, removes social performance. Both have value. But they address different needs.
            </p>

            <div className="med-compare-table-wrap">
              <table className="med-compare-table">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Vacation</th>
                    <th>Retreat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600, color: '#2B2A26' }}>Purpose</td>
                    <td>Pleasure, novelty, relaxation</td>
                    <td>Depth, recalibration, transformation</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: '#2B2A26' }}>Stimulation</td>
                    <td>More than usual</td>
                    <td>Less than usual</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: '#2B2A26' }}>Devices</td>
                    <td>Ever-present (photos, maps, reviews)</td>
                    <td>Removed or minimised</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: '#2B2A26' }}>Schedule</td>
                    <td>Self-directed, spontaneous</td>
                    <td>Structured, held by guides</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: '#2B2A26' }}>Social</td>
                    <td>Conversation, companionship</td>
                    <td>Often silent or minimal conversation</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: '#2B2A26' }}>Effect</td>
                    <td>Refreshed, entertained</td>
                    <td>Changed, recalibrated</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, color: '#2B2A26' }}>After-effect</td>
                    <td>Often fades within days</td>
                    <td>Often deepens over weeks</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── WHY VACATIONS DON'T FIX BURNOUT ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Burnout</span>
            </div>
            <h2 className="med-h2">Why Vacations Do Not <span>Fix Burnout</span></h2>
            <p className="med-body">
              If you are genuinely burned out — not tired, but depleted at the level of meaning and motivation — a vacation will not fix it. You will lie on a beach and still feel empty. You will visit beautiful places and feel nothing. This is because burnout is not a deficit of pleasure. It is a deficit of depth.
            </p>
            <p className="med-body">
              A retreat addresses this by removing the conditions that caused the burnout: constant stimulation, decision fatigue, social performance, and the unrelenting pressure to be productive. In a Himalayan retreat, the mountains do not care about your productivity. The forest does not ask for output. This is the medicine. See our <Link href="/burnout-recovery-retreats" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>burnout recovery retreats</Link>. If you are comparing retreat work with clinical support, read our guide to <Link href="/retreat-vs-therapy" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>retreat vs therapy</Link>.
            </p>
          </div>
        </section>

        <PrimaryCTA
          label="Explore Our Retreats"
          subtext="Not sure if you need a retreat or a vacation? Talk to us honestly — we'll help you decide."
          vertical="retreat"
          category="guide-retreat-vs-vacation"
          sourcePath={PATH}
        />

        {/* ── WHEN TO CHOOSE ── */}
        <section id="when-to-choose" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Decision Guide</span>
            </div>
            <h2 className="med-h2">How to Know <span>Which One You Need</span></h2>

            <div className="med-choice-grid">
              <div className="med-card med-choice-card">
                <h3 className="med-h3">Choose a Vacation If</h3>
                <ul className="med-choice-list">
                  <li>You are generally well but need a break from routine</li>
                  <li>You want to explore a new place</li>
                  <li>You want shared pleasure with friends or family</li>
                  <li>You need novelty and stimulation</li>
                </ul>
              </div>
              <div className="med-card med-choice-card">
                <h3 className="med-h3">Choose a Retreat If</h3>
                <ul className="med-choice-list">
                  <li>Vacations no longer refresh you</li>
                  <li>You feel disconnected from yourself or your work</li>
                  <li>You are carrying stress that sleep does not resolve</li>
                  <li>You suspect the problem is not tiredness but something deeper</li>
                  <li>You need silence more than entertainment</li>
                </ul>
              </div>
            </div>

            <p className="med-body" style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '1.05rem' }}>
              If you are reading this page, the honest answer is probably: <strong>retreat</strong>.
            </p>
          </div>
        </section>

        {/* ── WHY THE HIMALAYAS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Location</span>
            </div>
            <h2 className="med-h2">Why the Himalayas <span>(Not Just Any Retreat)</span></h2>
            <p className="med-body">
              You can do a retreat in a city studio, a suburban centre, or a converted farmhouse. But the Himalayas offer something these cannot: environmental medicine. The altitude naturally slows the mind. The forest acoustics regulate the nervous system. The remoteness creates genuine psychological separation from daily life. The beauty is constant and requires nothing of you.
            </p>
            <p className="med-body">
              Explore our <Link href="/locations" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>retreat locations</Link> or read about the <Link href="/benefits-of-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>specific benefits of Himalayan retreats</Link>.
            </p>
          </div>
        </section>

        <PrimaryCTA
          label="Find My Retreat"
          subtext="Ready to go beyond a vacation? Tell us what you need and we'll recommend the right retreat."
          vertical="retreat"
          category="guide-retreat-vs-vacation"
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

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/how-to-choose-a-meditation-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← How to Choose a Retreat</span>
              </Link>
              <Link href="/how-to-prepare-for-a-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>How to Prepare</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/benefits-of-himalayan-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Benefits of Himalayan Retreats</span>
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