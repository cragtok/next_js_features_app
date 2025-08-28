"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useActionState, useState, useEffect } from "react";
import { createUser, FormState } from "./actions";
import { USER_LIST_SECTION_ID } from "./constants";
import { toast } from "sonner";
import UserCreationFormFields from "@/components/general/UserCreationFormFields";

const initialState: FormState = {
    message: "",
    errors: {},
};

const ServerActionForm = () => {
    const [state, formAction, pending] = useActionState(
        createUser,
        initialState
    );

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayErrors, setDisplayErrors] = useState<Record<string, string>>(
        {}
    );

    useEffect(() => {
        if (state.errors) {
            setDisplayErrors(state.errors);
        } else {
            setDisplayErrors({});
        }
        if (state.message === "User created successfully!") {
            setUsername("");
            setEmail("");
            setPassword("");
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
    }, [state]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }

        if (displayErrors[name]) {
            setDisplayErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    return (
        <div>
            <Card className="w-full bg-neutral-100 max-[450px]:text-xs">
                <CardHeader className="text-brand-700">
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>
                        Enter your details below to create a new account
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-brand-500 max-[450px]:text-xs ">
                    <form action={formAction}>
                        <UserCreationFormFields
                            displayErrors={displayErrors}
                            username={username}
                            email={email}
                            password={password}
                            handleInputChange={handleInputChange}
                        />
                        <CardFooter className="flex-col gap-2 mt-6">
                            <Button
                                type="submit"
                                className="w-full bg-brand-700 hover:bg-brand-900"
                                disabled={pending}
                            >
                                {pending ? "Submitting..." : "Submit"}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ServerActionForm;
