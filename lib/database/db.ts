import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import { LibSQLDatabase } from "drizzle-orm/libsql";
import { appEnv } from "../env/appEnv";

let db: LibSQLDatabase<typeof schema>;

if (appEnv.NODE_ENV === "test") {
    console.log("Using in-memory database.");
    const turso = createClient({
        url: ":memory:",
    });
    db = drizzle(turso, { schema });
} else {
    console.log(`Database URL: ${appEnv.TURSO_DATABASE_URL}`);
    const turso = createClient({
        url: appEnv.TURSO_DATABASE_URL!,
        authToken: appEnv.TURSO_AUTH_TOKEN,
    });
    db = drizzle(turso, { schema });
}

export default db;
