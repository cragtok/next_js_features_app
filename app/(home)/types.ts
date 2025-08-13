interface SubRoute {
    title: string;
    href: string;
    description: string;
}

interface PageRoute {
    route: string;
    subRoutes: SubRoute[];
}

export type { SubRoute, PageRoute };
