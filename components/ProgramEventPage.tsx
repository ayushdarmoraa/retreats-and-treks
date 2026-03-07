/**
 * ProgramEventPage — shared server component for scheduled retreat event pages
 * These are the pages that convert: specific date, location, price, seats.
 */

import Link from 'next/link';
import type { RetreatProgramEvent } from '@/config/retreatProgramEvents';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema, generateReviewSchemas, generateAggregateRatingSchema } from '@/components/seo/Schema';
import { getReviewsForSlug, getAggregateRating } from '@/content/reviews';
import { validateFAQSync } from '@/utils/validateFAQSync';
import Breadcrumb from '@/components/Breadcrumb';
import MicroCommitment from '@/components/MicroCommitment';
import PrimaryCTA from '@/components/PrimaryCTA';
import RatingBadge from '@/components/RatingBadge';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';
import { getFacilitatorsByRetreat } from '@/config/facilitators';

interface Props {
  event: RetreatProgramEvent;
}

const statusLabels: Record<string, { text: string; color: string }> = {
  open: { text: 'Open — Seats Available', color: '#2d6a4f' },
  'filling-fast': { text: 'Filling Fast', color: '#e67700' },
  'last-few': { text: 'Last Few Seats', color: '#c92a2a' },
  'sold-out': { text: 'Sold Out', color: '#868e96' },
};

export default function ProgramEventPage({ event }: Props) {
  validateFAQSync(event.faqItems as { question: string; answer: string }[], `/${event.slug}`);

  // Reviews for the parent service type (e.g. 'meditation-and-silence')
  const reviews = getReviewsForSlug(event.serviceSlug);
  const aggregateRating = getAggregateRating(event.serviceSlug);
  const reviewSchemas = reviews.length > 0
    ? generateReviewSchemas(reviews, event.title, buildCanonicalUrl(`/${event.slug}`))
    : [];
  const aggregateRatingSchema = aggregateRating
    ? generateAggregateRatingSchema(aggregateRating.ratingValue, aggregateRating.reviewCount, event.title, buildCanonicalUrl(`/${event.slug}`))
    : null;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: `${event.label}s`, url: buildCanonicalUrl(`/${event.parentExperienceSlug}`) },
    { name: `in ${event.locationName}`, url: buildCanonicalUrl(`/${event.parentLocationSlug}`) },
    { name: `${event.month} ${event.year}`, url: buildCanonicalUrl(`/${event.slug}`) },
  ]);
  const faqSchema = generateFAQSchema(event.faqItems as { question: string; answer: string }[]);

  const statusInfo = statusLabels[event.status] ?? statusLabels.open;

  // Event schema for Google
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.h1,
    description: event.metaDescription,
    startDate: event.startDate,
    endDate: event.endDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: event.status === 'sold-out'
      ? 'https://schema.org/EventCancelled'
      : 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.locationName,
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    },
    offers: {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: event.currency,
      availability: event.status === 'sold-out'
        ? 'https://schema.org/SoldOut'
        : 'https://schema.org/InStock',
      url: buildCanonicalUrl(`/${event.slug}`),
    },
    organizer: {
      '@type': 'Organization',
      name: 'Retreats And Treks',
      url: buildCanonicalUrl('/'),
    },
  };

  return (
    <TrackedPage page={`/${event.slug}`} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, eventSchema, ...reviewSchemas, ...(aggregateRatingSchema ? [aggregateRatingSchema] : [])]) }}
      />
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: `${event.label}s`, href: `/${event.parentExperienceSlug}` },
          { name: `in ${event.locationName}`, href: `/${event.parentLocationSlug}` },
          { name: `${event.month} ${event.year}` },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <header style={{ marginBottom: 'var(--space-xl)' }}>
        {(event.status === 'last-few' || event.status === 'filling-fast') && (
          <div
            style={{
              background: event.status === 'last-few' ? '#fff5f5' : '#fff8e1',
              border: `1px solid ${event.status === 'last-few' ? '#ffcdd2' : '#ffe082'}`,
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 1rem',
              marginBottom: '1rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: event.status === 'last-few' ? '#c92a2a' : '#e67700',
            }}
          >
            {event.status === 'last-few'
              ? `Only ${event.seatsLeft} seat${event.seatsLeft === 1 ? '' : 's'} remaining — this retreat is almost full.`
              : `${event.seatsLeft} of ${event.groupSize} seats left — filling fast.`}
          </div>
        )}
        <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
          {event.h1}
        </h1>

        {/* Key facts strip */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1rem',
          fontSize: '0.9rem',
          lineHeight: 1.6,
        }}>
          <span><strong>{event.dateRange}</strong></span>
          <span>{event.durationDays} days</span>
          <span>{event.locationName}</span>
          <span style={{ fontWeight: 600, color: statusInfo.color }}>{statusInfo.text}</span>
          {event.groupSize - event.seatsLeft > 0 && (
            <span style={{ fontWeight: 600, color: '#2d6a4f' }}>
              {event.groupSize - event.seatsLeft} {event.groupSize - event.seatsLeft === 1 ? 'person' : 'people'} registered
            </span>
          )}
          {aggregateRating && (
            <RatingBadge rating={{ value: aggregateRating.ratingValue, count: aggregateRating.reviewCount }} variant="compact" />
          )}
        </div>

        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
          {event.intro}
        </p>
      </header>

      {/* ── Pricing & Availability ──────────────────────────────── */}
      <section
        style={{
          border: '2px solid var(--color-primary, #2d6a4f)',
          borderRadius: 'var(--radius-sm)',
          padding: '1.5rem',
          marginBottom: 'var(--space-xl)',
          background: 'var(--color-primary-light, #e8f5e9)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
          <div>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
              ₹{event.price.toLocaleString('en-IN')}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
              {event.priceNote}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>
              <strong>{event.seatsLeft}</strong> of {event.groupSize} seats remaining
            </p>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: statusInfo.color, margin: 0 }}>
              {statusInfo.text}
            </p>
          </div>
        </div>
      </section>

      {/* ── Booking Assurance ───────────────────────────────────── */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem',
          marginBottom: 'var(--space-xl)',
          fontSize: '0.85rem',
          lineHeight: 1.6,
        }}
      >
        <div style={{ padding: '0.75rem 1rem', background: '#f8f9fa', borderRadius: 'var(--radius-sm, 8px)' }}>
          <strong>Free cancellation</strong><br />
          Full refund up to 30 days before the retreat start date.
        </div>
        <div style={{ padding: '0.75rem 1rem', background: '#f8f9fa', borderRadius: 'var(--radius-sm, 8px)' }}>
          <strong>Flexible rescheduling</strong><br />
          Transfer to a future date at no extra charge up to 15 days before departure.
        </div>
        <div style={{ padding: '0.75rem 1rem', background: '#f8f9fa', borderRadius: 'var(--radius-sm, 8px)' }}>
          <strong>Small group</strong><br />
          Maximum {event.groupSize} participants. Personal attention, not a crowd.
        </div>
      </section>

      <MicroCommitment
        itemKey={event.slug}
        title={event.h1}
        sourcePath={`/${event.slug}`}
        showWaitlist={event.status === 'sold-out' || event.status === 'last-few'}
      />

      <PrimaryCTA
        label={event.status === 'sold-out' ? 'Join Waitlist' : `Reserve My Seat — ${event.month} ${event.year}`}
        subtext={`${event.label} in ${event.locationName}. ${event.dateRange}. ${event.durationDays} days.`}
        vertical="retreat"
        category="program-event"
        sourcePath={`/${event.slug}`}
      />

      {/* ── Your Facilitators ──────────────────────────────────── */}
      {(() => {
        const facilitators = getFacilitatorsByRetreat(event.serviceSlug);
        if (facilitators.length === 0) return null;
        return (
          <section style={{ marginBottom: 'var(--space-xl)' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              {facilitators.length === 1 ? 'Your Facilitator' : 'Your Facilitators'}
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {facilitators.map((f) => (
                <div
                  key={f.slug}
                  style={{
                    border: '1px solid var(--color-border, #e0e0e0)',
                    borderRadius: 'var(--radius-sm, 8px)',
                    padding: '1rem 1.25rem',
                  }}
                >
                  <Link href={`/facilitators/${f.slug}`} style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '1rem' }}>
                    {f.name}
                  </Link>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0.5rem' }}>
                    {f.title} · {f.yearsExperience} years experience
                  </p>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                    {f.approach.slice(0, 200)}{f.approach.length > 200 ? '…' : ''}
                    {' '}
                    <Link href={`/facilitators/${f.slug}`} style={{ color: 'var(--color-primary)', fontSize: '0.85rem' }}>Read full profile →</Link>
                  </p>
                </div>
              ))}
            </div>
          </section>
        );
      })()}

      {/* ── Quick Itinerary ─────────────────────────────────────── */}
      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          Schedule Overview
        </h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
          {event.quickItinerary.map((item) => (
            <li key={item} style={{ fontSize: '0.95rem' }}>{item}</li>
          ))}
        </ul>
        <p style={{ fontSize: '0.9rem', marginTop: '0.75rem' }}>
          <Link
            href={`/${event.itinerarySlug}`}
            style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              border: '1px solid var(--color-primary, #2d6a4f)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-primary)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            View full {event.durationDays}-day itinerary →
          </Link>
        </p>
      </section>

      {/* ── What's Included ─────────────────────────────────────── */}
      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          What&#39;s Included
        </h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
          {event.included.map((item) => (
            <li key={item} style={{ fontSize: '0.95rem' }}>{item}</li>
          ))}
        </ul>
      </section>

      {/* ── What to Bring ───────────────────────────────────────── */}
      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          What to Bring
        </h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
          {event.toBring.map((item) => (
            <li key={item} style={{ fontSize: '0.95rem' }}>{item}</li>
          ))}
        </ul>
      </section>

      {/* ── Participant Reviews ──────────────────────────────────── */}
      {reviews.length > 0 && (
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            What Participants Say
          </h2>
          {aggregateRating && (
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
              Rated {aggregateRating.ratingValue}/5 by {aggregateRating.reviewCount} participants across all {event.label.toLowerCase()} retreats.
            </p>
          )}
          <div style={{ display: 'grid', gap: '1rem' }}>
            {reviews.slice(0, 3).map((review) => (
              <blockquote
                key={`${review.participantName}-${review.datePublished}`}
                style={{
                  margin: 0,
                  padding: '1rem 1.25rem',
                  border: '1px solid var(--color-border, #e0e0e0)',
                  borderRadius: 'var(--radius-sm, 8px)',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                }}
              >
                <p style={{ margin: 0 }}>&ldquo;{review.reviewBody}&rdquo;</p>
                <footer style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                  — {review.participantName}, {'★'.repeat(review.ratingValue)}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      <PrimaryCTA
        label={event.status === 'sold-out' ? 'Join Waitlist' : 'Inquire About This Retreat'}
        subtext={`${event.seatsLeft} seats remaining. ${event.dateRange}, ${event.locationName}.`}
        vertical="retreat"
        category="program-event"
        sourcePath={`/${event.slug}`}
      />

      <TrackedFAQ items={event.faqItems as { question: string; answer: string }[]} page={`/${event.slug}`} />

      {/* ── Cross-Links ─────────────────────────────────────────── */}
      <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
        <Link href={`/${event.parentLocationSlug}`} style={{ color: 'var(--color-primary)' }}>
          {event.label} in {event.locationName}
        </Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href={`/${event.parentExperienceSlug}`} style={{ color: 'var(--color-primary)' }}>
          {event.label}s
        </Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href={`/locations/${event.locationId}`} style={{ color: 'var(--color-primary)' }}>
          {event.locationName} Guide
        </Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href="/retreat-calendar" style={{ color: 'var(--color-primary)' }}>
          All Upcoming Retreats
        </Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href="/find-your-retreat" style={{ color: 'var(--color-primary)' }}>
          Find Your Retreat
        </Link>
      </p>
    </TrackedPage>
  );
}
