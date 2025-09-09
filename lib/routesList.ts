interface SubRoute {
    title: string;
    href: string;
    description: string;
}

interface PageRoute {
    route: string;
    subRoutes: SubRoute[];
}

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
                title: "Server-Side Rendering (SSR)",
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
                title: "Client-Side Rendering (CSR)",
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

const routeObjects = (function() {
    const routeObjects: Record<string, SubRoute> = pageRoutes.reduce(
        (acc: Record<string, SubRoute>, pageRoute: PageRoute) => {
            pageRoute.subRoutes.forEach((subRoute) => {
                acc[subRoute.href] = subRoute;
            });
            return acc;
        },
        {}
    );
    routeObjects["/routing/dynamic/*"] = {
        title: "Dynamic Routing",
        description: "Routing with dynamic URLs.",
        href: "",
    };
    routeObjects["/"] = {
        title: "Home",
        description: "Home page.",
        href: "/",
    };
    return routeObjects;
})();

export { routeObjects, pageRoutes, type SubRoute, type PageRoute };
