"use client";

import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react";
import usePersistedState from "@/hub/hooks/use-persisted-state";
import { getUserInfoService, UserInfoType } from "@/hub/services/user-info";
import { fetchGateway } from "../utils/gateway";
import { redirect, RedirectType } from "next/navigation";

type AuthenticationContextType = {
    isAuthenticated: boolean;
    userInfo: UserInfoType | null;
    login: () => void;
    logout: () => void;
};

const AuthenticationContext = createContext({} as AuthenticationContextType);

export const useAuthenticationContext = () => useContext(AuthenticationContext);

// Provider
type AuthenticationContextProviderType = {
    children: ReactNode;
};

export const AuthenticationContextProvider = ({
    children,
}: AuthenticationContextProviderType) => {
    const [userInfo, setUserInfo] = usePersistedState<UserInfoType | null>(
        "userInfo",
        null
    );

    const logout = useCallback(() => {
        fetchGateway("/logout", { method: "POST" }).then(() => {
            setUserInfo(null);
        });
    }, []);

    const login = useCallback(() => {
        redirect("/login", RedirectType.replace);
    }, []);

    const checkIfUserInfoIsValid = useCallback(
        (userInfo: UserInfoType | null) => {
            if (!userInfo) return false;

            const now = new Date();
            const expDate = new Date(userInfo?.exp);

            return now > expDate;
        },
        []
    );

    useEffect(() => {
        if (!checkIfUserInfoIsValid(userInfo)) {
            getUserInfoService()
                .then((data) => setUserInfo(data))
                .catch(() => setUserInfo(null));
        }
    }, []);

    const isAuthenticated = useMemo(
        () => !!userInfo && !!userInfo?.sub,
        [userInfo]
    );

    return (
        <AuthenticationContext.Provider
            value={{ isAuthenticated, userInfo, login, logout }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
