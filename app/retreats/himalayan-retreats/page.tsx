import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import {
  generateCollectionPageSchema,
  generateItemListSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/components/seo/Schema';
import { getAllRetreatServices } from '@/content/retreats/services';
import AllRetreatPrograms from '@/components/AllRetreatPrograms';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import RetreatFinder from '@/components/RetreatFinder';
import { getAggregateRating } from '@/content/reviews';
import Breadcrumb from '@/components/Breadcrumb';
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/retreats/himalayan-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Himalayan Retreats in India | Retreats And Treks',
    description:
      'Guide to Himalayan retreats in India, including yoga, silent, wellness, and creative retreats across Chakrata, Sankri, Munsiyari, and Rishikesh.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Himalayan Retreats in India',
      description:
        'A complete guide to understanding, choosing, and experiencing retreats in the Indian Himalayas.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Himalayan Retreats in India'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Are Himalayan retreats suitable for beginners?',
    answer:
      'Yes. Most Himalayan retreats are designed for people with no prior retreat experience. Clear schedules, guided sessions, and facilitator support make the format accessible to first-time guests. While some silent or intensive formats may recommend basic familiarity with meditation or yoga, many retreats welcome beginners and provide modifications as needed.',
  },
  {
    question: 'How far are Himalayan retreat locations from Delhi or Dehradun?',
    answer:
      'Travel time depends on the location. Mid-altitude Himalayan destinations such as Chakrata can usually be reached by road from Delhi, often suitable for three- to five-day retreats. More remote valleys such as Sankri require longer travel but provide deeper distance from routine. Most retreats provide clear travel guidance in advance.',
  },
  {
    question: 'Is prior yoga or meditation experience required?',
    answer:
      'No. While prior experience can enhance comfort, it is not required for most guided retreats. Sessions are usually guided with options for mixed levels. Participants are encouraged to engage at their own pace rather than perform at a fixed standard.',
  },
  {
    question: 'What is the difference between a Himalayan retreat and a trek?',
    answer:
      'A Himalayan retreat is a guided, teacher-led program focused on reflection, rest, and guided practice. A trek emphasizes physical movement and route-based exploration. Some formats combine both elements, but the main focus of a retreat remains inward, while a trek centers on terrain, movement, and endurance.',
  },
  {
    question: 'What should I pack for a Himalayan retreat?',
    answer:
      'Packing depends on season and altitude. Layered clothing suitable for cooler mornings and evenings is recommended year-round. Comfortable walking shoes, personal medications, reusable water bottles, and basic toiletries are essential. Retreat organizers usually provide clear packing guidance for the location and season.',
  },
  {
    question: 'What is the best time of year for a Himalayan retreat?',
    answer:
      'Spring and autumn are often preferred for stable weather and clear visibility. Summer offers relief from the heat of the plains in mid-altitude regions. Winter retreats are quieter and more introspective but require comfort with colder temperatures. The ideal season depends on your goal rather than weather alone.',
  },
  {
    question: 'What is the cancellation and refund policy?',
    answer:
      'Cancellation and refund terms vary by program and are communicated clearly at the time of booking. Most guided retreat programs offer partial refunds for cancellations made within a defined window before the start date. Participants should review program terms before confirming. We recommend reaching out directly for program cancellation guidance.',
  },
  {
    question: 'Is travel insurance recommended for a Himalayan retreat?',
    answer:
      'Travel insurance is advisable for any Himalayan retreat, particularly for programs in more remote locations. Standard travel insurance covering trip cancellation, medical emergencies, and evacuation is recommended. Participants with existing health conditions should confirm coverage terms with their insurer before travel.',
  },
  {
    question: 'Are Himalayan retreats safe for solo travelers?',
    answer:
      'Yes. Planned retreat formats are well suited for solo travelers. Programs provide social support through shared meals, group sessions, and guided activities, so participants are not isolated. Most retreat participants attend individually. Solo travel to established retreat locations in Uttarakhand and the broader Himalayan region is common and generally safe with standard precautions.',
  },
  {
    question: 'Are dietary restrictions or preferences accommodated?',
    answer:
      'Most Himalayan retreat programs serve vegetarian meals as the default. Common dietary preferences such as vegan, gluten-free, or allergen-related requirements can usually be accommodated with advance notice. Participants should communicate dietary needs at the time of registration to ensure suitable arrangements.',
  },
  {
    question: 'What if I have a medical condition — can I still attend?',
    answer:
      'Many retreat participants have existing health conditions and attend without difficulty, particularly for rest-focused or gentle-movement formats. Participants with serious heart, breathing, or mobility conditions should consult a physician before booking, particularly for higher-altitude locations. Program descriptions outline physical effort levels to help participants assess fit.',
  },
];

export default function HimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const allRetreats = getAllRetreatServices();
  const canonicalUrl = buildCanonicalUrl(PATH);

  const finderRatings = Object.fromEntries(
    allRetreats.flatMap((s) => {
      const r = getAggregateRating(s.slug);
      return r ? [[s.slug, { value: r.ratingValue, count: r.reviewCount }]] : [];
    }),
  );

  const collectionPageSchema = generateCollectionPageSchema({
    name: 'Himalayan Retreats in India',
    description:
      'A selected collection of retreat journeys in the Indian Himalayas — yoga, silent, wellness, creative, and custom experiences across carefully chosen mountain locations.',
    url: canonicalUrl,
  });

  const itemListSchema = generateItemListSchema(
    allRetreats.map((retreat) => ({
      name: retreat.title,
      url: buildCanonicalUrl(`/retreats/journeys/${retreat.slug}`),
    })),
  );

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Himalayan Retreats', url: canonicalUrl },
  ]);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Himalayan Retreats in India"
        description="A complete guide to understanding, choosing, and experiencing retreats in the Indian Himalayas."
        path={PATH}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Himalayan Retreats' },
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

        .med-card-equal { display: flex; flex-direction: column; justify-content: space-between; }

        .med-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem 2.3rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; box-shadow: 0 10px 26px rgba(15,118,110,0.25); transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid #0f766e; }
        .med-cta-btn:hover { background: #0d6b64; transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,118,110,0.32); }
        .med-cta-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.85rem 1.8rem; border: 1px solid rgba(15,118,110,0.25); color: #0f766e; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .med-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: translateY(-2px); }

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 960px) { .med-grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } .med-grid-4 { grid-template-columns: 1fr; } }

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

        .med-location-row { display: grid; grid-template-columns: 0.42fr 0.58fr; min-height: 300px; border-radius: 18px; overflow: hidden; border: 1px solid rgba(15,118,110,0.12); background: #fff; box-shadow: 0 10px 30px rgba(15,31,28,0.05); }
        .med-location-row-alt { grid-template-columns: 0.58fr 0.42fr; }
        .med-location-media { position: relative; min-height: 300px; overflow: hidden; background: #f7f9f7; }
        .med-location-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .med-location-body { padding: 2rem; display: flex; flex-direction: column; justify-content: center; }
        .med-location-body h3 { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.3rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.5rem; letter-spacing: -0.01em; }
        .med-location-body h3 a { color: inherit; text-decoration: none; }
        .med-location-body p { font-family: var(--font-inter), sans-serif; font-size: 0.92rem; line-height: 1.8; color: #4b5259; margin: 0 0 0.85rem; }
        .med-location-body a { color: #0f766e; font-weight: 600; text-decoration: none; }
        .med-location-body a:hover { text-decoration: underline; }

        .med-location-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 0.35rem; }
        .med-location-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 0.7rem 1.5rem; border-radius: 999px; background: #0f766e; color: #fff !important; font-family: var(--font-inter), sans-serif; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none !important; border: 1px solid #0f766e; transition: all 0.3s ease; }
        .med-location-btn:hover { background: #0d6b64; transform: translateY(-2px); text-decoration: none !important; box-shadow: 0 10px 26px rgba(15,118,110,0.25); }

        .med-img { width: 100%; height: auto; border-radius: 18px; display: block; }
        .med-img-cover { width: 100%; height: 220px; object-fit: cover; border-radius: 18px 18px 0 0; }
        .med-card-body { padding: 1.5rem; display: flex; flex-direction: column; flex: 1; }

        .med-dark-card { background: #0b241f; color: #fff; border-color: rgba(255,255,255,0.1); }
        .med-dark-card .med-h3 { color: #fff; }
        .med-dark-card .med-body { color: rgba(255,255,255,0.74); }
        .med-dark-card .med-season-tag { color: #5eead4; background: rgba(94,234,212,0.12); }

        .med-finder-wrap { padding: 2rem; background: #0b241f; border-radius: 18px; border: 1px solid rgba(255,255,255,0.1); }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-card-link { text-decoration: none; display: block; height: 100%; }
        .med-card-link .med-card { height: 100%; display: flex; flex-direction: column; }
        .med-card-link .med-card-body { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
      `}</style>

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/hero/himalayan-sunrise.webp" alt="Himalayan retreats in India" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '4rem 1.5rem 3.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Complete Guide</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.5rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Himalayan Retreats <span style={{ color: '#5eead4' }}>in India</span>
          </h1>
          <div style={{ width: '40px', height: '2px', background: '#5eead4', margin: '0 auto 1.5rem', borderRadius: '2px' }} />
          <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)', marginBottom: '0.5rem' }}>
              Himalayan retreats are guided, multi-day retreat experiences held in the mountain regions of North India. They are designed for planned pause — a shift away from the pace of urban life into a setting that supports clear thinking, physical rest, and reflective space.
            </p>
            <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)', marginBottom: '0' }}>
              Unlike holidays built around entertainment or sightseeing, retreats follow a rhythm rather than spontaneity. Days are gently planned. Practices are guided. Silence is respected. Time in nature is not incidental — it is central to the experience.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.8rem' }}>
            <Link href="#retreat-programs" className="med-cta-btn">Explore retreat programs</Link>
            <Link href="#faq" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>FAQ</Link>
          </div>
        </div>
      </section>

      {/* ── TOPIC NAVIGATION ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Browse by topic</span>
          </div>
          <h2 className="med-h2">Explore Retreat Guides <span>by Topic</span></h2>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <Link href="/retreat-programs" className="med-card" style={{ padding: '1.2rem 1.5rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Compare retreat programs — duration, effort, format</span>
              <span style={{ color: '#0f766e', fontSize: '1.2rem' }}>→</span>
            </Link>
            <Link href="/topics/retreat-decision" className="med-card" style={{ padding: '1.2rem 1.5rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreat Decision Guides</span>
              <span style={{ color: '#0f766e', fontSize: '1.2rem' }}>→</span>
            </Link>
            <Link href="/topics/location-authority" className="med-card" style={{ padding: '1.2rem 1.5rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Location-Based Retreat Guides</span>
              <span style={{ color: '#0f766e', fontSize: '1.2rem' }}>→</span>
            </Link>
            <Link href="/compare/burnout-recovery-vs-rest-and-reset" className="med-card" style={{ padding: '1.2rem 1.5rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Compare: Burnout Recovery vs Rest &amp; Reset</span>
              <span style={{ color: '#0f766e', fontSize: '1.2rem' }}>→</span>
            </Link>
            <Link href="/compare/meditation-and-silence-vs-yoga-and-movement" className="med-card" style={{ padding: '1.2rem 1.5rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gridColumn: '1 / -1' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Compare: Meditation &amp; Silence vs Yoga &amp; Movement</span>
              <span style={{ color: '#0f766e', fontSize: '1.2rem' }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHAT IS A HIMALAYAN RETREAT ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Understanding Retreats</span>
          </div>
          <h2 className="med-h2">What Is a <span>Himalayan Retreat?</span></h2>
          <p className="med-body">
            A Himalayan retreat is a time-bound, teacher-led program conducted in a Himalayan location that brings guided practices into a mountain setting. Most retreats last between three and seven days and follow a deliberate daily rhythm rather than an open-ended itinerary.
          </p>
          <p className="med-body" style={{ marginBottom: '0.5rem' }}>Core components typically include:</p>

          <ul className="med-list" style={{ marginBottom: '1.5rem' }}>
            {[
              'Morning movement practices such as yoga or mobility work',
              'Breathwork or meditation sessions',
              'Guided group reflection or discussion',
              'Quiet periods for reflection',
              'Light nature time or gentle mountain walks',
            ].map((item) => (
              <li key={item} className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">{item}</span>
              </li>
            ))}
          </ul>

          <p className="med-body">
            The defining characteristic of a retreat is clear structure. Participants are not left to design their own schedule. Meals are shared. Phone use is reduced. The emphasis is on inner reset rather than outside noise.
          </p>
          <p className="med-body">
            The mountain setting is not symbolic alone — it is functional. Reduced urban noise, expansive landscapes, and natural daily rhythm create conditions where attention stabilizes more easily. In that sense, the Himalayas are not simply a backdrop to the retreat; they are part of how the retreat works.
          </p>

          <div style={{ width: '40px', height: '1px', background: '#0f766e', margin: '2rem 0' }} />

          <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <span className="med-season-tag">Comparison</span>
                <h3 className="med-h3">Retreat vs Vacation</h3>
                <p className="med-body" style={{ fontSize: '0.88rem' }}>A vacation is organized around choice, leisure, and stimulation. A retreat is organized around rhythm, reduction, and internal focus. Both involve leaving your usual environment — but a retreat deliberately limits options in order to deepen presence.</p>
              </div>
            </div>
            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <span className="med-season-tag">Comparison</span>
                <h3 className="med-h3">Retreat vs Trek</h3>
                <p className="med-body" style={{ fontSize: '0.88rem' }}>A trek is a physical journey through mountain terrain. The emphasis is on movement, endurance, and landscape. A retreat is place-based — you arrive and stay, allowing depth to emerge through stillness rather than distance. Some journeys combine both formats, but they are different in structure. If you are weighing both options, our guide on <Link href="/blog/trek-vs-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>retreat vs trek — which is right for you</Link> may help clarify the decision.</p>
              </div>
            </div>
            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <span className="med-season-tag">Comparison</span>
                <h3 className="med-h3">Retreat vs Ashram Stay</h3>
                <p className="med-body" style={{ fontSize: '0.88rem' }}>Ashram stays are usually longer, rooted in an institution, and tied to a particular spiritual tradition. Himalayan retreats are shorter, more program-led, and often non-denominational. They are designed to be accessible to anyone — regardless of religious orientation or prior practice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY THE HIMALAYAS ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Setting</span>
          </div>
          <h2 className="med-h2">Why the <span>Himalayas?</span></h2>

          <img src="/Images/whyhimalaya/top.webp" alt="Himalayan valley landscape" className="med-img" style={{ marginBottom: '2rem', borderRadius: '18px' }} />

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card med-card-equal" style={{ overflow: 'hidden' }}>
              <img src="/Images/whyhimalaya/environment.webp" alt="Himalayan mountains stillness" className="med-img-cover" />
              <div className="med-card-body">
                <span className="med-season-tag">Environment</span>
                <h3 className="med-h3">Mountain Conditions <span style={{ color: '#0f766e' }}>That Support Stillness</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem' }}>The Himalayan regions of North India offer conditions very different from urban centers. Fewer people, reduced traffic noise, cooler temperatures, and wide landscapes reduce mental overload together. This shift is not just scenic — it directly affects attention.</p>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>In cities, attention is pulled in many directions by movement, sound, light, and digital interruption. In mountain settings, these inputs decrease dramatically. Silence is part of the setting rather than something arranged.</p>
              </div>
            </div>

            <div className="med-card med-card-equal" style={{ overflow: 'hidden' }}>
              <img src="/Images/whyhimalaya/psycological.webp" alt="Himalayan ridge perspective" className="med-img-cover" />
              <div className="med-card-body">
                <span className="med-season-tag">Psychology</span>
                <h3 className="med-h3">Mental Distance <span style={{ color: '#0f766e' }}>from Routine</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem' }}>Retreats depend on separation — not only physical, but mental. The Himalayas create natural distance from usual settings. When daily cues are removed — office buildings, traffic patterns, constant phone and work contact — the mind becomes less reactive and more able to observe.</p>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>This shift happens slowly over the first one to two days. Participants often experience initial restlessness followed by noticeable settling. Without constant reminders of routine, internal patterns become easier to recognize.</p>
              </div>
            </div>

            <div className="med-card med-card-equal" style={{ overflow: 'hidden' }}>
              <img src="/Images/whyhimalaya/cultural.webp" alt="Himalayan village culture" className="med-img-cover" />
              <div className="med-card-body">
                <span className="med-season-tag">Culture</span>
                <h3 className="med-h3">Cultural Pace <span style={{ color: '#0f766e' }}>of Mountain Regions</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem' }}>Many Himalayan communities operate at a slower, less compressed pace than metropolitan centers. Daily life aligns more closely with daylight and seasonal cycles than with work targets.</p>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Retreats hosted in such settings benefit from this rhythm. Meals are unhurried. Silence is socially acceptable. Conversations are measured. The surrounding culture supports the retreat rhythm rather than competing with it.</p>
              </div>
            </div>

            <div className="med-card med-card-equal" style={{ overflow: 'hidden' }}>
              <img src="/Images/whyhimalaya/nature.webp" alt="Nature forest mountain" className="med-img-cover" />
              <div className="med-card-body">
                <span className="med-season-tag">Nature</span>
                <h3 className="med-h3">Nature as Part <span style={{ color: '#0f766e' }}>of the Practice</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem' }}>In Himalayan retreats, nature is part of the program rather than just scenery. Morning sessions may face open landscapes. Walking meditations occur on forest paths. Quiet reflection time is spent outdoors.</p>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Natural light supports daily rhythm. Forest settings support attention recovery. Open horizons reduce visual density and mental compression. These effects are subtle but cumulative across several days.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TYPES OF RETREATS ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Retreat Types</span>
          </div>
          <h2 className="med-h2">Types of <span>Himalayan Retreats</span></h2>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card med-card-equal" style={{ overflow: 'hidden' }}>
              <img src="/Images/himalayanretreats/yoga.webp" alt="Yoga retreat Himalayas" className="med-img-cover" />
              <div className="med-card-body">
                <span className="med-season-tag">Yoga</span>
                <h3 className="med-h3">Yoga <span style={{ color: '#0f766e' }}>Retreats</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Yoga retreats in the Himalayas combine daily movement practice with breathwork and guided meditation in a mountain setting that supports longer, slower sessions than typical urban studio formats. Rather than rushed class schedules, sessions often extend into unhurried practice blocks with space to absorb the work.</p>
              </div>
            </div>

            <div className="med-card med-card-equal" style={{ overflow: 'hidden' }}>
              <img src="/Images/himalayanretreats/silentretreat.webp" alt="Silent retreat mountains" className="med-img-cover" />
              <div className="med-card-body">
                <span className="med-season-tag">Silence</span>
                <h3 className="med-h3">Silent <span style={{ color: '#0f766e' }}>Retreats</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Silent retreats reduce or eliminate spoken communication for defined periods, allowing participants to observe internal patterns without the pull of conversation. In Himalayan settings, silence is reinforced by the setting itself. The absence of traffic and urban noise reduces resistance to quiet formats.</p>
              </div>
            </div>

            <div className="med-card med-card-equal" style={{ overflow: 'hidden' }}>
              <img src="/Images/himalayanretreats/weekend.webp" alt="Wellness reset retreat" className="med-img-cover" />
              <div className="med-card-body">
                <span className="med-season-tag">Wellness</span>
                <h3 className="med-h3">Wellness &amp; Reset <span style={{ color: '#0f766e' }}>Retreats</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Wellness retreats focus on recovery from too much stimulation, burnout, and chronic stress. Programs may include gentle movement, breathwork, calming practices, better sleep, and extended rest periods. Unlike high-pressure programs, reset retreats reduce pressure.</p>
              </div>
            </div>

            <div className="med-card med-card-equal" style={{ overflow: 'hidden' }}>
              <img src="/Images/himalayanretreats/creative.webp" alt="Creative reflection retreat" className="med-img-cover" />
              <div className="med-card-body">
                <span className="med-season-tag">Creative</span>
                <h3 className="med-h3">Creative &amp; Reflection <span style={{ color: '#0f766e' }}>Retreats</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Creative retreats are designed for writers, founders, artists, and professionals who require quiet time to think. The program may include guided reflection sessions, peer dialogue, or protected solitude. Mountain settings reduce outside demands, allowing participants to engage deeply with long-form ideas.</p>
              </div>
            </div>

            <div className="med-card med-card-equal" style={{ overflow: 'hidden', gridColumn: '1 / -1' }}>
              <img src="/Images/himalayanretreats/retreaktrek.webp" alt="Retreat trek hybrid Himalayas" className="med-img-cover" />
              <div className="med-card-body">
                <span className="med-season-tag">Hybrid</span>
                <h3 className="med-h3">Retreat + Trek <span style={{ color: '#0f766e' }}>Hybrid Experiences</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Hybrid formats combine retreat programming with light or moderate trekking components. In these structures, physical movement complements reflection rather than replacing it. Treks may involve ridge walks, forest trails, or short supported routes. The purpose is to use movement through the landscape to deepen the retreat process.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RETREAT JOURNEYS ── */}
      <section id="retreat-programs" className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Retreat Programs</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ textAlign: 'center' }}>Explore Current <span>Retreat Programs</span></h2>

          <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
            {allRetreats.map((retreat) => {
              const retreatImages: Record<string, string> = {
                'rest-reset': '/Images/services/restreset.webp',
                'burnout-recovery': '/Images/services/burnoutrec.webp',
                'yoga-and-movement': '/Images/services/yoga.webp',
                'yoga-movement': '/Images/services/yogamov.webp',
                'meditation-and-silence': '/Images/Journeys/meditation.webp',
                'meditation-silence': '/Images/Journeys/meditation.webp',
                'art-creative': '/Images/services/artcreative.webp',
                'art-and-creative': '/Images/services/artcreative.webp',
                'sound-healing': '/Images/services/soundhealing.webp',
                'weekend-retreat': '/Images/services/weekendretreat.webp',
                'private-custom': '/Images/services/privatecustom.webp',
                'private-and-custom': '/Images/services/privatecustom.webp',
              };
              const imageSrc = retreatImages[retreat.slug] || '/Images/services/restreset.webp';

              return (
                <Link key={retreat.slug} href={`/retreats/journeys/${retreat.slug}`} className="med-card-link">
                  <div className="med-card" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <img src={imageSrc} alt={retreat.title} className="med-img-cover" style={{ height: '180px' }} />
                    <div className="med-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <span className="med-season-tag">Retreat</span>
                        <h3 className="med-h3" style={{ fontSize: '1rem' }}>{retreat.title}</h3>
                        <p className="med-body" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>{retreat.oneLineEssence}</p>
                      </div>
                      <span style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 600 }}>Explore →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-outer">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Where We Work</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ textAlign: 'center' }}>Locations We <span>Host Retreats</span></h2>
          <p className="med-body" style={{ textAlign: 'center', maxWidth: '46rem', margin: '0 auto 2.2rem' }}>
            Himalayan retreats are shaped not only by guiding style but by landscape. Altitude, forest cover, ease of access, and local culture influence the tone of each experience.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* Chakrata */}
            <div className="med-location-row">
              <div className="med-location-media">
                <img src="/Images/location/chakrata.webp" alt="Chakrata forested ridge" />
              </div>
              <div className="med-location-body">
                <span className="med-season-tag">Uttarakhand</span>
                <h3><Link href="/retreats/chakrata">Chakrata — Forested <span style={{ color: '#0f766e' }}>Ridge Environment</span></Link></h3>
                <p>Chakrata sits along a quieter Himalayan ridge in Uttarakhand, characterized by pine forests, open valley views, and fewer tourists compared to busy hill stations. Its elevation maintains cooler temperatures for much of the year, supporting longer outdoor sessions and unhurried pacing.</p>
                <p>Retreats hosted in Chakrata tend to emphasize rest and quiet space. The surrounding forests create natural walking routes for reflection time, while ridge views provide openness without exposure to heavy tourism traffic.</p>
                <div className="med-location-actions">
                  <Link href="/retreats/chakrata" className="med-location-btn">Explore Chakrata →</Link>
                </div>
              </div>
            </div>

            {/* Sankri */}
            <div className="med-location-row med-location-row-alt">
              <div className="med-location-body">
                <span className="med-season-tag">Garhwal Himalayas</span>
                <h3><Link href="/retreats/sankri">Sankri — Valley-Based <span style={{ color: '#0f766e' }}>Mountain Retreats</span></Link></h3>
                <p>Sankri lies deeper in the Garhwal Himalayas and serves as a gateway to several trekking routes. The surrounding valley landscapes are more expansive and alpine in character, with pronounced seasonal variation.</p>
                <p>Retreats hosted in Sankri often include longer nature time, including forest walks and light trekking extensions. The environment supports participants who benefit from movement alongside guided reflection.</p>
                <div className="med-location-actions">
                  <Link href="/retreats/sankri" className="med-location-btn">Explore Sankri →</Link>
                </div>
              </div>
              <div className="med-location-media">
                <img src="/Images/location/sankri.webp" alt="Sankri valley mountain" />
              </div>
            </div>

            {/* Munsiyari */}
            <div className="med-location-row">
              <div className="med-location-media">
                <img src="/Images/location/munsiyari.webp" alt="Munsiyari alpine frontier" />
              </div>
              <div className="med-location-body">
                <span className="med-season-tag">Kumaon Himalayas</span>
                <h3><Link href="/retreats/munsiyari">Munsiyari — Alpine Frontier <span style={{ color: '#0f766e' }}>and Glacier Country</span></Link></h3>
                <p>Munsiyari sits at the edge of the Kumaon Himalayas, facing the Panchachuli massif and the glacial systems of the Gori Ganga valley. This is remote high mountain country — less visited, more elemental. The landscape is vast, the light is sharp, and the silence comes from the land itself.</p>
                <p>Retreats in Munsiyari suit people drawn to altitude and edge. The environment is raw and exposed, which means inner work here tends to be more intense than gentle.</p>
                <div className="med-location-actions">
                  <Link href="/retreats/munsiyari" className="med-location-btn">Explore Munsiyari →</Link>
                </div>
              </div>
            </div>

            {/* Rishikesh */}
            <div className="med-location-row med-location-row-alt">
              <div className="med-location-body">
                <span className="med-season-tag">Himalayan Foothills</span>
                <h3><Link href="/retreats/rishikesh">Rishikesh — Spiritual Tradition <span style={{ color: '#0f766e' }}>on the Ganges</span></Link></h3>
                <p>Rishikesh is not a mountain retreat in the alpine sense. It is the spiritual center of the Indian Himalayan foothills — a place where yoga, meditation, and devotional practice have been lived traditions for millennia. The Ganges is not backdrop here; it is presence.</p>
                <p>Retreats in Rishikesh suit people seeking connection to living spiritual traditions. Ashram rhythms, evening aarti ceremonies, study of spiritual ideas, and teacher-led practices create a setting that is communal rather than isolated.</p>
                <div className="med-location-actions">
                  <Link href="/retreats/rishikesh" className="med-location-btn">Explore Rishikesh →</Link>
                </div>
              </div>
              <div className="med-location-media">
                <img src="/Images/location/rishikesh.webp" alt="Rishikesh Ganges spiritual" />
              </div>
            </div>
          </div>
        </div>

        <style>{`
          /* Mobile overrides only — desktop layout untouched.
             !important used because base .med-location-row / .med-location-media
             styles live in a global stylesheet not included here.
             Plain <style> tag (not styled-jsx) so it works in Server Components. */
          @media (max-width: 900px) {
            .med-shell {
              padding: 3rem 0 !important;
            }
            .med-outer {
              padding-left: 1.5rem !important;
              padding-right: 1.5rem !important;
            }
            .med-location-row {
              display: flex !important;
              flex-direction: column !important;
              grid-template-columns: none !important;
            }
            .med-location-row-alt {
              flex-direction: column !important;
            }
            .med-location-media {
              width: 100% !important;
              order: 1 !important;
            }
            .med-location-body {
              width: 100% !important;
              order: 2 !important;
            }
            .med-location-media img {
              width: 100% !important;
              height: auto !important;
              display: block !important;
            }
          }
          @media (max-width: 640px) {
            .med-h2 {
              font-size: clamp(1.8rem, 7vw, 2.4rem) !important;
            }
            .med-body {
              font-size: 0.9rem !important;
            }
            .med-location-body h3 {
              font-size: 1.1rem !important;
            }
            .med-location-body p {
              font-size: 0.88rem !important;
              line-height: 1.7 !important;
            }
            .med-location-btn {
              width: 100% !important;
              justify-content: center !important;
              text-align: center !important;
            }
          }
          @media (max-width: 480px) {
            .med-outer {
              padding-left: 1.2rem !important;
              padding-right: 1.2rem !important;
            }
            .med-season-tag {
              font-size: 0.6rem !important;
            }
          }
        `}</style>
      </section>

      {/* ── WHO THEY ARE FOR ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Who This Is For</span>
          </div>
          <h2 className="med-h2">Who Himalayan Retreats <span>Are For</span></h2>
          <p className="med-body">
            Himalayan retreats are not limited to people with experience or long-term spiritual seekers. They are guided spaces for people who recognize the need for planned pause.
          </p>
          <p className="med-body" style={{ marginBottom: '0.5rem' }}>They are particularly suited for:</p>

          <ul className="med-list" style={{ marginBottom: '1.5rem' }}>
            {[
              'Professionals experiencing sustained mental fatigue or burnout',
              'Founders and decision-makers seeking clarity away from work pressure',
              'Creatives requiring quiet time to think',
              'Individuals navigating life changes such as career shifts or personal change',
              'First-time retreat guests seeking guided structure rather than being alone without structure',
            ].map((item) => (
              <li key={item} className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">{item}</span>
              </li>
            ))}
          </ul>

          <p className="med-body">
            Retreats in mountain settings are not designed for constant activity. They appeal to individuals comfortable with slower pacing and reflective time. While prior experience in yoga or meditation can be helpful, it is not required in most guided formats.
          </p>
          <p className="med-body">
            The common factor among participants is not background — it is intention. Those who benefit most are willing to step away for a short time from routine, reduce digital input, and engage with a guided rhythm designed for reset.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            Himalayan retreats are less suitable for individuals seeking travel focused on entertainment or high-effort adventure experiences. While trekking extensions may be included, the main focus remains inward.
          </p>
        </div>
      </section>

      {/* ── BEST TIME ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Seasonality</span>
          </div>
          <h2 className="med-h2">Best Time for a <span>Himalayan Retreat</span></h2>
          <p className="med-body">
            The season shapes both the natural setting and the mental tone of a retreat. While Himalayan retreats operate across much of the year, each season creates a different experience.
          </p>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <span className="med-season-tag">March – May</span>
                <h3 className="med-h3">Spring <span style={{ color: '#0f766e' }}>(March–May)</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Spring offers moderate temperatures, blooming landscapes, and increasing daylight hours. Forest regions are particularly vibrant during this period, making it well suited for retreats that include longer outdoor sessions and light walking practices. Spring retreats often feel balanced — neither intensely introspective nor socially dense — and are generally comfortable for first-time participants.</p>
              </div>
            </div>

            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <span className="med-season-tag">June – July</span>
                <h3 className="med-h3">Summer <span style={{ color: '#0f766e' }}>(June–July)</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Summer provides relief from the heat of the plains, especially in mid-altitude Himalayan regions. Retreats during this time attract participants seeking cooler climates and distance from city settings. While some areas may experience monsoon onset toward late July, many retreat locations can still run with changed outdoor plans.</p>
              </div>
            </div>

            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <span className="med-season-tag">September – November</span>
                <h3 className="med-h3">Autumn <span style={{ color: '#0f766e' }}>(September–November)</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Autumn is characterized by clear skies, stable weather, and high visibility across mountain ranges. This season is often best for retreats that include light trekking extensions. The post-monsoon clarity deepens time in the landscape, making it a preferred period for participants who value wide mountain views alongside guided practice.</p>
              </div>
            </div>

            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <span className="med-season-tag">December – February</span>
                <h3 className="med-h3">Winter <span style={{ color: '#0f766e' }}>(December–February)</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Winter retreats are quieter and more introspective in tone. Cooler temperatures naturally reduce external activity and encourage indoor practice formats, journaling, and longer quiet sessions. For participants comfortable with colder climates, winter retreats can offer deeper stillness and lower tourist density. Access may vary depending on altitude and weather conditions.</p>
              </div>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.5rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>Choosing the right season depends less on "ideal weather" and more on personal intention. Those seeking outdoor activity may prefer spring or autumn, while individuals seeking deeper quiet often resonate with winter formats.</p>
          </div>
        </div>
      </section>

      {/* ── HOW TO CHOOSE ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Decision Guide</span>
          </div>
          <h2 className="med-h2">How to Choose the Right <span>Himalayan Retreat</span></h2>
          <p className="med-body">
            Selecting a Himalayan retreat involves more than choosing a location. The structure, duration, and guiding style all shape the experience. Knowing your reason before booking reduces mismatch between expectation and format.
          </p>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '2.5rem', fontWeight: 300, color: '#0f766e', marginBottom: '0.5rem' }}>01</div>
                <h3 className="med-h3">Duration and <span style={{ color: '#0f766e' }}>Intensity</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Short retreats of three to four days provide a guided pause without requiring extended time away from work. Longer formats allow more time to settle and go deeper. For a clear comparison, see <Link href="/blog/3-day-vs-5-day-himalayan-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>how to choose the right retreat length</Link>. Effort level varies as well. Some retreats follow full-day programming with early starts and guided sessions. Others maintain spacious schedules with extended rest periods.</p>
              </div>
            </div>

            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '2.5rem', fontWeight: 300, color: '#0f766e', marginBottom: '0.5rem' }}>02</div>
                <h3 className="med-h3">Physical Movement <span style={{ color: '#0f766e' }}>Level</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Not all retreats emphasize physical activity. Some focus primarily on meditation and reflection, while others integrate yoga, forest walks, or light trekking. Participants should assess their comfort with movement at moderate elevation. Retreat descriptions typically clarify whether physical endurance is central or optional.</p>
              </div>
            </div>

            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '2.5rem', fontWeight: 300, color: '#0f766e', marginBottom: '0.5rem' }}>03</div>
                <h3 className="med-h3">Group Size and <span style={{ color: '#0f766e' }}>Facilitation Style</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Smaller groups often allow more personalized guidance and quieter dynamics. Larger groups may create broader social interaction and shared energy. Facilitation style also differs. Some retreats emphasize guided instruction, while others encourage independent reflection within a clear structure. Reading facilitator profiles and program outlines helps clarify expectations.</p>
              </div>
            </div>

            <div className="med-card med-card-equal" style={{ padding: '1.5rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: '2.5rem', fontWeight: 300, color: '#0f766e', marginBottom: '0.5rem' }}>04</div>
                <h3 className="med-h3">Accessibility and <span style={{ color: '#0f766e' }}>Travel Considerations</span></h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>Travel plans affect the overall experience. Locations closer to Delhi or major transit hubs may suit shorter retreats. More remote valleys provide deeper separation but require additional travel time. Understanding travel time, terrain, and seasonal access supports better planning.</p>
              </div>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.5rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>The best retreat choice matches setting, structure, and your goal. Clarity before arrival allows participants to engage fully once the program begins. For a ranked comparison across every category, see our guide to the <Link href="/retreats/best-retreat-in-uttarakhand" style={{ color: '#0f766e', fontWeight: 600 }}>best retreats in Uttarakhand</Link>.</p>
          </div>
        </div>
      </section>

     {/* ── FIND MY RETREAT ── */}
<section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
  <div className="med-inner">
    <div className="med-eyebrow">
      <span className="med-eyebrow-line" />
      <span className="med-eyebrow-text">Decision Assistant</span>
    </div>
    <h2 className="med-h2">Not sure which retreat <span>is right for you?</span></h2>
    <p className="med-body" style={{ marginBottom: '2rem' }}>Answer five questions. Get your top two matches from the registry — no login required.</p>
    <div className="med-card" style={{ padding: '2rem' }}>
      <RetreatFinder fromPath={PATH} ratings={finderRatings} />
    </div>
  </div>
</section>

      {/* ── EXPLORE PROGRAMS ── */}
      <AllRetreatPrograms />

      {/* ── FAQ ── */}
      <section id="faq" className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Common Questions</span>
          </div>
          <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ── NAVIGATION ── */}
      <nav className="med-shell" style={{ background: '#f7f9f7', padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-nav-grid">
            <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Retreats</span>
            </Link>
            <Link href="/retreats/uttarakhand-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Uttarakhand Retreats</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/retreats/weekend-himalayan-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Weekend Retreats</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/retreats/retreats-near-delhi" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreats Near Delhi</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
          </div>
        </div>
      </nav>
    </TrackedPage>
  );
}
