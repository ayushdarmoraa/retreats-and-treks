import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';

export function generateMetadata(): Metadata {
  return {
    title: 'Meditation Retreat in Sankri | High Altitude Practice',
    description:
      'Meditation retreat in Sankri basecamp at high altitude. Available on request for small groups seeking deep practice in silence.',
    alternates: {
      canonical: buildCanonicalUrl('/retreats/sankri/meditation-retreat'),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Meditation Retreat in Sankri | High Altitude Practice',
      description: 'Meditation retreat in Sankri basecamp at high altitude. Available on request for small groups seeking deep practice in silence.',
      url: buildCanonicalUrl('/retreats/sankri/meditation-retreat'),
      type: 'website',
      siteName: 'Retreats And Treks',
      locale: 'en_IN',
      images: buildOgImages('Meditation Retreat in Sankri | High Altitude Practice'),
    },
  };
}

export default function SankriMeditationRetreatPage() {
  return (
    <main style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
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

        .med-season-card { padding: 1.6rem; }
        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }
      `}</style>

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '78vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/location/sankri.webp" alt="Meditation retreat, Sankri" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>High Altitude &middot; Basecamp</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Meditation Retreat in Sankri
          </h1>
          <p style={{ maxWidth: '42rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Deep meditation practice in the high Himalayas for small groups seeking silence, altitude, and real separation from daily noise. Available on request during suitable Sankri travel windows.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['High Altitude', 'Small Groups', 'On Request', 'Remote Basecamp'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '999px', padding: '0.45rem 0.9rem', background: 'rgba(15,118,110,0.35)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/919760446101?text=Hi%2C%20I%27m%20interested%20in%20a%20meditation%20retreat%20in%20Sankri."
              className="med-cta-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
            <a href="#why-sankri" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Why Sankri</a>
          </div>
        </div>
      </section>

      {/* ── WHY SANKRI WORKS ── */}
      <section id="why-sankri" className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Setting</span>
          </div>
          <h2 className="med-h2">Why Sankri Works for <span>Meditation</span></h2>
          <p className="med-body">
            Sankri creates a different kind of meditation container from an accessible forest
            retreat or river-valley ashram setting. It is a remote basecamp in the upper Tons
            Valley, close to the Govind Pashu Vihar landscape and the routes toward Kedarkantha
            and Har Ki Dun. The journey itself asks for intention, and that seriousness helps
            the practice begin before the first formal sitting.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            The altitude, colder air, long travel, and mountain silence naturally slow the
            mind. Sankri is suited to people who want meditation to be supported by terrain,
            not comfort. The land is not soft or decorative here; it asks you to arrive fully
            and pay attention.
          </p>
        </div>
      </section>

      {/* ── WHAT PRACTICE CAN INCLUDE ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Practice</span>
          </div>
          <h2 className="med-h2">What Practice Can <span>Include</span></h2>
          <div className="med-card" style={{ padding: '2rem' }}>
            <p className="med-body">
              A Sankri meditation retreat can combine seated practice, walking meditation,
              riverside sitting, silent meals, journaling, and slow forest movement. The exact
              rhythm depends on the group, season, weather, and whether the retreat includes
              light trekking.
            </p>
            <p className="med-body" style={{ marginBottom: 0 }}>
              Practice may happen at basecamp, along quiet forest transitions, beside the Tons
              River, or in open meadow settings when conditions allow. The aim is not to copy a
              fixed monastery schedule, but to use Sankri&apos;s remoteness and altitude as part
              of the meditation itself.
            </p>
          </div>
        </div>
      </section>

      {/* ── BEST SEASON & SUITABILITY ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Timing It Right</span>
          </div>
          <h2 className="med-h2">Best Season and <span>Suitability</span></h2>

          <div className="med-grid-2" style={{ marginTop: '0.5rem', marginBottom: '1.6rem' }}>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Clearest Window</span>
              <h3 className="med-h3">September to October</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Usually offers the clearest skies, stable weather, and a sharper quality of
                silence.
              </p>
            </div>
            <div className="med-card med-season-card">
              <span className="med-season-tag">Second Window</span>
              <h3 className="med-h3">May to June</h3>
              <p className="med-body" style={{ marginBottom: 0 }}>
                Brings longer daylight and access to higher trails before heavier monsoon
                conditions.
              </p>
            </div>
          </div>

          <p className="med-body" style={{ marginBottom: 0 }}>
            Sankri is not ideal for everyone. The approach from Dehradun is long, the setting
            is remote, and altitude requires basic fitness and patience. If you want easier
            access or a gentler introduction to silence, compare this with the broader{' '}
            <Link href="/retreats/journeys/meditation-and-silence" style={{ color: '#0f766e', fontWeight: 600 }}>
              Meditation &amp; Silence
            </Link>{' '}
            retreat journey.
          </p>
        </div>
      </section>

      {/* ── IDEAL FOR ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Who It&apos;s For</span>
          </div>
          <h2 className="med-h2">Ideal <span>For</span></h2>

          <div className="med-card" style={{ padding: '2rem' }}>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Practitioners seeking silence in a remote Himalayan basecamp setting</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Small groups comfortable with altitude, simple conditions, and long travel</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">People drawn to walking meditation, riverside sitting, and mountain stillness</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Participants who want retreat and trekking energy to support each other</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Those seeking clarity through terrain, distance, and reduced external noise</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── AVAILABLE ON REQUEST ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '0 0 3rem' }}>
        <div className="med-inner">
          <div className="med-card" style={{ padding: '2rem' }}>
            <h2 className="med-h3" style={{ fontSize: '1.3rem', marginBottom: '0.9rem' }}>Available on Request</h2>
            <p className="med-body" style={{ marginBottom: 0 }}>
              We organise meditation retreats in Sankri based on season, group readiness,
              travel feasibility, and the level of silence required. Share your preferred
              dates, group size, and meditation experience, and we will help decide whether
              Sankri is the right container.
            </p>
          </div>
        </div>
      </section>

      {/* ── RELATED SANKRI RETREATS & TREKS ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Keep Exploring</span>
          </div>
          <h2 className="med-h2">Explore Related Sankri <span>Retreats and Treks</span></h2>

          <div className="med-card" style={{ padding: '1.6rem 1.8rem' }}>
            <ul className="med-list">
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">
                  <Link href="/retreats/sankri" style={{ color: '#0f766e', fontWeight: 600 }}>
                    Sankri retreat hub
                  </Link>
                </span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">
                  <Link href="/retreats/sankri/weekend-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>
                    Weekend retreat in Sankri
                  </Link>
                </span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">
                  <Link href="/retreats/sankri/yoga-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>
                    Yoga retreat in Sankri
                  </Link>
                </span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">
                  <Link href="/treks/location/sankri/kedarkantha-trek" style={{ color: '#0f766e', fontWeight: 600 }}>
                    Kedarkantha trek from Sankri
                  </Link>
                </span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">
                  <Link href="/treks/location/sankri/har-ki-dun-trek" style={{ color: '#0f766e', fontWeight: 600 }}>
                    Har Ki Dun trek from Sankri
                  </Link>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '44vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/location/sankri.webp" alt="Sankri meditation retreat setting" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.86)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '42rem', padding: '4rem 1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.5rem, 2.9vw, 2.1rem)', fontWeight: 500, color: '#F6F2E7' }}>Interested in deep practice at altitude?</h2>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: 'rgba(246,242,231,0.78)' }}>Share your dates, group size, and experience level — we&apos;ll help you decide if Sankri is the right container.</p>
          <a
            href="https://wa.me/919760446101?text=Hi%2C%20I%27m%20interested%20in%20a%20meditation%20retreat%20in%20Sankri."
            className="med-cta-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <nav className="med-shell" style={{ background: '#ffffff' }}>
        <div className="med-inner" style={{ borderTop: '1px solid rgba(15,118,110,0.1)', padding: '2rem 1.5rem 3.5rem' }}>
          <Link href="/retreats/sankri" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
            ← Sankri Retreat Hub
          </Link>
        </div>
      </nav>
    </main>
  );
}
