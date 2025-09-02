import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardWrapper from "@/components/general/CardWrapper";
import { CryptoData } from "./apiCall";

interface Props {
    cryptoData: CryptoData;
}

const CryptoPricesCard = ({ cryptoData }: Props) => {
    return (
        <CardWrapper>
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
    );
};

export default CryptoPricesCard;
