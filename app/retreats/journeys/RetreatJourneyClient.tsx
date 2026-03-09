'use client';

import Link from 'next/link';
import type { LocationId } from '@/config/locations';

interface Location {
  id: LocationId;
  name: string;
  tagline: string;
}

interface RetreatService {
  readonly title: string;
  readonly oneLineEssence: string;
  readonly description: string;
  readonly forNotFor: {
    readonly for: readonly string[];
    readonly notFor: readonly string[];
  };
  readonly howItWorks: {
    readonly rhythm: string;
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
}

export default function RetreatJourneyClient({ retreat, locations, suggestedTrek }: RetreatJourneyClientProps) {
  return (
    <>
      {/* HEADER */}
      <section style={{
        marginBottom: '0', marginTop: '0',
        paddingTop: '5rem', paddingBottom: '5rem',
        background: '#f7f9f7',
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <style>{`
          .rj-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }

          .rj-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
          .rj-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; flex-shrink: 0; }
          .rj-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
            color: var(--color-primary); font-weight: 500; opacity: 0.7;
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
        `}</style>

        <div className="rj-inner">
          <div className="rj-eyebrow">
            <span className="rj-eyebrow-line" />
            <span className="rj-eyebrow-text">Retreat Journey</span>
          </div>
          <h1 className="rj-title">{retreat.title}</h1>
          <p className="rj-essence">{retreat.oneLineEssence}</p>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section style={{
        marginBottom: '0', marginTop: '0',
        paddingTop: '5rem', paddingBottom: '5rem',
        background: '#ffffff',
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <style>{`
          .rj-desc-inner { max-width: 52rem; margin: 0 auto; padding: 0 2rem; }

          .rj-desc-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem; }
          .rj-desc-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; }
          .rj-desc-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
            color: var(--color-primary); font-weight: 500; opacity: 0.7;
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

        <div className="rj-desc-inner">
          <div className="rj-desc-eyebrow">
            <span className="rj-desc-eyebrow-line" />
            <span className="rj-desc-eyebrow-text">About This Retreat</span>
          </div>
          <p className="rj-desc-body">{retreat.description}</p>
        </div>
      </section>
      

      {/* FOR / NOT FOR */}
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
          .rj-fn-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; }
          .rj-fn-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
            color: var(--color-primary); font-weight: 500; opacity: 0.7;
          }

          .rj-fn-heading {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
            letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2.5rem;
          }
          .rj-fn-heading span { color: var(--color-primary); }

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
            color: #111111; opacity: 0.5;
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
          .rj-fn-item-not { color: #888888; }

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
            font-size: 0.75rem; color: #aaaaaa; font-weight: 400;
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

          <div className="rj-fn-wrap">

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

      {/* HOW IT WORKS */}
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
          .rj-hiw-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; }
          .rj-hiw-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
            color: var(--color-primary); font-weight: 500; opacity: 0.7;
          }

          .rj-hiw-heading {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
            letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2.5rem;
          }
          .rj-hiw-heading span { color: var(--color-primary); }

          /* ── Timeline ── */
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
            color: var(--color-primary); opacity: 0.75; margin: 0 0 0.4rem;
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

          <div className="rj-hiw-timeline">
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
          .rj-wib-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; }
          .rj-wib-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
            color: var(--color-primary); font-weight: 500; opacity: 0.7;
          }

          .rj-wib-heading {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
            letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2.5rem;
          }
          .rj-wib-heading span { color: var(--color-primary); }

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
            color: var(--color-primary); opacity: 0.7;
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
            color: #aaaaaa;
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
            font-size: 0.78rem; color: #888888;
            font-weight: 300; margin: 0; line-height: 1.5;
          }
          .rj-wib-card-arrow {
            font-size: 0.75rem; color: var(--color-primary);
            opacity: 0.3; flex-shrink: 0;
            transition: opacity 0.2s, transform 0.2s;
          }
          .rj-wib-card:hover .rj-wib-card-arrow {
            opacity: 0.9; transform: translateX(3px);
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
              <div className="rj-wib-grid">
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

      {/* ADAPTABILITY */}
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
          .rj-ada-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; }
          .rj-ada-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
            color: var(--color-primary); font-weight: 500; opacity: 0.7;
          }

          .rj-ada-heading {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
            letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2rem;
          }
          .rj-ada-heading span { color: var(--color-primary); }

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
            .rj-rt-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; }
            .rj-rt-eyebrow-text {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
              color: var(--color-primary); font-weight: 500; opacity: 0.7;
            }

            .rj-rt-heading {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: clamp(1.4rem, 2.5vw, 1.85rem); font-weight: 200;
              letter-spacing: -0.03em; color: #111111; line-height: 1.15; margin: 0 0 2rem;
            }
            .rj-rt-heading span { color: var(--color-primary); }

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
              font-size: 0.55rem; font-weight: 600;
              letter-spacing: 0.22em; text-transform: uppercase;
              color: var(--color-primary); opacity: 0.65; margin: 0 0 0.35rem;
            }
            .rj-rt-card-title {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.95rem; font-weight: 500;
              color: #111111; margin: 0 0 0.25rem; letter-spacing: -0.01em;
            }
            .rj-rt-card-sub {
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.8rem; color: #888888;
              font-weight: 300; margin: 0;
            }

            .rj-rt-btn {
              display: inline-flex; align-items: center; gap: 0.45rem;
              font-family: var(--font-geist-sans), sans-serif;
              font-size: 0.62rem; font-weight: 600;
              letter-spacing: 0.18em; text-transform: uppercase;
              color: var(--color-primary);
              border: 1px solid rgba(15,118,110,0.35);
              padding: 10px 18px; border-radius: 4px;
              text-decoration: none; white-space: nowrap; flex-shrink: 0;
              transition: background 0.2s, color 0.2s, border-color 0.2s;
            }
            .rj-rt-btn:hover {
              background: var(--color-primary);
              color: #ffffff;
              border-color: var(--color-primary);
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
          .rj-cta-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.45; }
          .rj-cta-eyebrow-text {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
            color: var(--color-primary); font-weight: 500; opacity: 0.7;
          }

          .rj-cta-heading {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 200;
            letter-spacing: -0.035em; color: #111111;
            line-height: 1.1; margin: 0 0 1.25rem;
          }
          .rj-cta-heading span { color: var(--color-primary); }

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
            color: #888888;
            transition: border-color 0.2s, color 0.2s, transform 0.18s;
          }
          .rj-back-link:hover {
            border-color: var(--color-primary);
            color: var(--color-primary);
            transform: translateY(-2px);
          }

          .rj-cta-trust {
            display: flex; align-items: center; justify-content: center;
            gap: 1rem; flex-wrap: wrap; margin-top: 1.5rem;
          }
          .rj-cta-trust-item {
            font-family: var(--font-geist-sans), sans-serif;
            font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase;
            color: #aaaaaa; font-weight: 400;
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
              Talk on WhatsApp
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
  );
}
