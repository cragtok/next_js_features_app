import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
    classNameOverride?: string;
}

const ButtonWrapper = ({ children, classNameOverride, ...rest }: Props) => {
    const defaultStyles = "bg-brand-500 hover:bg-brand-700";
    const mergedStyles = twMerge(clsx(defaultStyles, classNameOverride));
    return (
        <Button className={mergedStyles} {...rest}>
            {children}
        </Button>
    );
};

export default ButtonWrapper;
