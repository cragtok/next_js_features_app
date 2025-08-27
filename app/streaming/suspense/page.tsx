import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import { DelayedImageComponent } from "./DelayedImageComponent";
import { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";

export const dynamic = 'force-dynamic';

export default function Page() {
    return (
        <PageWrapper pageTitle="Streaming with Suspense">
            <SectionWrapper>
                <ParagraphWrapper>
                    To demonstrate streaming with{" "}
                    <TextAccentWrapper>Suspense</TextAccentWrapper>, this
                    section renders three components that are loaded after each
                    other with a 2 second gap.
                </ParagraphWrapper>
                {[1, 2, 3].map((num) => (
                    <Suspense key={num} fallback={<LoadingSpinner />}>
                        <DelayedImageComponent
                            imagePath={`/nature-image-${num}.jpg`}
                            componentNumber={num}
                            delaySeconds={num * 2}
                        />
                    </Suspense>
                ))}
            </SectionWrapper>

            <SectionWrapper>
                <ParagraphWrapper>
                    In Next.js, streaming with Suspense boundaries offers
                    fine-grained control over how parts of your page are
                    progressively rendered. By wrapping individual components or
                    sections of your UI with React&apos;s{" "}
                    <TextAccentWrapper>Suspense</TextAccentWrapper> component,
                    you can specify a{" "}
                    <TextAccentWrapper>fallback</TextAccentWrapper> UI to be
                    displayed immediately while the wrapped component (often a
                    Server Component fetching data) is still loading. This
                    allows the rest of the page to render and stream to the
                    client without being blocked by slower data fetches,
                    improving perceived performance and user interactivity. Once
                    the data for the suspended component is ready, its content
                    is streamed in, seamlessly replacing the fallback. This
                    approach is ideal for scenarios where different parts of a
                    page have varying data loading times, enabling a more
                    dynamic and responsive user experience.
                </ParagraphWrapper>
            </SectionWrapper>
        </PageWrapper>
    );
}
