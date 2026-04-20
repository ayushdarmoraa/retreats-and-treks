import Link from 'next/link';
import Image from 'next/image';
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

// ── LOCATION FALLBACK IMAGES for visual cards ──
const LOCATION_IMAGE_MAP: Record<string, string> = {
  zanskar: '/Images/locations/zanskar_monastery.webp',
  chakrata: '/Images/locations/chakrata_forest.webp',
  rishikesh: '/Images/locations/rishikesh_yoga.webp',
  munsiyari: '/Images/locations/munsiyari_peaks.webp',
  mussoorie: '/Images/locations/mussoorie_light.webp',
  sankri: '/Images/locations/sankri_village.webp',
  default: '/Images/whyhimalaya/nature.webp'
};

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

      {/* ── IMMERSIVE CINEMATIC HERO ── */}
      <section style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#111',
        overflow: 'hidden'
      }}>
        {page.heroImage ? (
          <Image
            src={page.heroImage}
            alt={page.heroImageAlt || page.h1}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.65 }}
          />
        ) : (
          <Image
            src="/Images/whyhimalaya/meditation.webp"
            alt={page.h1}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.65 }}
          />
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
          zIndex: 1
        }} />
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '56rem',
          margin: '0 auto',
          padding: '0 2rem',
          textAlign: 'center',
          color: '#fff',
          marginTop: '4rem'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ width: '24px', height: '1px', background: '#e5e7eb', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#e5e7eb', fontWeight: 500 }}>
              Retreat Experience
            </span>
            <span style={{ width: '24px', height: '1px', background: '#e5e7eb', display: 'inline-block' }} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 200, letterSpacing: '-0.035em',
            lineHeight: 1.1,
            margin: '0 0 1.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}>{page.h1}</h1>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            fontWeight: 300,
            lineHeight: 1.85,
            color: '#f3f4f6',
            margin: '0 auto',
            maxWidth: '46rem',
            textShadow: '0 1px 5px rgba(0,0,0,0.5)'
          }}>{page.intro}</p>
        </div>
      </section>

      {/* ── WHO IS THIS FOR + WHAT TO EXPECT ── */}
      <div style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '5rem', paddingBottom: '5rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 26rem), 1fr))', gap: '4rem' }}>
          {/* Who is this for */}
          <div style={{ background: '#f7f9f7', padding: '2.5rem', borderRadius: '12px' }}>
            <div style={eyebrow}>
              <span style={eyebrowLine} />
              <span style={eyebrowText}>Who Is This For</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {page.whoIsThisFor.map((item) => (
                <div key={item} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.8rem',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.95rem', fontWeight: 300,
                  lineHeight: 1.65, color: '#222',
                }}>
                  <span style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px', fontSize: '1.2rem' }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          {/* What to expect */}
          <div style={{ background: '#f7f9f7', padding: '2.5rem', borderRadius: '12px' }}>
            <div style={eyebrow}>
              <span style={eyebrowLine} />
              <span style={eyebrowText}>What to Expect</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {page.whatToExpect.map((item) => (
                <div key={item} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.8rem',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.95rem', fontWeight: 300,
                  lineHeight: 1.65, color: '#222',
                }}>
                  <span style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px', fontSize: '1.2rem' }}>✦</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── DEEP CONTENT ── */}
      {page.deepContent && page.deepContent.length > 0 && (
        <section style={{
          width: '100vw', marginLeft: 'calc(-50vw + 50%)',
          background: '#ffffff',
          paddingTop: '5rem', paddingBottom: '5rem',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {page.deepContent.map((section, idx) => (
              <div key={section.heading}>
                {idx === 0 && (
                  <div style={eyebrow}>
                    <span style={eyebrowLine} />
                    <span style={eyebrowText}>Deep Dive</span>
                  </div>
                )}
                
                {/* Visual Interruption for Deep Content */}
                {section.image && (
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', marginBottom: '2.5rem' }}>
                    <Image
                      src={section.image}
                      alt={section.imageAlt || section.heading}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 640px) 100vw, 56rem"
                    />
                  </div>
                )}

                <h2 style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 200, letterSpacing: '-0.02em',
                  color: '#111111', margin: '0 0 1.5rem',
                }}>{section.heading}</h2>
                
                <div style={{ columnCount: section.image ? 1 : 1, columnGap: '2rem' }}>
                  {section.body.split('\n\n').map((paragraph, i) => {
                    const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
                    return (
                      <p key={i} style={{
                        fontFamily: 'var(--font-geist-sans), sans-serif',
                        fontSize: '1.05rem', fontWeight: 300,
                        lineHeight: 1.85, color: '#444',
                        margin: '0 0 1.25rem',
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
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── WHERE WE OFFER THIS (VISUAL CARDS) ── */}
      <div style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#f7f9f7',
        paddingTop: '5rem', paddingBottom: '5rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={eyebrow}>
            <span style={eyebrowLine} />
            <span style={eyebrowText}>Where We Offer This</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 200, letterSpacing: '-0.03em',
            color: '#111111', margin: '0 0 3rem',
          }}>Locations & Environments</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {page.locationAngles.map((angle) => {
              const loc = getLocationById(angle.locationId);
              const elPage = EXPERIENCE_LOCATION_PAGES.find(
                (p) => p.experienceSlug === page.slug && p.locationId === angle.locationId,
              );
              
              const imgUrl = LOCATION_IMAGE_MAP[angle.locationId] || LOCATION_IMAGE_MAP.default;

              return (
                <div key={angle.locationId} style={{
                  background: '#ffffff',
                  borderRadius: '12px', overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  display: 'flex', flexDirection: 'column'
                }}>
                  <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                    <Image
                      src={imgUrl}
                      alt={angle.heading}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 640px) 100vw, 30rem"
                    />
                  </div>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 style={{
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '1.2rem', fontWeight: 400,
                      color: '#111111', margin: '0 0 0.75rem',
                    }}>
                      <Link href={`/locations/${angle.locationId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {angle.heading}
                      </Link>
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '0.9rem', fontWeight: 300,
                      lineHeight: 1.75, color: '#555555',
                      margin: '0 0 1.5rem', flexGrow: 1
                    }}>{angle.description}</p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
                      {elPage ? (
                        <Link href={`/${elPage.slug}`} style={{
                          fontFamily: 'var(--font-geist-sans), sans-serif',
                          fontSize: '0.85rem', fontWeight: 500,
                          color: 'var(--color-primary)', textDecoration: 'none'
                        }}>
                          {page.h1.replace(' in the Himalayas', '')} in {loc?.name ?? angle.locationId} →
                        </Link>
                      ) : (
                        <Link href={`/locations/${angle.locationId}`} style={{
                          fontFamily: 'var(--font-geist-sans), sans-serif',
                          fontSize: '0.85rem', fontWeight: 500,
                          color: 'var(--color-primary)', textDecoration: 'none'
                        }}>
                          About {loc?.name ?? angle.locationId} →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── RELATED RETREAT JOURNEYS & EVENTS ── */}
      <div style={{
        width: '100vw', marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        paddingTop: '5rem', paddingBottom: '5rem',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          
          {retreatServices.length > 0 && (
            <div>
              <div style={eyebrow}>
                <span style={eyebrowLine} />
                <span style={eyebrowText}>Service Offerings</span>
              </div>
              <h3 style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '1.5rem', fontWeight: 200, letterSpacing: '-0.02em',
                  color: '#111111', margin: '0 0 1.5rem',
              }}>Related Retreats</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                {retreatServices.map((service, i, arr) => (
                  <Link key={service.slug} href={`/retreats/journeys/${service.slug}`} style={{
                    display: 'flex', flexDirection: 'column',
                    padding: '1.25rem 1.5rem',
                    borderBottom: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none',
                    textDecoration: 'none',
                    background: '#ffffff', transition: 'background 0.2s',
                  }} className="hover:bg-gray-50">
                    <span style={{
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '1.05rem', fontWeight: 400,
                      color: '#111', marginBottom: '0.2rem'
                    }}>{service.title} →</span>
                    <span style={{
                      fontFamily: 'var(--font-geist-sans), sans-serif',
                      fontSize: '0.85rem', fontWeight: 300,
                      color: '#6b7280',
                    }}>{service.oneLineEssence}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── UPCOMING DEPARTURES ── */}
          {(() => {
            const events = getUpcomingEvents()
              .filter((e) => e.experienceSlug === page.slug)
              .slice(0, 4);
            if (events.length === 0) return null;
            return (
              <div>
                <div style={eyebrow}>
                  <span style={eyebrowLine} />
                  <span style={eyebrowText}>Schedules</span>
                </div>
                <h3 style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '1.5rem', fontWeight: 200, letterSpacing: '-0.02em',
                    color: '#111111', margin: '0 0 1.5rem',
                }}>Upcoming Departures</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                  {events.map((ev, i, arr) => (
                    <Link key={ev.slug} href={`/${ev.slug}`} style={{
                      display: 'flex', flexDirection: 'column', gap: '0.3rem',
                      padding: '1.25rem 1.5rem',
                      borderBottom: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none',
                      textDecoration: 'none',
                      background: '#ffffff', transition: 'background 0.2s'
                    }} className="hover:bg-gray-50">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          fontFamily: 'var(--font-geist-sans), sans-serif',
                          fontSize: '1.05rem', fontWeight: 400,
                          color: '#111', display: 'block',
                        }}>{ev.label} in {ev.locationName}</span>
                        <span style={{
                          fontFamily: 'var(--font-geist-sans), sans-serif',
                          fontSize: '0.85rem', fontWeight: 500,
                          color: ev.seatsLeft <= 3 ? '#c92a2a' : 'var(--color-primary)',
                        }}>{ev.seatsLeft} seats left →</span>
                      </div>
                      <span style={{
                        fontFamily: 'var(--font-geist-sans), sans-serif',
                        fontSize: '0.85rem', fontWeight: 300,
                        color: '#6b7280',
                      }}>{ev.dateRange} · {ev.durationDays} days · ₹{ev.price.toLocaleString('en-IN')}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}

        </div>
      </div>

      {/* ── PARTICIPANT TESTIMONIALS ── */}
      {(() => {
        const allReviews = page.retreatServiceSlugs.flatMap((slug) => getReviewsForSlug(slug));
        if (allReviews.length === 0) return null;
        const topReviews = allReviews.filter((r) => r.ratingValue >= 4).slice(0, 3);
        if (topReviews.length === 0) return null;
        return (
          <div style={{
            width: '100vw', marginLeft: 'calc(-50vw + 50%)',
            background: '#111', color: '#fff',
            paddingTop: '5rem', paddingBottom: '5rem',
          }}>
            <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 2rem' }}>
              <div style={eyebrow}>
                <span style={{ ...eyebrowLine, background: '#555' }} />
                <span style={{ ...eyebrowText, color: '#aaa' }}>What Participants Say</span>
              </div>
              <h2 style={{
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 200, letterSpacing: '-0.03em',
                  color: '#fff', margin: '0 0 3rem',
              }}>Real Experiences</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 20rem), 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {topReviews.map((review) => (
                  <div key={`${review.participantName}-${review.datePublished}`} style={{ background: '#222', borderRadius: '12px', overflow: 'hidden' }}>
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
              <Link href="/reviews" style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '0.95rem', fontWeight: 300,
                color: '#aaa', textDecoration: 'underline'
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
          paddingTop: '5rem', paddingBottom: '4rem',
        }}>
          <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
            <h2 style={{
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontWeight: 200, letterSpacing: '-0.02em',
                color: '#111111', margin: '0 0 1rem',
            }}>Retreat Stories</h2>
            <p style={{
              fontFamily: 'var(--font-geist-sans), sans-serif',
              fontSize: '1.05rem', fontWeight: 300,
              lineHeight: 1.75, color: '#6b7280',
              margin: '0 0 2rem',
            }}>First-person accounts from people who have done this retreat.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              {page.storyLinks.map((story) => (
                <Link key={story.href} href={story.href} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.5rem 1.75rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  background: '#ffffff',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '1rem', fontWeight: 400,
                  color: '#111', transition: 'box-shadow 0.2s',
                }} className="hover:shadow-md">
                  <span>{story.label}</span>
                  <span style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>→</span>
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
        paddingTop: '5rem', paddingBottom: '1rem',
      }}>
        <div style={{ maxWidth: '42rem', margin: '0 auto', padding: '0 2rem' }}>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '1.15rem', fontWeight: 300,
            lineHeight: 1.85, color: '#444',
            paddingLeft: '1.5rem',
            borderLeft: '4px solid var(--color-primary)',
            textAlign: 'left' as const, fontStyle: 'italic'
          }}>{page.closingNarrative}</p>
        </div>
      </div>

      {/* ── HIGH VISIBILITY CTA ── */}
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '3rem', textAlign: 'center' }}>
          <PrimaryCTA
            label={`Find Your ${page.h1.replace(' in the Himalayas', '')}`}
            subtext={`Not sure which location or duration is right for you? Describe where you are and what you need, and we will pair you with the right retreat.`}
            vertical="retreat"
            category="experience-hub"
            sourcePath={`/${page.slug}`}
          />
        </div>
      </div>
    </>
  );
}