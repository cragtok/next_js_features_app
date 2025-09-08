import { getCachedUsers } from "@/lib/database/databaseHandler";
import { getLogger } from "@/lib/logging/logger";

export async function retrieveUsersFromDb() {
    const logger = getLogger();

    try {
        logger.info("retrieveUsersFromDb", "Retrieving cached users...");
        const users = await getCachedUsers();
        logger.info("retrieveUsersFromDb", "Cached users retrieved...", {
            numUsers: users?.length,
        });
        logger.debug("retrieveUsersFromDb", "Users:", {
            users,
        });
        return users;
    } catch (error) {
        console.error(error);
        logger.debug("retrieveUsersFromDb", "Error retrieving cached users.", {
            message: (error as Error).message,
            stack: (error as Error).stack,
        });
        throw new Error("Failed to retrieve users. Please try again later.");
    }
}
