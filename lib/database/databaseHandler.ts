import { revalidateTag, unstable_cache } from "next/cache";
import Database from "better-sqlite3";
import {
    DB_CACHE_TAG,
    DB_FILE_PATH,
    DB_CACHE_PATH,
    MAX_USERS,
} from "./constants";
import logger from "@/lib/logging/logger";

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

async function deleteOldestUser() {
    const oldestUser = db
        .prepare("SELECT id FROM users ORDER BY createdAt ASC LIMIT 1")
        .get() as { id: string } | undefined;

    if (oldestUser) {
        db.prepare("DELETE FROM users WHERE id = ?").run(oldestUser.id);
        logger.info("deleteOldestUser", "Deleted oldest user.", {
            id: oldestUser.id,
        });
        revalidateTag(DB_CACHE_TAG);
    }
}

const getCachedUsers = unstable_cache(
    async () => {
        try {
            const items = db.prepare("SELECT * FROM users").all() as User[];
            logger.info(
                "getCachedUsers",
                "Users fetched from database cache.",
                {
                    numUsers: items.length,
                }
            );
            return items;
        } catch (error) {
            logger.error(
                "getCachedUsers",
                "Failed to read from database cache.",
                error as Error
            );
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

    logger.info("addItemToDb", "Added new user.", { id: addedUser.id });
    logger.debug("addItemToDb", "Added new user:", addedUser);
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

async function updateUserInDb(user: User): Promise<User> {
    db.prepare(
        "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?"
    ).run(user.username, user.email, user.password, user.id);
    revalidateTag(DB_CACHE_TAG);

    const updatedUser = db
        .prepare("SELECT * FROM users WHERE id = ?")
        .get(user.id) as User;
    logger.info("updateUserInDb", "Updated user.", {
        id: updatedUser.id,
    });
    logger.debug("updateUserInDb", `Updated user:`, {
        oldUser: user,
        newUser: updatedUser,
    });
    return updatedUser;
}

async function deleteUserInDb(userId: string) {
    db.prepare("DELETE FROM users WHERE id = ?").run(userId);
    logger.info("deleteUserInDb", "Deleted user.", {
        id: userId,
    });
    revalidateTag(DB_CACHE_TAG);
}

async function clearDb(): Promise<void> {
    db.prepare("DELETE FROM users").run();
    logger.info("clearDb", "All users deleted.");
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
    logger.info("seedDb", "Users seeded.", {
        numUsers: usersToSeed.length,
    });
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
