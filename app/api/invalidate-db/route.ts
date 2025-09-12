import { revalidateTag } from "next/cache";
import { DB_CACHE_TAG } from "@/lib/database/constants";
import { NextResponse } from "next/server";
import { getLogger } from "@/lib/logging/logger";
import { extractUserRequestId } from "@/lib/headers/extractUserRequestId";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const CURRENT_FILE_NAME = path.basename(__filename);

export async function DELETE() {
    const requestId = await extractUserRequestId();
    const logger = getLogger(`${CURRENT_FILE_NAME} | DELETE`, requestId);
    try {
        revalidateTag(DB_CACHE_TAG);
        logger.info("Database cache invalidated.", {
            status: 200,
        });
        return NextResponse.json({ now: Date.now() });
    } catch (error) {
        console.error(error);
        const message = "Failed to invalidate database cache.";
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
