CREATE TABLE IF NOT EXISTS company (
  id BIGINT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_username VARCHAR(100) NOT NULL DEFAULT 'anonymous',
  name VARCHAR(150) NOT NULL,
  short_name VARCHAR(30) NOT NULL,
  tax_id VARCHAR(30) NOT NULL,
  description VARCHAR(255),
  CONSTRAINT company_pk PRIMARY KEY (id),
  CONSTRAINT company_tax_id_unique UNIQUE (tax_id)
);

CREATE SEQUENCE IF NOT EXISTS company_id_seq 
    INCREMENT BY 1 START WITH 1 
    MINVALUE -9223372036854775808 
    MAXVALUE 9223372036854775807
    OWNED BY company.id;

ALTER TABLE company ALTER COLUMN id SET DEFAULT nextval('company_id_seq');

CREATE TABLE IF NOT EXISTS position (
  id BIGINT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_username VARCHAR(100) NOT NULL DEFAULT 'anonymous',
  name VARCHAR(100) NOT NULL,
  company_id BIGINT NOT NULL,
  CONSTRAINT position_pk PRIMARY KEY (id),
  CONSTRAINT position_not_short_name_ck CHECK (length(name)>3),
  CONSTRAINT position_name_company_unique UNIQUE (name, company_id),
  CONSTRAINT position_company_fk FOREIGN KEY (company_id) REFERENCES company(id)
);

CREATE SEQUENCE IF NOT EXISTS position_id_seq 
    INCREMENT BY 1 START WITH 1 
    MINVALUE -9223372036854775808 
    MAXVALUE 9223372036854775807
    OWNED BY position.id;

ALTER TABLE position ALTER COLUMN id SET DEFAULT nextval('position_id_seq');

CREATE TABLE IF NOT EXISTS employee (
  id BIGINT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_username VARCHAR(100) NOT NULL DEFAULT 'anonymous',
  name VARCHAR(200) NOT NULL,
  birth_date DATE NOT NULL,
  position_id BIGINT NOT NULL,
  hire_date DATE NOT NULL,
  termination_date DATE NULL,
  note VARCHAR(255),
  company_id BIGINT NOT NULL,
  CONSTRAINT employee_pk PRIMARY KEY (id),
  CONSTRAINT employee_not_short_name_ck CHECK (length(name)>5),
  CONSTRAINT employee_birth_hire_ck CHECK (hire_date > birth_date),
  CONSTRAINT employee_termination_hire_ck CHECK ((termination_date IS NULL) OR (termination_date > hire_date)),
  CONSTRAINT employee_position_fk FOREIGN KEY (position_id) REFERENCES position(id),
  CONSTRAINT employee_company_fk FOREIGN KEY (company_id) REFERENCES company(id)
);

CREATE SEQUENCE IF NOT EXISTS employee_id_seq 
    INCREMENT BY 1 START WITH 1 
    MINVALUE -9223372036854775808 
    MAXVALUE 9223372036854775807
    OWNED BY employee.id;

ALTER TABLE employee ALTER COLUMN id SET DEFAULT nextval('employee_id_seq');

CREATE TABLE IF NOT EXISTS paycheck (
  id BIGINT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_username VARCHAR(100) NOT NULL DEFAULT 'anonymous',
  employee_id BIGINT NOT NULL,
  pay_date DATE NOT NULL,
  gross_earn NUMERIC(10, 2) NOT NULL,
  deduction NUMERIC(10, 2) NOT NULL,
  net_pay NUMERIC(10, 2) NOT NULL,
  company_id BIGINT NOT NULL,
  CONSTRAINT paycheck_pk PRIMARY KEY (id),
  CONSTRAINT paycheck_paydate_not_future CHECK (pay_date <= NOW()),
  CONSTRAINT paycheck_paydate_gross_not_less_zero CHECK (gross_earn > 0),
  CONSTRAINT paycheck_paydate_gross_deduction CHECK (gross_earn >= deduction),
  CONSTRAINT paycheck_employee_fk FOREIGN KEY (employee_id) REFERENCES employee(id),
  CONSTRAINT paycheck_company_fk FOREIGN KEY (company_id) REFERENCES company(id)
);

CREATE SEQUENCE IF NOT EXISTS paycheck_id_seq 
    INCREMENT BY 1 START WITH 1 
    MINVALUE -9223372036854775808 
    MAXVALUE 9223372036854775807
    OWNED BY paycheck.id;

ALTER TABLE paycheck ALTER COLUMN id SET DEFAULT nextval('paycheck_id_seq');

CREATE TABLE IF NOT EXISTS project (
  id BIGINT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_username VARCHAR(100) NOT NULL DEFAULT 'anonymous',
  name VARCHAR(100),
  description VARCHAR(255),
  project_start DATE NOT NULL,
  project_end DATE NULL,
  company_id BIGINT NOT NULL,
  CONSTRAINT project_pk PRIMARY KEY (id),
  CONSTRAINT project_end_start_ck CHECK ((project_end IS NULL) OR (project_end >= project_start)),
  CONSTRAINT project_company_fk FOREIGN KEY (company_id) REFERENCES company(id)
);

CREATE SEQUENCE IF NOT EXISTS project_id_seq 
    INCREMENT BY 1 START WITH 1 
    MINVALUE -9223372036854775808 
    MAXVALUE 9223372036854775807
    OWNED BY project.id;

ALTER TABLE project ALTER COLUMN id SET DEFAULT nextval('project_id_seq');

CREATE TABLE IF NOT EXISTS timesheet (
  id BIGINT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_username VARCHAR(100) NOT NULL DEFAULT 'anonymous',
  employee_id BIGINT NOT NULL,
  project_id BIGINT NOT NULL,
  period_start TIMESTAMP NOT NULL,
  period_end TIMESTAMP NOT NULL,
  company_id BIGINT NOT NULL,
  CONSTRAINT timesheet_pk PRIMARY KEY (id),
  CONSTRAINT timesheet_employee_fk FOREIGN KEY (employee_id) REFERENCES employee(id),
  CONSTRAINT timesheet_end_start_ck CHECK ((period_end IS NULL) OR (period_end >= period_start)),
  CONSTRAINT timesheet_project_fk FOREIGN KEY (project_id) REFERENCES project(id),
  CONSTRAINT timesheet_company_fk FOREIGN KEY (company_id) REFERENCES company(id)
);

CREATE SEQUENCE IF NOT EXISTS timesheet_id_seq 
    INCREMENT BY 1 START WITH 1 
    MINVALUE -9223372036854775808 
    MAXVALUE 9223372036854775807
    OWNED BY timesheet.id;

ALTER TABLE timesheet ALTER COLUMN id SET DEFAULT nextval('timesheet_id_seq');