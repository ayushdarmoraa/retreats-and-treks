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

const PATH = '/treks/best-treks-in-uttarakhand/challenging';
const PARENT_PATH = '/treks/best-treks-in-uttarakhand';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Most Challenging Treks in Uttarakhand (2025) — Difficult Routes',
    description:
      'The 3 most challenging treks in Uttarakhand for experienced trekkers. Roopkund, Pangarchulla, and Milam Glacier — difficulty analysis, fitness requirements, and route comparison.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the most difficult trek in Uttarakhand?',
    answer:
      'Milam Glacier is the most demanding in terms of sustained commitment — 8–10 days, 118 km, through remote Kumaon terrain with limited evacuation options. Roopkund is the most demanding in terms of altitude (4,800 m with multiple days above 4,000 m). Pangarchulla has the most intense single day — a 1,200 m alpine-start summit push through snow.',
  },
  {
    question: 'What experience do I need for challenging treks?',
    answer:
      'Prior high-altitude experience above 3,500 m is essential — ideally Kedarkantha, Kuari Pass, or Brahmatal. You should have completed at least 2–3 multi-day treks and be comfortable with camping, cold weather, and sustained physical effort across 6–8 hours per day.',
  },
  {
    question: 'How fit do I need to be for Roopkund or Pangarchulla?',
    answer:
      '6–8 weeks of structured preparation: running/cycling 30–45 min 4x/week, loaded stair climbing (15 kg pack) 2x/week, and core stability work. You should be able to run 5 km in under 30 minutes and climb 60 floors in an hour with a loaded pack before attempting either route.',
  },
  {
    question: 'Which challenging trek should I do first — Roopkund or Pangarchulla?',
    answer:
      'Pangarchulla if you prefer a concentrated summit challenge (one very hard day). Roopkund if you prefer sustained expedition-style trekking (multiple days above 4,000 m). Both require similar fitness, but the physical demands are distributed differently.',
  },
];

const BREADCRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Treks', href: '/treks' },
  { name: 'Best Treks in Uttarakhand', href: PARENT_PATH },
  { name: 'Challenging Treks' },
];

export default function ChallengingTreksPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Best Treks in Uttarakhand', url: buildCanonicalUrl(PARENT_PATH) },
    { name: 'Challenging Treks', url: buildCanonicalUrl(PATH) },
  ]);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Most Challenging Treks in Uttarakhand',
        description:
          'Curated selection of difficult treks in Uttarakhand for experienced trekkers — Roopkund, Pangarchulla, and Milam Glacier.',
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
          { '@type': 'ListItem', position: 1, name: 'Roopkund Trek', url: buildCanonicalUrl('/treks/location/lohajung/roopkund-trek') },
          { '@type': 'ListItem', position: 2, name: 'Pangarchulla Peak Trek', url: buildCanonicalUrl('/treks/location/joshimath/pangarchulla-trek') },
          { '@type': 'ListItem', position: 3, name: 'Milam Glacier Trek', url: buildCanonicalUrl('/treks/location/munsiyari/milam-glacier-trek') },
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
    .chal-card { background:#fff; border:1px solid #e5e7eb; border-top:2px solid #e65100; border-radius:8px; overflow:hidden; margin-bottom:1.25rem; }
    .chal-card:last-of-type { margin-bottom:0; }
    .chal-card img { width:100%; height:200px; object-fit:cover; display:block; }
    .chal-card-body { padding:1.5rem; }
    .chal-card-body h2 { font-family:var(--font-geist-sans),sans-serif; font-size:0.95rem; font-weight:500; color:#111; margin:0 0 0.85rem; letter-spacing:-0.01em; }
    .chal-card-body p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0 0 0.75rem; }
    .chal-card-body p:last-child { margin-bottom:0; }
    .chal-pills { display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:1rem; }
    .chal-pill { font-family:var(--font-geist-sans),sans-serif; font-size:0.68rem; color:#555; background:#f7f9f7; border:1px solid #e5e7eb; border-radius:100px; padding:3px 10px; }
    .chal-th { font-family:var(--font-geist-sans),sans-serif; font-size:0.55rem; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:var(--color-primary); opacity:0.7; padding:0.75rem 1rem; text-align:left; }
    .chal-td { font-family:var(--font-geist-sans),sans-serif; font-size:0.84rem; font-weight:300; color:#444; padding:0.75rem 1rem; border-bottom:1px solid #f0f0f0; }
    .chal-table tbody tr:last-child td { border-bottom:none; }
    .chal-table tbody tr:hover td { background:#f7f9f7; }
    .chal-nav-link { display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1rem; border-bottom:1px solid #f0f0f0; font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; color:#333; text-decoration:none; }
    .chal-nav-link:hover { background:#f7f9f7; color:var(--color-primary); }
    .chal-nav-link::after { content:'→'; color:var(--color-primary); opacity:0.5; }
    .chal-nav-group { border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; }
    .chal-nav-group .chal-nav-link:last-child { border-bottom:none; }
    @media(max-width:640px){
      .chal-card img { height:160px; }
      .chal-card-body { padding:1.1rem; }
      .chal-td:nth-child(4), .chal-th:nth-child(4),
      .chal-td:nth-child(5), .chal-th:nth-child(5) { display:none; }
    }
  `}</style>

  {/* HERO */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <Breadcrumb items={BREADCRUMBS} />
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', margin:'1.5rem 0 1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Challenging Treks · Uttarakhand</span>
      </div>
      <h1 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.4rem)', fontWeight:200, letterSpacing:'-0.035em', color:'#111', lineHeight:1.1, margin:'0 0 1.5rem' }}>
        Most Challenging Treks in Uttarakhand
      </h1>

      {/* 3 quick-pick cards */}
      <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'1.5rem' }}>
        {[
          { label:'Sustained High Altitude', href:'/treks/location/lohajung/roopkund-trek', name:'Roopkund', desc:'7 days, 4,800 m — multi-day expedition above 4,000 m.' },
          { label:'Intense Summit Push', href:'/treks/location/joshimath/pangarchulla-trek', name:'Pangarchulla', desc:'6 days, 4,590 m — alpine-start summit climb with crampons.' },
          { label:'Remote Expedition', href:'/treks/location/munsiyari/milam-glacier-trek', name:'Milam Glacier', desc:'8–10 days along the ancient Johar Valley trade route.' },
        ].map(c => (
          <div key={c.href} style={{ background:'#fff', border:'1px solid #e5e7eb', borderLeft:'3px solid #e65100', borderRadius:'8px', padding:'1rem 1.25rem', fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', lineHeight:1.85, color:'#555' }}>
            <div style={{ fontSize:'0.55rem', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase' as const, color:'#e65100', opacity:0.8, marginBottom:'0.35rem' }}>{c.label}</div>
            <span style={{ fontWeight:500, color:'#111' }}><Link href={c.href} style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>{c.name}</Link></span>{' '}
            <span style={{ fontWeight:300 }}>— {c.desc}</span>
          </div>
        ))}
      </div>

      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', margin:'0 0 1rem' }}>
        These are not enhanced day hikes. They are serious mountain routes where preparation directly determines safety and enjoyment. All three require prior high-altitude experience (above 3,500 m), 6–8 weeks of structured fitness work, and comfort with steep, exposed, and potentially snow-covered terrain. Each offers a fundamentally different type of challenge — from sustained expedition endurance to a single do-or-die summit push.
      </p>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', margin:0 }}>
        These routes are drawn from our <Link href={PARENT_PATH} style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>complete ranking of the 10 best treks in Uttarakhand</Link>. Not ready for challenging routes yet? The <Link href={`${PARENT_PATH}/beginner`} style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>beginner treks</Link> page covers easy and moderate alternatives.
      </p>
    </div>
  </section>

  {/* TREK CARDS */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Three Routes</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'2rem' }}>Three Different Types of Challenge</h2>

      {/* Roopkund */}
      <div className="chal-card">
        <Image src="/Images/trek/challenging/roopkund_lake.webp" alt="Roopkund trek — glacial lake at 4800m in Garhwal Himalaya" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
        <div className="chal-card-body">
          <h2>Roopkund — The Mystery Lake Expedition</h2>
          <div className="chal-pills">
            <span className="chal-pill">4,800 m</span>
            <span className="chal-pill" style={{ color:'#e65100', borderColor:'rgba(230,81,0,0.25)', background:'rgba(230,81,0,0.05)' }}>Challenging</span>
            <span className="chal-pill">7 days</span>
            <span className="chal-pill">May–Jun, Sep–Oct</span>
            <span className="chal-pill">Lohajung, Garhwal</span>
          </div>
          <p><Link href="/treks/location/lohajung/roopkund-trek" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>Roopkund</Link> is India&apos;s most iconic high-altitude trek — a 53 km expedition from Lohajung to a glacial lake at 4,800 metres, known for the centuries-old skeletal remains at its shores. The route crosses the vast Bedni Bugyal alpine meadow, navigates moraine fields, and demands sustained altitude tolerance across multiple days above 4,000 metres. The Bugyal alone — stretching kilometres in every direction with Trishul views — justifies the effort.</p>
          <p><strong style={{ fontWeight:500, color:'#111' }}>Why it is challenging:</strong> Unlike Pangarchulla (where the difficulty concentrates in a single summit day), Roopkund distributes its demands across 7 days with sustained exposure above 4,000 m. Altitude sickness risk is cumulative. The moraine fields above 4,200 m require careful foot placement for hours at a time. Weather deteriorates rapidly above the Bugyal. This is expedition trekking, not a weekend challenge.</p>
        </div>
      </div>

      {/* Pangarchulla */}
      <div className="chal-card">
        <Image src="/Images/trek/challenging/pangarchulla.webp" alt="Pangarchulla peak — summit climb at 4590m from Joshimath" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
        <div className="chal-card-body">
          <h2>Pangarchulla Peak — The Summit Climb</h2>
          <div className="chal-pills">
            <span className="chal-pill">4,590 m</span>
            <span className="chal-pill" style={{ color:'#e65100', borderColor:'rgba(230,81,0,0.25)', background:'rgba(230,81,0,0.05)' }}>Challenging</span>
            <span className="chal-pill">6 days</span>
            <span className="chal-pill">Mar–May</span>
            <span className="chal-pill">Joshimath, Garhwal</span>
          </div>
          <p><Link href="/treks/location/joshimath/pangarchulla-trek" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>Pangarchulla</Link> is one of the few accessible true summit experiences in Uttarakhand. The route follows the Kuari Pass approach before diverging toward a steep snow-and-scree ascent with an alpine start. At the top: a 360-degree panorama of Nanda Devi, Dronagiri, Chaukhamba, and the entire Nanda Devi Sanctuary. Crampons required. For experienced trekkers who want to stand on a peak, not a pass.</p>
          <p><strong style={{ fontWeight:500, color:'#111' }}>Why it is challenging:</strong> Summit day gains 1,200 m from high camp in a single alpine-start push beginning before dawn. The snow-and-scree terrain above 4,200 m requires crampons and confident movement on steep ground. The rest of the approach (Days 1–4 via the Kuari Pass trail) is moderate — the difficulty is concentrated into one relentless day.</p>
          <p>Choosing between the two Garhwal challenges? <Link href="/treks/roopkund-vs-pangarchulla" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>Compare Roopkund vs Pangarchulla →</Link></p>
        </div>
      </div>

      {/* Milam Glacier */}
      <div className="chal-card">
        <Image src="/Images/trek/challenging/milamglacier.webp" alt="Milam Glacier trek — remote Johar Valley expedition from Munsiyari" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
        <div className="chal-card-body">
          <h2>Milam Glacier — The Remote Expedition</h2>
          <div className="chal-pills">
            <span className="chal-pill">3,450 m</span>
            <span className="chal-pill" style={{ color:'#e65100', borderColor:'rgba(230,81,0,0.25)', background:'rgba(230,81,0,0.05)' }}>Challenging</span>
            <span className="chal-pill">8–10 days</span>
            <span className="chal-pill">May–Jun, Sep–Oct</span>
            <span className="chal-pill">Munsiyari, Kumaon</span>
          </div>
          <p><Link href="/treks/location/munsiyari/milam-glacier-trek" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>Milam Glacier</Link> is Uttarakhand&apos;s great expedition trek — an 8–10 day, 118 km journey along the ancient Johar Valley trade route from Munsiyari to the glacier snout beneath the Panchachuli massif. The route passes through abandoned Bhotiya trading villages (Martoli, Burfu), crosses glacial moraines, and follows the Goriganga River into genuinely wild terrain.</p>
          <p><strong style={{ fontWeight:500, color:'#111' }}>Why it is challenging:</strong> The altitude is lower than Roopkund (3,450 m max), but the sustained 8–10 day commitment through remote terrain with limited evacuation options makes it equally demanding. You are walking deep into the mountains — days from the nearest road — with river crossings, moraines, and unpredictable weather. This is for trekkers who want genuine wilderness immersion, not a curated mountain experience.</p>
        </div>
      </div>

      {/* Callout */}
      <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginTop:'1.5rem' }}>
        <div style={{ background:'#f7f9f7', border:'1px solid #e5e7eb', borderLeft:'3px solid #e65100', borderRadius:'8px', padding:'1rem 1.25rem', fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', lineHeight:1.85, color:'#555' }}>
          <div style={{ fontSize:'0.55rem', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase' as const, color:'#e65100', opacity:0.8, marginBottom:'0.35rem' }}>Still Deciding?</div>
          <span style={{ fontWeight:500, color:'#111' }}>Roopkund vs Pangarchulla</span>{' '}
          <span style={{ fontWeight:300 }}>— sustained altitude vs intense summit push. </span>
          <Link href="/treks/roopkund-vs-pangarchulla" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>See full comparison →</Link>
        </div>
      </div>
    </div>
  </section>

  {/* COMPARISON TABLE */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Quick Comparison</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'1.75rem' }}>Challenging Treks at a Glance</h2>
      <div style={{ overflowX:'auto', border:'1px solid #e5e7eb', borderRadius:'8px', background:'#fff' }}>
        <table className="chal-table" style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead><tr style={{ borderBottom:'2px solid #e5e7eb' }}>
            <th className="chal-th">Trek</th>
            <th className="chal-th">Max Altitude</th>
            <th className="chal-th">Days</th>
            <th className="chal-th">Challenge Type</th>
            <th className="chal-th">Region</th>
          </tr></thead>
          <tbody>
            {[
              { href:'/treks/location/lohajung/roopkund-trek', name:'Roopkund', alt:'4,800 m', days:'7', type:'Sustained altitude', region:'Garhwal' },
              { href:'/treks/location/joshimath/pangarchulla-trek', name:'Pangarchulla', alt:'4,590 m', days:'6', type:'Intense summit push', region:'Garhwal' },
              { href:'/treks/location/munsiyari/milam-glacier-trek', name:'Milam Glacier', alt:'3,450 m', days:'8–10', type:'Remote endurance', region:'Kumaon' },
            ].map(r => (
              <tr key={r.href}>
                <td className="chal-td"><Link href={r.href} style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>{r.name}</Link></td>
                <td className="chal-td">{r.alt}</td>
                <td className="chal-td">{r.days}</td>
                <td className="chal-td">{r.type}</td>
                <td className="chal-td">{r.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  {/* PREPARATION PATH */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Progression</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'0.75rem' }}>The Path to Challenging Treks</h2>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginBottom:'1.5rem' }}>
        Attempting a challenging trek without proper progression increases both risk and misery. The recommended build-up:
      </p>
      {[
        { num:'01', label:'First multi-day', body: <><Link href="/treks/location/lohajung/brahmatal-trek" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>Brahmatal</Link> or <Link href="/treks/location/joshimath/kuari-pass-trek" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>Kuari Pass</Link> — tests altitude response at 3,850–3,876 m.</> },
        { num:'02', label:'Summit experience', body: <><Link href="/treks/location/sankri/kedarkantha-trek" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>Kedarkantha</Link> — adds a genuine summit push and snow conditions.</> },
        { num:'03', label:'Challenging route', body: <>Pangarchulla, Roopkund, or Milam Glacier — full high-altitude or expedition demands.</> },
      ].map((step, i, arr) => (
        <div key={step.num} style={{ display:'flex', gap:'1.5rem', position:'relative' as const }}>
          {i < arr.length - 1 && <div style={{ position:'absolute' as const, left:'19px', top:'28px', width:'2px', height:'calc(100% - 4px)', background:'linear-gradient(to bottom, rgba(15,118,110,0.2), transparent)' }} />}
          <div style={{ flexShrink:0, marginTop:'0.35rem' }}>
            <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'var(--color-primary)' }} />
          </div>
          <div style={{ paddingBottom:'1.5rem' }}>
            <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.55rem', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase' as const, color:'var(--color-primary)', opacity:0.6, margin:'0 0 0.25rem' }}>{step.num}</p>
            <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:500, color:'#111', margin:'0 0 0.25rem' }}>{step.label}</p>
            <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', margin:0 }}>{step.body}</p>
          </div>
        </div>
      ))}
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginTop:'0.5rem', marginBottom:0 }}>
        For the complete progression framework with training plans for each level, see our <Link href="/blog/beginner-to-advanced-trek-progression-garhwal" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>beginner-to-advanced trek progression guide</Link> and the <Link href="/treks/garhwal-himalayas/fitness-guide" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>8-week fitness preparation plan</Link>.
      </p>
    </div>
  </section>

  <PrimaryCTA label="Plan a Challenging Trek" subtext="Share your trekking history and preferred dates — we will match you with the right route." vertical="trek" category="filter-challenging" sourcePath={PATH} />

  {/* FAQ */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>FAQ</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'1.75rem' }}>Frequently Asked Questions</h2>
      <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
    </div>
  </section>

  {/* BROWSE */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Explore More</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'1.75rem' }}>Browse by Category</h2>
      <div className="chal-nav-group">
        <Link href={PARENT_PATH} className="chal-nav-link">← All 10 Best Treks in Uttarakhand</Link>
        <Link href={`${PARENT_PATH}/beginner`} className="chal-nav-link">Beginner Treks in Uttarakhand</Link>
        <Link href={`${PARENT_PATH}/snow`} className="chal-nav-link">Snow Treks in Uttarakhand</Link>
        <Link href={`${PARENT_PATH}/high-altitude`} className="chal-nav-link">High-Altitude Treks Above 4,000 m</Link>
        <Link href="/treks/roopkund-vs-pangarchulla" className="chal-nav-link">Roopkund vs Pangarchulla — Full Comparison</Link>
      </div>
    </div>
  </section>

</TrackedPage>
  );
}
