import { testApiHandler } from "next-test-api-route-handler";
import { expect, beforeEach } from "@jest/globals";
import * as appHandler from "@/app/route-handlers/my-api/route";
import { DrizzleQueryError } from "drizzle-orm/errors";


const mockGetCachedUsers = jest.fn();
const mockAddUserToDb = jest.fn();
const mockParseUserBody = jest.fn();
const mockExtractUserRequestId = jest.fn(() =>
    Promise.resolve("test-request-id")
);

jest.mock("@/lib/database/databaseHandler", () => ({
    getCachedUsers: (id: string) => mockGetCachedUsers(id),
    addUserToDb: (user: any, requestId?: string) =>
        mockAddUserToDb(user, requestId),
}));

jest.mock("@/lib/utils", () => ({
    parseUserBody: (body: any) => mockParseUserBody(body),
}));

jest.mock("@/lib/headers/extractUserRequestId", () => ({
    extractUserRequestId: () => mockExtractUserRequestId(),
}));

class MockDrizzleQueryError extends DrizzleQueryError {
    cause: any;
    constructor(message: string, code: string, field: string) {
        super(message, []);
        this.name = "DrizzleQueryError";
        this.cause = {
            cause: {
                code: code,
                proto: {
                    message: `SQLite error: UNIQUE constraint failed: users.${field}`,
                },
            },
        };
    }
}

describe("Route Handlers API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET route handler", () => {
        it("should return 200 and list of cached database users on success", async () => {
            const mockUsers = [
                {
                    id: "1",
                    username: "test",
                    email: "test@example.com",
                    password: "password",
                },
            ];
            mockGetCachedUsers.mockReturnValueOnce(mockUsers);
            await testApiHandler({
                appHandler,
                url: "/route-handlers/my-api",
                async test({ fetch }) {
                    const res = await fetch({ method: "GET" });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockGetCachedUsers).toHaveBeenCalledTimes(1);
                    expect(mockGetCachedUsers).toHaveBeenCalledWith(
                        "test-request-id"
                    );

                    expect(res.status).toBe(200);
                    expect(json).toHaveProperty("data");
                    expect(json.data).toEqual(mockUsers);
                },
            });
        });
        it("should return 200 and an empty array if there are no users in the database", async () => {
            const mockUsers: any[] = [];
            mockGetCachedUsers.mockReturnValueOnce(mockUsers);
            await testApiHandler({
                appHandler,
                url: "/route-handlers/my-api",
                async test({ fetch }) {
                    const res = await fetch({ method: "GET" });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockGetCachedUsers).toHaveBeenCalledTimes(1);
                    expect(mockGetCachedUsers).toHaveBeenCalledWith(
                        "test-request-id"
                    );

                    expect(res.status).toBe(200);
                    expect(json).toHaveProperty("data");
                    expect(json.data).toHaveLength(0);
                },
            });
        });
        it("should return 500 and if retrieving cached database users fails", async () => {
            mockGetCachedUsers.mockImplementationOnce(() => {
                throw new Error("Failed to retrieve users from DB");
            });

            await testApiHandler({
                appHandler,
                url: "/route-handlers/my-api",
                async test({ fetch }) {
                    const res = await fetch({ method: "GET" });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockGetCachedUsers).toHaveBeenCalledTimes(1);
                    expect(mockGetCachedUsers).toHaveBeenCalledWith(
                        "test-request-id"
                    );

                    expect(res.status).toBe(500);
                    expect(json).toEqual({
                        message: "Failed to return users.",
                    });
                },
            });
        });
    });

    describe("POST route handler", () => {
        it("should return 201 and the new user when a new user is added successfully", async () => {
            const newUser = {
                id: "new-user-id",
                username: "newuser",
                email: "new@example.com",
                password: "newpassword",
            };

            mockParseUserBody.mockReturnValueOnce({
                success: true,
                result: {
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password,
                },
            });
            mockAddUserToDb.mockReturnValueOnce(newUser);

            await testApiHandler({
                appHandler,
                url: "/route-handlers/my-api",
                async test({ fetch }) {
                    const res = await fetch({
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            username: newUser.username,
                            email: newUser.email,
                            password: newUser.password,
                        }),
                    });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledWith({
                        username: newUser.username,
                        email: newUser.email,
                        password: newUser.password,
                    });
                    expect(mockAddUserToDb).toHaveBeenCalledTimes(1);
                    expect(mockAddUserToDb).toHaveBeenCalledWith(
                        {
                            username: newUser.username,
                            email: newUser.email,
                            password: newUser.password,
                        },
                        "test-request-id"
                    );

                    expect(res.status).toBe(201);
                    expect(json).toEqual({ data: newUser });
                },
            });
        });
        it("should return 400 when request body has missing information", async () => {
            const errors = {
                username: "Username must be at least 5 characters long.",
                password: "Password must be at least 5 characters long.",
                email: "Email must not be empty.",
            };

            mockParseUserBody.mockReturnValueOnce({
                success: false,
                result: errors,
            });

            await testApiHandler({
                appHandler,
                url: "/route-handlers/my-api",
                async test({ fetch }) {
                    const res = await fetch({
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({}),
                    });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);

                    expect(mockParseUserBody).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledWith({
                        username: "",
                        email: "",
                        password: "",
                    });

                    expect(mockAddUserToDb).not.toHaveBeenCalled();

                    expect(res.status).toBe(400);
                    expect(json).toEqual({
                        message: "Missing or invalid user data.",
                        errors: errors,
                    });
                },
            });
        });
        it("should return 400 when username is less than 5 characters", async () => {
            const errors = {
                username: "Username must be at least 5 characters long",
            };

            mockParseUserBody.mockReturnValueOnce({
                success: false,
                result: errors,
            });

            await testApiHandler({
                appHandler,
                url: "/route-handlers/my-api",
                async test({ fetch }) {
                    const res = await fetch({
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            username: "abc", // Less than 5 characters
                            email: "valid@example.com",
                            password: "validpassword",
                        }),
                    });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledWith({
                        username: "abc",
                        email: "valid@example.com",
                        password: "validpassword",
                    });
                    expect(mockAddUserToDb).not.toHaveBeenCalled();

                    expect(res.status).toBe(400);
                    expect(json).toEqual({
                        message: "Missing or invalid user data.",
                        errors: errors,
                    });
                },
            });
        });
        it("should return 400 when password is less than 5 characters", async () => {
            const errors = {
                password: "Password must be at least 5 characters long",
            };

            mockParseUserBody.mockReturnValueOnce({
                success: false,
                result: errors,
            });

            await testApiHandler({
                appHandler,
                url: "/route-handlers/my-api",
                async test({ fetch }) {
                    const res = await fetch({
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            username: "validuser",
                            email: "valid@example.com",
                            password: "abc",
                        }),
                    });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledWith({
                        username: "validuser",
                        email: "valid@example.com",
                        password: "abc",
                    });
                    expect(mockAddUserToDb).not.toHaveBeenCalled();

                    expect(res.status).toBe(400);
                    expect(json).toEqual({
                        message: "Missing or invalid user data.",
                        errors: errors,
                    });
                },
            });
        });

        it("should return 400 when email is not in proper email format", async () => {
            const errors = {
                email: "Invalid email format",
            };

            mockParseUserBody.mockReturnValueOnce({
                success: false,
                result: errors,
            });

            await testApiHandler({
                appHandler,
                url: "/route-handlers/my-api",
                async test({ fetch }) {
                    const res = await fetch({
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            username: "validuser",
                            email: "invalid-email",
                            password: "validpassword",
                        }),
                    });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledWith({
                        username: "validuser",
                        email: "invalid-email",
                        password: "validpassword",
                    });
                    expect(mockAddUserToDb).not.toHaveBeenCalled();

                    expect(res.status).toBe(400);
                    expect(json).toEqual({
                        message: "Missing or invalid user data.",
                        errors: errors,
                    });
                },
            });
        });
        it("should return 500 when adding user to db fails", async () => {
            const validUser = {
                username: "validuser",
                email: "valid@example.com",
                password: "validpassword",
            };

            mockParseUserBody.mockReturnValueOnce({
                success: true,
                result: validUser,
            });
            mockAddUserToDb.mockImplementationOnce(() => {
                throw new Error("Database error during add");
            });

            await testApiHandler({
                appHandler,
                url: "/route-handlers/my-api",
                async test({ fetch }) {
                    const res = await fetch({
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(validUser),
                    });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledTimes(1);
                    expect(mockAddUserToDb).toHaveBeenCalledTimes(1);
                    expect(mockAddUserToDb).toHaveBeenCalledWith(
                        validUser,
                        "test-request-id"
                    );

                    expect(res.status).toBe(500);
                    expect(json).toEqual({
                        message: "Failed to create new user.",
                    });
                },
            });
        });

        it("should return 400 when adding a user with an already existing username", async () => {
            const existingUser = {
                username: "existinguser",
                email: "existing@example.com",
                password: "existingpassword",
            };

            mockParseUserBody.mockReturnValueOnce({
                success: true,
                result: existingUser,
            });

            const drizzleQueryError = new MockDrizzleQueryError(
                "Drizzle error",
                "SQLITE_CONSTRAINT",
                "username"
            );
            mockAddUserToDb.mockImplementationOnce(() => {
                throw drizzleQueryError;
            });

            await testApiHandler({
                appHandler,
                url: "/route-handlers/my-api",
                async test({ fetch }) {
                    const res = await fetch({
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(existingUser),
                    });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledTimes(1);
                    expect(mockAddUserToDb).toHaveBeenCalledTimes(1);
                    expect(mockAddUserToDb).toHaveBeenCalledWith(
                        existingUser,
                        "test-request-id"
                    );

                    expect(res.status).toBe(400);
                    expect(json).toEqual({
                        message: "User with username already exists.",
                    });
                },
            });
        });

        it("should return 400 when adding a user with an already existing email", async () => {
            const existingUser = {
                username: "existinguser",
                email: "existing@example.com",
                password: "existingpassword",
            };

            mockParseUserBody.mockReturnValueOnce({
                success: true,
                result: existingUser,
            });

            const drizzleQueryError = new MockDrizzleQueryError(
                "Drizzle error",
                "SQLITE_CONSTRAINT",
                "email"
            );

            mockAddUserToDb.mockImplementationOnce(() => {
                throw drizzleQueryError;
            });

            await testApiHandler({
                appHandler,
                url: "/route-handlers/my-api",
                async test({ fetch }) {
                    const res = await fetch({
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(existingUser),
                    });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledTimes(1);
                    expect(mockAddUserToDb).toHaveBeenCalledTimes(1);
                    expect(mockAddUserToDb).toHaveBeenCalledWith(
                        existingUser,
                        "test-request-id"
                    );

                    expect(res.status).toBe(400);
                    expect(json).toEqual({
                        message: "User with email already exists.",
                    });
                },
            });
        });
    });
});
