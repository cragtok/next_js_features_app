"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useActionState, useEffect } from "react";
import { createUser, FormState } from "./actions";
import { USER_LIST_SECTION_ID } from "./constants";
import { toast } from "sonner";
import UserCreationFormFields from "@/components/general/UserCreationFormFields";
import useUserFormFields from "@/hooks/useUserFormFields";
import ButtonWrapper from "@/components/general/ButtonWrapper";

const initialState: FormState = {
    message: "",
    errors: {},
};

const ServerActionForm = () => {
    const [state, formAction, pending] = useActionState(
        createUser,
        initialState
    );

    const {
        username,
        email,
        password,
        displayErrors,
        setDisplayErrors,
        handleInputChange,
        resetFields,
    } = useUserFormFields();

    useEffect(() => {
        if (state.errors) {
            setDisplayErrors(state.errors);
        } else {
            setDisplayErrors({});
        }
        if (state.message === "User created successfully!") {
            resetFields();
            const userListSection =
                document.getElementById(USER_LIST_SECTION_ID);
            if (userListSection) {
                userListSection.scrollIntoView({ behavior: "smooth" });
            }
            toast.success("Successfully created user!", {
                position: "top-center",
                richColors: true,
            });
        }
    }, [state, setDisplayErrors, resetFields]);

    return (
        <div>
            <Card className="max-w-prose bg-neutral-100 text-center rounded-md pt-5 pb-3 max-[400px]:text-center max-[450px]:text-sm">
                <CardHeader className="text-brand-500">
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>
                        Enter your details below to create a new account
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-brand-500">
                    <form action={formAction} className="flex flex-col gap-6">
                        <UserCreationFormFields
                            displayErrors={displayErrors}
                            username={username}
                            email={email}
                            password={password}
                            handleInputChange={handleInputChange}
                            disableInputs={pending}
                        />
                        <ButtonWrapper type="submit" disabled={pending}>
                            {pending ? "Submitting..." : "Submit"}
                        </ButtonWrapper>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ServerActionForm;
