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
  pairHref: string;         // e.g. /compare/rest-and-reset-vs-sound-healing
  pairLabel: string;        // e.g. "Rest & Reset vs Sound Healing"
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
    <section
      style={{
        marginTop: 'var(--space-xl)',
        borderTop: '1px solid var(--color-border, #e0e0e0)',
        paddingTop: 'var(--space-lg)',
      }}
    >
      <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
        Other Retreat Comparisons
      </h2>
      <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.9 }}>
        {ranked.slice(0, 4).map((s) => (
          <li key={s.pairHref}>
            <Link href={s.pairHref} style={{ color: 'var(--color-primary)' }}>
              {s.pairLabel}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
