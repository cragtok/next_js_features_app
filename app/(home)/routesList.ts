import { PageRoute, SubRoute } from "./types";

const routeObjects: Record<string, SubRoute> = {
    "/": {
        title: "Home",
        description: "Routing with static URLs.",
        href: "/",
    },
    "/routing/static": {
        title: "Static Routing",
        description: "Routing with static URLs.",
        href: "/routing/static",
    },
    "/routing/dynamic": {
        title: "Dynamic Routing",
        description: "Routing with dynamic URLs.",
        href: "/routing/dynamic",
    },

    "/routing/dynamic/*": {
        title: "Dynamic Routing",
        description: "Routing with dynamic URLs.",
        href: "",
    },
    "/rendering/ssr": {
        title: "Server Side Rendering (SSR)",
        description:
            "Rendering the page content on the server for each request.",
        href: "/rendering/ssr",
    },
    "/rendering/ssg": {
        title: "Static Site Generation (SSG)",
        description:
            "Rendering page content once on the server during build time.",
        href: "/rendering/ssg",
    },
    "/rendering/isr": {
        title: "Incremental Static Regeneration",
        description:
            "Updating a static page with new content after a certain time period.",
        href: "/rendering/isr",
    },
    "/rendering/csr": {
        title: "Client Side Rendering (CSR)",
        description:
            "Rendering a page on the client via JavaScript and some basic HTML.",
        href: "/rendering/csr",
    },
    "/streaming/loading": {
        title: "Streaming With Loading.tsx",
        href: "/streaming/loading",
        description: "Streaming an entire page with a loading.tsx file.",
    },
    "/streaming/suspense": {
        title: "Streaming With Suspense",
        href: "/streaming/suspense",
        description: "Streaming parts of a page with Suspense boundaries.",
    },
    "/server-actions": {
        title: "Server Actions",
        description:
            "Functions that run on the server and can be called from client components.",
        href: "/server-actions",
    },
    "/route-handlers": {
        title: "Route Handlers",
        href: "/route-handlers",
        description: "Basic CRUD operations via Route Handlers.",
    },
    "/middleware/ab-testing": {
        title: "Middleware A/B Testing",

        description: "Using middleware to run A/B tests.",
        href: "/middleware/ab-testing",
    },
    "/middleware/log": {
        title: "Middleware Request Logging",
        description:
            "Using middleware to log information about incoming requests.",
        href: "/middleware/log",
    },
};

const pageRoutes: PageRoute[] = [
    {
        route: "Routing",
        subRoutes: [
            {
                title: "Static Routing",
                href: "/routing/static",
                description: "Routing with static URLs.",
            },
            {
                title: "Dynamic Routing",
                href: "/routing/dynamic",
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
                    "Rendering the page content on the server for each request.",
            },
            {
                title: "Static Site Generation (SSG)",
                href: "/rendering/ssg",
                description:
                    "Rendering page content once on the server during build time.",
            },
            {
                title: "Incremental Static Regeneration (ISR)",
                href: "/rendering/isr",
                description:
                    "Updating a static page with new content after a certain time period.",
            },
            {
                title: "Client Side Rendering (CSR)",
                href: "/rendering/csr",
                description:
                    "Rendering a page on the client via JavaScript and some basic HTML.",
            },
        ],
    },
    {
        route: "Streaming",
        subRoutes: [
            {
                title: "Streaming With Loading.tsx",
                href: "/streaming/loading",
                description:
                    "Streaming an entire page with a loading.tsx file.",
            },
            {
                title: "Streaming With Suspense",
                href: "/streaming/suspense",
                description:
                    "Streaming parts of a page with Suspense boundaries.",
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
                title: "Route Handlers",
                href: "/route-handlers",
                description: "Basic CRUD operations via Route Handlers.",
            },
        ],
    },
    {
        route: "Middleware",
        subRoutes: [
            {
                title: "Middleware A/B Testing",
                href: "/middleware/ab-testing",
                description: "Using middleware to run A/B tests.",
            },
            {
                title: "Middleware Request Logging",
                href: "/middleware/log",
                description:
                    "Using middleware to log information about incoming requests.",
            },
        ],
    },
];

export { routeObjects, pageRoutes };
