import { PageWrapper } from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import { SectionWrapper } from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import QuoteCard from "./QuoteCard";
import { Card, CardContent } from "@/components/ui/card";
import LinkWrapper from "@/components/general/LinkWrapper";

export const dynamic = "force-dynamic";

export default function Page() {
    const QuoteSkeleton = () => (
        <Card className="bg-neutral-100 rounded-md pt-5 pb-3">
            <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full bg-brand-50" />
                <Skeleton className="h-4 w-full bg-brand-50" />
                <Skeleton className="h-4 w-full bg-brand-50" />
                <Skeleton className="h-4 w-full bg-brand-50" />
            </CardContent>
        </Card>
    );

    return (
        <PageWrapper pageTitle="Server Side Rendering">
            <SectionWrapper>
                <ParagraphWrapper>
                    <TextAccentWrapper>
                        {" "}
                        Server-Side Rendering (SSR){" "}
                    </TextAccentWrapper>{" "}
                    involves rendering HTML on the server for each incoming
                    request. Server Components are used to create SSR pages. The
                    static HTML sent by the server is{" "}
                    <TextAccentWrapper>
                        &quot;hydrated&quot;
                    </TextAccentWrapper>{" "}
                    on the client, leading to a fully interactive web page. You
                    can directly fetch data in Server Components using native or
                    third-party data fetching libraries. This results in the
                    client receiving a fully formed HTML page, leading to better
                    SEO for the sitemaster and faster initial page loads for the
                    user. However, SSR can lead to a higher load on the server
                    due to the data fetching and HTML generation. Thus, it
                    should be used with caution for pages with lots of content
                    and data fetching.
                </ParagraphWrapper>
            </SectionWrapper>

            <SectionWrapper
                sectionTitle="Dynamic Data Fetching"
                classNameOverride="gap-12"
            >
                <ParagraphWrapper>
                    To demonstrate SSR, this page will fetch a random quote from{" "}
                    <LinkWrapper href="https://thequoteshub.com/api/">
                        The Quotes Hub API
                    </LinkWrapper>{" "}
                    each time it is refreshed:
                </ParagraphWrapper>

                <Suspense fallback={<QuoteSkeleton />}>
                    <QuoteCard />
                </Suspense>
            </SectionWrapper>
        </PageWrapper>
    );
}
