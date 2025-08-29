"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Skeleton } from "@/components/ui/skeleton";

const UsersList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState<Record<string, boolean>>({});
    const lastItemRef = useRef<HTMLDivElement>(null);

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
        return (
            <Card className="bg-neutral-100">
                <CardHeader>
                    <Skeleton className="h-4 w-full bg-brand-50" />
                    <Skeleton className="h-4 w-full bg-brand-50" />
                    <Skeleton className="h-4 w-full bg-brand-50" />
                    <Skeleton className="h-4 w-full bg-brand-50" />
                </CardHeader>
            </Card>
        );
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
        try {
            await deleteUser(userId);
            toast.success("Successfully deleted user!", {
                position: "top-center",
                richColors: true,
            });
        } catch (error) {
            console.error(error);
            toast.error("Error deleting user!", {
                position: "top-center",
                richColors: true,
            });
        } finally {
            setUsers((prev) => prev.filter((user) => user.id !== userId));
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
                <Card className="bg-neutral-100">
                    <CardHeader>
                        <CardTitle className="text-accent-500 wrap-anywhere">
                            No Users In Database
                        </CardTitle>
                    </CardHeader>
                </Card>
            </>
        );
    }

    return (
        <>
            <CreateUserForm handleCreateUser={handleCreateUser} />
            {users.map((user, idx) => (
                <Card key={user.id} className="bg-neutral-100 text-brand-500">
                    <CardHeader className="flex flex-col gap-2 align-center">
                        <CardTitle className="text-accent-500 wrap-anywhere">
                            {user.username}
                        </CardTitle>

                        <div className="flex flex-row gap-2">
                            {!editMode[user.id] && (
                                <Button
                                    className="bg-brand-500 hover:bg-brand-700 w-12 h-8 text-xs"
                                    onClick={() => toggleEditMode(user.id)}
                                >
                                    Edit
                                </Button>
                            )}
                            <Button
                                onClick={() => handleDeleteUser(user.id)}
                                className="bg-status-danger-500 hover:bg-status-danger-700 w-14 h-8 text-xs"
                            >
                                Delete
                            </Button>
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
                </Card>
            ))}
        </>
    );
};

export default UsersList;
