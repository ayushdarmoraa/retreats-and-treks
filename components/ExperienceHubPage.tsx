/**
 * ExperienceHubPage — shared server component for problem-based retreat pages
 * Renders: intro → who is this for → what to expect → location angles → retreat links → CTA
 */

import Link from 'next/link';
import type { ExperiencePage } from '@/config/experiencePages';
import { EXPERIENCE_LOCATION_PAGES } from '@/config/experienceLocationPages';
import { getLocationById } from '@/lib/locations';
import { getRetreatServiceBySlug } from '@/content/retreats/services';
import { getReviewsForSlug } from '@/content/reviews';
import { getUpcomingEvents } from '@/config/retreatProgramEvents';
import { buildCanonicalUrl } from '@/components/seo/Metadata';
import { generateBreadcrumbSchema, generateItemListSchema } from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';
import ReviewCard from '@/components/reviews/ReviewCard';

interface ExperienceHubPageProps {
  page: ExperiencePage;
  breadcrumbItems?: { name: string; href?: string }[];
}

export default function ExperienceHubPage({ page, breadcrumbItems }: ExperienceHubPageProps) {
  const retreatServices = page.retreatServiceSlugs
    .map((slug) => getRetreatServiceBySlug(slug))
    .filter((s) => s !== undefined);

  const defaultBreadcrumbs = [
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: page.h1, url: buildCanonicalUrl(`/${page.slug}`) },
  ];
  const schemaBreadcrumbs = breadcrumbItems
    ? breadcrumbItems.map((b) => ({ name: b.name, url: buildCanonicalUrl(b.href || `/${page.slug}`) }))
    : defaultBreadcrumbs;
  const breadcrumbSchema = generateBreadcrumbSchema(schemaBreadcrumbs);

  const itemListSchema = generateItemListSchema(
    page.locationAngles.map((angle) => {
      const loc = getLocationById(angle.locationId);
      return {
        name: loc ? `${page.h1} in ${loc.name}` : angle.heading,
        url: buildCanonicalUrl(`/locations/${angle.locationId}`),
      };
    }),
  );

  const sectionStyle = {
    maxWidth: '56rem',
    margin: '0 auto',
    padding: 'var(--space-xl) var(--space-md)',
  } as const;

  const h2Style = {
    fontSize: '1.35rem',
    fontWeight: 600,
    marginBottom: '0.75rem',
  } as const;

  const proseStyle = {
    lineHeight: 1.75,
    color: 'var(--color-text)',
    marginBottom: '1rem',
  } as const;

  return (
    <>
      <Breadcrumb items={breadcrumbItems || [{ name: 'Home', href: '/' }, { name: page.h1 }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <header style={{ ...sectionStyle, paddingBottom: 0 }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{page.h1}</h1>
        <p style={{ ...proseStyle, fontSize: '1.05rem' }}>{page.intro}</p>
      </header>

      {/* ── Who Is This For ─────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Who Is This For</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
          {page.whoIsThisFor.map((item) => (
            <li key={item} style={{ color: 'var(--color-text)', fontSize: '0.95rem' }}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── What to Expect ──────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>What to Expect</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: 2 }}>
          {page.whatToExpect.map((item) => (
            <li key={item} style={{ color: 'var(--color-text)', fontSize: '0.95rem' }}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Deep Content Sections (pillar pages only) ────────── */}
      {page.deepContent && page.deepContent.length > 0 && page.deepContent.map((section) => (
        <section key={section.heading} style={sectionStyle}>
          <h2 style={h2Style}>{section.heading}</h2>
          {section.body.split('\n\n').map((paragraph, i) => {
            // Handle paragraphs that start with ** as bold-led prose
            const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
            return (
              <p key={i} style={{ ...proseStyle, fontSize: '0.95rem' }}>
                {parts.map((part, j) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={j}>{part.slice(2, -2)}</strong>;
                  }
                  return <span key={j}>{part}</span>;
                })}
              </p>
            );
          })}
        </section>
      ))}

      {/* ── Location Angles ─────────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>Where We Offer This</h2>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {page.locationAngles.map((angle) => {
            const loc = getLocationById(angle.locationId);
            return (
              <article
                key={angle.locationId}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.5rem',
                }}
              >
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  <Link
                    href={`/locations/${angle.locationId}`}
                    style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
                  >
                    {angle.heading}
                  </Link>
                </h3>
                <p style={{ ...proseStyle, marginBottom: '0.75rem' }}>{angle.description}</p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
                  {(() => {
                    const elPage = EXPERIENCE_LOCATION_PAGES.find(
                      (p) => p.experienceSlug === page.slug && p.locationId === angle.locationId,
                    );
                    if (elPage) {
                      return (
                        <Link href={`/${elPage.slug}`} style={{ color: 'var(--color-primary)' }}>
                          {page.h1.replace(' in the Himalayas', '')} in {loc?.name ?? angle.locationId} →
                        </Link>
                      );
                    }
                    return (
                      <Link href={`/locations/${angle.locationId}`} style={{ color: 'var(--color-primary)' }}>
                        About {loc?.name ?? angle.locationId} →
                      </Link>
                    );
                  })()}
                  <Link href={`/locations/${angle.locationId}`} style={{ color: 'var(--color-primary)' }}>
                    {loc?.name ?? angle.locationId} Guide →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Related Retreat Journeys ────────────────────────────── */}
      {retreatServices.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Related Retreat Journeys</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {retreatServices.map((service) => (
              <div
                key={service.slug}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.25rem',
                }}
              >
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  <Link
                    href={`/retreats/journeys/${service.slug}`}
                    style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
                  >
                    {service.title}
                  </Link>
                </h3>
                <p style={{ ...proseStyle, fontSize: '0.9rem', marginBottom: 0 }}>
                  {service.oneLineEssence}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Participant Testimonials ───────────────────────────── */}
      {(() => {
        const allReviews = page.retreatServiceSlugs.flatMap((slug) => getReviewsForSlug(slug));
        if (allReviews.length === 0) return null;
        const topReviews = allReviews.filter((r) => r.ratingValue >= 4).slice(0, 3);
        if (topReviews.length === 0) return null;
        // Internal link to cluster page (e.g., silent retreats)
        let clusterLink = null;
        if (page.slug === 'meditation-retreats') {
          clusterLink = (
            <p style={{ marginTop: '1rem', fontSize: '0.98rem', color: 'var(--color-primary)' }}>
              Read real experiences from our silent retreats →{' '}
              <Link href="/reviews/silent-retreats" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                /reviews/silent-retreats
              </Link>
            </p>
          );
        }
        return (
          <section style={sectionStyle}>
            <h2 style={h2Style}>What Participants Say</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {topReviews.map((review) => (
                <ReviewCard
                  key={`${review.participantName}-${review.datePublished}`}
                  review={review}
                />
              ))}
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
              <Link href="/reviews" style={{ color: 'var(--color-primary)' }}>
                Read more experiences →
              </Link>
            </p>
            {clusterLink}
          </section>
        );
      })()}

      {/* ── Retreat Stories ─────────────────────────────────────── */}
      {page.storyLinks && page.storyLinks.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Retreat Stories</h2>
          <p style={{ ...proseStyle, marginBottom: '1rem' }}>
            First-person accounts from people who have done this retreat.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem' }}>
            {page.storyLinks.map((story) => (
              <li key={story.href}>
                <Link
                  href={story.href}
                  style={{
                    display: 'block',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1rem 1.25rem',
                    textDecoration: 'none',
                    color: 'var(--color-primary)',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                  }}
                >
                  {story.label} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Closing + CTA ───────────────────────────────────────── */}
      <section style={{ ...sectionStyle, paddingBottom: 0 }}>
        <p style={{ ...proseStyle, maxWidth: '42rem', margin: '0 auto 1.5rem', textAlign: 'center' }}>
          {page.closingNarrative}
        </p>
      </section>

      {/* ── Upcoming Departures ─────────────────────────────────── */}
      {(() => {
        const events = getUpcomingEvents()
          .filter((e) => e.experienceSlug === page.slug)
          .slice(0, 3);
        if (events.length === 0) return null;
        return (
          <section style={sectionStyle}>
            <h2 style={h2Style}>Upcoming Departures</h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {events.map((ev) => (
                <Link
                  key={ev.slug}
                  href={`/${ev.slug}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1rem 1.25rem',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                      {ev.label} in {ev.locationName}
                    </strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0' }}>
                      {ev.dateRange} · {ev.durationDays} days · ₹{ev.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: ev.seatsLeft <= 3 ? '#c92a2a' : 'var(--color-text-secondary)' }}>
                    {ev.seatsLeft} seats left →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 var(--space-md) var(--space-2xl)' }}>
        <PrimaryCTA
          label="Find Your Retreat"
          subtext={`Not sure which ${page.h1.toLowerCase().replace(' in the himalayas', '')} is right for you? We can help you decide.`}
          vertical="retreat"
          category="experience-hub"
          sourcePath={`/${page.slug}`}
        />
      </div>
    </>
  );
}
