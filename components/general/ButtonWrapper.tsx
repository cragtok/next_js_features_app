import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
    classNameOverride?: string;
    buttonColor?: string;
}

// Use to deal with Tailwind dynamic color issues which sometimes occur with dynamic class names
const buttonColorMap: Record<
    string,
    {
        bg: string;
        hoverBg: string;
        focusRing: string;
        activeBg: string;
        disabledBg: string;
        disabledText: string;
    }
> = {
    brand: {
        bg: "bg-brand-500",
        hoverBg: "hover:bg-brand-700",
        focusRing: "focus-visible:ring-brand-900",
        activeBg: "active:bg-brand-900",
        disabledBg: "disabled:bg-brand-500",
        disabledText: "disabled:text-brand-100",
    },
    "status-danger": {
        bg: "bg-status-danger-500",
        hoverBg: "hover:bg-status-danger-700",
        focusRing: "focus-visible:ring-status-danger-900",
        activeBg: "active:bg-status-danger-900",
        disabledBg: "disabled:bg-status-danger-500",
        disabledText: "disabled:text-status-danger-100",
    },
    "status-warning": {
        bg: "bg-status-warning-500",
        hoverBg: "hover:bg-status-warning-700",
        focusRing: "focus-visible:ring-status-warning-900",
        activeBg: "active:bg-status-warning-900",
        disabledBg: "disabled:bg-status-warning-500",
        disabledText: "disabled:text-status-warning-100",
    },
};

const ButtonWrapper = ({
    children,
    classNameOverride,
    buttonColor = "brand",
    ...rest
}: Props) => {
    const colors = buttonColorMap[buttonColor] || buttonColorMap.brand;
    const defaultStyles = cn(
        colors.bg,
        colors.hoverBg,
        colors.focusRing,
        colors.activeBg,
        colors.disabledBg,
        colors.disabledText
    );
    const mergedStyles = cn([defaultStyles, classNameOverride]);
    return (
        <Button className={mergedStyles} {...rest}>
            {children}
        </Button>
    );
};

export default ButtonWrapper;
