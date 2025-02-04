import type { NextConfig } from "next";
import { gatewayInternalHost } from "./src/utils/gateway";

const nextConfig: NextConfig = {
    output: "standalone",
    rewrites: async () => {
        return {
            beforeFiles: [],
            afterFiles: [],
            fallback: [
                {
                    source: "/callback",
                    destination: `${gatewayInternalHost}/login/oauth2/code/bff-client`,
                },
                {
                    source: "/login",
                    destination: `${gatewayInternalHost}/oauth2/authorization/bff-client`,
                },
            ],
        };
    },
};

export default nextConfig;
