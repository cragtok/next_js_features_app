import { CardContent } from "@/components/ui/card";
import { fetchPrices, CryptoData } from "./apiCall";
import CryptoPricesCard from "./CryptoPricesCard";
import CardWrapper from "@/components/general/CardWrapper";

async function CryptoPrices() {
    const prices: CryptoData[] = await fetchPrices();

    if (!prices.length) {
        return (
            <CardWrapper>
                <CardContent>
                    <p className="text-status-danger-500 font-semibold">
                        Failed to load prices. Please try refreshing the page.
                    </p>
                </CardContent>
            </CardWrapper>
        );
    }

    return (
        <div className="flex flex-col">
            {prices.map((cryptoData) => (
                <CryptoPricesCard
                    key={cryptoData.symbol}
                    cryptoData={cryptoData}
                />
            ))}
        </div>
    );
}

export default CryptoPrices;
