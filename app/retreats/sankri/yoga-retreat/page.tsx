import { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import PrimaryCTA from '@/components/PrimaryCTA';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import TrackedFAQ from '@/components/TrackedFAQ';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';

const PATH = '/retreats/sankri/yoga-retreat';

const FAQ_ITEMS = [
  { question: 'Is Sankri a fixed Yoga retreat?', answer: 'No. Sankri is a custom, demand-led Yoga opportunity and does not have recurring published departures.' },
  { question: 'Can I request custom dates?', answer: 'Yes. Share preferred dates, group size, and Yoga experience so the team can discuss whether a programme is feasible.' },
  { question: 'Can groups enquire?', answer: 'Yes. Group Yoga requests can be discussed through WhatsApp; dates, logistics, and programme details are confirmed individually.' },
  { question: 'Is Rishikesh available on fixed dates?', answer: 'Yes. Rishikesh is the Yoga location with recurring published departures, including Weekend, 5-day, 7-day, and 10-day formats.' },
];

export function generateMetadata(): Metadata {
  return {
    title: 'Custom Yoga Retreats in Sankri | Retreats And Treks',
    description:
      'Custom and group Yoga retreat enquiries in Sankri. Dates are arranged according to demand and logistics; no recurring fixed departure is published.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Custom Yoga Retreats in Sankri | Retreats And Treks',
      description: 'Custom and group Yoga retreat enquiries in Sankri. Dates are arranged according to demand and logistics; no recurring fixed departure is published.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      siteName: 'Retreats And Treks',
      locale: 'en_IN',
      images: buildOgImages('Yoga Retreat Enquiry in Sankri | Retreats And Treks'),
    },
  };
}

export default function SankriYogaRetreatPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Retreats', url: buildCanonicalUrl('/retreats') },
    { name: 'Sankri', url: buildCanonicalUrl('/retreats/sankri') },
    { name: 'Yoga Retreat', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumb items={[
        { name: 'Home', href: '/' },
        { name: 'Retreats', href: '/retreats' },
        { name: 'Sankri', href: '/retreats/sankri' },
        { name: 'Yoga Retreat' },
      ]} />
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
          <img className="med-hero-bg" src="/Images/location/sankri.webp" alt="Yoga retreat, Sankri" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Yoga Retreat · On Request</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Custom Yoga Retreats in Sankri
          </h1>
          <p style={{ maxWidth: '42rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Sankri Yoga retreats are demand-led and arranged by enquiry. No fixed Yoga departure is currently published. Dates, access, seasonal suitability, group arrangements, and the programme must be confirmed for each request.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['On Request', 'No Fixed Departure Published', 'Details Confirmed by Enquiry'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '999px', padding: '0.45rem 0.9rem', background: 'rgba(15,118,110,0.35)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <TrackedWhatsAppLink
              href="https://wa.me/919760446101?text=Hi%2C%20I%27m%20interested%20in%20a%20Yoga%20Retreat%20in%20Sankri.%20I%27d%20like%20to%20know%20about%20custom%2Fupcoming%20options."
              sourcePath={PATH}
              location="Sankri"
              intent="Yoga retreat enquiry"
              analyticsEvent="yoga_whatsapp_click"
              product="Custom Yoga Retreat in Sankri"
              ctaPosition="hero"
              className="med-cta-btn"
            >
              Ask About a Sankri Yoga Retreat
            </TrackedWhatsAppLink>
            <Link href="/retreats/yoga-retreat-rishikesh" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>See Rishikesh Yoga Retreats</Link>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '2rem 1.5rem 0' }}>
        <PrimaryCTA
          label="Ask About a Sankri Yoga Retreat"
          subtext="Share your preferred dates, group size, and practice level so we can assess whether Sankri is the right setting."
          vertical="retreat"
          category="yoga-and-movement"
          sourcePath={PATH}
          location="Sankri"
        />
      </div>

      {/* ── WHY SANKRI WORKS ── */}
      <section id="why-sankri" className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Setting</span>
          </div>
          <h2 className="med-h2">Why Sankri Works for <span>Yoga</span></h2>
          <p className="med-body">
            Sankri Yoga requests are demand-led. The page does not represent a scheduled group departure or a confirmed venue. The proposed location, access, travel conditions, and suitability must be reviewed for the dates and group being considered.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            Share your Yoga experience, mobility or health considerations, group size, and preferred dates. The team can then confirm whether a custom programme is feasible. No altitude, season, facilitator, or daily schedule claim is made for an unpublished departure.
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
            <p className="med-body" style={{ marginBottom: 0 }}>
              The existing Yoga &amp; Movement service describes asana, pranayama, meditation, and restorative practice. Which sessions, schedule, setting, equipment, stay, and meals can be offered in Sankri is not currently published and must be confirmed for each enquiry.
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

          <p className="med-body" style={{ marginBottom: '1rem' }}>
            No suitable season or access window is currently published for a Sankri Yoga departure. Weather, road access, altitude suitability, and travel logistics must be checked for the requested dates.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            If you want to explore the primary recurring Yoga destination instead, see the{' '}
            <Link href="/retreats/yoga-retreat-rishikesh" style={{ color: '#0f766e', fontWeight: 600 }}>
              regular Rishikesh Yoga retreats
            </Link>{' '}
            with published recurring departures.
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
                <span className="med-list-text">People interested in asking about a custom Yoga programme in Sankri</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Practitioners willing to share experience and access needs so suitability can be assessed</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Groups whose travel, accommodation, and logistics can be confirmed before committing</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Groups asking whether Yoga can be combined with other activities, subject to confirmation</span>
              </li>
              <li className="med-list-item">
                <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
                <span className="med-list-text">Travellers who can be flexible about dates while a demand-led request is reviewed</span>
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
              Send your preferred dates, group size, and practice level. The team will review whether a Sankri programme can be arranged and confirm venue, access, season, facilitator, schedule, stay, and pricing before you commit.
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
                  <Link href="/retreats/sankri/meditation-retreat" style={{ color: '#0f766e', fontWeight: 600 }}>
                    Meditation retreat in Sankri
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
          <img src="/Images/location/sankri.webp" alt="Sankri yoga retreat setting" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.86)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '42rem', padding: '4rem 1.5rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.5rem, 2.9vw, 2.1rem)', fontWeight: 500, color: '#F6F2E7' }}>Ask about a Sankri Yoga request</h2>
          <p style={{ margin: '0 0 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: 'rgba(246,242,231,0.78)' }}>Share your dates, group size, and practice level — we&apos;ll help you decide if Sankri is the right mountain container.</p>
          <TrackedWhatsAppLink
            href="https://wa.me/919760446101?text=Hi%2C%20I%27m%20interested%20in%20a%20Yoga%20Retreat%20in%20Sankri.%20I%27d%20like%20to%20know%20about%20custom%2Fupcoming%20options."
            sourcePath={PATH}
            location="Sankri"
            intent="Yoga retreat enquiry"
            analyticsEvent="yoga_whatsapp_click"
            product="Custom Yoga Retreat in Sankri"
            ctaPosition="closing"
            className="med-cta-btn"
          >
            WhatsApp Us
          </TrackedWhatsAppLink>
        </div>
      </section>

      <section className="med-shell" style={{ background: '#ffffff', padding: '3rem 0' }}>
        <div className="med-inner" style={{ textAlign: 'center' }}>
          <p className="med-body" style={{ marginBottom: '0.8rem' }}>Looking for regular Yoga retreat departures?</p>
          <Link href="/retreats/yoga-retreat-rishikesh" className="med-cta-outline">Explore Yoga retreats in Rishikesh →</Link>
        </div>
      </section>

      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow"><span className="med-eyebrow-line" /><span className="med-eyebrow-text">Common questions</span></div>
          <h2 className="med-h2">Sankri Yoga <span>enquiries</span></h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
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
    </TrackedPage>
  );
}
