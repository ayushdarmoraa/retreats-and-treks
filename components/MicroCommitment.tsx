'use client';

import { useState, useEffect } from 'react';
import { track } from '@/utils/telemetry';

interface MicroCommitmentProps {
  /** Unique key for localStorage (e.g. slug) */
  itemKey: string;
  /** Human-readable title for the saved item */
  title: string;
  /** Current page path for telemetry */
  sourcePath: string;
  /** Show "Download itinerary" action */
  showDownload?: boolean;
  /** Show "Join waitlist" action (for sold-out or near-full events) */
  showWaitlist?: boolean;
}

const STORAGE_KEY = 'saved-retreats';

function getSaved(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function toggleSaved(key: string): boolean {
  const list = getSaved();
  const idx = list.indexOf(key);
  if (idx > -1) {
    list.splice(idx, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return false;
  }
  list.push(key);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return true;
}

export default function MicroCommitment({
  itemKey,
  title,
  sourcePath,
  showDownload = false,
  showWaitlist = false,
}: MicroCommitmentProps) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSaved(getSaved().includes(itemKey));
  }, [itemKey]);

  function handleSave() {
    const nowSaved = toggleSaved(itemKey);
    setSaved(nowSaved);
    track({ event: 'micro_save', from: sourcePath, meta: { item: itemKey, action: nowSaved ? 'save' : 'unsave' } });
  }

  function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title, url }).catch(() => {});
      track({ event: 'micro_share', from: sourcePath, meta: { item: itemKey, method: 'native' } });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
      track({ event: 'micro_share', from: sourcePath, meta: { item: itemKey, method: 'clipboard' } });
    }
  }

  function handleDownload() {
    track({ event: 'micro_download', from: sourcePath, meta: { item: itemKey } });
    window.print();
  }

  const btnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.4rem 0.75rem',
    border: '1px solid var(--color-border, #e0e0e0)',
    borderRadius: 'var(--radius-sm, 6px)',
    background: 'white',
    color: 'var(--color-text)',
    fontSize: '0.8rem',
    fontWeight: 500,
    cursor: 'pointer',
    lineHeight: 1.4,
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        margin: '1rem 0',
      }}
    >
      <button type="button" onClick={handleSave} style={{ ...btnStyle, ...(saved ? { borderColor: 'var(--color-primary, #2d6a4f)', color: 'var(--color-primary, #2d6a4f)' } : {}) }}>
        {saved ? '♥ Saved' : '♡ Save this retreat'}
      </button>

      <button type="button" onClick={handleShare} style={btnStyle}>
        {copied ? '✓ Link copied' : '↗ Share'}
      </button>

      {showDownload && (
        <button type="button" onClick={handleDownload} style={btnStyle}>
          ↓ Download itinerary
        </button>
      )}

      {showWaitlist && (
        <button type="button" onClick={handleSave} style={{ ...btnStyle, borderColor: '#e67700', color: '#e67700' }}>
          🔔 Notify me of openings
        </button>
      )}
    </div>
  );
}
