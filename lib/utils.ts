import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { User } from "@/lib/database/databaseHandler";
import * as z from "zod";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function parseUserBody(body: Partial<User>) {
    const userBodySchema = z.object({
        username: z
            .string()
            .nonempty({ message: "Username must not be empty." })
            .min(5, "Username must be at least 5 characters long.")
            .max(50, "Username must not exceed 50 characters."),
        password: z
            .string()
            .nonempty({ message: "Password must not be empty." })
            .min(5, "Password must be at least 5 characters long.")
            .max(50, "Password must not exceed 50 characters."),
        email: z
            .email("Email address must be in valid email format.")
            .nonempty({ message: "Email must not be empty." })
            .max(50, "Email must not exceed 50 characters."),
    });

    const parsedBody = userBodySchema.safeParse({
        username: body.username,
        email: body.email,
        password: body.password,
    });

    if (!parsedBody.success) {
        const errors: Record<string, string> = {};
        parsedBody.error.issues.forEach((issue) => {
            if (issue.path[0]) {
                errors[issue.path[0].toString()] = issue.message;
            }
        });

        return {
            success: false,
            result: errors,
        };
    }

    return {
        success: true,
        result: {
            username: parsedBody.data.username,
            email: parsedBody.data.email,
            password: parsedBody.data.password,
        },
    };
}

export { cn, parseUserBody };