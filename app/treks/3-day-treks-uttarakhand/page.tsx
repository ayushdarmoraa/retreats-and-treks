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
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const PATH = '/treks/3-day-treks-uttarakhand';

export function generateMetadata(): Metadata {
  return {
    title: 'Best 3-Day Treks in Uttarakhand | Retreats And Treks',
    description:
      'Find the best 3-day treks in Uttarakhand, including Tiger Fall, Budher Caves, and short Himalayan routes within driving distance of Delhi.',
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
      images: buildOgImages('Best 3-Day Treks in Uttarakhand'),
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

  // Split heading for green last word
  const h1Words = "Best 3-Day Treks in Uttarakhand".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Best 3-Day Treks in Uttarakhand"
        description="Short Himalayan treks in Uttarakhand — 2 nights, 3 days. Forest trails, waterfall treks and cave explorations across Chakrata and Sankri, drivable from Delhi."
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
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } }
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

        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; padding-bottom: 0.5rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-hero-section {
          position: relative;
          overflow: hidden;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(15,118,110,0.12);
        }
        .med-hero-section .med-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(4,12,10,0.88) 0%, rgba(4,12,10,0.5) 50%, rgba(4,12,10,0.82) 100%);
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
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 1.1rem;
          line-height: 1.05;
          text-shadow: 0 3px 24px rgba(0,0,0,0.5);
        }
        .med-hero-section .med-hero-content .med-h1 span {
          color: #5eead4;
        }
        .med-hero-section .med-hero-content .med-body {
          max-width: 46rem;
          margin: 0 auto 1.5rem;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.88);
          text-shadow: 0 2px 20px rgba(0,0,0,0.6);
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
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          padding: 0.35rem 0.9rem;
          background: rgba(15,118,110,0.2);
          backdrop-filter: blur(8px);
        }
        .med-hero-section .med-hero-content .med-hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .med-hero-section .med-hero-content .med-hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          max-width: 48rem;
          margin: 0 auto 1.5rem;
        }
        @media (max-width: 720px) {
          .med-hero-section .med-hero-content .med-hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .med-hero-section .med-hero-content .med-hero-stat {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          padding: 0.6rem 0.75rem;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          text-align: center;
        }
        .med-hero-section .med-hero-content .med-hero-stat .med-label {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          display: block;
        }
        .med-hero-section .med-hero-content .med-hero-stat .med-value {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: #ffffff;
        }

        .med-section-padding { padding: 4rem 0; }
        .med-section-padding-sm { padding: 3rem 0; }

        /* ── Page specific styles ── */
        .med-trek-card { padding: 1.5rem; border-top: 3px solid #0f766e; transition: all 0.35s ease; }
        .med-trek-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(15,118,110,0.08); }
        .med-trek-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-trek-card .med-h3 a { color: #0f766e; font-weight: 600; text-decoration: none; transition: color 0.3s; }
        .med-trek-card .med-h3 a:hover { color: #0d6b64; text-decoration: underline; }
        .med-trek-card .med-body { font-size: 0.92rem; margin-bottom: 0.5rem; }
        .med-trek-card .med-body:last-child { margin-bottom: 0; }
        .med-trek-card .med-trek-tag {
          display: inline-block;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #0f766e;
          background: rgba(15,118,110,0.08);
          padding: 0.2rem 0.7rem;
          border-radius: 999px;
          margin-bottom: 0.5rem;
        }

        .med-trek-why { border-left: 3px solid #0f766e; padding-left: 1.25rem; margin-bottom: 1.25rem; transition: border-color 0.3s; }
        .med-trek-why:last-child { margin-bottom: 0; }
        .med-trek-why:hover { border-color: #0d6b64; }
        .med-trek-why .med-h3 { font-size: 0.85rem; font-weight: 600; color: #2B2A26; margin-bottom: 0.2rem; }
        .med-trek-why .med-body { font-size: 0.88rem; margin-bottom: 0; }

        .med-trek-season { padding: 1rem 1.25rem; background: #fff; border: 1px solid rgba(15,118,110,0.06); border-radius: 12px; margin-bottom: 0.75rem; transition: all 0.3s ease; }
        .med-trek-season:last-child { margin-bottom: 0; }
        .med-trek-season:hover { border-color: rgba(15,118,110,0.2); transform: translateX(6px); }
        .med-trek-season .med-label { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; font-weight: 600; color: #0f766e; letter-spacing: 0.05em; display: block; margin-bottom: 0.2rem; }
        .med-trek-season .med-body { font-size: 0.88rem; margin-bottom: 0; }

        .med-trek-who { display: flex; gap: 0.75rem; padding: 0.9rem 1rem; border-bottom: 1px solid rgba(15,118,110,0.06); transition: background 0.2s; }
        .med-trek-who:last-child { border-bottom: none; }
        .med-trek-who:hover { background: #f7f9f7; }
        .med-trek-who .med-dot { width: 8px; height: 8px; border-radius: 50%; background: #0f766e; flex-shrink: 0; margin-top: 0.65rem; }
        .med-trek-who .med-body { font-size: 0.88rem; margin: 0; }
        .med-trek-who .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-trek-who .med-body a:hover { text-decoration: underline; }

        .med-trek-callout { padding: 1.25rem 1.5rem; background: #fff; border: 1px solid rgba(15,118,110,0.08); border-left: 4px solid #0f766e; border-radius: 12px; transition: all 0.3s; }
        .med-trek-callout:hover { border-color: rgba(15,118,110,0.2); box-shadow: 0 4px 16px rgba(15,118,110,0.04); }
        .med-trek-callout .med-body { margin: 0; }
        .med-trek-callout .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-trek-callout .med-body a:hover { text-decoration: underline; }

        .med-trek-footer { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; justify-content: center; padding: 2rem 0 4rem; border-top: 1px solid rgba(15,118,110,0.08); margin-top: 2rem; }
        .med-trek-footer a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; transition: color 0.3s; }
        .med-trek-footer a:hover { color: #0d6b64; text-decoration: underline; }

        /* ── FAQ Accordion ── */
        .med-faq-accordion {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
        .med-faq-details {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.1);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .med-faq-details:hover { border-color: rgba(15,118,110,0.25); box-shadow: 0 4px 16px rgba(15,118,110,0.04); }
        .med-faq-details[open] { border-color: rgba(15,118,110,0.3); }
        .med-faq-summary {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.25rem 1.5rem; cursor: pointer; list-style: none;
          font-family: var(--font-inter), sans-serif; font-size: 0.95rem; font-weight: 500;
          color: #2B2A26; transition: background 0.2s ease; user-select: none; gap: 1rem;
        }
        .med-faq-summary::-webkit-details-marker { display: none; }
        .med-faq-summary:hover { background: rgba(15,118,110,0.02); }
        .med-faq-details[open] .med-faq-summary { background: rgba(15,118,110,0.03); border-bottom: 1px solid rgba(15,118,110,0.06); }
        .med-faq-question { flex: 1; }
        .med-faq-icon {
          flex-shrink: 0; width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          color: #0f766e; transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .med-faq-details[open] .med-faq-icon { transform: rotate(45deg); }
        .med-faq-icon svg { width: 20px; height: 20px; stroke-width: 2; transition: stroke-width 0.2s ease; }
        .med-faq-summary:hover .med-faq-icon svg { stroke-width: 2.5; }
        .med-faq-answer {
          padding: 0 1.5rem 1.5rem;
          animation: med-faq-slide 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes med-faq-slide {
          0% { opacity: 0; transform: translateY(-12px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .med-faq-answer .med-body { margin: 0; font-size: 0.92rem; color: #4b5259; }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Treks', href: '/treks' },
              { name: '3-Day Treks in Uttarakhand' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>
                Short Treks · Uttarakhand · 2N / 3D
              </span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Two nights, three days. That is all you need for a genuine Himalayan trekking experience — forest trails, ridge views, waterfall destinations, cave explorations, and even a summit attempt if your fitness allows. The 3-day format is the most practical trek duration for anyone working a standard week: depart Friday, trek Saturday and Sunday, return by Monday morning.
            </p>

            <div className="med-hero-stats">
              {[
                { label: 'Distance', value: '12–18 km' },
                { label: 'Duration', value: '2N / 3D' },
                { label: 'Difficulty', value: 'Easy to Moderate' },
                { label: 'Best Season', value: 'Oct–Nov, Feb–Jun' },
              ].map((stat) => (
                <div key={stat.label} className="med-hero-stat">
                  <span className="med-label">{stat.label}</span>
                  <span className="med-value">{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="med-hero-tags">
              <span>2 Nights / 3 Days</span>
              <span>Delhi to Chakrata: 6–7 hrs</span>
              <span>1,800–3,800m</span>
              <span>Beginner Friendly</span>
            </div>
            <div className="med-hero-actions">
              <a href="#treks" className="med-cta-btn">View Treks</a>
              <a href="#who" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Who It's For</a>
            </div>
          </div>
        </section>

        {/* ── WHAT MAKES A 3-DAY TREK ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Format</span>
            </div>
            <h2 className="med-h2">What Makes a Trek Suitable <span>for 3 Days?</span></h2>
            <p className="med-body">Not every Himalayan trek compresses into three days. The format works when five factors align.</p>

            <div className="med-trek-why">
              <h3 className="med-h3">Travel time under 9 hours from Delhi.</h3>
              <p className="med-body">The drive to the trailhead consumes one direction of a day. If the base is more than nine hours away, you lose too much trekking time to travel. Chakrata (6–7 hours) and Sankri (8–9 hours) both fit within the window.</p>
            </div>
            <div className="med-trek-why">
              <h3 className="med-h3">Trail distance under 20 km total.</h3>
              <p className="med-body">Three days of trekking at a comfortable pace covers 12 to 18 km total — four to six km per trekking day. This is enough for forest walks, waterfall approaches, and ridge traverses without forced marches.</p>
            </div>
            <div className="med-trek-why">
              <h3 className="med-h3">Altitude below 3,000 metres (standard) or 3,800 metres (compressed).</h3>
              <p className="med-body">Chakrata treks stay between 1,800 and 2,500 metres — no acclimatisation needed. A compressed Kedarkantha pushes to 3,800 metres in three days, which demands faster acclimatisation and prior experience.</p>
            </div>
            <div className="med-trek-why">
              <h3 className="med-h3">Clear destination — summit, waterfall, or cave.</h3>
              <p className="med-body">A 3-day trek needs a defined objective. Tiger Fall delivers a waterfall. Budher Caves delivers underground exploration. Kedarkantha delivers a summit. The destination gives the short format shape and purpose.</p>
            </div>
            <div className="med-trek-why" style={{ marginBottom: 0 }}>
              <h3 className="med-h3">Established base-camp logistics.</h3>
              <p className="med-body">Short treks work when accommodation, meals, and transport are professionally managed. Homestays in Chakrata, guided camps in Sankri, and organised transport from Delhi remove the planning burden that makes independent trekking impractical in three days.</p>
            </div>
          </div>
        </section>

        {/* ── BEST TREKS ── */}
        <section id="treks" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Treks</span>
            </div>
            <h2 className="med-h2">Best 3-Day Treks <span>in Uttarakhand</span></h2>

            <div className="med-card med-trek-card">
              <span className="med-trek-tag">Recommended</span>
              <h3 className="med-h3"><Link href="/treks/location/chakrata/tiger-fall-trek">Tiger Fall Trek (Chakrata)</Link></h3>
              <p className="med-body">
                The Tiger Fall Trek in Chakrata is the strongest 3-day trek option in Uttarakhand. Twelve kilometres through dense deodar and oak forest to one of the region's highest direct waterfalls — and back. The trail stays between 1,800 and 2,200 metres, requires no prior trekking experience, and is shaded by forest canopy throughout.
              </p>
              <p className="med-body">
                The 3-day format gives this trek room to breathe. Day one: travel from Delhi to <Link href="/treks/location/chakrata">Chakrata trek base</Link>, settle into a homestay, evening orientation. Day two: full trekking day — forest walk to Tiger Fall, time at the waterfall, return to camp or homestay. Day three: morning nature walk or village exploration, drive back to Delhi. No rushing. No forced marches. The mountain experience has space to land.
              </p>
            </div>

            <div className="med-card med-trek-card">
              <span className="med-trek-tag">Challenge</span>
              <h3 className="med-h3"><Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha Trek (Short Itinerary Version)</Link></h3>
              <p className="med-body">
                The standard Kedarkantha snow trek is a four-day itinerary with gradual acclimatisation. A compressed three-day version is possible for fit trekkers — combining the first two days into a single long push from <Link href="/treks/location/sankri">Sankri treks</Link> to the high camp, followed by summit day and descent.
              </p>
              <p className="med-body">
                This is not the recommended format for first-timers. The altitude gain is faster, the daily distances are longer, and acclimatisation time is reduced. But for trekkers who have completed at least one Himalayan trek previously and have strong cardio fitness, the three-day Kedarkantha delivers a snow summit at 3,800 metres within a long-weekend window. The reward-to-time ratio is extraordinary — you stand on a Himalayan peak within 48 hours of leaving Delhi.
              </p>
            </div>

            <div className="med-card med-trek-card" style={{ marginBottom: 0 }}>
              <span className="med-trek-tag">Adventure</span>
              <h3 className="med-h3"><Link href="/treks/location/chakrata/budher-caves-trek">Budher Caves Trek (Chakrata Region)</Link></h3>
              <p className="med-body">
                The Budher Caves Trek combines forest trekking with underground exploration — a distinctive experience no other short trek in Uttarakhand offers. Ten kilometres through oak forest to ancient limestone caves, with guided exploration inside. The 3-day format follows the same structure as Tiger Fall: travel day, trek day, return day. Moderate difficulty, no prior caving experience required, and the combination of forest canopy above ground and cave systems below creates a varied experience that holds attention across all three days.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHO SHOULD CHOOSE ── */}
        <section id="who" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Who It's For</span>
            </div>
            <h2 className="med-h2">Who Should Choose <span>a 3-Day Trek?</span></h2>

            <div style={{ border: '1px solid rgba(15,118,110,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
              <div className="med-trek-who">
                <span className="med-dot" />
                <p className="med-body"><strong>First-time trekkers.</strong> Three days is long enough to test whether Himalayan trekking is for you, short enough that the commitment is low. Tiger Fall or Budher Caves in Chakrata are ideal — accessible trails, no altitude concerns, and a clear destination. If you enjoy it, the natural next step is a <Link href="/treks/best-treks-in-uttarakhand/beginner">beginner treks in Uttarakhand</Link> like the full four-day Kedarkantha.</p>
              </div>
              <div className="med-trek-who">
                <span className="med-dot" />
                <p className="med-body"><strong>Corporate groups.</strong> The 3-day format is the most practical team-building trek. Friday departure, Saturday trekking, Sunday return — minimal leave required. Chakrata's proximity to Delhi and professional homestay infrastructure make logistics straightforward for groups of 10 to 20.</p>
              </div>
              <div className="med-trek-who">
                <span className="med-dot" />
                <p className="med-body"><strong>Students.</strong> Budget-friendly, time-efficient, and delivers a genuine mountain experience. A group of friends can organise a 3-day Chakrata trek for a fraction of a longer expedition's cost.</p>
              </div>
              <div className="med-trek-who">
                <span className="med-dot" />
                <p className="med-body"><strong>Couples.</strong> A weekend in the mountains — forest trails, campfire evenings, waterfall visits — without the multi-day commitment of a longer trek. The 3-day format is romantic and practical in equal measure.</p>
              </div>
              <div className="med-trek-who" style={{ borderBottom: 'none' }}>
                <span className="med-dot" />
                <p className="med-body"><strong>Delhi and NCR residents.</strong> If you live within driving distance, 3-day treks become repeatable — once every few months, a different trail, a different season. See our <Link href="/treks/trek-near-delhi">weekend treks near Delhi</Link> guide for the full range of options within reach.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BEST SEASON ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Best Season</span>
            </div>
            <h2 className="med-h2">Best Season <span>for 3-Day Treks</span></h2>

            <div className="med-trek-season">
              <span className="med-label">October – November</span>
              <p className="med-body">The universal best window. Post-monsoon air is clear, trails are dry, temperatures are comfortable, and Himalayan visibility is at its peak. Both Chakrata and Sankri trails are in prime condition. This is the recommendation for anyone booking their first 3-day trek.</p>
            </div>
            <div className="med-trek-season">
              <span className="med-label">February – April</span>
              <p className="med-body">Spring brings warming temperatures, wildflowers at lower elevations, and well-defined trails. Chakrata treks are excellent in this window. The compressed Kedarkantha still carries snow in February and early March — ideal for those seeking the <Link href="/treks/best-treks-in-uttarakhand/snow">winter treks in Uttarakhand</Link> experience in a short format.</p>
            </div>
            <div className="med-trek-season">
              <span className="med-label">May – June</span>
              <p className="med-body">The <Link href="/treks/summer-treks-uttarakhand">summer treks in Uttarakhand</Link> window. Chakrata forest trails are shaded and cool while Delhi bakes. Tiger Fall builds volume through May. The green canopy and flowing streams make summer the most visually lush season for forest-based 3-day treks.</p>
            </div>
            <div className="med-trek-season" style={{ marginBottom: 0 }}>
              <span className="med-label">December – January</span>
              <p className="med-body">Winter adds a dimension to Chakrata — crisp air, occasional frost, and quiet trails. The compressed Kedarkantha is at its snow-covered best. Cold temperatures require proper layering but the reward is a winter mountain experience within a weekend.</p>
            </div>
          </div>
        </section>

        {/* ── COMMERCIAL NAV ── */}
        <section className="med-shell med-section-white med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-trek-callout">
              <p className="med-body">
                Exploring longer itineraries and all difficulty levels? See the full <Link href="/treks">Himalayan treks directory</Link> for guided routes across Uttarakhand.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">FAQ</span>
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

        {/* ── FOOTER ── */}
        <div className="med-trek-footer">
          <Link href="/treks">← All Treks</Link>
          <Link href="/treks/best-treks-in-uttarakhand/beginner">Beginner Treks</Link>
          <Link href="/treks/trek-near-delhi">Weekend Treks Near Delhi</Link>
        </div>

      </article>
    </TrackedPage>
  );
}