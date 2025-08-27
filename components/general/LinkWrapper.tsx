import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    classNameOverride?: string;
    children: React.ReactNode;
    href: string;
}
const LinkWrapper = ({ classNameOverride, children, href }: Props) => {
    const defaultStyles =
        "text-accent-500 font-semibold whitespace-normal break-words inline-block underline hover:text-accent-700";
    const mergedStyles = twMerge(clsx(defaultStyles, classNameOverride));
    return (
        <Link href={href} className={mergedStyles}>
            {children}
        </Link>
    );
};

export default LinkWrapper;
