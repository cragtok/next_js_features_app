"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MAX_SLUG_LENGTH } from "@/lib/utils";
import ButtonWrapper from "@/components/general/ButtonWrapper";

interface Props {
    baseRoute: string;
}

const DynamicRouteForm = ({ baseRoute }: Props) => {
    const [value, setValue] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isNavigating, setIsNavigating] = useState(false);

    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsNavigating(true);
        const trimmedValue = value.trim();
        if (trimmedValue.length > MAX_SLUG_LENGTH) {
            setErrorMessage(
                `Route segment cannot have more than ${MAX_SLUG_LENGTH} characters`
            );
            setShowError(true);
            return;
        }

        if (!trimmedValue) {
            setErrorMessage("URL is empty");
            setShowError(true);
            setIsNavigating(false);
            return;
        }

        if (
            trimmedValue.startsWith("http://") ||
            trimmedValue.startsWith("https://") ||
            trimmedValue.startsWith("//")
        ) {
            setErrorMessage(
                "External URLs are not allowed in dynamic route segments."
            );
            setShowError(true);
            setIsNavigating(false);
            return;
        }

        if (!/^[a-zA-Z0-9\-\_\ /]+$/.test(trimmedValue)) {
            setErrorMessage(
                "Only alphanumeric, spaces, hyphens, underscores, and forward slashes are allowed."
            );
            setShowError(true);
            setIsNavigating(false);
            return;
        }

        const dynamicPath = trimmedValue;
        router.push(`${baseRoute}/${dynamicPath}`);
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
                        data-testid="dynamic-route-input"
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

                <ButtonWrapper disabled={isNavigating}>
                    {isNavigating ? "Navigating..." : "Navigate"}
                </ButtonWrapper>
            </form>
        </div>
    );
};

export default DynamicRouteForm;
