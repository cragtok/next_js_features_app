import { revalidateTag } from "next/cache";
import { DB_CACHE_TAG } from "@/lib/database/constants";
import { clearDb, getCachedUsers, seedDb } from "@/lib/database/databaseHandler";
import { mockUsers } from "@/scripts/seed";
import { getLogger } from "@/lib/logging/logger";
import { extractUserRequestId } from "@/lib/headers/extractUserRequestId";
import { NextResponse } from "next/server";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const CURRENT_FILE_NAME = path.basename(__filename);

export async function POST() {
    const requestId = await extractUserRequestId();
    const logger = getLogger(`${CURRENT_FILE_NAME} | POST`, requestId);
    try {
        await clearDb();
        await seedDb(mockUsers);
        revalidateTag(DB_CACHE_TAG);
        logger.info("Database cleared and seeded.", {
            status: 200,
        });
        logger.debug("Users:", {
            status: 200,
            users: await getCachedUsers()
        });
        return NextResponse.json({
            now: Date.now(),
        });
    } catch (error) {
        console.error(error);
        const message = "Failed to clear and seed database.";
        const status = 500;
        logger.error(message, {
            status,
            message: (error as Error).message,
            stack: (error as Error).stack,
        });
        return NextResponse.json(
            {
                message,
            },
            { status }
        );
    }
}
