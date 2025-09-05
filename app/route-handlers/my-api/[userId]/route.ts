import {
    deleteUserInDb,
    findUserInDb,
    updateUserInDb,
} from "@/lib/database/databaseHandler";
import { parseUserBody } from "@/lib/utils";
import { SqliteError } from "better-sqlite3";
import logger from "@/lib/logging/logger";

const API_ROUTE = "/my-api";

async function PUT(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;
    logger.info(`${API_ROUTE}/${userId} | PUT`, "Request received.");

    let body = null;
    try {
        body = await request.json();
        logger.debug(`${API_ROUTE}/${userId} | PUT`, "Request body received:", {
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
            logger.error(`${API_ROUTE}/${userId} | PUT`, message, {
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
            logger.error(`${API_ROUTE}/${userId} | PUT`, "User not found.", {
                status,
            });
            return Response.json(
                {
                    message: `User with id '${userId}' not found.`,
                },
                { status }
            );
        }

        const updatedUser = await updateUserInDb({
            id: foundUser.id,
            username: parseResult.result.username,
            email: parseResult.result.email,
            password: parseResult.result.password,
        });

        logger.info(`${API_ROUTE}/${userId} | PUT`, `User updated.`, {
            status: 200,
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
        logger.error(`${API_ROUTE}/${userId} | PUT`, message, {
            body,
            status,
            error: error as Error,
        });

        return Response.json({ message }, { status });
    }
}

async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;
    logger.info(`${API_ROUTE}/${userId} | DELETE`, "Request received.");

    try {
        const foundUser = await findUserInDb(userId);

        if (!foundUser) {
            const message = `User with id ${userId} not found.`;
            const status = 404;
            logger.error(`${API_ROUTE}/${userId} | DELETE`, "User not found.", {
                status,
                id: userId,
            });
            return Response.json(
                {
                    message,
                },
                { status }
            );
        }

        await deleteUserInDb(userId);
        logger.info(`${API_ROUTE}/${userId} | DELETE`, `User deleted.`, {
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
        logger.error(`${API_ROUTE}/${userId} | DELETE`, message, {
            status,
            error: error as Error,
        });

        return Response.json({ message }, { status });
    }
}

export { PUT, DELETE };
