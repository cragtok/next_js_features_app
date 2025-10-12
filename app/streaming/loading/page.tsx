import FolderStructureCards from "@/components/general/FolderStructureCards";
import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import PathWithBreaks from "@/components/general/PathWithBreaks";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import { delay } from "@/lib/utils";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

const DELAY_SECONDS = 2;

export const metadata: Metadata = {
    title: "Streaming with Loading.tsx",
};

async function Page() {
    await delay(DELAY_SECONDS * 1000);

    return (
        <PageWrapper pageTitle="Streaming with Loading.tsx">
            <SectionWrapper>
                <ParagraphWrapper>
                    This page demonstrates streaming using a{" "}
                    <TextAccentWrapper>loading.tsx</TextAccentWrapper> file. In
                    this setup, you place a{" "}
                    <TextAccentWrapper>loading.tsx</TextAccentWrapper> file
                    containing the loading UI within a route segment folder.
                    Next.js then automatically streams the loading UI while the
                    data for the <TextAccentWrapper>page.tsx</TextAccentWrapper>{" "}
                    is being fetched on the server. Once the data is ready, the
                    actual page content replaces the loading fallback. In this
                    way visual feedback is provided to the user indicating that
                    the page is being loaded.
                </ParagraphWrapper>
            </SectionWrapper>

            <SectionWrapper sectionTitle="Folder Structure For This Page">
                <ParagraphWrapper>
                    For this route an{" "}
                    <TextAccentWrapper>
                        <PathWithBreaks text="app/streaming/loading/" />
                    </TextAccentWrapper>{" "}
                    folder was created, and filled with a{" "}
                    <TextAccentWrapper>page.tsx</TextAccentWrapper> file and a{" "}
                    <TextAccentWrapper>loading.tsx</TextAccentWrapper> file. As
                    a result, the content of this page will appear after a{" "}
                    <TextAccentWrapper> {DELAY_SECONDS}s</TextAccentWrapper>{" "}
                    delay, during which time the{" "}
                    <TextAccentWrapper>loading.tsx</TextAccentWrapper> fallback
                    will be displayed.
                </ParagraphWrapper>

                <div className="text-xs">
                    <FolderStructureCards
                        folderPath={[
                            { name: "app", type: "folder" },
                            { name: "streaming", type: "folder" },
                            {
                                name: "loading",
                                type: "folder",
                                children: [
                                    { name: "page.tsx", type: "file" },
                                    { name: "loading.tsx", type: "file" },
                                ],
                            },
                        ]}
                    />
                </div>
            </SectionWrapper>
        </PageWrapper>
    );
}

export default Page;
