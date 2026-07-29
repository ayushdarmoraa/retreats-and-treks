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
import PrimaryCTA from '@/components/PrimaryCTA';
import AutoArticleSchema from '@/components/AutoArticleSchema';

const PATH = '/retreats/weekend-retreat-near-delhi';

export function generateMetadata(): Metadata {
  return {
    title: 'Weekend Retreat Near Delhi | Retreats And Treks',
    description:
      'Weekend retreat near Delhi in Chakrata with forests, waterfalls, mountain villages, Himalayan culture, and a peaceful reset from city stress.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Weekend Retreat Near Delhi: A Mountain Reset in the Himalayas',
      description:
        'Weekend retreat near Delhi in Chakrata with forests, waterfalls, mountain villages, Himalayan culture, and a peaceful reset from city stress.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      images: buildOgImages('Weekend Retreat Near Delhi: A Mountain Reset in the Himalayas'),
    },
  };
}

const FAQ_ITEMS = [
  {
    question: 'How far is Chakrata from Delhi?',
    answer:
      'Chakrata is located in Uttarakhand and can be reached by road from Delhi in approximately 6–7 hours. It is also about a 3-hour drive from Dehradun.',
  },
  {
    question: 'Is a weekend retreat enough to feel a difference?',
    answer:
      'A weekend retreat cannot solve every challenge of modern life. However, even a short period away from constant work pressure can help people reconnect with themselves, nature, and a slower rhythm of living. Many participants return home feeling mentally lighter, more focused, and more present.',
  },
  {
    question: 'What is included in the retreat?',
    answer:
      'The retreat includes comfortable accommodation in a peaceful mountain setting, freshly prepared local meals, guided exploration of natural places, small group experiences, and time for rest and reflection.',
  },
  {
    question: 'Do I need previous trekking or yoga experience?',
    answer:
      'No. The retreat involves light exploration such as forest walks, waterfall visits, and village walks. No previous experience is required.',
  },
  {
    question: 'Is the retreat suitable for solo travelers?',
    answer:
      'Yes. Many participants join alone and enjoy meeting like-minded people during the retreat.',
  },
  {
    question: 'What places will I explore during the retreat?',
    answer:
      'Depending on the retreat, participants may explore Tiger Falls, Moila Top, Budher Caves, Chilmiri Sunset Viewpoint, and traditional Jaunsaari villages in the Chakrata region.',
  },
];

export default function WeekendRetreatNearDelhiPage() {
  validateFAQSync(FAQ_ITEMS, PATH);

  const canonicalUrl = buildCanonicalUrl(PATH);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Weekend Retreat Near Delhi', url: canonicalUrl },
  ]);

  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  const CHAKRATA_PLACES = ['Tiger Falls', 'Moila Top', 'Budher Caves', 'Chilmiri Sunset Viewpoint', 'Traditional Jaunsaari Villages'];

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Weekend Retreat Near Delhi"
        description="Escape the stress of city life with a peaceful weekend retreat near Delhi. Explore forests, waterfalls, mountain villages, and authentic Himalayan culture in Chakrata."
        path={PATH}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Retreats', href: '/retreats' },
          { name: 'Weekend Retreat Near Delhi' },
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

        .med-check-list { padding-left: 0; margin: 0 0 1rem; list-style: none; display: flex; flex-direction: column; gap: 0.7rem; }
        .med-check-item { display: flex; align-items: flex-start; gap: 0.75rem; }
        .med-check-badge { width: 20px; height: 20px; border-radius: 50%; background: #0f766e; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 0.15rem; font-size: 0.62rem; color: #fff; font-weight: 700; }
        .med-check-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.8; color: #4b5259; font-weight: 400; }

        .med-place-card { background: #fff; border: 1px solid rgba(15,118,110,0.12); border-radius: 10px; padding: 1rem 1.25rem; box-shadow: 0 6px 18px rgba(15,31,28,0.04); }
        .med-place-name { font-family: var(--font-inter), sans-serif; font-size: 0.88rem; font-weight: 600; color: #2B2A26; margin: 0; }

        .med-travel-card { background: #f7f9f7; border: 1px solid rgba(15,118,110,0.12); border-radius: 12px; padding: 1.25rem 1.5rem; }
        .med-travel-label { font-family: var(--font-inter), sans-serif; font-size: 0.85rem; font-weight: 700; color: #2B2A26; margin: 0 0 0.4rem; }

        .med-nav-group { border: 1px solid rgba(15,118,110,0.14); border-radius: 14px; overflow: hidden; background: #fff; }
        .med-nav-link { display: flex; align-items: center; justify-content: space-between; padding: 0.9rem 1.2rem; border-bottom: 1px solid rgba(15,118,110,0.08); font-family: var(--font-inter), sans-serif; font-size: 0.9rem; font-weight: 500; color: #2B2A26; text-decoration: none; transition: background 0.25s ease, color 0.25s ease; }
        .med-nav-link:last-child { border-bottom: none; }
        .med-nav-link:hover { background: #f7f9f7; color: #0f766e; }
        .med-nav-link::after { content: '→'; color: #0f766e; }
      `}</style>

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '78vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/location/chakrata.webp" alt="Weekend retreat near Delhi, Chakrata" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Weekend Retreats &middot; Near Delhi</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.1rem, 4.4vw, 3.2rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.1, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Weekend Retreat Near Delhi: A Mountain Reset in the Himalayas
          </h1>
          <p style={{ maxWidth: '40rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.02rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Forests, waterfalls, mountain villages, and authentic Himalayan culture in Chakrata — a peaceful reset from city stress, just 6–7 hours from Delhi.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/919760446101?text=${encodeURIComponent("Hi, I'm interested in a weekend retreat near Delhi in Chakrata. Can you tell me more?")}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Plan My Weekend Retreat</a>
            <a href="#chakrata" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Explore Chakrata</a>
          </div>
        </div>
      </section>

      {/* ── WHY PEOPLE LOOK ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Need</span>
          </div>
          <h2 className="med-h2">Why people look for <span>weekend retreats</span> near Delhi</h2>
          <p className="med-body">Life in large cities like Delhi moves at an exhausting pace.</p>
          <p className="med-body">Long working hours, constant notifications, traffic, and crowded urban spaces often leave people feeling mentally drained. Many professionals, entrepreneurs, and remote workers eventually realize they need a short break from the intensity of city life.</p>
          <p className="med-body">This is why weekend retreats near Delhi have become increasingly popular.</p>
          <p className="med-body">Instead of long vacations that require extensive planning, a weekend retreat offers a simple way to step away from work and spend a few days reconnecting with nature, quiet environments, and slower rhythms of living.</p>
          <p className="med-body" style={{ marginBottom: 0 }}>For many people, even a short mountain retreat can create the mental space needed to recharge and regain clarity.</p>
        </div>
      </section>

      {/* ── WHY MOUNTAINS ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Setting</span>
          </div>
          <h2 className="med-h2">Why the mountains are <span>ideal</span> for short retreats</h2>
          <p className="med-body">The Himalayan foothills surrounding Delhi offer a completely different environment from urban life.</p>
          <p className="med-body">Dense forests, quiet villages, waterfalls, and wide mountain views create a natural setting where the mind can relax.</p>
          <p className="med-body">Places like Chakrata are especially suited for retreats because they remain relatively peaceful compared to crowded hill stations.</p>
          <p className="med-body">Visitors can spend their time walking through forests, exploring waterfalls, visiting traditional villages, and enjoying fresh mountain air.</p>
          <p className="med-body" style={{ marginBottom: 0 }}>These simple experiences often provide exactly what people are searching for when they look for a retreat: space to slow down.</p>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">What to Expect</span>
          </div>
          <h2 className="med-h2">What to expect from a <span>weekend retreat</span></h2>
          <div className="med-card" style={{ padding: '2rem' }}>
            <p className="med-body">A well-designed weekend retreat usually includes:</p>
            <ul className="med-check-list">
              <li className="med-check-item"><span className="med-check-badge">✓</span><span className="med-check-text">Comfortable accommodation in a peaceful mountain setting</span></li>
              <li className="med-check-item"><span className="med-check-badge">✓</span><span className="med-check-text">Freshly prepared local meals</span></li>
              <li className="med-check-item"><span className="med-check-badge">✓</span><span className="med-check-text">Guided exploration of natural places</span></li>
              <li className="med-check-item"><span className="med-check-badge">✓</span><span className="med-check-text">Small group experiences</span></li>
              <li className="med-check-item"><span className="med-check-badge">✓</span><span className="med-check-text">Time for rest and reflection</span></li>
            </ul>
            <p className="med-body">Rather than filling every moment with activities, the goal is to create a balance between exploration and relaxation.</p>
            <p className="med-body" style={{ marginBottom: 0 }}>Participants often spend time visiting scenic locations, walking through forests, watching sunsets over mountain valleys, and sharing conversations around a bonfire in the evening.</p>
          </div>
        </div>
      </section>

      {/* ── CHAKRATA ── */}
      <section id="chakrata" className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Destination</span>
          </div>
          <h2 className="med-h2">A retreat experience in <span>Chakrata</span></h2>
          <p className="med-body">Chakrata is one of the most peaceful mountain regions within reach of Delhi.</p>
          <p className="med-body">Surrounded by forests and waterfalls, the region offers a natural environment ideal for retreats and nature immersion.</p>
          <p className="med-body">During a retreat in Chakrata, participants may explore places such as:</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.9rem', margin: '1.5rem 0' }}>
            {CHAKRATA_PLACES.map((place) => (
              <div key={place} className="med-place-card">
                <p className="med-place-name">{place}</p>
              </div>
            ))}
          </div>

          <p className="med-body" style={{ marginBottom: 0 }}>The combination of natural landscapes and local culture creates an experience that feels very different from the fast-paced environment of city life.</p>
        </div>
      </section>

      {/* ── WHY CHAKRATA ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Difference</span>
          </div>
          <h2 className="med-h2">Why Chakrata is <span>better</span> than crowded hill stations</h2>
          <p className="med-body">Most popular hill stations near Delhi — Mussoorie, Manali, Shimla — have become heavily commercialized. Weekend traffic jams, noisy markets, and crowded viewpoints often defeat the purpose of going to the mountains for rest.</p>
          <div className="med-card" style={{ padding: '2rem' }}>
            <p className="med-body">Chakrata offers a very different experience:</p>
            <ul className="med-check-list" style={{ marginBottom: 0 }}>
              <li className="med-check-item"><span className="med-check-badge">✓</span><span className="med-check-text">Quieter than Mussoorie — no Mall Road crowds, no tourist congestion</span></li>
              <li className="med-check-item"><span className="med-check-badge">✓</span><span className="med-check-text">Less commercial than Manali — no overpriced tourist traps, no party culture</span></li>
              <li className="med-check-item"><span className="med-check-badge">✓</span><span className="med-check-text">A more peaceful environment designed for retreats — forests, waterfalls, and open mountain views</span></li>
              <li className="med-check-item"><span className="med-check-badge">✓</span><span className="med-check-text">Better for nature immersion — authentic Jaunsaari villages, quiet forest trails, and undisturbed landscapes</span></li>
            </ul>
          </div>
          <p className="med-body" style={{ marginTop: '1.6rem', marginBottom: 0 }}>For people looking for a genuine retreat experience rather than a tourist holiday, Chakrata provides the kind of environment where real rest and reflection become possible.</p>
        </div>
      </section>

      {/* ── RETREATS YOU CAN JOIN ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Our Retreats</span>
          </div>
          <h2 className="med-h2">Retreats you can <span>join</span></h2>
          <p className="med-body">You can join several types of retreats designed to help people disconnect from stress and reconnect with nature.</p>

          <div className="med-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 className="med-h3">
              <Link href="/retreats/journeys/burnout-recovery" style={{ color: '#0f766e', textDecoration: 'none' }}>
                Burnout Recovery Retreat
              </Link>
            </h3>
            <p className="med-body">A weekend retreat designed for people feeling mentally exhausted from work or city life.</p>
            <p className="med-body">Participants spend three days exploring forests, waterfalls, and mountain villages while enjoying peaceful evenings and authentic local food.</p>
            <Link href="/retreats/journeys/burnout-recovery" style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#0f766e', textDecoration: 'none' }}>
              Learn more about this retreat →
            </Link>
          </div>

          <PrimaryCTA label="Talk to Us About Retreats" subtext="Not sure which retreat is right for you? We can help you choose." vertical="retreat" category="weekend" sourcePath={PATH} />
        </div>
      </section>

      {/* ── HOW FAR ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Getting There</span>
          </div>
          <h2 className="med-h2">How far is <span>Chakrata</span> from Delhi</h2>
          <p className="med-body">Chakrata is located in Uttarakhand and can be reached by road from Delhi in approximately 6–7 hours.</p>
          <p className="med-body">The route passes through scenic landscapes as it gradually climbs into the Himalayan foothills.</p>
          <p className="med-body">The town is also about a 3-hour drive from Dehradun, making it accessible for travelers arriving by train or flight.</p>
          <p className="med-body">Because Chakrata remains less commercialized than many other hill stations, it provides a quieter environment ideal for retreats.</p>

          <div className="med-grid-2" style={{ marginTop: '1.6rem' }}>
            <div className="med-travel-card">
              <p className="med-travel-label">From Delhi</p>
              <p className="med-body" style={{ marginBottom: 0 }}>Approximately 6–7 hours by road.</p>
            </div>
            <div className="med-travel-card">
              <p className="med-travel-label">From Dehradun</p>
              <p className="med-body" style={{ marginBottom: 0 }}>About a 3-hour drive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Is It Right for You</span>
          </div>
          <h2 className="med-h2">Who this retreat is <span>perfect for</span></h2>
          <div className="med-card" style={{ padding: '2rem' }}>
            <p className="med-body">People who benefit most from a weekend retreat near Delhi often include:</p>
            <ul className="med-check-list" style={{ marginBottom: 0 }}>
              <li className="med-check-item"><span className="med-check-badge">✓</span><span className="med-check-text">Professionals feeling overwhelmed by work stress</span></li>
              <li className="med-check-item"><span className="med-check-badge">✓</span><span className="med-check-text">Entrepreneurs who rarely disconnect from their business</span></li>
              <li className="med-check-item"><span className="med-check-badge">✓</span><span className="med-check-text">Remote workers spending long hours on screens</span></li>
              <li className="med-check-item"><span className="med-check-badge">✓</span><span className="med-check-text">People who need a short nature escape without long travel</span></li>
            </ul>
          </div>
          <p className="med-body" style={{ marginTop: '1.6rem' }}>Many participants join retreats simply because they feel mentally exhausted and want a few days away from the noise of city life.</p>
          <p className="med-body" style={{ marginBottom: 0 }}>A peaceful mountain environment, simple daily routines, and time in nature often provide exactly the reset they are looking for.</p>
        </div>
      </section>

      {/* ── IS IT ENOUGH ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Reset</span>
          </div>
          <h2 className="med-h2">Is a weekend retreat <span>enough</span> to reset?</h2>
          <p className="med-body">A weekend retreat cannot solve every challenge of modern life.</p>
          <p className="med-body">However, even a short period away from constant work pressure can help people reconnect with themselves, nature, and a slower rhythm of living.</p>
          <div className="med-card" style={{ padding: '2rem' }}>
            <p className="med-body">Many retreat participants return home feeling:</p>
            <ul className="med-check-list" style={{ marginBottom: 0 }}>
              <li className="med-check-item"><span className="med-check-badge">✓</span><span className="med-check-text">Mentally lighter</span></li>
              <li className="med-check-item"><span className="med-check-badge">✓</span><span className="med-check-text">More focused</span></li>
              <li className="med-check-item"><span className="med-check-badge">✓</span><span className="med-check-text">More present</span></li>
            </ul>
          </div>
          <p className="med-body" style={{ marginTop: '1.6rem', marginBottom: '1.8rem' }}>Sometimes a few quiet days in the mountains can provide exactly the reset people need.</p>
          <PrimaryCTA label="Plan My Weekend Retreat" subtext="Ready to step away? Let us help you plan it." vertical="retreat" category="weekend" sourcePath={PATH} />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Common Questions</span>
          </div>
          <h2 className="med-h2">Frequently Asked <span>Questions</span></h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>

      {/* ── RELATED LINKS ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Explore More</span>
          </div>
          <h2 className="med-h2">Related <span>Pages</span></h2>
          <div className="med-nav-group">
            <Link href="/retreats/journeys/weekend-retreat" className="med-nav-link">Weekend Retreat Journey</Link>
            <Link href="/retreats/journeys/burnout-recovery" className="med-nav-link">Burnout Recovery Retreat</Link>
            <Link href="/retreats/journeys/rest-and-reset" className="med-nav-link">Rest &amp; Reset Retreat</Link>
            <Link href="/retreats/chakrata" className="med-nav-link">Retreats in Chakrata</Link>
            <Link href="/retreats/weekend-himalayan-retreats" className="med-nav-link">Weekend Himalayan Retreats</Link>
            <Link href="/retreats" className="med-nav-link">All Retreats</Link>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '44vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/location/chakrata.webp" alt="Chakrata weekend retreat setting" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.86)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '42rem', padding: '4rem 1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.5rem, 2.9vw, 2.1rem)', fontWeight: 500, color: '#F6F2E7' }}>Ready for a weekend reset in the mountains?</h2>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: 'rgba(246,242,231,0.78)' }}>Talk with us about dates, group size, and the right retreat format for you.</p>
          <a href={`https://wa.me/919760446101?text=${encodeURIComponent('Hi, I want to plan a weekend retreat near Delhi in Chakrata. Can we discuss dates and options?')}`} className="med-cta-btn" target="_blank" rel="noopener noreferrer">Plan My Weekend Retreat</a>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <nav className="med-shell" style={{ background: '#ffffff' }}>
        <div className="med-inner" style={{ borderTop: '1px solid rgba(15,118,110,0.1)', padding: '2rem 1.5rem 3.5rem' }}>
          <Link href="/retreats" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
            ← All Retreats
          </Link>
        </div>
      </nav>
    </TrackedPage>
  );
}
