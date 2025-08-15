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
import { SubRoute } from "./types";

interface Props {
    routePath: SubRoute[];
}

export default function BreadcrumbMenu({ routePath }: Props) {
    return (
        <Breadcrumb className="flex justify-center mt-10">
            <BreadcrumbList>
                {routePath.map((pathObj, idx) => {
                    if (idx === routePath.length - 1 || !pathObj.href) {
                        return (
                            <BreadcrumbItem key={crypto.randomUUID()}>
                                <BreadcrumbPage className="font-bold text-accent-500">
                                    {pathObj.title}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        );
                    }

                    return (
                        <Fragment key={crypto.randomUUID()}>
                            <BreadcrumbItem className="font-bold text-brand-500 hover:text-brand-300">
                                <BreadcrumbLink href={pathObj.href}>
                                    {pathObj.title}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="text-brand-300" />
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
