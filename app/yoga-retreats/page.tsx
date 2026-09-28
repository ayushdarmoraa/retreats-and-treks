import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { getExperiencePage } from '@/config/experiencePages';
import { getReviewSchemasForPage } from '@/lib/reviewsSchema';
import { getReviewsForSlug } from '@/content/reviews';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import ReviewCard from '@/components/reviews/ReviewCard';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';
import YogaDepartureCalendar from '@/components/YogaDepartureCalendar';

const PAGE = getExperiencePage('yoga-retreats')!;
const PATH = '/yoga-retreats';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Yoga Retreats in Rishikesh & the Himalayas | Retreats And Treks',
    description:
      'Yoga retreats in Rishikesh and the Himalayas, from weekend practice to 5-, 7-, and 10-day formats, with Yoga Teacher Training and custom retreat enquiries.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Yoga Retreats in Rishikesh & the Himalayas',
      description:
        'Yoga retreats in Rishikesh and the Himalayas with asana, pranayama, meditation, Yoga Teacher Training, and custom retreat enquiries.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Yoga Retreats in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is a yoga retreat?',
    answer:
      'A yoga retreat is a multi-day period of structured practice rather than a single drop-in class. The day usually combines asana, pranayama, meditation, rest, and time in the surrounding environment. The format is designed for personal practice and restoration, not teacher certification.',
  },
  {
    question: 'Do I need to be flexible or experienced to join a yoga retreat?',
    answer:
      'The Yoga service describes practice for different experience levels, but beginner suitability and session adaptations are not published for a future departure. Share your experience and ask the team to confirm the approach for the programme being considered.',
  },
  {
    question: 'How is a yoga retreat different from a normal yoga class?',
    answer:
      'A regular class usually lasts an hour and ends when the session ends. A retreat changes the entire environment: you practise in the morning light, eat in a rhythm aligned with the day, rest between sessions, and stay immersed in the setting for several days. That continuity matters. You do not just attend yoga — you live inside a practice rhythm, which makes breathwork, meditation, and recovery much easier to absorb.',
  },
  {
    question: 'What style of yoga is taught at Himalayan retreats?',
    answer:
      'The Yoga service describes asana, pranayama, meditation, and restorative practice. A specific style, teacher, and session structure are not published for future departures; ask for the details of the programme before booking.',
  },
  {
    question: 'How does altitude affect yoga practice?',
    answer:
      'Altitude varies between Rishikesh and the higher Himalayan locations. It can affect comfort and exertion, so confirm location conditions and suitability for your circumstances before choosing a programme. No altitude-specific schedule or suitability is published for an upcoming Yoga departure.',
  },
  {
    question: 'What is included in the retreat price?',
    answer:
      'No future Yoga departure currently publishes a confirmed price, meal plan, accommodation, daily schedule, inclusions, or exclusions. Request the written details for a proposed programme before making plans.',
  },
  {
    question: 'Can I combine yoga with trekking?',
    answer:
      'A scheduled trek-and-Yoga combination is not represented in the Yoga product registry. Ask whether a custom combination can be arranged for your preferred location and dates.',
  },
  {
    question: 'How long should a yoga retreat be?',
    answer:
      'A weekend format is useful when time is limited. Five days gives a first retreat enough time to establish a rhythm, while seven and ten days allow longer immersion. The right choice depends on your time, experience, and whether you want a reset or a deeper period of practice.',
  },
  {
    question: 'Are Yoga Teacher Training and a yoga retreat the same?',
    answer:
      'No. A yoga retreat is primarily for personal practice, restoration, and immersion. Yoga Teacher Training is a more structured learning pathway for people who want to study yoga in greater depth and explore teaching. Ask for current TTC details rather than assuming a retreat includes certification.',
  },
  {
    question: 'How do I check dates and pricing?',
    answer:
      'Current fixed departures are shown only when they exist in the retreat event registry. When no upcoming Rishikesh Yoga departure is available, enquire with your preferred dates, duration, location, and experience level so the team can confirm current options and pricing.',
  },
];

const PRACTICE_ELEMENTS = [
  {
    title: 'Morning Asana',
    description: 'Asana practice is described in the Yoga & Movement service. Confirm session timing and format for the selected departure.',
    time: 'Timing not published',
  },
  {
    title: 'Pranayama & Breathwork',
    description: 'Pranayama is part of the existing Yoga & Movement description. Confirm whether and how it is included in a current programme.',
    time: 'Timing not published',
  },
  {
    title: 'Free Time & Nature',
    description: 'Unstructured time and nature activities depend on the selected location and departure; ask for the current itinerary.',
    time: 'Schedule not published',
  },
  {
    title: 'Evening Practice',
    description: 'Restorative practice is described in the existing Yoga service. Confirm the sessions and timings offered on the selected departure.',
    time: 'Timing not published',
  },
];

const BENEFITS = [
  { title: 'Location Conditions', text: 'Altitude, weather, access, and practice settings differ by location. Confirm conditions and suitability for the dates and programme being considered.' },
  { title: 'Programme Details', text: 'Practice style, session timing, teaching assignment, and adaptations are confirmed for a published departure or proposed enquiry.' },
  { title: 'Published Formats', text: 'Weekend, 5-day, 7-day, and 10-day Rishikesh formats are listed as products. A format does not mean a date is scheduled.' },
  { title: 'Enquiry Path', text: 'When dates or location-specific arrangements are not published, use the enquiry form to request current details.' },
];

const LOCATIONS = [
  {
    name: 'Rishikesh',
    id: 'rishikesh',
    href: '/retreats/yoga-retreat-rishikesh',
    tagline: 'The Yoga Capital',
    description: 'The primary Yoga product location. Dates, venue, teaching assignment, schedule, and availability are shown only when published.',
    bestFor: 'Compare published Rishikesh product formats',
    altitude: '372m',
    image: '/Images/location/rishikesh.webp',
  },
  {
    name: 'Chakrata',
    id: 'chakrata/yoga-retreat',
    href: '/retreats/chakrata/yoga-retreat',
    tagline: 'On-request Yoga enquiry',
    description: 'A demand-led enquiry. No recurring Yoga departure or location-specific schedule is currently published.',
    bestFor: 'Ask whether a custom programme is feasible',
    altitude: '2,200m',
    image: '/Images/location/chakrata.webp',
  },
  {
    name: 'Zanskar',
    id: 'yoga-retreat-zanskar',
    href: '/yoga-retreat-zanskar',
    tagline: 'On-request Yoga enquiry',
    description: 'A demand-led enquiry. Access, dates, altitude suitability, and programme details require confirmation.',
    bestFor: 'Request current feasibility and suitability details',
    altitude: '3,500m',
    image: '/Images/location/zanskar.webp',
  },
  {
    name: 'Sankri',
    id: 'sankri',
    href: '/retreats/sankri/yoga-retreat',
    tagline: 'On-request Yoga enquiry',
    description: 'A demand-led enquiry. No fixed Yoga departure or scheduled trek-and-Yoga combination is currently published.',
    bestFor: 'Ask about a location-specific enquiry',
    altitude: '1,920m',
    image: '/Images/location/sankri.webp',
  },
];

const DURATION_OPTIONS = [
  { label: 'Weekend', detail: 'A shorter format; current Rishikesh Yoga dates are shown only when published.', href: '/retreats/yoga-retreat-rishikesh?duration=Weekend#yoga-enquiry' },
  { label: '5 days', detail: 'A Rishikesh product format. Dates and programme details appear only when published.', href: '/5-day-yoga-retreat' },
  { label: '7 days', detail: 'A Rishikesh product format. Dates and programme details appear only when published.', href: '/7-day-yoga-retreat' },
  { label: '10 days', detail: 'A Rishikesh product format. Dates and programme details appear only when published.', href: '/10-day-yoga-retreat' },
];

export default function YogaRetreatsPage() {
  const { reviewSchemas, aggregateSchema } = getReviewSchemasForPage(PAGE);
  const allReviews = PAGE.retreatServiceSlugs.flatMap((slug) => getReviewsForSlug(slug));
  const topReviews = allReviews.filter((r) => r.ratingValue >= 4).slice(0, 3);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Yoga Retreats', url: buildCanonicalUrl(PATH) },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  // Split heading for teal last word
  const h1Words = 'Yoga Retreats in Rishikesh & the Himalayas'.split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Yoga Retreats in Rishikesh & the Himalayas"
        description="Yoga retreats in Rishikesh and the Himalayas, from weekend practice to 5-, 7-, and 10-day formats, with Yoga Teacher Training and custom retreat enquiries."
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

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-hero-section {
          position: relative;
          overflow: hidden;
          min-height: 78vh;
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

        /* ── FAQ Accordion (shared pattern) ── */
        .med-faq-accordion { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.5rem; }
        .med-faq-details { background: #fff; border: 1px solid rgba(15,118,110,0.1); border-radius: 12px; overflow: hidden; transition: border-color 0.3s ease; }
        .med-faq-details:hover { border-color: rgba(15,118,110,0.25); }
        .med-faq-details[open] { border-color: rgba(15,118,110,0.3); }
        .med-faq-summary {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.25rem 1.5rem; cursor: pointer; list-style: none;
          font-family: var(--font-inter), sans-serif; font-size: 0.95rem; font-weight: 500; color: #2B2A26;
          transition: background 0.2s ease; user-select: none; gap: 1rem;
        }
        .med-faq-summary::-webkit-details-marker { display: none; }
        .med-faq-summary:hover { background: rgba(15,118,110,0.03); }
        .med-faq-details[open] .med-faq-summary { background: rgba(15,118,110,0.04); border-bottom: 1px solid rgba(15,118,110,0.06); }
        .med-faq-question { flex: 1; }
        .med-faq-icon { flex-shrink: 0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; color: #0f766e; transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .med-faq-details[open] .med-faq-icon { transform: rotate(45deg); }
        .med-faq-icon svg { width: 20px; height: 20px; stroke-width: 2; transition: stroke-width 0.2s ease; }
        .med-faq-summary:hover .med-faq-icon svg { stroke-width: 2.5; }
        .med-faq-answer { padding: 0 1.5rem 1.5rem; animation: med-faq-slide 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes med-faq-slide { 0% { opacity: 0; transform: translateY(-12px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .med-faq-answer .med-body { margin: 0; font-size: 0.92rem; color: #4b5259; }

        /* ── Page-specific: yoga ── */
        .med-yoga-strip { display: flex; justify-content: center; gap: 2.5rem; flex-wrap: wrap; }
        .med-yoga-strip-item { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }

        .med-yoga-benefit-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.25rem; }
        @media (max-width: 720px) { .med-yoga-benefit-grid { grid-template-columns: 1fr; } }
        .med-yoga-benefit-card { padding: 1.6rem; }
        .med-yoga-benefit-card .med-h3 { font-size: 0.98rem; margin-bottom: 0.4rem; }
        .med-yoga-benefit-card .med-body { font-size: 0.86rem; margin-bottom: 0; }

        .med-yoga-timeline { position: relative; padding-left: 2rem; margin: 2rem 0; }
        .med-yoga-timeline::before { content: ''; position: absolute; top: 0; bottom: 0; left: 8px; width: 2px; background: rgba(15,118,110,0.2); }
        .med-yoga-timeline-item { position: relative; margin-bottom: 2rem; }
        .med-yoga-timeline-item:last-child { margin-bottom: 0; }
        .med-yoga-timeline-item::before { content: ''; position: absolute; top: 8px; left: -2rem; width: 14px; height: 14px; background: #fff; border: 2px solid #0f766e; border-radius: 50%; transform: translateX(-7px); }
        .med-yoga-timeline-item .med-time { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; font-weight: 600; color: #0f766e; letter-spacing: 0.05em; display: block; margin-bottom: 0.3rem; }
        .med-yoga-timeline-item .med-h3 { font-size: 1.02rem; margin-bottom: 0.2rem; }
        .med-yoga-timeline-item .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-yoga-loc-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
        @media (max-width: 820px) { .med-yoga-loc-grid { grid-template-columns: 1fr; } }
        .med-yoga-loc-card {
          display: flex; flex-direction: column; text-decoration: none; color: inherit;
          background: #fff; border-radius: 18px; overflow: hidden; border: 1px solid rgba(15,118,110,0.12);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .med-yoga-loc-card:hover { transform: translateY(-6px); box-shadow: 0 22px 48px rgba(15,31,28,0.12); border-color: rgba(15,118,110,0.28); }
        .med-yoga-loc-card .med-img-wrap { position: relative; width: 100%; aspect-ratio: 16/9; overflow: hidden; background: #f0f2f0; flex-shrink: 0; }
        .med-yoga-loc-card .med-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.22,1,0.36,1); }
        .med-yoga-loc-card:hover .med-img { transform: scale(1.08); }
        .med-yoga-loc-card .med-content { padding: 1.5rem; display: flex; flex-direction: column; gap: 0.4rem; flex: 1; }
        .med-yoga-loc-card .med-alt { font-family: var(--font-inter), sans-serif; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: #0f766e; font-weight: 700; }
        .med-yoga-loc-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.2rem; }
        .med-yoga-loc-card .med-body { font-size: 0.85rem; margin-bottom: 0; flex: 1; }
        .med-yoga-loc-card .med-best { font-family: var(--font-inter), sans-serif; font-size: 0.62rem; letter-spacing: 0.08em; color: #6b7280; font-weight: 500; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid rgba(15,118,110,0.06); }

        .med-yoga-funnel-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
        @media (max-width: 720px) { .med-yoga-funnel-grid { grid-template-columns: 1fr; } }
        .med-yoga-funnel-card {
          padding: 1.75rem; text-decoration: none; text-align: center;
          display: flex; flex-direction: column; gap: 0.5rem; align-items: center;
        }
        .med-yoga-funnel-card .med-num { font-family: var(--font-inter), sans-serif; font-size: 1.8rem; font-weight: 200; color: #0f766e; margin-bottom: 0.25rem; }
        .med-yoga-funnel-card .med-h3 { font-size: 0.92rem; margin-bottom: 0; }
        .med-yoga-funnel-card .med-body { font-size: 0.78rem; margin-bottom: 0; }
        .med-yoga-funnel-card .med-link { font-family: var(--font-inter), sans-serif; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #0f766e; margin-top: auto; padding-top: 0.5rem; }

        .med-yoga-prog-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
        @media (max-width: 720px) { .med-yoga-prog-grid { grid-template-columns: 1fr; } }
        .med-yoga-prog-card {
          background: #fff; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px;
          overflow: hidden; transition: transform 0.35s, box-shadow 0.35s, border-color 0.3s;
          display: flex; flex-direction: column; text-decoration: none; color: inherit;
        }
        .med-yoga-prog-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); border-color: rgba(15,118,110,0.3); }
        .med-yoga-prog-card .med-header { padding: 1.5rem 1.5rem 0; display: flex; justify-content: space-between; align-items: flex-start; }
        .med-yoga-prog-card .med-body-wrap { padding: 1rem 1.5rem 1.5rem; flex: 1; display: flex; flex-direction: column; }

        .med-yoga-trust-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
        @media (max-width: 720px) { .med-yoga-trust-grid { grid-template-columns: 1fr; } }
        .med-yoga-trust-item { text-align: center; padding: 2rem 1.5rem; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; background: #fff; transition: border-color 0.2s; }
        .med-yoga-trust-item:hover { border-color: rgba(15,118,110,0.25); }

        .med-yoga-bottom-cta { position: relative; overflow: hidden; min-height: 50vh; display: flex; align-items: center; justify-content: center; text-align: center; }
        .med-yoga-bottom-cta .med-overlay { position: absolute; inset: 0; background: rgba(4,12,10,0.88); }
        .med-yoga-bottom-cta .med-content { position: relative; z-index: 2; max-width: 44rem; padding: 4rem 2rem; }
        .med-yoga-bottom-cta .med-content .med-h2 { color: #fff; margin-bottom: 1rem; }
        .med-yoga-bottom-cta .med-content .med-h2 span { color: #5eead4; }
        .med-yoga-bottom-cta .med-content .med-body { color: rgba(255,255,255,0.6); margin-bottom: 2rem; }
        .med-yoga-bottom-cta .med-content .med-trust { display: flex; justify-content: center; gap: 1.5rem; margin-top: 1.5rem; flex-wrap: wrap; }
        .med-yoga-bottom-cta .med-content .med-trust span { font-family: var(--font-inter), sans-serif; font-size: 0.68rem; color: rgba(255,255,255,0.35); font-weight: 400; letter-spacing: 0.05em; }
      `}</style>

      {reviewSchemas.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, ...reviewSchemas, ...(aggregateSchema ? [aggregateSchema] : [])]) }} />
      )}
      {reviewSchemas.length === 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      )}

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Retreats', href: '/retreats' }, { name: 'Yoga Retreats' }]} />
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Yoga &amp; Movement</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Explore Rishikesh Yoga product formats, the separate unpublished TTC enquiry path, and demand-led location enquiries. Dates and programme details are shown only when published or confirmed.
            </p>
            <div className="med-hero-tags">
              <span>Suitability by programme</span>
              <span>Teacher by departure</span>
              <span>Weekend, 5, 7, and 10 days</span>
              <span>Dates only when published</span>
            </div>
            <div className="med-hero-actions">
              <Link href="/find-your-retreat?type=yoga" className="med-cta-btn">Help Me Choose →</Link>
              <a href="#locations" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Explore Locations ↓</a>
            </div>
          </div>
        </section>

        {/* ── INFO STRIP ── */}
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '2rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-yoga-strip">
              {[
                { label: 'Locations', value: 'Rishikesh + enquiry locations' },
                { label: 'Group Size', value: 'Confirmed per departure' },
                { label: 'Practice', value: 'Details by departure' },
                { label: 'Experience', value: 'Suitability by departure' },
              ].map((item) => (
                <div key={item.label} className="med-yoga-strip-item">
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b7280', fontWeight: 500 }}>{item.label}</span>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', color: '#2B2A26', fontWeight: 400 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT IS A YOGA RETREAT ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Understanding Yoga Retreats</span>
            </div>
            <h2 className="med-h2">What is <span>a yoga retreat</span>?</h2>

            <div className="med-grid-2" style={{ alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p className="med-body">A Yoga retreat is a multi-day format for personal practice. The practices, daily rhythm, venue, and inclusions depend on the published departure or the programme proposed through enquiry.</p>
                <p className="med-body">Location conditions differ. Confirm access, season, altitude considerations, and the practice setting for the selected location and dates.</p>
                <p className="med-body">Beginner suitability and session adaptations are not universal promises. Share your experience and ask the team to confirm the approach for a specific programme.</p>
              </div>
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/9' }}>
                <img src="/Images/experience-hubs/yoga-group.png" alt="Group yoga practice on a platform in a Himalayan setting" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY HIMALAYAN YOGA IS DIFFERENT ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Why the Himalayas</span>
            </div>
            <h2 className="med-h2">Why <span>Himalayan yoga</span> is different</h2>
            <p className="med-body">Altitude, weather, access, quiet, and practice settings vary by location and season. Confirm current conditions and suitability for the dates and programme being considered.</p>

            <div className="med-yoga-benefit-grid" style={{ marginTop: '1.5rem' }}>
              {BENEFITS.map((item) => (
                <div key={item.title} className="med-card med-yoga-benefit-card">
                  <h3 className="med-h3">{item.title}</h3>
                  <p className="med-body">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── A DAY AT THE RETREAT ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Experience</span>
            </div>
            <h2 className="med-h2">What a day <span>looks like</span></h2>

            <div className="med-yoga-timeline">
              {PRACTICE_ELEMENTS.map((phase, idx) => (
                <div key={idx} className="med-yoga-timeline-item">
                  <span className="med-time">{phase.time}</span>
                  <h3 className="med-h3">{phase.title}</h3>
                  <p className="med-body">{phase.description}</p>
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
            <h2 className="med-h2">Who yoga retreats are <span>for</span></h2>

            <div className="med-grid-2" style={{ marginTop: '1.5rem' }}>
              <div>
                <h3 className="med-h3" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0f766e', marginBottom: '1rem' }}>
                  Consider this enquiry if you are
                </h3>
                <ul className="med-list">
                  {[
                    'A yoga practitioner seeking deeper connection with practice',
                    'Someone wanting to reconnect body and breath in nature',
                    'Looking for a physically grounded retreat, not purely meditative',
                    'Curious about yoga as a path to presence, not performance',
                    'Considering a custom Yoga enquiry, including whether another activity can be combined',
                    'Seeking confirmed teacher and programme details before choosing',
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
                    'A fitness-focused power yoga boot camp',
                    'Resort-style yoga with poolside relaxation',
                    'Teacher training certification',
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
        <section id="locations" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Where We Practice</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>Yoga settings <span>across the Himalayas</span></h2>
            <p className="med-body" style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 2rem' }}>Compare the four locations by access, conditions, and the programme details confirmed for your enquiry.</p>

            <div className="med-yoga-loc-grid">
              {LOCATIONS.map((loc) => (
                <Link key={loc.id} href={loc.href} className="med-yoga-loc-card">
                  <div className="med-img-wrap">
                    <img src={loc.image} alt={`${loc.name} — yoga retreat location`} className="med-img" />
                  </div>
                  <div className="med-content">
                    <span className="med-alt">{loc.altitude} altitude</span>
                    <h3 className="med-h3">{loc.name} — {loc.tagline}</h3>
                    <p className="med-body">{loc.description}</p>
                    <span className="med-best">Best for: {loc.bestFor}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CHOOSE YOUR RETREAT ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Choose Your Retreat</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>Start with the <span>right duration</span></h2>
            <p className="med-body" style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 2rem' }}>Rishikesh is the primary Yoga retreat setting. Choose a format that fits your time, or ask us to help shape a location-specific Himalayan retreat.</p>
            <div className="med-yoga-prog-grid">
              {DURATION_OPTIONS.map((option) => (
                <Link key={option.label} href={option.href} className="med-card" style={{ padding: '1.5rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  <h3 className="med-h3" style={{ marginBottom: 0 }}>{option.label} Yoga Retreat</h3>
                  <p className="med-body" style={{ fontSize: '0.86rem', marginBottom: 0, flex: 1 }}>{option.detail}</p>
                  <span className="med-link" style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0f766e' }}>Explore format →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── YOGA TEACHER TRAINING ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Go Deeper</span>
            </div>
            <h2 className="med-h2">Yoga Teacher <span>Training</span></h2>
            <p className="med-body">A retreat is for your own practice: movement, breath, meditation, rest, and space to reset. Yoga Teacher Training is a separate, more structured learning pathway for people who want to study yoga in greater depth and explore teaching.</p>
            <p className="med-body">Yoga Teacher Training is separate from a personal-practice retreat. Current TTC dates, locations, duration, fees, curriculum, eligibility, accommodation, meals, facilitator, and certification details are not published here.</p>
            <Link href="/yoga-teacher-training" className="med-cta-outline">Request TTC details →</Link>
          </div>
        </section>

        {/* ── GUIDED DECISION FUNNEL ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Not Sure Where to Start</span>
                <span className="med-eyebrow-line" />
              </div>
              <h2 className="med-h2" style={{ marginBottom: '0.5rem' }}>Three ways to find <span>your yoga retreat</span></h2>
              <p className="med-body" style={{ maxWidth: '36rem', margin: '0 auto' }}>Choose the path that feels right for where you are right now.</p>
            </div>

            <div className="med-yoga-funnel-grid">
              <Link href="/find-your-retreat?type=yoga" className="med-card med-yoga-funnel-card">
                <span className="med-num">01</span>
                <h3 className="med-h3">Get Matched</h3>
                <p className="med-body">Tell us about your practice, preferred duration, and location. The existing retreat finder is the best place to start when you are unsure.</p>
                <span className="med-link">Help me choose →</span>
              </Link>
              <Link href="/retreats/yoga-retreat-rishikesh" className="med-card med-yoga-funnel-card">
                <span className="med-num">02</span>
                <h3 className="med-h3">Compare Locations</h3>
                <p className="med-body">Compare the Rishikesh product with on-request location enquiries; suitability and programme details require confirmation.</p>
                <span className="med-link">Explore Rishikesh →</span>
              </Link>
              <Link href="/retreats-for-beginners" className="med-card med-yoga-funnel-card">
                <span className="med-num">03</span>
                <h3 className="med-h3">First Yoga Retreat?</h3>
                <p className="med-body">Read general guidance, then confirm beginner suitability for the specific programme.</p>
                <span className="med-link">Beginner&apos;s guide →</span>
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

        <YogaDepartureCalendar sourcePath={PATH} />

        {/* ── RELATED GUIDES ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Explore Further</span>
            </div>
            <h2 className="med-h2">Related <span>guides</span></h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/retreats/yoga-retreat-rishikesh" className="med-cta-outline">Yoga Retreat in Rishikesh →</Link>
              <Link href="/retreats/yoga-retreat-uttarakhand" className="med-cta-outline">Yoga Retreats in Uttarakhand →</Link>
              <Link href="/retreats/journeys/yoga-and-movement" className="med-cta-outline">Yoga &amp; Movement service →</Link>
              <Link href="/retreat-calendar" className="med-cta-outline">All retreat dates →</Link>
              <Link href="/retreat-programs" className="med-cta-outline">Compare retreat programmes →</Link>
              <Link href="/compare/chakrata-yoga-retreat-vs-rishikesh-yoga-retreat" className="med-cta-outline">Rishikesh vs Chakrata Yoga →</Link>
              <Link href="/compare/5-day-yoga-retreat-vs-7-day-yoga-retreat" className="med-cta-outline">5-day vs 7-day Yoga →</Link>
              <Link href="/compare/yoga-retreat-vs-yoga-teacher-training" className="med-cta-outline">Yoga retreat vs TTC →</Link>
              <Link href="/5-day-yoga-retreat" className="med-cta-outline">5-Day Yoga Retreat →</Link>
              <Link href="/meditation-retreats" className="med-cta-outline">Meditation Retreats →</Link>
              <Link href="/retreats-for-beginners" className="med-cta-outline">Retreats for Beginners →</Link>
              <Link href="/retreats/himalayan-retreats" className="med-cta-outline">Himalayan retreats guide →</Link>
              <Link href="/retreats/retreats-near-delhi" className="med-cta-outline">Retreats near Delhi →</Link>
              <Link href="/summer-retreat-himalayas" className="med-cta-outline">Seasonal planning →</Link>
              <Link href="/blog/how-to-reach-rishikesh-for-a-retreat" className="med-cta-outline">Rishikesh travel guide →</Link>
              <Link href="/blog/how-to-reach-sankri-for-a-retreat" className="med-cta-outline">Sankri travel guide →</Link>
              <Link href="/blog/how-to-reach-chakrata-for-a-retreat" className="med-cta-outline">Chakrata travel guide →</Link>
              <Link href="/how-to-reach-zanskar-for-a-retreat" className="med-cta-outline">Zanskar travel guide →</Link>
            </div>
          </div>
        </section>

        {/* ── TRUST & DIFFERENTIATION ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Why Us</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>What makes our retreats <span>different</span></h2>

            <div className="med-yoga-trust-grid">
              {[
                { label: 'Practice outline', text: 'The Yoga & Movement service describes possible practice elements. Sessions and daily structure are confirmed for a published departure or proposed enquiry.' },
                { label: 'Facilitator by departure', text: 'A facilitator is shown only when assigned to a published departure. Ask who would lead a proposed demand-led programme.' },
                { label: 'Real enquiry', text: 'Dates, pricing, and location-specific details are confirmed through the existing enquiry and event systems instead of being assumed on this hub.' },
              ].map((item) => (
                <div key={item.label} className="med-yoga-trust-item">
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.3rem', fontWeight: 500, color: '#0f766e', display: 'block', marginBottom: '0.75rem' }}>{item.label}</span>
                  <p className="med-body" style={{ fontSize: '0.82rem', marginBottom: 0 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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

        {/* ── BOTTOM CTA ── */}
        <section className="med-yoga-bottom-cta">
          <div style={{ position: 'absolute', inset: 0 }}>
            <img src="/Images/hero/himalayan-sunrise.webp" alt="Himalayan sunrise — yoga retreat setting" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
            <div className="med-overlay" />
          </div>
          <div className="med-content">
            <h2 className="med-h2">Begin Your <span>Yoga Retreat</span></h2>
            <p className="med-body">Tell us about your practice and preferred location. The team can confirm current published options or review a demand-led enquiry.</p>
            <Link href="/find-your-retreat?type=yoga" className="med-cta-btn">Help Me Choose →</Link>
            <div className="med-trust">
              <span>Suitability confirmed by programme</span>
              <span>Dates and availability by enquiry</span>
              <span>Weekend, 5-, 7-, and 10-day formats</span>
            </div>
          </div>
        </section>

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Retreats</span>
              </Link>
              <Link href="/retreats/yoga-retreat-rishikesh" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Yoga in Rishikesh</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/meditation-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Meditation Retreats</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/find-your-retreat?type=yoga" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
