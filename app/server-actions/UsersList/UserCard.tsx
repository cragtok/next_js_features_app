import CardWrapper from "@/components/general/CardWrapper";
import { CardContent } from "@/components/ui/card";
import { User } from "@/lib/database/databaseHandler";

interface Props {
    user: User;
    id?: string;
}

const UserCard = ({ user, id }: Props) => {
    return (
        <CardWrapper classNameOverride="text-justify" data-test="user-card">
            <CardContent id={id}>
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
        </CardWrapper>
    );
};

export default UserCard;
