'use client'

import { Company, Employee, Paycheck, Position, Project, Timesheet } from "@/hub/store/features/graphql/graphql-types";
import { useAppSelector } from "@/hub/store/hooks";
import { GraphiQlContentItem } from "./graphiql-content-item";
import { CurrencyNumber } from "@/hub/utils/math-utils";


export const GraphiQlContent = () => {

    const { query } = useAppSelector(state => state.graphql);

    const company: Company = query["companyById"] as Company;
    const employees: Employee[] = query["employeeByCompanyId"] as Employee[];
    const paychecks: Paycheck[] = query["paycheckByCompanyId"] as Paycheck[];
    const positions: Position[] = query["positionByCompanyId"] as Position[];
    const projects: Project[] = query["projectByCompanyId"] as Project[];
    const timesheets: Timesheet[] = query["timesheetByCompanyId"] as Timesheet[];

    return (
        <main className="flex flex-col w-full h-full gap-4 justify-center items-center">
            <GraphiQlContentItem title="companyById" content={company} />
            <GraphiQlContentItem title="employeeByCompanyId" content={employees} />
            <GraphiQlContentItem title="paycheckByCompanyId" content={paychecks?.map(p => ({...p, name: `${p?.employee?.name || "Paycheck"} - ${p?.payDate || p?.netPay && CurrencyNumber.format(p?.netPay) || "#"}`}))} />
            <GraphiQlContentItem title="positionByCompanyId" content={positions} />
            <GraphiQlContentItem title="projectByCompanyId" content={projects} />
            <GraphiQlContentItem title="timesheetByCompanyId" content={timesheets?.map(t => ({...t, name: `${t?.employee?.name.split(" ")[0] || ""} ${t?.project?.name || ""}`}))} />
        </main>
    )

}