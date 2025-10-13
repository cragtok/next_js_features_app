import type { NextConfig } from "next";
import { appEnv } from "./lib/env/appEnv";

const nextConfig: NextConfig = {
    compiler: {
        removeConsole: appEnv.NODE_ENV === "production",
    },
    experimental: {
        globalNotFound: true,
    },
};

export default nextConfig;
