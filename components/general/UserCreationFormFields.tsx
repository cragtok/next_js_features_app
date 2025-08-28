"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
                <Input
                    id="password"
                    name="password"
                    type="password"
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
    );
};

export default UserCreationFormFields;
