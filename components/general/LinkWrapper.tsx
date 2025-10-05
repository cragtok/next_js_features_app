import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props extends React.ComponentPropsWithRef<"a"> {
    classNameOverride?: string;
    children: React.ReactNode;
    href: string;
}
const LinkWrapper = ({ classNameOverride, children, href, ...rest }: Props) => {
    const defaultStyles =
        "text-accent-500 font-semibold whitespace-normal break-words inline-block underline hover:text-accent-700";
    const mergedStyles = cn([defaultStyles, classNameOverride]);
    return (
        <Link href={href} className={mergedStyles} {...rest}>
            {children}
        </Link>
    );
};

export default LinkWrapper;
