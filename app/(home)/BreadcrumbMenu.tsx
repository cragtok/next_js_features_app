"use client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment, useEffect, useRef, useState } from "react";
import { SubRoute } from "./types";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Props {
    routePath: SubRoute[];
}

const FLEX_BREAKPOINT_WIDTH = 280;
const MAX_URL_LENGTH = 36;

const BreadcrumbMenu = ({ routePath }: Props) => {
    const [isSmall, setIsSmall] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const trimExcessURL = (url: string) =>
        url.length < MAX_URL_LENGTH
            ? url
            : `${url.substring(0, MAX_URL_LENGTH)}...`;

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width } = entry.contentRect;
                if (width < FLEX_BREAKPOINT_WIDTH) {
                    setIsSmall(true);
                } else {
                    setIsSmall(false);
                }
            }
        });

        const currentRef = ref.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <Breadcrumb
            ref={ref}
            className="flex justify-center mt-10 text-balance"
        >
            <BreadcrumbList
                className={`${isSmall ? "flex flex-col justify-center text-xs items-center gap-y-2" : "flex justify-center items-center"}`}
            >
                {routePath.map((pathObj, idx) => {
                    if (idx === routePath.length - 1 || !pathObj.href) {
                        return (
                            <BreadcrumbItem key={crypto.randomUUID()}>
                                <BreadcrumbPage className="font-bold text-accent-500 wrap-anywhere">
                                    {trimExcessURL(pathObj.title)}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        );
                    }

                    return (
                        <Fragment key={crypto.randomUUID()}>
                            <BreadcrumbItem className="font-bold text-brand-500 hover:text-brand-300">
                                <BreadcrumbLink href={pathObj.href}>
                                    {trimExcessURL(pathObj.title)}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="text-brand-300">
                                {isSmall ? <ChevronDown /> : <ChevronRight />}
                            </BreadcrumbSeparator>
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbMenu;
