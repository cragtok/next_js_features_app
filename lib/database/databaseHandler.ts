import { revalidateTag, unstable_cache } from "next/cache";
import { DB_CACHE_TAG, DB_CACHE_PATH, MAX_USERS } from "./constants";
import { getLogger } from "@/lib/logging/logger";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db";
import { usersTable } from "./schema";
import { asc, eq, count } from "drizzle-orm";

interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt?: string;
}

type UserDTO = Omit<User, "id">;

const __filename = fileURLToPath(import.meta.url);
const CURRENT_FILE_NAME = path.basename(__filename);

async function deleteOldestUser(requestId?: string) {
    const oldestUser = await db
        .select({ id: usersTable.id })
        .from(usersTable)
        .orderBy(asc(usersTable.createdAt))
        .limit(1)
        .get();

    if (oldestUser) {
        const deletedUser = (await db
            .delete(usersTable)
            .where(eq(usersTable.id, oldestUser.id))
            .returning()
            .get()) as User;

        const logger = getLogger(
            `${CURRENT_FILE_NAME} | deleteOldestUser`,
            requestId
        );
        logger.info("Deleted oldest user.", { id: deletedUser.id });
        logger.debug("Oldest user:", { deletedUser });
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
            const items = (await db.select().from(usersTable).all()) as User[];
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
    const usersCount = await db
        .select({ count: count() })
        .from(usersTable)
        .get();

    if (usersCount!.count >= MAX_USERS) {
        await deleteOldestUser(requestId);
    }

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await db.insert(usersTable).values({
        id,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        createdAt,
    });

    const addedUser = (await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id))
        .get()) as User;

    const logger = getLogger(`${CURRENT_FILE_NAME} | addUserToDb`, requestId);
    logger.info("Added new user.", { id: addedUser.id });
    logger.debug("New user:", {
        addedUser,
    });

    revalidateTag(DB_CACHE_TAG);
    return addedUser;
}

async function findUserInDb(userId: string): Promise<User | null> {
    const foundUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, userId))
        .get();
    return (foundUser as User) || null;
}

async function updateUserInDb(user: User, requestId?: string): Promise<User> {
    const updatedUser = (await db
        .update(usersTable)
        .set({
            username: user.username,
            email: user.email,
            password: user.password,
        })
        .where(eq(usersTable.id, user.id))
        .returning()
        .get()) as User;

    revalidateTag(DB_CACHE_TAG);

    const logger = getLogger(
        `${CURRENT_FILE_NAME} | updateUserInDb`,
        requestId
    );
    logger.info("Updated user.", { id: updatedUser.id });
    logger.debug("Updated user:", { updatedUser });
    return updatedUser;
}

async function deleteUserInDb(userId: string, requestId?: string) {
    await db.delete(usersTable).where(eq(usersTable.id, userId)).run();
    const logger = getLogger(
        `${CURRENT_FILE_NAME} | deleteUserInDb`,
        requestId
    );
    logger.info("Deleted user.", { id: userId });
    revalidateTag(DB_CACHE_TAG);
}

async function clearDb(): Promise<void> {
    await db.delete(usersTable).run();
    const logger = getLogger(`${CURRENT_FILE_NAME} | clearDb`);
    logger.info("All users deleted.");
}

async function seedDb(usersToSeed: UserDTO[]): Promise<void> {
    const usersToInsert = usersToSeed.map((user) => ({
        id: crypto.randomUUID(),
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: new Date().toISOString(),
    }));

    await db.insert(usersTable).values(usersToInsert);

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
