import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/treks/trek-near-delhi';

export function generateMetadata(): Metadata {
  return {
    title: 'Best Treks Near Delhi for a Weekend Escape — 2–3 Day Himalayan Treks | Retreats And Treks',
    description:
      'Find the best treks near Delhi in Chakrata and Sankri. Weekend-friendly Himalayan treks 6–9 hours from the capital with guided itineraries and forest trails.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Best Treks Near Delhi for a Weekend Escape',
      description:
        'Weekend Himalayan treks within driving distance of Delhi. Chakrata and Sankri — forest trails, ridge walks and guided itineraries for 2–3 day trips.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is the closest Himalayan trek to Delhi?',
    answer:
      'Chakrata offers the closest Himalayan trekking from Delhi at six to seven hours by road via Dehradun. The Chakrata Weekend Trek is a two-night, three-day itinerary covering forest trails, meadows, and ridge campsites at 2,100 metres. It requires no prior trekking experience and is the most practical option for a standard Friday-to-Sunday window.',
  },
  {
    question: 'Can I complete a Himalayan trek in 2 days from Delhi?',
    answer:
      'Yes. A Friday evening departure from Delhi places you in Chakrata by midnight. Saturday is a full trekking day — forest trails, ridge walks, and campsite overnight. Sunday morning offers a short closing hike before the return drive. The two-day format works best with Chakrata because the travel time is manageable and the trail difficulty is beginner-friendly. Sankri requires a longer drive, making a two-day format tight without an extended weekend.',
  },
  {
    question: 'Are treks near Delhi beginner-friendly?',
    answer:
      'Chakrata treks are fully beginner-friendly. Trails stay between 1,800 and 2,400 metres — no altitude sickness concerns, no glacier crossings, no technical sections. The terrain is forested ridge walking on well-defined paths. Guided itineraries include safety briefings, pace management, and support. Sankri treks like Kedarkantha are moderate and suit fit beginners with some preparation. Neither requires prior Himalayan experience.',
  },
  {
    question: 'What is the best time for treks near Delhi?',
    answer:
      'October to November and February to April are the strongest windows. Clear skies, moderate temperatures, and dry trails. Spring brings wildflowers and birdsong. Autumn offers the sharpest Himalayan visibility. Summer (May to June) works for Chakrata — it stays cool while Delhi temperatures climb past 40°C. Sankri is best from April through November. Winter treks are possible in Chakrata with occasional snow, and Kedarkantha is a premier winter snow trek from December to March.',
  },
  {
    question: 'Is Sankri feasible for a weekend trek from Delhi?',
    answer:
      'Sankri is eight to nine hours from Delhi by road, which makes a standard Friday-to-Sunday weekend tight. It works well for extended weekends, three-day holidays, or if you can depart Thursday evening. The most popular Sankri trek — Kedarkantha — is a four-to-five-day itinerary, not a weekend format. For a true two-day weekend trek, Chakrata is the more practical choice. Save Sankri for when you have three or more days.',
  },
];

export default function TrekNearDelhiPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Treks Near Delhi', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Treks', href: '/treks' },
          { name: 'Treks Near Delhi' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Best Treks Near Delhi for a Weekend Escape
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Six to nine hours by road separates Delhi from genuine Himalayan trekking. That
            is a Friday evening departure, a Saturday on mountain trails, and a Sunday return
            — no annual leave, no flights, no multi-day logistics. The Uttarakhand foothills
            hold forest trails, ridge walks, waterfall approaches, and summit routes within
            a weekend driving radius that most Delhi professionals underestimate.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            The question is not whether a weekend trek from Delhi is feasible. It is which
            trail matches your fitness, your group, and the hours you have. Two destinations
            dominate this radius: Chakrata for accessible forest trekking and Sankri for
            deeper mountain immersion. Both deliver genuine Himalayan terrain without the
            overhead of a week-long expedition.
          </p>
        </header>

        <PrimaryCTA
          label="Plan My Weekend Trek"
          subtext="Planning a weekend trek from Delhi? We can help."
          vertical="trek"
          category="near-delhi"
          sourcePath="/treks/trek-near-delhi"
        />

        {/* ── HOW CLOSE ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            How Close Are These Treks to Delhi?
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Realistic drive times from central Delhi on a Friday evening — not best-case
            estimates, but traffic-adjusted numbers.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Chakrata — 6–7 hours.</strong> Via the Delhi–Dehradun highway, then a
              hill extension into the cantonment area. The Delhi–Dehradun stretch is
              well-maintained and fast. The final hill section adds an hour but signals the
              transition into trekking territory. Arrival by midnight on a Friday departure
              after work is realistic. This is the practical weekend default.
            </li>
            <li>
              <strong>Sankri — 8–9 hours.</strong> Via Dehradun and Purola into the upper
              Tons Valley. The additional two hours beyond Chakrata take you significantly
              deeper into the mountains — higher altitude, denser forest, more remote trail
              access. Tight for a standard weekend, but workable for extended weekends or
              three-day holidays with a Thursday evening departure.
            </li>
            <li>
              <strong>Munsiyari — 10–12 hours.</strong> Deep in the Kumaon Himalayas. Not a
              weekend option from Delhi. Mention it only because it appears in searches — the
              drive time makes it a four-day-minimum destination. Plan accordingly if this is
              your target.
            </li>
          </ul>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            All destinations are accessible by private car or shared cab. The Delhi–Dehradun
            Shatabdi train is a practical alternative for the first leg — four-and-a-half
            hours to Dehradun, then a taxi onward. No flights required.
          </p>
        </section>

        <PrimaryCTA
          label="Plan My Weekend Trek"
          subtext="Share your available dates. We will match you to the right trail."
          vertical="trek"
          category="near-delhi"
          sourcePath="/treks/trek-near-delhi"
        />

        {/* ── BEST WEEKEND TREKS ───────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Weekend Treks Near Delhi
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Two locations account for the strongest weekend trekking from Delhi. Each serves
            a different fitness level, time budget, and mountain experience.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/treks/location/chakrata" style={{ color: 'inherit' }}>
              Chakrata Treks (6–7 Hours from Delhi)
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Chakrata sits at 2,200 metres on a deodar-covered ridge in Dehradun district.
            The trekking here is forest-based: mid-altitude trails between 1,800 and 2,400
            metres through dense canopy, limestone formations, and open meadows. No glacier
            crossings, no snow-line scrambles, no altitude acclimatisation needed. This is
            Himalayan trekking at walking pace — accessible to anyone with basic fitness.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/chakrata/weekend-trek" style={{ color: 'var(--color-primary)' }}>
              Chakrata Weekend Trek
            </Link>{' '}
            is the flagship route — a two-night, three-day itinerary covering 8 km of forest
            trails, grassland meadows, and ridge campsites. No prior trekking experience
            required. Pickup from Dehradun makes it logistically effortless. This is the
            single best option for a first Himalayan trek from Delhi.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Beyond the weekend route, the{' '}
            <Link href="/treks/location/chakrata/tiger-fall-trek" style={{ color: 'var(--color-primary)' }}>
              Tiger Fall Trek
            </Link>{' '}
            leads to one of the region&apos;s highest direct waterfalls — 12 km through dense
            forest to a natural pool. Best in monsoon and post-monsoon months when water
            volume peaks. The{' '}
            <Link href="/treks/location/chakrata/budher-caves-trek" style={{ color: 'var(--color-primary)' }}>
              Budher Caves Trek
            </Link>{' '}
            offers a rare combination of forest walking and underground exploration through
            ancient limestone cave systems. Both are day-trek or overnight formats that fit
            a weekend window.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/treks/location/sankri" style={{ color: 'inherit' }}>
              Sankri Treks (8–9 Hours from Delhi)
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Sankri sits in the upper Tons Valley near the Govind Wildlife Sanctuary — deeper
            into the mountains, at the edge of the treeline. The trekking here is more
            demanding: higher altitude, longer trails, and terrain that shifts from pine
            forest to alpine meadow to snow above the treeline.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>
              Kedarkantha Trek
            </Link>{' '}
            is the headline route — a four-to-five-day summit trek reaching 3,800 metres
            with panoramic views of the Swargarohini, Bandarpoonch, and Black Peak ranges.
            It is one of India&apos;s most popular winter treks (December to March) when the
            trail is snow-covered. Not a weekend format, but the defining reason to plan an
            extended trip from Delhi to Sankri.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            The{' '}
            <Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: 'var(--color-primary)' }}>
              Har Ki Dun Trek
            </Link>{' '}
            follows the ancient Tons Valley into a glacial cradle — five to six days through
            some of the most pristine forest and meadow terrain in Uttarakhand. Both{' '}
            <Link href="/treks/location/sankri" style={{ color: 'var(--color-primary)' }}>
              Sankri treks
            </Link>{' '}
            require more time than a standard weekend but reward the investment with mountain
            experiences that shorter routes cannot match.
          </p>
        </section>

        {/* ── WHAT MAKES WEEKEND FRIENDLY ──────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            What Makes a Trek &ldquo;Weekend Friendly&rdquo;?
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Not every Himalayan trek fits a Friday-to-Sunday window. Four factors determine
            weekend feasibility.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Drive time under 8 hours.</strong> Beyond that, you lose too much of
              Saturday to travel. Chakrata&apos;s six-to-seven-hour range is the sweet spot —
              arrive Friday night, trek all Saturday, depart Sunday.
            </li>
            <li>
              <strong>Trail length under 15 km total.</strong> A weekend trek needs to be
              completable in one full trekking day plus a short morning session. Eight to
              twelve kilometres across two days is the practical range. Longer routes require
              three or more trekking days.
            </li>
            <li>
              <strong>Elevation below 3,000 metres.</strong> Higher-altitude treks require
              acclimatisation days that a weekend does not allow. Staying below 2,500 metres
              — as Chakrata treks do — eliminates altitude sickness risk entirely.
            </li>
            <li>
              <strong>Logistical simplicity.</strong> Pickup from a transport hub (Dehradun
              station or airport), pre-arranged camping or lodge accommodation, and a guided
              itinerary that handles navigation. The less planning you need to do, the more
              repeatable the weekend format becomes.
            </li>
          </ul>
        </section>

        {/* ── WHO SHOULD CHOOSE ────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Should Choose a Trek Near Delhi
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>First-time trekkers.</strong> Chakrata is the ideal entry point — no
              experience required, no extreme fitness demands, and professional guides who
              manage pace and safety. A weekend trek here builds the confidence and
              conditioning for longer expeditions later.
            </li>
            <li>
              <strong>Corporate groups.</strong> Team offsites in the mountains deliver more
              bonding than another conference room. A guided weekend trek — shared physical
              challenge, campfire meals, ridge-top views — creates team cohesion that
              structured workshops rarely achieve.
            </li>
            <li>
              <strong>Couples.</strong> A shared mountain weekend without tourist crowds or
              resort distractions. Trekking together in forest silence, camping under stars,
              cooking over fire — this is a different quality of shared experience.
            </li>
            <li>
              <strong>Solo travellers.</strong> Joining a guided group trek is the easiest
              way for solo travellers to access the Himalayas safely. You get the mountain
              experience without the logistics of planning a solo expedition.
            </li>
          </ul>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            Looking for restoration rather than trail time? Our{' '}
            <Link href="/retreats/retreat-near-delhi" style={{ color: 'var(--color-primary)' }}>
              Himalayan retreats near Delhi
            </Link>{' '}
            guide covers yoga, meditation, and wellness programmes within the same driving
            radius.
          </p>
        </section>

        {/* ── BEST SEASON ──────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Season for Treks Near Delhi
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>October to November</strong> is the peak trekking window. Post-monsoon
            air is crystal clear, temperatures are comfortable (10–22°C depending on
            altitude), and trails are dry with firm footing. Himalayan visibility is at its
            best — ridge walks in Chakrata offer sightlines to Bandarpoonch and the greater
            ranges. This is the strongest recommendation for first-time trekkers.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>February to April</strong> brings spring to the foothills. Wildflowers,
            birdsong, and warming temperatures. Rhododendrons bloom at higher elevations in
            March and April. Trails are well-defined and the forest canopy is alive.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>May to June</strong> is summer trekking season. Chakrata stays cool
            (15–25°C) while Delhi temperatures climb past 40°C. The altitude provides natural
            heat escape. Trails are dry but the forest shade keeps the walking comfortable.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>July to September</strong> is monsoon. Tiger Fall in Chakrata is at its
            most spectacular — thundering cascade and lush forest. But trails are slippery,
            leeches are present, and river crossings can be unpredictable. Experienced
            trekkers only.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>December to March</strong> is winter. Chakrata receives occasional
            snowfall — beautiful but requires cold-weather preparedness. Kedarkantha in
            Sankri becomes a premier snow trek in this window, drawing trekkers specifically
            for the snow-covered summit experience.
          </p>
        </section>

        {/* ── COMMERCIAL NAVIGATION ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: '#fafafa' }}>
          <p style={{ lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
            Exploring all trekking options? See the full{' '}
            <Link href="/treks" style={{ color: 'var(--color-primary)' }}>
              Himalayan treks directory
            </Link>{' '}
            for guided itineraries across all locations, difficulty levels, and durations.
          </p>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-lg)' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </section>

      </article>
    </TrackedPage>
  );
}
