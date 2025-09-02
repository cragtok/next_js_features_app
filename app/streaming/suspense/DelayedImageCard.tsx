import Image from "next/image";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardWrapper from "@/components/general/CardWrapper";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

interface Props {
    imagePath: string;
    title: string;
    alt: string;
    delaySeconds: number;
}

const DelayedImageCard = async ({
    imagePath,
    title,
    alt,
    delaySeconds,
}: Props) => {
    await delay(delaySeconds * 1000);
    return (
        <CardWrapper>
            <CardHeader className="text-brand-500">
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex max-[628px]:flex-col flex-row gap-6">
                <div className="relative rounded-md overflow-hidden flex-1 max-[628px]:min-h-[150px]">
                    <Image
                        src={imagePath}
                        alt={alt}
                        fill={true}
                        className="object-cover rounded-md"
                        sizes="100%"
                    />
                </div>
                <p className="text-brand-500 min-[400px]:text-justify text-pretty leading-6 flex-2 text-sm">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Omnis odio id reiciendis. Blanditiis amet doloremque aperiam
                    voluptatibus magnam aut, accusamus temporibus culpa
                    voluptatem placeat est magni eum dolore sunt ipsam?
                </p>
            </CardContent>
        </CardWrapper>
    );
};

export default DelayedImageCard;
