import { getCachedUsers, addUserToDb } from "@/lib/database/databaseHandler";
import { parseUserBody } from "./utils";

export async function GET(_request: Request) {
    console.log("GET method called");
    try {
        const users = await getCachedUsers();
        return Response.json({ data: users });
    } catch (error) {
        console.error(error);
        return Response.json(
            {
                message: "Failed to fetch users",
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log(`POST method called with body: ${JSON.stringify(body)}`);

        const parseResult = parseUserBody({
            username: body.username,
            email: body.email,
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

        const newUser = await addUserToDb({
            id: crypto.randomUUID(),
            username: parseResult.result.username,
            email: parseResult.result.email,
            password: parseResult.result.password,
        });

        return Response.json({ data: newUser });
    } catch (error) {
        console.error(error);
        let message = "Failed to create new user.";
        let status = 500;

        if (error instanceof SyntaxError) {
            message = error.message;
            status = 400;
        }

        return Response.json(
            {
                message,
            },
            { status }
        );
    }
}
