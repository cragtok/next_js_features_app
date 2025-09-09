import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import CryptoPrices from "./CryptoPrices";
import { Metadata } from "next";

export const revalidate = 10;

export const metadata: Metadata = {
    title: "Incremental Static Regeneration (ISR)",
};

async function Page() {
    return (
        <PageWrapper pageTitle="Incremental Static Regeneration (ISR)">
            <SectionWrapper>
                <ParagraphWrapper>
                    In{" "}
                    <TextAccentWrapper>
                        Incremental Static Regeneration (ISR)
                    </TextAccentWrapper>
                    , the page is initially statically rendered on the server
                    during build time. However, unlike a purely static page, an
                    ISR page can periodically fetch new data after a specified
                    time period without having to rebuild the entire site.
                </ParagraphWrapper>
                <ParagraphWrapper>
                    ISR can be implemented on a page by exporting a{" "}
                    <TextAccentWrapper>revalidate</TextAccentWrapper> constant
                    that is set to a specified amount of time (known as the{" "}
                    <TextAccentWrapper>revalidation time</TextAccentWrapper>) in
                    seconds. When a request comes in and the cached version of
                    the page is <TextAccentWrapper>stale</TextAccentWrapper>{" "}
                    (older than the specified revalidation time), Next.js serves
                    the page immediately from the cache. After this time has
                    elapsed, the cache is{" "}
                    <TextAccentWrapper>invalidated</TextAccentWrapper> and a
                    re-generation of the page occurs the server by fetching any
                    new data. After it is ready, the new page replaces the old
                    page in the cache, and subsequent requests receive the fresh
                    content.
                </ParagraphWrapper>
                <ParagraphWrapper>
                    ISR combines the performance benefits of static sites (fast
                    initial load, CDN delivery) with the flexibility of dynamic
                    rendering (fresh data without full redeploys), making it
                    ideal for content that updates regularly but not on every
                    single user request, such as blog posts, product listings,
                    or news articles. It is one of the main features of Next.js
                    which attracts developers to use the framework.
                </ParagraphWrapper>
            </SectionWrapper>

            <SectionWrapper sectionTitle="ISR Data Fetching">
                <ParagraphWrapper>
                    To demonstrate data fetching in ISR, this page will the
                    fetch prices of some cryptocurrencies after a revalidation
                    time of{" "}
                    <TextAccentWrapper>{revalidate} seconds</TextAccentWrapper>.
                    In order to see updated prices, you must refresh the page
                    after this time.
                </ParagraphWrapper>
                <CryptoPrices />
            </SectionWrapper>
        </PageWrapper>
    );
}

export default Page;
