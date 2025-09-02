import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import React from "react";

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
    const mergedStyles = twMerge(clsx(defaultStyles, classNameOverride));
    return (
        <Button className={mergedStyles} {...rest}>
            {children}
        </Button>
    );
};

export default ButtonWrapper;
