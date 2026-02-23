'use client';

/**
 * RetreatFinder
 *
 * A 5-question decision assistant that recommends the top 2 retreat programs
 * based on deterministic scoring logic against the registry.
 *
 * No login. No backend. No randomness.
 * Pure client-side registry leverage.
 *
 * Place on: homepage (prominent), pillar page, /retreat-programs
 */

import { useState } from 'react';
import Link from 'next/link';
import { track } from '@/utils/telemetry';
import { recordFinderMatch } from '@/utils/sessionPreferences';
import RatingBadge, { type RatingInfo } from './RatingBadge';

// ── Question definitions ──────────────────────────────────────────────────────

interface Option {
  id: string;
  label: string;
  scores: Partial<Record<string, number>>;  // slug → points
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: 'duration',
    text: 'How much time do you have?',
    options: [
      {
        id: '3day',
        label: 'A long weekend (2–3 days)',
        scores: {
          'weekend-retreat': 4,
          'sound-healing': 3,
          'rest-and-reset': 1,
        },
      },
      {
        id: '5day',
        label: 'About a week (4–6 days)',
        scores: {
          'rest-and-reset': 4,
          'burnout-recovery': 4,
          'yoga-and-movement': 3,
          'meditation-and-silence': 3,
          'art-and-creative': 3,
        },
      },
      {
        id: 'flexible',
        label: 'Flexible — I want it fully designed for me',
        scores: {
          'private-and-custom': 6,
        },
      },
    ],
  },
  {
    id: 'energy',
    text: 'What energy level are you arriving with?',
    options: [
      {
        id: 'depleted',
        label: 'Depleted — I need to stop, not start',
        scores: {
          'rest-and-reset': 5,
          'burnout-recovery': 4,
          'sound-healing': 3,
        },
      },
      {
        id: 'restless',
        label: 'Restless — I need to settle, not push harder',
        scores: {
          'meditation-and-silence': 4,
          'rest-and-reset': 3,
          'art-and-creative': 3,
        },
      },
      {
        id: 'ready',
        label: 'Present — I want to engage and practice',
        scores: {
          'yoga-and-movement': 5,
          'art-and-creative': 3,
          'weekend-retreat': 3,
        },
      },
    ],
  },
  {
    id: 'orientation',
    text: 'What is your primary goal?',
    options: [
      {
        id: 'rest',
        label: 'Genuine rest and nervous system recovery',
        scores: {
          'rest-and-reset': 5,
          'burnout-recovery': 4,
          'sound-healing': 3,
        },
      },
      {
        id: 'clarity',
        label: 'Inner clarity, stillness, or meditation',
        scores: {
          'meditation-and-silence': 6,
          'burnout-recovery': 3,
          'rest-and-reset': 2,
        },
      },
      {
        id: 'movement',
        label: 'Embodied practice, yoga, or movement',
        scores: {
          'yoga-and-movement': 6,
          'weekend-retreat': 2,
        },
      },
      {
        id: 'creative',
        label: 'Creative expression or unblocking',
        scores: {
          'art-and-creative': 6,
          'burnout-recovery': 2,
        },
      },
      {
        id: 'healing',
        label: 'Sound, somatic release, or gentle healing',
        scores: {
          'sound-healing': 6,
          'meditation-and-silence': 2,
        },
      },
    ],
  },
  {
    id: 'social',
    text: 'How do you want to be around others?',
    options: [
      {
        id: 'alone',
        label: 'Mostly solo — minimal group interaction',
        scores: {
          'meditation-and-silence': 3,
          'rest-and-reset': 3,
          'private-and-custom': 4,
        },
      },
      {
        id: 'small',
        label: 'Small group — shared but not social',
        scores: {
          'burnout-recovery': 2,
          'art-and-creative': 2,
          'sound-healing': 2,
          'yoga-and-movement': 2,
        },
      },
      {
        id: 'open',
        label: 'Open — community and connection welcome',
        scores: {
          'yoga-and-movement': 3,
          'weekend-retreat': 3,
          'art-and-creative': 2,
        },
      },
    ],
  },
  {
    id: 'physical',
    text: 'How do you feel about physical movement?',
    options: [
      {
        id: 'minimal',
        label: 'Minimal — I want to rest my body too',
        scores: {
          'rest-and-reset': 3,
          'meditation-and-silence': 3,
          'sound-healing': 3,
        },
      },
      {
        id: 'gentle',
        label: 'Gentle — light walks, stretching, soft yoga',
        scores: {
          'burnout-recovery': 2,
          'art-and-creative': 2,
          'weekend-retreat': 2,
          'rest-and-reset': 1,
        },
      },
      {
        id: 'active',
        label: 'Active — I want structured physical practice',
        scores: {
          'yoga-and-movement': 5,
          'weekend-retreat': 2,
        },
      },
    ],
  },
];

// ── Retreat display metadata (no registry import needed client-side) ──────────

const RETREAT_LABELS: Record<string, { title: string; essence: string }> = {
  'rest-and-reset': {
    title: 'Rest & Reset',
    essence: 'Permission to stop, for people who have been running too long.',
  },
  'burnout-recovery': {
    title: 'Burnout Recovery',
    essence: 'A structured return from the edge of depletion.',
  },
  'yoga-and-movement': {
    title: 'Yoga & Movement',
    essence: 'Embodied practice in mountain stillness.',
  },
  'meditation-and-silence': {
    title: 'Meditation & Silence',
    essence: 'Extended stillness in a contained mountain environment.',
  },
  'art-and-creative': {
    title: 'Art & Creative',
    essence: 'Unstructured creative time with facilitated guidance.',
  },
  'sound-healing': {
    title: 'Sound Healing',
    essence: 'Somatic reset through sound and vibration.',
  },
  'weekend-retreat': {
    title: 'Weekend Retreat',
    essence: 'A structured short-format reset from Dehradun.',
  },
  'private-and-custom': {
    title: 'Private & Custom',
    essence: 'Fully designed for you — solo, couple, or small group.',
  },
};

// ── Scoring engine ────────────────────────────────────────────────────────────

function computeTopRetreats(answers: Record<string, string>): string[] {
  const totals: Record<string, number> = {};

  for (const [qId, answerId] of Object.entries(answers)) {
    const question = QUESTIONS.find((q) => q.id === qId);
    if (!question) continue;
    const option = question.options.find((o) => o.id === answerId);
    if (!option) continue;
    for (const [slug, pts] of Object.entries(option.scores)) {
      totals[slug] = (totals[slug] ?? 0) + (pts ?? 0);
    }
  }

  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([slug]) => slug);
}

// ── Component ─────────────────────────────────────────────────────────────────

type Step = number | 'result';

const btnBase: React.CSSProperties = {
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '0.85rem 1rem',
  marginBottom: '0.6rem',
  border: '1px solid var(--color-border, #e0e0e0)',
  borderRadius: '6px',
  background: 'var(--color-surface, #fafafa)',
  cursor: 'pointer',
  fontSize: '0.95rem',
  lineHeight: 1.5,
  transition: 'border-color 0.15s, background 0.15s',
};

const btnSelectedBase: React.CSSProperties = {
  ...btnBase,
  borderColor: 'var(--color-primary, #2d6a4f)',
  background: 'var(--color-primary-light, #e8f5e9)',
  fontWeight: 600,
};

interface RetreatFinderProps {
  fromPath?: string;
  /** Pre-fetched server-side ratings map: slug → rating info */
  ratings?: Record<string, RatingInfo>;
}

export default function RetreatFinder({ fromPath = '/retreats/himalayan-retreats', ratings }: RetreatFinderProps) {
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<string[]>([]);

  const currentQuestion = typeof step === 'number' ? QUESTIONS[step] : null;
  const selectedAnswer = typeof step === 'number' ? answers[QUESTIONS[step]?.id] : undefined;
  const isFirst = step === 0;
  const isLast = typeof step === 'number' && step === QUESTIONS.length - 1;

  function selectAnswer(qId: string, answerId: string) {
    setAnswers((prev) => ({ ...prev, [qId]: answerId }));
  }

  function handleNext() {
    if (typeof step === 'number') {
      if (isLast) {
        const top = computeTopRetreats(answers);
        setResults(top);
        setStep('result');
        track({
          event: 'finder_complete',
          from: fromPath,
          meta: { result: top[0] ?? 'none', second: top[1] ?? 'none' },
        });
        if (top[0]) recordFinderMatch(top[0]);
      } else {
        setStep(step + 1);
      }
    }
  }

  function handleBack() {
    if (typeof step === 'number' && step > 0) setStep(step - 1);
    if (step === 'result') setStep(QUESTIONS.length - 1);
  }

  function handleReset() {
    setStep(0);
    setAnswers({});
    setResults([]);
  }

  const containerStyle: React.CSSProperties = {
    border: '1px solid var(--color-border, #e0e0e0)',
    borderRadius: '10px',
    padding: 'var(--space-lg)',
    background: 'var(--color-surface, #fafafa)',
    maxWidth: '36rem',
  };

  if (step === 'result') {
    return (
      <div style={containerStyle}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
          Find My Retreat
        </p>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 'var(--space-md)' }}>
          Based on your answers:
        </h3>
        {results.length === 0 ? (
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Your answers suggest a{' '}
            <Link href="/retreats/journeys/private-and-custom" style={{ color: 'var(--color-primary)' }}>
              Private & Custom
            </Link>{' '}
            program may suit you best. We can design it around your specific needs.
          </p>
        ) : (
          <div>
            {results.map((slug, i) => {
              const info = RETREAT_LABELS[slug];
              if (!info) return null;
              return (
                <div key={slug} style={{ marginBottom: 'var(--space-md)', padding: '1rem', borderRadius: '8px', border: i === 0 ? '2px solid var(--color-primary, #2d6a4f)' : '1px solid var(--color-border, #e0e0e0)', background: i === 0 ? 'var(--color-primary-light, #e8f5e9)' : 'white' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                    {i === 0 ? 'Best Match' : 'Also consider'}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                    <p style={{ fontWeight: 700, fontSize: '1rem', margin: 0 }}>{info.title}</p>
                    {ratings?.[slug] && <RatingBadge rating={ratings[slug]} variant="compact" />}
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
                    {info.essence}
                  </p>
                  <Link
                    href={`/retreats/journeys/${slug}`}
                    style={{
                      display: 'inline-block',
                      padding: '0.45rem 1rem',
                      background: i === 0 ? 'var(--color-primary, #2d6a4f)' : 'transparent',
                      color: i === 0 ? 'white' : 'var(--color-primary)',
                      border: '1px solid var(--color-primary, #2d6a4f)',
                      borderRadius: '5px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Explore {info.title} →
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'var(--space-md)' }}>
          <button onClick={handleReset} style={{ ...btnBase, width: 'auto', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            Start again
          </button>
          <Link
            href="/retreat-programs"
            style={{ ...btnBase, width: 'auto', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'var(--color-primary)', textDecoration: 'none' }}
          >
            View all programs →
          </Link>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const progress = typeof step === 'number' ? ((step + 1) / QUESTIONS.length) * 100 : 100;

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>
          Find My Retreat
        </p>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
          {(step as number) + 1} / {QUESTIONS.length}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: '3px', background: 'var(--color-border, #e0e0e0)', borderRadius: '2px', marginBottom: 'var(--space-md)', overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: 'var(--color-primary, #2d6a4f)', borderRadius: '2px', transition: 'width 0.2s ease' }} />
      </div>

      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 'var(--space-md)', lineHeight: 1.4 }}>
        {currentQuestion.text}
      </h3>

      <div>
        {currentQuestion.options.map((opt) => (
          <button
            key={opt.id}
            style={selectedAnswer === opt.id ? btnSelectedBase : btnBase}
            onClick={() => selectAnswer(currentQuestion.id, opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'var(--space-md)' }}>
        {!isFirst && (
          <button
            onClick={handleBack}
            style={{ ...btnBase, width: 'auto', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}
          >
            ← Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!selectedAnswer}
          style={{
            ...btnBase,
            width: 'auto',
            padding: '0.5rem 1.5rem',
            fontSize: '0.95rem',
            fontWeight: 600,
            background: selectedAnswer ? 'var(--color-primary, #2d6a4f)' : 'var(--color-border, #e0e0e0)',
            color: selectedAnswer ? 'white' : 'var(--color-text-secondary)',
            border: 'none',
            cursor: selectedAnswer ? 'pointer' : 'not-allowed',
          }}
        >
          {isLast ? 'Show my matches →' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
