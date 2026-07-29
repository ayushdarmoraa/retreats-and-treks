// components/ChakrataRetreatPage.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { generateRetreatSchema, generateFAQSchema } from '@/components/seo/Schema';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { RetreatContent } from '@/types/content';

type RetreatData = RetreatContent & {
  heroImage: string;
  heroAlt: string;
  tags: string[];
  metaTitle?: string;
};

interface Props {
  retreat: RetreatData;
  path: string;
  breadcrumbItems: { name: string; href?: string }[];
  waText: string;
}

export default function ChakrataRetreatPage({ retreat, path, breadcrumbItems, waText }: Props) {
  const retreatSchema = generateRetreatSchema(retreat);
  const faqSchema = generateFAQSchema(retreat.faqs);
  const wa = `https://wa.me/919760446101?text=${encodeURIComponent(waText)}`;

  return (
    <TrackedPage page={path} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema title={retreat.title} description={retreat.description} path={path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(retreatSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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

        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }

        .med-faq-item { border-bottom: 1px solid rgba(15,118,110,0.08); padding: 1.5rem 0; }
        .med-faq-item:last-child { border-bottom: none; }

        .med-inclusion-item { display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.85rem 1rem; background: #f7f9f7; border-radius: 12px; border: 1px solid rgba(15,118,110,0.08); }
        .med-inclusion-item .med-icon { color: #0f766e; font-size: 0.9rem; flex-shrink: 0; margin-top: 2px; }
        .med-inclusion-item .med-excl-icon { color: #c92a2a; font-size: 0.9rem; flex-shrink: 0; margin-top: 2px; }

        .med-cta-white { background: #ffffff; color: #0f766e; border: 1px solid #ffffff; }
        .med-cta-white:hover { background: #f7f9f7; color: #0d6b64; }
        .med-cta-transparent { background: transparent; color: #ffffff; border: 1px solid rgba(255,255,255,0.4); }
        .med-cta-transparent:hover { background: rgba(255,255,255,0.1); border-color: #ffffff; }
      `}</style>

      <Breadcrumb items={breadcrumbItems} />

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src={retreat.heroImage} alt={retreat.heroAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Chakrata &middot; {retreat.duration}</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.3rem, 4.6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.1rem', lineHeight: 1.08, textShadow: '0 3px 24px rgba(0,0,0,0.5)' }}>
            {retreat.title}
          </h1>
          <p style={{ maxWidth: '36rem', margin: '0 auto 1.5rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', textShadow: '0 2px 14px rgba(0,0,0,0.45)' }}>
            {retreat.description}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {retreat.tags.map((t) => (
              <span key={t} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>{t}</span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={wa} className="med-cta-btn med-cta-white" target="_blank" rel="noopener noreferrer">Book This Retreat →</a>
            <Link href="/retreats/chakrata" className="med-cta-btn med-cta-transparent">All Chakrata Experiences</Link>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Overview</span>
          </div>
          <h2 className="med-h2">What this <span>retreat offers</span></h2>
          <p className="med-body" style={{ marginBottom: '2rem' }}>{retreat.overview}</p>

          <div className="med-grid-2">
            {retreat.highlights.map((h, i) => (
              <div key={i} className="med-card" style={{ padding: '1rem 1.2rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ color: '#0f766e', fontSize: '1.1rem', flexShrink: 0 }}>✓</span>
                <span className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ITINERARY ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Daily Schedule</span>
          </div>
          <h2 className="med-h2">Your <span>itinerary</span></h2>

          <div className="med-card" style={{ padding: '2rem' }}>
            {retreat.itinerary.map((day, i, arr) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2.5rem 1fr', gap: '0 1rem', paddingBottom: i < arr.length - 1 ? '1.2rem' : 0, borderBottom: i < arr.length - 1 ? '1px solid rgba(15,118,110,0.08)' : 'none', paddingTop: i > 0 ? '1.2rem' : 0 }}>
                <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.6rem', fontWeight: 700, color: '#0f766e', letterSpacing: '0.1em', paddingTop: '0.15rem' }}>{String(i + 1).padStart(2, '0')}</span>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0 }}>{day}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MID CTA ── */}
      <section className="med-shell" style={{ background: '#0b241f', padding: '3.5rem 0', textAlign: 'center' }}>
        <div className="med-inner" style={{ maxWidth: '44rem' }}>
          <h3 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.3rem, 2vw, 1.6rem)', fontWeight: 500, color: '#ffffff', margin: '0 0 0.6rem' }}>Ready to begin?</h3>
          <p className="med-body" style={{ color: 'rgba(255,255,255,0.6)', margin: '0 0 1.5rem', fontSize: '0.9rem' }}>Ask your questions, check availability, or book directly — we reply within hours.</p>
          <a href={wa} className="med-cta-btn med-cta-white" target="_blank" rel="noopener noreferrer">WhatsApp Us →</a>
        </div>
      </section>

      {/* ── INCLUSIONS ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">What's Included</span>
          </div>

          <div className="med-grid-2">
            <div>
              <h3 className="med-h3" style={{ fontSize: '1rem' }}>Included</h3>
              {retreat.inclusions.map((inc, i) => (
                <div key={i} className="med-inclusion-item" style={{ marginBottom: '0.6rem' }}>
                  <span className="med-icon">✓</span>
                  <span className="med-body" style={{ fontSize: '0.85rem', marginBottom: 0 }}>{inc}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="med-h3" style={{ fontSize: '1rem' }}>Not Included</h3>
              {retreat.exclusions.map((exc, i) => (
                <div key={i} className="med-inclusion-item" style={{ marginBottom: '0.6rem' }}>
                  <span className="med-excl-icon">✕</span>
                  <span className="med-body" style={{ fontSize: '0.85rem', marginBottom: 0 }}>{exc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '4.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Questions</span>
          </div>
          <h2 className="med-h2">Frequently asked <span>questions</span></h2>

          <div className="med-card" style={{ padding: '0.5rem 2rem' }}>
            {retreat.faqs.map((faq, i) => (
              <div key={i} className="med-faq-item">
                <h3 className="med-h3" style={{ fontSize: '0.95rem', marginBottom: '0.6rem' }}>{faq.question}</h3>
                <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: 0, color: '#6b7280' }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALSO IN CHAKRATA ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '4.5rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Also in Chakrata</span>
          </div>
          <h2 className="med-h2">Explore more <span>Chakrata experiences</span></h2>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/retreats/chakrata" className="med-cta-outline">All Chakrata Retreats & Treks →</Link>
            <Link href="/retreats/chakrata/meditation-retreat" className="med-cta-outline">Meditation Retreat →</Link>
            <Link href="/retreats/chakrata/yoga-retreat" className="med-cta-outline">Yoga Retreat →</Link>
            <Link href="/treks/location/chakrata" className="med-cta-outline">Chakrata Treks →</Link>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '45vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/Images/location/chakrata.webp" alt="Chakrata forest setting" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,28,0.88)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '44rem', padding: '4rem 1.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 500, color: '#F6F2E7', margin: '0 0 0.75rem' }}>Your Retreat Awaits</h2>
          <p className="med-body" style={{ color: 'rgba(255,255,255,0.6)', margin: '0 0 1.5rem', fontSize: '0.9rem' }}>Ask your questions or book directly — we reply within hours.</p>
          <a href={wa} className="med-cta-btn med-cta-white" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', padding: '1rem 2.5rem' }}>Book This Retreat →</a>
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
