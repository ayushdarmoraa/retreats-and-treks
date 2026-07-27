import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema, generateBlogPostingSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/benefits-of-meditation-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Benefits of a Meditation Retreat | Retreats And Treks',
    description:
      'Benefits of a meditation retreat: nervous system reset, restored attention, emotional processing, silence, and what changes in 3, 7, and 10 days.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Benefits of a Meditation Retreat — What Actually Changes',
      description: 'Nervous system reset, restored attention, emotional processing. What a meditation retreat does that daily practice cannot.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Benefits of a Meditation Retreat — What Actually Changes'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Are the benefits of a meditation retreat permanent?',
    answer:
      'The acute effects — reduced cortisol, restored attention, emotional clarity — begin to fade within weeks if not maintained. But the deeper shifts — in perspective, in your relationship with your own mind, in your understanding of silence — tend to persist. Many retreatants report that even months later, they can access a quality of stillness they discovered on retreat. Regular follow-up practice (even 10 minutes daily) maintains the benefits.',
  },
  {
    question: 'Can I get the same benefits from meditating at home?',
    answer:
      'Daily meditation provides incremental benefits. A retreat provides a quantum shift. The difference is environmental: at home, you meditate for 20 minutes then return to stimulation. On retreat, meditation is sustained over days in an environment that supports it. The depth achieved in 7 days of retreat meditation typically takes months or years of daily practice to reach. Both have value — they are complementary, not interchangeable.',
  },
  {
    question: 'How soon do the benefits start during a retreat?',
    answer:
      'Physiological changes (reduced cortisol, lower blood pressure) begin within 24–48 hours. Attentional benefits (improved focus, reduced reactivity) typically emerge by day 2–3. Deeper psychological benefits (emotional processing, perspective shifts, insight) usually arrive from day 4 onwards. This is why we recommend at least 3 days for a meaningful first retreat.',
  },
  {
    question: 'Do you need to be spiritual to benefit from a meditation retreat?',
    answer:
      'No. The physiological and psychological benefits of sustained meditation are well-documented and do not require spiritual belief. Reduced stress hormones, improved attention, better sleep, and emotional regulation occur regardless of worldview. If you are spiritual, the retreat may deepen that dimension. If you are not, the benefits are still substantial.',
  },
];

export default function BenefitsOfMeditationRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'Benefits of a Meditation Retreat', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = generateBlogPostingSchema({
    title: 'Benefits of a Meditation Retreat — What Actually Changes',
    description:
      'Benefits of a meditation retreat: nervous system reset, restored attention, emotional processing, silence, and what changes in 3, 7, and 10 days.',
    publishedAt: '2026-03-06',
    lastUpdated: '2026-05-09',
    url: canonicalUrl,
  });

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Benefits of a Meditation Retreat — What Actually Changes"
        description="Benefits of a meditation retreat: nervous system reset, restored attention, emotional processing, silence, and what changes in 3, 7, and 10 days."
        path={PATH}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
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
        .med-grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 960px) { .med-grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } .med-grid-4 { grid-template-columns: 1fr; } }

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

        .med-card-link { text-decoration: none; display: block; height: 100%; }
        .med-card-link .med-card { height: 100%; display: flex; flex-direction: column; }

        .med-benefit-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-benefit-grid { grid-template-columns: 1fr; } }

        .med-benefit-card { padding: 1.5rem; }
        .med-benefit-card .med-benefit-icon { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 16px; background: #0f766e; color: #fff; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 700; margin-bottom: 1rem; }
        .med-benefit-card .med-benefit-note { padding-top: 1rem; margin-top: 1rem; border-top: 1px solid rgba(15,118,110,0.08); font-family: var(--font-inter), sans-serif; font-size: 0.78rem; color: #6b7280; font-weight: 500; letter-spacing: 0.04em; }

        .med-duration-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-duration-grid { grid-template-columns: 1fr; } }

        .med-duration-card { padding: 1.5rem; display: flex; flex-direction: column; }
        .med-duration-card .med-duration-days { display: inline-flex; align-items: center; justify-content: center; min-width: 64px; height: 40px; padding: 0 0.9rem; border-radius: 10px; background: #0f766e; color: #fff; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem; width: max-content; }
        .med-duration-card .med-duration-best { padding-top: 1rem; margin-top: auto; border-top: 1px solid rgba(15,118,110,0.08); font-family: var(--font-inter), sans-serif; font-size: 0.75rem; color: #6b7280; font-weight: 500; letter-spacing: 0.04em; }
        .med-duration-card .med-duration-link { display: inline-flex; align-items: center; margin-top: 0.75rem; color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.8rem; font-weight: 600; text-decoration: none; }
        .med-duration-card .med-duration-link:hover { text-decoration: underline; }

        .med-stats-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-stats-grid { grid-template-columns: 1fr; } }

        .med-stat-card { padding: 1.5rem; text-align: center; }
        .med-stat-card .med-stat-value { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.3rem, 2vw, 1.6rem); font-weight: 600; color: #0f766e; margin: 0 0 0.3rem; }
        .med-stat-card .med-stat-label { font-family: var(--font-inter), sans-serif; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; font-weight: 600; margin: 0; }

        .med-cta-wrap { background: #f7f9f7; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; padding: 2.5rem; text-align: center; }
        .med-cta-wrap .med-cta-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; margin-top: 1.5rem; }

        .med-related-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-related-grid { grid-template-columns: 1fr; } }

        .med-related-card { padding: 1.5rem; text-decoration: none; display: block; }
        .med-related-card .med-related-kicker { display: block; font-family: var(--font-inter), sans-serif; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #0f766e; margin-bottom: 0.4rem; }
        .med-related-card .med-related-title { display: block; font-family: var(--font-fraunces), Georgia, serif; font-size: 1rem; font-weight: 600; color: #2B2A26; margin-bottom: 0.3rem; }
        .med-related-card .med-related-copy { display: block; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; color: #6b7280; margin-bottom: 0.5rem; }
        .med-related-card .med-related-arrow { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.8rem; font-weight: 600; }

        .med-faq-card { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 2rem; align-items: start; padding: 2rem; border-radius: 18px; border: 1px solid rgba(15,118,110,0.12); background: #fff; box-shadow: 0 10px 30px rgba(15,31,28,0.05); }
        @media (max-width: 720px) { .med-faq-card { grid-template-columns: 1fr; } }
        .med-faq-intro { position: sticky; top: 6rem; }
        @media (max-width: 720px) { .med-faq-intro { position: static; } }
        .med-faq-mini { display: grid; gap: 0.6rem; margin-top: 1rem; }
        .med-faq-mini-item { display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.7rem 0.9rem; border-radius: 12px; background: #f7f9f7; border: 1px solid rgba(15,118,110,0.06); font-family: var(--font-inter), sans-serif; font-size: 0.8rem; line-height: 1.5; color: #4b5259; }
        .med-faq-mini-item span { color: #0f766e; font-weight: 700; flex-shrink: 0; }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-accent-card { border-left: 3px solid #0f766e; }
      `}</style>

      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Meditation Retreats', href: '/meditation-retreats' }, { name: 'Benefits of a Meditation Retreat' }]} />

      <article>
        {/* ── HERO ── */}
        <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '78vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <img className="med-hero-bg" src="/Images/experience-hubs/meditation-hero.webp" alt="Benefits of a meditation retreat" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
          </div>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Meditation Retreat Guide</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
              Benefits of a Meditation Retreat: <span style={{ color: '#5eead4' }}>What Actually Changes</span>
            </h1>
            <p style={{ maxWidth: '40rem', margin: '0 auto 1.5rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
              Meditation retreat marketing often speaks in vague promises — "find inner peace," "transform your life." The reality is more specific and more interesting. A meditation retreat produces identifiable changes in your nervous system, attention, emotional processing, and relationship with silence.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/meditation-retreats" className="med-cta-btn">Explore meditation retreats</Link>
              <a href="#benefits-by-duration" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Compare retreat durations</a>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="med-shell med-section-white" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-stats-grid">
              <div className="med-card med-stat-card">
                <p className="med-stat-value">Nervous system reset</p>
                <p className="med-stat-label">A quieter environment gives the body space to come down from constant stimulation.</p>
              </div>
              <div className="med-card med-stat-card">
                <p className="med-stat-value">Restored attention</p>
                <p className="med-stat-label">Reduced inputs help attention settle and become available again.</p>
              </div>
              <div className="med-card med-stat-card">
                <p className="med-stat-value">Deeper silence</p>
                <p className="med-stat-label">Retreat conditions make silence easier to experience than daily practice alone.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CORE BENEFITS ── */}
        <section className="med-shell med-section-alt" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Core Benefits</span>
            </div>
            <h2 className="med-h2">What actually <span>changes</span> on retreat</h2>
            <p className="med-body" style={{ marginBottom: '2rem' }}>The benefit of a meditation retreat is not only that you meditate more. It is that the entire environment stops pulling your nervous system, attention, and emotions back into old patterns.</p>

            <div className="med-benefit-grid">
              <div className="med-card med-benefit-card">
                <div className="med-benefit-icon">01</div>
                <h3 className="med-h3">Nervous system reset</h3>
                <p className="med-body" style={{ fontSize: '0.92rem' }}>Chronic stress locks the nervous system in sympathetic fight-or-flight mode. Daily meditation helps, but the environment keeps re-triggering the stress response. On retreat, the triggers are removed. In a Himalayan forest environment like <Link href="/locations/chakrata" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>Chakrata</Link>, the nervous system gets space to move toward rest, recovery, and physiological recalibration.</p>
                <div className="med-benefit-note">You feel less activated, less rushed, and more able to rest.</div>
              </div>

              <div className="med-card med-benefit-card">
                <div className="med-benefit-icon">02</div>
                <h3 className="med-h3">Restored attention</h3>
                <p className="med-body" style={{ fontSize: '0.92rem' }}>Your attention is a finite resource that daily life depletes. Screens, notifications, decisions, and social interactions draw from the same well. On retreat, the demands on attention drop. The mind refills, and many people notice sharper focus, clearer thoughts, and a steadier relationship with distraction.</p>
                <div className="med-benefit-note">The mind becomes less scattered and more available.</div>
              </div>

              <div className="med-card med-benefit-card">
                <div className="med-benefit-icon">03</div>
                <h3 className="med-h3">Emotional processing</h3>
                <p className="med-body" style={{ fontSize: '0.92rem' }}>When external stimulation is removed, emotions that have been suppressed can surface. This can feel uncomfortable, but it is often part of the retreat process. With fewer distractions available, grief, anger, sadness, or anxiety can move through the body instead of being pushed back down.</p>
                <div className="med-benefit-note">The goal is not escape. It is space to process.</div>
              </div>

              <div className="med-card med-benefit-card">
                <div className="med-benefit-icon">04</div>
                <h3 className="med-h3">Relationship with silence</h3>
                <p className="med-body" style={{ fontSize: '0.92rem' }}>Most people have never experienced genuine silence. Not quiet — silence. A meditation retreat introduces you to this quality of stillness, and once you know it exists, you carry that reference point back into daily life. See <Link href="/what-happens-at-a-silent-retreat" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>what happens at a silent retreat</Link>.</p>
                <div className="med-benefit-note">Silence becomes less empty and more supportive.</div>
              </div>
            </div>

            <div className="med-card med-accent-card" style={{ padding: '1.25rem 1.5rem', marginTop: '1.4rem' }}>
              <p className="med-body" style={{ marginBottom: 0 }}>
                <strong>Not sure what kind of reset you need?</strong> Compare retreat durations and choose the format that fits your stress level, schedule, and comfort with silence.
              </p>
            </div>
          </div>
        </section>

        {/* ── BENEFITS BY DURATION ── */}
        <section id="benefits-by-duration" className="med-shell med-section-white" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Benefits by Duration</span>
            </div>
            <h2 className="med-h2">How long should a <span>meditation retreat</span> be?</h2>
            <p className="med-body">Different retreat lengths create different kinds of benefit. A 3-day retreat can interrupt stress and restore attention, while longer retreats create more space for silence, emotional processing, and deeper practice.</p>

            <div className="med-duration-grid" style={{ marginTop: '1.8rem' }}>
              {[
                {
                  days: '3 days',
                  title: 'Initial reset',
                  copy: 'A 3-day meditation retreat is enough for the body to slow down, the mind to settle, and attention to begin recovering from daily stimulation.',
                  best: 'Best for: first retreat, stress relief, quick nervous-system reset',
                  href: '/3-day-meditation-retreat',
                  link: 'Explore 3-day retreat →',
                },
                {
                  days: '7 days',
                  title: 'Deeper recalibration',
                  copy: 'A 7-day retreat gives more time for emotional processing, silence, and genuine insight because the first few days are often spent simply arriving.',
                  best: 'Best for: deeper rest, emotional processing, sustained practice',
                  href: '/7-day-meditation-retreat',
                  link: 'Explore 7-day retreat →',
                },
                {
                  days: '10 days',
                  title: 'Sustained silence',
                  copy: 'A 10-day retreat supports deeper immersion, stronger habit interruption, and a more complete break from digital and social stimulation.',
                  best: 'Best for: silence, transformation, major pattern interruption',
                  href: '/10-day-silent-retreat',
                  link: 'Explore 10-day retreat →',
                },
              ].map((item) => (
                <div key={item.days} className="med-card med-duration-card">
                  <div className="med-duration-days">{item.days}</div>
                  <h3 className="med-h3">{item.title}</h3>
                  <p className="med-body" style={{ fontSize: '0.9rem', flex: 1 }}>{item.copy}</p>
                  <div className="med-duration-best">{item.best}</div>
                  <Link href={item.href} className="med-duration-link">{item.link}</Link>
                </div>
              ))}
            </div>

            <div className="med-card med-accent-card" style={{ padding: '1.25rem 1.5rem', marginTop: '1.4rem' }}>
              <p className="med-body" style={{ marginBottom: 0 }}>
                <strong>Practical guide:</strong> choose 3 days if you want a reset, 7 days if you want depth, and 10 days if you want sustained silence and a stronger break from routine.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="med-shell med-section-alt" style={{ padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-cta-wrap">
              <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Plan Your Retreat</span>
                <span className="med-eyebrow-line" />
              </div>
              <h2 className="med-h2" style={{ textAlign: 'center' }}>Not sure how long your <span>meditation retreat</span> should be?</h2>
              <p className="med-body" style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto' }}>Tell us what you are seeking — stress relief, silence, emotional space, deeper practice, or a complete reset. We can help you choose the right retreat duration and location.</p>
              <div className="med-cta-actions">
                <Link href="/meditation-retreats" className="med-cta-btn" style={{ padding: '0.7rem 1.2rem', fontSize: '0.7rem' }}>Explore meditation retreats</Link>
                <Link href="/contact" className="med-cta-outline" style={{ padding: '0.7rem 1.2rem', fontSize: '0.7rem' }}>Ask for duration guidance</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="med-shell med-section-white" style={{ padding: '4.5rem 0' }}>
          <div className="med-inner">
            <div className="med-faq-card">
              <div className="med-faq-intro">
                <div className="med-eyebrow">
                  <span className="med-eyebrow-line" />
                  <span className="med-eyebrow-text">Common Questions</span>
                </div>
                <h2 className="med-h2">Meditation retreat <span>questions</span></h2>
                <p className="med-body" style={{ fontSize: '0.92rem', color: '#6b7280' }}>Clear answers for people comparing retreat benefits, duration, home practice, and whether a meditation retreat is the right next step.</p>
                <div className="med-faq-mini">
                  <div className="med-faq-mini-item"><span>✓</span> Understand what changes during a retreat</div>
                  <div className="med-faq-mini-item"><span>✓</span> Compare home practice and retreat depth</div>
                  <div className="med-faq-mini-item"><span>✓</span> Choose the right duration with more confidence</div>
                </div>
              </div>

              <div>
                <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED GUIDES ── */}
        <section className="med-shell med-section-alt" style={{ padding: '4.5rem 0' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Related Guides</span>
            </div>
            <h2 className="med-h2">Continue planning your <span>meditation retreat</span></h2>
            <p className="med-body">These guides help you compare retreat styles, understand whether a retreat is worth it, and choose the right meditation retreat for your needs.</p>

            <div className="med-related-grid" style={{ marginTop: '1.8rem' }}>
              {[
                {
                  href: '/meditation-retreats',
                  kicker: 'Main guide',
                  title: 'Meditation Retreats',
                  copy: 'Explore meditation retreat options, formats, and locations.',
                },
                {
                  href: '/is-a-meditation-retreat-worth-it',
                  kicker: 'Decision guide',
                  title: 'Is a Meditation Retreat Worth It?',
                  copy: 'Understand when a retreat is worth the time, money, and emotional effort.',
                },
                {
                  href: '/how-to-choose-a-meditation-retreat',
                  kicker: 'Planning help',
                  title: 'How to Choose a Meditation Retreat',
                  copy: 'Compare duration, silence level, location, facilitation, and comfort.',
                },
              ].map((guide) => (
                <Link key={guide.href} href={guide.href} className="med-card med-related-card">
                  <span className="med-related-kicker">{guide.kicker}</span>
                  <span className="med-related-title">{guide.title}</span>
                  <span className="med-related-copy">{guide.copy}</span>
                  <span className="med-related-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Retreats</span>
              </Link>
              <Link href="/meditation-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Meditation Retreats</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/retreats/himalayan-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Himalayan Retreats</span>
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