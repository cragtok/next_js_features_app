import { defineConfig } from "cypress";
import { appEnv } from "./lib/env/appEnv";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) { },
        baseUrl: appEnv.DOMAIN_URL,
    },
    env: {
        baseUrl: appEnv.DOMAIN_URL,
    },
});
