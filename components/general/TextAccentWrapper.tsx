import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentPropsWithRef<"span"> {
    classNameOverride?: string;
    children: React.ReactNode;
}
const TextAccentWrapper = ({ classNameOverride, children, ...rest }: Props) => {
    const defaultStyles = "text-accent-500 font-semibold";
    const mergedStyles = cn([defaultStyles, classNameOverride]);

    return (
        <span className={mergedStyles} {...rest}>
            {children}
        </span>
    );
};

export default TextAccentWrapper;
