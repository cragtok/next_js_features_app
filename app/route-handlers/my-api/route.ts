import { getCachedUsers, addUserToDb } from "@/lib/database/databaseHandler";
import { parseUserBody } from "@/lib/utils";
import { extractUserRequestId } from "@/lib/headers/extractUserRequestId";
import { SqliteError } from "better-sqlite3";
import { getLogger } from "@/lib/logging/logger";

const API_ROUTE = "/my-api";

async function GET(_request: Request) {
    const requestId = await extractUserRequestId();

    const loggerScope = `${API_ROUTE} | GET`;
    const logger = getLogger(requestId);

    logger.info(loggerScope, "Request received.");
    try {
        const users = await getCachedUsers(requestId);
        logger.info(loggerScope, "Users fetched.", {
            numUsers: users?.length,
            status: 200,
        });
        logger.debug(loggerScope, "Users:.", {
            numUsers: users?.length,
            users,
            status: 200,
        });
        return Response.json({ data: users });
    } catch (error) {
        const message = "Failed to return users.";
        const status = 500;
        logger.error(loggerScope, message, {
            status: 500,
            message: (error as Error).message,
            stack: (error as Error).stack,
        });
        return Response.json(
            {
                message,
            },
            { status }
        );
    }
}

async function POST(request: Request) {
    const requestId = await extractUserRequestId();

    const loggerScope = `${API_ROUTE} | POST`;
    const logger = getLogger(requestId);

    logger.info(loggerScope, "Request received.");
    let body = null;
    try {
        body = await request.json();
        logger.debug(loggerScope, "Request body received:", body);

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
                errors,
                status,
            });
            return Response.json(
                {
                    message: "Missing or invalid user data.",
                    errors: parseResult.result,
                },
                { status }
            );
        }

        const newUser = await addUserToDb({
            id: crypto.randomUUID(),
            username: parseResult.result.username,
            email: parseResult.result.email,
            password: parseResult.result.password,
        }, requestId);

        logger.info(loggerScope, "New user created.", {
            id: newUser.id,
            status: 201,
        });
        logger.debug(loggerScope, "New user:", {
            newUser,
            status: 201,
        });

        return Response.json({ data: newUser }, { status: 201 });
    } catch (error) {
        let message = "Failed to create new user.";
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
            status,
            body,
            message: (error as Error).message,
            stack: (error as Error).stack,
        });

        return Response.json(
            {
                message,
            },
            { status }
        );
    }
}

export { GET, POST };
