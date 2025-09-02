import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CityDateTime {
    city: string;
    date: string;
    time: string;
}

interface Props {
    cityDateTime: CityDateTime;
}

const CityDateTimeCard = ({ cityDateTime }: Props) => {
    return (
        <Card
            key={crypto.randomUUID()}
            className="max-w-prose bg-neutral-100 text-center rounded-md pt-5 pb-3 max-[400px]:text-center max-[450px]:text-sm"
        >
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
        </Card>
    );
};

export default CityDateTimeCard;
