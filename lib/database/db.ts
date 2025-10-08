import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import { loadEnvConfig } from "@next/env";
import { LibSQLDatabase } from "drizzle-orm/libsql";
import { serverEnv } from "../env/serverEnv";

loadEnvConfig(process.cwd());

let db: LibSQLDatabase<typeof schema>;

if (process.env.NODE_ENV === "test") {
    console.log("Using in-memory database.");
    const turso = createClient({
        url: ":memory:",
    });
    db = drizzle(turso, { schema });
} else {
    console.log(`Database URL: ${serverEnv.TURSO_DATABASE_URL}`);
    const turso = createClient({
        url: serverEnv.TURSO_DATABASE_URL!,
        authToken: serverEnv.TURSO_AUTH_TOKEN,
    });
    db = drizzle(turso, { schema });
}

export default db;
