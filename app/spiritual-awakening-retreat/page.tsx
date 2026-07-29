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

const PATH = '/spiritual-awakening-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Spiritual Awakening Retreat | Retreats And Treks',
    description:
      'Spiritual awakening retreat in the Himalayas with sustained meditation, silence, and contemplative practice in Zanskar, Rishikesh, and Chakrata.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Spiritual Awakening Retreat in the Himalayas',
      description: 'Sustained practice in environments where awakening has been happening for millennia.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Spiritual Awakening Retreat in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Can a retreat cause spiritual awakening?',
    answer:
      'A retreat cannot guarantee awakening any more than watering a plant guarantees flowering. But it can create the conditions — sustained silence, removed distractions, supported practice, and an environment that has held this work for centuries. Awakening, if it comes, arrives on its own schedule. The retreat simply makes you available for it.',
  },
  {
    question: 'Do I need to follow a specific spiritual tradition?',
    answer:
      'No. Our retreats draw from contemplative practices across traditions — Buddhist insight meditation, Hindu yogic practices, and non-denominational mindfulness — without requiring adherence to any tradition. The inner territory is universal. The techniques are tools, not dogma.',
  },
  {
    question: 'What is the difference between a spiritual retreat and an awakening retreat?',
    answer:
      'A spiritual retreat supports existing practice and provides depth. A spiritual awakening retreat is specifically oriented toward the dissolution of habitual identity structures — the fixed sense of "I". This requires longer duration, deeper silence, and greater willingness to sit with discomfort.',
  },
  {
    question: 'How long should a spiritual awakening retreat be?',
    answer:
      'Seven days minimum. Ten days is more realistic. The first 3–5 days are typically spent dismantling the noise layer. The deeper work happens after that — and it requires sustained, uninterrupted practice.',
  },
];

const LOCATIONS = [
  {
    name: 'Zanskar',
    id: 'meditation-retreat-zanskar',
    tagline: 'Living Lineage',
    description: 'Monastery culture stretching back over a thousand years. Deep high-altitude silence.',
    image: '/Images/location/zanskar.webp',
  },
  {
    name: 'Rishikesh',
    id: 'spiritual-retreat-rishikesh',
    tagline: 'The Sacred Ganges',
    description: 'The accumulated spiritual weight of India\'s contemplative capital. Tradition and lineage.',
    image: '/Images/location/rishikesh.webp',
  },
  {
    name: 'Chakrata',
    id: 'silent-retreat-chakrata',
    tagline: 'Nature as Teacher',
    description: 'For those who encounter the sacred through nature rather than tradition. Dense forest isolation.',
    image: '/Images/location/chakrata.webp',
  },
];

export default function SpiritualAwakeningRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Spiritual Awakening Retreat', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = generateBlogPostingSchema({
    title: 'Spiritual Awakening Retreat — Beyond the Self You Know',
    description:
      'Spiritual awakening retreat in the Himalayas with sustained meditation, silence, contemplative practice, and sacred settings in Zanskar and Rishikesh.',
    publishedAt: '2026-03-06',
    lastUpdated: '2026-05-09',
    url: canonicalUrl,
  });

  // Split heading for green last word
  const h1Words = "Spiritual Awakening Retreat".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Spiritual Awakening Retreat — Beyond the Self You Know"
        description="Spiritual awakening retreat in the Himalayas with sustained meditation, silence, contemplative practice, and sacred settings in Zanskar and Rishikesh."
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

        /* ── Page specific styles ── */
        .med-spiritual-card { padding: 1.5rem; background: #fff; border: 1px solid rgba(15,118,110,0.06); border-radius: 12px; }
        .med-spiritual-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-spiritual-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-spiritual-timeline {
          position: relative;
          padding-left: 2rem;
          margin: 2rem 0;
        }
        .med-spiritual-timeline::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 8px;
          width: 2px;
          background: rgba(15,118,110,0.2);
        }
        .med-spiritual-timeline-item {
          position: relative;
          margin-bottom: 2rem;
        }
        .med-spiritual-timeline-item:last-child { margin-bottom: 0; }
        .med-spiritual-timeline-item::before {
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
        .med-spiritual-timeline-item .med-h3 { font-size: 1.05rem; margin-bottom: 0.2rem; }
        .med-spiritual-timeline-item .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-spiritual-loc-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 820px) { .med-spiritual-loc-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 480px) { .med-spiritual-loc-grid { grid-template-columns: 1fr; } }

        .med-spiritual-loc-card {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          min-height: 320px;
          display: flex;
          align-items: flex-end;
          text-decoration: none;
          border: 1px solid rgba(15,118,110,0.12);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
        }
        .med-spiritual-loc-card:hover { transform: translateY(-6px); box-shadow: 0 22px 48px rgba(15,31,28,0.12); }
        .med-spiritual-loc-card .med-img { position: absolute; inset: 0; width: 100%; height: 100%; objectFit: cover; }
        .med-spiritual-loc-card .med-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%); z-index: 1; }
        .med-spiritual-loc-card .med-content { position: relative; z-index: 2; padding: 1.5rem; width: 100%; color: #fff; }
        .med-spiritual-loc-card .med-content .med-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #5eead4; background: rgba(15,118,110,0.3); padding: 0.2rem 0.7rem; border-radius: 999px; margin-bottom: 0.5rem; }
        .med-spiritual-loc-card .med-content .med-h3 { color: #fff; font-size: 1.2rem; margin-bottom: 0.3rem; }
        .med-spiritual-loc-card .med-content .med-body { color: rgba(255,255,255,0.8); font-size: 0.88rem; margin-bottom: 0; }

        .med-spiritual-duration-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-spiritual-duration-grid { grid-template-columns: 1fr; } }

        .med-spiritual-cta-wrap {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 18px;
          padding: 2.5rem;
          text-align: center;
        }
        .med-spiritual-cta-wrap .med-h3 { color: #166534; }
        .med-spiritual-cta-wrap .med-body { color: #15803d; }

        .med-spiritual-footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1.5rem;
          justify-content: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(15,118,110,0.08);
        }
        .med-spiritual-footer-links a {
          color: #0f766e;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
        }
        .med-spiritual-footer-links a:hover { text-decoration: underline; }
        .med-spiritual-footer-links .divider { color: #d1d5db; }

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
/* ── Location Cards ── */
.med-spiritual-loc-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.4rem;
}
@media (max-width: 820px) {
  .med-spiritual-loc-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 480px) {
  .med-spiritual-loc-grid { grid-template-columns: 1fr; }
}

.med-spiritual-loc-card {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  min-height: 320px;
  display: flex;
  align-items: flex-end;
  text-decoration: none;
  border: 1px solid rgba(15,118,110,0.12);
  transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
}

.med-spiritual-loc-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 48px rgba(15,31,28,0.12);
}

.med-spiritual-loc-card .med-img-wrap {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.med-spiritual-loc-card .med-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.med-spiritual-loc-card:hover .med-img {
  transform: scale(1.08);
}

.med-spiritual-loc-card .med-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
  z-index: 1;
}

.med-spiritual-loc-card .med-content {
  position: relative;
  z-index: 2;
  padding: 1.5rem;
  width: 100%;
  color: #fff;
}

.med-spiritual-loc-card .med-content .med-tag {
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

.med-spiritual-loc-card .med-content .med-h3 {
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
}

.med-spiritual-loc-card .med-content .med-body {
  color: rgba(255,255,255,0.8);
  font-size: 0.88rem;
  margin-bottom: 0;
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
              { name: 'Spiritual Awakening Retreat' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Beyond the Known Self</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Spiritual awakening is not what the market sells. It is the profound recognition that the person you take yourself to be — with all their stories, fears, and ambitions — is merely a construction.
            </p>
            <div className="med-hero-tags">
              <span>7–10 Days</span>
              <span>Monastery Settings</span>
              <span>Deep Silence</span>
              <span>Contemplative Practice</span>
            </div>
            <div className="med-hero-actions">
              <Link href="#plan" className="med-cta-btn">Inquire About an Awakening Retreat</Link>
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
            <h2 className="med-h2">Beyond <span>Self-Improvement</span></h2>
            <p className="med-body" style={{ fontSize: '1.05rem' }}>
              Awakening is not bliss on demand. It is not cosmic visions on schedule. And it is certainly not enlightenment as a credential. Beneath the constructed self, something else has always been present.
            </p>
            <p className="med-body" style={{ fontSize: '1.05rem' }}>
              The Himalayas have been the geography of this recognition for millennia because the sheer scale, ruggedness, and silence of these mountains teach impermanence in ways that no discourse or book can.
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
            <h2 className="med-h2">Who seeks <span>Awakening</span></h2>

            <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
              {[
                'Experienced meditators seeking to deepen beyond technique into direct seeing',
                'People who have had glimpses of something beyond the personal self and want sustained access',
                'Those at a point where questions of identity, purpose, and meaning have become deeply urgent',
                'Practitioners from any tradition who want an intensive silent container for practice',
                'Anyone who has reached the limits of self-improvement and suspects something else is possible'
              ].map((item, idx) => (
                <div key={idx} className="med-card med-spiritual-card">
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
          
          label="Inquire About an Awakening Retreat"
          subtext="Clear, honest guidance on retreat readiness and program fit."
          vertical="retreat"
          category="spiritual-awakening"
          sourcePath={PATH}
        />

        {/* ── THE STRUCTURE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Process</span>
            </div>
            <h2 className="med-h2">Cultivating <span>Awareness</span></h2>
            <p className="med-body">
              Awakening cannot be engineered, but the conditions for it can be cultivated. Our retreats focus entirely on creating an unbreakable container of practice, intention, and silence.
            </p>

            <div className="med-spiritual-timeline">
              {[
                { title: 'Dismantling the Narrative', desc: 'The first days are focused entirely on observing the habitual stories of the ego. This phase requires confronting deep discomfort.' },
                { title: 'Sustained Vigilance', desc: 'Extended practice hours. You will sit, walk, and breathe with unbroken attention, leaning into the emptiness.' },
                { title: 'Direct Transmission & Inquiry', desc: 'Working with guides who understand the territory. Dharma talks and direct self-inquiry (Vichara) to cut through illusion.' },
                { title: 'Surrender', desc: 'The point where effort exhausts itself and genuine awakening sometimes arrives. You stop trying to attain, and simply remain.' }
              ].map((step, idx) => (
                <div key={idx} className="med-spiritual-timeline-item">
                  <h3 className="med-h3">{step.title}</h3>
                  <p className="med-body">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

               {/* ── LOCATIONS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Himalayan Settings</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>Environments that hold <span>Truth</span></h2>
            <p className="med-body" style={{ textAlign: 'center', maxWidth: '36rem', margin: '0 auto 2rem' }}>
              Intensive spiritual inquiry requires an unshakable container. These locations have been holding seekers for centuries.
            </p>

            <div className="med-spiritual-loc-grid">
              {LOCATIONS.map((loc) => (
                <Link key={loc.id} href={`/${loc.id}`} className="med-spiritual-loc-card">
                  <div className="med-img-wrap">
                    <img src={loc.image} alt={loc.name} className="med-img" />
                  </div>
                  <div className="med-overlay" />
                  <div className="med-content">
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
                Awakening work requires sustained, unbroken duration. The mind needs days, not hours, to settle past its habitual patterns.
              </p>
            </div>

            <div className="med-spiritual-duration-grid">
              <Link href="/7-day-meditation-retreat" className="med-card med-spiritual-card" style={{ textDecoration: 'none', textAlign: 'center' }}>
                <h3 className="med-h3">7-Day Retreat</h3>
                <p className="med-body">The absolute minimum requested time for genuine spiritual immersion and systemic unbinding.</p>
              </Link>
              <Link href="/10-day-silent-retreat" className="med-card med-spiritual-card" style={{ textDecoration: 'none', textAlign: 'center' }}>
                <h3 className="med-h3">10-Day Silent Retreat</h3>
                <p className="med-body">The traditional, rigorous container required for intensive spiritual practice and paradigm collapse.</p>
              </Link>
            </div>

            <div className="med-spiritual-cta-wrap" style={{ marginTop: '2rem' }}>
              <h3 className="med-h3" style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Are you ready for this path?</h3>
              <p className="med-body" style={{ marginBottom: '1.25rem' }}>
                This retreat demands readiness. Describe where you are, and we will tell you honestly if this is the right next step.
              </p>
              <PrimaryCTA
                label="Talk to Us"
                subtext="Clear, honest guidance on retreat readiness and program fit."
                vertical="retreat"
                category="spiritual-awakening"
                sourcePath={PATH}
              />
            </div>
          </div>
        </section>

        <RelatedReads
          links={[
            { label: 'Spiritual Retreats', href: '/spiritual-retreats' },
            { label: 'Self-Discovery Retreat', href: '/self-discovery-retreat' },
            { label: 'Silent Retreats', href: '/silent-retreats' },
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
              <Link href="/self-discovery-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Self-Discovery</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/silent-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Silent Retreats</span>
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
