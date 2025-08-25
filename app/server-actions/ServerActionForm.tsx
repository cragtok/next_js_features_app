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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useState, useEffect } from "react";
import { createUser, FormState } from "./actions";
import { USER_LIST_SECTION_ID } from "./constants";
import { toast } from "sonner";

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
                        <div className="flex flex-col gap-6 ">
                            <div className="grid gap-2">
                                <Label
                                    className="font-semibold max-[450px]:text-xs"
                                    htmlFor="username"
                                >
                                    Username
                                </Label>
                                <Input
                                    className="max-[450px]:text-xs"
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    placeholder="5 characters minimum"
                                    value={username}
                                    onChange={handleInputChange}
                                />
                                {displayErrors.username && (
                                    <p className="text-status-danger-500 text-sm max-[450px]:text-xs text-left">
                                        {displayErrors.username}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label
                                    className="font-semibold max-[450px]:text-xs"
                                    htmlFor="email"
                                >
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="text"
                                    required
                                    placeholder="Must be valid email format"
                                    className="max-[450px]:text-xs"
                                    value={email}
                                    onChange={handleInputChange}
                                />
                                {displayErrors.email && (
                                    <p className="text-status-danger-500 text-sm max-[450px]:text-xs text-left">
                                        {displayErrors.email}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label
                                        className="font-semibold max-[450px]:text-xs"
                                        htmlFor="password"
                                    >
                                        Password
                                    </Label>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="5 characters minimum"
                                    className="max-[450px]:text-xs"
                                    value={password}
                                    onChange={handleInputChange}
                                />
                                {displayErrors.password && (
                                    <p className="text-status-danger-500 text-sm max-[450px]:text-xs text-left">
                                        {displayErrors.password}
                                    </p>
                                )}
                            </div>
                        </div>
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
