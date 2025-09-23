import { z } from "zod";
import { processEnv } from "./utils";
import "client-only";

const clientSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
});

export const clientEnv = processEnv(clientSchema, {
    NODE_ENV: process.env.NODE_ENV,
});
