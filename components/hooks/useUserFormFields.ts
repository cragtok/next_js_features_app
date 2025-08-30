import { useState, Dispatch, SetStateAction, useCallback } from "react";

interface ReturnValue {
    username: string;
    email: string;
    password: string;
    isSubmitting: boolean;
    setIsSubmitting: Dispatch<SetStateAction<boolean>>;
    displayErrors: Record<string, string>;
    setDisplayErrors: Dispatch<SetStateAction<Record<string, string>>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    resetFields: () => void;
}

interface Props {
    originalUsername?: string;
    originalEmail?: string;
    originalPassword?: string;
}

function useUserFormFields({
    originalUsername,
    originalEmail,
    originalPassword,
}: Props = {}): ReturnValue {
    const [username, setUsername] = useState(originalUsername || "");
    const [email, setEmail] = useState(originalEmail || "");
    const [password, setPassword] = useState(originalPassword || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [displayErrors, setDisplayErrors] = useState<Record<string, string>>(
        {}
    );

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            if (name === "username") {
                setUsername(value);
            } else if (name === "email") {
                setEmail(value);
            } else if (name === "password") {
                setPassword(value);
            }

            if (displayErrors[e.target.name]) {
                setDisplayErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[e.target.name];
                    return newErrors;
                });
            }
        },
        [displayErrors]
    );

    const resetFields = useCallback(() => {
        setUsername(originalUsername || "");
        setEmail(originalEmail || "");
        setPassword(originalPassword || "");
        setDisplayErrors({});
    }, [originalEmail, originalPassword, originalUsername]);

    return {
        username,
        email,
        password,
        isSubmitting,
        setIsSubmitting,
        displayErrors,
        setDisplayErrors,
        handleInputChange,
        resetFields,
    };
}

export default useUserFormFields;
