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

-- TIMESHEET -> Validate if period is valid
CREATE OR REPLACE FUNCTION validate_timesheet()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') AND (TG_TABLE_NAME = 'timesheet')
  ) THEN
    IF (
      
      (NEW.period_start < NEW.period_end) AND
      (WITH timesheet_temp AS (
          SELECT 
            *
          FROM timesheet t 
          WHERE t.id != NEW.id AND t.project_id = NEW.project_id AND t.employee_id = NEW.employee_id AND (
            (t.period_start BETWEEN NEW.period_start AND NEW.period_end) OR 
            (t.period_end BETWEEN NEW.period_start AND NEW.period_end)
          )
        ), project_temp AS (
          SELECT 
            *
          FROM project p 
          WHERE p.id = NEW.project_id AND (
            (p.project_start > NEW.period_start) OR 
            (p.project_end < NEW.period_end)
          )
        ), employee_temp AS (
          SELECT 
            *
          FROM employee e 
          WHERE e.id = NEW.employee_id AND (
            (e.hire_date > NEW.period_start) OR 
            (e.termination_date < NEW.period_end)
          )
        )
      SELECT 
        t.company_id 
      FROM timesheet_temp t
      UNION 
      SELECT 
        p.company_id 
      FROM project_temp p
      UNION 
      SELECT 
        e.company_id
      FROM employee_temp e) IS NULL

    ) THEN
      RETURN NEW;
    ELSE
      RAISE EXCEPTION 'Invalid start or end timesheet period';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_timesheet_trigger
BEFORE INSERT OR UPDATE ON timesheet
FOR EACH ROW
EXECUTE FUNCTION validate_timesheet();


-- PROJECT -> Validate if period is valid
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


-- EMPLOYEE -> Validate if period is valid
CREATE OR REPLACE FUNCTION validate_employee_period()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND TG_TABLE_NAME = 'employee') THEN
    IF (
        (SELECT 
            count(t.id)
        FROM timesheet t 
        WHERE t.employee_id = NEW.id AND (
            t.period_start < NEW.hire_date OR
            t.period_end > NEW.termination_date)) = 0
    ) THEN
      RETURN NEW;
    ELSE
      RAISE EXCEPTION 'Invalid employee period on update';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_employee_period_trigger
BEFORE UPDATE ON employee
FOR EACH ROW
EXECUTE FUNCTION validate_employee_period();