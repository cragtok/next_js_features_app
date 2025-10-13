import { cn } from "@/lib/utils";
import React from "react";

interface Props {
    classNameOverride?: string;
    children: React.ReactNode;
}
const ParagraphWrapper = ({ classNameOverride, children }: Props) => {
    const defaultStyles =
        "font-normal text-brand-500 max-w-prose max-[400px]:text-left max-[450px]:text-sm text-justify leading-8 text-pretty";
    const mergedStyles = cn([defaultStyles, classNameOverride]);
    return <p className={mergedStyles}>{children}</p>;
};

export default ParagraphWrapper;
