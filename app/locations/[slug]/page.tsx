import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllLocations, getLocationById } from '@/lib/locations';
import { getLocationPremiumContent } from '@/content/locations';
import { getRetreatServiceBySlug } from '@/content/retreats/services';
import { getTrekBySlug } from '@/content/treks';
import { getEventsByLocation } from '@/config/retreatProgramEvents';
import type { LocationId } from '@/config/locations';
import { buildCanonicalUrl, buildOgImages } from '@/components/seo/Metadata';
import {
  generateTouristDestinationSchema,
  generateBreadcrumbSchema,
  generateItemListSchema,
} from '@/components/seo/Schema';
import Breadcrumb from '@/components/Breadcrumb';
import PrimaryCTA from '@/components/PrimaryCTA';

export const dynamic = 'force-static';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return getAllLocations().map((loc) => ({ slug: loc.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locationId = slug as unknown as LocationId;
  const location = getLocationById(locationId);
  if (!location) return {};

  const title = `${location.name} — Retreats & Treks | Retreats And Treks`;
  const description = `Discover retreats and treks in ${location.name}, ${location.address.region}. ${location.tagline}`;
  const canonical = buildCanonicalUrl(`/locations/${slug}`);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      images: buildOgImages(title),
    },
  };
}

export default async function LocationHubPage({ params }: PageProps) {
  const { slug } = await params;
  const locationId = slug as unknown as LocationId;
  const locationData = getLocationById(locationId);
  const premiumContent = getLocationPremiumContent(locationId);

  if (!locationData || !premiumContent) {
    notFound();
  }

  // retreats and treks resolved from premium content slugs
  const retreatServices = premiumContent.retreatSlugs
    .map((s) => getRetreatServiceBySlug(s))
    .filter((s) => s !== undefined);

  // Resolve trek content from premium content slugs
  const trekContent = premiumContent.trekSlugs
    .map((s) => getTrekBySlug(s))
    .filter((t) => t !== undefined);

  const canonicalUrl = buildCanonicalUrl(`/locations/${slug}`);

  const touristDestinationSchema = generateTouristDestinationSchema(locationData, canonicalUrl);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: buildCanonicalUrl('/') },
    { name: 'Locations', url: buildCanonicalUrl('/locations') },
    { name: locationData.name, url: canonicalUrl },
  ]);

  const itemListSchema = generateItemListSchema([
    ...retreatServices.map((service) => ({
      name: service.title,
      url: buildCanonicalUrl(`/retreats/journeys/${service.slug}`),
    })),
    ...trekContent.map((trek) => ({
      name: trek.title,
      url: buildCanonicalUrl(`/treks/location/${trek.locationId}/${trek.slug}`),
    })),
  ]);

  const sectionStyle = {
    maxWidth: '56rem',
    margin: '0 auto',
    padding: 'var(--space-xl) var(--space-md)',
  } as const;

  const h2Style = {
    fontSize: '1.35rem',
    marginBottom: '0.75rem',
    fontWeight: 600,
  } as const;

  const proseStyle = {
    lineHeight: 1.75,
    color: 'var(--color-text)',
    marginBottom: '1rem',
  } as const;

  return (
    <>
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Locations' },
          { name: locationData.name },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristDestinationSchema) }}
      />
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
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {locationData.name}
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
          {locationData.tagline}
        </p>
        <p style={{ ...proseStyle, fontSize: '0.95rem' }}>
          {locationData.address.region}, India
          {'altitude' in locationData && ` · ${(locationData as { altitude: number }).altitude.toLocaleString()}m altitude`}
          {'nearestAirport' in locationData && ` · Nearest airport: ${(locationData as { nearestAirport: string }).nearestAirport}`}
        </p>
      </header>

      {/* ── Land Tone ──────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <p style={{ ...proseStyle, fontSize: '1.05rem' }}>
          {premiumContent.landTone.opening}
        </p>
      </section>

      {/* ── Bridging Inner Work & Movement ─────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{premiumContent.bridgingInnerWorkMovement.title}</h2>
        <p style={proseStyle}>{premiumContent.bridgingInnerWorkMovement.description}</p>
      </section>

      {/* ── Why Inner Work Succeeds Here ───────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{premiumContent.retreatLogic.title}</h2>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {premiumContent.retreatLogic.factors.map((factor) => (
            <div key={factor.title}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                {factor.title}
              </h3>
              <p style={{ ...proseStyle, marginBottom: 0 }}>{factor.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Retreat Intentions ─────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{premiumContent.intentionsFit.title}</h2>
        <p style={proseStyle}>{premiumContent.intentionsFit.description}</p>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {premiumContent.intentionsFit.intentions.map((intention) => (
            <div key={intention.title}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                {intention.title}
              </h3>
              <p style={{ ...proseStyle, marginBottom: 0 }}>{intention.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Retreats Available ─────────────────────────────────── */}
      {retreatServices.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Retreats in {locationData.name}</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {retreatServices.map((service) => (
              <div
  key={service.slug}
  className="loc-detail-card"
  style={{
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '1.25rem',
  }}
>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  <Link
                    href={`/retreats/journeys/${service.slug}`}
                    style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
                  >
                    {service.title}
                  </Link>
                </h3>
                <p style={{ ...proseStyle, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                  {service.oneLineEssence}
                </p>
                <Link
                  href={`/retreats/${slug}`}
                  style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}
                >
                  View retreats in {locationData.name} →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Treks Available ────────────────────────────────────── */}
      {trekContent.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Treks from {locationData.name}</h2>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {trekContent.map((trek) => (
              <div
  key={trek.slug}
  className="loc-detail-card"
  style={{
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  }}
>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>
                  <Link
                    href={`/treks/location/${trek.locationId}/${trek.slug}`}
                    style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
                  >
                    {trek.title}
                  </Link>
                </h3>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                  <span>{trek.duration}</span>
                  <span>·</span>
                  <span>{trek.difficulty}</span>
                </div>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-text)', margin: 0 }}>
                  {trek.description.slice(0, 160)}…
                </p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1rem' }}>
            <Link
              href={`/treks/location/${slug}`}
              style={{ color: 'var(--color-primary)' }}
            >
              View all treks from {locationData.name} →
            </Link>
          </p>
        </section>
      )}

      {/* ── Seasonal Character ─────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{premiumContent.seasonalCharacter.title}</h2>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {premiumContent.seasonalCharacter.seasons.map((season) => (
            <div key={season.month}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                {season.month} — <em>{season.mood}</em>
              </h3>
              <p style={{ ...proseStyle, marginBottom: 0 }}>{season.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Places & Landscapes ────────────────────────────────── */}
      {premiumContent.placesAndLandscapes.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={h2Style}>Places & Landscapes</h2>
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            {premiumContent.placesAndLandscapes.map((place) => (
              <div key={place.name}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                  {place.name}
                </h3>
                <p style={{ ...proseStyle, marginBottom: 0 }}>{place.description}</p>
                {place.season && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '0.35rem' }}>
                    Best time: {place.season}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Deep Topical Content (SEO pillar expansion) ─────── */}
      {premiumContent.deepTopicalContent && premiumContent.deepTopicalContent.length > 0 && (
        <>
          {premiumContent.deepTopicalContent.map((section) => (
            <section key={section.heading} style={sectionStyle}>
              <h2 style={h2Style}>{section.heading}</h2>
              {section.body.split('\n\n').map((para, i) => (
                <p key={i} style={proseStyle}>
                  {para.split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
                    seg.startsWith('**') && seg.endsWith('**')
                      ? <strong key={j}>{seg.slice(2, -2)}</strong>
                      : seg
                  )}
                </p>
              ))}
            </section>
          ))}
        </>
      )}

      {/* ── Practical Context ──────────────────────────────────── */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{premiumContent.practicalContext.title}</h2>
        <dl style={{ display: 'grid', gap: '0.75rem', margin: 0 }}>
          <div>
            <dt style={{ fontWeight: 600, fontSize: '0.95rem' }}>Best Seasons</dt>
            <dd style={{ ...proseStyle, margin: 0 }}>{premiumContent.practicalContext.bestSeasons}</dd>
          </div>
          <div>
            <dt style={{ fontWeight: 600, fontSize: '0.95rem' }}>Accessibility</dt>
            <dd style={{ ...proseStyle, margin: 0 }}>{premiumContent.practicalContext.accessibility}</dd>
          </div>
          <div>
            <dt style={{ fontWeight: 600, fontSize: '0.95rem' }}>Crowd Profile</dt>
            <dd style={{ ...proseStyle, margin: 0 }}>{premiumContent.practicalContext.crowdProfile}</dd>
          </div>
          <div>
            <dt style={{ fontWeight: 600, fontSize: '0.95rem' }}>Not For</dt>
            <dd style={{ ...proseStyle, margin: 0 }}>{premiumContent.practicalContext.notFor}</dd>
          </div>
        </dl>
      </section>

      {/* ── Network Context ────────────────────────────────────── */}
      <section style={sectionStyle}>
        <p style={proseStyle}>{premiumContent.networkContext}</p>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      {(() => {
        const now = new Date().toISOString().split('T')[0];
        const events = getEventsByLocation(locationData.id)
          .filter((e) => e.startDate >= now && e.status !== 'sold-out')
          .sort((a, b) => a.startDate.localeCompare(b.startDate))
          .slice(0, 3);
        if (events.length === 0) return null;
        return (
          <section style={sectionStyle}>
            <h2 style={h2Style}>Upcoming Retreats in {locationData.name}</h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {events.map((ev) => (
                <Link
  key={ev.slug}
  href={`/${ev.slug}`}
  className="loc-event-card"
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
                      {ev.label} — {ev.month} {ev.year}
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

      <section style={{ ...sectionStyle, paddingBottom: 'var(--space-2xl)' }}>
        <p style={{ ...proseStyle, maxWidth: '40rem', margin: '0 auto 1.5rem', textAlign: 'center' }}>
          {premiumContent.ctaText}
        </p>
        <PrimaryCTA
          label={`Plan My Retreat in ${locationData.name}`}
          subtext={`Tell us about your ideal retreat in ${locationData.name} and we'll help you find the right program.`}
          vertical="retreat"
          category="location-hub"
          sourcePath={`/locations/${slug}`}
          location={locationData.name}
        />
      </section>
    </>
  );
}
