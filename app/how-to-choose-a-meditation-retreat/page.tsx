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
import RelatedReads from '@/components/RelatedReads';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const PATH = '/how-to-choose-a-meditation-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'How to Choose a Meditation Retreat | Retreats And Treks',
    description:
      'How to choose a meditation retreat by environment, duration, group size, teaching style, location, experience level, and personal intention.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'How to Choose a Meditation Retreat — A Practical Guide',
      description: 'Environment, duration, group size, teaching style. What actually matters when choosing a meditation retreat.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('How to Choose a Meditation Retreat — A Practical Guide'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How much meditation experience do I need for a retreat?',
    answer:
      'None. Many retreats welcome complete beginners with guided instruction. What matters is not experience but willingness — willingness to sit, to be quiet, and to stay with what arises. If you are new, choose a short retreat (3 days) in a gentle environment like Chakrata. If you have a regular practice, longer and more remote options like Zanskar become accessible.',
  },
  {
    question: 'What is the ideal retreat length for a first timer?',
    answer:
      'Three days is the minimum for genuine depth. Day one is adjustment. Day two is settling. Day three is where something shifts. Five to seven days allows genuine transformation. For a first retreat, three days is a safe, meaningful commitment.',
  },
  {
    question: 'Should I choose a meditation retreat close to home or far away?',
    answer:
      'Distance matters more than you expect. Travelling far enough that your daily world feels genuinely remote creates a psychological separation that supports the retreat. A retreat 2 hours from home may feel like an extended day off. A retreat in the Himalayas — even if it takes a full day to reach — creates the clean break your nervous system needs. The journey is part of the transition.',
  },
  {
    question: 'Is group size important in a meditation retreat?',
    answer:
      'Very. Large retreats (30+) can feel anonymous — you are one of many, and individual guidance is rare. Small groups (8–12) allow the teacher to see you, adjust the practice, and offer personal support. In a small group, the shared silence creates intimacy without conversation. This is one of the most important factors most people overlook.',
  },
  {
    question: 'How do I know if a retreat is genuine vs commercial tourism?',
    answer:
      'Look for three signals: small group size (under 15), experienced teachers who practise what they teach (not wellness performers), and an environment that supports the practice rather than marketing to tourists. Avoid retreats that promise transformation in their advertising — genuine retreats describe the conditions, not the outcome.',
  },
  {
    question: 'Can I combine meditation with other activities like trekking?',
    answer:
      'Yes, walking and trekking complement meditation practice. In the Himalayas, walking is itself a form of meditation — rhythmic movement, engagement with landscape, breath awareness. Many retreats include walking practice as part of the structure. Locations like Sankri and Munsiyari are particularly suited to integrated retreat-and-trek programmes.',
  },
];

export default function HowToChooseMeditationRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
    { name: 'How to Choose a Meditation Retreat', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Choose a Meditation Retreat — A Practical Guide',
    description: 'Environment, duration, group size, teaching style. What actually matters when choosing a meditation retreat.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for green last word
  const h1Words = "How to Choose a Meditation Retreat".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="How to Choose a Meditation Retreat — A Practical Guide"
        description="Environment, duration, group size, teaching style. What actually matters when choosing a meditation retreat."
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
        .med-grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } .med-grid-4 { grid-template-columns: 1fr; } }
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

        /* ── Choose specific styles ── */
        .med-choose-card { padding: 1.5rem; }
        .med-choose-card .med-icon-box {
          width: 46px; height: 46px; border-radius: 14px;
          background: rgba(15,118,110,0.08); color: #0f766e;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-inter), sans-serif; font-size: 1.2rem; font-weight: 700;
          margin-bottom: 1rem;
        }
        .med-choose-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-choose-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-choose-location-card {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid rgba(15,118,110,0.12);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          text-decoration: none;
          display: block;
        }
        .med-choose-location-card:hover { transform: translateY(-6px); border-color: rgba(15,118,110,0.28); box-shadow: 0 22px 48px rgba(15,31,28,0.12); }
        .med-choose-location-card .med-img-wrap { position: relative; width: 100%; aspect-ratio: 16/9; overflow: hidden; }
        .med-choose-location-card .med-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .med-choose-location-card:hover .med-img-wrap img { transform: scale(1.05); }
        .med-choose-location-card .med-content-wrap { padding: 1.25rem; }
        .med-choose-location-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; color: #2B2A26; }
        .med-choose-location-card .med-body { font-size: 0.88rem; margin-bottom: 0.5rem; }
        .med-choose-location-card .med-pills { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.5rem; }
        .med-choose-location-card .med-pill { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.2rem 0.6rem; border-radius: 999px; }

        .med-choose-redflag { padding: 1.25rem; }
        .med-choose-redflag .med-icon-box {
          width: 42px; height: 42px; border-radius: 14px;
          background: rgba(200,50,50,0.08); color: #b91c1c;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-inter), sans-serif; font-size: 1.1rem; font-weight: 700;
          margin-bottom: 0.8rem;
        }
        .med-choose-redflag .med-h3 { font-size: 1rem; margin-bottom: 0.2rem; }
        .med-choose-redflag .med-body { font-size: 0.85rem; margin-bottom: 0; }

        .med-choose-cta-wrap {
          background: #f7f9f7;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          padding: 2.5rem;
          text-align: center;
          margin-top: 2rem;
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
              { name: 'How to Choose a Meditation Retreat' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Meditation Retreat Guide</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              The internet is full of meditation retreats. Choosing the right one is not about finding the best-looking website. It is about matching your nervous system, experience level, and intention to the right environment, duration, group size, and teaching approach.
            </p>
            <div className="med-hero-tags">
              <span>Environment</span>
              <span>Duration</span>
              <span>Group Size</span>
              <span>Teaching Style</span>
            </div>
            <div className="med-hero-actions">
              <Link href="#environment" className="med-cta-btn">Start with the Key Factors</Link>
              <Link href="/meditation-retreats" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>
                Explore Retreats
              </Link>
            </div>
          </div>
        </section>

        {/* ── ENVIRONMENT ── */}
        <section id="environment" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Factor 01</span>
            </div>
            <h2 className="med-h2">Environment is the <span>most important factor</span></h2>
            <p className="med-body">
              The environment where you meditate matters more than the technique. A perfect meditation method in a noisy, commercial, or visually chaotic setting will not go deep. A simple breath practice in a Himalayan forest at 2,000 metres will.
            </p>

            <div className="med-grid-4" style={{ marginTop: '1.8rem' }}>
              {[
                { icon: '∿', title: 'Acoustic quiet', copy: 'Choose a place without traffic, tourism noise, loud music, or constant movement around the retreat space.' },
                { icon: '△', title: 'Natural beauty', copy: 'Forest, mountains, rivers, and open sky support practice better than a conference-room setting dressed as wellness.' },
                { icon: '↑', title: 'Altitude', copy: 'Even moderate altitude between 1,500 and 2,500 metres can create a sense of spaciousness and natural slowing down.' },
                { icon: '○', title: 'Remoteness', copy: 'The retreat should feel far enough from daily life that your nervous system understands this is a real separation.' },
              ].map((item) => (
                <div key={item.title} className="med-card med-choose-card">
                  <div className="med-icon-box">{item.icon}</div>
                  <h3 className="med-h3">{item.title}</h3>
                  <p className="med-body">{item.copy}</p>
                </div>
              ))}
            </div>

            <div className="med-card" style={{ padding: '1.25rem', marginTop: '1.5rem', background: '#f7f9f7', borderColor: 'rgba(15,118,110,0.06)' }}>
              <p className="med-body" style={{ fontSize: '0.92rem', margin: 0 }}>
                <strong>Location guide:</strong> In our network, <Link href="/locations/chakrata" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Chakrata</Link> offers forest quiet, <Link href="/locations/zanskar" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Zanskar</Link> offers radical remoteness, and <Link href="/locations/rishikesh" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Rishikesh</Link> offers sacred tradition.
              </p>
            </div>
          </div>
        </section>

        {/* ── DURATION ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Factor 02</span>
            </div>
            <h2 className="med-h2">Duration should be <span>longer than you think</span></h2>
            <p className="med-body">
              One day is a taster. Three days gives you genuine depth. Five to seven days is where real transformation begins. Ten days or more is for serious practitioners who want sustained immersion.
            </p>

            <div className="med-grid-4" style={{ marginTop: '1.8rem' }}>
              {[
                { days: '1 day', title: 'A taster', copy: 'Useful for trying meditation in a guided setting, but usually too short for the mind to leave daily momentum behind.', best: 'Curiosity, local workshops' },
                { days: '3 days', title: 'First real reset', copy: 'Enough time for day-one adjustment, day-two settling, and day-three clarity. The safest meaningful first retreat length.', best: 'Beginners, stress relief' },
                { days: '5–7 days', title: 'Deeper immersion', copy: 'The retreat becomes less about resting and more about practice, emotional processing, silence, and genuine pattern interruption.', best: 'Burnout, emotional space' },
                { days: '10+ days', title: 'Serious practice', copy: 'Best for people ready for sustained silence, discipline, and a fuller break from digital, social, and professional identity.', best: 'Experienced practitioners' },
              ].map((item) => (
                <div key={item.days} className="med-card med-choose-card">
                  <div className="med-season-tag" style={{ marginBottom: '0.5rem' }}>{item.days}</div>
                  <h3 className="med-h3">{item.title}</h3>
                  <p className="med-body">{item.copy}</p>
                  <p className="med-body" style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}><strong>Best for:</strong> {item.best}</p>
                </div>
              ))}
            </div>

            <div className="med-card" style={{ padding: '1.25rem', marginTop: '1.5rem', background: '#102019', color: '#fff', borderColor: 'rgba(255,255,255,0.08)' }}>
              <p className="med-body" style={{ fontSize: '0.92rem', margin: 0, color: 'rgba(255,255,255,0.78)' }}>
                <strong style={{ color: '#5eead4' }}>Choosing for the first time?</strong> Start with three days if you want a safe, meaningful reset. Choose five to seven days if you already know you need deeper disconnection.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Ask for Retreat Guidance"
          subtext="Tell us your experience level and what you're looking for — we'll help match you to the right retreat."
          vertical="retreat"
          category="choose-retreat"
          sourcePath={PATH}
        />

        {/* ── GROUP SIZE + TEACHING STYLE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Factors 03–04</span>
            </div>
            <h2 className="med-h2">Choose depth of <span>support</span>, not just a retreat label</h2>
            <p className="med-body">
              A meditation retreat is not only a place and a schedule. The group size and teaching style decide whether you feel seen, guided, and safely supported when silence becomes uncomfortable.
            </p>

            <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
              <div className="med-card med-choose-card">
                <div className="med-icon-box" style={{ background: 'rgba(15,118,110,0.08)', color: '#0f766e' }}>👥</div>
                <h3 className="med-h3">Smaller is better</h3>
                <p className="med-body">Large meditation retreats can be affordable, but they often sacrifice depth. You are one of many, the teacher cannot see you clearly, and personal guidance is minimal.</p>
                <ul className="med-list" style={{ marginTop: '0.5rem' }}>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Small groups allow teachers to notice when you are struggling</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Adjustments can happen in real time instead of through generic instructions</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Shared silence feels more intimate and less anonymous</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Our retreats are capped at 12 participants for this reason</span>
                  </li>
                </ul>
              </div>

              <div className="med-card med-choose-card">
                <div className="med-icon-box" style={{ background: 'rgba(15,118,110,0.08)', color: '#0f766e' }}>🧘</div>
                <h3 className="med-h3">Practice over performance</h3>
                <p className="med-body">Choose teachers who can hold practice, not just an audience. A good retreat teacher is more like a mountain guide than a lecturer — they know the terrain and walk it with you.</p>
                <ul className="med-list" style={{ marginTop: '0.5rem' }}>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Look for sustained personal practice, not only certification</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Choose teachers comfortable with silence themselves</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Avoid retreat formats built mostly around performance or entertainment</span>
                  </li>
                  <li className="med-list-item">
                    <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                    <span className="med-list-text">Prioritize lived experience, steadiness, and grounded guidance</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="med-card" style={{ padding: '1.25rem', marginTop: '1.5rem', background: '#f7f9f7', borderColor: 'rgba(15,118,110,0.06)' }}>
              <p className="med-body" style={{ fontSize: '0.92rem', margin: 0 }}>
                <strong>Trust signal:</strong> the best retreat is not always the biggest or most polished. It is the one where the environment, facilitator, and group container are strong enough to support real practice.
              </p>
            </div>
          </div>
        </section>

        {/* ── LOCATION ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Factor 05</span>
            </div>
            <h2 className="med-h2">Match the <span>land</span> to your need</h2>
            <p className="med-body">
              A meditation retreat location is not just scenery. The land changes the pace, intensity, safety, and emotional tone of the retreat. Choose the place that supports what you actually need.
            </p>

            <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
              {[
                { href: '/locations/chakrata', img: '/Images/location/chakrata.webp', badge: 'Gentle first experience', title: 'Chakrata', copy: 'Forest quiet, accessibility, and a nurturing Himalayan pace make Chakrata the safest first choice for many beginners.', pills: ['Forest quiet', 'Accessible', 'Beginner friendly'] },
                { href: '/locations/zanskar', img: '/Images/location/zanskar.webp', badge: 'Deep immersion', title: 'Zanskar', copy: 'Radical remoteness and monastery lineage make Zanskar more suitable for serious depth than casual reset.', pills: ['Remote', 'Monastery lineage', 'Serious silence'] },
                { href: '/locations/rishikesh', img: '/Images/location/rishikesh.webp', badge: 'Yogic tradition', title: 'Rishikesh', copy: 'Sacred geography, the Ganges, and living practice traditions make Rishikesh ideal for yoga-linked meditation.', pills: ['Sacred geography', 'Ganges energy', 'Tradition'] },
                { href: '/locations/munsiyari', img: '/Images/location/munsiyari.webp', badge: 'Spacious stillness', title: 'Munsiyari', copy: 'Alpine openness and Panchachuli views create awe, distance, and a spacious container for deeper stillness.', pills: ['Alpine openness', 'Peak views', 'Solitude'] },
              ].map((loc) => (
                <Link key={loc.title} href={loc.href} className="med-choose-location-card">
                  <div className="med-img-wrap">
                    <img src={loc.img} alt={`${loc.title} meditation retreat setting`} />
                  </div>
                  <div className="med-content-wrap">
                    <span className="med-season-tag" style={{ marginBottom: '0.3rem' }}>{loc.badge}</span>
                    <h3 className="med-h3">{loc.title}</h3>
                    <p className="med-body">{loc.copy}</p>
                    <div className="med-pills">
                      {loc.pills.map((pill) => (
                        <span key={pill} className="med-pill">{pill}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── RED FLAGS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Red Flags</span>
            </div>
            <h2 className="med-h2">What to <span>avoid</span> when choosing a meditation retreat</h2>
            <p className="med-body">
              A genuine retreat describes the conditions that support practice. Be careful when a retreat sells certainty, spectacle, or comfort without enough silence, guidance, and space.
            </p>

            <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
              {[
                { title: 'Guaranteed outcomes', copy: 'Avoid retreats promising specific results like guaranteed enlightenment, instant transformation, or permanent peace.' },
                { title: 'Very large groups', copy: 'If personal attention is impossible, the retreat may feel anonymous when support is needed most.' },
                { title: 'Urban noise', copy: 'A city hotel or noisy tourist area dressed as a retreat can defeat the purpose of meditation practice.' },
                { title: 'Overpacked schedules', copy: 'Too many workshops, activities, and talks can leave no real space for stillness or integration.' },
                { title: 'No lived practice', copy: 'Ask how teachers live and practise, not just what they advertise or what certifications they list.' },
              ].map((item) => (
                <div key={item.title} className="med-card med-choose-redflag">
                  <div className="med-icon-box">!</div>
                  <h3 className="med-h3">{item.title}</h3>
                  <p className="med-body">{item.copy}</p>
                </div>
              ))}
            </div>

            <div className="med-choose-cta-wrap">
              <h3 className="med-h3" style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Not sure where to start?</h3>
              <p className="med-body" style={{ marginBottom: '1.25rem' }}>
                Share your experience level, timeline, comfort with silence, and what you are seeking. We can help match you to the right environment, duration, and approach.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/meditation-retreats" className="med-cta-btn">Explore Meditation Retreats</Link>
                <Link href="/contact" className="med-cta-outline">Ask for Help Choosing</Link>
              </div>
            </div>
          </div>
        </section>

        <RelatedReads
          links={[
            { label: 'Meditation Retreats in the Himalayas', href: '/meditation-retreats' },
            { label: 'Silent Retreats — What to Expect', href: '/silent-retreats' },
            { label: 'What Happens at a Silent Retreat?', href: '/what-happens-at-a-silent-retreat' },
            { label: 'Best Meditation Retreats in India', href: '/best-meditation-retreats-in-india' },
            { label: 'Retreat vs Vacation — Key Differences', href: '/retreat-vs-vacation' },
          ]}
        />

        {/* ── FAQ ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Common Questions</span>
            </div>
            <h2 className="med-h2">Choosing a retreat <span>with confidence</span></h2>
            <p className="med-body">
              Answers to the questions people usually ask before choosing a meditation retreat: experience level, duration, distance, group size, retreat authenticity, and combining meditation with walking or trekking.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
            </div>
          </div>
        </section>

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/meditation-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Meditation Retreats</span>
              </Link>
              <Link href="/how-long-should-a-meditation-retreat-be" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>How Long Should It Be?</span>
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
