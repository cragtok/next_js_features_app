import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import ServerActionForm from "./ServerActionForm";
import UsersList from "./UsersList";
import { Toaster } from "sonner";

async function Page() {
    return (
        <PageWrapper pageTitle="Server Actions">
            <Toaster />
            <ParagraphWrapper>
                <TextAccentWrapper>Server Actions</TextAccentWrapper> are
                functions that are executed on the server after a request from a
                client. To mark a function as a Server Action, place the{" "}
                <TextAccentWrapper>&quot;use server&quot;</TextAccentWrapper>{" "}
                directive at the top of the function. To mark all functions in a
                file as Server Actions, place the directive at the top of the
                file. A very common use case for Server Actions is to submit
                form data from the client.
            </ParagraphWrapper>

            <SectionWrapper sectionTitle="User List">
                <ParagraphWrapper classNameOverride="text-center">
                    This is a list of users, simulating a data fetch from a mock
                    database that is located as a file in{" "}
                    <TextAccentWrapper>data/mockDb.json</TextAccentWrapper>:
                </ParagraphWrapper>
                <UsersList />

                <ParagraphWrapper>
                    The users list is fetched within an{" "}
                    <TextAccentWrapper>unstable_cache</TextAccentWrapper>{" "}
                    function, since it is meant to simulate a database. If you
                    are fetching data from a remote API, you can use{" "}
                    <TextAccentWrapper>fetch</TextAccentWrapper> instead. In
                    order to identify the data in the cache, it is marked with a{" "}
                    <TextAccentWrapper>&quot;db-users&quot;</TextAccentWrapper>{" "}
                    tag. If we invalidate this tag in a Server Action, the list
                    of users will have to update itself with any new data.
                </ParagraphWrapper>
            </SectionWrapper>

            <SectionWrapper sectionTitle="User Creation Form">
                <ParagraphWrapper>
                    This form can be used to create a new user. When the form is
                    submitted (with valid data), the data is sent to the server,
                    passed to the Server Action, checked for validity, and used
                    to create a new user. To add the new user to the list above,
                    the <TextAccentWrapper>revalidateTag</TextAccentWrapper>{" "}
                    function is called in the Server Action to invalidate the
                    user cache marked with the{" "}
                    <TextAccentWrapper>&quot;db-users&quot;</TextAccentWrapper>{" "}
                    tag. This will cause the users list to be fetched again and
                    thus updated with the newly created user.
                </ParagraphWrapper>

                <ServerActionForm />
            </SectionWrapper>
        </PageWrapper>
    );
}

export default Page;
