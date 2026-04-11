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

  const eyebrow = {
    display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem',
  } as const;

  const eyebrowLine = {
    width: '24px', height: '1px', background: 'var(--color-primary)', display: 'inline-block',
  } as const;

  const eyebrowText = {
    fontFamily: 'var(--font-geist-sans), sans-serif',
    fontSize: '0.75rem', letterSpacing: '0.28em',
    textTransform: 'uppercase' as const,
    color: '#374151', fontWeight: 500,
  };

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

      {/* ── HERO ── */}
      <div style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#f7f9f7',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={eyebrow}>
            <span style={eyebrowLine} />
            <span style={eyebrowText}>Retreat Experience</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
            fontWeight: 200, letterSpacing: '-0.035em',
            color: '#111111', lineHeight: 1.1,
            margin: '0 0 1.5rem',
          }}>{page.h1}</h1>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.95rem', fontWeight: 300,
            lineHeight: 1.85, color: '#3a3a3a',
            margin: '0',
            paddingLeft: '1.5rem',
            borderLeft: '2px solid rgba(15,118,110,0.25)',
          }}>{page.intro}</p>
        </div>
      </div>

      {/* ── WHO IS THIS FOR + WHAT TO EXPECT ── */}
      <div style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))', gap: '2.5rem' }}>
          {/* Who is this for */}
          <div>
            <div style={eyebrow}>
              <span style={eyebrowLine} />
              <span style={eyebrowText}>Who Is This For</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.6rem' }}>
              {page.whoIsThisFor.map((item) => (
                <div key={item} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.88rem', fontWeight: 300,
                  lineHeight: 1.65, color: '#3a3a3a',
                }}>
                  <span style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }}>✦</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          {/* What to expect */}
          <div>
            <div style={eyebrow}>
              <span style={eyebrowLine} />
              <span style={eyebrowText}>What to Expect</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.6rem' }}>
              {page.whatToExpect.map((item) => (
                <div key={item} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.88rem', fontWeight: 300,
                  lineHeight: 1.65, color: '#3a3a3a',
                }}>
                  <span style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }}>✦</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── DEEP CONTENT ── */}
      {page.deepContent && page.deepContent.length > 0 && (
        <div style={{
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          background: '#f7f9f7',
          paddingTop: '4rem', paddingBottom: '4rem',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem', display: 'flex', flexDirection: 'column' as const, gap: '3rem' }}>
            {page.deepContent.map((section) => (
              <div key={section.heading}>
                <div style={eyebrow}>
                  <span style={eyebrowLine} />
                  <span style={eyebrowText}>Deep Dive</span>
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                  fontWeight: 200, letterSpacing: '-0.02em',
                  color: '#111111', margin: '0 0 1rem',
                }}>{section.heading}</h2>
                {section.body.split('\n\n').map((paragraph, i) => {
                  const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <p key={i} style={{
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '0.9rem', fontWeight: 300,
                      lineHeight: 1.85, color: '#3a3a3a',
                      margin: '0 0 0.75rem',
                    }}>
                      {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={j} style={{ fontWeight: 500, color: '#111111' }}>{part.slice(2, -2)}</strong>;
                        }
                        return <span key={j}>{part}</span>;
                      })}
                    </p>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── WHERE WE OFFER THIS ── */}
      <div style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '4rem', paddingBottom: '4rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={eyebrow}>
            <span style={eyebrowLine} />
            <span style={eyebrowText}>Where We Offer This</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
            fontWeight: 200, letterSpacing: '-0.03em',
            color: '#111111', margin: '0 0 1.75rem',
          }}>Locations</h2>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
            {page.locationAngles.map((angle) => {
              const loc = getLocationById(angle.locationId);
              const elPage = EXPERIENCE_LOCATION_PAGES.find(
                (p) => p.experienceSlug === page.slug && p.locationId === angle.locationId,
              );
              return (
                <div key={angle.locationId} style={{
                  background: '#f7f9f7', border: '1px solid #e5e7eb',
                  borderLeft: '3px solid var(--color-primary)',
                  borderRadius: '8px', padding: '1.25rem 1.5rem',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.95rem', fontWeight: 500,
                    color: '#111111', margin: '0 0 0.5rem',
                  }}>
                    <Link href={`/locations/${angle.locationId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {angle.heading}
                    </Link>
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.86rem', fontWeight: 300,
                    lineHeight: 1.75, color: '#555555',
                    margin: '0 0 0.75rem',
                  }}>{angle.description}</p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' as const }}>
                    {elPage ? (
                      <Link href={`/${elPage.slug}`} style={{
                        fontFamily: 'var(--font-geist-sans), sans-serif',
                        fontSize: '0.8rem', fontWeight: 400,
                        color: 'var(--color-primary)',
                      }}>
                        {page.h1.replace(' in the Himalayas', '')} in {loc?.name ?? angle.locationId} →
                      </Link>
                    ) : (
                      <Link href={`/locations/${angle.locationId}`} style={{
                        fontFamily: 'var(--font-geist-sans), sans-serif',
                        fontSize: '0.8rem', fontWeight: 400,
                        color: 'var(--color-primary)',
                      }}>
                        About {loc?.name ?? angle.locationId} →
                      </Link>
                    )}
                    <Link href={`/locations/${angle.locationId}`} style={{
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '0.8rem', fontWeight: 400,
                      color: 'var(--color-primary)',
                    }}>
                      {loc?.name ?? angle.locationId} Guide →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── RELATED RETREAT JOURNEYS ── */}
      {retreatServices.length > 0 && (
        <div style={{
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          background: '#f7f9f7',
          paddingTop: '4rem', paddingBottom: '4rem',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={eyebrow}>
              <span style={eyebrowLine} />
              <span style={eyebrowText}>Related Retreat Journeys</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              {retreatServices.map((service, i, arr) => (
                <Link key={service.slug} href={`/retreats/journeys/${service.slug}`} style={{
                  display: 'flex', flexDirection: 'column' as const,
                  padding: '1rem 1.25rem',
                  borderBottom: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none',
                  textDecoration: 'none',
                  background: '#ffffff',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.88rem', fontWeight: 400,
                    color: 'var(--color-primary)',
                  }}>{service.title} →</span>
                  <span style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.82rem', fontWeight: 300,
                    color: '#6b7280', marginTop: '0.2rem',
                  }}>{service.oneLineEssence}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── PARTICIPANT TESTIMONIALS ── */}
      {(() => {
        const allReviews = page.retreatServiceSlugs.flatMap((slug) => getReviewsForSlug(slug));
        if (allReviews.length === 0) return null;
        const topReviews = allReviews.filter((r) => r.ratingValue >= 4).slice(0, 3);
        if (topReviews.length === 0) return null;
        return (
          <div style={{
            width: '100vw', marginLeft: 'calc(-50vw + 50%)',
            background: '#ffffff',
            paddingTop: '4rem', paddingBottom: '4rem',
            borderBottom: '1px solid #e5e7eb',
          }}>
            <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
              <div style={eyebrow}>
                <span style={eyebrowLine} />
                <span style={eyebrowText}>What Participants Say</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 24rem), 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                {topReviews.map((review) => (
                  <ReviewCard
                    key={`${review.participantName}-${review.datePublished}`}
                    review={review}
                  />
                ))}
              </div>
              <Link href="/reviews" style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.85rem', fontWeight: 300,
                color: 'var(--color-primary)',
              }}>
                Read more experiences →
              </Link>
            </div>
          </div>
        );
      })()}

      {/* ── RETREAT STORIES ── */}
      {page.storyLinks && page.storyLinks.length > 0 && (
        <div style={{
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          background: '#f7f9f7',
          paddingTop: '4rem', paddingBottom: '4rem',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
            <div style={eyebrow}>
              <span style={eyebrowLine} />
              <span style={eyebrowText}>Retreat Stories</span>
            </div>
            <p style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '0.88rem', fontWeight: 300,
              lineHeight: 1.75, color: '#6b7280',
              margin: '0 0 1.25rem',
            }}>First-person accounts from people who have done this retreat.</p>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              {page.storyLinks.map((story, i, arr) => (
                <Link key={story.href} href={story.href} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderBottom: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none',
                  textDecoration: 'none',
                  background: '#ffffff',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.88rem', fontWeight: 300,
                  color: '#333333',
                }}>
                  <span>{story.label}</span>
                  <span style={{ color: '#374151', fontSize: '0.8rem' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CLOSING NARRATIVE ── */}
      <div style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '3rem', paddingBottom: '0',
      }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '0.92rem', fontWeight: 300,
            lineHeight: 1.85, color: '#6b7280',
            paddingLeft: '1.5rem',
            borderLeft: '2px solid rgba(15,118,110,0.2)',
            textAlign: 'left' as const,
          }}>{page.closingNarrative}</p>
        </div>
      </div>

      {/* ── UPCOMING DEPARTURES ── */}
      {(() => {
        const events = getUpcomingEvents()
          .filter((e) => e.experienceSlug === page.slug)
          .slice(0, 3);
        if (events.length === 0) return null;
        return (
          <div style={{
            width: '100vw', marginLeft: 'calc(-50vw + 50%)',
            background: '#f7f9f7',
            paddingTop: '4rem', paddingBottom: '4rem',
            borderBottom: '1px solid #e5e7eb',
          }}>
            <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
              <div style={eyebrow}>
                <span style={eyebrowLine} />
                <span style={eyebrowText}>Upcoming Departures</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                {events.map((ev, i, arr) => (
                  <Link key={ev.slug} href={`/${ev.slug}`} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    flexWrap: 'wrap' as const, gap: '0.5rem',
                    padding: '1rem 1.25rem',
                    borderBottom: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none',
                    textDecoration: 'none',
                    background: '#ffffff',
                    color: 'inherit',
                  }}>
                    <div>
                      <span style={{
                        fontFamily: 'var(--font-geist-sans), sans-serif',
                        fontSize: '0.88rem', fontWeight: 400,
                        color: 'var(--color-primary)', display: 'block',
                      }}>{ev.label} in {ev.locationName}</span>
                      <span style={{
                        fontFamily: 'var(--font-geist-sans), sans-serif',
                        fontSize: '0.8rem', fontWeight: 300,
                        color: '#6b7280',
                      }}>{ev.dateRange} · {ev.durationDays} days · ₹{ev.price.toLocaleString('en-IN')}</span>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '0.8rem', fontWeight: 500,
                      color: ev.seatsLeft <= 3 ? '#c92a2a' : '#6b7280',
                    }}>{ev.seatsLeft} seats left →</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── CTA ── */}
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '3rem 2rem' }}>
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