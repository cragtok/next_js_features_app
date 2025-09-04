import { z } from "zod";
import { processEnv } from "./utils";

const serverSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
    QUOTES_API_URL: z.url("QUOTES_API_URL must be a valid URL"),
    GEMINI_API_KEY: z.string("GEMINI_API_KEY must be a valid string").min(1),
    TWELVE_DATA_API_KEY: z
        .string("TWELVE_DATA_API_KEY must be a valid string")
        .min(1),
    TWELVE_DATA_API_BATCH_URL: z.url(
        "TWELVE_DATA_API_BATCH_URL must be a valid URL"
    ),
});

export const serverEnv = processEnv(serverSchema, {
    NODE_ENV: process.env.NODE_ENV,
    QUOTES_API_URL: process.env.QUOTES_API_URL,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    TWELVE_DATA_API_KEY: process.env.TWELVE_DATA_API_KEY,
    TWELVE_DATA_API_BATCH_URL: process.env.TWELVE_DATA_API_BATCH_URL,
});
