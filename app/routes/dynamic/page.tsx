import Link from "next/link";
import { DynamicRouteForm } from "./DynamicRouteForm";

export default function Page() {
    return (
        <div className="flex flex-col pt-10 gap-10 items-center text-center max-sm:text-sm">
            <h1 className="text-brand-700 font-extrabold text-4xl">
                Dynamic Route
            </h1>

            <section>
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
                    prop.
                </p>
            </section>

            <section className="flex flex-col gap-8">
                <h2 className="text-brand-700 font-extrabold text-2xl">
                    Dynamic Route Examples
                </h2>

                <p className="text-brand-500  max-w-prose text-justify">
                    To see dynamic routes in action, visit some of these routes
                    with various dynamic segments:
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

            <section className="flex flex-col gap-8 pb-18">
                <h2 className="text-brand-700 font-extrabold text-2xl">
                    Dynamic Route Form
                </h2>

                <p className="text-brand-500 max-w-prose text-justify">
                    Or, enter a dynamic route segment in the form below and
                    automatically navigate to that route:
                </p>

                <DynamicRouteForm />
            </section>
        </div>
    );
}
