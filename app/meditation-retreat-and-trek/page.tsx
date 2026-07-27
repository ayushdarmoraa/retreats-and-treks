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

const PATH = '/meditation-retreat-and-trek';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Meditation Retreat and Trek | Retreats And Treks',
    description:
      'Combine meditation retreat and Himalayan trekking with silent practice, guided trails, stillness, and mountain journeys in Chakrata, Sankri, or Zanskar.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Meditation Retreat and Trek in the Himalayas',
      description: 'Stillness meets movement. Combine silent practice with Himalayan trekking.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Meditation Retreat and Trek in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'What is the typical format for a combined retreat and trek?',
    answer:
      'The most common format: 3–5 days of retreat (meditation, silence, rest) followed by 3–5 days of trekking. The retreat creates inner stillness, and the trek channels that stillness into movement through landscape. Some participants prefer the reverse — trek first to exhaust the body, then retreat to settle the mind. Both work. We recommend retreat-first for most people.',
  },
  {
    question: 'Do I need to be fit for the trekking portion?',
    answer:
      'Moderate fitness is sufficient for most of our treks. We are not climbing peaks. Typical trek days are 5–7 hours of walking on established trails at 2,000–4,000 m altitude. If you walk regularly and can handle stairs without distress, you can manage the treks. The retreat days before trekking also serve as acclimatization to altitude.',
  },
  {
    question: 'Can I do just the retreat or just the trek?',
    answer:
      'Absolutely. Both are offered independently. But the combination is more powerful than either alone. Meditation at altitude creates depth. Trekking after sustained silence creates a quality of presence on the trail that most trekkers never access. The two practices are complementary — each enhances the other.',
  },
  {
    question: 'Which locations support both retreat and trekking?',
    answer:
      'Chakrata offers gentle treks through deodar forests alongside retreat facilities. Sankri is the gateway to classic Uttarakhand treks (Har Ki Dun, Kedarkantha) with retreat options in the village. Zanskar offers the most extreme combination — monastery meditation meets high-altitude trekking in the Trans-Himalaya. Munsiyari provides alpine meadow treks with retreat space.',
  },
];

export default function MeditationRetreatAndTrekPage() {
  validateFAQSync(FAQ_ITEMS, PATH);
  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Meditation Retreat and Trek', url: canonicalUrl },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = generateBlogPostingSchema({
    title: 'Meditation Retreat and Trek — Stillness Meets Movement',
    description:
      'Combine meditation retreat and Himalayan trekking with silent practice, guided trails, stillness, and mountain journeys in Chakrata, Sankri, or Zanskar.',
    publishedAt: '2026-03-06',
    lastUpdated: '2026-05-09',
    url: canonicalUrl,
  });

  // Split heading for green last word
  const h1Words = "Meditation Retreat and Trek in the Himalayas".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  // Hero image from registry
  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Meditation Retreat and Trek — Stillness Meets Movement"
        description="Combine meditation retreat and Himalayan trekking with silent practice, guided trails, stillness, and mountain journeys in Chakrata, Sankri, or Zanskar."
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
        .med-combo-card { padding: 1.5rem; }
        .med-combo-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-combo-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-combo-grid { display: grid; gap: 1.25rem; margin-top: 1.8rem; }

        .med-combo-link-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; margin-top: 1.8rem; }
        @media (max-width: 720px) { .med-combo-link-grid { grid-template-columns: 1fr; } }
        .med-combo-link-col .med-h3 { font-size: 1rem; margin-bottom: 0.5rem; }
        .med-combo-link-col ul { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
        .med-combo-link-col ul li a { color: #0f766e; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.9rem; font-weight: 400; }
        .med-combo-link-col ul li a:hover { text-decoration: underline; }
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
              { name: 'Meditation Retreat + Trek' },
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
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Stillness Meets Movement</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Most retreat centres do not offer trekking. Most trekking companies do not understand meditation. We do both — because the combination produces something neither can achieve alone. Stillness experienced in retreat deepens the quality of presence on the trail. Physical engagement with the mountain deepens the quality of sitting practice. The body and mind are not separate systems. A combined retreat and trek treats them as one.
            </p>
            <div className="med-hero-tags">
              <span>Retreat + Trek</span>
              <span>Chakrata</span>
              <span>Sankri</span>
              <span>Zanskar</span>
            </div>
            <div className="med-hero-actions">
              <Link href="#design" className="med-cta-btn">Design My Retreat + Trek</Link>
              <a href="#combinations" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Sample Combinations</a>
            </div>
          </div>
        </section>

        {/* ── WHY COMBINE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">The Why</span>
            </div>
            <h2 className="med-h2">Why Combine <span>Retreat and Trek</span></h2>

            <ul className="med-list" style={{ marginTop: '1.5rem' }}>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Embodied meditation:</strong> Walking 6 hours through mountains after 3 days of silence creates a quality of moving meditation that is impossible to manufacture.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Physical release:</strong> The body stores what the mind processes in retreat. Trekking releases it through movement.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Altitude acclimatization:</strong> Retreat days serve as natural acclimatization before the trek.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Extended unplugging:</strong> 7–10 days without screens or schedules — long enough for genuine recalibration.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Complete experience:</strong> Inner work (retreat) + outer exploration (trek) = the full Himalayan experience.</span>
              </li>
            </ul>
          </div>
        </section>

        <PrimaryCTA
          id="design"
          label="Design My Retreat + Trek"
          subtext="Tell us your fitness level, experience, and how many days you have. We'll create a combined itinerary."
          vertical="retreat"
          category="retreat-and-trek"
          sourcePath={PATH}
        />

        {/* ── SAMPLE COMBINATIONS ── */}
        <section id="combinations" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Examples</span>
            </div>
            <h2 className="med-h2">Sample <span>Combinations</span></h2>

            <div className="med-combo-grid">
              <div className="med-card med-combo-card">
                <h3 className="med-h3">Chakrata: 3-Day Retreat + Weekend Trek (5–6 days)</h3>
                <p className="med-body">
                  3 days of meditation in the deodar forest, then 2–3 days of forest trekking to Tiger Falls, Budher Caves, and Deoban. The gentlest combination — ideal for first-timers. See <Link href="/meditation-retreat-chakrata" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Chakrata retreats</Link>.
                </p>
              </div>

              <div className="med-card med-combo-card">
                <h3 className="med-h3">Sankri: 3-Day Retreat + Har Ki Dun Trek (8–9 days)</h3>
                <p className="med-body">
                  Silent retreat in the village, then a classic valley trek through ancient villages and pastoral landscapes. The retreat settles you; the trek carries that stillness through one of the most beautiful valleys in the Himalayas. See <Link href="/burnout-recovery-retreat-sankri" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Sankri retreats</Link>.
                </p>
              </div>

              <div className="med-card med-combo-card" style={{ gridColumn: '1 / -1' }}>
                <h3 className="med-h3">Zanskar: 5-Day Monastery Retreat + River Trek (10–12 days)</h3>
                <p className="med-body">
                  The most immersive combination. Meditation in the monastery tradition, then trekking along the Zanskar River or to Phuktal Gompa. Trans-Himalayan landscape at 3,500+ m. For experienced practitioners and fit trekkers. See <Link href="/meditation-retreat-zanskar" style={{ color: '#0f766e', fontWeight: 500, textDecoration: 'none' }}>Zanskar retreats</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPLORE INDEPENDENTLY ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Explore</span>
            </div>
            <h2 className="med-h2">Explore <span>Independently</span></h2>

            <div className="med-combo-link-grid">
              <div className="med-combo-link-col">
                <h3 className="med-h3" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Retreats</h3>
                <ul>
                  <li><Link href="/meditation-retreats">Meditation Retreats</Link></li>
                  <li><Link href="/silent-retreats">Silent Retreats</Link></li>
                  <li><Link href="/7-day-meditation-retreat">7-Day Retreat</Link></li>
                </ul>
              </div>
              <div className="med-combo-link-col">
                <h3 className="med-h3" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Treks</h3>
                <ul>
                  <li><Link href="/treks">All Treks</Link></li>
                  <li><Link href="/treks/best-treks-in-uttarakhand/beginner">Beginner Treks</Link></li>
                  <li><Link href="/treks/best-treks-in-uttarakhand">Best Treks</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan My Combined Experience"
          subtext="Retreat + trek. We'll design the perfect ratio of stillness and movement."
          vertical="retreat"
          category="retreat-and-trek"
          sourcePath={PATH}
        />

        {/* ── FAQ ── */}
        <section className="med-shell med-section-alt med-section-padding">
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Common Questions</span>
            </div>
            <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
            <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
          </div>
        </section>

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/himalayan-retreat-with-trekking" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Retreat + Trekking</span>
              </Link>
              <Link href="/trek-and-meditate-himalayas" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Trek &amp; Meditate</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>All Retreats</span>
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