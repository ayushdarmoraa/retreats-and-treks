import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { ALL_BLOG_POSTS } from '@/content/blogs';
import { generateBreadcrumbSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedPage from '@/components/TrackedPage';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

const CANONICAL = '/topics/lifestyle';

export const metadata: Metadata = {
  title: 'Lifestyle & Himalayan Living | Retreats And Treks',
  description:
    'Perspectives on slow living, mountain lifestyle, retreat psychology, travel mindset, trek culture, and how the Himalayas reshape daily life.',
  alternates: {
    canonical: buildCanonicalUrl(CANONICAL),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Lifestyle & Himalayan Living — Retreats And Treks',
    description:
      'Perspectives on slow living, mountain lifestyle, retreat psychology, travel mindset, and trek culture.',
    url: buildCanonicalUrl(CANONICAL),
    type: 'website',
    images: buildOgImages('Lifestyle & Himalayan Living — Retreats And Treks'),
  },
};

export default function LifestyleTopicPage() {
  const posts = ALL_BLOG_POSTS.filter((post) => post.category === 'Lifestyle');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Topics', url: buildCanonicalUrl('/topics') },
    { name: 'Lifestyle & Himalayan Living', url: buildCanonicalUrl(CANONICAL) },
  ]);

  // Split heading for green last word
  const h1Words = "Lifestyle & Himalayan Living".split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = images.heroes.himalayanSunrise;

  return (
    <TrackedPage page={CANONICAL} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Lifestyle & Himalayan Living — Retreats And Treks"
        description="Perspectives on slow living, mountain lifestyle, retreat psychology, travel mindset, and trek culture."
        path={CANONICAL}
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

        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-hero-section {
          position: relative;
          overflow: hidden;
          min-height: 60vh;
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
          font-size: 1.1rem;
          color: rgba(255,255,255,0.88);
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
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          padding: 0.35rem 0.9rem;
          background: rgba(15,118,110,0.2);
          backdrop-filter: blur(8px);
        }

        .med-section-padding { padding: 4rem 0; }
        .med-section-padding-sm { padding: 3rem 0; }

        /* ── Premium Section Styles ── */
        .med-lifestyle-section {
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(15,118,110,0.06);
        }
        .med-lifestyle-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .med-lifestyle-section .med-h2 {
          font-size: clamp(1.3rem, 2.2vw, 1.6rem);
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }
        .med-lifestyle-section .med-body {
          font-size: 0.95rem;
          margin-bottom: 1rem;
          color: #4b5259;
        }
        .med-lifestyle-section .med-body a {
          color: #0f766e;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.3s;
        }
        .med-lifestyle-section .med-body a:hover {
          color: #0d6b64;
          text-decoration: underline;
        }
        .med-lifestyle-section .med-body:last-child {
          margin-bottom: 0;
        }

        .med-lifestyle-post {
          padding: 1.25rem 1.5rem;
          background: #fff;
          border: 1px solid rgba(15,118,110,0.08);
          border-radius: 12px;
          margin-bottom: 0.75rem;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .med-lifestyle-post::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #0f766e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .med-lifestyle-post:hover {
          transform: translateY(-4px);
          border-color: rgba(15,118,110,0.2);
          box-shadow: 0 12px 32px rgba(15,118,110,0.06);
        }
        .med-lifestyle-post:hover::before {
          transform: scaleX(1);
        }
        .med-lifestyle-post .med-h3 {
          font-size: 1.05rem;
          margin-bottom: 0.2rem;
        }
        .med-lifestyle-post .med-h3 a {
          color: #2B2A26;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.3s;
        }
        .med-lifestyle-post .med-h3 a:hover {
          color: #0f766e;
        }
        .med-lifestyle-post .med-body {
          font-size: 0.88rem;
          margin: 0.2rem 0 0;
          color: #6b7280;
        }

        .med-lifestyle-topics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        @media (max-width: 720px) {
          .med-lifestyle-topics { grid-template-columns: 1fr; }
        }
        .med-lifestyle-topics a {
          display: block;
          padding: 1rem 1.25rem;
          background: #f7f9f7;
          border-radius: 10px;
          border: 1px solid rgba(15,118,110,0.06);
          color: #2B2A26;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          font-weight: 400;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .med-lifestyle-topics a:hover {
          background: #fff;
          border-color: rgba(15,118,110,0.2);
          box-shadow: 0 4px 16px rgba(15,118,110,0.06);
          transform: translateY(-2px);
        }
        .med-lifestyle-topics a strong {
          color: #0f766e;
          display: block;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .med-lifestyle-topics a span {
          color: #6b7280;
          font-size: 0.82rem;
        }

        .med-lifestyle-back {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(15,118,110,0.08);
        }
        .med-lifestyle-back a {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #0f766e;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          transition: gap 0.3s;
        }
        .med-lifestyle-back a:hover {
          gap: 0.75rem;
        }

        .med-lifestyle-callout {
          background: #f7f9f7;
          border: 1px solid rgba(15,118,110,0.08);
          border-left: 4px solid #0f766e;
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.88rem;
          color: #4b5259;
          line-height: 1.85;
        }
        .med-lifestyle-callout a {
          color: #0f766e;
          font-weight: 500;
          text-decoration: none;
        }
        .med-lifestyle-callout a:hover {
          text-decoration: underline;
        }

        .med-lifestyle-empty {
          text-align: center;
          padding: 2rem;
          background: #f7f9f7;
          border-radius: 12px;
          border: 1px dashed rgba(15,118,110,0.2);
        }
        .med-lifestyle-empty .med-body {
          font-style: italic;
          color: #6b7280;
          margin: 0;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Topics', href: '/topics' },
              { name: 'Lifestyle & Himalayan Living' },
            ]}
          />
        </div>
      </div>

      <article>

        {/* ── PREMIUM HERO ── */}
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
              <span style={{ width: 30, height: 1, background: 'rgba(255,255,255,0.4)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>Mountain Living</span>
              <span style={{ width: 30, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">
              Perspectives on slow living, mountain lifestyle, retreat psychology, travel mindset, and trek culture — from people who keep returning to the mountains.
            </p>
            <div className="med-hero-tags">
              <span>Slow Living</span>
              <span>Retreat Psychology</span>
              <span>Trek Culture</span>
              <span>Travel Mindset</span>
            </div>
          </div>
        </section>

        {/* ── EDITORIAL BODY ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">

            <div className="med-lifestyle-section">
              <h2 className="med-h2">Slow Living Is Not a Trend — <span>It Is a Response</span></h2>
              <p className="med-body">
                The phrase "slow living" has been absorbed into marketing language. But in the Himalayas, slowness is not an aesthetic. It is the only viable speed. Mountain roads take hours. Meals happen when fire heats water. Mornings begin when light arrives, not when an alarm sounds. This is not philosophy — it is physics. The terrain imposes a pace that urban life has systematically removed, and that pace turns out to be the one your nervous system was designed for.
              </p>
              <p className="med-body">
                People who spend even three days at altitude in places like <Link href="/retreats/chakrata">Chakrata</Link> or <Link href="/retreats/munsiyari">Munsiyari</Link> report the same thing: time changed shape. Not metaphorically — literally. The hours felt longer. Attention stabilised. The compulsive need to check, scroll, or produce diminished without effort. The environment did the work.
              </p>
            </div>

            <div className="med-lifestyle-section">
              <h2 className="med-h2">Mountain Lifestyle as a Practice, <span>Not a Destination</span></h2>
              <p className="med-body">
                Living in or near mountains is not about escaping modern life. It is about recalibrating your relationship with it. The people who live year-round in Himalayan villages — in <Link href="/retreats/sankri">Sankri</Link>, in the Johar Valley above Munsiyari, in the forest hamlets around Chakrata — do not romanticise their existence. They farm, cook, repair, endure cold, and deal with isolation. But they also sleep deeply, eat seasonally, move their bodies daily, and live within natural rhythms that most urban professionals have never experienced.
              </p>
              <p className="med-body">
                Mountain lifestyle, as a concept worth exploring, is not about mimicking village life. It is about borrowing principles: reduce inputs. Move your body through terrain, not just on a treadmill. Eat what the season offers. Let silence exist without filling it. These are not radical ideas — they are ancient defaults that industrial life overrode.
              </p>
            </div>

            <div className="med-lifestyle-section">
              <h2 className="med-h2">Retreat Psychology: <span>Why Stepping Away Works</span></h2>
              <p className="med-body">
                The psychology of retreat is not complex: your brain cannot recalibrate inside the system that dysregulated it. Changing the environment — physically, sensorily, socially — is the minimum viable intervention for genuine cognitive reset. This is why a weekend at home rarely restores you the way a weekend in the forest does, even when both involve rest.
              </p>
              <p className="med-body">
                Research on nature immersion converges on a consistent finding: approximately 72 hours in a genuinely different environment produces measurable changes in cortisol, attention span, and default-mode network activity. A <Link href="/blog/is-weekend-retreat-worth-it">weekend retreat</Link> hits this threshold. A <Link href="/blog/3-day-vs-5-day-himalayan-retreat">five-day programme</Link> exceeds it. The question is not whether stepping away works — it is whether you will actually do it before burnout forces the decision.
              </p>
            </div>

            <div className="med-lifestyle-section">
              <h2 className="med-h2">Travel Mindset: <span>Going Somewhere vs. Going Toward Something</span></h2>
              <p className="med-body">
                Most travel is consumption. You arrive, you see, you photograph, you leave. The place is backdrop. Himalayan travel — when done with intention — inverts this. You arrive, and the place works on you. The altitude shifts your physiology. The silence reorganises your attention. The difficulty of reaching <Link href="/retreats/sankri">Sankri</Link> or <Link href="/retreats/munsiyari">Munsiyari</Link> filters out casual visitors and ensures that arrival itself is an act of commitment.
              </p>
              <p className="med-body">
                The travel mindset we explore in these articles is directional, not recreational. It asks: what am I moving toward? Rest? Challenge? Clarity? Discomfort? The answer determines the destination. Someone seeking stillness belongs in <Link href="/retreats/chakrata">Chakrata</Link>. Someone seeking transformation through difficulty belongs on a <Link href="/treks/location/munsiyari/milam-glacier-trek">glacier trek</Link>. Knowing the difference is the first act of intentional travel.
              </p>
            </div>

            <div className="med-lifestyle-section">
              <h2 className="med-h2">Trek Culture: <span>What Walking in Mountains Actually Teaches</span></h2>
              <p className="med-body">
                Trekking is not hiking with a better view. Himalayan trek culture — the real culture, not the Instagram version — is built on preparation, respect for terrain, dependence on local knowledge, and acceptance that the mountain decides your schedule. A <Link href="/treks/location/sankri/kedarkantha-trek">Kedarkantha summit push</Link> teaches you about your own limits. A <Link href="/treks/location/sankri/har-ki-dun-trek">Har Ki Dun valley traverse</Link> teaches you about patience and sustained effort over days. A <Link href="/treks/location/munsiyari/khaliya-top-trek">Khaliya Top ascent</Link> teaches you that the view from the top is not the point — the walk getting there is.
              </p>
              <p className="med-body">
                Trek culture, at its best, is a practice of embodied presence. You cannot think about tomorrow when the trail demands your feet now. You cannot be distracted when altitude thins your air and sharpens your focus. These are not metaphors for mindfulness — they are the physical conditions that produce it.
              </p>
            </div>

          </div>
        </section>

        {/* ── POSTS LIST ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Articles</span>
            </div>
            <h2 className="med-h2">Articles on <span>Lifestyle & Himalayan Living</span></h2>

            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.slug} className="med-lifestyle-post">
                  <h3 className="med-h3"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                  <p className="med-body">{post.description}</p>
                </div>
              ))
            ) : (
              <div className="med-lifestyle-empty">
                <p className="med-body">Lifestyle articles are being developed. New perspectives on mountain living, retreat psychology, and intentional travel will appear here as they are published.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── EXPLORE OTHER TOPICS ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Explore</span>
            </div>
            <h2 className="med-h2">Explore <span>Other Topics</span></h2>
            <p className="med-body" style={{ marginBottom: '1rem' }}>
              Each topic cluster covers a different dimension of the Himalayan retreat and trekking experience:
            </p>
            <div className="med-lifestyle-topics">
              <Link href="/topics/retreat-decision">
                <strong>Retreat Guides</strong>
                <span>Choosing between retreat formats, durations, and approaches</span>
              </Link>
              <Link href="/topics/location-authority">
                <strong>Location Guides</strong>
                <span>Destination-specific planning for Chakrata, Sankri, Munsiyari, and Rishikesh</span>
              </Link>
              <Link href="/topics/trek-decision">
                <strong>Trek Guides</strong>
                <span>Comparing Himalayan trekking routes, difficulty, and what each trail offers</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CALLOUT ── */}
        <section className="med-shell med-section-alt med-section-padding-sm">
          <div className="med-inner">
            <div className="med-lifestyle-callout">
              For a complete overview of structured mountain-based programmes, visit our <Link href="/retreats/himalayan-retreats">Himalayan Retreats guide</Link>.
            </div>
          </div>
        </section>

        {/* ── BACK LINK ── */}
        <div className="med-lifestyle-back">
          <div className="med-inner">
            <Link href="/blog">← All articles</Link>
          </div>
        </div>

      </article>
    </TrackedPage>
  );
}