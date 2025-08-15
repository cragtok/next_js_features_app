"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import BreadcrumbMenu from "./BreadcrumbMenu";
import { routeObjects } from "./routesList";
import { Suspense } from "react";
import { SubRoute } from "./types";

export default function Header() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    const dynamicRoutePattern = /^\/routes\/dynamic\/(.*)/;

    let routePath: SubRoute[] = [routeObjects["/"]];

    if (pathname.match(dynamicRoutePattern)) {
        const match = pathname.match(dynamicRoutePattern);
        if (match) {
            routePath = [
                routeObjects["/"],
                routeObjects["/routes/dynamic"],
                { ...routeObjects["/routes/dynamic*"], title: match[1] },
            ];
        }
    } else {
        routePath = [routeObjects["/"], routeObjects[pathname]];
    }

    return (
        <header className="">
            {isHomePage && (
                <div className="mx-auto my-0 flex justify-center mt-10">
                    <Image
                        src="/vercel.svg"
                        className="bg-brand-700 rounded-[8] border-3 border-brand-700"
                        alt="logo"
                        width={80}
                        height={80}
                    />
                </div>
            )}

            <Suspense fallback={<p>Loading...</p>}>
                {!isHomePage && <BreadcrumbMenu routePath={routePath} />}
            </Suspense>
        </header>
    );
}
