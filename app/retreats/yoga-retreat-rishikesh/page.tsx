import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import PrimaryCTA from '@/components/PrimaryCTA';
import ReviewCard from '@/components/reviews/ReviewCard';
import { getReviewsForSlug } from '@/content/reviews';
import { getFacilitatorsByRetreat } from '@/config/facilitators';
import YogaDepartureCalendar from '@/components/YogaDepartureCalendar';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';
import YogaCommercialSections from '@/components/YogaCommercialSections';
import { getYogaRetreatProduct, type YogaRetreatProductId } from '@/config/retreatProgramEvents';

const PATH = '/retreats/yoga-retreat-rishikesh';
const YOGA_DURATIONS = ['Weekend', '5 days', '7 days', '10 days'] as const;
const DURATION_PRODUCT_IDS: Record<(typeof YOGA_DURATIONS)[number], YogaRetreatProductId> = {
  Weekend: 'yoga-rishikesh-weekend',
  '5 days': 'yoga-rishikesh-5-day',
  '7 days': 'yoga-rishikesh-7-day',
  '10 days': 'yoga-rishikesh-10-day',
};

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Yoga Retreat in Rishikesh | 3, 5, 7 & 10 Day Retreats',
    description:
      'Yoga retreats in Rishikesh: 3, 5, 7, and 10-day formats with exact prices, recurring dates, shared accommodation, meals, and guided practice.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Yoga Retreat in Rishikesh | 3, 5, 7 & 10 Day Retreats',
      description:
        'Explore Rishikesh Yoga retreat formats and request verified current departure details.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Yoga Retreats in Rishikesh'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Is Rishikesh the best place for a yoga retreat in India?',
    answer:
      'Rishikesh is the only location with recurring published Yoga inventory in this product family. Whether it suits you depends on your preferred duration and practice goals; the exact venue and accommodation details are confirmed through WhatsApp.',
  },
  {
    question: 'Are yoga retreats in Rishikesh beginner-friendly?',
    answer:
      'Beginners are welcome, and experienced practitioners may also participate. Share your experience through WhatsApp so the team can confirm the approach for the selected departure.',
  },
  {
    question: 'What is included in a yoga retreat in Rishikesh?',
    answer:
      'Standard pricing represents shared accommodation and includes vegetarian/Sattvic-style breakfast, lunch, dinner, drinking water, and a guided Yoga/practice programme. Private rooms are available on request and priced manually through WhatsApp.',
  },
  {
    question: 'Are yoga retreats in Rishikesh residential?',
    answer:
      'Standard pricing represents shared accommodation. A private room can be requested, but it is not a separate public product and its price is not published. Exact room and venue details are confirmed through WhatsApp.',
  },
  {
    question: 'Can international visitors attend yoga retreats in Rishikesh?',
    answer:
      'Ask the team to confirm the practical details for your selected departure. This page does not make unsupported claims about travel, visa, language, or transfer arrangements.',
  },
  {
    question: 'How is a yoga retreat different from yoga teacher training?',
    answer:
      'A Yoga retreat is for personal practice and immersion. Yoga Teacher Training is a separate study pathway; these retreats do not claim certification. See the dedicated TTC page for that offering.',
  },
  {
    question: 'What should a beginner expect in a first yoga retreat?',
    answer:
      'Expect a flexible practice rhythm built around Hatha Yoga, mindful movement, pranayama, meditation, relaxation, meals, rest, and reflection. The exact daily programme can vary by retreat.',
  },
];

export default async function YogaRetreatRishikeshPage({
  searchParams,
}: {
  searchParams: Promise<{ duration?: string }>;
}) {
  validateFAQSync(FAQ_ITEMS, PATH);

  const requestedDuration = (await searchParams).duration;
  const selectedDuration = YOGA_DURATIONS.find((duration) => duration === requestedDuration);
  const selectedProductId = selectedDuration ? DURATION_PRODUCT_IDS[selectedDuration] : undefined;
  const selectedProduct = selectedProductId ? getYogaRetreatProduct(selectedProductId) : undefined;
  const whatsappText = selectedProduct
    ? `Hi, I'm interested in the ${selectedProduct.name}. Please share the upcoming dates and details.`
    : "Hi, I'm interested in Yoga retreats in Rishikesh. Please share the upcoming dates and details.";

  const facilitator = getFacilitatorsByRetreat('yoga-and-movement')[0];
  const yogaReviews = getReviewsForSlug('yoga-and-movement').filter((review) =>
    review.reviewBody.toLowerCase().includes('rishikesh'),
  );

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Yoga Retreats in Rishikesh', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Yoga Retreats in Rishikesh — 3, 5, 7 & 10 Days"
        description="Compare four Rishikesh Yoga retreat formats with exact prices, recurring dates, shared accommodation, meals, guided practice, and WhatsApp enquiry."
        path={PATH}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Yoga Retreats in Rishikesh' },
        ]}
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

        .med-season-card { padding: 1.6rem; }
        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }

        .med-duration-badge { display: inline-flex; align-items: center; justify-content: center; min-width: 64px; height: 40px; padding: 0 0.9rem; border-radius: 10px; background: #0f766e; color: #fff; font-family: var(--font-fraunces), Georgia, serif; font-size: 1rem; font-weight: 600; margin-bottom: 1rem; }
      `}</style>

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '82vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/location/rishikesh.webp" alt="Yoga retreat, Rishikesh" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Rishikesh Yoga Retreat</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Yoga Retreats in Rishikesh — 3, 5, 7 &amp; 10 Days
          </h1>
          <p style={{ maxWidth: '40rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Compare 3, 5, 7, and 10-day Rishikesh Yoga retreats with exact prices, recurring upcoming dates, shared accommodation, vegetarian/Sattvic-style meals, and guided practices.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['Weekend', '5 days', '7 days', '10 days'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '999px', padding: '0.45rem 0.9rem', background: 'rgba(15,118,110,0.35)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <TrackedWhatsAppLink
              href={`https://wa.me/919760446101?text=${encodeURIComponent(whatsappText)}`}
              sourcePath={PATH}
              location="Rishikesh"
              intent="Yoga retreat enquiry"
              analyticsEvent="yoga_whatsapp_click"
              product={selectedProduct?.name ?? 'Yoga Retreats in Rishikesh'}
              productId={selectedProductId}
              duration={selectedDuration}
              ctaPosition="hero"
              className="med-cta-btn"
            >
              Ask About Upcoming Retreats
            </TrackedWhatsAppLink>
            <a href="#why-rishikesh" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Why Rishikesh</a>
          </div>
        </div>
      </section>

      <YogaCommercialSections sourcePath={PATH} />

      <div id="yoga-enquiry">
        <PrimaryCTA
          label="Plan My Yoga Retreat"
          subtext="Share your preferred duration and timing. We will confirm the current Rishikesh Yoga options through the existing enquiry flow."
          vertical="retreat"
          category="yoga-and-movement"
          sourcePath={PATH}
          location="Rishikesh"
          duration={selectedDuration}
        />
      </div>

      <YogaDepartureCalendar sourcePath={PATH} showEnquiry={false} productId={selectedProductId} />

      {facilitator && (
        <section className="med-shell" style={{ background: '#f7f9f7', padding: '4rem 0' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Your Facilitator</span>
            </div>
            <h2 className="med-h2">Yoga &amp; Movement service profile: <span>{facilitator.name}</span></h2>
            <p className="med-body"><strong>{facilitator.title}.</strong> {facilitator.bio}</p>
            <p className="med-body" style={{ marginBottom: 0 }}>{facilitator.approach} Assignment to a specific future Rishikesh departure is confirmed when that departure is published.</p>
          </div>
        </section>
      )}

      {yogaReviews.length > 0 && (
        <section className="med-shell" style={{ background: '#ffffff', padding: '4rem 0' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Yoga Retreat Experiences</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>What participants <span>experienced</span></h2>
            <div className="med-grid-2" style={{ marginTop: '1.5rem' }}>
              {yogaReviews.map((review) => <ReviewCard key={`${review.participantName}-${review.datePublished}`} review={review} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── INTRO ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Where Practice Begins</span>
          </div>
          <h2 className="med-h2">A personal-practice <span>Yoga retreat</span></h2>
          <p className="med-body">
            Rishikesh is the primary recurring Yoga destination in the current product plan.
            The Yoga &amp; Movement service describes asana, pranayama, meditation, and
            restorative practice. A retreat venue, residential arrangement, and daily programme
            are confirmed only with a published departure.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            Product formats are available to enquire about; a format does not guarantee a
            scheduled date, a riverfront venue, a particular teacher, or any specific included
            activity. Check the calendar or ask the team for the confirmed details.
          </p>
        </div>
      </section>

      {/* ── WHY RISHIKESH ── */}
      <section id="why-rishikesh" className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Why This Town</span>
          </div>
          <h2 className="med-h2">Yoga retreat <span>in Rishikesh</span></h2>
          <p className="med-body">
            Rishikesh has a well-known association with Yoga. This page routes enquiries to
            the retreat products, but the exact practice venue and environment are confirmed
            only for a published departure.
          </p>
          <p className="med-body">
            The retreat service description names Yoga practices, while teacher assignment,
            lineage, class style, session format and experience adaptations are departure-level
            details. Ask for these before choosing a specific programme.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            For other retreat types and destination information, see{' '}
            <Link href="/retreats/rishikesh" style={{ color: '#0f766e', fontWeight: 600 }}>
              Rishikesh retreat programs
            </Link>{' '}
            to see the full range of formats available.
          </p>
        </div>
      </section>

      {/* ── WHAT IT LOOKS LIKE ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Structure</span>
          </div>
          <h2 className="med-h2">What a Yoga Retreat in Rishikesh <span>Looks Like</span></h2>
          <p className="med-body">
            The exact venue, timetable, teaching style, stay, meals, and inclusions depend on
            the selected departure. This page shows product formats and confirmed dates where
            available rather than promising one schedule across every retreat.
          </p>

          <div className="med-card" style={{ padding: '2rem' }}>
            <p className="med-body">
              The existing Yoga &amp; Movement service describes asana, pranayama, meditation, and restorative practice. A current Rishikesh departure schedule is not published, so session times, styles, meals, stay arrangements, inclusions, and exclusions must be confirmed for the selected programme.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              No published departure currently supports a booking CTA. Use the enquiry form to request verified programme details; a published date, price, and availability will appear here only when attached to a real departure.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD CHOOSE ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Who It&apos;s For</span>
          </div>
          <h2 className="med-h2">Who Should Choose a <span>Yoga Retreat</span> in Rishikesh</h2>
          <p className="med-body">
            Share your experience level, access needs, and preferred duration. The team can
            confirm whether the teaching approach for a published departure suits your needs.
          </p>

          <div className="med-card" style={{ padding: '2rem' }}>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Beginners exploring a structured practice.</strong> Ask about the confirmed teaching approach, modifications, and facilitator for the selected departure.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Corporate professionals carrying{' '}
                  <Link href="/retreats/journeys/burnout-recovery" style={{ color: '#0f766e', fontWeight: 600 }}>
                    burnout recovery retreats
                  </Link>.</strong>{' '}
                  No therapeutic or travel-time outcome is promised by this page. Confirm transport, access, and the details of the actual programme. See{' '}
                  <Link href="/retreats/retreats-near-delhi" style={{ color: '#0f766e', fontWeight: 600 }}>
                    retreats near Delhi
                  </Link>{' '}
                  for accessible options.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Visitors planning travel.</strong> Venue, language, transfers, arrival details, and visa requirements should be checked and confirmed for the selected departure.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>People enquiring together.</strong> Share group size and dates; capacity and whether a group can be accommodated are confirmed by departure.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>People comparing durations.</strong> The product formats are Weekend, 5 days, 7 days, and 10 days. Check the individual pages for current published dates.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── BEST TIME ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Timing It Right</span>
          </div>
          <h2 className="med-h2">Best Time for a <span>Yoga Retreat</span> in Rishikesh</h2>
          <p className="med-body">
            Departure-specific season, access, and weather information is not currently published with a future Rishikesh Yoga date. Check the calendar above or ask the team to confirm conditions for the dates being considered.
          </p>
        </div>
      </section>

      {/* ── HOW LONG ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Choosing Duration</span>
          </div>
          <h2 className="med-h2">How Long Should a <span>Yoga Retreat</span> in Rishikesh Be?</h2>
          <p className="med-body">
            Duration shapes the depth. Each format serves a different intention and schedule
            reality.
          </p>

          <p className="med-body">The Rishikesh Yoga product registry supports Weekend, 5-day, 7-day, and 10-day formats. The calendar above lists only published departures; duration-specific pages provide format guidance and enquiry paths.</p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/retreats/yoga-retreat-rishikesh?duration=Weekend#yoga-enquiry" className="med-cta-outline">Weekend</Link>
            <Link href="/5-day-yoga-retreat" className="med-cta-outline">5 days</Link>
            <Link href="/7-day-yoga-retreat" className="med-cta-outline">7 days</Link>
            <Link href="/10-day-yoga-retreat" className="med-cta-outline">10 days</Link>
          </div>
        </div>
      </section>

      {/* ── COMMERCIAL NAVIGATION ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '0 0 3rem' }}>
        <div className="med-inner">
          <div className="med-card" style={{ padding: '1.6rem 1.8rem' }}>
            <p className="med-body" style={{ fontSize: '0.95rem' }}>
              Looking at the full picture? See all{' '}
              <Link href="/retreats/rishikesh" style={{ color: '#0f766e', fontWeight: 600 }}>
                Rishikesh retreat programs
              </Link>{' '}
              including meditation, sound healing, and burnout recovery formats.
            </p>
            <p className="med-body" style={{ margin: 0, fontSize: '0.95rem' }}>
              For yoga programmes across all Himalayan locations, see{' '}
              <Link href="/retreats/yoga-retreat-uttarakhand" style={{ color: '#0f766e', fontWeight: 600 }}>
                yoga retreats in Uttarakhand
              </Link>
              . For all retreat types and destinations, start at{' '}
              <Link href="/retreats/himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>
                Himalayan retreats in India
              </Link>.
            </p>
            <p className="med-body" style={{ margin: '1rem 0 0', fontSize: '0.95rem' }}>
              Compare the existing{' '}
              <Link href="/5-day-yoga-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>5-day</Link>,{' '}
              <Link href="/7-day-yoga-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>7-day</Link>, and{' '}
              <Link href="/10-day-yoga-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>10-day Yoga retreat</Link>{' '}
              formats, or return to the{' '}
              <Link href="/yoga-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>main Yoga hub</Link>.
            </p>
            <p className="med-body" style={{ margin: '1rem 0 0', fontSize: '0.95rem' }}>
              Considering a study pathway? See the separate{' '}
              <Link href="/yoga-teacher-training" style={{ color: '#0f766e', fontWeight: 600 }}>Yoga Teacher Training enquiry</Link>{' '}
              and compare{' '}
              <Link href="/compare/yoga-retreat-vs-yoga-teacher-training" style={{ color: '#0f766e', fontWeight: 600 }}>retreat vs TTC</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '0 0 4.5rem' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Common Questions</span>
          </div>
          <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '48vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/location/rishikesh.webp" alt="Rishikesh yoga retreat setting" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.86)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '42rem', padding: '4rem 1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.5rem, 2.9vw, 2.1rem)', fontWeight: 500, color: '#F6F2E7' }}>Ready to explore Rishikesh Yoga options?</h2>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: 'rgba(246,242,231,0.78)' }}>Talk with us about dates, duration, and the right format for your practice.</p>
          <TrackedWhatsAppLink
            href={`https://wa.me/919760446101?text=${encodeURIComponent(whatsappText)}`}
            sourcePath={PATH}
            location="Rishikesh"
            intent="Yoga retreat enquiry"
            analyticsEvent="yoga_whatsapp_click"
            product={selectedProduct?.name ?? 'Yoga Retreats in Rishikesh'}
            productId={selectedProductId}
            duration={selectedDuration}
            ctaPosition="closing"
            className="med-cta-btn"
          >
            Check Dates &amp; Programs
          </TrackedWhatsAppLink>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <nav className="med-shell" style={{ background: '#ffffff' }}>
        <div className="med-inner" style={{ borderTop: '1px solid rgba(15,118,110,0.1)', padding: '2rem 1.5rem 3.5rem' }}>
          <Link href="/retreats" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
            ← All Retreats
          </Link>
        </div>
      </nav>
    </TrackedPage>
  );
}
