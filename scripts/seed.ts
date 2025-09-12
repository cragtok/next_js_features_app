import { clearDb, seedDb } from "@/lib/database/databaseHandler";
import { getLogger } from "@/lib/logging/logger";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const CURRENT_FILE_NAME = path.basename(__filename);

export const mockUsers = [
    {
        username: "john_doe",
        email: "john.doe@example.com",
        password: "password123",
    },
    {
        username: "jane_smith",
        email: "jane.smith@example.com",
        password: "securepass",
    },
    {
        username: "peter_jones",
        email: "peter.jones@example.com",
        password: "mysecret",
    },
];

async function runSeed() {
    const logger = getLogger(`${CURRENT_FILE_NAME} | runSeed`);
    try {
        logger.info("Starting database seeding...");
        await clearDb();
        await seedDb(mockUsers);
        logger.info("Database seeding complete.", {
            numUsers: mockUsers.length,
        });
    } catch (error) {
        console.error(error);
        logger.fatal("Database seeding failed.", {
            error: error as Error,
        });
        process.exit(1);
    }
}

runSeed();
