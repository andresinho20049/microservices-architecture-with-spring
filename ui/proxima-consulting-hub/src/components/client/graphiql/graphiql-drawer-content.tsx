'use client';

import { MutationAction, QueryAction } from "@/hub/store/features/graphql/graphql-actions";
import { useLazyGraphQLQuery } from "@/hub/store/features/graphql/graphql-api";
import { useAppSelector } from "@/hub/store/hooks";
import { MouseEvent } from "react";
import { Accordion, AccordionItemType } from "../../server/accordion/accordion";
import { ButtonHoverAnimation } from "../../server/button/button-hover-animation";
import { GraphiQlAction } from "./graphiql-action";

export const GraphiQlDrawerContent = () => {

    const { reqState } = useAppSelector(state => state.graphql);

    const [trigger, { data }] = useLazyGraphQLQuery();

    const handleExecuteQuery = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        const requestBody = Object.keys(reqState)
            .filter((key) => reqState[key].enable)
            .map((key) => ({...reqState[key], name: key}) );
            
        trigger(requestBody);
    }

    const { companyById, employeeByCompanyId, paycheckByCompanyId, positionByCompanyId, projectByCompanyId, timesheetByCompanyId } = QueryAction();
    const accordionItemsQuery:AccordionItemType[] = [
        {title: "Company by Id", content: <GraphiQlAction action={companyById} />},
        {title: "Employee by CompanyId", content: <GraphiQlAction action={employeeByCompanyId} />},
        {title: "Paycheck by CompanyId", content: <GraphiQlAction action={paycheckByCompanyId} />},
        {title: "Position by CompanyId", content: <GraphiQlAction action={positionByCompanyId} />},
        {title: "Project by CompanyId", content: <GraphiQlAction action={projectByCompanyId} />},
        {title: "Timesheet by CompanyId", content: <GraphiQlAction action={timesheetByCompanyId} />}
    ]

    const { createEmployee, createPosition } = MutationAction();
    const accordionItemsMutation:AccordionItemType[] = [
        {title: "Create Employee", content: <GraphiQlAction action={createEmployee} />},
        {title: "Create Position", content: <GraphiQlAction action={createPosition} />}
    ]

    return (
        <div className="w-full h-full">
            <div className="flex flex-col gap-2 [&>div]:my-4">
                <h2>GraphiQl</h2>
                <div>
                    <div className="flex justify-between items-center">
                        <h3>Query</h3>
                        <ButtonHoverAnimation afterLabel="Execute" beforeLabel="Query" onClick={handleExecuteQuery} />
                    </div>
                    <Accordion items={accordionItemsQuery} />
                </div>
                <div>
                    <h3>Mutation</h3>
                    <Accordion items={accordionItemsMutation} />
                </div>
            </div>
        </div>
    )
}