import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Fragment } from "react";

const LEFT_PADDING_INCREMENT = 25;

export type FolderItem = File | Folder;

interface File {
    type: "file";
    name: string;
}

interface Folder {
    type: "folder";
    name: string;
    children?: FolderItem[];
}

interface Props {
    folderPath: FolderItem[];
}

const renderItem = (
    type: "file" | "folder",
    name: string,
    leftPadding: number
) => {
    return (
        <Card className="bg-neutral-100 rounded-md pt-5 pb-3">
            <CardHeader>
                <CardTitle
                    className="flex gap-2 text-accent-500 font-semibold"
                    style={{
                        paddingLeft: `${leftPadding}px`,
                    }}
                >
                    {type === "folder" ? <span>🗁</span> : <span>🗐</span>}
                    <span>{name}</span>
                </CardTitle>
            </CardHeader>
        </Card>
    );
};

const renderFile = (name: string, leftPadding: number) =>
    renderItem("file", name, leftPadding);

const renderFolder = (name: string, leftPadding: number) =>
    renderItem("folder", name, leftPadding);

const renderSubFolders = (subFolderItems: FolderItem[], leftPadding: number) =>
    subFolderItems.map((item: FolderItem) => {
        return (
            <Fragment key={crypto.randomUUID()}>
                {item.type === "file"
                    ? renderFile(
                        item.name,
                        leftPadding + LEFT_PADDING_INCREMENT
                    )
                    : renderFolderTree(
                        item,
                        leftPadding + LEFT_PADDING_INCREMENT
                    )}
            </Fragment>
        );
    });

const renderFolderTree = (folder: Folder, leftPadding: number) => {
    if (!folder.children) {
        return renderFolder(folder.name, leftPadding);
    }

    return (
        <>
            {renderFolder(folder.name, leftPadding)}
            {renderSubFolders(folder.children, leftPadding)}
        </>
    );
};

const FolderStructureCards = ({ folderPath }: Props) => {
    return folderPath.map((item, idx) => {
        const leftPadding = idx * LEFT_PADDING_INCREMENT;
        return (
            <Fragment key={crypto.randomUUID()}>
                {item.type === "file"
                    ? renderFile(item.name, leftPadding)
                    : renderFolderTree(item, leftPadding)}
            </Fragment>
        );
    });
};

export default FolderStructureCards;
