import { defineConfig } from "cypress";
import { testEnv } from "./lib/env/testEnv";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) { },
        baseUrl: testEnv.TEST_URL,
    },
});
