'use client';

/**
 * ItineraryMicroCTA — Inline contextual CTA placed after the itinerary section.
 *
 * Dynamic copy based on difficulty:
 *   Moderate   → "Planning this trek? Check upcoming departure dates."
 *   Challenging → "Ready to attempt {trekTitle}? Check fitness requirements & dates."
 *
 * On click: opens AvailabilityModal (same form as sticky CTA).
 * Tracks: sticky_cta_click with meta.source = 'itinerary'.
 */

import { useState } from 'react';
import AvailabilityModal from './AvailabilityModal';
import { track } from '@/utils/telemetry';

interface ItineraryMicroCTAProps {
  trekTitle: string;
  trekSlug: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  bestSeason: string[];
  locationId: string;
  locationName: string;
  sourcePath: string;
  whatsappNumber: string;
}

export default function ItineraryMicroCTA({
  trekTitle,
  trekSlug,
  difficulty,
  bestSeason,
  locationId,
  locationName,
  sourcePath,
}: ItineraryMicroCTAProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const shortTitle = trekTitle.split('–')[0].split('—')[0].trim();

  const copy =
    difficulty === 'Challenging'
      ? `Ready to attempt ${shortTitle}? Check fitness requirements & dates.`
      : `Planning this trek? Check upcoming departure dates.`;

  function handleClick() {
    track({
      event: 'sticky_cta_click',
      from: sourcePath,
      meta: { trek: trekSlug, difficulty, source: 'itinerary' },
    });
    setModalOpen(true);
  }

  return (
    <>
      <div
        style={{
          marginTop: '0.75rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--color-surface, #f9f9f9)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          color: 'var(--color-text)',
        }}
      >
        {copy.split('?')[0]}?{' '}
        <button
          type="button"
          onClick={handleClick}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-primary)',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            padding: 0,
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
        >
          {copy.split('?').slice(1).join('?').trim()}
        </button>
      </div>

      {modalOpen && (
        <AvailabilityModal
          trekTitle={trekTitle}
          trekSlug={trekSlug}
          difficulty={difficulty}
          bestSeason={bestSeason}
          locationId={locationId}
          locationName={locationName}
          sourcePath={sourcePath}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
