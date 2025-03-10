import { ChangeEvent, InputHTMLAttributes } from "react";

export type InputParam = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
}

export type InputWithLabelProps = {
    inputParam: InputParam;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputWithLabel = ({
    inputParam,
    onChange
}: InputWithLabelProps) => {

    return (
        <div className="bg-transparent p-4 rounded-lg">
            <div className="relative bg-inherit">
                <input type={inputParam.type} id={inputParam.name} name={inputParam.name} value={inputParam.value} onChange={onChange} className="peer bg-transparent h-10 w-full rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder={inputParam.label}/>
                <label htmlFor={inputParam.name} className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-second-light dark:bg-second-dark mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">{inputParam.label}</label>
            </div>
        </div>
    )
}