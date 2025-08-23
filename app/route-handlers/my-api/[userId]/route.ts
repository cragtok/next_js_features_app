import { deleteUserInDb, updateUserInDb } from "@/lib/database/databaseHandler";
import * as z from "zod";

const putUserSchema = z.object({
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

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;

    try {
        const body = await request.json();
        console.log(
            `PUT method called with userid: ${userId} and body: ${JSON.stringify(body)}`
        );

        const parsedBody = putUserSchema.safeParse({
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
                message: "User Update Failed.",
                errors: errors,
            });
        }

        const updatedUser = await updateUserInDb(userId, {
            username: parsedBody.data.username,
            email: parsedBody.data.email,
            password: parsedBody.data.password,
        });

        if (updatedUser) {
            return Response.json({ data: updatedUser, success: true });
        } else {
            return Response.json({
                message: `User with id ${userId} not found.`,
                success: false,
            });
        }
    } catch (error) {
        console.error(error);
        return Response.json({
            success: false,
            message: "Failed to update user.",
        });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;

    try {
        console.log(`DELETE method called with userid: ${userId}`);

        const deletedUser = await deleteUserInDb(userId);

        if (deletedUser) {
            return Response.json({ data: deletedUser, success: true });
        } else {
            return Response.json({
                message: `User with id ${userId} not found.`,
                success: false,
            });
        }
    } catch (error) {
        console.error(error);
        return Response.json({
            success: false,
            message: "Failed to update user.",
        });
    }
}
