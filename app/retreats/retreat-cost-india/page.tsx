import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
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
    <TrackedPage page={PATH} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md) 0' }}>
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
  .rci-eyebrow-line { width:24px; height:1px; background:var(--color-primary);  display:inline-block; }
  .rci-eyebrow-text { font-family:var(--font-geist-sans),sans-serif; font-size: 0.75rem; letter-spacing:0.28em; text-transform:uppercase; color: #374151; font-weight:500; }
  .rci-h1 { font-family:var(--font-geist-sans),sans-serif; font-size:clamp(1.75rem,3.5vw,2.4rem); font-weight:200; letter-spacing:-0.035em; color:#111; line-height:1.1; margin:0 0 1.5rem; }
  .rci-h2 { font-family:var(--font-geist-sans),sans-serif; font-size:clamp(1.4rem,2.5vw,1.85rem); font-weight:200; letter-spacing:-0.03em; color:#111; line-height:1.15; margin:0 0 1.5rem; }
  .rci-h2 span { color: #374151; }
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
  .rci-loc-price { font-family:var(--font-geist-sans),sans-serif; font-size:0.85rem; font-weight:500; color: #374151; margin:0; }
  .rci-nav-group { border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; }
  .rci-nav-link { display:flex; align-items:center; justify-content:space-between; padding:0.85rem 1rem; border-bottom:1px solid #f0f0f0; font-family:var(--font-geist-sans),sans-serif; font-size:0.88rem; font-weight:300; color:#333; text-decoration:none; }
  .rci-nav-link:last-child { border-bottom:none; }
  .rci-nav-link:hover { background:#f7f9f7; color: #374151; }
  .rci-nav-link::after { content:'→'; color: #374151;  }
  .rci-table { width:100%; border-collapse:collapse; font-family:var(--font-geist-sans),sans-serif; font-size:0.85rem; }
  .rci-table th { text-align:left; padding:0.85rem 1rem; background:#f7f9f7; border-bottom:2px solid var(--color-primary); font-weight:500; color:#111; font-size:0.8rem; letter-spacing:0.02em; }
  .rci-table td { padding:0.85rem 1rem; border-bottom:1px solid #eef0ee; color:#555; font-weight:300; line-height:1.6; }
  .rci-table tr:last-child td { border-bottom:none; }
  .rci-table tr:hover td { background:#f7f9f7; }
  .rci-download-link { display:inline-flex; align-items:center; gap:0.5rem; font-family:var(--font-geist-sans),sans-serif; font-size:0.85rem; font-weight:400; color: #374151; text-decoration:none; padding:0.7rem 1.25rem; border:1px solid var(--color-primary); border-radius:6px; transition:background 0.2s, color 0.2s; }
  .rci-download-link:hover { background:var(--color-primary); color:#fff; }

  .rci-hero {
    position:relative;
    min-height:72vh;
    display:flex;
    align-items:center;
    overflow:hidden;
    background-image:
      linear-gradient(90deg, rgba(5,18,14,0.88) 0%, rgba(5,18,14,0.72) 42%, rgba(5,18,14,0.18) 100%),
      url('/Images/hero/himalayan-sunrise.webp');
    background-size:cover;
    background-position:center;
    color:#fff;
    border-bottom:none;
  }
  .rci-hero::after {
    content:'';
    position:absolute;
    inset:auto 0 0;
    height:38%;
    background:linear-gradient(0deg, rgba(247,249,247,1) 0%, rgba(247,249,247,0) 100%);
    pointer-events:none;
  }
  .rci-hero-inner {
    position:relative;
    z-index:1;
    max-width:72rem;
    width:100%;
    margin:0 auto;
    padding:7rem 2rem 8rem;
  }
  .rci-hero-content {
    max-width:46rem;
  }
  .rci-hero .rci-eyebrow-text {
    color:rgba(255,255,255,0.82);
  }
  .rci-hero .rci-eyebrow-line {
    background:#d9b46f;
  }
  .rci-hero-title {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:clamp(2.6rem,6vw,5.7rem);
    font-weight:250;
    letter-spacing:-0.065em;
    line-height:0.96;
    margin:0 0 1.4rem;
    color:#fff;
    text-wrap:balance;
  }
  .rci-hero-copy {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:clamp(1rem,1.4vw,1.18rem);
    line-height:1.85;
    font-weight:300;
    color:rgba(255,255,255,0.86);
    max-width:40rem;
    margin:0 0 2rem;
  }
  .rci-hero-actions {
    display:flex;
    flex-wrap:wrap;
    gap:0.8rem;
    margin-bottom:2rem;
  }
  .rci-hero-btn {
    display:inline-flex;
    align-items:center;
    justify-content:center;
    min-height:46px;
    padding:0.85rem 1.25rem;
    border-radius:999px;
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.86rem;
    font-weight:550;
    text-decoration:none;
    transition:transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  }
  .rci-hero-btn:hover {
    transform:translateY(-2px);
  }
  .rci-hero-btn-primary {
    background:#d9b46f;
    color:#111;
    border:1px solid rgba(217,180,111,0.9);
  }
  .rci-hero-btn-secondary {
    background:rgba(255,255,255,0.08);
    color:#fff;
    border:1px solid rgba(255,255,255,0.28);
    backdrop-filter:blur(14px);
  }
  .rci-hero-stats {
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:0.9rem;
    max-width:48rem;
  }
  .rci-hero-stat {
    border:1px solid rgba(255,255,255,0.18);
    background:rgba(255,255,255,0.1);
    backdrop-filter:blur(16px);
    border-radius:18px;
    padding:1.05rem;
    box-shadow:0 24px 70px rgba(0,0,0,0.22);
  }
  .rci-hero-stat-value {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:1rem;
    font-weight:650;
    color:#fff;
    margin:0 0 0.35rem;
  }
  .rci-hero-stat-label {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.72rem;
    line-height:1.5;
    color:rgba(255,255,255,0.72);
    margin:0;
  }

  .rci-kpi-section {
    background:
      radial-gradient(circle at top left, rgba(217,180,111,0.16), transparent 32%),
      linear-gradient(180deg, #fff 0%, #f7f9f7 100%);
  }
  .rci-kpi-intro {
    max-width:42rem;
    margin-bottom:2rem;
  }
  .rci-kpi-grid {
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:1.1rem;
  }
  .rci-kpi-card {
    position:relative;
    overflow:hidden;
    min-height:220px;
    background:#fff;
    border:1px solid rgba(17,24,39,0.08);
    border-radius:24px;
    padding:1.35rem;
    box-shadow:0 24px 70px rgba(17,24,39,0.08);
  }
  .rci-kpi-card::before {
    content:'';
    position:absolute;
    inset:0;
    background:
      linear-gradient(135deg, rgba(217,180,111,0.2), transparent 38%),
      radial-gradient(circle at bottom right, rgba(20,83,45,0.12), transparent 34%);
    opacity:0.9;
    pointer-events:none;
  }
  .rci-kpi-card > * {
    position:relative;
    z-index:1;
  }
  .rci-kpi-icon {
    width:48px;
    height:48px;
    border-radius:18px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:#102019;
    color:#d9b46f;
    font-family:var(--font-geist-sans),sans-serif;
    font-size:1rem;
    font-weight:700;
    margin-bottom:1.5rem;
    box-shadow:0 14px 34px rgba(16,32,25,0.2);
  }
  .rci-kpi-value {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:clamp(1.35rem,2.2vw,1.9rem);
    line-height:1.05;
    letter-spacing:-0.04em;
    font-weight:650;
    color:#111;
    margin:0 0 0.65rem;
  }
  .rci-kpi-label {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.78rem;
    text-transform:uppercase;
    letter-spacing:0.14em;
    line-height:1.5;
    font-weight:650;
    color:#374151;
    margin:0 0 0.85rem;
  }
  .rci-kpi-note {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.86rem;
    line-height:1.75;
    font-weight:300;
    color:#555;
    margin:0;
  }

  .rci-location-section {
    background:#102019;
    color:#fff;
    border-bottom:none;
  }
  .rci-location-section .rci-eyebrow-text {
    color:rgba(255,255,255,0.72);
  }
  .rci-location-section .rci-eyebrow-line {
    background:#d9b46f;
  }
  .rci-location-section .rci-h2 {
    color:#fff;
  }
  .rci-location-section .rci-h2 span {
    color:#d9b46f;
  }
  .rci-location-section .rci-p {
    color:rgba(255,255,255,0.72);
  }
  .rci-location-grid {
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:1rem;
    margin-top:2rem;
  }
  .rci-location-card {
    position:relative;
    min-height:380px;
    overflow:hidden;
    border-radius:26px;
    border:1px solid rgba(255,255,255,0.14);
    background:
      radial-gradient(circle at top right, rgba(217,180,111,0.22), transparent 36%),
      linear-gradient(145deg, #132820 0%, #07110d 100%);
    box-shadow:0 30px 90px rgba(0,0,0,0.28);
  }
  .rci-location-image {
    position:absolute;
    inset:0;
    width:100%;
    height:100%;
    object-fit:cover;
    opacity:0.96;
    transform:scale(1.03);
  }
  .rci-location-card::after {
    content:'';
    position:absolute;
    inset:0;
    background:
      linear-gradient(180deg, rgba(5,18,14,0.02) 0%, rgba(5,18,14,0.24) 38%, rgba(5,18,14,0.82) 100%),
      linear-gradient(90deg, rgba(5,18,14,0.34), rgba(5,18,14,0.02));
    pointer-events:none;
  }
  .rci-location-content {
    position:absolute;
    inset:auto 0 0;
    z-index:1;
    padding:1.35rem;
  }
  .rci-location-badge {
    display:inline-flex;
    align-items:center;
    gap:0.35rem;
    padding:0.42rem 0.68rem;
    border-radius:999px;
    background:rgba(255,255,255,0.12);
    border:1px solid rgba(255,255,255,0.16);
    color:rgba(255,255,255,0.84);
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.68rem;
    line-height:1;
    letter-spacing:0.12em;
    text-transform:uppercase;
    font-weight:650;
    margin-bottom:0.8rem;
    backdrop-filter:blur(14px);
  }
  .rci-location-name {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:clamp(1.3rem,2.2vw,1.8rem);
    line-height:1.04;
    letter-spacing:-0.045em;
    font-weight:650;
    color:#fff;
    margin:0 0 0.65rem;
  }
  .rci-location-desc {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.86rem;
    line-height:1.7;
    font-weight:300;
    color:rgba(255,255,255,0.75);
    margin:0 0 1rem;
  }
  .rci-location-price {
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:0.8rem;
    padding-top:1rem;
    border-top:1px solid rgba(255,255,255,0.16);
    font-family:var(--font-geist-sans),sans-serif;
  }
  .rci-location-price-label {
    font-size:0.68rem;
    text-transform:uppercase;
    letter-spacing:0.14em;
    color:rgba(255,255,255,0.58);
    font-weight:650;
  }
  .rci-location-price-value {
    font-size:0.98rem;
    color:#d9b46f;
    font-weight:700;
    text-align:right;
  }
  .rci-location-link {
    display:block;
    color:inherit;
    text-decoration:none;
  }
  .rci-location-link .rci-location-card {
    transition:transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
  }
  .rci-location-link:hover .rci-location-card {
    transform:translateY(-6px);
    border-color:rgba(217,180,111,0.48);
    box-shadow:0 34px 100px rgba(0,0,0,0.38);
  }
  .rci-location-cta {
    display:inline-flex;
    margin-top:0.9rem;
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.78rem;
    font-weight:700;
    color:#d9b46f;
  }

  .rci-compare-section {
    background:
      radial-gradient(circle at top right, rgba(20,83,45,0.08), transparent 34%),
      linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
  }
  .rci-compare-intro {
    max-width:44rem;
    margin-bottom:2rem;
  }
  .rci-compare-shell {
    border:1px solid rgba(17,24,39,0.08);
    border-radius:28px;
    overflow:hidden;
    background:#fff;
    box-shadow:0 28px 80px rgba(17,24,39,0.08);
  }
  .rci-compare-table {
    width:100%;
    border-collapse:separate;
    border-spacing:0;
    font-family:var(--font-geist-sans),sans-serif;
  }
  .rci-compare-table th {
    padding:1rem 1.1rem;
    background:#102019;
    color:rgba(255,255,255,0.82);
    text-align:left;
    font-size:0.68rem;
    line-height:1.35;
    letter-spacing:0.14em;
    text-transform:uppercase;
    font-weight:700;
    border-bottom:1px solid rgba(255,255,255,0.12);
  }
  .rci-compare-table td {
    padding:1.15rem 1.1rem;
    border-bottom:1px solid rgba(17,24,39,0.08);
    color:#475569;
    font-size:0.9rem;
    line-height:1.65;
    font-weight:300;
    vertical-align:top;
  }
  .rci-compare-table tr:last-child td {
    border-bottom:none;
  }
  .rci-compare-table tbody tr {
    transition:background 0.2s ease;
  }
  .rci-compare-table tbody tr:hover {
    background:#fbfaf6;
  }
  .rci-compare-location {
    color:#111;
    font-weight:750;
    font-size:1rem;
    letter-spacing:-0.02em;
  }
  .rci-compare-price {
    color:#102019;
    font-weight:750;
    white-space:nowrap;
  }
  .rci-compare-badge {
    display:inline-flex;
    align-items:center;
    padding:0.36rem 0.58rem;
    border-radius:999px;
    background:#f1eadb;
    color:#102019;
    font-size:0.68rem;
    line-height:1;
    letter-spacing:0.1em;
    text-transform:uppercase;
    font-weight:750;
    white-space:nowrap;
  }
  .rci-compare-note {
    display:flex;
    align-items:flex-start;
    gap:0.65rem;
    margin-top:1.25rem;
    padding:1rem 1.1rem;
    border-radius:18px;
    background:#102019;
    color:rgba(255,255,255,0.78);
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.86rem;
    line-height:1.7;
    font-weight:300;
  }
  .rci-compare-note strong {
    color:#d9b46f;
    font-weight:700;
  }

  .rci-factor-section {
    background:
      radial-gradient(circle at top left, rgba(217,180,111,0.12), transparent 32%),
      linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
  }
  .rci-factor-intro {
    max-width:42rem;
    margin-bottom:2rem;
  }
  .rci-factor-grid {
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:1rem;
  }
  .rci-factor-card {
    position:relative;
    overflow:hidden;
    min-height:230px;
    padding:1.25rem;
    border-radius:24px;
    background:#fff;
    border:1px solid rgba(17,24,39,0.08);
    box-shadow:0 22px 70px rgba(17,24,39,0.07);
  }
  .rci-factor-card::before {
    content:'';
    position:absolute;
    inset:0;
    background:
      radial-gradient(circle at top right, rgba(217,180,111,0.16), transparent 34%),
      linear-gradient(145deg, rgba(16,32,25,0.04), transparent 46%);
    pointer-events:none;
  }
  .rci-factor-card > * {
    position:relative;
    z-index:1;
  }
  .rci-factor-icon {
    width:44px;
    height:44px;
    border-radius:16px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:#102019;
    color:#d9b46f;
    font-family:var(--font-geist-sans),sans-serif;
    font-size:1rem;
    font-weight:800;
    margin-bottom:1.1rem;
  }
  .rci-factor-title {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:1.02rem;
    line-height:1.2;
    letter-spacing:-0.025em;
    font-weight:750;
    color:#111;
    margin:0 0 0.65rem;
  }
  .rci-factor-copy {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.86rem;
    line-height:1.72;
    font-weight:300;
    color:#555;
    margin:0;
  }
  .rci-factor-footer {
    margin-top:1.4rem;
    padding:1.15rem 1.25rem;
    border-radius:22px;
    background:#102019;
    color:rgba(255,255,255,0.78);
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.9rem;
    line-height:1.75;
    font-weight:300;
  }
  .rci-factor-footer strong {
    color:#d9b46f;
    font-weight:750;
  }

  .rci-duration-section {
    background:
      radial-gradient(circle at top right, rgba(217,180,111,0.12), transparent 34%),
      linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
  }
  .rci-duration-intro {
    max-width:44rem;
    margin-bottom:2rem;
  }
  .rci-duration-grid {
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:1rem;
  }
  .rci-duration-card {
    position:relative;
    overflow:hidden;
    padding:1.35rem;
    min-height:270px;
    border-radius:26px;
    border:1px solid rgba(17,24,39,0.08);
    background:#fff;
    box-shadow:0 22px 70px rgba(17,24,39,0.07);
  }
  .rci-duration-card::before {
    content:'';
    position:absolute;
    inset:0;
    background:
      linear-gradient(135deg, rgba(217,180,111,0.18), transparent 38%),
      radial-gradient(circle at bottom right, rgba(16,32,25,0.08), transparent 34%);
    pointer-events:none;
  }
  .rci-duration-card > * {
    position:relative;
    z-index:1;
  }
  .rci-duration-days {
    display:inline-flex;
    align-items:center;
    justify-content:center;
    min-width:68px;
    height:48px;
    padding:0 0.85rem;
    border-radius:18px;
    background:#102019;
    color:#d9b46f;
    font-family:var(--font-geist-sans),sans-serif;
    font-size:1rem;
    font-weight:800;
    margin-bottom:1.35rem;
  }
  .rci-duration-title {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:1.15rem;
    line-height:1.2;
    letter-spacing:-0.035em;
    font-weight:750;
    color:#111;
    margin:0 0 0.7rem;
  }
  .rci-duration-copy {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.86rem;
    line-height:1.75;
    font-weight:300;
    color:#555;
    margin:0 0 1rem;
  }
  .rci-duration-best {
    margin-top:auto;
    padding-top:1rem;
    border-top:1px solid rgba(17,24,39,0.08);
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.76rem;
    line-height:1.55;
    letter-spacing:0.1em;
    text-transform:uppercase;
    color:#374151;
    font-weight:750;
  }
  .rci-duration-best span {
    color:#102019;
  }
  .rci-duration-note {
    margin-top:1.4rem;
    padding:1.15rem 1.25rem;
    border-radius:22px;
    background:#102019;
    color:rgba(255,255,255,0.78);
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.9rem;
    line-height:1.75;
    font-weight:300;
  }
  .rci-duration-note strong {
    color:#d9b46f;
    font-weight:750;
  }

  .rci-mvb-section {
    background:#102019;
    color:#fff;
    border-bottom:none;
  }
  .rci-mvb-section .rci-eyebrow-text {
    color:rgba(255,255,255,0.72);
  }
  .rci-mvb-section .rci-eyebrow-line {
    background:#d9b46f;
  }
  .rci-mvb-section .rci-h2 {
    color:#fff;
  }
  .rci-mvb-section .rci-h2 span {
    color:#d9b46f;
  }
  .rci-mvb-intro {
    color:rgba(255,255,255,0.74);
    max-width:44rem;
    margin-bottom:2rem;
  }
  .rci-mvb-grid {
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:1rem;
  }
  .rci-mvb-card {
    position:relative;
    overflow:hidden;
    min-height:430px;
    border-radius:28px;
    border:1px solid rgba(255,255,255,0.14);
    background:
      radial-gradient(circle at top right, rgba(217,180,111,0.18), transparent 36%),
      linear-gradient(145deg, #132820 0%, #07110d 100%);
    box-shadow:0 30px 90px rgba(0,0,0,0.28);
  }
  .rci-mvb-image {
    position:absolute;
    inset:0;
    width:100%;
    height:100%;
    object-fit:cover;
    opacity:0.86;
    transform:scale(1.03);
  }
  .rci-mvb-card::after {
    content:'';
    position:absolute;
    inset:0;
    background:
      linear-gradient(180deg, rgba(5,18,14,0.05) 0%, rgba(5,18,14,0.35) 42%, rgba(5,18,14,0.94) 100%),
      linear-gradient(90deg, rgba(5,18,14,0.44), rgba(5,18,14,0.08));
    pointer-events:none;
  }
  .rci-mvb-content {
    position:absolute;
    inset:auto 0 0;
    z-index:1;
    padding:1.45rem;
  }
  .rci-mvb-badge {
    display:inline-flex;
    align-items:center;
    padding:0.42rem 0.7rem;
    border-radius:999px;
    background:rgba(255,255,255,0.12);
    border:1px solid rgba(255,255,255,0.16);
    color:rgba(255,255,255,0.84);
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.68rem;
    line-height:1;
    letter-spacing:0.12em;
    text-transform:uppercase;
    font-weight:750;
    margin-bottom:0.9rem;
    backdrop-filter:blur(14px);
  }
  .rci-mvb-title {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:clamp(1.45rem,2.6vw,2.15rem);
    line-height:1.02;
    letter-spacing:-0.05em;
    font-weight:700;
    color:#fff;
    margin:0 0 0.8rem;
  }
  .rci-mvb-copy {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.9rem;
    line-height:1.75;
    color:rgba(255,255,255,0.76);
    font-weight:300;
    margin:0 0 1.1rem;
  }
  .rci-mvb-list {
    list-style:none;
    display:grid;
    gap:0.55rem;
    padding:0;
    margin:0;
  }
  .rci-mvb-list li {
    display:flex;
    gap:0.55rem;
    align-items:flex-start;
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.84rem;
    line-height:1.55;
    color:rgba(255,255,255,0.78);
    font-weight:300;
  }
  .rci-mvb-list li::before {
    content:'✓';
    color:#d9b46f;
    font-weight:800;
    flex-shrink:0;
  }
  .rci-mvb-decision {
    margin-top:1.25rem;
    padding:1.2rem 1.3rem;
    border-radius:24px;
    background:rgba(255,255,255,0.08);
    border:1px solid rgba(255,255,255,0.14);
    color:rgba(255,255,255,0.78);
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.9rem;
    line-height:1.75;
    font-weight:300;
  }
  .rci-mvb-decision strong {
    color:#d9b46f;
    font-weight:750;
  }

  .rci-data-section {
    background:
      radial-gradient(circle at top left, rgba(217,180,111,0.12), transparent 34%),
      linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
  }
  .rci-data-card {
    position:relative;
    overflow:hidden;
    display:grid;
    grid-template-columns:1.15fr 0.85fr;
    gap:1.5rem;
    align-items:stretch;
    border-radius:30px;
    border:1px solid rgba(17,24,39,0.08);
    background:#fff;
    box-shadow:0 28px 85px rgba(17,24,39,0.08);
  }
  .rci-data-main {
    padding:2rem;
  }
  .rci-data-panel {
    padding:2rem;
    background:#102019;
    color:#fff;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    gap:1.5rem;
  }
  .rci-data-meta {
    display:grid;
    gap:0.85rem;
  }
  .rci-data-meta-row {
    display:flex;
    justify-content:space-between;
    gap:1rem;
    padding-bottom:0.85rem;
    border-bottom:1px solid rgba(255,255,255,0.12);
    font-family:var(--font-geist-sans),sans-serif;
  }
  .rci-data-meta-label {
    font-size:0.68rem;
    letter-spacing:0.14em;
    text-transform:uppercase;
    color:rgba(255,255,255,0.54);
    font-weight:750;
  }
  .rci-data-meta-value {
    font-size:0.86rem;
    color:#d9b46f;
    font-weight:750;
    text-align:right;
  }
  .rci-data-badges {
    display:flex;
    flex-wrap:wrap;
    gap:0.55rem;
    margin-top:1.3rem;
  }
  .rci-data-badge {
    display:inline-flex;
    align-items:center;
    padding:0.42rem 0.7rem;
    border-radius:999px;
    background:#f1eadb;
    color:#102019;
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.68rem;
    line-height:1;
    letter-spacing:0.1em;
    text-transform:uppercase;
    font-weight:750;
  }
  .rci-data-download {
    display:inline-flex;
    align-items:center;
    justify-content:center;
    gap:0.55rem;
    width:100%;
    min-height:48px;
    padding:0.85rem 1rem;
    border-radius:999px;
    background:#d9b46f;
    color:#111;
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.86rem;
    font-weight:800;
    text-decoration:none;
    transition:transform 0.2s ease, background 0.2s ease;
  }
  .rci-data-download:hover {
    transform:translateY(-2px);
    background:#e4c27f;
  }

  .rci-offer-section {
    background:#102019;
    color:#fff;
    border-bottom:none;
  }
  .rci-offer-card {
    position:relative;
    overflow:hidden;
    display:grid;
    grid-template-columns:1.05fr 0.95fr;
    gap:1.5rem;
    align-items:stretch;
    border-radius:32px;
    border:1px solid rgba(255,255,255,0.14);
    background:
      radial-gradient(circle at top right, rgba(217,180,111,0.18), transparent 34%),
      linear-gradient(145deg, #132820 0%, #07110d 100%);
    box-shadow:0 32px 100px rgba(0,0,0,0.32);
  }
  .rci-offer-main {
    padding:2rem;
  }
  .rci-offer-section .rci-eyebrow-text {
    color:rgba(255,255,255,0.72);
  }
  .rci-offer-section .rci-eyebrow-line {
    background:#d9b46f;
  }
  .rci-offer-section .rci-h2 {
    color:#fff;
  }
  .rci-offer-section .rci-h2 span {
    color:#d9b46f;
  }
  .rci-offer-section .rci-p {
    color:rgba(255,255,255,0.76);
  }
  .rci-offer-points {
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:0.75rem;
    margin-top:1.4rem;
  }
  .rci-offer-point {
    display:flex;
    align-items:flex-start;
    gap:0.65rem;
    padding:0.85rem;
    border-radius:18px;
    background:rgba(255,255,255,0.08);
    border:1px solid rgba(255,255,255,0.1);
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.82rem;
    line-height:1.55;
    color:rgba(255,255,255,0.78);
    font-weight:300;
  }
  .rci-offer-point span {
    color:#d9b46f;
    font-weight:900;
    flex-shrink:0;
  }
  .rci-offer-panel {
    position:relative;
    overflow:hidden;
    min-height:360px;
    padding:2rem;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    background:
      linear-gradient(180deg, rgba(5,18,14,0.05) 0%, rgba(5,18,14,0.42) 42%, rgba(5,18,14,0.94) 100%),
      url('/Images/location/chakrata.webp');
    background-size:cover;
    background-position:center;
  }
  .rci-offer-panel::before {
    content:'';
    position:absolute;
    inset:0;
    background:linear-gradient(90deg, rgba(5,18,14,0.34), rgba(5,18,14,0.06));
    pointer-events:none;
  }
  .rci-offer-panel > * {
    position:relative;
    z-index:1;
  }
  .rci-offer-panel-title {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:1.25rem;
    line-height:1.15;
    letter-spacing:-0.035em;
    color:#fff;
    font-weight:750;
    margin:0 0 0.65rem;
  }
  .rci-offer-panel-copy {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.88rem;
    line-height:1.7;
    color:rgba(255,255,255,0.76);
    font-weight:300;
    margin:0 0 1rem;
  }
  .rci-offer-cta-wrap {
    margin-top:1.5rem;
    display:flex;
    flex-wrap:wrap;
    gap:0.8rem;
  }
  .rci-offer-btn {
    display:inline-flex;
    align-items:center;
    justify-content:center;
    min-height:46px;
    padding:0.85rem 1.15rem;
    border-radius:999px;
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.86rem;
    font-weight:800;
    text-decoration:none;
    transition:transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  }
  .rci-offer-btn:hover {
    transform:translateY(-2px);
  }
  .rci-offer-btn-primary {
    background:#d9b46f;
    color:#111;
    border:1px solid rgba(217,180,111,0.9);
  }
  .rci-offer-btn-secondary {
    background:rgba(255,255,255,0.08);
    color:#fff;
    border:1px solid rgba(255,255,255,0.22);
  }

  .rci-program-section {
    background:
      radial-gradient(circle at top right, rgba(217,180,111,0.12), transparent 34%),
      linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
  }
  .rci-program-intro {
    max-width:43rem;
    margin-bottom:2rem;
  }
  .rci-program-grid {
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:1rem;
  }
  .rci-program-card {
    position:relative;
    overflow:hidden;
    min-height:430px;
    border-radius:30px;
    border:1px solid rgba(17,24,39,0.08);
    background:#102019;
    color:#fff;
    text-decoration:none;
    box-shadow:0 28px 85px rgba(17,24,39,0.12);
    display:block;
  }
  .rci-program-image {
    position:absolute;
    inset:0;
    width:100%;
    height:100%;
    object-fit:cover;
    opacity:0.88;
    transform:scale(1.03);
    transition:transform 0.35s ease, opacity 0.35s ease;
  }
  .rci-program-card::after {
    content:'';
    position:absolute;
    inset:0;
    background:
      linear-gradient(180deg, rgba(5,18,14,0.04) 0%, rgba(5,18,14,0.4) 42%, rgba(5,18,14,0.95) 100%),
      linear-gradient(90deg, rgba(5,18,14,0.44), rgba(5,18,14,0.08));
    pointer-events:none;
  }
  .rci-program-card:hover .rci-program-image {
    transform:scale(1.08);
    opacity:1;
  }
  .rci-program-content {
    position:absolute;
    inset:auto 0 0;
    z-index:1;
    padding:1.45rem;
  }
  .rci-program-badge {
    display:inline-flex;
    align-items:center;
    padding:0.42rem 0.7rem;
    border-radius:999px;
    background:rgba(255,255,255,0.12);
    border:1px solid rgba(255,255,255,0.16);
    color:rgba(255,255,255,0.84);
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.68rem;
    line-height:1;
    letter-spacing:0.12em;
    text-transform:uppercase;
    font-weight:750;
    margin-bottom:0.9rem;
    backdrop-filter:blur(14px);
  }
  .rci-program-title {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:clamp(1.45rem,2.6vw,2.1rem);
    line-height:1.04;
    letter-spacing:-0.05em;
    font-weight:750;
    color:#fff;
    margin:0 0 0.8rem;
  }
  .rci-program-copy {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.9rem;
    line-height:1.75;
    color:rgba(255,255,255,0.76);
    font-weight:300;
    margin:0 0 1.05rem;
    max-width:29rem;
  }
  .rci-program-meta {
    display:flex;
    flex-wrap:wrap;
    gap:0.55rem;
    margin-bottom:1rem;
  }
  .rci-program-pill {
    display:inline-flex;
    align-items:center;
    padding:0.4rem 0.65rem;
    border-radius:999px;
    background:rgba(255,255,255,0.1);
    border:1px solid rgba(255,255,255,0.12);
    color:rgba(255,255,255,0.76);
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.72rem;
    font-weight:650;
  }
  .rci-program-link {
    display:inline-flex;
    align-items:center;
    color:#d9b46f;
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.84rem;
    font-weight:800;
  }

  .rci-faq-section {
    background:
      radial-gradient(circle at top left, rgba(217,180,111,0.12), transparent 34%),
      linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
  }
  .rci-faq-card {
    display:grid;
    grid-template-columns:0.8fr 1.2fr;
    gap:2rem;
    align-items:start;
    padding:2rem;
    border-radius:32px;
    border:1px solid rgba(17,24,39,0.08);
    background:#fff;
    box-shadow:0 28px 85px rgba(17,24,39,0.08);
  }
  .rci-faq-intro {
    position:sticky;
    top:6rem;
  }
  .rci-faq-copy {
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.9rem;
    line-height:1.8;
    font-weight:300;
    color:#555;
    margin:0 0 1.2rem;
  }
  .rci-faq-mini {
    display:grid;
    gap:0.65rem;
    margin-top:1.2rem;
  }
  .rci-faq-mini-item {
    display:flex;
    align-items:flex-start;
    gap:0.6rem;
    padding:0.8rem;
    border-radius:18px;
    background:#f7f9f7;
    border:1px solid rgba(17,24,39,0.06);
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.8rem;
    line-height:1.55;
    color:#475569;
    font-weight:300;
  }
  .rci-faq-mini-item span {
    color:#0f766e;
    font-weight:900;
    flex-shrink:0;
  }
  .rci-faq-list {
    padding:0.25rem 0.5rem;
  }

  .rci-related-section {
    background:#102019;
    color:#fff;
    border-bottom:none;
  }
  .rci-related-section .rci-eyebrow-text {
    color:rgba(255,255,255,0.72);
  }
  .rci-related-section .rci-eyebrow-line {
    background:#d9b46f;
  }
  .rci-related-section .rci-h2 {
    color:#fff;
  }
  .rci-related-section .rci-h2 span {
    color:#d9b46f;
  }
  .rci-related-intro {
    color:rgba(255,255,255,0.72);
    max-width:42rem;
    margin-bottom:2rem;
  }
  .rci-related-grid {
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:0.9rem;
  }
  .rci-related-card {
    position:relative;
    overflow:hidden;
    display:block;
    min-height:150px;
    padding:1.2rem;
    border-radius:24px;
    border:1px solid rgba(255,255,255,0.13);
    background:
      radial-gradient(circle at top right, rgba(217,180,111,0.14), transparent 34%),
      rgba(255,255,255,0.07);
    color:#fff;
    text-decoration:none;
    transition:transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
  }
  .rci-related-card:hover {
    transform:translateY(-4px);
    border-color:rgba(217,180,111,0.42);
    background:
      radial-gradient(circle at top right, rgba(217,180,111,0.2), transparent 34%),
      rgba(255,255,255,0.1);
  }
  .rci-related-kicker {
    display:block;
    margin-bottom:0.7rem;
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.66rem;
    letter-spacing:0.14em;
    text-transform:uppercase;
    color:#d9b46f;
    font-weight:800;
  }
  .rci-related-title {
    display:block;
    font-family:var(--font-geist-sans),sans-serif;
    font-size:1rem;
    line-height:1.3;
    letter-spacing:-0.025em;
    color:#fff;
    font-weight:750;
    margin-bottom:0.65rem;
  }
  .rci-related-copy {
    display:block;
    font-family:var(--font-geist-sans),sans-serif;
    font-size:0.82rem;
    line-height:1.65;
    color:rgba(255,255,255,0.68);
    font-weight:300;
  }
  .rci-related-arrow {
    position:absolute;
    right:1.1rem;
    bottom:1rem;
    color:#d9b46f;
    font-family:var(--font-geist-sans),sans-serif;
    font-weight:900;
  }

  .ft-root {
    margin-top:0;
  }
  @media(max-width:640px){
    .rci-section { padding-top:3rem; padding-bottom:3rem; }
    .rci-inner { padding:0 1.25rem; }
    .rci-stat-grid { grid-template-columns:1fr; }
    .rci-hero { min-height:auto; }
    .rci-hero-inner { padding:6rem 1.25rem 6.5rem; }
    .rci-hero-actions { flex-direction:column; align-items:stretch; }
    .rci-hero-btn { width:100%; }
    .rci-hero-stats { grid-template-columns:1fr; }
    .rci-kpi-grid { grid-template-columns:1fr; }
    .rci-kpi-card { min-height:auto; }
    .rci-location-grid { grid-template-columns:1fr; }
    .rci-location-card { min-height:320px; }
    .rci-compare-shell { overflow-x:auto; border-radius:20px; }
    .rci-compare-table { min-width:760px; }
    .rci-factor-grid { grid-template-columns:1fr; }
    .rci-factor-card { min-height:auto; }
    .rci-duration-grid { grid-template-columns:1fr; }
    .rci-duration-card { min-height:auto; }
    .rci-mvb-grid { grid-template-columns:1fr; }
    .rci-mvb-card { min-height:390px; }
    .rci-data-card { grid-template-columns:1fr; }
    .rci-data-main, .rci-data-panel { padding:1.35rem; }
    .rci-offer-card { grid-template-columns:1fr; }
    .rci-offer-main, .rci-offer-panel { padding:1.35rem; }
    .rci-offer-points { grid-template-columns:1fr; }
    .rci-offer-panel { min-height:320px; }
    .rci-program-grid { grid-template-columns:1fr; }
    .rci-program-card { min-height:380px; }
    .rci-faq-card { grid-template-columns:1fr; padding:1.25rem; }
    .rci-faq-intro { position:static; }
    .rci-faq-list { padding:0; }
    .rci-related-grid { grid-template-columns:1fr; }
  }
`}</style>

        {/* ── HERO ── */}
        <section className="rci-section rci-hero">
          <div className="rci-hero-inner">
            <div className="rci-hero-content">
              <div className="rci-eyebrow">
                <span className="rci-eyebrow-line" />
                <span className="rci-eyebrow-text">2026 Report · Retreat Costs</span>
              </div>
              <h1 className="rci-hero-title">
                {data.title}
              </h1>
              <p className="rci-hero-copy">{data.description}</p>

              <div className="rci-hero-actions">
                <Link href="/retreats" className="rci-hero-btn rci-hero-btn-primary">
                  Explore retreats within your budget
                </Link>
                <a href="#retreat-cost-statistics" className="rci-hero-btn rci-hero-btn-secondary">
                  Compare retreat costs
                </a>
              </div>

              <div className="rci-hero-stats">
                {data.stats.map((stat) => (
                  <div key={stat.label} className="rci-hero-stat">
                    <p className="rci-hero-stat-value">{stat.value}</p>
                    <p className="rci-hero-stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── KEY STATISTICS ── */}
        <section id="retreat-cost-statistics" className="rci-section rci-kpi-section">
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Key Numbers</span>
            </div>
            <h2 className="rci-h2">
              Quick retreat cost <span>benchmarks</span>
            </h2>
            <p className="rci-p rci-kpi-intro">
              Use these numbers as a starting point before comparing destination, duration, accommodation style, meals, facilitation, and transport inclusions.
            </p>
            <div className="rci-kpi-grid">
              {data.stats.map((stat, index) => {
                const statDecor = [
                  {
                    icon: '₹',
                    note: 'A practical range for short retreats before private room upgrades, premium locations, or add-on therapies.',
                  },
                  {
                    icon: '3–5',
                    note: 'The sweet spot for people who want a meaningful reset without committing to a long wellness program.',
                  },
                  {
                    icon: '⌂',
                    note: 'Mountain destinations remain popular because they combine quiet settings, nature access, and better value.',
                  },
                ][index];

                return (
                  <div key={stat.label} className="rci-kpi-card">
                    <div className="rci-kpi-icon">{statDecor.icon}</div>
                    <p className="rci-kpi-value">{stat.value}</p>
                    <p className="rci-kpi-label">{stat.label}</p>
                    <p className="rci-kpi-note">{statDecor.note}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── COST BY LOCATION ── */}
        <section className="rci-section rci-location-section">
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">By Location</span>
            </div>
            <h2 className="rci-h2">
              Average retreat cost <span>by location</span>
            </h2>
            <p className="rci-p">
              Retreat prices vary significantly depending on the region, access, accommodation style, season, and how commercial the destination has become.
            </p>

            <div className="rci-location-grid">
              {data.locations.map((loc) => {
                const locationDecor: Record<string, { image?: string; badge: string; href?: string }> = {
                  Uttarakhand: {
                    image: '/Images/hero/valley-forest.webp',
                    badge: 'Best value',
                    href: '/retreats/uttarakhand-retreats',
                  },
                  Rishikesh: {
                    image: '/Images/location/rishikesh.webp',
                    badge: 'Yoga capital',
                    href: '/retreats/yoga-retreat-rishikesh',
                  },
                  Goa: {
                    badge: 'Beach wellness',
                  },
                };

                const decor = locationDecor[loc.name] || { badge: 'Retreat destination' };

                const card = (
                  <div className="rci-location-card">
                    {decor.image && (
                      <img
                        src={decor.image}
                        alt={`${loc.name} retreat destination in India`}
                        className="rci-location-image"
                        loading="lazy"
                      />
                    )}
                    <div className="rci-location-content">
                      <span className="rci-location-badge">{decor.badge}</span>
                      <h3 className="rci-location-name">{loc.name}</h3>
                      <p className="rci-location-desc">{loc.description}</p>
                      <div className="rci-location-price">
                        <span className="rci-location-price-label">Average price</span>
                        <span className="rci-location-price-value">{loc.avgPrice}</span>
                      </div>
                      {decor.href && <span className="rci-location-cta">Explore retreats →</span>}
                    </div>
                  </div>
                );

                if (decor.href) {
                  return (
                    <Link key={loc.name} href={decor.href} className="rci-location-link">
                      {card}
                    </Link>
                  );
                }

                return (
                  <div key={loc.name}>
                    {card}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PRICE COMPARISON ── */}
        <section className="rci-section rci-compare-section">
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Price Comparison</span>
            </div>
            <h2 className="rci-h2">
              Retreat price <span>comparison</span> (India)
            </h2>
            <p className="rci-p rci-compare-intro">
              Use this comparison to understand how the same retreat duration can feel very different depending on destination, setting, and inclusions.
            </p>

            <div className="rci-compare-shell">
              <table className="rci-compare-table">
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Average 3-day cost</th>
                    <th>Best for</th>
                    <th>Budget signal</th>
                    <th>Typical experience</th>
                  </tr>
                </thead>
                <tbody>
                  {data.locations.map((loc) => {
                    const comparisonMeta: Record<string, { bestFor: string; budget: string }> = {
                      Uttarakhand: {
                        bestFor: 'Value-focused mountain retreats, quiet nature, forest stays',
                        budget: 'Best value',
                      },
                      Rishikesh: {
                        bestFor: 'Yoga, meditation, spiritual practice, riverside retreat culture',
                        budget: 'Mid range',
                      },
                      Goa: {
                        bestFor: 'Beach wellness, spa-style relaxation, warm-weather escapes',
                        budget: 'Premium leaning',
                      },
                    };

                    const meta = comparisonMeta[loc.name] || {
                      bestFor: 'General retreat planning',
                      budget: 'Varies',
                    };

                    return (
                      <tr key={loc.name}>
                        <td><span className="rci-compare-location">{loc.name}</span></td>
                        <td><span className="rci-compare-price">{loc.avgPrice}</span></td>
                        <td>{meta.bestFor}</td>
                        <td><span className="rci-compare-badge">{meta.budget}</span></td>
                        <td>{loc.description}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="rci-compare-note">
              <span>₹</span>
              <span><strong>Planning tip:</strong> compare what is included before comparing price alone. A cheaper retreat can become expensive if meals, transport, private rooms, or guided sessions are charged separately.</span>
            </div>
          </div>
        </section>

        {/* ── WHAT AFFECTS COST (FACTORS) ── */}
        <section className="rci-section rci-factor-section">
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Price Factors</span>
            </div>
            <h2 className="rci-h2">
              What affects the <span>cost</span> of a retreat
            </h2>
            <p className="rci-p rci-factor-intro">
              Retreat pricing is not decided by destination alone. The real cost depends on how the stay is structured, how personal the facilitation is, and what is included before you arrive.
            </p>

            <div className="rci-factor-grid">
              {[
                {
                  icon: '⌖',
                  title: 'Location',
                  copy: 'Mountain retreats often cost less than beach destinations because operating costs, land pressure, and commercial demand are usually lower.',
                },
                {
                  icon: '◷',
                  title: 'Duration',
                  copy: 'Longer retreats usually improve per-day value because accommodation, meals, and facilitation are spread across more days.',
                },
                {
                  icon: '●',
                  title: 'Group size',
                  copy: 'Small-group and private retreats cost more because participants receive more attention, flexibility, and facilitation time.',
                },
                {
                  icon: '⌂',
                  title: 'Accommodation',
                  copy: 'Shared rooms keep pricing lower. Private rooms, premium views, attached bathrooms, and boutique stays increase the retreat cost.',
                },
                {
                  icon: '+',
                  title: 'Inclusions',
                  copy: 'Meals, transport, guided sessions, materials, local experiences, and therapies can change the real value of a retreat package.',
                },
                {
                  icon: '☼',
                  title: 'Season',
                  copy: 'Peak months from October to March can command higher prices, especially in popular yoga, beach, and winter-sun destinations.',
                },
              ].map((factor) => (
                <div key={factor.title} className="rci-factor-card">
                  <div className="rci-factor-icon">{factor.icon}</div>
                  <h3 className="rci-factor-title">{factor.title}</h3>
                  <p className="rci-factor-copy">{factor.copy}</p>
                </div>
              ))}
            </div>

            <div className="rci-factor-footer">
              <strong>Best way to compare:</strong> check the total package value, not only the headline price. A retreat that includes meals, guided practice, local transport, and small-group facilitation may be better value than a cheaper stay with many add-ons.
            </div>
          </div>
        </section>

        {/* ── DURATION TRENDS ── */}
        <section className="rci-section rci-duration-section">
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Duration Trends</span>
            </div>
            <h2 className="rci-h2">
              Retreat <span>duration</span> and pricing trends
            </h2>
            <p className="rci-p rci-duration-intro">
              Duration changes the retreat experience as much as price. A weekend reset works for quick recovery, while longer programs create more space for practice, silence, and deeper nervous-system rest.
            </p>

            <div className="rci-duration-grid">
              {[
                {
                  days: '2–3',
                  title: 'Weekend retreat',
                  copy: 'A short reset for people who want to step away from city life without taking a full week off. Best for first-timers, busy professionals, and nearby travelers.',
                  best: 'Best for: quick rest, burnout prevention, first retreat experience',
                },
                {
                  days: '3–5',
                  title: 'Most balanced format',
                  copy: 'The most popular retreat duration because it gives enough time for arrival, settling, guided practice, nature immersion, and meaningful rest without a large time commitment.',
                  best: 'Best for: reset, clarity, yoga, meditation, nature-based retreats',
                },
                {
                  days: '7–10',
                  title: 'Deeper immersion',
                  copy: 'Longer retreats usually offer better per-day value and are better suited for silence, meditation, yoga-focused programs, and people who need a real break from routine.',
                  best: 'Best for: silence, deep rest, practice, personal transformation',
                },
              ].map((item) => (
                <div key={item.days} className="rci-duration-card">
                  <div className="rci-duration-days">{item.days}</div>
                  <h3 className="rci-duration-title">{item.title}</h3>
                  <p className="rci-duration-copy">{item.copy}</p>
                  <div className="rci-duration-best"><span>{item.best}</span></div>
                </div>
              ))}
            </div>

            <div className="rci-duration-note">
              <strong>Pricing insight:</strong> longer retreats can look more expensive upfront, but the per-day cost often becomes better because accommodation, meals, and facilitation are spread across more nights.
            </div>
          </div>
        </section>

        {/* ── MOUNTAIN VS BEACH ── */}
        <section className="rci-section rci-mvb-section">
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Comparison</span>
            </div>
            <h2 className="rci-h2">
              Mountain retreats vs <span>beach retreats</span>
            </h2>
            <p className="rci-p rci-mvb-intro">
              Mountain and beach retreats are not just priced differently — they create different kinds of rest. The better choice depends on whether you want quiet nature, spiritual practice, spa-style relaxation, or warm-weather escape.
            </p>

            <div className="rci-mvb-grid">
              <div className="rci-mvb-card">
                <img
                  src="/Images/hero/valley-forest.webp"
                  alt="Mountain forest retreat setting in the Himalayas"
                  className="rci-mvb-image"
                  loading="lazy"
                />
                <div className="rci-mvb-content">
                  <span className="rci-mvb-badge">Often better value</span>
                  <h3 className="rci-mvb-title">Mountain retreats</h3>
                  <p className="rci-mvb-copy">
                    Himalayan retreats in Uttarakhand and Himachal Pradesh often cost less because they rely on simpler stays, local food, quieter settings, and lower commercial pressure.
                  </p>
                  <ul className="rci-mvb-list">
                    <li>Best for silence, forest walks, meditation, and deeper rest</li>
                    <li>Often more affordable for 3–5 day retreats</li>
                    <li>Stronger fit for burnout recovery and nature immersion</li>
                  </ul>
                </div>
              </div>

              <div className="rci-mvb-card">
                <div className="rci-mvb-content">
                  <span className="rci-mvb-badge">Premium leaning</span>
                  <h3 className="rci-mvb-title">Beach retreats</h3>
                  <p className="rci-mvb-copy">
                    Beach retreats in places like Goa or Kerala often cost more because they are closer to commercial tourism circuits, spa services, premium stays, and high-demand leisure seasons.
                  </p>
                  <ul className="rci-mvb-list">
                    <li>Best for warm weather, spa treatments, and relaxed beach schedules</li>
                    <li>Usually higher priced in peak tourist months</li>
                    <li>Better fit for leisure-style wellness than deep disconnection</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rci-mvb-decision">
              <strong>Decision guide:</strong> choose mountains if your priority is quiet, budget value, nature, and reset. Choose beaches if your priority is warm weather, leisure comfort, spa-style wellness, and a holiday-like retreat.
            </div>
          </div>
        </section>

        {/* ── DOWNLOAD DATASET ── */}
        <section className="rci-section rci-data-section">
          <div className="rci-inner">
            <div className="rci-data-card">
              <div className="rci-data-main">
                <div className="rci-eyebrow">
                  <span className="rci-eyebrow-line" />
                  <span className="rci-eyebrow-text">Open Data</span>
                </div>
                <h2 className="rci-h2">
                  Download the <span>dataset</span>
                </h2>
                <p className="rci-p">
                  This retreat pricing data is available as a downloadable JSON file. Researchers, bloggers, and travel writers are welcome to reference this data with attribution.
                </p>
                <div className="rci-data-badges">
                  <span className="rci-data-badge">JSON format</span>
                  <span className="rci-data-badge">Pricing guide</span>
                  <span className="rci-data-badge">2026 report</span>
                </div>
              </div>

              <div className="rci-data-panel">
                <div className="rci-data-meta">
                  <div className="rci-data-meta-row">
                    <span className="rci-data-meta-label">Coverage</span>
                    <span className="rci-data-meta-value">India</span>
                  </div>
                  <div className="rci-data-meta-row">
                    <span className="rci-data-meta-label">Includes</span>
                    <span className="rci-data-meta-value">Costs & trends</span>
                  </div>
                  <div className="rci-data-meta-row">
                    <span className="rci-data-meta-label">Use case</span>
                    <span className="rci-data-meta-value">Research / planning</span>
                  </div>
                </div>

                <a
                  href="/data/retreat-cost-india.json"
                  download
                  className="rci-data-download"
                >
                  ↓ Download JSON dataset
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUR RETREATS ── */}
        <section className="rci-section rci-offer-section">
          <div className="rci-inner">
            <div className="rci-offer-card">
              <div className="rci-offer-main">
                <div className="rci-eyebrow">
                  <span className="rci-eyebrow-line" />
                  <span className="rci-eyebrow-text">Our Retreats</span>
                </div>
                <h2 className="rci-h2">
                  Retreats we <span>offer</span>
                </h2>
                <p className="rci-p">
                  We run small-group and private retreats across quiet Himalayan locations in Uttarakhand. Our retreats are designed around rest, clarity, and nature immersion rather than packed schedules.
                </p>
                <p className="rci-p">
                  Retreat prices include accommodation, locally prepared meals, guided nature experiences, and small group facilitation.
                </p>

                <div className="rci-offer-points">
                  <div className="rci-offer-point"><span>✓</span> Small-group and private formats</div>
                  <div className="rci-offer-point"><span>✓</span> Quiet Himalayan locations</div>
                  <div className="rci-offer-point"><span>✓</span> Meals, stay, and guided rhythm included</div>
                  <div className="rci-offer-point"><span>✓</span> Retreats matched to budget and intention</div>
                </div>

                <div className="rci-offer-cta-wrap">
                  <Link href="/retreats" className="rci-offer-btn rci-offer-btn-primary">
                    Explore retreats
                  </Link>
                  <Link href="/contact" className="rci-offer-btn rci-offer-btn-secondary">
                    Ask for a budget recommendation
                  </Link>
                </div>
              </div>

              <div className="rci-offer-panel">
                <h3 className="rci-offer-panel-title">Not sure which retreat fits your budget?</h3>
                <p className="rci-offer-panel-copy">
                  Share your preferred dates, budget, and retreat style. We can help you compare the right Himalayan retreat instead of guessing from price alone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── RETREAT EXPERIENCES ── */}
        <section className="rci-section rci-program-section">
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Our Programs</span>
            </div>
            <h2 className="rci-h2">
              Retreat experiences <span>referenced</span> in this data
            </h2>
            <p className="rci-p rci-program-intro">
              These are retreat programs we offer across the price ranges discussed above. Each includes accommodation, meals, and guided experiences.
            </p>

            <div className="rci-program-grid">
              {[
                {
                  title: 'Burnout Recovery Retreat',
                  href: '/retreats/journeys/burnout-recovery',
                  image: '/Images/services/burnoutrec.webp',
                  badge: 'For exhaustion',
                  copy: 'A 3-day weekend retreat designed for people feeling mentally exhausted from work or city life.',
                  meta: ['3-day format', 'Small group', 'Guided reset'],
                },
                {
                  title: 'Rest & Reset Retreat',
                  href: '/retreats/journeys/rest-and-reset',
                  image: '/Images/services/restreset.webp',
                  badge: 'For quiet recovery',
                  copy: 'A nature-based retreat focused on quiet environments, forest immersion, and mental clarity.',
                  meta: ['Nature based', 'Forest immersion', 'Gentle rhythm'],
                },
              ].map((program) => (
                <Link key={program.title} href={program.href} className="rci-program-card">
                  <img
                    src={program.image}
                    alt={`${program.title} in the Himalayas`}
                    className="rci-program-image"
                    loading="lazy"
                  />
                  <div className="rci-program-content">
                    <span className="rci-program-badge">{program.badge}</span>
                    <h3 className="rci-program-title">{program.title}</h3>
                    <p className="rci-program-copy">{program.copy}</p>
                    <div className="rci-program-meta">
                      {program.meta.map((item) => (
                        <span key={item} className="rci-program-pill">{item}</span>
                      ))}
                    </div>
                    <span className="rci-program-link">View retreat details →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="rci-section rci-faq-section">
          <div className="rci-inner">
            <div className="rci-faq-card">
              <div className="rci-faq-intro">
                <div className="rci-eyebrow">
                  <span className="rci-eyebrow-line" />
                  <span className="rci-eyebrow-text">Common Questions</span>
                </div>
                <h2 className="rci-h2">
                  Frequently asked <span>questions</span>
                </h2>
                <p className="rci-faq-copy">
                  Clear answers to the questions people usually ask before comparing retreat prices, choosing a destination, or deciding whether a retreat is worth the cost.
                </p>
                <div className="rci-faq-mini">
                  <div className="rci-faq-mini-item"><span>✓</span> Pricing, duration, and destination clarity</div>
                  <div className="rci-faq-mini-item"><span>✓</span> Helps compare retreats before booking</div>
                  <div className="rci-faq-mini-item"><span>✓</span> Useful for first-time retreat guests</div>
                </div>
              </div>

              <div className="rci-faq-list">
                <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED GUIDES ── */}
        <section className="rci-section rci-related-section">
          <div className="rci-inner">
            <div className="rci-eyebrow">
              <span className="rci-eyebrow-line" />
              <span className="rci-eyebrow-text">Related Guides</span>
            </div>
            <h2 className="rci-h2">
              Related retreat <span>guides</span>
            </h2>
            <p className="rci-p rci-related-intro">
              Continue comparing retreat locations, weekend formats, Himalayan options, and practical planning pages before choosing your retreat.
            </p>

            <div className="rci-related-grid">
              {[
                {
                  href: '/retreats/weekend-retreat-near-delhi',
                  kicker: 'Weekend planning',
                  title: 'Weekend Retreat Near Delhi',
                  copy: 'Compare short retreat options for quick escapes from Delhi NCR.',
                },
                {
                  href: '/retreats/retreats-near-delhi',
                  kicker: 'Location guide',
                  title: 'Retreats Near Delhi',
                  copy: 'Find accessible retreat locations without long travel complexity.',
                },
                {
                  href: '/retreats/weekend-himalayan-retreats',
                  kicker: 'Mountain reset',
                  title: 'Weekend Himalayan Retreats',
                  copy: 'Explore short Himalayan retreats designed around rest and nature.',
                },
                {
                  href: '/retreats/best-retreat-in-uttarakhand',
                  kicker: 'Destination comparison',
                  title: 'Best Retreats in Uttarakhand',
                  copy: 'Compare Uttarakhand retreat destinations by purpose, season, and budget.',
                },
                {
                  href: '/retreats',
                  kicker: 'All programs',
                  title: 'All Retreats',
                  copy: 'Browse the full collection of retreat journeys and planning pages.',
                },
              ].map((guide) => (
                <Link key={guide.href} href={guide.href} className="rci-related-card">
                  <span className="rci-related-kicker">{guide.kicker}</span>
                  <span className="rci-related-title">{guide.title}</span>
                  <span className="rci-related-copy">{guide.copy}</span>
                  <span className="rci-related-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </article>
    </TrackedPage>
  );
}
