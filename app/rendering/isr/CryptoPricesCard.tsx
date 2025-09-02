import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchPrices } from "./apiCall";
import CardWrapper from "@/components/general/CardWrapper";

async function CryptoPricesCard() {
    const prices = await fetchPrices();

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
                <CardWrapper key={cryptoData.symbol}>
                    <CardHeader>
                        <CardTitle className="text-accent-700 group-hover:underline">
                            {cryptoData.symbol}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-brand-500 text">
                            <span className="font-semibold">Price:</span> $
                            {cryptoData.price}
                        </p>
                    </CardContent>
                </CardWrapper>
            ))}
        </div>
    );
}

export default CryptoPricesCard;
