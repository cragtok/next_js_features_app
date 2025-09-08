import { User } from "@/lib/database/databaseHandler";
import UserCard from "./UserCard";
import { USER_LIST_SECTION_ID } from "./constants";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { retrieveUsersFromDb } from "./databaseCall";

const UsersList = async () => {
    let users: User[] | undefined;
    let errorMessage: string = "Error retrieving users";

    try {
        users = await retrieveUsersFromDb();
    } catch (error) {
        console.error(error);
        errorMessage = (error as Error).message;
    }

    if (!users) {
        return (
            <Card className="bg-neutral-100">
                <CardContent className="text-center">
                    <TextAccentWrapper classNameOverride="text-status-danger-500">
                        {errorMessage}
                    </TextAccentWrapper>
                </CardContent>
            </Card>
        );
    }

    if (users.length < 1) {
        return (
            <Card className="bg-neutral-100">
                <CardContent className="text-center">
                    <TextAccentWrapper>No Users In Database</TextAccentWrapper>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="flex flex-col">
            {users.map((user, idx) => (
                <UserCard
                    key={user.id}
                    user={user}
                    id={
                        idx === users.length - 1
                            ? USER_LIST_SECTION_ID
                            : undefined
                    }
                />
            ))}
        </div>
    );
};

export default UsersList;
