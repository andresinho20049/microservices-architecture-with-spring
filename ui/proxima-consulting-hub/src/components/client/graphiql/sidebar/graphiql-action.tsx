'use client';

import { setEnableReqState, setParamReqState, setResultReqState } from "@/hub/store/features/graphql/graphql-slice";
import { useAppDispatch, useAppSelector } from "@/hub/store/hooks";
import { ChangeEvent, use, useMemo } from "react";
import DropdownMultiSelect from "../../dropdown/dropdown-select/dropdown-multiselect";
import { DropdownItemListProps } from "../../../server/dropdown/dropdown-menu/dropdown-item-list";
import { DropdownMenuList } from "../../../server/dropdown/dropdown-menu/dropdown-menu-list";
import { InputParam, InputWithLabel } from "../../../server/input/input-with-label";
import { SwitchAnimated } from "../../../server/switch/switch-animated";

export type GraphiQlActionResultType = {
    formFieldName: string;
    inputs: InputParam[];
    options: {[key: string]: any};
}

export type GraphiQlActionProps = {
    action: () => GraphiQlActionResultType;
}

export const GraphiQlAction = ({
    action
}:GraphiQlActionProps) => {
    const { formFieldName, inputs, options } = action();

    const defaultValue = "";
    const { reqState } = useAppSelector(state => state.graphql);
    const reqStateField = reqState[formFieldName];
    const isChecked = reqStateField?.enable || false;

    const dispatch = useAppDispatch();

    const onChangeSwitch = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setEnableReqState({key: formFieldName, content: e.target.checked}));
    }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const newReqStateField = {...reqStateField["parameters"], [e.target.name]: e.target.value};
        dispatch(setParamReqState({key: formFieldName, content: newReqStateField}));
    }

    const onChangeDropdown = (options: {[key: string]: any}) => {
        dispatch(setResultReqState({key: formFieldName, content: options}));
    }

    const paramsSubItems = inputs.map((ipt, idx) => {
        const value = reqStateField?.parameters?.[ipt?.name || defaultValue] || defaultValue;

        const actionComponent = <InputWithLabel key={ipt.name} inputParam={{...ipt, value: value}} onChange={onChangeInput} />;
        return {title: "", action: actionComponent}
    });

    const dropdownActions: DropdownItemListProps[] = [
        {
            title: "Params",
            subItems: paramsSubItems,
            imageUrl: "/icons/stars.svg"
        },
        {
            title: "ResutlQuery",
            imageUrl: "/icons/graphql.svg",
            subItems: [
                {title: "Fields", action: <DropdownMultiSelect prompt="Select the fields for the response" formFieldName={formFieldName} onChange={onChangeDropdown} options={options} />}
            ]
        }
    ]

    return (
        <div className={"w-10/12 flex flex-col"}>
            <div className="flex justify-between items-center">
                <strong>Do you want to enable this query?</strong>
                <div className={`flex flex-col justify-center items-center ${isChecked ? "text-accent" : ""}`}>
                    <p>{isChecked ? "Enable" : "Disable"}</p>
                    <SwitchAnimated formfieldName={formFieldName} checked={isChecked} onChange={onChangeSwitch} />
                </div>
            </div>
            <div className={isChecked ? "block" : "hidden"}>
                <DropdownMenuList items={dropdownActions} />
            </div>
        </div>
    )
}