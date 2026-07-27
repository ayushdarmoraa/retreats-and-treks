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

const PATH = '/what-happens-to-your-mind-in-silence';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'What Happens to Your Mind in Silence',
    description:
      'What happens to your mind in silence: neuroscience, psychology, retreat stages, restlessness, breakthrough, and lasting change.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'What Happens to Your Mind in Silence',
      description:
        'The psychology and neuroscience of what silence does to your brain — from day one restlessness to the deep shifts of day five and beyond.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('What Happens to Your Mind in Silence'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What happens to the brain during extended silence?',
    answer:
      'During sustained silence, the default mode network — the brain regions responsible for mind-wandering, self-referential thought, and rumination — gradually reduces its activity. Simultaneously, the prefrontal cortex and sensory processing regions become more active. The subjective experience is a shift from thinking about experience to directly perceiving it. This transition typically begins around 48–72 hours of silence.',
  },
  {
    question: 'Is silence psychologically safe for everyone?',
    answer:
      'Extended silence is safe for most people but is not recommended for those with active psychotic disorders, severe untreated depression, or recent trauma requiring stabilisation. The reduction of external stimulation can intensify internal experience, which is therapeutic for most but potentially destabilising for some. Our facilitators screen for contraindications and provide support throughout.',
  },
  {
    question: 'How long does it take for silence to change your brain?',
    answer:
      'Research shows measurable changes in brain activity within 48 hours of sustained silence. The default mode network quiets, cortisol levels drop, and sleep architecture improves. More substantial neuroplastic changes — observable on fMRI — appear after 5–10 days of intensive silent practice. The subjective experience of a "shift" typically occurs between days 3 and 5.',
  },
  {
    question: 'Why does silence make some people anxious?',
    answer:
      'Silence removes the external inputs that normally regulate attention and emotion. Without these inputs, the mind generates its own content — which often includes suppressed anxiety, unprocessed emotions, and intrusive thoughts that are usually masked by activity and noise. This is not a dysfunction; it is the beginning of processing. The anxiety typically peaks on day one or two and resolves as the nervous system adapts.',
  },
  {
    question: 'Do the effects of a silent retreat last?',
    answer:
      'Research published in Psychoneuroendocrinology and Frontiers in Psychology shows that the benefits of a 5–10 day silent retreat — reduced cortisol, improved emotional regulation, enhanced attention — persist for 4–8 weeks after the retreat ends. Participants who maintain a daily practice afterward retain benefits longer. The most durable change is perceptual: knowing what undistracted awareness feels like creates a reference point that does not disappear.',
  },
];

export default function WhatHappensToYourMindPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Silent Retreats', url: buildCanonicalUrl('/silent-retreats') },
    { name: 'What Happens to Your Mind in Silence', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Happens to Your Mind in Silence — The Psychology of Silent Retreats',
    description:
      'The neuroscience and psychology of what extended silence does to the human brain — stage by stage.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-02-01',
    dateModified: '2026-03-01',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "What Happens to Your Mind in Silence: The Psychology of Extended Quiet".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="What Happens to Your Mind in Silence — The Psychology of Silent Retreats"
        description="The neuroscience and psychology of what extended silence does to the human brain — stage by stage."
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
        .med-mind-card { padding: 1.5rem; }
        .med-mind-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-mind-card .med-body { font-size: 0.92rem; margin-bottom: 0; }
        .med-mind-card .med-badge {
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

        .med-mind-stage-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; margin-top: 1.5rem; }
        @media (max-width: 720px) { .med-mind-stage-grid { grid-template-columns: 1fr; } }

        .med-mind-stage-card { padding: 1.5rem; border-left: 4px solid #0f766e; }
        .med-mind-stage-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-mind-stage-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-mind-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
        .med-mind-list li { display: grid; grid-template-columns: 1.5rem 1fr; gap: 0.5rem; align-items: flex-start; }
        .med-mind-list li::before { content: '✦'; color: #0f766e; font-size: 0.7rem; margin-top: 2px; }
        .med-mind-list li strong { color: #2B2A26; font-weight: 600; }
        .med-mind-list li a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-mind-list li a:hover { text-decoration: underline; }

        .med-mind-footer { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; justify-content: center; padding: 2rem 0 4rem; border-top: 1px solid rgba(15,118,110,0.08); margin-top: 2rem; }
        .med-mind-footer a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
        .med-mind-footer a:hover { color: #0d6b64; text-decoration: underline; }

        .med-mind-science { padding: 1.5rem; background: #f7f9f7; border-radius: 12px; border: 1px solid rgba(15,118,110,0.06); margin-top: 1.5rem; }
        .med-mind-science .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-mind-science .med-body { font-size: 0.92rem; margin-bottom: 0; }

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
              { name: 'What Happens to Your Mind in Silence' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Psychology of Silence</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Silence is not the absence of experience. It is the removal of one particular kind of input — linguistic, social, informational — so that every other kind of experience becomes louder, clearer, and more available. What happens when you stop speaking, stop consuming, and stop performing for three, five, or ten days is not nothing. It is a sequence of psychological stages as predictable as they are profound.
            </p>
            <div className="med-hero-tags">
              <span>Neuroscience</span>
              <span>Stage 1: Noise</span>
              <span>Stage 3: Settling</span>
              <span>Stage 5: Spaciousness</span>
            </div>
            <div className="med-hero-actions">
              <a href="#stages" className="med-cta-btn">The Stages</a>
              <a href="#science" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>The Science</a>
            </div>
          </div>
        </section>

        {/* ── STAGE 1 ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Stage 1</span>
            </div>
            <div className="med-card med-mind-card">
              <span className="med-badge">Hours 0–12</span>
              <h2 className="med-h2" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>The Mind <span>Gets Louder</span></h2>
              <p className="med-body">
                The first paradox of silence is that it is not quiet. When external noise is removed, internal noise amplifies. The mind, accustomed to processing a continuous stream of language, information, and social input, does not simply stop when the stream is cut off. It generates its own content — replaying conversations, composing emails, rehearsing future interactions, narrating the present moment.
              </p>
              <p className="med-body">
                Neuroscience explains this clearly. The default mode network (DMN) — a set of brain regions including the medial prefrontal cortex and posterior cingulate cortex — activates automatically when external demands decrease. The DMN is the neural substrate of mind-wandering, self-referential thought, and rumination. In normal life, its activity is partially masked by task-focused attention. In silence, it takes centre stage.
              </p>
              <p className="med-body">
                The subjective experience is a torrent of mental chatter that can feel overwhelming. Participants on <Link href="/3-day-silent-retreat">their first silent retreat</Link> consistently report surprise at the volume and persistence of their own thoughts. "I had no idea my mind was this noisy," is the most common first-day observation. This is not a problem. It is the beginning of awareness.
              </p>
            </div>
          </div>
        </section>

        {/* ── STAGE 2 ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Stage 2</span>
            </div>
            <div className="med-card med-mind-card">
              <span className="med-badge">Hours 12–36</span>
              <h2 className="med-h2" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Resistance <span>and Restlessness</span></h2>
              <p className="med-body">
                As the novelty of silence fades, resistance emerges. The mind produces increasingly creative arguments for breaking the container: boredom, physical discomfort, urgent "needs" that were not urgent yesterday, and the conviction that the retreat is not working.
              </p>
              <p className="med-body">
                This resistance is not random. It is the habitual mind defending its patterns. Psychologists describe it as the ego's response to the removal of its primary tools: language, social positioning, and narrative control. Without the ability to speak, the constructed self has no audience. Without information input, the planning mind has nothing to plan. The result is a form of psychological vertigo.
              </p>
              <p className="med-body">
                This is the stage where many people on unsupported solo retreats quit. The value of a structured retreat with skilled facilitation is that the container holds you through the resistance. The schedule continues. The bell rings. You sit again. The <Link href="/what-i-learned-from-a-silent-retreat">day-two struggle described in this retreat account</Link> is characteristic of this stage.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Experience Silence with Support"
          subtext="Structured silent retreats with skilled facilitators. 3 to 10 days in the Himalayas."
          vertical="retreat"
          category="mind-in-silence"
          sourcePath={PATH}
        />

        {/* ── STAGE 3 ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Stage 3</span>
            </div>
            <div className="med-card med-mind-card">
              <span className="med-badge">Hours 36–72</span>
              <h2 className="med-h2" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>The Nervous System <span>Begins to Settle</span></h2>
              <p className="med-body">
                Around 48 hours of sustained silence, a measurable shift occurs. Research using EEG and fMRI during meditation retreats shows reduced DMN activity, increased alpha and theta brainwave power, and lower tonic cortisol levels. The stress response begins to downregulate — not because you have solved any problems, but because the system is no longer being fed the inputs that maintain chronic arousal.
              </p>
              <p className="med-body">
                The subjective experience of this transition is distinctive. The mental chatter does not stop — it softens. The space between thoughts widens. Sensory experience becomes more vivid: colours appear brighter, sounds more textured, bodily sensations more nuanced. Several participants describe this as a sharpening of presence — not an altered state, but a less filtered version of ordinary awareness.
              </p>
              <p className="med-body">
                For those in <Link href="/locations/chakrata">forest environments like Chakrata</Link>, the settling is amplified by acoustic ecology. Old-growth deodar forest absorbs ambient sound and produces natural sonic textures — bird calls, wind through branches, distant water — that research shows activate parasympathetic recovery more effectively than artificial silence or white noise.
              </p>
            </div>
          </div>
        </section>

        {/* ── STAGE 4 ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Stage 4</span>
            </div>
            <div className="med-card med-mind-card">
              <span className="med-badge">Days 3–5</span>
              <h2 className="med-h2" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>The Mind <span>Reorganises</span></h2>
              <p className="med-body">
                After seventy-two hours, the deeper work begins. With the habitual mind quieter and the nervous system in a more regulated state, material that has been held beneath conscious awareness begins to surface. This is where retreat experience diverges from daily meditation: the extended timeframe allows processing that cannot occur in twenty-minute sessions.
              </p>
              <p className="med-body">
                <strong>Emotional processing.</strong> Unresolved feelings — grief, anger, regret, longing — arise without the usual triggers. They appear in the body as sensation: tightness in the chest, heat in the face, a lump in the throat. In silence, without the option of narrating or discussing these feelings, participants learn to sit with them directly. This is a third mode — witnessing — where emotions are felt, acknowledged, and allowed to move through the system without being controlled.
              </p>
              <p className="med-body">
                <strong>Pattern recognition.</strong> With reduced external input, the mind begins to perceive its own patterns with unusual clarity. Habitual thought loops — self-criticism, worry about the future, replaying of the past — become visible as patterns rather than truths. Participants describe this as "seeing the machinery" — recognising that the thoughts they have been identifying with are repetitive, automatic, and largely impersonal.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Find a Silent Retreat"
          subtext="3 to 10 days. Himalayan forest or monastery. Maximum 12 participants."
          vertical="retreat"
          category="mind-in-silence"
          sourcePath={PATH}
        />

        {/* ── STAGE 5 ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Stage 5</span>
            </div>
            <div className="med-card med-mind-card">
              <span className="med-badge">Days 5–7</span>
              <h2 className="med-h2" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Spaciousness <span>and Presence</span></h2>
              <p className="med-body">
                By day five or six of a <Link href="/7-day-meditation-retreat">seven-day retreat</Link>, most practitioners describe a state that is difficult to convey in language. Not bliss. Not ecstasy. Not extraordinary in the dramatic sense. Rather, an extraordinary ordinariness — a quality of being fully present in the moment without the usual overlay of commentary, evaluation, and desire.
              </p>
              <p className="med-body">
                The phenomenology is consistent across traditions and personalities: time perception shifts (hours feel like minutes, or minutes feel complete in themselves). Sensory awareness becomes granular — the exact quality of light through a window, the complex pattern of a single breath, the felt sense of the body's weight on the earth. The sense of separation between self and environment softens.
              </p>
              <p className="med-body">
                At <Link href="/locations/zanskar">altitude in Zanskar</Link>, reduced oxygen intensifies this stage. The thinking mind, already quieted by five days of practice, is further slowed by the physiological effects of 3,500 metres. Participants in our <Link href="/my-7-day-meditation-retreat-in-zanskar">Zanskar programme</Link> describe a quality of awareness that feels "transparent" — less interference between perception and reality.
              </p>
            </div>
          </div>
        </section>

        {/* ── STAGE 6 ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Stage 6</span>
            </div>
            <div className="med-card med-mind-card">
              <span className="med-badge">The Return</span>
              <h2 className="med-h2" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>What Changes When You <span>Re-Enter Noise</span></h2>
              <p className="med-body">
                The transition from extended silence to ordinary life is itself a psychological event. Most retreatants describe the first encounter with noise — an airport, a train station, a family gathering — as physically overwhelming. Sounds that were unremarkable before the retreat now register as intense. Conversations feel fast and often unnecessary.
              </p>
              <p className="med-body">
                This hypersensitivity typically lasts one to three days. It is not a problem — it is the recalibrated nervous system encountering the environment that de-calibrated it. As the system readjusts, the sensitivity fades. But it does not return to the previous baseline. What remains is an awareness of noise — not just auditory but informational, social, and digital — that was invisible before the retreat.
              </p>
              <p className="med-body">
                The most durable psychological effect of extended silence is not a skill or a state. It is a reference point. Having experienced what your mind does when it is not being driven by external inputs, you now know what undistorted awareness feels like. That knowledge does not disappear.
              </p>
            </div>
          </div>
        </section>

                {/* ── THE SCIENCE ── */}
        <section id="science" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Research</span>
            </div>
            <div className="med-card" style={{ padding: '1.5rem' }}>
              <h3 className="med-h3" style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>What the <span style={{ color: '#0f766e' }}>Research</span> Says</h3>
              <p className="med-body" style={{ marginBottom: '0.75rem' }}>
                The psychological and neurological effects of extended silence and meditation retreat are among the most replicated findings in contemplative science:
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <strong style={{ color: '#2B2A26' }}>Cortisol reduction.</strong>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.92rem', lineHeight: '1.8', color: '#4b5259' }}> A 2018 study in Psychoneuroendocrinology found that a 7-day silent meditation retreat reduced salivary cortisol by 23% on average, with effects persisting at 4-week follow-up.</span>
                </div>
                <div>
                  <strong style={{ color: '#2B2A26' }}>Default mode network quieting.</strong>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.92rem', lineHeight: '1.8', color: '#4b5259' }}> fMRI studies show reduced DMN connectivity after 5+ days of intensive meditation, correlating with reduced rumination and self-referential thinking.</span>
                </div>
                <div>
                  <strong style={{ color: '#2B2A26' }}>Attention enhancement.</strong>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.92rem', lineHeight: '1.8', color: '#4b5259' }}> A Frontiers in Psychology meta-analysis found that retreat-based meditation produced stronger attention improvements than daily practice alone, with effect sizes increasing with retreat duration.</span>
                </div>
                <div>
                  <strong style={{ color: '#2B2A26' }}>Emotional regulation.</strong>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.92rem', lineHeight: '1.8', color: '#4b5259' }}> Research at the University of Wisconsin shows that extended meditation practice strengthens connectivity between the prefrontal cortex and the amygdala — the neural basis of emotional regulation.</span>
                </div>
                <div>
                  <strong style={{ color: '#2B2A26' }}>Telomere effects.</strong>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.92rem', lineHeight: '1.8', color: '#4b5259' }}> A 2013 study in Psychoneuroendocrinology found increased telomerase activity after a 3-month meditation retreat, suggesting potential effects on cellular ageing markers.</span>
                </div>
              </div>

              <p className="med-body" style={{ marginTop: '0.75rem' }}>
                These findings converge on a single conclusion: extended silence in a structured environment produces changes that brief daily practice cannot. The retreat format is not a luxury version of meditation. It is a different category of intervention — one that leverages duration and environmental control to access deeper levels of neural and psychological change.
              </p>
            </div>
          </div>
        </section>

        <FeaturedRetreat
          title="7-Day Silent Meditation Retreat in the Himalayas"
          description="Experience the full arc of silence — from restlessness through settling to spaciousness. Forest or monastery. Maximum 12 participants."
          links={[
            { label: 'View retreat details', href: '/7-day-meditation-retreat' },
            { label: 'Browse all dates', href: '/retreat-calendar' },
            { label: 'Take the retreat quiz', href: '/find-your-retreat' },
          ]}
        />

        <PrimaryCTA
          label="Plan My Silent Retreat"
          subtext="Tell us about your experience level and what you're seeking — we'll recommend the right duration and setting."
          vertical="retreat"
          category="mind-in-silence"
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

        <RelatedReads
          links={[
            { label: 'Why People Go to Meditation Retreats', href: '/why-people-go-to-meditation-retreats' },
            { label: 'Is a Meditation Retreat Worth It?', href: '/is-a-meditation-retreat-worth-it' },
            { label: 'Best Meditation Retreats in India', href: '/best-meditation-retreats-in-india' },
            { label: 'What I Learned from a Silent Retreat', href: '/what-i-learned-from-a-silent-retreat' },
          ]}
        />

        {/* ── FOOTER ── */}
        <div className="med-mind-footer">
          <Link href="/silent-retreats">← Silent Retreats</Link>
          <Link href="/why-people-go-to-meditation-retreats">Why People Go to Retreats</Link>
          <Link href="/what-happens-at-a-silent-retreat">What Happens at a Silent Retreat</Link>
        </div>

      </article>
    </TrackedPage>
  );
}