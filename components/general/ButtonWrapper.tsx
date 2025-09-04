import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
    classNameOverride?: string;
    buttonColor?: string;
}

const ButtonWrapper = ({
    children,
    classNameOverride,
    buttonColor = "brand",
    ...rest
}: Props) => {
    const defaultStyles = `bg-${buttonColor}-500 hover:bg-${buttonColor}-700`;
    const mergedStyles = cn([defaultStyles, classNameOverride]);
    return (
        <Button className={mergedStyles} {...rest}>
            {children}
        </Button>
    );
};

export default ButtonWrapper;
