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
      id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name                  TEXT NOT NULL,
      email                 TEXT,
      phone                 TEXT,
      age                   INTEGER,
      origin_city           TEXT,
      origin_country       TEXT,
      interest              TEXT,
      preferred_timing     TEXT,
      destination           TEXT,
      departure            TEXT,
      departure_date       TEXT,
      additional_request    TEXT,
      yoga_interest         TEXT,
      yoga_classification    TEXT,
      yoga_sales_route      TEXT,
      interested_in         TEXT,
      location             TEXT,
      month                TEXT,
      preferred_date       TEXT,
      group_size           TEXT,
      budget               TEXT,
      duration             TEXT,
      yoga_experience      TEXT,
      booking_readiness    TEXT,
      source_url           TEXT,
      vertical             TEXT,
      category             TEXT,
      product              TEXT,
      product_id           TEXT,
      departure_id         TEXT,
      planning_horizon     TEXT,
      recommended_product  TEXT,
      recommended_alternative TEXT,
      lead_score           SMALLINT NOT NULL DEFAULT 0,
      lead_tier            TEXT NOT NULL DEFAULT 'unscored',
      canonical_lead_tier  TEXT,
      lead_reference       TEXT,
      sales_route           TEXT,
      idempotency_payload_hash TEXT,
      conversion_session_id TEXT,
      first_landing_page   TEXT,
      last_landing_page    TEXT,
      page_title           TEXT,
      page_type            TEXT,
      cta_id               TEXT,
      cta_position         TEXT,
      cta_label            TEXT,
      cta_variant          TEXT,
      referrer             TEXT,
      first_utm_source     TEXT,
      first_utm_medium     TEXT,
      first_utm_campaign   TEXT,
      first_utm_term       TEXT,
      first_utm_content    TEXT,
      first_utm_id         TEXT,
      last_utm_source      TEXT,
      last_utm_medium     TEXT,
      last_utm_campaign    TEXT,
      last_utm_term        TEXT,
      last_utm_content    TEXT,
      last_utm_id         TEXT,
      first_touch_at      TIMESTAMPTZ,
      last_touch_at       TIMESTAMPTZ,
      idempotency_key      TEXT,
      status               TEXT NOT NULL DEFAULT 'open',
      followup_count       SMALLINT NOT NULL DEFAULT 0,
      last_followup_at     TIMESTAMPTZ,
      created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`CREATE TABLE IF NOT EXISTS lead_reference_state (
    reference_date DATE PRIMARY KEY,
    last_value INTEGER NOT NULL DEFAULT 0
  )`;

  await sql`
    CREATE OR REPLACE FUNCTION next_lead_reference(p_reference_date DATE DEFAULT current_date)
    RETURNS TEXT
    LANGUAGE plpgsql
    AS $$
    DECLARE
      v_counter INTEGER;
      v_reference TEXT;
    BEGIN
      INSERT INTO lead_reference_state(reference_date, last_value)
      VALUES (p_reference_date, 0)
      ON CONFLICT (reference_date) DO NOTHING;

      UPDATE lead_reference_state
      SET last_value = last_value + 1
      WHERE reference_date = p_reference_date
        AND last_value < 9999
      RETURNING last_value INTO v_counter;

      IF v_counter IS NULL THEN
        RAISE EXCEPTION 'Daily lead reference capacity exhausted for %', p_reference_date
          USING ERRCODE = '22003';
      END IF;

      v_reference := 'RT-' || to_char(p_reference_date, 'YYMMDD') || '-' || LPAD(v_counter::text, 4, '0');
      RETURN v_reference;
    END;
    $$;
  `;

  // Yoga qualification fields — nullable for backward compatibility.
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS phone TEXT`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS yoga_interest TEXT`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS yoga_classification TEXT`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS yoga_sales_route TEXT`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS preferred_date TEXT`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS duration TEXT`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS sales_route TEXT`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS idempotency_payload_hash TEXT`;
  await sql`
    ALTER TABLE inquiries
      ADD COLUMN IF NOT EXISTS first_utm_id TEXT,
      ADD COLUMN IF NOT EXISTS last_utm_id TEXT,
      ADD COLUMN IF NOT EXISTS first_touch_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS last_touch_at TIMESTAMPTZ
  `;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS yoga_experience TEXT`;
  await sql`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS booking_readiness TEXT`;

  await sql`
    DO $$ BEGIN
      ALTER TABLE inquiries
        ADD CONSTRAINT chk_lead_tier
        CHECK (lead_tier IN ('hot', 'warm', 'nurture', 'early', 'cold', 'unscored'));
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

  await sql`
    DO $$ BEGIN
      ALTER TABLE inquiries
        ADD CONSTRAINT chk_canonical_lead_tier
        CHECK (canonical_lead_tier IS NULL OR canonical_lead_tier IN ('hot', 'warm', 'nurture', 'early'));
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$
  `;

  await sql`
    DO $$ BEGIN
      ALTER TABLE inquiries
        ADD CONSTRAINT chk_lead_reference_unique UNIQUE (lead_reference);
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$
  `;

  await sql`
    DO $$ BEGIN
      ALTER TABLE inquiries
        ADD CONSTRAINT chk_idempotency_key_unique UNIQUE (idempotency_key);
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$
  `;

  await sql`
    DO $$ BEGIN
      ALTER TABLE inquiries ALTER COLUMN email DROP NOT NULL;
    EXCEPTION WHEN undefined_column THEN NULL;
    END $$
  `;

  await sql`
    UPDATE inquiries
    SET canonical_lead_tier = CASE
      WHEN lead_tier = 'hot' THEN 'hot'
      WHEN lead_tier = 'warm' THEN 'warm'
      WHEN lead_tier = 'nurture' THEN 'nurture'
      WHEN lead_tier = 'early' THEN 'early'
      ELSE NULL
    END
    WHERE canonical_lead_tier IS NULL
  `;

  // Conversion events table — analytics pipeline
  await sql`
    CREATE TABLE IF NOT EXISTS conversion_events (
      id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_type            TEXT NOT NULL,
      inquiry_id            UUID REFERENCES inquiries(id),
      conversion_session_id  TEXT,
      source_url            TEXT,
      page_path             TEXT,
      page_type             TEXT,
      vertical              TEXT,
      category              TEXT,
      cta_id                TEXT,
      cta_position          TEXT,
      cta_label             TEXT,
      cta_variant           TEXT,
      lead_reference        TEXT,
      ip_hash               TEXT,
      user_agent            TEXT,
      event_idempotency_key TEXT,
      meta                  JSONB DEFAULT '{}',
      created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`ALTER TABLE conversion_events ADD COLUMN IF NOT EXISTS event_idempotency_key TEXT`;
  await sql`ALTER TABLE conversion_events DROP CONSTRAINT IF EXISTS chk_event_type`;
  await sql`
    ALTER TABLE conversion_events
      ADD CONSTRAINT chk_event_type
      CHECK (event_type IN (
        'conversion_cta_view', 'conversion_cta_click', 'lead_capture_open',
        'lead_capture_step_view', 'lead_capture_step_complete', 'lead_capture_abandon',
        'lead_submitted', 'whatsapp_handoff', 'phone_click', 'page_view',
        'topic_to_pillar', 'blog_to_journey', 'comparison_to_journey',
        'pillar_to_journey', 'matrix_to_journey', 'form_submission', 'scroll_depth',
        'faq_expand', 'comparison_sort', 'comparison_filter', 'finder_complete',
        'availability_form_submit', 'departure_table_click', 'calendar_filter',
        'micro_save', 'micro_share', 'micro_download', 'yoga_form_completion',
        'yoga_finder_start', 'yoga_finder_recommendation', 'yoga_departure_selection',
        'inquiry_submitted', 'inquiry_validation_failed', 'inquiry_spam_blocked',
        'inquiry_email_sent', 'inquiry_email_failed', 'status_change', 'followup_sent'
      ))
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_inquiries_lead_tier ON inquiries(lead_tier)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_inquiries_vertical_category ON inquiries(vertical, category)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_inquiries_product_id ON inquiries(product_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_inquiries_location ON inquiries(location)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_inquiries_conversion_session_id ON inquiries(conversion_session_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_inquiries_sales_route ON inquiries(sales_route)`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_inquiries_lead_reference ON inquiries(lead_reference) WHERE lead_reference IS NOT NULL`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_inquiries_idempotency_key ON inquiries(idempotency_key) WHERE idempotency_key IS NOT NULL`;
  await sql`CREATE INDEX IF NOT EXISTS idx_events_type ON conversion_events(event_type)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_events_created ON conversion_events(created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_events_inquiry ON conversion_events(inquiry_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_conversion_events_type_time ON conversion_events(event_type, created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_conversion_events_session ON conversion_events(conversion_session_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_conversion_events_cta_id ON conversion_events(cta_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_conversion_events_page_path ON conversion_events(page_path)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_conversion_events_vertical_category ON conversion_events(vertical, category)`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_conversion_events_idempotency_key ON conversion_events(event_idempotency_key) WHERE event_idempotency_key IS NOT NULL`;
  await sql`COMMENT ON COLUMN inquiries.phone IS 'Nullable for historical rows; required and validated for new inquiry submissions.'`;

  console.log('✓ Database schema initialized');
}

main().catch((err) => {
  console.error('Schema init failed:', err);
  process.exit(1);
});
