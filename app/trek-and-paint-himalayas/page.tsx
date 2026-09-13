import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema, generateBlogPostingSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const PATH = '/trek-and-paint-himalayas';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Trek and Paint in the Himalayas | Retreats And Treks',
    description:
      'Trek and paint in the Himalayas with morning walks, afternoon art, plein air painting, nature sketching, and creative practice on mountain trails.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Trek and Paint in the Himalayas',
      description: 'Walk through mountain landscapes by morning, create art from what you saw by afternoon.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Trek and Paint in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How do you carry art supplies on a trek?',
    answer:
      'We keep it simple. A pocket watercolour set, a hardback sketchbook, a few pencils, and a water brush fit in a hip bag or jacket pocket. Porters carry heavier supplies to camp. At each campsite, we set up a shared outdoor studio with additional materials. The constraint of a limited travel kit is actually beneficial — it forces simplicity and directness in the work.',
  },
  {
    question: 'Do I need to be fit for this?',
    answer:
      'Moderate fitness is sufficient. The treks are selected for steady gradients and scenic camping spots rather than technical difficulty. Daily walking is 4–6 hours at a comfortable pace with frequent stops for sketching and observation. If you can walk for 5 hours with a daypack, you are ready. We carry the art supplies.',
  },
  {
    question: 'Is this a trekking trip or an art retreat?',
    answer:
      'Both. Mornings are spent walking through Himalayan landscape. Afternoons at camp are dedicated creation time — painting, sketching, or working with natural materials gathered on the trail. The walking and the art feed each other. What you see on the trail becomes the subject of the afternoon work. The exhaustion from trekking quiets the inner critic.',
  },
  {
    question: 'What if I cannot draw?',
    answer:
      'The trail does not care whether you can draw. Nature sketching, land art, and texture rubbings require no drawing skill. Watercolour washes of mountain light are about colour and water, not line work. The facilitator meets you where you are. Some of the most striking work on these trips comes from people who have never held a paintbrush.',
  },
  {
    question: 'What mediums can I use on the trail?',
    answer:
      'Watercolour, ink, pencil, and charcoal travel well. At camp, we add clay (where available), collage materials, and natural found materials. Land art — arrangements of stone, leaf, branch, and water — requires no carried supplies at all. The mountain provides the materials.',
  },
];

export default function TrekAndPaintPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Trek and Paint in the Himalayas', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = generateBlogPostingSchema({
    title: 'Trek and Paint in the Himalayas — Art on the Trail',
    description:
      'Trek and paint in the Himalayas with morning walks, afternoon art, plein air painting, nature sketching, and creative practice on mountain trails.',
    publishedAt: '2026-01-01',
    lastUpdated: '2026-05-09',
    url: canonicalUrl,
  });

  // Split heading for green last word
  const h1Words = "Trek and Paint in the Himalayas".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Trek and Paint in the Himalayas — Art on the Trail"
        description="Trek and paint in the Himalayas with morning walks, afternoon art, plein air painting, nature sketching, and creative practice on mountain trails."
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
          min-height: 70vh;
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
        .med-paint-card { padding: 1.25rem; border-left: 4px solid #0f766e; }
        .med-paint-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-paint-card .med-h3 a { color: #0f766e; font-weight: 600; text-decoration: none; }
        .med-paint-card .med-h3 a:hover { color: #0d6b64; }
        .med-paint-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-paint-list { padding-left: 1.25rem; line-height: 2.2; margin-bottom: 1rem; list-style: none; }
        .med-paint-list li { position: relative; padding-left: 1.5rem; }
        .med-paint-list li::before { content: '✦'; position: absolute; left: 0; color: #0f766e; font-size: 0.8rem; }
        .med-paint-list li strong { color: #2B2A26; font-weight: 600; }
        .med-paint-list li a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-paint-list li a:hover { color: #0d6b64; text-decoration: underline; }

        .med-paint-table-wrap { overflow-x: auto; border-radius: 18px; border: 1px solid rgba(15,118,110,0.12); margin-top: 1.5rem; }
        .med-paint-table { width: 100%; border-collapse: collapse; font-family: var(--font-inter), sans-serif; font-size: 0.88rem; }
        .med-paint-table td { padding: 0.6rem 1rem; border-bottom: 1px solid rgba(15,118,110,0.06); color: #4b5259; }
        .med-paint-table tr:last-child td { border-bottom: none; }
        .med-paint-table tr:hover td { background: #f7f9f7; }
        .med-paint-table .med-time { font-weight: 600; color: #2B2A26; white-space: nowrap; }

        .med-paint-locations { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; }
        @media (max-width: 720px) { .med-paint-locations { grid-template-columns: 1fr; } }
        .med-paint-location { padding: 1rem 1.25rem; background: #f7f9f7; border-radius: 12px; border: 1px solid rgba(15,118,110,0.06); transition: all 0.3s; }
        .med-paint-location:hover { background: #fff; border-color: rgba(15,118,110,0.2); transform: translateY(-2px); }
        .med-paint-location .med-h3 { font-size: 1rem; margin-bottom: 0.2rem; }
        .med-paint-location .med-h3 a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-paint-location .med-h3 a:hover { text-decoration: underline; }
        .med-paint-location .med-body { font-size: 0.85rem; margin-bottom: 0; color: #6b7280; }

        .med-paint-mode { padding: 1rem 1.25rem; background: #fff; border-radius: 12px; border: 1px solid rgba(15,118,110,0.06); margin-bottom: 0.75rem; }
        .med-paint-mode:last-child { margin-bottom: 0; }
        .med-paint-mode .med-h3 { font-size: 1rem; margin-bottom: 0.2rem; }
        .med-paint-mode .med-body { font-size: 0.88rem; margin-bottom: 0; color: #6b7280; }

        .med-paint-box {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 12px;
          padding: 1.5rem;
        }
        .med-paint-box .med-body { color: #166534; margin: 0; }
        .med-paint-box .med-body a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-paint-box .med-body a:hover { text-decoration: underline; }

        .med-paint-footer { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; justify-content: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(15,118,110,0.08); }
        .med-paint-footer a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
        .med-paint-footer a:hover { color: #0d6b64; text-decoration: underline; }

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Trek & Paint' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Art on the Trail</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Walk through a landscape in the morning. Paint it in the afternoon. This is the oldest relationship between art and place — moving through terrain with attention, then translating what you saw into colour, line, and form. The Himalayas provide subject matter that humbles and inspires in equal measure: mountain light that changes hourly, forest textures that reward close observation, valleys that demand you work larger than you normally would. This is not a trek with a painting workshop added. It is a single practice where walking and creating are inseparable.
            </p>
            <div className="med-hero-tags">
              <span>Morning Walks</span>
              <span>Afternoon Art</span>
              <span>Plein Air</span>
              <span>Creative Practice</span>
            </div>
            <div className="med-hero-actions">
              <Link href="/retreats/journeys/trek-and-paint" className="med-cta-btn">Explore the Trek &amp; Paint Retreat</Link>
              <a href="#who" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Who This Is For</a>
            </div>
          </div>
        </section>

        {/* ── WHO THIS IS FOR ── */}
        <section id="who" className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Who This Is For</span>
            </div>
            <h2 className="med-h2">Who <span>This Is For</span></h2>

            <ul className="med-paint-list">
              <li>Artists who want to paint landscapes from inside the landscape, not from photographs</li>
              <li>Trekkers who want a creative dimension to their mountain experience</li>
              <li>People who sketch on holidays and want a trip designed around that impulse</li>
              <li>Beginners who are curious about art but need the motivation of extraordinary scenery</li>
              <li>Anyone who feels the pull to create when surrounded by natural beauty</li>
            </ul>
          </div>
        </section>

        <PrimaryCTA
          
          label="Explore Trek + Paint"
          subtext="Tell us about your trekking level and creative interests. We'll match you with the right route and facilitator."
          vertical="retreat"
          category="trek-paint"
          sourcePath={PATH}
        />

        {/* ── TYPICAL DAY ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Daily Rhythm</span>
            </div>
            <h2 className="med-h2">A <span>Typical Day</span></h2>

            <div className="med-paint-table-wrap">
              <table className="med-paint-table">
                <tbody>
                  {[
                    '6:00 AM — Wake. Tea with a view.',
                    '6:30 AM — Morning stretch or yoga (15 min)',
                    '7:00 AM — Breakfast at camp',
                    '7:45 AM — Trail departs. Sketchbook in pocket.',
                    '9:30 AM — First observation stop. Quick sketches.',
                    '10:00 AM — Continue walking. Notice colour, light, texture.',
                    '12:00 PM — Arrive at next camp. Lunch.',
                    '1:30 PM — Rest or explore nearby.',
                    '2:30 PM — Outdoor studio time. Paint, draw, sculpt with found materials.',
                    '5:00 PM — Tea. Optional sharing of the day\'s work.',
                    '6:00 PM — Dinner.',
                    '7:30 PM — Journalling, star observation, or early sleep.',
                  ].map((row) => {
                    const [time, ...rest] = row.split(' — ');
                    return (
                      <tr key={row}>
                        <td className="med-time">{time}</td>
                        <td>{rest.join(' — ')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── THE ART ON THE TRAIL ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Creative Practice</span>
            </div>
            <h2 className="med-h2">The <span>Art on the Trail</span></h2>
            <p className="med-body">Mountain art divides naturally into three modes, and a trek touches all of them:</p>

            <div className="med-paint-mode">
              <h3 className="med-h3">Quick Capture</h3>
              <p className="med-body">60-second sketches at trail stops. The view will not wait. Speed kills the inner critic.</p>
            </div>
            <div className="med-paint-mode">
              <h3 className="med-h3">Sustained Work</h3>
              <p className="med-body">Afternoon studio time at camp. Translate the morning&apos;s observations into painting, drawing, or mixed media. The facilitator is available.</p>
            </div>
            <div className="med-paint-mode">
              <h3 className="med-h3">Land Art</h3>
              <p className="med-body">Creation from found materials. Stone arrangements, leaf compositions, water patterns. These works exist for an hour and are photographed. The impermanence is the point.</p>
            </div>
          </div>
        </section>

        {/* ── LOCATIONS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Where</span>
            </div>
            <h2 className="med-h2">Where to <span>Trek and Paint</span></h2>

            <div className="med-paint-locations">
              <div className="med-paint-location">
                <h3 className="med-h3"><Link href="/art-retreat-chakrata">Chakrata</Link></h3>
                <p className="med-body">Forest trails through deodar canopy. Intimate scale, rich texture, filtered light.</p>
              </div>
              <div className="med-paint-location">
                <h3 className="med-h3"><Link href="/art-retreat-sankri">Sankri</Link></h3>
                <p className="med-body">Classic Himalayan valley treks. Open meadows, snow-capped peaks.</p>
              </div>
              <div className="med-paint-location">
                <h3 className="med-h3"><Link href="/art-retreat-mussoorie">Mussoorie</Link></h3>
                <p className="med-body">Ridge-top walks with panoramic valley views. Colonial architecture.</p>
              </div>
              <div className="med-paint-location">
                <h3 className="med-h3"><Link href="/art-retreat-rishikesh">Rishikesh</Link></h3>
                <p className="med-body">Riverside walks and temple trails. Cultural density, river light.</p>
              </div>
              <div className="med-paint-location" style={{ gridColumn: '1 / -1' }}>
                <h3 className="med-h3"><Link href="/art-retreat-zanskar">Zanskar</Link></h3>
                <p className="med-body">Trans-Himalayan trails between monasteries. Stark mineral palette, extreme light, lunar landscape.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY TREKKING IMPROVES ART ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Perspective</span>
            </div>
            <h2 className="med-h2">Why Trekking <span>Improves the Art</span></h2>
            <p className="med-body">
              Physical exhaustion from walking is the best inner-critic suppressor available. After five hours on a mountain trail, the part of your brain that judges your work is too tired to interfere. What remains is directness — the impulse to capture what you saw before the light changes or the memory fades.
            </p>
            <p className="med-body">
              Artists who paint from photographs work with frozen moments. Artists who paint after walking through a landscape work with embodied memory — the temperature, the sound, the physical effort, the smell of pine or river stone. This embodied quality enters the work. The paintings are not more technically accomplished, but they are more alive.
            </p>
          </div>
        </section>

        {/* ── CALLOUT ── */}
        <section className="med-shell med-section-alt med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-paint-box">
              <p className="med-body">
                If you want a deeper creative experience, explore the <Link href="/creative-retreat">Creative Healing Retreat</Link>.
              </p>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Walk and Create With Us"
          subtext="Tell us your trekking experience and creative interests. We design the route and the art programme together."
          vertical="retreat"
          category="trek-paint"
          sourcePath={PATH}
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
        <nav className="med-shell med-section-white" style={{ 
          padding: '2.5rem 0 3.5rem', 
          borderTop: '1px solid rgba(15,118,110,0.08)',
          marginBottom: 0
        }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/retreats/journeys/trek-and-paint" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Trek & Paint</span>
              </Link>
              <Link href="/retreats/journeys/art-and-creative" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Art & Creative</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/creative-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Creative Retreat</span>
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
