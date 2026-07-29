'use client';

import { useEffect } from 'react';
import type { LocationId } from '@/config/locations';
import MicroCommitment from '@/components/MicroCommitment';
import ArtFixedDepartures from '@/components/ArtFixedDepartures';
import { getFacilitatorsByRetreat } from '@/config/facilitators';
import {
  JourneyHero,
  JourneyAbout,
  JourneyForNotFor,
  JourneyMidCTA,
  JourneyHowItWorks,
  JourneyCTA,
  JourneyIdealIf,
  JourneyUnique,
  JourneyExperiences,
  JourneyPlaces,
  JourneyLocations,
  JourneyPractical,
  JourneyAdaptability,
  JourneyRelatedTrek,
} from '@/components/Retreats/Journey';

interface Location {
  id: LocationId;
  name: string;
  tagline: string;
}

interface RetreatService {
  readonly title: string;
  readonly oneLineEssence: string;
  readonly description: string;
  readonly keyHighlights?: readonly string[];
  readonly heroImage?: string;
  readonly heroAlt?: string;
  readonly signatureImage?: string;
  readonly signatureAlt?: string;
  readonly signatureQuote?: string;
  readonly galleryImages?: readonly { readonly src: string; readonly alt: string; readonly objectPosition?: string }[];
  readonly forNotFor: {
    readonly for: readonly string[];
    readonly notFor: readonly string[];
  };
  readonly idealIf?: readonly string[];
  readonly whatMakesItUnique?: {
    readonly intro: string;
    readonly points: readonly { readonly title: string; readonly description: string }[];
  };
  readonly experiences?: readonly { readonly title: string; readonly description: string }[];
  readonly placesWeExplore?: readonly { readonly name: string; readonly description: string }[];
  readonly howItWorks: {
    readonly rhythm: string;
  };
  readonly foodAndAccommodation?: string;
  readonly locationInfo?: {
    readonly name: string;
    readonly description: string;
  };
  readonly travel?: {
    readonly fromDelhi: string;
    readonly fromDehradun: string;
    readonly note: string;
  };
  readonly whereItWorksBest: {
    readonly primary: string;
    readonly primaryReason: string;
    readonly alsoWorks: readonly string[];
    readonly contextByLocation: Readonly<Record<string, string>>;
  };
  readonly adaptability: string;
  readonly invitation: string;
}

interface SuggestedTrek {
  slug: string;
  title: string;
  locationId: string;
}

interface RetreatJourneyClientProps {
  retreat: RetreatService;
  locations: Location[];
  suggestedTrek?: SuggestedTrek;
  retreatSlug: string;
}

export default function RetreatJourneyClient({
  retreat,
  locations,
  suggestedTrek,
  retreatSlug,
}: RetreatJourneyClientProps) {
  const isYogaJourney = retreatSlug === 'yoga-and-movement';
  const isTrekPaintJourney = retreatSlug === 'trek-and-paint';
  const trekPaintFacilitator = isTrekPaintJourney ? getFacilitatorsByRetreat('trek-and-paint')[0] : undefined;

  useEffect(() => {
    const init = () => {
      const els = document.querySelectorAll('.scroll-fade, .scroll-fade-stagger');
      if (!els.length) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('sf-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      els.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    };
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(init, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    } else {
      const tid = setTimeout(init, 500);
      return () => clearTimeout(tid);
    }
  }, []);

  return (
    <div style={{ width: '100%' }}>
      {/* 1. HERO — full-bleed: breaks out of any padded ancestor container so it
          always spans the full viewport width, regardless of what wraps this page. */}
      <div
        style={{
          position: 'relative',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          maxWidth: '100vw',
        }}
      >
        <JourneyHero
          title={retreat.title}
          oneLineEssence={retreat.oneLineEssence}
          keyHighlights={retreat.keyHighlights}
          heroImage={retreat.heroImage}
          heroAlt={retreat.heroAlt}
          isYogaJourney={isYogaJourney}
        />
      </div>

      <ArtFixedDepartures mode="single" retreatSlug={retreatSlug} />

      {/* 2. ABOUT */}
      <JourneyAbout
        description={retreat.description}
        galleryImages={retreat.galleryImages}
      />

      {/* 3. YOGA OFFERINGS - Only for yoga-and-movement */}
      {retreatSlug === 'yoga-and-movement' && (
        <section className="rj-yoga-offerings-section">
          {/* yoga offerings code */}
        </section>
      )}

      {/* 4. MICRO COMMITMENT */}
      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '1.5rem 2rem' }}>
        <MicroCommitment
          itemKey={retreat.title.toLowerCase().replace(/\s+/g, '-')}
          title={`Save: ${retreat.title}`}
          sourcePath={`/retreats/journeys/${retreat.title.toLowerCase().replace(/\s+/g, '-')}`}
        />
      </div>

      {/* 5. FOR / NOT FOR */}
      <JourneyForNotFor
        title={retreat.title}
        forItems={retreat.forNotFor.for}
        notForItems={retreat.forNotFor.notFor}
      />

      {/* 6. MID CTA */}
      <JourneyMidCTA />

      {/* 7. IDEAL IF */}
      {retreat.idealIf && retreat.idealIf.length > 0 && (
        <JourneyIdealIf idealIf={retreat.idealIf} title={retreat.title} />
      )}

      {/* 8. UNIQUE */}
      {retreat.whatMakesItUnique && (
        <JourneyUnique
          intro={retreat.whatMakesItUnique.intro}
          points={retreat.whatMakesItUnique.points}
        />
      )}

      {/* 9. EXPERIENCES */}
      {retreat.experiences && retreat.experiences.length > 0 && (
        <JourneyExperiences experiences={retreat.experiences} />
      )}

      {/* 10. PLACES */}
      {retreat.placesWeExplore && retreat.placesWeExplore.length > 0 && (
        <JourneyPlaces places={retreat.placesWeExplore} />
      )}

      {/* 11. HOW IT WORKS */}
      <JourneyHowItWorks rhythm={retreat.howItWorks.rhythm} />

      {/* 12. LOCATIONS */}
      <JourneyLocations
        primary={retreat.whereItWorksBest.primary}
        primaryReason={retreat.whereItWorksBest.primaryReason}
        locations={locations}
        contextByLocation={retreat.whereItWorksBest.contextByLocation}
      />

      {/* 13. PRACTICAL */}
      <JourneyPractical
        foodAndAccommodation={retreat.foodAndAccommodation}
        travel={retreat.travel}
        locationInfo={retreat.locationInfo}
      />

      {/* 14. ADAPTABILITY */}
      <JourneyAdaptability adaptability={retreat.adaptability} />

      {/* 15. RELATED TREK */}
      {suggestedTrek && <JourneyRelatedTrek suggestedTrek={suggestedTrek} />}

      {/* 16. CTA */}
      <JourneyCTA title={retreat.title} invitation={retreat.invitation} />
    </div>
  );
}
