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

interface Props {
    routePath: string[];
}

export default function BreadcrumbMenu({ routePath }: Props) {
    return (
        <Breadcrumb className="flex justify-center mt-10">
            <BreadcrumbList>
                {routePath.map((path, idx) => {
                    return idx === routePath.length - 1 ? (
                        <BreadcrumbItem key={crypto.randomUUID()}>
                            <BreadcrumbPage className="font-bold text-accent-500">
                                {path}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    ) : (
                        <Fragment key={crypto.randomUUID()}>
                            <BreadcrumbItem className="font-bold text-brand-500 hover:text-brand-300">
                                <BreadcrumbLink href="/">{path}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="text-brand-300" />
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
