import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/best-himalayan-retreats';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Himalayan Retreats (2026) — Yoga, Meditation, Wellness & Silent Retreat Picks',
    description:
      'The best Himalayan retreats compared by purpose — yoga in Rishikesh, silence in Chakrata, meditation in Zanskar, burnout recovery in Munsiyari. Small-group mountain retreats ranked for 2026.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Best Himalayan Retreats (2026) — Yoga, Meditation, Wellness & Silent Retreat Picks',
      description:
        'The best Himalayan retreats compared by purpose — ranked for depth, environment, group size, and accessibility.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the best Himalayan retreat for first-timers?',
    answer:
      'Chakrata is the best entry point for first-time retreatants. It is accessible from Dehradun (2.5 hours by car), offers natural Himalayan silence at 2,000 metres, and does not require prior yoga or meditation experience. Groups are small (maximum 12), programs are guided, and the forest environment is gentle rather than extreme. For those wanting a structured yoga experience, Rishikesh is also excellent for beginners.',
  },
  {
    question: 'Which Himalayan retreat is most remote?',
    answer:
      'Zanskar in Ladakh is the most remote location — 230 km from Leh through mountain passes, in a high-altitude valley at 3,500 metres. The road is open only from June to November. Phone signal is intermittent. This remoteness is the primary therapeutic intervention — when every familiar cue is stripped away, genuine recalibration begins. Only recommended for those prepared for basic accommodation and physical challenge.',
  },
  {
    question: 'Are Himalayan retreats safe for solo women travellers?',
    answer:
      'Yes. All our retreats operate with experienced guides, small groups (maximum 12), and known accommodation partners. Chakrata and Rishikesh are the most infrastructure-rich locations. For remote locations like Zanskar and Munsiyari, we provide full logistics — transport, accommodation, and guided programs. Solo women travellers make up a significant portion of our retreat participants.',
  },
  {
    question: 'What is the best time of year for a Himalayan retreat?',
    answer:
      'March to June and September to November are the best windows for most locations. Summers (April–June) are ideal for Munsiyari and Sankri where temperatures stay pleasant while the plains are hot. September–October offers the clearest skies across all locations. Winter (November–February) is best for Rishikesh and those seeking snow silence in Chakrata. Zanskar is accessible June–September only (unless you are doing the Chadar winter trek).',
  },
  {
    question: 'How much does a Himalayan retreat cost?',
    answer:
      'Our retreats range from weekend programs (2–3 days) to immersive journeys (7–14 days). Pricing depends on location, duration, and group size. Accessible locations like Chakrata are more affordable. Remote locations like Zanskar involve higher logistics costs. All retreats include accommodation, meals, guided programs, and local transport. Contact us for current pricing based on your preferred dates and format.',
  },
  {
    question: 'Can I combine a retreat with trekking?',
    answer:
      'Yes — and this is one of the most powerful combinations we offer. Sankri, Zanskar, Munsiyari, and Chakrata all support trek-retreat combinations where you walk in the mountains as part of the retreat pattern. Physical movement in nature prepares the body for stillness and creates a deeper overall experience. See our experience pages for meditation, yoga, and burnout recovery retreats that integrate trekking.',
  },
];

export default function BestHimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Best Himalayan Retreats', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Himalayan Retreats by Category',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: 6,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Meditation Retreats', url: buildCanonicalUrl('/meditation-retreats') },
      { '@type': 'ListItem', position: 2, name: 'Silent Retreats', url: buildCanonicalUrl('/silent-retreats') },
      { '@type': 'ListItem', position: 3, name: 'Yoga Retreats', url: buildCanonicalUrl('/yoga-retreats') },
      { '@type': 'ListItem', position: 4, name: 'Burnout Recovery Retreats', url: buildCanonicalUrl('/burnout-recovery-retreats') },
      { '@type': 'ListItem', position: 5, name: 'Spiritual Retreats', url: buildCanonicalUrl('/spiritual-retreats') },
      { '@type': 'ListItem', position: 6, name: 'All Locations', url: buildCanonicalUrl('/locations') },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Best Himalayan Retreats (2026)',
    description:
      'The best Himalayan retreats compared by purpose — yoga, meditation, silence, burnout recovery, and spiritual immersion.',
    url: canonicalUrl,
    isPartOf: { '@type': 'WebSite', name: 'Retreats And Treks' },
    about: { '@type': 'Thing', name: 'Himalayan wellness retreats' },
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, itemListSchema, webPageSchema]) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Best Himalayan Retreats' },
        ]}
      />

      <article>
        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Best Himalayan Retreats: Mountain Wellness Ranked by Purpose, Season &amp; Depth
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            The Himalayas are the original retreat landscape. For thousands of years, people have
            gone to these mountains to meditate, heal, and recalibrate. Not because it was trendy,
            but because altitude, silence, and remoteness do something to the human nervous system
            that no urban wellness centre can replicate.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            This guide compares the best Himalayan retreats by purpose &mdash; not by price or
            luxury, but by what each location and format actually does for the people who go there.
            Whether you are seeking yoga, meditation, silence, burnout recovery, or spiritual
            depth, the right Himalayan retreat is the one where the environment matches your need.
          </p>
        </header>

        <PrimaryCTA
          label="Plan My Himalayan Retreat"
          subtext="Tell us what you're seeking and we'll recommend the right location and format."
          vertical="retreat"
          category="best-himalayan"
          sourcePath={PATH}
        />

        {/* ── COMPARISON TABLE ──────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Quick Comparison &mdash; Best Retreats by Category
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Category</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Top Location</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Why</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Best Season</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cat: 'Meditation', catLink: '/meditation-retreats', loc: 'Zanskar', locLink: '/locations/zanskar', why: 'Monastery silence, 3,500m altitude', season: 'Jun–Sep' },
                  { cat: 'Silent Retreat', catLink: '/silent-retreats', loc: 'Chakrata', locLink: '/locations/chakrata', why: 'Forest acoustic enclosure, accessible', season: 'Year-round' },
                  { cat: 'Yoga', catLink: '/yoga-retreats', loc: 'Rishikesh', locLink: '/locations/rishikesh', why: 'Living tradition, Ganges energy', season: 'Oct–Mar' },
                  { cat: 'Burnout Recovery', catLink: '/burnout-recovery-retreats', loc: 'Chakrata', locLink: '/locations/chakrata', why: 'Gentle altitude, genuine separation', season: 'Sep–Oct' },
                  { cat: 'Spiritual', catLink: '/spiritual-retreats', loc: 'Rishikesh', locLink: '/locations/rishikesh', why: 'Millennia of accumulated practice', season: 'Oct–Mar' },
                  { cat: 'Trek + Retreat', catLink: '/locations/sankri', loc: 'Sankri', locLink: '/locations/sankri', why: 'Mountain movement integration', season: 'Mar–Jun, Sep–Nov' },
                ].map((row) => (
                  <tr key={row.cat} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <Link href={row.catLink} style={{ color: 'var(--color-primary)' }}>{row.cat}</Link>
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <Link href={row.locLink} style={{ color: 'var(--color-primary)' }}>{row.loc}</Link>
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{row.why}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{row.season}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── BY PURPOSE ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Best Himalayan Retreats by Purpose
          </h2>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            Meditation &amp; Silence
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            For pure meditation depth, Zanskar is unmatched &mdash; monastery lineage, extreme
            remoteness, and altitude that naturally quiets the mind. Chakrata offers the most
            accessible silence: dense forest with no tourist noise, 2.5 hours from Dehradun.
            Rishikesh provides meditation within a living spiritual tradition on the Ganges.
          </p>
          <p>
            <Link href="/meditation-retreats" style={{ color: 'var(--color-primary)' }}>Meditation retreats &rarr;</Link>
            {' '}&nbsp;|&nbsp;{' '}
            <Link href="/silent-retreats" style={{ color: 'var(--color-primary)' }}>Silent retreats &rarr;</Link>
            {' '}&nbsp;|&nbsp;{' '}
            <Link href="/best-meditation-retreats-in-india" style={{ color: 'var(--color-primary)' }}>Best meditation retreats in India &rarr;</Link>
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            Yoga &amp; Movement
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Rishikesh is the natural home of yoga in India &mdash; ashram tradition, experienced
            teachers, and Ganges-side practice. For altitude yoga that demands conscious breathing,
            Zanskar at 3,500&nbsp;metres transforms every pose. Sankri combines yoga with mountain
            trekking for those who want body and mind fully engaged.
          </p>
          <p>
            <Link href="/yoga-retreats" style={{ color: 'var(--color-primary)' }}>Yoga retreats &rarr;</Link>
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            Burnout Recovery
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Burnout needs genuine stopping &mdash; not another optimisation. Chakrata offers
            accessible recovery in forest silence. Zanskar offers radical reset through extreme
            remoteness. Munsiyari provides perspective through alpine grandeur. Sankri adds
            physical release through gentle trekking.
          </p>
          <p>
            <Link href="/burnout-recovery-retreats" style={{ color: 'var(--color-primary)' }}>Burnout recovery retreats &rarr;</Link>
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            Spiritual Immersion
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Rishikesh carries the weight of India&rsquo;s living spiritual tradition. Zanskar
            offers Buddhist monastic immersion dating to the 12th century. Chakrata provides
            nature-based spirituality &mdash; the forest itself as teacher. Each serves a
            different spiritual orientation.
          </p>
          <p>
            <Link href="/spiritual-retreats" style={{ color: 'var(--color-primary)' }}>Spiritual retreats &rarr;</Link>
          </p>
        </section>

        <PrimaryCTA
          label="Help Me Choose"
          subtext="Describe what you need and we'll match you to the right retreat and location."
          vertical="retreat"
          category="best-himalayan"
          sourcePath={PATH}
        />

        {/* ── BY LOCATION ───────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Best Himalayan Retreat Locations
          </h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { id: 'zanskar', name: 'Zanskar, Ladakh', desc: 'The most remote and immersive. Monastery meditation, high-altitude silence, radical disconnection. 3,500m.' },
              { id: 'chakrata', name: 'Chakrata, Uttarakhand', desc: 'Accessible forest silence. Beginners and burnout recovery. Dense deodar forest at 2,000m, 2.5 hours from Dehradun.' },
              { id: 'rishikesh', name: 'Rishikesh, Uttarakhand', desc: 'India\'s yoga capital. Spiritual tradition, ashram culture, Ganges-side practice. Year-round.' },
              { id: 'munsiyari', name: 'Munsiyari, Uttarakhand', desc: 'Alpine grandeur facing Panchachuli peaks. Spacious silence and perspective. 2,200m.' },
              { id: 'sankri', name: 'Sankri, Uttarakhand', desc: 'Remote basecamp for trek-retreat combinations. Mountain movement and forest depth. 1,920m.' },
            ].map((loc) => (
              <div key={loc.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  <Link href={`/locations/${loc.id}`} style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                    {loc.name}
                  </Link>
                </h3>
                <p style={{ margin: 0, lineHeight: 1.7, fontSize: '0.95rem' }}>{loc.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1rem' }}>
            <Link href="/locations" style={{ color: 'var(--color-primary)' }}>View all locations &rarr;</Link>
          </p>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/retreats" style={{ color: 'var(--color-primary)' }}>&larr; All Retreats</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>Himalayan Retreats Guide</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/locations" style={{ color: 'var(--color-primary)' }}>Locations</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
