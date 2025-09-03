"use client";
import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ButtonWrapper from "@/components/general/ButtonWrapper";

function NotFound() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };
    return (
        <PageWrapper>
            <div className="mx-auto my-0 flex justify-center">
                <Image
                    src="/vercel.svg"
                    className="bg-brand-700 rounded-[8] border-3 border-brand-700"
                    alt="logo"
                    width={80}
                    height={80}
                />
            </div>

            <h1 className="text-status-danger-500 font-extrabold text-4xl text-center">
                Page Not Found!
            </h1>

            <SectionWrapper classNameOverride="gap-10 max-w-md pt-5">
                <ParagraphWrapper classNameOverride="text-brand-500 font-bold text-center">
                    The page you are trying to visit does not exist.
                </ParagraphWrapper>

                <ButtonWrapper
                    classNameOverride="font-semibold"
                    onClick={handleGoBack}
                >
                    Go Back
                </ButtonWrapper>
            </SectionWrapper>
        </PageWrapper>
    );
}

export default NotFound;
