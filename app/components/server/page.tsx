import CardWrapper from "@/components/general/CardWrapper";
import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import RefreshButton from "@/components/general/RefreshButton";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";

export const dynamic = "force-dynamic";

const Page = () => {
    return (
        <PageWrapper pageTitle="Server Components">
            <SectionWrapper>
                <ParagraphWrapper>
                    <TextAccentWrapper>Server Components</TextAccentWrapper> are
                    a fundamental feature in modern React frameworks like
                    Next.js. These components are rendered entirely on the
                    server, meaning they execute all their logic and data
                    fetching on the server, before any JavaScript is sent to the
                    client&apos;s browser. This approach offers several
                    benefits: it reduces the amount of JavaScript shipped to the
                    client, leading to faster initial page loads and improved
                    performance, especially on slower networks or devices.
                    Additionally, Server Components can directly access
                    server-side resources like databases or file systems,
                    simplifying data fetching and eliminating the need for API
                    layers in many cases. They are ideal for displaying static
                    or data-driven content that doesn&apos;t require client-side
                    interactivity.
                </ParagraphWrapper>
            </SectionWrapper>
            <SectionWrapper sectionTitle="Server Rendered Data">
                <ParagraphWrapper>
                    To demonstrate Server Components, this page generates
                    dynamic data on the server for each request it receives.
                </ParagraphWrapper>

                <div className="flex flex-col gap-3 mt-4">
                    <ParagraphWrapper classNameOverride="text-center">
                        Here is the time on the server when this page was
                        rendered:
                    </ParagraphWrapper>

                    <CardWrapper>
                        <TextAccentWrapper data-testid="server-time">
                            {new Date().toLocaleString().split(", ")[1]}
                        </TextAccentWrapper>
                    </CardWrapper>
                </div>

                <div className="flex flex-col gap-3">
                    <ParagraphWrapper
                        classNameOverride="text-center"
                    >
                        Here is a random number that was generated on the
                        server:
                    </ParagraphWrapper>

                    <CardWrapper>
                        <TextAccentWrapper data-testid="random-number-display">
                            {Math.random().toFixed(2)}
                        </TextAccentWrapper>
                    </CardWrapper>
                </div>

                <div className="flex flex-col gap-3">
                    <ParagraphWrapper classNameOverride="text-center">
                        Refreshing the page should update the data.
                    </ParagraphWrapper>

                    <RefreshButton data-testid="refresh-button">
                        Refresh Page
                    </RefreshButton>
                </div>
            </SectionWrapper>
        </PageWrapper>
    );
};

export default Page;
