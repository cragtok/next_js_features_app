import { PageWrapper } from "@/components/general/PageWrapper";
import { DynamicRouteForm } from "../DynamicRouteForm";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";

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
                <ParagraphWrapper>
                    You have entered a page with a dynamic route segment:{" "}
                    <TextAccentWrapper classNameOverride="break-all">
                        {slug}
                    </TextAccentWrapper>
                </ParagraphWrapper>
                <br />
                {slugs.includes(slug) && (
                    <ParagraphWrapper>
                        <TextAccentWrapper classNameOverride="font-normal italic">
                            This dynamic route segment is statically generated
                            at build time.
                        </TextAccentWrapper>
                    </ParagraphWrapper>
                )}
            </section>

            <section className="flex flex-col gap-8">
                <h2 className="text-brand-700 font-extrabold text-2xl">
                    Dynamic Route Navigation
                </h2>

                <ParagraphWrapper>
                    Enter a dynamic route segment in the form below to
                    automatically navigate to that route:
                </ParagraphWrapper>

                <DynamicRouteForm baseRoute="/routes/dynamic" />
            </section>
        </PageWrapper>
    );
}
