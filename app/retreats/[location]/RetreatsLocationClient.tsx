'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { LocationPremiumContent } from '@/content/locations';
import { getAllLocationContent } from '@/content/locations';
import type { RetreatContent } from '@/types/content';
import type { RetreatService } from '@/content/retreats/services';
import {
  logLocationEntry,
  logWhatsAppOpen,
} from '@/lib/analytics';

interface RetreatsLocationClientProps {
  locationPremiumContent: LocationPremiumContent;
  retreats: RetreatContent[];
  retreatServices: RetreatService[];
  treks: any[];
  locationId: string;
}

export default function RetreatsLocationClient({
  locationPremiumContent,
  retreats,
  retreatServices,
  treks,
  locationId,
}: RetreatsLocationClientProps) {
  useEffect(() => {
    logLocationEntry(locationId, document.referrer);
    // DEBUG: Verify treks are arriving
    console.log(`[${locationPremiumContent.name}] Treks received:`, treks.length, treks);
    console.log(`[${locationPremiumContent.name}] Retreat services:`, retreatServices.length);
  }, [locationId, treks, locationPremiumContent.name, retreatServices]);

  const whatsappMessage = `Hi, I'm interested in learning more about journeys in ${locationPremiumContent.name}.`;
  const whatsappLink = `https://wa.me/919760446101?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      {/* SECTION 1: OPENING — THE LAND ITSELF */}
      <section style={{
        marginBottom: '0',
        marginTop: '0',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        background: '#f7f9f7',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        borderBottom: '1px solid #e5e7eb',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <style>{`
          @keyframes rlc1FadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .rlc1-inner {
            max-width: 52rem;
            margin: 0 auto;
            padding: 0 2rem;
            position: relative;
            z-index: 1;
            animation: rlc1FadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both;
          }

          /* Large decorative quote mark */
          .rlc1-quote-mark {
            font-family: 'Georgia', serif;
            font-size: 8rem;
            line-height: 0.6;
            color: var(--color-primary);
            opacity: 0.07;
            display: block;
            margin-bottom: 1.5rem;
            user-select: none;
            font-weight: 700;
          }

          /* Eyebrow */
          .rlc1-eyebrow {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 2rem;
          }
          .rlc1-eyebrow-line {
            width: 32px; height: 1px;
            background: var(--color-primary);
            opacity: 0.5;
            flex-shrink: 0;
          }
          .rlc1-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.58rem;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: var(--color-primary);
            font-weight: 500;
            opacity: 0.7;
          }

          /* Main text */
          .rlc1-body {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: clamp(1.05rem, 2vw, 1.2rem);
            line-height: 1.95;
            color: #2a2a2a;
            font-weight: 300;
            letter-spacing: 0.01em;
            margin: 0;
            position: relative;
            padding-left: 2rem;
          }

          /* Left accent border */
          .rlc1-body::before {
            content: '';
            position: absolute;
            left: 0; top: 0.3rem; bottom: 0.3rem;
            width: 2px;
            background: linear-gradient(to bottom, var(--color-primary), transparent);
            border-radius: 2px;
          }

          /* Bottom location tag */
          .rlc1-footer {
            margin-top: 2.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(0,0,0,0.06);
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          .rlc1-location-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: var(--color-primary);
            opacity: 0.5;
            flex-shrink: 0;
          }
          .rlc1-location-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.7rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: var(--color-primary);
            font-weight: 500;
            opacity: 0.6;
          }
        `}</style>

        {/* Faint bg glow */}
        <div style={{
          position: 'absolute',
          top: '-60px', right: '-80px',
          width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(15,118,110,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="rlc1-inner">

          <div className="rlc1-eyebrow">
            <span className="rlc1-eyebrow-line" />
            <span className="rlc1-eyebrow-text">The Land Itself</span>
          </div>

          <span className="rlc1-quote-mark">"</span>

          <p className="rlc1-body">
            {locationPremiumContent.landTone.opening}
          </p>

          <div className="rlc1-footer">
            <span className="rlc1-location-dot" />
            <span className="rlc1-location-text">{locationPremiumContent.name} · Himalayan Journeys</span>
          </div>

        </div>
      </section>

      {/* SECTION 2: BRIDGE INNER WORK & MOVEMENT */}
      <section style={{
        marginBottom: '0',
        marginTop: '0',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        background: '#ffffff',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <style>{`
          .rlc2-inner {
            max-width: 52rem;
            margin: 0 auto;
            padding: 0 2rem;
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 4rem;
            align-items: start;
          }
          @media (max-width: 720px) {
            .rlc2-inner { grid-template-columns: 1fr; gap: 1.5rem; }
          }

          /* ── Left: title block ── */
          .rlc2-left {
            position: sticky;
            top: 6rem;
          }

          .rlc2-eyebrow {
            display: flex;
            align-items: center;
            gap: 0.7rem;
            margin-bottom: 1.25rem;
          }
          .rlc2-eyebrow-line {
            width: 24px; height: 1px;
            background: var(--color-primary);
            opacity: 0.5;
            flex-shrink: 0;
          }
          .rlc2-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.56rem;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: var(--color-primary);
            font-weight: 500;
            opacity: 0.7;
          }

          .rlc2-title {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: clamp(1.4rem, 2.5vw, 1.85rem);
            font-weight: 200;
            letter-spacing: -0.03em;
            color: #111111;
            line-height: 1.15;
            margin: 0;
          }
          .rlc2-title-accent {
            display: block;
            color: var(--color-primary);
          }

          /* ── Right: description ── */
          .rlc2-desc {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 1rem;
            line-height: 1.95;
            color: #3a3a3a;
            font-weight: 300;
            margin: 0;
            padding-top: 0.25rem;
          }
        `}</style>

        <div className="rlc2-inner">

          {/* Left sticky title */}
          <div className="rlc2-left">
            <div className="rlc2-eyebrow">
              <span className="rlc2-eyebrow-line" />
              <span className="rlc2-eyebrow-text">Inner Work</span>
            </div>
            <h2 className="rlc2-title">
              {locationPremiumContent.bridgingInnerWorkMovement.title}
            </h2>
          </div>

          {/* Right description */}
          <p className="rlc2-desc">
            {locationPremiumContent.bridgingInnerWorkMovement.description}
          </p>

        </div>
      </section>

      {/* SECTION 3: WHY INNER WORK SUCCEEDS HERE */}
      <section style={{
        marginBottom: '0',
        marginTop: '0',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        background: '#f7f9f7',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <style>{`
          .rlc3-inner {
            max-width: 52rem;
            margin: 0 auto;
            padding: 0 2rem;
          }

          .rlc3-eyebrow {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1rem;
          }
          .rlc3-eyebrow-line {
            width: 24px; height: 1px;
            background: var(--color-primary);
            opacity: 0.5;
          }
          .rlc3-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.56rem;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: var(--color-primary);
            font-weight: 500;
            opacity: 0.7;
          }

          .rlc3-heading {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: clamp(1.4rem, 2.5vw, 1.85rem);
            font-weight: 200;
            letter-spacing: -0.03em;
            color: #111111;
            line-height: 1.15;
            margin: 0 0 3rem;
          }
          .rlc3-heading-accent {
            color: var(--color-primary);
          }

          /* ── Factor cards ── */
          .rlc3-factors {
            display: flex;
            flex-direction: column;
            gap: 1px;
            background: #e5e7eb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
          }

          .rlc3-factor {
            background: #ffffff;
            padding: 2rem 2rem 2rem 2.5rem;
            display: grid;
            grid-template-columns: 2rem 1fr;
            gap: 1.5rem;
            align-items: start;
            transition: background 0.25s;
            position: relative;
          }
          .rlc3-factor:hover { background: #fafaf8; }

          /* Left accent line reveal */
          .rlc3-factor::before {
            content: '';
            position: absolute;
            left: 0; top: 0; bottom: 0;
            width: 3px;
            background: var(--color-primary);
            transform: scaleY(0);
            transform-origin: bottom;
            transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          }
          .rlc3-factor:hover::before { transform: scaleY(1); }

          /* Index number */
          .rlc3-idx {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.65rem;
            font-weight: 600;
            color: var(--color-primary);
            opacity: 0.35;
            letter-spacing: 0.1em;
            padding-top: 0.2rem;
            transition: opacity 0.25s;
          }
          .rlc3-factor:hover .rlc3-idx { opacity: 0.7; }

          .rlc3-factor-title {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.95rem;
            font-weight: 600;
            color: #111111;
            margin: 0 0 0.5rem;
            letter-spacing: -0.01em;
            line-height: 1.3;
          }
          .rlc3-factor-desc {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.88rem;
            line-height: 1.8;
            color: #666666;
            margin: 0;
            font-weight: 300;
          }
        `}</style>

        <div className="rlc3-inner">

          <div className="rlc3-eyebrow">
            <span className="rlc3-eyebrow-line" />
            <span className="rlc3-eyebrow-text">Why This Land</span>
          </div>

          <h2 className="rlc3-heading">
            {locationPremiumContent.retreatLogic.title}
          </h2>

          <div className="rlc3-factors">
            {locationPremiumContent.retreatLogic.factors.map((factor, idx) => (
              <div key={idx} className="rlc3-factor">
                <span className="rlc3-idx">{String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="rlc3-factor-title">{factor.title}</h3>
                  <p className="rlc3-factor-desc">{factor.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: RETREAT SERVICES POSSIBLE IN THIS LOCATION */}
      {retreatServices.length > 0 && (
        <section style={{
          marginBottom: '0',
          marginTop: '0',
          paddingTop: '5rem',
          paddingBottom: '5rem',
          background: '#ffffff',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <style>{`
            .rlc4-inner {
              max-width: 52rem;
              margin: 0 auto;
              padding: 0 2rem;
            }

            .rlc4-eyebrow {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              margin-bottom: 1rem;
            }
            .rlc4-eyebrow-line {
              width: 24px; height: 1px;
              background: var(--color-primary);
              opacity: 0.5;
            }
            .rlc4-eyebrow-text {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.56rem;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              color: var(--color-primary);
              font-weight: 500;
              opacity: 0.7;
            }

            .rlc4-heading {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.4rem, 2.5vw, 1.85rem);
              font-weight: 200;
              letter-spacing: -0.03em;
              color: #111111;
              line-height: 1.15;
              margin: 0 0 0.75rem;
            }

            .rlc4-sub {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.88rem;
              color: #777777;
              font-weight: 300;
              line-height: 1.7;
              margin: 0 0 2.5rem;
            }

            /* ── Grid ── */
            .rlc4-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
              gap: 1.5rem;
            }

            /* ── Card ── */
            .rlc4-card {
              display: block;
              text-decoration: none;
              color: var(--color-text);
              background: #ffffff;
              border: 1px solid #eef0ee;
              border-radius: 8px;
              padding: 1.75rem 1.6rem 1.6rem;
              box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
              transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s, border-color 0.3s;
              position: relative;
              overflow: hidden;
              display: flex;
              flex-direction: column;
            }
            .rlc4-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 12px 36px rgba(0,0,0,0.09);
              border-color: rgba(15,118,110,0.3);
            }
            .rlc4-card::before {
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
            .rlc4-card:hover::before { transform: scaleX(1); }

            .rlc4-card-idx {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.58rem;
              font-weight: 500;
              letter-spacing: 0.18em;
              color: var(--color-primary);
              opacity: 0.3;
              margin-bottom: 0.85rem;
              transition: opacity 0.25s;
            }
            .rlc4-card:hover .rlc4-card-idx { opacity: 0.6; }

            .rlc4-card-title {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 1rem;
              font-weight: 600;
              color: #111111;
              margin: 0 0 0.45rem;
              letter-spacing: -0.01em;
              line-height: 1.25;
            }
            .rlc4-card-essence {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.85rem;
              color: #777777;
              margin: 0 0 1.1rem;
              line-height: 1.7;
              font-weight: 300;
              flex: 1;
            }
            .rlc4-cta {
              display: inline-flex;
              align-items: center;
              gap: 0.35rem;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.7rem;
              font-weight: 500;
              color: var(--color-primary);
              transition: gap 0.22s;
            }
            .rlc4-card:hover .rlc4-cta { gap: 0.6rem; }
          `}</style>

          <div className="rlc4-inner">

            <div className="rlc4-eyebrow">
              <span className="rlc4-eyebrow-line" />
              <span className="rlc4-eyebrow-text">Retreat Services</span>
            </div>

            <h2 className="rlc4-heading">Retreat Services</h2>

            <p className="rlc4-sub">
              These retreat journeys align naturally with what {locationPremiumContent.name} offers:
            </p>

            <div className="rlc4-grid">
              {retreatServices.map((service, i) => (
                <Link
                  key={service.slug}
                  href={`/retreats/journeys/${service.slug}`}
                  className="rlc4-card"
                >
                  <div className="rlc4-card-idx">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="rlc4-card-title">{service.title}</h3>
                  <p className="rlc4-card-essence">{service.oneLineEssence}</p>
                  <div className="rlc4-cta">Learn more →</div>
                </Link>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* SECTION 5: TREKS & OUTDOOR JOURNEYS — or Experiences Beyond the Retreat */}
      {locationPremiumContent.beyondRetreatExperiences && locationPremiumContent.beyondRetreatExperiences.length > 0 ? (
        <section style={{
          marginBottom: '0', marginTop: '0',
          paddingTop: '5rem', paddingBottom: '5rem',
          background: '#f7f9f7',
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <style>{`
            .rlc5-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }

            .rlc5-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
            .rlc5-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; }
            .rlc5-eyebrow-text {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
              color: var(--color-primary); font-weight: 500; opacity: 0.7;
            }

            .rlc5-heading {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
              letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 0.75rem;
            }
            .rlc5-sub {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.88rem; color: #777777; font-weight: 300;
              line-height: 1.7; margin: 0 0 2.5rem;
            }

            /* Beyond retreat exp cards */
            .rlc5-exp-list { display: flex; flex-direction: column; gap: 1px; background: #e5e7eb; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
            .rlc5-exp {
              background: #ffffff; padding: 1.75rem 2rem;
              position: relative; transition: background 0.25s;
            }
            .rlc5-exp:hover { background: #fafaf8; }
            .rlc5-exp::before {
              content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
              background: var(--color-primary); transform: scaleY(0); transform-origin: bottom;
              transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
            }
            .rlc5-exp:hover::before { transform: scaleY(1); }

            .rlc5-exp-header {
              display: flex; align-items: baseline; gap: 0.75rem;
              margin-bottom: 0.6rem; flex-wrap: wrap;
            }
            .rlc5-exp-name {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 1rem; font-weight: 600; color: #111111;
              margin: 0; letter-spacing: -0.01em; line-height: 1.3;
            }
            .rlc5-exp-duration {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.78rem; color: #888888; font-weight: 400;
            }
            .rlc5-exp-time {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.75rem; color: var(--color-primary); font-weight: 500;
              background: rgba(15,118,110,0.08); padding: 2px 8px; border-radius: 100px;
            }
            .rlc5-exp-desc {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.88rem; line-height: 1.75; color: #555555;
              margin: 0; font-weight: 300;
            }
          `}</style>

          <div className="rlc5-inner">
            <div className="rlc5-eyebrow">
              <span className="rlc5-eyebrow-line" />
              <span className="rlc5-eyebrow-text">Experiences Beyond the Retreat</span>
            </div>
            <h2 className="rlc5-heading">Experiences Beyond the Retreat</h2>
            <p className="rlc5-sub">
              {locationPremiumContent.name} is not a trekking base. These are experiential walks, hikes, and sitting practices that extend the retreat into the landscape:
            </p>
            <div className="rlc5-exp-list">
              {locationPremiumContent.beyondRetreatExperiences.map((exp, idx) => (
                <div key={idx} className="rlc5-exp">
                  <div className="rlc5-exp-header">
                    <h3 className="rlc5-exp-name">{exp.name}</h3>
                    <span className="rlc5-exp-duration">{exp.duration}</span>
                    {exp.bestTime && <span className="rlc5-exp-time">{exp.bestTime}</span>}
                  </div>
                  <p className="rlc5-exp-desc">{exp.description}</p>
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
          <style>{`
            .rlc5t-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }

            .rlc5t-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
            .rlc5t-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; }
            .rlc5t-eyebrow-text {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
              color: var(--color-primary); font-weight: 500; opacity: 0.7;
            }

            .rlc5t-heading {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
              letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 0.75rem;
            }
            .rlc5t-sub {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.88rem; color: #777777; font-weight: 300;
              line-height: 1.7; margin: 0 0 2.5rem;
            }
            .rlc5t-empty {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.95rem; color: #888888; font-style: italic; font-weight: 300;
              padding: 2rem; background: #ffffff; border: 1px solid #eef0ee;
              border-radius: 8px; line-height: 1.7;
            }

            /* Trek cards */
            .rlc5t-card {
              display: block; text-decoration: none; color: var(--color-text);
              background: #ffffff; border: 1px solid #eef0ee; border-radius: 8px;
              padding: 1.75rem 2rem;
              box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
              transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s, border-color 0.3s;
              position: relative; overflow: hidden; margin-bottom: 1.5rem;
            }
            .rlc5t-card:last-child { margin-bottom: 0; }
            .rlc5t-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 12px 36px rgba(0,0,0,0.09);
              border-color: rgba(15,118,110,0.3);
            }
            .rlc5t-card::before {
              content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
              background: var(--color-primary); transform: scaleX(0); transform-origin: left;
              transition: transform 0.45s cubic-bezier(0.16,1,0.3,1); border-radius: 8px 8px 0 0;
            }
            .rlc5t-card:hover::before { transform: scaleX(1); }

            .rlc5t-card-title {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 1rem; font-weight: 600; color: #111111;
              margin: 0 0 0.45rem; letter-spacing: -0.01em; line-height: 1.25;
            }
            .rlc5t-card-desc {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.88rem; line-height: 1.75; color: #555555;
              margin: 0 0 1rem; font-weight: 300;
            }
            .rlc5t-meta {
              display: flex; gap: 1.5rem; flex-wrap: wrap;
              font-size: 0.82rem; color: #888888; margin-bottom: 1rem;
            }
            .rlc5t-meta-label { font-weight: 500; color: #333333; }
            .rlc5t-season {
              padding-top: 0.75rem; border-top: 1px solid #f0f0f0;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.82rem; color: #888888; font-weight: 300;
            }
            .rlc5t-season-label { font-weight: 500; color: #333333; }
            .rlc5t-cta {
              display: inline-flex; align-items: center; gap: 0.35rem;
              margin-top: 1rem;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.7rem; font-weight: 500; color: var(--color-primary);
              transition: gap 0.22s;
            }
            .rlc5t-card:hover .rlc5t-cta { gap: 0.6rem; }
          `}</style>

          <div className="rlc5t-inner">
            <div className="rlc5t-eyebrow">
              <span className="rlc5t-eyebrow-line" />
              <span className="rlc5t-eyebrow-text">Treks</span>
            </div>
            <h2 className="rlc5t-heading">Treks from {locationPremiumContent.name}</h2>

            {treks.length > 0 ? (
              <>
                <p className="rlc5t-sub">
                  Summit routes and mountain journeys. Choose by difficulty, duration, and season:
                </p>
                <div>
                  {treks.map((trek) => (
                    <Link
                      key={trek.slug}
                      href={`/treks/location/${trek.locationId}/${trek.slug}`}
                      className="rlc5t-card"
                    >
                      <h3 className="rlc5t-card-title">{trek.title}</h3>
                      <p className="rlc5t-card-desc">{trek.description}</p>
                      <div className="rlc5t-meta">
                        {trek.difficulty && <div><span className="rlc5t-meta-label">Difficulty:</span> {trek.difficulty}</div>}
                        {trek.duration && <div><span className="rlc5t-meta-label">Duration:</span> {trek.duration}</div>}
                        {trek.distance && <div><span className="rlc5t-meta-label">Distance:</span> {trek.distance}</div>}
                      </div>
                      {trek.bestSeason && trek.bestSeason.length > 0 && (
                        <div className="rlc5t-season">
                          <span className="rlc5t-season-label">Best season:</span> {trek.bestSeason.join(', ')}
                        </div>
                      )}
                      <div className="rlc5t-cta">View {trek.title} details →</div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <p className="rlc5t-empty">
                Trek routes from {locationPremiumContent.name} are being developed. Contact us to discuss custom trekking experiences in this region.
              </p>
            )}
          </div>
        </section>
      )}

      {/* SECTION 6: PLACES & LANDSCAPES */}
      {locationPremiumContent.placesAndLandscapes.length > 0 && (
        <section style={{
          marginBottom: '0', marginTop: '0',
          paddingTop: '5rem', paddingBottom: '5rem',
          background: '#ffffff',
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <style>{`
            .rlc6-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }

            .rlc6-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
            .rlc6-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; }
            .rlc6-eyebrow-text {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
              color: var(--color-primary); font-weight: 500; opacity: 0.7;
            }

            .rlc6-heading {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
              letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 0.75rem;
            }
            .rlc6-sub {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.88rem; color: #777777; font-weight: 300;
              line-height: 1.7; margin: 0 0 2.5rem;
            }

            /* ── Grid ── */
            .rlc6-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 1px;
              background: #e5e7eb;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              overflow: hidden;
            }

            /* ── Card ── */
            .rlc6-card {
              background: #ffffff;
              padding: 1.75rem 1.75rem 1.75rem 2rem;
              position: relative;
              transition: background 0.25s;
            }
            .rlc6-card:hover { background: #fafaf8; }

            /* Left accent line */
            .rlc6-card::before {
              content: ''; position: absolute;
              left: 0; top: 0; bottom: 0; width: 3px;
              background: var(--color-primary);
              transform: scaleY(0); transform-origin: bottom;
              transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
            }
            .rlc6-card:hover::before { transform: scaleY(1); }

            .rlc6-card-header {
              display: flex; align-items: center;
              gap: 0.65rem; margin-bottom: 0.6rem; flex-wrap: wrap;
            }
            .rlc6-card-name {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 1rem; font-weight: 600; color: #111111;
              margin: 0; letter-spacing: -0.01em; line-height: 1.25;
            }
            .rlc6-card-type {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.65rem; color: #999999; font-weight: 400;
              text-transform: capitalize; letter-spacing: 0.06em;
              background: #f0f0f0; padding: 2px 8px; border-radius: 100px;
            }
            .rlc6-card-season {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.68rem; color: var(--color-primary); font-weight: 500;
              background: rgba(15,118,110,0.08); padding: 2px 8px; border-radius: 100px;
            }
            .rlc6-card-desc {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.88rem; line-height: 1.75; color: #555555;
              margin: 0; font-weight: 300;
            }
          `}</style>

          <div className="rlc6-inner">
            <div className="rlc6-eyebrow">
              <span className="rlc6-eyebrow-line" />
              <span className="rlc6-eyebrow-text">Places & Landscapes</span>
            </div>

            <h2 className="rlc6-heading">Places & Landscapes</h2>

            <p className="rlc6-sub">
              Sights, natural wonders, villages, and spaces that define {locationPremiumContent.name}:
            </p>

            <div className="rlc6-grid">
              {locationPremiumContent.placesAndLandscapes.map((place, idx) => (
                <div key={idx} className="rlc6-card">
                  <div className="rlc6-card-header">
                    <h3 className="rlc6-card-name">{place.name}</h3>
                    <span className="rlc6-card-type">{place.type}</span>
                    {place.season && <span className="rlc6-card-season">{place.season}</span>}
                  </div>
                  <p className="rlc6-card-desc">{place.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7: SOFT EXPERIENCES */}
      {locationPremiumContent.softExperiences.length > 0 && (
        <section style={{
          marginBottom: '0', marginTop: '0',
          paddingTop: '5rem', paddingBottom: '5rem',
          background: '#f7f9f7',
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <style>{`
            .rlc7-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }

            .rlc7-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
            .rlc7-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; }
            .rlc7-eyebrow-text {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
              color: var(--color-primary); font-weight: 500; opacity: 0.7;
            }

            .rlc7-heading {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
              letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 0.75rem;
            }
            .rlc7-sub {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.88rem; color: #777777; font-weight: 300;
              line-height: 1.7; margin: 0 0 2.5rem;
            }

            /* ── Two-column masonry-feel grid ── */
            .rlc7-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
              gap: 1.25rem;
            }

            /* ── Card ── */
            .rlc7-card {
              background: #ffffff;
              border: 1px solid #eef0ee;
              border-left: 3px solid var(--color-primary);
              border-radius: 8px;
              padding: 1.6rem 1.6rem 1.6rem 1.5rem;
              box-shadow: 0 1px 3px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.04);
              transition: transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s, border-left-color 0.3s;
              position: relative;
            }
            .rlc7-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 10px 32px rgba(0,0,0,0.08);
              border-left-color: rgba(15,118,110,0.8);
            }

            /* Subtle top green line on hover */
            .rlc7-card::after {
              content: ''; position: absolute;
              top: 0; left: 0; right: 0; height: 1px;
              background: var(--color-primary); opacity: 0;
              transition: opacity 0.3s;
              border-radius: 8px 8px 0 0;
            }
            .rlc7-card:hover::after { opacity: 0.3; }

            /* Index dot */
            .rlc7-card-dot {
              width: 6px; height: 6px; border-radius: 50%;
              background: var(--color-primary); opacity: 0.25;
              display: inline-block; margin-bottom: 0.85rem;
              transition: opacity 0.25s;
            }
            .rlc7-card:hover .rlc7-card-dot { opacity: 0.6; }

            .rlc7-card-name {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.95rem; font-weight: 600; color: #111111;
              margin: 0 0 0.5rem; letter-spacing: -0.01em; line-height: 1.3;
            }
            .rlc7-card-desc {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.87rem; line-height: 1.8; color: #555555;
              margin: 0; font-weight: 300;
            }
          `}</style>

          <div className="rlc7-inner">
            <div className="rlc7-eyebrow">
              <span className="rlc7-eyebrow-line" />
              <span className="rlc7-eyebrow-text">Soft Experiences</span>
            </div>

            <h2 className="rlc7-heading">Soft Experiences</h2>

            <p className="rlc7-sub">
              Non-product ways to be: quiet walks, seasonal phenomena, cultural moments, simple presence.
            </p>

            <div className="rlc7-grid">
              {locationPremiumContent.softExperiences.map((exp, idx) => (
                <div key={idx} className="rlc7-card">
                  <span className="rlc7-card-dot" />
                  <h3 className="rlc7-card-name">{exp.name}</h3>
                  <p className="rlc7-card-desc">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8: PRACTICAL CONTEXT */}
      <section style={{
        marginBottom: '0', marginTop: '0',
        paddingTop: '5rem', paddingBottom: '5rem',
        background: '#ffffff',
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <style>{`
          .rlc8-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }

          .rlc8-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
          .rlc8-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; }
          .rlc8-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
            color: var(--color-primary); font-weight: 500; opacity: 0.7;
          }

          .rlc8-heading {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
            letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2.5rem;
          }

          /* ── 2x2 grid ── */
          .rlc8-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1px;
            background: #e5e7eb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
          }
          @media (max-width: 600px) { .rlc8-grid { grid-template-columns: 1fr; } }

          /* ── Cell ── */
          .rlc8-cell {
            background: #ffffff;
            padding: 2rem 2rem 2rem 2.25rem;
            position: relative;
            transition: background 0.25s;
          }
          .rlc8-cell:hover { background: #fafaf8; }

          /* Top green line on hover */
          .rlc8-cell::before {
            content: ''; position: absolute;
            top: 0; left: 0; right: 0; height: 2px;
            background: var(--color-primary);
            transform: scaleX(0); transform-origin: left;
            transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          }
          .rlc8-cell:hover::before { transform: scaleX(1); }

          /* Label pill */
          .rlc8-label {
            display: inline-block;
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.56rem; font-weight: 600;
            letter-spacing: 0.2em; text-transform: uppercase;
            color: var(--color-primary);
            background: rgba(15,118,110,0.07);
            padding: 3px 10px; border-radius: 100px;
            margin-bottom: 0.85rem;
          }

          .rlc8-cell-title {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.95rem; font-weight: 600; color: #111111;
            margin: 0 0 0.5rem; letter-spacing: -0.01em; line-height: 1.3;
          }
          .rlc8-cell-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.88rem; line-height: 1.8; color: #555555;
            margin: 0; font-weight: 300;
          }
        `}</style>

        <div className="rlc8-inner">
          <div className="rlc8-eyebrow">
            <span className="rlc8-eyebrow-line" />
            <span className="rlc8-eyebrow-text">Practical Context</span>
          </div>

          <h2 className="rlc8-heading">
            {locationPremiumContent.practicalContext.title}
          </h2>

          <div className="rlc8-grid">

            <div className="rlc8-cell">
              <span className="rlc8-label">Seasons</span>
              <h3 className="rlc8-cell-title">Best Seasons</h3>
              <p className="rlc8-cell-text">{locationPremiumContent.practicalContext.bestSeasons}</p>
            </div>

            <div className="rlc8-cell">
              <span className="rlc8-label">Access</span>
              <h3 className="rlc8-cell-title">Accessibility</h3>
              <p className="rlc8-cell-text">{locationPremiumContent.practicalContext.accessibility}</p>
            </div>

            <div className="rlc8-cell">
              <span className="rlc8-label">Crowd</span>
              <h3 className="rlc8-cell-title">Crowd Profile</h3>
              <p className="rlc8-cell-text">{locationPremiumContent.practicalContext.crowdProfile}</p>
            </div>

            <div className="rlc8-cell">
              <span className="rlc8-label">Not For</span>
              <h3 className="rlc8-cell-title">Not Ideal For</h3>
              <p className="rlc8-cell-text">{locationPremiumContent.practicalContext.notFor}</p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9: SEASONAL & ENVIRONMENTAL CHARACTER */}
      <section style={{
        marginBottom: '0', marginTop: '0',
        paddingTop: '5rem', paddingBottom: '5rem',
        background: '#f7f9f7',
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <style>{`
          .rlc9-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }

          .rlc9-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
          .rlc9-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; }
          .rlc9-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
            color: var(--color-primary); font-weight: 500; opacity: 0.7;
          }

          .rlc9-heading {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
            letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2.5rem;
          }

          /* ── Timeline ── */
          .rlc9-timeline {
            display: flex;
            flex-direction: column;
            gap: 0;
            position: relative;
          }

          /* Vertical connector line */
          .rlc9-timeline::before {
            content: '';
            position: absolute;
            left: 0.65rem;
            top: 0.5rem; bottom: 0.5rem;
            width: 1px;
            background: linear-gradient(to bottom, var(--color-primary), rgba(15,118,110,0.1));
            opacity: 0.25;
          }

          /* ── Season row ── */
          .rlc9-row {
            display: grid;
            grid-template-columns: 1.5rem 1fr;
            gap: 1.25rem;
            padding: 1.5rem 0;
            position: relative;
            border-bottom: 1px solid #f0f0f0;
          }
          .rlc9-row:last-child { border-bottom: none; }

          /* Dot on timeline */
          .rlc9-dot {
            width: 10px; height: 10px;
            border-radius: 50%;
            border: 2px solid var(--color-primary);
            background: #f7f9f7;
            margin-top: 0.3rem;
            flex-shrink: 0;
            transition: background 0.25s;
            position: relative;
            z-index: 1;
          }
          .rlc9-row:hover .rlc9-dot {
            background: var(--color-primary);
          }

          .rlc9-content { padding-bottom: 0.25rem; }

          .rlc9-month-row {
            display: flex; align-items: baseline;
            gap: 0.6rem; flex-wrap: wrap;
            margin-bottom: 0.4rem;
          }
          .rlc9-month {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.95rem; font-weight: 600; color: #111111;
            letter-spacing: -0.01em; line-height: 1.2;
          }
          .rlc9-mood {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.82rem; font-weight: 400; color: #999999;
            font-style: italic;
          }
          .rlc9-desc {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.88rem; line-height: 1.8; color: #555555;
            margin: 0; font-weight: 300;
          }
        `}</style>

        <div className="rlc9-inner">
          <div className="rlc9-eyebrow">
            <span className="rlc9-eyebrow-line" />
            <span className="rlc9-eyebrow-text">Seasonal Character</span>
          </div>

          <h2 className="rlc9-heading">
            {locationPremiumContent.seasonalCharacter.title}
          </h2>

          <div className="rlc9-timeline">
            {locationPremiumContent.seasonalCharacter.seasons.map((season, idx) => (
              <div key={idx} className="rlc9-row">
                <div className="rlc9-dot" />
                <div className="rlc9-content">
                  <div className="rlc9-month-row">
                    <span className="rlc9-month">{season.month}</span>
                    <span className="rlc9-mood">— {season.mood}</span>
                  </div>
                  <p className="rlc9-desc">{season.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: READING FROM THIS LAND */}
      {locationPremiumContent.relatedBlogSlugs.length > 0 && (
        <section style={{
          marginBottom: '0', marginTop: '0',
          paddingTop: '5rem', paddingBottom: '5rem',
          background: '#ffffff',
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <style>{`
            .rlc10-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }

            .rlc10-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
            .rlc10-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; }
            .rlc10-eyebrow-text {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
              color: var(--color-primary); font-weight: 500; opacity: 0.7;
            }

            .rlc10-heading {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
              letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 0.75rem;
            }
            .rlc10-sub {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.88rem; color: #777777; font-weight: 300;
              line-height: 1.7; margin: 0 0 2.5rem;
            }

            /* ── List ── */
            .rlc10-list {
              display: flex; flex-direction: column;
              gap: 1px; background: #e5e7eb;
              border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;
            }

            /* ── Card ── */
            .rlc10-card {
              display: block; text-decoration: none;
              background: #ffffff;
              padding: 1.4rem 1.75rem;
              display: flex; align-items: center; justify-content: space-between;
              gap: 1.5rem;
              transition: background 0.25s;
              position: relative; overflow: hidden;
            }
            .rlc10-card:hover { background: #fafaf8; }

            /* Left green line reveal */
            .rlc10-card::before {
              content: ''; position: absolute;
              left: 0; top: 0; bottom: 0; width: 3px;
              background: var(--color-primary);
              transform: scaleY(0); transform-origin: bottom;
              transition: transform 0.38s cubic-bezier(0.16,1,0.3,1);
            }
            .rlc10-card:hover::before { transform: scaleY(1); }

            .rlc10-card-left { flex: 1; min-width: 0; }

            .rlc10-card-title {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.95rem; font-weight: 600; color: #111111;
              margin: 0 0 0.3rem; letter-spacing: -0.01em; line-height: 1.3;
            }
            .rlc10-card-meta {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.78rem; color: #999999; font-weight: 300;
              margin: 0;
            }

            /* Arrow icon right */
            .rlc10-arrow {
              flex-shrink: 0;
              width: 32px; height: 32px;
              border-radius: 50%;
              border: 1px solid #e5e7eb;
              display: flex; align-items: center; justify-content: center;
              color: var(--color-primary);
              font-size: 0.75rem;
              transition: background 0.25s, border-color 0.25s, transform 0.25s;
            }
            .rlc10-card:hover .rlc10-arrow {
              background: var(--color-primary);
              border-color: var(--color-primary);
              color: #ffffff;
              transform: translateX(3px);
            }
          `}</style>

          <div className="rlc10-inner">
            <div className="rlc10-eyebrow">
              <span className="rlc10-eyebrow-line" />
              <span className="rlc10-eyebrow-text">Reading from This Land</span>
            </div>

            <h2 className="rlc10-heading">Reading from This Land</h2>

            <p className="rlc10-sub">
              Stories, essays, and reflections that deepen understanding of {locationPremiumContent.name}:
            </p>

            <div className="rlc10-list">
              {locationPremiumContent.relatedBlogSlugs.map((slug, idx) => {
                const titles: Record<string, string> = {
                  'chakrata-vs-sankri': 'Chakrata vs Sankri: Two Mountains, Two Medicines',
                  'chakrata-vs-mussoorie-weekend-trip': 'Chakrata vs Mussoorie: Forest vs Romance for Weekend Retreat',
                  'trek-vs-retreat': 'Trek vs Retreat: What Are You Really Seeking?',
                };
                const title = titles[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

                return (
                  <Link key={idx} href={`/blog/${slug}`} className="rlc10-card">
                    <div className="rlc10-card-left">
                      <h3 className="rlc10-card-title">{title}</h3>
                      <p className="rlc10-card-meta">Read in /blog →</p>
                    </div>
                    <div className="rlc10-arrow">→</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
     {/* SECTION 10.5: DISCOVER OTHER LOCATIONS */}
      <section style={{
        marginBottom: '0', marginTop: '0',
        paddingTop: '5rem', paddingBottom: '5rem',
        background: '#f7f9f7',
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <style>{`
          .rlc105-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }

          .rlc105-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
          .rlc105-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; }
          .rlc105-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
            color: var(--color-primary); font-weight: 500; opacity: 0.7;
          }

          .rlc105-heading {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
            letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 0.75rem;
          }
          .rlc105-sub {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.88rem; color: #777777; font-weight: 300;
            line-height: 1.7; margin: 0 0 2.5rem;
          }

          /* ── Grid ── */
          .rlc105-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
          }

          /* ── Card ── */
          .rlc105-card {
            display: block; text-decoration: none;
            background: #ffffff;
            border: 1px solid #eef0ee;
            border-radius: 8px;
            padding: 1.75rem 1.6rem 1.6rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
            transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s, border-color 0.3s;
            position: relative; overflow: hidden;
            display: flex; flex-direction: column;
          }
          .rlc105-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 36px rgba(0,0,0,0.09);
            border-color: rgba(15,118,110,0.3);
          }
          .rlc105-card::before {
            content: ''; position: absolute;
            top: 0; left: 0; right: 0; height: 2px;
            background: var(--color-primary);
            transform: scaleX(0); transform-origin: left;
            transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
            border-radius: 8px 8px 0 0;
          }
          .rlc105-card:hover::before { transform: scaleX(1); }

          .rlc105-card-name {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 1rem; font-weight: 600; color: #111111;
            margin: 0 0 0.6rem; letter-spacing: -0.01em; line-height: 1.25;
          }
          .rlc105-card-opening {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.85rem; line-height: 1.75; color: #666666;
            margin: 0 0 1.1rem; font-weight: 300; flex: 1;
          }
          .rlc105-cta {
            display: inline-flex; align-items: center; gap: 0.35rem;
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.7rem; font-weight: 500;
            color: var(--color-primary);
            transition: gap 0.22s;
          }
          .rlc105-card:hover .rlc105-cta { gap: 0.6rem; }
        `}</style>

        <div className="rlc105-inner">
          <div className="rlc105-eyebrow">
            <span className="rlc105-eyebrow-line" />
            <span className="rlc105-eyebrow-text">Discover Other Locations</span>
          </div>

          <h2 className="rlc105-heading">Discover Other Locations</h2>

          <p className="rlc105-sub">
            Each land holds a different rhythm. If {locationPremiumContent.name} is not your place, another might be.
          </p>

          <div className="rlc105-grid">
            {getAllLocationContent()
              .filter((loc) => loc.id !== locationPremiumContent.id)
              .map((loc) => (
                <Link key={loc.id} href={`/retreats/${loc.id}`} className="rlc105-card">
                  <h3 className="rlc105-card-name">{loc.name}</h3>
                  <p className="rlc105-card-opening">{loc.landTone.opening}</p>
                  <div className="rlc105-cta">Discover {loc.name} →</div>
                </Link>
              ))}
          </div>
        </div>
      </section>

     {/* SECTION 11: NETWORK CONTEXT & CTA */}
      <section style={{
        marginBottom: '0', marginTop: '0',
        position: 'relative',
        background: '#0a160a',
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        overflow: 'hidden',
      }}>
        <style>{`
          /* Glow */
          .rlc11-glow {
            position: absolute;
            top: -100px; left: -80px;
            width: 500px; height: 500px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(15,118,110,0.15) 0%, transparent 70%);
            pointer-events: none;
          }
          .rlc11-glow-r {
            position: absolute;
            bottom: -120px; right: -60px;
            width: 400px; height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(15,118,110,0.1) 0%, transparent 70%);
            pointer-events: none;
          }

          /* Top rule */
          .rlc11-rule {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(15,118,110,0.5) 30%, rgba(15,118,110,0.5) 70%, transparent);
          }

          /* ── Inner layout ── */
          .rlc11-inner {
            max-width: 52rem; margin: 0 auto;
            padding: 6rem 2rem;
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 5rem;
            align-items: center;
            position: relative; z-index: 1;
          }
          @media (max-width: 800px) {
            .rlc11-inner { grid-template-columns: 1fr; gap: 3rem; padding: 4rem 1.5rem; }
          }

          /* ── Left text ── */
          .rlc11-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
          .rlc11-eyebrow-line { width: 24px; height: 1px; background: rgba(15,118,110,0.6); }
          .rlc11-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
            color: var(--color-primary); font-weight: 500; opacity: 0.8;
          }

          .rlc11-network {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.95rem; line-height: 1.9; color: rgba(220,235,215,0.6);
            font-weight: 300; margin: 0 0 1.5rem;
          }
          .rlc11-ctatext {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 1rem; line-height: 1.85;
            color: rgba(220,235,215,0.85);
            font-weight: 300; margin: 0;
          }

          /* ── Right card ── */
          .rlc11-card {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 14px;
            padding: 2.5rem;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            position: relative; overflow: hidden;
          }
          .rlc11-card::before {
            content: '';
            position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
            background: linear-gradient(90deg, transparent, rgba(15,118,110,0.6), transparent);
          }

          .rlc11-card-title {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 1rem; font-weight: 500; color: #e8f0e0;
            margin: 0 0 0.4rem; letter-spacing: -0.01em;
          }
          .rlc11-card-sub {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.82rem; color: rgba(200,215,200,0.45);
            font-weight: 300; line-height: 1.7; margin: 0 0 2rem;
          }

          /* Buttons */
          .rlc11-btn-primary {
            display: flex; align-items: center; justify-content: center;
            width: 100%; padding: 14px 28px;
            background: var(--color-primary); color: #ffffff;
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.62rem; font-weight: 600;
            letter-spacing: 0.2em; text-transform: uppercase;
            border: none; border-radius: 8px;
            cursor: pointer; text-decoration: none;
            transition: background 0.2s, transform 0.18s, box-shadow 0.25s;
            margin-bottom: 0.85rem;
            position: relative; overflow: hidden;
          }
          .rlc11-btn-primary::after {
            content: '';
            position: absolute; inset: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
            pointer-events: none;
          }
          .rlc11-btn-primary:hover {
            background: #0d9e95;
            transform: translateY(-2px);
            box-shadow: 0 12px 36px rgba(15,118,110,0.35);
          }

          .rlc11-btn-ghost {
            display: flex; align-items: center; justify-content: center;
            width: 100%; padding: 13px 28px;
            background: transparent; color: rgba(200,220,200,0.6);
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.62rem; font-weight: 400;
            letter-spacing: 0.2em; text-transform: uppercase;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px; cursor: pointer; text-decoration: none;
            transition: border-color 0.2s, color 0.2s, transform 0.18s;
          }
          .rlc11-btn-ghost:hover {
            border-color: rgba(15,118,110,0.5);
            color: var(--color-primary);
            transform: translateY(-2px);
          }
        `}</style>

        <div className="rlc11-glow" />
        <div className="rlc11-glow-r" />
        <div className="rlc11-rule" />

        <div className="rlc11-inner">

          {/* Left */}
          <div>
            <div className="rlc11-eyebrow">
              <span className="rlc11-eyebrow-line" />
              <span className="rlc11-eyebrow-text">Begin Your Journey</span>
            </div>
            <p className="rlc11-network">{locationPremiumContent.networkContext}</p>
            <p className="rlc11-ctatext">{locationPremiumContent.ctaText}</p>
          </div>

          {/* Right card */}
          <div className="rlc11-card">
            <h3 className="rlc11-card-title">Start with a conversation</h3>
            <p className="rlc11-card-sub">
              No forms, no checkout. Tell us what you&apos;re looking for — we&apos;ll take it from there.
            </p>

            <Link
              href={whatsappLink}
              onClick={() => logWhatsAppOpen(locationId, 'location-hub')}
              className="rlc11-btn-primary"
            >
              WhatsApp Us
            </Link>

            <Link href="/retreats" className="rlc11-btn-ghost">
              All Retreats
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
