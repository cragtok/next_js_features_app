import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserInfo from "./UserInfo";
import EditUserForm from "./EditUserForm";
import ButtonWrapper from "@/components/general/ButtonWrapper";
import { User } from "@/lib/database/databaseHandler";
import { useState } from "react";
import CardWrapper from "@/components/general/CardWrapper";

interface Props {
    user: User;
    onDelete: (userId: string) => Promise<void>;
    onUpdate: (editedUser: User) => Promise<boolean>;
    lastItemRef: React.RefObject<HTMLDivElement | null> | null;
}

const UserCardContainer = ({
    user,
    onDelete,
    onUpdate,
    lastItemRef,
}: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleEditMode = () => setIsEditing((prev) => !prev);

    const handleDeleteClick = async () => {
        setIsSubmitting(true);
        await onDelete(user.id);
        setIsSubmitting(false);
    };

    const handleUpdateSubmit = async (editedUser: User) => {
        setIsSubmitting(true);
        const success = await onUpdate(editedUser);
        if (success) {
            toggleEditMode();
        }
        setIsSubmitting(false);
        return success;
    };

    return (
        <CardWrapper classNameOverride="text-justify">
            <CardHeader className="flex flex-col gap-2 max-[400px]:items-center">
                <CardTitle className="text-accent-500 wrap-anywhere" data-testid="user-username">
                    {user.username}
                </CardTitle>

                <div className="flex flex-row gap-2">
                    {!isEditing && (
                        <>
                            <ButtonWrapper
                                classNameOverride="w-12 h-8 text-xs"
                                onClick={toggleEditMode}
                                disabled={isSubmitting}
                            >
                                Edit
                            </ButtonWrapper>

                            <ButtonWrapper
                                onClick={handleDeleteClick}
                                classNameOverride="w-14 h-8 text-xs"
                                buttonColor="status-danger"
                                disabled={isSubmitting}
                            >
                                Delete
                            </ButtonWrapper>
                        </>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {isEditing ? (
                    <EditUserForm
                        user={user}
                        handleSubmit={handleUpdateSubmit}
                        handleCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <UserInfo
                        email={user.email}
                        password={user.password}
                        createdAt={user.createdAt || undefined}
                        lastItemRef={lastItemRef}
                    />
                )}
            </CardContent>
        </CardWrapper>
    );
};

export default UserCardContainer;
