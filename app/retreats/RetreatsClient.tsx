'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { RetreatContent } from '@/types/content';
import type { LocationId } from '@/config/locations';
import { logIntentClick, logWhatsAppOpen } from '@/lib/analytics';
import { getAllRetreatServices } from '@/content/retreats/services';

interface IntentOption {
  title: string;
  description: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface Location {
  id: LocationId;
  name: string;
  tagline: string;
  supportsRetreats: boolean;
  supportsTreks: boolean;
  active: boolean;
  priority: number;
}

interface RetreatsClientProps {
  intentions: IntentOption[];
  processSteps: ProcessStep[];
  whyUsPoints: string[];
  retreatFormats: RetreatContent[];
  locations: Location[];
}

export default function RetreatsClient({
  intentions,
  processSteps,
  whyUsPoints,
  retreatFormats,
  locations,
}: RetreatsClientProps) {
  return (
    <>
      {/* SECTION 1: HERO — BRAND PROMISE */}
      <section className="rc-hero-section" style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        overflow: 'hidden',
        marginBottom: '0',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      }}>
        <style>{`
          /* ── Left panel ── */
          .rc-hero-left {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 6rem 4rem 6rem 6rem;
            position: relative;
            z-index: 2;
            background: #ffffff;
          }
          .rc-hero-left::after {
            content: '';
            position: absolute;
            right: 0; top: 15%; bottom: 15%;
            width: 1px;
            background: linear-gradient(to bottom, transparent, rgba(15,118,110,0.25), transparent);
          }

          /* Eyebrow */
          .rc-hero-eyebrow {
            display: flex; align-items: center;
            gap: 0.75rem; margin-bottom: 2rem;
            
            animation: rcHeroFadeUp 0.8s ease 0.1s forwards;
          }
          .rc-hero-eyebrow-line { width: 32px; height: 1px; background: var(--color-primary);  }
          .rc-hero-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.75rem; letter-spacing: 0.32em; text-transform: uppercase;
            color: #374151; font-weight: 500;
          }

          /* Heading */
          .rc-hero-heading {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: clamp(2.4rem, 4vw, 3.6rem);
            font-weight: 200;
            line-height: 1.05; color: #111111;
            letter-spacing: -0.035em;
            margin-bottom: 1.75rem;
            
            animation: rcHeroFadeUp 0.8s ease 0.25s forwards;
          }
          .rc-hero-heading em {
            font-style: normal;
            color: #374151;
            font-weight: 200;
          }

          /* Sub */
          .rc-hero-sub {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.95rem; color: #666666;
            font-weight: 300; line-height: 1.85;
            max-width: 380px; margin-bottom: 2.5rem;
            
            animation: rcHeroFadeUp 0.8s ease 0.4s forwards;
          }

          /* Actions */
          .rc-hero-actions {
            display: flex; align-items: center;
            gap: 1.25rem; flex-wrap: wrap;
            
            animation: rcHeroFadeUp 0.8s ease 0.55s forwards;
          }
          .rc-hero-btn {
            display: inline-flex; align-items: center; gap: 0.5rem;
            padding: 14px 28px;
            background: var(--color-primary); color: #ffffff;
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.62rem; font-weight: 600;
            letter-spacing: 0.2em; text-transform: uppercase;
            border-radius: 4px; text-decoration: none;
            transition: background 0.2s, transform 0.18s, box-shadow 0.22s;
          }
          .rc-hero-btn:hover {
            background: #0d9e95;
            transform: translateY(-2px);
            box-shadow: 0 10px 28px rgba(15,118,110,0.22);
          }

          /* Trust */
          .rc-hero-trust {
            display: flex; gap: 1.5rem; flex-wrap: wrap;
            margin-top: 3rem; padding-top: 2rem;
            border-top: 1px solid #ebebeb;
            
            animation: rcHeroFadeUp 0.8s ease 0.7s forwards;
          }
          .rc-hero-trust-item { display: flex; flex-direction: column; gap: 0.2rem; }
          .rc-hero-trust-num {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 1.5rem; font-weight: 200;
            color: #374151; line-height: 1;
          }
          .rc-hero-trust-label {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.58rem; letter-spacing: 0.12em;
            text-transform: uppercase; color: #aaaaaa; font-weight: 400;
          }

          /* ── Right panel ── */
          .rc-hero-right { position: relative; overflow: hidden; }

          .rc-hero-img {
            position: absolute; inset: 0;
            background:
              linear-gradient(160deg, rgba(10,22,10,0.55) 0%, rgba(10,22,10,0.2) 40%, rgba(10,22,10,0.45) 100%),
              linear-gradient(135deg, #1a3a2a 0%, #2d5a3a 25%, #1a4a30 50%, #0d2e1e 75%, #061a10 100%);
            animation: rcKenBurns 18s ease-in-out infinite alternate;
          }
          /* Replace with real image:
             <Image src="/images/hero/himalayan-mountains.webp" fill style={{objectFit:'cover'}} alt="Himalayas" /> */

          .rc-hero-tag {
            position: absolute; bottom: 2.5rem; left: 2rem;
            background: rgba(255,255,255,0.08);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 6px; padding: 0.85rem 1.25rem;
            display: flex; align-items: center; gap: 0.75rem;
            
            animation: rcHeroFadeUp 0.8s ease 0.9s forwards;
          }
          .rc-hero-tag-dot {
            width: 6px; height: 6px; border-radius: 50%;
            background: #4ade80;
            box-shadow: 0 0 0 3px rgba(74,222,128,0.25);
            animation: rcPulse 2s ease infinite;
          }
          .rc-hero-tag-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.7rem; color: rgba(255,255,255,0.85);
            font-weight: 400; letter-spacing: 0.06em;
          }

          .rc-hero-altitude {
            position: absolute; top: 2.5rem; right: 2rem;
            text-align: right;
            
            animation: rcHeroFadeUp 0.8s ease 1s forwards;
          }
          .rc-hero-altitude-num {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 2.2rem; font-weight: 200;
            color: rgba(255,255,255,0.9); line-height: 1; letter-spacing: -0.02em;
          }
          .rc-hero-altitude-label {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.75rem; letter-spacing: 0.2em;
            text-transform: uppercase; color: rgba(255,255,255,0.4);
          }

          /* Scroll indicator */
          .rc-hero-scroll {
            position: absolute; bottom: 2.5rem; left: 50%;
            transform: translateX(-50%);
            display: flex; flex-direction: column;
            align-items: center; gap: 0.5rem;
            
            animation: rcHeroFadeUp 0.8s ease 1.1s forwards;
            z-index: 3;
          }
          .rc-hero-scroll-line {
            width: 1px; height: 40px;
            background: linear-gradient(to bottom, var(--color-primary), transparent);
            animation: rcScrollDrop 1.8s ease infinite;
          }
          .rc-hero-scroll-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.48rem; letter-spacing: 0.28em;
            text-transform: uppercase; color: #aaaaaa;
            writing-mode: vertical-rl; transform: rotate(180deg);
          }

          /* ── Keyframes ── */
          @keyframes rcHeroFadeUp {
            from {  transform: translateY(18px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes rcKenBurns {
            from { transform: scale(1) translateX(0); }
            to   { transform: scale(1.06) translateX(-15px); }
          }
          @keyframes rcPulse {
            0%, 100% { box-shadow: 0 0 0 3px rgba(74,222,128,0.25); }
            50%       { box-shadow: 0 0 0 6px rgba(74,222,128,0.1); }
          }
          @keyframes rcScrollDrop {
            0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
            50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
            100% { transform: scaleY(1); transform-origin: bottom;  }
          }

         @media (max-width: 900px) {
            .rc-hero-left { padding: 5rem 2rem 4rem; }
            .rc-hero-left::after { display: none; }
            .rc-hero-right { height: 55vw; min-height: 320px; }
            .rc-hero-scroll { display: none; }
          }

          @media (max-width: 700px) {
            /* Stack to single column */
            .rc-hero-section {
              grid-template-columns: 1fr !important;
              min-height: unset !important;
            }
            .rc-hero-left {
              padding: 7rem 1.5rem 3rem;
              order: 2;
            }
            .rc-hero-right {
              order: 1;
              height: 60vw;
              min-height: 260px;
              position: relative;
            }
            .rc-hero-heading {
              font-size: clamp(1.75rem, 7vw, 2.4rem) !important;
            }
            .rc-hero-sub {
              font-size: 0.88rem;
              max-width: 100%;
            }
            .rc-hero-actions { flex-direction: column; align-items: flex-start; }
            .rc-hero-btn { width: 100%; justify-content: center; }
            .rc-hero-trust { gap: 1rem; }
            .rc-hero-tag { bottom: 1rem; left: 1rem; }
            .rc-hero-altitude { top: 1rem; right: 1rem; }
            .rc-hero-altitude-num { font-size: 1.5rem; }
            .rc-hero-scroll { display: none; }
          }
        `}</style>

        {/* LEFT */}
        <div className="rc-hero-left">
          <div className="rc-hero-eyebrow">
            <span className="rc-hero-eyebrow-line" />
            <span className="rc-hero-eyebrow-text">Himalayan Retreats</span>
          </div>

          <h2 className="rc-hero-heading">
            Guided Himalayan Retreats,<br />
            <em>Designed With Intention</em>
          </h2>

          <p className="rc-hero-sub">
            Small-group and private retreats across quiet Himalayan locations — created around rest, clarity, and depth.
          </p>

          <div className="rc-hero-actions">
            <Link href="#explore-intentions" className="rc-hero-btn">
              Explore Our Retreats →
            </Link>
          </div>

          <div className="rc-hero-trust">
            <div className="rc-hero-trust-item">
              <span className="rc-hero-trust-num">8+</span>
              <span className="rc-hero-trust-label">Locations</span>
            </div>
            <div className="rc-hero-trust-item">
              <span className="rc-hero-trust-num">100%</span>
              <span className="rc-hero-trust-label">Custom</span>
            </div>
            <div className="rc-hero-trust-item">
              <span className="rc-hero-trust-num">1:1</span>
              <span className="rc-hero-trust-label">Consult</span>
            </div>
          </div>
        </div>

        {/* RIGHT — image panel */}
        <div className="rc-hero-right">
          <Image
            src="/Images/location/rehero.webp"
            alt="Himalayas"
            fill
            sizes="50vw"
            quality={70}
            style={{
              objectFit: 'cover', objectPosition: 'center',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(160deg, rgba(5,15,8,0.55) 0%, rgba(5,15,8,0.15) 45%, rgba(5,15,8,0.5) 100%)',
            animation: 'rcKenBurns 18s ease-in-out infinite alternate',
          }} />
          {/* Production me replace karo:
              <Image src="/images/hero/himalayan-mountains.webp" fill style={{objectFit:'cover'}} alt="Himalayas" priority />
          */}

          {/* Mountain SVG silhouette */}
          <svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%' }}>
            <path d="M0,300 L0,180 L80,120 L160,160 L240,80 L320,140 L400,40 L480,100 L560,60 L640,110 L720,70 L800,120 L800,300 Z"
              fill="rgba(6,26,16,0.7)" />
            <path d="M0,300 L0,220 L120,170 L200,200 L280,150 L360,190 L440,130 L520,170 L600,145 L680,175 L800,155 L800,300 Z"
              fill="rgba(6,26,16,0.9)" />
          </svg>

          {/* Location tag */}
          <div className="rc-hero-tag">
            <span className="rc-hero-tag-dot" />
            <span className="rc-hero-tag-text">Chakrata · Sankri · Munsiyari · Rishikesh</span>
          </div>

          {/* Altitude */}
          <div className="rc-hero-altitude">
            <div className="rc-hero-altitude-num">3,900<span style={{ fontSize: '1rem' }}>m</span></div>
            <div className="rc-hero-altitude-label">avg altitude</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="rc-hero-scroll">
          <span className="rc-hero-scroll-text">Scroll</span>
          <span className="rc-hero-scroll-line" />
        </div>
      </section>
      {/* SECTION 2: RETREAT SERVICES CATALOG */}
      <section id="explore-intentions" style={{
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
          .rs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.75rem;
          }
          .rs-card {
            display: block;
            text-decoration: none;
            color: var(--color-text);
            border-radius: 6px;
            overflow: hidden;
            background: #ffffff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 18px rgba(0,0,0,0.06);
            transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s;
          }
          .rs-card:hover {
            transform: translateY(-7px);
            box-shadow: 0 16px 48px rgba(0,0,0,0.12);
          }
          .rs-img-wrap { position: relative; overflow: hidden; }
          .rs-img {
            width: 100%; height: 210px;
            object-fit: cover; display: block;
            transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
          }
          .rs-card:hover .rs-img { transform: scale(1.07); }
          .rs-img-overlay {
            position: absolute; inset: 0;
            background: linear-gradient(to top, rgba(2,10,2,0.65) 0%, rgba(2,10,2,0.1) 50%, rgba(2,10,2,0) 100%);
            transition: opacity 0.35s;
          }
          .rs-card:hover .rs-img-overlay {5; }
          .rs-img-tag {
            position: absolute; top: 1rem; left: 1rem;
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.52rem; letter-spacing: 0.24em;
            text-transform: uppercase; color: #ffffff;
            background: var(--color-primary); padding: 4px 10px;
            border-radius: 2px; font-weight: 600;
          }
          .rs-img-title {
            position: absolute; bottom: 1rem; left: 1.25rem; right: 1.25rem;
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 1rem; font-weight: 500; color: #ece4d0;
            line-height: 1.25;  transform: translateY(8px);
            transition: opacity 0.35s, transform 0.35s;
          }
          .rs-card:hover .rs-img-title { opacity: 1; transform: translateY(0); }
          .rs-body {
            padding: 1.4rem 1.5rem 1.6rem;
            border-top: 2px solid var(--color-primary);
            position: relative;
          }
          .rs-body::after {
            content: ''; position: absolute; bottom: 0; left: 0;
            height: 2px; width: 0;
            background: var(--color-primary); 
            transition: width 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
          }
          .rs-card:hover .rs-body::after { width: 100%; }
          .rs-card-title {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 1rem; font-weight: 600; color: #111111;
            margin: 0 0 0.45rem; letter-spacing: -0.015em; line-height: 1.25;
          }
          .rs-card-desc {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.87rem; color: #777777;
            margin: 0 0 1.35rem; line-height: 1.8; font-weight: 300;
          }
          .rs-cta {
            display: inline-flex; align-items: center; gap: 0.4rem;
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.6rem; font-weight: 700;
            letter-spacing: 0.2em; text-transform: uppercase;
            color: #374151; transition: gap 0.22s;
          }
          .rs-card:hover .rs-cta { gap: 0.72rem; }
          .rs-eyebrow {
            display: flex; align-items: center; justify-content: center;
            gap: 0.9rem; margin-bottom: 1rem;
          }
          .rs-eyebrow-line { width: 28px; height: 1px; background: var(--color-primary);  }
          .rs-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.75rem; letter-spacing: 0.32em; text-transform: uppercase;
            color: #374151; font-weight: 500;
          }
        `}</style>

        <div style={{ maxWidth: '78rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}>

          <div className="rs-eyebrow">
            <span className="rs-eyebrow-line" />
            <span className="rs-eyebrow-text">Our retreat services</span>
            <span className="rs-eyebrow-line" />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
            fontWeight: 200, letterSpacing: '-0.03em',
            color: '#111111', margin: '0 0 3.5rem',
            lineHeight: 1.1, textAlign: 'center',
          }}>
            Our Retreat{' '}
            <span style={{ color: '#374151', fontWeight: 200 }}>Services</span>
          </h2>

          {(() => {
            // ← MAP KE BAHAR — ek baar banta hai
            const serviceImages: Record<string, { src: string; alt: string }> = {
              'rest-reset':             { src: '/Images/services/restreset.webp',      alt: 'Rest & Reset — gentle restoration retreat' },
              'burnout-recovery':       { src: '/Images/services/burnoutrec.webp',     alt: 'Burnout Recovery — healing from exhaustion' },
              'yoga-and-movement':      { src: '/Images/services/yogamov.webp',        alt: 'Yoga & Movement — mindful practice in nature' },
              'yoga-movement':          { src: '/Images/services/yogamov.webp',        alt: 'Yoga & Movement — mindful practice in nature' },
              'meditation-silence':     { src: '/Images/Journeys/meditation.webp',     alt: 'Meditation & Silence — deep stillness and clarity' },
              'meditation-and-silence': { src: '/Images/Journeys/meditation.webp',     alt: 'Meditation & Silence — deep stillness and clarity' },
              'art-creative':           { src: '/Images/services/artcreative.webp',    alt: 'Art & Creativity — expressive healing through art' },
              'art-and-creative':       { src: '/Images/services/artcreative.webp',    alt: 'Art & Creativity — expressive healing through art' },
              'sound-healing':          { src: '/Images/services/soundhealing.webp',   alt: 'Sound Healing — vibrational therapy and sound baths' },
              'weekend-retreat':        { src: '/Images/services/weekendretreat.webp', alt: 'Weekend Retreat — short rejuvenating escape' },
              'private-custom':         { src: '/Images/services/privatecustom.webp',  alt: 'Private & Custom Retreat — personalised journey' },
              'private-and-custom':     { src: '/Images/services/privatecustom.webp',  alt: 'Private & Custom Retreat — personalised journey' },
            };

            return getAllRetreatServices().map((service) => {
              console.log('slug:', service.slug); // ← ab console mein actual slugs dikhenge
              const imgMeta = serviceImages[service.slug] ?? {
                src: '/Images/services/restreset.webp',
                alt: service.title,
              };

              return (
                <div key={service.slug} style={{ display: 'contents' }}>
                  {/* debug — remove after fix */}
                  {!serviceImages[service.slug] && (
                    <p style={{ color: 'red', fontSize: '0.7rem', gridColumn: '1/-1' }}>
                    
                    </p>
                  )}
                </div>
              );
            });
          })()}

          <div className="rs-grid">
            {getAllRetreatServices().filter((service) => (service.slug as string) !== 'art-and-creative').map((service) => {
              const serviceImages: Record<string, { src: string; alt: string }> = {
                'rest-reset':             { src: '/Images/services/restreset.webp',      alt: 'Rest & Reset — gentle restoration retreat' },
                'burnout-recovery':       { src: '/Images/services/burnoutrec.webp',     alt: 'Burnout Recovery — healing from exhaustion' },
                'yoga-and-movement':      { src: '/Images/services/yoga.webp',        alt: 'Yoga & Movement — mindful practice in nature' },
                'yoga-movement':          { src: '/Images/services/yoga.webp',        alt: 'Yoga & Movement — mindful practice in nature' },
                'meditation-silence':     { src: '/Images/Journeys/meditation.webp',     alt: 'Meditation & Silence — deep stillness and clarity' },
                'meditation-and-silence': { src: '/Images/Journeys/meditation.webp',     alt: 'Meditation & Silence — deep stillness and clarity' },
                'art-creative':           { src: '/Images/services/artcreative.webp',    alt: 'Art & Creativity — expressive healing through art' },
                'art-and-creative':       { src: '/Images/services/artcreative.webp',    alt: 'Art & Creativity — expressive healing through art' },
                'sound-healing':          { src: '/Images/services/soundhealing.webp',   alt: 'Sound Healing — vibrational therapy and sound baths' },
                'weekend-retreat':        { src: '/Images/services/weekendretreat.webp', alt: 'Weekend Retreat — short rejuvenating escape' },
                'private-custom':         { src: '/Images/services/privatecustom.webp',  alt: 'Private & Custom Retreat — personalised journey' },
                'private-and-custom':     { src: '/Images/services/privatecustom.webp',  alt: 'Private & Custom Retreat — personalised journey' },
              };
              const imgMeta = serviceImages[service.slug] ?? {
                src: '/Images/services/restreset.webp',
                alt: service.title,
              };

              return (
                <Link
                  key={service.slug}
                  href={`/retreats/journeys/${service.slug}`}
                  onClick={() => { logIntentClick(service.slug, undefined, '/retreats'); }}
                  className="rs-card"
                >
                  <div className="rs-img-wrap">
                    <Image src={imgMeta.src} alt={imgMeta.alt} className="rs-img" width={400} height={210} sizes="(max-width: 768px) 100vw, 33vw" quality={70} />
                    <div className="rs-img-overlay" />
                    <span className="rs-img-tag">Retreat</span>
                    <span className="rs-img-title">{service.title}</span>
                  </div>
                  <div className="rs-body">
                    <h3 className="rs-card-title">{service.title}</h3>
                    <p className="rs-card-desc">{service.oneLineEssence}</p>
                    <div className="rs-cta">Learn more →</div>
                  </div>
                </Link>
              );
            })}

            {/* Art Retreats hub card */}
            <Link
              href="/retreats/art"
              onClick={() => { logIntentClick('art-retreats', undefined, '/retreats'); }}
              className="rs-card"
            >
              <div className="rs-img-wrap">
                <Image src="/Images/services/artcreative.webp" alt="Art Retreats — creative retreats combining art, nature, and healing" className="rs-img" width={400} height={210} sizes="(max-width: 768px) 100vw, 33vw" quality={70} />
                <div className="rs-img-overlay" />
                <span className="rs-img-tag">Collection</span>
                <span className="rs-img-title">Art Retreats</span>
              </div>
              <div className="rs-body">
                <h3 className="rs-card-title">Art Retreats</h3>
                <p className="rs-card-desc">Creative retreats combining art, nature, and healing practices.</p>
                <div className="rs-cta">Explore art retreats →</div>
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 3: HOW OUR RETREATS WORK */}
      <section style={{
        marginBottom: '0',
        marginTop: '0',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        background: '#ffffff',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <style>{`
          /* ── Step card ── */
          .hw-card {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 2.25rem 2rem;
            border-radius: 6px;
            border: 1px solid #eef0ee;
            background: #ffffff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
            transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s, border-color 0.3s;
            position: relative;
            text-align: center;
            align-items: center;
          }
          .hw-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 36px rgba(0,0,0,0.09);
            border-color: rgba(15,118,110,0.25);
          }
          .hw-card::before {
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
          .hw-card:hover::before { transform: scaleX(1); }

          /* Step number circle */
          .hw-num {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: transparent;
            border: 1.5px solid var(--color-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 1.25rem;
            font-weight: 600;
            color: #374151;
            transition: background 0.3s, color 0.3s;
            flex-shrink: 0;
          }
          .hw-card:hover .hw-num {
            background: var(--color-primary);
            color: #ffffff;
          }

          .hw-title {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 1.05rem;
            font-weight: 600;
            color: #111111;
            margin: 0 0 0.4rem;
            letter-spacing: -0.01em;
            line-height: 1.3;
          }
          .hw-desc {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.87rem;
            line-height: 1.8;
            color: #777777;
            margin: 0;
            font-weight: 300;
          }

          /* ── Grid ── */
          .hw-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
            align-items: start;
          }

          /* ── Eyebrow ── */
          .hw-eyebrow {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.9rem;
            margin-bottom: 1rem;
          }
          .hw-eyebrow-line {
            width: 28px; height: 1px;
            background: var(--color-primary);
            
          }
          .hw-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.75rem;
            letter-spacing: 0.32em;
            text-transform: uppercase;
            color: #374151;
            font-weight: 500;
          }
        `}</style>

        <div style={{ maxWidth: '78rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}>

          <div className="hw-eyebrow">
            <span className="hw-eyebrow-line" />
            <span className="hw-eyebrow-text">How our retreats work</span>
            <span className="hw-eyebrow-line" />
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
            How our retreats{' '}
            <span style={{ color: '#374151', fontWeight: 200 }}>work</span>
          </h2>

          <div className="hw-grid">
            {processSteps.map((ps) => (
              <div key={ps.step} className="hw-card">
                <div className="hw-num">{ps.step}</div>
                <div>
                  <h3 className="hw-title">{ps.title}</h3>
                  <p className="hw-desc">{ps.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: RETREAT FORMATS */}
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
          /* ── Card ── */
          .rf-card {
            display: block;
            border-radius: 6px;
            overflow: hidden;
            background: #ffffff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 18px rgba(0,0,0,0.06);
            transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s;
            position: relative;
          }
          .rf-card:hover {
            transform: translateY(-7px);
            box-shadow: 0 16px 48px rgba(0,0,0,0.12);
          }

          /* ── Image ── */
          .rf-img-wrap {
            position: relative;
            overflow: hidden;
          }
          .rf-img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            display: block;
            transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
          }
          .rf-card:hover .rf-img { transform: scale(1.07); }

          .rf-img-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(2,10,2,0.65) 0%, rgba(2,10,2,0.1) 50%, rgba(2,10,2,0) 100%);
            transition: opacity 0.35s;
          }
          .rf-card:hover .rf-img-overlay {5; }

          .rf-img-tag {
            position: absolute;
            top: 1rem; left: 1rem;
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

          .rf-img-title {
            position: absolute;
            bottom: 1rem; left: 1.25rem; right: 1.25rem;
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 1rem;
            font-weight: 500;
            color: #ece4d0;
            line-height: 1.25;
            
            transform: translateY(8px);
            transition: opacity 0.35s, transform 0.35s;
          }
          .rf-card:hover .rf-img-title { opacity: 1; transform: translateY(0); }

          /* ── Body ── */
          .rf-body {
            padding: 1.4rem 1.5rem 1.6rem;
            border-top: 2px solid var(--color-primary);
            position: relative;
          }
          .rf-body::after {
            content: '';
            position: absolute;
            bottom: 0; left: 0;
            height: 2px; width: 0;
            background: var(--color-primary);
            
            transition: width 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
          }
          .rf-card:hover .rf-body::after { width: 100%; }

          .rf-title {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 1rem;
            font-weight: 600;
            color: #111111;
            margin: 0 0 0.45rem;
            letter-spacing: -0.015em;
            line-height: 1.25;
          }
          .rf-desc {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.87rem;
            color: #777777;
            margin: 0;
            line-height: 1.8;
            font-weight: 300;
          }

          /* ── Grid ── */
          .rf-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.75rem;
          }

          /* ── Eyebrow ── */
          .rf-eyebrow {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.9rem;
            margin-bottom: 1rem;
          }
          .rf-eyebrow-line {
            width: 28px; height: 1px;
            background: var(--color-primary);
            
          }
          .rf-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.75rem;
            letter-spacing: 0.32em;
            text-transform: uppercase;
            color: #374151;
            font-weight: 500;
          }
        `}</style>

        <div style={{ maxWidth: '78rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}>

          <div className="rf-eyebrow">
            <span className="rf-eyebrow-line" />
            <span className="rf-eyebrow-text">Retreat formats we offer</span>
            <span className="rf-eyebrow-line" />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
            fontWeight: 200,
            letterSpacing: '-0.03em',
            color: '#111111',
            margin: '0 0 1rem',
            lineHeight: 1.1,
            textAlign: 'center',
          }}>
            Retreat formats{' '}
            <span style={{ color: '#374151', fontWeight: 200 }}>we offer</span>
          </h2>

          <p style={{
            textAlign: 'center',
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.95rem',
            color: 'var(--color-muted)',
            marginBottom: '3.5rem',
            lineHeight: 1.6,
            fontWeight: 300,
          }}>
            These are examples — many retreats are designed specifically around you.
          </p>

          <div className="rf-grid">
            {retreatFormats.map((format) => {
              const formatImages: Record<string, { src: string; tag: string }> = {
                'weekend-retreat':   { src: '/Images/Journeys/weekend.webp',    tag: 'Weekend' },
                'meditation-retreat':{ src: '/Images/Journeys/meditation.webp', tag: 'Meditation' },
                'yoga-retreat':      { src: '/Images/Journeys/yoga.webp',       tag: 'Yoga' },
          
              };
              const meta = formatImages[format.slug] ?? {
                src: '/Images/Journeys/weekend.webp',
                tag: 'Retreat',
              };

              return (
                <div key={format.slug} className="rf-card">
                  <div className="rf-img-wrap">
                    <Image src={meta.src} alt={format.title} className="rf-img" width={400} height={210} sizes="(max-width: 768px) 100vw, 33vw" quality={70} />
                    <div className="rf-img-overlay" />
                    <span className="rf-img-tag">{meta.tag}</span>
                    <span className="rf-img-title">{format.title}</span>
                  </div>
                  <div className="rf-body">
                    <h3 className="rf-title">{format.title}</h3>
                    <p className="rf-desc">{format.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
      {/* SECTION 5: HIMALAYAN LOCATIONS */}
      <section style={{
        marginBottom: '0',
        marginTop: '0',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        background: '#ffffff',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <style>{`
          /* ── Card ── */
          .hl-card {
            display: block;
            text-decoration: none;
            border-radius: 6px;
            overflow: hidden;
            background: #ffffff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.05);
            transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s;
          }
          .hl-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 16px 44px rgba(0,0,0,0.11);
          }

          /* ── Image ── */
          .hl-img-wrap {
            position: relative;
            overflow: hidden;
          }
          .hl-img {
            width: 100%;
            height: 175px;
            object-fit: cover;
            display: block;
            transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
          }
          .hl-card:hover .hl-img { transform: scale(1.07); }

          .hl-img-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(2,10,2,0.62) 0%, rgba(2,10,2,0.05) 55%, transparent 100%);
            transition: opacity 0.35s;
          }
          .hl-card:hover .hl-img-overlay {2; }

          .hl-img-name {
            position: absolute;
            bottom: 0.75rem; left: 1rem;
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.75rem;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: rgba(236,228,208,0.75);
            font-weight: 500;
          }

          /* ── Body ── */
          .hl-body {
            padding: 1.1rem 1.25rem 1.3rem;
            border-top: 2px solid var(--color-primary);
            position: relative;
          }


          .hl-name {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 1.1rem;
            font-weight: 600;
            color: #111111;
            margin: 0 0 0.3rem;
            letter-spacing: -0.01em;
            line-height: 1.25;
          }
          .hl-tagline {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.84rem;
            line-height: 1.7;
            color: #777777;
            margin: 0 0 0.85rem;
            font-weight: 300;
          }
          .hl-cta {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.6rem;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #374151;
            transition: gap 0.22s;
          }
          .hl-card:hover .hl-cta { gap: 0.62rem; }

          /* ── Grid ── */
          .hl-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
          }

          /* ── Eyebrow ── */
          .hl-eyebrow {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.9rem;
            margin-bottom: 1rem;
          }
          .hl-eyebrow-line {
            width: 28px; height: 1px;
            background: var(--color-primary);
            
          }
          .hl-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.75rem;
            letter-spacing: 0.32em;
            text-transform: uppercase;
            color: #374151;
            font-weight: 500;
          }
        `}</style>

        <div style={{ maxWidth: '78rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}>

          <div className="hl-eyebrow">
            <span className="hl-eyebrow-line" />
            <span className="hl-eyebrow-text">Himalayan locations we work with</span>
            <span className="hl-eyebrow-line" />
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
            Himalayan locations{' '}
            <span style={{ color: '#374151', fontWeight: 200 }}>we work with</span>
          </h2>

         <div className="hl-grid">
            {locations.map((location) => {
              const locationImages: Record<string, { src: string; alt: string }> = {
                'chakrata':  { src: '/Images/location/chakrata.webp',  alt: 'Chakrata — deodar forest ridge in Uttarakhand' },
                'sankri':    { src: '/Images/location/sankri.webp',    alt: 'Sankri — pine valley at the edge of Govind Wildlife Sanctuary' },
                'munsiyari': { src: '/Images/location/munsiyari.webp', alt: 'Munsiyari — Panchachuli massif views from Kumaon Himalaya' },
                'joshimath': { src: '/Images/location/joshimath.webp', alt: 'Joshimath — gateway to Kuari Pass and Auli in Garhwal' },
                'lohajung':  { src: '/Images/location/lohajung.webp', alt: 'Lohajung — base village for Roopkund and Brahmatal treks' },
                'rishikesh': { src: '/Images/location/rishikesh.webp', alt: 'Rishikesh — Ganges riverside yoga and retreat destination' },
                'mussoorie': { src: '/Images/location/mussoorie.webp', alt: 'Mussoorie — Queen of Hills in the Garhwal foothills' },
                'zanskar':   { src: '/Images/location/zanskar.webp',   alt: 'Zanskar — remote high-altitude valley in Ladakh' },
              };
              const imgData = locationImages[location.id] ?? { src: '/Images/location/chakrata.webp', alt: location.name };

              return (
                <Link
                  key={location.id}
                  href={`/retreats/${location.id}`}
                  className="hl-card"
                >
                  <div className="hl-img-wrap">
                    <Image src={imgData.src} alt={imgData.alt} className="hl-img" width={400} height={210} sizes="(max-width: 768px) 100vw, 33vw" quality={70} />
                    <div className="hl-img-overlay" />
                    <span className="hl-img-name">{location.name}</span>
                  </div>
                  <div className="hl-body">
                    <h3 className="hl-name">{location.name}</h3>
                    <p className="hl-tagline">{location.tagline}</p>
                    <div className="hl-cta">Explore this location →</div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 6: WHY THIS BRAND */}
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
          .wb-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1.5rem;
            list-style: none;
            padding: 0;
            margin: 0;
          }

          /* ── Card ── */
          .wb-item {
            background: #ffffff;
            border: 1px solid #eef0ee;
            border-radius: 8px;
            padding: 2.25rem 2rem;
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
            transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s, border-color 0.3s;
            position: relative;
            overflow: hidden;
          }
          .wb-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 36px rgba(0,0,0,0.09);
            border-color: rgba(15,118,110,0.3);
          }

          /* Top green line on hover */
          .wb-item::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 2px;
            background: var(--color-primary);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
            border-radius: 8px 8px 0 0;
          }
          .wb-item:hover::before { transform: scaleX(1); }

          /* ── Top row: number + check ── */
          .wb-top-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .wb-num {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 2.8rem;
            font-weight: 200;
            color: #374151;
            
            line-height: 1;
            letter-spacing: -0.04em;
            transition: opacity 0.3s;
            user-select: none;
          }
          .wb-item:hover .wb-num {  }

          .wb-check {
            width: 34px; height: 34px;
            border-radius: 50%;
            border: 1.5px solid var(--color-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #374151;
            font-size: 0.72rem;
            font-weight: 700;
            transition: background 0.3s, color 0.3s;
            flex-shrink: 0;
          }
          .wb-item:hover .wb-check {
            background: var(--color-primary);
            color: #ffffff;
          }

          /* ── Text ── */
          .wb-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.92rem;
            line-height: 1.75;
            color: #555555;
            font-weight: 300;
            transition: color 0.3s;
          }
          .wb-item:hover .wb-text { color: #333333; }

          /* ── Eyebrow ── */
          .wb-eyebrow {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.9rem;
            margin-bottom: 1rem;
          }
          .wb-eyebrow-line {
            width: 28px; height: 1px;
            background: var(--color-primary);
            
          }
          .wb-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.75rem;
            letter-spacing: 0.32em;
            text-transform: uppercase;
            color: #374151;
            font-weight: 500;
          }
        `}</style>

        <div style={{ maxWidth: '78rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '2rem', paddingRight: '2rem' }}>

          <div className="wb-eyebrow">
            <span className="wb-eyebrow-line" />
            <span className="wb-eyebrow-text">What makes our retreats different</span>
            <span className="wb-eyebrow-line" />
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
            What makes our retreats{' '}
            <span style={{ color: '#374151', fontWeight: 200 }}>different</span>
          </h2>

          <ul className="wb-grid">
            {whyUsPoints.map((point, idx) => (
              <li key={idx} className="wb-item">
                <div className="wb-top-row">
                  <span className="wb-num">{String(idx + 1).padStart(2, '0')}</span>
                  <div className="wb-check">✓</div>
                </div>
                <span className="wb-text">{point}</span>
              </li>
            ))}
          </ul>

        </div>
      </section>

      {/* SECTION 7: INVITATION CTA */}
      <section style={{
        marginBottom: '0',
        marginTop: '0',
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        overflow: 'hidden',
        background: '#0a160a',
      }}>
        <style>{`
          @keyframes s7FadeUp {
            from {  transform: translateY(32px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes s7LineGrow {
            from { transform: scaleX(0);  }
            to   { transform: scaleX(1); opacity: 1; }
          }
          @keyframes s7Pulse {
            0%, 100% {  transform: scale(1); }
            50%       { transform: scale(1.08); }
          }

          /* ── Radial glows ── */
          .s7-glow-tl {
            position: absolute;
            top: -120px; left: -80px;
            width: 600px; height: 600px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(15,118,110,0.18) 0%, transparent 70%);
            pointer-events: none;
          }
          .s7-glow-br {
            position: absolute;
            bottom: -160px; right: -100px;
            width: 700px; height: 500px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(15,118,110,0.12) 0%, transparent 70%);
            pointer-events: none;
          }

          /* Horizontal rule lines */
          .s7-rule-top {
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(15,118,110,0.5) 30%, rgba(15,118,110,0.5) 70%, transparent);
            animation: s7LineGrow 1.2s ease forwards;
          }
          .s7-rule-bottom {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, transparent);
          }

          /* ── Layout ── */
          .s7-inner {
            position: relative;
            z-index: 2;
            max-width: 78rem;
            margin: 0 auto;
            padding: 8rem 2rem;
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 6rem;
            align-items: center;
          }
          @media (max-width: 900px) {
            .s7-inner { grid-template-columns: 1fr; gap: 4rem; padding: 5rem 1.5rem; }
          }

          /* ── LEFT ── */
          .s7-left { animation: s7FadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both; }

          .s7-tag {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 6px 14px;
            border: 1px solid rgba(15,118,110,0.4);
            border-radius: 100px;
            margin-bottom: 2rem;
          }
          .s7-tag-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: var(--color-primary);
            animation: s7Pulse 2.5s ease-in-out infinite;
          }
          .s7-tag-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.58rem;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #374151;
            font-weight: 500;
          }

          .s7-headline {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: clamp(2.8rem, 5.5vw, 4.5rem);
            font-weight: 200;
            letter-spacing: -0.04em;
            color: #eae4d8;
            line-height: 1.0;
            margin: 0 0 2rem;
          }
          .s7-headline em {
            font-style: italic;
            color: #374151;
            font-weight: 200;
          }

          .s7-body {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.95rem;
            line-height: 1.95;
            color: rgba(200,210,200,0.55);
            font-weight: 300;
            max-width: 400px;
            margin: 0 0 3rem;
          }

          /* Trust list */
          .s7-trust-list { display: flex; flex-direction: column; gap: 0.75rem; }
          .s7-trust-item {
            display: flex;
            align-items: center;
            gap: 0.85rem;
          }
          .s7-trust-icon {
            width: 20px; height: 20px;
            border-radius: 50%;
            border: 1px solid rgba(15,118,110,0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            font-size: 0.6rem;
            color: #374151;
          }
          .s7-trust-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.82rem;
            color: rgba(200,215,200,0.5);
            font-weight: 300;
            letter-spacing: 0.01em;
          }

          /* ── RIGHT ── */
          .s7-right { animation: s7FadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.25s both; }

          .s7-card {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 16px;
            padding: 2.75rem;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            position: relative;
            overflow: hidden;
          }
          .s7-card::before {
            content: '';
            position: absolute;
            top: 0; left: 10%; right: 10%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(15,118,110,0.6), transparent);
          }

          /* Stats */
          .s7-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1px;
            background: rgba(255,255,255,0.07);
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 2.5rem;
          }
          .s7-stat {
            padding: 1.25rem 0.5rem;
            text-align: center;
            background: rgba(255,255,255,0.03);
            transition: background 0.2s;
          }
          .s7-stat:hover { background: rgba(15,118,110,0.1); }
          .s7-stat-num {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 1.6rem;
            font-weight: 200;
            color: #374151;
            letter-spacing: -0.03em;
            line-height: 1;
            margin-bottom: 0.3rem;
          }
          .s7-stat-label {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.5rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: rgba(200,215,200,0.4);
          }

          .s7-card-title {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 1.05rem;
            font-weight: 500;
            color: #e8f0e0;
            margin: 0 0 0.45rem;
            letter-spacing: -0.01em;
          }
          .s7-card-sub {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.82rem;
            color: rgba(200,215,200,0.45);
            font-weight: 300;
            line-height: 1.7;
            margin: 0 0 2rem;
          }

          /* Primary button */
          .s7-btn-primary {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
            width: 100%;
            padding: 15px 28px;
            background: var(--color-primary);
            color: #ffffff;
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.62rem;
            font-weight: 600;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            text-decoration: none;
            transition: background 0.2s, transform 0.18s, box-shadow 0.25s;
            margin-bottom: 0.85rem;
            position: relative;
            overflow: hidden;
          }
          .s7-btn-primary::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
            pointer-events: none;
          }
          .s7-btn-primary:hover {
            background: #0d9e95;
            transform: translateY(-2px);
            box-shadow: 0 12px 36px rgba(15,118,110,0.35);
          }

          /* Ghost button */
          .s7-btn-ghost {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 14px 28px;
            background: transparent;
            color: rgba(200,220,200,0.6);
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.62rem;
            font-weight: 400;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            cursor: pointer;
            text-decoration: none;
            transition: border-color 0.2s, color 0.2s, transform 0.18s;
          }
          .s7-btn-ghost:hover {
            border-color: rgba(15,118,110,0.5);
            color: #374151;
            transform: translateY(-2px);
          }

          /* Badge row */
          .s7-badges {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            margin-top: 1.5rem;
            flex-wrap: wrap;
          }
          .s7-badge {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.52rem;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: rgba(200,215,200,0.3);
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .s7-badge-sep {
            width: 2px; height: 2px;
            border-radius: 50%;
            background: rgba(15,118,110,0.4);
          }
        `}</style>

        <div className="s7-glow-tl" />
        <div className="s7-glow-br" />
        <div className="s7-rule-top" />
        <div className="s7-rule-bottom" />

        <div className="s7-inner">

          {/* ── LEFT ── */}
          <div className="s7-left">
            <div className="s7-tag">
              <span className="s7-tag-dot" />
              <span className="s7-tag-text">Begin Your Journey</span>
            </div>

            <h2 className="s7-headline">
              Let&apos;s design<br />
              <em>your retreat.</em>
            </h2>

            <p className="s7-body">
              Every retreat is personal. Share what you&apos;re seeking, and we&apos;ll match you with the right location, format, and dates.
            </p>

            <div className="s7-trust-list">
              {[
                'Small groups only — never crowded',
                'Every journey built in conversation',
                'No fixed dates, no fixed packages',
              ].map((t) => (
                <div key={t} className="s7-trust-item">
                  <div className="s7-trust-icon">✓</div>
                  <span className="s7-trust-text">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT CARD ── */}
          <div className="s7-right">
            <div className="s7-card">

              <div className="s7-stats">
                {[
                  { num: '8+',   label: 'Locations' },
                  { num: '100%', label: 'Custom'    },
                  { num: '1:1',  label: 'Consult'   },
                ].map((s) => (
                  <div key={s.num} className="s7-stat">
                    <div className="s7-stat-num">{s.num}</div>
                    <div className="s7-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <h3 className="s7-card-title">Start with a conversation</h3>
              <p className="s7-card-sub">
                No forms, no checkout. Just tell us what you&apos;re looking for — we&apos;ll take it from there.
              </p>

              <a
                href="https://wa.me/919760446101?text=I%27d%20like%20to%20design%20a%20retreat."
                onClick={() => logWhatsAppOpen('/retreats')}
                className="s7-btn-primary"
              >
                Talk on WhatsApp
              </a>

              <a
                href="https://wa.me/919760446101?text=Tell%20me%20about%20your%20retreat%20options."
                onClick={() => logWhatsAppOpen('/retreats')}
                className="s7-btn-ghost"
              >
                Share Your Intention
              </a>

              <div className="s7-badges">
                <span className="s7-badge">Small groups</span>
                <span className="s7-badge-sep" />
                <span className="s7-badge">No fixed dates</span>
                <span className="s7-badge-sep" />
                <span className="s7-badge">Fully custom</span>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
