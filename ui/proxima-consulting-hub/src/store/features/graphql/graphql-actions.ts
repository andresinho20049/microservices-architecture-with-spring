import { GraphiQlActionResultType } from '@/hub/components/client/graphiql/sidebar/graphiql-action';
import { InputParam } from '@/hub/components/server/input/input-with-label';
import { useAppSelector } from '../../hooks';

const companyByIdDefaultOption:{[key:string]:boolean | Object} = {
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
            birthDate: false,
            hireDate: false,
            terminationDate: false,
            note: false,
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
            employee: {
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

const positionByCompanyIdDefaultOption:{[key:string]:boolean | Object} = {
    id: false,
    name: false,
    company: {
        id: false,
        name: false,
    },
    employees: {
        id: false,
        name: false,
        birthDate: false,
        hireDate: false,
        terminationDate: false,
        note: false,
        paychecks: {
            id: false,
            payDate: false,
            grossEarn: false,
            deduction: false,
            netPay: false,
        },
    },
};

const employeeByCompanyIdDefaultOption:{[key:string]:boolean | Object} = {
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

const paycheckByCompanyIdDefaultOption:{[key:string]:boolean | Object} = {
    id: false,
    payDate: false,
    grossEarn: false,
    deduction: false,
    netPay: false,
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
    }
};

const projectByCompanyIdDefaultOption:{[key:string]:boolean | Object} = {
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
        periodStart: false,
        periodEnd: false,
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
        }
    },
};

const timesheetByCompanyIdDefaultOption:{[key:string]:boolean | Object} = {
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

    const { reqState } = useAppSelector(state => state.graphql);

    const createPosition = (): GraphiQlActionResultType => ({
        formFieldName: "createPosition",
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
        options: reqState["createPosition"]?.result ||  positionByCompanyIdDefaultOption
    });

    const createEmployee = (): GraphiQlActionResultType => ({
        formFieldName: "createEmployee",
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
        options: reqState["createEmployee"]?.result ||  employeeByCompanyIdDefaultOption
    });

    return { createPosition, createEmployee };
};


export const QueryAction = () => {

    const { reqState } = useAppSelector(state => state.graphql);

    const defaultParamByCompanyId:InputParam[] = [{name: "companyId", label: "CompanyId", type: "text", value: ""}];

    const companyById = (): GraphiQlActionResultType => ({
        formFieldName: "companyById",
        inputs: [
            {
                name: "id",
                label: "ID",
                type: "text",
                value: ""
            }
        ],
        options: reqState["companyById"]?.result || companyByIdDefaultOption
    })

    const positionByCompanyId = (): GraphiQlActionResultType => ({
        formFieldName: "positionByCompanyId",
        inputs: defaultParamByCompanyId,
        options: reqState["positionByCompanyId"]?.result ||  positionByCompanyIdDefaultOption
    });

    const employeeByCompanyId = (): GraphiQlActionResultType => ({
        formFieldName: "employeeByCompanyId",
        inputs: defaultParamByCompanyId,
        options: reqState["employeeByCompanyId"]?.result ||  employeeByCompanyIdDefaultOption
    });

    const paycheckByCompanyId = (): GraphiQlActionResultType => ({
        formFieldName: "paycheckByCompanyId",
        inputs: defaultParamByCompanyId,
        options: reqState["paycheckByCompanyId"]?.result ||  paycheckByCompanyIdDefaultOption
    });

    const projectByCompanyId = (): GraphiQlActionResultType => ({
        formFieldName: "projectByCompanyId",
        inputs: defaultParamByCompanyId,
        options: reqState["projectByCompanyId"]?.result ||  projectByCompanyIdDefaultOption
    });

    const timesheetByCompanyId = (): GraphiQlActionResultType => ({
        formFieldName: "timesheetByCompanyId",
        inputs: defaultParamByCompanyId,
        options: reqState["timesheetByCompanyId"]?.result ||  timesheetByCompanyIdDefaultOption
    });

    return { companyById, positionByCompanyId, employeeByCompanyId, paycheckByCompanyId, projectByCompanyId, timesheetByCompanyId };
}