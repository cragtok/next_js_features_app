import { PageWrapper } from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import { SectionWrapper } from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";

export default function Page() {
    return (
        <PageWrapper pageTitle="Static Site Generation">
            <SectionWrapper>
                <ParagraphWrapper>
                    In{" "}
                    <TextAccentWrapper>
                        Server Site Generation (SSG)
                    </TextAccentWrapper>{" "}
                    , a page is rendered once on the server during build time.
                    The page content can then be fetched from the server once
                    and stored on the browser. This makes it instantaneously
                    accessible from the browser without needing to make another
                    request to the server. SSG is the default behavior for
                    Server Components unless specific data fetching options
                    (like <TextAccentWrapper>revalidate = 0</TextAccentWrapper>{" "}
                    or{" "}
                    <TextAccentWrapper>
                        {" "}
                        cache: &quot;no-store&quot;
                    </TextAccentWrapper>{" "}
                    with <TextAccentWrapper>fetch</TextAccentWrapper>) or
                    dynamic functions ({" "}
                    <TextAccentWrapper>headers()</TextAccentWrapper>,{" "}
                    <TextAccentWrapper>cookies()</TextAccentWrapper>,{" "}
                    <TextAccentWrapper>searchParams</TextAccentWrapper>) are
                    used, which opt the component into dynamic rendering. SSG
                    offers many benefits like exceptional speed, low server
                    load, SEO optimizations and application security. However,
                    because the page content is static, it is not suitable for
                    pages involving content that needs to be fresh on every
                    request, such as stock prices or news headlines.
                </ParagraphWrapper>

                <ParagraphWrapper>
                    This page was generated at build time. It contains no
                    dynamic code or content. You can refresh this page as many
                    times as you want, and you will get the same content.
                </ParagraphWrapper>
            </SectionWrapper>
        </PageWrapper>
    );
}
