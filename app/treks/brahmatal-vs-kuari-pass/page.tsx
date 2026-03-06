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

const PATH = '/treks/brahmatal-vs-kuari-pass';

export function generateMetadata(): Metadata {
  return {
    title: 'Brahmatal vs Kuari Pass (3,850m vs 3,876m) — Which Moderate Garhwal Trek? | Retreats And Treks',
    description:
      'Brahmatal (3,850m, 4 days, winter) vs Kuari Pass (3,876m, 5 days, spring). Side-by-side comparison of altitude, difficulty, views, season & cost for these two moderate Garhwal Himalaya treks.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Brahmatal vs Kuari Pass — Moderate Garhwal Trek Comparison',
      description:
        'Frozen lake vs panoramic ridge. Compare altitude, season, difficulty & views for the two best moderate treks in the Garhwal Himalayas.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is easier — Brahmatal or Kuari Pass?',
    answer:
      'Both are rated moderate difficulty. Brahmatal reaches 3,850 m over 4 days (22 km), while Kuari Pass reaches 3,876 m over 5 days (30 km). The altitude and difficulty are nearly identical. The main difference is duration — Kuari Pass covers more ground over an extra day, spreading the effort more evenly. Neither requires technical skills.',
  },
  {
    question: 'Can I do Brahmatal and Kuari Pass in one trip?',
    answer:
      'Not easily. Brahmatal is a winter trek (December–March) from Lohajung, while Kuari Pass is best in spring (March–May) or autumn (October–November) from Joshimath. The only overlap is March, when both are theoretically possible but the logistics (different base towns, 6+ hours apart by road) make back-to-back trips impractical. Most trekkers do them in separate trips.',
  },
  {
    question: 'Which trek has better views?',
    answer:
      'Kuari Pass is widely considered the better panoramic trek — the ridge walk offers near-continuous views of Nanda Devi, Dronagiri, Chaukhamba, and Kamet across multiple days. Brahmatal&apos;s views are concentrated around the summit ridge and lake campsite, with Trishul and Nanda Ghunti as the signature peaks. Kuari Pass wins on breadth of views; Brahmatal wins on the unique frozen lake experience.',
  },
  {
    question: 'Which is better for a first Garhwal trek?',
    answer:
      'Either works well as a first Garhwal experience. If you want a winter snow trek and enjoy camping by a frozen lake, choose Brahmatal. If you want the widest possible Himalayan panorama in comfortable spring or autumn weather, choose Kuari Pass. Both are well-supported by guided operators and suitable for first-time high-altitude trekkers with basic fitness.',
  },
  {
    question: 'How do I reach the starting points?',
    answer:
      'Brahmatal starts from Lohajung (10 hours from Rishikesh via Karnaprayag). Kuari Pass starts from Joshimath (9–10 hours from Rishikesh via Rudraprayag). Both are accessed by road from Rishikesh or Haridwar. Joshimath has better road infrastructure and more frequent bus services due to its position on the Badrinath pilgrim route.',
  },
];

export default function BrahmatalVsKuariPassPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Garhwal Himalayas', url: buildCanonicalUrl('/treks/garhwal-himalayas') },
    { name: 'Brahmatal vs Kuari Pass', url: canonicalUrl },
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
          { name: 'Garhwal Himalayas', href: '/treks/garhwal-himalayas' },
          { name: 'Brahmatal vs Kuari Pass' },
        ]}
      />

      {/* INTENT TRAIL — discovery cluster reinforcement */}
      <nav aria-label="Discovery trail" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
        <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
          Best Treks in Uttarakhand
        </Link>
        {' → '}
        <Link href="/treks/best-treks-in-uttarakhand/beginner" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
          Beginner Treks
        </Link>
        {' → '}
        <span>Brahmatal vs Kuari Pass</span>
      </nav>

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Brahmatal vs Kuari Pass: Which Garhwal Trek Should You Choose?
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>
              Brahmatal Trek
            </Link>{' '}
            and the{' '}
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>
              Kuari Pass Trek
            </Link>{' '}
            are the two premier moderate-difficulty treks in the{' '}
            <Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)' }}>
              Garhwal Himalaya region
            </Link>. Both stay below 4,000 metres, both are accessible to first-time high-altitude
            trekkers, and both deliver exceptional Himalayan scenery. Yet they are fundamentally different
            experiences — different seasons, different base towns, different signature landscapes.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            This comparison breaks down the real differences to help you choose the right Garhwal trek
            for your experience level, preferred season, and the kind of mountain encounter you are
            looking for. Both routes feature in our{' '}
            <Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              best treks in Uttarakhand
            </Link>{' '}
            guide as top beginner-friendly options across the state.
          </p>
        </header>

        {/* ── AT A GLANCE TABLE ────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            At a Glance
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', lineHeight: 1.7 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem', width: '25%' }}></th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Brahmatal</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Kuari Pass</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Base Town</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/lohajung" style={{ color: 'var(--color-primary)' }}>Lohajung</Link> (2,350 m)</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/joshimath" style={{ color: 'var(--color-primary)' }}>Joshimath</Link> (1,875 m)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Max Altitude</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,850 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,876 m</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Distance</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>22 km</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>30 km</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Duration</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4 days</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>5 days</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Difficulty</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Best Season</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Dec–Mar (winter)</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Mar–May, Oct–Nov</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Signature</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Frozen alpine lake</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Continuous ridge panorama</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>Key Peaks</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Trishul, Nanda Ghunti</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Nanda Devi, Dronagiri, Chaukhamba</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <PrimaryCTA
          label="Help Me Choose"
          subtext="Not sure which trek fits you? Share your dates and experience — we will recommend the right route."
          vertical="trek"
          category="comparison"
          sourcePath="/treks/brahmatal-vs-kuari-pass"
        />

        {/* ── TERRAIN & EXPERIENCE ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            The Experience: What Each Trek Feels Like
          </h2>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Brahmatal — The Frozen Lake Winter Trek
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Brahmatal is a winter trek. That single fact shapes everything about the experience. You walk
            through snow-laden oak and rhododendron forest, camp on snow-covered clearings, and reach a
            frozen alpine lake at 3,850 metres. The landscape is white, silent, and dramatic. The cold
            is genuine — night temperatures drop to −10°C at camp. The trail above 3,000 metres is
            consistently snow-covered from December through March.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The signature moment is arriving at Brahmatal Lake — a frozen sheet of ice surrounded by
            snow ridges with the Trishul massif rising behind. It is a visual that exists only in winter
            and cannot be replicated in any other season, on any other route. For many trekkers, this
            single image is the reason they choose Brahmatal.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Kuari Pass — The Panoramic Ridge Walk
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Kuari Pass is a ridge trek. Instead of walking toward a single destination (a lake, a summit),
            you walk along a high ridge with the Himalayan range arrayed before you for days at a stretch.
            The views are not a reward at the end — they are the experience itself, from day two through
            to descent. Nanda Devi (7,816 m), Dronagiri, Chaukhamba, Kamet — the entire Nanda Devi
            Sanctuary unfolds to your north.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The terrain transitions from dense forest through alpine meadows to the exposed pass. In
            spring, rhododendrons bloom in red and pink below the treeline. In autumn, the forests turn
            gold and the air carries a clarity that makes the peaks appear almost three-dimensional. The
            descent via Auli — by trail or cable car — adds variety that Brahmatal&apos;s out-and-back
            structure does not offer.
          </p>
        </section>

        {/* ── SEASONAL COMPARISON ──────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            When to Go: The Season Question
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            This is the most important differentiator. The two treks occupy almost entirely different
            seasonal windows:
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Brahmatal:</strong> December through March. This is exclusively a{' '}
            <Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              winter trek
            </Link>. The frozen lake and snow ridges that define the experience only exist in winter.
            Doing Brahmatal in summer misses the point entirely — the lake is just water, the ridges
            are just grass.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Kuari Pass:</strong> March to May (spring) and October to November (autumn). These are
            the prime windows. Kuari Pass can be done in winter with snow gear, but the ridge becomes
            more challenging and exposed. It is fundamentally a{' '}
            <Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              spring/summer and autumn trek
            </Link>.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>The overlap:</strong> March is the only month where both treks are theoretically
            viable. But even in March, the character is different — Brahmatal has lingering snow while
            Kuari Pass is transitioning to spring conditions.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Practical implication:</strong> Your travel dates will often make this decision for
            you. Planning a December–February trip? Brahmatal. Planning an April, May, October, or
            November trip? Kuari Pass. The season picks the trek.
          </p>
        </section>

        {/* ── DIFFICULTY DEEP DIVE ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Difficulty Comparison
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Both treks are rated moderate, and on paper they look almost identical — similar maximum
            altitude, similar daily walking distances. But the effort profile differs:
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Brahmatal</strong> is shorter (4 days, 22 km) but involves walking through snow
            for most of the route. Snow increases energy expenditure by 30–50% compared to dry trail.
            Combined with cold temperatures that drain stamina, Brahmatal feels harder than its distance
            suggests. The cold is a genuine factor — if you are not comfortable in sustained sub-zero
            temperatures, Brahmatal will be more demanding psychologically.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Kuari Pass</strong> is longer (5 days, 30 km) but on mostly dry trail with
            established camping infrastructure. The altitude gain is spread across more days, making
            the daily effort more manageable. The weather is warmer (spring/autumn), reducing cold
            stress. The ridge walk is exposed to wind but not to the sustained sub-zero conditions
            of a winter trek.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>For first-timers:</strong> Kuari Pass is slightly more accessible due to the
            extra day of acclimatisation and warmer conditions. Brahmatal demands comfort with cold
            weather camping. If you have never slept in a tent at −8°C, Kuari Pass in spring is the
            gentler introduction.
          </p>
        </section>

        <PrimaryCTA
          label="Plan My Garhwal Trek"
          subtext="Tell us your preferred month and fitness level. We will recommend the right route."
          vertical="trek"
          category="comparison"
          sourcePath="/treks/brahmatal-vs-kuari-pass"
        />

        {/* ── VIEWS COMPARISON ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Views &amp; Scenery
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Brahmatal</strong> delivers its visual payoff as concentrated moments — the frozen
            lake, the summit ridge, and the campsite panorama. The views of Trishul (7,120 m) and
            Nanda Ghunti (6,309 m) are striking, especially against winter&apos;s white foreground. But
            much of the trail is in forest — you don&apos;t see mountains for extended stretches until
            you clear the treeline.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Kuari Pass</strong> delivers views as a sustained experience. The ridge walk
            places you above the treeline for long sections, with the Nanda Devi range visible to
            your north almost continuously from day two onward. The scale of the panorama is larger:
            Nanda Devi (7,816 m), Dronagiri (7,066 m), Chaukhamba (7,138 m), Kamet (7,756 m). In
            autumn, the visibility can extend beyond 200 km.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Verdict:</strong> Kuari Pass for breadth and duration of mountain views. Brahmatal
            for the unique frozen lake visual and the drama of a snow-covered Himalayan landscape.
          </p>
        </section>

        {/* ── LOGISTICS ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Getting There &amp; Logistics
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Brahmatal from{' '}
            <Link href="/treks/location/lohajung" style={{ color: 'var(--color-primary)' }}>Lohajung</Link>:</strong>{' '}
            10 hours from Rishikesh by road via Karnaprayag and Dewal. Lohajung is a small village with
            basic guesthouses and no ATMs. The road quality is acceptable but narrow in the final
            stretch. Less frequent bus services — most trekkers use guided transport.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Kuari Pass from{' '}
            <Link href="/treks/location/joshimath" style={{ color: 'var(--color-primary)' }}>Joshimath</Link>:</strong>{' '}
            9–10 hours from Rishikesh via the Badrinath highway. Joshimath is a proper town with
            hotels, restaurants, ATMs, and shops. Better road infrastructure, more frequent buses,
            and more accommodation options. Logistically, Joshimath is the easier staging point.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Total trip commitment:</strong> Brahmatal is a 7–8 day trip from Delhi (2 travel
            days each way + 4 trek days). Kuari Pass is an 8–9 day trip (2 travel days each way +
            5 trek days). The extra day on Kuari Pass is offset by the easier travel to Joshimath.
          </p>
        </section>

        {/* ── WHO SHOULD CHOOSE WHICH ──────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Should Choose Which
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Choose Brahmatal if:</strong>
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>You want a winter snow trek (December–March)</li>
            <li>You are drawn to the frozen lake experience</li>
            <li>You are comfortable with cold-weather camping (−8 to −10°C at night)</li>
            <li>You have 4 trek days available</li>
            <li>You want an alternative to the crowded Kedarkantha circuit</li>
          </ul>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Choose Kuari Pass if:</strong>
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>You want the widest possible Himalayan panorama</li>
            <li>You prefer spring or autumn trekking (milder weather)</li>
            <li>This is your first high-altitude Himalayan trek</li>
            <li>You value historic trails (Lord Curzon Trail)</li>
            <li>You want the option to extend to{' '}
              <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>
                Pangarchulla summit
              </Link>
            </li>
          </ul>
        </section>

        {/* ── UPGRADE PATHS ────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Next Steps After Each Trek
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>After Brahmatal:</strong> The natural progression is the{' '}
            <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>
              Roopkund Trek
            </Link>{' '}
            — same base village (Lohajung), significantly higher altitude (4,800 m), and challenging
            difficulty. Brahmatal at 3,850 m gives you the altitude confidence to tackle Roopkund.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>After Kuari Pass:</strong> The natural extension is{' '}
            <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>
              Pangarchulla Peak
            </Link>{' '}
            — the route shares the same approach trail before diverging for a summit push to 4,590 m.
            Some itineraries combine both, crossing Kuari Pass on day 3 and pushing to Pangarchulla
            from Khullara camp.
          </p>
        </section>

        <PrimaryCTA
          label="Plan My Trek"
          subtext="Share your preferred season and experience level — we will match you to the right trek."
          vertical="trek"
          category="comparison"
          sourcePath="/treks/brahmatal-vs-kuari-pass"
        />

        {/* ── FAQs ─────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </section>

        {/* ── EXPLORE MORE ─────────────────────────────────────────── */}
        <section style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
            Explore More
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2 }}>
            <li><Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Best Treks in Uttarakhand — Complete Guide →</Link></li>
            <li><Link href="/treks/best-treks-in-uttarakhand/beginner" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Beginner Treks in Uttarakhand →</Link></li>
            <li><Link href="/treks/garhwal-himalayas" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Garhwal Himalayas Trekking Guide →</Link></li>
            <li><Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>8-Week Fitness Preparation Plan →</Link></li>
            <li><Link href="/treks/garhwal-himalayas/packing-checklist" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Packing Checklist — Print-Ready Gear List →</Link></li>
            <li><Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Challenging Garhwal Treks: Roopkund vs Pangarchulla →</Link></li>
            <li><Link href="/treks/location/lohajung" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>All treks from Lohajung →</Link></li>
            <li><Link href="/treks/location/joshimath" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>All treks from Joshimath →</Link></li>
            <li><Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Winter Treks in Uttarakhand →</Link></li>
            <li><Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Summer Treks in Uttarakhand →</Link></li>
            <li><Link href="/treks/beginner-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Beginner Treks in Uttarakhand →</Link></li>
          </ul>
        </section>

      </article>
    </TrackedPage>
  );
}
