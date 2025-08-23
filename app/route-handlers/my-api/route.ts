import { getCachedUsers, addUserToDb } from "@/lib/database/databaseHandler";
import * as z from "zod";

const postUserSchema = z.object({
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

export async function GET(_request: Request) {
    console.log("GET method called");
    try {
        const users = await getCachedUsers();
        return Response.json({ data: users, success: true });
    } catch (error) {
        console.error(error);
        return Response.json({
            success: false,
            message: "Failed to fetch users",
        });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log(`POST method called with body: ${JSON.stringify(body)}`);

        const parsedBody = postUserSchema.safeParse({
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
            return Response.json({
                success: false,
                message: "User Creation Failed.",
                errors: errors,
            });
        }

        const newUser = await addUserToDb({
            id: crypto.randomUUID(),
            username: parsedBody.data.username,
            email: parsedBody.data.email,
            password: parsedBody.data.password,
        });

        return Response.json({ data: newUser, success: true });
    } catch (error) {
        console.error(error);
        return Response.json({
            success: false,
            message: "Failed to create new user.",
        });
    }
}
