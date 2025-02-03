"use client";

import Image from "next/image";
import { useAuthenticationContext } from "@/hub/context/authentication-context";

export const LoginComponent = () => {
    const { isAuthenticated, login, logout } = useAuthenticationContext();

    const linkText = isAuthenticated ? "Logout" : "Login";
    const linkIcon = isAuthenticated ? "/icons/padlock.svg" : "/icons/key.svg";

    return (
        <button
            className="flex items-center justify-center gap-1 no-underline text-center transition-colors duration-200 ease-in dark:bg-transparent px-4 py-0 border-2 border-blue-200 border-y-blue-500 hover:border-y-blue-200 rounded-md"
            type={"button"}
            onClick={isAuthenticated ? logout : login}
        >
            {linkText}
            <Image alt="Login Icon" src={linkIcon} width={14} height={14} />
        </button>
    );
};
