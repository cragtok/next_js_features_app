import { testApiHandler } from "next-test-api-route-handler";
import { expect } from "@jest/globals";
import * as appHandler from "@/app/api/seed-db/route";

const mockClearDb = jest.fn();
const mockSeedDb = jest.fn();
const mockRevalidateTag = jest.fn();
const mockExtractUserRequestId = jest.fn(() =>
    Promise.resolve("test-request-id")
);

jest.mock("@/lib/database/databaseHandler", () => ({
    clearDb: () => mockClearDb(),
    seedDb: (users: any) => mockSeedDb(users),
    getCachedUsers: jest.fn(() => Promise.resolve([])),
}));

jest.mock("@/lib/database/constants", () => ({
    DB_CACHE_TAG: "test-db-cache-tag",
}));

jest.mock("next/cache", () => ({
    revalidateTag: (tag: string) => mockRevalidateTag(tag),
}));

jest.mock("@/lib/headers/extractUserRequestId", () => ({
    extractUserRequestId: () => mockExtractUserRequestId(),
}));

jest.mock("@/scripts/seed", () => ({
    mockUsers: [
        {
            id: "1",
            username: "test",
            email: "test@example.com",
            password: "password",
        },
    ],
}));

describe("Seed DB API Route", () => {
    beforeEach(() => {
        // Reset mocks before each test
        mockClearDb.mockClear();
        mockSeedDb.mockClear();
        mockRevalidateTag.mockClear();
        mockExtractUserRequestId.mockClear();
    });

    it("should successfully clear and seed the database on POST request", async () => {
        await testApiHandler({
            appHandler,
            url: "/api/seed-db",
            async test({ fetch }) {
                const res = await fetch({ method: "POST" });
                const json = await res.json();

                expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                expect(mockClearDb).toHaveBeenCalledTimes(1);
                expect(mockSeedDb).toHaveBeenCalledTimes(1);
                expect(mockSeedDb).toHaveBeenCalledWith(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: "1",
                            username: "test",
                            email: "test@example.com",
                        }),
                    ])
                );
                expect(mockRevalidateTag).toHaveBeenCalledTimes(1);
                expect(mockRevalidateTag).toHaveBeenCalledWith(
                    "test-db-cache-tag"
                );
                expect(res.status).toBe(200);
                expect(json).toHaveProperty("now");
            },
        });
    });

    it("should return 500 if clearing the database fails", async () => {
        mockClearDb.mockImplementationOnce(() => {
            throw new Error("Failed to clear DB");
        });

        await testApiHandler({
            appHandler,
            url: "/api/seed-db",
            async test({ fetch }) {
                const res = await fetch({ method: "POST" });
                const json = await res.json();

                expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                expect(mockClearDb).toHaveBeenCalledTimes(1);
                expect(mockSeedDb).not.toHaveBeenCalled();
                expect(mockRevalidateTag).not.toHaveBeenCalled();

                expect(res.status).toBe(500);
                expect(json).toEqual({
                    message: "Failed to clear and seed database.",
                });
            },
        });
    });

    it("should return 500 if seeding the database fails", async () => {
        mockSeedDb.mockImplementationOnce(() => {
            throw new Error("Failed to seed DB");
        });

        await testApiHandler({
            appHandler,
            url: "/api/seed-db",
            async test({ fetch }) {
                const res = await fetch({ method: "POST" });
                const json = await res.json();

                expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);

                expect(mockClearDb).toHaveBeenCalledTimes(1);
                expect(mockSeedDb).toHaveBeenCalledTimes(1);
                expect(mockRevalidateTag).not.toHaveBeenCalled();

                expect(res.status).toBe(500);
                expect(json).toEqual({
                    message: "Failed to clear and seed database.",
                });
            },
        });
    });
});
