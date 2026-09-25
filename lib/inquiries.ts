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
  phone: string;
  yogaInterest: string;
  interestedIn: 'trek' | 'retreat' | '';
  location: string;
  month: string;
  preferredDate: string;
  groupSize: string;
  budget: string;
  duration: string;
  yogaExperience: string;
  bookingReadiness: string;
  yogaClassification: string;
  source: string;
  vertical: string;
  category: string;
  trek: string;
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

  // Store phone in email column when email is empty (mini lead form)
  const contactField = inquiry.email || inquiry.phone;

  const rows = await sql`
    INSERT INTO inquiries (name, email, phone, yoga_interest, yoga_classification, interested_in, location, month, preferred_date, group_size, budget, duration, yoga_experience, booking_readiness, source_url, vertical, category, lead_score, lead_tier)
    VALUES (${inquiry.name}, ${contactField}, ${inquiry.phone}, ${inquiry.yogaInterest}, ${inquiry.yogaClassification}, ${inquiry.interestedIn}, ${inquiry.location}, ${inquiry.month}, ${inquiry.preferredDate}, ${inquiry.groupSize}, ${inquiry.budget}, ${inquiry.duration}, ${inquiry.yogaExperience}, ${inquiry.bookingReadiness}, ${inquiry.source}, ${inquiry.vertical}, ${inquiry.category || inquiry.trek}, ${leadScore}, ${leadTier})
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
