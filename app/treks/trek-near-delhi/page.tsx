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
import PrimaryCTA from '@/components/PrimaryCTA';

const PATH = '/treks/trek-near-delhi';

export function generateMetadata(): Metadata {
  return {
    title: 'Best Treks Near Delhi for a Weekend Escape — 2–3 Day Himalayan Treks | Retreats And Treks',
    description:
      'Find the best treks near Delhi in Chakrata and Sankri. Weekend-friendly Himalayan treks 6–9 hours from the capital with guided itineraries and forest trails.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Best Treks Near Delhi for a Weekend Escape',
      description:
        'Weekend Himalayan treks within driving distance of Delhi. Chakrata and Sankri — forest trails, ridge walks and guided itineraries for 2–3 day trips.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Which is the closest Himalayan trek to Delhi?',
    answer:
      'Chakrata offers the closest Himalayan trekking from Delhi at six to seven hours by road via Dehradun. The Chakrata Weekend Trek is a two-night, three-day itinerary covering forest trails, meadows, and ridge campsites at 2,100 metres. It requires no prior trekking experience and is the most practical option for a standard Friday-to-Sunday window.',
  },
  {
    question: 'Can I complete a Himalayan trek in 2 days from Delhi?',
    answer:
      'Yes. A Friday evening departure from Delhi places you in Chakrata by midnight. Saturday is a full trekking day — forest trails, ridge walks, and campsite overnight. Sunday morning offers a short closing hike before the return drive. The two-day format works best with Chakrata because the travel time is manageable and the trail difficulty is beginner-friendly. Sankri requires a longer drive, making a two-day format tight without an extended weekend.',
  },
  {
    question: 'Are treks near Delhi beginner-friendly?',
    answer:
      'Chakrata treks are fully beginner-friendly. Trails stay between 1,800 and 2,400 metres — no altitude sickness concerns, no glacier crossings, no technical sections. The terrain is forested ridge walking on well-defined paths. Guided itineraries include safety briefings, pace management, and support. Sankri treks like Kedarkantha are moderate and suit fit beginners with some preparation. Neither requires prior Himalayan experience.',
  },
  {
    question: 'What is the best time for treks near Delhi?',
    answer:
      'October to November and February to April are the strongest windows. Clear skies, moderate temperatures, and dry trails. Spring brings wildflowers and birdsong. Autumn offers the sharpest Himalayan visibility. Summer (May to June) works for Chakrata — it stays cool while Delhi temperatures climb past 40°C. Sankri is best from April through November. Winter treks are possible in Chakrata with occasional snow, and Kedarkantha is a premier winter snow trek from December to March.',
  },
  {
    question: 'Is Sankri feasible for a weekend trek from Delhi?',
    answer:
      'Sankri is eight to nine hours from Delhi by road, which makes a standard Friday-to-Sunday weekend tight. It works well for extended weekends, three-day holidays, or if you can depart Thursday evening. The most popular Sankri trek — Kedarkantha — is a four-to-five-day itinerary, not a weekend format. For a true two-day weekend trek, Chakrata is the more practical choice. Save Sankri for when you have three or more days.',
  },
];

export default function TrekNearDelhiPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Treks Near Delhi', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <style>{`
        .tnd-body { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0 0 1rem; }
        .tnd-h2 { font-family:var(--font-geist-sans),sans-serif; font-size:clamp(1.4rem,2.5vw,1.85rem); font-weight:200; letter-spacing:-0.03em; color:#111; line-height:1.15; margin:0 0 0.75rem; }
        .tnd-h3 { font-family:var(--font-geist-sans),sans-serif; font-size:0.95rem; font-weight:500; color:#111; letter-spacing:-0.01em; margin:0 0 0.4rem; }
        .tnd-eyebrow { display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem; }
        .tnd-eyebrow-line { width:24px; height:1px; background:var(--color-primary); opacity:0.5; display:inline-block; }
        .tnd-eyebrow-text { font-size:0.56rem; letter-spacing:0.28em; text-transform:uppercase; color:var(--color-primary); font-weight:500; opacity:0.7; }
        .tnd-link { color:var(--color-primary); font-weight:500; text-decoration:none; border-bottom:1px solid rgba(15,118,110,0.25); }
        .tnd-link:hover { border-bottom-color:var(--color-primary); }
        .tnd-trek-card { background:#fff; border:1px solid #eef0ee; border-top:2px solid var(--color-primary); border-radius:8px; padding:1.25rem 1.5rem; margin-bottom:0.75rem; transition:transform 0.18s,box-shadow 0.18s; }
        .tnd-trek-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,0.07); }
        .tnd-trek-card h3 a { color:#111; text-decoration:none; }
        .tnd-trek-card h3 a:hover { color:var(--color-primary); }
        .tnd-why-item { border-left:2px solid var(--color-primary); padding-left:1rem; margin-bottom:1.25rem; }
        .tnd-why-item strong { display:block; font-size:0.82rem; font-weight:500; color:#111; margin-bottom:0.2rem; }
        .tnd-who-item { display:flex; gap:0.75rem; padding:0.9rem 1rem; border-bottom:1px solid #f0f0f0; }
        .tnd-who-item:last-child { border-bottom:none; }
        .tnd-who-dot { width:6px; height:6px; border-radius:50%; background:var(--color-primary); flex-shrink:0; margin-top:0.55rem; opacity:0.6; }
        .tnd-distance-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.75rem; margin-bottom:1.25rem; }
        .tnd-distance-card { background:#fff; border:1px solid #eef0ee; border-radius:8px; padding:1rem 1.25rem; }
        .tnd-distance-label { font-size:0.62rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--color-primary); display:block; margin-bottom:0.3rem; }
        .tnd-distance-time { font-size:1rem; font-weight:200; color:#111; letter-spacing:-0.02em; display:block; margin-bottom:0.3rem; }
        .tnd-season-card { background:#fff; border:1px solid #eef0ee; border-radius:8px; padding:1rem 1.25rem; margin-bottom:0.75rem; }
        .tnd-season-label { font-size:0.75rem; font-weight:600; color:var(--color-primary); letter-spacing:0.05em; display:block; margin-bottom:0.35rem; }
        .tnd-callout { background:#fff; border:1px solid #e5e7eb; border-left:3px solid var(--color-primary); border-radius:8px; padding:1rem 1.25rem; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; }
        .tnd-callout a { color:var(--color-primary); font-weight:500; text-decoration:none; border-bottom:1px solid rgba(15,118,110,0.25); }
        @media(max-width:700px){ .tnd-distance-grid { grid-template-columns:1fr; } .tnd-trek-card { padding:1rem; } }
      `}</style>

      <Breadcrumb items={[{ name:'Home', href:'/' }, { name:'Treks', href:'/treks' }, { name:'Treks Near Delhi' }]} />

      <article>

        {/* ── HERO ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tnd-eyebrow"><span className="tnd-eyebrow-line" /><span className="tnd-eyebrow-text">Weekend Treks · Near Delhi · Uttarakhand</span></div>
            <h1 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.4rem)', fontWeight:200, letterSpacing:'-0.035em', color:'#111', lineHeight:1.1, margin:'0 0 1.5rem' }}>
              Best Treks Near Delhi for a Weekend Escape
            </h1>
            <p className="tnd-body" style={{ margin:'0 0 1rem' }}>
              Six to nine hours by road separates Delhi from genuine Himalayan trekking. That
              is a Friday evening departure, a Saturday on mountain trails, and a Sunday return
              — no annual leave, no flights, no multi-day logistics. The Uttarakhand foothills
              hold forest trails, ridge walks, waterfall approaches, and summit routes within
              a weekend driving radius that most Delhi professionals underestimate.
            </p>
            <p className="tnd-body" style={{ margin:0 }}>
              The question is not whether a weekend trek from Delhi is feasible. It is which
              trail matches your fitness, your group, and the hours you have. Two destinations
              dominate this radius: Chakrata for accessible forest trekking and Sankri for
              deeper mountain immersion. Both deliver genuine Himalayan terrain without the
              overhead of a week-long expedition.
            </p>
          </div>
        </section>

        {/* ── CTA 1 ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'3rem', paddingBottom:'3rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <PrimaryCTA label="Plan My Weekend Trek" subtext="Planning a weekend trek from Delhi? We can help." vertical="trek" category="near-delhi" sourcePath="/treks/trek-near-delhi" />
          </div>
        </section>

        {/* ── HOW CLOSE ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tnd-eyebrow"><span className="tnd-eyebrow-line" /><span className="tnd-eyebrow-text">Distance from Delhi</span></div>
            <h2 className="tnd-h2">How Close Are These Treks to Delhi?</h2>
            <p className="tnd-body">Realistic drive times from central Delhi on a Friday evening — not best-case estimates, but traffic-adjusted numbers.</p>
            <div className="tnd-distance-grid">
              <div className="tnd-distance-card">
                <span className="tnd-distance-label">Chakrata</span>
                <span className="tnd-distance-time">6–7 hrs</span>
                <p className="tnd-body" style={{ margin:0, fontSize:'0.78rem' }}>Via Delhi–Dehradun highway. Arrive Friday night, trek all Saturday. The practical weekend default.</p>
              </div>
              <div className="tnd-distance-card">
                <span className="tnd-distance-label">Sankri</span>
                <span className="tnd-distance-time">8–9 hrs</span>
                <p className="tnd-body" style={{ margin:0, fontSize:'0.78rem' }}>Via Dehradun and Purola. Tight for a standard weekend — best with Thursday evening departure.</p>
              </div>
              <div className="tnd-distance-card">
                <span className="tnd-distance-label">Munsiyari</span>
                <span className="tnd-distance-time">10–12 hrs</span>
                <p className="tnd-body" style={{ margin:0, fontSize:'0.78rem' }}>Deep Kumaon. Not a weekend option — four-day minimum destination. Plan accordingly.</p>
              </div>
            </div>
            <p className="tnd-body" style={{ margin:0 }}>
              All destinations are accessible by private car or shared cab. The Delhi–Dehradun
              Shatabdi train is a practical alternative for the first leg — four-and-a-half
              hours to Dehradun, then a taxi onward. No flights required.
            </p>
          </div>
        </section>

        {/* ── CTA 2 ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'3rem', paddingBottom:'3rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <PrimaryCTA label="Plan My Weekend Trek" subtext="Share your available dates. We will match you to the right trail." vertical="trek" category="near-delhi" sourcePath="/treks/trek-near-delhi" />
          </div>
        </section>

        {/* ── BEST WEEKEND TREKS ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tnd-eyebrow"><span className="tnd-eyebrow-line" /><span className="tnd-eyebrow-text">The Treks</span></div>
            <h2 className="tnd-h2">Best Weekend Treks Near Delhi</h2>
            <p className="tnd-body">Two locations account for the strongest weekend trekking from Delhi. Each serves a different fitness level, time budget, and mountain experience.</p>

            <div className="tnd-trek-card">
              <h3 className="tnd-h3"><Link href="/treks/location/chakrata" style={{ color:'#111', textDecoration:'none' }}>Chakrata Treks (6–7 Hours from Delhi)</Link></h3>
              <p className="tnd-body" style={{ margin:'0.5rem 0 0.5rem' }}>
                Chakrata sits at 2,200 metres on a deodar-covered ridge in Dehradun district.
                The trekking here is forest-based: mid-altitude trails between 1,800 and 2,400
                metres through dense canopy, limestone formations, and open meadows. No glacier
                crossings, no snow-line scrambles, no altitude acclimatisation needed. This is
                Himalayan trekking at walking pace — accessible to anyone with basic fitness.
              </p>
              <p className="tnd-body" style={{ margin:'0 0 0.5rem' }}>
                The <Link href="/treks/location/chakrata/weekend-trek" className="tnd-link">Chakrata Weekend Trek</Link> is the flagship route — a two-night, three-day itinerary covering 8 km of forest trails, grassland meadows, and ridge campsites. No prior trekking experience required. Pickup from Dehradun makes it logistically effortless. This is the single best option for a first Himalayan trek from Delhi.
              </p>
              <p className="tnd-body" style={{ margin:0 }}>
                Beyond the weekend route, the <Link href="/treks/location/chakrata/tiger-fall-trek" className="tnd-link">Tiger Fall Trek</Link> leads to one of the region&apos;s highest direct waterfalls — 12 km through dense forest to a natural pool. Best in monsoon and post-monsoon months when water volume peaks. The <Link href="/treks/location/chakrata/budher-caves-trek" className="tnd-link">Budher Caves Trek</Link> offers a rare combination of forest walking and underground exploration through ancient limestone cave systems. Both are day-trek or overnight formats that fit a weekend window.
              </p>
            </div>

            <div className="tnd-trek-card">
              <h3 className="tnd-h3"><Link href="/treks/location/sankri" style={{ color:'#111', textDecoration:'none' }}>Sankri Treks (8–9 Hours from Delhi)</Link></h3>
              <p className="tnd-body" style={{ margin:'0.5rem 0 0.5rem' }}>
                Sankri sits in the upper Tons Valley near the Govind Wildlife Sanctuary — deeper
                into the mountains, at the edge of the treeline. The trekking here is more
                demanding: higher altitude, longer trails, and terrain that shifts from pine
                forest to alpine meadow to snow above the treeline.
              </p>
              <p className="tnd-body" style={{ margin:'0 0 0.5rem' }}>
                The <Link href="/treks/location/sankri/kedarkantha-trek" className="tnd-link">Kedarkantha Trek</Link> is the headline route — a four-to-five-day summit trek reaching 3,800 metres with panoramic views of the Swargarohini, Bandarpoonch, and Black Peak ranges. It is one of India&apos;s most popular winter treks (December to March) when the trail is snow-covered. Not a weekend format, but the defining reason to plan an extended trip from Delhi to Sankri.
              </p>
              <p className="tnd-body" style={{ margin:0 }}>
                The <Link href="/treks/location/sankri/har-ki-dun-trek" className="tnd-link">Har Ki Dun Trek</Link> follows the ancient Tons Valley into a glacial cradle — five to six days through some of the most pristine forest and meadow terrain in Uttarakhand. Both <Link href="/treks/location/sankri" className="tnd-link">Sankri treks</Link> require more time than a standard weekend but reward the investment with mountain experiences that shorter routes cannot match.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHAT MAKES WEEKEND FRIENDLY ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tnd-eyebrow"><span className="tnd-eyebrow-line" /><span className="tnd-eyebrow-text">The Format</span></div>
            <h2 className="tnd-h2">What Makes a Trek &ldquo;Weekend Friendly&rdquo;?</h2>
            <p className="tnd-body">Not every Himalayan trek fits a Friday-to-Sunday window. Four factors determine weekend feasibility.</p>
            <div className="tnd-why-item">
              <strong>Drive time under 8 hours.</strong>
              <p className="tnd-body" style={{ margin:0 }}>Beyond that, you lose too much of Saturday to travel. Chakrata&apos;s six-to-seven-hour range is the sweet spot — arrive Friday night, trek all Saturday, depart Sunday.</p>
            </div>
            <div className="tnd-why-item">
              <strong>Trail length under 15 km total.</strong>
              <p className="tnd-body" style={{ margin:0 }}>A weekend trek needs to be completable in one full trekking day plus a short morning session. Eight to twelve kilometres across two days is the practical range. Longer routes require three or more trekking days.</p>
            </div>
            <div className="tnd-why-item">
              <strong>Elevation below 3,000 metres.</strong>
              <p className="tnd-body" style={{ margin:0 }}>Higher-altitude treks require acclimatisation days that a weekend does not allow. Staying below 2,500 metres — as Chakrata treks do — eliminates altitude sickness risk entirely.</p>
            </div>
            <div className="tnd-why-item" style={{ marginBottom:0 }}>
              <strong>Logistical simplicity.</strong>
              <p className="tnd-body" style={{ margin:0 }}>Pickup from a transport hub (Dehradun station or airport), pre-arranged camping or lodge accommodation, and a guided itinerary that handles navigation. The less planning you need to do, the more repeatable the weekend format becomes.</p>
            </div>
          </div>
        </section>

        {/* ── WHO SHOULD CHOOSE ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tnd-eyebrow"><span className="tnd-eyebrow-line" /><span className="tnd-eyebrow-text">Who It's For</span></div>
            <h2 className="tnd-h2">Who Should Choose a Trek Near Delhi</h2>
            <div style={{ border:'1px solid #eef0ee', borderRadius:8, overflow:'hidden' }}>
              {[
                { label:'First-time trekkers.', body:'Chakrata is the ideal entry point — no experience required, no extreme fitness demands, and professional guides who manage pace and safety. A weekend trek here builds the confidence and conditioning for longer expeditions later.' },
                { label:'Corporate groups.', body:'Team offsites in the mountains deliver more bonding than another conference room. A guided weekend trek — shared physical challenge, campfire meals, ridge-top views — creates team cohesion that structured workshops rarely achieve.' },
                { label:'Couples.', body:'A shared mountain weekend without tourist crowds or resort distractions. Trekking together in forest silence, camping under stars, cooking over fire — this is a different quality of shared experience.' },
                { label:'Solo travellers.', body:'Joining a guided group trek is the easiest way for solo travellers to access the Himalayas safely. You get the mountain experience without the logistics of planning a solo expedition.' },
              ].map((item, i, arr) => (
                <div key={i} className="tnd-who-item" style={{ borderBottom: i < arr.length-1 ? '1px solid #f0f0f0' : 'none' }}>
                  <span className="tnd-who-dot" />
                  <p className="tnd-body" style={{ margin:0 }}><strong style={{ fontWeight:500, color:'#111' }}>{item.label}</strong> {item.body}</p>
                </div>
              ))}
            </div>
            <p className="tnd-body" style={{ margin:'1.25rem 0 0' }}>
              Looking for restoration rather than trail time? Our <Link href="/retreats/retreat-near-delhi" className="tnd-link">Himalayan retreats near Delhi</Link> guide covers yoga, meditation, and wellness programmes within the same driving radius.
            </p>
          </div>
        </section>

        {/* ── BEST SEASON ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tnd-eyebrow"><span className="tnd-eyebrow-line" /><span className="tnd-eyebrow-text">Best Season</span></div>
            <h2 className="tnd-h2">Best Season for Treks Near Delhi</h2>
            <div className="tnd-season-card">
              <span className="tnd-season-label">October – November</span>
              <p className="tnd-body" style={{ margin:0 }}>Peak trekking window. Post-monsoon air is crystal clear, temperatures are comfortable (10–22°C depending on altitude), and trails are dry with firm footing. Himalayan visibility is at its best — ridge walks in Chakrata offer sightlines to Bandarpoonch and the greater ranges. Strongest recommendation for first-time trekkers.</p>
            </div>
            <div className="tnd-season-card">
              <span className="tnd-season-label">February – April</span>
              <p className="tnd-body" style={{ margin:0 }}>Spring brings wildflowers, birdsong, and warming temperatures. Rhododendrons bloom at higher elevations in March and April. Trails are well-defined and the forest canopy is alive.</p>
            </div>
            <div className="tnd-season-card">
              <span className="tnd-season-label">May – June</span>
              <p className="tnd-body" style={{ margin:0 }}>Summer trekking season. Chakrata stays cool (15–25°C) while Delhi temperatures climb past 40°C. The altitude provides natural heat escape. Trails are dry but the forest shade keeps the walking comfortable.</p>
            </div>
            <div className="tnd-season-card">
              <span className="tnd-season-label">July – September</span>
              <p className="tnd-body" style={{ margin:0 }}>Monsoon. Tiger Fall in Chakrata is at its most spectacular — thundering cascade and lush forest. But trails are slippery, leeches are present, and river crossings can be unpredictable. Experienced trekkers only.</p>
            </div>
            <div className="tnd-season-card" style={{ marginBottom:0 }}>
              <span className="tnd-season-label">December – March</span>
              <p className="tnd-body" style={{ margin:0 }}>Winter. Chakrata receives occasional snowfall — beautiful but requires cold-weather preparedness. Kedarkantha in Sankri becomes a premier snow trek in this window, drawing trekkers specifically for the snow-covered summit experience.</p>
            </div>
          </div>
        </section>

        {/* ── COMMERCIAL NAV ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'3rem', paddingBottom:'3rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tnd-callout">
              <p style={{ margin:0 }}>Exploring all trekking options? See the full <Link href="/treks" style={{ color:'var(--color-primary)', fontWeight:500, textDecoration:'none', borderBottom:'1px solid rgba(15,118,110,0.25)' }}>Himalayan treks directory</Link> for guided itineraries across all locations, difficulty levels, and durations.</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tnd-eyebrow"><span className="tnd-eyebrow-line" /><span className="tnd-eyebrow-text">FAQ</span></div>
            <h2 className="tnd-h2" style={{ marginBottom:'1.75rem' }}>Frequently Asked Questions</h2>
            <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
          </div>
        </section>

      </article>
    </TrackedPage>
  );
}
