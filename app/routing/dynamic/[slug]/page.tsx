import PageWrapper from "@/components/general/PageWrapper";
import DynamicRouteForm from "../DynamicRouteForm";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import { MAX_SLUG_LENGTH } from "../constants";

const slugs = ["dynamic_route", "1ae64431", "helloWorld", "123456"];

export async function generateStaticParams() {
    const slugs = ["dynamic_route", "1ae64431", "helloWorld", "123456"];
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    if (slug.length > MAX_SLUG_LENGTH) {
        throw new Error("Max slug length exceeded");
    }

    return (
        <PageWrapper pageTitle="Dynamic Route">
            <SectionWrapper classNameOverride="items-center gap-4">
                <ParagraphWrapper classNameOverride={"text-center"}>
                    You have entered a page with a dynamic route segment:
                </ParagraphWrapper>

                <div className="mt-4 p-4 border rounded-md bg-neutral-100">
                    <div className="font-semibold text-accent-500 wrap-anywhere">{slug}</div>
                </div>

                {slugs.includes(slug) && (
                    <ParagraphWrapper classNameOverride={"text-center"}>
                        <TextAccentWrapper classNameOverride="font-normal italic">
                            This dynamic route segment is statically generated
                            at build time.
                        </TextAccentWrapper>
                    </ParagraphWrapper>
                )}
            </SectionWrapper>

            <SectionWrapper sectionTitle="Dynamic Route Navigation">
                <ParagraphWrapper>
                    Enter a dynamic route segment in the form below to
                    automatically navigate to that route:
                </ParagraphWrapper>

                <DynamicRouteForm baseRoute="/routing/dynamic" />
            </SectionWrapper>
        </PageWrapper>
    );
}

export default Page;
