"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/database/databaseHandler";
import { parseUserBody } from "@/lib/utils";
import UserCreationFormFields from "@/components/general/UserCreationFormFields";
import useUserFormFields from "@/components/hooks/useUserFormFields";

interface Props {
    handleCreateUser: (user: Omit<User, "id">) => Promise<boolean>;
}

const CreateUserForm = ({ handleCreateUser }: Props) => {
    const {
        username,
        email,
        password,
        isSubmitting,
        setIsSubmitting,
        displayErrors,
        setDisplayErrors,
        handleInputChange,
        resetFields,
    } = useUserFormFields();

    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();

        try {
            const parseResult = parseUserBody({
                username: trimmedUsername,
                email: trimmedEmail,
                password,
            });

            if (!parseResult.success) {
                setDisplayErrors(parseResult.result);
                return;
            }

            if (
                await handleCreateUser({
                    username: parseResult.result.username,
                    email: parseResult.result.email,
                    password: parseResult.result.password,
                })
            ) {
                resetFields();
            }
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
                                <UserCreationFormFields
                                    displayErrors={displayErrors}
                                    username={username}
                                    password={password}
                                    email={email}
                                    handleInputChange={handleInputChange}
                                />
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
