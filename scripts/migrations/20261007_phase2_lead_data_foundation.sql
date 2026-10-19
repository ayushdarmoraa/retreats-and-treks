BEGIN;

CREATE TABLE IF NOT EXISTS lead_reference_state (
  reference_date DATE PRIMARY KEY,
  last_value INTEGER NOT NULL DEFAULT 0
);

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
  RETURNING last_value INTO v_counter;

  IF v_counter IS NULL THEN
    SELECT last_value INTO v_counter
    FROM lead_reference_state
    WHERE reference_date = p_reference_date;
  END IF;

  v_reference := 'RT-' || to_char(p_reference_date, 'YYMMDD') || '-' || LPAD(v_counter::text, 4, '0');
  RETURN v_reference;
END;
$$;

ALTER TABLE inquiries
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS age INTEGER,
  ADD COLUMN IF NOT EXISTS origin_city TEXT,
  ADD COLUMN IF NOT EXISTS origin_country TEXT,
  ADD COLUMN IF NOT EXISTS interest TEXT,
  ADD COLUMN IF NOT EXISTS preferred_timing TEXT,
  ADD COLUMN IF NOT EXISTS destination TEXT,
  ADD COLUMN IF NOT EXISTS departure TEXT,
  ADD COLUMN IF NOT EXISTS departure_date TEXT,
  ADD COLUMN IF NOT EXISTS additional_request TEXT,
  ADD COLUMN IF NOT EXISTS lead_reference TEXT,
  ADD COLUMN IF NOT EXISTS conversion_session_id TEXT,
  ADD COLUMN IF NOT EXISTS first_landing_page TEXT,
  ADD COLUMN IF NOT EXISTS last_landing_page TEXT,
  ADD COLUMN IF NOT EXISTS page_title TEXT,
  ADD COLUMN IF NOT EXISTS page_type TEXT,
  ADD COLUMN IF NOT EXISTS cta_id TEXT,
  ADD COLUMN IF NOT EXISTS cta_position TEXT,
  ADD COLUMN IF NOT EXISTS cta_label TEXT,
  ADD COLUMN IF NOT EXISTS cta_variant TEXT,
  ADD COLUMN IF NOT EXISTS referrer TEXT,
  ADD COLUMN IF NOT EXISTS first_utm_source TEXT,
  ADD COLUMN IF NOT EXISTS first_utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS first_utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS first_utm_term TEXT,
  ADD COLUMN IF NOT EXISTS first_utm_content TEXT,
  ADD COLUMN IF NOT EXISTS last_utm_source TEXT,
  ADD COLUMN IF NOT EXISTS last_utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS last_utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS last_utm_term TEXT,
  ADD COLUMN IF NOT EXISTS last_utm_content TEXT,
  ADD COLUMN IF NOT EXISTS idempotency_key TEXT,
  ADD COLUMN IF NOT EXISTS canonical_lead_tier TEXT;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'inquiries' AND column_name = 'email' AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE inquiries ALTER COLUMN email DROP NOT NULL;
  END IF;
END $$;

DO $$
BEGIN
  ALTER TABLE inquiries
    DROP CONSTRAINT IF EXISTS chk_lead_tier;
  EXCEPTION WHEN undefined_object THEN NULL;
END $$;

ALTER TABLE inquiries
  ADD CONSTRAINT chk_lead_tier
  CHECK (lead_tier IN ('hot', 'warm', 'nurture', 'early', 'cold', 'unscored'));

DO $$
BEGIN
  ALTER TABLE inquiries
    ADD CONSTRAINT chk_canonical_lead_tier
    CHECK (canonical_lead_tier IS NULL OR canonical_lead_tier IN ('hot', 'warm', 'nurture', 'early'));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'inquiries'::regclass
      AND conname = 'chk_idempotency_key_unique'
  ) THEN
    ALTER TABLE inquiries
      ADD CONSTRAINT chk_idempotency_key_unique UNIQUE (idempotency_key);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'inquiries'::regclass
      AND conname = 'chk_lead_reference_unique'
  ) THEN
    ALTER TABLE inquiries
      ADD CONSTRAINT chk_lead_reference_unique UNIQUE (lead_reference);
  END IF;
END $$;

UPDATE inquiries
SET canonical_lead_tier = CASE
  WHEN lead_tier = 'hot' THEN 'hot'
  WHEN lead_tier = 'warm' THEN 'warm'
  WHEN lead_tier = 'nurture' THEN 'nurture'
  WHEN lead_tier = 'early' THEN 'early'
  ELSE NULL
END
WHERE canonical_lead_tier IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_inquiries_lead_reference
  ON inquiries (lead_reference)
  WHERE lead_reference IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_inquiries_idempotency_key
  ON inquiries (idempotency_key)
  WHERE idempotency_key IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at
  ON inquiries (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_inquiries_status
  ON inquiries (status);

CREATE INDEX IF NOT EXISTS idx_inquiries_lead_tier
  ON inquiries (lead_tier);

CREATE INDEX IF NOT EXISTS idx_inquiries_vertical_category
  ON inquiries (vertical, category);

CREATE INDEX IF NOT EXISTS idx_inquiries_product_id
  ON inquiries (product_id);

CREATE INDEX IF NOT EXISTS idx_inquiries_location
  ON inquiries (location);

CREATE INDEX IF NOT EXISTS idx_inquiries_conversion_session_id
  ON inquiries (conversion_session_id);

ALTER TABLE conversion_events
  ADD COLUMN IF NOT EXISTS conversion_session_id TEXT,
  ADD COLUMN IF NOT EXISTS page_path TEXT,
  ADD COLUMN IF NOT EXISTS page_type TEXT,
  ADD COLUMN IF NOT EXISTS cta_id TEXT,
  ADD COLUMN IF NOT EXISTS cta_position TEXT,
  ADD COLUMN IF NOT EXISTS cta_label TEXT,
  ADD COLUMN IF NOT EXISTS cta_variant TEXT,
  ADD COLUMN IF NOT EXISTS lead_reference TEXT;

DO $$
BEGIN
  ALTER TABLE conversion_events
    ADD CONSTRAINT chk_event_type
    CHECK (event_type IN (
      'conversion_cta_view',
      'conversion_cta_click',
      'lead_capture_open',
      'lead_capture_step_view',
      'lead_capture_step_complete',
      'lead_capture_abandon',
      'lead_submitted',
      'whatsapp_handoff',
      'phone_click',
      'page_view',
      'topic_to_pillar',
      'blog_to_journey',
      'comparison_to_journey',
      'pillar_to_journey',
      'matrix_to_journey',
      'form_submission',
      'scroll_depth',
      'faq_expand',
      'comparison_sort',
      'comparison_filter',
      'finder_complete',
      'availability_form_submit',
      'departure_table_click',
      'calendar_filter',
      'micro_save',
      'micro_share',
      'micro_download',
      'yoga_form_completion',
      'yoga_finder_start',
      'yoga_finder_recommendation',
      'yoga_departure_selection',
      'inquiry_submitted',
      'inquiry_validation_failed',
      'inquiry_spam_blocked',
      'inquiry_email_sent',
      'inquiry_email_failed',
      'status_change',
      'followup_sent'
    ));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_conversion_events_created_at
  ON conversion_events (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_conversion_events_type_time
  ON conversion_events (event_type, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_conversion_events_inquiry_id
  ON conversion_events (inquiry_id);

CREATE INDEX IF NOT EXISTS idx_conversion_events_session
  ON conversion_events (conversion_session_id);

CREATE INDEX IF NOT EXISTS idx_conversion_events_cta_id
  ON conversion_events (cta_id);

CREATE INDEX IF NOT EXISTS idx_conversion_events_page_path
  ON conversion_events (page_path);

CREATE INDEX IF NOT EXISTS idx_conversion_events_vertical_category
  ON conversion_events (vertical, category);

COMMENT ON TABLE inquiries IS 'Lead pipeline table preserving legacy and canonical values. lead_tier stores current legacy values; canonical_lead_tier is for normalized future use.';
COMMENT ON TABLE lead_reference_state IS 'Atomic counter table for generating stable RT-YYMMDD-#### reference codes.';

COMMIT;
