'use client';

/**
 * OtherComparisonsAdaptive
 *
 * Client component. Receives all possible comparison targets pre-computed
 * by the server. On mount, reorders by session preferences.
 *
 * Shows up to 4 alternative comparisons from the current retreat(s).
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { rankByPreference } from '@/utils/sessionPreferences';

export interface ComparisonSuggestion {
  slug: string;
  title: string;
  pairHref: string;
  pairLabel: string;
  intensity: string;
  duration: string;
}

interface OtherComparisonsAdaptiveProps {
  suggestions: ComparisonSuggestion[];
  intensityMap: Record<string, string>;
  durationMap: Record<string, string>;
}

export default function OtherComparisonsAdaptive({
  suggestions,
  intensityMap,
  durationMap,
}: OtherComparisonsAdaptiveProps) {
  const [ranked, setRanked] = useState<ComparisonSuggestion[]>(suggestions);

  useEffect(() => {
    const slugs = suggestions.map((s) => s.slug);
    const reordered = rankByPreference(slugs, intensityMap, durationMap);
    const changed = reordered.some((s, i) => s !== slugs[i]);
    if (changed) {
      const map = new Map(suggestions.map((s) => [s.slug, s]));
      setRanked(reordered.map((s) => map.get(s)!).filter(Boolean));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (ranked.length === 0) return null;

  return (
    <section style={{
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      background: '#f7f9f7',
      padding: '5rem 0',
      marginTop: 0,
    }}>
      <style>{`
        .ocmp-item { transition: background 0.25s; }
        .ocmp-item:hover { background: #ffffff !important; }
        .ocmp-item:hover .ocmp-arrow { opacity: 1 !important; transform: translateX(4px); }
        .ocmp-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--color-primary);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .ocmp-item:hover::before { transform: scaleX(1); }
        .ocmp-arrow { transition: opacity 0.2s, transform 0.2s; }
      `}</style>

      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 var(--space-md)' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <span style={{ width: 24, height: 1, background: 'var(--color-primary)',  flexShrink: 0, display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-geist-sans), sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#374151'}}>
            Other Comparisons
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
          fontWeight: 200,
          letterSpacing: '-0.03em',
          color: '#111111',
          marginBottom: '2rem',
          lineHeight: 1.15,
        }}>
          Other Retreat Comparisons
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1px',
          background: 'rgba(15,118,110,0.08)',
          border: '1px solid rgba(15,118,110,0.08)',
        }}>
          {ranked.slice(0, 4).map((s, i) => (
            <div
              key={s.pairHref}
              className="ocmp-item"
              style={{ background: '#f7f9f7', position: 'relative', overflow: 'hidden' }}
            >
              <Link href={s.pairHref} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.5rem 1.75rem',
                textDecoration: 'none',
                gap: '1rem',
              }}>
                <span>
                  <span style={{
                    display: 'block',
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    color: '#374151',
                    
                    marginBottom: '0.35rem',
                  }}>
                    0{i + 1}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-geist-sans), sans-serif',
                    fontSize: '0.88rem',
                    fontWeight: 300,
                    color: '#222222',
                  }}>
                    {s.pairLabel}
                  </span>
                </span>
                <span className="ocmp-arrow" style={{
                  fontSize: '0.7rem',
                  color: '#374151',
                  
                  flexShrink: 0,
                }}>
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}