import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import LoadingSkeleton from "@/components/general/LoadingSkeleton";
import { Suspense } from "react";
import QuoteCard from "./QuoteCard";
import LinkWrapper from "@/components/general/LinkWrapper";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Server-Side Rendering (SSR)",
};

function Page() {
    return (
        <PageWrapper pageTitle="Server-Side Rendering (SSR)">
            <SectionWrapper>
                <ParagraphWrapper>
                    <TextAccentWrapper>
                        {" "}
                        Server-Side Rendering (SSR){" "}
                    </TextAccentWrapper>{" "}
                    involves rendering HTML on the server for each incoming
                    request. This results in the client receiving a fully formed
                    HTML page, leading to a faster initial page load for the
                    user. It also greatly improves Search Engine Optimization
                    (SEO) metrics, as search engine crawlers can easily read the
                    pre-rendered content. However, SSR can also lead to a higher
                    load on the server due to the data fetching and HTML
                    generation. Thus, it should be used with caution for pages
                    with that require lots of server-generated content.
                </ParagraphWrapper>
            </SectionWrapper>

            <SectionWrapper
                sectionTitle="Server-Side Data Fetching"
                classNameOverride="gap-8"
            >
                <ParagraphWrapper classNameOverride="max-[400px]:text-center">
                    To demonstrate SSR, this page will fetch a random quote from{" "}
                    <LinkWrapper href="https://thequoteshub.com/api/">
                        The Quotes Hub API
                    </LinkWrapper>{" "}
                    each time it is refreshed. The data fetching is performed
                    entirely on the server.
                </ParagraphWrapper>

                <Suspense fallback={<LoadingSkeleton numRows={4} />}>
                    <QuoteCard />
                </Suspense>
            </SectionWrapper>
        </PageWrapper>
    );
}

export default Page;
