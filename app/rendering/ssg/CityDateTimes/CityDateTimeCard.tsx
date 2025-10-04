import CardWrapper from "@/components/general/CardWrapper";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    city: string;
    date: string;
    time: string;
}

const CityDateTimeCard = ({ city, date, time }: Props) => {
    return (
        <CardWrapper>
            <CardHeader>
                <CardTitle className="text-accent-700 group-hover:underline">
                    {city}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-brand-500 text">
                    <span className="font-semibold">Date:</span> {date}
                </p>
                <p className="text-brand-500">
                    <span className="font-semibold">Time:</span> {time}
                </p>
            </CardContent>
        </CardWrapper>
    );
};

export default CityDateTimeCard;
