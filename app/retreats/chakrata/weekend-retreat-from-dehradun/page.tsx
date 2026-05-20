import { Metadata } from 'next';
import Link from 'next/link';
import retreat from '@/content/retreats/chakrata/weekend-retreat-from-dehradun';
import { generateRetreatSchema, generateFAQSchema } from '@/components/seo/Schema';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema } from '@/components/seo/Breadcrumbs';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';

const PATH = '/retreats/chakrata/weekend-retreat-from-dehradun';

export function generateMetadata(): Metadata {
  return {
    title: 'Chakrata Weekend Retreat | Retreats And Treks',
    description: retreat.description,
    alternates: { canonical: buildCanonicalUrl(PATH) },
    openGraph: {
      title: 'Chakrata Weekend Retreat | Retreats And Treks',
      description: retreat.description,
      url: buildCanonicalUrl(PATH),
      type: 'website',
      siteName: 'Retreats And Treks',
      locale: 'en_IN',
      images: buildOgImages('Chakrata Weekend Retreat | Retreats And Treks'),
    },
  };
}

export default function Page() {
  const retreatSchema = generateRetreatSchema(retreat);
  const faqSchema = generateFAQSchema(retreat.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Retreats', path: '/retreats/chakrata' },
    { name: 'Weekend Retreat From Dehradun', path: PATH },
  ]);
  const wa = `https://wa.me/919760446101?text=${encodeURIComponent(`Hi, I'm interested in the ${retreat.title}.`)}`;

  return (
    <TrackedPage page={PATH}>
      <style>{`
        .ckw-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }
        .ckw-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .ckw-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); }
        .ckw-eyebrow-text { font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase; color: #374151; font-weight: 500; }
        .ckw-section-title { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200; letter-spacing: -0.03em; color: #111; line-height: 1.15; margin: 0 0 2rem; }
        .ckw-section-title span { color: #374151; }
        .ckw-cta-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 2.25rem; background: var(--color-primary); color: #fff; text-decoration: none; font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.06em; border-radius: 100px; transition: background 0.2s, transform 0.2s; }
        .ckw-cta-btn:hover { background: #0d9e95; transform: translateY(-2px); }
        .ckw-cta-outline { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.7rem 1.8rem; border: 1px solid rgba(15,118,110,0.3); color: var(--color-primary); text-decoration: none; font-family: var(--font-geist-sans), sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.04em; border-radius: 100px; transition: all 0.2s; }
        .ckw-cta-outline:hover { border-color: var(--color-primary); background: rgba(15,118,110,0.04); }
        .ckw-faq-item { border-bottom: 1px solid #eef0ee; padding: 1.5rem 0; }
        .ckw-faq-item:last-child { border-bottom: none; }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(retreatSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Retreats', href: '/retreats' }, { name: 'Chakrata', href: '/retreats/chakrata' }, { name: 'Weekend Retreat' }]} />

      {/* HERO */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '65vh', textAlign: 'center', paddingTop: '68px' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/trek/region/chakraweekend.webp" width={800} height={448} alt="Weekend retreat campsite in Chakrata forest, Uttarakhand" fetchPriority="high" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.88) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '44rem', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', justifyContent: 'center' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.5)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>Chakrata · {retreat.duration} · From Dehradun</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 200, color: '#fff', margin: '0 0 1rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>{retreat.title}</h1>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.92rem', fontWeight: 300, lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', margin: '0 0 1.5rem', maxWidth: '36rem' }}>{retreat.description}</p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {['Pickup from Dehradun', retreat.duration, 'All meals included', 'Ideal first retreat'].map((t) => (
              <span key={t} style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>{t}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href={wa} className="ckw-cta-btn" style={{ background: '#fff', color: '#0a3d35', fontWeight: 600 }}>Book This Retreat →</a>
            <Link href="/retreats/chakrata" className="ckw-cta-btn" style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,0.4)' }}>All Chakrata Experiences</Link>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="ckw-inner">
          <div className="ckw-eyebrow"><span className="ckw-eyebrow-line" /><span className="ckw-eyebrow-text">Overview</span></div>
          <h2 className="ckw-section-title">A short but <span>deeply refreshing</span> break</h2>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.95rem', lineHeight: 1.85, color: '#444', fontWeight: 300, margin: '0 0 2.5rem' }}>{retreat.overview}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {retreat.highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', padding: '1rem', background: '#f7f9f7', borderRadius: '8px', border: '1px solid #eef0ee' }}>
                <span style={{ color: 'var(--color-primary)', fontSize: '0.75rem', flexShrink: 0, marginTop: '2px' }}>✓</span>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', color: '#444', fontWeight: 300, lineHeight: 1.5 }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ITINERARY */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="ckw-inner">
          <div className="ckw-eyebrow"><span className="ckw-eyebrow-line" /><span className="ckw-eyebrow-text">Daily Schedule</span></div>
          <h2 className="ckw-section-title">Your <span>weekend itinerary</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {retreat.itinerary.map((day, i, arr) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2.5rem 1fr', gap: '0 1rem', paddingBottom: i < arr.length - 1 ? '1.5rem' : 0, borderBottom: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none', paddingTop: i > 0 ? '1.5rem' : 0 }}>
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.6rem', fontWeight: 600, color: 'var(--color-primary)', letterSpacing: '0.1em', paddingTop: '0.15rem' }}>{String(i + 1).padStart(2, '0')}</span>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', lineHeight: 1.75, color: '#444', fontWeight: 300, margin: 0 }}>{day}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MID CTA */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#0a1f1c', padding: '3.5rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '44rem', margin: '0 auto', padding: '0 2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 200, color: '#fff', margin: '0 0 0.6rem' }}>Your weekend escape starts here</h3>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', fontWeight: 300, margin: '0 0 1.5rem', lineHeight: 1.7 }}>Leave Dehradun Friday evening, arrive in the forest. Return Sunday refreshed.</p>
          <a href={wa} className="ckw-cta-btn">WhatsApp Us →</a>
        </div>
      </section>

      {/* INCLUSIONS */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="ckw-inner">
          <div className="ckw-eyebrow"><span className="ckw-eyebrow-line" /><span className="ckw-eyebrow-text">What&apos;s Included</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 500, color: '#111', margin: '0 0 1rem' }}>Included</h3>
              {retreat.inclusions.map((inc, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span style={{ color: 'var(--color-primary)', fontSize: '0.7rem' }}>✓</span>
                  <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', color: '#555', fontWeight: 300 }}>{inc}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 500, color: '#111', margin: '0 0 1rem' }}>Not Included</h3>
              {retreat.exclusions.map((exc, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span style={{ color: '#c92a2a', fontSize: '0.7rem' }}>✕</span>
                  <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', color: '#555', fontWeight: 300 }}>{exc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', padding: '4rem 0' }}>
        <div className="ckw-inner">
          <div className="ckw-eyebrow"><span className="ckw-eyebrow-line" /><span className="ckw-eyebrow-text">Questions</span></div>
          <h2 className="ckw-section-title">Frequently asked <span>questions</span></h2>
          <div>
            {retreat.faqs.map((faq, i) => (
              <div key={i} className="ckw-faq-item">
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.92rem', fontWeight: 500, color: '#111', margin: '0 0 0.6rem' }}>{faq.question}</h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', lineHeight: 1.8, color: '#666', fontWeight: 300, margin: 0 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALSO IN CHAKRATA */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', padding: '4rem 0' }}>
        <div className="ckw-inner">
          <div className="ckw-eyebrow"><span className="ckw-eyebrow-line" /><span className="ckw-eyebrow-text">Also in Chakrata</span></div>
          <h2 className="ckw-section-title">Explore more <span>Chakrata experiences</span></h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/retreats/chakrata" className="ckw-cta-outline">All Chakrata Retreats & Treks →</Link>
            <Link href="/retreats/chakrata/meditation-retreat" className="ckw-cta-outline">Meditation Retreat →</Link>
            <Link href="/retreats/chakrata/yoga-retreat" className="ckw-cta-outline">Yoga Retreat →</Link>
            <Link href="/treks/location/chakrata" className="ckw-cta-outline">Chakrata Treks →</Link>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', overflow: 'hidden', minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/location/chakrata.webp" width={800} height={462} alt="Chakrata forest for weekend retreat" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.88)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '44rem', padding: '3rem 2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 200, color: '#fff', margin: '0 0 0.75rem' }}>Your Weekend Awaits</h2>
          <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.75, margin: '0 0 1.5rem' }}>3 days in the forest. Pickup from Dehradun. All-inclusive. No prior experience needed.</p>
          <a href={wa} className="ckw-cta-btn" style={{ fontSize: '0.85rem', padding: '1rem 2.5rem' }}>Book This Retreat →</a>
        </div>
      </section>
    </TrackedPage>
  );
}
