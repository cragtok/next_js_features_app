import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import LoadingSkeleton from "@/components/general/LoadingSkeleton";
import { Suspense } from "react";
import QuoteCard from "./QuoteCard";
import LinkWrapper from "@/components/general/LinkWrapper";

export const dynamic = "force-dynamic";

function Page() {
    return (
        <PageWrapper pageTitle="Server Side Rendering">
            <SectionWrapper>
                <ParagraphWrapper>
                    <TextAccentWrapper>
                        {" "}
                        Server-Side Rendering (SSR){" "}
                    </TextAccentWrapper>{" "}
                    involves rendering HTML on the server for each incoming
                    request. The static HTML sent by the server is then{" "}
                    <TextAccentWrapper>
                        &quot;hydrated&quot;
                    </TextAccentWrapper>{" "}
                    on the client, leading to a fully interactive web page. This
                    results in the client receiving a fully formed HTML page,
                    leading to better SEO for the site and faster initial page
                    loads for the user. However, SSR can lead to a higher load
                    on the server due to the data fetching and HTML generation.
                    Thus, it should be used with caution for pages with lots of
                    content and data fetching.
                </ParagraphWrapper>
            </SectionWrapper>

            <SectionWrapper
                sectionTitle="Server-Side Data Fetching"
                classNameOverride="gap-12"
            >
                <ParagraphWrapper>
                    To demonstrate SSR, this page will fetch a random quote from{" "}
                    <LinkWrapper href="https://thequoteshub.com/api/">
                        The Quotes Hub API
                    </LinkWrapper>{" "}
                    each time it is refreshed. The data is fetched entirely on
                    the server.
                </ParagraphWrapper>

                <Suspense fallback={<LoadingSkeleton numRows={4} />}>
                    <QuoteCard />
                </Suspense>
            </SectionWrapper>
        </PageWrapper>
    );
}

export default Page;
