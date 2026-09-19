'use client';

import Link from 'next/link';
import { getUpcomingEvents } from '@/config/retreatProgramEvents';

interface ArtFixedDeparturesProps {
  mode?: 'all' | 'single';
  retreatSlug?: string;
}

const WHATSAPP_NUMBER = '919760446101';

const ART_RETREAT_SLUGS = [
  'art-and-creative',
  'trek-and-paint',
  'weekend-art-retreat',
];

export default function ArtFixedDepartures({
  mode = 'all',
  retreatSlug,
}: ArtFixedDeparturesProps) {
  const departures = getUpcomingEvents().filter((departure) => {
    const isArtRetreat = ART_RETREAT_SLUGS.includes(departure.serviceSlug);

    if (mode === 'single') {
      return departure.serviceSlug === retreatSlug;
    }

    return isArtRetreat;
  });

  if (!departures.length) return null;

  return (
    <section
      style={{
        width: '100%',
        maxWidth: '100%',
        overflowX: 'clip',
        background: '#ffffff',
        padding: '4rem 0',
        borderTop: '1px solid #eef0ee',
        borderBottom: '1px solid #eef0ee',
      }}
    >
      <style>{`
        .art-fixed-inner {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .art-fixed-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
          margin-top: 2.5rem;
          min-width: 0;
        }

        .art-fixed-grid-single {
          grid-template-columns: minmax(0, 34rem);
          justify-content: center;
        }

        .art-fixed-card {
          background: #f7f9f7;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 16px;
          padding: 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 14px 42px rgba(15,31,28,0.05);
          min-width: 0;
          box-sizing: border-box;
        }

        .art-fixed-date {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(1.15rem, 2vw, 1.45rem);
          font-weight: 450;
          color: #111827;
          letter-spacing: -0.03em;
          margin: 0;
        }

        .art-fixed-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .art-fixed-chip {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.62rem;
          font-weight: 650;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #374151;
          border: 1px solid rgba(15,118,110,0.16);
          background: #ffffff;
          border-radius: 999px;
          padding: 0.35rem 0.65rem;
        }

        .art-fixed-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: #0f766e;
          color: #ffffff;
          padding: 0.85rem 1rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          margin-top: auto;
        }

        @media (max-width: 860px) {
          .art-fixed-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .art-fixed-inner {
            padding: 0 1.25rem;
          }

          .art-fixed-card {
            padding: 1.15rem;
          }

          .art-fixed-cta {
            width: 100%;
            box-sizing: border-box;
          }
        }
      `}</style>

      <div className="art-fixed-inner">
        <div
          style={{
            textAlign: 'center',
            maxWidth: '44rem',
            margin: '0 auto',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#374151',
              margin: '0 0 0.8rem',
            }}
          >
            Upcoming Fixed Dates
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: 'clamp(1.55rem, 3vw, 2.25rem)',
              lineHeight: 1.1,
              fontWeight: 250,
              letterSpacing: '-0.04em',
              color: '#111827',
              margin: '0 0 1rem',
            }}
          >
            {mode === 'single'
              ? 'Book your upcoming '
              : 'Choose an upcoming '}
            <span style={{ color: '#374151' }}>
              {mode === 'single' ? 'retreat date' : 'art retreat'}
            </span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              color: '#5f6865',
              fontWeight: 300,
              margin: 0,
            }}
          >
            Choose a scheduled departure and reserve your place. We will
            confirm availability, stay details, inclusions, and the next
            booking step on WhatsApp.
          </p>
        </div>

        <div
          className={`art-fixed-grid${
            mode === 'single' ? ' art-fixed-grid-single' : ''
          }`}
        >
          {departures.map((departure) => {
            const locationLabel =
              departure.locationName !== 'TBA'
                ? departure.locationName
                : departure.locationId.charAt(0).toUpperCase() +
                  departure.locationId.slice(1);

            const whatsappText =
              `Hi, I want to book ${departure.label} for ` +
              `${departure.dateRange} in ${locationLabel}. ` +
              `Please share availability and booking details.`;

            const whatsappHref =
              `https://wa.me/${WHATSAPP_NUMBER}?text=` +
              encodeURIComponent(whatsappText);

            return (
              <article
                key={departure.slug}
                className="art-fixed-card"
              >
                <div>
                  <p
                    style={{
                      fontFamily:
                        'var(--font-geist-sans), sans-serif',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#0f766e',
                      margin: '0 0 0.55rem',
                    }}
                  >
                    {departure.label}
                  </p>

                  <h3
                    style={{
                      fontFamily:
                        'var(--font-geist-sans), sans-serif',
                      fontSize: '1.05rem',
                      fontWeight: 650,
                      color: '#111827',
                      margin: '0 0 0.45rem',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {departure.h1}
                  </h3>

                  <p className="art-fixed-date">
                    {departure.dateRange}
                  </p>
                </div>

                <div className="art-fixed-meta">
                  <span className="art-fixed-chip">
                    {departure.durationDays} days
                  </span>

                  <span className="art-fixed-chip">
                    {locationLabel}
                  </span>

                  <span className="art-fixed-chip">
                    ₹{departure.price.toLocaleString('en-IN')}
                  </span>

                  <span className="art-fixed-chip">
                    {departure.seatsLeft} seats left
                  </span>
                </div>

                {mode === 'all' && (
                  <Link
                    href={`/retreats/journeys/${departure.slug}`}
                    style={{
                      fontFamily:
                        'var(--font-geist-sans), sans-serif',
                      fontSize: '0.78rem',
                      color: '#4b5563',
                      textDecoration: 'none',
                    }}
                  >
                    View retreat details →
                  </Link>
                )}

                <a
                  href={whatsappHref}
                  className="art-fixed-cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book This Date →
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
