import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Fragment } from "react";

interface Props {
    folderPath: (File | Folder)[];
}

interface File {
    type: "file";
    name: string;
}

interface Folder {
    type: "folder";
    name: string;
    children?: (File | Folder)[];
}

const LEFT_PADDING_INCREMENT = 25;

const renderItem = (type: string, name: string, leftPadding: number) => {
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

const renderSubFolder = (
    subFolder: (File | Folder)[],
    initialLeftPadding: number
) => (
    <>
        {subFolder.map((item: File | Folder) => {
            return (
                <Fragment key={crypto.randomUUID()}>
                    {item.type === "file"
                        ? renderFile(
                            item.name,
                            initialLeftPadding + LEFT_PADDING_INCREMENT
                        )
                        : renderFolderPath(
                            item,
                            initialLeftPadding + LEFT_PADDING_INCREMENT
                        )}
                </Fragment>
            );
        })}
    </>
);

const renderFolderPath = (folder: Folder, initialLeftPadding: number) => {
    if (!folder.children) {
        return renderFolder(folder.name, initialLeftPadding);
    }

    return (
        <>
            {renderFolder(folder.name, initialLeftPadding)}
            {renderSubFolder(folder.children, initialLeftPadding)}
        </>
    );
};

const FolderStructureCards = ({ folderPath }: Props) => {
    let leftPadding = 0;
    return (
        <>
            {folderPath.map((item) => {
                const currentLeftPadding = leftPadding;
                leftPadding += LEFT_PADDING_INCREMENT;

                if (item.type === "file") {
                    return (
                        <Fragment key={crypto.randomUUID()}>
                            {renderFile(item.name, currentLeftPadding)}
                        </Fragment>
                    );
                }
                return (
                    <Fragment key={crypto.randomUUID()}>
                        {renderFolderPath(item, currentLeftPadding)}
                    </Fragment>
                );
            })}
        </>
    );
};

export default FolderStructureCards;
