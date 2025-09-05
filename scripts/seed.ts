import { v4 as uuidv4 } from "uuid";
import { pino } from "pino";
import Database from "better-sqlite3";
import { DB_FILE_PATH } from "@/lib/database/constants";

interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt?: string;
}
const db = new Database(DB_FILE_PATH);
db.pragma("journal_mode = WAL");

db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
      );
`);

const scriptLogger = pino({ level: "debug" });

const mockUsers: User[] = [
    {
        id: uuidv4(),
        username: "john_doe",
        email: "john.doe@example.com",
        password: "password123",
    },
    {
        id: uuidv4(),
        username: "jane_smith",
        email: "jane.smith@example.com",
        password: "securepass",
    },
    {
        id: uuidv4(),
        username: "peter_jones",
        email: "peter.jones@example.com",
        password: "mysecret",
    },
];

async function clearDb(): Promise<void> {
    db.prepare("DELETE FROM users").run();
}

async function seedDb(usersToSeed: User[]): Promise<void> {
    const insert = db.prepare(
        "INSERT INTO users (id, username, email, password, createdAt) VALUES(?, ?, ?, ?, ?)"
    );
    db.transaction((users) => {
        for (const user of users) {
            insert.run(
                user.id,
                user.username,
                user.email,
                user.password,
                new Date().toISOString()
            );
        }
    })(usersToSeed);
}

async function runSeed() {
    try {
        scriptLogger.info("[runSeed]: Starting database seeding...");
        await clearDb();
        await seedDb(mockUsers);
        scriptLogger.info(
            { numUsers: mockUsers.length },
            "[runSeed]: Database seeding complete."
        );
    } catch (error) {
        scriptLogger.fatal(
            { error: error as Error },
            "[runSeed]: Database seeding failed."
        );
        process.exit(1);
    }
}

runSeed();
