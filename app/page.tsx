import Link from "next/link";
import {
    Accordion,
    AccordionTrigger,
    AccordionItem,
    AccordionContent,
} from "@/components/ui/accordion";

export default function Page() {
    return (
        <div className="max-w-screen-md md:mx-auto mt-15">
            <Accordion type="multiple" className="w-full flex flex-col gap-3">
                <AccordionItem className="flex flex-col" value="item-1">
                    <AccordionTrigger className="font-extrabold text-brand-700">
                        Routing
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <div className="flex gap-2">
                            <Link
                                href="/routes/basic"
                                className="text-accent-700  hover:underline"
                            >
                                Basic Routing
                            </Link>{" "}
                            -{" "}
                            <p className="text-brand-500">
                                A page showing a basic route.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href="/routes/dynamic/hello-world"
                                className="text-accent-teal hover:underline"
                            >
                                Dynamic Routing
                            </Link>{" "}
                            -{" "}
                            <p className="text-brand-500">
                                A page showing dynamic routing.
                            </p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem className="flex flex-col" value="item-2">
                    <AccordionTrigger className="font-extrabold text-brand-700">
                        Rendering and Data Fetching
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <div className="flex gap-2">
                            <Link
                                href="/rendering/ssr"
                                className="text-accent-teal hover:underline"
                            >
                                Server Side Rendering (SSR)
                            </Link>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href="/rendering/ssg"
                                className="text-accent-teal hover:underline"
                            >
                                Static Site Generation (SSG)
                            </Link>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href="/rendering/isr"
                                className="text-accent-teal hover:underline"
                            >
                                Incremental Static Regeneration (ISR)
                            </Link>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href="/rendering/csr"
                                className="text-accent-teal hover:underline"
                            >
                                Client Side Rendering (CSR)
                            </Link>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem className="flex flex-col" value="item-3">
                    <AccordionTrigger className="font-extrabold text-brand-700">
                        Streaming
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <div className="flex gap-2">
                            <Link
                                href="/streaming"
                                className="text-accent-teal hover:underline"
                            >
                                Streaming
                            </Link>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem className="flex flex-col" value="item-4">
                    <AccordionTrigger className="font-extrabold text-brand-700">
                        Server Actions
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <div className="flex gap-2">
                            <Link
                                href="/server-action"
                                className="text-accent-teal hover:underline"
                            >
                                Server Action
                            </Link>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem className="flex flex-col" value="item-5">
                    <AccordionTrigger className="font-extrabold text-brand-700">
                        Route Handlers
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <div className="flex gap-2">
                            <Link
                                href="/route-handlers/GET"
                                className="text-accent-teal hover:underline"
                            >
                                GET Request
                            </Link>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href="/route-handlers/POST"
                                className="text-accent-teal hover:underline"
                            >
                                POST Request
                            </Link>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem className="flex flex-col" value="item-6">
                    <AccordionTrigger className="font-extrabold text-brand-700">
                        Middleware
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <div className="flex gap-2">
                            <Link
                                href="/middleware/ab-testing"
                                className="text-accent-teal hover:underline"
                            >
                                A/B Testing
                            </Link>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href="/middleware/log"
                                className="text-accent-teal hover:underline"
                            >
                                Request Info Logging
                            </Link>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
