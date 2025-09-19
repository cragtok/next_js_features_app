/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import UserCreationFormFields from "@/components/general/UserCreationFormFields/UserCreationFormFields";

describe("UserCreationFormFields", () => {
    describe("rendering", () => {
        const mockHandleInputChange = jest.fn();
        const defaultProps = {
            displayErrors: {},
            username: "",
            email: "",
            password: "",
            handleInputChange: mockHandleInputChange,
        };

        it("should render username, email, and password input fields and labels", () => {
            render(<UserCreationFormFields {...defaultProps} />);

            const usernameInput = screen.getByRole("textbox", {
                name: /username/i,
            });
            const emailInput = screen.getByRole("textbox", { name: /email/i });
            const passwordInput = screen.getByLabelText(/password/i);

            expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
            expect(usernameInput).toBeInTheDocument();
            expect(usernameInput).toHaveAttribute("type", "text");
            expect(usernameInput).toHaveAttribute(
                "placeholder",
                "5 characters minimum"
            );

            expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
            expect(emailInput).toBeInTheDocument();
            expect(emailInput).toHaveAttribute("type", "text");
            expect(emailInput).toHaveAttribute(
                "placeholder",
                "Must be valid email format"
            );

            expect(passwordInput).toBeInTheDocument();
            expect(passwordInput).toHaveAttribute("type", "password");
            expect(passwordInput).toHaveAttribute(
                "placeholder",
                "5 characters minimum"
            );
        });
    });

    describe("input values and changes", () => {
        const mockHandleInputChange = jest.fn();
        const defaultProps = {
            displayErrors: {},
            username: "initialUsername",
            email: "initial@example.com",
            password: "initialPassword",
            handleInputChange: mockHandleInputChange,
        };

        it("should display the correct initial values for username, email, and password", () => {
            render(<UserCreationFormFields {...defaultProps} />);

            expect(screen.getByLabelText(/username/i)).toHaveValue(
                "initialUsername"
            );
            expect(screen.getByLabelText(/email/i)).toHaveValue(
                "initial@example.com"
            );
            expect(screen.getByLabelText(/password/i)).toHaveValue(
                "initialPassword"
            );
        });

        it("should call handleInputChange when an input field value changes", async () => {
            let currentUsername = defaultProps.username;
            let currentEmail = defaultProps.email;
            let currentPassword = defaultProps.password;

            // This TestWrapper component simulates a parent component that manages the state
            // of the UserCreationFormFields, as it is a controlled component.
            const TestWrapper = () => {
                const [username, setUsername] = useState(currentUsername);
                const [email, setEmail] = useState(currentEmail);
                const [password, setPassword] = useState(currentPassword);

                const handleInputChange = (
                    e: React.ChangeEvent<HTMLInputElement>
                ) => {
                    const { name, value } = e.target;
                    if (name === "username") setUsername(value);
                    if (name === "email") setEmail(value);
                    if (name === "password") setPassword(value);
                    mockHandleInputChange(e);
                };

                return (
                    <UserCreationFormFields
                        {...defaultProps}
                        username={username}
                        email={email}
                        password={password}
                        handleInputChange={handleInputChange}
                    />
                );
            };

            render(<TestWrapper />);

            const usernameInput = screen.getByLabelText(/username/i);
            const emailInput = screen.getByLabelText(/email/i);
            const passwordInput = screen.getByLabelText(/password/i);

            const newUsernameValue = "newUsername";
            await userEvent.type(usernameInput, newUsernameValue);
            expect(mockHandleInputChange).toHaveBeenCalledTimes(
                newUsernameValue.length
            );
            expect(usernameInput).toHaveValue(
                defaultProps.username + newUsernameValue
            );

            const newEmailValue = "newEmail";
            await userEvent.type(emailInput, newEmailValue);
            expect(mockHandleInputChange).toHaveBeenCalledTimes(
                newUsernameValue.length + newEmailValue.length
            );
            expect(emailInput).toHaveValue(defaultProps.email + newEmailValue);

            const newPasswordValue = "newPassword";
            await userEvent.type(passwordInput, newPasswordValue);
            expect(mockHandleInputChange).toHaveBeenCalledTimes(
                newUsernameValue.length +
                newEmailValue.length +
                newPasswordValue.length
            );
            expect(passwordInput).toHaveValue(
                defaultProps.password + newPasswordValue
            );
        });
    });

    describe("password visibility toggle", () => {
        const mockHandleInputChange = jest.fn();
        const defaultProps = {
            displayErrors: {},
            username: "",
            email: "",
            password: "testpassword",
            handleInputChange: mockHandleInputChange,
        };

        it("should toggle password visibility when the eye icon button is clicked", async () => {
            render(<UserCreationFormFields {...defaultProps} />);

            const passwordInput = screen.getByLabelText(/password/i);
            const toggleButton = screen.getByRole("button");

            expect(passwordInput).toHaveAttribute("type", "password");

            await userEvent.click(toggleButton);
            expect(passwordInput).toHaveAttribute("type", "text");

            await userEvent.click(toggleButton);
            expect(passwordInput).toHaveAttribute("type", "password");
        });

        it("should display the correct eye icon based on password visibility state", async () => {
            render(<UserCreationFormFields {...defaultProps} />);

            const toggleButton = screen.getByRole("button");

            expect(screen.getByTestId("eye-icon")).toBeInTheDocument();
            expect(
                screen.queryByTestId("eye-off-icon")
            ).not.toBeInTheDocument();

            await userEvent.click(toggleButton);

            expect(screen.queryByTestId("eye-icon")).not.toBeInTheDocument();
            expect(screen.getByTestId("eye-off-icon")).toBeInTheDocument();

            await userEvent.click(toggleButton);

            expect(screen.getByTestId("eye-icon")).toBeInTheDocument();
            expect(
                screen.queryByTestId("eye-off-icon")
            ).not.toBeInTheDocument();
        });
    });

    describe("error message display", () => {
        const mockHandleInputChange = jest.fn();
        const defaultProps = {
            username: "",
            email: "",
            password: "",
            handleInputChange: mockHandleInputChange,
        };

        it("should display error messages when displayErrors prop contains errors", () => {
            const errors = {
                username: "Username is required",
                email: "Invalid email format",
                password: "Password is too short",
            };
            render(
                <UserCreationFormFields
                    {...defaultProps}
                    displayErrors={errors}
                />
            );

            expect(screen.getByTestId("username-error-text")).toHaveTextContent(
                errors.username
            );
            expect(screen.getByTestId("email-error-text")).toHaveTextContent(
                errors.email
            );
            expect(screen.getByTestId("password-error-text")).toHaveTextContent(
                errors.password
            );
        });

        it("should not display error messages when displayErrors prop is empty", async () => {
            render(
                <UserCreationFormFields {...defaultProps} displayErrors={{}} />
            );

            expect(
                screen.queryByTestId("username-error-text")
            ).not.toBeInTheDocument();
            expect(
                screen.queryByTestId("email-error-text")
            ).not.toBeInTheDocument();
            expect(
                screen.queryByTestId("password-error-text")
            ).not.toBeInTheDocument();
        });
    });

    describe("input disabling", () => {
        const mockHandleInputChange = jest.fn();
        const defaultProps = {
            displayErrors: {},
            username: "",
            email: "",
            password: "",
            handleInputChange: mockHandleInputChange,
        };

        it("should disable all input fields when disableInputs prop is true", () => {
            render(
                <UserCreationFormFields
                    {...defaultProps}
                    disableInputs={true}
                />
            );

            expect(screen.getByLabelText(/username/i)).toBeDisabled();
            expect(screen.getByLabelText(/email/i)).toBeDisabled();
            expect(screen.getByLabelText(/password/i)).toBeDisabled();
        });

        it("should enable all input fields when disableInputs prop is false or not provided", () => {
            render(
                <UserCreationFormFields
                    {...defaultProps}
                    disableInputs={false}
                />
            );

            expect(screen.getByLabelText(/username/i)).not.toBeDisabled();
            expect(screen.getByLabelText(/email/i)).not.toBeDisabled();
            expect(screen.getByLabelText(/password/i)).not.toBeDisabled();

            render(<UserCreationFormFields {...defaultProps} />);

            expect(screen.getByLabelText(/username/i)).not.toBeDisabled();
            expect(screen.getByLabelText(/email/i)).not.toBeDisabled();
            expect(screen.getByLabelText(/password/i)).not.toBeDisabled();
        });
    });
});
