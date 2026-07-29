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
import TrackedPage from '@/components/TrackedPage';

interface ExperienceHubPageProps {
  page: ExperiencePage;
  breadcrumbItems?: { name: string; href?: string }[];
}

const LOCATION_IMAGE_MAP: Record<string, string> = {
  zanskar: '/Images/location/zanskar.webp',
  chakrata: '/Images/location/chakrata.webp',
  rishikesh: '/Images/location/rishikesh.webp',
  munsiyari: '/Images/location/munsiyari.webp',
  mussoorie: '/Images/location/mussoorie.webp',
  sankri: '/Images/location/sankri.webp',
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

  return (
    <TrackedPage page={`/${page.slug}`} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <style>{`
        .med-shell { width: 100vw; margin-left: calc(-50vw + 50%); }
        .med-outer { max-width: 76rem; margin: 0 auto; padding: 0 1.5rem; }
        .med-inner { max-width: 58rem; margin: 0 auto; padding: 0 1.5rem; }

        .med-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.1rem; }
        .med-eyebrow-line { width: 30px; height: 1px; background: rgba(15,118,110,0.35); flex-shrink: 0; }
        .med-eyebrow-text { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6b7280; font-weight: 600; }

        .med-h2 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.12; margin: 0 0 1.1rem; }
        .med-h2 span { color: #0f766e; }
        .med-h3 { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.15rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.7rem; letter-spacing: -0.01em; }
        .med-body { font-family: var(--font-inter), sans-serif; font-size: 0.98rem; line-height: 1.9; color: #4b5259; font-weight: 400; margin: 0 0 1rem; }
        .med-body:last-child { margin-bottom: 0; }
        .med-body strong { color: #2B2A26; font-weight: 600; }

        .med-card {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(15,31,28,0.05);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .med-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: #0f766e; transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index: 2;
        }
        .med-card:hover { transform: translateY(-6px); border-color: rgba(15,118,110,0.28); box-shadow: 0 22px 48px rgba(15,31,28,0.12); }
        .med-card:hover::before { transform: scaleX(1); }

        .med-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem 2.3rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; box-shadow: 0 10px 26px rgba(15,118,110,0.25); transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid #0f766e; }
        .med-cta-btn:hover { background: #0d6b64; transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,118,110,0.32); }
        .med-cta-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.85rem 1.8rem; border: 1px solid rgba(15,118,110,0.25); color: #0f766e; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .med-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: translateY(-2px); }

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 960px) { .med-grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } .med-grid-4 { grid-template-columns: 1fr; } }

        @keyframes med-hero-zoom { from { transform: scale(1.06); } to { transform: scale(1); } }
        .med-hero-bg { animation: med-hero-zoom 24s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .med-hero-bg { animation: none; } }

        .med-list { padding-left: 0; margin: 0; list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .med-list-item { display: grid; grid-template-columns: 1.9rem 1fr; gap: 0.9rem; }
        .med-list-dot { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid rgba(15,118,110,0.3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .med-list-dot-inner { width: 7px; height: 7px; border-radius: 50%; background: #0f766e; }
        .med-list-text { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; line-height: 1.85; color: #4b5259; font-weight: 400; }
        .med-list-text strong { color: #2B2A26; font-weight: 600; }

        .med-season-tag { display: inline-block; font-family: var(--font-inter), sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0f766e; background: rgba(15,118,110,0.08); padding: 0.32rem 0.7rem; border-radius: 999px; margin-bottom: 0.9rem; }

        .med-nav-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.75rem; }
        @media (max-width: 820px) { .med-nav-grid { grid-template-columns: 1fr; } }

        .med-card-link { text-decoration: none; display: block; height: 100%; }
        .med-card-link .med-card { height: 100%; display: flex; flex-direction: column; }

        .med-location-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 960px) { .med-location-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 640px) { .med-location-grid { grid-template-columns: 1fr; } }

        .med-location-card { overflow: hidden; }
        .med-location-card .med-img-wrap { position: relative; width: 100%; height: 200px; overflow: hidden; }
        .med-location-card .med-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .med-location-card .med-body-wrap { padding: 1.5rem; }

        .med-feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        @media (max-width: 860px) { .med-feature-grid { grid-template-columns: 1fr; } }

        .med-feature-card { padding: 2rem; border-radius: 18px; background: #f7f9f7; border: 1px solid rgba(15,118,110,0.06); }

        .med-service-list { border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; overflow: hidden; }
        .med-service-item { display: block; padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(15,118,110,0.08); text-decoration: none; background: #fff; transition: background 0.2s; }
        .med-service-item:last-child { border-bottom: none; }
        .med-service-item:hover { background: #f7f9f7; }
        .med-service-item .med-service-title { font-family: var(--font-inter), sans-serif; font-size: 1rem; font-weight: 500; color: #2B2A26; display: block; margin-bottom: 0.15rem; }
        .med-service-item .med-service-essence { font-family: var(--font-inter), sans-serif; font-size: 0.82rem; font-weight: 300; color: #6b7280; }

        .med-story-card { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-radius: 18px; background: #fff; border: 1px solid rgba(15,118,110,0.12); text-decoration: none; transition: all 0.3s ease; }
        .med-story-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(15,31,28,0.1); border-color: rgba(15,118,110,0.28); }
        .med-story-card .med-story-label { font-family: var(--font-inter), sans-serif; font-size: 0.95rem; font-weight: 500; color: #2B2A26; }
        .med-story-card .med-story-arrow { color: #0f766e; font-size: 1.2rem; }

        .med-closing-quote { padding-left: 1.5rem; border-left: 4px solid #0f766e; font-family: var(--font-inter), sans-serif; font-size: 1.1rem; font-weight: 400; line-height: 1.85; color: #4b5259; font-style: italic; }

        .med-cta-wrap { background: #f7f9f7; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; padding: 2.5rem; text-align: center; }

        .med-review-card { padding: 0.5rem; background: #fff; border: 1px solid rgba(15,118,110,0.12); border-radius: 18px; overflow: hidden; }
      `}</style>

      <Breadcrumb items={breadcrumbItems || [{ name: 'Home', href: '/' }, { name: page.h1 }]} />

      {/* ── HERO ── */}
      <section className="med-shell" style={{ position: 'relative', overflow: 'hidden', minHeight: '78vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(15,118,110,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img className="med-hero-bg" src={page.heroImage || '/Images/services/meditation.webp'} alt={page.heroImageAlt || page.h1} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '58rem', width: '100%', padding: '5rem 1.5rem 4.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>Retreat Experience</span>
            <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 1.5rem', lineHeight: 1.08, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            {page.h1}
          </h1>
          <p style={{ maxWidth: '46rem', margin: '0 auto', fontFamily: 'var(--font-inter), sans-serif', fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', fontWeight: 400, lineHeight: 1.85, color: 'rgba(255,255,255,0.8)', textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>
            {page.intro}
          </p>
        </div>
      </section>

      {/* ── WHO IS THIS FOR + WHAT TO EXPECT ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-feature-grid">
            <div className="med-feature-card">
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Who Is This For</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {page.whoIsThisFor.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.95rem', fontWeight: 400, lineHeight: 1.65, color: '#2B2A26' }}>
                    <span style={{ color: '#0f766e', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="med-feature-card">
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">What to Expect</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {page.whatToExpect.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.95rem', fontWeight: 400, lineHeight: 1.65, color: '#2B2A26' }}>
                    <span style={{ color: '#0f766e', flexShrink: 0, marginTop: '2px' }}>✦</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEEP CONTENT ── */}
      {page.deepContent && page.deepContent.length > 0 && (
        <section className="med-shell" style={{ background: '#f7f9f7', padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {page.deepContent.map((section, idx) => (
              <div key={section.heading}>
                {idx === 0 && (
                  <div className="med-eyebrow">
                    <span className="med-eyebrow-line" />
                    <span className="med-eyebrow-text">Deep Dive</span>
                  </div>
                )}

                {section.image && (
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '18px', overflow: 'hidden', marginBottom: '2rem' }}>
                    <img src={section.image} alt={section.imageAlt || section.heading} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}

                <h2 className="med-h2">{section.heading}</h2>

                {section.body.split('\n\n').map((paragraph, i) => {
                  const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <p key={i} className="med-body" style={{ fontSize: '1.05rem' }}>
                      {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={j} style={{ fontWeight: 600, color: '#2B2A26' }}>{part.slice(2, -2)}</strong>;
                        }
                        return <span key={j}>{part}</span>;
                      })}
                    </p>
                  );
                })}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── WHERE WE OFFER THIS ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Where We Offer This</span>
          </div>
          <h2 className="med-h2" style={{ marginBottom: '2.5rem' }}>Locations &amp; <span>Environments</span></h2>

          <div className="med-location-grid">
            {page.locationAngles.map((angle) => {
              const loc = getLocationById(angle.locationId);
              const elPage = EXPERIENCE_LOCATION_PAGES.find(
                (p) => p.experienceSlug === page.slug && p.locationId === angle.locationId,
              );
              const imgUrl = LOCATION_IMAGE_MAP[angle.locationId] || LOCATION_IMAGE_MAP.default;

              return (
                <div key={angle.locationId} className="med-card med-location-card">
                  <div className="med-img-wrap">
                    <img src={imgUrl} alt={angle.heading} />
                  </div>
                  <div className="med-body-wrap">
                    <h3 className="med-h3" style={{ fontSize: '1.1rem' }}>
                      <Link href={`/locations/${angle.locationId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {angle.heading}
                      </Link>
                    </h3>
                    <p className="med-body" style={{ fontSize: '0.88rem', marginBottom: '0.75rem' }}>{angle.description}</p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', borderTop: '1px solid rgba(15,118,110,0.08)', paddingTop: '1rem' }}>
                      {elPage ? (
                        <Link href={`/${elPage.slug}`} style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                          {page.h1.replace(' in the Himalayas', '')} in {loc?.name ?? angle.locationId} →
                        </Link>
                      ) : (
                        <Link href={`/locations/${angle.locationId}`} style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
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
      </section>

      {/* ── RELATED RETREAT JOURNEYS & EVENTS ── */}
      <section className="med-shell" style={{ background: '#f7f9f7', padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-outer">
          <div className="med-grid-2" style={{ alignItems: 'start' }}>
            {retreatServices.length > 0 && (
              <div>
                <div className="med-eyebrow">
                  <span className="med-eyebrow-line" />
                  <span className="med-eyebrow-text">Service Offerings</span>
                </div>
                <h3 className="med-h3" style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Related Retreats</h3>
                <div className="med-service-list">
                  {retreatServices.map((service, i, arr) => (
                    <Link key={service.slug} href={`/retreats/journeys/${service.slug}`} className="med-service-item">
                      <span className="med-service-title">{service.title} →</span>
                      <span className="med-service-essence">{service.oneLineEssence}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {(() => {
              const events = getUpcomingEvents()
                .filter((e) => e.experienceSlug === page.slug)
                .slice(0, 4);
              if (events.length === 0) return null;
              return (
                <div>
                  <div className="med-eyebrow">
                    <span className="med-eyebrow-line" />
                    <span className="med-eyebrow-text">Schedules</span>
                  </div>
                  <h3 className="med-h3" style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Upcoming Departures</h3>
                  <div className="med-service-list">
                    {events.map((ev, i, arr) => (
                      <Link key={ev.slug} href={`/${ev.slug}`} className="med-service-item">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="med-service-title">{ev.label} in {ev.locationName}</span>
                          <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', fontWeight: 600, color: ev.seatsLeft <= 3 ? '#c92a2a' : '#0f766e' }}>{ev.seatsLeft} seats left →</span>
                        </div>
                        <span className="med-service-essence">{ev.dateRange} · {ev.durationDays} days · ₹{ev.price.toLocaleString('en-IN')}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── PARTICIPANT TESTIMONIALS ── */}
      {(() => {
        const allReviews = page.retreatServiceSlugs.flatMap((slug) => getReviewsForSlug(slug));
        if (allReviews.length === 0) return null;
        const topReviews = allReviews.filter((r) => r.ratingValue >= 4).slice(0, 3);
        if (topReviews.length === 0) return null;
        return (
          <section className="med-shell" style={{ background: '#ffffff', padding: '5rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
            <div className="med-outer">
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">What Participants Say</span>
              </div>
              <h2 className="med-h2" style={{ marginBottom: '2.5rem' }}>Real <span>Experiences</span></h2>
              <div className="med-grid-3" style={{ marginBottom: '2rem' }}>
                {topReviews.map((review) => (
                  <div key={`${review.participantName}-${review.datePublished}`} className="med-review-card">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
              <Link href="/reviews" style={{ color: '#0f766e', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.95rem', fontWeight: 400, textDecoration: 'underline' }}>
                Read more experiences →
              </Link>
            </div>
          </section>
        );
      })()}

      {/* ── RETREAT STORIES ── */}
      {page.storyLinks && page.storyLinks.length > 0 && (
        <section className="med-shell" style={{ background: '#f7f9f7', padding: '5rem 0' }}>
          <div className="med-inner" style={{ textAlign: 'center' }}>
            <h2 className="med-h2" style={{ marginBottom: '0.5rem' }}>Retreat <span>Stories</span></h2>
            <p className="med-body" style={{ marginBottom: '2rem', fontSize: '1.05rem', color: '#6b7280' }}>First-person accounts from people who have done this retreat.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              {page.storyLinks.map((story) => (
                <Link key={story.href} href={story.href} className="med-story-card">
                  <span className="med-story-label">{story.label}</span>
                  <span className="med-story-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CLOSING NARRATIVE ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '5rem 0 2rem' }}>
        <div className="med-inner">
          <p className="med-closing-quote" style={{ margin: 0 }}>{page.closingNarrative}</p>
        </div>
      </section>

      {/* ── HIGH VISIBILITY CTA ── */}
      <section className="med-shell" style={{ background: '#ffffff', padding: '2rem 0 5rem' }}>
        <div className="med-inner">
          <div className="med-cta-wrap">
            <PrimaryCTA
              label={`Find Your ${page.h1.replace(' in the Himalayas', '')}`}
              subtext={`Not sure which location or duration is right for you? Describe where you are and what you need, and we will pair you with the right retreat.`}
              vertical="retreat"
              category="experience-hub"
              sourcePath={`/${page.slug}`}
            />
          </div>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <nav className="med-shell" style={{ background: '#f7f9f7', padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-nav-grid">
            <Link href="/retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Retreats</span>
            </Link>
            <Link href="/retreats/himalayan-retreats" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Himalayan Retreats</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/locations" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Locations</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
            <Link href="/find-your-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Find Your Retreat</span>
              <span style={{ color: '#0f766e' }}>→</span>
            </Link>
          </div>
        </div>
      </nav>
    </TrackedPage>
  );
}
