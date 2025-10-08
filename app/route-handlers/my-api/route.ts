import { getCachedUsers, addUserToDb } from "@/lib/database/databaseHandler";
import { parseUserBody } from "@/lib/utils";
import { extractUserRequestId } from "@/lib/headers/extractUserRequestId";
import { getLogger } from "@/lib/logging/logger";
import path from "path";
import { fileURLToPath } from "url";
import { DrizzleQueryError } from "drizzle-orm/errors";
import { DrizzleLibSqlErrorCause } from "@/lib/database/types";

const __filename = fileURLToPath(import.meta.url);
const CURRENT_FILE_NAME = path.basename(__filename);

async function GET(_request: Request) {
    const requestId = await extractUserRequestId();

    const logger = getLogger(`${CURRENT_FILE_NAME} | GET`, requestId);

    logger.info("Request received.");
    try {
        const users = await getCachedUsers(requestId);
        logger.info("Users fetched.", {
            numUsers: users?.length,
            status: 200,
        });
        return Response.json({ data: users });
    } catch (error) {
        const message = "Failed to return users.";
        const status = 500;
        logger.error(message, {
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

    const logger = getLogger(`${CURRENT_FILE_NAME} | POST`, requestId);

    logger.info("Request received.");
    let body = null;
    try {
        body = await request.json();
        logger.debug("Request body received:", {
            body,
        });

        const parseResult = parseUserBody({
            username: (body.username && body.username.trim()) || "",
            email: (body.email && body.email.trim()) || "",
            password: body.password || "",
        });

        if (!parseResult.success) {
            const message = "Missing or invalid user data.";
            const errors = parseResult.result;
            const status = 400;
            logger.error(message, {
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

        const newUser = await addUserToDb(
            {
                username: parseResult.result.username,
                email: parseResult.result.email,
                password: parseResult.result.password,
            },
            requestId
        );

        logger.info("New user created.", {
            id: newUser.id,
            status: 201,
        });
        logger.debug("New user:", {
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
            error instanceof DrizzleQueryError &&
            (error.cause as DrizzleLibSqlErrorCause)?.cause.code ===
            "SQLITE_CONSTRAINT"
        ) {
            const nestedError = (error.cause as DrizzleLibSqlErrorCause)?.cause;
            const errorMessage = nestedError?.proto?.message;
            const duplicateUserField = errorMessage
                .split(": ")[2]
                .split(".")[1];
            message = `User with ${duplicateUserField} already exists.`;
            status = 400;
        }

        logger.error(message, {
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
