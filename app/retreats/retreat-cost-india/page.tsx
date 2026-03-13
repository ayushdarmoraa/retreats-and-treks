import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import { retreatCostIndia } from '@/content/reports/retreat-cost-india';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/retreats/retreat-cost-india';

export function generateMetadata(): Metadata {
  return {
    title: 'Retreat Costs in India (2026 Report): Prices, Locations & Trends',
    description:
      'Explore the average cost of retreats in India including Himalayan retreats, yoga retreats, and wellness retreats. Data on prices, durations, and location trends.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Retreat Costs in India (2026 Report): Prices, Locations & Trends',
      description:
        'Explore the average cost of retreats in India including Himalayan retreats, yoga retreats, and wellness retreats. Data on prices, durations, and location trends.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Retreat Costs in India (2026 Report): Prices, Locations & Trends'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How much does a retreat cost in India?',
    answer:
      'Retreat prices in India typically range from ₹8,000 to ₹40,000 depending on the location, duration, and type. A 3-day mountain retreat in Uttarakhand may cost ₹10,000–₹22,000, while a 7-day yoga retreat in Rishikesh or a beach wellness retreat in Goa can cost ₹20,000–₹40,000.',
  },
  {
    question: 'What is the cheapest retreat destination in India?',
    answer:
      'Uttarakhand tends to be the most affordable region for retreats in India, with average prices between ₹10,000 and ₹22,000 for a 3–5 day retreat. Locations like Chakrata offer nature-based retreats at lower price points compared to more commercialized destinations.',
  },
  {
    question: 'Are Himalayan retreats more expensive than beach retreats?',
    answer:
      'Generally, mountain retreats in the Himalayas tend to be more affordable than beach retreats in Goa. Himalayan destinations like Uttarakhand and parts of Himachal Pradesh offer quieter, nature-focused retreats at lower operating costs, which translates to lower participant prices.',
  },
  {
    question: 'How long should a retreat be?',
    answer:
      'The most popular retreat duration in India is 3–5 days. Weekend retreats (2–3 days) work well for people with limited time, while 7-day or 10-day retreats offer deeper experiences. The right duration depends on your goals and availability.',
  },
  {
    question: 'What is included in the price of a retreat?',
    answer:
      'Most retreat prices include accommodation, meals, guided activities or sessions, and access to the retreat space. Some retreats also include transport from the nearest city, while others offer it as an add-on. Private or customized retreats may have additional costs.',
  },
  {
    question: 'Is a retreat worth the cost compared to a regular vacation?',
    answer:
      'A retreat is designed around rest, reflection, and intentional experiences — unlike a typical vacation which often involves packed itineraries and tourist activities. Many participants find that the structured quiet and guided experiences of a retreat provide benefits that last longer than a standard holiday.',
  },
];

export default function RetreatCostIndiaPage() {
  const data = retreatCostIndia;

  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Retreat Costs in India (2026)',
    description:
      'Analysis of retreat pricing trends across India including average costs, retreat duration, and location-based pricing.',
    creator: {
      '@type': 'Organization',
      name: 'Retreats & Treks',
    },
    url: canonicalUrl,
    keywords: [
      'retreat cost India',
      'retreat pricing India',
      'wellness retreat cost India',
    ],
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <AutoArticleSchema
        title="Retreat Costs in India (2026 Report)"
        description="Explore the average cost of retreats in India including Himalayan retreats, yoga retreats, and wellness retreats. Data on prices, durations, and location trends."
        path={PATH}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Retreat Costs in India (2026)' },
        ]}
      />

      <article>

        <style>{`
  .rci-section { width:100vw; margin-left:calc(-50vw + 50%); padding-top:4rem; padding-bottom:4rem; border-bottom:1px solid #e5e7eb; }
  .rci-inner { max-width:52rem; margin:0 auto; padding:0 2rem; }
  .rci-eyebrow { display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem; }
  .rci-eyebrow-line { width:24px; height:1px; background:var(--color-primary); opacity:0.5; display:inline-block; }
  .rci-eyebrow-text { font-family:var(--font-geist-sans),sans-serif; font-size:0.56rem; letter-spacing:0.28em; text-transform:uppercase; color:var(--color-primary); font-weight:500; opacity:0.7; }
  .rci-h1 { font-family:var(--font-geist-sans),sans-serif; font-size:clamp(1.75rem,3.5vw,2.4rem); font-weight:200; letter-spacing:-0.035em; color:#111; line-height:1.1; margin:0 0 1.5rem; }
  .rci-h2 { font-family:var(--font-geist-sans),sans-serif; font-size:clamp(1.4rem,2.5vw,1.85rem); font-weight:200; letter-spacing:-0.03em; color:#111; line-height:1.15; margin:0 0 1.5rem; }
  .rci-h2 span { color:var(--color-primary); }
  .rci-p { font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; line-height:1.85; color:#555; margin:0 0 1.25rem; }
  .rci-p:last-child { margin-bottom:0; }
  .rci-list { list-style:none; padding:0; margin:0 0 1.5rem; display:flex; flex-direction:column; gap:0.6rem; }
  .rci-list li { display:flex; align-items:flex-start; gap:0.75rem; font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; line-height:1.7; font-weight:300; color:#555; }
  .rci-check { width:18px; height:18px; border-radius:50%; background:var(--color-primary); display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:0.15rem; font-size:0.6rem; color:#fff; font-weight:700; }
  .rci-stat-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:1rem; margin-bottom:2rem; }
  .rci-stat-card { background:#fff; border:1px solid #eef0ee; border-radius:8px; padding:1.5rem; border-top:2px solid var(--color-primary); text-align:center; }
  .rci-stat-value { font-family:var(--font-geist-sans),sans-serif; font-size:1.15rem; font-weight:600; color:#111; margin:0 0 0.4rem; }
  .rci-stat-label { font-family:var(--font-geist-sans),sans-serif; font-size:0.78rem; font-weight:300; color:#777; margin:0; }
  .rci-loc-card { background:#fff; border:1px solid #eef0ee; border-radius:8px; padding:1.5rem; }
  .rci-loc-name { font-family:var(--font-geist-sans),sans-serif; font-size:0.95rem; font-weight:600; color:#111; margin:0 0 0.4rem; }
  .rci-loc-desc { font-family:var(--font-geist-sans),sans-serif; font-size:0.85rem; font-weight:300; color:#555; line-height:1.7; margin:0 0 0.6rem; }
  .rci-loc-price { font-family:var(--font-geist-sans),sans-serif; font-size:0.85rem; font-weight:500; color:var(--color-primary); margin:0; }
  .rci-nav-group { border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; }
  .rci-nav-link { display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1rem; border-bottom:1px solid #f0f0f0; font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; color:#333; text-decoration:none; }
  .rci-nav-link:last-child { border-bottom:none; }
  .rci-nav-link:hover { background:#f7f9f7; color:var(--color-primary); }
  .rci-nav-link::after { content:'→'; color:var(--color-primary); opacity:0.5; }
  .rci-table { width:100%; border-collapse:collapse; font-family:var(--font-geist-sans),sans-serif; font-size:0.85rem; }
  .rci-table th { text-align:left; padding:0.85rem 1rem; background:#f7f9f7; border-bottom:2px solid var(--color-primary); font-weight:500; color:#111; font-size:0.8rem; letter-spacing:0.02em; }
  .rci-table td { padding:0.85rem 1rem; border-bottom:1px solid #eef0ee; color:#555; font-weight:300; line-height:1.6; }
  .rci-table tr:last-child td { border-bottom:none; }
  .rci-table tr:hover td { background:#f7f9f7; }
  .rci-download-link { display:inline-flex; align-items:center; gap:0.5rem; font-family:var(--font-geist-sans),sans-serif; font-size:0.85rem; font-weight:400; color:var(--color-primary); text-decoration:none; padding:0.7rem 1.25rem; border:1px solid var(--color-primary); border-radius:6px; transition:background 0.2s, color 0.2s; }
  .rci-download-link:hover { background:var(--color-primary); color:#fff; }
  @media(max-width:640px){
    .rci-section { padding-top:3rem; padding-bottom:3rem; }
    .rci-inner { padding:0 1.25rem; }
    .rci-stat-grid { grid-template-columns:1fr; }
  }
`}</style>

        {/* ── HERO ── */}
        <section className="rci-section" style={{ background: '#f7f9f7' }}>
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">2026 Report · Retreat Costs</span>
            </div>
            <h1 className="rci-h1">
              {data.title}
            </h1>
            <p className="rci-p">{data.description}</p>
          </div>
        </section>

        {/* ── KEY STATISTICS ── */}
        <section className="rci-section" style={{ background: '#ffffff' }}>
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Key Numbers</span>
            </div>
            <h2 className="rci-h2">
              Key retreat <span>statistics</span>
            </h2>
            <div className="rci-stat-grid">
              {data.stats.map((stat) => (
                <div key={stat.label} className="rci-stat-card">
                  <p className="rci-stat-value">{stat.value}</p>
                  <p className="rci-stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COST BY LOCATION ── */}
        <section className="rci-section" style={{ background: '#f7f9f7' }}>
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">By Location</span>
            </div>
            <h2 className="rci-h2">
              Average retreat cost <span>by location</span>
            </h2>
            <p className="rci-p">
              Retreat prices vary significantly depending on the region. Here is an overview of average costs across popular retreat destinations in India.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {data.locations.map((loc) => (
                <div key={loc.name} className="rci-loc-card">
                  <p className="rci-loc-name">{loc.name}</p>
                  <p className="rci-loc-desc">{loc.description}</p>
                  <p className="rci-loc-price">Average price: {loc.avgPrice}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT AFFECTS COST ── */}
        <section className="rci-section" style={{ background: '#ffffff' }}>
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Price Comparison</span>
            </div>
            <h2 className="rci-h2">
              Retreat price <span>comparison</span> (India)
            </h2>
            <div style={{ border: '1px solid #eef0ee', borderRadius: '8px', overflow: 'hidden' }}>
              <table className="rci-table">
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Average 3-Day Retreat Cost</th>
                    <th>Typical Experience</th>
                  </tr>
                </thead>
                <tbody>
                  {data.locations.map((loc) => (
                    <tr key={loc.name}>
                      <td style={{ fontWeight: 400, color: '#111' }}>{loc.name}</td>
                      <td>{loc.avgPrice}</td>
                      <td>{loc.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── WHAT AFFECTS COST (FACTORS) ── */}
        <section className="rci-section" style={{ background: '#f7f9f7' }}>
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Price Factors</span>
            </div>
            <h2 className="rci-h2">
              What affects the <span>cost</span> of a retreat
            </h2>
            <p className="rci-p">Several factors influence retreat pricing across India:</p>
            <ul className="rci-list">
              <li><span className="rci-check">✓</span>Location — mountain retreats tend to be more affordable than beach destinations</li>
              <li><span className="rci-check">✓</span>Duration — longer retreats offer better per-day value</li>
              <li><span className="rci-check">✓</span>Group size — small-group retreats cost more than large-group programs</li>
              <li><span className="rci-check">✓</span>Accommodation type — shared rooms vs private rooms</li>
              <li><span className="rci-check">✓</span>Inclusions — meals, transport, guided sessions, and materials</li>
              <li><span className="rci-check">✓</span>Season — peak season (October–March) often commands higher prices</li>
            </ul>
            <p className="rci-p">Understanding these factors can help you find a retreat that matches both your goals and your budget.</p>
          </div>
        </section>

        {/* ── DURATION TRENDS ── */}
        <section className="rci-section" style={{ background: '#ffffff' }}>
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Duration Trends</span>
            </div>
            <h2 className="rci-h2">
              Retreat <span>duration</span> and pricing trends
            </h2>
            <p className="rci-p">The most popular retreat duration in India is 3–5 days, which balances depth of experience with time and budget constraints.</p>
            <p className="rci-p">Weekend retreats (2–3 days) are increasingly popular among working professionals, especially in destinations accessible from Delhi and Bangalore.</p>
            <p className="rci-p">Longer retreats of 7–10 days offer deeper immersion and are common for meditation, silence, and yoga-focused programs. Per-day costs tend to decrease with longer stays.</p>
          </div>
        </section>

        {/* ── MOUNTAIN VS BEACH ── */}
        <section className="rci-section" style={{ background: '#f7f9f7' }}>
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Comparison</span>
            </div>
            <h2 className="rci-h2">
              Mountain retreats vs <span>beach retreats</span>
            </h2>
            <p className="rci-p">Mountain retreats in the Himalayas (Uttarakhand, Himachal Pradesh) tend to be 30–50% more affordable than beach retreats in Goa or Kerala.</p>
            <p className="rci-p">This price difference is largely due to lower operating costs in mountain regions, simpler accommodation styles, and locally sourced food.</p>
            <p className="rci-p">However, the experience is also fundamentally different. Mountain retreats emphasize nature immersion, forest walks, and quiet — while beach retreats often focus on wellness spa treatments and open-air yoga.</p>
            <p className="rci-p">Neither is inherently better. The right choice depends on what kind of environment helps you rest and reset most effectively.</p>
          </div>
        </section>

        {/* ── DOWNLOAD DATASET ── */}
        <section className="rci-section" style={{ background: '#ffffff' }}>
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Open Data</span>
            </div>
            <h2 className="rci-h2">
              Download the <span>dataset</span>
            </h2>
            <p className="rci-p">This retreat pricing data is available as a downloadable JSON file. Researchers, bloggers, and travel writers are welcome to reference this data with attribution.</p>
            <a
              href="/data/retreat-cost-india.json"
              download
              className="rci-download-link"
            >
              ↓ Download Retreat Cost Dataset (JSON)
            </a>
          </div>
        </section>

        {/* ── OUR RETREATS ── */}
        <section className="rci-section" style={{ background: '#f7f9f7' }}>
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Our Retreats</span>
            </div>
            <h2 className="rci-h2">
              Retreats we <span>offer</span>
            </h2>
            <p className="rci-p">We run small-group and private retreats across quiet Himalayan locations in Uttarakhand. Our retreats are designed around rest, clarity, and nature immersion rather than packed schedules.</p>
            <p className="rci-p">Retreat prices include accommodation, locally prepared meals, guided nature experiences, and small group facilitation.</p>
            <div style={{ marginTop: '1.5rem' }}>
              <PrimaryCTA label="Explore Our Retreats" subtext="Talk to us about finding the right retreat for your budget and goals." vertical="retreat" category="report" sourcePath={PATH} />
            </div>
          </div>
        </section>

        {/* ── RETREAT EXPERIENCES ── */}
        <section className="rci-section" style={{ background: '#ffffff' }}>
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Our Programs</span>
            </div>
            <h2 className="rci-h2">
              Retreat experiences <span>referenced</span> in this data
            </h2>
            <p className="rci-p">These are retreat programs we offer across the price ranges discussed above. Each includes accommodation, meals, and guided experiences.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="rci-loc-card" style={{ borderLeft: '2px solid var(--color-primary)' }}>
                <p className="rci-loc-name"><Link href="/retreats/journeys/burnout-recovery" style={{ color: 'inherit', textDecoration: 'none' }}>Burnout Recovery Retreat</Link></p>
                <p className="rci-loc-desc">A 3-day weekend retreat designed for people feeling mentally exhausted from work or city life.</p>
                <Link href="/retreats/journeys/burnout-recovery" style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-primary)', textDecoration: 'none' }}>View retreat details →</Link>
              </div>
              <div className="rci-loc-card" style={{ borderLeft: '2px solid var(--color-primary)' }}>
                <p className="rci-loc-name"><Link href="/retreats/journeys/rest-and-reset" style={{ color: 'inherit', textDecoration: 'none' }}>Rest &amp; Reset Retreat</Link></p>
                <p className="rci-loc-desc">A nature-based retreat focused on quiet environments, forest immersion, and mental clarity.</p>
                <Link href="/retreats/journeys/rest-and-reset" style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-primary)', textDecoration: 'none' }}>View retreat details →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="rci-section" style={{ background: '#f7f9f7' }}>
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Common Questions</span>
            </div>
            <h2 className="rci-h2">
              Frequently asked <span>questions</span>
            </h2>
            <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
          </div>
        </section>

        {/* ── RELATED GUIDES ── */}
        <section className="rci-section" style={{ background: '#ffffff' }}>
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Related Guides</span>
            </div>
            <h2 className="rci-h2">
              Related retreat <span>guides</span>
            </h2>
            <div className="rci-nav-group">
              <Link href="/retreats/weekend-retreat-near-delhi" className="rci-nav-link">Weekend Retreat Near Delhi</Link>
              <Link href="/retreats/retreats-near-delhi" className="rci-nav-link">Retreats Near Delhi</Link>
              <Link href="/retreats/weekend-himalayan-retreats" className="rci-nav-link">Weekend Himalayan Retreats</Link>
              <Link href="/retreats/best-retreat-in-uttarakhand" className="rci-nav-link">Best Retreats in Uttarakhand</Link>
              <Link href="/retreats" className="rci-nav-link">All Retreats</Link>
            </div>
          </div>
        </section>

      </article>
    </TrackedPage>
  );
}
