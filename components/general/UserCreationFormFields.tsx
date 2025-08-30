"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    displayErrors: Record<string, string>;
    username: string;
    email: string;
    password: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserCreationFormFields = ({
    displayErrors,
    username,
    email,
    password,
    handleInputChange,
}: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="flex flex-col gap-6">
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
                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="5 characters minimum"
                        className="max-[450px]:text-xs pr-10"
                        value={password}
                        onChange={handleInputChange}
                    />
                    <Button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 h-auto bg-transparent hover:bg-transparent text-brand-500 hover:text-brand-700"
                    >
                        {showPassword ? (
                            <EyeOffIcon className="h-4 w-4" />
                        ) : (
                            <EyeIcon className="h-4 w-4" />
                        )}
                    </Button>
                </div>
                {displayErrors.password && (
                    <p className="text-status-danger-500 text-sm max-[450px]:text-xs text-left">
                        {displayErrors.password}
                    </p>
                )}
            </div>
        </div>
    );
};

export default UserCreationFormFields;
