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

const PATH = '/treks/best-treks-in-uttarakhand/high-altitude';
const PARENT_PATH = '/treks/best-treks-in-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Best High-Altitude Treks in Uttarakhand (2025) — Above 4,000 m',
    description:
      'The 3 best high-altitude treks in Uttarakhand above 4,000 m. Roopkund (4,800 m), Pangarchulla (4,590 m), and Brahmatal (3,850 m) — altitude profiles, preparation, and route details.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the highest trek in Uttarakhand?',
    answer:
      'Among commonly guided treks, Roopkund at 4,800 m is the highest featured route. Pangarchulla Peak at 4,590 m is the second-highest. Both are in the Garhwal Himalayas and require prior altitude experience above 3,500 m.',
  },
  {
    question: 'How do I prepare for a trek above 4,000 m?',
    answer:
      'Start with 6–8 weeks of structured fitness preparation: cardio (running, cycling), stair climbing with a loaded pack, and core strength work. Prior experience above 3,500 m (e.g., Kedarkantha or Kuari Pass) is strongly recommended. Acclimatisation days are built into itineraries, but personal preparation determines safety.',
  },
  {
    question: 'What are the symptoms of altitude sickness?',
    answer:
      'Early symptoms include headache, nausea, dizziness, and fatigue above 3,500 m. These typically resolve with rest and hydration. Severe symptoms (confusion, difficulty breathing at rest, loss of coordination) require immediate descent. All guided treks include altitude monitoring and emergency protocols.',
  },
  {
    question: 'Which high-altitude trek should I do first?',
    answer:
      'Brahmatal (3,850 m) is the recommended first high-altitude experience — it reaches significant altitude but with moderate difficulty and gradual gain. After that, Pangarchulla (4,590 m) or Roopkund (4,800 m) become viable next steps, depending on whether you prefer a summit climb or an expedition-style route.',
  },
];

const BREADCRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Treks', href: '/treks' },
  { name: 'Best Treks in Uttarakhand', href: PARENT_PATH },
  { name: 'High-Altitude Treks' },
];

export default function HighAltitudeTreksPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Best Treks in Uttarakhand', url: buildCanonicalUrl(PARENT_PATH) },
    { name: 'High-Altitude Treks', url: buildCanonicalUrl(PATH) },
  ]);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Best High-Altitude Treks in Uttarakhand',
        description:
          'Curated selection of treks above 4,000 m in Uttarakhand — Roopkund, Pangarchulla, and Brahmatal with altitude profiles and preparation guidance.',
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
          { '@type': 'ListItem', position: 1, name: 'Roopkund Trek (4,800 m)', url: buildCanonicalUrl('/treks/location/lohajung/roopkund-trek') },
          { '@type': 'ListItem', position: 2, name: 'Pangarchulla Peak Trek (4,590 m)', url: buildCanonicalUrl('/treks/location/joshimath/pangarchulla-trek') },
          { '@type': 'ListItem', position: 3, name: 'Brahmatal Trek (3,850 m)', url: buildCanonicalUrl('/treks/location/lohajung/brahmatal-trek') },
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
    .ha-card { background:#fff; border:1px solid #e5e7eb; border-top:2px solid var(--color-primary); border-radius:8px; overflow:hidden; margin-bottom:1.25rem; }
    .ha-card:last-of-type { margin-bottom:0; }
    .ha-card img { width:100%; height:200px; object-fit:cover; display:block; }
    .ha-card-body { padding:1.5rem; }
    .ha-card-body h2 { font-family:var(--font-geist-sans),sans-serif; font-size:0.95rem; font-weight:500; color:#111; margin:0 0 0.85rem; letter-spacing:-0.01em; }
    .ha-card-body p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0 0 0.75rem; }
    .ha-card-body p:last-child { margin-bottom:0; }
    .ha-pills { display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:1rem; }
    .ha-pill { font-family:var(--font-geist-sans),sans-serif; font-size:0.68rem; color:#555; background:#f7f9f7; border:1px solid #e5e7eb; border-radius:100px; padding:3px 10px; }
    .ha-th { font-family:var(--font-geist-sans),sans-serif; font-size: 0.75rem; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color: #374151; padding:0.75rem 1rem; text-align:left; }
    .ha-td { font-family:var(--font-geist-sans),sans-serif; font-size:0.84rem; font-weight:300; color:#444; padding:0.75rem 1rem; border-bottom:1px solid #f0f0f0; }
    .ha-table tbody tr:last-child td { border-bottom:none; }
    .ha-table tbody tr:hover td { background:#f7f9f7; }
    .ha-nav-link { display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1rem; border-bottom:1px solid #f0f0f0; font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; color:#333; text-decoration:none; }
    .ha-nav-link:hover { background:#f7f9f7; color: #374151; }
    .ha-nav-link::after { content:'→'; color: #374151;  }
    .ha-nav-group { border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; }
    .ha-nav-group .ha-nav-link:last-child { border-bottom:none; }
    @media(max-width:640px){
      .ha-card img { height:160px; }
      .ha-card-body { padding:1.1rem; }
      .ha-td:nth-child(4), .ha-th:nth-child(4),
      .ha-td:nth-child(5), .ha-th:nth-child(5) { display:none; }
    }
  `}</style>

  {/* ── HERO ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <Breadcrumb items={BREADCRUMBS} />
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', margin:'1.5rem 0 1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)',  display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize: '0.75rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color: '#374151', fontWeight:500}}>High Altitude · Uttarakhand</span>
      </div>
      <h1 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.4rem)', fontWeight:200, letterSpacing:'-0.035em', color:'#111', lineHeight:1.1, margin:'0 0 1.5rem' }}>
        High-Altitude Treks in Uttarakhand — Above 4,000 m
      </h1>

      {/* Quick-pick cards */}
      <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'1.5rem' }}>
        {[
          { label:'Expedition · 4,800 m', href:'/treks/location/lohajung/roopkund-trek', name:'Roopkund', desc:'7-day mystery-lake expedition. Sustained days above 4,000 m.' },
          { label:'Summit Climb · 4,590 m', href:'/treks/location/joshimath/pangarchulla-trek', name:'Pangarchulla', desc:'True peak summit — 360° Nanda Devi views. Crampons required.' },
          { label:'Gateway · 3,850 m', href:'/treks/location/lohajung/brahmatal-trek', name:'Brahmatal', desc:'First high-altitude experience. Moderate, gradual gain over 4 days.' },
        ].map(c => (
          <div key={c.href} style={{ background:'#fff', border:'1px solid #e5e7eb', borderLeft:'3px solid var(--color-primary)', borderRadius:'8px', padding:'1rem 1.25rem', fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', lineHeight:1.85, color:'#555' }}>
            <div style={{ fontSize: '0.75rem', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase' as const, color: '#374151', marginBottom:'0.35rem' }}>{c.label}</div>
            <span style={{ fontWeight:500, color:'#111' }}><Link href={c.href} style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>{c.name}</Link></span>{' '}
            <span style={{ fontWeight:300 }}>— {c.desc}</span>
          </div>
        ))}
      </div>

      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', margin:'0 0 1rem' }}>
        Above 4,000 metres, the Himalayan landscape changes fundamentally. Treeline gives way to exposed moraine and glacial terrain, oxygen pressure drops to levels that affect decision-making, and weather windows shrink to hours. These treks demand prior altitude experience, 6–8 weeks of structured fitness preparation, and genuine respect for mountain conditions. The reward: landscapes, views, and experiences that simply do not exist at lower elevations.
      </p>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', margin:0 }}>
        These routes are drawn from our <Link href={PARENT_PATH} style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>complete ranking of the 10 best treks in Uttarakhand</Link>. New to trekking? Start with the <Link href={`${PARENT_PATH}/beginner`} style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>beginner treks</Link> page instead.
      </p>
    </div>
  </section>

  {/* ── TREK CARDS ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)',  display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize: '0.75rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color: '#374151', fontWeight:500}}>Three Routes</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'2rem' }}>Three Altitude Experiences</h2>

      {/* Roopkund */}
      <div className="ha-card">
        <Image src="/Images/trek/challenging/roopkund_lake.webp" alt="Roopkund trek — glacial lake at 4800m in Garhwal Himalaya" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
        <div className="ha-card-body">
          <h2>Roopkund — 4,800 m — The Mystery Lake Expedition</h2>
          <div className="ha-pills">
            <span className="ha-pill">4,800 m</span>
            <span className="ha-pill" style={{ color:'#e65100', borderColor:'rgba(230,81,0,0.25)', background:'rgba(230,81,0,0.05)' }}>Challenging</span>
            <span className="ha-pill">7 days</span>
            <span className="ha-pill">May–Jun, Sep–Oct</span>
            <span className="ha-pill">Lohajung, Garhwal</span>
          </div>
          <p><Link href="/treks/location/lohajung/roopkund-trek" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>Roopkund</Link> is the highest featured trek and India&apos;s most iconic high-altitude route. A 53 km, 7-day expedition from Lohajung to a glacial lake at 4,800 metres, known for centuries-old skeletal remains at its shores. The route crosses the vast Bedni Bugyal alpine meadow (one of the largest in Asia), navigates moraine fields above 4,200 m, and demands sustained altitude tolerance across multiple days above 4,000 m.</p>
          <p><strong style={{ fontWeight:500, color:'#111' }}>Altitude profile:</strong> Gradual gain through forest (Day 1–2), exposed alpine meadow at 3,600 m (Day 3), moraine traverse above 4,200 m (Day 4–5), and the final lake approach at 4,800 m. Two full acclimatisation stops are built into the itinerary. The sustained time above 4,000 m — not just a single summit push — is what makes Roopkund uniquely demanding.</p>
        </div>
      </div>

      {/* Pangarchulla */}
      <div className="ha-card">
        <Image src="/Images/trek/challenging/pangarchulla.webp" alt="Pangarchulla peak — summit climb at 4590m from Joshimath" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
        <div className="ha-card-body">
          <h2>Pangarchulla — 4,590 m — The True Summit Climb</h2>
          <div className="ha-pills">
            <span className="ha-pill">4,590 m</span>
            <span className="ha-pill" style={{ color:'#e65100', borderColor:'rgba(230,81,0,0.25)', background:'rgba(230,81,0,0.05)' }}>Challenging</span>
            <span className="ha-pill">6 days</span>
            <span className="ha-pill">Mar–May</span>
            <span className="ha-pill">Joshimath, Garhwal</span>
          </div>
          <p><Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>Pangarchulla</Link> is one of the few accessible true peak summits in Uttarakhand — not a pass, not a lake, but the top of a mountain with 360-degree views of Nanda Devi, Dronagiri, Chaukhamba, and the entire Nanda Devi Sanctuary. The route follows the Kuari Pass approach before diverging toward a steep snow-and-scree ascent with an alpine-start summit day. Crampons required.</p>
          <p><strong style={{ fontWeight:500, color:'#111' }}>Altitude profile:</strong> The approach follows the moderate Kuari Pass trail (gradual gain to 3,400 m over 3 days), then diverts into steep, technical terrain. Summit day gains 1,200 m from high camp in a single push starting before dawn — the most physically demanding single day on any featured trek. The altitude is slightly lower than Roopkund, but the concentrated summit push is more intense.</p>
          <p>Choosing between the two Garhwal high-altitude routes? <Link href="/treks/roopkund-vs-pangarchulla" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>Compare Roopkund vs Pangarchulla →</Link></p>
        </div>
      </div>

      {/* Brahmatal */}
      <div className="ha-card">
        <Image src="/Images/trek/challenging/milamglacier.webp" alt="Brahmatal trek — frozen alpine lake at 3850m in Garhwal" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
        <div className="ha-card-body">
          <h2>Brahmatal — 3,850 m — Gateway to High Altitude</h2>
          <div className="ha-pills">
            <span className="ha-pill">3,850 m</span>
            <span className="ha-pill" style={{ color: '#374151', borderColor:'rgba(15,118,110,0.25)', background:'rgba(15,118,110,0.05)' }}>Moderate</span>
            <span className="ha-pill">4 days</span>
            <span className="ha-pill">Dec–Mar</span>
            <span className="ha-pill">Lohajung, Garhwal</span>
          </div>
          <p><Link href="/treks/location/lohajung/brahmatal-trek" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>Brahmatal</Link> is the recommended stepping stone before attempting Roopkund or Pangarchulla. At 3,850 m, it provides genuine high-altitude exposure (above treeline, reduced oxygen, cold) with moderate difficulty and gradual altitude gain. The 4-day duration means limited time at altitude — enough to test your body&apos;s response without the sustained multi-day exposure of the Challenging routes.</p>
          <p><strong style={{ fontWeight:500, color:'#111' }}>Why it matters as a stepping stone:</strong> If you handle 3,850 m well — no persistent headache, good sleep quality, maintained appetite — you are likely ready for Roopkund (4,800 m) or Pangarchulla (4,590 m) after additional fitness preparation. If altitude affects you significantly on Brahmatal, you know to invest more in acclimatisation before attempting higher routes.</p>
        </div>
      </div>

      {/* Callout */}
      <div style={{ background:'#f7f9f7', border:'1px solid #e5e7eb', borderLeft:'3px solid var(--color-primary)', borderRadius:'8px', padding:'1rem 1.25rem', marginTop:'1.5rem', fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555' }}>
        <strong style={{ fontWeight:500, color:'#111' }}>Choosing between the two challenging high-altitude routes?</strong>{' '}
        Our detailed <Link href="/treks/roopkund-vs-pangarchulla" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>Roopkund vs Pangarchulla comparison</Link> covers summit difficulty, fitness requirements, and seasonal windows in detail.
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
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'1.75rem' }}>High-Altitude Treks at a Glance</h2>
      <div style={{ overflowX:'auto', border:'1px solid #e5e7eb', borderRadius:'8px', background:'#fff' }}>
        <table className="ha-table" style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead><tr style={{ borderBottom:'2px solid #e5e7eb' }}>
            <th className="ha-th">Trek</th>
            <th className="ha-th">Max Altitude</th>
            <th className="ha-th">Difficulty</th>
            <th className="ha-th">Days</th>
            <th className="ha-th">Type</th>
          </tr></thead>
          <tbody>
            {[
              { href:'/treks/location/lohajung/roopkund-trek', name:'Roopkund', alt:'4,800 m', diff:'Challenging', days:'7', type:'Lake expedition', color:'#e65100' },
              { href:'/treks/location/joshimath/pangarchulla-trek', name:'Pangarchulla', alt:'4,590 m', diff:'Challenging', days:'6', type:'Peak summit', color:'#e65100' },
              { href:'/treks/location/lohajung/brahmatal-trek', name:'Brahmatal', alt:'3,850 m', diff:'Moderate', days:'4', type:'Frozen lake', color: '#374151' },
            ].map(r => (
              <tr key={r.href}>
                <td className="ha-td"><Link href={r.href} style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>{r.name}</Link></td>
                <td className="ha-td">{r.alt}</td>
                <td className="ha-td">
                  <span style={{ fontSize:'0.6rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase' as const, borderRadius:'100px', padding:'2px 10px', display:'inline-block', color: r.color, background: r.color === '#e65100' ? 'rgba(230,81,0,0.07)' : 'rgba(15,118,110,0.07)', border: `1px solid ${r.color === '#e65100' ? 'rgba(230,81,0,0.2)' : 'rgba(15,118,110,0.2)'}` }}>{r.diff}</span>
                </td>
                <td className="ha-td">{r.days}</td>
                <td className="ha-td">{r.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  {/* ── PREPARATION ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)',  display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize: '0.75rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color: '#374151', fontWeight:500}}>Preparation</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'1.75rem' }}>Preparing for High Altitude</h2>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginBottom:'1rem' }}>
        The single most important factor for safe high-altitude trekking is prior mountain experience. The recommended progression: Brahmatal (3,850 m) → Kedarkantha (3,810 m summit push) → Pangarchulla or Roopkund (4,500+ m). Each step tests your body&apos;s altitude response in progressively more demanding conditions.
      </p>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginBottom:0 }}>
        Physical preparation for routes above 4,000 m requires 6–8 weeks minimum: running or cycling (30–45 min, 4×/week), loaded stair climbing (15 kg pack, 2×/week), and core stability work. Our <Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>8-week fitness guide</Link> provides a week-by-week programme targeting Garhwal high-altitude routes specifically. For gear requirements, see the <Link href="/treks/garhwal-himalayas/packing-checklist" style={{ color: '#374151', textDecoration:'none', fontWeight:500 }}>packing checklist</Link> which includes a high-altitude section covering crampons, altitude medication, and layering for sustained cold.
      </p>
    </div>
  </section>

  <PrimaryCTA label="Plan a High-Altitude Trek" subtext="Share your altitude experience and preferred dates — we will recommend the right route." vertical="trek" category="filter-high-altitude" sourcePath={PATH} />

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
      <div className="ha-nav-group">
        <Link href={PARENT_PATH} className="ha-nav-link">← All 10 Best Treks in Uttarakhand</Link>
        <Link href={`${PARENT_PATH}/beginner`} className="ha-nav-link">Beginner Treks in Uttarakhand</Link>
        <Link href={`${PARENT_PATH}/snow`} className="ha-nav-link">Snow Treks in Uttarakhand</Link>
        <Link href={`${PARENT_PATH}/challenging`} className="ha-nav-link">Challenging Treks in Uttarakhand</Link>
        <Link href="/treks/garhwal-himalayas" className="ha-nav-link">Garhwal Himalayas — Complete Trekking Guide</Link>
      </div>
    </div>
  </section>

</TrackedPage>
  );
}
