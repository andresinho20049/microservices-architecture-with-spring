"use client";

import Image from "next/image";

export type HamburgerButtonType = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export const HamburgerButton = ({ open, setOpen }: HamburgerButtonType) => {
	return (
		<button id="hamburger" onClick={() => setOpen(!open)}>
			<Image
				alt="Toggle"
				className={!open ? "block" : "hidden"}
				src="/icons/menu-toggle.svg"
				width="40"
				height="40"
			/>
			<Image
				alt="Toggle"
				className={open ? "block" : "hidden"}
				src="/icons/close.svg"
				width="40"
				height="40"
			/>
		</button>
	);
};
