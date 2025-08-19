import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CryptoData, oldPrices } from "./apiCall";

interface CryptoPricesCardProps {
    prices: CryptoData[];
}

export default function CryptoPricesCard({ prices }: CryptoPricesCardProps) {
    return (
        <>
            {prices.length ? (
                <div className="flex flex-col gap-4">
                    {prices.map((cryptoData) => (
                        <Card
                            key={cryptoData.symbol}
                            className="bg-neutral-100"
                        >
                            <CardHeader>
                                <CardTitle className="text-accent-700 group-hover:underline">
                                    {cryptoData.symbol}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-brand-500 text">
                                    <span className="font-semibold">
                                        Price:
                                    </span>{" "}
                                    $
                                    {cryptoData.price ||
                                        oldPrices[cryptoData.symbol]}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="bg-neutral-100">
                    <CardContent>
                        <p className="text-status-danger-500 font-semibold">
                            Failed to load prices. Please try refreshing the
                            page.
                        </p>
                    </CardContent>
                </Card>
            )}
        </>
    );
}
