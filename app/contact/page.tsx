import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import ContactClient from './ContactClient';
import InquiryForm from '@/components/InquiryForm';
import TrackedPage from '@/components/TrackedPage';
import Breadcrumb from '@/components/Breadcrumb';
import AutoArticleSchema from '@/components/AutoArticleSchema';

export function generateMetadata(): Metadata {
  return {
    title: 'Contact Retreats And Treks | Human-Centered Retreat Planning',
    description:
      'Reach out directly to our retreat designers. No forms, no automation — just genuine conversation about what might serve you best.',
    alternates: {
      canonical: buildCanonicalUrl('/contact'),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Contact Retreats And Treks',
      description: 'Reach out directly to our retreat designers for a genuine conversation.',
      url: buildCanonicalUrl('/contact'),
      type: 'website',
      images: buildOgImages('Contact Retreats And Treks'),
    },
  };
}

export default function ContactPage() {
  return (
    <TrackedPage page="/contact" style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title="Contact Retreats And Treks"
        description="Reach out directly to our retreat designers. No forms, no automation — just genuine conversation about what might serve you best."
        path="/contact"
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

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        /* ── HERO ── */
        .med-contact-hero {
          position: relative;
          overflow: hidden;
          min-height: 65vh;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(15,118,110,0.12);
        }
        .med-contact-hero .med-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%);
        }
        .med-contact-hero .med-hero-content {
          position: relative;
          z-index: 2;
          max-width: 58rem;
          width: 100%;
          padding: 5rem 1.5rem 4.5rem;
          text-align: center;
        }
        .med-contact-hero .med-hero-content .med-h1 {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(2.3rem, 4.6vw, 3.4rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 1.1rem;
          line-height: 1.08;
          text-shadow: 0 3px 24px rgba(0,0,0,0.5);
        }
        .med-contact-hero .med-hero-content .med-h1 span {
          color: #5eead4;
        }
        .med-contact-hero .med-hero-content .med-body {
          max-width: 40rem;
          margin: 0 auto 1.5rem;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.8);
          text-shadow: 0 2px 14px rgba(0,0,0,0.45);
        }
        .med-contact-hero .med-hero-content .med-hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }

        .med-contact-callout { padding: 1.25rem 1.5rem; background: #f7f9f7; border: 1px solid rgba(15,118,110,0.12); border-left: 3px solid #0f766e; border-radius: 18px; font-family: var(--font-inter), sans-serif; font-size: 0.9rem; font-weight: 400; line-height: 1.85; color: #4b5259; }
        .med-contact-callout a { color: #0f766e; font-weight: 500; text-decoration: none; border-bottom: 1px solid rgba(15,118,110,0.25); }
        .med-contact-callout a:hover { border-bottom-color: #0f766e; }

        .med-inquiry-card { padding: 2rem; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; background: #fff; }
        @media (max-width: 640px) { .med-inquiry-card { padding: 1.25rem; } }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }
      `}</style>

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Contact' }]} />
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="med-shell med-contact-hero">
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src="/Images/hero/himalayan-sunrise.webp" alt="Contact Retreats And Treks" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div className="med-hero-overlay" />
        </div>
        <div className="med-hero-content">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Contact</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 className="med-h1">
            Contact <span>Us</span>
          </h1>
          <p className="med-body">
            Retreats And Treks programs are designed for small groups and individual journeys. Every retreat, every trek, and every experience can be tailored to what you are looking for. There is no standard template — just a genuine conversation about what might serve you best.
          </p>
          <div className="med-hero-actions">
            <a href="https://wa.me/919760446101" className="med-cta-btn">Message on WhatsApp</a>
            <a href="#inquiry" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Send an Inquiry</a>
          </div>
        </div>
      </section>

      {/* ── EXPLORE FIRST ── */}
      <section className="med-shell med-section-white" style={{ padding: '3rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-contact-callout">
            <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0f766e', marginBottom: '0.35rem' }}>Before You Reach Out</div>
            If you are still exploring options, our{' '}
            <Link href="/retreats/himalayan-retreats">Himalayan retreats guide</Link>{' '}
            and the{' '}
            <Link href="/retreat-programs">program comparison matrix</Link>{' '}
            may help clarify which format and duration suits you before reaching out.
          </div>
        </div>
      </section>

      {/* ── CONTACT CLIENT ── */}
      <section className="med-shell med-section-alt" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <ContactClient />
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section id="inquiry" className="med-shell med-section-white" style={{ padding: '4rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Send an Inquiry</span>
          </div>
          <h2 className="med-h2">Send an <span>Inquiry</span></h2>
          <p className="med-body" style={{ marginBottom: '2rem' }}>
            Tell us what you are looking for. A mountain planner will respond within 24 hours.
          </p>
          <div className="med-inquiry-card">
            <Suspense fallback={<p className="med-body" style={{ color: '#6b7280' }}>Loading form…</p>}>
              <InquiryForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <nav className="med-shell med-section-alt" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-nav-grid">
            <Link href="/" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← Home</span>
            </Link>
            <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreats</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/treks" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Treks</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/locations" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Locations</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
          </div>
        </div>
      </nav>

    </TrackedPage>
  );
}
