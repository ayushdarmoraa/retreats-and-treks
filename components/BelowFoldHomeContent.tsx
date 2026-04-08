'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { LocationId } from '@/config/locations';
import { logWhatsAppOpen } from '@/lib/analytics';
import { getAllRetreatServices } from '@/content/retreats/services';
import { getAllTreks } from '@/lib/treks';
import { images } from '@/lib/images';
import { CardImage } from '@/components/images';

interface Location {
  id: LocationId;
  name: string;
  tagline: string;
}

interface BelowFoldHomeContentProps {
  locations: Location[];
}

export default function BelowFoldHomeContent({ locations }: BelowFoldHomeContentProps) {
  const whatsappMessage = `Hi, I'm interested in learning more about your Himalayan journeys.`;
  const whatsappLink = `https://wa.me/919760446101?text=${encodeURIComponent(whatsappMessage)}`;

  // ── Scroll fade-in observer ──
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-fade, .scroll-fade-stagger');
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sf-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* SECTION 3: FEATURED RETREATS */}
<section style={{
  marginBottom: '0',
  marginTop: '0',
  marginRight: '0',
  paddingTop: '6rem',
  paddingBottom: '6rem',
  paddingLeft: '0',
  paddingRight: '0',
  borderBottom: '1px solid #e5e7eb',
  background: '#ffffff',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
}}>
  <style>{`
    /* ── Card ── */
    .retreat-card {
      display: block;
      text-decoration: none;
      border-radius: 6px;
      overflow: hidden;
      transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 18px rgba(0,0,0,0.06);
    }
    .retreat-card:hover {
      transform: translateY(-7px);
      box-shadow: 0 16px 48px rgba(0,0,0,0.12);
    }

    /* ── Image ── */
    .retreat-card-img-wrap {
      overflow: hidden;
      position: relative;
    }
    .retreat-card-img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      display: block;
      transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .retreat-card:hover .retreat-card-img { transform: scale(1.07); }

    .retreat-card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(2,10,2,0.65) 0%, rgba(2,10,2,0.1) 50%, rgba(2,10,2,0) 100%);
      transition: opacity 0.35s;
    }
    .retreat-card:hover .retreat-card-overlay { opacity: 0.85; }

    /* Tag pill */
    .retreat-card-tag {
      position: absolute;
      top: 1rem;
      left: 1rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.52rem;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: #ffffff;
      background: var(--color-primary);
      padding: 4px 10px;
      border-radius: 2px;
      font-weight: 600;
    }

    /* Title revealed on hover */
    .retreat-card-img-title {
      position: absolute;
      bottom: 1rem;
      left: 1.25rem;
      right: 1.25rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 1rem;
      font-weight: 500;
      color: #ece4d0;
      line-height: 1.25;
      letter-spacing: -0.01em;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.35s, transform 0.35s;
    }
    .retreat-card:hover .retreat-card-img-title {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── Body ── */
    .retreat-card-body {
      padding: 1.4rem 1.5rem 1.6rem;
      border-top: 2px solid var(--color-primary);
      position: relative;
    }

    /* Subtle progress line on hover */
    .retreat-card-body::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      height: 2px;
      width: 0;
      background: var(--color-primary);
      opacity: 0.2;
      transition: width 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .retreat-card:hover .retreat-card-body::after { width: 100%; }

    .retreat-card-title {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 1rem;
      font-weight: 600;
      color: #111111;
      margin: 0 0 0.45rem;
      letter-spacing: -0.015em;
      line-height: 1.25;
    }
    .retreat-card-desc {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.87rem;
      line-height: 1.8;
      color: #777777;
      margin: 0 0 1.35rem;
      font-weight: 300;
    }

    /* Arrow CTA */
    .retreat-arrow {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-primary);
      transition: gap 0.22s;
    }
    .retreat-card:hover .retreat-arrow { gap: 0.72rem; }

    /* ── Section heading ── */
    .retreat-section-eyebrow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.9rem;
      margin-bottom: 1rem;
    }
    .retreat-eyebrow-line {
      width: 28px; height: 1px;
      background: var(--color-primary);
      opacity: 0.5;
    }
    .retreat-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.875rem;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: var(--color-primary);
      font-weight: 500;
    }

    /* ── View all button ── */
    .retreat-view-all {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      text-decoration: none;
      padding: 12px 32px;
      border: 1px solid rgba(15,118,110,0.35);
      color: var(--color-primary);
      border-radius: 2px;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: background 0.25s, color 0.25s, border-color 0.25s;
    }
    .retreat-view-all:hover {
      background: var(--color-primary);
      color: #ffffff;
      border-color: var(--color-primary);
    }
  `}</style>

  <div style={{ maxWidth: '78rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}>

    {/* Eyebrow */}
    <div className="retreat-section-eyebrow">
      <span className="retreat-eyebrow-line" />
      <span className="retreat-eyebrow-text">Curated Experiences</span>
      <span className="retreat-eyebrow-line" />
    </div>

    {/* Heading — last word green */}
    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      margin: '0 0 3.5rem',
      lineHeight: 1.1,
      textAlign: 'center',
    }}>
      Featured Retreat{' '}
      <span style={{ color: 'var(--color-primary)', fontWeight: 200 }}>Journeys</span>
    </h2>

    {/* Cards grid */}
<div className="scroll-fade-stagger" style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.75rem',
}}>
  {(() => {
    const cardMeta: Record<string, { image: typeof images.journeys.weekend; tag: string }> = {
      'weekend-retreat':        { image: images.journeys.weekend,    tag: 'Weekend' },
      'yoga-and-movement':      { image: images.journeys.yoga,       tag: 'Yoga'    },
      'meditation-and-silence': { image: images.journeys.meditation, tag: 'Silence' },
    };

    return getAllRetreatServices()
      .filter(s => ['weekend-retreat', 'yoga-and-movement', 'meditation-and-silence'].includes(s.slug))
      .map(retreat => {
        const meta = cardMeta[retreat.slug] ?? {
          image: { src: '/Images/location/chakrata.webp', alt: retreat.title },
          tag: 'Retreat',
        };
        return (
          <Link key={retreat.slug} href={`/retreats/journeys/${retreat.slug}`} className="retreat-card">

            {/* Image */}
            <div className="retreat-card-img-wrap">
              <CardImage image={meta.image} />
              <div className="retreat-card-overlay" />
              <span className="retreat-card-tag">{meta.tag}</span>
              <span className="retreat-card-img-title">{retreat.title}</span>
            </div>

            {/* Body */}
            <div className="retreat-card-body">
              <h3 className="retreat-card-title">{retreat.title}</h3>
              <p className="retreat-card-desc">{retreat.oneLineEssence}</p>
              <span className="retreat-arrow">Explore retreat →</span>
            </div>
          </Link>
        );
      });
  })()}
</div>

    {/* View all */}
    <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
      <Link href="/retreats" className="retreat-view-all">
        View All Retreats →
      </Link>
    </div>

  </div>
</section>

   {/* SECTION 4: THE LANDSCAPES WE WORK WITH */}
<section style={{
  marginBottom: '0',
  marginTop: '0',
  paddingTop: '6rem',
  paddingBottom: '6rem',
  paddingLeft: '0',
  paddingRight: '0',
  borderBottom: '1px solid #e5e7eb',
  background: '#f7f9f7',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
}}>
  <style>{`
    /* ── Card ── */
    .loc-card {
      display: block;
      text-decoration: none;
      border-radius: 6px;
      overflow: hidden;
      transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.05);
    }
    .loc-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 44px rgba(0,0,0,0.11);
    }

    /* ── Image ── */
    .loc-card-img-wrap {
      overflow: hidden;
      position: relative;
    }
    .loc-card-img {
      width: 100%;
      height: 175px;
      object-fit: cover;
      display: block;
      transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .loc-card:hover .loc-card-img { transform: scale(1.07); }

    .loc-card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(2,10,2,0.62) 0%, rgba(2,10,2,0.05) 55%, rgba(2,10,2,0) 100%);
      transition: opacity 0.35s;
    }
    .loc-card:hover .loc-card-overlay { opacity: 0.82; }

    /* Location name over image */
    .loc-card-img-name {
      position: absolute;
      bottom: 0.75rem;
      left: 1rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.55rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(236,228,208,0.75);
      font-weight: 500;
    }

    /* ── Body ── */
    .loc-card-body {
      padding: 1.1rem 1.25rem 1.3rem;
      border-top: 2px solid var(--color-primary);
      position: relative;
    }
    .loc-card-body::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      height: 2px;
      width: 0;
      background: var(--color-primary);
      opacity: 0.15;
      transition: width 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .loc-card:hover .loc-card-body::after { width: 100%; }

    .loc-card-name {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      color: #111111;
      margin: 0 0 0.3rem;
      letter-spacing: -0.01em;
      line-height: 1.25;
    }
    .loc-card-tagline {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.78rem;
      line-height: 1.7;
      color: #777777;
      margin: 0 0 0.85rem;
      font-weight: 300;
    }

    /* Arrow */
    .loc-arrow {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.58rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-primary);
      transition: gap 0.22s;
    }
    .loc-card:hover .loc-arrow { gap: 0.62rem; }

    /* ── Grid ── */
    .loc-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.2rem;
    }
    @media (max-width: 1024px) {
      .loc-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 720px) {
      .loc-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 480px) {
      .loc-grid { grid-template-columns: 1fr; }
      .loc-card-img { height: 200px; }
    }

    /* ── Eyebrow ── */
    .loc-eyebrow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.9rem;
      margin-bottom: 1rem;
    }
    .loc-eyebrow-line {
      width: 28px; height: 1px;
      background: var(--color-primary);
      opacity: 0.5;
    }
    .loc-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.875rem;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: var(--color-primary);
      font-weight: 500;
    }
  `}</style>

  <div style={{ maxWidth: '78rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}>

    {/* Eyebrow */}
    <div className="loc-eyebrow">
      <span className="loc-eyebrow-line" />
      <span className="loc-eyebrow-text">Our Locations</span>
      <span className="loc-eyebrow-line" />
    </div>

    {/* Heading — last word green */}
    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      margin: '0 0 3.5rem',
      lineHeight: 1.1,
      textAlign: 'center',
    }}>
      The Landscapes We{' '}
      <span style={{ color: 'var(--color-primary)', fontWeight: 200 }}>Work With</span>
    </h2>

    {/* Cards */}
    <div className="loc-grid scroll-fade-stagger">
      {locations.map((location) => {
        const locImages: Record<string, typeof images.locations.chakrata> = {
  'chakrata':  images.locations.chakrata,
  'sankri':    images.locations.sankri,
  'munsiyari': images.locations.munsiyari,
  'mussoorie': images.locations.mussoorie,
  'rishikesh': images.locations.rishikesh,
  'zanskar':   images.locations.zanskar,
  'joshimath': images.locations.joshimath,
  'lohajung':  images.locations.lohajung,
};
const imgData = locImages[location.id] ?? { src: '/Images/location/chakrata.webp', alt: location.name };
        return (
          <Link key={location.id} href={`/retreats/${location.id}`} className="loc-card">
            <div className="loc-card-img-wrap">
             <CardImage image={imgData} />
              <div className="loc-card-overlay" />
              <span className="loc-card-img-name">{location.name}</span>
            </div>
            <div className="loc-card-body">
              <h3 className="loc-card-name">{location.name}</h3>
              <p className="loc-card-tagline">{location.tagline}</p>
              <span className="loc-arrow">Explore →</span>
            </div>
          </Link>
        );
      })}
    </div>

  </div>
</section>

     {/* SECTION 5: RETREATS & TREKS (SIDE BY SIDE) */}
<section style={{
  marginBottom: '0',
  marginTop: '0',
  paddingTop: '6rem',
  paddingBottom: '6rem',
  paddingLeft: '0',
  paddingRight: '0',
  borderBottom: '1px solid #e5e7eb',
  background: '#ffffff',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
}}>
  <style>{`
    /* ── Cards ── */
    .path-card {
      position: relative;
      border-radius: 6px;
      overflow: hidden;
      transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 18px rgba(0,0,0,0.06);
    }
    .path-card:hover {
      transform: translateY(-7px);
      box-shadow: 0 18px 52px rgba(0,0,0,0.12);
    }

    /* ── Image ── */
    .path-card-img-wrap {
      overflow: hidden;
      position: relative;
    }
    .path-card-img {
      width: 100%;
      height: 380px;
      object-fit: cover;
      display: block;
      transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .path-card:hover .path-card-img { transform: scale(1.05); }

    .path-card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(2,10,2,0.85) 0%, rgba(2,10,2,0.18) 50%, rgba(2,10,2,0) 100%);
      transition: opacity 0.35s;
    }
    .path-card:hover .path-card-overlay { opacity: 0.92; }

    /* Label over image */
    .path-img-label {
      position: absolute;
      bottom: 1.75rem;
      left: 1.75rem;
      right: 1.75rem;
    }
    .path-img-tag {
      display: inline-block;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.52rem;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: #ffffff;
      background: var(--color-primary);
      padding: 4px 10px;
      border-radius: 2px;
      font-weight: 600;
    }
    .path-img-title {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 1.55rem;
      font-weight: 200;
      color: #ece4d0;
      line-height: 1.12;
      letter-spacing: -0.025em;
      margin: 0.45rem 0 0;
    }

    /* ── Body ── */
    .path-card-body {
      padding: 1.5rem 1.75rem 1.75rem;
      background: #ffffff;
      border-top: 2px solid var(--color-primary);
      position: relative;
    }
    .path-card-body::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      height: 2px;
      width: 0;
      background: var(--color-primary);
      opacity: 0.15;
      transition: width 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .path-card:hover .path-card-body::after { width: 100%; }

    .path-card-desc {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.9rem;
      line-height: 1.85;
      color: #777777;
      margin: 0 0 1.3rem;
      font-weight: 300;
    }

    /* Arrow link */
    .path-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--color-primary);
      text-decoration: none;
      transition: gap 0.22s;
    }
    .path-card:hover .path-link { gap: 0.72rem; }

    /* ── Grid ── */
    .path-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.75rem;
    }
    @media (max-width: 768px) {
      .path-grid { grid-template-columns: 1fr; }
      .path-card-img { height: 260px; }
      .path-img-title { font-size: 1.3rem; }
    }

    /* ── Eyebrow ── */
    .path-eyebrow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.9rem;
      margin-bottom: 1rem;
    }
    .path-eyebrow-line {
      width: 28px; height: 1px;
      background: var(--color-primary);
      opacity: 0.5;
    }
    .path-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.875rem;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: var(--color-primary);
      font-weight: 500;
    }
  `}</style>

  <div style={{ maxWidth: '78rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}>

    {/* Eyebrow */}
    <div className="path-eyebrow">
      <span className="path-eyebrow-line" />
      <span className="path-eyebrow-text">Choose Your Journey</span>
      <span className="path-eyebrow-line" />
    </div>

    {/* Heading — last word green */}
    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      margin: '0 0 3.5rem',
      lineHeight: 1.1,
      textAlign: 'center',
    }}>
      Two Paths{' '}
      <span style={{ color: 'var(--color-primary)', fontWeight: 200 }}>Forward</span>
    </h2>

    <div className="path-grid scroll-fade-stagger">

      {/* Retreats */}
      <div className="path-card">
        <div className="path-card-img-wrap">
          <Image
            src="/Images/Journeys/Stillness.webp"
            alt="Stillness and inner reset — Himalayan retreat"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            quality={85}
          />
          <div className="path-card-overlay" />
          <div className="path-img-label">
            <span className="path-img-tag">Retreats</span>
            <h3 className="path-img-title">Stillness &amp;<br />Inner Reset</h3>
          </div>
        </div>
        <div className="path-card-body">
          <p className="path-card-desc">
            Stillness and inner recalibration. Time to reset your nervous system and come home to yourself.
          </p>
          <Link href="/retreats" className="path-link" onClick={() => logWhatsAppOpen('/')}>
            Explore retreats →
          </Link>
        </div>
      </div>

      {/* Treks */}
      <div className="path-card">
        <div className="path-card-img-wrap">
         <Image
            src="/Images/Journeys/HighTerrain.webp"
            alt="Movement and high terrain — Himalayan trek"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            quality={85}
          />
          <div className="path-card-overlay" />
          <div className="path-img-label">
            <span className="path-img-tag">Treks</span>
            <h3 className="path-img-title">Movement &amp;<br />High Terrain</h3>
          </div>
        </div>
        <div className="path-card-body">
          <p className="path-card-desc">
            Movement and embodied presence. Walking through high terrain where your mind becomes clear.
          </p>
          <Link href="/treks" className="path-link" onClick={() => logWhatsAppOpen('/')}>
            Explore treks →
          </Link>
        </div>
      </div>

    </div>
  </div>
</section>

     {/* SECTION 5A: POPULAR TREKS (INTERNAL SEO AUTHORITY) — Step 84 */}
<section style={{
  marginBottom: '0',
  marginTop: '0',
  paddingTop: '6rem',
  paddingBottom: '6rem',
  paddingLeft: '0',
  paddingRight: '0',
  borderBottom: '1px solid #e5e7eb',
  background: '#f7f9f7',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
}}>
  <style>{`
    .trek-pop-eyebrow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.9rem;
      margin-bottom: 1rem;
    }
    .trek-pop-eyebrow-line {
      width: 28px; height: 1px;
      background: var(--color-primary);
      opacity: 0.5;
    }
    .trek-pop-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.875rem;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: var(--color-primary);
      font-weight: 500;
    }
    .trek-pop-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
    .trek-pop-card {
      display: block;
      padding: 1.5rem;
      background: #ffffff;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      text-decoration: none;
      transition: transform 0.3s, box-shadow 0.3s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .trek-pop-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    }
    .trek-pop-card-title {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--color-primary);
      margin: 0 0 0.5rem;
      line-height: 1.3;
    }
    .trek-pop-card-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.75rem;
      color: #999999;
      margin: 0;
      font-weight: 300;
    }
    @media (max-width: 1024px) {
      .trek-pop-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .trek-pop-grid { grid-template-columns: 1fr; }
    }
  `}</style>

  <div style={{ maxWidth: '78rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}>

    {/* Eyebrow */}
    <div className="trek-pop-eyebrow">
      <span className="trek-pop-eyebrow-line" />
      <span className="trek-pop-eyebrow-text">Popular Treks</span>
      <span className="trek-pop-eyebrow-line" />
    </div>

    {/* Heading */}
    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      margin: '0 0 3.5rem',
      lineHeight: 1.1,
      textAlign: 'center',
    }}>
      Our Most{' '}
      <span style={{ color: 'var(--color-primary)', fontWeight: 200 }}>Sought Treks</span>
    </h2>

    {/* Trek Grid */}
    <div className="trek-pop-grid scroll-fade-stagger">
      {(() => {
        const allTreks = getAllTreks();
        // Select 4 featured treks - top rated/popular ones
        const featuredTreks = allTreks.slice(0, 4);
        return featuredTreks.map((trek) => (
          <Link 
            key={trek.slug}
            href={`/treks/location/${trek.locationId}/${trek.slug}`}
            className="trek-pop-card"
          >
            <h3 className="trek-pop-card-title">{trek.title}</h3>
            <p className="trek-pop-card-meta">
              <span>{trek.difficulty}</span>
              <span>·</span>
              <span>{trek.duration}</span>
            </p>
          </Link>
        ));
      })()}
    </div>

    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
      <Link href="/treks" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: '0.85rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--color-primary)',
        textDecoration: 'none',
      }}>
        View all treks →
      </Link>
    </div>
  </div>
</section>

     {/* SECTION 6: HOW IT WORKS */}
<section style={{
  marginBottom: '0',
  marginTop: '0',
  paddingTop: '6rem',
  paddingBottom: '6rem',
  paddingLeft: '0',
  paddingRight: '0',
  borderBottom: '1px solid #e5e7eb',
  background: '#f7f9f7',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
}}>
  <style>{`
    .step-card {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      padding: 2.5rem 2rem;
      border-radius: 6px;
      border: 1px solid #eef0ee;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
      transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s, border-color 0.3s;
      position: relative;
    }
    .step-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 36px rgba(0,0,0,0.09);
      border-color: rgba(15,118,110,0.25);
    }
    .step-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: var(--color-primary);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
      border-radius: 6px 6px 0 0;
    }
    .step-card:hover::before { transform: scaleX(1); }

    .step-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .step-num {
      flex-shrink: 0;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
      background: transparent;
      border: 1.5px solid var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.68rem;
      font-weight: 600;
      color: var(--color-primary);
      letter-spacing: 0.05em;
      transition: background 0.3s, color 0.3s;
    }
    .step-card:hover .step-num {
      background: var(--color-primary);
      color: #ffffff;
    }

    .step-icon {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 8px;
      background: rgba(15,118,110,0.06);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s;
    }
    .step-card:hover .step-icon {
      background: rgba(15,118,110,0.12);
    }

    .step-title {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem;
      font-weight: 600;
      color: #111111;
      margin: 0 0 0.4rem;
      letter-spacing: -0.01em;
      line-height: 1.3;
    }
    .step-desc {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.87rem;
      line-height: 1.8;
      color: #777777;
      margin: 0;
      font-weight: 300;
    }

    .step-arrow {
      display: none;
    }
    @media (min-width: 769px) {
      .step-arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: -1.15rem;
        top: 2.75rem;
        width: 1.5rem;
        height: 1.5rem;
        background: #f7f9f7;
        border: 1px solid rgba(15,118,110,0.2);
        border-radius: 50%;
        font-size: 0.52rem;
        color: var(--color-primary);
        z-index: 1;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      }
    }

    .step-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      align-items: start;
    }
    @media (max-width: 768px) {
      .step-grid { grid-template-columns: 1fr; gap: 1rem; }
    }

    .step-eyebrow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.9rem;
      margin-bottom: 1rem;
    }
    .step-eyebrow-line {
      width: 28px; height: 1px;
      background: var(--color-primary);
      opacity: 0.5;
    }
    .step-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.875rem;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: var(--color-primary);
      font-weight: 500;
    }
  `}</style>

  <div style={{ maxWidth: '78rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}>

    <div className="step-eyebrow">
      <span className="step-eyebrow-line" />
      <span className="step-eyebrow-text">The Process</span>
      <span className="step-eyebrow-line" />
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      margin: '0 0 3.5rem',
      lineHeight: 1.1,
      textAlign: 'center',
    }}>
      How This{' '}
      <span style={{ color: 'var(--color-primary)', fontWeight: 200 }}>Works</span>
    </h2>

    <div className="step-grid scroll-fade-stagger">
      {[
        {
          step: '01',
          title: "You share what you're seeking",
          desc: "Your intention, what's happening in your life, what a retreat would need to be.",
          icon: (
            <svg width="18" height="18" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          ),
        },
        {
          step: '02',
          title: 'We help you choose the right land',
          desc: 'Which location and which retreat format makes sense — or we suggest something unexpected.',
          icon: (
            <svg width="18" height="18" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
            </svg>
          ),
        },
        {
          step: '03',
          title: 'Your journey takes shape',
          desc: 'In conversation. Not checkout pages, not templates. A retreat designed for you.',
          icon: (
            <svg width="18" height="18" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
            </svg>
          ),
        },
      ].map((item, i, arr) => (
        <div key={item.step} className="step-card">
          {/* Header — number left, icon right */}
          <div className="step-card-header">
            <div className="step-num">{item.step}</div>
            <div className="step-icon">{item.icon}</div>
          </div>
          {/* Content */}
          <div>
            <h3 className="step-title">{item.title}</h3>
            <p className="step-desc">{item.desc}</p>
          </div>
          {i < arr.length - 1 && (
            <div className="step-arrow">→</div>
          )}
        </div>
      ))}
    </div>

  </div>
</section>

     {/* SECTION 7: NOT A PACKAGE DEAL */}
<section style={{
  marginBottom: '0',
  marginTop: '0',
  paddingTop: '6rem',
  paddingBottom: '6rem',
  borderBottom: '1px solid #e5e7eb',
  overflow: 'hidden',
  background: '#ffffff',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
}}>
  <style>{`
    .s7-wrap { position: relative; }

    /* ── Eyebrow ── */
    .s7-eyebrow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.9rem;
      margin-bottom: 1rem;
    }
    .s7-eyebrow-line {
      width: 28px; height: 1px;
      background: var(--color-primary);
      opacity: 0.5;
    }
    .s7-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.875rem;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: var(--color-primary);
      font-weight: 500;
    }

    /* ── Heading ── */
    .s7-header {
      text-align: center;
      margin-bottom: 3.5rem;
    }
    .s7-headline {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(1.8rem, 2.8vw, 2.5rem);
      font-weight: 200;
      letter-spacing: -0.03em;
      color: #111111;
      line-height: 1.1;
      margin: 0;
    }
    .s7-headline-accent {
      color: var(--color-primary);
      font-weight: 200;
    }

    /* ── Grid ── */
    .s7-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1px;
      background: #e8eeea;
      border: 1px solid #e8eeea;
      border-radius: 6px;
      overflow: hidden;
    }

    /* ── Item ── */
    .s7-item {
      background: #ffffff;
      padding: 3rem 2.75rem;
      display: flex;
      gap: 2rem;
      align-items: flex-start;
      transition: background 0.3s;
      position: relative;
    }
    .s7-item:hover { background: #f7f9f7; }

    /* Left reveal line — green */
    .s7-item::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 3px;
      background: var(--color-primary);
      transform: scaleY(0);
      transform-origin: bottom;
      transition: transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .s7-item:hover::before { transform: scaleY(1); }

    /* Big faint number */
    .s7-big-num {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 3.5rem;
      font-weight: 200;
      color: var(--color-primary);
      opacity: 0.1;
      line-height: 1;
      flex-shrink: 0;
      margin-top: -0.4rem;
      letter-spacing: -0.04em;
      transition: opacity 0.3s;
      user-select: none;
    }
    .s7-item:hover .s7-big-num { opacity: 0.22; }

    .s7-item-title {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 1rem;
      font-weight: 600;
      color: #111111;
      letter-spacing: -0.015em;
      margin-bottom: 0.5rem;
      line-height: 1.25;
    }
    .s7-item-desc {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.87rem;
      color: #777777;
      line-height: 1.85;
      font-weight: 300;
      margin: 0;
    }

    @media (max-width: 700px) {
      .s7-grid { grid-template-columns: 1fr; }
      .s7-item { padding: 2.25rem 1.75rem; gap: 1.25rem; }
      .s7-big-num { font-size: 2.5rem; }
    }
  `}</style>

  <div style={{ maxWidth: '78rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
    <div className="s7-wrap">

      {/* Eyebrow */}
      <div className="s7-eyebrow">
        <span className="s7-eyebrow-line" />
        <span className="s7-eyebrow-text">Our Promise</span>
        <span className="s7-eyebrow-line" />
      </div>

      {/* Heading */}
      <div className="s7-header">
        <h2 className="s7-headline">
          This Is Not a{' '}
          <span className="s7-headline-accent">Package Deal</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="s7-grid scroll-fade">
        {[
  {
    num: '01',
    title: 'Small Groups Only',
    desc: 'Intimate groups or private journeys — never crowded, never rushed, never compromised.',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Request-Based Dates',
    desc: 'No fixed schedules. You reach out, we shape the timing entirely around your life.',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'No Price Lists',
    desc: 'No rate cards, no fixed itineraries. Every journey is priced in conversation.',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Designed for You',
    desc: 'Built from scratch each time. Your retreat is yours alone — not a recycled template.',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
].map((item) => (
  <div key={item.num} className="s7-item">
    <div className="s7-big-num">{item.num}</div>
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <span style={{ color: 'var(--color-primary)', opacity: 0.7, display: 'flex' }}>
          {item.icon}
        </span>
        <div className="s7-item-title" style={{ margin: 0 }}>{item.title}</div>
      </div>
      <p className="s7-item-desc">{item.desc}</p>
    </div>
  </div>
))}
      </div>

    </div>
  </div>
</section>
{/* SECTION: TESTIMONIALS — Real People. Real Experiences. */}
<section style={{
  marginBottom: '0',
  marginTop: '0',
  paddingTop: '6rem',
  paddingBottom: '6rem',
  paddingLeft: '0',
  paddingRight: '0',
  borderBottom: '1px solid #e5e7eb',
  background: '#faf8f4',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
}}>
  <style>{`
    /* ── Testimonial Card ── */
    .t-card {
      background: #ffffff;
      border-radius: 6px;
      border: 1px solid #eef0ee;
      padding: 2.5rem 2.25rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05);
      transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s, border-color 0.3s;
      position: relative;
      overflow: hidden;
    }
    .t-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 44px rgba(0,0,0,0.10);
      border-color: rgba(15,118,110,0.2);
    }
    .t-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: var(--color-primary);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
    }
    .t-card:hover::before { transform: scaleX(1); }

    /* Quote mark */
    .t-quote-mark {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 4rem;
      font-weight: 200;
      color: var(--color-primary);
      opacity: 0.12;
      line-height: 1;
      position: absolute;
      top: 1.25rem;
      right: 1.75rem;
      user-select: none;
    }

    /* Stars */
    .t-stars {
      display: flex;
      gap: 0.2rem;
    }
    .t-star {
      color: var(--color-primary);
      font-size: 0.75rem;
      opacity: 0.8;
    }

    /* Review text */
    .t-review {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.9rem;
      line-height: 1.9;
      color: #555550;
      font-weight: 300;
      margin: 0;
      font-style: italic;
    }

    /* Vibe tag */
    .t-vibe {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.5rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--color-primary);
      background: rgba(15,118,110,0.07);
      padding: 4px 10px;
      border-radius: 2px;
      font-weight: 600;
      width: fit-content;
    }

    /* Person row */
    .t-person {
      display: flex;
      align-items: center;
      gap: 1rem;
      border-top: 1px solid #f0f0ee;
      padding-top: 1.25rem;
    }
    .t-avatar {
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(15,118,110,0.15);
      flex-shrink: 0;
    }
    .t-avatar-placeholder {
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(15,118,110,0.15) 0%, rgba(15,118,110,0.08) 100%);
      border: 2px solid rgba(15,118,110,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-primary);
      opacity: 0.7;
    }
    .t-name {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      color: #111111;
      letter-spacing: -0.01em;
      margin-bottom: 0.15rem;
    }
    .t-meta {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.72rem;
      color: #999990;
      font-weight: 300;
      letter-spacing: 0.02em;
    }

    /* ── Grid ── */
    .t-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
    @media (max-width: 900px) {
      .t-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 580px) {
      .t-grid { grid-template-columns: 1fr; }
    }

    /* ── Eyebrow ── */
    .t-eyebrow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.9rem;
      margin-bottom: 1rem;
    }
    .t-eyebrow-line {
      width: 28px; height: 1px;
      background: var(--color-primary);
      opacity: 0.5;
    }
    .t-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.875rem;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: var(--color-primary);
      font-weight: 500;
    }
  `}</style>

  <div style={{ maxWidth: '78rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}>

    {/* Eyebrow */}
    <div className="t-eyebrow">
      <span className="t-eyebrow-line" />
      <span className="t-eyebrow-text">Real People. Real Experiences.</span>
      <span className="t-eyebrow-line" />
    </div>

    {/* Heading */}
    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      margin: '0 0 3.5rem',
      lineHeight: 1.1,
      textAlign: 'center',
    }}>
      Those Who Came{' '}
      <span style={{ color: 'var(--color-primary)', fontWeight: 200 }}>Before You</span>
    </h2>

    {/* Cards */}
    <div className="t-grid scroll-fade-stagger">
      {[
  {
    image: images.testimonials.priya,
    name: 'Priya Mehta',
    meta: 'Chakrata · Meditation Retreat',
    vibe: '🧘 Meditation',
    review: 'I came burnt out and left feeling like myself again. The silence, the mountains, the pace — nothing was rushed. It felt designed just for me, because it was.',
    stars: 5,
  },
  {
    image: images.testimonials.rohan,
    name: 'Rohan Sharma',
    meta: 'Sankri · Weekend Retreat',
    vibe: '🍵 Tea Vibes',
    review: "Woke up to mist over the valley every morning. The evenings around the fire with chai — I didn't know I needed this until I was in it. Already planning the next one.",
    stars: 5,
  },
  {
    image: images.testimonials.anika,
    name: 'Anika Verma',
    meta: 'Munsiyari · Walking Retreat',
    vibe: '🚶 Walking',
    review: "The walks weren't just physical — something shifted internally. By day three, my mind was quieter than it's been in years. This place changes you.",
    stars: 5,
  },
].map((t, i) => (
  <div key={i} className="t-card">
    <span className="t-quote-mark">&ldquo;</span>

    <div className="t-stars">
      {Array.from({ length: t.stars }).map((_, s) => (
        <span key={s} className="t-star">★</span>
      ))}
    </div>

    <span className="t-vibe">{t.vibe}</span>

    <p className="t-review">&ldquo;{t.review}&rdquo;</p>

    <div className="t-person">
      <Image
        src={t.image.src}
        alt={t.image.alt}
        width={44}
        height={44}
        className="t-avatar"
        style={{ borderRadius: '50%' }}
      />
      <div>
        <div className="t-name">{t.name}</div>
        <div className="t-meta">{t.meta}</div>
      </div>
    </div>
  </div>
))}
    </div>

  </div>
</section>
{/* SECTION: LIFE AT THE RETREAT */}
<section style={{
  marginBottom: '0',
  marginTop: '0',
  paddingTop: '6rem',
  paddingBottom: '6rem',
  background: '#f7f9f7',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  borderBottom: '1px solid #e5e7eb',
}}>
  <style>{`
    .life-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
    @media (max-width: 900px) {
      .life-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 580px) {
      .life-grid { grid-template-columns: 1fr; }
    }

    .life-card {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      cursor: default;
    }

    .life-card-img-wrap {
      position: relative;
      width: 100%;
      height: 420px;
    }

    .life-card-img-wrap img {
      transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    .life-card:hover .life-card-img-wrap img {
      transform: scale(1.05);
    }

    .life-card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(2,10,2,0.82) 0%,
        rgba(2,10,2,0.25) 45%,
        rgba(2,10,2,0) 100%
      );
      transition: opacity 0.35s;
      z-index: 1;
    }
    .life-card:hover .life-card-overlay { opacity: 0.9; }

    .life-card-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 2rem 1.75rem;
      z-index: 2;
    }

    .life-card-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.5rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #ffffff;
      background: rgba(15,118,110,0.75);
      padding: 4px 10px;
      border-radius: 2px;
      font-weight: 600;
      margin-bottom: 0.75rem;
      backdrop-filter: blur(4px);
    }

    .life-card-title {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 1.35rem;
      font-weight: 200;
      color: #f5f0e8;
      line-height: 1.2;
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
    }

    .life-card-desc {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.82rem;
      color: rgba(236,228,208,0.7);
      font-weight: 300;
      line-height: 1.7;
      margin: 0;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.35s, transform 0.35s;
    }
    .life-card:hover .life-card-desc {
      opacity: 1;
      transform: translateY(0);
    }

    .life-eyebrow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.9rem;
      margin-bottom: 1rem;
    }
    .life-eyebrow-line {
      width: 28px; height: 1px;
      background: var(--color-primary);
      opacity: 0.5;
    }
    .life-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.875rem;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: var(--color-primary);
      font-weight: 500;
    }
  `}</style>

  <div style={{ maxWidth: '78rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}>

    <div className="life-eyebrow">
      <span className="life-eyebrow-line" />
      <span className="life-eyebrow-text">Life at the Retreat</span>
      <span className="life-eyebrow-line" />
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      margin: '0 0 3.5rem',
      lineHeight: 1.1,
      textAlign: 'center',
    }}>
      Mountains. People.{' '}
      <span style={{ color: 'var(--color-primary)', fontWeight: 200 }}>Moments.</span>
    </h2>

    <div className="life-grid scroll-fade-stagger">
      {[
        {
          image: images.moments.meditation,
          tag: '🧘 Meditation',
          title: 'Stillness in the Mountains',
          desc: 'Morning practice as mist lifts over the valley. Breathwork, silence, and the sound of wind.',
        },
        {
          image: images.moments.walking,
          tag: '🚶 Walking',
          title: 'Trails That Clear the Mind',
          desc: 'Forest paths, ridge walks, and the kind of quiet that only mountains offer.',
        },
        {
          image: images.moments.tea,
          tag: '🍵 Tea Vibes',
          title: 'Evenings Around the Fire',
          desc: 'Chai, conversation, and the warmth of a fire as the Himalayas turn golden.',
        },
      ].map((item, i) => (
        <div key={i} className="life-card">
          <div className="life-card-img-wrap">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(max-width: 580px) 100vw, (max-width: 900px) 50vw, 33vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              quality={85}
            />
          </div>
          <div className="life-card-overlay" />
          <div className="life-card-content">
            <div className="life-card-tag">{item.tag}</div>
            <div className="life-card-title">{item.title}</div>
            <p className="life-card-desc">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>
{/* SECTION: A DAY IN YOUR RETREAT — Timeline */}
<section style={{
  marginBottom: '0',
  marginTop: '0',
  paddingTop: '6rem',
  paddingBottom: '6rem',
  background: '#ffffff',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  position: 'relative',
  overflow: 'hidden',
  borderBottom: '1px solid #e5e7eb',
}}>
  <style>{`
    .day-bg-line {
      position: absolute;
      left: 50%;
      top: 0; bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, transparent, rgba(15,118,110,0.1) 20%, rgba(15,118,110,0.1) 80%, transparent);
      transform: translateX(-50%);
    }

    .day-eyebrow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.9rem;
      margin-bottom: 1rem;
    }
    .day-eyebrow-line {
      width: 28px; height: 1px;
      background: var(--color-primary);
      opacity: 0.5;
    }
    .day-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.875rem;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: var(--color-primary);
      font-weight: 500;
    }

    .day-timeline {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 0;
      margin-top: 4rem;
    }

    .day-timeline::before {
      content: '';
      position: absolute;
      top: 2.6rem;
      left: 12.5%;
      right: 12.5%;
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(15,118,110,0.2) 20%, rgba(15,118,110,0.2) 80%, transparent);
    }

    .day-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 0 1.5rem;
      position: relative;
    }

    .day-dot-wrap {
      position: relative;
      margin-bottom: 1.75rem;
    }
    .day-dot {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      background: rgba(15,118,110,0.06);
      border: 1px solid rgba(15,118,110,0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.75rem;
      transition: background 0.35s, border-color 0.35s, transform 0.35s;
      cursor: default;
      position: relative;
    }
    .day-block:hover .day-dot {
      background: rgba(15,118,110,0.12);
      border-color: rgba(15,118,110,0.4);
      transform: scale(1.08);
    }
    .day-dot::after {
      content: '';
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 1px solid rgba(15,118,110,0.15);
      opacity: 0;
      transform: scale(0.85);
      transition: opacity 0.4s, transform 0.4s;
    }
    .day-block:hover .day-dot::after {
      opacity: 1;
      transform: scale(1);
    }

    .day-time {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.52rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--color-primary);
      font-weight: 600;
      opacity: 0.8;
      margin-bottom: 0.6rem;
    }

    .day-title {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 1.1rem;
      font-weight: 300;
      color: #1a1814;
      letter-spacing: -0.01em;
      line-height: 1.25;
      margin-bottom: 0.75rem;
    }

    .day-divider {
      width: 20px;
      height: 1px;
      background: rgba(15,118,110,0.35);
      margin: 0 auto 0.75rem;
    }

    .day-desc {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.82rem;
      line-height: 1.85;
      color: rgba(80,70,55,0.65);
      font-weight: 300;
      max-width: 180px;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      .day-timeline {
        grid-template-columns: 1fr;
        gap: 0;
      }
      .day-timeline::before { display: none; }
      .day-block {
        flex-direction: row;
        text-align: left;
        align-items: flex-start;
        padding: 2rem 1rem;
        border-bottom: 1px solid rgba(15,118,110,0.08);
        gap: 1.5rem;
      }
      .day-block:last-child { border-bottom: none; }
      .day-dot-wrap { margin-bottom: 0; flex-shrink: 0; }
      .day-dot { width: 3.5rem; height: 3.5rem; font-size: 1.25rem; }
      .day-desc { max-width: 100%; }
      .day-bg-line { display: none; }
    }
  `}</style>

  <div className="day-bg-line" />

  <div style={{ maxWidth: '78rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem', position: 'relative', zIndex: 1 }}>

    <div className="day-eyebrow">
      <span className="day-eyebrow-line" />
      <span className="day-eyebrow-text">The Experience</span>
      <span className="day-eyebrow-line" />
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      margin: '0',
      lineHeight: 1.1,
      textAlign: 'center',
    }}>
      A Day in Your{' '}
      <span style={{ color: 'var(--color-primary)', fontWeight: 200 }}>Retreat</span>
    </h2>

    <p style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.9rem',
      color: 'rgba(80,70,55,0.6)',
      fontWeight: 300,
      textAlign: 'center',
      marginTop: '0.75rem',
      marginBottom: '0',
      letterSpacing: '0.01em',
    }}>
      No alarms. No schedules. Just a rhythm that feels right.
    </p>

    <div className="day-timeline scroll-fade-stagger">
      {[
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="var(--color-primary)" strokeWidth="1.2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
      </svg>
    ),
    time: 'Morning',
    title: 'Yoga & Stillness',
    desc: 'Gentle movement as the sun rises over the peaks. Breathwork, asana, and silence before the world wakes.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="var(--color-primary)" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M3 17l4-8 4 4 3-6 4 10"/>
        <path d="M2 20h20"/>
      </svg>
    ),
    time: 'Afternoon',
    title: 'Explore & Wander',
    desc: 'Forest walks, village trails, or simply sitting by a stream. The mountain teaches at its own pace.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="var(--color-primary)" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>
        <path d="M19 3v4M21 5h-4"/>
      </svg>
    ),
    time: 'Evening',
    title: 'Sunset & Reflection',
    desc: 'Watch the light shift over the valley. Journal, sketch, or just be. No agenda, only presence.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="var(--color-primary)" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M12 22c4.97 0 9-2.69 9-6 0-1.5-.75-2.87-2-3.9"/>
        <path d="M12 16c4.97 0 9-2.69 9-6S16.97 4 12 4 3 6.69 3 10c0 1.5.75 2.87 2 3.9"/>
        <path d="M12 16v6M8 18l4 4 4-4"/>
      </svg>
    ),
    time: 'Night',
    title: 'Chill & Unwind',
    desc: 'Chai around the fire. Conversations that matter, or the comfort of deep mountain silence.',
  },
].map((item, i) => (
  <div key={i} className="day-block">
    <div className="day-dot-wrap">
      <div className="day-dot">{item.icon}</div>
    </div>
    <div>
      <div className="day-time">{item.time}</div>
      <div className="day-title">{item.title}</div>
      <div className="day-divider" />
      <p className="day-desc">{item.desc}</p>
    </div>
  </div>
))}
    </div>

  </div>
</section>
     {/* SECTION 8: FINAL INVITATION CTA */}
<section style={{
  position: 'relative',
  overflow: 'hidden',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
}}>
  <style>{`
    @keyframes ctaLineGrow {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes ctaFadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Layout ── */
    .cta8-inner {
      max-width: 78rem;
      margin: 0 auto;
      padding: 7rem 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5rem;
      align-items: center;
      animation: ctaFadeUp 0.8s ease 0.15s both;
    }

    /* ── Left ── */
    .cta8-eyebrow {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      margin-bottom: 1.25rem;
    }
    .cta8-eyebrow-line {
      width: 28px; height: 1px;
      background: rgba(255,255,255,0.5);
      opacity: 0.5;
      display: block;
      transform-origin: left;
      animation: ctaLineGrow 0.8s ease 0.4s both;
    }
    .cta8-eyebrow-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.56rem;
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.7);
      font-weight: 500;
      opacity: 0.7;
    }

    .cta8-headline {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: clamp(2.2rem, 4vw, 3.5rem);
      font-weight: 200;
      letter-spacing: -0.035em;
      color: #ffffff;
      line-height: 1.05;
      margin: 0 0 1.75rem;
    }
    .cta8-headline-accent {
      color: var(--color-primary);
      font-weight: 200;
      display: block;
    }

    .cta8-divider {
      width: 40px;
      height: 1px;
      background: var(--color-border);
      margin: 0 0 1.75rem;
    }

    .cta8-body {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.95rem;
      line-height: 2;
      color: rgba(255,255,255,0.75);
      font-weight: 300;
      max-width: 380px;
      margin: 0 0 2.5rem;
    }

    /* Pillars */
    .cta8-pillars {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }
    .cta8-pillar {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .cta8-pillar-dot {
      width: 5px; height: 5px;
      border-radius: 50%;
      background: var(--color-primary);
      opacity: 0.4;
      flex-shrink: 0;
    }
    .cta8-pillar-text {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.82rem;
      color: rgba(255,255,255,0.65);
      font-weight: 300;
    }

    /* ── Right card ── */
    .cta8-card {
      background: #ffffff;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      padding: 3rem 2.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06);
    }

    /* Stats */
    .cta8-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      border: 1px solid var(--color-border);
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 2.5rem;
    }
    .cta8-stat {
      text-align: center;
      padding: 1.25rem 0.5rem;
      position: relative;
      background: #fafafa;
    }
    .cta8-stat::after {
      content: '';
      position: absolute;
      right: 0; top: 20%; bottom: 20%;
      width: 1px;
      background: var(--color-border);
    }
    .cta8-stat:last-child::after { display: none; }
    .cta8-stat-num {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 1.5rem;
      font-weight: 200;
      color: var(--color-primary);
      letter-spacing: -0.03em;
      line-height: 1;
      margin-bottom: 0.3rem;
    }
    .cta8-stat-label {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.5rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #666666;
    }

    /* Card heading */
    .cta8-card-heading {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 1rem;
      font-weight: 600;
      color: #111111;
      letter-spacing: -0.01em;
      margin: 0 0 0.4rem;
    }
    .cta8-card-sub {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.82rem;
      color: var(--color-muted);
      font-weight: 300;
      line-height: 1.7;
      margin: 0 0 2rem;
    }

    /* Buttons */
    .cta8-btn-primary {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      padding: 14px 28px;
      background: var(--color-primary);
      color: #ffffff;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.62rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      transition: opacity 0.2s, transform 0.18s, box-shadow 0.2s;
      margin-bottom: 0.75rem;
    }
    .cta8-btn-primary:hover {
      opacity: 0.88;
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(15,118,110,0.2);
    }

    .cta8-btn-ghost {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 13px 28px;
      background: transparent;
      color: #444444;
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.62rem;
      font-weight: 400;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      transition: border-color 0.2s, color 0.2s, transform 0.18s;
    }
    .cta8-btn-ghost:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
      transform: translateY(-2px);
    }

    /* Trust row */
    .cta8-trust {
      margin-top: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .cta8-trust-item {
      font-family: var(--font-geist-sans), sans-serif;
      font-size: 0.54rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #666666;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .cta8-trust-dot {
      width: 3px; height: 3px;
      border-radius: 50%;
      background: var(--color-primary);
      opacity: 0.4;
    }
    .cta8-trust-item:first-child .cta8-trust-dot { display: none; }

    @media (max-width: 860px) {
      .cta8-inner {
        grid-template-columns: 1fr;
        gap: 3rem;
        padding: 5rem 1.5rem;
      }
      .cta8-headline { font-size: clamp(2rem, 7vw, 2.8rem); }
    }
  `}</style>
{/* Mountain background */}
<div style={{
  position: 'absolute',
  inset: 0,
  zIndex: 0,
}}>
  <Image
    src={images.heroes.valleyForest.src}
    alt={images.heroes.valleyForest.alt}
    fill
    quality={85}
    style={{
      objectFit: 'cover',
      objectPosition: 'center',
      filter: 'brightness(0.6) saturate(1)',
    }}
  />
  <div style={{
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to right, rgba(5,20,10,0.75) 0%, rgba(5,20,10,0.55) 50%, rgba(5,20,10,0.15) 100%)'
  }} />
</div>
  {/* Top green line */}
  <div style={{
    height: '2px',
    zIndex: 1,
    background: 'linear-gradient(to right, transparent 0%, var(--color-primary) 30%, var(--color-primary) 70%, transparent 100%)',
    opacity: 0.25,
    transformOrigin: 'left',
    animation: 'ctaLineGrow 1.2s ease forwards',
  }} />

  <div className="cta8-inner" style={{ position: 'relative', zIndex: 1 }}>

    {/* ── LEFT ── */}
    <div>
      <div className="cta8-eyebrow">
        <span className="cta8-eyebrow-line" />
        <span className="cta8-eyebrow-text">Begin Your Journey</span>
      </div>

      <h2 className="cta8-headline">
        The mountains<br />
        are waiting.
        <span className="cta8-headline-accent">Are you ready?</span>
      </h2>

      <div className="cta8-divider" />

      <p className="cta8-body">
        Tell us what you&apos;re seeking. We&apos;ll listen — and together design something real, in the Himalayas.
      </p>

      <div className="cta8-pillars">
        {[
          'Small groups only — never crowded',
          'Every journey built in conversation',
          'No fixed dates, no fixed packages',
        ].map((text) => (
          <div key={text} className="cta8-pillar">
            <span className="cta8-pillar-dot" />
            <span className="cta8-pillar-text">{text}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ── RIGHT CARD ── */}
    <div className="cta8-card">

      {/* Stats */}
      <div className="cta8-stats">
        {[
          { num: '8+',   label: 'Locations'  },
          { num: '100%', label: 'Custom'     },
          { num: '1:1',  label: 'Consult'    },
        ].map((s) => (
          <div key={s.num} className="cta8-stat">
            <div className="cta8-stat-num">{s.num}</div>
            <div className="cta8-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '0.4rem',
  flexWrap: 'wrap',
  gap: '0.5rem',
}}>
  <h3 className="cta8-card-heading" style={{ margin: 0 }}>Start with a conversation</h3>
  <span style={{
    fontFamily: 'var(--font-geist-sans), sans-serif',
    fontSize: '0.72rem',
    fontWeight: 600,
    color: 'var(--color-primary)',
    background: 'rgba(15,118,110,0.08)',
    padding: '4px 10px',
    borderRadius: '2px',
    letterSpacing: '0.05em',
  }}>Starting from ₹18,000</span>
</div>
      <p className="cta8-card-sub">
  No forms, no checkout. Just tell us what you&apos;re looking for — we&apos;ll take it from there.
  <span style={{ display: 'block', marginTop: '0.3rem', opacity: 0.7 }}>
    Custom pricing based on your plan.
  </span>
</p>

      <button
        className="cta8-btn-primary"
        onClick={() => {
          logWhatsAppOpen('/', undefined, undefined);
          window.open(whatsappLink, '_blank');
        }}
      >
        Talk on WhatsApp
      </button>

      <Link href="/retreats" className="cta8-btn-ghost">
        Browse Retreats
      </Link>

      <div className="cta8-trust">
        {['Small groups', 'No fixed dates', 'Fully custom'].map((t, i) => (
          <span key={t} className="cta8-trust-item">
            {i !== 0 && <span className="cta8-trust-dot" />}
            {t}
          </span>
        ))}
      </div>

    </div>
  </div>

  {/* Bottom border */}
  <div style={{
    height: '1px',
    background: 'linear-gradient(to right, transparent, var(--color-border), transparent)',
  }} />

</section>
    </>
  );
}