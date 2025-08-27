import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchCityDateTimes } from "./geminiCall";

export const dynamic = "force-static";

async function Page() {
    const cityDateTimes = await fetchCityDateTimes();

    return (
        <PageWrapper pageTitle="Static Site Generation">
            <SectionWrapper>
                <ParagraphWrapper>
                    In{" "}
                    <TextAccentWrapper>
                        Static Site Generation (SSG)
                    </TextAccentWrapper>{" "}
                    , a page is rendered once on the server during build time.
                    The page content can then be fetched once during the initial
                    load and stored on the browser. This makes it
                    instantaneously accessible without needing to make another
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
            </SectionWrapper>

            <SectionWrapper sectionTitle="Build Time Data Fetching">
                <ParagraphWrapper>
                    At build time, this page fetched the dates and times of
                    various cities. This data will remain cached on the browser
                    and does not need to be fetched on page refresh.
                </ParagraphWrapper>

                <div className="flex flex-col gap-4">
                    {cityDateTimes.map((cdt) => (
                        <Card
                            key={crypto.randomUUID()}
                            className="bg-neutral-100"
                        >
                            <CardHeader>
                                <CardTitle className="text-accent-700 group-hover:underline">
                                    {cdt.city}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-brand-500 text">
                                    <span className="font-semibold">Date:</span>{" "}
                                    {cdt.date}
                                </p>
                                <p className="text-brand-500">
                                    <span className="font-semibold">Time:</span>{" "}
                                    {cdt.time}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </SectionWrapper>
        </PageWrapper>
    );
}

export default Page;
