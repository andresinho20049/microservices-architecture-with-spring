import { ButtonHTMLAttributes } from "react";

export type ButtonHoverAnimationProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    beforeLabel: string;
    afterLabel: string;
};

export const ButtonHoverAnimation = ({
    beforeLabel,
    afterLabel,
    onClick,
    ...props
}:ButtonHoverAnimationProps) => {

    return (
        <button onClick={onClick} className="inline-block px-7 py-1.5 overflow-hidden transition-transform rounded-xl bg-transparent ring dark:ring-0 dark:bg-accent hover:dark:bg-accentHover group/hoverbtn shadow-md hover:shadow-lg">
            <span 
                data-before={beforeLabel} 
                className={`
                    text-sm font-semibold text-white group-hover/hoverbtn:text-black
                    relative py-1.5 transition-transform inline-block 
                    before:content-[attr(data-before)] before:py-1.5 before:absolute before:top-full group-hover/hoverbtn:-translate-y-full`}>
                    {afterLabel}
                </span>
        </button>
    )
}