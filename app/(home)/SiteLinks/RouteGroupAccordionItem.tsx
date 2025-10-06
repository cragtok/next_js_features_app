"use client";

import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { AppRoute, RouteGroup } from "@/lib/routesList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface CardLinkProps {
    title: string;
    description: string;
    href: string;
    prefetch: boolean;
}

const CardLink = ({ title, description, href, prefetch }: CardLinkProps) => {
    return (
        <Link href={href} className="group" prefetch={prefetch}>
            <Card className="bg-neutral-100">
                <CardHeader>
                    <CardTitle className="text-accent-700 group-hover:underline">
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-brand-500">{description}</p>
                </CardContent>
            </Card>
        </Link>
    );
};

interface RouteGroupAccordionItemProps {
    pageRoute: RouteGroup;
    idx: number;
}

const RouteGroupAccordionItem = ({
    pageRoute,
    idx,
}: RouteGroupAccordionItemProps) => {
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
                        prefetch={subRoute.disablePrefetch ? false : true}
                    />
                ))}
            </AccordionContent>
        </AccordionItem>
    );
};

export default RouteGroupAccordionItem;
