"use server";
import { addUserToDb } from "@/lib/database/databaseHandler";
import { SqliteError } from "better-sqlite3";
import { parseUserBody } from "@/lib/utils";
import logger from "@/lib/logging/logger";

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
    const username = (formData.get("username") as string).trim();
    const email = (formData.get("email") as string).trim();
    const password = formData.get("password") as string;

    logger.debug("createUserAction", "Form data received:", {
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
        logger.error("createUserAction", "Form data parsing failed.", {
            errors: parseResult.result,
        });
        return {
            message: "User Creation Failed.",
            errors: parseResult.result,
        };
    }

    const rawFormData = {
        id: crypto.randomUUID(),
        username: parseResult.result.username,
        email: parseResult.result.email,
        password: parseResult.result.password,
    };

    try {
        await addUserToDb(rawFormData);
    } catch (error) {
        if (
            error instanceof SqliteError &&
            error.code == "SQLITE_CONSTRAINT_UNIQUE"
        ) {
            const duplicateUserField = error.message
                .split(": ")[1]
                .split(".")[1];
            const duplicateFieldMessage = `User with ${duplicateUserField} already exists`;
            logger.error("createUserAction", "User creation failed.", {
                [duplicateUserField]: duplicateFieldMessage,
            });

            return {
                message: "User Creation Failed.",
                errors: {
                    [duplicateUserField]: duplicateFieldMessage,
                },
            };
        }
    }

    logger.info("createUserAction", "User created successfully", {
        id: rawFormData.id,
    });

    return {
        message: "User created successfully!",
        data: rawFormData,
    };
}
