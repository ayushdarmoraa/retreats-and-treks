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
<style>{`
  .trk-hero {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #f7f9f7;
    padding: 5rem 0 4rem;
    position: relative;
    overflow: hidden;
    margin-bottom: 0;
  }
  .trk-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(15,118,110,0.5) 30%, rgba(15,118,110,0.5) 70%, transparent);
  }
  .trk-hero-inner {
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
`}</style>

<section className="trk-hero">
  <div className="trk-hero-inner">

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: 24, height: 1, background: 'var(--color-primary)', opacity: 0.5, flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.7 }}>
        Himalayan Treks
      </span>
    </div>

    <h2 style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
      fontWeight: 200,
      letterSpacing: '-0.03em',
      color: '#111111',
      lineHeight: 1.15,
      margin: '0 0 1rem 0',
      maxWidth: '44rem',
    }}>
      Trekking in the Himalayas
    </h2>

    <p style={{
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontSize: '0.88rem',
      fontWeight: 300,
      lineHeight: 1.85,
      color: '#555555',
      margin: 0,
    }}>
      Browse treks by destination, difficulty, and duration.
    </p>

  </div>
</section>

      {/* SECTION 2: FILTER BAR */}
<style>{`
  .trk-filter {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #ffffff;
    padding: 2.5rem 0;
    border-bottom: 1px solid rgba(15,118,110,0.08);
    margin-bottom: 0;
  }
  .trk-filter-inner {
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 2rem;
  }
  .trk-filter-label {
    display: block;
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.56rem;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--color-primary);
    opacity: 0.7;
    margin-bottom: 0.75rem;
  }
  .trk-filter-btns {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }
  .trk-btn {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    padding: 0.35rem 0.85rem;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 0.02em;
  }
  .trk-btn-inactive {
    border: 1px solid rgba(15,118,110,0.15);
    background: transparent;
    color: #555555;
  }
  .trk-btn-inactive:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
    background: rgba(15,118,110,0.04);
  }
  .trk-btn-active {
    border: 1px solid var(--color-primary);
    background: var(--color-primary);
    color: #ffffff;
  }
`}</style>

<section className="trk-filter">
  <div className="trk-filter-inner">

    {/* Destination Filter */}
    <div>
      <label className="trk-filter-label">Destination</label>
      <div className="trk-filter-btns">
        <button
          onClick={() => setSelectedDestination(null)}
          className={`trk-btn ${selectedDestination === null ? 'trk-btn-active' : 'trk-btn-inactive'}`}
        >
          All
        </button>
        {locations.map((location: typeof locations[number]) => (
          <button
            key={location.id}
            onClick={() => setSelectedDestination(location.id)}
            className={`trk-btn ${selectedDestination === location.id ? 'trk-btn-active' : 'trk-btn-inactive'}`}
            style={{ textTransform: 'capitalize' }}
          >
            {location.name}
          </button>
        ))}
      </div>
    </div>

    {/* Difficulty Filter */}
    <div>
      <label className="trk-filter-label">Difficulty</label>
      <div className="trk-filter-btns">
        <button
          onClick={() => setSelectedDifficulty(null)}
          className={`trk-btn ${selectedDifficulty === null ? 'trk-btn-active' : 'trk-btn-inactive'}`}
        >
          All
        </button>
        {availableDifficulties.map((diff) => (
          <button
            key={diff}
            onClick={() => setSelectedDifficulty(diff)}
            className={`trk-btn ${selectedDifficulty === diff ? 'trk-btn-active' : 'trk-btn-inactive'}`}
            style={{ textTransform: 'capitalize' }}
          >
            {diff === 'easy-moderate' ? 'Moderate' : diff.charAt(0).toUpperCase() + diff.slice(1)}
          </button>
        ))}
      </div>
    </div>

    {/* Duration Filter */}
    <div>
      <label className="trk-filter-label">Duration</label>
      <div className="trk-filter-btns">
        <button
          onClick={() => setSelectedDuration(null)}
          className={`trk-btn ${selectedDuration === null ? 'trk-btn-active' : 'trk-btn-inactive'}`}
        >
          All
        </button>
        {availableDurations.map((dur) => (
          <button
            key={dur}
            onClick={() => setSelectedDuration(dur)}
            className={`trk-btn ${selectedDuration === dur ? 'trk-btn-active' : 'trk-btn-inactive'}`}
            style={{ textTransform: 'capitalize' }}
          >
            {dur === 'weekend' ? 'Weekend' : 'Multi-day'}
          </button>
        ))}
      </div>
    </div>

  </div>
</section>

      {/* SECTION 3: TREK CATALOGUE */}
<style>{`
  .trk-cat-section {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #f7f9f7;
    padding: 5rem 0;
  }
  .trk-cat-inner {
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
  .trk-cat-location {
    margin-bottom: 4rem;
    padding-bottom: 4rem;
    border-bottom: 1px solid rgba(15,118,110,0.08);
  }
  .trk-cat-location:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  .trk-cat-loc-name {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: clamp(1.4rem, 2.5vw, 1.85rem);
    font-weight: 200;
    letter-spacing: -0.03em;
    color: #111111;
    line-height: 1.15;
    margin: 0 0 0.5rem 0;
    text-transform: capitalize;
  }
  .trk-cat-loc-tagline {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.88rem;
    font-weight: 300;
    color: #555555;
    line-height: 1.85;
    margin: 0 0 2rem 0;
  }
  .trk-cat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .trk-cat-browse {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.82rem;
    font-weight: 400;
    color: var(--color-primary);
    text-decoration: none;
    text-transform: capitalize;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    transition: gap 0.2s;
  }
  .trk-cat-browse:hover { gap: 0.65rem; }
  .trk-empty {
    text-align: center;
    padding: 4rem 2rem;
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.88rem;
    font-weight: 300;
    color: #888888;
  }
`}</style>

{!hasAnyTreks && (
  <div className="trk-empty">
    <p>No treks match your filters. Try adjusting your selection.</p>
  </div>
)}

{hasAnyTreks && (
  <section className="trk-cat-section">
    <div className="trk-cat-inner">
      {Object.entries(filteredByLocation).map(([locationId, treks]: [string, typeof allTreks]) => {
        const location = locations.find((l: typeof locations[number]) => l.id === locationId);
        if (!location || treks.length === 0) return null;

        return (
          <div key={locationId} className="trk-cat-location">

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ width: 24, height: 1, background: 'var(--color-primary)', opacity: 0.5, flexShrink: 0, display: 'inline-block' }} />
              <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.7 }}>
                {location.name}
              </span>
            </div>

            <h2 className="trk-cat-loc-name">
              {location.name} Treks
            </h2>
            <p className="trk-cat-loc-tagline">
              {location.tagline}
            </p>

            <div className="trk-cat-grid">
              {treks.map((trek: typeof allTreks[number]) => (
                <TrekCard
                  key={trek.slug}
                  name={trek.title}
                  duration={trek.duration}
                  difficulty={trek.difficulty}
                  description={trek.description}
                  href={`/treks/location/${trek.locationId}/${trek.slug}`}
                />
              ))}
            </div>

            <Link
              href={`/treks/location/${locationId}`}
              className="trk-cat-browse"
            >
              Browse {location.name} treks →
            </Link>

          </div>
        );
      })}
    </div>
  </section>
)}

      {/* SECTION 4: CURATED TREK COLLECTIONS */}
<style>{`
  .trk-curated {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #ffffff;
    padding: 5rem 0;
  }
  .trk-curated-inner {
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
  .trk-curated-h2 {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: clamp(1.4rem, 2.5vw, 1.85rem);
    font-weight: 200;
    letter-spacing: -0.03em;
    color: #111111;
    line-height: 1.15;
    margin: 0 0 3.5rem 0;
  }
  .trk-collection {
    margin-bottom: 4rem;
    padding-bottom: 4rem;
    border-bottom: 1px solid rgba(15,118,110,0.08);
  }
  .trk-collection:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  .trk-collection-h3 {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 1.1rem;
    font-weight: 300;
    letter-spacing: -0.02em;
    color: #111111;
    margin: 0 0 0.4rem 0;
  }
  .trk-collection-p {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.82rem;
    font-weight: 300;
    color: #888888;
    line-height: 1.7;
    margin: 0 0 1.75rem 0;
  }
  .trk-collection-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.25rem;
  }
  .trk-collection-link {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.78rem;
    font-weight: 400;
    color: var(--color-primary);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    transition: gap 0.2s;
  }
  .trk-collection-link:hover { gap: 0.65rem; }
`}</style>

<section className="trk-curated">
  <div className="trk-curated-inner">

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: 24, height: 1, background: 'var(--color-primary)', opacity: 0.5, flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.7 }}>
        By Interest
      </span>
    </div>
    <h2 className="trk-curated-h2">Explore Treks by Interest</h2>

    {/* Beginner-Friendly Treks */}
    <div className="trk-collection">
      <h3 className="trk-collection-h3">Beginner-Friendly Treks</h3>
      <p className="trk-collection-p">Easy-paced treks suitable for first-time trekkers.</p>
      <div className="trk-collection-grid">
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
              href={`/treks/location/${trek.locationId}/${trek.slug}`}
            />
          ))}
      </div>
      <Link href="/treks?difficulty=easy" className="trk-collection-link">
        Browse beginner-friendly trek itineraries →
      </Link>
    </div>

    {/* Weekend Treks */}
    <div className="trk-collection">
      <h3 className="trk-collection-h3">Weekend Treks</h3>
      <p className="trk-collection-p">Perfect short escapes from Dehradun and nearby cities.</p>
      <div className="trk-collection-grid">
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
              href={`/treks/location/${trek.locationId}/${trek.slug}`}
            />
          ))}
      </div>
      <Link href="/treks?duration=weekend" className="trk-collection-link">
        Browse weekend treks from Dehradun →
      </Link>
    </div>

    {/* Classic Himalayan Treks */}
    <div className="trk-collection">
      <h3 className="trk-collection-h3">Classic Himalayan Treks</h3>
      <p className="trk-collection-p">Iconic Himalayan routes with mountain views and cultural depth.</p>
      <div className="trk-collection-grid">
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
              href={`/treks/location/${trek.locationId}/${trek.slug}`}
            />
          ))}
      </div>
      <Link href="/treks/location/sankri" className="trk-collection-link">
        Explore classic Himalayan summit treks →
      </Link>
    </div>

  </div>
</section>

      {/* SECTION 5: EXPERIENCE-BASED DISCOVERY */}
<style>{`
  .trk-discovery {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #f7f9f7;
    padding: 5rem 0;
  }
  .trk-discovery-inner {
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
  .trk-discovery-h2 {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: clamp(1.4rem, 2.5vw, 1.85rem);
    font-weight: 200;
    letter-spacing: -0.03em;
    color: #111111;
    line-height: 1.15;
    margin: 0 0 2.5rem 0;
  }
  .trk-discovery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1px;
    background: rgba(15,118,110,0.08);
    border: 1px solid rgba(15,118,110,0.08);
  }
  .trk-disc-card {
    background: #f7f9f7;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    position: relative;
    overflow: hidden;
    transition: background 0.25s;
  }
  .trk-disc-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--color-primary);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
  }
  .trk-disc-card:hover { background: #ffffff; }
  .trk-disc-card:hover::before { transform: scaleX(1); }
  .trk-disc-card:hover .trk-disc-link { gap: 0.65rem; }
  .trk-disc-h3 {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: -0.01em;
    color: #111111;
    margin: 0;
  }
  .trk-disc-p {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.82rem;
    font-weight: 300;
    color: #666666;
    line-height: 1.8;
    margin: 0;
    flex: 1;
  }
  .trk-disc-link {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--color-primary);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    transition: gap 0.2s;
    align-self: flex-start;
  }
`}</style>

<section className="trk-discovery">
  <div className="trk-discovery-inner">

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: 24, height: 1, background: 'var(--color-primary)', opacity: 0.5, flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.7 }}>
        Find Your Trek
      </span>
    </div>
    <h2 className="trk-discovery-h2">Not Sure Which Trek Is Right for You?</h2>

    <div className="trk-discovery-grid">

      {/* First-Time Trekkers */}
      <div className="trk-disc-card">
        <h3 className="trk-disc-h3">First-Time Trekkers</h3>
        <p className="trk-disc-p">
          New to trekking? Start with easy, guided trails that focus on experience, not endurance.
        </p>
        <Link href="/treks?difficulty=easy" className="trk-disc-link">
          Browse beginner-friendly treks →
        </Link>
      </div>

      {/* Weekend Explorers */}
      <div className="trk-disc-card">
        <h3 className="trk-disc-h3">Weekend Explorers</h3>
        <p className="trk-disc-p">
          Short on time? Choose forest and waterfall treks that fit into a weekend.
        </p>
        <Link href="/treks/location/chakrata" className="trk-disc-link">
          View Chakrata Weekend Trek itinerary →
        </Link>
      </div>

      {/* Adventure Seekers */}
      <div className="trk-disc-card">
        <h3 className="trk-disc-h3">Adventure Seekers</h3>
        <p className="trk-disc-p">
          Looking for snow, altitude, and longer days on the trail?
        </p>
        <Link href="/treks/location/sankri" className="trk-disc-link">
          Discover Sankri multi-day trek itineraries →
        </Link>
      </div>

    </div>
  </div>
</section>

      {/* SECTION 6: TRUST STRIP */}
<style>{`
  .trk-trust {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #ffffff;
    padding: 5rem 0;
  }
  .trk-trust-inner {
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
  }
  .trk-trust-h2 {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: clamp(1.4rem, 2.5vw, 1.85rem);
    font-weight: 200;
    letter-spacing: -0.03em;
    color: #111111;
    line-height: 1.15;
    margin: 0 0 2.5rem 0;
  }
  .trk-trust-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1px;
    background: rgba(15,118,110,0.08);
    border: 1px solid rgba(15,118,110,0.08);
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .trk-trust-item {
    background: #ffffff;
    padding: 1.75rem 1.5rem;
    position: relative;
    overflow: hidden;
    transition: background 0.2s;
  }
  .trk-trust-item::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--color-primary);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
  }
  .trk-trust-item:hover { background: #f7f9f7; }
  .trk-trust-item:hover::before { transform: scaleX(1); }
  .trk-trust-item strong {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.88rem;
    font-weight: 400;
    color: #222222;
    letter-spacing: -0.01em;
    display: block;
  }
  .trk-trust-dot {
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-primary);
    opacity: 0.4;
    margin-bottom: 0.75rem;
  }
`}</style>

<section className="trk-trust">
  <div className="trk-trust-inner">

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <span style={{ width: 24, height: 1, background: 'var(--color-primary)', opacity: 0.5, flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.56rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-primary)', opacity: 0.7 }}>
        Our Approach
      </span>
    </div>
    <h2 className="trk-trust-h2">Why Trek With Us</h2>

    <ul className="trk-trust-grid">
      <li className="trk-trust-item">
        <span className="trk-trust-dot" />
        <strong>Beginner-friendly pacing</strong>
      </li>
      <li className="trk-trust-item">
        <span className="trk-trust-dot" />
        <strong>Small groups</strong>
      </li>
      <li className="trk-trust-item">
        <span className="trk-trust-dot" />
        <strong>Local mountain guides</strong>
      </li>
      <li className="trk-trust-item">
        <span className="trk-trust-dot" />
        <strong>Safety-first approach</strong>
      </li>
      <li className="trk-trust-item">
        <span className="trk-trust-dot" />
        <strong>Weekend and long-format treks</strong>
      </li>
    </ul>

  </div>
</section>

      {/* SECTION 7: SOFT CTA */}
<style>{`
  .trk-cta {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #f7f9f7;
    padding: 5rem 0;
    position: relative;
    overflow: hidden;
  }
  .trk-cta::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(15,118,110,0.4) 30%, rgba(15,118,110,0.4) 70%, transparent);
  }
  .trk-cta-inner {
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 var(--space-md, 1.5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    z-index: 1;
  }
  .trk-cta-eyebrow {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  .trk-cta-eyebrow-line {
    width: 24px; height: 1px;
    background: var(--color-primary);
    opacity: 0.4;
    display: inline-block; flex-shrink: 0;
  }
  .trk-cta-eyebrow-text {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.56rem; font-weight: 500;
    letter-spacing: 0.28em; text-transform: uppercase;
    color: var(--color-primary); opacity: 0.7;
  }
  .trk-cta-heading {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: clamp(1.4rem, 2.5vw, 1.85rem);
    font-weight: 200;
    letter-spacing: -0.03em;
    color: #111111;
    line-height: 1.2;
    margin: 0 0 2.5rem 0;
  }
  .trk-cta-btn {
    font-family: var(--font-geist-sans), sans-serif;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2.5rem;
    background: var(--color-primary);
    color: #ffffff;
    text-decoration: none;
    font-size: 0.78rem;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid var(--color-primary);
    transition: gap 0.2s, background 0.25s;
  }
  .trk-cta-btn:hover {
    background: rgba(15,118,110,0.85);
    gap: 1.1rem;
  }
`}</style>

<section className="trk-cta">
  <div className="trk-cta-inner">

    <div className="trk-cta-eyebrow">
      <span className="trk-cta-eyebrow-line" />
      <span className="trk-cta-eyebrow-text">Get in Touch</span>
      <span className="trk-cta-eyebrow-line" />
    </div>

    <h2 className="trk-cta-heading">Not sure which trek fits you best?</h2>

    <a
      href="https://wa.me/919760446101?text=Hi%2C%20I%27d%20like%20to%20know%20which%20trek%20would%20be%20best%20for%20me."
      className="trk-cta-btn"
    >
      Talk to us on WhatsApp →
    </a>

  </div>
</section>
    </div>
  );
}
