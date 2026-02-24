'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { LocationPremiumContent } from '@/content/locations';
import { getAllLocationContent } from '@/content/locations';
import type { RetreatContent } from '@/types/content';
import type { RetreatService } from '@/content/retreats/services';
import {
  logLocationEntry,
  logWhatsAppOpen,
} from '@/lib/analytics';

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
    // DEBUG: Verify treks are arriving
    console.log(`[${locationPremiumContent.name}] Treks received:`, treks.length, treks);
    console.log(`[${locationPremiumContent.name}] Retreat services:`, retreatServices.length);
  }, [locationId, treks, locationPremiumContent.name, retreatServices]);

  const whatsappMessage = `Hi, I'm interested in learning more about journeys in ${locationPremiumContent.name}.`;
  const whatsappLink = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main style={{ maxWidth: '56rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      {/* SECTION 1: OPENING — THE LAND ITSELF */}
      <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
        <p
          style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: 'var(--color-text)',
            margin: 0,
            fontWeight: 400,
          }}
        >
          {locationPremiumContent.landTone.opening}
        </p>
      </section>

      {/* SECTION 2: BRIDGE INNER WORK & MOVEMENT */}
      <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>
          {locationPremiumContent.bridgingInnerWorkMovement.title}
        </h2>
        <p style={{ marginTop: 0, marginBottom: 0, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-text)' }}>
          {locationPremiumContent.bridgingInnerWorkMovement.description}
        </p>
      </section>

      {/* SECTION 3: WHY INNER WORK SUCCEEDS HERE */}
      <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '2rem', fontSize: '1.125rem', fontWeight: 600 }}>
          {locationPremiumContent.retreatLogic.title}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {locationPremiumContent.retreatLogic.factors.map((factor, idx) => (
            <div key={idx}>
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>
                {factor.title}
              </h3>
              <p style={{ marginTop: 0, marginBottom: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text)' }}>
                {factor.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: RETREAT SERVICES POSSIBLE IN THIS LOCATION */}
      {retreatServices.length > 0 && (
        <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
          <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>
            🏔️ Retreat Services
          </h2>
          <p style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '0.95rem', color: 'var(--color-muted)' }}>
            These retreat journeys align naturally with what {locationPremiumContent.name} offers:
          </p>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {retreatServices.map((service) => (
              <Link
                key={service.slug}
                href={`/retreats/journeys/${service.slug}`}
                style={{
                  padding: '1.5rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  color: 'var(--color-text)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.backgroundColor = '#fafafa';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>
                  {service.title}
                </h3>
                <p style={{ marginTop: 0, marginBottom: 0, fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--color-muted)' }}>
                  {service.oneLineEssence}
                </p>
                <div style={{ marginTop: '0.75rem', color: 'var(--color-primary)', fontWeight: 500, fontSize: '0.9rem' }}>
                  Learn more →
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 5: TREKS & OUTDOOR JOURNEYS */}
      <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>
          🥾 Treks from {locationPremiumContent.name}
        </h2>
        {treks.length > 0 ? (
          <>
            <p style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '0.95rem', color: 'var(--color-muted)' }}>
              Summit routes and mountain journeys. Choose by difficulty, duration, and season:
            </p>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {treks.map((trek) => (
                <Link
                  key={trek.slug}
                  href={`/treks/${trek.slug}`}
                  style={{
                    padding: '1.5rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none',
                    color: 'var(--color-text)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                    e.currentTarget.style.backgroundColor = '#fafafa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>
                    {trek.title}
                  </h3>
                  <p style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--color-text)' }}>
                    {trek.description}
                  </p>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>
                    {trek.difficulty && (
                      <div>
                        <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>Difficulty:</span> {trek.difficulty}
                      </div>
                    )}
                    {trek.duration && (
                      <div>
                        <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>Duration:</span> {trek.duration}
                      </div>
                    )}
                    {trek.distance && (
                      <div>
                        <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>Distance:</span> {trek.distance}
                      </div>
                    )}
                  </div>
                  {trek.bestSeason && trek.bestSeason.length > 0 && (
                    <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                      <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>Best season:</span> {trek.bestSeason.join(', ')}
                    </div>
                  )}
                  <div style={{ marginTop: '1rem', color: 'var(--color-primary)', fontWeight: 500, fontSize: '0.9rem' }}>
                    View {trek.title} details →
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <p style={{ marginTop: 0, marginBottom: 0, fontSize: '0.95rem', color: 'var(--color-muted)', fontStyle: 'italic' }}>
            Trek routes from {locationPremiumContent.name} are being developed. Contact us to discuss custom trekking experiences in this region.
          </p>
        )}
      </section>

      {/* SECTION 6: PLACES & LANDSCAPES */}
      {locationPremiumContent.placesAndLandscapes.length > 0 && (
        <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
          <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>
            🌲 Places & Landscapes
          </h2>
          <p style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '0.95rem', color: 'var(--color-muted)' }}>
            Sights, natural wonders, villages, and spaces that define {locationPremiumContent.name}:
          </p>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {locationPremiumContent.placesAndLandscapes.map((place, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.5rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#fafafa',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ marginTop: 0, marginBottom: 0, fontSize: '1rem', fontWeight: 600 }}>
                    {place.name}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)', fontWeight: 400, textTransform: 'capitalize' }}>
                    {place.type}
                  </span>
                  {place.season && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 500 }}>
                      {place.season}
                    </span>
                  )}
                </div>
                <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-text)' }}>
                  {place.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 7: SOFT EXPERIENCES */}
      {locationPremiumContent.softExperiences.length > 0 && (
        <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
          <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>
            ✨ Soft Experiences
          </h2>
          <p style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '0.95rem', color: 'var(--color-muted)' }}>
            Non-product ways to be: quiet walks, seasonal phenomena, cultural moments, simple presence.
          </p>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {locationPremiumContent.softExperiences.map((exp, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.25rem',
                  border: '1px solid #e0e0e0',
                  borderLeft: '3px solid var(--color-primary)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#fafafa',
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '0.95rem', fontWeight: 600 }}>
                  {exp.name}
                </h3>
                <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-text)' }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 8: PRACTICAL CONTEXT */}
      <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: 600 }}>
          {locationPremiumContent.practicalContext.title}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>Best Seasons</h3>
            <p style={{ marginTop: 0, marginBottom: 0, color: 'var(--color-text)' }}>
              {locationPremiumContent.practicalContext.bestSeasons}
            </p>
          </div>
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>Accessibility</h3>
            <p style={{ marginTop: 0, marginBottom: 0, color: 'var(--color-text)' }}>
              {locationPremiumContent.practicalContext.accessibility}
            </p>
          </div>
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>Crowd Profile</h3>
            <p style={{ marginTop: 0, marginBottom: 0, color: 'var(--color-text)' }}>
              {locationPremiumContent.practicalContext.crowdProfile}
            </p>
          </div>
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>Not Ideal For</h3>
            <p style={{ marginTop: 0, marginBottom: 0, color: 'var(--color-text)' }}>
              {locationPremiumContent.practicalContext.notFor}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: SEASONAL & ENVIRONMENTAL CHARACTER */}
      <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: 600 }}>
          {locationPremiumContent.seasonalCharacter.title}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {locationPremiumContent.seasonalCharacter.seasons.map((season, idx) => (
            <div key={idx}>
              <h3 style={{ marginTop: 0, marginBottom: '0.25rem', fontSize: '0.95rem', fontWeight: 600 }}>
                {season.month}{' '}
                <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--color-muted)' }}>
                  — {season.mood}
                </span>
              </h3>
              <p style={{ marginTop: '0.25rem', marginBottom: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-text)' }}>
                {season.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10: READING FROM THIS LAND */}
      {locationPremiumContent.relatedBlogSlugs.length > 0 && (
        <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
          <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>
            📖 Reading from This Land
          </h2>
          <p style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '0.95rem', color: 'var(--color-muted)' }}>
            Stories, essays, and reflections that deepen understanding of {locationPremiumContent.name}:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {locationPremiumContent.relatedBlogSlugs.map((slug, idx) => {
              // Create human-readable titles from slugs
              const titles: Record<string, string> = {
                'chakrata-vs-sankri': 'Chakrata vs Sankri: Two Mountains, Two Medicines',
                'chakrata-vs-mussoorie-weekend-trip': 'Chakrata vs Mussoorie: Forest vs Romance for Weekend Retreat',
                'trek-vs-retreat': 'Trek vs Retreat: What Are You Really Seeking?',
              };
              const title = titles[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
              
              return (
                <Link
                  key={idx}
                  href={`/blog/${slug}`}
                  style={{
                    padding: '1rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none',
                    color: 'var(--color-text)',
                    transition: 'all 0.2s ease',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fafafa';
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#e0e0e0';
                  }}
                >
                  <h3 style={{ marginTop: 0, marginBottom: '0.25rem', fontSize: '0.95rem', fontWeight: 600 }}>
                    {title}
                  </h3>
                  <p style={{ marginTop: '0.25rem', marginBottom: 0, fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                    Read in /blog →
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* SECTION 10.5: DISCOVER OTHER LOCATIONS */}
      <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>
          🗺️ Discover Other Locations
        </h2>
        <p style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '0.95rem', color: 'var(--color-muted)' }}>
          Each land holds a different rhythm. If {locationPremiumContent.name} is not your place, another might be.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {getAllLocationContent()
            .filter((loc) => loc.id !== locationPremiumContent.id)
            .map((loc) => (
              <Link
                key={loc.id}
                href={`/retreats/${loc.id}`}
                style={{
                  padding: '1.5rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  color: 'var(--color-text)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.backgroundColor = '#fafafa';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 600 }}>
                  {loc.name}
                </h3>
                <p style={{ marginTop: 0, marginBottom: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-text)' }}>
                  {loc.landTone.opening}
                </p>
                <div style={{ marginTop: '1rem', color: 'var(--color-primary)', fontWeight: 500, fontSize: '0.9rem' }}>
                  Discover {loc.name} →
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* SECTION 11: NETWORK CONTEXT & CTA */}
      <section style={{ marginBottom: '3rem' }}>
        <p style={{ marginTop: 0, marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-text)' }}>
          {locationPremiumContent.networkContext}
        </p>
        <p style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-text)' }}>
          {locationPremiumContent.ctaText}
        </p>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href={whatsappLink}
            onClick={() => {
              logWhatsAppOpen(locationId, 'location-hub');
            }}
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.25rem',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
              transition: 'opacity 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.opacity = '1';
            }}
          >
            WhatsApp Us
          </Link>
          <Link
            href="/retreats"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.25rem',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fafafa';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            All Retreats
          </Link>
        </div>
      </section>
    </main>
  );
}
