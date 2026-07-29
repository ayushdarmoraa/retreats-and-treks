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

const PATH = '/self-discovery-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Self-Discovery Retreat | Retreats And Treks',
    description:
      'Self-discovery retreat in the Himalayas with small groups, silence, reflection, and immersive settings in Chakrata, Zanskar, and Rishikesh.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Self-Discovery Retreat in the Himalayas',
      description: 'Who you are without the noise. Himalayan retreats for genuine self-encounter.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Self-Discovery Retreat in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What does a self-discovery retreat actually involve?',
    answer:
      'Meditation, silence, journalling, guided inquiry, and extended time in nature — but the real intervention is removal. We remove the familiar: screens, schedules, social roles, productivity pressure, and the default narratives you tell yourself. What remains in that space is what the retreat is about.',
  },
  {
    question: 'Do I need to know what I am looking for?',
    answer:
      'No. In fact, not knowing is a better starting position than a fixed agenda. A self-discovery retreat works by creating the conditions for insight to arise naturally — not by pursuing a specific answer. Come with curiosity rather than a checklist.',
  },
  {
    question: 'Is this a therapy retreat?',
    answer:
      'No. Self-discovery retreats are not therapeutic interventions. They are contemplative environments where you have sustained access to your own inner life. If therapeutic material surfaces, we hold it — but we are not therapists. If you are seeking depth and self-knowledge, this is the right space.',
  },
  {
    question: 'How long should a self-discovery retreat be?',
    answer:
      'Three days provides a genuine opening. Seven days allows depth. Ten days can be transformative. If you have the time, 7 days is the sweet spot — enough depth for real discovery without the endurance challenge of 10.',
  },
];

const LOCATIONS = [
  {
    name: 'Chakrata',
    id: 'silent-retreat-chakrata',
    tagline: 'Gentle Unveiling',
    description: 'Gentle forest silence for first encounters with the self.',
    image: '/Images/location/chakrata.webp',
  },
  {
    name: 'Zanskar',
    id: 'meditation-retreat-zanskar',
    tagline: 'Radical Depth',
    description: 'Radical separation for deep self-inquiry at 3,500m.',
    image: '/Images/location/zanskar.webp',
  },
  {
    name: 'Rishikesh',
    id: 'spiritual-retreat-rishikesh',
    tagline: 'Tradition-Supported',
    description: 'Tradition-supported self-inquiry guided by centuries of practice.',
    image: '/Images/location/rishikesh.webp',
  },
  {
    name: 'Munsiyari',
    id: 'healing-retreat-munsiyari',
    tagline: 'Expansive Perspective',
    description: 'Self-discovery through the vast perspective of the Panchachuli range.',
    image: '/Images/location/munsiyari.webp',
  },
];

export default function SelfDiscoveryRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Self-Discovery Retreat', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = generateBlogPostingSchema({
    title: 'Self-Discovery Retreat in the Himalayas — Who You Are Without the Noise',
    description:
      'Self-discovery retreat in the Himalayas with small groups, silence, reflection, and immersive settings in Chakrata, Zanskar, and Rishikesh.',
    publishedAt: '2026-03-06',
    lastUpdated: '2026-05-09',
    url: canonicalUrl,
  });

  // Split heading for green last word
  const h1Words = "Self-Discovery Retreat".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Self-Discovery Retreat in the Himalayas — Who You Are Without the Noise"
        description="Self-discovery retreat in the Himalayas with small groups, silence, reflection, and immersive settings in Chakrata, Zanskar, and Rishikesh."
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

        .med-section-dark .med-eyebrow-text { color: rgba(255,255,255,0.6); }
        .med-section-dark .med-eyebrow-line { background: rgba(255,255,255,0.3); }
        .med-section-dark .med-h2 { color: #fff; }
        .med-section-dark .med-h2 span { color: #5eead4; }
        .med-section-dark .med-body { color: rgba(255,255,255,0.7); }
        .med-section-dark .med-card { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.08); }
        .med-section-dark .med-card .med-h3 { color: #fff; }
        .med-section-dark .med-card .med-body { color: rgba(255,255,255,0.7); }

        /* ── Page specific styles ── */
        .med-self-card { padding: 1.5rem; background: #fff; border: 1px solid rgba(15,118,110,0.06); border-radius: 12px; }
        .med-self-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-self-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-self-timeline {
          position: relative;
          padding-left: 2rem;
          margin: 2rem 0;
        }
        .med-self-timeline::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 8px;
          width: 2px;
          background: rgba(15,118,110,0.2);
        }
        .med-self-timeline-item {
          position: relative;
          margin-bottom: 2rem;
        }
        .med-self-timeline-item:last-child { margin-bottom: 0; }
        .med-self-timeline-item::before {
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
        .med-self-timeline-item .med-h3 { font-size: 1.05rem; margin-bottom: 0.2rem; }
        .med-self-timeline-item .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-self-loc-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 820px) { .med-self-loc-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 480px) { .med-self-loc-grid { grid-template-columns: 1fr; } }

        .med-self-loc-card {
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
        .med-self-loc-card:hover { transform: translateY(-6px); box-shadow: 0 22px 48px rgba(0,0,0,0.3); }
        .med-self-loc-card .med-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .med-self-loc-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
          z-index: 1;
        }
        .med-self-loc-content {
          position: relative;
          z-index: 2;
          padding: 1.5rem;
          width: 100%;
          color: #fff;
        }
        .med-self-loc-content .med-tag {
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
        .med-self-loc-content .med-h3 { color: #fff; font-size: 1.2rem; margin-bottom: 0.3rem; }
        .med-self-loc-content .med-body { color: rgba(255,255,255,0.8); font-size: 0.88rem; margin-bottom: 0; }

        .med-self-duration-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-self-duration-grid { grid-template-columns: 1fr; } }

        .med-self-cta-wrap {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 18px;
          padding: 2.5rem;
          text-align: center;
        }
        .med-self-cta-wrap .med-h3 { color: #166534; }
        .med-self-cta-wrap .med-body { color: #15803d; }

        .med-self-footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1.5rem;
          justify-content: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(15,118,110,0.08);
        }
        .med-self-footer-links a {
          color: #0f766e;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
        }
        .med-self-footer-links a:hover { text-decoration: underline; }
        .med-self-footer-links .divider { color: #d1d5db; }

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
              { name: 'Self-Discovery Retreat' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Find Who You Really Are</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              You are not lost. You are buried under roles, expectations, habits, devices, obligations, and the noise of a life that has been designed by everyone except you.
            </p>
            <div className="med-hero-tags">
              <span>Subtraction Over Addition</span>
              <span>Inner Work</span>
              <span>3–10 Days</span>
              <span>Himalayan Silence</span>
            </div>
            <div className="med-hero-actions">
              <Link href="#plan" className="med-cta-btn">Start the Conversation</Link>
              <a href="#who" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Who This Is For</a>
            </div>
          </div>
        </section>

        {/* ── THE PHILOSOPHY ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner" style={{ textAlign: 'center' }}>
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Philosophy</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2">Encountering the <span>Self</span></h2>
            <p className="med-body" style={{ fontSize: '1.05rem' }}>
              A self-discovery retreat does not add anything. It subtracts. It removes the familiar structures and leaves you alone with the question that has been waiting beneath everything: <strong>who are you when there is nothing to perform, nothing to produce, and nowhere to be?</strong>
            </p>
            <p className="med-body" style={{ fontSize: '1.05rem' }}>
              The Himalayas have been holding that question for people for thousands of years. We provide the environment, the silence, and the container for that discovery.
            </p>
          </div>
        </section>

        {/* ── WHO THIS IS FOR ── */}
        <section id="who" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Is This For You</span>
            </div>
            <h2 className="med-h2">Who seeks <span>Self-Discovery</span></h2>

            <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
              {[
                'People at a crossroads — career change, relationship shift, midlife reckoning',
                'Those who have achieved what they set out to achieve and found it was not enough',
                'Anyone whose daily life feels functional but hollow',
                'People seeking to reconnect with values, creativity, or purpose they have lost touch with',
                'Those drawn to inner work but not to religious frameworks'
              ].map((item, idx) => (
                <div key={idx} className="med-card med-self-card">
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
          
          label="Start the Conversation"
          subtext="No obligation. We'll tell you honestly whether a retreat is the right next step."
          vertical="retreat"
          category="self-discovery"
          sourcePath={PATH}
        />

        {/* ── THE STRUCTURE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Process</span>
            </div>
            <h2 className="med-h2">How it <span>works</span></h2>
            <p className="med-body">
              A self-discovery retreat is not a workshop with modules and outcomes. It is an environment designed for encounter. No goals. No performance metrics. No breakthroughs required.
            </p>

            <div className="med-self-timeline">
              {[
                { title: 'Meditation & Stillness', desc: 'Sustained periods of silence to listen to the narratives running beneath your conscious thoughts.' },
                { title: 'Walking Inquiry', desc: 'Moving through the landscape. Physical movement helps to untangle deep-seated emotional knots.' },
                { title: 'Journalling & Surfacing', desc: 'Writing without censorship. You will be surprised by what your own pen tells you when no one is watching.' },
                { title: 'Resting the System', desc: 'Sometimes discovery simply looks like sleeping for 12 hours. We honor the body\'s need for profound, unapologetic rest.' }
              ].map((step, idx) => (
                <div key={idx} className="med-self-timeline-item">
                  <h3 className="med-h3">{step.title}</h3>
                  <p className="med-body">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

              {/* ── LOCATIONS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Himalayan Settings</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>Environments for <span>Discovery</span></h2>
            <p className="med-body" style={{ textAlign: 'center', maxWidth: '36rem', margin: '0 auto 2rem' }}>
              The container matters. Pick an environment that safely holds the exploration you are undertaking.
            </p>

            <div className="med-self-loc-grid">
              {LOCATIONS.map((loc) => (
                <Link key={loc.id} href={`/${loc.id}`} className="med-self-loc-card" style={{ border: '1px solid rgba(15,118,110,0.12)' }}>
                  <img src={loc.image} alt={loc.name} className="med-img" />
                  <div className="med-self-loc-content">
                    <span className="med-tag" style={{ color: '#0f766e', background: 'rgba(15,118,110,0.1)' }}>{loc.tagline}</span>
                    <h3 className="med-h3" style={{ color: '#fff' }}>{loc.name}</h3>
                    <p className="med-body" style={{ color: 'rgba(255,255,255,0.8)' }}>{loc.description}</p>
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
                Select a duration based on your comfort with silence and capacity to disconnect.
              </p>
            </div>

            <div className="med-self-duration-grid">
              <Link href="/3-day-meditation-retreat" className="med-card med-self-card" style={{ textDecoration: 'none', textAlign: 'center' }}>
                <h3 className="med-h3">3-Day Retreat</h3>
                <p className="med-body">Enough time to open the door and introduce your mind to the concept of true silence.</p>
              </Link>
              <Link href="/7-day-meditation-retreat" className="med-card med-self-card" style={{ textDecoration: 'none', textAlign: 'center' }}>
                <h3 className="med-h3">7-Day Retreat</h3>
                <p className="med-body">The sweet spot. Enough depth for genuine discovery without the endurance challenge of a 10-day.</p>
              </Link>
              <Link href="/10-day-silent-retreat" className="med-card med-self-card" style={{ textDecoration: 'none', textAlign: 'center' }}>
                <h3 className="med-h3">10-Day Silent Retreat</h3>
                <p className="med-body">Sustained immersion for those ready to confront the deepest layers of self.</p>
              </Link>
            </div>

            <div className="med-self-cta-wrap" style={{ marginTop: '2rem' }}>
              <h3 className="med-h3" style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Choose Your Path</h3>
              <p className="med-body" style={{ marginBottom: '1.25rem' }}>
                Not sure which format, location, or duration will serve you best right now? Let us help you navigate.
              </p>
              <PrimaryCTA
                label="Talk to Us"
                subtext="Clear, honest recommendations based on your needs."
                vertical="retreat"
                category="self-discovery"
                sourcePath={PATH}
              />
            </div>
          </div>
        </section>

        <RelatedReads
          links={[
            { label: 'Spiritual Retreats', href: '/spiritual-retreats' },
            { label: 'Life Reset Retreat', href: '/life-reset-retreat' },
            { label: 'Personal Growth Retreat', href: '/personal-growth-retreat' },
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

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/spiritual-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Spiritual Retreats</span>
              </Link>
              <Link href="/life-reset-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Life Reset</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/personal-growth-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Personal Growth</span>
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
