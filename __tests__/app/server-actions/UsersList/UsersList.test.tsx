/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import UsersList from "@/app/server-actions/UsersList/UsersList";
import { retrieveUsersFromDb } from "@/app/server-actions/databaseCall";
import { USER_LIST_SECTION_ID } from "@/app/server-actions/constants";

jest.mock("@/app/server-actions/databaseCall", () => ({
    retrieveUsersFromDb: jest.fn(),
}));

jest.mock("@/app/server-actions/UsersList/UserCard", () => {
    return jest.fn(({ user, id }) => (
        <div data-testid="mock-user-card" id={id}>
            {user.name}
        </div>
    ));
});

describe("UsersList", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("when data fetching is successful", () => {
        const mockUsers = [
            { id: "1", name: "Alice", email: "alice@example.com" },
            { id: "2", name: "Bob", email: "bob@example.com" },
        ];

        beforeEach(() => {
            (retrieveUsersFromDb as jest.Mock).mockResolvedValue(mockUsers);
        });

        it("should render UserCard components for each user", async () => {
            render(await UsersList());
            expect(screen.getAllByTestId("mock-user-card")).toHaveLength(
                mockUsers.length
            );
            expect(screen.getByText("Alice")).toBeInTheDocument();
            expect(screen.getByText("Bob")).toBeInTheDocument();
        });

        it("should not display 'No Users In Database' message", async () => {
            render(await UsersList());
            expect(
                screen.queryByText("No Users In Database")
            ).not.toBeInTheDocument();
        });

        it("should not display an error message", async () => {
            render(await UsersList());
            expect(
                screen.queryByText(/Error retrieving users/i)
            ).not.toBeInTheDocument();
        });

        it("should set the correct id on the last UserCard", async () => {
            render(await UsersList());
            const userCards = screen.getAllByTestId("mock-user-card");
            expect(userCards[userCards.length - 1]).toHaveAttribute(
                "id",
                USER_LIST_SECTION_ID
            );
        });
    });

    describe("when data fetching is successful but no users are returned", () => {
        beforeEach(() => {
            (retrieveUsersFromDb as jest.Mock).mockResolvedValue([]);
        });

        it("should display 'No Users In Database' message", async () => {
            render(await UsersList());
            expect(
                screen.getByText("No Users In Database")
            ).toBeInTheDocument();
        });

        it("should not render any UserCard components", async () => {
            render(await UsersList());
            expect(screen.queryAllByTestId("mock-user-card")).toHaveLength(0);
        });

        it("should not display an error message", async () => {
            render(await UsersList());
            expect(
                screen.queryByText(/Error retrieving users/i)
            ).not.toBeInTheDocument();
        });
    });

    describe("when data fetching fails", () => {
        const mockErrorMessage = "Failed to retrieve users from database.";

        beforeEach(() => {
            (retrieveUsersFromDb as jest.Mock).mockRejectedValue(
                new Error(mockErrorMessage)
            );
        });

        it("should display an error message", async () => {
            render(await UsersList());
            expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
        });

        it("should not render any UserCard components", async () => {
            render(await UsersList());
            expect(screen.queryAllByTestId("mock-user-card")).toHaveLength(0);
        });

        it("should not display 'No Users In Database' message", async () => {
            render(await UsersList());
            expect(
                screen.queryByText("No Users In Database")
            ).not.toBeInTheDocument();
        });
    });
});
