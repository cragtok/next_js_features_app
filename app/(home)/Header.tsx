"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Header() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

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

            {!isHomePage && (
                <Breadcrumb className="flex justify-center mt-10">
                    <BreadcrumbList>
                        <BreadcrumbItem className="font-bold text-brand-500 hover:text-brand-300">
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-brand-300" />
                        <BreadcrumbItem className="font-bold text-brand-500">
                            <BreadcrumbLink href="/components">
                                Components
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-brand-300" />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-bold text-accent-500">
                                Breadcrumb
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            )}
        </header>
    );
}
