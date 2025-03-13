import { useGraphQL } from "@/hub/hooks/use-graphql";
import { fetchBaseGateway } from "@/hub/store/service";
import { createApi } from "@reduxjs/toolkit/query/react";
import { DataRTKQueryResponseType, GraphQlRequestType } from "./graphql-types";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const graphqlApi = createApi({
    reducerPath: "graphqlApi",
    baseQuery: fetchBaseGateway,
    endpoints: (builder) => ({
        graphQL: builder.query<DataRTKQueryResponseType, GraphQlRequestType | GraphQlRequestType[]>({
            query: (req) => ({
                url: "/spring-graphql/graphql",
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({query: useGraphQL().generateGraphQlBody("query", req)})
            }),
        }),
        graphQLM: builder.mutation<void, {}>({
            query: (body) => ({
                url: "logout",
                method: "POST"
            })
        })
    })
})

export const { useGraphQLQuery, useGraphQLMMutation, useLazyGraphQLQuery } = graphqlApi;
export default graphqlApi;