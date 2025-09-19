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
        expect(folder.previousSibling).toHaveTextContent("🗁");

        const file = screen.getByText("file.txt");
        expect(file).toBeInTheDocument();
        expect(file.previousSibling).toHaveTextContent("🗐");
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
        expect(folder.previousSibling).toHaveTextContent("🗁");

        const childFolder = screen.getByText("childFolder");
        expect(childFolder).toBeInTheDocument();
        expect(childFolder.parentNode).toHaveStyle({ "padding-left": "25px" });
        expect(childFolder.previousSibling).toHaveTextContent("🗁");

        const file1 = screen.getByText("file1.txt");
        expect(file1).toBeInTheDocument();
        expect(file1.previousSibling).toHaveTextContent("🗐");
        expect(file1.parentNode).toHaveStyle({ "padding-left": "50px" });

        const file2 = screen.getByText("file1.txt");
        expect(file2).toBeInTheDocument();
        expect(file2.previousSibling).toHaveTextContent("🗐");
        expect(file2.parentNode).toHaveStyle({ "padding-left": "50px" });
    });
});
