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

const PATH = '/how-hard-is-a-silent-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'How Hard Is a Silent Retreat? | Retreats And Treks',
    description:
      'How hard is a silent retreat? Understand boredom, emotional surfacing, physical discomfort, the urge to leave, and why people return.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'How Hard Is a Silent Retreat? What to Actually Expect',
      description: 'The honest truth about silent retreat difficulty — and why people still go.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('How Hard Is a Silent Retreat? What to Actually Expect'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Is a silent retreat harder than a regular meditation retreat?',
    answer:
      'Generally yes. Removing speech removes your primary coping mechanism — the ability to process experience by talking about it. This forces you to sit with thoughts and emotions directly, which many people find more intense than guided meditation with talking breaks. However, many participants report that the difficulty is also what makes it more transformative.',
  },
  {
    question: 'What is the hardest day of a silent retreat?',
    answer:
      'Day two or three for most people. The novelty of day one has worn off, the end is nowhere in sight, and accumulated mental patterns start surfacing. Boredom, restlessness, and intense emotions are common. By day four or five, most participants report a settling — the mind starts to find its own rhythm.',
  },
  {
    question: 'Can I leave a silent retreat early if it gets too hard?',
    answer:
      'Yes, you can always leave. No ethical retreat will force you to stay. However, facilitators will typically ask you to sit with the urge to leave before acting on it, because the desire to escape is often the practice itself. The discomfort that makes you want to leave is usually temporary and precedes a significant shift.',
  },
  {
    question: 'Is a 3-day silent retreat easier than a 10-day one?',
    answer:
      'A 3-day retreat is shorter but not necessarily easier. Shorter retreats can feel more intense because you hit the difficult middle section without the resolution that comes on days 5–7 of a longer retreat. Longer retreats give you time to move through the hard part and experience the calm on the other side. For beginners, a 3-day retreat is still recommended because the total difficulty exposure is lower.',
  },
  {
    question: 'What if I have anxiety — will a silent retreat make it worse?',
    answer:
      'It depends. Silence can initially heighten awareness of anxious thoughts, which may feel like increased anxiety. For mild to moderate anxiety, this heightened awareness often leads to improved understanding of your patterns, which is therapeutic. For severe clinical anxiety, panic disorder, or PTSD, consult a mental health professional before booking. Our facilitators can discuss your situation — contact us for a confidential conversation before committing.',
  },
];

export default function HowHardIsASilentRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Silent Retreats', url: buildCanonicalUrl('/silent-retreats') },
    { name: 'How Hard Is a Silent Retreat?', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Hard Is a Silent Retreat? What to Actually Expect',
    description: 'An honest breakdown of what makes silent retreats difficult.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "How Hard Is a Silent Retreat, Really?".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="How Hard Is a Silent Retreat? What to Actually Expect"
        description="The honest truth about silent retreat difficulty — and why people still go."
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

        .med-difficulty-item { margin-bottom: 1.5rem; }
        .med-difficulty-item:last-child { margin-bottom: 0; }
        .med-difficulty-item .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-difficulty-item .med-body { font-size: 0.92rem; margin-bottom: 0; }
        .med-difficulty-item .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-difficulty-item .med-body a:hover { text-decoration: underline; }

        .med-difficulty-grid { display: grid; gap: 1.25rem; margin-top: 1.8rem; }

        .med-difficulty-duration { margin-top: 1.5rem; }
        .med-difficulty-duration .med-list { margin-top: 0.5rem; }
        .med-difficulty-duration .med-list li a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-difficulty-duration .med-list li a:hover { text-decoration: underline; }

        .med-difficulty-who { margin-top: 1.5rem; }
        .med-difficulty-who .med-list { margin-top: 0.5rem; }

        .med-difficulty-why { margin-top: 1.5rem; }

        .med-difficulty-easier { margin-top: 1.5rem; }
        .med-difficulty-easier .med-list { margin-top: 0.5rem; }

        .med-difficulty-footer-nav { display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; padding-top: 1.5rem; margin-top: 2rem; border-top: 1px solid rgba(15,118,110,0.08); }
        .med-difficulty-footer-nav a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
        .med-difficulty-footer-nav a:hover { text-decoration: underline; }

        .med-difficulty-section { padding: 4rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Silent Retreats', href: '/silent-retreats' }, { name: 'How Hard Is It?' }]} />
        </div>
      </div>

      <article>

        {/* ── HERO ── */}
        <section className="med-shell med-hero-section">
          <div style={{ position: 'absolute', inset: 0 }}>
            <img className="med-hero-bg" src="/Images/experience-hubs/meditation-hero.webp" alt="How hard is a silent retreat" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div className="med-hero-overlay" />
          </div>
          <div className="med-hero-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Silent Retreat Guide</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              The honest answer: it is one of the hardest things most people will voluntarily do. It is also, overwhelmingly, one of the most worthwhile. Here is what actually makes it difficult — and why nearly everyone who finishes says they would do it again.
            </p>
            <div className="med-hero-tags">
              <span>Boredom</span>
              <span>Emotions</span>
              <span>Physical Discomfort</span>
              <span>Urge to Leave</span>
            </div>
            <div className="med-hero-actions">
              <Link href="#plan" className="med-cta-btn">Try a 3-Day Retreat</Link>
              <a href="#difficulties" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>What Makes It Hard</a>
            </div>
          </div>
        </section>

        {/* ── THE FIVE DIFFICULTIES ── */}
<section id="difficulties" className="med-shell med-section-alt" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
  <div className="med-inner">
    <div className="med-eyebrow">
      <span className="med-eyebrow-line" />
      <span className="med-eyebrow-text">The Challenges</span>
    </div>
    <h2 className="med-h2">
      The Five Things That <span>Make It Hard</span>
    </h2>
    <p className="med-body" style={{ maxWidth: '42rem', marginBottom: '2.5rem' }}>
      These five difficulties are universal. Everyone faces them. The difference is whether you see them as obstacles or as the practice itself.
    </p>

    <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
      {/* 1. Boredom */}
      <div className="med-card" style={{ padding: '1.5rem' }}>
        <span className="med-season-tag">01</span>
        <h3 className="med-h3" style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Boredom</h3>
        <p className="med-body" style={{ fontSize: '0.92rem', marginBottom: '0.5rem' }}>
          Not the casual boredom of a slow afternoon. This is existential boredom — the kind that arrives when every distraction you rely on has been removed. No phone, no conversation, no books, no music. Just you and the passage of time.
        </p>
        <p className="med-body" style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: 0 }}>
          <strong>Why it's valuable:</strong> Learning that you can exist without external stimulation is freedom.
        </p>
      </div>

      {/* 2. Emotional Surfacing */}
      <div className="med-card" style={{ padding: '1.5rem' }}>
        <span className="med-season-tag">02</span>
        <h3 className="med-h3" style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Emotional Surfacing</h3>
        <p className="med-body" style={{ fontSize: '0.92rem', marginBottom: '0.5rem' }}>
          When external noise stops, internal noise gets louder. Unprocessed emotions — grief, anger, regret, longing — rise to the surface with a force that surprises nearly everyone. People cry. People feel rage they did not know they were carrying.
        </p>
        <p className="med-body" style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: 0 }}>
          <strong>Why it's valuable:</strong> Emotions that have been stuck for years finally get to move.
        </p>
      </div>

      {/* 3. Physical Discomfort */}
      <div className="med-card" style={{ padding: '1.5rem' }}>
        <span className="med-season-tag">03</span>
        <h3 className="med-h3" style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Physical Discomfort</h3>
        <p className="med-body" style={{ fontSize: '0.92rem', marginBottom: '0.5rem' }}>
          Sitting for multiple hours a day is physically demanding. Knees ache, backs stiffen, shoulders tighten. Even with cushions, chairs, and walking meditation breaks, your body will protest — especially on days two and three.
        </p>
        <p className="med-body" style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: 0 }}>
          <strong>Why it's valuable:</strong> Physical resilience built through stillness translates to resilience in all areas of life.
        </p>
      </div>

      {/* 4. The Urge to Leave */}
      <div className="med-card" style={{ padding: '1.5rem' }}>
        <span className="med-season-tag">04</span>
        <h3 className="med-h3" style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>The Urge to Leave</h3>
        <p className="med-body" style={{ fontSize: '0.92rem', marginBottom: '0.5rem' }}>
          Almost everyone thinks about leaving — usually between day two and day four. The mind generates convincing reasons: an emergency at home, a forgotten obligation, the certainty that this is not working.
        </p>
        <p className="med-body" style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: 0 }}>
          <strong>Why it's valuable:</strong> Learning to sit with the urge to escape is how you stop running from yourself.
        </p>
      </div>

      {/* 5. Not Knowing If You're "Doing It Right" */}
      <div className="med-card" style={{ padding: '1.5rem', gridColumn: '1 / -1' }}>
        <span className="med-season-tag">05</span>
        <h3 className="med-h3" style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Not Knowing If You're "Doing It Right"</h3>
        <p className="med-body" style={{ fontSize: '0.92rem', marginBottom: '0.5rem' }}>
          Without conversation, you cannot compare your experience to others. Without feedback, you question yourself constantly. Am I meditating correctly? Should I feel something by now? Is this just a waste of time? This uncertainty is the practice.
        </p>
        <p className="med-body" style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: 0 }}>
          <strong>Why it's valuable:</strong> Learning to sit with not-knowing, without reaching for reassurance, is one of the most valuable skills a silent retreat teaches. Read more about the <Link href="/what-happens-to-your-mind-in-silence" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>psychology of what happens in silence</Link>.
        </p>
      </div>
    </div>
  </div>
</section>

        {/* ── DIFFICULTY BY DURATION ── */}
        <section className="med-shell med-section-alt med-difficulty-section">
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Duration Guide</span>
            </div>
            <h2 className="med-h2">How Difficulty Changes <span>by Duration</span></h2>
            <p className="med-body">Silent retreats are not linearly harder with length. The difficulty curve has a peak — usually around days two to four — and then settles.</p>

            <div className="med-difficulty-duration">
              <ul className="med-list">
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong><Link href="/3-day-silent-retreat">3-day retreat</Link></strong> — You experience the hard part (day 2) but may not reach the resolution. Shorter total discomfort but less payoff</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong><Link href="/7-day-meditation-retreat">7-day retreat</Link></strong> — The sweet spot. Days 2–4 are difficult, days 5–7 are where most people report clarity, calm, and genuine insight. You move through the hard part and experience what is on the other side</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong><Link href="/10-day-silent-retreat">10-day retreat</Link></strong> — The gold standard. The extra days deepen the experience beyond what shorter retreats can reach. But they also mean more total time in difficulty. Not recommended for first-timers</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <PrimaryCTA
          id="plan"
          label="Try a Shorter Retreat First"
          subtext="Our 3-day silent retreat is designed as a gateway for first-timers."
          vertical="retreat"
          category="difficulty-guide"
          sourcePath={PATH}
        />

        {/* ── WHO FINDS IT HARDEST ── */}
        <section className="med-shell med-section-white med-difficulty-section">
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Who Finds It Hardest</span>
            </div>
            <h2 className="med-h2">Who Finds It <span>Hardest?</span></h2>
            <p className="med-body">Difficulty is not about fitness or discipline. It tracks more closely with how accustomed you are to constant stimulation and external validation.</p>

            <div className="med-difficulty-who">
              <ul className="med-list">
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>High-stimulus lifestyles</strong> — people who are constantly connected, busy, and externally focused experience the sharpest withdrawal</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>Extroverts</strong> — the inability to process experience through conversation is genuinely harder for people who think by talking</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>Control-oriented people</strong> — those who manage discomfort through planning and action struggle when the only instruction is "sit and observe"</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>People avoiding something</strong> — silence removes the ability to outrun whatever you have been avoiding</span>
                </li>
              </ul>
            </div>

            <p className="med-body" style={{ marginTop: '1rem' }}>
              Interestingly, complete beginners sometimes have an easier time than experienced meditators, because they arrive without expectations about what should happen. Read about <Link href="/what-i-learned-from-a-silent-retreat">what one person learned from their first silent retreat</Link>.
            </p>
          </div>
        </section>

        {/* ── WHY PEOPLE DO IT ── */}
        <section className="med-shell med-section-alt med-difficulty-section">
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Why It's Worth It</span>
            </div>
            <h2 className="med-h2">Why People Do It <span>Anyway</span></h2>
            <p className="med-body">If it is this hard, why do people keep going? Because the difficulty is inseparable from the value. The boredom teaches you that you can exist without stimulation. The emotional surfacing moves grief and anger that may have been stuck for years. The physical discomfort builds resilience. The uncertainty builds tolerance for not-knowing.</p>
            <p className="med-body">After a silent retreat, the world sounds different. Conversations become more intentional. Reactions slow down. The gap between stimulus and response — the space where choice lives — grows wider. This is not metaphor. It is the consistent, measurable outcome of prolonged silence.</p>
            <p className="med-body">Read more about <Link href="/why-people-go-to-meditation-retreats">why people go to meditation retreats</Link> and <Link href="/is-a-meditation-retreat-worth-it">whether a retreat is worth it</Link>.</p>
          </div>
        </section>

        {/* ── HOW TO MAKE IT EASIER ── */}
        <section className="med-shell med-section-white med-difficulty-section">
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Practical Tips</span>
            </div>
            <h2 className="med-h2">How to Make It <span>Easier</span></h2>

            <div className="med-difficulty-easier">
              <ul className="med-list">
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>Start with a shorter retreat</strong> — a <Link href="/3-day-silent-retreat">3-day silent retreat</Link> gives you the experience without 10 days of commitment</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>Choose a retreat with facilitation</strong> — having a guide who checks in daily makes a significant difference, especially for first-timers</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>Prepare physically</strong> — practice sitting for 20–30 minutes daily for 2 weeks before your retreat</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>Arrive without expectations</strong> — the hardest part is the gap between what you expect and what happens</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text"><strong>Trust the structure</strong> — good retreat schedules are designed to carry you through the difficult parts</span>
                </li>
              </ul>
            </div>

            <p className="med-body" style={{ marginTop: '1rem' }}>
              See our full <Link href="/how-to-prepare-for-a-retreat">preparation guide</Link> and <Link href="/first-meditation-retreat-tips">first retreat tips</Link>.
            </p>
          </div>
        </section>

        <FeaturedRetreat
          title="3-Day Silent Retreat — Chakrata Forest"
          description="The gentlest possible entry to silence. Facilitated, forest setting, all meals included."
          links={[
            { label: 'View the 3-day programme', href: '/3-day-silent-retreat' },
            { label: 'See all dates', href: '/retreat-calendar' },
            { label: 'Find your retreat', href: '/find-your-retreat' },
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
            { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
            { label: 'What I Learned from a Silent Retreat', href: '/what-i-learned-from-a-silent-retreat' },
            { label: 'Silent Retreat vs Digital Detox', href: '/silent-retreat-vs-digital-detox' },
            { label: 'Himalayan Silent Retreats', href: '/himalayan-silent-retreats' },
          ]}
        />

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/silent-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Silent Retreats</span>
              </Link>
              <Link href="/what-happens-at-a-silent-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>What Happens at a Silent Retreat</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/retreat-calendar" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreat Calendar</span>
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