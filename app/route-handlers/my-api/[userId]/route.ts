import {
    deleteUserInDb,
    findUserInDb,
    updateUserInDb,
} from "@/lib/database/databaseHandler";
import { parseUserBody } from "@/lib/utils";
import { SqliteError } from "better-sqlite3";

async function PUT(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;

    try {
        const body = await request.json();
        console.log(
            `PUT method called with userid: ${userId} and body: ${JSON.stringify(body)}`
        );

        const parseResult = parseUserBody({
            username: body.username.trim(),
            email: body.email.trim(),
            password: body.password,
        });

        if (!parseResult.success) {
            return Response.json(
                {
                    message: "Missing or invalid user data.",
                    errors: parseResult.result,
                },
                { status: 400 }
            );
        }

        const foundUser = await findUserInDb(userId);

        if (!foundUser) {
            return Response.json(
                {
                    message: `User with id ${userId} not found.`,
                },
                { status: 404 }
            );
        }

        const updatedUser = await updateUserInDb({
            id: foundUser.id,
            username: parseResult.result.username,
            email: parseResult.result.email,
            password: parseResult.result.password,
        });

        return Response.json({ data: updatedUser });
    } catch (error) {
        console.error(error);
        let message = "Failed to update user.";
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
            message = `User with ${duplicateUserField} already exists`;
            status = 400;
        }

        return Response.json({ message }, { status });
    }
}

async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;

    try {
        console.log(`DELETE method called with userid: ${userId}`);

        const foundUser = await findUserInDb(userId);

        if (!foundUser) {
            return Response.json(
                {
                    message: `User with id ${userId} not found.`,
                },
                { status: 404 }
            );
        }

        await deleteUserInDb(userId);
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error(error);
        let message = "Failed to delete user.";
        let status = 500;
        if (error instanceof SyntaxError) {
            message = error.message;
            status = 400;
        }

        return Response.json({ message }, { status });
    }
}

export { PUT, DELETE };
