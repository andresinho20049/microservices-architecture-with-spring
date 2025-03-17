import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseGateway } from "@/hub/store/service";
import { UserAuthenticatedType } from "@/hub/store/features/auth/auth-types"

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseGateway,
    endpoints: (builder) => ({
        getAuthData: builder.query<UserAuthenticatedType, void>({
            query: () => ({
                url: "userinfo",
                method: "GET"
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "logout",
                method: "POST"
            })
        })
    })
})

export const { useGetAuthDataQuery, useLogoutMutation } = authApi;
export default authApi;