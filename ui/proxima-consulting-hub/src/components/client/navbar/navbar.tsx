"use client";

import { useAppSelector } from "@/hub/store/hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LogoComponent } from "../../server/brand/logo";
import { LoginComponent } from "../session/login-component";
import { HamburgerButton } from "./hamburger";
import { NavBarLink } from "./navbar-link";
import { ThemeToggle } from "./theme-toggle";
import { getPages } from "@/hub/utils/pages";
import { AuthStateType } from "@/hub/store/features/auth/auth-types";

export const NavBar = () => {
    const [open, setOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    const authState:AuthStateType = useAppSelector(state => state.auth);
    const showPages = useMemo(() => getPages(authState), [authState]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (
                navRef.current &&
                !navRef.current?.contains(event.target as Node)
            ) {
                handleClose();
            }
        };
        document.addEventListener("click", handleClickOutside, true);
    }, [navRef]);

    return (
        <nav
            ref={navRef}
            className="flex flex-wrap items-center justify-between py-2 px-10"
        >
            <LogoComponent />
            <div className="flex md:hidden">
                <HamburgerButton open={open} setOpen={setOpen} />
            </div>

            <div
                className={` ${
                    open ? "flex flex-col" : "hidden"
                } w-full md:w-auto md:flex md:flex-row gap-4 items-center md:mt-0 md:border-none`}
            >
                {showPages.map((p) => (
                    <NavBarLink
                        key={p.href}
                        href={p.href}
                        label={p.label}
                        callback={handleClose}
                    />
                ))}
            </div>

            <div className="flex gap-2">
                <LoginComponent />
                <div
                    className={`${
                        open
                            ? "flex justify-center mt-5 py-4 gap-2 border-t-2 border-gray-500"
                            : "hidden"
                    } w-full md:flex md:w-auto`}
                >
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};
