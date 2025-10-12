/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { expect, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import DynamicRouteForm from "@/app/routing/dynamic/DynamicRouteForm";
import { useRouter } from "next/navigation";
import { MAX_SLUG_LENGTH } from "@/lib/utils";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("DynamicRouteForm", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
        jest.clearAllMocks();
    });

    describe("rendering", () => {
        it("should render the input field and the navigate button", () => {
            render(<DynamicRouteForm baseRoute="/test-base-route" />);

            expect(
                screen.getByPlaceholderText("Enter a dynamic route segment")
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", { name: /navigate/i })
            ).toBeInTheDocument();
        });
    });

    describe("input handling", () => {
        it("should update the input value when typed", async () => {
            render(<DynamicRouteForm baseRoute="/test-base-route" />);
            const input = screen.getByPlaceholderText(
                "Enter a dynamic route segment"
            );
            const testValue = "hello-world";

            await userEvent.type(input, testValue);
            expect(input).toHaveValue(testValue);
        });

        it("should clear error messages when input changes after an error", async () => {
            render(<DynamicRouteForm baseRoute="/test-base-route" />);
            const input = screen.getByPlaceholderText(
                "Enter a dynamic route segment"
            );
            const navigateButton = screen.getByRole("button", {
                name: /navigate/i,
            });

            await userEvent.click(navigateButton);
            expect(screen.getByText("URL is empty")).toBeInTheDocument();

            await userEvent.type(input, "valid-route");
            expect(screen.queryByText("URL is empty")).not.toBeInTheDocument();
        });
    });

    describe("form submission - valid cases", () => {
        it("should navigate to the correct dynamic route with a valid input", async () => {
            const baseRoute = "/test-base-route";
            render(<DynamicRouteForm baseRoute={baseRoute} />);
            const input = screen.getByPlaceholderText(
                "Enter a dynamic route segment"
            );
            const navigateButton = screen.getByRole("button", {
                name: /navigate/i,
            });
            const testValue = "valid-segment";

            await userEvent.type(input, testValue);
            await userEvent.click(navigateButton);

            expect(mockPush).toHaveBeenCalledTimes(1);
            expect(mockPush).toHaveBeenCalledWith(`${baseRoute}/${testValue}`);
        });
    });

    describe("form submission - invalid cases (error handling)", () => {
        it("should display an error message if the route segment is too long", async () => {
            render(<DynamicRouteForm baseRoute="/test-base-route" />);
            const input = screen.getByPlaceholderText(
                "Enter a dynamic route segment"
            );
            const navigateButton = screen.getByRole("button", {
                name: /navigate/i,
            });

            const longValue = "a".repeat(MAX_SLUG_LENGTH + 1);
            await userEvent.type(input, longValue);
            await userEvent.click(navigateButton);

            expect(
                screen.getByText(
                    `Route segment cannot have more than ${MAX_SLUG_LENGTH} characters`
                )
            ).toBeInTheDocument();
            expect(mockPush).not.toHaveBeenCalled();
        });

        it("should display an error message if the input is empty", async () => {
            render(<DynamicRouteForm baseRoute="/test-base-route" />);
            const navigateButton = screen.getByRole("button", {
                name: /navigate/i,
            });

            await userEvent.click(navigateButton);

            expect(screen.getByText("URL is empty")).toBeInTheDocument();
            expect(mockPush).not.toHaveBeenCalled();
        });

        it("should display an error message if the input contains an external URL", async () => {
            render(<DynamicRouteForm baseRoute="/test-base-route" />);
            const input = screen.getByPlaceholderText(
                "Enter a dynamic route segment"
            );
            const navigateButton = screen.getByRole("button", {
                name: /navigate/i,
            });

            await userEvent.type(input, "https://example.com");
            await userEvent.click(navigateButton);

            expect(
                screen.getByText(
                    "External URLs are not allowed in dynamic route segments."
                )
            ).toBeInTheDocument();
            expect(mockPush).not.toHaveBeenCalled();
        });

        it("should display an error message if the input contains invalid characters", async () => {
            render(<DynamicRouteForm baseRoute="/test-base-route" />);
            const input = screen.getByPlaceholderText(
                "Enter a dynamic route segment"
            );
            const navigateButton = screen.getByRole("button", {
                name: /navigate/i,
            });

            await userEvent.type(input, "invalid!@#route");
            await userEvent.click(navigateButton);

            expect(
                screen.getByText(
                    "Only alphanumeric, spaces, hyphens, underscores, and forward slashes are allowed."
                )
            ).toBeInTheDocument();
            expect(mockPush).not.toHaveBeenCalled();
        });
    });
});
