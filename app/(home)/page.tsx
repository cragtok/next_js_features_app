import { PageWrapper } from "@/components/general/PageWrapper";
import SiteLinks from "./SiteLinks";
import Link from "next/link";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";

export default function Page() {
    return (
        <PageWrapper pageTitle="Next.js Features App">
            <ParagraphWrapper classNameOverride="max-w-md">
                This project demonstrates the core features of Next.js. It was
                made by me to learn and practice my Next.js skills. All features
                are separated into different categories, and can be visited down
                below.
            </ParagraphWrapper>

            <ParagraphWrapper classNameOverride="max-w-md">
                To see the code or run the app on your machine, check out the
                Github repo:{" "}
                <TextAccentWrapper>
                    <Link href="www.github.com">https://github.com</Link>
                </TextAccentWrapper>
            </ParagraphWrapper>

            <div className="w-full max-w-screen-md md:mx-auto mt-10">
                <SiteLinks />
            </div>
        </PageWrapper>
    );
}
