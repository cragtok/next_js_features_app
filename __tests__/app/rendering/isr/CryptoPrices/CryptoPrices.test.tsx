/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import CryptoPrices from "@/app/rendering/isr/CryptoPrices/CryptoPrices";
import { fetchPrices } from "@/app/rendering/isr/CryptoPrices/apiCall";

jest.mock("@/app/rendering/isr/CryptoPrices/apiCall", () => ({
    fetchPrices: jest.fn(),
}));

jest.mock("@/app/rendering/isr/CryptoPrices/CryptoPricesCard", () => {
    return jest.fn(({ symbol, price }) => (
        <div data-testid="mock-crypto-prices-card">
            <span>{symbol}</span>
            <span>Price: {price}</span>
        </div>
    ));
});

describe("CryptoPrices", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("when data fetching is successful", () => {
        const mockCryptoData = [
            { symbol: "BTC", price: "50000", lastUpdated: "1678886400" },
            { symbol: "ETH", price: "3000", lastUpdated: "1678886400" },
        ];

        beforeEach(() => {
            (fetchPrices as jest.Mock).mockResolvedValue(mockCryptoData);
        });

        it("should render CryptoPricesCard components for each crypto", async () => {
            render(await CryptoPrices());
            expect(
                screen.getAllByTestId("mock-crypto-prices-card")
            ).toHaveLength(mockCryptoData.length);
            expect(screen.getByText("BTC")).toBeInTheDocument();
            expect(
                screen.getByText(`Price: ${mockCryptoData[0].price}`)
            ).toBeInTheDocument();
            expect(screen.getByText("ETH")).toBeInTheDocument();
            expect(
                screen.getByText(`Price: ${mockCryptoData[1].price}`)
            ).toBeInTheDocument();
        });

        it("should display the refresh button", async () => {
            render(await CryptoPrices());
            expect(screen.getByTestId("refresh-button")).toBeInTheDocument();
            expect(screen.getByText("Refresh Page")).toBeInTheDocument();
        });

        it("should not display an error message", async () => {
            render(await CryptoPrices());
            expect(
                screen.queryByText(/Failed to load prices/i)
            ).not.toBeInTheDocument();
        });
    });

    describe("when data fetching fails", () => {
        const mockErrorMessage = "Network error occurred.";

        beforeEach(() => {
            (fetchPrices as jest.Mock).mockRejectedValue(
                new Error(mockErrorMessage)
            );
        });

        it("should display an error message", async () => {
            render(await CryptoPrices());
            expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
        });

        it("should display the refresh button", async () => {
            render(await CryptoPrices());
            expect(screen.getByTestId("refresh-button")).toBeInTheDocument();
            expect(screen.getByText("Refresh Page")).toBeInTheDocument();
        });

        it("should not render any CryptoPricesCard components", async () => {
            render(await CryptoPrices());
            expect(
                screen.queryByTestId("mock-crypto-prices-card")
            ).not.toBeInTheDocument();
        });
    });
});
