import { testApiHandler } from "next-test-api-route-handler";
import { expect, beforeEach } from "@jest/globals";
import * as appHandler from "@/app/route-handlers/my-api/[userId]/route";
import { DrizzleQueryError } from "drizzle-orm/errors";

const mockDeleteUserInDb = jest.fn();
const mockFindUserInDb = jest.fn();
const mockUpdateUserInDb = jest.fn();
const mockParseUserBody = jest.fn();
const mockExtractUserRequestId = jest.fn(() =>
    Promise.resolve("test-request-id")
);

jest.mock("@/lib/database/databaseHandler", () => ({
    deleteUserInDb: (id: string, requestId?: string) =>
        mockDeleteUserInDb(id, requestId),
    findUserInDb: (id: string) => mockFindUserInDb(id),
    updateUserInDb: (user: any, requestId?: string) =>
        mockUpdateUserInDb(user, requestId),
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
        mockFindUserInDb.mockReset();
    });

    describe("PUT route handler", () => {
        it("should return 200 when user is successfully updated", async () => {
            const userId = "test-user-id";
            const existingUser = {
                id: userId,
                username: "olduser",
                email: "old@example.com",
                password: "oldpassword",
            };
            const updatedUser = {
                id: userId,
                username: "newuser",
                email: "new@example.com",
                password: "newpassword",
            };

            mockFindUserInDb.mockResolvedValueOnce(existingUser);
            mockParseUserBody.mockReturnValueOnce({
                success: true,
                result: {
                    username: updatedUser.username,
                    email: updatedUser.email,
                    password: updatedUser.password,
                },
            });
            mockUpdateUserInDb.mockResolvedValueOnce(updatedUser);

            await testApiHandler({
                appHandler,
                url: `/route-handlers/my-api/${userId}`,
                params: { userId },
                async test({ fetch }) {
                    const res = await fetch({
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            username: updatedUser.username,
                            email: updatedUser.email,
                            password: updatedUser.password,
                        }),
                    });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockFindUserInDb).toHaveBeenCalledTimes(1);
                    expect(mockFindUserInDb).toHaveBeenCalledWith(userId);
                    expect(mockParseUserBody).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledWith({
                        username: updatedUser.username,
                        email: updatedUser.email,
                        password: updatedUser.password,
                    });
                    expect(mockUpdateUserInDb).toHaveBeenCalledTimes(1);
                    expect(mockUpdateUserInDb).toHaveBeenCalledWith(
                        {
                            id: userId,
                            username: updatedUser.username,
                            email: updatedUser.email,
                            password: updatedUser.password,
                        },
                        "test-request-id"
                    );

                    expect(res.status).toBe(200);
                    expect(json).toEqual({ data: updatedUser });
                },
            });
        });

        it("should return 404 when user to be updated is not found", async () => {
            const userId = "non-existent-user-id";
            const updateUserBody = {
                username: "newuser",
                email: "new@example.com",
                password: "newpassword",
            };

            mockFindUserInDb.mockResolvedValueOnce(null);

            mockParseUserBody.mockReturnValueOnce({
                success: true,
                result: updateUserBody,
            });

            await testApiHandler({
                appHandler,
                url: `/route-handlers/my-api/${userId}`,
                params: { userId },
                async test({ fetch }) {
                    const res = await fetch({
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updateUserBody),
                    });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledWith(
                        updateUserBody
                    );

                    expect(mockFindUserInDb).toHaveBeenCalledTimes(1);
                    expect(mockFindUserInDb).toHaveBeenCalledWith(userId);

                    expect(mockUpdateUserInDb).not.toHaveBeenCalled();

                    expect(res.status).toBe(404);
                    expect(json).toEqual({
                        message: `User with id '${userId}' not found.`,
                    });
                },
            });
        });

        it("should return 400 when request body has missing information", async () => {
            const userId = "test-user-id";
            const existingUser = {
                id: userId,
                username: "olduser",
                email: "old@example.com",
                password: "oldpassword",
            };
            const errors = {
                username: "Username must be at least 5 characters long.",
                email: "Email must not be empty.",
                password: "Password must be at least 5 characters long.",
            };

            mockFindUserInDb.mockResolvedValueOnce(existingUser);
            mockParseUserBody.mockReturnValueOnce({
                success: false,
                result: errors,
            });

            await testApiHandler({
                appHandler,
                url: `/route-handlers/my-api/${userId}`,
                params: { userId },
                async test({ fetch }) {
                    const res = await fetch({
                        method: "PUT",
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
                    expect(mockFindUserInDb).not.toHaveBeenCalled();
                    expect(mockUpdateUserInDb).not.toHaveBeenCalled();

                    expect(res.status).toBe(400);
                    expect(json).toEqual({
                        message: "Missing or invalid user data.",
                        errors: errors,
                    });
                },
            });
        });

        it("should return 400 when username is less than 5 characters", async () => {
            const userId = "test-user-id";
            const existingUser = {
                id: userId,
                username: "olduser",
                email: "old@example.com",
                password: "oldpassword",
            };
            const updateUserBody = {
                username: "abc",
                email: "test@example.com",
                password: "password123",
            };
            const errors = {
                username: "Username must be at least 5 characters long.",
            };

            mockFindUserInDb.mockResolvedValueOnce(existingUser);
            mockParseUserBody.mockReturnValueOnce({
                success: false,
                result: errors,
            });

            await testApiHandler({
                appHandler,
                url: `/route-handlers/my-api/${userId}`,
                params: { userId },
                async test({ fetch }) {
                    const res = await fetch({
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updateUserBody),
                    });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledWith(
                        updateUserBody
                    );
                    expect(mockFindUserInDb).not.toHaveBeenCalled();
                    expect(mockUpdateUserInDb).not.toHaveBeenCalled();

                    expect(res.status).toBe(400);
                    expect(json).toEqual({
                        message: "Missing or invalid user data.",
                        errors: errors,
                    });
                },
            });
        });

        it("should return 400 when password is less than 5 characters", async () => {
            const userId = "test-user-id";
            const existingUser = {
                id: userId,
                username: "olduser",
                email: "old@example.com",
                password: "oldpassword",
            };
            const updateUserBody = {
                username: "testuser",
                email: "test@example.com",
                password: "abc",
            };
            const errors = {
                password: "Password must be at least 5 characters long.",
            };

            mockFindUserInDb.mockResolvedValueOnce(existingUser);
            mockParseUserBody.mockReturnValueOnce({
                success: false,
                result: errors,
            });

            await testApiHandler({
                appHandler,
                url: `/route-handlers/my-api/${userId}`,
                params: { userId },
                async test({ fetch }) {
                    const res = await fetch({
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updateUserBody),
                    });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledWith(
                        updateUserBody
                    );
                    expect(mockFindUserInDb).not.toHaveBeenCalled();
                    expect(mockUpdateUserInDb).not.toHaveBeenCalled();

                    expect(res.status).toBe(400);
                    expect(json).toEqual({
                        message: "Missing or invalid user data.",
                        errors: errors,
                    });
                },
            });
        });

        it("should return 400 when email is not in proper email format", async () => {
            const userId = "test-user-id";
            const existingUser = {
                id: userId,
                username: "olduser",
                email: "old@example.com",
                password: "oldpassword",
            };
            const updateUserBody = {
                username: "testuser",
                email: "invalid-email",
                password: "password123",
            };
            const errors = {
                email: "Invalid email format.",
            };

            mockFindUserInDb.mockResolvedValueOnce(existingUser);
            mockParseUserBody.mockReturnValueOnce({
                success: false,
                result: errors,
            });

            await testApiHandler({
                appHandler,
                url: `/route-handlers/my-api/${userId}`,
                params: { userId },
                async test({ fetch }) {
                    const res = await fetch({
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updateUserBody),
                    });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledWith(
                        updateUserBody
                    );
                    expect(mockFindUserInDb).not.toHaveBeenCalled();
                    expect(mockUpdateUserInDb).not.toHaveBeenCalled();

                    expect(res.status).toBe(400);
                    expect(json).toEqual({
                        message: "Missing or invalid user data.",
                        errors: errors,
                    });
                },
            });
        });

        it("should return 500 when updating a user fails", async () => {
            const userId = "test-user-id";
            const existingUser = {
                id: userId,
                username: "olduser",
                email: "old@example.com",
                password: "oldpassword",
            };
            const updateUserBody = {
                username: "newuser",
                email: "new@example.com",
                password: "newpassword",
            };

            mockFindUserInDb.mockResolvedValueOnce(existingUser);
            mockParseUserBody.mockReturnValueOnce({
                success: true,
                result: updateUserBody,
            });
            mockUpdateUserInDb.mockImplementationOnce(() => {
                throw new Error("Failed to update from DB");
            });

            await testApiHandler({
                appHandler,
                url: `/route-handlers/my-api/${userId}`,
                params: { userId },
                async test({ fetch }) {
                    const res = await fetch({
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updateUserBody),
                    });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockFindUserInDb).toHaveBeenCalledTimes(1);
                    expect(mockFindUserInDb).toHaveBeenCalledWith(userId);
                    expect(mockParseUserBody).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledWith(
                        updateUserBody
                    );
                    expect(mockUpdateUserInDb).toHaveBeenCalledTimes(1);
                    expect(mockUpdateUserInDb).toHaveBeenCalledWith(
                        { id: userId, ...updateUserBody },
                        "test-request-id"
                    );

                    expect(res.status).toBe(500);
                    expect(json).toEqual({
                        message: "Failed to update user.",
                    });
                },
            });
        });

        it("should return 400 when updating a user with an already existing username", async () => {
            const userId = "test-user-id";
            const existingUser = {
                id: userId,
                username: "olduser",
                email: "old@example.com",
                password: "oldpassword",
            };
            const updateUserBody = {
                username: "existingusername",
                email: "new@example.com",
                password: "newpassword",
            };

            mockFindUserInDb.mockResolvedValueOnce(existingUser);
            mockParseUserBody.mockReturnValueOnce({
                success: true,
                result: updateUserBody,
            });
            mockUpdateUserInDb.mockImplementationOnce(() => {
                throw new MockDrizzleQueryError(
                    "Drizzle error",
                    "SQLITE_CONSTRAINT",
                    "username"
                );
            });

            await testApiHandler({
                appHandler,
                url: `/route-handlers/my-api/${userId}`,
                params: { userId },
                async test({ fetch }) {
                    const res = await fetch({
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updateUserBody),
                    });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockFindUserInDb).toHaveBeenCalledTimes(1);
                    expect(mockFindUserInDb).toHaveBeenCalledWith(userId);
                    expect(mockParseUserBody).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledWith(
                        updateUserBody
                    );
                    expect(mockUpdateUserInDb).toHaveBeenCalledTimes(1);
                    expect(mockUpdateUserInDb).toHaveBeenCalledWith(
                        { id: userId, ...updateUserBody },
                        "test-request-id"
                    );

                    expect(res.status).toBe(400);
                    expect(json).toEqual({
                        message: "User with username already exists.",
                    });
                },
            });
        });

        it("should return 400 when updating a user with an already existing email", async () => {
            const userId = "test-user-id";
            const existingUser = {
                id: userId,
                username: "olduser",
                email: "old@example.com",
                password: "oldpassword",
            };
            const updateUserBody = {
                username: "newuser",
                email: "existing@example.com",
                password: "newpassword",
            };

            mockFindUserInDb.mockResolvedValueOnce(existingUser);
            mockParseUserBody.mockReturnValueOnce({
                success: true,
                result: updateUserBody,
            });
            mockUpdateUserInDb.mockImplementationOnce(() => {
                throw new MockDrizzleQueryError(
                    "Drizzle error",
                    "SQLITE_CONSTRAINT",
                    "email"
                );
            });

            await testApiHandler({
                appHandler,
                url: `/route-handlers/my-api/${userId}`,
                params: { userId },
                async test({ fetch }) {
                    const res = await fetch({
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updateUserBody),
                    });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockFindUserInDb).toHaveBeenCalledTimes(1);
                    expect(mockFindUserInDb).toHaveBeenCalledWith(userId);
                    expect(mockParseUserBody).toHaveBeenCalledTimes(1);
                    expect(mockParseUserBody).toHaveBeenCalledWith(
                        updateUserBody
                    );
                    expect(mockUpdateUserInDb).toHaveBeenCalledTimes(1);
                    expect(mockUpdateUserInDb).toHaveBeenCalledWith(
                        { id: userId, ...updateUserBody },
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

    describe("DELETE route handler", () => {
        it("should return 204 no content when user is successfully deleted", async () => {
            const userId = "test-user-id";
            mockFindUserInDb.mockResolvedValueOnce({ id: userId });

            await testApiHandler({
                appHandler,
                url: `/route-handlers/my-api/${userId}`,
                params: { userId },
                async test({ fetch }) {
                    const res = await fetch({ method: "DELETE" });

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockFindUserInDb).toHaveBeenCalledTimes(1);
                    expect(mockFindUserInDb).toHaveBeenCalledWith(userId);
                    expect(mockDeleteUserInDb).toHaveBeenCalledTimes(1);
                    expect(mockDeleteUserInDb).toHaveBeenCalledWith(
                        userId,
                        "test-request-id"
                    );

                    expect(res.status).toBe(204);
                    expect(res.text()).resolves.toBe("");
                },
            });
        });

        it("should return 404 when user is not found", async () => {
            const userId = "non-existent-user-id";
            mockFindUserInDb.mockResolvedValueOnce(null);

            await testApiHandler({
                appHandler,
                url: `/route-handlers/my-api/${userId}`,
                params: { userId },
                async test({ fetch }) {
                    const res = await fetch({ method: "DELETE" });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockFindUserInDb).toHaveBeenCalledTimes(1);
                    expect(mockFindUserInDb).toHaveBeenCalledWith(userId);
                    expect(mockDeleteUserInDb).not.toHaveBeenCalled();

                    expect(res.status).toBe(404);
                    expect(json).toEqual({
                        message: `User with id ${userId} not found.`,
                    });
                },
            });
        });

        it("should return 500 there is an error in user deletion", async () => {
            const userId = "test-user-id";
            mockFindUserInDb.mockResolvedValueOnce({ id: userId });
            mockDeleteUserInDb.mockImplementationOnce(() => {
                throw new Error("Failed to delete from DB");
            });

            await testApiHandler({
                appHandler,
                url: `/route-handlers/my-api/${userId}`,
                params: { userId },
                async test({ fetch }) {
                    const res = await fetch({ method: "DELETE" });
                    const json = await res.json();

                    expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                    expect(mockFindUserInDb).toHaveBeenCalledTimes(1);
                    expect(mockFindUserInDb).toHaveBeenCalledWith(userId);
                    expect(mockDeleteUserInDb).toHaveBeenCalledTimes(1);
                    expect(mockDeleteUserInDb).toHaveBeenCalledWith(
                        userId,
                        "test-request-id"
                    );

                    expect(res.status).toBe(500);
                    expect(json).toEqual({
                        message: "Failed to delete user.",
                    });
                },
            });
        });
    });
});
