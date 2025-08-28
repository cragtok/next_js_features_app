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

function useUserFormFields(): ReturnValue {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        setUsername("");
        setEmail("");
        setPassword("");
        setDisplayErrors({});
    }, []);

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
