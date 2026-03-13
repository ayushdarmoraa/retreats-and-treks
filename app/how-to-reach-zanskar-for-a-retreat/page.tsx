import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import FeaturedRetreat from '@/components/FeaturedRetreat';
import RelatedReads from '@/components/RelatedReads';

const PATH = '/how-to-reach-zanskar-for-a-retreat';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'How to Reach Zanskar for a Meditation Retreat — Complete Travel Guide | Retreats And Treks',
    description:
      'The complete travel guide to reaching Zanskar — flights, roads, acclimatisation, and what the journey itself teaches you. Routes from Delhi, Mumbai, Bangalore, and international origins.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'How to Reach Zanskar for a Meditation Retreat',
      description: 'Routes, transport, acclimatisation, and travel logistics for Zanskar.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('How to Reach Zanskar for a Meditation Retreat'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How long does it take to reach Zanskar from Delhi?',
    answer:
      'The fastest route takes approximately 2–3 days: fly Delhi to Leh (1.5 hours), rest in Leh for acclimatisation (1 day minimum), then drive Leh to Kargil to Zanskar (2 days, or 1 long day if conditions are good). We recommend allowing 3 days for travel each way to account for acclimatisation and road conditions.',
  },
  {
    question: 'Can I drive to Zanskar from Manali or Srinagar?',
    answer:
      'From Srinagar: Drive via Kargil (2 days) then Kargil to Padum (1 day). This route is scenic and avoids the altitude shock of flying directly to Leh. From Manali: The Manali–Leh highway is open June–September. Drive to Leh (2 days) then continue to Zanskar. Both routes are long but the gradual altitude gain is easier on the body than flying.',
  },
  {
    question: 'Do I need a permit to visit Zanskar?',
    answer:
      'Indian citizens do not need a special permit. Foreign nationals need an Inner Line Permit (ILP) for Ladakh, which can be obtained online or at the Leh airport/DC office. The process is straightforward — you need a passport copy and basic travel details. Our retreat team handles the permit process for international participants.',
  },
  {
    question: 'Is the road to Zanskar dangerous?',
    answer:
      'The road is challenging, not dangerous, when driven by experienced local drivers. It is a mountain road with some unpaved sections, river crossings, and narrow passes. Our retreats use experienced local drivers who know the route intimately. The road is not suitable for self-driving unless you have extensive mountain driving experience.',
  },
  {
    question: 'What happens if the road is blocked?',
    answer:
      'Landslides and road blockages are rare but possible, especially during the monsoon months (July–August). Blockages are usually cleared within 4–12 hours by the Border Roads Organisation. Our itineraries include buffer days specifically for this. In our operating history, no retreat has been cancelled due to road blockage — only delayed by hours.',
  },
];

export default function HowToReachZanskarPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Locations', url: buildCanonicalUrl('/locations') },
    { name: 'Zanskar', url: buildCanonicalUrl('/locations/zanskar') },
    { name: 'How to Reach Zanskar', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Reach Zanskar for a Meditation Retreat',
    description: 'Complete travel guide to reaching Zanskar for a retreat.',
    url: canonicalUrl,
    author: { '@type': 'Organization', name: 'Retreats And Treks' },
    publisher: { '@type': 'Organization', name: 'Retreats And Treks' },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  const sectionStyle = { marginBottom: 'var(--space-xl)' } as const;
  const h2Style = { fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' } as const;
  const proseStyle = { lineHeight: 1.8, marginBottom: '0.75rem' } as const;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
      />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Locations', href: '/locations' }, { name: 'Zanskar', href: '/locations/zanskar' }, { name: 'How to Reach' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            How to Reach Zanskar for a Meditation Retreat
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Getting to Zanskar is itself part of the retreat. The journey strips away
            convenience, forces patience, and delivers you to a place where the ordinary
            world feels genuinely far away. Here is the practical guide &mdash; routes,
            transport, timing, and what to prepare for.
          </p>
        </header>

        {/* --- Route 1: Delhi via Leh --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Route 1: Delhi &rarr; Leh &rarr; Zanskar (Fastest)</h2>
          <p style={proseStyle}>
            <strong>Duration:</strong> 2&ndash;3 days including acclimatisation.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li><strong>Day 1:</strong> Fly Delhi to Leh (1.5 hours). Arrive at 3,500m. Rest — this is your acclimatisation day. Walk gently, drink water, avoid exertion</li>
            <li><strong>Day 2:</strong> Optional second acclimatisation day in Leh (recommended for those new to altitude). Explore Leh at a gentle pace</li>
            <li><strong>Day 3:</strong> Drive Leh &rarr; Kargil (4&ndash;5 hours), overnight in Kargil</li>
            <li><strong>Day 4:</strong> Drive Kargil &rarr; Padum/Zanskar (7&ndash;9 hours depending on road conditions)</li>
          </ul>
          <p style={proseStyle}>
            <strong>Notes:</strong> Flying to Leh means rapid altitude gain &mdash; sea level
            to 3,500m in 1.5 hours. Acclimatisation is not optional. Do not skip the rest
            day. Headaches, mild nausea, and fatigue are normal on the first day and typically
            resolve by day two.
          </p>
        </section>

        {/* --- Route 2: Srinagar --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Route 2: Srinagar &rarr; Kargil &rarr; Zanskar (Scenic)</h2>
          <p style={proseStyle}>
            <strong>Duration:</strong> 3 days from Srinagar.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li><strong>Day 1:</strong> Drive Srinagar &rarr; Kargil (7&ndash;8 hours via NH1). Crosses Zoji La pass (3,528m)</li>
            <li><strong>Day 2:</strong> Rest in Kargil or continue to Rangdum (midway point)</li>
            <li><strong>Day 3:</strong> Drive to Padum/Zanskar (5&ndash;7 hours from Rangdum)</li>
          </ul>
          <p style={proseStyle}>
            <strong>Advantage:</strong> Gradual altitude gain. You ascend from 1,600m
            (Srinagar) over two days, which is easier on the body than flying directly to
            Leh. The Srinagar&ndash;Kargil drive is also one of the most beautiful roads
            in India.
          </p>
        </section>

        {/* --- Route 3: Manali --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Route 3: Manali &rarr; Leh &rarr; Zanskar (Adventurous)</h2>
          <p style={proseStyle}>
            <strong>Duration:</strong> 4&ndash;5 days from Manali.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li><strong>Days 1&ndash;2:</strong> Drive Manali &rarr; Leh via the Manali&ndash;Leh Highway (2 days, overnight in Sarchu or Keylong)</li>
            <li><strong>Day 3:</strong> Rest in Leh</li>
            <li><strong>Days 4&ndash;5:</strong> Drive Leh &rarr; Kargil &rarr; Zanskar</li>
          </ul>
          <p style={proseStyle}>
            <strong>Note:</strong> The Manali&ndash;Leh Highway crosses five passes above
            4,000m. It is an extraordinary drive but physically demanding. Only choose this
            route if you enjoy road travel and want the journey to be part of the adventure.
          </p>
        </section>

        <PrimaryCTA
          label="We Handle the Logistics"
          subtext="All transport, acclimatisation stops, and route planning included in our Zanskar retreats."
          vertical="retreat"
          category="zanskar-travel"
          sourcePath={PATH}
        />

        {/* --- Acclimatisation --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>Acclimatisation: The Non-Negotiable Step</h2>
          <p style={proseStyle}>
            Zanskar sits at 3,500&ndash;4,000 metres. At this altitude, your blood absorbs
            less oxygen. The effects are predictable: headache, fatigue, mild nausea,
            disrupted sleep. These are normal and resolve within 24&ndash;48 hours for most
            people.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li><strong>Minimum 1 day of rest</strong> at altitude before the retreat begins</li>
            <li><strong>Drink 3&ndash;4 litres of water per day</strong> during acclimatisation</li>
            <li><strong>No alcohol</strong> for 48 hours before and after altitude gain</li>
            <li><strong>Walk gently</strong> &mdash; do not hike, run, or exert yourself on arrival day</li>
            <li><strong>Consult your doctor about Diamox</strong> (acetazolamide) if you are prone to altitude sickness</li>
          </ul>
          <p style={proseStyle}>
            Our Zanskar retreat itineraries build acclimatisation into the schedule. You
            will not begin intensive meditation practice until your body has adjusted.
          </p>
        </section>

        {/* --- International travellers --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>For International Participants</h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li><strong>Visa:</strong> You need an Indian tourist visa (e-visa available for most nationalities)</li>
            <li><strong>Inner Line Permit:</strong> Required for Ladakh. We process this for you</li>
            <li><strong>Flights:</strong> Fly international to Delhi, then domestic to Leh. Book Delhi&ndash;Leh separately for flexibility</li>
            <li><strong>Insurance:</strong> Ensure your travel insurance covers high-altitude trekking (some policies exclude above 3,000m)</li>
            <li><strong>Currency:</strong> Bring cash (INR). There are no ATMs in Zanskar. Leh has ATMs but they can run dry in peak season</li>
          </ul>
        </section>

        {/* --- The journey as practice --- */}
        <section style={sectionStyle}>
          <h2 style={h2Style}>The Journey Is the First Practice</h2>
          <p style={proseStyle}>
            Getting to Zanskar takes effort. The roads are long, the landscape is immense,
            and the pace is controlled by the mountain, not by you. This is not a flaw in
            the travel logistics &mdash; it is a feature. By the time you arrive at the
            monastery, you have already begun slowing down. The world you left behind feels
            far away because it is.
          </p>
          <p style={proseStyle}>
            Read about{' '}
            <Link href="/why-zanskar-is-perfect-for-retreats" style={{ color: 'var(--color-primary)' }}>
              what makes Zanskar exceptional for retreats
            </Link>
            {' '}and{' '}
            <Link href="/best-time-for-a-retreat-in-zanskar" style={{ color: 'var(--color-primary)' }}>
              the best time to visit
            </Link>.
            For programme details, see the{' '}
            <Link href="/meditation-retreat-zanskar" style={{ color: 'var(--color-primary)' }}>
              Zanskar meditation retreat
            </Link>
            {' '}page or the{' '}
            <Link href="/zanskar-meditation-retreat-june-2026" style={{ color: 'var(--color-primary)' }}>
              June 2026 departure
            </Link>.
          </p>
        </section>

        <FeaturedRetreat
          title="Zanskar Meditation Retreat — All Logistics Included"
          description="Airport pickup, acclimatisation planning, local transport, monastery accommodation, all meals, and facilitation."
          links={[
            { label: 'Zanskar location details', href: '/locations/zanskar' },
            { label: 'See retreat dates', href: '/retreat-calendar' },
            { label: 'Find your retreat', href: '/find-your-retreat' },
          ]}
        />

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <RelatedReads
          links={[
            { label: 'Meditation Retreat in Zanskar', href: '/meditation-retreat-zanskar' },
            { label: '7-Day Zanskar Itinerary', href: '/7-day-zanskar-meditation-retreat-itinerary' },
            { label: 'Why Zanskar Is Perfect for Retreats', href: '/why-zanskar-is-perfect-for-retreats' },
            { label: 'Best Time for a Retreat in Zanskar', href: '/best-time-for-a-retreat-in-zanskar' },
            { label: 'My 7-Day Retreat in Zanskar', href: '/my-7-day-meditation-retreat-in-zanskar' },
          ]}
        />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)' }}>&larr; Zanskar</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/locations" style={{ color: 'var(--color-primary)' }}>All Locations</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/retreat-calendar" style={{ color: 'var(--color-primary)' }}>Retreat Calendar</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
