"use client";

import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "./api-client";
import { parseUserBody } from "../my-api/utils";

interface Props {
    handleCreateUser: (user: Omit<User, "id">) => Promise<void>;
}

const CreateUserForm = ({ handleCreateUser }: Props) => {
    const [newUserName, setNewUserName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessages, setErrorMessages] = useState<Partial<User>>({});

    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const parseResult = parseUserBody({
                username: newUserName,
                email: newUserEmail,
                password: newUserPassword,
            });

            if (!parseResult.success) {
                setErrorMessages(parseResult.result);
                return;
            }

            await handleCreateUser({
                username: parseResult.result.username,
                email: parseResult.result.email,
                password: parseResult.result.password,
            });
            setNewUserName("");
            setNewUserEmail("");
            setNewUserPassword("");
            setErrorMessages({});
        } catch (e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Accordion type="single" collapsible className="w-full mb-4">
            <AccordionItem value="item-1">
                <AccordionTrigger className="font-extrabold text-brand-700">
                    Create New User
                </AccordionTrigger>
                <AccordionContent>
                    <Card className="bg-neutral-100 text-brand-500">
                        <CardHeader>
                            <CardTitle>New User Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="new-username">
                                        Username
                                    </Label>
                                    <Input
                                        id="new-username"
                                        value={newUserName}
                                        onChange={(e) =>
                                            setNewUserName(e.target.value)
                                        }
                                    />
                                    {errorMessages.username && (
                                        <p className="text-left text-status-danger-500">
                                            {errorMessages.username}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="new-email">Email</Label>
                                    <Input
                                        id="new-email"
                                        value={newUserEmail}
                                        onChange={(e) =>
                                            setNewUserEmail(e.target.value)
                                        }
                                    />
                                    {errorMessages.email && (
                                        <p className="text-left text-status-danger-500">
                                            {errorMessages.email}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="new-password">
                                        Password
                                    </Label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        value={newUserPassword}
                                        onChange={(e) =>
                                            setNewUserPassword(e.target.value)
                                        }
                                    />
                                    {errorMessages.password && (
                                        <p className="text-left text-status-danger-500">
                                            {errorMessages.password}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    onClick={onSubmit}
                                    className="mt-4 bg-brand-700 hover:bg-brand-800"
                                    disabled={isSubmitting}
                                >
                                    {!isSubmitting
                                        ? "Create User"
                                        : "Creating..."}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default CreateUserForm;
