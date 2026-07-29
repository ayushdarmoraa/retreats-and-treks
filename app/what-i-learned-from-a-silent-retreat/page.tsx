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

const PATH = '/what-i-learned-from-a-silent-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'What I Learned from a Silent Retreat',
    description:
      'A first-person account of a 5-day silent meditation retreat in the Himalayas, including mental stages, silence, insight, and what stays afterward.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'What I Learned from a Silent Retreat',
      description:
        'What happens to your mind during 5 days of silence in the Himalayas. A first-person retreat story.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('What I Learned from a Silent Retreat'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the hardest part of a silent retreat?',
    answer:
      'For most people, day two is the hardest. The initial novelty has worn off, surface distractions have burned through, and whatever you have been avoiding becomes present. The impulse to speak — to narrate, explain, or connect — is surprisingly strong. By day three, most participants report that the difficulty shifts to boredom, which then transforms into a different quality of attention.',
  },
  {
    question: 'Can you really go 5 days without talking?',
    answer:
      'Yes, and it is far more achievable than it sounds. The structure of a retreat — guided sessions, shared meals, walking periods — provides rhythm without requiring conversation. Most participants find the hardest part is not the silence itself but the impulse to fill silence with unnecessary communication. By day three, most people are reluctant to break it.',
  },
  {
    question: 'What are the benefits of a silent retreat?',
    answer:
      'Measurable benefits include improved sleep quality, reduced reactivity to stress, increased present-moment awareness, and enhanced emotional regulation. Subjectively, participants report a sense of mental clarity that persists for weeks to months. The silence allows the nervous system to downregulate from chronic alertness, and this recalibration has lasting effects.',
  },
  {
    question: 'Is a silent retreat religious?',
    answer:
      'Our silent retreats are not affiliated with any religion. Some techniques draw on Buddhist mindfulness traditions, but the practice is secular and evidence-based. No beliefs are required. The silence is a neurological tool — it reduces sensory input and allows the mind to settle. You do not need to be spiritual to benefit from it.',
  },
  {
    question: 'How do I prepare for my first silent retreat?',
    answer:
      'Start with short periods of silence at home — even 30 minutes without phone, music, or conversation. Establish a basic daily meditation practice, even 10 minutes. Read about what to expect so the structure is not surprising. And choose a shorter retreat (3 days) for your first experience. Preparation reduces anxiety and allows you to use the retreat time for practice rather than adjustment.',
  },
];

export default function SilentRetreatStoryPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Silent Retreats', url: buildCanonicalUrl('/silent-retreats') },
    { name: 'What I Learned from a Silent Retreat', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What I Learned from a Silent Retreat — 5 Days Without Speaking',
    description:
      'A first-person account of a 5-day silent meditation retreat in the Himalayas.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2025-11-10',
    dateModified: '2026-03-01',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "What I Learned from a Silent Retreat: 5 Days Without Speaking in the Himalayas".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="What I Learned from a Silent Retreat — 5 Days Without Speaking"
        description="A first-person account of a 5-day silent meditation retreat in the Himalayas."
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
        .med-story-meta {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          color: #6b7280;
          margin-bottom: 1rem;
        }

        .med-story-card { padding: 1.5rem; }
        .med-story-card .med-badge {
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
        .med-story-card .med-h2 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .med-story-card .med-body { font-size: 0.92rem; margin-bottom: 0.5rem; }
        .med-story-card .med-body:last-child { margin-bottom: 0; }

        .med-story-list { padding-left: 1.25rem; line-height: 2.2; margin-bottom: 1rem; list-style: none; }
        .med-story-list li { position: relative; padding-left: 1.5rem; }
        .med-story-list li::before { content: '✦'; position: absolute; left: 0; color: #0f766e; font-size: 0.8rem; }
        .med-story-list li strong { color: #2B2A26; font-weight: 600; }
        .med-story-list li a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-story-list li a:hover { text-decoration: underline; }

        .med-story-footer { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; justify-content: center; padding: 2rem 0 4rem; border-top: 1px solid rgba(15,118,110,0.08); margin-top: 2rem; }
        .med-story-footer a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
        .med-story-footer a:hover { color: #0d6b64; text-decoration: underline; }

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
              { name: 'What I Learned from a Silent Retreat' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Retreat Story</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-story-meta" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              5 days · Chakrata, Uttarakhand · 2,000m
            </p>
            <p className="med-body" style={{ fontSize: '1.05rem' }}>
              I talk for a living. Meetings, presentations, calls that could have been emails, emails that could have been silence. My days are an unbroken stream of language, and it hadn't occurred to me until someone asked: when was the last time you went an entire day without speaking?
            </p>
            <p className="med-body" style={{ fontSize: '1.05rem', marginTop: '-0.5rem' }}>
              I couldn't remember. So I signed up for five days of it. A <Link href="/silent-retreats" style={{ color: '#5eead4', fontWeight: 500, textDecoration: 'none' }}>silent retreat</Link> in the Himalayan forests above Dehradun, at a place called <Link href="/locations/chakrata" style={{ color: '#5eead4', fontWeight: 500, textDecoration: 'none' }}>Chakrata</Link>. This is what happened.
            </p>
            <div className="med-hero-tags">
              <span>Day 1: Noise</span>
              <span>Day 2: The Wall</span>
              <span>Day 3: The Turn</span>
              <span>Days 4–5: Depth</span>
            </div>
            <div className="med-hero-actions">
              <a href="#arrival" className="med-cta-btn">Read the Story</a>
              <a href="#plan" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Plan Your Retreat</a>
            </div>
          </div>
        </section>

        {/* ── ARRIVAL ── */}
        <section id="arrival" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-story-card">
              <span className="med-badge">The Beginning</span>
              <h2 className="med-h2">Arriving at the <span>Edge of Silence</span></h2>
              <p className="med-body">
                Chakrata is two and a half hours from Dehradun by car. The road climbs steadily through deodar and oak forest until the air changes — cooler, thinner, scented with pine resin. At 2,000 metres, the trees close overhead and the noise of plains India simply stops. No honking. No construction. No market chatter. Just birdsong and the occasional sound of wind through high branches.
              </p>
              <p className="med-body">
                The retreat centre was small: twelve participants, two facilitators, a cook. Simple rooms. Shared meals. A meditation hall with cushions facing a wall of windows looking into forest. The facilitator gathered us for an orientation. The rules were sparse: no speaking, no eye contact seeking, no phones, no reading, no writing until day four. Meals at fixed times. Sessions at fixed times. Everything else was open.
              </p>
              <p className="med-body">
                "The silence is not a punishment," she said. "It is the removal of your most practiced escape route. What remains is you. That is both the difficulty and the gift."
              </p>
            </div>
          </div>
        </section>

        {/* ── DAY 1 ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-story-card">
              <span className="med-badge">Day 1</span>
              <h2 className="med-h2">The Noise <span>Inside the Silence</span></h2>
              <p className="med-body">
                The first thing I noticed was that external silence makes internal noise louder. With no conversations to orchestrate, no inputs to process, no tasks to manage, my mind filled the space with its own production. Replaying conversations. Planning what I would say when I got back. Composing emails in my head. Judging whether I was "doing it right."
              </p>
              <p className="med-body">
                The morning meditation session was forty-five minutes. It felt like three hours. My back ached. My mind raced. I opened my eyes four times to check whether others seemed as restless as I felt. (They didn't, which made it worse.)
              </p>
              <p className="med-body">
                After lunch, I walked the forest path. Deodar trees, some of them centuries old, towered overhead. The silence here was different from the silence of the meditation hall — it was alive with small sounds. A woodpecker. Water somewhere below. Leaves moving. The forest taught me something the cushion hadn't: silence is not the absence of sound. It is the absence of noise. The distinction matters.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          
          label="Explore Silent Retreats"
          subtext="3 to 10-day programmes in Himalayan forest silence. Groups of 12 or fewer."
          vertical="retreat"
          category="silent-story"
          sourcePath={PATH}
        />

        {/* ── DAY 2 ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-story-card">
              <span className="med-badge">Day 2</span>
              <h2 className="med-h2">Hitting <span>The Wall</span></h2>
              <p className="med-body">
                Day two was the hardest day of the retreat and possibly one of the hardest days of my year. The novelty of silence had worn off. I was bored, agitated, and intermittently sad for reasons I couldn't articulate. My mind produced a rolling series of escape fantasies: faking illness, checking my phone, starting a conversation with someone about how hard this was.
              </p>
              <p className="med-body">
                The facilitator had anticipated this. The afternoon session was body-based rather than sitting — slow yoga, then walking meditation at half-normal pace. Moving the body gave the agitation somewhere to go. The walk through the forest, step by excruciatingly slow step, did something unexpected: it made me aware of how fast I normally move through the world. Not just physically. Mentally. Emotionally. I rush through everything. The slow walk made the rushing visible.
              </p>
              <p className="med-body">
                That evening, sitting in the hall as light faded through the windows, something shifted. The agitation didn't disappear — it softened. I realised I was not bored. I was uncomfortable with myself without the usual armour of activity and language. This was the point. The <Link href="/what-happens-at-a-silent-retreat">silence was working exactly as designed</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* ── DAY 3 ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-story-card">
              <span className="med-badge">Day 3</span>
              <h2 className="med-h2">When Something <span>Turns</span></h2>
              <p className="med-body">
                I woke on day three having slept more deeply than I had in months. No alarm. No phone check. Just the gradual lightening of the room and the birds starting up in the forest. The absence of a morning information avalanche — no news, no messages, no social feeds — created a quality of morning presence that felt almost luxurious.
              </p>
              <p className="med-body">
                The meditation sessions became easier. Not because my mind stopped wandering — it still did, constantly — but because the wandering bothered me less. I was developing a different relationship with my own thoughts. Instead of being carried away by each one, I began to notice them arriving, watch them form, and let them pass. Not controlling them. Just seeing them. This felt like learning a new sense.
              </p>
              <p className="med-body">
                The facilitator later explained that this is the typical day-three shift. The nervous system, deprived of its habitual stimulation for 72 hours, begins to downregulate. The stress response settles. The prefrontal cortex — the part that plans, worries, and narrates — reduces its activity. What emerges is a more present-centred, less reactive mode of awareness. It is not mystical. It is neurological. But it feels like grace.
              </p>
            </div>
          </div>
        </section>

        {/* ── DAYS 4–5 ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-story-card">
              <span className="med-badge">Days 4–5</span>
              <h2 className="med-h2">Living in <span>The Quiet</span></h2>
              <p className="med-body">
                By day four, I no longer wanted to speak. The desire had simply evaporated. Language — usually my primary tool, my comfort zone, my identity — felt unnecessary. I could feel the impulse arise with each meal (the urge to comment on the food, to make eye contact and smile, to perform being a pleasant person) and then watch it dissolve. Who was I without performance? Someone quieter, less charming, and considerably more present.
              </p>
              <p className="med-body">
                Journalling was permitted from day four onward, and I filled pages. Not with insight or profundity — with observation. The quality of light through deodar branches at 7am. The specific sound of forest wind (not one sound but a layered orchestra of leaf movements at different heights). The feeling of warm food after a cold morning sit. I was paying attention to ordinary experience with an intensity I hadn't brought to anything in years.
              </p>
              <p className="med-body">
                Day five — the final full day of silence — included a long walk to a ridge above the tree line. The view opened to snowcapped peaks in the distance. I stood there for twenty minutes, not thinking about the view, not photographing it, not composing a description for anyone. Just standing in it. When did I last look at something beautiful without immediately framing it for communication? I genuinely could not remember.
              </p>
              <p className="med-body">
                That, perhaps, is the deepest lesson of a silent retreat: you discover how little of your experience you actually inhabit. How much of your attention goes to narrating, sharing, packaging, and performing — rather than simply being present for what is happening. The silence doesn't add anything. It removes the habits that prevent direct experience. What remains is enough.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Book a Silent Retreat"
          subtext="3 to 10 days. Himalayan forest. Maximum 12 participants."
          vertical="retreat"
          category="silent-story"
          sourcePath={PATH}
        />

        {/* ── WHAT STAYED ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-card med-story-card">
              <span className="med-badge">Afterward</span>
              <h2 className="med-h2">What Stayed with Me <span>After the Silence Ended</span></h2>
              <p className="med-body">
                The silence broke on the morning of day six. We spoke over breakfast — slowly, carefully, with a tenderness that surprised everyone. The woman next to me said she had been dreading the silence and was now dreading its end. Several people cried. Not from sadness. From the relief of having been truly quiet for the first time in their adult lives.
              </p>
              <p className="med-body">
                Six weeks later, here is what persisted:
              </p>
              <ul className="med-story-list">
                <li><strong>I notice noise now.</strong> Not just literal noise — the mental noise of unnecessary input. I unsubscribed from everything. I check my phone half as often. These are not discipline — they are preference. The silence changed what I want.</li>
                <li><strong>I speak less in meetings.</strong> Not strategic silence — genuine reduction. I say what needs to be said and stop. The impulse to fill every pause with language has diminished.</li>
                <li><strong>I sleep better.</strong> The deepest sleep of the retreat has not fully returned, but my sleep quality improved measurably and has stayed improved.</li>
                <li><strong>I have a daily practice.</strong> Twenty minutes of sitting each morning. Not every morning. But most. The retreat showed me what the practice connects to, and that knowledge is motivating in a way that willpower never was.</li>
              </ul>
              <p className="med-body">
                If you are considering a silent retreat, my honest advice: start with <Link href="/3-day-silent-retreat">three days</Link>. It is enough to experience the shift without the full intensity of a longer programme. If three days reveals something you want more of, the <Link href="/7-day-meditation-retreat">seven-day</Link> and <Link href="/10-day-silent-retreat">ten-day options</Link> go deeper. And if you want the most immersive silent experience available, read about <Link href="/my-7-day-meditation-retreat-in-zanskar">seven days of silence at 3,500 metres in Zanskar</Link>.
              </p>
            </div>
          </div>
        </section>

        <FeaturedRetreat
          title="3-Day Silent Retreat in Chakrata"
          description="Begin with silence in the deodar forest. Guided sessions, small group, and the gentle introduction described in this story."
          links={[
            { label: 'View programme', href: '/3-day-silent-retreat' },
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
            { label: 'What Happens to Your Mind in Silence', href: '/what-happens-to-your-mind-in-silence' },
            { label: 'Why People Go to Meditation Retreats', href: '/why-people-go-to-meditation-retreats' },
            { label: 'Is a Meditation Retreat Worth It?', href: '/is-a-meditation-retreat-worth-it' },
            { label: 'A Week Without My Phone — Digital Detox', href: '/a-week-without-my-phone-digital-detox' },
          ]}
        />

        {/* ── FOOTER ── */}
        <div className="med-story-footer">
          <Link href="/silent-retreats">← Silent Retreats</Link>
          <Link href="/how-to-prepare-for-a-retreat">How to Prepare</Link>
          <Link href="/what-happens-at-a-silent-retreat">What Happens at a Silent Retreat</Link>
        </div>

      </article>
    </TrackedPage>
  );
}
