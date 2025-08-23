import { unstable_cache } from "next/cache";
import fs from "fs/promises";
import path from "path";

interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), "data", "mockDb.json");

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function readDbFile(): Promise<User[]> {
    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading mockDb.json:", error);
        return [];
    }
}

async function writeDbFile(data: User[]): Promise<void> {
    try {
        await fs.writeFile(
            DATA_FILE_PATH,
            JSON.stringify(data, null, 2),
            "utf-8"
        );
    } catch (error) {
        console.error("Error writing mockDb.json:", error);
        throw new Error("Failed to write to mock database file.");
    }
}

const getCachedUsers = unstable_cache(
    async () => {
        await delay(2000);
        console.log("[unstable_cache] Fetching data from mockDb.json...");
        const items = await readDbFile();
        console.log(
            `[unstable_cache] Data fetched. Total items: ${items.length}`
        );
        return items;
    },
    ["db-users-cache"],
    {
        tags: ["db-users"],
        revalidate: false,
    }
);

async function addUserToDb(newUser: User): Promise<void> {
    await delay(1000);
    const users = await readDbFile();
    users.push(newUser);
    await writeDbFile(users);
    console.log(`[addItemToDb] Added new item: ${newUser}`);
}

export { getCachedUsers, addUserToDb, type User };
