import PageWrapper from "@/components/general/PageWrapper";
import FolderStructureCards from "@/components/general/FolderStructureCards";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import PathWithBreaks from "@/components/general/PathWithBreaks";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Static Routing",
};

function Page() {
    return (
        <PageWrapper pageTitle="Static Routing">
            <SectionWrapper>
                <ParagraphWrapper>
                    This page is routed using a simple static route{" "}
                    <TextAccentWrapper>
                        <PathWithBreaks text="/routing/static" />
                    </TextAccentWrapper>
                    . In Next.js, static routes are defined by creating a{" "}
                    <TextAccentWrapper>page.tsx</TextAccentWrapper> file either
                    directly inside the{" "}
                    <TextAccentWrapper>app</TextAccentWrapper> folder or any of
                    its sub-folders. Each nested folder represents a segment of
                    the URL path, and a{" "}
                    <TextAccentWrapper>page.tsx</TextAccentWrapper> file inside
                    the innermost folder makes that route segment publicly
                    accessible.
                </ParagraphWrapper>
            </SectionWrapper>

            <SectionWrapper sectionTitle="Folder Structure For This Page">
                <ParagraphWrapper>
                    This route for the app was made by placing a{" "}
                    <TextAccentWrapper>page.tsx</TextAccentWrapper> file within
                    the{" "}
                    <TextAccentWrapper>
                        <PathWithBreaks text="app/routing/static/" />
                    </TextAccentWrapper>{" "}
                    folder. You can see that the{" "}
                    <TextAccentWrapper>
                        <PathWithBreaks text="/routing/static" />
                    </TextAccentWrapper>{" "}
                    part of the file path appears in the URL.
                </ParagraphWrapper>

                <div className="text-xs">
                    <FolderStructureCards
                        folderPath={[
                            { type: "folder", name: "app" },
                            { type: "folder", name: "routing" },
                            { type: "folder", name: "static" },
                            { type: "file", name: "page.tsx" },
                        ]}
                    />
                </div>
            </SectionWrapper>
        </PageWrapper>
    );
}

export default Page;
