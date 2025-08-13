import {
    Accordion,
    AccordionTrigger,
    AccordionItem,
    AccordionContent,
} from "@/components/ui/accordion";
import CardLink from "./CardLink";
import { PageRoute, SubRoute } from "./types";
import pageRoutes from "./routesList";

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

const renderRoutes = (pageRoutes: PageRoute[]) => {
    return pageRoutes.map((pageRoute: PageRoute, idx) => {
        return (
            <AccordionItem
                key={crypto.randomUUID()}
                className="flex flex-col"
                value={`item-${idx + 1}`}
            >
                <AccordionTrigger className="font-extrabold text-brand-700">
                    {pageRoute.route}
                </AccordionTrigger>

                <AccordionContent className="flex flex-col gap-3 text-balance">
                    {renderSubRoutes(pageRoute.subRoutes)}
                </AccordionContent>
            </AccordionItem>
        );
    });
};

export default function SiteLinks() {
    return (
        <>
            <Accordion type="multiple" className="w-full flex flex-col gap-3">
                {renderRoutes(pageRoutes)}
            </Accordion>
        </>
    );
}
