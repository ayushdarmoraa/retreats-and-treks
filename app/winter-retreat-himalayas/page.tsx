import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema, generateBlogPostingSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import RelatedReads from '@/components/RelatedReads';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const PATH = '/winter-retreat-himalayas';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Winter Retreat in the Himalayas | Retreats And Treks',
    description:
      'Winter retreats in the Himalayas with meditation, healing, deep rest, cold air, clear skies, fewer crowds, and quiet settings in Chakrata and Rishikesh.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Winter Retreat in the Himalayas',
      description: 'The quietest season for the deepest work. Himalayan winter retreats in Chakrata, Rishikesh, Mussoorie.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Winter Retreat in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How cold does it get during a Himalayan winter retreat?',
    answer:
      'Chakrata (2,200 m) drops to 0–5°C at night, 10–15°C daytime from December–February. Rishikesh (370 m) stays milder at 5–20°C. Mussoorie ranges 0–10°C. Accommodation is heated or insulated, and warm bedding is provided. The cold is part of the experience — it sharpens attention and makes the warm retreat spaces feel like sanctuaries.',
  },
  {
    question: 'Which locations are accessible in winter?',
    answer:
      'Chakrata, Rishikesh, and Mussoorie remain accessible throughout winter. Roads may occasionally close for heavy snowfall in Chakrata, but typically for hours, not days. Zanskar is inaccessible from October–May. Munsiyari access becomes unreliable in deep winter. Sankri is snow-covered but sometimes accessible for combined trek–retreat experiences.',
  },
  {
    question: 'Is winter a good time for a first retreat?',
    answer:
      'Winter is an excellent time for a first retreat. The cold naturally encourages inward focus. Tourist numbers drop to near zero, creating genuine solitude. The short days and early dark create a natural rhythm of practice and rest. Rishikesh in winter offers the gentlest entry — warm enough for comfort, quiet enough for depth.',
  },
  {
    question: 'What should I pack for a winter Himalayan retreat?',
    answer:
      'Layers: thermal base, fleece mid-layer, and a warm outer jacket. Warm socks, a beanie, and gloves for morning walks. A shawl or blanket for meditation sessions. Hot water bottles are provided. The key is warmth without bulk — you want to be comfortable sitting for extended periods. See our preparation guide for full details.',
  },
];

const WHY_WINTER = [
  { title: 'Solitude', text: 'Tourist numbers drop 90%+ in winter. You may be the only group in the area — genuine, uncrowded stillness.' },
  { title: 'Acoustic Clarity', text: 'Cold, dense air carries sound differently. The silence itself feels sharper, more complete.' },
  { title: 'Natural Rhythm', text: 'Short winter days create early evenings and long, restorative sleep without any effort.' },
  { title: 'Inward Pull', text: 'The cold naturally discourages wandering and encourages sitting, reading, and reflecting.' },
  { title: 'Visual Beauty', text: 'Snow-dusted forests, frost on glass, and clear mountain views unobscured by haze.' },
  { title: 'Warmth as Ritual', text: 'A fire, a blanket, a hot cup of tea — small comforts become deeply felt rituals against the cold.' },
];

const LOCATIONS = [
  {
    name: 'Chakrata',
    id: 'chakrata',
    tagline: 'Forest Silence in Snow',
    description: 'Light snowfall dusts the deodar forest at 2,200m, deepening an already profound stillness. Heated accommodation. Accessible year-round from Dehradun.',
    image: '/Images/location/chakrata.webp',
  },
  {
    name: 'Rishikesh',
    id: 'rishikesh',
    tagline: 'Warm Winter Retreat',
    description: 'At 370m, Rishikesh stays mild enough for comfortable outdoor practice all winter. The Ganges runs clear, the ashrams are quiet, and morning fog softens the riverbanks.',
    image: '/Images/location/rishikesh.webp',
  },
  {
    name: 'Mussoorie',
    id: 'mussoorie',
    tagline: 'Cloud-Wrapped Quiet',
    description: 'The tourists leave and the mist settles in. Occasional snowfall transforms the ridgelines. Quiet pockets near Cloud End make ideal retreat spaces, 1.5 hours from Dehradun.',
    image: '/Images/location/mussoorie.webp',
  },
];

export default function WinterRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Winter Retreat in the Himalayas', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = generateBlogPostingSchema({
    title: 'Winter Retreat in the Himalayas — Snow, Silence, Recalibration',
    description:
      'Winter retreats in the Himalayas with meditation, healing, deep rest, cold air, clear skies, fewer crowds, and quiet settings in Chakrata and Rishikesh.',
    publishedAt: '2026-03-06',
    lastUpdated: '2026-05-09',
    url: canonicalUrl,
  });

  // Split heading for green last word
  const h1Words = 'Winter Retreat in the Himalayas'.split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.retreatHero;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Winter Retreat in the Himalayas — Snow, Silence, Recalibration"
        description="Winter retreats in the Himalayas with meditation, healing, deep rest, cold air, clear skies, fewer crowds, and quiet settings in Chakrata and Rishikesh."
        path={PATH}
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
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } }

        @keyframes med-hero-zoom { from { transform: scale(1.06); } to { transform: scale(1); } }
        .med-hero-bg { animation: med-hero-zoom 24s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .med-hero-bg { animation: none; } }

        .med-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .med-list-item { display: grid; grid-template-columns: 1.9rem 1fr; gap: 0.9rem; }
        .med-list-dot { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid rgba(15,118,110,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .med-list-dot-inner { width: 7px; height: 7px; border-radius: 50%; background: #0f766e; }
        .med-list-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.85; color: #4b5259; font-weight: 400; }
        .med-list-text strong { color: #2B2A26; font-weight: 600; }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-hero-section {
          position: relative;
          overflow: hidden;
          min-height: 75vh;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(15,118,110,0.12);
        }
        .med-hero-section .med-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%);
        }
        .med-hero-section .med-hero-content {
          position: relative;
          z-index: 2;
          max-width: 58rem;
          width: 100%;
          padding: 5rem 1.5rem 4.5rem;
          text-align: center;
        }
        .med-hero-section .med-hero-content .med-h1 {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(2.3rem, 4.6vw, 3.4rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 1.1rem;
          line-height: 1.08;
          text-shadow: 0 3px 24px rgba(0,0,0,0.5);
        }
        .med-hero-section .med-hero-content .med-h1 span {
          color: #5eead4;
        }
        .med-hero-section .med-hero-content .med-body {
          max-width: 46rem;
          margin: 0 auto 1.5rem;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.85);
          text-shadow: 0 2px 14px rgba(0,0,0,0.45);
        }
        .med-hero-section .med-hero-content .med-hero-tags {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .med-hero-section .med-hero-content .med-hero-tags span {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 999px;
          padding: 0.35rem 0.9rem;
          background: rgba(15,118,110,0.25);
        }
        .med-hero-section .med-hero-content .med-hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .med-section-padding { padding: 4rem 0; }
        .med-section-padding-sm { padding: 3rem 0; }

        /* ── Page specific styles ── */
        .med-winter-why-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 820px) { .med-winter-why-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 540px) { .med-winter-why-grid { grid-template-columns: 1fr; } }
        .med-winter-why-card { padding: 1.75rem; }
        .med-winter-why-card .med-h3 { font-size: 1rem; margin-bottom: 0.4rem; }
        .med-winter-why-card .med-body { font-size: 0.88rem; margin-bottom: 0; }

        .med-winter-loc-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 820px) { .med-winter-loc-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 480px) { .med-winter-loc-grid { grid-template-columns: 1fr; } }

        .med-winter-loc-card {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          min-height: 320px;
          display: flex;
          align-items: flex-end;
          text-decoration: none;
          border: 1px solid rgba(15,118,110,0.12);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
        }
        .med-winter-loc-card:hover { transform: translateY(-6px); box-shadow: 0 22px 48px rgba(15,31,28,0.12); }
        .med-winter-loc-card .med-img-wrap { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }
        .med-winter-loc-card .med-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.22,1,0.36,1); }
        .med-winter-loc-card:hover .med-img { transform: scale(1.08); }
        .med-winter-loc-card .med-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%); z-index: 1; }
        .med-winter-loc-card .med-content { position: relative; z-index: 2; padding: 1.5rem; width: 100%; color: #fff; }
        .med-winter-loc-card .med-content .med-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #5eead4; background: rgba(15,118,110,0.3); padding: 0.2rem 0.7rem; border-radius: 999px; margin-bottom: 0.5rem; }
        .med-winter-loc-card .med-content .med-h3 { color: #fff; font-size: 1.2rem; margin-bottom: 0.3rem; }
        .med-winter-loc-card .med-content .med-body { color: rgba(255,255,255,0.8); font-size: 0.88rem; margin-bottom: 0; }

        .med-winter-options-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.25rem; }
        @media (max-width: 720px) { .med-winter-options-grid { grid-template-columns: 1fr; } }
        .med-winter-option-card { padding: 1.5rem; display: flex; flex-direction: column; gap: 0.35rem; text-decoration: none; }
        .med-winter-option-card .med-h3 { font-size: 1rem; margin-bottom: 0.15rem; }
        .med-winter-option-card .med-body { font-size: 0.88rem; margin-bottom: 0; }
        .med-winter-option-card .med-link { font-family: var(--font-inter), sans-serif; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #0f766e; margin-top: 0.4rem; }

        .med-winter-footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1.5rem;
          justify-content: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(15,118,110,0.08);
        }
        .med-winter-footer-links a {
          color: #0f766e;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
        }
        .med-winter-footer-links a:hover { text-decoration: underline; }
        .med-winter-footer-links .divider { color: #d1d5db; }

        /* ── FAQ Accordion ── */
        .med-faq-accordion { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.5rem; }
        .med-faq-details { background: #fff; border: 1px solid rgba(15,118,110,0.1); border-radius: 12px; overflow: hidden; transition: border-color 0.3s ease; }
        .med-faq-details:hover { border-color: rgba(15,118,110,0.25); }
        .med-faq-details[open] { border-color: rgba(15,118,110,0.3); }
        .med-faq-summary {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.25rem 1.5rem; cursor: pointer; list-style: none;
          font-family: var(--font-inter), sans-serif; font-size: 0.95rem; font-weight: 500;
          color: #2B2A26; transition: background 0.2s ease; user-select: none; gap: 1rem;
        }
        .med-faq-summary::-webkit-details-marker { display: none; }
        .med-faq-summary:hover { background: rgba(15,118,110,0.03); }
        .med-faq-details[open] .med-faq-summary { background: rgba(15,118,110,0.04); border-bottom: 1px solid rgba(15,118,110,0.06); }
        .med-faq-question { flex: 1; }
        .med-faq-icon { flex-shrink: 0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; color: #0f766e; transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .med-faq-details[open] .med-faq-icon { transform: rotate(45deg); }
        .med-faq-icon svg { width: 20px; height: 20px; stroke-width: 2; transition: stroke-width 0.2s ease; }
        .med-faq-summary:hover .med-faq-icon svg { stroke-width: 2.5; }
        .med-faq-answer { padding: 0 1.5rem 1.5rem; animation: med-faq-slide 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes med-faq-slide {
          0% { opacity: 0; transform: translateY(-12px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .med-faq-answer .med-body { margin: 0; font-size: 0.92rem; color: #4b5259; }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Winter Retreat in the Himalayas' },
            ]}
          />
        </div>
      </div>

      <article>

        {/* ── HERO ── */}
        <section className="med-shell med-hero-section">
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              className="med-hero-bg"
              src={heroImage.src}
              alt={heroImage.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div className="med-hero-overlay" />
          </div>
          <div className="med-hero-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Snow, Silence, Recalibration</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Winter strips the Himalayas to essentials. The tourists leave. The forests go quiet. Snow seals the valleys into stillness, and the cold becomes a collaborator — sharpening attention, encouraging inwardness, making the warmth of a fire feel like a gift.
            </p>
            <div className="med-hero-tags">
              <span>Dec – Feb</span>
              <span>Chakrata · Rishikesh · Mussoorie</span>
              <span>Fewer Crowds</span>
              <span>Deep Rest</span>
            </div>
            <div className="med-hero-actions">
              <Link href="#plan" className="med-cta-btn">Plan a Winter Retreat</Link>
              <a href="#locations" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Explore Locations</a>
            </div>
          </div>
        </section>

        {/* ── WHY WINTER ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Season</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>Why <span>Winter</span> for a Retreat</h2>
            <p className="med-body" style={{ textAlign: 'center', maxWidth: '38rem', margin: '0 auto 2rem' }}>
              For retreat work, winter is the most potent season. Fewer distractions. Clearer air. Longer nights for rest. And something in the cold itself that says: go inward.
            </p>

            <div className="med-winter-why-grid">
              {WHY_WINTER.map((item) => (
                <div key={item.title} className="med-card med-winter-why-card">
                  <h3 className="med-h3">{item.title}</h3>
                  <p className="med-body">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PrimaryCTA
          
          label="Plan a Winter Retreat"
          subtext="Tell us your dates and what you're seeking. We'll recommend the right winter location."
          vertical="retreat"
          category="winter-retreat"
          sourcePath={PATH}
        />

        {/* ── LOCATIONS ── */}
        <section id="locations" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Winter Locations</span>
              <span className="med-eyebrow-line" />
            </div>
            <h2 className="med-h2" style={{ textAlign: 'center' }}>Where the Cold <span>Deepens the Silence</span></h2>
            <p className="med-body" style={{ textAlign: 'center', maxWidth: '38rem', margin: '0 auto 2rem' }}>
              Three settings that stay accessible through the coldest months, each holding winter differently.
            </p>

            <div className="med-winter-loc-grid">
              {LOCATIONS.map((loc) => (
                <Link key={loc.id} href={`/locations/${loc.id}`} className="med-winter-loc-card">
                  <div className="med-img-wrap">
                    <img src={loc.image} alt={loc.name} className="med-img" />
                  </div>
                  <div className="med-overlay" />
                  <div className="med-content">
                    <span className="med-tag">{loc.tagline}</span>
                    <h3 className="med-h3">{loc.name}</h3>
                    <p className="med-body">{loc.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── RETREAT OPTIONS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Choose Your Programme</span>
            </div>
            <h2 className="med-h2">Winter Retreat <span>Options</span></h2>
            <p className="med-body" style={{ marginBottom: '1.5rem' }}>
              The same practices, held in a season that makes them easier to sink into.
            </p>

            <div className="med-winter-options-grid">
              <Link href="/meditation-retreat-chakrata" className="med-card med-winter-option-card">
                <h3 className="med-h3">Meditation Retreat — Chakrata</h3>
                <p className="med-body">Forest silence intensified by cold and light snowfall.</p>
                <span className="med-link">Explore →</span>
              </Link>
              <Link href="/silent-retreat-chakrata" className="med-card med-winter-option-card">
                <h3 className="med-h3">Silent Retreat — Chakrata</h3>
                <p className="med-body">Winter is the natural season for extended noble silence.</p>
                <span className="med-link">Explore →</span>
              </Link>
              <Link href="/yoga-retreat-rishikesh" className="med-card med-winter-option-card">
                <h3 className="med-h3">Yoga Retreat — Rishikesh</h3>
                <p className="med-body">Warm enough for asana, quiet enough for depth.</p>
                <span className="med-link">Explore →</span>
              </Link>
              <Link href="/healing-retreat-rishikesh" className="med-card med-winter-option-card">
                <h3 className="med-h3">Healing Retreat — Rishikesh</h3>
                <p className="med-body">A gentle winter climate suited to recovery and rest.</p>
                <span className="med-link">Explore →</span>
              </Link>
              <Link href="/3-day-meditation-retreat" className="med-card med-winter-option-card" style={{ gridColumn: '1 / -1' }}>
                <h3 className="med-h3">3-Day Meditation Retreat</h3>
                <p className="med-body">A focused winter weekend — the shortest way to feel what stillness in the cold can do.</p>
                <span className="med-link">Explore →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── PACKING / PRACTICAL ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Getting Ready</span>
            </div>
            <h2 className="med-h2">What to <span>Bring</span></h2>
            <ul className="med-list">
              {[
                'Thermal base layer, fleece mid-layer, and a warm outer jacket',
                'Warm socks, a beanie, and gloves for morning walks',
                'A shawl or blanket for meditation sessions',
                'Hot water bottles are provided at every location',
                'The goal is warmth without bulk — comfort for sitting still, for a long time',
              ].map((item) => (
                <li key={item} className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <RelatedReads
          links={[
            { label: 'Summer Retreats', href: '/summer-retreat-himalayas' },
            { label: 'Spring Retreats', href: '/spring-retreat-himalayas' },
            { label: 'Autumn Retreats', href: '/autumn-retreat-himalayas' },
          ]}
        />

        {/* ── FAQ ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Common Questions</span>
            </div>
            <h2 className="med-h2">Frequently asked <span>questions</span></h2>

            <div className="med-faq-accordion">
              {FAQ_ITEMS.map((faq, i) => (
                <details key={i} className="med-faq-details">
                  <summary className="med-faq-summary">
                    <span className="med-faq-question">{faq.question}</span>
                    <span className="med-faq-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </summary>
                  <div className="med-faq-answer">
                    <p className="med-body">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-alt" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/summer-retreat-himalayas" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Summer Retreats</span>
              </Link>
              <Link href="/spring-retreat-himalayas" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Spring Retreats</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/autumn-retreat-himalayas" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Autumn Retreats</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/find-your-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Find Your Retreat</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
            </div>
          </div>
        </nav>

      </article>
    </TrackedPage>
  );
}
