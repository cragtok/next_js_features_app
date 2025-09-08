import { v4 as uuidv4 } from "uuid";
import { clearDb, seedDb, User } from "@/lib/database/databaseHandler";
import { getLogger } from "@/lib/logging/logger";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const CURRENT_FILE_NAME = path.basename(__filename);

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
        logger.fatal("Database seeding failed.", {
            error: error as Error,
        });
        process.exit(1);
    }
}

runSeed();
