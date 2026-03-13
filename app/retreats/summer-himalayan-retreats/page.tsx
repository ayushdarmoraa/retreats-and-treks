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
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/retreats/summer-himalayan-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Summer Himalayan Retreats in India — May & June Escape',
    description:
      'Escape the Indian summer with Himalayan retreats in Sankri, Munsiyari, Chakrata and Rishikesh. Cool mountain air, yoga, meditation and transformational stays from May to June.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Summer Himalayan Retreats in India — May & June Escape',
      description:
        'Cool mountain air, open landscapes, and structured retreat programs across four Himalayan locations. May–June programs for heat escape and intentional pause.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Summer Himalayan Retreats in India — May & June Escape'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How cool are the Himalayas in May and June?',
    answer:
      'Temperatures vary by altitude. Sankri and Munsiyari typically range from 10–22°C, offering genuine relief from plains heat. Chakrata sits around 15–28°C — noticeably cooler than Delhi but not alpine cold. Rishikesh is warmer at 25–35°C but still more comfortable than the deep plains. For maximum temperature contrast, higher-altitude locations like Sankri and Munsiyari deliver the strongest summer cooling.',
  },
  {
    question: 'Is summer a good time for a first retreat?',
    answer:
      'Summer is arguably the best season for first-time retreat participants. The weather is comfortable, daylight hours are long, and outdoor programming is at its fullest. Trails are accessible, landscapes are green, and the extended evenings allow gentle transition into retreat rhythm without the intensity of winter cold or monsoon restrictions. Most beginners find May and June the most approachable window.',
  },
  {
    question: 'Will monsoon affect a May or June retreat?',
    answer:
      'Monsoon typically arrives in the Himalayan foothills by late June or early July. May and early-to-mid June programs generally operate before monsoon onset. Late June retreats at lower elevations such as Rishikesh may encounter pre-monsoon humidity and occasional rain. Higher-altitude locations like Sankri and Munsiyari see monsoon effects later and less intensely. Program dates are set with seasonal timing in mind.',
  },
  {
    question: 'What should I pack for a summer Himalayan retreat?',
    answer:
      'Light layers are essential — mornings and evenings can be cool even when days are warm. A light rain jacket for unexpected showers, comfortable walking shoes with grip, sunscreen, a hat, and a reusable water bottle are recommended. Loose, breathable clothing works well for yoga and movement sessions. Detailed packing guidance is provided after booking based on the specific location and altitude.',
  },
  {
    question: 'Can I combine a summer retreat with trekking?',
    answer:
      'Yes. Summer is peak trekking season in the higher Himalayas, and locations like Sankri and Munsiyari offer natural retreat-plus-trek combinations. Kedarkantha and Har Ki Dun from Sankri, or Khaliya Top and Milam Glacier approaches from Munsiyari, can be paired with retreat programs. These hybrid formats suit participants who want both physical challenge and reflective practice.',
  },
];

export default function SummerHimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Himalayan Retreats', url: buildCanonicalUrl('/retreats/himalayan-retreats') },
    { name: 'Summer Retreats', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <AutoArticleSchema
        title="Summer Himalayan Retreats in India"
        description="Escape the Indian summer with Himalayan retreats in Sankri, Munsiyari, Chakrata and Rishikesh. Cool mountain air, yoga, meditation and transformational stays from May to June."
        path={PATH}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Himalayan Retreats', href: '/retreats/himalayan-retreats' },
          { name: 'Summer Retreats' },
        ]}
      />

    

  <style>{`
    .sum-loc-card { background:#fff; border:1px solid #e5e7eb; border-top:2px solid var(--color-primary); border-radius:8px; overflow:hidden; margin-bottom:1.25rem; }
    .sum-loc-card img { width:100%; height:200px; object-fit:cover; display:block; }
    .sum-loc-card-body { padding:1.5rem; }
    .sum-loc-card-body h3 { font-family:var(--font-geist-sans),sans-serif; font-size:0.95rem; font-weight:500; color:#111; margin:0 0 0.85rem; letter-spacing:-0.01em; }
    .sum-loc-card-body h3 a { color:inherit; text-decoration:none; }
    .sum-loc-card-body h3 a:hover { color:var(--color-primary); }
    .sum-loc-card-body p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0 0 0.75rem; }
    .sum-loc-card-body p:last-child { margin-bottom:0; }
    .sum-why-item { border-left:2px solid var(--color-primary); padding-left:1rem; margin-bottom:1.25rem; }
    .sum-why-item p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0; }
    .sum-expect-item { display:flex; gap:1rem; padding:0.85rem 0; border-bottom:1px solid #f0f0f0; }
    .sum-expect-item:last-child { border-bottom:none; }
    .sum-expect-dot { flex-shrink:0; margin-top:0.55rem; width:8px; height:8px; border-radius:50%; background:var(--color-primary); opacity:0.6; }
    .sum-expect-item p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0; }
    .sum-who-item { display:flex; gap:1rem; padding:0.85rem 0; border-bottom:1px solid #f0f0f0; }
    .sum-who-item:last-child { border-bottom:none; }
    .sum-who-dot { flex-shrink:0; margin-top:0.55rem; width:8px; height:8px; border-radius:50%; background:var(--color-primary); opacity:0.6; }
    .sum-who-item p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0; }
    .sum-plan-item { background:#fff; border:1px solid #e5e7eb; border-left:3px solid var(--color-primary); border-radius:8px; padding:1rem 1.25rem; margin-bottom:0.75rem; }
    .sum-plan-item p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0; }
    .sum-nav-link { display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1rem; border-bottom:1px solid #f0f0f0; font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; color:#333; text-decoration:none; }
    .sum-nav-link:hover { background:#f7f9f7; color:var(--color-primary); }
    .sum-nav-link.back::before { content:'←'; color:var(--color-primary); opacity:0.5; margin-right:0.5rem; }
    .sum-nav-link:not(.back)::after { content:'→'; color:var(--color-primary); opacity:0.5; }
    .sum-nav-group { border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; }
    .sum-nav-group .sum-nav-link:last-child { border-bottom:none; }
    @media(max-width:640px){
      .sum-loc-card img { height:160px; }
      .sum-loc-card-body { padding:1.1rem; }
    }
  `}</style>

  {/* ── HERO ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <Breadcrumb items={[
        { name:'Home', href:'/' },
        { name:'Retreats', href:'/retreats' },
        { name:'Himalayan Retreats', href:'/retreats/himalayan-retreats' },
        { name:'Summer Retreats' },
      ]} />
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', margin:'1.5rem 0 1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Summer Retreats · May–June</span>
      </div>
      <h1 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.4rem)', fontWeight:200, letterSpacing:'-0.035em', color:'#111', lineHeight:1.1, margin:'0 0 1.5rem' }}>
        Summer Himalayan Retreats in India
      </h1>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', margin:'0 0 1rem' }}>
        When the Indian plains cross 40°C in May and June, the Himalayan foothills and valleys sit between 12 and 25 degrees. The air is clean. The views are open. The forests are fully green and alive. Summer in the mountains is not simply cooler — it is a different sensory environment entirely, and it creates ideal conditions for retreat work.
      </p>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', margin:'0 0 1rem' }}>
        Long daylight hours extend practice into early morning and late evening. Trails that were snow-covered in winter are now accessible for walking meditation and light trekking. Outdoor yoga sessions happen in meadows rather than enclosed rooms. The landscape is not a backdrop — it is an active participant in the retreat container.
      </p>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', margin:'0 0 2rem' }}>
        For professionals escaping urban heat, for first-time retreat participants seeking comfortable conditions, and for anyone who has postponed pause because the timing never felt right — summer in the Himalayas removes the last excuse.
      </p>
      <PrimaryCTA label="Plan My Summer Retreat" subtext="Planning a summer retreat? Let us help you find the right location." vertical="retreat" category="seasonal" sourcePath="/retreats/summer-himalayan-retreats" />
    </div>
  </section>

  {/* ── WHY CHOOSE ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Why Summer</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'0.75rem' }}>
        Why Choose the Himalayas in Summer
      </h2>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginBottom:'2rem' }}>
        The primary draw is climate contrast. When Delhi, Mumbai, and Bengaluru are at peak heat and humidity, the Himalayan mid-altitudes offer temperatures that feel like a different season. But the value is not merely thermal — mountain summer creates specific conditions that enhance retreat outcomes.
      </p>
      <div>
        {[
          { label:'Temperature and comfort.', body:'At 1,500–2,500 metres, daytime temperatures range from 18 to 25°C. Nights are cool enough for deep sleep without heating. This is the Goldilocks window — warm enough for outdoor practice, cool enough for the body to recover. The relentless heat that fragments urban attention simply does not exist here.' },
          { label:'Extended daylight.', body:'Summer days in the Himalayas stretch past 7 PM. Morning light arrives before 5 AM. This creates programming flexibility that no other season offers — pre-dawn meditation, sunrise yoga, late-afternoon nature walks, and evening integration sessions, all in natural light.' },
          { label:'Landscape at full capacity.', body:'Forests are dense and green. Wildflowers bloom across alpine meadows. Rivers run full from snowmelt. The landscape is generous in summer — visually rich, acoustically alive, and physically inviting. Walking practice on open trails has a quality that enclosed winter sessions cannot replicate.' },
          { label:'Beginner-friendly conditions.', body:'Summer removes the barriers that discourage first-time participants in other seasons — cold temperatures, snow logistics, road uncertainty. The accessibility and comfort of May–June make it the most natural entry point for anyone exploring the retreat format for the first time.' },
        ].map(item => (
          <div key={item.label} className="sum-why-item">
            <p><strong style={{ fontWeight:500, color:'#111' }}>{item.label}</strong> {item.body}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop:'2rem' }}>
        <PrimaryCTA label="Plan My Summer Retreat" subtext="Tell us your preferred dates. We will recommend the ideal summer retreat." vertical="retreat" category="seasonal" sourcePath="/retreats/summer-himalayan-retreats" />
      </div>
    </div>
  </section>

  {/* ── BEST LOCATIONS ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Four Locations</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'0.75rem' }}>
        Best Himalayan Locations for a Summer Retreat
      </h2>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginBottom:'2rem' }}>
        Summer amplifies the strengths of higher-altitude locations while making lower elevations warmer. The choice depends on how much altitude you want, whether you plan to combine trekking with retreat, and how far you are willing to travel.
      </p>

      {/* Sankri */}
      <div className="sum-loc-card">
        <img src="/Images/location/sankri.webp" alt="Sankri — pine forest valley in Govind Wildlife Sanctuary, Garhwal" loading="lazy" />
        <div className="sum-loc-card-body">
          <h3><Link href="/retreats/sankri">Sankri — Cool Pine Forest Valleys</Link></h3>
          <p>Sankri sits at the upper edge of the treeline in the Govind Wildlife Sanctuary corridor, where summer temperatures rarely exceed 22°C. The pine and oak forests surrounding the village provide natural air conditioning and walking routes that stay cool even at midday. Summer is when Sankri comes fully alive — the valley is green, the rivers are strong, and the high-altitude meadows above the village open for the first time since autumn.</p>
          <p>This is also peak season for combining retreat with trekking. Kedarkantha and Har Ki Dun trails are fully accessible, making Sankri the strongest summer location for participants who want physical movement alongside reflective practice. The cool climate, quiet village, and trail access create what is arguably the most complete summer retreat environment we offer.</p>
        </div>
      </div>

      {/* Munsiyari */}
      <div className="sum-loc-card">
        <img src="/Images/location/munsiyari.webp" alt="Munsiyari — Panchachuli massif views from high altitude Kumaon village" loading="lazy" />
        <div className="sum-loc-card-body">
          <h3><Link href="/retreats/munsiyari">Munsiyari — High Altitude and Panchachuli Views</Link></h3>
          <p>Munsiyari in summer is the premium alpine option. At over 2,200 metres, with the Panchachuli massif filling the northern horizon, this is mountain retreat at its most dramatic. Summer temperatures hover around 15–22°C — genuinely cool, never hot. Khaliya Top meadows bloom with wildflowers. The Milam Glacier approach opens for the season. Bhotiya villages are active and welcoming.</p>
          <p>Munsiyari suits participants who want altitude, visual grandeur, and genuine remoteness. The journey to reach it is longer than other locations, which creates natural psychological separation from routine. For serious seekers and experienced retreat participants, summer Munsiyari offers depth that more accessible locations cannot match.</p>
        </div>
      </div>

      {/* Chakrata */}
      <div className="sum-loc-card">
        <img src="/Images/location/chakrata.webp" alt="Chakrata — deodar forest trails on forested ridge near Dehradun" loading="lazy" />
        <div className="sum-loc-card-body">
          <h3><Link href="/retreats/chakrata">Chakrata — Quiet Hill Escape</Link></h3>
          <p>Chakrata is the most accessible summer escape — reachable from Delhi within a day, sitting on a forested ridge at moderate altitude. Summer days are warm but comfortable (20–30°C), and the deodar forests provide shade and walking routes. Tiger Falls and the surrounding forest trails are at their best in May and June. For professionals seeking a long weekend or three-to-five-day retreat without complex logistics, Chakrata delivers genuine mountain environment with minimal travel friction.</p>
        </div>
      </div>

      {/* Rishikesh */}
      <div className="sum-loc-card">
        <img src="/Images/location/rishikesh.webp" alt="Rishikesh — Ganges riverside yoga and retreat before monsoon" loading="lazy" />
        <div className="sum-loc-card-body">
          <h3><Link href="/retreats/rishikesh">Rishikesh — Riverside Retreats Before Monsoon</Link></h3>
          <p>Rishikesh in May–June is warmer than the mountain locations (28–38°C) but remains cooler than the deep plains. Pre-monsoon energy creates intensity — the Ganges runs strong, ashram routines shift toward early-morning practice to avoid midday heat, and serious yoga courses run their intensive summer cohorts. This is not a cool-climate escape but a spiritual-intensity window. For those drawn to <Link href="/retreats/journeys/yoga-and-movement" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>yoga and movement</Link> or teacher-led philosophical study, pre-monsoon Rishikesh has a focused energy that cooler seasons dilute with tourist traffic.</p>
        </div>
      </div>
    </div>
  </section>

  {/* ── WHAT TO EXPECT ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>A Typical Day</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'0.75rem' }}>
        What to Expect in a Summer Retreat
      </h2>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginBottom:'1.5rem' }}>
        Summer programming takes advantage of extended daylight and comfortable outdoor conditions. A typical day is more expansive than winter formats — more time outside, more movement, more landscape integration.
      </p>
      <div style={{ border:'1px solid #e5e7eb', borderRadius:'8px', background:'#f7f9f7', padding:'0 1.25rem' }}>
        {[
          { label:'Morning yoga in open air', body:'meadow or forest-edge sessions beginning at first light, when mountain air is coolest and clearest' },
          { label:'Guided forest meditation', body:'walking or seated practice under tree canopy, using natural sound as the meditation object' },
          { label:'Nature walks and light trekking', body:'trail-based integration sessions on routes that are fully accessible in summer' },
          { label:'Breathwork and pranayama', body:'the clean, oxygen-rich mountain air at altitude noticeably deepens breathing practice' },
          { label:'Digital detox', body:'reduced connectivity at mountain locations makes disconnection natural rather than disciplined' },
          { label:'Extended evening integration', body:'long twilight hours for journaling, conversation, or quiet time before natural sleep onset' },
        ].map(item => (
          <div key={item.label} className="sum-expect-item">
            <div className="sum-expect-dot" />
            <p><strong style={{ fontWeight:500, color:'#111' }}>{item.label}</strong> — {item.body}</p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginTop:'1.5rem', marginBottom:0 }}>
        For a deeper comparison of retreat formats and how to choose between them, see our guide to <Link href="/blog/3-day-vs-5-day-himalayan-retreat" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>choosing the right retreat length</Link>.
      </p>
    </div>
  </section>

  {/* ── WHO IS IT FOR ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Is This For You</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'1.75rem' }}>
        Who Is a Summer Retreat Ideal For
      </h2>
      <div style={{ border:'1px solid #e5e7eb', borderRadius:'8px', background:'#fff', padding:'0 1.25rem' }}>
        {[
          { label:'Corporate professionals', body:'needing structured pause during the May–June window before Q3 intensity begins' },
          { label:'Burnout recovery', body: <span>— the gentle climate and longer days create ideal conditions for nervous system recalibration without the intensity of winter cold. See our <Link href="/retreats/journeys/burnout-recovery" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>Burnout Recovery</Link> program</span> },
          { label:'First-time retreat participants', body:'— summer removes barriers of cold, logistics complexity, and seasonal uncertainty, making it the most accessible entry point' },
          { label:'Couples', body:'seeking shared reflective experience in comfortable, scenic conditions' },
          { label:'Solo travellers', body:'— summer group sizes are moderate, creating community without being overwhelming' },
        ].map((item, i) => (
          <div key={i} className="sum-who-item">
            <div className="sum-who-dot" />
            <p><strong style={{ fontWeight:500, color:'#111' }}>{item.label}</strong> {item.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ── PLANNING ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Before You Book</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'1.75rem' }}>
        Planning Your May–June Himalayan Retreat
      </h2>
      {[
        { label:'Book early.', body:'Summer is peak retreat season in the Himalayas. Popular locations and formats fill weeks in advance, particularly for May weekends and early June. Confirming your dates four to six weeks ahead is recommended.' },
        { label:'Choose altitude by intent.', body:'If maximum cooling is the priority, choose Sankri or Munsiyari. If accessibility and weekend-friendly logistics matter more, Chakrata is optimal. If spiritual tradition matters more than climate, Rishikesh works even in summer warmth.' },
        { label:'Pack in layers.', body:'Mountain weather shifts through the day — mornings can be 12°C and afternoons 25°C in the same location. A light fleece, rain layer, comfortable walking shoes, and sun protection cover most situations.' },
        { label:'Respect altitude gently.', body:'Locations above 2,000 metres (Sankri, Munsiyari) may cause mild breathlessness on arrival. Programs account for this with gradual first-day scheduling. Hydration and rest on the travel day are sufficient for most participants.' },
      ].map(item => (
        <div key={item.label} className="sum-plan-item">
          <p><strong style={{ fontWeight:500, color:'#111' }}>{item.label}</strong> {item.body}</p>
        </div>
      ))}
    </div>
  </section>

  {/* ── SEASONAL NAV ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderLeft:'3px solid var(--color-primary)', borderRadius:'8px', padding:'1rem 1.25rem', fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555' }}>
        <div style={{ fontSize:'0.55rem', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase' as const, color:'var(--color-primary)', opacity:0.7, marginBottom:'0.35rem' }}>Other Seasons</div>
        Looking for a different season?{' '}
        <Link href="/retreats/winter-himalayan-retreats" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>Winter Himalayan Retreats</Link>{' '}
        (December–February) offer snow silence, introspective depth, and small-group intimacy. For a complete overview of all seasons and formats, see{' '}
        <Link href="/retreats/himalayan-retreats" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>Himalayan Retreats in India</Link>.
      </div>
    </div>
  </section>

  {/* ── FAQ ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>FAQ</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'1.75rem' }}>
        Frequently Asked Questions
      </h2>
      <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
    </div>
  </section>

  {/* ── NAV ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Explore More</span>
      </div>
      <div className="sum-nav-group">
        <Link href="/retreats/himalayan-retreats" className="sum-nav-link back">Himalayan Retreats</Link>
        <Link href="/retreats" className="sum-nav-link">All Retreats</Link>
      </div>
    </div>
  </section>

</TrackedPage>
  );
}
