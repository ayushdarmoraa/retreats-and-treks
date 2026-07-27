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

const PATH = '/autumn-retreat-himalayas';

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Autumn Retreat in the Himalayas | Retreats And Treks',
    description:
      'Autumn Himalayan retreats from September to November with post-monsoon clarity, golden light, mountain views, meditation, silence, and healing.',
    alternates: { canonical: buildCanonicalUrl(PATH) },
    robots: { index: true, follow: true },
    openGraph: {
      title: 'Autumn Retreat in the Himalayas',
      description: 'Post-monsoon clarity, golden light, peak mountain views. The Himalayan season of release.',
      url: buildCanonicalUrl(PATH),
      type: 'article',
      images: buildOgImages('Autumn Retreat in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'Why is autumn considered the best season for Himalayan retreats?',
    answer:
      'September–November offers the clearest mountain views of the year. Monsoon has washed the air clean. Temperatures are comfortable (10–22°C at mid-altitude). The forests are still green but beginning to turn. Tourist crowds have not yet arrived. And psychologically, autumn\'s quality of release and settling mirrors the inner work of retreat — making it the most naturally aligned season.',
  },
  {
    question: 'Which autumn month is best for a retreat?',
    answer:
      'October is the sweet spot at most locations — clear skies, comfortable temperatures, post-monsoon lushness still visible. September works well but may have residual rain at lower altitudes. November is cooler and drier, transitioning toward winter. For Zanskar, September is the final window before passes close.',
  },
  {
    question: 'Are the mountains visible in autumn?',
    answer:
      'Autumn provides the best mountain visibility of the year. The monsoon clears atmospheric haze, and the air remains clean until winter haze builds in December. From Munsiyari, the Panchachuli range appears with crystalline sharpness. From Chakrata, distant Himalayan peaks emerge on clear days. The visual impact of these views during meditation or walking practice is profound.',
  },
  {
    question: 'Is autumn good for a combined retreat and trek?',
    answer:
      'Excellent. October–November is peak trekking season for most Himalayan routes. Snow has not yet arrived at passes below 4,500 m, the weather is stable, and the trails are dry. A common pattern is a 3–5 day retreat followed by a trek — the inner stillness from retreat enhances the trekking experience significantly.',
  },
];

export default function AutumnRetreatPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Autumn Retreat in the Himalayas', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);
  const articleSchema = generateBlogPostingSchema({
    title: 'Autumn Retreat in the Himalayas — The Letting-Go Season',
    description:
      'Autumn Himalayan retreats from September to November with post-monsoon clarity, golden light, mountain views, meditation, silence, and healing.',
    publishedAt: '2026-03-06',
    lastUpdated: '2026-05-09',
    url: buildCanonicalUrl(PATH),
  });

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Autumn Retreat in the Himalayas — The Letting-Go Season"
        description="Autumn Himalayan retreats from September to November with post-monsoon clarity, golden light, mountain views, meditation, silence, and healing."
        path={PATH}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, articleSchema]) }} />

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

        .med-location-item { padding: 1.25rem; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; background: #fff; }
        .med-location-item h3 { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.1rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.5rem; }
        .med-location-item h3 a { color: #0f766e; text-decoration: none; }
        .med-location-item h3 a:hover { text-decoration: underline; }
        .med-location-item p { font-family: var(--font-inter), sans-serif; font-size: 0.92rem; line-height: 1.8; color: #4b5259; margin: 0; }

        .med-list-links { padding-left: 1.25rem; line-height: 2; }
        .med-list-links li { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; color: #4b5259; }
        .med-list-links a { color: #0f766e; text-decoration: none; font-weight: 500; }
        .med-list-links a:hover { text-decoration: underline; }

        .med-season-hero { position: relative; overflow: hidden; min-height: 75vh; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid rgba(15,118,110,0.12); background: #0b241f; }
        .med-season-hero .med-hero-bg { animation: med-hero-zoom 24s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .med-season-hero .med-hero-bg { animation: none; } }
      `}</style>

      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Autumn Retreat Himalayas' }]} />

      <article>
        {/* ── HERO ── */}
        <section className="med-shell med-season-hero">
          <div style={{ position: 'absolute', inset: 0 }}>
            <img className="med-hero-bg" src="/Images/hero/himalayan-sunrise.webp" alt="Autumn retreat in the Himalayas" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
          </div>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Seasonal Retreat Guide</span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
              Autumn Retreat in <span style={{ color: '#5eead4' }}>the Himalayas</span>
            </h1>
            <p style={{ maxWidth: '40rem', margin: '0 auto', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
              September through November. The monsoon withdraws and leaves everything clean. The air is crystalline. Mountains that were hidden for months reappear with startling clarity. The forests begin their turn — greens deepening toward gold. The light changes quality, becoming warmer and more angled. Autumn in the Himalayas is the season of release — the landscape is letting go, and it invites you to do the same. For retreat work involving grief, transition, completion, or simply settling, autumn provides the most aligned container.
            </p>
          </div>
        </section>

        {/* ── WHY AUTUMN ── */}
        <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Seasonal Guide</span>
            </div>
            <h2 className="med-h2">Why Autumn for a <span>Retreat</span></h2>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Clearest views:</strong> Post-monsoon air is the cleanest of the year. Mountains appear with razor sharpness.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Golden light:</strong> Lower sun angle creates warm, contemplative light throughout the day.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Release energy:</strong> The season naturally supports letting go — leaves fall, the land simplifies.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Perfect temperature:</strong> 10–22°C at mid-altitude. Warm enough for outdoor practice, cool enough for deep sleep.</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><strong>Trek compatibility:</strong> October–November is peak trek season. Combine retreat and trek.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ── AUTUMN RETREAT LOCATIONS ── */}
        <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Where to Go</span>
            </div>
            <h2 className="med-h2">Autumn Retreat <span>Locations</span></h2>

            <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
              <div className="med-card med-location-item" style={{ padding: '1.5rem' }}>
                <span className="med-season-tag">October–November</span>
                <h3><Link href="/locations/chakrata">Chakrata — Forest in Golden Light</Link></h3>
                <p>The deodar forest takes on a golden-green quality as the sun angle drops. Morning mist burns off to reveal clear Himalayan views. The tourist season has not started. For meditation, silent retreat, and healing work, this is Chakrata at its most contemplative.</p>
              </div>

              <div className="med-card med-location-item" style={{ padding: '1.5rem' }}>
                <span className="med-season-tag">September–October</span>
                <h3><Link href="/locations/munsiyari">Munsiyari — Panchachuli in Crystal Air</Link></h3>
                <p>The Panchachuli peaks are at their most dramatic — washed clean by monsoon, not yet obscured by winter haze. The Khaliya meadows turn golden. For retreatants who process through landscape, this is the most visually powerful season.</p>
              </div>

              <div className="med-card med-location-item" style={{ padding: '1.5rem' }}>
                <span className="med-season-tag">October onwards</span>
                <h3><Link href="/locations/rishikesh">Rishikesh — Post-Monsoon Renewal</Link></h3>
                <p>The Ganges settles after monsoon, the air cools, and the ashram scene returns to its contemplative rhythm. Comfortable temperatures (20–28°C) perfect for yoga and meditation. The spiritual energy of the post-Navaratri season adds depth.</p>
              </div>
            </div>
          </div>
        </section>

        <PrimaryCTA
          label="Plan an Autumn Retreat"
          subtext="September–November. Tell us your dates — we'll match the right location and approach."
          vertical="retreat"
          category="autumn-retreat"
          sourcePath={PATH}
        />

        {/* ── POPULAR AUTUMN RETREATS ── */}
        <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Recommended</span>
            </div>
            <h2 className="med-h2">Popular Autumn <span>Retreats</span></h2>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><Link href="/silent-retreat-chakrata" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>Silent retreat in Chakrata</Link> — autumn forest silence at its deepest</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><Link href="/meditation-retreat-zanskar" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>Meditation retreat in Zanskar</Link> — September: the final window</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><Link href="/healing-retreat-munsiyari" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>Healing retreat in Munsiyari</Link> — autumn release in alpine landscape</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><Link href="/spiritual-retreat-rishikesh" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>Spiritual retreat in Rishikesh</Link> — post-monsoon clarity on the Ganges</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text"><Link href="/7-day-meditation-retreat" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>7-day meditation retreat</Link> — a full autumn immersion</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Common Questions</span>
            </div>
            <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
            <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
          </div>
        </section>

        {/* ── RELATED SEASONS NAV ── */}
        <nav className="med-shell" style={{ background: '#ffffff', padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/winter-retreat-himalayas" className="med-cta-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.7rem' }}>Winter Retreats</Link>
              <Link href="/spring-retreat-himalayas" className="med-cta-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.7rem' }}>Spring Retreats</Link>
              <Link href="/summer-retreat-himalayas" className="med-cta-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.7rem' }}>Summer Retreats</Link>
            </div>
          </div>
        </nav>

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell" style={{ background: '#f7f9f7', padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Retreats</span>
              </Link>
              <Link href="/retreats/himalayan-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Himalayan Retreats</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/retreats/summer-himalayan-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Summer Retreats</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/retreats/winter-himalayan-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Winter Retreats</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
            </div>
          </div>
        </nav>
      </article>
    </TrackedPage>
  );
}