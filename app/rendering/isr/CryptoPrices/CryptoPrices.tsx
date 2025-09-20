import { CardContent } from "@/components/ui/card";
import CryptoPricesCard from "./CryptoPricesCard";
import CardWrapper from "@/components/general/CardWrapper";
import RefreshButton from "@/components/general/RefreshButton";
import { CryptoData, fetchPrices } from "./apiCall";

async function CryptoPrices() {
    let prices: CryptoData[] | null = null;
    let errorMessage: string | null = null;

    try {
        prices = await fetchPrices();
    } catch (error) {
        console.error(error);
        errorMessage = (error as Error).message || "Failed to load prices.";
    }

    if (!prices) {
        return (
            <>
                <CardWrapper>
                    <CardContent>
                        <p className="text-status-danger-500 font-semibold">
                            {errorMessage}
                        </p>
                    </CardContent>
                </CardWrapper>
                <RefreshButton
                    data-test="refresh-button"
                    data-testid="refresh-button"
                >
                    Refresh Page
                </RefreshButton>
            </>
        );
    }

    return (
        <>
            <div className="flex flex-col">
                {prices.map((cryptoData) => (
                    <CryptoPricesCard
                        key={cryptoData.symbol}
                        cryptoData={cryptoData}
                    />
                ))}
            </div>
            <RefreshButton
                data-test="refresh-button"
                data-testid="refresh-button"
            >
                Refresh Page
            </RefreshButton>
        </>
    );
}

export default CryptoPrices;
