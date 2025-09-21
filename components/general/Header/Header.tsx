"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import BreadcrumbMenu from "./BreadcrumbMenu";
import { Suspense } from "react";
import { AppRoute, routeObjects } from "@/lib/routesList";

const Header = () => {
    const pathname = usePathname();

    const extractRoutePath = () => {
        let routePath: AppRoute[] = [];
        // match the '/routing/dynamic/*' path
        const dynamicRoutePattern = /^\/routing\/dynamic\/(.*)/;

        if (pathname.match(dynamicRoutePattern)) {
            const match = pathname.match(dynamicRoutePattern);
            if (match) {
                routePath = [
                    routeObjects["/"],
                    routeObjects["/routing/dynamic"],
                    { ...routeObjects["/routing/dynamic*"], title: match[1] }, // Set page title as dynamic route segment
                ];
            }
            // routepath is not dynamic or home route
        } else if (routeObjects.hasOwnProperty(pathname)) {
            routePath = [routeObjects["/"], routeObjects[pathname]];
        }

        return routePath;
    };

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
    const routePath = extractRoutePath();

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
