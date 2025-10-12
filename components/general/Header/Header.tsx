"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import BreadcrumbMenu from "./BreadcrumbMenu";
import { Suspense } from "react";
import { AppRoute, routeObjects } from "@/lib/routesList";

const extractRoutePath = (pathname: string): AppRoute[] => {
    // match the '/routing/dynamic/*' path
    const dynamicRoutePattern = /^\/routing\/dynamic\/(.*)/;
    const match = pathname.match(dynamicRoutePattern);
    if (match) {
        // If dynamic portion of route exceeds 50
        // characters or contains invalid characters,
        // then the route is invalid
        const dynamicPortion = match ? match[1] : "";
        if (
            dynamicPortion.length > 80 ||
            !/^[a-zA-Z0-9\-\_\ /]+$/.test(dynamicPortion)
        ) {
            return [];
        }

        return [
            routeObjects["/"],
            routeObjects["/routing/dynamic"],
            { ...routeObjects["/routing/dynamic*"], title: match[1] }, // Set page title as dynamic route segment
        ];
    }

    // routepath is not dynamic or home route
    if (routeObjects.hasOwnProperty(pathname)) {
        return [routeObjects["/"], routeObjects[pathname]];
    }

    return [];
};

const Header = () => {
    const pathname = usePathname();

    if (pathname === "/") {
        return (
            <header className="">
                <div className="mx-auto my-0 flex justify-center mt-10">
                    <Image
                        src="/vercel.svg"
                        className="bg-brand-700 rounded-[8] border-3 border-brand-700"
                        alt="vercel triangle blue"
                        width={80}
                        height={80}
                    />
                </div>
            </header>
        );
    }
    // Place these after the check for homepage pathname.
    // Otherwise, it creates weird behaviour when on invalid pages.
    const routePath = extractRoutePath(pathname);
    const isValidRoute = routePath.length > 0;
    return (
        <header className="">
            <Suspense fallback={<p>Loading...</p>}>
                {isValidRoute && <BreadcrumbMenu routePath={routePath} />}
            </Suspense>
        </header>
    );
};

export default Header;
