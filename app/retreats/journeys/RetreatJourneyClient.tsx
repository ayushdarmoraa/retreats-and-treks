'use client';

import Link from 'next/link';
import type { LocationId } from '@/config/locations';

interface Location {
  id: LocationId;
  name: string;
  tagline: string;
}

interface RetreatService {
  readonly title: string;
  readonly oneLineEssence: string;
  readonly description: string;
  readonly forNotFor: {
    readonly for: readonly string[];
    readonly notFor: readonly string[];
  };
  readonly howItWorks: {
    readonly rhythm: string;
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
}

interface RetreatJourneyClientProps {
  retreat: RetreatService;
  locations: Location[];
  suggestedTrek?: SuggestedTrek;
}

export default function RetreatJourneyClient({ retreat, locations, suggestedTrek }: RetreatJourneyClientProps) {
  return (
    <>
      {/* HEADER */}
      <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
        <h1 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '2rem', lineHeight: 1.2 }}>
          {retreat.title}
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-muted)', margin: 0, lineHeight: 1.6 }}>
          {retreat.oneLineEssence}
        </p>
      </section>

      {/* DESCRIPTION */}
      <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
        <p
          style={{
            fontSize: '0.95rem',
            lineHeight: 1.8,
            color: 'var(--color-text)',
            margin: 0,
            whiteSpace: 'pre-wrap',
          }}
        >
          {retreat.description}
        </p>
      </section>

      {/* FOR / NOT FOR */}
      <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 600 }}>
          Who this is for
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.95rem', fontWeight: 600 }}>For people who:</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {retreat.forNotFor.for.map((line, idx) => (
                <li key={idx} style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--color-primary)', marginRight: '0.5rem' }}>✓</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.95rem', fontWeight: 600 }}>Not for people:</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {retreat.forNotFor.notFor.map((line, idx) => (
                <li key={idx} style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-muted)' }}>
                  <span style={{ marginRight: '0.5rem' }}>—</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
          How it works
        </h2>
        <p
          style={{
            fontSize: '0.95rem',
            lineHeight: 1.8,
            color: 'var(--color-text)',
            margin: 0,
            whiteSpace: 'pre-wrap',
          }}
        >
          {retreat.howItWorks.rhythm}
        </p>
      </section>

      {/* WHERE IT WORKS BEST */}
      <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
          Where this retreat works best
        </h2>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '0.95rem', fontWeight: 600 }}>
            Primary location: {retreat.whereItWorksBest.primary}
          </h3>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-text)', margin: 0 }}>
            {retreat.whereItWorksBest.primaryReason}
          </p>
        </div>

        {locations.length > 0 && (
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.95rem', fontWeight: 600 }}>
              Also held in:
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {locations.map((loc) => (
                <Link
                  key={loc.id}
                  href={`/retreats/${loc.id}`}
                  style={{
                    padding: '1rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none',
                    color: 'var(--color-text)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-primary)';
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#fafafa';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border)';
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                  }}
                >
                  <h4 style={{ marginTop: 0, marginBottom: '0.25rem', fontSize: '0.9rem', fontWeight: 600 }}>
                    {loc.name}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>
                    {retreat.whereItWorksBest.contextByLocation[loc.id] ||
                      retreat.whereItWorksBest.primaryReason}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ADAPTABILITY */}
      <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
          How this adapts
        </h2>
        <p
          style={{
            fontSize: '0.95rem',
            lineHeight: 1.8,
            color: 'var(--color-text)',
            margin: 0,
            whiteSpace: 'pre-wrap',
          }}
        >
          {retreat.adaptability}
        </p>
      </section>

      {/* RELATED TREK */}
      {suggestedTrek && (
        <section style={{ marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
          <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
            Want to experience this as a trek instead?
          </h2>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
            Explore the{' '}
            <Link href={`/treks/${suggestedTrek.slug}`} style={{ color: 'var(--color-primary)', fontWeight: 500 }}>
              {suggestedTrek.title}
            </Link>{' '}
            as a guided Himalayan trek.
          </p>
        </section>
      )}

      {/* INVITATION */}
      <section style={{ textAlign: 'center', paddingTop: '2rem' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--color-text)', marginBottom: '2rem', margin: 0 }}>
          {retreat.invitation}
        </p>
        <div style={{ marginTop: '2rem' }}>
          <a
            href={`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(`I'm interested in the ${retreat.title} retreat.`)}`}
            style={{
              display: 'inline-block',
              padding: '0.85rem 1.5rem',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              transition: 'opacity 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
            }}
          >
            Talk on WhatsApp
          </a>
        </div>
        <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
          <Link href="/retreats" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
            ← Back to all retreats
          </Link>
        </p>
      </section>
    </>
  );
}
