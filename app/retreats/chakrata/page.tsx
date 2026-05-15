import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { getUpcomingEvents } from '@/config/retreatProgramEvents';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';

const PATH = '/retreats/chakrata';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  return {
    title: 'Retreats & Treks in Chakrata | Retreats And Treks',
    description:
      'Chakrata retreats and treks in Himalayan deodar forest. Meditation, yoga, burnout recovery, weekend retreats, forest treks, and small groups near Dehradun.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Retreats & Treks in Chakrata — Forest Silence at 2,200m',
      description:
        'Himalayan forest retreats and treks in Chakrata. Meditation, burnout recovery, weekend escapes. Small groups, experienced facilitators.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Retreats & Treks in Chakrata'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How do I reach Chakrata?',
    answer:
      'Delhi → Dehradun (5.5 hours by train or 1 hour by flight). Dehradun → Chakrata (85 km, 3.5 hours by road). We handle Dehradun pickup and drop for all retreats. Self-driving is also possible — last fuel stop at Vikasnagar.',
  },
  {
    question: 'Is Chakrata good for a first retreat?',
    answer:
      'Yes — it is our most recommended location for first-timers. Low altitude (2,200m, no altitude sickness), gentle forest environment, close to Dehradun, and weekend retreat options starting at just 3 days. No prior meditation or yoga experience required.',
  },
  {
    question: 'What is the best time to visit Chakrata for a retreat?',
    answer:
      'September–October is ideal (post-monsoon clarity, crisp air). June–August monsoon season is best for deep introspection (rain creates a natural cocoon). March–May spring is great for beginners. November–February winter suits those wanting solitude and depth.',
  },
  {
    question: 'Can I combine a trek with a retreat in Chakrata?',
    answer:
      'Yes — this is one of Chakrata\'s biggest advantages. A 2-day weekend trek followed by a 3-day retreat is our most popular combination. Both operate from the same location, so no additional travel is needed.',
  },
  {
    question: 'How is Chakrata different from Rishikesh for a retreat?',
    answer:
      'Rishikesh is a town with tourist traffic, cafes, and noise — good for yoga studio culture. Chakrata is a forest cantonment with no commercial tourism — good for silence, recovery, and genuine disconnection. If you want quiet, choose Chakrata. If you want tradition and energy, choose Rishikesh.',
  },
  {
    question: 'Is there mobile signal in Chakrata?',
    answer:
      'BSNL has intermittent coverage. Jio and Airtel are unreliable. Wi-Fi is available at our retreat centres for emergencies, but we encourage digital disconnection. For some retreats (digital detox), devices are surrendered on arrival.',
  },
  {
    question: 'What is included in retreat pricing?',
    answer:
      'All-inclusive: accommodation, meals (vegetarian), facilitator fees, all practice sessions, local transport during the retreat, and Dehradun pickup/drop. No hidden costs. Only personal expenses (phone calls, souvenirs) are extra.',
  },
];

const RETREAT_TYPES = [
  { title: 'Meditation & Silence', desc: 'Structured seated practice, walking meditation, noble silence. For beginners and experienced practitioners.', link: '/meditation-retreats', img: '/Images/experience-hubs/meditation-hero.png', duration: '3–7 days', price: 'From ₹14,000' },
  { title: 'Burnout Recovery', desc: 'Somatic therapy, rest, nervous system regulation. For professionals who have been running on empty.', link: '/burnout-recovery-retreats', img: '/Images/location/chakrata.webp', duration: '5–7 days', price: 'From ₹28,000' },
  { title: 'Weekend Retreat', desc: 'Short reset in the forest. Ideal for first-timers. Leave Friday, return Sunday renewed.', link: '/retreats/chakrata/weekend-retreat-from-dehradun', img: '/Images/trek/region/chakraweekend.webp', duration: '2–3 days', price: 'From ₹14,000' },
  { title: 'Yoga & Movement', desc: 'Hatha, pranayama, and embodied practice in a forest setting. Not a fitness boot camp — a return to presence.', link: '/yoga-retreats', img: '/Images/experience-hubs/yoga-hero.png', duration: '3–7 days', price: 'From ₹18,000' },
];

const TREK_TYPES = [
  { title: 'Weekend Trek', desc: 'Forest trails, ridge campsites, 8 km. No experience needed. Dehradun pickup included.', link: '/treks/location/chakrata/weekend-trek', img: '/Images/trek/region/chakraweekend.webp', difficulty: 'Easy', duration: '2–3 days' },
  { title: 'Tiger Fall Trek', desc: '12 km to one of the highest waterfalls in the region. Best in monsoon when the cascade peaks.', link: '/treks/location/chakrata/tiger-fall-trek', img: '/Images/trek/region/tigerfall.webp', difficulty: 'Moderate', duration: '1 day' },
  { title: 'Budher Caves Trek', desc: '10 km through oak forest to ancient limestone caves. Trekking meets underground exploration.', link: '/treks/location/chakrata/budher-caves-trek', img: '/Images/trek/region/budher.webp', difficulty: 'Moderate', duration: '1 day' },
  { title: 'Guided Forest Treks', desc: 'Flexible 1–3 day itineraries with expert naturalists. Bird calls, ecology, viewpoints.', link: '/treks/location/chakrata/guided-treks', img: '/Images/trek/region/chakraguided.webp', difficulty: 'Easy–Moderate', duration: '1–3 days' },
];

const PLACES = [
  { name: 'Tiger Fall', type: 'Waterfall', desc: 'A 20-meter cascade hidden in the forest. In monsoon, it surges with life. In winter, the surrounding forest is most silent.', season: 'Best Jun–Oct', img: '/Images/trek/region/tigerfall.webp' },
  { name: 'Deoban Meadows', type: 'Meadow · 2,300m', desc: 'High meadows with views of distant snow peaks. Wildflowers in spring, crystalline air in autumn.', season: 'Apr–Oct', img: '/Images/trek/region/chakraguided.webp' },
  { name: 'Budher Caves', type: 'Ancient Caves', desc: 'Rock caves believed to be ancient meditation sites. The caves carry centuries of accumulated silence.', season: 'Year-round', img: '/Images/trek/region/budher.webp' },
];

export default function ChakrataHubPage() {
  const allUpcoming = getUpcomingEvents();
  const chakrataEvents = allUpcoming.filter((e) => e.locationId === 'chakrata');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Chakrata', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH}>
      <style>{`
        .ck-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }
        .ck-wide { max-width: 72rem; margin: 0 auto; padding: 0 2rem; }
        .ck-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .ck-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); flex-shrink: 0; }
        .ck-eyebrow-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase; color: #374151; font-weight: 500; }
        .ck-section-title { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200; letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2rem; }
        .ck-section-title span { color: #374151; }
        .ck-body-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.92rem; line-height: 1.85; color: #555; font-weight: 300; margin: 0; }

        /* Hero */
        .ck-hero { width: 100vw; margin-left: calc(-50vw + 50%); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; min-height: 82vh; text-align: center; padding-top: 68px; }
        .ck-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.85) 100%); }

        /* Experience Cards */
        .ck-exp-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; }
        .ck-exp-card {
          display: flex; flex-direction: column; text-decoration: none; color: inherit;
          background: #fff; border: 1px solid #e5e7eb; border-radius: 10px;
          overflow: hidden; transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .ck-exp-card:hover { transform: translateY(-5px); box-shadow: 0 14px 44px rgba(0,0,0,0.1); border-color: rgba(15,118,110,0.3); }
        .ck-exp-card-img { position: relative; height: 180px; overflow: hidden; }
        .ck-exp-card-img img { transition: transform 0.6s; }
        .ck-exp-card:hover .ck-exp-card-img img { transform: scale(1.06); }
        .ck-exp-card-body { padding: 1.25rem; flex: 1; display: flex; flex-direction: column; }

        /* Place Cards */
        .ck-place-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        @media (max-width: 768px) { .ck-place-grid { grid-template-columns: 1fr; } }
        .ck-place-card {
          position: relative; height: 340px; border-radius: 10px; overflow: hidden;
          text-decoration: none; color: #fff; display: flex; align-items: flex-end;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .ck-place-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.15); }

        /* Program Cards */
        .ck-prog-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .ck-prog-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; display: flex; flex-direction: column; text-decoration: none; color: inherit; }
        .ck-prog-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); border-color: rgba(15,118,110,0.3); }
        .ck-prog-status { font-size: 0.55rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; padding: 3px 8px; border-radius: 3px; white-space: nowrap; }
        .ck-prog-open { background: #ecfdf5; color: #065f46; }
        .ck-prog-filling { background: #fef3c7; color: #92400e; }
        .ck-prog-last { background: #fee2e2; color: #991b1b; }

        /* CTA Buttons */
        .ck-cta-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 2.25rem; background: var(--color-primary); color: #fff; text-decoration: none; font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.06em; border-radius: 100px; transition: background 0.2s, transform 0.2s; }
        .ck-cta-btn:hover { background: #0d9e95; transform: translateY(-2px); }
        .ck-cta-outline { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.7rem 1.8rem; border: 1px solid rgba(15,118,110,0.3); color: var(--color-primary); text-decoration: none; font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em; border-radius: 100px; transition: all 0.2s; }
        .ck-cta-outline:hover { border-color: var(--color-primary); background: rgba(15,118,110,0.04); }

        /* Trust block */
        .ck-trust-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        @media (max-width: 768px) { .ck-trust-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .ck-trust-grid { grid-template-columns: 1fr; } }
        .ck-trust-item { text-align: center; padding: 1.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 10px; background: #fff; transition: border-color 0.2s; }
        .ck-trust-item:hover { border-color: rgba(15,118,110,0.25); }

        /* Funnel */
        .ck-funnel-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        @media (max-width: 768px) { .ck-funnel-grid { grid-template-columns: 1fr; } }
        .ck-funnel-card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; padding: 1.75rem 1.5rem; text-decoration: none; display: flex; flex-direction: column; gap: 0.6rem; align-items: center; text-align: center; transition: background 0.25s, border-color 0.25s, transform 0.25s; }
        .ck-funnel-card:hover { background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.3); transform: translateY(-3px); }

        /* FAQ */
        .ck-faq-item { border-bottom: 1px solid #eef0ee; padding: 1.5rem 0; }
        .ck-faq-item:last-child { border-bottom: none; }

        /* Season pills */
        .ck-season-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        @media (max-width: 768px) { .ck-season-grid { grid-template-columns: repeat(2, 1fr); } }
        .ck-season-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 1.5rem; transition: border-color 0.2s; }
        .ck-season-card:hover { border-color: rgba(15,118,110,0.25); }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }} />

      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Retreats', href: '/retreats' }, { name: 'Chakrata' }]} />

      {/* ═══ SECTION 1 — CINEMATIC HERO ═══ */}
      <section className="ck-hero">
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/location/chakrata.webp" alt="Chakrata deodar forest and mountain ridges" fetchPriority="high" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div className="ck-hero-overlay" />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '52rem', margin: '0 auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.5)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>Himalayan Forest Destination</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.5)', display: 'inline-block' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 200, letterSpacing: '-0.035em', color: '#ffffff', margin: '0 0 1rem', lineHeight: 1.05, textShadow: '0 2px 32px rgba(0,0,0,0.7)' }}>
            Retreats & Treks in Chakrata
          </h1>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1rem', fontWeight: 300, lineHeight: 1.75, color: 'rgba(255,255,255,0.8)', margin: '0 0 1rem', maxWidth: '36rem' }}>
            Deodar forest at 2,200m. Three hours from Dehradun. No tourist traffic, no commercial noise — just forest silence and mountain air.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {['2,200m altitude', '3.5 hrs from Dehradun', 'Max 12 per group', '₹14,000–₹32,000'].map((t) => (
              <span key={t} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', fontWeight: 400, letterSpacing: '0.04em' }}>{t}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="#retreats" className="ck-cta-btn" style={{ background: '#ffffff', color: '#0a3d35', fontWeight: 600 }}>Find a Retreat ↓</Link>
            <Link href="#treks" className="ck-cta-btn" style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,0.4)' }}>Explore Treks ↓</Link>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2 — CHOOSE YOUR EXPERIENCE (DECISION ENGINE) ═══ */}
      <section id="retreats" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="ck-wide">
          <div className="ck-eyebrow" style={{ justifyContent: 'center' }}><span className="ck-eyebrow-line" /><span className="ck-eyebrow-text">Choose Your Experience</span><span className="ck-eyebrow-line" /></div>
          <h2 className="ck-section-title" style={{ textAlign: 'center' }}>Retreat or <span>trek?</span></h2>
          <p className="ck-body-text" style={{ textAlign: 'center', maxWidth: '38rem', margin: '0 auto 3rem' }}>
            Chakrata serves two kinds of journeys — inner work (retreats) and mountain movement (treks). Choose your path, or combine both.
          </p>

          {/* Retreat Cards */}
          <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#999', marginBottom: '1.25rem' }}>RETREATS</h3>
          <div className="ck-exp-grid" style={{ marginBottom: '3rem' }}>
            {RETREAT_TYPES.map((r) => (
              <Link key={r.title} href={r.link} className="ck-exp-card">
                <div className="ck-exp-card-img">
                  <img src={r.img} alt={`${r.title} retreat in Chakrata`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }} />
                </div>
                <div className="ck-exp-card-body">
                  <h4 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.95rem', fontWeight: 500, color: '#111', margin: '0 0 0.4rem' }}>{r.title}</h4>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.8rem', color: '#666', fontWeight: 300, lineHeight: 1.65, margin: '0 0 0.75rem', flex: 1 }}>{r.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f3f3', paddingTop: '0.75rem' }}>
                    <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.62rem', color: '#999' }}>{r.duration} · {r.price}</span>
                    <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>Learn More →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Trek Cards */}
          <h3 id="treks" style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#999', marginBottom: '1.25rem' }}>TREKS</h3>
          <div className="ck-exp-grid">
            {TREK_TYPES.map((t) => (
              <Link key={t.title} href={t.link} className="ck-exp-card">
                <div className="ck-exp-card-img">
                  <img src={t.img} alt={`${t.title} in Chakrata`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }} />
                </div>
                <div className="ck-exp-card-body">
                  <h4 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.95rem', fontWeight: 500, color: '#111', margin: '0 0 0.4rem' }}>{t.title}</h4>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.8rem', color: '#666', fontWeight: 300, lineHeight: 1.65, margin: '0 0 0.75rem', flex: 1 }}>{t.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f3f3', paddingTop: '0.75rem' }}>
                    <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.62rem', color: '#999' }}>{t.difficulty} · {t.duration}</span>
                    <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>View Trek →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3 — FEATURED PROGRAMS ═══ */}
      {chakrataEvents.length > 0 && (
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
          <div className="ck-wide">
            <div className="ck-eyebrow" style={{ justifyContent: 'center' }}><span className="ck-eyebrow-line" /><span className="ck-eyebrow-text">Scheduled Programs</span><span className="ck-eyebrow-line" /></div>
            <h2 className="ck-section-title" style={{ textAlign: 'center' }}>Upcoming Chakrata <span>retreats</span></h2>
            <p className="ck-body-text" style={{ textAlign: 'center', maxWidth: '36rem', margin: '0 auto 3rem' }}>Confirmed dates, fixed pricing, limited seats. Book directly or reach out to discuss.</p>
            <div className="ck-prog-grid">
              {chakrataEvents.map((ev) => {
                const sc = ev.status === 'filling-fast' ? 'ck-prog-filling' : ev.status === 'last-few' ? 'ck-prog-last' : 'ck-prog-open';
                const sl = ev.status === 'filling-fast' ? 'Filling Fast' : ev.status === 'last-few' ? 'Last Few Seats' : 'Open';
                return (
                  <Link key={ev.slug} href={`/${ev.slug}`} className="ck-prog-card">
                    <div style={{ padding: '1.5rem 1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#999', fontWeight: 500, display: 'block', marginBottom: '0.35rem' }}>{ev.month} {ev.year}</span>
                        <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.05rem', fontWeight: 500, color: '#111', margin: 0 }}>{ev.label}</h3>
                      </div>
                      <span className={`ck-prog-status ${sc}`}>{sl}</span>
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
            <div style={{ textAlign: 'center', marginTop: '2rem' }}><Link href="/contact" className="ck-cta-btn">Don&apos;t See Your Dates? Request a Custom Retreat →</Link></div>
          </div>
        </section>
      )}

      {/* ═══ SECTION 4 — WHY CHAKRATA (Visual Storytelling) ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="ck-inner">
          <div className="ck-eyebrow"><span className="ck-eyebrow-line" /><span className="ck-eyebrow-text">Why This Place</span></div>
          <h2 className="ck-section-title">Why retreats work <span>in Chakrata</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { title: 'Altitude & Nervous System', text: '2,200m creates a gentle oxygen reduction that calms the thinking mind, allowing deeper rest and true recovery — without the extremity of high-altitude environments.' },
              { title: 'Forest Silence', text: 'Dense Himalayan deodar forest — not bare peaks, but living woodland. The acoustic environment is non-commercial. No tourist noise, no vehicle sound. The forest itself creates the container.' },
              { title: 'Isolation Without Extremity', text: 'Close enough to Dehradun to be accessible (3.5 hours). Remote enough that once you arrive, you have genuinely left. No hiking to reach comfort. Simply separation.' },
              { title: 'Cultural Quiet', text: 'A working cantonment town, not a tourism hub. Its rhythm is local, not visitor-oriented. This keeps the space grounded and unhurried — no performance tourism.' },
            ].map((f, idx, arr) => (
              <div key={f.title} style={{ display: 'grid', gridTemplateColumns: '2.5rem 1fr', gap: '0 1rem', paddingBottom: idx < arr.length - 1 ? '1.75rem' : 0, borderBottom: idx < arr.length - 1 ? '1px solid #f0f0f0' : 'none', paddingTop: idx > 0 ? '1.75rem' : 0 }}>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-primary)', letterSpacing: '0.1em', paddingTop: '0.15rem' }}>{String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.95rem', fontWeight: 500, color: '#111', margin: '0 0 0.4rem' }}>{f.title}</h3>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', lineHeight: 1.75, color: '#666', fontWeight: 300, margin: 0 }}>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VISUAL BREAK — Forest Image ═══ */}
      <figure style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', height: '300px', overflow: 'hidden', margin: 0, padding: 0 }}>
        <img src="/Images/trek/region/budher.webp" alt="Dense deodar forest trail leading to Budher Caves in Chakrata" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
        <figcaption style={{ position: 'absolute', bottom: '1.5rem', left: 0, right: 0, textAlign: 'center', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', fontWeight: 300, letterSpacing: '0.03em', fontStyle: 'italic' }}>
          Forest trail to Budher Caves — Chakrata&apos;s most distinctive route
        </figcaption>
      </figure>

      {/* ═══ SECTION 5 — PLACES & EXPERIENCES ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="ck-wide">
          <div className="ck-eyebrow" style={{ justifyContent: 'center' }}><span className="ck-eyebrow-line" /><span className="ck-eyebrow-text">The Land</span><span className="ck-eyebrow-line" /></div>
          <h2 className="ck-section-title" style={{ textAlign: 'center' }}>Places & <span>landscapes</span></h2>
          <p className="ck-body-text" style={{ textAlign: 'center', maxWidth: '36rem', margin: '0 auto 3rem' }}>
            Chakrata is defined by its landscape — deodar forest, limestone caves, ridge walks, waterfalls. These places shape your retreat and trek experience.
          </p>
          <div className="ck-place-grid">
            {PLACES.map((p) => (
              <div key={p.name} className="ck-place-card">
                <Image src={p.img} alt={`${p.name} in Chakrata`} fill loading="lazy" quality={55} sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
                <div style={{ position: 'relative', zIndex: 2, padding: '1.75rem', width: '100%' }}>
                  <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>{p.type} · {p.season}</span>
                  <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.15rem', fontWeight: 400, color: '#fff', margin: '0 0 0.5rem' }}>{p.name}</h3>
                  <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', fontWeight: 300, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6 — SEASONAL GUIDE ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="ck-wide">
          <div className="ck-eyebrow" style={{ justifyContent: 'center' }}><span className="ck-eyebrow-line" /><span className="ck-eyebrow-text">When to Visit</span><span className="ck-eyebrow-line" /></div>
          <h2 className="ck-section-title" style={{ textAlign: 'center' }}>Timing & <span>the forest rhythm</span></h2>
          <div className="ck-season-grid">
            {[
              { months: 'Mar – May', mood: 'Emergence', text: 'Spring brings life. Wildflowers, birdsong, gently upward energy. Good for new beginnings.' },
              { months: 'Jun – Aug', mood: 'Inward', text: 'Monsoon transforms Chakrata. Heavy cloud, rain, mist. Peak season for silence-seeking.' },
              { months: 'Sep – Oct', mood: 'Clarity', text: 'Post-monsoon clear skies. Cool, crisp. Our recommended season for most retreats.' },
              { months: 'Nov – Feb', mood: 'Depth', text: 'Winter silence. Bare forest, cold, clear sky. For those seeking true solitude.' },
            ].map((s) => (
              <div key={s.months} className="ck-season-card">
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>{s.months}</span>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 500, color: '#111', display: 'block', marginBottom: '0.5rem' }}>{s.mood}</span>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: '#666', fontWeight: 300, lineHeight: 1.65, margin: 0 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GUIDED DECISION FUNNEL ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#0a1f1c', padding: '4.5rem 0' }}>
        <div className="ck-wide">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 200, color: '#ffffff', margin: '0 0 0.6rem' }}>Three ways to start your Chakrata journey</h3>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: '36rem', margin: '0 auto', lineHeight: 1.7 }}>Choose based on how much guidance you need.</p>
          </div>
          <div className="ck-funnel-grid">
            <Link href="/contact" className="ck-funnel-card">
              <span style={{ fontSize: '1.6rem' }}>💬</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.92rem', fontWeight: 500, color: '#ffffff' }}>Get Matched</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.6 }}>Tell us about yourself — we&apos;ll recommend retreat or trek, duration, and dates. Free, no pressure.</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', marginTop: 'auto', paddingTop: '0.5rem' }}>Talk to a planner →</span>
            </Link>
            <Link href="/treks/location/chakrata" className="ck-funnel-card">
              <span style={{ fontSize: '1.6rem' }}>🥾</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.92rem', fontWeight: 500, color: '#ffffff' }}>Browse Treks</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.6 }}>4 trek routes from easy to moderate. Compare difficulty, duration, and terrain. Decide at your own pace.</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', marginTop: 'auto', paddingTop: '0.5rem' }}>Explore treks →</span>
            </Link>
            <Link href="/retreats-for-beginners" className="ck-funnel-card">
              <span style={{ fontSize: '1.6rem' }}>🌱</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.92rem', fontWeight: 500, color: '#ffffff' }}>First Retreat?</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.6 }}>Chakrata is our most recommended first-time location. Read the beginner&apos;s guide to remove all objections.</span>
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-primary)', marginTop: 'auto', paddingTop: '0.5rem' }}>Beginner&apos;s guide →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TRUST & DIFFERENTIATION ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="ck-wide">
          <div className="ck-eyebrow" style={{ justifyContent: 'center' }}><span className="ck-eyebrow-line" /><span className="ck-eyebrow-text">Why Us</span><span className="ck-eyebrow-line" /></div>
          <h2 className="ck-section-title" style={{ textAlign: 'center' }}>What makes our Chakrata retreats <span>different</span></h2>
          <div className="ck-trust-grid">
            {[
              { num: '12', label: 'Max Group', text: 'Small enough for personal attention from facilitators.' },
              { num: '0', label: 'Tourist Noise', text: 'Non-commercial forest location. No spa menus or resort programming.' },
              { num: '3.5h', label: 'From Dehradun', text: 'No arduous journey. Leave Friday evening, start Saturday morning.' },
              { num: '100%', label: 'All-Inclusive', text: 'Meals, accommodation, sessions, transport. No hidden extras.' },
            ].map((i) => (
              <div key={i.label} className="ck-trust-item">
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.6rem', fontWeight: 200, color: 'var(--color-primary)', display: 'block', marginBottom: '0.15rem' }}>{i.num}</span>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>{i.label}</span>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', lineHeight: 1.6, color: '#666', fontWeight: 300, margin: 0 }}>{i.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PLANNING LINKS ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="ck-inner">
          <div className="ck-eyebrow"><span className="ck-eyebrow-line" /><span className="ck-eyebrow-text">Plan Your Visit</span></div>
          <h2 className="ck-section-title">Guides & <span>planning resources</span></h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/blog/how-to-reach-chakrata-for-a-retreat" className="ck-cta-outline">How to Reach Chakrata →</Link>
            <Link href="/blog/best-time-for-retreat-in-chakrata" className="ck-cta-outline">Best Time to Visit →</Link>
            <Link href="/blog/is-chakrata-good-for-a-retreat" className="ck-cta-outline">Is Chakrata Right for You? →</Link>
            <Link href="/blog/chakrata-vs-rishikesh-for-a-retreat" className="ck-cta-outline">Chakrata vs Rishikesh →</Link>
            <Link href="/blog/chakrata-vs-sankri" className="ck-cta-outline">Chakrata vs Sankri →</Link>
            <Link href="/treks/location/chakrata" className="ck-cta-outline">Full Trekking Guide →</Link>
            <Link href="/retreats-for-beginners" className="ck-cta-outline">First Retreat Guide →</Link>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="ck-inner">
          <div className="ck-eyebrow"><span className="ck-eyebrow-line" /><span className="ck-eyebrow-text">Common Questions</span></div>
          <h2 className="ck-section-title">Frequently asked <span>questions</span></h2>
          <div>
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="ck-faq-item">
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
          <img src="/Images/trek/region/chakraweekend.webp" alt="Chakrata forest campsite — weekend retreat and trek destination" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.88)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '44rem', padding: '4rem 2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 200, color: '#ffffff', margin: '0 0 1rem' }}>Begin Your Chakrata Journey</h2>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', fontWeight: 300, lineHeight: 1.75, margin: '0 0 2rem' }}>
            Whether you seek stillness or movement — a silent retreat in the forest or a trek to the caves — tell us what you&apos;re looking for and we&apos;ll recommend the right experience.
          </p>
          <Link href="/contact" className="ck-cta-btn" style={{ fontSize: '0.85rem', padding: '1rem 2.5rem' }}>Plan My Chakrata Experience →</Link>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {['Forest silence at 2,200m', 'Max 12 per group', '3.5 hrs from Dehradun', 'All-inclusive pricing'].map((t) => (
              <span key={t} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', fontWeight: 400, letterSpacing: '0.05em' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

    </TrackedPage>
  );
}
