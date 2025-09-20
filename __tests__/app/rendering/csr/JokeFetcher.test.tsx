/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { expect, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import JokeFetcher from "@/app/rendering/csr/JokeFetcher";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
    useQuery: jest.fn(),
}));

describe("JokeFetcher", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useQuery as jest.Mock).mockReturnValue({
            data: undefined,
            isFetching: false,
            isError: false,
            refetch: jest.fn(),
        });
    });

    describe("initial render", () => {
        it("should display the initial message", () => {
            render(<JokeFetcher />);
            expect(screen.getByTestId("initial-text")).toBeInTheDocument();
            expect(screen.getByText("Click the button to fetch a joke.")).toBeInTheDocument();
        });
        it("should not display loading skeleton", () => {
            render(<JokeFetcher />);
            expect(screen.queryByTestId("loading-skeleton")).not.toBeInTheDocument();
        });
        it("should not display error message", () => {
            render(<JokeFetcher />);
            expect(screen.queryByTestId("joke-error")).not.toBeInTheDocument();
        });
        it("should not display a joke", () => {
            render(<JokeFetcher />);
            expect(screen.queryByTestId("joke-text")).not.toBeInTheDocument();
        });
        it("should have the fetch button enabled", () => {
            render(<JokeFetcher />);
            expect(screen.getByTestId("joke-fetch-button")).toBeEnabled();
        });
    });

    describe("fetching state", () => {
        beforeEach(() => {
            (useQuery as jest.Mock).mockReturnValue({
                data: undefined,
                isFetching: true,
                isError: false,
                refetch: jest.fn(),
            });
        });

        it("should display loading skeleton when fetching", () => {
            render(<JokeFetcher />);
            expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
        });

        it("should have the fetch button disabled when fetching", () => {
            render(<JokeFetcher />);
            expect(screen.getByTestId("joke-fetch-button")).toBeDisabled();
        });
    });

    describe("successful fetch", () => {
        const mockJoke = "This is a test joke.";
        beforeEach(() => {
            (useQuery as jest.Mock).mockReturnValue({
                data: mockJoke,
                isFetching: false,
                isError: false,
                refetch: jest.fn(),
            });
        });

        it("should display the fetched joke", () => {
            render(<JokeFetcher />);
            expect(screen.getByTestId("joke-text")).toBeInTheDocument();
            expect(screen.getByText(mockJoke)).toBeInTheDocument();
        });

        it("should not display loading skeleton", () => {
            render(<JokeFetcher />);
            expect(screen.queryByTestId("loading-skeleton")).not.toBeInTheDocument();
        });

        it("should not display error message", () => {
            render(<JokeFetcher />);
            expect(screen.queryByTestId("joke-error")).not.toBeInTheDocument();
        });

        it("should have the fetch button enabled", () => {
            render(<JokeFetcher />);
            expect(screen.getByTestId("joke-fetch-button")).toBeEnabled();
        });
    });

    describe("error state", () => {
        beforeEach(() => {
            (useQuery as jest.Mock).mockReturnValue({
                data: undefined,
                isFetching: false,
                isError: true,
                refetch: jest.fn(),
            });
        });

        it("should display an error message", () => {
            render(<JokeFetcher />);
            expect(screen.getByTestId("joke-error")).toBeInTheDocument();
            expect(screen.getByText("Failed to load joke. Please try fetching again.")).toBeInTheDocument();
        });

        it("should not display loading skeleton", () => {
            render(<JokeFetcher />);
            expect(screen.queryByTestId("loading-skeleton")).not.toBeInTheDocument();
        });

        it("should not display a joke", () => {
            render(<JokeFetcher />);
            expect(screen.queryByTestId("joke-text")).not.toBeInTheDocument();
        });

        it("should have the fetch button enabled", () => {
            render(<JokeFetcher />);
            expect(screen.getByTestId("joke-fetch-button")).toBeEnabled();
        });
    });

    describe("button interaction", () => {
        it("should call refetch when the fetch button is clicked", async () => {
            const mockRefetch = jest.fn();
            (useQuery as jest.Mock).mockReturnValue({
                data: undefined,
                isFetching: false,
                isError: false,
                refetch: mockRefetch,
            });
            render(<JokeFetcher />);

            const fetchButton = screen.getByTestId("joke-fetch-button");
            await userEvent.click(fetchButton);

            expect(mockRefetch).toHaveBeenCalledTimes(1);
        });
    });
});
