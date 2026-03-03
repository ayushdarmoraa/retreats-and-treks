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

const PATH = '/treks/winter-treks-uttarakhand';

export function generateMetadata(): Metadata {
  return {
    title: 'Best Winter Treks in Uttarakhand — Snow Treks Guide (Dec–Feb) | Retreats And Treks',
    description:
      'Discover the best winter treks in Uttarakhand including Kedarkantha snow summit, Har Ki Dun valley and Tiger Fall. Guided snow treks from December to February for all levels.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Best Winter Treks in Uttarakhand — Snow Treks Guide',
      description:
        'Snow treks in Uttarakhand from December to February. Guided summit routes, valley walks and forest trails across Sankri and Chakrata.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is the best snow trek in Uttarakhand?',
    answer:
      'Kedarkantha is the best snow trek in Uttarakhand. It offers a four-day guided route from Sankri to a 3,800-metre summit with consistent snow cover from December through March. The trail passes through snow-laden deodar forest, open alpine meadows, and culminates in a summit with 360-degree Himalayan panoramas. It is accessible to beginners, professionally guided, and widely regarded as the finest winter trek in northern India.',
  },
  {
    question: 'Is Kedarkantha safe in winter?',
    answer:
      'Yes. Kedarkantha is one of the safest winter treks in the Himalayas. The trail is well-established and operated by experienced guide teams throughout the season. Altitude gain is gradual over four days, reducing the risk of altitude sickness. Guided groups carry emergency communication equipment, first-aid supplies, and follow tested acclimatisation protocols. The route avoids avalanche-prone terrain and exposed ridges. Thousands of trekkers — including first-timers — complete Kedarkantha safely every winter.',
  },
  {
    question: 'What temperature does it reach on winter treks in Uttarakhand?',
    answer:
      'Temperatures vary by altitude and month. At Sankri base camp (1,920 metres), daytime temperatures range from 5 to 10°C and nighttime drops to minus 2 to minus 5°C in January. At higher camps on Kedarkantha (3,000 to 3,500 metres), nighttime temperatures reach minus 8 to minus 12°C. Summit day temperatures can drop to minus 15°C with wind chill. Proper layering — thermal base, insulating mid-layer, windproof outer shell — makes these conditions comfortable.',
  },
  {
    question: 'Can beginners do winter treks in Uttarakhand?',
    answer:
      'Yes, with the right trek choice and guided support. Kedarkantha is specifically designed to be beginner-accessible in winter — gradual altitude gain, established campsites, guided pace management, and gear support. Basic fitness is required: the ability to walk five to seven kilometres per day on uneven terrain with a daypack. No prior snow trekking experience is needed. Guided operators provide gaiters, microspikes, and trekking poles. Two to three weeks of daily walking or light jogging is sufficient preparation.',
  },
  {
    question: 'What gear is required for winter treks in Uttarakhand?',
    answer:
      'Essential gear includes: thermal base layers (merino wool or synthetic), insulating mid-layer (fleece or down jacket), waterproof and windproof outer shell, insulated trekking boots with ankle support, wool or synthetic socks (two pairs per day), warm gloves (liner plus outer), balaclava or buff, sunglasses with UV protection, trekking poles, and a headlamp. For snow sections: gaiters and microspikes are essential and typically provided by guided operators. A 30 to 40 litre daypack carries daily essentials while porters handle camping gear.',
  },
];

export default function WinterTreksUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Winter Treks in Uttarakhand', url: canonicalUrl },
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
          { name: 'Winter Treks in Uttarakhand' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Best Winter Treks in Uttarakhand (Snow Treks Guide)
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            December to February transforms the Himalayan trails of Uttarakhand into an
            entirely different landscape. Snow-covered forest. Frozen meadows. Summit
            panoramas that stretch across 200 kilometres of white peaks. Winter trekking
            in this region is not an extreme sport — it is an accessible, guided, and
            profoundly photogenic way to experience the mountains at their most dramatic.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            The trails that are green and flowering in spring become white corridors through
            deodar and oak forest in winter. The campsites that sit in alpine meadows become
            snow fields under clear skies. And the summits — reachable in three to four
            days by trekkers with no prior snow experience — deliver views that no other
            season can match. If you are considering your first snow trek, winter in
            Uttarakhand is where to start.
          </p>
        </header>

        <PrimaryCTA
          label="Plan My Winter Trek"
          subtext="Planning a winter trek? We can help you choose the right route."
          vertical="trek"
          category="seasonal"
          sourcePath="/treks/winter-treks-uttarakhand"
        />

        {/* ── WHY UTTARAKHAND ──────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Why Uttarakhand Is Ideal for Winter Treks
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Not every Himalayan region is suitable for winter trekking. High passes in
            Ladakh and Spiti are snowbound and inaccessible. Kashmir carries access
            complexity. Uttarakhand occupies the narrow band where winter snow is reliable,
            altitudes are managed, and road access remains open — making it the most
            practical winter trekking destination in northern India.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Reliable snow cover.</strong> Between 2,500 and 3,800 metres, trails
              receive consistent snowfall from late November through February. The snow
              line drops low enough that even two-day treks encounter winter conditions,
              while summit routes are fully snow-covered for the entire season.
            </li>
            <li>
              <strong>Managed altitudes.</strong> Winter treks in Uttarakhand stay below
              4,000 metres. This is the threshold below which altitude sickness is rare in
              healthy, acclimatised adults. The gradual altitude gain on trails like
              Kedarkantha means your body adjusts naturally without pharmaceutical support.
            </li>
            <li>
              <strong>Forest-to-summit routes.</strong> Trails begin in dense deodar and
              oak forest — sheltered, windless, and visually spectacular under snow — before
              opening into exposed alpine terrain near the summit. This progression provides
              natural protection during the lower sections and dramatic exposure only at the
              top, when you are acclimatised and prepared.
            </li>
            <li>
              <strong>Accessible base camps.</strong> The{' '}
              <Link href="/treks/location/sankri" style={{ color: 'var(--color-primary)' }}>
                Sankri trek base
              </Link>{' '}
              — the starting point for the two most popular winter treks — remains road-accessible
              throughout winter. Eight to nine hours from Delhi by car. No flights, no permits,
              no multi-day approach marches. You drive to the trailhead and start walking.
            </li>
          </ul>
        </section>

        <PrimaryCTA
          label="Plan My Winter Trek"
          subtext="Tell us your dates and group size. We will match you to the right winter trek."
          vertical="trek"
          category="seasonal"
          sourcePath="/treks/winter-treks-uttarakhand"
        />

        {/* ── BEST WINTER TREKS ────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Winter Treks in Uttarakhand
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Three treks define the winter season — each offering a different character,
            commitment level, and snow experience.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Kedarkantha Trek — The Classic Snow Summit
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>
              Kedarkantha Trek
            </Link>{' '}
            is the definitive winter trek in India. Four days, 20 km, summit at 3,800
            metres. The trail climbs from Sankri
            through snow-laden pine forest, crosses open meadows blanketed in white, and
            ascends a final ridge to a summit that commands views of Swargarohini,
            Bandarpoonch, and Black Peak. On a clear January morning, the panorama extends
            across six major Himalayan ranges.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            What makes Kedarkantha exceptional for winter is the combination of snow depth
            and accessibility. By mid-December, the trail carries 30 to 60 cm of snow at
            camp level and deeper drifts above the tree line. Yet the gradient remains
            gentle — 400 to 600 metres of altitude gain per day — and guided groups manage
            pace, provide microspikes for icy sections, and set camps at tested locations.
            Thousands of first-time trekkers complete this route every winter via{' '}
            <Link href="/treks/location/sankri" style={{ color: 'var(--color-primary)' }}>
              Sankri winter treks
            </Link>. It is not an
            expedition. It is a well-managed walk through extraordinary terrain.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Har Ki Dun in Winter — Snow Valley Experience
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: 'var(--color-primary)' }}>
              Har Ki Dun Trek
            </Link>{' '}
            transforms in winter from a green valley walk into a snow-covered corridor
            between 5,000-metre walls. The Tons Valley narrows, the river quiets under
            ice, and the villages along the trail become isolated outposts in a white
            landscape. Five to six days, approximately 40 km.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Winter Har Ki Dun is more demanding than Kedarkantha — longer daily distances,
            colder temperatures at camp, and fewer guided groups operating the route. It
            is best suited for trekkers who have completed at least one winter trek
            previously. The reward is proportional: the Har Ki Dun valley in January,
            ringed by fresh snow and empty of other groups, is one of the most spectacular
            sights in the Indian Himalayas. Access depends on road conditions — confirm
            availability with operators before booking between January and mid-February.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Tiger Fall Trek — Mild Winter Option
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/chakrata/tiger-fall-trek" style={{ color: 'var(--color-primary)' }}>
              Tiger Fall Trek in Chakrata
            </Link>{' '}
            operates year-round, including winter. At 1,800 to 2,200 metres, snowfall is
            intermittent rather than guaranteed — some winters bring light dustings, others
            remain dry. The forest canopy keeps the trail sheltered and the temperature
            moderate.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            This is not a snow trek in the Kedarkantha sense. It is a winter forest walk
            in{' '}
            <Link href="/treks/location/chakrata" style={{ color: 'var(--color-primary)' }}>
              Chakrata
            </Link>{' '}
            — quiet, cold-air trekking through deodar groves without the commitment,
            altitude, or gear requirements of a high-altitude snow route. Ideal for
            trekkers who want a winter mountain experience without multi-day investment,
            or as a warm-up before a Kedarkantha attempt later in the season.
          </p>
        </section>

        {/* ── WHO SHOULD CHOOSE ────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Should Choose a Winter Trek?
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>First snow experience.</strong> If you have never walked in deep snow,
              Kedarkantha is the place to start. The guided format means you do not need
              personal snow gear or navigation skills. Microspikes, gaiters, and trekking
              poles are provided. You learn snow-walking technique on the trail — step
              placement, pole usage, layering management — with expert guidance.
            </li>
            <li>
              <strong>Photographers.</strong> Winter light in the Himalayas is the sharpest
              of any season. Low sun angles create long shadows across snow fields. Dawn at
              the Kedarkantha summit turns six mountain ranges golden. Frozen trees, mist
              through forest, and snow-covered meadows offer compositions unavailable at
              any other time of year. Bring a wide-angle and a telephoto — you will use both.
            </li>
            <li>
              <strong>Corporate groups.</strong> A winter trek is the most memorable
              team-building format available. Shared physical challenge in snow conditions,
              campfire conversations at minus five, and a collective summit create bonds
              that no conference or offsite can replicate. Kedarkantha works well for groups
              of 8 to 15 — large enough for group dynamics, small enough for guided safety.
            </li>
            <li>
              <strong>Beginner trekkers (with preparation).</strong> Winter treks are
              accessible to{' '}
              <Link href="/treks/beginner-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
                beginner-friendly treks
              </Link>{' '}
              who prepare adequately. Two to three weeks of daily cardio — walking, jogging,
              or stair climbing — is sufficient for Kedarkantha. The cold is manageable with
              proper layers. The snow is navigable with microspikes. The altitude is safe
              with gradual acclimatisation. The only prerequisite is willingness.
            </li>
          </ul>
        </section>

        {/* ── WHAT TO EXPECT ───────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            What to Expect on a Snow Trek
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Snow trekking is fundamentally different from summer trekking. The physical
            demands, the gear, and the daily rhythm all shift. Knowing what to expect
            removes the uncertainty that makes winter trekking seem intimidating.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Gaiters.</strong> Worn over boots and lower legs to keep snow out.
              Essential above the tree line where snow depth exceeds ankle height. Provided
              by most guided operators. Without gaiters, wet boots become the fastest route
              to an uncomfortable — and potentially dangerous — trek.
            </li>
            <li>
              <strong>Microspikes.</strong> Crampon-light traction devices that strap onto
              trekking boots. Required on icy sections and compacted snow — especially on
              summit day. They transform slippery terrain into firm footing. Provided by
              guided operators.
            </li>
            <li>
              <strong>Cold temperatures.</strong> Expect minus 5 to minus 12°C at camp and
              colder at summit. The cold is manageable with proper layering: thermal base,
              fleece or down mid-layer, windproof outer shell. The critical mistake is
              cotton — it retains moisture and chills rapidly. Wear synthetics or wool
              against the skin.
            </li>
            <li>
              <strong>Snow depth and surface.</strong> Snow conditions vary by altitude and month. At 2,500 metres, expect 15 to 30 centimetres of compacted snow from late December onward — firm underfoot but requiring gaiters. Between 3,000 and 3,500 metres, accumulation reaches 60 to 90 centimetres with softer, powder-like sections where each step sinks to mid-shin; microspikes become essential for traction on icy traverses and frozen switchbacks. Summit-day snow near 3,800 metres can reach one metre or more in peak January, with wind-crusted surfaces interspersed with breakable crust. A three-layer system — moisture-wicking thermal base, insulating fleece or down mid-layer, windproof and waterproof outer shell — handles the full temperature swing from minus 5°C daytime walking to minus 12°C nighttime camp. Extremities lose heat fastest: liner gloves under insulated outers, two pairs of wool-blend socks per day, and a balaclava or thermal buff are non-negotiable above the tree line.
            </li>
            <li>
              <strong>Short daylight.</strong> Winter days in the Himalayas offer about nine
              hours of usable light. Trekking starts early — typically 7 AM — to ensure
              camp arrival by mid-afternoon. Summit day starts before dawn (4 to 5 AM) to
              catch sunrise from the peak. A headlamp is essential gear, not optional.
            </li>
            <li>
              <strong>Fitness.</strong> Snow walking requires 20 to 30 percent more energy
              than dry-trail walking. Each step sinks into snow, and the cold burns
              additional calories for thermoregulation. The fitness baseline is the same as
              a summer trek plus a margin — if a summer Kedarkantha requires moderate fitness,
              winter Kedarkantha requires moderate-plus. The difference is manageable with
              preparation.
            </li>
          </ul>
        </section>

        {/* ── BEST TIME ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Time for Winter Treks
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>December.</strong> The season opens. Early December may have patchy
            snow at lower elevations, but by mid-December the trails above 2,500 metres
            are fully covered. Temperatures are cold but not extreme. This is the most
            comfortable winter month — good snow, manageable cold, and the festive energy
            of the season&apos;s first groups on the trail. Christmas and New Year weekends
            are peak demand periods — book early.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>January.</strong> The coldest month and the deepest snow. Summit
            temperatures drop to minus 15°C with wind chill. Snow depth at camp can exceed
            one metre after heavy falls. For{' '}
            <Link href="/treks/trek-near-delhi" style={{ color: 'var(--color-primary)' }}>
              weekend treks near Delhi
            </Link>, January is the most dramatic month — the landscape is at its most
            photogenic, the snow is fresh and deep, and the mountain silence is absolute.
            However, occasional heavy snowfall can delay summit attempts by a day. Guided
            operators build flexibility into January itineraries for this reason.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>February.</strong> Snow begins to consolidate. Trails are firmer
            underfoot — less post-holing, more efficient walking. Temperatures start to
            moderate in the second half of the month. Daylight hours increase. February is
            the pragmatic choice: winter conditions with slightly more comfort than January.
            Snow cover remains excellent through the month on Kedarkantha.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>March.</strong> The shoulder month. Snow is retreating below 3,000
            metres but remains thick near the summit. Daytime temperatures are pleasant —
            5 to 10°C at camp — while nights are still cold. The trail becomes a mix of
            snow and dry sections. March Kedarkantha is gentler than January Kedarkantha
            but still delivers a snow summit experience. By late March, the winter season
            transitions into spring.
          </p>
        </section>

        {/* ── COMMERCIAL NAVIGATION ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: '#fafafa' }}>
          <p style={{ lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
            Exploring all seasons and difficulty levels? See the full{' '}
            <Link href="/treks" style={{ color: 'var(--color-primary)' }}>
              Himalayan treks directory
            </Link>{' '}
            for guided itineraries across Uttarakhand.
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
