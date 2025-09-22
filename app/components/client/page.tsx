import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import Counter from "./Counter";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Client Components",
};

const Page = () => {
    return (
        <PageWrapper pageTitle="Client Components">
            <SectionWrapper>
                <ParagraphWrapper>
                    <TextAccentWrapper>Client Components</TextAccentWrapper> in
                    React frameworks like Next.js offer a way to build
                    interactive user interfaces that run primarily in the
                    user&apos;s browser. Unlike Server Components, which handle
                    logic and rendering on the server, Client Components are
                    designed for dynamic interactions, state management, and
                    browser-specific APIs. While they can be pre-rendered on the
                    server to provide an initial, fast-loading view, their full
                    interactivity comes alive once the necessary JavaScript is
                    downloaded and executed on the client. This allows for
                    features like click handlers, form submissions with instant
                    feedback, and real-time data updates without full page
                    reloads. They are essential for any part of your application
                    that requires direct user engagement or access to
                    browser-only functionalities.
                </ParagraphWrapper>
            </SectionWrapper>

            <SectionWrapper sectionTitle="Dynamic Counter Component">
                <ParagraphWrapper>
                    To demonstrate this feature of Next.js, this page contains a
                    simple Client Component consisting of a button which
                    increments a counter and displays its value. The static
                    parts of this page are pre-rendered on the server, and then
                    the counter component is{" "}
                    <TextAccentWrapper>hydrated</TextAccentWrapper> on the
                    client-side, meaning its JavaScript is loaded and executed
                    to make it interactive.
                </ParagraphWrapper>

                <Counter />
            </SectionWrapper>
        </PageWrapper>
    );
};

export default Page;
