/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import CreateUserForm from "@/app/route-handlers/UsersSection/CreateUserForm";
import useUserFormFields from "@/components/general/UserCreationFormFields/useUserFormFields";
import { parseUserBody } from "@/lib/utils";
import userEvent from "@testing-library/user-event";

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
            isSubmitting: false,
            setIsSubmitting: jest.fn(),
            displayErrors: {},
            setDisplayErrors: jest.fn(),
            handleInputChange: jest.fn(),
            resetFields: jest.fn(),
        })),
    })
);

jest.mock("@/lib/utils", () => ({
    parseUserBody: jest.fn(),
    cn: jest.fn((...args) => args.join(" ")),
}));

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
            </div>
        ));
    }
);

describe("CreateUserForm", () => {
    const mockHandleCreateUser = jest.fn();
    const mockSetIsSubmitting = jest.fn();
    const mockSetDisplayErrors = jest.fn();
    const mockHandleInputChange = jest.fn();
    const mockResetFields = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useUserFormFields as jest.Mock).mockReturnValue({
            username: "",
            email: "",
            password: "",
            isSubmitting: false,
            setIsSubmitting: mockSetIsSubmitting,
            displayErrors: {},
            setDisplayErrors: mockSetDisplayErrors,
            handleInputChange: mockHandleInputChange,
            resetFields: mockResetFields,
        });
        (parseUserBody as jest.Mock).mockReturnValue({
            success: true,
            result: {
                username: "test",
                email: "test@example.com",
                password: "password",
            },
        });
    });

    describe("rendering", () => {
        beforeEach(async () => {
            render(<CreateUserForm handleCreateUser={mockHandleCreateUser} />);
            // Open the accordion to make form fields visible
            await userEvent.click(screen.getByText("Create New User"));
        });

        it("should render the accordion trigger", () => {
            expect(screen.getByText("Create New User")).toBeInTheDocument();
        });
        it("should render the UserCreationFormFields component", () => {
            expect(
                screen.getByTestId("mock-user-creation-form-fields")
            ).toBeInTheDocument();
        });
        it("should render the create user button", () => {
            expect(
                screen.getByTestId("create-user-submit-button")
            ).toBeInTheDocument();
            expect(screen.getByText("Create User")).toBeInTheDocument();
        });
        it("should have the create user button enabled initially", () => {
            expect(
                screen.getByTestId("create-user-submit-button")
            ).toBeEnabled();
        });
        it("should have inputs enabled initially", () => {
            expect(screen.getByTestId("username-input")).toBeEnabled();
            expect(screen.getByTestId("email-input")).toBeEnabled();
            expect(screen.getByTestId("password-input")).toBeEnabled();
        });
    });

    describe("form submission - valid data", () => {
        const validUserData = {
            username: "testuser",
            email: "test@example.com",
            password: "password123",
        };

        beforeEach(async () => {
            (useUserFormFields as jest.Mock).mockReturnValue({
                username: validUserData.username,
                email: validUserData.email,
                password: validUserData.password,
                isSubmitting: false,
                setIsSubmitting: mockSetIsSubmitting,
                displayErrors: {},
                setDisplayErrors: mockSetDisplayErrors,
                handleInputChange: mockHandleInputChange,
                resetFields: mockResetFields,
            });
            (parseUserBody as jest.Mock).mockReturnValue({
                success: true,
                result: validUserData,
            });
            mockHandleCreateUser.mockResolvedValue(true);

            render(<CreateUserForm handleCreateUser={mockHandleCreateUser} />);
            await userEvent.click(screen.getByText("Create New User")); // Open accordion
        });

        it("should call handleCreateUser with correct data", async () => {
            await userEvent.click(
                screen.getByTestId("create-user-submit-button")
            );
            expect(mockHandleCreateUser).toHaveBeenCalledTimes(1);
            expect(mockHandleCreateUser).toHaveBeenCalledWith(validUserData);
        });

        it("should reset form fields after successful creation", async () => {
            await userEvent.click(
                screen.getByTestId("create-user-submit-button")
            );
            expect(mockResetFields).toHaveBeenCalledTimes(1);
        });

        it("should set isSubmitting to true during submission and false afterwards", async () => {
            mockHandleCreateUser.mockImplementationOnce(() => {
                expect(mockSetIsSubmitting).toHaveBeenCalledWith(true);
                return Promise.resolve(true);
            });

            await userEvent.click(
                screen.getByTestId("create-user-submit-button")
            );
            expect(mockSetIsSubmitting).toHaveBeenCalledWith(false);
            expect(mockSetIsSubmitting).toHaveBeenCalledTimes(2); // true then false
        });

        it("should disable inputs and button during submission", async () => {
            mockHandleCreateUser.mockImplementationOnce(() => {
                // Simulate pending state during the async operation
                (useUserFormFields as jest.Mock).mockReturnValue({
                    ...useUserFormFields(),
                    isSubmitting: true,
                });
                render(
                    <CreateUserForm handleCreateUser={mockHandleCreateUser} />
                ); // Re-render to reflect pending state

                expect(screen.getByTestId("username-input")).toBeDisabled();
                expect(screen.getByTestId("email-input")).toBeDisabled();
                expect(screen.getByTestId("password-input")).toBeDisabled();
                expect(
                    screen.getByTestId("create-user-submit-button")
                ).toBeDisabled();
                return Promise.resolve(true);
            });

            await userEvent.click(
                screen.getByTestId("create-user-submit-button")
            );

            // After submission, they should be re-enabled (due to setIsSubmitting(false))
            expect(screen.getByTestId("username-input")).toBeEnabled();
            expect(screen.getByTestId("email-input")).toBeEnabled();
            expect(screen.getByTestId("password-input")).toBeEnabled();
            expect(
                screen.getByTestId("create-user-submit-button")
            ).toBeEnabled();
        });

        it("should show 'Creating...' on button during submission", async () => {
            mockHandleCreateUser.mockImplementationOnce(() => {
                // Simulate pending state during the async operation
                (useUserFormFields as jest.Mock).mockReturnValue({
                    ...useUserFormFields(),
                    isSubmitting: true,
                });
                render(
                    <CreateUserForm handleCreateUser={mockHandleCreateUser} />
                ); // Re-render to reflect pending state

                expect(
                    screen.getByTestId("create-user-submit-button")
                ).toHaveTextContent("Creating...");
                return Promise.resolve(true);
            });

            await userEvent.click(
                screen.getByTestId("create-user-submit-button")
            );

            // After submission, it should revert to "Create User"
            expect(
                screen.getByTestId("create-user-submit-button")
            ).toHaveTextContent("Create User");
        });
    });

    describe("form submission - invalid data (validation errors)", () => {
        const mockValidationErrors = {
            username: "Username is too short",
            email: "Invalid email format",
        };

        beforeEach(async () => {
            (useUserFormFields as jest.Mock).mockReturnValue({
                username: "short",
                email: "invalid-email",
                password: "pass",
                isSubmitting: false,
                setIsSubmitting: mockSetIsSubmitting,
                displayErrors: {},
                setDisplayErrors: mockSetDisplayErrors,
                handleInputChange: mockHandleInputChange,
                resetFields: mockResetFields,
            });
            (parseUserBody as jest.Mock).mockReturnValue({
                success: false,
                result: mockValidationErrors,
            });
            mockHandleCreateUser.mockResolvedValue(true);

            render(<CreateUserForm handleCreateUser={mockHandleCreateUser} />);
            await userEvent.click(screen.getByText("Create New User")); // Open accordion
        });

        it("should not call handleCreateUser", async () => {
            await userEvent.click(
                screen.getByTestId("create-user-submit-button")
            );
            expect(mockHandleCreateUser).not.toHaveBeenCalled();
        });

        it("should not reset form fields", async () => {
            await userEvent.click(
                screen.getByTestId("create-user-submit-button")
            );
            expect(mockResetFields).not.toHaveBeenCalled();
        });

        it("should set isSubmitting to true during validation and false afterwards", async () => {
            await userEvent.click(
                screen.getByTestId("create-user-submit-button")
            );
            expect(mockSetIsSubmitting).toHaveBeenCalledWith(true);
            expect(mockSetIsSubmitting).toHaveBeenCalledWith(false);
            expect(mockSetIsSubmitting).toHaveBeenCalledTimes(2); // true then false
        });
    });

    describe("form submission - handleCreateUser fails", () => {
        const validUserData = {
            username: "testuser",
            email: "test@example.com",
            password: "password123",
        };

        beforeEach(async () => {
            (useUserFormFields as jest.Mock).mockReturnValue({
                username: validUserData.username,
                email: validUserData.email,
                password: validUserData.password,
                isSubmitting: false,
                setIsSubmitting: mockSetIsSubmitting,
                displayErrors: {},
                setDisplayErrors: mockSetDisplayErrors,
                handleInputChange: mockHandleInputChange,
                resetFields: mockResetFields,
            });
            (parseUserBody as jest.Mock).mockReturnValue({
                success: true,
                result: validUserData,
            });
            mockHandleCreateUser.mockResolvedValue(false); // Simulate handleCreateUser failing

            render(<CreateUserForm handleCreateUser={mockHandleCreateUser} />);
            await userEvent.click(screen.getByText("Create New User")); // Open accordion
        });

        it("should not reset form fields if handleCreateUser returns false", async () => {
            await userEvent.click(
                screen.getByTestId("create-user-submit-button")
            );
            expect(mockHandleCreateUser).toHaveBeenCalledTimes(1);
            expect(mockResetFields).not.toHaveBeenCalled();
        });
    });
});
