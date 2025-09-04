import PageWrapper from "@/components/general/PageWrapper";
import ParagraphWrapper from "@/components/general/ParagraphWrapper";
import SectionWrapper from "@/components/general/SectionWrapper";
import TextAccentWrapper from "@/components/general/TextAccentWrapper";

import ABTestClientComponent from "./ABTestClientComponent";

function Page() {
    return (
        <PageWrapper pageTitle="A/B Testing Middleware">
            <SectionWrapper>
                <ParagraphWrapper>
                    This page demonstrates{" "}
                    <TextAccentWrapper>A/B testing</TextAccentWrapper> using
                    Next.js Middleware. In this type of testing, two versions of
                    an application, page or feature are shown to different
                    groups of users to analyze their response to each one. Users
                    can be segmented at random or using some criteria.
                </ParagraphWrapper>

                <ParagraphWrapper>
                    Each visitor to this page is randomly selected to be one of
                    two groups. The first group of users will see some{" "}
                    <span className="font-semibold text-green-400">green</span>{" "}
                    text below, while the second group will see{" "}
                    <span className="font-semibold text-blue-400">blue</span>{" "}
                    text. This user segmentation is done completely using
                    Next.js middleware. The logic is placed in the Next.js
                    middleware file{" "}
                    <TextAccentWrapper>middleware.ts</TextAccentWrapper>. Each
                    time a user visits the page, a cookie is sent to their
                    browser specifying the group they are in. The cookie is
                    accessed on the page, and based on its value the appropriate
                    text is shown. The cookie persists for{" "}
                    <TextAccentWrapper>5 seconds</TextAccentWrapper>, so if you
                    want to have a chance to be placed in the other group,
                    simply refresh the browser after this time has passed.
                </ParagraphWrapper>
            </SectionWrapper>

            <SectionWrapper sectionTitle="A/B Testing Text">
                <ABTestClientComponent />
            </SectionWrapper>
        </PageWrapper>
    );
}

export default Page;
