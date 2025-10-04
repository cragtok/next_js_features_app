import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardWrapper from "@/components/general/CardWrapper";

interface Props {
    symbol: string;
    price: string;
}

const CryptoPricesCard = ({ symbol, price }: Props) => {
    return (
        <CardWrapper>
            <CardHeader>
                <CardTitle className="text-accent-700 group-hover:underline">
                    {symbol}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-brand-500 text">
                    <span className="font-semibold">Price:</span>{" "}
                    <span data-testid="crypto-price">${price}</span>
                </p>
            </CardContent>
        </CardWrapper>
    );
};

export default CryptoPricesCard;
