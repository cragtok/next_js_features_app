import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import Providers from "./providers";
import JokeFetcher from "./JokeFetcher";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Client-Side Rendering (CSR)",
};

function Page() {
    return (
        <Providers>
            <PageWrapper pageTitle="Client-Side Rendering (CSR)">
                <SectionWrapper>
                    <ParagraphWrapper>
                        In{" "}
                        <TextAccentWrapper>
                            Client-Side Rendering (CSR)
                        </TextAccentWrapper>
                        , the page content is primarily rendered in the browser
                        after some initial HTML is loaded from the server.
                        JavaScript then fetches data and builds the rest of the
                        page directly on the client. This approach is suitable
                        for highly interactive pages or dashboards where data
                        changes frequently and real-time updates are crucial, as
                        it allows for dynamic content without requiring a full
                        page reload from the server.
                    </ParagraphWrapper>

                    <ParagraphWrapper>
                        In Next.js, a page can explicitly opt into Client-Side
                        Rendering (CSR) by not exporting any server-side data
                        fetching functions like{" "}
                        <TextAccentWrapper>getStaticProps</TextAccentWrapper>.
                        Instead, data fetching is performed directly within the
                        React component using client-side mechanisms such as the{" "}
                        <TextAccentWrapper>useEffect</TextAccentWrapper> hook,
                        often combined with{" "}
                        <TextAccentWrapper>fetch</TextAccentWrapper> or a data
                        fetching library like React Query. Also, code that
                        directly accesses browser-specific APIs like{" "}
                        <TextAccentWrapper>window</TextAccentWrapper> or{" "}
                        <TextAccentWrapper>document</TextAccentWrapper> outside
                        of <TextAccentWrapper>useEffect</TextAccentWrapper> will
                        force client-side execution for that part of the
                        component tree.
                    </ParagraphWrapper>

                    <ParagraphWrapper>
                        CSR can greatly reduce the load on the server and lead
                        to a more interactive experience for the user. However,
                        it may lead to slower initial load times on the client
                        as the page needs time render before it can be
                        interacted with. Also, it can negatively impact SEO
                        since any web crawler accessing the page will only
                        receive a basic skeleton page instead of a complete page
                        with meaningful content.
                    </ParagraphWrapper>
                </SectionWrapper>

                <SectionWrapper sectionTitle="Client-Side Data Fetching">
                    <ParagraphWrapper>
                        To demonstrate Client-Side Rendering, this page will
                        fetch a new joke each time the button is clicked. All
                        the request logic is done on the client side.
                        Internally, the page is implemented as Server Component
                        that wraps a Client Component performing all the data
                        fetching.
                    </ParagraphWrapper>
                    <JokeFetcher />
                </SectionWrapper>
            </PageWrapper>
        </Providers>
    );
}

export default Page;
