import { getCachedUsers, User } from "@/lib/database/databaseHandler";
import { Card, CardContent } from "@/components/ui/card";
import { USER_LIST_SECTION_ID } from "./constants";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";

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
        <div className="flex flex-col gap-3 text-sm">
            {users.map((user, idx) => (
                <Card
                    key={user.id}
                    className="bg-neutral-100"
                    id={
                        idx === users.length - 1
                            ? USER_LIST_SECTION_ID
                            : undefined
                    }
                >
                    <CardContent className="text-justify">
                        <p className="text-brand-500 text">
                            <span className="font-semibold">Username:</span>{" "}
                            {user.username}
                        </p>
                        <p className="text-brand-500 text">
                            <span className="font-semibold">Email:</span>{" "}
                            {user.email}
                        </p>
                        <p className="text-brand-500 text">
                            <span className="font-semibold">Password:</span>{" "}
                            {user.password}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default UsersList;
