import Link from 'next/link';
import { getUpcomingEvents } from '@/config/retreatProgramEvents';
import { getRetreatServiceBySlug } from '@/content/retreats/services';
import type { LocationPremiumContent } from '@/content/locations';
import {
  LocationBridge,
  LocationCTA,
  LocationFAQ,
  LocationHero,
  LocationLandTone,
  LocationPlaces,
  LocationPractical,
  LocationReading,
  LocationRetreatLogic,
  LocationRetreatServices,
  LocationSeasonal,
  LocationSoftExperiences,
} from '@/components/Retreats/Location';
import PrimaryCTA from '@/components/PrimaryCTA';

interface ArtRetreatLocationPageProps {
  content: LocationPremiumContent;
  path: string;
}

export default function ArtRetreatLocationPage({ content, path }: ArtRetreatLocationPageProps) {
  const artService = getRetreatServiceBySlug('art-and-creative');
  const events = getUpcomingEvents().filter(
    (event) => event.locationId === content.id && event.serviceSlug === 'art-and-creative',
  );
  const artContext = artService
    ? Object.entries(artService.whereItWorksBest.contextByLocation).find(([id]) => id === content.id)?.[1]
    : undefined;
  const artServices = artService ? [artService] : [];
  const whatsappLink = `https://wa.me/919760446101?text=${encodeURIComponent(
    `Hi, I'm interested in an art retreat in ${content.name}. Please share upcoming dates, pricing, and availability.`,
  )}`;

  return (
    <main>
      <LocationHero
        name={`${content.name} Art Retreat`}
        opening={content.landTone.opening}
        heroImage={content.heroImage}
        heroImageAlt={content.heroImageAlt}
        stats={['Art & creative practice', content.name, 'Small groups', 'Dates on enquiry']}
        tags={['Art Retreats', content.name, 'Beginner Friendly']}
      />

      <LocationLandTone name={content.name} opening={content.landTone.opening} />

      <section style={{ maxWidth: '52rem', margin: '0 auto', padding: '4rem 2rem' }}>
        <p style={{ margin: '0 0 0.75rem', color: '#0f766e', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Art in {content.name}
        </p>
        <h2 style={{ margin: '0 0 1rem' }}>Why this landscape suits creative practice</h2>
        <p style={{ margin: 0, lineHeight: 1.8 }}>
          {artContext ?? `The art retreat uses the existing ${content.name} setting as its creative environment.`}
        </p>
      </section>

      <LocationBridge
        title={content.bridgingInnerWorkMovement.title}
        description={content.bridgingInnerWorkMovement.description}
      />
      <LocationRetreatLogic title={content.retreatLogic.title} factors={content.retreatLogic.factors} />
      <LocationRetreatServices
        locationName={content.name}
        services={artServices}
        locationId={content.id}
      />

      {events.length > 0 && (
        <section style={{ padding: '4rem 2rem', background: '#f7f9f7' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
            <h2>Upcoming art retreat dates in {content.name}</h2>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
              {events.map((event) => (
                <article key={event.slug} style={{ background: '#fff', border: '1px solid rgba(15,118,110,0.12)', borderRadius: '12px', padding: '1.25rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem' }}>{event.label}</h3>
                  <p style={{ margin: '0 0 0.75rem', lineHeight: 1.7 }}>
                    {event.dateRange} · {event.durationDays} days · ₹{event.price.toLocaleString('en-IN')} · {event.seatsLeft} seats left
                  </p>
                  <Link href={`/${event.slug}`} style={{ color: '#0f766e', fontWeight: 600 }}>
                    View this departure
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {content.placesAndLandscapes.length > 0 && (
        <LocationPlaces locationName={content.name} places={content.placesAndLandscapes} />
      )}
      {content.softExperiences.length > 0 && (
        <LocationSoftExperiences experiences={content.softExperiences} />
      )}
      {content.beyondRetreatExperiences && content.beyondRetreatExperiences.length > 0 && (
        <LocationSoftExperiences
          experiences={content.beyondRetreatExperiences.map((experience) => ({
            name: experience.name,
            type: 'exploration' as const,
            description: `${experience.duration}. ${experience.description}`,
          }))}
        />
      )}
      <LocationPractical data={content.practicalContext} />
      <LocationSeasonal title={content.seasonalCharacter.title} seasons={content.seasonalCharacter.seasons} />

      {content.faq && content.faq.length > 0 && (
        <LocationFAQ locationName={content.name} faqs={content.faq} />
      )}
      {content.relatedBlogSlugs.length > 0 && (
        <LocationReading locationName={content.name} slugs={content.relatedBlogSlugs} />
      )}

      <section style={{ maxWidth: '52rem', margin: '0 auto', padding: '2rem' }}>
        <p style={{ margin: '0 0 1rem', lineHeight: 1.8 }}>
          Need information about art activities, accommodation, facilitator details, group size, or dates for {content.name}?
        </p>
        <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{ color: '#0f766e', fontWeight: 600 }}>
          Ask About Upcoming Dates
        </Link>
      </section>

      <PrimaryCTA
        label="Check Dates / Enquire"
        subtext={`Ask about the ${content.name} art retreat, including dates, pricing, accommodation, and availability.`}
        vertical="retreat"
        category="art-and-creative"
        sourcePath={path}
        location={content.name}
      />

      <LocationCTA
        locationId={content.id}
        networkContext={content.networkContext}
        ctaText={content.ctaText}
        whatsappLink={whatsappLink}
      />
      <p style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem 3rem', textAlign: 'center' }}>
        <Link href="/retreats/art" style={{ color: '#0f766e' }}>
          Explore all Himalayan art retreats
        </Link>
      </p>
    </main>
  );
}
