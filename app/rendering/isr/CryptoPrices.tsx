import { CardContent } from "@/components/ui/card";
import { fetchPrices } from "./apiCall";
import CryptoPricesCard from "./CryptoPricesCard";
import CardWrapper from "@/components/general/CardWrapper";
import RefreshButton from "@/components/general/RefreshButton";

async function CryptoPrices() {
    const prices = await fetchPrices();

    if (!prices.length) {
        return (
            <>
                <CardWrapper>
                    <CardContent>
                        <p className="text-status-danger-500 font-semibold">
                            Failed to load prices. Please try refreshing the
                            page.
                        </p>
                    </CardContent>
                </CardWrapper>
                <RefreshButton>Refresh Page</RefreshButton>
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
            <RefreshButton>Refresh Page</RefreshButton>
        </>
    );
}

export default CryptoPrices;
