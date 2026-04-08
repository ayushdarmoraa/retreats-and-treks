'use client';

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
  duration: string;
  primaryLocation: string;
  intensity: string;
  format: string;
  bestFor: string;
  scores?: RetreatScores;
  rating?: RatingInfo;
}

function MiniScores({ scores }: { scores: RetreatScores }) {
  const dims = Object.entries(scores) as [keyof RetreatScores, number][];
  const labels: Record<keyof RetreatScores, string> = {
    intensity: 'Int',
    reflectionDepth: 'Ref',
    socialInteraction: 'Soc',
    physicalDemand: 'Phy',
  };
  return (
          <div style={{ display: 'grid', gap: '5px', minWidth: '90px' }}>
      {dims.map(([dim, val]) => (
        <div key={dim} title={`${dim}: ${val}/10`} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{
            fontSize: '0.75rem',
            color: '#aaaaaa',
            width: '22px',
            flexShrink: 0,
            fontFamily: 'var(--font-geist-sans), sans-serif',
            letterSpacing: '0.05em',
          }}>{labels[dim]}</span>
          <div style={{
            flex: 1, height: '4px',
            background: 'rgba(15,118,110,0.08)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${Math.round((val / 10) * 100)}%`,
              height: '100%',
              background: val <= 3
                ? 'rgba(15,118,110,0.5)'
                : val <= 6
                ? 'var(--color-primary)'
                : '#e07b39',
              borderRadius: '4px',
              transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
            }} />
          </div>
          <span style={{
            fontSize: '0.75rem',
            color: '#999999',
            width: '14px',
            textAlign: 'right',
            fontFamily: 'var(--font-geist-sans), sans-serif',
          }}>{val}</span>
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
    cmp = (INTENSITY_ORDER[a.intensity as keyof typeof INTENSITY_ORDER] ?? 99) -
          (INTENSITY_ORDER[b.intensity as keyof typeof INTENSITY_ORDER] ?? 99);
  } else if (key === 'duration') {
    cmp = (DURATION_ORDER[a.duration as keyof typeof DURATION_ORDER] ?? 99) -
          (DURATION_ORDER[b.duration as keyof typeof DURATION_ORDER] ?? 99);
  } else {
    cmp = a[key].localeCompare(b[key]);
  }
  return dir === 'asc' ? cmp : -cmp;
}

function SortIndicator({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span style={{ marginLeft: '0.35rem', fontSize: '0.75rem' }}>⇅</span>;
  return <span style={{ marginLeft: '0.35rem', color: '#374151', fontSize: '0.75rem' }}>{dir === 'asc' ? '↑' : '↓'}</span>;
}

const INTENSITY_PILL: Record<string, React.CSSProperties> = {
  low:    { background: 'rgba(15,118,110,0.08)', color: '#374151' },
  medium: { background: 'rgba(245,158,11,0.08)', color: '#b45309' },
  high:   { background: 'rgba(220,38,38,0.08)',  color: '#b91c1c' },
};

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

  return (
    <div className="pmt-wrap">
      <style>{`
        .pmt-wrap {
          font-family: var(--font-geist-sans), sans-serif;
        }

        /* ── Filter bar ── */
        .pmt-filters {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: #f7f9f7;
          border: 1px solid rgba(15,118,110,0.08);
          border-radius: 8px;
        }

        .pmt-filter-label {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #555555;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          white-space: nowrap;
        }

        .pmt-select {
          padding: 0.35rem 0.7rem;
          border: 1px solid rgba(15,118,110,0.2);
          border-radius: 100px;
          font-size: 0.75rem;
          font-family: var(--font-geist-sans), sans-serif;
          background: #ffffff;
          color: #333333;
          cursor: pointer;
          transition: border-color 0.2s;
          appearance: none;
          -webkit-appearance: none;
          padding-right: 1.4rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%230f766e' opacity='.4'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.5rem center;
        }
        .pmt-select:focus {
          outline: none;
          border-color: #374151;
        }

        .pmt-clear-btn {
          font-size: 0.75rem;
          font-family: var(--font-geist-sans), sans-serif;
          color: #374151;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: opacity 0.2s;
        }
        .pmt-clear-btn:hover { opacity: 1; }

        .pmt-count {
          margin-left: auto;
          font-size: 0.75rem;
          color: #aaaaaa;
          letter-spacing: 0.05em;
        }

        /* ── Table ── */
        .pmt-scroll { overflow-x: auto; }

        .pmt-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 640px;
        }

        .pmt-table thead tr {
          border-bottom: 1px solid rgba(15,118,110,0.12);
        }

        .pmt-th {
          padding: 0.85rem 1rem;
          text-align: left;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #aaaaaa;
          background: #ffffff;
          cursor: pointer;
          user-select: none;
          white-space: nowrap;
          transition: color 0.2s;
        }
        .pmt-th:hover { color: #374151; }
        .pmt-th.active { color: #374151; }
        .pmt-th.no-sort { cursor: default; }
        .pmt-th.no-sort:hover { color: #aaaaaa; }

        /* ── Rows ── */
        .pmt-table tbody tr {
          border-bottom: 1px solid rgba(15,118,110,0.06);
          transition: background 0.18s;
        }
        .pmt-table tbody tr:hover { background: #f7f9f7; }

        .pmt-td {
          padding: 1rem 1rem;
          vertical-align: middle;
          font-size: 0.82rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-weight: 300;
          line-height: 1.6;
          color: #444444;
        }

        /* Program title link */
        .pmt-title-link {
          font-size: 0.88rem;
          font-weight: 400;
          color: #374151;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: opacity 0.2s;
          display: block;
        }
        .pmt-title-link:hover { 5; }

        /* Pills */
        .pmt-pill {
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 500;
          font-family: var(--font-geist-sans), sans-serif;
          text-transform: capitalize;
          white-space: nowrap;
        }
        .pmt-pill-grey {
          background: #f0f0f0;
          color: #888888;
        }

        /* Best for text */
        .pmt-bestfor {
          font-size: 0.78rem;
          color: #888888;
          font-weight: 300;
          line-height: 1.55;
        }

        /* Empty state */
        .pmt-empty {
          text-align: center;
          padding: 3rem 1rem;
          color: #aaaaaa;
          font-size: 0.85rem;
          font-weight: 300;
        }
      `}</style>

      {/* Filters */}
      <div className="pmt-filters">
        <label className="pmt-filter-label">
          Filter by intensity:
          <select
            className="pmt-select"
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

        <label className="pmt-filter-label">
          Filter by duration:
          <select
            className="pmt-select"
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
            className="pmt-clear-btn"
            onClick={() => { setFilterIntensity('all'); setFilterDuration('all'); }}
          >
            Clear filters
          </button>
        )}

        <span className="pmt-count">
          {sorted.length} of {rows.length} programs
        </span>
      </div>

      {/* Table */}
      <div className="pmt-scroll">
        <table className="pmt-table">
          <thead>
            <tr>
              <th className={`pmt-th${sortKey === 'title' ? ' active' : ''}`} onClick={() => handleSort('title')}>
                Program <SortIndicator active={sortKey === 'title'} dir={sortDir} />
              </th>
              <th className={`pmt-th${sortKey === 'duration' ? ' active' : ''}`} onClick={() => handleSort('duration')}>
                Duration <SortIndicator active={sortKey === 'duration'} dir={sortDir} />
              </th>
              <th className={`pmt-th${sortKey === 'primaryLocation' ? ' active' : ''}`} onClick={() => handleSort('primaryLocation')}>
                Location <SortIndicator active={sortKey === 'primaryLocation'} dir={sortDir} />
              </th>
              <th className={`pmt-th${sortKey === 'intensity' ? ' active' : ''}`} onClick={() => handleSort('intensity')}>
                Intensity <SortIndicator active={sortKey === 'intensity'} dir={sortDir} />
              </th>
              <th className={`pmt-th${sortKey === 'format' ? ' active' : ''}`} onClick={() => handleSort('format')}>
                Format <SortIndicator active={sortKey === 'format'} dir={sortDir} />
              </th>
              <th className="pmt-th no-sort">Best For</th>
              <th className="pmt-th no-sort" style={{ minWidth: '110px' }}>Profile</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={row.slug}>
                <td className="pmt-td">
                  <TrackLink
                    href={`/retreats/journeys/${row.slug}`}
                    event="matrix_to_journey"
                    from={fromPath}
                    className="pmt-title-link"
                  >
                    {row.title}
                  </TrackLink>
                  {row.rating && (
                    <div style={{ marginTop: '4px' }}>
                      <RatingBadge rating={row.rating} variant="compact" />
                    </div>
                  )}
                </td>
                <td className="pmt-td">
                  <span className="pmt-pill pmt-pill-grey">
                    {row.duration === 'flexible' ? 'Flexible / custom' : row.duration}
                  </span>
                </td>
                <td className="pmt-td" style={{ textTransform: 'capitalize' }}>{row.primaryLocation}</td>
                <td className="pmt-td">
                  <span
                    className="pmt-pill"
                    style={INTENSITY_PILL[row.intensity] ?? { background: '#f0f0f0', color: '#888888' }}
                  >
                    {row.intensity}
                  </span>
                </td>
                <td className="pmt-td">
                  <span className="pmt-pill pmt-pill-grey">{row.format}</span>
                </td>
                <td className="pmt-td">
                  <span className="pmt-bestfor">{row.bestFor}</span>
                </td>
                <td className="pmt-td">
                  {row.scores
                    ? <MiniScores scores={row.scores} />
                    : <span style={{ color: '#cccccc', fontSize: '0.8rem' }}>—</span>
                  }
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="pmt-empty">
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