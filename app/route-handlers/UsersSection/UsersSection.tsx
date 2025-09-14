"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import {
    deleteUser,
    createUser,
    fetchAllUsers,
    updateUser,
} from "./api-client";
import { User } from "@/lib/database/databaseHandler";
import CreateUserForm from "./CreateUserForm";
import { toast } from "sonner";
import CardWrapper from "@/components/general/CardWrapper";
import LoadingSkeleton from "@/components/general/LoadingSkeleton";
import UserCardContainer from "./UserCardContainer";

const UsersSection = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
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
        return <LoadingSkeleton numRows={4} />;
    }

    const handleDeleteUser = async (userId: string) => {
        if (!window.confirm("Are you sure you want to delete the user?")) {
            return;
        }

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

    const handleEditUser = async (editedUser: User) => {
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
            <div data-test="user-cards-list">
                {users.map((user, idx) => (
                    <Fragment key={user.id}>
                        <UserCardContainer
                            user={user}
                            onDelete={handleDeleteUser}
                            onUpdate={handleEditUser}
                            lastItemRef={
                                idx === users.length - 1 ? lastItemRef : null
                            }
                        />
                    </Fragment>
                ))}
            </div>
        </>
    );
};

export default UsersSection;
