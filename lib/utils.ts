import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { User } from "@/lib/database/databaseHandler";
import * as z from "zod";

const MAX_SLUG_LENGTH = 80;

function isValidDynamicRouteSegment(dynamicSegment: string) {
    if (!dynamicSegment.length) {
        return true;
    }
    // If dynamic portion of route exceeds 80
    // characters or contains invalid characters,
    // then the route is invalid
    return (
        dynamicSegment.length <= MAX_SLUG_LENGTH &&
        // only alphanumeric, underscores, dashes, spaces, and percentage signs allowed
        // (spaces get auto converted to percentage signs in browser URL bar)
        /^[a-zA-Z0-9\-\_\\%\\ /]+$/.test(dynamicSegment)
    );
}

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

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export {
    cn,
    parseUserBody,
    delay,
    isValidDynamicRouteSegment,
    MAX_SLUG_LENGTH,
};
