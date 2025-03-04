"use client";

import {
    createContext,
    ReactNode,
    useContext
} from "react";
import { hasCookieClient, SESSION_BFF } from "../hooks/use-cookie";
import { useGetAuthDataQuery } from "../store/features/auth/auth-api";
import { useAppSelector } from "../store/hooks";

type SessionContextType = {
};

const SessionContext = createContext({} as SessionContextType);

export const useSessionContext = () => useContext(SessionContext);

// Provider
type SessionContextProviderType = {
    children: ReactNode;
};

export const SessionContextProvider = ({
    children,
}: SessionContextProviderType) => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    useGetAuthDataQuery({skip: hasCookieClient(SESSION_BFF) && !isAuthenticated});

    return (
        <SessionContext.Provider value={{}}>
            {children}
        </SessionContext.Provider>
    );
};
