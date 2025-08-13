import Link from "next/link";
import {
    Accordion,
    AccordionTrigger,
    AccordionItem,
    AccordionContent,
} from "@/components/ui/accordion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
    return (
        <div className="max-w-screen-md md:mx-auto mt-15">
            <Accordion type="multiple" className="w-full flex flex-col gap-3">
                <AccordionItem className="flex flex-col" value="item-1">
                    <AccordionTrigger className="font-extrabold text-brand-700">
                        Routing
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3 text-balance">
                        <Link href="/routes/basic" className="group">
                            <Card className="bg-neutral-100">
                                <CardHeader>
                                    <CardTitle className="text-accent-700 group-hover:underline">
                                        Basic Routing
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-brand-500">
                                        Routing basic URLs.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link
                            href="/routes/dynamic/hello-world"
                            className="group"
                        >
                            <Card className="bg-neutral-100">
                                <CardHeader>
                                    <CardTitle className="text-accent-700 group-hover:underline">
                                        {" "}
                                        Dynamic Routing
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-brand-500">
                                        Routing URL with dynamic segments.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem className="flex flex-col" value="item-2">
                    <AccordionTrigger className="font-extrabold text-brand-700">
                        Rendering and Data Fetching
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3 text-balance">
                        <Link href="/rendering/ssr" className="group">
                            <Card className="bg-neutral-100">
                                <CardHeader>
                                    <CardTitle className="text-accent-700 group-hover:underline">
                                        Server Side Rendering (SSR)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-brand-500">
                                        Content is rendered on the server and
                                        sent to the client as complete HTML.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/rendering/ssg" className="group">
                            <Card className="bg-neutral-100">
                                <CardHeader>
                                    <CardTitle className="text-accent-700 group-hover:underline">
                                        Static Site Generation (SSG)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-brand-500">
                                        HTML is generated at build time and
                                        served from a CDN.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/rendering/isr" className="group">
                            <Card className="bg-neutral-100">
                                <CardHeader>
                                    <CardTitle className="text-accent-700 group-hover:underline">
                                        Incremental Static Regeneration (ISR)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-brand-500">
                                        Static pages can be updated after the
                                        site has been built.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/rendering/csr" className="group">
                            <Card className="bg-neutral-100">
                                <CardHeader>
                                    <CardTitle className="text-accent-700 group-hover:underline">
                                        Client Side Rendering (CSR)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-brand-500">
                                        The browser downloads a minimal HTML
                                        page and JavaScript renders the rest.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem className="flex flex-col" value="item-3">
                    <AccordionTrigger className="font-extrabold text-brand-700">
                        Streaming
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3 text-balance">
                        <Link href="/streaming" className="group">
                            <Card className="bg-neutral-100">
                                <CardHeader>
                                    <CardTitle className="text-accent-700 group-hover:underline">
                                        Streaming
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-brand-500">
                                        Data is sent in chunks and rendered as
                                        it arrives.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem className="flex flex-col" value="item-4">
                    <AccordionTrigger className="font-extrabold text-brand-700">
                        Server Actions
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3 text-balance">
                        <Link href="/server-action" className="group">
                            <Card className="bg-neutral-100">
                                <CardHeader>
                                    <CardTitle className="text-accent-700 group-hover:underline">
                                        Server Action
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-brand-500">
                                        Functions that run on the server and can
                                        be called from client components.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem className="flex flex-col" value="item-5">
                    <AccordionTrigger className="font-extrabold text-brand-700">
                        Route Handlers
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3 text-balance">
                        <Link href="/route-handlers/GET" className="group">
                            <Card className="bg-neutral-100">
                                <CardHeader>
                                    <CardTitle className="text-accent-700 group-hover:underline">
                                        GET Request
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-brand-500">
                                        Handling a GET request with a route
                                        handler.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/route-handlers/POST" className="group">
                            <Card className="bg-neutral-100">
                                <CardHeader>
                                    <CardTitle className="text-accent-700 group-hover:underline">
                                        POST Request
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-brand-500">
                                        Handling a POST request with a route
                                        handler.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem className="flex flex-col" value="item-6">
                    <AccordionTrigger className="font-extrabold text-brand-700">
                        Middleware
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3 text-balance">
                        <Link href="/middleware/ab-testing" className="group">
                            <Card className="bg-neutral-100">
                                <CardHeader>
                                    <CardTitle className="text-accent-700 group-hover:underline">
                                        A/B Testing
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-brand-500">
                                        Using middleware to run A/B tests.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/middleware/log" className="group">
                            <Card className="bg-neutral-100">
                                <CardHeader>
                                    <CardTitle className="text-accent-700 group-hover:underline">
                                        Request Info Logging
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-brand-500">
                                        Using middleware to log information
                                        about incoming requests.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
