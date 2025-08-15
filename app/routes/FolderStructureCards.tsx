import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    folderPath: string[];
}

export default function FolderStructureCards({ folderPath }: Props) {
    let leftPadding = 0;
    return (
        <>
            {folderPath.map((item, idx) => {
                const currentLeftPadding = leftPadding;
                leftPadding += 25;
                return (
                    <Card
                        key={crypto.randomUUID()}
                        className="bg-neutral-100 rounded-md pt-5 pb-3"
                    >
                        <CardHeader>
                            <CardTitle
                                className={`flex gap-2 text-accent-500 font-semibold`}
                                style={{
                                    paddingLeft: `${currentLeftPadding}px`,
                                }}
                            >
                                <span>
                                    {idx === folderPath.length - 1 ? "🗐" : "🗁"}
                                </span>
                                <span>{item}</span>
                            </CardTitle>
                        </CardHeader>
                    </Card>
                );
            })}
        </>
    );
}
