'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { LocationPremiumContent } from '@/content/locations';
import { getAllLocationContent } from '@/content/locations';
import { getLocationById } from '@/lib/locations';
import type { RetreatContent } from '@/types/content';
import type { RetreatService } from '@/content/retreats/services';
import { logLocationEntry, logWhatsAppOpen } from '@/lib/analytics';

// Import Location Components
import {
  LocationHero,
  LocationLandTone,
  LocationBridge,
  LocationRetreatLogic,
  LocationRetreatServices,
  LocationBeyondRetreat,
  LocationPlaces,
  LocationSoftExperiences,
  LocationPractical,
  LocationSeasonal,
  LocationReading,
  LocationDiscover,
  LocationCTA,
  LocationFAQ,
} from '@/components/Retreats/Location';

interface RetreatsLocationClientProps {
  locationPremiumContent: LocationPremiumContent;
  retreats: RetreatContent[];
  retreatServices: RetreatService[];
  treks: any[];
  locationId: string;
}

export default function RetreatsLocationClient({
  locationPremiumContent,
  retreats,
  retreatServices,
  treks,
  locationId,
}: RetreatsLocationClientProps) {
  useEffect(() => {
    logLocationEntry(locationId, document.referrer);
    console.log(`[${locationPremiumContent.name}] Treks received:`, treks.length, treks);
    console.log(`[${locationPremiumContent.name}] Retreat services:`, retreatServices.length);
  }, [locationId, treks, locationPremiumContent.name, retreatServices]);

  const whatsappMessage = `Hi, I'm interested in learning more about journeys in ${locationPremiumContent.name}.`;
  const whatsappLink = `https://wa.me/919760446101?text=${encodeURIComponent(whatsappMessage)}`;

  // Get other locations for discover section
  const allLocations = getAllLocationContent()
    .filter((loc) => loc.id !== locationPremiumContent.id)
    .filter((loc) => getLocationById(loc.id as any)?.supportsRetreats)
    .map((loc) => ({
      id: loc.id,
      name: loc.name,
      opening: loc.landTone.opening,
    }));

  return (
    <main style={{ maxWidth: '56rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Guide Banner - Inline */}
      <div style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        background: '#f0f7f0',
        borderBottom: '1px solid #d4e8d4',
      }}>
        <div style={{
          maxWidth: '64rem',
          margin: '0 auto',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.52rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#374151',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>Guide</span>
          <div style={{ width: '1px', height: '14px', background: 'rgba(184,137,90,0.2)', flexShrink: 0 }} />
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.82rem',
            fontWeight: 300,
            lineHeight: 1.5,
            color: '#555555',
            margin: 0,
          }}>
            For a broader understanding of formats, seasonal differences, and how mountain retreats are
            structured across regions, see our complete guide to{' '}
            <Link href="/retreats/himalayan-retreats" style={{
              color: '#374151',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(184,137,90,0.3)',
            }}>
              Himalayan Retreats in India
            </Link>
            .
          </p>
        </div>
      </div>

      {/* 1. HERO */}
      <div
        style={{
          position: 'relative',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          maxWidth: '100vw',
        }}
      >
        <LocationHero
          name={locationPremiumContent.name}
          opening={locationPremiumContent.landTone.opening}
          heroImage={locationPremiumContent.heroImage}
          heroImageAlt={locationPremiumContent.heroImageAlt}
        />
      </div>

      {/* 2. LAND TONE */}
      <LocationLandTone
        name={locationPremiumContent.name}
        opening={locationPremiumContent.landTone.opening}
      />

      {/* 3. FAQ */}
      {locationPremiumContent.faq && locationPremiumContent.faq.length > 0 && (
        <LocationFAQ
          locationName={locationPremiumContent.name}
          faqs={locationPremiumContent.faq}
        />
      )}

      {/* 4. BRIDGE - INNER WORK */}
      <LocationBridge
        title={locationPremiumContent.bridgingInnerWorkMovement.title}
        description={locationPremiumContent.bridgingInnerWorkMovement.description}
      />

      {/* 5. RETREAT LOGIC */}
      <LocationRetreatLogic
        title={locationPremiumContent.retreatLogic.title}
        factors={locationPremiumContent.retreatLogic.factors}
      />

      {/* 6. RETREAT SERVICES */}
      {retreatServices.length > 0 && (
        <LocationRetreatServices
          locationName={locationPremiumContent.name}
          services={retreatServices}
          locationId={locationId}
        />
      )}

      {/* 7. BEYOND RETREAT EXPERIENCES / TREKS */}
      {locationPremiumContent.beyondRetreatExperiences &&
        locationPremiumContent.beyondRetreatExperiences.length > 0 ? (
        <LocationBeyondRetreat
          locationName={locationPremiumContent.name}
          experiences={locationPremiumContent.beyondRetreatExperiences}
          type="experiences"
        />
      ) : treks.length > 0 ? (
        <LocationBeyondRetreat
          locationName={locationPremiumContent.name}
          experiences={treks}
          type="treks"
        />
      ) : null}

      {/* 8. PLACES & LANDSCAPES */}
      {locationPremiumContent.placesAndLandscapes.length > 0 && (
        <LocationPlaces
          locationName={locationPremiumContent.name}
          places={locationPremiumContent.placesAndLandscapes}
        />
      )}

      {/* 9. SOFT EXPERIENCES */}
      {locationPremiumContent.softExperiences.length > 0 && (
        <LocationSoftExperiences experiences={locationPremiumContent.softExperiences} />
      )}

      {/* 10. PRACTICAL CONTEXT */}
      <LocationPractical data={locationPremiumContent.practicalContext} />

      {/* 11. SEASONAL CHARACTER */}
      <LocationSeasonal
        title={locationPremiumContent.seasonalCharacter.title}
        seasons={locationPremiumContent.seasonalCharacter.seasons}
      />

      {/* 12. READING FROM THIS LAND */}
      {locationPremiumContent.relatedBlogSlugs.length > 0 && (
        <LocationReading
          locationName={locationPremiumContent.name}
          slugs={locationPremiumContent.relatedBlogSlugs}
        />
      )}

      {/* 13. DISCOVER OTHER LOCATIONS */}
      <LocationDiscover
        currentLocationId={locationPremiumContent.id}
        locations={allLocations}
      />

      {/* 14. CTA */}
      <LocationCTA
        locationId={locationId}
        networkContext={locationPremiumContent.networkContext}
        ctaText={locationPremiumContent.ctaText}
        whatsappLink={whatsappLink}
      />
    </main>
  );
}