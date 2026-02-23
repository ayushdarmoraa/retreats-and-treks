'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import TrekCard from '@/components/TrekCard';
import { getAllTreks, getTreksGroupedByLocation } from '@/lib/treks';
import { getAllLocations } from '@/lib/locations';

export default function TreksClient() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  // Get all treks from registry
  const allTreks = getAllTreks();
  const treksGroupedByLocation = getTreksGroupedByLocation();
  const locations = getAllLocations();

  // Determine available filters based on data
  const availableDifficulties = useMemo(() => {
    const difficulties = new Set(allTreks.map((t) => {
      if (t.difficulty.includes('Moderate') && t.difficulty.includes('Easy')) return 'easy-moderate';
      if (t.difficulty === 'Easy') return 'easy';
      if (t.difficulty === 'Moderate') return 'moderate';
      if (t.difficulty === 'Challenging') return 'hard';
      return 'moderate';
    }));
    return Array.from(difficulties).sort();
  }, [allTreks]);

  const availableDurations = useMemo(() => {
    const durations = new Set(allTreks.map((t) => {
      if (t.duration.includes('Half day') || t.duration.includes('1 day') || t.duration.includes('2') || t.duration.includes('3')) return 'weekend';
      return 'multiday';
    }));
    return Array.from(durations).sort();
  }, [allTreks]);

  // Filter logic
  const filterTreks = (treks: typeof allTreks) => {
    return treks.filter((trek) => {
      if (selectedDestination && trek.locationId !== selectedDestination) return false;
      
      if (selectedDifficulty) {
        const trekDifCategory = trek.difficulty.includes('Moderate') && trek.difficulty.includes('Easy') ? 'easy-moderate' :
                                trek.difficulty === 'Easy' ? 'easy' :
                                trek.difficulty === 'Moderate' ? 'moderate' : 'hard';
        if (trekDifCategory !== selectedDifficulty) return false;
      }
      
      if (selectedDuration) {
        const trekDurCategory = (trek.duration.includes('Half day') || trek.duration.includes('1 day') || trek.duration.includes('2') || trek.duration.includes('3')) ? 'weekend' : 'multiday';
        if (trekDurCategory !== selectedDuration) return false;
      }
      
      return true;
    });
  };

  const filteredTreks = filterTreks(allTreks);
  const filteredByLocation = selectedDestination
    ? { [selectedDestination]: filterTreks(treksGroupedByLocation[selectedDestination] || []) }
    : Object.fromEntries(
        locations.map((loc: typeof locations[number]) => [
          loc.id,
          filterTreks(treksGroupedByLocation[loc.id] || []),
        ])
      );

  const hasAnyTreks = filteredTreks.length > 0;

  return (
    <div style={{ maxWidth: '72rem', margin: '0 auto', padding: 'var(--space-lg) var(--space-md)' }}>
      {/* SECTION 1: HERO */}
      <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Trekking in the Himalayas</h1>
        <p style={{ fontSize: '1rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.5 }}>
          Browse treks by destination, difficulty, and duration.
        </p>
      </section>

      {/* SECTION 2: FILTER BAR */}
      <section
        style={{
          marginBottom: '2.5rem',
          padding: '1.25rem',
          backgroundColor: '#f9f9f9',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {/* Destination Filter */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
              Destination
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedDestination(null)}
                style={{
                  padding: '0.4rem 0.9rem',
                  border: selectedDestination === null ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  borderRadius: '0.25rem',
                  backgroundColor: selectedDestination === null ? 'var(--color-primary)' : '#fff',
                  color: selectedDestination === null ? '#fff' : 'var(--color-text)',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                All
              </button>
              {locations.map((location: typeof locations[number]) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedDestination(location.id)}
                  style={{
                    padding: '0.4rem 0.9rem',
                    border: selectedDestination === location.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    borderRadius: '0.25rem',
                    backgroundColor: selectedDestination === location.id ? 'var(--color-primary)' : '#fff',
                    color: selectedDestination === location.id ? '#fff' : 'var(--color-text)',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {location.name}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
              Difficulty
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedDifficulty(null)}
                style={{
                  padding: '0.4rem 0.9rem',
                  border: selectedDifficulty === null ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  borderRadius: '0.25rem',
                  backgroundColor: selectedDifficulty === null ? 'var(--color-primary)' : '#fff',
                  color: selectedDifficulty === null ? '#fff' : 'var(--color-text)',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                All
              </button>
              {availableDifficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  style={{
                    padding: '0.4rem 0.9rem',
                    border: selectedDifficulty === diff ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    borderRadius: '0.25rem',
                    backgroundColor: selectedDifficulty === diff ? 'var(--color-primary)' : '#fff',
                    color: selectedDifficulty === diff ? '#fff' : 'var(--color-text)',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {diff === 'easy-moderate' ? 'Moderate' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>
              Duration
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedDuration(null)}
                style={{
                  padding: '0.4rem 0.9rem',
                  border: selectedDuration === null ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  borderRadius: '0.25rem',
                  backgroundColor: selectedDuration === null ? 'var(--color-primary)' : '#fff',
                  color: selectedDuration === null ? '#fff' : 'var(--color-text)',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                All
              </button>
              {availableDurations.map((dur) => (
                <button
                  key={dur}
                  onClick={() => setSelectedDuration(dur)}
                  style={{
                    padding: '0.4rem 0.9rem',
                    border: selectedDuration === dur ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    borderRadius: '0.25rem',
                    backgroundColor: selectedDuration === dur ? 'var(--color-primary)' : '#fff',
                    color: selectedDuration === dur ? '#fff' : 'var(--color-text)',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {dur === 'weekend' ? 'Weekend' : 'Multi-day'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TREK CATALOGUE */}
      {!hasAnyTreks && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-muted)' }}>
          <p>No treks match your filters. Try adjusting your selection.</p>
        </div>
      )}

      {hasAnyTreks && (
        <section>
          {Object.entries(filteredByLocation).map(([locationId, treks]: [string, typeof allTreks]) => {
            const location = locations.find((l: typeof locations[number]) => l.id === locationId);
            if (!location || treks.length === 0) return null;

            return (
              <div key={locationId} style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ marginTop: 0, marginBottom: '0.5rem', textTransform: 'capitalize' }}>
                  {location.name} Treks
                </h2>
                <p style={{ color: 'var(--color-muted)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                  {location.tagline}
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  {treks.map((trek: typeof allTreks[number]) => (
                    <TrekCard
                      key={trek.slug}
                      name={trek.title}
                      duration={trek.duration}
                      difficulty={trek.difficulty}
                      description={trek.description}
                      href={`/treks/${trek.slug}`}
                    />
                  ))}
                </div>
                <Link
                  href={`/treks/location/${locationId}`}
                  style={{
                    color: 'var(--color-primary)',
                    fontWeight: 500,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    textTransform: 'capitalize',
                  }}
                >
                  View all {location.name.toLowerCase()} treks →
                </Link>
              </div>
            );
          })}
        </section>
      )}

      {/* SECTION 4: CURATED TREK COLLECTIONS */}
      <section style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '2rem' }}>Explore Treks by Interest</h2>

        {/* Beginner-Friendly Treks */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Beginner-Friendly Treks</h3>
          <p style={{ color: 'var(--color-muted)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            Easy-paced treks suitable for first-time trekkers.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '1rem',
            }}
          >
            {filterTreks(
              allTreks.filter(
                (t) =>
                  t.difficulty === 'Easy' ||
                  (t.difficulty.includes('Easy') && t.difficulty.includes('Moderate')),
              ),
            )
              .slice(0, 3)
              .map((trek) => (
                <TrekCard
                  key={trek.slug}
                  name={trek.title}
                  duration={trek.duration}
                  difficulty={trek.difficulty}
                  description={trek.description}
                  href={`/treks/${trek.slug}`}
                />
              ))}
          </div>
          <button
            onClick={() => {
              setSelectedDifficulty('easy');
              setSelectedDuration(null);
              setSelectedDestination(null);
            }}
            style={{
              color: 'var(--color-primary)',
              fontWeight: 500,
              textDecoration: 'none',
              fontSize: '0.95rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            View all beginner-friendly treks →
          </button>
        </div>

        {/* Weekend Treks */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Weekend Treks</h3>
          <p style={{ color: 'var(--color-muted)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            Perfect short escapes from Dehradun and nearby cities.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '1rem',
            }}
          >
            {filterTreks(
              allTreks.filter(
                (t) =>
                  t.duration.includes('Half day') ||
                  t.duration.includes('1 day') ||
                  t.duration.includes('2') ||
                  t.duration.includes('3'),
              ),
            )
              .slice(0, 3)
              .map((trek) => (
                <TrekCard
                  key={trek.slug}
                  name={trek.title}
                  duration={trek.duration}
                  difficulty={trek.difficulty}
                  description={trek.description}
                  href={`/treks/${trek.slug}`}
                />
              ))}
          </div>
          <button
            onClick={() => {
              setSelectedDuration('weekend');
              setSelectedDifficulty(null);
              setSelectedDestination(null);
            }}
            style={{
              color: 'var(--color-primary)',
              fontWeight: 500,
              textDecoration: 'none',
              fontSize: '0.95rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            View all weekend treks →
          </button>
        </div>

        {/* Classic Himalayan Treks */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Classic Himalayan Treks</h3>
          <p style={{ color: 'var(--color-muted)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            Iconic Himalayan routes with mountain views and cultural depth.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '1rem',
            }}
          >
            {filterTreks(
              allTreks.filter(
                (t) => !t.duration.includes('Half day') && !t.duration.includes('1 day'),
              ),
            )
              .slice(0, 3)
              .map((trek) => (
                <TrekCard
                  key={trek.slug}
                  name={trek.title}
                  duration={trek.duration}
                  difficulty={trek.difficulty}
                  description={trek.description}
                  href={`/treks/${trek.slug}`}
                />
              ))}
          </div>
          <button
            onClick={() => {
              setSelectedDuration('multiday');
              setSelectedDifficulty(null);
              setSelectedDestination(null);
            }}
            style={{
              color: 'var(--color-primary)',
              fontWeight: 500,
              textDecoration: 'none',
              fontSize: '0.95rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            View classic Himalayan treks →
          </button>
        </div>
      </section>

      {/* SECTION 5: EXPERIENCE-BASED DISCOVERY */}
      <section style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '2rem' }}>Not Sure Which Trek Is Right for You?</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {/* First-Time Trekkers */}
          <div
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.5rem',
              backgroundColor: '#f9f9f9',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.05rem' }}>First-Time Trekkers</h3>
            <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              New to trekking? Start with easy, guided trails that focus on experience, not endurance.
            </p>
            <button
              onClick={() => {
                setSelectedDifficulty('easy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                color: 'var(--color-primary)',
                fontWeight: 500,
                textDecoration: 'none',
                fontSize: '0.95rem',
                alignSelf: 'flex-start',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Explore beginner-friendly treks →
            </button>
          </div>

          {/* Weekend Explorers */}
          <div
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.5rem',
              backgroundColor: '#f9f9f9',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.05rem' }}>Weekend Explorers</h3>
            <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Short on time? Choose forest and waterfall treks that fit into a weekend.
            </p>
            <Link
              href="/treks/location/chakrata"
              style={{
                color: 'var(--color-primary)',
                fontWeight: 500,
                textDecoration: 'none',
                fontSize: '0.95rem',
                alignSelf: 'flex-start',
              }}
            >
              Explore weekend treks →
            </Link>
          </div>

          {/* Adventure Seekers */}
          <div
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.5rem',
              backgroundColor: '#f9f9f9',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.05rem' }}>Adventure Seekers</h3>
            <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Looking for snow, altitude, and longer days on the trail?
            </p>
            <Link
              href="/treks/location/sankri"
              style={{
                color: 'var(--color-primary)',
                fontWeight: 500,
                textDecoration: 'none',
                fontSize: '0.95rem',
                alignSelf: 'flex-start',
              }}
            >
              Explore Himalayan treks from Sankri →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: TRUST STRIP */}
      <section
        style={{
          marginTop: '3rem',
          marginBottom: '2rem',
          padding: '1.5rem',
          backgroundColor: '#f9f9f9',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-border)',
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>Why Trek With Us</h2>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem',
          }}
        >
          <li style={{ paddingLeft: 0, fontSize: '0.95rem' }}>
            <strong>Beginner-friendly pacing</strong>
          </li>
          <li style={{ paddingLeft: 0, fontSize: '0.95rem' }}>
            <strong>Small groups</strong>
          </li>
          <li style={{ paddingLeft: 0, fontSize: '0.95rem' }}>
            <strong>Local mountain guides</strong>
          </li>
          <li style={{ paddingLeft: 0, fontSize: '0.95rem' }}>
            <strong>Safety-first approach</strong>
          </li>
          <li style={{ paddingLeft: 0, fontSize: '0.95rem' }}>
            <strong>Weekend and long-format treks</strong>
          </li>
        </ul>
      </section>

      {/* SECTION 7: SOFT CTA */}
      <section style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
        <p style={{ marginBottom: '1rem', color: 'var(--color-muted)' }}>Not sure which trek fits you best?</p>
        <a
          href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%27d%20like%20to%20know%20which%20trek%20would%20be%20best%20for%20me."
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.25rem',
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff',
            borderRadius: 'var(--radius-sm)',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '0.95rem',
          }}
        >
          Talk to us on WhatsApp
        </a>
      </section>
    </div>
  );
}
