import CardWrapper from "@/components/general/CardWrapper";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    title: string;
    info: string;
}

const RequestInfoCard = ({ title, info }: Props) => {
    return (
        <CardWrapper>
            <CardHeader>
                <CardTitle className="text-accent-500 font-semibold">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-brand-500">{info}</p>
            </CardContent>
        </CardWrapper>
    );
};

export default RequestInfoCard;
