import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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

const PATH = '/treks/best-treks-in-uttarakhand/beginner';
const PARENT_PATH = '/treks/best-treks-in-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Beginner Treks in Uttarakhand (2025) — Easy & Moderate Routes',
    description:
      'The 5 best beginner-friendly treks in Uttarakhand ranked by difficulty. From easy day hikes in Chakrata to moderate multi-day routes in Garhwal — no prior trekking experience needed.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is the easiest trek in Uttarakhand?',
    answer:
      'Tiger Fall in Chakrata is the easiest featured trek — a single-day forest trail below 2,500 m with no altitude risk, no camping gear needed, and year-round accessibility. It is ideal for first-time trekkers and families.',
  },
  {
    question: 'Can a complete beginner do a multi-day trek in Uttarakhand?',
    answer:
      'Yes. Brahmatal (4 days, Moderate) and Kuari Pass (5 days, Moderate) are designed for fit beginners with no prior trekking experience. Both are fully guided, with established campsites and gradual altitude gain.',
  },
  {
    question: 'What fitness level is needed for beginner treks?',
    answer:
      'For Chakrata day treks, basic walking fitness is sufficient. For Brahmatal or Kuari Pass, 4–6 weeks of preparation including cardio (jogging, cycling) and stair climbing is recommended. You should be comfortable walking 8–12 km on uneven ground.',
  },
  {
    question: 'What is the best season for beginner treks in Uttarakhand?',
    answer:
      'October–November and March–May offer the most comfortable conditions — mild temperatures, clear skies, and dry trails. Brahmatal is a winter-specific trek (Dec–Mar) with snow but moderate difficulty. Chakrata day hikes are accessible year-round.',
  },
];

const BREADCRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Treks', href: '/treks' },
  { name: 'Best Treks in Uttarakhand', href: PARENT_PATH },
  { name: 'Beginner Treks' },
];

export default function BeginnerTreksPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Best Treks in Uttarakhand', url: buildCanonicalUrl(PARENT_PATH) },
    { name: 'Beginner Treks', url: buildCanonicalUrl(PATH) },
  ]);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Best Beginner Treks in Uttarakhand',
        description:
          'Curated selection of easy and moderate treks in Uttarakhand for first-time trekkers, covering day hikes to multi-day routes.',
        url: buildCanonicalUrl(PATH),
        isPartOf: {
          '@type': 'CollectionPage',
          url: buildCanonicalUrl(PARENT_PATH),
          name: '10 Best Treks in Uttarakhand',
        },
      },
      {
        '@type': 'ItemList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Tiger Fall Trek', url: buildCanonicalUrl('/treks/location/chakrata/tiger-fall-trek') },
          { '@type': 'ListItem', position: 2, name: 'Budher Caves Trek', url: buildCanonicalUrl('/treks/location/chakrata/budher-caves-trek') },
          { '@type': 'ListItem', position: 3, name: 'Brahmatal Trek', url: buildCanonicalUrl('/treks/location/lohajung/brahmatal-trek') },
          { '@type': 'ListItem', position: 4, name: 'Kuari Pass Trek', url: buildCanonicalUrl('/treks/location/joshimath/kuari-pass-trek') },
          { '@type': 'ListItem', position: 5, name: 'Khaliya Top Trek', url: buildCanonicalUrl('/treks/location/munsiyari/khaliya-top-trek') },
        ],
      },
      breadcrumbSchema,
      faqSchema,
    ],
  };

  return (
    <TrackedPage page={PATH} style={{ width: '100%', padding: '0' }}>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
  />

  <style>{`
    .beg-trek-card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-top: 2px solid var(--color-primary);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.25rem;
    }
    .beg-trek-card:last-of-type { margin-bottom: 0; }
    .beg-trek-card h3 {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem; font-weight: 500;
      color: #111111; margin: 0 0 0.85rem;
      letter-spacing: -0.01em;
    }
    .beg-trek-card p {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.88rem; font-weight: 300;
      line-height: 1.85; color: #555555; margin: 0;
    }
    .beg-pills { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
    .beg-pill {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.68rem; font-weight: 400;
      color: #555555; background: #f7f9f7;
      border: 1px solid #e5e7eb; border-radius: 100px;
      padding: 3px 10px; display: inline-block;
    }
    .beg-table thead tr { border-bottom: 2px solid #e5e7eb; }
    .beg-table th {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem; font-weight: 600;
      letter-spacing: 0.2em; text-transform: uppercase;
      color: #374151;
      padding: 0.75rem 1rem; text-align: left;
    }
    .beg-table td {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.84rem; font-weight: 300;
      color: #444444; padding: 0.75rem 1rem;
      border-bottom: 1px solid #f0f0f0;
    }
    .beg-table tbody tr:last-child td { border-bottom: none; }
    .beg-table tbody tr:hover td { background: #f7f9f7; }
    .beg-nav-link {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.85rem 1rem;
      border-bottom: 1px solid #f0f0f0;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.88rem; font-weight: 300;
      color: #333333; text-decoration: none;
    }
    .beg-nav-link:hover { background: #f7f9f7; color: #374151; }
    .beg-nav-link::after { content: '→'; color: #374151;  }
    .beg-nav-group { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
    .beg-nav-group .beg-nav-link:last-child { border-bottom: none; }
    @media (max-width: 640px) {
      .beg-table th:nth-child(2), .beg-table td:nth-child(2) { display: none; }
      .beg-trek-card { padding: 1.1rem; }
    }
  `}</style>

  {/* ── HERO ── */}
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#f7f9f7',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <Breadcrumb items={BREADCRUMBS} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0 1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Beginner Guide · Uttarakhand</span>
      </div>
      <h1 style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
        fontWeight: 200, letterSpacing: '-0.035em',
        color: '#111111', lineHeight: 1.1, margin: '0 0 1.75rem',
      }}>
        Best Beginner Treks in Uttarakhand
      </h1>
      <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'1.5rem' }}>
  <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderLeft:'3px solid var(--color-primary)', borderRadius:'8px', padding:'1rem 1.25rem', fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', lineHeight:1.85, color:'#555' }}>
    <div style={{ fontSize: '0.75rem', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase' as const, color: '#374151', marginBottom:'0.35rem' }}>Want Snow & Lakes</div>
    <span style={{ fontWeight:500, color:'#111' }}>Choose <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>Brahmatal</Link></span>{' '}
    <span style={{ fontWeight:300 }}>— frozen alpine lake, snow ridges, Trishul views. 4 days from Lohajung.</span>
  </div>
  <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderLeft:'3px solid var(--color-primary)', borderRadius:'8px', padding:'1rem 1.25rem', fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', lineHeight:1.85, color:'#555' }}>
    <div style={{ fontSize: '0.75rem', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase' as const, color: '#374151', marginBottom:'0.35rem' }}>Want Panoramic Views</div>
    <span style={{ fontWeight:500, color:'#111' }}>Choose <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>Kuari Pass</Link></span>{' '}
    <span style={{ fontWeight:300 }}>— Nanda Devi panorama on the historic Curzon Trail. 5 days from Joshimath.</span>
  </div>
</div>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: '0 0 1rem' }}>
        You do not need expedition experience to trek in the Himalayas. Uttarakhand offers a clear pathway from flat forest trails to moderate multi-day routes — each step building the skills and confidence for the next. This page covers the 5 best treks for beginners: two easy day hikes (no gear, no altitude) and three moderate routes (camping, gentle altitude, fully guided).
      </p>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
        All five treks are included in our{' '}
        <Link href={PARENT_PATH} style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>complete ranking of the 10 best treks in Uttarakhand</Link>, which also covers challenging and high-altitude routes for experienced trekkers.
      </p>
    </div>
  </section>

  {/* ── EASY DAY TREKS ── */}
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#ffffff',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Easy Treks</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>
        Easy Day Treks — No Experience Needed
      </h2>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '2rem' }}>
        Chakrata sits 2–3 hours from Dehradun in dense deodar forest below 2,500 metres. These trails require no multi-day gear, no camping, and no altitude acclimatisation. They are the ideal first step for anyone who has never walked a mountain trail.
      </p>

      <div className="beg-trek-card" style={{ padding: 0, overflow: 'hidden' }}>
        <Image src="/Images/trek/begineertrek/tigerfall.webp" alt="Tiger Fall trek — deodar forest trail in Chakrata" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
        <div style={{ padding: '1.5rem' }}>
          <h3>Tiger Fall Trek</h3>
          <div className="beg-pills">
            <span className="beg-pill">~2,200 m</span>
            <span className="beg-pill" style={{ color: '#555', borderColor: '#e0e0e0', background: '#f0f0f0' }}>Easy</span>
            <span className="beg-pill">1 day</span>
            <span className="beg-pill">Year-round</span>
            <span className="beg-pill">Chakrata</span>
          </div>
          <p>
            A gentle forest walk to one of the tallest waterfalls in Uttarakhand. The trail stays below tree cover the entire way, with no exposed ridges or steep scrambles. Perfect for families, first-timers, or as a warm-up before a multi-day route.{' '}
            <Link href="/treks/location/chakrata/tiger-fall-trek" style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>View full Tiger Fall trek details →</Link>
          </p>
        </div>
      </div>

      <div className="beg-trek-card" style={{ padding: 0, overflow: 'hidden' }}>
        <Image src="/Images/trek/begineertrek/budher.webp" alt="Budher Caves trek — limestone caves near Chakrata" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
        <div style={{ padding: '1.5rem' }}>
          <h3>Budher Caves Trek</h3>
          <div className="beg-pills">
            <span className="beg-pill">~2,200 m</span>
            <span className="beg-pill" style={{ color: '#555', borderColor: '#e0e0e0', background: '#f0f0f0' }}>Easy</span>
            <span className="beg-pill">1 day</span>
            <span className="beg-pill">Year-round</span>
            <span className="beg-pill">Chakrata</span>
          </div>
          <p>
            A slightly longer forest trail leading to ancient limestone caves, offering more trail variety than Tiger Fall with a rewarding geological endpoint. Same low-altitude, low-risk profile, but adds exploration interest.{' '}
            <Link href="/treks/location/chakrata/budher-caves-trek" style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>View full Budher Caves trek details →</Link>
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            Both Chakrata trails pair well with a{' '}
            <Link href="/retreats/chakrata" style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>Chakrata retreat weekend</Link>{' '}
            — trek in the morning, rest and reset in the afternoon.
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* ── MODERATE MULTI-DAY ── */}
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#f7f9f7',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Moderate Treks</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '0.75rem' }}>
        Moderate Multi-Day Treks — Your First Himalayan Camping Experience
      </h2>
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginBottom: '2rem' }}>
        These routes introduce camping at altitude, multi-day rhythm, and the full Himalayan trekking experience — but with gradual altitude gain, well-established trails, and professional guides throughout. No technical skills needed; 4–6 weeks of fitness preparation recommended.
      </p>

      <div className="beg-trek-card" style={{ background: '#ffffff', padding: 0, overflow: 'hidden' }}>
        <Image src="/Images/trek/begineertrek/bramhatal.webp" alt="Brahmatal trek — frozen alpine lake and snow ridges in Garhwal" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
        <div style={{ padding: '1.5rem' }}>
          <h3>Brahmatal Trek</h3>
          <div className="beg-pills">
            <span className="beg-pill">3,850 m</span>
            <span className="beg-pill" style={{ color: '#374151', borderColor: 'rgba(15,118,110,0.25)', background: 'rgba(15,118,110,0.05)' }}>Moderate</span>
            <span className="beg-pill">4 days</span>
            <span className="beg-pill">Dec–Mar</span>
            <span className="beg-pill">Lohajung, Garhwal</span>
          </div>
          <p>
            The ideal first snow trek — frozen Brahmatal Lake, snow-covered ridges, and continuous Trishul and Nanda Ghunti views. The 4-day duration limits cold exposure while delivering a genuinely alpine experience. The route gains altitude gradually through forest before opening onto exposed ridge meadows.{' '}
            <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>View full Brahmatal trek details →</Link>
          </p>
        </div>
      </div>

      <div className="beg-trek-card" style={{ background: '#ffffff', padding: 0, overflow: 'hidden' }}>
        <Image src="/Images/trek/begineertrek/kuari.webp" alt="Kuari Pass trek — Curzon Trail ridge walk with Nanda Devi views" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
        <div style={{ padding: '1.5rem' }}>
          <h3>Kuari Pass Trek</h3>
          <div className="beg-pills">
            <span className="beg-pill">3,876 m</span>
            <span className="beg-pill" style={{ color: '#374151', borderColor: 'rgba(15,118,110,0.25)', background: 'rgba(15,118,110,0.05)' }}>Moderate</span>
            <span className="beg-pill">5 days</span>
            <span className="beg-pill">Mar–May, Oct–Nov</span>
            <span className="beg-pill">Joshimath, Garhwal</span>
          </div>
          <p>
            One of the most accessible ridge walks in the Himalayas — 5 days along the historic Curzon Trail with Nanda Devi, Dronagiri, and Chaukhamba visible for most of the route. Spring brings snow on the upper sections plus rhododendron bloom along the lower trail. This is the classic first moderate trek in Garhwal.{' '}
            <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>View full Kuari Pass trek details →</Link>{' '}
            Deciding between the two moderate routes?{' '}
            <Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>Compare Brahmatal vs Kuari Pass →</Link>
          </p>
        </div>
      </div>

      <div className="beg-trek-card" style={{ background: '#ffffff', padding: 0, overflow: 'hidden' }}>
        <Image src="/Images/trek/begineertrek/Khaliya.webp" alt="Khaliya Top trek — Panchachuli panorama from Munsiyari" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
        <div style={{ padding: '1.5rem' }}>
          <h3>Khaliya Top Trek</h3>
          <div className="beg-pills">
            <span className="beg-pill">3,500 m</span>
            <span className="beg-pill" style={{ color: '#374151', borderColor: 'rgba(15,118,110,0.25)', background: 'rgba(15,118,110,0.05)' }}>Moderate</span>
            <span className="beg-pill">3–4 days</span>
            <span className="beg-pill">May–Jun, Sep–Oct</span>
            <span className="beg-pill">Munsiyari, Kumaon</span>
          </div>
          <p>
            A quieter alternative to the popular Garhwal routes — Khaliya Top offers a 360-degree Panchachuli massif panorama from 3,500 metres, with far fewer trekkers on trail. Based from Munsiyari in the Kumaon Himalaya, it provides a genuine alpine meadow summit experience at gentler altitude than Garhwal. Ideal for trekkers who value solitude alongside scenery.{' '}
            <Link href="/treks/location/munsiyari/khaliya-top-trek" style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>View full Khaliya Top trek details →</Link>
          </p>
        </div>
      </div>

      {/* Comparison callout */}
      <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginTop:'1.5rem' }}>
        <div style={{ background:'#ffffff', border:'1px solid #e5e7eb', borderLeft:'3px solid var(--color-primary)', borderRadius:'8px', padding:'1rem 1.25rem', fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', lineHeight:1.85, color:'#555' }}>
          <div style={{ fontSize: '0.75rem', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase' as const, color: '#374151', marginBottom:'0.35rem' }}>Still Deciding?</div>
          <span style={{ fontWeight:500, color:'#111' }}>Brahmatal vs Kuari Pass</span>{' '}
          <span style={{ fontWeight:300 }}>— same difficulty, different seasons and landscapes. </span>
          <Link href="/treks/brahmatal-vs-kuari-pass" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>See full side-by-side comparison →</Link>
        </div>
      </div>
    </div>
  </section>
  {/* ── COMPARISON TABLE ── */}
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#ffffff',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Quick Comparison</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
        Beginner Treks at a Glance
      </h2>
      <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
        <table className="beg-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Trek</th>
              <th>Altitude</th>
              <th>Difficulty</th>
              <th>Days</th>
              <th>Best Season</th>
            </tr>
          </thead>
          <tbody>
            {[
              { href: '/treks/location/chakrata/tiger-fall-trek', name: 'Tiger Fall', alt: '~2,200 m', diff: 'Easy', days: '1', season: 'Year-round' },
              { href: '/treks/location/chakrata/budher-caves-trek', name: 'Budher Caves', alt: '~2,200 m', diff: 'Easy', days: '1', season: 'Year-round' },
              { href: '/treks/location/lohajung/brahmatal-trek', name: 'Brahmatal', alt: '3,850 m', diff: 'Moderate', days: '4', season: 'Dec–Mar' },
              { href: '/treks/location/joshimath/kuari-pass-trek', name: 'Kuari Pass', alt: '3,876 m', diff: 'Moderate', days: '5', season: 'Mar–May, Oct–Nov' },
              { href: '/treks/location/munsiyari/khaliya-top-trek', name: 'Khaliya Top', alt: '3,500 m', diff: 'Moderate', days: '3–4', season: 'May–Jun, Sep–Oct' },
            ].map(row => (
              <tr key={row.href}>
                <td><Link href={row.href} style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>{row.name}</Link></td>
                <td>{row.alt}</td>
                <td>
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const, borderRadius: '100px',
                    padding: '2px 10px', display: 'inline-block',
                    ...(row.diff === 'Easy'
                      ? { color: '#555', background: '#f0f0f0', border: '1px solid #e0e0e0' }
                      : { color: '#374151', background: 'rgba(15,118,110,0.07)', border: '1px solid rgba(15,118,110,0.2)' })
                  }}>{row.diff}</span>
                </td>
                <td>{row.days}</td>
                <td>{row.season}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  {/* ── WHAT TO EXPECT ── */}
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#f7f9f7',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>On the Trail</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
        What to Expect on Your First Trek
      </h2>
      {[
        { label: 'Day treks (Chakrata)', text: 'You will walk 4–8 km on forest trails at low altitude. Carry water, snacks, and rain protection. No special equipment needed. Return to accommodation the same day.' },
        { label: 'Multi-day treks (Brahmatal, Kuari Pass, Khaliya Top)', text: <>You will camp in tents at established sites, eat meals prepared by a trek crew, and walk 6–12 km per day with 500–800 m elevation gain. Guides manage navigation, safety, and logistics. Your main job is to walk and enjoy. Basic trekking gear (layering system, trekking shoes, daypack) is needed — our <Link href="/treks/garhwal-himalayas/packing-checklist" style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>packing checklist</Link> covers everything.</> },
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', padding: '1.25rem 0', borderBottom: '1px solid #e8ece8' }}>
          <span style={{ flexShrink: 0, width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-primary)',  marginTop: '0.45rem' }} />
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', margin: 0 }}>
            <strong style={{ fontWeight: 500, color: '#111111' }}>{item.label}:</strong>{' '}{item.text}
          </p>
        </div>
      ))}
      <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555555', marginTop: '1.5rem', marginBottom: 0 }}>
        Ready to progress beyond beginner routes? The{' '}
        <Link href={`${PARENT_PATH}#challenging-treks`} style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>challenging treks section</Link>{' '}
        covers Roopkund, Pangarchulla, and Milam Glacier for experienced trekkers.
      </p>
    </div>
  </section>

  <PrimaryCTA
    label="Plan My First Trek"
    subtext="Tell us your dates and fitness level — we will recommend the perfect first route."
    vertical="trek"
    category="filter-beginner"
    sourcePath={PATH}
  />

  {/* ── FAQ ── */}
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#f7f9f7',
    paddingTop: '4rem', paddingBottom: '4rem',
    borderBottom: '1px solid #e5e7eb',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>FAQ</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
        Frequently Asked Questions
      </h2>
      <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
    </div>
  </section>

  {/* ── BROWSE BY CATEGORY ── */}
  <section style={{
    width: '100vw', marginLeft: 'calc(-50vw + 50%)',
    background: '#ffffff',
    paddingTop: '4rem', paddingBottom: '4rem',
  }}>
    <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Explore More</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, marginBottom: '1.75rem' }}>
        Browse by Category
      </h2>
      <div className="beg-nav-group">
        <Link href={PARENT_PATH} className="beg-nav-link">← All 10 Best Treks in Uttarakhand</Link>
        <Link href={`${PARENT_PATH}/snow`} className="beg-nav-link">Snow Treks in Uttarakhand</Link>
        <Link href={`${PARENT_PATH}/high-altitude`} className="beg-nav-link">High-Altitude Treks Above 4,000 m</Link>
        <Link href={`${PARENT_PATH}/challenging`} className="beg-nav-link">Challenging Treks in Uttarakhand</Link>
        <Link href="/treks/garhwal-himalayas" className="beg-nav-link">Garhwal Himalayas — Complete Trekking Guide</Link>
      </div>
    </div>
  </section>

</TrackedPage>
  );
}
