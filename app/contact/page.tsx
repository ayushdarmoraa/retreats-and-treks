import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import ContactClient from './ContactClient';
import InquiryForm from '@/components/InquiryForm';

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
    <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>

      <style>{`
        .cnt-callout {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-left: 3px solid var(--color-primary);
          border-radius: 8px;
          padding: 1rem 1.25rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem;
          font-weight: 300;
          line-height: 1.85;
          color: #555;
        }
        .cnt-callout a {
          color: #374151;
          font-weight: 500;
          text-decoration: none;
          border-bottom: 1px solid rgba(15,118,110,0.25);
        }
        .cnt-callout a:hover { border-bottom-color: #374151; }
        .cnt-inquiry {
          background: #fff;
          border: 1px solid #eef0ee;
          border-top: 2px solid var(--color-primary);
          border-radius: 8px;
          padding: 2rem;
        }
        @media (max-width: 640px) {
          .cnt-inquiry { padding: 1.25rem; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Contact</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: 'clamp(1.75rem,3.5vw,2.4rem)', fontWeight: 200, letterSpacing: '-0.035em', color: '#111', lineHeight: 1.1, margin: '0 0 1.5rem' }}>
            Contact Us
          </h1>
          <p style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555', margin: '0 0 1rem' }}>
            Retreats And Treks programs are designed for small groups and individual journeys. Every
            retreat, every trek, and every experience can be tailored to what you are looking for. There
            is no standard template — just a genuine conversation about what might serve you best.
          </p>
        </div>
      </section>

      {/* ── EXPLORE FIRST ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '3rem', paddingBottom: '3rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="cnt-callout">
            <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#374151', marginBottom: '0.35rem' }}>Before You Reach Out</div>
            If you are still exploring options, our{' '}
            <Link href="/retreats/himalayan-retreats">Himalayan retreats guide</Link>{' '}
            and the{' '}
            <Link href="/retreat-programs">program comparison matrix</Link>{' '}
            may help clarify which format and duration suits you before reaching out.
          </div>
        </div>
      </section>

      {/* ── CONTACT CLIENT ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <ContactClient />
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section
        id="inquiry"
        style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem' }}
      >
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--color-primary)',  display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500}}>Send an Inquiry</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: 'clamp(1.4rem,2.5vw,1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111', lineHeight: 1.15, margin: '0 0 0.75rem' }}>
            Send an Inquiry
          </h2>
          <p style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85, color: '#555', marginBottom: '2rem' }}>
            Tell us what you are looking for. A mountain planner will respond within 24 hours.
          </p>
          <div className="cnt-inquiry">
            <Suspense fallback={<p style={{ fontFamily: 'var(--font-geist-sans),sans-serif', fontSize: '0.88rem', color: '#888' }}>Loading form…</p>}>
              <InquiryForm />
            </Suspense>
          </div>
        </div>
      </section>

    </main>
  );
}