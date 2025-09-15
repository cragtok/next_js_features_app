import { z } from "zod";
import { loadEnvConfig } from "@next/env";
import { processEnv } from "./utils";

const testSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
    TEST_URL: z.url("TEST_URL must be a valid URL"),
});

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export const testEnv = processEnv(testSchema, {
    NODE_ENV: process.env.NODE_ENV,
    TEST_URL: process.env.TEST_URL,
});
