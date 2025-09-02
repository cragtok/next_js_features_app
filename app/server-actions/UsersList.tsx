import { getCachedUsers, User } from "@/lib/database/databaseHandler";
import UserCard from "./UserCard";
import { USER_LIST_SECTION_ID } from "./constants";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";
import { Card, CardContent } from "@/components/ui/card";

const UsersList = async () => {
    const users: User[] = await getCachedUsers();

    if (users.length < 1) {
        return (
            <Card className="bg-neutral-100">
                <CardContent className="">
                    <TextAccentWrapper>No Users In Database</TextAccentWrapper>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="flex flex-col gap-3">
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
