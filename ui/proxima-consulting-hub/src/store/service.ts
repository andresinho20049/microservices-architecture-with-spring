import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const gatewayHost = process.env.GATEWAY_HOST || "http://localhost:8080";

export const fetchBaseGateway = fetchBaseQuery({
    baseUrl: gatewayHost,
    credentials: "include"
})