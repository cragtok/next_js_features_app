/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import Header from "@/components/general/Header/Header";
import { usePathname } from "next/navigation";
import { routeObjects } from "@/lib/routesList";

jest.mock("next/navigation", () => ({
    usePathname: jest.fn(),
}));

jest.mock("@/components/general/Header/BreadcrumbMenu", () => {
    return jest.fn(({ routePath }) => (
        <div data-testid="mock-breadcrumb-menu">
            {routePath.map((route: any) => route.title).join(" > ")}
        </div>
    ));
});

describe("Header", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render the Vercel logo on the home page", () => {
        (usePathname as jest.Mock).mockReturnValue("/");
        render(<Header />);
        expect(screen.getByAltText("logo")).toBeInTheDocument();
        expect(screen.getByAltText("logo")).toHaveAttribute(
            "src",
            "/vercel.svg"
        );
        expect(
            screen.queryByTestId("mock-breadcrumb-menu")
        ).not.toBeInTheDocument();
    });

    it("should render BreadcrumbMenu for a static route", () => {
        (usePathname as jest.Mock).mockReturnValue("/rendering/ssr");
        render(<Header />);
        expect(screen.queryByAltText("logo")).not.toBeInTheDocument();
        expect(screen.getByTestId("mock-breadcrumb-menu")).toBeInTheDocument();
        expect(screen.getByTestId("mock-breadcrumb-menu")).toHaveTextContent(
            `${routeObjects["/"].title} > ${routeObjects["/rendering/ssr"].title}`
        );
    });

    it("should render BreadcrumbMenu for a dynamic route", () => {
        const dynamicPath = "/routing/dynamic/my-dynamic-page";
        (usePathname as jest.Mock).mockReturnValue(dynamicPath);
        render(<Header />);
        expect(screen.queryByAltText("logo")).not.toBeInTheDocument();
        expect(screen.getByTestId("mock-breadcrumb-menu")).toBeInTheDocument();
        expect(screen.getByTestId("mock-breadcrumb-menu")).toHaveTextContent(
            `${routeObjects["/"].title} > ${routeObjects["/routing/dynamic"].title} > my-dynamic-page`
        );
    });

    it("should not render BreadcrumbMenu for an invalid route", () => {
        (usePathname as jest.Mock).mockReturnValue("/non-existent-route");
        render(<Header />);
        expect(screen.queryByAltText("logo")).not.toBeInTheDocument();
        expect(
            screen.queryByTestId("mock-breadcrumb-menu")
        ).not.toBeInTheDocument();
    });
});
