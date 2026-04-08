'use client';

/**
 * StickyTrekCTA — Persistent conversion trigger for trek detail pages.
 *
 * Mobile: Fixed bottom bar (full-width).
 * Desktop: Fixed side button (right edge, vertical center).
 *
 * CTA text is dynamic based on trek difficulty:
 *   Moderate   → "Check Available Dates"
 *   Challenging → "Check Fitness & Dates"
 *
 * On click: opens the AvailabilityModal (micro-qualification form).
 * Tracks: sticky_cta_click event via telemetry.
 */

import { useState, useEffect } from 'react';
import AvailabilityModal from './AvailabilityModal';
import { track } from '@/utils/telemetry';

interface StickyTrekCTAProps {
  trekTitle: string;
  trekSlug: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  bestSeason: string[];
  locationId: string;
  locationName: string;
  sourcePath: string;
}

const CTA_TEXT: Record<string, string> = {
  Moderate: 'Check Available Dates',
  Challenging: 'Check Fitness & Dates',
  Easy: 'Check Available Dates',
  'roopkund-trek': 'Still thinking? Talk to someone who has done this trek.',
  'brahmatal-trek': 'Still unsure? We\'ll help you choose the right trek',
  'har-ki-dun-trek': 'Still unsure? We\'ll guide you to the right trek',
  'dayara-bugyal-trek': 'Quick question? We\'ll help you get started',
};

export default function StickyTrekCTA({
  trekTitle,
  trekSlug,
  difficulty,
  bestSeason,
  locationId,
  locationName,
  sourcePath,
}: StickyTrekCTAProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Show sticky CTA after scrolling past the hero (300px)
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleClick() {
    track({
      event: 'sticky_cta_click',
      from: sourcePath,
      meta: { trek: trekSlug, difficulty, source: sourcePath },
    });
    setModalOpen(true);
  }

  const ctaLabel = CTA_TEXT[trekSlug] || CTA_TEXT[difficulty] || 'Check Available Dates';

  return (
    <>
      {/* ── MOBILE: Fixed bottom bar ── */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 250ms ease-out',
          padding: '0.6rem 1rem',
          backgroundColor: 'white',
          borderTop: '1px solid var(--color-border)',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
        className="sticky-cta-mobile"
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {trekTitle}
          </p>
          <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--color-text-secondary, #6b7280)' }}>
            {difficulty} · {bestSeason[0]}–{bestSeason[bestSeason.length - 1]}
          </p>
        </div>
        <button
          type="button"
          onClick={handleClick}
          style={{
            flexShrink: 0,
            padding: '0.6rem 1.25rem',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {ctaLabel}
        </button>
      </div>

      {/* ── DESKTOP: Fixed side button ── */}
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: '50%',
          transform: visible ? 'translateX(0) translateY(-50%)' : 'translateX(100%) translateY(-50%)',
          transition: 'transform 250ms ease-out',
          zIndex: 1000,
        }}
        className="sticky-cta-desktop"
      >
        <button
          type="button"
          onClick={handleClick}
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            padding: '1rem 0.6rem',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '0.02em',
            boxShadow: '-2px 0 8px rgba(0,0,0,0.08)',
          }}
        >
          {ctaLabel}
        </button>
      </div>

      {/* ── Responsive CSS ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 768px) {
          .sticky-cta-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .sticky-cta-desktop { display: none !important; }
        }
      `}} />

      {/* ── Modal ── */}
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
