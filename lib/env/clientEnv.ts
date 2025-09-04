import { z } from "zod";
import { processEnv } from "./utils";

const clientSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
    NEXT_PUBLIC_JOKE_API_URL: z.url(
        "NEXT_PUBLIC_JOKE_API_URL must be a valid URL"
    ),
});

export const clientEnv = processEnv(clientSchema, {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_JOKE_API_URL: process.env.NEXT_PUBLIC_JOKE_API_URL,
});
