import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import FolderStructureCards from "@/components/general/FolderStructureCards";
import UsersSection from "./UsersSection/UsersSection";
import PathWithBreaks from "@/components/general/PathWithBreaks";

function Page() {
    return (
        <PageWrapper pageTitle="Route Handlers">
            <SectionWrapper>
                <ParagraphWrapper>
                    <TextAccentWrapper>Route Handlers</TextAccentWrapper> in
                    Next.js provide a simple way to create custom HTTP request
                    handlers for specific routes. They act as an API layer
                    directly within the{" "}
                    <TextAccentWrapper>app</TextAccentWrapper> directory. Using
                    them, you can build RESTful APIs, handle webhooks, or
                    perform server-side logic for various HTTP methods (
                    <TextAccentWrapper>GET</TextAccentWrapper>,{" "}
                    <TextAccentWrapper>POST</TextAccentWrapper>,{" "}
                    <TextAccentWrapper>PUT</TextAccentWrapper>,{" "}
                    <TextAccentWrapper>DELETE</TextAccentWrapper>, etc). To
                    create them, you export functions with corresponding HTTP
                    method names (e.g.{" "}
                    <TextAccentWrapper>GET</TextAccentWrapper>,{" "}
                    <TextAccentWrapper>POST</TextAccentWrapper>) from a{" "}
                    <TextAccentWrapper>route.ts</TextAccentWrapper> file, and
                    handle any request/reponse logic within them.
                </ParagraphWrapper>
            </SectionWrapper>

            <SectionWrapper sectionTitle="Basic CRUD REST API">
                <ParagraphWrapper>
                    In this app, an API with the basic{" "}
                    <TextAccentWrapper>CRUD</TextAccentWrapper> methods (
                    <TextAccentWrapper>
                        GET, POST, PUT, DELETE
                    </TextAccentWrapper>
                    ) was made to demonstrate how route handlers work.
                </ParagraphWrapper>

                <ParagraphWrapper>
                    There is a{" "}
                    <TextAccentWrapper>
                        <PathWithBreaks text="/route-handlers/my-api" />
                    </TextAccentWrapper>{" "}
                    API route which handles{" "}
                    <TextAccentWrapper>GET</TextAccentWrapper> and{" "}
                    <TextAccentWrapper>POST</TextAccentWrapper> requests. This
                    was done by creating a{" "}
                    <TextAccentWrapper>
                        <PathWithBreaks text="/route-handlers/my-api" />
                    </TextAccentWrapper>{" "}
                    folder containing a{" "}
                    <TextAccentWrapper>route.ts</TextAccentWrapper> file
                    defining the route handlers for these methods.
                </ParagraphWrapper>

                <ParagraphWrapper>
                    To handle <TextAccentWrapper>PUT</TextAccentWrapper> and{" "}
                    <TextAccentWrapper>DELETE</TextAccentWrapper> requests, we
                    need to get the <TextAccentWrapper>id</TextAccentWrapper>{" "}
                    field of a user from the URL. The API route formats for
                    these methods will be in the form{" "}
                    <TextAccentWrapper>
                        <PathWithBreaks text="/route-handlers/my-api/[userId]" />
                    </TextAccentWrapper>
                    , where we want to extract the{" "}
                    <TextAccentWrapper>userId</TextAccentWrapper> portion.
                    Therefore, a new{" "}
                    <TextAccentWrapper>[userId]</TextAccentWrapper> folder was
                    made within the{" "}
                    <TextAccentWrapper>my-api</TextAccentWrapper> folder
                    containing a <TextAccentWrapper>route.ts</TextAccentWrapper>{" "}
                    file defining the route handlers for these methods.
                </ParagraphWrapper>

                <div className="text-xs">
                    <FolderStructureCards
                        folderPath={[
                            { name: "app", type: "folder" },
                            {
                                name: "route-handlers",
                                type: "folder",
                                children: [{ name: "page.tsx", type: "file" }],
                            },
                            {
                                name: "my-api",
                                type: "folder",
                                children: [
                                    { name: "route.ts", type: "file" },
                                    {
                                        name: "[userId]",
                                        type: "folder",
                                        children: [
                                            { name: "route.ts", type: "file" },
                                        ],
                                    },
                                ],
                            },
                        ]}
                    />
                </div>
            </SectionWrapper>

            <SectionWrapper sectionTitle="Database CRUD Operations">
                <ParagraphWrapper>
                    In this section, you can perform all the{" "}
                    <TextAccentWrapper>CRUD</TextAccentWrapper> operations on
                    users in the database. All of all the current users in the
                    database rendered here within user cards. Each user card has
                    buttons for editing a user&apos;s information or deleting it
                    from the database. There is also a form for creating new
                    users, which will add a new user to the database and display
                    it in the list below. All these operations are performed
                    using the route handlers from the API.
                </ParagraphWrapper>

                <UsersSection />
            </SectionWrapper>
        </PageWrapper>
    );
}

export default Page;
