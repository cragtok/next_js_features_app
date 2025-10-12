import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import DelayedImageCard from "./DelayedImageCard";
import { Suspense } from "react";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

const CARD_DELAY_INTERVAL_SECONDS = 1;

export const metadata: Metadata = {
    title: "Streaming with Suspense",
};

function Page() {
    return (
        <PageWrapper pageTitle="Streaming with Suspense">
            <SectionWrapper>
                <ParagraphWrapper classNameOverride="max-[400px]:text-center">
                    To demonstrate streaming with{" "}
                    <TextAccentWrapper>Suspense</TextAccentWrapper>, this
                    section renders three components that are loaded after each
                    other with a{" "}
                    <TextAccentWrapper>
                        {CARD_DELAY_INTERVAL_SECONDS}s{" "}
                    </TextAccentWrapper>{" "}
                    gap in between.
                </ParagraphWrapper>
                <div className="flex flex-col">
                    {[1, 2, 3].map((num) => (
                        <Suspense key={num} fallback={<LoadingSpinner />}>
                            <DelayedImageCard
                                imagePath={`/nature-image-${num}.jpg`}
                                title={`Component ${num}`}
                                alt={`Nature Image ${num}`}
                                delaySeconds={num * CARD_DELAY_INTERVAL_SECONDS}
                            />
                        </Suspense>
                    ))}
                </div>
            </SectionWrapper>

            <SectionWrapper>
                <ParagraphWrapper>
                    In Next.js, streaming with Suspense boundaries offers
                    fine-grained control over how parts of your page are
                    progressively rendered. By wrapping individual components or
                    sections of your UI with React&apos;s{" "}
                    <TextAccentWrapper>Suspense</TextAccentWrapper> component,
                    you can specify a fallback UI to be displayed immediately
                    while the wrapped component (often a Server Component
                    fetching data) is still loading. Once the data for the
                    suspended component is ready, its content is streamed in,
                    seamlessly replacing the fallback. This approach is ideal
                    for scenarios where different parts of a page have varying
                    data loading times, enabling a more dynamic and responsive
                    user experience.
                </ParagraphWrapper>
            </SectionWrapper>
        </PageWrapper>
    );
}

export default Page;
