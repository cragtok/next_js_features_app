import { z } from "zod";
import { processEnv } from "./utils";
import "server-only";

const serverSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
    GEMINI_API_KEY: z.string("GEMINI_API_KEY must be a valid string").min(1),
    TWELVE_DATA_API_KEY: z
        .string("TWELVE_DATA_API_KEY must be a valid string")
        .min(1),
    DOMAIN_URL: z.url("DOMAIN_URL must be a valid URL"),
    TURSO_DATABASE_URL: z.url("TURSO_DATABASE_URL must be a valid URL"),
    TURSO_AUTH_TOKEN: z.string("TURSO_AUTH_TOKEN must be a valid string"),
});

export const serverEnv = processEnv(serverSchema, {
    NODE_ENV: process.env.NODE_ENV,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    TWELVE_DATA_API_KEY: process.env.TWELVE_DATA_API_KEY,
    DOMAIN_URL: process.env.DOMAIN_URL,
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
});
