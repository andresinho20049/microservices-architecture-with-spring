import Link from "next/link";

interface ILinkAppearanceButtonProps {
    label: string;
    href: string;
    isBlank?: boolean;
}

export const LinkAppearanceButton = ({
    label,
    href,
    isBlank,
}: ILinkAppearanceButtonProps) => {
    return (
        <Link
            aria-label={href}
            className="flex items-center justify-center hover:no-underline transition-colors duration-200 ease-in dark:bg-transparent px-4 py-2 border-2 border-x-accentHover border-y-accent hover:border-y-accentHover rounded-md"
            href={href}
            target={isBlank ? "_blank" : ""}
            rel={isBlank ? "noopener noreferrer" : ""}
        >
            <span className="sr-only">{label}</span>
            {label}
        </Link>
    );
};
