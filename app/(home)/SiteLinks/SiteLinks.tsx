"use client";

import { Accordion } from "@/components/ui/accordion";
import { RouteGroup } from "@/lib/routesList";
import { pageRoutes } from "@/lib/routesList";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import RouteGroupAccordionItem from "./RouteGroupAccordionItem";
import useSessionPersistedOpenItems from "./useSessionPersistedOpenItems";

const LOCAL_STORAGE_KEY = "accordion-open-items";

const SiteLinks = () => {
    const { openItems, setOpenItems, isLoading } =
        useSessionPersistedOpenItems(LOCAL_STORAGE_KEY);

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
