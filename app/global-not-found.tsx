import PageWrapper from "@/components/general/PageWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import localFont from "next/font/local";
import { Metadata } from "next";
import Image from "next/image";
import { appEnv } from "@/lib/env/appEnv";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL(appEnv.DOMAIN_URL),
    title: "404 - Not Found | Next.js Features App",
    description: "The page you are trying to access does not exist",
};

const myFont = localFont({
    src: [
        {
            path: "../public/fonts/NotoSans-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/NotoSans-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../public/fonts/NotoSans-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    fallback: ["system-ui", "arial"],
});

function GlobalNotFound() {
    return (
        <html>
            <body
                lang="en"
                className={`${myFont.className} mx-8 antialiased bg-neutral-100`}
            >
                <header className="">
                    <div className="mx-auto my-0 flex justify-center mt-10">
                        <Image
                            src="/vercel.svg"
                            className="bg-brand-700 rounded-[8] border-3 border-brand-700"
                            alt="vercel triangle blue"
                            width={80}
                            height={80}
                        />
                    </div>
                </header>
                <PageWrapper>
                    <h1 className="text-status-danger-500 font-extrabold text-4xl">
                        404 - Page Not Found
                    </h1>
                    <SectionWrapper classNameOverride="gap-10 max-w-md">
                        <ParagraphWrapper classNameOverride="text-brand-500 font-bold text-center">
                            The page you are trying to access does not exit.
                        </ParagraphWrapper>
                    </SectionWrapper>
                </PageWrapper>
            </body>
        </html>
    );
}

export default GlobalNotFound;
