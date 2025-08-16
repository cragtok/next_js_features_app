import { PageWrapper } from "@/components/general/PageWrapper";
import FolderStructureCards from "../FolderStructureCards";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";

export default function Page() {
    return (
        <PageWrapper pageTitle="Static Routing">
            <section>
                <ParagraphWrapper>
                    This page is routed using a simple static route{" "}
                    <TextAccentWrapper>/routes/static</TextAccentWrapper>. In
                    the Next.js App Router, static routes are defined by
                    creating a folder structure within the{" "}
                    <TextAccentWrapper>app</TextAccentWrapper>. In directory,
                    where each nested folder represents a segment of the URL
                    path, and a <TextAccentWrapper>page.tsx</TextAccentWrapper>{" "}
                    file inside the innermost folder makes that route segment
                    publicly accessible.
                </ParagraphWrapper>
            </section>

            <section className="flex flex-col gap-6">
                <h2 className="text-brand-700 font-extrabold text-2xl text-center">
                    Folder Structure For This Page
                </h2>

                <ParagraphWrapper>
                    The page for this route was made by creating an{" "}
                    <TextAccentWrapper>
                        app/routes/static/page.tsx
                    </TextAccentWrapper>{" "}
                    file. You can see that the{" "}
                    <TextAccentWrapper>/routes/static</TextAccentWrapper> part
                    of the file path appears in the URL route.
                </ParagraphWrapper>

                <div className="text-sm">
                    <FolderStructureCards
                        folderPath={["app", "routes", "static", "page.tsx"]}
                    />
                </div>
            </section>
        </PageWrapper>
    );
}
