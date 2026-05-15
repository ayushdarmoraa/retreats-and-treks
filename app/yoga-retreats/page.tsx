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
import ReviewCard from '@/components/reviews/ReviewCard';

const PAGE = getExperiencePage('yoga-retreats')!;
const PATH = '/yoga-retreats';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return {
    title: 'Yoga Retreats in the Himalayas | Retreats And Treks',
    description:
      'Himalayan yoga retreats in Rishikesh, Zanskar, and Sankri. Small-group asana, pranayama, meditation, experienced teachers, and 3–10 day programs.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Yoga Retreats in the Himalayas — Asana, Pranayama & Mountain Practice',
      description:
        'Himalayan yoga retreats with experienced teachers. Small groups, real practice, stunning mountain settings.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Yoga Retreats in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Do I need to be flexible or experienced to join a yoga retreat?',
    answer:
      'No. Our retreats welcome all levels, from complete beginners to advanced practitioners. Teachers adapt sessions to each participant. The Himalayas strip away the performance pressure of studio yoga — here, practice is about presence, not perfection.',
  },
  {
    question: 'What style of yoga is taught at Himalayan retreats?',
    answer:
      'Primarily Hatha and gentle Vinyasa, with elements of Iyengar alignment and Pranayama (breathwork). In Rishikesh, traditional Ashtanga and Kundalini may be offered. The emphasis is always on breath awareness and embodied presence rather than athletic achievement.',
  },
  {
    question: 'How does altitude affect yoga practice?',
    answer:
      'At 2,000–3,500 metres, every breath is conscious. Reduced oxygen naturally deepens pranayama practice and slows the tendency toward autopilot. Poses require more presence. The altitude transforms yoga from exercise into genuine practice.',
  },
  {
    question: 'What is included in the retreat price?',
    answer:
      'All yoga sessions (typically 2 per day), accommodation, three meals daily, guided meditation, and any planned excursions. Specific inclusions vary by location and duration — detailed breakdowns are provided after inquiry.',
  },
  {
    question: 'Can I combine yoga with trekking?',
    answer:
      'Yes. Sankri specializes in trek-and-yoga combinations. Walk through Himalayan forests by day, practice asana at camp by evening. The physical exertion of trekking and the stillness of yoga create a powerful cycle of effort and release.',
  },
  {
    question: 'How long should a yoga retreat be?',
    answer:
      'Three days provides a meaningful reset. Five to seven days allows the body to release chronic tension patterns and the nervous system to recalibrate. Ten days is transformational. If this is your first retreat, five days is the recommended sweet spot.',
  },
];

const PRACTICE_ELEMENTS = [
  {
    title: 'Morning Asana',
    description: 'Wake with the mountains. Practice as light arrives over the peaks. The body opens differently at altitude — more slowly, more honestly.',
    time: '6:00 – 7:30 AM',
  },
  {
    title: 'Pranayama & Breathwork',
    description: 'At altitude, every breath matters. Pranayama techniques tailored to the mountain environment deepen awareness and calm the nervous system.',
    time: '7:30 – 8:00 AM',
  },
  {
    title: 'Free Time & Nature',
    description: 'Afternoons are unstructured. Walk in the forest. Read. Rest. Let the practice integrate without forcing it.',
    time: '2:00 – 4:30 PM',
  },
  {
    title: 'Evening Practice',
    description: 'Restorative yoga as the mountains darken. Gentle holds, supported poses, and guided relaxation. The day closes with stillness.',
    time: '5:00 – 6:15 PM',
  },
];

const LOCATIONS = [
  {
    name: 'Rishikesh',
    id: 'rishikesh',
    tagline: 'The Yoga Capital',
    description: 'Where yoga lives in India. The energy of the Ganges, living ashram traditions, and experienced teachers with lineage. The most established setting for practice.',
    bestFor: 'Spiritual lineage, teacher access, tradition',
    altitude: '372m',
    image: '/Images/location/rishikesh.webp',
  },
  {
    name: 'Zanskar',
    id: 'zanskar',
    tagline: 'Yoga at Altitude',
    description: 'At 3,500 metres, every breath is conscious. Every pose demands presence. The altitude strips away autopilot and returns you to your own body.',
    bestFor: 'Experienced practitioners, altitude challenge',
    altitude: '3,500m',
    image: '/Images/location/zanskar.webp',
  },
  {
    name: 'Sankri',
    id: 'sankri',
    tagline: 'Mountain Yoga & Trekking',
    description: 'A high-altitude basecamp surrounded by peaks and forests. Yoga integrates with trekking and mountain movement for a complete body-mind experience.',
    bestFor: 'Movement integration, trek + yoga',
    altitude: '1,920m',
    image: '/Images/location/sankri.webp',
  },
];

export default function YogaRetreatsPage() {
  const { reviewSchemas, aggregateSchema } = getReviewSchemasForPage(PAGE);
  const allReviews = PAGE.retreatServiceSlugs.flatMap((slug) => getReviewsForSlug(slug));
  const topReviews = allReviews.filter((r) => r.ratingValue >= 4).slice(0, 3);
  const upcomingEvents = getUpcomingEvents()
    .filter((e) => e.experienceSlug === PAGE.slug)
    .slice(0, 3);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Yoga Retreats', url: buildCanonicalUrl(PATH) },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH}>
      <style>{`
        .yog-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }
        .yog-wide { max-width: 72rem; margin: 0 auto; padding: 0 2rem; }
        .yog-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .yog-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); flex-shrink: 0; }
        .yog-eyebrow-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase; color: #374151; font-weight: 500; }
        .yog-section-title { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200; letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2rem; }
        .yog-section-title span { color: #374151; }
        .yog-body-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.92rem; line-height: 1.85; color: #555; font-weight: 300; margin: 0; }

        .yog-hero { width: 100vw; margin-left: calc(-50vw + 50%); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; min-height: 82vh; text-align: center; padding-top: 68px; }
        .yog-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.85) 100%); }

        .yog-info-strip { display: flex; justify-content: center; gap: 2.5rem; flex-wrap: wrap; }
        .yog-info-item { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }

        .yog-loc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; }
        .yog-loc-card { position: relative; height: 340px; border-radius: 10px; overflow: hidden; text-decoration: none; color: #fff; display: flex; align-items: flex-end; transition: transform 0.3s, box-shadow 0.3s; }
        .yog-loc-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.15); }
        .yog-loc-card-content { position: relative; z-index: 2; padding: 1.75rem; width: 100%; }

        .yog-benefit-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; }
        .yog-benefit-card { background: #fff; border: 1px solid #eef0ee; border-radius: 8px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.03); transition: border-color 0.2s, box-shadow 0.2s; }
        .yog-benefit-card:hover { border-color: rgba(15,118,110,0.25); box-shadow: 0 4px 16px rgba(0,0,0,0.06); }

        .yog-cta-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 2.25rem; background: var(--color-primary); color: #fff; text-decoration: none; font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.06em; border-radius: 100px; transition: background 0.2s, transform 0.2s; }
        .yog-cta-btn:hover { background: #0d9e95; transform: translateY(-2px); }
        .yog-cta-outline { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.7rem 1.8rem; border: 1px solid rgba(15,118,110,0.3); color: var(--color-primary); text-decoration: none; font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em; border-radius: 100px; transition: all 0.2s; }
        .yog-cta-outline:hover { border-color: var(--color-primary); background: rgba(15,118,110,0.04); }

        .yog-faq-item { border-bottom: 1px solid #eef0ee; padding: 1.5rem 0; }
        .yog-faq-item:last-child { border-bottom: none; }

        @media (max-width: 640px) { .yog-who-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }

        .yog-prog-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .yog-prog-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; display: flex; flex-direction: column; }
        .yog-prog-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); border-color: rgba(15,118,110,0.3); }
        .yog-prog-status { font-size: 0.55rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; padding: 3px 8px; border-radius: 3px; white-space: nowrap; }
        .yog-prog-open { background: #ecfdf5; color: #065f46; }
        .yog-prog-filling { background: #fef3c7; color: #92400e; }
        .yog-prog-last { background: #fee2e2; color: #991b1b; }

        .yog-trust-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 768px) { .yog-trust-grid { grid-template-columns: 1fr; } }
        .yog-trust-item { text-align: center; padding: 2rem 1.5rem; border: 1px solid #e5e7eb; border-radius: 10px; background: #fff; transition: border-color 0.2s; }
        .yog-trust-item:hover { border-color: rgba(15,118,110,0.25); }

        .yog-funnel-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        @media (max-width: 768px) { .yog-funnel-grid { grid-template-columns: 1fr; } }
        .yog-funnel-card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; padding: 1.75rem 1.5rem; text-decoration: none; display: flex; flex-direction: column; gap: 0.6rem; align-items: center; text-align: center; transition: background 0.25s, border-color 0.25s, transform 0.25s; }
        .yog-funnel-card:hover { background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.3); transform: translateY(-3px); }
      `}</style>

      {reviewSchemas.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, ...reviewSchemas, ...(aggregateSchema ? [aggregateSchema] : [])]) }} />
      )}
      {reviewSchemas.length === 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />
      )}

      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Retreats', href: '/retreats' }, { name: 'Yoga Retreats' }]} />

      {/* ═══ HERO ═══ */}
      <section className="yog-hero">
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/experience-hubs/yoga-hero.webp" alt="Yoga retreat in the Himalayas — warrior pose on a mountain deck at sunrise" fetchPriority="high" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div className="yog-hero-overlay" />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '52rem', margin: '0 auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.5)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>Yoga & Movement</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.5)', display: 'inline-block' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 200, letterSpacing: '-0.035em', color: '#ffffff', margin: '0 0 1rem', lineHeight: 1.05, textShadow: '0 2px 32px rgba(0,0,0,0.7)' }}>
            Yoga Retreats in the Himalayas
          </h1>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.82)', fontWeight: 300, lineHeight: 1.75, maxWidth: '38rem', margin: '0 0 2rem' }}>
            Where altitude changes your breath, mountain air changes your nervous system, and practice becomes presence. Not yoga tourism — genuine practice in environments where the land participates.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', marginBottom: '2rem' }}>
            {['All Levels', 'Experienced Teachers', '3–10 Days', 'Max 12 Participants'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)', borderRadius: '4px', padding: '0.4rem 0.85rem' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <Link href="/contact" className="yog-cta-btn" style={{ padding: '1rem 2.5rem', fontSize: '0.82rem' }}>Find Your Yoga Retreat →</Link>
            <a href="#locations" className="yog-cta-outline" style={{ borderColor: 'rgba(255,255,255,0.35)', color: 'rgba(255,255,255,0.9)', padding: '0.9rem 2rem', fontSize: '0.78rem' }}>Explore Locations ↓</a>
          </div>
        </div>
      </section>

      {/* ═══ INFO STRIP ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#0a1f1c', padding: '2rem 0' }}>
        <div className="yog-wide">
          <div className="yog-info-strip">
            {[
              { label: 'Locations', value: '3 Mountain Settings' },
              { label: 'Group Size', value: 'Max 12 People' },
              { label: 'Practice', value: 'Hatha · Vinyasa · Pranayama' },
              { label: 'Experience', value: 'Beginners Welcome' },
            ].map((item) => (
              <div key={item.label} className="yog-info-item">
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', color: '#ffffff', fontWeight: 300 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT IS A YOGA RETREAT ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="yog-inner">
          <div className="yog-eyebrow"><span className="yog-eyebrow-line" /><span className="yog-eyebrow-text">Understanding Yoga Retreats</span></div>
          <h2 className="yog-section-title">What is a <span>yoga retreat</span>?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center' }} className="yog-who-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p className="yog-body-text">A yoga retreat is not a holiday with yoga classes added. It is a deliberate container — morning practice as light arrives, evening practice as the mountains darken, and the space between filled with silence, nature, and your own breath.</p>
              <p className="yog-body-text">In the Himalayas, yoga carries a different weight. The altitude changes your breath. The mountain air changes your nervous system. The absence of urban noise changes what you hear inside your own body. Practice here is not performance — it is presence.</p>
              <p className="yog-body-text">Our yoga retreats honour this difference. Small groups (maximum 12), experienced teachers who prioritise awareness over alignment, and environments where the land participates in the work.</p>
            </div>
            <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '380px' }}>
              <Image src="/Images/experience-hubs/yoga-group.png" alt="Small group yoga practice on a mountain platform in the Himalayas" fill loading="lazy" quality={55} sizes="(max-width: 640px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY HIMALAYAN YOGA IS DIFFERENT ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="yog-inner">
          <div className="yog-eyebrow"><span className="yog-eyebrow-line" /><span className="yog-eyebrow-text">Why the Himalayas</span></div>
          <h2 className="yog-section-title">Why <span>Himalayan yoga</span> is different</h2>
          <p className="yog-body-text" style={{ marginBottom: '2.5rem' }}>The Himalayas are not a backdrop for yoga — they are a participant. The altitude, the quiet, the temperature, the light — all shape what happens on the mat.</p>
          <div className="yog-benefit-grid">
            {[
              { title: 'Altitude Deepens Breath', text: 'At elevation, every inhalation is deliberate. Pranayama becomes real — not a technique performed, but a necessity felt. The breath stops being abstract.' },
              { title: 'Mountain Silence', text: 'Without traffic, notifications, or studio playlists, you hear your body. The sounds of practice — breath, movement, heartbeat — become the soundtrack.' },
              { title: 'Natural Alignment', text: 'Cold mountain mornings slow you down. The body opens differently at altitude — more slowly, more honestly. There is no rushing a sun salutation at 2,000 metres.' },
              { title: 'Living Tradition', text: 'In Rishikesh, yoga is not imported fitness — it is the daily practice of a city that has breathed it for centuries. The teachers have lineage, not just certification.' },
            ].map((item) => (
              <div key={item.title} className="yog-benefit-card">
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 600, color: '#111', margin: '0 0 0.6rem' }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', lineHeight: 1.7, color: '#666', fontWeight: 300, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VISUAL BREAK ═══ */}
      <figure style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', height: '300px', overflow: 'hidden', margin: 0, padding: 0 }}>
        <img src="/Images/whyhimalaya/environment.webp" alt="Himalayan mountain environment — yoga retreat landscape" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
        <figcaption style={{ position: 'absolute', bottom: '1.5rem', left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', fontWeight: 300, letterSpacing: '0.03em', fontStyle: 'italic' }}>Morning practice as light arrives over the Himalayan peaks</figcaption>
      </figure>

      {/* ═══ A DAY AT THE RETREAT ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="yog-inner">
          <div className="yog-eyebrow"><span className="yog-eyebrow-line" /><span className="yog-eyebrow-text">The Experience</span></div>
          <h2 className="yog-section-title">What a day <span>looks like</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {PRACTICE_ELEMENTS.map((phase, idx, arr) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '6.5rem 2rem 1fr', gap: '0 1rem' }}>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.7rem', fontWeight: 500, color: 'var(--color-primary)', textAlign: 'right', paddingTop: '0.15rem' }}>{phase.time}</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff', border: '2px solid var(--color-primary)', marginTop: '0.28rem', zIndex: 1 }} />
                  {idx < arr.length - 1 && <span style={{ width: 1, flex: 1, background: 'linear-gradient(to bottom, rgba(15,118,110,0.3), rgba(15,118,110,0.05))', marginTop: 4, minHeight: '1.5rem' }} />}
                </div>
                <div style={{ paddingBottom: idx < arr.length - 1 ? '2rem' : 0 }}>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 500, color: '#222', margin: '0 0 0.3rem' }}>{phase.title}</p>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', lineHeight: 1.75, color: '#666', fontWeight: 300, margin: 0 }}>{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHO THIS IS FOR ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="yog-inner">
          <div className="yog-eyebrow"><span className="yog-eyebrow-line" /><span className="yog-eyebrow-text">Is This For You</span></div>
          <h2 className="yog-section-title">Who yoga retreats are <span>for</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="yog-who-grid">
            <div>
              <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', margin: '0 0 1.25rem' }}>✓ Perfect if you are</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {['A yoga practitioner seeking deeper connection with practice', 'Someone wanting to reconnect body and breath in nature', 'Looking for a physically grounded retreat, not purely meditative', 'Curious about yoga as a path to presence, not performance', 'Wanting to combine yoga with trekking in the mountains', 'An experienced yogi seeking teachers with lineage and depth'].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', lineHeight: 1.6, color: '#444', fontWeight: 300, display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.15rem', fontSize: '0.5rem', color: '#fff', fontWeight: 700 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', margin: '0 0 1.25rem' }}>— Not the right fit if you want</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {['A fitness-focused power yoga boot camp', 'Resort-style yoga with poolside relaxation', 'Teacher training certification', 'Large group classes (50+ participants)'].map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', lineHeight: 1.6, color: '#777', fontWeight: 300, display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.15rem', fontSize: '0.6rem', color: '#999' }}>—</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LOCATIONS ═══ */}
      <section id="locations" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="yog-wide">
          <div className="yog-eyebrow" style={{ justifyContent: 'center' }}><span className="yog-eyebrow-line" /><span className="yog-eyebrow-text">Where We Practice</span><span className="yog-eyebrow-line" /></div>
          <h2 className="yog-section-title" style={{ textAlign: 'center' }}>Three Himalayan <span>settings</span> for yoga</h2>
          <p className="yog-body-text" style={{ textAlign: 'center', maxWidth: '38rem', margin: '0 auto 3rem' }}>Each location shapes practice differently. Choose based on what your body needs: tradition, altitude challenge, or mountain movement.</p>
          <div className="yog-loc-grid">
            {LOCATIONS.map((loc) => (
              <Link key={loc.id} href={`/retreats/${loc.id}`} className="yog-loc-card">
                <Image src={loc.image} alt={`${loc.name} — yoga retreat location`} fill loading="lazy" quality={55} sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)' }} />
                <div className="yog-loc-card-content">
                  <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>{loc.altitude} altitude</span>
                  <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.15rem', fontWeight: 400, color: '#fff', margin: '0 0 0.5rem' }}>{loc.name} — {loc.tagline}</h3>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', fontWeight: 300, lineHeight: 1.6, margin: '0 0 0.75rem' }}>{loc.description}</p>
                  <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>Best for: {loc.bestFor}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GUIDED DECISION FUNNEL ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#0a1f1c', padding: '4.5rem 0' }}>
        <div className="yog-wide">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 200, color: '#ffffff', margin: '0 0 0.6rem' }}>Three ways to find your yoga retreat</h3>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: '36rem', margin: '0 auto', lineHeight: 1.7 }}>Choose the path that feels right for where you are right now.</p>
          </div>
          <div className="yog-funnel-grid">
            <Link href="/contact" className="yog-funnel-card">
              <span style={{ fontSize: '1.6rem' }}>💬</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.92rem', fontWeight: 500, color: '#ffffff' }}>Get Matched</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.6 }}>Tell us about your practice — we&apos;ll recommend the right retreat, location, and teacher. Free, no pressure.</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', marginTop: 'auto', paddingTop: '0.5rem' }}>Talk to a planner →</span>
            </Link>
            <Link href="/retreats/yoga-retreat-rishikesh" className="yog-funnel-card">
              <span style={{ fontSize: '1.6rem' }}>📋</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.92rem', fontWeight: 500, color: '#ffffff' }}>Compare Locations</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.6 }}>Rishikesh for tradition, Zanskar for altitude, Sankri for trek-yoga. See what fits your body.</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', marginTop: 'auto', paddingTop: '0.5rem' }}>Explore Rishikesh →</span>
            </Link>
            <Link href="/retreats-for-beginners" className="yog-funnel-card">
              <span style={{ fontSize: '1.6rem' }}>🌱</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.92rem', fontWeight: 500, color: '#ffffff' }}>First Yoga Retreat?</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.6 }}>No experience needed. Our guide covers what to expect, what to bring, and the gentlest entry points.</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', marginTop: 'auto', paddingTop: '0.5rem' }}>Beginner&apos;s guide →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      {topReviews.length > 0 && (
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
          <div className="yog-wide">
            <div className="yog-eyebrow" style={{ justifyContent: 'center' }}><span className="yog-eyebrow-line" /><span className="yog-eyebrow-text">What Participants Say</span><span className="yog-eyebrow-line" /></div>
            <h2 className="yog-section-title" style={{ textAlign: 'center' }}>Real <span>retreat experiences</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 24rem), 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              {topReviews.map((review) => (<ReviewCard key={`${review.participantName}-${review.datePublished}`} review={review} />))}
            </div>
            <div style={{ textAlign: 'center' }}><Link href="/reviews" style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 300, color: 'var(--color-primary)' }}>Read more experiences →</Link></div>
          </div>
        </section>
      )}

      {/* ═══ FEATURED PROGRAMS ═══ */}
      {upcomingEvents.length > 0 && (
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
          <div className="yog-wide">
            <div className="yog-eyebrow" style={{ justifyContent: 'center' }}><span className="yog-eyebrow-line" /><span className="yog-eyebrow-text">Scheduled Retreats</span><span className="yog-eyebrow-line" /></div>
            <h2 className="yog-section-title" style={{ textAlign: 'center' }}>Upcoming <span>yoga programs</span></h2>
            <p className="yog-body-text" style={{ textAlign: 'center', maxWidth: '36rem', margin: '0 auto 3rem' }}>Confirmed departures with fixed dates, pricing, and limited seats.</p>
            <div className="yog-prog-grid">
              {upcomingEvents.map((ev) => {
                const sc = ev.status === 'filling-fast' ? 'yog-prog-filling' : ev.status === 'last-few' ? 'yog-prog-last' : 'yog-prog-open';
                const sl = ev.status === 'filling-fast' ? 'Filling Fast' : ev.status === 'last-few' ? 'Last Few Seats' : 'Open';
                return (
                  <Link key={ev.slug} href={`/${ev.slug}`} className="yog-prog-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ padding: '1.5rem 1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#999', fontWeight: 500, display: 'block', marginBottom: '0.35rem' }}>{ev.locationName} · {ev.month} {ev.year}</span>
                        <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.05rem', fontWeight: 500, color: '#111', margin: 0 }}>{ev.label}</h3>
                      </div>
                      <span className={`yog-prog-status ${sc}`}>{sl}</span>
                    </div>
                    <div style={{ padding: '1rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', gap: '1.5rem', margin: '1rem 0', flexWrap: 'wrap' }}>
                        <div><span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: '0.15rem' }}>Duration</span><span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 400, color: '#222' }}>{ev.durationDays} Days</span></div>
                        <div><span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: '0.15rem' }}>Price</span><span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 500, color: '#111' }}>₹{ev.price.toLocaleString('en-IN')}</span></div>
                        <div><span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#999', display: 'block', marginBottom: '0.15rem' }}>Group</span><span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 400, color: '#222' }}>Max {ev.groupSize}</span></div>
                      </div>
                      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.8rem', color: '#777', fontWeight: 300, lineHeight: 1.7, margin: '0 0 0.75rem' }}>{ev.dateRange} · All-inclusive</p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {ev.included.slice(0, 4).map((inc, idx) => (<li key={idx} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.72rem', color: '#888', fontWeight: 300, display: 'flex', gap: '0.4rem', alignItems: 'center' }}><span style={{ color: 'var(--color-primary)', fontSize: '0.65rem' }}>✓</span> {inc}</li>))}
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
            <div style={{ textAlign: 'center', marginTop: '2rem' }}><Link href="/contact" className="yog-cta-btn">Don&apos;t See Your Dates? Request a Custom Retreat →</Link></div>
          </div>
        </section>
      )}

      {/* ═══ INTERNAL LINKS ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="yog-inner">
          <div className="yog-eyebrow"><span className="yog-eyebrow-line" /><span className="yog-eyebrow-text">Explore Further</span></div>
          <h2 className="yog-section-title">Related <span>guides</span></h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/retreats/yoga-retreat-rishikesh" className="yog-cta-outline">Yoga Retreat in Rishikesh →</Link>
            <Link href="/retreats/yoga-retreat-uttarakhand" className="yog-cta-outline">Yoga Retreats in Uttarakhand →</Link>
            <Link href="/5-day-yoga-retreat" className="yog-cta-outline">5-Day Yoga Retreat →</Link>
            <Link href="/meditation-retreats" className="yog-cta-outline">Meditation Retreats →</Link>
            <Link href="/retreats-for-beginners" className="yog-cta-outline">Retreats for Beginners →</Link>
          </div>
        </div>
      </section>

      {/* ═══ TRUST & DIFFERENTIATION ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="yog-wide">
          <div className="yog-eyebrow" style={{ justifyContent: 'center' }}><span className="yog-eyebrow-line" /><span className="yog-eyebrow-text">Why Us</span><span className="yog-eyebrow-line" /></div>
          <h2 className="yog-section-title" style={{ textAlign: 'center' }}>What makes our retreats <span>different</span></h2>
          <div className="yog-trust-grid">
            {[
              { num: '12', label: 'Max Group Size', text: 'Personal attention from experienced teachers. Your alignment gets corrected. Your practice gets seen.' },
              { num: '0', label: 'Resort Yoga', text: 'No spa menus, no poolside classes, no tourist programming. Real practice in non-commercial Himalayan environments.' },
              { num: '100%', label: 'Teacher Lineage', text: 'Every teacher has lived practice lineage — not just 200-hour certification. In Rishikesh, the tradition speaks through the teaching.' },
            ].map((item) => (
              <div key={item.label} className="yog-trust-item">
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '2rem', fontWeight: 200, color: 'var(--color-primary)', display: 'block', marginBottom: '0.25rem' }}>{item.num}</span>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>{item.label}</span>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', lineHeight: 1.7, color: '#666', fontWeight: 300, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="yog-inner">
          <div className="yog-eyebrow"><span className="yog-eyebrow-line" /><span className="yog-eyebrow-text">Common Questions</span></div>
          <h2 className="yog-section-title">Frequently asked <span>questions</span></h2>
          <div>
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="yog-faq-item">
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.92rem', fontWeight: 500, color: '#111', margin: '0 0 0.6rem' }}>{faq.question}</h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', lineHeight: 1.8, color: '#666', fontWeight: 300, margin: 0 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', overflow: 'hidden', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/hero/himalayan-sunrise.webp" alt="Himalayan sunrise — yoga retreat setting" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.85)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '44rem', padding: '4rem 2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 200, color: '#ffffff', margin: '0 0 1rem' }}>Begin Your Yoga Retreat</h2>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', fontWeight: 300, lineHeight: 1.75, margin: '0 0 2rem' }}>The Himalayas are not a backdrop for yoga — they are a participant. Tell us about your practice and we&apos;ll recommend the right setting.</p>
          <Link href="/contact" className="yog-cta-btn" style={{ fontSize: '0.85rem', padding: '1rem 2.5rem' }}>Plan My Yoga Retreat →</Link>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {['Small groups (max 12)', 'All levels welcome', '3–10 day programs'].map((trust) => (
              <span key={trust} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400, letterSpacing: '0.05em' }}>{trust}</span>
            ))}
          </div>
        </div>
      </section>

    </TrackedPage>
  );
}
