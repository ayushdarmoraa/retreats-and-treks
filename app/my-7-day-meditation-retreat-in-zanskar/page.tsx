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

const PATH = '/my-7-day-meditation-retreat-in-zanskar';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: '7-Day Meditation Retreat in Zanskar',
    description:
      'A first-person account of a 7-day silent meditation retreat in Zanskar, with monastery sitting, altitude silence, frozen gorges, and stillness.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'My 7-Day Meditation Retreat in Zanskar',
      description:
        'What really happens during a week of silence at 3,500 metres in a Himalayan monastery valley. A first-person retreat story.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('My 7-Day Meditation Retreat in Zanskar'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Is a 7-day meditation retreat in Zanskar safe for beginners?',
    answer:
      'Zanskar retreats are recommended for those with at least some prior meditation experience — even a few months of home practice or a single weekend retreat. The altitude (3,500m), remoteness, and emotional intensity amplify everything. Beginners do better starting with a 3-day retreat in Chakrata, then progressing to Zanskar.',
  },
  {
    question: 'What does a typical day look like on a Zanskar retreat?',
    answer:
      'Wake at 5:30am. Morning sitting meditation (60–90 minutes). Breakfast in silence. Walking meditation along the river or to a monastery. Late morning guided session. Lunch. Afternoon free period for rest, journalling, or solo walking. Evening sitting session. Lights out by 9pm. The rhythm is designed around natural light and altitude energy.',
  },
  {
    question: 'How do you handle altitude sickness during the retreat?',
    answer:
      'All Zanskar programmes include two acclimatisation days in Leh (3,500m) before the drive into the valley. The retreat pace is deliberately slow. Hydration, gentle movement, and rest are built into the schedule. Our facilitators are trained in altitude awareness. If symptoms persist, descent is always the protocol.',
  },
  {
    question: 'Can I bring my phone to a Zanskar retreat?',
    answer:
      'You can bring it for emergencies, but signal is intermittent to absent in much of the valley. Most participants find the involuntary disconnection to be one of the most valuable aspects of the retreat. We recommend treating it as an opportunity rather than a constraint.',
  },
  {
    question: 'What should I pack for a 7-day retreat in Zanskar?',
    answer:
      'Warm layers (temperatures range from 25°C daytime to 0°C at night in summer), a headlamp, personal medications, sunscreen, and a journal. We provide detailed packing lists upon booking. Accommodation is basic guesthouses and camp-style lodging with all meals included.',
  },
];

export default function ZanskarStoryPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'My 7-Day Retreat in Zanskar', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'My 7-Day Meditation Retreat in Zanskar — A First-Person Account',
    description:
      'A first-person account of a 7-day silent meditation retreat in Zanskar, Ladakh at 3,500 metres.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2025-09-15',
    dateModified: '2026-03-01',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "My 7-Day Meditation Retreat in Zanskar: What Actually Happens When You Stop".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.locations.zanskar;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="My 7-Day Meditation Retreat in Zanskar — A First-Person Account"
        description="A first-person account of a 7-day silent meditation retreat in Zanskar, Ladakh at 3,500 metres."
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

        /* ── Story specific styles ── */
        .med-story-meta {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          color: #6b7280;
          margin-bottom: 1rem;
        }

        .med-story-day {
          margin-bottom: var(--space-xl);
        }
        .med-story-day .med-h2 {
          font-size: clamp(1.5rem, 2.5vw, 1.8rem);
          margin-bottom: 0.5rem;
        }
        .med-story-day .med-body:last-child {
          margin-bottom: 0;
        }

        .med-story-list {
          padding-left: 1.25rem;
          line-height: 2;
          margin-bottom: 1rem;
        }
        .med-story-list li strong {
          color: #2B2A26;
          font-weight: 600;
        }
        .med-story-list li a {
          color: #0f766e;
          font-weight: 500;
          text-decoration: none;
        }
        .med-story-list li a:hover {
          text-decoration: underline;
        }

        .med-story-cta-inline {
          text-align: center;
          margin-top: -1rem;
          margin-bottom: var(--space-xl);
        }
        .med-story-cta-inline a {
          display: inline-block;
          padding: 0.5rem 1.25rem;
          border: 1px solid #0f766e;
          border-radius: 999px;
          color: #0f766e;
          text-decoration: none;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .med-story-cta-inline a:hover {
          background: #0f766e;
          color: #fff;
        }

        .med-story-footer-links {
          margin-top: var(--space-xl);
          font-size: 0.9rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .med-story-footer-links a {
          color: #0f766e;
          font-weight: 500;
          text-decoration: none;
        }
        .med-story-footer-links a:hover {
          text-decoration: underline;
        }
        .med-story-footer-links .med-divider {
          color: #d1d5db;
        }

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
              { name: 'My 7-Day Retreat in Zanskar' },
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
              7 days · Zanskar Valley, Ladakh · 3,500m
            </p>
            <p className="med-body" style={{ fontSize: '1.05rem' }}>
              I didn't go to Zanskar to find myself. I went because I had run out of ways to avoid myself. Eighteen months of pandemic-era overwork, a relationship ending quietly, the creeping sense that I was living someone else's schedule. A colleague mentioned a meditation retreat in a place I'd never heard of. I looked it up. The photos showed bare rock, turquoise rivers, a monastery clinging to a cliff. It looked like the opposite of everything in my life. I booked it.
            </p>
            <p className="med-body" style={{ fontSize: '1.05rem', marginTop: '-0.5rem' }}>
              This is what actually happened during seven days of silence at 3,500 metres in the Trans-Himalayan valley of <Link href="/locations/zanskar" style={{ color: '#5eead4', fontWeight: 500, textDecoration: 'none' }}>Zanskar</Link>.
            </p>
            <div className="med-hero-tags">
              <span>Day 0: Arrival</span>
              <span>Day 1: The Drive</span>
              <span>Day 2: First Session</span>
              <span>Day 5: Breakthrough</span>
            </div>
            <div className="med-hero-actions">
              <a href="#day0" className="med-cta-btn">Read the Story</a>
              <a href="#plan" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Plan Your Retreat</a>
            </div>
          </div>
        </section>

        {/* ── DAY 0 ── */}
        <section id="day0" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Day 0</span>
            </div>
            <h2 className="med-h2">Arriving in <span>Ladakh</span></h2>
            <p className="med-body">
              The flight into Leh is its own initiation. The plane threads between peaks, and suddenly the window fills with brown, barren mountains stretching to every horizon. No green. No rivers you can see. Just rock and sky and the thin, sharp quality of light at 3,500 metres.
            </p>
            <p className="med-body">
              At the airport, the air hits differently. Not thin exactly, but less — as if someone turned down the volume on breathing. The team met us and drove us to a guesthouse in Leh. The instruction was simple: rest, drink water, walk slowly. No exertion. No rushing. Your body is recalibrating.
            </p>
            <p className="med-body">
              I spent two acclimatisation days in Leh. Wandered the market. Sat in Shanti Stupa looking over the valley. Already my mind was quieter than it had been in months, and the retreat hadn't even started. Altitude does something to the mental chatter. The reduced oxygen slows the machinery of overthinking. I noticed this before anyone mentioned it.
            </p>
          </div>
        </section>

        {/* ── DAY 1 ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Day 1</span>
            </div>
            <h2 className="med-h2">The Journey into <span>Zanskar Valley</span></h2>
            <p className="med-body">
              The drive from Leh to Zanskar is 230 kilometres that take eight to ten hours. The road passes through Kargil, then climbs to Pensi La — a 4,400-metre pass where the Drang-Drung Glacier sits enormous and indifferent beside the road. This is the threshold. Crossing Pensi La, I felt something shift. Not dramatic. Just the simple recognition that I was now a long way from anything familiar.
            </p>
            <p className="med-body">
              The valley opened below — wide, brown, austere. No lush forests. No charming villages. Just rock, river, sky, and the occasional monastery perched impossibly on a ridge. I understood immediately why people come here for meditation. There is nothing decorative about this place. It does not try to be beautiful. It simply is what it is, and that honesty works on you.
            </p>
            <p className="med-body">
              We arrived at base near Padum in late afternoon. A simple guesthouse. Warm food. The group — eleven others, from four countries — shared a quiet dinner. The facilitator explained the silence protocol: starting tomorrow morning, we would not speak until day six. No eye contact seeking. No phones. No reading. Just the practice, the land, and ourselves.
            </p>
          </div>
        </section>

        <PrimaryCTA

          label="Explore the Zanskar Retreat"
          subtext="The same 7-day programme described in this story. Small groups, June–September."
          vertical="retreat"
          category="zanskar-story"
          sourcePath={PATH}
        />

        {/* ── DAY 2 ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Day 2</span>
            </div>
            <h2 className="med-h2">The First <span>Meditation Sessions</span></h2>
            <p className="med-body">
              5:30am wake-up. Cold air. The kind of cold that is clean rather than cruel. I walked to the meditation space — a simple room with cushions, facing the valley. The Zanskar River was audible but not loud. The mountains were still dark. The sky was beginning to lighten.
            </p>
            <p className="med-body">
              The first sit was 60 minutes. Breath awareness. Simple instruction: feel the breath at the nostrils. When you notice thinking, return. That's it. No philosophy. No spiritual framework. Just attention and its inevitable wandering.
            </p>
            <p className="med-body">
              The first twenty minutes were restless. My mind produced an impressive inventory of everything I should be doing instead of sitting on a cushion at dawn in Ladakh. Emails. The project I didn't finish. Whether I'd packed enough warm clothes. Then something happened that doesn't happen in my London flat: the room became intensely quiet. Not just silent — quiet in a way that had texture. The absence of ambient noise — no traffic, no fridge hum, no neighbours — created a quality of stillness I had never experienced. My mind, receiving no external input, began to slow.
            </p>
            <p className="med-body">
              After the session, we walked to <Link href="/locations/zanskar" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Karsha Monastery</Link> for walking meditation. The path along the valley floor was flat and wide. Prayer flags snapped in the wind. The monastery appeared above us, white walls against brown rock, and the walk became its own practice.
            </p>
          </div>
        </section>

        {/* ── DAY 3–4 ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Days 3–4</span>
            </div>
            <h2 className="med-h2">Silence and the <span>Mind's Resistance</span></h2>
            <p className="med-body">
              Day three is where most people hit the wall. Two days into silence, the surface distractions have burned off. What remains is whatever you have been avoiding. For me, it was grief. Not dramatic grief — just the accumulated sadness of years spent moving too fast to feel anything properly.
            </p>
            <p className="med-body">
              The altitude amplifies everything. At 3,500 metres, emotions arrive with less buffering. The thinking mind — the one that usually packages feelings into narratives and solutions — is running at reduced capacity. So the feelings just sit there, unprocessed, undeniable. The facilitator had warned us: "The mountain doesn't care about your story. It only cares that you're honest."
            </p>
            <p className="med-body">
              I spent the afternoon of day three sitting by the river. Not meditating formally. Just sitting. The water was the colour of oxidised copper. The rocks were 500 million years old — ancient seabed, uplifted. Fossils of marine organisms visible in cliff faces at 4,000 metres. Perspective is unavoidable here. Whatever I was carrying became appropriately sized.
            </p>
            <p className="med-body">
              Day four brought something I didn't expect: boredom converting into curiosity. With nothing to consume, no information to process, no conversations to manage, my attention turned toward whatever was immediately present. The texture of stone. The exact quality of the wind. The pattern of my own breathing. These things, which I normally ignore entirely, became interesting. Not intellectually — directly. The <Link href="/what-happens-at-a-silent-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>silence was doing its work</Link>.
            </p>
          </div>
        </section>

        {/* ── DAY 5 ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Day 5</span>
            </div>
            <h2 className="med-h2">When the <span>Practice Opens</span></h2>
            <p className="med-body">
              People who haven't done extended retreat sometimes imagine a breakthrough as something dramatic — a vision, an ecstatic moment, a cosmic understanding. Mine was quieter. I woke on day five and realised I had slept eight hours without waking once. This had not happened in over a year.
            </p>
            <p className="med-body">
              The morning sit was different from every session before it. I sat down, found the breath, and the gap between thoughts widened. Not through effort — through the accumulation of four days of practice, altitude, silence, and the relentless honesty of the landscape. The thinking mind didn't stop. It just became less interesting than what was underneath it.
            </p>
            <p className="med-body">
              We visited <Link href="/locations/zanskar" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Phugtal Monastery</Link> that afternoon. The approach through the gorge — two hours of walking through increasingly dramatic terrain — was a practice in itself. When the monastery appeared, built into a cliff face above a cave, something in me understood why people had been meditating in these mountains for a thousand years. It wasn't about belief. It was about the quality of attention these spaces have accumulated. Sitting in the prayer hall, I felt the stones. Nine hundred years of practitioners sitting where I was sitting. The silence had layers.
            </p>
            <p className="med-body">
              That evening, the sunset painted the valley in colours I don't have words for. Not beautiful in the way a postcard is beautiful. Beautiful in the way that truth is beautiful — undecorated and complete.
            </p>
          </div>
        </section>

        <PrimaryCTA
          label="See the Day-by-Day Itinerary"
          subtext="Read the detailed schedule for the 7-day Zanskar meditation programme."
          vertical="retreat"
          category="zanskar-story"
          sourcePath={PATH}
        />

        <div className="med-story-cta-inline">
          <Link href="/7-day-zanskar-meditation-retreat-itinerary">
            View the complete 7-day Zanskar itinerary →
          </Link>
        </div>

        {/* ── DAY 6 ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Day 6</span>
            </div>
            <h2 className="med-h2">Breaking <span>Silence</span></h2>
            <p className="med-body">
              The silence ended on the morning of day six. The facilitator rang the bell, and we were invited to speak. What surprised me most was how little I wanted to. After five days without language, words felt heavy and imprecise. The other participants reported the same thing. We spoke slowly, choosing words carefully. One woman said, "I feel like I've been cleaning a window for five days and now I can finally see through it." That was exactly right.
            </p>
            <p className="med-body">
              The group dynamic had shifted completely. Without five days of small talk, social positioning, and personality performance, we had become genuinely present to each other. The conversations that day were some of the most honest I have had in my adult life. Not because people were trying to be profound — because the pretence had been stripped out by the silence.
            </p>
            <p className="med-body">
              The afternoon was integration — journalling, a final walking meditation along the river, and a session on how to carry the practice home. The facilitator was pragmatic: "You will lose most of this within two weeks of returning to your normal life. That is not failure — it is physics. What will remain is the knowledge that this quality of awareness exists. You now know what silence can do. That knowledge doesn't disappear."
            </p>
          </div>
        </section>

        {/* ── DAY 7 ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Day 7</span>
            </div>
            <h2 className="med-h2">Leaving <span>Zanskar</span></h2>
            <p className="med-body">
              The drive out is the reverse of the drive in — Pensi La, Kargil, back to Leh — but the experience is entirely different. The same landscape that felt foreign on arrival now felt like home. Not sentimental home. Just the recognition that this place had revealed something I had been looking away from, and I was grateful.
            </p>
            <p className="med-body">
              At the airport in Leh, waiting for the flight, the sounds of phones, conversations, and airport announcements felt genuinely overwhelming. My nervous system had recalibrated to silence, and the ordinary volume of modern life was now registering as noise. This was the clearest evidence that something real had changed. Not a concept. A physiological adaptation.
            </p>
          </div>
        </section>

        {/* ── WHAT I TOOK HOME ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Reflection</span>
            </div>
            <h2 className="med-h2">What I Took <span>Home</span></h2>

            <ul className="med-story-list">
              <li>
                <strong>A daily sitting practice.</strong> Not one hour in a monastery — twenty minutes in my flat. But twenty minutes that I protect because I know what they connect to.
              </li>
              <li>
                <strong>Reduced reactivity.</strong> The gap between stimulus and response is measurably wider. Zanskar didn't create this — the five days of silence trained my nervous system to pause before reacting. That training outlasted the retreat.
              </li>
              <li>
                <strong>Proportional perspective.</strong> When I notice anxiety or urgency, something in me remembers the fossil-bearing cliffs. 500 million years of geological history. It doesn't eliminate difficulty. It sizes it appropriately.
              </li>
              <li>
                <strong>An intention to return.</strong> Zanskar revealed a capacity for depth I didn't know I had. The <Link href="/10-day-silent-retreat">10-day programme</Link> is next.
              </li>
            </ul>
          </div>
        </section>

        {/* ── WHO THIS IS FOR ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Who Is This For</span>
            </div>
            <h2 className="med-h2">Who Should Consider <span>Zanskar</span></h2>
            <p className="med-body">
              Zanskar is not for everyone, and that is part of its value. It is best suited for:
            </p>
            <ul className="med-story-list">
              <li>People with some meditation experience who want environmental depth</li>
              <li>Those who have done accessible retreats and feel ready for more</li>
              <li>Anyone seeking genuine disconnection — not just a wellness weekend</li>
              <li>Practitioners drawn to Buddhist contemplative environments</li>
            </ul>
            <p className="med-body">
              If you are a beginner, consider starting with a <Link href="/3-day-meditation-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>3-day retreat in Chakrata</Link> or a <Link href="/7-day-meditation-retreat" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>7-day guided programme</Link> before Zanskar. The progression builds on itself. Many participants follow a path from <Link href="/locations/chakrata" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Chakrata</Link> to <Link href="/locations/zanskar" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Zanskar</Link> over one to two years.
            </p>
            <p className="med-body">
              For the detailed day-by-day breakdown, see the <Link href="/7-day-zanskar-meditation-retreat-itinerary" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>7-day Zanskar retreat itinerary</Link>. For the next scheduled departure, see the <Link href="/zanskar-meditation-retreat-june-2026" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>June 2026 Zanskar programme</Link>. To learn more about the programme, see <Link href="/meditation-retreat-zanskar" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>meditation retreat in Zanskar</Link>.
            </p>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Zanskar Retreat"
          subtext="Small groups, June–September. We'll help you decide if Zanskar is the right next step."
          vertical="retreat"
          category="zanskar-story"
          sourcePath={PATH}
        />

        <FeaturedRetreat
          title="Experience Zanskar for Yourself"
          description="Small groups, June–September only. Monastery immersion at 3,500 metres with skilled facilitators and complete digital disconnection."
          links={[
            { label: 'Explore Zanskar', href: '/locations/zanskar' },
            { label: 'See upcoming dates', href: '/retreat-calendar' },
            { label: 'Find your retreat', href: '/find-your-retreat' },
          ]}
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
            { label: 'Meditation Retreat in Zanskar', href: '/meditation-retreat-zanskar' },
            { label: 'Why Zanskar Is Perfect for Retreats', href: '/why-zanskar-is-perfect-for-retreats' },
            { label: 'Best Time for a Retreat in Zanskar', href: '/best-time-for-a-retreat-in-zanskar' },
            { label: 'How to Reach Zanskar', href: '/how-to-reach-zanskar-for-a-retreat' },
            { label: '7-Day Zanskar Itinerary', href: '/7-day-zanskar-meditation-retreat-itinerary' },
          ]}
        />

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/meditation-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Meditation Retreats</span>
              </Link>
              <Link href="/locations/zanskar" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Explore Zanskar</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/best-meditation-retreats-in-india" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Best Retreats in India</span>
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
