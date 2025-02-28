"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useCallback } from "react";

export type NavBarLinkType = LinkProps & {
	href: string;
	label: string | ReactNode;
	callback?: () => void;
};

export const NavBarLink = ({
	href,
	label,
	callback,
	...props
}: NavBarLinkType) => {
	const pathname = usePathname();

	const handleClick = useCallback(() => {
		if (callback) {
			callback();
		}
	}, []);

	return (
		<Link
			href={href}
			className={`no-underline ${
				href === pathname ? "text-primary dark:text-primary" : ""
			} md:border-none`}
			{...props}
			onClick={handleClick}
		>
			{label}
		</Link>
	);
};
