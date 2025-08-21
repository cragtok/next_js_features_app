"use server";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { addUserToDb } from "./databaseHandler";

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
        username: formData.get("username"),
        email: formData.get("email"),
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
        username: parsed.data.username,
        email: parsed.data.email,
        password: parsed.data.password,
    };

    console.log("Form data received:", rawFormData);

    // Simulate a delay for network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await addUserToDb(rawFormData);

    revalidateTag("db-users");

    return {
        message: "User created successfully!",
        data: rawFormData,
    };
}
