import DynamicRouteForm from "./DynamicRouteForm";
import FolderStructureCards from "@/components/general/FolderStructureCards";
import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import LinkWrapper from "@/components/general/LinkWrapper";
import PathWithBreaks from "@/components/general/PathWithBreaks";
import { STATIC_ROUTES } from "./constants";

function Page() {
    return (
        <PageWrapper pageTitle="Dynamic Routing">
            <SectionWrapper>
                <ParagraphWrapper>
                    In Next.js, you can create a dynamic route by creating a{" "}
                    <TextAccentWrapper>page.tsx</TextAccentWrapper> file inside
                    a folder whose name is enclosed in square brackets as in{" "}
                    <TextAccentWrapper>[slug]</TextAccentWrapper>. The square
                    brackets denote the dynamic portion of the route which can
                    be accessed in the page.
                </ParagraphWrapper>
                <ParagraphWrapper>
                    If you want a dynamic route with a{" "}
                    <TextAccentWrapper>catch-all segment</TextAccentWrapper>,
                    i.e one where you want to capture the whole string portion
                    regardless of how many forward slashes (
                    <TextAccentWrapper>/</TextAccentWrapper>) appear in it, then
                    the folder name within the square brackets should be
                    preceded by three dots as in
                    <TextAccentWrapper>[...slug]</TextAccentWrapper>.
                </ParagraphWrapper>
                <ParagraphWrapper>
                    In this app a dynamic route was made by creating a folder{" "}
                    <TextAccentWrapper>
                        <PathWithBreaks text="app/routing/dynamic/[...slug]/" />
                    </TextAccentWrapper>{" "}
                    and placing a{" "}
                    <TextAccentWrapper>page.tsx</TextAccentWrapper> file inside
                    it. So now all routes with the format{" "}
                    <TextAccentWrapper>
                        <PathWithBreaks text="/routing/dynamic/[...slug]" />
                    </TextAccentWrapper>{" "}
                    have the <TextAccentWrapper>[...slug]</TextAccentWrapper>{" "}
                    portion of the URL as the dynamic catch-all segment. This
                    setup will match ordinary dynamic route segments conaining a
                    single word like{" "}
                    <TextAccentWrapper>
                        /routing/dynamic/segment
                    </TextAccentWrapper>
                    as well as ones containing multiple forward slashes like{" "}
                    <TextAccentWrapper>
                        /routing/dynamic/a/b/c
                    </TextAccentWrapper>
                    .
                </ParagraphWrapper>

                <div className="text-xs">
                    <FolderStructureCards
                        folderPath={[
                            { name: "app", type: "folder" },
                            { name: "routing", type: "folder" },
                            {
                                name: "dynamic",
                                type: "folder",
                                children: [
                                    { name: "page.tsx", type: "file" },
                                    {
                                        name: "[...slug]",
                                        type: "folder",
                                        children: [
                                            { name: "page.tsx", type: "file" },
                                        ],
                                    },
                                ],
                            },
                        ]}
                    />
                </div>
            </SectionWrapper>

            <SectionWrapper sectionTitle="Dynamic Route Navigation">
                <ParagraphWrapper>
                    Enter a dynamic route segment in the form below to
                    automatically navigate to that route:
                </ParagraphWrapper>

                <DynamicRouteForm baseRoute="/routing/dynamic" />
            </SectionWrapper>

            <SectionWrapper sectionTitle="Cached Dynamic Routes">
                <ParagraphWrapper>
                    Some dynamically routed pages can be statically generated in
                    Next.js. This can be done by adding a{" "}
                    <TextAccentWrapper>
                        generateStaticParams()
                    </TextAccentWrapper>{" "}
                    function to the{" "}
                    <TextAccentWrapper>page.tsx</TextAccentWrapper> file. The
                    function must return an array of objects containing the
                    dynamic routes you want to statically generate. This will
                    cause the page corresponding to the route to be made
                    statically during build time and thus load faster than a
                    dynamic route.
                </ParagraphWrapper>

                <ParagraphWrapper>
                    In this app, the following dynamic routes have been set to
                    be statically generated:
                </ParagraphWrapper>

                <ul className="text-left list-disc max-w-prose text-sm list-outside pl-4 marker:text-accent-700">
                    {STATIC_ROUTES.map((route) => (
                        <li key={crypto.randomUUID()}>
                            <LinkWrapper href={`/routing/dynamic/${route}`}>
                                {`/routing/dynamic/${route}`}
                            </LinkWrapper>
                        </li>
                    ))}
                </ul>
            </SectionWrapper>
        </PageWrapper>
    );
}

export default Page;
