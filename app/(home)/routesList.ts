import { PageRoute } from "./types";

const pageRoutes: PageRoute[] = [
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
                title: "Server Action",
                href: "/server-action",
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

export default pageRoutes;
