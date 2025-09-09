import { revalidateTag, unstable_cache } from "next/cache";
import Database from "better-sqlite3";
import {
    DB_CACHE_TAG,
    DB_FILE_PATH,
    DB_CACHE_PATH,
    MAX_USERS,
} from "./constants";
import { getLogger } from "@/lib/logging/logger";
import path from "path";
import { fileURLToPath } from "url";

interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt?: string;
}

type UserDTO = Omit<User, "id">;

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

const __filename = fileURLToPath(import.meta.url);
const CURRENT_FILE_NAME = path.basename(__filename);

async function deleteOldestUser(requestId?: string) {
    const oldestUser = db
        .prepare("SELECT id FROM users ORDER BY createdAt ASC LIMIT 1")
        .get() as { id: string } | undefined;

    if (oldestUser) {
        db.prepare("DELETE FROM users WHERE id = ?").run(oldestUser.id);
        const logger = getLogger(
            `${CURRENT_FILE_NAME} | deleteOldestUser`,
            requestId
        );
        logger.info("Deleted oldest user.", { id: oldestUser.id });
        logger.debug("Oldest user:", { oldestUser });
        revalidateTag(DB_CACHE_TAG);
    }
}

const getCachedUsers = unstable_cache(
    async (requestId?: string) => {
        const logger = getLogger(
            `${CURRENT_FILE_NAME} | getCachedUsers`,
            requestId
        );
        try {
            const items = db.prepare("SELECT * FROM users").all() as User[];
            logger.info("Users fetched from database cache.", {
                numUsers: items.length,
            });
            return items;
        } catch (error) {
            logger.error("Failed to read from database cache.", {
                message: (error as Error).message,
                stack: (error as Error).stack,
            });
        }
    },
    [DB_CACHE_PATH],
    {
        tags: [DB_CACHE_TAG],
        revalidate: false,
    }
);

async function addUserToDb(
    newUser: UserDTO,
    requestId?: string
): Promise<User> {
    const { count } = db
        .prepare("SELECT COUNT(*) as count FROM users")
        .get() as { count: number };

    if (count >= MAX_USERS) {
        await deleteOldestUser(requestId);
    }

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    db.prepare(
        "INSERT INTO users (id, username, email, password, createdAt) VALUES(?, ?, ?, ?, ?)"
    ).run(id, newUser.username, newUser.email, newUser.password, createdAt);

    const addedUser = db
        .prepare("SELECT * FROM users WHERE id = ?")
        .get(id) as User;

    const logger = getLogger(`${CURRENT_FILE_NAME} | addUserToDb`, requestId);
    logger.info("Added new user.", { id: addedUser.id });
    logger.debug("New user:", {
        addedUser,
    });

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

async function updateUserInDb(user: User, requestId?: string): Promise<User> {
    db.prepare(
        "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?"
    ).run(user.username, user.email, user.password, user.id);
    revalidateTag(DB_CACHE_TAG);

    const updatedUser = db
        .prepare("SELECT * FROM users WHERE id = ?")
        .get(user.id) as User;

    const logger = getLogger(
        `${CURRENT_FILE_NAME} | updateUserInDb`,
        requestId
    );
    logger.info("Updated user.", { id: updatedUser.id });
    logger.debug("Updated user:", { updatedUser });
    return updatedUser;
}

async function deleteUserInDb(userId: string, requestId?: string) {
    db.prepare("DELETE FROM users WHERE id = ?").run(userId);
    const logger = getLogger(
        `${CURRENT_FILE_NAME} | deleteUserInDb`,
        requestId
    );
    logger.info("Deleted user.", { id: userId });
    revalidateTag(DB_CACHE_TAG);
}

async function clearDb(): Promise<void> {
    db.prepare("DELETE FROM users").run();
    const logger = getLogger(`${CURRENT_FILE_NAME} | clearDb`);
    logger.info("All users deleted.");
}

async function seedDb(usersToSeed: UserDTO[]): Promise<void> {
    const insert = db.prepare(
        "INSERT INTO users (id, username, email, password, createdAt) VALUES(?, ?, ?, ?, ?)"
    );
    db.transaction((users) => {
        for (const user of users) {
            insert.run(
                crypto.randomUUID(),
                user.username,
                user.email,
                user.password,
                new Date().toISOString()
            );
        }
    })(usersToSeed);

    const logger = getLogger(`${CURRENT_FILE_NAME} | seedDb`);
    logger.info("Users seeded.", { numUsers: usersToSeed.length });
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
    type UserDTO,
};
