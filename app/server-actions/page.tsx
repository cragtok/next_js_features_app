import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import ServerActionForm from "./ServerActionForm";
import UsersList from "./UsersList";
import { DB_CACHE_TAG } from "@/lib/database/constants";

async function Page() {
    return (
        <PageWrapper pageTitle="Server Actions">
            <ParagraphWrapper>
                <TextAccentWrapper>Server Actions</TextAccentWrapper> are
                functions that are executed on the server as a result of a
                request from a client. To mark a function as a Server Action,
                place the{" "}
                <TextAccentWrapper>&quot;use server&quot;</TextAccentWrapper>{" "}
                directive at the top of the function. To mark all functions in a
                file as Server Actions, place the directive at the top of the
                file. A very common use case for Server Actions is to submit
                form data from the client to the server.
            </ParagraphWrapper>

            <SectionWrapper sectionTitle="Users List">
                <ParagraphWrapper classNameOverride="text-center">
                    This is a list of users fetched from a database:
                </ParagraphWrapper>
                <UsersList />
                <ParagraphWrapper>
                    The users are fetched within an{" "}
                    <TextAccentWrapper>unstable_cache</TextAccentWrapper>{" "}
                    function, since it is meant to run a database query. If you
                    are fetching data from a remote API, you can use the{" "}
                    <TextAccentWrapper>fetch</TextAccentWrapper> function
                    instead. In order to identify the data in the cache, it is
                    marked with a{" "}
                    <TextAccentWrapper>
                        &quot;{DB_CACHE_TAG}&quot;
                    </TextAccentWrapper>{" "}
                    tag in the{" "}
                    <TextAccentWrapper>unstable_cache</TextAccentWrapper>{" "}
                    function. If we invalidate this tag in a Server Action, the
                    list of users will have to update itself with any new data.
                </ParagraphWrapper>
            </SectionWrapper>

            <SectionWrapper sectionTitle="User Creation Form">
                <ParagraphWrapper>
                    This form can be used to create a new user in the database.
                    When the form is submitted, the data is sent to the server,
                    passed to the Server Action, checked for validity, and used
                    to store a new user. To add the new user to the list above,
                    the <TextAccentWrapper>revalidateTag</TextAccentWrapper>{" "}
                    function is called in the Server Action to invalidate the
                    user cache marked with the{" "}
                    <TextAccentWrapper>
                        &quot;{DB_CACHE_TAG}&quot;
                    </TextAccentWrapper>{" "}
                    tag. This will cause the users list to be fetched again and
                    thus updated with the newly created user.
                </ParagraphWrapper>

                <ServerActionForm />
            </SectionWrapper>
        </PageWrapper>
    );
}

export default Page;
