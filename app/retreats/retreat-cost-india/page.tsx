import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';
import { generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import { retreatCostIndia } from '@/content/reports/retreat-cost-india';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/retreats/retreat-cost-india';

export function generateMetadata(): Metadata {
  return {
    title: 'Retreat Costs in India | Retreats And Treks',
    description:
      'Explore retreat costs in India, including Himalayan, yoga, and wellness retreats, with data on prices, durations, inclusions, and location trends.',
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
        'Explore retreat costs in India, including Himalayan, yoga, and wellness retreats, with data on prices, durations, inclusions, and location trends.',
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
    creator: { '@id': schemaIds.organization },
    url: canonicalUrl,
    keywords: [
      'retreat cost India',
      'retreat pricing India',
      'wellness retreat cost India',
    ],
  };

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Retreat Costs in India (2026 Report)"
        description="Explore the average cost of retreats in India including Himalayan retreats, yoga retreats, and wellness retreats. Data on prices, durations, and location trends."
        path={PATH}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Retreat Costs in India (2026)' },
        ]}
      />

      <style>{`
        .med-shell { width: 100vw; margin-left: calc(-50vw + 50%); }
        .med-outer { max-width: 76rem; margin: 0 auto; padding: 0 1.5rem; }
        .med-inner { max-width: 58rem; margin: 0 auto; padding: 0 1.5rem; }

        .med-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.1rem; }
        .med-eyebrow-line { width: 30px; height: 1px; background: rgba(15,118,110,0.35); flex-shrink: 0; }
        .med-eyebrow-text { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6b7280; font-weight: 600; }

        .med-h2 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.12; margin: 0 0 1.1rem; }
        .med-h2 span { color: #0f766e; }
        .med-h3 { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.15rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.7rem; letter-spacing: -0.01em; }
        .med-body { font-family: var(--font-inter), sans-serif; font-size: 0.98rem; line-height: 1.9; color: #4b5259; font-weight: 400; margin: 0 0 1rem; }
        .med-body:last-child { margin-bottom: 0; }
        .med-body strong { color: #2B2A26; font-weight: 600; }

        .med-card {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(15,31,28,0.05);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .med-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: #0f766e; transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index: 2;
        }
        .med-card:hover { transform: translateY(-6px); border-color: rgba(15,118,110,0.28); box-shadow: 0 22px 48px rgba(15,31,28,0.12); }
        .med-card:hover::before { transform: scaleX(1); }

        .med-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem 2.3rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; box-shadow: 0 10px 26px rgba(15,118,110,0.25); transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid #0f766e; }
        .med-cta-btn:hover { background: #0d6b64; transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,118,110,0.32); }
        .med-cta-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.85rem 1.8rem; border: 1px solid rgba(15,118,110,0.25); color: #0f766e; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .med-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: translateY(-2px); }

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 960px) { .med-grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } .med-grid-4 { grid-template-columns: 1fr; } }

        @keyframes med-hero-zoom { from { transform: scale(1.06); } to { transform: scale(1); } }
        .med-hero-bg { animation: med-hero-zoom 24s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .med-hero-bg { animation: none; } }

        .med-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .med-list-item { display: grid; grid-template-columns: 1.9rem 1fr; gap: 0.9rem; }
        .med-list-dot { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid rgba(15,118,110,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .med-list-dot-inner { width: 7px; height: 7px; border-radius: 50%; background: #0f766e; }
        .med-list-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.85; color: #4b5259; font-weight: 400; }
        .med-list-text strong { color: #2B2A26; font-weight: 600; }

        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }

        .med-stat { text-align: center; padding: 1.5rem; }
        .med-stat-value { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 600; color: #0f766e; margin: 0 0 0.3rem; }
        .med-stat-label { font-family: var(--font-inter), sans-serif; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; font-weight: 600; margin: 0; }

        .med-location-card { padding: 1.5rem; }
        .med-location-card h3 { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.2rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.5rem; }
        .med-location-card .med-price { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; font-weight: 600; color: #0f766e; margin: 0.5rem 0 0; }

        .med-table-wrap { overflow-x: auto; border-radius: 18px; border: 1px solid rgba(15,118,110,0.12); }
        .med-table { width: 100%; border-collapse: collapse; font-family: var(--font-inter), sans-serif; font-size: 0.88rem; }
        .med-table th { text-align: left; padding: 0.85rem 1rem; background: #f7f9f7; border-bottom: 2px solid #0f766e; font-weight: 600; color: #2B2A26; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; }
        .med-table td { padding: 0.85rem 1rem; border-bottom: 1px solid rgba(15,118,110,0.08); color: #4b5259; }
        .med-table tr:last-child td { border-bottom: none; }
        .med-table tr:hover td { background: #f7f9f7; }
        .med-table .med-highlight { color: #0f766e; font-weight: 600; }
        .med-table .med-badge { display: inline-block; padding: 0.25rem 0.6rem; border-radius: 999px; background: rgba(15,118,110,0.1); color: #0f766e; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }

        .med-download-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 2rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; border: 1px solid #0f766e; transition: all 0.3s ease; }
        .med-download-btn:hover { background: #0d6b64; transform: translateY(-2px); }
        .med-cta-small { padding: 0.7rem 1.2rem; font-size: 0.68rem; }

        .med-location-image-wrap { position: relative; width: 100%; height: 180px; overflow: hidden; border-radius: 18px 18px 0 0; }
        .med-location-image-wrap img { width: 100%; height: 100%; object-fit: cover; }
        @media (max-width: 640px) { .med-location-image-wrap { height: 140px; } }
      `}</style>

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '78vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/hero/himalayan-sunrise.webp" alt="Himalayan retreat cost guide" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>2026 Report &middot; Retreat Costs</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            {data.title}
          </h1>
          <p style={{ maxWidth: '40rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            {data.description}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {data.stats.map((stat) => (
              <span key={stat.label} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '999px', padding: '0.45rem 0.9rem', background: 'rgba(15,118,110,0.35)' }}>
                {stat.value} {stat.label}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/retreats" className="med-cta-btn">Explore retreats within your budget</Link>
            <a href="#retreat-cost-statistics" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Compare retreat costs</a>
          </div>
        </div>
      </section>

      {/* ── KEY STATISTICS ── */}
      <section id="retreat-cost-statistics" className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Key Numbers</span>
          </div>
          <h2 className="med-h2">Quick retreat cost <span>benchmarks</span></h2>
          <p className="med-body">
            Use these numbers as a starting point before comparing destination, duration, accommodation style, meals, facilitation, and transport inclusions.
          </p>

          <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
            {data.stats.map((stat, index) => {
              const notes = [
                'A practical range for short retreats before private room upgrades, premium locations, or add-on therapies.',
                'The sweet spot for people who want a meaningful reset without committing to a long wellness program.',
                'Mountain destinations remain popular because they combine quiet settings, nature access, and better value.',
              ];
              return (
                <div key={stat.label} className="med-card med-stat">
                  <p className="med-stat-value">{stat.value}</p>
                  <p className="med-stat-label">{stat.label}</p>
                  <p className="med-body" style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: '0.5rem', marginBottom: 0 }}>{notes[index]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COST BY LOCATION ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">By Location</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ textAlign: 'center' }}>Average retreat cost <span>by location</span></h2>
          <p className="med-body" style={{ textAlign: 'center', maxWidth: '46rem', margin: '0 auto 2.2rem' }}>
            Retreat prices vary significantly depending on the region, access, accommodation style, season, and how commercial the destination has become.
          </p>

          <div className="med-grid-3">
            {data.locations.map((loc) => {
              const badges: Record<string, string> = {
                Uttarakhand: 'Best value',
                Rishikesh: 'Yoga capital',
                Goa: 'Beach wellness',
              };
              const images: Record<string, string> = {
                Uttarakhand: '/Images/hero/valley-forest.webp',
                Rishikesh: '/Images/location/rishikesh.webp',
                // Goa ke liye Unsplash image
                Goa: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop&auto=format',
              };
              return (
                <div key={loc.name} className="med-card" style={{ overflow: 'hidden' }}>
                  <div className="med-location-image-wrap">
                    <img src={images[loc.name] || '/Images/hero/valley-forest.webp'} alt={`${loc.name} retreat`} />
                  </div>
                  <div className="med-location-card">
                    <span className="med-season-tag">{badges[loc.name] || 'Retreat destination'}</span>
                    <h3>{loc.name}</h3>
                    <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: '0.5rem' }}>{loc.description}</p>
                    <p className="med-price">{loc.avgPrice}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRICE COMPARISON ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Price Comparison</span>
          </div>
          <h2 className="med-h2">Retreat price <span>comparison</span> (India)</h2>
          <p className="med-body">
            Use this comparison to understand how the same retreat duration can feel very different depending on destination, setting, and inclusions.
          </p>

          <div className="med-table-wrap" style={{ marginTop: '1.8rem' }}>
            <table className="med-table">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Average 3-day cost</th>
                  <th>Best for</th>
                  <th>Budget signal</th>
                </tr>
              </thead>
              <tbody>
                {data.locations.map((loc) => {
                  const metas: Record<string, { bestFor: string; budget: string }> = {
                    Uttarakhand: { bestFor: 'Value-focused mountain retreats, quiet nature, forest stays', budget: 'Best value' },
                    Rishikesh: { bestFor: 'Yoga, meditation, spiritual practice, riverside retreat culture', budget: 'Mid range' },
                    Goa: { bestFor: 'Beach wellness, spa-style relaxation, warm-weather escapes', budget: 'Premium leaning' },
                  };
                  const meta = metas[loc.name] || { bestFor: 'General retreat planning', budget: 'Varies' };
                  return (
                    <tr key={loc.name}>
                      <td><strong>{loc.name}</strong></td>
                      <td className="med-highlight">{loc.avgPrice}</td>
                      <td>{meta.bestFor}</td>
                      <td><span className="med-badge">{meta.budget}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="med-card" style={{ padding: '1.2rem 1.5rem', marginTop: '1.2rem' }}>
            <p className="med-body" style={{ marginBottom: 0, fontSize: '0.9rem' }}>
              <strong>Planning tip:</strong> compare what is included before comparing price alone. A cheaper retreat can become expensive if meals, transport, private rooms, or guided sessions are charged separately.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT AFFECTS COST ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Price Factors</span>
          </div>
          <h2 className="med-h2">What affects the <span>cost</span> of a retreat</h2>
          <p className="med-body">
            Retreat pricing is not decided by destination alone. The real cost depends on how the stay is structured, how personal the facilitation is, and what is included before you arrive.
          </p>

          <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
            {[
              { icon: '⌖', title: 'Location', copy: 'Mountain retreats often cost less than beach destinations because operating costs, land pressure, and commercial demand are usually lower.' },
              { icon: '◷', title: 'Duration', copy: 'Longer retreats usually improve per-day value because accommodation, meals, and facilitation are spread across more days.' },
              { icon: '●', title: 'Group size', copy: 'Small-group and private retreats cost more because participants receive more attention, flexibility, and facilitation time.' },
              { icon: '⌂', title: 'Accommodation', copy: 'Shared rooms keep pricing lower. Private rooms, premium views, attached bathrooms, and boutique stays increase the retreat cost.' },
              { icon: '+', title: 'Inclusions', copy: 'Meals, transport, guided sessions, materials, local experiences, and therapies can change the real value of a retreat package.' },
              { icon: '☼', title: 'Season', copy: 'Peak months from October to March can command higher prices, especially in popular yoga, beach, and winter-sun destinations.' },
            ].map((factor) => (
              <div key={factor.title} className="med-card" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{factor.icon}</div>
                <h3 className="med-h3">{factor.title}</h3>
                <p className="med-body" style={{ marginBottom: 0, fontSize: '0.88rem' }}>{factor.copy}</p>
              </div>
            ))}
          </div>

          <div className="med-card" style={{ padding: '1.5rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <strong>Best way to compare:</strong> check the total package value, not only the headline price. A retreat that includes meals, guided practice, local transport, and small-group facilitation may be better value than a cheaper stay with many add-ons.
            </p>
          </div>
        </div>
      </section>

      {/* ── DURATION TRENDS ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Duration Trends</span>
          </div>
          <h2 className="med-h2">Retreat <span>duration</span> and pricing trends</h2>
          <p className="med-body">
            Duration changes the retreat experience as much as price. A weekend reset works for quick recovery, while longer programs create more space for practice, silence, and deeper nervous-system rest.
          </p>

          <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
            {[
              { days: '2–3', title: 'Weekend retreat', copy: 'A short reset for people who want to step away from city life without taking a full week off. Best for first-timers, busy professionals, and nearby travelers.', best: 'Quick rest, burnout prevention, first retreat experience' },
              { days: '3–5', title: 'Most balanced format', copy: 'The most popular retreat duration because it gives enough time for arrival, settling, guided practice, nature immersion, and meaningful rest without a large time commitment.', best: 'Reset, clarity, yoga, meditation, nature-based retreats' },
              { days: '7–10', title: 'Deeper immersion', copy: 'Longer retreats usually offer better per-day value and are better suited for silence, meditation, yoga-focused programs, and people who need a real break from routine.', best: 'Silence, deep rest, practice, personal transformation' },
            ].map((item) => (
              <div key={item.days} className="med-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '60px', height: '36px', padding: '0 0.8rem', borderRadius: '10px', background: '#0f766e', color: '#fff', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>{item.days}</div>
                <h3 className="med-h3">{item.title}</h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: '0.5rem' }}>{item.copy}</p>
                <p className="med-body" style={{ fontSize: '0.78rem', color: '#0f766e', fontWeight: 600, marginBottom: 0 }}>Best for: {item.best}</p>
              </div>
            ))}
          </div>

          <div className="med-card" style={{ padding: '1.5rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <strong>Pricing insight:</strong> longer retreats can look more expensive upfront, but the per-day cost often becomes better because accommodation, meals, and facilitation are spread across more nights.
            </p>
          </div>
        </div>
      </section>

      {/* ── MOUNTAIN VS BEACH ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Comparison</span>
          </div>
          <h2 className="med-h2">Mountain retreats vs <span>beach retreats</span></h2>
          <p className="med-body">
            Mountain and beach retreats are not just priced differently — they create different kinds of rest. The better choice depends on whether you want quiet nature, spiritual practice, spa-style relaxation, or warm-weather escape.
          </p>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card" style={{ padding: '1.5rem' }}>
              <span className="med-season-tag">Often better value</span>
              <h3 className="med-h3">Mountain retreats</h3>
              <p className="med-body">Himalayan retreats in Uttarakhand and Himachal Pradesh often cost less because they rely on simpler stays, local food, quieter settings, and lower commercial pressure.</p>
              <ul className="med-list" style={{ marginTop: '0.5rem' }}>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text">Best for silence, forest walks, meditation, and deeper rest</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text">Often more affordable for 3–5 day retreats</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text">Stronger fit for burnout recovery and nature immersion</span>
                </li>
              </ul>
            </div>

            <div className="med-card" style={{ padding: '1.5rem' }}>
              <span className="med-season-tag">Premium leaning</span>
              <h3 className="med-h3">Beach retreats</h3>
              <p className="med-body">Beach retreats in places like Goa or Kerala often cost more because they are closer to commercial tourism circuits, spa services, premium stays, and high-demand leisure seasons.</p>
              <ul className="med-list" style={{ marginTop: '0.5rem' }}>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text">Best for warm weather, spa treatments, and relaxed beach schedules</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text">Usually higher priced in peak tourist months</span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text">Better fit for leisure-style wellness than deep disconnection</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="med-card" style={{ padding: '1.5rem', marginTop: '1.4rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>
              <strong>Decision guide:</strong> choose mountains if your priority is quiet, budget value, nature, and reset. Choose beaches if your priority is warm weather, leisure comfort, spa-style wellness, and a holiday-like retreat.
            </p>
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD DATASET ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Open Data</span>
          </div>
          <h2 className="med-h2">Download the <span>dataset</span></h2>
          <p className="med-body">
            This retreat pricing data is available as a downloadable JSON file. Researchers, bloggers, and travel writers are welcome to reference this data with attribution.
          </p>

          <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
            <div className="med-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gap: '0.7rem' }}>
                {[
                  { label: 'Coverage', value: 'India' },
                  { label: 'Includes', value: 'Costs & trends' },
                  { label: 'Use case', value: 'Research / planning' },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
                    <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', fontWeight: 600 }}>{item.label}</span>
                    <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.88rem', color: '#2B2A26', fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1rem' }}>
                <a href="/data/retreat-cost-india.json" download className="med-download-btn med-cta-small">↓ Download JSON dataset</a>
              </div>
            </div>

            <div className="med-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                <span className="med-season-tag">JSON format</span>
                <span className="med-season-tag">Pricing guide</span>
                <span className="med-season-tag">2026 report</span>
              </div>
              <h3 className="med-h3">Use this data freely</h3>
              <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>
                This dataset is shared under open terms. Please attribute to Retreats And Treks when using in reports, articles, or presentations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR RETREATS ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-card" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }}>
              <div>
                <span className="med-season-tag">Our Retreats</span>
                <h2 className="med-h2" style={{ margin: '0.5rem 0 1rem' }}>
                  Retreats we <span>offer</span>
                </h2>
                <p className="med-body" style={{ maxWidth: '48rem', margin: 0 }}>
                  We run small-group and private retreats across quiet Himalayan locations in Uttarakhand. Our retreats are designed around rest, clarity, and nature immersion rather than packed schedules.
                </p>
              </div>
              <Link href="/retreats" className="med-cta-btn" style={{ whiteSpace: 'nowrap' }}>Explore retreats</Link>
            </div>

            <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
              {[
                { title: 'Burnout Recovery Retreat', href: '/retreats/journeys/burnout-recovery', copy: 'A 3-day weekend retreat designed for people feeling mentally exhausted from work or city life.' },
                { title: 'Rest & Reset Retreat', href: '/retreats/journeys/rest-and-reset', copy: 'A nature-based retreat focused on quiet environments, forest immersion, and mental clarity.' },
              ].map((program) => (
                <Link key={program.title} href={program.href} style={{ textDecoration: 'none' }}>
                  <div className="med-card" style={{ padding: '1.5rem' }}>
                    <span className="med-season-tag">Featured</span>
                    <h3 className="med-h3">{program.title}</h3>
                    <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: '0.5rem' }}>{program.copy}</p>
                    <span style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 600 }}>View retreat details →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Common Questions</span>
          </div>
          <h2 className="med-h2">Frequently asked <span>questions</span></h2>
          <p className="med-body">
            Clear answers to the questions people usually ask before comparing retreat prices, choosing a destination, or deciding whether a retreat is worth the cost.
          </p>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '48vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/hero/himalayan-sunrise.webp" alt="Himalayan retreat cost guide" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.86)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '42rem', padding: '4rem 1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.5rem, 2.9vw, 2.1rem)', fontWeight: 500, color: '#F6F2E7' }}>Ready to find the right retreat?</h2>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: 'rgba(246,242,231,0.78)' }}>Talk with us about your budget, preferred location, and retreat goals.</p>
          <a href={`https://wa.me/919760446101?text=${encodeURIComponent("Hi, I'm interested in finding the right retreat for my budget. Can you help?")}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Get a budget recommendation</a>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <nav className="med-shell" style={{ background: '#ffffff' }}>
        <div className="med-inner" style={{ borderTop: '1px solid rgba(15,118,110,0.1)', padding: '2rem 1.5rem 3.5rem' }}>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <Link href="/retreats" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>← All Retreats</Link>
            <Link href="/retreats/himalayan-retreats" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Himalayan Retreats</Link>
            <Link href="/retreats/weekend-himalayan-retreats" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Weekend Retreats</Link>
            <Link href="/retreats/retreats-near-delhi" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Retreats Near Delhi</Link>
          </div>
        </div>
      </nav>
    </TrackedPage>
  );
}