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

const PATH = '/retreats/uttarakhand-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Uttarakhand Retreats in the Himalayas — Mountain Wellness Stays | Retreats And Treks',
    description:
      'Explore retreats in Uttarakhand across Munsiyari, Sankri, Chakrata and Rishikesh. Yoga, meditation and mountain wellness programs in India\u2019s Himalayan state.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Uttarakhand Retreats in the Himalayas — Mountain Wellness Stays',
      description:
        'Yoga, meditation and wellness retreats across Uttarakhand. Programs in Munsiyari, Sankri, Chakrata and Rishikesh — from alpine solitude to riverside immersion.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the best location for retreats in Uttarakhand?',
    answer:
      'It depends on what you are seeking. Munsiyari offers the most remote and premium alpine experience with Panchachuli views. Sankri provides deep forest immersion in the upper Tons Valley. Chakrata delivers accessible mountain calm six to seven hours from Delhi. Rishikesh is the established centre for yoga and meditation with the shortest travel time from the capital. Each location serves a different retreat intention — solitude, forest quiet, convenience, or spiritual lineage.',
  },
  {
    question: 'Is Uttarakhand suitable for retreats year-round?',
    answer:
      'Yes, with seasonal variation by location. Rishikesh and Chakrata operate comfortably year-round. Munsiyari and Sankri are best from late March through November — winter snowfall limits road access at higher altitudes. October and November are the most popular months across all locations. May and June draw participants escaping summer heat. December through February is ideal for those seeking winter stillness at accessible elevations like Rishikesh and Chakrata.',
  },
  {
    question: 'Which district is best for a mountain retreat in Uttarakhand?',
    answer:
      'Uttarkashi district (Sankri) and Pithoragarh district (Munsiyari) offer the highest-altitude and most immersive mountain settings. Dehradun district covers both Chakrata and Rishikesh — the two most accessible destinations. Garhwal locations tend toward forest and river environments. Kumaon locations lean toward alpine grandeur and panoramic mountain views. The choice of district is effectively a choice of landscape character.',
  },
  {
    question: 'How far are Uttarakhand retreats from Delhi?',
    answer:
      'Rishikesh is the closest at five to six hours by road. Chakrata takes six to seven hours via Dehradun. Sankri requires eight to nine hours. Munsiyari is the most remote at approximately twelve hours by road or a combination of train to Kathgodam and road transfer. All locations are reachable without flights — road travel from Delhi is the standard approach, with overnight options available for longer journeys.',
  },
  {
    question: 'Are retreats in Uttarakhand beginner-friendly?',
    answer:
      'All retreat programs across Uttarakhand are designed for mixed experience levels. Yoga and meditation sessions are guided with modifications for beginners. No prior practice is required. Facilitators adapt to the group — first-time participants receive individual guidance within group sessions. Weekend formats at Chakrata and Rishikesh are particularly accessible for those new to structured retreat environments.',
  },
  {
    question: 'What types of retreats are available in Uttarakhand?',
    answer:
      'Uttarakhand hosts yoga retreats, meditation and silence retreats, burnout recovery programs, sound healing immersions, creative retreats, and weekend reset formats. Programs range from two nights to seven days. Seasonal formats run in summer and winter with location-specific scheduling. Private and custom retreats are available for couples, small groups, and corporate teams across all four locations.',
  },
];

export default function UttarakhandRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Uttarakhand Retreats', url: canonicalUrl },
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
          { name: 'Retreats', href: '/retreats' },
          { name: 'Uttarakhand Retreats' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Uttarakhand Retreats in the Himalayas
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Uttarakhand is India&apos;s definitive Himalayan retreat state. Stretching across
            the Garhwal and Kumaon divisions, it holds every landscape a retreat participant
            could seek — from the spiritual riverbanks of Rishikesh to the alpine solitude of
            Munsiyari, from dense oak forests in the Tons Valley to quiet cantonment ridges
            above Dehradun. No other Indian state offers this range of altitude, environment,
            and accessibility within a single corridor.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Four distinct retreat destinations operate across Uttarakhand, each serving a
            different intention and traveller profile. Whether the goal is structured yoga
            practice, silent meditation, burnout recovery, or simply a deliberate pause in
            clean mountain air — the geography here supports it. And every location sits within
            a day&apos;s drive of Delhi, making these programs accessible without flights or
            complex logistics.
          </p>
        </header>

        {/* ── WHY UTTARAKHAND ──────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Why Uttarakhand Is Ideal for Himalayan Retreats
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Altitude diversity.</strong> Retreat locations in Uttarakhand span from 350
            metres at Rishikesh to over 2,200 metres at Munsiyari. This range means participants
            can choose between subtropical river valleys, mid-altitude forest ridges, and genuine
            alpine environments — each producing a fundamentally different retreat experience.
            The altitude itself is therapeutic: cooler air, reduced pollution, and the
            physiological shift that comes with elevation change.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Environmental range.</strong> Garhwal offers dense deodar and oak forests,
            river-valley acoustics, and the ashram heritage of Rishikesh. Kumaon delivers
            panoramic Himalayan views, alpine meadows, and the silence that comes from genuine
            remoteness. Between these zones lie cantonment villages, wildlife sanctuaries, and
            glacial valleys — each adding texture to the retreat landscape.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>Accessibility from Delhi.</strong> Every retreat destination in Uttarakhand
            is reachable by road from Delhi within a single day. The closest — Rishikesh — takes
            five hours. The most remote — Munsiyari — takes twelve. This proximity means
            retreat participants do not need to fly, take multiple connections, or burn a full
            travel day in each direction. Friday departures from Delhi are standard practice.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>Spiritual lineage.</strong> Uttarakhand has hosted contemplative practice
            for centuries. Rishikesh is globally recognised as the yoga capital. Valley
            communities across the state maintain meditation traditions, temple cultures, and a
            relationship with the landscape that commercial tourism has not yet displaced. This
            lineage means facilitators here draw on deep-rooted practice, not imported trends.
          </p>
        </section>

        {/* ── RETREAT DESTINATIONS ──────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Retreat Destinations Across Uttarakhand
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Each location occupies a distinct niche — altitude, character, travel time, and
            participant profile differ meaningfully. Choosing the right destination is choosing
            the right retreat experience.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/munsiyari" style={{ color: 'inherit' }}>
              Munsiyari — Kumaon&apos;s Alpine Sanctuary
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Munsiyari sits at 2,200 metres in Pithoragarh district, facing the Panchachuli
            massif — five peaks above 6,000 metres. It is the most remote and visually
            dramatic retreat location in the network. The twelve-hour journey from Delhi
            filters out casual visitors, leaving a quiet environment built for deep work.
            Alpine meadows, glacier-view practice spaces, and extremely low participant density
            define the character here.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Programs in{' '}
            <Link href="/retreats/munsiyari" style={{ color: 'var(--color-primary)' }}>
              Munsiyari
            </Link>{' '}
            suit experienced retreat participants, international visitors seeking premium
            Himalayan immersion, and anyone who values solitude as the primary retreat
            ingredient. Best from April through November.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/sankri" style={{ color: 'inherit' }}>
              Sankri — Gateway to the High Himalayas
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Sankri occupies the upper Tons Valley in Uttarkashi district, near the Govind
            Wildlife Sanctuary. Pine and oak forests, glacial river sound, and trail access
            into genuine wilderness define the location. Eight to nine hours from Delhi, it
            sits at the intersection of retreat calm and trekking adventure — making it ideal
            for participants who want both stillness and physical engagement with the mountains.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            <Link href="/retreats/sankri" style={{ color: 'var(--color-primary)' }}>
              Sankri retreats
            </Link>{' '}
            suit those drawn to forest immersion, river-valley living, and the meditative
            quality of an environment shaped by wilderness rather than cultivation. Extended
            formats of four to seven days work best here.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/chakrata" style={{ color: 'inherit' }}>
              Chakrata — Quiet Garhwal Hill Retreat
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Chakrata is a cantonment town at 2,200 metres in Dehradun district —
            low-commercial, forest-surrounded, and six to seven hours from Delhi by road.
            Deodar canopy, ridge walks, and Tiger Falls provide the environmental container.
            The military heritage means limited tourist development, which preserves the quiet
            that makes retreat work effective.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)' }}>
              Chakrata
            </Link>{' '}
            is the most practical option for professionals seeking accessible mountain retreat
            without extended travel. Weekend and mid-week formats both work here. Year-round
            accessibility makes it the reliable default for first-time Uttarakhand retreat
            participants.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/rishikesh" style={{ color: 'inherit' }}>
              Rishikesh — Riverside Yoga and Meditation Hub
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Rishikesh needs little introduction. India&apos;s yoga capital sits on the Ganges
            at the foothills, five to six hours from Delhi. The ashram lineage, experienced
            teacher pool, and riverside practice settings are unmatched in India. For
            participants whose primary interest is structured yoga, pranayama, and spiritual
            immersion, Rishikesh remains the natural choice.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            Retreat formats in Rishikesh range from weekend programs to week-long intensives.
            The lower altitude means year-round operation without weather disruption. The trade-off
            is higher visitor density compared to mountain locations — which is why serious
            practitioners sometimes begin in Rishikesh and graduate to Chakrata, Sankri, or
            Munsiyari for deeper immersion.
          </p>
        </section>

        {/* ── TYPES OF RETREATS ────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Types of Retreats Available in Uttarakhand
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Uttarakhand supports every major retreat format. The state&apos;s environmental and
            cultural range means programs are not limited to a single modality.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Yoga retreats</strong> — structured asana, pranayama, and philosophy
              across all four locations, with Rishikesh offering the deepest tradition
            </li>
            <li>
              <strong>Meditation and silence retreats</strong> — guided and self-directed
              formats, particularly suited to the solitude of Munsiyari and Sankri
            </li>
            <li>
              <strong>Burnout recovery</strong> — structured{' '}
              <Link href="/retreats/journeys/burnout-recovery" style={{ color: 'var(--color-primary)' }}>
                burnout recovery retreats
              </Link>{' '}
              combining rest, nature immersion, and facilitated processing
            </li>
            <li>
              <strong>Sound healing</strong> — resonance-based{' '}
              <Link href="/retreats/journeys/sound-healing" style={{ color: 'var(--color-primary)' }}>
                sound healing programs
              </Link>{' '}
              using singing bowls, gongs, and guided frequency work in mountain settings
            </li>
            <li>
              <strong>Seasonal programs</strong> — summer heat-escape formats and winter
              contemplative retreats tailored to each location&apos;s climate window
            </li>
          </ul>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            For a complete overview of every program type, see our{' '}
            <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              Himalayan retreats in India
            </Link>{' '}
            guide covering formats, durations, and locations across the network.
          </p>
        </section>

        {/* ── WHEN TO PLAN ─────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            When to Plan a Retreat in Uttarakhand
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>October–November.</strong> The premium window across all locations. Post-monsoon
            clarity, comfortable temperatures, and the sharpest mountain views of the year.
            Munsiyari&apos;s Panchachuli range is at its most dramatic. Sankri&apos;s forests
            turn gold. Chakrata and Rishikesh enjoy crisp, clear days. This is when booking
            fills fastest — four to six weeks advance is advisable.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>April–June.</strong> The{' '}
            <Link href="/retreats/summer-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              summer Himalayan retreats
            </Link>{' '}
            window draws participants escaping Delhi heat. Temperatures at altitude run fifteen
            to twenty-five degrees cooler than the plains. Munsiyari and Sankri are at their
            most accessible. Long daylight hours support extended outdoor programming.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            <strong>December–February.</strong> The{' '}
            <Link href="/retreats/winter-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              winter Himalayan retreats
            </Link>{' '}
            season suits those drawn to cold-weather contemplation. Rishikesh and Chakrata
            remain fully operational. Sankri receives snow. Munsiyari is largely inaccessible.
            Winter retreats attract smaller groups and offer the deepest quiet of the year.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            <strong>Shoulder months</strong> — February–March and September — provide excellent
            conditions with lower demand. These windows suit participants who prefer smaller
            groups and flexible scheduling without the peak-season booking pressure.
          </p>
        </section>

        {/* ── WHO CHOOSES UTTARAKHAND ──────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Chooses Uttarakhand for Retreats
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Uttarakhand draws retreat participants who want mountain authenticity without
            leaving the country — and increasingly, international visitors arriving in India
            specifically for Himalayan wellness.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Delhi and NCR professionals</strong> — the largest segment, seeking
              accessible mountain reset programs that fit within working schedules and do not
              require flights
            </li>
            <li>
              <strong>International wellness travellers</strong> — visiting India for yoga,
              meditation, or spiritual immersion and choosing Uttarakhand for its combination
              of practice lineage and Himalayan environment
            </li>
            <li>
              <strong>Couples and partners</strong> — seeking shared retreat experience in
              settings that balance privacy with facilitated connection, particularly at
              higher-altitude locations
            </li>
            <li>
              <strong>Small groups and corporate teams</strong> — leadership offsites, friend
              circles, and family groups booking curated programs across any of the four
              locations
            </li>
          </ul>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            Each location serves a different intention. Choosing the right one depends on
            travel time, landscape preference, and whether you prioritise accessibility or
            remoteness. For a ranked overview across every category, see our guide to the{' '}
            <Link href="/retreats/best-retreat-in-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              best retreats in Uttarakhand
            </Link>.
          </p>
        </section>

        {/* ── COMMERCIAL NAVIGATION ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: '#fafafa' }}>
          <p style={{ lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
            Exploring all programs? Our parent guide covers every format, duration, and
            location across the network — from weekend resets to week-long immersions.
          </p>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-lg)' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </section>

        {/* ── NAVIGATION ────────────────────────────────────────────── */}
        <nav style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-lg)', fontSize: '0.95rem' }}>
          <Link href="/retreats" style={{ color: 'var(--color-primary)' }}>
            ← All Retreats
          </Link>
        </nav>

      </article>
    </TrackedPage>
  );
}
