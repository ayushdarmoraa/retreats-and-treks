import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { getExperiencePage } from '@/config/experiencePages';
import { getReviewSchemasForPage } from '@/lib/reviewsSchema';
import { getReviewsForSlug } from '@/content/reviews';
import { getUpcomingEvents } from '@/config/retreatProgramEvents';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import ReviewCard from '@/components/reviews/ReviewCard';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const PAGE = getExperiencePage('silent-retreats')!;
const PATH = '/silent-retreats';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return {
    title: 'Silent Retreats in the Himalayas | Retreats And Treks',
    description:
      'Silent retreats in Chakrata, Zanskar, and Munsiyari. No phones, no small talk, small groups, and 3–10 day Himalayan silence programs.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Silent Retreats in the Himalayas — Extended Silence & Deep Rest',
      description:
        'Extended silent retreats where the landscape holds the silence, not just the rules. Small groups, deep rest, experienced guidance.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Silent Retreats in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What does "noble silence" mean?',
    answer:
      'Noble silence means no conversation, no eye contact intended to communicate, no devices, no reading (except personal journalling). The external world of language and social performance is suspended. This is not punishment — it is liberation.',
  },
  {
    question: 'What if I find the silence too difficult?',
    answer:
      'The first 12–24 hours are often uncomfortable. That is expected. By the second day, something begins to change. If genuine distress arises, facilitators are available for brief, supportive check-ins. You are never truly alone — just quiet.',
  },
  {
    question: 'Is this the same as a Vipassana retreat?',
    answer:
      'Not exactly. Vipassana follows a fixed 10-day format with a single technique. Our Himalayan silent retreats offer more flexibility — multiple techniques, smaller groups (max 12 vs 50–100), nature-integrated practice, and personalised guidance. Both are powerful approaches to silence.',
  },
  {
    question: 'Do I need meditation experience before a silent retreat?',
    answer:
      'For Chakrata, no prior experience is required — the environment is gentle and the guidance supportive. For Zanskar, some meditation experience is recommended due to the altitude and remoteness. First-timers often start with a 3-day silent retreat in Chakrata.',
  },
  {
    question: 'What does a day look like during a silent retreat?',
    answer:
      'Multiple daily meditation sittings, walking meditation in nature, simple meals in silence, rest periods, and gentle movement. The schedule provides structure so you do not need to make decisions. By day three, the body knows the rhythm without checking.',
  },
  {
    question: 'How do I prepare mentally for extended silence?',
    answer:
      'Reduce screen time 3–5 days before. Let go of expectations. Inform people you\'ll be unreachable. Bring a journal. Trust the structure — sit when others sit, eat when the bell rings. The container holds you so you don\'t need to hold yourself.',
  },
];

const SILENCE_TYPES = [
  {
    title: 'Nature-Based Silence',
    description: 'Integrates silent meditation with walking in natural environments. The landscape becomes part of the practice. Our primary format.',
    bestFor: 'Most participants, first-timers, nature lovers',
  },
  {
    title: 'Full Noble Silence',
    description: 'No talking, no eye contact, no devices, no reading. Complete withdrawal from linguistic communication. The deepest format.',
    bestFor: 'Experienced practitioners, deep seekers',
  },
  {
    title: 'Partial Silence',
    description: 'Quiet during practice and mornings, limited conversation during meals or sharing circles. A gentler entry point.',
    bestFor: 'First-time retreatants, those wary of complete silence',
  },
];

const LOCATIONS = [
  {
    name: 'Chakrata',
    id: 'chakrata',
    tagline: 'Where Silence Lives Naturally',
    description: 'Dense Himalayan forest creates an acoustic environment where silence is not practised — it is the default. No tourist noise, no temple bells, no commerce. Just birdsong, wind, and breath.',
    bestFor: 'First silent retreats, accessible depth',
    altitude: '2,000m',
    image: '/Images/location/chakrata.webp',
  },
  {
    name: 'Zanskar',
    id: 'zanskar',
    tagline: 'Geological Silence',
    description: 'A valley sealed by mountains, 230 km from the nearest city, where the rock formations are 500 million years old. This is silence with weight — not just auditory, but geological.',
    bestFor: 'Deep practitioners, radical disconnection',
    altitude: '3,500m',
    image: '/Images/location/zanskar.webp',
  },
  {
    name: 'Munsiyari',
    id: 'munsiyari',
    tagline: 'Alpine Silence',
    description: 'High-altitude meadows facing the Panchachuli peaks. The silence here is expansive — open sky, vast views, thin air. Stillness with an element of spaciousness.',
    bestFor: 'Spacious stillness, physical openness',
    altitude: '2,200m',
    image: '/Images/location/munsiyari.webp',
  },
];

export default function SilentRetreatsPage() {
  const { reviewSchemas, aggregateSchema } = getReviewSchemasForPage(PAGE);
  const allReviews = PAGE.retreatServiceSlugs.flatMap((slug) => getReviewsForSlug(slug));
  const topReviews = allReviews.filter((r) => r.ratingValue >= 4).slice(0, 3);
  const upcomingEvents = getUpcomingEvents()
    .filter((e) => e.experienceSlug === PAGE.slug)
    .slice(0, 3);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Silent Retreats', url: buildCanonicalUrl(PATH) },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  // Split heading for green last word
  const h1Words = "Silent Retreats in the Himalayas".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Silent Retreats in the Himalayas — Extended Silence & Deep Rest"
        description="Extended silent retreats where the landscape holds the silence, not just the rules. Small groups, deep rest, experienced guidance."
        path={PATH}
      />

      <style>{`
      ./* ── Location Card Hover Effects ── */
.med-loc-card-hover:hover {
  transform: translateY(-8px);
  border-color: rgba(15,118,110,0.28);
  box-shadow: 0 24px 56px rgba(15,31,28,0.14);
}

.med-loc-card-hover:hover .med-loc-card-img {
  transform: scale(1.08);
}

/* Mobile responsive */
@media (max-width: 820px) {
  .med-shell .med-outer > div:last-of-type {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 540px) {
  .med-shell .med-outer > div:last-of-type {
    grid-template-columns: 1fr !important;
  }
}
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
        .med-silent-strip { display: flex; justify-content: center; gap: 2.5rem; flex-wrap: wrap; }
        .med-silent-item { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }

        .med-silent-type-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 720px) { .med-silent-type-grid { grid-template-columns: 1fr; } }
        .med-silent-type-card { padding: 2rem 1.75rem; }
        .med-silent-type-card .med-h3 { font-size: 1rem; margin-bottom: 0.3rem; }
        .med-silent-type-card .med-body { font-size: 0.85rem; margin-bottom: 0; }
        .med-silent-type-card .med-best { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; color: #0f766e; font-weight: 500; margin-top: auto; }

        .med-silent-loc-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
        @media (max-width: 820px) { .med-silent-loc-grid { grid-template-columns: 1fr; } }
        .med-silent-loc-card {
          position: relative; border-radius: 18px; overflow: hidden;
          text-decoration: none; color: #fff; display: flex; align-items: flex-end;
          min-height: 340px; transition: transform 0.35s, box-shadow 0.35s;
          border: 1px solid rgba(15,118,110,0.12);
          background: #0a1f1c;
        }
        .med-silent-loc-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.15); }
        .med-silent-loc-card .med-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .med-silent-loc-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%); z-index: 1; }
        .med-silent-loc-card .med-content { position: relative; z-index: 2; padding: 1.75rem; width: 100%; }
        .med-silent-loc-card .med-content .med-alt { font-family: var(--font-inter), sans-serif; font-size: 0.55rem; letter-spacing: 0.2em; text-transform: uppercase; color: #5eead4; font-weight: 600; display: block; margin-bottom: 0.3rem; }
        .med-silent-loc-card .med-content .med-h3 { color: #fff; font-size: 1.15rem; margin-bottom: 0.3rem; }
        .med-silent-loc-card .med-content .med-body { color: rgba(255,255,255,0.8); font-size: 0.82rem; margin-bottom: 0.5rem; }
        .med-silent-loc-card .med-content .med-best { font-family: var(--font-inter), sans-serif; font-size: 0.65rem; letter-spacing: 0.08em; color: rgba(255,255,255,0.5); font-weight: 400; }

        .med-silent-benefit-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
        @media (max-width: 720px) { .med-silent-benefit-grid { grid-template-columns: 1fr; } }
        .med-silent-benefit-card { padding: 1.5rem; border: 1px solid rgba(15,118,110,0.06); border-radius: 12px; background: #fff; }
        .med-silent-benefit-card .med-h3 { font-size: 0.88rem; margin-bottom: 0.3rem; }
        .med-silent-benefit-card .med-body { font-size: 0.82rem; margin-bottom: 0; }

        .med-silent-prog-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
        @media (max-width: 720px) { .med-silent-prog-grid { grid-template-columns: 1fr; } }
        .med-silent-prog-card {
          background: #fff; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px;
          overflow: hidden; transition: transform 0.35s, box-shadow 0.35s, border-color 0.3s;
          display: flex; flex-direction: column; text-decoration: none; color: inherit;
        }
        .med-silent-prog-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); border-color: rgba(15,118,110,0.3); }
        .med-silent-prog-card .med-header { padding: 1.5rem 1.5rem 0; display: flex; justify-content: space-between; align-items: flex-start; }
        .med-silent-prog-card .med-body-wrap { padding: 1rem 1.5rem 1.5rem; flex: 1; display: flex; flex-direction: column; }

        .med-silent-trust-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
        @media (max-width: 720px) { .med-silent-trust-grid { grid-template-columns: 1fr; } }
        .med-silent-trust-item { text-align: center; padding: 2rem 1.5rem; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; background: #fff; transition: border-color 0.2s; }
        .med-silent-trust-item:hover { border-color: rgba(15,118,110,0.25); }

        .med-silent-funnel-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
        @media (max-width: 720px) { .med-silent-funnel-grid { grid-template-columns: 1fr; } }
        .med-silent-funnel-card {
          background: #0a1f1c; border: 1px solid rgba(255,255,255,0.12);
          border-radius: 18px; padding: 1.75rem; text-decoration: none;
          display: flex; flex-direction: column; gap: 0.6rem; align-items: center; text-align: center;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }
        .med-silent-funnel-card:hover { background: rgba(10,31,28,0.8); border-color: rgba(255,255,255,0.25); transform: translateY(-3px); }
        .med-silent-funnel-card .med-h3 { font-size: 0.92rem; color: #fff; margin-bottom: 0; }
        .med-silent-funnel-card .med-body { font-size: 0.78rem; color: rgba(255,255,255,0.5); margin-bottom: 0; }
        .med-silent-funnel-card .med-link { font-family: var(--font-inter), sans-serif; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #5eead4; margin-top: auto; padding-top: 0.5rem; }
        .med-silent-funnel-card .med-num { font-size: 1.8rem; font-weight: 200; color: #5eead4; margin-bottom: 0.25rem; }

        .med-silent-stories { display: flex; flex-direction: column; gap: 0; border: 1px solid rgba(15,118,110,0.12); border-radius: 12px; overflow: hidden; margin-top: 1.25rem; }
        .med-silent-story {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(15,118,110,0.08);
          text-decoration: none; background: #fff;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem; font-weight: 400; color: #2B2A26;
          transition: background 0.2s;
        }
        .med-silent-story:last-child { border-bottom: none; }
        .med-silent-story:hover { background: #f7f9f7; }
        .med-silent-story .med-arrow { color: #0f766e; font-size: 0.8rem; }

        .med-silent-related { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1.5rem; }

        .med-silent-faq-item { border-bottom: 1px solid rgba(15,118,110,0.08); padding: 1.5rem 0; }
        .med-silent-faq-item:last-child { border-bottom: none; }
        .med-silent-faq-item .med-h3 { font-size: 0.92rem; margin-bottom: 0.3rem; }
        .med-silent-faq-item .med-body { font-size: 0.85rem; margin-bottom: 0; }

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
        .med-faq-details:hover { border-color: rgba(15,118,110,0.25); }
        .med-faq-details[open] { border-color: rgba(15,118,110,0.3); }
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
        .med-faq-summary::-webkit-details-marker { display: none; }
        .med-faq-summary:hover { background: rgba(15,118,110,0.03); }
        .med-faq-details[open] .med-faq-summary {
          background: rgba(15,118,110,0.04);
          border-bottom: 1px solid rgba(15,118,110,0.06);
        }
        .med-faq-question { flex: 1; }
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
        .med-faq-details[open] .med-faq-icon { transform: rotate(45deg); }
        .med-faq-icon svg {
          width: 20px;
          height: 20px;
          stroke-width: 2;
          transition: stroke-width 0.2s ease;
        }
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

        .med-silent-link-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-silent-link-grid { grid-template-columns: 1fr; } }

        .med-silent-bottom-cta {
          position: relative;
          overflow: hidden;
          min-height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .med-silent-bottom-cta .med-overlay {
          position: absolute;
          inset: 0;
          background: rgba(4,12,10,0.88);
        }
        .med-silent-bottom-cta .med-content {
          position: relative;
          z-index: 2;
          max-width: 44rem;
          padding: 4rem 2rem;
        }
        .med-silent-bottom-cta .med-content .med-h2 {
          color: #fff;
          margin-bottom: 1rem;
        }
        .med-silent-bottom-cta .med-content .med-h2 span {
          color: #5eead4;
        }
        .med-silent-bottom-cta .med-content .med-body {
          color: rgba(255,255,255,0.6);
          margin-bottom: 2rem;
        }
        .med-silent-bottom-cta .med-content .med-trust {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
        .med-silent-bottom-cta .med-content .med-trust span {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.68rem;
          color: rgba(255,255,255,0.35);
          font-weight: 400;
          letter-spacing: 0.05em;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema,
            faqSchema,
            ...reviewSchemas,
            ...(aggregateSchema ? [aggregateSchema] : []),
          ]),
        }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Retreats', href: '/retreats' },
              { name: 'Silent Retreats' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Silence & Stillness</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Not the uncomfortable quiet of a paused conversation. The thick, living silence of a Himalayan forest where the only sound is your own awareness. Silence as nourishment, not deprivation.
            </p>
            <div className="med-hero-tags">
              <span>Noble Silence</span>
              <span>No Devices</span>
              <span>3–10 Days</span>
              <span>Max 12 Participants</span>
            </div>
            <div className="med-hero-actions">
              <Link href="/contact" className="med-cta-btn">Find Your Silent Retreat →</Link>
              <a href="#silence-types" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Explore Formats ↓</a>
            </div>
          </div>
        </section>

        {/* ── INFO STRIP ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '2rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-silent-strip">
              {[
                { label: 'Locations', value: '3 Himalayan Settings' },
                { label: 'Format', value: 'Noble Silence' },
                { label: 'Duration', value: '3 – 10 Days' },
                { label: 'Group Size', value: 'Max 12 People' },
              ].map((item) => (
                <div key={item.label} className="med-silent-item">
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b7280', fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', color: '#2B2A26', fontWeight: 400 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT IS A SILENT RETREAT ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Understanding Silent Retreats</span>
            </div>
            <h2 className="med-h2">What happens during <span>a silent retreat</span>?</h2>

            <div className="med-grid-2" style={{ alignItems: 'center', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p className="med-body">A silent retreat is not simply a meditation retreat with a rule against talking. It is a fundamentally different experience — one where the entire field of communication shifts.</p>
                <p className="med-body">The first 12–24 hours are often uncomfortable. The mind, accustomed to constant verbal interaction, searches for stimulation and finds none. Restlessness, boredom, and sometimes anxiety arise. This is normal and expected.</p>
                <p className="med-body">By the second day, something begins to change. Without the need to formulate responses, the mind slows. Sensory perception sharpens. By day three, a deeper layer of awareness — quieter, more spacious, less reactive — becomes accessible.</p>
                <p className="med-body">This is what most people have never experienced. Not the silence of a quiet room, but the silence that lives beneath everything — thick, alive, and profoundly nourishing.</p>
              </div>
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/9' }}>
                <img src="/Images/experience-hubs/monastery.webp" alt="Remote Himalayan monastery — the setting for deep silent retreats" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── PSYCHOLOGICAL EFFECTS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Science of Silence</span>
            </div>
            <h2 className="med-h2">What silence does to <span>your mind and body</span></h2>
            <p className="med-body">Extended silence produces measurable psychological and physiological changes, studied across multiple research traditions.</p>

            <div className="med-silent-benefit-grid" style={{ marginTop: '1.5rem' }}>
              {[
                { title: 'Cortisol Reduction', text: 'Within 48–72 hours, cortisol levels drop measurably. The absence of social performance pressure allows the adrenal system to stand down.' },
                { title: 'Default Network Quieting', text: 'The brain\'s default mode network — responsible for mind-wandering and rumination — shows reduced activity. The neurological correlate of the thinking mind becoming quiet.' },
                { title: 'Enhanced Senses', text: 'Removing linguistic processing frees cognitive bandwidth. Colours appear more vivid, sounds more distinct, physical sensations more nuanced.' },
                { title: 'Emotional Processing', text: 'Without talking about emotions, the psyche processes them somatically rather than narratively. Emotions rise, are felt, and pass — without intellectual loops.' },
                { title: 'Time Distortion', text: 'Without conversation and schedule-checking, the experience of time changes. Days that feel interminable on day one begin to expand and slow beautifully.' },
                { title: 'Deep Sleep', text: 'The nervous system recalibration produces significantly deeper sleep. Most retreatants report the best sleep of their lives by day three.' },
              ].map((item) => (
                <div key={item.title} className="med-silent-benefit-card">
                  <h3 className="med-h3">{item.title}</h3>
                  <p className="med-body">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

  

        {/* ── TYPES OF SILENCE ── */}
        <section id="silence-types" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Silence Formats</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>Types of <span>silent retreats</span></h2>
            <p className="med-body" style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 2rem' }}>Not all silence is the same. Choose the format that matches your readiness and intention.</p>

            <div className="med-silent-type-grid">
              {SILENCE_TYPES.map((type) => (
                <div key={type.title} className="med-card med-silent-type-card">
                  <h3 className="med-h3">{type.title}</h3>
                  <p className="med-body">{type.description}</p>
                  <span className="med-best">Best for: {type.bestFor}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO THIS IS FOR ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Is This For You</span>
            </div>
            <h2 className="med-h2">Who silent retreats are <span>for</span></h2>

            <div className="med-grid-2" style={{ marginTop: '1.5rem' }}>
              <div>
                <h3 className="med-h3" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0f766e', marginBottom: '1rem' }}>
                  ✓ Perfect if you are
                </h3>
                <ul className="med-list">
                  {[
                    'Someone who has never experienced extended silence and feels drawn to it',
                    'In an overstimulated career or lifestyle seeking neurological reset',
                    'A meditation practitioner wanting to deepen through sustained quiet',
                    'Suspecting that what you need most is permission to stop talking',
                    'Recovering from burnout, grief, or emotional overwhelm',
                    'Ready to discover what your mind does when it has nothing to perform',
                  ].map((item) => (
                    <li key={item} className="med-list-item">
                      <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                      <span className="med-list-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="med-h3" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', marginBottom: '1rem' }}>
                  — Not the right fit if you want
                </h3>
                <ul className="med-list">
                  {[
                    'Social retreat with group activities and conversation',
                    'Spa-style relaxation with entertainment',
                    'Short workshop (less than 3 days)',
                    'Silent meditation without any guidance or structure',
                  ].map((item) => (
                    <li key={item} className="med-list-item" style={{ opacity: 0.5 }}>
                      <span className="med-list-dot"><span className="med-list-dot-inner" style={{ background: '#ccc' }} /></span>
                      <span className="med-list-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

                       {/* ── LOCATIONS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Where We Hold Silence</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>Three Himalayan <span>silence containers</span></h2>
            <p className="med-body" style={{ textAlign: 'center', maxWidth: '38rem', margin: '0 auto 2rem' }}>Each location holds silence differently. Forest silence. Geological silence. Alpine silence. Choose based on the quality of quiet your nervous system needs.</p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '1.5rem',
              marginTop: '1.5rem'
            }}>
              {LOCATIONS.map((loc) => (
                <Link key={loc.id} href={`/retreats/${loc.id}`} style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  textDecoration: 'none', 
                  color: 'inherit',
                  background: '#fff',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid rgba(15,118,110,0.12)',
                  transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease',
                  height: '100%',
                  position: 'relative'
                }}
                className="med-loc-card-hover"
                >
                  <div style={{ 
                    position: 'relative', 
                    width: '100%', 
                    aspectRatio: '16/9', 
                    overflow: 'hidden', 
                    background: '#f0f2f0',
                    flexShrink: 0
                  }}>
                    <img 
                      src={loc.image} 
                      alt={`${loc.name} — silent retreat location`} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)'
                      }}
                      className="med-loc-card-img"
                    />
                  </div>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                    <span style={{ 
                      fontFamily: 'var(--font-inter), sans-serif', 
                      fontSize: '0.6rem', 
                      letterSpacing: '0.2em', 
                      textTransform: 'uppercase', 
                      color: '#0f766e', 
                      fontWeight: 700 
                    }}>
                      {loc.altitude} altitude
                    </span>
                    <h3 className="med-h3" style={{ 
                      fontSize: '1.05rem', 
                      marginBottom: '0.2rem', 
                      color: '#2B2A26',
                      fontWeight: 600
                    }}>
                      {loc.name} — {loc.tagline}
                    </h3>
                    <p className="med-body" style={{ 
                      fontSize: '0.85rem', 
                      marginBottom: 0, 
                      color: '#4b5259',
                      lineHeight: 1.7,
                      flex: 1
                    }}>
                      {loc.description}
                    </p>
                    <span style={{ 
                      fontFamily: 'var(--font-inter), sans-serif', 
                      fontSize: '0.62rem', 
                      letterSpacing: '0.08em', 
                      color: '#6b7280', 
                      fontWeight: 500,
                      marginTop: '0.5rem',
                      paddingTop: '0.5rem',
                      borderTop: '1px solid rgba(15,118,110,0.06)'
                    }}>
                      Best for: {loc.bestFor}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        {/* ── DECISION FUNNEL ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Not Sure Where to Start?</span>
                <span className="med-eyebrow-line" />
              </div>
              <h2 className="med-h2" style={{ marginBottom: '0.5rem' }}>Three ways to enter <span>the silence</span></h2>
              <p className="med-body" style={{ maxWidth: '36rem', margin: '0 auto' }}>
                Choose based on your readiness and intention.
              </p>
            </div>

            <div className="med-silent-funnel-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem' }}>
              <Link href="/contact" className="med-card" style={{ padding: '1.75rem', textDecoration: 'none', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.8rem', fontWeight: 200, color: '#0f766e', marginBottom: '0.25rem' }}>01</span>
                <h3 className="med-h3" style={{ fontSize: '0.92rem', marginBottom: 0 }}>Get Matched</h3>
                <p className="med-body" style={{ fontSize: '0.78rem', marginBottom: 0 }}>Tell us about your experience and intention — we&apos;ll recommend the right format, location, and duration.</p>
                <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0f766e', marginTop: 'auto', paddingTop: '0.5rem' }}>Talk to a planner →</span>
              </Link>
              <Link href="/what-happens-at-a-silent-retreat" className="med-card" style={{ padding: '1.75rem', textDecoration: 'none', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.8rem', fontWeight: 200, color: '#0f766e', marginBottom: '0.25rem' }}>02</span>
                <h3 className="med-h3" style={{ fontSize: '0.92rem', marginBottom: 0 }}>Learn What to Expect</h3>
                <p className="med-body" style={{ fontSize: '0.78rem', marginBottom: 0 }}>Read our detailed guide on what actually happens during a silent retreat — hour by hour, day by day.</p>
                <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0f766e', marginTop: 'auto', paddingTop: '0.5rem' }}>Read the guide →</span>
              </Link>
              <Link href="/vipassana-vs-meditation-retreat" className="med-card" style={{ padding: '1.75rem', textDecoration: 'none', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.8rem', fontWeight: 200, color: '#0f766e', marginBottom: '0.25rem' }}>03</span>
                <h3 className="med-h3" style={{ fontSize: '0.92rem', marginBottom: 0 }}>Vipassana vs Our Format</h3>
                <p className="med-body" style={{ fontSize: '0.78rem', marginBottom: 0 }}>Wondering how we compare to Vipassana? Smaller groups, multiple techniques, nature-integrated. See the differences.</p>
                <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0f766e', marginTop: 'auto', paddingTop: '0.5rem' }}>Compare formats →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        {topReviews.length > 0 && (
          <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
            <div className="med-outer">
              <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">What Participants Say</span>
                <span className="med-eyebrow-line" />
              </div>
              <h2 className="med-h2" style={{ textAlign: 'center' }}>Real <span>retreat experiences</span></h2>
              <div className="med-grid-3" style={{ marginTop: '1.5rem' }}>
                {topReviews.map((review) => (
                  <ReviewCard key={`${review.participantName}-${review.datePublished}`} review={review} />
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <Link href="/reviews" style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 500, color: '#0f766e', textDecoration: 'none' }}>
                  Read more experiences →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── UPCOMING PROGRAMS ── */}
        {upcomingEvents.length > 0 && (
          <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
            <div className="med-outer">
              <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Scheduled Retreats</span>
                <span className="med-eyebrow-line" />
              </div>
              <h2 className="med-h2" style={{ textAlign: 'center' }}>Upcoming <span>silent retreat programs</span></h2>
              <p className="med-body" style={{ textAlign: 'center', maxWidth: '36rem', margin: '0 auto 2rem' }}>Confirmed departures with fixed dates, pricing, and limited seats.</p>

              <div className="med-silent-prog-grid">
                {upcomingEvents.map((ev) => {
                  const statusLabel = ev.status === 'filling-fast' ? 'Filling Fast' : ev.status === 'last-few' ? 'Last Few Seats' : 'Open';
                  return (
                    <Link key={ev.slug} href={`/${ev.slug}`} className="med-silent-prog-card">
                      <div className="med-header">
                        <div>
                          <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6b7280', fontWeight: 500, display: 'block', marginBottom: '0.35rem' }}>
                            {ev.locationName} · {ev.month} {ev.year}
                          </span>
                          <h3 className="med-h3" style={{ fontSize: '1.05rem', marginBottom: 0 }}>{ev.label}</h3>
                        </div>
                        <span style={{
                          fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                          fontWeight: 700, padding: '3px 8px', borderRadius: '999px', whiteSpace: 'nowrap',
                          background: ev.status === 'filling-fast' ? '#fef3c7' : ev.status === 'last-few' ? '#fee2e2' : '#ecfdf5',
                          color: ev.status === 'filling-fast' ? '#92400e' : ev.status === 'last-few' ? '#991b1b' : '#065f46',
                        }}>{statusLabel}</span>
                      </div>
                      <div className="med-body-wrap">
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                          <div>
                            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b7280', display: 'block', marginBottom: '0.15rem' }}>Duration</span>
                            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 400, color: '#2B2A26' }}>{ev.durationDays} Days</span>
                          </div>
                          <div>
                            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b7280', display: 'block', marginBottom: '0.15rem' }}>Price</span>
                            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 500, color: '#2B2A26' }}>₹{ev.price.toLocaleString('en-IN')}</span>
                          </div>
                          <div>
                            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b7280', display: 'block', marginBottom: '0.15rem' }}>Group</span>
                            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 400, color: '#2B2A26' }}>Max {ev.groupSize}</span>
                          </div>
                        </div>
                        <p className="med-body" style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>{ev.dateRange} · All-inclusive</p>
                        <ul className="med-list" style={{ gap: '0.35rem', marginBottom: '0.75rem' }}>
                          {ev.included.slice(0, 3).map((inc) => (
                            <li key={inc} className="med-list-item" style={{ gap: '0.5rem' }}>
                              <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                              <span className="med-list-text" style={{ fontSize: '0.72rem', color: '#6b7280' }}>{inc}</span>
                            </li>
                          ))}
                        </ul>
                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(15,118,110,0.08)', paddingTop: '0.75rem' }}>
                          <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0f766e' }}>View Details →</span>
                          <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 500, color: ev.seatsLeft <= 3 ? '#c92a2a' : '#6b7280' }}>{ev.seatsLeft} seats left</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Link href="/contact" className="med-cta-btn">Don't See Your Dates? Request a Custom Retreat →</Link>
              </div>
            </div>
          </section>
        )}

        {/* ── STORIES ── */}
        {PAGE.storyLinks && PAGE.storyLinks.length > 0 && (
          <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
            <div className="med-inner">
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Retreat Stories</span>
              </div>
              <p className="med-body" style={{ marginBottom: '1rem' }}>First-person accounts from people who have entered the silence.</p>

              <div className="med-silent-stories">
                {PAGE.storyLinks.map((story, i, arr) => (
                  <Link key={story.href} href={story.href} className="med-silent-story" style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(15,118,110,0.08)' : 'none' }}>
                    <span>{story.label}</span>
                    <span className="med-arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── RELATED GUIDES ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Explore Further</span>
            </div>
            <h2 className="med-h2">Related <span>guides</span></h2>

            <div className="med-silent-related">
              <Link href="/what-happens-at-a-silent-retreat" className="med-cta-outline">What Happens at a Silent Retreat →</Link>
              <Link href="/how-hard-is-a-silent-retreat" className="med-cta-outline">How Hard Is a Silent Retreat? →</Link>
              <Link href="/vipassana-vs-meditation-retreat" className="med-cta-outline">Vipassana vs Meditation Retreat →</Link>
              <Link href="/meditation-retreats" className="med-cta-outline">Meditation Retreats →</Link>
              <Link href="/himalayan-silent-retreats" className="med-cta-outline">Himalayan Silent Retreats →</Link>
            </div>
          </div>
        </section>

        {/* ── TRUST BLOCK ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Why Us</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>What makes our retreat <span>different</span></h2>

            <div className="med-silent-trust-grid">
              {[
                { num: '8–12', label: 'Max Group Size', text: 'Smaller than Vipassana (50–100 people). Every retreatant is known to the facilitator. You are held, not herded.' },
                { num: '3+', label: 'Techniques Offered', text: 'Not locked into a single method. Walking meditation, sitting, body scans, breathwork — find what works for your mind.' },
                { num: '100%', label: 'Nature-Integrated', text: 'Silence in a hall is different from silence in a Himalayan forest. Our locations make the landscape part of the practice.' },
              ].map((item) => (
                <div key={item.label} className="med-silent-trust-item">
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '2rem', fontWeight: 200, color: '#0f766e', display: 'block', marginBottom: '0.25rem', letterSpacing: '-0.03em' }}>{item.num}</span>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b7280', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>{item.label}</span>
                  <p className="med-body" style={{ fontSize: '0.82rem', marginBottom: 0 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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

        {/* ── BOTTOM CTA ── */}
        <section className="med-silent-bottom-cta">
          <div style={{ position: 'absolute', inset: 0 }}>
            <img src="/Images/hero/mountain-snow.webp" alt="Snow-covered Himalayan peaks — silent retreat setting" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
            <div className="med-overlay" />
          </div>
          <div className="med-content">
            <h2 className="med-h2">Enter the <span>Silence</span></h2>
            <p className="med-body">Silence is not something you achieve. It is something you enter. The right location makes entering easier. Tell us where you are and we&apos;ll help you find the right container.</p>
            <Link href="/contact" className="med-cta-btn" style={{ fontSize: '0.85rem', padding: '1rem 2.5rem' }}>
              Plan My Silent Retreat →
            </Link>
            <div className="med-trust">
              <span>Noble silence</span>
              <span>Max 12 people</span>
              <span>3–10 day programs</span>
            </div>
          </div>
        </section>

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-silent-link-grid">
              <Link href="/silent-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Silent Retreats</span>
              </Link>
              <Link href="/meditation-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Meditation Retreats</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/himalayan-silent-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Himalayan Silent Retreats</span>
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
