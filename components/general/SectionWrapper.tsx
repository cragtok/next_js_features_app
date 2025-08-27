import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    children: React.ReactNode;
    sectionTitle?: string;
    classNameOverride?: string;
}

const SectionWrapper = ({
    children,
    sectionTitle,
    classNameOverride,
}: Props) => {
    const defaultStyles = "flex flex-col gap-8";
    const mergedStyles = twMerge(clsx(defaultStyles, classNameOverride));
    return (
        <section className={mergedStyles}>
            {sectionTitle && (
                <h2 className="text-brand-700 font-extrabold text-2xl text-center">
                    {sectionTitle}
                </h2>
            )}
            {children}
        </section>
    );
};

export default SectionWrapper;
