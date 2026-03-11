import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';

const PATH = '/treks/3-day-treks-uttarakhand';

export function generateMetadata(): Metadata {
  return {
    title: 'Best 3-Day Treks in Uttarakhand — Short Himalayan Treks (2N/3D) | Retreats And Treks',
    description:
      'Find the best 3-day treks in Uttarakhand including Tiger Fall, Budher Caves and short-format Kedarkantha. Weekend Himalayan treks within driving distance of Delhi.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Best 3-Day Treks in Uttarakhand',
      description:
        'Short Himalayan treks in Uttarakhand — 2 nights, 3 days. Forest trails, waterfall treks and cave explorations across Chakrata and Sankri, drivable from Delhi.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is the best 3-day trek in Uttarakhand?',
    answer:
      'The Tiger Fall Trek in Chakrata is the best 3-day trek in Uttarakhand for most people. It combines a well-graded forest trail, a spectacular waterfall destination, and comfortable overnight camping — all within a 2-night, 3-day format that fits a long weekend. For trekkers wanting a cave exploration component, the Budher Caves Trek offers a distinctive alternative in the same region. For experienced trekkers seeking a summit, the compressed Kedarkantha itinerary is possible in three days but requires strong fitness.',
  },
  {
    question: 'Can Kedarkantha be done in 3 days?',
    answer:
      'Yes, but it is not the standard format. The standard Kedarkantha itinerary is four days with a gradual acclimatisation schedule. A compressed three-day version is possible by combining the first two days into one longer trek day — covering the distance from Sankri to Juda Ka Talab and then to the base camp in a single push. This requires above-average fitness and fast acclimatisation. Most guided operators offer the four-day format as default. The three-day option is best suited for trekkers with prior Himalayan experience.',
  },
  {
    question: 'Are 3-day treks beginner-friendly?',
    answer:
      'Yes. Three-day treks are the ideal introduction to Himalayan trekking. The duration is short enough that fatigue does not accumulate, but long enough for genuine mountain immersion — forest trails, overnight camping, and summit or waterfall destinations. Tiger Fall and Budher Caves in Chakrata require no prior trekking experience. Basic fitness — the ability to walk four to five hours per day on uneven terrain — is sufficient.',
  },
  {
    question: 'What is the closest 3-day trek to Delhi?',
    answer:
      'The Tiger Fall Trek in Chakrata is the closest quality 3-day trek to Delhi. Chakrata is approximately 320 km from Delhi — six to seven hours by road. You can depart Friday evening, trek Saturday and Sunday, and return Sunday evening or Monday morning. Sankri-based treks are eight to nine hours from Delhi and work within a three-day format if you depart Thursday evening or early Friday morning.',
  },
  {
    question: 'What fitness level is required for a 3-day trek?',
    answer:
      'Moderate baseline fitness is sufficient for Chakrata treks — Tiger Fall and Budher Caves. If you can walk comfortably for four to five hours on uneven terrain and climb five flights of stairs without stopping, you have the foundation. The compressed Kedarkantha requires higher fitness: the ability to walk six to eight hours per day with altitude gain. Two to three weeks of daily walking or light jogging before the trek is recommended preparation for any format.',
  },
];

export default function ThreeDayTreksUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: '3-Day Treks in Uttarakhand', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <style>{`
        .tdt-body { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0 0 1rem; }
        .tdt-h2 { font-family:var(--font-geist-sans),sans-serif; font-size:clamp(1.4rem,2.5vw,1.85rem); font-weight:200; letter-spacing:-0.03em; color:#111; line-height:1.15; margin:0 0 0.75rem; }
        .tdt-h3 { font-family:var(--font-geist-sans),sans-serif; font-size:0.95rem; font-weight:500; color:#111; letter-spacing:-0.01em; margin:0 0 0.4rem; }
        .tdt-eyebrow { display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem; }
        .tdt-eyebrow-line { width:24px; height:1px; background:var(--color-primary); opacity:0.5; display:inline-block; }
        .tdt-eyebrow-text { font-size:0.56rem; letter-spacing:0.28em; text-transform:uppercase; color:var(--color-primary); font-weight:500; opacity:0.7; }
        .tdt-link { color:var(--color-primary); font-weight:500; text-decoration:none; border-bottom:1px solid rgba(15,118,110,0.25); }
        .tdt-link:hover { border-bottom-color:var(--color-primary); }
        .tdt-trek-card { background:#fff; border:1px solid #eef0ee; border-top:2px solid var(--color-primary); border-radius:8px; padding:1.25rem 1.5rem; margin-bottom:0.75rem; transition:transform 0.18s,box-shadow 0.18s; }
        .tdt-trek-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,0.07); }
        .tdt-why-item { border-left:2px solid var(--color-primary); padding-left:1rem; margin-bottom:1.25rem; }
        .tdt-why-item strong { display:block; font-size:0.82rem; font-weight:500; color:#111; margin-bottom:0.2rem; }
        .tdt-who-item { display:flex; gap:0.75rem; padding:0.9rem 1rem; border-bottom:1px solid #f0f0f0; }
        .tdt-who-item:last-child { border-bottom:none; }
        .tdt-who-dot { width:6px; height:6px; border-radius:50%; background:var(--color-primary); flex-shrink:0; margin-top:0.55rem; opacity:0.6; }
        .tdt-season-card { background:#fff; border:1px solid #eef0ee; border-radius:8px; padding:1rem 1.25rem; margin-bottom:0.75rem; }
        .tdt-season-label { font-size:0.75rem; font-weight:600; color:var(--color-primary); letter-spacing:0.05em; display:block; margin-bottom:0.35rem; }
        .tdt-callout { background:#fff; border:1px solid #e5e7eb; border-left:3px solid var(--color-primary); border-radius:8px; padding:1rem 1.25rem; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; }
        .tdt-callout a { color:var(--color-primary); font-weight:500; text-decoration:none; border-bottom:1px solid rgba(15,118,110,0.25); }
        @media(max-width:700px){ .tdt-trek-card,.tdt-season-card { padding:1rem; } }
      `}</style>

      <Breadcrumb items={[{ name:'Home', href:'/' }, { name:'Treks', href:'/treks' }, { name:'3-Day Treks in Uttarakhand' }]} />

      <article>

        {/* ── HERO ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tdt-eyebrow"><span className="tdt-eyebrow-line" /><span className="tdt-eyebrow-text">Short Treks · Uttarakhand · 2N / 3D</span></div>
            <h1 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.4rem)', fontWeight:200, letterSpacing:'-0.035em', color:'#111', lineHeight:1.1, margin:'0 0 1.5rem' }}>
              Best 3-Day Treks in Uttarakhand
            </h1>
            <p className="tdt-body" style={{ margin:'0 0 1rem' }}>
              Two nights, three days. That is all you need for a genuine Himalayan trekking
              experience — forest trails, ridge views, waterfall destinations, cave
              explorations, and even a summit attempt if your fitness allows. The 3-day format
              is the most practical trek duration for anyone working a standard week: depart
              Friday, trek Saturday and Sunday, return by Monday morning.
            </p>
            <p className="tdt-body" style={{ margin:0 }}>
              Uttarakhand holds the best 3-day trek options in northern India because the
              mountains are close to Delhi — six to nine hours by road — and the trails are
              graded for accessibility without sacrificing quality. You are not compromising
              by choosing a short trek. You are choosing a format that delivers the core
              Himalayan experience within a weekend.
            </p>
          </div>
        </section>

        {/* ── WHAT MAKES A 3-DAY TREK ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tdt-eyebrow"><span className="tdt-eyebrow-line" /><span className="tdt-eyebrow-text">The Format</span></div>
            <h2 className="tdt-h2">What Makes a Trek Suitable for 3 Days?</h2>
            <p className="tdt-body">Not every Himalayan trek compresses into three days. The format works when five factors align.</p>
            <div className="tdt-why-item">
              <strong>Travel time under 9 hours from Delhi.</strong>
              <p className="tdt-body" style={{ margin:0 }}>The drive to the trailhead consumes one direction of a day. If the base is more than nine hours away, you lose too much trekking time to travel. Chakrata (6–7 hours) and Sankri (8–9 hours) both fit within the window.</p>
            </div>
            <div className="tdt-why-item">
              <strong>Trail distance under 20 km total.</strong>
              <p className="tdt-body" style={{ margin:0 }}>Three days of trekking at a comfortable pace covers 12 to 18 km total — four to six km per trekking day. This is enough for forest walks, waterfall approaches, and ridge traverses without forced marches.</p>
            </div>
            <div className="tdt-why-item">
              <strong>Altitude below 3,000 metres (standard) or 3,800 metres (compressed).</strong>
              <p className="tdt-body" style={{ margin:0 }}>Chakrata treks stay between 1,800 and 2,500 metres — no acclimatisation needed. A compressed Kedarkantha pushes to 3,800 metres in three days, which demands faster acclimatisation and prior experience.</p>
            </div>
            <div className="tdt-why-item">
              <strong>Clear destination — summit, waterfall, or cave.</strong>
              <p className="tdt-body" style={{ margin:0 }}>A 3-day trek needs a defined objective. Tiger Fall delivers a waterfall. Budher Caves delivers underground exploration. Kedarkantha delivers a summit. The destination gives the short format shape and purpose.</p>
            </div>
            <div className="tdt-why-item" style={{ marginBottom:0 }}>
              <strong>Established base-camp logistics.</strong>
              <p className="tdt-body" style={{ margin:0 }}>Short treks work when accommodation, meals, and transport are professionally managed. Homestays in Chakrata, guided camps in Sankri, and organised transport from Delhi remove the planning burden that makes independent trekking impractical in three days.</p>
            </div>
          </div>
        </section>

        {/* ── BEST 3-DAY TREKS ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tdt-eyebrow"><span className="tdt-eyebrow-line" /><span className="tdt-eyebrow-text">The Treks</span></div>
            <h2 className="tdt-h2">Best 3-Day Treks in Uttarakhand</h2>

            <div className="tdt-trek-card">
              <h3 className="tdt-h3">Tiger Fall Trek (Chakrata)</h3>
              <p className="tdt-body" style={{ margin:'0.5rem 0 0.5rem' }}>
                The <Link href="/treks/location/chakrata/tiger-fall-trek" className="tdt-link">Tiger Fall Trek in Chakrata</Link> is the strongest 3-day trek option in Uttarakhand. Twelve kilometres through dense deodar and oak forest to one of the region&apos;s highest direct waterfalls — and back. The trail stays between 1,800 and 2,200 metres, requires no prior trekking experience, and is shaded by forest canopy throughout.
              </p>
              <p className="tdt-body" style={{ margin:0 }}>
                The 3-day format gives this trek room to breathe. Day one: travel from Delhi to <Link href="/treks/location/chakrata" className="tdt-link">Chakrata trek base</Link>, settle into a homestay, evening orientation. Day two: full trekking day — forest walk to Tiger Fall, time at the waterfall, return to camp or homestay. Day three: morning nature walk or village exploration, drive back to Delhi. No rushing. No forced marches. The mountain experience has space to land.
              </p>
            </div>

            <div className="tdt-trek-card">
              <h3 className="tdt-h3">Kedarkantha Trek (Short Itinerary Version)</h3>
              <p className="tdt-body" style={{ margin:'0.5rem 0 0.5rem' }}>
                The standard <Link href="/treks/location/sankri/kedarkantha-trek" className="tdt-link">Kedarkantha snow trek</Link> is a four-day itinerary with gradual acclimatisation. A compressed three-day version is possible for fit trekkers — combining the first two days into a single long push from <Link href="/treks/location/sankri" className="tdt-link">treks based in Sankri</Link> to the high camp, followed by summit day and descent.
              </p>
              <p className="tdt-body" style={{ margin:0 }}>
                This is not the recommended format for first-timers. The altitude gain is faster, the daily distances are longer, and acclimatisation time is reduced. But for trekkers who have completed at least one Himalayan trek previously and have strong cardio fitness, the three-day Kedarkantha delivers a snow summit at 3,800 metres within a long-weekend window. The reward-to-time ratio is extraordinary — you stand on a Himalayan peak within 48 hours of leaving Delhi.
              </p>
            </div>

            <div className="tdt-trek-card">
              <h3 className="tdt-h3">Budher Caves Trek (Chakrata Region)</h3>
              <p className="tdt-body" style={{ margin:'0.5rem 0 0' }}>
                The <Link href="/treks/location/chakrata/budher-caves-trek" className="tdt-link">Budher Caves Trek</Link> combines forest trekking with underground exploration — a distinctive experience no other short trek in Uttarakhand offers. Ten kilometres through oak forest to ancient limestone caves, with guided exploration inside. The 3-day format follows the same structure as Tiger Fall: travel day, trek day, return day. Moderate difficulty, no prior caving experience required, and the combination of forest canopy above ground and cave systems below creates a varied experience that holds attention across all three days.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHO SHOULD CHOOSE ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tdt-eyebrow"><span className="tdt-eyebrow-line" /><span className="tdt-eyebrow-text">Who It's For</span></div>
            <h2 className="tdt-h2">Who Should Choose a 3-Day Trek?</h2>
            <div style={{ border:'1px solid #eef0ee', borderRadius:8, overflow:'hidden' }}>
              <div className="tdt-who-item">
                <span className="tdt-who-dot" />
                <p className="tdt-body" style={{ margin:0 }}><strong style={{ fontWeight:500, color:'#111' }}>First-time trekkers.</strong> Three days is long enough to test whether Himalayan trekking is for you, short enough that the commitment is low. Tiger Fall or Budher Caves in Chakrata are ideal — accessible trails, no altitude concerns, and a clear destination. If you enjoy it, the natural next step is a <Link href="/treks/beginner-treks-uttarakhand" className="tdt-link">beginner treks in Uttarakhand</Link> like the full four-day Kedarkantha.</p>
              </div>
              <div className="tdt-who-item">
                <span className="tdt-who-dot" />
                <p className="tdt-body" style={{ margin:0 }}><strong style={{ fontWeight:500, color:'#111' }}>Corporate groups.</strong> The 3-day format is the most practical team-building trek. Friday departure, Saturday trekking, Sunday return — minimal leave required. Chakrata&apos;s proximity to Delhi and professional homestay infrastructure make logistics straightforward for groups of 10 to 20.</p>
              </div>
              <div className="tdt-who-item">
                <span className="tdt-who-dot" />
                <p className="tdt-body" style={{ margin:0 }}><strong style={{ fontWeight:500, color:'#111' }}>Students.</strong> Budget-friendly, time-efficient, and delivers a genuine mountain experience. A group of friends can organise a 3-day Chakrata trek for a fraction of a longer expedition&apos;s cost.</p>
              </div>
              <div className="tdt-who-item">
                <span className="tdt-who-dot" />
                <p className="tdt-body" style={{ margin:0 }}><strong style={{ fontWeight:500, color:'#111' }}>Couples.</strong> A weekend in the mountains — forest trails, campfire evenings, waterfall visits — without the multi-day commitment of a longer trek. The 3-day format is romantic and practical in equal measure.</p>
              </div>
              <div className="tdt-who-item">
                <span className="tdt-who-dot" />
                <p className="tdt-body" style={{ margin:0 }}><strong style={{ fontWeight:500, color:'#111' }}>Delhi and NCR residents.</strong> If you live within driving distance, 3-day treks become repeatable — once every few months, a different trail, a different season. See our <Link href="/treks/trek-near-delhi" className="tdt-link">weekend treks near Delhi</Link> guide for the full range of options within reach.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BEST SEASON ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tdt-eyebrow"><span className="tdt-eyebrow-line" /><span className="tdt-eyebrow-text">Best Season</span></div>
            <h2 className="tdt-h2">Best Season for 3-Day Treks</h2>
            <div className="tdt-season-card">
              <span className="tdt-season-label">October – November</span>
              <p className="tdt-body" style={{ margin:0 }}>The universal best window. Post-monsoon air is clear, trails are dry, temperatures are comfortable, and Himalayan visibility is at its peak. Both Chakrata and Sankri trails are in prime condition. This is the recommendation for anyone booking their first 3-day trek.</p>
            </div>
            <div className="tdt-season-card">
              <span className="tdt-season-label">February – April</span>
              <p className="tdt-body" style={{ margin:0 }}>Spring brings warming temperatures, wildflowers at lower elevations, and well-defined trails. Chakrata treks are excellent in this window. The compressed Kedarkantha still carries snow in February and early March — ideal for those seeking the <Link href="/treks/winter-treks-uttarakhand" className="tdt-link">winter treks in Uttarakhand</Link> experience in a short format.</p>
            </div>
            <div className="tdt-season-card">
              <span className="tdt-season-label">May – June</span>
              <p className="tdt-body" style={{ margin:0 }}>The <Link href="/treks/summer-treks-uttarakhand" className="tdt-link">summer treks in Uttarakhand</Link> window. Chakrata forest trails are shaded and cool while Delhi bakes. Tiger Fall builds volume through May. The green canopy and flowing streams make summer the most visually lush season for forest-based 3-day treks.</p>
            </div>
            <div className="tdt-season-card" style={{ marginBottom:0 }}>
              <span className="tdt-season-label">December – January</span>
              <p className="tdt-body" style={{ margin:0 }}>Winter adds a dimension to Chakrata — crisp air, occasional frost, and quiet trails. The compressed Kedarkantha is at its snow-covered best. Cold temperatures require proper layering but the reward is a winter mountain experience within a weekend.</p>
            </div>
          </div>
        </section>

        {/* ── COMMERCIAL NAV ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'3rem', paddingBottom:'3rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tdt-callout">
              <p className="tdt-body" style={{ margin:0 }}>
      Exploring longer itineraries and all difficulty levels? See the full{' '}
      <Link href="/treks" className="tdt-link">Himalayan treks directory</Link>{' '}
      for guided routes across Uttarakhand.
    </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tdt-eyebrow"><span className="tdt-eyebrow-line" /><span className="tdt-eyebrow-text">FAQ</span></div>
            <h2 className="tdt-h2" style={{ marginBottom:'1.75rem' }}>Frequently Asked Questions</h2>
            <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
          </div>
        </section>

      </article>
    </TrackedPage>
  );
}
