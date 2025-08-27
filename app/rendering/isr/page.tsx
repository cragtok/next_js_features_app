import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
export const revalidate = 20;

import { fetchPrices, CryptoData } from "./apiCall";
import CryptoPricesCard from "./CryptoPricesCard";

export default async function Page() {
    let cryptoPrices: CryptoData[] = [];
    try {
        cryptoPrices = await fetchPrices();
    } catch (error) {
        console.error(error);
    }

    return (
        <PageWrapper pageTitle="Incremental Static Regeneration (ISR)">
            <SectionWrapper>
                <ParagraphWrapper>
                    In{" "}
                    <TextAccentWrapper>
                        Incremental Static Regeneration (ISR)
                    </TextAccentWrapper>
                    , the page is initially statically rendered on the server
                    during build time. However, unlike a pure static page, an
                    ISR page can periodically fetch new data after a specified
                    time period without having to rebuild the entire site.
                </ParagraphWrapper>
                <ParagraphWrapper>
                    ISR can be implemented in a page by exporting a{" "}
                    <TextAccentWrapper>revalidate</TextAccentWrapper> constant
                    that is set to a specified amount of time (known as the{" "}
                    <TextAccentWrapper>revalidation time</TextAccentWrapper>) in
                    seconds. When a request comes in and the cached version of
                    the page is <TextAccentWrapper>stale</TextAccentWrapper>{" "}
                    (older than the specified revalidation time), Next.js serves
                    the it immediately from the cache. After this time has
                    elapsed, the cache is{" "}
                    <TextAccentWrapper>invalidated</TextAccentWrapper> and a
                    re-generation of the page occurs in the background on the
                    server. After it is ready, it replaces the old page in the
                    cache, and subsequent requests receive the fresh content.
                </ParagraphWrapper>
                <ParagraphWrapper>
                    ISR combines the performance benefits of static sites (fast
                    initial load, CDN delivery) with the flexibility of dynamic
                    rendering (fresh data, without full redeploys), making it
                    ideal for content that updates regularly but not on every
                    single user request, such as blog posts, product listings,
                    or news articles.
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
                <CryptoPricesCard prices={cryptoPrices} />
            </SectionWrapper>
        </PageWrapper>
    );
}
