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

const PATH = '/retreat-vs-therapy';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Retreat vs Therapy | Retreats And Treks',
    description:
      'Retreat vs therapy: when a meditation retreat helps, when psychotherapy is better, and when both support stress, burnout, and emotional processing.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Retreat vs Therapy — Can a Meditation Retreat Replace Therapy?',
      description: 'Retreats and therapy serve different functions. Here is when each one is the right tool.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Retreat vs Therapy — Can a Meditation Retreat Replace Therapy?'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Can a meditation retreat replace therapy?',
    answer:
      'No. A retreat can complement therapy powerfully but should not replace it for conditions requiring ongoing professional support — including clinical depression, PTSD, personality disorders, or active substance dependence. Retreats work at the level of the nervous system and experiential awareness. Therapy works at the level of narrative, relational patterns, and clinical diagnosis. They are different tools for different layers of the same person.',
  },
  {
    question: 'Is it safe to attend a retreat if I am in therapy?',
    answer:
      'Generally yes, and many therapists actively recommend retreat experiences as complementary practice. Inform your therapist before attending so they can help you prepare and integrate afterward. If you are working through acute trauma or recently destabilised material, discuss timing with your therapist — a retreat may be best scheduled after a period of stabilisation, not during active processing.',
  },
  {
    question: 'What does a retreat do that therapy cannot?',
    answer:
      'A retreat provides extended immersion that therapy sessions cannot replicate — 3 to 10 days of sustained practice in a low-stimulus environment. This allows the nervous system to downregulate deeply, produces experiential insight (knowing through direct perception rather than cognitive understanding), and creates a felt reference point for regulated awareness that persists after the retreat ends.',
  },
  {
    question: 'Should I do therapy before my first retreat?',
    answer:
      'If you have no active mental health concerns, therapy is not a prerequisite. If you are managing anxiety, depression, or trauma, having an existing therapeutic relationship provides a safety net — someone who knows your history and can help you integrate whatever arises during the retreat. Either way, our facilitators screen for contraindications and provide support throughout.',
  },
  {
    question: 'Can a retreat bring up things I should process in therapy?',
    answer:
      'Yes, and this is often valuable. Extended silence and reduced stimulation allow suppressed material to surface — emotions, memories, and patterns that are usually masked by daily activity. This is not a problem. It is the beginning of processing. Having a therapist to work with after the retreat helps integrate these experiences into your ongoing growth.',
  },
];

export default function RetreatVsTherapyPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'Retreat vs Therapy', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Retreat vs Therapy — Can a Meditation Retreat Replace Therapy?',
    description: 'An honest comparison of retreats and psychotherapy — when each is appropriate and when you need both.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Retreat vs Therapy: When Each One Is the Right Tool".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Retreat vs Therapy — Can a Meditation Retreat Replace Therapy?"
        description="Retreats and therapy serve different functions. Here is when each one is the right tool."
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
        .med-therapy-card { padding: 1.5rem; }
        .med-therapy-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-therapy-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-therapy-list { padding-left: 1.25rem; line-height: 2; margin-bottom: 1rem; }
        .med-therapy-list li strong { color: #2B2A26; font-weight: 600; }
        .med-therapy-list li a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-therapy-list li a:hover { text-decoration: underline; }

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
              { name: 'Retreat vs Therapy' },
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
              This question comes up more and more as meditation retreats enter mainstream wellness culture. Can a retreat do what therapy does? Should you see a therapist instead of attending a retreat? The honest answer is nuanced: they are different tools that work on different layers of the same person, and the best outcomes often come from combining both.
            </p>
            <div className="med-hero-tags">
              <span>What Therapy Does</span>
              <span>What a Retreat Does</span>
              <span>When Both Together</span>
              <span>Honest Assessment</span>
            </div>
            <div className="med-hero-actions">
              <a href="#therapy" className="med-cta-btn">What Therapy Does</a>
              <a href="#retreat" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>What a Retreat Does</a>
            </div>
          </div>
        </section>

        {/* ── WHAT THERAPY DOES ── */}
        <section id="therapy" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Therapy</span>
            </div>
            <h2 className="med-h2">What <span>Therapy Does</span></h2>
            <p className="med-body">
              Psychotherapy works primarily through narrative, relationship, and clinical framework. A skilled therapist helps you identify patterns in your thinking and behaviour, understand their origins, develop new cognitive and relational strategies, and process traumatic or difficult experiences through the safety of a professional relationship.
            </p>
            <p className="med-body">
              <strong>Therapy's strengths</strong> are specificity (it addresses your particular history and patterns), ongoing support (weekly sessions over months or years), clinical expertise (diagnosing and treating mental health conditions), and relational healing (the therapeutic relationship itself is a corrective experience for attachment and trust).
            </p>
            <p className="med-body">
              <strong>Therapy's limitation</strong> is format: 50-minute sessions once per week, within your normal life context. The environment does not change. The stimulation level does not change. The nervous system state you bring into the session is the same one you carry through the rest of your week.
            </p>
          </div>
        </section>

        {/* ── WHAT A RETREAT DOES ── */}
        <section id="retreat" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Retreat</span>
            </div>
            <h2 className="med-h2">What a <span>Retreat Does</span></h2>
            <p className="med-body">
              A meditation retreat works primarily through environment, duration, and direct experience. By removing external stimulation for 3–10 days and replacing it with structured practice in a supportive setting, a retreat produces changes that are experiential rather than cognitive.
            </p>
            <p className="med-body">
              The nervous system downregulates deeply — cortisol drops, sleep architecture improves, the default mode network quiets. Emotions that were suppressed by daily activity surface and move through the system. Habitual thought patterns become visible as patterns rather than truths. Read <Link href="/what-happens-to-your-mind-in-silence" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>the full neuroscience of what silence does to the mind</Link>.
            </p>
            <p className="med-body">
              <strong>A retreat's strength</strong> is immersion: sustained, uninterrupted depth that no weekly session can replicate. Its limitation is that it does not provide ongoing clinical support, diagnostic expertise, or the relational healing that therapy offers.
            </p>
          </div>
        </section>

        <PrimaryCTA
          label="Talk to Us About Your Situation"
          subtext="We'll help you assess whether a retreat is right for where you are right now."
          vertical="retreat"
          category="retreat-vs-therapy"
          sourcePath={PATH}
        />

        {/* ── CHOOSE A RETREAT WHEN ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Decision Guide</span>
            </div>
            <h2 className="med-h2">Choose a <span>Retreat</span> When…</h2>

            <ul className="med-therapy-list">
              <li>You are functional but running on chronic stress that holidays do not resolve</li>
              <li>You want a direct experience of what a regulated nervous system feels like</li>
              <li>Your meditation practice has plateaued and needs depth</li>
              <li>You are in a life transition and need sustained space to process it</li>
              <li>You want to develop body-based awareness that cognitive therapy alone does not provide</li>
              <li>Your therapist has recommended a contemplative experience as complementary work</li>
            </ul>
            <p className="med-body">
              Read <Link href="/why-people-go-to-meditation-retreats" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>why people actually go to retreats</Link> — the real motivations are often surprising.
            </p>
          </div>
        </section>

        {/* ── CHOOSE THERAPY WHEN ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Decision Guide</span>
            </div>
            <h2 className="med-h2">Choose <span>Therapy</span> When…</h2>

            <ul className="med-therapy-list">
              <li>You are experiencing clinical depression, anxiety disorder, or PTSD</li>
              <li>You have active suicidal ideation or self-harm patterns</li>
              <li>You need to process specific traumatic events with professional guidance</li>
              <li>You are navigating a relationship crisis that requires relational skills building</li>
              <li>You need ongoing weekly support rather than an intensive one-time intervention</li>
              <li>You have substance dependence requiring clinical management</li>
            </ul>
            <p className="med-body">
              These are not weaknesses — they are situations where clinical expertise is the appropriate first response. A retreat may become valuable later, after stabilisation.
            </p>
          </div>
        </section>

        {/* ── WHEN BOTH TOGETHER ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Best Approach</span>
            </div>
            <h2 className="med-h2">When Both Together Is the <span>Best Approach</span></h2>
            <p className="med-body">
              The most powerful combination is ongoing therapy plus periodic retreat. Here is why: therapy provides the narrative framework and relational container for understanding your experience. A retreat provides the experiential depth and nervous system reset that cognitive understanding alone cannot achieve.
            </p>
            <p className="med-body">
              Many of our participants are in active therapy. Their therapists report that clients return from retreats with new material — insights, body memories, emotional processings — that advances therapeutic work by weeks or months. The retreat provides the raw experience. Therapy helps integrate it.
            </p>
            <p className="med-body">
              For <Link href="/burnout-recovery-retreats" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>burnout recovery</Link> in particular, this combination is highly effective. Therapy addresses the cognitive and behavioural patterns that led to burnout. A retreat addresses the nervous system dysregulation that maintains it. Neither alone is as effective as both together.
            </p>
          </div>
        </section>

        {/* ── WHAT A RETREAT CANNOT DO ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Honest Limitations</span>
            </div>
            <h2 className="med-h2">What a Retreat <span>Cannot Do</span></h2>
            <p className="med-body">
              We believe in honesty about limitations. A retreat cannot diagnose mental health conditions. It cannot provide the ongoing relational container of weekly therapy. It cannot prescribe or manage medication. It is not a crisis intervention. And it cannot undo years of accumulated patterns in a single sitting.
            </p>
            <p className="med-body">
              What it can do is give you 3–10 days of sustained contact with your own mind under conditions that make depth possible. That experience — and the reference point it creates — is something most people describe as transformative. But it is a complement to a full life of self-care, not a replacement for it.
            </p>
          </div>
        </section>

        <FeaturedRetreat
          title="Burnout Recovery Retreat — When Rest Isn't Enough"
          description="Designed for depleted nervous systems. Gentle pacing, nature immersion, and skilled facilitation in the Himalayan forest."
          links={[
            { label: 'View programme', href: '/burnout-recovery-retreats' },
            { label: 'Explore Chakrata', href: '/locations/chakrata' },
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
            { label: 'Why People Go to Meditation Retreats', href: '/why-people-go-to-meditation-retreats' },
            { label: 'Is a Meditation Retreat Worth It?', href: '/is-a-meditation-retreat-worth-it' },
            { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
            { label: 'Burnout Recovery Retreats', href: '/burnout-recovery-retreats' },
          ]}
        />

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/meditation-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Meditation Retreats</span>
              </Link>
              <Link href="/burnout-recovery-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Burnout Recovery</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/retreat-vs-vacation" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreat vs Vacation</span>
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