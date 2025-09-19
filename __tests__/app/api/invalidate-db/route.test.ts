import { testApiHandler } from "next-test-api-route-handler";
import { expect, beforeEach } from "@jest/globals";
import * as appHandler from "@/app/api/invalidate-db/route";

const mockRevalidateTag = jest.fn();
const mockExtractUserRequestId = jest.fn(() =>
    Promise.resolve("test-request-id")
);

jest.mock("next/cache", () => ({
    revalidateTag: (tag: string) => mockRevalidateTag(tag),
}));

jest.mock("@/lib/database/constants", () => ({
    DB_CACHE_TAG: "test-db-cache-tag",
}));

jest.mock("@/lib/headers/extractUserRequestId", () => ({
    extractUserRequestId: () => mockExtractUserRequestId(),
}));

describe("Invalidate DB API Route", () => {
    beforeEach(() => {
        mockRevalidateTag.mockClear();
        mockExtractUserRequestId.mockClear();
    });

    it("should successfully invalidate the database cache on DELETE request", async () => {
        await testApiHandler({
            appHandler,
            async test({ fetch }) {
                const res = await fetch({ method: "DELETE" });
                const json = await res.json();

                expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                expect(mockRevalidateTag).toHaveBeenCalledWith(
                    "test-db-cache-tag"
                );

                expect(res.status).toBe(200);
                expect(json).toHaveProperty("now");
            },
        });
    });

    it("should return 500 if invalidating database cache fails", async () => {
        mockRevalidateTag.mockImplementationOnce(() => {
            throw new Error("Failed to invalidate database cache.");
        });

        await testApiHandler({
            appHandler,
            async test({ fetch }) {
                const res = await fetch({ method: "DELETE" });
                const json = await res.json();

                expect(mockExtractUserRequestId).toHaveBeenCalledTimes(1);
                expect(mockRevalidateTag).toHaveBeenCalledWith(
                    "test-db-cache-tag"
                );

                expect(res.status).toBe(500);
                expect(json).toHaveProperty("message");
            },
        });
    });
});
