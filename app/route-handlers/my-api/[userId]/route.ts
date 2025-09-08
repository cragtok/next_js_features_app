import {
    deleteUserInDb,
    findUserInDb,
    updateUserInDb,
} from "@/lib/database/databaseHandler";
import { parseUserBody } from "@/lib/utils";
import { extractUserRequestId } from "@/lib/headers/extractUserRequestId";
import { SqliteError } from "better-sqlite3";
import { getLogger } from "@/lib/logging/logger";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const CURRENT_FILE_NAME = path.basename(__filename);

async function PUT(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const requestId = await extractUserRequestId();

    const { userId } = await params;

    const logger = getLogger(`${CURRENT_FILE_NAME} | PUT`, requestId);

    logger.info("Request received.");

    let body = null;
    try {
        body = await request.json();
        logger.debug("Request body received:", { body });

        const parseResult = parseUserBody({
            username: body.username.trim(),
            email: body.email.trim(),
            password: body.password,
        });

        if (!parseResult.success) {
            const message = "Missing or invalid user data.";
            const errors = parseResult.result;
            const status = 400;
            logger.error(message, {
                body,
                status,
                errors,
            });
            return Response.json(
                {
                    message,
                    errors,
                },
                { status }
            );
        }

        const foundUser = await findUserInDb(userId);

        if (!foundUser) {
            const status = 404;
            logger.error("User not found.", { status });
            return Response.json(
                {
                    message: `User with id '${userId}' not found.`,
                },
                { status }
            );
        }

        const updatedUser = await updateUserInDb(
            {
                id: foundUser.id,
                username: parseResult.result.username,
                email: parseResult.result.email,
                password: parseResult.result.password,
            },
            requestId
        );

        logger.info(`User updated.`, { status: 200 });
        logger.debug(`Updated user:`, { updatedUser });
        return Response.json({ data: updatedUser });
    } catch (error) {
        let message = "Failed to update user.";
        let status = 500;
        if (error instanceof SyntaxError) {
            message = error.message;
            status = 400;
        } else if (
            error instanceof SqliteError &&
            error.code == "SQLITE_CONSTRAINT_UNIQUE"
        ) {
            const duplicateUserField = error.message
                .split(": ")[1]
                .split(".")[1];
            message = `User with ${duplicateUserField} already exists.`;
            status = 400;
        }
        logger.error(message, {
            body,
            status,
            message: (error as Error).message,
            stack: (error as Error).stack,
        });

        return Response.json({ message }, { status });
    }
}

async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const requestId = await extractUserRequestId();

    const { userId } = await params;

    const logger = getLogger(`${CURRENT_FILE_NAME} | DELETE`);

    logger.info("Request received.");

    try {
        const foundUser = await findUserInDb(userId);

        if (!foundUser) {
            const message = `User with id ${userId} not found.`;
            const status = 404;
            logger.error("User not found.", { status });
            return Response.json(
                {
                    message,
                },
                { status }
            );
        }

        await deleteUserInDb(userId, requestId);
        logger.info("User deleted.", { status: 204 });
        return new Response(null, { status: 204 });
    } catch (error) {
        let message = "Failed to delete user.";
        let status = 500;
        if (error instanceof SyntaxError) {
            message = error.message;
            status = 400;
        }
        logger.error(message, {
            status,
            message: (error as Error).message,
            stack: (error as Error).stack,
        });

        return Response.json({ message }, { status });
    }
}

export { PUT, DELETE };
