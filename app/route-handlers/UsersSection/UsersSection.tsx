"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    deleteUser,
    createUser,
    fetchAllUsers,
    updateUser,
} from "./api-client";
import { User } from "@/lib/database/databaseHandler";
import CreateUserForm from "./CreateUserForm";
import { toast } from "sonner";
import UserInfo from "./UserInfo";
import EditUserForm from "./EditUserForm";
import CardWrapper from "@/components/general/CardWrapper";
import ButtonWrapper from "@/components/general/ButtonWrapper";
import LoadingSkeleton from "@/components/general/LoadingSkeleton";

const UsersSection = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState<Record<string, boolean>>({});
    const lastItemRef = useRef<HTMLDivElement>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        async function loadUsers() {
            try {
                const fetchedUsers = await fetchAllUsers();
                setUsers(fetchedUsers);
            } catch (e) {
                console.error(e);
                toast.error("Error fetching users!", {
                    position: "top-center",
                    richColors: true,
                });
            } finally {
                setLoading(false);
            }
        }

        loadUsers();
    }, []);

    if (loading) {
        return <LoadingSkeleton numRows={4} />;
    }

    const toggleEditMode = (userId: string) => {
        setEditMode((prev) => {
            const newEditMode = {
                ...prev,
                [userId]: !prev[userId],
            };

            return newEditMode;
        });
    };

    const handleDeleteUser = async (userId: string) => {
        if (!window.confirm("Are you sure you want to delete the user?")) {
            return;
        }
        setIsDeleting(true);
        try {
            await deleteUser(userId);
        } catch (error) {
            console.error(error);
        } finally {
            setUsers((prev) => prev.filter((user) => user.id !== userId));
            toast.success("Successfully deleted user!", {
                position: "top-center",
                richColors: true,
            });
            setIsDeleting(false);
        }
    };

    const handleCreateUser = async (newUserFields: Omit<User, "id">) => {
        try {
            const newUser = await createUser(newUserFields);
            setUsers((prev) => [...prev, newUser]);
            toast.success("Successfully created user!", {
                position: "top-center",
                richColors: true,
            });
            setTimeout(() => {
                lastItemRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
            }, 2);
            return true;
        } catch (error) {
            const e = error as Error;
            toast.error(e.message, {
                position: "top-center",
                richColors: true,
            });
            return false;
        }
    };

    const handleEditUser = async (originalUser: User, editedUser: User) => {
        if (
            originalUser.username == editedUser.username &&
            originalUser.password == editedUser.password &&
            originalUser.email == editedUser.email
        ) {
            toggleEditMode(originalUser.id);
            return false;
        }

        let result = null;

        try {
            const updatedUser = await updateUser(editedUser);
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                )
            );
            result = true;
        } catch (error) {
            const e = error as Error;
            toast.error(e.message, {
                position: "top-center",
                richColors: true,
            });
            result = false;
        }

        if (result) {
            toast.success("Successfully edited user!", {
                position: "top-center",
                richColors: true,
            });
            toggleEditMode(originalUser.id);
        }

        return result;
    };

    if (users.length === 0) {
        return (
            <>
                <CreateUserForm handleCreateUser={handleCreateUser} />
                <CardWrapper>
                    <CardHeader>
                        <CardTitle className="text-accent-500 wrap-anywhere">
                            No Users In Database
                        </CardTitle>
                    </CardHeader>
                </CardWrapper>
            </>
        );
    }

    return (
        <>
            <CreateUserForm handleCreateUser={handleCreateUser} />
            {users.map((user, idx) => (
                <Fragment key={user.id}>
                    <CardWrapper classNameOverride="text-justify">
                        <CardHeader className="flex flex-col gap-2 ">
                            <CardTitle className="text-accent-500 wrap-anywhere">
                                {user.username}
                            </CardTitle>

                            <div className="flex flex-row gap-2">
                                {!editMode[user.id] && (
                                    <ButtonWrapper
                                        classNameOverride="w-12 h-8 text-xs"
                                        onClick={() => toggleEditMode(user.id)}
                                        disabled={isDeleting}
                                    >
                                        Edit
                                    </ButtonWrapper>
                                )}
                                <ButtonWrapper
                                    onClick={() => handleDeleteUser(user.id)}
                                    classNameOverride="w-14 h-8 text-xs"
                                    buttonColor="status-danger"
                                    disabled={isDeleting}
                                >
                                    Delete
                                </ButtonWrapper>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {editMode[user.id] ? (
                                <EditUserForm
                                    user={user}
                                    handleSubmit={(editedUser) =>
                                        handleEditUser(user, editedUser)
                                    }
                                />
                            ) : (
                                <UserInfo
                                    email={user.email}
                                    password={user.password}
                                    createdAt={user.createdAt || undefined}
                                    lastItemRef={
                                        idx === users.length - 1
                                            ? lastItemRef
                                            : null
                                    }
                                />
                            )}
                        </CardContent>
                    </CardWrapper>
                </Fragment>
            ))}
        </>
    );
};

export default UsersSection;
