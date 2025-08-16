import { PageWrapper } from "@/components/general/PageWrapper";
import { DynamicRouteForm } from "../DynamicRouteForm";

const slugs = ["dynamic_route", "1ae64431", "helloWorld", "123456"];
export async function generateStaticParams() {
    const slugs = ["dynamic_route", "1ae64431", "helloWorld", "123456"];
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    return (
        <PageWrapper pageTitle="Dynamic Route">
            <section>
                <p className="text-brand-500 max-w-prose wrap-anywhere text-justify">
                    You have entered a page with a dynamic route segment:{" "}
                    <span className="text-accent-500 font-semibold">
                        {slug}
                    </span>
                </p>
                <br />
                {slugs.includes(slug) && (
                    <p className="text-brand-500 max-w-prose wrap-anywhere text-justify">
                        This dynamic route segment is statically generated at
                        build time.
                    </p>
                )}
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
        </PageWrapper>
    );
}
