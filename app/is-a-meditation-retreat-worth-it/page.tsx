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

const PATH = '/is-a-meditation-retreat-worth-it';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Is a Meditation Retreat Worth It? | Retreats And Treks',
    description:
      'Is a meditation retreat worth it? Learn who benefits, who may not, what to expect, costs, timing, and how to decide if now is right.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Is a Meditation Retreat Worth It? An Honest Assessment',
      description: 'Who should (and shouldn\'t) attend a meditation retreat. An honest guide.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Is a Meditation Retreat Worth It? An Honest Assessment'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How much does a meditation retreat cost?',
    answer:
      'Costs vary enormously — from free Vipassana courses to luxury retreats at $5,000+. Himalayan retreats typically range from ₹15,000 to ₹60,000 depending on duration, location, and level of accommodation. The question is not whether you can afford the retreat. It is whether you can afford not to address whatever brought you to this page.',
  },
  {
    question: 'What if I try a retreat and hate it?',
    answer:
      'Most people dislike the first day. The restlessness, boredom, and discomfort of day one are universal. If you leave on day one, you will conclude retreats are not for you. If you stay through day two, the experience typically transforms. For first-timers, a 3-day retreat in a gentle environment like Chakrata minimises this risk — it is short enough to be manageable and supported enough that discomfort is held.',
  },
  {
    question: 'Can I just use a meditation app instead?',
    answer:
      'Apps are tools for daily practice. A retreat is a fundamentally different experience — sustained depth, environmental immersion, and the removal of all distracting input. You can maintain and build on retreat experiences with an app afterward, but an app cannot replicate what 3–10 days of full immersion provides. They are complementary, not substitutes.',
  },
  {
    question: 'Is a retreat worth it if I have never meditated?',
    answer:
      'Often, yes. Many first-time meditators report that a retreat was the thing that made meditation "click" — because the environment and sustained practice create depth that 10-minute daily sessions cannot. If you are curious but have not been able to sustain a daily practice, a short retreat (3 days) may be exactly what you need. The retreat teaches you what meditation actually is, not just what it looks like.',
  },
  {
    question: 'How do I know if I am ready for a meditation retreat?',
    answer:
      'If you are asking this question, you are likely ready. Readiness is not about meditation experience — it is about willingness: willingness to be uncomfortable, to follow a schedule, and to spend time with your own mind without distraction. The only genuine contraindications are active psychotic disorders, recent severe trauma requiring stabilisation, or substance dependence requiring medical supervision. For everyone else, the question is not readiness — it is timing.',
  },
];

export default function IsAMeditationRetreatWorthItPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'Is a Meditation Retreat Worth It?', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is a Meditation Retreat Worth It? An Honest Assessment',
    description:
      'An honest look at who benefits from meditation retreats, who does not, what retreats actually provide, and whether the investment is worth it.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2025-12-15',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Is a Meditation Retreat Worth It? An Honest Assessment".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Is a Meditation Retreat Worth It? An Honest Assessment"
        description="Who should (and shouldn't) attend a meditation retreat. An honest guide."
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

        .med-worth-card { padding: 1.5rem; }
        .med-worth-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-worth-card .med-body { font-size: 0.92rem; margin-bottom: 0.3rem; }

        .med-worth-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 0.8rem; }
        .med-worth-list-item { display: grid; grid-template-columns: 1.9rem 1fr; gap: 0.9rem; }
        .med-worth-list-dot { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid rgba(15,118,110,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .med-worth-list-dot-inner { width: 7px; height: 7px; border-radius: 50%; background: #0f766e; }
        .med-worth-list-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.7; color: #4b5259; font-weight: 400; }
        .med-worth-list-text strong { color: #2B2A26; font-weight: 600; }

        .med-worth-doubt { margin-bottom: 1.5rem; }
        .med-worth-doubt:last-child { margin-bottom: 0; }
        .med-worth-doubt .med-h3 { font-size: 1.05rem; margin-bottom: 0.2rem; }
        .med-worth-doubt .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-worth-section-title { font-size: 1.05rem; font-weight: 600; color: #2B2A26; margin: 1.5rem 0 0.3rem; }
        .med-worth-section-title:first-of-type { margin-top: 0; }
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
              { name: 'Is a Meditation Retreat Worth It?' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Honest Assessment</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              This is the question underneath all the other questions. Before "where" and "how long" and "which type," the real question is: will this actually matter? Will it change something? Or will it just be an expensive weekend where I sit with my eyes closed?
            </p>
            <p className="med-body" style={{ marginTop: '-0.5rem' }}>
              The honest answer: it depends on where you are and what you are willing to bring to it. This page gives you the complete picture — the doubts, the reality, the costs, and the evidence — so you can make a clear decision.
            </p>
            <div className="med-hero-tags">
              <span>Cost vs Benefit</span>
              <span>Who Should Go</span>
              <span>Who Should Not</span>
              <span>Evidence-Based</span>
            </div>
            <div className="med-hero-actions">
              <Link href="#doubts" className="med-cta-btn">Explore the Doubts</Link>
              <a href="#who-should-go" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Who Should Go</a>
            </div>
          </div>
        </section>

                {/* ── SECTION 1: DOUBTS ── */}
        <section id="doubts" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Doubts</span>
            </div>
            <h2 className="med-h2">The Doubts You Probably <span>Have Right Now</span></h2>
            <p className="med-body">
              If you are reading this page, you are not looking for spiritual platitudes. You are looking for honest information because you are weighing a real decision. Here are the doubts we hear most often — and what we know about each one.
            </p>

            <div className="med-doubts-grid" style={{ marginTop: '2rem' }}>
              {[
                {
                  doubt: '"I\'m not sure I can sit still for that long."',
                  answer: 'Almost nobody can, at first. The restlessness on day one is universal. Even experienced meditators find the first 12 hours of a retreat uncomfortable. The difference between a retreat and sitting at home is that the retreat holds you through it — the schedule continues, the bell rings, and you sit again. The sitting itself teaches you how to sit. By day two, most people find the body has settled in ways they did not expect.',
                  link: { label: 'What happens to your mind in silence →', href: '/what-happens-to-your-mind-in-silence' }
                },
                {
                  doubt: '"I can just meditate at home."',
                  answer: 'You can. And you should. But home practice and retreat practice are different categories of experience — not different amounts of the same thing. At home, you meditate for 10–30 minutes inside an environment designed for activity: your phone is nearby, your to-do list is in the next room, your identity as a busy person is intact. A retreat removes all of that. You do not just meditate more. You meditate inside a different psychic environment — one where the usual escapes are not available and depth becomes the only direction.'
                },
                {
                  doubt: '"What if nothing happens?"',
                  answer: 'Something always happens. It may not be what you expected — and that is often the point. The mind has a habit of defining "result" in terms of dramatic experience: visions, breakthroughs, emotional catharsis. The actual results of a retreat are usually subtler and more durable: you sleep better. Your reactions slow down. You notice things about your own patterns that were invisible before. You return to daily life with a different relationship to stress. These are not spectacular. They are also not nothing.'
                },
                {
                  doubt: '"I can\'t afford to take time off work."',
                  answer: 'Consider what the time is costing you now. If you are running on chronic stress, fragmented attention, and poor sleep, you are already losing productive hours every day to a diminished nervous system. A 3-day retreat is a smaller time investment than most people lose in a single month to stress-related inefficiency. The question is not whether you can afford 3 days. It is whether you can afford 3 more months of the current mode.'
                },
                {
                  doubt: '"I\'m not spiritual or religious."',
                  answer: 'Neither are most of our participants. A meditation retreat is not a religious event. It is a structured period of attentional training in a low-stimulus environment. The practices are evidence-based: focused attention, open monitoring, body scanning. The framework is psychological and neuroscientific, not theological. You do not need to believe in anything to benefit from reducing cortisol, strengthening prefrontal function, and regulating your nervous system.'
                },
              ].map((item, index) => (
                <div key={index} className="med-card med-doubt-card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#0f766e',
                      background: 'rgba(15,118,110,0.08)',
                      padding: '0.25rem 0.7rem',
                      borderRadius: '999px',
                      marginBottom: '0.8rem',
                      alignSelf: 'flex-start'
                    }}>
                      Doubt {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="med-h3" style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>{item.doubt}</h3>
                    <p className="med-body" style={{ fontSize: '0.92rem', marginBottom: '0.5rem' }}>{item.answer}</p>
                    {item.link && (
                      <Link href={item.link.href} style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.3rem' }}>
                        {item.link.label}
                        <span style={{ transition: 'transform 0.2s ease' }}>→</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <PrimaryCTA
          label="Talk to Us Honestly"
          subtext="Not sure if a retreat is right for you? Describe where you are — we'll give you an honest answer."
          vertical="retreat"
          category="worth-it-meditation"
          sourcePath={PATH}
        />

        {/* ── SECTION 2: WHAT RETREATS PROVIDE ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">What Retreats Provide</span>
            </div>
            <h2 className="med-h2">What a Meditation Retreat <span>Actually Provides</span></h2>
            <p className="med-body">
              Retreats are not about learning meditation techniques — you can learn those from a book or an app. What a retreat provides is something no other format can: the conditions under which meditation actually works at depth.
            </p>

            <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
              <div className="med-card med-worth-card">
                <h3 className="med-h3">Sustained Immersion</h3>
                <p className="med-body">Depth requires duration. A 20-minute daily sit barely gets past the initial settling phase. A full day of practice reaches layers of the mind that short sessions cannot access. By day three of a retreat, the nervous system enters a state that most people have not experienced since childhood — calm without sleepiness, alert without agitation.</p>
              </div>

              <div className="med-card med-worth-card">
                <h3 className="med-h3">Environmental Removal</h3>
                <p className="med-body">Every notification, every conversation, every minor decision drains a small amount of attentional energy. A retreat removes them all. The meals are planned. The schedule is set. There is nothing to decide, nothing to respond to, nothing to perform. This removal is what allows deep processing.</p>
              </div>

              <div className="med-card med-worth-card">
                <h3 className="med-h3">Facilitated Containment</h3>
                <p className="med-body">The structure of a retreat — the bells, the sessions, the schedule — acts as a container that holds you through difficulty. Without it, most people quit when the discomfort arises. With it, the resistance becomes workable. Our <Link href="/facilitators" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>facilitators</Link> are trained to provide exactly enough support without interfering with the process.</p>
              </div>

              <div className="med-card med-worth-card">
                <h3 className="med-h3">Physical Environment</h3>
                <p className="med-body">Where you meditate matters. The neurological effects of old-growth forest, mountain altitude, clean air, and natural acoustic environments are measurable. Cortisol drops faster. Sleep deepens sooner. A retreat in the <Link href="/locations/chakrata" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Chakrata deodar forest</Link> or <Link href="/locations/zanskar" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Zanskar highlands</Link> provides environmental benefits no urban studio can replicate.</p>
              </div>
            </div>

            <div className="med-card" style={{ padding: '1.5rem', marginTop: '1.5rem', background: '#f7f9f7', borderColor: 'rgba(15,118,110,0.06)' }}>
              <p className="med-body" style={{ fontSize: '0.92rem', margin: 0 }}>
                <strong>A reference point.</strong> Perhaps the most lasting thing a retreat provides is not a skill or a state but a memory: the memory of what your mind is like when it is not being constantly driven by input. That memory becomes a quiet standard that you carry into daily life.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: WHO SHOULD GO ── */}
        <section id="who-should-go" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Who Should Go</span>
            </div>
            <h2 className="med-h2">Who <span>Should Go</span></h2>
            <p className="med-body">
              A meditation retreat is worth it for a wider range of people than most imagine. You do not need to be a meditator. You do not need to be "spiritual." You need to be willing to sit with yourself.
            </p>

            <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
              <div className="med-card med-worth-card">
                <h3 className="med-h3">Chronic Stress</h3>
                <p className="med-body">Not acute crisis — chronic, low-grade, always-on stress that holidays do not resolve. If you return from vacations still tired, still wired, still reactive — the problem is not rest. It is nervous system dysregulation. A retreat addresses the system, not the symptoms.</p>
              </div>

              <div className="med-card med-worth-card">
                <h3 className="med-h3">Approaching Burnout</h3>
                <p className="med-body">Burnout is not tiredness. It is a nervous system that has been running in sympathetic activation for so long that it has forgotten how to downregulate. A retreat provides the extended, structured downtime that the system needs to reset. A 7-day retreat produces more measurable recovery than a 2-week holiday.</p>
              </div>

              <div className="med-card med-worth-card">
                <h3 className="med-h3">Life Transitions</h3>
                <p className="med-body">Divorce, career change, bereavement, retirement, becoming a parent. Transitions require processing space that daily life does not provide. In the noise of work, family, and obligation, the real questions get buried. A retreat creates the quiet in which these questions can be heard.</p>
              </div>

              <div className="med-card med-worth-card">
                <h3 className="med-h3">Experienced Meditators</h3>
                <p className="med-body">If your daily practice feels flat, mechanical, or routine, the problem is almost certainly insufficient depth. A retreat breaks through practice plateaus because it provides the duration that daily sits cannot. Many long-term meditators describe their first multi-day retreat as "the moment practice became real."</p>
              </div>

              <div className="med-card med-worth-card">
                <h3 className="med-h3">Curious Beginners</h3>
                <p className="med-body">Counterintuitively, a retreat is often the best way to start meditating — not because it is gentle (it is not) but because it shows you what meditation actually is before your habits have a chance to dilute it. A <Link href="/3-day-meditation-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>3-day retreat</Link> gives beginners enough structure and support to have a genuine experience without being overwhelmed.</p>
              </div>

              <div className="med-card med-worth-card">
                <h3 className="med-h3">Digital Professionals</h3>
                <p className="med-body">If your screen time exceeds 6 hours daily, your attention has been systematically fragmented. A retreat is the most efficient way to restore attentional capacity — more effective than a "digital detox holiday" because it combines environment removal with structured attention training.</p>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Find Your Retreat"
          subtext="Tell us what you're seeking — we'll recommend the right programme, duration, and location."
          vertical="retreat"
          category="worth-it-meditation"
          sourcePath={PATH}
        />

        {/* ── SECTION 4: WHO SHOULD NOT GO ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Who Should Not Go</span>
            </div>
            <h2 className="med-h2">Who Should <span>Not Go</span> (Honestly)</h2>
            <p className="med-body">
              We turn away more people than most retreat centres. Not because we are exclusive, but because we believe in honesty about when a retreat is not the right intervention.
            </p>

            <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
              <div className="med-card med-worth-card">
                <h3 className="med-h3">Acute Psychological Crisis</h3>
                <p className="med-body">Active suicidal ideation, psychotic episodes, severe untreated depression, or recent traumatic events requiring stabilisation are contraindications for extended silent retreat. The reduction of external stimulation can intensify internal experience. Please seek professional support first.</p>
              </div>

              <div className="med-card med-worth-card">
                <h3 className="med-h3">Wanting a Scenic Holiday</h3>
                <p className="med-body">A retreat is not a spa. It is structured, disciplined, and frequently uncomfortable — especially in the first two days. If what you actually want is beautiful scenery, good food, and relaxation, book a <Link href="/retreat-vs-vacation" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>holiday</Link>. Both are valid choices. They are not the same choice.</p>
              </div>

              <div className="med-card med-worth-card">
                <h3 className="med-h3">Attending for Someone Else</h3>
                <p className="med-body">A partner, a therapist, a friend, or a social media trend told you to go. If the motivation is not your own, the retreat will feel like endurance rather than exploration. Wait until you want to go.</p>
              </div>

              <div className="med-card med-worth-card">
                <h3 className="med-h3">Fixed Expectations</h3>
                <p className="med-body">"I will achieve inner peace." "I will solve this specific problem." "I will feel bliss." Retreats with predetermined outcomes tend to produce frustration rather than insight. The most beneficial attitude is open curiosity: I will show up, follow the schedule, and notice what happens.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: COST VS BENEFIT ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Cost vs Benefit</span>
            </div>
            <h2 className="med-h2">The Real <span>Cost vs. Benefit</span></h2>

            <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
              <div className="med-card med-worth-card">
                <h3 className="med-h3">Financial Cost</h3>
                <p className="med-body">A 3-day Himalayan retreat typically costs ₹15,000–₹30,000 (US$175–$350), including accommodation, meals, and facilitation. A 7-day programme ranges from ₹30,000–₹60,000. Compare this to a week-long beach holiday often exceeding ₹1,00,000. The retreat costs less and provides something the holiday cannot: lasting change.</p>
              </div>

              <div className="med-card med-worth-card">
                <h3 className="med-h3">Time Cost</h3>
                <p className="med-body">Three days. That is the minimum meaningful investment. You use more time than that scrolling social media in a typical month. A <Link href="/3-day-meditation-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>3-day retreat</Link> fits into a long weekend. A <Link href="/7-day-meditation-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>7-day programme</Link> uses one week of annual leave.</p>
              </div>

              <div className="med-card med-worth-card">
                <h3 className="med-h3">Measurable Return</h3>
                <p className="med-body">Research shows a 7-day silent retreat reduced salivary cortisol by 23% on average, with effects persisting at 4-week follow-up. In practical terms: better sleep, reduced emotional reactivity, improved focus, greater resilience to daily stressors. Read the full evidence on <Link href="/benefits-of-meditation-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>meditation retreat benefits</Link>.</p>
              </div>

              <div className="med-card med-worth-card">
                <h3 className="med-h3">Cost of Not Going</h3>
                <p className="med-body">This is the calculation most people miss. If you are reading this, something in your current mode of living is not working. The stress, the fragmented attention, the sense of disconnection — these do not resolve themselves. They compound. A retreat is not a luxury. For many, it is the most efficient available intervention.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: HOW TO MINIMISE RISK ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Minimise Risk</span>
            </div>
            <h2 className="med-h2">How to Minimise Risk and <span>Maximise Value</span></h2>
            <p className="med-body">
              If you have decided that a retreat might be worth trying, here is how to make the decision low-risk and high-return:
            </p>

            <ul className="med-list" style={{ marginTop: '1.5rem' }}>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Start with 3 days.</strong> A <Link href="/3-day-meditation-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>3-day retreat</Link> is enough to move through the resistance stage and into genuine settling. It is the minimum effective dose.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Choose a supported environment.</strong> <Link href="/locations/chakrata" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Chakrata</Link> is our most gentle location — accessible, forested, and designed for first-time retreatants.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Choose the right type.</strong> <Link href="/how-to-choose-a-meditation-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>How to choose a meditation retreat</Link> — not all formats suit all people.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Prepare properly.</strong> Read our <Link href="/how-to-prepare-for-a-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>preparation guide</Link>. Most first-retreat disappointment comes from mismatched expectations.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Talk to us first.</strong> We will tell you honestly whether we think a retreat is the right step for you right now. We have turned people away when the timing was wrong. We will do the same for you if it is.</span>
              </li>
            </ul>
          </div>
        </section>

        <PrimaryCTA
          label="Explore Retreats"
          subtext="See our programmes by duration, type, and location — or tell us what you're seeking and we'll recommend."
          vertical="retreat"
          category="worth-it-meditation"
          sourcePath={PATH}
        />

        <FeaturedRetreat
          title="3-Day Meditation Retreat — Your Low-Risk Entry"
          description="Three days in the Chakrata deodar forest. Guided sessions, small group, gentle schedule. Enough to know if retreat practice is for you."
          links={[
            { label: 'View programme', href: '/3-day-meditation-retreat' },
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
            <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
            <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
          </div>
        </section>

        <RelatedReads
          links={[
            { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
            { label: 'Why People Go to Meditation Retreats', href: '/why-people-go-to-meditation-retreats' },
            { label: 'Best Meditation Retreats in India', href: '/best-meditation-retreats-in-india' },
            { label: 'A Week Without My Phone — Digital Detox', href: '/a-week-without-my-phone-digital-detox' },
          ]}
        />

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/meditation-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Meditation Retreats</span>
              </Link>
              <Link href="/benefits-of-meditation-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Benefits of Retreat</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/what-to-expect-at-a-meditation-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>What to Expect</span>
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