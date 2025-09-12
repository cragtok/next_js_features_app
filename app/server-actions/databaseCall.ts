import { getCachedUsers } from "@/lib/database/databaseHandler";
import { getLogger } from "@/lib/logging/logger";
import path from "path";
import { fileURLToPath } from "url";
import { serverEnv } from "@/lib/env/serverEnv";

const __filename = fileURLToPath(import.meta.url);
const CURRENT_FILE_NAME = path.basename(__filename);

export async function retrieveUsersFromDb() {
    const logger = getLogger(`${CURRENT_FILE_NAME} | retrieveUsersFromDb`);

    try {
        logger.info("Invalidating database cache...");
        const invalidateResponse = await fetch(`${serverEnv.DOMAIN_URL}/api/invalidate-db`, {
            method: "DELETE",
        });

        if (!invalidateResponse.ok) {
            logger.error("Failed to invalidate database cache.", {
                status: invalidateResponse.status,
                statusText: invalidateResponse.statusText,
            });
            throw new Error("Failed to invalidate database cache.");
        }
        logger.info("Database cache invalidated successfully.");

        logger.info("Retrieving cached users...");
        const users = await getCachedUsers();
        logger.info("Cached users retrieved.", {
            numUsers: users?.length,
        });
        return users;
    } catch (error) {
        console.error(error);
        logger.debug("Error retrieving cached users.", {
            message: (error as Error).message,
            stack: (error as Error).stack,
        });
        throw new Error("Failed to retrieve users. Please try again later.");
    }
}
