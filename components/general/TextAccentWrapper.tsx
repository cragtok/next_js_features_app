import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    classNameOverride?: string;
    children: React.ReactNode;
}
const TextAccentWrapper = ({ classNameOverride, children }: Props) => {
    const defaultStyles =
        "text-accent-500 font-semibold whitespace-normal break-words";
    const mergedStyles = twMerge(clsx(defaultStyles, classNameOverride));

    return <span className={mergedStyles}> {children} </span>;
};

export default TextAccentWrapper;
