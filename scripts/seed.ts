import { clearDb, seedDb, type User } from "@/lib/database/databaseHandler";
import { v4 as uuidv4 } from "uuid";
import logger from "@/lib/logging/logger";

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
    try {
        logger.info("runSeed", "Starting database seeding...");
        await clearDb();
        await seedDb(mockUsers);
        logger.info("runSeed", "Database seeding complete.");
    } catch (error) {
        logger.fatal("runSeed", `Database seeding failed.`, error as Error);
        process.exit(1);
    }
}

runSeed();
