import { PageRoute, SubRoute } from "./types";

export const routeObjects: Record<string, SubRoute> = {
    "/": {
        title: "Home",
        description: "Routing with static URLs.",
        href: "/",
    },
    "/routes/static": {
        title: "Static Routing",
        description: "Routing with static URLs.",
        href: "/routes/static",
    },
    "/routes/dynamic": {
        title: "Dynamic Routing",
        description: "Routing with dynamic URLs.",
        href: "/routes/dynamic",
    },

    "/routes/dynamic/*": {
        title: "Dynamic Routing",
        description: "Routing with dynamic URLs.",
        href: "",
    },
    "/rendering/ssr": {
        title: "Server Side Rendering (SSR)",
        description:
            "Content is rendered on the server and sent to the client as complete HTML.",
        href: "/rendering/ssr",
    },
    "/rendering/ssg": {
        title: "Static Site Generation (SSG)",
        description: "HTML is generated at build time and served from a CDN.",
        href: "/rendering/ssg",
    },
    "/rendering/isr": {
        title: "Incremental Static Regeneration (ISR)",
        description:
            "Static pages can be updated after the site has been built.",
        href: "/rendering/isr",
    },
    "/rendering/csr": {
        title: "Client Side Rendering (CSR)",
        description:
            "The browser downloads a minimal HTML page and JavaScript renders the rest.",

        href: "/rendering/csr",
    },
    "/streaming": {
        title: "Streaming",
        description: "Data is sent in chunks and rendered as it arrives.",
        href: "/streaming",
    },
    "/server-actions": {
        title: "Server Actions",
        description:
            "Functions that run on the server and can be called from client components.",
        href: "/server-actions",
    },

    "/route-handlers/GET": {
        title: "GET Request",
        description: "Handling a GET request with a route handler.",
        href: "/route-handlers/GET",
    },

    "/route-handlers/POST": {
        title: "POST Request",
        description: "Handling a POST request with a route handler.",

        href: "/route-handlers/POST",
    },
    "/middleware/ab-testing": {
        title: "A/B Testing",

        description: "Using middleware to run A/B tests.",
        href: "/middleware/ab-testing",
    },
    "/middleware/log": {
        title: "Request Info Logging",
        description:
            "Using middleware to log information about incoming requests.",
        href: "/middleware/log",
    },
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
