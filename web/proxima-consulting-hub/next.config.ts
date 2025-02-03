import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    return {
      beforeFiles: [],
      afterFiles:[],
      fallback: [
        {
          source: "/callback",
          destination: "http://localhost:8000/login/oauth2/code/bff-client"
        }
      ]
    }
  },
};

export default nextConfig;
