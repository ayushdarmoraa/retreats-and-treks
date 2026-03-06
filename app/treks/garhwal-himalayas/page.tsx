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

const PATH = '/treks/garhwal-himalayas';

export function generateMetadata(): Metadata {
  return {
    title: '4 Best Treks in Garhwal Himalayas (3,850m–4,800m) — 2026 Guide | Retreats And Treks',
    description:
      'The 4 best Garhwal Himalaya treks ranked by difficulty: Brahmatal (3,850m), Kuari Pass (3,876m), Roopkund (4,800m) & Pangarchulla (4,590m). Season, route & comparison guide from Lohajung and Joshimath.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: '4 Best Treks in Garhwal Himalayas — Routes from 3,850m to 4,800m',
      description:
        'Compare 4 high-altitude Garhwal treks by difficulty, season & views. Brahmatal, Kuari Pass, Roopkund, Pangarchulla — the complete planning guide.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What are the best treks in the Garhwal Himalayas?',
    answer:
      'The four premier treks in the Garhwal Himalaya are Brahmatal (frozen lake trek from Lohajung, moderate difficulty), Roopkund (the mystery lake trek at 4,800 metres, challenging), Kuari Pass (Lord Curzon Trail from Joshimath, moderate with panoramic Nanda Devi views), and Pangarchulla (a true summit climb to 4,590 metres, challenging). Each offers a different character — from winter snow treks to high-altitude summit pushes.',
  },
  {
    question: 'How do I reach Garhwal trekking bases?',
    answer:
      'The two main trek bases in Garhwal are Lohajung and Joshimath. Lohajung is reached via a 10-hour drive from Rishikesh through Karnaprayag and Dewal. Joshimath is approximately 270 km from Rishikesh (9–10 hours) via Rudraprayag and Chamoli. Both have regular bus services and shared taxis from Rishikesh and Haridwar. The nearest rail head is Haridwar; the nearest airport is Jolly Grant in Dehradun.',
  },
  {
    question: 'What is the best season for Garhwal Himalaya treks?',
    answer:
      'It depends on the trek. Brahmatal is a winter trek best done December to March. Roopkund has two windows: pre-monsoon (May–June) and post-monsoon (September–October). Kuari Pass is excellent in spring (March–May) and autumn (October–November). Pangarchulla is best in March to May when consolidated snow allows the summit push. Monsoon (July–August) should be avoided across all Garhwal routes due to heavy rainfall and trail instability.',
  },
  {
    question: 'Are Garhwal treks suitable for beginners?',
    answer:
      'Brahmatal and Kuari Pass are moderate-difficulty treks accessible to first-time Himalayan trekkers with reasonable fitness. Both keep below 4,000 metres and have no technical sections. Roopkund and Pangarchulla are challenging routes recommended for experienced trekkers with prior high-altitude exposure above 4,000 metres. If you are new to Himalayan trekking, start with Brahmatal or Kuari Pass before attempting the higher routes.',
  },
  {
    question: 'How does Garhwal compare to other trekking regions in Uttarakhand?',
    answer:
      'Garhwal offers higher altitude and more dramatic Himalayan scenery than the mid-altitude trails around Chakrata (2,000–2,400 metres). Compared to the Sankri-based treks in western Garhwal (Kedarkantha, Har Ki Dun), the Lohajung and Joshimath routes access the Nanda Devi Sanctuary zone — among the most spectacular mountain landscapes in India. Garhwal treks generally require more days (5–7) and greater fitness than weekend trails near Dehradun.',
  },
  {
    question: 'Is Brahmatal safe for beginners with no trekking experience?',
    answer:
      'Yes. Brahmatal is one of the safest introductory Himalayan treks. It stays below 4,000 metres (AMS risk is minimal at 3,850 m), has no technical sections like rock scrambles or fixed ropes, and follows a well-established trail from Lohajung with reliable guide support. The moderate 4-day duration keeps fatigue manageable. Beginners should maintain 3–4 weeks of regular cardio (jogging, cycling) beforehand and carry proper cold-weather gear for winter conditions. The trail is graded moderate, not easy — but with basic fitness preparation, it is well within reach of a first-time trekker.',
  },
  {
    question: 'Which is harder — Kuari Pass or Kedarkantha?',
    answer:
      'They are close in difficulty — both are moderate treks reaching similar altitudes (Kuari Pass at 3,876 m, Kedarkantha at 3,800 m). The key difference is structure: Kedarkantha has a steep summit-day push (1,500 ft in a few hours) while Kuari Pass spreads elevation gain more evenly across 5 days of ridge walking. Kedarkantha involves winter snow conditions (December–March) with potential whiteout risk near the summit, whereas Kuari Pass in spring or autumn has milder weather. For pure physical demand, the Kedarkantha summit day is harder; for sustained multi-day effort, Kuari Pass is slightly more taxing. Neither requires technical skills.',
  },
];

export default function GarhwalHimalayasTreksPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Garhwal Himalayas', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  // CollectionPage + ItemList structured data
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best Treks in Garhwal Himalayas',
    description:
      'A curated guide to the best high-altitude treks in the Garhwal Himalaya region, including routes from Lohajung and Joshimath.',
    url: canonicalUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Brahmatal Trek',
          url: buildCanonicalUrl('/treks/location/lohajung/brahmatal-trek'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Roopkund Trek',
          url: buildCanonicalUrl('/treks/location/lohajung/roopkund-trek'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Kuari Pass Trek',
          url: buildCanonicalUrl('/treks/location/joshimath/kuari-pass-trek'),
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Pangarchulla Peak Trek',
          url: buildCanonicalUrl('/treks/location/joshimath/pangarchulla-trek'),
        },
      ],
    },
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
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
          { name: 'Garhwal Himalayas' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Best Treks in the Garhwal Himalayas
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            The Garhwal Himalaya stretches across the northern arc of Uttarakhand — from the Nanda Devi
            Sanctuary in the east to the Gangotri massif in the west. This is where India&apos;s highest
            peaks live: Nanda Devi at 7,816 metres, Kamet, Chaukhamba, Dronagiri, and dozens of
            6,000-metre summits that form the spine of the Greater Himalaya. For trekkers, Garhwal
            offers some of the most scenic and accessible high-altitude routes in the entire range —
            frozen lake traverses, historic ridge walks, and summit climbs that place you face-to-face
            with the highest mountains in India.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Unlike the heavily trafficked circuits of Nepal or the permit-restricted zones of Ladakh,
            the Garhwal trekking routes retain a sense of wildness and solitude. Two base towns —{' '}
            <Link href="/treks/location/lohajung" style={{ color: 'var(--color-primary)' }}>Lohajung</Link>{' '}
            and{' '}
            <Link href="/treks/location/joshimath" style={{ color: 'var(--color-primary)' }}>Joshimath</Link>{' '}
            — serve as launchpads for four distinct routes that together cover the full spectrum of
            Himalayan trekking: from moderate ridge walks with continuous panoramas to challenging
            summit pushes above 4,500 metres.
          </p>
        </header>

        <PrimaryCTA
          label="Plan My Garhwal Trek"
          subtext="Tell us your dates and experience level. We will match you to the right Garhwal route."
          vertical="trek"
          category="region"
          sourcePath="/treks/garhwal-himalayas"
        />

        {/* ── GEOGRAPHY ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Garhwal Geography: Understanding the Terrain
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The Garhwal division of Uttarakhand encompasses the districts of Chamoli, Rudraprayag,
            Uttarkashi, Tehri, Pauri, Dehradun, and Haridwar. The trekking terrain lies primarily in
            Chamoli district — the administrative heart of the Nanda Devi Biosphere Reserve and home
            to some of the most protected alpine ecosystems in Asia.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The geological character of Garhwal is defined by the Main Central Thrust — the tectonic
            boundary where the Indian plate dives beneath the Eurasian plate. This has produced a
            landscape of extraordinary vertical relief: valleys at 1,500 metres sit within direct
            sight of peaks above 7,000 metres. For trekkers, this means views that are disproportionately
            dramatic relative to the altitude you reach. A moderate trek to 3,800 metres in Garhwal
            delivers panoramas that would require 5,000+ metres in other Himalayan regions.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Nanda Devi Sanctuary zone.</strong> The{' '}
              <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>Roopkund</Link>{' '}
              and{' '}
              <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>Pangarchulla</Link>{' '}
              routes approach the outer rim of the Nanda Devi Sanctuary, offering views into the inner
              sanctuary that are otherwise inaccessible. The sanctuary has been closed to trekkers since
              1983, making these peripheral routes the closest you can get to India&apos;s second-highest peak.
            </li>
            <li>
              <strong>Lake and glacier systems.</strong> Garhwal&apos;s trekking routes pass through a
              landscape shaped by Pleistocene glaciation — cirque lakes like{' '}
              <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal</Link>{' '}
              and Roopkund sit in glacial hollows carved during the last ice age. In winter, these lakes
              freeze solid, creating the signature visual of Garhwal winter trekking.
            </li>
            <li>
              <strong>Ridge and valley structure.</strong> The{' '}
              <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>Kuari Pass</Link>{' '}
              route follows a high ridge that runs parallel to the main Himalayan chain — this is why
              the views are continuous rather than episodic. You walk along the crest with the peaks
              arrayed before you for kilometres at a stretch.
            </li>
          </ul>
        </section>

        {/* ── TREK BASES ───────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Garhwal Trek Bases: Lohajung &amp; Joshimath
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            All four Garhwal treks launch from one of two base towns, each with a distinct character
            and access profile.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/treks/location/lohajung" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
              Lohajung — Gateway to Brahmatal &amp; Roopkund
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Lohajung is a small roadhead village at 2,350 metres in the Chamoli district, perched on
            a ridge overlooking the Wan valley. It serves as the common base camp for both the{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal Trek</Link>{' '}
            and the{' '}
            <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>Roopkund Trek</Link>.
            Reached by a 10-hour drive from Rishikesh via Karnaprayag and Dewal, Lohajung is as far
            from a tourist town as you can get — basic guesthouses, a handful of dhabas, and the
            quiet intensity of a working mountain village. This remoteness is precisely what makes
            the treks from here feel genuinely wild.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/treks/location/joshimath" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
              Joshimath — Gateway to Kuari Pass &amp; Pangarchulla
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Joshimath sits at 1,875 metres on the pilgrim road to Badrinath — a historic mountain
            town with deep religious significance (it houses one of the four cardinal matts established
            by Adi Shankaracharya). For trekkers, Joshimath is the launch point for the{' '}
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>Kuari Pass Trek</Link>{' '}
            and the{' '}
            <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>Pangarchulla Peak Trek</Link>.
            Better connected than Lohajung — with regular bus services from Rishikesh (9–10 hours)
            and more accommodation options — Joshimath also serves as a gateway to Auli, the Valley
            of Flowers, and Hemkund Sahib.
          </p>
        </section>

        <PrimaryCTA
          label="Plan My Garhwal Trek"
          subtext="Not sure which route? We can help you choose based on your fitness, dates, and experience."
          vertical="trek"
          category="region"
          sourcePath="/treks/garhwal-himalayas"
        />

        {/* ── THE FOUR TREKS ───────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            The Four Great Garhwal Treks
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Each trek occupies a distinct niche — different difficulty, different season, different
            mountain character. Together they cover the full Garhwal trekking spectrum.
          </p>

          {/* Brahmatal */}
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Brahmatal Trek — The Frozen Lake Winter Classic
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>Difficulty:</strong> Moderate &nbsp;|&nbsp; <strong>Altitude:</strong> 3,850 m &nbsp;|&nbsp;
            <strong>Duration:</strong> 4 days &nbsp;|&nbsp; <strong>Season:</strong> December–March
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>
              Brahmatal Trek
            </Link>{' '}
            is Garhwal&apos;s premier winter trek — a 22 km route from Lohajung to the frozen Brahmatal lake
            at 3,850 metres. The trail passes through dense oak and rhododendron forest before emerging
            onto snow-covered ridges with views of Trishul and Nanda Ghunti. At moderate difficulty with
            no technical sections, Brahmatal is the ideal entry point to{' '}
            <Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              winter trekking in Uttarakhand
            </Link>{' '}
            for those ready to go beyond the more crowded Kedarkantha circuit.
          </p>

          {/* Roopkund */}
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Roopkund Trek — The Mystery Lake Expedition
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>Difficulty:</strong> Challenging &nbsp;|&nbsp; <strong>Altitude:</strong> 4,800 m &nbsp;|&nbsp;
            <strong>Duration:</strong> 7 days &nbsp;|&nbsp; <strong>Season:</strong> May–June, September–October
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>
              Roopkund Trek
            </Link>{' '}
            is one of the most iconic routes in the Indian Himalayas — a 53 km expedition from Lohajung
            to the glacial Roopkund Lake at 4,800 metres, famous for the ancient human skeletal remains
            discovered at its shores. The route crosses the vast Bedni Bugyal alpine meadow, navigates
            exposed high-altitude terrain above 4,000 metres, and demands genuine fitness and altitude
            tolerance. This is the trek for experienced Himalayan trekkers seeking a multi-day expedition
            in Garhwal&apos;s most dramatic landscape.
          </p>

          {/* Kuari Pass */}
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Kuari Pass Trek — The Panoramic Ridge Walk
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>Difficulty:</strong> Moderate &nbsp;|&nbsp; <strong>Altitude:</strong> 3,876 m &nbsp;|&nbsp;
            <strong>Duration:</strong> 5 days &nbsp;|&nbsp; <strong>Season:</strong> March–May, October–November
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>
              Kuari Pass Trek
            </Link>{' '}
            follows the historic Lord Curzon Trail along a high ridge offering near-continuous views of
            the Nanda Devi Sanctuary, Dronagiri, Chaukhamba, and Kamet. At moderate difficulty with no
            technical challenges, this is widely considered the finest view-to-effort ratio of any trek
            in Uttarakhand. Spring brings rhododendron blooms; autumn delivers the sharpest visibility
            and golden forest colours. An excellent{' '}
            <Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              summer trek
            </Link>{' '}
            option for those who prefer moderate altitude without sacrificing Himalayan grandeur.
          </p>

          {/* Pangarchulla */}
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Pangarchulla Peak Trek — The Summit Challenge
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>Difficulty:</strong> Challenging &nbsp;|&nbsp; <strong>Altitude:</strong> 4,590 m &nbsp;|&nbsp;
            <strong>Duration:</strong> 6 days &nbsp;|&nbsp; <strong>Season:</strong> March–May
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>
              Pangarchulla Peak Trek
            </Link>{' '}
            combines the Kuari Pass approach with a true summit push to 4,590 metres — one of the few
            accessible summit experiences in Garhwal. The final day involves a steep snow-and-scree
            ascent with an alpine start, rewarded by a 360° panorama that includes Nanda Devi, Nanda
            Ghunti, Dronagiri, and the entire Nanda Devi Sanctuary. Recommended for experienced
            trekkers with prior high-altitude exposure who want the satisfaction of standing on a peak
            rather than a pass.
          </p>
        </section>

        {/* ── SEASONAL GUIDE ───────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            When to Trek in Garhwal: Seasonal Guide
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Garhwal trekking is not a single-season activity — different routes open in different
            months, and the landscape transforms dramatically with the seasons.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Winter (December–March):</strong>{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal, a moderate snow trek from Lohajung,</Link>{' '}
            is the standout winter route — frozen lakes, snow-covered ridges, and clear mountain visibility.
            Kuari Pass is also feasible in early spring (March) with lingering snow adding alpine character.
            Roopkund and Pangarchulla are inaccessible in deep winter. For more{' '}
            <Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              winter trek options across Uttarakhand
            </Link>, see our seasonal guide.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Spring (March–May):</strong> The widest trekking window. Both Kuari Pass and
            Pangarchulla are in prime condition. Brahmatal transitions from snow to green in late March.
            Roopkund opens in late May. Rhododendron blooms colour the forests below 3,500 metres.
            This is the peak season for the{' '}
            <Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              best summer treks in Uttarakhand
            </Link>.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Pre-monsoon (May–June):</strong> Roopkund&apos;s primary window. Snow line retreats
            above 4,000 metres, making the higher routes passable. Temperatures are warm at lower
            elevations. Afternoon cloud build-up is common but mornings are typically clear.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Monsoon (July–August):</strong> Not recommended for any Garhwal trek. Heavy rainfall,
            trail erosion, landslide risk, and zero visibility above the treeline. All guided operations
            suspend during this period.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Post-monsoon / Autumn (September–November):</strong> Roopkund&apos;s secondary window.
            Kuari Pass is outstanding in October–November with the sharpest mountain visibility of the
            year. Temperatures drop quickly after October — winter conditions return to higher elevations
            by late November.
          </p>
        </section>

        {/* ── DIFFICULTY COMPARISON ────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Difficulty &amp; Altitude Comparison
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Choosing the right Garhwal trek depends on your experience level and the kind of challenge
            you want. Here is how the four routes compare:
          </p>
          <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', lineHeight: 1.7 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Trek</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Difficulty</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Max Altitude</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Duration</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem' }}>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>Brahmatal</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,850 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4 days</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Winter snow trek, first Garhwal experience</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>Kuari Pass</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Moderate</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>3,876 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>5 days</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Panoramic views, spring / autumn trek</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>Pangarchulla</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Challenging</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4,590 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>6 days</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Summit experience, experienced trekkers</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem 0.75rem' }}><Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>Roopkund</Link></td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Challenging</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>4,800 m</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>7 days</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>Expedition-style, iconic destination</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>For beginners:</strong> Start with{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>the Brahmatal winter trek</Link>{' '}
            or{' '}
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>the Kuari Pass ridge walk</Link>.
            Both stay below 4,000 metres, have no technical sections, and are well-supported by guided
            operations. If you are entirely new to Himalayan trekking, our{' '}
            <Link href="/treks/beginner-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              beginner treks guide
            </Link>{' '}
            can help you decide whether to start in Garhwal or closer to Dehradun.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>For experienced trekkers:</strong>{' '}
            <Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: 'var(--color-primary)' }}>the Pangarchulla summit climb</Link>{' '}
            and{' '}
            <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>the Roopkund expedition</Link>{' '}
            demand prior high-altitude experience (above 4,000 m), multi-day trekking fitness, and
            comfort with steep, exposed terrain. These are serious mountain routes, not enhanced day
            hikes.
          </p>
        </section>

        {/* ── GARHWAL VS OTHER REGIONS ─────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Garhwal vs Other Uttarakhand Trekking Regions
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Uttarakhand offers trekking across three distinct zones. Each serves a different kind of trekker:
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong><Link href="/treks/location/chakrata" style={{ color: 'var(--color-primary)' }}>Chakrata</Link> (mid-altitude, 2,000–2,400 m):</strong>{' '}
            Weekend-accessible from Dehradun. Forest trails, limestone caves, waterfalls. Easy to moderate
            difficulty. Ideal for first-time trekkers, families, and those combining a trek with a{' '}
            <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)' }}>wellness retreat</Link>.
            No high-altitude exposure.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong><Link href="/treks/location/sankri" style={{ color: 'var(--color-primary)' }}>Sankri</Link> (western Garhwal, 3,500–3,800 m):</strong>{' '}
            Multi-day alpine treks including Kedarkantha (the classic winter snow summit) and Har Ki Dun
            (the contemplative valley trek). Moderate to challenging difficulty. The best winter trekking
            base in Uttarakhand.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Garhwal interior (Lohajung &amp; Joshimath, 3,800–4,800 m):</strong>{' '}
            The highest altitude routes in Uttarakhand trekking. Glacier lakes, summit climbs, Nanda Devi
            panoramas. Multi-day commitments (4–7 days on trail). The choice when you want genuine
            high-Himalayan exposure without crossing into mountaineering territory.
          </p>
        </section>

        {/* ── HOW TO PLAN ──────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            How to Plan a Garhwal Himalaya Trek
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Getting there.</strong> Both Lohajung and Joshimath are reached via Rishikesh,
            which itself connects to Delhi by train (4–5 hours) or road (5–6 hours). From Rishikesh,
            Joshimath is a 9–10 hour drive; Lohajung is approximately 10 hours. Most guided groups
            arrange shared transport from Rishikesh or Haridwar.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Duration.</strong> Plan for the full trek duration plus 2 travel days each way.
            A Brahmatal trek is a 7–8 day commitment door-to-door from Delhi. Roopkund requires 10–11
            days. Build in a buffer day for weather delays — Garhwal roads are mountain roads, and
            flexibility with dates makes the logistics less stressful.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Fitness preparation.</strong> For Brahmatal and Kuari Pass, 3–4 weeks of daily
            cardio (5 km jogs, stair climbing, or cycling) is sufficient. For Roopkund and Pangarchulla,
            6–8 weeks of structured preparation including hill walking with a loaded pack, core strength
            work, and ideally a prior trek above 3,500 metres.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Guided vs independent.</strong> All four Garhwal treks are best done with guided
            operators. The routes are remote, rescue infrastructure is limited, and weather can change
            rapidly above 3,500 metres. Guided treks include permits, camping equipment, meals,
            safety protocols, and local expertise that is difficult to replicate independently.
          </p>
        </section>

        {/* ── CHOOSING YOUR ROUTE ──────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Choosing Your Garhwal Route
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Not sure which route fits your experience? We have built two detailed
            comparison guides that break down the real differences:
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Moderate treks:</strong>{' '}
            <Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: 'var(--color-primary)' }}>
              Brahmatal vs Kuari Pass — which moderate Garhwal trek?
            </Link>{' '}
            covers the frozen lake versus panoramic ridge decision. If this is your first
            trek in the region, start here.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Challenging treks:</strong>{' '}
            <Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)' }}>
              Roopkund vs Pangarchulla — expedition or summit?
            </Link>{' '}
            compares the high-altitude mystery lake expedition with the demanding peak climb.
            For experienced trekkers who have already completed a moderate Garhwal route.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>The progression path:</strong> Most trekkers move through Garhwal in stages —
            a{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: 'var(--color-primary)' }}>
              moderate snow trek from Lohajung
            </Link>{' '}
            or a{' '}
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: 'var(--color-primary)' }}>
              spring ridge walk from Joshimath
            </Link>{' '}
            builds the altitude confidence needed for the{' '}
            <Link href="/treks/location/lohajung/roopkund-trek" style={{ color: 'var(--color-primary)' }}>
              challenging routes above 4,500 metres
            </Link>.
          </p>
        </section>

        <PrimaryCTA
          label="Plan My Garhwal Trek"
          subtext="Share your experience level and preferred dates. We will recommend the right Garhwal route."
          vertical="trek"
          category="region"
          sourcePath="/treks/garhwal-himalayas"
        />

        {/* ── FAQs ─────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </section>

        {/* ── EXPLORE MORE LINKS ───────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-md)', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
            Explore More Treks
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2 }}>
            <li><Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Brahmatal vs Kuari Pass — Moderate Trek Comparison →</Link></li>
            <li><Link href="/treks/roopkund-vs-pangarchulla" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Roopkund vs Pangarchulla — Challenging Trek Comparison →</Link></li>
            <li><Link href="/treks/location/lohajung" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Treks from Lohajung →</Link></li>
            <li><Link href="/treks/location/joshimath" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Treks from Joshimath →</Link></li>
            <li><Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Winter Treks in Uttarakhand →</Link></li>
            <li><Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Summer Treks in Uttarakhand →</Link></li>
            <li><Link href="/treks/beginner-treks-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Beginner Treks in Uttarakhand →</Link></li>
            <li><Link href="/treks/location/chakrata" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Weekend Treks from Chakrata →</Link></li>
            <li><Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Best Treks in Uttarakhand — Master Guide →</Link></li>
            <li><Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>8-Week Fitness Guide for Garhwal Treks →</Link></li>
            <li><Link href="/treks/garhwal-himalayas/packing-checklist" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>Packing Checklist — Print-Ready Gear List →</Link></li>
          </ul>
        </section>

      </article>
    </TrackedPage>
  );
}
