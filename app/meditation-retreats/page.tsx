import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { getExperiencePage } from '@/config/experiencePages';
import { getReviewSchemasForPage } from '@/lib/reviewsSchema';
import { getReviewsForSlug } from '@/content/reviews';
import { getUpcomingEvents } from '@/config/retreatProgramEvents';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import ReviewCard from '@/components/reviews/ReviewCard';

const PAGE = getExperiencePage('meditation-retreats')!;
const PATH = '/meditation-retreats';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return {
    title: 'Meditation Retreats in the Himalayas | Retreats And Treks',
    description:
      'Guided meditation retreats in Zanskar, Chakrata, and Rishikesh. Small groups, deep silence, experienced teachers, and 3–10 day Himalayan programs.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Meditation Retreats in the Himalayas — Guided Silence & Deep Practice',
      description:
        'Guided meditation retreats in quiet Himalayan locations. Small groups, deep silence, experienced teachers. Find the right setting for your practice.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Meditation Retreats in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Do I need prior meditation experience for a Himalayan retreat?',
    answer:
      'No. Our Chakrata and Rishikesh retreats are designed for all experience levels, with guided instruction from the first session. Zanskar retreats are recommended for those with some prior practice due to the altitude and remoteness.',
  },
  {
    question: 'How long should a meditation retreat be?',
    answer:
      'Three days is a meaningful reset — enough to experience genuine silence. Five to seven days allows the mind to settle beneath habitual patterns. Ten days is standard for Vipassana-style retreats and where the deepest shifts occur. If in doubt, five days is the best balance.',
  },
  {
    question: 'What if I can\'t sit still for long periods?',
    answer:
      'Retreats include walking meditation, gentle movement, and rest periods alongside seated practice. The schedule accommodates the body\'s needs. Many people who cannot sit still in daily life find that the retreat environment changes this completely.',
  },
  {
    question: 'Is a meditation retreat religious?',
    answer:
      'No. While some of our locations carry Buddhist or Hindu heritage, the retreats themselves are non-denominational. The practices are rooted in contemplative tradition but do not require any religious affiliation or belief.',
  },
  {
    question: 'What is the difference between a meditation retreat and a Vipassana course?',
    answer:
      'Vipassana courses follow a fixed 10-day format with a single technique. Our Himalayan meditation retreats offer more flexibility — multiple techniques, smaller groups (max 12 vs 50–100), nature-integrated practice, and personalised guidance. Both are powerful; the choice depends on whether you prefer structure or adaptability.',
  },
  {
    question: 'What should I bring to a meditation retreat?',
    answer:
      'Comfortable clothing for meditation, warm layers (temperatures drop at altitude), a journal, and any personal medication. Specific packing lists are provided after booking. Leave devices at home or expect them to be stored during the retreat.',
  },
];

const RETREAT_TYPES = [
  {
    title: 'Silent Meditation Retreat',
    description: 'Noble silence throughout — no conversation, no devices, no reading. The deepest form of retreat for those ready to meet their own mind without distraction.',
    duration: '3–10 Days',
    image: '/Images/himalayanretreats/silentretreat.webp',
    href: '/silent-retreats',
  },
  {
    title: 'Guided Meditation Retreat',
    description: 'Regular instruction, dharma talks, and teacher interaction. Silence maintained during practice, broken during teaching. Ideal for beginners.',
    duration: '3–7 Days',
    image: '/Images/services/meditation.webp',
    href: '/retreats-for-beginners',
  },
  {
    title: 'Trek & Meditation Retreat',
    description: 'Multi-day Himalayan trekking combined with meditation sessions at camp. Physical exertion becomes preparation for stillness.',
    duration: '5–10 Days',
    image: '/Images/himalayanretreats/retreaktrek.webp',
    href: '/meditation-retreat-and-trek',
  },
];

const LOCATIONS = [
  {
    name: 'Zanskar',
    id: 'zanskar',
    tagline: 'Monastery Silence at 3,500m',
    description: 'The deepest meditation environment we offer. Century-old Buddhist monasteries, no phone signal, reduced oxygen that naturally quiets the thinking mind.',
    bestFor: 'Deep practitioners, radical disconnection',
    altitude: '3,500m',
    image: '/Images/location/zanskar.webp',
  },
  {
    name: 'Chakrata',
    id: 'chakrata',
    tagline: 'Forest Silence at 2,000m',
    description: 'Dense Himalayan forest with no tourist noise. Accessible from Dehradun yet genuinely remote. The most gentle entry point for first-time retreatants.',
    bestFor: 'Beginners, accessible depth',
    altitude: '2,000m',
    image: '/Images/location/chakrata.webp',
  },
  {
    name: 'Rishikesh',
    id: 'rishikesh',
    tagline: 'Ganges Tradition',
    description: 'India\'s yoga capital. Living lineage of meditation practice, the energy of the Ganges, and accumulated spiritual weight of centuries.',
    bestFor: 'Spiritual lineage, teacher access',
    altitude: '372m',
    image: '/Images/location/rishikesh.webp',
  },
];

export default function MeditationRetreatsPage() {
  const { reviewSchemas, aggregateSchema } = getReviewSchemasForPage(PAGE);
  const allReviews = PAGE.retreatServiceSlugs.flatMap((slug) => getReviewsForSlug(slug));
  const topReviews = allReviews.filter((r) => r.ratingValue >= 4).slice(0, 3);
  const upcomingEvents = getUpcomingEvents()
    .filter((e) => e.experienceSlug === PAGE.slug)
    .slice(0, 3);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Meditation Retreats', url: buildCanonicalUrl(PATH) },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH}>
      <style>{`
        .med-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }
        .med-wide { max-width: 72rem; margin: 0 auto; padding: 0 2rem; }
        .med-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .med-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); flex-shrink: 0; }
        .med-eyebrow-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase; color: #374151; font-weight: 500; }
        .med-section-title { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200; letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2rem; }
        .med-section-title span { color: #374151; }
        .med-body-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.92rem; line-height: 1.85; color: #555; font-weight: 300; margin: 0; }

        /* Hero */
        .med-hero { width: 100vw; margin-left: calc(-50vw + 50%); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; min-height: 82vh; text-align: center; padding-top: 68px; }
        .med-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.85) 100%); }

        /* Info Strip */
        .med-info-strip { display: flex; justify-content: center; gap: 2.5rem; flex-wrap: wrap; }
        .med-info-item { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }

        /* Type Cards */
        .med-type-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 960px) { .med-type-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 640px) { .med-type-grid { grid-template-columns: 1fr; } }
        .med-type-card {
          display: flex; flex-direction: column; text-decoration: none; color: inherit;
          background: #fff; border: 1px solid rgba(15,118,110,0.1); border-radius: 8px;
          overflow: hidden; transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .med-type-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,0,0,0.1); border-color: rgba(15,118,110,0.3); }
        .med-type-card-img { position: relative; height: 200px; overflow: hidden; }
        .med-type-card-img img { transition: transform 0.6s; }
        .med-type-card:hover .med-type-card-img img { transform: scale(1.05); }
        .med-type-card-body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }

        /* Location Cards */
        .med-loc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; }
        .med-loc-card {
          position: relative; height: 340px; border-radius: 10px; overflow: hidden;
          text-decoration: none; color: #fff; display: flex; align-items: flex-end;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .med-loc-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.15); }
        .med-loc-card-content { position: relative; z-index: 2; padding: 1.75rem; width: 100%; }

        /* Benefit Cards */
        .med-benefit-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; }
        .med-benefit-card {
          background: #fff; border: 1px solid #eef0ee; border-radius: 8px; padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03); transition: border-color 0.2s, box-shadow 0.2s;
        }
        .med-benefit-card:hover { border-color: rgba(15,118,110,0.25); box-shadow: 0 4px 16px rgba(0,0,0,0.06); }

        /* Testimonials */
        .med-test-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 768px) { .med-test-grid { grid-template-columns: 1fr; } }
        .med-test-card { background: #fff; border: 1px solid rgba(15,118,110,0.1); border-radius: 8px; padding: 2rem 1.75rem; display: flex; flex-direction: column; gap: 1rem; position: relative; overflow: hidden; transition: border-color 0.25s; }
        .med-test-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--color-primary); transform: scaleX(0); transform-origin: left; transition: transform 0.45s cubic-bezier(0.16,1,0.3,1); }
        .med-test-card:hover { border-color: rgba(15,118,110,0.25); }
        .med-test-card:hover::before { transform: scaleX(1); }

        /* CTA Buttons */
        .med-cta-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 2.25rem; background: var(--color-primary);
          color: #fff; text-decoration: none; font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.78rem; font-weight: 500; letter-spacing: 0.06em;
          border-radius: 100px; transition: background 0.2s, transform 0.2s;
        }
        .med-cta-btn:hover { background: #0d9e95; transform: translateY(-2px); }
        .med-cta-outline {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.7rem 1.8rem; border: 1px solid rgba(15,118,110,0.3);
          color: var(--color-primary); text-decoration: none; font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em;
          border-radius: 100px; transition: all 0.2s;
        }
        .med-cta-outline:hover { border-color: var(--color-primary); background: rgba(15,118,110,0.04); }

        /* FAQ */
        .med-faq-item { border-bottom: 1px solid #eef0ee; padding: 1.5rem 0; }
        .med-faq-item:last-child { border-bottom: none; }

        /* Who grid responsive */
        @media (max-width: 640px) { .med-who-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }

        /* Featured Program Cards (MONEY SECTION) */
        .med-prog-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .med-prog-card {
          background: #fff; border: 1px solid #e5e7eb; border-radius: 10px;
          overflow: hidden; transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
          display: flex; flex-direction: column;
        }
        .med-prog-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); border-color: rgba(15,118,110,0.3); }
        .med-prog-card-header { padding: 1.5rem 1.5rem 0; display: flex; justify-content: space-between; align-items: flex-start; }
        .med-prog-card-body { padding: 1rem 1.5rem 1.5rem; flex: 1; display: flex; flex-direction: column; }
        .med-prog-status { font-size: 0.55rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; padding: 3px 8px; border-radius: 3px; white-space: nowrap; }
        .med-prog-status-open { background: #ecfdf5; color: #065f46; }
        .med-prog-status-filling { background: #fef3c7; color: #92400e; }
        .med-prog-status-last { background: #fee2e2; color: #991b1b; }

        /* Decision Cards */
        .med-dec-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        @media (max-width: 768px) { .med-dec-grid { grid-template-columns: 1fr; } }
        .med-dec-card {
          background: #fff; border: 1px solid #e5e7eb; border-radius: 10px;
          padding: 2rem 1.75rem; display: flex; flex-direction: column; gap: 0.75rem;
          text-decoration: none; color: inherit; transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
        }
        .med-dec-card:hover { transform: translateY(-4px); border-color: rgba(15,118,110,0.3); box-shadow: 0 8px 32px rgba(0,0,0,0.06); }

        /* Trust block */
        .med-trust-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 768px) { .med-trust-grid { grid-template-columns: 1fr; } }
        .med-trust-item {
          text-align: center; padding: 2rem 1.5rem;
          border: 1px solid #e5e7eb; border-radius: 10px;
          background: #fff; transition: border-color 0.2s;
        }
        .med-trust-item:hover { border-color: rgba(15,118,110,0.25); }

        /* Guided funnel */
        .med-funnel-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        @media (max-width: 768px) { .med-funnel-grid { grid-template-columns: 1fr; } }
        .med-funnel-card {
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px; padding: 1.75rem 1.5rem; text-decoration: none;
          display: flex; flex-direction: column; gap: 0.6rem; align-items: center; text-align: center;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }
        .med-funnel-card:hover { background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.3); transform: translateY(-3px); }
      `}</style>

      {reviewSchemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              breadcrumbSchema,
              faqSchema,
              ...reviewSchemas,
              ...(aggregateSchema ? [aggregateSchema] : []),
            ]),
          }}
        />
      )}

      {reviewSchemas.length === 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([breadcrumbSchema, faqSchema]),
          }}
        />
      )}

      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Retreats', href: '/retreats' }, { name: 'Meditation Retreats' }]} />

      {/* ═══════════════════════════════════════════
          SECTION 1 — CINEMATIC HERO
      ═══════════════════════════════════════════ */}
      <section className="med-hero">
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="/Images/experience-hubs/meditation-hero.webp" width={1024} height={1024}
            alt="Meditation retreats in the Himalayas — a person meditating on a mountain ridge at golden hour"
            fetchPriority="high"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }}
          />
          <div className="med-hero-overlay" />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '52rem', margin: '0 auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.5)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>Meditation & Silence</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.5)', display: 'inline-block' }} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 200,
            letterSpacing: '-0.035em', color: '#ffffff', margin: '0 0 1rem',
            lineHeight: 1.05, textShadow: '0 2px 32px rgba(0,0,0,0.7)',
          }}>
            Meditation Retreats in the Himalayas
          </h1>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '1rem', color: 'rgba(255,255,255,0.82)',
            fontWeight: 300, lineHeight: 1.75, maxWidth: '38rem', margin: '0 0 2rem',
          }}>
            Where altitude quiets the mind, forest absorbs distraction, and centuries of practice hold the space. Small groups. Experienced guidance. 3–10 day programs.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', marginBottom: '2rem' }}>
            {['Guided Practice', 'Max 12 Participants', '3–10 Days', 'All Levels'].map((tag) => (
              <span key={tag} style={{
                fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', fontWeight: 500,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)',
                color: 'rgba(255,255,255,0.85)', borderRadius: '4px', padding: '0.4rem 0.85rem',
              }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <Link href="/contact" className="med-cta-btn" style={{ padding: '1rem 2.5rem', fontSize: '0.82rem' }}>Find Your Retreat →</Link>
            <a href="#retreat-types" className="med-cta-outline" style={{ borderColor: 'rgba(255,255,255,0.35)', color: 'rgba(255,255,255,0.9)', padding: '0.9rem 2rem', fontSize: '0.78rem' }}>Explore Formats ↓</a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INFO STRIP
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#0a1f1c', padding: '2rem 0' }}>
        <div className="med-wide">
          <div className="med-info-strip">
            {[
              { label: 'Locations', value: '3 Himalayan Settings' },
              { label: 'Group Size', value: 'Max 12 People' },
              { label: 'Duration', value: '3 – 10 Days' },
              { label: 'Experience', value: 'All Levels Welcome' },
            ].map((item) => (
              <div key={item.label} className="med-info-item">
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', color: '#ffffff', fontWeight: 300 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — WHAT IS A MEDITATION RETREAT (SEO)
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Understanding Meditation Retreats</span>
          </div>
          <h2 className="med-section-title">What is a <span>meditation retreat</span>?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center' }} className="med-who-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p className="med-body-text">
                A meditation retreat is a structured period — typically three to ten days — spent in deliberate silence, daily practice, and guided instruction, away from the routines of ordinary life. Unlike a meditation class, a retreat creates a continuous container where practice deepens through sustained immersion.
              </p>
              <p className="med-body-text">
                In the Himalayas, meditation retreats carry a different weight. At 2,000–3,500 metres, reduced oxygen naturally slows the thinking mind. Dense forests absorb distraction. The contemplative tradition stretching back millennia holds the space before you arrive.
              </p>
              <p className="med-body-text">
                What surprises most first-time retreatants is how much happens beneath the surface. The first day is often restless. By the third day, something shifts — habitual thought patterns weaken, sensory awareness sharpens, and a deeper quality of attention emerges.
              </p>
            </div>
            <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '380px' }}>
              <Image src="/Images/experience-hubs/meditation-group.png" alt="Small group meditation in a Himalayan forest clearing" width={1200} height={675} loading="lazy" quality={55} sizes="(max-width: 640px) 100vw, 50vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — WHY HIMALAYAS (DIFFERENTIATION)
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Why the Himalayas</span>
          </div>
          <h2 className="med-section-title">Why <span>Himalayan meditation</span> is different</h2>
          <p className="med-body-text" style={{ marginBottom: '2.5rem' }}>
            The Himalayas have been the geography of contemplative practice for thousands of years — not because of marketing, but because the environment itself supports the work of meditation in ways that cannot be replicated elsewhere.
          </p>
          <div className="med-benefit-grid">
            {[
              { title: 'Altitude & Awareness', text: 'At 2,000–3,500m, reduced oxygen naturally slows cognitive processing. The thinking mind — planning, worrying, narrating — becomes quieter with less effort.' },
              { title: 'Acoustic Isolation', text: 'Mountain valleys and dense forest absorb sound. The silence is not absence of noise — it is a positive quality, thick and alive, that supports practice.' },
              { title: 'Contemplative Tradition', text: 'From Zanskar\'s Buddhist monasteries to Rishikesh\'s yoga ashrams, the infrastructure and teachers for meditation are deeply established across millennia.' },
              { title: 'Separation from Habit', text: 'Remote mountain locations physically remove you from habitual cues — notifications, commutes, obligations. This strategic disruption allows new patterns to emerge.' },
            ].map((item) => (
              <div key={item.title} className="med-benefit-card">
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 600, color: '#111', margin: '0 0 0.6rem', letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', lineHeight: 1.7, color: '#666', fontWeight: 300, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VISUAL BREAK 1
      ═══════════════════════════════════════════ */}
      <figure style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', height: '300px', overflow: 'hidden', margin: 0, padding: 0 }}>
        <img src="/Images/whyhimalaya/nature.webp" width={800} height={476} alt="Himalayan forest — natural setting for meditation retreats" loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
        <figcaption style={{ position: 'absolute', bottom: '1.5rem', left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', fontWeight: 300, letterSpacing: '0.03em', fontStyle: 'italic' }}>
          The silence of Himalayan forests is not empty — it is alive
        </figcaption>
      </figure>

      {/* ═══════════════════════════════════════════
          SECTION 4 — TYPES OF MEDITATION RETREATS
      ═══════════════════════════════════════════ */}
      <section id="retreat-types" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="med-wide">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Retreat Formats</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-section-title" style={{ textAlign: 'center' }}>Types of <span>meditation retreats</span></h2>
          <p className="med-body-text" style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto 3rem' }}>
            Not all meditation retreats are the same. Choose the format that matches your experience level and intention.
          </p>
          <div className="med-type-grid">
            {RETREAT_TYPES.map((type) => (
              <Link key={type.title} href={type.href} className="med-type-card">
                <div className="med-type-card-img">
                  <Image src={type.image} alt={type.title} width={800} height={533} loading="lazy" quality={55} sizes="(max-width: 640px) 100vw, 33vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
                  <span style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.52rem',
                    letterSpacing: '0.24em', textTransform: 'uppercase', color: '#fff',
                    background: 'var(--color-primary)', padding: '4px 10px', borderRadius: '2px', fontWeight: 600,
                  }}>{type.duration}</span>
                </div>
                <div className="med-type-card-body">
                  <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.05rem', fontWeight: 500, color: '#111', margin: '0 0 0.6rem', letterSpacing: '-0.015em' }}>
                    {type.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', color: '#666', fontWeight: 300, lineHeight: 1.7, margin: 0 }}>
                    {type.description}
                  </p>
                  <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                    <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
                      Learn More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — WHO THIS IS FOR
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Is This For You</span>
          </div>
          <h2 className="med-section-title">Who meditation retreats are <span>for</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="med-who-grid">
            <div>
              <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', margin: '0 0 1.25rem' }}>
                ✓ Perfect if you are
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  'Seeking to establish or deepen a meditation practice',
                  'Recovering from overstimulation, decision fatigue, or mental overwhelm',
                  'An experienced practitioner wanting extended silence in a supported setting',
                  'Curious about contemplative practice in a mountain environment',
                  'Looking for a structured break that goes deeper than a holiday',
                  'Ready for a genuine encounter with your own mind',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', lineHeight: 1.6, color: '#444', fontWeight: 300, display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.15rem', fontSize: '0.5rem', color: '#fff', fontWeight: 700 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', margin: '0 0 1.25rem' }}>
                — Not the right fit if you want
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  'A spa or wellness resort experience',
                  'Entertainment-driven holiday with meditation as add-on',
                  'Large group meditation with 50+ participants',
                  'Quick-fix mindfulness without commitment',
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', lineHeight: 1.6, color: '#777', fontWeight: 300, display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.15rem', fontSize: '0.6rem', color: '#999' }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — LOCATIONS
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="med-wide">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Where We Offer This</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-section-title" style={{ textAlign: 'center' }}>Three Himalayan <span>settings</span> for meditation</h2>
          <p className="med-body-text" style={{ textAlign: 'center', maxWidth: '38rem', margin: '0 auto 3rem' }}>
            Each location offers different conditions for practice. Choose based on your experience level, desired depth, and relationship with remoteness.
          </p>
          <div className="med-loc-grid">
            {LOCATIONS.map((loc) => (
              <Link key={loc.id} href={`/retreats/${loc.id}`} className="med-loc-card">
                <Image src={loc.image} alt={`${loc.name} — meditation retreat location`} width={800} height={462} loading="lazy" quality={55} sizes="(max-width: 640px) 100vw, 33vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)' }} />
                <div className="med-loc-card-content">
                  <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>
                    {loc.altitude} altitude
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.15rem', fontWeight: 400, color: '#fff', margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>
                    {loc.name} — {loc.tagline}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', fontWeight: 300, lineHeight: 1.6, margin: '0 0 0.75rem' }}>
                    {loc.description}
                  </p>
                  <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
                    Best for: {loc.bestFor}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GUIDED DECISION FUNNEL ("Decision UX" — Critical for Conversion)
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#0a1f1c', padding: '4.5rem 0' }}>
        <div className="med-wide">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', justifyContent: 'center' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.25)', display: 'inline-block' }} />
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Not Sure Where to Start?</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.25)', display: 'inline-block' }} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 200, color: '#ffffff', margin: '0 0 0.6rem', letterSpacing: '-0.02em' }}>
              Three ways to find your retreat
            </h3>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: '36rem', margin: '0 auto', lineHeight: 1.7 }}>
              Choose the path that feels right for where you are right now.
            </p>
          </div>
          <div className="med-funnel-grid">
            <Link href="/contact" className="med-funnel-card">
              <span style={{ fontSize: '1.6rem' }}>💬</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.92rem', fontWeight: 500, color: '#ffffff' }}>Get Matched</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.6 }}>Tell us about yourself — we&apos;ll recommend the right retreat, location, and duration. Free, no pressure.</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', marginTop: 'auto', paddingTop: '0.5rem' }}>Talk to a planner →</span>
            </Link>
            <Link href="/how-to-choose-a-meditation-retreat" className="med-funnel-card">
              <span style={{ fontSize: '1.6rem' }}>📋</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.92rem', fontWeight: 500, color: '#ffffff' }}>Compare Options</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.6 }}>Read our detailed comparison guide — formats, locations, durations side by side. Decide at your own pace.</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', marginTop: 'auto', paddingTop: '0.5rem' }}>Read the guide →</span>
            </Link>
            <Link href="/retreats-for-beginners" className="med-funnel-card">
              <span style={{ fontSize: '1.6rem' }}>🌱</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.92rem', fontWeight: 500, color: '#ffffff' }}>First Retreat?</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.6 }}>Never done a retreat? Start here. Our beginner&apos;s guide removes objections and recommends the gentlest entry point.</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', marginTop: 'auto', paddingTop: '0.5rem' }}>Beginner&apos;s guide →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7 — A SAMPLE RETREAT DAY
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Experience</span>
          </div>
          <h2 className="med-section-title">What a day <span>looks like</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { time: '5:30 AM', label: 'Wake', text: 'No alarm needed — the rhythm establishes itself within two days.' },
              { time: '6:00 AM', label: 'Morning Sitting', text: '45 minutes of seated meditation. The mind is fresh, the forest is waking.' },
              { time: '7:00 AM', label: 'Walking Meditation', text: 'Slow, deliberate movement — often outdoors among trees or along a mountain path.' },
              { time: '7:30 AM', label: 'Breakfast', text: 'Simple food, eaten in silence, with attention.' },
              { time: '9:00 AM', label: 'Guided Practice', text: 'Instruction or dharma talk suited to participants\' experience levels. 60 minutes.' },
              { time: '12:00 PM', label: 'Lunch & Rest', text: 'The main meal. Followed by free time — sleep, journal, walk.' },
              { time: '3:00 PM', label: 'Afternoon Sitting', text: '45 minutes. The afternoon mind is softer, more spacious.' },
              { time: '6:00 PM', label: 'Evening Sitting', text: '45 minutes. The day settles into its final descent.' },
              { time: '7:00 PM', label: 'Dinner & Rest', text: 'Light dinner. Optional evening reflection or early rest.' },
            ].map((phase, idx, arr) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '5rem 2rem 1fr', gap: '0 1rem' }}>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.72rem', fontWeight: 500, color: 'var(--color-primary)', textAlign: 'right', paddingTop: '0.15rem' }}>{phase.time}</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff', border: '2px solid var(--color-primary)', marginTop: '0.28rem', zIndex: 1 }} />
                  {idx < arr.length - 1 && <span style={{ width: 1, flex: 1, background: 'linear-gradient(to bottom, rgba(15,118,110,0.3), rgba(15,118,110,0.05))', marginTop: 4, minHeight: '1.5rem' }} />}
                </div>
                <div style={{ paddingBottom: idx < arr.length - 1 ? '1.5rem' : 0 }}>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', fontWeight: 500, color: '#222', margin: '0 0 0.2rem' }}>{phase.label}</p>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', lineHeight: 1.7, color: '#666', fontWeight: 300, margin: 0 }}>{phase.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          VISUAL BREAK 2
      ═══════════════════════════════════════════ */}
      <figure style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', height: '300px', overflow: 'hidden', margin: 0, padding: 0 }}>
        <img src="/Images/experience-hubs/monastery.webp" width={1024} height={1024} alt="Ancient Buddhist monastery in a remote Himalayan valley — Zanskar meditation retreat" loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
        <figcaption style={{ position: 'absolute', bottom: '1.5rem', left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', fontWeight: 300, letterSpacing: '0.03em', fontStyle: 'italic' }}>
          Zanskar monasteries carry over a thousand years of contemplative practice
        </figcaption>
      </figure>

      {/* ═══════════════════════════════════════════
          SECTION 8 — BENEFITS
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Evidence-Based</span>
          </div>
          <h2 className="med-section-title">Benefits of a <span>meditation retreat</span></h2>
          <div className="med-benefit-grid">
            {[
              { title: 'Neurological Changes', text: 'Reduced default mode network activity — less mind-wandering, rumination, and self-referential thinking. Measurably lower cortisol after 7 days.' },
              { title: 'Stress Physiology', text: 'Breaks chronic stress cycles by removing environmental triggers. Nervous system shifts from sympathetic (fight/flight) to parasympathetic (rest/digest).' },
              { title: 'Attention & Clarity', text: 'Enhanced focused attention, reduced reactivity to distractions, and clearer relationship with thought patterns — persisting weeks to months post-retreat.' },
              { title: 'Emotional Regulation', text: 'Sitting with difficult emotions without acting on them builds capacity that transfers directly to daily life. Respond rather than react.' },
              { title: 'Perspective', text: 'Distance from daily urgencies reveals which concerns are real and which are habitual. This clarity of proportion is often the most valued benefit.' },
              { title: 'Sleep Quality', text: 'Extended meditation normalises circadian rhythm. Retreatants consistently report deeper, more restorative sleep that persists after returning home.' },
            ].map((item) => (
              <div key={item.title} className="med-benefit-card">
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 600, color: '#111', margin: '0 0 0.6rem' }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', lineHeight: 1.7, color: '#666', fontWeight: 300, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 9 — TESTIMONIALS
      ═══════════════════════════════════════════ */}
      {topReviews.length > 0 && (
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
          <div className="med-wide">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">What Participants Say</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-section-title" style={{ textAlign: 'center' }}>Real <span>retreat experiences</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 24rem), 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              {topReviews.map((review) => (
                <ReviewCard key={`${review.participantName}-${review.datePublished}`} review={review} />
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link href="/reviews" style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 300, color: 'var(--color-primary)' }}>
                Read more experiences →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SECTION 10 — FEATURED PROGRAMS (MONEY SECTION — Real Products)
      ═══════════════════════════════════════════ */}
      {upcomingEvents.length > 0 && (
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
          <div className="med-wide">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Scheduled Retreats</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-section-title" style={{ textAlign: 'center' }}>Upcoming <span>meditation programs</span></h2>
            <p className="med-body-text" style={{ textAlign: 'center', maxWidth: '36rem', margin: '0 auto 3rem' }}>
              These are confirmed departures with fixed dates, pricing, and limited seats. Book directly or reach out to discuss.
            </p>
            <div className="med-prog-grid">
              {upcomingEvents.map((ev) => {
                const statusClass = ev.status === 'filling-fast' ? 'med-prog-status-filling' : ev.status === 'last-few' ? 'med-prog-status-last' : 'med-prog-status-open';
                const statusLabel = ev.status === 'filling-fast' ? 'Filling Fast' : ev.status === 'last-few' ? 'Last Few Seats' : 'Open';
                return (
                  <Link key={ev.slug} href={`/${ev.slug}`} className="med-prog-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="med-prog-card-header">
                      <div>
                        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#999', fontWeight: 500, display: 'block', marginBottom: '0.35rem' }}>
                          {ev.locationName} · {ev.month} {ev.year}
                        </span>
                        <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.05rem', fontWeight: 500, color: '#111', margin: 0, letterSpacing: '-0.01em' }}>
                          {ev.label}
                        </h3>
                      </div>
                      <span className={`med-prog-status ${statusClass}`}>{statusLabel}</span>
                    </div>
                    <div className="med-prog-card-body">
                      <div style={{ display: 'flex', gap: '1.5rem', margin: '1rem 0', flexWrap: 'wrap' }}>
                        <div>
                          <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: '0.15rem' }}>Duration</span>
                          <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 400, color: '#222' }}>{ev.durationDays} Days</span>
                        </div>
                        <div>
                          <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: '0.15rem' }}>Price</span>
                          <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 500, color: '#111' }}>₹{ev.price.toLocaleString('en-IN')}</span>
                        </div>
                        <div>
                          <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: '0.15rem' }}>Group</span>
                          <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 400, color: '#222' }}>Max {ev.groupSize}</span>
                        </div>
                      </div>
                      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.8rem', color: '#777', fontWeight: 300, lineHeight: 1.7, margin: '0 0 0.75rem' }}>
                        {ev.dateRange} · All-inclusive
                      </p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {ev.included.slice(0, 4).map((inc, idx) => (
                          <li key={idx} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.72rem', color: '#888', fontWeight: 300, display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                            <span style={{ color: 'var(--color-primary)', fontSize: '0.65rem' }}>✓</span> {inc}
                          </li>
                        ))}
                      </ul>
                      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
                        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>View Details →</span>
                        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.72rem', fontWeight: 500, color: ev.seatsLeft <= 3 ? '#c92a2a' : '#6b7280' }}>{ev.seatsLeft} seats left</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link href="/contact" className="med-cta-btn">Don&apos;t See Your Dates? Request a Custom Retreat →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SECTION 11 — DECISION CARDS (How to Choose — Visual)
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="med-wide">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Decision Guide</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-section-title" style={{ textAlign: 'center' }}>Choose the retreat that <span>matches you</span></h2>
          <p className="med-body-text" style={{ textAlign: 'center', maxWidth: '36rem', margin: '0 auto 3rem' }}>
            The right retreat depends on where you are. Use these decision paths to find your match.
          </p>
          <div className="med-dec-grid">
            <Link href="/retreats-for-beginners" className="med-dec-card">
              <span style={{ fontSize: '1.5rem' }}>🌱</span>
              <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.95rem', fontWeight: 500, color: '#111', margin: 0 }}>I&apos;ve Never Done a Retreat</h3>
              <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', color: '#666', fontWeight: 300, lineHeight: 1.7, margin: 0 }}>Start with 3–5 days in Chakrata. Gentle forest setting, guided instruction, no extreme conditions. Our most accessible entry point.</p>
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #f3f3f3' }}>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>Beginner&apos;s Guide →</span>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.62rem', color: '#aaa' }}>From ₹14,000</span>
              </div>
            </Link>
            <Link href="/best-meditation-retreats-in-india" className="med-dec-card">
              <span style={{ fontSize: '1.5rem' }}>🧘</span>
              <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.95rem', fontWeight: 500, color: '#111', margin: 0 }}>I Want to Go Deeper</h3>
              <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', color: '#666', fontWeight: 300, lineHeight: 1.7, margin: 0 }}>5–7 days in Chakrata or Zanskar. Extended silence, structured practice, experienced teachers. For practitioners ready for sustained immersion.</p>
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #f3f3f3' }}>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>Compare Retreats →</span>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.62rem', color: '#aaa' }}>From ₹32,000</span>
              </div>
            </Link>
            <Link href="/how-to-choose-a-meditation-retreat" className="med-dec-card">
              <span style={{ fontSize: '1.5rem' }}>🏔️</span>
              <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.95rem', fontWeight: 500, color: '#111', margin: 0 }}>I Need Radical Disconnection</h3>
              <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', color: '#666', fontWeight: 300, lineHeight: 1.7, margin: 0 }}>7–10 days in Zanskar. Monastery setting, 3,500m, no phone signal. The most immersive meditation environment we offer.</p>
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #f3f3f3' }}>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>How to Choose →</span>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.62rem', color: '#aaa' }}>From ₹45,000</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 12 — RETREAT STORIES
      ═══════════════════════════════════════════ */}
      {PAGE.storyLinks && PAGE.storyLinks.length > 0 && (
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Retreat Stories</span>
            </div>
            <p className="med-body-text" style={{ marginBottom: '1.25rem' }}>First-person accounts from people who have done this retreat.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              {PAGE.storyLinks.map((story, i, arr) => (
                <Link key={story.href} href={story.href} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderBottom: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none',
                  textDecoration: 'none', background: '#ffffff',
                  fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, color: '#333333',
                }}>
                  <span>{story.label}</span>
                  <span style={{ color: '#374151', fontSize: '0.8rem' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          TRUST & DIFFERENTIATION BLOCK
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="med-wide">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Why Us</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-section-title" style={{ textAlign: 'center' }}>What makes our retreats <span>different</span></h2>
          <div className="med-trust-grid">
            {[
              { num: '12', label: 'Max Group Size', text: 'Not a meditation factory. Personal attention from experienced teachers. Your questions get answered. Your practice gets seen.' },
              { num: '0', label: 'Commercial Noise', text: 'No tourist traffic, no spa menus, no upsells. Non-commercial Himalayan locations chosen for silence and depth, not aesthetics or marketing.' },
              { num: '100%', label: 'Designed Retreats', text: 'Every retreat is designed — not packaged. Schedule, location, teacher, season — all chosen deliberately to serve the practice, not the business.' },
            ].map((item) => (
              <div key={item.label} className="med-trust-item">
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '2rem', fontWeight: 200, color: 'var(--color-primary)', display: 'block', marginBottom: '0.25rem', letterSpacing: '-0.03em' }}>{item.num}</span>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>{item.label}</span>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', lineHeight: 1.7, color: '#666', fontWeight: 300, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 13 — FAQ
      ═══════════════════════════════════════════ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Common Questions</span>
          </div>
          <h2 className="med-section-title">Frequently asked <span>questions</span></h2>
          <div>
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="med-faq-item">
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.92rem', fontWeight: 500, color: '#111', margin: '0 0 0.6rem' }}>
                  {faq.question}
                </h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', lineHeight: 1.8, color: '#666', fontWeight: 300, margin: 0 }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 14 — BOTTOM CTA
      ═══════════════════════════════════════════ */}
      <section style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        position: 'relative', overflow: 'hidden',
        minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/hero/valley-forest.webp" width={1400} height={788} alt="Himalayan valley — meditation retreat setting" loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.85)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '44rem', padding: '4rem 2rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 200,
            color: '#ffffff', margin: '0 0 1rem', letterSpacing: '-0.02em',
          }}>
            Begin Your Meditation Retreat
          </h2>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', fontWeight: 300, lineHeight: 1.75, margin: '0 0 2rem' }}>
            The right retreat depends on where you are — your experience, your intention, your schedule. Tell us and we&apos;ll recommend the right location and format.
          </p>
          <Link href="/contact" className="med-cta-btn" style={{ fontSize: '0.85rem', padding: '1rem 2.5rem' }}>
            Plan My Meditation Retreat →
          </Link>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {['Small groups (max 12)', 'All experience levels', '3–10 day programs'].map((trust) => (
              <span key={trust} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400, letterSpacing: '0.05em' }}>
                {trust}
              </span>
            ))}
          </div>
        </div>
      </section>

    </TrackedPage>
  );
}
