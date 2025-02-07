import type { NextConfig } from "next";
import { gatewayHost } from "./src/utils/gateway";

const nextConfig: NextConfig = {
    output: "standalone",
    rewrites: async () => {
        return {
            beforeFiles: [],
            afterFiles: [],
            fallback: [
                {
                    source: "/callback",
                    destination: `${gatewayHost}/login/oauth2/code/bff-client`,
                },
                {
                    source: "/login",
                    destination: `${gatewayHost}/oauth2/authorization/bff-client`,
                },
            ],
        };
    },
};

export default nextConfig;
