'use client';

/**
 * TrekConversionLayer — Unified conversion optimization wrapper for trek detail pages.
 *
 * Bundles:
 *   1. StickyTrekCTA (sticky bottom bar mobile / side button desktop)
 *   2. WhatsAppTrekButton (floating WhatsApp with prefilled message)
 *   3. Psychological trust badges (urgency, social proof, risk reversal)
 *
 * Import this single component in the trek detail page template.
 * All conversion elements share the same trek data props.
 */

import StickyTrekCTA from './StickyTrekCTA';
import WhatsAppTrekButton from './WhatsAppTrekButton';
import { track } from '@/utils/telemetry';

interface TrekConversionLayerProps {
  trekTitle: string;
  trekSlug: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  bestSeason: string[];
  altitude?: string;
  locationId: string;
  locationName: string;
  sourcePath: string;
  whatsappNumber: string;
  phoneNumber?: string;
}

/** Psychological copy varies by season/difficulty */
function getTrustBadges(
  difficulty: string,
  bestSeason: string[],
  trekSlug: string,
): { icon: string; text: string }[] {
  const badges: { icon: string; text: string }[] = [];

  // Scarcity / urgency
  const winterMonths = ['December', 'January', 'February'];
  const summerMonths = ['May', 'June'];
  const hasWinterSeason = bestSeason.some((m) => winterMonths.includes(m));
  const hasSummerSeason = bestSeason.some((m) => summerMonths.includes(m));

  if (hasWinterSeason) {
    badges.push({ icon: '❄️', text: 'Limited winter departures (Dec–Feb)' });
  } else if (hasSummerSeason) {
    badges.push({ icon: '☀️', text: 'Limited summer slots (May–Jun)' });
  } else {
    badges.push({ icon: '📅', text: 'Limited departures per season' });
  }

  // Special urgency for Roopkund
  if (trekSlug === 'roopkund-trek') {
    badges.push({ icon: '⏰', text: 'Limited departures. Small group batches.' });
  }

  // Social proof
  badges.push({ icon: '👥', text: 'Small group size (Max 12 trekkers)' });

  // Risk reversal
  badges.push({ icon: '✓', text: 'Free cancellation up to 7 days before departure' });

  // Difficulty-specific
  if (difficulty === 'Challenging') {
    badges.push({ icon: '🏔️', text: 'Fitness assessment included — we help you prepare' });
  }

  return badges;
}

export default function TrekConversionLayer({
  trekTitle,
  trekSlug,
  difficulty,
  bestSeason,
  altitude,
  locationId,
  locationName,
  sourcePath,
  whatsappNumber,
  phoneNumber,
}: TrekConversionLayerProps) {
  const badges = getTrustBadges(difficulty, bestSeason, trekSlug);

  function handlePhoneClick() {
    track({ event: 'phone_click', from: sourcePath, meta: { trek: trekSlug, source: sourcePath } });
  }

  return (
    <>
      {/* ── Trust / Urgency Badges ── */}
      <aside
        style={{
          margin: '2rem 0',
          padding: '1rem 1.25rem',
          backgroundColor: 'var(--color-surface, #f9f9f9)',
          borderRadius: 'var(--radius-sm)',
          borderLeft: '3px solid var(--color-primary)',
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {badges.map((badge, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.3rem 0',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                color: 'var(--color-text)',
              }}
            >
              <span style={{ flexShrink: 0, fontSize: '1rem' }}>{badge.icon}</span>
              {badge.text}
            </li>
          ))}
        </ul>
      </aside>

      {/* ── Sticky CTA (persistent bottom/side) ── */}
      <StickyTrekCTA
        trekTitle={trekTitle}
        trekSlug={trekSlug}
        difficulty={difficulty}
        bestSeason={bestSeason}
        locationId={locationId}
        locationName={locationName}
        sourcePath={sourcePath}
      />

      {/* ── WhatsApp Floating Button ── */}
      <WhatsAppTrekButton
        trekTitle={trekTitle}
        trekSlug={trekSlug}
        altitude={altitude}
        whatsappNumber={whatsappNumber}
        sourcePath={sourcePath}
      />

      {/* ── Phone Call Button ── */}
      {phoneNumber && (
        <a
          href={`tel:+${phoneNumber}`}
          onClick={handlePhoneClick}
          aria-label="Call trek expert"
          style={{
            position: 'fixed',
            bottom: '9rem',
            right: '1rem',
            zIndex: 900,
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: '#1976d2',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          }}
          title="Call Trek Expert"
        >
          📞
        </a>
      )}
    </>
  );
}
