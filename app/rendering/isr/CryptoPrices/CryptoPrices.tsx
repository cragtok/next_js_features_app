import { CardContent } from "@/components/ui/card";
import CryptoPricesCard from "./CryptoPricesCard";
import CardWrapper from "@/components/general/CardWrapper";
import RefreshButton from "@/components/general/RefreshButton";
import { CryptoData, fetchPrices } from "./apiCall";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";

async function CryptoPrices() {
    let prices: CryptoData[] | null = null;
    let errorMessage: string | null = null;
    let lastFetchingTime = null;
    try {
        lastFetchingTime = new Date().toLocaleTimeString();
        // Avoid passing request ID for logging purposes to
        // the price fetching function. Otherwise, this route
        // changes from an ISR route to an ordinary SSR route.
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
                <RefreshButton data-testid="refresh-button">
                    Refresh Page
                </RefreshButton>
            </>
        );
    }

    return (
        <>
            {lastFetchingTime && (
                <ParagraphWrapper classNameOverride="text-center max-[400px]:text-center">
                    <TextAccentWrapper>
                        Last Fetch (Server Time): {lastFetchingTime}
                    </TextAccentWrapper>
                </ParagraphWrapper>
            )}
            <div className="flex flex-col">
                {prices.map((cryptoData) => (
                    <CryptoPricesCard
                        key={cryptoData.symbol}
                        symbol={cryptoData.symbol}
                        price={cryptoData.price}
                    />
                ))}
            </div>
            <RefreshButton data-testid="refresh-button">
                Refresh Page
            </RefreshButton>
        </>
    );
}

export default CryptoPrices;
