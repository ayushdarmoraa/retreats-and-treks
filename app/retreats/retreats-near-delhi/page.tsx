import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { TrekTrustStrip, TrekExperienceGallery } from '@/components/trek/TrekRichSections';
import { images } from '@/lib/images';

const PATH = '/retreats/retreats-near-delhi';

export function generateMetadata(): Metadata {
  return {
    title: 'Himalayan Retreats Near Delhi — Mountain Wellness Within Driving Distance | Retreats And Treks',
    description:
      'Find Himalayan retreats near Delhi in Chakrata, Rishikesh and Sankri. Yoga, meditation and mountain wellness programs 5–9 hours from the capital by road.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Himalayan Retreats Near Delhi — Mountain Wellness Within Driving Distance',
      description:
        'Mountain retreat programs within a day\'s drive of Delhi. Chakrata, Rishikesh and Sankri — yoga, meditation and structured restoration in Uttarakhand.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Himalayan Retreats Near Delhi — Mountain Wellness Within Driving Distance'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the closest Himalayan retreat to Delhi?',
    answer:
      'Rishikesh is the closest Himalayan retreat destination from Delhi at five to six hours by road. It offers established yoga and meditation infrastructure with the shortest travel overhead. Chakrata is the next closest at six to seven hours, offering a quieter forest-ridge environment. Both are comfortably reachable on a Friday evening departure.',
  },
  {
    question: 'Can I drive to these retreats from Delhi?',
    answer:
      'Yes. All retreat locations listed are accessible by private car or shared cab from Delhi. Rishikesh is reached via the Delhi–Dehradun highway. Chakrata adds a hill extension beyond Dehradun. Sankri requires a longer drive through Purola. Self-drive is the most flexible option — it allows departure timing that matches your Friday work schedule. Road conditions are generally good year-round for Rishikesh and Chakrata.',
  },
  {
    question: 'Is a 2-day retreat near Delhi effective?',
    answer:
      'Yes. A well-structured two-night retreat delivers measurable benefit. Environment change — not duration — is the primary driver of cognitive reset. Moving from screen-dominated urban life into a structured mountain setting triggers neurological downshift within hours. Friday evening arrival with a full Saturday immersion and Sunday morning closing is a complete cycle. Participants consistently report noticeable mental reset within 48 hours when the structure is right.',
  },
  {
    question: 'Which is better for a retreat near Delhi — Chakrata or Rishikesh?',
    answer:
      'It depends on what you seek. Rishikesh is faster to reach, offers established yoga lineage, riverside practice, and a wider range of facilitators. Chakrata is quieter, higher in altitude, and provides forest-ridge immersion with lower tourist density. Choose Rishikesh for structured yoga and spiritual tradition. Choose Chakrata for silence, nature immersion, and reduced stimulation. Both are equally valid — they serve different retreat intentions.',
  },
  {
    question: 'Are retreats near Delhi open year-round?',
    answer:
      'Rishikesh and Chakrata operate retreat programs year-round. Rishikesh remains mild in winter and warm in summer. Chakrata is cool year-round with occasional light snow in January. Sankri is best from April through November — winter snowfall limits access. October to November and February to April are the most popular booking windows across all locations.',
  },
];

export default function RetreatNearDelhiPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Retreats Near Delhi', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const trustItems = [
    { label: 'Accessible from Delhi', sublabel: '5–9 hours — Chakrata · Rishikesh · Sankri' },
    { label: 'Small groups', sublabel: 'Max 12 participants' },
    { label: 'Meals & transfers', sublabel: 'Seasonal local food included' },
    { label: 'Free cancellation', sublabel: 'Up to 7 days prior' },
  ];

  const galleryImages = [
    images.heroes.valleyForest,
    images.himalayanRetreats.weekendHimalayan,
    images.locations.chakrata,
    images.locations.rishikesh,
    images.moments.walking,
  ];

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 var(--space-md) var(--space-lg)' }}>
      <AutoArticleSchema
        title="Himalayan Retreats Near Delhi"
        description="Find Himalayan retreats near Delhi in Chakrata, Rishikesh and Sankri. Yoga, meditation and mountain wellness programs 5–9 hours from the capital by road."
        path={PATH}
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
          { name: 'Retreats', href: '/retreats' },
          { name: 'Retreats Near Delhi' },
        ]}
      />

      <article>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section
          style={{
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            position: 'relative',
            minHeight: 'clamp(520px, 72vh, 760px)',
            overflow: 'hidden',
            marginBottom: 0,
            display: 'flex',
            alignItems: 'stretch',
          }}
        >
          <Image
            src={images.heroes.valleyForest.src}
            alt={images.heroes.valleyForest.alt}
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(6, 20, 18, 0.82) 0%, rgba(6, 20, 18, 0.64) 42%, rgba(6, 20, 18, 0.22) 100%)',
              zIndex: 1,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(0, 0, 0, 0.18) 0%, rgba(0, 0, 0, 0.18) 58%, rgba(0, 0, 0, 0.5) 100%)',
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 3,
              width: '100%',
              maxWidth: '72rem',
              margin: '0 auto',
              padding: 'clamp(3rem, 7vw, 6rem) clamp(1.25rem, 4vw, 2rem)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ maxWidth: '46rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.45rem 0.85rem',
                  border: '1px solid rgba(255, 255, 255, 0.38)',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: '#ecfeff',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  backdropFilter: 'blur(10px)',
                  marginBottom: '1.3rem',
                }}
              >
                Weekend retreats near Delhi NCR
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.55rem, 7vw, 5.4rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.06em',
                  margin: '0 0 1rem',
                  lineHeight: 0.95,
                  color: '#ffffff',
                  textShadow: '0 10px 34px rgba(0, 0, 0, 0.34)',
                }}
              >
                The 48-Hour Himalayan Reset
              </h1>

              <p
                style={{
                  fontSize: 'clamp(1.05rem, 2vw, 1.28rem)',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 300,
                  margin: '0 0 1.5rem',
                  maxWidth: '42rem',
                }}
              >
                Yoga, meditation, forest walks and quiet mountain stays in Chakrata,
                Rishikesh and Sankri — planned for Delhi NCR travellers who need a complete
                weekend reset without taking annual leave.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.65rem',
                  marginBottom: '1.8rem',
                }}
              >
                {['5–9 hrs from Delhi', '2–3 day formats', 'Yoga + meditation', 'Small groups', 'Custom dates'].map((item) => (
                  <span
                    key={item}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.14)',
                      border: '1px solid rgba(255, 255, 255, 0.28)',
                      color: '#ffffff',
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}>
                <a
                  href="#destination-comparison"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '48px',
                    padding: '0.9rem 1.35rem',
                    borderRadius: '999px',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    boxShadow: '0 14px 34px rgba(15, 118, 110, 0.32)',
                  }}
                >
                  Start Planning on WhatsApp
                </a>
                <a
                  href="#destination-comparison"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '48px',
                    padding: '0.9rem 1.25rem',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.34)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  Compare destinations
                </a>
              </div>
            </div>
          </div>
        </section>

        <TrekTrustStrip items={trustItems} />

        {/* ── QUICK COMPARISON ─────────────────────────────────────── */}
        <section id="destination-comparison" style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: 'clamp(1.65rem, 3vw, 2.2rem)', fontWeight: 300, marginBottom: '0.75rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Choose Your Retreat Setting
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1.5rem', color: '#4b5563', maxWidth: '42rem', fontSize: '1rem' }}>
            Each destination creates a different kind of reset. Choose quiet forest stillness, riverside yoga energy, or deep Himalayan remoteness.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginBottom: 'var(--space-lg)',
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
              }}
            >
              <div style={{ position: 'relative', height: '220px' }}>
                <Image
                  src={images.locations.chakrata.src}
                  alt={images.locations.chakrata.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.5) 100%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    right: '1rem',
                    bottom: '1rem',
                    color: '#ffffff',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.92, marginBottom: '0.35rem' }}>
                    6–7 hrs from Delhi
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Chakrata</h3>
                </div>
              </div>
              <div style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '0.75rem' }}>
                  {['Quiet', 'Forest', 'Low-stimulation'].map((item) => (
                    <span
                      key={item}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '999px',
                        backgroundColor: '#ecfdf5',
                        color: '#065f46',
                        fontSize: '0.74rem',
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: '#374151', margin: 0 }}>
                  Best for silence, deodar forests, and a gentle nervous-system reset away from tourist noise.
                </p>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
              }}
            >
              <div style={{ position: 'relative', height: '220px' }}>
                <Image
                  src={images.locations.rishikesh.src}
                  alt={images.locations.rishikesh.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.5) 100%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    right: '1rem',
                    bottom: '1rem',
                    color: '#ffffff',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.92, marginBottom: '0.35rem' }}>
                    5–6 hrs from Delhi
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Rishikesh</h3>
                </div>
              </div>
              <div style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '0.75rem' }}>
                  {['Yoga', 'Riverside', 'Guided practice'].map((item) => (
                    <span
                      key={item}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '999px',
                        backgroundColor: '#eff6ff',
                        color: '#1d4ed8',
                        fontSize: '0.74rem',
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: '#374151', margin: 0 }}>
                  Best for structured yoga, meditation, spiritual atmosphere, and the fastest weekend escape from Delhi.
                </p>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
              }}
            >
              <div style={{ position: 'relative', height: '220px' }}>
                <Image
                  src={images.locations.sankri.src}
                  alt={images.locations.sankri.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.5) 100%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    right: '1rem',
                    bottom: '1rem',
                    color: '#ffffff',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.92, marginBottom: '0.35rem' }}>
                    8–9 hrs from Delhi
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Sankri</h3>
                </div>
              </div>
              <div style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '0.75rem' }}>
                  {['Remote', 'Mountain', 'Digital detox'].map((item) => (
                    <span
                      key={item}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '999px',
                        backgroundColor: '#f5f3ff',
                        color: '#6d28d9',
                        fontSize: '0.74rem',
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: '#374151', margin: 0 }}>
                  Best for deeper mountain immersion, slower extended weekends, and a more complete disconnect from urban life.
                </p>
              </div>
            </div>
          </div>
        </section>

        <TrekExperienceGallery
          images={galleryImages}
          heading="A visual glimpse of your mountain reset"
          topPadding="1.75rem"
        />

        {/* ── HOW CLOSE ────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            How Close Are These Retreats to Delhi?
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Travel time is the decisive factor for retreat accessibility. Every hour of journey
            subtracts from time in the mountains. Here are the realistic drive times from
            central Delhi — not optimistic estimates, but Friday-evening-traffic-adjusted
            numbers.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Rishikesh — 5–6 hours.</strong> The fastest Himalayan retreat destination.
              Delhi–Haridwar highway is well-maintained. The final stretch along the Ganges
              adds thirty minutes but signals the transition into retreat territory. Arrival by
              10–11 PM on a Friday departure after work is realistic.
            </li>
            <li>
              <strong>Chakrata — 6–7 hours.</strong> Via Dehradun, then a hill extension into
              the cantonment area. The additional hour beyond Rishikesh buys significantly more
              altitude, forest density, and quiet. Arrival by midnight on a Friday departure.
            </li>
            <li>
              <strong>Sankri — 8–9 hours.</strong> Deeper into the mountains via Purola. This
              is tight for a standard weekend but workable for extended weekends or three-day
              holidays. The extra travel time delivers genuine wilderness immersion that closer
              locations cannot replicate.
            </li>
          </ul>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            All three destinations are accessible by private car, shared cab, or a combination
            of train and taxi. No flights required. The Delhi–Dehradun Shatabdi train is a
            practical alternative for Rishikesh and Chakrata — four-and-a-half hours to
            Dehradun station, followed by a short road transfer.
          </p>
        </section>
        <PrimaryCTA
          label="Plan My Weekend Retreat"
          subtext="Tell us your preferred dates. We will recommend the right location."
          vertical="retreat"
          category="near-delhi"
          sourcePath="/retreats/retreats-near-delhi"
        />
        {/* ── BEST DESTINATIONS ─────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Best Retreat Destinations Near Delhi
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Proximity alone does not make a strong retreat location. Environment quality,
            programme structure, and the ability to disconnect from urban rhythm matter
            equally. These three destinations deliver on all counts.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/chakrata" style={{ color: 'inherit' }}>
              Chakrata — Quiet Mountain Escape (6–7 Hours)
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Chakrata sits at 2,200 metres on a forested ridge in Dehradun district — a quiet
            cantonment town with deodar canopy, waterfall walks, and Himalayan views on clear
            days. The military heritage means minimal commercial development. No tourist strip.
            No ambient noise. Just forest and villages.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            This quietness is what makes{' '}
            <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)' }}>
              Chakrata
            </Link>{' '}
            the strongest retreat-near-Delhi option for professionals seeking genuine
            disconnection. Weekend programs here include morning yoga on forest platforms,
            guided meditation walks, breathwork sessions, and evening campfire integration.
            The 2-night format feels unhurried because the environment does half the work —
            clean air and silence begin the reset before any programmed session starts.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Chakrata is the practical default for first-time retreat participants from Delhi.
            Accessible enough for a regular weekend, quiet enough for genuine transformation,
            and structured enough that two nights deliver a complete cycle.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/rishikesh" style={{ color: 'inherit' }}>
              Rishikesh — Riverside Yoga Hub (5–6 Hours)
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Rishikesh is the fastest Himalayan destination from Delhi and India&apos;s most
            established centre for{' '}
            <Link href="/retreats/journeys/yoga-and-movement" style={{ color: 'var(--color-primary)' }}>
              yoga and movement retreats
            </Link>.
            The five-to-six-hour drive places you on the Ganges by late evening. For
            professionals who want the most time-efficient Friday-to-Sunday format, Rishikesh
            delivers consistently.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            The retreat character here is different from Chakrata. Where Chakrata is forest
            silence,{' '}
            <Link href="/retreats/rishikesh" style={{ color: 'var(--color-primary)' }}>
              Rishikesh
            </Link>{' '}
            is spiritual infrastructure — ashram traditions, experienced yoga teachers,
            riverside meditation, and a lineage of practice that adds depth to even a short
            stay. Early morning practice on the riverbank, with mist on the water and temple
            bells in the distance, creates a container that manufactured settings cannot
            replicate.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: 'var(--space-md)' }}>
            Weekend formats in Rishikesh tend toward structured yoga and meditation
            programming — two sessions per day, pranayama instruction, and facilitated group
            reflection. This suits participants who want guided practice rather than
            open-ended nature immersion.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            <Link href="/retreats/sankri" style={{ color: 'inherit' }}>
              Sankri — Extended Weekend Option (8–9 Hours)
            </Link>
          </h3>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            Sankri sits deeper in the Himalayas — eight to nine hours from Delhi in the upper
            Tons Valley near the Govind Wildlife Sanctuary. The travel time makes it tight for
            a standard Friday–Sunday weekend, but it works well for extended weekends and
            three-day holidays. If you have a Friday off, or can depart Thursday evening,{' '}
            <Link href="/retreats/sankri" style={{ color: 'var(--color-primary)' }}>
              Sankri
            </Link>{' '}
            offers something the closer locations cannot: true remote mountain immersion at
            the edge of the treeline. Pine forests, glacial rivers, and complete digital
            disconnection.
          </p>
        </section>

        {/* ── WHO SHOULD CHOOSE ────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            Who Should Choose a Retreat Near Delhi
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Retreats near Delhi are specifically for people whose time constraints make longer
            journeys impractical. The proximity advantage removes every logistical excuse.
          </p>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, marginBottom: '1rem' }}>
            <li>
              <strong>Corporate professionals (25–45)</strong> — carrying decision fatigue,
              screen overload, and accumulated stress. A Friday departure and Sunday return
              uses zero annual leave while delivering genuine neurological reset
            </li>
            <li>
              <strong>Startup founders and entrepreneurs</strong> — operating in always-on
              mode with no boundary between work and rest. A structured weekend container
              creates the separation that willpower alone cannot
            </li>
            <li>
              <strong>Couples needing a reset</strong> — a shared mountain retreat without
              tourist distractions creates conversation and connection that a resort weekend
              does not deliver
            </li>
            <li>
              <strong>First-time retreat participants</strong> — a nearby destination with
              short travel time is the lowest-commitment entry point. Chakrata or Rishikesh
              for two nights is enough to experience the retreat container without the
              intimidation factor of a remote journey
            </li>
          </ul>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            If your schedule allows for more than a weekend, our{' '}
            <Link href="/retreats/weekend-himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              weekend Himalayan retreats
            </Link>{' '}
            guide covers the full two-to-three-day format across all locations, including
            seasonal timing and booking guidance.
          </p>
        </section>

        {/* ── WHAT A 2–3 DAY RETREAT LOOKS LIKE ─────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
            What a 2–3 Day Retreat Near Delhi Looks Like
          </h2>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>Friday evening — Arrival and settling.</strong>
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Depart Delhi after work. Arrive between 10 PM and midnight depending on your
            destination. A light welcome — herbal tea, room orientation, brief grounding
            exercise — marks the transition from travel mode to retreat space. No structured
            programming. The journey fatigue becomes the bridge to deep first-night sleep in
            mountain air.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>Saturday — Full immersion day.</strong>
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Saturday is the core of the retreat. Pre-dawn meditation or gentle yoga. A full
            morning practice session with breathwork. Guided nature walk or forest immersion
            after lunch. Afternoon workshop — sound healing, journaling, or restorative yoga.
            Evening integration circle. Meals timed to support the rhythm. Screens stay off.
            The full day in mountain environment, without decisions or obligations, is where
            the reset happens.
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '0.5rem' }}>
            <strong>Sunday — Closing and departure.</strong>
          </p>
          <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
            Sunday begins with a final morning practice — often the most powerful session
            because the body and mind have already shifted. A closing circle or
            intention-setting exercise anchors the experience. Breakfast and departure by late
            morning allow comfortable return to Delhi by evening.
          </p>
          <p style={{ lineHeight: 1.8, margin: 0 }}>
            For guidance on whether a shorter or longer format suits your needs, see our
            comparison of{' '}
            <Link href="/blog/3-day-vs-5-day-himalayan-retreat" style={{ color: 'var(--color-primary)' }}>
              three-day versus five-day retreat formats
            </Link>.
          </p>
        </section>

        {/* ── COMMERCIAL NAVIGATION ─────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)', padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: '#fafafa' }}>
          <p style={{ lineHeight: 1.8, margin: 0, fontSize: '0.95rem' }}>
            Exploring all locations and formats?{' '}
            <Link href="/retreats/himalayan-retreats" style={{ color: 'var(--color-primary)' }}>
              Himalayan retreats in India
            </Link>{' '}
            covers every destination, duration, and program type. For state-level planning,
            see our{' '}
            <Link href="/retreats/uttarakhand-retreats" style={{ color: 'var(--color-primary)' }}>
              Uttarakhand retreats
            </Link>{' '}
            guide.
          </p>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 'var(--space-lg)' }}>
            Frequently Asked Questions
          </h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </section>


      </article>
    </TrackedPage>
  );
}
