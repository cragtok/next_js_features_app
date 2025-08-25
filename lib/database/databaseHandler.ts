import { revalidateTag, unstable_cache } from "next/cache";
import fs from "fs/promises";
import path from "path";

interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

const DB_FILE_PATH = path.join(process.cwd(), "data", "mockDb.json");
const DB_CACHE_PATH = "db-users-path";
const DB_CACHE_TAG = "db-users-tag";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function readDbFile(): Promise<User[]> {
    try {
        const fileContent = await fs.readFile(DB_FILE_PATH, "utf-8");
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading from mockDb.json:", error);
        return [];
    }
}

async function writeDbFile(data: User[]): Promise<void> {
    try {
        await fs.writeFile(
            DB_FILE_PATH,
            JSON.stringify(data, null, 2),
            "utf-8"
        );
        revalidateTag(DB_CACHE_TAG);
    } catch (error) {
        console.error("Error writing to mockDb.json:", error);
        throw new Error("Failed to write to mock database file.");
    }
}

const getCachedUsers = unstable_cache(
    async () => {
        await delay(2000);
        console.log("[unstable_cache] Fetching data from mockDb.json...");
        try {
            const items = await readDbFile();
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

async function addUserToDb(newUser: User): Promise<User> {
    await delay(1000);
    const users = await readDbFile();
    users.push(newUser);
    await writeDbFile(users);
    console.log(`[addItemToDb] Added new item: ${JSON.stringify(newUser)}`);
    revalidateTag(DB_CACHE_TAG);
    return newUser;
}

async function findUserInDb(userId: string): Promise<User | null> {
    const users = await readDbFile();
    const foundUser = users.find((user) => user.id === userId);
    if (foundUser) {
        return foundUser;
    }
    return null;
}

async function updateUserInDb(updatedUser: User): Promise<User | null> {
    const users = await readDbFile();
    const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
    );
    await writeDbFile(updatedUsers);
    revalidateTag(DB_CACHE_TAG);
    return updatedUser;
}

async function deleteUserInDb(userId: string) {
    const users = await readDbFile();
    const updatedUsers = users.filter((user) => user.id !== userId);
    await writeDbFile(updatedUsers);
    revalidateTag(DB_CACHE_TAG);
}

export {
    getCachedUsers,
    addUserToDb,
    findUserInDb,
    updateUserInDb,
    deleteUserInDb,
    type User,
};
