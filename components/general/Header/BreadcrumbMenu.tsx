"use client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { AppRoute } from "@/lib/routesList";
import { ChevronDown, ChevronRight } from "lucide-react";
import useSmallScreenWidthObserver from "./useSmallScreenWidthObserver";

const FLEX_BREAKPOINT_WIDTH = 280;
const MAX_URL_LENGTH = 42;

const trimExcessURL = (url: string) =>
    url.length < MAX_URL_LENGTH
        ? url
        : `${url.substring(0, MAX_URL_LENGTH)}...`;

interface Props {
    routePath: AppRoute[];
}

const BreadcrumbMenu = ({ routePath }: Props) => {
    const { isSmall, ref } = useSmallScreenWidthObserver(FLEX_BREAKPOINT_WIDTH);

    const breadcrumbListStyles = `${isSmall ? "flex flex-col justify-center text-xs items-center gap-y-2" : "flex justify-center items-center"}`;

    return (
        <Breadcrumb
            ref={ref}
            className="flex justify-center mt-10 text-balance"
        >
            <BreadcrumbList className={breadcrumbListStyles}>
                {routePath.map((pathObj, idx) => {
                    if (idx === routePath.length - 1 || !pathObj.href) {
                        return (
                            <BreadcrumbItem key={crypto.randomUUID()}>
                                <BreadcrumbPage className="font-bold text-accent-500 wrap-anywhere text-center">
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
