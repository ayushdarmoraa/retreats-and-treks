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

const PATH = '/retreats/winter-himalayan-retreats';

export function generateMetadata(): Metadata {
  return {
    title: 'Winter Himalayan Retreats in India — December to February',
    description:
      'Winter retreat experiences across the Indian Himalayas. Snow silence in Sankri, forest calm in Chakrata, alpine stillness in Munsiyari, and mild spiritual immersion in Rishikesh. December–February programs.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Winter Himalayan Retreats in India — December to February',
      description:
        'Snow silence, crisp air, fewer tourists, slower rhythm. Winter retreat programs across four Himalayan locations.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Winter Himalayan Retreats in India — December to February'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Is it too cold for a winter Himalayan retreat?',
    answer:
      'Temperatures vary by location and altitude. Rishikesh remains mild (8–20°C). Chakrata is cool but manageable (2–15°C). Sankri and Munsiyari can drop below freezing at night, but retreat accommodations provide warm bedding, heaters, and hot meals. Most participants find the cold invigorating rather than uncomfortable — it sharpens attention and deepens sleep. Packing appropriate layers is recommended.',
  },
  {
    question: 'Will there be snow during a winter retreat?',
    answer:
      'Sankri typically receives snowfall from mid-December through February, often creating a snow-covered landscape. Munsiyari sees snow at higher elevations and occasionally in the town itself. Chakrata receives light snow in some years, particularly in January. Rishikesh does not receive snow. Snow conditions vary by year — retreat programs adapt schedules accordingly.',
  },
  {
    question: 'Are mountain roads accessible in winter?',
    answer:
      'Chakrata and Rishikesh remain accessible by road throughout winter. Sankri roads may be affected by snowfall — retreat operators monitor conditions and provide updated travel guidance before departure. Munsiyari access can be more challenging in heavy snow years, and some programs operate on a weather-dependent basis. Participants receive detailed travel advisories before booking confirmation.',
  },
  {
    question: 'What should I pack for a winter Himalayan retreat?',
    answer:
      'Layered thermal clothing is essential — base layers, fleece mid-layers, and a warm outer jacket. Warm socks, gloves, and a hat are recommended for higher-altitude locations. Comfortable indoor clothing for practice sessions, a reusable water bottle, personal medications, and a headlamp or torch for early mornings are also useful. Detailed packing lists are provided after booking.',
  },
  {
    question: 'Are winter retreats suitable for first-time participants?',
    answer:
      'Yes. Winter retreats often have smaller group sizes, which creates a more intimate and supportive container. The slower seasonal rhythm naturally suits first-time participants who benefit from reduced stimulation. However, those uncomfortable with cold temperatures may prefer spring or autumn programs, or the milder climate of Rishikesh.',
  },
  {
    question: 'How do winter retreats differ from other seasons?',
    answer:
      'Winter retreats are characterised by smaller groups, quieter environments, and more introspective programming. Snow cover and colder air reduce the impulse toward outdoor activity, naturally deepening indoor practices like meditation, breathwork, and journaling. Early sunsets create longer evenings for reflection. The overall pace is slower and more contained than warmer-season programs.',
  },
];

export default function WinterHimalayanRetreatsPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Himalayan Retreats', url: buildCanonicalUrl('/retreats/himalayan-retreats') },
    { name: 'Winter Retreats', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <AutoArticleSchema
        title="Winter Himalayan Retreats in India"
        description="Winter retreat experiences across the Indian Himalayas. Snow silence in Sankri, forest calm in Chakrata, alpine stillness in Munsiyari, and mild spiritual immersion in Rishikesh."
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
          { name: 'Winter Retreats' },
        ]}
      />

      <article>

        <style>{`
    .win-loc-card { background:#fff; border:1px solid #e5e7eb; border-top:2px solid var(--color-primary); border-radius:8px; overflow:hidden; margin-bottom:1.25rem; }
    .win-loc-card img { width:100%; height:200px; object-fit:cover; display:block; }
    .win-loc-card-body { padding:1.5rem; }
    .win-loc-card-body h3 { font-family:var(--font-geist-sans),sans-serif; font-size:0.95rem; font-weight:500; color:#111; margin:0 0 0.85rem; letter-spacing:-0.01em; }
    .win-loc-card-body h3 a { color:inherit; text-decoration:none; }
    .win-loc-card-body h3 a:hover { color:var(--color-primary); }
    .win-loc-card-body p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0 0 0.75rem; }
    .win-loc-card-body p:last-child { margin-bottom:0; }
    .win-why-item { border-left:2px solid var(--color-primary); padding-left:1rem; margin-bottom:1.25rem; }
    .win-why-item p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0; }
    .win-month-item { background:#fff; border:1px solid #e5e7eb; border-left:3px solid var(--color-primary); border-radius:8px; padding:1rem 1.25rem; margin-bottom:0.75rem; }
    .win-month-item p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0; }
    .win-who-item { display:flex; gap:1rem; padding:0.85rem 0; border-bottom:1px solid #f0f0f0; }
    .win-who-item:last-child { border-bottom:none; }
    .win-who-dot { flex-shrink:0; margin-top:0.55rem; width:8px; height:8px; border-radius:50%; background:var(--color-primary); opacity:0.6; }
    .win-who-item p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0; }
    .win-format-item { display:flex; gap:1rem; padding:0.85rem 0; border-bottom:1px solid #f0f0f0; }
    .win-format-item:last-child { border-bottom:none; }
    .win-format-dot { flex-shrink:0; margin-top:0.55rem; width:8px; height:8px; border-radius:50%; background:var(--color-primary); opacity:0.6; }
    .win-format-item p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0; }
    .win-nav-link { display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1rem; border-bottom:1px solid #f0f0f0; font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; color:#333; text-decoration:none; }
    .win-nav-link:hover { background:#f7f9f7; color:var(--color-primary); }
    .win-nav-link.back::before { content:'←'; color:var(--color-primary); opacity:0.5; margin-right:0.5rem; }
    .win-nav-link:not(.back)::after { content:'→'; color:var(--color-primary); opacity:0.5; }
    .win-nav-group { border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; }
    .win-nav-group .win-nav-link:last-child { border-bottom:none; }
    @media(max-width:640px){
      .win-loc-card img { height:160px; }
      .win-loc-card-body { padding:1.1rem; }
    }
  `}</style>

  {/* ── HERO ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', margin:'0 0 1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Winter Retreats · Dec–Feb</span>
      </div>
      <h1 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.4rem)', fontWeight:200, letterSpacing:'-0.035em', color:'#111', lineHeight:1.1, margin:'0 0 1.5rem' }}>
        Winter Himalayan Retreats in India
      </h1>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', margin:'0 0 1rem' }}>
        Winter in the Himalayas strips everything to essentials. Snow absorbs sound. Cold air sharpens attention. Tourist traffic drops to near zero. The mountains become quieter, starker, and more honest — and retreats held in this season carry a different weight than those in warmer months.
      </p>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', margin:'0 0 1rem' }}>
        From December through February, the Indian Himalayan foothills and valleys enter their most introspective season. Days are shorter. Mornings are crisp and still. Evenings arrive early, creating long hours for reflection, reading, and fireside quiet. The rhythm of winter naturally slows the nervous system — something no facilitator can manufacture.
      </p>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', margin:'0 0 2rem' }}>
        For people who have spent the year overstimulated, overcommitted, or simply moving too fast, a winter Himalayan retreat offers what no warm-weather holiday can: genuine deceleration, held by a landscape that is itself at rest.
      </p>
      <PrimaryCTA label="Plan My Winter Retreat" subtext="Considering a winter retreat? A planner can help you choose." vertical="retreat" category="seasonal" sourcePath="/retreats/winter-himalayan-retreats" />
    </div>
  </section>

  {/* ── WHY WINTER ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Why Winter</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'0.75rem' }}>
        Why Winter Changes the Retreat Experience
      </h2>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginBottom:'2rem' }}>
        Retreat environments are shaped by season as much as by facilitation. In winter, the Himalayas create conditions that are qualitatively different from spring or autumn programs — not better or worse, but distinct in what they offer the nervous system.
      </p>
      <div>
        {[
          { label:'Reduced stimulation.', body:'Snow cover dampens ambient sound. Fewer travellers mean quieter roads, emptier trails, and smaller groups. The external world becomes simpler — and that simplicity transfers inward. Participants consistently report that silence feels more natural in winter, less like a discipline and more like a continuation of what the landscape is already doing.' },
          { label:'Snow acoustics and sensory softening.', body:'Fresh snow absorbs high-frequency sound, creating a muted acoustic environment that is measurably different from other seasons. For meditation, breathwork, and journaling, this matters — the container is held not just by the facilitator, but by the physical environment itself.' },
          { label:'Early sunsets and long evenings.', body:'When darkness arrives by 5:30 PM, the evening expands. There is no pressure to be outside, no daylight guilt. Fireside conversation, quiet reading, early sleep — winter naturally creates the spacious evenings that retreat designers try to build artificially in other seasons.' },
          { label:'Small group intimacy.', body:'Winter programs draw fewer participants, which means smaller circles, more facilitator attention, and deeper relational dynamics. Groups of 6–10 create a different kind of trust than groups of 20.' },
          { label:'Contrast therapy.', body:'Cold mornings and warm interiors create a natural rhythm of contraction and expansion. Stepping from a heated room into sharp mountain air at dawn, then returning to hot chai and a warm practice space — this oscillation is invigorating without being extreme. The body relearns that discomfort can be brief and purposeful.' },
        ].map(item => (
          <div key={item.label} className="win-why-item">
            <p><strong style={{ fontWeight:500, color:'#111' }}>{item.label}</strong> {item.body}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop:'2rem' }}>
        <PrimaryCTA label="Plan My Winter Retreat" subtext="Share your dates and we will match you to the right winter retreat." vertical="retreat" category="seasonal" sourcePath="/retreats/winter-himalayan-retreats" />
      </div>
    </div>
  </section>

  {/* ── LOCATIONS ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Four Locations</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'0.75rem' }}>
        Our Winter Retreat Locations
      </h2>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginBottom:'2rem' }}>
        Each of our four Himalayan locations responds differently to winter. Choosing the right one depends on how much cold you welcome, what kind of stillness you seek, and whether you want snow or simply quiet.
      </p>

      {/* Sankri */}
      <div className="win-loc-card">
        <Image src="/Images/location/sankri.webp" alt="Sankri — snow-covered valley and pine forests in winter, Garhwal" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
        <div className="win-loc-card-body">
          <h3><Link href="/retreats/sankri">Sankri — Snow and High-Altitude Stillness</Link></h3>
          <p>Sankri in winter is a snow-covered valley at the edge of the treeline. The village empties of trekkers. The Tons River slows. Pine forests hold snow on their branches, creating corridors of white silence. Temperatures drop below freezing at night, and mornings require real warmth — both external and internal. Retreats here operate in genuine mountain winter: wood fires, layered clothing, and the kind of quiet that only comes with snow on the ground. This is for people who want winter as an active element of the retreat, not a backdrop. For seasonal planning, see our guide on <Link href="/blog/best-time-for-retreat-in-sankri" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>the best time for a retreat in Sankri</Link>.</p>
        </div>
      </div>

      {/* Chakrata */}
      <div className="win-loc-card">
        <Image src="/Images/location/chakrata.webp" alt="Chakrata — deodar forest in winter calm near Dehradun" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
        <div className="win-loc-card-body">
          <h3><Link href="/retreats/chakrata">Chakrata — Quiet Forest Winter</Link></h3>
          <p>Chakrata sits lower than Sankri, along a forested ridge that sees winter as cold calm rather than deep snow. The deodar and oak forests thin in winter, opening longer views across valleys. Morning frost covers the ground. Days are clear and bright, nights cold but not extreme. Snow visits occasionally — a light dusting rather than a blanket. This is the right winter location for people who want seasonal stillness without the intensity of high-altitude cold. Accessibility from Delhi remains straightforward even in January, making it practical for three- to five-day formats.</p>
        </div>
      </div>

      {/* Munsiyari */}
      <div className="win-loc-card">
        <Image src="/Images/location/munsiyari.webp" alt="Munsiyari — Panchachuli range under winter snow, Kumaon Himalaya" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
        <div className="win-loc-card-body">
          <h3><Link href="/retreats/munsiyari">Munsiyari — Alpine Silence (Weather Dependent)</Link></h3>
          <p>Munsiyari in winter faces the Panchachuli range under full snow. The alpine meadows above the town become inaccessible. The village itself becomes very quiet — few visitors, reduced services, and a pace set entirely by weather. Winter retreats in Munsiyari are not guaranteed — road access can close after heavy snowfall, and programs operate on a weather-dependent basis. But when conditions allow, this is perhaps the most raw and unmediated winter retreat setting we offer. For participants who are comfortable with uncertainty and genuine remoteness.</p>
        </div>
      </div>

      {/* Rishikesh */}
      <div className="win-loc-card">
        <Image src="/Images/location/rishikesh.webp" alt="Rishikesh — Ganges riverside in mild winter, ashram and yoga programs" width={600} height={200} sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
        <div className="win-loc-card-body">
          <h3><Link href="/retreats/rishikesh">Rishikesh — Mild Winter on the Ganges</Link></h3>
          <p>Rishikesh does not experience mountain winter. Days are cool and comfortable (15–20°C), nights are brisk but not cold. The Ganges runs clearer in winter. Pilgrimage traffic peaks around festivals, creating collective spiritual energy. For participants who want a winter retreat without cold-weather intensity — or who prefer spiritual tradition and community over isolation — Rishikesh offers structured practice in a mild, accessible climate. Winter here means deeper ashram rhythms and smaller yoga cohorts, not snow.</p>
        </div>
      </div>
    </div>
  </section>

  {/* ── BEST MONTHS ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>When To Come</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'1.75rem' }}>
        Best Months for a Winter Retreat
      </h2>
      {[
        { label:'December.', body:'The transition month. Snow begins arriving at higher elevations (Sankri, Munsiyari). Chakrata turns cold and clear. Rishikesh enters peak pilgrimage season. December retreats offer the first taste of winter stillness without the deepest cold. Roads are generally accessible.' },
        { label:'January.', body:'The coldest month across all Himalayan locations. Sankri is fully snow-covered. Munsiyari may become intermittently inaccessible. Chakrata sees its lowest temperatures. This is the month for participants who actively seek deep winter — small groups, maximum stillness, and genuine cold as a container for practice.' },
        { label:'February.', body:'The late-winter window. Days begin lengthening. Snow persists at altitude but becomes softer. Chakrata warms slightly. Rishikesh starts the transition toward spring energy. February retreats balance winter depth with the first signals of seasonal turn — a good choice for people who want winter character without the extremes of January.' },
      ].map(item => (
        <div key={item.label} className="win-month-item">
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
        Who a Winter Retreat Is For
      </h2>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginBottom:'1.5rem' }}>
        Winter retreats attract a specific kind of participant — people who recognise that the discomfort of cold and the scarcity of daylight are not obstacles but tools. Not everyone wants this. Those who do tend to be seeking something deeper than relaxation.
      </p>
      <div style={{ border:'1px solid #e5e7eb', borderRadius:'8px', background:'#fff', padding:'0 1.25rem' }}>
        {[
          { label:'Burnout recovery.', body:'The reduced stimulation of a winter Himalayan setting is neurologically ideal for overstimulated systems. Cold air, early sleep, and limited screen access create conditions the nervous system cannot resist resting in.' },
          { label:'Deep reflection and transition.', body:'Year-end and new-year retreats serve people processing career changes, relationship shifts, or creative blocks. Winter creates the psychological container for honest self-assessment.' },
          { label:'Digital detox.', body:'Shorter days and cold evenings eliminate the usual triggers for compulsive screen use. Winter removes the competition — there is nothing more stimulating outside the retreat to pull your attention.' },
          { label:'Cold-weather seekers.', body:'Some people simply come alive in the cold. For them, the sharp air, snow light, and physical aliveness of a Himalayan winter are not tolerated but desired. These participants often find winter retreats more transformative than any other season.' },
        ].map((item, i) => (
          <div key={i} className="win-who-item">
            <div className="win-who-dot" />
            <p><strong style={{ fontWeight:500, color:'#111' }}>{item.label}</strong> {item.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ── FORMAT ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Best Fit</span>
      </div>
      <h2 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.4rem,2.5vw,1.85rem)', fontWeight:200, letterSpacing:'-0.03em', color:'#111', lineHeight:1.15, marginBottom:'0.75rem' }}>
        Which Retreat Format Works Best in Winter
      </h2>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginBottom:'1.5rem' }}>
        Not every retreat format suits winter equally. The season amplifies certain styles and makes others impractical. Three formats align particularly well:
      </p>
      <div style={{ border:'1px solid #e5e7eb', borderRadius:'8px', background:'#f7f9f7', padding:'0 1.25rem' }}>
        {[
          { href:'/retreats/journeys/burnout-recovery', label:'Burnout Recovery', body:'Winter reduces input to the minimum. The cold, quiet, and darkness support nervous system recovery naturally, making this the strongest seasonal match for burnout programs.' },
          { href:'/retreats/journeys/meditation-and-silence', label:'Meditation & Silence', body:'Snow acoustics and fewer people create ambient silence that supports formal practice without artificial enforcement. Winter silence feels organic.' },
          { href:'/retreats/journeys/rest-and-reset', label:'Rest & Reset', body:'Short days and long evenings naturally encourage extra sleep, slower meals, and unhurried integration. Winter does the work of rest without requiring discipline.' },
        ].map(item => (
          <div key={item.href} className="win-format-item">
            <div className="win-format-dot" />
            <p><Link href={item.href} style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>{item.label}</Link>{' — '}{item.body}</p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.88rem', fontWeight:300, lineHeight:1.85, color:'#555', marginTop:'1.5rem', marginBottom:0 }}>
        For a broader view of how all retreat formats are structured, see our complete guide to <Link href="/retreats/himalayan-retreats" style={{ color:'var(--color-primary)', textDecoration:'none', fontWeight:500 }}>Himalayan Retreats in India</Link>.
      </p>
    </div>
  </section>

  {/* ── FAQ ── */}
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
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
  <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem' }}>
    <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
        <span style={{ width:'24px', height:'1px', background:'var(--color-primary)', opacity:0.5, display:'inline-block' }} />
        <span style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'0.56rem', letterSpacing:'0.28em', textTransform:'uppercase' as const, color:'var(--color-primary)', fontWeight:500, opacity:0.7 }}>Explore More</span>
      </div>
      <div className="win-nav-group">
        <Link href="/retreats/himalayan-retreats" className="win-nav-link back">Himalayan Retreats</Link>
        <Link href="/retreats" className="win-nav-link">All Retreats</Link>
      </div>
    </div>
  </section>

      </article>
    </TrackedPage>
  );
}
