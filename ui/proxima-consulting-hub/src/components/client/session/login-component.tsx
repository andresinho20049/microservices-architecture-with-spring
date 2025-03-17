"use client";

import { useLogoutMutation } from "@/hub/store/features/auth/auth-api";
import { useAppSelector } from "@/hub/store/hooks";
import Image from "next/image";
import { redirect, RedirectType } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const LoginComponent = () => {
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const [logout] = useLogoutMutation();

    const [textState, setTextState] = useState<string>("Login");
    const [iconState, setIconState] = useState<string>("/icons/key.svg");

    const login = useCallback(() => {
        redirect('/login', RedirectType.replace);
    }, []);

    const handleLogin = () => {
        if (isAuthenticated) {
            logout();
        } else {
            login()
        }
    }

    useEffect(() => {

        setTextState(() => isAuthenticated ? "Logout" : "Login");
        setIconState(() => isAuthenticated ? "/icons/padlock.svg" : "/icons/key.svg");

    }, [isAuthenticated]);

    return (
        <button
            className="flex items-center justify-center gap-1 no-underline text-center transition-colors duration-200 ease-in dark:bg-transparent px-4 py-0 border-2 border-second hover:border-y-accentHover rounded-md"
            type={"button"}
            onClick={handleLogin}
        >
            {textState}
            <Image alt="Login Icon" src={iconState} width={14} height={14} />
        </button>
    );
};
