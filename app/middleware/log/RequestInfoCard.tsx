import CardWrapper from "@/components/general/CardWrapper";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    title: string;
    info: string;
    testTitle: string;
}

const RequestInfoCard = ({ title, info, testTitle }: Props) => {
    return (
        <CardWrapper>
            <CardHeader>
                <CardTitle
                    className="text-accent-500 font-semibold"
                    data-test={`card-title-${testTitle}`}
                >
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p
                    className="text-brand-500"
                    data-test={`card-content-${testTitle}`}
                >
                    {info}
                </p>
            </CardContent>
        </CardWrapper>
    );
};

export default RequestInfoCard;
