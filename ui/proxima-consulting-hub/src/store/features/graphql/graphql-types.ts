
//Request Dynamic
export type GraphQlRequestType = {
    name: string;
    enable: boolean;
    parameters: {[key: string]: any}
    result: {[key: string]: any}
}

export type DataRTKQueryResponseType = {
    data: Query;
}

export type DataRTKMutationResponseType = {
    data: Mutation;
}

//Query
export type Query = {
    companyById?: Company
    employeeByCompanyId?: Employee[]
    projectByCompanyId?: Project[]
    positionByCompanyId?: Position[]
    paycheckByCompanyId?: Paycheck[]
    timesheetByCompanyId?: Timesheet[]
}

// Mutation
export type Mutation = {
    createEmployee?: Employee
    createPosition?: Position
    createPaycheck?: Paycheck
    createProject?: Project
    createTimesheet?: Timesheet
    updateEmployee?: Employee
    updatePosition?: Position
    updatePaycheck?: Paycheck
    updateProject?: Project
    updateTimesheet?: Timesheet
}

//Schema
export type Company = {
  id: string
  createdAt: string
  updatedAt: string
  updatedUsername: string
  name: string
  shortName: string
  taxId: string
  description?: string
  positions: Position[]
  employees: Employee[]
  projects: Project[]
}

export type Position = {
  id: string
  createdAt: string
  updatedAt: string
  updatedUsername: string
  name: string
  company: Company
  employees: Employee[]
}

export type PositionInput = {
  companyId: number
  name: string
}

export type Employee = {
  id: string
  createdAt: string
  updatedAt: string
  updatedUsername: string
  name: string
  birthDate?: string
  position: Position
  hireDate: string
  terminationDate?: string
  note?: string
  company: Company
  paychecks: Paycheck[]
  timesheets: Timesheet[]
}

export type EmployeeInput = {
  companyId: number
  name: string
  birthDate: string
  positionId: number
  hireDate: string
  terminationDate?: string
  note?: string
}

export type Paycheck = {
  id: string
  createdAt: string
  updatedAt: string
  updatedUsername: string
  employee: Employee
  payDate: string
  grossEarn: number
  deduction: number
  netPay: number
  company: Company
}

export type PaycheckInput = {
  companyId: number
  employeeId: number
  payDate: string
  grossEarn: number
  deduction: number
}

export type Project = {
  id: string
  createdAt: string
  updatedAt: string
  updatedUsername: string
  name?: string
  description?: string
  projectStart: string
  projectEnd?: string
  company: Company
  timesheets: Timesheet[]
}

export type ProjectInput = {
  companyId: number
  name: string
  description?: string
  projectStart: string
  projectEnd?: string
}

export type Timesheet = {
  id: string
  createdAt: string
  updatedAt: string
  updatedUsername: string
  employee: Employee
  project: Project
  periodStart: string
  periodEnd: string
  company: Company
}

export type TimesheetInput = {
  companyId: number
  employeeId: number
  projectId: number
  periodStart: string
  periodEnd?: string
}
