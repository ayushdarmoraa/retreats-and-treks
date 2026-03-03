/**
 * Inquiry Storage — Neon Postgres
 *
 * Stores each inquiry in the `inquiries` table.
 * Returns the generated UUID for downstream event correlation.
 *
 * Falls back to JSONL append if DATABASE_URL is not set (dev convenience).
 */

import { getDb } from './db';
import fs from 'fs';
import path from 'path';

const FALLBACK_LOG = path.join(process.cwd(), 'data', 'inquiries.jsonl');

export interface Inquiry {
  name: string;
  email: string;
  interestedIn: 'trek' | 'retreat' | '';
  location: string;
  month: string;
  groupSize: string;
  budget: string;
  source: string;
  vertical: string;
  category: string;
  timestamp: string;
}

/**
 * Insert inquiry into Postgres.
 * Returns the UUID of the inserted row, or null on fallback.
 */
export async function insertInquiry(
  inquiry: Inquiry,
  leadScore: number = 0,
  leadTier: string = 'unscored',
): Promise<string | null> {
  // If no DATABASE_URL, fall back to JSONL (dev/local only)
  if (!process.env.DATABASE_URL) {
    console.warn('[Inquiries] DATABASE_URL not set — falling back to JSONL');
    appendFallback(inquiry);
    return null;
  }

  const sql = getDb();

  const rows = await sql`
    INSERT INTO inquiries (name, email, interested_in, location, month, group_size, budget, source_url, vertical, category, lead_score, lead_tier)
    VALUES (${inquiry.name}, ${inquiry.email}, ${inquiry.interestedIn}, ${inquiry.location}, ${inquiry.month}, ${inquiry.groupSize}, ${inquiry.budget}, ${inquiry.source}, ${inquiry.vertical}, ${inquiry.category}, ${leadScore}, ${leadTier})
    RETURNING id
  `;

  return rows[0]?.id ?? null;
}

/** Dev-only JSONL fallback */
function appendFallback(inquiry: Inquiry): void {
  const dir = path.dirname(FALLBACK_LOG);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.appendFileSync(FALLBACK_LOG, JSON.stringify(inquiry) + '\n', 'utf-8');
}
