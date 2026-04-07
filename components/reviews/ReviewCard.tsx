/**
 * ReviewCard — Atomic component for displaying a single review
 * Used in: ExperienceHubPage, /reviews page, individual retreat pages
 *
 * Accepts a RetreatReview and renders with participant name, rating, and review text.
 * Styled consistently with existing inline styles.
 */

import type { RetreatReview } from '@/content/reviews';

interface ReviewCardProps {
  review: RetreatReview;
  style?: React.CSSProperties;
}

export default function ReviewCard({ review, style }: ReviewCardProps) {
  const defaultStyle: React.CSSProperties = {
    margin: 0,
    padding: '1rem 1.25rem',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.9rem',
    lineHeight: 1.7,
    ...style,
  };

  return (
    <blockquote style={defaultStyle}>
      <p style={{ margin: 0 }}>&ldquo;{review.reviewBody}&rdquo;</p>
      <footer
        style={{
          marginTop: '0.5rem',
          fontSize: '0.8rem',
          color: 'var(--color-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        {review.participantImage && (
          <img
            src={review.participantImage}
            alt={review.participantName}
            width={36}
            height={36}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
        )}
        <span>— {review.participantName}, {'★'.repeat(review.ratingValue)}</span>
      </footer>
    </blockquote>
  );
}
