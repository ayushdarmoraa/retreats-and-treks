CREATE OR REPLACE FUNCTION next_lead_reference(p_reference_date DATE DEFAULT current_date)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  v_counter INTEGER;
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

  RETURN 'RT-' || to_char(p_reference_date, 'YYMMDD') || '-' || LPAD(v_counter::text, 4, '0');
END;
$$;
