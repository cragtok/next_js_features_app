"use server";
import { addUserToDb } from "@/lib/database/databaseHandler";
import { SqliteError } from "better-sqlite3";
import { parseUserBody } from "@/lib/utils";
import { extractUserRequestId } from "@/lib/headers/extractUserRequestId";
import { getLogger } from "@/lib/logging/logger";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const CURRENT_FILE_NAME = path.basename(__filename);

export interface FormState {
    message: string;
    errors?: Record<string, string>;
    data?: {
        username: string;
        email: string;
        password: string;
    };
}

export async function createUserAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const requestId = await extractUserRequestId();

    const logger = getLogger(`${CURRENT_FILE_NAME} | createUserAction`, requestId);

    const username = (formData.get("username") as string).trim();
    const email = (formData.get("email") as string).trim();
    const password = formData.get("password") as string;

    logger.info("Submitting form data...");
    logger.debug("Form data received:", {
        formData: {
            username,
            email,
            password,
        },
    });

    const parseResult = parseUserBody({
        username: username,
        email: email,
        password,
    });

    if (!parseResult.success) {
        logger.error("Form data parsing failed.", {
            errors: parseResult.result,
            formData: {
                username,
                email,
                password,
            },
        });
        return {
            message: "User Creation Failed.",
            errors: parseResult.result,
        };
    }

    const rawFormData = {
        username: parseResult.result.username,
        email: parseResult.result.email,
        password: parseResult.result.password,
    };

    try {
        const newUser = await addUserToDb(rawFormData, requestId);

        logger.info("Form data submitted.", {
            id: newUser.id,
        });

        logger.debug("New user data:", {
            data: newUser,
        });

        return {
            message: "User created successfully!",
            data: rawFormData,
        };
    } catch (error) {
        console.error(error);
        if (
            error instanceof SqliteError &&
            error.code == "SQLITE_CONSTRAINT_UNIQUE"
        ) {
            const duplicateUserField = error.message
                .split(": ")[1]
                .split(".")[1];
            const duplicateFieldMessage = `User with ${duplicateUserField} already exists`;

            logger.error("Form submission failed.", {
                errors: {
                    [duplicateUserField]: duplicateFieldMessage,
                },
                formData: {
                    username,
                    email,
                    password,
                },
            });

            return {
                message: "Form submission failed.",
                errors: {
                    [duplicateUserField]: duplicateFieldMessage,
                },
            };
        }

        return {
            message: "Form submission failed.",
            errors: {
                message: (error as Error).message,
            },
        };
    }
}
