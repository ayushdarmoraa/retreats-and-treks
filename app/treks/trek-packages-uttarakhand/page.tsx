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

const PATH = '/treks/trek-packages-uttarakhand';

export function generateMetadata(): Metadata {
  return {
    title: 'Himalayan Trek Packages in Uttarakhand — All-Inclusive Guided Treks | Retreats And Treks',
    description:
      'Book all-inclusive trek packages in Uttarakhand — Kedarkantha, Har Ki Dun, Tiger Fall and more. Guide, meals, permits and camping included. Packages for beginners, groups and solo trekkers.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Himalayan Trek Packages in Uttarakhand',
      description:
        'All-inclusive trekking packages across Uttarakhand. Certified guides, meals, permits and accommodation included. Individual and group packages from Sankri and Chakrata.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is included in a trekking package?',
    answer:
      'Our trek packages include a certified trek leader and support staff, all meals on the trail (breakfast, lunch, dinner, and snacks), accommodation (guesthouse, homestay, or camping depending on the route), forest permits and entry fees, basic safety gear (first-aid kit, emergency communication), and trekking equipment where required (tents, sleeping bags, cooking equipment). Porters or pack animals handle heavy gear. You carry only a daypack with personal essentials.',
  },
  {
    question: 'Are permits included in the package?',
    answer:
      'Yes. All forest permits, national park entry fees, and camping permissions are included in the package cost and arranged by the operator before departure. You do not need to apply for or carry any permits yourself. This includes the Govind National Park permit for Kedarkantha and Har Ki Dun, and the Chakrata forest range permissions for Tiger Fall and Budher Caves.',
  },
  {
    question: 'Do packages include transport from Delhi?',
    answer:
      'Transport from Delhi is available as an optional add-on for most packages. The standard package begins and ends at the trek base — Sankri or Chakrata. Delhi-to-base transport can be added as a shared vehicle (cost-effective for groups) or private vehicle (flexible scheduling). Some operators include transport in premium package tiers. Check availability when booking.',
  },
  {
    question: 'Is equipment provided?',
    answer:
      'Yes. Camping equipment — tents, sleeping bags, sleeping mats, and cooking gear — is provided as part of the package. For winter treks, gaiters, microspikes, and trekking poles are included. You need to bring personal clothing (layered for the season), trekking boots, a daypack, sunscreen, sunglasses, and a headlamp. A detailed gear checklist is provided after booking.',
  },
  {
    question: 'Can beginners book trek packages?',
    answer:
      'Yes. Most packages are designed for beginner-to-moderate fitness levels. Tiger Fall and Budher Caves in Chakrata require no prior trekking experience. Kedarkantha is the most popular first Himalayan trek in India — thousands of beginners complete it every season. The guided format means pace management, safety, navigation, and logistics are handled by the team. You focus on walking and enjoying the mountains.',
  },
  {
    question: 'What is the cancellation policy?',
    answer:
      'Cancellation policies vary by operator and season. Standard terms: full refund if cancelled 30 or more days before departure, 50 percent refund between 15 and 29 days, no refund within 14 days. Peak season bookings (December to January for Kedarkantha, May to June for Har Ki Dun) may have stricter terms due to high demand. Date changes are usually accommodated with advance notice. Trip insurance is recommended.',
  },
];

export default function TrekPackagesUttarakhandPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Treks', url: buildCanonicalUrl('/treks') },
    { name: 'Trek Packages Uttarakhand', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
   <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <style>{`
        .tpu-body { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0 0 1rem; }
        .tpu-h2 { font-family:var(--font-geist-sans),sans-serif; font-size:clamp(1.4rem,2.5vw,1.85rem); font-weight:200; letter-spacing:-0.03em; color:#111; line-height:1.15; margin:0 0 0.75rem; }
        .tpu-h3 { font-family:var(--font-geist-sans),sans-serif; font-size:0.95rem; font-weight:500; color:#111; letter-spacing:-0.01em; margin:0 0 0.4rem; }
        .tpu-eyebrow { display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem; }
        .tpu-eyebrow-line { width:24px; height:1px; background:var(--color-primary); opacity:0.5; display:inline-block; }
        .tpu-eyebrow-text { font-size:0.56rem; letter-spacing:0.28em; text-transform:uppercase; color:var(--color-primary); font-weight:500; opacity:0.7; }
        .tpu-link { color:var(--color-primary); font-weight:500; text-decoration:none; border-bottom:1px solid rgba(15,118,110,0.25); }
        .tpu-link:hover { border-bottom-color:var(--color-primary); }
        .tpu-trek-card { background:#fff; border:1px solid #eef0ee; border-top:2px solid var(--color-primary); border-radius:8px; padding:1.25rem 1.5rem; margin-bottom:0.75rem; transition:transform 0.18s,box-shadow 0.18s; }
        .tpu-trek-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,0.07); }
        .tpu-why-item { border-left:2px solid var(--color-primary); padding-left:1rem; margin-bottom:1.25rem; }
        .tpu-why-item strong { display:block; font-size:0.82rem; font-weight:500; color:#111; margin-bottom:0.2rem; }
        .tpu-who-item { display:flex; gap:0.75rem; padding:0.9rem 1rem; border-bottom:1px solid #f0f0f0; }
        .tpu-who-item:last-child { border-bottom:none; }
        .tpu-who-dot { width:6px; height:6px; border-radius:50%; background:var(--color-primary); flex-shrink:0; margin-top:0.55rem; opacity:0.6; }
        .tpu-includes-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:1.25rem; }
        .tpu-include-card { background:#fff; border:1px solid #eef0ee; border-radius:8px; padding:1rem 1.25rem; }
        .tpu-include-card strong { display:block; font-size:0.82rem; font-weight:500; color:#111; margin-bottom:0.25rem; }
        .tpu-callout { background:#fff; border:1px solid #e5e7eb; border-left:3px solid var(--color-primary); border-radius:8px; padding:1rem 1.25rem; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; }
        .tpu-callout a { color:var(--color-primary); font-weight:500; text-decoration:none; border-bottom:1px solid rgba(15,118,110,0.25); }
        @media(max-width:700px){ .tpu-includes-grid { grid-template-columns:1fr; } .tpu-trek-card { padding:1rem; } }
      `}</style>

      <Breadcrumb items={[{ name:'Home', href:'/' }, { name:'Treks', href:'/treks' }, { name:'Trek Packages Uttarakhand' }]} />

      <article>

        {/* ── HERO ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tpu-eyebrow"><span className="tpu-eyebrow-line" /><span className="tpu-eyebrow-text">All-Inclusive · Guided · Uttarakhand</span></div>
            <h1 style={{ fontFamily:'var(--font-geist-sans),sans-serif', fontSize:'clamp(1.75rem,3.5vw,2.4rem)', fontWeight:200, letterSpacing:'-0.035em', color:'#111', lineHeight:1.1, margin:'0 0 1.5rem' }}>
              Himalayan Trek Packages in Uttarakhand
            </h1>
            <p className="tpu-body" style={{ margin:'0 0 1rem' }}>
              All-inclusive. Guided. Everything handled. Our Uttarakhand trekking packages
              cover the complete experience — certified trek leader, meals on trail,
              accommodation, forest permits, and safety equipment. You arrive at the base,
              walk, and the rest is managed. No logistics to arrange, no permits to chase, no
              gear to source. Whether you are booking as an individual, a couple, a corporate
              team, or a student group, the format is the same: professional support from
              trailhead to return.
            </p>
            <p className="tpu-body" style={{ margin:0 }}>
              Packages range from single-day forest treks to multi-day summit routes.
              Duration, season, and group size determine the structure. Every package is
              designed to make Himalayan trekking accessible — regardless of prior experience.
            </p>
          </div>
        </section>

        {/* ── CTA 1 ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'3rem', paddingBottom:'3rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <PrimaryCTA label="Plan My Trek Package" subtext="Looking for a guided package? Tell us what you need." vertical="trek" category="packages" sourcePath="/treks/trek-packages-uttarakhand" />
          </div>
        </section>

        {/* ── WHAT IS INCLUDED ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tpu-eyebrow"><span className="tpu-eyebrow-line" /><span className="tpu-eyebrow-text">What's Included</span></div>
            <h2 className="tpu-h2">What Is Included in Our Trek Packages?</h2>
            <div className="tpu-includes-grid">
              <div className="tpu-include-card">
                <strong>Certified trek leader and support staff.</strong>
                <p className="tpu-body" style={{ margin:0 }}>Every group is led by an experienced, locally certified guide with first-aid training and route expertise. Support staff handle camp setup, cooking, and porter coordination. The guide-to-trekker ratio stays below 1:8 for safety and pace management.</p>
              </div>
              <div className="tpu-include-card">
                <strong>Accommodation.</strong>
                <p className="tpu-body" style={{ margin:0 }}>Guesthouse or homestay at base camp. High-quality alpine tents at trail camps. Sleeping bags and mats provided. The accommodation format depends on the route — Chakrata packages use homestays, Sankri packages combine guesthouses with trail camping.</p>
              </div>
              <div className="tpu-include-card">
                <strong>All meals.</strong>
                <p className="tpu-body" style={{ margin:0 }}>Breakfast, lunch (packed or hot depending on trail logistics), dinner, and trail snacks. Meals are freshly prepared on trail by a dedicated cook. Vegetarian and non-vegetarian options available. Dietary requirements accommodated with advance notice.</p>
              </div>
              <div className="tpu-include-card">
                <strong>Permits and forest fees.</strong>
                <p className="tpu-body" style={{ margin:0 }}>All necessary permits — Govind National Park entry, forest range permissions, camping permits — are pre-arranged and included. No paperwork or permit applications required from you.</p>
              </div>
              <div className="tpu-include-card">
                <strong>Basic safety gear.</strong>
                <p className="tpu-body" style={{ margin:0 }}>First-aid kit, emergency communication equipment, and oxygen cylinder (for high-altitude routes). For winter treks: gaiters, microspikes, and trekking poles included.</p>
              </div>
              <div className="tpu-include-card">
                <strong>Transport (optional add-on).</strong>
                <p className="tpu-body" style={{ margin:0 }}>Delhi-to-base-camp transport is available as a shared or private vehicle add-on. The standard package begins and ends at the trek base. Self-drive and public transport options are also detailed in pre-departure information.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA 2 ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'3rem', paddingBottom:'3rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <PrimaryCTA label="Plan My Trek Package" subtext="Share your dates and group size. We will build the right package." vertical="trek" category="packages" sourcePath="/treks/trek-packages-uttarakhand" />
          </div>
        </section>

        {/* ── POPULAR PACKAGES ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tpu-eyebrow"><span className="tpu-eyebrow-line" /><span className="tpu-eyebrow-text">Popular Packages</span></div>
            <h2 className="tpu-h2">Popular Trek Packages in Uttarakhand</h2>

            <div className="tpu-trek-card">
              <h3 className="tpu-h3">Kedarkantha Trek Package</h3>
              <p className="tpu-body" style={{ margin:'0.5rem 0 0' }}>
                The <Link href="/treks/location/sankri/kedarkantha-trek" className="tpu-link">Kedarkantha summit trek</Link> is the most booked package in our portfolio. Standard format: 4 days, 3 nights from <Link href="/treks/location/sankri" className="tpu-link">Sankri trek base</Link>. Summit at 3,800 metres with 360-degree Himalayan panorama. Available in multiple itinerary options: the standard 4-day guided route with gradual acclimatisation, a 3-day compressed format for experienced trekkers, and a winter special (December to February) with enhanced cold-weather gear and snow support. Group packages available for corporate teams and student batches.
              </p>
            </div>

            <div className="tpu-trek-card">
              <h3 className="tpu-h3">Har Ki Dun Trek Package</h3>
              <p className="tpu-body" style={{ margin:'0.5rem 0 0' }}>
                The <Link href="/treks/location/sankri/har-ki-dun-trek" className="tpu-link">Har Ki Dun valley trek</Link> is the premier valley trek package. 6 days, 5 nights through the Tons Valley to a glacial amphitheatre surrounded by 5,000-metre peaks. Best from April to June and September to November. The package includes village homestay stops, multiple camping locations with hot meals, and guided exploration of the valley floor. This is the immersive option — for trekkers who want sustained mountain time rather than a quick summit.
              </p>
            </div>

            <div className="tpu-trek-card">
              <h3 className="tpu-h3">Tiger Fall &amp; Short Trek Packages</h3>
              <p className="tpu-body" style={{ margin:'0.5rem 0 0' }}>
                The <Link href="/treks/location/chakrata/tiger-fall-trek" className="tpu-link">Tiger Fall Trek in Chakrata</Link> and <Link href="/treks/location/chakrata/budher-caves-trek" className="tpu-link">Budher Caves Trek</Link> operate as <Link href="/treks/3-day-treks-uttarakhand" className="tpu-link">3-day treks in Uttarakhand</Link> from <Link href="/treks/location/chakrata" className="tpu-link">Chakrata trek base</Link>. The short-trek format — 2 nights, 3 days — includes homestay accommodation, guided forest trekking, and all meals. Ideal for first-time trekkers, corporate weekends, and couples. These are the lowest-commitment packages: no altitude concerns, no multi-day camping, and the shortest drive from Delhi. Available year-round with seasonal variations in trail conditions.
              </p>
            </div>
          </div>
        </section>

        {/* ── COST STRUCTURE ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tpu-eyebrow"><span className="tpu-eyebrow-line" /><span className="tpu-eyebrow-text">Pricing</span></div>
            <h2 className="tpu-h2">How Much Do Trek Packages Cost?</h2>
            <p className="tpu-body">Package pricing depends on four factors, and understanding them helps you compare options accurately.</p>
            <div className="tpu-why-item">
              <strong>Duration.</strong>
              <p className="tpu-body" style={{ margin:0 }}>Longer treks cost more — additional days mean additional camping, meals, guide days, and permit costs. A 3-day Chakrata package costs significantly less than a 6-day Har Ki Dun package.</p>
            </div>
            <div className="tpu-why-item">
              <strong>Group size.</strong>
              <p className="tpu-body" style={{ margin:0 }}>Per-person cost decreases with larger groups. Shared guide fees, transport, and camp logistics make group bookings more cost-effective. Solo and couple bookings join scheduled group departures at standard per-person rates.</p>
            </div>
            <div className="tpu-why-item">
              <strong>Season.</strong>
              <p className="tpu-body" style={{ margin:0 }}>Peak-season packages — <Link href="/treks/winter-treks-uttarakhand" className="tpu-link">winter treks in Uttarakhand</Link> (December to January) and <Link href="/treks/summer-treks-uttarakhand" className="tpu-link">summer treks in Uttarakhand</Link> (May to June) — carry higher demand and may include premium pricing. Shoulder seasons (October to November, February to March) often offer the best value-to-experience ratio.</p>
            </div>
            <div className="tpu-why-item" style={{ marginBottom:0 }}>
              <strong>Transport inclusion.</strong>
              <p className="tpu-body" style={{ margin:0 }}>Base-camp-only packages are the most affordable. Adding Delhi-to-base transport (shared vehicle) increases cost moderately. Private vehicle transport is the premium option. Self-drive trekkers can save by handling their own transport.</p>
            </div>
            <p className="tpu-body" style={{ margin:'1.25rem 0 0' }}>
              For current pricing on specific routes and dates, contact us directly with your preferred trek, dates, and group size. We provide transparent, itemised quotes with no hidden charges.
            </p>
          </div>
        </section>

        {/* ── WHO SHOULD BOOK ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tpu-eyebrow"><span className="tpu-eyebrow-line" /><span className="tpu-eyebrow-text">Who It's For</span></div>
            <h2 className="tpu-h2">Who Should Book a Trek Package?</h2>
            <div style={{ border:'1px solid #eef0ee', borderRadius:8, overflow:'hidden' }}>
              {[
                { label:'Solo travellers.', body:'Join a scheduled group departure. You trek with a small group, share meals and camps, and have guided support throughout. No solo navigation, no solo logistics. Many trekkers meet lifelong friends on group departures.' },
                { label:'First-time trekkers.', body:<>A guided package is the safest and most enjoyable way to start. Everything is handled — you focus on the experience. See our <Link href="/treks/beginner-treks-uttarakhand" className="tpu-link">beginner treks in Uttarakhand</Link> guide for route recommendations.</> },
                { label:'Corporate groups.', body:'Custom packages for team-building treks — Chakrata for weekends, Kedarkantha for immersive programmes. Dedicated guides, group accommodation, and logistics coordination included. We handle the operational complexity so your team focuses on the experience.' },
                { label:'Student groups.', body:'Budget-optimised packages for college and university groups. Group rates, shared transport, and structured itineraries that balance challenge with safety. Ideal during vacation windows (May to June, October).' },
              ].map((item, i, arr) => (
                <div key={i} className="tpu-who-item" style={{ borderBottom: i < arr.length-1 ? '1px solid #f0f0f0' : 'none' }}>
                  <span className="tpu-who-dot" />
                  <p className="tpu-body" style={{ margin:0 }}><strong style={{ fontWeight:500, color:'#111' }}>{item.label}</strong> {item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMMERCIAL NAV ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#ffffff', paddingTop:'3rem', paddingBottom:'3rem', borderBottom:'1px solid #e5e7eb' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tpu-callout">
              <p style={{ margin:0 }}>Exploring routes before booking? See the full <Link href="/treks" style={{ color:'var(--color-primary)', fontWeight:500, textDecoration:'none', borderBottom:'1px solid rgba(15,118,110,0.25)' }}>Himalayan treks directory</Link> for detailed itineraries across all seasons and difficulty levels.</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ width:'100vw', marginLeft:'calc(-50vw + 50%)', background:'#f7f9f7', paddingTop:'4rem', paddingBottom:'4rem' }}>
          <div style={{ maxWidth:'52rem', margin:'0 auto', padding:'0 2rem' }}>
            <div className="tpu-eyebrow"><span className="tpu-eyebrow-line" /><span className="tpu-eyebrow-text">FAQ</span></div>
            <h2 className="tpu-h2" style={{ marginBottom:'1.75rem' }}>Frequently Asked Questions</h2>
            <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
          </div>
        </section>

      </article>
    </TrackedPage>
  );
}
