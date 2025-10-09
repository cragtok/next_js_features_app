import type { Config } from "drizzle-kit";
import { appEnv } from "./lib/env/appEnv";

export default {
    schema: "./lib/database/schema.ts",
    out: "./migrations",
    dialect: "turso",
    dbCredentials: {
        url: appEnv.TURSO_DATABASE_URL,
        authToken: appEnv.TURSO_AUTH_TOKEN!,
    },
} satisfies Config;
