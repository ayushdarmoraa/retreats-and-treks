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

const PATH = '/treks/summer-treks-uttarakhand';

export function generateMetadata(): Metadata {
  return {
    title: 'Best Summer Treks in Uttarakhand (May–June Guide) | Retreats And Treks',
    description:
      'Find the best summer treks in Uttarakhand for May and June. Har Ki Dun valley trek, Kedarkantha early-summer summit and Tiger Fall — guided Himalayan treks through green valleys and alpine meadows.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
  index: false,
  follow: true,
},
    openGraph: {
      title: 'Best Summer Treks in Uttarakhand — May–June Guide',
      description:
        'Summer treks in Uttarakhand from May to June. Valley walks, alpine meadows and snow-free summit routes across Sankri and Chakrata.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Best Summer Treks in Uttarakhand — May–June Guide'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is the best trek in Uttarakhand in May?',
    answer:
      'Har Ki Dun is the best trek in Uttarakhand in May. The valley is fully accessible after snow melt, alpine meadows are green and blooming, river crossings are manageable, and temperatures are comfortable at camp. The five-to-six-day route from Sankri through the Tons Valley offers the most complete summer trekking experience in the region — forest, village, meadow, and glacial valley in a single itinerary. Kedarkantha is also possible in early May with residual snow near the summit, offering a hybrid snow-and-green experience.',
  },
  {
    question: 'Are summer treks suitable for beginners?',
    answer:
      'Yes. Summer is the most beginner-friendly season for Himalayan trekking. Trails are dry, snow-free below 3,500 metres, and well-defined. Temperatures are comfortable — 10 to 20°C during the day at most elevations. Daylight hours are long, giving more time on the trail. Tiger Fall in Chakrata is the easiest summer option. Har Ki Dun requires moderate fitness but no technical skills. Kedarkantha in early summer is slightly more demanding due to residual snow but remains accessible to prepared first-timers.',
  },
  {
    question: 'Is Har Ki Dun better in summer or winter?',
    answer:
      'For most trekkers, summer is the better season for Har Ki Dun. The valley is green, wildflowers are blooming, rivers are flowing, and the trail is fully accessible without snow gear. Winter Har Ki Dun is spectacular but more demanding — colder temperatures, snow-covered trails, fewer operating groups, and potential road access issues. Summer gives you the full valley experience with maximum comfort and accessibility. Winter gives you isolation and snow drama but requires prior trekking experience.',
  },
  {
    question: 'Does Kedarkantha have snow in summer?',
    answer:
      'In early May, Kedarkantha typically retains snow above 3,200 metres — patchy on the trail and more substantial near the summit. By late May, snow has largely melted except on north-facing slopes near the peak. June is generally snow-free. The early-May window offers a unique hybrid experience: green forest at lower elevations transitioning to snow near the summit. This is the last opportunity for a snow summit before the trail becomes entirely green for the rest of summer.',
  },
  {
    question: 'What temperature does it reach on summer treks in Uttarakhand?',
    answer:
      'Daytime temperatures on summer treks range from 12 to 22°C depending on altitude. At Sankri base (1,920 metres), expect 18 to 22°C during the day and 8 to 12°C at night. At higher camps on Har Ki Dun or Kedarkantha (3,000 to 3,600 metres), daytime is 10 to 15°C and nighttime drops to 2 to 5°C. Summit mornings can be 0 to 5°C. Light layering is sufficient — thermal base layer for mornings and evenings, t-shirt during daytime walking, and a fleece or light jacket for camp.',
  },
];

export default function SummerTreksUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Summer Treks in Uttarakhand', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

    <style>{`
      .smt-body { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0 0 1rem; }
      .smt-h2 { font-family:var(--font-geist-sans),sans-serif; font-size:clamp(1.4rem,2.5vw,1.85rem); font-weight:200; letter-spacing:-0.03em; color:#111; line-height:1.15; margin:0 0 0.75rem; }
      .smt-h3 { font-family:var(--font-geist-sans),sans-serif; font-size:0.95rem; font-weight:500; color:#111; letter-spacing:-0.01em; margin:0 0 0.4rem; }
      .smt-eyebrow { display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem; }
      .smt-eyebrow-line { width:24px; height:1px; background:var(--color-primary);  display:inline-block; }
      .smt-eyebrow-text { font-size: 0.75rem; letter-spacing:0.28em; text-transform:uppercase; color: #374151; font-weight:500; }
      .smt-link { color: #374151; font-weight:500; text-decoration:none; border-bottom:1px solid rgba(15,118,110,0.25); }
      .smt-link:hover { border-bottom-color: #374151; }

      .smt-trek-card { background:#fff; border:1px solid #eef0ee; border-top:2px solid var(--color-primary); border-radius:8px; padding:1.25rem 1.5rem; margin-bottom:0.75rem; transition:transform 0.18s,box-shadow 0.18s; }
      .smt-trek-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,0.07); }
      .smt-trek-link { display:inline-flex; align-items:center; gap:0.3rem; font-size:0.75rem; font-weight:500; color: #374151; text-decoration:none; border-bottom:1px solid rgba(15,118,110,0.25); margin-top:0.5rem; }
      .smt-trek-link:hover { border-bottom-color: #374151; }

      .smt-why-item { border-left:2px solid var(--color-primary); padding-left:1rem; margin-bottom:1.25rem; }
      .smt-why-item strong { display:block; font-size:0.82rem; font-weight:500; color:#111; margin-bottom:0.2rem; }

      .smt-who-item { display:flex; gap:0.75rem; padding:0.85rem 0; border-bottom:1px solid #f0f0f0; }
      .smt-who-item:last-child { border-bottom:none; }
      .smt-who-dot { width:6px; height:6px; border-radius:50%; background:var(--color-primary); flex-shrink:0; margin-top:0.75rem;  }

      .smt-callout { background:#fff; border:1px solid #e5e7eb; border-left:3px solid var(--color-primary); border-radius:8px; padding:1rem 1.25rem; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; }
      .smt-callout a { color: #374151; font-weight:500; text-decoration:none; border-bottom:1px solid rgba(15,118,110,0.25); }

      @media(max-width:700px){ .smt-trek-card { padding:1rem; } }
    `}</style>

    <Breadcrumb items={[{ name:'Home', href:'/' }, { name:'Treks', href:'/treks' }, { name:'Summer Treks in Uttarakhand' }]} />

    <article>

      {/* ── HERO ── */}
      <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
        <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
          <div className="smt-eyebrow">
            <span className="smt-eyebrow-line" />
            <span className="smt-eyebrow-text">Summer Treks · Uttarakhand · May–June</span>
          </div>
          <h1 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.4rem)', fontWeight:200, letterSpacing:'-0.035em', color:'#111', lineHeight:1.1, margin:'0 0 1.5rem' }}>
            Best Summer Treks in Uttarakhand (May–June Guide)
          </h1>
          <p className="smt-body" style={{ margin:'0 0 1rem' }}>
            While the plains bake above 40°C, the Himalayan trails of Uttarakhand sit
            between 10 and 20 degrees — green, clear, and open. May and June are the peak
            summer trekking months: snow has melted from the valleys, alpine meadows are
            blooming, rivers are full, and visibility across the high ranges is sharp.
            These are the months when the mountains are at their most accessible and their
            most alive.
          </p>
          <p className="smt-body" style={{ margin:0 }}>
            Summer trekking is the opposite of{' '}
            <Link href="/treks/winter-treks-uttarakhand" className="smt-link">winter treks in Uttarakhand</Link>.
            No snow gear. No sub-zero camps. No short daylight windows. Instead: long
            warm days, wildflower meadows, flowing streams, and trails that are dry, defined,
            and forgiving. If winter is about drama and challenge, summer is about depth and
            comfort — the landscape opens up, and you walk through it at a pace that allows
            you to actually see it.
          </p>
        </div>
      </section>

      {/* ── CTA 1 ── */}
      <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'3rem', paddingBottom:'3rem', borderBottom:'1px solid #e5e7eb' }}>
        <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
          <PrimaryCTA label="Plan My Summer Trek" subtext="Exploring summer treks? Let us help you find the right fit." vertical="trek" category="seasonal" sourcePath="/treks/summer-treks-uttarakhand" />
        </div>
      </section>

      {/* ── WHY SUMMER ── */}
      <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
        <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
          <div className="smt-eyebrow"><span className="smt-eyebrow-line" /><span className="smt-eyebrow-text">Why Summer</span></div>
          <h2 className="smt-h2">Why Summer Is Ideal for Treks in Uttarakhand</h2>
          <p className="smt-body">
            Summer is the widest window for Himalayan trekking — not just because the
            weather is comfortable, but because the terrain itself becomes more navigable.
            Unlike winter treks in Uttarakhand, summer routes are largely snow-free below
            3,500 metres — trails that are buried under snow from December to February are
            now clear. Valleys that are sealed by frozen rivers are open and walkable. The
            mountains do not change, but your access to them does.
          </p>
          <div className="smt-why-item">
            <strong>Snow-melt access.</strong>
            <p className="smt-body" style={{ margin:0 }}>By May, snow has cleared below 3,000 metres on most trails. This opens the full range of valley treks — including Har Ki Dun — that are inaccessible or snow-dependent in winter. Stream crossings are manageable in May and early June before monsoon swells them.</p>
          </div>
          <div className="smt-why-item">
            <strong>Clear mountain views.</strong>
            <p className="smt-body" style={{ margin:0 }}>Pre-monsoon air is often the clearest of the year. Morning visibility from ridges and high camps can extend beyond 200 kilometres — across the Swargarohini, Bandarpoonch, and Gangotri groups. The combination of clear air and long daylight makes summer the best season for mountain photography after post-monsoon autumn.</p>
          </div>
          <div className="smt-why-item">
            <strong>Comfortable temperatures.</strong>
            <p className="smt-body" style={{ margin:0 }}>Daytime temperatures at trekking altitude (2,000 to 3,500 metres) range from 10 to 22°C. Nights are cool but not cold — 2 to 10°C at camp. No thermal base layers needed during the day. A light fleece for mornings and evenings is sufficient. The physical comfort allows longer trail hours and more relaxed pacing.</p>
          </div>
          <div className="smt-why-item">
            <strong>Valley greenery.</strong>
            <p className="smt-body" style={{ margin:0 }}>This is the season when the Himalayas are most visually lush. Rhododendron blooms at lower elevations give way to alpine wildflowers above the tree line. The forest canopy is full and shading. Rivers run clear and blue before the monsoon muddies them. The landscape feels abundant in a way that no other season matches.</p>
          </div>
        </div>
      </section>

      {/* ── CTA 2 ── */}
      <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'3rem', paddingBottom:'3rem', borderBottom:'1px solid #e5e7eb' }}>
        <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
          <PrimaryCTA label="Plan My Summer Trek" subtext="Share your dates and preferences. We will recommend the best summer route." vertical="trek" category="seasonal" sourcePath="/treks/summer-treks-uttarakhand" />
        </div>
      </section>

      {/* ── BEST SUMMER TREKS ── */}
      <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
        <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
          <div className="smt-eyebrow"><span className="smt-eyebrow-line" /><span className="smt-eyebrow-text">The Treks</span></div>
          <h2 className="smt-h2">Best Summer Treks in Uttarakhand</h2>
          <p className="smt-body">Three treks define the summer season — each suited to a different duration, fitness level, and type of landscape experience.</p>

          <div className="smt-trek-card">
            <h3 className="smt-h3">Har Ki Dun Trek — The Classic Summer Valley</h3>
            <p className="smt-body" style={{ margin:'0.5rem 0 0.5rem' }}>
              The <Link href="/treks/location/sankri/har-ki-dun-trek" className="smt-link">Har Ki Dun Trek</Link> is the definitive summer trek in Uttarakhand. Five to six days through the ancient Tons Valley — from the <Link href="/treks/location/sankri" className="smt-link">Sankri trek base</Link> through traditional Himalayan villages, across wooden bridges over glacial streams, through dense forest and open meadow, and into the vast Har Ki Dun valley itself — a natural amphitheatre surrounded by 5,000-metre peaks.
            </p>
            <p className="smt-body" style={{ margin:0 }}>
              In summer, the valley is green and flowering. The river runs clear. The meadows that are snow fields in winter become carpets of wildflowers in May and June. The trail is dry, well-defined, and comfortable to walk. This is Har Ki Dun at its most accessible and its most beautiful. The altitude stays below 3,600 metres throughout, and the gradient is gentle enough for <Link href="/treks/beginner-treks-uttarakhand" className="smt-link">easy Himalayan treks</Link>. No technical sections. No snow gear. Just sustained walking through progressively more spectacular terrain.
            </p>
          </div>

          <div className="smt-trek-card">
            <h3 className="smt-h3">Kedarkantha Trek — Early Summer Summit</h3>
            <p className="smt-body" style={{ margin:'0.5rem 0 0.5rem' }}>
              The <Link href="/treks/location/sankri/kedarkantha-trek" className="smt-link">Kedarkantha Trek</Link> is primarily a winter route, but early May offers a unique hybrid window. The lower trail (1,920 to 2,800 metres) is green — oak and pine forest in full canopy, rhododendrons blooming, birdsong filling the clearings. Above 3,200 metres, patchy snow remains on north-facing slopes and thickens near the 3,800-metre summit—giving you a snow summit experience without the full winter commitment.
            </p>
            <p className="smt-body" style={{ margin:0 }}>
              By late May, the snow has largely melted and the trail becomes a green ridge walk with panoramic views. June is snow-free. The early-May window is the narrow sweet spot: warm enough for comfortable camping, cold enough for a snow summit, and clear enough for the full Himalayan panorama from the peak. Four days from <Link href="/treks/location/sankri" className="smt-link">Sankri summer treks</Link>. Same guided format as winter, lighter gear requirements.
            </p>
          </div>

          <div className="smt-trek-card">
            <h3 className="smt-h3">Tiger Fall Trek — Short Summer Escape</h3>
            <p className="smt-body" style={{ margin:'0.5rem 0 0.5rem' }}>
              The <Link href="/treks/location/chakrata/tiger-fall-trek" className="smt-link">Tiger Fall Trek in Chakrata</Link> is the lowest-commitment summer trek in the region. Twelve kilometres through dense deodar and oak forest to one of the area&apos;s highest direct waterfalls. The forest canopy keeps the trail shaded and cool even when May temperatures rise — the experience of walking through a natural air-conditioned corridor while plains cities swelter outside.
            </p>
            <p className="smt-body" style={{ margin:0 }}>
              Completable in a single day or a comfortable overnight format. Based in <Link href="/treks/location/chakrata" className="smt-link">Chakrata</Link>, six to seven hours from Delhi. The waterfall volume builds through May and peaks in monsoon — late May and early June offer the best combination of trail conditions and waterfall flow. For <Link href="/treks/trek-near-delhi" className="smt-link">weekend treks near Delhi</Link>, this is the most practical summer option.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD CHOOSE ── */}
      <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
        <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
          <div className="smt-eyebrow"><span className="smt-eyebrow-line" /><span className="smt-eyebrow-text">Who It's For</span></div>
          <h2 className="smt-h2">Who Should Choose a Summer Trek?</h2>
          <div style={{ border:'1px solid #eef0ee', borderRadius:8, overflow:'hidden' }}>
            {[
              { label:'First-timers.', body:'Summer is the most forgiving season for a first Himalayan trek. Comfortable temperatures, dry trails, long daylight, and no snow gear requirements. The learning curve is gentler — you focus on walking, not on managing cold. If you have never trekked before, May or June is the time to start.' },
              { label:'Students.', body:'Summer vacation aligns perfectly with the trekking window. May and June are school and university holidays — the most practical months for student groups. Kedarkantha or Har Ki Dun in a guided group is affordable, social, and delivers an experience that no beach holiday or city break can match.' },
              { label:'Corporate groups.', body:'A summer trek is the most logistically simple team-building format. No cold-weather gear procurement, no layering complexity, no summit-day risk management. Chakrata works for weekend formats. Har Ki Dun works for immersive five-day programmes. The operational burden on organisers is lower in summer than any other season.' },
              { label:'Couples.', body:'Long daylight, warm evenings, wildflower meadows, and mountain views without the austerity of winter. Summer treks are the most romantic format — campfire dinners under clear skies, sunrise from ridge camps, and the shared rhythm of walking through beautiful terrain without urgency.' },
            ].map((item, i, arr) => (
              <div key={i} className="smt-who-item" style={{ padding:'0.9rem 1rem', borderBottom: i < arr.length-1 ? '1px solid #f0f0f0' : 'none', display:'flex', gap:'0.75rem' }}>
                <span className="smt-who-dot" />
                <p className="smt-body" style={{ margin:0 }}><strong style={{ fontWeight:500, color:'#111' }}>{item.label}</strong> {item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ── */}
      <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
        <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
          <div className="smt-eyebrow"><span className="smt-eyebrow-line" /><span className="smt-eyebrow-text">What to Expect</span></div>
          <h2 className="smt-h2">What to Expect on a Summer Trek</h2>
          <p className="smt-body">Summer trekking in the Himalayas is physically more comfortable than winter but has its own character. Knowing what to expect helps you prepare accurately.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            {[
              { label:'Stream crossings.', body:'Snow melt feeds the rivers and streams along the trail. In May, most crossings are manageable — ankle to knee depth on stepping stones or wooden bridges. By mid-June, water levels rise as monsoon approaches. Waterproof boots or sandals for crossings are recommended. Guided groups assess crossing conditions daily and adjust routes if needed.' },
              { label:'Warmer nights.', body:'Summer camps are substantially more comfortable than winter. Temperatures at 3,000 metres hover around 3 to 8°C overnight — a light sleeping bag and fleece layer are sufficient. No need for down jackets or heavy insulation at camp. The evenings are pleasant enough for extended campfire time without retreating to tents.' },
              { label:'Longer daylight.', body:'Approximately 13 hours of usable light in May and June. This means later starts (7:30 to 8 AM), longer trail breaks, and more time at viewpoints and water stops. Summit attempts do not require pre-dawn departures. The pace is inherently more relaxed than winter trekking.' },
              { label:'Alpine meadows.', body:'Above the tree line (2,800 to 3,200 metres), the terrain opens into vast alpine meadows — known locally as bugiyals. In summer, these are carpeted with wildflowers: primula, potentilla, anemone, and dozens of species specific to the western Himalayas. The meadows are the visual highlight of summer trekking and unique to this season.' },
            ].map((item, i) => (
              <div key={i} className="smt-why-item">
                <strong>{item.label}</strong>
                <p className="smt-body" style={{ margin:0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMERCIAL NAV ── */}
      <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'3rem', paddingBottom:'3rem', borderBottom:'1px solid #e5e7eb' }}>
        <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
          <div className="smt-callout">
            <p style={{ margin:0, fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555' }}>
              Exploring all seasons, difficulty levels, and routes? See the full{' '}
              <Link href="/treks" className="smt-link">Himalayan treks directory</Link>{' '}
              for guided itineraries across Uttarakhand.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem' }}>
        <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
          <div className="smt-eyebrow"><span className="smt-eyebrow-line" /><span className="smt-eyebrow-text">FAQ</span></div>
          <h2 className="smt-h2" style={{ marginBottom:'1.75rem' }}>Frequently Asked Questions</h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

    </article>
  </TrackedPage>
  );
}
