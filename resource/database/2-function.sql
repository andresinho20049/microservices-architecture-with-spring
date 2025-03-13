-- Insert or Update an Employee
CREATE OR REPLACE FUNCTION insert_or_update_employee(
  p_id bigint,
  p_name varchar(200),
  p_birth_date date,
  p_hire_date date,
  p_termination_date date,
  p_position_id bigint,
  p_note varchar(255),
  p_updated_username varchar(100),
  p_company_id bigint
)
RETURNS employee AS
$$
DECLARE
  new_employee employee%ROWTYPE;
BEGIN
  IF p_id IS NULL THEN
    INSERT INTO employee (updated_username, "name", birth_date, position_id, hire_date, termination_date, note, company_id)
    VALUES (p_updated_username, p_name, p_birth_date, p_position_id, p_hire_date, p_termination_date, p_note, p_company_id)
    RETURNING * INTO new_employee;
  ELSE
    UPDATE employee SET
      updated_at=now(),
      updated_username=p_updated_username,
      "name"=p_name,
      birth_date=p_birth_date,
      position_id=p_position_id,
      hire_date=p_hire_date,
      termination_date=p_termination_date,
      note=p_note
    WHERE id=p_id
    RETURNING * INTO new_employee;
  END IF;
  RETURN new_employee;
END;
$$ LANGUAGE plpgsql;;

-- ## How to Execute ##
-- SELECT 
-- 	 f.id,
-- 	 f.created_at,
-- 	 f.updated_at,
-- 	 f.updated_username,
-- 	 f."name",
-- 	 f.birth_date,
-- 	 f.hire_date,
-- 	 f.termination_date,
-- 	 f.position_id,
-- 	 f.note,
-- 	 f.company_id
-- FROM insert_or_update_employee(:p_id, :p_name, :p_birth_date, :p_hire_date, :p_termination_date, :p_position_id, :p_note, :p_updated_username, :p_company_id) f;


-- Insert or Update an Project
CREATE OR REPLACE FUNCTION insert_or_update_project(
  p_id bigint,
  p_name varchar(100),
  p_description varchar(255),
  p_project_start date,
  p_project_end date,
  p_updated_username varchar(100),
  p_company_id bigint
)
RETURNS project AS
$$
DECLARE
  new_project project%ROWTYPE;
BEGIN
  IF p_id IS NULL THEN
    INSERT INTO project (updated_username, "name", description, project_start, project_end, company_id)
    VALUES(p_updated_username, p_name, p_description, p_project_start, p_project_end, p_company_id)
    RETURNING * INTO new_project;
  ELSE
    UPDATE project SET  
      updated_at=now(), 
      updated_username=p_updated_username, 
      "name"=p_name, 
      description=p_description, 
      project_start=p_project_start, 
      project_end=p_project_end
    WHERE id=p_id
    RETURNING * INTO new_project;
  END IF;
  RETURN new_project;
END;
$$ LANGUAGE plpgsql;;

-- ## How to Execute ##
-- SELECT 
-- 	 f.id,
-- 	 f.created_at,
-- 	 f.updated_at,
-- 	 f.updated_username,
-- 	 f."name",
-- 	 f.description,
-- 	 f.project_start,
-- 	 f.project_end,
-- 	 f.company_id
-- FROM insert_or_update_project(:p_id, :p_name, :p_description, :p_project_start, :p_project_end, :p_updated_username, :p_company_id) f;


-- Insert or Update an Paycheck
CREATE OR REPLACE FUNCTION insert_or_update_paycheck(
  p_id bigint,
  p_employee_id bigint,
  p_pay_date date,
  p_gross_earn double precision,
  p_deduction double precision,
  p_updated_username varchar(100),
  p_company_id bigint
)
RETURNS paycheck AS
$$
DECLARE
  new_paycheck paycheck%ROWTYPE;
BEGIN
  IF p_id IS NULL THEN
    INSERT INTO paycheck (updated_username, employee_id, pay_date, gross_earn, deduction, company_id)
    VALUES(p_updated_username, p_employee_id, p_pay_date, p_gross_earn, p_deduction, p_company_id)
    RETURNING * INTO new_paycheck;
  ELSE
    UPDATE paycheck SET 
      updated_at=now(), 
      updated_username=p_updated_username, 
      employee_id=p_employee_id, 
      pay_date=p_pay_date, 
      gross_earn=p_gross_earn, 
      deduction=p_deduction 
    WHERE id=p_id
    RETURNING * INTO new_paycheck;
  END IF;
  RETURN new_paycheck;
END;
$$ LANGUAGE plpgsql;;

-- ## How to Execute ##
-- SELECT 
-- 	 f.id,
-- 	 f.created_at,
-- 	 f.updated_at,
-- 	 f.updated_username,
-- 	 f.employee_id,
-- 	 f.pay_date,
-- 	 f.gross_earn,
-- 	 f.deduction,
-- 	 f.net_pay,
-- 	 f.company_id
-- FROM insert_or_update_paycheck(:p_id, :p_employee_id, :p_pay_date, :p_gross_earn, :p_deduction, :p_updated_username, :p_company_id) f;


-- Insert or Update an Position
CREATE OR REPLACE FUNCTION insert_or_update_position(
  p_id bigint,
  p_name varchar(100),
  p_updated_username varchar(100),
  p_company_id bigint
)
RETURNS "position" AS
$$
DECLARE
  new_position position%ROWTYPE;
BEGIN
  IF p_id IS NULL THEN
    INSERT INTO "position" (updated_username, "name", company_id)
    VALUES(p_updated_username, p_name, p_company_id)
    RETURNING * INTO new_position;
  ELSE
    UPDATE "position" SET 
      updated_at=now(), 
      updated_username=p_updated_username, 
      "name"=p_name
    WHERE id=p_id
    RETURNING * INTO new_position;
  END IF;
  RETURN new_position;
END;
$$ LANGUAGE plpgsql;;

-- ## How to Execute ##
-- SELECT 
-- 	 f.id,
-- 	 f.created_at,
-- 	 f.updated_at,
-- 	 f.updated_username,
-- 	 f.name,
-- 	 f.company_id
-- FROM insert_or_update_position(:p_id, :p_name, :p_updated_username, :p_company_id) f;



-- Insert or Update an Position
CREATE OR REPLACE FUNCTION insert_or_update_timesheet(
  p_id bigint,
  p_employee_id bigint,
  p_project_id bigint,
  p_period_start timestamp,
  p_period_end timestamp,
  p_updated_username varchar(100),
  p_company_id bigint
)
RETURNS timesheet AS
$$
DECLARE
  new_timesheet timesheet%ROWTYPE;
BEGIN
  IF p_id IS NULL THEN
    INSERT INTO timesheet (updated_username, employee_id, project_id, period_start, period_end, company_id)
	VALUES(p_updated_username, p_employee_id, p_project_id, p_period_start, p_period_end, p_company_id)
    RETURNING * INTO new_timesheet;
  ELSE
    UPDATE timesheet SET 
		updated_at=now(), 
		updated_username=p_updated_username, 
		employee_id=p_employee_id, 
		project_id=p_project_id, 
		period_start=p_period_start, 
		period_end=p_period_end
	WHERE id=p_id
    RETURNING * INTO new_timesheet;
  END IF;
  RETURN new_timesheet;
END;
$$ LANGUAGE plpgsql;;

-- ## How to Execute ##
-- SELECT 
-- 	 f.id,
-- 	 f.created_at,
-- 	 f.updated_at,
-- 	 f.updated_username,
-- 	 f.employee_id,
-- 	 f.project_id,
-- 	 f.period_start,
-- 	 f.period_end,
-- 	 f.company_id
-- FROM insert_or_update_timesheet(:p_id, :p_employee_id, :p_project_id, :p_period_start, :p_period_end, :p_updated_username, :p_company_id) f;