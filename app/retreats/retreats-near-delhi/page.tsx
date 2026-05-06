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
  {
    question: 'How much does a weekend retreat near Delhi cost?',
    answer:
      'The cost depends on destination, property type, group size, inclusions, and whether transport from Delhi NCR is required. A simple two-night retreat with stay, meals, yoga, meditation, and local guidance usually costs less than a luxury wellness resort, while private or corporate formats cost more. The best way to estimate pricing is to share your dates, group size, and preferred destination so the retreat can be planned around your budget.',
  },
  {
    question: 'Are retreats near Delhi beginner-friendly?',
    answer:
      'Yes. Most weekend retreats near Delhi are designed for beginners, especially two-night yoga, meditation, breathwork, and nature-reset formats. You do not need previous yoga or meditation experience. Sessions can be kept gentle, restorative, and accessible, with more emphasis on rest, guided practice, clean air, and slowing down than on advanced postures or intense schedules.',
  },
  {
    question: 'Can I come alone for a retreat near Delhi?',
    answer:
      'Yes. Solo travellers commonly choose retreats near Delhi because the short travel time makes the first retreat experience easier. Chakrata works well for solo guests who want quiet forest time, while Rishikesh works well for those who prefer a more structured yoga and meditation environment. Small-group and private options can both be planned depending on comfort level.',
  },
  {
    question: 'Can transport be arranged from Delhi NCR?',
    answer:
      'Transport can usually be coordinated through a private car, shared cab, or train-plus-taxi route depending on destination and group size. Rishikesh and Chakrata are practical for Friday evening departures from Delhi NCR. Sankri needs more travel time and works better for extended weekends or three-day holidays. Exact pickup timing depends on your location in Delhi, Gurgaon, Noida, or surrounding NCR areas.',
  },
  {
    question: 'Which retreat near Delhi is best for stress and burnout?',
    answer:
      'Chakrata is often the strongest option for stress and burnout because it offers forest silence, cooler air, low tourist density, and a slower rhythm within six to seven hours of Delhi. Rishikesh is better if you want guided yoga, pranayama, and riverside meditation with more spiritual structure. Sankri is best when you have more time and want deeper wilderness and digital detox.',
  },
  {
    question: 'Which retreat near Delhi is best for couples?',
    answer:
      'Chakrata and Rishikesh both work well for couples, but the right choice depends on the mood you want. Chakrata is better for quiet time, forest walks, slow conversation, and a low-stimulation reset. Rishikesh is better for couples who want yoga, riverside practice, cafes, ashram energy, and a more active spiritual atmosphere. Private retreat planning can keep the experience calm and personal.',
  },
  {
    question: 'Do retreats near Delhi include yoga and meditation?',
    answer:
      'Most retreat formats can include yoga and meditation, but the intensity depends on your intention. A gentle weekend reset may include morning yoga, breathwork, guided meditation, nature walks, and evening reflection. A deeper yoga retreat can include two structured practice sessions per day, pranayama, philosophy, and facilitated group integration.',
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
    images.moments.meditation,
    images.moments.walking,
    images.moments.tea,
    images.himalayanRetreats.yogaHimalayan,
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
          <p style={{ lineHeight: 1.8, marginBottom: '1.25rem', color: '#4b5563' }}>
            Travel time is the first decision point for a weekend retreat from Delhi. Here are realistic Friday-evening drive windows, not ideal-condition estimates.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              marginBottom: '1.25rem',
            }}
          >
            <div
              style={{
                padding: '1.1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '14px',
                backgroundColor: '#ffffff',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
              }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 300, color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                5–6 hrs
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.35rem' }}>Rishikesh</h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.65, color: '#4b5563', margin: 0 }}>
                Fastest Himalayan option from Delhi. Best when you want structured yoga, riverside meditation, and maximum retreat time.
              </p>
            </div>

            <div
              style={{
                padding: '1.1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '14px',
                backgroundColor: '#ffffff',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
              }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 300, color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                6–7 hrs
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.35rem' }}>Chakrata</h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.65, color: '#4b5563', margin: 0 }}>
                A quieter forest-ridge escape beyond Dehradun. Best for silence, lower tourist density, and a deeper nervous-system reset.
              </p>
            </div>

            <div
              style={{
                padding: '1.1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '14px',
                backgroundColor: '#ffffff',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
              }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 300, color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                8–9 hrs
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.35rem' }}>Sankri</h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.65, color: '#4b5563', margin: 0 }}>
                Best for extended weekends and three-day holidays. The longer road brings true wilderness, deeper quiet, and digital detox.
              </p>
            </div>
          </div>

          <div
            style={{
              padding: '1rem 1.1rem',
              borderRadius: '14px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e5e7eb',
            }}
          >
            <p style={{ lineHeight: 1.75, margin: 0, color: '#374151', fontSize: '0.95rem' }}>
              Travel works by private car, shared cab, or train plus taxi. Rishikesh and Chakrata can also use the Delhi–Dehradun Shatabdi route, followed by a road transfer.
            </p>
          </div>
        </section>
        {/* ── BEST DESTINATIONS ─────────────────────────────────────── */}
        <section
          style={{
            marginBottom: '6.5rem',
            paddingTop: '4.25rem',
            borderTop: '1px solid #eef2f7',
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.65rem, 3vw, 2.15rem)', fontWeight: 300, marginBottom: '0.75rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              Best Retreat Destinations Near Delhi
            </h2>
            <p style={{ lineHeight: 1.8, margin: 0, color: '#4b5563', maxWidth: '44rem' }}>
              Proximity matters, but the right retreat also depends on the atmosphere you need: forest silence, riverside practice, or deeper wilderness.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '1.25rem' }}>
            <article
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
                gap: '1.25rem',
                alignItems: 'stretch',
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '18px',
                backgroundColor: '#ffffff',
                boxShadow: '0 12px 34px rgba(15, 23, 42, 0.055)',
              }}
            >
              <div style={{ position: 'relative', minHeight: '240px', borderRadius: '14px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                <Image
                  src={images.locations.chakrata.src}
                  alt={images.locations.chakrata.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '0.25rem 0.25rem 0.25rem 0' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <span style={{ padding: '0.35rem 0.65rem', borderRadius: '999px', backgroundColor: '#ecfdf5', color: '#065f46', fontSize: '0.74rem', fontWeight: 600 }}>
                    6–7 hours
                  </span>
                  <span style={{ padding: '0.35rem 0.65rem', borderRadius: '999px', backgroundColor: '#f8fafc', color: '#334155', fontSize: '0.74rem', fontWeight: 500 }}>
                    Quiet forest reset
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>
                  <Link href="/retreats/chakrata" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Chakrata — Quiet Mountain Escape
                  </Link>
                </h3>
                <p style={{ lineHeight: 1.75, color: '#374151', marginBottom: '0.85rem', fontSize: '0.95rem' }}>
                  Chakrata is the strongest near-Delhi choice for silence, deodar forests, and low-stimulation recovery. It works especially well for professionals who want a genuine disconnect without committing to a remote expedition.
                </p>
                <p style={{ lineHeight: 1.75, color: '#4b5563', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  Best for: first-time retreat travellers, forest walks, breathwork, and two-night resets that still feel spacious.
                </p>
                <Link href="/retreats/chakrata" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.92rem' }}>
                  Explore Chakrata retreats →
                </Link>
              </div>
            </article>

            <article
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
                gap: '1.25rem',
                alignItems: 'stretch',
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '18px',
                backgroundColor: '#ffffff',
                boxShadow: '0 12px 34px rgba(15, 23, 42, 0.055)',
              }}
            >
              <div style={{ position: 'relative', minHeight: '240px', borderRadius: '14px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                <Image
                  src={images.locations.rishikesh.src}
                  alt={images.locations.rishikesh.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '0.25rem 0.25rem 0.25rem 0' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <span style={{ padding: '0.35rem 0.65rem', borderRadius: '999px', backgroundColor: '#eff6ff', color: '#1d4ed8', fontSize: '0.74rem', fontWeight: 600 }}>
                    5–6 hours
                  </span>
                  <span style={{ padding: '0.35rem 0.65rem', borderRadius: '999px', backgroundColor: '#f8fafc', color: '#334155', fontSize: '0.74rem', fontWeight: 500 }}>
                    Riverside yoga hub
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>
                  <Link href="/retreats/rishikesh" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Rishikesh — Fastest Yoga Weekend
                  </Link>
                </h3>
                <p style={{ lineHeight: 1.75, color: '#374151', marginBottom: '0.85rem', fontSize: '0.95rem' }}>
                  Rishikesh is the quickest Himalayan retreat option from Delhi, with established yoga teachers, riverside meditation, and a spiritual atmosphere that gives short weekends more structure.
                </p>
                <p style={{ lineHeight: 1.75, color: '#4b5563', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  Best for: guided yoga, meditation practice, Ganga-side stillness, and travellers who want the shortest road time.
                </p>
                <Link href="/retreats/rishikesh" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.92rem' }}>
                  Explore Rishikesh retreats →
                </Link>
              </div>
            </article>

            <article
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
                gap: '1.25rem',
                alignItems: 'stretch',
                padding: '1rem',
                border: '1px solid #e5e7eb',
                borderRadius: '18px',
                backgroundColor: '#ffffff',
                boxShadow: '0 12px 34px rgba(15, 23, 42, 0.055)',
              }}
            >
              <div style={{ position: 'relative', minHeight: '240px', borderRadius: '14px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                <Image
                  src={images.locations.sankri.src}
                  alt={images.locations.sankri.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '0.25rem 0.25rem 0.25rem 0' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <span style={{ padding: '0.35rem 0.65rem', borderRadius: '999px', backgroundColor: '#f5f3ff', color: '#6d28d9', fontSize: '0.74rem', fontWeight: 600 }}>
                    8–9 hours
                  </span>
                  <span style={{ padding: '0.35rem 0.65rem', borderRadius: '999px', backgroundColor: '#f8fafc', color: '#334155', fontSize: '0.74rem', fontWeight: 500 }}>
                    Deeper wilderness
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>
                  <Link href="/retreats/sankri" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Sankri — Extended Weekend Wilderness
                  </Link>
                </h3>
                <p style={{ lineHeight: 1.75, color: '#374151', marginBottom: '0.85rem', fontSize: '0.95rem' }}>
                  Sankri sits deeper in the Himalayas and works best when you have a longer weekend. The extra travel rewards you with pine valleys, glacial rivers, and true digital disconnection.
                </p>
                <p style={{ lineHeight: 1.75, color: '#4b5563', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  Best for: extended weekends, slow travel, wilderness immersion, and guests who want to feel far from city life.
                </p>
                <Link href="/retreats/sankri" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.92rem' }}>
                  Explore Sankri retreats →
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* ── WHO SHOULD CHOOSE ────────────────────────────────────── */}
        <section
          style={{
            marginBottom: '6.5rem',
            paddingTop: '4.25rem',
            borderTop: '1px solid #eef2f7',
          }}
        >
          <div style={{ marginBottom: '1.4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.55rem, 2.8vw, 2rem)', fontWeight: 300, marginBottom: '0.65rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              Who Should Choose a Retreat Near Delhi
            </h2>
            <p style={{ lineHeight: 1.8, margin: 0, color: '#4b5563', maxWidth: '43rem' }}>
              These retreats are built for people who need a real reset, but cannot disappear for a full week.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            {[
              {
                label: 'Corporate professionals',
                detail: 'For decision fatigue, screen overload, and accumulated city stress.',
                note: 'Friday departure. Sunday return. No annual leave required.',
              },
              {
                label: 'Startup founders',
                detail: 'For always-on minds that need a clear boundary between work and rest.',
                note: 'A structured weekend container creates separation willpower cannot.',
              },
              {
                label: 'Couples needing a reset',
                detail: 'For shared time without resort noise, tourist crowds, or city distractions.',
                note: 'Mountain silence creates space for conversation and reconnection.',
              },
              {
                label: 'First-time retreat participants',
                detail: 'For people who want the lowest-commitment entry point into retreat travel.',
                note: 'Two nights in Chakrata or Rishikesh is enough to understand the format.',
              },
            ].map((item, index) => (
              <article
                key={item.label}
                style={{
                  padding: '1.35rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                  boxShadow: '0 10px 28px rgba(15, 23, 42, 0.045)',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(15, 118, 110, 0.09)',
                    color: 'var(--color-primary)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    marginBottom: '0.85rem',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, marginBottom: '0.55rem', letterSpacing: '-0.01em' }}>
                  {item.label}
                </h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: '#374151', marginBottom: '0.7rem' }}>
                  {item.detail}
                </p>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: '#667085', margin: 0 }}>
                  {item.note}
                </p>
              </article>
            ))}
          </div>

          <div
            style={{
              padding: '1rem 1.1rem',
              border: '1px solid rgba(15, 118, 110, 0.16)',
              borderRadius: '14px',
              backgroundColor: 'rgba(240, 253, 250, 0.55)',
              color: '#374151',
              lineHeight: 1.75,
              fontSize: '0.92rem',
            }}
          >
            Have more than a weekend? See our{' '}
            <Link href="/retreats/weekend-himalayan-retreats" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
              weekend Himalayan retreats
            </Link>{' '}
            guide for the full two-to-three-day format across all locations.
          </div>
        </section>

        {/* ── WHAT A 2–3 DAY RETREAT LOOKS LIKE ─────────────────────── */}
        <section
          style={{
            marginBottom: '6.5rem',
            paddingTop: '4.25rem',
            borderTop: '1px solid #eef2f7',
          }}
        >
          <div style={{ marginBottom: '1.4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.55rem, 2.8vw, 2rem)', fontWeight: 300, marginBottom: '0.65rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              What a 2–3 Day Retreat Near Delhi Looks Like
            </h2>
            <p style={{ lineHeight: 1.8, margin: 0, color: '#4b5563', maxWidth: '44rem' }}>
              A short retreat works because the rhythm is simple: arrive, immerse, integrate, and return before Monday.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '1.15rem', marginBottom: '1rem' }}>
            {[
              {
                day: 'Friday evening',
                title: 'Arrival and settling',
                body: 'Depart Delhi after work and arrive between 10 PM and midnight depending on your destination. Herbal tea, room orientation, and a short grounding exercise mark the transition from travel mode to retreat space.',
              },
              {
                day: 'Saturday',
                title: 'Full immersion day',
                body: 'The core day includes meditation or gentle yoga, breathwork, forest immersion, an afternoon workshop, meals timed around rest, and an evening integration circle. Screens stay off so the nervous system can actually downshift.',
              },
              {
                day: 'Sunday',
                title: 'Closing and return',
                body: 'A final morning practice and closing circle anchor the experience. Breakfast and late-morning departure allow a comfortable return to Delhi by evening.',
              },
            ].map((item, index) => (
              <article
                key={item.day}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '72px 1fr',
                  gap: '1rem',
                  alignItems: 'start',
                  padding: '1.25rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 28px rgba(15, 23, 42, 0.045)',
                }}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(15, 118, 110, 0.09)',
                    color: 'var(--color-primary)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                  }}
                >
                  {index + 1}
                </div>
                <div>
                  <div style={{ fontSize: '0.76rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#667085', fontWeight: 600, marginBottom: '0.35rem' }}>
                    {item.day}
                  </div>
                  <h3 style={{ fontSize: '1.08rem', fontWeight: 650, marginBottom: '0.45rem', letterSpacing: '-0.01em' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.94rem', lineHeight: 1.75, color: '#374151', margin: 0 }}>
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div
            style={{
              padding: '1rem 1.1rem',
              border: '1px solid rgba(15, 118, 110, 0.16)',
              borderRadius: '14px',
              backgroundColor: 'rgba(240, 253, 250, 0.55)',
              color: '#374151',
              lineHeight: 1.75,
              fontSize: '0.92rem',
            }}
          >
            Not sure whether to choose a short or longer format? Read our comparison of{' '}
            <Link href="/blog/3-day-vs-5-day-himalayan-retreat" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
              three-day versus five-day retreat formats
            </Link>.
          </div>
        </section>

        {/* ── WHAT YOUR RETREAT CAN INCLUDE ─────────────────────────── */}
        <section
          style={{
            marginBottom: '6.5rem',
            paddingTop: '4.25rem',
            borderTop: '1px solid #eef2f7',
          }}
        >
          <div style={{ marginBottom: '1.4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.55rem, 2.8vw, 2rem)', fontWeight: 300, marginBottom: '0.65rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              What Your Weekend Retreat Can Include
            </h2>
            <p style={{ lineHeight: 1.8, margin: 0, color: '#4b5563', maxWidth: '44rem' }}>
              Every retreat is planned around your dates, destination, group size, and intention — but these are the core elements most Delhi NCR travellers ask for.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.15rem',
            }}
          >
            {[
              {
                icon: 'ॐ',
                title: 'Guided yoga & meditation',
                body: 'Beginner-friendly sessions focused on breath, stillness, mobility, and nervous-system recovery.',
              },
              {
                icon: '◌',
                title: 'Breathwork or pranayama',
                body: 'Simple guided practices to release accumulated stress and settle the body after city life.',
              },
              {
                icon: '↟',
                title: 'Forest or riverside walks',
                body: 'Slow nature immersion in Chakrata forests, Rishikesh riverside spaces, or Sankri mountain trails.',
              },
              {
                icon: '⌂',
                title: 'Curated mountain stay',
                body: 'Simple, comfortable properties chosen for quiet, access, views, and retreat-friendly surroundings.',
              },
              {
                icon: '✦',
                title: 'Local vegetarian meals',
                body: 'Fresh, seasonal meals designed to support rest, lightness, and the rhythm of the retreat.',
              },
              {
                icon: '◍',
                title: 'Evening reflection circle',
                body: 'Gentle integration time for journaling, sharing, silence, or guided reflection after the day.',
              },
              {
                icon: '→',
                title: 'Delhi travel coordination',
                body: 'Help with private car, shared cab, train-plus-taxi options, and practical Friday departure timing.',
              },
              {
                icon: '✓',
                title: 'Custom retreat planning',
                body: 'Choose a private, couple, small-group, corporate, yoga, meditation, or digital-detox format.',
              },
            ].map((item) => (
              <article
                key={item.title}
                style={{
                  padding: '1.3rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 28px rgba(15, 23, 42, 0.045)',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(15, 118, 110, 0.09)',
                    color: 'var(--color-primary)',
                    fontSize: '1rem',
                    fontWeight: 650,
                    marginBottom: '0.85rem',
                  }}
                >
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ── BEST TIME ────────────────────────────────────────────── */}
        <section
          style={{
            marginBottom: '6.5rem',
            paddingTop: '4.25rem',
            borderTop: '1px solid #eef2f7',
          }}
        >
          <div style={{ marginBottom: '1.4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.55rem, 2.8vw, 2rem)', fontWeight: 300, marginBottom: '0.65rem', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              Best Time for Retreats Near Delhi
            </h2>
            <p style={{ lineHeight: 1.8, margin: 0, color: '#4b5563', maxWidth: '44rem' }}>
              The best month depends on whether you want clear skies, cooler air, monsoon greenery, or deep winter quiet.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.15rem',
            }}
          >
            {[
              {
                season: 'February–April',
                title: 'Spring reset',
                body: 'Clear weather, comfortable yoga conditions, and fresh forest energy after winter.',
              },
              {
                season: 'May–June',
                title: 'Escape Delhi heat',
                body: 'Good for cooler mountain air, early morning practice, and short summer wellness breaks.',
              },
              {
                season: 'July–September',
                title: 'Monsoon greenery',
                body: 'Best for slow retreats and lush landscapes. Road conditions should be checked before travel.',
              },
              {
                season: 'October–November',
                title: 'Peak retreat weather',
                body: 'Crisp air, clearer views, and comfortable days make this one of the strongest booking windows.',
              },
              {
                season: 'December–January',
                title: 'Winter calm',
                body: 'Quiet stays, cold nights, and a slower rhythm. Chakrata and Sankri can feel especially still.',
              },
            ].map((item) => (
              <article
                key={item.season}
                style={{
                  padding: '1.3rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 28px rgba(15, 23, 42, 0.045)',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(15, 118, 110, 0.09)',
                    color: 'var(--color-primary)',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    marginBottom: '0.85rem',
                  }}
                >
                  {item.season}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 650, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
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
