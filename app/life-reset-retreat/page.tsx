import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema, generateBlogPostingSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import RelatedReads from '@/components/RelatedReads';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const PATH = '/life-reset-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Life Reset Retreat | Retreats And Treks',
    description:
      'Life reset retreat in the Himalayas for genuine recalibration through stillness, silence, nature immersion, and deep rest in Chakrata or Zanskar.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Life Reset Retreat in the Himalayas',
      description: 'Not optimisation. Not adjustment. A genuine restart from stillness.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Life Reset Retreat in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What does "life reset" mean in a retreat context?',
    answer:
      'A life reset is not about making a dramatic decision during the retreat. It is about creating enough distance from your existing patterns that you can see them clearly — and from that clarity, choose which ones to keep and which to release.',
  },
  {
    question: 'Is a life reset retreat different from a regular meditation retreat?',
    answer:
      'The techniques overlap — meditation, silence, journalling, nature immersion. The difference is intention. A meditation retreat focuses on deepening practice. A life reset retreat focuses on creating the conditions for a fundamental reorientation.',
  },
  {
    question: 'How long do the effects of a life reset retreat last?',
    answer:
      'The clarity achieved on retreat begins to fade within weeks if not maintained. But the decisions made from that clarity persist. The retreat does not change your life. It gives you the perspective to change it yourself.',
  },
  {
    question: 'Should I make major life decisions during the retreat?',
    answer:
      'We recommend against making final decisions during the retreat itself. Use the retreat to see clearly. Write down what you see. Then give yourself 2–4 weeks back in daily life before committing to major changes.',
  },
];

const LOCATIONS = [
  {
    name: 'Zanskar',
    id: 'meditation-retreat-zanskar',
    tagline: 'Radical Separation',
    description: 'Radical separation for deep recalibration. 3,500m monastery silence.',
    image: '/Images/location/zanskar.webp',
  },
  {
    name: 'Chakrata',
    id: 'meditation-retreat-chakrata',
    tagline: 'Gentle Decompression',
    description: 'Gentle forest environment for an accessible physiological reset.',
    image: '/Images/location/chakrata.webp',
  },
];

export default function LifeResetRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Life Reset Retreat', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = generateBlogPostingSchema({
    title: 'Life Reset Retreat — Start Again from Silence',
    description:
      'Life reset retreat in the Himalayas for genuine recalibration through stillness, silence, nature immersion, and deep rest in Chakrata or Zanskar.',
    publishedAt: '2026-03-06',
    lastUpdated: '2026-05-09',
    url: canonicalUrl,
  });

  // Split heading for green last word
  const h1Words = "Life Reset Retreat".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Life Reset Retreat — Start Again from Silence"
        description="Life reset retreat in the Himalayas for genuine recalibration through stillness, silence, nature immersion, and deep rest in Chakrata or Zanskar."
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
        .med-section-dark { background: #111827; color: #fff; }

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

        /* ── Life Reset specific styles ── */
        .med-reset-card { padding: 1.5rem; }
        .med-reset-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-reset-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-reset-timeline {
          position: relative;
          padding-left: 2rem;
          margin: 2rem 0;
        }
        .med-reset-timeline::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 8px;
          width: 2px;
          background: rgba(15,118,110,0.2);
        }
        .med-reset-timeline-item {
          position: relative;
          margin-bottom: 2rem;
        }
        .med-reset-timeline-item:last-child { margin-bottom: 0; }
        .med-reset-timeline-item::before {
          content: '';
          position: absolute;
          top: 8px;
          left: -2rem;
          width: 14px;
          height: 14px;
          background: #fff;
          border: 2px solid #0f766e;
          border-radius: 50%;
          transform: translateX(-7px);
        }
        .med-reset-timeline-item .med-h3 { font-size: 1.05rem; margin-bottom: 0.2rem; }
        .med-reset-timeline-item .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-reset-loc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; }
        @media (max-width: 720px) { .med-reset-loc-grid { grid-template-columns: 1fr; } }

        .med-reset-loc-card {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          min-height: 320px;
          display: flex;
          align-items: flex-end;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.1);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
        }
        .med-reset-loc-card:hover { transform: translateY(-6px); box-shadow: 0 22px 48px rgba(0,0,0,0.3); }
        .med-reset-loc-card .med-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .med-reset-loc-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
          z-index: 1;
        }
        .med-reset-loc-content {
          position: relative;
          z-index: 2;
          padding: 1.5rem;
          width: 100%;
          color: #fff;
        }
        .med-reset-loc-content .med-tag {
          display: inline-block;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #5eead4;
          background: rgba(15,118,110,0.3);
          padding: 0.2rem 0.7rem;
          border-radius: 999px;
          margin-bottom: 0.5rem;
        }
        .med-reset-loc-content .med-h3 { color: #fff; font-size: 1.2rem; margin-bottom: 0.3rem; }
        .med-reset-loc-content .med-body { color: rgba(255,255,255,0.8); font-size: 0.88rem; margin-bottom: 0; }

        .med-reset-duration-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; }
        @media (max-width: 720px) { .med-reset-duration-grid { grid-template-columns: 1fr; } }

        .med-reset-cta-wrap {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 18px;
          padding: 2.5rem;
          text-align: center;
        }
        .med-reset-cta-wrap .med-h3 { color: #166534; }
        .med-reset-cta-wrap .med-body { color: #15803d; }

        .med-section-dark .med-eyebrow-text { color: rgba(255,255,255,0.6); }
        .med-section-dark .med-eyebrow-line { background: rgba(255,255,255,0.3); }
        .med-section-dark .med-h2 { color: #fff; }
        .med-section-dark .med-h2 span { color: #5eead4; }
        .med-section-dark .med-body { color: rgba(255,255,255,0.7); }
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
              { name: 'Life Reset Retreat' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Re-evaluate Everything</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              You have reached a point where optimisation is not enough. You need distance. Genuine, sensory distance from everything familiar to see your life clearly enough to choose which parts to keep.
            </p>
            <div className="med-hero-tags">
              <span>Radical Separation</span>
              <span>Deep Recalibration</span>
              <span>7–10 Days</span>
              <span>Himalayan Silence</span>
            </div>
            <div className="med-hero-actions">
              <Link href="#design" className="med-cta-btn">Design Your Reset</Link>
              <a href="#who-its-for" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Who This Is For</a>
            </div>
          </div>
        </section>

        {/* ── THE PROBLEM (Intro) ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner" style={{ textAlign: 'center' }}>
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Intervention</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2">Distance is <span>Clarity</span></h2>
            <p className="med-body" style={{ fontSize: '1.05rem' }}>
              The system is running as designed — career, relationships, routines — but the design no longer fits. Something fundamental needs to shift, and you <strong>cannot see what it is from inside the pattern</strong>.
            </p>
            <p className="med-body" style={{ fontSize: '1.05rem' }}>
              A life reset retreat creates distance. Not to escape your life, but to perceive it accurately. The Himalayas enforce this organically: there are no signals, routines, or familiar triggers to latch onto.
            </p>
          </div>
        </section>

        {/* ── WHO THIS IS FOR ── */}
        <section id="who-its-for" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Is This For You</span>
            </div>
            <h2 className="med-h2">Who seeks a <span>Life Reset</span></h2>

            <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
              {[
                'Professionals in their 30s–50s who have succeeded at something that no longer matters',
                'People in the aftermath of major change — divorce, loss, career disruption',
                'Founders and leaders whose identity has fused entirely with their role',
                'Anyone who wakes at 3 AM with the sense that something needs to change but cannot name what',
                'People who have tried coaching, therapy, and holidays without finding the reset they need'
              ].map((item, idx) => (
                <div key={idx} className="med-card med-reset-card">
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#0f766e', fontSize: '1.1rem', flexShrink: 0, marginTop: '2px' }}>✦</span>
                    <p className="med-body" style={{ fontSize: '0.92rem', margin: 0 }}>{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Design Your Reset"
          subtext="Tell us where you are and what you need — we'll recommend the right duration and location."
          vertical="retreat"
          category="life-reset"
          sourcePath={PATH}
        />

        {/* ── THE STRUCTURE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Process</span>
            </div>
            <h2 className="med-h2">The stages of a <span>Reset</span></h2>
            <p className="med-body">
              A reset cannot be forced. It must be allowed. The structure of a Himalayan Life Reset Retreat respects the physiological timeline of down-regulation.
            </p>

            <div className="med-reset-timeline">
              {[
                { title: 'Days 1–2: Withdrawal', desc: 'The familiar inputs stop. Phone, email, social media, news, conversation, tasks — all of it. The mind protests. Restlessness, anxiety, boredom. This is normal. It is the system de-patterning.' },
                { title: 'Days 3–5: Settling', desc: 'The mind quiets. The noise that was hiding beneath the busyness becomes audible — unprocessed emotions, suppressed questions, values that got lost in the rush. This phase can be uncomfortable but is where the real work begins.' },
                { title: 'Days 5–7+: Clarity', desc: 'From the settled place, seeing becomes possible. You can observe your life patterns without being inside them. Insights arrive without force. The reset is not a decision — it is a shift in perspective from which better decisions become obvious.' }
              ].map((step, idx) => (
                <div key={idx} className="med-reset-timeline-item">
                  <h3 className="med-h3">{step.title}</h3>
                  <p className="med-body">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOCATIONS ── */}
        <section className="med-shell med-section-dark med-section-padding" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Himalayan Settings</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>Environments for <span>Recalibration</span></h2>
            <p className="med-body" style={{ textAlign: 'center', maxWidth: '36rem', margin: '0 auto 2rem' }}>
              Radical separation from the familiar requires an environment strong enough to hold what surfaces.
            </p>

            <div className="med-reset-loc-grid">
              {LOCATIONS.map((loc) => (
                <Link key={loc.id} href={`/${loc.id}`} className="med-reset-loc-card">
                  <img src={loc.image} alt={loc.name} className="med-img" />
                  <div className="med-reset-loc-content">
                    <span className="med-tag">{loc.tagline}</span>
                    <h3 className="med-h3">{loc.name}</h3>
                    <p className="med-body">{loc.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── DURATIONS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Commitment</span>
                <span className="med-eyebrow-line" />
              </div>
              <h2 className="med-h2">Durations & <span>Commitment</span></h2>
              <p className="med-body" style={{ maxWidth: '38rem', margin: '0 auto' }}>
                We strongly recommend longer formats for a Life Reset.
              </p>
            </div>

            <div className="med-reset-duration-grid">
              <Link href="/7-day-meditation-retreat" className="med-card med-reset-card" style={{ textDecoration: 'none' }}>
                <h3 className="med-h3">7-Day Retreat</h3>
                <p className="med-body">The absolute minimum requested time for a genuine physiological and mental reset.</p>
              </Link>
              <Link href="/10-day-silent-retreat" className="med-card med-reset-card" style={{ textDecoration: 'none' }}>
                <h3 className="med-h3">10-Day Silent Retreat</h3>
                <p className="med-body">A deeper recalibration for those seeking radical transformation and extended silence.</p>
              </Link>
            </div>

            <div className="med-reset-cta-wrap" style={{ marginTop: '2rem' }}>
              <h3 className="med-h3" style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Ready to step out of the pattern?</h3>
              <p className="med-body" style={{ marginBottom: '1.25rem' }}>
                Contact us. Describe your current state and let us recommend the safest and most effective container for your life reset.
              </p>
              <PrimaryCTA
                label="Talk to Us"
                subtext="No obligations, just an honest conversation."
                vertical="retreat"
                category="life-reset"
                sourcePath={PATH}
              />
            </div>
          </div>
        </section>

        <RelatedReads
          links={[
            { label: 'Personal Growth Retreat', href: '/personal-growth-retreat' },
            { label: 'Self-Discovery Retreat', href: '/self-discovery-retreat' },
            { label: 'Burnout Recovery Retreats', href: '/burnout-recovery-retreats' },
          ]}
        />

        {/* ── FAQ ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Common Questions</span>
            </div>
            <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
            <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
          </div>
        </section>

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/personal-growth-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Personal Growth</span>
              </Link>
              <Link href="/self-discovery-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Self-Discovery</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/burnout-recovery-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Burnout Recovery</span>
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
