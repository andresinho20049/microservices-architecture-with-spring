import { InputHTMLAttributes } from "react";

export type SwitchAnimatedProps = InputHTMLAttributes<HTMLInputElement> & {
    formfieldName: string;
}

export const SwitchAnimated = ({
    formfieldName,
    checked,
    onChange,
    ...props
}:SwitchAnimatedProps) => {

    return (
        <div>
            <input type="checkbox" className="peer sr-only" id={`${formfieldName}-toggle`} checked={checked} onChange={onChange} {...props} />
            <label htmlFor={`${formfieldName}-toggle`} className="relative flex h-4 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-accent peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-accent">
                <span className="sr-only">Enable</span>
            </label>
        </div>
    )
}