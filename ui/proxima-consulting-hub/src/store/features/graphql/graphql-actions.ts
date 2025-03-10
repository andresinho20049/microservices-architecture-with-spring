import { GraphiQlActionResultType } from '@/hub/components/client/graphiql/graphiql-action';
import { InputParam } from '@/hub/components/server/input/input-with-label';

const companyByIdOption:{[key:string]:boolean | Object} = {
    id: false,
    name: false,
    shortName: false,
    taxId: false,
    description: false,
    positions: {
    id: false,
    name: false,
    employees: {
        id: false,
        name: false,
    },
    },
    employees: {
    id: false,
    name: false,
    birthDate: false,
    position: {
        id: false,
        name: false,
    },
    hireDate: false,
    terminationDate: false,
    note: false,
    },
    projects: {
    id: false,
    name: false,
    description: false,
    projectStart: false,
    projectEnd: false,
    timesheets: {
        periodStart: false,
        periodEnd: false,
        employees: {
            id: false,
            name: false,
            birthDate: false,
            position: {
            id: false,
            name: false,
            },
            hireDate: false,
            terminationDate: false,
            note: false,
        }
    },
    },
};

const positionByCompanyIdOption:{[key:string]:boolean | Object} = {
    id: false,
    name: false,
    company: {
    id: false,
    name: false,
    },
    employees: {
    id: false,
    name: false,
    paychecks: {
        id: false,
        payDate: false,
        grossEarn: false,
        deduction: false,
        netPay: false,
    },
    },
};

const employeeByCompanyIdOption:{[key:string]:boolean | Object} = {
    id: false,
    name: false,
    birthDate: false,
    hireDate: false,
    terminationDate: false,
    note: false,
    company: {
    id: false,
    name: false,
    },
    position: {
    id: false,
    name: false,
    },
    paychecks: {
    id: false,
    payDate: false,
    grossEarn: false,
    deduction: false,
    netPay: false,
    },
    timesheets: {
    id: false,
    project: {
        id: false,
        name: false,
        description: false,
        projectStart: false,
        projectEnd: false
    },
    periodStart: false,
    periodEnd: false,
    },
};

const paycheckByCompanyIdOption:{[key:string]:boolean | Object} = {
    id: false,
    company: {
    id: false,
    name: false,
    },
    employee: {
    id: false,
    name: false,
    birthDate: false,
    hireDate: false,
    terminationDate: false,
    note: false,
    position: {
        id: false,
        name: false,
    },
    timesheets: {
        id: false,
        project: {
        id: false,
        name: false,
        description: false,
        projectStart: false,
        projectEnd: false
        },
        periodStart: false,
        periodEnd: false,
    },
    },
    payDate: false,
    grossEarn: false,
    deduction: false,
    netPay: false,
};

const projectByCompanyIdOption:{[key:string]:boolean | Object} = {
    id: false,
    name: false,
    description: false,
    projectStart: false,
    projectEnd: false,
    company: {
    id: false,
    name: false,
    },
    timesheets: {
    id: false,
    employee: {
        id: false,
        name: false,
        birthDate: false,
        hireDate: false,
        terminationDate: false,
        note: false,
        position: {
        id: false,
        name: false,
        },
    },
    periodStart: false,
    periodEnd: false,
    },
};

const timesheetByCompanyIdOption:{[key:string]:boolean | Object} = {
    id: false,
    periodStart: false,
    periodEnd: false,
    company: {
    id: false,
    name: false,
    },
    employee: {
    id: false,
    name: false,
    birthDate: false,
    hireDate: false,
    terminationDate: false,
    note: false,
    position: {
        id: false,
        name: false,
    },
    },
    project: {
    id: false,
    name: false,
    description: false,
    projectStart: false,
    projectEnd: false
    }
};

export const MutationAction = () => {

    const createPosition = (): GraphiQlActionResultType => ({
        formFieldName: createPosition.name,
        inputs: [
            {
                name: "companyId",
                label: "Company ID",
                type: "text",
                value: "1"
            },
            {
                name: "name",
                label: "Name",
                type: "text",
                value: "Position name"
            }
        ],
        options: positionByCompanyIdOption
    });

    const createEmployee = (): GraphiQlActionResultType => ({
        formFieldName: createEmployee.name,
        inputs: [
            {
                name: "companyId",
                label: "Company ID",
                type: "text",
                value: "1"
            },
            {
                name: "name",
                label: "Name",
                type: "text",
                value: "Employee 1"
            },
            {
                name: "birthDate",
                label: "Birth Date",
                type: "text",
                value: "2000-01-01"
            },
            {
                name: "positionId",
                label: "Position ID",
                type: "text",
                value: "1"
            },
            {
                name: "hireDate",
                label: "Hire Date",
                type: "text",
                value: "2021-01-01"
            },
            {
                name: "terminationDate",
                label: "Termination Date",
                type: "text",
                value: ""
            },
            {
                name: "note",
                label: "Note",
                type: "text",
                value: ""
            }
        ],
        options: employeeByCompanyIdOption
    });

    return { createPosition, createEmployee };
};


export const QueryAction = () => {

    const defaultParamByCompanyId:InputParam[] = [{name: "companyId", label: "ID", type: "text", value: "1"}];

    const companyById = (): GraphiQlActionResultType => ({
        formFieldName: companyById.name,
        inputs: [
            {
                name: "id",
                label: "ID",
                type: "text",
                value: "1"
            },
            {
                name: "teste",
                label: "TESTE",
                type: "number",
                value: 1
            }
        ],
        options: companyByIdOption
    })

    const positionByCompanyId = (): GraphiQlActionResultType => ({
        formFieldName: positionByCompanyId.name,
        inputs: defaultParamByCompanyId,
        options: positionByCompanyIdOption
    });

    const employeeByCompanyId = (): GraphiQlActionResultType => ({
        formFieldName: employeeByCompanyId.name,
        inputs: defaultParamByCompanyId,
        options: employeeByCompanyIdOption
    });

    const paycheckByCompanyId = (): GraphiQlActionResultType => ({
        formFieldName: paycheckByCompanyId.name,
        inputs: defaultParamByCompanyId,
        options: paycheckByCompanyIdOption
    });

    const projectByCompanyId = (): GraphiQlActionResultType => ({
        formFieldName: projectByCompanyId.name,
        inputs: defaultParamByCompanyId,
        options: projectByCompanyIdOption
    });

    const timesheetByCompanyId = (): GraphiQlActionResultType => ({
        formFieldName: timesheetByCompanyId.name,
        inputs: defaultParamByCompanyId,
        options: timesheetByCompanyIdOption
    });

    return { companyById, positionByCompanyId, employeeByCompanyId, paycheckByCompanyId, projectByCompanyId, timesheetByCompanyId };
}