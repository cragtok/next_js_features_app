"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { CardContent } from "@/components/ui/card";
import ButtonWrapper from "@/components/general/ButtonWrapper";
import { User } from "@/lib/database/databaseHandler";
import { parseUserBody } from "@/lib/utils";
import UserCreationFormFields from "@/components/general/UserCreationFormFields";
import useUserFormFields from "@/hooks/useUserFormFields";
import CardWrapper from "@/components/general/CardWrapper";

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
                <AccordionContent className="flex flex-col justify-center">
                    <CardWrapper classNameOverride="text-justify max-w-full">
                        <CardContent className="text-brand-500">
                            <form className="flex flex-col gap-6">
                                <UserCreationFormFields
                                    disableInputs={isSubmitting}
                                    displayErrors={displayErrors}
                                    username={username}
                                    password={password}
                                    email={email}
                                    handleInputChange={handleInputChange}
                                />
                                <ButtonWrapper
                                    onClick={onSubmit}
                                    disabled={isSubmitting}
                                >
                                    {!isSubmitting
                                        ? "Create User"
                                        : "Creating..."}
                                </ButtonWrapper>
                            </form>
                        </CardContent>
                    </CardWrapper>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default CreateUserForm;
