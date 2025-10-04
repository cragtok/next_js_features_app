"use client";

import { useEffect, useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import { RouteGroup } from "@/lib/routesList";
import { pageRoutes } from "@/lib/routesList";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import RouteGroupAccordionItem from "./RouteGroupAccordionItem";

const LOCAL_STORAGE_KEY = "accordion-open-items";

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
            {pageRoutes.map((pageRoute: RouteGroup, idx) => (
                <RouteGroupAccordionItem
                    key={crypto.randomUUID()}
                    pageRoute={pageRoute}
                    idx={idx}
                />
            ))}
        </Accordion>
    );
};

export default SiteLinks;
