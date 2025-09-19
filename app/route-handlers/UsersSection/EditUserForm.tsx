"use client";
import { User } from "@/lib/database/databaseHandler";
import ButtonWrapper from "@/components/general/ButtonWrapper";
import { parseUserBody } from "@/lib/utils";
import UserCreationFormFields from "@/components/general/UserCreationFormFields/UserCreationFormFields";
import useUserFormFields from "@/components/general/UserCreationFormFields/useUserFormFields";

interface Props {
    user: User;
    handleSubmit: (user: User) => Promise<boolean>;
    handleCancel: () => void;
}

const EditUserForm = ({ user, handleSubmit, handleCancel }: Props) => {
    const originalUserId = user.id;
    const originalUsername = user.username;
    const originalEmail = user.email;
    const originalPassword = user.password;

    const {
        username,
        email,
        password,
        displayErrors,
        setDisplayErrors,
        isSubmitting,
        setIsSubmitting,
        handleInputChange,
        resetFields,
    } = useUserFormFields({
        originalUsername,
        originalEmail,
        originalPassword,
    });

    const onCancel = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        resetFields();
        handleCancel();
    };

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();

        const parseResult = parseUserBody({
            username: trimmedUsername,
            email: trimmedEmail,
            password,
        });

        if (!parseResult.success) {
            setDisplayErrors(parseResult.result);
            setIsSubmitting(false);
            return;
        }

        if (
            originalUsername === parseResult.result.username &&
            originalPassword === parseResult.result.password &&
            originalEmail === parseResult.result.email
        ) {
            setIsSubmitting(false);
            handleCancel();
            return;
        }

        try {
            await handleSubmit({
                id: originalUserId,
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
        <form className="grid gap-4 text-left text-brand-500">
            <UserCreationFormFields
                disableInputs={isSubmitting}
                displayErrors={displayErrors}
                username={username}
                email={email}
                password={password}
                handleInputChange={handleInputChange}
            />

            <div className="flex gap-2">
                <ButtonWrapper
                    buttonColor="status-warning"
                    classNameOverride="w-14 h-8 text-xs"
                    onClick={onSubmit}
                    disabled={isSubmitting}
                >
                    Save
                </ButtonWrapper>

                <ButtonWrapper
                    onClick={onCancel}
                    classNameOverride="w-14 h-8 text-xs"
                    disabled={isSubmitting}
                >
                    Cancel
                </ButtonWrapper>
            </div>
        </form>
    );
};

export default EditUserForm;
