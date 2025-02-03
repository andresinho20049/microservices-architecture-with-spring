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

type AuthenticationContextType = {
    isAuthenticated: boolean;
    userInfo: UserInfoType | null;
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
        {} as UserInfoType
    );

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
        <AuthenticationContext.Provider value={{ isAuthenticated, userInfo }}>
            {children}
        </AuthenticationContext.Provider>
    );
};
