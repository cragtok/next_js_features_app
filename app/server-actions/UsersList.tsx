import { getCachedUsers, User } from "@/lib/database/databaseHandler";
import { Card, CardContent } from "@/components/ui/card";
import { USER_LIST_SECTION_ID } from "./constants";

export default async function UsersList() {
    const cachedUsers: User[] = await getCachedUsers();
    return (
        <div className="flex flex-col gap-3 text-sm">
            {cachedUsers.map((user, idx) => (
                <Card
                    key={user.id}
                    className="bg-neutral-100"
                    id={
                        idx === cachedUsers.length - 1
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
}
