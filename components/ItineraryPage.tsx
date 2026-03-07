/**
 * ItineraryPage — shared server component for day-by-day retreat itinerary pages
 * Renders: breadcrumb → hero → day cards → CTA → FAQ → cross-links
 */

import Link from 'next/link';
import type { ItineraryPage as PageConfig } from '@/config/itineraryPages';
import { getEventsByExperience } from '@/config/retreatProgramEvents';
import { getReviewsForSlug } from '@/content/reviews';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/Schema';
import { validateFAQSync } from '@/utils/validateFAQSync';
import Breadcrumb from '@/components/Breadcrumb';
import MicroCommitment from '@/components/MicroCommitment';
import PrimaryCTA from '@/components/PrimaryCTA';
import TrackedFAQ from '@/components/TrackedFAQ';
import TrackedPage from '@/components/TrackedPage';

interface Props {
  page: PageConfig;
}

export default function ItineraryPage({ page }: Props) {
  validateFAQSync(page.faqItems as { question: string; answer: string }[], `/${page.slug}`);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: `${page.label}s`, url: buildCanonicalUrl(`/${page.parentHubSlug}`) },
    { name: `${page.label} in ${page.locationName}`, url: buildCanonicalUrl(`/${page.parentSlug}`) },
    { name: `${page.durationDays}-Day Itinerary`, url: buildCanonicalUrl(`/${page.slug}`) },
  ]);
  const faqSchema = generateFAQSchema(page.faqItems as { question: string; answer: string }[]);

  return (
    <TrackedPage page={`/${page.slug}`} style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }}
      />
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: `${page.label}s`, href: `/${page.parentHubSlug}` },
          { name: `in ${page.locationName}`, href: `/${page.parentSlug}` },
          { name: `${page.durationDays}-Day Itinerary` },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <header style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>
          {page.h1}
        </h1>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
          {page.intro}
        </p>
      </header>

      {/* ── Day-by-Day Cards ────────────────────────────────────── */}
      <section style={{ marginBottom: 'var(--space-xl)' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1rem' }}>
          Day-by-Day Schedule
        </h2>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {page.days.map((day) => (
            <div
              key={day.day}
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem',
              }}
            >
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Day {day.day}: {day.theme}
              </h3>
              <p style={{ lineHeight: 1.75, margin: '0 0 0.75rem 0', fontSize: '0.95rem' }}>
                {day.description}
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', lineHeight: 1.6 }}>
                <tbody>
                  {day.schedule.map((row) => {
                    const sepIndex = row.indexOf(' — ');
                    const time = sepIndex > -1 ? row.substring(0, sepIndex) : '';
                    const activity = sepIndex > -1 ? row.substring(sepIndex + 3) : row;
                    return (
                      <tr key={row} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '0.4rem 0.5rem', whiteSpace: 'nowrap', fontWeight: 500, width: '100px', verticalAlign: 'top' }}>
                          {time}
                        </td>
                        <td style={{ padding: '0.4rem 0.5rem' }}>{activity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      <MicroCommitment
        itemKey={page.slug}
        title={page.h1}
        sourcePath={`/${page.slug}`}
        showDownload
      />

      <PrimaryCTA
        label={`Book This ${page.durationDays}-Day Retreat`}
        subtext={`${page.label} in ${page.locationName}. ${page.durationDays} days, day-by-day structure as outlined above.`}
        vertical="retreat"
        category="itinerary"
        sourcePath={`/${page.slug}`}
      />

      {/* ── Participant Testimonials ────────────────────────────── */}
      {(() => {
        const serviceSlugMap: Record<string, string> = {
          'meditation-retreats': 'meditation-and-silence',
          'silent-retreats': 'meditation-and-silence',
          'yoga-retreats': 'yoga-and-movement',
          'burnout-recovery-retreats': 'burnout-recovery',
          'spiritual-retreats': 'meditation-and-silence',
          'stress-relief-retreats': 'rest-and-reset',
          'anxiety-healing-retreat': 'rest-and-reset',
          'digital-detox-retreat': 'rest-and-reset',
          'healing-retreat-himalayas': 'sound-healing',
        };
        const serviceSlug = serviceSlugMap[page.experienceSlug];
        if (!serviceSlug) return null;
        const reviews = getReviewsForSlug(serviceSlug);
        const topReviews = reviews.filter((r) => r.ratingValue >= 4).slice(0, 2);
        if (topReviews.length === 0) return null;
        return (
          <section style={{ marginBottom: 'var(--space-xl)' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              What Participants Say
            </h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {topReviews.map((review) => (
                <blockquote
                  key={`${review.participantName}-${review.datePublished}`}
                  style={{
                    margin: 0,
                    padding: '1rem 1.25rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
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
        );
      })()}

      {/* ── Upcoming Departures for this retreat ────────────────── */}
      {(() => {
        const now = new Date().toISOString().split('T')[0];
        const events = getEventsByExperience(page.experienceSlug)
          .filter((e) => e.locationId === page.locationId && e.startDate >= now && e.status !== 'sold-out')
          .sort((a, b) => a.startDate.localeCompare(b.startDate))
          .slice(0, 2);
        if (events.length === 0) return null;
        return (
          <section
            style={{
              marginBottom: 'var(--space-xl)',
              border: '2px solid var(--color-primary, #2d6a4f)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.25rem 1.5rem',
              background: 'var(--color-primary-light, #e8f5e9)',
            }}
          >
            <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.75rem', margin: '0 0 0.75rem' }}>
              Upcoming Dates
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {events.map((ev) => (
                <div key={ev.slug} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>{ev.dateRange}</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginLeft: '0.75rem' }}>
                      ₹{ev.price.toLocaleString('en-IN')} · {ev.seatsLeft} seats left
                    </span>
                  </div>
                  <Link
                    href={`/${ev.slug}`}
                    style={{
                      display: 'inline-block',
                      padding: '0.4rem 1rem',
                      backgroundColor: 'var(--color-primary, #2d6a4f)',
                      color: 'white',
                      borderRadius: 'var(--radius-sm)',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                    }}
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        );
      })()}

      <PrimaryCTA
        label={`Reserve My ${page.durationDays}-Day Retreat`}
        subtext="Read through the schedule above? Secure your place now."
        vertical="retreat"
        category="itinerary-bottom"
        sourcePath={`/${page.slug}`}
      />

      {/* ── Duration Options ────────────────────────────────────── */}
      {page.relatedDurationSlugs.length > 0 && (
        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Other Duration Options
          </h2>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
            {page.relatedDurationSlugs.map((slug) => (
              <li key={slug}>
                <Link href={`/${slug}`} style={{ color: 'var(--color-primary)' }}>
                  {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <TrackedFAQ items={page.faqItems as { question: string; answer: string }[]} page={`/${page.slug}`} />

      {/* ── Cross-Links ─────────────────────────────────────────── */}
      <p style={{ marginTop: 'var(--space-xl)', fontSize: '0.9rem' }}>
        <Link href={`/${page.parentSlug}`} style={{ color: 'var(--color-primary)' }}>
          {page.label} in {page.locationName}
        </Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href={`/${page.parentHubSlug}`} style={{ color: 'var(--color-primary)' }}>
          {page.label}s
        </Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href={`/locations/${page.locationId}`} style={{ color: 'var(--color-primary)' }}>
          {page.locationName} Guide
        </Link>
        {' '}&nbsp;|&nbsp;{' '}
        <Link href="/find-your-retreat" style={{ color: 'var(--color-primary)' }}>
          Find Your Retreat
        </Link>
      </p>
    </TrackedPage>
  );
}
