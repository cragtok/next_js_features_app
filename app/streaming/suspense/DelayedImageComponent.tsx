import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

interface Props {
    imagePath: string;
    componentNumber: number;
    delaySeconds: number;
}

async function DelayedImageComponent({
    imagePath,
    componentNumber,
    delaySeconds,
}: Props) {
    await delay(delaySeconds * 1000);
    return (
        <Card className="bg-neutral-100 w-full">
            <CardHeader className="text-brand-700">
                <CardTitle>Component {componentNumber}</CardTitle>
            </CardHeader>
            <CardContent className="flex max-[628px]:flex-col flex-row gap-8">
                <div className="relative rounded-md overflow-hidden flex-1 max-[628px]:min-h-[100px]">
                    <Image
                        src={imagePath}
                        alt={`Nature Image ${componentNumber}`}
                        fill={true}
                        className="object-cover rounded-md"
                    />
                </div>
                <ParagraphWrapper classNameOverride="text-sm flex-2">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Omnis odio id reiciendis. Blanditiis amet doloremque aperiam
                    voluptatibus magnam aut, accusamus temporibus culpa
                    voluptatem placeat est magni eum dolore sunt ipsam?
                </ParagraphWrapper>
            </CardContent>
        </Card>
    );
}

export default DelayedImageComponent;
