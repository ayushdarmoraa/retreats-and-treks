'use client';

/**
 * ProgramMatrixTable
 *
 * Client component for sortable program matrix.
 * Receives pre-fetched row data from the server page.
 * No data fetching — pure presentation + sort logic.
 */

import { useState, useMemo } from 'react';
import Link from 'next/link';
import TrackLink from './TrackLink';
import { track } from '@/utils/telemetry';
import { setIntensityPref, setDurationPref } from '@/utils/sessionPreferences';
import RatingBadge, { type RatingInfo } from './RatingBadge';
import type { RetreatScores } from '@/config/retreatScores';

export interface MatrixRow {
  slug: string;
  title: string;
  duration: string;          // '3-day' | '5-day' | 'flexible'
  primaryLocation: string;
  intensity: string;
  format: string;
  bestFor: string;
  scores?: RetreatScores;
  rating?: RatingInfo;
}

/** Compact inline score bar — pure CSS, rendered client-side in table */
function MiniScores({ scores }: { scores: RetreatScores }) {
  const dims = Object.entries(scores) as [keyof RetreatScores, number][];
  const labels: Record<keyof RetreatScores, string> = {
    intensity: 'Int',
    reflectionDepth: 'Ref',
    socialInteraction: 'Soc',
    physicalDemand: 'Phy',
  };
  return (
    <div style={{ display: 'grid', gap: '4px', minWidth: '80px' }}>
      {dims.map(([dim, val]) => (
        <div key={dim} title={`${dim}: ${val}/10`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)', width: '22px', flexShrink: 0 }}>{labels[dim]}</span>
          <div style={{ flex: 1, height: '5px', background: 'var(--color-border, #e5e5e5)', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${Math.round((val / 10) * 100)}%`,
                height: '100%',
                background: val <= 3 ? '#4caf50' : val <= 6 ? '#2d6a4f' : '#e07b39',
                borderRadius: '3px',
              }}
            />
          </div>
          <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)', width: '14px', textAlign: 'right' }}>{val}</span>
        </div>
      ))}
    </div>
  );
}

type SortKey = 'title' | 'duration' | 'primaryLocation' | 'intensity' | 'format';
type SortDir = 'asc' | 'desc';

const INTENSITY_ORDER = { low: 0, medium: 1, high: 2 };
const DURATION_ORDER = { '3-day': 0, '5-day': 1, 'flexible': 2 };

function compareRows(a: MatrixRow, b: MatrixRow, key: SortKey, dir: SortDir): number {
  let cmp = 0;
  if (key === 'intensity') {
    cmp =
      (INTENSITY_ORDER[a.intensity as keyof typeof INTENSITY_ORDER] ?? 99) -
      (INTENSITY_ORDER[b.intensity as keyof typeof INTENSITY_ORDER] ?? 99);
  } else if (key === 'duration') {
    cmp =
      (DURATION_ORDER[a.duration as keyof typeof DURATION_ORDER] ?? 99) -
      (DURATION_ORDER[b.duration as keyof typeof DURATION_ORDER] ?? 99);
  } else {
    cmp = a[key].localeCompare(b[key]);
  }
  return dir === 'asc' ? cmp : -cmp;
}

const thBase: React.CSSProperties = {
  padding: '0.75rem 1rem',
  textAlign: 'left',
  fontWeight: 600,
  fontSize: '0.875rem',
  borderBottom: '2px solid var(--color-border, #e0e0e0)',
  background: 'var(--color-surface, #fafafa)',
  cursor: 'pointer',
  userSelect: 'none',
  whiteSpace: 'nowrap',
};

const tdBase: React.CSSProperties = {
  padding: '0.75rem 1rem',
  verticalAlign: 'top',
  borderBottom: '1px solid var(--color-border, #e0e0e0)',
  fontSize: '0.9rem',
  lineHeight: 1.6,
};

function SortIndicator({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span style={{ opacity: 0.25, marginLeft: '0.4rem' }}>⇅</span>;
  return <span style={{ marginLeft: '0.4rem' }}>{dir === 'asc' ? '↑' : '↓'}</span>;
}

export default function ProgramMatrixTable({ rows, fromPath }: { rows: MatrixRow[]; fromPath: string }) {
  const [sortKey, setSortKey] = useState<SortKey>('duration');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [filterIntensity, setFilterIntensity] = useState<string>('all');
  const [filterDuration, setFilterDuration] = useState<string>('all');

  function handleSort(key: SortKey) {
    const newDir = key === sortKey ? (sortDir === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortKey(key);
    setSortDir(newDir);
    track({ event: 'comparison_sort', from: fromPath, meta: { key, dir: newDir } });
  }

  const sorted = useMemo(() => {
    return [...rows]
      .filter((r) => filterIntensity === 'all' || r.intensity === filterIntensity)
      .filter((r) => filterDuration === 'all' || r.duration === filterDuration)
      .sort((a, b) => compareRows(a, b, sortKey, sortDir));
  }, [rows, sortKey, sortDir, filterIntensity, filterDuration]);

  const selectStyle: React.CSSProperties = {
    padding: '0.4rem 0.75rem',
    border: '1px solid var(--color-border, #e0e0e0)',
    borderRadius: '4px',
    fontSize: '0.875rem',
    background: 'var(--color-surface, #fff)',
    cursor: 'pointer',
  };

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: 'var(--space-lg)', flexWrap: 'wrap', alignItems: 'center' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>
          Filter by intensity:{' '}
          <select
            style={selectStyle}
            value={filterIntensity}
            onChange={(e) => {
              setFilterIntensity(e.target.value);
              track({ event: 'comparison_filter', from: fromPath, meta: { filter: `intensity:${e.target.value}` } });
              if (e.target.value !== 'all') setIntensityPref(e.target.value as 'low' | 'medium' | 'high');
            }}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>
          Filter by duration:{' '}
          <select
            style={selectStyle}
            value={filterDuration}
            onChange={(e) => {
              setFilterDuration(e.target.value);
              track({ event: 'comparison_filter', from: fromPath, meta: { filter: `duration:${e.target.value}` } });
              if (e.target.value !== 'all') setDurationPref(e.target.value as '3-day' | '5-day' | 'flexible');
            }}
          >
            <option value="all">All durations</option>
            <option value="3-day">3-day</option>
            <option value="5-day">5-day</option>
            <option value="flexible">Flexible / custom</option>
          </select>
        </label>
        {(filterIntensity !== 'all' || filterDuration !== 'all') && (
          <button
            style={{ ...selectStyle, border: 'none', textDecoration: 'underline', background: 'transparent', color: 'var(--color-primary)' }}
            onClick={() => { setFilterIntensity('all'); setFilterDuration('all'); }}
          >
            Clear filters
          </button>
        )}
        <span style={{ marginLeft: 'auto', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          {sorted.length} of {rows.length} programs
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
          <thead>
            <tr>
              <th style={thBase} onClick={() => handleSort('title')}>
                Program <SortIndicator active={sortKey === 'title'} dir={sortDir} />
              </th>
              <th style={thBase} onClick={() => handleSort('duration')}>
                Duration <SortIndicator active={sortKey === 'duration'} dir={sortDir} />
              </th>
              <th style={thBase} onClick={() => handleSort('primaryLocation')}>
                Location <SortIndicator active={sortKey === 'primaryLocation'} dir={sortDir} />
              </th>
              <th style={thBase} onClick={() => handleSort('intensity')}>
                Intensity <SortIndicator active={sortKey === 'intensity'} dir={sortDir} />
              </th>
              <th style={thBase} onClick={() => handleSort('format')}>
                Format <SortIndicator active={sortKey === 'format'} dir={sortDir} />
              </th>
              <th style={{ ...thBase, cursor: 'default' }}>Best For</th>
              <th style={{ ...thBase, cursor: 'default', minWidth: '110px' }}>Profile</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={row.slug}>
                <td style={{ ...tdBase, fontWeight: 500 }}>
                  <TrackLink
                    href={`/retreats/journeys/${row.slug}`}
                    event="matrix_to_journey"
                    from={fromPath}
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {row.title}
                  </TrackLink>
                  {row.rating && (
                    <div style={{ marginTop: '3px' }}>
                      <RatingBadge rating={row.rating} variant="compact" />
                    </div>
                  )}
                </td>
                <td style={{ ...tdBase, whiteSpace: 'nowrap', textTransform: 'capitalize' }}>
                  {row.duration === 'flexible' ? 'Flexible / custom' : row.duration}
                </td>
                <td style={{ ...tdBase, textTransform: 'capitalize' }}>{row.primaryLocation}</td>
                <td style={{ ...tdBase, textTransform: 'capitalize' }}>{row.intensity}</td>
                <td style={{ ...tdBase, textTransform: 'capitalize' }}>{row.format}</td>
                <td style={{ ...tdBase, color: 'var(--color-text-secondary)' }}>{row.bestFor}</td>
                <td style={tdBase}>
                  {row.scores ? <MiniScores scores={row.scores} /> : <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>—</span>}
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} style={{ ...tdBase, textAlign: 'center', color: 'var(--color-text-secondary)', padding: '2rem' }}>
                  No programs match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
