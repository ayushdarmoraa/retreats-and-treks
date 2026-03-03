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

const PATH = '/treks/trek-packages-uttarakhand';

export function generateMetadata(): Metadata {
  return {
    title: 'Himalayan Trek Packages in Uttarakhand — All-Inclusive Guided Treks | Retreats And Treks',
    description:
      'Book all-inclusive trek packages in Uttarakhand — Kedarkantha, Har Ki Dun, Tiger Fall and more. Guide, meals, permits and camping included. Packages for beginners, groups and solo trekkers.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Himalayan Trek Packages in Uttarakhand',
      description:
        'All-inclusive trekking packages across Uttarakhand. Certified guides, meals, permits and accommodation included. Individual and group packages from Sankri and Chakrata.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is included in a trekking package?',
    answer:
      'Our trek packages include a certified trek leader and support staff, all meals on the trail (breakfast, lunch, dinner, and snacks), accommodation (guesthouse, homestay, or camping depending on the route), forest permits and entry fees, basic safety gear (first-aid kit, emergency communication), and trekking equipment where required (tents, sleeping bags, cooking equipment). Porters or pack animals handle heavy gear. You carry only a daypack with personal essentials.',
  },
  {
    question: 'Are permits included in the package?',
    answer:
      'Yes. All forest permits, national park entry fees, and camping permissions are included in the package cost and arranged by the operator before departure. You do not need to apply for or carry any permits yourself. This includes the Govind National Park permit for Kedarkantha and Har Ki Dun, and the Chakrata forest range permissions for Tiger Fall and Budher Caves.',
  },
  {
    question: 'Do packages include transport from Delhi?',
    answer:
      'Transport from Delhi is available as an optional add-on for most packages. The standard package begins and ends at the trek base — Sankri or Chakrata. Delhi-to-base transport can be added as a shared vehicle (cost-effective for groups) or private vehicle (flexible scheduling). Some operators include transport in premium package tiers. Check availability when booking.',
  },
  {
    question: 'Is equipment provided?',
    answer:
      'Yes. Camping equipment — tents, sleeping bags, sleeping mats, and cooking gear — is provided as part of the package. For winter treks, gaiters, microspikes, and trekking poles are included. You need to bring personal clothing (layered for the season), trekking boots, a daypack, sunscreen, sunglasses, and a headlamp. A detailed gear checklist is provided after booking.',
  },
  {
    question: 'Can beginners book trek packages?',
    answer:
      'Yes. Most packages are designed for beginner-to-moderate fitness levels. Tiger Fall and Budher Caves in Chakrata require no prior trekking experience. Kedarkantha is the most popular first Himalayan trek in India — thousands of beginners complete it every season. The guided format means pace management, safety, navigation, and logistics are handled by the team. You focus on walking and enjoying the mountains.',
  },
  {
    question: 'What is the cancellation policy?',
    answer:
      'Cancellation policies vary by operator and season. Standard terms: full refund if cancelled 30 or more days before departure, 50 percent refund between 15 and 29 days, no refund within 14 days. Peak season bookings (December to January for Kedarkantha, May to June for Har Ki Dun) may have stricter terms due to high demand. Date changes are usually accommodated with advance notice. Trip insurance is recommended.',
  },
];

export default function TrekPackagesUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Trek Packages Uttarakhand', url: canonicalUrl },
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
          { name: 'Trek Packages Uttarakhand' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
            Himalayan Trek Packages in Uttarakhand
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            All-inclusive. Guided. Everything handled. Our Uttarakhand trekking packages
            cover the complete experience — certified trek leader, meals on trail,
            accommodation, forest permits, and safety equipment. You arrive at the base,
            walk, and the rest is managed. No logistics to arrange, no permits to chase, no
            gear to source. Whether you are booking as an individual, a couple, a corporate
            team, or a student group, the format is the same: professional support from
            trailhead to return.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            Packages range from single-day forest treks to multi-day summit routes.
            Duration, season, and group size determine the structure. Every package is
            designed to make Himalayan trekking accessible — regardless of prior experience.
          </p>
        </header>

        <PrimaryCTA
          label="Plan My Trek Package"
          subtext="Looking for a guided package? Tell us what you need."
          vertical="trek"
          category="packages"
          sourcePath="/treks/trek-packages-uttarakhand"
        />

        {/* ── WHAT IS INCLUDED ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            What Is Included in Our Trek Packages?
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Certified trek leader and support staff.</strong> Every group is led
              by an experienced, locally certified guide with first-aid training and route
              expertise. Support staff handle camp setup, cooking, and porter coordination.
              The guide-to-trekker ratio stays below 1:8 for safety and pace management.
            </li>
            <li>
              <strong>Accommodation.</strong> Guesthouse or homestay at base camp.
              High-quality alpine tents at trail camps. Sleeping bags and mats provided.
              The accommodation format depends on the route — Chakrata packages use
              homestays, Sankri packages combine guesthouses with trail camping.
            </li>
            <li>
              <strong>All meals.</strong> Breakfast, lunch (packed or hot depending on trail
              logistics), dinner, and trail snacks. Meals are freshly prepared on trail by
              a dedicated cook. Vegetarian and non-vegetarian options available. Dietary
              requirements accommodated with advance notice.
            </li>
            <li>
              <strong>Permits and forest fees.</strong> All necessary permits — Govind
              National Park entry, forest range permissions, camping permits — are pre-arranged
              and included. No paperwork or permit applications required from you.
            </li>
            <li>
              <strong>Basic safety gear.</strong> First-aid kit, emergency communication
              equipment, and oxygen cylinder (for high-altitude routes). For winter treks:
              gaiters, microspikes, and trekking poles included.
            </li>
            <li>
              <strong>Transport (optional add-on).</strong> Delhi-to-base-camp transport is
              available as a shared or private vehicle add-on. The standard package begins
              and ends at the trek base. Self-drive and public transport options are also
              detailed in pre-departure information.
            </li>
          </ul>
        </section>

        <PrimaryCTA
          label="Plan My Trek Package"
          subtext="Share your dates and group size. We will build the right package."
          vertical="trek"
          category="packages"
          sourcePath="/treks/trek-packages-uttarakhand"
        />

        {/* ── POPULAR PACKAGES ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Popular Trek Packages in Uttarakhand
          </h2>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Kedarkantha Trek Package
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: 'var(--color-primary)' }}>
              Kedarkantha summit trek
            </Link>{' '}
            is the most booked package in our portfolio. Standard format: 4 days, 3 nights
            from{' '}
            <Link href="/treks/location/sankri" style={{ color: 'var(--color-primary)' }}>
              Sankri trek base
            </Link>
            . Summit at 3,800 metres with 360-degree Himalayan panorama. Available
            in multiple itinerary options: the standard 4-day guided route with gradual
            acclimatisation, a 3-day compressed format for experienced trekkers, and a
            winter special (December to February) with enhanced cold-weather gear and snow
            support. Group packages available for corporate teams and student batches.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Har Ki Dun Trek Package
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The{' '}
            <Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: 'var(--color-primary)' }}>
              Har Ki Dun valley trek
            </Link>{' '}
            is the premier valley trek package. 6 days, 5 nights through the Tons Valley
            to a glacial amphitheatre surrounded by 5,000-metre peaks. Best from April to
            June and September to November. The package includes village homestay stops,
            multiple camping locations with hot meals, and guided exploration of the valley
            floor. This is the immersive option — for trekkers who want sustained mountain
            time rather than a quick summit.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Tiger Fall &amp; Short Trek Packages
          </h3>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            The{' '}
            <Link href="/treks/location/chakrata/tiger-fall-trek" style={{ color: 'var(--color-primary)' }}>
              Tiger Fall Trek in Chakrata
            </Link>{' '}
            and{' '}
            <Link href="/treks/location/chakrata/budher-caves-trek" style={{ color: 'var(--color-primary)' }}>
              Budher Caves Trek
            </Link>{' '}
            operate as{' '}
            <Link href="/treks/3-day-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
              3-day treks in Uttarakhand
            </Link>{' '}
            from{' '}
            <Link href="/treks/location/chakrata" style={{ color: 'var(--color-primary)' }}>
              Chakrata trek base
            </Link>
            . The short-trek format — 2 nights, 3 days — includes homestay accommodation,
            guided forest trekking, and all meals. Ideal for first-time trekkers,
            corporate weekends, and couples. These are the lowest-commitment packages: no
            altitude concerns, no multi-day camping, and the shortest drive from Delhi.
            Available year-round with seasonal variations in trail conditions.
          </p>
        </section>

        {/* ── COST STRUCTURE ───────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            How Much Do Trek Packages Cost?
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Package pricing depends on four factors, and understanding them helps you
            compare options accurately.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Duration.</strong> Longer treks cost more — additional days mean
              additional camping, meals, guide days, and permit costs. A 3-day Chakrata
              package costs significantly less than a 6-day Har Ki Dun package.
            </li>
            <li>
              <strong>Group size.</strong> Per-person cost decreases with larger groups.
              Shared guide fees, transport, and camp logistics make group bookings more
              cost-effective. Solo and couple bookings join scheduled group departures at
              standard per-person rates.
            </li>
            <li>
              <strong>Season.</strong> Peak-season packages —{' '}
              <Link href="/treks/winter-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
                winter treks in Uttarakhand
              </Link>{' '}
              (December to January) and{' '}
              <Link href="/treks/summer-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
                summer treks in Uttarakhand
              </Link>{' '}
              (May to June) — carry higher demand and may include premium pricing. Shoulder
              seasons (October to November, February to March) often offer the best
              value-to-experience ratio.
            </li>
            <li>
              <strong>Transport inclusion.</strong> Base-camp-only packages are the most
              affordable. Adding Delhi-to-base transport (shared vehicle) increases cost
              moderately. Private vehicle transport is the premium option. Self-drive
              trekkers can save by handling their own transport.
            </li>
          </ul>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            For current pricing on specific routes and dates, contact us directly with your
            preferred trek, dates, and group size. We provide transparent, itemised quotes
            with no hidden charges.
          </p>
        </section>

        {/* ── WHO SHOULD BOOK ──────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Should Book a Trek Package?
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Solo travellers.</strong> Join a scheduled group departure. You trek
              with a small group, share meals and camps, and have guided support throughout.
              No solo navigation, no solo logistics. Many trekkers meet lifelong friends on
              group departures.
            </li>
            <li>
              <strong>First-time trekkers.</strong> A guided package is the safest and most
              enjoyable way to start. Everything is handled — you focus on the experience.
              See our{' '}
              <Link href="/treks/beginner-treks-uttarakhand" style={{ color: 'var(--color-primary)' }}>
                beginner treks in Uttarakhand
              </Link>{' '}
              guide for route recommendations.
            </li>
            <li>
              <strong>Corporate groups.</strong> Custom packages for team-building treks —
              Chakrata for weekends, Kedarkantha for immersive programmes. Dedicated guides,
              group accommodation, and logistics coordination included. We handle the
              operational complexity so your team focuses on the experience.
            </li>
            <li>
              <strong>Student groups.</strong> Budget-optimised packages for college and
              university groups. Group rates, shared transport, and structured itineraries
              that balance challenge with safety. Ideal during vacation windows (May to
              June, October).
            </li>
          </ul>
        </section>

        {/* ── COMMERCIAL NAVIGATION ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: '#fafafa' }}>
          <p style={{ lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
            Exploring routes before booking? See the full{' '}
            <Link href="/treks" style={{ color: 'var(--color-primary)' }}>
              Himalayan treks directory
            </Link>{' '}
            for detailed itineraries across all seasons and difficulty levels.
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
