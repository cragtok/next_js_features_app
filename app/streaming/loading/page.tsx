import FolderStructureCards from "@/components/general/FolderStructureCards";
import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";

export const dynamic = "force-dynamic";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function Page() {
    await delay(2000);

    return (
        <PageWrapper pageTitle="Streaming with Loading.tsx">
            <SectionWrapper>
                <ParagraphWrapper>
                    This page demonstrates streaming using a{" "}
                    <TextAccentWrapper>loading.tsx</TextAccentWrapper> file. In
                    this setup, you place this file within a route segment
                    folder, and Next.js automatically wraps the corresponding{" "}
                    <TextAccentWrapper>page.tsx</TextAccentWrapper> with a
                    Suspense boundary. While the data for the{" "}
                    <TextAccentWrapper>page.tsx</TextAccentWrapper> is being
                    fetched on the server, the content of{" "}
                    <TextAccentWrapper>loading.tsx</TextAccentWrapper> is
                    immediately streamed to the client, providing an instant
                    loading UI. Once the data is ready, the actual page content
                    replaces the loading fallback.{" "}
                </ParagraphWrapper>
            </SectionWrapper>

            <SectionWrapper sectionTitle="Folder Structure For This Page">
                <ParagraphWrapper>
                    The page for this route was implemented by creating an{" "}
                    <TextAccentWrapper>
                        app/streaming/loading/
                    </TextAccentWrapper>{" "}
                    folder containing a{" "}
                    <TextAccentWrapper>page.tsx</TextAccentWrapper> file and a{" "}
                    <TextAccentWrapper>loading.tsx</TextAccentWrapper> file. As
                    a result, the content of this page will appear after a
                    2-second delay, during which time the{" "}
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
