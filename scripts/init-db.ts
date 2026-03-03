/**
 * Database Schema Initialization Script
 *
 * Run once to create the inquiries table in Neon Postgres:
 *   npx ts-node --project tsconfig.json scripts/init-db.ts
 *
 * Requires DATABASE_URL in environment.
 */

import { neon } from '@neondatabase/serverless';

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }

  const sql = neon(url);

  // Enable uuid generation
  await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`;

  // Inquiries table — revenue pipeline
  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name          TEXT NOT NULL,
      email         TEXT NOT NULL,
      interested_in TEXT,
      location      TEXT,
      month         TEXT,
      group_size    TEXT,
      budget        TEXT,
      source_url    TEXT,
      vertical      TEXT,
      category      TEXT,
      lead_score    SMALLINT NOT NULL DEFAULT 0,
      lead_tier     TEXT NOT NULL DEFAULT 'unscored',
      status        TEXT NOT NULL DEFAULT 'open',
      followup_count SMALLINT NOT NULL DEFAULT 0,
      last_followup_at TIMESTAMPTZ,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  // ── CHECK constraints (idempotent — safe to re-run) ───────
  await sql`
    DO $$ BEGIN
      ALTER TABLE inquiries
        ADD CONSTRAINT chk_lead_tier
        CHECK (lead_tier IN ('hot', 'warm', 'cold', 'unscored'));
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$
  `;

  await sql`
    DO $$ BEGIN
      ALTER TABLE inquiries
        ADD CONSTRAINT chk_status
        CHECK (status IN ('open', 'replied', 'closed', 'booked'));
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$
  `;

  await sql`
    DO $$ BEGIN
      ALTER TABLE inquiries
        ADD CONSTRAINT chk_lead_score_range
        CHECK (lead_score >= 0 AND lead_score <= 100);
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$
  `;

  // Add status column to existing tables (safe to run multiple times)
  await sql`
    DO $$ BEGIN
      ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'open';
    EXCEPTION WHEN duplicate_column THEN NULL;
    END $$
  `;

  // Conversion events table — analytics pipeline
  await sql`
    CREATE TABLE IF NOT EXISTS conversion_events (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_type TEXT NOT NULL,
      inquiry_id UUID REFERENCES inquiries(id),
      source_url TEXT,
      vertical   TEXT,
      category   TEXT,
      ip_hash    TEXT,
      user_agent TEXT,
      meta       JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  // Indexes for analytics + dashboard queries
  await sql`CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_inquiries_vertical ON inquiries(vertical)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_inquiries_lead_tier ON inquiries(lead_tier)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_events_type ON conversion_events(event_type)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_events_created ON conversion_events(created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_events_inquiry ON conversion_events(inquiry_id)`;

  console.log('✓ Database schema initialized');
}

main().catch((err) => {
  console.error('Schema init failed:', err);
  process.exit(1);
});
