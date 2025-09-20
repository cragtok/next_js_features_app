import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
    numRows: number;
}

const LoadingSkeleton = ({ numRows }: Props) => {
    return (
        <Card
            className="bg-neutral-100 rounded-md pt-5 pb-3"
            data-test="loading-skeleton"
            data-testid="loading-skeleton"
        >
            <CardContent className="space-y-3">
                {Array.from({ length: numRows }).map((_, index) => (
                    <Skeleton key={index} className="h-4 w-full bg-brand-50" />
                ))}
            </CardContent>
        </Card>
    );
};

export default LoadingSkeleton;
