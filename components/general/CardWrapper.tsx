import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
    classNameOverride?: string;
    children: React.ReactNode;
}

const CardWrapper = ({ classNameOverride, children, ...rest }: Props) => {
    const defaultStyles =
        "max-w-prose bg-neutral-100 text-center rounded-md pt-5 pb-3 max-[400px]:text-center max-[450px]:text-sm";

    const mergedStyles = cn([defaultStyles, classNameOverride]);
    return (
        <Card className={mergedStyles} {...rest}>
            {children}
        </Card>
    );
};

export default CardWrapper;
