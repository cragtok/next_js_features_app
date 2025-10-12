interface AppRoute {
    title: string;
    href: string;
    description: string;
    priority: number;
    disablePrefetch?: boolean;
}

interface RouteGroup {
    group: string;
    routes: AppRoute[];
}

const pageRoutes: RouteGroup[] = [
    {
        group: "Server and Client Components",
        routes: [
            {
                title: "Server Components",
                href: "/components/server",
                description: "Components that render completely on the server.",
                priority: 0.7,
            },
            {
                title: "Client Components",
                href: "/components/client",
                description:
                    "Components that prerender on the server and hydrate on the client.",
                priority: 0.7,
            },
        ],
    },
    {
        group: "Routing",
        routes: [
            {
                title: "Static Routing",
                href: "/routing/static",
                description: "Routing with static URLs.",
                priority: 0.7,
            },
            {
                title: "Dynamic Routing",
                href: "/routing/dynamic",
                description: "Routing with dynamic URLs.",
                priority: 0.7,
                disablePrefetch: true,
            },
        ],
    },
    {
        group: "Rendering and Data Fetching",
        routes: [
            {
                title: "Server-Side Rendering (SSR)",
                href: "/rendering/ssr",
                description:
                    "Rendering the page content on the server for each request.",
                priority: 0.7,
            },
            {
                title: "Static Site Generation (SSG)",
                href: "/rendering/ssg",
                description:
                    "Rendering page content once on the server during build time.",
                priority: 0.7,
            },
            {
                title: "Incremental Static Regeneration (ISR)",
                href: "/rendering/isr",
                description:
                    "Updating a static page with new content after a certain time period.",
                priority: 0.7,
            },
            {
                title: "Client-Side Rendering (CSR)",
                href: "/rendering/csr",
                description:
                    "Rendering a page on the client via JavaScript and some basic HTML.",
                priority: 0.7,
                disablePrefetch: true,
            },
        ],
    },
    {
        group: "Streaming",
        routes: [
            {
                title: "Streaming With Loading.tsx",
                href: "/streaming/loading",
                description:
                    "Streaming an entire page with a loading.tsx file.",
                priority: 0.7,
                disablePrefetch: true,
            },
            {
                title: "Streaming With Suspense",
                href: "/streaming/suspense",
                description:
                    "Streaming parts of a page with Suspense boundaries.",
                priority: 0.7,
                disablePrefetch: true,
            },
        ],
    },
    {
        group: "Server Actions",
        routes: [
            {
                title: "Server Actions",
                href: "/server-actions",
                description:
                    "Functions that run on the server and can be called from client components.",
                priority: 0.7,
                disablePrefetch: true,
            },
        ],
    },
    {
        group: "Route Handlers",
        routes: [
            {
                title: "Route Handlers",
                href: "/route-handlers",
                description: "Basic CRUD operations via Route Handlers.",
                priority: 0.7,
                disablePrefetch: true,
            },
        ],
    },
    {
        group: "Middleware",
        routes: [
            {
                title: "Middleware A/B Testing",
                href: "/middleware/ab-testing",
                description: "Using middleware to run A/B tests.",
                priority: 0.7,
                disablePrefetch: true,
            },
            {
                title: "Middleware Request Logging",
                href: "/middleware/log",
                description:
                    "Using middleware to log information about incoming requests.",
                priority: 0.7,
                disablePrefetch: true,
            },
        ],
    },
];

const routeObjects: Record<string, AppRoute> = (function() {
    const routeObjects: Record<string, AppRoute> = pageRoutes.reduce(
        (acc: Record<string, AppRoute>, pageRoute: RouteGroup) => {
            pageRoute.routes.forEach((subRoute) => {
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
        priority: 0.0,
    };
    routeObjects["/"] = {
        title: "Home",
        description: "Home page.",
        href: "/",
        priority: 1.0,
    };
    return routeObjects;
})();

export { routeObjects, pageRoutes, type AppRoute, type RouteGroup };
