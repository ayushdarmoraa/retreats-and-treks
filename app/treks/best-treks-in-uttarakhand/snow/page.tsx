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

const PATH = '/treks/best-treks-in-uttarakhand/snow';
const PARENT_PATH = '/treks/best-treks-in-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best Snow Treks in Uttarakhand (2025) — Winter Himalayan Routes',
    description:
      'The 3 best snow treks in Uttarakhand for winter 2024–25. Brahmatal, Kedarkantha, and Kuari Pass ranked by snow conditions, difficulty, and experience required.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
  };
}

const FAQ_ITEMS = [
  {
    question: 'When is the best time for snow treks in Uttarakhand?',
    answer:
      'December to March offers the best snow conditions. January and February deliver peak snow depth — Kedarkantha and Brahmatal trails are fully snow-covered above 3,000 m. Early December and late March can have patchy snow at lower elevations.',
  },
  {
    question: 'Which snow trek is easiest for first-timers?',
    answer:
      'Brahmatal is the easiest snow trek. At 4 days duration with moderate difficulty and no technical sections, it provides a complete snow trekking experience (frozen lake, snow ridges, summit views) without the steep summit push required on Kedarkantha.',
  },
  {
    question: 'Do I need crampons or ice axes for snow treks?',
    answer:
      'Microspikes or basic crampons are recommended for Kedarkantha summit day (steep snow above 3,500 m). Brahmatal can be done with gaiters and good trekking boots. Kuari Pass in March needs gaiters for upper snow sections. Trek operators typically provide microspikes if needed.',
  },
  {
    question: 'How cold does it get on winter treks in Uttarakhand?',
    answer:
      'Night temperatures at camp drop to -5°C to -15°C depending on altitude and month. January is coldest. Daytime on trail with sun is typically 0°C to 5°C. A proper 4-layer system (base, insulation, fleece, shell) plus a -15°C sleeping bag is essential.',
  },
];

const BREADCRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Treks', href: '/treks' },
  { name: 'Best Treks in Uttarakhand', href: PARENT_PATH },
  { name: 'Snow Treks' },
];

export default function SnowTreksPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Best Treks in Uttarakhand', url: buildCanonicalUrl(PARENT_PATH) },
    { name: 'Snow Treks', url: buildCanonicalUrl(PATH) },
  ]);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Best Snow Treks in Uttarakhand',
        description:
          'Curated selection of winter snow treks in Uttarakhand covering December to March routes with varying difficulty levels.',
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
          { '@type': 'ListItem', position: 1, name: 'Brahmatal Trek', url: buildCanonicalUrl('/treks/location/lohajung/brahmatal-trek') },
          { '@type': 'ListItem', position: 2, name: 'Kedarkantha Trek', url: buildCanonicalUrl('/treks/location/sankri/kedarkantha-trek') },
          { '@type': 'ListItem', position: 3, name: 'Kuari Pass Trek (March)', url: buildCanonicalUrl('/treks/location/joshimath/kuari-pass-trek') },
        ],
      },
      breadcrumbSchema,
      faqSchema,
    ],
  };

  return (
    <TrackedPage page={PATH} style={{ width: '100%', padding: '0' }}>
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  <style>{`
    .snow-card { background:#fff; border:1px solid #e5e7eb; border-top:2px solid var(--color-primary); border-radius:8px; overflow:hidden; margin-bottom:1.25rem; }
    .snow-card:last-of-type { margin-bottom:0; }
    .snow-card-img { width:100%; height:200px; object-fit:cover; display:block; }
    .snow-card-body { padding:1.5rem; }
    .snow-card-body h2 { font-family:var(--font-geist-sans),sans-serif; font-size:0.95rem; font-weight:500; color:#111; margin:0 0 0.85rem; letter-spacing:-0.01em; }
    .snow-card-body p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0 0 0.75rem; }
    .snow-card-body p:last-child { margin-bottom:0; }
    .snow-pills { display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:1rem; }
    .snow-pill { font-family:var(--font-geist-sans),sans-serif; font-size:0.68rem; color:#555; background:#f7f9f7; border:1px solid #e5e7eb; border-radius:100px; padding:3px 10px; }
    .snow-th { font-family:var(--font-geist-sans),sans-serif; font-size: 0.75rem; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color: #374151; padding:0.75rem 1rem; text-align:left; }
    .snow-td { font-family:var(--font-geist-sans),sans-serif; font-size:0.84rem; font-weight:300; color:#444; padding:0.75rem 1rem; border-bottom:1px solid #f0f0f0; }
    .snow-table tbody tr:last-child td { border-bottom:none; }
    .snow-table tbody tr:hover td { background:#f7f9f7; }
    .snow-nav-link { display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1rem; border-bottom:1px solid #f0f0f0; font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; color:#333; text-decoration:none; }
    .snow-nav-link:hover { background:#f7f9f7; color: #374151; }
    .snow-nav-link::after { content:'→'; color: #374151;  }
    .snow-nav-group { border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; }
    .snow-nav-group .snow-nav-link:last-child { border-bottom:none; }
    @media(max-width:640px){
      .snow-card-img { height:160px; }
      .snow-card-body { padding:1.1rem; }
      .snow-td:nth-child(2), .snow-th:nth-child(2) { display:none; }
    }
  `}</style>

  {/* ── HERO ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <Breadcrumb items={BREADCRUMBS} />
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', margin:'1.5rem 0 1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)',  display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize: '0.75rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color: '#374151', fontWeight:500}}>Winter Trekking · Uttarakhand</span>
      </div>
      <h1 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.4rem)', fontWeight:200, letterSpacing:'-0.035em', color:'#111', lineHeight:1.1, margin:'0 0 1.5rem' }}>
        Best Snow Treks in Uttarakhand
      </h1>
      <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'1.5rem' }}>
  <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderLeft:'3px solid var(--color-primary)', borderRadius:'8px', padding:'1rem 1.25rem', fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', lineHeight:1.85, color:'#555' }}>
    <div style={{ fontSize: '0.75rem', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase' as const, color: '#374151', marginBottom:'0.35rem' }}>First Snow Trek</div>
    <span style={{ fontWeight:500, color:'#111' }}>Choose <Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>Brahmatal</Link></span>{' '}
    <span style={{ fontWeight:300 }}>— frozen lake, snow ridges, moderate difficulty. No crampons needed.</span>
  </div>
  <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderLeft:'3px solid #e65100', borderRadius:'8px', padding:'1rem 1.25rem', fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', lineHeight:1.85, color:'#555' }}>
    <div style={{ fontSize: '0.75rem', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase' as const, color:'#e65100', marginBottom:'0.35rem' }}>Want a Summit</div>
    <span style={{ fontWeight:500, color:'#111' }}>Choose <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>Kedarkantha</Link></span>{' '}
    <span style={{ fontWeight:300 }}>— deep-snow summit views across six Himalayan ranges.</span>
  </div>
</div>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', margin:'0 0 1rem' }}>
        Winter transforms the Uttarakhand Himalaya — frozen lakes, snow-laden conifer forests, and summit ridges under continuous white. The snow trekking season runs December to March, with January and February delivering peak conditions. Three featured routes offer distinctly different winter experiences, from a gentle frozen-lake walk to a proper summit push through deep snow.
      </p>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', margin:0 }}>
        These routes are drawn from our <Link href={PARENT_PATH} style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>complete ranking of the 10 best treks in Uttarakhand</Link>. For non-winter routes, see the <Link href={`${PARENT_PATH}/beginner`} style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>beginner treks</Link> and <Link href={`${PARENT_PATH}/high-altitude`} style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>high-altitude treks</Link> filter pages.
      </p>
    </div>
  </section>

  {/* ── 3 TREK CARDS ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)',  display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize: '0.75rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color: '#374151', fontWeight:500}}>Featured Snow Treks</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'2rem' }}>Three Routes, Three Winter Experiences</h2>

      {/* Brahmatal */}
      <div className="snow-card">
        <Image className="snow-card-img" src="/Images/trek/snow/bramhatal.webp" alt="Brahmatal snow trek — frozen alpine lake in Garhwal Himalaya" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
        <div className="snow-card-body">
          <h2>Brahmatal — The Ideal First Snow Trek</h2>
          <div className="snow-pills">
            <span className="snow-pill">3,850 m</span>
            <span className="snow-pill" style={{ color: '#374151', borderColor:'rgba(15,118,110,0.25)', background:'rgba(15,118,110,0.05)' }}>Moderate</span>
            <span className="snow-pill">4 days</span>
            <span className="snow-pill">Dec–Mar</span>
            <span className="snow-pill">Lohajung, Garhwal</span>
          </div>
          <p><Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>Brahmatal</Link> is the snow trek most often recommended for first-time winter trekkers — and for good reason. A 4-day route from Lohajung through snow-covered rhododendron forest to a frozen alpine lake at 3,850 m, with continuous Trishul and Nanda Ghunti views from the upper ridges. No technical sections, no exposed scrambles, no crampons needed. The shorter 4-day duration also limits cold-weather exposure, which is the real challenge of winter trekking for beginners.</p>
          <p><strong style={{ fontWeight:500, color:'#111' }}>Snow conditions:</strong> Above 3,000 m, expect 1–3 feet of packed snow from mid-December. The trail through snow-covered forest is visually stunning and the frozen lake itself — with mountain reflections visible through ice — is the signature moment. January and February offer the deepest snow.</p>
        </div>
      </div>

      {/* Kedarkantha */}
      <div className="snow-card">
        <Image className="snow-card-img" src="/Images/trek/snow/kedarkantha.webp" alt="Kedarkantha summit — winter snow trek from Sankri" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
        <div className="snow-card-body">
          <h2>Kedarkantha — The Quintessential Winter Summit</h2>
          <div className="snow-pills">
            <span className="snow-pill">3,810 m</span>
            <span className="snow-pill" style={{ color:'#c45000', borderColor:'rgba(230,81,0,0.25)', background:'rgba(230,81,0,0.05)' }}>Moderate–Challenging</span>
            <span className="snow-pill">5 days</span>
            <span className="snow-pill">Dec–Feb</span>
            <span className="snow-pill">Sankri</span>
          </div>
          <p><Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>Kedarkantha</Link> is the most popular winter trek in India — the definitive first summit experience in deep snow. A 5-day route from Sankri with a final summit push that gains 1,500 feet through knee-deep snow to a 3,810 m peak offering 360-degree views across six Himalayan ranges. More physically demanding than Brahmatal, with a proper summit-day challenge that separates it from a standard snow walk.</p>
          <p><strong style={{ fontWeight:500, color:'#111' }}>Snow conditions:</strong> Deep snow above 3,200 m from December. The summit push is the centrepiece — a steep, sustained climb through snow that requires microspikes and genuine effort. Sunrise from the snow-covered peak is the most photographed moment in Indian winter trekking.</p>
          <p>Choosing between the two winter routes? Our detailed <Link href="/blog/kedarkantha-vs-har-ki-dun" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>Kedarkantha vs Har Ki Dun comparison</Link> covers the decision framework for Sankri-based treks.</p>
        </div>
      </div>

      {/* Kuari Pass */}
      <div className="snow-card">
        <Image className="snow-card-img" src="/Images/trek/snow/kuari.webp" alt="Kuari Pass March — snow and spring on the Curzon Trail" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
        <div className="snow-card-body">
          <h2>Kuari Pass (March) — Snow Meets Spring</h2>
          <div className="snow-pills">
            <span className="snow-pill">3,876 m</span>
            <span className="snow-pill" style={{ color: '#374151', borderColor:'rgba(15,118,110,0.25)', background:'rgba(15,118,110,0.05)' }}>Moderate</span>
            <span className="snow-pill">5 days</span>
            <span className="snow-pill">March</span>
            <span className="snow-pill">Joshimath, Garhwal</span>
          </div>
          <p><Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>Kuari Pass</Link> in early March sits at the intersection of winter and spring — significant snow remains on the upper sections while rhododendrons begin blooming on the lower trail. Not a pure deep-snow trek like Kedarkantha, but the combination of lingering snow, spring colour, and the famous Curzon Trail ridge walk creates the most photogenic window of any featured route.</p>
          <p><strong style={{ fontWeight:500, color:'#111' }}>Snow conditions:</strong> Upper sections (above 3,400 m) retain 1–2 feet of snow through mid-March. Lower trail transitions from snow to mud to dry trail as spring advances. The ridge walk with snow underfoot and Nanda Devi views is the highlight.</p>
        </div>
      </div>

      {/* Callout */}
      <div style={{ background:'#f7f9f7', border:'1px solid #e5e7eb', borderLeft:'3px solid var(--color-primary)', borderRadius:'8px', padding:'1rem 1.25rem', marginTop:'0.5rem', fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555' }}>
        <strong style={{ fontWeight:500, color:'#111' }}>Choosing between Kedarkantha and Har Ki Dun from Sankri?</strong>{' '}
        Both leave from the same base town but deliver opposite experiences.{' '}
        <Link href="/treks/kedarkantha-vs-har-ki-dun" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>See the full Kedarkantha vs Har Ki Dun comparison →</Link>
      </div>
    </div>
  </section>

  {/* ── COMPARISON TABLE ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)',  display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize: '0.75rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color: '#374151', fontWeight:500}}>Quick Comparison</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'1.75rem' }}>Snow Treks at a Glance</h2>
      <div style={{ overflowX:'auto', border:'1px solid #e5e7eb', borderRadius:'8px', background:'#fff' }}>
        <table className="snow-table" style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead><tr style={{ borderBottom:'2px solid #e5e7eb' }}>
            <th className="snow-th">Trek</th>
            <th className="snow-th">Altitude</th>
            <th className="snow-th">Difficulty</th>
            <th className="snow-th">Days</th>
            <th className="snow-th">Peak Snow</th>
          </tr></thead>
          <tbody>
            {[
              { href:'/treks/location/lohajung/brahmatal-trek', name:'Brahmatal', alt:'3,850 m', diff:'Moderate', days:'4', snow:'Jan–Feb' },
              { href:'/treks/location/sankri/kedarkantha-trek', name:'Kedarkantha', alt:'3,810 m', diff:'Moderate–Challenging', days:'5', snow:'Dec–Feb' },
              { href:'/treks/location/joshimath/kuari-pass-trek', name:'Kuari Pass', alt:'3,876 m', diff:'Moderate', days:'5', snow:'Mar (lingering)' },
            ].map(r => (
              <tr key={r.href}>
                <td className="snow-td"><Link href={r.href} style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>{r.name}</Link></td>
                <td className="snow-td">{r.alt}</td>
                <td className="snow-td">
                  <span style={{ fontSize:'0.6rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' as const, borderRadius:'100px', padding:'2px 10px', display:'inline-block', ...(r.diff.startsWith('Moderate–') ? { color:'#c45000', background:'rgba(230,81,0,0.07)', border:'1px solid rgba(230,81,0,0.2)' } : { color: '#374151', background:'rgba(15,118,110,0.07)', border:'1px solid rgba(15,118,110,0.2)' }) }}>{r.diff}</span>
                </td>
                <td className="snow-td">{r.days}</td>
                <td className="snow-td">{r.snow}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  {/* ── GEAR ESSENTIALS ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)',  display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize: '0.75rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color: '#374151', fontWeight:500}}>Gear & Preparation</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'1.75rem' }}>Winter Gear Essentials</h2>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginBottom:'1rem' }}>
        Snow trekking demands specific gear beyond standard 3-season equipment. The critical additions: waterproof shell layers (jacket + pants), insulated gloves with waterproof outers, gaiters to keep snow out of boots, microspikes for icy sections, and a sleeping bag rated to -15°C minimum.
      </p>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', margin:0 }}>
        Our <Link href="/treks/garhwal-himalayas/packing-checklist" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>print-ready packing checklist</Link> includes a winter-specific section covering all snow trek gear. For fitness preparation targeting winter conditions, see the <Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>8-week fitness guide</Link>.
      </p>
    </div>
  </section>

  <PrimaryCTA label="Book a Winter Trek" subtext="Share your preferred dates — we will confirm snow conditions and availability." vertical="trek" category="filter-snow" sourcePath={PATH} />

  {/* ── FAQ ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)',  display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize: '0.75rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color: '#374151', fontWeight:500}}>FAQ</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'1.75rem' }}>Frequently Asked Questions</h2>
      <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
    </div>
  </section>

  {/* ── BROWSE ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)',  display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize: '0.75rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color: '#374151', fontWeight:500}}>Explore More</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'1.75rem' }}>Browse by Category</h2>
      <div className="snow-nav-group">
        <Link href={PARENT_PATH} className="snow-nav-link">← All 10 Best Treks in Uttarakhand</Link>
        <Link href={`${PARENT_PATH}/beginner`} className="snow-nav-link">Beginner Treks in Uttarakhand</Link>
        <Link href={`${PARENT_PATH}/high-altitude`} className="snow-nav-link">High-Altitude Treks Above 4,000 m</Link>
        <Link href={`${PARENT_PATH}/challenging`} className="snow-nav-link">Challenging Treks in Uttarakhand</Link>
        <Link href="/treks/winter-treks-uttarakhand" className="snow-nav-link">Winter Treks in Uttarakhand — Seasonal Guide</Link>
      </div>
    </div>
  </section>

</TrackedPage>
  );
}
