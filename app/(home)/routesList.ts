import { PageRoute } from "./types";

export const routeTitles: Record<string, string> = {
    "/routes/static": "Static Routing",
    "/routes/dynamic": "Dynamic Routing",
    "/rendering/ssr": "Server Side Rendering (SSR)",
    "/rendering/ssg": "Static Site Generation (SSG)",
    "/rendering/isr": "Incremental Static Regeneration (ISR)",
    "/rendering/csr": "Client Side Rendering (CSR)",
    "/streaming": "Streaming",
    "/server-actions": "Server Action",
    "/route-handlers/GET": "GET Request",
    "/route-handlers/POST": "POST Request",
    "/middleware/ab-testing": "A/B Testing",
    "/middleware/log": "Request Info Logging",
};

export const pageRoutes: PageRoute[] = [
    {
        route: "Routing",
        subRoutes: [
            {
                title: "Static Routing",
                href: "/routes/static",
                description: "Routing with static URLs.",
            },
            {
                title: "Dynamic Routing",
                href: "/routes/dynamic",
                description: "Routing with dynamic URLs.",
            },
        ],
    },
    {
        route: "Rendering and Data Fetching",
        subRoutes: [
            {
                title: "Server Side Rendering (SSR)",
                href: "/rendering/ssr",
                description:
                    "Content is rendered on the server and sent to the client as complete HTML.",
            },
            {
                title: "Static Site Generation (SSG)",
                href: "/rendering/ssg",
                description:
                    "HTML is generated at build time and served from a CDN.",
            },
            {
                title: "Incremental Static Regeneration (ISR)",
                href: "/rendering/isr",
                description:
                    "Static pages can be updated after the site has been built.",
            },
            {
                title: "Client Side Rendering (CSR)",
                href: "/rendering/csr",
                description:
                    "The browser downloads a minimal HTML page and JavaScript renders the rest.",
            },
        ],
    },
    {
        route: "Streaming",
        subRoutes: [
            {
                title: "Streaming",
                href: "/streaming",
                description:
                    "Data is sent in chunks and rendered as it arrives.",
            },
        ],
    },
    {
        route: "Server Actions",
        subRoutes: [
            {
                title: "Server Actions",
                href: "/server-actions",
                description:
                    "Functions that run on the server and can be called from client components.",
            },
        ],
    },
    {
        route: "Route Handlers",
        subRoutes: [
            {
                title: "GET Request",
                href: "/route-handlers/GET",
                description: "Handling a GET request with a route handler.",
            },
            {
                title: "POST Request",
                href: "/route-handlers/POST",
                description: "Handling a POST request with a route handler.",
            },
        ],
    },
    {
        route: "Middleware",
        subRoutes: [
            {
                title: "A/B Testing",
                href: "/middleware/ab-testing",
                description: "Using middleware to run A/B tests.",
            },
            {
                title: "Request Info Logging",
                href: "/middleware/log",
                description:
                    "Using middleware to log information about incoming requests.",
            },
        ],
    },
];
