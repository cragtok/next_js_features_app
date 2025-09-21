/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import QuoteCard from "@/app/rendering/ssr/QuoteCard";
import { fetchQuote } from "@/app/rendering/ssr/apiCall";
import { extractUserRequestId } from "@/lib/headers/extractUserRequestId";

jest.mock("@/app/rendering/ssr/apiCall", () => ({
    fetchQuote: jest.fn(),
}));

jest.mock("@/lib/headers/extractUserRequestId", () => ({
    extractUserRequestId: jest.fn(),
}));

describe("QuoteCard", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("when quote fetching is successful", () => {
        const mockQuoteData = {
            quote: "Test quote content.",
            author: "Test Author",
        };

        beforeEach(() => {
            (fetchQuote as jest.Mock).mockResolvedValue(mockQuoteData);
        });

        it("should display the quote and author", async () => {
            render(await QuoteCard());
            expect(screen.getByTestId("quote")).toHaveTextContent(
                `"${mockQuoteData.quote}"`
            );
            expect(screen.getByTestId("author")).toHaveTextContent(
                `— ${mockQuoteData.author}`
            );
        });

        it("should not display an error message", async () => {
            render(await QuoteCard());
            expect(
                screen.queryByTestId("quote-error-message")
            ).not.toBeInTheDocument();
        });

        it("should display the refresh button", async () => {
            render(await QuoteCard());
            expect(screen.getByTestId("refresh-button")).toBeInTheDocument();
            expect(screen.getByText("Refresh Page")).toBeInTheDocument();
        });
    });

    describe("when quote fetching fails", () => {
        const mockErrorMessage = "Failed to fetch quote.";

        beforeEach(() => {
            (fetchQuote as jest.Mock).mockRejectedValue(
                new Error(mockErrorMessage)
            );
        });

        it("should display an error message", async () => {
            render(await QuoteCard());
            expect(screen.getByTestId("quote-error-message")).toHaveTextContent(
                mockErrorMessage
            );
        });

        it("should not display the quote or author", async () => {
            render(await QuoteCard());
            expect(screen.queryByTestId("quote")).not.toBeInTheDocument();
            expect(screen.queryByTestId("author")).not.toBeInTheDocument();
        });

        it("should display the refresh button", async () => {
            render(await QuoteCard());
            expect(screen.getByTestId("refresh-button")).toBeInTheDocument();
            expect(screen.getByText("Refresh Page")).toBeInTheDocument();
        });
    });

    describe("API call interactions", () => {
        const mockRequestId = "another-test-request-id";
        const mockQuoteData = {
            quote: "Another test quote.",
            author: "Another Author",
        };

        beforeEach(() => {
            (extractUserRequestId as jest.Mock).mockResolvedValue(
                mockRequestId
            );
            (fetchQuote as jest.Mock).mockResolvedValue(mockQuoteData);
        });

        it("should call extractUserRequestId and fetchQuote", async () => {
            render(await QuoteCard());

            expect(extractUserRequestId).toHaveBeenCalledTimes(1);
            expect(fetchQuote).toHaveBeenCalledTimes(1);
            expect(fetchQuote).toHaveBeenCalledWith(mockRequestId);
        });
    });
});
