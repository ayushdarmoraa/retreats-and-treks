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

const PATH = '/retreats/himalayan-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Himalayan Retreats in India',
    description:
      'A complete guide to understanding, choosing, and experiencing retreats in the Indian Himalayas. Yoga, silent, wellness, and creative retreat experiences across Chakrata, Sankri, Munsiyari, and Rishikesh.',
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
      'Yes. Most Himalayan retreats are designed to accommodate participants with no prior retreat experience. Structured schedules, guided sessions, and facilitator support make the format accessible to first-time attendees. While some silent or intensive formats may recommend basic familiarity with meditation or yoga, many retreats explicitly welcome beginners and provide modifications as needed.',
  },
  {
    question: 'How far are Himalayan retreat locations from Delhi or Dehradun?',
    answer:
      'Travel time depends on the specific location. Mid-altitude Himalayan destinations such as Chakrata can typically be reached within a manageable road journey from Delhi, often suitable for three- to five-day retreats. More remote valleys such as Sankri require longer travel durations but provide deeper geographical separation. Most retreats provide clear travel guidance in advance.',
  },
  {
    question: 'Is prior yoga or meditation experience required?',
    answer:
      'No. While prior experience can enhance comfort, it is not required for most structured retreats. Sessions are typically guided with variations to support mixed levels. Participants are encouraged to engage at their own pace rather than perform at a fixed standard.',
  },
  {
    question: 'What is the difference between a Himalayan retreat and a trek?',
    answer:
      'A Himalayan retreat is a structured, facilitator-led program focused on reflection, rest, and guided practice. A trek emphasizes physical movement and route-based exploration. Some formats combine both elements, but the primary orientation of a retreat remains inward, whereas a trek centers on terrain progression and physical endurance.',
  },
  {
    question: 'What should I pack for a Himalayan retreat?',
    answer:
      'Packing depends on season and altitude. Layered clothing suitable for cooler mornings and evenings is recommended year-round. Comfortable walking shoes, personal medications, reusable water bottles, and basic toiletries are essential. Retreat organizers typically provide detailed packing guidance tailored to the specific location and season.',
  },
  {
    question: 'What is the best time of year for a Himalayan retreat?',
    answer:
      'Spring and autumn are often preferred for stable weather and clear visibility. Summer offers relief from the heat of the plains in mid-altitude regions. Winter retreats are quieter and more introspective but require comfort with colder temperatures. The ideal season depends on personal intention rather than weather alone.',
  },
  {
    question: 'What is the cancellation and refund policy?',
    answer:
      'Cancellation and refund terms vary by program and are communicated clearly at the time of booking. Most structured retreat programs offer partial refunds for cancellations made within a defined window before the start date. Participants are encouraged to review specific program terms before confirming. We recommend reaching out directly for program-specific cancellation guidance.',
  },
  {
    question: 'Is travel insurance recommended for a Himalayan retreat?',
    answer:
      'Travel insurance is advisable for any Himalayan retreat, particularly for programs in more remote locations. Standard travel insurance covering trip cancellation, medical emergencies, and evacuation is recommended. Participants with pre-existing conditions should confirm coverage terms with their insurer before travel.',
  },
  {
    question: 'Are Himalayan retreats safe for solo travelers?',
    answer:
      'Yes. Structured retreat formats are well suited for solo travelers. Programs provide social containment through shared meals, group sessions, and facilitated activities, so participants are not isolated. Most retreat participants attend individually. Solo travel to established retreat locations in Uttarakhand and the broader Himalayan region is common and generally safe with standard precautions.',
  },
  {
    question: 'Are dietary restrictions or preferences accommodated?',
    answer:
      'Most Himalayan retreat programs serve vegetarian meals as the default. Common dietary preferences such as vegan, gluten-free, or allergen-specific requirements can typically be accommodated with advance notice. Participants should communicate dietary needs at the time of registration to ensure appropriate arrangements.',
  },
  {
    question: 'What if I have a medical condition — can I still attend?',
    answer:
      'Many retreat participants have pre-existing conditions and attend without difficulty, particularly for rest-focused or gentle-movement formats. Participants with significant cardiovascular, respiratory, or mobility conditions should consult a physician before booking, particularly for higher-altitude locations. Program descriptions outline physical intensity levels to help participants self-assess suitability.',
  },
];

export default function HimalayanRetreatsPage() {
  // Validate FAQ structural data integrity at render time
  validateFAQSync(FAQ_ITEMS, PATH);

  const allRetreats = getAllRetreatServices();
  const canonicalUrl = buildCanonicalUrl(PATH);

  // Pre-compute ratings for Finder (null entries excluded)
  const finderRatings = Object.fromEntries(
    allRetreats.flatMap((s) => {
      const r = getAggregateRating(s.slug);
      return r ? [[s.slug, { value: r.ratingValue, count: r.reviewCount }]] : [];
    }),
  );

  const collectionPageSchema = generateCollectionPageSchema({
    name: 'Himalayan Retreats in India',
    description:
      'A curated collection of retreat journeys in the Indian Himalayas — yoga, silent, wellness, creative, and custom experiences across carefully chosen mountain locations.',
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
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Himalayan Retreats' },
        ]}
      />

      <article>

       {/* ── HERO ──────────────────────────────────────────────────── */}
<header style={{ marginBottom: 'var(--space-xl)' }}>
  <style>{`
    .hr-hero {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #ffffff;
      padding: 5rem 0 4rem;
      border-bottom: 1px solid #e5e7eb;
      margin-bottom: var(--space-xl);
    }
    .hr-hero-inner {
      max-width: 64rem;
      margin: 0 auto;
      padding: 0 var(--space-md, 1.5rem);
    }
    .hr-hero-eyebrow {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }
    .hr-hero-eyebrow-line {
      width: 24px; height: 1px;
      background: var(--color-primary);
      
      flex-shrink: 0;
      display: inline-block;
    }
    .hr-hero-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #374151;
    }
    .hr-hero-h1 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1.8rem, 3.5vw, 2.6rem);
      font-weight: 200;
      letter-spacing: -0.035em;
      color: #111111;
      line-height: 1.1;
      margin: 0 0 2rem;
      max-width: 48rem;
    }
    .hr-hero-divider {
      width: 40px; height: 2px;
      background: var(--color-primary);
      
      margin-bottom: 2rem;
      border-radius: 2px;
    }
    .hr-hero-body {
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
      max-width: 52rem;
    }
    .hr-hero-p {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem;
      font-weight: 300;
      line-height: 1.9;
      color: #555555;
      margin: 0;
      padding-left: 1.25rem;
      border-left: 2px solid transparent;
      transition: border-color 0.3s, color 0.3s;
    }
    .hr-hero-p:first-child {
      border-left-color: #374151;
      color: #3a3a3a;
      font-size: 1rem;
    }
    .hr-hero-p:hover {
      border-left-color: rgba(15,118,110,0.3);
    }
  `}</style>

  <div className="hr-hero">
    <div className="hr-hero-inner">

      {/* Eyebrow */}
      <div className="hr-hero-eyebrow">
        <span className="hr-hero-eyebrow-line" />
        <span className="hr-hero-eyebrow-text">Complete Guide</span>
      </div>

      {/* H1 — content same */}
      <h1 className="hr-hero-h1">
        Himalayan Retreats in India
      </h1>

      <div className="hr-hero-divider" />

      {/* Body paras — content exactly same */}
      <div className="hr-hero-body">
        <p className="hr-hero-p">
          Himalayan retreats are structured, multi-day immersion experiences held in the mountain
          regions of North India. They are designed for intentional pause — a shift away from the
          pace of urban life into an environment that supports mental clarity, physical restoration,
          and reflective space.
        </p>
        <p className="hr-hero-p">
          Unlike holidays built around entertainment or sightseeing, retreats operate on rhythm
          rather than spontaneity. Days are gently structured. Practices are guided. Silence is
          respected. Time in nature is not incidental — it is central to the experience.
        </p>
        <p className="hr-hero-p">
          In the Indian Himalayas, geography itself becomes part of the retreat container. Forested
          slopes, wide valleys, cooler air, and lower sensory density create conditions that make
          slowing down natural rather than forced. Participants often report that the most
          noticeable change is not dramatic insight, but a gradual return to steadiness — deeper
          sleep, clearer thinking, reduced internal noise.
        </p>
        <p className="hr-hero-p">
          This guide explains what Himalayan retreats are, how they differ from other forms of
          travel, what formats exist, and how to choose the right retreat depending on your
          experience level and personal intention.
        </p>
      </div>

    </div>
  </div>
</header>

       {/* ── TOPIC NAVIGATION ──────────────────────────────────────── */}
<section style={{ marginBottom: 'var(--space-xl)' }}>
  <style>{`
    .tn-wrap {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #f7f9f7;
      padding: 4rem 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .tn-inner {
      max-width: 64rem;
      margin: 0 auto;
      padding: 0 var(--space-md, 1.5rem);
    }
    .tn-eyebrow {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }
    .tn-eyebrow-line {
      width: 24px; height: 1px;
      background: var(--color-primary);
      
      flex-shrink: 0;
      display: inline-block;
    }
    .tn-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #374151;
    }
    .tn-h2 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1.4rem, 2.5vw, 1.85rem);
      font-weight: 200;
      letter-spacing: -0.03em;
      color: #111111;
      line-height: 1.15;
      margin: 0 0 2rem;
    }
    .tn-h2 span { color: #374151; }

    .tn-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 0.75rem;
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .tn-item {
      position: relative;
      overflow: hidden;
      border: 1px solid #eef0ee;
      border-radius: 6px;
      background: #ffffff;
      transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
    }
    .tn-item::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 3px;
      background: var(--color-primary);
      transform: scaleY(0);
      transform-origin: bottom;
      transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
    }
    .tn-item:hover {
      border-color: rgba(15,118,110,0.3);
      box-shadow: 0 6px 20px rgba(0,0,0,0.07);
      transform: translateY(-2px);
    }
    .tn-item:hover::before { transform: scaleY(1); }

    .tn-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem 1rem 1.4rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.88rem;
      font-weight: 300;
      color: #333333;
      text-decoration: none;
      line-height: 1.5;
      transition: color 0.2s;
      gap: 1rem;
    }
    .tn-link:hover { color: #374151; }

    .tn-arrow {
      font-size: 0.7rem;
      color: #374151;
      
      flex-shrink: 0;
      transition: opacity 0.2s, transform 0.2s;
    }
    .tn-item:hover .tn-arrow {
      
      transform: translateX(3px);
    }
  `}</style>

  <div className="tn-wrap">
    <div className="tn-inner">

      <div className="tn-eyebrow">
        <span className="tn-eyebrow-line" />
        <span className="tn-eyebrow-text">Browse by topic</span>
      </div>

      <h2 className="tn-h2">
        Explore Retreat Guides by Topic
      </h2>

      <ul className="tn-grid">
        <li className="tn-item">
          <Link href="/retreat-programs" className="tn-link">
            Compare all retreat programs — duration, intensity, format
            <span className="tn-arrow">→</span>
          </Link>
        </li>
        <li className="tn-item">
          <Link href="/topics/retreat-decision" className="tn-link">
            Retreat Decision Guides
            <span className="tn-arrow">→</span>
          </Link>
        </li>
        <li className="tn-item">
          <Link href="/topics/location-authority" className="tn-link">
            Location-Based Retreat Guides
            <span className="tn-arrow">→</span>
          </Link>
        </li>
        <li className="tn-item">
          <Link href="/compare/burnout-recovery-vs-rest-and-reset" className="tn-link">
            Compare: Burnout Recovery vs Rest &amp; Reset
            <span className="tn-arrow">→</span>
          </Link>
        </li>
        <li className="tn-item">
          <Link href="/compare/meditation-and-silence-vs-yoga-and-movement" className="tn-link">
            Compare: Meditation &amp; Silence vs Yoga &amp; Movement
            <span className="tn-arrow">→</span>
          </Link>
        </li>
      </ul>

    </div>
  </div>
</section>

        {/* ── WHAT IS A HIMALAYAN RETREAT ───────────────────────────── */}
<section style={{ marginBottom: 'var(--space-xl)' }}>
  <style>{`
    .whr-wrap {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #ffffff;
      padding: 5rem 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .whr-inner {
      max-width: 64rem;
      margin: 0 auto;
      padding: 0 var(--space-md, 1.5rem);
    }
    .whr-eyebrow {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }
    .whr-eyebrow-line {
      width: 24px; height: 1px;
      background: var(--color-primary);
      
      flex-shrink: 0;
      display: inline-block;
    }
    .whr-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #374151;
    }
    .whr-h2 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1.4rem, 2.5vw, 1.85rem);
      font-weight: 200;
      letter-spacing: -0.03em;
      color: #111111;
      line-height: 1.15;
      margin: 0 0 2rem;
    }
    .whr-h2 span { color: #374151; }

    /* Body text */
    .whr-p {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem;
      font-weight: 300;
      line-height: 1.9;
      color: #555555;
      margin: 0 0 1rem;
    }
    .whr-p-label {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem;
      font-weight: 300;
      line-height: 1.9;
      color: #555555;
      margin: 0 0 0.5rem;
    }

    /* Core components list */
    .whr-list {
      list-style: none;
      padding: 0;
      margin: 0 0 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .whr-list-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.9rem;
      font-weight: 300;
      color: #444444;
      line-height: 1.6;
      padding: 0.75rem 1rem;
      background: #f7f9f7;
      border-radius: 4px;
      border-left: 2px solid rgba(15,118,110,0.25);
      transition: border-color 0.2s, background 0.2s;
    }
    .whr-list-item:hover {
      border-left-color: #374151;
      background: #f0f7f0;
    }
    .whr-list-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--color-primary);
      
      flex-shrink: 0;
      margin-top: 0.45rem;
    }

    /* Divider */
    .whr-divider {
      width: 40px; height: 1px;
      background: var(--color-primary);
      
      margin: 2rem 0;
    }

    /* Comparison cards */
    .whr-compare-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1rem;
      margin-top: 2rem;
    }
    .whr-compare-card {
      border: 1px solid #eef0ee;
      border-radius: 8px;
      padding: 1.5rem 1.75rem;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      position: relative;
      overflow: hidden;
      transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
    }
    .whr-compare-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: var(--color-primary);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
    }
    .whr-compare-card:hover {
      border-color: rgba(15,118,110,0.25);
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
      transform: translateY(-3px);
    }
    .whr-compare-card:hover::before { transform: scaleX(1); }

    .whr-compare-label {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.58rem;
      font-weight: 600;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #374151;
      margin: 0 0 0.5rem;
    }
    .whr-compare-h3 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 1rem;
      font-weight: 500;
      color: #111111;
      margin: 0 0 0.75rem;
      letter-spacing: -0.01em;
    }
    .whr-compare-p {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.87rem;
      font-weight: 300;
      line-height: 1.8;
      color: #666666;
      margin: 0;
    }
    .whr-compare-p a {
      color: #374151;
      text-decoration: none;
      border-bottom: 1px solid rgba(15,118,110,0.25);
      transition: border-color 0.2s;
    }
    .whr-compare-p a:hover { border-bottom-color: #374151; }
  `}</style>

  <div className="whr-wrap">
    <div className="whr-inner">

      {/* Eyebrow */}
      <div className="whr-eyebrow">
        <span className="whr-eyebrow-line" />
        <span className="whr-eyebrow-text">Understanding Retreats</span>
      </div>

      {/* H2 */}
      <h2 className="whr-h2">
        What Is a Himalayan Retreat? 
      </h2>

      {/* Body */}
      <p className="whr-p">
        A Himalayan retreat is a time-bound, facilitator-led program conducted in a Himalayan
        location that integrates guided practices with immersion in a mountain environment. Most
        retreats last between three and seven days and follow a deliberate daily rhythm rather
        than an open-ended itinerary.
      </p>

      <p className="whr-p-label">Core components typically include:</p>

      <ul className="whr-list">
        {[
          'Morning movement practices such as yoga or mobility work',
          'Breathwork or meditation sessions',
          'Facilitated group reflection or structured discussion',
          'Quiet periods for integration',
          'Light nature immersion or gentle mountain walks',
        ].map((item) => (
          <li key={item} className="whr-list-item">
            <span className="whr-list-dot" />
            {item}
          </li>
        ))}
      </ul>

      <p className="whr-p">
        The defining characteristic of a retreat is intentional structure. Participants are not
        left to design their own schedule. Meals are shared. Digital engagement is reduced. The
        emphasis is on internal recalibration rather than external stimulation.
      </p>

      <p className="whr-p">
        The mountain setting is not symbolic alone — it is functional. Reduced urban noise,
        expansive landscapes, and natural circadian alignment create conditions where attention
        stabilizes more easily. In that sense, the Himalayas are not simply a backdrop to the
        retreat; they are part of its operating environment.
      </p>

      <div className="whr-divider" />

      {/* Comparison cards */}
      <div className="whr-compare-grid">

        <div className="whr-compare-card">
          <p className="whr-compare-label">Comparison</p>
          <h3 className="whr-compare-h3">Retreat vs Vacation</h3>
          <p className="whr-compare-p">
            A vacation is organized around choice, leisure, and stimulation. A retreat is organized
            around rhythm, reduction, and internal focus. Both involve leaving your usual environment
            — but a retreat deliberately limits options in order to deepen presence.
          </p>
        </div>

        <div className="whr-compare-card">
          <p className="whr-compare-label">Comparison</p>
          <h3 className="whr-compare-h3">Retreat vs Trek</h3>
          <p className="whr-compare-p">
            A trek is a physical journey through mountain terrain. The emphasis is on movement,
            endurance, and landscape. A retreat is place-based — you arrive and stay, allowing depth
            to emerge through stillness rather than distance. Some journeys combine both formats, but
            they are structurally distinct. If you are weighing both options, our guide on{' '}
            <Link href="/blog/trek-vs-retreat">retreat vs trek — which is right for you</Link>{' '}
            may help clarify the decision.
          </p>
        </div>

        <div className="whr-compare-card">
          <p className="whr-compare-label">Comparison</p>
          <h3 className="whr-compare-h3">Retreat vs Ashram Stay</h3>
          <p className="whr-compare-p">
            Ashram stays are typically longer-term, institutionally rooted, and tied to a specific
            spiritual tradition. Himalayan retreats are shorter, more program-specific, and often
            non-denominational. They are designed to be accessible to anyone — regardless of
            religious orientation or prior practice.
          </p>
        </div>

      </div>

    </div>
  </div>
</section>

        {/* ── WHY THE HIMALAYAS ─────────────────────────────────────── */}
<section style={{ marginBottom: 'var(--space-xl)' }}>
  <style>{`
    .wh-wrap {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #f7f9f7;
      padding: 5rem 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .wh-inner {
      max-width: 64rem;
      margin: 0 auto;
      padding: 0 var(--space-md, 1.5rem);
    }
    .wh-eyebrow {
      display: flex; align-items: center;
      gap: 0.75rem; margin-bottom: 1.25rem;
    }
    .wh-eyebrow-line {
      width: 24px; height: 1px;
      background: var(--color-primary); 
      flex-shrink: 0; display: inline-block;
    }
    .wh-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem; font-weight: 500;
      letter-spacing: 0.28em; text-transform: uppercase;
      color: #374151;
    }
    .wh-h2 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1.4rem, 2.5vw, 1.85rem);
      font-weight: 200; letter-spacing: -0.03em;
      color: #111111; line-height: 1.15;
      margin: 0 0 2.5rem;
    }
    .wh-h2 span { color: #374151; }

    /* Hero image */
    .wh-hero-img {
      width: 100%; height: 320px;
      object-fit: cover; object-position: center 60%;
      border-radius: 8px;
      margin-bottom: 3rem;
      display: block;
      box-shadow: 0 4px 24px rgba(0,0,0,0.12);
    }

    /* Cards grid */
    .wh-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    @media (max-width: 700px) {
      .wh-grid { grid-template-columns: 1fr; }
      .wh-hero-img { height: 220px; }
    }

    .wh-card {
      background: #ffffff;
      border: 1px solid #eef0ee;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
      transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s, border-color 0.3s;
      position: relative;
    }
    .wh-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 36px rgba(0,0,0,0.09);
      border-color: rgba(15,118,110,0.25);
    }
    .wh-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: var(--color-primary);
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
    }
    .wh-card:hover::before { transform: scaleX(1); }

    .wh-card-img {
      width: 100%; height: 160px;
      object-fit: cover; display: block;
      transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .wh-card:hover .wh-card-img { transform: scale(1.05); }

    .wh-card-img-wrap { overflow: hidden; position: relative; }
    .wh-card-img-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(2,10,2,0.5) 0%, transparent 60%);
    }

    .wh-card-body { padding: 1.5rem 1.75rem 1.75rem; }

    .wh-card-label {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem; font-weight: 600;
      letter-spacing: 0.22em; text-transform: uppercase;
      color: #374151;
      margin: 0 0 0.5rem;
    }
    .wh-card-h3 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 1rem; font-weight: 500;
      color: #111111; margin: 0 0 1rem;
      letter-spacing: -0.01em; line-height: 1.3;
    }
    .wh-card-p {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.87rem; font-weight: 300;
      line-height: 1.85; color: #666666; margin: 0 0 0.75rem;
    }
    .wh-card-p:last-child { margin: 0; }
  `}</style>

  <div className="wh-wrap">
    <div className="wh-inner">

      <div className="wh-eyebrow">
        <span className="wh-eyebrow-line" />
        <span className="wh-eyebrow-text">The Setting</span>
      </div>

      <h2 className="wh-h2">
        Why the Himalayas?
      </h2>

      {/* Hero image */}
      <img
        src="/Images/whyhimalaya/top.webp"
        alt="Himalayan valley landscape"
        className="wh-hero-img"
      />

      <div className="wh-grid">

        {/* Card 1 */}
        <div className="wh-card">
          <div className="wh-card-img-wrap">
            <img
              src="/Images/whyhimalaya/environment.webp"
              alt="Himalayan mountains stillness"
              className="wh-card-img"
            />
            <div className="wh-card-img-overlay" />
          </div>
          <div className="wh-card-body">
            <p className="wh-card-label">Environment</p>
            <h3 className="wh-card-h3">Environmental Conditions That Support Stillness</h3>
            <p className="wh-card-p">
              The Himalayan regions of North India offer environmental conditions fundamentally
              different from urban centers. Lower population density, reduced traffic noise, cooler
              temperatures, and expansive landscapes collectively reduce sensory overload. This shift
              is not aesthetic alone — it directly affects how attention functions.
            </p>
            <p className="wh-card-p">
              In cities, perception is constantly fragmented by movement, sound, light, and digital
              interruption. In mountain settings, these inputs decrease dramatically. Silence is
              ambient rather than curated. The nervous system is not continually stimulated. As
              external input reduces, internal awareness becomes easier to sustain.
            </p>
            <p className="wh-card-p">
              Even moderate elevation subtly alters breathing patterns and encourages slower pacing.
              While retreats are not high-altitude expeditions, the mountain climate itself supports
              clarity and rest.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="wh-card">
          <div className="wh-card-img-wrap">
            <img
              src="/Images/whyhimalaya/psycological.webp"
              alt="Himalayan ridge perspective"
              className="wh-card-img"
            />
            <div className="wh-card-img-overlay" />
          </div>
          <div className="wh-card-body">
            <p className="wh-card-label">Psychology</p>
            <h3 className="wh-card-h3">Psychological Distance from Routine</h3>
            <p className="wh-card-p">
              Retreats depend on separation — not only physical, but psychological. The Himalayas
              create natural distance from habitual environments. When daily cues are removed — office
              buildings, traffic patterns, constant connectivity — the mind becomes less reactive and
              more observational.
            </p>
            <p className="wh-card-p">
              This transition unfolds gradually over the first one to two days. Participants often
              experience initial restlessness followed by noticeable settling. Without constant
              reinforcement of routine, internal patterns become easier to recognize. Reflection
              becomes less abstract and more embodied.
            </p>
            <p className="wh-card-p">
              Wide valleys and open ridgelines reinforce perspective. In psychological terms,
              perspective reduces urgency. Challenges that feel immediate in urban environments often
              feel proportionate in mountain settings.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="wh-card">
          <div className="wh-card-img-wrap">
            <img
              src="/Images/whyhimalaya/cultural.webp"
              alt="Himalayan village culture"
              className="wh-card-img"
            />
            <div className="wh-card-img-overlay" />
          </div>
          <div className="wh-card-body">
            <p className="wh-card-label">Culture</p>
            <h3 className="wh-card-h3">Cultural Pace of Mountain Regions</h3>
            <p className="wh-card-p">
              Many Himalayan communities operate at a slower, less compressed pace than metropolitan
              centers. Daily life aligns more closely with daylight and seasonal cycles than with
              productivity metrics.
            </p>
            <p className="wh-card-p">
              Retreats hosted in such environments benefit from this rhythm. Meals are unhurried.
              Silence is socially acceptable. Conversations are measured. The surrounding culture
              supports the retreat container rather than competing with it.
            </p>
            <p className="wh-card-p">
              This is not romanticization. It is contextual reinforcement. Environment shapes
              behavior. A retreat conducted in a high-intensity setting must counteract its
              surroundings. In the Himalayas, the surroundings reinforce intention.
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="wh-card">
          <div className="wh-card-img-wrap">
            <img
              src="/Images/whyhimalaya/nature.webp"
              alt="Nature forest mountain"
              className="wh-card-img"
            />
            <div className="wh-card-img-overlay" />
          </div>
          <div className="wh-card-body">
            <p className="wh-card-label">Nature</p>
            <h3 className="wh-card-h3">Nature as a Functional Component, Not Decoration</h3>
            <p className="wh-card-p">
              In Himalayan retreats, nature is integrated into the program rather than treated as
              scenery. Morning sessions may face open landscapes. Walking meditations occur on forest
              paths. Quiet integration time is spent outdoors.
            </p>
            <p className="wh-card-p">
              Natural light exposure regulates circadian rhythm. Forest environments support
              attentional recovery. Open horizons reduce visual density and mental compression. These
              effects are subtle but cumulative across several days.
            </p>
            <p className="wh-card-p">
              For this reason, retreat location is not interchangeable. A high-density tourist town
              does not create the same conditions as a quieter valley or forested ridge. Geography
              meaningfully shapes experience.
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

{/* ── TYPES OF RETREATS ─────────────────────────────────────── */}
<section style={{ marginBottom: 'var(--space-xl)' }}>
  <style>{`
    .tr-wrap {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #ffffff;
      padding: 5rem 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .tr-inner {
      max-width: 64rem;
      margin: 0 auto;
      padding: 0 var(--space-md, 1.5rem);
    }
    .tr-eyebrow {
      display: flex; align-items: center;
      gap: 0.75rem; margin-bottom: 1.25rem;
    }
    .tr-eyebrow-line {
      width: 24px; height: 1px;
      background: var(--color-primary); 
      flex-shrink: 0; display: inline-block;
    }
    .tr-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem; font-weight: 500;
      letter-spacing: 0.28em; text-transform: uppercase;
      color: #374151;
    }
    .tr-h2 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1.4rem, 2.5vw, 1.85rem);
      font-weight: 200; letter-spacing: -0.03em;
      color: #111111; line-height: 1.15;
      margin: 0 0 2.5rem;
    }
    .tr-h2 span { color: #374151; }

    /* Cards */
    .tr-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .tr-card {
      display: grid;
      grid-template-columns: 280px 1fr;
      border: 1px solid #eef0ee;
      border-radius: 8px;
      overflow: hidden;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
      transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s, border-color 0.3s;
      position: relative;
    }
    .tr-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 36px rgba(0,0,0,0.09);
      border-color: rgba(15,118,110,0.25);
    }
    /* Alternating background */
    .tr-card:nth-child(even) { background: #f7f9f7; }

    .tr-card-img-wrap {
      position: relative; overflow: hidden;
    }
    .tr-card-img {
      width: 100%; height: 100%;
      object-fit: cover; display: block;
      transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
      min-height: 220px;
    }
    .tr-card:hover .tr-card-img { transform: scale(1.06); }

    .tr-card-img-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to right, rgba(2,10,2,0.3) 0%, transparent 70%);
    }
    .tr-card-img-tag {
      position: absolute; top: 1rem; left: 1rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.52rem; letter-spacing: 0.22em;
      text-transform: uppercase; color: #ffffff;
      background: var(--color-primary);
      padding: 4px 10px; border-radius: 2px;
      font-weight: 600;
    }

    .tr-card-body {
      padding: 2rem 2.25rem;
      border-left: 2px solid var(--color-primary);
      display: flex; flex-direction: column;
      justify-content: center;
    }

    .tr-card-h3 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 1.05rem; font-weight: 500;
      color: #111111; margin: 0 0 1rem;
      letter-spacing: -0.01em; line-height: 1.3;
    }
    .tr-card-p {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.87rem; font-weight: 300;
      line-height: 1.85; color: #666666;
      margin: 0 0 0.75rem;
    }
    .tr-card-p:last-child { margin: 0; }

    @media (max-width: 700px) {
      .tr-card { grid-template-columns: 1fr; }
      .tr-card-img { min-height: 200px; height: 200px; }
      .tr-card-body { border-left: none; border-top: 2px solid var(--color-primary); }
    }
  `}</style>

  <div className="tr-wrap">
    <div className="tr-inner">

      <div className="tr-eyebrow">
        <span className="tr-eyebrow-line" />
        <span className="tr-eyebrow-text">Retreat Types</span>
      </div>

      <h2 className="tr-h2">
        Types of Himalayan Retreats
      </h2>

      <div className="tr-list">

        {/* Yoga */}
        <div className="tr-card">
          <div className="tr-card-img-wrap">
            <img
              src="/Images/himalayanretreats/yoga.webp"
              alt="Yoga retreat Himalayas"
              className="tr-card-img"
            />
            <div className="tr-card-img-overlay" />
            <span className="tr-card-img-tag">Yoga</span>
          </div>
          <div className="tr-card-body">
            <h3 className="tr-card-h3">Yoga Retreats</h3>
            <p className="tr-card-p">
              Yoga retreats in the Himalayas combine daily movement practice with breathwork and
              guided meditation in a mountain setting that supports longer, slower sessions than
              typical urban studio formats. Rather than compressed class schedules, sessions often
              extend into unhurried practice blocks with space for integration.
            </p>
            <p className="tr-card-p">
              The emphasis varies by facilitator. Some retreats focus on alignment and physical
              refinement, while others emphasize restorative practice or breath-led movement. In
              Himalayan contexts, yoga tends to shift away from performance and toward inward
              awareness, shaped by the surrounding quiet.
            </p>
            <p className="tr-card-p">
              Most mountain yoga retreats are designed to accommodate mixed levels. Participants are
              guided according to experience rather than expected to perform at a fixed standard.
            </p>
          </div>
        </div>

        {/* Silent */}
        <div className="tr-card">
          <div className="tr-card-img-wrap">
            <img
              src="/Images/himalayanretreats/silentretreat.webp"
              alt="Silent retreat mountains"
              className="tr-card-img"
            />
            <div className="tr-card-img-overlay" />
            <span className="tr-card-img-tag">Silence</span>
          </div>
          <div className="tr-card-body">
            <h3 className="tr-card-h3">Silent Retreats</h3>
            <p className="tr-card-p">
              Silent retreats reduce or eliminate verbal communication for defined periods, allowing
              participants to observe internal patterns without conversational distraction. In
              Himalayan environments, silence is reinforced by the setting itself. The absence of
              traffic and urban noise reduces resistance to quiet formats.
            </p>
            <p className="tr-card-p">
              These retreats typically include structured meditation sessions, mindful walking,
              journaling, and limited facilitator guidance. Silence is not imposed as austerity; it
              is used as a tool for observation. Without constant dialogue, internal thought patterns
              become more visible.
            </p>
            <p className="tr-card-p">
              While some silent retreats are designed for experienced practitioners,
              beginner-friendly formats also exist with clear guidance and supportive structure.
            </p>
          </div>
        </div>

        {/* Wellness */}
        <div className="tr-card">
          <div className="tr-card-img-wrap">
            <img
              src="/Images/himalayanretreats/weekend.webp"
              alt="Wellness reset retreat"
              className="tr-card-img"
            />
            <div className="tr-card-img-overlay" />
            <span className="tr-card-img-tag">Wellness</span>
          </div>
          <div className="tr-card-body">
            <h3 className="tr-card-h3">Wellness &amp; Reset Retreats</h3>
            <p className="tr-card-p">
              Wellness retreats focus on recovery from overstimulation, burnout, and chronic stress.
              Programs may include gentle movement, breathwork, nervous system regulation practices,
              sleep optimization, and extended rest periods.
            </p>
            <p className="tr-card-p">
              Unlike performance-driven programs, reset retreats reduce intensity. Schedules are
              deliberately spacious. The objective is restoration rather than transformation. In
              Himalayan settings, cooler air, early nightfall, and lower sensory input support
              recalibration.
            </p>
            <p className="tr-card-p">
              These retreats are particularly suited for professionals seeking structured pause
              without long-term commitments.
            </p>
          </div>
        </div>

        {/* Creative */}
        <div className="tr-card">
          <div className="tr-card-img-wrap">
            <img
              src="/Images/himalayanretreats/creative.webp"
              alt="Creative reflection retreat"
              className="tr-card-img"
            />
            <div className="tr-card-img-overlay" />
            <span className="tr-card-img-tag">Creative</span>
          </div>
          <div className="tr-card-body">
            <h3 className="tr-card-h3">Creative and Reflection Retreats</h3>
            <p className="tr-card-p">
              Creative retreats are designed for writers, founders, artists, and professionals who
              require uninterrupted thinking time. The program may include structured reflection
              sessions, peer dialogue, or protected solitude.
            </p>
            <p className="tr-card-p">
              Mountain environments reduce external demands, allowing participants to engage deeply
              with long-form ideas or personal transitions. Unlike productivity workshops, these
              retreats prioritize clarity over output.
            </p>
            <p className="tr-card-p">
              For many participants, the value lies not in producing finished work, but in regaining
              depth of thought.
            </p>
          </div>
        </div>

        {/* Hybrid */}
        <div className="tr-card">
          <div className="tr-card-img-wrap">
            <img
              src="/Images/himalayanretreats/retreaktrek.webp"
              alt="Retreat trek hybrid Himalayas"
              className="tr-card-img"
            />
            <div className="tr-card-img-overlay" />
            <span className="tr-card-img-tag">Hybrid</span>
          </div>
          <div className="tr-card-body">
            <h3 className="tr-card-h3">Retreat + Trek Hybrid Experiences</h3>
            <p className="tr-card-p">
              Hybrid formats combine retreat programming with light or moderate trekking components.
              In these structures, physical movement complements reflection rather than replacing it.
            </p>
            <p className="tr-card-p">
              Treks may involve ridge walks, forest trails, or short supported routes. The purpose
              is experiential integration — using landscape engagement to deepen the retreat process.
            </p>
            <p className="tr-card-p">
              For participants who benefit from embodied movement, hybrid formats provide balance:
              structured introspection paired with active exploration.
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

        {/* ── RETREAT JOURNEYS ────────────────────────────────────── */}
<section style={{ marginBottom: 'var(--space-xl)' }}>
  <style>{`
    .rj-wrap {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #f7f9f7;
      padding: 5rem 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .rj-inner {
      max-width: 64rem;
      margin: 0 auto;
      padding: 0 var(--space-md, 1.5rem);
    }
    .rj-eyebrow {
      display: flex; align-items: center;
      gap: 0.75rem; margin-bottom: 1.25rem;
    }
    .rj-eyebrow-line {
      width: 24px; height: 1px;
      background: var(--color-primary); 
      flex-shrink: 0; display: inline-block;
    }
    .rj-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem; font-weight: 500;
      letter-spacing: 0.28em; text-transform: uppercase;
      color: #374151;
    }
    .rj-h2 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1.4rem, 2.5vw, 1.85rem);
      font-weight: 200; letter-spacing: -0.03em;
      color: #111111; line-height: 1.15;
      margin: 0 0 2.5rem;
    }
    .rj-h2 span { color: #374151; }

    .rj-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1rem;
      list-style: none;
      padding: 0; margin: 0;
    }

    .rj-card {
      display: block;
      text-decoration: none;
      border: 1px solid #eef0ee;
      border-radius: 8px;
      overflow: hidden;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
      transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s, border-color 0.3s;
      position: relative;
    }
    .rj-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 36px rgba(0,0,0,0.09);
      border-color: rgba(15,118,110,0.3);
    }
    .rj-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: var(--color-primary);
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
    }
    .rj-card:hover::before { transform: scaleX(1); }

    .rj-card-img-wrap { position: relative; overflow: hidden; }
    .rj-card-img {
      width: 100%; height: 160px;
      object-fit: cover; display: block;
      transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .rj-card:hover .rj-card-img { transform: scale(1.06); }
    .rj-card-img-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(2,10,2,0.6) 0%, transparent 60%);
      transition: opacity 0.35s;
    }
    .rj-card:hover .rj-card-img-overlay {5; }
    .rj-card-img-tag {
      position: absolute; top: 0.75rem; left: 0.75rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.5rem; letter-spacing: 0.22em;
      text-transform: uppercase; color: #ffffff;
      background: var(--color-primary);
      padding: 3px 8px; border-radius: 2px; font-weight: 600;
    }

    .rj-card-body { padding: 1.25rem 1.5rem 1.5rem; }
    .rj-card-title {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem; font-weight: 600;
      color: #111111; margin: 0 0 0.4rem;
      letter-spacing: -0.01em; line-height: 1.3;
    }
    .rj-card-essence {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.82rem; font-weight: 300;
      line-height: 1.7; color: #777777; margin: 0 0 1rem;
    }
    .rj-card-cta {
      display: inline-flex; align-items: center; gap: 0.35rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.58rem; font-weight: 700;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: #374151;
      transition: gap 0.22s;
    }
    .rj-card:hover .rj-card-cta { gap: 0.6rem; }
  `}</style>

  <div className="rj-wrap">
    <div className="rj-inner">

      <div className="rj-eyebrow">
        <span className="rj-eyebrow-line" />
        <span className="rj-eyebrow-text">Retreat Programs</span>
      </div>

      <h2 className="rj-h2">
        Our Retreat Journeys
      </h2>

      {(() => {
        const retreatImages: Record<string, string> = {
          'rest-reset':             '/Images/services/restreset.webp',
          'burnout-recovery':       '/Images/services/burnoutrec.webp',
          'yoga-and-movement':      '/Images/services/yoga.webp',
          'yoga-movement':          '/Images/services/yogamov.webp',
          'meditation-and-silence': '/Images/Journeys/meditation.webp',
          'meditation-silence':     '/Images/Journeys/meditation.webp',
          'art-creative':           '/Images/services/artcreative.webp',
          'art-and-creative':       '/Images/services/artcreative.webp',
          'sound-healing':          '/Images/services/soundhealing.webp',
          'weekend-retreat':        '/Images/services/weekendretreat.webp',
          'private-custom':         '/Images/services/privatecustom.webp',
          'private-and-custom':     '/Images/services/privatecustom.webp',
        };
        return (
          <ul className="rj-grid">
            {allRetreats.map((retreat) => (
              <li key={retreat.slug}>
                <Link href={`/retreats/journeys/${retreat.slug}`} className="rj-card">
                  <div className="rj-card-img-wrap">
                    <img
  src={retreatImages[retreat.slug] ?? '/Images/services/restreset.webp'}
  alt={retreat.title}
  className="rj-card-img"
/>
                    <div className="rj-card-img-overlay" />
                    <span className="rj-card-img-tag">Retreat</span>
                  </div>
                  <div className="rj-card-body">
                    <h3 className="rj-card-title">{retreat.title}</h3>
                    <p className="rj-card-essence">{retreat.oneLineEssence}</p>
                    <span className="rj-card-cta">Explore →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        );
      })()}

    </div>
  </div>
</section>

{/* ── LOCATIONS ─────────────────────────────────────────────── */}
<section style={{ marginBottom: 'var(--space-xl)' }}>
  <style>{`
    .loc-sec-wrap {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #ffffff;
      padding: 5rem 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .loc-sec-inner {
      max-width: 64rem;
      margin: 0 auto;
      padding: 0 var(--space-md, 1.5rem);
    }
    .loc-sec-eyebrow {
      display: flex; align-items: center;
      gap: 0.75rem; margin-bottom: 1.25rem;
    }
    .loc-sec-eyebrow-line {
      width: 24px; height: 1px;
      background: var(--color-primary); 
      flex-shrink: 0; display: inline-block;
    }
    .loc-sec-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem; font-weight: 500;
      letter-spacing: 0.28em; text-transform: uppercase;
      color: #374151;
    }
    .loc-sec-h2 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1.4rem, 2.5vw, 1.85rem);
      font-weight: 200; letter-spacing: -0.03em;
      color: #111111; line-height: 1.15;
      margin: 0 0 1rem;
    }
    .loc-sec-h2 span { color: #374151; }
    .loc-sec-intro {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem; font-weight: 300;
      line-height: 1.9; color: #555555;
      margin: 0 0 0.75rem; max-width: 52rem;
    }
    .loc-sec-divider {
      width: 40px; height: 1px;
      background: var(--color-primary); 
      margin: 1.75rem 0 2.5rem;
    }

    /* Location cards — full width horizontal */
    .loc-sec-list {
      display: flex; flex-direction: column; gap: 1.5rem;
    }

    .loc-sec-card {
      display: grid;
      grid-template-columns: 320px 1fr;
      border: 1px solid #eef0ee;
      border-radius: 8px;
      overflow: hidden;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
      transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s, border-color 0.3s;
      text-decoration: none;
      color: inherit;
      position: relative;
    }
    .loc-sec-card:nth-child(even) { background: #f7f9f7; }
    .loc-sec-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 36px rgba(0,0,0,0.09);
      border-color: rgba(15,118,110,0.28);
    }
    .loc-sec-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: var(--color-primary);
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
    }
    .loc-sec-card:hover::before { transform: scaleX(1); }

    .loc-sec-img-wrap { position: relative; overflow: hidden; }
    .loc-sec-img {
      width: 100%; height: 100%;
      object-fit: cover; display: block;
      min-height: 240px;
      transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .loc-sec-card:hover .loc-sec-img { transform: scale(1.05); }
    .loc-sec-img-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to right, rgba(2,10,2,0.35) 0%, transparent 65%);
    }
    .loc-sec-img-name {
      position: absolute; bottom: 1rem; left: 1rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem; letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(236,228,208,0.8); font-weight: 500;
    }

    .loc-sec-body {
      padding: 2rem 2.25rem;
      border-left: 2px solid var(--color-primary);
      display: flex; flex-direction: column; justify-content: center;
    }
    .loc-sec-body-label {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem; font-weight: 600;
      letter-spacing: 0.22em; text-transform: uppercase;
      color: #374151;
      margin: 0 0 0.5rem;
    }
    .loc-sec-body-h3 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 1.05rem; font-weight: 500;
      color: #111111; margin: 0 0 1rem;
      letter-spacing: -0.01em; line-height: 1.3;
    }
    .loc-sec-body-p {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.87rem; font-weight: 300;
      line-height: 1.85; color: #666666;
      margin: 0 0 0.75rem;
    }
    .loc-sec-body-p:last-of-type { margin-bottom: 1.25rem; }
    .loc-sec-cta {
      display: inline-flex; align-items: center; gap: 0.35rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.58rem; font-weight: 700;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: #374151;
      transition: gap 0.22s;
    }
    .loc-sec-card:hover .loc-sec-cta { gap: 0.6rem; }

    @media (max-width: 700px) {
      .loc-sec-card { grid-template-columns: 1fr; }
      .loc-sec-img { min-height: 200px; height: 200px; }
      .loc-sec-body { border-left: none; border-top: 2px solid var(--color-primary); }
    }
  `}</style>

  <div className="loc-sec-wrap">
    <div className="loc-sec-inner">

      <div className="loc-sec-eyebrow">
        <span className="loc-sec-eyebrow-line" />
        <span className="loc-sec-eyebrow-text">Where We Work</span>
      </div>

      <h2 className="loc-sec-h2">
        Locations We Host Retreats
      </h2>

      <p className="loc-sec-intro">
        Himalayan retreats are shaped not only by facilitation style but by geography. Altitude,
        forest density, accessibility, and cultural context influence the tone of each
        experience. While the Himalayan range spans multiple regions, retreats are best
        understood through specific locations rather than abstract mountain labels.
      </p>
      <p className="loc-sec-intro">
        Below are the primary mountain regions where our retreats are currently hosted.
      </p>

      <div className="loc-sec-divider" />

      <div className="loc-sec-list">

        {/* Chakrata */}
        <Link href="/retreats/chakrata" className="loc-sec-card">
          <div className="loc-sec-img-wrap">
            <img
              src="/Images/location/chakrata.webp"
              alt="Chakrata forested ridge"
              className="loc-sec-img"
            />
            <div className="loc-sec-img-overlay" />
            <span className="loc-sec-img-name">Chakrata</span>
          </div>
          <div className="loc-sec-body">
            <p className="loc-sec-body-label">Uttarakhand</p>
            <h3 className="loc-sec-body-h3">Chakrata — Forested Ridge Environment</h3>
            <p className="loc-sec-body-p">
              Chakrata sits along a quieter Himalayan ridge in Uttarakhand, characterized by pine
              forests, open valley views, and relatively low tourist density compared to commercial
              hill stations. Its elevation maintains cooler temperatures for much of the year,
              supporting extended outdoor sessions and unhurried pacing.
            </p>
            <p className="loc-sec-body-p">
              Retreats hosted in Chakrata tend to emphasize restoration and reflective space. The
              surrounding forests create natural walking routes for integration time, while ridge
              views provide openness without exposure to heavy tourism traffic.
            </p>
            <p className="loc-sec-body-p">
              Its accessibility from Delhi makes it suitable for three- to five-day retreat formats,
              offering meaningful separation without excessive travel complexity.
            </p>
            <span className="loc-sec-cta">Explore Chakrata →</span>
          </div>
        </Link>

        {/* Sankri */}
        <Link href="/retreats/sankri" className="loc-sec-card">
          <div className="loc-sec-img-wrap">
            <img
              src="/Images/location/sankri.webp"
              alt="Sankri valley mountain"
              className="loc-sec-img"
            />
            <div className="loc-sec-img-overlay" />
            <span className="loc-sec-img-name">Sankri</span>
          </div>
          <div className="loc-sec-body">
            <p className="loc-sec-body-label">Garhwal Himalayas</p>
            <h3 className="loc-sec-body-h3">Sankri — Valley-Based Mountain Immersion</h3>
            <p className="loc-sec-body-p">
              Sankri lies deeper in the Garhwal Himalayas and serves as a gateway to several trekking
              routes. The surrounding valley landscapes are more expansive and alpine in character,
              with pronounced seasonal variation.
            </p>
            <p className="loc-sec-body-p">
              Retreats hosted in Sankri often integrate longer nature immersion segments, including
              forest walks and light trekking extensions. The environment supports participants who
              benefit from embodied movement alongside structured reflection.
            </p>
            <p className="loc-sec-body-p">
              Because Sankri is more remote, retreats here tend to attract participants seeking
              stronger geographical separation from routine environments.
            </p>
            <span className="loc-sec-cta">Explore Sankri →</span>
          </div>
        </Link>

        {/* Munsiyari */}
        <Link href="/retreats/munsiyari" className="loc-sec-card">
          <div className="loc-sec-img-wrap">
            <img
              src="/Images/location/munsiyari.webp"
              alt="Munsiyari alpine frontier"
              className="loc-sec-img"
            />
            <div className="loc-sec-img-overlay" />
            <span className="loc-sec-img-name">Munsiyari</span>
          </div>
          <div className="loc-sec-body">
            <p className="loc-sec-body-label">Kumaon Himalayas</p>
            <h3 className="loc-sec-body-h3">Munsiyari — Alpine Frontier and Glacier Country</h3>
            <p className="loc-sec-body-p">
              Munsiyari sits at the edge of the Kumaon Himalayas, facing the Panchachuli massif and
              the glacial systems of the Gori Ganga valley. This is high-altitude frontier country —
              less visited, more elemental. The landscape is vast, the light is sharp, and the silence
              is not curated but geological.
            </p>
            <p className="loc-sec-body-p">
              Retreats in Munsiyari suit people drawn to altitude and edge. The environment is raw
              and exposed, which means inner work here tends to be more confrontational than gentle.
              Alpine meadows, glacier approaches, and Bhotiya village culture create a container that
              is culturally rich and physically demanding in equal measure.
            </p>
            <p className="loc-sec-body-p">
              For those seeking deep geographical separation and a landscape that does not accommodate
              comfort-seeking, Munsiyari offers what more accessible locations cannot.
            </p>
            <span className="loc-sec-cta">Explore Munsiyari →</span>
          </div>
        </Link>

        {/* Rishikesh */}
        <Link href="/retreats/rishikesh" className="loc-sec-card">
          <div className="loc-sec-img-wrap">
            <img
              src="/Images/location/rishikesh.webp"
              alt="Rishikesh Ganges spiritual"
              className="loc-sec-img"
            />
            <div className="loc-sec-img-overlay" />
            <span className="loc-sec-img-name">Rishikesh</span>
          </div>
          <div className="loc-sec-body">
            <p className="loc-sec-body-label">Himalayan Foothills</p>
            <h3 className="loc-sec-body-h3">Rishikesh — Spiritual Tradition on the Ganges</h3>
            <p className="loc-sec-body-p">
              Rishikesh is not a mountain retreat in the alpine sense. It is the spiritual anchor of
              the Indian Himalayan foothills — a place where yoga, meditation, and devotional practice
              have been lived traditions for millennia. The Ganges is not backdrop here; it is
              presence.
            </p>
            <p className="loc-sec-body-p">
              Retreats in Rishikesh suit people seeking connection to living spiritual lineages.
              Ashram rhythms, evening aarti ceremonies, philosophical study, and teacher-led practices
              create a container that is communal rather than isolated. The energy is devotional, not
              wilderness.
            </p>
            <p className="loc-sec-body-p">
              For participants drawn to yoga traditions, philosophical depth, or the specific gravity
              of a sacred river town, Rishikesh offers an experience distinct from any mountain
              location. It is closer to Delhi, fully accessible, and culturally dense.
            </p>
            <span className="loc-sec-cta">Explore Rishikesh →</span>
          </div>
        </Link>

      </div>
    </div>
  </div>
</section>

        {/* ── WHO THEY ARE FOR ──────────────────────────────────────── */}
<section style={{ marginBottom: 'var(--space-xl)' }}>
  <style>{`
    .wf-wrap {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #f7f9f7;
      padding: 5rem 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .wf-inner {
      max-width: 64rem;
      margin: 0 auto;
      padding: 0 var(--space-md, 1.5rem);
    }
    .wf-eyebrow {
      display: flex; align-items: center;
      gap: 0.75rem; margin-bottom: 1.25rem;
    }
    .wf-eyebrow-line {
      width: 24px; height: 1px;
      background: var(--color-primary); 
      flex-shrink: 0; display: inline-block;
    }
    .wf-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem; font-weight: 500;
      letter-spacing: 0.28em; text-transform: uppercase;
      color: #374151;
    }
    .wf-h2 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1.4rem, 2.5vw, 1.85rem);
      font-weight: 200; letter-spacing: -0.03em;
      color: #111111; line-height: 1.15;
      margin: 0 0 2rem;
    }
    .wf-h2 span { color: #374151; }

  
    @media (max-width: 700px) { .wf-layout { grid-template-columns: 1fr; } }

    .wf-p {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem; font-weight: 300;
      line-height: 1.9; color: #555555;
      margin: 0 0 1rem;
    }
    .wf-p-label {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem; font-weight: 300;
      line-height: 1.9; color: #555555;
      margin: 0 0 0.75rem;
    }

    /* Suited for list */
    .wf-list {
      list-style: none; padding: 0; margin: 0 0 1.25rem;
      display: flex; flex-direction: column; gap: 0.5rem;
    }
    .wf-list-item {
      display: flex; align-items: flex-start; gap: 0.75rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.88rem; font-weight: 300;
      color: #444444; line-height: 1.6;
      padding: 0.85rem 1rem;
      background: #ffffff;
      border-radius: 6px;
      border-left: 2px solid rgba(15,118,110,0.2);
      transition: border-color 0.2s, background 0.2s;
    }
    .wf-list-item:hover {
      border-left-color: #374151;
      background: #f0f7f0;
    }
    .wf-list-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--color-primary); 
      flex-shrink: 0; margin-top: 0.45rem;
    }

    /* Right image */
    .wf-img {
      width: 100%; border-radius: 8px;
      object-fit: cover; height: 420px;
      display: block;
      box-shadow: 0 4px 24px rgba(0,0,0,0.1);
    }
    @media (max-width: 700px) { .wf-img { height: 240px; } }
  `}</style>

  <div className="wf-wrap">
    <div className="wf-inner">

      <div className="wf-eyebrow">
        <span className="wf-eyebrow-line" />
        <span className="wf-eyebrow-text">Who This Is For</span>
      </div>

      <h2 className="wf-h2">
        Who Himalayan Retreats Are For
      </h2>

      <div className="wf-layout">

        {/* Left — text */}
        <div>
          <p className="wf-p">
            Himalayan retreats are not limited to experienced practitioners or long-term spiritual
            seekers. They are structured environments designed for individuals who recognize the
            need for deliberate pause.
          </p>
          <p className="wf-p-label">They are particularly suited for:</p>
          <ul className="wf-list">
            {[
              'Professionals experiencing sustained mental fatigue or burnout',
              'Founders and decision-makers seeking clarity away from operational pressure',
              'Creatives requiring uninterrupted thinking time',
              'Individuals navigating life transitions such as career shifts or personal change',
              'First-time retreat participants seeking guided structure rather than open-ended solitude',
            ].map((item) => (
              <li key={item} className="wf-list-item">
                <span className="wf-list-dot" />
                {item}
              </li>
            ))}
          </ul>
          <p className="wf-p">
            Retreats in mountain settings are not designed for constant activity. They appeal to
            individuals comfortable with slower pacing and reflective time. While prior experience
            in yoga or meditation can be helpful, it is not required in most structured formats.
          </p>
          <p className="wf-p">
            The common factor among participants is not background — it is intention. Those who
            benefit most are willing to disengage temporarily from routine, reduce digital input,
            and engage with a structured rhythm designed for recalibration.
          </p>
          <p className="wf-p" style={{ margin: 0 }}>
            Himalayan retreats are less suitable for individuals seeking entertainment-driven
            travel or high-intensity adventure experiences. While trekking extensions may be
            included, the primary orientation remains inward.
          </p>
        </div>

        
      </div>
    </div>
  </div>
</section>

{/* ── BEST TIME ─────────────────────────────────────────────── */}
<section style={{ marginBottom: 'var(--space-xl)' }}>
  <style>{`
    .bt-wrap {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #ffffff;
      padding: 5rem 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .bt-inner {
      max-width: 64rem;
      margin: 0 auto;
      padding: 0 var(--space-md, 1.5rem);
    }
    .bt-eyebrow {
      display: flex; align-items: center;
      gap: 0.75rem; margin-bottom: 1.25rem;
    }
    .bt-eyebrow-line {
      width: 24px; height: 1px;
      background: var(--color-primary); 
      flex-shrink: 0; display: inline-block;
    }
    .bt-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem; font-weight: 500;
      letter-spacing: 0.28em; text-transform: uppercase;
      color: #374151;
    }
    .bt-h2 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1.4rem, 2.5vw, 1.85rem);
      font-weight: 200; letter-spacing: -0.03em;
      color: #111111; line-height: 1.15;
      margin: 0 0 1rem;
    }
    .bt-intro {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem; font-weight: 300;
      line-height: 1.9; color: #555555;
      margin: 0 0 2.5rem; max-width: 52rem;
    }
    .bt-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
    }
    @media (max-width: 700px) { .bt-grid { grid-template-columns: 1fr; } }
    .bt-card {
      border: 1px solid #eef0ee;
      border-radius: 8px;
      overflow: hidden;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
      transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s, border-color 0.3s;
      position: relative;
    }
    .bt-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 36px rgba(0,0,0,0.09);
      border-color: rgba(15,118,110,0.25);
    }
    .bt-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: var(--color-primary);
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
    }
    .bt-card:hover::before { transform: scaleX(1); }
    .bt-card-body { padding: 1.5rem 1.75rem 1.75rem; }
    .bt-card-label {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem; font-weight: 600;
      letter-spacing: 0.22em; text-transform: uppercase;
      color: #374151;
      margin: 0 0 0.5rem;
    }
    .bt-card-h3 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 1rem; font-weight: 500;
      color: #111111; margin: 0 0 0.85rem;
      letter-spacing: -0.01em;
    }
    .bt-card-p {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.87rem; font-weight: 300;
      line-height: 1.85; color: #666666;
      margin: 0 0 0.65rem;
    }
    .bt-card-p:last-child { margin: 0; }
    .bt-note {
      margin-top: 2rem;
      padding: 1.5rem 1.75rem;
      background: #f7f9f7;
      border-radius: 6px;
      border-left: 2px solid var(--color-primary);
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.9rem; font-weight: 300;
      line-height: 1.85; color: #555555;
    }
  `}</style>

  <div className="bt-wrap">
    <div className="bt-inner">

      <div className="bt-eyebrow">
        <span className="bt-eyebrow-line" />
        <span className="bt-eyebrow-text">Seasonality</span>
      </div>

      <h2 className="bt-h2">Best Time for a Himalayan Retreat</h2>

      <p className="bt-intro">
        Seasonality influences both environmental conditions and the psychological tone of a
        retreat. While Himalayan retreats operate across much of the year, each season creates
        a distinct experience.
      </p>

      <div className="bt-grid">

        <div className="bt-card">
          <div className="bt-card-body">
            <p className="bt-card-label">March – May</p>
            <h3 className="bt-card-h3">Spring (March–May)</h3>
            <p className="bt-card-p">
              Spring offers moderate temperatures, blooming landscapes, and increasing daylight
              hours. Forest regions are particularly vibrant during this period, making it well
              suited for retreats that include extended outdoor sessions and light walking practices.
            </p>
            <p className="bt-card-p">
              Spring retreats often feel balanced — neither intensely introspective nor socially
              dense — and are generally comfortable for first-time participants.
            </p>
          </div>
        </div>

        <div className="bt-card">
          <div className="bt-card-body">
            <p className="bt-card-label">June – July</p>
            <h3 className="bt-card-h3">Summer (June–July)</h3>
            <p className="bt-card-p">
              Summer provides relief from the heat of the plains, especially in mid-altitude
              Himalayan regions. Retreats during this time attract participants seeking cooler
              climates and geographical separation from urban environments.
            </p>
            <p className="bt-card-p">
              While some areas may experience monsoon onset toward late July, many retreat locations
              remain operational with adjusted outdoor programming.
            </p>
          </div>
        </div>

        <div className="bt-card">
          <div className="bt-card-body">
            <p className="bt-card-label">September – November</p>
            <h3 className="bt-card-h3">Autumn (September–November)</h3>
            <p className="bt-card-p">
              Autumn is characterized by clear skies, stable weather, and high visibility across
              mountain ranges. This season is often considered optimal for retreats that integrate
              light trekking extensions.
            </p>
            <p className="bt-card-p">
              The post-monsoon clarity enhances landscape immersion, making it a preferred period
              for participants who value expansive mountain views alongside structured practice.
            </p>
          </div>
        </div>

        <div className="bt-card">
          <div className="bt-card-body">
            <p className="bt-card-label">December – February</p>
            <h3 className="bt-card-h3">Winter (December–February)</h3>
            <p className="bt-card-p">
              Winter retreats are quieter and more introspective in tone. Cooler temperatures
              naturally reduce external activity and encourage indoor practice formats, journaling,
              and extended reflective sessions.
            </p>
            <p className="bt-card-p">
              For participants comfortable with colder climates, winter retreats can offer deeper
              stillness and lower tourist density. Accessibility may vary depending on altitude and
              weather conditions.
            </p>
          </div>
        </div>

      </div>

      <div className="bt-note">
        Choosing the right season depends less on &ldquo;ideal weather&rdquo; and more on personal
        intention. Those seeking outward engagement may prefer spring or autumn, while
        individuals seeking deeper quiet often resonate with winter formats.
      </div>

    </div>
  </div>
</section>

{/* ── HOW TO CHOOSE ─────────────────────────────────────────── */}
<section style={{ marginBottom: 'var(--space-xl)' }}>
  <style>{`
    .hc-wrap {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #f7f9f7;
      padding: 5rem 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .hc-inner {
      max-width: 64rem;
      margin: 0 auto;
      padding: 0 var(--space-md, 1.5rem);
    }
    .hc-eyebrow {
      display: flex; align-items: center;
      gap: 0.75rem; margin-bottom: 1.25rem;
    }
    .hc-eyebrow-line {
      width: 24px; height: 1px;
      background: var(--color-primary); 
      flex-shrink: 0; display: inline-block;
    }
    .hc-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem; font-weight: 500;
      letter-spacing: 0.28em; text-transform: uppercase;
      color: #374151;
    }
    .hc-h2 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1.4rem, 2.5vw, 1.85rem);
      font-weight: 200; letter-spacing: -0.03em;
      color: #111111; line-height: 1.15;
      margin: 0 0 1rem;
    }
    .hc-h2 span { color: #374151; }
    .hc-intro {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem; font-weight: 300;
      line-height: 1.9; color: #555555;
      margin: 0 0 2.5rem; max-width: 52rem;
    }

    /* Accordion-style cards */
    .hc-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
    }
    @media (max-width: 700px) { .hc-grid { grid-template-columns: 1fr; } }

    .hc-card {
      background: #ffffff;
      border: 1px solid #eef0ee;
      border-radius: 8px;
      padding: 1.75rem 2rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
      transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s, border-color 0.3s;
      position: relative; overflow: hidden;
    }
    .hc-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 36px rgba(0,0,0,0.09);
      border-color: rgba(15,118,110,0.25);
    }
    .hc-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: var(--color-primary);
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
    }
    .hc-card:hover::before { transform: scaleX(1); }

    .hc-card-num {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 2.5rem; font-weight: 200;
      color: #374151; 
      line-height: 1; margin: 0 0 0.75rem;
      letter-spacing: -0.04em;
      transition: opacity 0.3s;
    }
    .hc-card:hover .hc-card-num {  }

    .hc-card-h3 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem; font-weight: 600;
      color: #111111; margin: 0 0 0.85rem;
      letter-spacing: -0.01em; line-height: 1.3;
    }
    .hc-card-p {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.87rem; font-weight: 300;
      line-height: 1.85; color: #666666;
      margin: 0 0 0.65rem;
    }
    .hc-card-p:last-child { margin: 0; }
    .hc-card-p a {
      color: #374151; text-decoration: none;
      border-bottom: 1px solid rgba(15,118,110,0.25);
      transition: border-color 0.2s;
    }
    .hc-card-p a:hover { border-bottom-color: #374151; }

    /* Closing note */
    .hc-note {
      margin-top: 2rem;
      padding: 1.5rem 1.75rem;
      background: #ffffff;
      border-radius: 6px;
      border-left: 2px solid var(--color-primary);
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.9rem; font-weight: 300;
      line-height: 1.85; color: #555555;
    }
    .hc-note a {
      color: #374151; text-decoration: none;
      border-bottom: 1px solid rgba(15,118,110,0.25);
      transition: border-color 0.2s;
    }
    .hc-note a:hover { border-bottom-color: #374151; }
  `}</style>

  <div className="hc-wrap">
    <div className="hc-inner">

      <div className="hc-eyebrow">
        <span className="hc-eyebrow-line" />
        <span className="hc-eyebrow-text">Decision Guide</span>
      </div>

      <h2 className="hc-h2">
        How to Choose the Right Himalayan Retreat
      </h2>

      <p className="hc-intro">
        Selecting a Himalayan retreat involves more than choosing a location. The structure,
        duration, and facilitation style all shape the experience. Clarifying intention before
        booking reduces mismatch between expectation and format.
      </p>

      <div className="hc-grid">

        {/* Duration */}
        <div className="hc-card">
          <div className="hc-card-num">01</div>
          <h3 className="hc-card-h3">Duration and Intensity</h3>
          <p className="hc-card-p">
            Short retreats of three to four days provide structured pause without requiring
            extended time away from work. Longer formats allow deeper settling and more gradual
            integration. For a detailed comparison, see{' '}
            <Link href="/blog/3-day-vs-5-day-himalayan-retreat">how to choose the right retreat length</Link>.
          </p>
          <p className="hc-card-p">
            Intensity varies as well. Some retreats follow full-day programming with early starts
            and structured sessions. Others maintain spacious schedules with extended rest periods.
            Reviewing the daily rhythm in advance helps determine alignment.
          </p>
        </div>

        {/* Movement */}
        <div className="hc-card">
          <div className="hc-card-num">02</div>
          <h3 className="hc-card-h3">Physical Movement Level</h3>
          <p className="hc-card-p">
            Not all retreats emphasize physical activity. Some focus primarily on meditation and
            reflection, while others integrate yoga, forest walks, or light trekking.
          </p>
          <p className="hc-card-p">
            Participants should assess their comfort with movement at moderate elevation. Retreat
            descriptions typically clarify whether physical endurance is central or optional.
          </p>
        </div>

        {/* Group size */}
        <div className="hc-card">
          <div className="hc-card-num">03</div>
          <h3 className="hc-card-h3">Group Size and Facilitation Style</h3>
          <p className="hc-card-p">
            Smaller groups often allow more personalized guidance and quieter dynamics. Larger
            groups may create broader social interaction and shared energy.
          </p>
          <p className="hc-card-p">
            Facilitation style also differs. Some retreats emphasize structured instruction,
            while others encourage independent reflection within a guided framework. Reading
            facilitator profiles and program outlines helps clarify expectations.
          </p>
        </div>

        {/* Accessibility */}
        <div className="hc-card">
          <div className="hc-card-num">04</div>
          <h3 className="hc-card-h3">Accessibility and Travel Considerations</h3>
          <p className="hc-card-p">
            Travel logistics influence the overall experience. Locations closer to Delhi or major
            transit hubs may suit shorter retreats. More remote valleys provide deeper separation
            but require additional travel time.
          </p>
          <p className="hc-card-p">
            Understanding transport duration, terrain, and seasonal accessibility ensures
            realistic planning.
          </p>
        </div>

      </div>

      {/* Closing note */}
      <div className="hc-note">
        The most effective retreat choice aligns environment, structure, and personal
        intention. Clarity before arrival allows participants to engage fully once the program
        begins. For a ranked comparison across every category, see our guide to the{' '}
        <Link href="/retreats/best-retreat-in-uttarakhand">
          best retreats in Uttarakhand
        </Link>.
      </div>

    </div>
  </div>
</section>

        {/* ── FIND MY RETREAT (decision assistant) ─────────────────── */}
<section style={{ marginBottom: 'var(--space-xl)' }}>
  <style>{`
    .fr-wrap {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #0a160a;
      padding: 5rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      position: relative;
      overflow: hidden;
    }
    .fr-wrap::before {
      content: '';
      position: absolute;
      top: -120px; left: 50%;
      transform: translateX(-50%);
      width: 700px; height: 400px;
      background: radial-gradient(ellipse, rgba(15,118,110,0.18) 0%, transparent 70%);
      pointer-events: none;
    }
    .fr-inner {
      max-width: 64rem;
      margin: 0 auto;
      padding: 0 var(--space-md, 1.5rem);
      position: relative;
    }
    .fr-eyebrow {
      display: flex; align-items: center;
      gap: 0.75rem; margin-bottom: 1.25rem;
    }
    .fr-eyebrow-line {
      width: 24px; height: 1px;
      background: var(--color-primary); 
      flex-shrink: 0; display: inline-block;
    }
    .fr-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem; font-weight: 500;
      letter-spacing: 0.28em; text-transform: uppercase;
      color: #374151;
    }
    .fr-h2 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1.5rem, 3vw, 2.2rem);
      font-weight: 200; letter-spacing: -0.03em;
      color: #f0ece3; line-height: 1.15;
      margin: 0 0 1rem;
    }
    .fr-h2 span { color: #374151; }
    .fr-sub {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem; font-weight: 300;
      line-height: 1.7; color: rgba(240,236,227,0.5);
      margin: 0 0 2.5rem; max-width: 42rem;
    }
    .fr-component-wrap {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      padding: 2rem 2.25rem;
      backdrop-filter: blur(8px);
    }
  `}</style>

  <div className="fr-wrap">
    <div className="fr-inner">
      <div className="fr-eyebrow">
        <span className="fr-eyebrow-line" />
        <span className="fr-eyebrow-text">Decision Assistant</span>
      </div>
      <h2 className="fr-h2">
        Not sure which retreat is right for you?
      </h2>
      <p className="fr-sub">
        Answer five questions. Get your top two matches from the registry — no login required.
      </p>
      <div className="fr-component-wrap">
        <RetreatFinder fromPath={PATH} ratings={finderRatings} />
      </div>
    </div>
  </div>
</section>

{/* ── EXPLORE PROGRAMS (conversion layer) ──────────────────── */}
<AllRetreatPrograms />

{/* ── FAQ ────────────────────────────────────────────────────── */}
<section style={{ marginBottom: 'var(--space-xl)' }}>
  <style>{`
    .faq-wrap {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #ffffff;
      padding: 5rem 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .faq-inner {
      max-width: 64rem;
      margin: 0 auto;
      padding: 0 var(--space-md, 1.5rem);
    }
    .faq-eyebrow {
      display: flex; align-items: center;
      gap: 0.75rem; margin-bottom: 1.25rem;
    }
    .faq-eyebrow-line {
      width: 24px; height: 1px;
      background: var(--color-primary); 
      flex-shrink: 0; display: inline-block;
    }
    .faq-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem; font-weight: 500;
      letter-spacing: 0.28em; text-transform: uppercase;
      color: #374151;
    }
    .faq-h2 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1.4rem, 2.5vw, 1.85rem);
      font-weight: 200; letter-spacing: -0.03em;
      color: #111111; line-height: 1.15;
      margin: 0 0 2.5rem;
    }
    .faq-h2 span { color: #374151; }
    .faq-component-wrap {
      max-width: 52rem;
    }
  `}</style>

  <div className="faq-wrap">
    <div className="faq-inner">
      <div className="faq-eyebrow">
        <span className="faq-eyebrow-line" />
        <span className="faq-eyebrow-text">Common Questions</span>
      </div>
      <h2 className="faq-h2">
        Frequently Asked Questions
      </h2>
      <div className="faq-component-wrap">
        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
      </div>
    </div>
  </div>
</section>

{/* ── NAVIGATION ────────────────────────────────────────────── */}
<nav>
  <style>{`
    .nav-wrap {
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      background: #f7f9f7;
      padding: 2.5rem 0;
      border-top: 1px solid #e5e7eb;
    }
    .nav-inner {
      max-width: 64rem;
      margin: 0 auto;
      padding: 0 var(--space-md, 1.5rem);
      display: flex;
      align-items: center;
    }
    .nav-back {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.78rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #374151;
      text-decoration: none;
      padding: 0.6rem 1.25rem;
      border: 1px solid rgba(15,118,110,0.3);
      border-radius: 4px;
      background: #ffffff;
      transition: background 0.2s, border-color 0.2s, gap 0.2s;
    }
    .nav-back:hover {
      background: rgba(15,118,110,0.05);
      border-color: #374151;
      gap: 0.75rem;
    }
    .nav-back-arrow {
      font-size: 0.9rem;
      transition: transform 0.2s;
    }
    .nav-back:hover .nav-back-arrow {
      transform: translateX(-3px);
    }
  `}</style>

  <div className="nav-wrap">
    <div className="nav-inner">
      <Link href="/retreats" className="nav-back">
        <span className="nav-back-arrow">←</span>
        Back to all retreats
      </Link>
    </div>
  </div>
</nav>

      </article>
    </TrackedPage>
  );
}
