import CardWrapper from "@/components/general/CardWrapper";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CityDateTime } from "./apiCall";

interface Props {
    cityDateTime: CityDateTime;
}

const CityDateTimeCard = ({ cityDateTime }: Props) => {
    return (
        <CardWrapper>
            <CardHeader>
                <CardTitle className="text-accent-700 group-hover:underline">
                    {cityDateTime.city}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-brand-500 text">
                    <span className="font-semibold">Date:</span>{" "}
                    {cityDateTime.date}
                </p>
                <p className="text-brand-500">
                    <span className="font-semibold">Time:</span>{" "}
                    {cityDateTime.time}
                </p>
            </CardContent>
        </CardWrapper>
    );
};

export default CityDateTimeCard;
