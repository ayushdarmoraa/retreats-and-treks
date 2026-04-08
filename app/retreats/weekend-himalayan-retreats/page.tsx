import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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

const PATH = '/retreats/weekend-himalayan-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Weekend Himalayan Retreats Near Delhi — 2–3 Day Mountain Escapes',
    description:
      'Plan a 2–3 day weekend Himalayan retreat near Delhi. Friday–Sunday corporate reset programs in Chakrata and Rishikesh with yoga, meditation and nature immersion.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Weekend Himalayan Retreats Near Delhi — 2–3 Day Mountain Escapes',
      description:
        'Friday–Sunday Himalayan retreat programs near Delhi. 2–3 day reset in Chakrata, Rishikesh and Sankri with yoga, meditation and structured restoration.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Weekend Himalayan Retreats Near Delhi — 2–3 Day Mountain Escapes'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Can I do a Himalayan retreat in just 2 days?',
    answer:
      'Yes. A well-structured 2-night retreat delivers measurable benefit. Programs are designed for compressed timelines — Friday evening arrival with a grounding session, full Saturday immersion across yoga, breathwork, meditation and nature, and Sunday morning closing with early departure. Participants consistently report noticeable mental reset within 48 hours when the environment and structure are right. The key is not duration but design.',
  },
  {
    question: 'Which is closer to Delhi — Chakrata or Rishikesh?',
    answer:
      'Rishikesh is slightly closer at 5–6 hours by road from Delhi. Chakrata takes 6–7 hours via Dehradun. Both are comfortably reachable on a Friday evening or early Saturday morning. Rishikesh is faster if you are coming from south or central Delhi. Chakrata is more direct from north Delhi via the Yamuna Expressway corridor. Both qualify as genuine weekend destinations.',
  },
  {
    question: 'Is Sankri feasible for a weekend retreat?',
    answer:
      'Sankri requires 8–9 hours from Delhi, which makes a standard Friday–Sunday weekend tight. It works well for extended weekends or 3-day holidays where you have Friday off or can depart Thursday evening. For a regular 2-night weekend, Chakrata and Rishikesh are more practical. If Sankri is your priority, a 3-night format is recommended.',
  },
  {
    question: 'What is included in a 2-night weekend retreat?',
    answer:
      'A typical 2-night weekend retreat includes accommodation, all meals from Friday dinner through Sunday breakfast, two full yoga and meditation sessions per day, one guided nature walk or forest immersion, breathwork or sound healing workshops, and integration time. Digital detox support, journaling prompts, and personalised intention-setting are included in most formats. Specific inclusions vary by location and program.',
  },
  {
    question: 'Do I need prior yoga or meditation experience?',
    answer:
      'No. Weekend retreats are designed to be accessible for first-time participants. Sessions are guided and adapted to mixed experience levels. Facilitators provide modifications for beginners and deeper variations for experienced practitioners within the same session. Many weekend participants are professionals with no formal practice — the structured environment makes entry natural rather than intimidating.',
  },
  {
    question: 'When is the best time of year for a weekend Himalayan retreat?',
    answer:
      'Weekend Himalayan retreats operate year-round, with each season offering a different quality. October–November and February–March are the most popular windows — pleasant weather, clear skies, and comfortable temperatures. Summer weekends (May–June) offer heat escape from Delhi. Winter weekends (December–January) suit those drawn to quiet introspection and smaller groups. Road conditions at higher-altitude locations like Sankri may affect winter access.',
  },
];

export default function WeekendHimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Himalayan Retreats', url: buildCanonicalUrl('/retreats/himalayan-retreats') },
    { name: 'Weekend Retreats', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <AutoArticleSchema
        title="Weekend Himalayan Retreats Near Delhi"
        description="Plan a 2–3 day weekend Himalayan retreat near Delhi. Friday–Sunday corporate reset programs in Chakrata and Rishikesh with yoga, meditation and nature immersion."
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
          { name: 'Weekend Retreats' },
        ]}
      />

      <article>

        <style>{`
    .wknd-loc-card { background:#fff; border:1px solid #e5e7eb; border-top:2px solid var(--color-primary); border-radius:8px; overflow:hidden; margin-bottom:1.25rem; }
    .wknd-loc-card img { width:100%; height:200px; object-fit:cover; display:block; }
    .wknd-loc-card-body { padding:1.5rem; }
    .wknd-loc-card-body h3 { font-family:var(--font-geist-sans),sans-serif; font-size:0.95rem; font-weight:500; color:#111; margin:0 0 0.85rem; letter-spacing:-0.01em; }
    .wknd-loc-card-body h3 a { color:inherit; text-decoration:none; }
    .wknd-loc-card-body h3 a:hover { color:var(--color-primary); }
    .wknd-loc-card-body p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0 0 0.75rem; }
    .wknd-loc-card-body p:last-child { margin-bottom:0; }
    .wknd-why-item { border-left:2px solid var(--color-primary); padding-left:1rem; margin-bottom:1.25rem; }
    .wknd-why-item p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0; }
    .wknd-day-item { background:#fff; border:1px solid #e5e7eb; border-left:3px solid var(--color-primary); border-radius:8px; padding:1rem 1.25rem; margin-bottom:0.75rem; }
    .wknd-day-item p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0; }
    .wknd-who-item { display:flex; gap:1rem; padding:0.85rem 0; border-bottom:1px solid #f0f0f0; }
    .wknd-who-item:last-child { border-bottom:none; }
    .wknd-who-dot { flex-shrink:0; margin-top:0.55rem; width:8px; height:8px; border-radius:50%; background:var(--color-primary); opacity:0.6; }
    .wknd-who-item p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0; }
    .wknd-plan-item { background:#fff; border:1px solid #e5e7eb; border-left:3px solid var(--color-primary); border-radius:8px; padding:1rem 1.25rem; margin-bottom:0.75rem; }
    .wknd-plan-item p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0; }
    .wknd-nav-link { display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1rem; border-bottom:1px solid #f0f0f0; font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; color:#333; text-decoration:none; }
    .wknd-nav-link:hover { background:#f7f9f7; color:var(--color-primary); }
    .wknd-nav-link.back::before { content:'←'; color:var(--color-primary); opacity:0.5; margin-right:0.5rem; }
    .wknd-nav-link:not(.back)::after { content:'→'; color:var(--color-primary); opacity:0.5; }
    .wknd-nav-group { border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; }
    .wknd-nav-group .wknd-nav-link:last-child { border-bottom:none; }
    @media(max-width:640px){
      .wknd-loc-card img { height:160px; }
      .wknd-loc-card-body { padding:1.1rem; }
      .wknd-day-item, .wknd-plan-item { padding:0.85rem 1rem; }
    }
  `}</style>

  {/* ── HERO ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Weekend Retreats · Delhi NCR</span>
      </div>
      <h1 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.4rem)', fontWeight:200, letterSpacing:'-0.035em', color:'#111', lineHeight:1.1, margin:'0 0 1.5rem' }}>
        Weekend Himalayan Retreats Near Delhi
      </h1>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', margin:'0 0 1rem' }}>
        Most professionals in Delhi and NCR know they need a break. The problem is not awareness — it is logistics. Annual leave is limited, long trips require coordination, and by the time a week opens up, burnout has already set in. A weekend retreat removes the planning barrier entirely. Two nights in the Himalayas — Friday evening to Sunday afternoon — is enough to reset sleep, break the screen cycle, and return to work with a clarity that no amount of weekend sleeping-in can deliver.
      </p>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', margin:'0 0 2rem' }}>
        The Himalayan foothills sit five to seven hours from Delhi by road. A Friday departure after work places you in a mountain environment by midnight, with a full Saturday of structured restoration ahead. No flights. No complex logistics. No annual leave required. This is not a vacation — it is a functional reset designed for people who cannot afford to stop but cannot afford not to.
      </p>
      <PrimaryCTA label="Plan My Weekend Retreat" subtext="Ready for a weekend reset? A planner can help organise it." vertical="retreat" category="weekend" sourcePath="/retreats/weekend-himalayan-retreats" />
    </div>
  </section>

  {/* ── WHY IT WORKS ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Why It Works</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'0.75rem' }}>
        Why a Weekend Retreat Works for Busy Professionals
      </h2>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginBottom:'2rem' }}>
        The assumption that meaningful retreat requires a week is wrong. Environment change — not duration — is the primary driver of cognitive reset. Moving from an urban, screen-dominated context into a structured mountain environment triggers neurological downshift within hours. Two full days in that container is a complete cycle.
      </p>
      <div>
        {[
          { label:'No leave required.', body:'A Friday evening departure and Sunday evening return uses zero annual leave. For mid-career professionals and founders who guard their leave days, this is the critical advantage.' },
          { label:'Minimal travel fatigue.', body:"Five to seven hours by road from Delhi is shorter than most domestic flights once you factor in airport time. Self-drive, shared cab, or overnight bus — the approach is straightforward. You arrive tired from travel, which actually helps: the first night's sleep in mountain air is often the deepest in months." },
          { label:'Structured intensity.', body: <span>Weekend retreats are not diluted versions of longer programs. They are compressed by design — early morning sessions, full-day immersion, evening integration. Every hour is intentional. Participants frequently report that a focused 48-hour <Link href="/retreats/journeys/burnout-recovery" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>burnout recovery</Link> retreat delivers more reset than a week of unstructured holiday.</span> },
          { label:'Repeatable rhythm.', body:'A single week-long retreat per year is meaningful. A weekend retreat every quarter is transformational. The proximity of the Himalayas to Delhi makes quarterly reset not just possible but practical.' },
        ].map((item, i) => (
          <div key={i} className="wknd-why-item">
            <p><strong style={{ fontWeight:500, color:'#111' }}>{item.label}</strong> {item.body}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop:'2rem' }}>
        <PrimaryCTA label="Plan My Weekend Retreat" subtext="Share your preferred weekend and group size. We handle the rest." vertical="retreat" category="weekend" sourcePath="/retreats/weekend-himalayan-retreats" />
      </div>
    </div>
  </section>

  {/* ── LOCATIONS ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Three Locations</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'0.75rem' }}>
        Best Weekend Himalayan Retreat Locations from Delhi
      </h2>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginBottom:'2rem' }}>
        Not every mountain destination works for a weekend. The travel time must leave enough hours for genuine programming without the journey consuming the experience.
      </p>

      {/* Chakrata */}
      <div className="wknd-loc-card">
        <Image src="/Images/location/chakrata.webp" alt="Chakrata — deodar forest ridge retreat near Dehradun, 6–7 hours from Delhi" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
        <div className="wknd-loc-card-body">
          <h3><Link href="/retreats/chakrata">Chakrata — 6–7 Hours from Delhi</Link></h3>
          <p>Chakrata is arguably the strongest weekend retreat destination from Delhi. At approximately 2,200 metres on a quiet cantonment ridge, it offers genuine mountain environment without extreme altitude or tourist congestion. The drive from Delhi via Dehradun takes six to seven hours — leave by 5 PM on Friday, and you are settling into a forest-edge retreat by midnight.</p>
          <p>The landscape is defined by deodar forests, waterfalls, and ridge walks with Himalayan views on clear days. Tiger Falls provides a natural anchor point for immersive walking. The cantonment area's military heritage means low commercial development — just forest and villages. This quietness is what makes Chakrata effective for short-duration retreat work.</p>
          <p>Weekend retreat programs in <Link href="/retreats/chakrata" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>Chakrata</Link> typically include morning yoga on forest platforms, guided meditation walks, breathwork sessions, and campfire integration in the evenings. The 2-night format here feels unhurried because the environment does half the work — the quiet and the air begin the reset before any programmed session starts.</p>
        </div>
      </div>

      {/* Rishikesh */}
      <div className="wknd-loc-card">
        <Image src="/Images/location/rishikesh.webp" alt="Rishikesh — Ganges riverside yoga and meditation, 5–6 hours from Delhi" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
        <div className="wknd-loc-card-body">
          <h3><Link href="/retreats/rishikesh">Rishikesh — 5–6 Hours from Delhi</Link></h3>
          <p>Rishikesh is the fastest Himalayan destination from Delhi and the most established centre for <Link href="/retreats/journeys/yoga-and-movement" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>yoga and movement</Link> practice in India. The five-to-six-hour drive places you on the Ganges by late evening. For professionals who want the most efficient Friday-to-Sunday format with minimal travel overhead, Rishikesh delivers consistently.</p>
          <p>The retreat character here is different from Chakrata. Where Chakrata is forest silence, Rishikesh is spiritual infrastructure — ashram traditions, experienced yoga teachers, riverside meditation, and a lineage of practice that adds depth to even a short stay. Early morning practice on the riverbank, with mist rising off the water and temple bells in the distance, creates a container that manufactured settings cannot replicate.</p>
          <p>Weekend formats in <Link href="/retreats/rishikesh" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>Rishikesh</Link> tend toward structured yoga and meditation programming — two sessions per day, pranayama instruction, philosophical context, and facilitated group reflection. This suits participants who want guided practice rather than open-ended nature immersion.</p>
        </div>
      </div>

      {/* Sankri */}
      <div className="wknd-loc-card">
        <Image src="/Images/location/sankri.webp" alt="Sankri — remote Himalayan valley near Govind Wildlife Sanctuary, extended weekend" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
        <div className="wknd-loc-card-body">
          <h3><Link href="/retreats/sankri">Sankri — Extended Weekend Option (8–9 Hours)</Link></h3>
          <p>Sankri sits deeper in the Himalayas — roughly eight to nine hours from Delhi, in the upper Tons Valley near the Govind Wildlife Sanctuary. This travel time makes it tight for a standard Friday–Sunday weekend, but it works well for extended weekends and three-day holidays. If you have a Friday off, or can depart Thursday evening, Sankri offers something the closer locations cannot: true remote mountain immersion at the edge of the treeline. Pine forests, glacial rivers, and complete digital disconnection. For a longer comparison of retreat formats by duration, see our guide to <Link href="/blog/3-day-vs-5-day-himalayan-retreat" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>choosing the right retreat length</Link>.</p>
        </div>
      </div>
    </div>
  </section>

  {/* ── WHAT IT LOOKS LIKE ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>A Typical Weekend</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'0.75rem' }}>
        What a 2–3 Day Weekend Retreat Looks Like
      </h2>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginBottom:'1.75rem' }}>
        Weekend retreats follow a compressed but complete arc — arrival, immersion, and integration within 48 hours.
      </p>
      {[
        { label:'Friday evening — Arrival and settling.', body:"Most participants arrive between 10 PM and midnight after the drive from Delhi. A light welcome — herbal tea, room orientation, and a brief grounding exercise — marks the transition from travel mode to retreat mode. No structured programming. The goal is to let the journey fatigue become the bridge to deep first-night sleep in clean mountain air." },
        { label:'Saturday — Full immersion day.', body:'Saturday is the core of the retreat. Pre-dawn meditation or gentle yoga, a full morning practice session with breathwork, guided nature walk or forest immersion after lunch, an afternoon workshop (sound healing, journaling, or restorative yoga), and an evening integration circle. Meals are timed to support the rhythm. Screens stay off. The full day in mountain environment, without decisions or obligations, is where the reset happens.' },
        { label:"Sunday — Closing and departure.", body:"Sunday begins with a final morning practice — often the most powerful session, because the body and mind have already shifted from the previous day's immersion. A closing circle or intention-setting exercise anchors the experience. Breakfast and departure by late morning allow comfortable return to Delhi by evening." },
      ].map(item => (
        <div key={item.label} className="wknd-day-item">
          <p><strong style={{ fontWeight:500, color:'#111' }}>{item.label}</strong> {item.body}</p>
        </div>
      ))}
    </div>
  </section>

  {/* ── WHO IS IT FOR ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Is This For You</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'0.75rem' }}>
        Who Should Consider a Weekend Retreat
      </h2>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginBottom:'1.5rem' }}>
        Weekend Himalayan retreats are specifically for people whose constraints make longer programs impractical. That includes most of urban professional India.
      </p>
      <div style={{ border:'1px solid #e5e7eb', borderRadius:'8px', background:'#fff', padding:'0 1.25rem' }}>
        {[
          { label:'Corporate professionals (25–45)', body:'— the primary audience. People carrying decision fatigue, screen overload, and accumulated stress who cannot take a week off but urgently need restoration' },
          { label:'Startup founders and entrepreneurs', body:'— operating in always-on mode with no boundary between work and rest. A structured 48-hour container creates the separation that willpower alone cannot' },
          { label:'Creatives and freelancers', body:'— seeking environmental shift to unblock stalled work or reset perspective. Mountain air and digital silence deliver what no café can' },
          { label:'Couples needing a reset', body:'— a shared retreat experience without tourist distractions creates conversation and connection that a resort weekend does not' },
          { label:'First-time retreat participants', body:'— a weekend is the lowest commitment entry point. Two nights is enough to experience the retreat container without the intimidation of a full week' },
        ].map((item, i) => (
          <div key={i} className="wknd-who-item">
            <div className="wknd-who-dot" />
            <p><strong style={{ fontWeight:500, color:'#111' }}>{item.label}</strong> {item.body}</p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginTop:'1.5rem', marginBottom:0 }}>
        If burnout is already present, not approaching, see our dedicated <Link href="/retreats/journeys/burnout-recovery" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>Burnout Recovery</Link> program — available in weekend and extended formats at all locations.
      </p>
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
        Planning Your Friday–Sunday Himalayan Retreat
      </h2>
      {[
        { label:'Travel from Delhi.', body:'Self-drive is the most flexible option — it allows departure timing that matches your Friday schedule. Shared cabs from Delhi to Dehradun (for Chakrata) or Haridwar (for Rishikesh) are available through retreat coordination. Overnight buses are an option if you prefer sleeping through the journey. For Rishikesh, the Delhi–Dehradun Shatabdi train followed by a short taxi is the most comfortable public transport route.' },
        { label:'What to pack.', body:'Light and practical. Comfortable clothing for yoga and walking. A warm layer for mountain evenings — even in summer, nights at 2,000 metres are cool. Minimal luggage. The less you carry, the faster the mental shift begins.' },
        { label:'When to book.', body:'Weekend programs run year-round but fill quickly for long weekends, festival holidays, and popular windows (October–November, March–April). Booking two to three weeks ahead is advisable. For peak weekends, four weeks is safer.' },
        { label:'Ideal months.', body: <span>Every month has its quality. October and November bring crisp clear skies. February and March offer warming days with snow-capped views. May–June is ideal for <Link href="/retreats/summer-himalayan-retreats" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>summer Himalayan retreats</Link> — escaping Delhi heat for mountain air. December–January suits <Link href="/retreats/winter-himalayan-retreats" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>winter Himalayan retreats</Link> for those drawn to cold-weather contemplation.</span> },
        { label:'Weather notes.', body:'Chakrata and Rishikesh are accessible by road in all seasons. Sankri roads may be affected by snow in January–February or landslides during monsoon.' },
      ].map((item, i) => (
        <div key={i} className="wknd-plan-item">
          <p><strong style={{ fontWeight:500, color:'#111' }}>{item.label}</strong> {item.body}</p>
        </div>
      ))}
    </div>
  </section>

  {/* ── NAV CALLOUT ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderLeft:'3px solid var(--color-primary)', borderRadius:'8px', padding:'1rem 1.25rem', fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555' }}>
        <div style={{ fontSize:'0.55rem', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase' as const, color:'var(--color-primary)', opacity:0.7, marginBottom:'0.35rem' }}>Longer Programs</div>
        Looking for longer immersion?{' '}
        <Link href="/retreats/himalayan-retreats" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>Himalayan Retreats in India</Link>{' '}
        covers five-day, seven-day, and custom-length formats across all four locations.
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
      <div className="wknd-nav-group">
        <Link href="/retreats" className="wknd-nav-link back">All Retreats</Link>
      </div>
    </div>
  </section>

      </article>
    </TrackedPage>
  );
}
