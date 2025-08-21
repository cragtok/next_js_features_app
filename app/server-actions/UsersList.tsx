import { getCachedUsers, User } from "./databaseHandler";
import { Card, CardContent } from "@/components/ui/card";

export default async function UsersList() {
    const cachedUsers: User[] = await getCachedUsers();
    return (
        <div className="flex flex-col gap-3 text-sm">
            {cachedUsers.map((user) => (
                <Card key={crypto.randomUUID()} className="bg-neutral-100">
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
