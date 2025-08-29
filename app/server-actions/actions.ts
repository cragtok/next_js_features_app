"use server";
import { z } from "zod";
import { addUserToDb } from "@/lib/database/databaseHandler";
import { SqliteError } from "better-sqlite3";

export interface FormState {
    message: string;
    errors?: Record<string, string>;
    data?: {
        username: string;
        email: string;
        password: string;
    };
}

const schema = z.object({
    username: z
        .string()
        .min(5, "Username must be at least 5 characters long.")
        .max(50, "Username must not exceed 50 characters"),
    password: z
        .string()
        .min(5, "Password must be at least 5 characters long.")
        .max(50, "Password must not exceed 50 characters"),
    email: z
        .email("Invalid email address.")
        .max(50, "Email must not exceed 50 characters"),
});

export async function createUser(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const parsed = schema.safeParse({
        username: (formData.get("username") as string).trim(),
        email: (formData.get("email") as string).trim(),
        password: formData.get("password"),
    });

    if (!parsed.success) {
        const errors: Record<string, string> = {};
        parsed.error.issues.forEach((issue) => {
            if (issue.path[0]) {
                errors[issue.path[0].toString()] = issue.message;
            }
        });
        return {
            message: "User Creation Failed.",
            errors: errors,
        };
    }

    const rawFormData = {
        id: crypto.randomUUID(),
        username: parsed.data.username,
        email: parsed.data.email,
        password: parsed.data.password,
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
            return {
                message: "User Creation Failed.",
                errors: {
                    [duplicateUserField]: duplicateFieldMessage,
                },
            };
        }
    }

    return {
        message: "User created successfully!",
        data: rawFormData,
    };
}
