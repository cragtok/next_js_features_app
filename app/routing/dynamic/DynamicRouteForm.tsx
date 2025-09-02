"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MAX_SLUG_LENGTH } from "./constants";

interface Props {
    baseRoute: string;
}

const DynamicRouteForm = ({ baseRoute }: Props) => {
    const [value, setValue] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const trimmedValue = value.trim();
        if (trimmedValue.length > MAX_SLUG_LENGTH) {
            setErrorMessage(`Route segment cannot have more than ${MAX_SLUG_LENGTH} characters`);
            setShowError(true);
            return;
        }

        if (!trimmedValue) {
            setErrorMessage("URL is empty");
            setShowError(true);
            return;
        }

        const dynamicPath = encodeURIComponent(trimmedValue);
        router.push(`${baseRoute}/${dynamicPath}`);
        setValue("");
    };

    const onChangeValue = (event: React.FormEvent<HTMLInputElement>) => {
        if (showError) {
            setShowError(false);
            setErrorMessage("");
        }
        setValue(event.currentTarget.value);
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex max-[500px]:flex-col flex-row justify-center gap-3 text-brand-500"
            >
                <div className="w-full">
                    <Input
                        className="text-xs"
                        placeholder="Enter a dynamic route segment"
                        type="text"
                        value={value}
                        onChange={onChangeValue}
                    />
                    {showError && (
                        <p className="text-left pt-4 text-status-danger-300 text-xs">
                            {errorMessage}
                        </p>
                    )}
                </div>

                <Button className="bg-brand-500 hover:bg-brand-700">
                    Navigate
                </Button>
            </form>
        </div>
    );
};

export default DynamicRouteForm;
