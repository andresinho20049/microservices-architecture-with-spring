-- PAYCHECK -> calc net pay
CREATE OR REPLACE FUNCTION calculate_net_pay()
RETURNS TRIGGER AS $$
BEGIN
  IF ((TG_OP = 'INSERT' OR TG_OP = 'UPDATE') AND TG_TABLE_NAME = 'paycheck') THEN
    NEW.net_pay = NEW.gross_earn - NEW.deduction;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_net_pay_trigger
BEFORE INSERT OR UPDATE ON paycheck
FOR EACH ROW
EXECUTE FUNCTION calculate_net_pay();

-- TIMESHEET & PROJECT -> Valid period
CREATE OR REPLACE FUNCTION validate_timesheet_project()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') AND (TG_TABLE_NAME = 'timesheet')
  ) THEN
    IF (
      (NEW.period_end IS NULL) OR (
        (NEW.period_end >= NEW.period_start) AND
        (SELECT p.id FROM project p WHERE p.project_start <= NEW.period_start AND p.project_end >= NEW.period_end) IS NOT NULL
      )
    ) THEN
      RETURN NEW;
    ELSE
      RAISE EXCEPTION 'Invalid period Start and End in Timesheet or Project';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_timesheet_project_trigger
BEFORE INSERT OR UPDATE ON timesheet
FOR EACH ROW
EXECUTE FUNCTION validate_timesheet_project();

CREATE OR REPLACE FUNCTION validate_project_period()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND TG_TABLE_NAME = 'project') THEN
    IF (
        (SELECT 
            count(t.id)
        FROM timesheet t 
        WHERE t.project_id = NEW.id AND (
            t.period_start < NEW.project_start OR
            t.period_end > NEW.project_end)) = 0
    ) THEN
      RETURN NEW;
    ELSE
      RAISE EXCEPTION 'Invalid project period on update';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_project_period_trigger
BEFORE UPDATE ON project
FOR EACH ROW
EXECUTE FUNCTION validate_project_period();