import { revalidateTag, unstable_cache } from "next/cache";
import path from "path";
import Database from "better-sqlite3";

interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt?: string;
}

const DB_FILE_PATH = path.join(process.cwd(), "data", "app.db");
const DB_CACHE_PATH = "db-users-path";
const DB_CACHE_TAG = "db-users-tag";
const MAX_USERS = 10;

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

async function deleteOldestUser() {
    const oldestUser = db
        .prepare("SELECT id FROM users ORDER BY createdAt ASC LIMIT 1")
        .get() as { id: string } | undefined;

    if (oldestUser) {
        db.prepare("DELETE FROM users WHERE id = ?").run(oldestUser.id);
        console.log(
            `[deleteOldestUser] Deleted oldest user with ID: ${oldestUser.id}`
        );
        revalidateTag(DB_CACHE_TAG);
    }
}

const getCachedUsers = unstable_cache(
    async () => {
        console.log("[unstable_cache] Fetching data from mockDb.json...");
        try {
            const items = db.prepare("SELECT * FROM users").all() as User[];
            console.log(
                `[unstable_cache] Data fetched. Total items: ${items.length}`
            );
            return items;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to read from database cache.");
        }
    },
    [DB_CACHE_PATH],
    {
        tags: [DB_CACHE_TAG],
        revalidate: false,
    }
);

async function addUserToDb(newUser: Omit<User, "createdAt">): Promise<User> {
    const { count } = db
        .prepare("SELECT COUNT(*) as count FROM users")
        .get() as { count: number };

    if (count >= MAX_USERS) {
        await deleteOldestUser();
    }

    const createdAt = new Date().toISOString();
    db.prepare(
        "INSERT INTO users (id, username, email, password, createdAt) VALUES(?, ?, ?, ?, ?)"
    ).run(
        newUser.id,
        newUser.username,
        newUser.email,
        newUser.password,
        createdAt
    );

    const addedUser = db
        .prepare("SELECT * FROM users WHERE id = ?")
        .get(newUser.id) as User;

    console.log(`[addItemToDb] Added new item: ${JSON.stringify(addedUser)}`);
    revalidateTag(DB_CACHE_TAG);
    return addedUser;
}

async function findUserInDb(userId: string): Promise<User | null> {
    const foundUser = db
        .prepare("SELECT * FROM users WHERE id = ? ")
        .get(userId) as User | undefined;
    if (foundUser) {
        return foundUser;
    }
    return null;
}

async function updateUserInDb(updatedUser: User): Promise<User | null> {
    db.prepare(
        "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?"
    ).run(
        updatedUser.username,
        updatedUser.email,
        updatedUser.password,
        updatedUser.id
    );
    revalidateTag(DB_CACHE_TAG);

    const dbUser = db
        .prepare("SELECT * FROM users WHERE id = ?")
        .get(updatedUser.id) as User;

    return dbUser;
}

async function deleteUserInDb(userId: string) {
    db.prepare("DELETE FROM users WHERE id = ?").run(userId);
    revalidateTag(DB_CACHE_TAG);
}

async function clearDb(): Promise<void> {
    db.prepare("DELETE FROM users").run();
    console.log("[clearDb] All users deleted.");
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
    console.log(`[seedDb] ${usersToSeed.length} users seeded.`);
}

export {
    db,
    getCachedUsers,
    addUserToDb,
    findUserInDb,
    updateUserInDb,
    deleteUserInDb,
    clearDb,
    seedDb,
    type User,
};
