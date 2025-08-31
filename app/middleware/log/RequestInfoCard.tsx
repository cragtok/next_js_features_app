import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    title: string;
    info: string;
}

const RequestInfoCard = ({ title, info }: Props) => {
    return (
        <Card className="bg-neutral-100 rounded-md pt-5 pb-3">
            <CardHeader>
                <CardTitle className="text-accent-500 font-semibold">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-brand-500">{info}</p>
            </CardContent>
        </Card>
    );
};

export default RequestInfoCard;
