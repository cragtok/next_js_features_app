"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { User } from "@/lib/database/databaseHandler";
import { Button } from "@/components/ui/button";
import { parseUserBody } from "@/lib/utils";

interface Props {
    user: User;
    handleSubmit: (user: User) => Promise<boolean>;
}

const EditUserForm = ({ user, handleSubmit }: Props) => {
    const userId = user.id;
    const username = user.username;
    const email = user.email;
    const password = user.password;

    const [editedUsername, setEditedUsername] = useState<string>(username);
    const [editedEmail, setEditedEmail] = useState<string>(email);
    const [editedPassword, setEditedPassword] = useState<string>(password);
    const [errorMessages, setErrorMessages] = useState<Partial<User>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onCancel = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        await handleSubmit({
            id: userId,
            username,
            email,
            password,
        });
    };

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const trimmedUsername = editedUsername.trim();
        const trimmedEmail = editedEmail.trim();
        const password = editedPassword;

        const parseResult = parseUserBody({
            username: trimmedUsername,
            email: trimmedEmail,
            password,
        });

        if (!parseResult.success) {
            setErrorMessages(parseResult.result);
            setIsSubmitting(false);
            return;
        }

        setIsSubmitting(true);
        try {
            await handleSubmit({
                id: userId,
                username: parseResult.result.username,
                email: parseResult.result.email,
                password: parseResult.result.password,
            });
        } catch (e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="grid gap-4 text-left">
            <div className="grid gap-2">
                <Label htmlFor={`username-${userId}`}>Username</Label>
                <Input
                    id={`username-${userId}`}
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                />
                {errorMessages.username && (
                    <p className="text-left text-status-danger-500">
                        {errorMessages.username}
                    </p>
                )}
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`email-${userId}`}>Email</Label>
                <Input
                    id={`email-${userId}`}
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                />
                {errorMessages.email && (
                    <p className="text-left text-status-danger-500">
                        {errorMessages.email}
                    </p>
                )}
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`password-${userId}`}>Password</Label>
                <Input
                    id={`password-${userId}`}
                    value={editedPassword}
                    onChange={(e) => setEditedPassword(e.target.value)}
                />
                {errorMessages.password && (
                    <p className="text-left text-status-danger-500">
                        {errorMessages.password}
                    </p>
                )}
            </div>

            <div className="flex gap-2">
                <Button
                    className="bg-status-warning-500 hover:bg-status-warning-700 w-14 h-8 text-xs"
                    onClick={onSubmit}
                    disabled={isSubmitting}
                >
                    Save
                </Button>

                <Button
                    className="bg-brand-500 hover:bg-brand-700 w-14 h-8 text-xs"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default EditUserForm;
