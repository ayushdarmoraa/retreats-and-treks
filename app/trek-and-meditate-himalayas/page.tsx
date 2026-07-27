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

const PATH = '/trek-and-meditate-himalayas';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Trek and Meditate in the Himalayas | Retreats And Treks',
    description:
      'Trek and meditate in the Himalayas with walking practice, sitting meditation, silent trails, and guided journeys across Chakrata, Sankri, and Zanskar.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Trek and Meditate in the Himalayas',
      description: 'Walking and sitting as equal partners. Himalayan trails as meditation halls.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Trek and Meditate in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How does meditation integrate with trekking?',
    answer:
      'Walking meditation on the trail is the primary integration. Rather than trekking with headphones or constant conversation, we walk in silence with attention on breath, footstep, and sensory experience. Evening sitting meditation follows the day\'s walk. The physical tiredness from trekking settles the mind far more effectively than willpower alone. By day three, the line between "trekking" and "meditating" dissolves.',
  },
  {
    question: 'Is this suitable for non-meditators who love trekking?',
    answer:
      'Yes — this format is specifically designed for people who are drawn to meditation but find sitting practice difficult. Walking is the primary medium. If you can walk in the mountains, you can meditate in the mountains. No prior meditation experience is needed. The terrain does most of the teaching.',
  },
  {
    question: 'How is this different from a normal Himalayan trek?',
    answer:
      'Three differences: silence (portions of the day are walked without conversation), intentionality (attention is deliberately placed on the body and senses rather than left to wander), and evening practice (30–60 minutes of sitting meditation integrates the day). The result is a trek that leaves you not just physically refreshed but genuinely stiller inside.',
  },
  {
    question: 'What skill level is needed?',
    answer:
      'Moderate fitness for most routes. We select trails that support meditative walking — meaning steady gradients rather than technical scrambles, forests rather than exposed ridges, and pacing that allows attention rather than gasping. If you can walk 5–6 hours at a comfortable pace, you are ready.',
  },
];

export default function TrekAndMeditatePage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Trek and Meditate in the Himalayas', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = generateBlogPostingSchema({
    title: 'Trek and Meditate in the Himalayas — Walking as Practice',
    description:
      'Trek and meditate in the Himalayas with walking practice, sitting meditation, silent trails, and guided journeys across Chakrata, Sankri, and Zanskar.',
    publishedAt: '2026-01-01',
    lastUpdated: '2026-05-09',
    url: canonicalUrl,
  });

  // Split heading for green last word
  const h1Words = "Trek and Meditate in the Himalayas".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Trek and Meditate in the Himalayas — Walking as Practice"
        description="Trek and meditate in the Himalayas with walking practice, sitting meditation, silent trails, and guided journeys across Chakrata, Sankri, and Zanskar."
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

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
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
        .med-trek-card { padding: 1.25rem; border-left: 4px solid #0f766e; }
        .med-trek-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-trek-card .med-h3 a { color: #0f766e; font-weight: 600; text-decoration: none; }
        .med-trek-card .med-h3 a:hover { color: #0d6b64; }
        .med-trek-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-trek-list { padding-left: 1.25rem; line-height: 2.2; margin-bottom: 1rem; list-style: none; }
        .med-trek-list li { position: relative; padding-left: 1.5rem; }
        .med-trek-list li::before { content: '✦'; position: absolute; left: 0; color: #0f766e; font-size: 0.8rem; }
        .med-trek-list li strong { color: #2B2A26; font-weight: 600; }
        .med-trek-list li a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-trek-list li a:hover { color: #0d6b64; text-decoration: underline; }

        .med-trek-table-wrap { overflow-x: auto; border-radius: 18px; border: 1px solid rgba(15,118,110,0.12); margin-top: 1.5rem; }
        .med-trek-table { width: 100%; border-collapse: collapse; font-family: var(--font-inter), sans-serif; font-size: 0.88rem; }
        .med-trek-table td { padding: 0.6rem 1rem; border-bottom: 1px solid rgba(15,118,110,0.06); color: #4b5259; }
        .med-trek-table tr:last-child td { border-bottom: none; }
        .med-trek-table tr:hover td { background: #f7f9f7; }
        .med-trek-table .med-time { font-weight: 600; color: #2B2A26; white-space: nowrap; }

        .med-trek-locations { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; }
        @media (max-width: 720px) { .med-trek-locations { grid-template-columns: 1fr; } }
        .med-trek-location { padding: 1rem 1.25rem; background: #f7f9f7; border-radius: 12px; border: 1px solid rgba(15,118,110,0.06); transition: all 0.3s; }
        .med-trek-location:hover { background: #fff; border-color: rgba(15,118,110,0.2); transform: translateY(-2px); }
        .med-trek-location .med-h3 { font-size: 1rem; margin-bottom: 0.2rem; }
        .med-trek-location .med-h3 a { color: #0f766e; font-weight: 500; text-decoration: none; }
        .med-trek-location .med-h3 a:hover { text-decoration: underline; }
        .med-trek-location .med-body { font-size: 0.85rem; margin-bottom: 0; color: #6b7280; }

        .med-trek-footer { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; justify-content: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(15,118,110,0.08); }
        .med-trek-footer a { color: #0f766e; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 500; text-decoration: none; }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Trek & Meditate' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Walking as Practice</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Walking is the oldest meditation. Before cushions and caves, before techniques and traditions, humans walked. Step after step, in silence, with attention on the body moving through landscape. The Himalayas are perhaps the most compelling landscape on earth for this practice — terrain that demands presence, beauty that arrests the wandering mind, altitude that simplifies thought to breath and step. This is not a trek with meditation added as a feature. It is a practice where walking and sitting are equal partners.
            </p>
            <div className="med-hero-tags">
              <span>Walking Meditation</span>
              <span>Silent Trails</span>
              <span>5–7 Days</span>
              <span>All Levels</span>
            </div>
            <div className="med-hero-actions">
              <a href="#plan" className="med-cta-btn">Explore Trek + Meditate</a>
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

            <ul className="med-trek-list">
              <li>Trekkers who want more than exercise — who sense that mountains offer something beyond scenery</li>
              <li>People curious about meditation but unable to sit still long enough to try it</li>
              <li>Those who process through movement and feel claustrophobic in traditional retreat settings</li>
              <li>Experienced meditators who want to take their practice off the cushion and into the world</li>
              <li>Anyone who has walked in the mountains and felt something shift inside that they want to explore</li>
            </ul>
          </div>
        </section>

        <PrimaryCTA
          id="plan"
          label="Explore Trek + Meditate"
          subtext="Tell us about your trekking experience and interest in meditation. We'll design the right route."
          vertical="retreat"
          category="trek-meditate"
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

            <div className="med-trek-table-wrap">
              <table className="med-trek-table">
                <tbody>
                  {[
                    '5:30 AM — Wake. Tea in silence.',
                    '6:00 AM — Sitting meditation (30 minutes)',
                    '6:45 AM — Breakfast',
                    '7:30 AM — Trail departs. Silent walking.',
                    '10:00 AM — Rest stop. Brief body scan.',
                    '10:30 AM — Continue walking. Conversation permitted.',
                    '12:30 PM — Lunch at trail or camp.',
                    '2:00 PM — Afternoon trek or rest at camp.',
                    '4:30 PM — Arrive at camp. Settle.',
                    '5:30 PM — Evening sitting meditation (45 minutes)',
                    '6:30 PM — Dinner',
                    '8:00 PM — Star observation or early sleep.',
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

        {/* ── LOCATIONS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Where</span>
            </div>
            <h2 className="med-h2">Where to <span>Walk and Sit</span></h2>

            <div className="med-trek-locations">
              <div className="med-trek-location">
                <h3 className="med-h3"><Link href="/locations/chakrata">Chakrata</Link></h3>
                <p className="med-body">Gentle forest trails perfect for walking meditation.</p>
              </div>
              <div className="med-trek-location">
                <h3 className="med-h3"><Link href="/locations/sankri">Sankri</Link></h3>
                <p className="med-body">Classic Himalayan trails through valleys and villages.</p>
              </div>
              <div className="med-trek-location">
                <h3 className="med-h3"><Link href="/locations/munsiyari">Munsiyari</Link></h3>
                <p className="med-body">Alpine meadow walks with Panchachuli panorama.</p>
              </div>
              <div className="med-trek-location">
                <h3 className="med-h3"><Link href="/locations/zanskar">Zanskar</Link></h3>
                <p className="med-body">Trans-Himalayan trails between monasteries.</p>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Walk With Us"
          subtext="The trail is the meditation hall. Let us show you which path suits your pace."
          vertical="retreat"
          category="trek-meditate"
          sourcePath={PATH}
        />

        {/* ── FAQ ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
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
        <footer className="med-shell med-section-white" style={{ 
          padding: '3rem 0 4rem', 
          borderTop: '1px solid rgba(15,118,110,0.08)',
          marginTop: 0
        }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/meditation-retreat-and-trek" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Retreat + Trek</span>
              </Link>
              <Link href="/himalayan-retreat-with-trekking" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreat with Trekking</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/treks/best-treks-in-uttarakhand" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Best Treks</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/find-your-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Find Your Retreat</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
            </div>
          </div>
        </footer>

      </article>
    </TrackedPage>
  );
}