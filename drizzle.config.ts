import type { Config } from "drizzle-kit";
import { serverEnv } from "./lib/env/serverEnv";

export default {
    schema: "./lib/database/schema.ts",
    out: "./migrations",
    dialect: "turso",
    dbCredentials: {
        url: serverEnv.TURSO_DATABASE_URL,
        authToken: serverEnv.TURSO_AUTH_TOKEN!,
    },
} satisfies Config;
