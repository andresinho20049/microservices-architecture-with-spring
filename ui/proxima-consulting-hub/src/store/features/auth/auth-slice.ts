import { JSESSIONID, SESSION_CLAIMS, setCookieClient } from "@/hub/hooks/use-cookie";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "cookies-next";
import authApi from "./auth-api";
import { AuthStateType } from "./auth-types";
import { redirect } from "next/navigation";

const initialState:AuthStateType = {
    isAuthenticated: false,
    user: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<AuthStateType>) => {
        builder
        .addMatcher(authApi.endpoints.getAuthData.matchFulfilled, (state, {payload, meta}) => {
            
            //@ts-ignore
            const isOk = meta?.baseQueryMeta?.response?.ok;

            if(isOk) {
                state.isAuthenticated = !!payload;
                state.user = payload;
                setCookieClient(SESSION_CLAIMS, state);
            }
        })
        .addMatcher(authApi.endpoints.logout.matchPending, (state) => {
            
            state.isAuthenticated = false;
            state.user = null;
            deleteCookie(SESSION_CLAIMS);
            location.reload();
        })
    }
})

export const { } = authSlice.actions;
export default authSlice.reducer;