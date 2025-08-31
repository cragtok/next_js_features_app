"use client";

import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionTrigger,
    AccordionItem,
    AccordionContent,
} from "@/components/ui/accordion";
import CardLink from "./CardLink";
import { PageRoute, SubRoute } from "./routesList";
import { pageRoutes } from "./routesList";
import LoadingSpinner from "@/components/general/LoadingSpinner";

const LOCAL_STORAGE_KEY = "accordion-open-items";

const renderRoutes = (pageRoutes: PageRoute[]) => {
    const renderSubRoutes = (subRoutes: SubRoute[]) => {
        return subRoutes.map((subRoute: SubRoute) => (
            <CardLink
                key={crypto.randomUUID()}
                href={subRoute.href}
                title={subRoute.title}
                description={subRoute.description}
            />
        ));
    };

    return pageRoutes.map((pageRoute: PageRoute, idx) => {
        return (
            <AccordionItem
                key={crypto.randomUUID()}
                className="flex flex-col text-left px-2"
                value={`item-${idx + 1}`}
            >
                <AccordionTrigger className="font-extrabold text-brand-700">
                    {pageRoute.route}
                </AccordionTrigger>

                <AccordionContent className="flex flex-col gap-3">
                    {renderSubRoutes(pageRoute.subRoutes)}
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
            {renderRoutes(pageRoutes)}
        </Accordion>
    );
};

export default SiteLinks;
