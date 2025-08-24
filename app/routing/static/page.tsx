import { PageWrapper } from "@/components/general/PageWrapper";
import FolderStructureCards from "@/components/general/FolderStructureCards";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import { SectionWrapper } from "@/components/general/SectionWrapper";

export default function Page() {
    return (
        <PageWrapper pageTitle="Static Routing">
            <SectionWrapper>
                <ParagraphWrapper>
                    This page is routed using a simple static route{" "}
                    <TextAccentWrapper>/routing/static</TextAccentWrapper>. In
                    the Next.js App Router, static routes are defined by
                    creating a folder structure within the{" "}
                    <TextAccentWrapper>app</TextAccentWrapper>. In directory,
                    where each nested folder represents a segment of the URL
                    path, and a <TextAccentWrapper>page.tsx</TextAccentWrapper>{" "}
                    file inside the innermost folder makes that route segment
                    publicly accessible.
                </ParagraphWrapper>
            </SectionWrapper>

            <SectionWrapper sectionTitle="Folder Structure For This Page">
                <ParagraphWrapper>
                    The page for this route was made by creating an{" "}
                    <TextAccentWrapper>
                        app/routing/static/page.tsx
                    </TextAccentWrapper>{" "}
                    file. You can see that the{" "}
                    <TextAccentWrapper>/routing/static</TextAccentWrapper> part
                    of the file path appears in the URL route.
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
