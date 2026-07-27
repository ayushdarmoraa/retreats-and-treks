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
import PrimaryCTA from '@/components/PrimaryCTA';
import ReviewCard from '@/components/reviews/ReviewCard';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const PAGE = getExperiencePage('meditation-retreats')!;
const PATH = '/meditation-retreats';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return {
    title: 'Meditation Retreats in the Himalayas | Retreats And Treks',
    description:
      'Guided meditation retreats in Zanskar, Chakrata, and Rishikesh. Small groups, deep silence, experienced teachers, and 3–10 day Himalayan programs.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Meditation Retreats in the Himalayas — Guided Silence & Deep Practice',
      description:
        'Guided meditation retreats in quiet Himalayan locations. Small groups, deep silence, experienced teachers. Find the right setting for your practice.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Meditation Retreats in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Do I need prior meditation experience for a Himalayan retreat?',
    answer:
      'No. Our Chakrata and Rishikesh retreats are designed for all experience levels, with guided instruction from the first session. Zanskar retreats are recommended for those with some prior practice due to the altitude and remoteness.',
  },
  {
    question: 'How long should a meditation retreat be?',
    answer:
      'Three days is a meaningful reset — enough to experience genuine silence. Five to seven days allows the mind to settle beneath habitual patterns. Ten days is standard for Vipassana-style retreats and where the deepest shifts occur. If in doubt, five days is the best balance.',
  },
  {
    question: 'What if I can\'t sit still for long periods?',
    answer:
      'Retreats include walking meditation, gentle movement, and rest periods alongside seated practice. The schedule accommodates the body\'s needs. Many people who cannot sit still in daily life find that the retreat environment changes this completely.',
  },
  {
    question: 'Is a meditation retreat religious?',
    answer:
      'No. While some of our locations carry Buddhist or Hindu heritage, the retreats themselves are non-denominational. The practices are rooted in contemplative tradition but do not require any religious affiliation or belief.',
  },
  {
    question: 'What is the difference between a meditation retreat and a Vipassana course?',
    answer:
      'Vipassana courses follow a fixed 10-day format with a single technique. Our Himalayan meditation retreats offer more flexibility — multiple techniques, smaller groups (max 12 vs 50–100), nature-integrated practice, and personalised guidance. Both are powerful; the choice depends on whether you prefer structure or adaptability.',
  },
  {
    question: 'What should I bring to a meditation retreat?',
    answer:
      'Comfortable clothing for meditation, warm layers (temperatures drop at altitude), a journal, and any personal medication. Specific packing lists are provided after booking. Leave devices at home or expect them to be stored during the retreat.',
  },
];

const RETREAT_TYPES = [
  {
    title: 'Silent Meditation Retreat',
    description: 'Noble silence throughout — no conversation, no devices, no reading. The deepest form of retreat for those ready to meet their own mind without distraction.',
    duration: '3–10 Days',
    image: '/Images/himalayanretreats/silentretreat.webp',
    href: '/silent-retreats',
  },
  {
    title: 'Guided Meditation Retreat',
    description: 'Regular instruction, dharma talks, and teacher interaction. Silence maintained during practice, broken during teaching. Ideal for beginners.',
    duration: '3–7 Days',
    image: '/Images/services/meditation.webp',
    href: '/retreats-for-beginners',
  },
  {
    title: 'Trek & Meditation Retreat',
    description: 'Multi-day Himalayan trekking combined with meditation sessions at camp. Physical exertion becomes preparation for stillness.',
    duration: '5–10 Days',
    image: '/Images/himalayanretreats/retreaktrek.webp',
    href: '/meditation-retreat-and-trek',
  },
];

const LOCATIONS = [
  {
    name: 'Zanskar',
    id: 'zanskar',
    tagline: 'Monastery Silence at 3,500m',
    description: 'The deepest meditation environment we offer. Century-old Buddhist monasteries, no phone signal, reduced oxygen that naturally quiets the thinking mind.',
    bestFor: 'Deep practitioners, radical disconnection',
    altitude: '3,500m',
    image: '/Images/location/zanskar.webp',
  },
  {
    name: 'Chakrata',
    id: 'chakrata',
    tagline: 'Forest Silence at 2,000m',
    description: 'Dense Himalayan forest with no tourist noise. Accessible from Dehradun yet genuinely remote. The most gentle entry point for first-time retreatants.',
    bestFor: 'Beginners, accessible depth',
    altitude: '2,000m',
    image: '/Images/location/chakrata.webp',
  },
  {
    name: 'Rishikesh',
    id: 'rishikesh',
    tagline: 'Ganges Tradition',
    description: 'India\'s yoga capital. Living lineage of meditation practice, the energy of the Ganges, and accumulated spiritual weight of centuries.',
    bestFor: 'Spiritual lineage, teacher access',
    altitude: '372m',
    image: '/Images/location/rishikesh.webp',
  },
];

export default function MeditationRetreatsPage() {
  const { reviewSchemas, aggregateSchema } = getReviewSchemasForPage(PAGE);
  const allReviews = PAGE.retreatServiceSlugs.flatMap((slug) => getReviewsForSlug(slug));
  const topReviews = allReviews.filter((r) => r.ratingValue >= 4).slice(0, 3);
  const upcomingEvents = getUpcomingEvents()
    .filter((e) => e.experienceSlug === PAGE.slug)
    .slice(0, 3);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl(PATH) },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  // Split heading for green last word
  const h1Words = "Meditation Retreats in the Himalayas".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Meditation Retreats in the Himalayas — Guided Silence & Deep Practice"
        description="Guided meditation retreats in quiet Himalayan locations. Small groups, deep silence, experienced teachers. Find the right setting for your practice."
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
        .med-section-dark { background: #0a1f1c; color: #fff; }

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
        .med-section-dark .med-card .med-link { color: #5eead4; }
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
  transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
}

.med-faq-details[open] .med-faq-icon {
  transform: rotate(45deg);
}

.med-faq-answer {
  padding: 0 1.5rem 1.5rem;
  animation: med-faq-slide 0.3s cubic-bezier(0.22,1,0.36,1);
}

@keyframes med-faq-slide {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.med-faq-answer .med-body {
  margin: 0;
  font-size: 0.92rem;
  color: #4b5259;
}
        /* ── Page specific styles ── */
        .med-info-strip { display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap; }
        .med-info-item { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }

        .med-type-card {
          display: flex; flex-direction: column; text-decoration: none; color: inherit;
          background: #fff; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px;
          overflow: hidden; transition: transform 0.35s, box-shadow 0.35s, border-color 0.3s;
          height: 100%;
        }
        .med-type-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,0,0,0.1); border-color: rgba(15,118,110,0.3); }
        .med-type-card .med-img-wrap { position: relative; height: 200px; overflow: hidden; }
        .med-type-card .med-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
        .med-type-card:hover .med-img-wrap img { transform: scale(1.05); }
        .med-type-card .med-body-wrap { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
        .med-type-card .med-body-wrap .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-type-card .med-body-wrap .med-body { font-size: 0.85rem; margin-bottom: 0.5rem; }

        .med-loc-card {
          position: relative; border-radius: 18px; overflow: hidden;
          text-decoration: none; color: #fff; display: flex; align-items: flex-end;
          min-height: 340px; transition: transform 0.35s, box-shadow 0.35s;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .med-loc-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.15); }
        .med-loc-card .med-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .med-loc-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%); z-index: 1; }
        .med-loc-card .med-content { position: relative; z-index: 2; padding: 1.75rem; width: 100%; }

        .med-benefit-card { padding: 1.5rem; background: #fff; border-radius: 12px; border: 1px solid rgba(15,118,110,0.06); }
        .med-benefit-card .med-h3 { font-size: 0.95rem; margin-bottom: 0.3rem; }
        .med-benefit-card .med-body { font-size: 0.85rem; margin-bottom: 0; }

        .med-faq-item { border-bottom: 1px solid rgba(15,118,110,0.08); padding: 1.5rem 0; }
        .med-faq-item:last-child { border-bottom: none; }
        .med-faq-item .med-h3 { font-size: 0.95rem; margin-bottom: 0.3rem; }
        .med-faq-item .med-body { font-size: 0.88rem; margin-bottom: 0; }

        .med-prog-card {
          background: #fff; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px;
          overflow: hidden; transition: transform 0.35s, box-shadow 0.35s, border-color 0.3s;
          display: flex; flex-direction: column; text-decoration: none; color: inherit;
        }
        .med-prog-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); border-color: rgba(15,118,110,0.3); }
        .med-prog-card .med-header { padding: 1.5rem 1.5rem 0; display: flex; justify-content: space-between; align-items: flex-start; }
        .med-prog-card .med-body-wrap { padding: 1rem 1.5rem 1.5rem; flex: 1; display: flex; flex-direction: column; }

        .med-dec-card {
          background: #fff; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px;
          padding: 1.75rem; display: flex; flex-direction: column; gap: 0.5rem;
          text-decoration: none; color: inherit; transition: transform 0.35s, border-color 0.3s, box-shadow 0.35s;
        }
        .med-dec-card:hover { transform: translateY(-4px); border-color: rgba(15,118,110,0.3); box-shadow: 0 8px 32px rgba(0,0,0,0.06); }
        .med-dec-card .med-h3 { font-size: 0.95rem; margin-bottom: 0; }
        .med-dec-card .med-body { font-size: 0.85rem; margin-bottom: 0; }

        .med-funnel-card {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 18px; padding: 1.75rem; text-decoration: none;
          display: flex; flex-direction: column; gap: 0.6rem; align-items: center; text-align: center;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }
        .med-funnel-card:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.25); transform: translateY(-3px); }
        .med-funnel-card .med-h3 { font-size: 0.92rem; color: #fff; margin-bottom: 0; }
        .med-funnel-card .med-body { font-size: 0.78rem; color: rgba(255,255,255,0.5); margin-bottom: 0; }
        .med-funnel-card .med-link { font-family: var(--font-inter), sans-serif; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #5eead4; margin-top: auto; padding-top: 0.5rem; }

        .med-trust-item { text-align: center; padding: 2rem 1.5rem; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; background: #fff; transition: border-color 0.2s; }
        .med-trust-item:hover { border-color: rgba(15,118,110,0.25); }

        .med-bottom-cta { position: relative; overflow: hidden; min-height: 50vh; display: flex; align-items: center; justify-content: center; text-align: center; }
        .med-bottom-cta .med-overlay { position: absolute; inset: 0; background: rgba(4,12,10,0.85); }
        .med-bottom-cta .med-content { position: relative; z-index: 2; max-width: 44rem; padding: 4rem 2rem; }

        .med-who-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        @media (max-width: 720px) { .med-who-grid { grid-template-columns: 1fr; gap: 1.5rem; } }

        .med-schedule-grid { display: flex; flex-direction: column; gap: 0; margin-top: 1.5rem; }
        .med-schedule-item { display: grid; grid-template-columns: 5rem 2rem 1fr; gap: 0 1rem; margin-bottom: 1rem; }
        .med-schedule-item:last-child { margin-bottom: 0; }
        .med-schedule-time { font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 500; color: #0f766e; text-align: right; padding-top: 0.15rem; }
        .med-schedule-dot-wrap { display: flex; flex-direction: column; align-items: center; }
        .med-schedule-dot { width: 10px; height: 10px; border-radius: 50%; background: #fff; border: 2px solid #0f766e; margin-top: 0.28rem; z-index: 1; }
        .med-schedule-line { width: 1px; flex: 1; background: linear-gradient(to bottom, rgba(15,118,110,0.3), rgba(15,118,110,0.05)); margin-top: 4px; min-height: 1.5rem; }
        .med-schedule-label { font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; color: #2B2A26; margin: 0 0 0.2rem; }
        .med-schedule-text { font-family: var(--font-inter), sans-serif; font-size: 0.82rem; line-height: 1.6; color: #6b7280; font-weight: 300; margin: 0; }
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
              { name: 'Meditation Retreats' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Meditation & Silence</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Where altitude quiets the mind, forest absorbs distraction, and centuries of practice hold the space. Small groups. Experienced guidance. 3–10 day programs.
            </p>
            <div className="med-hero-tags">
              <span>Guided Practice</span>
              <span>Max 12 Participants</span>
              <span>3–10 Days</span>
              <span>All Levels</span>
            </div>
            <div className="med-hero-actions">
              <Link href="#contact" className="med-cta-btn">Find Your Retreat →</Link>
              <a href="#retreat-types" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Explore Formats ↓</a>
            </div>
          </div>
        </section>

        {/* ── INFO STRIP ── */}
        <section className="med-shell med-section-dark med-section-padding-sm" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="med-outer">
            <div className="med-info-strip">
              {[
                { label: 'Locations', value: '3 Himalayan Settings' },
                { label: 'Group Size', value: 'Max 12 People' },
                { label: 'Duration', value: '3 – 10 Days' },
                { label: 'Experience', value: 'All Levels Welcome' },
              ].map((item) => (
                <div key={item.label} className="med-info-item">
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', color: '#ffffff', fontWeight: 300 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT IS A MEDITATION RETREAT ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Understanding Meditation Retreats</span>
            </div>
            <h2 className="med-h2">What is a <span>meditation retreat</span>?</h2>
            <div className="med-grid-2" style={{ alignItems: 'center', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p className="med-body">
                  A meditation retreat is a structured period — typically three to ten days — spent in deliberate silence, daily practice, and guided instruction, away from the routines of ordinary life. Unlike a meditation class, a retreat creates a continuous container where practice deepens through sustained immersion.
                </p>
                <p className="med-body">
                  In the Himalayas, meditation retreats carry a different weight. At 2,000–3,500 metres, reduced oxygen naturally slows the thinking mind. Dense forests absorb distraction. The contemplative tradition stretching back millennia holds the space before you arrive.
                </p>
                <p className="med-body">
                  What surprises most first-time retreatants is how much happens beneath the surface. The first day is often restless. By the third day, something shifts — habitual thought patterns weaken, sensory awareness sharpens, and a deeper quality of attention emerges.
                </p>
              </div>
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/9' }}>
                <img src="/Images/experience-hubs/meditation-group.png" alt="Small group meditation in a Himalayan forest clearing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY HIMALAYAS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Why the Himalayas</span>
            </div>
            <h2 className="med-h2">Why <span>Himalayan meditation</span> is different</h2>
            <p className="med-body">
              The Himalayas have been the geography of contemplative practice for thousands of years — not because of marketing, but because the environment itself supports the work of meditation in ways that cannot be replicated elsewhere.
            </p>

            <div className="med-grid-2" style={{ marginTop: '1.5rem' }}>
              {[
                { title: 'Altitude & Awareness', text: 'At 2,000–3,500m, reduced oxygen naturally slows cognitive processing. The thinking mind — planning, worrying, narrating — becomes quieter with less effort.' },
                { title: 'Acoustic Isolation', text: 'Mountain valleys and dense forest absorb sound. The silence is not absence of noise — it is a positive quality, thick and alive, that supports practice.' },
                { title: 'Contemplative Tradition', text: 'From Zanskar\'s Buddhist monasteries to Rishikesh\'s yoga ashrams, the infrastructure and teachers for meditation are deeply established across millennia.' },
                { title: 'Separation from Habit', text: 'Remote mountain locations physically remove you from habitual cues — notifications, commutes, obligations. This strategic disruption allows new patterns to emerge.' },
              ].map((item) => (
                <div key={item.title} className="med-card med-benefit-card">
                  <h3 className="med-h3">{item.title}</h3>
                  <p className="med-body">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

       

        {/* ── RETREAT TYPES ── */}
        <section id="retreat-types" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Retreat Formats</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>Types of <span>meditation retreats</span></h2>
            <p className="med-body" style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 2rem' }}>
              Not all meditation retreats are the same. Choose the format that matches your experience level and intention.
            </p>

            <div className="med-grid-3">
              {RETREAT_TYPES.map((type) => (
                <Link key={type.title} href={type.href} className="med-type-card">
                  <div className="med-img-wrap">
                    <img src={type.image} alt={type.title} />
                    <span style={{
                      position: 'absolute', top: '1rem', left: '1rem',
                      fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.52rem',
                      letterSpacing: '0.24em', textTransform: 'uppercase', color: '#fff',
                      background: '#0f766e', padding: '4px 10px', borderRadius: '999px', fontWeight: 600,
                    }}>{type.duration}</span>
                  </div>
                  <div className="med-body-wrap">
                    <h3 className="med-h3">{type.title}</h3>
                    <p className="med-body">{type.description}</p>
                    <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                      <span className="med-link" style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0f766e' }}>
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>
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
            <h2 className="med-h2">Who meditation retreats are <span>for</span></h2>

            <div className="med-who-grid" style={{ marginTop: '1.5rem' }}>
              <div>
                <h3 className="med-h3" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0f766e', marginBottom: '1rem' }}>
                  Perfect if you are
                </h3>
                <ul className="med-list">
                  {[
                    'Seeking to establish or deepen a meditation practice',
                    'Recovering from overstimulation, decision fatigue, or mental overwhelm',
                    'An experienced practitioner wanting extended silence in a supported setting',
                    'Curious about contemplative practice in a mountain environment',
                    'Looking for a structured break that goes deeper than a holiday',
                    'Ready for a genuine encounter with your own mind',
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
                  Not the right fit if you want
                </h3>
                <ul className="med-list">
                  {[
                    'A spa or wellness resort experience',
                    'Entertainment-driven holiday with meditation as add-on',
                    'Large group meditation with 50+ participants',
                    'Quick-fix mindfulness without commitment',
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
              <span className="med-eyebrow-text">Where We Offer This</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>Three Himalayan <span>settings</span> for meditation</h2>
            <p className="med-body" style={{ textAlign: 'center', maxWidth: '38rem', margin: '0 auto 2rem' }}>
              Each location offers different conditions for practice. Choose based on your experience level, desired depth, and relationship with remoteness.
            </p>

            <div className="med-grid-3">
              {LOCATIONS.map((loc) => (
                <Link key={loc.id} href={`/retreats/${loc.id}`} className="med-loc-card">
                  <img src={loc.image} alt={`${loc.name} — meditation retreat location`} className="med-img" />
                  <div className="med-content">
                    <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>
                      {loc.altitude} altitude
                    </span>
                    <h3 className="med-h3" style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.3rem' }}>
                      {loc.name} — {loc.tagline}
                    </h3>
                    <p className="med-body" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                      {loc.description}
                    </p>
                    <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
                      Best for: {loc.bestFor}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── DECISION FUNNEL ── */}
        <section className="med-shell med-section-dark med-section-padding" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="med-outer">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
                <span className="med-eyebrow-line" style={{ background: 'rgba(255,255,255,0.25)' }} />
                <span className="med-eyebrow-text" style={{ color: 'rgba(255,255,255,0.4)' }}>Not Sure Where to Start?</span>
                <span className="med-eyebrow-line" style={{ background: 'rgba(255,255,255,0.25)' }} />
              </div>
              <h2 className="med-h2" style={{ color: '#fff', marginBottom: '0.5rem' }}>Three ways to find <span style={{ color: '#5eead4' }}>your retreat</span></h2>
              <p className="med-body" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '36rem', margin: '0 auto' }}>
                Choose the path that feels right for where you are right now.
              </p>
            </div>

            <div className="med-grid-3">
              <Link href="/contact" className="med-funnel-card">
                <div style={{ fontSize: '1.8rem', fontWeight: 200, color: '#5eead4', marginBottom: '0.25rem' }}>01</div>
                <h3 className="med-h3">Get Matched</h3>
                <p className="med-body">Tell us about yourself — we&apos;ll recommend the right retreat, location, and duration. Free, no pressure.</p>
                <span className="med-link">Talk to a planner →</span>
              </Link>
              <Link href="/how-to-choose-a-meditation-retreat" className="med-funnel-card">
                <div style={{ fontSize: '1.8rem', fontWeight: 200, color: '#5eead4', marginBottom: '0.25rem' }}>02</div>
                <h3 className="med-h3">Compare Options</h3>
                <p className="med-body">Read our detailed comparison guide — formats, locations, durations side by side. Decide at your own pace.</p>
                <span className="med-link">Read the guide →</span>
              </Link>
              <Link href="/retreats-for-beginners" className="med-funnel-card">
                <div style={{ fontSize: '1.8rem', fontWeight: 200, color: '#5eead4', marginBottom: '0.25rem' }}>03</div>
                <h3 className="med-h3">First Retreat?</h3>
                <p className="med-body">Never done a retreat? Start here. Our beginner&apos;s guide removes objections and recommends the gentlest entry point.</p>
                <span className="med-link">Beginner&apos;s guide →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── SAMPLE RETREAT DAY ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Experience</span>
            </div>
            <h2 className="med-h2">What a day <span>looks like</span></h2>

            <div className="med-schedule-grid">
              {[
                { time: '5:30 AM', label: 'Wake', text: 'No alarm needed — the rhythm establishes itself within two days.' },
                { time: '6:00 AM', label: 'Morning Sitting', text: '45 minutes of seated meditation. The mind is fresh, the forest is waking.' },
                { time: '7:00 AM', label: 'Walking Meditation', text: 'Slow, deliberate movement — often outdoors among trees or along a mountain path.' },
                { time: '7:30 AM', label: 'Breakfast', text: 'Simple food, eaten in silence, with attention.' },
                { time: '9:00 AM', label: 'Guided Practice', text: 'Instruction or dharma talk suited to participants\' experience levels. 60 minutes.' },
                { time: '12:00 PM', label: 'Lunch & Rest', text: 'The main meal. Followed by free time — sleep, journal, walk.' },
                { time: '3:00 PM', label: 'Afternoon Sitting', text: '45 minutes. The afternoon mind is softer, more spacious.' },
                { time: '6:00 PM', label: 'Evening Sitting', text: '45 minutes. The day settles into its final descent.' },
                { time: '7:00 PM', label: 'Dinner & Rest', text: 'Light dinner. Optional evening reflection or early rest.' },
              ].map((phase, idx, arr) => (
                <div key={idx} className="med-schedule-item">
                  <span className="med-schedule-time">{phase.time}</span>
                  <div className="med-schedule-dot-wrap">
                    <span className="med-schedule-dot" />
                    {idx < arr.length - 1 && <span className="med-schedule-line" />}
                  </div>
                  <div>
                    <p className="med-schedule-label">{phase.label}</p>
                    <p className="med-schedule-text">{phase.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Evidence-Based</span>
            </div>
            <h2 className="med-h2">Benefits of a <span>meditation retreat</span></h2>

            <div className="med-grid-3" style={{ marginTop: '1.5rem' }}>
              {[
                { title: 'Neurological Changes', text: 'Reduced default mode network activity — less mind-wandering, rumination, and self-referential thinking. Measurably lower cortisol after 7 days.' },
                { title: 'Stress Physiology', text: 'Breaks chronic stress cycles by removing environmental triggers. Nervous system shifts from sympathetic to parasympathetic.' },
                { title: 'Attention & Clarity', text: 'Enhanced focused attention, reduced reactivity to distractions, and clearer relationship with thought patterns.' },
                { title: 'Emotional Regulation', text: 'Sitting with difficult emotions without acting on them builds capacity that transfers directly to daily life.' },
                { title: 'Perspective', text: 'Distance from daily urgencies reveals which concerns are real and which are habitual.' },
                { title: 'Sleep Quality', text: 'Extended meditation normalises circadian rhythm. Retreatants consistently report deeper, more restorative sleep.' },
              ].map((item) => (
                <div key={item.title} className="med-card med-benefit-card">
                  <h3 className="med-h3">{item.title}</h3>
                  <p className="med-body">{item.text}</p>
                </div>
              ))}
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
              <h2 className="med-h2" style={{ textAlign: 'center' }}>Upcoming <span>meditation programs</span></h2>
              <p className="med-body" style={{ textAlign: 'center', maxWidth: '36rem', margin: '0 auto 2rem' }}>
                These are confirmed departures with fixed dates, pricing, and limited seats. Book directly or reach out to discuss.
              </p>

              <div className="med-grid-3">
                {upcomingEvents.map((ev) => {
                  const statusLabel = ev.status === 'filling-fast' ? 'Filling Fast' : ev.status === 'last-few' ? 'Last Few Seats' : 'Open';
                  return (
                    <Link key={ev.slug} href={`/${ev.slug}`} className="med-prog-card">
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
            </div>
          </section>
        )}

        {/* ── DECISION CARDS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Decision Guide</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>Choose the retreat that <span>matches you</span></h2>
            <p className="med-body" style={{ textAlign: 'center', maxWidth: '36rem', margin: '0 auto 2rem' }}>
              The right retreat depends on where you are. Use these decision paths to find your match.
            </p>

            <div className="med-grid-3">
              <Link href="/retreats-for-beginners" className="med-dec-card">
                <div style={{ fontSize: '1.5rem', fontWeight: 200, color: '#0f766e', marginBottom: '0.25rem' }}>01</div>
                <h3 className="med-h3">I&apos;ve Never Done a Retreat</h3>
                <p className="med-body">Start with 3–5 days in Chakrata. Gentle forest setting, guided instruction, no extreme conditions. Our most accessible entry point.</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0f766e' }}>Beginner&apos;s Guide →</span>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.62rem', color: '#6b7280' }}>From ₹14,000</span>
                </div>
              </Link>
              <Link href="/best-meditation-retreats-in-india" className="med-dec-card">
                <div style={{ fontSize: '1.5rem', fontWeight: 200, color: '#0f766e', marginBottom: '0.25rem' }}>02</div>
                <h3 className="med-h3">I Want to Go Deeper</h3>
                <p className="med-body">5–7 days in Chakrata or Zanskar. Extended silence, structured practice, experienced teachers. For practitioners ready for sustained immersion.</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0f766e' }}>Compare Retreats →</span>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.62rem', color: '#6b7280' }}>From ₹32,000</span>
                </div>
              </Link>
              <Link href="/how-to-choose-a-meditation-retreat" className="med-dec-card">
                <div style={{ fontSize: '1.5rem', fontWeight: 200, color: '#0f766e', marginBottom: '0.25rem' }}>03</div>
                <h3 className="med-h3">I Need Radical Disconnection</h3>
                <p className="med-body">7–10 days in Zanskar. Monastery setting, 3,500m, no phone signal. The most immersive meditation environment we offer.</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0f766e' }}>How to Choose →</span>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.62rem', color: '#6b7280' }}>From ₹45,000</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── RETREAT STORIES ── */}
        {PAGE.storyLinks && PAGE.storyLinks.length > 0 && (
          <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
            <div className="med-inner">
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Retreat Stories</span>
              </div>
              <p className="med-body" style={{ marginBottom: '1rem' }}>First-person accounts from people who have done this retreat.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid rgba(15,118,110,0.12)', borderRadius: '12px', overflow: 'hidden' }}>
                {PAGE.storyLinks.map((story, i, arr) => (
                  <Link key={story.href} href={story.href} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(15,118,110,0.08)' : 'none',
                    textDecoration: 'none', background: '#ffffff',
                    fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 400, color: '#2B2A26',
                    transition: 'background 0.2s',
                  }} className="hover:bg-gray-50">
                    <span>{story.label}</span>
                    <span style={{ color: '#0f766e', fontSize: '0.8rem' }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── TRUST BLOCK ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Why Us</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>What makes our retreats <span>different</span></h2>

            <div className="med-grid-3" style={{ marginTop: '1.5rem' }}>
              {[
                { num: '12', label: 'Max Group Size', text: 'Not a meditation factory. Personal attention from experienced teachers. Your questions get answered. Your practice gets seen.' },
                { num: '0', label: 'Commercial Noise', text: 'No tourist traffic, no spa menus, no upsells. Non-commercial Himalayan locations chosen for silence and depth.' },
                { num: '100%', label: 'Designed Retreats', text: 'Every retreat is designed — not packaged. Schedule, location, teacher, season — all chosen deliberately to serve the practice.' },
              ].map((item) => (
                <div key={item.label} className="med-trust-item">
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
        <section className="med-shell med-bottom-cta">
          <div style={{ position: 'absolute', inset: 0 }}>
            <img src="/Images/hero/valley-forest.webp" alt="Himalayan valley — meditation retreat setting" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
            <div className="med-overlay" />
          </div>
          <div className="med-content">
            <h2 style={{
              fontFamily: 'var(--font-fraunces), Georgia, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 500, color: '#ffffff', margin: '0 0 1rem',
              letterSpacing: '-0.02em',
            }}>
              Begin Your <span style={{ color: '#5eead4' }}>Meditation Retreat</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', fontWeight: 300, lineHeight: 1.75, margin: '0 0 2rem' }}>
              The right retreat depends on where you are — your experience, your intention, your schedule. Tell us and we&apos;ll recommend the right location and format.
            </p>
            <Link href="/contact" className="med-cta-btn" style={{ fontSize: '0.85rem', padding: '1rem 2.5rem' }}>
              Plan My Meditation Retreat →
            </Link>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {['Small groups (max 12)', 'All experience levels', '3–10 day programs'].map((trust) => (
                <span key={trust} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', fontWeight: 400, letterSpacing: '0.05em' }}>
                  {trust}
                </span>
              ))}
            </div>
          </div>
        </section>

      </article>
    </TrackedPage>
  );
}