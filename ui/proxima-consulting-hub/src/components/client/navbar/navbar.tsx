"use client";

import { useAppSelector } from "@/hub/store/hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LogoComponent } from "../../server/brand/logo";
import { LoginComponent } from "../session/login-component";
import { HamburgerButton } from "./hamburger";
import { NavBarLink } from "./navbar-link";
import { ThemeToggle } from "./theme-toggle";
import { usePage } from "@/hub/hooks/use-page";
import { AuthStateType } from "@/hub/store/features/auth/auth-types";

export const NavBar = () => {
    const [open, setOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const { getPagesAuthorized } = usePage();

    const authState:AuthStateType = useAppSelector(state => state.auth);
    const showPages = useMemo(() => getPagesAuthorized(authState), [authState]);

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

            <AdditionalActions open={open} />
        </nav>
    );
};

type AdditionalActionsType = {
    open: boolean;
}

const AdditionalActions = ({
    open
}:AdditionalActionsType) => {
    
    return (
        <div className={`
            ${open ? "flex flex-col w-full items-center justify-center mt-5 py-4 border-t-2 border-gray-500": "hidden"}
            md:flex md:w-auto gap-2
        `}>
            <LoginComponent />
            <ThemeToggle />
        </div>
    )
}
