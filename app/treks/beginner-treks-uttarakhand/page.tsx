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

const PATH = '/treks/beginner-treks-uttarakhand';

export function generateMetadata(): Metadata {
  return {
    title: 'Best Beginner Treks in Uttarakhand — Easy Himalayan Treks for First-Timers | Retreats And Treks',
    description:
      'Find the best beginner treks in Uttarakhand including Kedarkantha, Har Ki Dun and Tiger Fall. Easy Himalayan treks with guided itineraries for first-time trekkers.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
  index: false,
  follow: true,
},
    openGraph: {
      title: 'Best Beginner Treks in Uttarakhand',
      description:
        'Easy Himalayan treks in Uttarakhand for first-time trekkers. Guided itineraries across Chakrata and Sankri — forest trails, summit routes and valley walks.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is the easiest trek in Uttarakhand?',
    answer:
      'The Tiger Fall Trek in Chakrata is the easiest Himalayan trek in Uttarakhand. It stays between 1,800 and 2,200 metres, covers 12 km on well-defined forest trails, and requires no prior trekking experience. The terrain is forested and shaded with no exposed ridges, no glacier crossings, and no altitude concerns. It is completable in a single day or a comfortable overnight format. For a multi-day beginner trek with a summit, Kedarkantha is the strongest option — moderate effort with guided support throughout.',
  },
  {
    question: 'Is Kedarkantha suitable for beginners?',
    answer:
      'Yes. Kedarkantha is widely regarded as one of the best first summit treks in India. The trail is well-marked, the altitude gain is gradual over four days, and the summit at 3,800 metres is reached without technical climbing. Guided groups manage pace and acclimatisation. Basic fitness — the ability to walk six to eight kilometres per day with a daypack — is sufficient. Thousands of first-time trekkers complete Kedarkantha every season.',
  },
  {
    question: 'What fitness level is required for beginner treks in Uttarakhand?',
    answer:
      'You need moderate baseline fitness — the ability to walk comfortably for four to six hours per day on uneven terrain. No gym-level conditioning required. If you can climb five flights of stairs without stopping, you have the foundation for Chakrata treks. Kedarkantha and Har Ki Dun require slightly more stamina due to longer daily distances and higher altitude. Two to three weeks of daily walking or light jogging before the trek is sufficient preparation for most beginners.',
  },
  {
    question: 'Can beginners trek in winter in Uttarakhand?',
    answer:
      'Yes, with the right trek choice. Kedarkantha is specifically a winter trek — December to March — and is designed for the snow experience. The trail is well-supported with guided groups, and the gradual altitude gain allows acclimatisation. Winter gear (layered clothing, insulated boots, trekking poles) is essential. Chakrata treks are possible in winter but trails may be icy at higher points. Har Ki Dun is not recommended in winter due to snow-blocked access roads.',
  },
  {
    question: 'How many days should a first trek be?',
    answer:
      'Two to four days is the ideal range for a first Himalayan trek. A two-day format — such as the Chakrata Weekend Trek — gives you a taste of mountain trekking without heavy commitment. A four-day format — such as Kedarkantha — allows gradual acclimatisation, progressive trail challenge, and a genuine summit experience. Longer is better for depth, but a two-day trek is enough to know whether you want more.',
  },
];

export default function BeginnerTreksUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Beginner Treks in Uttarakhand', url: canonicalUrl },
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
          { name: 'Beginner Treks in Uttarakhand' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Best Beginner Treks in Uttarakhand
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            You do not need mountaineering experience to trek in the Himalayas. Uttarakhand
            holds a range of beginner-friendly trails between 1,800 and 3,800 metres — forest
            walks, ridge routes, valley traverses, and even a summit trek — all designed for
            first-time participants. Two to four days. Guided support. No technical climbing.
            Just walking through some of the most beautiful mountain terrain on earth.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            &ldquo;Beginner&rdquo; does not mean lesser. It means the trails are graded for
            accessibility: gradual elevation gain, well-marked paths, manageable daily
            distances, and logistics handled by experienced guides. The mountains are the
            same — deodar forests, Himalayan panoramas, glacial rivers, alpine meadows. The
            only difference is that the route is designed so that your first trek is a
            success, not a survival test.
          </p>
        </header>

        {/* ── WHAT MAKES BEGINNER-FRIENDLY ─────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            What Makes a Trek Beginner-Friendly?
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Not every Himalayan trek is suitable for a first outing. The difference between
            beginner-friendly and intermediate is not subjective — it is measurable across
            five factors.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Short duration (2–4 days).</strong> Long enough for genuine mountain
              immersion, short enough that fatigue does not accumulate beyond comfort. Two
              days for a taste, four days for a complete experience including a summit.
            </li>
            <li>
              <strong>Gradual elevation gain.</strong> Beginner trails gain altitude slowly —
              typically 400 to 600 metres per trekking day. This allows natural
              acclimatisation without headaches, nausea, or breathlessness. Sudden jumps
              above 3,500 metres are avoided.
            </li>
            <li>
              <strong>Clear, well-marked trails.</strong> No route-finding required. Paths
              are established, often centuries old, and maintained by local communities.
              Guided groups follow known itineraries with tested campsites and water sources.
            </li>
            <li>
              <strong>Established logistics.</strong> Homestay accommodation, base-camp tents,
              or lodge stays at set intervals. Meals cooked on-trail. Porters or pack animals
              carry heavy gear. The trekker carries only a daypack — water, snacks, rain
              layer, camera. This removes the logistical burden that makes unsupported
              trekking intimidating.
            </li>
            <li>
              <strong>Altitude below 4,000 metres.</strong> The beginner ceiling sits around
              3,800 metres. Below this, altitude-related illness is rare in healthy adults
              with normal acclimatisation. Trails that stay between 1,800 and 2,500 metres —
              like Chakrata — eliminate altitude as a factor entirely.
            </li>
          </ul>
        </section>

        {/* ── BEST BEGINNER TREKS ──────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Beginner Treks in Uttarakhand
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Three treks stand out for beginners — each offering a different character,
            duration, and level of challenge.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Kedarkantha Trek (Sankri) — The First Summit
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/sankri" style={{ color: 'var(--color-primary)' }}>
              Sankri trek base
            </Link>{' '}
            serves as the starting point for two of the three best beginner treks in Uttarakhand. The{' '}
            <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>
              Kedarkantha Trek
            </Link>{' '}
            is widely considered the best first summit trek in India. Four days, 20 km, and
            a summit at 3,800 metres with 360-degree views of the Swargarohini, Bandarpoonch,
            and Black Peak ranges. The trail rises through pine and oak forest, crosses alpine
            meadows, and ascends a final snow-covered ridge to the peak. It sounds dramatic.
            It is. But the gradient is gentle, the campsites are established, and guided
            groups manage the pace to ensure acclimatisation happens naturally.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Kedarkantha is specifically a winter trek — December to March — when the trail
            is snow-covered and the summit offers the most spectacular panorama. This means
            your first Himalayan trek can also be your first snow trek. The combination of
            accessibility and visual reward is unmatched at this difficulty level. Based in
            Sankri, eight to nine hours from Delhi by road.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Har Ki Dun Trek (Sankri) — The Valley Walk
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: 'var(--color-primary)' }}>
              Har Ki Dun Trek
            </Link>{' '}
            follows the ancient Tons Valley into a glacial cradle surrounded by 5,000-metre
            peaks. Five to six days, covering approximately 40 km at a walking pace through
            some of the most pristine forest and meadow terrain in Uttarakhand. The trail
            passes through traditional Himalayan villages, crosses wooden bridges over
            glacial streams, and opens into the vast Har Ki Dun valley — a natural
            amphitheatre of ice and rock.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            This is technically an easy-to-moderate trek. The daily distances are longer
            than Kedarkantha, and the total duration demands more sustained fitness. But the
            altitude stays below 3,600 metres, the gradient is gentle throughout, and the
            trail is well-established with hut accommodation at multiple stops. Best from
            April to June and September to November. Also based in{' '}
            <Link href="/treks/location/sankri" style={{ color: 'var(--color-primary)' }}>
              Sankri
            </Link>.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Tiger Fall Trek (Chakrata) — The Day Trek
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/chakrata/tiger-fall-trek" style={{ color: 'var(--color-primary)' }}>
              Tiger Fall Trek in Chakrata
            </Link>{' '}
            is the lowest-commitment introduction to Himalayan trekking. Twelve kilometres
            through dense deodar and oak forest to one of the region&apos;s highest direct
            waterfalls. The trail stays between 1,800 and 2,200 metres — no altitude
            concerns, no technical sections, no multi-day commitment. Completable in a
            single day or a comfortable overnight format.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Based in{' '}
            <Link href="/treks/location/chakrata" style={{ color: 'var(--color-primary)' }}>
              Chakrata
            </Link>, six to seven hours from Delhi. Best in monsoon and post-monsoon months
            (July to October) when the waterfall is at full volume. The forest canopy makes
            this trail comfortable even in warm months. For beginners testing whether
            Himalayan trekking is for them, Tiger Fall delivers the answer in a single day
            without the investment of a multi-day expedition.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            The{' '}
            <Link href="/treks/location/chakrata/budher-caves-trek" style={{ color: 'var(--color-primary)' }}>
              Budher Caves Trek
            </Link>{' '}
            is another beginner option in Chakrata — 10 km through oak forest to ancient
            limestone caves. Moderate difficulty, best in spring and autumn. It combines
            forest trekking with underground exploration — a distinctive experience that no
            other beginner trail in Uttarakhand offers.
          </p>
        </section>

        {/* ── IDEAL DURATION ───────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Ideal Duration for First-Time Trekkers
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>2 days.</strong> The minimum format. Friday departure, Saturday trekking,
            Sunday return. Works for Chakrata trails — Tiger Fall, Budher Caves, or the
            Weekend Trek. This is enough to experience forest trails, ridge views, and
            campfire evenings. It answers the question: do I want more? For weekend options
            within driving distance, see our{' '}
            <Link href="/treks/trek-near-delhi" style={{ color: 'var(--color-primary)' }}>
              weekend treks near Delhi
            </Link>{' '}
            guide.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>3 days.</strong> The comfort format. An additional day allows a slower
            pace, longer nature stops, and a more complete mountain experience. Three-day
            itineraries in Chakrata include guided forest walks, waterfall visits, and ridge
            camping with unhurried mornings.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>4 days.</strong> The summit format. Kedarkantha is a four-day trek that
            builds progressively — forest walk, alpine meadow, high camp, summit day. Each
            day is harder than the last, and the summit reward justifies the effort. For a
            first-timer who wants the full Himalayan trekking experience — including standing
            on a peak at 3,800 metres — four days is the recommended duration.
          </p>
        </section>

        {/* ── BEST TIME ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Time for Beginner Treks in Uttarakhand
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>October to November</strong> is the strongest window for most beginner
            treks. Post-monsoon air is clear, temperatures are comfortable, trails are dry,
            and Himalayan visibility is at its peak. This is the universal recommendation
            for first-time trekkers who want the best conditions.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>February to April</strong> brings spring — wildflowers, warming
            temperatures, and birdsong through the forest canopy. Trails are well-defined
            and the mountains are emerging from winter. An excellent shoulder season for
            all beginner trails except Kedarkantha (which is a winter trek).
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>December to March</strong> is specifically the Kedarkantha window. The
            trail is snow-covered, the summit offers the most dramatic panorama of the year,
            and the experience of trekking through snow-laden forest is unlike any other
            season. Winter gear is essential but provided by guided operators.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>May to June</strong> works for Chakrata — cool forest trails while
            plains temperatures soar. Sankri is accessible and green. Monsoon (July to
            September) is specialist territory — Tiger Fall is at its best but trails are
            slippery and leeches are active. Not recommended for first-time trekkers unless
            guided.
          </p>
        </section>

        {/* ── WHO SHOULD CHOOSE ────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Should Choose a Beginner Trek
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Students and young professionals.</strong> Your first Himalayan trek
              costs a fraction of an international trip and delivers an experience no beach
              holiday can match. Kedarkantha in a guided group is the standard starting point
              — affordable, social, and genuinely challenging without being dangerous.
            </li>
            <li>
              <strong>Corporate groups.</strong> A guided beginner trek is the most effective
              team-building format available. Shared physical challenge, trail meals, campfire
              conversations, and a collective summit create bonds that conference rooms and
              escape rooms never will. Chakrata is the practical choice for corporate groups
              — close to Delhi, low difficulty, and professionally managed.
            </li>
            <li>
              <strong>Couples.</strong> A two-to-four-day trek together — carrying packs,
              cooking over fire, sleeping under stars, watching sunrise from a ridge — is a
              shared experience of a different order. No screens, no schedules, no service
              staff. Just two people and the mountain.
            </li>
            <li>
              <strong>Solo first-timers.</strong> Joining a guided group is the safest and
              most social way to start. You trek with a small group, share meals and camps,
              and have expert support for navigation, safety, and pace management. Many
              lifelong friendships — and trekking partnerships — begin on a first guided trek.
            </li>
          </ul>
        </section>

        {/* ── COMMERCIAL NAVIGATION ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: '#fafafa' }}>
          <p style={{ lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
            Exploring all difficulty levels and locations? See the full{' '}
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
