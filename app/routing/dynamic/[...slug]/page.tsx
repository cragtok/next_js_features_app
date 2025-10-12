import PageWrapper from "@/components/general/PageWrapper";
import DynamicRouteForm from "../DynamicRouteForm";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import CardWrapper from "@/components/general/CardWrapper";
import { CardContent } from "@/components/ui/card";
import { STATIC_ROUTES } from "../constants";
import { Metadata } from "next";
import { isValidDynamicRouteSegment } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
    return STATIC_ROUTES.map((route) => ({
        slug: route.split("/"),
    }));
}

interface MetadataProps {
    params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
    params,
}: MetadataProps): Promise<Metadata> {
    const { slug } = await params;
    const joinedSlug = slug.join("/");

    let title;
    if (isValidDynamicRouteSegment(joinedSlug)) {
        title =
            joinedSlug.length >= 25
                ? `${joinedSlug.substring(0, 25)}...`
                : joinedSlug;
    } else {
        title = "Error";
    }

    return {
        title: `${title} | Dynamic Routing`,
        robots: { index: false, follow: false },
    };
}

async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const joinedSlug = slug.join("/");

    if (!isValidDynamicRouteSegment(joinedSlug)) {
        throw new Error("Invald Dynamic Segment");
    }

    return (
        <PageWrapper pageTitle="Dynamic Route">
            <SectionWrapper classNameOverride="items-center gap-4">
                <ParagraphWrapper classNameOverride="text-center max-[400px]:text-center">
                    You have entered a page with a dynamic route segment:
                </ParagraphWrapper>

                <CardWrapper>
                    <CardContent>
                        <p
                            className="font-semibold text-accent-500 wrap-anywhere"
                            data-testid="dynamic-segment"
                        >
                            {joinedSlug}
                        </p>
                    </CardContent>
                </CardWrapper>

                {STATIC_ROUTES.includes(joinedSlug) && (
                    <ParagraphWrapper classNameOverride="text-center max-[400px]:text-center">
                        <TextAccentWrapper classNameOverride="font-normal italic text-center">
                            This dynamic route segment is statically generated
                            at build time.
                        </TextAccentWrapper>
                    </ParagraphWrapper>
                )}
            </SectionWrapper>

            <SectionWrapper sectionTitle="Dynamic Route Navigation">
                <ParagraphWrapper classNameOverride="max-[400px]:text-center">
                    Enter a dynamic route segment in the form below to
                    automatically navigate to that route:
                </ParagraphWrapper>

                <DynamicRouteForm baseRoute="/routing/dynamic" />
            </SectionWrapper>
        </PageWrapper>
    );
}

export default Page;
