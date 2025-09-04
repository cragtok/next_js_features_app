import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
    classNameOverride?: string;
    buttonColor?: string;
}

// Use to deal with Tailwind dynamic color issues which sometimes occur with dynamic class names
const buttonColorMap: Record<string, { bg: string; hoverBg: string }> = {
    brand: { bg: "bg-brand-500", hoverBg: "hover:bg-brand-700" },
    red: { bg: "bg-red-500", hoverBg: "hover:bg-red-700" },
    blue: { bg: "bg-blue-500", hoverBg: "hover:bg-blue-700" },
    green: { bg: "bg-green-500", hoverBg: "hover:bg-green-700" },
    "status-danger": {
        bg: "bg-status-danger-500",
        hoverBg: "hover:bg-status-danger-700",
    },
    "status-warning": {
        bg: "bg-status-warning-500",
        hoverBg: "hover:bg-status-warning-700",
    },
};

const ButtonWrapper = ({
    children,
    classNameOverride,
    buttonColor = "brand",
    ...rest
}: Props) => {
    const colors = buttonColorMap[buttonColor] || buttonColorMap.brand;
    const defaultStyles = `${colors.bg} ${colors.hoverBg}`;
    const mergedStyles = cn([defaultStyles, classNameOverride]);
    return (
        <Button className={mergedStyles} {...rest}>
            {children}
        </Button>
    );
};

export default ButtonWrapper;
