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

const PATH = '/why-people-go-to-meditation-retreats';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Why People Go to Meditation Retreats — The Real Reasons',
    description:
      'Why people go to meditation retreats: burnout, life transitions, spiritual seeking, curiosity, psychology, first-person accounts, and research.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Why People Go to Meditation Retreats',
      description:
        'The real reasons behind the decision to leave ordinary life for silence, stillness, and structured introspection.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Why People Go to Meditation Retreats'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the most common reason people attend meditation retreats?',
    answer:
      'Stress and burnout are the most frequently cited reasons. Most first-time retreatants are not lifelong meditators — they are people whose nervous systems have been in overdrive for too long. The retreat is a circuit-breaker: a structured environment where the inputs that maintain stress are removed and the body can begin to recover.',
  },
  {
    question: 'Do you need to be spiritual to go on a meditation retreat?',
    answer:
      'No. While some retreats are rooted in Buddhist, Hindu, or yogic traditions, many participants are secular and attend for psychological or physiological reasons — stress relief, improved focus, better sleep, emotional processing. The practices work regardless of belief system because they operate on the nervous system, not on faith.',
  },
  {
    question: 'Is a meditation retreat worth the time away from work?',
    answer:
      'Research consistently shows that extended retreat practice produces measurable improvements in cognitive function, emotional regulation, and stress physiology that persist for weeks to months. Many participants report being more productive and creative after a retreat than before — the investment in pause yields returns in clarity and capacity.',
  },
  {
    question: 'Can a meditation retreat help with grief or life transitions?',
    answer:
      'Yes. Retreats create a container for processing emotions that daily life does not accommodate. Grief, divorce, career transitions, loss of identity — these require space and silence to metabolise properly. A structured retreat provides that space without the pressure to perform recovery for others.',
  },
  {
    question: 'What age group typically attends meditation retreats?',
    answer:
      'Our retreats draw participants from mid-twenties to late sixties, with the largest cohort between 30 and 50. The motivations shift with age — younger participants often seek clarity and direction, mid-career participants seek relief from chronic stress, and older participants often seek depth of practice or meaning.',
  },
];

export default function WhyPeopleGoPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'Why People Go to Meditation Retreats', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why People Go to Meditation Retreats — The Real Reasons',
    description:
      'The actual reasons people attend meditation retreats, grounded in psychology and first-person accounts.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-01-15',
    dateModified: '2026-03-01',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "Why People Go to Meditation Retreats: The Real Reasons Behind the Decision".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Why People Go to Meditation Retreats — The Real Reasons"
        description="The real reasons behind the decision to leave ordinary life for silence, stillness, and structured introspection."
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
        .med-why-card { padding: 1.5rem; }
        .med-why-card .med-badge {
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
        .med-why-card .med-h2 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .med-why-card .med-body { font-size: 0.92rem; margin-bottom: 0.5rem; }
        .med-why-card .med-body:last-child { margin-bottom: 0; }
        .med-why-card .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-why-card .med-body a:hover { text-decoration: underline; }

        .med-why-footer { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; justify-content: center; padding: 2rem 0 4rem; border-top: 1px solid rgba(15,118,110,0.08); margin-top: 2rem; }
        .med-why-footer a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
        .med-why-footer a:hover { color: #0d6b64; text-decoration: underline; }

        .med-why-quote { padding: 1.25rem 1.5rem; background: #f7f9f7; border-left: 4px solid #0f766e; border-radius: 0 12px 12px 0; margin: 0.5rem 0; }
        .med-why-quote .med-body { font-size: 0.92rem; font-style: italic; color: #4b5259; margin: 0; }
        .med-why-quote .med-body strong { color: #2B2A26; }

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
              { name: 'Why People Go to Meditation Retreats' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Why People Go</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Nobody wakes up one morning and decides, calmly and rationally, to spend a week in silence on a mountain. There is always a reason. Usually several. And the reasons people give before the retreat are almost never the reasons they identify afterward.
            </p>
            <p className="med-body" style={{ marginTop: '-0.5rem' }}>
              After hosting hundreds of retreatants across five Himalayan locations, patterns emerge. The stated motivations cluster into recognisable categories. But beneath each category is something more honest — a threshold that daily life cannot accommodate, and the intuition that stillness might.
            </p>
            <div className="med-hero-tags">
              <span>Burnout</span>
              <span>Life Transitions</span>
              <span>Curiosity</span>
              <span>Digital Detox</span>
            </div>
            <div className="med-hero-actions">
              <a href="#burnout" className="med-cta-btn">Read the Reasons</a>
              <a href="#plan" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Find Your Retreat</a>
            </div>
          </div>
        </section>

        {/* ── 1. BURNOUT ── */}
        <section id="burnout" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-why-card">
              <span className="med-badge">Reason 1</span>
              <h2 className="med-h2">Because the Nervous System <span>Has Hit a Wall</span></h2>
              <p className="med-body">
                This is the most common reason, and it rarely arrives with a label. People do not say "I am burnt out." They say "I need a break from everything" or "I can't think clearly anymore" or "I feel like I'm running on fumes." The body knows before the mind admits it.
              </p>
              <p className="med-body">
                Chronic stress maintains the nervous system in sympathetic dominance — fight-or-flight mode running continuously at low intensity. Heart rate slightly elevated. Sleep slightly disrupted. Attention slightly fractured. None of these is dramatic enough to trigger a crisis, but the accumulation is corrosive. Decision quality declines. Emotional reactions become disproportionate. The capacity for joy narrows.
              </p>
              <p className="med-body">
                A retreat addresses this at the physiological level. By removing the inputs that maintain stress — notifications, deadlines, social obligations, ambient noise — the nervous system is given space to shift into parasympathetic recovery. This is not metaphor. It is measurable: cortisol drops, heart rate variability improves, sleep architecture normalises. Most participants feel the shift by day three. Our <Link href="/burnout-recovery-retreats">burnout recovery retreats</Link> are specifically designed around this recovery arc.
              </p>
              <div className="med-why-quote">
                <p className="med-body">"I didn't come to learn meditation. I came because my body had stopped processing rest. I could sleep eight hours and wake up exhausted. By day four of the retreat, I slept five hours and woke up restored. The mountain didn't teach me anything. It removed what was preventing recovery." — <strong>Software architect, Bangalore</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. LIFE TRANSITIONS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-why-card">
              <span className="med-badge">Reason 2</span>
              <h2 className="med-h2">Because Something <span>Ended or Changed</span></h2>
              <p className="med-body">
                Grief. Divorce. Career collapse. The death of a parent. Retirement. The empty nest. A diagnosis. Life transitions generate a particular kind of distress that ordinary support structures — friends, therapy, holidays — cannot fully metabolise. The distress is not a problem to be solved. It is a passage to be moved through. And passages require space.
              </p>
              <p className="med-body">
                Retreat environments provide what transition demands: unstructured time, release from performance, and permission to feel without narrating. In daily life, grief and loss must be managed around responsibilities. At a retreat, they can simply be present. The silence holds what conversation cannot.
              </p>
              <div className="med-why-quote">
                <p className="med-body">"I had done everything right. Therapy, support groups, journalling. But I hadn't sat still. I hadn't let the sadness be there without trying to understand or fix it. Three days of silence in the forest did what months of talking could not. Not because silence is magic. Because it gave the grief room to be its actual size." — <strong>Teacher, Delhi</strong></p>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          
          label="Find the Right Retreat for You"
          subtext="Tell us what you're going through — we'll recommend the programme that fits."
          vertical="retreat"
          category="why-people-go"
          sourcePath={PATH}
        />

        {/* ── 3. CURIOSITY ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-why-card">
              <span className="med-badge">Reason 3</span>
              <h2 className="med-h2">Because Curiosity <span>Outgrew the App</span></h2>
              <p className="med-body">
                A significant cohort arrives having meditated for months or years using apps — Headspace, Calm, Insight Timer — and sensing that the ten-minute guided session has reached its ceiling. The app introduced the practice. Now the practice needs a different container.
              </p>
              <p className="med-body">
                What an app cannot provide is duration, immersion, and environmental support. Ten minutes of meditation in a noisy flat is a fundamentally different experience from ten hours of practice in a silent Himalayan forest. The difference is not merely quantitative. It is qualitative. Extended practice in a supportive environment accesses layers of awareness that short daily sessions cannot reach — not because the technique is different, but because the depth of concentration requires time and reduction of competing inputs.
              </p>
              <div className="med-why-quote">
                <p className="med-body">"I had meditated every day for two years. I knew I was scratching the surface but couldn't get deeper from my living room. The <Link href="/7-day-meditation-retreat">seven-day retreat</Link> was the difference between looking at a photograph of the ocean and swimming in it. Same phenomenon. Entirely different experience." — <strong>Product designer, Mumbai</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. DISCONNECTION ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-why-card">
              <span className="med-badge">Reason 4</span>
              <h2 className="med-h2">Because Digital Life <span>Has Become Unbearable</span></h2>
              <p className="med-body">
                Screen fatigue is now a primary motivator for retreat attendance. Not philosophical objection to technology — visceral exhaustion from it. The average Indian adult now spends over seven hours daily on screens. The average knowledge worker checks their phone 96 times per day. This is not use. It is compulsion. And many people can feel it eroding their attention, their sleep, and their capacity for sustained thought.
              </p>
              <p className="med-body">
                A meditation retreat is the most effective digital detox available because it replaces the screen not with deprivation but with something better: natural beauty, physical movement, genuine human connection, and the depth of your own undistracted mind. The <Link href="/a-week-without-my-phone-digital-detox">first-person account of a digital detox retreat</Link> describes the arc that most participants experience: 72 hours of withdrawal followed by a clarity they haven't felt in years.
              </p>
              <p className="med-body">
                Our <Link href="/digital-detox-retreat">digital detox retreats</Link> in Chakrata are designed specifically around this need. The forest provides natural sensory richness. The altitude gently quiets the mind. And the absence of signal removes the choice entirely — you cannot check because there is nothing to connect to.
              </p>
            </div>
          </div>
        </section>

        {/* ── 5. DEPTH ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-why-card">
              <span className="med-badge">Reason 5</span>
              <h2 className="med-h2">Because the Practice <span>Has Plateaued</span></h2>
              <p className="med-body">
                Experienced meditators reach plateaus. The daily practice that once felt revelatory becomes routine. Concentration develops to a certain level and stalls. Insights stop arriving. The practice feels maintained rather than alive. This is not failure — it is the natural saturation point of practice within a familiar environment.
              </p>
              <p className="med-body">
                A retreat breaks the plateau by changing the conditions. Extended sits, new environments, skilled teachers, and the support of a practising community create the conditions for the practice to deepen in ways that routine cannot sustain.
              </p>
              <p className="med-body">
                For practitioners at this stage, <Link href="/locations/zanskar">Zanskar</Link> offers something no accessible retreat centre can: altitude at 3,500 metres that physiologically shifts awareness, monastery environments carrying centuries of accumulated practice, and isolation so complete that the nervous system has no choice but to let go of its familiar patterns. Read the <Link href="/my-7-day-meditation-retreat-in-zanskar">first-person account of a Zanskar retreat</Link> for what this looks like in practice.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Meditation Retreat"
          subtext="Whether you're a beginner or a seasoned practitioner — we'll match you to the right programme."
          vertical="retreat"
          category="why-people-go"
          sourcePath={PATH}
        />

        {/* ── 6. UNNAMEABLE ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-why-card">
              <span className="med-badge">Reason 6</span>
              <h2 className="med-h2">Because Something Is Calling <span>and They Cannot Name It</span></h2>
              <p className="med-body">
                This is the hardest reason to articulate and the most common one we hear in retrospect. A significant number of retreatants arrive without a clear reason. They cannot explain why they booked. They saw a photograph of a monastery on a cliff. They read a sentence about silence in a mountain valley. Something in them responded, and they followed the response before their rational mind could talk them out of it.
              </p>
              <p className="med-body">
                Psychology calls this a "felt sense" — a body-based knowing that precedes conceptual understanding. It is not irrational. It is pre-rational. The organism knows what it needs before the mind can construct a justification. Many contemplative traditions regard this impulse as the beginning of serious practice: the moment when the desire for depth becomes stronger than the desire for comfort.
              </p>
              <div className="med-why-quote">
                <p className="med-body">"I had no reason to be there. My life was fine. Successful career, good relationships, no crisis. But something felt surface-level. Like I was living the right life at the wrong depth. I couldn't argue for the retreat logically. I could only say that something in me needed it. That turned out to be the most honest reason of all." — <strong>Journalist</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. PHYSICAL HEALTH ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-why-card">
              <span className="med-badge">Reason 7</span>
              <h2 className="med-h2">Because the Body <span>Started Sending Signals</span></h2>
              <p className="med-body">
                Insomnia. Chronic pain without clear cause. Digestive issues. Tension headaches. A doctor said "stress-related" and prescribed rest that never happened. The body communicates through symptoms what the mind refuses to acknowledge through thought. When medical investigations find nothing structural, the signal is often psychosomatic — not imagined, but generated by a nervous system that has been running too hot for too long.
              </p>
              <p className="med-body">
                Retreat environments address the nervous system directly. Silence reduces sensory load. Nature immersion activates restorative pathways. Structured rest allows the body to enter recovery states that are impossible to access while maintaining daily responsibilities. The combination of meditation, altitude, forest environment, and removal of chronic stressors creates conditions for the body to begin healing what it could not heal in the midst of the life that made it sick.
              </p>
              <p className="med-body">
                Our <Link href="/stress-relief-retreats">stress relief retreats</Link> and <Link href="/7-day-healing-retreat">healing retreats</Link> are designed with this population in mind — integrating somatic practices, gentle movement, and extended rest alongside meditation.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHAT THEY SAY AFTER ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-why-card">
              <span className="med-badge">Afterward</span>
              <h2 className="med-h2">What People Say <span>After the Retreat</span></h2>
              <p className="med-body">
                The reasons people give for coming and the reasons they give for the experience being valuable rarely match. People come for stress relief and discover grief they hadn't processed. People come for spiritual development and discover their body needs rest more than their soul needs enlightenment. People come because a friend recommended it and discover a capacity for silence they didn't know they had.
              </p>
              <p className="med-body">
                The most consistent post-retreat report is not about meditation technique at all. It is about proportion. Retreatants repeatedly describe a recalibrated sense of what matters — a capacity to distinguish between the urgent and the important that was not available before. The silence does not add wisdom. It removes the noise that was preventing existing wisdom from being heard.
              </p>
              <p className="med-body">
                If something in this page resonates — even if you cannot articulate what — that is worth paying attention to. Start with a <Link href="/3-day-meditation-retreat">3-day programme</Link> to test whether your intuition is right. Read about <Link href="/what-to-expect-at-a-meditation-retreat">what to expect</Link> or browse <Link href="/best-meditation-retreats-in-india">India's best meditation retreats</Link> to find the right setting. Or explore the <Link href="/what-happens-to-your-mind-in-silence">psychology of what silence does to your mind</Link>.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Start My Retreat Journey"
          subtext="Not sure where to begin? Tell us what's drawing you — we'll help you find the right retreat."
          vertical="retreat"
          category="why-people-go"
          sourcePath={PATH}
        />

        <FeaturedRetreat
          title="Find the Right Retreat for Your Reason"
          description="Whether you're drawn by burnout, curiosity, or something you can't name — we'll match you to the right programme, location, and duration."
          links={[
            { label: 'Take the retreat quiz', href: '/find-your-retreat' },
            { label: 'Browse programmes', href: '/retreat-programs' },
            { label: 'See upcoming dates', href: '/retreat-calendar' },
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
            { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
            { label: 'Is a Meditation Retreat Worth It?', href: '/is-a-meditation-retreat-worth-it' },
            { label: 'Best Meditation Retreats in India', href: '/best-meditation-retreats-in-india' },
            { label: 'My 7-Day Meditation Retreat in Zanskar', href: '/my-7-day-meditation-retreat-in-zanskar' },
          ]}
        />

        {/* ── FOOTER ── */}
        <div className="med-why-footer">
          <Link href="/meditation-retreats">← Meditation Retreats</Link>
          <Link href="/what-happens-to-your-mind-in-silence">What Happens to Your Mind in Silence</Link>
          <Link href="/is-a-meditation-retreat-worth-it">Is a Retreat Worth It?</Link>
        </div>

      </article>
    </TrackedPage>
  );
}
