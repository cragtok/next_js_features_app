import {
    deleteUserInDb,
    findUserInDb,
    updateUserInDb,
} from "@/lib/database/databaseHandler";
import { parseUserBody } from "@/lib/utils";
import { SqliteError } from "better-sqlite3";
import { getLogger } from "@/lib/logging/logger";
import { headers } from "next/headers";

const API_ROUTE = "/my-api";

async function PUT(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const headersList = await headers();
    const requestId = headersList.get("x-user-session-id") || undefined;

    const { userId } = await params;

    const loggerScope = `${API_ROUTE}/${userId} | PUT`;
    const logger = getLogger(requestId);

    logger.info(loggerScope, "Request received.");

    let body = null;
    try {
        body = await request.json();
        logger.debug(loggerScope, "Request body received:", {
            body,
        });

        const parseResult = parseUserBody({
            username: body.username.trim(),
            email: body.email.trim(),
            password: body.password,
        });

        if (!parseResult.success) {
            const message = "Missing or invalid user data.";
            const errors = parseResult.result;
            const status = 400;
            logger.error(loggerScope, message, {
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
            logger.error(loggerScope, "User not found.", {
                status,
            });
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

        logger.info(loggerScope, `User updated.`, {
            status: 200,
        });
        logger.debug(loggerScope, `Updated user:`, {
            updatedUser,
        });
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
        logger.error(loggerScope, message, {
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
    const headersList = await headers();
    const requestId = headersList.get("x-user-session-id") || undefined;

    const { userId } = await params;

    const loggerScope = `${API_ROUTE}/${userId} | DELETE`;
    const logger = getLogger(requestId);

    logger.info(loggerScope, "Request received.");

    try {
        const foundUser = await findUserInDb(userId);

        if (!foundUser) {
            const message = `User with id ${userId} not found.`;
            const status = 404;
            logger.error(loggerScope, "User not found.", {
                status,
            });
            return Response.json(
                {
                    message,
                },
                { status }
            );
        }

        await deleteUserInDb(userId, requestId);
        logger.info(loggerScope, `User deleted.`, {
            status: 204,
        });
        return new Response(null, { status: 204 });
    } catch (error) {
        let message = "Failed to delete user.";
        let status = 500;
        if (error instanceof SyntaxError) {
            message = error.message;
            status = 400;
        }
        logger.error(loggerScope, message, {
            status,
            message: (error as Error).message,
            stack: (error as Error).stack,
        });

        return Response.json({ message }, { status });
    }
}

export { PUT, DELETE };
