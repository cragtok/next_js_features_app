import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    classNameOverride?: string;
    children: React.ReactNode;
}
const ParagraphWrapper = ({ classNameOverride, children }: Props) => {
    const defaultStyles =
        "text-brand-500 max-w-prose max-[410px]:text-center text-justify";
    const mergedStyles = twMerge(clsx(defaultStyles, classNameOverride));
    return <p className={mergedStyles}>{children}</p>;
};

export default ParagraphWrapper;
