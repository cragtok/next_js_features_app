"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import BreadcrumbMenu from "./BreadcrumbMenu";
import { routeTitles } from "./routesList";

export default function Header() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    const routePath: string[] = isHomePage
        ? []
        : ["Home", routeTitles[pathname]];

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

            {!isHomePage && <BreadcrumbMenu routePath={routePath} />}
        </header>
    );
}
