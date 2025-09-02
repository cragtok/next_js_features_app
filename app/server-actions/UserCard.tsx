import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/lib/database/databaseHandler";

interface Props {
    user: User;
    id?: string;
}

const UserCard = ({ user, id }: Props) => {
    return (
        <Card
            className="max-w-prose bg-neutral-100 text-justify rounded-md pt-5 pb-3 max-[400px]:text-center max-[450px]:text-sm"
            id={id}
        >
            <CardContent>
                <p className="text-brand-500 text">
                    <span className="font-semibold">Username:</span>{" "}
                    {user.username}
                </p>
                <p className="text-brand-500 text">
                    <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="text-brand-500 text">
                    <span className="font-semibold">Password:</span>{" "}
                    {user.password}
                </p>
                {user.createdAt && (
                    <p className="text-brand-500 text">
                        <span className="font-semibold">Created At:</span>{" "}
                        {new Date(user.createdAt).toUTCString()}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

export default UserCard;
