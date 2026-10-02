import type { Metadata } from 'next';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import PrimaryCTA from '@/components/PrimaryCTA';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';

const PATH = '/yoga-retreat-zanskar';

const FAQ_ITEMS = [
  { question: 'Is there a regular fixed Yoga calendar in Zanskar?', answer: 'No. Zanskar is a custom, demand-led Yoga enquiry and does not have recurring fixed-departure inventory.' },
  { question: 'Can I request preferred dates?', answer: 'Yes. Share preferred dates, group size, Yoga interest, and experience through WhatsApp so the team can discuss whether a custom option is feasible.' },
  { question: 'Can a group enquire together?', answer: 'Yes. Group size can be discussed as part of the custom enquiry. No availability or dates are confirmed until the request is reviewed.' },
  { question: 'What is the regular Rishikesh alternative?', answer: 'Rishikesh has recurring published Yoga retreats with Weekend, 5-day, 7-day, and 10-day formats. Explore the Rishikesh product family for current dates and prices.' },
];

export const dynamic = 'force-static';
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: 'Custom Yoga Retreats in Zanskar | Retreats And Treks',
    description:
      'Custom Yoga retreat enquiries in Zanskar. Discuss preferred dates, group size, experience, and a suitable programme through WhatsApp.',
    alternates: {
      canonical: buildCanonicalUrl(PATH),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Custom Yoga Retreats in Zanskar | Retreats And Treks',
      description: 'Custom Yoga retreat enquiries in Zanskar. Discuss preferred dates, group size, experience, and a suitable programme through WhatsApp.',
      url: buildCanonicalUrl(PATH),
      type: 'website',
      siteName: 'Retreats And Treks',
      locale: 'en_IN',
      images: buildOgImages('Yoga Retreat Enquiry in Zanskar | Retreats And Treks'),
    },
  };
}

export default function YogaRetreatZanskarPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Yoga Retreats', url: buildCanonicalUrl('/yoga-retreats') },
    { name: 'Yoga Retreat in Zanskar', url: buildCanonicalUrl(PATH) },
  ]);
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <TrackedPage page={PATH} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumb items={[
        { name: 'Home', href: '/' },
        { name: 'Yoga Retreats', href: '/yoga-retreats' },
        { name: 'Yoga Retreat in Zanskar' },
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
        .med-card { background: #fff; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; box-shadow: 0 10px 30px rgba(15,31,28,0.05); transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.3s ease; position: relative; overflow: hidden; }
        .med-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: #0f766e; transform: scaleX(0); transform-origin: left; transition: transform 0.5s ease; z-index: 2; }
        .med-card:hover { transform: translateY(-6px); border-color: rgba(15,118,110,0.28); box-shadow: 0 22px 48px rgba(15,31,28,0.12); }
        .med-card:hover::before { transform: scaleX(1); }
        .med-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem 2.3rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; box-shadow: 0 10px 26px rgba(15,118,110,0.25); transition: all 0.3s ease; border: 1px solid #0f766e; }
        .med-cta-btn:hover { background: #0d6b64; transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,118,110,0.32); }
        .med-cta-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.85rem 1.8rem; border: 1px solid rgba(15,118,110,0.25); color: #0f766e; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; transition: all 0.3s ease; }
        .med-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: translateY(-2px); }
        .med-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .med-list-item { display: grid; grid-template-columns: 1.9rem 1fr; gap: 0.9rem; }
        .med-list-dot { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid rgba(15,118,110,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .med-list-dot-inner { width: 7px; height: 7px; border-radius: 50%; background: #0f766e; }
        .med-list-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.85; color: #4b5259; font-weight: 400; }
        .med-list-text strong { color: #2B2A26; font-weight: 600; }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } }
      `}</style>

      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '78vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/location/zanskar.webp" alt="Yoga retreat in Zanskar" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Yoga Retreat · On Request</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            Custom Yoga Retreats in Zanskar
          </h1>
          <p style={{ maxWidth: '42rem', margin: '0 auto 2rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: '#ffffff', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            Zanskar Yoga retreats are currently demand-led and arranged by enquiry. No fixed Yoga departure, set price, or published schedule is currently available. This page exists to help you request a suitable Yoga programme in a Himalayan setting without inventing business details.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['On Request', 'No Fixed Departure Published', 'Details by Enquiry'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '999px', padding: '0.45rem 0.9rem', background: 'rgba(15,118,110,0.35)' }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <TrackedWhatsAppLink
              href="https://wa.me/919760446101?text=Hi%2C%20I%27m%20interested%20in%20a%20Yoga%20Retreat%20in%20Zanskar.%20I%27d%20like%20to%20know%20about%20custom%2Fupcoming%20options."
              sourcePath={PATH}
              location="Zanskar"
              intent="Yoga retreat enquiry"
              analyticsEvent="yoga_whatsapp_click"
              product="Custom Yoga Retreat in Zanskar"
              ctaPosition="hero"
              className="med-cta-btn"
            >
              Ask About a Zanskar Yoga Retreat
            </TrackedWhatsAppLink>
            <Link href="/retreats/yoga-retreat-rishikesh" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>
              Rishikesh alternative
            </Link>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '2rem 1.5rem 0' }}>
        <PrimaryCTA
          label="Plan My Yoga Retreat"
          subtext="Share your preferred dates, duration, and Yoga experience so the team can confirm whether a custom or demand-led Zanskar request is suitable."
          vertical="retreat"
          category="yoga-and-movement"
          sourcePath={PATH}
          location="Zanskar"
        />
      </div>

      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">The Setting</span>
          </div>
          <h2 className="med-h2">Why Zanskar Can Suit a <span>Yoga Request</span></h2>
          <p className="med-body">
            Zanskar is a powerful setting for Yoga practice for people seeking a deeper, more remote Himalayan environment. The exact departure format, access window, group setup, accommodation, meals, and pricing remain unpublished until a request is reviewed with the team.
          </p>
          <p className="med-body" style={{ marginBottom: 0 }}>
            This page is intentionally demand-led. It does not claim a scheduled programme, certified facilitation, fixed price, or confirmed rooming arrangement. It exists to collect the right enquiry signal and route the request into the appropriate follow-up flow.
          </p>
        </div>
      </section>

      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Practice</span>
          </div>
          <h2 className="med-h2">What the Yoga Practice May <span>Include</span></h2>
          <div className="med-card" style={{ padding: '2rem' }}>
            <p className="med-body" style={{ marginBottom: 0 }}>
              The existing Yoga &amp; Movement service covers asana, pranayama, meditation, and restorative practice. For a Zanskar enquiry, the final session structure and programme details are not published until a date, group, and suitable route are confirmed. The team can discuss whether a custom arrangement is appropriate for your experience level and timing.
            </p>
          </div>
        </div>
      </section>

      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Who it suits</span>
          </div>
          <h2 className="med-h2">Best suited to <span>people who</span></h2>
          <ul className="med-list">
            <li className="med-list-item">
              <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
              <span className="med-list-text">want a deeper Himalayan Yoga request and are open to a custom or demand-led arrangement</span>
            </li>
            <li className="med-list-item">
              <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
              <span className="med-list-text">are comfortable discussing location, duration, group size, and preferred timing before a plan is confirmed</span>
            </li>
            <li className="med-list-item">
              <span className="med-list-dot"><span className="med-list-dot-inner" /></span>
              <span className="med-list-text">want a remote, more immersive setting and are happy to learn whether a custom programme is feasible before dates are published</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Next step</span>
          </div>
          <h2 className="med-h2">Share your <span>Zanskar enquiry</span></h2>
          <p className="med-body">
            If you are interested in a Zanskar Yoga request, share your preferred dates, group size, Yoga interest, and experience. The team can determine whether a custom request can be arranged and whether a more suitable option such as Rishikesh is the better fit for your goals.
          </p>
          <ul className="med-list" style={{ marginTop: '1.25rem' }}>
            <li className="med-list-item"><span className="med-list-dot"><span className="med-list-dot-inner" /></span><span className="med-list-text">Preferred dates or date range</span></li>
            <li className="med-list-item"><span className="med-list-dot"><span className="med-list-dot-inner" /></span><span className="med-list-text">Expected group size</span></li>
            <li className="med-list-item"><span className="med-list-dot"><span className="med-list-dot-inner" /></span><span className="med-list-text">Yoga interest and experience level</span></li>
          </ul>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <TrackedWhatsAppLink
              href="https://wa.me/919760446101?text=Hi%2C%20I%27m%20interested%20in%20a%20Yoga%20Retreat%20in%20Zanskar.%20I%27d%20like%20to%20know%20about%20custom%2Fupcoming%20options."
              sourcePath={PATH}
              location="Zanskar"
              intent="Yoga enquiry"
              analyticsEvent="yoga_whatsapp_click"
              product="Custom Yoga Retreat in Zanskar"
              ctaPosition="enquiry-section"
              className="med-cta-btn"
            >
              Ask About a Zanskar Yoga Retreat
            </TrackedWhatsAppLink>
            <Link href="/retreats/yoga-retreat-rishikesh" className="med-cta-outline">Explore Rishikesh Yoga</Link>
          </div>
        </div>
      </section>

      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow"><span className="med-eyebrow-line" /><span className="med-eyebrow-text">Common questions</span></div>
          <h2 className="med-h2">Zanskar Yoga <span>enquiries</span></h2>
          <TrackedFAQ items={FAQ_ITEMS} page={PATH} />
        </div>
      </section>
    </TrackedPage>
  );
}
