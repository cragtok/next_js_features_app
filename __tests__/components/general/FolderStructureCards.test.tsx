/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import FolderStructureCards, {
    FolderItem,
} from "@/components/general/FolderStructureCards";

jest.mock("lucide-react", () => ({
    FolderIcon: () => <span data-testid="folder-icon" />,
    FileText: () => <span data-testid="file-icon" />,
}));

describe("FolderStructureCards", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render a simple folder path with a folder and a file", () => {
        const folderPath: FolderItem[] = [
            {
                type: "folder",
                name: "folder",
            },
            {
                type: "file",
                name: "file.txt",
            },
        ];

        render(<FolderStructureCards folderPath={folderPath} />);

        const folder = screen.getByText("folder");
        expect(folder).toBeInTheDocument();
        expect(folder.parentNode).toHaveStyle({ "padding-left": "0px" });
        expect(screen.getByTestId("folder-icon")).toBeInTheDocument();

        const file = screen.getByText("file.txt");
        expect(file).toBeInTheDocument();
        expect(screen.getByTestId("file-icon")).toBeInTheDocument();
        expect(file.parentNode).toHaveStyle({ "padding-left": "25px" });
    });

    it("should render a folder path containing nested folders", () => {
        const folderPath: FolderItem[] = [
            {
                type: "folder",
                name: "parentFolder",
                children: [
                    {
                        type: "folder",
                        name: "childFolder",
                        children: [
                            {
                                type: "file",
                                name: "file1.txt",
                            },

                            {
                                type: "file",
                                name: "file2.txt",
                            },
                        ],
                    },
                ],
            },
        ];

        render(<FolderStructureCards folderPath={folderPath} />);

        const folder = screen.getByText("parentFolder");
        expect(folder).toBeInTheDocument();
        expect(folder.parentNode).toHaveStyle({ "padding-left": "0px" });
        expect(screen.getAllByTestId("folder-icon")[0]).toBeInTheDocument();

        const childFolder = screen.getByText("childFolder");
        expect(childFolder).toBeInTheDocument();
        expect(childFolder.parentNode).toHaveStyle({ "padding-left": "25px" });
        expect(screen.getAllByTestId("folder-icon")[1]).toBeInTheDocument();

        const file1 = screen.getByText("file1.txt");
        expect(file1).toBeInTheDocument();
        expect(screen.getAllByTestId("file-icon")[0]).toBeInTheDocument();
        expect(file1.parentNode).toHaveStyle({ "padding-left": "50px" });

        const file2 = screen.getByText("file2.txt");
        expect(file2).toBeInTheDocument();
        expect(screen.getAllByTestId("file-icon")[1]).toBeInTheDocument();
        expect(file2.parentNode).toHaveStyle({ "padding-left": "50px" });
    });
});
