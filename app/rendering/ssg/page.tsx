import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import { Metadata } from "next";
import CityDateTimes from "./CityDateTimes/CityDateTimes";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Static Site Generation (SSG)",
};

async function Page() {
    return (
        <PageWrapper pageTitle="Static Site Generation (SSG)">
            <SectionWrapper>
                <ParagraphWrapper>
                    In{" "}
                    <TextAccentWrapper>
                        Static Site Generation (SSG)
                    </TextAccentWrapper>
                    , a page is rendered once on the server during build time.
                    The page content can then be fetched once during the initial
                    client request and stored entirely on the browser. This
                    makes it instantaneously accessible without needing to make
                    another server request. SSG is the default behavior for
                    Server Components unless specific data fetching options
                    (like <TextAccentWrapper>revalidate = 0</TextAccentWrapper>{" "}
                    or{" "}
                    <TextAccentWrapper>
                        {" "}
                        cache: &quot;no-store&quot;
                    </TextAccentWrapper>{" "}
                    with <TextAccentWrapper>fetch</TextAccentWrapper>) or
                    dynamic functions (
                    <TextAccentWrapper>headers()</TextAccentWrapper>,
                    <TextAccentWrapper>cookies()</TextAccentWrapper>) are used,
                    which opt the component into dynamic rendering. SSG offers
                    many benefits like exceptional speed, low server load, SEO
                    optimizations and application security. However, because the
                    page content is static, it is not suitable for pages
                    involving content that needs to be fresh on every request,
                    such as stock prices or news headlines.
                </ParagraphWrapper>
            </SectionWrapper>

            <SectionWrapper sectionTitle="Build Time Data Fetching">
                <ParagraphWrapper>
                    At build time, this page fetches the dates and times of
                    various cities around the world and pre-renders them as part
                    of the page. Thus, when the page is first accessed, the
                    browser receives a fully-formed page that is instantly
                    accessible without needing to make any further requests.
                </ParagraphWrapper>
                <CityDateTimes />
            </SectionWrapper>
        </PageWrapper>
    );
}

export default Page;
