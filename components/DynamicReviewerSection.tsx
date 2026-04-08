'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { RETREAT_REVIEWS } from '@/content/reviews';

const RetreatFinder = dynamic(() => import('@/components/RetreatFinder'), {
  ssr: false,
  loading: () => null,
});

const ReviewCard = dynamic(() => import('@/components/reviews/ReviewCard'), {
  ssr: false,
  loading: () => null,
});

interface DynamicReviewerSectionProps {
  finderRatings: Record<string, { value: number; count: number }>;
}

export default function DynamicReviewerSection({
  finderRatings,
}: DynamicReviewerSectionProps) {
  const topReviews = [...RETREAT_REVIEWS]
    .filter((r) => r.ratingValue >= 5)
    .sort(
      (a, b) =>
        new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
    )
    .slice(0, 4);

  return (
    <>
      <section
        className="rf-wrap"
        style={{
          maxWidth: '56rem',
          margin: '0 auto',
          padding: '0 var(--space-md) var(--space-xl)',
        }}
      >
        <style>{`
        .rf-wrap {
          position: relative;
        }

        .rf-h2 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #111111;
          line-height: 1.15;
          margin: 0 0 0.75rem 0;
          padding-top: 6rem;
        }
        .rf-h2-accent {
          color: var(--color-primary);
          font-weight: 200;
        }

        .rf-sub {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem;
          font-weight: 300;
          line-height: 1.8;
          color: #555555;
          margin: 0 0 var(--space-md) 0;
        }
      `}</style>

        <h2 className="rf-h2">
          Not sure which <span className="rf-h2-accent">retreat</span> is right for you?
        </h2>

        <p className="rf-sub">Five questions. Two matches. No login required.</p>

        <RetreatFinder fromPath="/" ratings={finderRatings} />
      </section>

      {topReviews.length > 0 && (
        <>
          <style>{`
  .home-reviews {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #ffffff;
    padding: 5rem 0;
    border-top: 1px solid #e5e7eb;
  }
  .home-reviews-inner {
    max-width: 56rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
  .home-reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 24rem), 1fr));
    gap: var(--space-md, 1.25rem);
    margin-top: 1.5rem;
  }
`}</style>
          <section className="home-reviews">
            <div className="home-reviews-inner">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: 1,
                    background: 'rgba(15, 118, 110, 0.5)',
                    flexShrink: 0,
                    display: 'inline-block',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'rgba(15, 118, 110, 0.7)',
                  }}
                >
                  Participant Experiences
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                  fontWeight: 200,
                  letterSpacing: '-0.03em',
                  color: '#111111',
                  lineHeight: 1.15,
                  marginBottom: '0.5rem',
                }}
              >
                What Our Participants Say
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.88rem',
                  fontWeight: 300,
                  lineHeight: 1.85,
                  color: '#555555',
                  margin: 0,
                }}
              >
                Real stories from people who attended our Himalayan retreats.
              </p>
              <div className="home-reviews-grid">
                {topReviews.map((review) => (
                  <ReviewCard
                    key={`${review.participantName}-${review.datePublished}`}
                    review={review}
                  />
                ))}
              </div>
              <p style={{ marginTop: '1.5rem', fontSize: '0.88rem', fontWeight: 300 }}>
                <Link href="/reviews" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
                  Read all reviews →
                </Link>
              </p>
            </div>
          </section>
        </>
      )}
    </>
  );
}
