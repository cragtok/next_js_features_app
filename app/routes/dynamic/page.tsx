import Link from "next/link";
import { DynamicRouteForm } from "./DynamicRouteForm";
import FolderStructureCards from "../FolderStructureCards";
import { PageWrapper } from "@/components/general/PageWrapper";

export default function Page() {
    return (
        <PageWrapper pageTitle="Dynamic Routing">
            <section className="flex flex-col gap-8">
                <p className="text-brand-500 max-w-prose text-justify">
                    In Next.js, you can create a dynamic route by creating a{" "}
                    <span className="text-accent-500 font-semibold whitespace-nowrap">
                        page.tsx
                    </span>{" "}
                    file inside a folder whose name is enclosed in square
                    brackets. The square brackets denote the dynamic portion of
                    the route which can be accessed in the page. For example, in
                    this app a dynamic route was made by creating a folder{" "}
                    <span className="text-accent-500 font-semibold whitespace-nowrap">
                        app/routes/dynamic/[slug]
                    </span>{" "}
                    and placing a{" "}
                    <span className="text-accent-500 font-semibold whitespace-nowrap">
                        page.tsx
                    </span>{" "}
                    file inside it. So now all routes with the format{" "}
                    <span className="text-accent-500 font-semibold whitespace-nowrap">
                        /routes/dynamic/[slug]
                    </span>{" "}
                    have the{" "}
                    <span className="text-accent-500 font-semibold whitespace-nowrap">
                        [slug]
                    </span>{" "}
                    portion of the URL as the dynamic segment, which is
                    accessible in the{" "}
                    <span className="text-accent-500 font-semibold whitespace-nowrap">
                        page.tsx
                    </span>{" "}
                    file using the{" "}
                    <span className="text-accent-500 font-semibold whitespace-nowrap">
                        slug
                    </span>{" "}
                    prop. The page will be rendered dynamically using Server
                    Side Rendering (SSR).
                </p>

                <div className="max-[300px]:text-xs text-sm">
                    <FolderStructureCards
                        folderPath={[
                            "app",
                            "routes",
                            "dynamic",
                            "[slug]",
                            "page.tsx",
                        ]}
                    />
                </div>
            </section>

            <section className="flex flex-col gap-8">
                <h2 className="text-brand-700 font-extrabold text-2xl">
                    Dynamic Route Navigation
                </h2>

                <p className="text-brand-500 max-w-prose text-justify">
                    Enter a dynamic route segment in the form below to
                    automatically navigate to that route:
                </p>

                <DynamicRouteForm baseRoute="/routes/dynamic" />
            </section>

            <section className="flex flex-col gap-8">
                <h2 className="text-brand-700 font-extrabold text-2xl">
                    Cached Dynamic Routes
                </h2>

                <p className="text-brand-500  max-w-prose text-justify">
                    Some dynamically routed pages can be statically generated in
                    Next.js. This can be done by adding a{" "}
                    <span className="text-accent-500 font-semibold whitespace-nowrap">
                        generateStaticParams()
                    </span>{" "}
                    function to the{" "}
                    <span className="text-accent-500 font-semibold whitespace-nowrap">
                        page.tsx
                    </span>{" "}
                    file. The function must return an array of objects
                    containing the dynamic routes you want to statically
                    generate. This will cause the page corresponding to the
                    route to be made statically during build time and thus load
                    faster than a dynamic route.
                </p>

                <p className="text-brand-500  max-w-prose text-justify">
                    In this app, the following dynamic routes have been set to
                    be statically generated:
                </p>

                <ul className="text-left list-disc max-w-prose list-outside pl-4 marker:text-accent-700">
                    <li>
                        <Link
                            href="/routes/dynamic/dynamic_route"
                            className="text-accent-500 font-semibold hover:underline"
                        >
                            /routes/dynamic/dynamic_route
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/routes/dynamic/1ae64431"
                            className="text-accent-500 font-semibold hover:underline"
                        >
                            /routes/dynamic/1ae64431
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/routes/dynamic/helloWorld"
                            className="text-accent-500 font-semibold hover:underline"
                        >
                            /routes/dynamic/helloWorld
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/routes/dynamic/123456"
                            className="text-accent-500 font-semibold hover:underline"
                        >
                            /routes/dynamic/123456
                        </Link>
                    </li>
                </ul>
            </section>
        </PageWrapper>
    );
}
