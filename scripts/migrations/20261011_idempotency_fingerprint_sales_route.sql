BEGIN;

ALTER TABLE inquiries
  ADD COLUMN IF NOT EXISTS idempotency_payload_hash TEXT,
  ADD COLUMN IF NOT EXISTS sales_route TEXT;

CREATE INDEX IF NOT EXISTS idx_inquiries_sales_route
  ON inquiries (sales_route);

COMMENT ON COLUMN inquiries.phone IS
  'Nullable for historical rows; required and validated for new inquiry submissions.';

COMMIT;
