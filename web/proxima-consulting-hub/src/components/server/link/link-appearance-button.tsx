import Link from "next/link";
import { ReactNode } from "react";

interface ILinkAppearanceButtonProps {
    children: ReactNode;
    href: string;
    isBlank?: boolean;
}

export const LinkAppearanceButton = ({
    children,
    href,
    isBlank,
}: ILinkAppearanceButtonProps) => {
    return (
        <Link
            aria-label={href}
            className="flex items-center justify-center gap-1 no-underline text-center transition-colors duration-200 ease-in dark:bg-transparent px-4 py-2 border-2 border-purple-200 border-y-purple-500 hover:border-y-purple-200 rounded-md"
            href={href}
            target={isBlank ? "_blank" : ""}
            rel={isBlank ? "noopener noreferrer" : ""}
        >
            <span className="sr-only">{href}</span>
            {children}
        </Link>
    );
};
