/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import ServerActionForm from "@/app/server-actions/ServerActionForm/ServerActionForm";
import { useActionState } from "react";
import { toast } from "sonner";
import useUserFormFields from "@/components/general/UserCreationFormFields/useUserFormFields";

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useActionState: jest.fn(),
}));

jest.mock("@/app/server-actions/actions", () => ({
    createUserAction: jest.fn(),
}));

jest.mock("sonner", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

jest.mock(
    "@/components/general/UserCreationFormFields/useUserFormFields",
    () => ({
        __esModule: true,
        default: jest.fn(() => ({
            username: "",
            email: "",
            password: "",
            displayErrors: {},
            setDisplayErrors: jest.fn(),
            handleInputChange: jest.fn(),
            resetFields: jest.fn(),
        })),
    })
);

jest.mock(
    "@/components/general/UserCreationFormFields/UserCreationFormFields",
    () => {
        return jest.fn((props) => (
            <div data-testid="mock-user-creation-form-fields">
                <input
                    data-testid="username-input"
                    value={props.username}
                    onChange={props.handleInputChange}
                    disabled={props.disableInputs}
                />
                <input
                    data-testid="email-input"
                    value={props.email}
                    onChange={props.handleInputChange}
                    disabled={props.disableInputs}
                />
                <input
                    data-testid="password-input"
                    value={props.password}
                    onChange={props.handleInputChange}
                    disabled={props.disableInputs}
                />
                {Object.keys(props.displayErrors).map((key) => (
                    <p key={key} data-testid={`${key}-error`}>
                        {props.displayErrors[key]}
                    </p>
                ))}
            </div>
        ));
    }
);

describe("ServerActionForm", () => {
    const mockFormAction = jest.fn();
    const mockSetDisplayErrors = jest.fn();
    const mockResetFields = jest.fn();
    const mockHandleInputChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useActionState as jest.Mock).mockReturnValue([
            { message: "", errors: {} },
            mockFormAction,
            false,
        ]);
        (useUserFormFields as jest.Mock).mockReturnValue({
            username: "",
            email: "",
            password: "",
            displayErrors: {},
            setDisplayErrors: mockSetDisplayErrors,
            handleInputChange: mockHandleInputChange,
            resetFields: mockResetFields,
        });

        window.HTMLElement.prototype.scrollIntoView = jest.fn();
    });

    describe("rendering", () => {
        it("should render the form title and description", () => {
            render(<ServerActionForm />);
            expect(screen.getByText("Create an Account")).toBeInTheDocument();
            expect(
                screen.getByText(
                    "Enter your details below to create a new account"
                )
            ).toBeInTheDocument();
        });
        it("should render the UserCreationFormFields component", () => {
            render(<ServerActionForm />);
            expect(
                screen.getByTestId("mock-user-creation-form-fields")
            ).toBeInTheDocument();
        });
        it("should render the submit button", () => {
            render(<ServerActionForm />);
            expect(screen.getByTestId("submit-button")).toBeInTheDocument();
            expect(screen.getByText("Submit")).toBeInTheDocument();
        });
    });

    describe("form submission and loading state", () => {
        it("should call formAction on submit", async () => {
            render(<ServerActionForm />);
            const form = screen.getByRole("form");
            fireEvent.submit(form);
            expect(mockFormAction).toHaveBeenCalledTimes(1);
        });

        it("should disable inputs and button when pending is true", () => {
            (useActionState as jest.Mock).mockReturnValue([
                { message: "", errors: {} },
                mockFormAction,
                true,
            ]);
            render(<ServerActionForm />);
            expect(screen.getByTestId("username-input")).toBeDisabled();
            expect(screen.getByTestId("email-input")).toBeDisabled();
            expect(screen.getByTestId("password-input")).toBeDisabled();
            expect(screen.getByTestId("submit-button")).toBeDisabled();
        });

        it("should show 'Submitting...' on button when pending is true", () => {
            (useActionState as jest.Mock).mockReturnValue([
                { message: "", errors: {} },
                mockFormAction,
                true,
            ]);
            render(<ServerActionForm />);
            expect(screen.getByTestId("submit-button")).toHaveTextContent(
                "Submitting..."
            );
        });
    });

    describe("success state", () => {
        beforeEach(() => {
            (useActionState as jest.Mock).mockReturnValue([
                { message: "User created successfully!", errors: {} },
                mockFormAction,
                false,
            ]);
        });

        it("should display a success toast on successful user creation", () => {
            render(<ServerActionForm />);
            expect(toast.success).toHaveBeenCalledTimes(1);
        });

        it("should reset form fields on successful user creation", () => {
            render(<ServerActionForm />);
            expect(mockResetFields).toHaveBeenCalledTimes(1);
        });

        it("should scroll to the user list section on successful user creation", () => {
            render(<ServerActionForm />);
            const userListSection = document.createElement("div");
            userListSection.id = "user-list-section";
            document.body.appendChild(userListSection);
            render(<ServerActionForm />);
            expect(userListSection.scrollIntoView).toHaveBeenCalledTimes(1);
        });

        it("should clear display errors on successful user creation", () => {
            render(<ServerActionForm />);
            expect(mockSetDisplayErrors).toHaveBeenCalledWith({});
        });
    });

    describe("error state", () => {
        it("should display errors from action state", () => {
            const mockErrors = { username: "Username is invalid" };
            (useActionState as jest.Mock).mockReturnValue([
                { message: "", errors: mockErrors },
                mockFormAction,
                false,
            ]);
            render(<ServerActionForm />);
            expect(mockSetDisplayErrors).toHaveBeenCalledWith(mockErrors);
        });

        it("should clear errors when action state has no errors", () => {
            (useActionState as jest.Mock).mockReturnValue([
                { message: "", errors: {} },
                mockFormAction,
                false,
            ]);
            render(<ServerActionForm />);
            expect(mockSetDisplayErrors).toHaveBeenCalledWith({});
        });
    });
});
