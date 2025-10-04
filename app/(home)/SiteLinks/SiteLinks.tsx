"use client";

import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionTrigger,
    AccordionItem,
    AccordionContent,
} from "@/components/ui/accordion";
import CardLink from "./CardLink";
import { RouteGroup, AppRoute } from "@/lib/routesList";
import { pageRoutes } from "@/lib/routesList";
import LoadingSpinner from "@/components/general/LoadingSpinner";

const LOCAL_STORAGE_KEY = "accordion-open-items";

const renderRouteGroups = (pageRoutes: RouteGroup[]) => {
    return pageRoutes.map((pageRoute: RouteGroup, idx) => {
        return (
            <AccordionItem
                key={crypto.randomUUID()}
                className="flex flex-col text-left px-2"
                value={`item-${idx + 1}`}
            >
                <AccordionTrigger className="font-extrabold text-brand-700">
                    {pageRoute.group}
                </AccordionTrigger>

                <AccordionContent className="flex flex-col gap-3">
                    {pageRoute.routes.map((subRoute: AppRoute) => (
                        <CardLink
                            key={crypto.randomUUID()}
                            href={subRoute.href}
                            title={subRoute.title}
                            description={subRoute.description}
                        />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    });
};

const SiteLinks = () => {
    const [openItems, setOpenItems] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedState = sessionStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedState) {
                setOpenItems(JSON.parse(savedState));
            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && !isLoading) {
            sessionStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify(openItems)
            );
        }
    }, [openItems, isLoading]);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center text-center text-brand-500">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <Accordion
            type="multiple"
            className="w-full flex flex-col gap-3"
            value={openItems}
            onValueChange={setOpenItems}
        >
            {renderRouteGroups(pageRoutes)}
        </Accordion>
    );
};

export default SiteLinks;
