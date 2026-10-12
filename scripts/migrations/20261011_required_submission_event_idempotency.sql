BEGIN;

ALTER TABLE conversion_events
  ADD COLUMN IF NOT EXISTS event_idempotency_key TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_conversion_events_idempotency_key
  ON conversion_events (event_idempotency_key)
  WHERE event_idempotency_key IS NOT NULL;

COMMIT;
