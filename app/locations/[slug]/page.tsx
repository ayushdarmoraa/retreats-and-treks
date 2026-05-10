import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
  const premium = getLocationPremiumContent(locationId);
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
      images: premium?.heroImage ? [
        { url: buildCanonicalUrl(premium.heroImage), width: 1200, height: 630, alt: premium.heroImageAlt || title }
      ] : buildOgImages(title),
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
    padding: '4rem 2rem',
  } as const;

  const eyebrow = {
    display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem',
  } as const;
  const eyebrowLine = { width: '24px', height: '1px', background: 'var(--color-primary)', display: 'inline-block' } as const;
  const eyebrowText = { fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#374151', fontWeight: 500 };

  const h2Style = {
    fontFamily: 'var(--font-geist-sans), sans-serif',
    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
    fontWeight: 200, letterSpacing: '-0.02em',
    color: '#111111', margin: '0 0 1.5rem',
  } as const;

  const proseStyle = {
    fontFamily: 'var(--font-geist-sans), sans-serif',
    fontSize: '1.05rem', fontWeight: 300,
    lineHeight: 1.85, color: '#444',
    marginBottom: '1rem',
  } as const;

  return (
    <>
      <Breadcrumb
        items={[
          { name: 'Home', href: '/' },
          { name: 'Locations', href: '/locations' },
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

      {/* ── CINEMATIC HERO ───────────────────────────────────────────────── */}
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
        <Image
          src={premiumContent.heroImage || '/Images/whyhimalaya/nature.webp'}
          alt={premiumContent.heroImageAlt || locationData.name}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', opacity: 0.7 }}
        />
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
              {locationData.address.region}, India
            </span>
            <span style={{ width: '24px', height: '1px', background: '#e5e7eb', display: 'inline-block' }} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(3rem, 6vw, 4.5rem)',
            fontWeight: 200, letterSpacing: '-0.035em',
            lineHeight: 1.1,
            margin: '0 0 1.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}>
            {locationData.name}
          </h1>
          <p style={{
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)',
            fontWeight: 300,
            lineHeight: 1.7,
            color: '#f3f4f6',
            margin: '0 auto 1.5rem',
            maxWidth: '46rem',
            textShadow: '0 1px 5px rgba(0,0,0,0.5)'
          }}>
            {locationData.tagline}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.9rem', color: '#d1d5db', fontWeight: 300 }}>
             {'altitude' in locationData && <span>{(locationData as { altitude: number }).altitude.toLocaleString()}m Altitude</span>}
             {'nearestAirport' in locationData && <span>Base: {(locationData as { nearestAirport: string }).nearestAirport}</span>}
          </div>
        </div>
      </section>

      {/* ── Land Tone ──────────────────────────────────────────── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ ...sectionStyle, padding: '5rem 2rem' }}>
          <p style={{ ...proseStyle, fontSize: '1.25rem', textAlign: 'center', maxWidth: '48rem', margin: '0 auto', fontStyle: 'italic', color: '#555' }}>
            "{premiumContent.landTone.opening}"
          </p>
        </div>
      </section>

      {/* ── Bridging Inner Work & Movement ─────────────────────── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ ...sectionStyle, display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <div style={eyebrow}>
              <span style={eyebrowLine} />
              <span style={eyebrowText}>The Environment</span>
            </div>
            <h2 style={h2Style}>{premiumContent.bridgingInnerWorkMovement.title}</h2>
          </div>
          <div>
            <p style={proseStyle}>{premiumContent.bridgingInnerWorkMovement.description}</p>
          </div>
        </div>
      </section>

      {/* ── Why Inner Work Succeeds Here ───────────────────────── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ ...sectionStyle }}>
          <div style={eyebrow}>
            <span style={eyebrowLine} />
            <span style={eyebrowText}>Experience Logic</span>
          </div>
          <h2 style={h2Style}>{premiumContent.retreatLogic.title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginTop: '3rem' }}>
            {premiumContent.retreatLogic.factors.map((factor) => (
              <div key={factor.title} style={{ padding: '2rem', background: '#f7f9f7', borderRadius: '12px' }}>
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.2rem', fontWeight: 400, marginBottom: '1rem', color: '#111' }}>
                  {factor.title}
                </h3>
                <p style={{ ...proseStyle, marginBottom: 0 }}>{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Places & Landscapes + Cinematic Gallery ────────────────────────────────── */}
      {(premiumContent.placesAndLandscapes.length > 0 || premiumContent.gallery) && (
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '5rem 2rem' }}>
            <div style={eyebrow}>
              <span style={eyebrowLine} />
              <span style={eyebrowText}>The Landscape</span>
            </div>
            <h2 style={h2Style}>Places & Sights</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
              {premiumContent.placesAndLandscapes.map((place) => (
                <div key={place.name} style={{ borderLeft: '3px solid var(--color-primary)', paddingLeft: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.15rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                    {place.name}
                  </h3>
                  <p style={{ ...proseStyle, marginBottom: 0, fontSize: '0.95rem' }}>{place.description}</p>
                  {place.season && (
                    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', color: '#888', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Best time: {place.season}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {premiumContent.gallery && premiumContent.gallery.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {premiumContent.gallery.map((img, idx) => (
                  <div key={idx} style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden' }}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 640px) 100vw, 320px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Retreat Intentions ─────────────────────────────────── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#111', color: '#fff', borderBottom: '1px solid #333' }}>
        <div style={{ ...sectionStyle, padding: '5rem 2rem' }}>
          <div style={eyebrow}>
            <span style={{ ...eyebrowLine, background: '#666' }} />
            <span style={{ ...eyebrowText, color: '#aaa' }}>Who is this for</span>
          </div>
          <h2 style={{ ...h2Style, color: '#fff' }}>{premiumContent.intentionsFit.title}</h2>
          <p style={{ ...proseStyle, color: '#ddd' }}>{premiumContent.intentionsFit.description}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {premiumContent.intentionsFit.intentions.map((intention) => (
              <div key={intention.title} style={{ padding: '1.5rem', background: '#222', borderRadius: '12px', borderLeft: '3px solid var(--color-primary)' }}>
                <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.1rem', fontWeight: 400, marginBottom: '0.75rem', color: '#fff' }}>
                  {intention.title}
                </h3>
                <p style={{ ...proseStyle, marginBottom: 0, color: '#ccc', fontSize: '0.95rem' }}>{intention.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deep Topical Content (SEO pillar expansion) ─────── */}
      {premiumContent.deepTopicalContent && premiumContent.deepTopicalContent.length > 0 && (
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ ...sectionStyle }}>
            {premiumContent.deepTopicalContent.map((section, idx) => (
              <div key={section.heading} style={{ marginBottom: idx === premiumContent.deepTopicalContent!.length - 1 ? 0 : '4rem' }}>
                {idx === 0 && (
                  <div style={eyebrow}>
                    <span style={eyebrowLine} />
                    <span style={eyebrowText}>Deep Dive</span>
                  </div>
                )}
                <h2 style={h2Style}>{section.heading}</h2>
                <div style={{ columnCount: 1 }}>
                  {section.body.split('\n\n').map((para, i) => (
                    <p key={i} style={proseStyle}>
                      {para.split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
                        seg.startsWith('**') && seg.endsWith('**')
                          ? <strong key={j} style={{ fontWeight: 500, color: '#111' }}>{seg.slice(2, -2)}</strong>
                          : seg
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Retreats & Treks Available ─────────────────────────────────── */}
      {(retreatServices.length > 0 || trekContent.length > 0) && (
        <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '5rem 2rem' }}>
            {retreatServices.length > 0 && (
              <div style={{ marginBottom: trekContent.length > 0 ? '5rem' : 0 }}>
                <div style={eyebrow}>
                  <span style={eyebrowLine} />
                  <span style={eyebrowText}>Offerings</span>
                </div>
                <h2 style={h2Style}>Retreats in {locationData.name}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                  {retreatServices.map((service) => (
                    <Link key={service.slug} href={`/retreats/journeys/${service.slug}`} style={{
                      display: 'flex', flexDirection: 'column', background: '#fff',
                      border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.75rem',
                      textDecoration: 'none', transition: 'box-shadow 0.2s, transform 0.2s'
                    }} className="hover:shadow-md hover:-translate-y-1">
                      <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.25rem', fontWeight: 400, color: '#111', margin: '0 0 0.75rem' }}>
                        {service.title}
                      </h3>
                      <p style={{ ...proseStyle, fontSize: '0.95rem', margin: '0 0 1.5rem', flexGrow: 1 }}>
                        {service.oneLineEssence}
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 500 }}>
                        Explore Journey →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {trekContent.length > 0 && (
              <div>
                <div style={eyebrow}>
                  <span style={eyebrowLine} />
                  <span style={eyebrowText}>Offerings</span>
                </div>
                <h2 style={h2Style}>Treks from {locationData.name}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                  {trekContent.map((trek) => (
                    <Link key={trek.slug} href={`/treks/location/${trek.locationId}/${trek.slug}`} style={{
                      display: 'flex', flexDirection: 'column', background: '#fff',
                      border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.75rem',
                      textDecoration: 'none', transition: 'box-shadow 0.2s, transform 0.2s'
                    }} className="hover:shadow-md hover:-translate-y-1">
                      <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.25rem', fontWeight: 400, color: '#111', margin: '0 0 0.75rem' }}>
                        {trek.title}
                      </h3>
                      <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem', fontWeight: 500 }}>
                        <span style={{ background: '#f3f4f6', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{trek.duration}</span>
                        <span style={{ background: '#f3f4f6', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{trek.difficulty}</span>
                      </div>
                      <p style={{ ...proseStyle, fontSize: '0.95rem', margin: '0 0 1.5rem', flexGrow: 1 }}>
                         {trek.description.slice(0, 140)}…
                      </p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 500 }}>
                        Explore Trek →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Practical Context & Seasonal Character ──────────────────────────────────── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          
          <div>
            <div style={eyebrow}>
              <span style={eyebrowLine} />
              <span style={eyebrowText}>Logistics</span>
            </div>
            <h2 style={h2Style}>{premiumContent.practicalContext.title}</h2>
            <dl style={{ display: 'grid', gap: '1.5rem', margin: 0 }}>
              <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem' }}>
                <dt style={{ fontWeight: 600, fontSize: '1rem', color: '#111', marginBottom: '0.3rem' }}>Best Seasons</dt>
                <dd style={{ ...proseStyle, margin: 0, fontSize: '0.95rem' }}>{premiumContent.practicalContext.bestSeasons}</dd>
              </div>
              <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem' }}>
                <dt style={{ fontWeight: 600, fontSize: '1rem', color: '#111', marginBottom: '0.3rem' }}>Accessibility</dt>
                <dd style={{ ...proseStyle, margin: 0, fontSize: '0.95rem' }}>{premiumContent.practicalContext.accessibility}</dd>
              </div>
              <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem' }}>
                <dt style={{ fontWeight: 600, fontSize: '1rem', color: '#111', marginBottom: '0.3rem' }}>Crowd Profile</dt>
                <dd style={{ ...proseStyle, margin: 0, fontSize: '0.95rem' }}>{premiumContent.practicalContext.crowdProfile}</dd>
              </div>
              <div>
                <dt style={{ fontWeight: 600, fontSize: '1rem', color: '#111', marginBottom: '0.3rem' }}>Not For</dt>
                <dd style={{ ...proseStyle, margin: 0, fontSize: '0.95rem' }}>{premiumContent.practicalContext.notFor}</dd>
              </div>
            </dl>
          </div>

          <div>
            <div style={eyebrow}>
              <span style={eyebrowLine} />
              <span style={eyebrowText}>Seasons</span>
            </div>
            <h2 style={h2Style}>{premiumContent.seasonalCharacter.title}</h2>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {premiumContent.seasonalCharacter.seasons.map((season) => (
                <div key={season.month} style={{ borderLeft: '2px solid var(--color-primary)', paddingLeft: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.35rem', color: '#111' }}>
                    {season.month} — <em style={{ fontWeight: 300 }}>{season.mood}</em>
                  </h3>
                  <p style={{ ...proseStyle, marginBottom: 0, fontSize: '0.95rem' }}>{season.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Network Context ────────────────────────────────────── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ ...sectionStyle, padding: '3rem 2rem', textAlign: 'center' }}>
          <p style={{ ...proseStyle, margin: 0 }}>{premiumContent.networkContext}</p>
        </div>
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
          <section style={{ ...sectionStyle, paddingBottom: '2rem' }}>
            <h2 style={{ ...h2Style, textAlign: 'center' }}>Upcoming Departures in {locationData.name}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
              {events.map((ev, i, arr) => (
                <Link
                  key={ev.slug}
                  href={`/${ev.slug}`}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem',
                    padding: '1.25rem 1.5rem', background: '#fff', borderBottom: i < arr.length - 1 ? '1px solid #e5e7eb' : 'none',
                    textDecoration: 'none', transition: 'background 0.2s',
                  }} className="hover:bg-gray-50"
                >
                  <div>
                    <strong style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '1.05rem', fontWeight: 500, color: '#111', display: 'block' }}>
                      {ev.label} — {ev.month} {ev.year}
                    </strong>
                    <p style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', color: '#666', margin: '0.25rem 0 0' }}>
                      {ev.dateRange} · {ev.durationDays} days · ₹{ev.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.85rem', fontWeight: 500, color: ev.seatsLeft <= 3 ? '#c92a2a' : 'var(--color-primary)' }}>
                    {ev.seatsLeft} seats left →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      <section style={{ maxWidth: '52rem', margin: '0 auto', padding: '4rem 2rem 6rem' }}>
        <p style={{ ...proseStyle, maxWidth: '40rem', margin: '0 auto 2rem', textAlign: 'center', fontSize: '1.15rem' }}>
          {premiumContent.ctaText}
        </p>
        <PrimaryCTA
          label={`Plan Your Journey to ${locationData.name}`}
          subtext={`Whether you are looking for a trek or a retreat, we can help you prepare for ${locationData.name}.`}
          vertical="retreat"
          category="location-hub"
          sourcePath={`/locations/${slug}`}
          location={locationData.name}
        />
      </section>
    </>
  );
}
