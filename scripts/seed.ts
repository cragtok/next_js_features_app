import { clearDb, seedDb } from "@/lib/database/databaseHandler";

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
    try {
        console.log("Starting database seeding...");
        await clearDb();
        await seedDb(mockUsers);
        console.log("Database seeding complete.");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

runSeed();
