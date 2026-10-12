BEGIN;

ALTER TABLE conversion_events
  DROP CONSTRAINT IF EXISTS chk_event_type;

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

COMMIT;
