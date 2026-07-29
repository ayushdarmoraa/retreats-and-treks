import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { schemaIds } from '@/lib/schemaIds';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import FeaturedRetreat from '@/components/FeaturedRetreat';
import RelatedReads from '@/components/RelatedReads';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const PATH = '/why-zanskar-is-perfect-for-retreats';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Why Zanskar Is Perfect for Retreats | Retreats And Treks',
    description:
      'Why Zanskar is ideal for retreats: altitude, monasteries, isolation, silence, and a living contemplative culture shaped by the Himalayas.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Why Zanskar Is Perfect for Meditation Retreats',
      description: 'Altitude, monasteries, isolation, and living contemplative culture.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Why Zanskar Is Perfect for Meditation Retreats'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Where exactly is Zanskar?',
    answer:
      'Zanskar is a remote valley in the Ladakh region of northern India, at an altitude of 3,500–4,000 metres. It is part of the Trans-Himalayan range, separated from the Kashmir Valley by the Great Himalayan Range and from Ladakh by the Zanskar Range. The valley is accessible by road from Kargil (7–9 hours) or by air via Leh followed by road travel.',
  },
  {
    question: 'Is Zanskar safe for international visitors?',
    answer:
      'Yes. Zanskar is a peaceful, predominantly Buddhist region with a welcoming local culture. It is part of the Ladakh Union Territory. The main safety considerations are altitude (requires acclimatisation), road conditions (mountain roads require experienced drivers), and weather (limited access in winter). Our retreats handle all logistics, transport, and safety planning.',
  },
  {
    question: 'Do I need to be Buddhist to attend a retreat in Zanskar?',
    answer:
      'No. Our retreats are secular and welcome people of all backgrounds and beliefs. Zanskar\'s monasteries have a long tradition of hosting contemplative visitors regardless of faith. The meditation techniques taught are evidence-based mindfulness practices, not religious instruction.',
  },
  {
    question: 'How does altitude affect meditation?',
    answer:
      'At 3,500 metres, the reduced oxygen naturally slows the body and mind. Breathing becomes more deliberate, physical activity requires more effort, and the body enters a state of heightened awareness. Many practitioners report that altitude creates a built-in stillness that supports meditation. Proper acclimatisation (1–2 days) is essential before intensive practice begins.',
  },
  {
    question: 'Is Zanskar appropriate for beginners?',
    answer:
      'Zanskar is best suited for people with some retreat experience or a strong adventurous spirit. The travel is challenging, the environment is rugged, and the isolation is genuine — no nearby towns, no easy exits. For beginners, we recommend starting with our Chakrata forest retreat, which offers the same facilitation in a more accessible setting.',
  },
];

export default function WhyZanskarPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Locations', url: buildCanonicalUrl('/locations') },
    { name: 'Zanskar', url: buildCanonicalUrl('/locations/zanskar') },
    { name: 'Why Zanskar?', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Zanskar Is Perfect for Meditation Retreats',
    description: 'What makes Zanskar an exceptional retreat destination.',
    url: canonicalUrl,
    author: { '@id': schemaIds.organization },
    publisher: { '@id': schemaIds.organization },
    datePublished: '2026-03-06',
    dateModified: '2026-03-06',
    mainEntityOfPage: canonicalUrl,
  };

  // Split heading for teal last word
  const h1Words = 'Why Zanskar Is Perfect for Meditation Retreats'.split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.locations.zanskar;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Why Zanskar Is Perfect for Meditation Retreats"
        description="Why Zanskar is ideal for retreats: altitude, monasteries, isolation, silence, and a living contemplative culture shaped by the Himalayas."
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
        .med-list-text a { color: #0f766e; font-weight: 600; text-decoration: none; }
        .med-list-text a:hover { text-decoration: underline; }

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
          margin: 0 auto;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.85);
          text-shadow: 0 2px 14px rgba(0,0,0,0.45);
        }

        .med-section-padding { padding: 4rem 0; }
        .med-section-padding-sm { padding: 3rem 0; }

        /* ── FAQ Accordion (shared pattern) ── */
        .med-faq-accordion { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.5rem; }
        .med-faq-details { background: #fff; border: 1px solid rgba(15,118,110,0.1); border-radius: 12px; overflow: hidden; transition: border-color 0.3s ease; }
        .med-faq-details:hover { border-color: rgba(15,118,110,0.25); }
        .med-faq-details[open] { border-color: rgba(15,118,110,0.3); }
        .med-faq-summary {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.25rem 1.5rem; cursor: pointer; list-style: none;
          font-family: var(--font-inter), sans-serif; font-size: 0.95rem; font-weight: 500; color: #2B2A26;
          transition: background 0.2s ease; user-select: none; gap: 1rem;
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
        @keyframes med-faq-slide { 0% { opacity: 0; transform: translateY(-12px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .med-faq-answer .med-body { margin: 0; font-size: 0.92rem; color: #4b5259; }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Locations', href: '/locations' }, { name: 'Zanskar', href: '/locations/zanskar' }, { name: 'Why Zanskar?' }]} />
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>The Zanskar Guide</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              There are comfortable places to meditate. And then there is Zanskar —
              a valley at 3,500 metres where monasteries have held silence for over a
              thousand years, where the landscape is so vast it makes your inner noise feel
              small, and where the conditions for deep practice are not manufactured but
              natural.
            </p>
          </div>
        </section>

        {/* ── THE LANDSCAPE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Setting</span>
            </div>
            <h2 className="med-h2">The Landscape Does <span>the Work</span></h2>
            <p className="med-body">
              Zanskar is a high-altitude desert valley surrounded by peaks above 6,000
              metres. The sky is a shade of blue that does not exist at lower elevations.
              The air is thin, dry, and clear. Sound carries differently — a river
              two kilometres away is audible from a monastery courtyard. At night, the
              absence of light pollution reveals a sky so dense with stars that silence
              becomes visual.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              This is not decoration. The vastness of the landscape creates a perceptual
              shift that supports meditation directly. When you sit in a valley where the
              horizon is 50 kilometres away, the tight focus of daily anxiety loosens. The
              mind expands to match the space.
            </p>
          </div>
        </section>

        {/* ── LIVING TRADITION ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Culture</span>
            </div>
            <h2 className="med-h2">A Living <span>Contemplative Tradition</span></h2>
            <p className="med-body">
              Zanskar is not a tourist destination that happens to have old temples. It is a
              functioning Buddhist community where monks and nuns have practised meditation
              continuously for over a millennium. Monasteries like Phuktal, Karsha, and
              Stongde are not museums — they are active centres of contemplative life.
            </p>
            <p className="med-body">
              When you meditate in Zanskar, you are sitting in a place where sitting has
              been the primary activity for centuries. The walls of these monasteries have
              absorbed thousands of hours of practice. Whether or not you believe in the
              literal energy of a place, there is a quality of attention in spaces that have
              been used for contemplation that is difficult to replicate in a converted
              hotel or wellness centre.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              Read about{' '}
              <Link href="/my-7-day-meditation-retreat-in-zanskar" style={{ color: '#0f766e', fontWeight: 600 }}>
                one person&rsquo;s experience of a 7-day retreat in Zanskar
              </Link>.
            </p>
          </div>
        </section>

        {/* ── ALTITUDE EFFECT ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Physiology</span>
            </div>
            <h2 className="med-h2">The <span>Altitude Effect</span></h2>
            <p className="med-body">
              At 3,500 metres, everything slows down. Walking is slower. Breathing is more
              deliberate. Physical exertion is limited. The body, without being asked,
              enters a gentler pace. This is exactly what meditation requires — a
              deceleration that at sea level must be consciously cultivated but at altitude
              happens automatically.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              The reduced oxygen also affects sleep patterns and energy levels, which can
              initially feel challenging but ultimately supports the retreat process. When
              you cannot rush, you stop trying to. When you cannot sustain your usual
              pace, you discover what exists beneath it.
            </p>
          </div>
        </section>

        <PrimaryCTA
          label="Explore Zanskar Retreats"
          subtext="Limited availability — our Zanskar programmes run only in summer months."
          vertical="retreat"
          category="zanskar-guide"
          sourcePath={PATH}
        />

        {/* ── GENUINE ISOLATION ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Disconnection</span>
            </div>
            <h2 className="med-h2">Genuine <span>Isolation</span></h2>
            <p className="med-body">
              Most retreat centres create artificial isolation — a quiet property
              within reach of a town. Zanskar does not need to manufacture remoteness.
              The nearest city (Leh) is a day&rsquo;s drive away. Mobile signal is
              intermittent or absent. There is no decision to make about being connected
              because connection is not available.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              This changes the retreat fundamentally. The digital detox is not voluntary
              — it is geographical. Read about{' '}
              <Link href="/a-week-without-my-phone-digital-detox" style={{ color: '#0f766e', fontWeight: 600 }}>
                what a week without your phone actually feels like
              </Link>.
            </p>
          </div>
        </section>

        {/* ── NOT FOR EVERYONE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Honest Expectations</span>
            </div>
            <h2 className="med-h2">Zanskar Is <span>Not for Everyone</span></h2>
            <p className="med-body">
              Honesty matters here. Zanskar is rugged, remote, and physically demanding to
              reach. Accommodation in monasteries is basic. Temperatures can drop below
              freezing even in summer mornings. The food is simple and vegetarian. There is
              no spa, no luxury, no comfort beyond what is genuinely needed.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              If you want a comfortable first retreat, start with{' '}
              <Link href="/locations/chakrata" style={{ color: '#0f766e', fontWeight: 600 }}>Chakrata</Link>
              . If you want comfort plus mountains, look at our{' '}
              <Link href="/best-himalayan-retreats" style={{ color: '#0f766e', fontWeight: 600 }}>best Himalayan retreats</Link>
              {' '}page. Zanskar is for people who are ready to strip away comfort
              entirely and see what remains.
            </p>
          </div>
        </section>

        {/* ── PLANNING NEXT STEPS ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Next Steps</span>
            </div>
            <h2 className="med-h2">Planning a <span>Zanskar Retreat</span></h2>

            <div className="med-card" style={{ padding: '2rem' }}>
              <ul className="med-list">
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text">
                    <strong>The retreat:</strong>{' '}
                    <Link href="/meditation-retreat-zanskar">Meditation retreat in Zanskar</Link>
                    {' '}— what the programme includes and who it&rsquo;s for
                  </span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text">
                    <strong>Day by day:</strong>{' '}
                    <Link href="/7-day-zanskar-meditation-retreat-itinerary">7-day Zanskar itinerary</Link>
                  </span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text">
                    <strong>Next departure:</strong>{' '}
                    <Link href="/zanskar-meditation-retreat-june-2026">June 2026 Zanskar programme</Link>
                    {' '}— dates, pricing, availability
                  </span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text">
                    <strong>When to go:</strong>{' '}
                    <Link href="/best-time-for-a-retreat-in-zanskar">Best time for a retreat in Zanskar</Link>
                  </span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text">
                    <strong>How to get there:</strong>{' '}
                    <Link href="/how-to-reach-zanskar-for-a-retreat">How to reach Zanskar</Link>
                  </span>
                </li>
                <li className="med-list-item">
                  <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                  <span className="med-list-text">
                    <strong>What to bring:</strong>{' '}
                    <Link href="/what-to-pack-for-a-retreat">Complete packing list</Link>
                    {' '}(includes Zanskar-specific altitude gear)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <FeaturedRetreat
          title="7-Day Meditation Retreat in Zanskar"
          description="Monastery-based practice at 3,500m. All logistics, meals, acclimatisation, and facilitation included."
          links={[
            { label: 'Zanskar location details', href: '/locations/zanskar' },
            { label: 'See retreat dates', href: '/retreat-calendar' },
            { label: 'Find your retreat', href: '/find-your-retreat' },
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

        <RelatedReads
          links={[
            { label: 'Meditation Retreat in Zanskar', href: '/meditation-retreat-zanskar' },
            { label: '7-Day Zanskar Itinerary', href: '/7-day-zanskar-meditation-retreat-itinerary' },
            { label: 'Best Time for a Retreat in Zanskar', href: '/best-time-for-a-retreat-in-zanskar' },
            { label: 'How to Reach Zanskar', href: '/how-to-reach-zanskar-for-a-retreat' },
            { label: 'My 7-Day Retreat in Zanskar', href: '/my-7-day-meditation-retreat-in-zanskar' },
          ]}
        />

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/locations/zanskar" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Zanskar</span>
              </Link>
              <Link href="/locations" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>All Locations</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/retreat-calendar" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreat Calendar</span>
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
