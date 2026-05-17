'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { LocationId } from '@/config/locations';
import MicroCommitment from '@/components/MicroCommitment';
import ArtFixedDepartures from '@/components/ArtFixedDepartures';
import { getFacilitatorsByRetreat } from '@/config/facilitators';
import { useEffect } from 'react';
interface Location {
  id: LocationId;
  name: string;
  tagline: string;
}

interface RetreatService {
  readonly title: string;
  readonly oneLineEssence: string;
  readonly description: string;
  readonly keyHighlights?: readonly string[];
  readonly heroImage?: string;
  readonly heroAlt?: string;
  readonly signatureImage?: string;
  readonly signatureAlt?: string;
  readonly signatureQuote?: string;
  readonly galleryImages?: readonly { readonly src: string; readonly alt: string; readonly objectPosition?: string }[];
  readonly forNotFor: {
    readonly for: readonly string[];
    readonly notFor: readonly string[];
  };
  readonly idealIf?: readonly string[];
  readonly whatMakesItUnique?: {
    readonly intro: string;
    readonly points: readonly { readonly title: string; readonly description: string }[];
  };
  readonly experiences?: readonly { readonly title: string; readonly description: string }[];
  readonly placesWeExplore?: readonly { readonly name: string; readonly description: string }[];
  readonly howItWorks: {
    readonly rhythm: string;
  };
  readonly foodAndAccommodation?: string;
  readonly locationInfo?: {
    readonly name: string;
    readonly description: string;
  };
  readonly travel?: {
    readonly fromDelhi: string;
    readonly fromDehradun: string;
    readonly note: string;
  };
  readonly whereItWorksBest: {
    readonly primary: string;
    readonly primaryReason: string;
    readonly alsoWorks: readonly string[];
    readonly contextByLocation: Readonly<Record<string, string>>;
  };
  readonly adaptability: string;
  readonly invitation: string;
}

interface SuggestedTrek {
  slug: string;
  title: string;
  locationId: string;
}

interface RetreatJourneyClientProps {
  retreat: RetreatService;
  locations: Location[];
  suggestedTrek?: SuggestedTrek;
  retreatSlug: string;
}

export default function RetreatJourneyClient({ retreat, locations, suggestedTrek, retreatSlug }: RetreatJourneyClientProps) {
  const isYogaJourney = retreatSlug === 'yoga-and-movement';
  const isTrekPaintJourney = retreatSlug === 'trek-and-paint';
  const trekPaintFacilitator = isTrekPaintJourney ? getFacilitatorsByRetreat('trek-and-paint')[0] : undefined;

 // Defer scroll-fade observer to after LCP paint
  useEffect(() => {
    const init = () => {
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
    };
    // Use requestIdleCallback to defer after main thread is free
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(init, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    } else {
      const tid = setTimeout(init, 500);
      return () => clearTimeout(tid);
    }
  }, []);
   return (
    <div style={{ overflowX: 'hidden', width: '100%' }}>
      <style>{`
        .rj-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }
        .rj-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
        .rj-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); flex-shrink: 0; }
        .rj-eyebrow-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase;
          color: #374151; font-weight: 500;
        }
        .rj-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 200; letter-spacing: -0.035em;
          color: #111111; margin: 0 0 0.85rem; line-height: 1.05;
        }
        .rj-essence {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 1rem; color: #666666;
          font-weight: 300; line-height: 1.75; margin: 0;
        }
        /* ── HERO IMAGE ── */
        .rj-hero { width: 100vw; margin-left: calc(-50vw + 50%); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; min-height: 70vh; text-align: center; }
        .rj-hero-img { position: absolute; inset: 0; }
        .rj-hero .rj-inner { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
        .rj-hero .rj-eyebrow { justify-content: center; }
        .rj-hero .rj-eyebrow-text { color: rgba(255,255,255,0.75); }
        .rj-hero .rj-eyebrow-line { background: rgba(255,255,255,0.5); }
        .rj-hero .rj-title { color: #ffffff; text-shadow: 0 2px 32px rgba(0,0,0,0.7); }
        .rj-hero .rj-essence { color: rgba(255,255,255,0.82); }
        .rj-hero .rj-highlight-tag { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.85); }
        .rj-yoga-hero {
          min-height: clamp(60vh, 78vh, 85vh);
          background: #0a1a18;
        }
        .rj-yoga-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(15,118,110,0.08) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, rgba(10,20,18,0.12) 100%);
          z-index: 1;
          pointer-events: none;
        }
        .rj-yoga-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.55) 100%);
          z-index: 1;
          pointer-events: none;
        }
        .rj-yoga-hero .rj-inner { padding: 5rem 2rem; }
        .rj-yoga-hero .rj-eyebrow-text {
          color: rgba(255,255,255,0.68);
          font-weight: 500;
          letter-spacing: 0.32em;
        }
        .rj-yoga-hero .rj-eyebrow-line { background: rgba(255,255,255,0.4); }
        .rj-yoga-hero .rj-title {
          font-size: clamp(2.2rem, 5vw, 3.2rem);
          letter-spacing: -0.04em;
          line-height: 1.1;
          text-shadow: 0 8px 32px rgba(0,0,0,0.4);
          margin-bottom: 1.2rem;
        }
        .rj-yoga-hero .rj-essence {
          font-size: 1.02rem;
          line-height: 1.8;
          max-width: 42rem;
          color: rgba(255,255,255,0.8);
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        /* ── GALLERY ── */
        .rj-gallery { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 3rem; }
        @media (max-width: 600px) { .rj-gallery { grid-template-columns: 1fr; } }
        .rj-gallery-item { border-radius: 10px; overflow: hidden; }
        /* ── SIGNATURE ── */
        .rj-signature { width: 100vw; margin-left: calc(-50vw + 50%); position: relative; height: 50vh; min-height: 400px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .rj-signature-text { position: relative; z-index: 2; max-width: 44rem; text-align: center; padding: 2rem; }
        .rj-signature-quote { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1.3rem, 3.5vw, 2.4rem); font-weight: 100; color: #ffffff; line-height: 1.4; letter-spacing: -0.03em; margin: 0; text-shadow: 0 4px 24px rgba(0,0,0,0.5); }
        /* ── MID-PAGE CTA ── */
        .rj-mid-cta { width: 100vw; margin-left: calc(-50vw + 50%); background: #0a1f1c; padding: 4rem 0; text-align: center; }
        .rj-mid-cta-inner { max-width: 44rem; margin: 0 auto; padding: 0 2rem; }
        .rj-mid-cta h3 { font-family: var(--font-geist-sans), sans-serif; font-size: clamp(1.2rem, 2.5vw, 1.6rem); font-weight: 200; color: #ffffff; margin: 0 0 0.75rem; letter-spacing: -0.02em; }
        .rj-mid-cta p { font-family: var(--font-geist-sans), sans-serif; font-size: 0.85rem; color: rgba(255,255,255,0.55); font-weight: 300; margin: 0 0 2rem; line-height: 1.7; }
        .rj-mid-cta-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 2.25rem; background: var(--color-primary); color: #fff; text-decoration: none; font-family: var(--font-geist-sans), sans-serif; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.06em; border-radius: 100px; transition: background 0.2s, transform 0.2s; }
        .rj-mid-cta-btn:hover { background: #0d9e95; transform: translateY(-2px); }
        .rj-mid-cta-micro { font-family: var(--font-geist-sans), sans-serif; font-size: 0.7rem; color: rgba(255,255,255,0.3); margin-top: 1rem; }
        /* ── HERO CTA BUTTONS (above the fold) ── */
        .rj-hero-ctas { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 2rem; justify-content: center; }
        .rj-hero-cta-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 2rem; background: #ffffff; color: #0a1f1c;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; text-decoration: none;
          border-radius: 100px; border: 2px solid #ffffff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .rj-hero-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.25); }
        .rj-hero-cta-secondary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 2rem; background: transparent;
          color: rgba(255,255,255,0.85);
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.78rem; font-weight: 400; letter-spacing: 0.06em;
          text-transform: uppercase; text-decoration: none;
          border-radius: 100px; border: 1.5px solid rgba(255,255,255,0.35);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .rj-hero-cta-secondary:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.7); }
        .rj-yoga-hero .rj-hero-ctas { gap: 1rem; margin-top: 2.5rem; }
        .rj-yoga-hero .rj-hero-cta-primary {
          padding: 0.95rem 2.5rem;
          border-radius: 50px;
          border: none;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 8px 24px rgba(255,255,255,0.15);
        }
        .rj-yoga-hero .rj-hero-cta-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(255,255,255,0.25);
          background: #f5f5f5;
        }
        .rj-yoga-hero .rj-hero-cta-secondary {
          padding: 0.95rem 2.5rem;
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.9);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          border-radius: 50px;
          border-color: rgba(255,255,255,0.25);
          backdrop-filter: blur(4px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .rj-yoga-hero .rj-hero-cta-secondary:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.5);
        }
        /* Non-hero (light bg) variants */
        .rj-hero-ctas--light .rj-hero-cta-primary {
          background: var(--color-primary); color: #fff; border-color: var(--color-primary);
        }
        .rj-hero-ctas--light .rj-hero-cta-secondary {
          color: #374151; border-color: rgba(15,118,110,0.3);
        }
        .rj-hero-ctas--light .rj-hero-cta-secondary:hover { border-color: var(--color-primary); }
        @media (max-width: 520px) {
          .rj-hero-ctas { flex-direction: column; align-items: center; }
          .rj-yoga-hero .rj-hero-ctas { align-items: stretch; gap: 0.9rem; }
          .rj-yoga-hero .rj-inner { padding: 3.5rem 1.5rem; }
        }
      `}</style>

      {/* HEADER — with or without hero image */}
      {retreat.heroImage ? (
        <section className={isYogaJourney ? 'rj-hero rj-yoga-hero' : 'rj-hero'}>
          <div className="rj-hero-img">
            <Image src={retreat.heroImage} alt={retreat.heroAlt || `${retreat.title} retreat in the Himalayas`} width={1920} height={1080} priority fetchPriority="high" quality={60} sizes="100vw" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
          </div>
          <div className="rj-inner scroll-fade">
            <div className="rj-eyebrow">
              <span className="rj-eyebrow-line" />
              <span className="rj-eyebrow-text">Retreat Journey</span>
            </div>
            <h1 className="rj-title">{retreat.title}</h1>
            <p className="rj-essence">{retreat.oneLineEssence}</p>
            {retreat.keyHighlights && retreat.keyHighlights.length > 0 && (
              <div style={isYogaJourney
                ? { display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginTop: '2rem', justifyContent: 'center' }
                : { display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1.75rem', justifyContent: 'center' }}
              >
                {retreat.keyHighlights.map((h, i) => (
                  <span
                    key={i}
                    className="rj-highlight-tag"
                    style={isYogaJourney
                      ? { fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.88)', borderRadius: '6px', padding: '0.5rem 1rem', backdropFilter: 'blur(8px)' }
                      : { fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.85)', borderRadius: '4px', padding: '0.4rem 0.85rem' }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}
            {/* Above-the-fold CTA */}
            <div className="rj-hero-ctas">
              <a
                href={`https://wa.me/919760446101?text=${encodeURIComponent(`Hi, I'm interested in the ${retreat.title} retreat. Can you tell me more?`)}`}
                target="_blank" rel="noopener noreferrer"
                className="rj-hero-cta-primary"
              >Check Dates & Starting Price →</a>
              <a href="#about-this-retreat" className="rj-hero-cta-secondary">See Retreat Details ↓</a>
            </div>
          </div>
        </section>
      ) : (
        <section style={{ marginBottom: '0', marginTop: '0', paddingTop: '5rem', paddingBottom: '5rem', background: '#f7f9f7', width: '100vw', marginLeft: 'calc(-50vw + 50%)', borderBottom: '1px solid #e5e7eb' }}>
          <div className="rj-inner scroll-fade">
            <div className="rj-eyebrow">
              <span className="rj-eyebrow-line" />
              <span className="rj-eyebrow-text">Retreat Journey</span>
            </div>
            <h1 className="rj-title">{retreat.title}</h1>
            <p className="rj-essence">{retreat.oneLineEssence}</p>
            {retreat.keyHighlights && retreat.keyHighlights.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1.75rem' }}>
                {retreat.keyHighlights.map((h, i) => (
                  <span key={i} className="rj-highlight-tag" style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#374151', background: 'rgba(15,118,110,0.08)', border: '1px solid rgba(15,118,110,0.18)', borderRadius: '4px', padding: '0.4rem 0.85rem' }}>{h}</span>
                ))}
              </div>
            )}
            {/* Above-the-fold CTA (light bg variant) */}
            <div className="rj-hero-ctas rj-hero-ctas--light">
              <a
                href={`https://wa.me/919760446101?text=${encodeURIComponent(`Hi, I'm interested in the ${retreat.title} retreat. Can you tell me more?`)}`}
                target="_blank" rel="noopener noreferrer"
                className="rj-hero-cta-primary"
              >Check Dates & Starting Price →</a>
              <a href="#about-this-retreat" className="rj-hero-cta-secondary">See Retreat Details ↓</a>
            </div>
          </div>
        </section>
      )}

      <ArtFixedDepartures mode="single" retreatSlug={retreatSlug} />

      {isTrekPaintJourney && trekPaintFacilitator && (
        <section style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          background: '#ffffff',
          paddingTop: '4.5rem',
          paddingBottom: '4.5rem',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <style>{`
            .rj-tp-fac-inner {
              max-width: 56rem;
              margin: 0 auto;
              padding: 0 2rem;
            }
            .rj-tp-fac-head {
              text-align: center;
              max-width: 42rem;
              margin: 0 auto 2rem;
            }
            .rj-tp-fac-eyebrow {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.75rem;
              margin-bottom: 1rem;
            }
            .rj-tp-fac-line {
              width: 24px;
              height: 1px;
              background: var(--color-primary);
              flex-shrink: 0;
            }
            .rj-tp-fac-label {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.75rem;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              color: #374151;
              font-weight: 500;
            }
            .rj-tp-fac-title {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.5rem, 3vw, 2.2rem);
              font-weight: 200;
              letter-spacing: -0.04em;
              line-height: 1.1;
              color: #111111;
              margin: 0;
            }
            .rj-tp-fac-title span {
              color: #374151;
            }
            .rj-tp-fac-card {
              display: grid;
              grid-template-columns: minmax(220px, 0.82fr) minmax(0, 1.35fr);
              gap: 2rem;
              align-items: center;
              border: 1px solid #eef0ee;
              border-radius: 14px;
              background: #f7f9f7;
              padding: 1.25rem;
              box-shadow: 0 8px 28px rgba(0,0,0,0.04);
            }
            .rj-tp-fac-image {
              position: relative;
              width: 100%;
              aspect-ratio: 1 / 1;
              border-radius: 12px;
              overflow: hidden;
              background: #eef0ee;
            }
            .rj-tp-fac-kicker {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.72rem;
              font-weight: 600;
              letter-spacing: 0.18em;
              text-transform: uppercase;
              color: #374151;
              margin: 0 0 0.75rem;
            }
            .rj-tp-fac-name {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.2rem, 2vw, 1.55rem);
              font-weight: 400;
              color: #111111;
              margin: 0 0 0.35rem;
              letter-spacing: -0.025em;
            }
            .rj-tp-fac-role {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.88rem;
              color: #374151;
              font-weight: 450;
              margin: 0 0 1rem;
            }
            .rj-tp-fac-body {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.88rem;
              line-height: 1.8;
              color: #555555;
              font-weight: 300;
              margin: 0 0 1.25rem;
            }
            .rj-tp-fac-tags {
              display: flex;
              flex-wrap: wrap;
              gap: 0.5rem;
              margin-bottom: 1.25rem;
            }
            .rj-tp-fac-tag {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.68rem;
              font-weight: 500;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              color: #374151;
              border: 1px solid rgba(15,118,110,0.18);
              border-radius: 100px;
              padding: 0.35rem 0.7rem;
              background: #ffffff;
            }
            .rj-tp-fac-link {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 0.72rem 1.1rem;
              border-radius: 999px;
              border: 1px solid rgba(15,118,110,0.28);
              color: #374151;
              text-decoration: none;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.72rem;
              font-weight: 650;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              transition: transform 0.2s ease, border-color 0.2s ease;
            }
            .rj-tp-fac-link:hover {
              transform: translateY(-2px);
              border-color: var(--color-primary);
            }
            @media (max-width: 720px) {
              .rj-tp-fac-card {
                grid-template-columns: 1fr;
              }
              .rj-tp-fac-inner {
                padding: 0 1.25rem;
              }
            }
          `}</style>

          <div className="rj-tp-fac-inner scroll-fade">
            <div className="rj-tp-fac-head">
              <div className="rj-tp-fac-eyebrow">
                <span className="rj-tp-fac-line" />
                <span className="rj-tp-fac-label">Creative Facilitation</span>
                <span className="rj-tp-fac-line" />
              </div>
              <h2 className="rj-tp-fac-title">
                Trek & Paint is held by <span>a real creative facilitator.</span>
              </h2>
            </div>

            <div className="rj-tp-fac-card">
              {trekPaintFacilitator.image && (
                <div className="rj-tp-fac-image">
                  <Image
                    src="/Images/art-retreat/chaitra/garden-canvas-painting-art-retreat.webp"
                    alt="Chaitra Ram guiding canvas painting during a real art retreat"
                    width={800}
                    height={800}
                    loading="lazy"
                    quality={70}
                    sizes="(max-width: 720px) 100vw, 320px"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}
                  />
                </div>
              )}

              <div>
                <p className="rj-tp-fac-kicker">{trekPaintFacilitator.yearsExperience} years experience</p>
                <h3 className="rj-tp-fac-name">{trekPaintFacilitator.name}</h3>
                <p className="rj-tp-fac-role">{trekPaintFacilitator.title}</p>
                <p className="rj-tp-fac-body">{trekPaintFacilitator.approach}</p>

                <div className="rj-tp-fac-tags">
                  {trekPaintFacilitator.specialisations.map((item) => (
                    <span key={item} className="rj-tp-fac-tag">{item}</span>
                  ))}
                </div>

                <Link href={`/facilitators/${trekPaintFacilitator.slug}`} className="rj-tp-fac-link">
                  Meet {trekPaintFacilitator.name.split(' ')[0]} →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DESCRIPTION */}
      {isTrekPaintJourney ? (
        <section id="about-this-retreat" className="rj-tp-about-section">
          <style>{`
            .rj-tp-about-section {
              width: 100%;
              margin: 0;
              background:
                radial-gradient(circle at 12% 12%, rgba(15,118,110,0.08), transparent 30%),
                radial-gradient(circle at 88% 18%, rgba(180,137,79,0.12), transparent 32%),
                linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
              padding: 5rem 0;
              border-bottom: 1px solid #e5e7eb;
              overflow: hidden;
              box-sizing: border-box;
            }
            .rj-tp-about-inner {
              max-width: 64rem;
              margin: 0 auto;
              padding: 0 2rem;
              box-sizing: border-box;
              overflow: hidden;
            }
            .rj-tp-about-head {
              display: grid;
              grid-template-columns: minmax(0, 1fr);
              gap: 1.25rem;
              align-items: start;
              margin-bottom: 2.75rem;
              min-width: 0;
              max-width: 52rem;
            }
            .rj-tp-about-eyebrow {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              margin-bottom: 1rem;
            }
            .rj-tp-about-line {
              width: 24px;
              height: 1px;
              background: var(--color-primary);
              flex-shrink: 0;
            }
            .rj-tp-about-label {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.75rem;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              color: #374151;
              font-weight: 500;
            }
            .rj-tp-about-title {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(2rem, 4.6vw, 4.2rem);
              font-weight: 220;
              letter-spacing: -0.07em;
              line-height: 0.98;
              color: #111111;
              margin: 0;
              text-wrap: balance;
              max-width: 48rem;
              overflow-wrap: normal;
            }
            .rj-tp-about-title span {
              color: #374151;
            }
            .rj-tp-about-intro {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.96rem;
              line-height: 1.85;
              color: #555555;
              font-weight: 300;
              margin: 0;
              max-width: 44rem;
            }
            .rj-tp-about-layout {
              display: grid;
              grid-template-columns: minmax(0, 1fr);
              gap: 1.5rem;
              align-items: stretch;
              min-width: 0;
              margin-bottom: 3.25rem;
            }
            .rj-tp-about-body {
              position: relative;
              background: #ffffff;
              border: 1px solid #eef0ee;
              border-radius: 22px;
              padding: 2.4rem 2.6rem;
              box-shadow: 0 16px 48px rgba(0,0,0,0.045);
              min-width: 0;
              overflow: hidden;
              box-sizing: border-box;
            }
            .rj-tp-about-body::before {
              content: '';
              position: absolute;
              left: 0;
              top: 2rem;
              bottom: 2rem;
              width: 3px;
              background: linear-gradient(to bottom, var(--color-primary), rgba(15,118,110,0));
              border-radius: 999px;
            }
            .rj-tp-about-body p {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.96rem;
              line-height: 1.95;
              color: #3a3a3a;
              font-weight: 300;
              margin: 0;
              white-space: pre-wrap;
            }
            .rj-tp-about-note {
              position: relative;
              overflow: hidden;
              border-radius: 22px;
              background: #0a1f1c;
              border: 1px solid rgba(255,255,255,0.1);
              padding: 2rem;
              display: grid;
              grid-template-columns: minmax(0, 1fr) minmax(240px, 0.75fr);
              gap: 2rem;
              align-items: end;
              min-width: 0;
              box-sizing: border-box;
              z-index: 1;
            }
            .rj-tp-about-note::before {
              content: '';
              position: absolute;
              width: 220px;
              height: 220px;
              border-radius: 999px;
              right: -80px;
              top: -80px;
              background: radial-gradient(circle, rgba(180,137,79,0.38), rgba(180,137,79,0.08) 52%, transparent 72%);
            }
            .rj-tp-about-note > * {
              position: relative;
              z-index: 1;
            }
            .rj-tp-about-note-label {
              display: inline-flex;
              width: max-content;
              border-radius: 999px;
              padding: 0.42rem 0.78rem;
              background: rgba(255,255,255,0.08);
              border: 1px solid rgba(255,255,255,0.14);
              color: rgba(255,255,255,0.78);
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.68rem;
              font-weight: 700;
              letter-spacing: 0.12em;
              text-transform: uppercase;
            }
            .rj-tp-about-note h3 {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.65rem, 3vw, 2.8rem);
              line-height: 1.02;
              letter-spacing: -0.065em;
              font-weight: 230;
              color: #ffffff;
              margin: 1.5rem 0 1rem;
              text-wrap: balance;
              max-width: 38rem;
              overflow-wrap: normal;
            }
            .rj-tp-about-note p {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.86rem;
              line-height: 1.75;
              color: rgba(255,255,255,0.7);
              font-weight: 300;
              margin: 0;
            }
            .rj-tp-flow {
              display: grid;
              gap: 0.7rem;
              margin-top: 0;
            }
            .rj-tp-flow-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 1rem;
              border-radius: 999px;
              background: rgba(255,255,255,0.07);
              border: 1px solid rgba(255,255,255,0.12);
              padding: 0.7rem 0.85rem;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.72rem;
              color: rgba(255,255,255,0.72);
            }
            .rj-tp-flow-row strong {
              color: #ffffff;
              font-weight: 750;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              font-size: 0.66rem;
            }
            .rj-tp-gallery {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 1.5rem;
              margin-top: 0;
              padding-top: 0;
              min-width: 0;
              overflow: visible;
              position: relative;
              z-index: 0;
            }
            .rj-tp-gallery-item {
              position: relative;
              min-height: 360px;
              border-radius: 22px;
              overflow: hidden;
              background: #eef0ee;
              border: 1px solid rgba(15,118,110,0.08);
              box-shadow: 0 16px 48px rgba(0,0,0,0.045);
            }
            .rj-tp-gallery-item:nth-child(2),
            .rj-tp-gallery-item:nth-child(4) {
              transform: none;
            }
            .rj-tp-gallery-item img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }
            .rj-tp-gallery-item::after {
              content: '';
              position: absolute;
              inset: 0;
              background: linear-gradient(to top, rgba(0,0,0,0.18), transparent 45%);
              pointer-events: none;
            }
            @media (max-width: 980px) {
              .rj-tp-about-head,
              .rj-tp-about-layout {
                grid-template-columns: 1fr;
              }
              .rj-tp-gallery {
                grid-template-columns: 1fr;
              }
              .rj-tp-about-note {
                grid-template-columns: 1fr;
              }
            }
            @media (max-width: 640px) {
              .rj-tp-about-section {
                padding: 4rem 0;
              }
              .rj-tp-about-inner {
                padding: 0 1.25rem;
              }
              .rj-tp-about-body,
              .rj-tp-about-note {
                padding: 1.25rem;
                border-radius: 14px;
              }
              .rj-tp-gallery {
                grid-template-columns: 1fr;
              }
              .rj-tp-gallery-item {
                min-height: 280px;
              }
              .rj-tp-gallery-item:nth-child(2),
              .rj-tp-gallery-item:nth-child(4) {
                transform: none;
              }
            }
          `}</style>

          <div className="rj-tp-about-inner">
            <div className="rj-tp-about-head scroll-fade">
              <div>
                <div className="rj-tp-about-eyebrow">
                  <span className="rj-tp-about-line" />
                  <span className="rj-tp-about-label">About This Retreat</span>
                </div>

                <h2 className="rj-tp-about-title">
                  This is not a painting class <span>with a hike attached.</span>
                </h2>
              </div>

              <p className="rj-tp-about-intro">
                The walking is the creative preparation. The trail changes the way you see before you ever open the sketchbook.
              </p>
            </div>

            <div className="rj-tp-about-layout">
              <div className="rj-tp-about-body scroll-fade">
                <p>{retreat.description}</p>
              </div>

              <aside className="rj-tp-about-note scroll-fade">
                <div>
                  <span className="rj-tp-about-note-label">Trail to canvas</span>
                  <h3>Walk first. Paint after the landscape has entered you.</h3>
                  <p>
                    Trek & Paint works because the body slows the mind. By the time you stop at a viewpoint, the landscape is no longer something outside you — it is something you have moved through.
                  </p>
                </div>

                <div className="rj-tp-flow">
                  <div className="rj-tp-flow-row">
                    <strong>Morning</strong>
                    <span>forest trail</span>
                  </div>
                  <div className="rj-tp-flow-row">
                    <strong>Afternoon</strong>
                    <span>live painting</span>
                  </div>
                  <div className="rj-tp-flow-row">
                    <strong>Evening</strong>
                    <span>art review</span>
                  </div>
                </div>
              </aside>
            </div>

            {retreat.galleryImages && retreat.galleryImages.length > 0 && (
              <div className="rj-tp-gallery scroll-fade-stagger">
                {retreat.galleryImages.map((img, i) => (
                  <div key={i} className="rj-tp-gallery-item">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={800}
                      height={600}
                      loading="lazy"
                      quality={65}
                      sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 25vw"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: img.objectPosition || 'center center' }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        <section id="about-this-retreat" style={{
          marginBottom: '0', marginTop: '0',
          paddingTop: '5rem', paddingBottom: '5rem',
          background: '#ffffff',
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <style>{`
            .rj-desc-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }

            .rj-desc-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem; }
            .rj-desc-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary);  }
            .rj-desc-eyebrow-text {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase;
              color: #374151; font-weight: 500;
            }

            .rj-desc-body {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.95rem; line-height: 1.95;
              color: #3a3a3a; font-weight: 300;
              margin: 0; white-space: pre-wrap;
              padding-left: 2rem;
              position: relative;
            }
            .rj-desc-body::before {
              content: '';
              position: absolute;
              left: 0; top: 0.3rem; bottom: 0.3rem;
              width: 2px;
              background: linear-gradient(to bottom, var(--color-primary), transparent);
              border-radius: 2px;
            }
          `}</style>

          <div className="rj-desc-inner scroll-fade">
            <div className="rj-desc-eyebrow">
              <span className="rj-desc-eyebrow-line" />
              <span className="rj-desc-eyebrow-text">About This Retreat</span>
            </div>
            <p className="rj-desc-body">{retreat.description}</p>

            {/* GALLERY — if images exist */}
            {retreat.galleryImages && retreat.galleryImages.length > 0 && (
              <div className="rj-gallery scroll-fade" style={{ marginTop: '3rem' }}>
                {retreat.galleryImages.map((img, i) => (
                  <div key={i} className="rj-gallery-item">
                    <Image src={img.src} alt={img.alt} width={800} height={600} loading="lazy" quality={60} sizes="(max-width: 600px) 100vw, 50vw" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '10px' }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* YOGA OFFERINGS — only for Yoga & Movement */}
      {retreatSlug === 'yoga-and-movement' && (
        <section className="rj-yoga-offerings-section">
          <style>{`
            .rj-yoga-offerings-section {
              position: relative;
              margin: 0;
              padding: 5rem 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .rj-yoga-offerings-section::before {
              content: '';
              position: absolute;
              top: 0; bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 100vw;
              background: #f7f9f7;
              z-index: -1;
            }
            .rj-yoga-offerings-inner { max-width: 56rem; margin: 0 auto; padding: 0 2rem; box-sizing: border-box; }
            .rj-yoga-offerings-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
            .rj-yoga-offerings-line { width: 24px; height: 1px; background: var(--color-primary); flex-shrink: 0; }
            .rj-yoga-offerings-label {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.75rem;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              color: #374151;
              font-weight: 500;
            }
            .rj-yoga-offerings-heading {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.6rem, 3vw, 2.15rem);
              font-weight: 200;
              letter-spacing: -0.035em;
              color: #111111;
              line-height: 1.12;
              margin: 0 0 1rem;
            }
            .rj-yoga-offerings-heading span { color: #374151; }
            .rj-yoga-offerings-intro {
              max-width: 46rem;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.92rem;
              line-height: 1.8;
              color: #555555;
              font-weight: 300;
              margin: 0 0 2.5rem;
            }
            .rj-yoga-offerings-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 1.25rem;
            }
            .rj-yoga-offering-card {
              display: flex;
              flex-direction: column;
              background: #ffffff;
              border: 1px solid #eef0ee;
              border-radius: 10px;
              padding: 1.5rem;
              box-sizing: border-box;
              box-shadow: 0 1px 3px rgba(0,0,0,0.035);
              transition: border-color 0.25s, box-shadow 0.25s;
            }
            .rj-yoga-offering-card:hover {
              border-color: rgba(15,118,110,0.25);
              box-shadow: 0 4px 16px rgba(0,0,0,0.06);
            }
            .rj-yoga-offering-kicker {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.58rem;
              font-weight: 600;
              letter-spacing: 0.18em;
              text-transform: uppercase;
              color: var(--color-primary);
              margin: 0 0 0.65rem;
            }
            .rj-yoga-offering-card h3 {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 1.05rem;
              font-weight: 600;
              color: #111111;
              letter-spacing: -0.02em;
              line-height: 1.25;
              margin: 0 0 0.65rem;
            }
            .rj-yoga-offering-card p {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.85rem;
              line-height: 1.75;
              color: #595959;
              font-weight: 300;
              margin: 0 0 1rem;
            }
            .rj-yoga-offering-meta {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.72rem;
              line-height: 1.55;
              color: #374151;
              font-weight: 500;
              margin-top: auto;
              padding-top: 0.75rem;
              border-top: 1px solid #eef0ee;
            }
            .rj-yoga-offering-cta {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-top: 1rem;
              padding: 0.72rem 1rem;
              border-radius: 999px;
              background: var(--color-primary);
              color: #ffffff;
              text-decoration: none;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.72rem;
              font-weight: 600;
              letter-spacing: 0.05em;
              text-transform: uppercase;
              transition: transform 0.2s ease, background 0.2s ease;
            }
            .rj-yoga-offering-cta:hover { transform: translateY(-2px); background: #0d9e95; }
            @media (min-width: 980px) {
              .rj-yoga-offerings-grid { grid-template-columns: repeat(4, 1fr); }
            }
            @media (max-width: 560px) {
              .rj-yoga-offerings-grid { grid-template-columns: 1fr; }
              .rj-yoga-offerings-inner { padding: 0 1.25rem; }
            }
          `}</style>

          <div className="rj-yoga-offerings-inner scroll-fade">
            <div className="rj-yoga-offerings-eyebrow">
              <span className="rj-yoga-offerings-line" />
              <span className="rj-yoga-offerings-label">Our Yoga Offerings</span>
            </div>

            <h2 className="rj-yoga-offerings-heading">
              Choose the yoga path that <span>fits you</span>
            </h2>

            <p className="rj-yoga-offerings-intro">
              Practise with Sakshi through immersive retreats, teacher training, aerial yoga, or online classes. Each offering is designed for a different stage of practice — from beginning gently to training deeply.
            </p>

            <div className="rj-yoga-offerings-grid">
              {[
                {
                  kicker: 'Retreats',
                  title: 'Yoga Retreats',
                  body: 'Immersive yoga retreats with asana, pranayama, meditation, rest, nature walks, and simple retreat rhythm in Rishikesh and Himalayan settings.',
                  meta: 'Best for: reset, practice, breath, rest',
                  cta: 'Ask Retreat Dates',
                  text: 'Hi, I want to know about Yoga Retreat dates, price, inclusions, and location options.',
                },
                {
                  kicker: 'Training',
                  title: 'Yoga Teacher Training Course',
                  body: 'Yoga teacher training pathways for students who want to deepen their practice or move toward teaching with more structure and discipline.',
                  meta: 'Locations: Rishikesh · Thailand · Bali',
                  cta: 'Ask TTC Details',
                  text: 'Hi, I want details about the Yoga Teacher Training Course in Rishikesh, Thailand, or Bali.',
                },
                {
                  kicker: 'Aerial',
                  title: 'Aerial Yoga Programs',
                  body: 'Aerial yoga programs and classes for supported movement, mobility, strength, decompression, and playful body awareness.',
                  meta: 'Location: Rishikesh',
                  cta: 'Ask Aerial Batches',
                  text: 'Hi, I want details about Aerial Yoga programs and classes in Rishikesh.',
                },
                {
                  kicker: 'Online',
                  title: 'Online Yoga Classes',
                  body: 'Live online yoga classes for students who want to begin from home, maintain regular practice, or continue after a retreat.',
                  meta: 'Format: online guided classes',
                  cta: 'Ask Online Classes',
                  text: 'Hi, I want details about Online Yoga Classes with Sakshi.',
                },
              ].map((offering) => (
                <article key={offering.title} className="rj-yoga-offering-card">
                  <p className="rj-yoga-offering-kicker">{offering.kicker}</p>
                  <h3>{offering.title}</h3>
                  <p>{offering.body}</p>
                  <div className="rj-yoga-offering-meta">{offering.meta}</div>
                  <a
                    href={`https://wa.me/919760446101?text=${encodeURIComponent(offering.text)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rj-yoga-offering-cta"
                  >
                    {offering.cta} →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MICRO COMMITMENT */}
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '1.5rem 2rem' }}>
        <MicroCommitment
          itemKey={retreat.title.toLowerCase().replace(/\s+/g, '-')}
          title={`Save: ${retreat.title}`}
          sourcePath={`/retreats/journeys/${retreat.title.toLowerCase().replace(/\s+/g, '-')}`}
        />
      </div>

      {/* FOR / NOT FOR */}
      {isTrekPaintJourney ? (
        <section className="rj-tp-fit-section">
          <style>{`
            .rj-tp-fit-section {
              width: 100%;
              margin: 0;
              padding: 5rem 0;
              background:
                radial-gradient(circle at 12% 14%, rgba(15,118,110,0.08), transparent 30%),
                linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
              border-bottom: 1px solid #e5e7eb;
              overflow: hidden;
              box-sizing: border-box;
            }
            .rj-tp-fit-inner {
              max-width: 64rem;
              margin: 0 auto;
              padding: 0 2rem;
              box-sizing: border-box;
            }
            .rj-tp-fit-head {
              max-width: 46rem;
              margin-bottom: 2.5rem;
            }
            .rj-tp-fit-eyebrow {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              margin-bottom: 1rem;
            }
            .rj-tp-fit-line {
              width: 24px;
              height: 1px;
              background: var(--color-primary);
              flex-shrink: 0;
            }
            .rj-tp-fit-label {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.75rem;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              color: #374151;
              font-weight: 500;
            }
            .rj-tp-fit-title {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(2rem, 4.4vw, 4rem);
              line-height: 0.98;
              letter-spacing: -0.07em;
              font-weight: 220;
              color: #111111;
              margin: 0 0 1rem;
              text-wrap: balance;
            }
            .rj-tp-fit-title span {
              color: #374151;
            }
            .rj-tp-fit-copy {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.94rem;
              line-height: 1.8;
              color: #555555;
              font-weight: 300;
              margin: 0;
              max-width: 42rem;
            }
            .rj-tp-fit-grid {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 1.25rem;
              align-items: stretch;
            }
            .rj-tp-fit-card {
              border-radius: 24px;
              border: 1px solid #e5e7eb;
              background: #ffffff;
              box-shadow: 0 16px 48px rgba(0,0,0,0.045);
              overflow: hidden;
            }
            .rj-tp-fit-card-for {
              background: linear-gradient(180deg, #ffffff 0%, #f0f7f0 100%);
            }
            .rj-tp-fit-card-not {
              background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
            }
            .rj-tp-fit-card-head {
              padding: 1.35rem 1.5rem;
              border-bottom: 1px solid rgba(0,0,0,0.06);
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 1rem;
            }
            .rj-tp-fit-card-head span:first-child {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.7rem;
              font-weight: 750;
              letter-spacing: 0.16em;
              text-transform: uppercase;
              color: #111111;
            }
            .rj-tp-fit-pill {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 34px;
              height: 34px;
              border-radius: 999px;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.78rem;
              font-weight: 800;
              flex-shrink: 0;
            }
            .rj-tp-fit-pill-for {
              background: var(--color-primary);
              color: #ffffff;
            }
            .rj-tp-fit-pill-not {
              background: #eeeeee;
              color: #555555;
            }
            .rj-tp-fit-list {
              list-style: none;
              margin: 0;
              padding: 1.1rem 1.5rem 1.4rem;
              display: grid;
              gap: 0.85rem;
            }
            .rj-tp-fit-item {
              display: grid;
              grid-template-columns: 22px minmax(0, 1fr);
              gap: 0.75rem;
              align-items: start;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.9rem;
              line-height: 1.65;
              color: #444444;
              font-weight: 300;
              padding-bottom: 0.85rem;
              border-bottom: 1px solid rgba(0,0,0,0.055);
            }
            .rj-tp-fit-item:last-child {
              border-bottom: none;
              padding-bottom: 0;
            }
            .rj-tp-fit-icon {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 22px;
              height: 22px;
              border-radius: 999px;
              margin-top: 0.15rem;
              font-size: 0.66rem;
              font-weight: 800;
              flex-shrink: 0;
            }
            .rj-tp-fit-icon-for {
              background: var(--color-primary);
              color: #ffffff;
            }
            .rj-tp-fit-icon-not {
              background: #eeeeee;
              color: #666666;
            }
            @media (max-width: 760px) {
              .rj-tp-fit-section {
                padding: 4rem 0;
              }
              .rj-tp-fit-inner {
                padding: 0 1.25rem;
              }
              .rj-tp-fit-grid {
                grid-template-columns: 1fr;
              }
              .rj-tp-fit-card {
                border-radius: 18px;
              }
            }
          `}</style>

          <div className="rj-tp-fit-inner">
            <div className="rj-tp-fit-head scroll-fade">
              <div className="rj-tp-fit-eyebrow">
                <span className="rj-tp-fit-line" />
                <span className="rj-tp-fit-label">Is This For You</span>
              </div>

              <h2 className="rj-tp-fit-title">
                Choose this if you want <span>movement and making.</span>
              </h2>

              <p className="rj-tp-fit-copy">
                Trek & Paint is not a hard trek and not a technical art school. It works best when you want moderate walking, real landscapes, beginner-friendly guidance, and enough quiet to make something personal.
              </p>
            </div>

            <div className="rj-tp-fit-grid scroll-fade">
              <div className="rj-tp-fit-card rj-tp-fit-card-for">
                <div className="rj-tp-fit-card-head">
                  <span>This is for you</span>
                  <span className="rj-tp-fit-pill rj-tp-fit-pill-for">✓</span>
                </div>

                <ul className="rj-tp-fit-list">
                  {retreat.forNotFor.for.map((line, idx) => (
                    <li key={idx} className="rj-tp-fit-item">
                      <span className="rj-tp-fit-icon rj-tp-fit-icon-for">✓</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rj-tp-fit-card rj-tp-fit-card-not">
                <div className="rj-tp-fit-card-head">
                  <span>Not the right fit</span>
                  <span className="rj-tp-fit-pill rj-tp-fit-pill-not">—</span>
                </div>

                <ul className="rj-tp-fit-list">
                  {retreat.forNotFor.notFor.map((line, idx) => (
                    <li key={idx} className="rj-tp-fit-item">
                      <span className="rj-tp-fit-icon rj-tp-fit-icon-not">—</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : (
      <section style={{
        marginBottom: '0', marginTop: '0',
        paddingTop: '5rem', paddingBottom: '5rem',
        background: '#f7f9f7',
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <style>{`
          .rj-fn-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }

          .rj-fn-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
          .rj-fn-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary);  }
          .rj-fn-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase;
            color: #374151; font-weight: 500;
          }

          .rj-fn-heading {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
            letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2.5rem;
          }
          .rj-fn-heading span { color: #374151; }

          /* ── Wrap ── */
          .rj-fn-wrap {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
          }

          /* Label bar */
          .rj-fn-bar {
            display: grid;
            grid-template-columns: 1fr 1fr;
            border-bottom: 1px solid #e5e7eb;
          }
          .rj-fn-bar-cell {
            padding: 0.85rem 1.75rem;
            display: flex; align-items: center; gap: 0.6rem;
          }
          .rj-fn-bar-cell:first-child { border-right: 1px solid #e5e7eb; background: #f0f7f0; }
          .rj-fn-bar-cell:last-child  { background: #fafafa; }

          .rj-fn-dot {
            width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
          }
          .rj-fn-dot-green { background: var(--color-primary); }
          .rj-fn-dot-grey  { background: #cccccc; }

          .rj-fn-bar-label {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.6rem; font-weight: 600;
            letter-spacing: 0.2em; text-transform: uppercase;
            color: #111111; 
          }

          /* Body columns */
          .rj-fn-body { display: grid; grid-template-columns: 1fr 1fr; }
          .rj-fn-col { padding: 1.75rem; }
          .rj-fn-col:first-child { border-right: 1px solid #e5e7eb; background: #f0f7f0; }
          .rj-fn-col:last-child  { background: #fafafa; }

          .rj-fn-col-title {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.95rem; font-weight: 600;
            color: #111111; margin: 0 0 1rem; letter-spacing: -0.01em;
          }

          /* List */
          .rj-fn-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0; }

          .rj-fn-item {
            display: flex; align-items: flex-start; gap: 0.75rem;
            padding: 0.85rem 0;
            border-bottom: 1px solid rgba(0,0,0,0.05);
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.87rem; line-height: 1.6; font-weight: 300;
          }
          .rj-fn-item:last-child { border-bottom: none; }
          .rj-fn-item-for { color: #333333; }
          .rj-fn-item-not { color: #595959; }

          .rj-fn-icon-for {
            width: 18px; height: 18px; border-radius: 50%;
            background: var(--color-primary);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; margin-top: 0.1rem;
            font-size: 0.6rem; color: #ffffff; font-weight: 700;
          }
          .rj-fn-icon-not {
            width: 18px; height: 18px; border-radius: 50%;
            background: #eeeeee;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; margin-top: 0.1rem;
            font-size: 0.75rem; color: #636363; font-weight: 400;
          }

          @media (max-width: 600px) {
            .rj-fn-bar  { grid-template-columns: 1fr; }
            .rj-fn-body { grid-template-columns: 1fr; }
            .rj-fn-bar-cell:first-child { border-right: none; border-bottom: 1px solid #e5e7eb; }
            .rj-fn-col:first-child      { border-right: none; border-bottom: 1px solid #e5e7eb; }
          }
        `}</style>

        <div className="rj-fn-inner">
          <div className="rj-fn-eyebrow">
            <span className="rj-fn-eyebrow-line" />
            <span className="rj-fn-eyebrow-text">Is This For You</span>
          </div>

          <h2 className="rj-fn-heading">
            Who this is <span>for</span>
          </h2>

          <div className="rj-fn-wrap scroll-fade">

            {/* Label bar */}
            <div className="rj-fn-bar">
              <div className="rj-fn-bar-cell">
                <span className="rj-fn-dot rj-fn-dot-green" />
                <span className="rj-fn-bar-label">For people who:</span>
              </div>
              <div className="rj-fn-bar-cell">
                <span className="rj-fn-dot rj-fn-dot-grey" />
                <span className="rj-fn-bar-label">Not for people:</span>
              </div>
            </div>

            {/* Body */}
            <div className="rj-fn-body">
              <div className="rj-fn-col">
                <ul className="rj-fn-list">
                  {retreat.forNotFor.for.map((line, idx) => (
                    <li key={idx} className="rj-fn-item rj-fn-item-for">
                      <span className="rj-fn-icon-for">✓</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rj-fn-col">
                <ul className="rj-fn-list">
                  {retreat.forNotFor.notFor.map((line, idx) => (
                    <li key={idx} className="rj-fn-item rj-fn-item-not">
                      <span className="rj-fn-icon-not">—</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      )}

      {/* MID-PAGE CTA — after Who-This-Is-For */}
      <section className="rj-mid-cta">
        <div className="rj-mid-cta-inner">
          <h3>Want dates, price, and fit?</h3>
          <p>Talk with us directly — no forms, no commitment. Just a conversation about what you need.</p>
          <a href={`https://wa.me/919760446101?text=${encodeURIComponent(`Hi, I'm interested in the ${retreat.title} retreat. Can you tell me more?`)}`} className="rj-mid-cta-btn" target="_blank" rel="noopener noreferrer">Ask About This Retreat →</a>
          <p className="rj-mid-cta-micro">Dates · Starting price · Fit guidance</p>
        </div>
      </section>

      {/* IDEAL IF — optional */}
      {retreat.idealIf && retreat.idealIf.length > 0 && (
        <section style={{
          marginBottom: '0', marginTop: '0',
          paddingTop: '5rem', paddingBottom: '5rem',
          background: '#ffffff',
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151', fontWeight: 500}}>You&apos;ll Love This If</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, margin: '0 0 2rem' }}>
              This retreat may be <span style={{ color: '#374151' }}>ideal</span> if you want to
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {retreat.idealIf.map((item, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.9rem', lineHeight: 1.7, fontWeight: 300, color: '#444444',
                }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.15rem', fontSize: '0.6rem', color: '#fff', fontWeight: 700 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── VISUAL BREAK: Mountain landscape ── */}
      <figure style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        position: 'relative', height: '280px',
        overflow: 'hidden', margin: 0,
      }}>
        <img
          src={isTrekPaintJourney ? "/Images/art-retreat/chaitra/outdoor-easel-painting-art-retreat.webp" : "/Images/whyhimalaya/nature.webp"}
          width={isTrekPaintJourney ? 1044 : 800}
          height={isTrekPaintJourney ? 1600 : 476}
          alt={isTrekPaintJourney ? "Outdoor easel painting during a real Himalayan art retreat" : "Himalayan mountain landscape — natural setting for retreat journeys"}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: isTrekPaintJourney ? 'center 45%' : 'center 40%', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)' }} />
        <figcaption style={{
          position: 'absolute', bottom: '1.5rem', left: 0, right: 0, textAlign: 'center',
          fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.7)', fontWeight: 300, letterSpacing: '0.03em',
          padding: '0 1.25rem', boxSizing: 'border-box', lineHeight: 1.5, maxWidth: '100%',
        }}>{isTrekPaintJourney ? 'The trail becomes the studio, and the landscape becomes the subject' : 'The Himalayan landscape becomes part of the retreat experience'}</figcaption>
      </figure>

      {/* WHAT MAKES IT UNIQUE — optional */}
      {retreat.whatMakesItUnique && (
        isTrekPaintJourney ? (
          <section className="rj-tp-unique-section">
            <style>{`
              .rj-tp-unique-section {
                width: 100%;
                margin: 0;
                padding: 5rem 0;
                background:
                  radial-gradient(circle at 12% 12%, rgba(180,137,79,0.12), transparent 30%),
                  radial-gradient(circle at 88% 18%, rgba(15,118,110,0.08), transparent 32%),
                  linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
                border-bottom: 1px solid #e5e7eb;
                overflow: hidden;
                box-sizing: border-box;
              }
              .rj-tp-unique-inner {
                max-width: 64rem;
                margin: 0 auto;
                padding: 0 2rem;
                box-sizing: border-box;
              }
              .rj-tp-unique-head {
                display: grid;
                grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
                gap: 2rem;
                align-items: end;
                margin-bottom: 2.5rem;
              }
              .rj-tp-unique-eyebrow {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 1rem;
              }
              .rj-tp-unique-line {
                width: 24px;
                height: 1px;
                background: var(--color-primary);
                flex-shrink: 0;
              }
              .rj-tp-unique-label {
                font-family: var(--font-geist-sans), sans-serif;
                font-size: 0.75rem;
                letter-spacing: 0.28em;
                text-transform: uppercase;
                color: #374151;
                font-weight: 500;
              }
              .rj-tp-unique-title {
                font-family: var(--font-geist-sans), sans-serif;
                font-size: clamp(2rem, 4.4vw, 4rem);
                line-height: 0.98;
                letter-spacing: -0.07em;
                font-weight: 220;
                color: #111111;
                margin: 0;
                text-wrap: balance;
              }
              .rj-tp-unique-title span {
                color: #374151;
              }
              .rj-tp-unique-copy {
                font-family: var(--font-geist-sans), sans-serif;
                font-size: 0.94rem;
                line-height: 1.85;
                color: #555555;
                font-weight: 300;
                margin: 0;
                max-width: 42rem;
              }
              .rj-tp-unique-grid {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 1.25rem;
              }
              .rj-tp-unique-card {
                position: relative;
                overflow: hidden;
                border-radius: 24px;
                background: #ffffff;
                border: 1px solid #e5e7eb;
                box-shadow: 0 16px 48px rgba(0,0,0,0.045);
                padding: 1.5rem;
                min-height: 250px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              .rj-tp-unique-card::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at top right, rgba(15,118,110,0.08), transparent 38%);
                pointer-events: none;
              }
              .rj-tp-unique-card > * {
                position: relative;
                z-index: 1;
              }
              .rj-tp-unique-top {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 1rem;
                margin-bottom: 1.25rem;
              }
              .rj-tp-unique-kicker {
                display: inline-flex;
                width: max-content;
                max-width: 100%;
                border-radius: 999px;
                padding: 0.42rem 0.78rem;
                background: rgba(15,118,110,0.08);
                border: 1px solid rgba(15,118,110,0.16);
                color: #374151;
                font-family: var(--font-geist-sans), sans-serif;
                font-size: 0.68rem;
                font-weight: 750;
                letter-spacing: 0.12em;
                text-transform: uppercase;
              }
              .rj-tp-unique-num {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 42px;
                height: 42px;
                border-radius: 16px;
                background: #0a1f1c;
                color: #ffffff;
                font-family: var(--font-geist-sans), sans-serif;
                font-size: 0.76rem;
                font-weight: 850;
                flex-shrink: 0;
              }
              .rj-tp-unique-card h3 {
                font-family: var(--font-geist-sans), sans-serif;
                font-size: clamp(1.35rem, 2.6vw, 2.25rem);
                line-height: 1;
                letter-spacing: -0.06em;
                font-weight: 260;
                color: #111111;
                margin: 0 0 0.9rem;
                text-wrap: balance;
              }
              .rj-tp-unique-card p {
                font-family: var(--font-geist-sans), sans-serif;
                font-size: 0.86rem;
                line-height: 1.75;
                color: #555555;
                font-weight: 300;
                margin: 0;
              }
              @media (max-width: 820px) {
                .rj-tp-unique-head {
                  grid-template-columns: 1fr;
                  align-items: start;
                }
                .rj-tp-unique-grid {
                  grid-template-columns: 1fr;
                }
                .rj-tp-unique-card {
                  min-height: auto;
                }
              }
              @media (max-width: 640px) {
                .rj-tp-unique-section {
                  padding: 4rem 0;
                }
                .rj-tp-unique-inner {
                  padding: 0 1.25rem;
                }
                .rj-tp-unique-card {
                  border-radius: 18px;
                  padding: 1.25rem;
                }
              }
            `}</style>

            <div className="rj-tp-unique-inner">
              <div className="rj-tp-unique-head scroll-fade">
                <div>
                  <div className="rj-tp-unique-eyebrow">
                    <span className="rj-tp-unique-line" />
                    <span className="rj-tp-unique-label">What Sets This Apart</span>
                  </div>

                  <h2 className="rj-tp-unique-title">
                    Field notes from a <span>moving studio.</span>
                  </h2>
                </div>

                <p className="rj-tp-unique-copy">
                  {retreat.whatMakesItUnique.intro}
                </p>
              </div>

              <div className="rj-tp-unique-grid scroll-fade">
                {retreat.whatMakesItUnique.points.map((pt, i) => (
                  <div key={pt.title} className="rj-tp-unique-card">
                    <div>
                      <div className="rj-tp-unique-top">
                        <span className="rj-tp-unique-kicker">Field note</span>
                        <span className="rj-tp-unique-num">{String(i + 1).padStart(2, '0')}</span>
                      </div>

                      <h3>{pt.title}</h3>
                    </div>

                    <p>{pt.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section style={{
            marginBottom: '0', marginTop: '0',
            paddingTop: '5rem', paddingBottom: '5rem',
            background: '#f7f9f7',
            width: '100vw', marginLeft: 'calc(-50vw + 50%)',
            borderBottom: '1px solid #e5e7eb',
          }}>
            <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151', fontWeight: 500}}>What Sets This Apart</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, margin: '0 0 1.5rem' }}>
                What makes this retreat <span style={{ color: '#374151' }}>unique</span>
              </h2>
              <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: '#555', fontWeight: 300, margin: '0 0 2.5rem' }}>
                {retreat.whatMakesItUnique.intro}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                {retreat.whatMakesItUnique.points.map((pt, i) => (
                  <div key={i} className="rj-unique-card" style={{
    background: '#ffffff', border: '1px solid #eef0ee', borderRadius: 8,
    padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
  }}>
                    <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', fontWeight: 600, color: '#111', margin: '0 0 0.6rem', letterSpacing: '-0.01em' }}>
                      {pt.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', lineHeight: 1.7, color: '#666', fontWeight: 300, margin: 0 }}>
                      {pt.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      )}

      {/* EXPERIENCES — optional */}
      {retreat.experiences && retreat.experiences.length > 0 && (
        isTrekPaintJourney ? (
          <section className="rj-tp-exp-section">
            <style>{`
              .rj-tp-exp-section {
                width: 100%;
                margin: 0;
                padding: 5rem 0;
                background:
                  radial-gradient(circle at 12% 12%, rgba(15,118,110,0.08), transparent 30%),
                  linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
                border-bottom: 1px solid #e5e7eb;
                overflow: hidden;
                box-sizing: border-box;
              }
              .rj-tp-exp-inner {
                max-width: 64rem;
                margin: 0 auto;
                padding: 0 2rem;
                box-sizing: border-box;
              }
              .rj-tp-exp-head {
                display: grid;
                grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
                gap: 2rem;
                align-items: end;
                margin-bottom: 2.5rem;
              }
              .rj-tp-exp-eyebrow {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 1rem;
              }
              .rj-tp-exp-line {
                width: 24px;
                height: 1px;
                background: var(--color-primary);
                flex-shrink: 0;
              }
              .rj-tp-exp-label {
                font-family: var(--font-geist-sans), sans-serif;
                font-size: 0.75rem;
                letter-spacing: 0.28em;
                text-transform: uppercase;
                color: #374151;
                font-weight: 500;
              }
              .rj-tp-exp-title {
                font-family: var(--font-geist-sans), sans-serif;
                font-size: clamp(2rem, 4.4vw, 4rem);
                line-height: 0.98;
                letter-spacing: -0.07em;
                font-weight: 220;
                color: #111111;
                margin: 0;
                text-wrap: balance;
              }
              .rj-tp-exp-title span {
                color: #374151;
              }
              .rj-tp-exp-copy {
                font-family: var(--font-geist-sans), sans-serif;
                font-size: 0.94rem;
                line-height: 1.85;
                color: #555555;
                font-weight: 300;
                margin: 0;
                max-width: 42rem;
              }
              .rj-tp-exp-grid {
                display: grid;
                grid-template-columns: repeat(4, minmax(0, 1fr));
                gap: 1rem;
              }
              .rj-tp-exp-card {
                position: relative;
                overflow: hidden;
                border-radius: 24px;
                background: #ffffff;
                border: 1px solid #e5e7eb;
                box-shadow: 0 16px 48px rgba(0,0,0,0.045);
                padding: 1.35rem;
                min-height: 310px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              .rj-tp-exp-card::before {
                content: '';
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at top right, rgba(180,137,79,0.13), transparent 42%);
                pointer-events: none;
              }
              .rj-tp-exp-card > * {
                position: relative;
                z-index: 1;
              }
              .rj-tp-exp-num {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 44px;
                height: 44px;
                border-radius: 16px;
                background: #0a1f1c;
                color: #ffffff;
                font-family: var(--font-geist-sans), sans-serif;
                font-size: 0.76rem;
                font-weight: 850;
                margin-bottom: 1.25rem;
              }
              .rj-tp-exp-card h3 {
                font-family: var(--font-geist-sans), sans-serif;
                font-size: clamp(1.2rem, 2.2vw, 1.8rem);
                line-height: 1;
                letter-spacing: -0.055em;
                font-weight: 280;
                color: #111111;
                margin: 0 0 0.85rem;
                text-wrap: balance;
              }
              .rj-tp-exp-card p {
                font-family: var(--font-geist-sans), sans-serif;
                font-size: 0.82rem;
                line-height: 1.7;
                color: #555555;
                font-weight: 300;
                margin: 0;
              }
              @media (max-width: 1080px) {
                .rj-tp-exp-grid {
                  grid-template-columns: repeat(2, minmax(0, 1fr));
                }
              }
              @media (max-width: 820px) {
                .rj-tp-exp-head {
                  grid-template-columns: 1fr;
                  align-items: start;
                }
              }
              @media (max-width: 640px) {
                .rj-tp-exp-section {
                  padding: 4rem 0;
                }
                .rj-tp-exp-inner {
                  padding: 0 1.25rem;
                }
                .rj-tp-exp-grid {
                  grid-template-columns: 1fr;
                }
                .rj-tp-exp-card {
                  min-height: auto;
                  border-radius: 18px;
                  padding: 1.25rem;
                }
              }
            `}</style>

            <div className="rj-tp-exp-inner">
              <div className="rj-tp-exp-head scroll-fade">
                <div>
                  <div className="rj-tp-exp-eyebrow">
                    <span className="rj-tp-exp-line" />
                    <span className="rj-tp-exp-label">The Experience</span>
                  </div>

                  <h2 className="rj-tp-exp-title">
                    The creative process follows <span>the trail.</span>
                  </h2>
                </div>

                <p className="rj-tp-exp-copy">
                  Each day moves through a simple sequence: walk, observe, paint, and review. The rhythm is structured enough to support you and open enough to keep the work personal.
                </p>
              </div>

              <div className="rj-tp-exp-grid scroll-fade">
                {retreat.experiences.map((exp, i) => (
                  <div key={exp.title} className="rj-tp-exp-card">
                    <div>
                      <span className="rj-tp-exp-num">{String(i + 1).padStart(2, '0')}</span>
                      <h3>{exp.title}</h3>
                    </div>
                    <p>{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section style={{
            marginBottom: '0', marginTop: '0',
            paddingTop: '5rem', paddingBottom: '5rem',
            background: '#ffffff',
            width: '100vw', marginLeft: 'calc(-50vw + 50%)',
            borderBottom: '1px solid #e5e7eb',
          }}>
            <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151', fontWeight: 500}}>The Experience</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, margin: '0 0 2.5rem' }}>
                Experiences during the <span style={{ color: '#374151' }}>retreat</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {retreat.experiences.map((exp, i) => (
                  <div key={i} style={{ paddingLeft: '1.5rem', borderLeft: '2px solid rgba(15,118,110,0.2)' }}>
                    <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.95rem', fontWeight: 500, color: '#222', margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>
                      {exp.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.88rem', lineHeight: 1.8, color: '#555', fontWeight: 300, margin: 0 }}>
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      )}

      {/* ── VISUAL BREAK: Mountain verandah ── */}
      {retreat.experiences && retreat.experiences.length > 0 && (
        <figure style={{
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          position: 'relative', height: '280px',
          overflow: 'hidden', margin: 0,
        }}>
          <img
            src={isTrekPaintJourney ? "/Images/art-retreat/chaitra/group-art-retreat-participants-paintings.webp" : "/Images/location/mussoorie.webp"}
            width={isTrekPaintJourney ? 960 : 800}
            height={isTrekPaintJourney ? 1280 : 462}
            alt={isTrekPaintJourney ? "Participants holding paintings created during a real art retreat" : "Mountain retreat verandah — quiet creative space in the Himalayas"}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: isTrekPaintJourney ? 'center 42%' : 'center 45%', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)' }} />
          <figcaption style={{
            position: 'absolute', bottom: '1.5rem', left: 0, right: 0, textAlign: 'center',
            fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.7)', fontWeight: 300, letterSpacing: '0.03em',
          padding: '0 1.25rem', boxSizing: 'border-box', lineHeight: 1.5, maxWidth: '100%',
          }}>{isTrekPaintJourney ? 'You return with real work made from places you actually moved through' : 'Quiet retreat spaces where creativity meets the mountains'}</figcaption>
        </figure>
      )}

      {/* PLACES WE EXPLORE — optional */}
      {retreat.placesWeExplore && retreat.placesWeExplore.length > 0 && (
        isTrekPaintJourney ? (
          <section className="rj-tp-places-section">
            <style>{`
              .rj-tp-places-section {
                width: 100%;
                margin: 0;
                padding: 5rem 0;
                background:
                  radial-gradient(circle at 14% 12%, rgba(15,118,110,0.08), transparent 30%),
                  radial-gradient(circle at 86% 18%, rgba(180,137,79,0.12), transparent 32%),
                  linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
                border-bottom: 1px solid #e5e7eb;
                overflow: hidden;
                box-sizing: border-box;
              }
              .rj-tp-places-inner {
                max-width: 64rem;
                margin: 0 auto;
                padding: 0 2rem;
                box-sizing: border-box;
              }
              .rj-tp-places-head {
                max-width: 50rem;
                margin-bottom: 2.5rem;
              }
              .rj-tp-places-eyebrow {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 1rem;
              }
              .rj-tp-places-line {
                width: 24px;
                height: 1px;
                background: var(--color-primary);
                flex-shrink: 0;
              }
              .rj-tp-places-label {
                font-family: var(--font-geist-sans), sans-serif;
                font-size: 0.75rem;
                letter-spacing: 0.28em;
                text-transform: uppercase;
                color: #374151;
                font-weight: 500;
              }
              .rj-tp-places-title {
                font-family: var(--font-geist-sans), sans-serif;
                font-size: clamp(2rem, 4.4vw, 4rem);
                line-height: 0.98;
                letter-spacing: -0.07em;
                font-weight: 220;
                color: #111111;
                margin: 0 0 1rem;
                text-wrap: balance;
              }
              .rj-tp-places-title span {
                color: #374151;
              }
              .rj-tp-places-copy {
                font-family: var(--font-geist-sans), sans-serif;
                font-size: 0.94rem;
                line-height: 1.85;
                color: #555555;
                font-weight: 300;
                margin: 0;
                max-width: 42rem;
              }
              .rj-tp-places-grid {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 1.25rem;
              }
              .rj-tp-place-card {
                position: relative;
                overflow: hidden;
                border-radius: 24px;
                background: #ffffff;
                border: 1px solid #e5e7eb;
                box-shadow: 0 16px 48px rgba(0,0,0,0.045);
                padding: 1.5rem;
                min-height: 285px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              .rj-tp-place-card::before {
                content: '';
                position: absolute;
                inset: 0;
                background:
                  linear-gradient(135deg, rgba(15,118,110,0.08), transparent 42%),
                  radial-gradient(circle at bottom right, rgba(180,137,79,0.13), transparent 40%);
                pointer-events: none;
              }
              .rj-tp-place-card > * {
                position: relative;
                z-index: 1;
              }
              .rj-tp-place-top {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 1rem;
                margin-bottom: 1.25rem;
              }
              .rj-tp-place-kicker {
                display: inline-flex;
                width: max-content;
                max-width: 100%;
                border-radius: 999px;
                padding: 0.42rem 0.78rem;
                background: rgba(15,118,110,0.08);
                border: 1px solid rgba(15,118,110,0.16);
                color: #374151;
                font-family: var(--font-geist-sans), sans-serif;
                font-size: 0.68rem;
                font-weight: 750;
                letter-spacing: 0.12em;
                text-transform: uppercase;
              }
              .rj-tp-place-num {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 42px;
                height: 42px;
                border-radius: 16px;
                background: #0a1f1c;
                color: #ffffff;
                font-family: var(--font-geist-sans), sans-serif;
                font-size: 0.76rem;
                font-weight: 850;
                flex-shrink: 0;
              }
              .rj-tp-place-card h3 {
                font-family: var(--font-geist-sans), sans-serif;
                font-size: clamp(1.35rem, 2.6vw, 2.25rem);
                line-height: 1;
                letter-spacing: -0.06em;
                font-weight: 260;
                color: #111111;
                margin: 0 0 0.9rem;
                text-wrap: balance;
              }
              .rj-tp-place-card p {
                font-family: var(--font-geist-sans), sans-serif;
                font-size: 0.86rem;
                line-height: 1.75;
                color: #555555;
                font-weight: 300;
                margin: 0;
              }
              @media (max-width: 980px) {
                .rj-tp-places-grid {
                  grid-template-columns: 1fr;
                }
                .rj-tp-place-card {
                  min-height: auto;
                }
              }
              @media (max-width: 640px) {
                .rj-tp-places-section {
                  padding: 4rem 0;
                }
                .rj-tp-places-inner {
                  padding: 0 1.25rem;
                }
                .rj-tp-place-card {
                  border-radius: 18px;
                  padding: 1.25rem;
                }
              }
            `}</style>

            <div className="rj-tp-places-inner">
              <div className="rj-tp-places-head scroll-fade">
                <div className="rj-tp-places-eyebrow">
                  <span className="rj-tp-places-line" />
                  <span className="rj-tp-places-label">Subjects We Paint</span>
                </div>

                <h2 className="rj-tp-places-title">
                  The destinations become <span>painting subjects.</span>
                </h2>

                <p className="rj-tp-places-copy">
                  You are not just passing through these places. You stop long enough to notice light, shadow, movement, texture, and shape.
                </p>
              </div>

              <div className="rj-tp-places-grid scroll-fade">
                {retreat.placesWeExplore.map((place, i) => (
                  <div key={place.name} className="rj-tp-place-card">
                    <div>
                      <div className="rj-tp-place-top">
                        <span className="rj-tp-place-kicker">Subject study</span>
                        <span className="rj-tp-place-num">{String(i + 1).padStart(2, '0')}</span>
                      </div>

                      <h3>{place.name}</h3>
                    </div>

                    <p>{place.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section style={{
            marginBottom: '0', marginTop: '0',
            paddingTop: '5rem', paddingBottom: '5rem',
            background: '#f7f9f7',
            width: '100vw', marginLeft: 'calc(-50vw + 50%)',
            borderBottom: '1px solid #e5e7eb',
          }}>
            <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151', fontWeight: 500}}>Destinations</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, margin: '0 0 2.5rem' }}>
                Places we <span style={{ color: '#374151' }}>explore</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {retreat.placesWeExplore.map((place, i) => (
                  <div key={i} style={{
                    background: '#ffffff', border: '1px solid #eef0ee', borderRadius: 8,
                    padding: '1.25rem 1.35rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  }}>
                    <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#111', margin: '0 0 0.4rem' }}>
                      {place.name}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.78rem', lineHeight: 1.6, color: '#595959', fontWeight: 300, margin: 0 }}>
                      {place.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      )}

      {/* HOW IT WORKS */}
      {isTrekPaintJourney ? (
        <section className="rj-tp-rhythm-section">
          <style>{`
            .rj-tp-rhythm-section {
              width: 100%;
              margin: 0;
              padding: 5rem 0;
              background:
                radial-gradient(circle at 12% 12%, rgba(180,137,79,0.12), transparent 30%),
                linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
              border-bottom: 1px solid #e5e7eb;
              overflow: hidden;
              box-sizing: border-box;
            }
            .rj-tp-rhythm-inner {
              max-width: 64rem;
              margin: 0 auto;
              padding: 0 2rem;
              box-sizing: border-box;
            }
            .rj-tp-rhythm-head {
              display: grid;
              grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
              gap: 2rem;
              align-items: end;
              margin-bottom: 2.75rem;
            }
            .rj-tp-rhythm-eyebrow {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              margin-bottom: 1rem;
            }
            .rj-tp-rhythm-line {
              width: 24px;
              height: 1px;
              background: var(--color-primary);
              flex-shrink: 0;
            }
            .rj-tp-rhythm-label {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.75rem;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              color: #374151;
              font-weight: 500;
            }
            .rj-tp-rhythm-title {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(2rem, 4.4vw, 4rem);
              line-height: 0.98;
              letter-spacing: -0.07em;
              font-weight: 220;
              color: #111111;
              margin: 0;
              text-wrap: balance;
            }
            .rj-tp-rhythm-title span {
              color: #374151;
            }
            .rj-tp-rhythm-copy {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.94rem;
              line-height: 1.85;
              color: #555555;
              font-weight: 300;
              margin: 0;
              max-width: 42rem;
            }
            .rj-tp-rhythm-list {
              display: grid;
              gap: 1rem;
            }
            .rj-tp-rhythm-row {
              display: grid;
              grid-template-columns: 11rem minmax(0, 1fr);
              gap: 1.25rem;
              align-items: stretch;
              border-radius: 24px;
              background: #ffffff;
              border: 1px solid #e5e7eb;
              box-shadow: 0 16px 48px rgba(0,0,0,0.045);
              overflow: hidden;
            }
            .rj-tp-rhythm-time {
              background: #0a1f1c;
              color: #ffffff;
              padding: 1.25rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              gap: 1rem;
              font-family: var(--font-geist-sans), sans-serif;
            }
            .rj-tp-rhythm-time strong {
              font-size: 0.72rem;
              font-weight: 850;
              letter-spacing: 0.16em;
              text-transform: uppercase;
              color: rgba(255,255,255,0.78);
            }
            .rj-tp-rhythm-time span {
              font-size: clamp(1.3rem, 2.4vw, 2rem);
              line-height: 1;
              letter-spacing: -0.06em;
              font-weight: 260;
              color: #ffffff;
            }
            .rj-tp-rhythm-body {
              padding: 1.35rem 1.5rem 1.35rem 0;
              display: flex;
              align-items: center;
            }
            .rj-tp-rhythm-body p {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.9rem;
              line-height: 1.8;
              color: #555555;
              font-weight: 300;
              margin: 0;
              white-space: pre-wrap;
            }
            @media (max-width: 820px) {
              .rj-tp-rhythm-head {
                grid-template-columns: 1fr;
                align-items: start;
              }
              .rj-tp-rhythm-row {
                grid-template-columns: 1fr;
                gap: 0;
              }
              .rj-tp-rhythm-body {
                padding: 1.25rem;
              }
            }
            @media (max-width: 640px) {
              .rj-tp-rhythm-section {
                padding: 4rem 0;
              }
              .rj-tp-rhythm-inner {
                padding: 0 1.25rem;
              }
              .rj-tp-rhythm-row {
                border-radius: 18px;
              }
            }
          `}</style>

          <div className="rj-tp-rhythm-inner">
            <div className="rj-tp-rhythm-head scroll-fade">
              <div>
                <div className="rj-tp-rhythm-eyebrow">
                  <span className="rj-tp-rhythm-line" />
                  <span className="rj-tp-rhythm-label">Daily Rhythm</span>
                </div>

                <h2 className="rj-tp-rhythm-title">
                  Walk in the morning. <span>Paint what stayed with you.</span>
                </h2>
              </div>

              <p className="rj-tp-rhythm-copy">
                The day is built around movement first, then visual work. Rest days allow deeper sketching, longer observation, and sustained painting.
              </p>
            </div>

            <div className="rj-tp-rhythm-list scroll-fade-stagger">
              {retreat.howItWorks.rhythm
                .split('\n\n')
                .filter(Boolean)
                .map((para, idx) => {
                  const rhythmLabels = [
                    ['Morning', 'Walk'],
                    ['Trail', 'Observe'],
                    ['Midday', 'Pause'],
                    ['Afternoon', 'Paint'],
                    ['Evening', 'Review'],
                    ['Rest Day', 'Sketch'],
                  ];
                  const label = rhythmLabels[idx] || [`Step ${idx + 1}`, 'Practice'];

                  return (
                    <div key={idx} className="rj-tp-rhythm-row">
                      <div className="rj-tp-rhythm-time">
                        <strong>{label[0]}</strong>
                        <span>{label[1]}</span>
                      </div>

                      <div className="rj-tp-rhythm-body">
                        <p>{para}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      ) : (
        <section style={{
          marginBottom: '0', marginTop: '0',
          paddingTop: '5rem', paddingBottom: '5rem',
          background: '#ffffff',
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <style>{`
            .rj-hiw-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }

            .rj-hiw-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
            .rj-hiw-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary);  }
            .rj-hiw-eyebrow-text {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase;
              color: #374151; font-weight: 500;
            }

            .rj-hiw-heading {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
              letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2.5rem;
            }
            .rj-hiw-heading span { color: #374151; }

            .rj-hiw-timeline { display: flex; flex-direction: column; }

            .rj-hiw-item {
              display: grid;
              grid-template-columns: 2rem 1fr;
              gap: 0 1.25rem;
            }

            .rj-hiw-left {
              display: flex; flex-direction: column; align-items: center;
            }
            .rj-hiw-dot {
              width: 10px; height: 10px; border-radius: 50%;
              background: #ffffff; border: 2px solid var(--color-primary);
              flex-shrink: 0; margin-top: 0.28rem;
              transition: background 0.25s; z-index: 1;
            }
            .rj-hiw-item:hover .rj-hiw-dot { background: var(--color-primary); }

            .rj-hiw-line {
              width: 1px; flex: 1;
              background: linear-gradient(to bottom, rgba(15,118,110,0.3), rgba(15,118,110,0.05));
              margin-top: 4px; min-height: 1.5rem;
            }
            .rj-hiw-item:last-child .rj-hiw-line { display: none; }

            .rj-hiw-content { padding-bottom: 2rem; }
            .rj-hiw-item:last-child .rj-hiw-content { padding-bottom: 0; }

            .rj-hiw-label {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.58rem; font-weight: 600;
              letter-spacing: 0.2em; text-transform: uppercase;
              color: #374151; margin: 0 0 0.4rem;
            }
            .rj-hiw-text {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.9rem; line-height: 1.85;
              color: #555555; font-weight: 300; margin: 0;
              white-space: pre-wrap;
            }
          `}</style>

          <div className="rj-hiw-inner">
            <div className="rj-hiw-eyebrow">
              <span className="rj-hiw-eyebrow-line" />
              <span className="rj-hiw-eyebrow-text">Daily Rhythm</span>
            </div>

            <h2 className="rj-hiw-heading">
              How it <span>works</span>
            </h2>

            <div className="rj-hiw-timeline scroll-fade-stagger">
              {retreat.howItWorks.rhythm
                .split('\n\n')
                .filter(Boolean)
                .map((para, idx) => {
                  const timeLabels = ['Morning', 'After practice', 'Midday', 'Late afternoon', 'Evening'];
                  const matchedLabel = timeLabels.find(t => para.startsWith(t));
                  return (
                    <div key={idx} className="rj-hiw-item">
                      <div className="rj-hiw-left">
                        <span className="rj-hiw-dot" />
                        <span className="rj-hiw-line" />
                      </div>
                      <div className="rj-hiw-content">
                        {matchedLabel && (
                          <p className="rj-hiw-label">{matchedLabel}</p>
                        )}
                        <p className="rj-hiw-text">{para}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* ── VISUAL BREAK: Evening mountain light ── */}
      <figure style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        position: 'relative', height: '280px',
        overflow: 'hidden', margin: 0,
      }}>
        <img
          src={isTrekPaintJourney ? "/Images/art-retreat/chaitra/evening-reflection-art-retreat-group.webp" : "/Images/hero/valley-forest.webp"}
          width={isTrekPaintJourney ? 960 : 1400}
          height={isTrekPaintJourney ? 1280 : 788}
          alt={isTrekPaintJourney ? "Evening reflection circle during a real art retreat" : "Evening light across Himalayan valley forest — quiet setting for mountain retreats"}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: isTrekPaintJourney ? 'center 48%' : 'center 35%', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)' }} />
        <figcaption style={{
          position: 'absolute', bottom: '1.5rem', left: 0, right: 0, textAlign: 'center',
          fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.7)', fontWeight: 300, letterSpacing: '0.03em',
          padding: '0 1.25rem', boxSizing: 'border-box', lineHeight: 1.5, maxWidth: '100%',
        }}>{isTrekPaintJourney ? 'Evening reflection turns the day’s walk into a visual journal' : 'The Himalayan valleys provide the silence retreat work needs'}</figcaption>
      </figure>

     {/* WHERE IT WORKS BEST */}
      {isTrekPaintJourney ? (
        <section className="rj-tp-locations-section">
          <style>{`
            .rj-tp-locations-section {
              width: 100%;
              margin: 0;
              padding: 5rem 0;
              background:
                radial-gradient(circle at 12% 12%, rgba(15,118,110,0.08), transparent 30%),
                radial-gradient(circle at 88% 18%, rgba(180,137,79,0.12), transparent 32%),
                linear-gradient(180deg, #f7f9f7 0%, #ffffff 100%);
              border-bottom: 1px solid #e5e7eb;
              overflow: hidden;
              box-sizing: border-box;
            }
            .rj-tp-locations-inner {
              max-width: 64rem;
              margin: 0 auto;
              padding: 0 2rem;
              box-sizing: border-box;
            }
            .rj-tp-locations-head {
              display: grid;
              grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
              gap: 2rem;
              align-items: end;
              margin-bottom: 2.5rem;
            }
            .rj-tp-locations-eyebrow {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              margin-bottom: 1rem;
            }
            .rj-tp-locations-line {
              width: 24px;
              height: 1px;
              background: var(--color-primary);
              flex-shrink: 0;
            }
            .rj-tp-locations-label {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.75rem;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              color: #374151;
              font-weight: 500;
            }
            .rj-tp-locations-title {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(2rem, 4.4vw, 4rem);
              line-height: 0.98;
              letter-spacing: -0.07em;
              font-weight: 220;
              color: #111111;
              margin: 0;
              text-wrap: balance;
            }
            .rj-tp-locations-title span {
              color: #374151;
            }
            .rj-tp-locations-copy {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.94rem;
              line-height: 1.85;
              color: #555555;
              font-weight: 300;
              margin: 0;
              max-width: 42rem;
            }
            .rj-tp-primary-location {
              position: relative;
              overflow: hidden;
              border-radius: 28px;
              background: #0a1f1c;
              border: 1px solid rgba(255,255,255,0.12);
              box-shadow: 0 20px 60px rgba(0,0,0,0.08);
              padding: 2rem;
              margin-bottom: 1.25rem;
              color: #ffffff;
            }
            .rj-tp-primary-location::before {
              content: '';
              position: absolute;
              inset: 0;
              background:
                radial-gradient(circle at top right, rgba(180,137,79,0.28), transparent 38%),
                linear-gradient(135deg, rgba(255,255,255,0.04), transparent 45%);
              pointer-events: none;
            }
            .rj-tp-primary-location > * {
              position: relative;
              z-index: 1;
            }
            .rj-tp-primary-label {
              display: inline-flex;
              width: max-content;
              max-width: 100%;
              border-radius: 999px;
              padding: 0.42rem 0.78rem;
              background: rgba(255,255,255,0.08);
              border: 1px solid rgba(255,255,255,0.14);
              color: rgba(255,255,255,0.8);
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.68rem;
              font-weight: 750;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              margin-bottom: 1rem;
            }
            .rj-tp-primary-location h3 {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.7rem, 3.4vw, 3rem);
              line-height: 1;
              letter-spacing: -0.07em;
              font-weight: 240;
              color: #ffffff;
              margin: 0 0 1rem;
              text-wrap: balance;
            }
            .rj-tp-primary-location p {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.92rem;
              line-height: 1.85;
              color: rgba(255,255,255,0.72);
              font-weight: 300;
              margin: 0;
              max-width: 48rem;
            }
            .rj-tp-location-grid {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 1rem;
            }
            .rj-tp-location-card {
              position: relative;
              overflow: hidden;
              display: grid;
              grid-template-columns: minmax(0, 1fr) auto;
              gap: 1.25rem;
              align-items: center;
              border-radius: 22px;
              background: #ffffff;
              border: 1px solid #e5e7eb;
              box-shadow: 0 16px 48px rgba(0,0,0,0.045);
              padding: 1.3rem 1.4rem;
              text-decoration: none;
              transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
            }
            .rj-tp-location-card:hover {
              transform: translateY(-3px);
              border-color: rgba(15,118,110,0.28);
              box-shadow: 0 20px 58px rgba(0,0,0,0.07);
            }
            .rj-tp-location-card::before {
              content: '';
              position: absolute;
              inset: 0;
              background: radial-gradient(circle at top right, rgba(15,118,110,0.08), transparent 42%);
              pointer-events: none;
            }
            .rj-tp-location-card > * {
              position: relative;
              z-index: 1;
            }
            .rj-tp-location-card h3 {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 1.05rem;
              font-weight: 500;
              letter-spacing: -0.025em;
              color: #111111;
              margin: 0 0 0.45rem;
            }
            .rj-tp-location-card p {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.8rem;
              line-height: 1.65;
              color: #595959;
              font-weight: 300;
              margin: 0;
            }
            .rj-tp-location-arrow {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 36px;
              height: 36px;
              border-radius: 999px;
              background: #f7f9f7;
              color: #374151;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.85rem;
              font-weight: 800;
              flex-shrink: 0;
            }
            @media (max-width: 820px) {
              .rj-tp-locations-head {
                grid-template-columns: 1fr;
                align-items: start;
              }
              .rj-tp-location-grid {
                grid-template-columns: 1fr;
              }
            }
            @media (max-width: 640px) {
              .rj-tp-locations-section {
                padding: 4rem 0;
              }
              .rj-tp-locations-inner {
                padding: 0 1.25rem;
              }
              .rj-tp-primary-location,
              .rj-tp-location-card {
                border-radius: 18px;
              }
              .rj-tp-primary-location {
                padding: 1.35rem;
              }
              .rj-tp-location-card {
                grid-template-columns: 1fr;
              }
            }
          `}</style>

          <div className="rj-tp-locations-inner">
            <div className="rj-tp-locations-head scroll-fade">
              <div>
                <div className="rj-tp-locations-eyebrow">
                  <span className="rj-tp-locations-line" />
                  <span className="rj-tp-locations-label">Creative Terrain</span>
                </div>

                <h2 className="rj-tp-locations-title">
                  Chakrata is the primary canvas. <span>Other terrains change the subject.</span>
                </h2>
              </div>

              <p className="rj-tp-locations-copy">
                Trek & Paint works best where the walks are moderate, the views shift often, and there is enough quiet to stop, observe, and make.
              </p>
            </div>

            <div className="rj-tp-primary-location scroll-fade">
              <span className="rj-tp-primary-label">Primary location: {retreat.whereItWorksBest.primary}</span>
              <h3>Forest trails, ridge views, and changing light.</h3>
              <p>{retreat.whereItWorksBest.primaryReason}</p>
            </div>

            {locations.length > 0 && (
              <div className="rj-tp-location-grid scroll-fade-stagger">
                {locations.map((loc) => (
                  <Link key={loc.id} href={`/retreats/${loc.id}`} className="rj-tp-location-card">
                    <div>
                      <h3>{loc.name}</h3>
                      <p>
                        {retreat.whereItWorksBest.contextByLocation[loc.id] ||
                          retreat.whereItWorksBest.primaryReason}
                      </p>
                    </div>

                    <span className="rj-tp-location-arrow">→</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        <>
     {/* WHERE IT WORKS BEST */}
      <section style={{
        marginBottom: '0', marginTop: '0',
        paddingTop: '5rem', paddingBottom: '5rem',
        background: '#f7f9f7',
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <style>{`
          .rj-wib-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }

          .rj-wib-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
          .rj-wib-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary);  }
          .rj-wib-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase;
            color: #374151; font-weight: 500;
          }

          .rj-wib-heading {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
            letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2.5rem;
          }
          .rj-wib-heading span { color: #374151; }

          /* Primary block */
          .rj-wib-primary {
            background: #ffffff;
            border: 1px solid #eef0ee;
            border-left: 3px solid var(--color-primary);
            border-radius: 8px;
            padding: 1.6rem 1.75rem;
            margin-bottom: 2rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.03);
          }
          .rj-wib-primary-label {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.58rem; font-weight: 600;
            letter-spacing: 0.22em; text-transform: uppercase;
            color: #374151;
            margin: 0 0 0.5rem;
          }
          .rj-wib-primary-reason {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.88rem; color: #555555;
            font-weight: 300; line-height: 1.75; margin: 0;
          }

          /* Also label */
          .rj-wib-also-label {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.58rem; font-weight: 600;
            letter-spacing: 0.22em; text-transform: uppercase;
            color: #636363;
            margin: 0 0 0.85rem;
            display: flex; align-items: center; gap: 0.75rem;
          }
          .rj-wib-also-label::after {
            content: ''; flex: 1; height: 1px; background: #e5e7eb;
          }

          /* Location cards */
          .rj-wib-grid { display: grid; gap: 0.6rem; }

          .rj-wib-card {
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: center;
            gap: 1rem;
            padding: 1.1rem 1.35rem;
            border: 1px solid #eef0ee;
            border-radius: 6px;
            text-decoration: none;
            background: #ffffff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.03);
            transition: border-color 0.22s, background 0.22s, box-shadow 0.22s;
          }
          .rj-wib-card:hover {
            border-color: rgba(15,118,110,0.35);
            background: #f7f9f7;
            box-shadow: 0 4px 16px rgba(15,118,110,0.07);
          }
          .rj-wib-card-name {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.9rem; font-weight: 500;
            color: #111111; margin: 0 0 0.22rem; letter-spacing: -0.01em;
          }
          .rj-wib-card-context {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.78rem; color: #595959;
            font-weight: 300; margin: 0; line-height: 1.5;
          }
          .rj-wib-card-arrow {
            font-size: 0.75rem; color: #374151;
             flex-shrink: 0;
            transition: opacity 0.2s, transform 0.2s;
          }
          .rj-wib-card:hover .rj-wib-card-arrow {
             transform: translateX(3px);
          }
        `}</style>

        <div className="rj-wib-inner">
          <div className="rj-wib-eyebrow">
            <span className="rj-wib-eyebrow-line" />
            <span className="rj-wib-eyebrow-text">Locations</span>
          </div>

          <h2 className="rj-wib-heading">
            Where this retreat works <span>best</span>
          </h2>

          {/* Primary */}
          <div className="rj-wib-primary">
            <p className="rj-wib-primary-label">
              Primary location: {retreat.whereItWorksBest.primary}
            </p>
            <p className="rj-wib-primary-reason">{retreat.whereItWorksBest.primaryReason}</p>
          </div>

          {/* Also held in */}
          {locations.length > 0 && (
            <div>
              <p className="rj-wib-also-label">Also held in</p>
              <div className="rj-wib-grid scroll-fade-stagger">
                {locations.map((loc) => (
                  <Link key={loc.id} href={`/retreats/${loc.id}`} className="rj-wib-card">
                    <div>
                      <p className="rj-wib-card-name">{loc.name}</p>
                      <p className="rj-wib-card-context">
                        {retreat.whereItWorksBest.contextByLocation[loc.id] ||
                          retreat.whereItWorksBest.primaryReason}
                      </p>
                    </div>
                    <span className="rj-wib-card-arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

        </>
      )}

      {/* FOOD, STAY & TRAVEL */}
      {isTrekPaintJourney ? (
        <section className="rj-tp-practical-section">
          <style>{`
            .rj-tp-practical-section {
              width: 100%;
              margin: 0;
              padding: 5rem 0;
              background:
                radial-gradient(circle at 12% 12%, rgba(180,137,79,0.12), transparent 30%),
                linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
              border-bottom: 1px solid #e5e7eb;
              overflow: hidden;
              box-sizing: border-box;
            }
            .rj-tp-practical-inner {
              max-width: 64rem;
              margin: 0 auto;
              padding: 0 2rem;
              box-sizing: border-box;
            }
            .rj-tp-practical-head {
              max-width: 50rem;
              margin-bottom: 2.5rem;
            }
            .rj-tp-practical-eyebrow {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              margin-bottom: 1rem;
            }
            .rj-tp-practical-line {
              width: 24px;
              height: 1px;
              background: var(--color-primary);
              flex-shrink: 0;
            }
            .rj-tp-practical-label {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.75rem;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              color: #374151;
              font-weight: 500;
            }
            .rj-tp-practical-title {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(2rem, 4.4vw, 4rem);
              line-height: 0.98;
              letter-spacing: -0.07em;
              font-weight: 220;
              color: #111111;
              margin: 0 0 1rem;
              text-wrap: balance;
            }
            .rj-tp-practical-title span {
              color: #374151;
            }
            .rj-tp-practical-copy {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.94rem;
              line-height: 1.85;
              color: #555555;
              font-weight: 300;
              margin: 0;
              max-width: 42rem;
            }
            .rj-tp-practical-grid {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 1.25rem;
            }
            .rj-tp-practical-card {
              position: relative;
              overflow: hidden;
              border-radius: 24px;
              background: #ffffff;
              border: 1px solid #e5e7eb;
              box-shadow: 0 16px 48px rgba(0,0,0,0.045);
              padding: 1.5rem;
              min-height: 310px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            .rj-tp-practical-card::before {
              content: '';
              position: absolute;
              inset: 0;
              background:
                radial-gradient(circle at top right, rgba(15,118,110,0.08), transparent 42%),
                linear-gradient(135deg, rgba(180,137,79,0.08), transparent 45%);
              pointer-events: none;
            }
            .rj-tp-practical-card > * {
              position: relative;
              z-index: 1;
            }
            .rj-tp-practical-kicker {
              display: inline-flex;
              width: max-content;
              max-width: 100%;
              border-radius: 999px;
              padding: 0.42rem 0.78rem;
              background: rgba(15,118,110,0.08);
              border: 1px solid rgba(15,118,110,0.16);
              color: #374151;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.68rem;
              font-weight: 750;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              margin-bottom: 1.25rem;
            }
            .rj-tp-practical-card h3 {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.35rem, 2.6vw, 2.25rem);
              line-height: 1;
              letter-spacing: -0.06em;
              font-weight: 260;
              color: #111111;
              margin: 0 0 0.9rem;
              text-wrap: balance;
            }
            .rj-tp-practical-card p {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.86rem;
              line-height: 1.75;
              color: #555555;
              font-weight: 300;
              margin: 0;
            }
            .rj-tp-practical-stack {
              display: grid;
              gap: 0.9rem;
            }
            .rj-tp-practical-mini {
              border-top: 1px solid rgba(0,0,0,0.06);
              padding-top: 0.9rem;
            }
            .rj-tp-practical-mini strong {
              display: block;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.72rem;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              color: #374151;
              font-weight: 750;
              margin-bottom: 0.35rem;
            }
            .rj-tp-practical-note {
              margin-top: 1rem;
              border-radius: 18px;
              background: #0a1f1c;
              color: #ffffff;
              padding: 1.15rem 1.25rem;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.84rem;
              line-height: 1.7;
              font-weight: 300;
            }
            .rj-tp-practical-note span {
              display: block;
              font-size: 0.66rem;
              letter-spacing: 0.14em;
              text-transform: uppercase;
              font-weight: 850;
              color: rgba(255,255,255,0.68);
              margin-bottom: 0.4rem;
            }
            @media (max-width: 980px) {
              .rj-tp-practical-grid {
                grid-template-columns: 1fr;
              }
              .rj-tp-practical-card {
                min-height: auto;
              }
            }
            @media (max-width: 640px) {
              .rj-tp-practical-section {
                padding: 4rem 0;
              }
              .rj-tp-practical-inner {
                padding: 0 1.25rem;
              }
              .rj-tp-practical-card {
                border-radius: 18px;
                padding: 1.25rem;
              }
            }
          `}</style>

          <div className="rj-tp-practical-inner">
            <div className="rj-tp-practical-head scroll-fade">
              <div className="rj-tp-practical-eyebrow">
                <span className="rj-tp-practical-line" />
                <span className="rj-tp-practical-label">Stay · Food · Travel</span>
              </div>

              <h2 className="rj-tp-practical-title">
                Simple logistics. <span>More attention for the trail and canvas.</span>
              </h2>

              <p className="rj-tp-practical-copy">
                The practical parts are kept clear so you can focus on walking, observing, painting, and returning with a visual journal.
              </p>
            </div>

            <div className="rj-tp-practical-grid scroll-fade">
              {retreat.foodAndAccommodation && (
                <article className="rj-tp-practical-card">
                  <div>
                    <span className="rj-tp-practical-kicker">Stay & Food</span>
                    <h3>Simple mountain comfort.</h3>
                  </div>
                  <p>{retreat.foodAndAccommodation}</p>
                </article>
              )}

              {retreat.travel && (
                <article className="rj-tp-practical-card">
                  <div>
                    <span className="rj-tp-practical-kicker">Getting Here</span>
                    <h3>Delhi and Dehradun access.</h3>
                  </div>

                  <div className="rj-tp-practical-stack">
                    <div className="rj-tp-practical-mini">
                      <strong>From Delhi</strong>
                      <p>{retreat.travel.fromDelhi}</p>
                    </div>

                    <div className="rj-tp-practical-mini">
                      <strong>From Dehradun</strong>
                      <p>{retreat.travel.fromDehradun}</p>
                    </div>
                  </div>
                </article>
              )}

              {retreat.travel && retreat.travel.note && (
                <article className="rj-tp-practical-card">
                  <div>
                    <span className="rj-tp-practical-kicker">Supplies Included</span>
                    <h3>Bring yourself. We bring the kit.</h3>
                  </div>

                  <div>
                    <p>{retreat.travel.note}</p>
                    <div className="rj-tp-practical-note">
                      <span>Useful to know</span>
                      Art materials are planned as part of the retreat flow, so beginners do not need to arrive with a full painting setup.
                    </div>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>
      ) : (
        <>
      {/* FOOD & ACCOMMODATION — optional */}
      {retreat.foodAndAccommodation && (
        <section style={{
          marginBottom: '0', marginTop: '0',
          paddingTop: '5rem', paddingBottom: '5rem',
          background: '#ffffff',
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151', fontWeight: 500}}>Stay & Food</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, margin: '0 0 1.5rem' }}>
              Food &amp; <span style={{ color: '#374151' }}>accommodation</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: '#555', fontWeight: 300, margin: 0 }}>
              {retreat.foodAndAccommodation}
            </p>
          </div>
        </section>
      )}

      {/* LOCATION INFO — optional */}
      {retreat.locationInfo && (
        <section style={{
          marginBottom: '0', marginTop: '0',
          paddingTop: '5rem', paddingBottom: '5rem',
          background: '#f7f9f7',
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151', fontWeight: 500}}>The Location</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, margin: '0 0 1.5rem' }}>
              About <span style={{ color: '#374151' }}>{retreat.locationInfo.name}</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', lineHeight: 1.85, color: '#555', fontWeight: 300, margin: 0 }}>
              {retreat.locationInfo.description}
            </p>
          </div>
        </section>
      )}

      {/* TRAVEL — optional */}
      {retreat.travel && (
        <section style={{
          marginBottom: '0', marginTop: '0',
          paddingTop: '5rem', paddingBottom: '5rem',
          background: '#ffffff',
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151', fontWeight: 500}}>Getting Here</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 200, letterSpacing: '-0.03em', color: '#111111', lineHeight: 1.15, margin: '0 0 2rem' }}>
              Travel &amp; <span style={{ color: '#374151' }}>transportation</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ background: '#f7f9f7', border: '1px solid #eef0ee', borderRadius: 8, padding: '1.25rem 1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#111', margin: '0 0 0.4rem' }}>From Delhi</h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', lineHeight: 1.7, color: '#555', fontWeight: 300, margin: 0 }}>{retreat.travel.fromDelhi}</p>
              </div>
              <div style={{ background: '#f7f9f7', border: '1px solid #eef0ee', borderRadius: 8, padding: '1.25rem 1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#111', margin: '0 0 0.4rem' }}>From Dehradun</h3>
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', lineHeight: 1.7, color: '#555', fontWeight: 300, margin: 0 }}>{retreat.travel.fromDehradun}</p>
              </div>
              {retreat.travel.note && (
                <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.82rem', lineHeight: 1.7, color: '#595959', fontWeight: 300, fontStyle: 'italic', margin: '0.5rem 0 0' }}>
                  {retreat.travel.note}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

        </>
      )}

      {/* ADAPTABILITY */}
      {isTrekPaintJourney ? (
        <section className="rj-tp-adapt-section">
          <style>{`
            .rj-tp-adapt-section {
              width: 100%;
              margin: 0;
              padding: 5rem 0;
              background:
                radial-gradient(circle at 12% 12%, rgba(15,118,110,0.08), transparent 30%),
                radial-gradient(circle at 88% 18%, rgba(180,137,79,0.12), transparent 32%),
                linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
              border-bottom: 1px solid #e5e7eb;
              overflow: hidden;
              box-sizing: border-box;
            }
            .rj-tp-adapt-inner {
              max-width: 64rem;
              margin: 0 auto;
              padding: 0 2rem;
              box-sizing: border-box;
            }
            .rj-tp-adapt-head {
              display: grid;
              grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
              gap: 2rem;
              align-items: end;
              margin-bottom: 2.5rem;
            }
            .rj-tp-adapt-eyebrow {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              margin-bottom: 1rem;
            }
            .rj-tp-adapt-line {
              width: 24px;
              height: 1px;
              background: var(--color-primary);
              flex-shrink: 0;
            }
            .rj-tp-adapt-label {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.75rem;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              color: #374151;
              font-weight: 500;
            }
            .rj-tp-adapt-title {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(2rem, 4.4vw, 4rem);
              line-height: 0.98;
              letter-spacing: -0.07em;
              font-weight: 220;
              color: #111111;
              margin: 0;
              text-wrap: balance;
            }
            .rj-tp-adapt-title span {
              color: #374151;
            }
            .rj-tp-adapt-copy {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.94rem;
              line-height: 1.85;
              color: #555555;
              font-weight: 300;
              margin: 0;
              max-width: 42rem;
            }
            .rj-tp-adapt-card {
              position: relative;
              overflow: hidden;
              border-radius: 28px;
              background: #0a1f1c;
              color: #ffffff;
              border: 1px solid rgba(255,255,255,0.12);
              box-shadow: 0 20px 60px rgba(0,0,0,0.08);
              padding: 2rem;
            }
            .rj-tp-adapt-card::before {
              content: '';
              position: absolute;
              inset: 0;
              background:
                radial-gradient(circle at top right, rgba(180,137,79,0.28), transparent 38%),
                linear-gradient(135deg, rgba(255,255,255,0.04), transparent 45%);
              pointer-events: none;
            }
            .rj-tp-adapt-card > * {
              position: relative;
              z-index: 1;
            }
            .rj-tp-adapt-body {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.95rem;
              line-height: 1.95;
              color: rgba(255,255,255,0.76);
              font-weight: 300;
              margin: 0;
              white-space: pre-wrap;
              max-width: 52rem;
            }
            .rj-tp-adapt-signals {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 0.85rem;
              margin-top: 1.75rem;
            }
            .rj-tp-adapt-signal {
              border-radius: 18px;
              background: rgba(255,255,255,0.07);
              border: 1px solid rgba(255,255,255,0.12);
              padding: 1rem;
            }
            .rj-tp-adapt-signal strong {
              display: block;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.68rem;
              font-weight: 850;
              letter-spacing: 0.14em;
              text-transform: uppercase;
              color: rgba(255,255,255,0.68);
              margin-bottom: 0.45rem;
            }
            .rj-tp-adapt-signal span {
              display: block;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.82rem;
              line-height: 1.55;
              color: rgba(255,255,255,0.86);
              font-weight: 300;
            }
            @media (max-width: 820px) {
              .rj-tp-adapt-head {
                grid-template-columns: 1fr;
                align-items: start;
              }
              .rj-tp-adapt-signals {
                grid-template-columns: 1fr;
              }
            }
            @media (max-width: 640px) {
              .rj-tp-adapt-section {
                padding: 4rem 0;
              }
              .rj-tp-adapt-inner {
                padding: 0 1.25rem;
              }
              .rj-tp-adapt-card {
                border-radius: 18px;
                padding: 1.35rem;
              }
            }
          `}</style>

          <div className="rj-tp-adapt-inner">
            <div className="rj-tp-adapt-head scroll-fade">
              <div>
                <div className="rj-tp-adapt-eyebrow">
                  <span className="rj-tp-adapt-line" />
                  <span className="rj-tp-adapt-label">Flexibility</span>
                </div>

                <h2 className="rj-tp-adapt-title">
                  The retreat adapts to <span>your body and your art comfort.</span>
                </h2>
              </div>

              <p className="rj-tp-adapt-copy">
                The balance can shift depending on your group: more walking, more painting, more quiet solo sketching, or more guided creative support.
              </p>
            </div>

            <div className="rj-tp-adapt-card scroll-fade">
              <p className="rj-tp-adapt-body">{retreat.adaptability}</p>

              <div className="rj-tp-adapt-signals">
                <div className="rj-tp-adapt-signal">
                  <strong>Fitness level</strong>
                  <span>Moderate trails can be adjusted for pace and comfort.</span>
                </div>

                <div className="rj-tp-adapt-signal">
                  <strong>Art level</strong>
                  <span>Beginner-friendly guidance; no technical art background needed.</span>
                </div>

                <div className="rj-tp-adapt-signal">
                  <strong>Retreat balance</strong>
                  <span>More walking-heavy or painting-heavy depending on the group.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section style={{
          marginBottom: '0', marginTop: '0',
          paddingTop: '5rem', paddingBottom: '5rem',
          background: '#ffffff',
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <style>{`
            .rj-ada-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }

            .rj-ada-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
            .rj-ada-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary);  }
            .rj-ada-eyebrow-text {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase;
              color: #374151; font-weight: 500;
            }

            .rj-ada-heading {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
              letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2rem;
            }
            .rj-ada-heading span { color: #374151; }

            .rj-ada-body {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.95rem; line-height: 1.95;
              color: #3a3a3a; font-weight: 300;
              margin: 0; white-space: pre-wrap;
              padding-left: 2rem;
              position: relative;
            }
            .rj-ada-body::before {
              content: '';
              position: absolute;
              left: 0; top: 0.3rem; bottom: 0.3rem;
              width: 2px;
              background: linear-gradient(to bottom, var(--color-primary), transparent);
              border-radius: 2px;
            }
          `}</style>

          <div className="rj-ada-inner">
            <div className="rj-ada-eyebrow">
              <span className="rj-ada-eyebrow-line" />
              <span className="rj-ada-eyebrow-text">Flexibility</span>
            </div>

            <h2 className="rj-ada-heading">
              How this <span>adapts</span>
            </h2>

            <p className="rj-ada-body">{retreat.adaptability}</p>
          </div>
        </section>
      )}

      {/* SIGNATURE VISUAL BREAK — if image exists */}
      {retreat.signatureImage && (
        <section className="rj-signature">
          <Image src={retreat.signatureImage} alt={retreat.signatureAlt || 'Himalayan landscape'} width={1920} height={1080} loading="lazy" quality={60} sizes="100vw" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
          <div className="rj-signature-text">
            <p className="rj-signature-quote">{retreat.signatureQuote || 'The mountains are calling.'}</p>
          </div>
        </section>
      )}

      {/* RELATED TREK */}
      {suggestedTrek && (
        <section style={{
          marginBottom: '0', marginTop: '0',
          paddingTop: '5rem', paddingBottom: '5rem',
          background: '#f7f9f7',
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <style>{`
            .rj-rt-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }

            .rj-rt-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
            .rj-rt-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary);  }
            .rj-rt-eyebrow-text {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase;
              color: #374151; font-weight: 500;
            }

            .rj-rt-heading {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
              letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2rem;
            }
            .rj-rt-heading span { color: #374151; }

            .rj-rt-card {
              display: flex; align-items: center;
              justify-content: space-between;
              gap: 1.5rem; flex-wrap: wrap;
              padding: 1.6rem 1.75rem;
              border: 1px solid #eef0ee;
              border-radius: 8px;
              background: #ffffff;
              box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
              transition: border-color 0.2s, box-shadow 0.2s;
            }
            .rj-rt-card:hover {
              border-color: rgba(15,118,110,0.3);
              box-shadow: 0 4px 20px rgba(15,118,110,0.07);
            }

            .rj-rt-card-label {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.75rem; font-weight: 600;
              letter-spacing: 0.22em; text-transform: uppercase;
              color: #374151;  margin: 0 0 0.35rem;
            }
            .rj-rt-card-title {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.95rem; font-weight: 500;
              color: #111111; margin: 0 0 0.25rem; letter-spacing: -0.01em;
            }
            .rj-rt-card-sub {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.8rem; color: #595959;
              font-weight: 300; margin: 0;
            }

            .rj-rt-btn {
              display: inline-flex; align-items: center; gap: 0.45rem;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.62rem; font-weight: 600;
              letter-spacing: 0.18em; text-transform: uppercase;
              color: #374151;
              border: 1px solid rgba(15,118,110,0.35);
              padding: 10px 18px; border-radius: 4px;
              text-decoration: none; white-space: nowrap; flex-shrink: 0;
              transition: background 0.2s, color 0.2s, border-color 0.2s;
            }
            .rj-rt-btn:hover {
              background: var(--color-primary);
              color: #ffffff;
              border-color: #374151;
            }
          `}</style>

          <div className="rj-rt-inner">
            <div className="rj-rt-eyebrow">
              <span className="rj-rt-eyebrow-line" />
              <span className="rj-rt-eyebrow-text">Also Consider</span>
            </div>

            <h2 className="rj-rt-heading">
              Want to experience this as a <span>trek</span>?
            </h2>

            <div className="rj-rt-card">
              <div>
                <p className="rj-rt-card-label">Suggested Trek</p>
                <p className="rj-rt-card-title">{suggestedTrek.title}</p>
                <p className="rj-rt-card-sub">Guided Himalayan trek</p>
              </div>
              <Link
                href={`/treks/location/${suggestedTrek.locationId}/${suggestedTrek.slug}`}
                className="rj-rt-btn"
              >
                Explore Trek →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* INVITATION / CTA */}
      {isTrekPaintJourney ? (
        <section className="rj-tp-final-cta-section">
          <style>{`
            .rj-tp-final-cta-section {
              width: 100%;
              margin: 0;
              padding: 6rem 0;
              background:
                radial-gradient(circle at 12% 12%, rgba(15,118,110,0.10), transparent 30%),
                radial-gradient(circle at 88% 16%, rgba(180,137,79,0.16), transparent 34%),
                linear-gradient(180deg, #ffffff 0%, #f7f9f7 100%);
              border-top: 1px solid #e5e7eb;
              overflow: hidden;
              box-sizing: border-box;
            }
            .rj-tp-final-cta-inner {
              max-width: 64rem;
              margin: 0 auto;
              padding: 0 2rem;
              box-sizing: border-box;
              display: grid;
              grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.75fr);
              gap: 2rem;
              align-items: stretch;
            }
            .rj-tp-final-cta-copy {
              border-radius: 28px;
              background: #ffffff;
              border: 1px solid #e5e7eb;
              box-shadow: 0 20px 60px rgba(0,0,0,0.06);
              padding: 2.2rem;
              position: relative;
              overflow: hidden;
            }
            .rj-tp-final-cta-copy::before {
              content: '';
              position: absolute;
              inset: 0;
              background: radial-gradient(circle at top right, rgba(15,118,110,0.08), transparent 42%);
              pointer-events: none;
            }
            .rj-tp-final-cta-copy > * {
              position: relative;
              z-index: 1;
            }
            .rj-tp-final-eyebrow {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              margin-bottom: 1rem;
            }
            .rj-tp-final-line {
              width: 24px;
              height: 1px;
              background: var(--color-primary);
              flex-shrink: 0;
            }
            .rj-tp-final-label {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.75rem;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              color: #374151;
              font-weight: 500;
            }
            .rj-tp-final-title {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(2rem, 4.2vw, 4rem);
              line-height: 0.98;
              letter-spacing: -0.07em;
              font-weight: 220;
              color: #111111;
              margin: 0 0 1.2rem;
              text-wrap: balance;
            }
            .rj-tp-final-title span {
              color: #374151;
            }
            .rj-tp-final-invitation {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.94rem;
              line-height: 1.9;
              color: #555555;
              font-weight: 300;
              margin: 0;
              white-space: pre-wrap;
            }
            .rj-tp-final-card {
              position: relative;
              overflow: hidden;
              border-radius: 28px;
              background: #0a1f1c;
              color: #ffffff;
              border: 1px solid rgba(255,255,255,0.12);
              box-shadow: 0 20px 60px rgba(0,0,0,0.10);
              padding: 2rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              gap: 2rem;
            }
            .rj-tp-final-card::before {
              content: '';
              position: absolute;
              inset: 0;
              background:
                radial-gradient(circle at top right, rgba(180,137,79,0.30), transparent 38%),
                linear-gradient(135deg, rgba(255,255,255,0.05), transparent 45%);
              pointer-events: none;
            }
            .rj-tp-final-card > * {
              position: relative;
              z-index: 1;
            }
            .rj-tp-final-card-label {
              display: inline-flex;
              width: max-content;
              max-width: 100%;
              border-radius: 999px;
              padding: 0.42rem 0.78rem;
              background: rgba(255,255,255,0.08);
              border: 1px solid rgba(255,255,255,0.14);
              color: rgba(255,255,255,0.78);
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.68rem;
              font-weight: 750;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              margin-bottom: 1.1rem;
            }
            .rj-tp-final-card h3 {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.5rem, 3vw, 2.65rem);
              line-height: 1;
              letter-spacing: -0.065em;
              font-weight: 240;
              color: #ffffff;
              margin: 0 0 1rem;
              text-wrap: balance;
            }
            .rj-tp-final-card p {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.86rem;
              line-height: 1.75;
              color: rgba(255,255,255,0.72);
              font-weight: 300;
              margin: 0;
            }
            .rj-tp-final-actions {
              display: grid;
              gap: 0.75rem;
            }
            .rj-tp-final-whatsapp {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              padding: 0.95rem 1.35rem;
              border-radius: 999px;
              background: var(--color-primary);
              color: #ffffff;
              text-decoration: none;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.72rem;
              font-weight: 800;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
            }
            .rj-tp-final-whatsapp:hover {
              transform: translateY(-2px);
              background: #0d9e95;
              box-shadow: 0 14px 36px rgba(15,118,110,0.22);
            }
            .rj-tp-final-back {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              padding: 0.9rem 1.35rem;
              border-radius: 999px;
              border: 1px solid rgba(255,255,255,0.18);
              color: rgba(255,255,255,0.82);
              text-decoration: none;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.7rem;
              font-weight: 650;
              letter-spacing: 0.11em;
              text-transform: uppercase;
              transition: transform 0.2s ease, border-color 0.2s ease;
            }
            .rj-tp-final-back:hover {
              transform: translateY(-2px);
              border-color: rgba(255,255,255,0.42);
            }
            .rj-tp-final-trust {
              display: flex;
              flex-wrap: wrap;
              gap: 0.55rem;
              margin-top: 1rem;
            }
            .rj-tp-final-trust span {
              display: inline-flex;
              border-radius: 999px;
              padding: 0.42rem 0.7rem;
              background: rgba(255,255,255,0.07);
              border: 1px solid rgba(255,255,255,0.12);
              color: rgba(255,255,255,0.70);
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.62rem;
              font-weight: 700;
              letter-spacing: 0.1em;
              text-transform: uppercase;
            }
            @media (max-width: 860px) {
              .rj-tp-final-cta-inner {
                grid-template-columns: 1fr;
              }
            }
            @media (max-width: 640px) {
              .rj-tp-final-cta-section {
                padding: 4rem 0;
              }
              .rj-tp-final-cta-inner {
                padding: 0 1.25rem;
              }
              .rj-tp-final-cta-copy,
              .rj-tp-final-card {
                border-radius: 18px;
                padding: 1.35rem;
              }
            }
          `}</style>

          <div className="rj-tp-final-cta-inner">
            <div className="rj-tp-final-cta-copy scroll-fade">
              <div className="rj-tp-final-eyebrow">
                <span className="rj-tp-final-line" />
                <span className="rj-tp-final-label">Begin Trek & Paint</span>
              </div>

              <h2 className="rj-tp-final-title">
                Come for the trail. <span>Leave with a visual journal.</span>
              </h2>

              <p className="rj-tp-final-invitation">{retreat.invitation}</p>
            </div>

            <aside className="rj-tp-final-card scroll-fade">
              <div>
                <span className="rj-tp-final-card-label">Ask us directly</span>
                <h3>Check dates, price, and whether this fits you.</h3>
                <p>
                  Message us on WhatsApp and ask about Trek & Paint dates, starting price, art supplies, walking level, and whether the format fits your comfort with painting.
                </p>

                <div className="rj-tp-final-trust">
                  {['Dates', 'Price', 'Art level', 'Walking level'].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="rj-tp-final-actions">
                <a
                  href={`https://wa.me/919760446101?text=${encodeURIComponent(`Hi, I'm interested in the Trek & Paint Retreat. Can you share dates, starting price, art supplies included, walking difficulty, and whether it is suitable for beginners?`)}`}
                  className="rj-tp-final-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask Trek & Paint Dates →
                </a>

                <Link href="/retreats/art" className="rj-tp-final-back">
                  View Art Retreats
                </Link>

                <Link href="/trek-and-paint-himalayas" className="rj-tp-final-back">
                  Read Trek & Paint Guide
                </Link>
              </div>
            </aside>
          </div>
        </section>
      ) : (
        <>
      {/* INVITATION / CTA */}
      <section style={{
        marginBottom: '0', marginTop: '0',
        paddingTop: '6rem', paddingBottom: '6rem',
        background: '#ffffff',
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        position: 'relative', overflow: 'hidden',
        borderTop: '1px solid #e5e7eb',
      }}>
        <style>{`
          /* Subtle texture lines */
          .rj-cta-bg-lines {
            position: absolute; inset: 0; pointer-events: none;
            background-image:
              linear-gradient(rgba(15,118,110,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,118,110,0.03) 1px, transparent 1px);
            background-size: 48px 48px;
          }

          .rj-cta-inner {
            max-width: 44rem; margin: 0 auto; padding: 0 2rem;
            position: relative; z-index: 1;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
            align-items: center;
          }
          @media (max-width: 720px) {
            .rj-cta-inner { grid-template-columns: 1fr; gap: 3rem; }
          }

          /* ── Left ── */
          .rj-cta-eyebrow {
            display: flex; align-items: center;
            gap: 0.75rem; margin-bottom: 1.25rem;
          }
          .rj-cta-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary);  }
          .rj-cta-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase;
            color: #374151; font-weight: 500;
          }

          .rj-cta-heading {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 200;
            letter-spacing: -0.035em; color: #111111;
            line-height: 1.1; margin: 0 0 1.25rem;
          }
          .rj-cta-heading span { color: #374151; }

          .rj-invitation {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.9rem; line-height: 1.9;
            color: #666666; font-weight: 300; margin: 0;
          }

          /* ── Right card ── */
          .rj-cta-card {
            background: #f7f9f7;
            border: 1px solid #e0ebe0;
            border-radius: 10px;
            padding: 2.5rem 2rem;
            position: relative; overflow: hidden;
          }
          .rj-cta-card::before {
            content: '';
            position: absolute; top: 0; left: 0; right: 0; height: 3px;
            background: var(--color-primary);
            border-radius: 10px 10px 0 0;
          }

          .rj-cta-card-label {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.82rem; color: #555555;
            font-weight: 300; line-height: 1.7; margin: 0 0 1.75rem;
          }

          .rj-whatsapp-btn {
            display: flex; align-items: center; justify-content: center;
            width: 100%; padding: 14px 28px;
            background: var(--color-primary); color: #ffffff;
            border-radius: 6px; text-decoration: none;
            font-family: var(--font-geist-sans), sans-serif;
            font-weight: 600; font-size: 0.62rem;
            letter-spacing: 0.2em; text-transform: uppercase;
            transition: background 0.2s, transform 0.18s, box-shadow 0.22s;
            margin-bottom: 0.85rem;
          }
          .rj-whatsapp-btn:hover {
            background: #0d9e95;
            transform: translateY(-2px);
            box-shadow: 0 10px 28px rgba(15,118,110,0.18);
          }

          .rj-back-link {
            display: flex; align-items: center; justify-content: center;
            width: 100%; padding: 13px 28px;
            border: 1px solid #d4d4d4;
            border-radius: 6px; text-decoration: none;
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.62rem; font-weight: 400;
            letter-spacing: 0.18em; text-transform: uppercase;
            color: #595959;
            transition: border-color 0.2s, color 0.2s, transform 0.18s;
          }
          .rj-back-link:hover {
            border-color: #374151;
            color: #374151;
            transform: translateY(-2px);
          }

          .rj-cta-trust {
            display: flex; align-items: center; justify-content: center;
            gap: 1rem; flex-wrap: wrap; margin-top: 1.5rem;
          }
          .rj-cta-trust-item {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase;
            color: #636363; font-weight: 400;
            display: flex; align-items: center; gap: 0.4rem;
          }
          .rj-cta-trust-dot {
            width: 3px; height: 3px; border-radius: 50%; background: #cccccc;
          }
          .rj-cta-trust-item:first-child .rj-cta-trust-dot { display: none; }
        `}</style>

        <div className="rj-cta-bg-lines" />

        <div className="rj-cta-inner">

          {/* Left */}
          <div>
            <div className="rj-cta-eyebrow">
              <span className="rj-cta-eyebrow-line" />
              <span className="rj-cta-eyebrow-text">Begin Your Journey</span>
            </div>
            <h2 className="rj-cta-heading">
              Ready to <span>begin?</span>
            </h2>
            <p className="rj-invitation">{retreat.invitation}</p>
          </div>

          {/* Right card */}
          <div className="rj-cta-card">
            <p className="rj-cta-card-label">
              No forms, no checkout — just a conversation about what you&apos;re looking for.
            </p>

            <a
              href={`https://wa.me/919760446101?text=${encodeURIComponent(`I'm interested in the ${retreat.title} retreat.`)}`}
              className="rj-whatsapp-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Check Dates on WhatsApp
            </a>

            <Link href="/retreats" className="rj-back-link">
              ← Back to all retreats
            </Link>

            <div className="rj-cta-trust">
              {['Small groups', 'No fixed dates', 'Fully custom'].map((t, i) => (
                <span key={t} className="rj-cta-trust-item">
                  {i !== 0 && <span className="rj-cta-trust-dot" />}
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>
        </>
      )}

    </div>
  );
}
