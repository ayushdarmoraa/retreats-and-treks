import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/himalayan-retreat-with-trekking';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Himalayan Retreat with Trekking — Inner Work Meets Outer Terrain | Retreats And Treks',
    description:
      'Himalayan retreat with trekking — meditation and silence combined with mountain walking. The rare platform that offers both. Chakrata, Sankri, Munsiyari, Zanskar.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Himalayan Retreat with Trekking',
      description: 'Inner work meets outer terrain. The rare platform that offers both retreat and mountain trekking.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Why is combining a retreat with trekking better than doing them separately?',
    answer:
      'When done sequentially, the retreat creates a quality of inner stillness that transforms the trekking experience — every step becomes present, every view is received without mental commentary. And the physical exertion of trekking grounds the sometimes ethereal retreat experience in the body. They complete each other. Done separately, months apart, this synergy is lost.',
  },
  {
    question: 'What difficulty level are the treks?',
    answer:
      'We offer treks from easy (Chakrata forest walks, 3–4 hours/day, minimal elevation gain) to moderate (Har Ki Dun from Sankri, 5–7 hours/day, up to 3,500 m) to challenging (Zanskar valley treks, high altitude, multiple days). We match the trek difficulty to your fitness and experience. No one is pushed beyond their capacity.',
  },
  {
    question: 'Can I customise the retreat-to-trek ratio?',
    answer:
      'Yes. Common formats: 3 days retreat + 3 days trek (6 days total), 5 days retreat + 3 days trek (8 days), or 3 days retreat + 5 days trek (8 days). The right ratio depends on whether you need more inner work or more physical engagement. We design the itinerary around your needs.',
  },
  {
    question: 'What is included in a combined retreat and trekking package?',
    answer:
      'Everything: accommodation, meals, guided meditation sessions, trek leadership, camping equipment (where needed), all internal transport, and pickup/drop coordination. You arrive with personal gear; we handle the rest. Groups are small (maximum 12) to maintain both the retreat quality and trekking safety.',
  },
];

export default function HimalayanRetreatWithTrekkingPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Himalayan Retreat with Trekking', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Retreat with Trekking' }]} />

      <article>
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Himalayan Retreat with Trekking
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Most retreat operators have never been on a mountain trail. Most trekking companies
            have never sat in sustained silence. We operate at the intersection &mdash; because
            the Himalayas are not a backdrop for either activity alone. They are an environment
            where inner stillness and physical engagement with terrain create something that
            neither practice achieves independently. A Himalayan retreat with trekking is the
            complete experience of mountain immersion.
          </p>
        </header>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Four Locations, Four Levels
          </h2>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/chakrata" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Chakrata</Link> — Gentle Entry
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0, fontSize: '0.95rem' }}>
                Forest walks among deodars, treks to Tiger Falls and Budher Caves. Easy terrain,
                3–5 hours/day. Combined with forest meditation retreat. The most accessible
                option — no prior trekking experience needed.
              </p>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/sankri" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Sankri</Link> — Classic Mountain
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0, fontSize: '0.95rem' }}>
                Village retreat + Har Ki Dun or Kedarkantha trail. Moderate difficulty, 5–7
                hours/day through forest, meadow, and river valley. The combination of pastoral
                village retreat and classic Uttarakhand trekking.
              </p>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/munsiyari" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Munsiyari</Link> — Alpine Challenge
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0, fontSize: '0.95rem' }}>
                Alpine meadow retreat + Khaliya Top or glacier treks. High-altitude meadows with
                Panchachuli views. Moderate to challenging. For those who want landscape scale
                alongside contemplative depth.
              </p>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Link href="/locations/zanskar" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Zanskar</Link> — Full Immersion
              </h3>
              <p style={{ lineHeight: 1.75, margin: 0, fontSize: '0.95rem' }}>
                Monastery meditation + Trans-Himalayan trekking at 3,500+ m. The deepest
                combination we offer. Multi-day treks to Phuktal Gompa or along the Zanskar
                River. For experienced practitioners and fit trekkers, June–September only.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Design My Retreat + Trek"
          subtext="Tell us your dates, fitness level, and what draws you — we'll create the right combination."
          vertical="retreat"
          category="retreat-trekking"
          sourcePath={PATH}
        />

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Related Pages
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            <li><Link href="/meditation-retreat-and-trek" style={{ color: 'var(--color-primary)' }}>Meditation Retreat + Trek</Link> — detailed format guide</li>
            <li><Link href="/trek-and-meditate-himalayas" style={{ color: 'var(--color-primary)' }}>Trek &amp; Meditate</Link> — for the trekker who wants meditation</li>
            <li><Link href="/treks/best-treks-in-uttarakhand" style={{ color: 'var(--color-primary)' }}>Best Treks in Uttarakhand</Link></li>
            <li><Link href="/retreat-programs" style={{ color: 'var(--color-primary)' }}>All Retreat Programs</Link></li>
          </ul>
        </section>

        <TrackedFAQ items={FAQ_ITEMS} page={PATH} />

        <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
          <Link href="/meditation-retreat-and-trek" style={{ color: 'var(--color-primary)' }}>Retreat + Trek</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/trek-and-meditate-himalayas" style={{ color: 'var(--color-primary)' }}>Trek &amp; Meditate</Link>
          {' '}&nbsp;|&nbsp;{' '}
          <Link href="/treks" style={{ color: 'var(--color-primary)' }}>All Treks</Link>
        </p>
      </article>
    </TrackedPage>
  );
}
