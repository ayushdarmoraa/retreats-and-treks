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
import TrackedPage from '@/components/TrackedPage';
import AutoArticleSchema from '@/components/AutoArticleSchema';
import { images } from '@/lib/images';

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
  const description = `${location.name} retreats and treks in ${location.address.region}. ${location.tagline} Compare routes, seasons, access, stays, and trip planning.`;
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

  const retreatServices = premiumContent.retreatSlugs
    .map((s) => getRetreatServiceBySlug(s))
    .filter((s) => s !== undefined);

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

  // Split heading for green last word
  const h1Words = locationData.name.split(' ');
  const h1LastWord = h1Words[h1Words.length - 1];
  const h1Rest = h1Words.slice(0, -1).join(' ');

  const heroImage = premiumContent.heroImage || images.locations.zanskar.src;

  return (
    <TrackedPage page={`/locations/${slug}`} style={{ maxWidth: '100%', margin: '0 auto', padding: 0, overflowX: 'hidden' }}>
      <AutoArticleSchema
        title={`${locationData.name} — Retreats & Treks`}
        description={`${locationData.name} retreats and treks in ${locationData.address.region}. ${locationData.tagline}`}
        path={`/locations/${slug}`}
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
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } }

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

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }
        .med-section-dark { background: #111827; color: #fff; }

        .med-breadcrumb-wrap { padding: 1rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }

        .med-hero-section {
          position: relative;
          overflow: hidden;
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid rgba(15,118,110,0.12);
        }
        .med-hero-section .med-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(4,12,10,0.82) 0%, rgba(4,12,10,0.5) 45%, rgba(4,12,10,0.78) 100%);
        }
        .med-hero-section .med-hero-content {
          position: relative;
          z-index: 2;
          max-width: 58rem;
          width: 100%;
          padding: 5rem 1.5rem 4.5rem;
          text-align: center;
        }
        .med-hero-section .med-hero-content .med-h1 {
          font-family: var(--font-fraunces), Georgia, serif;
          font-size: clamp(2.3rem, 4.6vw, 3.4rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin: 0 0 1.1rem;
          line-height: 1.08;
          text-shadow: 0 3px 24px rgba(0,0,0,0.5);
        }
        .med-hero-section .med-hero-content .med-h1 span {
          color: #5eead4;
        }
        .med-hero-section .med-hero-content .med-body {
          max-width: 46rem;
          margin: 0 auto 1.5rem;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.85);
          text-shadow: 0 2px 14px rgba(0,0,0,0.45);
        }
        .med-hero-section .med-hero-content .med-hero-tags {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .med-hero-section .med-hero-content .med-hero-tags span {
          font-family: var(--font-inter), sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 999px;
          padding: 0.35rem 0.9rem;
          background: rgba(15,118,110,0.25);
        }
        .med-hero-section .med-hero-content .med-hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .med-section-padding { padding: 4rem 0; }
        .med-section-padding-sm { padding: 3rem 0; }

        .med-section-dark .med-eyebrow-text { color: rgba(255,255,255,0.6); }
        .med-section-dark .med-eyebrow-line { background: rgba(255,255,255,0.3); }
        .med-section-dark .med-h2 { color: #fff; }
        .med-section-dark .med-h2 span { color: #5eead4; }
        .med-section-dark .med-body { color: rgba(255,255,255,0.7); }

        /* ── Location Hub specific styles ── */
        .med-factor-card { padding: 1.5rem; background: #f7f9f7; border-radius: 12px; border: 1px solid rgba(15,118,110,0.06); }
        .med-factor-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.3rem; }
        .med-factor-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-place-card { border-left: 3px solid #0f766e; padding-left: 1.5rem; }
        .med-place-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.2rem; }
        .med-place-card .med-body { font-size: 0.92rem; margin-bottom: 0.2rem; }

        .med-service-card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          padding: 1.75rem;
          text-decoration: none;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          height: 100%;
        }
        .med-service-card:hover { transform: translateY(-4px); border-color: rgba(15,118,110,0.28); box-shadow: 0 16px 40px rgba(15,31,28,0.1); }
        .med-service-card .med-h3 { font-size: 1.15rem; margin-bottom: 0.5rem; color: #2B2A26; }
        .med-service-card .med-body { font-size: 0.92rem; margin-bottom: 1rem; flex-grow: 1; }
        .med-service-card .med-link { color: #0f766e; font-weight: 500; font-size: 0.85rem; }

        .med-season-card { border-left: 2px solid #0f766e; padding-left: 1.25rem; }
        .med-season-card .med-h3 { font-size: 1.05rem; margin-bottom: 0.2rem; }
        .med-season-card .med-body { font-size: 0.92rem; margin-bottom: 0; }

        .med-event-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding: 1.25rem 1.5rem;
          background: #fff;
          border-bottom: 1px solid rgba(15,118,110,0.08);
          text-decoration: none;
          transition: background 0.2s;
        }
        .med-event-row:last-child { border-bottom: none; }
        .med-event-row:hover { background: #f7f9f7; }
        .med-event-row .med-event-title { font-family: var(--font-inter), sans-serif; font-size: 1rem; font-weight: 500; color: #2B2A26; display: block; }
        .med-event-row .med-event-meta { font-family: var(--font-inter), sans-serif; font-size: 0.82rem; color: #6b7280; margin: 0.15rem 0 0; }
        .med-event-row .med-event-seats { font-family: var(--font-inter), sans-serif; font-size: 0.82rem; font-weight: 600; color: #0f766e; }
        .med-event-row .med-event-seats.low { color: #c92a2a; }

        .med-intent-card {
          padding: 1.5rem;
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.08);
          border-left: 3px solid #5eead4;
        }
        .med-intent-card .med-h3 { color: #fff; }
        .med-intent-card .med-body { color: rgba(255,255,255,0.7); }

        .med-gallery-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; margin-top: 2rem; }
        @media (max-width: 720px) { .med-gallery-grid { grid-template-columns: 1fr; } }
        .med-gallery-item { position: relative; width: 100%; aspect-ratio: 4/3; border-radius: 12px; overflow: hidden; }
        .med-gallery-item img { width: 100%; height: 100%; object-fit: cover; }

        .med-land-tone { font-size: 1.25rem; font-style: italic; max-width: 48rem; margin: 0 auto; color: #555; text-align: center; }

        .med-soft-card { padding: 1.25rem; background: #fff; border-radius: 12px; border: 1px solid rgba(15,118,110,0.08); }
        .med-soft-card .med-h3 { font-size: 1rem; margin-bottom: 0.2rem; }
        .med-soft-card .med-body { font-size: 0.88rem; margin-bottom: 0; }

        .med-beyond-card { padding: 1.25rem; background: #fff; border-radius: 12px; border: 1px solid rgba(15,118,110,0.08); }
        .med-beyond-card .med-h3 { font-size: 1rem; margin-bottom: 0.2rem; }
        .med-beyond-card .med-body { font-size: 0.88rem; margin-bottom: 0.2rem; }
        .med-beyond-card .med-duration { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; color: #0f766e; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
      `}</style>

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

      <div className="med-breadcrumb-wrap">
        <div className="med-outer">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Locations', href: '/locations' },
              { name: locationData.name },
            ]}
          />
        </div>
      </div>

      <article>

        {/* ── HERO ── */}
        <section className="med-shell med-hero-section">
          <div style={{ position: 'absolute', inset: 0 }}>
            <img
              className="med-hero-bg"
              src={heroImage}
              alt={premiumContent.heroImageAlt || locationData.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div className="med-hero-overlay" />
          </div>
          <div className="med-hero-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.3rem' }}>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 700 }}>
                {locationData.address.region}, India
              </span>
              <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
            </div>
            <h1 className="med-h1">
              {h1Rest} <span>{h1LastWord}</span>
            </h1>
            <p className="med-body">{locationData.tagline}</p>
            <div className="med-hero-tags">
              {'altitude' in locationData && <span>{(locationData as { altitude: number }).altitude.toLocaleString()}m Altitude</span>}
              {'nearestAirport' in locationData && <span>Base: {(locationData as { nearestAirport: string }).nearestAirport}</span>}
              {locationData.supportsRetreats && <span>Retreats</span>}
              {locationData.supportsTreks && <span>Treks</span>}
            </div>
            <div className="med-hero-actions">
              <a href="#offerings" className="med-cta-btn">Explore Offerings</a>
              <a href="#plan" className="med-cta-outline" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.45)' }}>Plan Your Trip</a>
            </div>
          </div>
        </section>

        {/* ── LAND TONE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <p className="med-land-tone">"{premiumContent.landTone.opening}"</p>
          </div>
        </section>

        {/* ── BRIDGING INNER WORK & MOVEMENT ── */}
        <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-grid-2" style={{ alignItems: 'start', gap: '3rem' }}>
              <div>
                <div className="med-eyebrow">
                  <span className="med-eyebrow-line" />
                  <span className="med-eyebrow-text">The Environment</span>
                </div>
                <h2 className="med-h2" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)' }}>
                  {premiumContent.bridgingInnerWorkMovement.title}
                </h2>
              </div>
              <div>
                <p className="med-body" style={{ fontSize: '1rem', lineHeight: '1.9' }}>
                  {premiumContent.bridgingInnerWorkMovement.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY INNER WORK SUCCEEDS HERE ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" />
              <span className="med-eyebrow-text">Experience Logic</span>
            </div>
            <h2 className="med-h2">{premiumContent.retreatLogic.title}</h2>

            <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
              {premiumContent.retreatLogic.factors.map((factor) => (
                <div key={factor.title} className="med-card med-factor-card">
                  <h3 className="med-h3">{factor.title}</h3>
                  <p className="med-body">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PLACES & LANDSCAPES ── */}
        {(premiumContent.placesAndLandscapes.length > 0 || premiumContent.gallery) && (
          <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
            <div className="med-outer">
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">The Landscape</span>
              </div>
              <h2 className="med-h2">Places & Sights</h2>

              <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
                {premiumContent.placesAndLandscapes.map((place) => (
                  <div key={place.name} className="med-place-card">
                    <h3 className="med-h3">{place.name}</h3>
                    <p className="med-body">{place.description}</p>
                    {place.season && (
                      <p className="med-body" style={{ fontSize: '0.8rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Best time: {place.season}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {premiumContent.gallery && premiumContent.gallery.length > 0 && (
                <div className="med-gallery-grid">
                  {premiumContent.gallery.map((img, idx) => (
                    <div key={idx} className="med-gallery-item">
                      <img src={img.src} alt={img.alt} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── SOFT EXPERIENCES ── */}
        {premiumContent.softExperiences && premiumContent.softExperiences.length > 0 && (
          <section className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
            <div className="med-inner">
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Experiences</span>
              </div>
              <h2 className="med-h2">Soft <span>Experiences</span></h2>
              <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
                {premiumContent.softExperiences.map((exp) => (
                  <div key={exp.name} className="med-card med-soft-card">
                    <h3 className="med-h3">{exp.name}</h3>
                    <p className="med-body">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── BEYOND RETREAT EXPERIENCES ── */}
        {premiumContent.beyondRetreatExperiences && premiumContent.beyondRetreatExperiences.length > 0 && (
          <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
            <div className="med-inner">
              <div className="med-eyebrow">
                <span className="med-eyebrow-line" />
                <span className="med-eyebrow-text">Beyond the Retreat</span>
              </div>
              <h2 className="med-h2">Beyond the <span>Retreat</span></h2>
              <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
                {premiumContent.beyondRetreatExperiences.map((exp) => (
                  <div key={exp.name} className="med-card med-beyond-card">
                    <h3 className="med-h3">{exp.name}</h3>
                    <span className="med-duration">{exp.duration}</span>
                    <p className="med-body" style={{ marginTop: '0.3rem' }}>{exp.description}</p>
                    {exp.bestTime && (
                      <p className="med-body" style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.2rem' }}>
                        Best time: {exp.bestTime}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── RETREAT INTENTIONS ── */}
        <section className="med-shell med-section-dark med-section-padding" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="med-inner">
            <div className="med-eyebrow">
              <span className="med-eyebrow-line" style={{ background: 'rgba(255,255,255,0.3)' }} />
              <span className="med-eyebrow-text" style={{ color: 'rgba(255,255,255,0.6)' }}>Who is this for</span>
            </div>
            <h2 className="med-h2">{premiumContent.intentionsFit.title}</h2>
            <p className="med-body" style={{ color: 'rgba(255,255,255,0.7)' }}>{premiumContent.intentionsFit.description}</p>

            <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
              {premiumContent.intentionsFit.intentions.map((intention) => (
                <div key={intention.title} className="med-card med-intent-card">
                  <h3 className="med-h3">{intention.title}</h3>
                  <p className="med-body">{intention.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DEEP TOPICAL CONTENT ── */}
        {premiumContent.deepTopicalContent && premiumContent.deepTopicalContent.length > 0 && (
          <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
            <div className="med-inner">
              {premiumContent.deepTopicalContent.map((section, idx) => (
                <div key={section.heading} style={{ marginBottom: idx === premiumContent.deepTopicalContent!.length - 1 ? 0 : '3rem' }}>
                  {idx === 0 && (
                    <div className="med-eyebrow">
                      <span className="med-eyebrow-line" />
                      <span className="med-eyebrow-text">Deep Dive</span>
                    </div>
                  )}
                  <h2 className="med-h2">{section.heading}</h2>
                  {section.body.split('\n\n').map((para, i) => (
                    <p key={i} className="med-body">
                      {para.split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
                        seg.startsWith('**') && seg.endsWith('**')
                          ? <strong key={j}>{seg.slice(2, -2)}</strong>
                          : seg
                      )}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── RETREATS & TREKS AVAILABLE ── */}
        {(retreatServices.length > 0 || trekContent.length > 0) && (
          <section id="offerings" className="med-shell med-section-alt med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
            <div className="med-outer">
              {retreatServices.length > 0 && (
                <div style={{ marginBottom: trekContent.length > 0 ? '3rem' : 0 }}>
                  <div className="med-eyebrow">
                    <span className="med-eyebrow-line" />
                    <span className="med-eyebrow-text">Offerings</span>
                  </div>
                  <h2 className="med-h2">Retreats in {locationData.name}</h2>
                  <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
                    {retreatServices.map((service) => (
                      <Link key={service.slug} href={`/retreats/journeys/${service.slug}`} className="med-service-card">
                        <h3 className="med-h3">{service.title}</h3>
                        <p className="med-body">{service.oneLineEssence}</p>
                        <span className="med-link">Explore Journey →</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {trekContent.length > 0 && (
                <div>
                  <div className="med-eyebrow">
                    <span className="med-eyebrow-line" />
                    <span className="med-eyebrow-text">Offerings</span>
                  </div>
                  <h2 className="med-h2">Treks from {locationData.name}</h2>
                  <div className="med-grid-2" style={{ marginTop: '1.8rem' }}>
                    {trekContent.map((trek) => (
                      <Link key={trek.slug} href={`/treks/location/${trek.locationId}/${trek.slug}`} className="med-service-card">
                        <h3 className="med-h3">{trek.title}</h3>
                        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                          <span className="med-season-tag" style={{ marginBottom: 0 }}>{trek.duration}</span>
                          <span className="med-season-tag" style={{ marginBottom: 0 }}>{trek.difficulty}</span>
                        </div>
                        <p className="med-body">{trek.description.slice(0, 140)}…</p>
                        <span className="med-link">Explore Trek →</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── PRACTICAL CONTEXT & SEASONAL CHARACTER ── */}
        <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-outer">
            <div className="med-grid-2" style={{ gap: '3rem' }}>
              <div>
                <div className="med-eyebrow">
                  <span className="med-eyebrow-line" />
                  <span className="med-eyebrow-text">Logistics</span>
                </div>
                <h2 className="med-h2">{premiumContent.practicalContext.title}</h2>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  <div style={{ borderBottom: '1px solid rgba(15,118,110,0.08)', paddingBottom: '1rem' }}>
                    <h3 className="med-h3" style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>Best Seasons</h3>
                    <p className="med-body" style={{ fontSize: '0.92rem' }}>{premiumContent.practicalContext.bestSeasons}</p>
                  </div>
                  <div style={{ borderBottom: '1px solid rgba(15,118,110,0.08)', paddingBottom: '1rem' }}>
                    <h3 className="med-h3" style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>Accessibility</h3>
                    <p className="med-body" style={{ fontSize: '0.92rem' }}>{premiumContent.practicalContext.accessibility}</p>
                  </div>
                  <div style={{ borderBottom: '1px solid rgba(15,118,110,0.08)', paddingBottom: '1rem' }}>
                    <h3 className="med-h3" style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>Crowd Profile</h3>
                    <p className="med-body" style={{ fontSize: '0.92rem' }}>{premiumContent.practicalContext.crowdProfile}</p>
                  </div>
                  <div>
                    <h3 className="med-h3" style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>Not For</h3>
                    <p className="med-body" style={{ fontSize: '0.92rem' }}>{premiumContent.practicalContext.notFor}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="med-eyebrow">
                  <span className="med-eyebrow-line" />
                  <span className="med-eyebrow-text">Seasons</span>
                </div>
                <h2 className="med-h2">{premiumContent.seasonalCharacter.title}</h2>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  {premiumContent.seasonalCharacter.seasons.map((season) => (
                    <div key={season.month} className="med-season-card">
                      <h3 className="med-h3">
                        {season.month} — <em style={{ fontWeight: 300 }}>{season.mood}</em>
                      </h3>
                      <p className="med-body">{season.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NETWORK CONTEXT ── */}
        <section className="med-shell med-section-alt med-section-padding-sm" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner" style={{ textAlign: 'center' }}>
            <p className="med-body">{premiumContent.networkContext}</p>
          </div>
        </section>

        {/* ── UPCOMING DEPARTURES ── */}
        {(() => {
          const now = new Date().toISOString().split('T')[0];
          const events = getEventsByLocation(locationData.id)
            .filter((e) => e.startDate >= now && e.status !== 'sold-out')
            .sort((a, b) => a.startDate.localeCompare(b.startDate))
            .slice(0, 3);
          if (events.length === 0) return null;
          return (
            <section className="med-shell med-section-white med-section-padding" style={{ borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
              <div className="med-inner">
                <h2 className="med-h2" style={{ textAlign: 'center' }}>Upcoming Departures in {locationData.name}</h2>
                <div style={{ border: '1px solid rgba(15,118,110,0.12)', borderRadius: '18px', overflow: 'hidden', marginTop: '1.5rem' }}>
                  {events.map((ev, i, arr) => (
                    <Link
                      key={ev.slug}
                      href={`/${ev.slug}`}
                      className="med-event-row"
                      style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(15,118,110,0.08)' : 'none' }}
                    >
                      <div>
                        <span className="med-event-title">{ev.label} — {ev.month} {ev.year}</span>
                        <p className="med-event-meta">{ev.dateRange} · {ev.durationDays} days · ₹{ev.price.toLocaleString('en-IN')}</p>
                      </div>
                      <span className={`med-event-seats ${ev.seatsLeft <= 3 ? 'low' : ''}`}>
                        {ev.seatsLeft} seats left →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })()}

        {/* ── CTA ── */}
        <section id="plan" className="med-shell med-section-alt med-section-padding">
          <div className="med-inner" style={{ textAlign: 'center' }}>
            <p className="med-body" style={{ fontSize: '1.15rem', maxWidth: '40rem', margin: '0 auto 1.5rem' }}>
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
          </div>
        </section>

        {/* ── FOOTER NAV ── */}
        <nav className="med-shell med-section-white" style={{ padding: '2.5rem 0', borderTop: '1px solid rgba(15,118,110,0.08)' }}>
          <div className="med-inner">
            <div className="med-nav-grid">
              <Link href="/locations" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>← All Locations</span>
              </Link>
              <Link href={`/locations/${slug}/treks`} className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Treks in {locationData.name}</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href={`/locations/${slug}/retreats`} className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Retreats in {locationData.name}</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
              <Link href="/find-your-retreat" className="med-card" style={{ padding: '0.85rem 1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="med-body" style={{ margin: 0, fontWeight: 500 }}>Find Your Retreat</span>
                <span style={{ color: '#0f766e' }}>→</span>
              </Link>
            </div>
          </div>
        </nav>

      </article>
    </TrackedPage>
  );
}